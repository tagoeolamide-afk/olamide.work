import Link from "next/link";
import Image from "next/image";
import type { WorkCard as WorkCardType } from "@/content/site";
import { assetExists } from "@/lib/assets";

/**
 * Card used by both "Selected work" and "For the love of design": 16:10 media
 * (sharp corners), then title + one-line descriptor. Media placeholder is a
 * labelled frame until the export lands. Cards with an `href` are links; cards
 * without one render as a plain figure.
 */
export default function WorkCard({ card }: { card: WorkCardType }) {
  const hasVideo = !!card.video && assetExists(card.video);
  const hasThumb = assetExists(card.thumb);

  const media = (
    <div className="card-media">
      {hasVideo ? (
        // Video replaces the thumbnail: muted, looped, autoplay (native — works
        // on mobile with playsInline). The static thumb is the poster/fallback.
        <video
          className="absolute inset-0 h-full w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hasThumb ? card.thumb : undefined}
          aria-label={card.title}
        >
          <source src={card.video} type="video/mp4" />
        </video>
      ) : hasThumb ? (
        // Explicit dimensions (not `fill`) so the loader never race-picks an
        // oversized candidate before grid layout settles. object-contain fits
        // the whole frame into the 16:10 card without cropping.
        <Image
          src={card.thumb}
          alt={card.title}
          width={880}
          height={550}
          sizes="(max-width: 34rem) 90vw, 440px"
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <div className="placeholder flex h-full w-full flex-col justify-end p-4">
          <span className="t-meta">Thumbnail</span>
          <span className="mt-1 font-[family-name:var(--font-mono)] text-[11px] text-[color:var(--muted)]">
            {card.thumb.replace(/^\//, "public/")}
          </span>
        </div>
      )}
    </div>
  );

  const body = (
    <>
      {media}
      <h3 className="t-card-title mt-[9px]">{card.title}</h3>
      <p className="t-card-desc mt-1">{card.descriptor}</p>
      {card.tags && card.tags.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {card.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[color:var(--hairline)] px-2 py-0.5 text-[11px] text-[color:var(--muted)]"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </>
  );

  return card.href ? (
    <Link href={card.href} className="card group block">
      {body}
    </Link>
  ) : (
    <div className="card block">{body}</div>
  );
}
