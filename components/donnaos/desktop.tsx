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
  { id: 'notes', label: 'product notes', glyph: '🗒️' },
  { id: 'toolkit', label: 'AI PM toolkit', glyph: '🛠️' },
  { id: 'experience', label: 'experience', glyph: '💼' },
  { id: 'about', label: 'about Donna', glyph: '👩🏻‍💻' },
  { id: 'desk', label: "Donna's desk", glyph: '🗂️' },
  { id: 'contact', label: 'contact', glyph: '✉️' },
];

const nowItems: Array<{ label: string; title: string; detail: string; app: AppId; projectSlug?: string }> = [
  { label: 'CURRENT', title: '案例工作样本柜', detail: '六个案例 · 脱敏重绘与公开记录', app: 'projects', projectSlug: 'lumiagent' },
  { label: 'RECENT', title: '3 篇 Product Notes', detail: '产品拆解 · Agent 评测 · 人工介入', app: 'notes' },
  { label: 'NEXT', title: "Donna's Desk", detail: '当前关注、阅读与最近构建', app: 'desk' },
];

const validIds = new Set<AppId>(apps.map((item) => item.id));
const onboardingStorageKey = 'donnaos:onboarding:v1';
const bootLineDelayMs = 420;
const bootCompleteDelayMs = 700;
const bootLines = [
  'DonnaOS v2.0',
  'loading portfolio kernel........ ok',
  'mounting /case-studies.......... ok',
  'starting window manager......... ok',
  'checking recruiter brief........ ready',
  'welcome, hiring team.',
];

type OpenAppOptions = { projectSlug?: string };

function syncQuery(id?: AppId) {
  const url = new URL(window.location.href);
  if (id) url.searchParams.set('app', id);
  else url.searchParams.delete('app');
  window.history.replaceState({}, '', `${url.pathname}${url.search}`);
}

function rememberOnboarding() {
  try {
    window.localStorage.setItem(onboardingStorageKey, 'complete');
  } catch {
    // Strict privacy modes may disable storage; the current visit still remains fully usable.
  }
}

function DesktopWindow({
  record,
  closing,
  minimizing,
  openApp,
  initialProjectSlug,
  onClose,
  onFocus,
  onMinimize,
  onMove,
}: {
  record: WindowRecord;
  closing: boolean;
  minimizing: boolean;
  openApp: (id: AppId, options?: OpenAppOptions) => void;
  initialProjectSlug?: string;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const dragRef = useRef<null | { startX: number; startY: number; x: number; y: number }>(null);
  const [maximized, setMaximized] = useState(false);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current || maximized) return;
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
      className={[
        'os-window',
        `os-window--${appMeta[record.id].appearance}`,
        `os-window--layout-${appMeta[record.id].layout}`,
        closing && 'is-closing',
        minimizing && 'is-minimizing',
        maximized && 'is-maximized',
      ].filter(Boolean).join(' ')}
      data-app-window={record.id}
      style={{ left: record.x, top: record.y, width: record.width, height: record.height, zIndex: record.z }}
      onPointerDown={onFocus}
      aria-labelledby={`window-title-${record.id}`}
    >
      <header
        className="os-titlebar"
        onPointerDown={(event) => {
          if ((event.target as HTMLElement).closest('button') || maximized) return;
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
        onDoubleClick={(event) => {
          if ((event.target as HTMLElement).closest('button')) return;
          setMaximized((value) => !value);
        }}
      >
        <span className="mac-traffic-lights">
          <button type="button" className="mac-close" aria-label={`关闭 ${appMeta[record.id].title}`} onClick={onClose}><i aria-hidden="true">×</i></button>
          <button type="button" className="mac-minimize" aria-label={`最小化 ${appMeta[record.id].title}`} onClick={onMinimize}><i aria-hidden="true">−</i></button>
          <button type="button" className="mac-zoom" aria-label={`${maximized ? '还原' : '缩放'} ${appMeta[record.id].title}`} onClick={() => setMaximized((value) => !value)}><i aria-hidden="true">+</i></button>
        </span>
        <span id={`window-title-${record.id}`} className="os-title-text">{appMeta[record.id].title}</span>
        <span className="os-title-meta">{appMeta[record.id].code}</span>
      </header>
      <div className={`os-window-body os-window-body--${record.id}`}>
        <AppContent id={record.id} openApp={openApp} initialProjectSlug={initialProjectSlug} />
      </div>
    </section>
  );
}

export function DonnaDesktop() {
  const [phase, setPhase] = useState<'checking' | 'welcome' | 'boot' | 'login' | 'desktop'>('checking');
  const [bootIndex, setBootIndex] = useState(0);
  const [clock, setClock] = useState('--:--:--');
  const [selectedIcon, setSelectedIcon] = useState<AppId | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);
  const [guideDismissed, setGuideDismissed] = useState(false);
  const [requestedProjectSlug, setRequestedProjectSlug] = useState<string | undefined>();
  const [closingId, setClosingId] = useState<AppId | null>(null);
  const [minimizingId, setMinimizingId] = useState<AppId | null>(null);
  const [state, dispatch] = useReducer(windowReducer, undefined, createInitialWindowState);
  const transitionTimerRef = useRef<number | null>(null);

  const unlockDesktop = () => {
    rememberOnboarding();
    setPhase('desktop');
  };

  const dismissGuide = () => {
    setGuideDismissed(true);
    rememberOnboarding();
  };

  const activeId = useMemo(() => {
    const active = Object.values(state.windows)
      .filter((item) => item.open && !item.minimized)
      .sort((a, b) => b.z - a.z)[0];
    return active?.id ?? null;
  }, [state.windows]);

  const openApp = (id: AppId, options?: OpenAppOptions) => {
    if (id === 'projects') setRequestedProjectSlug(options?.projectSlug);
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);

    if (activeId && activeId !== id) {
      setMinimizingId(null);
      setClosingId(activeId);
      transitionTimerRef.current = window.setTimeout(() => {
        dispatch({ type: 'CLOSE', id: activeId });
        dispatch({ type: 'OPEN', id });
        setClosingId(null);
        transitionTimerRef.current = null;
        syncQuery(id);
      }, 210);
      return;
    }

    setClosingId(null);
    setMinimizingId(null);
    dispatch({ type: activeId === id ? 'FOCUS' : 'OPEN', id });
    syncQuery(id);
  };

  const closeWindow = (id: AppId) => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    setMinimizingId(null);
    setClosingId(id);
    transitionTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'CLOSE', id });
      setClosingId(null);
      transitionTimerRef.current = null;
      syncQuery();
    }, 210);
  };

  const minimizeWindow = (id: AppId) => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    setClosingId(null);
    setMinimizingId(id);
    transitionTimerRef.current = window.setTimeout(() => {
      dispatch({ type: 'MINIMIZE', id });
      setMinimizingId(null);
      transitionTimerRef.current = null;
    }, 240);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('app') as AppId | null;
    let hasCompletedOnboarding = false;
    try {
      hasCompletedOnboarding = window.localStorage.getItem(onboardingStorageKey) === 'complete';
    } catch {
      hasCompletedOnboarding = false;
    }
    let phaseTimer: number | undefined;
    if (requested && validIds.has(requested)) {
      phaseTimer = window.setTimeout(() => {
        dispatch({ type: 'OPEN', id: requested });
        setGuideDismissed(true);
        setPhase('desktop');
        rememberOnboarding();
      }, 0);
    } else {
      phaseTimer = window.setTimeout(() => {
        setGuideDismissed(hasCompletedOnboarding);
        setPhase(hasCompletedOnboarding ? 'login' : 'welcome');
      }, 0);
    }

    const media = window.matchMedia('(pointer: coarse)');
    const updatePointer = () => setIsCoarse(media.matches);
    const pointerTimer = window.setTimeout(updatePointer, 0);
    media.addEventListener('change', updatePointer);
    return () => {
      if (phaseTimer) window.clearTimeout(phaseTimer);
      window.clearTimeout(pointerTimer);
      media.removeEventListener('change', updatePointer);
    };
  }, []);

  useEffect(() => () => {
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
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
      const timer = window.setTimeout(() => setBootIndex((value) => value + 1), bootLineDelayMs);
      return () => window.clearTimeout(timer);
    }
    const timer = window.setTimeout(() => {
      setPhase('login');
    }, bootCompleteDelayMs);
    return () => window.clearTimeout(timer);
  }, [phase, bootIndex]);

  const openWindows = useMemo(() => apps.filter(({ id }) => state.windows[id].open), [state.windows]);
  const showGuide = !guideDismissed && activeId === null;

  if (phase === 'checking') return <main className="welcome-screen" aria-busy="true" />;

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
                <div><dt>focus</dt><dd>AI 0→1 · Agent / Eval</dd></div>
                <div><dt>practice</dt><dd>AI Coding · Open Source · SEO</dd></div>
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

  if (phase === 'login') {
    return (
      <main className="login-screen">
        <time className="login-clock" aria-label={`当前时间 ${clock}`}>{clock}</time>
        <section className="login-card" aria-labelledby="login-title">
          <span className="login-avatar" aria-hidden="true">DG</span>
          <p>DONNAOS USER</p>
          <h1 id="login-title">Donna Gan</h1>
          <form
            className="login-form"
            onSubmit={(event) => {
              event.preventDefault();
              unlockDesktop();
            }}
          >
            <label htmlFor="visitor-password">VISITOR PASSWORD</label>
            <div>
              <input
                id="visitor-password"
                type="password"
                value="visitor"
                readOnly
                aria-describedby="login-hint"
              />
              <button id="unlock-donnaos" type="submit" aria-label="确认访客身份并进入 DonnaOS 桌面">→</button>
            </div>
          </form>
          <small id="login-hint">访客凭证已填入 · 点击密码框后按 Enter，或点箭头解锁</small>
        </section>
        <footer>DonnaOS secure boot · visitor session</footer>
      </main>
    );
  }

  return (
    <main
      className="desktop-shell"
      onPointerDownCapture={dismissGuide}
      onKeyDownCapture={(event) => {
        if (event.key === 'Enter' || event.key === ' ') dismissGuide();
      }}
    >
      <header className="os-topbar">
        <div>
          <button type="button" onClick={() => openApp('brief')} aria-label="打开 Recruiter Brief">DG</button>
          <strong>DonnaOS</strong>
          <button type="button" onClick={() => openApp('projects')}>projects</button>
          <button type="button" onClick={() => openApp('notes')}>notes</button>
          <button type="button" onClick={() => openApp('desk')}>desk</button>
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
                className={[
                  selectedIcon === id && 'is-selected',
                  id === 'brief' && showGuide && 'is-guided',
                ].filter(Boolean).join(' ') || undefined}
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

        {showGuide && (
          <aside className="brief-guide" aria-live="polite">
            <span>START HERE</span>
            <strong>{isCoarse ? '轻点' : '双击'}「recruiter brief」</strong>
            <p>先用 30 秒了解 Donna 与代表项目。</p>
          </aside>
        )}

        {!showGuide && activeId === null && (
          <aside className="now-widget" aria-label="DonnaOS current updates">
            <header><span>NOW</span><time>2026.09.02</time></header>
            <div>
              {nowItems.map((item) => (
                <button type="button" key={item.label} onClick={() => openApp(item.app, { projectSlug: item.projectSlug })}>
                  <small>{item.label}</small>
                  <span><strong>{item.title}</strong><i>{item.detail}</i></span>
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
          </aside>
        )}

        {apps.map(({ id }) => (
          <DesktopWindow
            key={`${id}-${state.windows[id].open ? 'open' : 'closed'}`}
            record={state.windows[id]}
            initialProjectSlug={id === 'projects' ? requestedProjectSlug : undefined}
            closing={closingId === id}
            minimizing={minimizingId === id}
            openApp={openApp}
            onClose={() => closeWindow(id)}
            onFocus={() => { dispatch({ type: 'FOCUS', id }); syncQuery(id); }}
            onMinimize={() => minimizeWindow(id)}
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
                if (record.minimized) openApp(id);
                else if (active) minimizeWindow(id);
                else openApp(id);
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
