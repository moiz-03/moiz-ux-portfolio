import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { Button } from '../common/Button.jsx';
import { siteConfig } from '../../data/siteConfig.js';

export function MobileNav({ open, onClose, activeId }) {
  const navRef = useRef(null); // Add ref
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus Trap Logic
      if (e.key === 'Tab' && navRef.current) {
        const focusableElements = Array.from(
          navRef.current.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !navRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !navRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      ref={navRef}
      className="fixed inset-0 z-50 flex flex-col bg-slate-950 md:hidden"
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
        <span className="text-lg font-bold text-slate-50">
          MOIZ<span className="text-cyan-400">.UX</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          ref={closeButtonRef}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-slate-300 hover:bg-slate-800"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile primary" className="flex flex-1 flex-col gap-1 p-4">
        {siteConfig.nav.map((item) => {
          const id = item.href.replace('#', '');
          const active = activeId === id;
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={active ? 'location' : undefined}
              className={`rounded-lg px-4 py-3 text-base transition-colors ${
                active ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <Button as="a" href="#contact" onClick={onClose} size="lg" className="w-full">
          Let&apos;s Build Your Website
        </Button>
      </div>
    </div>
  );
}

MobileNav.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activeId: PropTypes.string,
};