import type { Metadata } from 'next';
import { ArrowUpRight, ExternalLink, FileText, FlaskConical, FolderOpen } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { SiteNav } from '@/components/donnaos/site-nav';
import { cases, labProjects, projectTypeLabels } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Case Studies — DonnaOS',
  description: '六个成熟案例与两个 Lab 项目，覆盖企业 AI、Agent 评测、AI Coding、消费 AI 与开源协作。',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Case Studies — DonnaOS', description: '六个成熟案例与两个独立 Lab 项目。', images: [] },
  twitter: { card: 'summary', title: 'Case Studies — DonnaOS', description: '六个成熟案例与两个独立 Lab 项目。', images: [] },
};

export default function ProjectsPage() {
  return (
    <main className="mac-route-page projects-page">
      <SiteNav />
      <section className="mac-route-window projects-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>Projects</strong>
          <small>6 CASES + 2 LABS</small>
        </header>
        <div className="mac-route-toolbar">
          <div><FolderOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>All Projects</strong></div>
          <span>{cases.length + labProjects.length} items</span>
        </div>
        <article className="projects-route-document">
          <header>
            <p>CASE STUDY LIBRARY · 2025–2026</p>
            <h1>项目案例</h1>
            <span>六个成熟案例负责说明交付深度；两个 Lab 项目单独展示正在验证的 Agent 与 MCP 产品假设。</span>
          </header>
          <div className="projects-route-list" aria-label="Project case studies">
            {cases.map((project, index) => (
              <InternalLink href={`/projects/${project.slug}`} key={project.slug}>
                <span className="projects-route-file"><FileText aria-hidden="true" /></span>
                <span className="projects-route-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="projects-route-copy">
                  <small>{project.category} · {project.year}</small>
                  <strong>{project.name}<i>{project.nameCn}</i></strong>
                  <p>{project.summary}</p>
                  <span className="projects-route-evidence">{projectTypeLabels[project.projectType]} · {project.stage} · {project.workSamples.length} 份工作样本</span>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </InternalLink>
            ))}
          </div>

          <section className="projects-route-lab" aria-labelledby="projects-lab-title">
            <header>
              <div><p>LAB / EXPLORATIONS</p><h2 id="projects-lab-title">实验室</h2></div>
              <span>{labProjects.length} 个公开插件</span>
            </header>
            <div>
              {labProjects.map((project) => (
                <a href={project.publicLinks[0].href} target="_blank" rel="noreferrer" key={project.slug}>
                  <FlaskConical aria-hidden="true" />
                  <span>
                    <small>{project.category} · {project.year}</small>
                    <strong>{project.name}</strong>
                    <p>{project.summary}</p>
                    <i>{project.stage}</i>
                  </span>
                  <ExternalLink aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </article>
        <footer className="mac-route-footer">
          <span>DonnaOS / Projects</span>
          <InternalLink href="/about">了解 Donna →</InternalLink>
        </footer>
      </section>
    </main>
  );
}
