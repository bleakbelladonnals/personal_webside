import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteNav } from '@/components/donnaos/site-nav';
import { cases } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Case Studies — DonnaOS',
  description: '甘淑琪的企业 AI、Agent 工作流、消费 AI 与开源产品案例。',
  openGraph: { title: 'Case Studies — DonnaOS', description: '企业 AI、Agent 工作流与 AI 原生产品案例。', images: [] },
  twitter: { card: 'summary', title: 'Case Studies — DonnaOS', description: '企业 AI、Agent 工作流与 AI 原生产品案例。', images: [] },
};

export default function ProjectsPage() {
  return (
    <main className="inner-page projects-page">
      <SiteNav />
      <header className="archive-hero">
        <div>
          <p>CASE STUDY ARCHIVE / 2025–2026</p>
          <h1>用产品决策，<br />而不是技术名词证明能力。</h1>
        </div>
        <p>
          六个案例覆盖企业 AI、Agent UX、消费 AI、内容工作流、AI 产品构建和开源协作。每个项目都保留问题、边界、评测和反思。
        </p>
      </header>

      <section className="archive-grid" aria-label="Project case studies">
        {cases.map((project, index) => (
          <Link className="archive-case-card" href={`/projects/${project.slug}`} key={project.slug}>
            <div className="archive-window-bar">
              <span aria-hidden="true"><i /><i /><i /></span>
              <b>~/projects/{project.slug}</b>
              <small>{String(index + 1).padStart(2, '0')} / 06</small>
            </div>
            <div className="archive-card-copy">
              <p>{project.category} · {project.year}</p>
              <h2>{project.name}</h2>
              <h3>{project.nameCn}</h3>
              <span>{project.summary}</span>
              <b>VIEW CASE <ArrowUpRight aria-hidden="true" /></b>
            </div>
          </Link>
        ))}
      </section>

      <footer className="archive-footer">
        <span>DONNAOS / CASE STUDIES</span>
        <Link href="/about">了解我的背景 →</Link>
      </footer>
    </main>
  );
}
