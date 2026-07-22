# New Prospect Workflow

## 1. Intake

Create a prospect workspace outside this master and copy `PROSPECT_INTAKE.example.yaml` into it. A send-ready preview requires:

- Real club name, location, league, links, and factual description
- Real full-color crest and, when available, a light crest
- Exact supplied color palette
- At least four real club photos
- Three manually supplied merchandise images
- Christian's approval of Codex-drafted club copy

Roster, staff, fixtures, results, statistics, and sponsors may be fictional sample content. Merchandise images are never generated automatically.

Also ask about these optional, config-driven features — most clubs won't want them, but confirm rather than assume: does the club's real site publish a **league standings table** (`ProspectConfig.standings`)? Do you have a real **team/group photo** suitable for the club page (`about.groupPhoto`)? Do you know player **nationalities** worth showing as flags (`Player.nationality`, see `src/lib/flags.ts` for supported demonyms)? Does the club have real **governing-body/league affiliation marks** (e.g. a national federation, a league logo) to show next to the crest (`Branding.affiliations`)?

## 2. Generate locally

Create a clean snapshot of this master without its Git history. Add `src/config/clubs/<club-slug>/`, point `src/config/prospect.ts` to it.

Populate every `ProspectConfig.copy` field. Shared screens must remain unchanged. Update `template/brand-leak-terms.json` so it includes Meridian/reference terms and any prior-club terms that must not survive.

### Image hosting (Supabase, not `public/prospect/`)

Every club's photographic assets (crest, club photos, merchandise photos) live in Supabase Storage, not the repo. This keeps generated sites off Vercel's Image Optimization quota — see `supabase-image-loader.js` and `next.config.ts` for how.

All prospect sites share **one** Supabase project: **Mockup_DB**, in the **Onzio Mockups** org (`https://ydvggllbrswfchgjhjhr.supabase.co`). Do not create a new project per club — everything lives in that project's single public `assets` bucket, split by a flat per-club folder inside it, e.g. `assets/yorbaFCAssets/`, `assets/onzioMockupsAssets/`. Follow the `<ClubName>Assets` naming convention for new folders (PascalCase club short name + `Assets`).

1. Collect the supplied raster images (crest, club photos, merchandise — skip SVGs, `next/image` doesn't optimize those anyway) into a single flat local folder named `<ClubName>Assets/` (no subfolders — everything sits directly inside it). Preserve the originals in the external intake folder regardless.
2. In the Supabase dashboard for **Mockup_DB** → **Storage** → **assets** bucket, drag that folder in. It'll land at `assets/<ClubName>Assets/...`, preserving structure. (Only you can do this step — the bucket intentionally has no public write policy, so it can't be scripted with the publishable key. Ask Christian if upload access is needed.)
3. `NEXT_PUBLIC_SUPABASE_URL` in `.env.local` / `.env.example` is already set to the shared project and shouldn't need to change per prospect. Leave `NEXT_PUBLIC_SUPABASE_IMAGE_TRANSFORMATIONS` unset — Mockup_DB is on the Free plan, which doesn't support on-the-fly resizing yet.
4. Reference images in the club config as full Supabase Storage public URLs: `${SUPABASE_URL}/storage/v1/object/public/assets/<ClubName>Assets/<filename>` — see `src/config/clubs/lions/index.ts` in `onzioMockups` or `src/config/clubs/yorba-linda-fc/index.ts` for the `ASSET_BASE` constant pattern to copy.

`public/prospect/` still holds any non-club static chrome the template itself ships with (e.g. placeholder sponsor marks) — only the club's real supplied photography moves to Supabase.

If a prospect ever converts to a real paying client, its folder can be copied into a dedicated production Supabase project at that point — nothing about the shared setup blocks that, it just isn't pre-isolated the way earlier drafts of this doc assumed.

## 3. Verify

Run:

```bash
npm run validate
```

Then verify desktop and mobile behavior in a browser:

- Pro opens with no query parameter.
- Starter and Pro switch together across public and admin surfaces.
- Starter mounts no Pro-only content.
- Header, roster, schedule, match areas, store, admin navigation, and sample mutations work.
- Reduced-motion behavior remains usable.
- Metadata, social links, copy, palette, and assets belong to the prospect.

Do not mark the preview ready while required assets, approved copy, or any validation is missing.

## 4. Review and publish

Present the local preview and validation report to Christian. Stop. Only an explicit publishing approval authorizes creation of the public GitHub repository, push, or Vercel deployment.

Generated prospect repositories are independent snapshots. Master changes apply only to future prospects unless a fix is deliberately ported or the preview is regenerated.
