import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Niloy Kumar Mohonta',
  description: 'Full-stack engineer in Dhaka, Bangladesh.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F3EF' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0E0C' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
