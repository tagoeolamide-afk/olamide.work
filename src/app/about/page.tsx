import type { Metadata } from "next";
import Image from "next/image";
import { site, skills } from "@/content/site";
import { assetExists } from "@/lib/assets";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "Product designer focused on fintech, authentication, and onboarding — with an International law and diplomacy background.",
};

// Placeholder — replace with Olamide's real interests.
const currentlyInto = [
  "Fintech UX",
  "Design systems",
  "Motion",
  "Design engineering",
  "Type",
  "Prototyping",
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.06em] text-[color:var(--text-dim)]">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  const portrait = "/images/about-portrait.jpg";
  const hasPortrait = assetExists(portrait);

  return (
    <main id="main" className="mx-auto w-full max-w-[1120px] px-6 pb-20 sm:px-8">
      <Nav />

      {/* ── Intro: bio left, portrait right (stacks on mobile) ── */}
      <section className="grid gap-10 pt-8 sm:pt-12 md:grid-cols-[1fr_320px] md:items-start md:gap-14">
        <div className="max-w-[560px]">
          <h1 className="text-[clamp(2rem,5.5vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            Hi, I&rsquo;m Olamide.
          </h1>

          <div className="mt-6 space-y-4 text-[1.0625rem] leading-[1.6]">
            <p>
              I design product experiences that connect interface clarity with system
              behavior. <span className="dim">My work sits across</span> UI, UX, and
              frontend, <span className="dim">with a strong interest in</span> fintech,
              authentication, onboarding, and design systems.
            </p>
            <p>
              I come from an International law and diplomacy background,{" "}
              <span className="dim">so I pay close attention to</span>{" "}
              <span className="hi">trust</span>, risk, edge cases, and how products behave
              when something goes wrong. <span className="dim">I don&rsquo;t only design
              clean screens —</span> I design flows that help people understand what to do,
              recover from mistakes, and move forward with confidence.
            </p>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-block rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] transition-opacity hover:opacity-85"
          >
            Let&rsquo;s chat
          </a>
        </div>

        {/* Portrait */}
        <div className="overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)]">
          {hasPortrait ? (
            <Image
              src={portrait}
              alt="Olamide Tagoe"
              width={640}
              height={800}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/5] flex-col justify-end gap-1 p-4">
              <span className="t-meta">Portrait</span>
              <code className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--text-dim)]">
                public/images/about-portrait.jpg
              </code>
            </div>
          )}
        </div>
      </section>

      {/* ── What I work on (real skills) ─────────────────────── */}
      <section className="mt-24 max-w-[720px]">
        <Label>What I work on</Label>
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="text-[0.95rem] font-semibold text-[color:var(--text)]">
                {g.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-[color:var(--hairline)] px-3 py-1 text-[13px] text-[color:var(--text-dim)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Currently into (placeholder) ─────────────────────── */}
      <section className="mt-24 max-w-[720px]">
        <Label>Currently into</Label>
        <ul className="flex flex-wrap gap-2">
          {currentlyInto.map((it) => (
            <li
              key={it}
              className="rounded-full border border-[color:var(--hairline)] px-3 py-1 text-[13px] text-[color:var(--text-dim)]"
            >
              {it}
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
