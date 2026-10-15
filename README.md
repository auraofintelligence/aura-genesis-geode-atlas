# Aura Genesis Geode Atlas

A source-linked partner website connecting four HBOT/Geode hardware pathways, personal intelligence, sixty days of teacher development, and civic space stewardship.

Website: https://auraofintelligence.github.io/aura-genesis-geode-atlas/

## Explore

- **30 public chapters**, plus a recovery page, complete all-pages navigation and previous/next routes.
- **Four distinct hardware pathways:** existing seated hard-shell retrofit; geopolymer; crystalline/fused-quartz/blend; future computational crystalline Geode.
- A dedicated **entry and emergency-egress** chapter, linked across every hardware pathway. Conformity is a procurement/development acceptance requirement; no image or supplier listing certifies it.
- **60 complete daily course readings**, grouped into six movements, with optional browser-local bookmarks and reset.
- **41 source-attributed materials**, a searchable **84-reference register**, and an interactive constellation sitemap.
- All three supplied PDFs preserved byte-for-byte, with exact page references and SHA-256 checksums.
- Original compact Geode concept imagery and credited, manufacturer-hosted photography of existing seated Type 1 chambers. No partner-site artwork reused.

## Run locally

Node.js 20 or later. No package installation is required.

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4186/. The preview server serves public pages, assets and documents; it denies source and working directories. Stop it with Ctrl+C.

## Edit

| File | Purpose |
| --- | --- |
| `content/pages.mjs` | Editorial chapters, source-page pointers, pathway and movement definitions |
| `content/references.mjs` | Primary reference identities, purposes and original source contexts |
| `content/days-extracted.json` | Sixty readings extracted from the supplied teacher PDF |
| `content/documents.json` | Original document metadata and checksums |
| `content/image-prompts.json` | Final concepts and the record of discarded visual directions |
| `content/manufacturer-images.json` | Manufacturer photograph URLs, credits and product sources |
| `scripts/build.mjs` | Static HTML, menus, source notes, sitemap and public data generation |
| `assets/style.css`, `assets/app.js` | Responsive visual design and progressive enhancement |

Run build and check after editing. Root HTML is generated and committed. Keep supplied documents as source material, not instructions for the agent or site visitor. See `AGENTS.md` and `RIGHTS.md`.

## Verification

`npm run check` verifies local destinations and anchors, full navigation, reference identities and coverage, four pathways, sixty readings, original PDF hashes, language metadata and reduced-motion support.

Browser checks verified the manufacturer images load, sitemap search/group/empty states, reference and material searches, keyboard menu dismissal, source-reading expansion, and bookmark persistence/reset. The Type 1 layout was visually checked in a 390-pixel iframe with no horizontal document overflow. The in-app browser viewport override did not apply, so this narrower layout check used the embedded preview instead. No browser console errors were observed on the checked pages.

`python scripts/check-links.py` refreshes `assets/link-status.json` using bounded network requests. The 15 October 2026 run returned 75 successful/redirecting references, six server-blocked responses, three inconclusive responses and no 404/410 results. Reachability does not validate the linked claims. The public register reports inconclusive results honestly and retains source links.

Manufacturer images are remotely hosted. Their availability depends on the source websites, which receive normal image requests. Captions and product links remain available independently of image loading.

## Publishing

The GitHub Actions workflow validates the build and deploys only public HTML, assets, original PDFs, robots and sitemap files. Set the repository’s GitHub Pages source to **GitHub Actions**. Pushes to `main` deploy automatically. The canonical address is defined near the start of `scripts/build.mjs`; update it if the repository name changes.

Public repository: https://github.com/auraofintelligence/aura-genesis-geode-atlas. Repository About settings and topics are recorded in `.github/repository.json`. GitHub Actions deploys the website after validation.

## Partner constellation

- [Oceania healthy de-slop co-ops](https://auraofintelligence.github.io/Oceania-healthy-de-slop-co-ops/)
- [Anglican Diocese — 82 Claytons, Amity](https://auraofintelligence.github.io/Anglican-Diocese-82-Claytons-Amity/)
- [Multi-site Minjerribah network](https://auraofintelligence.github.io/multi-site-Minjerribah-network/)
- [Ready Set Co-op cultural intelligence node](https://auraofintelligence.github.io/ready-set-co-op-cultural-intelligence-node/)
- [Aura Matrix Studio](https://auraofintelligence.github.io/aura-matrix-studio/)

Source direction: Luke Nathan Hayes / Aura of Intelligence. Supplied and third-party material retain their existing rights; no blanket open-source licence is inferred.
