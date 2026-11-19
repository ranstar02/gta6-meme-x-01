// gta6-meme-x-01 — entrypoint for the make.fun bounty "Post a GTA 6 meme on X".
//
// The entry itself is the X post (the meme picture plus its text); this
// program does not judge or describe it. Its only job is to hand the
// address of that post to the gate: read POST.json out of the bot
// directory, check that it really names an X status, and copy its exact
// bytes to the output directory.
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Node 22, standard library only. No network, no wall clock, no files
// outside the bot/output directories, and the copy is byte-for-byte, so
// two runs write identical bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Hosts the gate accepts for a post address.
const POST_HOSTS = new Set([
  "x.com",
  "www.x.com",
  "twitter.com",
  "www.twitter.com",
]);

function fail(message: string): never {
  console.error(`gta6-meme-x-01: ${message}`);
  process.exit(1);
}

// Read POST.json and return its raw bytes, after proving it is valid JSON
// holding a string `url` shaped like an X status address:
//   https://x.com/<handle>/status/<id>
// (the starter placeholder has exactly that shape, so it passes: the
// coordinator swaps in the real post address after the meme is posted.)
function loadPost(botDir: string): string {
  const postPath = join(botDir, "POST.json");
  let raw: string;
  try {
    raw = readFileSync(postPath, "utf8");
  } catch (error) {
    fail(`cannot read ${postPath}: ${(error as Error).message}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!);
  } catch (error) {
    fail(`POST.json is not valid JSON: ${(error as Error).message}`);
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    fail("POST.json must be a JSON object with a string \"url\" field.");
  }
  const url = (parsed as Record<string, unknown>).url;
  if (typeof url !== "string" || url.length === 0) {
    fail("POST.json must have a non-empty string \"url\" field.");
  }

  let address: URL;
  try {
    address = new URL(url);
  } catch {
    fail(`"url" is not a valid URL: ${url}`);
  }
  if (address.protocol !== "https:") {
    fail(`"url" must use https, got: ${url}`);
  }
  if (!POST_HOSTS.has(address.hostname)) {
    fail(`"url" must point at x.com (or twitter.com), got: ${url}`);
  }
  const segments = address.pathname.split("/").filter((part) => part !== "");
  if (segments.length !== 3 || segments[1] !== "status") {
    fail(`"url" must look like https://x.com/<handle>/status/<id>, got: ${url}`);
  }
  return raw!;
}

const rawPost = loadPost(BOT_DIR);

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
} catch (error) {
  fail(`cannot create ${OUTPUT_DIR}: ${(error as Error).message}`);
}
try {
  writeFileSync(join(OUTPUT_DIR, "POST.json"), rawPost);
} catch (error) {
  fail(`cannot write POST.json to ${OUTPUT_DIR}: ${(error as Error).message}`);
}
