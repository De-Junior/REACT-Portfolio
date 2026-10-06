import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sunrise, MoonStar } from 'lucide-react';

import { navItems } from '../config';
import { useTheme } from '../theme/useTheme';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDoodle, setShowDoodle] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          padding: scrolled ? '12px 32px' : '24px 48px',
          background: scrolled
            ? theme === 'paper'
              ? 'rgba(250,246,237,0.95)'
              : 'rgba(44,44,44,0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '2px dashed var(--border)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--accent)',
              lineHeight: 1,
            }}
          >
            JJ.
          </motion.a>
          <motion.button
            onClick={() => setShowDoodle(!showDoodle)}
            className="push-pin"
            aria-label={showDoodle ? 'Hide secret message' : 'Reveal secret message'}
            aria-expanded={showDoodle ? 'true' : 'false'}
            style={{
              cursor: 'pointer',
              border: 'none',
              background: 'var(--accent)',
              width: 14,
              height: 14,
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
            whileHover={{ scale: 1.3, rotate: 15 }}
          />
        </div>

        <nav className="desktop-nav" aria-label="Main navigation" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -3 }}
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: '0.95rem',
                color: 'var(--text)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ rotate: 10, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={theme === 'paper' ? 'Switch to chalkboard theme' : 'Switch to paper theme'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text)',
              padding: 6,
            }}
          >
            {theme === 'paper' ? <MoonStar size={22} /> : <Sunrise size={22} />}
          </motion.button>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen ? 'true' : 'false'}
          aria-controls="mobile-menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
          }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.header>

      {/* Easter egg */}
      <AnimatePresence>
        {showDoodle && (
          <motion.div
            role="status"
            aria-live="polite"
            className="easter-egg-bubble"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 2000,
              background: 'var(--surface)',
              padding: 20,
              borderRadius: 8,
              boxShadow: 'var(--shadow-lg)',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              maxWidth: 250,
              textAlign: 'center',
              border: '2px dashed var(--accent)',
            }}
          >
            <span style={{ fontSize: '2rem', display: 'block' }}>🐛</span>
            "The best code is written with a pencil."
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.4)',
                zIndex: 599,
              }}
              aria-hidden="true"
            />
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '75%',
                maxWidth: 300,
                background: 'var(--surface)',
                zIndex: 600,
                padding: '100px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                borderLeft: '2px dashed var(--border)',
              }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  whileHover={{ x: 10 }}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    color: 'var(--text)',
                  }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                whileHover={{ x: 10 }}
                aria-label={theme === 'paper' ? 'Switch to chalkboard' : 'Switch to paper'}
                style={{
                  marginTop: 20,
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.4rem',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                {theme === 'paper' ? '🌙 Chalkboard' : '📜 Paper'}
              </motion.button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
