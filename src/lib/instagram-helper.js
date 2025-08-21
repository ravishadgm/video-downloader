const axios = require("axios");
const qs = require("qs");

const CACHE = {}; // simple in-memory cache

async function getCSRFToken() {
  const res = await axios.get("https://www.instagram.com/");
  const cookie = res.headers["set-cookie"]?.[0];
  if (!cookie) throw new Error("CSRF token not found");
  return cookie.split(";")[0].replace("csrftoken=", "");
}

function getShortcode(url) {
  const split = url.split("/");
  const tags = ["p", "reel", "tv", "reels"];
  const idx = split.findIndex((i) => tags.includes(i)) + 1;
  return split[idx];
}

async function instagramRequest(shortcode, retries = 5, delay = 1000) {
  try {
    const token = await getCSRFToken();
    const dataBody = qs.stringify({
      variables: JSON.stringify({ shortcode }),
      doc_id: "9510064595728286",
    });

    const { data } = await axios.post("https://www.instagram.com/graphql/query", dataBody, {
      headers: { "X-CSRFToken": token, "Content-Type": "application/x-www-form-urlencoded" },
      maxBodyLength: Infinity,
    });

    if (!data.data?.xdt_shortcode_media) throw new Error("Invalid Instagram link");
    return data.data.xdt_shortcode_media;
  } catch (err) {
    const status = err.response?.status;
    if ([429, 403].includes(status) && retries > 0) {
      await new Promise((r) => setTimeout(r, delay));
      return instagramRequest(shortcode, retries - 1, delay * 2);
    }
    throw err;
  }
}

function formatMedia(data) {
  const url_list = [];
  const media_details = [];

  const isSidecar = data["__typename"] === "XDTGraphSidecar";
  if (isSidecar) {
    data.edge_sidecar_to_children.edges.forEach((m) => {
      const node = m.node;
      media_details.push({
        type: node.is_video ? "video" : "image",
        url: node.is_video ? node.video_url : node.display_url,
        dimensions: node.dimensions,
        thumbnail: node.display_url,
        video_view_count: node.video_view_count || undefined,
      });
      url_list.push(node.is_video ? node.video_url : node.display_url);
    });
  } else {
    media_details.push({
      type: data.is_video ? "video" : "image",
      url: data.is_video ? data.video_url : data.display_url,
      dimensions: data.dimensions,
      thumbnail: data.display_url,
      video_view_count: data.video_view_count || undefined,
    });
    url_list.push(data.is_video ? data.video_url : data.display_url);
  }

  const captionEdge = data.edge_media_to_caption.edges[0];
  const caption = captionEdge ? captionEdge.node.text : "";

  return {
    url_list,
    media_details,
    post_info: {
      owner_username: data.owner.username,
      owner_fullname: data.owner.full_name,
      is_verified: data.owner.is_verified,
      is_private: data.owner.is_private,
      likes: data.edge_media_preview_like.count,
      is_ad: data.is_ad,
      caption,
    },
  };
}

async function getInstagramMedia(url) {
  if (CACHE[url] && Date.now() - CACHE[url].timestamp < 60000) return CACHE[url].data;

  const shortcode = getShortcode(url);
  let data;
  try {
    data = await instagramRequest(shortcode);
  } catch (err) {
    // fallback to proxy
    const proxyUrl = `https://insta-video-downloader-two.vercel.app/api/proxy?url=${encodeURIComponent(url)}`;
    const res = await axios.get(proxyUrl);
    if (!res.data) throw new Error("Failed via proxy");
    return res.data;
  }

  const output = formatMedia(data);
  CACHE[url] = { timestamp: Date.now(), data: output };
  return output;
}

module.exports = { getInstagramMedia };
