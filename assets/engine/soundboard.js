/* Language Atlas tool box: the Sound board (#tools/sounds), shared by every grade. Needs atlas.js, words.js (the recorded
   sounds and the key-word pictures), wordbank.js (letter tiles), soundbank.js (the sounds) and tools.js (the tool box).
   Science of Reading and Orton-Gillingham: sound first, then its spellings; see it, hear it, say it, move it.
   Curriculum B2.1 (phonemic awareness), B2.2 (phonics) and B2.3 (spelling), Grades 1 to 3; it also shows in Grades 4 to 8.
     Wall     Consonants: a wall by where the mouth makes each sound (columns, lips to throat) and how the air comes out
              (rows: pop, hum, hiss, pop-hiss, glide, flow), quiet and voiced partners side by side. Vowels: the vowel valley
              (smile, open, round), with the sliding vowels and the vowels with r below. Tap a sound to hear it, see its
              mouth picture and every way to spell it up to this grade, with a key word. A grown-up note shows in grown-up view.
     Move it  Pick a picture, say the word and push one chip into a box for each sound (no letters yet). Letters turns the
              chips into letter tiles; tap a box, then a tile, to change one sound (fish, dish).
     Cards    The sound drill, in teaching order: see the spelling, say its sound, flip to check (key word, picture, the
              recording). Hear it first plays the sound and hides the spelling until the flip. My deck keeps chosen cards.
   Nothing is marked. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$, W = A.W;
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* ---------- the sounds, for this grade ---------- */
  function spelling(x) {
    var p = x.trim().split(' '), word = p[1];
    return { g: p[0], plain: word.replace(/[[\]]/g, ''), marked: word.replace(/\[/g, '<u>').replace(/\]/g, '</u>'), grade: +p[2] };
  }
  function sounds(all) {
    var B = A.soundbank, g = all ? 99 : A.grade, out = [];
    function add(line, vowel) {
      var parts = line.split('|'), head = parts[0].trim().split(' ');
      var s = vowel ? { clip: head[0], key: head[1], vowel: true, voiced: true } : { clip: head[0], place: head[1], manner: head[2], voiced: head[3] === '1', key: head[4] };
      s.sp = parts.slice(1).map(spelling).filter(function (x) { return x.grade <= g; });
      out.push(s);
    }
    B.cons.forEach(function (l) { add(l); });
    B.vowels.forEach(function (l) { add(l, true); });
    return out;
  }
  function show(clip) { return clip === 'th-voiced' ? 'th' : clip === 'oo-short' ? 'oo' : clip; }
  function label(g) { return g.replace('_', '&ndash;'); }
  /* every sound a spelling can make in this grade: its own sound first (c: /k/ cat, then /s/ city) */
  function soundsOf(list, g) {
    var out = [];
    list.forEach(function (s) { s.sp.forEach(function (x) { if (x.g === g) out.push({ s: s, x: x }); }); });
    return out.sort(function (a, b) { return (b.s.clip === g) - (a.s.clip === g); });
  }
  function decks(list) {
    var mine = A.load('soundcards', []);
    return A.soundbank.decks.map(function (d) {
      return { name: d[0], cards: d[1].split(' ').filter(function (g) { return soundsOf(list, g).length; }) };
    }).concat([{ name: 'My deck', cards: mine.filter(function (g) { return soundsOf(list, g).length; }), mine: true }]).filter(function (d) { return d.cards.length || d.mine; });
  }

  /* ---------- pictures: a side view of the mouth, for where a sound is made ---------- */
  var HEAD = '<path class="mo-f" d="M30 1C22 4 15 9 8 15l4 3c-2 2-3 4-2 6l5 2.5-5 2.5c-1 3 0 6 3 8-1 3 0 7 5 9 14 2 30 1 38-9 5-10 4-27-11-36-5-2-8-2-10-2z"/>' +
    '<path class="mo-l" d="M18 47c14 2 30 1 38-9 5-10 4-27-11-36" stroke-width="1.4"/><path d="M19 10c2-1.5 4-1.5 6 0" stroke-width="1.8"/><path d="M11 17.5c1 .5 2 .5 3 0" stroke-width="1.4"/>' +
    '<path d="M30 1C22 4 15 9 8 15l4 3c-2 2-3 4-2 6l5 2.5-5 2.5c-1 3 0 6 3 8-1 3 0 7 5 9"/>' +
    '<path class="mo-i" d="M15 26.5c4-6 14-10 26-7 5 2 7 7 7 13v15H18c-2-3-3-7-1-12z"/><path d="M15 25c4-6 14-9 26-6 5 2 7 7 7 14v14" stroke-width="1.6"/>' +
    '<path class="mo-t" d="M13 22.5h3.5v3h-3.5zM13 28h3.5v3H13z" stroke-width="1.4"/>';
  var TONGUE = {
    rest: 'M16.5 31c6-3 17-5 25-2 3 2 4 6 4 18H19c-3-4-3-10-2.5-16z',
    between: 'M11 27.2c4-1 10-3 18-2.5 9 .5 14 3 16 7 1 4 1 9 1 15H19c-3-4-3-10-2.5-16-2-.5-4-1.5-5.5-3.5z',
    ridge: 'M16.5 31c1-6 3-9 5-9.5 3 0 4 4 8 4.5 6 .5 11 0 13 4 2 3 2 10 2 17H19c-3-4-3-10-2.5-16z',
    roof: 'M16.5 31c3-3 6-6 12-9 6-1 11 0 14 3 2 4 2 12 2 22H19c-3-4-3-10-2.5-16z',
    back: 'M16.5 31c6-1 13-2 18-4 3-4 7-6 9-4 2 3 2 12 2 24H19c-3-4-3-10-2.5-16z'
  };
  var SPOT = { lips: ['rest', 10.5, 26.5], teeth: ['rest', 12.5, 27.5], tongue: ['between', 12, 27], ridge: ['ridge', 19.5, 21], roof: ['roof', 28, 20], back: ['back', 41, 20.5], throat: ['rest', 46.5, 38] };
  function mouth(place) {
    var m = SPOT[place];
    return '<svg class="sb-mo" viewBox="0 0 60 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + HEAD +
      '<path class="mo-g" d="' + TONGUE[m[0]] + '"/><path d="' + TONGUE[m[0]] + '" stroke-width="1.6"/>' +
      (place === 'lips' ? '<path d="M9.5 26.5h6" stroke-width="2.4"/>' : place === 'teeth' ? '<path d="M10.5 29.5c2 1 4 0 5-1" stroke-width="1.6"/>' : '') +
      '<circle class="mo-h" cx="' + m[1] + '" cy="' + m[2] + '" r="3.4"/></g></svg>';
  }
  /* the shape of the mouth for a vowel: smile, open or round lips */
  function lips(shape) {
    var d = { smile: 'M6 20c8 7 28 7 36 0-8 4-28 4-36 0z', open: 'M10 18c6-9 22-9 28 0-2 12-26 12-28 0z', round: 'M15 18c3-8 15-8 18 0 0 9-18 9-18 0z', slide: 'M8 19c8 6 26 6 32 0M15 18c3-7 15-7 18 0' }[shape];
    return '<svg class="sb-lips" viewBox="0 0 48 32" aria-hidden="true"><path class="mo-g" d="' + d + '"/><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';
  }
  function shape(clip) {
    var B = A.soundbank;
    if (B.slides.indexOf(clip) >= 0) return ['slide', 'Your mouth slides from one shape to another.'];
    if (B.rvowels.indexOf(clip) >= 0) return ['open', 'Your tongue pulls back for the r.'];
    if (['ee', 'i', 'ai'].indexOf(clip) >= 0) return ['smile', 'Smile.'];
    if (['oa', 'oo-short', 'oo'].indexOf(clip) >= 0) return ['round', 'Round your lips.'];
    return ['open', 'Open your mouth.'];
  }

  /* ---------- the tool ---------- */
  function soundBoard(root, canUndo) {
    var B = A.soundbank, list = sounds(), g = A.grade, history = [];
    var byClip = {};
    list.forEach(function (s) { byClip[s.clip] = s; });
    var words = B.move.map(function (m) { var t = m.split(' '); return { tiles: t, word: A.toolkit.spell(t) }; }).filter(function (w) { return W.pics.indexOf(w.word) >= 0; });
    var st = { view: 'wall', tab: 'cons', sel: 'k', move: { w: 3, placed: 0, letters: false, box: -1, tiles: words[3].tiles.slice(), trail: [] }, cards: { deck: 0, at: 0, flip: false, hear: false, order: null } };
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    function play(clip, el) {
      if (el) el.classList.add('sb-on');
      W.playAll([clip], null, function () { if (el) el.classList.remove('sb-on'); });
    }

    root.innerHTML = '<div class="sbd"><div class="wb-views sbd-views" role="tablist">' + [['wall', 'Wall'], ['move', 'Move it'], ['cards', 'Cards']].map(function (v) {
      return '<button type="button" role="tab" data-v="' + v[0] + '">' + v[1] + '</button>';
    }).join('') + '</div><div class="sbd-stage"></div></div>';
    var stage = $('.sbd-stage', root);
    function draw() {
      $$('.sbd-views button', root).forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-v') === st.view)); });
      stage.className = 'sbd-stage sbd-' + st.view;
      stage.innerHTML = ({ wall: wall, move: move, cards: cardsView })[st.view]();
    }

    /* Wall */
    function chip(s, tag) {
      var cls = 'sbc' + (s.vowel ? ' sbc-v' : s.voiced ? ' sbc-on' : '') + (st.sel === s.clip && !tag ? ' sbc-sel' : '');
      if (tag) return '<span class="' + cls + ' sbc-sm" aria-hidden="true">' + show(s.clip) + '</span>';
      return '<button type="button" class="' + cls + '" data-s="' + s.clip + '" aria-pressed="' + (st.sel === s.clip) + '" aria-label="/' + show(s.clip) + '/ as in ' + s.sp[0].plain + '">' + show(s.clip) + '</button>';
    }
    function wall() {
      var cons = list.filter(function (s) { return !s.vowel && s.sp.length; }), body;
      if (st.tab === 'cons') {
        var grid = '<div class="sw-grid"><span></span>' + B.places.map(function (p) { return '<span class="sw-h">' + mouth(p[0]) + p[1] + '</span>'; }).join('');
        B.manners.forEach(function (m) {
          grid += '<span class="sw-r">' + m[1] + '</span>' + B.places.map(function (p) {
            var here = cons.filter(function (s) { return s.place === p[0] && s.manner === m[0]; }).sort(function (a, b) { return a.voiced - b.voiced; });
            return '<span class="sw-c' + (here.length ? '' : ' sw-e') + '">' + here.map(function (s) { return chip(s); }).join('') + '</span>';
          }).join('');
        });
        grid += '</div><div class="sw-list">' + B.places.map(function (p) {
          var here = cons.filter(function (s) { return s.place === p[0]; });
          return '<div class="sw-li">' + mouth(p[0]) + '<span class="sw-ln">' + p[1] + '</span><span class="sw-lc">' + here.map(function (s) { return chip(s); }).join('') + '</span></div>';
        }).join('') + '</div>';
        body = grid;
      } else {
        body = '<div class="sv-valley"><svg class="sv-curve" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M3 6C20 60 35 95 52 92S85 55 98 4"/></svg>' +
          '<span class="sv-t" style="left:22%;top:0">' + lips('smile') + 'smile</span><span class="sv-t" style="left:52.5%;bottom:0">' + lips('open') + 'open</span><span class="sv-t" style="left:79%;top:0">' + lips('round') + 'round</span>' +
          B.valley.map(function (v) {
            var s = byClip[v[0]];
            return '<span class="sv-p" style="left:' + v[1] + '%;top:' + v[2] + '%">' + chip(s) + '<small>' + W.pic(s.key).replace('class="wpic"', 'class="wpic sv-k"') + '</small></span>';
          }).join('') + '</div>' +
          [['Slides', B.slides], ['With r', B.rvowels]].map(function (r) {
            var here = r[1].map(function (c) { return byClip[c]; }).filter(function (s) { return s.sp.length; });
            return here.length ? '<div class="sv-row"><b>' + r[0] + '</b>' + here.map(function (s) { return chip(s); }).join('') + '</div>' : '';
          }).join('');
      }
      return '<div class="sw-mat"><div class="sw-top"><div class="wb-tabs sw-tabs" role="tablist"><button type="button" role="tab" data-tab="cons" aria-selected="' + (st.tab === 'cons') + '">Consonants</button>' +
        '<button type="button" role="tab" data-tab="vow" aria-selected="' + (st.tab === 'vow') + '">Vowels</button></div>' +
        (st.tab === 'cons' ? '<p class="sw-key"><span><i></i>quiet</span><span><i class="on"></i>voice on</span></p>' : '<p class="sw-key">Every vowel has its voice on.</p>') + '</div>' + body + '</div>' + detail();
    }
    function detail() {
      var s = byClip[st.sel];
      if (!s || !s.sp.length) return '<aside class="sw-det"><p class="wb-empty">Tap a sound.</p></aside>';
      var partner = !s.vowel && list.filter(function (o) { return !o.vowel && o !== s && o.place === s.place && o.manner === s.manner && o.voiced !== s.voiced && o.sp.length; })[0];
      var how = s.vowel ? shape(s.clip) : null, place = s.vowel ? '' : B.places.filter(function (p) { return p[0] === s.place; })[0][1];
      var manner = s.vowel ? '' : B.manners.filter(function (m) { return m[0] === s.manner; })[0][1].toLowerCase();
      var note = s.vowel ? how[1] : partner ? 'Hand on throat: /' + show(s.clip) + '/ is ' + (s.voiced ? 'buzzy' : 'quiet') + ', /' + show(partner.clip) + '/ is ' + (partner.voiced ? 'buzzy' : 'quiet') + '. Same mouth.' : 'Look in a mirror and feel where it is made.';
      return '<aside class="sw-det"><div class="sw-big"><b>/' + show(s.clip) + '/</b><button type="button" class="sw-play" data-play="' + s.clip + '" aria-label="Play /' + show(s.clip) + '/">' + SPK + '</button></div>' +
        '<div class="sw-how">' + (s.vowel ? lips(how[0]) : mouth(s.place)) + '<span>' + (s.vowel ? how[1] : place + '<br><small>' + manner + ', ' + (s.voiced ? 'voice on' : 'quiet') + '</small>') + '</span></div>' +
        '<p class="wb-lab">Ways to spell it</p><div class="sw-sp">' + s.sp.map(function (x) {
          return '<div class="sw-spi"><span class="sw-g">' + label(x.g) + '</span><span class="sw-w">' + x.marked + '</span>' + (W.pics.indexOf(x.plain) >= 0 ? W.pic(x.plain) : '') + '</div>';
        }).join('') + '</div>' +
        (partner ? '<button type="button" class="sw-pair" data-s="' + partner.clip + '">' + chip(partner, true) + '<span>Same mouth, ' + (partner.voiced ? 'voice on' : 'quiet') + '</span></button>' : '') +
        '<p class="sw-note adult-only"><b>Grown-up:</b> ' + note + '</p></aside>';
    }

    /* Move it */
    function move() {
      var m = st.move, w = words[m.w], n = m.tiles.length, tiles = A.toolkit.bank().tiles;
      var tray = m.letters && m.box >= 0 ? '<p class="wb-lab">Change the sound</p><div class="wb-grid sm-tiles">' + tiles.map(function (t) {
        return '<button type="button" class="wb-tile' + (/[aeiou]/.test(t) ? ' wb-v' : '') + '" data-swap="' + t + '">' + label(t) + '</button>';
      }).join('') + '</div>' : '<p class="wb-lab">Pick a picture</p><div class="sm-pics">' + words.map(function (x, i) {
        return '<button type="button" data-w="' + i + '" aria-pressed="' + (i === m.w) + '">' + W.pic(x.word) + '</button>';
      }).join('') + '</div>';
      var boxes = '';
      for (var i = 0; i < n; i++) {
        var t = m.tiles[i];
        boxes += '<button type="button" class="sm-box' + (m.box === i ? ' sm-sel' : '') + '" data-box="' + i + '" aria-label="Box ' + (i + 1) + '">' +
          (m.letters ? '<span class="wb-tile' + (/[aeiou]/.test(t) ? ' wb-v' : '') + '">' + label(t) + '</span>' : i < m.placed ? '<span class="sm-chip"></span>' : '') + '</button>';
      }
      var home = '';
      for (var j = m.placed; j < n && !m.letters; j++) home += '<button type="button" class="sm-chip" data-push="1" aria-label="Push a chip"></button>';
      var now = A.toolkit.spell(m.tiles);
      return '<div class="wb-tray sm-tray">' + tray + '</div><div class="sm-mat">' +
        '<div class="sm-sw"><button type="button" class="sb-tg" data-tg="letters" aria-pressed="' + m.letters + '"><i aria-hidden="true"></i>Letters</button></div>' +
        '<div class="sm-pic">' + (now === w.word ? W.pic(w.word) : '<span class="sm-made">' + now + '</span>') + '</div>' +
        '<div class="sm-boxes">' + boxes + '</div><div class="sm-home">' + home + '</div>' +
        (m.trail.length ? '<p class="wb-trail">' + [w.word].concat(m.trail).map(function (t) { return '<span>' + t + '</span>'; }).join('<i aria-hidden="true">&rarr;</i>') + '</p>' : '') +
        '<div class="wb-do"><button type="button" class="wb-act" data-do="back"' + (m.placed && !m.letters ? '' : ' disabled') + '>Take back</button>' +
        '<button type="button" class="wb-act" data-do="change">Change one sound</button>' +
        '<button type="button" class="wb-act" data-do="pic">New picture</button></div></div>';
    }

    /* Cards */
    function cardsView() {
      var D = decks(list), c = st.cards, d = D[Math.min(c.deck, D.length - 1)], order = c.order || d.cards, gr = order[c.at % Math.max(order.length, 1)];
      var mine = A.load('soundcards', []), tray = '<p class="wb-lab">Deck</p><div class="sc-decks">' + D.map(function (x, i) {
        return '<button type="button" data-deck="' + i + '" aria-pressed="' + (x === d) + '">' + x.name + '<small>' + x.cards.length + '</small></button>';
      }).join('') + '</div><button type="button" class="sb-tg" data-tg="hear" aria-pressed="' + c.hear + '"><i aria-hidden="true"></i>Hear it first</button>';
      if (!gr) return '<div class="wb-tray sc-tray">' + tray + '</div><div class="sc-mat"><p class="wb-empty">Add cards with "Add to my deck".</p></div>';
      var all = soundsOf(list, gr);
      var front = c.hear ? '<button type="button" class="sc-hear" data-play="' + all[0].s.clip + '" aria-label="Play the sound">' + SPK + '</button>' : '<b class="sc-g">' + label(gr) + '</b>';
      var back = '<b class="sc-g sc-gs">' + label(gr) + '</b>' + all.map(function (o) {
        return '<div class="sc-snd">' + (W.pics.indexOf(o.x.plain) >= 0 ? W.pic(o.x.plain) : W.pic(o.s.key)) + '<span class="sc-kw">' + o.x.marked + '</span>' +
          '<button type="button" class="sw-play" data-play="' + o.s.clip + '" aria-label="Play /' + show(o.s.clip) + '/"><span>/' + show(o.s.clip) + '/</span>' + SPK + '</button></div>';
      }).join('');
      return '<div class="wb-tray sc-tray">' + tray + '</div><div class="sc-mat"><div class="sc-card' + (c.flip ? ' sc-flipped' : '') + '"><div class="sc-face sc-front">' + front + '</div><div class="sc-face sc-back' + (all.length > 1 ? ' sc-many' : '') + '">' + back + '</div></div>' +
        '<p class="sc-n">' + (c.at % order.length + 1) + ' of ' + order.length + '</p>' +
        '<div class="wb-do"><button type="button" class="wb-act" data-do="prev">&larr; Back</button><button type="button" class="wb-act wb-go" data-do="flip">Flip</button><button type="button" class="wb-act" data-do="next">Next &rarr;</button>' +
        '<button type="button" class="wb-act" data-do="shuffle">Shuffle</button><button type="button" class="wb-act" data-do="mine" data-card="' + gr + '">' + (mine.indexOf(gr) >= 0 ? 'Take out of my deck' : 'Add to my deck') + '</button></div></div>';
    }

    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || b.disabled) return;
      var d = b.dataset, m = st.move, c = st.cards;
      if (d.v && d.v !== st.view) { st.view = d.v; draw(); }
      else if (d.tab) { st.tab = d.tab; st.sel = d.tab === 'vow' ? 'ai' : 'k'; draw(); }
      else if (d.s) { st.sel = d.s; draw(); var on = $('.sw-det .sw-play', root); play(d.s, on); }
      else if (d.play) play(d.play, b);
      else if (d.tg === 'letters') change(function () { m.letters = !m.letters; m.box = -1; });
      else if (d.tg === 'hear') { c.hear = !c.hear; c.flip = false; draw(); }
      else if (d.w) change(function () { st.move = { w: +d.w, placed: 0, letters: false, box: -1, tiles: words[+d.w].tiles.slice(), trail: [] }; });
      else if (d.push) change(function () { m.placed++; });
      else if (d.box) {
        if (m.letters) { m.box = m.box === +d.box ? -1 : +d.box; draw(); play(A.W.clip(m.tiles[+d.box])); }
        else if (+d.box === m.placed - 1) change(function () { m.placed--; });
      }
      else if (d.swap) change(function () { m.tiles[m.box] = d.swap; m.box = -1; var w = A.toolkit.spell(m.tiles); if (m.trail[m.trail.length - 1] !== w) m.trail = m.trail.concat(w).slice(-4); });
      else if (d.do === 'back') change(function () { m.placed--; });
      else if (d.do === 'change') change(function () { m.letters = true; m.box = Math.floor(m.tiles.length / 2); });
      else if (d.do === 'pic') change(function () { var i = A.R.pick(words.map(function (x, k) { return k; }).filter(function (k) { return k !== m.w; })); st.move = { w: i, placed: 0, letters: false, box: -1, tiles: words[i].tiles.slice(), trail: [] }; });
      else if (d.deck) { c.deck = +d.deck; c.at = 0; c.flip = false; c.order = null; draw(); }
      else if (d.do === 'flip') { c.flip = !c.flip; $('.sc-card', root).classList.toggle('sc-flipped', c.flip); }
      else if (d.do === 'next' || d.do === 'prev') { var n = (c.order || decks(list)[c.deck].cards).length; c.at = (c.at + (d.do === 'next' ? 1 : n - 1)) % n; c.flip = false; draw(); }
      else if (d.do === 'shuffle') { c.order = A.R.shuffle(decks(list)[c.deck].cards); c.at = 0; c.flip = false; draw(); }
      else if (d.do === 'mine') {
        var mine = A.load('soundcards', []), i = mine.indexOf(d.card);
        if (i >= 0) mine.splice(i, 1); else mine.push(d.card);
        A.save('soundcards', mine); draw();
      }
    });
    draw();
    return { undo: undo };
  }
  var SPK = '<svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><path d="M6 12h5l7-6v20l-7-6H6z" fill="currentColor"/><path d="M22 11c2 3 2 7 0 10M25.5 8c4 4.5 4 11.5 0 16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
  var ICON = '<rect x="4" y="10" width="12" height="13" rx="3" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="18" y="10" width="12" height="13" rx="3" style="fill:color-mix(in srgb,var(--sb) 14%,var(--card));stroke:var(--sb);stroke-width:2"/><rect x="32" y="10" width="12" height="13" rx="3" style="fill:color-mix(in srgb,var(--hi) 35%,var(--card));stroke:var(--hi);stroke-width:2"/><path d="M8 32c5 6 27 6 32 0" style="fill:none;stroke:var(--accent);stroke-width:2.4;stroke-linecap:round"/><path d="M14 38c4 2 16 2 20 0" style="fill:none;stroke:var(--accent);stroke-width:2;stroke-linecap:round;opacity:.6"/>';
  A.toolkit.tools.unshift({ id: 'sounds', shelf: 'sounds', name: 'Sound board', icon: ICON, make: soundBoard });
  A.toolkit.sounds = sounds;
  A.toolkit.soundsOf = soundsOf;
  A.toolkit.decks = decks;
})();
