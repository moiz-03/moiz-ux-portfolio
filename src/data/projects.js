/**
 * Portfolio projects — see DATA_MODEL.md §2.1 for schema.
 */
export const projects = [
  {
    id: 'prj-001',
    title: 'Pixel Quest',
    slug: 'pixel-quest',
    shortDescription: 'A gamified habit tracker built to turn daily routines into an RPG-style adventure with XP, levels, and streaks.',
    category: 'Functional Web App',
    technologies: ['React', 'Tailwind CSS', 'Firebase'],
    projectType: 'concept',
    isFeatured: true,
    order: 1,
    liveUrl: 'https://pixel-quest-aba36.web.app/',
    imageUrl: '/pixel-quest.webp',
    accent: 'from-emerald-500/20 to-cyan-600/20',
  },
  {
    id: 'prj-002',
    title: 'Bella Vista Restaurant',
    slug: 'bella-vista',
    shortDescription: 'A high-converting, mobile-first landing page for a local Italian restaurant featuring menu highlights and a reservation call-to-action.',
    category: 'Landing Page',
    technologies: ['React', 'Tailwind CSS', 'Vite'],
    projectType: 'concept',
    isFeatured: true,
    order: 2,
    liveUrl: 'https://google.com', // Replace with your live demo when built
    imageUrl: '/pixel-quest.webp', // Replace with new screenshot
    accent: 'from-red-500/20 to-orange-600/20',
  },
  {
    id: 'prj-003',
    title: 'Apex Fitness',
    slug: 'apex-fitness',
    shortDescription: 'A multi-page business website for a personal trainer, including schedule, pricing, and a lead-generation form.',
    category: 'Business Website',
    technologies: ['React', 'Tailwind CSS'],
    projectType: 'concept',
    isFeatured: false,
    order: 3,
    liveUrl: 'https://google.com', // Replace with your live demo when built
    imageUrl: '/pixel-quest.webp', // Replace with new screenshot
    accent: 'from-blue-500/20 to-purple-600/20',
  }
];

export const projectCategories = ['All', 'Landing Page', 'Business Website', 'Functional Web App', 'Portfolio'];