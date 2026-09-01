import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { site } from "@/content/site";
import { listFrames } from "@/lib/assets";

// Slugs with their own dedicated route (richer than the frame-stack template).
const DEDICATED = new Set(["authentication-audit"]);

export function generateStaticParams() {
  return Object.keys(caseStudies)
    .filter((slug) => !DEDICATED.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return {};
  return { title: `${cs.title} — ${site.name}`, description: cs.tagline };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();

  const frames = listFrames(slug);

  return (
    <main id="main" className="mx-auto w-full max-w-[1120px] px-6 pb-24 pt-8">
      {/* ── Small header: name + back-to-home nav ────────────── */}
      <header className="flex items-baseline justify-between">
        <Link href="/" className="t-name inline-block hover:opacity-60 transition-opacity">
          {site.name}
        </Link>
        <Link href="/" className="t-meta hover:text-[color:var(--ink)] transition-colors">
          ← Back to home
        </Link>
      </header>

      {/* ── The frame stack (title/meta live in the cover frame) ── */}
      {frames.length > 0 ? (
        <div className="mt-10 flex flex-col gap-4">
          {frames.map((f, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={f.src}
              src={f.src}
              alt={`${cs.title} — frame ${i + 1}`}
              loading={i < 2 ? "eager" : "lazy"}
              className="block h-auto w-full"
            />
          ))}
        </div>
      ) : (
        <div className="mt-14 rounded-[var(--radius)] border border-dashed border-[color:var(--hairline)] p-10 text-center">
          <p className="t-meta">No frames yet</p>
          <p className="mt-2 text-[14px] text-[color:var(--muted)]">
            Drop the 1440px frames into{" "}
            <code className="font-[family-name:var(--font-mono)] text-[12px]">
              public/images/{slug}/frames/
            </code>{" "}
            named 01.png, 02.png, … and they stack here in order.
          </p>
        </div>
      )}

      {/* ── Footer: back + contact ───────────────────────────── */}
      <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--hairline)] pt-8">
        <Link href="/" className="t-meta hover:text-[color:var(--ink)] transition-colors">
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
  );
}
