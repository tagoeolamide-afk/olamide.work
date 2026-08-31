/**
 * Long-form case study content.
 *
 * Structure follows fable-portfolio-case-study: hook → context → problem as
 * tension → constraints → 2–4 decision blocks (fork + choice + why + cost) →
 * craft → outcomes → reflection. Copy is drawn from the source docs and
 * tightened; nothing is invented. Neither study reports fabricated metrics.
 *
 * ANONYMISATION: the audit's subject is referenced only through PLATFORM.
 * To publish the real name, change PLATFORM.name in one place — but read the
 * note in that object first.
 */

export type Figure = {
  /** Path under /public. When the file is absent, a labelled frame renders. */
  src?: string;
  alt: string;
  caption: string;
  /** "wide" = full column, "pair" = sits in a 2-up row. */
  span?: "wide" | "pair";
  /** "phone" = portrait device shot: height-capped and centred, not full-bleed. */
  device?: "phone";
};

export type Decision = {
  fork: string;
  chose: string;
  why: string;
  cost: string;
  figure?: Figure;
};

export type Section = { heading: string; body: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  meta: { role: string; type: string; timeline: string; tools: string };
  hero: Figure;
  overview: string[];
  problem: Section;
  constraints: { label: string; body: string }[];
  decisions: Decision[];
  craft: { heading: string; body: string[]; figures: Figure[] };
  outcomes: { heading: string; body: string[]; stats?: { value: string; label: string }[] };
  reflection: string[];
};

/**
 * Swap `name` to the real company only after disclosing findings to them.
 * Publishing a named company's live auth weaknesses before disclosure reads
 * as a judgment flag, not initiative. `disclosed` gates a credibility line.
 */
const PLATFORM = {
  name: "a YC-backed Nigerian payments platform",
  nameShort: "the platform",
  disclosed: false,
} as const;

const pave: CaseStudy = {
  slug: "pave",
  title: "Pave",
  tagline:
    "A single app where Nigerian freelancers receive, hold, and spend the dollars they earn — designed around how that money actually moves under Nigerian law, not how a global fintech wishes it did.",
  meta: {
    role: "Sole product designer",
    type: "Self-initiated concept",
    timeline: "2026",
    tools: "Figma, Figma Make",
  },
  hero: {
    src: "/images/pave/dashboard.png",
    alt: "Pave dashboard showing a USD balance with receive, convert, and history actions.",
    caption: "The populated dashboard — balance as the anchor, three direct actions.",
    device: "phone",
  },
  overview: [
    "A Nigerian freelancer earning in dollars runs her money through a patchwork of apps — one to convert, another to save, none that treats receiving, holding, and spending as a single connected flow. Pave is my concept for the app that does.",
    "I designed it end to end, on my own. The point wasn't a slicker wallet — it was to design honestly inside the regulatory and financial constraints these freelancers actually live under, and to let those constraints, not a global-fintech template, shape every screen.",
  ],
  problem: {
    heading: "Her money works. The tools don't.",
    body: [
      "Meet Lade — 23, in Lagos, earning most of her income from international clients across freelance platforms and direct work. The money comes in fine. Managing it is the problem.",
      "Today that means juggling apps never built for her situation. One converts dollars to naira — at rates she can't verify and fees she only sees after the fact. Another holds savings, with no connection to how she actually gets paid. Dollar income, naira spending, and a regulatory line between the two that none of them acknowledges.",
      "So she never sees the whole picture. Her dollar earnings and her naira spending power live in different apps; the fees quietly eat the gap; and there's no single, trustworthy record of what she's earned, held, or moved.",
      "Pave starts from one question: what if receiving, holding, and spending dollar income were one connected experience — built for the constraints Lade actually lives with, not the ones a global wallet assumes away?",
    ],
  },
  constraints: [
    {
      label: "Money arrives in naira",
      body: "CBN rules for International Money Transfer Operators mean inbound funds settle as naira, not dollars. A literal “dollar wallet” was off the table before I drew a single screen.",
    },
    {
      label: "Every exit has a fee",
      body: "Converting and withdrawing costs real money — a percentage or a flat charge. The only open question was whether to bury that cost or put it in front of Lade.",
    },
    {
      label: "Dollars can't be spent here",
      body: "Dollars aren't legal tender in Nigeria, so “spend” can never mean spending dollars directly. It has to route through a conversion to naira first — which reshaped the whole spend flow.",
    },
  ],
  decisions: [
    {
      fork: "The first scope had four pillars — receive, hold, spend, and invest. Keep investing, or cut it?",
      chose: "Cut investing entirely, before design started.",
      why: "Investing would have pulled the product toward portfolio growth — a different problem, a different mindset, a second regulatory surface. But Lade's problem was never growing her money; it was trusting one place to receive it, understand it, and move it. Anything competing with that trust had to go.",
      cost: "A smaller product, and investing left as an open question rather than a shipped answer. Accepted — a focused receive–hold–spend that works beats four pillars that half-work. This is the one direction I deliberately killed.",
    },
    {
      fork: "Lade earns and thinks in dollars, but the money legally settles in naira. Show her dollars, show her naira, or find a third way?",
      chose: "Show the balance in USD for clarity — and state plainly, on the receiving screen, that funds settle in naira per CBN rules.",
      why: "Forcing her to think in naira fights how she actually experiences her income. Pretending the money is “really” dollars is a lie the regulator doesn't allow. The honest path: speak her language on the surface, and tell the truth about settlement exactly where it matters.",
      cost: "The interface carries a subtle distinction — shown in USD, settled in naira — instead of hiding it. More copy, more care. That honesty became the product's credibility, not a footnote.",
      figure: {
        src: "/images/pave/receiving details.png",
        alt: "Receiving-details screen with a note that funds arrive in naira per CBN regulations.",
        caption: "The truth about settlement, placed exactly where Lade decides whether to trust the app.",
        span: "pair",
        device: "phone",
      },
    },
    {
      fork: "Follow the category norm and reveal the fee at the end, or show it before Lade commits?",
      chose: "Show the rate, the fee, and the exact naira amount she'll receive — before she confirms. The button itself carries the final figure: Pay ₦766,150.",
      why: "Hidden fees were the exact pain in the problem statement. Reproducing the industry default would rebuild the thing I set out to fix. If a number is going to be shown, it has to be shown early — while it can still change her mind.",
      cost: "Nothing to hide behind means the rate has to be good and visible at once. That's less a cost than the point — but it does give up the easy lever of softening a bad number after the fact.",
      figure: {
        src: "/images/pave/convert and withdraw.png",
        alt: "Convert & withdraw screen showing exchange rate, 0.5% fee, and the exact naira payout on the pay button.",
        caption: "Rate, fee, and final naira amount — visible before the Pay button, never after.",
        device: "phone",
      },
    },
  ],
  craft: {
    heading: "The flow, where the constraints become visible",
    body: [
      "Sign-up opens with a single field and combines password and earning-type into one step — how Lade earns frames how her receiving details and guidance appear later.",
      "Before her first payment, the empty dashboard doesn't just show zeroes: it gives her one clear next action — get her receiving details and share them with a client. Once money arrives, the balance becomes the anchor, with a recent-change indicator and three direct actions.",
    ],
    figures: [
      {
        src: "/work/pave/onboarding.png",
        alt: "Pave onboarding and sign-up screens.",
        caption: "Getting started — one field, minimal ask.",
        span: "pair",
      },
      {
        src: "/work/pave/empty-dashboard.png",
        alt: "Empty dashboard state with a single call to action.",
        caption: "The empty state as a guidance moment, not a dead end.",
        span: "pair",
      },
    ],
  },
  outcomes: {
    heading: "Where it landed",
    body: [
      "Pave is a concept, so there are no live metrics to report — and inventing them would defeat the point. What it produced is a coherent core flow, from sign-up to convert-and-withdraw, where every screen traces back to a real constraint Lade operates under.",
      "The clearest result is the argument itself: that the constraints — naira-only inbound, visible fees, no direct dollar spend — are not obstacles to design around quietly. Handled honestly, they became the product's whole claim to credibility.",
    ],
  },
  reflection: [
    "With more time, the first thing to test is whether the USD-first balance genuinely reduces confusion for real freelancers, and whether the conversion flow feels as transparent in practice as it does on the screen.",
    "The investing feature I cut early remains an open question rather than a closed one — once the core receive–hold–spend experience is trusted, a thoughtful savings layer could be a natural next step.",
    "This project reinforced a principle I carry into any product work: constraints are often the clearest source of a product's credibility, not a limitation on it.",
  ],
};

const audit: CaseStudy = {
  slug: "authentication-audit",
  title: "Authentication, audited",
  tagline: `An independent audit and redesign of ${PLATFORM.name}'s authentication experience.`,
  meta: {
    role: "Product designer — independent audit",
    type: "Self-initiated",
    timeline: "August 2026",
    tools: "Figma, browser DevTools",
  },
  hero: {
    src: "/work/vendy/hero.png",
    alt: "Redesigned sign-up screen with a progress indicator and a trust-signals panel.",
    caption: "The redesigned sign-up — progress up front, the empty gradient earning its keep.",
  },
  overview: [
    `${PLATFORM.name.replace(/^a /, "A ")} lets Nigerian businesses accept payments inside WhatsApp and social media. It is CBN-licensed, PCI DSS and ISO compliant, and serves well-known clients.`,
    `I wanted to understand the technical reality of shipping a product after the design is done, so I audited the authentication system — every screen from sign-up to dashboard access, on desktop and mobile — through four lenses: visual UI, UX journey, Nielsen's heuristics, and WCAG 2.1.`,
    "It uncovered 55 unique issues, including an account-enumeration weakness, a rate limiter that warns but doesn't block, and accessibility barriers that could stop screen-reader users completing sign-up. I redesigned 33 screens to show how each finding could be addressed while preserving the platform's existing design language.",
    "No one commissioned this. I ran it to demonstrate how I think about product design beyond visual execution.",
  ],
  problem: {
    heading: "What I found, walking through as a real user",
    body: [
      "I created a real account and went through the whole flow — signed up, entered ID, set up a business, logged in and out, reset my password, and deliberately tried to break things. Three findings stood in for a broader pattern.",
      "The sign-up promises simplicity and delivers complexity. The first screen is one field: enter your email. Behind it is an 8-step process needing a phone number, a password, business details, government ID and date of birth — none of it disclosed before you start. Users expecting a quick sign-up discover mid-flow they need documents they may not have to hand.",
      "The error messages reveal too much. Wrong email returns 'Account not found'; right email with wrong password returns 'Incorrect password.' Helpful for a user — and equally helpful for an attacker checking whether a specific email is registered. For a platform handling money, that pattern has a name: account enumeration.",
      "The system warns but doesn't enforce. After six failed logins a message appears — 'Too many login attempts' — but the Sign In button stays active. The rate limiter announces itself without doing its job.",
    ],
  },
  constraints: [
    {
      label: "Observation only",
      body: "This was black-box testing as an ordinary user — going through the real UI, triggering error states, reading what the interface says. No infrastructure was probed.",
    },
    {
      label: "Their language, not mine",
      body: "Every redesign had to survive as something the platform's own team could act on immediately — which meant preserving their colours, type, and components.",
    },
    {
      label: "No screen-reader rig",
      body: "Accessibility findings came from visual and behavioural inspection; several are flagged 'may not be accessible' and noted as needing assistive-tech testing to confirm.",
    },
  ],
  decisions: [
    {
      fork: "Review through a single lens, or run four frameworks over the same screens?",
      chose: "Four lenses — visual UI, UX journey, Nielsen's heuristics, and WCAG 2.1.",
      why: "The account-enumeration finding only becomes visible when you read error messages from a security perspective, not just a usability one. A single-lens review would have called those messages 'clear and helpful' and moved on.",
      cost: "Roughly four times the work, and a large volume of overlapping findings to deduplicate down to 55 unique issues. Worth it — the most important finding lived in the overlap.",
      figure: {
        src: "/work/vendy/frameworks.png",
        alt: "Four evaluation frameworks applied to the authentication system.",
        caption: "Four lenses over one system — the enumeration issue sat where they crossed.",
      },
    },
    {
      fork: "Redesign freely to my own taste, or stay inside the platform's existing design language?",
      chose: "Preserve their language — same palette, type, and component patterns across all 33 screens.",
      why: "A redesign a team can ship this quarter is worth more than one they admire and shelve. Staying inside their system meant every recommendation was directly actionable, not a rebrand proposal.",
      cost: "I had to leave deeper visual-identity issues untouched and work within components I would have built differently. The constraint made the output more useful, not less.",
      figure: {
        src: "/work/vendy/tokens.png",
        alt: "Extracted design tokens: colours, type scale, and component states.",
        caption: "Tokens extracted from the live interface, so every fix felt native.",
        span: "pair",
      },
    },
    {
      fork: "Keep specific, friendly login errors, or collapse them into one generic message?",
      chose: "One message for every failure: 'The email or password you entered is incorrect.'",
      why: "Specific errors are marginally friendlier to legitimate users and a gift to an attacker enumerating accounts. On a money platform, closing the enumeration vector outweighs the small helpfulness lost.",
      cost: "A legitimate user who genuinely forgot which email they used gets slightly less guidance. Accepted — the security gain is decisive and the recovery flow covers the gap.",
      figure: {
        src: "/work/vendy/error-states.png",
        alt: "Before and after of login error messaging.",
        caption: "Two revealing errors become one that gives an attacker nothing.",
        span: "pair",
      },
    },
  ],
  craft: {
    heading: "The redesigns that carried the findings",
    body: [
      "Thirty-three screens, each preserving the platform's design language while resolving a finding. The highest-impact fixes clustered around trust, guidance, and enforcement.",
      "Password requirements moved from a dense line of red text after failure to a checklist that ticks off as you type. The broken rate limiter became a disabled button with a live countdown. The blank post-sign-up dashboard became a setup checklist that always names the next step.",
    ],
    figures: [
      {
        src: "/work/vendy/password-checklist.png",
        alt: "Real-time password requirement checklist.",
        caption: "Requirements you can watch yourself meet, instead of guess-and-fail.",
        span: "pair",
      },
      {
        src: "/work/vendy/rate-limit.png",
        alt: "Rate-limited login with a disabled button and countdown.",
        caption: "The limiter now does what it says: 'Try again in 14:32.'",
        span: "pair",
      },
      {
        src: "/work/vendy/dashboard.png",
        alt: "Redesigned dashboard empty state with a setup checklist.",
        caption: "The highest-motivation moment finally gets a next step.",
      },
    ],
  },
  outcomes: {
    heading: "What the audit produced",
    body: [
      "As an independent audit there is no shipped-conversion metric to claim — the honest measure is the scope of what it found and what the redesigns address.",
      ...(PLATFORM.disclosed
        ? ["I shared these findings with the platform's team before publishing this."]
        : []),
    ],
    stats: [
      { value: "55", label: "unique issues, deduplicated across four frameworks" },
      { value: "33", label: "screens redesigned in the platform's own language" },
      { value: "4", label: "critical security & usability issues resolved" },
      { value: "27", label: "recommendations, prioritised in three tiers" },
    ],
  },
  reflection: [
    "Run again, I'd include real screen-reader testing (NVDA or VoiceOver) rather than visual inspection — several WCAG findings are flagged 'may not be accessible' precisely because I couldn't confirm them without assistive tech, and a complete audit should.",
    "I'd also test the flow with two or three real merchants. My perspective is a designer evaluating a product, not a merchant trying to get paid on a slow network between customers — and that gap hides friction I can't see.",
    "The lasting lesson: multi-framework evaluation surfaces what single-lens reviews miss. The same feature — a mandatory OTP on every login — is a strength for a bank and a daily tax for a mobile-first merchant. Context, not the feature, decides.",
  ],
};

export const caseStudies: Record<string, CaseStudy> = {
  pave,
  "authentication-audit": audit,
};

export const caseStudyList = Object.values(caseStudies);
