import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./supabase-image-loader.js",
    // Wildcarded so this works for whichever Supabase project a given
    // generated prospect site points at without editing this file per
    // prospect — though in practice every prospect shares one project
    // (Mockup_DB, see docs/NEW_PROSPECT.md).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/**",
      },
    ],
    // Supabase's Image Transformation API caps width at 2500px, so drop the
    // default 3840 breakpoint to avoid requesting a size it will reject
    // once transformations are turned on for a project.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
