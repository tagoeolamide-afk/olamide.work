import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { assetExists } from "@/lib/assets";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <main id="main" className="mx-auto w-full max-w-[1120px] px-6 pb-20 sm:px-8">
      <Nav />

      {/* ── Hero (left-aligned content column) ───────────────── */}
      <section className="max-w-[560px] pt-8 sm:pt-12">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)] sm:hidden">
          {hasAvatar ? (
            <Image src={avatar} alt={name} width={56} height={56} className="h-full w-full object-cover" />
          ) : (
            <span className="text-[16px] font-medium text-[color:var(--text-dim)]">{initials}</span>
          )}
        </div>

        <h1 className="mt-6 text-[clamp(2.25rem,6vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.03em] sm:mt-0">
          {name}
        </h1>

        <p className="mt-4 max-w-[42ch] text-[clamp(1.0625rem,2.4vw,1.3125rem)] leading-[1.45] text-[color:var(--text-dim)]">
          <span className="hi">Product designer</span> focused on fintech, authentication,
          and onboarding — flows that build trust and help people recover when something
          breaks.
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

      {/* ── My latest work (2-col grid, spans full container) ── */}
      <section id="work" className="mt-24 scroll-mt-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
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
                  sizes="(max-width: 768px) 100vw, 545px"
                  className="h-auto w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
