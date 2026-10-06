import React from 'react';

import { TiltCard } from '../components/TiltCard';

export const Highlights: React.FC = () => {
  const items = [
    { emoji: '⚡', metric: '-23%', label: 'Page Load Time', detail: 'Across core application routes at Sima Digital.' },
    { emoji: '🐞', metric: '-15%', label: 'Defect Rate', detail: 'Frontend bugs resolved in Agile sprints.' },
    { emoji: '📦', metric: '2', label: 'SaaS Platforms', detail: 'Independently built & deployed to production.' },
    { emoji: '📊', metric: '5M', label: 'Data Points', detail: 'Processed & visualised in volunteer work.' },
  ];

  return (
    <section
      aria-labelledby="highlights-heading"
      style={{ padding: '0 32px 80px', background: 'var(--surface-alt)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)', fontSize: '1rem' }}>
            ✦ proven impact
          </span>
          <h2
            id="highlights-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              marginTop: 8,
            }}
          >
            Numbers don't lie
          </h2>
        </div>
        <div
          className="highlights-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
        >
          {items.map((i) => (
            <TiltCard key={i.label} className="torn-paper" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }} aria-hidden="true">
                {i.emoji}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {i.metric}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{i.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.detail}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
