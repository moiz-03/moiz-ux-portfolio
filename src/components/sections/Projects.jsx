import { useMemo, useState } from "react";
import { SectionHeading } from "../common/SectionHeading.jsx";
import { ProjectCard } from "./ProjectCard.jsx";
import { projects, projectCategories } from "../../data/projects.js";
import { SearchX } from "lucide-react";

export function Projects() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(() => {
    const list = [...projects].sort((a, b) => a.order - b.order);
    return filter === "All" ? list : list.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id="projects"
      className="border-b border-slate-800/60 py-20 sm:py-24"
    >
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
                    ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-400"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200"
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
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 py-16 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
              <SearchX className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-slate-50">
              No projects found
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-400">
              {"I haven't added any projects to the "}
              <span className="font-semibold text-slate-200">{`"${filter}"`}</span>
              {" category yet. Check back soon or explore my other work."}
            </p>
            <button
              onClick={() => setFilter("All")}
              className="mt-6 rounded-lg bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-400 transition-colors hover:bg-cyan-400/20"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
