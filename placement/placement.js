/* Language placement check: finds where a student is in each area of Ontario Language, Grades 1 to 8, and points to the
   lessons to start with. It works like Math Atlas's placement check (math-atlas plan/engine.js).

   Questions: each grade's own practice skills (gradeN/chapters/*.js) at level 2, so every question is one the checks already
   verify. A grade is loaded only when the check reaches it: its index.html is read for its list of scripts, they run, and
   its chapters and passages are kept here (Atlas.chapters and Atlas.texts are put back afterwards, so this page never shows
   a grade's chapters, and a grade's passages are swapped in only while one of its questions is made).
   Areas: a skill belongs to an area by its FIRST expectation code (see areaOf). Speaking (B1), and A1 and A3, are not
   marked by a computer, so they are not in the check. Open-ended writing is never auto-marked either.

   How it adapts, in each area: start one grade below the school grade. Three right out of four at a grade = secure there,
   so go up one grade (asking for three, not two, means a lucky guess rarely counts). Two not yet (wrong, or "I'm not sure
   yet") = go down one. It stops at the highest secure grade whose next grade is not secure, at two grades above the school
   grade, or after 16 questions.

   Reading aloud (aloud.js) and the writing sample (writing.js) are the parts a computer cannot mark: the grown-up marks them.

   Saved (prefix lang-place:):  state { v, grade, place, levels, history, last, starts, aloud, writing }   (see fresh(), start(), aloud.js and writing.js)
   starts: the lesson to start with in each area, [{ a, g, ch, t, done }], kept when the results page opens. Inside Atlas the
   state is saved to the family account as "lplace", and the Atlas parent page shows it (math-atlas assets/langplace.js). */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, R = A.R, Q = A.Q;
  A.setup({ grade: 0, chapters: [] });
  A.prefix = 'lang-place:';

  var AREAS = [
    { id: 'words', name: 'Sounds, spelling and word parts', short: 'Word study', strand: 'B' },
    { id: 'vocab', name: 'Word meanings', short: 'Meanings', strand: 'B' },
    { id: 'sentences', name: 'Sentences and grammar', short: 'Grammar', strand: 'B' },
    { id: 'punct', name: 'Capitals and punctuation', short: 'Punctuation', strand: 'B' },
    { id: 'reading', name: 'Reading for meaning', short: 'Reading', strand: 'C' },
    { id: 'thinking', name: 'Thinking about texts and media', short: 'Thinking', strand: 'C' },
    { id: 'writing', name: 'Planning and improving writing', short: 'Writing', strand: 'D' }
  ];
  var BY = {}; AREAS.forEach(function (a) { BY[a.id] = a; });
  var LEVEL = 2, MAX_Q = 16;

  /* Which area an expectation belongs to. Strand B's word codes are numbered differently in Grades 1, 2 to 3, and 4 to 8. */
  function areaOf(g, code) {
    var m = /^([A-D])(\d)\.(\d+)$/.exec(code); if (!m) return null;
    var s = m[1] + m[2], n = +m[3];
    if (s === 'B2') {
      var last = g === 1 ? 6 : g <= 3 ? 3 : 1; /* the last word-study code; the next is vocabulary, then fluency */
      return n <= last ? 'words' : n === last + 1 ? 'vocab' : 'reading';
    }
    if (s === 'B3') return n === 3 ? 'punct' : 'sentences';
    if (s === 'C1') return n === 1 || n === 2 || n === 6 ? 'reading' : 'thinking';
    if (s === 'C2') return 'reading';
    if (s === 'C3' || s === 'A2') return 'thinking';
    if (m[1] === 'D') return 'writing';
    return null;
  }

  /* ---------- loading a grade's skills, one grade at a time ---------- */
  var G = {}, queue = Promise.resolve();
  function script(src) {
    return new Promise(function (ok, no) {
      var s = document.createElement('script');
      s.src = src; s.onload = ok; s.onerror = function () { no(new Error('could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function loadGrade(g) {
    if (G[g]) return G[g];
    var p = queue.then(function () {
      return fetch('../grade' + g + '/index.html').then(function (r) { if (!r.ok) throw new Error('Grade ' + g + ' is missing'); return r.text(); }).then(function (html) {
        var srcs = [];
        html.replace(/<script src="([^"]+)"/g, function (all, src) { if (src.indexOf('../') !== 0) srcs.push('../grade' + g + '/' + src); return all; });
        var keep = { chapters: A.chapters, meta: A.meta, grade: A.grade, prefix: A.prefix, curriculum: A.curriculum, texts: A.texts };
        function restore() { for (var k in keep) A[k] = keep[k]; }
        A.chapters = {};
        return srcs.reduce(function (chain, src) { return chain.then(function () { return script(src); }); }, Promise.resolve()).then(function () {
          var out = { g: g, skills: [], texts: A.texts };
          A.meta.forEach(function (m) {
            ((A.chapters[m.id] || {}).practice || []).forEach(function (sk) {
              var a = areaOf(g, sk.code.split(/,\s*/)[0]);
              if (a) out.skills.push({ g: g, ch: m, sk: sk, a: a });
            });
          });
          restore();
          return out;
        }, function (e) { restore(); throw e; });
      });
    });
    queue = p.catch(function () {});
    G[g] = p.catch(function (e) { delete G[g]; throw e; });
    return G[g];
  }
  A.placementGrade = loadGrade; /* for the automatic checks */

  /* ---------- the check ---------- */
  function load() { return A.load('state', null); }
  function save(st) { A.save('state', st); }
  A.placement = { load: load, save: save }; /* for aloud.js */
  function fresh(grade) { return { v: 1, grade: grade, place: null, levels: null, history: [], last: null }; }
  function start(st, kind) {
    var top = Math.min(8, st.grade + 2), areas = {};
    AREAS.forEach(function (a) {
      var from = kind === 'recheck' && st.levels ? Math.max(1, Math.min(top, st.levels[a.id] || 1)) : Math.max(1, st.grade - 1);
      areas[a.id] = { cur: from, res: {}, used: [], done: false, lv: null, n: 0 };
    });
    st.place = { kind: kind || 'first', started: A.today(), top: top, areas: areas, log: [] };
  }
  function areaNow(st) {
    for (var i = 0; i < AREAS.length; i++) if (!st.place.areas[AREAS[i].id].done) return AREAS[i].id;
    return null;
  }
  function doneCount(st) { return AREAS.filter(function (a) { return st.place.areas[a.id].done; }).length; }
  /* a question for this area at its current grade: a skill not asked yet if there is one */
  function nextQuestion(st, a) {
    var P = st.place.areas[a];
    return loadGrade(P.cur).then(function (G) {
      var pool = G.skills.filter(function (x) { return x.a === a; });
      if (!pool.length) return null;
      var fresh = pool.filter(function (x) { return P.used.indexOf(x.g + '/' + x.sk.id) < 0; });
      var pick = R.pick(fresh.length ? fresh : pool), keep = A.texts, q;
      A.texts = G.texts; /* a grade's texts.js looks up its passages through Atlas.texts when a question is made */
      try { q = pick.sk.gen(LEVEL); } finally { A.texts = keep; }
      q.at = pick;
      return q;
    });
  }
  /* ok: true, or false for wrong and for "I'm not sure yet". Returns true when the area is finished. */
  function answer(st, q, ok, given) {
    var P = st.place.areas[q.at.a], L = P.cur, res = P.res[L] || (P.res[L] = { r: 0, w: 0 }), top = st.place.top;
    P.used.push(q.at.g + '/' + q.at.sk.id); P.n++;
    if (ok) res.r++; else res.w++;
    st.place.log.push({ a: q.at.a, g: q.at.g, ch: q.at.ch.id, cht: q.at.ch.title, sk: q.at.sk.id, skn: q.at.sk.name, code: q.at.sk.code, ok: !!ok, given: given, right: Q.text(q), q: plain(q.q) });
    function secure(l) { return P.res[l] && P.res[l].r >= 3; }
    function notYet(l) { return P.res[l] && P.res[l].w >= 2; }
    function finish(lv) { P.done = true; P.lv = lv; return true; }
    if (secure(L)) {
      if (L >= top || notYet(L + 1)) return finish(L);
      P.cur = L + 1;
    } else if (notYet(L)) {
      if (L <= 1) return finish(0);
      if (secure(L - 1)) return finish(L - 1);
      P.cur = L - 1;
    }
    if (P.n >= MAX_Q) return finish(Math.max(0, P.cur - 1));
    return false;
  }
  function finishAll(st) {
    var lv = {};
    AREAS.forEach(function (a) { lv[a.id] = st.place.areas[a.id].lv; });
    st.levels = lv;
    st.history.push({ d: A.today(), kind: st.place.kind, levels: lv, n: st.place.log.length });
    st.last = { d: A.today(), log: st.place.log };
    st.place = null;
  }
  function plain(h) { var d = document.createElement('div'); d.innerHTML = h || ''; return (d.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 160); }

  /* ---------- where to start: in the next grade up, the chapter of the first skill missed there (that is where the check
     stopped), else the area's first chapter in its own strand ---------- */
  function startAt(st, a) {
    var lv = st.levels[a], g = Math.min(8, lv + 1);
    return loadGrade(g).then(function (G) {
      var mine = G.skills.filter(function (s) { return s.a === a; });
      var missed = st.last.log.filter(function (x) { return x.a === a && x.g === g && !x.ok; })[0];
      var x = (missed && mine.filter(function (s) { return s.ch.id === missed.ch; })[0]) || mine.filter(function (s) { return s.ch.strand === BY[a].strand; })[0] || mine[0];
      return x ? { g: g, ch: x.ch, href: '../grade' + g + '/#' + x.ch.id, done: lv >= 8 } : null;
    });
  }
  /* skills missed at or below the level found: worth a little practice */
  function gaps(st) {
    var seen = {};
    return st.last.log.filter(function (x) {
      var k = x.g + '/' + x.sk;
      if (x.ok || x.g > st.levels[x.a] || seen[k]) return false;
      seen[k] = 1; return true;
    });
  }

  /* ---------- screens ---------- */
  function gname(l) { return l ? 'Grade ' + l : 'early Grade 1'; }
  function ladder(levels, cur) {
    return '<div class="pl-ladder" role="img" aria-label="' + AREAS.map(function (a) { return a.name + ': ' + (levels && levels[a.id] != null ? 'secure up to ' + gname(levels[a.id]) : 'not checked yet'); }).join('. ') + '">' +
      '<div class="pl-row pl-head"><span></span>' + [1, 2, 3, 4, 5, 6, 7, 8].map(function (g) { return '<b>' + g + '</b>'; }).join('') + '</div>' +
      AREAS.map(function (a) {
        var lv = levels ? levels[a.id] : null, cells = '';
        for (var g = 1; g <= 8; g++) cells += '<i class="' + (lv != null && g <= lv ? 'on' : '') + '"></i>';
        return '<div class="pl-row' + (cur === a.id ? ' now' : '') + '" data-strand="' + a.strand + '"><span>' + a.short + '</span>' + cells + '</div>';
      }).join('') + '</div>';
  }
  function soFar(st) {
    var lv = {};
    AREAS.forEach(function (a) { var P = st.place.areas[a.id]; lv[a.id] = P.done ? P.lv : null; });
    return lv;
  }
  function page(app, h) { app.innerHTML = '<div class="wrap pl">' + h + '</div>'; }

  A.page('home', function (app) {
    var st = load();
    if (st && st.place) {
      page(app, '<header class="chead"><span class="num">Placement check</span><h1>Pick up where you left off</h1>' +
        '<p class="lede">' + doneCount(st) + ' of ' + AREAS.length + ' parts done. Everything is saved.</p></header>' + ladder(soFar(st), areaNow(st)) +
        '<p class="pl-acts"><a class="btn" href="#test">Keep going</a></p>');
      return;
    }
    if (st && st.levels) { location.replace('#results'); return; }
    var g = st ? st.grade : 0, btns = '';
    for (var i = 1; i <= 8; i++) btns += '<button type="button" class="pl-g' + (g === i ? ' on' : '') + '" data-g="' + i + '" aria-pressed="' + (g === i) + '">' + i + '</button>';
    page(app, '<header class="chead"><span class="num">Placement check</span><h1>Find the right place to start</h1>' +
      '<p class="lede">It finds what you already know in each part of Language, so you start where it helps.</p></header>' +
      ladder(null) +
      '<ul class="pl-facts"><li>About 55 questions in 7 parts. Stop after any part.</li><li>Some feel easy and some feel hard. That is how it works.</li>' +
      '<li>No timer. If you don\'t know, press <b>I\'m not sure yet</b>.</li></ul>' +
      '<h2 class="pl-q">Grade at school this year</h2><div class="pl-gs" role="group" aria-label="Grade at school">' + btns + '</div>' +
      '<p class="pl-acts"><button type="button" class="btn" id="plgo"' + (g ? '' : ' disabled') + '>Start the check</button></p>' +
      '<div class="note adult-only"><p><b>For parents and tutors.</b> Each part starts one grade below the school grade and moves up a grade after 3 right out of 4, or down after 2 misses. ' +
      'Speaking and open-ended writing are not in the check; the grade\'s activities cover them, marked by you.</p></div>');
    A.$$('.pl-g', app).forEach(function (b) {
      b.addEventListener('click', function () {
        g = +b.getAttribute('data-g');
        A.$$('.pl-g', app).forEach(function (x) { var on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', String(on)); });
        $('#plgo', app).disabled = false;
      });
    });
    $('#plgo', app).addEventListener('click', function () {
      var s = fresh(g); start(s); save(s);
      loadGrade(Math.max(1, g - 1));
      location.hash = '#test';
    });
  });

  A.page('test', function (app) {
    var st = load();
    if (!st || !st.place) { location.replace(st && st.levels ? '#results' : '#home'); return; }
    var a = areaNow(st);
    if (!a) { finishAll(st); save(st); location.replace('#results'); return; }
    page(app, '<p class="pl-wait">Getting the next question ready…</p>');
    nextQuestion(st, a).then(function (q) {
      if (location.hash !== '#test') return;
      if (!q) { st.place.areas[a].done = true; st.place.areas[a].lv = Math.max(0, st.place.areas[a].cur - 1); save(st); return A.pages.test(app); }
      var n = doneCount(st), P = st.place.areas[a], w = Math.round(100 * (n + Math.min(P.n / 5, 0.9)) / AREAS.length);
      A._q = q;
      app.innerHTML = '<div class="wrap chapter" data-strand="' + BY[a].strand + '"><div class="sec cu">' +
        '<div class="cuprog"><span>' + BY[a].name + '</span><span>Part ' + (n + 1) + ' of ' + AREAS.length + '</span></div>' +
        '<div class="bar-h"><i style="width:' + w + '%"></i></div>' +
        '<p class="plv adult-only"><span class="pill">Grade ' + q.at.g + ' &middot; ' + q.at.ch.title + ' &middot; ' + q.at.sk.code + '</span></p>' + Q.html(q) +
        '<p class="pl-acts"><button type="button" class="btn alt" id="plskip">I\'m not sure yet</button> <a class="pl-stop" href="#home">Stop for now</a></p></div></div>';
      var done = false;
      function rec(ok, given) {
        if (done) return; done = true;
        var areaDone = answer(st, q, ok, given == null ? null : given);
        save(st);
        if (areaDone && areaNow(st)) return pause(app, st, a);
        A.pages.test(app);
      }
      A._qk = Q.mount($('.qkbox', app), q, rec);
      A._qk.focus();
      $('#plskip', app).addEventListener('click', function () { rec(false, null); });
    }, function () {
      page(app, '<header class="chead"><h1>The next question could not load</h1><p class="lede">Check the internet connection, then try again. Your answers are saved.</p></header>' +
        '<p class="pl-acts"><a class="btn" href="#test" id="plagain">Try again</a></p>');
      $('#plagain', app).addEventListener('click', function (e) { e.preventDefault(); A.pages.test(app); });
    });
  });

  /* between parts: a moment to rest, and the ladder filling in */
  function pause(app, st, a) {
    var next = areaNow(st);
    loadGrade(st.place.areas[next].cur);
    page(app, '<header class="chead"><span class="num">Part ' + doneCount(st) + ' of ' + AREAS.length + ' done</span><h1>' + BY[a].name + ': done</h1>' +
      '<p class="lede">Next is ' + BY[next].name.toLowerCase() + '. A good time for a stretch or a drink of water.</p></header>' + ladder(soFar(st), next) +
      '<p class="pl-acts"><a class="btn" href="#test" id="plnext">Keep going</a> <a class="btn alt" href="#home">Take a break</a></p>');
    $('#plnext', app).addEventListener('click', function (e) { e.preventDefault(); A.pages.test(app); });
    window.scrollTo(0, 0);
  }

  A.page('results', function (app) {
    var st = load();
    if (!st || !st.levels) { location.replace('#home'); return; }
    page(app, '<p class="pl-wait">Finding the lessons to start with…</p>');
    Promise.all(AREAS.map(function (a) { return startAt(st, a.id); })).then(function (starts) {
      var gp = gaps(st);
      /* kept with the results so the Atlas parent page can link to the same lessons */
      var keep = starts.map(function (s, i) { return s && { a: AREAS[i].id, g: s.g, ch: s.ch.id, t: plain(s.ch.title), done: s.done }; });
      if (JSON.stringify(st.starts) !== JSON.stringify(keep)) { st.starts = keep; save(st); }
      var h = '<header class="chead"><span class="num">Results &middot; ' + st.last.d + '</span><h1>Your starting points</h1>' +
        '<p class="lede">Each row shows the grades that are secure. Start each part with the lesson beside it.</p></header>' + ladder(st.levels) +
        '<ol class="pl-start">' + AREAS.map(function (a, i) {
          var s = starts[i], lv = st.levels[a.id];
          return '<li data-strand="' + a.strand + '"><span class="pl-an">' + a.name + '</span><span class="pl-lv">Secure up to ' + gname(lv) + '</span>' +
            (s ? '<a class="pl-go" href="' + s.href + '">' + (s.done ? 'Keep going: ' : 'Start: ') + 'Grade ' + s.g + ' &middot; ' + s.ch.title + ' <span aria-hidden="true">&rsaquo;</span></a>' : '') + '</li>';
        }).join('') + '</ol>';
      h += '<section class="sec cu" data-strand="C"><h2>Reading aloud</h2>' + (st.aloud
        ? A.aloudSummary(st.aloud) + '<p class="adult-only">Grade ' + st.aloud.g + ' passages, ' + st.aloud.d + '. <a href="../grade' + st.aloud.g + '/#fluency">Fluency lessons for Grade ' + st.aloud.g + '</a></p><p><a href="#aloud">Do the reading again</a></p>'
        : '<p>One minute, twice, with a grown-up. It shows how smoothly you read.</p><p><a class="btn alt" href="#aloud">Start reading aloud</a></p>') + '</section>';
      h += '<section class="sec cu" data-strand="D"><h2>Writing sample</h2>' + (st.writing && st.writing.g === st.grade
        ? A.writingSummary(st.writing) + '<p><a href="#writing">Open the writing</a></p>'
        : '<p>About 10 to 15 minutes of writing on your own. A grown-up marks it.</p><p><a class="btn alt" href="#writing">Start the writing sample</a></p>') + '</section>';
      if (gp.length) {
        h += '<section class="sec cu adult-only"><h2>Also worth practising</h2><p>Missed in the check, at a grade that is otherwise secure.</p><ul class="plan">' + gp.map(function (x) {
          return '<li><a href="../grade' + x.g + '/#' + x.ch + '/practice/' + x.sk + '">' + x.skn + '</a> <span class="t2">(Grade ' + x.g + ', ' + x.cht + ', ' + x.code + ')</span></li>';
        }).join('') + '</ul></section>';
      }
      h += '<section class="sec cu adult-only"><h2>Every question</h2><div class="review">' + st.last.log.map(function (x, i) {
        return '<div class="q"><p class="qtext"><span class="qn">' + (i + 1) + '</span>' + x.q + '</p><p class="fb ' + (x.ok ? 'ok' : 'bad') + '"><b>' +
          (x.ok ? 'Right: ' + x.right : (x.given == null ? 'Not sure yet.' : 'Said: ' + x.given + '.') + ' Answer: ' + x.right + '.') + '</b> <span class="t2">Grade ' + x.g + ' &middot; ' + BY[x.a].name + ' &middot; ' + x.code + '</span></p></div>';
      }).join('') + '</div></section>';
      h += '<p class="pl-acts"><button type="button" class="btn alt" id="plagain">Do the check again</button> <button type="button" class="btn alt" id="plprint">Print or save</button></p>' +
        '<div class="note"><p><b>For parents and tutors.</b> This is a snapshot, not a mark. Turn on grown-up view to see every question and the skills worth practising. Do the check again in a month or two to see growth.</p></div>';
      page(app, h);
      $('#plprint', app).addEventListener('click', function () { window.print(); });
      $('#plagain', app).addEventListener('click', function () { start(st, 'recheck'); save(st); location.hash = '#test'; });
    });
  });
})();
