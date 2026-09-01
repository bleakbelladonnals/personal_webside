import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Code2, Mail, MapPin } from 'lucide-react';
import { SiteNav } from '@/components/donnaos/site-nav';
import { capabilities, profile } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: '关于甘淑琪 — DonnaOS',
  description: '甘淑琪 Donna Gan，北京 AI 产品经理，关注企业 AI、Agent 工作流与人机协作。',
  openGraph: { title: '关于甘淑琪 — DonnaOS', description: profile.intro, images: [] },
  twitter: { card: 'summary', title: '关于甘淑琪 — DonnaOS', description: profile.intro, images: [] },
};

export default function AboutPage() {
  return (
    <main className="inner-page about-page">
      <div className="inner-contours" aria-hidden="true" />
      <SiteNav />
      <section className="about-hero">
        <figure>
          <Image src="/profile-donna.jpg" alt="甘淑琪 Donna Gan" width={900} height={1200} priority />
          <figcaption>DONNA GAN / BEIJING / 2026</figcaption>
        </figure>
        <div>
          <p>ABOUT DONNA</p>
          <h1>从空间与行为的设计，<br />走到 AI 产品的系统与边界。</h1>
          <p className="about-lead">{profile.intro}</p>
          <p>
            风景园林设计让我习惯在多个尺度上观察人、环境、路径与长期行为。转入 AI 产品后，这种训练变成了对用户场景、工作流、失败路径与人工介入的系统性关注。
          </p>
          <dl>
            <div><dt>ROLE</dt><dd>{profile.role}</dd></div>
            <div><dt>BASE</dt><dd><MapPin />{profile.location}</dd></div>
            <div><dt>STATUS</dt><dd>{profile.status}</dd></div>
          </dl>
        </div>
      </section>

      <section className="about-capabilities">
        <header><p>CAPABILITIES</p><h2>每一项能力都能回到具体案例。</h2></header>
        <div>
          {capabilities.map((capability, index) => (
            <article key={capability.code}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{capability.code}</p>
              <h3>{capability.name}</h3>
              <Link href={`/projects/${capability.evidence[0].slug}`}>VIEW EVIDENCE <ArrowUpRight /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-callout">
        <div>
          <p>LET&apos;S TALK</p>
          <h2>如果你正在做企业 AI、Agent 工作流，或需要把复杂任务变成可产品化的体验，欢迎联系我。</h2>
        </div>
        <div className="contact-buttons">
          <a href={`mailto:${profile.email}`}><Mail />{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Code2 />GitHub / @bleakbelladonnals</a>
        </div>
        <small>为保护隐私，本站不公开手机号、微信二维码或简历 PDF。</small>
      </section>
    </main>
  );
}
