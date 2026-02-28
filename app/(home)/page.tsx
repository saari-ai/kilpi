import Image from 'next/image';
import Link from 'next/link';
import { zain } from '../layout';
import fiksuLogo from '@/public/fiksu-logo.png';
import cybersecurityLogo from '@/public/cybersecurity-logo.png';
import softwareArchitectureLogo from '@/public/software-architecture-logo.png';
import productDiscoveryLogo from '@/public/product-discovery-logo.png';
import productValidationLogo from '@/public/product-validation-logo.png';
import mentorshipLogo from '@/public/mentorship-logo.png';
import devilsAdvocateLogo from '@/public/devils-advocate-logo.png';
import entrepreneurshipLogo from '@/public/entrepreneurship-logo.png';
import fatherhoodLogo from '@/public/fatherhood-logo.png';
import chiefTechnologyOfficerLogo from '@/public/chief-technology-officer-logo.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'fiksu' },
  description:
    'Agent skills backed by robust methodology.',
};

const engineeringSkills = [
  {
    name: 'Cybersecurity',
    href: '/docs/cybersecurity',
    logo: cybersecurityLogo,
  },
  {
    name: 'Software Architecture',
    href: '/docs/software-architecture',
    logo: softwareArchitectureLogo,
  },
  {
    name: 'Product Discovery',
    href: '/docs/product-discovery',
    logo: productDiscoveryLogo,
  },
  {
    name: 'Product Validation',
    href: '/docs/product-validation',
    logo: productValidationLogo,
  },
];

const leadershipSkills = [
  {
    name: 'Mentorship',
    href: '/docs/mentorship',
    logo: mentorshipLogo,
  },
  {
    name: 'Coaching',
    href: '/docs/coaching',
    logo: mentorshipLogo,
  },
  {
    name: "Devil's Advocate",
    href: '/docs/devils-advocate',
    logo: devilsAdvocateLogo,
  },
];

const economicsSkills = [
  {
    name: 'Personal Finance',
    href: '/docs/personal-finance',
    logo: mentorshipLogo,
  },
  {
    name: 'Business Finance',
    href: '/docs/business-finance',
    logo: mentorshipLogo,
  },
  {
    name: 'Investing',
    href: '/docs/investing',
    logo: mentorshipLogo,
  },
];

const roleSkills = [
  {
    name: 'Entrepreneur',
    href: '/docs/entrepreneurship',
    logo: entrepreneurshipLogo,
  },
  {
    name: 'Father',
    href: '/docs/fatherhood',
    logo: fatherhoodLogo,
  },
  {
    name: 'Mother',
    href: '/docs/motherhood',
    logo: fatherhoodLogo,
  },
  {
    name: 'Parent',
    href: '/docs/parent',
    logo: fatherhoodLogo,
  },
  {
    name: 'Chief Technology Officer (CTO)',
    href: '/docs/chief-technology-officer',
    logo: chiefTechnologyOfficerLogo,
  },
];

const skillDevelopmentSkills = [
  {
    name: 'Skills Testing',
    href: '/docs/skills-testing',
    logo: fiksuLogo,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl text-center">
        <Image
          src={fiksuLogo}
          alt="fiksu"
          className="mx-auto mb-8 h-40 w-auto"
        />
        <h1 className={`text-4xl text-fd-foreground ${zain.className}`}>
          <span className="text-8xl font-black leading-none">capabalities</span> <br />Agentic AI
        </h1>
        <p className="mt-6 mb-8 text-lg text-fd-muted-foreground">
          Intelligence at every layer.
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {engineeringSkills.map((skill) => (
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
              <h2 className={`text-2xl font-normal ${zain.className}`}>{skill.name}</h2>
            </Link>
          ))}
        </div>
        <h2 className={`mt-16 mb-8 text-3xl font-black text-fd-foreground ${zain.className}`}>Postures</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {leadershipSkills.map((skill) => (
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
              <h2 className={`text-2xl font-normal ${zain.className}`}>{skill.name}</h2>
            </Link>
          ))}
        </div>
        <h2 className={`mt-16 mb-8 text-3xl font-black text-fd-foreground ${zain.className}`}>Economics</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {economicsSkills.map((skill) => (
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
              <h2 className={`text-2xl font-normal ${zain.className}`}>{skill.name}</h2>
            </Link>
          ))}
        </div>
        <h2 className={`mt-16 mb-8 text-3xl font-black text-fd-foreground ${zain.className}`}>Roles</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {roleSkills.map((skill) => (
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
              <h2 className={`text-2xl font-normal ${zain.className}`}>{skill.name}</h2>
            </Link>
          ))}
        </div>
        <h2 className={`mt-16 mb-8 text-3xl font-black text-fd-foreground ${zain.className}`}>Skill Development</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {skillDevelopmentSkills.map((skill) => (
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
              <h2 className={`text-2xl font-normal ${zain.className}`}>{skill.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
