/* Language Atlas lessons, shared by every grade. Needs atlas.js and qkit.js.
   A chapter is a few lessons, a lesson is a few ideas, and the child sees ONE idea per screen.
   Each idea is taught in three steps, in the Direct Instruction way:
     1. Watch me    ("I do")   a one-line intro, then a worked example shown one step at a time (one step on screen), then the key idea.
     2. Together    ("we do")  guided questions with a thinking cue. A wrong answer is corrected at once, then the same
                               question is asked again, so the child ends on a right answer.
     3. On your own ("you do") quick questions with no cue. Two right on the first try marks the idea "Got it".
   Coaching notes and common mistakes are for the grown-up only (class adult-only).

   idea = { slug, title, exp: ['B3.3'], skill: 'practice-skill-id',
            intro: html, model: [html, ...], key: html,
            guided: [function () -> question, ...], check: [function () -> question, ...],
            coach: html, mistake: html }
   Routes: #chapter (lesson list), #chapter/learn/idea (step 1), #chapter/learn/idea/2, #chapter/learn/idea/3, #chapter/done/lesson (end of a lesson).
   Saved (prefix lang-gN:): cn:<grade-chapter-idea> { seen, watched, together, n, ok, got, t }.
   An idea is "Mastered" when its practice skill is secure. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$, Q = A.Q;
  var L = (A.lessons = {});
  var ST = (L.labels = ['Not started', 'Seen', 'Got it', 'Mastered']);
  var STAGES = [['Watch me', 'I show you how'], ['Together', 'We do it together'], ['On your own', 'You try it']];
  var GOT = 2; /* right on the first try this many times to mark "Got it" */

  function prep(chId) {
    var ch = A.chapters[chId];
    if (!ch || ch._prepped) return ch;
    ch.lessons.forEach(function (ls, li) {
      ls.n = li + 1;
      ls.concepts.forEach(function (c, ci) { c.id = 'g' + A.grade + '-' + chId + '-' + c.slug; c.ch = chId; c.lesson = ls; c.n = ci + 1; });
    });
    ch._prepped = true;
    return ch;
  }
  function flat(chId) {
    var ch = prep(chId), out = [];
    if (ch) ch.lessons.forEach(function (ls) { ls.concepts.forEach(function (c) { out.push(c); }); });
    return out;
  }
  L.flat = flat;
  L.cstate = function (c) { return A.load('cn:' + c.id, { seen: 0, n: 0, ok: 0, got: false }); };
  L.status = function (c) {
    var s = L.cstate(c);
    if (c.skill && A.skillStatus(c.skill).k === 4) return 3;
    return s.got ? 2 : s.seen ? 1 : 0;
  };
  /* every idea in the grade, for the progress page (and later the family page and learning plan) */
  L.all = function () {
    var out = [];
    A.built().forEach(function (m) {
      flat(m.id).forEach(function (c) { out.push({ id: c.id, title: c.title, ch: m.id, chTitle: m.title, lesson: c.lesson.title, exp: c.exp, skill: c.skill || '', status: L.status(c), href: '#' + m.id + '/learn/' + c.slug }); });
    });
    return out;
  };
  function mark(c, patch) {
    var s = L.cstate(c);
    Object.keys(patch).forEach(function (k) { s[k] = patch[k]; });
    s.t = Date.now();
    A.save('cn:' + c.id, s);
    return s;
  }
  function dot(k) { return '<span class="ls-st s' + k + '" aria-hidden="true"></span>'; }
  function legend() { return '<p class="ls-legend">' + ST.map(function (t, k) { return '<span>' + dot(k) + t + '</span>'; }).join('') + '</p>'; }
  function grownUp(c) {
    return (c.coach ? '<div class="coach adult-only"><b class="t">For grown-ups: how to coach</b>' + c.coach + '</div>' : '') +
      (c.mistake ? '<div class="mistake adult-only"><b class="t">For grown-ups: a common mistake</b>' + c.mistake + '</div>' : '');
  }

  /* ---------- the chapter page: tabs, then lessons, practice or the quiz ---------- */
  L.chapter = function (app, id, sub) {
    var ch = prep(id), ctx = A.chapterHead(id), parts = (sub || '').split('/'), tab = parts[0] || 'learn';
    var h = '<div class="wrap chapter" data-strand="' + ctx.m.strand + '"><p class="crumb"><a href="#home">All chapters</a></p>' + ctx.head +
      '<nav class="jump" aria-label="In this chapter">' + [['learn', 'Lessons', '#' + id], ['practice', 'Practise', '#' + id + '/practice'], ['quiz', 'Chapter quiz', '#' + id + '/quiz']].map(function (t) {
        return '<a href="' + t[2] + '"' + (tab === t[0] ? ' aria-current="page"' : '') + '>' + t[1] + '</a>';
      }).join('') + '<a href="#check-up/' + id + '">Check-up</a></nav>';
    /* an idea gets the whole screen: only a link back to its chapter above it */
    if (tab === 'learn' && parts[1]) return concept(app, id, parts[1], +parts[2] || 1, '<div class="wrap chapter" data-strand="' + ctx.m.strand + '"><p class="crumb"><a href="#' + id + '">&lsaquo; ' + ctx.m.title + '</a></p>');
    if (tab === 'done') return lessonEnd(app, id, parts[1], h);
    if (tab === 'practice') {
      app.innerHTML = h + '<div class="quiz prac" id="practice"></div>' + A.nextPrev(ctx) + '</div>';
      A.practice($('#practice', app), id, ch.practice, parts[1] || null);
    } else if (tab === 'quiz') {
      app.innerHTML = h + '<div class="quiz" id="quiz"></div>' + A.nextPrev(ctx) + '</div>';
      A.quiz($('#quiz', app), id, ch);
    } else overview(app, id, h, ctx);
  };
  function overview(app, id, h, ctx) {
    var ch = A.chapters[id], all = flat(id), next = all.filter(function (c) { return L.status(c) < 2; })[0] || all[0];
    var anySeen = all.some(function (c) { return L.status(c) > 0; });
    app.innerHTML = h + '<div class="ls-go"><a class="btn" href="#' + id + '/learn/' + next.slug + '">' + (anySeen ? 'Continue: ' + next.title : 'Start the first lesson') + '</a>' +
      '<span class="t2">' + ch.lessons.length + (ch.lessons.length === 1 ? ' lesson, ' : ' lessons, ') + all.length + ' ideas. One idea at a time.</span></div>' + legend() +
      '<div class="ls-map">' + ch.lessons.map(function (ls) {
        return '<section class="ls-lesson"><h2><span class="n">' + ls.n + '</span>' + ls.title + '</h2>' + (ls.sub ? '<p class="t2">' + ls.sub + '</p>' : '') +
          '<ul class="ls-cl">' + ls.concepts.map(function (c) {
            var k = L.status(c);
            return '<li><a href="#' + id + '/learn/' + c.slug + '">' + dot(k) + '<span>' + c.title + '</span><span class="sr"> (' + ST[k] + ')</span></a></li>';
          }).join('') + '</ul></section>';
      }).join('') + '</div>' +
      '<div class="note"><p><b>How each idea works.</b> First <b>watch</b> a short example, one step at a time. Then do a few <b>together</b>, with a hint to think about. ' +
      'Then try some <b>on your own</b>. Getting ' + GOT + ' right on the first try marks the idea <b>Got it</b>. It becomes <b>Mastered</b> when the matching skill in Practise is secure.</p></div>' +
      A.nextPrev(ctx) + '</div>';
  }

  /* ---------- one idea, one step of it ---------- */
  function concept(app, id, slug, stage, h) {
    var all = flat(id), i = -1;
    all.forEach(function (c, j) { if (c.slug === slug) i = j; });
    if (i < 0) { location.hash = '#' + id; return; }
    var c = all[i], ls = c.lesson, prev = all[i - 1], next = all[i + 1], base = '#' + id + '/learn/' + c.slug;
    stage = Math.min(3, Math.max(1, stage));
    var st = mark(c, { seen: 1 }), endOfLesson = !next || next.lesson !== ls;
    h += '<div class="ls-top"><span class="ls-where">Lesson ' + ls.n + ': ' + ls.title + ' &middot; idea ' + c.n + ' of ' + ls.concepts.length + '</span>' +
      '<span class="ls-dots" aria-label="Ideas in this lesson">' + ls.concepts.map(function (x) {
        return '<a href="#' + id + '/learn/' + x.slug + '" class="s' + L.status(x) + '"' + (x === c ? ' aria-current="step"' : '') + ' aria-label="' + x.title + ' (' + ST[L.status(x)] + ')"></a>';
      }).join('') + '</span></div>' +
      '<article class="sec ls-card" id="lesson"><h2><span class="n">' + ls.n + '.' + c.n + '</span>' + c.title + '<span class="ls-badge">' + (st.got ? '<span class="ls-got">Got it</span>' : '') + '</span></h2>' +
      '<p class="codes">Ontario expectation ' + c.exp.join(', ') + '</p>' +
      '<nav class="di-steps" aria-label="Steps for this idea">' + STAGES.map(function (s, k) {
        return '<a href="' + base + (k ? '/' + (k + 1) : '') + '"' + (stage === k + 1 ? ' aria-current="step"' : '') + '><i>' + (k + 1) + '</i><span>' + s[0] + '</span></a>';
      }).join('') + '</nav>' +
      '<p class="di-say">' + STAGES[stage - 1][1] + '.</p><div class="di-stage"></div>' + grownUp(c) + '</article>' +
      '<nav class="ls-nav" aria-label="Ideas">' + (prev ? '<a class="btn alt" href="#' + id + '/learn/' + prev.slug + '">&larr; Back</a>' : '<a class="btn alt" href="#' + id + '">&larr; Lessons</a>') +
      '<a class="btn ls-next" href="#' + id + (endOfLesson ? '/done/' + ls.id : '/learn/' + next.slug) + '">' + (endOfLesson ? 'Finish the lesson' : 'Next idea') + ' &rarr;</a></nav></div>';
    app.innerHTML = h;
    var box = $('.di-stage', app);
    if (stage === 1) watch(box, c, base);
    else if (stage === 2) together(box, c, base);
    else onYourOwn(box, c, function () {
      $('.ls-badge', app).innerHTML = '<span class="ls-got">Got it</span>';
      A.bump($('.ls-next', app), 'ls-ready');
      var d = $('.ls-dots [aria-current]', app); if (d) d.className = 's' + L.status(c);
    });
  }
  function goOn(href, label) { return '<p class="di-go"><a class="btn" href="' + href + '">' + label + ' &rarr;</a></p>'; }

  /* 1. Watch me: the worked example appears one step at a time */
  function watch(box, c, base) {
    var k = 0, n = c.model.length;
    box.innerHTML = (c.intro ? '<div class="ls-body">' + c.intro + '</div>' : '') + '<div class="di-model" aria-live="polite"></div><div class="di-act"></div>';
    var stepBox = $('.di-model', box), act = $('.di-act', box);
    function draw() {
      stepBox.innerHTML = '<p class="di-count"><span class="di-pips" aria-hidden="true">' + c.model.map(function (x, j) { return '<i class="' + (j <= k ? 'on' : '') + '"></i>'; }).join('') + '</span>Step ' + (k + 1) + ' of ' + n + '</p>' +
        '<div class="di-show">' + c.model[k] + '</div>';
      var last = k + 1 === n;
      if (last) mark(c, { watched: 1 });
      act.innerHTML = '<div class="di-nav">' + (k ? '<button type="button" class="btn alt di-back">&larr; Back</button>' : '<span></span>') +
        (last ? '' : '<button type="button" class="btn di-step">Next step &rarr;</button>') + '</div>' +
        (last ? (c.key ? '<div class="key"><b class="t">Key idea</b>' + c.key + '</div>' : '') + goOn(base + '/2', 'Now we do it together') : '');
      var nb = $('.di-step', act), bb = $('.di-back', act);
      if (nb) nb.addEventListener('click', function () { k++; draw(); ($('.di-step', box) || $('.di-go .btn', box)).focus(); });
      if (bb) bb.addEventListener('click', function () { k--; draw(); $('.di-step', box).focus(); });
    }
    draw();
  }

  /* 2. Together: a cue to think about, quick correction, and the same question again after a miss */
  function together(box, c, base) {
    var g = 0, n = c.guided.length;
    function show(q) {
      var tries = 0;
      box.innerHTML = '<div class="di-guided"><p class="ytl">Question ' + (g + 1) + ' of ' + n + '</p>' +
        (q.prompt ? '<p class="di-cue"><b>Think:</b> ' + q.prompt + '</p>' : '') + Q.html(q) + '<div class="fb" aria-live="polite"></div><div class="ytn"></div></div>';
      var gb = $('.di-guided', box), fb = $('.fb', box), nx = $('.ytn', box);
      var api = Q.mount($('.qkbox', box), q, function (ok) {
        tries++;
        api.lock();
        if (ok) {
          fb.className = 'fb ok';
          fb.innerHTML = '<b>' + (tries === 1 ? 'Yes.' : 'Yes. Now you have it.') + '</b> <span>' + (q.explain || '') + '</span>';
          g++;
          if (g < n) { nx.innerHTML = '<button type="button" class="btn">Next one</button>'; $('.btn', nx).addEventListener('click', function () { show(c.guided[g]()); focus(); }); }
          else { mark(c, { together: 1 }); nx.innerHTML = goOn(base + '/3', 'Now you try on your own'); }
        } else {
          api.reveal();
          fb.className = 'fb bad';
          fb.innerHTML = '<b>Here is the answer: ' + Q.text(q) + '.</b> <span>' + (q.explain || '') + '</span><p class="t2">Look at it, then try the same one again.</p>';
          nx.innerHTML = '<button type="button" class="btn">Try it again</button>';
          $('.btn', nx).addEventListener('click', function () { show(q); focus(); });
        }
        $('.btn', nx).focus();
      });
      gb._q = q; gb._qk = api; /* for the automatic checks */
    }
    function focus() { var f = $('.qkbox button:not(:disabled)', box); if (f) f.focus(); }
    show(c.guided[0]());
  }

  /* 3. On your own: no cue; a hint after the first miss, the answer and steps after the second */
  function onYourOwn(box, c, onGot) {
    var round = 0;
    function show() {
      var q = c.check[round % c.check.length](), tries = 0, done = false;
      round++;
      box.innerHTML = '<div class="ls-check">' + Q.html(q) + '<div class="fb" aria-live="polite"></div><div class="ytn"></div></div>';
      var ck = $('.ls-check', box), fb = $('.fb', box), nx = $('.ytn', box);
      function again(label) {
        nx.innerHTML = '<button type="button" class="btn' + (label === 'Another one' ? ' alt' : '') + '">' + label + '</button>';
        $('.btn', nx).addEventListener('click', function () { show(); var f = $('.qkbox button:not(:disabled)', box); if (f) f.focus(); });
      }
      var api = Q.mount($('.qkbox', box), q, function (ok) {
        if (done) return;
        tries++;
        if (ok) {
          done = true; api.lock();
          var s = L.cstate(c), first = tries === 1, was = s.got;
          s = mark(c, { n: (s.n || 0) + 1, ok: (s.ok || 0) + (first ? 1 : 0) });
          if (!s.got && s.ok >= GOT) s = mark(c, { got: true });
          fb.className = 'fb ok';
          fb.innerHTML = '<b>' + (first ? 'Yes.' : 'Yes, you fixed it.') + '</b> <span>' + (q.explain || '') + '</span>' + (!was && s.got ? '<p class="ls-got">Got it. This idea is marked on your progress page.</p>' : '');
          again('Another one');
          if (!was && s.got) onGot();
          return;
        }
        fb.className = 'fb bad';
        if (tries < 2) { fb.innerHTML = '<b>Not yet.</b> <span>' + (q.hint || 'Look at the example again.') + ' Try again.</span>'; return; }
        done = true; api.reveal(); api.lock();
        mark(c, { n: (L.cstate(c).n || 0) + 1 });
        fb.innerHTML = '<b>The answer is: ' + Q.text(q) + '.</b> <span>' + (q.explain || '') + '</span>' +
          (q.steps && q.steps.length ? '<ol class="ls-reveal">' + q.steps.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' : '') +
          '<p class="t2">You can watch the example again, then try another one.</p>';
        again('Try another one');
      });
      ck._q = q; ck._qk = api; /* for the automatic checks */
    }
    show();
  }

  /* ---------- end of a lesson: where each idea stands, and what to practise ---------- */
  function lessonEnd(app, id, lsId, h) {
    var ch = A.chapters[id], ls = ch.lessons.filter(function (x) { return x.id === lsId; })[0];
    if (!ls) { location.hash = '#' + id; return; }
    var nextLs = ch.lessons[ls.n], want = {};
    ls.concepts.forEach(function (c) { if (c.skill) want[c.skill] = 1; });
    var sk = (ch.practice || []).filter(function (s) { return want[s.id]; });
    app.innerHTML = h + '<article class="sec ls-card"><h2><span class="n">' + ls.n + '</span>Lesson ' + ls.n + ' done: ' + ls.title + '</h2>' +
      '<p>Here is where each idea stands.</p><ul class="ls-sum">' + ls.concepts.map(function (c) {
        var k = L.status(c);
        return '<li>' + dot(k) + '<a href="#' + id + '/learn/' + c.slug + '">' + c.title + '</a> <span class="t2">' + ST[k] + '</span></li>';
      }).join('') + '</ul>' +
      (sk.length ? '<p><b>Practise to make it stick.</b> A few minutes now helps you remember tomorrow.</p><div class="btnrow">' + sk.map(function (s) { return '<a class="btn alt" href="#' + id + '/practice/' + s.id + '">Practise: ' + s.name + '</a>'; }).join('') + '</div>' : '') +
      '</article><nav class="ls-nav"><a class="btn alt" href="#' + id + '">All lessons</a>' +
      (nextLs ? '<a class="btn ls-next" href="#' + id + '/learn/' + nextLs.concepts[0].slug + '">Lesson ' + nextLs.n + ': ' + nextLs.title + ' &rarr;</a>' : '<a class="btn ls-next" href="#' + id + '/quiz">Chapter quiz &rarr;</a>') +
      '</nav></div>';
  }

  /* ---------- My progress: every idea and skill, for the child and the grown-ups ---------- */
  A.page('progress', function (app) {
    var all = L.all(), cnt = [0, 0, 0, 0], skills = A.allSkills();
    all.forEach(function (c) { cnt[c.status]++; });
    var secure = skills.filter(function (p) { return A.skillStatus(p.sk.id).k === 4; }).length;
    var h = '<div class="wrap chapter"><header class="chead"><span class="num">Progress</span><h1>My progress</h1>' +
      '<p class="lede">Every idea and skill in this grade, and how far along each one is.</p></header>' +
      '<div class="pg-sum"><div><b>' + (cnt[1] + cnt[2] + cnt[3]) + ' / ' + all.length + '</b>ideas seen</div><div><b>' + (cnt[2] + cnt[3]) + '</b>ideas "Got it"</div><div><b>' + cnt[3] + '</b>ideas mastered</div>' +
      '<div><b>' + secure + ' / ' + skills.length + '</b>practice skills secure</div></div>' + legend();
    A.built().forEach(function (m, i) {
      var ch = A.chapters[m.id], cs = flat(m.id), parts = [0, 0, 0, 0];
      cs.forEach(function (c) { parts[L.status(c)]++; });
      h += '<details class="pg-ch" data-strand="' + m.strand + '" open><summary><span>' + (i + 1) + '. ' + m.title + '</span><span class="pg-bar" aria-hidden="true">' +
        [3, 2, 1].map(function (k) { return '<i class="b' + k + '" style="width:' + (parts[k] / cs.length * 100) + '%"></i>'; }).join('') + '</span><span class="t2">' +
        (parts[2] + parts[3]) + ' of ' + cs.length + ' ideas got</span></summary>' +
        '<div class="tbl"><table><thead><tr><th>Idea</th><th>Expectation</th><th>Status</th></tr></thead><tbody>' + cs.map(function (c) {
          var k = L.status(c);
          return '<tr><td><a href="#' + m.id + '/learn/' + c.slug + '">' + c.title + '</a></td><td>' + c.exp.join(', ') + '</td><td>' + dot(k) + ' ' + ST[k] + '</td></tr>';
        }).join('') + '</tbody></table></div>' +
        '<div class="tbl"><table><thead><tr><th>Practice skill</th><th>Expectation</th><th>Level</th></tr></thead><tbody>' + (ch.practice || []).map(function (s) {
          return '<tr><td><a href="#' + m.id + '/practice/' + s.id + '">' + s.name + '</a></td><td>' + s.code + '</td><td>' + A.skillStatus(s.id).t + '</td></tr>';
        }).join('') + '</tbody></table></div></details>';
    });
    app.innerHTML = h + '<div class="note"><p><b>For parents and tutors.</b> "Seen" means the idea was opened. "Got it" means ' + GOT + ' questions in "On your own" were right on the first try. ' +
      '"Mastered" means the matching practice skill reached the top level three times in a row.</p></div></div>';
  });

  /* left and right arrow keys move between ideas */
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var nav = $('.ls-nav');
    if (!nav) return;
    var a = e.key === 'ArrowRight' ? $('.ls-next', nav) : $('a.alt', nav);
    if (a) location.hash = a.getAttribute('href');
  });
})();
