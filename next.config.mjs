import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    basePath: '/skills',
    assetPrefix: 'https://saari-ai.github.io/skills/',
  }),
};

export default withMDX(config);
