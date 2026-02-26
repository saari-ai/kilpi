import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter, Zain } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });
export const zain = Zain({ subsets: ['latin'], weight: '800' });

export const metadata: Metadata = {
  metadataBase: new URL('https://saari-ai.github.io/kilpi'),
  title: {
    template: '%s | Kilpi',
    default: 'Kilpi - AI Security Method',
  },
  description:
    'A comprehensive agent-first methodology for securing AI generated applications and systems.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Kilpi',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Kilpi - AI Security Method' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
