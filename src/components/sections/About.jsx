import { SectionHeading } from '../common/SectionHeading.jsx';
import { Card } from '../common/Card.jsx';
import { Code2, Monitor, Server, GitBranch, MapPin } from 'lucide-react';

const tools = [
  { name: 'React', icon: Code2 },
  { name: 'Tailwind CSS', icon: Monitor },
  { name: 'Node & Vite', icon: Server },
  { name: 'Git & GitHub', icon: GitBranch },
];

export function About() {
  return (
    <section id="about" className="border-b border-slate-800/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          
          <div>
            <SectionHeading
              eyebrow="About"
              title="Hi, I'm Moiz."
              description="I build websites for small businesses, independent brands, and creators who need a real online home — not just a social profile."
              align="left"
            />
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4" />
              Based in Pakistan, working globally.
            </div>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400">
              I focus on the fundamentals: clean layout, fast load times, and functional pages that
              actually help visitors do what they came to do. Each project starts with listening — what
              are you trying to accomplish, and what does your site need to do to support that?
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              I&apos;m comfortable saying what I can and cannot deliver honestly. If a feature is out of
              scope or needs a specialist, you&apos;ll hear it upfront — not halfway through a build.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {/* Add your photo here */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
              <img 
                src="/moiz.jpg" 
                alt="Moiz - Web Developer" 
                className="aspect-video w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="aspect-video w-full hidden items-center justify-center bg-slate-800 text-slate-500 text-sm">
                Add moiz.jpg to public folder
              </div>
            </div>

            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Tools I Use
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {tools.map(({ name, icon: Icon }) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2.5"
                  >
                    <Icon className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                    <span className="text-sm text-slate-300">{name}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}