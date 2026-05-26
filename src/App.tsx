// App.tsx — James Junior Hlungwane Portfolio
// "The Handcrafted Journal" — dual-theme notebook / chalkboard
// Converted to TypeScript with full type safety & lint fixes.

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  Component,
  type ReactNode,
  type CSSProperties,
} from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  AnimatePresence,
  type MotionStyle,
} from 'framer-motion';
import {
  Mail,
  Phone,
  Send,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Sunrise,
  MoonStar,
  RefreshCw,
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const GITHUB_USERNAME = 'De-Junior';
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID ?? 'xvzvwodd';

const navItems: string[] = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

// ─────────────────────────────────────────────
// TYPES & INTERFACES
// ─────────────────────────────────────────────
type Theme = 'paper' | 'chalkboard';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface GitHubStatsState {
  repos: number | null;
  stars: number | null;
  loading: boolean;
  error: boolean;
}

interface StatItem {
  num: number;
  label: string;
  icon: string;
}

interface InfoItem {
  icon: string;
  label: string;
  val: string;
  href?: string;
  accent?: boolean;
}

interface SkillCategory {
  icon: string;
  title: string;
  tags: string[];
}

interface ExperienceEntry {
  date: string;
  icon: string;
  role: string;
  company: string;
  desc: string;
}

interface Project {
  title: string;
  desc: string;
  icon: string;
  tags: string[];
  link: string;
  github?: string;
  architecture: string;
}

interface DesignToken {
  name: string;
  value: string;
  desc: string;
}

interface ContactItem {
  icon: ReactNode;
  label: string;
  val: string;
  href: string;
}

// ─────────────────────────────────────────────
// SEO META INJECTION
// ─────────────────────────────────────────────
function injectSEOMeta(): void {
  const metas: { property?: string; name?: string; content: string }[] = [
    { property: 'og:title', content: 'James Junior Hlungwane — Full-Stack Engineer' },
    {
      property: 'og:description',
      content:
        'Building production systems with React, Next.js, TypeScript & PostgreSQL. Open to junior full-stack roles.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://lh3.googleusercontent.com/a/ACg8ocLEnrWt-SqkzM5m2K2oJWA4VRT1y2VonXIn0PValfTuNE8dgtV3fw=s360-c-no' },
    {
      name: 'description',
      content: 'James Junior Hlungwane — Full-Stack Software Engineer based in Pretoria, South Africa.',
    },
    { name: 'theme-color', content: '#c4450c' },
  ];

  metas.forEach(({ property, name, content }) => {
    const existing = property
      ? document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
      : document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!existing) {
      const el = document.createElement('meta');
      if (property) el.setAttribute('property', property);
      if (name) el.setAttribute('name', name);
      el.setAttribute('content', content);
      document.head.appendChild(el);
    }
  });

  if (!document.querySelector('title')) {
    const t = document.createElement('title');
    t.textContent = 'James Junior Hlungwane — Full-Stack Engineer';
    document.head.appendChild(t);
  }
}

// ─────────────────────────────────────────────
// BRAND ICONS (inline SVG)
// ─────────────────────────────────────────────
const GithubIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ─────────────────────────────────────────────
// THEME CONTEXT
// ─────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

// ─────────────────────────────────────────────
// GLOBAL CSS HELPER
// ─────────────────────────────────────────────
const getGlobalCSS = (theme: Theme): string => `
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

// ─────────────────────────────────────────────
// ERROR BOUNDARY
// ─────────────────────────────────────────────
interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
}
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            textAlign: 'center',
            fontFamily: 'var(--font-accent)',
            color: 'var(--text-muted)',
            border: '2px dashed var(--border)',
            borderRadius: 8,
            margin: '0 32px',
          }}
        >
          <span style={{ fontSize: '2rem' }}>✏️</span>
          <p style={{ marginTop: 8 }}>This section had a hiccup. Refresh to try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────
// THEME PROVIDER
// ─────────────────────────────────────────────
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('jj-theme');
      return saved === 'paper' || saved === 'chalkboard' ? saved : 'paper';
    } catch {
      return 'paper';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jj-theme', theme);
    } catch {
      // silently ignore storage errors
    }
    let el = document.getElementById('jj-global-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'jj-global-styles';
      document.head.appendChild(el);
    }
    el.textContent = getGlobalCSS(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'paper' ? 'chalkboard' : 'paper'));
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// ─────────────────────────────────────────────
// TILT CARD
// ─────────────────────────────────────────────
const TiltCard: React.FC<TiltCardProps> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setTilt({
        x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4,
        y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 4,
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      } as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// CUSTOM CURSOR (RAF-throttled)
// ─────────────────────────────────────────────
const DoodleCursor: React.FC = () => {
  const isTouch: boolean =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const { theme } = useTheme();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springY = useSpring(y, { stiffness: 500, damping: 30 });

  useEffect(() => {
    if (isTouch) return;
    let raf: number | null = null;
    const move = (e: MouseEvent) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isTouch, x, y]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="doodle-cursor"
      style={
        {
          position: 'fixed',
          left: springX,
          top: springY,
          width: theme === 'paper' ? 18 : 14,
          height: theme === 'paper' ? 22 : 16,
          transform: 'translate(-4px, -2px) rotate(-10deg)',
          pointerEvents: 'none',
          zIndex: 10000,
          background:
            theme === 'paper'
              ? "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 18 22\"><path d=\"M16 0 L2 0 C1 0 0 1 0 2 L0 18 C0 19 1 20 2 20 L12 20 L18 14 L18 2 C18 1 17 0 16 0Z\" fill=\"%23c4450c\"/><path d=\"M12 14 L18 14 L12 20Z\" fill=\"%233a3226\"/></svg>') no-repeat center/contain"
              : "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\"><rect x=\"5\" y=\"12\" width=\"8\" height=\"3\" rx=\"1\" fill=\"%23ffb74d\"/><rect x=\"3\" y=\"2\" width=\"10\" height=\"8\" rx=\"1\" fill=\"%23e8e4dc\"/></svg>') no-repeat center/contain",
        } as MotionStyle
      }
    />
  );
};

// ─────────────────────────────────────────────
// SCROLL PROGRESS
// ─────────────────────────────────────────────
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();
  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress-bar"
      style={
        {
          position: 'fixed',
          top: 0,
          left: 0,
          height: 4,
          right: 0,
          background: theme === 'paper' ? 'var(--accent)' : 'var(--accent2)',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          zIndex: 10001,
          borderRadius: '0 0 4px 0',
        } as MotionStyle
      }
    />
  );
};

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const Navbar: React.FC = () => {
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

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero: React.FC = () => {
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
                src={`${import.meta.env.BASE_URL}650842716_2336185740234892_3403676168397416168_n (1).jpg`}
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
            I build production systems that reduce bugs by 20% and speed up data retrieval by
            30%. Currently crafting full-stack platforms with Next.js, TypeScript, and
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
              href="/JAMES_JUNIOR_HLUNGWANE_CV.pdf"
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

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
const About: React.FC = () => {
  const stats: StatItem[] = [
    { num: 9, label: 'Months Experience', icon: '💼' },
    { num: 20, label: '% UI Bug Reduction', icon: '🐞' },
    { num: 30, label: '% Query Improvement', icon: '⚡' },
    { num: 5, label: 'Volunteer Months', icon: '🤝' },
  ];

  const infoItems: InfoItem[] = [
    { icon: '🎓', label: 'Education', val: 'Diploma in IT NQF6 (Cum Laude)' },
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
            to <span style={{ color: 'var(--accent)' }}>Cum Laude</span> graduate.
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
                At Sima Digital Agencies I contributed to live features, reduced UI bugs by 20%,
                and optimised MySQL databases in an Agile team. I'm looking for a junior
                full-stack role where I can grow across the entire web stack.
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

// ─────────────────────────────────────────────
// HIGHLIGHTS
// ─────────────────────────────────────────────
const Highlights: React.FC = () => {
  const items = [
    { emoji: '🐞', metric: '-20%', label: 'UI Bug Reduction', detail: 'Across 3 active client projects at Sima Digital.' },
    { emoji: '⚡', metric: '-30%', label: 'Query Time', detail: 'Optimised MySQL queries for core workflows.' },
    { emoji: '📦', metric: '5+', label: 'Projects Shipped', detail: 'Including a full-stack developer platform.' },
    { emoji: '📊', metric: '5M', label: 'Data Points', detail: 'Processed & visualised during volunteer work.' },
  ];

  return (
    <section
      aria-labelledby="highlights-heading"
      style={{ padding: '0 32px 80px', background: 'var(--surface-alt)' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)', fontSize: '1rem' }}>
            ✦ proven impact
          </span>
          <h2
            id="highlights-heading"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              marginTop: 8,
            }}
          >
            Numbers don't lie
          </h2>
        </div>
        <div
          className="highlights-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
        >
          {items.map((i) => (
            <TiltCard key={i.label} className="torn-paper" style={{ padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }} aria-hidden="true">
                {i.emoji}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {i.metric}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{i.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{i.detail}</div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// GITHUB STATS (with error UI + retry)
// ─────────────────────────────────────────────
const GitHubStats: React.FC = () => {
  const [state, setState] = useState<GitHubStatsState>({
    repos: null,
    stars: null,
    loading: true,
    error: false,
  });

  const fetchStats = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Unexpected response');
      setState({
        repos: data.length,
        stars: data.reduce((acc: number, repo: { stargazers_count?: number }) => acc + (repo.stargazers_count || 0), 0),
        loading: false,
        error: false,
      });
    } catch {
      setState({ repos: null, stars: null, loading: false, error: true });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, [fetchStats]);

  return (
    <section
      className="github-stats-section"
      aria-labelledby="github-heading"
      style={{ padding: '60px 32px', background: 'var(--bg)' }}
    >
      <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)' }}>
          🐙 live from GitHub
        </span>
        <h2 id="github-heading" className="sr-only">
          GitHub statistics
        </h2>
        <TiltCard
          className="torn-paper"
          style={{
            padding: 24,
            marginTop: 16,
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            flexWrap: 'wrap',
            alignItems: 'center',
            minHeight: 80,
          }}
        >
          {state.loading && (
            <div
              style={{ fontFamily: 'var(--font-accent)', color: 'var(--text-muted)' }}
              aria-live="polite"
              aria-busy="true"
            >
              Loading stats…
            </div>
          )}
          {state.error && !state.loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
              aria-live="polite"
            >
              <span
                style={{
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.9rem',
                }}
              >
                Couldn't load stats.
              </span>
              <button
                onClick={fetchStats}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'none',
                  border: '1px dashed var(--border)',
                  borderRadius: 4,
                  padding: '4px 12px',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.85rem',
                }}
                aria-label="Retry loading GitHub stats"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          )}
          {!state.loading && !state.error && (
            <>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                  aria-label={`${state.repos} public repositories`}
                >
                  {state.repos}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Public Repos</div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                  aria-label={`${state.stars} total stars`}
                >
                  {state.stars}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Stars</div>
              </div>
            </>
          )}
        </TiltCard>
        <p
          style={{
            marginTop: 12,
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-accent)',
          }}
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--accent3)', textDecoration: 'underline' }}
          >
            View profile on GitHub ↗
          </a>
        </p>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────
const skillsData: SkillCategory[] = [
  {
    icon: '🌐',
    title: 'Web & Frameworks',
    tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    icon: '💻',
    title: 'Languages',
    tags: ['Python', 'Java', 'Node.js', 'PHP', 'SQL', 'C#'],
  },
  {
    icon: '🧱',
    title: 'Backend & DB',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'Prisma ORM', 'Supabase', 'REST APIs'],
  },
  {
    icon: '🛠️',
    title: 'Tools & Methods',
    tags: ['Git', 'Vercel', 'CI/CD', 'Jest', 'React Testing Library', 'Agile/Scrum'],
  },
  {
    icon: '📊',
    title: 'Data & Systems',
    tags: ['Excel', 'Kumu', 'SDLC', 'OOP', 'System Analysis'],
  },
  {
    icon: '🎓',
    title: 'Certifications',
    tags: ['FNB App Academy (Full-stack)', 'Cum Laude Diploma NQF6'],
  },
];

const Skills: React.FC = () => (
  <section
    id="skills"
    aria-labelledby="skills-heading"
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
          🛠️ tools of the trade
        </span>
        <h2
          id="skills-heading"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'var(--text)',
          }}
        >
          My <span style={{ color: 'var(--accent)' }}>sketchbook</span> of skills.
        </h2>
      </div>
      <div
        className="skills-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
      >
        {skillsData.map((skill) => (
          <TiltCard
            key={skill.title}
            className="torn-paper"
            style={{ padding: '22px 18px 18px', position: 'relative' }}
          >
            <div
              style={{ position: 'absolute', top: -8, right: -4 }}
              className="push-pin"
              aria-hidden="true"
            />
            <div style={{ fontSize: '2rem', marginBottom: 12 }} aria-hidden="true">
              {skill.icon}
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: 12,
                color: 'var(--text)',
              }}
            >
              {skill.title}
            </h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 6, listStyle: 'none', padding: 0 }}>
              {skill.tags.map((tag) => (
                <li
                  key={tag}
                  style={{
                    background: 'var(--surface-alt)',
                    border: '1px solid var(--border)',
                    borderRadius: '2px',
                    padding: '3px 10px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-accent)',
                    color: 'var(--text)',
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </TiltCard>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTINUOUS GROWTH
// ─────────────────────────────────────────────
const ContinuousGrowth: React.FC = () => (
  <section
    aria-label="Currently exploring"
    style={{ padding: '60px 32px', background: 'var(--surface-alt)' }}
  >
    <div
      className="sticky-note"
      style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: 28 }}
    >
      <span style={{ fontSize: '2rem' }} aria-hidden="true">
        🔍
      </span>
      <h3 style={{ fontFamily: 'var(--font-heading)', margin: '8px 0', fontSize: '1.5rem' }}>
        Always Exploring
      </h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: 16, fontStyle: 'italic' }}>
        Because great engineers never stop tinkering.
      </p>
      <ul
        style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {['Next.js App Router', 'Prisma ORM', 'Supabase', 'Distributed Systems'].map((t) => (
          <li
            key={t}
            style={{
              background: 'var(--surface)',
              padding: '4px 12px',
              borderRadius: '2px',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.9rem',
              border: '1px solid var(--border)',
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// EXPERIENCE — CSS timeline instead of SVG
// ─────────────────────────────────────────────
const experiencesData: ExperienceEntry[] = [
  {
    date: 'Apr 2025 – Dec 2025',
    icon: '💼',
    role: 'Software Developer Intern',
    company: 'Sima Digital Agencies',
    desc: 'Developed & maintained responsive web features. Reduced UI bugs by 20% across 3 projects. Optimised MySQL queries improving retrieval time by 30%. Agile team of 5, bi-weekly zero-rollback deployments.',
  },
  {
    date: 'Sep 2024 – Jan 2025',
    icon: '📊',
    role: 'Volunteer Data Visualisation Intern',
    company: 'Tirisano Education Institute',
    desc: 'Analysed programme data with Excel & built visual reports. Mapped relationships using Kumu, processing 5M+ data points.',
  },
  {
    date: '2022 – 2025',
    icon: '🎓',
    role: 'Diploma in IT NQF6 (Cum Laude)',
    company: 'Richfield Graduate Institute of Technology',
    desc: 'Programming, Web Technologies, Databases, Software Development, Software Engineering, Internet Programming.',
  },
  {
    date: 'Completed 2022',
    icon: '🏅',
    role: 'National Senior Certificate (Grade 12)',
    company: 'New Era College',
    desc: 'Mathematics, Life Sciences, Agricultural Sciences.',
  },
  {
    date: '2024',
    icon: '📜',
    role: 'FNB App Academy Certification',
    company: 'Full-stack training programme',
    desc: 'HTML, CSS, JavaScript, PHP, SQL — assessed by industry mentors.',
  },
];

const Experience: React.FC = () => (
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
        {/* Dashed vertical line */}
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

// ─────────────────────────────────────────────
// PROJECTS — Flipbook (keyboard only when visible)
// ─────────────────────────────────────────────
const projectsData: Project[] = [
  {
    title: 'ConnectDevs — Full-Stack Developer Platform',
    desc: 'A full-stack networking platform where developers create profiles, showcase projects, and connect. Solo project from database schema to deployment.',
    icon: '🤝',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'REST APIs'],
    link: 'https://connect-liart-omega.vercel.app/',
    github: `https://github.com/${GITHUB_USERNAME}/Connect`,
    architecture: 'SSR via Next.js App Router, Prisma ORM with PostgreSQL, full type safety end-to-end.',
  },
  {
    title: 'Healthcare Clinical Dashboard',
    desc: 'Responsive dashboard for patient vitals, lab results & medical history. Integrates REST APIs and visualises data with Chart.js across 5+ interactive chart types.',
    icon: '🏥',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'Chart.js'],
    link: `https://${GITHUB_USERNAME}.github.io/Health-Care/`,
    github: `https://github.com/${GITHUB_USERNAME}/Health-Care`,
    architecture: 'Client-side rendering with vanilla JS, Chart.js for data visualisation, multiple REST API integrations.',
  },
  {
    title: 'RealtimeChat — Supabase Real-Time Messenger',
    desc: 'A full-stack chat app with GitHub OAuth, real-time message delivery via Supabase subscriptions, and presence indicators. Zero page refreshes.',
    icon: '💬',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'NextAuth.js', 'Tailwind CSS', 'PostgreSQL'],
    link: `https://github.com/${GITHUB_USERNAME}`,
    github: `https://github.com/${GITHUB_USERNAME}`,
    architecture: 'Next.js App Router + Server Actions, Supabase Realtime channels, Row Level Security, NextAuth for OAuth.',
  },
];

const FlipbookProject: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);   // ✅ fixed
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

  // Keyboard navigation only when section is visible
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

const Projects: React.FC = () => (
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

// ─────────────────────────────────────────────
// DESIGN SYSTEM
// ─────────────────────────────────────────────
const DesignSystem: React.FC = () => {
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
      desc: 'Card background — 1 step lighter than --bg.',
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

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
const Testimonials: React.FC = () => (
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
            "James brings the precision of a senior engineer and the curiosity of a builder — a rare
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

// ─────────────────────────────────────────────
// WRITING
// ─────────────────────────────────────────────
const Writing: React.FC = () => (
  <section
    aria-labelledby="writing-heading"
    style={{ padding: '60px 32px', background: 'var(--bg)' }}
  >
    <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--font-accent)', color: 'var(--accent)', fontSize: '1rem' }}>
        ✍️ writing & talks
      </span>
      <h2
        id="writing-heading"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          marginTop: 8,
          marginBottom: 24,
        }}
      >
        Sharing what I learn
      </h2>
      <TiltCard className="torn-paper" style={{ padding: 24, textAlign: 'left' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>
          "Why Prisma is my ORM of choice"
        </h3>
        <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>
          A deep dive into type-safe database access — coming to my blog soon.
        </p>
        <div style={{ marginTop: 16 }}>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent3)',
              fontFamily: 'var(--font-accent)',
              textDecoration: 'underline',
            }}
          >
            Read more →
          </a>
        </div>
      </TiltCard>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT (with proper network error handling)
// ─────────────────────────────────────────────
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

const Contact: React.FC = () => {
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

// ─────────────────────────────────────────────
// JOURNAL ENTRY
// ─────────────────────────────────────────────
const journalEntries: string[] = [
  "Today I finally understood Prisma migrations. It's like giving a version history to your database.",
  "Debugged a hydration error in Next.js for two hours. The fix was a missing useEffect.",
  "Learned that Tailwind's group-hover can solve 90% of my UI interaction needs.",
  "Built a full REST API in 45 minutes using Next.js Route Handlers. Progress!",
  "Started reading about server components — the future of React is wild.",
  "Added a tiny easter egg to my portfolio. Hope someone finds it.",
  "Wrote my first unit test with Jest. It failed for 10 minutes, then it was a missing mock.",
];

const JournalEntry: React.FC = () => {
  const [randomEntry] = useState(
    () => journalEntries[Math.floor(Math.random() * journalEntries.length)]
  );
  return (
    <section
      aria-label="Notebook entry"
      style={{ padding: '60px 32px', background: 'var(--bg)' }}
    >
      <div
        className="torn-paper"
        style={{ maxWidth: 550, margin: '0 auto', padding: 24, textAlign: 'center' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            color: 'var(--accent)',
            marginBottom: 8,
          }}
        >
          📝 From my notebook
        </div>
        <blockquote>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--text)',
            }}
          >
            "{randomEntry}"
          </p>
        </blockquote>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer: React.FC = () => (
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

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
const App: React.FC = () => {
  useEffect(() => {
    injectSEOMeta();
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <DoodleCursor />
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Highlights />
        </ErrorBoundary>
        <ErrorBoundary>
          <GitHubStats />
        </ErrorBoundary>
        <ErrorBoundary>
          <Skills />
        </ErrorBoundary>
        <ContinuousGrowth />
        <ErrorBoundary>
          <Experience />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary>
          <DesignSystem />
        </ErrorBoundary>
        <ErrorBoundary>
          <Testimonials />
        </ErrorBoundary>
        <Writing />
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
        <JournalEntry />
      </main>

      <Footer />
    </>
  );
};

const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;
