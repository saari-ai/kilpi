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
    'The skill library for clever agents..',
};

const skills = [
  {
    name: 'Kilpi',
    subtitle: 'Security Skills',
    description: 'A comprehensive agent-first methodology for securing AI generated applications and systems.',
    href: '/docs/kilpi',
    logo: kilpiLogo,
  },
  {
    name: 'Runko',
    subtitle: 'Architecture Skills',
    description: 'Architecture skills for AI generated applications and systems.',
    href: '/docs/runko',
    logo: runkoLogo,
  },
  {
    name: 'Varma',
    subtitle: 'Product Skills',
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
          className="mx-auto mb-6 h-32 w-auto"
        />
        <h1 className={`mb-4 text-8xl font-black text-fd-foreground ${zain.className} leading-none`}>
          fiksu
        </h1>
        <p className="mb-12 text-lg text-fd-muted-foreground">
          The skill library for clever agents.
        </p>
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
      <p className="mt-12 text-sm text-fd-muted-foreground">
        Made in Europe by <a href="https://saari.ai" className={`text-white text-2xl font-extrabold ${zain.className}`}>saari</a>
      </p>
    </div>
  );
}
