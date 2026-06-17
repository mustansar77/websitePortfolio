"use client";

import { useEffect, useRef } from "react";

const AI_TOOLS = [
  {
    name: "Claude AI",
    desc: "Architecture design, code reviews, complex problem-solving, and documentation generation.",
    icon: "◆",
    color: "from-[#d4a27f]/20 to-[#d4a27f]/5",
    ring: "border-[#d4a27f]/30",
    text: "text-[#c4884f]",
  },
  {
    name: "Cursor",
    desc: "AI-powered code editor for rapid feature implementation with intelligent autocomplete.",
    icon: "◎",
    color: "from-brand-500/15 to-brand-500/5",
    ring: "border-brand-500/25",
    text: "text-brand-500",
  },
  {
    name: "Loveable",
    desc: "Rapid UI prototyping and full-stack app generation, cutting design-to-code time by 60%.",
    icon: "♥",
    color: "from-pink-500/15 to-pink-500/5",
    ring: "border-pink-500/25",
    text: "text-pink-500",
  },
];

const VALUES = [
  { icon: "🎯", title: "Outcome-first thinking", desc: "I ship features that move metrics, not just code that compiles." },
  { icon: "⚡", title: "Vibe coding speed",       desc: "AI tools cut my delivery time in half without touching quality." },
  { icon: "🔒", title: "Security by default",     desc: "RBAC, input validation, and secure headers on every project." },
  { icon: "📈", title: "Scalable architecture",   desc: "Built to grow from MVP to enterprise without rewrites." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="section-pad bg-[var(--bg)]"
    >
      <div className="container-tight">

        {/* Header */}
        <div className="mb-16 reveal">
          <p className="eyebrow mb-3">About Me</p>
          <h2 id="about-heading" className="display-lg text-[var(--text-1)] max-w-2xl">
            Not just a developer —{" "}
            <span className="gradient-text">a modern builder.</span>
          </h2>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Left — bio */}
          <div className="reveal reveal-delay-1 space-y-5">
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed">
              I&apos;m <strong className="font-semibold text-[var(--text-1)]">Mustansar Hussain Tariq</strong>,
              a Full-Stack Software Engineer with 3+ years of experience building production-grade
              web applications. I specialize in the <strong className="text-brand-500">MERN stack and Next.js</strong> —
              turning complex requirements into clean, maintainable, scalable systems.
            </p>
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed">
              In today&apos;s fast-moving industry, being a great coder isn&apos;t enough. I&apos;ve
              integrated AI tools — Claude, Cursor, and Loveable — into my development workflow,
              which lets me deliver production-quality work{" "}
              <strong className="text-[var(--text-1)]">significantly faster</strong> than traditional
              development cycles while maintaining code quality and test coverage.
            </p>
            <p className="text-[17px] text-[var(--text-2)] leading-relaxed">
              I call this{" "}
              <span className="gradient-text font-bold">&ldquo;vibe coding&rdquo;</span>
              {" "}— a development approach where intuition, speed, and AI-assistance come
              together to ship products that clients love.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="#contact" className="btn btn-primary">Work with me</a>
              <a
                href="https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292"
                target="_blank" rel="noopener noreferrer"
                aria-label="View Mustansar Hussain Tariq's LinkedIn profile"
                className="btn btn-ghost"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0077B5]" aria-hidden="true" />
                LinkedIn profile
              </a>
            </div>
          </div>

          {/* Right — values */}
          <div className="reveal reveal-delay-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VALUES.map(v => (
              <div
                key={v.title}
                className="card p-5 group"
              >
                <span className="text-2xl mb-3 block" aria-hidden="true">{v.icon}</span>
                <h3 className="font-bold text-[var(--text-1)] text-[15px] mb-1.5">{v.title}</h3>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools section */}
        <div className="reveal reveal-delay-3">
          <div className="mb-8">
            <p className="eyebrow mb-2">Modern Developer Toolkit</p>
            <h3 className="text-2xl font-bold text-[var(--text-1)]">
              AI-augmented development workflow
            </h3>
            <p className="mt-2 text-[var(--text-3)] max-w-2xl">
              I leverage cutting-edge AI tools to write better code, faster — something
              that sets me apart in a competitive market and directly benefits every client project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AI_TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className={`reveal reveal-delay-${i + 2} gradient-border p-6 bg-[var(--bg)] rounded-[20px] group`}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 bg-gradient-to-br ${tool.color} border ${tool.ring}`}>
                  <span className={`text-xl font-bold ${tool.text}`} aria-hidden="true">{tool.icon}</span>
                </div>
                <h4 className="font-bold text-[var(--text-1)] text-base mb-2">{tool.name}</h4>
                <p className="text-sm text-[var(--text-3)] leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>

          {/* Vibe coding badge */}
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-purple-500/5 to-cyan-500/10 border border-brand-500/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🚀</span>
              <div>
                <p className="font-bold text-[var(--text-1)]">Vibe Coding = Speed + Quality</p>
                <p className="text-sm text-[var(--text-3)] mt-0.5">
                  By combining deep technical knowledge with AI-assisted development,
                  I consistently deliver in <strong className="text-brand-500">50–70% less time</strong> than
                  traditional workflows — without sacrificing architecture, security, or code quality.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
