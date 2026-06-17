"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const LINKEDIN = "https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters").max(80),
  email:   z.string().email("Enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters").max(120),
  message: z.string().min(20, "Please write at least 20 characters").max(2000),
});
type F = z.infer<typeof schema>;
type S = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [state, setState] = useState<S>("idle");
  const [msg,   setMsg  ] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<F>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: F) => {
    setState("loading");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) { setState("success"); setMsg(json.message); reset(); }
      else         { setState("error");   setMsg(json.error ?? "Something went wrong."); }
    } catch {
      setState("error"); setMsg("Network error — please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="section-pad relative overflow-hidden"
      style={{ background: "var(--bg-subtle)" }}
    >
      {/* Decorative gradient blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-32 w-96 h-96
                                          rounded-full bg-brand-500/8 blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96
                                          rounded-full bg-violet-500/8 blur-[80px]" />

      <div className="container-tight relative">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="eyebrow mb-3">Contact</p>
          <h2 id="contact-heading" className="display-lg text-[var(--text-1)]">
            Let&apos;s build something{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p className="mt-4 text-[var(--text-3)] max-w-xl mx-auto text-[17px]">
            Have a project, a question, or just want to say hi?
            My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-start">

          {/* ── Left — info ─────────────────────────────── */}
          <div className="reveal reveal-delay-1 space-y-5">
            {[
              {
                icon: "💼", label: "LinkedIn",
                value: "Connect & view my work history",
                href: LINKEDIN,
              },
              {
                icon: "⚙", label: "GitHub",
                value: "Browse open-source projects",
                href: "https://github.com/mustansar",
              },
              {
                icon: "⏱", label: "Response time",
                value: "Usually within 24 hours",
                href: null,
              },
              {
                icon: "🌍", label: "Availability",
                value: "Open to remote projects worldwide",
                href: null,
              },
            ].map(({ icon, label, value, href }) => (
              <div
                key={label}
                className="card p-5 flex items-start gap-4"
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{icon}</span>
                <div>
                  <p className="text-xs font-bold text-[var(--text-4)] uppercase tracking-widest mb-1">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label}: ${value}`}
                      className="text-sm font-semibold text-[var(--text-2)] hover:text-brand-500 transition-colors underline-offset-2 hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[var(--text-2)]">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Right — form ─────────────────────────────── */}
          <div className="reveal reveal-delay-2">
            <div className="card p-7 sm:p-10">
              {state === "success" ? (
                <div className="flex flex-col items-center text-center gap-5 py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/25
                                  flex items-center justify-center text-3xl" aria-hidden="true">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-1)] mb-1">Message sent!</h3>
                    <p className="text-sm text-[var(--text-3)]">{msg}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-1)] mb-1">Send a message</h3>
                    <p className="text-sm text-[var(--text-4)]">Your message goes straight to my inbox.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field label="Full name" id="name" error={errors.name?.message}>
                      <input {...register("name")} id="name" type="text" placeholder="Alex Johnson"
                        autoComplete="name" aria-invalid={!!errors.name} className={inp(!!errors.name)} />
                    </Field>
                    <Field label="Email" id="email" error={errors.email?.message}>
                      <input {...register("email")} id="email" type="email" placeholder="alex@company.com"
                        autoComplete="email" aria-invalid={!!errors.email} className={inp(!!errors.email)} />
                    </Field>
                  </div>

                  <Field label="Subject" id="subject" error={errors.subject?.message}>
                    <input {...register("subject")} id="subject" type="text"
                      placeholder="MVP development, SaaS, automation..."
                      aria-invalid={!!errors.subject} className={inp(!!errors.subject)} />
                  </Field>

                  <Field label="Message" id="message" error={errors.message?.message}>
                    <textarea {...register("message")} id="message" rows={5}
                      placeholder="Describe your project, goals, and timeline..."
                      aria-invalid={!!errors.message} className={inp(!!errors.message) + " resize-none"} />
                  </Field>

                  {state === "error" && (
                    <p role="alert" className="text-sm text-red-600 bg-red-500/8 border border-red-500/20
                                               rounded-xl px-4 py-3">
                      {msg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className={`btn btn-primary w-full !py-3.5 ${state === "loading" ? "opacity-70 pointer-events-none" : ""}`}
                  >
                    {state === "loading" ? (
                      <><Spinner className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</>
                    ) : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, error, children }: {
  label: string; id: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--text-2)]">{label}</label>
      {children}
      {error && <p role="alert" className="text-xs text-red-500">⚠ {error}</p>}
    </div>
  );
}

function inp(err: boolean) {
  return [
    "w-full px-4 py-3 rounded-xl text-sm text-[var(--text-1)]",
    "bg-[var(--bg-subtle)] border placeholder:text-[var(--text-4)]",
    "focus:outline-none focus:ring-2 transition-all duration-150",
    err
      ? "border-red-400/60 focus:ring-red-400/25 focus:border-red-400"
      : "border-[var(--border)] hover:border-brand-300/50 focus:ring-brand-500/20 focus:border-brand-400/60",
  ].join(" ");
}

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
