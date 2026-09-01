import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
  description: '把复杂 AI 能力，做成可落地、可评测、可持续迭代的产品。企业 AI、Agent 工作流与 AI 原生产品案例。',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: '把复杂 AI 能力，做成可落地、可评测、可持续迭代的产品。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'DonnaOS AI 产品经理作品集' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DonnaOS — 甘淑琪的 AI 产品经理作品集',
    description: '把复杂 AI 能力，做成可落地、可评测、可持续迭代的产品。',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
