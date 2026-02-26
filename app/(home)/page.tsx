import Image from 'next/image';
import Link from 'next/link';
import { zain } from '../layout';
import kilpiLogo from '@/public/kilpi-logo-3.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Kilpi - AI Security Method' },
  description:
    'A comprehensive agent-first methodology for securing AI generated applications and systems.',
};

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <Image
          src={kilpiLogo}
          alt="Kilpi"
          className="mx-auto mb-6 h-64 w-auto"
        />
        <h1 className={`mb-4 text-4xl text-fd-foreground ${zain.className}`}>
          <span className="text-6xl font-extrabold">KILPI</span> <br />Security Skills
        </h1>
        <p className="mb-8 text-lg text-fd-muted-foreground">
          A comprehensive agent-first methodology for securing AI generated applications and systems
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
      </div>
      <p className="mt-12 text-sm text-fd-muted-foreground">
        Made in Europe by <a href="https://saari.ai" className={`text-white text-2xl font-extrabold ${zain.className}`}>saari</a>
      </p>
    </div>
  );
}
