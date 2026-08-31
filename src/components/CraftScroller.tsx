"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionIcon from "@/components/SectionIcon";

/**
 * Horizontal, manually-scrolled row for the craft section. No autoplay.
 * A right-pointing arrow in the header signals scrollability and, on click,
 * nudges the row rightward; it dims once the end is reached.
 */
export default function CraftScroller({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 8);
    setAtEnd(el.scrollLeft >= max - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const nudge = () => {
    ref.current?.scrollBy({ left: ref.current.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="section-head !mb-0">
          <SectionIcon />
          <span className="t-label">{label}</span>
        </div>

        <button
          type="button"
          onClick={nudge}
          aria-label="Scroll right"
          className={`flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--ink)] text-[color:var(--ink)] transition-all duration-300 hover:bg-[color:var(--ink)] hover:text-[color:var(--bg)] ${
            !scrollable || atEnd ? "pointer-events-none opacity-25" : "opacity-100"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative">
        <div ref={ref} onScroll={update} className="h-scroll">
          {children}
        </div>
        {/* right-edge fade hint, fades out at the end */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[color:var(--bg)] to-transparent transition-opacity duration-300 ${
            !scrollable || atEnd ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
