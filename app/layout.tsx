import type { Metadata } from 'next';
import { getSiteUrl, withBasePath } from '@/lib/site';
import { profile } from '@/lib/portfolio';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
  description: '甘淑琪的 AI 产品经理作品集：企业 Agent 与 AI 内容平台、效果评测、AI Coding、开源与产品探索。',
  alternates: { canonical: '/' },
  manifest: withBasePath('/manifest.webmanifest'),
  icons: { icon: withBasePath('/favicon.svg') },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: profile.headline,
    images: [{ url: withBasePath('/og.png'), width: 1200, height: 630, alt: 'DonnaOS AI 产品经理作品集 Finder 预览' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: profile.headline,
    images: [withBasePath('/og.png')],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
        <a
          className="site-icp"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noreferrer"
        >
          湘ICP备2026038924号-1
        </a>
      </body>
    </html>
  );
}
