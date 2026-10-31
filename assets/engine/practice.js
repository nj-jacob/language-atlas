/* Language Atlas practice, chapter quizzes and check-ups, shared by every grade. Needs atlas.js and qkit.js.

   Practice skill:  { id, name, code: 'B3.3', gen: function (level) -> question }   (see docs/QUESTIONS.md)
   - Adaptive: level 1 (gentlest), 2, 3. Three right in a row on the first try moves up a level; two misses in a row moves down
     and shows the steps. Three in a row at level 3 marks the skill "Secure".
   - Every fourth question reviews another skill from the chapter that the child has already practised.
   Chapter quiz: seven questions made fresh from the chapter's skills (plus any fixed quiz questions).
   Check-up: one level-1 question for every skill in a chapter (so all chapter check-ups together cover every expectation a
   computer can mark; activities marked by a grown-up, in tasks.js, cover the rest on the same map),
   then up to three level-2 questions on skills answered right. It sets practice levels and makes a short plan.

   Saved (prefix lang-gN:):  sk:<skill> { lv, streak, miss, n, ok, secure, t }   best:<chapter> { s, n, d }
                             checkups [{ d, w, s, n }]   cov { code: { d, ok, n } }   plan [{ ch, sk, name, t }] */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$, R = A.R, Q = A.Q;
  var LV = ['', 'Getting started', 'Building', 'Stretch'];

  function skillState(sid) { return A.load('sk:' + sid, { lv: 1, streak: 0, miss: 0, n: 0, ok: 0, secure: false }); }
  function skillSave(sid, s) { s.t = Date.now(); A.save('sk:' + sid, s); }
  function status(s) {
    if (s.secure) return { k: 4, t: 'Secure' };
    if (!s.n) return { k: 0, t: 'Not started' };
    return { k: s.lv, t: 'Level ' + s.lv + ': ' + LV[s.lv] };
  }
  A.skillStatus = function (sid) { return status(skillState(sid)); };
  A.allSkills = function () {
    var out = [];
    A.built().forEach(function (m) { (A.chapters[m.id].practice || []).forEach(function (sk) { out.push({ ch: m, sk: sk }); }); });
    return out;
  };
  function make(sk, lv) { var q = sk.gen(lv); q.skill = sk.id; q.lv = lv; return q; }
  function meter(k) {
    var h = '<span class="meter" aria-hidden="true">';
    for (var i = 1; i <= 4; i++) h += '<i class="' + (i <= k ? 'on' : '') + '"></i>';
    return h + '</span>';
  }

  /* ---------- adaptive practice ---------- */
  A.practice = function (box, id, skills, startSkill) {
    var cur = null, q = null, qk = null, tries = 0, done = false, home = null, session = { n: 0, first: 0 };
    function pickWeakest() {
      return skills.map(function (sk) { return { sk: sk, s: skillState(sk.id) }; }).sort(function (a, b) {
        var ka = a.s.secure ? 9 : a.s.lv, kb = b.s.secure ? 9 : b.s.lv;
        return ka - kb || (a.s.t || 0) - (b.s.t || 0);
      })[0].sk;
    }
    /* started on one skill: the question gets the screen, with one link back to the list of skills */
    var focus = !!startSkill;
    box.innerHTML = focus
      ? '<div class="ls-top"><a class="ls-back" href="#' + id + '/practice"><span aria-hidden="true">&lsaquo;</span> All skills</a><p class="qscore pscore" aria-live="polite"></p></div><div class="pq" aria-live="polite"></div>'
      : '<div class="qhead"><h2>Practise</h2><p class="qscore pscore" aria-live="polite"></p></div>' +
        '<p class="qintro">Pick a skill. Three right in a row moves you up a level.</p>' +
        '<div class="skills"></div><div class="pq" aria-live="polite"></div>';
    var row = $('.skills', box), pq = $('.pq', box);
    function refreshRow() {
      if (!row) return;
      row.innerHTML = skills.map(function (sk) {
        var st = status(skillState(sk.id));
        return '<a class="skill" href="#' + id + '/practice/' + sk.id + '">' +
          '<span class="sn">' + sk.name + '</span><span class="ss">' + meter(st.k) + ' ' + st.t + '</span><span class="sc adult-only">' + sk.code + '</span></a>';
      }).join('');
    }
    function scoreLine() { $('.pscore', box).textContent = session.n ? 'This session: ' + session.n + ' done, ' + session.first + ' right first time' : ''; }
    function next(focus, easier) {
      if (home && !easier) { cur = home; home = null; }
      var seen = skills.filter(function (sk) { return sk.id !== cur.id && skillState(sk.id).n > 0; });
      if (!easier && session.n % 4 === 3 && seen.length) { home = cur; cur = R.pick(seen); }
      var st = skillState(cur.id), lv = easier ? Math.max(1, st.lv - 1) : st.lv;
      q = make(cur, lv); tries = 0; done = false;
      A._q = q; /* for the automatic checks */
      refreshRow();
      pq.innerHTML = '<div class="pcard"><p class="plv"><b>' + cur.name + '</b> &middot; Level ' + lv + (home ? ' &middot; <i>Review</i>' : '') + '<span class="pill adult-only">' + cur.code + '</span></p>' +
        Q.html(q) + '<div class="fb" aria-live="polite"></div><div class="steps"></div><div class="pnext"></div></div>';
      qk = Q.mount($('.qkbox', pq), q, function (ok) { if (!done) answer(ok); });
      A._qk = qk;
      if (focus) qk.focus();
      scoreLine();
    }
    function answer(ok) {
      tries++;
      var fb = $('.fb', pq), st = skillState(cur.id), msg = '';
      if (!ok && tries === 1) {
        fb.className = 'fb bad';
        fb.innerHTML = '<b>Not quite.</b> <span>' + (q.hint || 'Have another go.') + '</span>' + (q.steps && q.steps[0] ? '<p class="t2">Step 1: ' + q.steps[0] + '</p>' : '');
        return;
      }
      done = true; session.n++; st.n++;
      if (!ok) qk.reveal();
      qk.lock();
      if (ok && tries === 1) {
        session.first++; st.ok++; st.streak++; st.miss = 0;
        if (st.streak >= 3 && st.lv < 3) { st.lv++; st.streak = 0; msg = 'Three in a row. Moving up to level ' + st.lv + '.'; }
        else if (st.streak >= 3 && st.lv === 3 && !st.secure) { st.secure = true; msg = 'This skill is now secure. Come back to it now and then to keep it fresh.'; }
      } else {
        st.streak = 0;
        if (!ok) { st.miss++; if (st.miss >= 2 && st.lv > 1) { st.lv--; st.miss = 0; msg = 'Let\'s step back to level ' + st.lv + ' and build up again.'; } }
      }
      skillSave(cur.id, st);
      fb.className = 'fb ' + (ok ? 'ok' : 'bad');
      fb.innerHTML = '<b>' + (ok ? (tries === 1 ? 'Correct.' : 'Correct on the second try.') : 'The answer is: ' + Q.text(q) + '.') + '</b> <span>' + (q.explain || '') + '</span>' + (msg ? '<p class="lvmsg">' + msg + '</p>' : '');
      if (!ok && q.steps && q.steps.length) showSteps();
      $('.pnext', pq).innerHTML = '<button type="button" class="btn">' + (ok ? 'Next question' : 'Try a similar one') + '</button>';
      var nb = $('.pnext .btn', pq);
      nb.addEventListener('click', function () { next(true, !ok); });
      nb.focus();
      refreshRow(); scoreLine();
    }
    function showSteps() {
      var sb = $('.steps', pq), k = 0;
      function draw() {
        sb.innerHTML = '<p class="sth"><b>Step by step</b></p><ol>' + q.steps.slice(0, k + 1).map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' +
          (k + 1 < q.steps.length ? '<button type="button" class="btn alt">Show the next step</button>' : '');
        var b = $('.btn', sb);
        if (b) b.addEventListener('click', function () { k++; draw(); ($('.btn', sb) || $('.pnext .btn', pq)).focus(); });
      }
      draw();
    }
    cur = (startSkill && skills.filter(function (s) { return s.id === startSkill; })[0]) || pickWeakest();
    refreshRow();
    if (focus) return next(false);
    pq.innerHTML = '<p class="pstart">Best next: <b>' + cur.name + '</b></p><a class="btn" href="#' + id + '/practice/' + cur.id + '">Start practising</a>';
  };

  /* ---------- chapter quiz: seven questions, a hint after a wrong answer, then a second try ---------- */
  A.freshQuiz = function (ch) {
    var sk = ch.practice || [], out = [];
    for (var i = 0; out.length < 7 - Math.min(2, (ch.quiz || []).length) && sk.length; i++) { var s = sk[i % sk.length]; out.push(make(s, s.quizLevel || 2)); }
    R.some(ch.quiz || [], 7 - out.length).forEach(function (q) { out.push(q); });
    return R.shuffle(out);
  };
  A.quiz = function (box, id, ch) {
    var qs = ch.quizFresh ? A.freshQuiz(ch) : ch.quiz, st = qs.map(function () { return { tries: 0, done: false, first: false }; });
    function score() {
      var d = st.filter(function (s) { return s.done; }).length, r = st.filter(function (s) { return s.first; }).length, el = $('.qscore', box);
      if (d < qs.length) { el.textContent = d + ' of ' + qs.length + ' answered'; return; }
      el.textContent = r + ' of ' + qs.length + ' right on the first try';
      var best = A.load('best:' + id, null);
      if (!best || r > best.s) A.save('best:' + id, { s: r, n: qs.length, d: A.today() });
    }
    box.innerHTML = '<div class="qhead"><h2>Chapter quiz</h2><p class="qscore" aria-live="polite"></p></div>' +
      '<p class="qintro">' + qs.length + ' questions about the whole chapter' + (ch.quizFresh ? ', new every time' : '') + '. You get a hint after a wrong answer, then a second try.</p>';
    qs.forEach(function (q, i) {
      var d = document.createElement('div'), s = st[i];
      d.className = 'q';
      d.innerHTML = Q.html(q, i + 1) + '<div class="fb" aria-live="polite"></div>';
      box.appendChild(d);
      d._q = q; /* for the automatic checks */
      var fb = $('.fb', d), api = Q.mount($('.qkbox', d), q, function (ok) {
        if (s.done) return;
        s.tries++;
        if (!ok && s.tries < 2) { fb.className = 'fb bad'; fb.innerHTML = '<b>Not quite.</b> <span>' + (q.hint || 'Have another go.') + '</span>'; return; }
        s.done = true; s.first = ok && s.tries === 1;
        if (!ok) api.reveal();
        api.lock();
        fb.className = 'fb ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = '<b>' + (ok ? 'Correct.' : 'The answer is: ' + Q.text(q) + '.') + '</b> <span>' + (q.explain || '') + '</span>';
        score();
      });
      d._qk = api;
    });
    if (ch.quizFresh) {
      var again = document.createElement('p');
      again.className = 'qagain';
      again.innerHTML = '<button type="button" class="btn alt">New quiz</button> <span class="t2">Different questions on the same chapter.</span>';
      box.appendChild(again);
      $('button', again).addEventListener('click', function () { A.quiz(box, id, ch); box.scrollIntoView({ block: 'start' }); });
    }
    score();
  };

  /* ---------- check-up ---------- */
  function codesOf(sk) { return sk.code.split(/,\s*/); }
  function coverage() {
    var cov = A.load('cov', {}), codes = [], seen = {};
    A.allSkills().forEach(function (p) { codesOf(p.sk).forEach(function (c) { if (!seen[c]) { seen[c] = 1; codes.push(c); } }); });
    A.allTasks().forEach(function (p) { if (!seen[p.t.code]) { seen[p.t.code] = 1; codes.push(p.t.code); } });
    codes.sort(function (a, b) { return a.localeCompare(b, 'en', { numeric: true }); });
    return '<h3>Expectations checked: ' + codes.filter(function (c) { return cov[c]; }).length + ' of ' + codes.length + '</h3><p class="pg-cov">' + codes.map(function (c) {
      var v = cov[c];
      return '<span class="' + (v ? (v.ok ? 'ok' : 'part') : '') + '" title="' + (v ? 'Checked ' + v.d + (v.ok ? ', all right' : ', some to practise') : 'Not checked yet') + '">' + c + '</span>';
    }).join('') + '</p><p class="t2">Green: checked and right. Yellow: checked, some to practise. White: not checked yet.</p>' +
      (A.allTasks().length ? '<p class="t2">Speaking, reading aloud and writing are checked by a grown-up: open <b>With a grown-up</b> in a chapter and mark the activity. Those marks fill in the map too.</p>' : '');
  }
  function checkupHome(app) {
    var hist = A.load('checkups', []), built = A.built().filter(function (m) { return A.chapters[m.id].practice; });
    var h = '<div class="wrap chapter"><header class="chead"><span class="num">Assessment</span><h1>Check-up</h1><p class="lede">Find out what you know and what to practise next.</p></header>' +
      '<section class="sec cu"><h2>How it works</h2><ul>' +
      '<li>Each question is new. There are no hints and no time limit.</li>' +
      '<li>Questions start easy. A chapter check-up asks one easy question for every skill, then a few a step harder.</li>' +
      '<li>If you do not know, choose <b>"I\'m not sure yet"</b>. That is more useful than a guess.</li>' +
      '<li>At the end you see every answer and a plan for what to practise. Your practice levels change to match.</li></ul>' +
      '<div class="cuopts"><a class="btn" href="#check-up/all">Whole-grade check-up</a></div>' +
      '<h3>Check one chapter</h3><p>Doing every chapter\'s check-up checks every Grade ' + A.grade + ' expectation on this site. The map below fills in as you go.</p><div class="cuch">' +
      built.map(function (m) { return '<a class="pill" data-strand="' + m.strand + '" href="#check-up/' + m.id + '">' + m.title + '</a>'; }).join('') + '</div>' + coverage() + '</section>';
    if (hist.length) h += '<section class="sec cu"><h2>Past check-ups</h2><div class="tbl"><table><thead><tr><th>Date</th><th>What</th><th>Result</th></tr></thead><tbody>' +
      hist.slice(-10).reverse().map(function (r) { return '<tr><td>' + r.d + '</td><td>' + r.w + '</td><td>' + r.s + ' of ' + r.n + '</td></tr>'; }).join('') + '</tbody></table></div></section>';
    h += '<div class="note"><p><b>For parents and tutors.</b> Each question is tagged with the Ontario expectation it checks. A check-up is a snapshot, not a mark. Use it to choose what to practise, and repeat it after a few weeks to see growth.</p></div></div>';
    app.innerHTML = h;
  }
  A.page('check-up', function (app, scope) {
    if (!scope) return checkupHome(app);
    var pool = A.allSkills(), qs = [], label, chapterScope = scope !== 'all';
    function add(p, lv) { var q = make(p.sk, lv); q.ch = p.ch; q.sk = p.sk; qs.push(q); }
    if (!chapterScope) {
      label = 'Whole-grade check-up';
      A.built().forEach(function (m) { var mine = pool.filter(function (p) { return p.ch.id === m.id; }); if (mine.length) add(R.pick(mine), 1); });
    } else {
      var mine = pool.filter(function (p) { return p.ch.id === scope; });
      if (!mine.length) { location.hash = '#check-up'; return; }
      label = mine[0].ch.title + ' check-up';
      mine.forEach(function (p) { add(p, 1); });
      while (qs.length < 3) add(mine[qs.length % mine.length], 1);
    }
    var res = [], k = 0, stepped = false;
    function stepUp() {
      if (!chapterScope || stepped) return;
      stepped = true;
      var right = [];
      qs.forEach(function (q, i) { if (res[i].ok && right.indexOf(q.sk) < 0) right.push(q.sk); });
      R.some(right, 3).forEach(function (sk) { add(pool.filter(function (p) { return p.sk === sk; })[0], 2); });
    }
    function show() {
      var q = qs[k];
      A._q = q;
      app.innerHTML = '<div class="wrap chapter" data-strand="' + q.ch.strand + '"><p class="crumb"><a href="#check-up">Check-up</a></p>' +
        '<div class="sec cu"><div class="cuprog"><span>' + label + (q.lv > 1 ? ' &middot; a step harder' : '') + '</span><span>Question ' + (k + 1) + ' of ' + qs.length + '</span></div>' +
        '<div class="bar-h"><i style="width:' + (k / qs.length * 100) + '%"></i></div>' +
        '<p class="plv"><span class="pill">' + q.ch.title + '</span></p>' + Q.html(q) +
        '<p><button type="button" class="btn alt" id="cuskip">I\'m not sure yet</button></p></div></div>';
      function rec(given, ok) { res.push({ given: given, ok: ok }); k++; if (k === qs.length) stepUp(); if (k < qs.length) show(); else report(); }
      A._qk = Q.mount($('.qkbox', app), q, function (ok, given) { rec(given, ok); });
      A._qk.focus();
      $('#cuskip', app).addEventListener('click', function () { rec(null, false); });
    }
    function report() {
      var right = res.filter(function (r) { return r.ok; }).length, bySk = {}, order = [], cov = A.load('cov', {}), d = A.today(), hist = A.load('checkups', []);
      qs.forEach(function (q, i) {
        var key = q.sk.id;
        if (!bySk[key]) { bySk[key] = { q: q, ok: 0, n: 0, top: 0 }; order.push(key); }
        bySk[key].n++; if (res[i].ok) { bySk[key].ok++; bySk[key].top = Math.max(bySk[key].top, q.lv); }
      });
      /* practice starts where the check-up shows: a miss at level 1 gives level 1, right at level 1 gives level 2, right at level 2 gives level 3 */
      order.forEach(function (key) {
        var b = bySk[key], st = skillState(key), allOk = b.ok === b.n;
        if (!allOk) { st.lv = 1; st.secure = false; } else if (!st.secure) st.lv = Math.max(st.lv || 1, Math.min(3, b.top + 1));
        st.streak = 0; st.miss = 0; skillSave(key, st);
        codesOf(b.q.sk).forEach(function (c) { var was = cov[c] || {}; cov[c] = { d: d, ok: allOk ? 1 : 0, n: (was.n || 0) + 1 }; });
      });
      A.save('cov', cov);
      hist.push({ d: d, w: label, s: right, n: qs.length });
      A.save('checkups', hist.slice(-30));
      var todo = order.filter(function (key) { return bySk[key].ok < bySk[key].n; });
      A.save('plan', todo.slice(0, 4).map(function (key) { var q = bySk[key].q; return { ch: q.ch.id, sk: key, name: q.sk.name, t: q.ch.title }; }));
      var pct = right / qs.length;
      app.innerHTML = '<div class="wrap chapter"><p class="crumb"><a href="#check-up">Check-up</a></p><header class="chead"><span class="num">Results &middot; ' + d + '</span><h1>' + right + ' of ' + qs.length + '</h1>' +
        '<p class="lede">' + (pct >= 0.85 ? 'Strong work. Keep these skills fresh with practice now and then.' : pct >= 0.6 ? 'A solid base. The plan below shows what to work on next.' : 'This shows where to start. Work through the plan one skill at a time.') + '</p></header>' +
        '<section class="sec cu"><h2>Your plan</h2>' + (todo.length ? '<ol class="plan">' + todo.slice(0, 4).map(function (key) {
          var q = bySk[key].q;
          return '<li><a href="#' + q.ch.id + '/practice/' + key + '">Practise <b>' + q.sk.name + '</b></a> <span class="t2">(' + q.ch.title + ', ' + q.sk.code + ')</span></li>';
        }).join('') + '</ol>' : '<p>Nothing to fix. Try the Stretch level in any chapter.</p>') +
        '<p><button type="button" class="btn alt" id="cuprint">Print or save this report</button></p></section>' +
        '<section class="sec cu"><h2>Every question</h2><div class="review">' + qs.map(function (q, i) {
          var r = res[i];
          return '<div class="q"><p class="qtext"><span class="qn">' + (i + 1) + '</span>' + q.q + '</p>' + (q.fig ? '<div class="fig">' + q.fig + '</div>' : '') +
            '<p class="fb ' + (r.ok ? 'ok' : 'bad') + '"><b>' + (r.ok ? 'Correct: ' + Q.text(q) : (r.given === null ? 'Not sure yet.' : 'You said: ' + r.given + '.') + ' The answer is: ' + Q.text(q) + '.') + '</b> <span class="t2">' + q.sk.code + '</span></p></div>';
        }).join('') + '</div></section><p><a class="btn" href="#check-up">Back to check-ups</a></p></div>';
      $('#cuprint', app).addEventListener('click', function () { window.print(); });
      window.scrollTo(0, 0);
    }
    show();
  });
})();
