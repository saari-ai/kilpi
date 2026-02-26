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
          <span className={`flex items-center gap-3 text-2xl leading-none ${zain.className}`}>
            <Image src={kilpiLogo} alt="" className="h-10 w-auto shrink-0" />
            <span className="translate-y-[2px]">KILPI</span>
          </span>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
