import { ArrowLink } from '../../components/Links';
import { otherWork } from '../../content/projects';

export function OtherWork() {
  return (
    <section aria-labelledby="other-work" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <h3 id="other-work" className="label lg:col-span-3 lg:pt-6" data-reveal>
        Also built
      </h3>
      <ul className="divide-y divide-line border-y border-line lg:col-span-9">
        {otherWork.map((item) => (
          <li key={item.name} className="grid gap-3 py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8" data-reveal>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[1.0625rem] font-medium text-ink">{item.name}</span>
                <span className="font-mono text-[0.75rem] text-muted">{item.stack}</span>
              </p>
              <p className="mt-1.5 max-w-[60ch] text-[0.9375rem] leading-relaxed">{item.description}</p>
            </div>
            <div className="flex gap-6 text-[0.9375rem]">
              {item.links.map((link) => (
                <ArrowLink key={link.href} href={link.href}>
                  {link.label}
                  <span className="sr-only">: {item.name}</span>
                </ArrowLink>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
