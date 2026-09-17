import type { Metadata } from "next";
import { site, craft } from "@/content/site";
import Nav from "@/components/Nav";
import WorkCard from "@/components/WorkCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: `Experiments — ${site.name}`,
  description:
    "Self-directed landing-page explorations, components, and interface studies.",
};

export default function ExperimentsPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[720px] px-6 pb-20">
      <Nav />

      {/* ── Header ───────────────────────────────────────────── */}
      <section className="pt-8 sm:pt-12">
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Experiments
        </h1>
        <p className="mt-4 max-w-[46ch] text-[clamp(1.0625rem,2.4vw,1.25rem)] leading-[1.45]">
          Self-directed <span className="hi">explorations</span>{" "}
          <span className="dim">— landing pages, components, and interface studies where I push craft and try ideas outside client work.</span>
        </p>
      </section>

      {/* ── Landing page explorations ────────────────────────── */}
      <section className="mt-14">
        <h2 className="mb-6 text-[13px] font-medium uppercase tracking-[0.06em] text-[color:var(--text-dim)]">
          Landing pages
        </h2>
        <div className="card-grid">
          {craft.map((c) => (
            <WorkCard
              key={c.slug}
              card={{
                title: c.title,
                descriptor: c.descriptor,
                thumb: c.thumb,
                href: `/craft/${c.slug}`,
                video: `/videos/${c.slug}.mp4`,
                tags: c.tags,
              }}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
