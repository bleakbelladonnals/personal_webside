import type { Metadata } from 'next';
import { ArrowUpRight, BookOpen, FileText, FolderOpen } from 'lucide-react';
import { InternalLink } from '@/components/donnaos/internal-link';
import { SiteNav } from '@/components/donnaos/site-nav';
import { noteKindLabels, notes, noteStatusLabels } from '@/lib/notes';

export const metadata: Metadata = {
  title: 'Product Notes — DonnaOS',
  description: 'Donna Gan 的产品拆解与学习笔记，记录 Agent 产品、评测、人机协作与 AI Coding 的持续判断。',
  alternates: { canonical: '/notes' },
  openGraph: {
    title: 'Product Notes — DonnaOS',
    description: '产品拆解与学习笔记：Agent 产品、评测、人机协作与 AI Coding。',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Product Notes — DonnaOS',
    description: '产品拆解与学习笔记：Agent 产品、评测、人机协作与 AI Coding。',
    images: [],
  },
};

export default function NotesPage() {
  return (
    <main className="mac-route-page notes-page">
      <SiteNav />
      <section className="mac-route-window notes-route-window">
        <header className="mac-route-titlebar">
          <span className="mac-route-lights" aria-hidden="true"><i /><i /><i /></span>
          <strong>Product Notes</strong>
          <small>{notes.length} WORKING NOTES</small>
        </header>
        <div className="mac-route-toolbar">
          <div><FolderOpen aria-hidden="true" /><span>Portfolio</span><b>/</b><strong>Notes</strong></div>
          <span>{notes.length} items</span>
        </div>
        <article className="notes-route-document">
          <header className="notes-route-heading">
            <div className="notes-route-icon"><BookOpen aria-hidden="true" /></div>
            <div>
              <p>PRODUCT THINKING / WORKING NOTES</p>
              <h1>产品拆解与学习笔记</h1>
              <span>记录观察、方法与待验证判断。Projects 说明做过什么，Notes 说明如何思考。</span>
            </div>
          </header>
          <div className="notes-route-list" aria-label="Product notes">
            {notes.map((note, index) => (
              <InternalLink href={`/notes/${note.slug}`} key={note.slug}>
                <span className="notes-route-file"><FileText aria-hidden="true" /></span>
                <span className="notes-route-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="notes-route-copy">
                  <small>{noteKindLabels[note.kind]} · 更新于 {note.updatedAt}</small>
                  <strong>{note.shortTitle}</strong>
                  <p>{note.summary}</p>
                  <span className="notes-route-meta">
                    <i>{noteStatusLabels[note.status]}</i>
                    <i>{note.readingMinutes} min</i>
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" />
              </InternalLink>
            ))}
          </div>
        </article>
        <footer className="mac-route-footer">
          <span>DonnaOS / Notes</span>
          <InternalLink href="/projects">查看项目案例 →</InternalLink>
        </footer>
      </section>
    </main>
  );
}
