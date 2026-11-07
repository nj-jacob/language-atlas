/* Language Atlas tool box, Reading shelf: Text maps (#tools/maps). Shared by every grade. Needs atlas.js, tools.js and mapbank.js.
   Comprehension: how texts are built (text patterns and story elements, Strand C), taught with graphic organizers.
   Free play: nothing is marked.
     Maps     Beginning, middle, end; Sequence; Story map (who, where, problem, solution); Main idea and details; Story mountain;
              Cause and effect; Compare (two circles); Fact or opinion; Argument (claim, reasons, evidence, the other side).
              A grade sees a map when mapbank.js has a text for that grade.
     A text   read it first, then sort its parts onto the map: tap a card, then a box (tap a placed card to pick it again, and
              tap it once more to send it back). Show the map puts every card in its box; Mix up starts again.
     Blank    the same map with empty boxes to type in, for any book or plan (kept on this device, one per map). */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, B = A.mapbank;
  var MAPS = [
    { id: 'bme', name: 'Beginning, middle, end', shape: 'row', boxes: [['b', 'Beginning'], ['m', 'Middle'], ['e', 'End']] },
    { id: 'seq', name: 'Sequence', shape: 'steps', boxes: [['1', 'First'], ['2', 'Next'], ['3', 'Then'], ['4', 'Last']] },
    { id: 'sps', name: 'Story map', shape: 'grid', boxes: [['who', 'Who'], ['where', 'Where'], ['prob', 'Problem'], ['sol', 'Solution']] },
    { id: 'main', name: 'Main idea', shape: 'table', boxes: [['main', 'Main idea'], ['d', 'Details']] },
    { id: 'mountain', name: 'Story mountain', shape: 'mountain', boxes: [['set', 'Beginning'], ['prob', 'Problem'], ['rise', 'Rising action'], ['climax', 'Climax'], ['fall', 'Falling action'], ['end', 'Ending']] },
    { id: 'cause', name: 'Cause and effect', shape: 'pairs', boxes: [['c1', 'Cause'], ['e1', 'Effect'], ['c2', 'Cause'], ['e2', 'Effect'], ['c3', 'Cause'], ['e3', 'Effect']] },
    { id: 'venn', name: 'Compare', shape: 'venn', boxes: [['a', 'Only'], ['both', 'Both'], ['b', 'Only']] },
    { id: 'fact', name: 'Fact or opinion', shape: 'sort', boxes: [['fact', 'Fact'], ['opin', 'Opinion']] },
    { id: 'claim', name: 'Argument', shape: 'grid', boxes: [['claim', 'Claim'], ['reason', 'Reasons'], ['evid', 'Evidence'], ['counter', 'The other side']] }
  ];
  var TIPS = {
    bme: 'Ask: what happened first? What happened in the middle? How did it end?',
    seq: 'Ask the child to retell the steps with First, Next, Then, Last.',
    sps: 'Retell the story from the map: who, where, the problem and how it was solved.',
    main: 'The main idea is what the whole text is about; each detail tells more about it. Ask: does this detail fit the main idea?',
    mountain: 'The climax is the most exciting part, where the problem is faced. Ask: where does the story turn?',
    cause: 'A cause makes something happen; the effect is what happens. Try reading each pair with because, then with so.',
    venn: 'Ask: how are they the same? How are they different? Then turn the map into two sentences with both and but.',
    fact: 'A fact can be checked. An opinion tells what someone thinks or feels; look for words such as best, should and boring.',
    claim: 'Ask: which reason is stronger, and why? Does each piece of evidence back up its reason?'
  };
  function textsFor(m) { var g = A.grade; return B.filter(function (t) { return t.map === m && t.g <= g && g <= t.to; }); }
  function mapsHere() { return MAPS.filter(function (m) { return textsFor(m.id).length; }); }
  function shuffle(n) {
    var b = []; for (var i = 0; i < n; i++) b.push(i);
    for (var k = n - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)), t = b[k]; b[k] = b[j]; b[j] = t; }
    if (b.every(function (x, i) { return x === i; })) b.push(b.shift());
    return b;
  }

  function textMaps(root, canUndo) {
    var maps = mapsHere(), st, history = [];
    function fresh(mi, ti) {
      var m = maps[mi], T = textsFor(m.id), t = T[ti];
      return { m: mi, t: ti, placed: {}, pile: t ? shuffle(t.cards.length) : [], pick: -1, read: true, shown: false };
    }
    st = fresh(0, 0);
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    function reset(mi, ti) { history = []; canUndo(false); st = fresh(mi, ti); draw(); }
    root.innerHTML = '<div class="wb tm"><div class="wb-tray"></div><div class="wb-mat"></div></div>';
    var tray = $('.wb-tray', root), mat = $('.wb-mat', root);
    function map() { return maps[st.m]; }
    function text() { return textsFor(map().id)[st.t]; }
    function cap(t, box) { return t.cards.filter(function (c) { return c[0] === box; }).length; }
    function label(m, b, t) { return m.id === 'venn' && t && t.labels && b[0] !== 'both' ? 'Only ' + t.labels[b[0]].toLowerCase() : b[1]; }
    function blankKey() { return 'maps:' + map().id; }

    function draw() {
      var m = map(), T = textsFor(m.id), t = text(), blank = st.t < 0;
      tray.innerHTML = '<p class="wb-lab">Maps</p><div class="tm-maps">' + maps.map(function (x, i) {
        return '<button type="button" class="tm-pick" data-map="' + i + '" aria-pressed="' + (i === st.m) + '"><i class="tm-ic tm-ic-' + x.shape + '" aria-hidden="true"></i>' + x.name + '</button>';
      }).join('') + '</div>';
      var h = '<div class="wb-views tm-texts" role="tablist">' + T.map(function (x, i) {
        return '<button type="button" role="tab" data-t="' + i + '" aria-selected="' + (st.t === i) + '">' + x.title + '</button>';
      }).join('') + '<button type="button" role="tab" data-t="-1" aria-selected="' + blank + '">Blank</button></div>';
      if (!blank) {
        var lines = t.text || t.cards.map(function (c) { return c[1]; });
        h += '<div class="tm-read' + (st.read ? '' : ' tm-closed') + '"><button type="button" class="tm-rh" data-do="read" aria-expanded="' + st.read + '"><b>' + t.title + '</b><span>' + (st.read ? 'Hide the text' : 'Read the text') + '</span></button>' +
          (st.read ? '<p>' + lines.join(' ') + '</p>' : '') + '</div>';
      }
      var saved = blank ? A.load(blankKey(), {}) : null;
      h += '<div class="tm-shape tm-' + m.shape + '">' + (m.shape === 'mountain' ? '<svg class="tm-peak" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M4 96 L50 8 L96 96"/></svg>' : '') +
        m.boxes.map(function (b, bi) {
          var inner;
          if (blank) inner = '<textarea class="tm-in" data-box="' + b[0] + '" rows="3" aria-label="' + label(m, b, null) + '">' + (saved[b[0]] || '').replace(/</g, '&lt;') + '</textarea>';
          else inner = (st.placed[b[0]] || []).map(function (ci) { return '<button type="button" class="tm-card' + (st.pick === ci ? ' tm-sel' : '') + '" data-card="' + ci + '">' + t.cards[ci][1] + '</button>'; }).join('');
          return '<div class="tm-box tm-b-' + b[0] + (blank ? '' : ' tm-drop') + '"' + (blank ? '' : ' data-box="' + b[0] + '" role="button" tabindex="0"') + ' style="--i:' + bi + '"><span class="tm-lab">' + (blank && m.id === 'venn' ? b[0] === 'both' ? 'Both' : b[0] === 'a' ? 'Only the first' : 'Only the second' : label(m, b, t)) + '</span>' + inner + '</div>';
        }).join('') + '</div>';
      if (!blank) {
        h += '<div class="tm-pile" aria-label="Cards">' + (st.pile.length ? st.pile.map(function (ci) {
          return '<button type="button" class="tm-card' + (st.pick === ci ? ' tm-sel' : '') + '" data-card="' + ci + '" aria-pressed="' + (st.pick === ci) + '">' + t.cards[ci][1] + '</button>';
        }).join('') : '<span class="ws-done">Retell the text from the map.</span>') + '</div>' +
          '<div class="wb-do"><button type="button" class="wb-act" data-do="show"' + (st.shown ? ' disabled' : '') + '>Show the map</button><button type="button" class="wb-act" data-do="mix">Mix up</button></div>';
      } else h += '<p class="tm-note">Type in the boxes for any book you read. It stays on this device.</p>';
      h += '<p class="ws-tip adult-only">' + TIPS[m.id] + '</p>';
      mat.innerHTML = h;
    }
    function where(ci) { for (var k in st.placed) if (st.placed[k].indexOf(ci) >= 0) return k; return ''; }
    function put(ci, box) {
      var t = text(), from = where(ci);
      if (from === box) return;
      if (from) st.placed[from].splice(st.placed[from].indexOf(ci), 1); else st.pile.splice(st.pile.indexOf(ci), 1);
      var list = st.placed[box] = st.placed[box] || [];
      list.push(ci);
      if (list.length > cap(t, box)) st.pile.push(list.shift());
      st.pick = -1;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'), drop = e.target.closest('.tm-drop');
      if (b && b.disabled) return;
      var d = b ? b.dataset : {};
      if (d.map) reset(+d.map, 0);
      else if (d.t) reset(st.m, +d.t);
      else if (d.do === 'read') { st.read = !st.read; draw(); }
      else if (d.do === 'show') change(function () {
        var t = text(); st.placed = {}; st.pile = []; st.pick = -1; st.shown = true;
        t.cards.forEach(function (c, i) { (st.placed[c[0]] = st.placed[c[0]] || []).push(i); });
      });
      else if (d.do === 'mix') change(function () { st = fresh(st.m, st.t); });
      else if (d.card) {
        var ci = +d.card, at = where(ci);
        if (st.pick >= 0 && st.pick !== ci && at) { var p = st.pick; change(function () { put(p, at); }); }
        else if (st.pick === ci && at) change(function () { st.placed[at].splice(st.placed[at].indexOf(ci), 1); st.pile.push(ci); st.pick = -1; });
        else { st.pick = st.pick === ci ? -1 : ci; draw(); }
      }
      else if (drop && st.pick >= 0) { var q = st.pick, box = drop.getAttribute('data-box'); change(function () { put(q, box); }); }
    });
    root.addEventListener('keydown', function (e) {
      var drop = e.target.closest && e.target.closest('.tm-drop');
      if (drop && e.target === drop && (e.key === 'Enter' || e.key === ' ') && st.pick >= 0) { e.preventDefault(); var q = st.pick; change(function () { put(q, drop.getAttribute('data-box')); }); }
    });
    root.addEventListener('input', function (e) {
      if (!e.target.matches('.tm-in')) return;
      var all = A.load(blankKey(), {}); all[e.target.getAttribute('data-box')] = e.target.value; A.save(blankKey(), all);
    });
    draw();
    return { undo: undo };
  }

  var ICON = '<path d="M4 42 L24 8 L44 42" style="fill:none;stroke:var(--ink3);stroke-width:2;stroke-linejoin:round"/><rect x="2" y="30" width="12" height="9" rx="2" style="fill:var(--card);stroke:var(--sb);stroke-width:2"/><rect x="18" y="4" width="12" height="9" rx="2" style="fill:color-mix(in srgb,var(--hi) 45%,var(--card));stroke:var(--sa);stroke-width:2"/><rect x="34" y="30" width="12" height="9" rx="2" style="fill:var(--card);stroke:var(--sd);stroke-width:2"/>';
  A.toolkit.tools.push({ id: 'maps', shelf: 'read', name: 'Text maps', icon: ICON, make: textMaps });
  A.toolkit.maps = MAPS;
})();
