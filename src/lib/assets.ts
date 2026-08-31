import fs from "node:fs";
import path from "node:path";

/**
 * Build-time check for whether a /public asset actually exists on disk.
 * Lets <Figure> render a designed placeholder instead of a broken <img>
 * for image slots that haven't been exported from Figma yet.
 *
 * Runs only in Server Components / build — never shipped to the client.
 */
export function assetExists(publicPath: string): boolean {
  if (!publicPath) return false;
  const rel = publicPath.replace(/^\//, "");
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i;

/**
 * Behance-style frame stack: list the ordered image frames for a case study.
 * Drop numbered files (01.png, 02.png, …) into public/images/<slug>/frames/
 * and they render in natural sort order — no code change per frame.
 */
export function listFrames(slug: string): { src: string; name: string }[] {
  const dir = path.join(process.cwd(), "public", "images", slug, "frames");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
      .map((f) => ({ src: `/images/${slug}/frames/${f}`, name: f }));
  } catch {
    return [];
  }
}
