import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { useTheme } from '../theme/useTheme';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const { theme } = useTheme();
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="home"
      ref={containerRef}
      aria-label="Introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div style={{ y, maxWidth: 1100, width: '100%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
          {/* Polaroid photo */}
          <motion.div
            initial={{ rotate: -4, scale: 0.9, opacity: 0 }}
            animate={{ rotate: -2, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            style={{
              background: theme === 'paper' ? '#fff' : '#555',
              padding: '16px 16px 40px 16px',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.15)',
              border: theme === 'paper' ? '1px solid #ccc' : '1px solid #888',
              borderRadius: '2px',
              display: 'inline-block',
              maxWidth: 260,
            }}
          >
            {!imgError ? (
              <img
                src={`${import.meta.env.BASE_URL}james-hlungwane.jpg`}
                alt="James Junior Hlungwane, Full-Stack Software Engineer"
                loading="eager"
                width={228}
                height={228}
                onError={() => setImgError(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: theme === 'chalkboard' ? 'grayscale(0.5) contrast(1.2)' : 'none',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  color: '#fff',
                }}
              >
                JH
              </div>
            )}
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                marginTop: 12,
                color: theme === 'paper' ? '#222' : '#eee',
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              James Junior
              <br />
              Hlungwane
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.8rem, 7vw, 5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--text)',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            Full‑Stack Software Engineer
            <br />
            <span style={{ color: 'var(--accent)' }}>who ships</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              maxWidth: 600,
            }}
          >
            I build production systems that improve page load by 23% and reduce frontend defects by
            15%. Currently crafting full-stack platforms with Next.js, TypeScript, and
            PostgreSQL.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              className="sticky-note"
              style={{ color: 'var(--text)', fontWeight: 600, borderRadius: '2px' }}
            >
              📓 See my work
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              className="sticky-note"
              style={{ color: 'var(--text)', fontWeight: 600, borderRadius: '2px' }}
            >
              ✉️ Let's talk
            </motion.a>
            <motion.a
              href="/James-Junior-Hlungwane-CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              className="sticky-note"
              style={{
                background: 'var(--accent3)',
                color: '#fff',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              📥 Download CV
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ marginTop: 60 }}
        >
          <a
            href="#about"
            aria-label="Scroll to About section"
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-accent)',
            }}
          >
            <span>scroll</span>
            <ChevronDown size={18} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
