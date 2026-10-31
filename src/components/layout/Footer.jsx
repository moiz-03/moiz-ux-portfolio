import { useState } from 'react';
import { Instagram, Mail, MessageCircle, Share2, Linkedin, Twitter, Link as LinkIcon, Check, Phone } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl, buildMailtoUrl } from '../../data/siteConfig.js';

export function Footer() {
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://moiz-ux.vercel.app');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-slate-50">
              MOIZ<span className="text-cyan-400">.UX</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-300">
              Modern landing pages and functional websites for brands and businesses.
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
                  {siteConfig.displayEmail}
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
              {/* NEW CLICKABLE PHONE NUMBER */}
              <li>
                <a
                  href={siteConfig.phone.link}
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.phone.display}
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
              <li>
                <a
                  href={siteConfig.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share this site
            </span>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent("https://moiz-ux.vercel.app")}&text=${encodeURIComponent("Check out MOIZ.UX — Modern landing pages and functional websites for brands.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X (Twitter)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-cyan-400"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://moiz-ux.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-cyan-400"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent("Check out MOIZ.UX — Websites That Give Your Brand a Stronger Online Presence. https://moiz-ux.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-cyan-400"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <button
                onClick={handleCopy}
                aria-label="Copy link"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-colors hover:bg-slate-700 hover:text-cyan-400"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <LinkIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-xs text-slate-300 sm:flex-row sm:items-center sm:gap-6">
            <p>© {year} MOIZ.UX. All rights reserved.</p>
            <ul className="flex flex-wrap items-center gap-4">
              <li>
                <a href="/privacy" className="transition-colors hover:text-cyan-400">Privacy</a>
              </li>
              <li>
                <a href="/terms" className="transition-colors hover:text-cyan-400">Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}