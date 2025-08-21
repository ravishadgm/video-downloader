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
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('API Error:', error.message);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
