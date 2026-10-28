/**
 * Portfolio projects — see DATA_MODEL.md §2.1 for schema.
 * All entries labeled "concept" are self-initiated demonstrations, not client work.
 */
export const projects = [
  {
    id: 'prj-001',
    title: 'Aura Cosmetics — Landing Page',
    slug: 'aura-cosmetics',
    shortDescription:
      'High-converting single-page storefront concept with interactive product variant selection and a streamlined checkout flow.',
    category: 'Landing Page',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    projectType: 'concept',
    isFeatured: true,
    order: 1,
    accent: 'from-pink-500/20 to-purple-600/20',
  },
  {
    id: 'prj-002',
    title: 'Meridian Café — Business Website',
    slug: 'meridian-cafe',
    shortDescription:
      'Multi-section business website concept for a specialty coffee shop, featuring a menu, story page, and location map.',
    category: 'Business Website',
    technologies: ['React', 'Tailwind CSS'],
    projectType: 'concept',
    isFeatured: true,
    order: 2,
    accent: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 'prj-003',
    title: 'Kai Larsen — Photographer Portfolio',
    slug: 'kai-larsen',
    shortDescription:
      'Minimalist image-first portfolio concept with fullscreen galleries and a lightweight lightbox viewer.',
    category: 'Portfolio',
    technologies: ['React', 'Tailwind CSS'],
    projectType: 'concept',
    isFeatured: true,
    order: 3,
    accent: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    id: 'prj-004',
    title: 'TaskFlow — Functional Web App',
    slug: 'taskflow',
    shortDescription:
      'Lightweight productivity app concept with local persistence, drag-and-drop boards, and keyboard shortcuts.',
    category: 'Functional Web App',
    technologies: ['React', 'Tailwind CSS', 'LocalStorage'],
    projectType: 'concept',
    isFeatured: false,
    order: 4,
    accent: 'from-emerald-500/20 to-teal-600/20',
  },
  {
    id: 'prj-005',
    title: 'Verde Studio — Fitness Landing',
    slug: 'verde-studio',
    shortDescription:
      'Conversion-focused landing page concept for a boutique fitness studio with a class booking enquiry form.',
    category: 'Landing Page',
    technologies: ['React', 'Tailwind CSS'],
    projectType: 'concept',
    isFeatured: false,
    order: 5,
    accent: 'from-lime-500/20 to-green-600/20',
  },
  {
    id: 'prj-006',
    title: 'Oak & Thread — Boutique Store',
    slug: 'oak-and-thread',
    shortDescription:
      'Elegant product showcase concept for a clothing label with a collection grid and story-led brand narrative.',
    category: 'Business Website',
    technologies: ['React', 'Tailwind CSS'],
    projectType: 'concept',
    isFeatured: false,
    order: 6,
    accent: 'from-rose-500/20 to-amber-600/20',
  },
];

export const projectCategories = ['All', 'Landing Page', 'Business Website', 'Functional Web App', 'Portfolio'];