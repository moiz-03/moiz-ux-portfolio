import { SectionHeading } from '../common/SectionHeading.jsx';
import { processSteps } from '../../data/services.js';

export function Process() {
  return (
    <section id="process" className="border-b border-slate-800/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From Conversation to Launch"
          description="A clear five-step process so you always know what comes next and what is expected of both sides."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step) => (
            <li
              key={step.id}
              className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Step {step.id}
              </span>
              <h3 className="mt-2 text-base font-semibold text-slate-50">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}