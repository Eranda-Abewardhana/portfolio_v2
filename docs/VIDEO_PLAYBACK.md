# Project video playback

The two original clips are kept in `media-sources/`, outside Next.js's public directory. The original `/videos/*.mp4` URLs are no longer served by new deployments.

`npm run dev`, `npm run build`, and `npm run typecheck` first run `scripts/prepare-videos.mjs`. It uses Node's AES-256-GCM implementation to produce authenticated, encrypted files in `public/_media/` and a server-only playback manifest. Generated files and keys are ignored by Git. The manifest is imported only by the server playback route and must never be imported into a client component.

The player loads a clip only after Play is selected. A same-origin POST obtains its playback information; the browser downloads and decrypts the encrypted file, then plays a temporary in-memory Blob URL. Object URLs are revoked and outstanding requests are aborted when the player unmounts. There is no direct MP4 source or download link in the page.

No paid video service or new account is required. It uses the existing site's hosting resources. Each clip must finish loading before playback, so the longer demo can take several seconds on a slow connection.

After a build, run `npm run check:videos` to check exact WebCrypto round trips, tamper rejection, private key bundling, and removal of public source files. Set `PORTFOLIO_QA_URL` to a running local or deployed server to also check playback requests, the served encrypted bytes, origin checks, and 404 responses for the former MP4 URLs. Tests never print playback keys.

## Limits

This is not licensed DRM and cannot guarantee that IDM, other extensions, or a determined viewer cannot save the video. The browser receives the information needed to decrypt it. The goal is to remove straightforward playable MP4 requests and make basic automatic capture harder, not to provide confidential-media security. We have not verified a particular IDM version's behavior.

The repository and its history already contain the source videos. Reorganizing the current deployment does not erase those copies, previously deployed versions, or files somebody already downloaded. No repository history or visibility is changed by this feature.
