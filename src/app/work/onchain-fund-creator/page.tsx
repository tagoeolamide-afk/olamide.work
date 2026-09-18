import Link from "next/link";
import type { Metadata } from "next";
import { site } from "@/content/site";
import FrameSlot from "@/components/FrameSlot";
import Lightbox from "@/components/Lightbox";
import TableOfContents from "@/components/TableOfContents";

const DIR = "/images/onchain-fund-creator";

// TODO: set the live interactive prototype URL. Left null on purpose — the CTA
// renders in a "coming soon" state rather than pointing at a fabricated link.
const PROTOTYPE_URL: string | null = null;

export const metadata: Metadata = {
  title: `Onchain Fund Creator — ${site.name}`,
  description:
    "A beginner-first experience for creating and launching an onchain index fund without requiring smart-contract knowledge.",
};

/* ---------- small building blocks (shared with the case-study system) ---------- */

const slug = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Order + labels for the "On this page" sidebar (must match the Section titles).
const SECTIONS = [
  "Context",
  "The design target",
  "Structuring the experience",
  "Key design decisions",
  "Designing for transaction uncertainty",
  "Supporting the creator after launch",
  "System and accessibility",
  "Final experience",
].map((t) => ({ id: slug(t), label: t }));

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={slug(title)} className="mt-16 scroll-mt-8 sm:mt-20">
      <div className="mb-6 flex items-baseline gap-4">
        <span className="t-meta">{n}</span>
        <h2 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.01em] text-[color:var(--ink)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="t-body">{children}</p>;
}

function Prose({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[68ch] space-y-4">{children}</div>;
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-[1.125rem] font-semibold text-[color:var(--ink)]">
      {children}
    </h3>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="mt-2 text-[13px] leading-snug text-[color:var(--muted)]">{children}</p>;
}

/** Bordered pill used in flow + converge diagrams. */
function Chip({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-block rounded-full border px-4 py-2 text-[14px] font-medium ${
        strong
          ? "border-[color:var(--text)] text-[color:var(--text)]"
          : "border-[color:var(--hairline)] text-[color:var(--ink)]"
      }`}
    >
      {children}
    </span>
  );
}

/** Screenshot frame with a dark letterbox to match the product's dark UI. */
function Shot(props: React.ComponentProps<typeof FrameSlot>) {
  return <FrameSlot bg="#0a0a0b" {...props} />;
}

/** Horizontal chip flow, wraps on small screens (matches the audit process style). */
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-6 flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <Chip>{s}</Chip>
          {i < steps.length - 1 && (
            <span aria-hidden className="text-[color:var(--muted)]">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Two decision systems converging into one guided flow. Compact, not decorative. */
function Converge() {
  return (
    <div className="my-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2">
        <Chip>Portfolio decisions</Chip>
        <Chip>Blockchain decisions</Chip>
      </div>
      <span aria-hidden className="rotate-90 text-[color:var(--muted)] sm:rotate-0">
        →
      </span>
      <Chip strong>Guided fund creation</Chip>
    </div>
  );
}

/** Highlighted design-question callout. */
function DesignQuestion({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 max-w-[68ch] rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-5 sm:p-6">
      <p className="t-meta mb-2">Design question</p>
      <p className="text-[1.0625rem] leading-[1.5] text-[color:var(--ink)]">{children}</p>
    </div>
  );
}

/** Two-column knowledge comparison (already understands / should not need to). */
function CompareCols({
  left,
  right,
}: {
  left: { title: string; items: string[] };
  right: { title: string; items: string[] };
}) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      {[left, right].map((c) => (
        <div
          key={c.title}
          className="rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-5"
        >
          <h3 className="text-[0.95rem] font-semibold text-[color:var(--ink)]">{c.title}</h3>
          <ul className="mt-3 space-y-1.5 text-[14px] text-[color:var(--text-dim)]">
            {c.items.map((i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden>·</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Allocation validation states — labelled by text, never colour alone. */
function ValidationStates({ rows }: { rows: { state: string; note: string }[] }) {
  return (
    <ul className="my-6 grid gap-3 sm:grid-cols-3">
      {rows.map((r) => (
        <li
          key={r.state}
          className="rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[color:var(--surface)] p-4"
        >
          <p className="text-[15px] font-semibold text-[color:var(--ink)]">{r.state}</p>
          <p className="mt-1 text-[13px] leading-snug text-[color:var(--text-dim)]">{r.note}</p>
        </li>
      ))}
    </ul>
  );
}

/** Terminology swaps: technical framing → what the product actually says. */
function Swaps({ rows }: { rows: [string, string][] }) {
  return (
    <ul className="my-4 max-w-[68ch] space-y-2">
      {rows.map(([tech, prod]) => (
        <li key={prod} className="flex flex-wrap items-center gap-2 text-[15px] leading-relaxed">
          <span className="text-[color:var(--text-dim)]">&ldquo;{tech}&rdquo;</span>
          <span aria-hidden className="text-[color:var(--muted)]">
            →
          </span>
          <span className="font-medium text-[color:var(--ink)]">&ldquo;{prod}&rdquo;</span>
        </li>
      ))}
    </ul>
  );
}

/** Bulleted list with proper markup. */
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-4 max-w-[68ch] list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[color:var(--ink)]">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

/** Interactive-prototype CTA. Renders a real link only when a URL is configured. */
function PrototypeCTA() {
  if (PROTOTYPE_URL) {
    return (
      <a
        href={PROTOTYPE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] transition-opacity hover:opacity-85"
      >
        View interactive prototype →
      </a>
    );
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span
        aria-disabled="true"
        className="inline-block cursor-default rounded-full border border-[color:var(--hairline)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--text-dim)]"
      >
        View interactive prototype →
      </span>
      <span className="text-[13px] text-[color:var(--text-dim)]">Prototype link coming soon.</span>
    </div>
  );
}

/* ------------------------------ page ------------------------------ */

export default function OnchainFundCreatorPage() {
  return (
    <Lightbox>
    <div className="mx-auto w-full max-w-[1120px] px-6 pb-24 pt-8 sm:px-8">
      {/* header / back nav */}
      <header className="flex items-baseline justify-between">
        <Link href="/" className="t-name inline-block transition-opacity hover:opacity-60">
          {site.name}
        </Link>
        <Link href="/" className="t-meta transition-colors hover:text-[color:var(--ink)]">
          ← Back to home
        </Link>
      </header>

      <div className="mt-10 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-14">
        <TableOfContents sections={SECTIONS} />
        <main
          id="main"
          className="min-w-0 max-w-[820px]"
          // Case study reads as all-white text: resolve the secondary tokens to
          // the primary color for this column only (the sidebar keeps its states).
          style={{ "--text-dim": "var(--text)", "--muted": "var(--text)" } as React.CSSProperties}
        >
          {/* Hero */}
          <div>
            <span className="t-meta">Self-initiated</span>
            <h1 className="mt-3 max-w-[22ch] text-[clamp(1.9rem,4.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-[color:var(--ink)]">
              Onchain Fund Creator
            </h1>
            <p className="t-lead mt-5 max-w-[60ch]">
              Designing a beginner-first experience for creating and launching an onchain
              index fund without requiring smart-contract knowledge.
            </p>
          </div>

          {/* Hero visual: large Portfolio Allocation screen + two supporting screens */}
          <div className="mt-10">
            <Shot
              src={`${DIR}/allocation.png`}
              alt="Portfolio Allocation screen showing editable asset percentages beside a live donut chart of the fund"
              ratio="16 / 10"
            />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Shot
              src={`${DIR}/review.png`}
              alt="Review screen summarising the fund's assets, allocation, fee and ownership before launch"
              ratio="4 / 3"
              label="Review"
            />
            <Shot
              src={`${DIR}/success.png`}
              alt="Deployment success screen confirming the fund is live onchain"
              ratio="4 / 3"
              label="Deployment success"
            />
          </div>

          {/* metadata row */}
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[color:var(--hairline)] pt-8 sm:grid-cols-4">
            {[
              ["Role", "Product Designer"],
              ["Scope", "UX strategy, interaction design, UI design, prototyping"],
              ["Platform", "Responsive web"],
              ["Project type", "Self-initiated exploration"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-meta">{k}</dt>
                <dd className="mt-2 text-[14px] leading-snug text-[color:var(--muted)]">{v}</dd>
              </div>
            ))}
          </dl>

          {/* 01 · Context */}
          <Section n="01" title="Context">
            <Prose>
              <P>
                An onchain index fund groups several crypto assets into one portfolio with
                defined allocation rules. For a first-time creator, building one combines two
                different mental models.
              </P>
              <P>
                Portfolio decisions include assets, percentages, fees and rebalancing.
                Blockchain decisions include networks, wallets, ownership and transaction
                confirmation.
              </P>
              <P>
                My goal was to bring those systems together without making the creator learn
                protocol terminology first.
              </P>
            </Prose>

            <Converge />

            <DesignQuestion>
              How might I help someone who understands investing, but not smart contracts,
              create and launch an onchain fund with <span className="hi">confidence</span>?
            </DesignQuestion>
          </Section>

          {/* 02 · The design target */}
          <Section n="02" title="The design target">
            <Prose>
              <P>
                For this exploration, I defined the primary user as a crypto-aware first-time
                fund creator. They understand tokens, wallets, portfolio percentages and basic
                investing.
              </P>
              <P>
                They should not need to understand Solidity, contract architecture, RPCs, basis
                points or deployment infrastructure.
              </P>
              <P>
                Their main need is confidence. They need to know what they are configuring, what
                happens next, what costs money and which actions are difficult to reverse.
              </P>
            </Prose>

            <CompareCols
              left={{
                title: "Already understands",
                items: ["Tokens", "Wallets", "Percentages", "Basic investing"],
              }}
              right={{
                title: "Should not need to understand",
                items: [
                  "Solidity",
                  "Contract architecture",
                  "RPCs",
                  "Deployment infrastructure",
                ],
              }}
            />
          </Section>

          {/* 03 · Structuring the experience */}
          <Section n="03" title="Structuring the experience">
            <Prose>
              <P>I reduced fund creation into seven decisions:</P>
            </Prose>
            <Flow
              steps={["Basics", "Assets", "Allocation", "Strategy", "Fees", "Ownership", "Review"]}
            />
            <Prose>
              <P>Each step answers one primary question.</P>
            </Prose>
            <Bullets
              items={[
                "What is the fund?",
                "What should it hold?",
                "How should the portfolio be divided?",
                "How should it stay balanced?",
                "What fee should it charge?",
                "Who controls it?",
                "Is everything correct before launch?",
              ]}
            />
            <Prose>
              <P>
                This structure keeps the technical system in the background while the creator
                focuses on one decision at a time.
              </P>
              <P>
                I also kept advanced features such as DAO governance, cross-chain portfolios and
                complex fee models outside the main flow.
              </P>
            </Prose>

            <H3>The full product flow</H3>
            {/* Horizontal on desktop, wraps and reads top-to-bottom on mobile. */}
            <Flow
              steps={[
                "Dashboard",
                "Create Fund",
                "Basics",
                "Assets",
                "Allocation",
                "Strategy",
                "Fees",
                "Ownership",
                "Review",
                "Confirm",
                "Processing",
                "Success",
                "Fund Dashboard",
              ]}
            />
          </Section>

          {/* 04 · Key design decisions (largest section) */}
          <Section n="04" title="Key design decisions">
            {/* Decision A */}
            <H3>A · Make allocation visible while it is being edited</H3>
            <Prose>
              <P>
                Portfolio weighting is easier to understand when the numbers and the whole
                portfolio stay connected. I paired editable percentages with a live donut chart
                and added two weighting methods.
              </P>
              <P>
                <strong>Equal Weight</strong> automatically distributes the portfolio.{" "}
                <strong>Custom Weight</strong> gives the creator direct control.
              </P>
              <P>The interface also validates the portfolio before the user moves forward.</P>
            </Prose>

            <div className="mt-6">
              <Shot
                src={`${DIR}/allocation.png`}
                alt="Portfolio Allocation screen with editable per-asset percentages, weighting method toggle and a live allocation donut chart"
                ratio="16 / 10"
              />
            </div>

            <ValidationStates
              rows={[
                { state: "93% allocated", note: "7% still needs to be allocated." },
                { state: "100% allocated", note: "Ready to continue." },
                { state: "104% allocated", note: "Reduce the allocation by 4%." },
              ]}
            />
            <Prose>
              <P>This prevents an invalid portfolio from reaching the deployment stage.</P>
            </Prose>

            {/* Decision B */}
            <H3>B · Explain complexity at the point of decision</H3>
            <Prose>
              <P>
                I kept technical information available without making it the primary interface.
                For example:
              </P>
            </Prose>
            <Swaps
              rows={[
                ["Configure collateral tokens", "Choose assets"],
                ["Invoke deployment contract", "Launch fund"],
              ]}
            />
            <Prose>
              <P>Advanced settings remain collapsed until needed.</P>
              <P>
                The goal was not to hide the blockchain layer. It was to introduce it when it
                affected the user&rsquo;s decision.
              </P>
            </Prose>
            <div className="mt-6">
              <Shot
                src={`${DIR}/strategy.png`}
                alt="Rebalancing Strategy screen with a collapsed Advanced Settings control kept out of the primary path"
                ratio="16 / 10"
              />
            </div>

            {/* Decision C */}
            <H3>C · Add a confirmation layer before the wallet</H3>
            <Prose>
              <P>
                A wallet should confirm a decision, not explain it. Instead of sending the
                creator directly from Deploy Fund into a wallet prompt, I added a product-owned
                confirmation step.
              </P>
              <P>Before confirming, the creator sees:</P>
            </Prose>
            <Bullets
              items={[
                "The fund being launched.",
                "The selected network.",
                "The connected wallet.",
                "The estimated network fee.",
                "What the transaction will do.",
                "What information becomes public.",
              ]}
            />
            <Prose>
              <P>Only then do they continue to the wallet.</P>
            </Prose>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Shot
                src={`${DIR}/review.png`}
                alt="Review Fund screen listing the configured assets, allocation, fee and ownership"
                ratio="4 / 3"
                label="Review Fund"
              />
              <Shot
                src={`${DIR}/ready-to-launch.png`}
                alt="Ready to Launch confirmation showing the network, connected wallet, estimated fee and what becomes public"
                ratio="4 / 3"
                label="Ready to Launch"
              />
            </div>
          </Section>

          {/* 05 · Designing for transaction uncertainty */}
          <Section n="05" title="Designing for transaction uncertainty">
            <Prose>
              <P>
                A blockchain action has more states than a standard form submission. After wallet
                approval, the creator still needs to know whether the transaction was submitted,
                confirmed or failed.
              </P>
              <P>I designed deployment as one continuous sequence:</P>
            </Prose>
            <Flow
              steps={[
                "Waiting for Wallet Approval",
                "Transaction Submitted",
                "Confirming Fund",
                "Fund Deployed",
                "Your Fund Is Live",
              ]}
            />
            <Prose>
              <P>
                The processing indicator transforms into the success state, keeping the
                interaction visually continuous.
              </P>
            </Prose>

            <Prose>
              <P>I also designed recovery paths for:</P>
            </Prose>
            <Bullets
              items={[
                "Wrong network.",
                "Insufficient network fee.",
                "Rejected transaction.",
                "Failed transaction.",
                "Delayed confirmation.",
              ]}
            />
            <Prose>
              <P>Each error explains what happened and gives the creator a clear next action.</P>
            </Prose>
          </Section>

          {/* 06 · Supporting the creator after launch */}
          <Section n="06" title="Supporting the creator after launch">
            <Prose>
              <P>
                Launching the fund is only part of the job. The creator also needs to know
                whether the portfolio is still following its intended strategy.
              </P>
              <P>The management experience focuses on:</P>
            </Prose>
            <Bullets
              items={[
                "Current portfolio composition.",
                "Target allocation.",
                "Portfolio drift.",
                "Next rebalance.",
                "Transactions.",
                "Fund settings.",
              ]}
            />
            <Prose>
              <P>
                I kept trading-style information secondary so the dashboard stayed focused on
                fund management.
              </P>
            </Prose>
            <div className="mt-6">
              <Shot
                src={`${DIR}/fund-dashboard.png`}
                alt="Fund Management Dashboard showing current composition, target allocation, drift and next rebalance"
                ratio="16 / 10"
              />
            </div>
            <div className="mt-4">
              <Shot
                src={`${DIR}/rebalance-review.png`}
                alt="Rebalance Review screen listing what the fund will buy and sell to return to its target allocation"
                ratio="16 / 10"
                label="Rebalance review"
              />
            </div>
          </Section>

          {/* 07 · System and accessibility */}
          <Section n="07" title="System and accessibility">
            <Prose>
              <P>
                I created reusable interaction patterns for buttons, inputs, asset rows, wallet
                controls, status messages, loading states, errors and transaction feedback.
              </P>
              <P>
                The product uses one consistent icon system and official asset marks for tokens.
              </P>
              <P>
                I also created light and dark themes with the same information hierarchy and
                interaction behaviour. Both themes use accessible contrast targets and semantic
                success, warning and error treatments.
              </P>
            </Prose>
            <div className="mt-6">
              <Shot
                src={`${DIR}/components.png`}
                alt="Reusable empty, loading, status and error states — no funds, no wallet, wrong network, insufficient fee, rejected, delayed and failed transactions — with consistent messaging and recovery actions"
                ratio="3 / 2"
              />
            </div>
            <div className="mt-4">
              <Shot
                src={`${DIR}/light-dark.png`}
                alt="The Manage Allocation screen rendered in light mode, keeping the same information hierarchy as the dark theme used across the product"
                ratio="16 / 10"
                label="Light and dark themes"
              />
            </div>
          </Section>

          {/* 08 · Final experience */}
          <Section n="08" title="Final experience">
            <Prose>
              <P>The prototype connects the full creator journey:</P>
            </Prose>
            <Flow
              steps={["Create", "Configure", "Review", "Confirm", "Deploy", "Manage"]}
            />
            <Prose>
              <P>
                The strongest lesson from the project was that simplifying a technical financial
                product is not about removing every technical detail. It is about deciding when
                each detail becomes useful.
              </P>
              <P>
                By organizing the experience around the creator&rsquo;s decisions rather than the
                underlying protocol, I turned a blockchain configuration task into a guided
                fund-creation flow.
              </P>
            </Prose>

            <H3>What I would test next</H3>
            <Prose>
              <P>The next iteration would validate four areas with first-time creators:</P>
            </Prose>
            <Bullets
              items={[
                "Whether allocation rules are understood without explanation.",
                "Whether users distinguish management fees from network fees.",
                "Whether ownership options are clear.",
                "Whether creators understand what they are approving before opening their wallet.",
              ]}
            />

            <div className="mt-8">
              <PrototypeCTA />
            </div>
          </Section>

          {/* footer: back + contact (no new CTA) */}
          <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--hairline)] pt-8">
            <Link href="/" className="t-meta transition-colors hover:text-[color:var(--ink)]">
              ← Back to home
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="t-role underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
            >
              {site.email}
            </a>
          </footer>
        </main>
      </div>
    </div>
    </Lightbox>
  );
}
