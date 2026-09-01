export type AppId = 'brief' | 'projects' | 'toolkit' | 'experience' | 'about' | 'contact';

export type WindowRecord = {
  id: AppId;
  open: boolean;
  minimized: boolean;
  z: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowState = {
  windows: Record<AppId, WindowRecord>;
  topZ: number;
};

export type WindowAction =
  | { type: 'OPEN'; id: AppId }
  | { type: 'CLOSE'; id: AppId }
  | { type: 'MINIMIZE'; id: AppId }
  | { type: 'FOCUS'; id: AppId }
  | { type: 'MOVE'; id: AppId; x: number; y: number };

const definitions: Record<AppId, Omit<WindowRecord, 'id' | 'open' | 'minimized' | 'z'>> = {
  brief: { x: 142, y: 70, width: 760, height: 584 },
  projects: { x: 126, y: 92, width: 680, height: 558 },
  toolkit: { x: 196, y: 84, width: 600, height: 548 },
  experience: { x: 252, y: 100, width: 560, height: 520 },
  about: { x: 306, y: 88, width: 520, height: 492 },
  contact: { x: 362, y: 112, width: 420, height: 340 },
};

export function createInitialWindowState(): WindowState {
  const ids = Object.keys(definitions) as AppId[];
  return {
    topZ: 10,
    windows: Object.fromEntries(
      ids.map((id) => [
        id,
        {
          id,
          ...definitions[id],
          open: id === 'brief',
          minimized: false,
          z: id === 'brief' ? 10 : 1,
        },
      ]),
    ) as Record<AppId, WindowRecord>,
  };
}

export function windowReducer(state: WindowState, action: WindowAction): WindowState {
  const current = state.windows[action.id];
  if (!current) return state;

  if (action.type === 'MOVE') {
    return {
      ...state,
      windows: {
        ...state.windows,
        [action.id]: { ...current, x: action.x, y: action.y },
      },
    };
  }

  if (action.type === 'CLOSE') {
    return {
      ...state,
      windows: {
        ...state.windows,
        [action.id]: { ...current, open: false, minimized: false },
      },
    };
  }

  if (action.type === 'MINIMIZE') {
    return {
      ...state,
      windows: {
        ...state.windows,
        [action.id]: { ...current, minimized: true },
      },
    };
  }

  const topZ = state.topZ + 1;
  return {
    topZ,
    windows: {
      ...state.windows,
      [action.id]: {
        ...current,
        open: true,
        minimized: false,
        z: topZ,
      },
    },
  };
}
