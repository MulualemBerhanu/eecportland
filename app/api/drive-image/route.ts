import { NextRequest, NextResponse } from "next/server";

const FILE_ID_RE = /^[a-zA-Z0-9_-]{10,100}$/;

/**
 * Proxies a publicly shared Google Drive file as an image so `<img>` can load it
 * reliably (browser hotlinking to Drive often gets HTML instead of bytes).
 */
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")?.trim();
  if (!id || !FILE_ID_RE.test(id)) {
    return NextResponse.json({ error: "Invalid file id" }, { status: 400 });
  }

  const enc = encodeURIComponent(id);
  const candidates = [
    `https://drive.google.com/uc?export=view&id=${enc}`,
    `https://drive.google.com/thumbnail?id=${enc}&sz=w2000`,
    `https://drive.google.com/thumbnail?id=${enc}&sz=w1000`,
    `https://drive.google.com/uc?id=${enc}`,
  ];

  const ua =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

  for (const url of candidates) {
    let res: Response;
    try {
      res = await fetch(url, {
        headers: {
          "User-Agent": ua,
          Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        },
        redirect: "follow",
        next: { revalidate: 3600 },
      });
    } catch {
      continue;
    }

    if (!res.ok) continue;

    const rawCt = res.headers.get("content-type") || "";
    const ct = rawCt.split(";")[0]!.trim().toLowerCase();
    if (!ct.startsWith("image/")) continue;

    const buf = await res.arrayBuffer();
    if (buf.byteLength < 256) continue;

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": ct,
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  }

  return new NextResponse(null, { status: 404 });
}
