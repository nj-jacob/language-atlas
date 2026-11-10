/* Language Atlas tool box: Reading passages (#tools/passages), printable reading comprehension, Grades 4 to 8.
   Needs atlas.js, tools.js and sheets.js (the worksheets' themes, look and printing; sheets.css). It adds itself to the tool box.
   Each passage prints as one sheet of paper, both sides: the front is the passage with its pictures, diagrams and charts,
   the back is its questions. The answer key (grown-up view) is a third page, printed on its own.
   Nothing is marked on screen: the child answers on paper and the grown-up marks with the key.

   The passages are written for this site, about 100 for each grade, on topics from every subject. A grade's passages are in
   gradeN/passages.js, loaded only when the tool opens:
     Atlas.library.add({ id, subject, form, title, deck, hero: { art, cap }, body: [...], words: [[word, meaning], ...], qs: [...] })
   id      'g5-potholes': the grade, then a short name. The sheet number is G5-P01 (the order in the file).
   subject one of SUBJECTS below. form: the text form (Report, Explanation, Diary, Letter to the editor ...).
   hero    { photo, credit, focus, art, side, tall, cap }: a picture across the top of the front, 700 by tall.
           photo: a real photo in assets/photos/ (public domain, CC0, CC BY or CC BY-SA; assets/photos/CREDITS.md lists every one,
           and thumbs/ has a small copy for the list); credit: its maker and licence, printed after the caption; focus: the part
           of the photo to keep when it is cut to fit (CSS object-position, '50% 70%'). art: SVG made of the line classes below,
           on its own, on top of the photo, or beside it with side: { w, view } (the drawing's width on the page out of 700, and
           its own viewBox).
   body    in order: 'a paragraph (bold a glossary word with <b>)', { h: 'Subheading' }, { fig: art, tall, cap } (a 300 by tall box),
           { box: 'Did you know?', text: '...' }. The front has two columns; a figure or box sits in its column.
   plain   true: no large first letter (for a letter or other text that starts with a greeting).
   words   the glossary along the foot of the front: every word is bold in the text.
   guide   { before, after } for the grown-up, on the answer key: what to teach before reading (background and words, as the Science
           of Reading asks) and a question to talk about after.
   qs      the back, in order. Every question names its Ontario expectation (code, for example 'C3.2'), shown on the key only.
             { k: 'choice', q, opts: [...], a: 1 }                 circle one (a is the right option, from 0)
             { k: 'lines', q, n: 3, a: 'a full answer', look }      written answer on n lines; a and look are for the grown-up
             { k: 'table', q, cols: [...], rows: [[cell or null, ...]], a: [[...]] }   fill the blanks (null) in a chart
             { k: 'order', q, items: [... in the right order], show: [indexes in the order printed] }   number them
           half: true puts two short questions side by side.
           Across a grade's 100 passages, the codes must reach every reading expectation (tests/run.js, PASSAGE_COVER): plan each
           batch to fill gaps, for example B3 grammar in a sentence from the text, C1.1 what a word such as they refers to, C2.1 and C2.5
           connections, C2.7 and C3.8 the reader's own strategies, C3.4 cultural elements, C3.6 inclusion and accessibility.
   Line art (house style: white paper, thin outlines in the theme's one colour, no filled areas): class a (accent line),
   k (ink line), t (thin ink line), h (hatched area), d (dashed line), l (label text), lb (bold label), n (small note text). */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.toolkit || !A.sheets) return;
  var $ = A.$, $$ = A.$$, S = A.sheets;
  var P = (A.library = { list: [] });
  var SUBJECTS = (P.subjects = [['science', 'Science', 'FO'], ['social', 'Social studies', 'LB'], ['history', 'History', 'LK'], ['geography', 'Geography', 'LK'],
    ['arts', 'The arts', 'GD'], ['health', 'Health', 'SN'], ['tech', 'Technology', 'SK'], ['math', 'Math', 'SK'], ['story', 'Stories', 'GD']]);
  var LETTERS = 'ABCDEFGH';
  /* every key ends with the same fluency check (B2.3), so each passage is also read aloud once */
  var FLUENT = 'Have the child read one paragraph aloud to you. Listen for accuracy, a steady pace and expression that fits the meaning. Note any words they stumble on and practise them together.';
  var HATCH = '<defs><pattern id="ps-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="t"/></pattern></defs>';

  /* small drawing helpers for the passages' line art (all lengths in the drawing's own units) */
  P.draw = {
    /* a spruce or pine: tiers of branches on a trunk, ground at y, h tall */
    spruce: function (x, y, h) {
      var d = 'M' + x + ' ' + y + 'v' + (-h * 0.15), w = h * 0.32;
      for (var i = 0; i < 4; i++) { var top = y - h * (0.15 + i * 0.21), ww = w * (1 - i * 0.22); d += ' M' + (x - ww) + ' ' + top + ' L' + x + ' ' + (top - h * 0.3) + ' L' + (x + ww) + ' ' + top; }
      return '<path class="k" d="' + d + '"/>';
    },
    /* rows of small waves from x1 to x2 at height y */
    ripple: function (x1, x2, y, cls) {
      var d = 'M' + x1 + ' ' + y;
      for (var x = x1; x < x2 - 11; x += 22) d += ' q5.5 -4 11 0 t11 0';
      return '<path class="' + (cls || 'a') + '" d="' + d + '"/>';
    },
    /* a line with an arrowhead at its end */
    arrow: function (x1, y1, x2, y2, cls) {
      var a = Math.atan2(y2 - y1, x2 - x1), l = 8;
      var p = function (t) { return (x2 - l * Math.cos(a + t)).toFixed(1) + ' ' + (y2 - l * Math.sin(a + t)).toFixed(1); };
      return '<path class="' + (cls || 'k') + '" d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' M' + p(0.45) + ' L' + x2 + ' ' + y2 + ' L' + p(-0.45) + '"/>';
    },
    /* a label with a thin line and a dot pointing at (px, py) */
    label: function (x, y, text, px, py, anchor) {
      return (px === undefined ? '' : '<path class="t" d="M' + x + ' ' + (y - 4) + ' L' + px + ' ' + py + '"/><circle class="dot" cx="' + px + '" cy="' + py + '" r="2"/>') +
        '<text class="l" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + text + '</text>';
    }
  };

  P.add = function (p) { p.n = P.list.length + 1; P.list.push(p); };
  P.subject = function (id) { return SUBJECTS.filter(function (s) { return s[0] === id; })[0]; };
  P.code = function (p) { return 'G' + A.grade + '-P' + (p.n < 10 ? '0' : '') + p.n; };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function strip(h) { return String(h).replace(/<[^>]+>/g, ' '); }
  /* the words of the passage itself: paragraphs, subheadings and boxes (not captions or the glossary) */
  P.count = function (p) {
    return p.body.map(function (b) { return typeof b === 'string' ? b : b.h || (b.box ? b.box + ' ' + b.text : ''); })
      .join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(function (w) { return /[A-Za-z0-9]/.test(w); }).length;
  };
  P.marks = function (q) { return q.m || (q.k === 'table' ? q.rows.reduce(function (n, r) { return n + r.filter(function (c) { return c === null; }).length; }, 0) : q.k === 'lines' ? (q.n >= 4 ? 3 : 2) : 1); };

  /* a grade's passages, loaded once, when the tool first opens */
  var loading = null;
  P.load = function () {
    loading = loading || new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = 'passages.js';
      s.onload = ok;
      s.onerror = ok;
      document.head.appendChild(s);
    });
    return loading;
  };

  /* ---------- the pages ---------- */
  function art(svg, w, h, cls) { return '<svg class="ps-art' + (cls ? ' ' + cls : '') + '" viewBox="0 0 ' + w + ' ' + h + '" aria-hidden="true">' + HATCH + svg + '</svg>'; }
  function head(p, th, kind) {
    var sub = P.subject(p.subject);
    return '<header class="ps-head"><p class="ws-kick"><svg viewBox="0 0 56 56" aria-hidden="true">' + th.mark + '</svg>' + esc(sub[1] + ' · ' + p.form + (kind ? ' · ' + kind : '')) + '</p>' +
      (kind === 'Answer key' ? '' : '<div class="ws-name ps-name"><span>Name</span><i></i><span>Date</span><i></i></div>') +
      '<h2 class="ps-title">' + p.title + '</h2>' + (kind ? '' : '<p class="ps-deck">' + p.deck + '</p>') + '</header>';
  }
  function foot(p, th, left) {
    return '<p class="ws-line ps-line"><span>' + left + '</span><span>' + P.code(p) + '</span></p>';
  }
  function hero(p, full) {
    var h = p.hero, img = h.photo ? '<img src="../assets/photos/' + (full ? '' : 'thumbs/') + h.photo + '" alt=""' + (full ? '' : ' loading="lazy"') + (h.focus ? ' style="object-position:' + h.focus + '"' : '') + '>' : '';
    var pic = h.side ? '<div class="ps-split" style="--w:' + h.side.w + '"><div class="ps-pic">' + img + '</div><svg class="ps-art" viewBox="' + h.side.view + '" aria-hidden="true">' + HATCH + h.art + '</svg></div>'
      : '<div class="ps-pic">' + img + (h.art ? art(h.art, 700, h.tall) : '') + '</div>';
    return '<figure class="ps-hero' + (h.photo ? ' ps-photo' : '') + '" style="--tall:' + h.tall + '">' + pic +
      (full ? '<figcaption>' + h.cap + (h.credit ? ' <span class="ps-credit">' + h.credit + '</span>' : '') + '</figcaption>' : '') + '</figure>';
  }
  /* Keep a number such as 8 000 on one line: the space between its groups of digits does not break. */
  function nobreak(t) { return t.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0'); }
  function front(p, th) {
    var body = p.body.map(function (b) {
      if (typeof b === 'string') return '<p>' + nobreak(b) + '</p>';
      if (b.h) return '<h3>' + b.h + '</h3>';
      if (b.fig) return '<figure class="ps-fig">' + art(b.fig, 300, b.tall) + (b.cap ? '<figcaption>' + b.cap + '</figcaption>' : '') + '</figure>';
      return '<aside class="ps-box"><p class="ws-label">' + b.box + '</p><p>' + nobreak(b.text) + '</p></aside>';
    }).join('');
    return '<div class="ws-page ps-page ps-front">' + frame(th) + head(p, th) +
      hero(p, true) +
      '<div class="ps-text' + (p.plain ? ' ps-plain' : '') + '">' + body + '</div>' +
      '<footer class="ps-foot"><dl class="ps-words"><dt class="ws-label">Words to know</dt>' + p.words.map(function (w) { return '<div><dt>' + w[0] + '</dt><dd>' + w[1] + '</dd></div>'; }).join('') + '</dl>' +
      foot(p, th, 'Language Atlas · Grade ' + A.grade + ' · ' + P.count(p) + ' words · Turn over for the questions') + '</footer></div>';
  }
  function question(q, i) {
    var h = '<p class="ws-qt">' + q.q + '</p>';
    if (q.k === 'choice') h += '<div class="ws-opts ps-opts">' + q.opts.map(function (o, j) { return '<span class="ws-opt"><b>' + LETTERS[j] + '</b> ' + o + '</span>'; }).join('') + '</div>';
    if (q.k === 'lines') h += '<div class="ws-lines" style="--n:' + q.n + '"></div>';
    if (q.k === 'table') {
      h += '<table class="ps-table"><thead><tr>' + q.cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' + q.rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return c === null ? '<td class="ps-fill"></td>' : '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
    }
    if (q.k === 'order') h += '<ol class="ws-order">' + q.show.map(function (k) { return '<li><span class="ws-blank ws-box"></span><span>' + q.items[k] + '</span></li>'; }).join('') + '</ol>';
    return '<div class="ws-q ps-q' + (q.half ? '' : ' ws-wide') + '"><span class="ws-n">' + (i + 1) + '</span>' + h + '</div>';
  }
  function back(p, th) {
    return '<div class="ws-page ps-page ps-back">' + frame(th) + head(p, th, 'Questions') +
      '<div class="ps-qs ws-grid">' + p.qs.map(question).join('') + '</div>' +
      '<footer class="ps-foot"><p class="ps-tip">Look back at the passage to find and check each answer.</p>' + foot(p, th, 'Language Atlas · Grade ' + A.grade) + '</footer></div>';
  }
  /* the answer key: one row for each question, with its expectation and marks */
  function answer(q) {
    if (q.k === 'choice') return '<b>' + LETTERS[q.a] + '</b> ' + q.opts[q.a];
    if (q.k === 'order') return 'From the top: ' + q.show.map(function (k) { return '<b>' + (k + 1) + '</b>'; }).join(', ');
    if (q.k === 'table') {
      var out = [];
      q.rows.forEach(function (r, ri) { var given = r.filter(function (c) { return c !== null; })[0]; r.forEach(function (c, ci) { if (c === null) out.push('<i>' + (given || q.cols[ci]) + ' &rarr;</i> ' + q.a[ri][ci]); }); });
      return out.join('<br>');
    }
    return q.a + (q.look ? '<span class="ps-look"><b>Look for</b> ' + q.look + '</span>' : '');
  }
  function key(p, th) {
    var total = p.qs.reduce(function (n, q) { return n + P.marks(q); }, 0);
    return '<div class="ws-page ps-page ps-key ws-key">' + frame(th) + head(p, th, 'Answer key') +
      '<ol class="ps-qs ps-ans">' + p.qs.map(function (q, i) {
        return '<li class="ws-q"><span class="ws-n">' + (i + 1) + '</span><p class="ps-kq">' + q.q + '</p><p class="ws-ans">' + answer(q) + '</p>' +
          '<p class="ps-code">' + q.code + ' · ' + P.marks(q) + (P.marks(q) > 1 ? ' marks' : ' mark') + '</p></li>';
      }).join('') + '</ol>' +
      '<div class="ps-guide"><div><p class="ws-label">Before reading</p><p>' + p.guide.before + '</p></div><div><p class="ws-label">After reading, talk about it</p><p>' + p.guide.after + '</p></div>' +
      '<div class="ps-fluent"><p class="ws-label">Read aloud · B2.3</p><p>' + FLUENT + '</p></div></div>' +
      '<footer class="ps-foot"><p class="ps-tip">Score ____ of ' + total + '. Accept any answer the text supports: written answers here are examples.</p>' +
      foot(p, th, 'Language Atlas · Grade ' + A.grade + ' · Ontario ' + codes(p).concat('B2.3').sort().join(', ')) + '</footer></div>';
  }
  function frame(th) { return th.frame ? '<svg class="ws-frame" viewBox="0 0 816 1056" aria-hidden="true">' + th.frame() + '</svg>' : ''; }
  function codes(p) { var out = []; p.qs.forEach(function (q) { if (out.indexOf(q.code) < 0) out.push(q.code); }); return out.sort(); }
  P.codes = codes;
  function themeOf(p) { return S.themeById(P.subject(p.subject)[2]); }

  /* Draw one page of a passage ('front', 'back' or 'key') into el, a .ws-sheet box. When the text does not quite fit (a font
     that has not loaded is wider), it is set a little smaller (--z), down to 88%. Returns whether anything still runs off the page. */
  var ZOOM = [1, 0.97, 0.94, 0.91, 0.88];
  P.render = function (el, p, side) {
    var th = themeOf(p);
    el.innerHTML = (side === 'front' ? front : side === 'back' ? back : key)(p, th);
    var pg = el.firstChild, box = $(side === 'front' ? '.ps-text' : side === 'back' ? '.ps-qs' : '.ps-guide', pg), over;
    pg.style.setProperty('--acc', th.acc);
    pg.style.setProperty('--face', th.font);
    for (var i = 0; i < ZOOM.length; i++) {
      pg.style.setProperty('--z', ZOOM[i]);
      over = box.scrollHeight > box.clientHeight + 1 || box.scrollWidth > box.clientWidth + 1;
      if (!over) break;
    }
    return { over: over, z: ZOOM[i] || ZOOM[ZOOM.length - 1] };
  };

  /* ---------- the tool: the library, and one passage ---------- */
  function card(p) {
    var sub = P.subject(p.subject);
    return '<a class="ps-card" href="#tools/passages/' + p.id + '" style="--acc:' + themeOf(p).acc + '">' + hero(p) +
      '<span class="ps-ck">' + sub[1] + ' · ' + p.form + '</span><b>' + p.title + '</b><span class="ps-cd">' + p.deck + '</span><span class="ps-cw">' + P.count(p) + ' words</span></a>';
  }
  function library(root, pick) {
    var here = SUBJECTS.filter(function (s) { return P.list.some(function (p) { return p.subject === s[0]; }); });
    var list = P.list.filter(function (p) { return !pick || p.subject === pick; });
    root.innerHTML = '<div class="ps-lib"><p class="ps-lede">' + P.list.length + (P.list.length === 1 ? ' passage' : ' passages') + ' for Grade ' + A.grade + '. Each one prints on one sheet: the passage on the front, the questions on the back.</p>' +
      '<div class="ws-themes ps-subs" role="radiogroup" aria-label="Subject">' + [['', 'All']].concat(here).map(function (s) {
        return '<button type="button" role="radio" class="ws-chip" data-s="' + s[0] + '" aria-checked="' + (s[0] === (pick || '')) + '">' + s[1] + '</button>';
      }).join('') + '</div><div class="ps-cards">' + list.map(card).join('') + '</div></div>';
    $$('[data-s]', root).forEach(function (b) { b.addEventListener('click', function () { library(root, b.getAttribute('data-s')); }); });
  }
  function one(root, p) {
    var i = P.list.indexOf(p), prev = P.list[i - 1], next = P.list[i + 1];
    root.innerHTML = '<div class="ps-one"><div class="ps-bar"><a class="ps-all" href="#tools/passages">All passages</a><span class="tb-sp"></span>' +
      (prev ? '<a class="ws-k" href="#tools/passages/' + prev.id + '" aria-label="Previous passage">&lsaquo; Back</a>' : '') +
      (next ? '<a class="ws-k" href="#tools/passages/' + next.id + '" aria-label="Next passage">Next &rsaquo;</a>' : '') + '</div>' +
      '<div class="ps-do"><button type="button" class="btn" data-print="sheet">Print the passage</button>' +
      '<button type="button" class="btn alt ws-adult" data-print="key">Print the answer key</button>' +
      '<p class="ws-hint">Print both sides: choose two-sided, flip on the long edge. On an iPad, tap Print, then Share, then Save to Files to keep a PDF.</p></div>' +
      '<div class="ws-pages"><div class="ws-sheet" data-side="front"></div><div class="ws-sheet" data-side="back"></div><div class="ws-sheet ws-adult" data-side="key"></div></div></div>';
    document.documentElement.classList.add('ws-print');
    $$('[data-print]', root).forEach(function (b) {
      b.addEventListener('click', function () {
        document.documentElement.setAttribute('data-ps-print', b.getAttribute('data-print'));
        window.print();
      });
    });
    return S.fonts().then(function () {
      $$('.ws-sheet', root).forEach(function (el) { P.render(el, p, el.getAttribute('data-side')); });
      S.fit();
    });
  }
  window.addEventListener('afterprint', function () { document.documentElement.removeAttribute('data-ps-print'); });
  function passages(root, canUndo, rest) {
    root.innerHTML = '<p class="loading">Loading the passages…</p>';
    P.load().then(function () {
      var p = P.list.filter(function (x) { return x.id === rest; })[0];
      if (p) return one(root, p);
      if (!P.list.length) { root.innerHTML = '<p class="ps-lede">Reading passages start in Grade 4.</p>'; return; }
      library(root, '');
    });
    return {};
  }

  var ICON = '<rect x="7" y="5" width="30" height="38" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="12" y="10" width="20" height="10" rx="1.5" style="fill:none;stroke:var(--accent);stroke-width:2"/>' +
    '<path d="M12 25h20M12 30h20M12 35h14" style="stroke:var(--ink3);stroke-width:2.5;stroke-linecap:round"/><path d="M37 13l6 3v26l-6-3" style="fill:none;stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>';
  A.toolkit.tools.push({ id: 'passages', shelf: 'read', name: 'Reading passages', icon: ICON, make: passages, from: 4, undo: false });
})();
