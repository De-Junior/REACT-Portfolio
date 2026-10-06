import type { Theme } from '../types';

export const getGlobalCSS = (theme: Theme): string => `
  :root {
    --font-heading: ${theme === 'paper' ? "'Indie Flower', cursive" : "'Caveat', cursive"};
    --font-body:    ${theme === 'paper' ? "'Nunito', sans-serif" : "'Caveat', cursive"};
    --font-accent:  'Permanent Marker', cursive;

    --bg:          ${theme === 'paper' ? '#faf6ed' : '#2c2c2c'};
    --surface:     ${theme === 'paper' ? '#fffcf3' : '#3a3a3a'};
    --surface-alt: ${theme === 'paper' ? '#f5f0e6' : '#464646'};
    --border:      ${theme === 'paper' ? 'rgba(180,160,140,0.6)' : 'rgba(255,255,255,0.12)'};
    --text:        ${theme === 'paper' ? '#3a3226' : '#e8e4dc'};
    --text-muted:  ${theme === 'paper' ? '#7a6e5d' : '#b8b2a6'};
    --accent:      ${theme === 'paper' ? '#c4450c' : '#ffb74d'};
    --accent2:     ${theme === 'paper' ? '#2e7d32' : '#81c784'};
    --accent3:     ${theme === 'paper' ? '#0277bd' : '#64b5f6'};
    --shadow:      ${theme === 'paper' ? '0 4px 12px rgba(0,0,0,0.06)' : '0 4px 12px rgba(0,0,0,0.3)'};
    --shadow-lg:   ${theme === 'paper' ? '0 20px 40px rgba(0,0,0,0.12)' : '0 20px 40px rgba(0,0,0,0.5)'};
    --card-border: ${theme === 'paper' ? '2px solid rgba(139,115,85,0.4)' : '2px solid rgba(255,255,255,0.2)'};
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }

  .skip-link {
    position: fixed; top: -100px; left: 16px; z-index: 99999;
    background: var(--accent); color: #fff; padding: 10px 20px;
    border-radius: 4px; font-family: var(--font-accent); font-size: 1rem;
    transition: top 0.2s;
    text-decoration: none;
  }
  .skip-link:focus { top: 16px; outline: 3px solid #fff; outline-offset: 2px; }

  body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    transition: background-color var(--transition), color var(--transition);
    line-height: 1.6;
  }
  a { text-decoration: none; color: inherit; }

  :focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
    border-radius: 2px;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--surface-alt); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; border: 2px solid var(--surface-alt); }

  .torn-paper {
    position: relative;
    background: var(--surface);
    border: var(--card-border);
    border-radius: 1px 20px 1px 20px / 4px 20px 4px 20px;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.05), -2px -2px 0 rgba(0,0,0,0.05);
    transition: transform 0.15s ease-out;
  }
  .torn-paper::before {
    content: '';
    position: absolute;
    top: -3px; left: -3px; right: -3px; bottom: -3px;
    border: 2px dashed rgba(139,115,85,0.25);
    border-radius: 4px 22px 4px 22px / 7px 22px 7px 22px;
    pointer-events: none;
    z-index: -1;
  }
  .sticky-note {
    background: ${theme === 'paper' ? '#fff9c4' : '#5a5040'};
    padding: 14px 18px;
    box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
    transform: rotate(-1deg);
    font-family: var(--font-accent);
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .sticky-note:hover, .sticky-note:focus-visible { transform: rotate(0deg) scale(1.03); }
  .push-pin {
    width: 14px; height: 14px; background: var(--accent); border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: inline-block;
  }
  .hand-drawn-line {
    width: 100%; height: 2px;
    background: repeating-linear-gradient(to right, var(--accent) 0px, var(--accent) 6px, transparent 6px, transparent 10px);
  }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0;
    margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
    html { scroll-behavior: auto; }
  }

  @media print {
    body { background: white !important; color: black !important; }
    .skip-link, .scroll-progress-bar, header, .doodle-cursor,
    .sticky-note, .push-pin, .hand-drawn-line,
    .easter-egg-bubble, .github-stats-section, .design-system-section { display: none !important; }
    .torn-paper { border: 1px solid #ccc !important; box-shadow: none !important; }
  }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    section { padding: 80px 20px !important; }
    .hero-grid, .about-grid, .skills-grid, .projects-grid, .contact-grid {
      grid-template-columns: 1fr !important;
    }
    .highlights-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }
`;
