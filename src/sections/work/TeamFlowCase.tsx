import { DecisionList } from '../../components/DecisionList';
import { BrowserFrame } from '../../components/Frames';
import { teamFlow } from '../../content/projects';
import { CaseHeader } from './CaseHeader';
import { CaseLinks } from './CaseLinks';

export function TeamFlowCase() {
  return (
    <article aria-labelledby="teamflow-title" className="space-y-16 md:space-y-20">
      <CaseHeader project={teamFlow} index={2} />

      <div className="relative rounded-2xl bg-teamflow-tint px-4 pt-8 pb-8 sm:px-8 md:px-12 md:pt-12 md:pb-24" data-reveal>
        <BrowserFrame
          src="/work/teamflow/kanban.webp"
          alt="TeamFlow project board with tasks in Backlog, To do, In progress and Review columns"
          address="teamflow-rosy-three.vercel.app/projects"
          className="md:w-[82%]"
        />
        <img
          src="/work/teamflow/task-modal.webp"
          alt="A TeamFlow task open on its comments tab"
          width={894}
          height={516}
          loading="lazy"
          decoding="async"
          className="absolute right-10 bottom-10 hidden w-[44%] rounded-xl border border-line shadow-[0_30px_60px_-24px_rgba(15,23,42,0.4)] md:block lg:right-12"
        />
      </div>

      <section aria-labelledby="teamflow-decisions" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h4 id="teamflow-decisions" className="label lg:col-span-3 lg:pt-1.5" data-reveal>
          Engineering decisions
        </h4>
        <div className="space-y-10 lg:col-span-9">
          <DecisionList decisions={teamFlow.decisions} />
          <CaseLinks project={teamFlow} />
        </div>
      </section>
    </article>
  );
}
