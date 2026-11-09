/* Language Atlas question kit: the ways a child can answer, shared by every grade. Needs atlas.js (Atlas) first.
   Every question has q (the question), type, and optionally fig, hint, steps, explain, prompt (a thinking cue for "Together").
     mc     pick one answer.            options: [html], answer: index
     tap    tap one tile or part.       tiles: [html, ...] and answer: index, OR pic: svg/html whose parts carry data-hit="key" and answer: key.
                                        answerText: words for the reveal.
     pick   pick every answer that fits. options: [html], answer: [indexes] (never all of them)
     order  put in order.               items: [html] IN THE RIGHT ORDER (shown mixed up); first/last: labels
     build  build a word from parts.    parts: [html, ...] (shown as tiles, including some that are not needed), answer: [indexes in order]
     match  match pairs.                pairs: [[left, right], ...] (right side shown mixed up)
     tf     true or false, then why.    answer: true/false, why: { options: [...], answer: index }
   Atlas.Q.mount(el, q, cb) draws the answer area. cb(ok, givenText) runs when the child commits an answer.
   It returns { lock(), reveal(), focus() }. Atlas.Q.html(q) gives the question's markup with an empty .qkbox to mount in.
   Atlas.Q.text(q) gives the right answer in words.
   Atlas.Q.vary(id, lv, list) picks a question shape for a skill: list = [[minLevel, shapeName, fn(lv)], ...].
   Atlas.Q.shapes(chapterId, SHAPES) wires a chapter's shapes into all its practice skills.
   Atlas.Q.one, Atlas.Q.tiles and Atlas.Q.all make the common types quickly (see below).
   See docs/QUESTIONS.md. */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A) return;
  var $ = A.$, $$ = A.$$;
  var Q = (A.Q = {});
  var TYPES = { mc: 1, tap: 1, pick: 1, order: 1, build: 1, match: 1, tf: 1 };
  Q.has = function (q) { return !!(q && TYPES[q.type]); };
  function strip(h) { var d = document.createElement('div'); d.innerHTML = String(h); return (d.textContent || '').replace(/\s+/g, ' ').trim(); }
  var shuffle = A.R.shuffle, bump = function (el) { A.bump(el, 'qk-shake'); };
  /* shuffle, but never leave a list in its right order (that would give the answer away) */
  function mixed(n) {
    var idx = [], i;
    for (i = 0; i < n; i++) idx.push(i);
    if (n < 2) return idx;
    for (var t = 0; t < 20; t++) { var s = shuffle(idx); for (i = 0; i < n; i++) if (s[i] !== i) return s; }
    return idx.slice(1).concat([0]);
  }
  Q.mixed = mixed;

  Q.text = function (q) {
    switch (q.type) {
      case 'mc': return strip(q.options[q.answer]);
      case 'tap': return q.answerText || (q.tiles ? strip(q.tiles[q.answer]) : String(q.answer));
      case 'pick': return q.answer.map(function (i) { return strip(q.options[i]); }).join(', ');
      case 'order': return q.items.map(strip).join(', ');
      case 'build': return q.answer.map(function (i) { return strip(q.parts[i]); }).join('');
      case 'match': return q.pairs.map(function (p) { return strip(p[0]) + ' with ' + strip(p[1]); }).join('; ');
      case 'tf': return (q.answer ? 'True' : 'False') + (q.why ? '. ' + strip(q.why.options[q.why.answer]) : '');
    }
    return '';
  };
  /* the question, its picture, and an empty answer area for Q.mount. num: an optional question number. */
  Q.html = function (q, num) {
    return '<p class="qtext">' + (num ? '<span class="qn">' + num + '</span>' : '') + q.q + '</p>' + (q.fig ? '<div class="fig">' + q.fig + '</div>' : '') + '<div class="qkbox"></div>';
  };
  function checkBtn(label) { return '<div class="qk-act"><button type="button" class="btn qk-go">' + (label || 'Check') + '</button><span class="qk-msg" aria-live="polite"></span></div>'; }

  Q.mount = function (el, q, cb) {
    el.classList.add('qk', 'qk-' + q.type);
    var api = { locked: false, lock: function () { api.locked = true; $$('button, input', el).forEach(function (b) { b.disabled = true; }); el.classList.add('qk-done'); }, reveal: function () {}, focus: function () { var f = $('button:not(:disabled), input', el); if (f) f.focus(); } };
    function msg(t) { var m = $('.qk-msg', el); if (m) m.textContent = t || ''; }
    var mk = MAKERS[q.type];
    mk(el, q, function (ok, given) { if (!api.locked) cb(ok, given); }, api, msg);
    return api;
  };

  var MAKERS = {
    /* ---------- pick one ---------- */
    mc: function (el, q, cb, api) {
      el.innerHTML = '<div class="opts">' + q.options.map(function (o, j) { return '<button type="button" class="opt" data-j="' + j + '">' + o + '</button>'; }).join('') + '</div>';
      $$('.opt', el).forEach(function (b) {
        b.addEventListener('click', function () {
          if (api.locked) return;
          var j = +b.getAttribute('data-j'), ok = j === q.answer;
          b.classList.add(ok ? 'qk-yes' : 'qk-no');
          if (!ok) { b.disabled = true; bump(b); }
          cb(ok, strip(q.options[j]));
        });
      });
      api.reveal = function () { $$('.opt', el)[q.answer].classList.add('qk-yes'); };
    },

    /* ---------- tap on the picture ---------- */
    tap: function (el, q, cb, api) {
      var tiles = !!q.tiles;
      el.innerHTML = tiles ? '<div class="qk-tiles">' + q.tiles.map(function (t, i) { return '<button type="button" class="qk-tile" data-hit="' + i + '">' + t + '</button>'; }).join('') + '</div>'
        : '<div class="qk-pic">' + q.pic + '</div>';
      var keyOf = function (n) { return tiles ? +n.getAttribute('data-hit') : n.getAttribute('data-hit'); };
      function isRight(k) { return [].concat(q.answer).some(function (a) { return String(a) === String(k); }); }
      $$('[data-hit]', el).forEach(function (n) {
        n.classList.add('qk-hit');
        if (!tiles) { n.setAttribute('tabindex', '0'); n.setAttribute('role', 'button'); }
        function go() {
          if (api.locked || n.classList.contains('qk-no')) return;
          var k = keyOf(n), ok = isRight(k);
          n.classList.add(ok ? 'qk-yes' : 'qk-no');
          cb(ok, n.getAttribute('aria-label') || strip(n.textContent) || String(k));
        }
        n.addEventListener('click', go);
        if (!tiles) n.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
      });
      api.reveal = function () { $$('[data-hit]', el).forEach(function (n) { if (isRight(keyOf(n))) n.classList.add('qk-yes'); }); };
    },

    /* ---------- pick all that apply ---------- */
    pick: function (el, q, cb, api, msg) {
      el.innerHTML = '<p class="qk-tip">Pick every answer that fits, then press Check.</p><div class="opts">' + q.options.map(function (o, j) { return '<button type="button" class="opt qk-tg" aria-pressed="false" data-j="' + j + '">' + o + '</button>'; }).join('') + '</div>' + checkBtn();
      $$('.qk-tg', el).forEach(function (b) {
        b.addEventListener('click', function () { var on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.classList.toggle('qk-on', on); $$('.qk-tg', el).forEach(function (x) { x.classList.remove('qk-no', 'qk-miss'); }); msg(''); });
      });
      $('.qk-go', el).addEventListener('click', function () {
        var on = $$('.qk-tg', el).filter(function (b) { return b.classList.contains('qk-on'); }).map(function (b) { return +b.getAttribute('data-j'); });
        if (!on.length) { msg('Pick at least one first.'); return; }
        var right = q.answer.slice().sort().join(','), ok = on.slice().sort().join(',') === right;
        if (!ok) on.forEach(function (j) { if (q.answer.indexOf(j) < 0) $$('.qk-tg', el)[j].classList.add('qk-no'); });
        cb(ok, on.map(function (j) { return strip(q.options[j]); }).join(', '));
      });
      api.reveal = function () { $$('.qk-tg', el).forEach(function (b, j) { b.classList.remove('qk-no'); if (q.answer.indexOf(j) >= 0) b.classList.add('qk-yes'); }); };
    },

    /* ---------- put in order: tap the cards in order ---------- */
    order: function (el, q, cb, api, msg) {
      var n = q.items.length, show = mixed(n), placed = [];
      el.innerHTML = '<p class="qk-tip">Tap the cards in order' + (q.first ? ', starting with <b>' + q.first + '</b>' : '') + '. Tap a placed card to take it back.</p>' +
        '<div class="qk-slots"></div><div class="qk-pool"></div>' + checkBtn();
      var slots = $('.qk-slots', el), pool = $('.qk-pool', el);
      function draw() {
        var h = '';
        for (var i = 0; i < n; i++) h += placed[i] != null ? '<button type="button" class="qk-card qk-in" data-k="' + placed[i] + '"><span class="qk-n">' + (i + 1) + '</span>' + q.items[placed[i]] + '</button>' : '<span class="qk-slot"><span class="qk-n">' + (i + 1) + '</span></span>';
        slots.innerHTML = (q.first ? '<span class="qk-end">' + q.first + '</span>' : '') + h + (q.last ? '<span class="qk-end">' + q.last + '</span>' : '');
        pool.innerHTML = show.filter(function (k) { return placed.indexOf(k) < 0; }).map(function (k) { return '<button type="button" class="qk-card" data-k="' + k + '">' + q.items[k] + '</button>'; }).join('');
        $$('.qk-card', el).forEach(function (b) {
          b.addEventListener('click', function () {
            if (api.locked) return;
            var k = +b.getAttribute('data-k'), at = placed.indexOf(k);
            if (at >= 0) placed.splice(at, 1); else placed.push(k);
            msg(''); draw();
            var nb = $('.qk-pool .qk-card', el) || $('.qk-go', el); if (nb) nb.focus();
          });
        });
        if (api.locked) api.lock();
      }
      draw();
      $('.qk-go', el).addEventListener('click', function () {
        if (placed.length < n) { msg('Place every card first.'); return; }
        var ok = placed.every(function (k, i) { return k === i; });
        if (!ok) { $$('.qk-slots .qk-card', el).forEach(function (b, i) { if (placed[i] !== i) b.classList.add('qk-no'); }); bump(slots); }
        cb(ok, placed.map(function (k) { return strip(q.items[k]); }).join(', '));
      });
      api.reveal = function () { placed = []; for (var i = 0; i < n; i++) placed.push(i); draw(); $$('.qk-slots .qk-card', el).forEach(function (b) { b.classList.add('qk-yes'); }); };
    },

    /* ---------- build a word: tap parts into the boxes ---------- */
    build: function (el, q, cb, api, msg) {
      var n = q.answer.length, show = shuffle(q.parts.map(function (p, i) { return i; })), placed = [];
      el.innerHTML = '<p class="qk-tip">Tap the parts to build the word. Tap a part in a box to take it back.</p><div class="qk-slots qk-build"></div><div class="qk-pool"></div>' + checkBtn();
      var slots = $('.qk-slots', el), pool = $('.qk-pool', el);
      function draw() {
        var h = '';
        for (var i = 0; i < n; i++) h += placed[i] != null ? '<button type="button" class="qk-card qk-in" data-k="' + placed[i] + '">' + q.parts[placed[i]] + '</button>' : '<span class="qk-slot"></span>';
        slots.innerHTML = h;
        pool.innerHTML = show.filter(function (k) { return placed.indexOf(k) < 0; }).map(function (k) { return '<button type="button" class="qk-card" data-k="' + k + '">' + q.parts[k] + '</button>'; }).join('');
        $$('.qk-card', el).forEach(function (b) {
          b.addEventListener('click', function () {
            if (api.locked) return;
            var k = +b.getAttribute('data-k'), at = placed.indexOf(k);
            if (at >= 0) placed.splice(at, 1); else if (placed.length < n) placed.push(k);
            msg(''); draw();
          });
        });
        if (api.locked) api.lock();
      }
      draw();
      $('.qk-go', el).addEventListener('click', function () {
        if (placed.length < n) { msg('Fill every box first.'); return; }
        var ok = placed.every(function (k, i) { return k === q.answer[i]; });
        if (!ok) { $$('.qk-slots .qk-card', el).forEach(function (b, i) { if (placed[i] !== q.answer[i]) b.classList.add('qk-no'); }); bump(slots); }
        cb(ok, placed.map(function (k) { return strip(q.parts[k]); }).join(''));
      });
      api.reveal = function () { placed = q.answer.slice(); draw(); $$('.qk-slots .qk-card', el).forEach(function (b) { b.classList.add('qk-yes'); }); };
    },

    /* ---------- match pairs: tap one on the left, then its partner on the right ---------- */
    match: function (el, q, cb, api, msg) {
      var n = q.pairs.length, rorder = mixed(n), link = {}, sel = null;
      el.innerHTML = '<p class="qk-tip">Tap a card on the left, then the card that matches it on the right.</p><div class="qk-cols"><div class="qk-col qk-left"></div><div class="qk-col qk-right"></div></div>' + checkBtn();
      function draw() {
        var used = {};
        Object.keys(link).forEach(function (l) { used[link[l]] = +l + 1; });
        $('.qk-left', el).innerHTML = q.pairs.map(function (p, i) {
          return '<button type="button" class="qk-card' + (sel === i ? ' qk-sel' : '') + (link[i] != null ? ' qk-linked' : '') + '" data-l="' + i + '">' + (link[i] != null ? '<span class="qk-n">' + (i + 1) + '</span>' : '<span class="qk-n qk-n0">' + (i + 1) + '</span>') + p[0] + '</button>';
        }).join('');
        $('.qk-right', el).innerHTML = rorder.map(function (r) {
          return '<button type="button" class="qk-card' + (used[r] ? ' qk-linked' : '') + '" data-r="' + r + '">' + (used[r] ? '<span class="qk-n">' + used[r] + '</span>' : '') + q.pairs[r][1] + '</button>';
        }).join('');
        $$('[data-l]', el).forEach(function (b) { b.addEventListener('click', function () { if (api.locked) return; var i = +b.getAttribute('data-l'); if (link[i] != null) { delete link[i]; sel = i; } else sel = sel === i ? null : i; msg(''); draw(); }); });
        $$('[data-r]', el).forEach(function (b) {
          b.addEventListener('click', function () {
            if (api.locked) return;
            var r = +b.getAttribute('data-r');
            Object.keys(link).forEach(function (l) { if (link[l] === r) delete link[l]; });
            if (sel == null) { for (var i = 0; i < n; i++) if (link[i] == null) { sel = i; break; } }
            if (sel != null) { link[sel] = r; sel = null; for (var k = 0; k < n; k++) if (link[k] == null) { sel = k; break; } }
            msg(''); draw();
          });
        });
        if (api.locked) api.lock();
      }
      sel = 0; draw();
      $('.qk-go', el).addEventListener('click', function () {
        if (Object.keys(link).length < n) { msg('Match every card first.'); return; }
        var bad = [];
        for (var i = 0; i < n; i++) if (link[i] !== i) bad.push(i);
        var given = q.pairs.map(function (p, i) { return strip(p[0]) + ' with ' + strip(q.pairs[link[i]][1]); }).join('; ');
        if (bad.length) { bad.forEach(function (i) { delete link[i]; }); sel = bad[0]; draw(); bad.forEach(function (i) { $$('[data-l]', el)[i].classList.add('qk-no'); }); msg(bad.length === 1 ? 'One match is not right. Fix it.' : bad.length + ' matches are not right. The right ones stay.'); }
        cb(!bad.length, given);
      });
      api.reveal = function () { for (var i = 0; i < n; i++) link[i] = i; sel = null; draw(); $$('.qk-card', el).forEach(function (b) { b.classList.add('qk-yes'); }); };
    },

    /* ---------- true or false, then why ---------- */
    tf: function (el, q, cb, api) {
      var pickTF = null;
      el.innerHTML = '<div class="opts qk-tfrow"><button type="button" class="opt" data-tf="1">True</button><button type="button" class="opt" data-tf="0">False</button></div><div class="qk-why"></div>';
      function why() {
        if (!q.why) return cb(pickTF === q.answer, pickTF ? 'True' : 'False');
        var w = $('.qk-why', el);
        w.innerHTML = '<p class="qk-tip"><b>Why?</b> Pick the best reason.</p><div class="opts">' + q.why.options.map(function (o, j) { return '<button type="button" class="opt" data-j="' + j + '">' + o + '</button>'; }).join('') + '</div>';
        $$('[data-j]', w).forEach(function (b) {
          b.addEventListener('click', function () {
            if (api.locked) return;
            var j = +b.getAttribute('data-j'), ok = j === q.why.answer;
            b.classList.add(ok ? 'qk-yes' : 'qk-no'); if (!ok) b.disabled = true;
            cb(ok, (pickTF ? 'True' : 'False') + '. ' + strip(q.why.options[j]));
          });
        });
        var f = $('[data-j]', w); if (f) f.focus();
      }
      $$('[data-tf]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          if (api.locked || pickTF !== null) return;
          var v = b.getAttribute('data-tf') === '1';
          if (v !== q.answer) { b.classList.add('qk-no'); b.disabled = true; cb(false, v ? 'True' : 'False'); return; }
          pickTF = v; b.classList.add('qk-yes'); $$('[data-tf]', el).forEach(function (x) { x.disabled = true; });
          why();
        });
      });
      api.reveal = function () {
        $$('[data-tf]', el).forEach(function (b) { if ((b.getAttribute('data-tf') === '1') === q.answer) b.classList.add('qk-yes'); });
        if (q.why) {
          if (!$('[data-j]', el)) { pickTF = q.answer; why(); }
          $$('[data-j]', el).forEach(function (b, j) { if (j === q.why.answer) b.classList.add('qk-yes'); });
        }
      };
    }
  };

  /* ---------- question shapes ----------
     A skill keeps one idea but asks it in different ways. list = [[minLevel, name, fn(lv)], ...].
     Shapes unlock with the level, so level 1 stays plain and pictorial. The last shape used is not repeated. */
  var lastShape = {};
  /* forget the last shapes, so a printed worksheet (sheets.js) makes the same questions every time */
  Q.resetShapes = function () { lastShape = {}; };
  Q.vary = function (id, lv, list) {
    var ok = list.filter(function (s) { return lv >= s[0] && (!s[3] || lv <= s[3]); });
    if (!ok.length) ok = [list[0]];
    var choice = ok.length > 1 ? ok.filter(function (s) { return s[1] !== lastShape[id]; }) : ok;
    var s = choice[Math.floor(Math.random() * choice.length)];
    lastShape[id] = s[1];
    var q = s[2](lv);
    q.shape = s[1];
    return q;
  };
  /* Give every practice skill in a chapter its extra shapes, and turn on fresh quizzes.
     SHAPES = { skillId: [[minLevel, name, fn(lv)], ...] }. Each skill keeps its first way of asking as 'plain'.
     Call it once at the end of the chapter file: Atlas.Q.shapes('chapter-id', SHAPES). */
  Q.shapes = function (id, SHAPES) {
    var ch = A.chapters[id];
    if (!ch) throw new Error('Atlas.Q.shapes: no chapter called ' + id + ' (register it first)');
    ch.quizFresh = true;
    ch.practice.forEach(function (sk) {
      var plain = sk.gen, extra = SHAPES[sk.id] || [];
      sk.shapes = ['plain'].concat(extra.map(function (s) { return s[1]; }));
      sk.gen = function (lv) { return Q.vary(sk.id, lv, [[1, 'plain', plain]].concat(extra)); };
    });
  };
  /* quick ways to make the common question types. more = the other fields (fig, hint, explain, steps, prompt, meta).
       Q.one(q, right, [wrong, ...], more)          pick one, options mixed up
       Q.tiles(q, right, [wrong, ...], more)        tap one tile, tiles mixed up
       Q.all(q, [right, ...], [wrong, ...], more)   pick every answer that fits */
  function merge(q, more) { Object.keys(more || {}).forEach(function (k) { q[k] = more[k]; }); return q; }
  Q.one = function (q, right, wrong, more) { var o = A.R.mc(right, wrong); return merge({ q: q, type: 'mc', options: o.options, answer: o.answer }, more); };
  Q.tiles = function (q, right, wrong, more) {
    var t = shuffle([right].concat(wrong.filter(function (w, i) { return w !== right && wrong.indexOf(w) === i; })));
    return merge({ q: q, type: 'tap', tiles: t, answer: t.indexOf(right) }, more);
  };
  Q.all = function (q, right, wrong, more) {
    var o = shuffle(right.concat(wrong));
    return merge({ q: q, type: 'pick', options: o, answer: o.map(function (x, i) { return right.indexOf(x) >= 0 ? i : -1; }).filter(function (i) { return i >= 0; }) }, more);
  };

  /* names for sentences and stories: short, easy to read, and as varied as a Canadian classroom */
  Q.names = ['Ava', 'Liam', 'Noor', 'Ethan', 'Mei', 'Arjun', 'Chloe', 'Kai', 'Zara', 'Owen', 'Amara', 'Lucas', 'Sofia', 'Jayden', 'Leila', 'Mateo', 'Hana', 'Theo', 'Tala', 'Omar', 'Priya', 'Sam'];
  Q.name = function () { return Q.names[Math.floor(Math.random() * Q.names.length)]; };
  Q.two = function () { var a = Q.name(), b; do { b = Q.name(); } while (b === a); return [a, b]; };
})();
