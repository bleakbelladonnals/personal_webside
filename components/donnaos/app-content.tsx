import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Code2, Mail, MapPin } from 'lucide-react';
import { capabilities, cases, experience, featuredCases, profile } from '@/lib/portfolio';
import type { AppId } from '@/lib/window-state';

const heroMetrics = [
  { value: '-83%', label: '高频查询耗时', source: 'LumiAgent' },
  { value: '200+', label: 'Agent 任务记录', source: 'AgentDock' },
  { value: '82%', label: 'AI 建议采纳率', source: 'BondMemo' },
  { value: '1,500+', label: '年化内容交付', source: 'LumaFlow' },
];

export const appMeta: Record<AppId, { title: string; code: string }> = {
  brief: { title: 'Recruiter Brief', code: 'PROFILE / HOME' },
  projects: { title: 'Case Studies', code: 'PROJECTS / 06' },
  toolkit: { title: 'AI PM Toolkit', code: 'CAPABILITIES / EVIDENCE' },
  experience: { title: 'Experience', code: 'TIMELINE / 2021–2026' },
  about: { title: 'About / Contact', code: 'DONNA / CONTACT' },
};

function BriefContent({ openApp }: { openApp?: (id: AppId) => void }) {
  return (
    <div className="brief-app">
      <header className="brief-hero">
        <p className="eyebrow">AI PRODUCT MANAGER · BEIJING</p>
        <h1>{profile.headline}</h1>
        <p className="brief-intro">
          {profile.nameCn} {profile.nameEn}｜{profile.role}｜企业 AI、Agent 工作流与 AI 原生产品
        </p>
        <div className="hero-actions">
          <button className="aqua-button" type="button" onClick={() => openApp?.('projects')}>
            查看代表案例
          </button>
          <a className="ghost-button" href={`mailto:${profile.email}`}>联系我</a>
        </div>
      </header>

      <section className="metrics-grid" aria-label="Selected product metrics">
        {heroMetrics.map((metric) => (
          <article key={metric.source}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.source}</small>
          </article>
        ))}
      </section>

      <section>
        <div className="section-heading">
          <span>FEATURED CASES</span>
          <small>3 / 6 SELECTED</small>
        </div>
        <div className="featured-case-grid">
          {featuredCases.map((project, index) => (
            <Link className="featured-case" href={`/projects/${project.slug}`} key={project.slug}>
              <span className="case-number">0{index + 1}</span>
              <p>{project.category}</p>
              <h2>{project.name}</h2>
              <span>{project.summary}</span>
              <b>OPEN CASE <ArrowUpRight aria-hidden="true" /></b>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectsContent() {
  return (
    <div className="projects-app">
      <header className="app-lead">
        <p className="eyebrow">CASE STUDY ARCHIVE</p>
        <h1>不只展示“做了什么”，也说清为什么这样做。</h1>
        <p>每个项目都保留问题、边界、AI 与确定性系统的分工、评测和反思。</p>
      </header>
      <div className="case-list">
        {cases.map((project, index) => (
          <Link className="case-list-item" href={`/projects/${project.slug}`} key={project.slug}>
            <span className="case-list-index">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p>{project.category} · {project.year}</p>
              <h2>{project.name}</h2>
              <span>{project.nameCn}</span>
            </div>
            <p>{project.summary}</p>
            <ArrowUpRight aria-hidden="true" />
          </Link>
        ))}
      </div>
      <Link className="inline-link" href="/projects">打开完整项目归档 <ArrowUpRight aria-hidden="true" /></Link>
    </div>
  );
}

function ToolkitContent() {
  return (
    <div className="toolkit-app">
      <header className="app-lead">
        <p className="eyebrow">CAPABILITIES WITH EVIDENCE</p>
        <h1>能力不用进度条表示，用真实产品决策证明。</h1>
      </header>
      <div className="capability-list">
        {capabilities.map((capability, index) => (
          <article key={capability.code}>
            <header>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><p>{capability.code}</p><h2>{capability.name}</h2></div>
            </header>
            <p>{capability.description}</p>
            <div className="evidence-links">
              {capability.evidence.map((evidence) => (
                <Link href={`/projects/${evidence.slug}`} key={`${capability.code}-${evidence.slug}`}>
                  <CheckCircle2 aria-hidden="true" />
                  <span><b>{evidence.project}</b>{evidence.note}</span>
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="experience-app">
      <header className="app-lead compact-lead">
        <p className="eyebrow">EXPERIENCE / EDUCATION</p>
        <h1>从设计背景到 AI 产品落地。</h1>
      </header>
      <div className="timeline">
        {experience.map((item, index) => (
          <article key={item.period}>
            <span className="timeline-dot" aria-hidden="true" />
            <time>{item.period}</time>
            <p>{index === 2 ? 'EDUCATION' : 'WORK EXPERIENCE'}</p>
            <h2>{item.company}</h2>
            <h3>{item.role}</h3>
            <span>{item.summary}</span>
          </article>
        ))}
      </div>
      <p className="resume-note">此站仅提供网页化经历摘要，不公开包含私人联系信息的简历 PDF。</p>
    </div>
  );
}

function AboutContent() {
  return (
    <div className="about-app">
      <figure className="portrait-shell">
        <Image src="/profile-donna.jpg" alt="甘淑琪 Donna Gan" width={640} height={900} priority />
        <figcaption>DONNA GAN · BEIJING · 2026</figcaption>
      </figure>
      <div className="about-copy">
        <p className="eyebrow">ABOUT DONNA</p>
        <h1>从空间与行为的设计，走到 AI 产品的系统与边界。</h1>
        <p>{profile.intro}</p>
        <p>
          风景园林设计的训练，让我习惯同时理解人、环境、路径与长期行为；在 AI 产品中，这种视角变成了对用户场景、工作流、失败路径和人工介入的持续关注。
        </p>
        <dl className="profile-facts">
          <div><dt>ROLE</dt><dd>{profile.role}</dd></div>
          <div><dt>BASE</dt><dd><MapPin aria-hidden="true" />{profile.location}</dd></div>
          <div><dt>STATUS</dt><dd>{profile.status}</dd></div>
        </dl>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" /><span>Email<b>{profile.email}</b></span></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Code2 aria-hidden="true" /><span>GitHub<b>@bleakbelladonnals</b></span></a>
        </div>
        <p className="privacy-copy">本站不公开手机号、微信二维码或完整简历文件。</p>
      </div>
    </div>
  );
}

export function AppContent({ id, openApp }: { id: AppId; openApp?: (id: AppId) => void }) {
  if (id === 'brief') return <BriefContent openApp={openApp} />;
  if (id === 'projects') return <ProjectsContent />;
  if (id === 'toolkit') return <ToolkitContent />;
  if (id === 'experience') return <ExperienceContent />;
  return <AboutContent />;
}
