import { SectionHeading } from '../common/SectionHeading.jsx';
import { Check } from 'lucide-react';
import { whyUsPoints } from '../../data/services.js';

export function WhyUs() {
  return (
    <section id="why-us" className="border-b border-slate-800/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why Work With Me"
          title="Practical. Honest. Direct."
          description="No jargon, no inflated promises — just clear communication and a site that works."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyUsPoints.map((point) => (
            <li
              key={point.title}
              className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-400">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-50">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{point.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}