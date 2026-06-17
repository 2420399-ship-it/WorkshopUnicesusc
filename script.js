// ── Marca o link ativo no menu com base no arquivo atual ────────────
(function () {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href').split('/').pop();
    if (href === current) {
      a.classList.add('active');
    }
  });

  // Hamburger mobile
  var toggle = document.getElementById('nav-toggle');
  var links  = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    // fecha ao clicar num link
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }
})();

// ── Animação de entrada nos elementos com data-animate ──────────────
(function () {
  if (!('IntersectionObserver' in window)) return;

  var style = document.createElement('style');
  style.textContent =
    '[data-animate]{opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease}' +
    '[data-animate].visible{opacity:1;transform:none}';
  document.head.appendChild(style);

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach(function (el) {
    obs.observe(el);
  });
})();

// ── Contador animado nos .stat-num com data-count ───────────────────
(function () {
  var els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  function animateCount(el) {
    var end      = parseFloat(el.dataset.count);
    var suffix   = el.dataset.suffix  || '';
    var prefix   = el.dataset.prefix  || '';
    var decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    var duration = 1400;
    var start    = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      var value    = eased * end;
      el.textContent = prefix + (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('pt-BR')) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    els.forEach(animateCount);
    return;
  }

  var obs2 = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        animateCount(e.target);
        obs2.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(function (el) { obs2.observe(el); });
})();