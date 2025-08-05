// /app/api/proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const range = request.headers.get('range') || '';
    const res = await fetch(targetUrl, {
      headers: {
        Range: range,
      },
    });

    const headers = new Headers();
    for (const [key, value] of res.headers.entries()) {
      if (
        ['content-type', 'content-length', 'accept-ranges', 'content-range'].includes(key.toLowerCase())
      ) {
        headers.set(key, value);
      }
    }

    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Cache-Control", "public, max-age=86400");

    return new Response(res.body, {
      status: res.status,
      statusText: res.statusText,
      headers,
    });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ error: "Proxy fetch failed" }, { status: 500 });
  }
}
