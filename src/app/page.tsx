import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { assetExists } from "@/lib/assets";
import Nav from "@/components/Nav";

/** Latest-work list: descriptive title line above a large full-width cover. */
const latest: {
  href: string;
  img: string;
  lead: string;
  dim: string;
}[] = [
  {
    href: "/work/pave",
    img: "/images/pave/frames/01.png",
    lead: "Dollar banking,",
    dim: "built for Nigerian freelancers",
  },
  {
    href: "/work/authentication-audit",
    img: "/images/authentication-audit/frames/1.png",
    lead: "Auditing a fintech's authentication,",
    dim: "end to end",
  },
];

export default function Home() {
  const name = site.name.replace(/\.$/, "");
  const avatar = "/images/avatar.jpg";
  const hasAvatar = assetExists(avatar);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main id="main" className="mx-auto w-full max-w-[720px] px-6 pb-20">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-8 sm:pt-12">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)]">
          {hasAvatar ? (
            <Image src={avatar} alt={name} width={56} height={56} className="h-full w-full object-cover" />
          ) : (
            <span className="text-[16px] font-medium text-[color:var(--text-dim)]">{initials}</span>
          )}
        </div>

        <h1 className="mt-6 text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {name}
        </h1>

        <p className="mt-4 max-w-[40ch] text-[clamp(1.0625rem,2.4vw,1.3125rem)] leading-[1.45]">
          Product designer{" "}
          <span className="dim">focused on</span> fintech, authentication, and onboarding{" "}
          <span className="dim">— flows that build</span> <span className="hi">trust</span>{" "}
          <span className="dim">and help people recover when something breaks.</span>
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] transition-opacity hover:opacity-85"
          >
            My latest work
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-[color:var(--hairline)] px-5 py-2.5 text-[14px] text-[color:var(--text)] transition-colors hover:border-[color:var(--text-dim)]"
          >
            Let&rsquo;s chat
          </a>
        </div>
      </section>

      {/* ── My latest work ───────────────────────────────────── */}
      <section id="work" className="mt-24 scroll-mt-8 space-y-16">
        {latest.map((p) => (
          <Link key={p.href} href={p.href} className="group block">
            <h2 className="text-[clamp(1.25rem,3vw,1.625rem)] font-medium tracking-[-0.02em]">
              {p.lead} <span className="dim">{p.dim}</span>
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)]">
              <Image
                src={p.img}
                alt={`${p.lead} ${p.dim}`}
                width={1600}
                height={1000}
                sizes="(max-width: 760px) 100vw, 720px"
                className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          </Link>
        ))}
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="mt-28 border-t border-[color:var(--hairline)] pt-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-[16px] font-medium text-[color:var(--text)]">{name}</p>
            <p className="mt-2 max-w-[32ch] text-[14px] text-[color:var(--text-dim)]">
              Product designer focused on fintech, authentication, and onboarding.
            </p>
          </div>

          <div className="sm:justify-self-end">
            <p className="text-[13px] uppercase tracking-[0.06em] text-[color:var(--text-dim)]">Links</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              {[
                ["Projects", "/"],
                ["Experiments", "/experiments"],
                ["About", "/about"],
                ["Resume", "/resume"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[color:var(--text-dim)] transition-colors hover:text-[color:var(--text)]">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="text-[color:var(--text-dim)] transition-colors hover:text-[color:var(--text)]">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
            <a href={`mailto:${site.email}`} className="text-[color:var(--text)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
              {site.email}
            </a>
            {site.links.linkedin && (
              <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-[color:var(--text)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70">
                LinkedIn
              </a>
            )}
          </div>
          <p className="text-[12px] text-[color:var(--text-dim)]">
            &copy; {new Date().getFullYear()} {name}
          </p>
        </div>
      </footer>
    </main>
  );
}
