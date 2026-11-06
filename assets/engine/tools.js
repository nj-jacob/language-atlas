/* Language Atlas tool box, shared by every grade: hands-on tools for free play, alone or with a grown-up (page #tools).
   Needs atlas.js, words.js (sound clips) and wordbank.js (the words). No marks and no tasks: the child builds and explores.
     #tools          the first tool          #tools/words    Word builder
   A tool fills the screen under a slim bar (back, the tool's name, Undo, Tools). The Tools menu shows the tools on shelves,
   one shelf per part of Language. To add a tool, add it to TOOLS with its shelf and a function that draws it (see wordBuilder).

   Word builder: one word in three views, linked (a word built in one view opens in the others when the word bank knows it).
     Sounds  letter tiles in sound boxes. Tap a tile to add it; tap a box, then a tile, to swap one sound. Blend plays the
             sounds in order (Noel's recorded clips) and shows the word.
     Beats   a longer word: tap between letters to cut it into beats (syllables). "Show the beats" marks where they go.
     Parts   prefixes, bases (and roots from Grade 7) and suffixes. Each part shows what it means; the word is spelled with the
             spelling rules (drop the e, double the last letter, y changes to i, add es), and its word family is listed.
   Each grade gets the tiles and words for its grade and the grades before (wordbank.js says from which grade each shows). */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$;
  var SHELVES = [['sounds', 'Sounds and letters']];
  var ICON_WORDS = '<rect x="3" y="12" width="13" height="20" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="18" y="12" width="13" height="20" rx="3" style="fill:color-mix(in srgb,var(--hi) 35%,var(--card));stroke:var(--hi);stroke-width:2"/><rect x="33" y="12" width="13" height="20" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><circle cx="9.5" cy="39" r="2.2" style="fill:var(--accent)"/><circle cx="24.5" cy="39" r="2.2" style="fill:var(--accent)"/><circle cx="39.5" cy="39" r="2.2" style="fill:var(--accent)"/>';
  var TOOLS = [{ id: 'words', shelf: 'sounds', name: 'Word builder', icon: ICON_WORDS, make: wordBuilder }];
  var SVG_UNDO = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 0 1 0 10h-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SVG_MENU = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------- the tool box page ---------- */
  A.page('tools', function (app, sub) {
    var cur = TOOLS.filter(function (t) { return t.id === sub; })[0] || TOOLS[0];
    var menu = '<dialog class="tb-menu" aria-labelledby="tbmh"><div class="tb-mh"><h2 id="tbmh">Tools</h2><span class="tb-g">Grade ' + A.grade + '</span>' +
      '<button type="button" class="tb-x" aria-label="Close">&#10005;</button></div>' +
      SHELVES.map(function (s) {
        var on = TOOLS.filter(function (t) { return t.shelf === s[0]; });
        return on.length ? '<section class="tb-shelf"><h3><i class="tb-s-' + s[0] + '"></i>' + s[1] + '</h3><div class="tb-cards">' + on.map(function (t) {
          return '<a class="tb-card" href="#tools/' + t.id + '"' + (t === cur ? ' aria-current="page"' : '') + '><svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' + t.icon + '</svg><span>' + t.name + '</span></a>';
        }).join('') + '</div></section>' : '';
      }).join('') + '</dialog>';
    app.innerHTML = '<div class="wrap wide tb"><div class="tb-bar"><a class="tb-back" href="#home" aria-label="Back to the chapters">&lsaquo;</a><h1>' + cur.name + '</h1><span class="tb-sp"></span>' +
      '<button type="button" class="tb-b" data-a="undo" disabled>' + SVG_UNDO + '<span>Undo</span></button>' +
      '<button type="button" class="tb-b" data-a="menu" aria-haspopup="dialog">' + SVG_MENU + '<span>Tools</span></button></div>' +
      '<div class="tb-stage"></div>' + menu + '</div>';
    var undo = $('[data-a="undo"]', app), dlg = $('.tb-menu', app);
    var tool = cur.make($('.tb-stage', app), function (can) { undo.disabled = !can; });
    undo.addEventListener('click', function () { tool.undo(); });
    $('[data-a="menu"]', app).addEventListener('click', function () { dlg.showModal(); });
    $('.tb-x', dlg).addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('.tb-card')) dlg.close(); });
  });

  /* ---------- spelling: join parts into a word ----------
     ids like 'un-', 'help', '-ful', '-er.more'. Returns { word, rule }: rule names the spelling change, or ''. */
  function text(id) { return id.replace(/^-|-$|\.\w+$/g, ''); }
  function kind(id) { return /^-/.test(id) ? 'suffix' : /-$/.test(id) ? 'prefix' : 'base'; }
  function join(ids) {
    var word = '', stem = '', rule = '';
    ids.forEach(function (id) {
      var t = text(id);
      if (kind(id) !== 'suffix') { word += t; stem = kind(id) === 'base' ? t : stem; return; }
      var head = word.slice(0, word.length - stem.length), vowel = /^[aeiouy]/.test(t);
      if (t === 's' && /(s|x|z|sh|ch)$/.test(stem)) { stem += 'es'; rule = 'add es'; }
      else if (/[^aeiou]y$/.test(stem) && t.charAt(0) !== 'i') { stem = stem.slice(0, -1) + 'i' + t; rule = 'y changes to i'; }
      else if (vowel && /[^aeiou]e$/.test(stem)) { stem = stem.slice(0, -1) + t; rule = 'drop the e'; }
      else if (vowel && /^[^aeiou]*[aeiou][^aeiouwxy]$/.test(stem)) { stem += stem.slice(-1) + t; rule = 'double the last letter'; }
      else stem += t;
      word = head + stem;
    });
    return { word: word, rule: rule };
  }

  /* ---------- the word bank, for this grade ---------- */
  function bank() {
    var B = A.wordbank, g = A.grade;
    var tiles = B.tiles.filter(function (t) { return t[1] <= g; }).map(function (t) { return t[0]; });
    var sounds = B.sounds.map(function (s) {
      var gs = s.split(' ');
      return { word: gs.map(function (x) { return x.split(':')[0]; }).join(''), tiles: gs.map(function (x) { return x.split(':')[0]; }), clips: gs.map(function (x) { return x.split(':')[1] || x; }) };
    }).filter(function (w) { return w.tiles.every(function (t) { return tiles.indexOf(t) >= 0; }); });
    var beats = [];
    Object.keys(B.beats).forEach(function (k) { if (+k <= g) beats = beats.concat(B.beats[k].split(' ')); });
    function shows(id) { var m = B.means[id]; return !m || m[1] <= g; }
    var parts = B.parts.map(function (p) { var s = p.split('='); return { ids: s[0].split('+'), word: s[1] }; })
      .filter(function (e) { return e.ids.every(shows); });
    var used = {};
    parts.forEach(function (e) { e.ids.forEach(function (id) { used[id] = 1; }); });
    var ids = Object.keys(used);
    return {
      tiles: tiles, sounds: sounds, beats: beats, parts: parts,
      prefixes: ids.filter(function (id) { return kind(id) === 'prefix'; }).sort(),
      bases: ids.filter(function (id) { return kind(id) === 'base' && !B.means[id]; }).sort(),
      roots: ids.filter(function (id) { return kind(id) === 'base' && B.means[id]; }).sort(),
      suffixes: ids.filter(function (id) { return kind(id) === 'suffix'; }).sort(function (a, b) { return text(a).localeCompare(text(b)) || a.localeCompare(b); })
    };
  }
  function isVowel(t) { return /[aeiou]/.test(t); }

  /* ---------- Word builder ---------- */
  function wordBuilder(root, canUndo) {
    var K = bank(), g = A.grade, history = [];
    var VIEWS = [['sounds', 'Sounds'], ['beats', 'Beats'], ['parts', 'Parts']];
    var st = {
      view: g <= 3 ? 'sounds' : 'parts', tab: 'cons', ptab: g >= 7 ? 'root' : 'base', sel: -1,
      tiles: ['sh', 'i', 'p'], trail: [],
      beat: g <= 1 ? 'rab-bit' : g <= 3 ? 'but-ter-fly' : 'wa-ter-mel-on', cuts: [], show: false,
      parts: g >= 7 ? ['bio', 'graph', '-y.thing'] : g >= 2 ? ['un-', 'help', '-ful'] : ['jump', '-ing']
    };
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }

    /* the word showing now, so another view can open on the same word */
    function wordNow() {
      if (st.view === 'sounds') return st.tiles.join('');
      if (st.view === 'beats') return st.beat.replace(/-/g, '');
      return join(st.parts).word;
    }
    function openOn(view, word) {
      st.view = view; st.sel = -1;
      if (view === 'sounds') { var s = K.sounds.filter(function (w) { return w.word === word; })[0]; if (s) st.tiles = s.tiles.slice(); }
      if (view === 'beats') { var b = K.beats.filter(function (w) { return w.replace(/-/g, '') === word; })[0]; if (b) { st.beat = b; st.cuts = []; st.show = false; } }
      if (view === 'parts') { var p = K.parts.filter(function (e) { return e.word === word; })[0]; if (p) st.parts = p.ids.slice(); }
    }

    root.innerHTML = '<div class="wb"><div class="wb-tray" aria-label="Tiles"></div><div class="wb-mat"><div class="wb-views" role="tablist">' +
      VIEWS.map(function (v) { return '<button type="button" role="tab" data-v="' + v[0] + '">' + v[1] + '</button>'; }).join('') +
      '</div><div class="wb-body"></div><div class="wb-do"></div></div></div>';
    var tray = $('.wb-tray', root), body = $('.wb-body', root), act = $('.wb-do', root);

    function draw() {
      $$('.wb-views button', root).forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-v') === st.view)); });
      ({ sounds: drawSounds, beats: drawBeats, parts: drawParts })[st.view]();
    }

    /* Sounds: letter tiles in sound boxes */
    function known() {
      var w = st.tiles.join('');
      return K.sounds.filter(function (s) { return s.word === w && s.tiles.join(' ') === st.tiles.join(' '); })[0] || null;
    }
    function drawSounds() {
      var cons = K.tiles.filter(function (t) { return !isVowel(t); }), vow = K.tiles.filter(isVowel);
      tray.innerHTML = '<div class="wb-tabs" role="tablist"><button type="button" role="tab" data-tab="cons" aria-selected="' + (st.tab === 'cons') + '">Consonants</button>' +
        '<button type="button" role="tab" data-tab="vow" aria-selected="' + (st.tab === 'vow') + '">Vowels</button></div><div class="wb-grid">' +
        (st.tab === 'cons' ? cons : vow).map(function (t) { return '<button type="button" class="wb-tile' + (isVowel(t) ? ' wb-v' : '') + '" data-add="' + t + '">' + t + '</button>'; }).join('') + '</div>';
      var k = known(), clips = st.tiles.map(function (t, i) { return k ? k.clips[i] : A.W.clip(t); });
      var w = st.tiles.join(''), pic = A.W.pics.indexOf(w) >= 0 && k ? A.W.pic(w) : '';
      body.innerHTML = '<div class="wb-boxes">' + st.tiles.map(function (t, i) {
        return '<div class="wb-box"><button type="button" class="wb-tile wb-big' + (isVowel(t) ? ' wb-v' : '') + (st.sel === i ? ' wb-sel' : '') + '" data-pick="' + i + '" aria-pressed="' + (st.sel === i) + '">' + t + '</button>' +
          A.W.sound(clips[i], '<span class="sr">' + t + '</span>') + '</div>';
      }).join('') + (st.tiles.length < 6 ? '<div class="wb-box"><span class="wb-slot" aria-hidden="true">+</span></div>' : '') + '</div>' +
        (st.tiles.length ? '<div class="wb-word"><span class="wb-w">' + w + '</span>' + pic + '</div><p class="wb-is">' + (k ? 'a real word' : st.tiles.length > 1 ? 'a made-up word' : '') + '</p>' : '') +
        (st.trail.length > 1 ? '<p class="wb-trail">' + st.trail.map(function (t) { return '<span>' + t + '</span>'; }).join('<i aria-hidden="true">&rarr;</i>') + '</p>' : '');
      act.innerHTML = '<button type="button" class="wb-act wb-go" data-do="blend"' + (st.tiles.length ? '' : ' disabled') + '>Blend <span aria-hidden="true">&rarr;</span></button>' +
        '<button type="button" class="wb-act" data-do="out"' + (st.sel < 0 ? ' disabled' : '') + '>Take out</button>' +
        '<button type="button" class="wb-act" data-do="clear"' + (st.tiles.length ? '' : ' disabled') + '>Clear</button>';
    }
    function noteWord() {
      if (!known()) return;
      var w = st.tiles.join('');
      if (st.trail[st.trail.length - 1] !== w) st.trail = st.trail.concat(w).slice(-5);
    }
    function blend() {
      var k = known(), boxes = $$('.wb-big', body);
      var clips = st.tiles.map(function (t, i) { return k ? k.clips[i] : A.W.clip(t); });
      body.classList.add('wb-blending');
      A.W.playAll(clips, function (i) {
        boxes.forEach(function (b, j) { b.classList.toggle('wb-on', j === i); });
      }, function () {
        boxes.forEach(function (b) { b.classList.remove('wb-on'); });
        body.classList.remove('wb-blending');
        A.bump($('.wb-word', body), 'wb-lift');
      });
    }

    /* Beats: cut a word into syllables */
    function drawBeats() {
      tray.innerHTML = '<p class="wb-lab">Words</p><div class="wb-list">' + K.beats.map(function (b) {
        return '<button type="button" class="wb-chip" data-beat="' + b + '"' + (b === st.beat ? ' aria-pressed="true"' : '') + '>' + b.replace(/-/g, '') + '</button>';
      }).join('') + '</div>';
      var w = st.beat.replace(/-/g, ''), right = [], at = 0;
      st.beat.split('-').forEach(function (p, i, all) { at += p.length; if (i < all.length - 1) right.push(at); });
      var piece = 0, h = '';
      for (var i = 0; i < w.length; i++) {
        if (i) {
          var cut = st.cuts.indexOf(i) >= 0;
          if (cut) piece++;
          h += '<button type="button" class="wb-gap wb-p' + (piece % 2) + (cut ? ' wb-cut' : '') + (st.show && right.indexOf(i) >= 0 ? ' wb-here' : '') + '" data-gap="' + i + '" aria-label="' + (cut ? 'Join' : 'Cut') + ' between ' + w.charAt(i - 1) + ' and ' + w.charAt(i) + '" aria-pressed="' + cut + '"></button>';
        }
        h += '<span class="wb-l wb-p' + (piece % 2) + '">' + w.charAt(i) + '</span>';
      }
      body.innerHTML = '<div class="wb-cutw">' + h + '</div>' +
        (st.show ? '<p class="wb-beats" aria-label="' + (right.length + 1) + ' beats">' + st.beat.split('-').map(function (p) { return '<span><i></i>' + p + '</span>'; }).join('') + '</p>' : '');
      act.innerHTML = '<button type="button" class="wb-act wb-go" data-do="show" aria-pressed="' + st.show + '">' + (st.show ? 'Hide the beats' : 'Show the beats') + '</button>' +
        '<button type="button" class="wb-act" data-do="join"' + (st.cuts.length ? '' : ' disabled') + '>Join up</button>' +
        '<button type="button" class="wb-act" data-do="next">New word</button>';
    }

    /* Parts: prefixes, bases or roots, suffixes */
    function tile(id, attr) {
      var m = A.wordbank.means[id], k = kind(id), root = k === 'base' && m;
      return '<button type="button" class="wt wt-' + k + (root ? ' wt-root' : '') + '" ' + attr + '="' + esc(id) + '">' + text(id) + '</button>';
    }
    function drawParts() {
      var groups = [['pre', 'Before', K.prefixes], ['base', 'Base', K.bases], ['root', 'Roots', K.roots], ['suf', 'After', K.suffixes]].filter(function (gr) { return gr[2].length; });
      var open = groups.filter(function (gr) { return gr[0] === st.ptab; })[0] || groups[1];
      tray.innerHTML = '<div class="wb-tabs" role="tablist">' + groups.map(function (gr) {
        return '<button type="button" role="tab" data-ptab="' + gr[0] + '" aria-selected="' + (gr === open) + '">' + gr[1] + '</button>';
      }).join('') + '</div><div class="wb-list">' + open[2].map(function (id) { return tile(id, 'data-part'); }).join('') + '</div>';
      var J = join(st.parts), entry = K.parts.filter(function (e) { return e.ids.join('+') === st.parts.join('+'); })[0];
      var bases = st.parts.filter(function (id) { return kind(id) === 'base'; });
      var family = K.parts.filter(function (e) { return e.ids.some(function (id) { return bases.indexOf(id) >= 0; }); }).slice(0, 12);
      var plain = st.parts.map(text).join('');
      body.innerHTML = st.parts.length ? '<div class="wb-parts">' + st.parts.map(function (id) {
        var m = A.wordbank.means[id];
        return '<div class="wb-pt">' + tile(id, 'data-drop') + '<small>' + (m ? m[0] : '&nbsp;') + '</small></div>';
      }).join('') + '</div>' +
        '<div class="wb-word"><span class="wb-w">' + J.word + '</span></div>' +
        '<p class="wb-is">' + (entry ? 'a real word' : st.parts.length > 1 ? 'not a word' : '') + '</p>' +
        (J.rule && J.word !== plain ? '<p class="wb-rule"><span>' + st.parts.map(text).join(' + ') + '</span> <i aria-hidden="true">&rarr;</i> <b>' + J.word + '</b> <em>' + J.rule + '</em></p>' : '') +
        (family.length > 1 ? '<div class="wb-fam">' + family.map(function (e) {
          return '<button type="button" class="wb-chip" data-fam="' + esc(e.ids.join('+')) + '"' + (e === entry ? ' aria-pressed="true"' : '') + '>' + e.word + '</button>';
        }).join('') + '</div>' : '') : '<p class="wb-empty">Tap a part to start.</p>';
      act.innerHTML = '<button type="button" class="wb-act" data-do="clear"' + (st.parts.length ? '' : ' disabled') + '>Clear</button>';
    }
    function addPart(id) {
      if (st.parts.length >= 5) return;
      var k = kind(id), p = st.parts, at = p.length;
      if (k === 'prefix') { at = 0; while (at < p.length && kind(p[at]) === 'prefix') at++; }
      if (k === 'base') { at = 0; while (at < p.length && kind(p[at]) !== 'suffix') at++; }
      st.parts = p.slice(0, at).concat(id, p.slice(at));
    }

    /* one listener for every tap in the tool */
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.disabled || b.classList.contains('wsnd')) return;
      var d = b.dataset;
      if (d.v && d.v !== st.view) { var w = wordNow(); change(function () { openOn(d.v, w); }); }
      else if (d.tab) { st.tab = d.tab; draw(); }
      else if (d.ptab) { st.ptab = d.ptab; draw(); }
      else if (d.add) change(function () { if (st.sel >= 0) { st.tiles[st.sel] = d.add; st.sel = -1; } else if (st.tiles.length < 6) st.tiles.push(d.add); noteWord(); });
      else if (d.pick) { st.sel = st.sel === +d.pick ? -1 : +d.pick; draw(); }
      else if (d.gap) change(function () { var n = +d.gap, i = st.cuts.indexOf(n); if (i >= 0) st.cuts.splice(i, 1); else st.cuts.push(n); });
      else if (d.beat) change(function () { st.beat = d.beat; st.cuts = []; st.show = false; });
      else if (d.part) change(function () { addPart(d.part); });
      else if (d.drop) change(function () { st.parts = st.parts.filter(function (id) { return id !== d.drop; }); });
      else if (d.fam) change(function () { st.parts = d.fam.split('+'); });
      else if (d.do === 'blend') blend();
      else if (d.do === 'out') change(function () { st.tiles.splice(st.sel, 1); st.sel = -1; noteWord(); });
      else if (d.do === 'clear') change(function () { if (st.view === 'sounds') { st.tiles = []; st.sel = -1; st.trail = []; } else st.parts = []; });
      else if (d.do === 'show') { st.show = !st.show; draw(); }
      else if (d.do === 'join') change(function () { st.cuts = []; });
      else if (d.do === 'next') change(function () { var o = K.beats.filter(function (x) { return x !== st.beat; }); st.beat = A.R.pick(o); st.cuts = []; st.show = false; });
    });
    st.trail = [st.tiles.join('')];
    draw();
    return { undo: undo };
  }

  /* for the checks (tests/run.js): the spelling rules and the grade's word bank */
  A.toolkit = { join: join, bank: bank, tools: TOOLS };
})();
