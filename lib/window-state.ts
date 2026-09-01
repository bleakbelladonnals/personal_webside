export type AppId = 'brief' | 'projects' | 'toolkit' | 'experience' | 'about';

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
  brief: { x: 154, y: 68, width: 1040, height: 690 },
  projects: { x: 116, y: 88, width: 930, height: 650 },
  toolkit: { x: 210, y: 96, width: 830, height: 610 },
  experience: { x: 276, y: 82, width: 740, height: 610 },
  about: { x: 340, y: 104, width: 720, height: 570 },
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
