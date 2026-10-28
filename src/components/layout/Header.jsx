import { useState, useRef } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { MobileNav } from './MobileNav.jsx';
import { siteConfig } from '../../data/siteConfig.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';

const sectionIds = ['home', 'projects', 'services', 'process', 'about', 'contact'];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);
  const triggerRef = useRef(null);

  const handleClose = () => {
    setMobileOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="text-lg font-bold tracking-tight text-slate-50">
            MOIZ<span className="text-cyan-400">.UX</span>
          </a>

          <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-1">
            {siteConfig.nav.map((item) => {
              const id = item.href.replace('#', '');
              const active = activeId === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'location' : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? 'text-cyan-400' : 'text-slate-300 hover:text-slate-50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button as="a" href="#contact" size="sm" className="hidden md:inline-flex">
              Let&apos;s Talk
            </Button>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800 md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={handleClose} activeId={activeId} />
    </>
  );
}