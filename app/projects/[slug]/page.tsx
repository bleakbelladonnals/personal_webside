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

          {project.metrics.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-result-section">
            <header><div><p>RESULTS</p><h2>项目成果</h2></div></header>
            <div className="case-result-grid">
              {project.metrics.map((metric) => (
                <article key={metric.label}><strong>{metric.value}</strong><h3>{metric.label}</h3><p>{metric.detail}</p></article>
              ))}
            </div>
            {project.metricNotes && <p className="case-metric-note">{project.metricNotes}</p>}
          </section>
          )}

          <section className="case-evidence-strip" aria-label="项目性质与证据范围">
            <div><span>PROJECT TYPE</span><strong>{projectTypeLabels[project.projectType]}</strong></div>
            <div><span>STAGE</span><strong>{project.stage}</strong></div>
            <div><span>PROJECT SCOPE</span><p>{project.validationScope}</p></div>
          </section>

          <dl className="case-document-facts">
            <div><dt>AUDIENCE</dt><dd>{project.audience}</dd></div>
            <div><dt>MY ROLE</dt><dd>{project.role}</dd></div>
            <div><dt>CAPABILITIES</dt><dd>{project.capabilities.join(' · ')}</dd></div>
          </dl>


          <section className="case-document-section case-section-unnumbered case-context-section">
            <header><div><p>CONTEXT & PROBLEM</p><h2>场景与问题</h2></div></header>
            <div className="case-document-body">
              <p className="case-lead-copy">{project.context}</p>
              <ul className="case-problem-list">
                {project.problem.map((item) => <li key={item}><span aria-hidden="true">×</span>{item}</li>)}
              </ul>
            </div>
          </section>

          {!project.compact && project.whyAi && (
          <section className="case-document-section case-section-unnumbered case-ai-section">
            <header><div><p>PRODUCT APPROACH</p><h2>方案思路</h2></div></header>
            <blockquote>{project.whyAi}</blockquote>
          </section>
          )}

          {!project.compact && project.decisions.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-decision-section">
            <header><div><p>PRODUCT DECISIONS</p><h2>关键产品决策</h2></div></header>
            <ol>
              {project.decisions.map((decision, decisionIndex) => (
                <li key={decision}><span>{String(decisionIndex + 1).padStart(2, '0')}</span><p>{decision}</p></li>
              ))}
            </ol>
          </section>
          )}

          {!project.compact && project.workflow.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-workflow-section">
            <header><div><p>SYSTEM FLOW</p><h2>产品流程</h2></div></header>
            <SystemDiagram steps={project.workflow} label={project.name} />
          </section>
          )}

          {project.guardrails.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-guardrail-section">
            <header><div><p>HUMAN-IN-THE-LOOP</p><h2>异常处理与人工协作</h2></div></header>
            <div>
              {project.guardrails.map((item) => (
                <article key={item}><ShieldCheck aria-hidden="true" /><p>{item}</p></article>
              ))}
            </div>
          </section>
          )}

          {project.evaluation.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-evaluation-section">
            <header><div><p>EVALUATION</p><h2>效果评测与迭代</h2></div></header>
            <div>
              {project.evaluation.map((item) => <article key={item}><Check aria-hidden="true" /><p>{item}</p></article>)}
            </div>
          </section>
          )}

          {project.workSamples.length > 0 && (
          <section className="case-document-section case-section-unnumbered case-samples-section">
            <header><div><p>DESIGN DETAILS</p><h2>产品设计要点</h2></div></header>
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
          )}


          {!project.compact && <section className="case-document-reflection">
            <p>PRODUCT REFLECTION</p>
            <blockquote>{project.reflection}</blockquote>
            {project.publicLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}><Code2 aria-hidden="true" />{link.label} <ArrowUpRight aria-hidden="true" /></a>
            ))}
          </section>}

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
