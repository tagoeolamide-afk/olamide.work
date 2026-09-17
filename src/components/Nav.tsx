"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS: [string, string][] = [
  ["Projects", "/"],
  ["Experiments", "/experiments"],
  ["About", "/about"],
];

/**
 * Centered glass pill tab-bar. "Projects" is home. Active tab is a raised pill;
 * the rest are dim and brighten on hover.
 */
export default function Nav() {
  const path = usePathname();

  return (
    <nav className="flex justify-center py-6">
      <ul className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.06] p-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        {TABS.map(([label, href]) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-block rounded-full px-4 py-1.5 text-[14px] transition-colors ${
                  active
                    ? "bg-white/10 text-[color:var(--text)]"
                    : "text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
