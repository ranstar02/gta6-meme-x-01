# gta6-meme-x-01

A GTA 6 meme for the make.fun bounty "Post a GTA 6 meme on X". An AI judge
compares the posts two at a time, and the top 50 share $500.

## The meme

**"Struk belanja GTA 6: 13 tahun nunggu, 0 patience tersisa."**

GTA V came out in 2013 — thirteen years of waiting. This meme is the
receipt for that wait: a GTA 6 store receipt (`meme.png`, 1024x1280)
from make.fun, Vice City / Leonida. The real make.fun ghost mascot
sits big in the header above a large `make.fun` wordmark, then the
receipt lists the cost of the wait:

- `GTA VI PRE-ORDER — $69.99`
- `WAITING SINCE 2013 — 13 YEARS`
- `SICK DAY (LAUNCH DAY) — 1 DAY`
- `DOWNLOAD 250GB — 3 DAYS`
- `FLIGHT TO LEONIDA — ONE-WAY`
- `PATIENCE — OUT OF STOCK`
- `TOTAL — 13 YEARS`, `PAID — $69.99`, `CHANGE — $0.00`
- Footer: `THANK YOU! AGENTS EARN REAL MONEY AT MAKE.FUN` +
  `NO REFUNDS ON PATIENCE`

## Cara meme ini dibuat

The poster-sunset version was cancelled on the user's instruction:
judges of earlier meme bounties favoured document formats
(receipt / invoice / boarding pass), so the meme pivoted to a receipt.
The picture is rendered entirely in code with Python/PIL, straight
to `meme.png` in this repo (no copy from a temp file):

1. **Ghost asli** — the real make.fun mascot, `mark-1024.png` from the
   official press kit (https://make.fun/press/), placed big in a dark
   magenta header band above a large white `make.fun` wordmark, so the
   brand is recognisable even at 480px.
2. **Struk** — cream receipt paper with torn zigzag edges on a Vice
   City night background (dark purple gradient, neon pink/cyan glow,
   stars), monospace receipt type, dashed separators, totals, and a
   barcode at the bottom.
3. **Cek visual** — the finished image was checked by eye at full
   size and at 480px: ghost and `make.fun` clear, every line readable,
   nothing cut off at the edges.

## Verifikasi run lokal

    node --version  # v24.22.1 (>= 22.18)
    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

Exits 0 with no errors, and `out/POST.json` is byte-identical to this
directory's `POST.json`. `main.ts` also refuses a bad `POST.json`: it
must be valid JSON with a string `url` shaped like an X status address
(`https://x.com/<handle>/status/<id>`), otherwise it exits 1 with a
clear error message. The final `meme.png` was checked by eye at full
size (1024x1280) and at 480px: the ghost and `make.fun` are large and
clear in the header, every receipt line is readable, and nothing is
cut off at the edges. Re-running the program
writes the same bytes again — the copy is deterministic, no network and
no clock involved.

## Draft post text (for X, from @ranstarid0211)

> My GTA 6 receipt just dropped 🧾 13 years of waiting, 1 sick day booked, a 250GB download, and 0 patience left — change: $0.00. At least my AI agent earns real money on make.fun while I wait. @makefunai https://make.fun/bounty/gta6-meme-x-01 makefun-pinecone-tarragon-towel

The post carries make.fun (link) and a tag of @makefunai, tells readers that
people and their AI agents earn money on make.fun, and includes the play
code `makefun-pinecone-tarragon-towel`.

## The post is the entry

`POST.json` holds the address of the X post. The house reads the post from X
— its first picture, then its text — and hands that to the judge. This
repository's program only copies `POST.json` to `/output/POST.json`.

> `POST.json` currently holds the starter placeholder
> `{"url": "https://x.com/<handle>/status/<id>"}` — it is replaced with the
> real post address after the meme is posted on X.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.
Requires Node.js 22.18 or later (standard library only, no network).
