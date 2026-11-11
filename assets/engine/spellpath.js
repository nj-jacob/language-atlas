/* Language Atlas tool box: the Spelling path (#tools/spelling), spelling taught step by step, the Orton-Gillingham way.
   Needs atlas.js and tools.js (join and spell); the printed page also needs sheets.js (look, fonts and printing; sheets.css) and
   decodable.js (its line-art pictures). It adds itself to the tool box, on the Spelling shelf.
   Each step is a decodable reader step (same id and order), so the child spells the pattern they have just read. The steps are in
   assets/engine/spellbank.js, loaded when the tool first opens. One step has five parts (#tools/spelling/<step>/<part>):
     build     Sound boxes: a picture or a clue; one box for each sound; tap a letter tile, it goes in the next box (or the box
               picked). A spelling of two or three letters is one tile (ai, igh); a silent-e tile (a_e) is one sound too.
               Check marks each box; a wrong box turns red, only that box. The tray holds the word's sounds and other spellings
               of the same vowel sound, so the child has to choose.
     sort      Spelling choice map: tap a word, then the spelling it uses. Bins with a place (middle, end) sit on a word-shaped map.
     endings   Ending workshop: write the new word, then join. The join shows the rule at work: a letter doubles, the e drops,
               y turns to i (tools.js join works the word out).
     dictate   Dictation pad: the grown-up reads (grown-up view shows the script); the child writes with a finger or pencil on
               lines. The grown-up taps every sound written wrong; Save keeps the day's score and slips (sp:<step>).
               A step is secure when the score is 90% or more on two different days.
     print     A printed page (sound boxes, sort, endings, dictation lines) and a grown-up page (answers, script, rule).
   The rule, the grown-up tip, the common mistake and the codes sit above the parts (tip and mistake in grown-up view only). */
(function () {
  'use strict';
  var A = window.Atlas;
  if (!A || !A.toolkit) return;
  var $ = A.$, $$ = A.$$, T = A.toolkit;
  var SP = (A.spelling = { list: [] });
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  /* a spelling as the child sees it: a_e is a–e */
  function lab(u) { return esc(u).replace(/^(\w)_e$/, '$1&ndash;e'); }
  function word(units, mark) { return T.spell(units, mark); }
  /* a step's name, with a_e shown as a–e */
  function nm(p) { return esc(p.name).replace(/\b(\w)_e\b/g, '$1&ndash;e'); }

  /* ---------- the steps ---------- */
  /* split a word from another step (dictation review) into its spellings, longest first; a silent e rides with its vowel */
  var MULTI = ['igh', 'tch', 'dge', 'sh', 'ch', 'th', 'wh', 'ck', 'ng', 'ai', 'ay', 'ee', 'ea', 'ey', 'oa', 'ow', 'oe', 'ie', 'pp', 'nn', 'll', 'ss', 'ff', 'zz', 'qu'];
  SP.units = function (w) {
    var se = /^(.*)([aeiou])([^aeiou]+)e$/.exec(w), out = [], s = se ? se[1] : w, i = 0;
    while (i < s.length) {
      var m = MULTI.filter(function (u) { return s.substr(i, u.length) === u; })[0] || s.charAt(i);
      out.push(m); i += m.length;
    }
    if (se) { out.push(se[2] + '_e'); out = out.concat(SP.units(se[3])); }
    return out;
  };
  SP.add = function (p) {
    p.n = SP.list.length + 1;
    p.words = p.words.map(function (w) { return { w: w[0], u: w[1].split(' '), clue: w[2] }; });
    if (p.sort) p.sort.list = p.sort.items.split(' ').map(function (it) { var b = it.split('/'); return { w: b[0], bin: +b[1] }; });
    SP.list.push(p);
  };
  SP.find = function (id) { return SP.list.filter(function (p) { return p.id === id; })[0]; };
  SP.code = function (p) { return 'SP-' + (p.n < 10 ? '0' : '') + p.n; };
  /* the new word an ending makes, and the rule at the join */
  SP.ending = function (base, suf) {
    var j = T.join([base, '-' + suf]), rule = j.rule;
    if (!rule && /y$/.test(base) && suf.charAt(0) === 'i') rule = 'keep the y';
    return { word: j.word, rule: rule, base: base, suf: suf };
  };
  /* the dictation: warm-up sounds, 6 of the step's words and 2 review words, then the sentence */
  SP.dictation = function (p) {
    var mine = [1, 3, 4, 6, 8, 9].map(function (i) { return p.words[i]; });
    var rev = (p.review || []).map(function (w) {
      var known = [].concat.apply([], SP.list.map(function (s) { return s.words; })).filter(function (x) { return x.w === w; })[0];
      return known || { w: w, u: SP.units(w) };
    });
    return { sounds: p.focus.filter(function (f) { return /^\w_e$/.test(f) || MULTI.indexOf(f) >= 0; }).concat(p.sounds || []), words: mine.concat(rev), sentence: p.sentence };
  };
  /* Ontario codes: Grade 1 (phonics, segmenting to spell, spelling choices, endings) and the same expectations in Grades 2 and 3 */
  SP.codes = function (p) {
    var g1 = ['B2.3', 'B2.4', 'B2.5'].concat(p.endings ? ['B2.6'] : []);
    var map = { 'B2.3': 'B2.1', 'B2.4': 'B2.1', 'B2.5': 'B2.2', 'B2.6': 'B2.3' };
    return { g1: g1, g2: g1.map(function (c) { return map[c]; }).filter(function (c, i, all) { return all.indexOf(c) === i; }) };
  };
  var LOAD = null;
  SP.load = function () {
    LOAD = LOAD || new Promise(function (ok) {
      var s = document.createElement('script');
      s.src = '../assets/engine/spellbank.js';
      s.onload = ok;
      s.onerror = ok;
      document.head.appendChild(s);
    });
    return LOAD;
  };

  /* ---------- progress: one record a day from the dictation; secure at 90% or more on two different days ---------- */
  SP.record = function (p) { return A.load('sp:' + p.id, { days: [] }); };
  SP.status = function (p) {
    var days = SP.record(p).days;
    if (!days.length) return 'new';
    return days.filter(function (d) { return d.ok / d.of >= 0.9; }).length >= 2 ? 'secure' : 'practise';
  };
  var STATUS = { 'new': 'Not started', practise: 'Practising', secure: 'Secure' };
  function saveDay(p, ok, of, slips) {
    var r = SP.record(p), today = new Date().toISOString().slice(0, 10);
    r.days = r.days.filter(function (d) { return d.d !== today; }).concat([{ d: today, ok: ok, of: of, slips: slips }]).slice(-8);
    A.save('sp:' + p.id, r);
    return r;
  }

  /* ---------- tiles: the word's own spellings and the other spellings of its vowel sound ---------- */
  var FAMILY = [['a_e', 'ai', 'ay', 'a'], ['e_e', 'ee', 'ea', 'ey', 'e'], ['i_e', 'igh', 'ie', 'i', 'y'], ['o_e', 'oa', 'ow', 'oe', 'o'], ['u_e', 'oo', 'u'], ['y', 'ee', 'i', 'igh']];
  var EXTRA = ['t', 'd', 'n', 'm', 's', 'p', 'l', 'r', 'k', 'b'];
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  SP.tray = function (u) {
    var out = u.slice();
    u.forEach(function (x) {
      FAMILY.forEach(function (f) { if (f.indexOf(x) >= 0) f.filter(function (y) { return y !== x; }).slice(0, 3).forEach(function (y) { out.push(y); }); });
    });
    var extra = EXTRA.filter(function (c) { return out.indexOf(c) < 0; });
    out.push(extra[Math.floor(Math.random() * extra.length)]);
    return shuffle(out.filter(function (x, i) { return out.indexOf(x) === i; }));
  };

  /* ---------- the step page ---------- */
  var PARTS = [['build', 'Sound boxes'], ['sort', 'Sort'], ['endings', 'Endings'], ['dictate', 'Dictation'], ['print', 'Print']];
  function parts(p) { return PARTS.filter(function (x) { return (x[0] !== 'sort' || p.sort) && (x[0] !== 'endings' || p.endings); }); }
  function step(root, p, part) {
    var cs = SP.codes(p), all = parts(p), i = SP.list.indexOf(p), prev = SP.list[i - 1], next = SP.list[i + 1];
    if (!all.some(function (x) { return x[0] === part; })) part = 'build';
    root.innerHTML = '<div class="sp-one"><div class="dc-bar"><a class="dc-all" href="#tools/spelling">All steps</a><span class="tb-sp"></span>' +
      (prev ? '<a class="ws-k" href="#tools/spelling/' + prev.id + '/' + part + '" aria-label="Previous step">&lsaquo; Back</a>' : '') +
      (next ? '<a class="ws-k" href="#tools/spelling/' + next.id + '/' + part + '" aria-label="Next step">Next &rsaquo;</a>' : '') + '</div>' +
      '<header class="sp-rule"><p class="sp-focus">' + p.focus.map(function (f) { return '<span>' + lab(f) + '</span>'; }).join('') + '</p>' +
      '<p class="sp-rt">' + esc(p.rule) + '</p></header>' +
      '<div class="coach adult-only sp-coach"><p>' + esc(p.tip) + '</p><p><b>Watch for:</b> ' + esc(p.mistake) + '</p>' +
      '<p class="sp-codes">Ontario Grade 1: ' + cs.g1.join(', ') + ' · Grades 2 and 3: ' + cs.g2.join(', ') + '</p></div>' +
      '<nav class="sp-tabs" aria-label="Parts of this step">' + all.map(function (x) {
        return '<a href="#tools/spelling/' + p.id + '/' + x[0] + '"' + (x[0] === part ? ' aria-current="page"' : '') + '>' + x[1] + '</a>';
      }).join('') + '</nav><div class="sp-stage"></div></div>';
    var stage = $('.sp-stage', root);
    ({ build: build, sort: sort, endings: endings, dictate: dictate, print: printPart })[part](stage, p);
  }

  /* Sound boxes */
  function picture(w) { var D = A.decodable; return D && D.pics && D.pics[w] ? '<svg class="dc-art" viewBox="0 0 100 100" aria-hidden="true">' + D.pics[w] + '</svg>' : ''; }
  function clue(c, blank) { return esc(c).replace('___', blank || '<span class="sp-blank"></span>'); }
  function build(stage, p) {
    var order = shuffle(p.words.slice()), at = 0, fill, pick, tray;
    function draw() {
      var w = order[at], pic = picture(w.w);
      fill = w.u.map(function () { return null; }); pick = 0; tray = SP.tray(w.u);
      stage.innerHTML = '<div class="sp-card sp-build"><p class="sp-count">Word ' + (at + 1) + ' of ' + order.length + '</p>' +
        '<div class="sp-cue">' + (pic ? '<figure class="sp-pic">' + pic + '</figure>' : '') + '<p class="sp-clue">' + clue(w.clue) + '</p></div>' +
        '<p class="sp-say">Say it. Tap a dot for each sound.</p>' +
        '<div class="sp-boxes">' + w.u.map(function (u, i) { return '<div class="sp-box"><button type="button" class="sp-slot" data-i="' + i + '" aria-label="Box ' + (i + 1) + '"></button><span class="sp-dot" data-i="' + i + '"></span></div>'; }).join('') + '</div>' +
        '<div class="sp-tray">' + tray.map(function (t) { return '<button type="button" class="sp-tile' + (/^[aeiouy]/.test(t) ? ' sp-v' : '') + '" data-t="' + esc(t) + '">' + lab(t) + '</button>'; }).join('') + '</div>' +
        '<p class="sp-msg" role="status"></p><div class="sp-do"><button type="button" class="btn alt" data-a="clear">Start again</button><button type="button" class="btn" data-a="check">Check</button></div>' +
        '<p class="adult-only sp-say-g">Say the word: <b>' + esc(w.w) + '</b></p></div>';
      mark();
      $$('.sp-dot', stage).forEach(function (d) { d.addEventListener('click', function () { d.classList.toggle('sp-lit'); }); });
      $$('.sp-slot', stage).forEach(function (b) { b.addEventListener('click', function () { var i = +b.dataset.i; if (fill[i]) fill[i] = null; pick = i; mark(); }); });
      $$('.sp-tile', stage).forEach(function (b) {
        b.addEventListener('click', function () {
          if (pick === null) return;
          fill[pick] = b.dataset.t;
          var nxt = fill.indexOf(null, pick + 1);
          pick = nxt >= 0 ? nxt : fill.indexOf(null);
          if (pick < 0) pick = null;
          mark();
        });
      });
      $('[data-a="clear"]', stage).addEventListener('click', draw.bind(null));
      $('[data-a="check"]', stage).addEventListener('click', check);
    }
    function mark(res) {
      $$('.sp-slot', stage).forEach(function (b, i) {
        b.innerHTML = fill[i] ? lab(fill[i]) : '';
        b.className = 'sp-slot' + (fill[i] ? ' sp-full' + (fill[i].length > 2 ? ' sp-long' : '') : '') + (i === pick ? ' sp-pick' : '') + (res ? (res[i] ? ' sp-ok' : fill[i] ? ' sp-no' : '') : '');
      });
    }
    function check() {
      var w = order[at], res = w.u.map(function (u, i) { return fill[i] === u; }), msg = $('.sp-msg', stage);
      mark(res);
      if (res.every(Boolean)) {
        msg.className = 'sp-msg sp-good';
        msg.innerHTML = '<span class="sp-word">' + word(w.u, true) + '</span>';
        $('.sp-do', stage).innerHTML = at + 1 < order.length ? '<button type="button" class="btn" data-a="next">Next word</button>' : '<button type="button" class="btn" data-a="again">Spell them again</button>';
        var b = $('[data-a="next"], [data-a="again"]', stage);
        b.addEventListener('click', function () { if (b.dataset.a === 'next') at++; else { order = shuffle(order); at = 0; } draw(); });
        b.focus();
      } else {
        msg.className = 'sp-msg';
        msg.textContent = fill.indexOf(null) >= 0 ? 'Fill every box. One sound in each.' : 'Look at the red box. Say the word again, slowly.';
      }
    }
    draw();
  }

  /* Spelling choice map (or plain columns) */
  var WHERE = [['start', 'Start of a word'], ['middle', 'Middle of a word'], ['end', 'End of a word']];
  function shape(at) { return '<span class="sp-shape">' + WHERE.map(function (z) { return '<i' + (z[0] === at ? ' class="sp-here"' : '') + '></i>'; }).join('') + '</span>'; }
  function sort(stage, p) {
    var s = p.sort, onMap = s.bins.every(function (b) { return b[2]; }), sel = null, left = shuffle(s.list.slice());
    function bin(b, i) { return '<button type="button" class="sp-bin" data-b="' + i + '"><span class="sp-bl">' + (b[1] === b[0] ? lab(b[0]) : esc(b[1])) + '</span><span class="sp-got"></span></button>'; }
    var bins = onMap ? '<div class="sp-map">' + WHERE.filter(function (z) { return s.bins.some(function (b) { return b[2] === z[0]; }); }).map(function (z) {
      return '<div class="sp-zone"><h3>' + shape(z[0]) + z[1] + '</h3>' + s.bins.map(function (b, i) { return b[2] === z[0] ? bin(b, i) : ''; }).join('') + '</div>';
    }).join('') + '</div>' : '<div class="sp-cols" style="--n:' + s.bins.length + '">' + s.bins.map(bin).join('') + '</div>';
    stage.innerHTML = '<div class="sp-card sp-sort"><p class="sp-q">' + esc(s.q) + '</p>' + bins +
      '<div class="sp-words">' + left.map(function (it, i) { return '<button type="button" class="sp-wc" data-i="' + i + '">' + esc(it.w) + '</button>'; }).join('') + '</div>' +
      '<p class="sp-msg" role="status">Tap a word, then tap where it goes.</p></div>';
    var msg = $('.sp-msg', stage);
    $$('.sp-wc', stage).forEach(function (c) {
      c.addEventListener('click', function () { if (sel) sel.classList.remove('sp-sel'); sel = c; c.classList.add('sp-sel'); msg.className = 'sp-msg'; msg.textContent = 'Where does ' + left[+c.dataset.i].w + ' go?'; });
    });
    $$('.sp-bin', stage).forEach(function (b) {
      b.addEventListener('click', function () {
        if (!sel) return;
        var it = left[+sel.dataset.i];
        if (it.bin === +b.dataset.b) {
          $('.sp-got', b).insertAdjacentHTML('beforeend', '<span>' + esc(it.w) + '</span>');
          sel.remove(); sel = null;
          var done = !$('.sp-wc', stage);
          msg.className = 'sp-msg sp-good';
          msg.textContent = done ? 'All sorted.' : 'Yes. Next word.';
          if (done) $('.sp-words', stage).innerHTML = '<button type="button" class="btn alt" data-a="again">Sort again</button>';
          if (done) $('[data-a="again"]', stage).addEventListener('click', function () { sort(stage, p); });
        } else {
          b.classList.remove('sp-shake'); void b.offsetWidth; b.classList.add('sp-shake');
          msg.className = 'sp-msg';
          msg.textContent = onMap ? 'Look where the sound is in ' + it.w + ': the middle or the end?' : 'Look at the letters in ' + it.w + ' again.';
        }
      });
    });
  }

  /* Ending workshop */
  var SAYS = { 'drop the e': 'The ending starts with a vowel, so the e drops off.', 'double the last letter': 'One short vowel and one last letter: double it, so the vowel stays short.',
    'y changes to i': 'A letter comes before the y, so the y turns to i.', 'keep the y': 'Before -ing, keep the y.', '': 'Nothing changes. Just add the ending.' };
  function joined(e) {
    var b = e.base, s = '<span class="sp-suf">' + esc(e.suf) + '</span>';
    if (e.rule === 'drop the e') return esc(b.slice(0, -1)) + '<span class="sp-gone">e</span>' + s;
    if (e.rule === 'double the last letter') return esc(b) + '<span class="sp-add">' + esc(b.slice(-1)) + '</span>' + s;
    if (e.rule === 'y changes to i') return esc(b.slice(0, -1)) + '<span class="sp-swap">i</span>' + s;
    return esc(b) + s;
  }
  function endings(stage, p) {
    var at = 0;
    function draw() {
      var e = SP.ending(p.endings[at][0], p.endings[at][1]);
      stage.innerHTML = '<div class="sp-card sp-end"><div class="sp-pairs">' + p.endings.map(function (x, i) {
        return '<button type="button" class="sp-wc' + (i === at ? ' sp-sel' : '') + '" data-i="' + i + '">' + esc(x[0]) + ' + ' + esc(x[1]) + '</button>';
      }).join('') + '</div>' +
        '<div class="sp-bench"><span class="sp-piece">' + esc(e.base) + '</span><span class="sp-plus">+</span><span class="sp-piece sp-sufp">' + esc(e.suf) + '</span></div>' +
        '<label class="sp-try"><span>Write the new word</span><input id="sp-end-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"></label>' +
        '<div class="sp-do"><button type="button" class="btn" data-a="join">Join them</button></div><p class="sp-msg" role="status"></p></div>';
      $$('.sp-pairs .sp-wc', stage).forEach(function (b) { b.addEventListener('click', function () { at = +b.dataset.i; draw(); }); });
      $('[data-a="join"]', stage).addEventListener('click', function () {
        var typed = $('#sp-end-in', stage).value.trim().toLowerCase(), msg = $('.sp-msg', stage);
        $('.sp-bench', stage).innerHTML = '<span class="sp-joined">' + joined(e) + '</span>';
        msg.className = 'sp-msg' + (typed === e.word ? ' sp-good' : '');
        msg.innerHTML = '<b>' + esc(SAYS[e.rule]) + '</b>' + (typed ? (typed === e.word ? ' You wrote it right.' : ' You wrote ' + esc(typed) + '. Look at the join.') : '');
        $('.sp-do', stage).innerHTML = at + 1 < p.endings.length ? '<button type="button" class="btn" data-a="next">Next</button>' : '';
        var n = $('[data-a="next"]', stage);
        if (n) n.addEventListener('click', function () { at++; draw(); });
      });
    }
    draw();
  }

  /* Dictation pad */
  function pad(c) {
    var ctx, down = false, w = 0;
    function size() {
      var r = c.getBoundingClientRect(), d = window.devicePixelRatio || 1;
      if (!r.width || Math.round(r.width) === w) return;
      w = Math.round(r.width);
      c.width = r.width * d; c.height = r.height * d;
      ctx = c.getContext('2d'); ctx.scale(d, d); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 3;
    }
    size();
    window.addEventListener('resize', size);
    function pt(e) { var r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    c.addEventListener('pointerdown', function (e) { size(); down = true; c.setPointerCapture(e.pointerId); ctx.strokeStyle = getComputedStyle(c).getPropertyValue('--ink').trim(); var q = pt(e); ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[0] + 0.1, q[1]); ctx.stroke(); });
    c.addEventListener('pointermove', function (e) { if (!down) return; var q = pt(e); ctx.lineTo(q[0], q[1]); ctx.stroke(); });
    ['pointerup', 'pointercancel'].forEach(function (ev) { c.addEventListener(ev, function () { down = false; }); });
    c.wipe = function () { if (ctx) ctx.clearRect(0, 0, c.width, c.height); };
  }
  function marks(items) { return '<div class="sp-marks adult-only">' + items.map(function (x) { return '<button type="button" class="sp-mk" aria-pressed="false" data-u="' + esc(x) + '">' + lab(x) + '</button>'; }).join('') + '</div>'; }
  function dictate(stage, p) {
    var d = SP.dictation(p), sent = d.sentence.replace(/[.!?]$/, '').split(' ');
    function line(n, label, items, cls) {
      return '<div class="sp-line' + (cls ? ' ' + cls : '') + '"><div class="sp-ln"><b>' + n + '</b><canvas aria-label="Writing line ' + n + '"></canvas></div>' +
        (label ? '<p class="sp-script adult-only">' + label + '</p>' : '') + marks(items) + '</div>';
    }
    stage.innerHTML = '<div class="sp-card sp-dict"><p class="sp-lede">Your grown-up says each one. Write it on its line.</p>' +
      '<p class="adult-only sp-how">Say each sound or word twice. The child says it back, taps the sounds, then writes. Tap any sound written wrong, then Save.</p>' +
      '<h3 class="sp-h">Sounds</h3>' + line('✎', 'Say the sounds: ' + d.sounds.map(function (s) { return '/' + lab(s) + '/'; }).join(' '), d.sounds, 'sp-wide') +
      '<h3 class="sp-h">Words</h3><div class="sp-grid">' + d.words.map(function (w, i) { return line(i + 1, '<b>' + esc(w.w) + '</b>', w.u); }).join('') + '</div>' +
      '<h3 class="sp-h">Sentence</h3>' + line('✎', '<b>' + esc(d.sentence) + '</b>', sent, 'sp-wide') +
      '<div class="sp-sum adult-only" role="status"></div>' +
      '<div class="sp-do"><button type="button" class="btn alt" data-a="wipe">Clear the writing</button><button type="button" class="btn adult-only" data-a="save">Save today</button></div>' +
      '<div class="sp-hist adult-only"></div></div>';
    $$('canvas', stage).forEach(pad);
    var all = $$('.sp-mk', stage);
    function sum() {
      var bad = all.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; });
      $('.sp-sum', stage).innerHTML = '<b>' + (all.length - bad.length) + ' of ' + all.length + ' right</b> (' + Math.round(100 * (all.length - bad.length) / all.length) + '%)' +
        (bad.length ? ' · Slipped: ' + bad.map(function (b) { return '<span>' + b.innerHTML + '</span>'; }).join(' ') : '');
      return bad.map(function (b) { return b.dataset.u; });
    }
    function hist() {
      var r = SP.record(p).days.slice(-4).reverse();
      $('.sp-hist', stage).innerHTML = r.length ? '<p><b>' + STATUS[SP.status(p)] + '.</b> Secure means 90% or more on two different days.</p><ul>' + r.map(function (x) {
        return '<li>' + x.d + ': ' + x.ok + ' of ' + x.of + (x.slips.length ? ' · slipped ' + x.slips.map(lab).join(', ') : '') + '</li>';
      }).join('') + '</ul>' : '';
    }
    all.forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); sum(); }); });
    $('[data-a="wipe"]', stage).addEventListener('click', function () { $$('canvas', stage).forEach(function (c) { c.wipe(); }); });
    $('[data-a="save"]', stage).addEventListener('click', function (e) {
      var slips = sum();
      saveDay(p, all.length - slips.length, all.length, slips);
      hist();
      e.target.textContent = 'Saved';
    });
    sum(); hist();
  }

  /* ---------- the printed page ---------- */
  var PLAIN = { acc: 'var(--accent)', font: 'var(--display)', mark: '<path d="M14 40 L36 12 L44 20 L22 48 L12 50 Z M32 17 L40 25" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>' };
  function head(p, kind) {
    return '<header class="dc-head"><p class="ws-kick"><svg viewBox="0 0 56 56" aria-hidden="true">' + PLAIN.mark + '</svg>Spelling path · ' + esc(p.group) + (kind ? ' · ' + kind : '') + '</p>' +
      (kind ? '' : '<div class="ws-name dc-name"><span>Name</span><i></i><span>Date</span><i></i></div>') +
      '<h2 class="dc-title">Spell it: ' + nm(p) + '</h2></header>';
  }
  function foot(p, left) { return '<footer class="dc-foot"><p class="ws-line dc-line"><span>' + left + '</span><span>' + SP.code(p) + '</span></p></footer>'; }
  SP.boxWords = function (p) { return [0, 2, 5, 7].map(function (i) { return p.words[i]; }); };
  function page(p) {
    var d = SP.dictation(p), ends = (p.endings || []).slice(0, 4);
    return '<div class="ws-page dc-page sp-page">' + head(p) +
      '<section class="sp-pband"><p class="sp-pfocus">' + p.focus.map(lab).join(' ') + '</p><div><p class="sp-prule">' + esc(p.rule) + '</p>' +
      '<p class="sp-pheart"><span class="ws-label">Heart word</span><span class="sp-trace">' + esc(p.heart[0]) + '</span><i></i><i></i></p></div></section>' +
      '<section class="sp-psec"><p class="ws-label">1 · Sound boxes: one sound in each box</p><div class="sp-pboxes">' + SP.boxWords(p).map(function (w) {
        var pic = picture(w.w);
        return '<div class="sp-pb">' + (pic ? '<div class="sp-ppic">' + pic + '</div>' : '') + '<p>' + clue(w.clue) + '</p><div class="sp-prow">' + w.u.map(function () { return '<i></i>'; }).join('') + '</div></div>';
      }).join('') + '</div></section>' +
      (p.sort ? '<section class="sp-psec"><p class="ws-label">2 · Sort: ' + esc(p.sort.q) + '</p><p class="sp-pbank">' + p.sort.list.map(function (it) { return esc(it.w); }).join(' · ') + '</p>' +
        '<div class="sp-pcols" style="--n:' + p.sort.bins.length + '">' + p.sort.bins.map(function (b) {
          return '<div><p class="sp-pbin">' + (b[1] === b[0] ? lab(b[0]) : esc(b[1])) + (b[2] ? ' <span>' + b[2] + '</span>' : '') + '</p><div class="sp-plines"></div></div>';
        }).join('') + '</div></section>' : '') +
      (ends.length ? '<section class="sp-psec"><p class="ws-label">3 · Add the ending</p><div class="sp-pends">' + ends.map(function (e) {
        return '<p>' + esc(e[0]) + ' + ' + esc(e[1]) + ' = <span class="ws-blank ws-word"></span></p>';
      }).join('') + '</div></section>' : '') +
      '<section class="sp-psec sp-pdict"><p class="ws-label">' + (ends.length ? 4 : p.sort ? 3 : 2) + ' · Dictation: your grown-up says each word</p><div class="sp-pdl">' +
      d.words.map(function (w, i) { return '<p><b>' + (i + 1) + '</b><i></i></p>'; }).join('') + '</div><p class="sp-psent"><b>&#9998;</b><i></i></p></section>' +
      foot(p, 'Language Atlas · Spelling path · ' + nm(p)) + '</div>';
  }
  var ROUTINE = ['<b>Rule.</b> Show the spelling. The child says its sound while writing it in the air, then on the table with a finger.',
    '<b>Sound boxes.</b> Say the word. The child says it back, taps a finger for each sound, then writes one sound in each box.',
    '<b>Sort.</b> The child reads each word in the bank, then writes it under its spelling.',
    '<b>Dictation.</b> Say each word twice. Say it, spell it aloud, write it, read it back (Simultaneous Oral Spelling). Mark each sound, not the whole word.',
    '<b>Fix it.</b> The child finds the wrong sound and writes the word again. Words missed today come back next time.'];
  function key(p) {
    var d = SP.dictation(p), cs = SP.codes(p), ends = (p.endings || []).slice(0, 4);
    return '<div class="ws-page dc-page dc-keyp ws-key sp-page">' + head(p, 'For the grown-up') +
      '<section class="dc-kblock"><p class="ws-label">The rule</p><p>' + esc(p.tip) + '</p><p><b>Watch for:</b> ' + esc(p.mistake) + '</p></section>' +
      '<section class="dc-kblock"><p class="ws-label">Teach the page (about 15 minutes)</p><ol class="dc-steps">' + ROUTINE.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></section>' +
      '<section class="dc-kblock"><p class="ws-label">Answers</p><p class="ws-ans"><b>Sound boxes:</b> ' + SP.boxWords(p).map(function (w) { return w.u.map(lab).join(' | '); }).join(' &nbsp;·&nbsp; ') + '</p>' +
      (p.sort ? '<p class="ws-ans"><b>Sort:</b> ' + p.sort.bins.map(function (b, i) {
        return (b[1] === b[0] ? lab(b[0]) : esc(b[1])) + ': ' + p.sort.list.filter(function (it) { return it.bin === i; }).map(function (it) { return esc(it.w); }).join(', ');
      }).join(' &nbsp;·&nbsp; ') + '</p>' : '') +
      (ends.length ? '<p class="ws-ans"><b>Endings:</b> ' + ends.map(function (e) { return esc(SP.ending(e[0], e[1]).word); }).join(', ') + '</p>' : '') + '</section>' +
      '<section class="dc-kblock"><p class="ws-label">Dictation script</p><p><b>Sounds:</b> ' + d.sounds.map(function (s) { return '/' + lab(s) + '/'; }).join(' ') +
      ' &nbsp; <b>Words:</b> ' + d.words.map(function (w, i) { return (i + 1) + ' ' + esc(w.w); }).join(', ') + ' &nbsp; <b>Sentence:</b> ' + esc(d.sentence) + '</p>' +
      '<p>Secure means 90% or more of the sounds right on two different days. Then go on to the next step.</p></section>' +
      foot(p, 'Ontario Grade 1: ' + cs.g1.join(', ') + ' · Grades 2 and 3: ' + cs.g2.join(', ')) + '</div>';
  }
  var ZOOM = [1, 0.96, 0.92, 0.88, 0.84, 0.8];
  SP.render = function (el, p, side) {
    el.innerHTML = (side === 'key' ? key : page)(p);
    var pg = el.firstChild, over, i;
    pg.style.setProperty('--acc', PLAIN.acc);
    pg.style.setProperty('--face', PLAIN.font);
    for (i = 0; i < ZOOM.length; i++) {
      pg.style.setProperty('--z', ZOOM[i]);
      over = $$('.sp-psec, .dc-kblock', pg).some(function (b) { return b.scrollWidth > b.clientWidth + 1; }) || pg.scrollHeight > pg.clientHeight + 1;
      if (!over) break;
    }
    return { over: over };
  };
  function printPart(stage, p) {
    stage.innerHTML = '<div class="dc-do"><button type="button" class="btn" data-print="page">Print the page</button>' +
      '<button type="button" class="btn alt ws-adult" data-print="key">Print the grown-up page</button>' +
      '<p class="ws-hint">On an iPad, tap Print, then Share, then Save to Files to keep a PDF.</p></div>' +
      '<div class="ws-pages"><div class="ws-sheet" data-side="page"></div><div class="ws-sheet ws-adult" data-side="key"></div></div>';
    document.documentElement.classList.add('ws-print');
    $$('[data-print]', stage).forEach(function (b) {
      b.addEventListener('click', function () { document.documentElement.setAttribute('data-dc-print', b.getAttribute('data-print')); window.print(); });
    });
    return A.sheets.fonts().then(function () {
      $$('.ws-sheet', stage).forEach(function (el) { SP.render(el, p, el.getAttribute('data-side')); });
      A.sheets.fit();
    });
  }

  /* ---------- every step ---------- */
  function list(root) {
    var groups = SP.list.map(function (p) { return p.group; }).filter(function (g, i, all) { return all.indexOf(g) === i; });
    root.innerHTML = '<div class="dc-lib"><p class="dc-lede">Spelling, one step at a time, in the same order as the decodable readers: read a pattern, then spell it. ' +
      'Each step has sound boxes, a sort, endings, a dictation and a page to print. Start at the first step your child is not yet sure of.</p>' +
      '<section class="dc-band"><h2>Grade 1</h2>' + groups.map(function (g) {
        return '<h3 class="dc-part">' + esc(g) + ' <span>Ontario B2.3, B2.4, B2.5</span></h3><div class="dc-cards">' + SP.list.filter(function (p) { return p.group === g; }).map(function (p) {
          var st = SP.status(p);
          return '<a class="dc-card" href="#tools/spelling/' + p.id + '"><span class="dc-cn">' + p.n + '</span><span class="dc-cf">' + p.focus.map(function (f) { return '<span>' + lab(f) + '</span>'; }).join(' ') + '</span>' +
            '<span class="dc-cm"><b>' + nm(p) + '</b><span class="sp-st sp-st-' + st + '">' + STATUS[st] + '</span></span></a>';
        }).join('') + '</div>';
      }).join('') + '</section></div>';
  }
  function tool(root, canUndo, rest) {
    root.innerHTML = '<p class="loading">Loading the steps…</p>';
    document.documentElement.classList.remove('ws-print');
    SP.load().then(function () {
      var bits = (rest || '').split('/'), p = SP.find(bits[0]);
      if (p) step(root, p, bits[1] || 'build');
      else list(root);
    });
    return {};
  }
  var ICON = '<rect x="3" y="14" width="13" height="18" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="18" y="14" width="13" height="18" rx="3" style="fill:color-mix(in srgb,var(--hi) 35%,var(--card));stroke:var(--hi);stroke-width:2"/>' +
    '<rect x="33" y="14" width="13" height="18" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><path d="M6 40 Q14 36 22 40 T38 40" style="fill:none;stroke:var(--accent);stroke-width:2.6;stroke-linecap:round"/>';
  T.tools.push({ id: 'spelling', shelf: 'spell', name: 'Spelling path', icon: ICON, make: tool, undo: false });
})();
