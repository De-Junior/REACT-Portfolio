import React from 'react';

import { TiltCard } from '../components/TiltCard';
import type { DesignToken } from '../types';

export const DesignSystem: React.FC = () => {
  const tokens: DesignToken[] = [
    {
      name: '--accent',
      value: '#c4450c / #ffb74d',
      desc: 'Primary brand colour, adapts per theme.',
    },
    {
      name: '--font-heading',
      value: 'Indie Flower / Caveat',
      desc: 'Handwritten display font, switched per theme.',
    },
    {
      name: '--surface',
      value: '#fffcf3 / #3a3a3a',
      desc: 'Card background 1 step lighter than --bg.',
    },
    {
      name: '--transition',
      value: '0.3s cubic-bezier(…)',
      desc: 'Global easing applied to all state changes.',
    },
  ];

  return (
    <section
      className="design-system-section"
      aria-labelledby="ds-heading"
      style={{ padding: '100px 32px', background: 'var(--surface-alt)' }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)', fontSize: '1rem' }}>
            🎨 design system
          </span>
          <h2
            id="ds-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              marginTop: 8,
            }}
          >
            The sketchbook that built this page
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 500, margin: '16px auto 0' }}>
            Every torn edge, sticky note, and push-pin is a reusable component backed by design
            tokens. Because design scales when you think in patterns.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
          <TiltCard className="torn-paper" style={{ padding: 24, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 12 }}>
              Torn Paper
            </h3>
            <code
              style={{
                display: 'block',
                background: 'var(--surface-alt)',
                padding: 10,
                borderRadius: 4,
                fontSize: '0.75rem',
                marginBottom: 12,
                textAlign: 'left',
              }}
            >
              {'<TiltCard className="torn-paper">'}
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Base card with torn edge and 3D tilt on hover.
            </p>
          </TiltCard>

          <div className="sticky-note" style={{ padding: 24, textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 12 }}>
              Sticky Note
            </h3>
            <code
              style={{
                display: 'block',
                background: 'var(--surface-alt)',
                padding: 10,
                borderRadius: 4,
                fontSize: '0.75rem',
                marginBottom: 12,
                textAlign: 'left',
              }}
            >
              {'<div className="sticky-note">'}
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Playful note with spring rotation on hover.
            </p>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: 24,
              border: '2px dashed var(--border)',
              borderRadius: 12,
            }}
          >
            <div className="push-pin" style={{ margin: '0 auto 16px' }} aria-hidden="true" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 12 }}>
              Push Pin
            </h3>
            <code
              style={{
                display: 'block',
                background: 'var(--surface-alt)',
                padding: 10,
                borderRadius: 4,
                fontSize: '0.75rem',
                marginBottom: 12,
                textAlign: 'left',
              }}
            >
              {'<div className="push-pin" />'}
            </code>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Decorative pin. Also hides the Easter egg.
            </p>
          </div>
        </div>

        <TiltCard className="torn-paper" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: 16 }}>
            Design tokens
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px dashed var(--border)' }}>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '6px 8px',
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--text-muted)',
                  }}
                >
                  Token
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '6px 8px',
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--text-muted)',
                  }}
                >
                  Value (paper / chalk)
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '6px 8px',
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--text-muted)',
                  }}
                >
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((t, i) => (
                <tr
                  key={t.name}
                  style={{
                    borderBottom: i < tokens.length - 1 ? '1px dashed var(--border)' : 'none',
                  }}
                >
                  <td
                    style={{
                      padding: '8px',
                      fontFamily: 'monospace',
                      color: 'var(--accent)',
                      fontSize: '0.8rem',
                    }}
                  >
                    {t.name}
                  </td>
                  <td style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {t.value}
                  </td>
                  <td style={{ padding: '8px', color: 'var(--text)' }}>{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TiltCard>
      </div>
    </section>
  );
};
