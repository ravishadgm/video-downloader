import { NextResponse } from "next/server";
import { getInstagramMedia } from "../../../lib/instagram-helper.js";

export async function POST(req) {
  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);
    
    if (!url || !url.includes('instagram.com/p/')) {
      return NextResponse.json({ 
        error: "Please provide a valid Instagram post URL" 
      }, { status: 400 });
    }

    const result = await getInstagramMedia(url);
    
    // Return the exact format matching uzapishop response
    return NextResponse.json({
      success: true,
      error: result.error,
      hosting: result.hosting,
      shortcode: result.shortcode,
      caption: result.caption,
      type: result.type,
      
      // Media information
      mediaUrl: result.mediaUrl, // First/main media URL
      mediaUrls: result.mediaUrls, // All media URLs (for carousel)
      medias: result.medias, // Complete media array from API
      thumb: result.thumbnail,
      
      // Additional info
      totalMedia: result.totalMedia,
      isCarousel: result.isCarousel,
      isVideo: result.isVideo,
      isImage: result.isImage,
      
      // Metadata
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
