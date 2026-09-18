"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Light-bulb theme toggle. Reads the current theme from <html data-theme>
 * (set pre-paint by the inline script in the layout), flips to the opposite,
 * and remembers the choice. The bulb shows "on" (glowing, with rays) in light
 * mode and "off" (dim outline) in dark mode.
 */
export default function ThemeToggle() {
  // Start on "dark" to match the server-rendered default (avoids hydration
  // mismatch); the effect syncs to the real theme right after mount.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  const isLight = theme === "light";
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isLight}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--glass-border)] bg-[color:var(--glass-bg)] text-[color:var(--text)] backdrop-blur-xl transition-colors hover:bg-[color:var(--glass-bg-active)]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {/* rays — only when the lights are on (light mode) */}
        {isLight && (
          <g stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 1.5v1.6M4.4 4.4l1.1 1.1M1.5 12h1.6M18.5 5.5l1.1-1.1M20.9 12h1.6" />
          </g>
        )}
        {/* bulb glass — glows in light mode, dim outline in dark mode */}
        <path
          d="M12 4a6 6 0 0 0-3.8 10.6c.7.6 1.1 1.2 1.2 2.4h5.2c.1-1.2.5-1.8 1.2-2.4A6 6 0 0 0 12 4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill={isLight ? "var(--accent)" : "none"}
          fillOpacity={isLight ? 0.18 : 0}
          opacity={isLight ? 1 : 0.7}
        />
        {/* base / screw */}
        <path
          d="M9.5 19.5h5M10.5 22h3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity={isLight ? 1 : 0.7}
        />
      </svg>
    </button>
  );
}
