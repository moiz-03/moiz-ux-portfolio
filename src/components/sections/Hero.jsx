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

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="#contact" size="lg">
              Let&apos;s Build Your Website
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <a
              href="#projects"
              className="text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
            >
              or explore my work →
            </a>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl bg-linear-to-* from-cyan-500/10 via-transparent to-blue-600/10 blur-2xl"
          />
          {/* Added contain-layout here for performance */}
          <div aria-hidden="true" className="contain-layout relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-2xl">
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
                pixel-quest-aba36.web.app
              </div>
            </div>
            
                        {/* The Image Container */}
            <div className="aspect-4/3 bg-slate-900 p-6 flex items-center justify-center overflow-hidden">
              <img 
                src="/pixel-quest.webp" 
                width="711" 
                height="373" 
                alt="Pixel Quest Dashboard Preview" 
                fetchPriority="high"
                className="w-full h-auto max-h-full object-contain rounded-md shadow-2xl border border-slate-700/50"
                style={{ aspectRatio: "711 / 373" }}
              />
            </div>
          </div>
          
          <p className="mt-3 text-right text-[11px] text-slate-400">
            Preview: Pixel Quest
          </p>
        </div>
      </div>
    </section>
  );
}