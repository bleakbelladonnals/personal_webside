import { describe, expect, it } from 'vitest';
import { getNote, getRelatedCases, notes } from '../lib/notes';

describe('DonnaOS notes content', () => {
  it('publishes three validated working notes and hides drafts', () => {
    expect(notes).toHaveLength(3);
    expect(notes.every((note) => note.status === 'working')).toBe(true);
    expect(notes.every((note) => note.outline.length >= 3)).toBe(true);
    expect(notes.every((note) => note.visuals.length >= 2 && note.visuals.length <= 4)).toBe(true);
    expect(notes.every((note) => note.sources.length > 0)).toBe(true);
  });

  it('keeps the Codex teardown grounded in official sources and related work', () => {
    const note = getNote('openai-codex-workspace');

    expect(note).toBeDefined();
    expect(note?.sources.every((source) => new URL(source.href).protocol === 'https:')).toBe(true);
    expect(note?.sources.some((source) => source.publisher === 'OpenAI Docs')).toBe(true);
    expect(note ? getRelatedCases(note).map((project) => project.slug) : []).toEqual(['agentdock', 'zaowutai']);
  });
});
