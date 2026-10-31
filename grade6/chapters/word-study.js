/* Grade 6: roots and spelling.
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
    graph: ['write', ['autograph', 'paragraph', 'graphic', 'calligraphy']],
    bio: ['life', ['biology', 'biome', 'biodegradable', 'biologist']],
    therm: ['heat', ['thermal', 'thermos', 'thermometer', 'thermostat']],
    phon: ['sound', ['phonics', 'symphony', 'microphone', 'saxophone']],
    aqua: ['water', ['aquarium', 'aquatic', 'aquamarine', 'aquaculture']],
    tract: ['pull', ['tractor', 'attract', 'subtract', 'distract']],
    ject: ['throw', ['eject', 'project', 'reject', 'inject']]
  };
  var RK = Object.keys(ROOTS);
  function others(r, n) { return R.some(RK.filter(function (x) { return x !== r && ROOTS[x][0] !== ROOTS[r][0]; }), n); }
  /* the word as a tile, with its root marked */
  function marked(w, r) { var i = w.indexOf(r); return W.tile(W.hl(w, i, i + r.length)); }

  function rootMean(lv) {
    var r = R.pick(RK), w = R.pick(ROOTS[r][1]);
    return Q.one(lv > 1 ? 'What does the root in <b>' + w + '</b> mean?' : 'The root <b>' + r + '</b> means...', ROOTS[r][0], others(r, lv > 1 ? 3 : 2).map(function (x) { return ROOTS[x][0]; }), {
      fig: lv > 1 ? W.tile(w) : R.some(ROOTS[r][1], 2).map(function (x) { return marked(x, r); }).join(' '),
      prompt: 'Think of another word with <b>' + r + '</b> in it.', hint: 'Find the root. What do the words with it share?',
      explain: '<b>' + r + '</b> means <b>' + ROOTS[r][0] + '</b>.', meta: { k: 'g6-root-mean', word: w } });
  }
  function tapRoot() {
    var r = R.pick(RK), w = R.pick(ROOTS[r][1]);
    return Q.tiles('Tap the <b>root</b> in <b>' + w + '</b>.', r, others(r, 2).filter(function (x) { return w.indexOf(x) < 0; }), {
      hint: 'Which part carries the meaning?', explain: marked(w, r), meta: { k: 'g6-tap-root', word: w } });
  }
  function pickRoot() {
    var r = R.pick(RK), right = R.some(ROOTS[r][1], 2), wrong = others(r, 2).map(function (x) { return R.pick(ROOTS[x][1]); });
    return Q.all('Pick every word with the root <b>' + r + '</b> (' + ROOTS[r][0] + ').', right, wrong, {
      hint: 'Look inside each word for <b>' + r + '</b>.', explain: right.map(function (x) { return marked(x, r); }).join(' '), meta: { k: 'g6-pick-root', root: r } });
  }
  function matchRoots() {
    var rs = R.some(RK, 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r][0]]; }),
      hint: 'Think of a word you know with each root.', explain: rs.map(function (r) { return '<b>' + r + '</b>: ' + ROOTS[r][0]; }).join(' &middot; '), meta: { k: 'g6-match-roots' } };
  }
  function wordFor(lv) {
    var r = R.pick(RK), w = R.pick(ROOTS[r][1]);
    return Q.tiles('Which word has a root that means <b>' + ROOTS[r][0] + '</b>?', w, others(r, lv > 1 ? 3 : 2).map(function (x) { return R.pick(ROOTS[x][1]); }), {
      hint: 'Find the root in each word.', explain: marked(w, r) + ' <b>' + r + '</b> = ' + ROOTS[r][0], meta: { k: 'g6-word-for', mean: ROOTS[r][0] } });
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
  var LOOK = { pre: ['pretty', 'precious', 'press'], mis: ['mist', 'mister'], anti: ['antique', 'antler'], inter: ['interest'] };
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
  function prePick() {
    var p = R.pick(Object.keys(LOOK)), real = R.some(PRE[p][1], 2), fake = R.some(LOOK[p], Math.min(2, LOOK[p].length));
    if (fake.length < 2) fake.push(R.pick(PRE[R.pick(PK.filter(function (x) { return x !== p; }))][1]));
    return Q.all('Pick every word that has the prefix <b>' + p + '-</b>.', real, fake, {
      hint: 'Cover the prefix. Is a word or root with meaning left?', explain: 'In <b>' + LOOK[p][0] + '</b> the letters ' + p + ' are not a prefix: cover them and nothing with meaning is left.', meta: { k: 'g6-pre-pick', pre: p } });
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
      hint: 'What does ' + p + '- mean?', explain: '<b>' + p + '-</b> means <b>' + PRE[p][0] + '</b>.', meta: { k: 'g6-pre-tf', word: w, said: said } };
  }

  /* ---------- adding suffixes: [base, suffix, the right spelling, the rule] ---------- */
  var RULES = { drop: 'Drop the silent e.', y: 'Change y to i.', dbl: 'Double the last letter.', add: 'Just add it.' };
  var SPELL = [
    ['hope', 'ing', 'hoping', 'drop'], ['write', 'ing', 'writing', 'drop'], ['value', 'able', 'valuable', 'drop'], ['adore', 'able', 'adorable', 'drop'],
    ['create', 'ion', 'creation', 'drop'], ['fame', 'ous', 'famous', 'drop'], ['arrive', 'al', 'arrival', 'drop'], ['believe', 'able', 'believable', 'drop'],
    ['happy', 'ness', 'happiness', 'y'], ['carry', 'ed', 'carried', 'y'], ['beauty', 'ful', 'beautiful', 'y'], ['busy', 'ly', 'busily', 'y'],
    ['rely', 'able', 'reliable', 'y'], ['heavy', 'est', 'heaviest', 'y'], ['study', 'ed', 'studied', 'y'],
    ['plan', 'ed', 'planned', 'dbl'], ['swim', 'er', 'swimmer', 'dbl'], ['big', 'est', 'biggest', 'dbl'], ['begin', 'ing', 'beginning', 'dbl'],
    ['admit', 'ed', 'admitted', 'dbl'], ['forget', 'able', 'forgettable', 'dbl'], ['refer', 'ed', 'referred', 'dbl'],
    ['hope', 'ful', 'hopeful', 'add'], ['move', 'ment', 'movement', 'add'], ['safe', 'ty', 'safety', 'add'], ['carry', 'ing', 'carrying', 'add'],
    ['study', 'ing', 'studying', 'add'], ['open', 'ing', 'opening', 'add'], ['visit', 'ed', 'visited', 'add'], ['happen', 'ed', 'happened', 'add']
  ];
  /* wrong spellings a child might write */
  function misspell(s) {
    var b = s[0], f = s[1], cut = b.slice(0, -1), out;
    if (/e$/.test(b)) out = [b + f, cut + f, cut + b.slice(-2, -1) + f];
    else if (/y$/.test(b)) out = [b + f, cut + 'i' + f, cut + 'ie' + f];
    else out = [b + f, b + b.slice(-1) + f];
    return out.filter(function (x, i, a) { return x !== s[2] && a.indexOf(x) === i; });
  }
  function sum(s) { return W.tile(s[0], 'base') + '<span class="wop" aria-hidden="true">+</span>' + W.tile(s[1], 'suffix'); }
  function addSuffix(lv, rule) {
    var s = R.pick(SPELL.filter(function (x) { return !rule || x[3] === rule; }));
    return Q.tiles('Add <b>' + s[1] + '</b> to <b>' + s[0] + '</b>.', s[2], misspell(s).slice(0, lv > 1 ? 3 : 2), { fig: '<span class="wsum">' + sum(s) + '</span>',
      prompt: 'Look at the end of the base, then the start of the suffix.', hint: RULES[s[3]].replace('.', '?'),
      explain: RULES[s[3]] + ' <b>' + s[2] + '</b>', meta: { k: 'g6-add-suffix', base: s[0], suf: s[1] } });
  }
  function whichRule(lv, rule) {
    var s = R.pick(SPELL.filter(function (x) { return !rule || x[3] === rule; }));
    return Q.one('Which rule do you use?', RULES[s[3]], Object.keys(RULES).filter(function (k) { return k !== s[3]; }).map(function (k) { return RULES[k]; }).slice(0, lv > 1 ? 3 : 2), {
      fig: '<span class="wsum">' + sum(s) + '</span>', hint: 'Does the base end in e, in y, or in one vowel and one consonant?', explain: '<b>' + s[2] + '</b>: ' + RULES[s[3]],
      meta: { k: 'g6-which-rule', base: s[0], suf: s[1] } });
  }
  function pickSpelled() {
    var right = R.some(SPELL, 2), wrong = R.some(SPELL.filter(function (s) { return right.indexOf(s) < 0; }), 2).map(function (s) { return R.pick(misspell(s)); });
    return Q.all('Pick every word that is spelled right.', right.map(function (s) { return s[2]; }), wrong, {
      hint: 'Check each ending against the rules.', explain: 'Spelled right: ' + right.map(function (s) { return '<b>' + s[2] + '</b>'; }).join(', '), meta: { k: 'g6-pick-spelled' } });
  }
  function spellTf() {
    var s = R.pick(SPELL), right = R.int(0, 1) === 1, shown = right ? s[2] : R.pick(misspell(s));
    return { q: 'Is this spelled right?', fig: W.sent(s[0] + ' + ' + s[1] + ' = <b>' + shown + '</b>'), type: 'tf', answer: right,
      hint: 'Which rule fits this base?', explain: 'The right spelling is <b>' + s[2] + '</b>.', meta: { k: 'g6-spell-tf', base: s[0], suf: s[1], shown: shown } };
  }
  /* -able when what is left is a whole word, -ible when it is not */
  var ABLE = ['read', 'comfort', 'depend', 'break', 'wash', 'agree', 'enjoy', 'afford'], IBLE = ['vis', 'poss', 'sens', 'terr', 'horr', 'incred', 'aud'];
  function ableIble(lv) {
    var able = R.int(0, 1) === 1, stem = R.pick(able ? ABLE : IBLE);
    return { q: 'Which ending makes the word?', fig: '<span class="wsum">' + W.tile(stem, 'base') + W.tile('?', 'suffix') + '</span>', type: 'tap', tiles: [W.tile('able', 'suffix'), W.tile('ible', 'suffix')], answer: able ? 0 : 1,
      prompt: 'Is <b>' + stem + '</b> a whole word on its own?', hint: lv > 1 ? 'Whole word: -able. Not a word: -ible.' : 'Is ' + stem + ' a word you know?',
      explain: '<b>' + stem + (able ? 'able' : 'ible') + '</b>', meta: { k: 'g6-able-ible', stem: stem } };
  }

  Atlas.register('word-study', {
    lessons: [{
      id: 'roots', title: 'Roots', sub: 'Many long words are built on a Latin or Greek root.',
      concepts: [
        { slug: 'root', title: 'A root carries the meaning', exp: ['B2.1'], skill: 'roots',
          model: [
            step(marked('transport', 'port')),
            step(marked('portable', 'port') + ' ' + marked('export', 'port'), 'Same root, same idea.'),
            step(W.sent('<b>port</b> = carry'), 'Transport: carry across. Portable: can be carried.')
          ],
          key: '<p>Find the root, then think of other words that share it.</p>',
          guided: [function () { return rootMean(1); }, tapRoot],
          check: [function () { return rootMean(1); }, tapRoot],
          coach: '<p>Write the root on a card and brainstorm words that hold it. Ask: "What do all of these have to do with carrying?"</p>',
          mistake: '<p>Looking for a root in any letters that match. The word has to share the meaning: <b>report</b> is about carrying news back; <b>sport</b> is not about carrying.</p>' },
        { slug: 'latin', title: 'Latin roots', exp: ['B2.1'], skill: 'roots',
          model: [
            step(marked('inspect', 'spect'), '<b>spect</b>: look.'),
            step(marked('predict', 'dict'), '<b>dict</b>: say. Predict: say before.'),
            step(marked('construct', 'struct'), '<b>struct</b>: build.'),
            step(marked('erupt', 'rupt'), '<b>rupt</b>: break.')
          ],
          guided: [function () { return rootMean(1); }, function () { return wordFor(1); }],
          check: [function () { return rootMean(2); }, matchRoots],
          coach: '<p>Keep a root wall or notebook page. Add a word each time one appears in science or social studies.</p>',
          mistake: '<p>Mixing up roots with similar meanings, like <b>spect</b> (look) and <b>vis</b> (see). Both are about the eyes; that is fine.</p>' },
        { slug: 'greek', title: 'Greek roots', exp: ['B2.1'], skill: 'roots',
          model: [
            step(marked('autograph', 'graph'), '<b>graph</b>: write.'),
            step(marked('biology', 'bio'), '<b>bio</b>: life.'),
            step(marked('microphone', 'phon'), '<b>phon</b>: sound.'),
            step(marked('thermometer', 'therm'), '<b>therm</b>: heat.')
          ],
          guided: [function () { return wordFor(1); }, pickRoot],
          check: [function () { return wordFor(2); }, pickRoot],
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
            step(W.sum(preParts('interprovincial')), '<b>inter-</b>: between. Between provinces.')
          ],
          guided: [function () { return preMean(1); }, preMatch],
          check: [function () { return preMean(2); }, function () { return preBuild(1); }],
          coach: '<p>Say the meaning out loud as a phrase: "preheat, heat before". Then use the word in a sentence.</p>',
          mistake: '<p>Reading <b>mis-</b> as "miss". It means wrongly: misspell, spell wrongly.</p>' },
        { slug: 'real-prefix', title: 'Is it really a prefix?', exp: ['B2.1'], skill: 'prefixes',
          model: [
            step(W.sum(preParts('preview')), 'Cover pre. <b>view</b> is left.'),
            step(W.tile('pretty'), 'Cover pre. <b>tty</b> is not a word. No prefix.'),
            step(W.tile('antique'), 'Cover anti. Nothing is left that means anything.')
          ],
          guided: [prePick, preTf],
          check: [prePick, preTf],
          coach: '<p>Make a quick two-column sort on paper: "real prefix" and "just looks like one".</p>',
          mistake: '<p>Splitting every word that starts with pre, mis or anti. Always check what is left.</p>' }
      ]
    }, {
      id: 'suffixes', title: 'Spelling with suffixes', sub: 'The end of the base word can change.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the silent e before a vowel', exp: ['B2.1'], skill: 'spelling',
          model: [
            step('<span class="wsum">' + sum(['hope', 'ing']) + '</span>', '<b>-ing</b> starts with a vowel.'),
            step(W.tile('hoping'), 'The e goes.'),
            step('<span class="wsum">' + sum(['hope', 'ful']) + '</span>', '<b>-ful</b> starts with a consonant. Keep the e: <b>hopeful</b>.')
          ],
          guided: [function () { return addSuffix(1, 'drop'); }, function () { return whichRule(1); }],
          check: [function () { return addSuffix(1, 'drop'); }, function () { return addSuffix(1, 'add'); }],
          coach: '<p>Have the child circle the first letter of the suffix. Vowel? The e drops. Consonant? The e stays.</p>',
          mistake: '<p>Writing <b>hopeing</b> or dropping the e before a consonant (<b>hopful</b>).</p>' },
        { slug: 'y-to-i', title: 'Change y to i', exp: ['B2.1'], skill: 'spelling',
          model: [
            step('<span class="wsum">' + sum(['happy', 'ness']) + '</span>', 'A consonant comes before the y.'),
            step(W.tile('happiness'), 'The y becomes i.'),
            step('<span class="wsum">' + sum(['carry', 'ing']) + '</span>', 'Before <b>-ing</b>, keep the y: <b>carrying</b>.')
          ],
          guided: [function () { return addSuffix(1, 'y'); }, spellTf],
          check: [function () { return addSuffix(2, 'y'); }, spellTf],
          coach: '<p>Explain why -ing keeps the y: otherwise there would be two i’s in a row (carriing).</p>',
          mistake: '<p>Changing the y in words like <b>enjoy</b> or <b>play</b>. A vowel comes before the y, so it stays: enjoyed, played.</p>' },
        { slug: 'double', title: 'Double the last letter', exp: ['B2.1'], skill: 'spelling',
          model: [
            step('<span class="wsum">' + sum(['plan', 'ed']) + '</span>', 'One vowel, then one consonant.'),
            step(W.tile('planned'), 'Double the n.'),
            step(W.tile('beginning'), 'Be<b>GIN</b>: the beat is at the end, so double.'),
            step(W.tile('opening'), '<b>O</b>pen: the beat is at the start. No double.')
          ],
          guided: [function () { return addSuffix(1, 'dbl'); }, function () { return whichRule(1); }],
          check: [function () { return addSuffix(2, 'dbl'); }, pickSpelled],
          coach: '<p>Clap the word. If the strong beat lands on the last part (beGIN, adMIT), double the last letter.</p>',
          mistake: '<p>Doubling in words like <b>visit</b> and <b>happen</b>, where the strong beat is at the start.</p>' },
        { slug: 'able-ible', title: '-able or -ible?', exp: ['B2.1'], skill: 'spelling',
          model: [
            step('<span class="wsum">' + W.tile('read', 'base') + W.tile('able', 'suffix') + '</span>', '<b>read</b> is a word: -able.'),
            step('<span class="wsum">' + W.tile('vis', 'base') + W.tile('ible', 'suffix') + '</span>', '<b>vis</b> is not a word on its own: -ible.')
          ],
          guided: [function () { return ableIble(1); }, function () { return ableIble(1); }],
          check: [function () { return ableIble(2); }, function () { return ableIble(2); }],
          coach: '<p>This is a helpful pattern, not a law. When in doubt, check a dictionary.</p>',
          mistake: '<p>Expecting the rule to work every time. A few words break it (flexible, collapsible). Learn those as you meet them.</p>' }
      ]
    }],
    practice: [
      { id: 'roots', name: 'Latin and Greek roots', code: 'B2.1', gen: rootMean },
      { id: 'prefixes', name: 'Prefixes', code: 'B2.1', gen: preMean },
      { id: 'spelling', name: 'Spelling with suffixes', code: 'B2.1', gen: function (lv) { return addSuffix(lv); } }
    ]
  });

  Q.shapes('word-study', {
    roots: [[1, 'tap-root', tapRoot], [1, 'word-for', wordFor], [2, 'pick', pickRoot], [2, 'match', matchRoots]],
    prefixes: [[1, 'match', preMatch], [1, 'build', preBuild], [2, 'real-prefix', prePick], [2, 'true-false', preTf]],
    spelling: [[1, 'rule', whichRule], [1, 'able-ible', ableIble], [2, 'pick', pickSpelled], [2, 'true-false', spellTf]]
  });
})();
