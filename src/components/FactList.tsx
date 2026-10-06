import type { Fact } from '../content/projects';

/** Label and value pairs separated by hairlines, used for project metadata and status. */
export function FactList({ facts, className = '' }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={`divide-y divide-line border-y border-line ${className}`}>
      {facts.map(({ label, value }) => (
        <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
          <dt className="label pt-0.5">{label}</dt>
          <dd className="text-[0.9375rem] text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
