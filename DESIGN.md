# Design system — replicated from pariola.work

The homepage is a **1:1 layout replication of [pariola.work](https://pariola.work)**,
with Olamide's own copy. Method: fable-site-replication — every value below was
**measured** from the live site's computed styles, never eyeballed.

## Measured token inventory

| Token | Measured value (pariola.work) | Notes |
|---|---|---|
| Page background | `#f9f9f9` | |
| Ink (name, headings, labels) | `#060606` | |
| Muted (body, descriptions, dates) | `#666666` | |
| Base font size | `16px` everywhere | hierarchy = weight + colour, not size |
| Name / label weight | `600` | |
| Body weight | `400` | |
| Content column | `608px`, centred | 416px margins at 1440 |
| Section gap | `104px` | block → next section header |
| Name → hero body | `64px` | |
| Hero inter-paragraph | `24px` | |
| Card image ratio | `1.60` (16:10) | |
| Card corner radius | `0px` | sharp |
| Card title | `15px / 500 / #060606` | |
| Card description | `13px / 400 / #666666` | |
| Date stamp | `12px / 500 / #666666` | |
| Section-header icon | `24px`, 1.5 stroke, 0.8 opacity, 8px gap | asterisk/sparkle |
| Card hover | `transform 320ms ease-out` | subtle scale |

## Declared substitutions (per replication ethics — no silent swaps)

1. **Font** — `sanesans` is proprietary to pariola.work. Substituted with **Geist**
   (free; pariola loads it too, so metrics are close).
2. **Accent** — pariola's magenta `#d6409f` is *their* brand colour. Dropped for
   honest monochrome (ink links, underlined). This is the one deliberate divergence.
3. **Card thumbnails** — labelled placeholder frames until Figma exports land in
   `public/work/{pave,vendy}/`.
4. **Section icon** — recreated as an asterisk SVG at the measured 24px / 1.5 stroke.

## Content mapping (Pariola → Olamide)

| Pariola section | This site |
|---|---|
| Hero (name. / role / 3 paragraphs) | Same shape, Olamide's copy, "Product Designer" |
| Highlights (image cards) | **Selected work** — Pave, Authentication audit |
| Explorations + UI Components (dated list) | **For the love of design** — landing pages, brand, illustration |

## Diff loop (fable-site-replication Phase 4)

- **Pass 1 (1440):** column was 560px (24px padding shrank it inside 608) and grid
  cells 268px. Fixed the column model so 608 is the *content* width; cells → 292px
  (pariola 291). ✓
- **Verified mobile (375):** no horizontal overflow; 24px safe margins; cards stack.
- Column now 608 centred; images 292×182 at 16:10; section rhythm 104px — matches.

## Note

The case-study **detail** pages (`/work/[slug]`) were not part of pariola's measured
homepage. They keep their richer structure but now inherit this monochrome/Geist
palette for coherence — a restrained extension, not a claimed 1:1.
