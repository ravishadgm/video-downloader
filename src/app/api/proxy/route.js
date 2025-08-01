// /app/api/proxy/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  const res = await fetch(targetUrl);
  const data = await res.arrayBuffer();

  return new Response(data, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
