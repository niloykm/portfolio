import { Geist, JetBrains_Mono } from 'next/font/google';

export const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const fontDisplay = fontSans;

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
