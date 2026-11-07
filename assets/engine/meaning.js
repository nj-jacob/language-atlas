/* Language Atlas tool box, Words and meaning shelf: Word shades (#tools/shades) and Word web (#tools/web). Shared by every grade.
   Needs atlas.js, tools.js and meaningbank.js (the words). Vocabulary: explicit teaching of word meanings, shades of meaning
   and word families (Science of Reading: vocabulary and morphology; Orton-Gillingham: Greek and Latin roots, Grades 7 and 8).
   Free play: nothing is marked.
     Word shades  a paint strip, weakest to strongest. Tap a word card, then a spot on the strip to put it there (tap a placed card
                  to send it back). The sentence under the strip puts the last word moved into a sentence, to say it aloud.
                  Show the order puts the cards where the word list has them; Mix up starts again. Grades 7 and 8 add sets with the
                  same meaning but a different feeling (connotation): sounds negative to sounds positive.
     Word web     one word in the middle with what it means, words like it, opposites and its word family, and an example. From
                  Grade 7, its Greek or Latin roots and other words with the same root. Cover hides each part, so a grown-up
                  can ask first; tap a part to show it. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, B = A.meaningbank;
  function forGrade(list) { var g = A.grade; return list.filter(function (x) { return x.g <= g && g <= x.to; }); }
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; }
    if (b.join() === a.join()) b.push(b.shift());
    return b;
  }

  /* ---------- Word shades ---------- */
  function wordShades(root, canUndo) {
    var sets = forGrade(B.shades), st = null, history = [];
    function fresh(i) { var s = sets[i]; return { at: i, strip: s.words.map(function () { return ''; }), pile: shuffle(s.words), pick: '', last: '', shown: false }; }
    st = fresh(0);
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    root.innerHTML = '<div class="wb ws"><div class="wb-tray"></div><div class="wb-mat"></div></div>';
    var tray = $('.wb-tray', root), mat = $('.wb-mat', root);
    function draw() {
      var s = sets[st.at], n = s.words.length;
      tray.innerHTML = '<p class="wb-lab">Word sets</p><div class="ws-sets">' + sets.map(function (x, i) {
        return '<button type="button" class="ws-set' + (x.feel ? ' ws-feel' : '') + '" data-set="' + i + '" aria-pressed="' + (i === st.at) + '"><i class="ws-chipbar" aria-hidden="true">' +
          x.words.map(function (w, j) { return '<b style="--t:' + tone(j, x.words.length) + '"></b>'; }).join('') + '</i><span>' + x.words.slice().sort().join(' &middot; ') + '</span></button>';
      }).join('') + '</div>';
      var ends = s.feel ? ['sounds negative', 'sounds positive'] : ['weaker', 'stronger'];
      var frame = s.frame.split('___'), say = st.last || st.pick;
      mat.innerHTML = '<div class="ws-ends' + (s.feel ? ' ws-feelends' : '') + '"><span>' + ends[0] + '</span><i aria-hidden="true"></i><span>' + ends[1] + '</span></div>' +
        '<div class="ws-strip' + (s.feel ? ' ws-feelstrip' : '') + '" style="--n:' + n + '">' + st.strip.map(function (w, i) {
          return '<button type="button" class="ws-spot' + (w ? ' ws-full' : '') + '" data-spot="' + i + '" style="--t:' + tone(i, n) + '" aria-label="' + (w ? w : 'Empty spot ' + (i + 1)) + '">' + (w ? '<span class="ws-card' + (st.pick === w ? ' ws-sel' : '') + '">' + w + '</span>' : '') + '</button>';
        }).join('') + '</div>' +
        '<div class="ws-pile" aria-label="Word cards">' + (st.pile.length ? st.pile.map(function (w) {
          return '<button type="button" class="ws-card' + (st.pick === w ? ' ws-sel' : '') + '" data-w="' + w + '" aria-pressed="' + (st.pick === w) + '">' + w + '</button>';
        }).join('') : '<span class="ws-done">' + (s.feel ? 'Say each word in the sentence. How does it feel?' : 'Read the strip from weakest to strongest.') + '</span>') + '</div>' +
        '<p class="ws-try">' + frame[0] + '<b class="ws-blank">' + (say || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') + '</b>' + frame[1] + '</p>' +
        '<div class="wb-do"><button type="button" class="wb-act" data-do="show"' + (st.shown ? ' disabled' : '') + '>Show the order</button><button type="button" class="wb-act" data-do="mix">Mix up</button></div>' +
        '<p class="ws-tip adult-only">' + (s.feel ? 'Same meaning, a different feeling. Ask: who would use each word, a friend or someone annoyed? Which would you use in an ad?'
          : 'Ask why each word goes where it does. People can disagree on the middle words: the talk matters more than the order.') + '</p>';
    }
    function place(w, spot) {
      var from = st.strip.indexOf(w), there = st.strip[spot];
      if (from >= 0) st.strip[from] = ''; else st.pile.splice(st.pile.indexOf(w), 1);
      if (there && there !== w) { if (from >= 0) st.strip[from] = there; else st.pile.push(there); }
      st.strip[spot] = w; st.pick = ''; st.last = w;
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      var d = b.dataset;
      if (d.set) { history = []; canUndo(false); st = fresh(+d.set); draw(); }
      else if (d.w) { st.pick = st.pick === d.w ? '' : d.w; draw(); }
      else if (d.spot) {
        var i = +d.spot, here = st.strip[i];
        if (st.pick && st.pick !== here) { var w = st.pick; change(function () { place(w, i); }); }
        else if (here && st.pick === here) change(function () { st.strip[i] = ''; st.pile.push(here); st.pick = ''; st.last = here; });
        else if (here) { st.pick = here; st.last = here; draw(); }
      }
      else if (d.do === 'show') change(function () { var s = sets[st.at]; st.strip = s.words.slice(); st.pile = []; st.pick = ''; st.shown = true; st.last = s.words[s.words.length - 1]; });
      else if (d.do === 'mix') change(function () { var keep = st.at; st = fresh(keep); });
    });
    draw();
    return { undo: undo };
  }
  /* the strip's colour: from pale to deep */
  function tone(i, n) { return Math.round(14 + 70 * i / Math.max(1, n - 1)) + '%'; }

  /* ---------- Word web ---------- */
  var PARTS = [['means', 'What it means'], ['like', 'Words like it'], ['opp', 'Opposites'], ['fam', 'Word family'], ['roots', 'Roots'], ['kin', 'Same root']];
  /* where part i of n sits around the word (percent of the web): round from the top left */
  function spot(i, n) { var a = Math.PI * 2 * i / n - Math.PI / 2 - Math.PI / n; return [(50 + 33 * Math.cos(a)).toFixed(1), (50 + 37 * Math.sin(a)).toFixed(1)]; }
  function wordWeb(root, canUndo) {
    var words = forGrade(B.web), st = { at: 0, cover: false, seen: [] }, history = [];
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    root.innerHTML = '<div class="wb wnweb"><div class="wb-tray"></div><div class="wb-mat"></div></div>';
    var tray = $('.wb-tray', root), mat = $('.wb-mat', root);
    function cell(x, k) {
      var v = x[k];
      if (k === 'means') return v;
      if (k === 'roots') return v.map(function (r) { return '<b>' + r[0] + '</b> ' + r[1]; }).join('<br>');
      return v.length ? v.join(', ') : '&mdash;';
    }
    function example(x) {
      var forms = [x.w].concat(x.fam).sort(function (a, b) { return b.length - a.length; });
      var re = new RegExp('\\b(' + forms.join('|') + ')(e?d|s|ing)?\\b', 'i');
      return x.ex.replace(re, '<b>$&</b>');
    }
    function draw() {
      var x = words[st.at];
      tray.innerHTML = '<p class="wb-lab">Words</p><div class="wb-list">' + words.map(function (y, i) {
        return '<button type="button" class="wb-chip" data-at="' + i + '" aria-pressed="' + (i === st.at) + '">' + y.w + '</button>';
      }).join('') + '</div>';
      var parts = PARTS.filter(function (p) { return x[p[0]] && (p[0] !== 'opp' || x.opp.length); });
      mat.innerHTML = '<div class="wb-do wn-top"><button type="button" class="wb-act" data-do="cover" aria-pressed="' + st.cover + '">Cover</button></div>' +
        '<div class="wn-web wn-n' + parts.length + '"><svg class="wn-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
        parts.map(function (p, i) { var o = spot(i, parts.length); return '<line x1="50" y1="50" x2="' + o[0] + '" y2="' + o[1] + '"/>'; }).join('') + '</svg>' +
        '<div class="wn-mid"><span class="wn-w">' + x.w + '</span><small>' + x.part + '</small></div>' +
        parts.map(function (p, i) {
          var hid = st.cover && st.seen.indexOf(p[0]) < 0, o = spot(i, parts.length);
          return '<button type="button" class="wn-cell wn-' + p[0] + (hid ? ' wn-hid' : '') + '" data-part="' + p[0] + '" style="--x:' + o[0] + '%;--y:' + o[1] + '%">' +
            '<span class="wn-lab">' + p[1] + '</span><span class="wn-v">' + (hid ? 'Tap to show' : cell(x, p[0])) + '</span></button>';
        }).join('') + '</div>' +
        '<p class="wn-ex">' + (st.cover && st.seen.indexOf('ex') < 0 ? '<button type="button" class="wb-chip" data-part="ex">Show the example</button>' : example(x)) + '</p>' +
        '<p class="ws-tip adult-only">' + (x.roots ? 'Say each root and its meaning, then find it in the other words. Ask: what might a new word with this root mean?'
          : 'Ask the child to use the word in their own sentence, then to say a word from its family.') + '</p>';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      var d = b.dataset;
      if (d.at) change(function () { st.at = +d.at; st.seen = []; });
      else if (d.do === 'cover') change(function () { st.cover = !st.cover; st.seen = []; });
      else if (d.part && st.cover && st.seen.indexOf(d.part) < 0) change(function () { st.seen.push(d.part); });
    });
    draw();
    return { undo: undo };
  }

  var ICON_SHADES = '<rect x="4" y="14" width="8" height="20" rx="2" style="fill:color-mix(in srgb,var(--sb) 15%,var(--card));stroke:var(--sb);stroke-width:2"/><rect x="14" y="14" width="8" height="20" rx="2" style="fill:color-mix(in srgb,var(--sb) 40%,var(--card));stroke:var(--sb);stroke-width:2"/><rect x="24" y="14" width="8" height="20" rx="2" style="fill:color-mix(in srgb,var(--sb) 65%,var(--card));stroke:var(--sb);stroke-width:2"/><rect x="34" y="14" width="8" height="20" rx="2" style="fill:var(--sb);stroke:var(--sb);stroke-width:2"/>';
  var ICON_WEB = '<path d="M24 24L8 10M24 24L40 10M24 24L8 38M24 24L40 38" style="stroke:var(--ink3);stroke-width:2"/><circle cx="8" cy="10" r="5" style="fill:var(--card);stroke:var(--sb);stroke-width:2"/><circle cx="40" cy="10" r="5" style="fill:var(--card);stroke:var(--sd);stroke-width:2"/><circle cx="8" cy="38" r="5" style="fill:var(--card);stroke:var(--sa);stroke-width:2"/><circle cx="40" cy="38" r="5" style="fill:var(--card);stroke:var(--sc);stroke-width:2"/><rect x="14" y="18" width="20" height="12" rx="6" style="fill:var(--ink);stroke:var(--ink);stroke-width:2"/>';
  A.toolkit.tools.push({ id: 'shades', shelf: 'mean', name: 'Word shades', icon: ICON_SHADES, make: wordShades },
    { id: 'web', shelf: 'mean', name: 'Word web', icon: ICON_WEB, make: wordWeb });
  A.toolkit.forGrade = forGrade;
})();
