/* Language Atlas core, shared by every grade: the Atlas object, saved progress, random helpers, the page router,
   the grade's home page, and the display settings (text size, grown-up view). No dependencies.

   Load order on a grade page (see docs/ARCHITECTURE.md):
     engine/atlas.js, qkit.js, words.js, lesson.js, practice.js, tasks.js, then gradeN/grade.js (and texts.js), gradeN/chapters/*.js,
     then  <script>Atlas.start();</script>

   gradeN/grade.js describes the grade:
     Atlas.setup({ grade: 1, curriculum: '...', chapters: [{ id, title, sub, strand, codes, desc }, ...] });
   Each chapter file adds its content:  Atlas.register('chapter-id', { lessons, practice, quiz }); */
(function () {
  'use strict';
  var Atlas = (window.Atlas = { chapters: {}, meta: [], pages: {} });
  /* the four strands of the 2023 Ontario Language curriculum */
  Atlas.strands = { A: 'Literacy Connections and Applications', B: 'Foundations of Language', C: 'Comprehension', D: 'Composition' };

  var $ = (Atlas.$ = function (s, r) { return (r || document).querySelector(s); });
  Atlas.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  Atlas.setup = function (cfg) {
    Atlas.grade = cfg.grade;
    Atlas.meta = cfg.chapters;
    Atlas.curriculum = cfg.curriculum || '';
    Atlas.prefix = 'lang-g' + cfg.grade + ':';
  };
  Atlas.register = function (id, ch) { Atlas.chapters[id] = ch; };
  /* engine modules add whole pages: Atlas.page('check-up', function (app, sub) { ... }) */
  Atlas.page = function (name, fn) { Atlas.pages[name] = fn; };

  /* ---------- saved progress: this browser only, one prefix per grade (lang-g1:) ---------- */
  Atlas.store = function (k, v) {
    try { if (v === undefined) return localStorage.getItem(Atlas.prefix + k); localStorage.setItem(Atlas.prefix + k, v); } catch (e) { return null; }
  };
  Atlas.load = function (k, d) { try { var v = Atlas.store(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  Atlas.save = function (k, v) { Atlas.store(k, JSON.stringify(v)); };
  Atlas.today = function () { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); };

  /* ---------- random helpers for practice questions ---------- */
  var R = (Atlas.R = {
    int: function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); },
    pick: function (arr) { return arr[Math.floor(Math.random() * arr.length)]; },
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
      return a;
    },
    /* several different items from a list */
    some: function (arr, n) { return R.shuffle(arr).slice(0, n); },
    /* pick-one options: the right answer plus up to 3 different wrong ones, mixed up */
    mc: function (right, wrong) {
      var seen = {}, opts = [String(right)];
      seen[String(right)] = 1;
      wrong.forEach(function (w) { w = String(w); if (!seen[w] && opts.length < 4) { seen[w] = 1; opts.push(w); } });
      opts = R.shuffle(opts);
      return { options: opts, answer: opts.indexOf(String(right)) };
    }
  });

  /* a short movement that draws the eye (a nudge on a wrong answer, a lift on a right one) */
  Atlas.bump = function (el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  };
  /* Canadian number style: a space groups numbers of 5 or more digits (12 500) */
  Atlas.fmt = function (n) {
    var s = String(n), neg = s.charAt(0) === '-' ? '-' : '', p = s.replace('-', '').split('.'), i = p[0];
    if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return neg + i + (p.length > 1 ? '.' + p[1] : '');
  };

  /* ---------- chapters: list, neighbours, page head ---------- */
  Atlas.built = function () { return Atlas.meta.filter(function (m) { return Atlas.chapters[m.id]; }); };
  Atlas.chapterHead = function (id) {
    var idx = 0;
    Atlas.meta.forEach(function (m, i) { if (m.id === id) idx = i; });
    var m = Atlas.meta[idx], built = Atlas.built(), at = built.indexOf(m);
    return {
      m: m, prev: built[at - 1] || null, next: built[at + 1] || null,
      head: '<header class="chead"><span class="num">Chapter ' + (idx + 1) + '</span><h1>' + m.title + '</h1>' +
        '<p class="lede">' + m.sub.charAt(0).toUpperCase() + m.sub.slice(1) + '.</p>' +
        '<span class="pill">' + m.strand + ' &middot; ' + Atlas.strands[m.strand] + '</span> <span class="codes adult-only">Ontario expectations ' + m.codes + '</span></header>'
    };
  };
  Atlas.nextPrev = function (ctx) {
    return '<div class="pn">' + (ctx.prev ? '<a href="#' + ctx.prev.id + '"><small>Previous chapter</small>' + ctx.prev.title + '</a>' : '<span></span>') +
      (ctx.next ? '<a class="nx" href="#' + ctx.next.id + '"><small>Next chapter</small>' + ctx.next.title + '</a>' : '') + '</div>';
  };

  /* ---------- the grade's home page: chapter cards ---------- */
  function home(app) {
    var h = '<div class="wrap wide"><div class="hero"><p class="eyebrow">Ontario Language &middot; Grade ' + Atlas.grade + '</p><h1>Grade ' + Atlas.grade + ' Language, one step at a time</h1>' +
      '<p class="lede">Short lessons that show one idea at a time. First watch, then do it together, then try it on your own. Practice adjusts to you, and a check-up shows what to work on next.</p>' +
      '<div class="legend">' + Object.keys(Atlas.strands).map(function (k) { return '<span class="pill" data-strand="' + k + '">' + k + ' &middot; ' + Atlas.strands[k] + '</span>'; }).join('') + '</div></div>';
    var plan = Atlas.load('plan', []), hist = Atlas.load('checkups', []);
    h += '<div class="start">';
    if (hist.length) {
      var last = hist[hist.length - 1];
      h += '<p><b>Last check-up</b> (' + last.d + '): ' + last.s + ' of ' + last.n + '.</p>' +
        (plan.length ? '<p>Next up:</p><ul>' + plan.map(function (p) { return '<li><a href="#' + p.ch + '/practice/' + p.sk + '">' + p.name + '</a> <span class="t2">(' + p.t + ')</span></li>'; }).join('') + '</ul>' : '') +
        '<p><a href="#check-up">Take another check-up</a></p>';
    } else h += '<p><b>Not sure where to start?</b> Take the <a href="#check-up">check-up</a>. It builds a practice plan for you.</p>';
    h += '</div><div class="cards">';
    Atlas.meta.forEach(function (m, i) {
      var ch = Atlas.chapters[m.id], tag = '<span class="pill" data-strand="' + m.strand + '">' + m.strand + ' &middot; ' + Atlas.strands[m.strand] + '</span>';
      var body = '<span class="no">' + (i + 1) + '</span><h2>' + m.title + '</h2><p class="sub">' + m.sub + '</p><p class="desc">' + m.desc + '</p>';
      if (!ch) { h += '<div class="card soon" data-strand="' + m.strand + '">' + body + '<div class="meta">' + tag + '<span>Coming soon</span></div></div>'; return; }
      var ideas = Atlas.lessons.flat(m.id).length, sk = ch.practice || [], sec = sk.filter(function (s) { return Atlas.skillStatus(s.id).k === 4; }).length;
      var best = Atlas.load('best:' + m.id, null);
      h += '<a class="card" data-strand="' + m.strand + '" href="#' + m.id + '">' + body + '<div class="meta">' + tag + '<span>' + ch.lessons.length + (ch.lessons.length === 1 ? ' lesson, ' : ' lessons, ') + ideas + (ideas === 1 ? ' idea' : ' ideas') +
        (best ? ' &middot; <span class="done">quiz ' + best.s + '/' + best.n + '</span>' : '') + (sec ? ' &middot; <span class="done">' + sec + '/' + sk.length + ' secure</span>' : '') + '</span></div></a>';
    });
    h += '</div><div class="note"><p><b>About this site.</b> It follows the 2023 Ontario Language curriculum for Grade ' + Atlas.grade + '. Every lesson and skill names the expectation it teaches (for example B3.3). ' +
      'It is a study aid, not a copy of the curriculum. Check details against the Ministry of Education document.</p>' + (Atlas.curriculum ? '<p>' + Atlas.curriculum + '</p>' : '') +
      '<p><b>Progress</b> is saved only in this browser.</p></div></div>';
    app.innerHTML = h;
  }

  /* ---------- router: #home, #check-up[/chapter], #progress, #chapter[/learn/idea[/2|/3]|/done/lesson|/practice[/skill]|/quiz] ---------- */
  function route() {
    var raw = (location.hash || '').replace('#', '') || 'home';
    var cut = raw.indexOf('/'), id = cut < 0 ? raw : raw.slice(0, cut), sub = cut < 0 ? '' : raw.slice(cut + 1);
    var app = $('#app');
    if (Atlas.pages[id]) Atlas.pages[id](app, sub);
    else if (Atlas.chapters[id]) Atlas.lessons.chapter(app, id, sub);
    else home(app);
    Atlas.$$('.bar nav a').forEach(function (a) { if (a.getAttribute('href') === '#' + (Atlas.pages[id] ? id : 'home')) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
  }

  /* ---------- display settings, remembered in this browser ----------
     Grown-up view shows coaching notes and common mistakes (anything with class "adult-only") for a parent or tutor.
     It is stored outside the grade's lang-gN: keys, so it is never copied to the student's account. */
  function prefs() {
    var root = document.documentElement, bb = $('#bigb'), ab = $('#adultb');
    function big(on) {
      if (on === undefined) on = Atlas.store('big') === '1'; else Atlas.store('big', on ? '1' : '0');
      root.classList.toggle('bigtext', on);
      if (bb) { bb.setAttribute('aria-pressed', String(on)); bb.textContent = on ? 'Text: larger' : 'Text: normal'; }
    }
    function adult(on) {
      try { if (on === undefined) on = localStorage.getItem('atlas:adult') === '1'; else localStorage.setItem('atlas:adult', on ? '1' : '0'); } catch (e) { on = !!on; }
      root.classList.toggle('adult', on);
      if (ab) { ab.setAttribute('aria-pressed', String(on)); ab.textContent = 'Grown-up view: ' + (on ? 'on' : 'off'); }
    }
    Atlas.adult = adult;
    if (bb) bb.addEventListener('click', function () { big(!root.classList.contains('bigtext')); });
    if (ab) ab.addEventListener('click', function () { adult(!root.classList.contains('adult')); });
    big(); adult();
  }

  Atlas.start = function () {
    prefs();
    window.addEventListener('hashchange', route);
    route();
  };
})();
