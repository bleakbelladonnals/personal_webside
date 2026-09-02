import { describe, expect, it } from 'vitest';
import { cases } from '../lib/portfolio';

describe('portfolio work samples', () => {
  it('gives every mature case three inspectable, clearly disclosed samples', () => {
    for (const project of cases) {
      expect(project.workSamples).toHaveLength(3);
      expect(new Set(project.workSamples.map((sample) => sample.id)).size).toBe(3);

      for (const sample of project.workSamples) {
        expect(sample.title.trim()).not.toBe('');
        expect(sample.disclosure.trim()).not.toBe('');
        expect(sample.items).toHaveLength(3);
      }
    }
  });
});
