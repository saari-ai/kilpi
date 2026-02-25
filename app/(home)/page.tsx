import Image from 'next/image';
import Link from 'next/link';
import { zain } from '../layout';

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <Image
          src="/kilpi-logo-2.png"
          alt="Kilpi"
          width={96}
          height={96}
          className="mx-auto mb-6 h-24 w-auto"
        />
        <h1 className={`mb-4 text-4xl text-fd-foreground ${zain.className}`}>
          <span className="text-6xl font-extrabold">KILPI</span> <br />Security Methodology
        </h1>
        <p className="mb-8 text-lg text-fd-muted-foreground">
          A straightforward security methodology from <a href="https://saari.ai" className={`text-white text-2xl font-extrabold ${zain.className}`}>saari</a> built on NIST Cybersecurity Framework 2.0
        </p>
        <Link
          href="/docs"
          className="inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
