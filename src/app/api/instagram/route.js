const axios = require("axios");
const qs = require("qs");

// Simple in-memory cache (reset on serverless cold start)
const cache = new Map();

// Main function
async function getInstagramMedia(url) {
  try {
    // Check cache first
    if (cache.has(url)) {
      return cache.get(url);
    }

    const resolvedUrl = await checkRedirect(url);
    const shortcode = getShortcode(resolvedUrl);
    const data = await instagramRequest(shortcode, 5, 1000);
    const result = createOutputData(data);

    // Cache result for 1 minute to prevent repeated Instagram requests
    cache.set(url, result);
    setTimeout(() => cache.delete(url), 60 * 1000);

    return result;
  } catch (err) {
    console.error("Instagram fetch failed:", err.message || err);

    // Fallback: use proxy route if direct request fails
    try {
      const proxyResult = await fetchViaProxy(url);
      cache.set(url, proxyResult);
      setTimeout(() => cache.delete(url), 60 * 1000);
      return proxyResult;
    } catch (err2) {
      throw new Error("Failed to fetch Instagram media");
    }
  }
}

// --- Utilities ---

async function checkRedirect(url) {
  if (url.includes("/share/")) {
    const res = await axios.get(url, { maxRedirects: 0 }).catch(() => null);
    if (res?.headers?.location) return res.headers.location;
  }
  return url;
}

function getShortcode(url) {
  const segments = url.split("/");
  const tags = ["p", "reel", "tv", "reels"];
  const index = segments.findIndex((s) => tags.includes(s));
  if (index === -1 || !segments[index + 1]) throw new Error("Invalid Instagram URL");
  return segments[index + 1];
}

async function getCSRFToken() {
  const res = await axios.get("https://www.instagram.com/", { headers: { "User-Agent": "Mozilla/5.0" } });
  const cookies = res.headers["set-cookie"] || [];
  const token = cookies.find((c) => c.startsWith("csrftoken="));
  if (!token) throw new Error("CSRF token not found");
  return token.split(";")[0].replace("csrftoken=", "");
}

async function instagramRequest(shortcode, retries, delay) {
  const docId = "9510064595728286";
  const token = await getCSRFToken();
  const body = qs.stringify({
    variables: JSON.stringify({ shortcode }),
    doc_id: docId,
  });

  try {
    const res = await axios.post("https://www.instagram.com/graphql/query", body, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "X-CSRFToken": token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (!res.data?.data?.xdt_shortcode_media) throw new Error("Media not supported or invalid URL");
    return res.data.data.xdt_shortcode_media;
  } catch (err) {
    if (retries > 0 && err.response && [429, 403].includes(err.response.status)) {
      const wait = err.response.headers["retry-after"] ? parseInt(err.response.headers["retry-after"]) * 1000 : delay;
      await new Promise((r) => setTimeout(r, wait));
      return instagramRequest(shortcode, retries - 1, delay * 2);
    }
    throw err;
  }
}

function isSidecar(data) {
  return data.__typename === "XDTGraphSidecar";
}

function createOutputData(requestData) {
  const mediaDetails = [];
  const urlList = [];

  if (isSidecar(requestData)) {
    requestData.edge_sidecar_to_children.edges.forEach((m) => {
      mediaDetails.push(formatMediaDetails(m.node));
      urlList.push(m.node.is_video ? m.node.video_url : m.node.display_url);
    });
  } else {
    mediaDetails.push(formatMediaDetails(requestData));
    urlList.push(requestData.is_video ? requestData.video_url : requestData.display_url);
  }

  return {
    results_number: urlList.length,
    url_list: urlList,
    post_info: formatPostInfo(requestData),
    media_details: mediaDetails,
  };
}

function formatPostInfo(data) {
  const captionEdge = data.edge_media_to_caption?.edges || [];
  const caption = captionEdge.length ? captionEdge[0].node.text : "";
  return {
    owner_username: data.owner.username,
    owner_fullname: data.owner.full_name,
    is_verified: data.owner.is_verified,
    is_private: data.owner.is_private,
    likes: data.edge_media_preview_like.count,
    is_ad: data.is_ad,
    caption,
  };
}

function formatMediaDetails(media) {
  if (media.is_video) {
    return {
      type: "video",
      dimensions: media.dimensions,
      video_view_count: media.video_view_count,
      url: media.video_url,
      thumbnail: media.display_url,
    };
  } else {
    return {
      type: "image",
      dimensions: media.dimensions,
      url: media.display_url,
    };
  }
}

// --- Proxy fallback ---
async function fetchViaProxy(url) {
  const proxyUrl = `https://insta-video-downloader-two.vercel.app/api/proxy?url=${encodeURIComponent(url)}`;

  const res = await axios.get(proxyUrl);
  if (!res.data || !res.data.url_list) throw new Error("Proxy failed");
  return res.data;
}

module.exports = {
  getInstagramMedia,
};
