/* Reading aloud: a one-minute oral reading fluency check, done with a grown-up. Needs placement.js (it adds the #aloud page).
   The standard method (Hasbrouck and Tindal): the child reads an unpractised passage at their school grade aloud for one
   minute, twice; the grown-up marks words read wrong or skipped and the last word read. Words correct per minute (WCPM) is
   the average of the two. Compare it with the 50th percentile for the grade and season: 10 or more words below it means
   fluency practice will help. The computer only counts and times; the grown-up does the marking.
   Norms (WCPM, 50th percentile): Grades 1 to 6 from Hasbrouck and Tindal (2017); Grades 7 and 8 from their 2006 table, the
   latest published for those grades. Grade 1 has no fall norm.
   Saved in the placement state as aloud { d, g, season, reads: [{ p, words, errors, secs, wcpm }], wcpm, acc, norm }. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$, PASS = window.ALOUD_PASSAGES, P = A.placement;
  var NORMS = { 1: [null, 29, 60], 2: [50, 84, 100], 3: [83, 97, 112], 4: [94, 120, 133], 5: [121, 133, 146], 6: [132, 145, 146], 7: [128, 136, 150], 8: [133, 146, 151] };
  var SEASONS = ['fall', 'winter', 'spring'], SECS = 60;
  /* school terms: fall is August to November, winter December to March, spring April to July */
  function season(d) { var m = (d || new Date()).getMonth() + 1; return m >= 8 && m <= 11 ? 0 : m === 12 || m <= 3 ? 1 : 2; }
  function words(text) { return text.split(/\s+/).filter(Boolean); }
  /* words correct per minute for one reading: words up to the last one read, less the ones marked */
  function score(r) { var correct = r.last + 1 - r.errors.filter(function (i) { return i <= r.last; }).length; return { words: r.last + 1, correct: correct, wcpm: Math.round(correct * 60 / Math.max(1, r.secs)) }; }
  A.aloudScore = score; A.aloudNorms = NORMS; /* for the automatic checks */

  function verdict(a) {
    if (a.norm == null) return 'There is no Grade 1 benchmark in the fall. Check again in January and compare then.';
    var d = a.wcpm - a.norm, typ = 'The typical rate (50th percentile) for Grade ' + a.g + ' in the ' + SEASONS[a.season] + ' is ' + a.norm + '. ';
    if (d <= -10) return typ + 'This is ' + -d + ' below it, so regular fluency practice will help: short passages read aloud several times.';
    if (d >= 10) return typ + 'This is ' + d + ' above it.';
    return typ + 'This is close to it.';
  }
  A.aloudSummary = function (a) {
    return '<p><b>' + a.wcpm + ' words correct per minute</b>, ' + a.acc + '% of words read correctly.</p>' +
      '<p class="adult-only">' + verdict(a) + (a.acc < 95 ? ' Under 95% correct usually means decoding (sounding out) needs work before speed.' : '') + '</p>';
  };

  A.page('aloud', function (app) {
    var st = P.load();
    if (!st) { location.replace('#home'); return; }
    var g = st.grade, list = PASS[g], reads = [], k = 0;
    function page(h) { app.innerHTML = '<div class="wrap pl">' + h + '</div>'; window.scrollTo(0, 0); }
    function intro() {
      page('<header class="chead"><span class="num">Reading aloud</span><h1>Read aloud for one minute</h1>' +
        '<p class="lede">Two short readings with a grown-up. Read at your own pace, the way you would talk.</p></header>' +
        '<div class="note"><p><b>For the grown-up.</b> Press Start, and the child reads from the first word. Tap any word read wrong or skipped (a word self-corrected within a few seconds counts as right). ' +
        'When the minute is up, tap the last word read. Grade ' + g + ' passages; use passages the child has not practised.</p></div>' +
        '<p class="pl-acts"><button type="button" class="btn" id="algo">Start reading 1 of 2</button> <a class="btn alt" href="#results">Not now</a></p>');
      $('#algo', app).addEventListener('click', read);
    }
    function read() {
      var p = list[k], w = words(p.text), r = { p: k, errors: [], last: -1, secs: SECS }, t0 = Date.now(), phase = 'reading', tick;
      page('<div class="sec cu al"><div class="cuprog"><span>Reading ' + (k + 1) + ' of 2</span><span class="al-left" aria-live="off">1:00</span></div>' +
        '<div class="bar-h"><i class="al-time" style="width:0%"></i></div>' +
        '<p class="al-say" aria-live="polite">Tap a word read wrong or skipped.</p>' +
        '<div class="psg al-text" data-strand="C"><b class="pt">' + p.title + '</b><p>' + w.map(function (x, i) { return '<button type="button" class="al-w" data-i="' + i + '">' + x + '</button>'; }).join(' ') + '</p></div>' +
        '<p class="pl-acts"><button type="button" class="btn alt" id="alstop">Finished early</button></p></div>');
      var say = $('.al-say', app);
      function draw() {
        $$('.al-w', app).forEach(function (b, i) {
          b.classList.toggle('err', r.errors.indexOf(i) >= 0);
          b.classList.toggle('after', r.last >= 0 && i > r.last);
          b.classList.toggle('last', i === r.last);
          b.setAttribute('aria-pressed', String(r.errors.indexOf(i) >= 0));
        });
        if (phase === 'done') { var s = score(r); say.innerHTML = '<b>' + s.correct + ' words correct</b> out of ' + s.words + ' read. Tap a word to change a mark.'; }
      }
      function stop() {
        clearInterval(tick);
        r.secs = Math.min(SECS, Math.max(1, Math.round((Date.now() - t0) / 1000)));
        phase = 'last';
        $('.al-time', app).style.width = '100%';
        say.innerHTML = '<b>Stop.</b> Now tap the last word read.';
        var b = $('#alstop', app); b.remove();
      }
      tick = setInterval(function () {
        var s = (Date.now() - t0) / 1000;
        if (!$('.al-time', app)) { clearInterval(tick); return; }
        $('.al-time', app).style.width = Math.min(100, s / SECS * 100) + '%';
        var left = Math.max(0, Math.ceil(SECS - s));
        $('.al-left', app).textContent = '0:' + ('0' + left).slice(-2);
        if (s >= SECS) stop();
      }, 250);
      $('#alstop', app).addEventListener('click', stop);
      $$('.al-w', app).forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i');
          if (phase === 'last') {
            r.last = i; phase = 'done';
            $('.pl-acts', app).innerHTML = '<button type="button" class="btn" id="alnext">' + (k === 0 ? 'Next reading' : 'See the result') + '</button>';
            $('#alnext', app).addEventListener('click', function () { reads.push(r); k++; if (k < 2) readyNext(); else finish(); });
          } else {
            var at = r.errors.indexOf(i);
            if (at >= 0) r.errors.splice(at, 1); else r.errors.push(i);
          }
          draw();
        });
      });
    }
    function readyNext() {
      page('<header class="chead"><span class="num">Reading aloud</span><h1>One more reading</h1><p class="lede">A new passage. Start from the first word again.</p></header>' +
        '<p class="pl-acts"><button type="button" class="btn" id="algo">Start reading 2 of 2</button></p>');
      $('#algo', app).addEventListener('click', read);
    }
    function finish() {
      var s = reads.map(score), wc = Math.round((s[0].wcpm + s[1].wcpm) / 2), read = s[0].words + s[1].words, ok = s[0].correct + s[1].correct, sea = season();
      st = P.load();
      st.aloud = { d: A.today(), g: g, season: sea, norm: NORMS[g][sea], wcpm: wc, acc: Math.round(100 * ok / Math.max(1, read)),
        reads: reads.map(function (r, i) { return { p: r.p, words: s[i].words, errors: r.errors.filter(function (x) { return x <= r.last; }).length, secs: r.secs, wcpm: s[i].wcpm }; }) };
      P.save(st);
      page('<header class="chead"><span class="num">Reading aloud &middot; ' + st.aloud.d + '</span><h1>Thank you</h1></header>' +
        '<div class="sec cu">' + A.aloudSummary(st.aloud) + '</div>' +
        '<p class="pl-acts"><a class="btn" href="#results">Back to starting points</a></p>');
    }
    intro();
  });
})();
