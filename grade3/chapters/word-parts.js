/* Grade 3: word parts. The prefixes un- (not) and re- (again), and the suffixes -ful (full of) and -less (without).
   A full chapter: every idea has two worked examples, three questions together and five on your own, and its own practice
   skill asked in four or more ways.
   Ontario 2023 Language, Grade 3:
   B2.3 "use developing knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell words"
   B2.4 "... use morphological knowledge to analyze and understand new words in context"
   Built to show, not tell: word-part tiles, a picture cue for each part, and very short sentences.
   All word lists are written for this site. Answer checks: tests/verify/grade3-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* base words that take each prefix, with the meaning it makes (un- here goes on describing words only) */
  var P = {
    un: { icon: 'not', bases: ['happy', 'kind', 'safe', 'fair', 'sure', 'tidy', 'well', 'even', 'true', 'clear', 'lucky', 'healthy', 'wise', 'real', 'usual', 'finished', 'broken', 'afraid'],
      mean: function (b) { return 'not ' + b; }, say: function (b, w) { return [Q.name() + ' was not ' + b + '.', Q.name() + ' was ' + w + '.']; } },
    re: { icon: 'again', bases: ['paint', 'read', 'fill', 'build', 'write', 'tell', 'play', 'pack', 'heat', 'wash', 'visit', 'check', 'count', 'use', 'open', 'plant', 'start', 'name', 'join', 'load', 'try', 'set'],
      mean: function (b) { return b + ' again'; }, say: function (b, w) { return ['We will ' + b + ' it again.', 'We will ' + w + ' it.']; } }
  };
  /* words that start with the same letters but have no prefix: cover the letters and no word is left */
  var LOOKALIKE = { un: ['uncle', 'under', 'uniform', 'unicorn', 'union'], re: ['ready', 'reach', 'red', 'real', 'rest', 'recess'] };
  var OTHER = { un: 're', re: 'un' };

  function pre(p) { return p || R.pick(['un', 're']); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  function wrongMeanings(p, b) { return [P[OTHER[p]].mean(b), b]; }
  function cue(p, b) { return W.means(P[p].icon, P[p].mean(b)); }

  /* ---------- prefixes ---------- */
  /* What does unhappy mean? Level 1 shows the parts; later levels show only the word. */
  function meaning(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), word = p + b, o = R.mc(P[p].mean(b), wrongMeanings(p, b).slice(0, lv > 1 ? 2 : 1));
    return { q: 'What does <b>' + word + '</b> mean?', fig: lv > 1 ? W.tile(word) : W.sum(parts(p, b)), type: 'mc', options: o.options, answer: o.answer,
      prompt: 'Cover <b>' + p + '</b>. What word is left?', hint: 'Cover the prefix. Read the base word.',
      explain: W.means(P[p].icon, '<b>' + p + '-</b> means <b>' + P[p].icon + '</b>'),
      steps: ['Cover <b>' + p + '</b>. The base word is <b>' + b + '</b>.', '<b>' + p + '-</b> means <b>' + P[p].icon + '</b>.', 'So <b>' + word + '</b> means <b>' + P[p].mean(b) + '</b>.'],
      meta: { k: 'g3-meaning', word: word } };
  }
  /* Which word means "not kind"? */
  function whichWord(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), other = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var tiles = R.shuffle([p + b, b, lv > 1 ? OTHER[p] + R.pick(P[OTHER[p]].bases) : p + other]);
    return { q: 'Which word means <b>' + P[p].mean(b) + '</b>?', fig: lv > 1 ? '' : cue(p, b), type: 'tap', tiles: tiles, answer: tiles.indexOf(p + b),
      hint: 'Which prefix means ' + P[p].icon + '?', explain: W.sum(parts(p, b)), meta: { k: 'g3-which-word', mean: P[p].mean(b) } };
  }
  /* "Refill means not fill." True or false? Then why. */
  function tfMeaning(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].mean(b) : P[OTHER[p]].mean(b);
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + p + b + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['un- means not.', 're- means again.'], answer: p === 'un' ? 0 : 1 },
      hint: 'Look at the prefix. What does it mean?', explain: '<b>' + p + b + '</b> means <b>' + P[p].mean(b) + '</b>.', meta: { k: 'g3-tf', word: p + b, said: said } };
  }
  /* Which is the base word of unkind? */
  function baseWord(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), tiles = R.shuffle([b, p, p + b]);
    return { q: 'What is the <b>base word</b> in <b>' + p + b + '</b>?', type: 'tap', tiles: tiles, answer: tiles.indexOf(b),
      hint: 'Cover the prefix. What word is left?', explain: W.sum(parts(p, b)), meta: { k: 'g3-base', word: p + b } };
  }
  /* Pick every word with the prefix: some words only look like they have one */
  function realPrefix(lv, p0) {
    var p = pre(p0), real = R.some(P[p].bases, R.int(1, 2)).map(function (b) { return p + b; }), fake = R.some(LOOKALIKE[p], 4 - real.length);
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, { hint: 'Cover the first two letters. Is a real word left?',
      explain: 'Words like <b>' + fake[0] + '</b> start with the same letters, but there is no prefix: cover them and no word is left.', meta: { k: 'g3-real', pre: p } });
  }
  /* finish the sentence: "Ava was not lucky. Ava was ___." */
  function inSentence(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), s = P[p].say(b, W.gap());
    return Q.tiles('Which word fills the gap?', p + b, [b, OTHER[p] + b].concat(lv > 1 ? [p + R.pick(P[p].bases.filter(function (x) { return x !== b; }))] : []), {
      fig: W.sent(s[0]) + W.sent(s[1]), hint: 'The first sentence tells you what it means.', explain: W.sum(parts(p, b)), meta: { k: 'g3-prefix-gap', mean: P[p].mean(b) } });
  }
  /* Build the word that means "paint again" from part tiles */
  function build(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(OTHER[p], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].mean(b) + '</b>.', fig: lv > 1 ? '' : cue(p, b), type: 'build',
      parts: list, answer: [0, 2], hint: 'Prefix first, then the base word.', explain: W.sum(parts(p, b)),
      steps: ['Which prefix means <b>' + P[p].icon + '</b>? <b>' + p + '</b>.', 'Put it in front of <b>' + b + '</b>.'], meta: { k: 'g3-build', mean: P[p].mean(b) } };
  }
  /* Which prefix makes "not tidy"? */
  function addPrefix(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), tiles = [W.tile('un', 'prefix'), W.tile('re', 'prefix')];
    return { q: 'Which prefix makes a word that means <b>' + P[p].mean(b) + '</b>?', fig: '<span class="wsum">' + W.tile('?', 'prefix') + W.tile(b, 'base') + '</span>', type: 'tap', tiles: tiles, answer: p === 'un' ? 0 : 1,
      prompt: 'Does it mean <b>not</b>, or <b>again</b>?', hint: 'un- means not. re- means again.', explain: W.sum(parts(p, b)), meta: { k: 'g3-add', mean: P[p].mean(b) } };
  }
  /* match words with both prefixes to what they mean */
  function matchUp() {
    var list = [['un', R.pick(P.un.bases)], ['re', R.pick(P.re.bases)]], p = pre();
    list.push([p, R.pick(P[p].bases.filter(function (b) { return list.every(function (x) { return x[1] !== b; }); }))]);
    return { q: 'Match each word to what it means.', type: 'match', pairs: list.map(function (x) { return [x[0] + x[1], P[x[0]].mean(x[1])]; }),
      hint: 'un- means not. re- means again.', explain: 'Cover the prefix, read the base word, then add "not" or "again".', meta: { k: 'g3-match' } };
  }
  /* pick every word that means "again" (or "not") from a mix */
  function sortPrefix(lv) {
    var p = pre(), right = R.some(P[p].bases, 2).map(function (b) { return p + b; }), wrong = R.some(P[OTHER[p]].bases, lv > 1 ? 3 : 2).map(function (b) { return OTHER[p] + b; });
    return Q.all('Pick every word that means <b>' + P[p].icon + '</b>.', right, wrong, { fig: W.icon(P[p].icon), hint: 'Look at the prefix at the front.',
      explain: W.means(P[p].icon, '<b>' + p + '-</b> means <b>' + P[p].icon + '</b>'), meta: { k: 'g3-sort-prefix', mean: P[p].icon } });
  }

  /* ---------- suffixes ---------- */
  var S = {
    ful: { icon: 'full', bases: ['help', 'care', 'hope', 'use', 'thank', 'pain', 'fear', 'rest', 'joy', 'cheer', 'colour', 'power', 'play', 'peace', 'wonder', 'harm', 'truth', 'thought'],
      mean: function (b) { return 'full of ' + b; } },
    less: { icon: 'without', bases: ['help', 'care', 'hope', 'use', 'pain', 'fear', 'rest', 'home', 'sleep', 'harm', 'end', 'spot', 'power', 'colour', 'thought', 'wire', 'cloud', 'speech'],
      mean: function (b) { return 'without ' + b; } }
  };
  var SOTHER = { ful: 'less', less: 'ful' };
  function suf(s) { return s || R.pick(['ful', 'less']); }
  function sparts(s, b) { return [[b, 'base'], [s, 'suffix']]; }
  function sufMeans(s) { return s === 'ful' ? 'full of' : 'without'; }
  /* both suffixes fit these bases, so the suffix alone decides the meaning */
  var BOTH = S.ful.bases.filter(function (b) { return S.less.bases.indexOf(b) >= 0; });
  function bases(s, lv) { return lv > 1 ? BOTH : S[s].bases; }
  /* What does careless mean? */
  function sufMeaning(lv, s0) {
    var s = suf(s0), b = R.pick(bases(s, lv)), wrong = [S[SOTHER[s]].mean(b), b + ' again'].filter(function (x, i) { return i > 0 || BOTH.indexOf(b) >= 0; });
    return Q.one('What does <b>' + b + s + '</b> mean?', S[s].mean(b), wrong.slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? W.tile(b + s) : W.sum(sparts(s, b)), prompt: 'Look at the end. Is it <b>‑ful</b> or <b>‑less</b>?', hint: '-ful means full of. -less means without.',
      explain: W.means(S[s].icon, '<b>-' + s + '</b> means <b>' + sufMeans(s) + '</b>'),
      steps: ['Cover <b>' + s + '</b>. The base word is <b>' + b + '</b>.', '<b>-' + s + '</b> means <b>' + sufMeans(s) + '</b>.', 'So <b>' + b + s + '</b> means <b>' + S[s].mean(b) + '</b>.'],
      meta: { k: 'g3-suf-meaning', word: b + s } });
  }
  /* Which word means "without fear"? */
  function sufWhich(lv, s0) {
    var s = suf(s0), b = R.pick(BOTH);
    return Q.tiles('Which word means <b>' + S[s].mean(b) + '</b>?', b + s, [b + SOTHER[s], b], { fig: lv > 1 ? '' : W.means(S[s].icon, S[s].mean(b)), hint: 'Which suffix means ' + sufMeans(s) + '?',
      explain: W.sum(sparts(s, b)), meta: { k: 'g3-suf-which', mean: S[s].mean(b) } });
  }
  /* build "full of hope" */
  function sufBuild(lv, s0) {
    var s = suf(s0), b = R.pick(BOTH), extra = R.pick(BOTH.filter(function (x) { return x !== b; }));
    var list = [W.tile(b, 'base'), W.tile(s, 'suffix'), W.tile(SOTHER[s], 'suffix')].concat(lv > 1 ? [W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + S[s].mean(b) + '</b>.', fig: lv > 1 ? '' : W.means(S[s].icon, S[s].mean(b)), type: 'build', parts: list, answer: [0, 1],
      hint: 'Base word first, then the suffix.', explain: W.sum(sparts(s, b)), meta: { k: 'g3-suf-build', mean: S[s].mean(b) } };
  }
  function sufMatch() {
    var bs = R.some(BOTH, 2), list = [[bs[0], 'ful'], [bs[0], 'less'], [bs[1], R.pick(['ful', 'less'])]];
    return { q: 'Match each word to what it means.', type: 'match', pairs: R.shuffle(list).map(function (x) { return [x[0] + x[1], S[x[1]].mean(x[0])]; }),
      hint: '-ful means full of. -less means without.', explain: 'Look at the end of each word.', meta: { k: 'g3-suf-match' } };
  }
  function sufTf(lv, s0) {
    var s = suf(s0), b = R.pick(BOTH), right = R.int(0, 1) === 1, said = right ? S[s].mean(b) : S[SOTHER[s]].mean(b);
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + b + s + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['-ful means full of.', '-less means without.'], answer: s === 'ful' ? 0 : 1 },
      hint: 'Look at the suffix at the end.', explain: '<b>' + b + s + '</b> means <b>' + S[s].mean(b) + '</b>.', meta: { k: 'g3-suf-tf', word: b + s, said: said } };
  }
  /* finish the sentence: "The night was without sleep. It was ___." */
  function sufSentence(lv, s0) {
    var s = suf(s0), b = R.pick(BOTH), thing = R.pick(['The day', 'The trip', 'The puppy', 'The plan', 'The room', 'The night']);
    return Q.tiles('Which word fills the gap?', b + s, [b + SOTHER[s]].concat(lv > 1 ? [b] : []), {
      fig: W.sent(thing + ' was ' + S[s].mean(b) + '.') + W.sent('It was ' + W.gap() + '.'), hint: 'The first sentence tells you what it means.',
      explain: W.sum(sparts(s, b)), meta: { k: 'g3-suf-gap', mean: S[s].mean(b) } });
  }
  /* pick every word with the suffix that means "without" (or "full of") */
  function sufSort(lv, s0) {
    var s = suf(s0), right = R.some(S[s].bases, 2).map(function (b) { return b + s; }), wrong = R.some(S[SOTHER[s]].bases.filter(function (b) { return right.indexOf(b + s) < 0; }), lv > 1 ? 3 : 2).map(function (b) { return b + SOTHER[s]; });
    return Q.all('Pick every word that means <b>' + sufMeans(s) + '</b> something.', right, wrong, { fig: W.icon(S[s].icon), hint: 'Look at the end of each word.',
      explain: W.means(S[s].icon, '<b>-' + s + '</b> means <b>' + sufMeans(s) + '</b>'), meta: { k: 'g3-suf-sort', s: s } });
  }

  function only(f, x) { return function (lv) { return f(lv, x); }; }
  Atlas.register('word-parts', {
    full: true,
    lessons: [{
      id: 'un-re', title: 'Prefixes: un- and re-', sub: 'A small part at the front changes the meaning.',
      concepts: [
        { slug: 'un', title: 'un- means not', exp: ['B2.3', 'B2.4'], skill: 'un',
          model: [
            step(W.tile('happy', 'base'), 'A <b>base word</b>.'),
            step(W.sum(parts('un', 'happy')), 'A <b>prefix</b> goes at the front.'),
            step(W.means('not', '<b>unhappy</b> = <b>not</b> happy')),
            step(W.tile('safe', 'base'), 'Another one.'),
            step(W.sum(parts('un', 'safe'))),
            step(W.means('not', '<b>unsafe</b> = <b>not</b> safe'))
          ],
          guided: [function () { return meaning(1, 'un'); }, function () { return whichWord(1, 'un'); }, function () { return baseWord(1, 'un'); }],
          check: [function () { return meaning(2, 'un'); }, function () { return inSentence(2, 'un'); }, function () { return tfMeaning(2, 'un'); }, function () { return realPrefix(2, 'un'); }, function () { return whichWord(3, 'un'); }],
          coach: '<p>Have the child cover the prefix with a finger, read the base word, then say "not" in front of it. Keep it quick and keep it oral.</p>',
          mistake: '<p>Seeing a prefix in words like <b>under</b> or <b>uncle</b>. Cover the "un": if no word is left, there is no prefix. On action words, un- means "undo" (unlock, untie); these lessons use describing words only.</p>' },
        { slug: 're', title: 're- means again', exp: ['B2.3', 'B2.4'], skill: 're',
          model: [
            step(W.tile('paint', 'base'), 'An action word.'),
            step(W.sum(parts('re', 'paint')), 'Put <b>re</b> in front.'),
            step(W.means('again', '<b>repaint</b> = paint <b>again</b>')),
            step(W.tile('fill', 'base'), 'Another one.'),
            step(W.sum(parts('re', 'fill'))),
            step(W.means('again', '<b>refill</b> = fill <b>again</b>'))
          ],
          guided: [function () { return meaning(1, 're'); }, function () { return whichWord(1, 're'); }, function () { return baseWord(1, 're'); }],
          check: [function () { return meaning(2, 're'); }, function () { return inSentence(2, 're'); }, function () { return tfMeaning(2, 're'); }, function () { return realPrefix(2, 're'); }, function () { return whichWord(3, 're'); }],
          coach: '<p>Act it out: "I fill the cup. Now I <b>refill</b> it." Ask the child to tell you something they would like to <b>redo</b>.</p>',
          mistake: '<p>Seeing a prefix in words like <b>ready</b>, <b>reach</b> or <b>red</b>. Cover the "re": if no word is left, there is no prefix.</p>' },
        { slug: 'which', title: 'un- or re-?', exp: ['B2.3', 'B2.4'], skill: 'prefix-build',
          model: [
            step(W.means('not', 'not safe'), '<b>Not</b>? Use <b>un</b>.'),
            step(W.sum(parts('un', 'safe'))),
            step(W.means('again', 'read again'), '<b>Again</b>? Use <b>re</b>.'),
            step(W.sum(parts('re', 'read')))
          ],
          guided: [addPrefix, function () { return build(1); }, matchUp],
          check: [addPrefix, function () { return build(2); }, function () { return sortPrefix(2); }, matchUp, function () { return inSentence(3); }],
          coach: '<p>Before choosing, ask: "Does it mean not, or again?" Wait for the answer, then let the child tap.</p>',
          mistake: '<p>Putting the prefix at the end (happyun). Point to the boxes: the prefix always goes in the first box.</p>' }
      ]
    }, {
      id: 'ful-less', title: 'Suffixes: -ful and -less', sub: 'A small part at the end changes the meaning.',
      concepts: [
        { slug: 'ful', title: '-ful means full of', exp: ['B2.3', 'B2.4'], skill: 'ful',
          model: [
            step(W.tile('ful', 'suffix'), 'A <b>suffix</b> goes at the end.'),
            step(W.sum(sparts('ful', 'help')), 'Cover <b>ful</b>. Read <b>help</b>.'),
            step(W.means('full', '<b>helpful</b> = full of help')),
            step(W.sum(sparts('ful', 'joy')), 'Another one.'),
            step(W.means('full', '<b>joyful</b> = full of joy'))
          ],
          guided: [function () { return sufMeaning(1, 'ful'); }, function () { return sufWhich(1, 'ful'); }, function () { return sufBuild(1, 'ful'); }],
          check: [function () { return sufMeaning(2, 'ful'); }, function () { return sufSentence(2, 'ful'); }, function () { return sufTf(2, 'ful'); }, function () { return sufSort(2, 'ful'); }, function () { return sufBuild(3, 'ful'); }],
          coach: '<p>Fill a cup with water as you say "full of". Ask: "What is something that is full of joy?"</p>',
          mistake: '<p>Spelling it "full". As a suffix it has only one l: help<b>ful</b>.</p>' },
        { slug: 'less', title: '-less means without', exp: ['B2.3', 'B2.4'], skill: 'less',
          model: [
            step(W.sum(sparts('less', 'care')), 'Cover <b>less</b>. Read <b>care</b>.'),
            step(W.means('without', '<b>careless</b> = without care')),
            step(W.sum(sparts('less', 'sleep')), 'Another one.'),
            step(W.means('without', '<b>sleepless</b> = without sleep')),
            step(W.tile('hopeful') + W.tile('hopeless'), 'Same base, opposite meanings.')
          ],
          guided: [function () { return sufMeaning(1, 'less'); }, function () { return sufWhich(1, 'less'); }, function () { return sufBuild(1, 'less'); }],
          check: [function () { return sufMeaning(2, 'less'); }, function () { return sufSentence(2, 'less'); }, function () { return sufTf(2, 'less'); }, sufMatch, function () { return sufSort(3, 'less'); }],
          coach: '<p>Pour the cup out: "without". Pair the words: hopeful and hopeless, careful and careless.</p>',
          mistake: '<p>Mixing up the two. Ask: "Is there some, or none?"</p>' }
      ]
    }],
    practice: [
      { id: 'un', name: 'un- means not', code: 'B2.4', gen: only(meaning, 'un') },
      { id: 're', name: 're- means again', code: 'B2.4', gen: only(meaning, 're') },
      { id: 'prefix-build', name: 'Build words with prefixes', code: 'B2.3', gen: build },
      { id: 'ful', name: '-ful means full of', code: 'B2.3, B2.4', gen: only(sufMeaning, 'ful') },
      { id: 'less', name: '-less means without', code: 'B2.3, B2.4', gen: only(sufMeaning, 'less') }
    ]
  });

  Q.shapes('word-parts', {
    un: [[1, 'which-word', only(whichWord, 'un')], [1, 'base-word', only(baseWord, 'un')], [2, 'true-false', only(tfMeaning, 'un')], [2, 'sentence', only(inSentence, 'un')], [2, 'real-prefix', only(realPrefix, 'un')]],
    re: [[1, 'which-word', only(whichWord, 're')], [1, 'base-word', only(baseWord, 're')], [2, 'true-false', only(tfMeaning, 're')], [2, 'sentence', only(inSentence, 're')], [2, 'real-prefix', only(realPrefix, 're')]],
    'prefix-build': [[1, 'add-prefix', addPrefix], [1, 'match', matchUp], [2, 'sort', sortPrefix], [2, 'sentence', inSentence]],
    ful: [[1, 'which-word', only(sufWhich, 'ful')], [1, 'build', only(sufBuild, 'ful')], [2, 'true-false', only(sufTf, 'ful')], [2, 'sentence', only(sufSentence, 'ful')], [2, 'sort', only(sufSort, 'ful')]],
    less: [[1, 'which-word', only(sufWhich, 'less')], [1, 'build', only(sufBuild, 'less')], [2, 'match', sufMatch], [2, 'sentence', only(sufSentence, 'less')], [2, 'sort', only(sufSort, 'less')]]
  });
})();
