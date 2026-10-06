import React, { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

import { GithubIcon, LinkedinIcon } from '../components/BrandIcons';
import { TiltCard } from '../components/TiltCard';
import { FORMSPREE_ID, GITHUB_USERNAME } from '../config';
import { useTheme } from '../theme/useTheme';
import type { ContactItem } from '../types';

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  marginTop: 6,
  background: 'var(--surface)',
  border: '2px dashed var(--border)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  color: 'var(--text)',
  borderRadius: '4px',
  outline: 'none',
};

export const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const { theme } = useTheme();

  const contactItems: ContactItem[] = [
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      val: 'Hlungwane.james.junior@gmail.com',
      href: 'mailto:Hlungwane.james.junior@gmail.com',
    },
    {
      icon: <Phone size={18} aria-hidden="true" />,
      label: 'Phone',
      val: '072 476 4574',
      href: 'tel:+27724764574',
    },
    {
      icon: <GithubIcon />,
      label: 'GitHub',
      val: `github.com/${GITHUB_USERNAME}`,
      href: `https://github.com/${GITHUB_USERNAME}`,
    },
    {
      icon: <LinkedinIcon />,
      label: 'LinkedIn',
      val: 'linkedin.com/in/james-junior-hlungwane',
      href: 'https://www.linkedin.com/in/james-junior-hlungwane-4307aa1a0',
    },
    {
      icon: (
        <span style={{ fontSize: '1.2rem' }} aria-hidden="true">
          📍
        </span>
      ),
      label: 'Location',
      val: 'Pretoria, South Africa (willing to relocate)',
      href: '',
    },
  ];

  const hasErrors = state.errors && Array.isArray(state.errors) && state.errors.length > 0;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
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
            ✉️ drop a note
          </span>
          <h2
            id="contact-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--text)',
            }}
          >
            Let's <span style={{ color: 'var(--accent)' }}>sketch</span> something together.
          </h2>
        </div>

        <div
          className="contact-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
              }}
            >
              Have a project idea or a role I'd be a fit for? My inbox is always open.
            </p>
            {contactItems.map((c) => (
              <TiltCard
                key={c.label}
                className="torn-paper"
                style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14 }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{c.icon}</span>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{ fontWeight: 600, color: 'var(--text)' }}
                    >
                      {c.val}
                    </a>
                  ) : (
                    <div style={{ fontWeight: 600 }}>{c.val}</div>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>

          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="torn-paper"
              role="alert"
              style={{ padding: 40, textAlign: 'center' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: 12 }} aria-hidden="true">
                ✉️
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  fontWeight: 700,
                }}
              >
                Note received!
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                I'll reply as soon as I can.
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="torn-paper"
              noValidate
              style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                background: theme === 'paper' ? '#fffef9' : 'var(--surface)',
              }}
            >
              {hasErrors && (
                <div
                  role="alert"
                  style={{
                    padding: '10px 14px',
                    background: 'rgba(196,69,12,0.1)',
                    border: '1px solid var(--accent)',
                    borderRadius: 4,
                    fontSize: '0.9rem',
                    color: 'var(--accent)',
                  }}
                >
                  Something went wrong. Please try again.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.8rem',
                      display: 'block',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: '0.8rem',
                      display: 'block',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    autoComplete="email"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.8rem',
                    display: 'block',
                  }}
                >
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What's this about?"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.8rem',
                    display: 'block',
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me everything…"
                  style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-busy={state.submitting}
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '1rem',
                  background: 'var(--accent)',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '2px',
                  cursor: state.submitting ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  opacity: state.submitting ? 0.7 : 1,
                }}
              >
                {state.submitting ? (
                  'Sending…'
                ) : (
                  <>
                    <Send size={16} aria-hidden="true" /> Send note
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};
