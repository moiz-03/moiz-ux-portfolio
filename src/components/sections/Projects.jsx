import { useMemo, useState } from 'react';
import { SectionHeading } from '../common/SectionHeading.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import { projects, projectCategories } from '../../data/projects.js';

export function Projects() {
  const [filter, setFilter] = useState('All');

  const visible = useMemo(() => {
    const list = [...projects].sort((a, b) => a.order - b.order);
    return filter === 'All' ? list : list.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="border-b border-slate-800/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I've Built"
          description="Concept demonstrations and personal builds. Each card labels its type honestly — client vs concept."
        />

        <div
          role="group"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {projectCategories.map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(cat)}
                className={`min-h-9 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-400'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-slate-400">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}