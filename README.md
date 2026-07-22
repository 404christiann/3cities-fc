# 3 Cities FC — Onzio Sales Preview

An interactive concept preview for 3 Cities Football Club (Tri-Cities, WA), generated from the reusable Onzio prospect template. It presents a premium public website and a shared-state admin concept in Starter and Pro versions, without authentication, a database, payments, or persistent data.

This is an independent snapshot, not the reusable template. It does not automatically receive later changes made to the master template.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pro is the default experience. Use `?tier=starter` to review Starter explicitly.

## What's real vs. sample

- **Real:** club name, crest, city (Tri-Cities, WA: Kennewick, Pasco, Richland), contact email, league/venue facts (UPSL Washington Premier Division, Fran Rish Stadium), 7 real club photos, a real player-cutout photo, 2 real merchandise products (with real transparent front + back photos), and 3 real governing-body/league affiliation marks (US Soccer, FIFA, UPSL).
- **Sample only:** roster, staff, fixtures/results, league standings numbers, and sponsor names — opponent clubs are invented, not this club's actual current opponents. The 7 sponsor logo images are real files but borrowed from another club as placeholder art; the names paired with them are fictional. See `CLAUDE.md` for the full explanation.

## Club-specific configuration

All club-specific information lives in:

- `src/config/clubs/3cities-fc/`
- The single active import in `src/config/prospect.ts`

This snapshot also has the optional **Standings** feature enabled (most future prospects won't), and a `Product.featured` flag and `Branding.detailColor` field that were added to the master template during this build — see `CLAUDE.md` for details on where that code lives and how to change it.

## Validation

```bash
npm run validate:template
npm run validate
```

`validate:template` confirms the active configuration, referenced assets, Pro default, prospect-driven metadata, noindex policy, and shared-code brand isolation. `validate` also runs Next.js type generation, strict TypeScript, ESLint, and a production build.

## Publishing status

Pushed to `git@github.com:404christiann/3cities-fc.git`. Vercel deployment is being completed manually by Christian via the dashboard. Full intake, research sources, and round-by-round review history live outside this repo in the sibling `intake/` folder (`PROSPECT_INTAKE.yaml`).
