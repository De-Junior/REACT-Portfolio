import { useScrollReveal } from './hooks/useScrollReveal';
import { About } from './sections/About';
import { Approach } from './sections/Approach';
import { Contact } from './sections/Contact';
import { Experience } from './sections/Experience';
import { Hero } from './sections/Hero';
import { SiteFooter } from './sections/SiteFooter';
import { SiteHeader } from './sections/SiteHeader';
import { Stack } from './sections/Stack';
import { Work } from './sections/Work';

export default function App() {
  useScrollReveal();

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-ink px-4 py-2 text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <span id="top" />
        <Hero />
        <Work />
        <Approach />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
