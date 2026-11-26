import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../content/profile';

export function About() {
  return (
    <section aria-labelledby="about" className="border-t border-line bg-surface">
      <div className="page py-20 md:py-28">
        <SectionHeading id="about" marker="About" title="Engineer first, product-minded throughout" />

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-8" data-reveal>
          <div className="md:col-span-3">
            <img
              src={profile.photo}
              alt={profile.name}
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
              className="size-24 rounded-xl object-cover ring-1 ring-line"
            />
          </div>
          <div className="max-w-[62ch] space-y-5 text-[1.0625rem] leading-relaxed md:col-span-9">
            <p>
              I’m an IT graduate and junior full-stack and React Native developer based in Giyani. In 2026 I registered
              Route Technologies and built RouteClub on my own, from the mobile app to the API, database and admin
              dashboard. It’s live on Google Play and the App Store, and building it taught me most of what I know about
              payments, data integrity and keeping software running.
            </p>
            <p>
              I do my best work where product and infrastructure meet: modelling a domain carefully, designing the API
              around it, and making sure the system behaves when an integration doesn’t. I’m looking for a junior
              full-stack or React Native role on a team that ships reliable software and reviews its work closely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
