import { SectionHeading } from '../components/SectionHeading';
import { capabilities } from '../content/career';

export function Stack() {
  return (
    <section aria-labelledby="stack" className="page pb-20 md:pb-28">
      <SectionHeading id="stack" marker="Stack" title="Tools I use, and where I’ve used them">
        <p>Grouped by what they’re for. Everything listed is used in the projects above.</p>
      </SectionHeading>

      <dl className="mt-16 grid gap-x-12 border-t border-line md:grid-cols-2">
        {capabilities.map(({ area, tools, usedIn }) => (
          <div key={area} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-6" data-reveal>
            <dt className="label pt-1">{area}</dt>
            <dd>
              <p className="text-[1rem] leading-snug text-ink">{tools}</p>
              <p className="mt-1.5 text-[0.8125rem] text-muted">{usedIn}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
