import { SectionHeading } from '../components/SectionHeading';
import { OtherWork } from './work/OtherWork';
import { RouteClubCase } from './work/RouteClubCase';
import { TeamFlowCase } from './work/TeamFlowCase';

export function Work() {
  return (
    <section aria-labelledby="work" className="page py-20 md:py-28">
      <SectionHeading id="work" marker="Selected work" title="Products I designed and built end to end">
        <p>
          RouteClub is a product I run as a business. TeamFlow is a personal project built to the same standard, with a live
          version you can try.
        </p>
      </SectionHeading>

      <div className="mt-20 space-y-28 md:mt-24 md:space-y-36">
        <RouteClubCase />
        <TeamFlowCase />
        <OtherWork />
      </div>
    </section>
  );
}
