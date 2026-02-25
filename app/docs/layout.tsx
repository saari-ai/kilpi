import Image from 'next/image';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { zain } from '../layout';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: (
          <span className={`flex items-center gap-2 ${zain.className}`}>
            <Image src="/kilpi-logo-2.png" alt="" width={24} height={24} className="h-6 w-auto" />
            KILPI
          </span>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
