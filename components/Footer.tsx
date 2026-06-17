const LINKEDIN = "https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292";
const GITHUB   = "https://github.com/mustansar";

const NAV = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
] as const;

const PROFILES = [
  {
    href:  LINKEDIN,
    label: "Connect with Mustansar Hussain Tariq on LinkedIn",
    short: "LinkedIn",
    desc:  "Professional profile & recommendations",
    icon:  LinkedInIcon,
  },
  {
    href:  GITHUB,
    label: "Browse Mustansar Hussain Tariq's open-source work on GitHub",
    short: "GitHub",
    desc:  "Repositories & contributions",
    icon:  GitHubIcon,
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-[var(--bg-subtle)] pt-10 border-t border-[var(--border)]"
    >
      <div className="container-tight pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#" className="inline-flex items-center gap-2.5 mb-5 group" aria-label="Back to top">
              <span className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center
                               text-white font-black text-sm shadow-lg shadow-brand-600/25
                               group-hover:scale-105 transition-transform">
                M
              </span>
              <span className="font-bold text-[15px] text-[var(--text-1)] tracking-tight">
                Mustansar<span className="text-brand-500">.</span>
              </span>
            </a>
            <p className="text-sm text-[var(--text-3)] leading-relaxed max-w-xs mb-6">
              Full-Stack Software Engineer specializing in Next.js & TypeScript.
              AI-augmented builder shipping scalable products, faster.
            </p>
            <div className="flex gap-3">
              {PROFILES.map(({ href, label, short, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn btn-ghost !py-2 !px-3 !text-sm !rounded-xl"
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {short}
                </a>
              ))}
            </div>
          </div>

          {/* Professional profiles — SEO anchor text */}
          <div className="md:col-span-4">
            <h2 className="text-xs font-bold text-[var(--text-4)] uppercase tracking-widest mb-5">
              Professional Profiles
            </h2>
            <ul className="space-y-4" role="list">
              {PROFILES.map(({ href, label, short, desc, icon: Icon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="group flex items-start gap-3 text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
                  >
                    <Icon className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="block text-sm font-semibold text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors">
                        {short}
                      </span>
                      <span className="block text-xs text-[var(--text-4)] mt-0.5">{desc}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-bold text-[var(--text-4)] uppercase tracking-widest mb-5">
              Navigation
            </h2>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5" role="list">
                {NAV.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-[var(--text-4)]">
            © {year}{" "}
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-3)] transition-colors"
              aria-label="Mustansar Hussain Tariq's LinkedIn"
            >
              Mustansar Hussain Tariq
            </a>
            . All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-4)]">
            Built with Next.js · Tailwind CSS · TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
