import { ContactForm } from '../components/ContactForm';
import { CopyEmail } from '../components/CopyEmail';
import { ArrowLink } from '../components/Links';
import { profile } from '../content/profile';

export function Contact() {
  return (
    <section aria-labelledby="contact" className="border-t border-line">
      <div className="page grid gap-16 py-20 md:py-28 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6" data-reveal>
          <p className="label">Contact</p>
          <h2 id="contact" className="mt-5 text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] md:text-[2.5rem]">
            Hiring for a full‑stack role? I’d like to hear about it.
          </h2>
          <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed">
            I’m open to full-stack engineering roles in South Africa or remote. Email is the quickest way to reach me.
          </p>

          <div className="mt-10">
            <CopyEmail email={profile.email} />
          </div>

          <dl className="mt-10 grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 text-[0.9375rem]">
            <dt className="label pt-1">Phone</dt>
            <dd>
              <a href={profile.phone.href} className="inline-flex min-h-6 items-center text-ink hover:underline">
                {profile.phone.display}
              </a>
            </dd>
            <dt className="label pt-1">Elsewhere</dt>
            <dd className="flex flex-wrap gap-x-6 gap-y-2">
              <ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink>
              <ArrowLink href={profile.github}>GitHub</ArrowLink>
            </dd>
            <dt className="label pt-1">CV</dt>
            <dd>
              <a
                href={profile.cv}
                download
                className="inline-flex min-h-6 items-center text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
              >
                Download PDF
              </a>
            </dd>
          </dl>
        </div>

        <div className="lg:col-span-6 lg:pt-14" data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
