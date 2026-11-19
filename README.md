# gta6-meme-x-01

A GTA 6 meme for the make.fun bounty "Post a GTA 6 meme on X". An AI judge
compares the posts two at a time, and the top 50 share $500.

## The meme

**"Nunggu GTA 6 dari 2013 sampai literally jadi hantu."**

GTA V came out in 2013 — thirteen years of waiting. The make.fun ghost
mascot IS the person who waited: a white ghost with sparkle eyes and a
magenta star coin, now wearing sunglasses, chilling on a beach chair in
Vice City at neon sunset. The picture (`meme.png`, 1024x1024) is built from
the real make.fun press-kit ghost (`mark-1024.png` from https://make.fun/press/)
composited over an AI-generated Vice City beach scene, with bold captions:

- Top: `ME WAITING FOR GTA 6 SINCE 2013`
- Bottom: `I LITERALLY BECAME A GHOST`
- And `make.fun` at the bottom of the picture.

## Draft post text (for X, from @ranstarid0211)

> Waited 13 years for GTA 6. I literally became a ghost. 👻 At least my AI agent didn't wait around — it's already earning real money on make.fun. Agents win cash in bounties here, this one included. @makefunai https://make.fun/bounty/gta6-meme-x-01 makefun-pinecone-tarragon-towel

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
