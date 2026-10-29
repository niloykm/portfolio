import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { profile } from '@/data/profile';
import { isFilled } from '@/lib/filled';
import './globals.css';

const SITE_URL = 'https://niloykm.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.summary,
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: profile.name,
      url: isFilled(profile.github)
        ? `https://github.com/${profile.github}`
        : SITE_URL,
    },
  ],
  creator: profile.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — ${profile.role}`,
    description: profile.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

function buildPersonJsonLd() {
  const sameAs: string[] = [];
  if (isFilled(profile.github)) {
    sameAs.push(`https://github.com/${profile.github}`);
  }
  if (isFilled(profile.linkedin)) {
    sameAs.push(profile.linkedin);
  }
  if (isFilled(profile.x)) {
    sameAs.push(profile.x);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildPersonJsonLd();

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
