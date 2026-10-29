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
    accent: 'from-emerald-500/20 to-cyan-600/20', 
    imageUrl: '/pixel-quest.png',
  },
];

export const projectCategories = ['All', 'Landing Page', 'Business Website', 'Functional Web App', 'Portfolio'];