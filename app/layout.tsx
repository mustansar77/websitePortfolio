import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor    from "@/components/CustomCursor";

const SITE_URL = "https://mustansarhussain.dev";
const NAME = "Mustansar Hussain Tariq";
const TITLE = `${NAME} — Full-Stack Engineer & Next.js Specialist`;
const DESC  =
  "Mustansar Hussain Tariq is a Full-Stack Software Engineer specializing in Next.js, TypeScript, and the MERN stack. He builds scalable web products, custom MVPs, and automated web tools — accelerated by AI-powered development with Claude, Cursor, and Loveable.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:       { default: TITLE, template: `%s | ${NAME}` },
  description: DESC,
  keywords: [
    "Full-Stack Engineer", "Next.js Developer", "MERN Stack", "TypeScript",
    "React Developer", "Node.js", "SaaS Development", "MVP Development",
    "Mustansar Hussain Tariq", "AI Augmented Developer", "Vibe Coding",
  ],
  authors:   [{ name: NAME, url: SITE_URL }],
  creator:   NAME,
  openGraph: {
    type: "profile", locale: "en_US", url: SITE_URL,
    siteName: `${NAME} — Portfolio`,
    title: TITLE, description: DESC,
    firstName: "Mustansar", lastName: "Tariq",
  },
  twitter:  { card: "summary_large_image", title: TITLE, description: DESC },
  robots:   { index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2024-01-01",
  dateModified: new Date().toISOString().split("T")[0],
  mainEntity: {
    "@type": "Person",
    name: NAME,
    url: SITE_URL,
    jobTitle: "Full-Stack Software Engineer",
    description: DESC,
    knowsAbout: ["Next.js","TypeScript","React","Node.js","MongoDB","Express","Tailwind CSS","Docker","GitHub Actions","AI-assisted development"],
    sameAs: [
      "https://www.linkedin.com/in/mustansar-hussain-tariq-87a750292",
      "https://github.com/mustansar",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..900;1,14..32,300..900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#ffffff" />

        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              var t = localStorage.getItem("theme");
              if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark");
              }
            } catch(e){}
          `
        }} />
      </head>
      <body>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
