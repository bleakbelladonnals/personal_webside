import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Check, Code2, FileText, Files, ShieldCheck } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { SiteNav } from '@/components/donnaos/site-nav';
import { SystemDiagram } from '@/components/donnaos/system-diagram';
import { noteKindLabels, notes } from '@/lib/notes';
import { cases, getCase, projectTypeLabels } from '@/lib/portfolio';

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
    alternates: { canonical: `/projects/${project.slug}` },
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
  const relatedNotes = notes.filter((note) => note.relatedCaseSlugs.includes(project.slug));

  return (
    <main className="mac-route-page case-page">
      <SiteNav />
      <section className="mac-route-window case-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>{project.name}</strong>
          <small>CASE {String(index + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}</small>
        </header>
        <div className="mac-route-toolbar">
          <InternalLink href="/projects"><ArrowLeft aria-hidden="true" />全部案例</InternalLink>
          <div><FileText aria-hidden="true" /><span>Projects</span><b>/</b><strong>{project.name}</strong></div>
          {project.publicLinks[0] ? <a href={project.publicLinks[0].href} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" />{project.publicLinks[0].label}</a> : <span>{project.year}</span>}
        </div>

        <article className="case-document">
          <header className="case-document-hero">
            <p>{project.category} · {project.year}</p>
            <h1>{project.name}</h1>
            <h2>{project.nameCn}</h2>
            <span>{project.summary}</span>
          </header>

          <section className="case-evidence-strip" aria-label="项目性质与证据范围">
            <div><span>PROJECT TYPE</span><strong>{projectTypeLabels[project.projectType]}</strong></div>
            <div><span>STAGE</span><strong>{project.stage}</strong></div>
            <div><span>VALIDATION SCOPE</span><p>{project.validationScope}</p></div>
          </section>

          <dl className="case-document-facts">
            <div><dt>AUDIENCE</dt><dd>{project.audience}</dd></div>
            <div><dt>MY ROLE</dt><dd>{project.role}</dd></div>
            <div><dt>CAPABILITIES</dt><dd>{project.capabilities.join(' · ')}</dd></div>
          </dl>

          <section className="case-document-section case-context-section">
            <header><span>01</span><div><p>CONTEXT & PROBLEM</p><h2>问题不是从功能清单开始的。</h2></div></header>
            <div className="case-document-body">
              <p className="case-lead-copy">{project.context}</p>
              <ul className="case-problem-list">
                {project.problem.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}
              </ul>
            </div>
          </section>

          <section className="case-document-section case-ai-section">
            <header><span>02</span><div><p>WHY AI</p><h2>AI 负责理解与生成，关键事实和责任不交给它猜。</h2></div></header>
            <blockquote>{project.whyAi}</blockquote>
          </section>

          <section className="case-document-section case-decision-section">
            <header><span>03</span><div><p>PRODUCT DECISIONS</p><h2>最重要的是选择与边界。</h2></div></header>
            <ol>
              {project.decisions.map((decision, decisionIndex) => (
                <li key={decision}><span>{String(decisionIndex + 1).padStart(2, '0')}</span><p>{decision}</p></li>
              ))}
            </ol>
          </section>

          <section className="case-document-section case-workflow-section">
            <header><span>04</span><div><p>SYSTEM FLOW</p><h2>从输入到可验收结果。</h2></div></header>
            <SystemDiagram steps={project.workflow} label={project.name} />
          </section>

          <section className="case-document-section case-guardrail-section">
            <header><span>05</span><div><p>HUMAN-IN-THE-LOOP</p><h2>失败路径和人工介入不是补充功能。</h2></div></header>
            <div>
              {project.guardrails.map((item) => (
                <article key={item}><ShieldCheck aria-hidden="true" /><p>{item}</p></article>
              ))}
            </div>
          </section>

          <section className="case-document-section case-evaluation-section">
            <header><span>06</span><div><p>EVALUATION</p><h2>定义“完成”，比展示一次成功 Demo 更重要。</h2></div></header>
            <div>
              {project.evaluation.map((item) => <article key={item}><Check aria-hidden="true" /><p>{item}</p></article>)}
            </div>
          </section>

          <section className="case-document-section case-samples-section">
            <header><span>07</span><div><p>WORK SAMPLES</p><h2>可检查的产品工作样本</h2></div></header>
            <p className="case-sample-intro">企业项目只展示依据真实过程脱敏重绘的结构，不伪造产品截图；公开项目以仓库和评审记录为准。</p>
            <div className="case-sample-grid">
              {project.workSamples.map((sample) => (
                <article key={sample.id} data-work-sample={sample.id}>
                  <header>
                    <Files aria-hidden="true" />
                    <span><strong>{sample.format}</strong><small>{sample.disclosure}</small></span>
                  </header>
                  <h3>{sample.title}</h3>
                  <p>{sample.summary}</p>
                  <ol>
                    {sample.items.map((item, itemIndex) => <li key={item}><span>{String(itemIndex + 1).padStart(2, '0')}</span>{item}</li>)}
                  </ol>
                </article>
              ))}
            </div>
          </section>

          <section className="case-document-section case-result-section">
            <header><span>08</span><div><p>RESULTS</p><h2>结果与指标口径</h2></div></header>
            <div className="case-result-grid">
              {project.metrics.map((metric) => (
                <article key={metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.detail}</p></article>
              ))}
            </div>
            <p className="case-metric-note"><strong>口径说明</strong>{project.metricNotes}</p>
          </section>

          <section className="case-document-reflection">
            <p>PRODUCT REFLECTION</p>
            <blockquote>{project.reflection}</blockquote>
            {project.publicLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}><Code2 aria-hidden="true" />{link.label} <ArrowUpRight aria-hidden="true" /></a>
            ))}
          </section>

          {relatedNotes.length > 0 && (
            <section className="case-related-notes" aria-labelledby="case-related-notes-title">
              <header><p>RELATED NOTES</p><h2 id="case-related-notes-title">相关产品判断</h2></header>
              <div>
                {relatedNotes.map((note) => (
                  <InternalLink href={`/notes/${note.slug}`} key={note.slug}>
                    <span><small>{noteKindLabels[note.kind]}</small><strong>{note.shortTitle}</strong><i>{note.summary}</i></span>
                    <ArrowUpRight aria-hidden="true" />
                  </InternalLink>
                ))}
              </div>
            </section>
          )}

          <footer className="case-document-next">
            <span>NEXT CASE</span>
            <InternalLink href={`/projects/${next.slug}`}><small>{next.category}</small><strong>{next.name}</strong><ArrowUpRight aria-hidden="true" /></InternalLink>
          </footer>
        </article>
      </section>
    </main>
  );
}
