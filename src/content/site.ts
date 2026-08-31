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

  // TODO(confirm): fill these.
  location: "Lagos, Nigeria",
  availability: "Open to full-time product design roles",
  email: "tagoe.olamide@gmail.com",

  // Only non-empty links render.
  links: {
    linkedin: "",
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
};

export const selectedWork: WorkCard[] = [
  {
    title: "Pave",
    descriptor:
      "A single place for Nigerian freelancers to receive, hold, and spend dollar income — designed inside real CBN constraints.",
    thumb: "/images/pave/frames/01.png",
    href: "/work/pave",
  },
  {
    title: "Authentication, audited",
    descriptor:
      "An independent, four-framework audit of a YC-backed payments platform's auth flow — 55 issues found, 33 screens redesigned.",
    thumb: "/images/authentication-audit/frames/1.png",
    href: "/work/authentication-audit",
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
};

/**
 * Frames live in public/images/for-the-love-of-design-section/, named by title
 * (Olamide's workflow). `liveUrl` and `description` are first drafts — refine
 * freely. Add `video` once a screen recording is exported to swap the still.
 */
const CRAFT_DIR = "/images/for-the-love-of-design-section";

export const craft: CraftItem[] = [
  {
    slug: "creative-agency",
    title: "Creative Agency",
    descriptor: "Landing page for a creative video-generation agency.",
    thumb: `${CRAFT_DIR}/Creative Agency.png`,
    liveUrl: "https://creative-agency-six-red.vercel.app",
    description:
      "A dark, high-energy landing page for an agency that builds personalized, interactive video. The hero pairs heavy display type with a full-bleed row of vivid content cards to signal range and confidence before a single word is read.",
  },
  {
    slug: "weme",
    title: "Weme",
    descriptor: "Landing page for an AI creative collaborator.",
    thumb: `${CRAFT_DIR}/Weme.png`,
    liveUrl: "https://wemelandingpage.vercel.app",
    description:
      "A bright, playful hero for Weme, an AI tool for capturing and elevating ideas. Fanned UNO-style cards give the page a tactile personality against a clean off-white ground, keeping it approachable rather than cold and technical.",
  },
  {
    slug: "vibe-coding-industry",
    title: "Vibe Coding Industry",
    descriptor: "Experimental editorial page on the vibe-coding scene.",
    thumb: `${CRAFT_DIR}/VCI.png`,
    liveUrl: "https://vibecoding-six-ashy.vercel.app",
    description:
      "A typographic exploration titled Vibe Coding Industry — oversized display type anchored by scattered, colourful skill pills (Claude, Figma Make, Design Engineering) that read like a moodboard of the moment.",
  },
  {
    slug: "pricing-card-component",
    title: "Pricing Card Component",
    descriptor: "Pricing section with plan cards and a billing toggle.",
    thumb: `${CRAFT_DIR}/Pricing card component.png`,
    liveUrl: "https://princing-layout.vercel.app",
    description:
      "A three-tier pricing section with a monthly/yearly toggle and clear feature checklists — designed so choosing a plan is a two-second scan, not a feature-matrix chore.",
  },
  {
    slug: "apex-footer",
    title: "Apex — Footer",
    descriptor: "Footer section for a fintech brand.",
    thumb: `${CRAFT_DIR}/apexfooter.png`,
    liveUrl: "https://apexfooter.vercel.app",
    description:
      "A bold closing footer for Apex, a modern finance tool. A confident “let's build something cool” line sits above tidy link columns and a scatter of sticker-style service tags.",
  },
  {
    slug: "nc-gallery",
    title: "NC Gallery",
    descriptor: "Image gallery interface with a split preview layout.",
    thumb: `${CRAFT_DIR}/nc gallery.png`,
    liveUrl: "https://nc-gallery.vercel.app",
    description:
      "A gallery web UI: a tight thumbnail grid on the left pairs with a large preview pane on the right, so browsing and viewing happen without ever leaving the page.",
  },
];
