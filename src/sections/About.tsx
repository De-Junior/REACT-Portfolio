import React from 'react';

import { TiltCard } from '../components/TiltCard';
import { GITHUB_USERNAME } from '../config';
import type { InfoItem, StatItem } from '../types';

export const About: React.FC = () => {
  const stats: StatItem[] = [
    { num: 9, label: 'Months Experience', icon: '💼' },
    { num: 23, label: '% Page Load Improvement', icon: '⚡' },
    { num: 15, label: '% Defect Reduction', icon: '🐞' },
    { num: 2, label: 'SaaS Platforms Shipped', icon: '🚀' },
  ];

  const infoItems: InfoItem[] = [
    { icon: '🎓', label: 'Education', val: 'Diploma in IT NQF6' },
    { icon: '📍', label: 'Location', val: 'Pretoria, South Africa (willing to relocate)' },
    { icon: '✉️', label: 'Email', val: 'Hlungwane.james.junior@gmail.com', href: 'mailto:Hlungwane.james.junior@gmail.com' },
    { icon: '📞', label: 'Phone', val: '072 476 4574', href: 'tel:+27724764574' },
    { icon: '🐙', label: 'GitHub', val: `github.com/${GITHUB_USERNAME}`, href: `https://github.com/${GITHUB_USERNAME}` },
    { icon: '🔗', label: 'LinkedIn', val: 'linkedin.com/in/james-junior-hlungwane', href: 'https://www.linkedin.com/in/james-junior-hlungwane-4307aa1a0' },
    { icon: '🚀', label: 'Status', val: 'Open to junior full-stack roles', accent: true },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      style={{ padding: '120px 32px', background: 'var(--surface-alt)', position: 'relative' }}
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
            ✦ a little about me
          </span>
          <h2
            id="about-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--text)',
            }}
          >
            From a first computer at 7
            <br />
            to shipping <span style={{ color: 'var(--accent)' }}>production SaaS</span>.
          </h2>
        </div>

        <div
          className="about-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <TiltCard className="torn-paper" style={{ padding: 28 }}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text)',
                }}
              >
                Junior Full‑Stack Software Engineer with proven experience shipping production
                web apps using React, Next.js, TypeScript, and PostgreSQL.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'var(--text-muted)',
                  marginTop: 16,
                }}
              >
                At Sima Digital Agencies I improved page load times by 23% and reduced frontend
                defect rates by 15% in an Agile team. I independently built and deployed two live
                SaaS platforms. Looking for a junior full‑stack role to grow across the entire web
                stack.
              </p>
            </TiltCard>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {stats.map((s) => (
                <TiltCard
                  key={s.label}
                  className="sticky-note"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px' }}
                >
                  <span style={{ fontSize: '1.5rem' }} aria-hidden="true">
                    {s.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                      }}
                    >
                      {s.num}
                      {s.label.includes('%') ? '%' : '+'}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {s.label}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {infoItems.map((item) => (
              <TiltCard
                key={item.label}
                className="torn-paper"
                style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <span style={{ fontSize: '1.4rem' }} aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--accent3)',
                        textDecoration: 'underline',
                      }}
                    >
                      {item.val}
                    </a>
                  ) : (
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: item.accent ? 'var(--accent3)' : 'var(--text)',
                      }}
                    >
                      {item.val}
                    </div>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
