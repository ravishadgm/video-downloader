import { NextResponse } from "next/server";
import { getInstagramMedia } from "../../../lib/instagram-helper";

export async function POST(req) {
  try {
    const { url } = await req.json();
    if (!url || !/^https?:\/\/(www\.)?instagram\.com\//.test(url)) {
      return NextResponse.json({ error: "Invalid Instagram URL" }, { status: 400 });
    }

    const results = await getInstagramMedia(url);
    const first = results.url_list[0];
    const media = results.media_details[0];
    const postInfo = results.post_info;

    return NextResponse.json({
      type: media.type,
      mediaUrl: first,
      mediaUrls: results.url_list,
      thumbnail: media.thumbnail || first,
      username: postInfo.owner_username,
      fullName: postInfo.owner_fullname,
      isVerified: postInfo.is_verified,
      caption: postInfo.caption,
      likes: postInfo.likes,
      views: media.video_view_count || 0,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
