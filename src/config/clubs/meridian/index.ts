import type { Fixture, Player, Position, ProspectConfig, StaffMember } from "@/config/types";

const firstTeam: Array<[string, string, number, Position]> = [
  ["Jonah", "Reed", 1, "GK"], ["Mateo", "Silva", 13, "GK"],
  ["Elias", "Ford", 2, "DF"], ["Andre", "Kouyaté", 3, "DF"], ["Noah", "Chen", 4, "DF"], ["Luca", "Bennett", 5, "DF"], ["Darius", "Cole", 15, "DF"], ["Owen", "Park", 22, "DF"],
  ["Miles", "Okafor", 6, "MF"], ["Nico", "Valdez", 8, "MF"], ["Theo", "Santos", 10, "MF"], ["Caleb", "Wright", 14, "MF"], ["Isaac", "Amini", 18, "MF"], ["Rowan", "Kim", 21, "MF"],
  ["Malik", "Johnson", 7, "FW"], ["Santiago", "Ruiz", 9, "FW"], ["Adrian", "Brooks", 11, "FW"], ["Kenji", "Tanaka", 19, "FW"],
];

// Sample nationality pool cycling across the fictional roster, purely to
// exercise the (optional) nationality-flag feature in the template's own
// build — see src/lib/flags.ts for the full supported demonym list.
const NATIONALITY_POOL = ["American", "Brazilian", "Nigerian", "Japanese", "French", "Ghanaian"];

const makePlayers = (rows: Array<[string, string, number, Position]>, teamId: string, start: number): Player[] =>
  rows.map(([firstName, lastName, number, position], index) => ({
    id: `p${String(start + index).padStart(2, "0")}`, teamId, firstName, lastName, number, position,
    nationality: NATIONALITY_POOL[(start + index) % NATIONALITY_POOL.length],
    hometown: index % 3 === 0 ? "Tacoma, WA" : index % 3 === 1 ? "Seattle, WA" : "Federal Way, WA",
    height: position === "GK" ? "6'2\"" : index % 2 ? "5'11\"" : "6'0\"", yearJoined: 2022 + (index % 4),
    bio: `${firstName} brings composure, work rate, and a team-first edge to Meridian United. A South Sound competitor built for decisive moments.`,
    stats: { appearances: 7, starts: 4 + (index % 4), minutes: 414 + index * 23, goals: position === "FW" ? 2 + index % 4 : position === "MF" ? index % 3 : 0, assists: position === "MF" ? 1 + index % 4 : index % 2, yellowCards: index % 3, redCards: 0, ...(position === "GK" ? { cleanSheets: 2, saves: 24 + index * 3 } : {}) },
  }));

const u23Rows: Array<[string, string, number, Position]> = [["Evan","Hart",31,"GK"],["Luis","Mora",32,"DF"],["Aiden","Shaw",33,"DF"],["Rami","Nasser",34,"DF"],["Tomas","Vega",35,"MF"],["Ben","Ito",36,"MF"],["Jalen","Price",37,"FW"],["Marco","Diaz",38,"FW"]];
const academyRows: Array<[string, string, number, Position]> = [["Kai","Young",41,"GK"],["Sam","Ortiz",42,"DF"],["Leo","Mills",43,"DF"],["Amir","Khan",44,"MF"],["Ty","Ramos",45,"MF"],["Cole","Grant",46,"FW"]];

const played = (id: string, teamId: string, seasonId: string, opponent: string, date: string, clubScore: number, opponentScore: number, attendance?: number): Fixture => ({
  id, teamId, seasonId, opponent, date, venue: teamId === "first" ? "Alder Field" : "Meridian Training Ground", homeAway: Number(id.replace(/\D/g, "")) % 2 ? "home" : "away", competition: "League", status: "played", result: { clubScore, opponentScore, attendance, scorers: clubScore ? ["M. Johnson 34'", "S. Ruiz 71'"] : [] },
});
const upcoming = (id: string, teamId: string, opponent: string, date: string): Fixture => ({ id, teamId, seasonId: "s2026", opponent, date, venue: teamId === "first" ? "Alder Field" : "Meridian Training Ground", homeAway: Number(id.replace(/\D/g, "")) % 2 ? "home" : "away", competition: "Pacific Premier League", status: "upcoming" });

const staff: StaffMember[] = [
  { id: "st01", teamId: "first", name: "Marcus Hale", role: "Head Coach", nationality: "American", bio: "A detail-led coach committed to brave, front-foot soccer." },
  { id: "st02", teamId: "first", name: "Elena Torres", role: "Assistant Coach", nationality: "Brazilian", bio: "Leads player development and match preparation." },
  { id: "st03", teamId: "first", name: "David Kim", role: "Goalkeeper Coach", nationality: "American" },
  { id: "st04", teamId: "first", name: "Dr. Maya Brooks", role: "Athletic Trainer", nationality: "American" },
  { id: "st05", name: "Renee Walker", role: "Club General Manager", nationality: "American" },
  { id: "st06", teamId: "u23", name: "Omar Castillo", role: "U23 Head Coach", nationality: "French" },
];

export const meridian: ProspectConfig = {
  club: { name: "Meridian United FC", shortName: "Meridian United", initials: "MUFC", tagline: "Semi-pro soccer for the South Sound.", foundedYear: 2014, league: "Pacific Premier League", division: "Northwest Division", city: "Tacoma", state: "WA", venue: "Alder Field" },
  branding: {
    primaryColor: "#0F2A43",
    secondaryColor: "#D9A441",
    accentColor: "#F5F0E6",
    crest: "/prospect/crest.svg",
    heroImage: "/prospect/hero.svg",
    heroImageAlt: "Abstract floodlit soccer field at night",
    galleryImages: [
      { src: "/prospect/gallery/matchday-01.svg", orientation: "landscape", alt: "Abstract matchday lights over Alder Field" },
      { src: "/prospect/gallery/matchday-02.svg", orientation: "portrait", alt: "Abstract Meridian United player tunnel scene" },
      { src: "/prospect/gallery/matchday-03.svg", orientation: "landscape", alt: "Abstract supporters display in club colors" },
      { src: "/prospect/gallery/matchday-04.svg", orientation: "portrait", alt: "Abstract pitch-level matchday scene" },
    ],
    // Sample governing-body/league affiliation marks — optional, most
    // prospects won't have these. Reuses generic placeholder art since this
    // is a fictional reference club, not a real governing-body relationship.
    affiliations: [
      { name: "Pacific Premier League", colorLogo: "/prospect/sponsors/s01.svg", whiteLogo: "/prospect/sponsors/s01.svg" },
      { name: "Northwest Soccer Alliance", colorLogo: "/prospect/sponsors/s02.svg", whiteLogo: "/prospect/sponsors/s02.svg" },
    ],
    recruitImage: "/prospect/gallery/matchday-04.svg",
    recruitImageAlt: "Abstract closing recruiting photo of Meridian United supporters",
    storeHeroImage: "/prospect/gallery/matchday-02.svg",
    storeHeroImageAlt: "Abstract featured-product photo for the Meridian United store",
  },
  copy: {
    metadata: {
      title: "Meridian United FC — Interactive Concept Preview",
      description: "A personalized Onzio club website and admin concept for Meridian United FC.",
    },
    home: {
      heroHeadline: ["South Sound.", "United in gold."],
      heroIntro: "Tacoma-built football, shaped by local players and a community that carries the club forward.",
      collectionEyebrow: "Concept collection",
      collectionHeadline: ["Matchday colors.", "One crest."],
      collectionIntro: "A sample club collection built around Meridian navy, gold, and the identity of the South Sound.",
      collectionItemLabel: "Concept merchandise",
      gallerySectionHeadline: ["Matchday,", "South Sound style."],
      recruitHeadline: ["A club shaped by", "Tacoma."],
      recruitIntro: "Join a first team, U23 side, or academy pathway built around local players and community standards.",
      recruitButtonLabel: "Get involved",
    },
    store: {
      eyebrow: "Concept club collection",
      headline: ["Made for matchday.", "Built for Tacoma."],
      intro: "Three sample products show how a future Meridian United store could carry the club identity beyond the pitch.",
      catalogEyebrow: "First-team concepts",
      catalogHeading: "Choose your colors.",
      catalogSummary: "3 sample products · concept preview",
      productTypeLabels: ["Home concept", "Away concept", "Training concept"],
      itemEyebrow: "Concept merchandise",
      collectionName: "Meridian United concepts",
      productDescription: "A sample Meridian United product finished in the club palette for this interactive concept preview.",
    },
    club: {
      headline: ["From Tacoma.", "For the South Sound."],
    },
    fallbacks: {
      playerHometown: "Tacoma, WA",
      staffBio: "{name} supports the first-team environment and the standards that define Meridian United.",
    },
  },
  contact: {
    email: "hello@meridianunited.example", phone: "(253) 555-0142", address: "1814 Alder Way, Tacoma, WA 98402",
    trainingHours: [{ label: "First Team", hours: "Tue & Thu, 6:30–8:30 PM" }, { label: "Academy", hours: "Sat, 9:00–11:00 AM" }],
    social: { instagram: "#", facebook: "#", youtube: "#" },
  },
  seasons: [{ id: "s2026", label: "2026 Season", status: "active" }, { id: "s2025", label: "2025 Season", status: "completed" }],
  currentSeasonId: "s2026",
  teams: [{ id: "first", name: "First Team", shortLabel: "First Team" }, { id: "u23", name: "U23", shortLabel: "U23" }, { id: "academy", name: "Academy", shortLabel: "Academy" }],
  defaultTeamId: "first",
  roster: [...makePlayers(firstTeam, "first", 1), ...makePlayers(u23Rows, "u23", 19), ...makePlayers(academyRows, "academy", 27)],
  staff,
  fixtures: [
    played("f01","first","s2026","Cascade Rovers SC","2026-05-09T19:00:00-07:00",2,0,842), played("f02","first","s2026","Olympic City FC","2026-05-16T18:00:00-07:00",1,1,615), played("f03","first","s2026","Evergreen Athletic","2026-05-30T19:30:00-07:00",3,1,911), played("f04","first","s2026","Harbor FC","2026-06-06T18:00:00-07:00",0,1,702), played("f05","first","s2026","Rainier Union","2026-06-20T19:00:00-07:00",2,2,788), played("f06","first","s2026","North Sound 1909","2026-06-27T19:00:00-07:00",4,1,1044), played("f07","first","s2026","Puget Sound FC","2026-07-11T19:00:00-07:00",2,1,1186),
    upcoming("f08","first","Tacoma Athletic","2026-08-15T19:00:00-07:00"), upcoming("f09","first","Cascade Rovers SC","2026-08-22T18:00:00-07:00"), upcoming("f10","first","Olympic City FC","2026-09-05T19:00:00-07:00"), upcoming("f11","first","Harbor FC","2026-09-12T18:30:00-07:00"),
    played("f12","first","s2025","Evergreen Athletic","2025-07-12T19:00:00-07:00",2,0,740), played("f13","first","s2025","Rainier Union","2025-07-19T19:00:00-07:00",1,2,680), played("f14","first","s2025","Harbor FC","2025-08-02T19:00:00-07:00",3,0,812), played("f15","first","s2025","Olympic City FC","2025-08-16T19:00:00-07:00",1,1,771), played("f16","first","s2025","North Sound 1909","2025-08-23T19:00:00-07:00",2,1,890), played("f17","first","s2025","Puget Sound FC","2025-09-06T19:00:00-07:00",0,1,905),
    played("u01","u23","s2026","Southside U23","2026-06-07T16:00:00-07:00",2,1), played("u02","u23","s2026","Harbor U23","2026-06-21T16:00:00-07:00",1,1), played("u03","u23","s2026","Rainier U23","2026-07-05T16:00:00-07:00",3,2), upcoming("u04","u23","Olympic U23","2026-08-16T16:00:00-07:00"), upcoming("u05","u23","Cascade U23","2026-08-30T16:00:00-07:00"), upcoming("a01","academy","Sound Academy","2026-08-17T17:00:00-07:00"), upcoming("a02","academy","Northwest Juniors","2026-08-24T17:00:00-07:00"),
  ],
  about: {
    story: "Meridian United was founded to give the South Sound a club that competes with ambition and belongs to its community. From Alder Field to every neighborhood training ground, we represent Tacoma with purpose.\n\nOur first team, U23s, and academy share one pathway: local players, brave soccer, and standards that travel beyond matchday.",
    mission: "Build a lasting soccer home for the South Sound.",
    highlights: ["2025 Northwest Division Champions", "Three connected player pathways", "Tacoma-owned and community-backed"],
    groupPhoto: { image: "/prospect/gallery/matchday-03.svg", alt: "Abstract Meridian United squad photo" },
    training: {
      intro: "One club, three connected pathways — first team, U23s, and academy all train to the same standard.",
      points: ["Structured technical sessions for every age group", "First-team pathway open to standout academy and U23 players", "Community clinics held twice a season at Alder Field"],
      closing: "Show up, compete, and grow with the club.",
    },
  },
  sponsors: [
    { id: "s01", name: "Harborline Credit Union", logo: "/prospect/sponsors/s01.svg", level: "title", blurb: "Backing South Sound ambition." },
    { id: "s02", name: "Sound Roasters", logo: "/prospect/sponsors/s02.svg", level: "gold" }, { id: "s03", name: "Cascade Physical Therapy", logo: "/prospect/sponsors/s03.svg", level: "gold" },
    { id: "s04", name: "Alder Works", logo: "/prospect/sponsors/s04.svg", level: "partner" }, { id: "s05", name: "Tacoma Transit Co.", logo: "/prospect/sponsors/s05.svg", level: "partner" }, { id: "s06", name: "Northwest Supply", logo: "/prospect/sponsors/s06.svg", level: "partner" },
  ],
  store: { mode: "internal", products: [
    { id: "prod01", name: "2026 Home Jersey", price: 75, image: "/prospect/store/jersey-home.svg", backImage: "/prospect/store/jersey-away.svg", category: "jersey", sizes: ["S","M","L","XL"] },
    { id: "prod02", name: "2026 Away Jersey", price: 75, image: "/prospect/store/jersey-away.svg", category: "jersey", sizes: ["S","M","L","XL"] },
    { id: "prod03", name: "Matchday Training Top", price: 52, image: "/prospect/store/training.svg", category: "training", sizes: ["S","M","L","XL"] },
  ] },
  standings: {
    competitionName: "Pacific Premier League — Northwest Division",
    intro: "Sample league table showing how a real division standings feed could render for a future prospect.",
    rows: [
      { id: "row01", teamName: "Meridian United FC", gp: 7, w: 4, d: 2, l: 1, gd: 7, points: 14 },
      { id: "row02", teamName: "Cascade Rovers SC", gp: 7, w: 4, d: 1, l: 2, gd: 5, points: 13 },
      { id: "row03", teamName: "North Sound 1909", gp: 7, w: 3, d: 3, l: 1, gd: 4, points: 12 },
      { id: "row04", teamName: "Puget Sound FC", gp: 7, w: 3, d: 2, l: 2, gd: 2, points: 11 },
      { id: "row05", teamName: "Olympic City FC", gp: 7, w: 2, d: 3, l: 2, gd: 0, points: 9 },
      { id: "row06", teamName: "Rainier Union", gp: 7, w: 2, d: 2, l: 3, gd: -2, points: 8 },
      { id: "row07", teamName: "Evergreen Athletic", gp: 7, w: 1, d: 2, l: 4, gd: -6, points: 5 },
      { id: "row08", teamName: "Harbor FC", gp: 7, w: 1, d: 1, l: 5, gd: -10, points: 4 },
    ],
  },
  analytics: {
    weeklyPageViews: [{weekLabel:"May 25",views:642},{weekLabel:"Jun 1",views:710},{weekLabel:"Jun 8",views:805},{weekLabel:"Jun 15",views:761},{weekLabel:"Jun 22",views:930},{weekLabel:"Jun 29",views:1022},{weekLabel:"Jul 6",views:1168},{weekLabel:"Jul 13",views:1374}],
    topPages: [{path:"/",label:"Home",views:4120},{path:"/roster",label:"Roster",views:2840},{path:"/schedule",label:"Schedule",views:1940},{path:"/stats",label:"Team stats",views:1280},{path:"/store",label:"Team store",views:920}],
    deviceSplit: { mobile: 68, desktop: 27, tablet: 5 }, rosterProfileViews: [{playerId:"p15",views:481},{playerId:"p16",views:437},{playerId:"p09",views:398},{playerId:"p11",views:355},{playerId:"p17",views:312}],
    sponsorImpressions: [{sponsorId:"s01",impressions:8240},{sponsorId:"s02",impressions:5120},{sponsorId:"s03",impressions:4880},{sponsorId:"s04",impressions:3600},{sponsorId:"s05",impressions:3420},{sponsorId:"s06",impressions:3190}], attendanceTrend: [{fixtureId:"f01",attendance:842},{fixtureId:"f02",attendance:615},{fixtureId:"f03",attendance:911},{fixtureId:"f04",attendance:702},{fixtureId:"f05",attendance:788},{fixtureId:"f06",attendance:1044},{fixtureId:"f07",attendance:1186}], storeInterest: [{productId:"prod01",views:622},{productId:"prod02",views:510},{productId:"prod03",views:402}],
  },
};
