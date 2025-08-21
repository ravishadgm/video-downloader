export async function getInstagramMedia(url) {
  try {
    // Encode the Instagram URL properly
    const encodedUrl = encodeURIComponent(url);
    
    // Use the correct endpoint '/get-info-rapidapi'
    const apiUrl = `https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi?url=${encodedUrl}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7eb02db216msh902bd566fbaa81cp19777ajsn5c9a261d9520',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const result = await response.text();
    const data = JSON.parse(result);
    
    console.log('API Response:', data);

    // Handle the response
    if (data.success !== false) {
      return {
        success: true,
        mediaUrl: data.download_url || data.media?.[0]?.url || data.url,
        thumbnail: data.thumbnail || data.thumb,
        type: data.type || (data.download_url?.includes('.mp4') ? 'video' : 'image'),
        username: data.username || data.author || 'unknown',
        caption: data.caption || data.title || '',
        likes: data.likes || 0,
        comments: data.comments || 0
      };
    } else {
      throw new Error(data.message || 'Failed to extract media');
    }

  } catch (error) {
    console.error('Instagram extraction error:', error);
    throw new Error(`Instagram download failed: ${error.message}`);
  }
}
