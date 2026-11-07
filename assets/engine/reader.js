/* Language Atlas tool box: the Reading window (#tools/read), for reading fluency (curriculum B2.8: accuracy, pace and expression).
   Needs atlas.js, words.js and tools.js, and the grade's passages (gradeN/texts.js, Atlas.texts). It adds itself to the tool box.
   The child reads aloud to a grown-up (nothing is read to the child). Free play: nothing is marked.
     Window   Page (the whole passage), Line (one sentence clear, the rest faded) or Phrase (one phrase at a time, with a scoop
              under each phrase: phrase-cued text). Next and Back move the window; tapping a sentence or phrase jumps to it.
     Music    marks for expression: a pause after a comma, the voice going down at a full stop and up at a question, a strong voice
              at !, and talking in quotation marks tinted, so the child reads it like the character.
     Tricky   tap a word to mark it; the marked words gather under the passage, for the grown-up to practise.
     Read again  back to the start, and the reads are counted (repeated reading).
     Grown-up view: One-minute read. Start, the child reads aloud, tap each word misread, then tap the last word read.
              It shows words read, words correct per minute and accuracy, and saves them ('fluency', the last 60 reads) for
              My progress, where they show in grown-up view. Nothing is shown to the child. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$;
  /* words that usually start a new phrase: joining words, and the little words that start a where, when or how part */
  var STARTS = /^(and|but|so|or|because|when|while|after|before|until|if|then|with|without|to|in|on|at|under|over|into|onto|from|for|by|through|across|around|behind|beside|near|up|down|that|who|which|where|as|like|since|although|though)$/i;
  var MAX = 5;
  /* little words that lean on the word after them, so a phrase never ends on one (the | ball) */
  var LEAN = /^(the|a|an|my|your|our|their|his|its|this|these|those|some|every|to|of|very)$/i;

  /* a sentence cut into phrases: after a comma or other mark, and before a joining or place word (each phrase 2 to 5 words) */
  function phrases(s) {
    var out = [], cur = [];
    s.split(/\s+/).forEach(function (w) {
      var bare = w.replace(/^[“"‘(]+|[^A-Za-z’']+$/g, '');
      if (cur.length >= 2 && (STARTS.test(bare) || cur.length >= MAX)) {
        var keep = [];
        while (cur.length > 2 && LEAN.test(cur[cur.length - 1])) keep.unshift(cur.pop());
        out.push(cur); cur = keep;
      }
      cur.push(w);
      if (/[,;:.!?…—”]$/.test(w) && cur.length) { out.push(cur); cur = []; }
    });
    if (cur.length) out.push(cur);
    /* a phrase of one word joins the phrase before it (when that one does not end at a mark) */
    out = out.reduce(function (all, p) {
      var last = all[all.length - 1];
      if (p.length === 1 && last && last.length < MAX + 1 && !/[,;:.!?…—”]$/.test(last[last.length - 1])) all[all.length - 1] = last.concat(p);
      else all.push(p);
      return all;
    }, []);
    return out.map(function (p) { return p.join(' '); });
  }
  /* the passage, sentence by sentence: [{ head }, { para }, { s, ph: [phrases] }] */
  function lay(t) {
    return t.lines.map(function (l) {
      if (l === '') return { para: true };
      if (l.charAt(0) === '#') return { head: l.slice(2) };
      return { s: l, ph: phrases(l) };
    });
  }
  function passages() {
    var T = A.texts || {};
    return Object.keys(T).filter(function (k) { return T[k] && T[k].lines; }).map(function (k) { return { id: k, t: T[k], n: T.words(T[k]) }; })
      .sort(function (a, b) { return a.n - b.n; });
  }

  function readingWindow(root, canUndo) {
    var g = A.grade, list = passages();
    var st = { id: list.length ? list[0].id : '', mode: g <= 3 ? 'line' : g <= 6 ? 'phrase' : 'page', at: 0, size: g <= 2 ? 3 : g <= 5 ? 2 : 1, wide: g <= 3,
      music: g >= 2, tricky: [], reads: 1, timing: null };
    var history = [];
    function change(fn) { history.push(JSON.stringify(st)); fn(); canUndo(true); draw(); }
    function undo() { if (!history.length) return; st = JSON.parse(history.pop()); canUndo(history.length > 0); draw(); }
    function cur() { return list.filter(function (p) { return p.id === st.id; })[0]; }

    root.innerHTML = '<div class="rw"><div class="rw-tray"></div><div class="rw-mat"><div class="rw-bar"></div><div class="rw-page"></div><div class="rw-nav"></div><div class="rw-low"></div></div></div>';
    var tray = $('.rw-tray', root), bar = $('.rw-bar', root), page = $('.rw-page', root), low = $('.rw-low', root), nav = $('.rw-nav', root);

    /* the units the window moves through: sentences (Line) or phrases (Phrase) */
    function units(L) {
      var u = [];
      L.forEach(function (x, i) { if (x.s) { if (st.mode === 'phrase') x.ph.forEach(function (p, j) { u.push(i + '.' + j); }); else u.push(i + ''); } });
      return u;
    }
    function word(w, key) {
      var m = /^([^A-Za-z]*)([A-Za-z](?:[A-Za-z’'-]*[A-Za-z])?)?(.*)$/.exec(w), pre = m[1], core = m[2] || '', post = m[3], bare = core.toLowerCase();
      if (!bare) return w;
      var on = st.tricky.indexOf(bare) >= 0, miss = st.timing && st.timing.miss.indexOf(key) >= 0;
      var mark = '';
      if (st.music) {
        if (/,$/.test(post)) mark = '<i class="rw-m rw-pause" aria-hidden="true"></i>';
        else if (/\?/.test(post)) mark = '<i class="rw-m rw-up" aria-hidden="true"></i>';
        else if (/!/.test(post)) mark = '<i class="rw-m rw-bang" aria-hidden="true"></i>';
        else if (/\./.test(post)) mark = '<i class="rw-m rw-down" aria-hidden="true"></i>';
      }
      return pre + '<button type="button" class="rw-w' + (on ? ' rw-tricky' : '') + (miss ? ' rw-miss' : '') + (st.timing && st.timing.last === key ? ' rw-last' : '') + '" data-w="' + bare + '" data-k="' + key + '">' + core + '</button>' + post + mark;
    }
    /* quotation marks: the talking inside them is tinted */
    function talk(html) { return html.replace(/“/g, '<span class="rw-talk">“').replace(/”/g, '”</span>'); }

    function draw() {
      var P = cur();
      tray.innerHTML = '<p class="wb-lab">Passages</p><div class="rw-list">' + list.map(function (p) {
        return '<button type="button" class="rw-pick" data-id="' + p.id + '" aria-pressed="' + (p.id === st.id) + '"><span class="rw-pp">' + (p.t.pics && p.t.pics[0] ? A.W.pic(p.t.pics[0]) : '') + '</span><span><b>' + p.t.title + '</b><small>' + p.n + ' words</small></span></button>';
      }).join('') + '</div>';
      if (!P) { page.innerHTML = '<p class="wb-empty">No passages for this grade yet.</p>'; return; }
      var L = lay(P.t), U = st.mode === 'page' ? [] : units(L), now = U[Math.min(st.at, U.length - 1)] || '';
      bar.innerHTML = '<div class="wb-views" role="tablist">' + [['page', 'Page'], ['line', 'Line'], ['phrase', 'Phrase']].map(function (m) {
        return '<button type="button" role="tab" data-mode="' + m[0] + '" aria-selected="' + (st.mode === m[0]) + '">' + m[1] + '</button>';
      }).join('') + '</div><div class="rw-opts"><button type="button" class="wb-act" data-do="music" aria-pressed="' + st.music + '">Music</button>' +
        '<button type="button" class="wb-act rw-sz" data-do="smaller" aria-label="Smaller text"' + (st.size <= 0 ? ' disabled' : '') + '>A&minus;</button>' +
        '<button type="button" class="wb-act rw-sz" data-do="bigger" aria-label="Bigger text"' + (st.size >= 4 ? ' disabled' : '') + '>A+</button>' +
        '<button type="button" class="wb-act" data-do="wide" aria-pressed="' + st.wide + '">Space</button></div>';
      var h = '', open = false, n = 0;
      L.forEach(function (x, i) {
        if (x.head || x.para) { if (open) { h += '</p>'; open = false; } if (x.head) h += '<h3 class="rw-h">' + x.head + '</h3>'; return; }
        if (!open) { h += '<p>'; open = true; }
        var inner = x.ph.map(function (p, j) {
          var key = i + '.' + j, ws = p.split(' ').map(function (w) { return word(w, key + '.' + (n++)); }).join(' ');
          return '<span class="rw-ph' + (st.mode === 'phrase' ? ' rw-scoop' : '') + (st.mode === 'phrase' && now === key ? ' rw-now' : '') + '" data-u="' + key + '">' + ws + '</span>';
        }).join(' ');
        h += '<span class="rw-s' + (st.mode === 'line' && now === i + '' ? ' rw-now' : '') + '" data-u="' + i + '">' + talk(inner) + '</span> ';
      });
      if (open) h += '</p>';
      page.className = 'rw-page rw-z' + st.size + (st.wide ? ' rw-wide' : '') + (st.mode !== 'page' ? ' rw-focus' : '');
      page.innerHTML = '<div class="rw-head">' + (P.t.pics || []).map(A.W.pic).join('') + '<h2>' + P.t.title + '</h2></div><div class="rw-text">' + h + '</div>';
      var T = st.timing;
      nav.innerHTML = st.mode !== 'page' ? '<div class="rw-move"><button type="button" class="wb-act" data-do="back"' + (st.at <= 0 ? ' disabled' : '') + '>Back</button>' +
        '<span class="rw-pos">' + (Math.min(st.at, U.length - 1) + 1) + ' of ' + U.length + '</span><button type="button" class="wb-act wb-go" data-do="next"' + (st.at >= U.length - 1 ? ' disabled' : '') + '>Next</button></div>' : '';
      low.innerHTML = '<div class="rw-tk"><span class="wb-lab">Tricky words</span>' + (st.tricky.length ? st.tricky.map(function (w) { return '<button type="button" class="wb-chip" data-un="' + w + '">' + w + '</button>'; }).join('') : '<span class="rw-hint">Tap a word to mark it.</span>') + '</div>' +
        '<div class="rw-again"><button type="button" class="wb-act" data-do="again">Read again</button><span class="rw-reads" aria-label="Read ' + st.reads + (st.reads > 1 ? ' times' : ' time') + '">' + new Array(st.reads + 1).join('<i></i>') + '</span></div>' +
        '<div class="rw-time adult-only">' + (T ? T.done ? '<p class="rw-res"><b>' + T.read + '</b> words read &middot; <b>' + T.miss.length + '</b> misread &middot; <b>' + T.wcpm + '</b> words correct a minute &middot; <b>' + T.acc + '%</b> right <small>(saved to My progress)</small></p><button type="button" class="wb-act" data-do="clock-off">Done</button>'
          : T.end ? '<p class="rw-res">Tap the last word read.</p>' : '<span class="rw-bar1"><i style="animation-duration:60s"></i></span><button type="button" class="wb-act" data-do="stop">Stop</button><span class="rw-hint">Tap each word misread.</span>'
          : '<button type="button" class="wb-act" data-do="clock">One-minute read</button><span class="rw-hint">Grown-up: time a read aloud, tap each word misread.</span>') + '</div>';
      var n2 = $('.rw-now', page);
      if (n2) n2.scrollIntoView({ block: 'nearest' });
    }

    var timer = null;
    function stopClock(end) { clearTimeout(timer); timer = null; if (st.timing) { st.timing.end = true; st.timing.secs = end ? 60 : Math.max(1, Math.round((Date.now() - st.timing.t0) / 1000)); } draw(); }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button'), u = e.target.closest('[data-u]');
      if (b && b.disabled) return;
      var d = b ? b.dataset : {};
      if (d.id) change(function () { st.id = d.id; st.at = 0; st.tricky = []; st.reads = 1; st.timing = null; });
      else if (d.mode) change(function () { st.mode = d.mode; st.at = 0; });
      else if (d.do === 'music') { st.music = !st.music; draw(); }
      else if (d.do === 'smaller') { st.size--; draw(); }
      else if (d.do === 'bigger') { st.size++; draw(); }
      else if (d.do === 'wide') { st.wide = !st.wide; draw(); }
      else if (d.do === 'next') { st.at++; draw(); }
      else if (d.do === 'back') { st.at--; draw(); }
      else if (d.do === 'again') change(function () { st.at = 0; st.reads++; });
      else if (d.un) change(function () { st.tricky = st.tricky.filter(function (w) { return w !== d.un; }); });
      else if (d.do === 'clock') { st.timing = { t0: Date.now(), miss: [] }; timer = setTimeout(function () { stopClock(true); }, 60000); draw(); }
      else if (d.do === 'stop') stopClock(false);
      else if (d.do === 'clock-off') { st.timing = null; draw(); }
      else if (d.w) {
        var T = st.timing;
        if (T && T.end && !T.done) {
          T.last = d.k; T.read = +d.k.split('.')[2] + 1; T.miss = T.miss.filter(function (k) { return +k.split('.')[2] <= +d.k.split('.')[2]; }); T.done = true;
          var right = T.read - T.miss.length, log = A.load('fluency', []);
          T.wcpm = Math.round(right * 60 / T.secs); T.acc = Math.round(100 * right / Math.max(1, T.read));
          log.push({ d: A.today(), id: st.id, title: cur().t.title, read: T.read, miss: T.miss.length, secs: T.secs, wcpm: T.wcpm, acc: T.acc });
          A.save('fluency', log.slice(-60));
          draw();
        }
        else if (T && !T.end) { var i = T.miss.indexOf(d.k); if (i >= 0) T.miss.splice(i, 1); else T.miss.push(d.k); draw(); }
        else change(function () { var i = st.tricky.indexOf(d.w); if (i >= 0) st.tricky.splice(i, 1); else st.tricky.push(d.w); });
      }
      if (!b && u && st.mode !== 'page') {
        var L = lay(cur().t), U = units(L), k = u.getAttribute('data-u'), at = U.indexOf(k);
        if (at < 0 && st.mode === 'phrase') at = U.indexOf(k + '.0');
        if (at >= 0) { st.at = at; draw(); }
      }
    });
    draw();
    return { undo: undo };
  }

  var ICON = '<rect x="6" y="6" width="36" height="36" rx="5" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><rect x="10" y="20" width="28" height="9" rx="3" style="fill:color-mix(in srgb,var(--hi) 45%,var(--card));stroke:var(--hi);stroke-width:2"/><path d="M12 13h22M12 35h18" style="stroke:var(--ink3);stroke-width:2.5;stroke-linecap:round"/><path d="M13 25h10M26 25h8" style="stroke:var(--ink);stroke-width:2.5;stroke-linecap:round"/>';
  A.toolkit.tools.push({ id: 'read', shelf: 'read', name: 'Reading window', icon: ICON, make: readingWindow });
  A.toolkit.phrases = phrases;
})();
