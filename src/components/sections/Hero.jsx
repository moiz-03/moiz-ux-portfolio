import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../common/Button.jsx";
import { siteConfig } from "../../data/siteConfig.js";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-slate-800/60 min-h-162.5 lg:min-h-187.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.08),transparent_60%)]"
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-xs text-slate-300">
            <Sparkles
              className="h-3.5 w-3.5 text-cyan-400"
              aria-hidden="true"
            />
            Available for new projects
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-slate-50 sm:text-4xl md:text-5xl lg:text-[3rem]">
            {siteConfig.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#contact" size="lg">
              Let&apos;s Build Your Website
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as="a" href="#projects" size="lg" variant="secondary">
              Explore My Work
            </Button>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-linear-to-* from-cyan-500/10 via-transparent to-blue-600/10 blur-2xl"
          />
          <div aria-hidden="true" className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full bg-red-500/60"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-yellow-500/60"
                aria-hidden="true"
              />
              <span
                className="h-2.5 w-2.5 rounded-full bg-green-500/60"
                aria-hidden="true"
              />
              <div className="ml-3 flex-1 truncate rounded-md bg-slate-800/70 px-3 py-1 text-[10px] text-slate-400">
                aura-demo.moizux.dev
              </div>
            </div>
            <div className="aspect-4/3 bg-linear-to-br from-slate-900 via-slate-950 to-blue-950/40 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="h-2 w-16 rounded bg-cyan-400/70" />
                <div className="flex gap-2">
                  <div className="h-1.5 w-8 rounded bg-slate-700" />
                  <div className="h-1.5 w-8 rounded bg-slate-700" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-50/90" />
                <div className="h-4 w-1/2 rounded bg-slate-50/90" />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-2/3 rounded bg-slate-600" />
                <div className="h-1.5 w-1/2 rounded bg-slate-600" />
              </div>
              <div className="mt-5 flex gap-2">
                <div className="h-7 w-24 rounded-md bg-linear-to-r from-cyan-500 to-blue-600" />
                <div className="h-7 w-20 rounded-md border border-slate-700" />
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border border-slate-800 bg-slate-800/50"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-3 text-right text-[11px] text-slate-400">
            Preview: Aura Cosmetics — Concept Project
          </p>
        </div>
      </div>
    </section>
  );
}
