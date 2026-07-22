# Agent Handoff

## Status

This is the **3 Cities FC** prospect snapshot — a generated Onzio sales preview, not the master template. It is an independent copy: it does not automatically receive later changes made to the master template at `onzioProspectTemplate`, and it must not be treated as reusable reference data for other clubs.

Real: club name, crest, city (Tri-Cities, WA), contact email, league/venue facts (UPSL Washington Premier Division, Fran Rish Stadium, Richland), 7 real club photos, a real transparent-cutout player photo (used as both the store's featured product photo and the first goalkeeper's roster photo), 2 real merchandise products with real transparent front + back photos (blue home jersey, white away jersey), and real governing-body/league affiliation marks (US Soccer, FIFA, UPSL). Fictional sample content: roster, staff, fixtures/results, and league standings numbers (opponent clubs are invented, not the club's real current opponents).

**Sponsor logos are a special case:** the 7 sponsor logo *images* are real files borrowed from Yorba Linda FC's actual sponsor bucket (Azure, Fidelity, Flowable, IBM, Mark43, Pega, Shift Sports) — several are legible wordmarks. Christian explicitly approved reusing them as placeholder art for this concept preview after being shown that the company names would be visible in the artwork. The sponsor *names* shown in the config (Columbia Valley Wine Co., Blue Bridge Brewing, etc.) are fictional and do not correspond to the logos — do not mistake this repo's sponsor section for real 3 Cities FC sponsorship relationships.

Published: pushed to `git@github.com:404christiann/3cities-fc.git` (branch `main`). Vercel deployment is being done manually by Christian via the dashboard, not through this session.

## Commands

```bash
npm run dev
npm run lint
npx next typegen
npx tsc --noEmit --pretty false
npm run build
npm run validate:template
npm run validate
```

## Architecture

- Next.js App Router, React, strict TypeScript, Tailwind CSS v4, GSAP/ScrollTrigger, and Framer Motion.
- Sora (display/headings), Inter (body/UI), and Geist Mono (numeric/label accents) are checked in under `src/app/fonts/` and loaded with `next/font/local` so clean builds do not require network access.
- `src/app/(public)/` contains the public club experience.
- `src/app/admin/` contains the sample admin experience.
- `src/config/types.ts` defines the prospect contract, including all identity-driven copy.
- `src/config/clubs/3cities-fc/index.ts` is this club's only config — the single source of truth for identity, copy, roster, fixtures, and standings.
- `src/config/prospect.ts` is the only active-club import.
- `src/lib/tiers.ts` owns Starter/Pro feature gates.
- `src/lib/store/MockDataProvider.tsx` owns shared in-memory sample mutations.
- `src/lib/flags.ts` maps roster/staff `nationality` values to flag images hosted in the shared `flags` Supabase bucket.
- `public/prospect/` contains only template-owned static chrome (placeholder sponsor marks used elsewhere in the master), not this club's real photography — this club's real assets are hosted on Supabase (`assets/3citiesFCAssets/`) and referenced by full URL directly in the config.
- `scripts/validate-template.mjs` enforces the reusable boundary (still runs here even though this isn't the master — it checks this repo's own shared-code isolation).

## Features enabled for this club

- **Standings** (`ProspectConfig.standings`) — a sample UPSL Washington Premier Division table on the homepage. The auto-highlight/bold styling for the club's own row depends on `StandingsRow.teamName` matching `ClubIdentity.name` **exactly** (not `shortName`) — that's why the standings row is named "3 Cities Football Club" rather than "3 Cities FC". `teamLogo` is also set on that row to the real crest.
- **Group photo** (`about.groupPhoto`) — a real team photo on `/club`, below the mission pull-quote.
- **Roster nationality flags** — mixed-nationality fictional roster (American, Mexican, Honduran, Salvadoran, Brazilian).
- **Governing-body/league affiliations** — US Soccer, FIFA, UPSL logos next to the crest, in that order.
- **Product back photo** — Front/Back toggle on both jerseys.
- **`Product.featured`** — the white away jersey (`prod02`) has `featured: true` so the store's hero panel shows its name/price alongside the real player-cutout photo, independent of catalog card order (see Store section below).

## Homepage section order

Hero → Shop the collection → Sponsors (moved above Next Match at Christian's request — **not** master's default order, a snapshot-only `HomeScreen.tsx` reorder) → Next match → League standings → Matchday gallery → "Ready to join?" recruiting CTA (real goalkeeper-gloves photo, cropped so the gloves/ball are the visible focal point) → Footer.

## Store (`/store`)

- The featured product panel uses the real player-cutout photo (`branding.storeHeroImage`) paired with whichever product has `featured: true` (the away jersey) — **not** simply `products[0]`, which is the home jersey. This decoupling exists specifically so the catalog grid's card-color pairing (home jersey on the light/white card, away jersey on the dark card) can stay fixed regardless of which product is featured.
- `/sponsors` renders as a flat scrolling marquee (not tiered Title/Premier/Club sections) because all 7 sponsors share the same `level: "partner"` — the shared `SponsorsScreen.tsx` auto-switches to flat mode when only one tier is populated.

## Master-template fixes discovered and ported during this build

Several real defects/gaps were found while building this snapshot and fixed in the master template first, then ported here (not snapshot-only patches):

- **`Branding.detailColor`** (`types.ts`, `layout.tsx`, `globals.css`) — a new optional small-finish color, separate from `accentColor`. Added because this club wanted white used broadly (headline text, CTA buttons, footer text — all driven by `accentColor`) but gold reserved only for hairline borders/dividers on dark surfaces (`--on-dark-line`, now derived from `--club-detail` instead of `--club-accent`). Falls back to `accentColor` for any prospect that doesn't set it, so this is fully backward-compatible.
- **`Product.featured`** (`types.ts`, `StoreScreen.tsx`) — see Store section above. Falls back to `products[0]` when unset.
- **`.store-featured-image.is-hero-photo` mobile letterboxing** (`globals.css`) — the featured product photo relied on `aspect-ratio`, which has a real WebKit/Safari interop gap with CSS Grid auto-track sizing when the only content is absolutely-positioned (exactly this shape, since `next/image fill` renders `position:absolute`). Replaced with the classic `height:0; padding-top:calc(3439/2932*100%)` intrinsic-ratio technique, which has universal browser support. This also required moving a 30px horizontal inset from the image element's own `margin` to the *parent's* `padding` — percentage `padding-top` resolves against the containing block's width, not the element's own post-margin width, so leaving the margin in place silently produced a wrong ratio (~0.739 instead of 0.8525). Caught via live computed-style verification, not just static reasoning.
- **`.kit-home` / `.store-campaign` spacing** (`globals.css`) — reduced section padding, header-to-cards margin, and `.kit-product` min-height (520px → 420px desktop, with proportional reductions at every breakpoint) to remove excess whitespace Christian flagged in the "Concept collection" section.
- **`.store-campaign` background** (`globals.css`) — changed from a flat `--primary-deep` fill to a gradient into `--accent` (matching the homepage hero's treatment) plus non-zero bottom padding, so the white featured-product card reads as an intentionally bounded card rather than visually melting into the white catalog section below it.

## Known non-blocking items

- Only 2 real merchandise products were supplied (blue home jersey, white away jersey) rather than the usual 3 — built with 2 real products, nothing fabricated.
- `SiteFooter.tsx` only renders Instagram/YouTube social icons — there's no Facebook icon branch despite `ContactInfo.social` supporting it and this club needing it (both Instagram and Facebook were supplied). Flagged as a master-template gap, not fixed in this session.
- Sponsor logo images are borrowed placeholder art from another club's real sponsors — see Status section above.

## Locked product behavior

- Pro opens when the URL has no `tier` query.
- `?tier=starter` and `?tier=pro` are shareable.
- Starter suppresses sponsor, store, statistics, seasons, standings, and analytics content.
- Public and admin surfaces share the same tier and in-memory sample state.
- Sample changes reset on refresh.
- The concept-preview disclosure and `noindex`/`nofollow` metadata are mandatory.
- The supplied prospect palette is exact (`#171926` navy primary, `#0221AD` blue secondary, `#FFFEFF` used as the broad accent role, `#DED39D` gold used only as the small-finish detail role); only neutral white, black, and gray may supplement it.

## Non-goals

Do not add authentication, persistence, databases, API routes, server actions, payments, tracking, multi-tenancy, or production operations. A signed client graduates to a separately scoped production project.

## Publishing status

Pushed to GitHub. Vercel deployment is being completed manually by Christian, not through this agent session — no `.vercel` project link exists in this repo.
