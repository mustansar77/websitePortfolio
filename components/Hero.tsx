"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import profileImage from "../public/profile.png"

const ROLES = [
  "Full-Stack Engineer",
  "Next.js Specialist",
  "MERN Stack Developer",
  "AI-Augmented Builder",
  "TypeScript Advocate",
];

const LINKEDIN = "https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292";

export default function Hero() {
  const [roleIdx,    setRoleIdx   ] = useState(0);
  const [displayed,  setDisplayed ] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [imgError,   setImgError  ] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Typewriter ──────────────────────────────────────── */
  useEffect(() => {
    const full = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < full.length)
      t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 80);
    else if (!isDeleting && displayed.length === full.length)
      t = setTimeout(() => setIsDeleting(true), 2200);
    else if (isDeleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(full.slice(0, displayed.length - 1)), 42);
    else { setIsDeleting(false); setRoleIdx(i => (i + 1) % ROLES.length); }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx]);

  /* ── Cursor blink ─────────────────────────────────────── */
  useEffect(() => {
    const t = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  /* ── Floating particles ───────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 1.4 + .4,
      a: Math.random() * .22 + .05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = document.documentElement.classList.contains("dark");
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;  if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(129,140,248,${p.a})`
          : `rgba(99,102,241,${p.a * .55})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero-bg dot-grid relative min-h-screen py-36 sm:pt-0  flex items-center overflow-hidden"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Large bg word */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none
                   text-[clamp(7rem,20vw,18rem)] font-black leading-none
                   text-[var(--bg-muted)] opacity-50 dark:opacity-20"
      >
        DEV
      </span>

      {/* ── Main content — two columns on md+ ──────────────── */}
      <div className="container-tight relative z-10 w-full pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left ─────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7
                         bg-[var(--bg)] border border-[var(--border)] shadow-[var(--shadow-sm)]
                         animate-[fadeUp_.7s_cubic-bezier(.22,1,.36,1)_both]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-[var(--text-3)] tracking-wide">
                Open to new opportunities
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-heading"
              className="display-xl text-[var(--text-1)] mb-3
                         animate-[fadeUp_.7s_.1s_cubic-bezier(.22,1,.36,1)_both]"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Mustansar</span>
              <br />Hussain.
            </h1>

            {/* Typewriter */}
            <div
              className="h-8 sm:h-9 text-lg sm:text-xl font-semibold text-[var(--text-3)] mb-5
                         animate-[fadeUp_.7s_.2s_cubic-bezier(.22,1,.36,1)_both]"
            >
              <span>{displayed}</span>
              <span
                className="inline-block w-[2px] h-5 bg-brand-500 ml-0.5 align-middle rounded-sm"
                style={{ opacity: showCursor ? 1 : 0, transition: "opacity .1s" }}
                aria-hidden="true"
              />
            </div>

            {/* Sub-copy */}
            <p
              className="text-base sm:text-[17px] text-[var(--text-3)] leading-relaxed max-w-lg mb-8
                         animate-[fadeUp_.7s_.3s_cubic-bezier(.22,1,.36,1)_both]"
            >
              I build{" "}
              <strong className="font-semibold text-[var(--text-2)]">scalable web products</strong>{" "}
              — full-stack SaaS, custom MVPs, and automation tools.
              I pair deep engineering with{" "}
              <span className="text-brand-500 font-semibold">AI-powered development</span>{" "}
              (Claude, Cursor, Loveable) to ship{" "}
              <em>faster and smarter</em>.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 mb-10
                         animate-[fadeUp_.7s_.4s_cubic-bezier(.22,1,.36,1)_both]"
            >
              <a href="#projects" className="btn btn-primary">
                View My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in Touch
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Mustansar Hussain Tariq on LinkedIn"
                className="btn btn-ghost"
              >
                <LinkedInIcon className="w-4 h-4 text-[#0077B5]" aria-hidden="true" />
                LinkedIn
              </a>
            </div>

            {/* Stats grid — 2×2 on mobile, 4-col on sm+ */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4
                         animate-[fadeUp_.7s_.5s_cubic-bezier(.22,1,.36,1)_both]"
              aria-label="Career highlights"
            >
              {[
                { n: "3+",  l: "Years coding"       },
                { n: "20+", l: "Projects shipped"   },
                { n: "5+",  l: "Tech domains"       },
                { n: "AI",  l: "Augmented workflow" },
              ].map(({ n, l }) => (
                <div
                  key={l}
                  className="flex flex-col items-center text-center px-3 py-3 rounded-2xl
                             bg-[var(--bg)] border border-[var(--border)] shadow-[var(--shadow-sm)]"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none mb-1">
                    {n}
                  </span>
                  <span className="text-xs text-[var(--text-4)] leading-snug">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — photo ─────────────────────────────── */}
          <div className="flex justify-center md:justify-end animate-[fadeUp_.7s_.3s_cubic-bezier(.22,1,.36,1)_both]">
            <div className="relative w-full max-w-[340px] lg:max-w-[400px]">

              {/* Glow behind image */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-3xl
                           bg-gradient-to-br from-brand-500/20 via-violet-500/15 to-cyan-500/10
                           blur-2xl animate-[glowPulse_4s_ease-in-out_infinite]"
              />

              {/* Rotating ring decoration */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-dashed border-brand-300/30
                           animate-[spin_30s_linear_infinite] pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-full border border-dashed border-violet-300/20
                           animate-[spin_45s_linear_infinite_reverse] pointer-events-none"
              />

              {/* Photo frame */}
              <div
                className="relative rounded-3xl overflow-hidden aspect-square
                           border-2 border-[var(--border)] shadow-[var(--shadow-lg)]
                           bg-gradient-to-br from-brand-50 to-violet-50
                           dark:from-brand-900/20 dark:to-violet-900/20"
              >
                {!imgError ? (
                  <Image
                    src={profileImage}
                    alt="Mustansar Hussain Tariq — Full-Stack Software Engineer"
                    fill
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="object-cover object-top"
                    priority
                    onError={() => setImgError(true)}
                  />
                ) : (
                  /* Fallback avatar if image not yet placed */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <span
                      className="w-24 h-24 rounded-full bg-brand-600 flex items-center justify-center
                                 text-white text-4xl font-black shadow-xl"
                      aria-hidden="true"
                    >
                      M
                    </span>
                    <p className="text-xs text-[var(--text-4)] font-mono">
                      /public/mustansar.jpg
                    </p>
                  </div>
                )}

                {/* Bottom gradient overlay */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 inset-x-0 h-1/3
                             bg-gradient-to-t from-[var(--bg)]/80 to-transparent"
                />
              </div>

              {/* Floating badge — top right */}
              <div
                className="absolute -top-3 -right-3 flex items-center gap-2 px-3.5 py-2
                           rounded-2xl bg-[var(--bg)] border border-[var(--border)]
                           shadow-[var(--shadow-md)] animate-float"
              >
                <span className="text-lg" aria-hidden="true">⚡</span>
                <div>
                  <p className="text-xs font-bold text-[var(--text-1)] leading-none">Next.js 15</p>
                  <p className="text-[10px] text-[var(--text-4)] mt-0.5">App Router</p>
                </div>
              </div>

              {/* Floating badge — bottom left */}
              <div
                className="absolute -bottom-3 -left-3 flex items-center gap-2 px-3.5 py-2
                           rounded-2xl bg-[var(--bg)] border border-[var(--border)]
                           shadow-[var(--shadow-md)] animate-float [animation-delay:.8s]"
              >
                <span className="text-lg" aria-hidden="true">🚀</span>
                <div>
                  <p className="text-xs font-bold text-[var(--text-1)] leading-none">Vibe Coder</p>
                  <p className="text-[10px] text-[var(--text-4)] mt-0.5">AI-Augmented</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll down to About section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center
                   gap-1.5 text-[var(--text-4)] hover:text-[var(--text-3)] transition-colors"
      >
        <span className="text-[10px] font-semibold tracking-[.2em] uppercase opacity-60">
          scroll
        </span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </a>
    </section>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
