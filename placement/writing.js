/* Writing sample: the part of the placement check that is never marked by a computer. Needs placement.js (adds the #writing page).
   The child writes on their own for about 10 to 15 minutes to a prompt for their school grade. The grown-up reads it and taps
   the level that fits on a four-level rubric (the same four levels as the grades' activities: Not yet, Getting there, Yes,
   Strong), judged against what is expected at that grade. Levels 1 and 2 point to the grade's writing lessons.
   Saved in the placement state as writing { d, g, text, lv }. */
(function () {
  'use strict';
  var A = window.Atlas, $ = A.$, $$ = A.$$, P = A.placement;
  var LEVELS = ['Not yet', 'Getting there', 'Yes', 'Strong'];
  var PROMPTS = {
    1: 'Write about a place you like to go. What do you do there?',
    2: 'Write about a time you helped someone. What happened?',
    3: 'Tell how to make or do something you know well. Write it in steps.',
    4: 'Which season is the best where you live? Give your reasons.',
    5: 'Write a short story that begins: The canoe drifted away from the dock.',
    6: 'Should every school have a garden? Give your opinion, with reasons and examples.',
    7: 'Describe a person who taught you something important. Explain what you learned.',
    8: 'Should students choose their own homework? State your position and support it with reasons.'
  };
  /* what each level looks like, for Grades 1 and 2, 3 to 5, and 6 to 8 */
  var RUBRIC = {
    early: ['A few words or one idea. Hard to read without help.',
      'Some ideas on the topic. Some sentences start with a capital and end with a period.',
      'Two or three clear sentences on the topic. Most capitals, periods and common words are right.',
      'Several connected sentences with detail. Capitals, periods and common words are almost always right.'],
    middle: ['Few ideas, or off the topic. Hard to follow, and errors get in the way.',
      'On the topic, but ideas are listed, not linked. Some run-on sentences. Errors sometimes get in the way.',
      'A clear main idea with details in a sensible order. Complete sentences and few errors.',
      'A clear main idea, well-chosen details and linking words. Varied sentences and almost no errors.'],
    late: ['No clear position or main idea, and little support. Errors make it hard to read.',
      'A position or main idea, but the support is thin or repeated. Some sentence and punctuation errors.',
      'A clear position or main idea, supported with relevant reasons and examples. Organized, with few errors.',
      'A clear, well-supported position. Precise words, varied sentences, smooth transitions and almost no errors.']
  };
  function band(g) { return g <= 2 ? 'early' : g <= 5 ? 'middle' : 'late'; }
  A.writingRubric = function (g) { return RUBRIC[band(g)]; }; /* for the automatic checks */
  A.writingPrompts = PROMPTS;

  A.writingSummary = function (w) {
    return w.lv
      ? '<p>Marked <b>' + LEVELS[w.lv - 1] + '</b> for Grade ' + w.g + ' writing (' + w.d + ').</p>' +
        (w.lv <= 2 ? '<p class="adult-only"><a href="../grade' + w.g + '/#writing">Grade ' + w.g + ' writing lessons</a> are a good place to start.</p>' : '')
      : '<p>Written, and waiting for a grown-up to mark it.</p>';
  };

  A.page('writing', function (app) {
    var st = P.load();
    if (!st) { location.replace('#home'); return; }
    var g = st.grade, w = st.writing && st.writing.g === g ? st.writing : { d: A.today(), g: g, text: '', lv: 0 };
    function keep() { var s = P.load(); s.writing = w; P.save(s); }
    app.innerHTML = '<div class="wrap pl"><header class="chead"><span class="num">Writing sample</span><h1>Write on your own</h1>' +
      '<p class="lede">About 10 to 15 minutes. Do your best spelling. Nobody helps this time.</p></header>' +
      '<article class="sec ls-card tk"><div class="tk-show"><p>' + PROMPTS[g] + '</p></div>' +
      '<label class="tk-wl" for="plw">Write here</label><textarea id="plw" class="tk-w" rows="9" spellcheck="false"></textarea><p class="t2 tk-saved" aria-live="polite"></p>' +
      '<p class="t2 tk-ask">When you are done, show your grown-up.</p>' +
      '<div class="tk-mark adult-only"><b class="t">For grown-ups: how does it compare with Grade ' + g + ' writing?</b>' +
      '<p class="t2">Read it once for ideas, then once for sentences and spelling. Tap the level that fits best.</p><div class="tk-lv">' +
      A.writingRubric(g).map(function (r, j) { return '<button type="button" class="tk-b" data-lv="' + (j + 1) + '" aria-pressed="false"><b>' + LEVELS[j] + '</b><span>' + r + '</span></button>'; }).join('') +
      '</div><p class="tk-now" aria-live="polite"></p></div></article>' +
      '<p class="pl-acts"><a class="btn" href="#results">Back to starting points</a></p></div>';
    function draw() {
      $$('.tk-b', app).forEach(function (b) { var on = +b.getAttribute('data-lv') === w.lv; b.setAttribute('aria-pressed', String(on)); b.classList.toggle('qk-on', on); });
      $('.tk-now', app).textContent = w.lv ? 'Marked: ' + LEVELS[w.lv - 1] : 'Not marked yet';
    }
    var box = $('#plw', app), said = $('.tk-saved', app);
    box.value = w.text;
    box.addEventListener('input', function () { w.text = box.value; w.d = A.today(); keep(); said.textContent = 'Saved on this device.'; });
    $$('.tk-b', app).forEach(function (b) { b.addEventListener('click', function () { w.lv = +b.getAttribute('data-lv'); w.d = A.today(); keep(); draw(); }); });
    draw();
  });
})();
