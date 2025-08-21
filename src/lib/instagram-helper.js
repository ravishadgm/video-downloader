export async function getInstagramMedia(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodedUrl}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7eb02db216msh902bd566fbaa81cp19777ajsn5c9a261d9520',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Handle error response
    if (data.error === true || data.error === "true") {
      throw new Error('Failed to fetch Instagram media');
    }

    // Extract media information based on uzapishop response format
    const mediaUrls = data.medias?.map(media => media.download_url) || [];
    const firstMedia = data.medias?.[0];

    return {
      success: true,
      error: data.error,
      hosting: data.hosting,
      shortcode: data.shortcode,
      caption: data.caption,
      type: data.type, // "album", "video", "image"
      
      // Media URLs
      mediaUrl: firstMedia?.download_url || data.thumb, // First media URL
      mediaUrls: mediaUrls, // All media URLs for carousel
      thumbnail: data.thumb,
      
      // All media details
      medias: data.medias || [],
      totalMedia: data.medias?.length || 0,
      
      // Media types
      hasMultipleMedia: data.type === 'album',
      isCarousel: data.type === 'album',
      isVideo: data.type === 'video',
      isImage: data.type === 'image'
    };

  } catch (error) {
    console.error('Instagram extraction error:', error);
    throw new Error(`Instagram download failed: ${error.message}`);
  }
}
