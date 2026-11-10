import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "public", "_media");
const manifestFile = path.join(root, "src", "lib", "generated", "video-manifest.server.json");
const sources = {
  youfira: "1698638341487.mp4",
  yukti: "1750325263163.mp4",
};

// Best-effort browser encryption, not DRM. Never put these playback keys in Git.
await mkdir(output, { recursive: true });
await mkdir(path.dirname(manifestFile), { recursive: true });
let previous;
try {
  previous = JSON.parse(await readFile(manifestFile, "utf8"));
} catch {
  previous = { videos: {} };
}

const videos = {};
for (const [id, filename] of Object.entries(sources)) {
  const source = await readFile(path.join(root, "media-sources", filename));
  const digest = createHash("sha256").update(source).digest("hex");
  const cached = previous.videos?.[id];
  if (cached?.digest === digest && /^\/_media\/[a-z]+-[a-f0-9]{20}\.bin$/.test(cached.url)) {
    const cachedFile = path.join(root, "public", cached.url.slice(1));
    if ((await stat(cachedFile).catch(() => null))?.size === source.length + 16) {
      videos[id] = cached;
      console.log(`Prepared ${id} video (cached).`);
      continue;
    }
  }

  const key = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(source), cipher.final(), cipher.getAuthTag()]);
  const assetHash = createHash("sha256").update(ciphertext).digest("hex").slice(0, 20);
  const assetName = `${id}-${assetHash}.bin`;
  await writeFile(path.join(output, assetName), ciphertext);
  videos[id] = {
    url: `/_media/${assetName}`,
    key: key.toString("base64"),
    iv: iv.toString("base64"),
    digest,
    bytes: source.length,
  };
  console.log(`Prepared ${id} video (${Math.ceil(source.length / 1024 / 1024)} MB).`);
}

await writeFile(manifestFile, JSON.stringify({ version: 1, videos }, null, 2) + "\n", { mode: 0o600 });
