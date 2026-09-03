import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';
const githubAssetPrefix = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '') || basePath;

const nextConfig: NextConfig = {
  output: githubPages ? 'export' : undefined,
  assetPrefix: githubPages ? githubAssetPrefix : undefined,
  images: githubPages ? { unoptimized: true } : undefined,
};

export default nextConfig;
