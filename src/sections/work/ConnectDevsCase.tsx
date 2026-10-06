import { DecisionList } from '../../components/DecisionList';
import { connectDevs } from '../../content/projects';
import { CaseHeader } from './CaseHeader';
import { CaseLinks } from './CaseLinks';

export function ConnectDevsCase() {
  return (
    <article aria-labelledby="connectdevs-title" className="space-y-16 md:space-y-20">
      <CaseHeader project={connectDevs} index={3} />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <figure className="self-start overflow-hidden rounded-2xl bg-connectdevs-tint p-3 sm:p-4 lg:col-span-7" data-reveal>
          <img
            src="/work/connectdevs/projects.webp"
            alt="ConnectDevs project discovery, with each project's status and technology tags"
            width={1440}
            height={900}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-lg ring-1 ring-white/10"
          />
          <figcaption className="px-1 pt-3.5 pb-0.5 text-[0.8125rem] text-white/55">Project discovery.</figcaption>
        </figure>

        <section aria-labelledby="connectdevs-decisions" className="space-y-8 lg:col-span-5">
          <h4 id="connectdevs-decisions" className="label" data-reveal>
            Engineering decisions
          </h4>
          <DecisionList decisions={connectDevs.decisions} columns={1} />
          <CaseLinks project={connectDevs} />
        </section>
      </div>
    </article>
  );
}
