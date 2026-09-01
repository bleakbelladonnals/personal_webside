import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Code2, ShieldCheck } from 'lucide-react';
import { SiteNav } from '@/components/donnaos/site-nav';
import { SystemDiagram } from '@/components/donnaos/system-diagram';
import { cases, getCase } from '@/lib/portfolio';

export function generateStaticParams() {
  return cases.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) return {};
  const title = `${project.name} — DonnaOS Case Study`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, images: [] },
    twitter: { card: 'summary', title, description: project.summary, images: [] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) notFound();
  const index = cases.findIndex((item) => item.slug === slug);
  const next = cases[(index + 1) % cases.length];

  return (
    <main className="inner-page case-page">
      <SiteNav />

      <header className="case-hero">
        <Link className="case-back" href="/projects"><ArrowLeft aria-hidden="true" />ALL CASES</Link>
        <div className="case-hero-grid">
          <div>
            <p>{project.category} · {project.year}</p>
            <h1>{project.name}</h1>
            <h2>{project.nameCn}</h2>
            <span>{project.summary}</span>
          </div>
          <div className="case-identity-card" aria-label={`${project.name} case index`}>
            <header><span aria-hidden="true"><i /><i /><i /></span><b>~/case-study</b></header>
            <div><small>CASE</small><strong>{String(index + 1).padStart(2, '0')}</strong><span>{project.category}</span></div>
          </div>
        </div>
      </header>

      <section className="case-facts">
        <div><span>AUDIENCE</span><p>{project.audience}</p></div>
        <div><span>MY ROLE</span><p>{project.role}</p></div>
        <div><span>CAPABILITIES</span><p>{project.capabilities.join(' · ')}</p></div>
      </section>

      <section className="case-section split-section">
        <header><span>01</span><p>CONTEXT & PROBLEM</p><h2>问题不是从功能清单开始的。</h2></header>
        <div className="section-body">
          <p className="lead-copy">{project.context}</p>
          <ul className="problem-list">
            {project.problem.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="case-section ai-rationale">
        <header><span>02</span><p>WHY AI</p><h2>AI 负责理解与生成，关键事实和责任不交给它猜。</h2></header>
        <blockquote>{project.whyAi}</blockquote>
      </section>

      <section className="case-section decision-section">
        <header><span>03</span><p>PRODUCT DECISIONS</p><h2>最重要的是选择与边界。</h2></header>
        <ol>
          {project.decisions.map((decision, decisionIndex) => (
            <li key={decision}><span>{String(decisionIndex + 1).padStart(2, '0')}</span><p>{decision}</p></li>
          ))}
        </ol>
      </section>

      <section className="case-section workflow-section">
        <header><span>04</span><p>SYSTEM FLOW</p><h2>从输入到可验收结果。</h2></header>
        <SystemDiagram steps={project.workflow} label={project.name} />
      </section>

      <section className="case-section guardrail-section">
        <header><span>05</span><p>HUMAN-IN-THE-LOOP</p><h2>失败路径和人工介入不是补充功能。</h2></header>
        <div>
          {project.guardrails.map((item) => (
            <article key={item}><ShieldCheck aria-hidden="true" /><p>{item}</p></article>
          ))}
        </div>
      </section>

      <section className="case-section evaluation-section">
        <header><span>06</span><p>EVALUATION</p><h2>定义“完成”，比展示一次成功 Demo 更重要。</h2></header>
        <div className="evaluation-grid">
          {project.evaluation.map((item) => <article key={item}><Check aria-hidden="true" /><p>{item}</p></article>)}
        </div>
      </section>

      <section className="case-results">
        <header><p>07 / RESULTS</p><h2>结果与指标口径</h2></header>
        <div className="result-grid">
          {project.metrics.map((metric) => (
            <article key={metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="case-reflection">
        <p>PRODUCT REFLECTION</p>
        <blockquote>{project.reflection}</blockquote>
        {project.link ? <a href={project.link} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" />VIEW PROJECT <ArrowUpRight aria-hidden="true" /></a> : null}
      </section>

      <footer className="next-case">
        <span>NEXT CASE</span>
        <Link href={`/projects/${next.slug}`}><small>{next.category}</small>{next.name}<ArrowUpRight aria-hidden="true" /></Link>
      </footer>
    </main>
  );
}
