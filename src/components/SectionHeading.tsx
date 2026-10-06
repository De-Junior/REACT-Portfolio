import type { ReactNode } from 'react';

/** The marker, title and optional intro that open every main section. */
export function SectionHeading({
  id,
  marker,
  title,
  children,
}: {
  id: string;
  marker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="grid gap-5 md:grid-cols-12 md:gap-8" data-reveal>
      <p className="label md:col-span-3 md:pt-2">{marker}</p>
      <div className="md:col-span-9">
        <h2 id={id} className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
          {title}
        </h2>
        {children && <div className="mt-4 max-w-[60ch] text-[1.0625rem] leading-relaxed">{children}</div>}
      </div>
    </header>
  );
}
