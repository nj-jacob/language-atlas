/* Language Atlas tool box, Writing shelf: Paragraph builder (#tools/paragraph) and Letter pad (#tools/letters). Shared by every grade.
   Needs atlas.js, tools.js and writebank.js. Composition (Strand D): explicit writing instruction at the sentence and paragraph
   level, and handwriting (D2.2: printing, then cursive from Grade 3), taught the Orton-Gillingham way: see it, say it, trace it, write it.
   Free play: nothing is marked.
     Paragraph builder
       Build    sentence cards for one paragraph, plus one that does not belong. Tap a card, then a place (topic sentence, three
                details, closing sentence); tap a joining word, then a detail, to start it with that word (First, In addition ...).
                The paragraph reads out below, with ticks for a topic sentence first, details that fit and a closing sentence last.
       Stretch  a short sentence to finish three ways: because, but and so. Show an example gives one ending for each.
       Write    your own paragraph in the same frame, with sentence starters (kept on this device).
     Letter pad
       Sets     abc, ABC and 123 (printing) in every grade, and cursive from Grade 3, grouped by how the letters are made.
       Lines    the sky line, the plane line (dashed), the grass line and the ground line.
       Trace    the letter with numbered start dots, then two dotted copies to trace with a finger or a pencil.
       Copy     the letter, then room to write it. Remember: empty lines; Show me draws it, stroke by stroke, then hides it.
       Show me  draws the strokes in order. Clear wipes the ink; Undo takes back the last stroke. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, W = A.writebank, NS = 'http://www.w3.org/2000/svg';
  function forGrade(list) { var g = A.grade; return list.filter(function (x) { return x.g <= g && g <= x.to; }); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = b[i]; b[i] = b[j]; b[j] = t; }
    if (b.join() === a.join()) b.push(b.shift());
    return b;
  }

  /* ---------- Paragraph builder ---------- */
  var SLOTS = [['topic', 'Topic sentence'], ['d1', 'Detail'], ['d2', 'Detail'], ['d3', 'Detail'], ['close', 'Closing sentence']];
  /* a joining word in front of a sentence: First, the ... (the sentence's first letter goes small, unless it is I) */
  function joinUp(word, s) {
    if (!word) return s;
    var rest = /^I\b/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);
    return word + (/that$/.test(word) ? ' ' : ', ') + rest;
  }
  function cardsOf(p) { return { t: p.topic, d0: p.details[0], d1: p.details[1], d2: p.details[2], c: p.close, x: p.off }; }
  function paragraph(p, slots, joins) {
    var C = cardsOf(p);
    return SLOTS.map(function (s) { var id = slots[s[0]]; return id ? joinUp(joins[s[0]], C[id]) : ''; }).filter(Boolean).join(' ');
  }
  function paragraphBuilder(root, canUndo) {
    var paras = forGrade(W.paras), kernels = forGrade(W.kernels), joins = W.joins.filter(function (j) { return j[0] <= A.grade; }).map(function (j) { return j[1]; });
    var st, history = [];
    function fresh(i, view) { return { view: view || 'build', p: i, k: 0, slots: {}, joins: {}, pile: shuffle(['t', 'd0', 'd1', 'd2', 'c', 'x']), pick: '', pickJoin: '', shown: false, ex: false }; }
    st = fresh(0);
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    root.innerHTML = '<div class="wb pb"><div class="wb-tray"></div><div class="wb-mat"></div></div>';
    var tray = $('.wb-tray', root), mat = $('.wb-mat', root);
    function ticks(p) {
      var S = st.slots, ds = ['d1', 'd2', 'd3'].map(function (k) { return S[k]; });
      var off = SLOTS.some(function (s) { return S[s[0]] === 'x'; });
      return [[S.topic === 't', 'Topic sentence first'], [!off && ds.every(function (d) { return d && d.charAt(0) === 'd'; }), 'Details that fit'], [S.close === 'c', 'Closing sentence last']].map(function (t) {
        return '<span class="pb-tick' + (t[0] ? ' pb-ok' : '') + '"><i aria-hidden="true">' + (t[0] ? '&#10003;' : '') + '</i>' + t[1] + '</span>';
      }).join('') + (off ? '<p class="pb-off">One sentence is not about the topic. Which one?</p>' : '');
    }
    function drawBuild() {
      var p = paras[st.p], C = cardsOf(p);
      tray.innerHTML = '<p class="wb-lab">Paragraphs</p><div class="wb-list">' + paras.map(function (x, i) {
        return '<button type="button" class="wb-chip" data-p="' + i + '" aria-pressed="' + (i === st.p) + '">' + x.title + '</button>';
      }).join('') + '</div><p class="wb-lab">Joining words</p><div class="wb-list pb-joins">' + joins.map(function (j) {
        return '<button type="button" class="wb-chip pb-join" data-join="' + esc(j) + '" aria-pressed="' + (st.pickJoin === j) + '">' + j + '</button>';
      }).join('') + '</div>';
      var h = '<div class="pb-frame">' + SLOTS.map(function (s) {
        var id = st.slots[s[0]], j = st.joins[s[0]];
        return '<div class="pb-slot pb-' + s[0].replace(/\d/, '') + (id ? ' pb-full' : '') + '" data-slot="' + s[0] + '" role="button" tabindex="0"><span class="pb-lab">' + s[1] + '</span>' +
          (j ? '<button type="button" class="pb-jw" data-unjoin="' + s[0] + '" aria-label="Take out ' + esc(j) + '">' + j + (/that$/.test(j) ? '' : ',') + '</button>' : '') +
          (id ? '<button type="button" class="pb-card' + (st.pick === id ? ' pb-sel' : '') + '" data-card="' + id + '">' + C[id] + '</button>' : '<span class="pb-empty">Tap a card, then here.</span>') + '</div>';
      }).join('') + '</div>';
      h += '<div class="pb-pile" aria-label="Sentence cards">' + (st.pile.length ? st.pile.map(function (id) {
        return '<button type="button" class="pb-card' + (st.pick === id ? ' pb-sel' : '') + '" data-card="' + id + '" aria-pressed="' + (st.pick === id) + '">' + C[id] + '</button>';
      }).join('') : '') + '</div>';
      var text = paragraph(p, st.slots, st.joins);
      h += '<div class="pb-read"><p class="wb-lab">Your paragraph</p><p class="pb-text">' + (text ? esc(text) : '<span class="pb-empty">Build it above.</span>') + '</p><div class="pb-ticks">' + ticks(p) + '</div></div>' +
        '<div class="wb-do"><button type="button" class="wb-act" data-do="show"' + (st.shown ? ' disabled' : '') + '>Show me</button><button type="button" class="wb-act" data-do="mix">Mix up</button></div>' +
        '<p class="ws-tip adult-only">A paragraph is like a sandwich: the topic sentence and the closing sentence hold the details together. Ask the child to read it aloud, then try a different joining word.</p>';
      return h;
    }
    function drawStretch() {
      var k = kernels[st.k], saved = A.load('stretch', {})[k.k] || {};
      tray.innerHTML = '<p class="wb-lab">Sentences</p><div class="pb-ks">' + kernels.map(function (x, i) {
        return '<button type="button" class="ws-set" data-k="' + i + '" aria-pressed="' + (i === st.k) + '">' + x.k + '</button>';
      }).join('') + '</div>';
      return '<div class="pb-stretch">' + ['because', 'but', 'so'].map(function (w) {
        return '<label class="pb-line pb-' + w + '"><span class="pb-k">' + k.k + ' <b>' + w + '</b></span><input type="text" class="pb-in" data-w="' + w + '" value="' + esc(saved[w] || '') + '" autocomplete="off" aria-label="' + esc(k.k + ' ' + w) + '"><span class="pb-dot">.</span>' +
          (st.ex ? '<small class="pb-ex">For example: ' + k.k + ' ' + w + ' ' + k[w] + '.</small>' : '') + '</label>';
      }).join('') + '</div><div class="wb-do"><button type="button" class="wb-act" data-do="ex" aria-pressed="' + st.ex + '">Show an example</button></div>' +
        '<p class="ws-tip adult-only">Because tells why, but tells a change or a problem, and so tells what happened next. Say each sentence aloud before writing it.</p>';
    }
    function drawWrite() {
      var own = A.load('para-own', {}), S = W.starters;
      tray.innerHTML = '<p class="wb-lab">Sentence starters</p>' + [['topic', 'Topic sentence'], ['detail', 'Details'], ['close', 'Closing sentence']].map(function (x) {
        return '<p class="pb-sh">' + x[1] + '</p><div class="wb-list">' + S[x[0]].filter(function (s) { return s[0] <= A.grade; }).map(function (s) {
          return '<button type="button" class="wb-chip" data-start="' + esc(s[1]) + '" data-part="' + x[0] + '">' + s[1] + '</button>';
        }).join('') + '</div>';
      }).join('');
      var text = SLOTS.map(function (s) { return (own[s[0]] || '').trim(); }).filter(Boolean).join(' ');
      return '<div class="pb-frame">' + SLOTS.map(function (s) {
        return '<label class="pb-slot pb-' + s[0].replace(/\d/, '') + '"><span class="pb-lab">' + s[1] + '</span><textarea class="pb-own" data-own="' + s[0] + '" rows="2">' + esc(own[s[0]] || '') + '</textarea></label>';
      }).join('') + '</div><div class="pb-read"><p class="wb-lab">Your paragraph</p><p class="pb-text">' + (text ? esc(text) : '<span class="pb-empty">Write in the boxes. It stays on this device.</span>') + '</p></div>' +
        '<div class="wb-do"><button type="button" class="wb-act" data-do="clear-own">Start again</button></div>';
    }
    function draw() {
      var h = '<div class="wb-views" role="tablist">' + [['build', 'Build'], ['stretch', 'Stretch'], ['write', 'Write']].map(function (v) {
        return '<button type="button" role="tab" data-view="' + v[0] + '" aria-selected="' + (st.view === v[0]) + '">' + v[1] + '</button>';
      }).join('') + '</div>';
      mat.innerHTML = h + (st.view === 'build' ? drawBuild() : st.view === 'stretch' ? drawStretch() : drawWrite());
    }
    function from(id) { for (var k in st.slots) if (st.slots[k] === id) return k; return ''; }
    function place(id, slot) {
      var was = from(id), there = st.slots[slot];
      if (was) delete st.slots[was]; else st.pile.splice(st.pile.indexOf(id), 1);
      if (there && there !== id) { if (was) st.slots[was] = there; else st.pile.push(there); }
      st.slots[slot] = id; st.pick = '';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'), slotEl = e.target.closest('[data-slot]');
      if (b && b.disabled) return;
      var d = b ? b.dataset : {};
      if (d.view) { var keep = st; history = []; canUndo(false); st = fresh(keep.p, d.view); st.k = keep.k; draw(); }
      else if (d.p) { history = []; canUndo(false); st = fresh(+d.p); draw(); }
      else if (d.k) { st.k = +d.k; st.ex = false; draw(); }
      else if (d.do === 'ex') { st.ex = !st.ex; draw(); }
      else if (d.join) { st.pickJoin = st.pickJoin === d.join ? '' : d.join; st.pick = ''; draw(); }
      else if (d.unjoin) change(function () { delete st.joins[d.unjoin]; });
      else if (d.do === 'show') change(function () { st.slots = { topic: 't', d1: 'd0', d2: 'd1', d3: 'd2', close: 'c' }; st.pile = ['x']; st.pick = ''; st.shown = true; });
      else if (d.do === 'mix') change(function () { var keep = st.p; st = fresh(keep); });
      else if (d.do === 'clear-own') { A.save('para-own', {}); draw(); }
      else if (d.start) {
        var own = A.load('para-own', {}), key = d.part === 'detail' ? (['d1', 'd2', 'd3'].filter(function (x) { return !own[x]; })[0] || 'd3') : d.part;
        own[key] = d.start + ' ' + (own[key] || '').replace(/^\s+/, ''); A.save('para-own', own); draw();
        var ta = $('[data-own="' + key + '"]', root); if (ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
      }
      else if (d.card) {
        var id = d.card, at = from(id);
        if (st.pick && st.pick !== id && at) { var p = st.pick; change(function () { place(p, at); }); }
        else if (st.pick === id && at) change(function () { delete st.slots[at]; st.pile.push(id); st.pick = ''; });
        else if (st.pickJoin && at && /^d/.test(at)) { var jw = st.pickJoin; change(function () { st.joins[at] = jw; st.pickJoin = ''; }); }
        else { st.pick = st.pick === id ? '' : id; st.pickJoin = ''; draw(); }
      }
      else if (slotEl && st.view === 'build') {
        var s = slotEl.getAttribute('data-slot');
        if (st.pick) { var q = st.pick; change(function () { place(q, s); }); }
        else if (st.pickJoin && /^d/.test(s)) { var j = st.pickJoin; change(function () { st.joins[s] = j; st.pickJoin = ''; }); }
      }
    });
    root.addEventListener('input', function (e) {
      var t = e.target;
      if (t.matches('.pb-in')) { var all = A.load('stretch', {}), k = kernels[st.k].k; all[k] = all[k] || {}; all[k][t.getAttribute('data-w')] = t.value; A.save('stretch', all); }
      if (t.matches('.pb-own')) {
        var own = A.load('para-own', {}); own[t.getAttribute('data-own')] = t.value; A.save('para-own', own);
        var text = SLOTS.map(function (s) { return (own[s[0]] || '').trim(); }).filter(Boolean).join(' '), out = $('.pb-text', root);
        if (out) out.textContent = text;
      }
    });
    draw();
    return { undo: undo };
  }

  /* ---------- Letter pad ---------- */
  var LINES = { sky: 10, plane: 55, grass: 100, ground: 145 };
  function setsHere() { return W.letters.filter(function (s) { return s.from <= A.grade && A.grade <= s.to; }); }
  function mini(L) {
    return '<svg viewBox="-4 0 ' + (L.w + 8) + ' 156" aria-hidden="true">' + L.s.map(function (d) { return '<path d="' + d + '"/>'; }).join('') + '</svg>';
  }
  function letterPad(root, canUndo) {
    var sets = setsHere(), start = A.grade >= 4 && sets.some(function (s) { return s.id === 'cursive'; }) ? 'cursive' : 'abc';
    var st = { set: start, ch: '', mode: 'trace', ink: [] }, history = [];
    function set() { return sets.filter(function (s) { return s.id === st.set; })[0]; }
    function first(S) { return S.groups[0][1].split(' ')[0]; }
    st.ch = first(set());
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    root.innerHTML = '<div class="wb lp"><div class="wb-tray"></div><div class="wb-mat"></div></div>';
    var tray = $('.wb-tray', root), mat = $('.wb-mat', root), svg = null, live = null;
    /* where each stroke starts; a start too close to an earlier one moves aside, so both numbers show */
    function starts(L) {
      var out = [];
      L.s.forEach(function (d) {
        var m = /^M([\d.]+),([\d.]+)/.exec(d), x = +m[1], y = +m[2];
        while (out.some(function (o) { return Math.abs(o[0] - x) < 16 && Math.abs(o[1] - y) < 16; })) x += 17;
        out.push([x, y]);
      });
      return out;
    }
    /* three copies of the letter on a wide pad, two on a narrow one (so the letter stays big) */
    function geom(L) { var slot = L.w + 44, n = mat.clientWidth && mat.clientWidth < 640 ? 2 : 3; return { slot: slot, n: n, W: n * slot + 24 }; }
    function model(L, x, cls, nums) {
      return '<g class="' + cls + '" transform="translate(' + x + ' 0)">' + L.s.map(function (d) { return '<path d="' + d + '"/>'; }).join('') +
        (nums ? starts(L).map(function (m, i) { return '<g class="lp-n"><circle cx="' + m[0] + '" cy="' + m[1] + '" r="8"/><text x="' + m[0] + '" y="' + m[1] + '">' + (i + 1) + '</text></g>'; }).join('') : '') + '</g>';
    }
    function draw() {
      var S = set(), L = S.list[st.ch], G = geom(L);
      tray.innerHTML = '<div class="wb-views lp-sets" role="tablist">' + sets.map(function (s) {
        return '<button type="button" role="tab" data-set="' + s.id + '" aria-selected="' + (s.id === st.set) + '">' + s.name + '</button>';
      }).join('') + '</div>' + S.groups.map(function (g) {
        return '<p class="wb-lab">' + g[0] + '</p><div class="lp-keys' + (S.id === 'cursive' ? ' lp-cur' : '') + '">' + g[1].split(' ').map(function (c) {
          return '<button type="button" class="lp-key" data-ch="' + c + '" aria-pressed="' + (c === st.ch) + '" aria-label="' + c + '">' + mini(S.list[c]) + '</button>';
        }).join('') + '</div>';
      }).join('');
      var x0 = 12 + 22, h = '<rect class="lp-skyband" x="0" y="' + LINES.sky + '" width="' + G.W + '" height="' + (LINES.plane - LINES.sky) + '"/><rect class="lp-earth" x="0" y="' + LINES.grass + '" width="' + G.W + '" height="' + (LINES.ground - LINES.grass) + '"/>' +
        Object.keys(LINES).map(function (k) { return '<line class="lp-' + k + '" x1="0" x2="' + G.W + '" y1="' + LINES[k] + '" y2="' + LINES[k] + '"/>'; }).join('');
      if (st.mode !== 'memory') h += model(L, x0, 'lp-model', true);
      if (st.mode === 'trace') for (var k = 1; k < G.n; k++) h += model(L, x0 + k * G.slot, 'lp-dots', false);
      h += '<g class="lp-play" transform="translate(' + x0 + ' 0)"></g><g class="lp-ink">' + st.ink.map(function (p) { return '<polyline points="' + p.join(' ') + '"/>'; }).join('') + '</g>';
      mat.innerHTML = '<div class="lp-bar"><div class="wb-views" role="tablist">' + [['trace', 'Trace'], ['copy', 'Copy'], ['memory', 'Remember']].map(function (m) {
        return '<button type="button" role="tab" data-mode="' + m[0] + '" aria-selected="' + (st.mode === m[0]) + '">' + m[1] + '</button>';
      }).join('') + '</div><div class="wb-do"><button type="button" class="wb-act wb-go" data-do="play">Show me</button><button type="button" class="wb-act" data-do="clear"' + (st.ink.length ? '' : ' disabled') + '>Clear</button></div></div>' +
        '<div class="lp-pad"><span class="lp-names" aria-hidden="true"><i>sky</i><i>plane</i><i>grass</i><i>ground</i></span><svg class="lp-svg" viewBox="0 0 ' + G.W + ' 156" role="img" aria-label="Writing lines for ' + st.ch + '">' + h + '</svg></div>' +
        '<p class="ws-tip adult-only">' + (S.cues[st.ch] ? 'Say it while writing: “' + S.cues[st.ch] + '” ' : '') + 'Start at the green dot and follow the numbers. Sky writing first: trace the letter in the air with a straight arm, then on the table, then on the lines.</p>';
      svg = $('.lp-svg', mat);
    }
    function play() {
      var S = set(), L = S.list[st.ch], g = $('.lp-play', mat), t = 0;
      g.innerHTML = L.s.map(function (d) { return '<path d="' + d + '"/>'; }).join('');
      Array.prototype.forEach.call(g.querySelectorAll('path'), function (p) {
        var len = Math.max(1, p.getTotalLength()), dur = Math.max(0.35, len / 140);
        p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
        p.style.animation = 'lpdraw ' + dur + 's ' + t + 's ease-in-out forwards';
        t += dur + 0.25;
      });
      if (st.mode === 'memory') setTimeout(function () { if (g.isConnected) g.classList.add('lp-fade'); }, (t + 1) * 1000);
    }
    function pt(e) { var p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; var q = p.matrixTransform(svg.getScreenCTM().inverse()); return Math.round(q.x * 10) / 10 + ',' + Math.round(q.y * 10) / 10; }
    root.addEventListener('pointerdown', function (e) {
      if (!svg || !e.target.closest('.lp-svg')) return;
      e.preventDefault(); svg.setPointerCapture(e.pointerId);
      live = { id: e.pointerId, pts: [pt(e)], el: document.createElementNS(NS, 'polyline') };
      live.el.setAttribute('points', live.pts.join(' ')); $('.lp-ink', svg).appendChild(live.el);
    });
    root.addEventListener('pointermove', function (e) {
      if (!live || e.pointerId !== live.id) return;
      live.pts.push(pt(e)); live.el.setAttribute('points', live.pts.join(' '));
    });
    function end(e) {
      if (!live || e.pointerId !== live.id) return;
      var pts = live.pts; live = null;
      if (pts.length === 1) pts.push(pts[0]);
      change(function () { st.ink.push(pts); });
    }
    root.addEventListener('pointerup', end);
    root.addEventListener('pointercancel', end);
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      var d = b.dataset;
      if (d.set) change(function () { st.set = d.set; st.ch = first(set()); st.ink = []; });
      else if (d.ch) change(function () { st.ch = d.ch; st.ink = []; });
      else if (d.mode) change(function () { st.mode = d.mode; st.ink = []; });
      else if (d.do === 'clear') change(function () { st.ink = []; });
      else if (d.do === 'play') play();
    });
    draw();
    return { undo: undo };
  }

  var ICON_PARA = '<rect x="6" y="5" width="36" height="9" rx="4" style="fill:color-mix(in srgb,var(--sd) 30%,var(--card));stroke:var(--sd);stroke-width:2"/><rect x="6" y="17" width="36" height="5" rx="2" style="fill:color-mix(in srgb,var(--hi) 50%,var(--card));stroke:var(--hi);stroke-width:2"/><rect x="6" y="25" width="36" height="5" rx="2" style="fill:color-mix(in srgb,var(--hi) 50%,var(--card));stroke:var(--hi);stroke-width:2"/><rect x="6" y="33" width="36" height="9" rx="4" style="fill:color-mix(in srgb,var(--sd) 30%,var(--card));stroke:var(--sd);stroke-width:2"/>';
  var ICON_PAD = '<rect x="3" y="8" width="42" height="32" rx="4" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><path d="M3 16h42M3 32h42" style="stroke:var(--sb);stroke-width:1.5"/><path d="M3 24h42" style="stroke:var(--ink3);stroke-width:1.5;stroke-dasharray:3 3"/><path d="M28 19 A6 6 0 1 0 28 29 M30 18v14" style="fill:none;stroke:var(--sa);stroke-width:2.5;stroke-linecap:round"/>';
  A.toolkit.tools.push({ id: 'paragraph', shelf: 'write', name: 'Paragraph builder', icon: ICON_PARA, make: paragraphBuilder },
    { id: 'letters', shelf: 'write', name: 'Letter pad', icon: ICON_PAD, make: letterPad });
  A.toolkit.paragraph = paragraph;
  A.toolkit.joinUp = joinUp;
  A.toolkit.lines = LINES;
})();
