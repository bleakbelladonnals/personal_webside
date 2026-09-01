import { describe, expect, it } from 'vitest';
import { createInitialWindowState, windowReducer } from '../lib/window-state';

describe('DonnaOS window reducer', () => {
  it('opens Recruiter Brief by default', () => {
    const state = createInitialWindowState();

    expect(state.windows.brief.open).toBe(true);
    expect(state.windows.projects.open).toBe(false);
  });

  it('opens, focuses and restores an app at the highest layer', () => {
    const initial = createInitialWindowState();
    const opened = windowReducer(initial, { type: 'OPEN', id: 'projects' });
    const minimized = windowReducer(opened, { type: 'MINIMIZE', id: 'projects' });
    const restored = windowReducer(minimized, { type: 'FOCUS', id: 'projects' });

    expect(opened.windows.projects.open).toBe(true);
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
