import { useState, type FormEvent } from 'react';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? 'xvzvwodd';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const fieldClass =
  'w-full rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none';

/** Sends a message through Formspree. Built on fetch so the site needs no form library. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-xl border border-line bg-surface p-6">
        <p className="font-medium text-ink">Message sent.</p>
        <p className="mt-1.5 text-[0.9375rem]">Thanks for getting in touch. I’ll reply to the address you gave.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.875rem] font-medium text-ink">Name</span>
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.875rem] font-medium text-ink">Email</span>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-[0.875rem] font-medium text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          minLength={10}
          placeholder="The role or project, and how to reach you"
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-11 items-center rounded-lg bg-ink px-5 text-[0.9375rem] font-medium text-canvas transition-colors hover:bg-ink/85 disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status === 'error' && (
          <p role="alert" className="text-[0.875rem] text-danger">
            The message didn’t send. Please try again, or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
