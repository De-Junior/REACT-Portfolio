import { DecisionList } from '../../components/DecisionList';
import { FactList } from '../../components/FactList';
import { PhoneFrame } from '../../components/Frames';
import { RouteClubArchitecture } from '../../components/RouteClubArchitecture';
import { routeClub } from '../../content/projects';
import { CaseHeader } from './CaseHeader';
import { CaseLinks } from './CaseLinks';

const screens = [
  { src: '/work/routeclub/search-results.webp', alt: 'RouteClub search results for Giyani to Johannesburg, showing a trip with its fare, driver rating and seats left' },
  { src: '/work/routeclub/post-trip.webp', alt: 'Posting a trip with two pickup points, Malamulele and Giyani, and Pretoria as the destination' },
  { src: '/work/routeclub/waitlist.webp', alt: 'The waiting list, telling a rider a matching trip is now available' },
];

export function RouteClubCase() {
  return (
    <article aria-labelledby="routeclub-title" className="space-y-16 md:space-y-20">
      <CaseHeader project={routeClub} index={1} />

      <figure className="overflow-hidden rounded-2xl bg-routeclub-tint" data-reveal>
        {/* On phones the outer screens bleed off the edges so the centre one can stay legible. */}
        <div className="flex justify-center gap-3 pt-8 sm:gap-6 sm:px-6 sm:pt-10 md:gap-10 md:px-10 md:pt-14">
          {screens.map((screen, i) => (
            <PhoneFrame
              key={screen.src}
              src={screen.src}
              alt={screen.alt}
              className={`w-[46%] shrink-0 sm:w-[30%] sm:max-w-[15rem] ${
                i === 1 ? '-mb-8 md:-mb-16' : 'mt-8 -mb-20 md:mt-12 md:-mb-32'
              }`}
            />
          ))}
        </div>
        <figcaption className="relative border-t border-routeclub/10 bg-routeclub-tint px-6 py-4 text-[0.8125rem] text-muted md:px-10">
          Screens from the Android app, captured with demo accounts.
        </figcaption>
      </figure>

      <section aria-labelledby="routeclub-built" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h4 id="routeclub-built" className="label lg:col-span-3 lg:pt-1.5" data-reveal>
          What I built
        </h4>
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-9">
          {routeClub.parts.map((part) => (
            <li key={part.title} data-reveal>
              <h5 className="text-[1.0625rem] font-medium text-ink">{part.title}</h5>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{part.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="routeclub-architecture" className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <h4 id="routeclub-architecture" className="label lg:col-span-3 lg:pt-1.5" data-reveal>
          Architecture
        </h4>
        <div className="lg:col-span-9">
          <RouteClubArchitecture />
        </div>
      </section>

      <section aria-labelledby="routeclub-decisions" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <h4 id="routeclub-decisions" className="label lg:col-span-3 lg:pt-1.5" data-reveal>
          Engineering decisions
        </h4>
        <div className="lg:col-span-9">
          <DecisionList decisions={routeClub.decisions} />
        </div>
      </section>

      <section aria-labelledby="routeclub-status" className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <h4 id="routeclub-status" className="label lg:col-span-3 lg:pt-3.5" data-reveal>
          Where it stands
        </h4>
        <div className="space-y-8 lg:col-span-9" data-reveal>
          <FactList facts={routeClub.status} />
          <CaseLinks project={routeClub} />
        </div>
      </section>
    </article>
  );
}
