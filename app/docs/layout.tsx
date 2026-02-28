import Image from 'next/image';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
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

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: (
          <span className={`text-2xl leading-none font-black ${zain.className}`}>
            fiksu
          </span>
        ),
      }}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta: Record<string, { logo: typeof cybersecurityLogo; description: string }> = {
              fiksu: { logo: fiksuLogo, description: 'Agent Capabilities' },
              cybersecurity: { logo: cybersecurityLogo, description: 'Security Skills' },
              'software architecture': { logo: softwareArchitectureLogo, description: 'Architecture Skills' },
              'product discovery': { logo: productDiscoveryLogo, description: 'Discovery Skills' },
              'product validation': { logo: productValidationLogo, description: 'Validation Skills' },
              mentorship: { logo: mentorshipLogo, description: 'Mentorship Skills' },
              coaching: { logo: mentorshipLogo, description: 'Coaching Skills' },
              'personal finance': { logo: mentorshipLogo, description: 'Personal Finance Skills' },
              'business finance': { logo: mentorshipLogo, description: 'Business Finance Skills' },
              investing: { logo: mentorshipLogo, description: 'Investing Skills' },
              "devil's advocate": { logo: devilsAdvocateLogo, description: 'Adversarial Thinking Skills' },
              entrepreneurship: { logo: entrepreneurshipLogo, description: 'Entrepreneurship Skills' },
              fatherhood: { logo: fatherhoodLogo, description: 'Fatherhood Skills' },
              'chief technology officer': { logo: chiefTechnologyOfficerLogo, description: 'CTO Skills' },
            };
            const key = String(node.name ?? '').toLowerCase();
            const entry = meta[key];
            if (!entry) return option;
            return {
              ...option,
              icon: (
                <Image
                  src={entry.logo}
                  alt={key}
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded object-contain"
                />
              ),
              description: entry.description,
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
