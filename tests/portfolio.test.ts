import { describe, expect, it } from 'vitest';
import { cases } from '../lib/portfolio';

describe('portfolio design details', () => {
  it('keeps available design details complete and uniquely identified', () => {
    for (const project of cases) {
      expect(new Set(project.workSamples.map((sample) => sample.id)).size).toBe(project.workSamples.length);

      for (const sample of project.workSamples) {
        expect(sample.title.trim()).not.toBe('');
        expect(sample.disclosure.trim()).not.toBe('');
        expect(sample.items).toHaveLength(3);
      }
    }
  });
});
