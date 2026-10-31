import PropTypes from "prop-types";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "../common/Badge.jsx";

export function ProjectCard({ project }) {
  const {
    title,
    shortDescription,
    category,
    technologies,
    liveUrl,
    projectType,
    accent,
  } = project;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 transition-colors hover:border-cyan-400/40">
      {/* Project Image */}
      {/* Project Image */}
            <div className="relative aspect-4/3 overflow-hidden border-b border-slate-800 bg-slate-900 flex items-center justify-center p-4">
        {project.imageUrl ? (
          <>
            {/* Skeleton Loader */}
            <div 
              id={`skeleton-${project.id}`}
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 animate-pulse text-slate-400"
            >
              <span className="text-sm font-medium">Loading...</span>
            </div>

            <img
              src={project.imageUrl}
              width="694"
              height="364"
              alt={`${title} screenshot`}
              className="w-full h-auto max-h-full object-contain rounded-md shadow-2xl transition-all duration-500 group-hover:scale-105 relative z-10 opacity-0"
              onLoad={(e) => {
                document.getElementById(`skeleton-${project.id}`).style.display = 'none';
                e.target.classList.replace('opacity-0', 'opacity-100');
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                document.getElementById(`skeleton-${project.id}`).innerHTML = '<span class="text-sm font-medium">Image unavailable</span>';
              }}
            />
          </>
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${accent ?? 'from-cyan-500/20 to-blue-600/20'}`} />
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-cyan-400">
              {category}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-slate-50">
              {title}
            </h3>
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

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
          {shortDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {technologies.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
          {projectType === "concept" && (
            <Badge variant="concept">Concept</Badge>
          )}
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
    imageUrl: PropTypes.string,
    projectType: PropTypes.oneOf(["client", "concept"]).isRequired,
    accent: PropTypes.string,
  }).isRequired,
};
