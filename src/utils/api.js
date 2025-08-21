function getInstagramMediaType(url) {
  if (/\/(stories|story|s)\//i.test(url)) return "story";
  if (/\/(reel|reels)\//i.test(url)) return "reel";
  if (/\/p\//i.test(url)) return "photo";
  if (/\/tv\//i.test(url)) return "video";

  return "unknown";
}

export async function downloadInstagramMedia(url) {
  if (!url || !url.trim()) {
    throw new Error("Please enter a URL");
  }

  if (!url.includes('instagram.com/')) {
    throw new Error("Please provide a valid Instagram URL");
  }

  const mediaType = getInstagramMediaType(url);

  if (mediaType === "unknown") {
    throw new Error("Unsupported Instagram URL format. Please provide a valid Instagram post, reel, story, or video URL");
  }

  console.log(`Detected Instagram ${mediaType} URL`);

  const res = await fetch("/api/instagram", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Server error");
  }

  return {
    ...data,
    detectedMediaType: mediaType
  };
}

export { getInstagramMediaType };