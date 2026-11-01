/* Grade 6: roots and spelling. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 6:
   B2.1 "use generalized knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell
   complex words with accuracy and automaticity"
   Latin and Greek roots, prefixes, and the spelling rules for adding suffixes (drop e, y to i, double the last letter, -able or -ible).
   All word lists are written for this site. Answer checks: tests/verify/grade6-word-study.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- roots: root -> [meaning, words that hold it] ---------- */
  var ROOTS = {
    port: ['carry', ['transport', 'portable', 'export', 'import', 'airport']],
    spect: ['look', ['inspect', 'spectator', 'respect', 'spectacles']],
    dict: ['say', ['predict', 'dictionary', 'contradict', 'verdict']],
    struct: ['build', ['construct', 'structure', 'instruct', 'destruction']],
    rupt: ['break', ['erupt', 'interrupt', 'rupture', 'disrupt']],
    aud: ['hear', ['audio', 'audience', 'audible', 'audition']],
    vis: ['see', ['visible', 'vision', 'visual', 'invisible']],
    aqua: ['water', ['aquarium', 'aquatic', 'aquamarine', 'aquaculture']],
    tract: ['pull', ['tractor', 'attract', 'subtract', 'distract']],
    ject: ['throw', ['eject', 'project', 'reject', 'inject']],
    graph: ['write', ['autograph', 'paragraph', 'graphic', 'calligraphy']],
    bio: ['life', ['biology', 'biome', 'biodegradable', 'biologist']],
    therm: ['heat', ['thermal', 'thermos', 'thermometer', 'thermostat']],
    phon: ['sound', ['phonics', 'symphony', 'telephone', 'saxophone']],
    geo: ['earth', ['geology', 'geode', 'geologist', 'geoscience']],
    chron: ['time', ['chronic', 'chronology', 'synchronize', 'chronicle']],
    micro: ['small', ['microscope', 'microwave', 'microchip', 'microbe']],
    hydr: ['water', ['hydrant', 'dehydrate', 'hydroelectric', 'hydrogen']]
  };
  var LATIN = ['port', 'spect', 'dict', 'struct', 'rupt', 'aud', 'vis', 'aqua', 'tract', 'ject'], GREEK = ['graph', 'bio', 'therm', 'phon', 'geo', 'chron', 'micro', 'hydr'];
  var RK = Object.keys(ROOTS);
  /* words split into their parts: [word, [part, kind], ...] */
  var PARTS = [['transport', ['trans', 'prefix'], ['port', 'base']], ['inspector', ['in', 'prefix'], ['spect', 'base'], ['or', 'suffix']], ['predict', ['pre', 'prefix'], ['dict', 'base']],
    ['construct', ['con', 'prefix'], ['struct', 'base']], ['interrupt', ['inter', 'prefix'], ['rupt', 'base']], ['invisible', ['in', 'prefix'], ['vis', 'base'], ['ible', 'suffix']],
    ['export', ['ex', 'prefix'], ['port', 'base']], ['subtract', ['sub', 'prefix'], ['tract', 'base']], ['reject', ['re', 'prefix'], ['ject', 'base']], ['audible', ['aud', 'base'], ['ible', 'suffix']],
    ['contradict', ['contra', 'prefix'], ['dict', 'base']], ['portable', ['port', 'base'], ['able', 'suffix']], ['thermal', ['therm', 'base'], ['al', 'suffix']], ['dehydrate', ['de', 'prefix'], ['hydr', 'base'], ['ate', 'suffix']],
    ['disrupt', ['dis', 'prefix'], ['rupt', 'base']], ['inject', ['in', 'prefix'], ['ject', 'base']]];
  function others(r, n, set) { return R.some((set || RK).filter(function (x) { return x !== r && ROOTS[x][0] !== ROOTS[r][0]; }), n); }
  /* the word as a tile, with its root marked */
  function marked(w, r) { var i = w.indexOf(r); return W.tile(W.hl(w, i, i + r.length)); }
  function rootOf(w) { return RK.filter(function (r) { return w.indexOf(r) >= 0; })[0]; }

  function rootMean(set) {
    return function (lv) {
      var r = R.pick(set), w = R.pick(ROOTS[r][1]);
      return Q.one(lv > 1 ? 'What does the root in <b>' + w + '</b> mean?' : 'The root <b>' + r + '</b> means...', ROOTS[r][0], others(r, lv > 1 ? 3 : 2, set).map(function (x) { return ROOTS[x][0]; }), {
        fig: lv > 1 ? W.tile(w) : R.some(ROOTS[r][1], 2).map(function (x) { return marked(x, r); }).join(' '),
        prompt: 'Think of another word with <b>' + r + '</b> in it.', hint: 'Find the root. What do the words with it share?',
        explain: '<b>' + r + '</b> means <b>' + ROOTS[r][0] + '</b>.', meta: { k: 'g6-root-mean', word: w } });
    };
  }
  function wordFor(set) {
    return function (lv) {
      var r = R.pick(set), w = R.pick(ROOTS[r][1]);
      return Q.tiles('Which word has a root that means <b>' + ROOTS[r][0] + '</b>?', w, others(r, lv > 1 ? 3 : 2, set).map(function (x) { return R.pick(ROOTS[x][1]); }), {
        hint: 'Find the root in each word.', explain: marked(w, r) + ' <b>' + r + '</b> = ' + ROOTS[r][0], meta: { k: 'g6-word-for', mean: ROOTS[r][0] } });
    };
  }
  function matchRoots(set) {
    return function () {
      var rs = R.some(set, 3);
      return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r][0]]; }),
        hint: 'Think of a word you know with each root.', explain: rs.map(function (r) { return '<b>' + r + '</b>: ' + ROOTS[r][0]; }).join(' &middot; '), meta: { k: 'g6-match-roots' } };
    };
  }
  function pickRoot(set) {
    return function () {
      var r = R.pick(set), right = R.some(ROOTS[r][1], 2), wrong = others(r, 2, set).map(function (x) { return R.pick(ROOTS[x][1]); });
      return Q.all('Pick every word with the root <b>' + r + '</b> (' + ROOTS[r][0] + ').', right, wrong, {
        hint: 'Look inside each word for <b>' + r + '</b>.', explain: right.map(function (x) { return marked(x, r); }).join(' '), meta: { k: 'g6-pick-root', root: r } });
    };
  }
  function rootTf(set) {
    return function () {
      var r = R.pick(set), w = R.pick(ROOTS[r][1]), right = R.int(0, 1) === 1, said = right ? ROOTS[r][0] : ROOTS[others(r, 1, set)[0]][0];
      return { q: Q.name() + ' says the root in <b>' + w + '</b> means <b>' + said + '</b>.', fig: marked(w, r), type: 'tf', answer: right,
        why: { options: ['That is what the root means.', 'The root means something else.'], answer: right ? 0 : 1 },
        hint: 'What do other words with ' + r + ' share?', explain: '<b>' + r + '</b> means <b>' + ROOTS[r][0] + '</b>.', meta: { k: 'g6-root-tf', word: w, said: said } };
    };
  }
  /* find the root */
  function tapRoot(lv) {
    var r = R.pick(RK), w = R.pick(ROOTS[r][1]);
    return Q.tiles('Tap the <b>root</b> in <b>' + w + '</b>.', r, others(r, lv > 1 ? 3 : 2).filter(function (x) { return w.indexOf(x) < 0; }), {
      hint: 'Which part carries the meaning?', explain: marked(w, r), meta: { k: 'g6-tap-root', word: w } });
  }
  function buildRoot(lv) {
    var p = R.pick(PARTS), extra = R.pick(PARTS.filter(function (x) { return x[0] !== p[0]; })).slice(1).filter(function (x) { return p.slice(1).every(function (y) { return y[0] !== x[0]; }); }).slice(0, lv > 1 ? 2 : 1);
    var tiles = p.slice(1).concat(extra);
    return { q: 'Build the word <b>' + p[0] + '</b> from its parts.', type: 'build', parts: tiles.map(function (t) { return W.tile(t[0], t[1]); }), answer: p.slice(1).map(function (t, i) { return i; }),
      hint: 'Find the root first, then add the parts around it.', explain: W.sum(p.slice(1)), meta: { k: 'g6-build-root', word: p[0] } };
  }
  function splitIt(lv) {
    var p = R.pick(PARTS), w = p[0], right = p.slice(1).map(function (x) { return x[0]; }).join(' + ');
    var bad = [2, 3, w.length - 2, w.length - 3].filter(function (n) { return n > 0 && n < w.length; }).map(function (n) { return w.slice(0, n) + ' + ' + w.slice(n); }).filter(function (x, i, a) { return x !== right && a.indexOf(x) === i; });
    return Q.one('Which split shows the <b>root</b> of <b>' + w + '</b>?', right, R.some(bad, lv > 1 ? 3 : 2), { hint: 'The root is a part with a meaning.', explain: W.sum(p.slice(1)), meta: { k: 'g6-split', word: w } });
  }
  function rootIn(lv) {
    var r = R.pick(RK), w = R.pick(ROOTS[r][1]), right = R.int(0, 1) === 1, said = right ? r : R.pick(others(r, 3).filter(function (x) { return w.indexOf(x) < 0; }));
    return { q: Q.name() + ' says <b>' + said + '</b> is the root of <b>' + w + '</b>.', type: 'tf', answer: right,
      why: { options: ['That part is in the word and carries its meaning.', 'That root is not in this word.'], answer: right ? 0 : 1 },
      hint: 'Is that part really inside the word?', explain: marked(w, r), meta: { k: 'g6-root-in', word: w, said: said } };
  }

  /* ---------- prefixes: prefix -> [meaning, words] ---------- */
  var PRE = {
    inter: ['between', ['interact', 'intercity', 'interprovincial', 'interconnect']],
    sub: ['under or below', ['subzero', 'subheading', 'subway', 'submarine']],
    pre: ['before', ['preheat', 'preview', 'prepay', 'preschool']],
    mis: ['wrongly', ['misread', 'misspell', 'misjudge', 'miscount']],
    anti: ['against', ['antifreeze', 'antibacterial', 'antiwar', 'antivirus']],
    trans: ['across', ['transatlantic', 'transcontinental', 'transpacific', 'transplant']]
  };
  var PK = Object.keys(PRE);
  /* words that start with the same letters but have no prefix */
  var LOOK = { pre: ['pretty', 'precious', 'press', 'prey'], mis: ['mist', 'mister', 'misty'], anti: ['antique', 'antler', 'antelope'], inter: ['interest'] };
  var LK = Object.keys(LOOK), FAKES = LK.reduce(function (a, p) { return a.concat(LOOK[p].map(function (w) { return [p, w]; })); }, []);
  /* bases for building words: pre- (before) and mis- (wrongly) */
  var BUILD = { pre: ['heat', 'view', 'pay', 'order', 'wash'], mis: ['read', 'spell', 'judge', 'count', 'use'] };
  function preParts(w) { var p = PK.filter(function (x) { return w.indexOf(x) === 0; })[0]; return [[p, 'prefix'], [w.slice(p.length), 'base']]; }

  function preMean(lv) {
    var p = R.pick(PK), w = R.pick(PRE[p][1]);
    return Q.one('What does <b>' + p + '-</b> mean in <b>' + w + '</b>?', PRE[p][0], R.some(PK.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return PRE[x][0]; }), {
      fig: lv > 1 ? W.tile(w) : W.sum(preParts(w)), prompt: 'Cover <b>' + p + '</b>. What is left? Now add the meaning.', hint: 'Think of another word that starts with ' + p + '-.',
      explain: '<b>' + p + '-</b> means <b>' + PRE[p][0] + '</b>.', meta: { k: 'g6-pre-mean', word: w } });
  }
  function preMatch() {
    var ps = R.some(PK, 3);
    return { q: 'Match each word to what its prefix means.', type: 'match', pairs: ps.map(function (p) { return [R.pick(PRE[p][1]), PRE[p][0]]; }),
      hint: 'Look at the start of each word.', explain: ps.map(function (p) { return '<b>' + p + '-</b> ' + PRE[p][0]; }).join(' &middot; '), meta: { k: 'g6-pre-match' } };
  }
  function preBuild(lv) {
    var p = R.pick(['pre', 'mis']), b = R.pick(BUILD[p]), o = p === 'pre' ? 'mis' : 'pre', mean = b + ' ' + PRE[p][0];
    var parts = [W.tile(p, 'prefix'), W.tile(o, 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(R.pick(BUILD[o].filter(function (x) { return x !== b; })), 'base')] : []);
    return { q: 'Build the word that means <b>' + mean + '</b>.', type: 'build', parts: parts, answer: [0, 2], hint: 'Prefix first, then the base.',
      explain: W.sum([[p, 'prefix'], [b, 'base']]), meta: { k: 'g6-pre-build', mean: mean } };
  }
  function preTf() {
    var p = R.pick(PK), w = R.pick(PRE[p][1]), right = R.int(0, 1) === 1, said = right ? PRE[p][0] : PRE[R.pick(PK.filter(function (x) { return x !== p; }))][0];
    return { q: Q.name() + ' says:', fig: W.sent('In <b>' + w + '</b>, the prefix means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That is what the prefix means.', 'The prefix means something else.'], answer: right ? 0 : 1 },
      hint: 'What does ' + p + '- mean?', explain: '<b>' + p + '-</b> means <b>' + PRE[p][0] + '</b>.', meta: { k: 'g6-pre-tf', word: w, said: said } };
  }
  /* is it really a prefix? */
  function prePick() {
    var p = R.pick(LK), real = R.some(PRE[p][1], 2), fake = R.some(LOOK[p], 2);
    if (fake.length < 2) fake.push(R.pick(FAKES.filter(function (f) { return f[0] !== p; }))[1]);
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, {
      hint: 'Cover the prefix. Is a word or root with meaning left?', explain: 'In <b>' + LOOK[p][0] + '</b> the letters ' + p + ' are not a prefix: cover them and nothing with meaning is left.', meta: { k: 'g6-pre-pick', pre: p } });
  }
  function realWhich(lv) {
    var p = R.pick(LK), real = R.pick(PRE[p][1]), fakes = R.some(FAKES, lv > 1 ? 3 : 2).map(function (f) { return f[1]; });
    return Q.tiles('Which word has a <b>real prefix</b>?', real, fakes, { hint: 'Cover the first letters. Is a real word left?', explain: W.sum(preParts(real)), meta: { k: 'g6-real-which', word: real } });
  }
  function realTf() {
    var real = R.int(0, 1) === 1, w, p;
    if (real) { p = R.pick(LK); w = R.pick(PRE[p][1]); } else { var f = R.pick(FAKES); p = f[0]; w = f[1]; }
    return { q: Q.name() + ' says <b>' + p + '</b> is a prefix in <b>' + w + '</b>.', fig: W.tile(w), type: 'tf', answer: real,
      why: { options: ['Cover it and a word with meaning is left.', 'Cover it and nothing with meaning is left.'], answer: real ? 0 : 1 },
      hint: 'Cover ' + p + '. What is left?', explain: real ? W.sum(preParts(w)) : 'Cover ' + p + ': <b>' + w.slice(p.length) + '</b> means nothing.', meta: { k: 'g6-real-tf', word: w, pre: p } };
  }
  function coverIt(lv) {
    var p = R.pick(PK), w = R.pick(PRE[p][1]), b = w.slice(p.length);
    return Q.tiles('Cover the prefix in <b>' + w + '</b>. What is left?', b, [w.slice(p.length - 1), w.slice(p.length + 1)].concat(lv > 1 ? [w.slice(0, p.length)] : []), {
      fig: W.tile(w), hint: 'Which prefix does it start with?', explain: W.sum(preParts(w)), meta: { k: 'g6-cover-it', word: w } });
  }

  /* ---------- adding suffixes: [base, suffix, the right spelling, the rule] ---------- */
  var RULES = { drop: 'Drop the silent e.', y: 'Change y to i.', dbl: 'Double the last letter.', add: 'Just add it.' };
  /* each set holds the rule and words like it where you just add the suffix */
  var SETS = {
    e: [['hope', 'ing', 'hoping', 'drop'], ['write', 'ing', 'writing', 'drop'], ['value', 'able', 'valuable', 'drop'], ['adore', 'able', 'adorable', 'drop'], ['create', 'ion', 'creation', 'drop'],
      ['fame', 'ous', 'famous', 'drop'], ['arrive', 'al', 'arrival', 'drop'], ['believe', 'able', 'believable', 'drop'], ['use', 'ing', 'using', 'drop'], ['smile', 'ing', 'smiling', 'drop'], ['shine', 'ing', 'shining', 'drop'],
      ['hope', 'ful', 'hopeful', 'add'], ['move', 'ment', 'movement', 'add'], ['safe', 'ty', 'safety', 'add'], ['care', 'ful', 'careful', 'add'], ['late', 'ly', 'lately', 'add'], ['excite', 'ment', 'excitement', 'add'], ['love', 'ly', 'lovely', 'add']],
    y: [['happy', 'ness', 'happiness', 'y'], ['carry', 'ed', 'carried', 'y'], ['beauty', 'ful', 'beautiful', 'y'], ['busy', 'ly', 'busily', 'y'], ['rely', 'able', 'reliable', 'y'], ['heavy', 'est', 'heaviest', 'y'],
      ['study', 'ed', 'studied', 'y'], ['try', 'ed', 'tried', 'y'], ['easy', 'ly', 'easily', 'y'], ['worry', 'ed', 'worried', 'y'], ['cry', 'es', 'cries', 'y'],
      ['carry', 'ing', 'carrying', 'add'], ['study', 'ing', 'studying', 'add'], ['worry', 'ing', 'worrying', 'add'], ['enjoy', 'ed', 'enjoyed', 'add'], ['play', 'ful', 'playful', 'add'], ['stay', 'ed', 'stayed', 'add']],
    dbl: [['plan', 'ed', 'planned', 'dbl'], ['swim', 'er', 'swimmer', 'dbl'], ['big', 'est', 'biggest', 'dbl'], ['begin', 'ing', 'beginning', 'dbl'], ['admit', 'ed', 'admitted', 'dbl'], ['forget', 'able', 'forgettable', 'dbl'],
      ['refer', 'ed', 'referred', 'dbl'], ['stop', 'ing', 'stopping', 'dbl'], ['hot', 'er', 'hotter', 'dbl'], ['run', 'er', 'runner', 'dbl'], ['shop', 'ing', 'shopping', 'dbl'],
      ['open', 'ing', 'opening', 'add'], ['visit', 'ed', 'visited', 'add'], ['happen', 'ed', 'happened', 'add'], ['garden', 'er', 'gardener', 'add'], ['limit', 'ed', 'limited', 'add'], ['jump', 'ed', 'jumped', 'add'], ['rain', 'ing', 'raining', 'add']]
  };
  /* wrong spellings a child might write */
  function misspell(s) {
    var b = s[0], f = s[1], cut = b.slice(0, -1), out;
    if (/e$/.test(b)) out = [b + f, cut + f, cut + b.slice(-2, -1) + f];
    else if (/y$/.test(b)) out = [b + f, cut + 'i' + f, cut + 'ie' + f];
    else out = [b + f, b + b.slice(-1) + f];
    return out.filter(function (x, i, a) { return x !== s[2] && a.indexOf(x) === i; });
  }
  function sum(s) { return '<span class="wsum">' + W.tile(s[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(s[1], 'suffix') + '</span>'; }
  function addSuffix(set) {
    return function (lv) {
      var s = R.pick(SETS[set]);
      return Q.tiles('Add <b>' + s[1] + '</b> to <b>' + s[0] + '</b>.', s[2], misspell(s).slice(0, lv > 1 ? 3 : 2), { fig: sum(s),
        prompt: 'Look at the end of the base, then the start of the suffix.', hint: RULES[s[3]].replace('.', '?'),
        explain: RULES[s[3]] + ' <b>' + s[2] + '</b>', meta: { k: 'g6-add-suffix', base: s[0], suf: s[1] } });
    };
  }
  function whichRule(set) {
    return function () {
      var s = R.pick(SETS[set]), rule = SETS[set][0][3];
      return Q.tiles('Which rule do you use?', RULES[s[3]], [RULES[s[3] === rule ? 'add' : rule]], { fig: sum(s),
        hint: 'Look at the last letters of the base and the first letter of the suffix.', explain: '<b>' + s[2] + '</b>: ' + RULES[s[3]], meta: { k: 'g6-which-rule', base: s[0], suf: s[1] } });
    };
  }
  function pickSpelled(set) {
    return function () {
      var right = R.some(SETS[set], 2), wrong = R.some(SETS[set].filter(function (s) { return right.indexOf(s) < 0; }), 2).map(function (s) { return R.pick(misspell(s)); });
      return Q.all('Pick every word that is spelled right.', right.map(function (s) { return s[2]; }), wrong, {
        hint: 'Check each ending against the rule.', explain: 'Spelled right: ' + right.map(function (s) { return '<b>' + s[2] + '</b>'; }).join(', '), meta: { k: 'g6-pick-spelled' } });
    };
  }
  function spellTf(set) {
    return function () {
      var s = R.pick(SETS[set]), right = R.int(0, 1) === 1, shown = right ? s[2] : R.pick(misspell(s));
      return { q: 'Is this spelled right?', fig: W.sent(s[0] + ' + ' + s[1] + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
        why: { options: ['It follows the rule.', 'It breaks the rule.'], answer: right ? 0 : 1 },
        hint: 'Which rule fits this base?', explain: 'The right spelling is <b>' + s[2] + '</b>.', meta: { k: 'g6-spell-tf', base: s[0], suf: s[1], shown: shown } };
    };
  }
  function fixIt(set) {
    return function (lv) {
      var s = R.pick(SETS[set]), bad = R.pick(misspell(s));
      return Q.tiles(Q.name() + ' wrote <b>' + bad + '</b>. Fix it.', s[2], misspell(s).filter(function (x) { return x !== bad; }).slice(0, lv > 1 ? 2 : 1).concat([bad]), { fig: sum(s),
        hint: RULES[s[3]].replace('.', '?'), explain: RULES[s[3]] + ' <b>' + s[2] + '</b>', meta: { k: 'g6-fix-spelling', base: s[0], suf: s[1] } });
    };
  }
  /* -able when what is left is a whole word, -ible when it is not */
  var ABLE = ['read', 'comfort', 'depend', 'break', 'wash', 'agree', 'enjoy', 'afford', 'fix', 'laugh', 'pass', 'bend'], IBLE = ['vis', 'poss', 'sens', 'terr', 'horr', 'incred', 'aud', 'cred', 'feas', 'tang'];
  function stem() { var able = R.int(0, 1) === 1; return [R.pick(able ? ABLE : IBLE), able]; }
  function ableIble(lv) {
    var s = stem();
    return { q: 'Which ending makes the word?', fig: '<span class="wsum">' + W.tile(s[0], 'base') + W.tile('?', 'suffix') + '</span>', type: 'tap', tiles: [W.tile('able', 'suffix'), W.tile('ible', 'suffix')], answer: s[1] ? 0 : 1,
      prompt: 'Is <b>' + s[0] + '</b> a whole word on its own?', hint: lv > 1 ? 'Whole word: -able. Not a word: -ible.' : 'Is ' + s[0] + ' a word you know?',
      explain: '<b>' + s[0] + (s[1] ? 'able' : 'ible') + '</b>', meta: { k: 'g6-able-ible', stem: s[0] } };
  }
  function ableSpell(lv) {
    var s = stem(), right = s[0] + (s[1] ? 'able' : 'ible'), wrong = s[0] + (s[1] ? 'ible' : 'able');
    return Q.tiles('Which spelling is right?', right, [wrong].concat(lv > 1 ? [s[0] + 'abel'] : []), { hint: 'Is ' + s[0] + ' a whole word?', explain: '<b>' + right + '</b>', meta: { k: 'g6-able-spell', stem: s[0] } });
  }
  function ablePick() {
    var a = R.some(ABLE, 2), b = R.some(IBLE, 2), right = [a[0] + 'able', b[0] + 'ible'], wrong = [a[1] + 'ible', b[1] + 'able'];
    return Q.all('Pick every word that is spelled right.', right, wrong, { hint: 'Whole word: -able. Not a word: -ible.', explain: 'Spelled right: ' + right.join(', '), meta: { k: 'g6-able-pick' } });
  }
  function ableTf() {
    var s = stem(), right = R.int(0, 1) === 1, shown = s[0] + ((s[1] === right) ? 'able' : 'ible');
    return { q: 'Is this spelled right?', fig: W.tile(shown), type: 'tf', answer: right,
      why: { options: ['The ending fits the pattern.', 'It needs the other ending.'], answer: right ? 0 : 1 },
      hint: 'Cover the ending. Is a whole word left?', explain: '<b>' + s[0] + (s[1] ? 'able' : 'ible') + '</b>', meta: { k: 'g6-able-tf', stem: s[0], shown: shown } };
  }

  Atlas.register('word-study', {
    full: true,
    lessons: [{
      id: 'roots', title: 'Roots', sub: 'Many long words are built on a Latin or Greek root.',
      concepts: [
        { slug: 'root', title: 'A root carries the meaning', exp: ['B2.1'], skill: 'root',
          model: [
            step(marked('transport', 'port')),
            step(W.sum([['trans', 'prefix'], ['port', 'base']]), 'Split it. <b>port</b> is the root.'),
            step(marked('portable', 'port') + ' ' + marked('export', 'port'), 'Same root, same idea: carry.'),
            step(marked('interrupt', 'rupt')),
            step(W.sum([['inter', 'prefix'], ['rupt', 'base']]), 'Break in between.')
          ],
          guided: [tapRoot, function () { return splitIt(1); }, function () { return buildRoot(1); }],
          check: [tapRoot, function () { return buildRoot(2); }, function () { return splitIt(2); }, rootIn, tapRoot],
          coach: '<p>Write the root on a card and brainstorm words that hold it. Ask: "What do all of these have to do with carrying?"</p>',
          mistake: '<p>Looking for a root in any letters that match. The word has to share the meaning: <b>report</b> is about carrying news back; <b>sport</b> is not about carrying.</p>' },
        { slug: 'latin', title: 'Latin roots', exp: ['B2.1'], skill: 'latin',
          model: [
            step(marked('inspect', 'spect'), '<b>spect</b>: look.'),
            step(marked('predict', 'dict'), '<b>dict</b>: say. Predict: say before.'),
            step(marked('construct', 'struct'), '<b>struct</b>: build.'),
            step(marked('attract', 'tract') + ' ' + marked('tractor', 'tract'), '<b>tract</b>: pull. A tractor pulls.'),
            step(marked('project', 'ject'), '<b>ject</b>: throw. Throw forward.')
          ],
          guided: [rootMean(LATIN), wordFor(LATIN), matchRoots(LATIN)],
          check: [function () { return rootMean(LATIN)(2); }, pickRoot(LATIN), function () { return wordFor(LATIN)(2); }, rootTf(LATIN), matchRoots(LATIN)],
          coach: '<p>Keep a root wall or notebook page. Add a word each time one appears in science or social studies.</p>',
          mistake: '<p>Mixing up roots with similar meanings, like <b>spect</b> (look) and <b>vis</b> (see). Both are about the eyes; that is fine.</p>' },
        { slug: 'greek', title: 'Greek roots', exp: ['B2.1'], skill: 'greek',
          model: [
            step(marked('autograph', 'graph'), '<b>graph</b>: write.'),
            step(marked('biology', 'bio'), '<b>bio</b>: life.'),
            step(marked('microphone', 'micro'), '<b>micro</b>: small.'),
            step(marked('microphone', 'phon'), '<b>phon</b>: sound. Two roots: a small thing for sound.'),
            step(marked('geology', 'geo'), '<b>geo</b>: earth. A science of the earth.')
          ],
          guided: [wordFor(GREEK), rootMean(GREEK), pickRoot(GREEK)],
          check: [function () { return wordFor(GREEK)(2); }, pickRoot(GREEK), function () { return rootMean(GREEK)(2); }, rootTf(GREEK), matchRoots(GREEK)],
          coach: '<p>Science is full of Greek roots. Before a science lesson, pick out two long words and split them together.</p>',
          mistake: '<p>Trying to read a long word all at once. Find the root first, then the parts around it.</p>' }
      ]
    }, {
      id: 'prefixes', title: 'Prefixes', sub: 'More prefixes that change the meaning.',
      concepts: [
        { slug: 'prefix-meanings', title: 'What these prefixes mean', exp: ['B2.1'], skill: 'prefixes',
          model: [
            step(W.sum(preParts('subzero')), '<b>sub-</b>: under or below.'),
            step(W.sum(preParts('preheat')), '<b>pre-</b>: before.'),
            step(W.sum(preParts('misread')), '<b>mis-</b>: wrongly.'),
            step(W.sum(preParts('interprovincial')), '<b>inter-</b>: between. Between provinces.'),
            step(W.sum(preParts('transatlantic')), '<b>trans-</b>: across. Across the Atlantic.')
          ],
          guided: [function () { return preMean(1); }, preMatch, function () { return preBuild(1); }],
          check: [function () { return preMean(2); }, function () { return preBuild(2); }, preTf, preMatch, function () { return preMean(3); }],
          coach: '<p>Say the meaning out loud as a phrase: "preheat, heat before". Then use the word in a sentence.</p>',
          mistake: '<p>Reading <b>mis-</b> as "miss". It means wrongly: misspell, spell wrongly.</p>' },
        { slug: 'real-prefix', title: 'Is it really a prefix?', exp: ['B2.1'], skill: 'real-prefix',
          model: [
            step(W.sum(preParts('preview')), 'Cover pre. <b>view</b> is left.'),
            step(W.tile('pretty'), 'Cover pre. <b>tty</b> is not a word. No prefix.'),
            step(W.sum(preParts('antifreeze')), 'Cover anti. <b>freeze</b> is left.'),
            step(W.tile('antique'), 'Cover anti. Nothing is left that means anything.')
          ],
          guided: [prePick, function () { return realWhich(1); }, function () { return coverIt(1); }],
          check: [prePick, realTf, function () { return realWhich(2); }, function () { return coverIt(2); }, realTf],
          coach: '<p>Make a quick two-column sort on paper: "real prefix" and "just looks like one".</p>',
          mistake: '<p>Splitting every word that starts with pre, mis or anti. Always check what is left.</p>' }
      ]
    }, {
      id: 'suffixes', title: 'Spelling with suffixes', sub: 'The end of the base word can change.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the silent e before a vowel', exp: ['B2.1'], skill: 'drop-e',
          model: [
            step(sum(['hope', 'ing']), '<b>-ing</b> starts with a vowel.'),
            step(W.tile('hoping'), 'The e goes.'),
            step(sum(['hope', 'ful']), '<b>-ful</b> starts with a consonant.'),
            step(W.tile('hopeful'), 'Keep the e.'),
            step(sum(['value', 'able']), '<b>-able</b> starts with a vowel: <b>valuable</b>.')
          ],
          guided: [addSuffix('e'), whichRule('e'), spellTf('e')],
          check: [function () { return addSuffix('e')(2); }, whichRule('e'), fixIt('e'), pickSpelled('e'), function () { return addSuffix('e')(3); }],
          coach: '<p>Have the child circle the first letter of the suffix. Vowel? The e drops. Consonant? The e stays.</p>',
          mistake: '<p>Writing <b>hopeing</b> or dropping the e before a consonant (<b>hopful</b>).</p>' },
        { slug: 'y-to-i', title: 'Change y to i', exp: ['B2.1'], skill: 'y-to-i',
          model: [
            step(sum(['happy', 'ness']), 'A consonant comes before the y.'),
            step(W.tile('happiness'), 'The y becomes i.'),
            step(sum(['carry', 'ing']), 'Before <b>-ing</b>, keep the y.'),
            step(W.tile('carrying'), 'No double i.'),
            step(sum(['enjoy', 'ed']), 'A vowel before the y: keep it. <b>enjoyed</b>.')
          ],
          guided: [addSuffix('y'), whichRule('y'), spellTf('y')],
          check: [function () { return addSuffix('y')(2); }, fixIt('y'), whichRule('y'), pickSpelled('y'), function () { return addSuffix('y')(3); }],
          coach: '<p>Explain why -ing keeps the y: otherwise there would be two i' + '’' + 's in a row (carriing).</p>',
          mistake: '<p>Changing the y in words like <b>enjoy</b> or <b>play</b>. A vowel comes before the y, so it stays: enjoyed, played.</p>' },
        { slug: 'double', title: 'Double the last letter', exp: ['B2.1'], skill: 'double',
          model: [
            step(sum(['plan', 'ed']), 'One vowel, then one consonant.'),
            step(W.tile('planned'), 'Double the n.'),
            step(W.tile('beginning'), 'Be<b>GIN</b>: the beat is at the end, so double.'),
            step(W.tile('opening'), '<b>O</b>pen: the beat is at the start. No double.'),
            step(sum(['jump', 'ed']), 'Two consonants already: <b>jumped</b>.')
          ],
          guided: [addSuffix('dbl'), whichRule('dbl'), spellTf('dbl')],
          check: [function () { return addSuffix('dbl')(2); }, pickSpelled('dbl'), whichRule('dbl'), fixIt('dbl'), function () { return addSuffix('dbl')(3); }],
          coach: '<p>Clap the word. If the strong beat lands on the last part (beGIN, adMIT), double the last letter.</p>',
          mistake: '<p>Doubling in words like <b>visit</b> and <b>happen</b>, where the strong beat is at the start.</p>' },
        { slug: 'able-ible', title: '-able or -ible?', exp: ['B2.1'], skill: 'able-ible',
          model: [
            step('<span class="wsum">' + W.tile('read', 'base') + W.tile('able', 'suffix') + '</span>', '<b>read</b> is a word: -able.'),
            step('<span class="wsum">' + W.tile('vis', 'base') + W.tile('ible', 'suffix') + '</span>', '<b>vis</b> is not a word on its own: -ible.'),
            step('<span class="wsum">' + W.tile('depend', 'base') + W.tile('able', 'suffix') + '</span>', 'Cover the ending. A whole word? -able.'),
            step('<span class="wsum">' + W.tile('poss', 'base') + W.tile('ible', 'suffix') + '</span>', 'Not a word left: -ible.')
          ],
          guided: [function () { return ableIble(1); }, function () { return ableSpell(1); }, ableTf],
          check: [function () { return ableIble(2); }, ablePick, function () { return ableSpell(2); }, ableTf, function () { return ableIble(3); }],
          coach: '<p>This is a helpful pattern, not a law. When in doubt, check a dictionary.</p>',
          mistake: '<p>Expecting the rule to work every time. A few words break it (flexible, collapsible). Learn those as you meet them.</p>' }
      ]
    }],
    practice: [
      { id: 'root', name: 'Find the root', code: 'B2.1', gen: tapRoot },
      { id: 'latin', name: 'Latin roots', code: 'B2.1', gen: rootMean(LATIN) },
      { id: 'greek', name: 'Greek roots', code: 'B2.1', gen: rootMean(GREEK) },
      { id: 'prefixes', name: 'Prefixes', code: 'B2.1', gen: preMean },
      { id: 'real-prefix', name: 'Real prefix or not?', code: 'B2.1', gen: realWhich },
      { id: 'drop-e', name: 'Drop the silent e', code: 'B2.1', gen: addSuffix('e') },
      { id: 'y-to-i', name: 'Change y to i', code: 'B2.1', gen: addSuffix('y') },
      { id: 'double', name: 'Double the last letter', code: 'B2.1', gen: addSuffix('dbl') },
      { id: 'able-ible', name: '-able or -ible', code: 'B2.1', gen: ableIble }
    ]
  });

  Q.shapes('word-study', {
    root: [[1, 'build', buildRoot], [1, 'split', splitIt], [2, 'tf', rootIn]],
    latin: [[1, 'word-for', wordFor(LATIN)], [1, 'pick', pickRoot(LATIN)], [1, 'match', matchRoots(LATIN)], [2, 'tf', rootTf(LATIN)]],
    greek: [[1, 'word-for', wordFor(GREEK)], [1, 'pick', pickRoot(GREEK)], [1, 'match', matchRoots(GREEK)], [2, 'tf', rootTf(GREEK)]],
    prefixes: [[1, 'match', preMatch], [1, 'build', preBuild], [2, 'tf', preTf]],
    'real-prefix': [[1, 'pick', prePick], [1, 'cover', coverIt], [2, 'tf', realTf]],
    'drop-e': [[1, 'rule', whichRule('e')], [1, 'fix', fixIt('e')], [1, 'pick', pickSpelled('e')], [2, 'tf', spellTf('e')]],
    'y-to-i': [[1, 'rule', whichRule('y')], [1, 'fix', fixIt('y')], [1, 'pick', pickSpelled('y')], [2, 'tf', spellTf('y')]],
    double: [[1, 'rule', whichRule('dbl')], [1, 'fix', fixIt('dbl')], [1, 'pick', pickSpelled('dbl')], [2, 'tf', spellTf('dbl')]],
    'able-ible': [[1, 'spell', ableSpell], [1, 'pick', ablePick], [2, 'tf', ableTf]]
  });
})();
