'use client';

import { useMemo, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileText,
  Files,
  FlaskConical,
  Folder,
  FolderOpen,
  Grid2X2,
  Heart,
  Mail,
  MapPin,
  ShieldCheck,
  Star,
  Tags,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import {
  cases,
  experience,
  featuredCases,
  labProjects,
  profile,
  projectTypeLabels,
  strengths,
  type CaseStudy,
  type LabProject,
} from '@/lib/portfolio';
import { noteKindLabels, notes, noteStatusLabels, type Note, type NoteKind } from '@/lib/notes';
import { withBasePath } from '@/lib/site';
import type { AppId } from '@/lib/window-state';

type OpenAppOptions = { projectSlug?: string };
type OpenAppHandler = (id: AppId, options?: OpenAppOptions) => void;

type FinderItem = { kind: 'case'; data: CaseStudy } | { kind: 'lab'; data: LabProject };
type ProjectFilterId = 'featured' | 'all' | 'enterprise' | 'agent' | 'consumer' | 'open-source' | 'lab';
type ProjectFilter = {
  id: ProjectFilterId;
  label: string;
  icon: LucideIcon;
  matches: (item: FinderItem) => boolean;
};

type NoteFilterId = 'all' | NoteKind | `tag:${string}`;

const finderItems: FinderItem[] = [
  ...cases.map((data): FinderItem => ({ kind: 'case', data })),
  ...labProjects.map((data): FinderItem => ({ kind: 'lab', data })),
];

const projectFilters: ProjectFilter[] = [
  { id: 'featured', label: '精选项目', icon: Star, matches: (item) => item.kind === 'case' && item.data.featured },
  { id: 'all', label: '全部案例', icon: Grid2X2, matches: (item) => item.kind === 'case' },
  {
    id: 'enterprise',
    label: '企业 AI',
    icon: Building2,
    matches: (item) => item.kind === 'case' && ['lumiagent', 'lumaflow'].includes(item.data.slug),
  },
  {
    id: 'agent',
    label: 'Agent 产品',
    icon: Bot,
    matches: (item) => item.kind === 'case' && ['agentdock', 'zaowutai'].includes(item.data.slug),
  },
  { id: 'consumer', label: '消费 AI', icon: Heart, matches: (item) => item.kind === 'case' && item.data.slug === 'bondmemo' },
  {
    id: 'open-source',
    label: '开源贡献',
    icon: Code2,
    matches: (item) => item.kind === 'case' && item.data.slug === 'microsoft-mcp',
  },
  { id: 'lab', label: 'Lab 实验室', icon: FlaskConical, matches: (item) => item.kind === 'lab' },
];

const briefEvidence = [
  { project: 'LumiAgent', value: '12 → 2 min', label: '高频查询中位耗时' },
  { project: 'LumiAgent', value: '90% / 100 条', label: '核心任务通过率 / 回归集' },
  { project: 'LumaFlow', value: '64% → 85%', label: '一次审核通过率' },
];

export const appMeta: Record<
  AppId,
  {
    title: string;
    code: string;
    appearance: 'light' | 'dark';
    layout: 'finder' | 'preview' | 'notes' | 'library' | 'resume' | 'profile' | 'desk' | 'mail' | 'standard';
  }
> = {
  brief: { title: 'Recruiter Brief', code: 'PROFILE', appearance: 'light', layout: 'preview' },
  projects: { title: 'Projects', code: '6 CASES + 2 LABS', appearance: 'light', layout: 'finder' },
  notes: { title: 'Product Notes', code: '3 WORKING NOTES', appearance: 'light', layout: 'notes' },
  toolkit: { title: 'AI PM Toolkit', code: '4 STRENGTHS', appearance: 'light', layout: 'library' },
  experience: { title: 'Experience', code: '2021–2026', appearance: 'light', layout: 'resume' },
  about: { title: 'About Donna', code: 'CONTACT CARD', appearance: 'light', layout: 'profile' },
  desk: { title: "Donna's Desk", code: 'NOW / READ / BUILD', appearance: 'light', layout: 'desk' },
  contact: { title: 'Contact', code: 'MAIL', appearance: 'light', layout: 'mail' },
};

function BriefContent({ openApp }: { openApp?: OpenAppHandler }) {
  return (
    <div className="brief-preview-app">
      <div className="brief-preview-toolbar">
        <div className="brief-preview-path"><FileText aria-hidden="true" /><span>Recruiter Brief.pdf</span></div>
        <div className="brief-preview-actions">
          <button type="button" onClick={() => openApp?.('projects')}>查看项目</button>
          <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />发送邮件</a>
        </div>
      </div>

      <article className="brief-preview-document">
        <header className="brief-profile-header">
          <Image className="brief-avatar" src={withBasePath('/profile-donna.jpg')} alt="甘淑琪 Donna Gan" width={104} height={104} sizes="52px" priority />
          <div>
            <div className="brief-name-line">
              <h1>{profile.nameEn}</h1>
              <span>{profile.nameCn}</span>
            </div>
            <p>{profile.role} · {profile.location}</p>
            <span className="brief-status"><i aria-hidden="true" />{profile.status}</span>
          </div>
        </header>

        <p className="brief-summary">{profile.intro}</p>

        <ul className="brief-focus-list" aria-label="四项核心优势">
          {strengths.map((strength) => <li key={strength.id}>{strength.name}</li>)}
        </ul>

        <section className="brief-evidence" aria-labelledby="brief-evidence-title">
          <header><h2 id="brief-evidence-title">Selected evidence</h2><span>来源见完整案例</span></header>
          <div>
            {briefEvidence.map((item) => (
              <article key={`${item.project}-${item.label}`}>
                <span>{item.project}</span>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="brief-projects" aria-labelledby="brief-projects-title">
          <header><h2 id="brief-projects-title">代表项目</h2><span>3 个精选案例</span></header>
          <div>
            {featuredCases.map((project) => (
              <button
                type="button"
                key={project.slug}
                onClick={() => openApp?.('projects', { projectSlug: project.slug })}
              >
                <Folder aria-hidden="true" />
                <span><strong>{project.name}</strong><small>{project.nameCn}</small></span>
                <ArrowUpRight aria-hidden="true" />
              </button>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}

function ProjectsContent({ initialProjectSlug }: { initialProjectSlug?: string }) {
  const initialProject = cases.find((project) => project.slug === initialProjectSlug) ?? featuredCases[0] ?? cases[0];
  const initialItem = finderItems.find((item) => item.kind === 'case' && item.data.slug === initialProject.slug) ?? finderItems[0];
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>(initialProject.featured ? 'featured' : 'all');
  const [selectedKey, setSelectedKey] = useState(`${initialItem.kind}:${initialItem.data.slug}`);
  const [mobilePanel, setMobilePanel] = useState<'list' | 'preview'>('list');

  const filteredItems = useMemo(() => {
    const filter = projectFilters.find((item) => item.id === activeFilter) ?? projectFilters[0];
    return finderItems.filter(filter.matches);
  }, [activeFilter]);

  const selectedItem = finderItems.find((item) => `${item.kind}:${item.data.slug}` === selectedKey) ?? filteredItems[0] ?? finderItems[0];
  const selectedData = selectedItem.data;

  const chooseFilter = (id: ProjectFilterId) => {
    const filter = projectFilters.find((item) => item.id === id) ?? projectFilters[0];
    const nextItems = finderItems.filter(filter.matches);
    setActiveFilter(id);
    if (nextItems[0]) setSelectedKey(`${nextItems[0].kind}:${nextItems[0].data.slug}`);
    setMobilePanel('list');
  };

  const chooseProject = (item: FinderItem) => {
    setSelectedKey(`${item.kind}:${item.data.slug}`);
    setMobilePanel('preview');
  };

  const openItem = (item: FinderItem) => {
    if (item.kind === 'case') {
      window.location.assign(withBasePath(`/projects/${item.data.slug}`));
      return;
    }
    const target = item.data.publicLinks[0]?.href;
    if (target) window.open(target, '_blank', 'noopener,noreferrer');
  };

  const handleProjectKeyDown = (event: KeyboardEvent<HTMLButtonElement>, item: FinderItem) => {
    if (event.key !== 'Enter') return;
    event.preventDefault();
    openItem(item);
  };

  return (
    <div className={`finder-app is-${mobilePanel}`}>
      <div className="finder-toolbar">
        <div className="finder-breadcrumb"><FolderOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>Projects</strong></div>
        <span>{filteredItems.length} items</span>
      </div>

      <aside className="finder-sidebar" aria-label="项目分类">
        <p>Favorites</p>
        <nav>
          {projectFilters.map((filter) => {
            const Icon = filter.icon;
            const count = finderItems.filter(filter.matches).length;
            return (
              <button
                type="button"
                key={filter.id}
                className={activeFilter === filter.id ? 'is-active' : undefined}
                onClick={() => chooseFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                <Icon aria-hidden="true" /><span>{filter.label}</span><small>{count}</small>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="finder-list-pane" aria-labelledby="finder-list-title">
        <header><h1 id="finder-list-title">{projectFilters.find((item) => item.id === activeFilter)?.label}</h1><span>{filteredItems.length}</span></header>
        <div className="finder-project-list" aria-label="项目列表">
          {filteredItems.map((item) => {
            const itemKey = `${item.kind}:${item.data.slug}`;
            const ItemIcon = item.kind === 'lab' ? FlaskConical : Folder;
            return (
            <button
              type="button"
              aria-pressed={selectedKey === itemKey}
              data-finder-project={item.data.slug}
              data-finder-kind={item.kind}
              className={selectedKey === itemKey ? 'is-selected' : undefined}
              key={itemKey}
              onClick={() => chooseProject(item)}
              onDoubleClick={() => openItem(item)}
              onKeyDown={(event) => handleProjectKeyDown(event, item)}
            >
              <ItemIcon aria-hidden="true" />
              <span><strong>{item.data.name}</strong><small>{item.data.nameCn}</small></span>
              <time>{item.data.year}</time>
            </button>
            );
          })}
        </div>
      </section>

      <article className="finder-quicklook" aria-live="polite">
        <button className="finder-mobile-back" type="button" onClick={() => setMobilePanel('list')}>
          <ArrowLeft aria-hidden="true" />项目列表
        </button>
        <header className="quicklook-heading">
          <div className={`quicklook-file-icon${selectedItem.kind === 'lab' ? ' is-lab' : ''}`}>
            {selectedItem.kind === 'lab' ? <FlaskConical aria-hidden="true" /> : <FileText aria-hidden="true" />}
          </div>
          <div>
            <p>{selectedData.category} · {selectedData.year}</p>
            <h2>{selectedData.name}</h2>
            <span>{selectedData.nameCn}</span>
          </div>
        </header>

        <p className="quicklook-summary">{selectedData.summary}</p>

        <section className="quicklook-evidence" aria-label="项目证据与阶段">
          <span>{selectedItem.kind === 'case' ? projectTypeLabels[selectedItem.data.projectType] : 'Lab 实验室'}</span>
          <strong>{selectedData.stage}</strong>
          <p>{selectedData.validationScope}</p>
        </section>

        <dl className="quicklook-facts">
          {selectedItem.kind === 'case' ? (
            <>
              <div><dt><BriefcaseBusiness aria-hidden="true" />角色</dt><dd>{selectedItem.data.role}</dd></div>
              <div><dt><Users aria-hidden="true" />用户</dt><dd>{selectedItem.data.audience}</dd></div>
            </>
          ) : (
            <>
              <div><dt><FlaskConical aria-hidden="true" />问题</dt><dd>{selectedItem.data.problem}</dd></div>
              <div><dt><ShieldCheck aria-hidden="true" />方案</dt><dd>{selectedItem.data.approach}</dd></div>
            </>
          )}
        </dl>

        {selectedItem.kind === 'case' ? (
          <>
            <section className="quicklook-metrics" aria-label="项目指标">
              {selectedItem.data.metrics.slice(0, 2).map((metric) => (
                <article key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                  <small>{metric.detail}</small>
                </article>
              ))}
            </section>
            <p className="quicklook-metric-note">{selectedItem.data.metricNotes}</p>
            <section className="quicklook-work-samples" aria-label="项目工作样本">
              <header><span>工作样本</span><small>{selectedItem.data.workSamples.length} items</small></header>
              <div>
                {selectedItem.data.workSamples.slice(0, 2).map((sample) => (
                  <article key={sample.id} data-work-sample={sample.id}>
                    <Files aria-hidden="true" />
                    <span><strong>{sample.title}</strong><small>{sample.disclosure}</small></span>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <ul className="quicklook-lab-guardrails" aria-label="实验项目边界">
            {selectedItem.data.guardrails.map((guardrail) => <li key={guardrail}>{guardrail}</li>)}
          </ul>
        )}

        <ul className="quicklook-tags" aria-label="能力标签">
          {selectedData.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>

        <div className="quicklook-actions">
          {selectedItem.kind === 'case' && (
            <InternalLink className="quicklook-primary" href={`/projects/${selectedItem.data.slug}`}>
              查看完整案例 <ArrowUpRight aria-hidden="true" />
            </InternalLink>
          )}
          {selectedData.publicLinks.map((link, index) => (
            <a
              className={selectedItem.kind === 'lab' && index === 0 ? 'quicklook-primary' : undefined}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              key={link.href}
            >
              {selectedItem.kind === 'lab' && index === 0 ? '打开公开仓库' : link.label} <ExternalLink aria-hidden="true" />
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}

const noteTags = Array.from(new Set(notes.flatMap((note) => note.tags)));

function NotesContent() {
  const [activeFilter, setActiveFilter] = useState<NoteFilterId>('all');
  const [selectedSlug, setSelectedSlug] = useState(notes[0]?.slug ?? '');
  const [mobilePanel, setMobilePanel] = useState<'list' | 'preview'>('list');

  const filteredNotes = useMemo(() => {
    if (activeFilter === 'all') return notes;
    if (activeFilter === 'teardown' || activeFilter === 'learning') {
      return notes.filter((note) => note.kind === activeFilter);
    }
    const tag = activeFilter.replace(/^tag:/, '');
    return notes.filter((note) => note.tags.includes(tag));
  }, [activeFilter]);

  const selectedNote = notes.find((note) => note.slug === selectedSlug) ?? filteredNotes[0] ?? notes[0];

  const chooseFilter = (id: NoteFilterId) => {
    const nextNotes = id === 'all'
      ? notes
      : id === 'teardown' || id === 'learning'
        ? notes.filter((note) => note.kind === id)
        : notes.filter((note) => note.tags.includes(id.replace(/^tag:/, '')));
    setActiveFilter(id);
    if (nextNotes[0]) setSelectedSlug(nextNotes[0].slug);
    setMobilePanel('list');
  };

  const chooseNote = (note: Note) => {
    setSelectedSlug(note.slug);
    setMobilePanel('preview');
  };

  const openNote = (note: Note) => window.location.assign(withBasePath(`/notes/${note.slug}`));
  const activeLabel = activeFilter === 'all'
    ? '全部笔记'
    : activeFilter === 'teardown' || activeFilter === 'learning'
      ? noteKindLabels[activeFilter]
      : activeFilter.replace(/^tag:/, '');

  if (!selectedNote) return null;
  const relatedCases = selectedNote.relatedCaseSlugs
    .map((slug) => cases.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);

  return (
    <div className={`notes-app is-${mobilePanel}`}>
      <div className="notes-toolbar">
        <div><BookOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>Notes</strong></div>
        <span>{filteredNotes.length} notes</span>
      </div>

      <aside className="notes-sidebar" aria-label="笔记分类">
        <p>Library</p>
        <nav>
          <button type="button" className={activeFilter === 'all' ? 'is-active' : undefined} onClick={() => chooseFilter('all')}>
            <BookOpen aria-hidden="true" /><span>全部笔记</span><small>{notes.length}</small>
          </button>
          {(['teardown', 'learning'] as NoteKind[]).map((kind) => (
            <button type="button" key={kind} className={activeFilter === kind ? 'is-active' : undefined} onClick={() => chooseFilter(kind)}>
              <FileText aria-hidden="true" /><span>{noteKindLabels[kind]}</span><small>{notes.filter((note) => note.kind === kind).length}</small>
            </button>
          ))}
        </nav>
        <p>Topics</p>
        <nav>
          {noteTags.map((tag) => {
            const id = `tag:${tag}` as const;
            return (
              <button type="button" key={tag} className={activeFilter === id ? 'is-active' : undefined} onClick={() => chooseFilter(id)}>
                <Tags aria-hidden="true" /><span>{tag}</span><small>{notes.filter((note) => note.tags.includes(tag)).length}</small>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="notes-list-pane" aria-labelledby="notes-list-title">
        <header><h1 id="notes-list-title">{activeLabel}</h1><span>{filteredNotes.length}</span></header>
        <div className="notes-list" aria-label="文章列表">
          {filteredNotes.map((note) => (
            <button
              type="button"
              data-note-slug={note.slug}
              aria-pressed={selectedNote.slug === note.slug}
              className={selectedNote.slug === note.slug ? 'is-selected' : undefined}
              key={note.slug}
              onClick={() => chooseNote(note)}
              onDoubleClick={() => openNote(note)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                openNote(note);
              }}
            >
              <span><strong>{note.shortTitle}</strong><small>{note.summary}</small></span>
              <time>{note.updatedAt.slice(5)}</time>
              <i>{noteKindLabels[note.kind]}</i>
            </button>
          ))}
        </div>
      </section>

      <article className="notes-preview" aria-live="polite">
        <button className="notes-mobile-back" type="button" onClick={() => setMobilePanel('list')}>
          <ArrowLeft aria-hidden="true" />笔记列表
        </button>
        <header className="notes-preview-heading">
          <p>{noteKindLabels[selectedNote.kind]} · 更新于 {selectedNote.updatedAt}</p>
          <h2>{selectedNote.title}</h2>
          <span><i aria-hidden="true" />{noteStatusLabels[selectedNote.status]}</span>
        </header>

        <blockquote className="notes-preview-thesis"><span>核心判断</span>{selectedNote.thesis}</blockquote>

        <section className="notes-preview-outline" aria-labelledby="notes-preview-outline-title">
          <header><h3 id="notes-preview-outline-title">本文提纲</h3><span>{selectedNote.outline.length} sections</span></header>
          <ol>
            {selectedNote.outline.slice(0, 5).map((heading, index) => (
              <li key={heading}><span>{String(index + 1).padStart(2, '0')}</span>{heading}</li>
            ))}
          </ol>
        </section>

        <section className="notes-preview-visual" aria-label="关键关系预览">
          <span>{selectedNote.visuals[0].title}</span>
          <div>
            {selectedNote.visuals[0].items.map((item, index) => (
              <i key={item}><small>{String(index + 1).padStart(2, '0')}</small>{item}</i>
            ))}
          </div>
        </section>

        <p className="notes-preview-copy">{selectedNote.preview}</p>

        <ul className="notes-preview-tags" aria-label="文章标签">
          {selectedNote.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>

        <section className="notes-preview-related" aria-label="关联案例">
          <span>关联案例</span>
          <div>{relatedCases.map((project) => <InternalLink href={`/projects/${project.slug}`} key={project.slug}>{project.name}<ArrowUpRight aria-hidden="true" /></InternalLink>)}</div>
        </section>

        <div className="notes-preview-actions">
          <InternalLink className="notes-preview-primary" href={`/notes/${selectedNote.slug}`}>阅读全文 <ArrowUpRight aria-hidden="true" /></InternalLink>
          <span>{selectedNote.sources.length} 个公开来源</span>
        </div>
      </article>
    </div>
  );
}

function ToolkitContent() {
  return (
    <div className="toolkit-library-app">
      <div className="mac-app-toolbar">
        <div><FolderOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>AI PM Toolkit</strong></div>
        <small>{strengths.length} strengths</small>
      </div>
      <article className="toolkit-library-document">
        <header className="mac-document-heading">
          <div className="mac-document-icon"><Code2 aria-hidden="true" /></div>
          <div>
            <p>CAPABILITY LIBRARY</p>
            <h1>AI PM Toolkit</h1>
            <span>四项能力对应四类真实证据：业务落地、Agent 评测、AI Coding 开源与增长验证。</span>
          </div>
        </header>
        <div className="capability-library-list">
          {strengths.map((strength, index) => (
            <article key={strength.id}>
              <span className="capability-library-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="capability-library-copy">
                <p>{strength.code}</p>
                <h2>{strength.name}</h2>
                <span>{strength.description}</span>
              </div>
              <div className="capability-library-evidence">
                {strength.evidence.map((evidence) => (
                  <InternalLink href={`/projects/${evidence.slug}`} key={`${strength.id}-${evidence.slug}`}>
                    <CheckCircle2 aria-hidden="true" />
                    <span><b>{evidence.project}</b><small>{evidence.note}</small></span>
                    <ArrowUpRight aria-hidden="true" />
                  </InternalLink>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>
    </div>
  );
}

function ExperienceContent() {
  return (
    <div className="experience-preview-app">
      <div className="mac-app-toolbar">
        <div><FileText aria-hidden="true" /><span>Donna Gan</span><b>/</b><strong>Experience</strong></div>
        <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />联系 Donna</a>
      </div>
      <article className="experience-document">
        <header className="experience-document-heading">
          <p>EXPERIENCE / EDUCATION</p>
          <h1>工作与教育经历</h1>
          <span>从设计训练出发，逐步进入产品设计、企业 AI 与 Agent 工作流的真实业务落地。</span>
        </header>
        <ol className="experience-document-list">
          {experience.map((item, index) => (
            <li key={item.period}>
              <time>{item.period}</time>
              <article>
                <span>{index === 2 ? 'EDUCATION' : 'WORK EXPERIENCE'}</span>
                <h2>{item.company}</h2>
                <h3>{item.role}</h3>
                <p>{item.summary}</p>
                {item.details && (
                  <ul className="experience-document-details">
                    {item.details.map((detail) => (
                      <li key={detail.heading}>
                        <strong>{detail.heading}：</strong>{detail.body}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </li>
          ))}
        </ol>
        <footer>网页不公开包含私人联系信息的简历 PDF。</footer>
      </article>
    </div>
  );
}

function AboutContent({ openApp }: { openApp?: OpenAppHandler }) {
  return (
    <div className="about-contacts-app">
      <div className="mac-app-toolbar">
        <div><Users aria-hidden="true" /><span>Contacts</span><b>/</b><strong>Donna Gan</strong></div>
        <InternalLink href="/about">查看完整资料 <ArrowUpRight aria-hidden="true" /></InternalLink>
      </div>
      <article className="about-contact-document">
        <aside className="about-photo-panel">
          <Image src={withBasePath('/profile-donna.jpg')} alt="甘淑琪 Donna Gan" width={380} height={475} sizes="190px" />
          <span><i aria-hidden="true" />{profile.status}</span>
        </aside>
        <div className="about-contact-copy">
          <header>
            <p>AI PRODUCT MANAGER</p>
            <h1>{profile.nameEn}</h1>
            <span>{profile.nameCn} · {profile.location}</span>
          </header>
          <p className="about-contact-intro">{profile.intro}</p>
          <p>
            风景园林设计训练了我从多尺度理解人、环境与路径；转入 AI 产品后，这种视角变成了对真实场景、工作流、失败路径和人工责任的持续关注。
          </p>
          <dl className="about-contact-facts">
            <div><dt>角色</dt><dd>{profile.role}</dd></div>
            <div><dt>方向</dt><dd>企业 AI 0→1 · Agent 评测 · AI Coding · SEO</dd></div>
            <div><dt>位置</dt><dd><MapPin aria-hidden="true" />{profile.location}</dd></div>
          </dl>
          <div className="about-contact-actions">
            <button type="button" onClick={() => openApp?.('projects')}>查看项目</button>
            <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" />发送邮件</a>
          </div>
        </div>
      </article>
    </div>
  );
}

const deskPrinciples = [
  '先定义任务与通过标准，再讨论模型和功能。',
  '把人工介入、失败恢复与审计记录设计进主流程。',
  '区分事实、推断与待验证假设，不用 Demo 冒充验证。',
  '结果、验证范围与指标口径必须一起出现。',
];

function DeskContent({ openApp }: { openApp?: OpenAppHandler }) {
  return (
    <div className="desk-app">
      <div className="mac-app-toolbar desk-toolbar">
        <div><FolderOpen aria-hidden="true" /><span>Workspaces</span><b>/</b><strong>Donna&apos;s Desk</strong></div>
        <small>SYNCED · SEP 02</small>
      </div>
      <article className="desk-workspace">
        <aside className="desk-sidebar" data-desk-section="status">
          <header>
            <span><FolderOpen aria-hidden="true" /></span>
            <div><strong>Work Surface</strong><small>本月工作台</small></div>
          </header>
          <nav aria-label="工作台分区">
            <p>SECTIONS</p>
            <button className="is-active" type="button" onClick={() => openApp?.('projects')}>
              <Files aria-hidden="true" /><span><strong>当前项目</strong><small>2 active</small></span>
            </button>
            <button type="button" onClick={() => openApp?.('notes')}>
              <BookOpen aria-hidden="true" /><span><strong>阅读队列</strong><small>{notes.length} notes</small></span>
            </button>
            <button type="button" onClick={() => openApp?.('projects')}>
              <FlaskConical aria-hidden="true" /><span><strong>公开实验</strong><small>{labProjects.length} builds</small></span>
            </button>
          </nav>
          <footer><i aria-hidden="true" /><span><strong>Open to work</strong><small>AI Product Manager · Beijing</small></span></footer>
        </aside>

        <div className="desk-workarea">
          <header className="desk-workarea-heading">
            <div><p>DESK / 2026.09.02</p><h1>今天的工作台</h1><span>只放正在推进、能直接打开的材料。</span></div>
            <time dateTime="2026-09-02">WED · 02</time>
          </header>

          <section className="desk-active-board" data-desk-section="now">
            <header><div><p>ACTIVE</p><h2>现在在做</h2></div><span>2 ITEMS</span></header>
            <div>
              <button type="button" onClick={() => openApp?.('projects', { projectSlug: 'lumiagent' })}>
                <span className="desk-task-state">IN REVIEW</span>
                <span><strong>案例工作样本柜</strong><i>决策记录、流程结构和评测材料已经接入 6 个案例。</i></span>
                <small>18 / 18</small><ArrowUpRight aria-hidden="true" />
              </button>
              <button type="button" onClick={() => openApp?.('notes')}>
                <span className="desk-task-state is-writing">WRITING</span>
                <span><strong>Agent 产品判断</strong><i>继续整理评测、人工介入和工作空间设计。</i></span>
                <small>3 NOTES</small><ArrowUpRight aria-hidden="true" />
              </button>
            </div>
          </section>

          <div className="desk-shelves">
            <section className="desk-reading-shelf" data-desk-section="reading">
              <header><div><BookOpen aria-hidden="true" /><span><p>READING QUEUE</p><h2>最近整理</h2></span></div><small>{notes.length}</small></header>
              <div>
                {notes.slice(0, 3).map((note, index) => (
                  <InternalLink href={`/notes/${note.slug}`} key={note.slug}>
                    <small>{String(index + 1).padStart(2, '0')}</small><span><strong>{note.shortTitle}</strong><i>{noteKindLabels[note.kind]}</i></span><ArrowUpRight aria-hidden="true" />
                  </InternalLink>
                ))}
              </div>
            </section>

            <section className="desk-builds-shelf" data-desk-section="builds">
              <header><div><FlaskConical aria-hidden="true" /><span><p>PUBLIC BUILDS</p><h2>公开实验</h2></span></div><small>{labProjects.length}</small></header>
              <div>
                {labProjects.map((project) => (
                  <a href={project.publicLinks[0].href} target="_blank" rel="noreferrer" key={project.slug}>
                    <Folder aria-hidden="true" /><span><strong>{project.name}</strong><i>{project.stage}</i></span><ExternalLink aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          </div>

          <section className="desk-principles-strip" data-desk-section="principles">
            <header><CheckCircle2 aria-hidden="true" /><span><p>RULES.TXT</p><h2>判断原则</h2></span></header>
            <ol>{deskPrinciples.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}</ol>
          </section>
        </div>
      </article>
    </div>
  );
}

function ContactContent() {
  return (
    <div className="contact-mail-app">
      <div className="mac-app-toolbar">
        <div><Mail aria-hidden="true" /><span>Mail</span><b>/</b><strong>Contact Donna</strong></div>
        <span className="contact-availability"><i aria-hidden="true" />AVAILABLE</span>
      </div>
      <article className="contact-mail-document">
        <header>
          <p>LET&apos;S TALK</p>
          <h1>一起把复杂的 AI 能力，做成真正可用的产品。</h1>
          <span>企业 AI、Agent 工作流、AI 原生产品与相关产品岗位，欢迎直接联系。</span>
        </header>
        <dl className="contact-mail-fields">
          <div><dt>To</dt><dd>Donna Gan · 甘淑琪</dd></div>
          <div><dt>Base</dt><dd>{profile.location}</dd></div>
          <div><dt>Status</dt><dd><i aria-hidden="true" />{profile.status}</dd></div>
        </dl>
        <div className="contact-mail-links">
          <a className="is-primary" href={`mailto:${profile.email}`}>
            <Mail aria-hidden="true" /><span><small>Email</small><strong>{profile.email}</strong></span><ArrowUpRight aria-hidden="true" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" /><span><small>GitHub</small><strong>@bleakbelladonnals</strong></span><ExternalLink aria-hidden="true" />
          </a>
        </div>
        <footer>为保护隐私，本站不公开手机号、微信二维码或完整简历文件。</footer>
      </article>
    </div>
  );
}

export function AppContent({
  id,
  openApp,
  initialProjectSlug,
}: {
  id: AppId;
  openApp?: OpenAppHandler;
  initialProjectSlug?: string;
}) {
  if (id === 'brief') return <BriefContent openApp={openApp} />;
  if (id === 'projects') return <ProjectsContent initialProjectSlug={initialProjectSlug} />;
  if (id === 'notes') return <NotesContent />;
  if (id === 'toolkit') return <ToolkitContent />;
  if (id === 'experience') return <ExperienceContent />;
  if (id === 'about') return <AboutContent openApp={openApp} />;
  if (id === 'desk') return <DeskContent openApp={openApp} />;
  return <ContactContent />;
}
