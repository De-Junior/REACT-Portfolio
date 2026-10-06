import React from 'react';

import { TiltCard } from '../components/TiltCard';
import { skillsData } from '../data/skills';

export const Skills: React.FC = () => (
  <section
    id="skills"
    aria-labelledby="skills-heading"
    style={{ padding: '120px 32px', background: 'var(--bg)' }}
  >
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: 60 }}>
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '1rem',
            color: 'var(--accent)',
            display: 'block',
            marginBottom: 8,
          }}
        >
          🛠️ tools of the trade
        </span>
        <h2
          id="skills-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          My <span style={{ color: 'var(--accent)' }}>sketchbook</span> of skills.
        </h2>
      </div>
      <div
        className="skills-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
      >
        {skillsData.map((skill) => (
          <TiltCard
            key={skill.title}
            className="torn-paper"
            style={{ padding: '22px 18px 18px', position: 'relative' }}
          >
            <div
              style={{ position: 'absolute', top: -8, right: -4 }}
              className="push-pin"
              aria-hidden="true"
            />
            <div style={{ fontSize: '2rem', marginBottom: 12 }} aria-hidden="true">
              {skill.icon}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: 12,
                color: 'var(--text)',
              }}
            >
              {skill.title}
            </h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0 }}>
              {skill.tags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '3px 10px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--text)',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);
