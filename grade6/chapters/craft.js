/* Grade 6: text structure and style.
   Ontario 2023 Language, Grade 6, Strand C:
   C1.3 text patterns (such as problem-solution) and text features (such as subheadings and pull-down menus), and how they help readers
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style (voice, word choice, word patterns, sentence structure), and how each fits the form and genre
   C3.1 literary devices, including hyperbole and idioms, and how they help create meaning
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-craft.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* ---------- text patterns and features ---------- */
  var PATTERNS = ['problem and solution', 'cause and effect', 'compare and contrast', 'sequence'];
  var PAT = { 'problem-solution': 'problem and solution', 'cause-effect': 'cause and effect', 'compare-contrast': 'compare and contrast', sequence: 'sequence' };
  /* [signal words, the pattern they point to] */
  var SIGNALS = [['both, however, unlike', 'compare and contrast'], ['because, so, as a result', 'cause and effect'], ['the problem, the solution, fixed', 'problem and solution'], ['first, next, then, finally', 'sequence']];
  /* [what you need, the feature that helps] */
  var NEED = [['find what a hard word means', 'a glossary'], ['find the page where a chapter starts', 'a table of contents'], ['know what a photo shows', 'a caption'],
    ['jump to the part about polar bears', 'subheadings'], ['choose your province on a website', 'a pull-down menu'], ['read more on another web page', 'a link']];
  function reports() { return T.list('pattern').filter(function (t) { return t.kind !== 'story'; }); }

  function patternOf(lv) {
    var t = R.pick(reports()), p = PAT[t.pattern];
    return Q.tiles('Which <b>text pattern</b> does this text use?', p, R.some(PATTERNS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      prompt: 'Look at the subheadings and the signal words.', hint: 'Problem? Causes? Two things side by side? Steps?', explain: 'It is organized as <b>' + p + '</b>.', meta: { k: 'g6-pattern', t: t.title } });
  }
  function signals() {
    var s = R.some(SIGNALS, 3);
    return { q: 'Match the signal words to the pattern.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Which words show a reason, a difference, a fix or an order?', explain: 'Signal words reveal the pattern.', meta: { k: 'g6-signals' } };
  }
  function effect() {
    var c = R.pick(T.ice.cause);
    return Q.one('What is the <b>effect</b>?', c[1], T.ice.cause.filter(function (x) { return x !== c; }).map(function (x) { return x[1]; }).concat(['Skaters stay home.']), {
      fig: T.show(T.ice) + W.sent('Cause: ' + c[0]), hint: 'What happens because of the cause?', explain: c[0] + ' So: <b>' + c[1] + '</b>', meta: { k: 'g6-effect', cause: c[0] } });
  }
  function feature(lv) {
    var n = R.pick(NEED);
    return Q.one('You want to <b>' + n[0] + '</b>. Which feature helps?', n[1], R.some(NEED.filter(function (x) { return x !== n; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think about what each feature is for.', explain: '<b>' + n[1] + '</b> helps you ' + n[0] + '.', meta: { k: 'g6-feature', need: n[0] } });
  }

  /* ---------- visuals: [what to show, the visual that shows it best] ---------- */
  var VIS = [['where polar bears live', 'a map'], ['the parts of a canoe', 'a labelled diagram'], ['how a town' + '’' + 's population changed over 50 years', 'a line graph'],
    ['the order of events over 200 years', 'a timeline'], ['how many students chose each sport', 'a bar graph'], ['what a snowy owl looks like', 'a photo with a caption']];
  /* [design choice, what it does for the reader] */
  var DESIGN = [['a huge, bold title', 'grabs your attention first'], ['lots of white space', 'makes the page calm and easy to read'], ['a red box around a warning', 'signals danger or importance'],
    ['the same colour for every heading', 'shows the parts belong together']];
  function visual(lv) {
    var v = R.pick(VIS);
    return Q.one('Which visual would best show <b>' + v[0] + '</b>?', v[1], R.some(VIS.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Is it about place, parts, change over time, order, amounts, or looks?', hint: 'Maps: places. Graphs: amounts. Timelines: order in time.', explain: '<b>' + v[1] + '</b>', meta: { k: 'g6-visual', what: v[0] } });
  }
  function visualMatch() {
    var v = R.some(VIS, 3);
    return { q: 'Match each visual to what it shows best.', type: 'match', pairs: v.map(function (x) { return [x[1], x[0]]; }), hint: 'What is each visual good at?', explain: 'Each visual has a job.', meta: { k: 'g6-visual-match' } };
  }
  function design(lv) {
    var d = R.pick(DESIGN);
    return Q.one('What does <b>' + d[0] + '</b> do for the reader?', d[1], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Picture a poster with it.', explain: d[1], meta: { k: 'g6-design', d: d[0] } });
  }
  function designTf() {
    var d = R.pick(DESIGN), right = R.int(0, 1) === 1, said = right ? d[1] : R.pick(DESIGN.filter(function (x) { return x !== d; }))[1];
    return { q: 'True or false?', fig: W.sent('On a poster, ' + d[0] + ' ' + said + '.'), type: 'tf', answer: right, hint: 'Why would a designer choose it?', explain: d[0] + ' ' + d[1] + '.', meta: { k: 'g6-design-tf', d: d[0], said: said } };
  }

  /* ---------- style: [an example, what it does] ---------- */
  var STYLE = [['I froze. Silence. Then a crack.', 'builds tension'], ['We waited. We waited. We waited some more.', 'stresses how long it felt'], ['Silver snow slid softly down.', 'makes a pleasing sound pattern'],
    ['The lake glittered like a coin.', 'creates a bright picture'], ['Okay, so here' + '’' + 's the thing about my brother.', 'sounds like a friend talking'], ['Residents are reminded that the arena closes at 9 p.m.', 'sounds official and serious']];
  /* [form, the sentence that fits it, sentences that do not] */
  var FITS = [['a science report', 'Polar bears can smell a seal from about 1 km away.', ['Polar bears are, like, the coolest animals ever!', 'Once upon a time, a bear went for a swim.']],
    ['a friendly text to a cousin', 'Can' + '’' + 't wait to see you Saturday!', ['Please be advised that I will arrive on Saturday.', 'Saturdays have 24 hours.']],
    ['a scary story', 'The door creaked open. Something breathed in the dark.', ['The door was opened at 7:00 p.m.', 'Doors are made of wood or metal.']]];
  function styleDoes(lv) {
    var s = R.pick(STYLE);
    return Q.one('What does this writing <b>do</b>?', s[1], R.some(STYLE.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(s[0]), prompt: 'Look at the sentence length, the repeated words, the sounds, and the voice.', hint: 'Read it aloud. How does it make you feel?', explain: 'It <b>' + s[1] + '</b>.', meta: { k: 'g6-style', s: s[0] } });
  }
  function styleMatch() {
    var s = R.some(STYLE, 3);
    return { q: 'Match each example to what it does.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Read each one aloud.', explain: 'Writers choose style on purpose.', meta: { k: 'g6-style-match' } };
  }
  function styleFits(lv) {
    var f = R.pick(FITS);
    return Q.one('Which sentence fits <b>' + f[0] + '</b>?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { hint: 'Think about the voice that form needs.', explain: f[1], meta: { k: 'g6-style-fits', form: f[0] } });
  }

  function styleTf() {
    var s = R.pick(STYLE), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(STYLE.filter(function (x) { return x !== s; }))[1];
    return { q: 'True or false? This writing ' + said + '.', fig: W.sent(s[0]), type: 'tf', answer: right, hint: 'Read it aloud.', explain: 'It ' + s[1] + '.', meta: { k: 'g6-style-tf', s: s[0], said: said } };
  }

  /* ---------- hyperbole and idioms ---------- */
  var HYPER = ['My backpack weighed a ton.', 'I have told you a million times.', 'Ten minutes feels like a year.', 'I could sleep for a week.', 'This bag weighs more than a moose.'];
  var PLAIN = ['My backpack was heavy.', 'I have told you twice.', 'We waited ten minutes.', 'I was very tired.', 'The bag weighs 5 kg.'];
  var IDIOMS = [['got cold feet', 'got nervous and nearly gave up', 'had chilly toes'], ['over the moon', 'very happy', 'far away in space'], ['a piece of cake', 'very easy', 'a dessert'],
    ['break the ice', 'start a friendly conversation', 'crack a frozen lake'], ['under the weather', 'feeling sick', 'outside in the rain'], ['spill the beans', 'tell a secret', 'drop some food']];
  function pickHyper() {
    return Q.all('Pick every <b>hyperbole</b> (a huge exaggeration).', R.some(HYPER, 2), R.some(PLAIN, 2), { hint: 'Could it really be true?', explain: 'Hyperbole exaggerates to show strong feeling.', meta: { k: 'g6-pick-hyper' } });
  }
  function hyperWhy() {
    return Q.one('In <b>Tryouts</b>, why does the narrator say <b>my backpack weighed a ton</b>?', 'to show how heavy and worried they felt', ['because the backpack weighed 1000 kg', 'to describe the backpack' + '’' + 's colour'], {
      fig: T.show(T.tryouts, 3), hint: 'Did it really weigh a ton?', explain: 'The exaggeration shows feeling, not a fact.', meta: { k: 'g6-hyper-why' } });
  }
  function idiomMean(lv) {
    var i = R.pick(IDIOMS);
    return Q.one('What does <b>' + i[0] + '</b> mean?', i[1], [i[2]].concat(lv > 1 ? [R.pick(IDIOMS.filter(function (x) { return x !== i; }))[1]] : []), {
      prompt: 'An idiom does not mean what the words say.', hint: 'Do not read it word for word.', explain: '<b>' + i[0] + '</b> means ' + i[1] + '.', meta: { k: 'g6-idiom', idiom: i[0] } });
  }
  function idiomMatch() {
    var i = R.some(IDIOMS, 3);
    return { q: 'Match each idiom to its meaning.', type: 'match', pairs: i.map(function (x) { return [x[0], x[1]]; }), hint: 'Think about when people say it.', explain: 'Idioms are sayings with a hidden meaning.', meta: { k: 'g6-idiom-match' } };
  }
  function hyperTf() {
    var h = R.int(0, 1) === 1, s = R.pick(h ? HYPER : PLAIN);
    return { q: 'Is this a hyperbole?', fig: W.sent(s), type: 'tf', answer: h, hint: 'Is it a huge exaggeration?', explain: h ? 'Yes: it could not really be true.' : 'No: it could really be true.', meta: { k: 'g6-hyper-tf', s: s } };
  }

  Atlas.register('craft', {
    lessons: [{
      id: 'structure', title: 'How texts are built', sub: 'Patterns and features help you find your way.',
      concepts: [
        { slug: 'patterns', title: 'Text patterns', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(T.show(T.ramp), 'The problem, the solution, the result: <b>problem and solution</b>.'),
            step(T.show(T.ice), 'This happens, so that happens: <b>cause and effect</b>.'),
            step(T.show(T.bears), 'Both, however: <b>compare and contrast</b>.')
          ],
          guided: [function () { return patternOf(1); }, signals],
          check: [function () { return patternOf(2); }, effect],
          coach: '<p>Before reading a report, scan the subheadings together and guess the pattern.</p>',
          mistake: '<p>Calling every report "sequence". Look for signal words.</p>' },
        { slug: 'features', title: 'Text features help readers', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(W.sent('<b># Polar bears</b>'), 'A subheading: jump straight to that part.'),
            step(W.sent('portage: carrying a canoe over land'), 'A glossary: hard words explained.'),
            step(W.sent('Province: [ Ontario ▾ ]'), 'A pull-down menu: choices, hidden until you need them.')
          ],
          guided: [function () { return feature(1); }, function () { return feature(1); }],
          check: [function () { return feature(2); }, function () { return feature(2); }],
          coach: '<p>On a real website, find a menu, a link and a heading. Talk about how each one helps.</p>',
          mistake: '<p>Skipping captions and headings. They often hold the main idea.</p>' }
      ]
    }, {
      id: 'visuals', title: 'Visuals and design', sub: 'Pictures, graphics and layout carry meaning too.',
      concepts: [
        { slug: 'visuals', title: 'Choose the right visual', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(W.means('screen', 'where polar bears live'), 'A map: places.'),
            step(W.means('screen', 'how many chose each sport'), 'A bar graph: amounts.'),
            step(W.means('screen', 'events over 200 years'), 'A timeline: order in time.')
          ],
          guided: [function () { return visual(1); }, visualMatch],
          check: [function () { return visual(2); }, visualMatch],
          coach: '<p>Flip through an atlas or a science book. For each visual, ask: "What does this show better than words?"</p>',
          mistake: '<p>Skipping visuals as decoration. They often show what words cannot.</p>' },
        { slug: 'design', title: 'Design choices', exp: ['C1.4'], skill: 'visuals',
          model: [
            step(W.means('star', 'a huge, bold title'), 'You see it first.'),
            step(W.means('lock', 'a red box around a warning'), 'Danger. Pay attention.'),
            step(W.means('think', 'lots of white space'), 'Calm and easy to read.')
          ],
          guided: [function () { return design(1); }, designTf],
          check: [function () { return design(2); }, designTf],
          coach: '<p>Compare two posters or cereal boxes. Which one grabs you first, and why?</p>',
          mistake: '<p>Thinking design is only about looking nice. It guides the reader’s eye.</p>' }
      ]
    }, {
      id: 'style', title: 'The writer’s style', sub: 'Voice, word choice, patterns and sentence length.',
      concepts: [
        { slug: 'style', title: 'Style creates meaning', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('I froze. Silence. Then a crack.'), 'Short sentences build tension.'),
            step(W.sent('<b>S</b>ilver <b>s</b>now <b>s</b>lid <b>s</b>oftly down.'), 'A sound pattern.'),
            step(W.sent('Residents are reminded that...'), 'A formal, official voice.')
          ],
          guided: [function () { return styleDoes(1); }, styleMatch],
          check: [function () { return styleDoes(2); }, function () { return styleFits(2); }],
          coach: '<p>Read the same event written two ways (calm and tense). Ask what the writer changed.</p>',
          mistake: '<p>Using one style for everything. A science report and a scary story need different voices.</p>' },
        { slug: 'hyperbole', title: 'Hyperbole: a huge exaggeration', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('My backpack <mark class="hl">weighed a ton</mark>.'), 'Not really.'),
            step(W.means('think', 'nervous, heavy feeling'), 'It shows how the narrator felt.')
          ],
          guided: [pickHyper, hyperWhy],
          check: [pickHyper, hyperTf],
          coach: '<p>Take turns making plain sentences into hyperbole: "I am hungry" becomes "I could eat a moose".</p>',
          mistake: '<p>Reading hyperbole as fact.</p>' },
        { slug: 'idioms', title: 'Idioms', exp: ['C3.1'], skill: 'devices',
          model: [
            step(W.sent('I almost <mark class="hl">got cold feet</mark>.'), 'Not about toes.'),
            step(W.tile('got nervous and nearly gave up'), 'A saying with a hidden meaning.')
          ],
          guided: [function () { return idiomMean(1); }, idiomMatch],
          check: [function () { return idiomMean(2); }, idiomMatch],
          coach: '<p>Idioms are hard for many learners. Keep a list, with a quick sketch of the literal meaning for fun.</p>',
          mistake: '<p>Reading idioms word for word. Ask: "What would a person mean by that?"</p>' }
      ]
    }],
    practice: [
      { id: 'patterns', name: 'Text patterns and features', code: 'C1.3', gen: patternOf },
      { id: 'visuals', name: 'Visuals and design', code: 'C1.4', gen: visual },
      { id: 'style', name: 'Style', code: 'C1.5', gen: styleDoes },
      { id: 'devices', name: 'Hyperbole and idioms', code: 'C3.1', gen: idiomMean }
    ]
  });

  Q.shapes('craft', {
    patterns: [[1, 'signals', signals], [1, 'feature', feature], [2, 'effect', effect]],
    visuals: [[1, 'match', visualMatch], [1, 'design', design], [2, 'true-false', designTf]],
    style: [[1, 'match', styleMatch], [1, 'fits', styleFits], [2, 'true-false', styleTf]],
    devices: [[1, 'pick', pickHyper], [1, 'match', idiomMatch], [1, 'true-false', hyperTf], [2, 'why', hyperWhy]]
  });
})();
