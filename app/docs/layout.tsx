import Image from 'next/image';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { zain } from '../layout';
import fiksuLogo from '@/public/fiksu-logo.png';
import kilpiLogo from '@/public/kilpi-logo-3.png';
import runkoLogo from '@/public/runko-logo.png';
import varmaLogo from '@/public/varma-logo.png';

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
            const meta: Record<string, { logo: typeof kilpiLogo; description: string }> = {
              fiksu: { logo: fiksuLogo, description: 'Skill Library' },
              kilpi: { logo: kilpiLogo, description: 'Cybersecurity' },
              runko: { logo: runkoLogo, description: 'Technical Architecture' },
              varma: { logo: varmaLogo, description: 'Product Development' },
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
