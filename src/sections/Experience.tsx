import React from 'react';
import { motion } from 'framer-motion';

import { experiencesData } from '../data/experience';

export const Experience: React.FC = () => (
  <section
    id="experience"
    aria-labelledby="experience-heading"
    style={{ padding: '120px 32px', background: 'var(--surface-alt)' }}
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
          📅 the journey so far
        </span>
        <h2
          id="experience-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          Experience & <span style={{ color: 'var(--accent)' }}>education</span>.
        </h2>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 28,
            top: 0,
            bottom: 0,
            width: 0,
            borderLeft: '3px dashed var(--accent)',
          }}
        />

        <ol style={{ listStyle: 'none', padding: 0 }}>
          {experiencesData.map((exp, i) => (
            <motion.li
              key={exp.role}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 24,
                marginBottom: 48,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'var(--surface)',
                  border: '3px dashed var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                }}
                aria-hidden="true"
              >
                {exp.icon}
              </div>
              <motion.div
                whileHover={{ borderColor: 'var(--accent)' }}
                className="torn-paper"
                style={{ padding: 24 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    marginBottom: 8,
                  }}
                >
                  {exp.date}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700 }}>
                  {exp.role}
                </h3>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    marginBottom: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span className="hand-drawn-line" style={{ width: 30 }} aria-hidden="true" />
                  {exp.company}
                </div>
                <p style={{ color: 'var(--text)', lineHeight: 1.7 }}>{exp.desc}</p>
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);
