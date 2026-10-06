import type { Decision } from '../content/projects';

/** Numbered engineering decisions, the core of each case study. */
export function DecisionList({ decisions, columns = 2 }: { decisions: Decision[]; columns?: 1 | 2 }) {
  return (
    <ol className={`grid gap-x-10 gap-y-8 ${columns === 2 ? 'md:grid-cols-2' : ''}`}>
      {decisions.map(({ title, body }, index) => (
        <li key={title} className="grid grid-cols-[2rem_1fr] gap-3" data-reveal>
          <span className="font-mono text-[0.8125rem] leading-7 text-muted tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h5 className="text-[1.0625rem] leading-7 font-medium">{title}</h5>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
