import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2, Mail, MapPin, Users } from 'lucide-react';
import { SiteNav } from '@/components/donnaos/site-nav';
import { profile, strengths } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: '关于甘淑琪 — DonnaOS',
  description: '甘淑琪 Donna Gan，北京 AI 产品经理，关注企业 AI 0→1、Agent 评测、AI Coding、开源与 SEO 需求验证。',
  alternates: { canonical: '/about' },
  openGraph: { title: '关于甘淑琪 — DonnaOS', description: profile.intro, images: [] },
  twitter: { card: 'summary', title: '关于甘淑琪 — DonnaOS', description: profile.intro, images: [] },
};

export default function AboutPage() {
  return (
    <main className="mac-route-page about-page">
      <SiteNav />
      <section className="mac-route-window about-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>About Donna</strong>
          <small>CONTACT CARD</small>
        </header>
        <div className="mac-route-toolbar">
          <div><Users aria-hidden="true" /><span>Contacts</span><b>/</b><strong>Donna Gan</strong></div>
          <span>{profile.status}</span>
        </div>
        <article className="about-route-document">
          <aside>
            <Image src="/profile-donna.jpg" alt="甘淑琪 Donna Gan" width={420} height={525} sizes="(max-width: 760px) 120px, 240px" priority />
            <span><i aria-hidden="true" />{profile.status}</span>
          </aside>
          <div className="about-route-copy">
            <header>
              <p>AI PRODUCT MANAGER · BEIJING</p>
              <h1>{profile.nameEn}</h1>
              <h2>{profile.nameCn}</h2>
              <span>{profile.intro}</span>
            </header>
            <p>
              风景园林设计训练了我在多个尺度上理解人、环境与路径。转入 AI 产品后，我把这种系统视角用在真实业务流程、Agent 失败路径、评测闭环与人工责任边界上。
            </p>
            <p>
              我不把一次成功 Demo 当作产品完成：企业项目会注明内部试点范围，个人 MVP 会区分自测与用户验证，开源成果则以公开仓库和评审记录为准。
            </p>
            <dl>
              <div><dt>角色</dt><dd>{profile.role}</dd></div>
              <div><dt>位置</dt><dd><MapPin aria-hidden="true" />{profile.location}</dd></div>
              <div><dt>方向</dt><dd>企业 AI 0→1 · Agent 评测 · AI Coding · SEO</dd></div>
            </dl>
            <section className="about-route-capabilities">
              <header><h2>四项能力与证据</h2><span>{strengths.length} 项</span></header>
              <div>
                {strengths.map((strength, index) => (
                  <Link href={`/projects/${strength.evidence[0].slug}`} key={strength.id}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <span><strong>{strength.name}</strong><i>{strength.code}</i></span>
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
            <div className="about-route-actions">
              <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" />GitHub / @bleakbelladonnals</a>
            </div>
            <footer>为保护隐私，本站不公开手机号、微信二维码或简历 PDF 文件。</footer>
          </div>
        </article>
      </section>
    </main>
  );
}
