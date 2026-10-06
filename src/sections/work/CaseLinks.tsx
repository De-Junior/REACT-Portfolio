import { ArrowLink } from '../../components/Links';
import type { CaseStudy } from '../../content/projects';

export function CaseLinks({ project }: { project: CaseStudy }) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {project.links.map((link) => (
        <ArrowLink key={link.href} href={link.href}>
          {link.label}
        </ArrowLink>
      ))}
      {project.sourceNote && <p className="w-full text-[0.875rem] text-muted sm:w-auto">{project.sourceNote}</p>}
    </div>
  );
}
