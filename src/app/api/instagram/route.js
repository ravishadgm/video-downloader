import { NextResponse } from "next/server";
import { createRequire } from "module";
import fetch from "node-fetch";

const require = createRequire(import.meta.url);
const { getInstagramMedia } = require("../../../lib/instagram-helper");

// === IGDownloader API ===
const fetchStoryFromIGDownloader = async (url) => {
  try {
    const res = await fetch("https://igdownloader.com/api/story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0", // avoid being blocked
      },
      body: JSON.stringify({ link: url }),
    });

    if (!res.ok) {
      throw new Error(`IGDownloader API error: ${res.status}`);
    }

    const json = await res.json();

    const media = json?.data || [];

    const mediaUrls = media.map((item) => item.url).filter(Boolean);
    if (mediaUrls.length === 0) throw new Error("No story media found");

    return {
      type: "story",
      mediaUrl: mediaUrls[0],
      mediaUrls,
      thumbnail: mediaUrls[0],
      username: json.user?.username || null,
      fullName: json.user?.full_name || null,
      isVerified: json.user?.is_verified || false,
      postedAt: null,
    };
  } catch (err) {
    console.error("IGDownloader failed:", err.message);
    throw new Error("Story download failed: " + err.message);
  }
};

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    // === STORY SUPPORT ===
    if (url.includes("/stories/")) {
      try {
        const storyData = await fetchStoryFromIGDownloader(url);
        return NextResponse.json(storyData);
      } catch (err) {
        console.error("Story API failed:", err.message);
        return NextResponse.json(
          { error: "Instagram story could not be fetched. Try again later." },
          { status: 503 }
        );
      }
    }

    // === REELS / POSTS / CAROUSEL ===
    const results = await getInstagramMedia(url);
    const first = results.url_list?.[0];
    const media = results.media_details?.[0];
    const postInfo = results.post_info || {};

    if (!first) {
      return NextResponse.json({ error: "No media found." }, { status: 404 });
    }

    let type = media?.type || "unknown";
    if (type.includes("video") && url.includes("/reel")) type = "reel";
    else if (url.includes("/tv")) type = "igtv";
    else if (media?.is_carousel) type = "carousel";
    else if (type.includes("image")) type = "photo";
    else type = "viewer";

    return NextResponse.json({
      type,
      mediaUrl: first,
      thumbnail: media?.thumbnail || first,
      quality: results.quality || [],
      username: postInfo.owner_username || null,
      fullName: postInfo.owner_fullname || null,
      isVerified: postInfo.is_verified || false,
      caption: postInfo.caption || null,
      likes: postInfo.likes || 0,
      comments: postInfo.comment_count ?? null,
      views: media?.video_view_count || 0,
      postedAt: postInfo.timestamp || null,
      mediaUrls: results.url_list || [],
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
