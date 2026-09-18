/**
 * SINGLE SOURCE OF TRUTH for site-level copy and the two indexes.
 * Layout is a 1:1 replication of pariola.work; copy is Olamide's own.
 */

export const site = {
  // TODO(confirm): inferred from email.
  name: "Olamide Tagoe.",
  role: "Product Designer",

  metaDescription:
    "Product designer. Self-directed work on Nigerian fintech — a product concept for dollar-earning freelancers and an independent audit of a payments platform's authentication system.",

  /**
   * Hero paragraphs — same rhythm as the reference (one intro, one on what
   * this space is, one pointing at the work below). First line is ink, the
   * rest muted, matching the measured type roles.
   */
  hero: [
    "As a product designer, I treat the interface as an argument — every screen either earns the next tap or loses the reader. My work starts from the constraints a product actually lives under, not an idealised version of it.",
    "What I care about most sits underneath the pixels: why this flow, why this trade-off, and what it costs. Lately I've been learning how products get built after the mockup, so the handoff reads as a conversation instead of a wall.",
    "A few pieces below represent my work at its most intentional — real problems, real constraints, and the reasoning I'd defend in a room.",
  ],

  /** Short About section (recruiter-focused). */
  about: [
    "I design product experiences that connect interface clarity with system behavior. My work sits across UI, UX, and frontend implementation, with a strong interest in fintech, authentication flows, onboarding, dashboards, and design systems.",
    "I come from an International law and diplomacy background, so I pay close attention to trust, risk, edge cases, and how products behave when something goes wrong. I do not only design clean screens. I design flows that help users understand what to do, recover from mistakes, and move forward with confidence.",
  ],

  /** Copy for the "Open to product design roles" contact block. */
  rolesCopy:
    "I am open to product design, UI/UX, and frontend-aware design roles. I am especially interested in teams building fintech, SaaS, commerce, developer tools, and workflow products.",

  location: "Lagos, Nigeria",
  availability: "Open to full-time product design roles",
  email: "tagoe.olamide@gmail.com",

  // Only non-empty links render.
  links: {
    linkedin: "https://www.linkedin.com/in/daniel-tagoe-0aa02b265/",
    github: "",
    dribbble: "",
    behance: "",
    resume: "",
  },
} as const;

/* ---- Card shape, shared by both sections ------------------ */
export type WorkCard = {
  title: string;
  descriptor: string;
  thumb: string; // /public path; a labelled frame shows until it exists
  href?: string; // optional — cards without a link render as a plain figure
  /** Optional preview video for the thumbnail; plays (muted, looped) once the
   *  file exists, otherwise the static thumb shows. */
  video?: string;
  /** Short scannable tags shown under the descriptor. */
  tags?: string[];
};

export const selectedWork: WorkCard[] = [
  {
    title: "Pave",
    descriptor:
      "A single place for Nigerian freelancers to receive, hold, and spend dollar income — designed inside real CBN constraints.",
    thumb: "/images/pave/frames/01.png",
    href: "/work/pave",
    tags: ["Fintech", "Mobile App", "Product Strategy", "UX Design", "Payments"],
  },
  {
    title: "Authentication System Audit",
    descriptor:
      "An independent UX audit and redesign of a fintech authentication flow, focused on security-adjacent UX, accessibility, error handling, and onboarding clarity.",
    thumb: "/images/authentication-audit/frames/1.png",
    href: "/work/authentication-audit",
    tags: ["Fintech", "UX Audit", "Security UX", "Accessibility", "Onboarding"],
  },
];

/* ---- For the love of design: card → project page ---------- */
export type CraftItem = {
  slug: string;
  title: string;
  descriptor: string; // shown on the card
  /** /images/craft/<slug>.<ext> — the frame/placeholder until a recording lands. */
  thumb: string;
  /** "View live" button target; button hides until this is set. */
  liveUrl?: string;
  /** Short paragraph on the project page. */
  description: string;
  /** Screen recording (mp4/webm); replaces the thumbnail on the page when set. */
  video?: string;
  /** Short scannable tags shown under the descriptor. */
  tags?: string[];
  /** Tool keys for the modal's tool icons (svg at /public/icons/<key>.svg). */
  tools?: string[];
};

/**
 * Frames live in public/images/for-the-love-of-design-section/, named by title
 * (Olamide's workflow). `liveUrl` and `description` are first drafts — refine
 * freely. Add `video` once a screen recording is exported to swap the still.
 */
const CRAFT_DIR = "/images/for-the-love-of-design-section";
const EXP_DIR = "/experiments";

export const craft: CraftItem[] = [
  {
    slug: "creative-agency",
    title: "Creative Agency",
    descriptor: "Landing page for a creative video-generation agency.",
    thumb: `${CRAFT_DIR}/Creative Agency.png`,
    liveUrl: "https://creative-agency-six-red.vercel.app",
    description:
      "A dark, high-energy landing page for an agency that builds personalized, interactive video. The hero pairs heavy display type with a full-bleed row of vivid content cards to signal range and confidence before a single word is read.",
    tags: ["Landing Page", "Web Design"],
    tools: ["figma", "framer", "claude"],
  },
  {
    slug: "weme",
    title: "Weme",
    descriptor: "Landing page for an AI creative collaborator.",
    thumb: `${CRAFT_DIR}/Weme.png`,
    liveUrl: "https://wemelandingpage.vercel.app",
    description:
      "A bright, playful hero for Weme, an AI tool for capturing and elevating ideas. Fanned UNO-style cards give the page a tactile personality against a clean off-white ground, keeping it approachable rather than cold and technical.",
    tags: ["Landing Page", "AI", "Web Design"],
    tools: ["figma", "framer", "claude"],
  },
  {
    slug: "vibe-coding-industry",
    title: "Vibe Coding Industry",
    descriptor: "Experimental editorial page on the vibe-coding scene.",
    thumb: `${CRAFT_DIR}/VCI.png`,
    liveUrl: "https://vibecoding-six-ashy.vercel.app",
    description:
      "A typographic exploration titled Vibe Coding Industry — oversized display type anchored by scattered, colourful skill pills (Claude, Figma Make, Design Engineering) that read like a moodboard of the moment.",
    tags: ["Editorial", "Typography"],
    tools: ["figma", "framer", "claude"],
  },
  {
    slug: "pricing-card-component",
    title: "Pricing Card Component",
    descriptor: "Pricing section with plan cards and a billing toggle.",
    thumb: `${CRAFT_DIR}/Pricing card component.png`,
    liveUrl: "https://princing-layout.vercel.app",
    description:
      "A three-tier pricing section with a monthly/yearly toggle and clear feature checklists — designed so choosing a plan is a two-second scan, not a feature-matrix chore.",
    tags: ["UI Component", "Pricing", "SaaS"],
    tools: ["figma", "framer", "claude"],
  },
  {
    slug: "apex-footer",
    title: "Apex — Footer",
    descriptor: "Footer section for a fintech brand.",
    thumb: `${CRAFT_DIR}/apexfooter.png`,
    liveUrl: "https://apexfooter.vercel.app",
    description:
      "A bold closing footer for Apex, a modern finance tool. A confident “let's build something cool” line sits above tidy link columns and a scatter of sticker-style service tags.",
    tags: ["UI Component", "Fintech"],
    tools: ["figma", "framer", "claude"],
  },
  {
    slug: "nc-gallery",
    title: "NC Gallery",
    descriptor: "Image gallery interface with a split preview layout.",
    thumb: `${CRAFT_DIR}/nc gallery.png`,
    liveUrl: "https://nc-gallery.vercel.app",
    description:
      "A gallery web UI: a tight thumbnail grid on the left pairs with a large preview pane on the right, so browsing and viewing happen without ever leaving the page.",
    tags: ["UI Design", "Gallery"],
    tools: ["figma", "framer", "claude"],
  },

  /* ---- Additional experiments (public/experiments) ---------- */
  {
    slug: "recess-superstars",
    title: "Recess — Superstars",
    descriptor:
      "An editorial hero for a studio called Recess: oversized blue type spells out football's biggest names, interleaved with a tilted photo collage. A layout study built on scale, overlap and rhythm.",
    thumb: `${EXP_DIR}/recess-superstars.png`,
    description:
      "An editorial hero for a studio called Recess: oversized blue type spells out football's biggest names, interleaved with a tilted photo collage. A layout study built on scale, overlap and rhythm.",
    tags: ["Editorial", "Typography", "Web Design"],
  },
  {
    slug: "apex-banking",
    title: "Apex — Banking Dashboard",
    descriptor:
      "A dark-theme banking dashboard. Card details, a stacked budget-overview chart and a spending gauge are grouped so income, expenses and limits read quickly without feeling dense.",
    thumb: `${EXP_DIR}/apex-banking.png`,
    description:
      "A dark-theme banking dashboard. Card details, a stacked budget-overview chart and a spending gauge are grouped so income, expenses and limits read quickly without feeling dense.",
    tags: ["Product UI", "Fintech", "Dashboard"],
  },
  {
    slug: "world-cup-mbappe",
    title: "World Cup 26 — Mbappé",
    descriptor:
      "An illustrated collectible sticker in the spirit of the classic World Cup album — Kylian Mbappé for France, with clean linework, a pixel name plate and the tournament's colour trim. Part of an ongoing player series.",
    thumb: `${EXP_DIR}/world-cup-mbappe.png`,
    description:
      "An illustrated collectible sticker in the spirit of the classic World Cup album — Kylian Mbappé for France, with clean linework, a pixel name plate and the tournament's colour trim. Part of an ongoing player series.",
    tags: ["Illustration", "World Cup Series", "Sports"],
  },
  {
    slug: "polaris-hr",
    title: "Polaris — HR Dashboard",
    descriptor:
      "A concept dashboard for an HR platform. Time-off allowance, current project, status tracker and notes sit in a calm card layout, so an employee can read where things stand in one glance.",
    thumb: `${EXP_DIR}/polaris-hr.png`,
    description:
      "A concept dashboard for an HR platform. Time-off allowance, current project, status tracker and notes sit in a calm card layout, so an employee can read where things stand in one glance.",
    tags: ["Product UI", "Dashboard", "SaaS"],
  },
  {
    slug: "sushi-board",
    title: "Sushi Board",
    descriptor:
      "A top-down sushi board illustration — maki, nigiri, a soy dish and chopsticks arranged with an even rhythm. A study in laying out many small objects into one balanced, readable composition.",
    thumb: `${EXP_DIR}/sushi-board.png`,
    description:
      "A top-down sushi board illustration — maki, nigiri, a soy dish and chopsticks arranged with an even rhythm. A study in laying out many small objects into one balanced, readable composition.",
    tags: ["Illustration", "Food"],
  },
  {
    slug: "wang-build-in-public",
    title: "Wang — Build In Public",
    descriptor:
      "A bold landing section for a design-and-build studio: a plain “helping designers build in public” statement, a scattered avatar grid and an oversized pixel wordmark anchoring the footer. A study in confident, high-contrast branding.",
    thumb: `${EXP_DIR}/wang-build-in-public.png`,
    description:
      "A bold landing section for a design-and-build studio: a plain “helping designers build in public” statement, a scattered avatar grid and an oversized pixel wordmark anchoring the footer. A study in confident, high-contrast branding.",
    tags: ["Landing Page", "Branding", "Web Design"],
  },
  {
    slug: "world-cup-vinicius",
    title: "World Cup 26 — Vinícius Jr",
    descriptor:
      "Vinícius Júnior for Brazil, drawn as a collectible World Cup sticker with matching linework, a pixel name plate and colour trim. The second in an illustrated player series.",
    thumb: `${EXP_DIR}/world-cup-vinicius.png`,
    description:
      "Vinícius Júnior for Brazil, drawn as a collectible World Cup sticker with matching linework, a pixel name plate and colour trim. The second in an illustrated player series.",
    tags: ["Illustration", "World Cup Series", "Sports"],
  },
  {
    slug: "users-table",
    title: "Users Table",
    descriptor:
      "A team-management table: name, title, status and role laid out with generous spacing and a single accent for actions. An exercise in keeping a data-dense list calm and easy to scan.",
    thumb: `${EXP_DIR}/users-table.png`,
    description:
      "A team-management table: name, title, status and role laid out with generous spacing and a single accent for actions. An exercise in keeping a data-dense list calm and easy to scan.",
    tags: ["Product UI", "Component", "Table"],
  },
  {
    slug: "portrait-coral",
    title: "Portrait — Coral",
    descriptor:
      "A clean vector portrait study: bold outlines, soft shading and a warm coral palette. Practice in capturing a calm, friendly likeness with a limited set of shapes.",
    thumb: `${EXP_DIR}/portrait-coral.png`,
    description:
      "A clean vector portrait study: bold outlines, soft shading and a warm coral palette. Practice in capturing a calm, friendly likeness with a limited set of shapes.",
    tags: ["Illustration", "Portrait"],
  },
  {
    slug: "cashflow-dashboard",
    title: "Cashflow — Invoicing",
    descriptor:
      "An invoicing dashboard: revenue, overdue, outstanding and expense stats above a recent-activity ledger with clear paid, withdraw and overdue states. A design taken through to a coded frontend.",
    thumb: `${EXP_DIR}/cashflow-dashboard.png`,
    description:
      "An invoicing dashboard: revenue, overdue, outstanding and expense stats above a recent-activity ledger with clear paid, withdraw and overdue states. A design taken through to a coded frontend.",
    tags: ["Product UI", "Fintech", "Frontend"],
  },
  {
    slug: "upcoming-meetings",
    title: "Upcoming Meetings",
    descriptor:
      "A scheduling component pairing a list of upcoming meetings — people, times and places — with a month calendar and a clear add-event action. A study in making a busy schedule scannable.",
    thumb: `${EXP_DIR}/upcoming-meetings.png`,
    description:
      "A scheduling component pairing a list of upcoming meetings — people, times and places — with a month calendar and a clear add-event action. A study in making a busy schedule scannable.",
    tags: ["Product UI", "Component", "Calendar"],
  },
  {
    slug: "skillet-breakfast",
    title: "Breakfast Skillet",
    descriptor:
      "A flat-illustration breakfast skillet — fried eggs, sausages, tomatoes and rocket, drawn top-down with clean linework and warm, appetising colour. A study in making a simple food scene feel tactile.",
    thumb: `${EXP_DIR}/skillet-breakfast.png`,
    description:
      "A flat-illustration breakfast skillet — fried eggs, sausages, tomatoes and rocket, drawn top-down with clean linework and warm, appetising colour. A study in making a simple food scene feel tactile.",
    tags: ["Illustration", "Food"],
  },
  {
    slug: "assignee-select",
    title: "Assignee Select",
    descriptor:
      "An “assigned to” dropdown with presence dots, a clear selected state and a scrollable list. A small interaction study in showing availability and selection at a glance.",
    thumb: `${EXP_DIR}/assignee-select.png`,
    description:
      "An “assigned to” dropdown with presence dots, a clear selected state and a scrollable list. A small interaction study in showing availability and selection at a glance.",
    tags: ["Product UI", "Component"],
  },
  {
    slug: "retro-portrait",
    title: "Retro Portrait",
    descriptor:
      "A flat, mid-century-styled character portrait — sculpted hair, a knitted orange vest and a restrained cream palette. An exercise in geometric shapes and confident, minimal shading.",
    thumb: `${EXP_DIR}/retro-portrait.png`,
    description:
      "A flat, mid-century-styled character portrait — sculpted hair, a knitted orange vest and a restrained cream palette. An exercise in geometric shapes and confident, minimal shading.",
    tags: ["Illustration", "Character"],
  },
];

/* ---- Core skills (recruiter-focused, scannable) ----------- */
export const skills: { group: string; items: string[] }[] = [
  {
    group: "Product Design",
    items: [
      "UX audits",
      "User flows",
      "Wireframes",
      "High-fidelity UI",
      "Interaction design",
      "Design systems",
    ],
  },
  {
    group: "Product Thinking",
    items: [
      "Authentication UX",
      "Onboarding flows",
      "Error states",
      "Accessibility review",
      "Fintech trust patterns",
      "Edge-case analysis",
    ],
  },
];
