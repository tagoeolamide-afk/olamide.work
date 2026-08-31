import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { site, craft } from "@/content/site";
import { assetExists } from "@/lib/assets";

const bySlug = Object.fromEntries(craft.map((c) => [c.slug, c]));

export function generateStaticParams() {
  return craft.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = bySlug[slug];
  if (!item) return {};
  return { title: `${item.title} — ${site.name}`, description: item.descriptor };
}

export default async function CraftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = bySlug[slug];
  if (!item) notFound();

  const hasThumb = assetExists(item.thumb);

  return (
    <main id="main" className="mx-auto w-full max-w-[820px] px-6 pb-24 pt-8">
      {/* ── Small header + back-to-home nav ──────────────────── */}
      <header className="flex items-baseline justify-between">
        <Link href="/" className="t-name inline-block hover:opacity-60 transition-opacity">
          {site.name}
        </Link>
        <Link href="/" className="t-meta hover:text-[color:var(--ink)] transition-colors">
          ← Back to home
        </Link>
      </header>

      {/* ── Media: screen recording when ready, else the frame ── */}
      <div className="mt-10 overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[#efefef]">
        {item.video ? (
          <video
            className="block h-auto w-full"
            src={item.video}
            poster={hasThumb ? item.thumb : undefined}
            controls
            playsInline
            preload="metadata"
          />
        ) : hasThumb ? (
          <Image
            src={item.thumb}
            alt={item.title}
            width={1600}
            height={1000}
            className="block h-auto w-full"
            sizes="(max-width: 52rem) 100vw, 820px"
          />
        ) : (
          <div className="flex aspect-[16/10] flex-col items-start justify-end gap-2 p-6">
            <span className="t-meta">Frame / recording goes here</span>
            <code className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--muted)]">
              {item.thumb.replace(/^\//, "public/")}
            </code>
          </div>
        )}
      </div>

      {/* ── Title + View live + description ───────────────────── */}
      <div className="mt-8">
        <h1 className="text-[1.75rem] font-semibold leading-tight tracking-[-0.01em]">
          {item.title}
        </h1>

        {item.liveUrl ? (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[color:var(--ink)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] transition-opacity hover:opacity-80"
          >
            View live
            <span aria-hidden>↗</span>
          </a>
        ) : (
          <span className="mt-5 inline-flex items-center rounded-[var(--radius)] border border-[color:var(--hairline)] px-5 py-2.5 text-[14px] text-[color:var(--muted)]">
            Live link coming soon
          </span>
        )}

        <p className="t-lead mt-8 max-w-[62ch]">{item.description}</p>
      </div>

      {/* ── Footer ───────────────────────────────────────────── */}
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
