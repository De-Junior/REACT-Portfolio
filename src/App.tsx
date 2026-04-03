// App.tsx — James Junior Hlungwane Portfolio
// Dark premium design with Syne + DM Sans typography
// Drop this file into your src/ folder. Make sure to install:
//   npm install lucide-react
// And add these Google Fonts to your index.html <head>:
//   <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />

import React, { useEffect, useRef } from 'react';
import {
  Github, Mail, Phone,
  ArrowRight, Send,
  ChevronDown,
} from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

// ─────────────────────────────────────────────
// GLOBAL STYLES (injected once)
// ─────────────────────────────────────────────
const globalCSS = `
  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --surface2: #16161f;
    --border: rgba(255,255,255,0.07);
    --accent: #6d4aff;
    --accent2: #ff4a8d;
    --accent3: #4affb4;
    --text: #f0effe;
    --muted: #8880a8;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    cursor: none;
  }

  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 1000; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.35;
  }

  a { text-decoration: none; color: inherit; }

  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)} }
  @keyframes slideUp { from{transform:translateY(110%);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes bounce-arrow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

  .hero-word { display:inline-block; animation: slideUp .7s cubic-bezier(.16,1,.3,1) both; }
  .hero-line { display:block; overflow:hidden; }
  .reveal { opacity:0; transform:translateY(28px); transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
  .reveal.visible { opacity:1; transform:none; }
  .reveal-d1 { transition-delay:.1s; }
  .reveal-d2 { transition-delay:.2s; }
  .reveal-d3 { transition-delay:.3s; }
`;

function useGlobalStyles() {
  useEffect(() => {
    if (document.getElementById('jj-global-styles')) return;
    const el = document.createElement('style');
    el.id = 'jj-global-styles';
    el.textContent = globalCSS;
    document.head.appendChild(el);
  }, []);
}

// ─────────────────────────────────────────────
// CURSOR
// ─────────────────────────────────────────────
const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    document.addEventListener('mousemove', move);
    let raf: number;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', width:10, height:10, background:'var(--accent)', borderRadius:'50%', pointerEvents:'none', zIndex:9999, transform:'translate(-50%,-50%)', mixBlendMode:'screen' }} />
      <div ref={ringRef} style={{ position:'fixed', width:38, height:38, border:'1.5px solid rgba(109,74,255,.5)', borderRadius:'50%', pointerEvents:'none', zIndex:9998, transform:'translate(-50%,-50%)' }} />
    </>
  );
};

// ─────────────────────────────────────────────
// SCROLL REVEAL HOOK
// ─────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
const navItems = ['Home','About','Skills','Experience','Projects','Contact'];


import { useState } from "react";
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: scrolled ? '14px 48px' : '24px 48px',
    background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled ? '1px solid var(--border)' : 'none',
    transition: 'all .3s',
  };

  return (
    <header style={navStyle}>
      <a href="#home" style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.3rem', letterSpacing:'-0.02em', background:'linear-gradient(135deg,#fff 0%,var(--accent) 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
        JJ.dev
      </a>
      <nav style={{ display:'flex', gap:36 }}>
        {navItems.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize:'.82rem', fontWeight:500, letterSpacing:'.06em', textTransform:'uppercase', color:'var(--muted)', transition:'color .2s', cursor:'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
const Hero: React.FC = () => (
  <section id="home" style={{ minHeight:'100vh', display:'flex', alignItems:'center', padding:'120px 48px 80px', position:'relative', overflow:'hidden' }}>
    {/* Grid bg */}
    <div style={{ position:'absolute', inset:0, opacity:.035, backgroundImage:'linear-gradient(var(--accent) 1px,transparent 1px),linear-gradient(90deg,var(--accent) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />
    {/* Glows */}
    <div style={{ position:'absolute', width:700, height:700, background:'radial-gradient(circle,rgba(109,74,255,.18) 0%,transparent 70%)', top:-100, right:-200, pointerEvents:'none' }} />
    <div style={{ position:'absolute', width:400, height:400, background:'radial-gradient(circle,rgba(255,74,141,.1) 0%,transparent 70%)', bottom:0, left:200, pointerEvents:'none' }} />

    <div style={{ maxWidth:1200, width:'100%', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center', position:'relative', zIndex:2 }}>
      <div>
        {/* Badge */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, border:'1px solid rgba(109,74,255,.4)', background:'rgba(109,74,255,.1)', borderRadius:100, padding:'6px 16px', fontSize:'.78rem', fontWeight:500, letterSpacing:'.05em', textTransform:'uppercase', color:'#a892ff', marginBottom:28 }}>
          <span style={{ width:6, height:6, background:'var(--accent3)', borderRadius:'50%', animation:'pulse-dot 2s infinite' }} />
          Open to opportunities
        </div>

        {/* Title */}
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2.8rem,5vw,4.8rem)', fontWeight:800, lineHeight:1.05, letterSpacing:'-0.03em', marginBottom:24 }}>
          <span className="hero-line"><span className="hero-word" style={{ animationDelay:'.1s' }}>Crafting</span> <span className="hero-word" style={{ animationDelay:'.2s' }}>digital</span></span>
          <span className="hero-line">
            <span className="hero-word" style={{ animationDelay:'.3s', background:'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>solutions</span>
          </span>
          <span className="hero-line"><span className="hero-word" style={{ animationDelay:'.4s' }}>with purpose</span></span>
        </h1>

        <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:1.7, maxWidth:460, marginBottom:40, animation:'fadeInUp .8s .5s both' }}>
          I'm <strong style={{ color:'var(--text)' }}>James Junior Hlungwane</strong> — IT graduate &amp; software developer in Pretoria. I build modern web experiences merging clean code with human-centred design.
        </p>

        <div style={{ display:'flex', gap:16, flexWrap:'wrap', animation:'fadeInUp .8s .6s both' }}>
          <a href="#projects"
            style={{ display:'inline-flex', alignItems:'center', gap:10, background:'var(--accent)', color:'#fff', fontWeight:600, fontSize:'.9rem', padding:'14px 28px', borderRadius:12, transition:'all .25s', boxShadow:'0 0 40px rgba(109,74,255,.35)', cursor:'none' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 50px rgba(109,74,255,.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 40px rgba(109,74,255,.35)'; }}>
            See my work <ArrowRight size={16} />
          </a>
          <a href="#contact"
            style={{ display:'inline-flex', alignItems:'center', gap:10, border:'1px solid var(--border)', color:'var(--text)', fontWeight:500, fontSize:'.9rem', padding:'14px 28px', borderRadius:12, transition:'all .25s', cursor:'none' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.6)'; e.currentTarget.style.background='rgba(109,74,255,.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='transparent'; }}>
            Let's talk
          </a>
        </div>
      </div>

      {/* Photo */}
      <div style={{ display:'flex', justifyContent:'center', animation:'fadeInUp .9s .3s both' }}>
        <div style={{ position:'relative', width:340, height:400 }}>
          <div style={{ position:'absolute', inset:-2, background:'linear-gradient(135deg,var(--accent),var(--accent2))', borderRadius:28, zIndex:0 }} />
          <div style={{ position:'relative', zIndex:1, width:'100%', height:'100%', borderRadius:26, overflow:'hidden', border:'2px solid var(--bg)' }}>
            <img
              src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/650842716_2336185740234892_3403676168397416168_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=zhRQhQlbZvAQ7kNvwE2yM92&_nc_oc=AdqkaF9Iaro8nE2kgoWTngq_9ykHUZtUDmJXxAkMmLstGy5aNrxEjHWpMrzhM9N9Xu0&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=5dNGN1ygbJCCqfr6Jgtqsg&_nc_ss=7a3a8&oh=00_AfwW7jWf4GBk-FWEZ_Or1INNxftRmwZUxEvIxgt0_VfJnQ&oe=69D017F5"
              alt="James Junior Hlungwane"
              style={{ width:'100%', height:'100%', objectFit:'cover' }}
              onError={e => { (e.currentTarget.parentElement!).style.background = 'linear-gradient(135deg,#1a1a2e,#16213e)'; }}
            />
          </div>
          {/* Floating tags */}
          <div style={{ position:'absolute', bottom:-20, right:-20, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'14px 20px', zIndex:3, animation:'float 4s ease-in-out infinite' }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.8rem', fontWeight:800, color:'var(--accent)', lineHeight:1 }}>5+</div>
            <div style={{ fontSize:'.7rem', color:'var(--muted)', letterSpacing:'.04em', marginTop:2 }}>Projects Built</div>
          </div>
          <div style={{ position:'absolute', top:-16, left:-16, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, padding:'10px 16px', zIndex:3, display:'flex', alignItems:'center', gap:8, animation:'float 4s 2s ease-in-out infinite' }}>
            <span>⚡</span>
            <span style={{ fontSize:'.78rem', fontWeight:600, color:'var(--accent3)' }}>Available Now</span>
          </div>
        </div>
      </div>
    </div>

    <div style={{ position:'absolute', bottom:48, left:48, display:'flex', alignItems:'center', gap:16, fontSize:'.72rem', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', animation:'fadeInUp 1s .9s both' }}>
      <span style={{ width:60, height:1, background:'var(--border)' }} />
      <a href="#about" style={{ display:'flex', alignItems:'center', gap:8, color:'var(--muted)', cursor:'none' }}>
        Scroll to explore <ChevronDown size={14} style={{ animation:'bounce-arrow 1.5s infinite' }} />
      </a>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// SECTION WRAPPER helpers
// ─────────────────────────────────────────────
const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--accent)', display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
    <span style={{ width:32, height:1, background:'var(--accent)' }} />
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="reveal" style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,3.5vw,3.2rem)', fontWeight:800, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:60 }}>
    {children}
  </h2>
);

const Hl: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ background:'linear-gradient(135deg,var(--accent),var(--accent2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{children}</span>
);

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────
const About: React.FC = () => {
  const stats = [
    { num:'5+', label:'Projects Shipped' },
    { num:'6+', label:'Languages Known' },
    { num:'NQF6', label:'Diploma IT' },
    { num:'2026', label:'Graduating' },
  ];
  const info = [
    { icon:'🎓', label:'Education', val:'Diploma in IT (NQF6)' },
    { icon:'📍', label:'Location', val:'Pretoria, South Africa' },
    { icon:'✉️', label:'Email', val:'Hlungwane.james.junior@gmail.com' },
    { icon:'📞', label:'Phone', val:'072 476 4574' },
    { icon:'🚀', label:'Status', val:'Open to internships & roles', valStyle:{ color:'var(--accent3)' } as React.CSSProperties },
  ];

  return (
    <section id="about" style={{ padding:'120px 48px', background:'var(--surface)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <SectionLabel>About me</SectionLabel>
        <SectionTitle>Self-taught tinkerer,<br /><Hl>formally trained</Hl></SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:80, alignItems:'start' }}>
          <div className="reveal">
            <p style={{ color:'var(--muted)', lineHeight:1.8, marginBottom:20, fontSize:'1.02rem' }}>
              Owning my first computer at age 7 sparked a lifelong passion — I learned to troubleshoot hardware and software alone. Now I build full-stack applications with that same curiosity and drive.
            </p>
            <p style={{ color:'var(--muted)', lineHeight:1.8, fontSize:'1.02rem' }}>
              I thrive at the intersection of technical precision and thoughtful design, crafting experiences that are both functional and delightful.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:40 }}>
              {stats.map(s => (
                <div key={s.num} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:16, padding:20, transition:'border-color .2s', cursor:'default' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(109,74,255,.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor='var(--border)')}>
                  <div style={{ fontFamily:'Syne,sans-serif', fontSize:'2rem', fontWeight:800, color:'var(--accent)' }}>{s.num}</div>
                  <div style={{ fontSize:'.78rem', color:'var(--muted)', marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d1" style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {info.map(i => (
              <div key={i.label} style={{ display:'flex', alignItems:'center', gap:16, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:16, padding:'18px 22px', transition:'all .2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.4)'; e.currentTarget.style.transform='translateX(6px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateX(0)'; }}>
                <div style={{ width:40, height:40, background:'rgba(109,74,255,.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>{i.icon}</div>
                <div>
                  <div style={{ fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted)' }}>{i.label}</div>
                  <div style={{ fontSize:'.95rem', fontWeight:500, marginTop:2, ...(i.valStyle || {}) }}>{i.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────
const skillsData = [
  { icon:'🌐', title:'Web Technologies', tags:['HTML5','CSS3','JavaScript ES6+','TypeScript','React','Bootstrap'] },
  { icon:'💻', title:'Languages', tags:['Java','Python','C++','C#','PHP','SQL'] },
  { icon:'🧱', title:'Frameworks', tags:['Django','.NET','Tailwind CSS','Git/GitHub'] },
  { icon:'🗄️', title:'Databases', tags:['MySQL','SQLite','MongoDB'] },
  { icon:'🔄', title:'Methodologies', tags:['Agile','Waterfall','SDLC'] },
  { icon:'🛡️', title:'InfoSec & CRM', tags:['Security Basics','CRM'] },
];

const Skills: React.FC = () => (
  <section id="skills" style={{ padding:'120px 48px', background:'var(--bg)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SectionLabel>Technical Arsenal</SectionLabel>
      <SectionTitle>Tools &amp; <Hl>technologies</Hl></SectionTitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
        {skillsData.map((s, i) => (
          <div key={s.title} className={`reveal ${i%3===1?'reveal-d1':i%3===2?'reveal-d2':''}`}
            style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:28, transition:'all .3s', cursor:'default', position:'relative', overflow:'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.4)'; e.currentTarget.style.transform='translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; }}>
            <div style={{ fontSize:'1.5rem', marginBottom:16 }}>{s.icon}</div>
            <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.1rem', fontWeight:700, marginBottom:14 }}>{s.title}</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {s.tags.map(tag => (
                <span key={tag} style={{ fontSize:'.72rem', fontWeight:500, letterSpacing:'.03em', padding:'4px 11px', borderRadius:100, background:'rgba(109,74,255,.1)', border:'1px solid rgba(109,74,255,.2)', color:'#a892ff' }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────
const experiencesData = [
  { date:'APR 2025 – DEC 2025', icon:'💼', role:'Software Developer Intern', company:'Sima Digital Agencies', desc:'Built features with HTML, CSS, JS, PHP, JSON, SQL. Worked in an Agile environment, participated in code reviews and client-facing demos.' },
  { date:'COMPLETING 2025',     icon:'🎓', role:'Diploma in IT (NQF6)',          company:'Higher Education Institution', desc:'Information systems, web development, software engineering & security. Expected graduation May 2026.' },
  { date:'2022',                icon:'🏅', role:'Matric Grade 12 (NQF4)',         company:'Secondary School', desc:'Built an analytical foundation and problem-solving mindset that underpins everything I do today.' },
];

const Experience: React.FC = () => (
  <section id="experience" style={{ padding:'120px 48px', background:'var(--surface)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SectionLabel>Path so far</SectionLabel>
      <SectionTitle>Experience &amp; <Hl>education</Hl></SectionTitle>
      <div style={{ position:'relative' }}>
        <div style={{ position:'absolute', left:22, top:0, bottom:0, width:1, background:'linear-gradient(to bottom,var(--accent),transparent)' }} />
        {experiencesData.map((e, i) => (
          <div key={e.role} className={`reveal ${i===1?'reveal-d1':i===2?'reveal-d2':''}`} style={{ display:'grid', gridTemplateColumns:'auto 1fr', gap:28, paddingBottom:48 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'rgba(109,74,255,.15)', border:'1px solid rgba(109,74,255,.4)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', zIndex:1, position:'relative' }}>{e.icon}</div>
            <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:20, padding:28, transition:'border-color .2s' }}
              onMouseEnter={el => (el.currentTarget.style.borderColor='rgba(109,74,255,.3)')}
              onMouseLeave={el => (el.currentTarget.style.borderColor='var(--border)')}>
              <div style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.1em', textTransform:'uppercase', color:'var(--accent)', marginBottom:8 }}>{e.date}</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.25rem', fontWeight:700, marginBottom:4 }}>{e.role}</div>
              <div style={{ fontSize:'.88rem', color:'var(--muted)', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ width:16, height:1, background:'var(--muted)' }} />{e.company}
              </div>
              <p style={{ color:'var(--muted)', fontSize:'.92rem', lineHeight:1.7 }}>{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────
const projectsData = [
  { title:'Clinical Hospital Dashboard', desc:'Interactive dashboard for patient metrics, bed occupancy, and real-time alerts with mock EMR integration.', icon:'🏥', bg:'linear-gradient(135deg,#0f1d40,#1a1150)', tags:['HTML','CSS','Chart.js','JS','REST API'], link:'https://de-junior.github.io/Health-Care/' },
  { title:'Food Recipe App',             desc:'Search, save recipes, detailed instructions, and JSON integration for rich culinary discovery.',            icon:'🍽️', bg:'linear-gradient(135deg,#1a0f20,#2d1040)', tags:['HTML','CSS','JS','API'],              link:'https://de-junior.github.io/Kitchen/' },
  { title:'Weather Tracker',             desc:'Live weather conditions and forecasts with weather API integration and clean visualisations.',              icon:'🌤️', bg:'linear-gradient(135deg,#0d1f35,#0a3060)', tags:['HTML','CSS','JS','API'],              link:'https://de-junior.github.io/WeatherTracking/' },
  { title:'BMI Calculator',              desc:'Clean UI with personalised health recommendations based on your BMI results.',                              icon:'⚖️', bg:'linear-gradient(135deg,#111a10,#1a3520)', tags:['HTML5','CSS3','ES6'],                link:'https://de-junior.github.io/BMITracker/' },
  { title:'E-Commerce Base',             desc:'Product catalog, shopping cart, and authentication simulation built with vanilla JS.',                      icon:'🛒', bg:'linear-gradient(135deg,#1f100a,#3d1a0a)', tags:['HTML','CSS','JS','JSON'],            link:'https://de-junior.github.io/WeShopHere/' },
];

const Projects: React.FC = () => (
  <section id="projects" style={{ padding:'120px 48px', background:'var(--bg)' }}>
    <div style={{ maxWidth:1200, margin:'0 auto' }}>
      <SectionLabel>Recent Builds</SectionLabel>
      <SectionTitle>Things I've <Hl>built</Hl></SectionTitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
        {projectsData.map((p, i) => (
          <div key={p.title} className={`reveal ${i%3===1?'reveal-d1':i%3===2?'reveal-d2':''}`}
            style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:24, overflow:'hidden', display:'flex', flexDirection:'column', transition:'all .3s', cursor:'default' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.4)'; e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(0,0,0,.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}>
            <div style={{ height:180, position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:0, background:p.bg }} />
              <span style={{ fontSize:'3rem', position:'relative', zIndex:1, filter:'drop-shadow(0 0 20px rgba(109,74,255,.6))' }}>{p.icon}</span>
            </div>
            <div style={{ padding:24, flex:1, display:'flex', flexDirection:'column' }}>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.1rem', fontWeight:700, marginBottom:8 }}>{p.title}</div>
              <p style={{ color:'var(--muted)', fontSize:'.88rem', lineHeight:1.6, flex:1 }}>{p.desc}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:16 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize:'.68rem', fontWeight:500, padding:'3px 9px', borderRadius:100, background:'rgba(255,255,255,.05)', color:'var(--muted)' }}>{t}</span>)}
              </div>
              <a href={p.link} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:18, fontSize:'.82rem', fontWeight:600, color:'var(--accent)', cursor:'none', transition:'gap .2s' }}
                onMouseEnter={e => (e.currentTarget.style.gap='12px')}
                onMouseLeave={e => (e.currentTarget.style.gap='6px')}>
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────────
const contactLinks = [
  { icon:'✉️', label:'Email', val:'Hlungwane.james.junior@gmail.com', href:'mailto:Hlungwane.james.junior@gmail.com' },
  { icon:'📞', label:'Phone', val:'072 476 4574', href:'tel:+27724764574' },
  { icon:'🐙', label:'GitHub', val:'github.com/De-Junior', href:'https://github.com/De-Junior' },
  { icon:'📍', label:'Location', val:'Pretoria, South Africa', href:'' },
];

const inputStyle: React.CSSProperties = {
  background:'var(--surface2)', border:'1px solid var(--border)',
  color:'var(--text)', borderRadius:14, padding:'14px 18px',
  fontFamily:'DM Sans,sans-serif', fontSize:'.95rem', outline:'none', width:'100%',
  transition:'border-color .2s, box-shadow .2s',
};

const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'rgba(109,74,255,.7)';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109,74,255,.1)';
};
const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = 'var(--border)';
  e.currentTarget.style.boxShadow = 'none';
};

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xvzvwodd");

  return (
    <section id="contact" style={{ padding:'120px 48px', background:'var(--surface)' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <SectionLabel>Get in touch</SectionLabel>
        <SectionTitle>Let's <Hl>work together</Hl></SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr', gap:80 }}>

          {/* Left — contact info */}
          <div className="reveal">
            <p style={{ color:'var(--muted)', fontSize:'1.05rem', lineHeight:1.8, marginBottom:40 }}>
              Have a project in mind or want to discuss opportunities? I'd love to hear from you. Let's build something great.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {contactLinks.map(c => (
                <a key={c.label} href={c.href || undefined}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ display:'flex', alignItems:'center', gap:16, background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:16, padding:'18px 22px', color:'var(--text)', transition:'all .2s', cursor: c.href ? 'none' : 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.5)'; e.currentTarget.style.transform='translateX(6px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.transform='translateX(0)'; }}>
                  <div style={{ width:42, height:42, background:'rgba(109,74,255,.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', flexShrink:0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontSize:'.7rem', textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted)' }}>{c.label}</div>
                    <div style={{ fontSize:'.9rem', fontWeight:500, marginTop:2 }}>{c.val}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Formspree form */}
          {state.succeeded ? (
            <div className="reveal reveal-d1" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, background:'var(--surface2)', border:'1px solid rgba(74,255,180,.2)', borderRadius:20, padding:48, textAlign:'center' }}>
              <div style={{ fontSize:'3rem' }}>✅</div>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.4rem', fontWeight:700 }}>Message sent!</div>
              <p style={{ color:'var(--muted)', fontSize:'.95rem' }}>Thanks for reaching out — I'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="reveal reveal-d1" onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <label htmlFor="name" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:8 }}>Name</label>
                  <input id="name" name="name" style={inputStyle} placeholder="Your name" required onFocus={focusStyle} onBlur={blurStyle} />
                  <ValidationError prefix="Name" field="name" errors={state.errors} style={{ color:'var(--accent2)', fontSize:'.78rem', marginTop:4 }} />
                </div>
                <div>
                  <label htmlFor="email" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:8 }}>Email</label>
                  <input id="email" type="email" name="email" style={inputStyle} placeholder="your@email.com" required onFocus={focusStyle} onBlur={blurStyle} />
                  <ValidationError prefix="Email" field="email" errors={state.errors} style={{ color:'var(--accent2)', fontSize:'.78rem', marginTop:4 }} />
                </div>
              </div>
              <div>
                <label htmlFor="subject" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:8 }}>Subject</label>
                <input id="subject" name="subject" style={inputStyle} placeholder="What's this about?" required onFocus={focusStyle} onBlur={blurStyle} />
              </div>
              <div>
                <label htmlFor="message" style={{ fontSize:'.72rem', fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase', color:'var(--muted)', display:'block', marginBottom:8 }}>Message</label>
                <textarea id="message" name="message" style={{ ...inputStyle, resize:'vertical', minHeight:130 }} placeholder="Tell me about your project or opportunity..." required onFocus={focusStyle} onBlur={blurStyle} />
                <ValidationError prefix="Message" field="message" errors={state.errors} style={{ color:'var(--accent2)', fontSize:'.78rem', marginTop:4 }} />
              </div>
              <button type="submit" disabled={state.submitting}
                style={{ background:'linear-gradient(135deg,var(--accent),#9b4dff)', color:'#fff', fontFamily:'DM Sans,sans-serif', fontSize:'.95rem', fontWeight:600, padding:'16px 28px', border:'none', borderRadius:14, cursor: state.submitting ? 'not-allowed' : 'none', opacity: state.submitting ? 0.7 : 1, transition:'all .25s', boxShadow:'0 0 40px rgba(109,74,255,.3)', display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}
                onMouseEnter={e => { if (!state.submitting) { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 50px rgba(109,74,255,.5)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 0 40px rgba(109,74,255,.3)'; }}>
                {state.submitting ? 'Sending…' : <> Send message <Send size={16} /> </>}
              </button>
            </form>
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
  <footer style={{ background:'var(--bg)', borderTop:'1px solid var(--border)', padding:48, textAlign:'center' }}>
    <div style={{ fontFamily:'Syne,sans-serif', fontSize:'1.4rem', fontWeight:800, letterSpacing:'-0.02em', marginBottom:8 }}>James Junior Hlungwane</div>
    <p style={{ color:'var(--muted)', fontSize:'.88rem', marginBottom:28 }}>building with curiosity, always learning.</p>
    <div style={{ display:'flex', justifyContent:'center', gap:20, marginBottom:32 }}>
      {[
        { icon:<Github size={18}/>, href:'https://github.com/De-Junior' },
        { icon:<Mail size={18}/>, href:'mailto:Hlungwane.james.junior@gmail.com' },
        { icon:<Phone size={18}/>, href:'tel:+27724764574' },
      ].map((l, i) => (
        <a key={i} href={l.href} target={l.href.startsWith('http')?'_blank':undefined} rel="noopener noreferrer"
          style={{ width:44, height:44, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)', transition:'all .2s', cursor:'none' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(109,74,255,.5)'; e.currentTarget.style.color='var(--text)'; e.currentTarget.style.background='rgba(109,74,255,.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--muted)'; e.currentTarget.style.background='var(--surface)'; }}>
          {l.icon}
        </a>
      ))}
    </div>
    <p style={{ color:'var(--muted)', fontSize:'.78rem' }}>© 2026 James Junior Hlungwane · Pretoria, ZA</p>
  </footer>
);

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
const App: React.FC = () => {
  useGlobalStyles();
  useReveal();

  return (
    <>
      <Cursor />
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

export default App;