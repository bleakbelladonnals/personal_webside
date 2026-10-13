import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, Code2, Mail, MapPin, Users } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { SiteNav } from '@/components/donnaos/site-nav';
import { profile, strengths } from '@/lib/portfolio';
import { withBasePath } from '@/lib/site';

export const metadata: Metadata = {
  title: '关于甘淑琪 — DonnaOS',
  description: '甘淑琪 Donna Gan，北京 AI 产品经理，关注企业 Agent、效果评测、AI Coding 与 GEO 内容增长。',
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
            <Image src={withBasePath('/profile-donna.jpg')} alt="甘淑琪 Donna Gan" width={420} height={525} sizes="(max-width: 760px) 120px, 240px" priority />
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
              我也持续通过独立产品探索新的协作方式。LudoReady 用游戏生成任务检验模型的长链路执行能力，Grokoo 则关注多 Agent 如何通过角色与任务状态融入日常桌面。
            </p>
            <dl>
              <div><dt>角色</dt><dd>{profile.role}</dd></div>
              <div><dt>位置</dt><dd><MapPin aria-hidden="true" />{profile.location}</dd></div>
              <div><dt>方向</dt><dd>企业 Agent · 效果评测 · AI Coding · GEO</dd></div>
            </dl>
            <section className="about-route-capabilities">
              <header><h2>核心能力与项目</h2><span>{strengths.length} 项</span></header>
              <div>
                {strengths.map((strength, index) => (
                  <InternalLink href={`/projects/${strength.evidence[0].slug}`} key={strength.id}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <span><strong>{strength.name}</strong><i>{strength.code}</i></span>
                    <ArrowUpRight aria-hidden="true" />
                  </InternalLink>
                ))}
              </div>
            </section>
            <section className="about-community">
              <h2>内容与分享</h2>
              <p>受邀在北京 Grokbot 线下分享会分享 AI 产品实践，持续在小红书和人人都是产品经理输出产品实践与科普内容，累计 30+ 篇。</p>
              <a href="https://xhslink.cn/m/8kPzuC70oCq" target="_blank" rel="noreferrer">查看小红书内容 <ArrowUpRight aria-hidden="true" /></a>
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
