import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { GithubIcon } from '../components/BrandIcons';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { projectsData } from '../data/projects';
import { GITHUB_USERNAME } from '../config';

const FlipbookProject: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  const flip = useCallback(
    (dir: number) => {
      setCurrentIndex((prev) => {
        const next = prev + dir;
        if (next < 0 || next >= projectsData.length) return prev;
        setDirection(dir);
        return next;
      });
    },
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') flip(1);
      if (e.key === 'ArrowLeft') flip(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isInView, flip]);

  const project = projectsData[currentIndex];

  return (
    <div ref={sectionRef} style={{ maxWidth: 700, margin: '0 auto', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => flip(-1)}
          disabled={currentIndex === 0}
          aria-label="Previous project"
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-accent)',
            fontSize: '1.5rem',
            color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--accent)',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ← Previous
        </button>
        <span
          role="status"
          aria-live="polite"
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '1rem',
            color: 'var(--text-muted)',
          }}
        >
          {currentIndex + 1} / {projectsData.length}
        </span>
        <button
          onClick={() => flip(1)}
          disabled={currentIndex === projectsData.length - 1}
          aria-label="Next project"
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-accent)',
            fontSize: '1.5rem',
            color: currentIndex === projectsData.length - 1 ? 'var(--text-muted)' : 'var(--accent)',
            cursor: currentIndex === projectsData.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Next →
        </button>
      </div>

      <p
        style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-accent)',
          marginBottom: 12,
        }}
      >
        Tip: use ← → arrow keys to navigate
      </p>

      <div style={{ perspective: '1200px' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.article
            key={currentIndex}
            custom={direction}
            initial={{ rotateY: direction === 1 ? 90 : -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction === 1 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="torn-paper"
            aria-label={`Project ${currentIndex + 1} of ${projectsData.length}: ${project.title}`}
            style={{
              padding: 30,
              transformOrigin: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '3.5rem',
                marginBottom: 16,
                background: 'var(--surface-alt)',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                border: '2px dashed var(--border)',
              }}
              aria-hidden="true"
            >
              {project.icon}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              {project.title}
            </h3>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: 12 }}>
              {project.desc}
            </p>
            <div
              className="hand-drawn-line"
              style={{ width: '80%', marginBottom: 16 }}
              aria-hidden="true"
            />
            <p
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.9rem',
                color: 'var(--accent2)',
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              <strong>Architecture:</strong> {project.architecture}
            </p>
            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                marginBottom: 20,
                justifyContent: 'center',
                listStyle: 'none',
                padding: 0,
              }}
            >
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    background: 'var(--surface-alt)',
                    padding: '3px 10px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.8rem',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 20 }}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-accent)',
                  fontWeight: 600,
                }}
                aria-label={`Live demo of ${project.title} (opens in new tab)`}
              >
                Live Demo <ExternalLink size={14} />
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--text)',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 600,
                  }}
                  aria-label={`Source code for ${project.title} on GitHub (opens in new tab)`}
                >
                  <GithubIcon /> Code
                </a>
              )}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => (
  <section
    id="projects"
    aria-labelledby="projects-heading"
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
          📓 recent builds
        </span>
        <h2
          id="projects-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          Things I've <span style={{ color: 'var(--accent)' }}>doodled</span> into existence.
        </h2>
      </div>
      <ErrorBoundary>
        <FlipbookProject />
      </ErrorBoundary>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginTop: 40 }}
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'var(--font-accent)',
            color: 'var(--accent3)',
            fontSize: '1.1rem',
            textDecoration: 'underline',
          }}
        >
          …and more doodles on GitHub ↗
        </a>
      </motion.p>
    </div>
  </section>
);
