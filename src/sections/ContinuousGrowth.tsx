import React from 'react';

export const ContinuousGrowth: React.FC = () => (
  <section
    aria-label="Currently exploring"
    style={{ padding: '60px 32px', background: 'var(--surface-alt)' }}
  >
    <div
      className="sticky-note"
      style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: 28 }}
    >
      <span style={{ fontSize: '2rem' }} aria-hidden="true">
        🔍
      </span>
      <h3 style={{ fontFamily: 'var(--font-heading)', margin: '8px 0', fontSize: '1.5rem' }}>
        Always Exploring
      </h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontStyle: 'italic' }}>
        Because great engineers never stop tinkering.
      </p>
      <ul
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {['Next.js App Router', 'Prisma ORM', 'Supabase', 'Distributed Systems'].map((t) => (
          <li
            key={t}
            style={{
              background: 'var(--surface)',
              padding: '4px 12px',
              borderRadius: '2px',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.9rem',
              border: '1px solid var(--border)',
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
