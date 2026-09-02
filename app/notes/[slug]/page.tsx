import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, BookOpen, ExternalLink, FileText } from 'lucide-react';
import { NoteMarkdown, NoteVisuals, noteHeadingId } from '@/components/donnaos/note-content';
import { SiteNav } from '@/components/donnaos/site-nav';
import { getNote, getRelatedCases, noteKindLabels, notes, noteStatusLabels } from '@/lib/notes';
import { getSiteUrl } from '@/lib/site';

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  const title = `${note.shortTitle} — DonnaOS Notes`;
  return {
    title,
    description: note.summary,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      type: 'article',
      title,
      description: note.summary,
      publishedTime: note.publishedAt,
      modifiedTime: note.updatedAt,
      images: [],
    },
    twitter: { card: 'summary', title, description: note.summary, images: [] },
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const noteIndex = notes.findIndex((item) => item.slug === note.slug);
  const nextNote = notes[(noteIndex + 1) % notes.length];
  const relatedCases = getRelatedCases(note);
  const articleUrl = new URL(`/notes/${note.slug}`, getSiteUrl()).toString();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.title,
    description: note.summary,
    datePublished: note.publishedAt,
    dateModified: note.updatedAt,
    inLanguage: 'zh-CN',
    articleSection: noteKindLabels[note.kind],
    keywords: note.tags.join(', '),
    mainEntityOfPage: articleUrl,
    author: { '@type': 'Person', name: 'Donna Gan / 甘淑琪', url: new URL('/about', getSiteUrl()).toString() },
    isBasedOn: note.sources.map((source) => source.href),
  };

  return (
    <main className="mac-route-page note-page">
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <section className="mac-route-window note-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>{note.shortTitle}</strong>
          <small>WORKING NOTE {String(noteIndex + 1).padStart(2, '0')}</small>
        </header>
        <div className="mac-route-toolbar note-route-toolbar">
          <Link href="/notes"><ArrowLeft aria-hidden="true" />全部笔记</Link>
          <div><BookOpen aria-hidden="true" /><span>Notes</span><b>/</b><strong>{noteKindLabels[note.kind]}</strong></div>
          <span>{note.readingMinutes} min read</span>
        </div>

        <article className="note-route-document">
          <header className="note-document-hero">
            <p>{noteKindLabels[note.kind]} · 更新于 {note.updatedAt}</p>
            <h1>{note.title}</h1>
            <span>{note.summary}</span>
            <div className="note-working-badge"><i aria-hidden="true" />{noteStatusLabels[note.status]}</div>
          </header>

          <blockquote className="note-thesis"><span>核心判断</span>{note.thesis}</blockquote>

          <nav className="note-toc" aria-label="文章目录">
            <header><FileText aria-hidden="true" /><strong>本文提纲</strong><span>{note.outline.length} sections</span></header>
            <ol>
              {note.outline.map((heading, index) => (
                <li key={heading}><a href={`#${noteHeadingId(heading)}`}><span>{String(index + 1).padStart(2, '0')}</span>{heading}</a></li>
              ))}
            </ol>
          </nav>

          <NoteVisuals visuals={note.visuals} />
          <NoteMarkdown body={note.body} />

          <section className="note-sources" aria-labelledby="note-sources-title">
            <header><p>SOURCES</p><h2 id="note-sources-title">事实来源</h2></header>
            <div>
              {note.sources.map((source) => (
                <a href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                  <span><small>{source.publisher}</small><strong>{source.label}</strong></span>
                  <ExternalLink aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>

          <section className="note-related-cases" aria-labelledby="note-related-title">
            <header><p>RELATED WORK</p><h2 id="note-related-title">关联案例</h2></header>
            <div>
              {relatedCases.map((project) => (
                <Link href={`/projects/${project.slug}`} key={project.slug}>
                  <span><small>{project.category}</small><strong>{project.name}</strong><i>{project.nameCn}</i></span>
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>

          <footer className="case-document-next note-document-next">
            <span>NEXT NOTE</span>
            <Link href={`/notes/${nextNote.slug}`}>
              <small>{noteKindLabels[nextNote.kind]}</small><strong>{nextNote.shortTitle}</strong><ArrowUpRight aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </section>
    </main>
  );
}
