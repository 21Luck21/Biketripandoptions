import type { Metadata } from 'next';
import { Fraunces, Caveat, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: "Two Wheels · A Cycling Field Notes",
  description: 'Berlin–Brandenburg weekend rides and a two-day Rügen route.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${caveat.variable} ${jetbrains.variable}`}>
      <body className="grain vignette">{children}</body>
    </html>
  );
}
