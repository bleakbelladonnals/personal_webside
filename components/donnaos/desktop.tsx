'use client';

import { useEffect, useMemo, useReducer, useRef } from 'react';
import {
  BriefcaseBusiness,
  ContactRound,
  FileText,
  FolderOpen,
  Mail,
  Minus,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { AppContent, appMeta } from './app-content';
import {
  createInitialWindowState,
  windowReducer,
  type AppId,
  type WindowRecord,
} from '@/lib/window-state';

const apps: Array<{ id: AppId; label: string; icon: typeof FileText; color: string }> = [
  { id: 'brief', label: 'Brief', icon: FileText, color: 'blue' },
  { id: 'projects', label: 'Case Studies', icon: FolderOpen, color: 'folder' },
  { id: 'toolkit', label: 'AI PM Toolkit', icon: Wrench, color: 'tool' },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness, color: 'graphite' },
  { id: 'about', label: 'About / Contact', icon: ContactRound, color: 'aqua' },
];

const validIds = new Set<AppId>(apps.map((item) => item.id));

function syncQuery(id: AppId) {
  const url = new URL(window.location.href);
  url.searchParams.set('app', id);
  window.history.replaceState({}, '', `${url.pathname}?${url.searchParams.toString()}`);
}

function AquaWindow({
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
    const width = Math.min(record.width, window.innerWidth - 124);
    const height = Math.min(record.height, window.innerHeight - 190);
    const maxX = Math.max(104, window.innerWidth - width - 12);
    const maxY = Math.max(44, window.innerHeight - height - 86);
    const x = Math.max(104, Math.min(maxX, dragRef.current.x + event.clientX - dragRef.current.startX));
    const y = Math.max(42, Math.min(maxY, dragRef.current.y + event.clientY - dragRef.current.startY));
    onMove(x, y);
  };

  if (!record.open || record.minimized) return null;

  return (
    <section
      className="aqua-window window-frame"
      data-app-window={record.id}
      style={{
        left: record.x,
        top: record.y,
        width: record.width,
        height: record.height,
        zIndex: record.z,
      }}
      onPointerDown={onFocus}
      aria-labelledby={`window-title-${record.id}`}
    >
      <header
        className="window-titlebar draggable-titlebar"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('button')) return;
          dragRef.current = { startX: event.clientX, startY: event.clientY, x: record.x, y: record.y };
          event.currentTarget.setPointerCapture(event.pointerId);
          onFocus();
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => {
          dragRef.current = null;
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { dragRef.current = null; }}
      >
        <div className="traffic-controls">
          <button type="button" className="traffic-close" aria-label={`关闭 ${appMeta[record.id].title}`} onClick={onClose}><X /></button>
          <button type="button" className="traffic-min" aria-label={`最小化 ${appMeta[record.id].title}`} onClick={onMinimize}><Minus /></button>
          <span className="traffic-zoom" aria-hidden="true" />
        </div>
        <span id={`window-title-${record.id}`}>{appMeta[record.id].title}</span>
        <span className="window-title-meta">{appMeta[record.id].code}</span>
      </header>
      <div className={`window-content window-content--${record.id}`}>
        <AppContent id={record.id} openApp={openApp} />
      </div>
    </section>
  );
}

export function DonnaDesktop() {
  const [state, dispatch] = useReducer(windowReducer, undefined, createInitialWindowState);

  const openApp = (id: AppId) => {
    dispatch({ type: 'OPEN', id });
    syncQuery(id);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('app') as AppId | null;
    if (requested && validIds.has(requested)) dispatch({ type: 'OPEN', id: requested });
  }, []);

  const activeId = useMemo(() => {
    const active = Object.values(state.windows)
      .filter((item) => item.open && !item.minimized)
      .sort((a, b) => b.z - a.z)[0];
    return active?.id ?? 'brief';
  }, [state.windows]);

  const closeWindow = (id: AppId) => {
    dispatch({ type: 'CLOSE', id });
    const url = new URL(window.location.href);
    url.searchParams.delete('app');
    window.history.replaceState({}, '', `${url.pathname}${url.search ? url.search : ''}`);
  };

  return (
    <main className="desktop-shell">
      <div className="contour-map" aria-hidden="true" />

      <header className="menu-bar">
        <div className="menu-left">
          <button type="button" className="brand-button" onClick={() => openApp('brief')} aria-label="打开 Recruiter Brief">
            <span className="brand-drop" aria-hidden="true">DG</span>
          </button>
          <strong>DonnaOS</strong>
          <button type="button" className="menu-item" onClick={() => openApp('brief')}>Portfolio</button>
          <button type="button" className="menu-item" onClick={() => openApp('projects')}>Projects</button>
          <button type="button" className="menu-item" onClick={() => openApp('about')}>Contact</button>
        </div>
        <div className="menu-right">
          <span className="status-dot" aria-hidden="true" />
          <span>OPEN TO WORK</span>
          <time dateTime="2026-09-01">SEP 1, 2026</time>
        </div>
      </header>

      <section className="desktop-mode" aria-label="DonnaOS desktop">
        <div className="desktop-icons" aria-label="Desktop shortcuts">
          <button type="button" onClick={() => openApp('projects')}><FolderOpen /><span>Selected Work</span></button>
          <button type="button" onClick={() => openApp('toolkit')}><Sparkles /><span>AI PM Toolkit</span></button>
          <a href="mailto:bleakbelladonnals@gmail.com"><Mail /><span>Email Donna</span></a>
        </div>

        {apps.map(({ id }) => (
          <AquaWindow
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

      <section className="mobile-mode" aria-label="DonnaOS mobile portfolio">
        <header className="mobile-app-title">
          <span>{appMeta[activeId].title}</span>
          <small>{appMeta[activeId].code}</small>
        </header>
        <div className="mobile-app-scroll">
          <AppContent id={activeId} openApp={openApp} />
        </div>
      </section>

      <nav className="dock" aria-label="DonnaOS applications">
        {apps.map(({ id, label, icon: Icon, color }) => {
          const current = activeId === id && state.windows[id].open && !state.windows[id].minimized;
          return (
            <button
              type="button"
              key={id}
              data-dock-app={id}
              className={`dock-item dock-item--${color} ${current ? 'is-active' : ''}`}
              onClick={() => openApp(id)}
              aria-label={`打开 ${label}`}
              aria-current={current ? 'page' : undefined}
            >
              <span><Icon aria-hidden="true" /></span>
              <small>{label}</small>
            </button>
          );
        })}
      </nav>
    </main>
  );
}
