import type { Fixture, Player, Position, ProspectConfig, StaffMember } from "@/config/types";

// Hosted in the Mockup_DB Supabase project (org: Onzio Mockups), bucket
// "assets", folder "3citiesFCAssets" — see supabase-image-loader.js and
// next.config.ts for why these route through Supabase instead of Vercel's
// Image Optimization API.
const ASSET_BASE =
  "https://ydvggllbrswfchgjhjhr.supabase.co/storage/v1/object/public/assets/3citiesFCAssets";

// Same Supabase project, separate bucket ("leagueLogos"). Real UPSL
// governing-league mark shown in the nav next to the crest — color variant
// for the solid/scrolled nav, white variant for the transparent nav over a hero.
// Real transparent-cutout player photo, also used as the store's featured
// product image — reused here for the first-team roster's starting
// goalkeeper so one real photo appears in both places.
const PLAYER_PHOTO = `${ASSET_BASE}/${encodeURIComponent("3 Cities FC roster pic example website cutout.png")}`;

const LEAGUE_LOGO_BASE =
  "https://ydvggllbrswfchgjhjhr.supabase.co/storage/v1/object/public/leagueLogos";
const leagueLogo = (fileName: string) => `${LEAGUE_LOGO_BASE}/${encodeURIComponent(fileName)}`;

// Same Supabase project, separate bucket ("sponor_logos"). Placeholder mark
// art only for this concept preview's fictional sponsor slots — the homepage
// carousel and /sponsors page render the logo image only (name is alt-text/
// admin-only, never shown as a visible label), so no real company name is
// displayed anywhere on the public site.
const SPONSOR_LOGO_BASE =
  "https://ydvggllbrswfchgjhjhr.supabase.co/storage/v1/object/public/sponor_logos/yorbaLindaFC";
const sponsorLogo = (fileName: string) => `${SPONSOR_LOGO_BASE}/${encodeURIComponent(fileName)}`;

const firstTeam: Array<[string, string, number, Position, string]> = [
  ["Diego", "Aguilar", 1, "GK", "Mexican"], ["Marcos", "Villanueva", 30, "GK", "American"],
  ["Andres", "Reyes", 2, "DF", "Mexican"], ["Bryan", "Cortez", 3, "DF", "Honduran"], ["Josue", "Ramirez", 4, "DF", "American"], ["Kevin", "Salgado", 5, "DF", "Salvadoran"], ["Erick", "Fuentes", 15, "DF", "Mexican"], ["Tyler", "Whitfield", 22, "DF", "American"],
  ["Jesus", "Delgado", 6, "MF", "Mexican"], ["Angel", "Barrera", 8, "MF", "American"], ["Christian", "Nava", 10, "MF", "Mexican"], ["Mateo", "Solis", 14, "MF", "Honduran"], ["Ryan", "Bishop", 18, "MF", "American"], ["Emilio", "Vargas", 21, "MF", "Brazilian"],
  ["Alexis", "Duarte", 7, "FW", "Mexican"], ["Julian", "Mercado", 9, "FW", "American"], ["Devon", "Pratt", 11, "FW", "American"], ["Nestor", "Chavez", 19, "FW", "Salvadoran"],
];

// Sample hometowns cycling across the fictional roster — Tri-Cities, WA is
// actually three cities (Kennewick, Pasco, Richland), which is the club's
// own namesake, so the cycle reflects that literally.
const HOMETOWN_POOL = ["Kennewick, WA", "Pasco, WA", "Richland, WA", "Tri-Cities, WA"];

const makePlayers = (rows: Array<[string, string, number, Position, string]>, teamId: string, start: number): Player[] =>
  rows.map(([firstName, lastName, number, position, nationality], index) => ({
    id: `p${String(start + index).padStart(2, "0")}`, teamId, firstName, lastName, number, position, nationality,
    ...(teamId === "first" && index === 0 ? { photo: PLAYER_PHOTO } : {}),
    hometown: HOMETOWN_POOL[index % HOMETOWN_POOL.length],
    height: position === "GK" ? "6'2\"" : index % 2 ? "5'10\"" : "6'0\"", yearJoined: 2024 + (index % 3),
    bio: `${firstName} brings composure, work rate, and a team-first edge to 3 Cities FC — the kind of regional talent this club was built to give a stage.`,
    stats: { appearances: 9, starts: 5 + (index % 4), minutes: 460 + index * 24, goals: position === "FW" ? 3 + index % 4 : position === "MF" ? index % 3 : 0, assists: position === "MF" ? 1 + index % 4 : index % 2, yellowCards: index % 3, redCards: 0, ...(position === "GK" ? { cleanSheets: 3, saves: 28 + index * 3 } : {}) },
  }));

const played = (id: string, seasonId: string, opponent: string, date: string, clubScore: number, opponentScore: number, homeAway: "home" | "away", venue: string, attendance?: number): Fixture => ({
  id, teamId: "first", seasonId, opponent, date, venue, homeAway, competition: "UPSL Washington Premier Division", status: "played",
  result: { clubScore, opponentScore, attendance, scorers: clubScore ? ["A. Duarte 24'", "J. Mercado 68'"].slice(0, clubScore) : [] },
});
const upcoming = (id: string, seasonId: string, opponent: string, date: string, homeAway: "home" | "away", venue: string): Fixture => ({
  id, teamId: "first", seasonId, opponent, date, venue, homeAway, competition: "UPSL Washington Premier Division", status: "upcoming",
});

const staff: StaffMember[] = [
  { id: "st01", teamId: "first", name: "Rafael Medina", role: "Head Coach", nationality: "Mexican", bio: "Leads training and matchday preparation for the first team." },
  { id: "st02", teamId: "first", name: "Trevor Combs", role: "Assistant Coach", nationality: "American" },
  { id: "st03", teamId: "first", name: "Iker Salinas", role: "Goalkeeper Coach", nationality: "Honduran" },
  { id: "st04", name: "Sarah Boone", role: "Athletic Trainer", nationality: "American" },
  { id: "st05", name: "Marcus Webb", role: "Club General Manager", nationality: "American" },
];

export const threeCitiesFc: ProspectConfig = {
  club: {
    name: "3 Cities Football Club",
    shortName: "3 Cities FC",
    initials: "3CFC",
    tagline: "Semi-pro soccer for the Tri-Cities.",
    foundedYear: 2024,
    league: "UPSL Washington Premier Division",
    city: "Tri-Cities",
    state: "WA",
    venue: "Fran Rish Stadium",
  },
  branding: {
    primaryColor: "#171926",
    secondaryColor: "#0221AD",
    accentColor: "#FFFEFF",
    detailColor: "#DED39D",
    crest: `${ASSET_BASE}/${encodeURIComponent("3 Cities Football Club.png")}`,
    heroImage: `${ASSET_BASE}/player_action1.jpg`,
    heroImageAlt: "A 3 Cities FC player in the club's blue kit dribbles the ball during a UPSL Washington Premier Division match",
    galleryImages: [
      { src: `${ASSET_BASE}/hand_shake.jpg`, orientation: "landscape", alt: "Two 3 Cities FC players shake hands and share a laugh on the pitch after a match" },
      { src: `${ASSET_BASE}/player_action2.jpg`, orientation: "portrait", alt: "A 3 Cities FC midfielder strikes the ball during a match" },
      { src: `${ASSET_BASE}/squad_back_jersey.jpg`, orientation: "landscape", alt: "3 Cities FC players walk off together, showing the '3CITIES' lettering on the backs of their jerseys" },
      { src: `${ASSET_BASE}/goalie_save.jpg`, orientation: "portrait", alt: "The 3 Cities FC goalkeeper dives full-stretch to make a save" },
      { src: `${ASSET_BASE}/player_hug.jpg`, orientation: "portrait", alt: "Two 3 Cities FC players embrace in celebration on the pitch" },
    ],
    affiliations: [
      { name: "US Soccer", colorLogo: leagueLogo("US Soccer logo color.png"), whiteLogo: leagueLogo("US Soccer logo white.png") },
      { name: "FIFA", colorLogo: leagueLogo("FIFA logo color.png"), whiteLogo: leagueLogo("FIFA logo white.png") },
      { name: "UPSL", colorLogo: leagueLogo("UPSL logo color.png"), whiteLogo: leagueLogo("UPSL logo white.png") },
    ],
    recruitImage: `${ASSET_BASE}/keeper_gloves.jpg`,
    recruitImageAlt: "A 3 Cities FC goalkeeper cradles the match ball in both gloved hands",
    storeHeroImage: PLAYER_PHOTO,
    storeHeroImageAlt: "A 3 Cities FC player wearing the club's white away jersey",
  },
  copy: {
    metadata: {
      title: "3 Cities FC — Interactive Concept Preview",
      description: "A personalized Onzio club website and admin concept for 3 Cities Football Club.",
    },
    home: {
      heroHeadline: ["Three cities.", "One club."],
      heroIntro: "Semi-pro soccer built for the Tri-Cities of Kennewick, Pasco, and Richland, competing in the UPSL Washington Premier Division.",
      collectionEyebrow: "Concept collection",
      collectionHeadline: ["Tri-Cities colors.", "One crest."],
      collectionIntro: "A sample club collection built around 3 Cities FC's colors and the identity of the Tri-Cities.",
      collectionItemLabel: "Concept merchandise",
      gallerySectionHeadline: ["Matchday,", "Tri-Cities style."],
      recruitHeadline: ["Ready to", "join?"],
      recruitIntro: "Join a first-team roster built around regional talent and a community that shows up for the Tri-Cities.",
      recruitButtonLabel: "Get involved",
    },
    store: {
      eyebrow: "Concept club collection",
      headline: ["Made for matchday.", "Built for the Tri-Cities."],
      intro: "Two sample products show how a future 3 Cities FC store could carry the club identity beyond the pitch.",
      catalogEyebrow: "First-team concepts",
      catalogHeading: "Choose your colors.",
      catalogSummary: "2 sample products · concept preview",
      productTypeLabels: ["Home concept", "Away concept"],
      itemEyebrow: "Concept merchandise",
      collectionName: "3 Cities FC concepts",
      productDescription: "A sample 3 Cities FC product finished in the club palette for this interactive concept preview.",
    },
    club: {
      headline: ["Three cities.", "One club."],
    },
    fallbacks: {
      playerHometown: "Tri-Cities, WA",
      staffBio: "{name} supports the first-team environment and the standards that define 3 Cities FC.",
    },
  },
  contact: {
    email: "3citiesfc@gmail.com",
    social: {
      instagram: "https://www.instagram.com/3citiesfc",
      facebook: "https://www.facebook.com/p/3-Cities-Football-Club-61555274996159/",
    },
  },
  seasons: [{ id: "s2026", label: "2026 Season", status: "active" }, { id: "s2025", label: "2025 Season", status: "completed" }],
  currentSeasonId: "s2026",
  teams: [{ id: "first", name: "First Team", shortLabel: "First Team" }],
  defaultTeamId: "first",
  roster: makePlayers(firstTeam, "first", 1),
  staff,
  fixtures: [
    played("f01", "s2026", "Columbia Basin FC", "2026-04-11T19:00:00-07:00", 2, 0, "home", "Fran Rish Stadium", 410),
    played("f02", "s2026", "Yakima Valley SC", "2026-04-18T18:00:00-07:00", 1, 1, "away", "Valley Fields"),
    played("f03", "s2026", "Walla Walla United", "2026-05-02T19:00:00-07:00", 3, 1, "home", "Fran Rish Stadium", 455),
    played("f04", "s2026", "Palouse FC", "2026-05-09T18:00:00-07:00", 0, 1, "away", "Palouse Athletic Park"),
    played("f05", "s2026", "Blue Mountain FC", "2026-05-23T19:00:00-07:00", 2, 1, "home", "Fran Rish Stadium", 480),
    played("f06", "s2026", "Cascade Summit FC", "2026-06-06T18:30:00-07:00", 2, 2, "away", "Summit Turf Complex"),
    played("f07", "s2026", "Wenatchee River FC", "2026-06-20T19:00:00-07:00", 4, 1, "home", "Fran Rish Stadium", 520),
    played("f08", "s2026", "Snake River SC", "2026-07-04T18:00:00-07:00", 1, 2, "away", "Snake River Fields"),
    played("f09", "s2026", "Horse Heaven FC", "2026-07-18T19:00:00-07:00", 2, 0, "home", "Fran Rish Stadium", 495),
    upcoming("f10", "s2026", "Spokane Falls FC", "2026-08-01T18:00:00-07:00", "away", "Falls City Stadium"),
    upcoming("f11", "s2026", "Columbia Basin FC", "2026-08-15T19:00:00-07:00", "home", "Fran Rish Stadium"),
    upcoming("f12", "s2026", "Yakima Valley SC", "2026-08-22T18:00:00-07:00", "away", "Valley Fields"),
    upcoming("f13", "s2026", "Walla Walla United", "2026-09-05T19:00:00-07:00", "home", "Fran Rish Stadium"),
    played("f14", "s2025", "Columbia Basin FC", "2025-04-12T19:00:00-07:00", 1, 0, "home", "Fran Rish Stadium", 360),
    played("f15", "s2025", "Yakima Valley SC", "2025-04-19T18:00:00-07:00", 0, 2, "away", "Valley Fields"),
    played("f16", "s2025", "Walla Walla United", "2025-05-03T19:00:00-07:00", 1, 1, "home", "Fran Rish Stadium", 390),
    played("f17", "s2025", "Palouse FC", "2025-05-10T18:00:00-07:00", 2, 1, "away", "Palouse Athletic Park"),
    played("f18", "s2025", "Blue Mountain FC", "2025-05-24T19:00:00-07:00", 3, 0, "home", "Fran Rish Stadium", 410),
    played("f19", "s2025", "Cascade Summit FC", "2025-06-07T18:30:00-07:00", 1, 3, "away", "Summit Turf Complex"),
    played("f20", "s2025", "Wenatchee River FC", "2025-06-21T19:00:00-07:00", 2, 2, "home", "Fran Rish Stadium", 425),
    played("f21", "s2025", "Snake River SC", "2025-07-05T18:00:00-07:00", 2, 1, "away", "Snake River Fields"),
  ],
  about: {
    story: "3 Cities FC was founded in 2024 to give the Tri-Cities of Kennewick, Pasco, and Richland a semi-professional club built around regional talent. Competing in the UPSL Washington Premier Division, the club plays its home matches at Fran Rish Stadium in Richland.\n\nThe mission is simple: create a competitive stage for players from across the Tri-Cities who don't always get the chance to play at the next level.\n\nMatchdays bring out a Tri-Cities crowd that shows up for local sports: friends, family, and neighbors backing homegrown talent. That community support is part of why the club exists: not just to fill a roster, but to give the region a competitive team worth rallying around.",
    mission: "Give the Tri-Cities a competitive soccer home of its own.",
    highlights: [
      "UPSL Washington Premier Division member since 2024",
      "Home matches at Fran Rish Stadium, Richland",
      "Built around Tri-Cities regional talent",
    ],
    groupPhoto: { image: `${ASSET_BASE}/group_hug.jpg`, alt: "The 3 Cities FC squad gathers in a group hug after a match" },
  },
  sponsors: [
    { id: "s01", name: "Columbia Valley Wine Co.", logo: sponsorLogo("Azure logo white.png"), level: "partner" },
    { id: "s02", name: "Blue Bridge Brewing", logo: sponsorLogo("Fidelity logo white.png"), level: "partner" },
    { id: "s03", name: "Desert Sun Realty", logo: sponsorLogo("Flowable logo white.png"), level: "partner" },
    { id: "s04", name: "Rivershore Dental", logo: sponsorLogo("IBM logo white.png"), level: "partner" },
    { id: "s05", name: "Basin Ford", logo: sponsorLogo("Mark43logo white.png"), level: "partner" },
    { id: "s06", name: "Tri-Cities Turf Care", logo: sponsorLogo("Pega logo white.png"), level: "partner" },
    { id: "s07", name: "Rattlesnake Ridge Cellars", logo: sponsorLogo("Shift Sports logo white.png"), level: "partner" },
  ],
  store: {
    mode: "internal",
    products: [
      { id: "prod01", name: "2026 Home Jersey", price: 75, image: `${ASSET_BASE}/blue_jersey.png`, backImage: `${ASSET_BASE}/blue_jersey_back.png`, category: "jersey", sizes: ["S", "M", "L", "XL"] },
      { id: "prod02", name: "2026 Away Jersey", price: 75, image: `${ASSET_BASE}/white_jersey.png`, backImage: `${ASSET_BASE}/white_jersey_back.png`, category: "jersey", sizes: ["S", "M", "L", "XL"], featured: true },
    ],
  },
  standings: {
    competitionName: "UPSL Washington Premier Division",
    intro: "Sample league table showing how a real division standings feed could render for a future prospect.",
    rows: [
      { id: "row01", teamName: "Cascade Summit FC", gp: 10, w: 6, d: 3, l: 1, gd: 12, points: 21 },
      { id: "row02", teamName: "3 Cities Football Club", teamLogo: `${ASSET_BASE}/${encodeURIComponent("3 Cities Football Club.png")}`, gp: 9, w: 5, d: 2, l: 2, gd: 8, points: 17 },
      { id: "row03", teamName: "Columbia Basin FC", gp: 10, w: 5, d: 1, l: 4, gd: 5, points: 16 },
      { id: "row04", teamName: "Walla Walla United", gp: 10, w: 4, d: 3, l: 3, gd: 3, points: 15 },
      { id: "row05", teamName: "Blue Mountain FC", gp: 10, w: 4, d: 2, l: 4, gd: 1, points: 14 },
      { id: "row06", teamName: "Yakima Valley SC", gp: 10, w: 3, d: 3, l: 4, gd: -1, points: 12 },
      { id: "row07", teamName: "Snake River SC", gp: 10, w: 3, d: 2, l: 5, gd: -4, points: 11 },
      { id: "row08", teamName: "Palouse FC", gp: 10, w: 2, d: 3, l: 5, gd: -6, points: 9 },
      { id: "row09", teamName: "Wenatchee River FC", gp: 10, w: 2, d: 2, l: 6, gd: -9, points: 8 },
      { id: "row10", teamName: "Horse Heaven FC", gp: 10, w: 1, d: 3, l: 6, gd: -11, points: 6 },
    ],
  },
  analytics: {
    weeklyPageViews: [{ weekLabel: "May 25", views: 210 }, { weekLabel: "Jun 1", views: 238 }, { weekLabel: "Jun 8", views: 265 }, { weekLabel: "Jun 15", views: 301 }, { weekLabel: "Jun 22", views: 344 }, { weekLabel: "Jun 29", views: 392 }, { weekLabel: "Jul 6", views: 455 }, { weekLabel: "Jul 13", views: 510 }],
    topPages: [{ path: "/", label: "Home", views: 1620 }, { path: "/roster", label: "Roster", views: 980 }, { path: "/schedule", label: "Schedule", views: 740 }, { path: "/store", label: "Team store", views: 410 }],
    deviceSplit: { mobile: 71, desktop: 24, tablet: 5 },
    rosterProfileViews: [{ playerId: "p07", views: 261 }, { playerId: "p09", views: 224 }, { playerId: "p01", views: 198 }, { playerId: "p14", views: 176 }, { playerId: "p19", views: 152 }],
    sponsorImpressions: [{ sponsorId: "s01", impressions: 3120 }, { sponsorId: "s02", impressions: 2140 }, { sponsorId: "s03", impressions: 1980 }, { sponsorId: "s04", impressions: 1420 }, { sponsorId: "s05", impressions: 1310 }, { sponsorId: "s06", impressions: 1205 }],
    attendanceTrend: [{ fixtureId: "f01", attendance: 410 }, { fixtureId: "f03", attendance: 455 }, { fixtureId: "f05", attendance: 480 }, { fixtureId: "f07", attendance: 520 }, { fixtureId: "f09", attendance: 495 }],
    storeInterest: [{ productId: "prod01", views: 342 }, { productId: "prod02", views: 288 }],
  },
};
