import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

import { GITHUB_USERNAME } from '../config';
import { GithubIcon, LinkedinIcon } from './BrandIcons';

export const Footer: React.FC = () => (
  <footer
    style={{
      background: 'var(--bg)',
      borderTop: '2px dashed var(--border)',
      padding: '48px 32px',
      textAlign: 'center',
    }}
  >
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <div
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--accent)',
        }}
      >
        James Junior Hlungwane
      </div>
      <p
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: '0.9rem',
          color: 'var(--text-muted)',
          marginTop: 8,
        }}
      >
        building robust systems with clean code & careful craft.
      </p>
      <nav
        aria-label="Social links"
        style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28 }}
      >
        {[
          { href: `https://github.com/${GITHUB_USERNAME}`, label: 'GitHub profile', icon: <GithubIcon /> },
          {
            href: 'https://www.linkedin.com/in/james-junior-hlungwane-4307aa1a0',
            label: 'LinkedIn profile',
            icon: <LinkedinIcon />,
          },
          { href: 'mailto:Hlungwane.james.junior@gmail.com', label: 'Send email', icon: <Mail size={20} aria-hidden="true" /> },
          { href: 'tel:+27724764574', label: 'Call phone number', icon: <Phone size={20} aria-hidden="true" /> },
        ].map(({ href, label, icon }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={label}
            whileHover={{ y: -4 }}
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed var(--border)',
              borderRadius: '50%',
              color: 'var(--text)',
            }}
          >
            {icon}
          </motion.a>
        ))}
      </nav>
      <p
        style={{
          marginTop: 24,
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-accent)',
        }}
      >
        © {new Date().getFullYear()} James Junior Hlungwane · Pretoria, ZA
      </p>
    </div>
  </footer>
);
