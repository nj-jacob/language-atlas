/* Grade 2: word parts. Number prefixes uni- (one), bi- (two) and tri- (three); the prefixes mis- (wrongly) and pre- (before);
   the suffixes -er and -or (a person who), -ness (being) and -y (with lots of).
   Ontario 2023 Language, Grade 2:
   B2.3 "use developing knowledge of the meanings of words and common morphemes (i.e., bases, prefixes, and suffixes) to read and spell words"
   B2.4 "... use their developing morphological knowledge to analyze and understand new words in context"
   The prefixes and suffixes come from the Grade 2 column of the Language Foundations Continuum.
   All word lists are written for this site. Answer checks: tests/verify/grade2-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- number prefixes ---------- */
  var NUM = { uni: 'one', bi: 'two', tri: 'three' };
  /* [prefix, base, one thing, many things] */
  var NUMWORDS = [['uni', 'cycle', 'wheel', 'wheels'], ['uni', 'corn', 'horn', 'horns'], ['bi', 'cycle', 'wheel', 'wheels'], ['bi', 'lingual', 'language', 'languages'],
    ['tri', 'cycle', 'wheel', 'wheels'], ['tri', 'angle', 'corner', 'corners'], ['tri', 'pod', 'leg', 'legs']];
  function has(w, p) { return NUM[p] + ' ' + (p === 'uni' ? w[2] : w[3]); }
  function nw(w) { return w[0] + w[1]; }
  /* dots to count: a picture of the number */
  function dots(n) {
    var one = '<svg class="wicon" viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="9" fill="currentColor"/></svg>', out = '';
    for (var i = 0; i < n; i++) out += one;
    return '<span class="wmeans">' + out + '</span>';
  }
  function numCard(p) { return '<span class="wmeans">' + W.tile(p, 'prefix') + '<span>' + NUM[p] + '</span></span>' + dots({ uni: 1, bi: 2, tri: 3 }[p]); }

  /* What does tricycle mean? */
  function numMeaning(lv) {
    var w = R.pick(NUMWORDS), others = Object.keys(NUM).filter(function (p) { return p !== w[0]; });
    return Q.one('What does <b>' + nw(w) + '</b> have?', has(w, w[0]), others.slice(0, lv > 1 ? 2 : 1).map(function (p) { return has(w, p); }), {
      fig: lv > 1 ? W.tile(nw(w)) : W.sum([[w[0], 'prefix'], [w[1], 'base']]), prompt: 'Look at the start. Which number does it mean?', hint: 'uni- is one, bi- is two, tri- is three.',
      explain: numCard(w[0]), meta: { k: 'g2-num-meaning', word: nw(w) } });
  }
  /* Which word means two wheels? */
  function numWhich() {
    var p = R.pick(Object.keys(NUM)), right = p + 'cycle';
    return Q.tiles('Which one has <b>' + NUM[p] + (p === 'uni' ? ' wheel' : ' wheels') + '</b>?', right, ['unicycle', 'bicycle', 'tricycle'].filter(function (x) { return x !== right; }),
      { fig: dots({ uni: 1, bi: 2, tri: 3 }[p]), hint: 'Which prefix means ' + NUM[p] + '?', explain: numCard(p), meta: { k: 'g2-num-which', n: NUM[p] } });
  }
  /* How many legs does a tripod have? */
  function numCount() {
    var w = R.pick(NUMWORDS), n = { uni: '1', bi: '2', tri: '3' }[w[0]];
    return Q.tiles('How many <b>' + w[3] + '</b>?', n, ['1', '2', '3'].filter(function (x) { return x !== n; }), { fig: W.tile(nw(w)), prompt: 'Find the prefix at the start.',
      hint: 'uni- is one, bi- is two, tri- is three.', explain: W.sum([[w[0], 'prefix'], [w[1], 'base']]), meta: { k: 'g2-num-count', word: nw(w) } });
  }
  function numMatch() {
    var list = ['uni', 'bi', 'tri'].map(function (p) { return R.pick(NUMWORDS.filter(function (w) { return w[0] === p; })); });
    return { q: 'Match each word to what it has.', type: 'match', pairs: list.map(function (w) { return [nw(w), has(w, w[0])]; }), hint: 'uni- is one, bi- is two, tri- is three.',
      explain: 'The prefix tells the number.', meta: { k: 'g2-num-match' } };
  }
  /* Build the word for a bike with three wheels */
  function numBuild(lv) {
    var p = R.pick(Object.keys(NUM)), wrong = Object.keys(NUM).filter(function (x) { return x !== p; });
    var list = [W.tile(p, 'prefix'), W.tile(wrong[0], 'prefix'), W.tile('cycle', 'base')].concat(lv > 1 ? [W.tile(wrong[1], 'prefix')] : []);
    return { q: 'Build the word for a bike with <b>' + NUM[p] + (p === 'uni' ? ' wheel' : ' wheels') + '</b>.', fig: dots({ uni: 1, bi: 2, tri: 3 }[p]), type: 'build', parts: list, answer: [0, 2],
      hint: 'Number prefix first, then cycle.', explain: W.sum([[p, 'prefix'], ['cycle', 'base']]), meta: { k: 'g2-num-build', n: NUM[p] } };
  }

  /* ---------- mis- and pre- ---------- */
  var P = {
    mis: { mean: 'wrongly', bases: ['spell', 'read', 'count', 'place', 'use', 'match'], say: function (b) { return b + ' wrongly'; } },
    pre: { mean: 'before', bases: ['heat', 'view', 'pay', 'wash', 'cook', 'test'], say: function (b) { return b + ' before'; } }
  };
  var OTHER = { mis: 'pre', pre: 'mis' };
  var LOOK = { mis: ['mist', 'mister'], pre: ['press', 'pretty'] };
  function pre(p) { return p || R.pick(['mis', 'pre']); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  function card(p) { return '<span class="wmeans">' + W.tile(p, 'prefix') + '<span>' + P[p].mean + '</span></span>'; }

  function preMeaning(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), wrong = [P[OTHER[p]].say(b), b + ' again'];
    return Q.one('What does <b>' + p + b + '</b> mean?', P[p].say(b), wrong.slice(0, lv > 1 ? 2 : 1), { fig: lv > 1 ? W.tile(p + b) : W.sum(parts(p, b)),
      prompt: 'Cover <b>' + p + '</b>. What word is left?', hint: 'mis- means wrongly. pre- means before.', explain: card(p),
      steps: ['Cover <b>' + p + '</b>. The base word is <b>' + b + '</b>.', '<b>' + p + '-</b> means <b>' + P[p].mean + '</b>.', 'So <b>' + p + b + '</b> means <b>' + P[p].say(b) + '</b>.'],
      meta: { k: 'g2-pre-meaning', word: p + b } });
  }
  function preWhich(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases);
    var wrong = [OTHER[p] + R.pick(P[OTHER[p]].bases), b];
    return Q.tiles('Which word means <b>' + P[p].say(b) + '</b>?', p + b, wrong, { fig: lv > 1 ? '' : card(p), hint: 'Which prefix means ' + P[p].mean + '?',
      explain: W.sum(parts(p, b)), meta: { k: 'g2-pre-which', mean: P[p].say(b) } });
  }
  function preAdd(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases);
    return { q: 'Which prefix makes a word that means <b>' + P[p].say(b) + '</b>?', fig: '<span class="wsum">' + W.tile('?', 'prefix') + W.tile(b, 'base') + '</span>', type: 'tap',
      tiles: [W.tile('mis', 'prefix'), W.tile('pre', 'prefix')], answer: p === 'mis' ? 0 : 1, prompt: 'Does it mean <b>wrongly</b>, or <b>before</b>?',
      hint: 'mis- means wrongly. pre- means before.', explain: W.sum(parts(p, b)), meta: { k: 'g2-pre-add', mean: P[p].say(b) } };
  }
  function preBuild(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(OTHER[p], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].say(b) + '</b>.', fig: lv > 1 ? '' : card(p), type: 'build', parts: list, answer: [0, 2],
      hint: 'Prefix first, then the base word.', explain: W.sum(parts(p, b)), meta: { k: 'g2-pre-build', mean: P[p].say(b) } };
  }
  function preMatch() {
    var a = R.pick(P.mis.bases), b = R.pick(P.pre.bases), p = pre(), c = R.pick(P[p].bases.filter(function (x) { return x !== a && x !== b; }));
    return { q: 'Match each word to what it means.', type: 'match', pairs: [['mis', a], ['pre', b], [p, c]].map(function (x) { return [x[0] + x[1], P[x[0]].say(x[1])]; }),
      hint: 'mis- means wrongly. pre- means before.', explain: 'Cover the prefix, read the base word, then add its meaning.', meta: { k: 'g2-pre-match' } };
  }
  /* Pick every word that has the prefix: mist and pretty only look like they do */
  function preReal() {
    var p = pre(), real = R.some(P[p].bases, R.int(1, 2)).map(function (b) { return p + b; }), fake = R.some(LOOK[p], 2);
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, { hint: 'Cover the first letters. Is a real word left?',
      explain: 'Cover <b>' + p + '</b> in <b>' + fake[0] + '</b>: no word is left, so there is no prefix.', meta: { k: 'g2-pre-real', pre: p } });
  }

  /* ---------- suffixes ---------- */
  /* [word, base, meaning] */
  var S = {
    er: { rule: 'a person who', list: [['teacher', 'teach', 'a person who teaches'], ['painter', 'paint', 'a person who paints'], ['farmer', 'farm', 'a person who farms'], ['singer', 'sing', 'a person who sings'],
      ['helper', 'help', 'a person who helps'], ['builder', 'build', 'a person who builds']] },
    or: { rule: 'a person who', list: [['sailor', 'sail', 'a person who sails'], ['actor', 'act', 'a person who acts'], ['inventor', 'invent', 'a person who invents'], ['visitor', 'visit', 'a person who visits']] },
    ness: { rule: 'being', list: [['kindness', 'kind', 'being kind'], ['sadness', 'sad', 'being sad'], ['darkness', 'dark', 'being dark'], ['softness', 'soft', 'being soft'], ['fairness', 'fair', 'being fair']] },
    y: { rule: 'with lots of', list: [['rainy', 'rain', 'with lots of rain'], ['windy', 'wind', 'with lots of wind'], ['sandy', 'sand', 'with lots of sand'], ['snowy', 'snow', 'with lots of snow'],
      ['rocky', 'rock', 'with lots of rocks'], ['cloudy', 'cloud', 'with lots of clouds']] }
  };
  var SUFS = ['er', 'or', 'ness', 'y'];
  function suf(s) { return s || R.pick(SUFS); }
  function sparts(w, s) { return [[w[1], 'base'], [s, 'suffix']]; }
  function scard(s) { return '<span class="wmeans">' + W.tile('-' + s, 'suffix') + '<span>' + S[s].rule + '</span></span>'; }
  /* a word from a suffix group that means something different */
  function otherGroup(s) { return R.pick(R.pick(SUFS.filter(function (x) { return S[x].rule !== S[s].rule; }).map(function (x) { return S[x].list; }))); }

  function sufMeaning(lv, s0) {
    var s = suf(s0), w = R.pick(S[s].list), wrong = [otherGroup(s)[2]];
    if (lv > 1) wrong.push(R.pick(S[s].list.filter(function (x) { return x !== w; }))[2]);
    return Q.one('What does <b>' + w[0] + '</b> mean?', w[2], wrong, { fig: lv > 1 ? W.tile(w[0]) : W.sum(sparts(w, s)), prompt: 'Cover the ending. Read the base word.',
      hint: '-er and -or: a person who. -ness: being. -y: with lots of.', explain: scard(s),
      steps: ['The base word is <b>' + w[1] + '</b>.', '<b>-' + s + '</b> means <b>' + S[s].rule + '</b>.', 'So <b>' + w[0] + '</b> means <b>' + w[2] + '</b>.'], meta: { k: 'g2-suf-meaning', word: w[0] } });
  }
  /* Which ending makes "a person who paints"? */
  function sufEnding() {
    var s = suf(), w = R.pick(S[s].list), tiles = [s].concat(['ness', 'y', s === 'or' ? 'er' : 'or'].filter(function (x) { return S[x].rule !== S[s].rule; }).slice(0, 2));
    return Q.tiles('Which ending makes a word that means <b>' + w[2] + '</b>?', '-' + s, tiles.slice(1).map(function (x) { return '-' + x; }), {
      fig: '<span class="wsum">' + W.tile(w[1], 'base') + W.tile('?', 'suffix') + '</span>', hint: '-er and -or: a person who. -ness: being. -y: with lots of.', explain: W.sum(sparts(w, s)),
      meta: { k: 'g2-suf-ending', mean: w[2] } });
  }
  function sufBuild(lv, s0) {
    var s = suf(s0), w = R.pick(S[s].list), wrongS = R.pick(['ness', 'y', 'er'].filter(function (x) { return S[x].rule !== S[s].rule; }));
    var list = [W.tile(w[1], 'base'), W.tile(s, 'suffix'), W.tile(wrongS, 'suffix')].concat(lv > 1 ? [W.tile(otherGroup(s)[1], 'base')] : []);
    return { q: 'Build the word that means <b>' + w[2] + '</b>.', fig: lv > 1 ? '' : scard(s), type: 'build', parts: list, answer: [0, 1],
      hint: 'Base word first, then the ending.', explain: W.sum(sparts(w, s)), meta: { k: 'g2-suf-build', mean: w[2] } };
  }
  function sufMatch() {
    var list = [R.pick(S.er.list.concat(S.or.list)), R.pick(S.ness.list), R.pick(S.y.list)];
    return { q: 'Match each word to what it means.', type: 'match', pairs: list.map(function (w) { return [w[0], w[2]]; }), hint: 'Look at the end of each word.',
      explain: '-er and -or: a person who. -ness: being. -y: with lots of.', meta: { k: 'g2-suf-match' } };
  }
  function sufTf() {
    var s = R.pick(['er', 'ness', 'y']), right = R.int(0, 1) === 1, said = right ? S[s].rule : R.pick(['er', 'ness', 'y'].filter(function (x) { return x !== s; }).map(function (x) { return S[x].rule; }));
    return { q: Q.name() + ' says:', fig: W.sent('<b>-' + s + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['-er means a person who.', '-ness means being.', '-y means with lots of.'], answer: ['er', 'ness', 'y'].indexOf(s) },
      hint: 'Think of a word with this ending, like ' + S[s].list[0][0] + '.', explain: scard(s), meta: { k: 'g2-suf-tf', suf: s, said: said } };
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'numbers', title: 'Number prefixes', sub: 'Some prefixes tell how many.',
      concepts: [
        { slug: 'uni-bi-tri', title: 'uni- is one, bi- is two, tri- is three', exp: ['B2.3', 'B2.4'], skill: 'number-prefixes',
          model: [
            step(W.sum([['uni', 'prefix'], ['cycle', 'base']]) + dots(1), 'One wheel.'),
            step(W.sum([['bi', 'prefix'], ['cycle', 'base']]) + dots(2), 'Two wheels.'),
            step(W.sum([['tri', 'prefix'], ['cycle', 'base']]) + dots(3), 'Three wheels.'),
            step(W.sum([['tri', 'prefix'], ['angle', 'base']]), 'A shape with three corners.')
          ],
          guided: [function () { return numMeaning(1); }, numWhich],
          check: [numCount, function () { return numBuild(1); }],
          coach: '<p>Go on a hunt: a bicycle, a tricycle, triangles on signs. Ask "How many?" and point to the prefix.</p>',
          mistake: '<p>Mixing up bi- and tri-. Link them: <b>bi</b>cycle has two wheels, <b>tri</b>angle has three corners.</p>' }
      ]
    }, {
      id: 'mis-pre', title: 'Prefixes: mis- and pre-', sub: 'A small part at the front changes the meaning.',
      concepts: [
        { slug: 'mis', title: 'mis- means wrongly', exp: ['B2.3', 'B2.4'], skill: 'prefixes',
          model: [
            step(W.sum(parts('mis', 'spell')), 'Cover <b>mis</b>. Read <b>spell</b>.'),
            step(card('mis'), '<b>misspell</b>: spell it the wrong way.'),
            step(W.sum(parts('mis', 'count')), '<b>miscount</b>: count the wrong way.')
          ],
          guided: [function () { return preMeaning(1, 'mis'); }, function () { return preWhich(1, 'mis'); }],
          check: [function () { return preMeaning(1, 'mis'); }, function () { return preWhich(1, 'mis'); }],
          coach: '<p>Make a small mistake on purpose: count four apples as five. "I <b>miscounted</b>." Ask the child to fix it.</p>',
          mistake: '<p>Seeing a prefix in words like <b>mist</b>. Cover the "mis": if no word is left, there is no prefix.</p>' },
        { slug: 'pre', title: 'pre- means before', exp: ['B2.3', 'B2.4'], skill: 'prefixes',
          model: [
            step(W.sum(parts('pre', 'heat')), 'Cover <b>pre</b>. Read <b>heat</b>.'),
            step(card('pre'), '<b>preheat</b>: heat the oven before you bake.'),
            step(W.sum(parts('pre', 'view')), '<b>preview</b>: look before.')
          ],
          guided: [function () { return preMeaning(1, 'pre'); }, function () { return preWhich(1, 'pre'); }],
          check: [function () { return preMeaning(1, 'pre'); }, function () { return preWhich(1, 'pre'); }],
          coach: '<p>Before baking together, say: "First we <b>preheat</b> the oven." Ask what else we do before: prewash, pretest.</p>',
          mistake: '<p>Seeing a prefix in words like <b>pretty</b> or <b>press</b>. Cover the "pre": no word is left.</p>' },
        { slug: 'which', title: 'mis- or pre-?', exp: ['B2.3', 'B2.4'], skill: 'prefixes',
          model: [
            step(card('mis'), '<b>Wrongly</b>? Use <b>mis</b>.'),
            step(W.sum(parts('mis', 'read'))),
            step(card('pre'), '<b>Before</b>? Use <b>pre</b>.'),
            step(W.sum(parts('pre', 'pay')))
          ],
          guided: [preAdd, function () { return preBuild(1); }],
          check: [preAdd, function () { return preBuild(1); }],
          coach: '<p>Before the child taps, ask: "Does it mean wrongly, or before?" Wait for the answer.</p>',
          mistake: '<p>Putting the prefix at the end. The prefix always goes in the first box.</p>' }
      ]
    }, {
      id: 'endings', title: 'Suffixes', sub: 'A small part at the end changes the meaning.',
      concepts: [
        { slug: 'er-or', title: '-er and -or mean a person who', exp: ['B2.3', 'B2.4'], skill: 'suffixes',
          model: [
            step(W.sum([['paint', 'base'], ['er', 'suffix']]), '<b>painter</b>: paints.'),
            step(W.sum([['sail', 'base'], ['or', 'suffix']]), '<b>sailor</b>: sails.'),
            step(W.icon('people'), 'Usually <b>-er</b>. Learn the <b>-or</b> words.')
          ],
          guided: [function () { return sufMeaning(1, 'er'); }, function () { return sufBuild(1, 'or'); }],
          check: [function () { return sufMeaning(1, 'or'); }, function () { return sufBuild(1, 'er'); }],
          coach: '<p>Name the people you see in a day: a driver, a teacher, a visitor. Ask what each one does.</p>',
          mistake: '<p>Spelling sailor as "sailer". Most words take -er, but a few take -or. Keep a short list of -or words.</p>' },
        { slug: 'ness', title: '-ness means being', exp: ['B2.3', 'B2.4'], skill: 'suffixes',
          model: [
            step(W.sum([['kind', 'base'], ['ness', 'suffix']]), '<b>kindness</b>: being kind.'),
            step(W.sum([['dark', 'base'], ['ness', 'suffix']]), '<b>darkness</b>: being dark.')
          ],
          guided: [function () { return sufMeaning(1, 'ness'); }, function () { return sufBuild(1, 'ness'); }],
          check: [function () { return sufMeaning(2, 'ness'); }, function () { return sufBuild(1, 'ness'); }],
          coach: '<p>Notice acts of kindness during the day and name them: "That was kindness."</p>',
          mistake: '<p>Writing "kindniss". The ending is always spelled n-e-s-s.</p>' },
        { slug: 'y', title: '-y means with lots of', exp: ['B2.3', 'B2.4'], skill: 'suffixes',
          model: [
            step(W.sum([['rain', 'base'], ['y', 'suffix']]), '<b>rainy</b>: lots of rain.'),
            step(W.sum([['sand', 'base'], ['y', 'suffix']]), '<b>sandy</b>: lots of sand.')
          ],
          guided: [function () { return sufMeaning(1, 'y'); }, sufEnding],
          check: [function () { return sufMeaning(2, 'y'); }, sufEnding],
          coach: '<p>Look out the window each morning and describe the weather with a -y word: sunny, windy, cloudy, snowy.</p>',
          mistake: '<p>Doubling letters by mistake (rainny). Here the base word does not change: rain + y.</p>' }
      ]
    }],
    practice: [
      { id: 'number-prefixes', name: 'Number prefixes', code: 'B2.3, B2.4', gen: numMeaning },
      { id: 'prefixes', name: 'Prefixes mis- and pre-', code: 'B2.3, B2.4', gen: function (lv) { return preMeaning(lv); } },
      { id: 'suffixes', name: 'Suffixes -er, -or, -ness and -y', code: 'B2.3, B2.4', gen: function (lv) { return sufMeaning(lv); } }
    ],
    tasks: [
      { id: 'word-family', title: 'Word part hunt', code: 'B2.4', pic: W.icon('read'), say: 'Find 3 words with a prefix or suffix in a book. What does each one mean?', write: true,
        run: ['Read a favourite book together.', 'Hunt for three words with a part from this chapter (for example: helper, sandy, tricycle).', 'The child covers the part, reads the base word, then says what the whole word means.'],
        rubric: ['Does not find word parts yet.', 'Finds a word part with help.', 'Finds three and explains most of them.', 'Finds three, explains them, and uses one in a new sentence.'] }
    ]
  });

  Q.shapes('word-parts', {
    'number-prefixes': [[1, 'which', numWhich], [1, 'count', numCount], [1, 'build', numBuild], [2, 'match', numMatch]],
    prefixes: [[1, 'which-word', preWhich], [1, 'add-prefix', preAdd], [1, 'build', preBuild], [2, 'match', preMatch], [2, 'real-prefix', preReal]],
    suffixes: [[1, 'ending', sufEnding], [1, 'build', sufBuild], [2, 'match', sufMatch], [2, 'true-false', sufTf]]
  });
})();
