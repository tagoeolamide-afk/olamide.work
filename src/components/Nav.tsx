"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";
import ThemeToggle from "@/components/ThemeToggle";

const TABS: [string, string][] = [
  ["Projects", "/"],
  ["Experiments", "/experiments"],
];

/** Avatar logo (desktop only): official photo at /images/avatar.jpg, initials fallback. */
function Logo() {
  const [failed, setFailed] = useState(false);
  const name = site.name.replace(/\.$/, "");
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href="/"
      aria-label="Home"
      className="absolute left-0 top-1/2 hidden -translate-y-1/2 sm:block"
    >
      <span className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface)] transition-opacity hover:opacity-80">
        {failed ? (
          <span className="text-[14px] font-medium text-[color:var(--text-dim)]">{initials}</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/avatar.jpg"
            alt={name}
            width={50}
            height={50}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </span>
    </Link>
  );
}

/**
 * Nav: avatar logo pinned left on desktop, centered glass pill tabs.
 * "Projects" is home. Active tab is a raised pill; the rest brighten on hover.
 */
export default function Nav() {
  const path = usePathname();

  return (
    <nav className="relative flex justify-center py-6">
      <Logo />
      <ul className="inline-flex items-center gap-0.5 rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] p-1 shadow-[var(--glass-shadow)] backdrop-blur-xl">
        {TABS.map(([label, href]) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`inline-block rounded-full px-4 py-1.5 text-[14px] transition-colors ${
                  active
                    ? "bg-[color:var(--glass-bg-active)] text-[color:var(--text)]"
                    : "text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Theme toggle pinned right, mirroring the logo on the left */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <ThemeToggle />
      </div>
    </nav>
  );
}
