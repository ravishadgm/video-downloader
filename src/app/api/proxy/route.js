import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");
  if (!targetUrl) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Referer": "https://www.instagram.com/",
      },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    return new Response(res.body, { status: 200, headers });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch via proxy" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Range, Content-Type",
    },
  });
}
