"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "default" | "hover" | "hidden";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const current = useRef({ x: -200, y: -200 });
  const rafRef  = useRef<number>(0);
  const [variant, setVariant] = useState<Variant>("hidden");

  useEffect(() => {
    /* Touch devices — don't render */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVariant(v => (v === "hidden" ? "default" : v));
    };
    const onLeave  = () => setVariant("hidden");
    const onEnter  = () => setVariant("hover");
    const onUnhover = () => setVariant("default");

    document.addEventListener("mousemove",  onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    /* Attach hover listeners to all interactive elements */
    const attach = () => {
      document.querySelectorAll("a,button,[role='button'],input,textarea,select,[data-hover]")
        .forEach(el => {
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onUnhover);
        });
    };
    attach();

    /* Smooth ring lerp */
    const loop = () => {
      const EASE = 0.1;
      current.current.x += (mouse.current.x - current.current.x) * EASE;
      current.current.y += (mouse.current.y - current.current.y) * EASE;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${current.current.x}px,${current.current.y}px) translate(-50%,-50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isHidden = variant === "hidden";
  const isHover  = variant === "hover";

  return (
    <>
      {/* Inner dot — snaps immediately */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width:  isHover ? 8 : 6,
          height: isHover ? 8 : 6,
          borderRadius: "50%",
          background: "#6366f1",
          opacity: isHidden ? 0 : 1,
          transition: "width .2s, height .2s, opacity .25s",
        }}
      />

      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          width:  isHover ? 48 : 36,
          height: isHover ? 48 : 36,
          borderRadius: "50%",
          border: `1.5px solid ${isHover ? "rgba(99,102,241,.6)" : "rgba(99,102,241,.4)"}`,
          background: isHover ? "rgba(99,102,241,.07)" : "transparent",
          opacity: isHidden ? 0 : 1,
          transition: "width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1), opacity .25s, border-color .2s, background .2s",
        }}
      />
    </>
  );
}
