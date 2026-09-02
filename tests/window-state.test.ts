import { describe, expect, it } from 'vitest';
import { createInitialWindowState, windowReducer } from '../lib/window-state';

describe('DonnaOS window reducer', () => {
  it('starts from a clean desktop so the guide can introduce Recruiter Brief', () => {
    const state = createInitialWindowState();

    expect(Object.values(state.windows).every((record) => !record.open)).toBe(true);
  });

  it('opens, focuses and restores an app at the highest layer', () => {
    const initial = createInitialWindowState();
    const brief = windowReducer(initial, { type: 'OPEN', id: 'brief' });
    const opened = windowReducer(brief, { type: 'OPEN', id: 'projects' });
    const minimized = windowReducer(opened, { type: 'MINIMIZE', id: 'projects' });
    const restored = windowReducer(minimized, { type: 'FOCUS', id: 'projects' });

    expect(opened.windows.projects.open).toBe(true);
    expect(opened.windows.brief.open).toBe(false);
    expect(minimized.windows.projects.minimized).toBe(true);
    expect(restored.windows.projects.minimized).toBe(false);
    expect(restored.windows.projects.z).toBe(restored.topZ);
  });

  it('moves and closes only the targeted window', () => {
    const initial = createInitialWindowState();
    const moved = windowReducer(initial, { type: 'MOVE', id: 'brief', x: 220, y: 120 });
    const closed = windowReducer(moved, { type: 'CLOSE', id: 'brief' });

    expect(moved.windows.brief).toMatchObject({ x: 220, y: 120 });
    expect(closed.windows.brief.open).toBe(false);
    expect(closed.windows.about.open).toBe(false);
  });
});
