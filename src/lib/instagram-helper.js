export async function getInstagramMedia(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodedUrl}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c34d95927dmsh166eff8f28923b3p1ea15ajsn0f2a81eab998",
        "x-rapidapi-host": "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    if (data.error === true || data.error === "true") {
      throw new Error("Failed to fetch Instagram media");
    }

    const mediaUrls = data.medias?.map((media) => media.download_url).filter(Boolean) || [];
    const firstMedia = data.medias?.[0];


    let normalizedType = data.type;
    if (/\/(stories|story|s)\//i.test(url)) {
      normalizedType = "story";
    } else if (data.type === "album") {
      normalizedType = "carousel";
    } else if (data.type === "image") {
      normalizedType = "photo";
    } else if (data.type === "video") {
      normalizedType = "reel";
    }

    return {
      success: true,
      error: data.error,
      hosting: data.hosting,
      shortcode: data.shortcode,
      caption: data.caption,
      type: normalizedType,

      mediaUrl: firstMedia?.download_url || data.video_url || data.download_url || data.thumb,
      mediaUrls: mediaUrls,
      thumbnail: data.thumb,

      medias: data.medias || [],
      totalMedia: data.medias?.length || 0,

      hasMultipleMedia: normalizedType === "carousel",
      isCarousel: normalizedType === "carousel",
      isVideo: normalizedType === "reel" || normalizedType === "video",
      isImage: normalizedType === "photo",
    };
  } catch (error) {
    console.error("Instagram extraction error:", error);
    throw new Error(`Instagram download failed: ${error.message}`);
  }
}
