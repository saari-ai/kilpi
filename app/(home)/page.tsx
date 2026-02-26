import Image from 'next/image';
import Link from 'next/link';
import { zain } from '../layout';
import fiksuLogo from '@/public/fiksu-logo.png';
import kilpiLogo from '@/public/kilpi-logo-3.png';
import runkoLogo from '@/public/runko-logo.png';
import varmaLogo from '@/public/varma-logo.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'fiksu' },
  description:
    'Clever people need cleverer agents..',
};

const skills = [
  {
    name: 'Kilpi',
    subtitle: 'Cybersecurity',
    description: 'A comprehensive agent-first methodology for securing AI generated applications and systems.',
    href: '/docs/kilpi',
    logo: kilpiLogo,
  },
  {
    name: 'Runko',
    subtitle: 'Technical Architecture',
    description: 'Architecture skills for AI generated applications and systems.',
    href: '/docs/runko',
    logo: runkoLogo,
  },
  {
    name: 'Varma',
    subtitle: 'Product Development',
    description: 'Product skills for AI generated applications and systems.',
    href: '/docs/varma',
    logo: varmaLogo,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl text-center">
        <Image
          src={fiksuLogo}
          alt="fiksu"
          className="mx-auto mb-8 h-32 w-auto"
        />
        <h1 className={`text-4xl text-fd-foreground ${zain.className}`}>
          <span className="text-8xl font-black leading-none">fiksu</span> <br />Skill Library
        </h1>
        <p className="mt-6 mb-8 text-lg text-fd-muted-foreground">
          Clever people need <em>cleverer</em> agents.
        </p>
        <Link
          href="/docs/fiksu"
          className="mb-16 inline-flex items-center rounded-lg bg-fd-primary px-6 py-3 font-semibold text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
        >
          Get Started
        </Link>
        <p className="mt-6 mb-16 text-sm text-fd-muted-foreground">
          Made in Europe by <a href="https://saari.ai" className={`text-white text-2xl font-extrabold ${zain.className}`}>saari</a>
        </p>
        <svg className="mb-12 mx-auto size-8 animate-bounce text-fd-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <hr className="mb-16 w-full border-fd-border" />
        <h2 className={`mb-8 text-3xl font-black text-fd-foreground ${zain.className}`}>Engineering</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {skills.map((skill) => (
            <Link
              key={skill.name}
              href={skill.href}
              className="flex flex-col items-center rounded-xl border border-fd-border p-6 transition-colors hover:bg-fd-accent"
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                className="mb-4 h-24 w-auto"
              />
              <h2 className={`text-2xl font-black ${zain.className}`}>{skill.name.toLowerCase()}</h2>
              <p className="text-sm text-fd-muted-foreground">{skill.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
