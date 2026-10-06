import { useEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';
import { profile } from '../content/profile';
import { useActiveSection } from '../hooks/useActiveSection';

const navItems = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const active = useActiveSection(sectionIds);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButton.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || menuOpen ? 'border-line bg-canvas/85 backdrop-blur-md' : 'border-transparent bg-canvas'
      }`}
    >
      <div className="page flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex h-10 items-center text-[0.9375rem] font-semibold tracking-[-0.01em] text-ink">
          James Hlungwane
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-[0.875rem] transition-colors ${
                    active === id ? 'text-ink' : 'text-muted hover:text-ink'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.cv}
            download
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line-strong px-3.5 text-[0.875rem] font-medium text-ink transition-colors hover:bg-subtle sm:inline-flex"
          >
            CV
            <Icon name="download" className="size-3.5" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-ink hover:bg-subtle md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="size-5" />
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line md:hidden">
          <ul className="page flex flex-col py-2">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center text-[1.0625rem] text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} download className="flex h-12 items-center gap-2 text-[1.0625rem] text-ink">
                Download CV <Icon name="download" />
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
