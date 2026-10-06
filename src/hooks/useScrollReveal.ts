import { useEffect } from 'react';

/**
 * Adds `is-revealed` to every [data-reveal] element the first time it scrolls
 * into view. One observer for the whole page; elements are unobserved once shown.
 * With reduced motion the CSS shows everything immediately, so this is harmless.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
