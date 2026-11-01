/* Grade 6: text structure and style. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 6, Strand C:
   C1.3 text patterns (such as problem-solution) and text features (such as subheadings and pull-down menus), and how they help readers
   C1.4 how images, graphics and visual design create and contribute to meaning
   C1.5 elements of style (voice, word choice, word patterns, sentence structure), and how each fits the form and genre
   C3.1 literary devices, including hyperbole and idioms, and how they help create meaning
   Passages are in ../texts.js. Answer checks: tests/verify/grade6-craft.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;
  var AP = '’';

  /* ---------- text patterns ---------- */
  var PATTERNS = ['problem and solution', 'cause and effect', 'compare and contrast', 'sequence'];
  var PAT = { 'problem-solution': 'problem and solution', 'cause-effect': 'cause and effect', 'compare-contrast': 'compare and contrast', sequence: 'sequence' };
  /* signal words for each pattern */
  var SIGNAL = { 'compare and contrast': ['both', 'however', 'unlike', 'similarly'], 'cause and effect': ['because', 'as a result', 'therefore', 'so'],
    'problem and solution': ['the problem', 'the solution', 'to fix this', 'solved'], sequence: ['first', 'next', 'then', 'finally'] };
  function reports() { return T.list('pattern').filter(function (t) { return t.kind !== 'story'; }); }
  function causes() { return T.list('cause').reduce(function (a, t) { return a.concat(t.cause.map(function (c) { return [t, c]; })); }, []); }

  function patternOf(lv) {
    var t = R.pick(reports()), p = PAT[t.pattern];
    return Q.tiles('Which <b>text pattern</b> does this text use?', p, R.some(PATTERNS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2), { fig: T.show(t),
      prompt: 'Look at the subheadings and the signal words.', hint: 'Problem? Causes? Two things side by side? Steps?', explain: 'It is organized as <b>' + p + '</b>.', meta: { k: 'g6-pattern', t: t.title } });
  }
  function signals() {
    var ps = R.some(PATTERNS, 3);
    return { q: 'Match the signal word to the pattern.', type: 'match', pairs: ps.map(function (p) { return [R.pick(SIGNAL[p]), p]; }), hint: 'Which word shows a reason, a difference, a fix or an order?', explain: 'Signal words reveal the pattern.', meta: { k: 'g6-signals' } };
  }
  function whichSignal(lv) {
    var p = R.pick(PATTERNS);
    return Q.tiles('Which signal word points to <b>' + p + '</b>?', R.pick(SIGNAL[p]), R.some(PATTERNS.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return R.pick(SIGNAL[x]); }), {
      hint: 'Two things side by side? A reason? A fix? An order?', explain: SIGNAL[p].join(', ') + ': <b>' + p + '</b>.', meta: { k: 'g6-which-signal', p: p } });
  }
  function effect(lv) {
    var c = R.pick(causes()), others = causes().filter(function (x) { return x[1][0] !== c[1][0]; }).map(function (x) { return x[1][1]; });
    return Q.one('What is the <b>effect</b>?', c[1][1], R.some(others, lv > 1 ? 2 : 1), { fig: W.chain([c[1][0], W.gap()], ['Cause', 'Effect']) + T.show(c[0]),
      hint: 'What happens because of the cause?', explain: W.chain(c[1], ['Cause', 'Effect']), meta: { k: 'g6-effect', cause: c[1][0] } });
  }
  function patternTf(lv) {
    var t = R.pick(reports()), right = R.int(0, 1) === 1, said = right ? PAT[t.pattern] : R.pick(PATTERNS.filter(function (x) { return x !== PAT[t.pattern]; }));
    return { q: Q.name() + ' says this text uses <b>' + said + '</b>.', fig: T.show(t), type: 'tf', answer: right,
      why: { options: ['The headings and signal words fit it.', 'The headings and signal words show another pattern.'], answer: right ? 0 : 1 },
      hint: 'Check the subheadings and signal words.', explain: 'It is <b>' + PAT[t.pattern] + '</b>.', meta: { k: 'g6-pattern-tf', t: t.title, said: said } };
  }

  /* ---------- text features: [what you need, the feature that helps, what it looks like] ---------- */
  var NEED = [['find what a hard word means', 'a glossary', 'portage: carrying a canoe over land'], ['find the page where a chapter starts', 'a table of contents', 'Chapter 3: Bears ........ 24'],
    ['know what a photo shows', 'a caption', 'Photo: A snowy owl hunts at dusk.'], ['jump to the part about polar bears', 'a subheading', '<b>Polar bears</b>'],
    ['choose your province on a website', 'a pull-down menu', 'Province: [ Ontario ▾ ]'], ['read more on another web page', 'a link', '<u>Read more about owls</u>'],
    ['find every page that mentions caribou', 'an index', 'caribou, 12, 31, 45'], ['spot the key words on a page', 'bold words', 'Bears <b>hibernate</b> in winter.'],
    ['know what the colours on a map mean', 'a legend', '■ forest  ■ lake  ■ town']];
  function feature(lv) {
    var n = R.pick(NEED);
    return Q.one('You want to <b>' + n[0] + '</b>. Which feature helps?', n[1], R.some(NEED.filter(function (x) { return x !== n; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think about what each feature is for.', explain: W.means('read', n[2]), meta: { k: 'g6-feature', need: n[0] } });
  }
  function featureName(lv) {
    var n = R.pick(NEED);
    return Q.tiles('What is this text feature called?', n[1], R.some(NEED.filter(function (x) { return x !== n; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(n[2]), hint: 'Where would you see it, and what is it for?', explain: 'It is <b>' + n[1] + '</b>: it helps you ' + n[0] + '.', meta: { k: 'g6-feature-name', need: n[0] } });
  }
  function featureMatch() {
    var ns = R.some(NEED, 3);
    return { q: 'Match each feature to what it helps you do.', type: 'match', pairs: ns.map(function (n) { return [n[1], n[0]]; }), hint: 'What is each feature for?', explain: 'Features help readers find their way.', meta: { k: 'g6-feature-match' } };
  }
  function featureTf() {
    var n = R.pick(NEED), right = R.int(0, 1) === 1, f = right ? n[1] : R.pick(NEED.filter(function (x) { return x !== n; }))[1];
    return { q: 'You want to ' + n[0] + '. ' + Q.name() + ' looks at <b>' + f + '</b>.', type: 'tf', answer: right,
      why: { options: ['That feature is made for this job.', 'Another feature does this job.'], answer: right ? 0 : 1 },
      hint: 'What is that feature for?', explain: W.means('read', n[2]) + ' ' + n[1], meta: { k: 'g6-feature-tf', need: n[0], f: f } };
  }

  /* ---------- visuals: [what to show, the visual that shows it best] ---------- */
  var VIS = [['where polar bears live', 'a map'], ['the parts of a canoe', 'a labelled diagram'], ['how a town' + AP + 's population changed over 50 years', 'a line graph'],
    ['the order of events over 200 years', 'a timeline'], ['how many students chose each sport', 'a bar graph'], ['what a snowy owl looks like', 'a photo with a caption'],
    ['how a caterpillar becomes a butterfly', 'a life-cycle diagram'], ['which part of a class chose each lunch', 'a pie chart']];
  function visual(lv) {
    var v = R.pick(VIS);
    return Q.one('Which visual would best show <b>' + v[0] + '</b>?', v[1], R.some(VIS.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Is it about place, parts, change, order, amounts, a cycle, or looks?', hint: 'Maps: places. Graphs: amounts. Timelines: order in time.', explain: '<b>' + v[1] + '</b>', meta: { k: 'g6-visual', what: v[0] } });
  }
  function visualMatch() {
    var v = R.some(VIS, 3);
    return { q: 'Match each visual to what it shows best.', type: 'match', pairs: v.map(function (x) { return [x[1], x[0]]; }), hint: 'What is each visual good at?', explain: 'Each visual has a job.', meta: { k: 'g6-visual-match' } };
  }
  function visualFor(lv) {
    var v = R.pick(VIS);
    return Q.one('What would <b>' + v[1] + '</b> show best?', v[0], R.some(VIS.filter(function (x) { return x !== v; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      hint: 'What is this visual good at?', explain: v[1] + ': ' + v[0] + '.', meta: { k: 'g6-visual-for', v: v[1] } });
  }
  function visualTf() {
    var v = R.pick(VIS), right = R.int(0, 1) === 1, pick = right ? v[1] : R.pick(VIS.filter(function (x) { return x !== v; }))[1];
    return { q: 'To show ' + v[0] + ', ' + Q.name() + ' chooses <b>' + pick + '</b>.', type: 'tf', answer: right,
      why: { options: ['That visual is made for this.', 'Another visual would show it better.'], answer: right ? 0 : 1 },
      hint: 'What is that visual good at?', explain: 'Best: <b>' + v[1] + '</b>.', meta: { k: 'g6-visual-tf', what: v[0], pick: pick } };
  }

  /* ---------- design: [design choice, what it does for the reader] ---------- */
  var DESIGN = [['a huge, bold title', 'grabs your attention first'], ['lots of white space', 'makes the page calm and easy to read'], ['a red box around a warning', 'signals danger'],
    ['the same colour for every heading', 'shows the parts belong together'], ['an arrow pointing to a button', 'shows where to look next'], ['a large photo across the top', 'sets the mood and the topic'],
    ['a small picture beside each step', 'helps readers follow with fewer words'], ['the price in large print', 'makes the most important number stand out']];
  function design(lv) {
    var d = R.pick(DESIGN);
    return Q.one('What does <b>' + d[0] + '</b> do for the reader?', d[1], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Picture a poster with it.', explain: d[1], meta: { k: 'g6-design', d: d[0] } });
  }
  function designFor(lv) {
    var d = R.pick(DESIGN);
    return Q.one('You want a poster that <b>' + d[1] + '</b>. Which design choice?', d[0], R.some(DESIGN.filter(function (x) { return x !== d; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), {
      hint: 'Which choice does that job?', explain: d[0] + ' ' + d[1] + '.', meta: { k: 'g6-design-for', does: d[1] } });
  }
  function designMatch() {
    var ds = R.some(DESIGN, 3);
    return { q: 'Match each design choice to what it does.', type: 'match', pairs: ds.map(function (d) { return [d[0], d[1]]; }), hint: 'Picture each one on a page.', explain: 'Design guides the reader' + AP + 's eye.', meta: { k: 'g6-design-match' } };
  }
  function designTf() {
    var d = R.pick(DESIGN), right = R.int(0, 1) === 1, said = right ? d[1] : R.pick(DESIGN.filter(function (x) { return x !== d; }))[1];
    return { q: 'On a poster, ' + Q.name() + ' says:', fig: W.sent(d[0] + ' ' + said + '.'), type: 'tf', answer: right,
      why: { options: ['That is the job of this design choice.', 'Another choice does that.'], answer: right ? 0 : 1 },
      hint: 'Why would a designer choose it?', explain: d[0] + ' ' + d[1] + '.', meta: { k: 'g6-design-tf', d: d[0], said: said } };
  }

  /* ---------- style: [an example, what it does, the element of style] ---------- */
  var ELEMENTS = ['voice', 'word choice', 'word pattern', 'sentence structure'];
  var STYLE = [['I froze. Silence. Then a crack.', 'builds tension', 'sentence structure'], ['We waited. We waited. We waited some more.', 'stresses how long it felt', 'word pattern'],
    ['Silver snow slid softly down.', 'makes a pleasing sound pattern', 'word pattern'], ['The lake glittered like a coin.', 'creates a bright picture', 'word choice'],
    ['Okay, so here' + AP + 's the thing about my brother.', 'sounds like a friend talking', 'voice'], ['Residents are reminded that the arena closes at 9 p.m.', 'sounds official and serious', 'voice'],
    ['The soup was scalding, not just hot.', 'gives an exact, strong meaning', 'word choice'], ['Although the trail was long, steep and muddy, she kept going.', 'packs the challenges into one sentence', 'sentence structure']];
  /* [form, the sentence that fits it, sentences that do not] */
  var FITS = [['a science report', 'Polar bears can smell a seal from about 1 km away.', ['Polar bears are, like, the coolest animals ever!', 'Once upon a time, a bear went for a swim.']],
    ['a friendly text to a cousin', 'Can' + AP + 't wait to see you Saturday!', ['Please be advised that I will arrive on Saturday.', 'Saturdays have 24 hours.']],
    ['a scary story', 'The door creaked open. Something breathed in the dark.', ['The door was opened at 7:00 p.m.', 'Doors are made of wood or metal.']],
    ['instructions', 'Stir the paint for one minute.', ['The paint, oh, the glorious paint!', 'Paint was first made long ago.']],
    ['a news report', 'On Tuesday, the town opened a new library.', ['OMG the library is SO cool!!', 'Once there was a lonely library.']],
    ['a poem', 'Rain taps the window, soft as a whisper.', ['Rain is water that falls from clouds.', 'Please close the window when it rains.']]];
  function styleDoes(lv) {
    var s = R.pick(STYLE);
    return Q.one('What does this writing <b>do</b>?', s[1], R.some(STYLE.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(s[0]), prompt: 'Look at the sentence length, the repeated words, the sounds, and the voice.', hint: 'Read it aloud. How does it make you feel?', explain: 'It <b>' + s[1] + '</b>.', meta: { k: 'g6-style', s: s[0] } });
  }
  function element(lv) {
    var s = R.pick(STYLE);
    return Q.tiles('Which element of style stands out here?', s[2], R.some(ELEMENTS.filter(function (x) { return x !== s[2]; }), lv > 1 ? 3 : 2), { fig: W.sent(s[0]),
      hint: 'Voice: who it sounds like. Word choice: one exact word. Word pattern: repeats. Sentence structure: length and shape.', explain: 'It is the <b>' + s[2] + '</b>: it ' + s[1] + '.', meta: { k: 'g6-style-element', s: s[0] } });
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
    return { q: Q.name() + ' says this writing <b>' + said + '</b>.', fig: W.sent(s[0]), type: 'tf', answer: right,
      why: { options: ['That is the effect of its style.', 'Its style does something else.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud.', explain: 'It ' + s[1] + '.', meta: { k: 'g6-style-tf', s: s[0], said: said } };
  }

  /* ---------- hyperbole: [the exaggeration, what it really means] ---------- */
  var HYPER = [['My backpack weighed a ton.', 'My backpack was heavy.'], ['I have told you a million times.', 'I have told you many times.'], ['Ten minutes feels like a year.', 'The wait feels long.'],
    ['I could sleep for a week.', 'I am very tired.'], ['This bag weighs more than a moose.', 'This bag is hard to lift.'], ['The line was a mile long.', 'Many people were waiting.'],
    ['I am so hungry I could eat a horse.', 'I am very hungry.'], ['Her smile lit up the whole city.', 'She looked very happy.']];
  var PLAIN = ['The bag weighs 5 kg.', 'We waited ten minutes.', 'I have told you twice.', 'The line had twelve people.', 'I ate two sandwiches.', 'She smiled at me.'];
  function pickHyper() {
    return Q.all('Pick every <b>hyperbole</b> (a huge exaggeration).', R.some(HYPER, 2).map(function (h) { return h[0]; }), R.some(PLAIN, 2), { hint: 'Could it really be true?', explain: 'Hyperbole exaggerates to show strong feeling.', meta: { k: 'g6-pick-hyper' } });
  }
  function hyperMeans(lv) {
    var h = R.pick(HYPER);
    return Q.one('What does it <b>really</b> mean?', h[1], R.some(HYPER.filter(function (x) { return x !== h; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { fig: W.sent(h[0]),
      hint: 'Shrink the exaggeration down to the truth.', explain: q(h[0]) + ' means ' + q(h[1]), meta: { k: 'g6-hyper-means', s: h[0] } });
  }
  function hyperWhy(lv) {
    var t = R.pick(T.list('hyperbole')), h = R.pick(t.hyperbole);
    return Q.one('Why does the writer say <b>' + h + '</b>?', 'to show a strong feeling', ['to give an exact measurement', 'to describe a colour'].slice(0, lv > 1 ? 2 : 1), {
      fig: T.show(t), hint: 'Is it really true?', explain: 'The exaggeration shows feeling, not a fact.', meta: { k: 'g6-hyper-why', t: t.title } });
  }
  function hyperTf() {
    var h = R.int(0, 1) === 1, s = h ? R.pick(HYPER)[0] : R.pick(PLAIN);
    return { q: 'Is this a hyperbole?', fig: W.sent(s), type: 'tf', answer: h, why: { options: ['It could not really be true.', 'It could really be true.'], answer: h ? 0 : 1 },
      hint: 'Is it a huge exaggeration?', explain: h ? 'Yes: it could not really be true.' : 'No: it could really be true.', meta: { k: 'g6-hyper-tf', s: s } };
  }
  function q(s) { return '“' + s + '”'; }

  /* ---------- idioms: [idiom, meaning, the literal reading, a sentence that uses it] ---------- */
  var IDIOMS = [['got cold feet', 'got nervous and nearly gave up', 'had chilly toes', 'At the gym door, Owen got cold feet.'], ['over the moon', 'very happy', 'far away in space', 'Priya was over the moon about her new puppy.'],
    ['a piece of cake', 'very easy', 'a dessert', 'The spelling test was a piece of cake.'], ['break the ice', 'start a friendly conversation', 'crack a frozen lake', 'Mateo told a joke to break the ice.'],
    ['under the weather', 'feeling sick', 'outside in the rain', 'Grandpa stayed home because he was under the weather.'], ['spill the beans', 'tell a secret', 'drop some food', 'Do not spill the beans about the party!'],
    ['hit the books', 'study hard', 'punch some books', 'Before the test, Zara had to hit the books.'], ['in hot water', 'in trouble', 'in a bath', 'Kai was in hot water for coming home late.'],
    ['on cloud nine', 'extremely happy', 'flying in a plane', 'After the concert, Mei was on cloud nine.'], ['cost an arm and a leg', 'cost a lot of money', 'hurt your body', 'Those skates cost an arm and a leg.']];
  function idiomMean(lv) {
    var i = R.pick(IDIOMS);
    return Q.one('What does <b>' + i[0] + '</b> mean?', i[1], [i[2]].concat(lv > 1 ? [R.pick(IDIOMS.filter(function (x) { return x !== i; }))[1]] : []), { fig: W.sent(i[3]),
      prompt: 'An idiom does not mean what the words say.', hint: 'Do not read it word for word.', explain: '<b>' + i[0] + '</b> means ' + i[1] + '.', meta: { k: 'g6-idiom', idiom: i[0] } });
  }
  function idiomMatch() {
    var i = R.some(IDIOMS, 3);
    return { q: 'Match each idiom to its meaning.', type: 'match', pairs: i.map(function (x) { return [x[0], x[1]]; }), hint: 'Think about when people say it.', explain: 'Idioms are sayings with a hidden meaning.', meta: { k: 'g6-idiom-match' } };
  }
  function idiomFind(lv) {
    var i = R.pick(IDIOMS), rest = i[3].replace(i[0], '|').replace(/[.!]$/, '').split('|').map(function (s) { return s.trim(); }).filter(function (s) { return s.split(' ').length >= 2; });
    return Q.one('Which words are the <b>idiom</b>?', i[0], rest.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(i[3]), hint: 'Which words do not mean what they say?', explain: '<b>' + i[0] + '</b> means ' + i[1] + '.', meta: { k: 'g6-idiom-find', idiom: i[0] } });
  }
  function idiomTf() {
    var i = R.pick(IDIOMS), right = R.int(0, 1) === 1, said = right ? i[1] : i[2];
    return { q: Q.name() + ' says <b>' + i[0] + '</b> means <b>' + said + '</b>.', fig: W.sent(i[3]), type: 'tf', answer: right,
      why: { options: ['That is the hidden meaning.', 'That is reading it word for word.'], answer: right ? 0 : 1 },
      hint: 'Is that what a person would mean?', explain: '<b>' + i[0] + '</b> means ' + i[1] + '.', meta: { k: 'g6-idiom-tf', idiom: i[0], said: said } };
  }

  Atlas.register('craft', {
    full: true,
    lessons: [{
      id: 'structure', title: 'How texts are built', sub: 'Patterns and features help you find your way.',
      concepts: [
        { slug: 'patterns', title: 'Text patterns', exp: ['C1.3'], skill: 'patterns',
          model: [
            step(T.show(T.swifts), 'The problem, the solution, the result.'),
            step(W.chain(['Swifts lose chimneys.', 'A class asks for a tower.', '200 swifts roost.'], ['Problem', 'Solution', 'Result']), '<b>Problem and solution</b>.'),
            step(T.show(T.milkweed), 'Now another report.'),
            step(W.chain(T.milkweed.cause[0], ['Cause', 'Effect']), 'Because... so...: <b>cause and effect</b>.'),
            step(W.sent('<b>Both</b> were first made by Indigenous peoples. <b>However</b>, you paddle them differently.'), 'Both, however: <b>compare and contrast</b>.')
          ],
          guided: [function () { return patternOf(1); }, signals, function () { return whichSignal(1); }],
          check: [function () { return patternOf(2); }, function () { return effect(2); }, function () { return whichSignal(2); }, patternTf, function () { return patternOf(3); }],
          coach: '<p>Before reading a report, scan the subheadings together and guess the pattern.</p>',
          mistake: '<p>Calling every report "sequence". Look for signal words.</p>' },
        { slug: 'features', title: 'Text features help readers', exp: ['C1.3'], skill: 'features',
          model: [
            step(W.sent('<b>Polar bears</b>'), 'A subheading: jump straight to that part.'),
            step(W.sent('portage: carrying a canoe over land'), 'A glossary: hard words explained.'),
            step(W.sent('Province: [ Ontario ▾ ]'), 'A pull-down menu: choices, hidden until you need them.'),
            step(W.sent('Photo: A snowy owl hunts at dusk.'), 'A caption: what a picture shows.'),
            step(W.sent('caribou, 12, 31, 45'), 'An index: every page with that word.')
          ],
          guided: [function () { return feature(1); }, function () { return featureName(1); }, featureMatch],
          check: [function () { return feature(2); }, function () { return featureName(2); }, featureTf, featureMatch, function () { return feature(3); }],
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
            step(W.means('screen', 'events over 200 years'), 'A timeline: order in time.'),
            step(W.means('screen', 'how a caterpillar becomes a butterfly'), 'A life-cycle diagram: a circle of stages.'),
            step(W.means('screen', 'the parts of a canoe'), 'A labelled diagram: parts and their names.')
          ],
          guided: [function () { return visual(1); }, visualMatch, function () { return visualFor(1); }],
          check: [function () { return visual(2); }, function () { return visualFor(2); }, visualTf, visualMatch, function () { return visual(3); }],
          coach: '<p>Flip through an atlas or a science book. For each visual, ask: "What does this show better than words?"</p>',
          mistake: '<p>Skipping visuals as decoration. They often show what words cannot.</p>' },
        { slug: 'design', title: 'Design choices', exp: ['C1.4'], skill: 'design',
          model: [
            step(W.means('star', 'a huge, bold title'), 'You see it first.'),
            step(W.means('lock', 'a red box around a warning'), 'Danger. Pay attention.'),
            step(W.means('think', 'lots of white space'), 'Calm and easy to read.'),
            step(W.means('screen', 'an arrow pointing to a button'), 'Where to look next.'),
            step(W.means('write', 'a small picture beside each step'), 'Follow along with fewer words.')
          ],
          guided: [function () { return design(1); }, function () { return designFor(1); }, designMatch],
          check: [function () { return design(2); }, designTf, function () { return designFor(2); }, designMatch, function () { return design(3); }],
          coach: '<p>Compare two posters or cereal boxes. Which one grabs you first, and why?</p>',
          mistake: '<p>Thinking design is only about looking nice. It guides the reader' + AP + 's eye.</p>' }
      ]
    }, {
      id: 'style', title: 'The writer' + AP + 's style', sub: 'Voice, word choice, patterns and sentence length.',
      concepts: [
        { slug: 'style', title: 'Style creates meaning', exp: ['C1.5'], skill: 'style',
          model: [
            step(W.sent('I froze. Silence. Then a crack.'), 'Short sentences build tension.'),
            step(W.sent('<b>S</b>ilver <b>s</b>now <b>s</b>lid <b>s</b>oftly down.'), 'A sound pattern.'),
            step(W.sent('The soup was <mark class="hl">scalding</mark>, not just hot.'), 'One exact word.'),
            step(W.sent('Residents are reminded that...'), 'A formal, official voice.'),
            step(W.sent('Okay, so here' + AP + 's the thing...'), 'A chatty voice: for a friend, not a report.')
          ],
          guided: [function () { return styleDoes(1); }, function () { return element(1); }, styleMatch],
          check: [function () { return styleDoes(2); }, function () { return styleFits(2); }, function () { return element(2); }, styleTf, function () { return styleFits(3); }],
          coach: '<p>Read the same event written two ways (calm and tense). Ask what the writer changed.</p>',
          mistake: '<p>Using one style for everything. A science report and a scary story need different voices.</p>' },
        { slug: 'hyperbole', title: 'Hyperbole: a huge exaggeration', exp: ['C3.1'], skill: 'hyperbole',
          model: [
            step(W.sent('My backpack <mark class="hl">weighed a ton</mark>.'), 'Not really.'),
            step(W.means('think', 'My backpack was heavy.'), 'What it really means.'),
            step(W.means('star', 'nervous, heavy feeling'), 'Why say it? To show a feeling.'),
            step(W.sent('Ten minutes <mark class="hl">feels like a year</mark>.'), 'Again.'),
            step(W.means('think', 'The wait feels long.'), 'Shrink it to the truth.')
          ],
          guided: [pickHyper, function () { return hyperMeans(1); }, function () { return hyperWhy(1); }],
          check: [pickHyper, hyperTf, function () { return hyperMeans(2); }, function () { return hyperWhy(2); }, hyperTf],
          coach: '<p>Take turns making plain sentences into hyperbole: "I am hungry" becomes "I could eat a moose".</p>',
          mistake: '<p>Reading hyperbole as fact.</p>' },
        { slug: 'idioms', title: 'Idioms', exp: ['C3.1'], skill: 'idioms',
          model: [
            step(W.sent('I almost <mark class="hl">got cold feet</mark>.'), 'Not about toes.'),
            step(W.tile('got nervous and nearly gave up'), 'A saying with a hidden meaning.'),
            step(W.sent('Mateo told a joke to <mark class="hl">break the ice</mark>.'), 'No ice here.'),
            step(W.tile('start a friendly conversation'), 'Ask: what would a person mean?')
          ],
          guided: [function () { return idiomMean(1); }, function () { return idiomFind(1); }, idiomMatch],
          check: [function () { return idiomMean(2); }, idiomTf, function () { return idiomFind(2); }, idiomMatch, function () { return idiomMean(3); }],
          coach: '<p>Idioms are hard for many learners. Keep a list, with a quick sketch of the literal meaning for fun.</p>',
          mistake: '<p>Reading idioms word for word. Ask: "What would a person mean by that?"</p>' }
      ]
    }],
    practice: [
      { id: 'patterns', name: 'Text patterns', code: 'C1.3', gen: patternOf },
      { id: 'features', name: 'Text features', code: 'C1.3', gen: feature },
      { id: 'visuals', name: 'Choose the right visual', code: 'C1.4', gen: visual },
      { id: 'design', name: 'Design choices', code: 'C1.4', gen: design },
      { id: 'style', name: 'Style', code: 'C1.5', gen: styleDoes },
      { id: 'hyperbole', name: 'Hyperbole', code: 'C3.1', gen: hyperMeans },
      { id: 'idioms', name: 'Idioms', code: 'C3.1', gen: idiomMean }
    ]
  });

  Q.shapes('craft', {
    patterns: [[1, 'signals', signals], [1, 'which-signal', whichSignal], [1, 'effect', effect], [2, 'tf', patternTf]],
    features: [[1, 'name', featureName], [1, 'match', featureMatch], [2, 'tf', featureTf]],
    visuals: [[1, 'match', visualMatch], [1, 'what-for', visualFor], [2, 'tf', visualTf]],
    design: [[1, 'which-choice', designFor], [1, 'match', designMatch], [2, 'tf', designTf]],
    style: [[1, 'element', element], [1, 'match', styleMatch], [1, 'fits', styleFits], [2, 'tf', styleTf]],
    hyperbole: [[1, 'pick', pickHyper], [1, 'why', hyperWhy], [2, 'tf', hyperTf]],
    idioms: [[1, 'find', idiomFind], [1, 'match', idiomMatch], [2, 'tf', idiomTf]]
  });
})();
