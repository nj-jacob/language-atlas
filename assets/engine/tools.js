/* Language Atlas tool box, shared by every grade: hands-on tools for free play, alone or with a grown-up (page #tools).
   Needs atlas.js, words.js (sound clips), wordbank.js (the words) and cardbank.js (the sentence cards). No marks and no tasks: the child builds and explores.
     #tools          every tool, on shelves  #tools/sounds   Sound board (soundboard.js adds it first)
     #tools/words    Word builder            #tools/sentences    Sentence builder
     #tools/read     Reading window (reader.js adds it)   #tools/maps   Text maps (textmaps.js)
     #tools/shades   Word shades         #tools/web      Word web (meaning.js adds both)
     #tools/paragraph  Paragraph builder #tools/letters  Letter pad (writetools.js adds both)
     #tools/passages   Reading passages, Grades 4 to 8 (library.js)
   A tool fills the screen under a slim bar (back to all tools, the tool's name, Undo, Tools). The Tools menu shows the tools on
   the same shelves, one shelf per part of Language. A tool opened from the site's own Toolbox page (Math Atlas tools.html, which
   sets atlas:toolbox in this tab's session storage) goes back there instead; A.toolkit.shelves lets that page draw these shelves. To add a tool, add it to TOOLS with its shelf and a function that draws it (see wordBuilder):
   make(stage, canUndo, rest) gets the part of the address after the tool's id (#tools/passages/g5-potholes gives 'g5-potholes').
   A tool can start in a later grade (from: 4) and can have no Undo (undo: false).

   Word builder: one word in three views, linked (a word built in one view opens in the others when the word bank knows it).
     Sounds  letter tiles in sound boxes. Tap a tile to add it; tap a box, then a tile, to swap one sound. Blend plays the
             sounds in order (Noel's recorded clips) and shows the word. A silent-e tile (a-e) puts its e after the next tile:
             c, a-e, k spells cake, and the word shows the vowel and its e joined.
     Beats   a longer word: tap between letters to cut it into beats (syllables). Each beat shows its syllable type (closed,
             open, silent e, vowel team, with r, consonant-le; an ending such as -tion from Grade 4) and plays the vowel sound
             that type gives, so a wrong cut shows straight away (tig-er gives /i/, ti-ger gives /igh/). From Grade 2 each cut
             shows its pattern (VC/CV rabbit, V/CV tiger, VC/V camel, V/V lion, three consonants ostrich, consonant-le, two
             words) and, when the cuts are right, the strong beat. "Mark vowels" puts v over the vowels and c over the
             consonants between them; "Show the beats" marks where the cuts go; "Find a type" lists the words with that type.
     Parts   prefixes, bases (and roots from Grade 7) and suffixes. Each part shows what it means; the word is spelled with the
             spelling rules (drop the e, double the last letter, y changes to i, add es), and its word family is listed.
   Each grade gets the tiles and words for its grade and the grades before (wordbank.js says from which grade each shows).

   Sentence builder (#tools/sentences): word cards coloured by their job (who or what, does, where or when, how, joins, marks;
   cardbank.js). Curriculum B3.1 (sentence types: simple, compound, complex; fragments and run-ons), B3.2 (active and passive
   voice, Grade 6) and B3.3 (end marks, commas, semicolons). Tap a card in the tray to add it; tap a card in the sentence to pick it,
   then move it, take it out, or tap a tray card to swap it. Under each sentence, ticks show who or what, does, a mark at the end,
   and from Grade 3 whether it stands alone (one part can stand alone, none is crammed with two sentences).
     Join two      joins two sentences with a joining word (a comma first for and, but, so, or from Grade 3; ; from Grade 7)
     Split         the opposite: the joining word becomes a full stop
     To the front  moves a where-or-when card, or a part starting with because, when, although ..., to the front with a comma
                   (Grade 3+); pressed again it goes back to the end
     Make it passive / active   Leo fed my dog <-> My dog was fed by Leo (Grade 6+)
     Clauses       (Grade 3+, on from Grade 7) marks each clause: can stand alone, or cannot
     Show jobs     off: plain cards, so a grown-up can ask what job each card does */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$;
  var SHELVES = [['sounds', 'Sounds and letters'], ['mean', 'Words and meaning'], ['sent', 'Sentences'], ['read', 'Reading'], ['write', 'Writing']];
  var ICON_WORDS = '<rect x="3" y="12" width="13" height="20" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="18" y="12" width="13" height="20" rx="3" style="fill:color-mix(in srgb,var(--hi) 35%,var(--card));stroke:var(--hi);stroke-width:2"/><rect x="33" y="12" width="13" height="20" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><circle cx="9.5" cy="39" r="2.2" style="fill:var(--accent)"/><circle cx="24.5" cy="39" r="2.2" style="fill:var(--accent)"/><circle cx="39.5" cy="39" r="2.2" style="fill:var(--accent)"/>';
  var ICON_SENT = '<rect x="2" y="16" width="14" height="14" rx="3" style="fill:color-mix(in srgb,var(--sb) 14%,var(--card));stroke:var(--sb);stroke-width:2"/><rect x="18" y="16" width="12" height="14" rx="3" style="fill:color-mix(in srgb,var(--sd) 14%,var(--card));stroke:var(--sd);stroke-width:2"/><rect x="32" y="16" width="14" height="14" rx="3" style="fill:color-mix(in srgb,var(--sa) 14%,var(--card));stroke:var(--sa);stroke-width:2"/><circle cx="44" cy="38" r="2.4" style="fill:var(--ink)"/>';
  var TOOLS = [{ id: 'words', shelf: 'sounds', name: 'Word builder', icon: ICON_WORDS, make: wordBuilder },
    { id: 'sentences', shelf: 'sent', name: 'Sentence builder', icon: ICON_SENT, make: sentenceBuilder }];
  var SVG_UNDO = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 7L4 12l5 5M4 12h11a5 5 0 0 1 0 10h-3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var SVG_MENU = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------- the tool box page ---------- */
  /* grade: the grade whose tools to show (a tool with from: 4 starts in Grade 4); the page's own grade when not given */
  function shelves(href, cur, grade) {
    grade = grade || A.grade;
    return SHELVES.map(function (s) {
      var on = TOOLS.filter(function (t) { return t.shelf === s[0] && !(t.from > grade); });
      return on.length ? '<section class="tb-shelf"><h3><i class="tb-s-' + s[0] + '"></i>' + s[1] + '</h3><div class="tb-cards">' + on.map(function (t) {
        return '<a class="tb-card" href="' + href(t.id) + '"' + (t.id === cur ? ' aria-current="page"' : '') + '><svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' + t.icon + '</svg><span>' + t.name + '</span></a>';
      }).join('') + '</div></section>' : '';
    }).join('');
  }
  function toolHref(id) { return '#tools/' + id; }
  function fromBox(on) {
    try { if (on === false) sessionStorage.removeItem('atlas:toolbox'); return sessionStorage.getItem('atlas:toolbox') === '1'; } catch (e) { return false; }
  }
  A.page('tools', function (app, sub) {
    var cut = sub.indexOf('/'), rest = cut < 0 ? '' : sub.slice(cut + 1);
    sub = cut < 0 ? sub : sub.slice(0, cut);
    var cur = TOOLS.filter(function (t) { return t.id === sub && !(t.from > A.grade); })[0];
    if (!cur) {
      fromBox(false);
      app.innerHTML = '<div class="wrap wide tb-all"><p class="crumb"><a href="#home">All chapters</a></p><header class="chead"><h1>Toolbox</h1>' +
        '<p class="lede">Hands-on tools for sounds, words, sentences, reading and writing. Pick one.</p></header><div class="tb-list">' + shelves(toolHref) + '</div></div>';
      return;
    }
    var back = fromBox() ? '<a class="tb-back" href="../../tools.html" aria-label="Back to the Toolbox">' : '<a class="tb-back" href="#tools" aria-label="Back to all tools">';
    var menu = '<dialog class="tb-menu" aria-labelledby="tbmh"><div class="tb-mh"><h2 id="tbmh">Tools</h2><span class="tb-g">Grade ' + A.grade + '</span>' +
      '<button type="button" class="tb-x" aria-label="Close">&#10005;</button></div>' + shelves(toolHref, cur.id) + '</dialog>';
    app.innerHTML = '<div class="wrap wide tb"><div class="tb-bar">' + back + '&lsaquo;</a><h1>' + cur.name + '</h1><span class="tb-sp"></span>' +
      (cur.undo === false ? '' : '<button type="button" class="tb-b" data-a="undo" disabled>' + SVG_UNDO + '<span>Undo</span></button>') +
      '<button type="button" class="tb-b" data-a="menu" aria-haspopup="dialog">' + SVG_MENU + '<span>Tools</span></button></div>' +
      '<div class="tb-stage"></div>' + menu + '</div>';
    var undo = $('[data-a="undo"]', app), dlg = $('.tb-menu', app);
    var tool = cur.make($('.tb-stage', app), function (can) { undo.disabled = !can; }, rest);
    if (undo) undo.addEventListener('click', function () { tool.undo(); });
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

  /* ---------- sound tiles: spell a word from them ----------
     A silent-e tile ('a_e') is one sound in two places: its vowel here, its e after the next tile (or at the end).
     spell(tiles, true) marks the vowel and its e so the word can show them joined. */
  function label(t) { return t.replace('_', '&ndash;'); }
  function spell(tiles, mark) {
    var out = '', e = 0;
    tiles.forEach(function (t, i) {
      var split = /^(\w)_e$/.exec(t);
      if (split) { out += mark ? '<b class="wb-se">' + split[1] + '</b>' : split[1]; e = i + 1; return; }
      out += t;
      if (e && i === e) { out += mark ? '<b class="wb-se">e</b>' : 'e'; e = 0; }
    });
    if (e) out += mark ? '<b class="wb-se">e</b>' : 'e';
    return out;
  }

  /* ---------- the word bank, for this grade ---------- */
  function bank() {
    var B = A.wordbank, g = A.grade;
    var tiles = B.tiles.filter(function (t) { return t[1] <= g; }).map(function (t) { return t[0]; });
    var sounds = B.sounds.map(function (s) {
      var gs = s.split(' ');
      var tiles = gs.map(function (x) { return x.split(':')[0]; });
      return { word: spell(tiles), tiles: gs.map(function (x) { return x.split(':')[0]; }), clips: gs.map(function (x) { return x.split(':')[1] || x; }) };
    }).filter(function (w) { return w.tiles.every(function (t) { return tiles.indexOf(t) >= 0; }); });
    var beats = [];
    Object.keys(B.beats).forEach(function (k) { if (+k <= g) beats = beats.concat(B.beats[k].split(' ').map(beatWord)); });
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

  /* ---------- syllables (Beats): the six syllable types, the vowel sound each gives, and how a word splits ---------- */
  var KINDS = { closed: 'Closed', open: 'Open', silente: 'Silent e', team: 'Vowel team', r: 'With r', le: 'Consonant-le', end: 'Ending' };
  var SHORT = { a: 'a', e: 'e', i: 'i', o: 'o', u: 'u', y: 'i' }, LONG = { a: 'ai', e: 'ee', i: 'igh', o: 'oa', u: 'ue', y: 'ee' };
  var TEAMS = { ai: 'ai', ay: 'ai', ee: 'ee', ea: 'ee', ey: 'ee', ie: 'igh', igh: 'igh', oa: 'oa', oe: 'oa', oo: 'oo', ou: 'ow', ow: 'ow', oi: 'oy', oy: 'oy', au: 'or', aw: 'or', ew: 'oo', ue: 'oo', ui: 'oo', ei: 'ai', eigh: 'ai' };
  var RS = { ar: 'ar', or: 'or', er: 'er', ir: 'er', ur: 'er', air: 'air', are: 'air', ear: 'ear', eer: 'ear', oar: 'or', ore: 'or', our: 'or' };
  var NAMES = { 'VC/CV': 'rabbit', 'V/CV': 'tiger', 'VC/V': 'camel', 'V/V': 'lion' };
  /* 'BUT-ter-fly=fly:igh' -> { w: 'butterfly', parts: ['but','ter','fly'], joins: ['-','-'], strong: 0, clips: { fly: 'igh' } } */
  function beatWord(x) {
    var s = x.split('='), clips = {};
    (s[1] || '').split(',').forEach(function (c) { if (c) { var kv = c.split(':'); clips[kv[0]] = kv[1]; } });
    var parts = s[0].split(/[-+]/), strong = 0;
    parts.forEach(function (p, i) { if (p !== p.toLowerCase()) strong = i; });
    return { w: parts.join('').toLowerCase(), parts: parts.map(function (p) { return p.toLowerCase(); }), joins: s[0].replace(/[^-+]/g, '').split(''), strong: strong, clips: clips };
  }
  /* is the letter at i a vowel letter? (u after q is not; y is, unless a vowel follows it: gym, fly, but yak) */
  function vAt(s, i) {
    var c = s.charAt(i);
    if (c === 'u' && s.charAt(i - 1) === 'q') return false;
    return /[aeiou]/.test(c) || (c === 'y' && !/[aeiou]/.test(s.charAt(i + 1)));
  }
  /* the vowel sounds in a word or a beat: [{ at, v }]. A run of vowel letters is one sound (rain, boat), with w or y after it
     (snow, key) and gh after i (night). A last e after one consonant is silent and marks the vowel before it (cake);
     after a consonant and l it is the vowel of a -le beat (ta-ble). */
  function units(s) {
    var out = [], i = 0;
    while (i < s.length) {
      if (!vAt(s, i)) { i++; continue; }
      var j = i + 1;
      while (j < s.length && vAt(s, j)) j++;
      if (/[wy]/.test(s.charAt(j)) && !/[aeiou]/.test(s.charAt(j + 1))) j++;
      if (s.charAt(j - 1) === 'i' && s.substr(j, 2) === 'gh') j += 2;
      out.push({ at: i, v: s.slice(i, j) });
      i = j;
    }
    var last = out[out.length - 1];
    if (out.length > 1 && last.v === 'e' && last.at === s.length - 1 && !vAt(s, last.at - 1) && !(s.charAt(last.at - 1) === 'l' && !vAt(s, last.at - 2))) {
      out.pop();
      out[out.length - 1].sil = true;
    }
    return out;
  }
  /* the syllable type of one beat, or 'none' (no vowel) or 'many' (more than one beat) */
  function kindOf(p) {
    var u = units(p);
    if (u.length !== 1) return u.length ? 'many' : 'none';
    if (/(tion|sion|ture|cian)$/.test(p)) return 'end';
    if (/^[^aeiouy]+le$/.test(p)) return 'le';
    var after = p.slice(u[0].at + u[0].v.length);
    if (/^r(e?$|[^aeiouy])/.test(after)) return 'r';
    if (u[0].v.length > 1) return 'team';
    if (u[0].sil) return 'silente';
    return after ? 'closed' : 'open';
  }
  /* the vowel sound a beat's type gives (the recorded clip), or '' when it has none to play */
  function vowelOf(p, kind) {
    var v = (units(p)[0] || {}).v;
    if (kind === 'closed') return SHORT[v] || '';
    if (kind === 'open' || kind === 'silente') return LONG[v] || '';
    if (kind === 'team') return TEAMS[v] || '';
    if (kind === 'r') { var m = /([aeiou]+)r(e?)$|([aeiou]+)r/.exec(p) || []; return RS[(m[1] || m[3]) + 'r' + (m[2] || '')] || RS[(m[1] || m[3] || '').slice(-1) + 'r'] || ''; }
    return '';
  }
  /* how a word splits between two beats: letters for vowels (V) and consonant sounds (C) on each side of the cut */
  function pattern(left, right, join) {
    if (join === '+') return { code: 'word+word', name: 'two words' };
    if (kindOf(right) === 'le') return { code: 'C+le', name: 'consonant-le' };
    function count(s) { return (s.match(/tch|ch|sh|th|ph|wh|ck|ng|qu|[^aeiou]/g) || []).length; }
    var ul = units(left), ur = units(right);
    if (!ul.length || !ur.length) return null;
    var l = ul[ul.length - 1], tail = left.slice(l.at + l.v.length);
    if (kindOf(left) === 'r') tail = tail.replace(/^r/, '');
    var a = count(tail), b = count(right.slice(0, ur[0].at));
    var code = 'V' + new Array(a + 1).join('C') + '/' + new Array(b + 1).join('C') + 'V';
    return { code: code, name: a + b >= 3 ? 'ostrich' : NAMES[code] || '' };
  }

  /* ---------- Word builder ---------- */
  function wordBuilder(root, canUndo) {
    var K = bank(), g = A.grade, history = [];
    var VIEWS = [['sounds', 'Sounds'], ['beats', 'Beats'], ['parts', 'Parts']];
    var st = {
      view: g <= 3 ? 'sounds' : 'parts', tab: 'cons', ptab: g >= 7 ? 'root' : 'base', sel: -1,
      tiles: ['sh', 'i', 'p'], trail: [],
      beat: g <= 1 ? 'rabbit' : g <= 3 ? 'butterfly' : 'watermelon', cuts: [], show: false, marks: false, kind: '',
      parts: g >= 7 ? ['bio', 'graph', '-y.thing'] : g >= 2 ? ['un-', 'help', '-ful'] : ['jump', '-ing']
    };
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }

    /* the word showing now, so another view can open on the same word */
    function wordNow() {
      if (st.view === 'sounds') return spell(st.tiles);
      if (st.view === 'beats') return st.beat;
      return join(st.parts).word;
    }
    function openOn(view, word) {
      st.view = view; st.sel = -1;
      if (view === 'sounds') { var s = K.sounds.filter(function (w) { return w.word === word; })[0]; if (s) st.tiles = s.tiles.slice(); }
      if (view === 'beats' && K.beats.some(function (b) { return b.w === word; })) { st.beat = word; st.cuts = []; st.show = false; }
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
      var w = spell(st.tiles);
      return K.sounds.filter(function (s) { return s.word === w && s.tiles.join(' ') === st.tiles.join(' '); })[0] || null;
    }
    function drawSounds() {
      var cons = K.tiles.filter(function (t) { return !isVowel(t); }), vow = K.tiles.filter(isVowel);
      tray.innerHTML = '<div class="wb-tabs" role="tablist"><button type="button" role="tab" data-tab="cons" aria-selected="' + (st.tab === 'cons') + '">Consonants</button>' +
        '<button type="button" role="tab" data-tab="vow" aria-selected="' + (st.tab === 'vow') + '">Vowels</button></div><div class="wb-grid">' +
        (st.tab === 'cons' ? cons : vow).map(function (t) { return '<button type="button" class="wb-tile' + (isVowel(t) ? ' wb-v' : '') + '" data-add="' + t + '">' + label(t) + '</button>'; }).join('') + '</div>';
      var k = known(), clips = st.tiles.map(function (t, i) { return k ? k.clips[i] : A.W.clip(t); });
      var w = spell(st.tiles), pic = A.W.pics.indexOf(w) >= 0 && k ? A.W.pic(w) : '';
      body.innerHTML = '<div class="wb-boxes">' + st.tiles.map(function (t, i) {
        return '<div class="wb-box"><button type="button" class="wb-tile wb-big' + (isVowel(t) ? ' wb-v' : '') + (st.sel === i ? ' wb-sel' : '') + '" data-pick="' + i + '" aria-pressed="' + (st.sel === i) + '">' + label(t) + '</button>' +
          A.W.sound(clips[i], '<span class="sr">' + label(t) + '</span>') + '</div>';
      }).join('') + (st.tiles.length < 6 ? '<div class="wb-box"><span class="wb-slot" aria-hidden="true">+</span></div>' : '') + '</div>' +
        (st.tiles.length ? '<div class="wb-word"><span class="wb-w">' + spell(st.tiles, true) + '</span>' + pic + '</div><p class="wb-is">' + (k ? 'a real word' : st.tiles.length > 1 ? 'a made-up word' : '') + '</p>' : '') +
        (st.trail.length > 1 ? '<p class="wb-trail">' + st.trail.map(function (t) { return '<span>' + t + '</span>'; }).join('<i aria-hidden="true">&rarr;</i>') + '</p>' : '');
      act.innerHTML = '<button type="button" class="wb-act wb-go" data-do="blend"' + (st.tiles.length ? '' : ' disabled') + '>Blend <span aria-hidden="true">&rarr;</span></button>' +
        '<button type="button" class="wb-act" data-do="out"' + (st.sel < 0 ? ' disabled' : '') + '>Take out</button>' +
        '<button type="button" class="wb-act" data-do="clear"' + (st.tiles.length ? '' : ' disabled') + '>Clear</button>';
    }
    function noteWord() {
      if (!known()) return;
      var w = spell(st.tiles);
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

    /* Beats: cut a word into syllables. Each beat shows its type and the vowel sound that type gives; from Grade 2 each cut
       shows its pattern (VC/CV ...) and, once the cuts are right, the strong beat. */
    function beat() { return K.beats.filter(function (b) { return b.w === st.beat; })[0] || K.beats[0]; }
    function kindsOf(b) { return b.parts.map(kindOf); }
    /* the vowel sounds of a word, found beat by beat (so li-on has two, though i and o sit side by side) */
    function vowels(b) {
      var out = [], off = 0;
      b.parts.forEach(function (p) {
        units(p).forEach(function (x) { out.push({ at: off + x.at, v: x.v, sil: x.sil ? off + p.length - 1 : 0 }); });
        off += p.length;
      });
      return out;
    }
    function drawBeats() {
      var E = beat(), w = E.w, right = [], at = 0;
      E.parts.forEach(function (p, i) { at += p.length; if (i < E.parts.length - 1) right.push(at); });
      var cuts = st.cuts.slice().sort(function (x, y) { return x - y; });
      var found = {};
      K.beats.forEach(function (b) { kindsOf(b).forEach(function (k) { found[k] = 1; }); });
      var list = K.beats.filter(function (b) { return !st.kind || kindsOf(b).indexOf(st.kind) >= 0; });
      tray.innerHTML = '<p class="wb-lab">Find a type</p><div class="wb-kinds">' + [''].concat(Object.keys(KINDS).filter(function (k) { return found[k]; })).map(function (k) {
        return '<button type="button" class="wb-chip wb-kc' + (k ? ' wb-k-' + k : '') + '" data-kind="' + k + '" aria-pressed="' + (st.kind === k) + '">' + (k ? '<i aria-hidden="true"></i>' + KINDS[k] : 'All') + '</button>';
      }).join('') + '</div><p class="wb-lab">Words</p><div class="wb-list">' + list.map(function (b) {
        return '<button type="button" class="wb-chip" data-beat="' + b.w + '"' + (b === E ? ' aria-pressed="true"' : '') + '>' + b.w + '</button>';
      }).join('') + '</div>';
      /* the vowels (v), the consonants between them (c) and a silent e, for "Mark vowels" */
      var mark = [], u = vowels(E);
      u.forEach(function (x) { for (var j = 0; j < x.v.length; j++) mark[x.at + j] = 'v'; if (x.sil) mark[x.sil] = 's'; });
      if (u.length) for (var c = u[0].at; c < u[u.length - 1].at; c++) if (!mark[c]) mark[c] = 'c';
      var piece = 0, h = '';
      for (var i = 0; i < w.length; i++) {
        if (i) {
          var cut = cuts.indexOf(i) >= 0;
          if (cut) piece++;
          h += '<button type="button" class="wb-gap wb-p' + (piece % 2) + (cut ? ' wb-cut' : '') + (st.show && right.indexOf(i) >= 0 ? ' wb-here' : '') + '" data-gap="' + i + '" aria-label="' + (cut ? 'Join' : 'Cut') + ' between ' + w.charAt(i - 1) + ' and ' + w.charAt(i) + '" aria-pressed="' + cut + '"></button>';
        }
        h += '<span class="wb-l wb-p' + (piece % 2) + (st.marks && mark[i] ? ' wb-m-' + mark[i] : '') + '">' + w.charAt(i) + '</span>';
      }
      /* the beats as cut now: one card each, with the cut's pattern between two cards */
      var bits = [], from = 0;
      cuts.concat(w.length).forEach(function (to) { bits.push(w.slice(from, to)); from = to; });
      from = 0;
      var same = cuts.join() === right.join(), cards = '';
      bits.forEach(function (p, i) {
        if (i && g >= 2) {
          var pt = pattern(bits[i - 1], p, same ? E.joins[i - 1] : '-');
          cards += '<span class="wb-syg"><span class="wb-pat">' + (pt ? '<b>' + pt.code + '</b><small>' + pt.name + '</small>' : '') + '</span>';
        }
        var at = from, n = u.filter(function (x) { return x.at >= at && x.at < at + p.length; }).length;
        from += p.length;
        var k = n === 1 ? kindOf(p) : n ? 'many' : 'none', clip = k === 'many' || k === 'none' ? '' : (same && E.clips[p]) || vowelOf(p, k);
        var stress = same && g >= 2 && bits.length > 1 ? (i === E.strong ? ' wb-strong' : ' wb-quiet') : '';
        cards += '<div class="wb-sy wb-k-' + k + stress + '">' + (stress === ' wb-strong' ? '<i class="wb-acc">strong beat</i>' : '') + '<b>' + p + '</b><small>' +
          (k === 'many' ? n + ' beats' : k === 'none' ? 'no vowel' : KINDS[k]) + '</small>' + (clip ? A.W.sound(clip) : '') + '</div>' + (i && g >= 2 ? '</span>' : '');
      });
      body.innerHTML = '<div class="wb-cutw' + (st.marks ? ' wb-marked' : '') + '">' + h + '</div><div class="wb-sys" aria-label="' + bits.length + (bits.length > 1 ? ' beats' : ' beat') + '">' + cards + '</div>' +
        '<p class="sw-note adult-only wb-tip"><b>Grown-up:</b> ' + (g >= 2
          ? 'Mark the vowels, find the consonants between them, cut, then read each beat by its type. If the word sounds wrong, flex: move the cut (ti-ger or tig-er) or try the other vowel sound. The quiet beats often say /uh/ (ba-NA-na).'
          : 'Mark the vowels: each beat has one vowel sound. Cut, read each beat by its type, then read the whole word.') + '</p>';
      act.innerHTML = '<button type="button" class="wb-act" data-do="marks" aria-pressed="' + st.marks + '">Mark vowels</button>' +
        '<button type="button" class="wb-act wb-go" data-do="show" aria-pressed="' + st.show + '">' + (st.show ? 'Hide the beats' : 'Show the beats') + '</button>' +
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
      else if (d.kind !== undefined) change(function () { st.kind = d.kind; });
      else if (d.do === 'marks') { st.marks = !st.marks; draw(); }
      else if (d.part) change(function () { addPart(d.part); });
      else if (d.drop) change(function () { st.parts = st.parts.filter(function (id) { return id !== d.drop; }); });
      else if (d.fam) change(function () { st.parts = d.fam.split('+'); });
      else if (d.do === 'blend') blend();
      else if (d.do === 'out') change(function () { st.tiles.splice(st.sel, 1); st.sel = -1; noteWord(); });
      else if (d.do === 'clear') change(function () { if (st.view === 'sounds') { st.tiles = []; st.sel = -1; st.trail = []; } else st.parts = []; });
      else if (d.do === 'show') { st.show = !st.show; draw(); }
      else if (d.do === 'join') change(function () { st.cuts = []; });
      else if (d.do === 'next') change(function () { var o = K.beats.filter(function (x) { return x.w !== st.beat && (!st.kind || kindsOf(x).indexOf(st.kind) >= 0); }); st.beat = A.R.pick(o.length ? o : K.beats).w; st.cuts = []; st.show = false; });
    });
    st.trail = [spell(st.tiles)];
    draw();
    return { undo: undo };
  }

  /* ---------- the card bank, for this grade ---------- */
  function cards(all) {
    var B = A.cardbank, g = all ? 99 : A.grade, out = [];
    B.jobs.forEach(function (j) {
      B.cards[j[0]].split('|').forEach(function (x) {
        var p = x.trim().split(':'), c = { t: p[0], j: j[0], g: +p[1] };
        if (c.g > g) return;
        if (p[2] === 'pl') c.pl = 1;
        else if (j[0] === 'does' && p[2]) c.pp = p[2];
        else if (p[2]) c.k = p[2];
        out.push(c);
      });
    });
    return out;
  }
  function sentence(s, list) {
    return s.split('|').map(function (t) {
      t = t.trim();
      var c = list.filter(function (x) { return x.t === t; })[0];
      if (!c) throw new Error('"' + t + '" is not a card');
      return JSON.parse(JSON.stringify(c));
    });
  }
  function examples(list) {
    var E = A.cardbank.examples, out = [];
    Object.keys(E).forEach(function (k) { if (+k <= A.grade) out = out.concat(E[k]); });
    return out.map(function (s) { return sentence(s, list); });
  }
  function isEnd(c) { return c.j === 'mark' && /[.?!]/.test(c.t); }
  function isJoin(c) { return c.j === 'join' || c.t === ';'; }

  /* split a row of cards into sentences (an end mark closes one), and a sentence into clauses (a joining word or ; starts one) */
  function sentences(row) {
    var out = [], a = 0;
    row.forEach(function (c, i) { if (isEnd(c)) { out.push({ a: a, b: i + 1 }); a = i + 1; } });
    if (a < row.length) out.push({ a: a, b: row.length });
    return out;
  }
  function clauses(row, s) {
    var out = [], cur = null;
    for (var i = s.a; i < s.b; i++) {
      if (!cur || isJoin(row[i]) || (cur.sub && row[i - 1].t === ',')) { cur = { a: i, b: i, sub: row[i].k === 'sub' }; out.push(cur); }
      cur.b = i + 1;
    }
    return out.map(function (cl) {
      var who = 0, does = 0;
      for (var i = cl.a; i < cl.b; i++) { if (row[i].j === 'who' && !row[i].by) who++; if (row[i].j === 'does') does++; }
      cl.who = who > 0; cl.does = does > 0; cl.crammed = does > 1 && who > 1; cl.alone = cl.who && cl.does && !cl.sub && !cl.crammed;
      return cl;
    });
  }
  function check(row, s) {
    var cl = clauses(row, s), last = row[s.b - 1];
    return {
      who: cl.every(function (c) { return c.who; }), does: cl.every(function (c) { return c.does; }), end: isEnd(last),
      crammed: cl.some(function (c) { return c.crammed; }), alone: cl.some(function (c) { return c.alone; }) && cl.every(function (c) { return c.who && c.does && !c.crammed; })
    };
  }
  /* how a card reads where it sits: a capital to start a sentence, "was fed" in a passive sentence, "by Leo" for who did it */
  function says(row, i, first) {
    var c = row[i], t = c.t;
    if (c.pas) t = (row[i - 1] && row[i - 1].pl ? 'were ' : 'was ') + c.pp;
    if (c.by) t = 'by ' + t;
    return first ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  }
  function read(row) {
    var out = '', first = true;
    row.forEach(function (c, i) {
      out += (c.j === 'mark' || !out ? '' : ' ') + says(row, i, first && c.j !== 'mark');
      first = c.j === 'mark' ? isEnd(c) || first : false;
    });
    return out;
  }

  /* ---------- the moves: each returns the new row, or null when it cannot be done here ---------- */
  var MARK = function (t) { return { t: t, j: 'mark' }; };
  function joinTwo(row, at, word, list) {
    var S = sentences(row), n = 0;
    S.forEach(function (s, k) { if (at >= s.a && at < s.b) n = k; });
    if (n >= S.length - 1) n = 0;
    var s1 = S[n], s2 = S[n + 1];
    if (!s2 || !isEnd(row[s1.b - 1])) return null;
    var c = word === ';' ? MARK(';') : list.filter(function (x) { return x.j === 'join' && x.t === word; })[0];
    var mid = word !== ';' && c.k === 'co' && A.grade >= 3 ? [MARK(','), c] : [c];
    return row.slice(0, s1.b - 1).concat(JSON.parse(JSON.stringify(mid)), row.slice(s2.a));
  }
  function inSent(row, i) { return sentences(row).filter(function (s) { return i >= s.a && i < s.b; })[0]; }
  function split(row, at) {
    var j = at >= 0 && isJoin(row[at]) ? at : -1;
    if (j < 0) for (var i = 0; i < row.length && j < 0; i++) if (isJoin(row[i])) j = i;
    if (j < 0) return null;
    var s = inSent(row, j), r = row.slice();
    if (j === s.a) {
      for (var k = j + 1; k < s.b && row[k].t !== ','; k++);
      if (k >= s.b) return null;
      r[k] = MARK('.');
      r.splice(j, 1);
      return r;
    }
    if (row[j - 1].t === ',') r.splice(j - 1, 2, MARK('.'));
    else r.splice(j, 1, MARK('.'));
    return r;
  }
  /* the part to move: a where-or-when card, or a part that starts with because, when, although ... */
  function part(row, i) {
    if (row[i].j === 'where') return { a: i, b: i + 1 };
    if (row[i].k !== 'sub') return null;
    var s = inSent(row, i), b = i + 1;
    while (b < s.b && !isJoin(row[b]) && row[b].j !== 'mark') b++;
    return { a: i, b: b };
  }
  function movable(row, at) {
    if (at >= 0) return part(row, at) ? at : -1;
    var subs = [], wheres = [];
    row.forEach(function (c, i) { if (c.k === 'sub') subs.push(i); else if (c.j === 'where') wheres.push(i); });
    var all = subs.concat(wheres), back = all.filter(function (i) { return inSent(row, i).a !== i; });
    return back.length ? back[0] : all.length ? all[0] : -1;
  }
  function front(row, at) {
    var i = movable(row, at);
    if (i < 0) return null;
    var p = part(row, i), s = inSent(row, i), seg = row.slice(p.a, p.b), r = row.slice();
    if (p.a === s.a) {
      var drop = row[p.b] && row[p.b].t === ',' ? 1 : 0;
      r.splice(p.a, seg.length + drop);
      var end = s.b - seg.length - drop;
      var at2 = isEnd(r[end - 1]) ? end - 1 : end;
      return { row: r.slice(0, at2).concat(seg, r.slice(at2)), to: 'end', at: at2 };
    }
    var comma = row[p.a - 1].t === ',' ? 1 : 0;
    r.splice(p.a - comma, seg.length + comma);
    return { row: r.slice(0, s.a).concat(seg, [MARK(',')], r.slice(s.a)), to: 'front', at: s.a };
  }
  function voice(row, at) {
    var S = at >= 0 ? [inSent(row, at)] : sentences(row);
    for (var n = 0; n < S.length; n++) for (var i = S[n].a; i + 2 < S[n].b; i++) {
      var a = row[i], v = row[i + 1], b = row[i + 2];
      if (a.j !== 'who' || v.j !== 'does' || b.j !== 'who' || !v.pp || a.by) continue;
      var r = row.slice(), A2 = JSON.parse(JSON.stringify(a)), B2 = JSON.parse(JSON.stringify(b)), V2 = JSON.parse(JSON.stringify(v));
      if (!v.pas && !b.by) { V2.pas = 1; A2.by = 1; r.splice(i, 3, B2, V2, A2); return { row: r, to: 'passive' }; }
      if (v.pas && b.by) { delete V2.pas; delete B2.by; r.splice(i, 3, B2, V2, A2); return { row: r, to: 'active' }; }
    }
    return null;
  }

  /* ---------- Sentence builder ---------- */
  function sentenceBuilder(root, canUndo) {
    var list = cards(), ex = examples(list), g = A.grade, history = [];
    var jobs = A.cardbank.jobs.filter(function (j) { return list.some(function (c) { return c.j === j[0]; }); });
    var E = A.cardbank.examples, start = g >= 7 ? E[7][0] : g >= 4 ? E[4][0] : g >= 3 ? E[3][0] : E[1][0];
    var st = { tab: 'who', sel: -1, jobs: true, cl: g >= 7, joining: false, row: sentence(start, list) };
    function change(fn) { history.push(JSON.stringify(st)); fn(); st.joining = false; canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); st.joining = false; canUndo(history.length > 0); draw(); }

    root.innerHTML = '<div class="wb sb"><div class="wb-tray" aria-label="Cards"></div><div class="wb-mat"><div class="sb-sw"></div><div class="wb-body sb-body"></div><div class="wb-do"></div></div></div>';
    var tray = $('.wb-tray', root), body = $('.sb-body', root), act = $('.wb-do', root), sw = $('.sb-sw', root);
    function card(c, attr, text, extra) {
      return '<button type="button" class="sc sc-' + c.j + (c.k === 'co' || c.t === ';' ? ' sc-co' : '') + (extra || '') + '" ' + attr + '>' + esc(text) + '</button>';
    }
    function tick(ok, t) { return '<li class="' + (ok ? 'sb-ok' : '') + '"><i aria-hidden="true">' + (ok ? '&#10003;' : '') + '</i>' + t + '<span class="sr">' + (ok ? ': yes' : ': not yet') + '</span></li>'; }
    function draw() {
      var row = st.row, S = sentences(row);
      sw.innerHTML = '<button type="button" class="sb-tg" data-tg="jobs" aria-pressed="' + st.jobs + '"><i aria-hidden="true"></i>Show jobs</button>' +
        (g >= 3 ? '<button type="button" class="sb-tg" data-tg="cl" aria-pressed="' + st.cl + '"><i aria-hidden="true"></i>Clauses</button>' : '');
      tray.innerHTML = '<div class="wb-tabs sb-tabs" role="tablist">' + jobs.map(function (j) {
        return '<button type="button" role="tab" data-tab="' + j[0] + '" aria-selected="' + (st.tab === j[0]) + '">' + j[1] + '</button>';
      }).join('') + '</div><div class="wb-list sb-list">' + list.map(function (c, i) {
        return c.j === st.tab ? card(c, 'data-add="' + i + '"', c.t) : '';
      }).join('') + '</div>';
      root.firstChild.classList.toggle('sb-plain', !st.jobs);
      body.innerHTML = row.length ? S.map(function (s) {
        var cl = clauses(row, s), k = check(row, s), h = '';
        cl.forEach(function (c) {
          var inner = '';
          for (var i = c.a; i < c.b; i++) {
            var one = card(row[i], 'data-at="' + i + '" aria-pressed="' + (st.sel === i) + '"', says(row, i, i === s.a), st.sel === i ? ' sb-sel' : '');
            /* a mark stays on the same line as the card before it */
            inner += i + 1 < c.b && row[i + 1].j === 'mark' && row[i].j !== 'mark' ? '<span class="sb-pair">' + one : row[i].j === 'mark' && i > c.a && row[i - 1].j !== 'mark' ? one + '</span>' : one;
          }
          h += st.cl ? '<span class="sb-cl' + (c.alone ? ' sb-cl-ok' : '') + '"><span class="sb-cards">' + inner + '</span><small>' + (c.alone ? 'can stand alone' : 'cannot stand alone') + '</small></span>' : inner;
        });
        return '<div class="sb-sent"><div class="sb-cards sb-row">' + h + '</div><ul class="sb-ticks">' + tick(k.who, 'Who or what') + tick(k.does, 'Does') +
          (g >= 3 ? tick(k.alone, 'Stands alone') : '') + tick(k.end, 'Mark at the end') + '</ul>' +
          (g >= 3 && k.crammed ? '<p class="sb-hint">Two sentences are crammed together.</p>' : g >= 3 && k.who && k.does && !k.alone ? '<p class="sb-hint">It needs a part that can stand alone.</p>' : '') + '</div>';
      }).join('') + (st.jobs ? '<p class="sb-key">' + jobs.filter(function (j) { return j[0] !== 'mark'; }).map(function (j) { return '<span><i class="sk-' + j[0] + '"></i>' + j[2] + '</span>'; }).join('') + '</p>' : '')
        : '<p class="wb-empty">Tap a card to start.</p>';
      var b = function (d, t, on, go) { return '<button type="button" class="wb-act' + (go ? ' wb-go' : '') + '" data-do="' + d + '"' + (on ? '' : ' disabled') + '>' + t + '</button>'; };
      if (st.joining) {
        act.innerHTML = '<span class="sb-with">Join with</span>' + list.filter(function (c) { return c.j === 'join'; }).map(function (c) {
          return card(c, 'data-jw="' + esc(c.t) + '"', c.t);
        }).join('') + (g >= 7 ? card(MARK(';'), 'data-jw=";"', ';') : '') + b('cancel', 'Cancel', true);
        return;
      }
      var fr = g >= 3 ? front(row, st.sel) : null, vo = g >= 6 ? voice(row, st.sel) : null;
      act.innerHTML = (st.sel >= 0 ? '<span class="sb-move">' + b('left', '&larr;<span class="sr"> Move left</span>', st.sel > 0) + b('right', '&rarr;<span class="sr"> Move right</span>', st.sel < row.length - 1) + b('out', 'Take out', true) + '</span>' : '') +
        b('join', 'Join two', !!joinTwo(row, st.sel, 'and', list), true) + b('split', 'Split', !!split(row, st.sel)) +
        (g >= 3 ? b('front', fr && fr.to === 'end' ? 'To the end' : 'To the front', !!fr) : '') +
        (g >= 6 ? b('voice', vo && vo.to === 'active' ? 'Make it active' : 'Make it passive', !!vo) : '') +
        b('mix', 'Mix it up', row.length > 2) + b('new', 'New sentence', true) + b('clear', 'Clear', row.length > 0);
    }
    function mix(row) {
      var out = [];
      sentences(row).forEach(function (s) {
        var part = row.slice(s.a, s.b), end = isEnd(part[part.length - 1]) ? part.pop() : null, m = part;
        for (var n = 0; n < 9 && m.length > 1 && m.map(txt).join('|') === part.map(txt).join('|'); n++) m = A.R.shuffle(part);
        out = out.concat(m, end ? [end] : []);
      });
      return out;
    }
    function txt(c) { return c.t; }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.disabled) return;
      var d = b.dataset, row = st.row;
      if (d.tab) { st.tab = d.tab; draw(); }
      else if (d.tg) { st[d.tg] = !st[d.tg]; draw(); }
      else if (d.add) change(function () {
        var c = JSON.parse(JSON.stringify(list[+d.add]));
        if (st.sel >= 0) { row[st.sel] = c; st.sel = -1; } else if (row.length < 24) row.push(c);
      });
      else if (d.at) { st.sel = st.sel === +d.at ? -1 : +d.at; st.joining = false; draw(); }
      else if (d.jw) change(function () { st.row = joinTwo(row, st.sel, d.jw, list); st.sel = -1; });
      else if (d.do === 'cancel') { st.joining = false; draw(); }
      else if (d.do === 'join') { st.joining = true; draw(); }
      else if (d.do === 'left' || d.do === 'right') change(function () {
        var to = st.sel + (d.do === 'left' ? -1 : 1), c = row.splice(st.sel, 1)[0];
        row.splice(to, 0, c); st.sel = to;
      });
      else if (d.do === 'out') change(function () { row.splice(st.sel, 1); st.sel = -1; });
      else if (d.do === 'split') change(function () { st.row = split(row, st.sel); st.sel = -1; });
      else if (d.do === 'front') change(function () { var f = front(row, st.sel); st.row = f.row; st.sel = f.at; });
      else if (d.do === 'voice') change(function () { st.row = voice(row, st.sel).row; st.sel = -1; });
      else if (d.do === 'mix') change(function () { st.row = mix(row); st.sel = -1; });
      else if (d.do === 'new') change(function () {
        var now = read(row), o = ex.filter(function (x) { return read(x) !== now; });
        st.row = JSON.parse(JSON.stringify(A.R.pick(o))); st.sel = -1;
      });
      else if (d.do === 'clear') change(function () { st.row = []; st.sel = -1; });
    });
    draw();
    return { undo: undo };
  }

  /* for the checks (tests/run.js): the spelling rules and the grade's word bank */
  A.toolkit = { shelves: shelves, kindOf: kindOf, vowelOf: vowelOf, pattern: pattern, units: units, beatWord: beatWord, join: join, spell: spell, bank: bank, tools: TOOLS, cards: cards, sentence: sentence, sentences: sentences, check: check, read: read, joinTwo: joinTwo, split: split, front: front, voice: voice };
})();
