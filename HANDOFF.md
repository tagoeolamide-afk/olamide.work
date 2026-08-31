# Finishing the portfolio

The site is **design-complete and builds clean**. What's left is content you own.
Work through these four things and it ships.

Run it locally any time:

```bash
npm run dev
```

Then open http://localhost:3000 · case studies at `/work/pave` and `/work/authentication-audit`.

---

## 1. Drop in the Figma exports

Every image slot currently shows a labelled placeholder frame naming what belongs
there. Export each screen from Figma as PNG and save it to the exact path below —
the frame is replaced automatically, no code change needed. (Slots you don't fill
keep their placeholder; that's fine to ship if a shot doesn't exist.)

**Pave** → `public/work/pave/`

| File | What it should show |
|---|---|
| `hero.png` | Populated dashboard — the strongest single screen |
| `scope.png` | Scope diagram: four pillars → three (or skip) |
| `balance.png` | Receiving-details screen with the naira-settlement note |
| `convert.png` | Convert & withdraw, showing rate + fee + final amount |
| `onboarding.png` | Onboarding / sign-up |
| `empty-dashboard.png` | Empty dashboard with its single call to action |

**Vendy** → `public/work/vendy/`

| File | What it should show |
|---|---|
| `hero.png` | Your strongest **redesigned** sign-up (not the before-shot) |
| `frameworks.png` | The four-framework diagram (or skip) |
| `tokens.png` | Extracted colour/type/component tokens |
| `error-states.png` | Before/after of the login error messaging |
| `password-checklist.png` | Real-time password checklist |
| `rate-limit.png` | Disabled button + countdown |
| `dashboard.png` | Redesigned dashboard empty state with setup checklist |

Ideal export width ~1600px. The layout handles any aspect ratio.

---

## 2. Fill the TODO fields — `src/content/site.ts`

- **Confirm your name** (I inferred "Olamide Tagoe" from your email).
- `location` and `availability` — currently placeholder-reasonable, make them true.
- `links` — add real LinkedIn / GitHub / Dribbble / Behance / resume URLs.
  Empty ones simply don't render, so only fill what you have.

---

## 3. Decide the Vendy naming — `src/content/case-studies.ts`

At the top of that file is a `PLATFORM` object. Right now the audit is
**anonymised** ("a YC-backed Nigerian payments platform").

- **If you disclose the findings to Vendy first** (even a short email), set
  `disclosed: true` and, if you want, `name: "Vendy"`. Disclosing unlocks a line
  in the Outcomes section — *"I shared these findings with their team"* — which
  is the single most credible sentence in the whole case study.
- **If you don't want to disclose**, leave it anonymised. You lose nothing that
  matters: the artifact proves how you think, and the company name was never the point.

Publishing a named company's live auth weaknesses *before* telling them reads as a
judgment flag to security-conscious hiring managers — the opposite of what this
piece should do for you. That's the whole reason it defaults to anonymised.

---

## 4. Fill "For the love of design" — `src/content/site.ts`

The `craft` array drives this section (dated list). It's seeded with one real item
(Koffi landing page) and two `TODO` placeholders. Replace them with your real
landing pages, brand work, and illustrations — each needs a `title`, one-line
`descriptor`, and `date`. Add a `href` if a piece has a link. Add or remove freely.

---

## Where things live

| | |
|---|---|
| All copy | `src/content/site.ts`, `src/content/case-studies.ts` |
| Design system + provenance | `src/app/globals.css`, `DESIGN.md` |
| Homepage | `src/app/page.tsx` |
| Case study template | `src/app/work/[slug]/page.tsx` |
| Row index / image frame | `src/components/RowIndex.tsx`, `src/components/Figure.tsx` |

## Deploy

Push to a Git repo and import it on **Vercel** — Next.js deploys with zero config.
`npm run build` already passes, so it will build there too.
