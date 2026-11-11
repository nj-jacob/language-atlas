/* Language Atlas tool box: Heart words (#tools/hearts), the tricky words learned by heart, in sets of 10, Kindergarten to Grade 3.
   Needs atlas.js and tools.js; the printed page also needs sheets.js (look, fonts and printing; sheets.css). It adds itself to the
   tool box, on the Spelling shelf. The sets are in assets/engine/heartbank.js, loaded when the tool first opens.
   A heart word is mostly regular: only its heart part (marked [ ] in the bank) is learned by heart, and a small heart sits over it.
   A set (#tools/hearts/<n>) takes one word at a time, in three steps (Orton-Gillingham's see it, trace it, write it):
     Look   the word, its heart part in colour: read it, spell it out loud, point to the heart part.
     Trace  the word in hollow letters: trace it with a finger or pencil, saying each letter.
     Write  the word is hidden: write it from memory on a line, then Show it and compare. The child (or grown-up) taps Got it or
            Not yet. A word is secure when it is Got it on two different days (hw:<word>); the list shows each set's count.
   Print (#tools/hearts/<n>/print): a page to trace, write and cover-and-write each word, and a grown-up page (the routine, the
   heart parts, the codes). Writing by hand is never marked by the tool: the child checks against the word. */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.toolkit) return;
  var $ = A.$, $$ = A.$$, T = A.toolkit;
  var H = (A.hearts = { sets: [] });
  var BANDS = [['K', 'Kindergarten'], ['1', 'Grade 1'], ['2', 'Grade 2'], ['3', 'Grade 3']];
  /* Ontario codes: reading and spelling high-frequency words (Kindergarten A2.5; Grade 1 B2.4; Grades 2 and 3 B2.1) */
  var CODES = { K: 'Kindergarten A2.5, Grade 1 B2.4', 1: 'Grade 1 B2.4, Grades 2 and 3 B2.1', 2: 'Grades 2 and 3 B2.1', 3: 'Grade 3 B2.1' };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------- the sets ---------- */
  /* 's[ai]d' becomes { w: 'said', parts: [['s', 0], ['ai', 1], ['d', 0]] } */
  H.parse = function (raw) {
    var parts = [], re = /\[([^\]]+)\]|([^[\]]+)/g, m;
    while ((m = re.exec(raw))) parts.push(m[1] ? [m[1], 1] : [m[2], 0]);
    return { w: parts.map(function (p) { return p[0]; }).join(''), parts: parts };
  };
  H.add = function (band, list) {
    H.sets.push({ n: H.sets.length + 1, band: band, words: list.split(' ').map(H.parse) });
  };
  H.find = function (n) { return H.sets[+n - 1]; };
  H.code = function (s) { return 'HW-' + (s.n < 10 ? '0' : '') + s.n; };
  var LOAD = null;
  H.load = function () {
    LOAD = LOAD || new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = '../assets/engine/heartbank.js';
      s.onload = ok;
      s.onerror = ok;
      document.head.appendChild(s);
    });
    return LOAD;
  };

  /* ---------- progress: a word is secure when it is Got it on two different days ---------- */
  H.record = function (w) { return A.load('hw:' + w, { days: [] }); };
  H.secure = function (w) { return H.record(w).days.length >= 2; };
  H.mark = function (w, ok) {
    var r = H.record(w), today = new Date().toISOString().slice(0, 10);
    r.days = r.days.filter(function (d) { return d !== today; });
    if (ok) r.days = r.days.concat([today]).slice(-4);
    A.save('hw:' + w, r);
    return r;
  };

  /* ---------- the word, its heart part marked ---------- */
  var HEART = '<svg viewBox="0 0 20 18" aria-hidden="true"><path d="M10 17 C4 12 1 9 1 5.5 A4.5 4.5 0 0 1 10 3.5 A4.5 4.5 0 0 1 19 5.5 C19 9 16 12 10 17 Z"/></svg>';
  function shown(x, cls) {
    return '<span class="hw-word' + (cls ? ' ' + cls : '') + '">' + x.parts.map(function (p) {
      return p[1] ? '<span class="hw-h">' + HEART + esc(p[0]) + '</span>' : esc(p[0]);
    }).join('') + '</span>';
  }
  H.heartPart = function (x) { return x.parts.filter(function (p) { return p[1]; }).map(function (p) { return p[0]; }); };

  /* writing on a canvas with a finger or pencil */
  function pad(c) {
    var ctx, down = false, w = 0;
    function size() {
      var r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      if (!r.width || Math.round(r.width) === w) return;
      w = Math.round(r.width);
      c.width = r.width * d; c.height = r.height * d;
      ctx = c.getContext('2d'); ctx.scale(d, d); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 4;
    }
    size();
    window.addEventListener('resize', size);
    function pt(e) { var r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    c.addEventListener('pointerdown', function (e) { size(); down = true; c.setPointerCapture(e.pointerId); ctx.strokeStyle = getComputedStyle(c).getPropertyValue('--ink').trim(); var q = pt(e); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] + 0.1, q[1]); ctx.stroke(); });
    c.addEventListener('pointermove', function (e) { if (!down) return; var q = pt(e); ctx.lineTo(q[0], q[1]); ctx.stroke(); });
    ['pointerup', 'pointercancel'].forEach(function (ev) { c.addEventListener(ev, function () { down = false; }); });
    c.wipe = function () { if (ctx) ctx.clearRect(0, 0, c.width, c.height); };
  }

  /* ---------- one set ---------- */
  var STEPS = [['look', 'Look'], ['trace', 'Trace'], ['write', 'Write']];
  function setPage(root, s, part) {
    var i = H.sets.indexOf(s), prev = H.sets[i - 1], next = H.sets[i + 1];
    root.innerHTML = '<div class="hw-one"><div class="dc-bar"><a class="dc-all" href="#tools/hearts">All sets</a><span class="tb-sp"></span>' +
      (prev ? '<a class="ws-k" href="#tools/hearts/' + prev.n + '" aria-label="Previous set">&lsaquo; Back</a>' : '') +
      (next ? '<a class="ws-k" href="#tools/hearts/' + next.n + '" aria-label="Next set">Next &rsaquo;</a>' : '') + '</div>' +
      '<div class="coach adult-only hw-coach"><p>Point to the heart part: those letters do not say their usual sound, so they are learned by heart. Sound out the rest as usual. ' +
      'Say the word, spell it out loud, trace it, then write it from memory. A word is secure when it is right on two different days.</p>' +
      '<p class="sp-codes">Ontario ' + CODES[s.band] + '</p></div>' +
      '<nav class="sp-tabs" aria-label="This set"><a href="#tools/hearts/' + s.n + '"' + (part !== 'print' ? ' aria-current="page"' : '') + '>Practise</a>' +
      '<a href="#tools/hearts/' + s.n + '/print"' + (part === 'print' ? ' aria-current="page"' : '') + '>Print</a></nav><div class="hw-stage"></div></div>';
    var stage = $('.hw-stage', root);
    if (part === 'print') printPart(stage, s); else practise(stage, s);
  }
  function practise(stage, s) {
    var at = 0, step = 'look';
    function draw() {
      var x = s.words[at];
      stage.innerHTML = '<div class="hw-strip">' + s.words.map(function (y, k) {
        return '<button type="button" class="hw-chip' + (k === at ? ' hw-on' : '') + (H.secure(y.w) ? ' hw-sec' : '') + '" data-k="' + k + '">' + esc(y.w) + '</button>';
      }).join('') + '</div>' +
        '<div class="sp-card hw-card"><nav class="hw-steps" aria-label="Steps">' + STEPS.map(function (t, k) {
          return '<button type="button" data-s="' + t[0] + '"' + (t[0] === step ? ' aria-current="step"' : '') + '><b>' + (k + 1) + '</b>' + t[1] + '</button>';
        }).join('') + '</nav><div class="hw-body"></div></div>';
      $$('.hw-chip', stage).forEach(function (b) { b.addEventListener('click', function () { at = +b.dataset.k; step = 'look'; draw(); }); });
      $$('.hw-steps button', stage).forEach(function (b) { b.addEventListener('click', function () { step = b.dataset.s; draw(); }); });
      var body = $('.hw-body', stage);
      if (step === 'look') {
        body.innerHTML = '<div class="hw-big">' + shown(x) + '</div><p class="sp-say">Read it. Spell it out loud. Touch the heart part.</p>' +
          '<div class="sp-do"><button type="button" class="btn" data-a="go">Trace it</button></div>';
        $('[data-a="go"]', body).addEventListener('click', function () { step = 'trace'; draw(); });
      } else if (step === 'trace') {
        body.innerHTML = '<div class="hw-trace">' + shown(x, 'hw-hollow') + '<canvas aria-label="Trace the word"></canvas></div>' +
          '<p class="sp-say">Trace each letter and say its name.</p>' +
          '<div class="sp-do"><button type="button" class="btn alt" data-a="wipe">Clear</button><button type="button" class="btn" data-a="go">Write it</button></div>';
        var c = $('canvas', body); pad(c);
        $('[data-a="wipe"]', body).addEventListener('click', function () { c.wipe(); });
        $('[data-a="go"]', body).addEventListener('click', function () { step = 'write'; draw(); });
      } else {
        body.innerHTML = '<div class="hw-line"><canvas aria-label="Write the word"></canvas></div>' +
          '<p class="sp-say">Write it from memory. Then show it and check.</p>' +
          '<div class="hw-ans" hidden>' + shown(x) + '</div>' +
          '<div class="sp-do"><button type="button" class="btn alt" data-a="wipe">Clear</button><button type="button" class="btn" data-a="show">Show it</button></div>' +
          '<p class="sp-msg" role="status"></p>';
        var w = $('canvas', body); pad(w);
        $('[data-a="wipe"]', body).addEventListener('click', function () { w.wipe(); });
        $('[data-a="show"]', body).addEventListener('click', function () {
          $('.hw-ans', body).hidden = false;
          $('.sp-do', body).innerHTML = '<button type="button" class="btn alt" data-a="no">Not yet</button><button type="button" class="btn" data-a="yes">Got it</button>';
          $$('[data-a="yes"], [data-a="no"]', body).forEach(function (b) {
            b.addEventListener('click', function () {
              var ok = b.dataset.a === 'yes', r = H.mark(x.w, ok), msg = $('.sp-msg', body);
              msg.className = 'sp-msg' + (ok ? ' sp-good' : '');
              msg.textContent = ok ? (r.days.length >= 2 ? 'Secure: right on two different days.' : 'Right today. Try it again on another day.') : 'Look at the heart part, then trace it again.';
              $('.sp-do', body).innerHTML = ok ? (at + 1 < s.words.length ? '<button type="button" class="btn" data-a="next">Next word</button>' : '') : '<button type="button" class="btn" data-a="again">Trace it again</button>';
              var n = $('[data-a="next"], [data-a="again"]', body);
              if (n) n.addEventListener('click', function () { if (n.dataset.a === 'next') { at++; step = 'look'; } else step = 'trace'; draw(); });
            });
          });
        });
      }
    }
    draw();
  }

  /* ---------- the printed page ---------- */
  var PLAIN = { acc: 'var(--accent)', font: 'var(--display)', mark: '<path d="M28 48 C14 38 8 30 8 21 A10 10 0 0 1 28 16 A10 10 0 0 1 48 21 C48 30 42 38 28 48 Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>' };
  function head(s, kind) {
    var b = BANDS.filter(function (x) { return x[0] === s.band; })[0][1];
    return '<header class="dc-head"><p class="ws-kick"><svg viewBox="0 0 56 56" aria-hidden="true">' + PLAIN.mark + '</svg>Heart words · ' + b + (kind ? ' · ' + kind : '') + '</p>' +
      (kind ? '' : '<div class="ws-name dc-name"><span>Name</span><i></i><span>Date</span><i></i></div>') +
      '<h2 class="dc-title">Heart words: set ' + s.n + '</h2></header>';
  }
  function foot(s, left) { return '<footer class="dc-foot"><p class="ws-line dc-line"><span>' + left + '</span><span>' + H.code(s) + '</span></p></footer>'; }
  function page(s) {
    return '<div class="ws-page dc-page hw-page">' + head(s) +
      '<div class="hw-prow hw-phead"><span>Read it</span><span>Trace it</span><span>Write it</span><span>Cover and write</span></div>' +
      s.words.map(function (x) {
        return '<div class="hw-prow"><span class="hw-pw">' + shown(x) + '</span><span class="hw-pt">' + esc(x.w) + '</span><i></i><i></i></div>';
      }).join('') + foot(s, 'Language Atlas · Heart words · set ' + s.n) + '</div>';
  }
  var ROUTINE = ['<b>Read it.</b> Point to the word and read it. The child reads it back.', '<b>Find the heart.</b> Point to the regular letters, then the heart part: these letters do not say their usual sound.',
    '<b>Spell it out loud,</b> tapping a finger for each letter, then trace it while saying each letter.', '<b>Write it,</b> then cover it and write it from memory. Uncover and check letter by letter.',
    '<b>Use it.</b> The child says a sentence with the word. Words missed today come back next time.'];
  function key(s) {
    return '<div class="ws-page dc-page dc-keyp ws-key hw-page">' + head(s, 'For the grown-up') +
      '<section class="dc-kblock"><p class="ws-label">Teach the set (about 10 minutes, 3 to 5 words at a time)</p><ol class="dc-steps">' + ROUTINE.map(function (r) { return '<li>' + r + '</li>'; }).join('') + '</ol></section>' +
      '<section class="dc-kblock"><p class="ws-label">The heart parts</p><p class="hw-klist">' + s.words.map(function (x) {
        return '<span>' + shown(x) + ' <small>' + H.heartPart(x).map(esc).join(', ') + '</small></span>';
      }).join('') + '</p><p>A word is secure when the child writes it right from memory on two different days.</p></section>' +
      foot(s, 'Ontario ' + CODES[s.band]) + '</div>';
  }
  var ZOOM = [1, 0.94, 0.88, 0.82];
  H.render = function (el, s, side) {
    el.innerHTML = (side === 'key' ? key : page)(s);
    var pg = el.firstChild, over, i;
    pg.style.setProperty('--acc', PLAIN.acc);
    pg.style.setProperty('--face', PLAIN.font);
    for (i = 0; i < ZOOM.length; i++) {
      pg.style.setProperty('--z', ZOOM[i]);
      over = $$('.hw-prow, .dc-kblock', pg).some(function (b) { return b.scrollWidth > b.clientWidth + 1; }) || pg.scrollHeight > pg.clientHeight + 1;
      if (!over) break;
    }
    return { over: over };
  };
  function printPart(stage, s) {
    stage.innerHTML = '<div class="dc-do"><button type="button" class="btn" data-print="page">Print the page</button>' +
      '<button type="button" class="btn alt ws-adult" data-print="key">Print the grown-up page</button>' +
      '<p class="ws-hint">On an iPad, tap Print, then Share, then Save to Files to keep a PDF.</p></div>' +
      '<div class="ws-pages"><div class="ws-sheet" data-side="page"></div><div class="ws-sheet ws-adult" data-side="key"></div></div>';
    document.documentElement.classList.add('ws-print');
    $$('[data-print]', stage).forEach(function (b) {
      b.addEventListener('click', function () { document.documentElement.setAttribute('data-dc-print', b.getAttribute('data-print')); window.print(); });
    });
    return A.sheets.fonts().then(function () {
      $$('.ws-sheet', stage).forEach(function (el) { H.render(el, s, el.getAttribute('data-side')); });
      A.sheets.fit();
    });
  }

  /* ---------- every set ---------- */
  function list(root) {
    root.innerHTML = '<div class="dc-lib"><p class="dc-lede">Tricky words, 10 at a time. Only the heart part is learned by heart; the rest sounds out as usual. ' +
      'Look, trace, then write each word from memory. Start at the first set your child is not yet sure of.</p>' +
      BANDS.map(function (bd) {
        var here = H.sets.filter(function (s) { return s.band === bd[0]; });
        return here.length ? '<section class="dc-band"><h2>' + bd[1] + ' <span class="sp-bcodes">Ontario ' + CODES[bd[0]] + '</span></h2><div class="dc-cards">' + here.map(function (s) {
          var done = s.words.filter(function (x) { return H.secure(x.w); }).length;
          return '<a class="dc-card hw-set" href="#tools/hearts/' + s.n + '"><span class="dc-cn">' + s.n + '</span><span class="dc-cm"><b>' +
            s.words.slice(0, 5).map(function (x) { return esc(x.w); }).join(', ') + (s.words.length > 5 ? ' …' : '') + '</b>' +
            '<span class="sp-st' + (done === s.words.length ? ' sp-st-secure' : done ? ' sp-st-practise' : '') + '">' + done + ' of ' + s.words.length + ' secure</span></span></a>';
        }).join('') + '</div></section>' : '';
      }).join('') + '</div>';
  }
  function tool(root, canUndo, rest) {
    root.innerHTML = '<p class="loading">Loading the words…</p>';
    document.documentElement.classList.remove('ws-print');
    H.load().then(function () {
      var bits = (rest || '').split('/'), s = H.find(bits[0]);
      if (s) setPage(root, s, bits[1]);
      else list(root);
    });
    return {};
  }
  var ICON = '<path d="M24 40 C12 32 6 25 6 17 A9 9 0 0 1 24 13 A9 9 0 0 1 42 17 C42 25 36 32 24 40 Z" style="fill:color-mix(in srgb,var(--hi) 35%,var(--card));stroke:var(--ink);stroke-width:2;stroke-linejoin:round"/>' +
    '<path d="M16 22 Q20 18 24 22 T32 22" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/>';
  T.tools.push({ id: 'hearts', shelf: 'spell', name: 'Heart words', icon: ICON, make: tool, undo: false });
})();
