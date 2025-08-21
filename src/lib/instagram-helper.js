// lib/instagram-helper.js
const instagramUrlDirect = require("instagram-url-direct");

// Cache to store results temporarily
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getInstagramMedia(url, maxRetries = 3) {
  // Input validation
  if (!url || typeof url !== 'string') {
    throw new Error('Invalid URL provided');
  }

  // Check if URL is a valid Instagram URL
  if (!url.includes('instagram.com')) {
    throw new Error('URL must be an Instagram URL');
  }

  // Check cache first
  const cacheKey = url;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('Returning cached result for:', url);
    return cached.data;
  }

  let lastError;

  // Retry logic with exponential backoff
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Instagram] Attempt ${attempt}/${maxRetries} for URL: ${url}`);
      
      // Add a small delay for subsequent attempts
      if (attempt > 1) {
        const delay = Math.min(Math.pow(2, attempt - 1) * 1000, 10000); // Max 10s delay
        console.log(`[Instagram] Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      // Make the request (instagram-url-direct doesn't accept options parameter)
      const result = await instagramUrlDirect.instagramGetUrl(url);
      
      if (!result) {
        throw new Error('No data returned from Instagram');
      }

      // Cache successful result
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });

      console.log(`[Instagram] Successfully fetched media on attempt ${attempt}`);
      return result;

    } catch (error) {
      lastError = error;
      console.error(`[Instagram] Attempt ${attempt} failed:`, {
        message: error.message,
        url: url.substring(0, 50) + '...',
        attempt
      });

      // If it's a 401 error or rate limit and we have more retries, continue
      if ((error.message?.includes('401') || error.message?.includes('429')) && attempt < maxRetries) {
        console.log(`[Instagram] Retryable error, ${maxRetries - attempt} attempts left`);
        continue;
      }

      // If it's the last attempt, try to use cached data as fallback
      if (attempt === maxRetries && cached) {
        console.warn(`[Instagram] All attempts failed, returning expired cached data`);
        return cached.data;
      }

      // For other errors on non-final attempts, continue to retry
      if (attempt < maxRetries) continue;
    }
  }

  // If we get here, all attempts failed and no cached data available
  const errorMessage = lastError?.message || 'Unknown error';
  console.error(`[Instagram] All ${maxRetries} attempts failed:`, errorMessage);
  
  throw new Error(`Failed to fetch Instagram media: ${errorMessage}`);
}

// Clean expired cache entries periodically
function cleanExpiredCache() {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, data] of cache.entries()) {
    if (now - data.timestamp >= CACHE_TTL) {
      cache.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`[Instagram] Cleaned ${cleaned} expired cache entries`);
  }
}

// Auto-clean cache every 10 minutes
setInterval(cleanExpiredCache, 10 * 60 * 1000);

module.exports = {
  getInstagramMedia,
};