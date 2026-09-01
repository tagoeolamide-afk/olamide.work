"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Click-to-view lightbox. Wraps a subtree and, via event delegation, opens any
 * element marked with `data-zoom` (using the image inside it) in a subtle
 * full-screen overlay with a cancel button top-right. Close with the ×, a click
 * on the backdrop, or Escape.
 */
export default function Lightbox({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);
  const close = useCallback(() => setActive(null), []);

  const activate = useCallback((e: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in e && e.key !== "Enter" && e.key !== " ") return;
    const trigger = (e.target as HTMLElement).closest("[data-zoom]");
    if (!trigger) return;
    const img = trigger.querySelector("img");
    if (!img) return;
    e.preventDefault();
    setActive({ src: img.currentSrc || img.src, alt: img.alt });
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, close]);

  return (
    <div onClick={activate} onKeyDown={activate}>
      {children}

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="fixed right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.src}
            alt={active.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-[var(--radius)] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
