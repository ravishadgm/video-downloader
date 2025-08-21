// app/api/instagram/route.js
import { NextResponse } from "next/server";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { getInstagramMedia } = require("../../../lib/instagram-helper");

// Import your story helper if you have one
// import { fetchStoryFromRapidAPI } from "../../../lib/instagram-story-helper";

export async function POST(req) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('[API] Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" }, 
        { status: 400 }
      );
    }

    const { url } = body;

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: "URL is required and must be a string" }, 
        { status: 400 }
      );
    }

    if (!isValidInstagramUrl(url)) {
      return NextResponse.json(
        { error: "Invalid Instagram URL format" }, 
        { status: 400 }
      );
    }

    console.log(`[API] Processing Instagram URL: ${url}`);

    // === STORY DETECTION ===
    if (url.includes("/stories/")) {
      try {
        const username = extractUsernameFromUrl(url);
        if (!username) {
          return NextResponse.json(
            { error: "Could not extract username from story URL" },
            { status: 400 }
          );
        }

        // Uncomment if you have the story helper implemented
        // const storyData = await fetchStoryFromRapidAPI(username);
        // return NextResponse.json(storyData);

        return NextResponse.json(
          { error: "Story fetching is not implemented yet" },
          { status: 501 }
        );
      } catch (err) {
        console.error('[API] Story fetch error:', err);
        return NextResponse.json(
          { error: err.message || "Failed to fetch Instagram story" },
          { status: 503 }
        );
      }
    }

    // === DEFAULT (reels/posts/carousels) ===
    let results;
    try {
      results = await getInstagramMedia(url);
    } catch (fetchError) {
      console.error('[API] Failed to fetch Instagram media:', fetchError);
      
      // Determine appropriate status code based on error
      let statusCode = 500;
      if (fetchError.message?.includes('401')) statusCode = 401;
      else if (fetchError.message?.includes('404')) statusCode = 404;
      else if (fetchError.message?.includes('429')) statusCode = 429;
      
      return NextResponse.json(
        { error: `Failed to fetch Instagram media: ${fetchError.message}` },
        { status: statusCode }
      );
    }

    // Process and validate results
    const processedData = processInstagramResults(results, url);
    
    if (!processedData.mediaUrl) {
      console.warn('[API] No media found in results:', results);
      return NextResponse.json(
        { error: "No media found in this Instagram post" }, 
        { status: 404 }
      );
    }

    const processingTime = Date.now() - startTime;
    console.log(`[API] Successfully processed Instagram URL in ${processingTime}ms`);

    // Return successful response
    return NextResponse.json({
      ...processedData,
      processingTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`[API] Unexpected server error after ${processingTime}ms:`, {
      message: error.message,
      stack: error.stack,
      url: body?.url
    });

    return NextResponse.json(
      { 
        error: "Internal server error. Please try again later.",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

// Helper function to validate Instagram URLs
function isValidInstagramUrl(url) {
  try {
    const urlObj = new URL(url);
    return /^(www\.)?instagram\.com$/.test(urlObj.hostname) && urlObj.pathname.length > 1;
  } catch {
    return false;
  }
}

// Helper function to extract username from story URL
function extractUsernameFromUrl(url) {
  try {
    const regex = /instagram\.com\/stories\/([^/?]+)/;
    const match = url.match(regex);
    return match?.[1] || null;
  } catch {
    return null;
  }
}

// Helper function to process Instagram results
function processInstagramResults(results, originalUrl) {
  try {
    // Extract data with null checks
    const first = results?.url_list?.[0];
    const media = results?.media_details?.[0];
    const postInfo = results?.post_info || {};

    // Determine media type
    let type = determineMediaType(media, originalUrl);

    // Build response object with safe property access
    return {
      type,
      mediaUrl: first || null,
      mediaUrls: Array.isArray(results?.url_list) ? results.url_list : [],
      thumbnail: media?.thumbnail || first || null,
      quality: Array.isArray(results?.quality) ? results.quality : [],
      
      // User information
      username: postInfo.owner_username || null,
      fullName: postInfo.owner_fullname || null,
      isVerified: Boolean(postInfo.is_verified),
      
      // Post metadata
      caption: postInfo.caption || null,
      likes: typeof postInfo.likes === 'number' ? postInfo.likes : 0,
      comments: typeof postInfo.comment_count === 'number' ? postInfo.comment_count : null,
      views: typeof media?.video_view_count === 'number' ? media.video_view_count : 0,
      postedAt: postInfo.timestamp || null,
      
      // Additional metadata
      isCarousel: Boolean(media?.is_carousel),
      duration: media?.duration || null,
      dimensions: media?.dimensions || null
    };
  } catch (error) {
    console.error('[API] Error processing Instagram results:', error);
    throw new Error('Failed to process Instagram data');
  }
}

// Helper function to determine media type
function determineMediaType(media, url) {
  try {
    if (!media && !url) return "unknown";

    // Check URL patterns first
    if (url.includes("/reel")) return "reel";
    if (url.includes("/tv")) return "igtv";
    if (url.includes("/stories/")) return "story";

    // Check media properties
    if (media?.is_carousel) return "carousel";
    
    const mediaType = media?.type?.toLowerCase() || "";
    if (mediaType.includes("video")) {
      return url.includes("/reel") ? "reel" : "video";
    }
    if (mediaType.includes("image")) return "photo";
    
    // Fallback determination
    if (url.includes("/p/")) return "photo"; // Standard post URL pattern
    
    return "post";
  } catch {
    return "unknown";
  }
}

// Optional: Add GET method for health check
export async function GET() {
  return NextResponse.json({
    status: "Instagram API is running",
    timestamp: new Date().toISOString(),
    endpoints: {
      POST: "/api/instagram - Fetch Instagram media"
    }
  });
}