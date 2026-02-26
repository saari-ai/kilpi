import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

const baseUrl = 'https://saari-ai.github.io/skills';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...pages,
  ];
}
