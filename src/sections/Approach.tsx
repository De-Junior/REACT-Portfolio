import { SectionHeading } from '../components/SectionHeading';
import { principles } from '../content/career';

export function Approach() {
  return (
    <section aria-labelledby="approach" className="border-y border-line bg-surface">
      <div className="page py-20 md:py-28">
        <SectionHeading id="approach" marker="Approach" title="How I make engineering decisions">
          <p>Each principle points to where it shows up in the work above.</p>
        </SectionHeading>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <li key={principle.title} className="flex flex-col bg-surface p-6 md:p-7" data-reveal>
              <h3 className="text-[1.0625rem] leading-snug font-medium">{principle.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{principle.body}</p>
              <p className="mt-auto pt-6 font-mono text-[0.75rem] leading-snug text-muted">{principle.evidence}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
