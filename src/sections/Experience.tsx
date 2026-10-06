import { SectionHeading } from '../components/SectionHeading';
import { education, roles } from '../content/career';

export function Experience() {
  return (
    <section aria-labelledby="experience" className="page py-20 md:py-28">
      <SectionHeading id="experience" marker="Experience" title="Where the experience comes from" />

      <ol className="mt-16 divide-y divide-line border-y border-line">
        {roles.map((role) => (
          <li key={role.organisation} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10" data-reveal>
            <p className="font-mono text-[0.8125rem] text-muted tabular-nums md:col-span-3 md:pt-1">{role.period}</p>
            <div className="md:col-span-9">
              <h3 className="text-[1.1875rem] leading-snug font-medium">
                {role.title}
                <span className="text-muted"> · {role.organisation}</span>
              </h3>
              <p className="mt-2 max-w-[62ch] text-[0.9375rem] leading-relaxed">{role.summary}</p>
              <ul className="mt-4 max-w-[66ch] space-y-2">
                {role.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-5 text-[0.9375rem] leading-relaxed">
                    <span className="absolute top-[0.7em] left-0 h-px w-2.5 bg-line-strong" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8" data-reveal>
        <h3 className="label md:col-span-3 md:pt-1">Education</h3>
        <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9">
          {education.map((item) => (
            <li key={item.name}>
              <p className="text-[1rem] font-medium text-ink">{item.name}</p>
              <p className="mt-1 text-[0.9375rem]">
                {item.detail}
                <span className="text-muted"> · {item.year}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
