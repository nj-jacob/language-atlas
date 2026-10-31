/* Language Atlas activities with a grown-up, shared by every grade. Needs atlas.js and lesson.js.
   Some expectations cannot be marked by a computer: speaking, listening, reading aloud, drafting, handwriting, presenting.
   Each one is an activity the child does with a grown-up. The child sees a picture and one short line (and a box to write in
   when the activity is writing). In grown-up view the grown-up sees how to run it and a simple four-level rubric, and taps
   the level that fits. That mark counts towards the check-up map of expectations. Nothing here is auto-marked.

   task = { id, title, code: 'B1.3', pic: html (a small picture cue, see words.js), say: 'one short line for the child',
            text: html (optional: a passage or prompt to work from), write: true (a box to write in),
            run: [html, ...] (steps for the grown-up), rubric: [level 1, level 2, level 3, level 4] (what each level looks like),
            coach: html (optional) }
   Routes: #chapter/tasks (the chapter's activities), #chapter/tasks/<id> (one activity).
   Saved (prefix lang-gN:): task:<id> { lv, d }   tw:<id> (what the child wrote)   cov { code: { d, ok, n } } (shared with check-ups) */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$;
  var T = (A.tasks = {});
  var LEVELS = (T.levels = ['Not yet', 'Getting there', 'Yes', 'Strong']);

  T.state = function (t) { return A.load('task:' + t.id, null); };
  /* every activity in the grade, with its chapter */
  A.allTasks = function () {
    var out = [];
    A.built().forEach(function (m) { (A.chapters[m.id].tasks || []).forEach(function (t) { out.push({ ch: m, t: t }); }); });
    return out;
  };
  /* the grown-up's mark: level 3 or 4 counts the expectation as met */
  T.mark = function (t, lv) {
    var d = A.today(), cov = A.load('cov', {}), was = cov[t.code] || {};
    A.save('task:' + t.id, { lv: lv, d: d });
    cov[t.code] = { d: d, ok: lv >= 3 ? 1 : 0, n: (was.n || 0) + 1, task: 1 };
    A.save('cov', cov);
  };
  function result(t) { var s = T.state(t); return s ? LEVELS[s.lv - 1] + ' (' + s.d + ')' : 'Not done yet'; }
  T.result = result;

  /* the chapter's list of activities */
  T.list = function (id) {
    var ts = A.chapters[id].tasks || [];
    return '<ul class="tk-list">' + ts.map(function (t) {
      var s = T.state(t);
      return '<li><a href="#' + id + '/tasks/' + t.id + '"><span class="tk-pic" aria-hidden="true">' + t.pic + '</span><span><b>' + t.title + '</b>' +
        '<span class="t2">' + t.code + ' &middot; ' + (s ? LEVELS[s.lv - 1] : 'Not done yet') + '</span></span></a></li>';
    }).join('') + '</ul>';
  };
  T.page = function (app, id, tid, h) {
    var ts = A.chapters[id].tasks || [], i = -1;
    ts.forEach(function (t, j) { if (t.id === tid) i = j; });
    if (!tid || i < 0) {
      app.innerHTML = h + '<section class="sec"><h2>With a grown-up</h2><p>Do these with a grown-up. Your grown-up marks them.</p>' + T.list(id) + '</section></div>';
      return;
    }
    var t = ts[i], next = ts[i + 1];
    app.innerHTML = h + '<article class="sec ls-card tk"><h2>' + t.title + '</h2><p class="codes">Ontario expectation ' + t.code + '</p>' +
      '<div class="tk-show">' + t.pic + '<p>' + t.say + '</p></div>' + (t.text || '') +
      (t.write ? '<label class="tk-wl" for="tkw">Write here</label><textarea id="tkw" class="tk-w" rows="7" spellcheck="false"></textarea><p class="t2 tk-saved" aria-live="polite"></p>' : '') +
      '<p class="t2 tk-ask">When you are done, show your grown-up.</p>' +
      '<div class="coach adult-only"><b class="t">For grown-ups: how to run it</b><ol>' + t.run.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>' + (t.coach || '') + '</div>' +
      '<div class="tk-mark adult-only"><b class="t">For grown-ups: how did it go?</b><p class="t2">Tap the level that fits best. You can change it later.</p><div class="tk-lv">' +
      t.rubric.map(function (r, j) { return '<button type="button" class="tk-b" data-lv="' + (j + 1) + '" aria-pressed="false"><b>' + LEVELS[j] + '</b><span>' + r + '</span></button>'; }).join('') +
      '</div><p class="tk-now" aria-live="polite"></p></div></article>' +
      '<nav class="ls-nav"><a class="btn alt" href="#' + id + '/tasks">&larr; All activities</a>' + (next ? '<a class="btn ls-next" href="#' + id + '/tasks/' + next.id + '">Next activity &rarr;</a>' : '<span></span>') + '</nav></div>';
    function draw() {
      var s = T.state(t);
      $$('.tk-b', app).forEach(function (b) { var on = !!s && +b.getAttribute('data-lv') === s.lv; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('qk-on', on); });
      $('.tk-now', app).textContent = 'Marked: ' + result(t);
    }
    $$('.tk-b', app).forEach(function (b) { b.addEventListener('click', function () { T.mark(t, +b.getAttribute('data-lv')); draw(); }); });
    draw();
    var w = $('#tkw', app);
    if (w) {
      w.value = A.store('tw:' + t.id) || '';
      var said = $('.tk-saved', app);
      w.addEventListener('input', function () { A.store('tw:' + t.id, w.value); said.textContent = 'Saved on this device.'; });
    }
  };
})();
