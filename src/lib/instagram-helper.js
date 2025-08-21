const instagramUrlDirect = require("instagram-url-direct");

async function getInstagramMedia(url) {
  try {
    const results = await instagramUrlDirect.instagramGetUrl(url);

    if (!results || !results.url_list?.length) {
      throw new Error("No media found for this URL");
    }

    return results;
  } catch (err) {
    console.error("Instagram media fetch error:", err.message || err);
    throw new Error("Failed to fetch Instagram media");
  }
}

module.exports = {
  getInstagramMedia,
};