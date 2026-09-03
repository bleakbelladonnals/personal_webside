import type { Metadata } from 'next';
import { getSiteUrl, withBasePath } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
  description: '甘淑琪的 AI 产品经理作品集：企业 AI 0→1、Agent 方案与效果评测、AI Coding 与开源实践、SEO 获客与需求验证。',
  alternates: { canonical: '/' },
  manifest: withBasePath('/manifest.webmanifest'),
  icons: { icon: withBasePath('/favicon.svg') },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: '从真实业务问题出发，把 Agent 做到可用、可评测、可迭代。',
    images: [{ url: withBasePath('/og.png'), width: 1200, height: 630, alt: 'DonnaOS AI 产品经理作品集 Finder 预览' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: '从真实业务问题出发，把 Agent 做到可用、可评测、可迭代。',
    images: [withBasePath('/og.png')],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
