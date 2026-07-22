# Agent Handoff

## Status

This is the clean Onzio prospect master template. Meridian United is fictional reference data used to verify the design. Do not turn this repository into a real prospect or publish a generated prospect without Christian's explicit approval.

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
- `src/config/prospect.ts` is the only active-club import.
- `src/lib/tiers.ts` owns Starter/Pro feature gates.
- `src/lib/store/MockDataProvider.tsx` owns shared in-memory sample mutations.
- `src/lib/flags.ts` maps roster/staff `nationality` values to flag images hosted in the shared `flags` Supabase bucket — covers a broad set of common demonyms across every confederation so most fictional rosters won't need this file edited.
- `public/prospect/` contains only template-owned static chrome (e.g. placeholder sponsor marks), not a club's real photography.
- `supabase-image-loader.js` + `next.config.ts` route `next/image` through the shared Mockup_DB Supabase project (org: Onzio Mockups) instead of Vercel's Image Optimization API. One project, one public `assets` bucket, one flat folder per club (`assets/<ClubName>Assets/...`). See `docs/NEW_PROSPECT.md` for the per-club upload workflow.
- `scripts/validate-template.mjs` enforces the reusable boundary.

Before editing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` as required by `AGENTS.md`.

## Optional features

These are config-driven and invisible unless a prospect populates them — most clubs won't. Meridian's reference config populates all of them so they're exercised by the template's own build:

- **Standings** (`ProspectConfig.standings`) — a sortable league table rendered on the homepage after the sponsors section, plus `/admin/standings` for add/edit/remove. For clubs whose real site publishes a league table.
- **Group photo** (`ProspectConfig.about.groupPhoto`) — a real team photo on `/club`, directly below the mission pull-quote.
- **Roster nationality flags** (`Player.nationality` / `StaffMember.nationality`) — renders a flag next to the name on roster/staff cards and profile modals via `src/lib/flags.ts`.
- **Governing-body/league affiliations** (`Branding.affiliations`) — a small logo cluster next to the crest in the header.
- **Product back photo** (`Product.backImage`) — adds a Front/Back toggle in the store's product detail modal.

## Locked product behavior

- Pro opens when the URL has no `tier` query.
- `?tier=starter` and `?tier=pro` are shareable.
- Starter suppresses sponsor, store, statistics, seasons, standings, and analytics content.
- Public and admin surfaces share the same tier and in-memory sample state.
- Sample changes reset on refresh.
- The concept-preview disclosure and `noindex`/`nofollow` metadata are mandatory.
- The supplied prospect palette is exact; only neutral white, black, and gray may supplement it.

## Non-goals

Do not add authentication, persistence, databases, API routes, server actions, payments, tracking, multi-tenancy, or production operations. A signed client graduates to a separately scoped production project.

## Publishing gate

Generation, local verification, and user review do not authorize GitHub or Vercel publication. Publishing requires an explicit green light from Christian.
