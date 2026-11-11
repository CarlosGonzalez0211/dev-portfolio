import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import './luis.css';

const font = Geist({ variable: '--font-luis', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mi Plan · Luis',
  description: 'Plan de alimentación diario, guía para comer fuera y registro de progreso.',
  manifest: '/luis/manifest.webmanifest',
  applicationName: 'Mi Plan',
  appleWebApp: {
    capable: true,
    title: 'Mi Plan',
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/luis/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/luis/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/luis/apple-touch-icon.png', sizes: '180x180' }],
  },
  // Private family page: keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f3ec' },
    { media: '(prefers-color-scheme: dark)', color: '#121614' },
  ],
};

export default function LuisLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
