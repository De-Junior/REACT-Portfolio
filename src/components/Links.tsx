import type { ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

const isExternal = (href: string) => /^https?:\/\//.test(href);

const buttonBase =
  'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[0.9375rem] font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px';

const buttonVariants = {
  primary: 'bg-ink text-canvas hover:bg-ink/85',
  secondary: 'border border-line-strong text-ink hover:border-ink/40 hover:bg-subtle',
} as const;

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  icon,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  icon?: IconName;
  download?: boolean;
}) {
  return (
    <a href={href} download={download} className={`${buttonBase} ${buttonVariants[variant]}`}>
      {children}
      {icon && <Icon name={icon} />}
    </a>
  );
}

/** An inline link with an arrow; external links open in a new tab and say so to screen readers. */
export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  const external = isExternal(href);
  return (
    <a
      href={href}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      className={`group inline-flex min-h-6 items-center gap-1 py-0.5 font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-4 transition-colors hover:decoration-ink ${className}`}
    >
      {children}
      <Icon
        name="arrowUpRight"
        className="size-3.5 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
      />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
