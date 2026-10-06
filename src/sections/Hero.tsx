import { ArrowLink, ButtonLink } from '../components/Links';
import { profile, summary } from '../content/profile';

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="page grid gap-14 pt-16 pb-12 md:pt-24 md:pb-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7" data-reveal>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.8125rem] text-body">
          <span className="size-2 rounded-full bg-positive ring-4 ring-positive/15" aria-hidden="true" />
          {profile.availability}
        </p>

        <h1 id="hero-title" className="mt-8 text-[2.625rem] leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem] xl:text-[3.75rem]">
          {profile.name}
          <span className="block text-muted">{profile.role}</span>
        </h1>

        <p className="mt-8 max-w-[38ch] text-[1.25rem] leading-snug tracking-[-0.01em] text-ink md:text-[1.375rem]">
          I build complete products, from the mobile app down to the database rules that keep its data correct.
        </p>
        <p className="mt-4 max-w-[56ch] text-[1.0625rem] leading-relaxed">
          Most recently RouteClub: a ride-sharing platform with an Expo app, an Express and PostgreSQL API, Ozow payments
          and an operations console, which I run through my company, Route Technologies.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink href="#work" icon="arrowDown">
            Selected work
          </ButtonLink>
          <ButtonLink href={profile.cv} variant="secondary" icon="download" download>
            Download CV
          </ButtonLink>
        </div>

        <div className="mt-8 flex gap-6 text-[0.9375rem]">
          <ArrowLink href={profile.github}>GitHub</ArrowLink>
          <ArrowLink href={profile.linkedin}>LinkedIn</ArrowLink>
        </div>
      </div>

      <aside aria-label="Summary" className="lg:col-span-5 lg:pt-3" data-reveal>
        <div className="rounded-xl border border-line bg-surface">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <p className="label">At a glance</p>
            <p className="font-mono text-[0.75rem] text-muted">{profile.location}</p>
          </div>
          <dl className="divide-y divide-line">
            {summary.map(({ label, value }) => (
              <div key={label} className="grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5">
                <dt className="label pt-0.5">{label}</dt>
                <dd className="text-[0.9375rem] leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </section>
  );
}
