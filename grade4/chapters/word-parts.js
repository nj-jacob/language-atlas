/* Grade 4: word parts. The prefixes dis- (not), mis- (wrongly) and pre- (before); the suffix -able (can be);
   -ness and -ment, which make naming words; and using word parts to work out a new word in a sentence.
   Ontario 2023 Language, Grade 4:
   B2.1 "use knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell words"
   B2.2 "... use morphological knowledge to analyze and understand new words in context"
   All word lists and sentences are written for this site. Answer checks: tests/verify/grade4-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* base words that take each prefix, and the meaning the prefix makes */
  var P = {
    dis: { icon: 'not', says: 'not', bases: ['agree', 'like', 'honest', 'obey', 'trust', 'loyal', 'approve', 'allow'], mean: function (b) { return 'not ' + b; } },
    mis: { icon: null, says: 'wrongly', bases: ['spell', 'read', 'judge', 'behave', 'count', 'hear', 'label', 'use'], mean: function (b) { return b + ' wrongly'; } },
    pre: { icon: null, says: 'before', bases: ['heat', 'view', 'pay', 'test', 'wash', 'cook', 'order', 'set'], mean: function (b) { return b + ' before'; } }
  };
  var PRE = Object.keys(P);
  /* words that start with the same letters but have no prefix: cover the letters and no word is left */
  var LOOKALIKE = { dis: ['dish', 'distant', 'dismal'], mis: ['mist', 'misty', 'mission'], pre: ['press', 'pretty', 'precious', 'prey'] };

  function pre(p) { return p || R.pick(PRE); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  function others(p) { return PRE.filter(function (x) { return x !== p; }); }
  /* the same base with each of the other prefixes' meanings, so only the prefix decides */
  function wrongMeanings(p, b) { return others(p).map(function (o) { return P[o].mean(b); }).concat([b]); }
  function says(p) { return '<b>' + p + '-</b> means <b>' + P[p].says + '</b>'; }
  /* a meaning card: with its picture cue when there is one */
  function card(p, html) { return P[p].icon ? W.means(P[p].icon, html) : W.sent(html); }

  /* ---------- prefixes ---------- */
  function meaning(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), word = p + b;
    return Q.one('What does <b>' + word + '</b> mean?', P[p].mean(b), wrongMeanings(p, b).slice(0, lv > 1 ? 3 : 2), {
      fig: lv > 1 ? W.tile(word) : W.sum(parts(p, b)), prompt: 'Cover <b>' + p + '</b>. What word is left?', hint: 'Cover the prefix. Read the base word. Then add what the prefix means.',
      explain: card(p, says(p)),
      steps: ['Cover <b>' + p + '</b>. The base word is <b>' + b + '</b>.', says(p) + '.', 'So <b>' + word + '</b> means <b>' + P[p].mean(b) + '</b>.'],
      meta: { k: 'g4-wp-meaning', word: word } });
  }
  function whichWord(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), o = R.pick(others(p)), wrong = [b, lv > 1 ? o + R.pick(P[o].bases) : p + R.pick(P[p].bases.filter(function (x) { return x !== b; }))];
    return Q.tiles('Which word means <b>' + P[p].mean(b) + '</b>?', p + b, wrong, {
      hint: 'Which prefix means ' + P[p].says + '?', explain: W.sum(parts(p, b)), meta: { k: 'g4-wp-which', mean: P[p].mean(b) } });
  }
  function matchUp() {
    var list = PRE.map(function (p) { return [p, R.pick(P[p].bases)]; });
    return { q: 'Match each word to what it means.', type: 'match', pairs: R.shuffle(list).map(function (x) { return [x[0] + x[1], P[x[0]].mean(x[1])]; }),
      hint: 'dis- means not. mis- means wrongly. pre- means before.', explain: 'Cover the prefix, read the base word, then add the meaning.', meta: { k: 'g4-wp-match' } };
  }
  function tfMeaning() {
    var p = pre(), b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].mean(b) : P[R.pick(others(p))].mean(b);
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + p + b + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['dis- means not.', 'mis- means wrongly.', 'pre- means before.'], answer: PRE.indexOf(p) },
      hint: 'Look at the prefix. What does it mean?', explain: '<b>' + p + b + '</b> means <b>' + P[p].mean(b) + '</b>.', meta: { k: 'g4-wp-tf', word: p + b, said: said } };
  }
  function build(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), o = others(p), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(o[0], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(o[1], 'prefix'), W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].mean(b) + '</b>.', type: 'build', parts: list, answer: [0, 2],
      hint: 'Prefix first, then the base word.', explain: W.sum(parts(p, b)),
      steps: ['Which prefix means <b>' + P[p].says + '</b>? <b>' + p + '</b>.', 'Put it in front of <b>' + b + '</b>.'],
      meta: { k: 'g4-wp-build', mean: P[p].mean(b) } };
  }
  function realPrefix() {
    var p = pre(), real = R.some(P[p].bases, R.int(1, 2)).map(function (b) { return p + b; }), fake = R.some(LOOKALIKE[p], Math.min(LOOKALIKE[p].length, 4 - real.length));
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, {
      hint: 'Cover the first three letters. Is a real word left?', explain: 'In <b>' + fake[0] + '</b>, cover the letters and no word is left: no prefix.', meta: { k: 'g4-wp-real', pre: p } });
  }

  /* ---------- suffixes ---------- */
  /* -able: [base, how it reads after "can be"] */
  var ABLE = [['wash', 'washed'], ['break', 'broken'], ['fix', 'fixed'], ['fold', 'folded'], ['bend', 'bent'], ['read', 'read'], ['print', 'printed'], ['stack', 'stacked']];
  /* -ness goes on describing words, -ment on action words: both make naming words */
  var NESS = ['kind', 'dark', 'sad', 'soft', 'fair', 'loud', 'bright', 'calm'];
  var MENT = ['move', 'pay', 'enjoy', 'agree', 'amaze', 'place', 'treat', 'state'];
  function able(lv) {
    var a = R.pick(ABLE), word = a[0] + 'able';
    return Q.one('What does <b>' + word + '</b> mean?', 'can be ' + a[1], ['cannot be ' + a[1], a[0] + ' again', 'was ' + a[1] + ' before'].slice(0, lv > 1 ? 3 : 2), {
      fig: lv > 1 ? W.tile(word) : W.sum([[a[0], 'base'], ['able', 'suffix']]), prompt: '<b>-able</b> sounds like the word <b>able</b>.', hint: '-able means can be.',
      explain: W.sum([[a[0], 'base'], ['able', 'suffix']]) + ' <b>can be ' + a[1] + '</b>', meta: { k: 'g4-able', word: word } });
  }
  function ableWhich() {
    var a = R.pick(ABLE), o = R.pick(ABLE.filter(function (x) { return x !== a; }));
    return Q.tiles('Which word means <b>can be ' + a[1] + '</b>?', a[0] + 'able', [a[0] + 'ing', o[0] + 'able', a[0] + 'er'], {
      hint: 'Look for the base word and -able.', explain: W.sum([[a[0], 'base'], ['able', 'suffix']]), meta: { k: 'g4-able-which', mean: 'can be ' + a[1] } });
  }
  function nessMent(lv) {
    var ness = R.int(0, 1) === 1, b = R.pick(ness ? NESS : MENT);
    return { q: 'Which suffix turns <b>' + b + '</b> into a naming word?', fig: '<span class="wsum">' + W.tile(b, 'base') + W.tile('?', 'suffix') + '</span>', type: 'tap',
      tiles: [W.tile('ness', 'suffix'), W.tile('ment', 'suffix')], answer: ness ? 0 : 1,
      prompt: 'Is <b>' + b + '</b> a describing word or an action word?', hint: 'Describing word: -ness. Action word: -ment.',
      explain: W.sum([[b, 'base'], [ness ? 'ness' : 'ment', 'suffix']]), meta: { k: 'g4-ness-ment', base: b } };
  }
  function nessMentBuild(lv) {
    var ness = R.int(0, 1) === 1, b = R.pick(ness ? NESS : MENT), o = R.pick((ness ? MENT : NESS));
    var list = [W.tile(b, 'base'), W.tile(ness ? 'ness' : 'ment', 'suffix'), W.tile(ness ? 'ment' : 'ness', 'suffix')].concat(lv > 1 ? [W.tile('able', 'suffix'), W.tile(o, 'base')] : []);
    return { q: 'Build the naming word from <b>' + b + '</b>.', type: 'build', parts: list, answer: [0, 1], hint: 'Describing word: -ness. Action word: -ment.',
      explain: W.sum([[b, 'base'], [ness ? 'ness' : 'ment', 'suffix']]), meta: { k: 'g4-ness-build', base: b } };
  }
  function sufMatch() {
    var a = R.pick(ABLE), n = R.pick(NESS), m = R.pick(MENT);
    return { q: 'Match each word to its base word.', type: 'match', pairs: R.shuffle([[a[0] + 'able', a[0]], [n + 'ness', n], [m + 'ment', m]]),
      hint: 'Cover the suffix at the end.', explain: 'Cover the suffix: the base word is left.', meta: { k: 'g4-suf-match' } };
  }
  function sufSort() {
    var right = R.some(NESS, 2).map(function (b) { return b + 'ness'; }), wrong = R.some(MENT, 2).map(function (b) { return b + 'ment'; });
    return Q.all('Pick every word made from a <b>describing word</b>.', right, wrong, { hint: 'Cover the suffix. Is the base a describing word, like soft?', explain: '<b>-ness</b> goes on describing words.', meta: { k: 'g4-suf-sort' } });
  }

  /* ---------- word parts in a sentence: [sentence, the word, what it means, wrong meanings] ---------- */
  var CTX = [
    ['We <b>dislike</b> waiting in long lines.', 'dislike', 'not like', ['like a lot', 'like again']],
    ['Owen <b>misplaced</b> his mitts and looked everywhere.', 'misplaced', 'put in the wrong place', ['put away neatly', 'bought again']],
    ['This jacket is <b>washable</b>, so mud is no problem.', 'washable', 'can be washed', ['cannot be washed', 'washed before']],
    ['Hana showed great <b>kindness</b> to the new student.', 'kindness', 'being kind', ['not being kind', 'being kind again']],
    ['We watched a <b>preview</b> before the movie came out.', 'preview', 'a look before', ['a look again', 'a wrong look']],
    ['The fox in the story was <b>dishonest</b> and told lies.', 'dishonest', 'not honest', ['very honest', 'honest before']],
    ['Please <b>prepay</b> for the bus trip by Friday.', 'prepay', 'pay before', ['pay wrongly', 'not pay']],
    ['The <b>darkness</b> made it hard to see the trail.', 'darkness', 'being dark', ['being bright', 'dark again']],
    ['The puppy began to <b>misbehave</b> when it was bored.', 'misbehave', 'behave wrongly', ['behave well', 'behave before']],
    ['Our team reached an <b>agreement</b> about the plan.', 'agreement', 'the act of agreeing', ['not agreeing', 'agreeing wrongly']]
  ];
  var SPLIT = { dislike: ['dis', 'like'], misplaced: ['mis', 'placed'], washable: ['wash', 'able'], kindness: ['kind', 'ness'], preview: ['pre', 'view'], dishonest: ['dis', 'honest'],
    prepay: ['pre', 'pay'], darkness: ['dark', 'ness'], misbehave: ['mis', 'behave'], agreement: ['agree', 'ment'] };
  function kindOf(part) { return PRE.indexOf(part) >= 0 ? 'prefix' : ['able', 'ness', 'ment'].indexOf(part) >= 0 ? 'suffix' : 'base'; }
  function tiles(word) { return '<span class="wsum">' + SPLIT[word].map(function (x) { return W.tile(x, kindOf(x)); }).join('') + '</span>'; }
  function inContext(lv) {
    var c = R.pick(CTX);
    return Q.one('What does the word in bold mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]) + (lv > 1 ? '' : tiles(c[1])),
      prompt: 'Split the word into parts. What does each part mean?', hint: 'Find the base word. Then think about the prefix or suffix.',
      explain: tiles(c[1]) + ' means <b>' + c[2] + '</b>.', meta: { k: 'g4-ctx', word: c[1] } });
  }
  function ctxBase() {
    var c = R.pick(CTX), sp = SPLIT[c[1]], base = sp.filter(function (x) { return kindOf(x) === 'base'; })[0];
    var opts = R.shuffle(sp.concat([c[1]]));
    return Q.tiles('What is the <b>base word</b> in <b>' + c[1] + '</b>?', base, opts.filter(function (x) { return x !== base; }), { fig: W.sent(c[0]),
      hint: 'Cover the prefix or suffix. What word is left?', explain: tiles(c[1]), meta: { k: 'g4-ctx-base', word: c[1] } });
  }
  function ctxWhich() {
    var c = R.pick(CTX), o = R.some(CTX.filter(function (x) { return x !== c; }), 2);
    return Q.tiles('Which word means <b>' + c[2] + '</b>?', c[1], o.map(function (x) { return x[1]; }), { hint: 'Split each word into parts.', explain: tiles(c[1]), meta: { k: 'g4-ctx-which', mean: c[2] } });
  }
  function ctxTf() {
    var c = R.pick(CTX), right = R.int(0, 1) === 1, said = right ? c[2] : c[3][0];
    return { q: 'True or false?', fig: W.sent(c[0]) + W.sent('Here, <b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      hint: 'Split the word into parts.', explain: tiles(c[1]) + ' means <b>' + c[2] + '</b>.', meta: { k: 'g4-ctx-tf', word: c[1], said: said } };
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'prefixes', title: 'Prefixes: dis-, mis- and pre-', sub: 'A part at the front changes the meaning.',
      concepts: [
        { slug: 'dis', title: 'dis- means not', exp: ['B2.1', 'B2.2'], skill: 'prefix-meaning',
          model: [
            step(W.sum(parts('dis', 'agree')), 'Cover <b>dis</b>. Read <b>agree</b>.'),
            step(W.means('not', '<b>disagree</b> = <b>not</b> agree')),
            step(W.means('not', '<b>dishonest</b> = <b>not</b> honest'))
          ],
          guided: [function () { return meaning(1, 'dis'); }, function () { return whichWord(1, 'dis'); }],
          check: [function () { return meaning(1, 'dis'); }, function () { return build(1, 'dis'); }],
          coach: '<p>Say a sentence, then flip it: "I like peas. I <b>dis</b>like peas." Let the child make the next pair.</p>',
          mistake: '<p>Seeing a prefix in words like <b>dish</b> or <b>distant</b>. Cover "dis": if no word is left, there is no prefix.</p>' },
        { slug: 'mis', title: 'mis- means wrongly', exp: ['B2.1', 'B2.2'], skill: 'prefix-meaning',
          model: [
            step(W.sum(parts('mis', 'spell')), 'Cover <b>mis</b>. Read <b>spell</b>.'),
            step(card('mis', '<b>misspell</b> = spell <b>wrongly</b>'), 'Keep both s letters: mis + spell.'),
            step(card('mis', '<b>misread</b> = read <b>wrongly</b>'))
          ],
          guided: [function () { return meaning(1, 'mis'); }, function () { return whichWord(1, 'mis'); }],
          check: [function () { return meaning(2, 'mis'); }, function () { return build(1, 'mis'); }],
          coach: '<p>Point out spelling: the prefix and the base keep all their letters, so <b>misspell</b> has two s letters.</p>',
          mistake: '<p>Mixing up dis- and mis-. Ask: "Does it mean not, or done the wrong way?"</p>' },
        { slug: 'pre', title: 'pre- means before', exp: ['B2.1', 'B2.2'], skill: 'prefix-meaning',
          model: [
            step(W.sum(parts('pre', 'heat')), 'Cover <b>pre</b>. Read <b>heat</b>.'),
            step(card('pre', '<b>preheat</b> = heat <b>before</b>'), 'Heat the oven before the food goes in.'),
            step(card('pre', '<b>pretest</b> = a test <b>before</b>'))
          ],
          guided: [function () { return meaning(1, 'pre'); }, function () { return whichWord(1, 'pre'); }],
          check: [function () { return meaning(2, 'pre'); }, matchUp],
          coach: '<p>Find pre- words around the house: preheat on the oven, prepaid on a card, preview before a show.</p>',
          mistake: '<p>Seeing a prefix in <b>pretty</b> or <b>press</b>. Cover "pre": no word is left.</p>' }
      ]
    }, {
      id: 'suffixes', title: 'Suffixes and new words', sub: 'A part at the end changes the word.',
      concepts: [
        { slug: 'able', title: '-able means can be', exp: ['B2.1', 'B2.2'], skill: 'suffixes',
          model: [
            step(W.sum([['wash', 'base'], ['able', 'suffix']]), 'Cover <b>able</b>. Read <b>wash</b>.'),
            step(W.sent('My coat is <b>washable</b>.'), 'It <b>can be</b> washed.'),
            step(W.sum([['fold', 'base'], ['able', 'suffix']]), 'A chair that <b>can be</b> folded.')
          ],
          guided: [function () { return able(1); }, ableWhich],
          check: [function () { return able(2); }, ableWhich],
          coach: '<p>Hold up objects: "Is this cup breakable? Is this book readable?" Let the child answer with the full word.</p>',
          mistake: '<p>Reading -able as "able to do it". Washable does not mean the coat can wash; it means the coat <b>can be</b> washed.</p>' },
        { slug: 'ness-ment', title: '-ness and -ment make naming words', exp: ['B2.1'], skill: 'suffixes',
          model: [
            step(W.tile('kind', 'base'), 'A describing word.'),
            step(W.sum([['kind', 'base'], ['ness', 'suffix']]), 'Add <b>-ness</b>: now it names a thing.'),
            step(W.tile('move', 'base'), 'An action word.'),
            step(W.sum([['move', 'base'], ['ment', 'suffix']]), 'Add <b>-ment</b>.')
          ],
          key: '<p>Describing word + <b>-ness</b>. Action word + <b>-ment</b>.</p>',
          guided: [function () { return nessMent(1); }, function () { return nessMentBuild(1); }],
          check: [function () { return nessMent(1); }, function () { return nessMentBuild(2); }],
          coach: '<p>Use the "a ___" test: you can say "a kindness" and "a movement", so both are naming words.</p>',
          mistake: '<p>Writing "kindment" or "moveness". Ask first: is the base a describing word or an action word?</p>' },
        { slug: 'context', title: 'Split a new word into parts', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('Owen <b>misplaced</b> his mitts.'), 'Not sure what it means?'),
            step(tiles('misplaced'), '<b>mis</b> means wrongly. <b>placed</b> means put.'),
            step(W.sent('He put them in the wrong place.'), 'The sentence agrees.')
          ],
          key: '<p>Find the base word, add the meaning of each part, then check the sentence.</p>',
          guided: [function () { return inContext(1); }, ctxBase],
          check: [function () { return inContext(2); }, ctxWhich],
          coach: '<p>When you meet a long word in any book, ask: "Can you split it?" Draw lines between the parts on a sticky note.</p>',
          mistake: '<p>Guessing from the first letters only. Read the whole sentence again with your meaning in it: does it make sense?</p>' }
      ]
    }],
    practice: [
      { id: 'prefix-meaning', name: 'Prefixes dis-, mis- and pre-', code: 'B2.1, B2.2', gen: function (lv) { return meaning(lv); } },
      { id: 'suffixes', name: 'Suffixes -able, -ness and -ment', code: 'B2.1', gen: function (lv) { return able(lv); } },
      { id: 'context', name: 'Word parts in a sentence', code: 'B2.2', gen: inContext }
    ]
  });

  Q.shapes('word-parts', {
    'prefix-meaning': [[1, 'which-word', whichWord], [1, 'build', build], [2, 'match', matchUp], [2, 'true-false', tfMeaning], [3, 'real-prefix', realPrefix]],
    suffixes: [[1, 'ness-ment', nessMent], [1, 'build', nessMentBuild], [1, 'which-word', ableWhich], [2, 'match', sufMatch], [2, 'sort', sufSort]],
    context: [[1, 'base-word', ctxBase], [1, 'which-word', ctxWhich], [2, 'true-false', ctxTf]]
  });
})();
