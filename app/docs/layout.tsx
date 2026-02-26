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
          <span className={`flex items-center gap-3 text-2xl leading-none ${zain.className}`}>
            <Image src={fiksuLogo} alt="" className="h-8 w-auto shrink-0" />
            <span className="translate-y-[2px] font-black">fiksu</span>
          </span>
        ),
      }}
      sidebar={{
        tabs: {
          transform(option, node) {
            const meta: Record<string, { logo: typeof kilpiLogo; description: string }> = {
              kilpi: { logo: kilpiLogo, description: 'Security Skills' },
              runko: { logo: runkoLogo, description: 'Architecture Skills' },
              varma: { logo: varmaLogo, description: 'Product Skills' },
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
                  className="h-8 w-auto shrink-0"
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
