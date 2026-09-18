import Link from "next/link";
import { site } from "@/content/site";

const LINKS: [string, string][] = [
  ["Projects", "/"],
  ["Experiments", "/experiments"],
];

/** Shared site footer: identity, links, contact, copyright. */
export default function Footer() {
  const name = site.name.replace(/\.$/, "");

  return (
    <footer className="mt-28 border-t border-[color:var(--hairline)] pt-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className="text-[16px] font-medium text-[color:var(--text)]">{name}</p>
          <p className="mt-2 max-w-[36ch] text-[14px] text-[color:var(--text-dim)]">
            Product designer turning complex problems into clear digital products —
            expanding into frontend to bring design and implementation closer.
          </p>
        </div>

        <div className="sm:justify-self-end">
          <p className="text-[13px] uppercase tracking-[0.06em] text-[color:var(--text-dim)]">Links</p>
          <ul className="mt-3 space-y-2 text-[15px]">
            {LINKS.map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-[color:var(--text-dim)] transition-colors hover:text-[color:var(--text)]"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-[color:var(--text-dim)] transition-colors hover:text-[color:var(--text)]"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px]">
          <a
            href={`mailto:${site.email}`}
            className="text-[color:var(--text)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
          >
            {site.email}
          </a>
          {site.links.linkedin && (
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
            >
              LinkedIn
            </a>
          )}
        </div>
        <p className="text-[12px] text-[color:var(--text-dim)]">
          &copy; {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
