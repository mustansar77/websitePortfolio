"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ background: "var(--bg)" }}>
      <div className="text-center max-w-md">
        <p className="text-6xl font-black gradient-text mb-4">Oops</p>
        <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
          Something went wrong
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-3)" }}>
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={reset}
          className="btn btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
