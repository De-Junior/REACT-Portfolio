import { useEffect, useState } from 'react';
import { Icon } from './Icon';

/** The email address as a mailto link, with a button that copies it and confirms. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be denied; the mailto link still works.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <a
        href={`mailto:${email}`}
        className="text-[1.25rem] font-medium tracking-[-0.01em] break-all text-ink underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-ink md:text-[1.5rem]"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line px-3 text-[0.8125rem] text-body transition-colors hover:border-line-strong hover:text-ink"
      >
        <Icon name={copied ? 'check' : 'copy'} className="size-3.5" />
        {copied ? 'Copied' : 'Copy'}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </div>
  );
}
