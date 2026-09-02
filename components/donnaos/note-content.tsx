import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { ReactNode } from 'react';
import type { NoteVisual } from '@/lib/notes';

function textFromChildren(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return textFromChildren((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

export function noteHeadingId(label: string) {
  const normalized = label
    .toLowerCase()
    .replace(/[^a-z0-9\u3400-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '');
  return normalized || 'section';
}

export function NoteVisuals({ visuals }: { visuals: NoteVisual[] }) {
  return (
    <section className="note-visual-grid" aria-label="文章关键图">
      {visuals.map((visual, visualIndex) => (
        <figure key={visual.title}>
          <header><span>FIG. {String(visualIndex + 1).padStart(2, '0')}</span><strong>{visual.title}</strong></header>
          <ol>
            {visual.items.map((item, itemIndex) => (
              <li key={item}>
                <i aria-hidden="true">{String(itemIndex + 1).padStart(2, '0')}</i>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <figcaption>{visual.caption}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export function NoteMarkdown({ body }: { body: string }) {
  return (
    <div className="note-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => <h2 id={noteHeadingId(textFromChildren(children))}>{children}</h2>,
          a: ({ href, children }) => {
            if (href?.startsWith('/')) return <Link href={href}>{children}</Link>;
            return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
          },
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
