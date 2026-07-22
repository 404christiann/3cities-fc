# 3 Cities FC Snapshot — Build Record

This repo was generated from the Onzio prospect master template on 2026-07-22 and customized for 3 Cities Football Club. Full intake, research sources, and grill-me interview decisions live outside this repo in the sibling `intake/` folder (`PROSPECT_INTAKE.yaml`) — this file is a short in-repo summary for anyone who only has this git repository.

## What makes this snapshot different from a fresh generation

- Real crest, 7 real club photos, and a real transparent-cutout player photo reused in two places (store featured product, first goalkeeper's roster photo).
- 2 real merchandise products (blue home jersey, white away jersey) with real transparent front + back photos — only 2 supplied, not the usual 3.
- Real governing-body/league affiliation marks: US Soccer, FIFA, UPSL, shown next to the crest in that order.
- Exact supplied palette (`#171926` navy / `#0221AD` blue / `#FFFEFF` accent / `#DED39D` detail) — the accent/detail split (see below) is unique to this club.
- Standings feature turned on, with the club's own row auto-highlighted via an exact `teamName` match to `club.name`.
- Homepage section order customized: sponsors moved above "Next match".
- Sponsor logos are real image files borrowed from Yorba Linda FC's actual sponsor bucket, explicitly approved by Christian as placeholder art after being shown the company names would be legible — paired with fictional sponsor names.

## Master-template fixes discovered and ported during this build

A few real gaps/bugs were found while building this snapshot and fixed in the master template first, then ported here (not snapshot-only patches):

- **`Branding.detailColor`** — the template only had 3 color slots (primary/secondary/accent), with `accentColor` driving both broad UI (headline text, CTA buttons, footer text) and small decorative hairlines through one shared token. Added a 4th optional slot so a club can use one color broadly and reserve a different color for small finishes only. Backward-compatible (falls back to `accentColor`).
- **`Product.featured`** — the store's featured/hero product was hardcoded to `products[0]`, with no way to feature a different product without reordering the whole array (which would also change the catalog grid's card-color pairing). Added an optional flag to decouple the two concerns.
- **`.store-featured-image.is-hero-photo` letterboxing** — relied on CSS `aspect-ratio` inside a CSS Grid item whose only content is absolutely-positioned (`next/image fill`), which has a known WebKit/Safari interop gap. Replaced with the universally-supported padding-percentage intrinsic-ratio technique. Fixing this surfaced a second, self-introduced bug — a horizontal margin on the same element was throwing off the percentage calculation (percentage `padding-top` resolves against the *containing block's* width, not the element's own post-margin width) — caught via live computed-style verification and corrected by moving that inset to the parent's padding instead.
- **`.kit-home` / `.store-campaign` spacing** — excess section padding and an oversized `.kit-product` min-height were flagged as too much whitespace; reduced across all breakpoints.
- **`.store-campaign` background** — was a flat color that visually blended into the following white section with no boundary; changed to a gradient (matching the homepage hero's existing treatment) with added bottom padding so the featured card reads as intentionally bounded.

## Known non-blocking items

- Only 2 real merchandise products supplied, not 3 — Christian confirmed this is fine for this preview.
- `SiteFooter.tsx` has no Facebook icon branch despite this club needing one (both Instagram and Facebook were supplied) — flagged as a master-template gap, not fixed this session.

## Release definition

Ready only after: intake completion, copy approval, template validation, type generation, strict TypeScript, ESLint, production build, and desktop/mobile browser verification — all passing. External publishing (GitHub push) has Christian's explicit approval and is complete; Vercel deployment is being completed manually by Christian.
