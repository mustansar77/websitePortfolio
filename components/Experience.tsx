"use client";

import { useEffect, useRef } from "react";

const EXPERIENCES = [
  {
    role:     "Full-Stack Engineer — Freelance",
    company:  "Self-Employed / Independent",
    period:   "2022 — Present",
    type:     "Full-time",
    bullets: [
      "Built 20+ production web applications for clients across fintech, healthtech, and SaaS verticals.",
      "Designed and shipped RecoveryCircle — a full-stack peer-support platform with Google OAuth, RBAC, and transactional data architecture.",
      "Developed Docu-Pulse — a GitHub App that auto-generates documentation from AST-level code diffs, eliminating documentation drift.",
      "Integrated AI tooling (Claude, Cursor, Loveable) into development workflow, reducing delivery time by 50–70% on client projects.",
      "Architected microservice-ready Node.js backends with JWT authentication, rate limiting, and CI/CD pipelines via GitHub Actions.",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Docker", "GitHub Actions"],
  },
  {
    role:     "MERN Stack Developer",
    company:  "Contract & Agency Projects",
    period:   "2021 — 2022",
    type:     "Contract",
    bullets: [
      "Delivered 8+ full-stack MERN applications for digital agencies, handling frontend through deployment.",
      "Built reusable React component libraries with Tailwind CSS, reducing UI development time by 40%.",
      "Integrated third-party APIs including Stripe, Google Maps, and SendGrid into production applications.",
      "Optimized MongoDB aggregation pipelines, improving query performance by up to 65% on large datasets.",
    ],
    tags: ["React", "Express", "MongoDB", "REST APIs", "Tailwind CSS"],
  },
  {
    role:     "Junior Web Developer",
    company:  "Freelance — Early Career",
    period:   "2020 — 2021",
    type:     "Part-time",
    bullets: [
      "Developed responsive web interfaces using HTML, CSS, JavaScript, and early React.",
      "Built and maintained WordPress and custom CMS solutions for small businesses.",
      "Gained foundational experience with Git, REST APIs, and basic backend development.",
    ],
    tags: ["JavaScript", "React", "CSS", "HTML", "WordPress"],
  },
] as const;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="section-pad bg-[var(--bg-subtle)]"
    >
      <div className="container-tight">

        {/* Header */}
        <div className="mb-16 reveal">
          <p className="eyebrow mb-3">Experience</p>
          <h2 id="experience-heading" className="display-lg text-[var(--text-1)]">
            My journey so far
          </h2>
          <p className="mt-3 text-[var(--text-3)] max-w-xl text-[17px]">
            Three years of shipping real products for real clients — not just side projects.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 space-y-8">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="timeline-line absolute left-0 top-0 bottom-0 w-px
                       bg-gradient-to-b from-transparent via-[var(--border-md)] to-transparent"
          />

          {EXPERIENCES.map((exp, i) => (
            <article
              key={exp.role}
              className={`reveal reveal-delay-${i + 1} relative`}
              aria-labelledby={`exp-title-${i}`}
            >
              {/* Timeline dot */}
              <div
                aria-hidden="true"
                className="absolute -left-[37px] top-6 w-3.5 h-3.5 rounded-full
                           bg-brand-500 border-2 border-[var(--bg-subtle)]
                           ring-4 ring-brand-500/20"
              />

              <div className="card p-6 sm:p-8">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3
                      id={`exp-title-${i}`}
                      className="text-lg font-bold text-[var(--text-1)] tracking-tight"
                    >
                      {exp.role}
                    </h3>
                    <p className="text-[var(--text-3)] mt-0.5 text-sm font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                    <span className="tag !font-mono text-xs px-3">{exp.period}</span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                        exp.type === "Full-time"
                          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400"
                          : exp.type === "Contract"
                          ? "bg-brand-500/10 text-brand-600 border-brand-500/20 dark:text-brand-400"
                          : "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400"
                      }`}
                    >
                      {exp.type}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-5" role="list">
                  {exp.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-[var(--text-2)] leading-relaxed">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {exp.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
