import { lazy, Suspense } from 'react';
import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';

// Lazy load the sections below the fold
const Projects = lazy(() => import('./components/sections/Projects.jsx').then(m => ({ default: m.Projects })));
const Services = lazy(() => import('./components/sections/Services.jsx').then(m => ({ default: m.Services })));
const Process = lazy(() => import('./components/sections/Process.jsx').then(m => ({ default: m.Process })));
const About = lazy(() => import('./components/sections/About.jsx').then(m => ({ default: m.About })));
const WhyUs = lazy(() => import('./components/sections/WhyUs.jsx').then(m => ({ default: m.WhyUs })));
const Contact = lazy(() => import('./components/sections/Contact.jsx').then(m => ({ default: m.Contact })));

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cyan-400 focus:px-4 focus:py-2 focus:text-slate-950 focus:font-medium"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main" tabIndex="-1" className="outline-none">
        <Hero />
        <div className="cv-auto">
          <Suspense fallback={<div className="min-h-[80vh]" />}>
            <Projects />
            <Services />
            <Process />
            <About />
            <WhyUs />
            <Contact />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}