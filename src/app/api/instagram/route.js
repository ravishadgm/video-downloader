import { NextResponse } from "next/server";
import { getInstagramMedia } from "../../../lib/instagram-helper.js";

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('instagram.com/')) {
      return NextResponse.json({
        error: "Please provide a valid Instagram URL"
      }, { status: 400 });
    }

    const isValidUrl = /instagram\.com\/(p\/|reel\/|reels\/|story\/|stories\/|tv\/|s\/)/i.test(url);

    if (!isValidUrl) {
      return NextResponse.json({
        error: "Please provide a valid Instagram post, reel, story, or video URL"
      }, { status: 400 });
    }

    const result = await getInstagramMedia(url);

    return NextResponse.json({
      success: true,
      error: result.error,
      hosting: result.hosting,
      shortcode: result.shortcode,
      caption: result.caption,
      type: result.type,

      mediaUrl: result.mediaUrl,
      mediaUrls: result.mediaUrls,
      medias: result.medias,
      thumb: result.thumbnail,

      totalMedia: result.totalMedia,
      isCarousel: result.isCarousel,
      isVideo: result.isVideo,
      isImage: result.isImage,

      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

