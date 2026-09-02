export type AppId = 'brief' | 'projects' | 'notes' | 'toolkit' | 'experience' | 'about' | 'desk' | 'contact';

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
  brief: { x: 154, y: 40, width: 820, height: 540 },
  projects: { x: 116, y: 24, width: 900, height: 600 },
  notes: { x: 118, y: 24, width: 920, height: 600 },
  toolkit: { x: 146, y: 36, width: 760, height: 570 },
  experience: { x: 190, y: 44, width: 680, height: 540 },
  about: { x: 208, y: 48, width: 720, height: 520 },
  desk: { x: 154, y: 34, width: 800, height: 560 },
  contact: { x: 262, y: 72, width: 620, height: 440 },
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
          open: false,
          minimized: false,
          z: 1,
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

  if (action.type === 'OPEN') {
    return {
      topZ,
      windows: Object.fromEntries(
        (Object.keys(state.windows) as AppId[]).map((id) => {
          const record = state.windows[id];
          return [
            id,
            id === action.id
              ? { ...record, open: true, minimized: false, z: topZ }
              : { ...record, open: false, minimized: false },
          ];
        }),
      ) as Record<AppId, WindowRecord>,
    };
  }

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
