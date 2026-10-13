import type { Metadata } from 'next';
import { ArrowUpRight, ExternalLink, FileText, FlaskConical, FolderOpen } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { SiteNav } from '@/components/donnaos/site-nav';
import { cases, labProjects, projectTypeLabels } from '@/lib/portfolio';

export const metadata: Metadata = {
  title: 'Case Studies — DonnaOS',
  description: '企业 AI 产品、Agent 评测与桌面协作，连接业务落地和独立产品探索。',
  alternates: { canonical: '/projects' },
  openGraph: { title: 'Case Studies — DonnaOS', description: '企业产品、独立探索、开源贡献与更多作品。', images: [] },
  twitter: { card: 'summary', title: 'Case Studies — DonnaOS', description: '企业产品、独立探索、开源贡献与更多作品。', images: [] },
};

export default function ProjectsPage() {
  return (
    <main className="mac-route-page projects-page">
      <SiteNav />
      <section className="mac-route-window projects-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>Projects</strong>
          <small>{cases.length} PROJECTS + {labProjects.length} LABS</small>
        </header>
        <div className="mac-route-toolbar">
          <div><FolderOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>All Projects</strong></div>
          <span>{cases.length + labProjects.length} items</span>
        </div>
        <article className="projects-route-document">
          <header>
            <p>CASE STUDY LIBRARY · 2024–2026</p>
            <h1>项目案例</h1>
            <span>从企业业务流程到 Agent 协作体验，记录产品判断、关键方案与实际成果。</span>
          </header>
          {[
            { title: '企业产品与独立探索', more: false },
            { title: '更多作品', more: true },
          ].map((group) => (
            <section className="projects-route-group" key={group.title}>
              <h2>{group.title}</h2>
              <div className="projects-route-list" aria-label={group.title}>
                {cases.filter((project) => !!project.more === group.more).map((project, index) => (
                  <InternalLink href={`/projects/${project.slug}`} key={project.slug}>
                    <span className="projects-route-file"><FileText aria-hidden="true" /></span>
                    <span className="projects-route-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="projects-route-copy">
                      <small>{project.category} · {project.year}</small>
                      <strong>{project.name}<i>{project.nameCn}</i></strong>
                      <p>{project.summary}</p>
                      <span className="projects-route-evidence">{projectTypeLabels[project.projectType]} · {project.stage}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" />
                  </InternalLink>
                ))}
              </div>
            </section>
          ))}

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
