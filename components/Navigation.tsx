"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
] as const;

export default function Navigation() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive  ] = useState("");
  const [open,     setOpen    ] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const ids = ["about", "experience", "projects", "contact"];
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(`#${id}`); return; }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={[
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg)]/92 backdrop-blur-xl shadow-[0_1px_0_var(--border)]"
            : "bg-[var(--bg)]/60 backdrop-blur-md",
        ].join(" ")}
      >
        <nav
          className="container-tight flex items-center justify-between h-16 sm:h-[70px]"
          aria-label="Primary navigation"
        >
          {/* ── Name / logo ──────────────────────────────── */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            aria-label="Mustansar Hussain – home"
          >
            <span
              className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center
                         text-white font-black text-sm shadow-lg shadow-brand-600/30
                         group-hover:scale-105 transition-transform"
              aria-hidden="true"
            >
              M
            </span>
            <span className="font-bold text-[15px] tracking-tight text-[var(--text-1)] hidden sm:block">
              Mustansar<span className="text-brand-500">.</span>
            </span>
          </a>

          {/* ── Desktop links ────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={[
                    "nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    active === href
                      ? "text-brand-500"
                      : "text-[var(--text-3)] hover:text-[var(--text-1)]",
                    active === href ? "active" : "",
                  ].join(" ")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop right ────────────────────────────── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         text-[var(--text-3)] hover:text-[var(--text-1)]
                         hover:bg-[var(--bg-muted)] border border-[var(--border)]
                         transition-all duration-150"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <a
              href="https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Mustansar Hussain Tariq on LinkedIn"
              className="btn btn-ghost !py-2 !px-4 !text-sm !rounded-xl"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#0077B5]" aria-hidden="true" />
              LinkedIn
            </a>

            <a href="#contact" className="btn btn-primary !py-2 !px-4 !text-sm !rounded-xl">
              Hire Me
            </a>
          </div>

          {/* ── Mobile controls ──────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-xl
                         border border-[var(--border)] text-[var(--text-3)]"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]
                         rounded-xl border border-[var(--border)]"
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className={[
                    "block h-[1.5px] w-5 bg-[var(--text-2)] rounded-full transition-all duration-200",
                    i === 0 && open ? "translate-y-[6.5px] rotate-45" : "",
                    i === 1 && open ? "opacity-0 scale-x-0" : "",
                    i === 2 && open ? "-translate-y-[6.5px] -rotate-45" : "",
                  ].join(" ")}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ────────────────────────────────── */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />
      <aside
        role="dialog"
        aria-modal
        className={[
          "fixed inset-y-0 right-0 z-40 w-72 bg-[var(--bg)] border-l border-[var(--border)]",
          "flex flex-col pt-16 sm:pt-[70px] pb-8 md:hidden shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-1">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-[15px] font-medium
                             text-[var(--text-2)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-1)]
                             transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 space-y-3">
          <a
            href="https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292"
            target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn btn-ghost w-full !justify-center"
          >
            <LinkedInIcon className="w-4 h-4 text-[#0077B5]" aria-hidden="true" />
            LinkedIn
          </a>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full !justify-center">
            Hire Me
          </a>
        </div>
      </aside>
    </>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
