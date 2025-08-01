import { NextResponse } from "next/server";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { getInstagramMedia } = require("../../../lib/instagram-helper");

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    const results = await getInstagramMedia(url);
    const first = results.url_list?.[0];
    const media = results.media_details?.[0];
    const postInfo = results.post_info || {};

    if (!first) return NextResponse.json({ error: "No media found." }, { status: 404 });

    let type = media?.type || "unknown";
    if (type.includes("video") && url.includes("/reel")) type = "reel";
    else if (url.includes("/stories")) type = "story";
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
