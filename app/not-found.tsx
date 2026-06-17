export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
         style={{ background: "var(--bg)" }}>
      <div className="text-center max-w-md">
        <p className="text-8xl font-black gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text-1)" }}>
          Page not found
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--text-3)" }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <a href="/" className="btn btn-primary">
          Back to home
        </a>
      </div>
    </div>
  );
}
