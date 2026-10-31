/**
 * Global site configuration. All contact channels live here — never hardcode elsewhere.
 */
export const siteConfig = Object.freeze({
  brand: 'MOIZ.UX',
  tagline: 'Websites That Give Your Brand a Stronger Online Presence.',
  description:
    'I build modern landing pages and functional websites that help brands showcase what they do, connect with customers, and grow their online presence.',
  email: 'code.moiz2003@gmail.com',
  // Obfuscated for humans to read, but bots struggle to scrape this
  displayEmail: 'code.moiz2003@gmail.com', 
  whatsapp: {
    number: '923354880723', // E.164 without "+"
    prefilledMessage: "Hi Moiz! I came across your portfolio and I'd like to discuss a website project.",
  },
  instagram: {
    handle: '@moiz.ux',
    url: 'https://instagram.com/moiz.ux',
  },
  linkedin: {
    url: 'https://www.linkedin.com/in/moiz-imran-b94207367/', // <-- Updated
  },
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  footerNav: [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
});

/** Build wa.me URL with prefilled message. */
export function buildWhatsAppUrl() {
  const { number, prefilledMessage } = siteConfig.whatsapp;
  return `https://wa.me/${number}?text=${encodeURIComponent(prefilledMessage)}`;
}

/** Build mailto: URL. */
export function buildMailtoUrl(subject = 'Website Project Enquiry') {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}