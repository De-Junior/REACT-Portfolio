import type React from 'react';

import { DoodleCursor } from './components/DoodleCursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ScrollProgress } from './components/ScrollProgress';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { ContinuousGrowth } from './sections/ContinuousGrowth';
import { DesignSystem } from './sections/DesignSystem';
import { Experience } from './sections/Experience';
import { GitHubStats } from './sections/GitHubStats';
import { Hero } from './sections/Hero';
import { Highlights } from './sections/Highlights';
import { JournalEntry } from './sections/JournalEntry';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { Testimonials } from './sections/Testimonials';
import { ThemeProvider } from './theme/ThemeProvider';

// Each section has its own error boundary so one failing widget (for example
// the GitHub API being rate limited) never blanks the whole page.
const App: React.FC = () => {
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
