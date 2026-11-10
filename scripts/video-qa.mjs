import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(await readFile(path.join(root, "src/lib/generated/video-manifest.server.json"), "utf8"));
const sources = { youfira: "1698638341487.mp4", yukti: "1750325263163.mp4" };
const report = { roundTrips: [], authenticatedEncryption: true, clientKeysAbsent: true, hosted: [] };

async function decrypt(ciphertext, access) {
  const key = await webcrypto.subtle.importKey("raw", Buffer.from(access.key, "base64"), "AES-GCM", false, ["decrypt"]);
  return Buffer.from(await webcrypto.subtle.decrypt({ name: "AES-GCM", iv: Buffer.from(access.iv, "base64") }, key, ciphertext));
}

const chunks = path.join(root, ".next/static/chunks");
const chunkFiles = await readdir(chunks, { recursive: true });
const clientCode = (await Promise.all(chunkFiles.filter(file => file.endsWith(".js")).map(file => readFile(path.join(chunks, file), "utf8")))).join("\n");

for (const [id, filename] of Object.entries(sources)) {
  const original = await readFile(path.join(root, "media-sources", filename));
  const access = manifest.videos[id];
  const ciphertext = await readFile(path.join(root, "public", access.url.slice(1)));
  assert.equal(ciphertext.length, original.length + 16);
  assert.ok((await decrypt(ciphertext, access)).equals(original), `${id}: browser-compatible decryption must reproduce the exact source`);
  const tampered = Buffer.from(ciphertext);
  tampered[0] ^= 1;
  await assert.rejects(decrypt(tampered, access), `${id}: modified ciphertext must fail authentication`);
  assert.equal(clientCode.includes(access.key), false, `${id}: server key leaked into a static client bundle`);
  assert.equal(clientCode.includes(filename), false, `${id}: original MP4 URL leaked into the player bundle`);
  assert.equal(await stat(path.join(root, "public/videos", filename)).catch(() => null), null);
  report.roundTrips.push({ id, bytes: original.length });
}

if (process.env.PORTFOLIO_QA_URL) {
  const base = new URL(process.env.PORTFOLIO_QA_URL).origin;
  for (const [id, filename] of Object.entries(sources)) {
    const playback = await fetch(`${base}/api/media/${id}`, { method: "POST", headers: { Origin: base } });
    assert.equal(playback.status, 200, `${id}: playback API failed`);
    assert.ok(playback.headers.get("cache-control").includes("no-store"));
    const access = await playback.json();
    assert.match(access.url, /^\/_media\/[a-z]+-[a-f0-9]{20}\.bin$/);
    const encrypted = await fetch(`${base}${access.url}`);
    assert.equal(encrypted.status, 200);
    assert.ok(encrypted.headers.get("content-type").startsWith("application/octet-stream"));
    const original = await readFile(path.join(root, "media-sources", filename));
    assert.ok((await decrypt(Buffer.from(await encrypted.arrayBuffer()), access)).equals(original), `${id}: deployed ciphertext and playback key must match`);
    const oldUrl = await fetch(`${base}/videos/${filename}`, { method: "HEAD" });
    assert.equal(oldUrl.status, 404, `${id}: old playable MP4 must no longer be public`);
    report.hosted.push({ id, playback: playback.status, originalMp4: oldUrl.status });
  }
  assert.equal((await fetch(`${base}/api/media/youfira`)).status, 405);
  assert.equal((await fetch(`${base}/api/media/youfira`, { method: "POST" })).status, 403);
  assert.equal((await fetch(`${base}/api/media/youfira`, { method: "POST", headers: { Origin: "https://unrelated.example" } })).status, 403);
  assert.equal((await fetch(`${base}/api/media/missing`, { method: "POST", headers: { Origin: base } })).status, 404);
  assert.equal((await fetch(`${base}/src/lib/generated/video-manifest.server.json`)).status, 404);
}

console.log(JSON.stringify(report, null, 2));
