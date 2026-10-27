import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://niloykm.vercel.app"),
  title: {
    default: "Niloy Kumar Mohonta | Frontend & Full-Stack Developer",
    template: "%s | Niloy Kumar Mohonta",
  },
  description:
    "Full-Stack & Frontend Software Engineer specializing in React.js, Next.js, TypeScript, Tailwind CSS, and scalable Node.js/Express architectures.",
  keywords: [
    "Niloy Kumar Mohonta",
    "Frontend Developer",
    "Full Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer Bangladesh",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Niloy Kumar Mohonta", url: "https://github.com/niloydiu" }],
  creator: "Niloy Kumar Mohonta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://niloykm.vercel.app",
    siteName: "Niloy Kumar Mohonta Portfolio",
    title: "Niloy Kumar Mohonta | Frontend & Full-Stack Developer",
    description:
      "Crafting high-velocity web applications with React, Next.js, and TypeScript. Explore projects, architecture deep-dives, and technical competencies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niloy Kumar Mohonta | Frontend & Full-Stack Developer",
    description:
      "Crafting high-velocity web applications with React, Next.js, and TypeScript.",
    creator: "@niloykmohonta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Niloy Kumar Mohonta",
  url: "https://niloykm.vercel.app",
  jobTitle: "Frontend & Full-Stack Developer",
  knowsAbout: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Web Performance",
    "Accessibility",
  ],
  sameAs: [
    "https://github.com/niloydiu",
    "https://www.linkedin.com/in/niloykumarmohonta000/",
    "https://x.com/niloykmohonta",
    "https://www.facebook.com/niloykumarmohonta000",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent text-sm font-medium"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
