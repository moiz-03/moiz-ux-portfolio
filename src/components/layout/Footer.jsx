import { Instagram, Mail, MessageCircle } from "lucide-react";
import {
  siteConfig,
  buildWhatsAppUrl,
  buildMailtoUrl,
} from "../../data/siteConfig.js";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-slate-50">
              MOIZ<span className="text-cyan-400">.UX</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
              Modern landing pages and functional websites for brands and
              businesses.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold text-slate-50">Navigation</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-300 transition-colors hover:text-cyan-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-slate-50">Contact</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={buildMailtoUrl()}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.instagram.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} MOIZ.UX. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-4">
            <li>
              <a
                href="/privacy.html"
                className="transition-colors hover:text-cyan-400"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="/terms.html"
                className="transition-colors hover:text-cyan-400"
              >
                Terms
              </a>
            </li>
          </ul>
          <p>Built by Moiz. Hosted on the edge.</p>
        </div>
      </div>
    </footer>
  );
}
