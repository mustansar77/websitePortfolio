"use client";

import { useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: "1",
    title: "RecoveryCircle",
    subtitle: "Peer-support community platform",
    tagline: "Where secure engineering meets human sensitivity.",
    description:
      "A full-stack community platform serving users in sensitive addiction-recovery journeys. Passwordless Google OAuth, three-tier RBAC enforced server-side, and MongoDB transactions guaranteeing ACID consistency.",
    tags: ["Next.js 15", "TypeScript", "Google OAuth", "MongoDB", "Node.js", "JWT", "RBAC", "Tailwind CSS"],
    status: "live" as const,
    featured: true,
    highlights: [
      "Google OAuth — passwordless sign-in",
      "3-tier RBAC enforced server-side",
      "ACID-safe transactional writes",
      "WCAG 2.1 AA accessibility",
    ],
    gradient: "from-brand-500 via-violet-500 to-purple-600",
    gradientLight: "from-brand-500/10 via-violet-500/5 to-transparent",
    icon: "🛡️",
    githubUrl: "https://github.com/mustansar",
    liveUrl: "#",
  },
  {
    id: "2",
    title: "Docu-Pulse",
    subtitle: "GitHub documentation automation",
    tagline: "Zero documentation drift. Every merge, guaranteed.",
    description:
      "A GitHub App that watches every pull request, performs AST-level diff analysis on changed files, and auto-generates or patches JSDoc/markdown documentation in the same PR.",
    tags: ["Node.js", "TypeScript", "GitHub Apps API", "AST Parsing", "OpenAI API", "Docker", "Webhooks"],
    status: "wip" as const,
    featured: false,
    highlights: [
      "GitHub App — zero-config install",
      "AST-level semantic diff analysis",
      "Auto-patches JSDoc & Markdown",
      "Slack webhook notifications",
    ],
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    gradientLight: "from-cyan-500/10 via-teal-500/5 to-transparent",
    icon: "⚡",
    githubUrl: "https://github.com/mustansar",
    liveUrl: null,
  },
  {
    id: "3",
    title: "RecoveryCircle",
    subtitle: "Peer-support community platform",
    tagline: "Where secure engineering meets human sensitivity.",
    description:
      "A full-stack community platform serving users in sensitive addiction-recovery journeys. Passwordless Google OAuth, three-tier RBAC enforced server-side, and MongoDB transactions guaranteeing ACID consistency.",
    tags: ["Next.js 15", "TypeScript", "Google OAuth", "MongoDB", "Node.js", "JWT", "RBAC", "Tailwind CSS"],
    status: "live" as const,
    featured: true,
    highlights: [
      "Google OAuth — passwordless sign-in",
      "3-tier RBAC enforced server-side",
      "ACID-safe transactional writes",
      "WCAG 2.1 AA accessibility",
    ],
    gradient: "from-brand-500 via-violet-500 to-purple-600",
    gradientLight: "from-brand-500/10 via-violet-500/5 to-transparent",
    icon: "🛡️",
    githubUrl: "https://github.com/mustansar",
    liveUrl: "#",
  },
  {
    id: "4",
    title: "Docu-Pulse",
    subtitle: "GitHub documentation automation",
    tagline: "Zero documentation drift. Every merge, guaranteed.",
    description:
      "A GitHub App that watches every pull request, performs AST-level diff analysis on changed files, and auto-generates or patches JSDoc/markdown documentation in the same PR.",
    tags: ["Node.js", "TypeScript", "GitHub Apps API", "AST Parsing", "OpenAI API", "Docker", "Webhooks"],
    status: "wip" as const,
    featured: false,
    highlights: [
      "GitHub App — zero-config install",
      "AST-level semantic diff analysis",
      "Auto-patches JSDoc & Markdown",
      "Slack webhook notifications",
    ],
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    gradientLight: "from-cyan-500/10 via-teal-500/5 to-transparent",
    icon: "⚡",
    githubUrl: "https://github.com/mustansar",
    liveUrl: null,
  },
  {
    id: "5",
    title: "RecoveryCircle",
    subtitle: "Peer-support community platform",
    tagline: "Where secure engineering meets human sensitivity.",
    description:
      "A full-stack community platform serving users in sensitive addiction-recovery journeys. Passwordless Google OAuth, three-tier RBAC enforced server-side, and MongoDB transactions guaranteeing ACID consistency.",
    tags: ["Next.js 15", "TypeScript", "Google OAuth", "MongoDB", "Node.js", "JWT", "RBAC", "Tailwind CSS"],
    status: "live" as const,
    featured: true,
    highlights: [
      "Google OAuth — passwordless sign-in",
      "3-tier RBAC enforced server-side",
      "ACID-safe transactional writes",
      "WCAG 2.1 AA accessibility",
    ],
    gradient: "from-brand-500 via-violet-500 to-purple-600",
    gradientLight: "from-brand-500/10 via-violet-500/5 to-transparent",
    icon: "🛡️",
    githubUrl: "https://github.com/mustansar",
    liveUrl: "#",
  },
  {
    id: "6",
    title: "Docu-Pulse",
    subtitle: "GitHub documentation automation",
    tagline: "Zero documentation drift. Every merge, guaranteed.",
    description:
      "A GitHub App that watches every pull request, performs AST-level diff analysis on changed files, and auto-generates or patches JSDoc/markdown documentation in the same PR.",
    tags: ["Node.js", "TypeScript", "GitHub Apps API", "AST Parsing", "OpenAI API", "Docker", "Webhooks"],
    status: "wip" as const,
    featured: false,
    highlights: [
      "GitHub App — zero-config install",
      "AST-level semantic diff analysis",
      "Auto-patches JSDoc & Markdown",
      "Slack webhook notifications",
    ],
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    gradientLight: "from-cyan-500/10 via-teal-500/5 to-transparent",
    icon: "⚡",
    githubUrl: "https://github.com/mustansar",
    liveUrl: null,
  },
] as const;

const STATUS = {
  live: { label: "Live",        dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400" },
  wip:  { label: "In Progress", dot: "bg-amber-400",   badge: "bg-amber-500/10   text-amber-600   border-amber-500/20   dark:text-amber-400"   },
} as const;

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="section-pad bg-[var(--bg)]"
    >
      <div className="container-tight">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 reveal">
          <div>
            <p className="eyebrow mb-3">Projects</p>
            <h2 id="projects-heading" className="display-lg text-[var(--text-1)]">
              Selected work
            </h2>
            <p className="mt-3 text-[var(--text-3)] max-w-md text-base sm:text-[17px]">
              Production systems built to solve real problems — not just demos.
            </p>
          </div>
          <a
            href="https://github.com/mustansar"
            target="_blank" rel="noopener noreferrer"
            aria-label="Browse more projects on GitHub"
            className="btn btn-ghost shrink-0 self-start"
          >
            <GitHubIcon className="w-4 h-4" aria-hidden="true" />
            More on GitHub
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => {
            const st = STATUS[p.status];
            return (
              <article
                key={p.id}
                aria-labelledby={`proj-${p.id}`}
                className={`reveal reveal-delay-${i + 1} group flex flex-col rounded-3xl overflow-hidden
                            border border-[var(--border)] bg-[var(--bg)]
                            shadow-[var(--shadow-sm)]
                            hover:shadow-[0_0_0_1px_rgba(99,102,241,.18),0_20px_50px_rgba(99,102,241,.1)]
                            hover:-translate-y-1 transition-all duration-300`}
              >
                {/* ── Card header with gradient bg ─────── */}
                <div className={`relative h-40 bg-gradient-to-br ${p.gradientLight} flex items-end p-6 overflow-hidden`}>
                  {/* Decorative blurred orb */}
                  <div className={`absolute -top-8 -right-8 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${p.gradient}`} aria-hidden="true" />

                  {/* Number watermark */}
                  <span
                    aria-hidden="true"
                    className="absolute right-6 top-4 text-7xl font-black leading-none select-none
                               text-[var(--text-1)] opacity-[0.04]"
                  >
                    0{i + 1}
                  </span>

                  {/* Icon bubble */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0
                                bg-[var(--bg)] border border-[var(--border)] shadow-[var(--shadow-md)]
                                group-hover:scale-110 transition-transform duration-300`}
                  >
                    {p.icon}
                  </div>

                  {/* Gradient top accent line */}
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${p.gradient}`} aria-hidden="true" />
                </div>

                {/* ── Card body ────────────────────────── */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Status + featured badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${st.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${p.status === "live" ? "animate-pulse" : ""}`} aria-hidden="true" />
                      {st.label}
                    </span>
                    {p.featured && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 border border-brand-500/20 dark:text-brand-400">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Title + subtitle */}
                  <h3 id={`proj-${p.id}`} className="text-xl font-bold text-[var(--text-1)] tracking-tight mb-0.5">
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-500 tracking-wide mb-3">
                    {p.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-3)] leading-relaxed mb-5 flex-1">
                    {p.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5" role="list" aria-label={`Key features of ${p.title}`}>
                    {p.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-[var(--text-3)]">
                        <span
                          className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center
                                     bg-brand-500/15 border border-brand-500/25"
                          aria-hidden="true"
                        >
                          <svg className="w-2.5 h-2.5 text-brand-500" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6" aria-label={`Technologies used in ${p.title}`}>
                    {p.tags.map(t => <span key={t} className="tag text-[11px]">{t}</span>)}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[var(--border)]">
                    <a
                      href={p.githubUrl}
                      target="_blank" rel="noopener noreferrer"
                      aria-label={`View ${p.title} source on GitHub`}
                      className="btn btn-ghost !text-sm !py-2 !px-4 flex-1 justify-center"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" aria-hidden="true" />
                      Code
                    </a>
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank" rel="noopener noreferrer"
                        aria-label={`Visit ${p.title} live demo`}
                        className="btn btn-primary !text-sm !py-2 !px-4 flex-1 justify-center"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                        Live Demo
                      </a>
                    ) : (
                      <span className="btn !text-sm !py-2 !px-4 flex-1 justify-center opacity-50 cursor-not-allowed
                                       bg-[var(--bg-muted)] text-[var(--text-4)] border border-[var(--border)]">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="reveal mt-10 rounded-3xl border border-[var(--border)]
                     bg-gradient-to-r from-brand-500/5 via-violet-500/5 to-cyan-500/5
                     p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <div>
            <p className="font-bold text-[var(--text-1)] text-lg mb-1">
              Want to see more?
            </p>
            <p className="text-sm text-[var(--text-3)]">
              More projects in the pipeline — check my GitHub or get in touch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://github.com/mustansar"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-ghost !text-sm !py-2.5 !px-5"
            >
              <GitHubIcon className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
            <a href="#contact" className="btn btn-primary !text-sm !py-2.5 !px-5">
              Start a project
            </a>
          </div>
        </div>
      </div>
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
