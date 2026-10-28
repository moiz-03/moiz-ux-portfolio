import PropTypes from 'prop-types';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '../common/Badge.jsx';

export function ProjectCard({ project }) {
  const { title, shortDescription, category, technologies, liveUrl, projectType, accent } = project;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 transition-colors hover:border-cyan-400/40">
      {/* Thumbnail placeholder — replace with real WebP screenshots */}
      <div aria-hidden="true" className="relative aspect-4/3 overflow-hidden border-b border-slate-800 bg-slate-950">
  <div className={`absolute inset-0 bg-linear-to-br ${accent ?? 'from-cyan-500/20 to-blue-600/20'}`} />
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="flex justify-between">
            <div className="h-1.5 w-10 rounded bg-slate-50/60" />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-50/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-50/40" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-3/4 rounded bg-slate-50/70" />
            <div className="h-1.5 w-1/2 rounded bg-slate-50/30" />
          </div>
          <div className="flex gap-2">
            <div className="h-5 w-16 rounded bg-slate-50/20" />
            <div className="h-5 w-10 rounded bg-slate-50/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-cyan-400">{category}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-50">{title}</h3>
          </div>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="-1"
              aria-hidden="true"
              className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400"
            >
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{shortDescription}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {technologies.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {projectType === 'concept' && <Badge variant="concept">Concept</Badge>}
        </div>

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            View Live Demo
            <span className="sr-only"> (opens in a new tab)</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    liveUrl: PropTypes.string,
    projectType: PropTypes.oneOf(['client', 'concept']).isRequired,
    accent: PropTypes.string,
  }).isRequired,
};