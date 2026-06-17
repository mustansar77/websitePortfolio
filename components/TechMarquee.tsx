const TECH = [
  { name: "Next.js",        color: "#000000", icon: "▲" },
  { name: "TypeScript",     color: "#3178c6", icon: "TS" },
  { name: "React",          color: "#61dafb", icon: "⚛" },
  { name: "Node.js",        color: "#6cc24a", icon: "⬡" },
  { name: "MongoDB",        color: "#4db33d", icon: "🍃" },
  { name: "Tailwind CSS",   color: "#38bdf8", icon: "✦" },
  { name: "Docker",         color: "#2496ed", icon: "🐳" },
  { name: "GitHub Actions", color: "#2088ff", icon: "⚙" },
  { name: "PostgreSQL",     color: "#336791", icon: "🐘" },
  { name: "Supabase",       color: "#3ecf8e", icon: "⚡" },
  { name: "Express",        color: "#000000", icon: "Ex" },
  { name: "Redis",          color: "#dc382d", icon: "⬤" },
  { name: "Vercel",         color: "#000000", icon: "△" },
  { name: "GraphQL",        color: "#e10098", icon: "◈" },
  { name: "Claude AI",      color: "#d4a27f", icon: "◆" },
  { name: "Cursor",         color: "#6366f1", icon: "◎" },
  { name: "Loveable",       color: "#ec4899", icon: "♥" },
  { name: "Git",            color: "#f05032", icon: "⑂" },
];

/* Duplicate for seamless loop */
const ITEMS = [...TECH, ...TECH];

export default function TechMarquee() {
  return (
    <section aria-label="Technology stack" className="py-14 bg-[var(--bg-subtle)] overflow-hidden border-y border-[var(--border)]">
      <p className="eyebrow text-center mb-8 text-[var(--text-4)]">
        Technologies &amp; Tools
      </p>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {ITEMS.map((tech, i) => (
            <TechPill key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechPill({ tech }: { tech: (typeof TECH)[0] }) {
  return (
    <div
      className="flex items-center gap-2.5 px-5 py-3 mx-2 rounded-2xl
                 bg-[var(--bg)] border border-[var(--border)]
                 shadow-[var(--shadow-sm)] select-none whitespace-nowrap
                 hover:border-brand-300 hover:shadow-[0_0_0_1px_rgba(99,102,241,.15),var(--shadow-sm)]
                 transition-all duration-200 group"
      aria-hidden="true"
    >
      <span
        className="text-sm font-bold w-7 h-7 flex items-center justify-center
                   rounded-lg shrink-0 group-hover:scale-110 transition-transform duration-200"
        style={{
          background: `${tech.color}18`,
          color: tech.color === "#000000"
            ? "var(--text-1)"
            : tech.color,
        }}
      >
        {tech.icon}
      </span>
      <span className="text-sm font-semibold text-[var(--text-2)]">{tech.name}</span>
    </div>
  );
}
