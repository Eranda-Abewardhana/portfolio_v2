import manifest from "@/lib/generated/video-manifest.server.json";

export const runtime = "nodejs";

const responseHeaders = {
  "Cache-Control": "private, no-store",
  "X-Content-Type-Options": "nosniff",
};

// This discourages simple external download requests; it is not viewer authentication or DRM.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ videoId: string }> },
) {
  const origin = request.headers.get("origin");
  const browserHost =
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ??
    request.headers.get("host") ??
    new URL(request.url).host;
  let sameOrigin = false;
  try {
    const url = new URL(origin ?? "");
    sameOrigin = ["http:", "https:"].includes(url.protocol) && url.host === browserHost && url.origin === origin;
  } catch {
    // Missing, opaque, or malformed origins cannot request playback information.
  }
  if (
    !sameOrigin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return Response.json({ error: "Playback must be requested from this site." }, { status: 403, headers: responseHeaders });
  }

  const { videoId } = await params;
  if (!Object.hasOwn(manifest.videos, videoId)) {
    return Response.json({ error: "Video not found." }, { status: 404, headers: responseHeaders });
  }

  const asset = manifest.videos[videoId as keyof typeof manifest.videos];
  return Response.json(
    { url: asset.url, key: asset.key, iv: asset.iv },
    { headers: responseHeaders },
  );
}
