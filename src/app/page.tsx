import Link from "next/link";
import { site, selectedWork, craft, skills } from "@/content/site";
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
  const contactLinks: [string, string][] = [
    ["Email me", `mailto:${site.email}`],
    ...(site.links.linkedin ? [["LinkedIn", site.links.linkedin] as [string, string]] : []),
    ...(site.links.github ? [["GitHub", site.links.github] as [string, string]] : []),
    ...(site.links.dribbble ? [["Dribbble", site.links.dribbble] as [string, string]] : []),
    ...(site.links.behance ? [["Behance", site.links.behance] as [string, string]] : []),
    ...(site.links.resume ? [["Résumé", site.links.resume] as [string, string]] : []),
  ];

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

      {/* ── About ────────────────────────────────────────────── */}
      <section className="mt-[var(--gap-section)]">
        <SectionHead label="About." />
        <div className="flex flex-col gap-[var(--gap-para)]">
          {site.about.map((p, i) => (
            <p key={i} className="t-lead">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── Selected work ────────────────────────────────────── */}
      <section className="mt-[var(--gap-section)]">
        <SectionHead label="Selected work." />
        <div className="card-grid">
          {selectedWork.map((c) => (
            <WorkCard key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* ── Core skills ──────────────────────────────────────── */}
      <section className="mt-[var(--gap-section)]">
        <SectionHead label="Core skills." />
        <div className="grid gap-8 sm:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="text-[0.95rem] font-semibold text-[color:var(--ink)]">
                {g.group}
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-[color:var(--hairline)] px-3 py-1 text-[13px] text-[color:var(--muted)]"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
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
                // Card thumbnail plays this once the file exists in /public/videos/.
                video: `/videos/${c.slug}.mp4`,
                tags: c.tags,
              }}
            />
          ))}
        </CraftScroller>
      </section>

      {/* ── Open to product design roles (contact / footer) ──── */}
      <footer id="contact" className="mt-[var(--gap-section)]">
        <SectionHead label="Open to product design roles." />
        <p className="t-lead max-w-[60ch] !text-[color:var(--ink)]">{site.rolesCopy}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          {contactLinks.map(([label, href]) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="t-role underline decoration-1 underline-offset-4 transition-opacity hover:opacity-60"
              >
                {label}
              </a>
            );
          })}
        </div>

        <p className="t-date mt-10">
          &copy; {new Date().getFullYear()} {site.name.replace(/\.$/, "")} · Designed &amp; built in Next.js
        </p>
      </footer>
    </main>
  );
}
