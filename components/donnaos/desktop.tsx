'use client';

import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { AppContent, appMeta } from './app-content';
import {
  createInitialWindowState,
  windowReducer,
  type AppId,
  type WindowRecord,
} from '@/lib/window-state';

const apps: Array<{ id: AppId; label: string; glyph: string }> = [
  { id: 'brief', label: 'recruiter brief', glyph: '📄' },
  { id: 'projects', label: 'case studies', glyph: '📁' },
  { id: 'toolkit', label: 'AI PM toolkit', glyph: '🛠️' },
  { id: 'experience', label: 'experience', glyph: '💼' },
  { id: 'about', label: 'about Donna', glyph: '👩🏻‍💻' },
  { id: 'contact', label: 'contact', glyph: '✉️' },
];

const validIds = new Set<AppId>(apps.map((item) => item.id));
const bootLines = [
  'DonnaOS v2.0',
  'loading portfolio kernel........ ok',
  'mounting /case-studies.......... ok',
  'starting window manager......... ok',
  'checking recruiter brief........ ready',
  'welcome, hiring team.',
];

function syncQuery(id?: AppId) {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set('app', id);
  else url.searchParams.delete('app');
  window.history.replaceState({}, '', `${url.pathname}${url.search}`);
}

function DesktopWindow({
  record,
  openApp,
  onClose,
  onFocus,
  onMinimize,
  onMove,
}: {
  record: WindowRecord;
  openApp: (id: AppId) => void;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const dragRef = useRef<null | { startX: number; startY: number; x: number; y: number }>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current) return;
    const win = event.currentTarget.parentElement;
    const width = win?.offsetWidth ?? record.width;
    const height = win?.offsetHeight ?? record.height;
    const maxX = Math.max(8, window.innerWidth - width - 8);
    const maxY = Math.max(42, window.innerHeight - height - 48);
    const x = Math.max(8, Math.min(maxX, dragRef.current.x + event.clientX - dragRef.current.startX));
    const y = Math.max(42, Math.min(maxY, dragRef.current.y + event.clientY - dragRef.current.startY));
    onMove(x, y);
  };

  if (!record.open || record.minimized) return null;

  return (
    <section
      className="os-window"
      data-app-window={record.id}
      style={{ left: record.x, top: record.y, width: record.width, height: record.height, zIndex: record.z }}
      onPointerDown={onFocus}
      aria-labelledby={`window-title-${record.id}`}
    >
      <header
        className="os-titlebar"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('button')) return;
          dragRef.current = { startX: event.clientX, startY: event.clientY, x: record.x, y: record.y };
          event.currentTarget.setPointerCapture(event.pointerId);
          onFocus();
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          dragRef.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { dragRef.current = null; }}
      >
        <span className="os-title-dots" aria-hidden="true"><i /><i /><i /></span>
        <span id={`window-title-${record.id}`} className="os-title-text">{appMeta[record.id].title}</span>
        <span className="os-title-meta">{appMeta[record.id].code}</span>
        <span className="os-window-actions">
          <button type="button" aria-label={`最小化 ${appMeta[record.id].title}`} onClick={onMinimize}>─</button>
          <button type="button" aria-label={`关闭 ${appMeta[record.id].title}`} onClick={onClose}>×</button>
        </span>
      </header>
      <div className={`os-window-body os-window-body--${record.id}`}>
        <AppContent id={record.id} openApp={openApp} />
      </div>
    </section>
  );
}

export function DonnaDesktop() {
  const [phase, setPhase] = useState<'welcome' | 'boot' | 'desktop'>('welcome');
  const [bootIndex, setBootIndex] = useState(0);
  const [clock, setClock] = useState('--:--:--');
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);
  const [state, dispatch] = useReducer(windowReducer, undefined, createInitialWindowState);

  const openApp = (id: AppId) => {
    dispatch({ type: 'OPEN', id });
    syncQuery(id);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('app') as AppId | null;
    let requestedTimer: number | undefined;
    if (requested && validIds.has(requested)) {
      requestedTimer = window.setTimeout(() => {
        dispatch({ type: 'OPEN', id: requested });
        setPhase('desktop');
      }, 0);
    }

    const media = window.matchMedia('(pointer: coarse)');
    const updatePointer = () => setIsCoarse(media.matches);
    const pointerTimer = window.setTimeout(updatePointer, 0);
    media.addEventListener('change', updatePointer);
    return () => {
      if (requestedTimer) window.clearTimeout(requestedTimer);
      window.clearTimeout(pointerTimer);
      media.removeEventListener('change', updatePointer);
    };
  }, []);

  useEffect(() => {
    const updateClock = () => setClock(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    const initialTick = window.setTimeout(updateClock, 0);
    const timer = window.setInterval(updateClock, 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'boot') return;
    if (bootIndex < bootLines.length) {
      const timer = window.setTimeout(() => setBootIndex((value) => value + 1), 230);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => setPhase('desktop'), 420);
    return () => window.clearTimeout(timer);
  }, [phase, bootIndex]);

  const activeId = useMemo(() => {
    const active = Object.values(state.windows)
      .filter((item) => item.open && !item.minimized)
      .sort((a, b) => b.z - a.z)[0];
    return active?.id ?? null;
  }, [state.windows]);

  const openWindows = useMemo(() => apps.filter(({ id }) => state.windows[id].open), [state.windows]);

  const closeWindow = (id: AppId) => {
    dispatch({ type: 'CLOSE', id });
    if (activeId === id) syncQuery();
  };

  if (phase === 'welcome') {
    return (
      <main className="welcome-screen">
        <div className="welcome-stack">
          <h1 className="os-logo">DONNA<span>OS</span></h1>
          <section className="welcome-terminal" aria-label="DonnaOS system profile">
            <header><span className="os-title-dots" aria-hidden="true"><i /><i /><i /></span><b>~/welcome</b></header>
            <div>
              <span className="welcome-avatar" aria-hidden="true">DG</span>
              <dl>
                <div><dt>user</dt><dd>Donna Gan</dd></div>
                <div><dt>role</dt><dd>AI Product Manager</dd></div>
                <div><dt>base</dt><dd>Beijing</dd></div>
                <div><dt>focus</dt><dd>Agent · Workflow · Eval</dd></div>
              </dl>
            </div>
          </section>
          <button id="enter-donnaos" className="enter-os" type="button" onClick={() => { setBootIndex(0); setPhase('boot'); }}>
            ▸ enter portfolio
          </button>
        </div>
      </main>
    );
  }

  if (phase === 'boot') {
    return (
      <main className="boot-screen" aria-live="polite">
        <pre>{bootLines.slice(0, bootIndex).join('\n')}</pre>
        <div className="boot-progress" aria-hidden="true"><i style={{ width: `${Math.round((bootIndex / bootLines.length) * 100)}%` }} /></div>
      </main>
    );
  }

  return (
    <main className="desktop-shell">
      <header className="os-topbar">
        <div>
          <button type="button" onClick={() => openApp('brief')} aria-label="打开 Recruiter Brief">DG</button>
          <strong>DonnaOS</strong>
          <button type="button" onClick={() => openApp('projects')}>projects</button>
          <button type="button" onClick={() => openApp('contact')}>contact</button>
        </div>
        <div><span>● OPEN TO WORK</span><time>{clock}</time></div>
      </header>

      <section className="os-desktop" aria-label="DonnaOS desktop" onPointerDown={(event) => { if (event.target === event.currentTarget) setSelectedIcon(null); }}>
        <ul className="os-icons" aria-label="Desktop applications">
          {apps.map(({ id, label, glyph }) => (
            <li key={id}>
              <button
                type="button"
                className={selectedIcon === id ? 'is-selected' : undefined}
                data-desktop-app={id}
                onClick={() => { setSelectedIcon(id); if (isCoarse) openApp(id); }}
                onDoubleClick={() => openApp(id)}
                onKeyDown={(event) => { if (event.key === 'Enter') openApp(id); }}
                aria-label={`打开 ${label}`}
              >
                <span aria-hidden="true">{glyph}</span>
                <small>{label}</small>
              </button>
            </li>
          ))}
        </ul>

        {apps.map(({ id }) => (
          <DesktopWindow
            key={id}
            record={state.windows[id]}
            openApp={openApp}
            onClose={() => closeWindow(id)}
            onFocus={() => { dispatch({ type: 'FOCUS', id }); syncQuery(id); }}
            onMinimize={() => dispatch({ type: 'MINIMIZE', id })}
            onMove={(x, y) => dispatch({ type: 'MOVE', id, x, y })}
          />
        ))}
      </section>

      <footer className="os-taskbar" aria-label="Open windows">
        {openWindows.map(({ id, label }) => {
          const record = state.windows[id];
          const active = id === activeId && !record.minimized;
          return (
            <button
              key={id}
              type="button"
              className={active ? 'is-active' : undefined}
              onClick={() => {
                if (record.minimized) dispatch({ type: 'OPEN', id });
                else if (active) dispatch({ type: 'MINIMIZE', id });
                else dispatch({ type: 'FOCUS', id });
                syncQuery(id);
              }}
            >
              {label}
            </button>
          );
        })}
      </footer>
    </main>
  );
}
