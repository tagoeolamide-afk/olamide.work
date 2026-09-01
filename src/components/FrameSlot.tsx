import { assetExists } from "@/lib/assets";

/**
 * A single image slot. Renders the real image once a file exists at `src`;
 * until then, a labelled dashed placeholder shows what belongs there and the
 * exact path to drop it. Used across the Authentication Audit case study.
 */
export default function FrameSlot({
  src,
  alt,
  ratio = "16 / 10",
  label,
}: {
  src: string;
  alt: string;
  ratio?: string;
  /** small caption above the frame, e.g. "Before" / "After" */
  label?: string;
}) {
  const has = assetExists(src);
  return (
    <figure className="w-full">
      {label && <figcaption className="t-meta mb-2">{label}</figcaption>}
      {has ? (
        // Fixed-ratio frame + object-contain: images fit the frame with no crop
        // and no distortion, and before/after pairs line up at equal height.
        <div
          className="overflow-hidden rounded-[var(--radius)] border border-[color:var(--hairline)] bg-[#f2f2f2]"
          style={{ aspectRatio: ratio }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" className="h-full w-full object-contain" />
        </div>
      ) : (
        <div
          className="flex flex-col justify-end gap-2 rounded-[var(--radius)] border border-dashed border-[color:var(--hairline)] bg-[#f2f2f2] p-5"
          style={{ aspectRatio: ratio }}
        >
          <span className="t-meta">Image slot{label ? ` · ${label}` : ""}</span>
          <p className="max-w-[46ch] text-[13px] leading-snug text-[color:var(--muted)]">
            {alt}
          </p>
          <code className="font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--muted)]">
            {src.replace(/^\//, "public/")}
          </code>
        </div>
      )}
    </figure>
  );
}
