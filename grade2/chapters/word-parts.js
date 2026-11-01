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
  var NUMWORDS = [['uni', 'cycle', 'wheel', 'wheels'], ['uni', 'corn', 'horn', 'horns'], ['bi', 'cycle', 'wheel', 'wheels'], ['bi', 'lingual', 'language', 'languages'], ['bi', 'plane', 'set of wings', 'sets of wings'],
    ['tri', 'cycle', 'wheel', 'wheels'], ['tri', 'angle', 'corner', 'corners'], ['tri', 'pod', 'leg', 'legs'], ['tri', 'ceratops', 'horn', 'horns']];
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
  function numTf() {
    var w = R.pick(NUMWORDS), n = { uni: 1, bi: 2, tri: 3 }[w[0]], right = R.int(0, 1) === 1, said = right ? n : R.pick([1, 2, 3].filter(function (x) { return x !== n; }));
    return { q: Q.name() + ' says a <b>' + nw(w) + '</b> has <b>' + said + '</b> ' + (said === 1 ? w[2] : w[3]) + '.', fig: W.sum([[w[0], 'prefix'], [w[1], 'base']]), type: 'tf', answer: right,
      why: { options: ['The prefix ' + w[0] + '- means ' + NUM[w[0]] + '.', 'The prefix means another number.'], answer: right ? 0 : 1 },
      hint: 'uni- is one, bi- is two, tri- is three.', explain: numCard(w[0]), meta: { k: 'g2-num-tf', word: nw(w), said: said } };
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
    mis: { mean: 'wrongly', bases: ['spell', 'read', 'count', 'place', 'use', 'match', 'behave', 'hear', 'judge', 'lead'], say: function (b) { return b + ' wrongly'; } },
    pre: { mean: 'before', bases: ['heat', 'view', 'pay', 'wash', 'cook', 'test', 'order', 'soak', 'set'], say: function (b) { return b + ' before'; } }
  };
  /* the words in sentences */
  var PUSE = { misspell: 'Check your work so you do not ___ a word.', misread: 'I ___ the sign and went the wrong way.', miscount: 'Count again so you do not ___ the eggs.',
    misplace: 'Put your key in the bowl so you do not ___ it.', misuse: 'Do not ___ the scissors.', misbehave: 'The puppy will ___ if it is bored.', mishear: 'Speak clearly so I do not ___ you.',
    preheat: 'We ___ the oven, then we bake.', preview: 'Let us ___ the book before we read it.', prepay: 'You can ___ for your ticket online.', precook: 'Dad will ___ the rice before the party.',
    pretest: 'We take a ___ before we learn the new words.', presoak: '___ the beans in water overnight.', preorder: 'We will ___ the book, so we get it on the first day.' };
  var OTHER = { mis: 'pre', pre: 'mis' };
  var LOOK = { mis: ['mist', 'mister', 'misty'], pre: ['press', 'pretty', 'pretzel'] };
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
  function preFill(lv, p0) {
    var p = pre(p0), w = R.pick(Object.keys(PUSE).filter(function (x) { return x.indexOf(p) === 0; })), b = w.slice(3);
    var near = R.pick(Object.keys(PUSE).filter(function (x) { return x.indexOf(p) === 0 && x !== w; }));
    return Q.tiles('Which word finishes the sentence?', w, [OTHER[p] + b].concat(lv > 1 ? [near] : []), { fig: W.sent(PUSE[w].replace('___', W.gap())),
      hint: p + '- means ' + P[p].mean + '. Does the sentence need that?', explain: W.sent(PUSE[w].replace('___', '<b>' + w + '</b>')), meta: { k: 'g2-pre-fill', s: PUSE[w] } });
  }
  function preTf(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].say(b) : P[OTHER[p]].say(b);
    return { q: Q.name() + ' says <b>' + p + b + '</b> means <b>' + said + '</b>.', fig: W.sum(parts(p, b)), type: 'tf', answer: right,
      why: { options: [p + '- means ' + P[p].mean + '.', p + '- does not mean ' + P[OTHER[p]].mean + '.'], answer: right ? 0 : 1 },
      hint: 'Cover the prefix. What does it mean?', explain: card(p), meta: { k: 'g2-pre-tf', word: p + b, said: said } };
  }
  function preSort(lv) {
    var p = pre(), right = R.some(P[p].bases, 2).map(function (b) { return p + b; }), wrong = R.some(P[OTHER[p]].bases, lv > 1 ? 3 : 2).map(function (b) { return OTHER[p] + b; });
    return Q.all('Pick every word that means <b>' + P[p].mean + '</b>.', right, wrong, { hint: 'Which prefix means ' + P[p].mean + '?', explain: card(p), meta: { k: 'g2-pre-sort', mean: P[p].mean } });
  }
  /* Pick every word that has the prefix: mist and pretty only look like they do */
  function preReal(lv, p0) {
    var p = pre(p0), real = R.some(P[p].bases, R.int(1, 2)).map(function (b) { return p + b; }), fake = R.some(LOOK[p], 2);
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, { hint: 'Cover the first letters. Is a real word left?',
      explain: 'Cover <b>' + p + '</b> in <b>' + fake[0] + '</b>: no word is left, so there is no prefix.', meta: { k: 'g2-pre-real', pre: p } });
  }

  /* ---------- suffixes ---------- */
  /* [word, base, meaning] */
  var S = {
    er: { rule: 'a person who', list: [['teacher', 'teach', 'a person who teaches', 'Our ___ reads us a story.'], ['painter', 'paint', 'a person who paints', 'The ___ painted our fence.'],
      ['farmer', 'farm', 'a person who farms', 'The ___ grows corn.'], ['singer', 'sing', 'a person who sings', 'The ___ sang a song.'], ['helper', 'help', 'a person who helps', 'I was the class ___ today.'],
      ['builder', 'build', 'a person who builds', 'The ___ made a new house.'], ['reader', 'read', 'a person who reads', 'My brother is a fast ___.'], ['player', 'play', 'a person who plays', 'Each ___ gets a turn.']] },
    or: { rule: 'a person who', list: [['sailor', 'sail', 'a person who sails', 'The ___ steered the boat.'], ['actor', 'act', 'a person who acts', 'The ___ was in a play.'],
      ['inventor', 'invent', 'a person who invents', 'The ___ made a new machine.'], ['visitor', 'visit', 'a person who visits', 'We had a ___ at school today.'], ['conductor', 'conduct', 'a person who conducts', 'The ___ led the band.']] },
    ness: { rule: 'being', list: [['kindness', 'kind', 'being kind', 'Thank you for your ___.'], ['sadness', 'sad', 'being sad', 'Her ___ went away when her friend came.'], ['darkness', 'dark', 'being dark', 'The owl hunts in the ___.'],
      ['softness', 'soft', 'being soft', 'I love the ___ of my blanket.'], ['fairness', 'fair', 'being fair', 'Taking turns shows ___.'], ['loudness', 'loud', 'being loud', 'The ___ of the drum hurt my ears.'],
      ['brightness', 'bright', 'being bright', 'The ___ of the sun made me squint.'], ['goodness', 'good', 'being good', 'She helped out of the ___ of her heart.']] },
    y: { rule: 'with lots of', list: [['rainy', 'rain', 'with lots of rain', 'Take an umbrella on a ___ day.'], ['windy', 'wind', 'with lots of wind', 'It is ___, so fly your kite.'],
      ['sandy', 'sand', 'with lots of sand', 'My feet were ___ after the beach.'], ['snowy', 'snow', 'with lots of snow', 'We built a fort on a ___ day.'], ['rocky', 'rock', 'with lots of rocks', 'The path up the hill was ___.'],
      ['cloudy', 'cloud', 'with lots of clouds', 'It is ___, so we cannot see the sun.'], ['dusty', 'dust', 'with lots of dust', 'The old box was ___.'], ['bumpy', 'bump', 'with lots of bumps', 'The dirt road was ___.']] }
  };
  /* the endings each practice skill asks about */
  var GROUP = { 'er-or': ['er', 'or'], ness: ['ness'], y: ['y'] };
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
  function sufEnding(lv, s0) {
    var s = suf(s0), w = R.pick(S[s].list), tiles = [s].concat(['ness', 'y', s === 'or' ? 'er' : 'or'].filter(function (x) { return S[x].rule !== S[s].rule; }).slice(0, 2));
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
  function sufFill(lv, s0) {
    var s = suf(s0), w = R.pick(S[s].list), wrong = [w[1], otherGroup(s)[0]].slice(0, lv > 1 ? 2 : 1);
    return Q.tiles('Which word finishes the sentence?', w[0], wrong, { fig: W.sent(w[3].replace('___', W.gap())), hint: 'Which word fits? Look at its ending.',
      explain: W.sent(w[3].replace('___', '<b>' + w[0] + '</b>')), meta: { k: 'g2-suf-fill', s: w[3] } });
  }
  function sufWordTf(lv, s0) {
    var s = suf(s0), w = R.pick(S[s].list), right = R.int(0, 1) === 1, said = right ? w[2] : otherGroup(s)[2];
    return { q: Q.name() + ' says <b>' + w[0] + '</b> means <b>' + said + '</b>.', fig: W.sum(sparts(w, s)), type: 'tf', answer: right,
      why: { options: ['The base word and -' + s + ' make that meaning.', 'That meaning is for another word.'], answer: right ? 0 : 1 },
      hint: 'Read the base word. What does the ending add?', explain: scard(s), meta: { k: 'g2-suf-word-tf', word: w[0], said: said } };
  }
  function sufTf() {
    var s = R.pick(['er', 'ness', 'y']), right = R.int(0, 1) === 1, said = right ? S[s].rule : R.pick(['er', 'ness', 'y'].filter(function (x) { return x !== s; }).map(function (x) { return S[x].rule; }));
    return { q: Q.name() + ' says:', fig: W.sent('<b>-' + s + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['-er means a person who.', '-ness means being.', '-y means with lots of.'], answer: ['er', 'ness', 'y'].indexOf(s) },
      hint: 'Think of a word with this ending, like ' + S[s].list[0][0] + '.', explain: scard(s), meta: { k: 'g2-suf-tf', suf: s, said: said } };
  }

  function as(f, x) { return function (lv) { return f(lv, x); }; }
  function inGroup(f, g) { return function (lv) { return f(lv, R.pick(GROUP[g])); }; }

  Atlas.register('word-parts', {
    full: true,
    lessons: [{
      id: 'numbers', title: 'Number prefixes', sub: 'Some prefixes tell how many.',
      concepts: [
        { slug: 'uni-bi-tri', title: 'uni- is one, bi- is two, tri- is three', exp: ['B2.3', 'B2.4'], skill: 'number-prefixes',
          model: [
            step(W.sum([['uni', 'prefix'], ['cycle', 'base']]) + dots(1), 'One wheel.'),
            step(W.sum([['bi', 'prefix'], ['cycle', 'base']]) + dots(2), 'Two wheels.'),
            step(W.sum([['tri', 'prefix'], ['cycle', 'base']]) + dots(3), 'Three wheels.'),
            step(W.tile('triangle'), 'A new word. Look at the start.'),
            step(W.sum([['tri', 'prefix'], ['angle', 'base']]) + dots(3), 'Three corners.')
          ],
          guided: [function () { return numMeaning(1); }, numWhich, numCount],
          check: [function () { return numMeaning(2); }, function () { return numBuild(1); }, numTf, numMatch, function () { return numMeaning(3); }],
          coach: '<p>Go on a hunt: a bicycle, a tricycle, triangles on signs. Ask "How many?" and point to the prefix.</p>',
          mistake: '<p>Mixing up bi- and tri-. Link them: <b>bi</b>cycle has two wheels, <b>tri</b>angle has three corners.</p>' }
      ]
    }, {
      id: 'mis-pre', title: 'Prefixes: mis- and pre-', sub: 'A small part at the front changes the meaning.',
      concepts: [
        { slug: 'mis', title: 'mis- means wrongly', exp: ['B2.3', 'B2.4'], skill: 'mis',
          model: [
            step(W.sum(parts('mis', 'spell')), 'Cover <b>mis</b>. Read <b>spell</b>.'),
            step(card('mis'), '<b>misspell</b>: spell it the wrong way.'),
            step(W.sum(parts('mis', 'count')), 'Another one: cover <b>mis</b>, read <b>count</b>.'),
            step(W.sent('Count again so you do not <b>miscount</b> the eggs.'), 'Count the wrong way.')
          ],
          guided: [as(preMeaning, 'mis'), as(preWhich, 'mis'), as(preFill, 'mis')],
          check: [function () { return preMeaning(2, 'mis'); }, as(preBuild, 'mis'), as(preTf, 'mis'), as(preReal, 'mis'), function () { return preFill(2, 'mis'); }],
          coach: '<p>Make a small mistake on purpose: count four apples as five. "I <b>miscounted</b>." Ask the child to fix it.</p>',
          mistake: '<p>Seeing a prefix in words like <b>mist</b>. Cover the "mis": if no word is left, there is no prefix.</p>' },
        { slug: 'pre', title: 'pre- means before', exp: ['B2.3', 'B2.4'], skill: 'pre',
          model: [
            step(W.sum(parts('pre', 'heat')), 'Cover <b>pre</b>. Read <b>heat</b>.'),
            step(card('pre'), '<b>preheat</b>: heat the oven before you bake.'),
            step(W.sum(parts('pre', 'view')), 'Another one: cover <b>pre</b>, read <b>view</b>.'),
            step(W.sent('Let us <b>preview</b> the book before we read it.'), 'Look at it first.')
          ],
          guided: [as(preMeaning, 'pre'), as(preWhich, 'pre'), as(preFill, 'pre')],
          check: [function () { return preMeaning(2, 'pre'); }, as(preBuild, 'pre'), as(preTf, 'pre'), as(preReal, 'pre'), function () { return preFill(2, 'pre'); }],
          coach: '<p>Before baking together, say: "First we <b>preheat</b> the oven." Ask what else we do before: prewash, pretest.</p>',
          mistake: '<p>Seeing a prefix in words like <b>pretty</b> or <b>press</b>. Cover the "pre": no word is left.</p>' },
        { slug: 'which', title: 'mis- or pre-?', exp: ['B2.3', 'B2.4'], skill: 'mis-or-pre',
          model: [
            step(card('mis'), '<b>Wrongly</b>? Use <b>mis</b>.'),
            step(W.sum(parts('mis', 'read'))),
            step(card('pre'), '<b>Before</b>? Use <b>pre</b>.'),
            step(W.sum(parts('pre', 'pay'))),
            step(W.sent('Soak the beans <b>before</b> you cook them.'), 'Before: <b>presoak</b>.')
          ],
          guided: [preAdd, function () { return preBuild(1); }, function () { return preSort(1); }],
          check: [preAdd, function () { return preBuild(2); }, preMatch, function () { return preSort(2); }, function () { return preFill(2); }],
          coach: '<p>Before the child taps, ask: "Does it mean wrongly, or before?" Wait for the answer.</p>',
          mistake: '<p>Putting the prefix at the end. The prefix always goes in the first box.</p>' }
      ]
    }, {
      id: 'endings', title: 'Suffixes', sub: 'A small part at the end changes the meaning.',
      concepts: [
        { slug: 'er-or', title: '-er and -or mean a person who', exp: ['B2.3', 'B2.4'], skill: 'er-or',
          model: [
            step(W.sum([['paint', 'base'], ['er', 'suffix']]), '<b>painter</b>: paints.'),
            step(W.sum([['sail', 'base'], ['or', 'suffix']]), '<b>sailor</b>: sails.'),
            step(W.icon('people'), 'Usually <b>-er</b>. Learn the <b>-or</b> words.'),
            step(W.sent('The ' + W.gap() + ' led the band.'), 'Who leads a band? Someone who conducts.'),
            step(W.sum([['conduct', 'base'], ['or', 'suffix']]), 'An <b>-or</b> word.')
          ],
          guided: [as(sufMeaning, 'er'), as(sufBuild, 'or'), as(sufFill, 'er')],
          check: [function () { return sufMeaning(2, 'or'); }, function () { return sufBuild(2, 'er'); }, as(sufEnding, 'er'), as(sufWordTf, 'or'), function () { return sufFill(2, 'or'); }],
          coach: '<p>Name the people you see in a day: a driver, a teacher, a visitor. Ask what each one does.</p>',
          mistake: '<p>Spelling sailor as "sailer". Most words take -er, but a few take -or. Keep a short list of -or words.</p>' },
        { slug: 'ness', title: '-ness means being', exp: ['B2.3', 'B2.4'], skill: 'ness',
          model: [
            step(W.sum([['kind', 'base'], ['ness', 'suffix']]), '<b>kindness</b>: being kind.'),
            step(W.sent('Thank you for your <b>kindness</b>.'), 'In a sentence.'),
            step(W.sum([['dark', 'base'], ['ness', 'suffix']]), '<b>darkness</b>: being dark.'),
            step(W.sent('The owl hunts in the <b>darkness</b>.'), 'The base word does not change.')
          ],
          guided: [as(sufMeaning, 'ness'), as(sufBuild, 'ness'), as(sufFill, 'ness')],
          check: [function () { return sufMeaning(2, 'ness'); }, function () { return sufBuild(2, 'ness'); }, as(sufWordTf, 'ness'), sufMatch, function () { return sufFill(2, 'ness'); }],
          coach: '<p>Notice acts of kindness during the day and name them: "That was kindness."</p>',
          mistake: '<p>Writing "kindniss". The ending is always spelled n-e-s-s.</p>' },
        { slug: 'y', title: '-y means with lots of', exp: ['B2.3', 'B2.4'], skill: 'y',
          model: [
            step(W.sum([['rain', 'base'], ['y', 'suffix']]), '<b>rainy</b>: lots of rain.'),
            step(W.pic('rain'), 'Take an umbrella on a <b>rainy</b> day.'),
            step(W.sum([['sand', 'base'], ['y', 'suffix']]), '<b>sandy</b>: lots of sand.'),
            step(W.sent('My feet were <b>sandy</b> after the beach.'), 'Rain + y, sand + y: the base word stays the same.')
          ],
          guided: [as(sufMeaning, 'y'), as(sufEnding, 'y'), as(sufFill, 'y')],
          check: [function () { return sufMeaning(2, 'y'); }, function () { return sufBuild(2, 'y'); }, as(sufWordTf, 'y'), sufTf, function () { return sufFill(2, 'y'); }],
          coach: '<p>Look out the window each morning and describe the weather with a -y word: sunny, windy, cloudy, snowy.</p>',
          mistake: '<p>Doubling letters by mistake (rainny). Here the base word does not change: rain + y.</p>' }
      ]
    }],
    practice: [
      { id: 'number-prefixes', name: 'Number prefixes', code: 'B2.3, B2.4', gen: numMeaning },
      { id: 'mis', name: 'The prefix mis-', code: 'B2.3, B2.4', gen: as(preMeaning, 'mis') },
      { id: 'pre', name: 'The prefix pre-', code: 'B2.3, B2.4', gen: as(preMeaning, 'pre') },
      { id: 'mis-or-pre', name: 'mis- or pre-?', code: 'B2.3, B2.4', gen: preAdd },
      { id: 'er-or', name: 'The suffixes -er and -or', code: 'B2.3, B2.4', gen: inGroup(sufMeaning, 'er-or') },
      { id: 'ness', name: 'The suffix -ness', code: 'B2.3, B2.4', gen: as(sufMeaning, 'ness') },
      { id: 'y', name: 'The suffix -y', code: 'B2.3, B2.4', gen: as(sufMeaning, 'y') }
    ],
    tasks: [
      { id: 'word-family', title: 'Word part hunt', code: 'B2.4', pic: W.icon('read'), say: 'Find 3 words with a prefix or suffix in a book. What does each one mean?', write: true,
        run: ['Read a favourite book together.', 'Hunt for three words with a part from this chapter (for example: helper, sandy, tricycle).', 'The child covers the part, reads the base word, then says what the whole word means.'],
        rubric: ['Does not find word parts yet.', 'Finds a word part with help.', 'Finds three and explains most of them.', 'Finds three, explains them, and uses one in a new sentence.'] }
    ]
  });

  Q.shapes('word-parts', {
    'number-prefixes': [[1, 'which', numWhich], [1, 'count', numCount], [1, 'build', numBuild], [2, 'match', numMatch], [2, 'tf', numTf]],
    mis: [[1, 'which-word', as(preWhich, 'mis')], [1, 'in-a-sentence', as(preFill, 'mis')], [1, 'build', as(preBuild, 'mis')], [2, 'real-prefix', as(preReal, 'mis')], [2, 'tf', as(preTf, 'mis')]],
    pre: [[1, 'which-word', as(preWhich, 'pre')], [1, 'in-a-sentence', as(preFill, 'pre')], [1, 'build', as(preBuild, 'pre')], [2, 'real-prefix', as(preReal, 'pre')], [2, 'tf', as(preTf, 'pre')]],
    'mis-or-pre': [[1, 'build', preBuild], [1, 'sort', preSort], [2, 'match', preMatch], [2, 'in-a-sentence', preFill]],
    'er-or': [[1, 'build', inGroup(sufBuild, 'er-or')], [1, 'in-a-sentence', inGroup(sufFill, 'er-or')], [1, 'ending', inGroup(sufEnding, 'er-or')], [2, 'tf', inGroup(sufWordTf, 'er-or')]],
    ness: [[1, 'build', as(sufBuild, 'ness')], [1, 'in-a-sentence', as(sufFill, 'ness')], [2, 'tf', as(sufWordTf, 'ness')], [2, 'match', sufMatch]],
    y: [[1, 'build', as(sufBuild, 'y')], [1, 'in-a-sentence', as(sufFill, 'y')], [1, 'ending', as(sufEnding, 'y')], [2, 'tf', as(sufWordTf, 'y')], [2, 'rule-tf', sufTf]]
  });
})();
