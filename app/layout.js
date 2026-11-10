import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://niloykm.vercel.app"),
  title: {
    default: "Niloy Kumar Mohonta | Full-Stack Software Engineer",
    template: "%s | Niloy Kumar Mohonta",
  },
  description:
    "Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces with strict performance standards.",
  keywords: [
    "Niloy Kumar Mohonta",
    "Full-Stack Software Engineer",
    "Frontend Engineer",
    "React.js Developer",
    "Next.js Developer",
    "NestJS Developer",
    "TypeScript",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Tailwind CSS",
    "niloydiu",
  ],
  authors: [{ name: "Niloy Kumar Mohonta", url: "https://github.com/niloydiu" }],
  creator: "Niloy Kumar Mohonta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://niloykm.vercel.app",
    siteName: "Niloy Kumar Mohonta Portfolio",
    title: "Niloy Kumar Mohonta | Full-Stack Software Engineer",
    description:
      "Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces with strict performance standards.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niloy Kumar Mohonta | Full-Stack Software Engineer",
    description:
      "Architecting resilient web applications, modular NestJS/Node.js backend systems, and pixel-complete React/Next.js interfaces.",
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
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Niloy Kumar Mohonta",
  url: "https://niloykm.vercel.app",
  jobTitle: "Full-Stack Software Engineer",
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "React.js",
    "Node.js",
    "NestJS",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Tailwind CSS",
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 text-xs font-mono font-semibold"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
