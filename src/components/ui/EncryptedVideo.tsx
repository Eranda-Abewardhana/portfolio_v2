"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

type PlaybackAccess = { url: string; key: string; iv: string };
type VideoProps = {
  videoId: "youfira" | "yukti";
  poster?: string;
  label: string;
  className?: string;
};

function decodeBase64(value: string) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function VideoSession({
  videoId,
  poster,
  label,
  className,
}: VideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const request = useRef<AbortController | null>(null);
  const objectUrl = useRef<string | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => () => {
    request.current?.abort();
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
  }, []);

  useEffect(() => {
    if (playbackUrl) {
      video.current?.focus({ preventScroll: true });
      void video.current?.play().catch(() => {});
    }
  }, [playbackUrl]);

  async function loadVideo() {
    if (request.current || objectUrl.current) return;
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError(false);
    try {
      const accessResponse = await fetch(`/api/media/${videoId}`, {
        method: "POST",
        cache: "no-store",
        signal: controller.signal,
      });
      if (!accessResponse.ok) throw new Error("Playback access failed.");
      const access: PlaybackAccess = await accessResponse.json();
      if (!access.url.startsWith("/_media/")) throw new Error("Invalid media URL.");
      const mediaResponse = await fetch(access.url, { signal: controller.signal });
      if (!mediaResponse.ok) throw new Error("Video loading failed.");
      const ciphertext = await mediaResponse.arrayBuffer();
      const key = await crypto.subtle.importKey(
        "raw", decodeBase64(access.key), { name: "AES-GCM" }, false, ["decrypt"],
      );
      const plaintext = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: decodeBase64(access.iv) }, key, ciphertext,
      );
      if (controller.signal.aborted) return;
      const url = URL.createObjectURL(new Blob([plaintext], { type: "video/mp4" }));
      objectUrl.current = url;
      setPlaybackUrl(url);
    } catch {
      if (!controller.signal.aborted) setError(true);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
      if (request.current === controller) request.current = null;
    }
  }

  return (
    <div className="encrypted-video-player">
      <video
        ref={video}
        src={playbackUrl}
        poster={poster}
        controls={Boolean(playbackUrl)}
        tabIndex={playbackUrl ? 0 : -1}
        controlsList="nodownload"
        playsInline
        draggable={false}
        onContextMenu={(event) => event.preventDefault()}
        preload="none"
        className={className}
        aria-label={label}
      >
        Your browser does not support embedded video playback.
      </video>
      {!playbackUrl && (
        <button
          type="button"
          className="encrypted-video-start"
          onClick={loadVideo}
          disabled={loading}
          aria-busy={loading}
          aria-label={`Play ${label}`}
        >
          <span className="encrypted-video-play-icon" aria-hidden="true"><Play size={28} fill="currentColor" /></span>
          <span className="encrypted-video-status" role="status">
            {loading ? "Loading video…" : error ? "Try again" : "Play video"}
          </span>
        </button>
      )}
      {error && <p className="encrypted-video-error" role="alert">Couldn’t load the video. Select Play to retry.</p>}
    </div>
  );
}

export default function EncryptedVideo(props: VideoProps) {
  return <VideoSession key={props.videoId} {...props} />;
}
