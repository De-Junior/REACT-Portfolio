/** A phone outline around an app screenshot. Images are lazy-loaded and sized to avoid layout shift. */
export function PhoneFrame({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`rounded-[2rem] bg-[#0b0b0d] p-1.5 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] ring-1 ring-black/10 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={640}
        height={1385}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-[1.6rem]"
      />
    </div>
  );
}

/** A minimal browser window around a web app screenshot. */
export function BrowserFrame({
  src,
  alt,
  address,
  className = '',
}: {
  src: string;
  alt: string;
  address: string;
  className?: string;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="truncate font-mono text-[0.6875rem] text-muted">{address}</span>
      </div>
      <img src={src} alt={alt} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
    </figure>
  );
}
