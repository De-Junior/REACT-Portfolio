import { FactList } from '../../components/FactList';
import type { CaseStudy } from '../../content/projects';

/** Title, positioning and metadata shared by every case study. */
export function CaseHeader({ project, index }: { project: CaseStudy; index: number }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12" data-reveal>
      <div className="lg:col-span-7">
        <p className="label">
          {String(index).padStart(2, '0')} · {project.kind}
        </p>
        <h3 id={`${project.id}-title`} className="mt-4 text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.035em] md:text-[3rem]">
          {project.name}
        </h3>
        <p className="mt-3 text-[1.1875rem] leading-snug tracking-[-0.01em] text-ink md:text-[1.25rem]">{project.tagline}</p>
        <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed">{project.summary}</p>
      </div>
      <FactList facts={project.facts} className="self-end lg:col-span-5" />
    </div>
  );
}
