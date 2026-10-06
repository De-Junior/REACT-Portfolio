import React, { useState } from 'react';

const journalEntries: string[] = [
  "Today I finally understood Prisma migrations. It's like giving a version history to your database.",
  "Debugged a hydration error in Next.js for two hours. The fix was a missing useEffect.",
  "Learned that Tailwind's group-hover can solve 90% of my UI interaction needs.",
  "Built a full REST API in 45 minutes using Next.js Route Handlers. Progress!",
  "Started reading about server components — the future of React is wild.",
  "Added a tiny easter egg to my portfolio. Hope someone finds it.",
  "Wrote my first unit test with Jest. It failed for 10 minutes, then it was a missing mock.",
];

export const JournalEntry: React.FC = () => {
  const [randomEntry] = useState(
    () => journalEntries[Math.floor(Math.random() * journalEntries.length)]
  );
  return (
    <section
      aria-label="Notebook entry"
      style={{ padding: '60px 32px', background: 'var(--bg)' }}
    >
      <div
        className="torn-paper"
        style={{ maxWidth: 550, margin: '0 auto', padding: 24, textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            color: 'var(--accent)',
            marginBottom: 8,
          }}
        >
          📝 From my notebook
        </div>
        <blockquote>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--text)',
            }}
          >
            "{randomEntry}"
          </p>
        </blockquote>
      </div>
    </section>
  );
};
