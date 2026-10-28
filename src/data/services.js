/**
 * Service offerings — see DATA_MODEL.md §2.2.
 */
export const services = [
  {
    id: 'srv-landing',
    title: 'Landing Pages',
    subtitle: 'Focused single-page experiences',
    targetAudience: 'Brands, products, services, and campaigns that need a focused web presence.',
    deliverables: [
      'Hero section with a clear value proposition',
      'Features or service sections',
      'Product or promotional sections',
      'Client-approved testimonials',
      'FAQ section',
      'Contact information and CTAs',
      'Responsive mobile and desktop layouts',
    ],
    problemSolved: 'Turns ad traffic and social visitors into enquiries with one clear, high-converting page.',
    ctaLabel: 'Start a Landing Page',
    iconName: 'Rocket',
  },
  {
    id: 'srv-business',
    title: 'Business & Portfolio Websites',
    subtitle: 'Multi-page brand home',
    targetAudience: 'Businesses, creators, and professionals needing a comprehensive presentation.',
    deliverables: [
      'Home page',
      'About page or brand story',
      'Services or portfolio page',
      'Project or product showcases',
      'Contact page',
      'Social media links',
    ],
    problemSolved: 'Establishes a credible, professional online identity that supports long-term growth.',
    ctaLabel: 'Build Your Site',
    iconName: 'LayoutGrid',
  },
  {
    id: 'srv-functional',
    title: 'Functional Websites',
    subtitle: 'Beyond static content',
    targetAudience: 'Clients who need dynamic functionality, not just informational pages.',
    deliverables: [
      'Contact and enquiry forms',
      'Database-backed content',
      'Dynamic project or product listings',
      'Basic content management',
      'Third-party integrations when appropriate',
    ],
    problemSolved: 'Solves real workflow problems with interactive, maintainable features.',
    ctaLabel: 'Discuss a Build',
    iconName: 'Cpu',
  },
];

export const processSteps = [
  {
    id: 1,
    title: 'Discovery',
    description: 'Understand your business, audience, objectives, and requirements.',
  },
  {
    id: 2,
    title: 'Planning',
    description: 'Agree on scope, content, features, timeline, and budget.',
  },
  {
    id: 3,
    title: 'Development',
    description: 'Build the agreed website and functionality.',
  },
  {
    id: 4,
    title: 'Review',
    description: 'Test the website and collect agreed feedback.',
  },
  {
    id: 5,
    title: 'Launch',
    description: 'Deploy the approved website and provide the agreed handover.',
  },
];

export const whyUsPoints = [
  { title: 'Direct communication', description: 'Talk directly with the developer — no account managers or relay chains.' },
  { title: 'Clear project scope', description: 'You know exactly what you are getting before development starts.' },
  { title: 'Responsive by default', description: 'Built for mobile-first traffic, tested on real devices, not just desktop.' },
  { title: 'Functionality first', description: 'Sites are built to work — not just to look good in screenshots.' },
  { title: 'Maintainable code', description: 'Clean, documented structure so your site can grow with you.' },
  { title: 'Honest expectations', description: 'Transparent discussion of what fits your budget, timeline, and goals.' },
];