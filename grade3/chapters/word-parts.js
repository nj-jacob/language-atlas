/* Grade 3: word parts. The prefixes un- (not) and re- (again), and the suffixes -ful (full of) and -less (without).
   Ontario 2023 Language, Grade 3:
   B2.3 "use developing knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell words"
   B2.4 "... use morphological knowledge to analyze and understand new words in context"
   Built to show, not tell: word-part tiles, a picture cue for each prefix, and very short sentences.
   All word lists are written for this site. Answer checks: tests/verify/grade3.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* base words that take each prefix, with the meaning it makes */
  var P = {
    un: { icon: 'not', bases: ['happy', 'kind', 'safe', 'fair', 'sure', 'tidy', 'well', 'even', 'true', 'clear'], mean: function (b) { return 'not ' + b; } },
    re: { icon: 'again', bases: ['paint', 'read', 'fill', 'build', 'write', 'tell', 'play', 'pack', 'heat', 'wash', 'visit', 'check'], mean: function (b) { return b + ' again'; } }
  };
  /* words that start with the same letters but have no prefix: cover the letters and no word is left */
  var LOOKALIKE = { un: ['uncle', 'under'], re: ['ready', 'reach', 'red', 'real'] };
  var OTHER = { un: 're', re: 'un' };

  function pre(p) { return p || R.pick(['un', 're']); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  function wrongMeanings(p, b) { return [P[OTHER[p]].mean(b), b]; }

  /* ---------- question makers (each sets meta.k for its answer check) ---------- */
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
    return { q: 'Which word means <b>' + P[p].mean(b) + '</b>?', fig: lv > 1 ? '' : W.means(P[p].icon, P[p].mean(b)), type: 'tap', tiles: tiles, answer: tiles.indexOf(p + b),
      hint: 'Which prefix means ' + P[p].icon + '?', explain: W.sum(parts(p, b)),
      meta: { k: 'g3-which-word', mean: P[p].mean(b) } };
  }
  /* match three words to what they mean */
  function matchUp() {
    var list = [['un', R.pick(P.un.bases)], ['re', R.pick(P.re.bases)]], p = pre();
    var third = R.pick(P[p].bases.filter(function (b) { return list.every(function (x) { return x[1] !== b; }); }));
    list.push([p, third]);
    return { q: 'Match each word to what it means.', type: 'match', pairs: list.map(function (x) { return [x[0] + x[1], P[x[0]].mean(x[1])]; }),
      hint: 'un- means not. re- means again.', explain: 'Cover the prefix, read the base word, then add "not" or "again".',
      meta: { k: 'g3-match' } };
  }
  /* "Refill means not fill." True or false? Then why. */
  function tfMeaning() {
    var p = pre(), b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].mean(b) : P[OTHER[p]].mean(b);
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + p + b + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['un- means not.', 're- means again.'], answer: p === 'un' ? 0 : 1 },
      hint: 'Look at the prefix. What does it mean?', explain: '<b>' + p + b + '</b> means <b>' + P[p].mean(b) + '</b>.',
      meta: { k: 'g3-tf', word: p + b, said: said } };
  }
  /* Build the word that means "paint again" from part tiles (one prefix and one base are not needed) */
  function build(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(OTHER[p], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].mean(b) + '</b>.', fig: lv > 1 ? '' : W.means(P[p].icon, P[p].mean(b)), type: 'build',
      parts: list, answer: [0, 2], hint: 'Prefix first, then the base word.', explain: W.sum(parts(p, b)),
      steps: ['Which prefix means <b>' + P[p].icon + '</b>? <b>' + p + '</b>.', 'Put it in front of <b>' + b + '</b>.'],
      meta: { k: 'g3-build', mean: P[p].mean(b) } };
  }
  /* Which prefix makes "not tidy"? */
  function addPrefix(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), tiles = [W.tile('un', 'prefix'), W.tile('re', 'prefix')];
    return { q: 'Which prefix makes a word that means <b>' + P[p].mean(b) + '</b>?', fig: '<span class="wsum">' + W.tile('?', 'prefix') + W.tile(b, 'base') + '</span>', type: 'tap', tiles: tiles, answer: p === 'un' ? 0 : 1,
      prompt: 'Does it mean <b>not</b>, or <b>again</b>?', hint: 'un- means not. re- means again.', explain: W.sum(parts(p, b)),
      meta: { k: 'g3-add', mean: P[p].mean(b) } };
  }
  /* Which is the base word of unkind? */
  function baseWord() {
    var p = pre(), b = R.pick(P[p].bases), tiles = R.shuffle([b, p, p + b]);
    return { q: 'What is the <b>base word</b> in <b>' + p + b + '</b>?', type: 'tap', tiles: tiles, answer: tiles.indexOf(b),
      hint: 'Cover the prefix. What word is left?', explain: W.sum(parts(p, b)),
      meta: { k: 'g3-base', word: p + b } };
  }
  /* Pick every word with the prefix: some words only look like they have one */
  function realPrefix() {
    var p = pre(), real = R.some(P[p].bases, R.int(1, 2)).map(function (b) { return p + b; }), fake = R.some(LOOKALIKE[p], 4 - real.length);
    var options = R.shuffle(real.concat(fake));
    return { q: 'Pick every word that has the prefix <b>' + p + '-</b>.', type: 'pick', options: options,
      answer: options.map(function (w, i) { return real.indexOf(w) >= 0 ? i : -1; }).filter(function (i) { return i >= 0; }),
      hint: 'Cover the first two letters. Is a real word left?', explain: 'Words like <b>' + fake[0] + '</b> start with the same letters, but there is no prefix: cover them and no word is left.',
      meta: { k: 'g3-real', pre: p } };
  }

  /* ---------- suffixes ---------- */
  var S = {
    ful: { icon: 'full', bases: ['help', 'care', 'hope', 'use', 'thank', 'pain', 'fear', 'rest', 'joy', 'cheer'], mean: function (b) { return 'full of ' + b; } },
    less: { icon: 'without', bases: ['help', 'care', 'hope', 'use', 'pain', 'fear', 'rest', 'home', 'sleep', 'harm'], mean: function (b) { return 'without ' + b; } }
  };
  var SOTHER = { ful: 'less', less: 'ful' };
  function suf(s) { return s || R.pick(['ful', 'less']); }
  function sparts(s, b) { return [[b, 'base'], [s, 'suffix']]; }
  /* both suffixes fit these bases, so the suffix alone decides the meaning */
  var BOTH = S.ful.bases.filter(function (b) { return S.less.bases.indexOf(b) >= 0; });
  /* What does careless mean? */
  function sufMeaning(lv, s0) {
    var s = suf(s0), b = R.pick(lv > 1 ? BOTH : S[s].bases), wrong = [S[SOTHER[s]].mean(b), b + ' again'];
    return Q.one('What does <b>' + b + s + '</b> mean?', S[s].mean(b), wrong.slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? W.tile(b + s) : W.sum(sparts(s, b)), prompt: 'Look at the end. Is it <b>-ful</b> or <b>-less</b>?', hint: '-ful means full of. -less means without.',
      explain: W.means(S[s].icon, '<b>-' + s + '</b> means <b>' + (s === 'ful' ? 'full of' : 'without') + '</b>'),
      steps: ['Cover <b>' + s + '</b>. The base word is <b>' + b + '</b>.', '<b>-' + s + '</b> means <b>' + (s === 'ful' ? 'full of' : 'without') + '</b>.', 'So <b>' + b + s + '</b> means <b>' + S[s].mean(b) + '</b>.'],
      meta: { k: 'g3-suf-meaning', word: b + s } });
  }
  /* Which word means "without fear"? */
  function sufWhich(lv, s0) {
    var s = suf(s0), b = R.pick(BOTH);
    return Q.tiles('Which word means <b>' + S[s].mean(b) + '</b>?', b + s, [b + SOTHER[s], b], { fig: lv > 1 ? '' : W.means(S[s].icon, S[s].mean(b)), hint: 'Which suffix means ' + (s === 'ful' ? 'full of' : 'without') + '?',
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
  function sufTf() {
    var s = suf(), b = R.pick(BOTH), right = R.int(0, 1) === 1, said = right ? S[s].mean(b) : S[SOTHER[s]].mean(b);
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + b + s + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['-ful means full of.', '-less means without.'], answer: s === 'ful' ? 0 : 1 },
      hint: 'Look at the suffix at the end.', explain: '<b>' + b + s + '</b> means <b>' + S[s].mean(b) + '</b>.', meta: { k: 'g3-suf-tf', word: b + s, said: said } };
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'un-re', title: 'Prefixes: un- and re-', sub: 'A small part at the front changes the meaning.',
      concepts: [
        { slug: 'un', title: 'un- means not', exp: ['B2.3', 'B2.4'], skill: 'prefix-meaning',
          model: [
            step(W.tile('happy', 'base'), 'This is a <b>base word</b>.'),
            step(W.tile('un', 'prefix'), 'This is a <b>prefix</b>. It goes at the front.'),
            step(W.sum(parts('un', 'happy')), 'Put them together.'),
            step(W.means('not', '<b>unhappy</b> = <b>not</b> happy'), '<b>un-</b> means <b>not</b>.')
          ],
          key: W.means('not', '<b>un-</b> means <b>not</b>'),
          guided: [function () { return meaning(1, 'un'); }, function () { return whichWord(1, 'un'); }],
          check: [function () { return meaning(1, 'un'); }, function () { return whichWord(1, 'un'); }],
          coach: '<p>Have the child cover the prefix with a finger, read the base word, then say "not" in front of it. Keep it quick and keep it oral.</p>',
          mistake: '<p>Seeing a prefix in words like <b>under</b> or <b>uncle</b>. Cover the "un": if no word is left, there is no prefix. On action words, un- means "undo" (unlock, untie); these lessons use describing words only.</p>' },
        { slug: 're', title: 're- means again', exp: ['B2.3', 'B2.4'], skill: 'prefix-meaning',
          model: [
            step(W.tile('paint', 'base'), 'A <b>base word</b>.'),
            step(W.sum(parts('re', 'paint')), 'Add the prefix <b>re</b> at the front.'),
            step(W.means('again', '<b>repaint</b> = paint <b>again</b>'), '<b>re-</b> means <b>again</b>.')
          ],
          key: W.means('again', '<b>re-</b> means <b>again</b>'),
          guided: [function () { return meaning(1, 're'); }, function () { return whichWord(1, 're'); }],
          check: [function () { return meaning(1, 're'); }, function () { return whichWord(1, 're'); }],
          coach: '<p>Act it out: "I fill the cup. Now I <b>refill</b> it." Ask the child to tell you something they would like to <b>redo</b>.</p>',
          mistake: '<p>Seeing a prefix in words like <b>ready</b>, <b>reach</b> or <b>red</b>. Cover the "re": if no word is left, there is no prefix.</p>' },
        { slug: 'which', title: 'un- or re-?', exp: ['B2.3', 'B2.4'], skill: 'prefix-build',
          model: [
            step(W.means('not', 'not safe'), 'This means <b>not</b>.'),
            step(W.sum(parts('un', 'safe')), 'So I use <b>un</b>.'),
            step(W.means('again', 'read again'), 'This means <b>again</b>.'),
            step(W.sum(parts('re', 'read')), 'So I use <b>re</b>.')
          ],
          key: W.means('not', '<b>un-</b> = not') + ' ' + W.means('again', '<b>re-</b> = again'),
          guided: [addPrefix, function () { return build(1); }],
          check: [addPrefix, function () { return build(1); }],
          coach: '<p>Before choosing, ask: "Does it mean not, or again?" Wait for the answer, then let the child tap.</p>',
          mistake: '<p>Putting the prefix at the end (happyun). Point to the boxes: the prefix always goes in the first box.</p>' }
      ]
    }, {
      id: 'ful-less', title: 'Suffixes: -ful and -less', sub: 'A small part at the end changes the meaning.',
      concepts: [
        { slug: 'ful', title: '-ful means full of', exp: ['B2.3', 'B2.4'], skill: 'suffixes',
          model: [
            step(W.tile('help', 'base'), 'A base word.'),
            step(W.tile('ful', 'suffix'), 'A <b>suffix</b>. It goes at the end.'),
            step(W.sum(sparts('ful', 'help')), 'Put them together.'),
            step(W.means('full', '<b>helpful</b> = full of help'), '<b>-ful</b> means <b>full of</b>.')
          ],
          key: W.means('full', '<b>-ful</b> means <b>full of</b>'),
          guided: [function () { return sufMeaning(1, 'ful'); }, function () { return sufWhich(1, 'ful'); }],
          check: [function () { return sufMeaning(1, 'ful'); }, function () { return sufBuild(1, 'ful'); }],
          coach: '<p>Fill a cup with water as you say "full of". Ask: "What is something that is full of joy?"</p>',
          mistake: '<p>Spelling it "full". As a suffix it has only one l: help<b>ful</b>.</p>' },
        { slug: 'less', title: '-less means without', exp: ['B2.3', 'B2.4'], skill: 'suffixes',
          model: [
            step(W.tile('care', 'base'), 'A base word.'),
            step(W.sum(sparts('less', 'care')), 'Add the suffix <b>less</b> at the end.'),
            step(W.means('without', '<b>careless</b> = without care'), '<b>-less</b> means <b>without</b>.')
          ],
          key: W.means('without', '<b>-less</b> means <b>without</b>'),
          guided: [function () { return sufMeaning(1, 'less'); }, function () { return sufWhich(1, 'less'); }],
          check: [function () { return sufMeaning(2, 'less'); }, function () { return sufBuild(1, 'less'); }],
          coach: '<p>Pour the cup out: "without". Pair the words: hopeful and hopeless, careful and careless.</p>',
          mistake: '<p>Mixing up the two. Ask: "Is there some, or none?"</p>' }
      ]
    }],
    practice: [
      { id: 'prefix-meaning', name: 'What prefixes mean', code: 'B2.4', gen: function (lv) { return meaning(lv); } },
      { id: 'prefix-build', name: 'Build words with prefixes', code: 'B2.3', gen: function (lv) { return build(lv); } },
      { id: 'suffixes', name: 'Suffixes -ful and -less', code: 'B2.3, B2.4', gen: function (lv) { return sufMeaning(lv); } }
    ]
  });

  Q.shapes('word-parts', {
    'prefix-meaning': [[1, 'which-word', whichWord], [2, 'match', matchUp], [2, 'true-false', tfMeaning]],
    'prefix-build': [[1, 'add-prefix', addPrefix], [1, 'base-word', baseWord], [2, 'real-prefix', realPrefix]],
    suffixes: [[1, 'which-word', sufWhich], [1, 'build', sufBuild], [2, 'match', sufMatch], [2, 'true-false', sufTf]]
  });
})();
