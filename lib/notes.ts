import { parse } from 'yaml';
import { cases } from './portfolio';

export type NoteKind = 'teardown' | 'learning';
export type NoteStatus = 'working' | 'published' | 'draft';

export type NoteSource = {
  label: string;
  href: string;
  publisher: string;
};

export type NoteVisual = {
  title: string;
  caption: string;
  items: string[];
};

export type NoteMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  thesis: string;
  kind: NoteKind;
  status: NoteStatus;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  featured: boolean;
  relatedCaseSlugs: string[];
  visuals: NoteVisual[];
  sources: NoteSource[];
};

export type Note = NoteMeta & {
  body: string;
  outline: string[];
  preview: string;
  readingMinutes: number;
};

export const noteKindLabels: Record<NoteKind, string> = {
  teardown: '产品拆解',
  learning: '学习笔记',
};

export const noteStatusLabels: Record<NoteStatus, string> = {
  working: '结构化提纲 · 持续更新',
  published: '正式发布',
  draft: '草稿',
};

const rawNoteModules = import.meta.glob<string>('/content/notes/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const validCaseSlugs = new Set(cases.map((item) => item.slug));

function requiredString(value: unknown, field: string, file: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`[notes] ${file}: ${field} must be a non-empty string`);
  }
  return value.trim();
}

function stringArray(value: unknown, field: string, file: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string' || item.trim().length === 0)) {
    throw new Error(`[notes] ${file}: ${field} must be an array of non-empty strings`);
  }
  return value.map((item) => item.trim());
}

function parseFrontmatter(raw: string, file: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`[notes] ${file}: missing YAML frontmatter`);
  const data = parse(match[1]) as Record<string, unknown>;
  return { data, body: match[2].trim() };
}

function validateSources(value: unknown, file: string): NoteSource[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`[notes] ${file}: sources must contain at least one entry`);
  }
  return value.map((source, index) => {
    if (!source || typeof source !== 'object') throw new Error(`[notes] ${file}: invalid source ${index + 1}`);
    const item = source as Record<string, unknown>;
    const href = requiredString(item.href, `sources[${index}].href`, file);
    try {
      new URL(href);
    } catch {
      throw new Error(`[notes] ${file}: sources[${index}].href must be an absolute URL`);
    }
    return {
      label: requiredString(item.label, `sources[${index}].label`, file),
      href,
      publisher: requiredString(item.publisher, `sources[${index}].publisher`, file),
    };
  });
}

function validateVisuals(value: unknown, file: string): NoteVisual[] {
  if (!Array.isArray(value) || value.length < 2 || value.length > 4) {
    throw new Error(`[notes] ${file}: visuals must contain 2–4 entries`);
  }
  return value.map((visual, index) => {
    if (!visual || typeof visual !== 'object') throw new Error(`[notes] ${file}: invalid visual ${index + 1}`);
    const item = visual as Record<string, unknown>;
    const items = stringArray(item.items, `visuals[${index}].items`, file);
    if (items.length < 2) throw new Error(`[notes] ${file}: each visual needs at least two items`);
    return {
      title: requiredString(item.title, `visuals[${index}].title`, file),
      caption: requiredString(item.caption, `visuals[${index}].caption`, file),
      items,
    };
  });
}

function extractOutline(body: string) {
  return Array.from(body.matchAll(/^##\s+(.+)$/gm), (match) => match[1].replace(/[*_`]/g, '').trim());
}

function extractPreview(body: string) {
  const copy = body
    .split(/\n{2,}/)
    .map((block) => block.replace(/^#+\s+/gm, '').replace(/^[-*>]\s+/gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim())
    .filter((block) => block.length > 35)
    .slice(0, 2)
    .join(' ');
  return copy.length > 280 ? `${copy.slice(0, 277).trim()}…` : copy;
}

function estimateReadingMinutes(body: string) {
  const chineseCharacters = (body.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinWords = (body.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.ceil((chineseCharacters + latinWords * 2) / 320));
}

function parseNote(file: string, raw: string): Note {
  const { data, body } = parseFrontmatter(raw, file);
  const slug = requiredString(data.slug, 'slug', file);
  const filename = file.split('/').pop()?.replace(/\.md$/, '');
  if (filename !== slug) throw new Error(`[notes] ${file}: slug must match filename`);

  const kind = data.kind;
  if (kind !== 'teardown' && kind !== 'learning') throw new Error(`[notes] ${file}: invalid kind`);
  const status = data.status;
  if (status !== 'working' && status !== 'published' && status !== 'draft') throw new Error(`[notes] ${file}: invalid status`);

  const relatedCaseSlugs = stringArray(data.relatedCaseSlugs, 'relatedCaseSlugs', file);
  relatedCaseSlugs.forEach((relatedSlug) => {
    if (!validCaseSlugs.has(relatedSlug)) throw new Error(`[notes] ${file}: unknown related case ${relatedSlug}`);
  });

  if (!body) throw new Error(`[notes] ${file}: note body cannot be empty`);
  const outline = extractOutline(body);
  if (outline.length < 3) throw new Error(`[notes] ${file}: working notes need at least three sections`);

  return {
    slug,
    title: requiredString(data.title, 'title', file),
    shortTitle: requiredString(data.shortTitle, 'shortTitle', file),
    summary: requiredString(data.summary, 'summary', file),
    thesis: requiredString(data.thesis, 'thesis', file),
    kind,
    status,
    publishedAt: requiredString(data.publishedAt, 'publishedAt', file),
    updatedAt: requiredString(data.updatedAt, 'updatedAt', file),
    tags: stringArray(data.tags, 'tags', file),
    featured: data.featured === true,
    relatedCaseSlugs,
    visuals: validateVisuals(data.visuals, file),
    sources: validateSources(data.sources, file),
    body,
    outline,
    preview: extractPreview(body),
    readingMinutes: estimateReadingMinutes(body),
  };
}

const parsedNotes = Object.entries(rawNoteModules).map(([file, raw]) => parseNote(file, raw));
const duplicateSlugs = parsedNotes.filter((note, index) => parsedNotes.findIndex((item) => item.slug === note.slug) !== index);
if (duplicateSlugs.length > 0) throw new Error(`[notes] duplicate slug: ${duplicateSlugs[0].slug}`);

export const notes = parsedNotes
  .filter((note) => note.status !== 'draft')
  .sort((a, b) => {
    const dateOrder = b.updatedAt.localeCompare(a.updatedAt);
    if (dateOrder !== 0) return dateOrder;
    if (a.kind !== b.kind) return a.kind === 'teardown' ? -1 : 1;
    return a.title.localeCompare(b.title, 'zh-CN');
  });

export const featuredNotes = notes.filter((note) => note.featured);

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function getRelatedCases(note: Note) {
  return note.relatedCaseSlugs.map((slug) => cases.find((item) => item.slug === slug)).filter((item) => item !== undefined);
}
