// Routes next/image requests for Supabase-hosted prospect assets through
// Supabase's own Image Transformation API instead of Vercel's Image
// Optimization API. All generated prospect sites share one Supabase
// project — Mockup_DB, org Onzio Mockups (see docs/NEW_PROSPECT.md) — so
// this loader just reads whichever URL is set in NEXT_PUBLIC_SUPABASE_URL
// (same value across every generated site, see .env.example).
//
// Using a custom loader (images.loader = "custom" in next.config.ts) means
// Next never calls Vercel's own optimizer at all — the URL this function
// returns is fetched directly by the browser. That's true whether or not
// Supabase actually transforms the image, which matters because:
//
// Image Transformations are a Supabase Pro-only feature. Mockup_DB is on
// the Free plan, where the /render/image endpoint isn't available. Until
// it's upgraded, this loader just returns the plain Storage object URL
// unchanged — images serve at their original size/format (no resizing),
// but critically still never touch Vercel's Image Optimization quota.
// Flip NEXT_PUBLIC_SUPABASE_IMAGE_TRANSFORMATIONS to "true" once the
// project is on Pro to turn on real resizing.
//
// Local static assets under /public are not hosted on Supabase, so they're
// passed through unchanged and served as-is (no optimization either way).

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const transformationsEnabled =
  process.env.NEXT_PUBLIC_SUPABASE_IMAGE_TRANSFORMATIONS === "true";

export default function supabaseLoader({ src, width, quality }) {
  if (!supabaseUrl || !src.startsWith(supabaseUrl)) {
    return src;
  }

  if (!transformationsEnabled) {
    return src;
  }

  const transformedSrc = src.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  );

  const params = new URLSearchParams({
    width: String(width),
    quality: String(quality ?? 75),
    // Without an explicit resize mode, Supabase's transform API defaults to
    // "fill", which only changes the width and leaves height at the
    // source's original pixel height — badly stretching every non-square
    // image. "contain" scales proportionally instead.
    resize: "contain",
  });

  return `${transformedSrc}?${params.toString()}`;
}
