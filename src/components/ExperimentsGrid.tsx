"use client";

import { useCallback, useEffect, useState } from "react";

export type ExpItem = {
  slug: string;
  title: string;
  description: string;
  liveUrl?: string;
  tools: string[];
  thumb: string;
  video: string | null;
};

/** Tool chip: official SVG from /public/icons/<name>.svg, text label as fallback. */
function ToolIcon({ name }: { name: string }) {
  const [failed, setFailed] = useState(false);
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  if (failed) {
    return (
      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[12px] text-[color:var(--text-dim)]">
        {label}
      </span>
    );
  }
  return (
    <span
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/icons/${name}.svg`}
        alt={label}
        width={18}
        height={18}
        className="h-[18px] w-[18px]"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export default function ExperimentsGrid({ items }: { items: ExpItem[] }) {
  const [active, setActive] = useState<ExpItem | null>(null);

  const open = useCallback((it: ExpItem) => {
    setActive(it);
    try {
      window.history.pushState({ p: it.slug }, "", `?p=${it.slug}`);
    } catch {}
  }, []);

  const close = useCallback(() => {
    setActive(null);
    try {
      if (new URLSearchParams(window.location.search).has("p")) {
        window.history.pushState({}, "", window.location.pathname);
      }
    } catch {}
  }, []);

  // Deep-link on mount + sync with the Back button.
  useEffect(() => {
    const openFromUrl = () => {
      const p = new URLSearchParams(window.location.search).get("p");
      setActive(p ? items.find((i) => i.slug === p) ?? null : null);
    };
    openFromUrl();
    window.addEventListener("popstate", openFromUrl);
    return () => window.removeEventListener("popstate", openFromUrl);
  }, [items]);

  // Esc to close + lock scroll while open.
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
    <>
      {/* Masonry (CSS columns): 2 on mobile, 3 on desktop */}
      <div className="columns-2 gap-4 md:columns-3">
        {items.map((it) => (
          <button
            key={it.slug}
            type="button"
            onClick={() => open(it)}
            aria-label={`Open ${it.title}`}
            className="group mb-4 block w-full break-inside-avoid text-left"
          >
            <div className="overflow-hidden rounded-xl border border-[color:var(--hairline)] bg-[color:var(--surface)]">
              {it.video ? (
                <video
                  className="block w-full"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={it.thumb}
                >
                  <source src={it.video} type="video/mp4" />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.thumb}
                  alt={it.title}
                  loading="lazy"
                  className="block w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              )}
            </div>
            <p className="mt-2 px-0.5 text-[14px] text-[color:var(--text)]">{it.title}</p>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-auto w-full max-w-[640px] rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--surface)] p-4 sm:p-6"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>

            {/* Hero / video, plain rounded frame */}
            <div className="overflow-hidden rounded-xl border border-[color:var(--hairline)] bg-[color:var(--bg)]">
              {active.video ? (
                <video className="block w-full" autoPlay muted loop playsInline poster={active.thumb}>
                  <source src={active.video} type="video/mp4" />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.thumb} alt={active.title} className="block w-full" />
              )}
            </div>

            <h3 className="mt-5 text-[1.375rem] font-semibold tracking-[-0.02em]">{active.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--text-dim)]">
              {active.description}
            </p>

            {active.tools.length > 0 && (
              <div className="mt-5">
                <p className="text-[12px] uppercase tracking-[0.06em] text-[color:var(--text-dim)]">Tools</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {active.tools.map((t) => (
                    <ToolIcon key={t} name={t} />
                  ))}
                </div>
              </div>
            )}

            {active.liveUrl && (
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[color:var(--text)] px-5 py-2.5 text-[14px] font-medium text-[color:var(--bg)] transition-opacity hover:opacity-85"
              >
                View live <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
