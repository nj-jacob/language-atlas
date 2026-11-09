/* Language Atlas worksheets: printable sheets made from a chapter's own lessons, practice and activities, shared by every grade.
   Needs atlas.js, qkit.js, words.js, lesson.js and tasks.js. The themes are in sheet-themes.js, the look in sheets.css.

   A chapter gets a Worksheets tab (grown-up view only) when its grade has gradeN/sheets/<chapter>.js:
     Atlas.sheets.register('sentences', { code: 'SE', ideas: { <idea slug>: { goal: 'I can ...', think: [item, ...] }, ... } });
   code: two letters for the sheet number (G3-SE-02-P1-LK: grade, chapter, idea, kind, theme).
   goal: the "I can" line under the title. think: the Think sheet's questions, written by hand: a question from qkit.js (with meta.k
   and an answer check, like any other) or an open question { q, fig, lines: 3, key: 'a good answer' } that a grown-up marks.

   Every idea of a registered chapter gets five sheets, from most help to least:
     Learn       the idea's "Watch me" steps, its "Together" questions (with their thinking cue) and its "On your own" questions
     Practise 1, 2, 3   the idea's own practice skill at level 1, 2 and 3, in all its ways of asking
     Think       the hand-written questions above
   and the chapter adds an Activity sheet for each activity with a grown-up (its rubric is on the answer key) and a Read sheet
   for each "Read and answer" passage. Nothing is written twice: the sheets ask the same questions as the site, made with a
   fixed seed, so a sheet always prints the same, and the checks re-check every printed answer with tests/verify/.

   On paper: pick one and tap become "circle", put in order becomes "number them", match becomes "write the letter", build a word
   becomes "write the word", and a sentence to tap in a passage becomes "write its number". A sheet keeps to one passage, printed
   once at the top with its sentences numbered. Questions fill the page in two columns and stop when the page is full.
   Routes: #chapter/sheets (the list), #chapter/sheets/<idea>/<kind>, #chapter/sheets/task/<id>, #chapter/sheets/read/<n>. */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.lessons || !A.Q || !A.tasks) return;
  var $ = A.$, $$ = A.$$, Q = A.Q;
  var S = (A.sheets = { chapters: {}, themes: [] });
  var KINDS = (S.kinds = [['learn', 'Learn', 'L'], ['p1', 'Practise 1', 'P1'], ['p2', 'Practise 2', 'P2'], ['p3', 'Practise 3', 'P3'], ['think', 'Think', 'T']]);
  var MOST = 14; /* the most questions a sheet tries to fit */

  S.register = function (id, def) { S.chapters[id] = def; };
  S.theme = function (th) { S.themes.push(th); };
  S.has = function (id) { return !!(S.chapters[id] && A.chapters[id]); };
  S.themeById = function (id) { return S.themes.filter(function (t) { return t.id === id; })[0] || S.themes[0]; };

  /* ---------- small helpers ---------- */
  function strip(h) { var d = document.createElement('div'); d.innerHTML = String(h == null ? '' : h); return (d.textContent || '').replace(/\s+/g, ' ').trim(); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function kindOf(k) { return KINDS.filter(function (x) { return x[0] === k; })[0]; }
  function idea(chId, slug) { return A.lessons.flat(chId).filter(function (c) { return c.slug === slug; })[0]; }
  function skillOf(chId, id) { return (A.chapters[chId].practice || []).filter(function (s) { return s.id === id; })[0]; }
  /* a fixed seed for each sheet, so it always prints the same questions */
  function seedOf(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(a) {
    return function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function seeded(key, fn) {
    var keep = Math.random;
    Math.random = rng(seedOf(key));
    Q.resetShapes();
    try { return fn(); } finally { Math.random = keep; }
  }
  function sig(q) { return [q.q, q.fig || '', q.pic || '', q.type ? Q.text(q) : ''].join('|'); }

  /* ---------- one passage per sheet ----------
     A reading question shows its passage. On paper the passage is printed once at the top, so each question names the passage
     it needs (its text, as a key) and the sheet keeps only questions about the same one. */
  function passageOf(q) {
    var d = document.createElement('div');
    d.innerHTML = (q.fig || '') + (q.type === 'tap' && q.pic ? q.pic : '');
    var p = d.querySelector('.psg');
    return p ? { key: strip(p.innerHTML), html: p.outerHTML.replace(/ data-hit="\d+"/g, '').replace(' psg-tap', '') } : null;
  }
  /* the question without its passage; a sentence to tap in the passage becomes "write its number" */
  function paperize(q, passage) {
    var c = {};
    Object.keys(q).forEach(function (k) { c[k] = q[k]; });
    if (!passage) return c;
    var d = document.createElement('div');
    d.innerHTML = c.fig || '';
    $$('.psg', d).forEach(function (p) { p.parentNode.removeChild(p); });
    c.fig = d.innerHTML.trim();
    if (c.type === 'tap' && c.pic && /class="psg/.test(c.pic)) {
      d.innerHTML = c.pic;
      var ps = $$('.ps', d), want = [].concat(c.answer).map(String);
      c.num = ps.map(function (p, i) { return want.indexOf(p.getAttribute('data-hit')) >= 0 ? i + 1 : 0; }).filter(Boolean);
    }
    return c;
  }
  /* the sheet's passage is the one given (want) or the first one met; questions about it come first, without it.
     A question about another passage keeps its own, printed with it. A passage only goes to the top when at least
     least questions are about it (or it was given), so a sheet of varied texts keeps each text with its question. */
  function onePassage(list, want, least) {
    var chosen = null, mine = [], other = [];
    list.forEach(function (q) { var p = passageOf(q); if (p && !chosen && (!want || p.key === want)) chosen = p; });
    var n = chosen ? list.filter(function (q) { var p = passageOf(q); return p && p.key === chosen.key; }).length : 0;
    if (chosen && !want && n < (least || 1)) chosen = null;
    list.forEach(function (q) {
      var p = passageOf(q);
      if (!p || (chosen && p.key === chosen.key)) mine.push(paperize(q, p)); else other.push(paperize(q, null));
    });
    return { items: mine.concat(other), passage: chosen };
  }

  /* ---------- what is on a sheet ---------- */
  /* every sheet of a chapter: { kind, id, title } */
  S.list = function (chId) {
    var ch = A.chapters[chId], def = S.chapters[chId], out = [];
    A.lessons.flat(chId).forEach(function (c) {
      KINDS.forEach(function (k) {
        if (k[0] === 'think' && !(def.ideas[c.slug] && def.ideas[c.slug].think)) return;
        if (k[0] !== 'learn' && k[0] !== 'think' && !skillOf(chId, c.skill)) return;
        out.push({ kind: k[0], id: c.slug, title: c.title });
      });
    });
    (ch.tasks || []).forEach(function (t) { out.push({ kind: 'task', id: t.id, title: t.title }); });
    if (ch.read) ch.read.texts.forEach(function (t, i) { out.push({ kind: 'read', id: String(i + 1), title: t.title }); });
    return out;
  };
  S.code = function (chId, kind, id, th) {
    var def = S.chapters[chId], all = S.list(chId), n;
    if (kind === 'task') n = 'A' + (A.chapters[chId].tasks.map(function (t) { return t.id; }).indexOf(id) + 1);
    else if (kind === 'read') n = 'R' + id;
    else n = ('0' + (A.lessons.flat(chId).map(function (c) { return c.slug; }).indexOf(id) + 1)).slice(-2) + '-' + kindOf(kind)[2];
    return 'G' + A.grade + '-' + def.code + '-' + n + (th ? '-' + th.id : '') + (all ? '' : '');
  };
  /* the sheet's content: its title, the "Watch me" steps or passage, and its questions in groups, in the order they are tried */
  S.sheet = function (chId, kind, id) {
    var ch = A.chapters[chId], def = S.chapters[chId], key = 'g' + A.grade + ':' + chId + ':' + kind + ':' + id;
    return seeded(key, function () {
      if (kind === 'task') {
        var t = (ch.tasks || []).filter(function (x) { return x.id === id; })[0];
        return { kind: kind, title: t.title, goal: strip(t.say), task: t, codes: [t.code], groups: [] };
      }
      if (kind === 'read') {
        var p = ch.read.texts[+id - 1], r = onePassage(ch.read.ask(p).map(function (q) { if (!q.fig) q.fig = ch.read.show(p); return q; }));
        return { kind: kind, title: p.title, goal: 'Read, then answer.', passage: r.passage, groups: [{ items: r.items }], codes: codesOf(r.items) };
      }
      var c = idea(chId, id), mine = def.ideas[id] || {}, sk = skillOf(chId, c.skill), out = { kind: kind, title: c.title, goal: mine.goal || '', idea: c, codes: c.exp.slice() };
      if (kind === 'learn') {
        /* a passage in the "Watch me" steps is printed once, before them, and the questions are about it too when they can be */
        var inSteps = null, seen = {};
        out.steps = c.model.map(function (st) { var p = passageOf({ fig: st }); if (p) { inSteps = inSteps || p; return paperize({ fig: st }, p).fig || 'Read the text.'; } return st; });
        var want = inSteps && inSteps.key;
        /* each question maker is tried until it makes a new question (about the steps' passage, when they have one) */
        function about(f) {
          for (var i = 0; i < 40; i++) {
            var q = f(), p = passageOf(q);
            if (seen[sig(q)] || (p && want && p.key !== want && i < 39)) continue;
            seen[sig(q)] = 1;
            return q;
          }
          return null;
        }
        var tog = onePassage(c.guided.map(about).filter(Boolean), want, 9), own = onePassage(c.check.map(about).filter(Boolean), want, 9);
        out.passage = inSteps || tog.passage || own.passage;
        out.passageFirst = !!inSteps;
        out.tip = c.key || '';
        out.groups = [{ label: 'Together', cue: true, items: tog.items }, { label: 'On your own', items: own.items }];
        return out;
      }
      if (kind === 'think') {
        var th = onePassage(mine.think.map(function (it) { return typeof it === 'function' ? it() : it; }));
        out.passage = th.passage;
        out.groups = [{ items: th.items }];
        return out;
      }
      var lv = +kind.slice(1), seen = {}, made = [];
      for (var n = 0; n < 60 && made.length < MOST * 3; n++) { var q = sk.gen(lv), s = sig(q); if (!seen[s]) { seen[s] = 1; made.push(q); } }
      /* the passage most of the questions are about */
      var count = {}, best = null;
      made.forEach(function (q) { var p = passageOf(q); if (p) { count[p.key] = (count[p.key] || 0) + 1; if (!best || count[p.key] > count[best]) best = p.key; } });
      var pr = onePassage(made, count[best] >= 3 ? best : null, 3);
      out.passage = pr.passage;
      out.groups = [{ items: pr.items.slice(0, MOST) }];
      if (sk.code && out.codes.indexOf(sk.code) < 0) out.codes.push(sk.code);
      return out;
    });
  };
  function codesOf(items) { var out = []; items.forEach(function (q) { if (q.code && out.indexOf(q.code) < 0) out.push(q.code); }); return out; }
  /* every expectation code the chapter's sheets teach (the checks compare this with the grade's list) */
  S.codes = function (chId) {
    var ch = A.chapters[chId], out = {};
    A.lessons.flat(chId).forEach(function (c) { c.exp.forEach(function (x) { out[x] = 1; }); var sk = skillOf(chId, c.skill); if (sk && sk.code) out[sk.code] = 1; });
    (ch.tasks || []).forEach(function (t) { out[t.code] = 1; });
    return Object.keys(out);
  };

  /* ---------- drawing a question on paper ---------- */
  var LETTERS = 'ABCDEFGHIJ';
  function paperWords(s) {
    return String(s).replace(/\bTap\b/g, 'Circle').replace(/\btap\b/g, 'circle').replace(/\bPick\b/g, 'Circle').replace(/\bpick\b/g, 'circle');
  }
  function opts(list, right, key) {
    return '<div class="ws-opts">' + list.map(function (o, i) { return '<span class="ws-opt' + (key && right.indexOf(i) >= 0 ? ' ws-on' : '') + '">' + o + '</span>'; }).join('') + '</div>';
  }
  function blank(text, key, cls) { return '<span class="ws-blank' + (cls ? ' ' + cls : '') + '">' + (key ? '<span class="ws-ans">' + text + '</span>' : '') + '</span>'; }
  function len(list) { return list.reduce(function (n, x) { return n + strip(x).length; }, 0); }
  /* a question takes both columns when it is wide: a passage or chain, matching, long choices, or lines to write on */
  function wide(q) {
    if (q.wide || q.lines || q.type === 'match') return true;
    if (/class="(psg|wchain|wweb)/.test((q.fig || '') + (q.pic || ''))) return true;
    var list = q.options || q.tiles || q.items || q.parts || (q.why ? q.why.options : []);
    return len(list) > 64 || (q.why && len(q.why.options) > 40) || strip(q.fig).length > 70;
  }
  function body(q, key) {
    var h = '', more = '';
    switch (q.type) {
      case 'mc': h = opts(q.options, [q.answer], key); break;
      case 'tap':
        if (q.num) { more = 'Write its number.'; h = '<p class="ws-row">Sentence ' + blank(q.num.join(' or '), key, 'ws-short') + '</p>'; }
        else if (q.tiles) h = opts(q.tiles, [q.answer], key);
        else {
          var d = document.createElement('div'), want = [].concat(q.answer).map(String);
          d.innerHTML = q.pic;
          if (key) $$('[data-hit]', d).forEach(function (n) { if (want.indexOf(n.getAttribute('data-hit')) >= 0) n.classList.add('ws-on'); });
          h = '<div class="ws-pic">' + d.innerHTML + '</div>';
        }
        break;
      case 'pick': h = opts(q.options, q.answer, key); break;
      case 'order':
        more = 'Number them in order' + (q.first ? ', from ' + q.first + ' to ' + q.last : '') + '.';
        h = '<ol class="ws-order">' + q.mix.map(function (k) { return '<li>' + blank(k + 1, key, 'ws-box') + '<span>' + q.items[k] + '</span></li>'; }).join('') + '</ol>';
        break;
      case 'build':
        more = 'Write the word.';
        h = '<div class="ws-opts ws-parts">' + q.parts.map(function (p) { return '<span class="ws-part">' + p + '</span>'; }).join('') + '</div><p class="ws-row">' + blank(Q.text(q), key, 'ws-word') + '</p>';
        break;
      case 'match':
        more = 'Write the letter.';
        h = '<div class="ws-match"><ol>' + q.pairs.map(function (p, i) { return '<li><span>' + p[0] + '</span>' + blank(LETTERS[q.mix.indexOf(i)], key, 'ws-short') + '</li>'; }).join('') + '</ol>' +
          '<ul>' + q.mix.map(function (k, j) { return '<li><b>' + LETTERS[j] + '</b><span>' + q.pairs[k][1] + '</span></li>'; }).join('') + '</ul></div>';
        break;
      case 'tf':
        h = opts(['True', 'False'], [q.answer ? 0 : 1], key) + (q.why ? '<p class="ws-why">Why?</p>' + opts(q.why.options, [q.why.answer], key) : '');
        break;
      default:
        if (q.lines) h = '<div class="ws-lines" style="height:' + q.lines * 30 + 'px">' + (key && q.key ? '<p class="ws-ans">' + q.key + '</p>' : '') + '</div>';
    }
    return { h: h, more: more };
  }
  function item(q, n, key, cue) {
    var b = body(q, key);
    return '<div class="ws-q' + (wide(q) ? ' ws-wide' : '') + '"><span class="ws-n">' + n + '</span>' +
      '<p class="ws-qt">' + paperWords(q.num ? q.q.replace(/^Tap/, 'Find') : q.q) + (b.more ? ' <span class="ws-more">' + b.more + '</span>' : '') + '</p>' +
      (cue && q.prompt ? '<p class="ws-cue">Think: ' + paperWords(q.prompt) + '</p>' : '') + (q.fig ? '<div class="ws-fig">' + q.fig + '</div>' : '') + b.h + '</div>';
  }
  /* the paper-only order of cards to number and right-hand cards to match, fixed by the sheet's seed */
  function prepare(sh, seedKey) {
    seeded(seedKey + ':mix', function () {
      sh.groups.forEach(function (g) { g.items.forEach(function (q) { if (q.type === 'order') q.mix = Q.mixed(q.items.length); if (q.type === 'match') q.mix = Q.mixed(q.pairs.length); }); });
    });
    return sh;
  }

  /* ---------- a whole page ---------- */
  function head(sh, chId, th, key) {
    var m = A.meta.filter(function (x) { return x.id === chId; })[0], kd = sh.kind === 'task' ? 'Activity' : sh.kind === 'read' ? 'Read' : kindOf(sh.kind)[1];
    return '<header class="ws-head"><p class="ws-kick"><svg viewBox="0 0 56 56" aria-hidden="true">' + th.mark + '</svg>' + esc(m.title + ' · ' + kd + (key ? ' · answer key' : '')) + '</p>' +
      '<div class="ws-title">' + sh.title + '</div>' + (sh.goal ? '<p class="ws-goal">' + esc(sh.goal) + '</p>' : '') +
      (key ? '' : '<div class="ws-name"><span>Name</span><i></i><span>Date</span><i></i></div>') + '</header>';
  }
  function band(sh) {
    var h = '', psg = sh.passage ? '<section class="ws-psg' + (sh.groups.some(function (g) { return g.items.some(function (q) { return q.num; }); }) ? ' ws-numbered' : '') + '">' + sh.passage.html + '</section>' : '';
    if (sh.passageFirst) h += psg;
    if (sh.steps) h += '<section class="ws-band"><p class="ws-label">Watch me</p><ol class="ws-steps">' + sh.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' +
      (sh.tip ? '<p class="ws-tip"><b>Remember</b> ' + sh.tip + '</p>' : '') + '</section>';
    if (!sh.passageFirst) h += psg;
    return h;
  }
  function task(t, key) {
    if (key) {
      return '<section class="ws-run"><p class="ws-label">How to run it</p><ol>' + t.run.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' + (t.coach ? '<div class="ws-coach">' + t.coach + '</div>' : '') + '</section>' +
        '<section class="ws-rubric"><p class="ws-label">Mark it</p><table><tbody>' + t.rubric.map(function (r, j) { return '<tr><th>' + A.tasks.levels[j] + '</th><td>' + r + '</td><td class="ws-tick"></td></tr>'; }).join('') + '</tbody></table></section>';
    }
    return '<section class="ws-task"><span class="ws-tpic">' + t.pic + '</span><p>' + t.say + '</p></section>' + (t.text ? '<div class="ws-fig">' + t.text + '</div>' : '') +
      '<p class="ws-label">' + (t.write ? 'Write here' : 'My notes') + '</p><div class="ws-fill"></div>';
  }
  function foot(sh, th, key, n, code) {
    var h = '<footer class="ws-foot">';
    if (key && sh.kind !== 'task') {
      var watch = sh.idea ? strip(sh.idea.mistake || sh.idea.coach || '') : '';
      h += '<div class="ws-watch">' + (watch ? '<p class="ws-label">Watch for</p><p>' + esc(watch) + '</p>' : '') + '</div>' +
        '<div class="ws-score"><p class="ws-label">Ontario</p><p>' + sh.codes.join(', ') + '</p>' + (n ? '<p>Score ____ of <span class="ws-of"></span></p>' : '') + '</div>';
    } else if (key) h += '<div class="ws-watch"></div><div class="ws-score"><p class="ws-label">Ontario</p><p>' + sh.codes.join(', ') + '</p></div>';
    else h += '<p class="ws-feel"><b>How did it feel?</b>' + ['I could explain it', 'One more go', 'I need help'].map(function (f) { return '<span><i></i>' + f + '</span>'; }).join('') + '</p>';
    return h + '<p class="ws-line"><span>Language Atlas · Grade ' + A.grade + ' · ' + esc(th.name) + '</span><span>' + code + '</span></p></footer>';
  }
  function over(el) { return el.scrollHeight > el.clientHeight + 1; }
  /* Draw one sheet into el (a .ws-sheet box). The questions fill the page in order and stop when it is full; a question that does
     not fit is left out. use: which questions to draw (the student page's 'at', for its answer key).
     Returns the questions drawn (items), where they are in the sheet's groups (at), and whether anything runs off the page (over). */
  S.render = function (el, chId, kind, id, themeId, key, use) {
    var th = S.themeById(themeId), sh = prepare(S.sheet(chId, kind, id), 'g' + A.grade + ':' + chId + ':' + kind + ':' + id), code = S.code(chId, kind, id, th);
    el.innerHTML = '<div class="ws-page' + (key ? ' ws-key' : '') + '" style="--acc:' + th.acc + ';--face:' + th.font.replace(/"/g, "'") + '">' + (th.frame ? '<svg class="ws-frame" viewBox="0 0 816 1056" aria-hidden="true">' + th.frame() + '</svg>' : '') +
      head(sh, chId, th, key) + '<div class="ws-body">' + band(sh) + (sh.task ? task(sh.task, key) : '') + '</div>' + foot(sh, th, key, sh.groups.length, code) + '</div>';
    var page = $('.ws-page', el), bd = $('.ws-body', page), n = 1, drawn = [], at = [];
    sh.groups.forEach(function (g, gi) {
      var sec = document.createElement('section');
      sec.className = 'ws-sec';
      sec.innerHTML = (g.label ? '<p class="ws-label">' + g.label + '</p>' : '') + '<div class="ws-grid"></div>';
      bd.appendChild(sec);
      var grid = $('.ws-grid', sec), any = false;
      g.items.forEach(function (q, ii) {
        if (use && use.indexOf(gi + ':' + ii) < 0) return;
        if (!use && drawn.length >= MOST) return;
        var box = document.createElement('div');
        box.innerHTML = item(q, n, key, g.cue);
        var it = box.firstChild;
        grid.appendChild(it);
        if (!use && over(bd)) { grid.removeChild(it); return; }
        drawn.push(q); at.push(gi + ':' + ii); n++; any = true;
      });
      if (!any) bd.removeChild(sec);
    });
    var marked = drawn.filter(function (q) { return q.type; }).length, of = $('.ws-of', page);
    if (of) { if (marked) of.textContent = marked; else of.parentNode.parentNode.removeChild(of.parentNode); }
    page.setAttribute('data-code', code);
    return { items: drawn, at: at, sheet: sh, over: over(bd), code: code };
  };

  /* ---------- the Worksheets tab (grown-up view) ---------- */
  function pref(k, v) { try { if (v === undefined) return localStorage.getItem('atlas:sheet-' + k); localStorage.setItem('atlas:sheet-' + k, v); } catch (e) { return null; } return v; }
  S.fontList = function () { return ['400 15px ' + "'Atkinson Hyperlegible'", '700 15px ' + "'Atkinson Hyperlegible'"].concat(S.themes.map(function (t) { return '700 30px ' + t.font; })); };
  function fonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var wait = Promise.all(S.fontList().map(function (f) { return document.fonts.load(f).catch(function () {}); }));
    return Promise.race([wait, new Promise(function (r) { setTimeout(r, 1500); })]);
  }
  /* a sheet is drawn at full size (816 by 1056, US Letter at 96 per inch) and scaled to fit the screen */
  function fit() { $$('.ws-sheet').forEach(function (s) { s.style.setProperty('--s', s.clientWidth / 816); }); }
  window.addEventListener('resize', fit);
  /* printing shows only the sheets, and only on a sheet's own page */
  window.addEventListener('hashchange', function () { if (!/\/sheets\/./.test(location.hash)) document.documentElement.classList.remove('ws-print'); });
  function chips(th) {
    return '<div class="ws-themes" role="radiogroup" aria-label="Theme">' + S.themes.map(function (t) {
      return '<button type="button" role="radio" class="ws-chip" data-th="' + t.id + '" aria-checked="' + (t.id === th.id) + '"><svg viewBox="0 0 56 56" aria-hidden="true">' + t.mark + '</svg>' + t.name + '</button>';
    }).join('') + '</div>';
  }
  function wire(app, redraw) {
    $$('.ws-chip', app).forEach(function (b) { b.addEventListener('click', function () { pref('theme', b.getAttribute('data-th')); redraw(); }); });
    var k = $('#ws-key', app);
    if (k) k.addEventListener('change', function () { pref('key', k.checked ? '1' : '0'); redraw(); });
  }
  function link(chId, s) { return '#' + chId + '/sheets/' + (s.kind === 'task' || s.kind === 'read' ? s.kind + '/' + s.id : s.id + '/' + s.kind); }
  S.view = function (app, chId, rest, h) {
    var th = S.themeById(pref('theme')), base = '#' + chId + '/sheets', all = S.list(chId);
    var redraw = function () { S.view(app, chId, rest, h); };
    var pick = rest[0] === 'task' || rest[0] === 'read' ? { kind: rest[0], id: rest[1] } : rest[0] ? { kind: rest[1] || 'learn', id: rest[0] } : null;
    if (pick && !all.some(function (s) { return s.kind === pick.kind && s.id === pick.id; })) pick = null;
    document.documentElement.classList.toggle('ws-print', !!pick);
    if (pick) return preview(app, chId, pick, th, h, redraw, all);
    var out = h + '<div class="ws-ui ws-adult"><p class="ws-lede">Print a sheet for one idea. Learn teaches it step by step, Practise 1 to 3 go from more help to less, and Think asks for reasoning. ' +
      'Activities and Read sheets are at the end. The level is only in the sheet number, never on the page.</p>' + chips(th) + '</div>';
    A.chapters[chId].lessons.forEach(function (ls) {
      out += '<section class="ws-lesson ws-adult"><h2>' + ls.title + '</h2><ul class="ws-list">' + ls.concepts.map(function (c) {
        return '<li><span class="ws-idea">' + c.title + '</span><span class="ws-kinds">' + all.filter(function (s) { return s.id === c.slug && s.kind !== 'task' && s.kind !== 'read'; }).map(function (s) {
          return '<a class="ws-k" href="' + link(chId, s) + '">' + kindOf(s.kind)[1] + '</a>';
        }).join('') + '</span></li>';
      }).join('') + '</ul></section>';
    });
    [['task', 'Activities with a grown-up'], ['read', 'Read and answer']].forEach(function (g) {
      var rows = all.filter(function (s) { return s.kind === g[0]; });
      if (rows.length) out += '<section class="ws-lesson ws-adult"><h2>' + g[1] + '</h2><ul class="ws-list">' + rows.map(function (s) { return '<li><a class="ws-idea" href="' + link(chId, s) + '">' + s.title + '</a></li>'; }).join('') + '</ul></section>';
    });
    app.innerHTML = out + '<p class="t2 ws-child">Worksheets are for grown-ups. Turn on grown-up view to see them.</p></div>';
    wire(app, redraw);
  };
  function preview(app, chId, pick, th, h, redraw, all) {
    var base = '#' + chId + '/sheets', key = pref('key') !== '0', title = all.filter(function (s) { return s.id === pick.id && s.kind === pick.kind; })[0].title;
    var tabs = pick.kind === 'task' || pick.kind === 'read' ? '' : '<div class="ws-kinds">' + all.filter(function (s) { return s.id === pick.id && s.kind !== 'task' && s.kind !== 'read'; }).map(function (s) {
      return '<a class="ws-k" href="' + link(chId, s) + '"' + (s.kind === pick.kind ? ' aria-current="page"' : '') + '>' + kindOf(s.kind)[1] + '</a>';
    }).join('') + '</div>';
    app.innerHTML = h + '<div class="ws-ui ws-adult"><p class="crumb"><a href="' + base + '">All worksheets</a></p><h2 class="ws-h">' + title + '</h2>' + tabs + chips(th) +
      '<label class="ws-keyt"><input type="checkbox" id="ws-key"' + (key ? ' checked' : '') + '> Answer key as page 2</label>' +
      '<p><button type="button" class="btn" id="ws-print">Print or save as PDF</button></p><p class="ws-hint">On an iPad, tap Print, then Share, then Save to Files to keep a PDF.</p></div>' +
      '<div class="ws-pages ws-adult"><div class="ws-sheet"></div>' + (key ? '<div class="ws-sheet"></div>' : '') + '</div><p class="t2 ws-child">Worksheets are for grown-ups. Turn on grown-up view to see them.</p></div>';
    wire(app, redraw);
    $('#ws-print', app).addEventListener('click', function () { window.print(); });
    return fonts().then(function () {
      var boxes = $$('.ws-sheet', app), r = S.render(boxes[0], chId, pick.kind, pick.id, th.id, false);
      if (boxes[1]) S.render(boxes[1], chId, pick.kind, pick.id, th.id, true, r.at);
      fit();
    });
  }
})();
