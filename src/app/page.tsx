import Link from "next/link";
import { site, selectedWork, craft } from "@/content/site";
import SectionIcon from "@/components/SectionIcon";
import WorkCard from "@/components/WorkCard";
import CraftScroller from "@/components/CraftScroller";

function SectionHead({ label }: { label: string }) {
  return (
    <div className="section-head">
      <SectionIcon />
      <span className="t-label">{label}</span>
    </div>
  );
}

export default function Home() {
  const activeLinks = Object.entries(site.links).filter(([, url]) => url);

  return (
    <main id="main" className="column pt-16 pb-24">
      {/* ── Hero: name / role, then the paragraphs ───────────── */}
      <header>
        <Link href="/" className="t-name inline-block">
          {site.name}
        </Link>
        <p className="t-role">{site.role}</p>
      </header>

      <div className="mt-[var(--gap-name-body)] flex flex-col gap-[var(--gap-para)]">
        {site.hero.map((p, i) => (
          <p key={i} className="t-lead">
            {p}
          </p>
        ))}
      </div>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="mt-[var(--gap-section)]">
        <SectionHead label="Selected work." />
        <div className="card-grid">
          {selectedWork.map((c) => (
            <WorkCard key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* ── For the love of design (horizontal scroll) ───────── */}
      <section className="mt-[var(--gap-section)]">
        <CraftScroller label="For the love of design.">
          {craft.map((c) => (
            <WorkCard
              key={c.slug}
              card={{
                title: c.title,
                descriptor: c.descriptor,
                thumb: c.thumb,
                href: `/craft/${c.slug}`,
              }}
            />
          ))}
        </CraftScroller>
      </section>

      {/* ── Contact / footer ─────────────────────────────────── */}
      <footer className="mt-[var(--gap-section)] flex flex-col gap-3">
        <p className="t-lead !text-[color:var(--ink)]">{site.availability}</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`mailto:${site.email}`}
            className="t-role underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
          >
            {site.email}
          </a>
          {activeLinks.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="t-role capitalize underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
            >
              {name}
            </a>
          ))}
        </div>
        <p className="t-date mt-6">
          &copy; {new Date().getFullYear()} {site.name.replace(/\.$/, "")} · Designed &amp; built in Next.js
        </p>
      </footer>
    </main>
  );
}
