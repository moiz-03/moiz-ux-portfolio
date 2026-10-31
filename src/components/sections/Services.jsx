import { Rocket, LayoutGrid, Cpu } from "lucide-react";
import { SectionHeading } from "../common/SectionHeading.jsx";
import { Card } from "../common/Card.jsx";
import { Button } from "../common/Button.jsx";
import { services } from "../../data/services.js";

const iconMap = { Rocket, LayoutGrid, Cpu };

export function Services() {
  return (
    <section
      id="services"
      className="border-b border-slate-800/60 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          description="Three clear service tiers. Every project begins with a scoping conversation to confirm what fits your goals."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] ?? Rocket;
            return (
              <Card
                key={service.id}
                interactive
                className="flex h-full flex-col p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-50">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {service.subtitle}
                </p>
                <div className="mt-4 flex items-center justify-between border-y border-slate-800 py-2 text-sm">
                  <span className="font-semibold text-cyan-400">
                    {service.price}
                  </span>
                  <span className="text-slate-400">{service.timeline}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  <span className="font-medium text-slate-200">For: </span>
                  {service.targetAudience}
                </p>

                <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-400">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400"
                        aria-hidden="true"
                      />
                      {d}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs leading-relaxed text-slate-400">
                  {service.problemSolved}
                </p>

                <Button
                  as="a"
                  href="#contact"
                  variant="secondary"
                  className="mt-5 w-full"
                >
                  {service.ctaLabel}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
