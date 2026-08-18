/* ==========================================================================
   Caldera 个人作品集 — 交互脚本
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 移动端导航 ---------- */
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  if (header && navToggle) {
    navToggle.addEventListener('click', () => header.classList.toggle('nav-open'));
    document.addEventListener('click', (e) => {
      if (header.classList.contains('nav-open') && !header.contains(e.target)) {
        header.classList.remove('nav-open');
      }
    });
  }

  /* ---------- 高亮当前导航 ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });

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

      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        const value = target * eased;
        el.innerHTML = value.toFixed(decimals) + (suffix ? '<span class="suffix">' + suffix + '</span>' : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
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
      btn.addEventListener('click', () => {
        filters.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.filter;
        filterable.forEach((item) => {
          const show = key === 'all' || item.dataset.category === key;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 页脚年份 ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
