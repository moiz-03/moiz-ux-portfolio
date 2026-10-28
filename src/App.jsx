import { Header } from './components/layout/Header.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { Hero } from './components/sections/Hero.jsx';
import { Projects } from './components/sections/Projects.jsx';
import { Services } from './components/sections/Services.jsx';
import { Process } from './components/sections/Process.jsx';
import { About } from './components/sections/About.jsx';
import { WhyUs } from './components/sections/WhyUs.jsx';
import { Contact } from './components/sections/Contact.jsx';

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
        <Projects />
        <Services />
        <Process />
        <About />
        <WhyUs />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}