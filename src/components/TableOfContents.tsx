"use client";

import { useEffect, useState } from "react";

/**
 * "On this page" sidebar. Scroll-spies the page's section elements (by id) and
 * highlights the one currently in view. Hidden below lg (the page is a single
 * column on smaller screens).
 */
export default function TableOfContents({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8">
        <p className="t-meta mb-4">On this page</p>
        <ul className="border-l border-[color:var(--hairline)]">
          {sections.map((s) => {
            const on = active === s.id;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={on ? "true" : undefined}
                  className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                    on
                      ? "border-[color:var(--text)] text-[color:var(--text)]"
                      : "border-transparent text-[color:var(--text-dim)] hover:text-[color:var(--text)]"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
