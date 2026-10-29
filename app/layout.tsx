import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Niloy Kumar Mohonta',
  description: 'Full-stack engineer in Dhaka, Bangladesh.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
