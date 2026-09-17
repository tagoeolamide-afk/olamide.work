import type { Metadata } from "next";
import { site, craft } from "@/content/site";
import { assetExists } from "@/lib/assets";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ExperimentsGrid, { type ExpItem } from "@/components/ExperimentsGrid";

export const metadata: Metadata = {
  title: `Experiments — ${site.name}`,
  description:
    "Self-directed landing-page explorations, components, and interface studies.",
};

export default function ExperimentsPage() {
  // Resolve media existence on the server, then hand plain data to the client grid.
  const items: ExpItem[] = craft.map((c) => {
    const videoPath = `/videos/${c.slug}.mp4`;
    return {
      slug: c.slug,
      title: c.title,
      description: c.descriptor,
      liveUrl: c.liveUrl,
      tools: c.tools ?? [],
      thumb: c.thumb,
      video: assetExists(videoPath) ? videoPath : null,
    };
  });

  return (
    <main id="main" className="mx-auto w-full max-w-[1120px] px-6 pb-20 sm:px-8">
      <Nav />

      {/* ── Header (left-aligned) ────────────────────────────── */}
      <section className="max-w-[560px] pt-8 sm:pt-12">
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Experiments
        </h1>
        <p className="mt-4 max-w-[46ch] text-[clamp(1.0625rem,2.4vw,1.25rem)] leading-[1.45]">
          Self-directed <span className="hi">explorations</span>{" "}
          <span className="dim">— landing pages, components, and interface studies where I push craft and try ideas outside client work.</span>
        </p>
      </section>

      {/* ── Pinterest grid + detail modal (left-aligned) ─────── */}
      <section className="mt-12 max-w-[820px]">
        <ExperimentsGrid items={items} />
      </section>

      <Footer />
    </main>
  );
}
