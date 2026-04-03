// App.tsx — James Junior Hlungwane Portfolio
// Production-ready with optimized performance, accessibility, and SEO
// 
// Required installations:
// npm install lucide-react @formspree/react framer-motion
//
// Add to index.html <head>:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
// <meta name="theme-color" content="#6d4aff" />

import React, { useEffect, useRef, useState, useCallback, createContext, useContext, } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Github, Mail, Phone, ArrowRight, Send, ChevronDown,
  Menu, X, ExternalLink, Sun, Moon, 
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

// ─────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────
type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'] as const;

// ─────────────────────────────────────────────
// THEME CONTEXT
// ─────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// ─────────────────────────────────────────────
// OPTIMIZED GLOBAL STYLES
// ─────────────────────────────────────────────
const getGlobalCSS = (theme: Theme) => `
  :root {
    --bg: ${theme === 'dark' ? '#0a0a0f' : '#f5f5f7'};
    --surface: ${theme === 'dark' ? '#111118' : '#ffffff'};
    --surface2: ${theme === 'dark' ? '#16161f' : '#f0f0f3'};
    --border: ${theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'};
    --accent: #6d4aff;
    --accent2: #ff4a8d;
    --accent3: #4affb4;
    --text: ${theme === 'dark' ? '#f0effe' : '#1a1a2e'};
    --text-muted: ${theme === 'dark' ? '#8880a8' : '#666680'};
    --gradient-1: linear-gradient(135deg, #6d4aff 0%, #ff4a8d 50%, #4affb4 100%);
    --shadow-sm: ${theme === 'dark' ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 20px rgba(0,0,0,0.08)'};
    --shadow-md: ${theme === 'dark' ? '0 8px 30px rgba(0,0,0,0.4)' : '0 8px 30px rgba(0,0,0,0.12)'};
    --shadow-lg: ${theme === 'dark' ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.15)'};
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  
  html { 
    scroll-behavior: smooth; 
    overflow-x: hidden;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    transition: background-color var(--transition-normal), color var(--transition-fast);
    line-height: 1.5;
  }

  /* Optimized noise texture */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 1000; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    opacity: 0.5;
  }

  a { text-decoration: none; color: inherit; }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--accent2); }

  /* Animations */
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes shine { to { background-position: 200% center; } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes glow { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
  
  /* Utility classes */
  .glow-text {
    background: linear-gradient(135deg, #fff 0%, var(--accent) 40%, var(--accent2) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s linear infinite;
  }

  .gradient-border {
    position: relative;
    background: var(--surface);
    border-radius: 20px;
  }
  
  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: var(--gradient-1);
    border-radius: 21px;
    opacity: 0;
    transition: opacity var(--transition-normal);
    z-index: -1;
  }
  
  .gradient-border:hover::before {
    opacity: 0.5;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
    .hero-grid { grid-template-columns: 1fr !important; text-align: center !important; gap: 40px !important; }
    .skills-grid, .projects-grid, .contact-grid { grid-template-columns: 1fr !important; }
    section { padding: 80px 24px !important; }
    h1 { font-size: 2.5rem !important; }
  }
  
  @media (min-width: 769px) {
    .mobile-menu-btn { display: none !important; }
  }

  /* Performance optimizations */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .glow-text { animation: none; }
  }

  /* Focus styles for accessibility */
  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* Loading skeleton */
  .skeleton {
    background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
`;

// ─────────────────────────────────────────────
// THEME PROVIDER
// ─────────────────────────────────────────────
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const styleEl = document.getElementById('jj-global-styles');
    if (styleEl) styleEl.textContent = getGlobalCSS(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useGlobalStyles(theme: Theme) {
  useEffect(() => {
    let el = document.getElementById('jj-global-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'jj-global-styles';
      document.head.appendChild(el);
    }
    el.textContent = getGlobalCSS(theme);
  }, [theme]);
}

// ─────────────────────────────────────────────
// OPTIMIZED CUSTOM CURSOR (disabled on touch devices)
// ─────────────────────────────────────────────
const Cursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorXSpring = useSpring(cursorX, { damping: 30, stiffness: 400, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 30, stiffness: 400, mass: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const handleHover = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleLeave);
    });
    
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: cursorXSpring,
          top: cursorYSpring,
          width: isHovering ? 60 : 8,
          height: isHovering ? 60 : 8,
          background: isHovering ? 'rgba(109,74,255,0.15)' : 'var(--accent)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          border: isHovering ? '1.5px solid rgba(109,74,255,0.6)' : 'none',
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
          willChange: 'left, top',
        }}
        transition={{ type: "tween", duration: 0.15 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          left: cursorXSpring,
          top: cursorYSpring,
          width: isClicking ? 20 : 32,
          height: isClicking ? 20 : 32,
          border: '1px solid rgba(109,74,255,0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
};

// ─────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'var(--gradient-1)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 10000,
      }}
    />
  );
};

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = [...navItems].reverse();
      for (const item of sections) {
        const element = document.getElementById(item.toLowerCase());
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(item);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: scrolled ? '14px 32px' : '24px 48px',
          background: scrolled ? `rgba(${theme === 'dark' ? '10,10,15' : '245,245,247'}, 0.92)` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          transition: 'all 0.3s',
        }}
      >
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{
            fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.3rem',
            letterSpacing: '-0.02em', background: 'var(--gradient-1)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}
        >
          JJ.dev
        </motion.a>

        <nav className="desktop-nav" style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {navItems.map(item => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{
                fontSize: '.82rem', fontWeight: 500, letterSpacing: '.06em',
                textTransform: 'uppercase', color: activeSection === item ? 'var(--text)' : 'var(--text-muted)',
                transition: 'color 0.2s', position: 'relative',
              }}
            >
              {item}
              {activeSection === item && (
                <motion.div
                  layoutId="activeNav"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{ position: 'absolute', bottom: -8, left: 0, right: 0, height: 2, background: 'var(--accent)', borderRadius: 2 }}
                />
              )}
            </motion.a>
          ))}
          
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
            aria-label="Toggle theme"
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: '50%',
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text)',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            display: 'none',
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, width: '70%', maxWidth: 300,
              background: 'var(--surface)', backdropFilter: 'blur(20px)', zIndex: 501,
              padding: '100px 32px', display: 'flex', flexDirection: 'column', gap: 24,
              borderLeft: '1px solid var(--border)',
            }}
          >
            {navItems.map(item => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                whileHover={{ x: 10 }}
                style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text)' }}
              >
                {item}
              </motion.a>
            ))}
            
            <motion.button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              whileHover={{ x: 10 }}
              style={{
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                color: 'var(--text)',
                fontSize: '1rem',
                fontWeight: 500,
                marginTop: 20,
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─────────────────────────────────────────────
// PARTICLE BACKGROUND (optimized)
// ─────────────────────────────────────────────
const ParticleBackground: React.FC = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{ x: number; y: number; radius: number; alpha: number; vx: number; vy: number }> = [];
    
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const particleCount = Math.min(40, Math.floor(window.innerWidth / 30));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.15,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109, 74, 255, ${p.alpha})`;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
});

ParticleBackground.displayName = 'ParticleBackground';

// ─────────────────────────────────────────────
// SECTION WRAPPERS
// ─────────────────────────────────────────────
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4 }}
    style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}
  >
    <span style={{ width: 32, height: 1, background: 'var(--accent)' }} />
    {children}
  </motion.div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 60 }}
  >
    {children}
  </motion.h2>
);

const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="glow-text">{children}</span>
);

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
const TypingText: React.FC<{ texts: string[]; delay?: number }> = ({ texts, delay = 2000 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, delay]);

  return (
    <span style={{ color: 'var(--accent3)' }}>
      {texts[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        style={{ display: 'inline-block', width: 2, height: '1.2em', background: 'var(--accent3)', marginLeft: 2 }}
      />
    </span>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="home"
      ref={containerRef}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 48px 80px',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <ParticleBackground />
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(109,74,255,0.12) 0%, transparent 70%)', top: -100, right: -100, pointerEvents: 'none' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,74,141,0.08) 0%, transparent 70%)', bottom: 0, left: 0, pointerEvents: 'none' }}
      />

      <motion.div style={{ y, maxWidth: 1200, width: '100%', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', position: 'relative', zIndex: 2 }} className="hero-grid">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(109,74,255,.4)', background: 'rgba(109,74,255,.1)', borderRadius: 100, padding: '6px 16px', fontSize: '.78rem', fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase', color: '#a892ff', marginBottom: 28 }}
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 6, height: 6, background: 'var(--accent3)', borderRadius: '50%' }}
            />
            Open to opportunities
          </motion.div>

          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2.8rem,5vw,4.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Crafting digital</motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="glow-text">solutions</motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>with <TypingText texts={["purpose", "passion", "precision", "code"]} delay={2500} /></motion.div>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 460, marginBottom: 40 }}
          >
            I'm <strong style={{ color: 'var(--text)' }}>James Junior Hlungwane</strong> — IT graduate &amp; software developer in Pretoria. I build modern web experiences merging clean code with human-centred design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--accent)', color: '#fff', fontWeight: 600, fontSize: '.9rem', padding: '14px 28px', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}
            >
              See my work <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, border: '1px solid var(--border)', color: 'var(--text)', fontWeight: 500, fontSize: '.9rem', padding: '14px 28px', borderRadius: 12 }}
            >
              Let's talk
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", damping: 20 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{ position: 'relative', width: 340, height: 400 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', inset: -2, background: 'var(--gradient-1)', borderRadius: 28, zIndex: 0, opacity: 0.6 }}
            />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', borderRadius: 26, overflow: 'hidden', border: '2px solid var(--bg)' }}>
              <img
                src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/650842716_2336185740234892_3403676168397416168_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=zhRQhQlbZvAQ7kNvwE2yM92&_nc_oc=AdqkaF9Iaro8nE2kgoWTngq_9ykHUZtUDmJXxAkMmLstGy5aNrxEjHWpMrzhM9N9Xu0&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=5dNGN1ygbJCCqfr6Jgtqsg&_nc_ss=7a3a8&oh=00_AfwW7jWf4GBk-FWEZ_Or1INNxftRmwZUxEvIxgt0_VfJnQ&oe=69D017F5"
                alt="James Junior Hlungwane - Software Developer Portfolio"
                loading="eager"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', bottom: -20, right: -20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '14px 20px', zIndex: 3, backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>5+</div>
              <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', letterSpacing: '.04em', marginTop: 2 }}>Projects Built</div>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              style={{ position: 'absolute', top: -16, left: -16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '10px 16px', zIndex: 3, display: 'flex', alignItems: 'center', gap: 8, backdropFilter: 'blur(10px)', boxShadow: 'var(--shadow-sm)' }}
            >
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>⚡</motion.span>
              <span style={{ fontSize: '.78rem', fontWeight: 600, color: 'var(--accent3)' }}>Available Now</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* FIXED SCROLL INDICATOR */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: 48,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: '.72rem',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ width: 60, height: 1, background: 'var(--border)' }} />
        <a
          href="#about"
          style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}
        >
          Scroll to explore
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────
const AnimatedCounter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const increment = value / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{ fontFamily: 'Syne,sans-serif', fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>
      {count}{suffix}
    </div>
  );
};

const About: React.FC = () => {
  const stats = [
    { num: 5, label: 'Projects Shipped', suffix: '+' },
    { num: 6, label: 'Languages Known', suffix: '+' },
    { num: 6, label: 'NQF Level', suffix: '' },
    { num: 2026, label: 'Graduating', suffix: '' },
  ];
  
  const info = [
    { icon: '🎓', label: 'Education', val: 'Diploma in IT (NQF6)' },
    { icon: '📍', label: 'Location', val: 'Pretoria, South Africa' },
    { icon: '✉️', label: 'Email', val: 'Hlungwane.james.junior@gmail.com' },
    { icon: '📞', label: 'Phone', val: '072 476 4574' },
    { icon: '🚀', label: 'Status', val: 'Open to internships & roles', valStyle: { color: 'var(--accent3)' } },
  ];

  return (
    <section id="about" style={{ padding: '120px 48px', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel>About me</SectionLabel>
        <SectionTitle>Self-taught tinkerer,<br /><Hl>formally trained</Hl></SectionTitle>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 20, fontSize: '1.02rem' }}>
              Owning my first computer at age 7 sparked a lifelong passion — I learned to troubleshoot hardware and software alone. Now I build full-stack applications with that same curiosity and drive.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.02rem' }}>
              I thrive at the intersection of technical precision and thoughtful design, crafting experiences that are both functional and delightful.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 40 }}>
              {stats.map(s => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)' }}
                >
                  <AnimatedCounter value={s.num} suffix={s.suffix} />
                  <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            {info.map((i, idx) => (
              <motion.div
                key={i.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ x: 6 }}
                style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 22px', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ width: 40, height: 40, background: 'rgba(109,74,255,.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-muted)' }}>{i.label}</div>
                  <div style={{ fontSize: '.95rem', fontWeight: 500, marginTop: 2, ...(i.valStyle || {}) }}>{i.val}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SKILLS SECTION
// ─────────────────────────────────────────────
const skillsData = [
  { icon: '🌐', title: 'Web Technologies', tags: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React', 'Bootstrap'], color: '#6d4aff' },
  { icon: '💻', title: 'Languages', tags: ['Java', 'Python', 'C++', 'C#', 'PHP', 'SQL'], color: '#ff4a8d' },
  { icon: '🧱', title: 'Frameworks', tags: ['Django', '.NET', 'Tailwind CSS', 'Git/GitHub'], color: '#4affb4' },
  { icon: '🗄️', title: 'Databases', tags: ['MySQL', 'SQLite', 'MongoDB'], color: '#ffa64a' },
  { icon: '🔄', title: 'Methodologies', tags: ['Agile', 'Waterfall', 'SDLC'], color: '#4ac7ff' },
  { icon: '🛡️', title: 'InfoSec & CRM', tags: ['Security Basics', 'CRM'], color: '#ff4a4a' },
];

const Skills: React.FC = () => (
  <section id="skills" style={{ padding: '120px 48px', background: 'var(--bg)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <SectionLabel>Technical Arsenal</SectionLabel>
      <SectionTitle>Tools &amp; <Hl>technologies</Hl></SectionTitle>
      
      <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {skillsData.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: '1.8rem', marginBottom: 16 }}
            >
              {s.icon}
            </motion.div>
            <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: 14 }}>{s.title}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {s.tags.map(tag => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.03em', padding: '4px 11px', borderRadius: 100, background: 'rgba(109,74,255,.1)', border: `1px solid ${s.color}20`, color: '#a892ff' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// EXPERIENCE SECTION
// ─────────────────────────────────────────────
const experiencesData = [
  { date: 'APR 2025 – DEC 2025', icon: '💼', role: 'Software Developer Intern', company: 'Sima Digital Agencies', desc: 'Built features with HTML, CSS, JS, PHP, JSON, SQL. Worked in an Agile environment, participated in code reviews and client-facing demos.' },
  { date: 'COMPLETED 2025', icon: '🎓', role: 'Diploma in IT (NQF6)', company: 'Higher Education Institution', desc: 'Information systems, web development, software engineering & security. Expected graduation May 2026.' },
  { date: '2022', icon: '🏅', role: 'Matric Grade 12 (NQF4)', company: 'Secondary School', desc: 'Built an analytical foundation and problem-solving mindset that underpins everything I do today.' },
];

const Experience: React.FC = () => (
  <section id="experience" style={{ padding: '120px 48px', background: 'var(--surface)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <SectionLabel>Path so far</SectionLabel>
      <SectionTitle>Experience &amp; <Hl>education</Hl></SectionTitle>
      
      <div style={{ position: 'relative' }}>
        <motion.div
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: 'absolute', left: 22, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, var(--accent), transparent)' }}
        />
        
        {experiencesData.map((e, i) => (
          <motion.div
            key={e.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 28, paddingBottom: 48 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(109,74,255,.15)', border: '1px solid rgba(109,74,255,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', zIndex: 1, position: 'relative' }}
            >
              {e.icon}
            </motion.div>
            
            <motion.div
              whileHover={{ borderColor: 'rgba(109,74,255,.3)' }}
              style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 20, padding: 28, boxShadow: 'var(--shadow-sm)' }}
            >
              <div style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>{e.date}</div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.25rem', fontWeight: 700, marginBottom: 4 }}>{e.role}</div>
              <div style={{ fontSize: '.88rem', color: 'var(--text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 16, height: 1, background: 'var(--text-muted)' }} />{e.company}
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.92rem', lineHeight: 1.7 }}>{e.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────
const projectsData = [
  { title: 'Clinical Hospital Dashboard', desc: 'Interactive dashboard for patient metrics, bed occupancy, and real-time alerts with mock EMR integration.', icon: '🏥', bg: 'linear-gradient(135deg,#0f1d40,#1a1150)', tags: ['HTML', 'CSS', 'Chart.js', 'JS', 'REST API'], link: 'https://de-junior.github.io/Health-Care/' },
  { title: 'Food Recipe App', desc: 'Search, save recipes, detailed instructions, and JSON integration for rich culinary discovery.', icon: '🍽️', bg: 'linear-gradient(135deg,#1a0f20,#2d1040)', tags: ['HTML', 'CSS', 'JS', 'API'], link: 'https://de-junior.github.io/Kitchen/' },
  { title: 'Weather Tracker', desc: 'Live weather conditions and forecasts with weather API integration and clean visualisations.', icon: '🌤️', bg: 'linear-gradient(135deg,#0d1f35,#0a3060)', tags: ['HTML', 'CSS', 'JS', 'API'], link: 'https://de-junior.github.io/WeatherTracking/' },
  { title: 'BMI Calculator', desc: 'Clean UI with personalised health recommendations based on your BMI results.', icon: '⚖️', bg: 'linear-gradient(135deg,#111a10,#1a3520)', tags: ['HTML5', 'CSS3', 'ES6'], link: 'https://de-junior.github.io/BMITracker/' },
  { title: 'E-Commerce Base', desc: 'Product catalog, shopping cart, and authentication simulation built with vanilla JS.', icon: '🛒', bg: 'linear-gradient(135deg,#1f100a,#3d1a0a)', tags: ['HTML', 'CSS', 'JS', 'JSON'], link: 'https://de-junior.github.io/WeShopHere/' },
];

const ProjectCard: React.FC<{ project: typeof projectsData[0]; index: number }> = React.memo(({ project, index }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ height: 180, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: project.bg }} />
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: '3rem', position: 'relative', zIndex: 1 }}
        >
          {project.icon}
        </motion.span>
      </div>
      
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>{project.title}</div>
        <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', lineHeight: 1.6, flex: 1 }}>{project.desc}</p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: '.68rem', fontWeight: 500, padding: '3px 9px', borderRadius: 100, background: 'rgba(255,255,255,.05)', color: 'var(--text-muted)' }}>{t}</span>
          ))}
        </div>
        
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ gap: 10 }}
          transition={{ type: "spring", stiffness: 400 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 18, fontSize: '.82rem', fontWeight: 600, color: 'var(--accent)' }}
        >
          View Project <ExternalLink size={14} />
        </motion.a>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects: React.FC = () => (
  <section id="projects" style={{ padding: '120px 48px', background: 'var(--bg)' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <SectionLabel>Recent Builds</SectionLabel>
      <SectionTitle>Things I've <Hl>built</Hl></SectionTitle>
      
      <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {projectsData.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────
const contactLinks = [
  { icon: '✉️', label: 'Email', val: 'Hlungwane.james.junior@gmail.com', href: 'mailto:Hlungwane.james.junior@gmail.com' },
  { icon: '📞', label: 'Phone', val: '072 476 4574', href: 'tel:+27724764574' },
  { icon: '🐙', label: 'GitHub', val: 'github.com/De-Junior', href: 'https://github.com/De-Junior' },
  { icon: '📍', label: 'Location', val: 'Pretoria, South Africa', href: '' },
];

const inputStyle: React.CSSProperties = {
  background: 'var(--surface2)', border: '1px solid var(--border)',
  color: 'var(--text)', borderRadius: 14, padding: '14px 18px',
  fontFamily: 'DM Sans,sans-serif', fontSize: '.95rem', outline: 'none', width: '100%',
  transition: 'all 0.2s',
};

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xvzvwodd");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <section id="contact" style={{ padding: '120px 48px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel>Get in touch</SectionLabel>
        <SectionTitle>Let's <Hl>work together</Hl></SectionTitle>
        
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 40 }}>
              Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's build something great.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {contactLinks.map((c, idx) => (
                <motion.a
                  key={c.label}
                  href={c.href || undefined}
                  target={c.href && c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 6 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 16, padding: '18px 22px', color: 'var(--text)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <div style={{ width: 42, height: 42, background: 'rgba(109,74,255,.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize: '.7rem', textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text-muted)' }}>{c.label}</div>
                    <div style={{ fontSize: '.9rem', fontWeight: 500, marginTop: 2 }}>{c.val}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {state.succeeded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, background: 'var(--surface2)', border: '1px solid rgba(74,255,180,.2)', borderRadius: 20, padding: 48, textAlign: 'center' }}
            >
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.4 }} style={{ fontSize: '3rem' }}>✅</motion.div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.4rem', fontWeight: 700 }}>Message sent!</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.95rem' }}>Thanks for reaching out — I'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Name</label>
                  <input
                    name="name"
                    style={{ ...inputStyle, borderColor: focusedField === 'name' ? 'rgba(109,74,255,.7)' : 'var(--border)' }}
                    placeholder="Your name"
                    required
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    style={{ ...inputStyle, borderColor: focusedField === 'email' ? 'rgba(109,74,255,.7)' : 'var(--border)' }}
                    placeholder="your@email.com"
                    required
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>
              </div>
              
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Subject</label>
                <input
                  name="subject"
                  style={{ ...inputStyle, borderColor: focusedField === 'subject' ? 'rgba(109,74,255,.7)' : 'var(--border)' }}
                  placeholder="What's this about?"
                  required
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '.72rem', fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Message</label>
                <textarea
                  name="message"
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 130, borderColor: focusedField === 'message' ? 'rgba(109,74,255,.7)' : 'var(--border)' }}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              
              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400 }}
                style={{
                  background: 'linear-gradient(135deg, var(--accent), #9b4dff)',
                  color: '#fff', fontFamily: 'DM Sans,sans-serif', fontSize: '.95rem',
                  fontWeight: 600, padding: '16px 28px', border: 'none', borderRadius: 14,
                  cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}
              >
                {state.submitting ? 'Sending…' : <> Send message <Send size={16} /> </>}
              </motion.button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
const Footer: React.FC = () => (
  <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 48, textAlign: 'center' }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>James Junior Hlungwane</div>
      <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: 28 }}>building with curiosity, always learning.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32 }}>
        {[
          { icon: <Github size={18} />, href: 'https://github.com/De-Junior' },
          { icon: <Mail size={18} />, href: 'mailto:Hlungwane.james.junior@gmail.com' },
          { icon: <Phone size={18} />, href: 'tel:+27724764574' },
        ].map((l, i) => (
          <motion.a
            key={i}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ width: 44, height: 44, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}
          >
            {l.icon}
          </motion.a>
        ))}
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '.78rem' }}>© 2026 James Junior Hlungwane · Pretoria, ZA</p>
    </motion.div>
  </footer>
);

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
const App: React.FC = () => {
  const { theme } = useTheme();
  useGlobalStyles(theme);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

// Wrapper with ThemeProvider
const AppWrapper: React.FC = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWrapper;