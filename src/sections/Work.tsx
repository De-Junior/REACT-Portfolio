import { ArrowLink } from '../components/Links';
import { SectionHeading } from '../components/SectionHeading';
import { featured, type FeaturedProject } from '../content/projects';

function ProjectCard({ project, wide }: { project: FeaturedProject; wide: boolean }) {
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className={`group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition-[box-shadow,border-color] duration-200 hover:border-line-strong hover:shadow-md ${
        wide ? 'lg:col-span-2 lg:flex-row' : ''
      }`}
      data-reveal
    >
      <div
        className={`overflow-hidden border-b border-line ${wide ? 'lg:w-[46%] lg:shrink-0 lg:border-r lg:border-b-0' : ''} ${
          project.fit === 'contain' ? 'bg-routeclub-tint' : 'bg-subtle'
        }`}
      >
        <img
          src={project.image}
          alt={project.alt}
          loading="lazy"
          decoding="async"
          className={`w-full ${wide ? 'aspect-[16/10] lg:h-full lg:aspect-auto' : 'aspect-[16/10]'} ${
            project.fit === 'contain' ? 'object-contain py-3' : 'object-cover object-left-top'
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="label">{project.kind}</p>
        <h3 id={`${project.id}-title`} className="mt-2 text-[1.5rem] leading-tight font-semibold tracking-[-0.01em]">
          {project.name}
        </h3>
        <p className="mt-1 text-[0.9375rem] text-ink">{project.tagline}</p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.name} technology stack`}>
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-md border border-line bg-subtle px-2 py-1 font-mono text-[0.75rem] text-body">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-[0.9375rem]">
          {project.links.map((link) => (
            <ArrowLink key={link.href} href={link.href}>
              {link.label}
              <span className="sr-only">: {project.name}</span>
            </ArrowLink>
          ))}
          {project.note && <span className="text-[0.8125rem] text-muted">{project.note}</span>}
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section aria-labelledby="work" className="page py-20 md:py-28">
      <SectionHeading id="work" marker="Projects" title="Featured projects">
        <p>
          RouteClub is a product I run through my company. TeamFlow and Staybnb are personal projects, each with a live
          version you can try.
        </p>
      </SectionHeading>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {featured.map((project, index) => (
          <ProjectCard key={project.id} project={project} wide={index >= 2} />
        ))}
      </div>
    </section>
  );
}
