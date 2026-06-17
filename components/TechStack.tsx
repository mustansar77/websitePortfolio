"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Tech = { name: string; icon: string; desc: string; color: string; ring: string };
type Category = { id: string; label: string; emoji: string; items: Tech[] };

const CATEGORIES: Category[] = [
  {
    id: "frontend", label: "Frontend", emoji: "🎨",
    items: [
      { name: "Next.js 15",    icon: "▲", desc: "App Router, RSC, streaming",    color: "bg-slate-900 text-white",      ring: "ring-slate-900/20" },
      { name: "React 19",      icon: "⚛", desc: "Concurrent, server components", color: "bg-sky-500   text-white",      ring: "ring-sky-500/20"   },
      { name: "TypeScript",    icon: "TS",desc: "Strict mode, full type safety",  color: "bg-blue-600  text-white",      ring: "ring-blue-600/20"  },
      { name: "Tailwind CSS",  icon: "✦", desc: "Utility-first, responsive",     color: "bg-cyan-500  text-white",      ring: "ring-cyan-500/20"  },
    ],
  },
  {
    id: "backend", label: "Backend", emoji: "⚙️",
    items: [
      { name: "Node.js",   icon: "⬡", desc: "Event-loop, streams, workers",   color: "bg-green-600 text-white",  ring: "ring-green-600/20" },
      { name: "Express",   icon: "Ex",desc: "REST APIs, middleware layers",    color: "bg-slate-700 text-white",  ring: "ring-slate-700/20" },
      { name: "REST APIs", icon: "⇄", desc: "OpenAPI, versioning, auth",      color: "bg-violet-600 text-white", ring: "ring-violet-600/20"},
      { name: "GraphQL",   icon: "◈", desc: "Schema-first, resolvers",        color: "bg-pink-600  text-white",  ring: "ring-pink-600/20"  },
    ],
  },
  {
    id: "data", label: "Data", emoji: "🗄️",
    items: [
      { name: "MongoDB",    icon: "🍃",desc: "Atlas, aggregation pipelines",   color: "bg-emerald-600 text-white", ring: "ring-emerald-600/20"},
      { name: "PostgreSQL", icon: "🐘",desc: "ACID, complex joins, indexes",   color: "bg-indigo-600  text-white", ring: "ring-indigo-600/20" },
      { name: "Supabase",   icon: "⚡",desc: "Auth, realtime, edge functions", color: "bg-teal-600    text-white", ring: "ring-teal-600/20"   },
      { name: "Redis",      icon: "⬤", desc: "Caching, pub/sub, sessions",    color: "bg-red-600     text-white", ring: "ring-red-600/20"    },
    ],
  },
  {
    id: "devops", label: "DevOps", emoji: "🚀",
    items: [
      { name: "Docker",          icon: "🐳",desc: "Multi-stage builds, compose",  color: "bg-sky-600   text-white", ring: "ring-sky-600/20"   },
      { name: "GitHub Actions",  icon: "⚙", desc: "CI/CD, matrix builds, caches", color: "bg-slate-800 text-white", ring: "ring-slate-800/20" },
      { name: "Vercel",          icon: "△", desc: "Edge, ISR, analytics",         color: "bg-zinc-900  text-white", ring: "ring-zinc-900/20"  },
      { name: "Git",             icon: "⑂", desc: "Branching, rebase, hooks",     color: "bg-orange-600 text-white",ring: "ring-orange-600/20"},
    ],
  },
];

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("frontend");

  const active = CATEGORIES.find(c => c.id === activeTab)!;

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative py-28 bg-surface-subtle overflow-hidden"
    >
      {/* Section divider top */}
      <div aria-hidden="true" className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-overlay to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow text-brand-600 mb-3">Technology</p>
            <h2 id="stack-heading" className="headline text-ink">
              My engineering toolkit
            </h2>
            <p className="mt-3 text-ink-tertiary max-w-lg">
              A curated, battle-tested stack optimised for shipping fast
              without sacrificing code quality or long-term maintainability.
            </p>
          </div>

          <a
            href="https://github.com/mustansar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Browse Mustansar's open-source code on GitHub"
            className="btn-ghost shrink-0 self-start sm:self-auto"
          >
            <GitHubIcon className="w-4 h-4" aria-hidden="true" />
            GitHub profile
          </a>
        </div>

        {/* Tab switcher */}
        <div
          className="flex flex-wrap gap-2 mb-10"
          role="tablist"
          aria-label="Technology categories"
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`panel-${cat.id}`}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150",
                activeTab === cat.id
                  ? "bg-brand-600 text-white shadow-md shadow-brand-600/25"
                  : "bg-white text-ink-tertiary border border-surface-overlay hover:border-brand-200 hover:text-ink"
              )}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech grid */}
        <div
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-label={active.label}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger"
        >
          {active.items.map(tech => (
            <article
              key={tech.name}
              onMouseEnter={() => setHovered(tech.name)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "shimmer-card card p-5 cursor-default group",
                hovered === tech.name && "ring-2 " + tech.ring
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    "text-sm font-bold shrink-0",
                    "group-hover:scale-110 transition-transform duration-200",
                    tech.color
                  )}
                  aria-hidden="true"
                >
                  {tech.icon}
                </span>
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full mt-1 transition-all duration-200",
                    hovered === tech.name ? "bg-brand-500 scale-125" : "bg-surface-overlay"
                  )}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-semibold text-ink text-[15px] mb-1 tracking-tight">
                {tech.name}
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">{tech.desc}</p>
            </article>
          ))}
        </div>

        {/* Bottom bento row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: "📦",
              title: "Clean architecture",
              body: "Feature-sliced, domain-driven folder structures that scale from MVP to enterprise.",
            },
            {
              icon: "🔒",
              title: "Security-first",
              body: "RBAC, JWT rotation, prepared statements, and Content-Security-Policy on every project.",
            },
            {
              icon: "📈",
              title: "Performance obsessed",
              body: "Core Web Vitals, code-splitting, caching layers, and bundle analysis on every build.",
            },
          ].map(item => (
            <div
              key={item.title}
              className="card p-5 flex gap-4 items-start"
            >
              <span className="text-2xl shrink-0" aria-hidden="true">{item.icon}</span>
              <div>
                <p className="font-semibold text-ink text-[15px] mb-1">{item.title}</p>
                <p className="text-xs text-ink-muted leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section divider bottom */}
      <div aria-hidden="true" className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-overlay to-transparent" />
    </section>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
