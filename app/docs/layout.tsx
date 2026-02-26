import Image from 'next/image';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { zain } from '../layout';
import kilpiLogo from '@/public/kilpi-logo-3.png';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: (
          <span className={`flex items-center gap-2 ${zain.className}`}>
            <Image src={kilpiLogo} alt="" className="h-6 w-auto" />
            KILPI
          </span>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
