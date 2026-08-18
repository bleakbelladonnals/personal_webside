/* ==========================================================================
   Caldera 个人作品集 — 交互脚本
   ========================================================================== */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- 移动端导航 ---------- */
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-pill');
  const mobileNav = window.matchMedia('(max-width: 900px)');
  if (header && navToggle && nav) {
    const setNavState = (open, returnFocus = false) => {
      header.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      if (mobileNav.matches) {
        nav.toggleAttribute('inert', !open);
        nav.setAttribute('aria-hidden', String(!open));
      } else {
        nav.removeAttribute('inert');
        nav.removeAttribute('aria-hidden');
      }
      if (returnFocus) navToggle.focus();
    };

    setNavState(false);
    navToggle.addEventListener('click', () => {
      setNavState(!header.classList.contains('nav-open'));
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavState(false));
    });
    document.addEventListener('click', (e) => {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        setNavState(false);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setNavState(false, true);
      }
    });
    mobileNav.addEventListener('change', () => setNavState(false));
  }

  /* ---------- 高亮当前导航 ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });

  /* ---------- Hero 弹性圆点 ---------- */
  const dotCanvas = document.querySelector('.dot-field');
  if (dotCanvas) {
    const ctx = dotCanvas.getContext('2d');
    const pointer = { x: -1000, y: -1000, active: false };
    let points = [];
    let width = 0;
    let height = 0;
    let running = false;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let isMoving = false;

      points.forEach((point) => {
        if (!prefersReducedMotion.matches) {
          if (pointer.active) {
            const dx = pointer.x - point.x;
            const dy = pointer.y - point.y;
            const distance = Math.hypot(dx, dy) || 1;
            const radius = 96;
            if (distance < radius) {
              const force = (1 - distance / radius) * 1.35;
              point.vx -= (dx / distance) * force;
              point.vy -= (dy / distance) * force;
            }
          }

          point.vx += (point.baseX - point.x) * .055;
          point.vy += (point.baseY - point.y) * .055;
          point.vx *= .84;
          point.vy *= .84;
          point.x += point.vx;
          point.y += point.vy;
          isMoving ||= Math.abs(point.vx) > .015 || Math.abs(point.vy) > .015 || Math.abs(point.x - point.baseX) > .03 || Math.abs(point.y - point.baseY) > .03;
        } else {
          point.x = point.baseX;
          point.y = point.baseY;
        }

        const depth = height ? point.baseY / height : 0;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${.22 + depth * .34})`;
        ctx.fill();
      });

      if (!prefersReducedMotion.matches && (pointer.active || isMoving)) {
        requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (!running) {
        running = true;
        requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const rect = dotCanvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      dotCanvas.width = Math.round(width * ratio);
      dotCanvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const spacing = 18;
      const offsetX = (width % spacing) / 2;
      const offsetY = (height % spacing) / 2;
      points = [];
      for (let y = offsetY; y <= height; y += spacing) {
        for (let x = offsetX; x <= width; x += spacing) {
          points.push({ baseX: x, baseY: y, x, y, vx: 0, vy: 0 });
        }
      }
      dotCanvas.dataset.motion = prefersReducedMotion.matches ? 'static' : 'elastic';
      draw();
    };

    dotCanvas.addEventListener('pointermove', (event) => {
      const rect = dotCanvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      start();
    });
    dotCanvas.addEventListener('pointerleave', () => {
      pointer.active = false;
      start();
    });
    prefersReducedMotion.addEventListener('change', resize);
    new ResizeObserver(resize).observe(dotCanvas);
    resize();
  }

  /* ---------- 滚动渐入 ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- 数字滚动计数器 ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const animate = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = (String(target).split('.')[1] || '').length;
      const duration = 1400;
      const start = performance.now();
      el.textContent = '0';

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const value = target * eased;
        el.innerHTML = value.toFixed(decimals) + (suffix ? '<span class="suffix">' + suffix + '</span>' : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (prefersReducedMotion.matches) {
      counters.forEach((el) => {
        const suffix = el.dataset.suffix || '';
        el.innerHTML = el.dataset.count + (suffix ? '<span class="suffix">' + suffix + '</span>' : '');
      });
    } else if ('IntersectionObserver' in window) {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach((el) => cio.observe(el));
    } else {
      counters.forEach((el) => {
        el.innerHTML = el.dataset.count + (el.dataset.suffix ? '<span class="suffix">' + el.dataset.suffix + '</span>' : '');
      });
    }
  }

  /* ---------- 筛选标签（测评页） ---------- */
  const filters = document.querySelectorAll('.filter');
  const filterable = document.querySelectorAll('[data-category]');
  if (filters.length && filterable.length) {
    filters.forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.classList.contains('active')));
      btn.addEventListener('click', () => {
        filters.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        const key = btn.dataset.filter;
        filterable.forEach((item) => {
          const show = key === 'all' || item.dataset.category === key;
          item.hidden = !show;
        });
      });
    });
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
