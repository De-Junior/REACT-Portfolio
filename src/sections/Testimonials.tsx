import React from 'react';

import { TiltCard } from '../components/TiltCard';

export const Testimonials: React.FC = () => (
  <section
    aria-labelledby="testimonials-heading"
    style={{ padding: '60px 32px', background: 'var(--surface-alt)' }}
  >
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)' }}>
        🗣️ trusted by
      </span>
      <h2 id="testimonials-heading" className="sr-only">
        Testimonials
      </h2>
      <TiltCard className="torn-paper" style={{ padding: 28, marginTop: 20 }}>
        <blockquote>
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontSize: '1.1rem' }}>
            "James brings the precision of a senior engineer and the curiosity of a builder a rare
            combination."
          </p>
          <footer style={{ marginTop: 16 }}>
            <div className="hand-drawn-line" style={{ marginBottom: 16 }} aria-hidden="true" />
            <cite style={{ fontFamily: 'var(--font-accent)', fontStyle: 'normal' }}>
              — Sima Digital Team Lead
            </cite>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
              (full reference available upon request)
            </p>
          </footer>
        </blockquote>
      </TiltCard>
    </div>
  </section>
);
