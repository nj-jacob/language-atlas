/* Grade 5: word parts and spelling. The prefixes mis- (wrongly), pre- (before) and dis- (not); spelling with suffixes
   (drop the final e before a vowel suffix; -able after a whole word, -ible after a root); Greek and Latin roots.
   Ontario 2023 Language, Grade 5:
   B2.1 "use generalized knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell
        words with accuracy and automaticity"
   B2.2 "... use generalized morphological knowledge to analyze and understand new words in context"
   All word lists are written for this site. Answer checks: tests/verify/grade5-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- prefixes ---------- */
  var P = {
    mis: { says: 'wrongly', bases: ['spell', 'read', 'count', 'hear', 'judge', 'print', 'place'], mean: function (b) { return b + ' wrongly'; } },
    pre: { says: 'before', bases: ['heat', 'view', 'pay', 'cook', 'wash', 'set'], mean: function (b) { return b + ' before'; } },
    dis: { says: 'not', bases: ['agree', 'like', 'honest', 'obey', 'trust', 'loyal'], mean: function (b) { return 'not ' + b; } }
  };
  var PRE = Object.keys(P);
  function pre(p) { return p || R.pick(PRE); }
  function others(p) { return PRE.filter(function (x) { return x !== p; }); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  /* the same base with the other prefixes' meanings: the wrong answers */
  function wrongMeanings(p, b) { return others(p).map(function (o) { return P[o].mean(b); }); }

  function meaning(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), word = p + b;
    return Q.one('What does <b>' + word + '</b> mean?', P[p].mean(b), wrongMeanings(p, b).slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [b] : []), {
      fig: lv > 1 ? W.tile(word) : W.sum(parts(p, b)), prompt: 'Cover <b>' + p + '</b>. What word is left?', hint: 'Cover the prefix. Read the base. Add the prefix' + '’' + 's meaning.',
      explain: '<b>' + p + '-</b> means <b>' + P[p].says + '</b>.', steps: ['Cover <b>' + p + '</b>. The base is <b>' + b + '</b>.', '<b>' + p + '-</b> means <b>' + P[p].says + '</b>.', 'So <b>' + word + '</b> means <b>' + P[p].mean(b) + '</b>.'],
      meta: { k: 'g5-pre-meaning', word: word } });
  }
  function whichWord(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), o = others(p), wrong = [o[0] + R.pick(P[o[0]].bases), b].concat(lv > 1 ? [o[1] + R.pick(P[o[1]].bases)] : []);
    return Q.tiles('Which word means <b>' + P[p].mean(b) + '</b>?', p + b, wrong, { hint: 'Which prefix means ' + P[p].says + '?', explain: W.sum(parts(p, b)), meta: { k: 'g5-pre-which', mean: P[p].mean(b) } });
  }
  function build(lv, p0) {
    var p = pre(p0), b = R.pick(P[p].bases), o = others(p), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(o[0], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(o[1], 'prefix'), W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].mean(b) + '</b>.', type: 'build', parts: list, answer: [0, 2], hint: 'Prefix first, then the base.', explain: W.sum(parts(p, b)),
      meta: { k: 'g5-pre-build', mean: P[p].mean(b) } };
  }
  function matchUp() {
    return { q: 'Match each word to what it means.', type: 'match', pairs: R.shuffle(PRE).map(function (p) { var b = R.pick(P[p].bases); return [p + b, P[p].mean(b)]; }),
      hint: 'mis- wrongly, pre- before, dis- not.', explain: 'The prefix decides the meaning.', meta: { k: 'g5-pre-match' } };
  }
  function prefixTf() {
    var p = pre(), b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].mean(b) : R.pick(wrongMeanings(p, b));
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + p + b + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: PRE.map(function (x) { return x + '- means ' + P[x].says + '.'; }), answer: PRE.indexOf(p) },
      hint: 'Look at the prefix. What does it mean?', explain: '<b>' + p + b + '</b> means <b>' + P[p].mean(b) + '</b>.', meta: { k: 'g5-pre-tf', word: p + b, said: said } };
  }
  /* a prefix inside a sentence: use the prefix to work out the word */
  var IN_SENT = [['mis', 'I <b>misread</b> the sign and took the wrong bus.'], ['pre', 'Please <b>preheat</b> the oven before you bake the bannock.'], ['dis', 'The twins <b>disagree</b> about which team is best.'],
    ['mis', 'He <b>miscounted</b> the chairs, so two people had to stand.'], ['pre', 'We <b>prepaid</b> for the tickets online.'], ['dis', 'Our cat will <b>disobey</b> every rule we make.']];
  function inSentence() {
    var s = R.pick(IN_SENT), p = s[0];
    return Q.tiles('What does the prefix in the bold word mean?', P[p].says, others(p).map(function (o) { return P[o].says; }), { fig: W.sent(s[1]), prompt: 'Find the prefix at the front.',
      hint: 'mis- wrongly, pre- before, dis- not.', explain: '<b>' + p + '-</b> means <b>' + P[p].says + '</b>.', meta: { k: 'g5-pre-in-sent', s: s[1] } });
  }

  /* ---------- suffixes and spelling ---------- */
  /* [base, suffix, the right spelling, the wrong spelling] */
  var DROP = [['love', 'able', 'lovable', 'loveable'], ['value', 'able', 'valuable', 'valueable'], ['use', 'able', 'usable', 'useable'], ['adore', 'able', 'adorable', 'adoreable'],
    ['hope', 'ing', 'hoping', 'hopeing'], ['ride', 'ing', 'riding', 'rideing'], ['smile', 'ing', 'smiling', 'smileing'], ['bake', 'ing', 'baking', 'bakeing'], ['note', 'able', 'notable', 'noteable']];
  var KEEP = [['excite', 'ment', 'excitement', 'excitment'], ['move', 'ment', 'movement', 'movment'], ['amaze', 'ment', 'amazement', 'amazment'], ['hope', 'ful', 'hopeful', 'hopful'],
    ['care', 'ful', 'careful', 'carful'], ['grace', 'ful', 'graceful', 'gracful'], ['safe', 'ty', 'safety', 'safty']];
  var VOWEL_SUF = ['able', 'ing'];
  function eWord(lv) {
    var list = lv > 1 && R.int(0, 1) ? KEEP : DROP, w = R.pick(list), vowel = VOWEL_SUF.indexOf(w[1]) >= 0;
    return Q.one('Which is spelled right?', w[2], [w[3]], { fig: '<span class="wsum">' + W.tile(w[0], 'base') + '<span class="wop">+</span>' + W.tile(w[1], 'suffix') + '</span>',
      prompt: 'Does <b>' + w[1] + '</b> start with a vowel?', hint: vowel ? 'The suffix starts with a vowel: drop the e.' : 'The suffix starts with a consonant: keep the e.',
      explain: W.tile(w[2]), meta: { k: 'g5-e-word', base: w[0], suf: w[1] } });
  }
  function dropOrKeep() {
    var w = R.pick(R.int(0, 1) ? DROP : KEEP), drop = DROP.indexOf(w) >= 0;
    return { q: 'Add <b>-' + w[1] + '</b> to <b>' + w[0] + '</b>. What happens to the e?', type: 'tap', tiles: ['Drop the e', 'Keep the e'], answer: drop ? 0 : 1,
      hint: 'Vowel at the start of the suffix: drop it. Consonant: keep it.', explain: W.tile(w[0]) + ' &rarr; ' + W.tile(w[2]), meta: { k: 'g5-drop-keep', base: w[0], suf: w[1] } };
  }
  function pickSpelled() {
    var right = R.some(DROP.concat(KEEP), 2), wrong = R.some(DROP.concat(KEEP).filter(function (w) { return right.indexOf(w) < 0; }), 2);
    return Q.all('Pick every word that is spelled right.', right.map(function (w) { return w[2]; }), wrong.map(function (w) { return w[3]; }), {
      hint: 'Vowel suffix: drop the e. Consonant suffix: keep it.', explain: right.map(function (w) { return '<b>' + w[2] + '</b>'; }).join(', ') + ' are right.', meta: { k: 'g5-pick-spelled' } });
  }
  /* -able after a whole word, -ible after a root that is not a word by itself */
  var ABLE = [['read', 'readable'], ['wash', 'washable'], ['break', 'breakable'], ['comfort', 'comfortable'], ['enjoy', 'enjoyable'], ['depend', 'dependable'], ['fix', 'fixable']];
  var IBLE = [['vis', 'visible'], ['poss', 'possible'], ['terr', 'terrible'], ['horr', 'horrible'], ['ed', 'edible'], ['incred', 'incredible']];
  function ableIble(lv) {
    var able = R.int(0, 1) === 1, w = R.pick(able ? ABLE : IBLE), start = w[0];
    return { q: 'Which ending fits?', fig: '<span class="wsum">' + W.tile(start, able ? 'base' : 'syl') + '<span class="wop">+</span>' + W.tile('?', 'suffix') + '</span>', type: 'tap', tiles: ['able', 'ible'], answer: able ? 0 : 1,
      prompt: 'Is <b>' + start + '</b> a whole word?', hint: 'A whole word takes -able. A part that is not a word takes -ible.', explain: W.tile(w[1]),
      meta: { k: 'g5-able-ible', start: start } };
  }

  /* ---------- Greek and Latin roots ---------- */
  var ROOTS = { tele: 'far', phon: 'sound', graph: 'write', port: 'carry', spect: 'look', aud: 'hear', vis: 'see', bio: 'life', geo: 'earth', dict: 'say' };
  /* [word, its roots, what it means] */
  var RW = [['telephone', ['tele', 'phon'], 'a tool that sends sound far away'], ['autograph', ['graph'], 'a name you write yourself'], ['portable', ['port'], 'able to be carried'],
    ['spectator', ['spect'], 'a person who looks on'], ['audience', ['aud'], 'the people who hear a show'], ['visible', ['vis'], 'able to be seen'], ['biography', ['bio', 'graph'], 'writing about a person' + '’' + 's life'],
    ['geography', ['geo', 'graph'], 'the study of the earth and its places'], ['predict', ['dict'], 'to say what will happen before it does'], ['transport', ['port'], 'to carry from one place to another'],
    ['inspect', ['spect'], 'to look at closely'], ['audio', ['aud'], 'sound you can hear'], ['dictionary', ['dict'], 'a book of words and what they say'], ['vision', ['vis'], 'the power to see']];
  function rootOf(w) { return w[1][w[1].length - 1]; }
  function rootMeaning(lv) {
    var w = R.pick(RW), r = rootOf(w), wrong = R.some(Object.keys(ROOTS).filter(function (x) { return w[1].indexOf(x) < 0; }), lv > 1 ? 3 : 2).map(function (x) { return ROOTS[x]; });
    return Q.one('The root <b>' + r + '</b> is in <b>' + w[0] + '</b>. What does it mean?', ROOTS[r], wrong, { fig: W.tile(w[0].replace(r, '<b>' + r + '</b>')),
      prompt: 'Think of another word with <b>' + r + '</b>.', hint: 'What does ' + w[0] + ' mean? ' + w[2] + '.', explain: '<b>' + r + '</b> means <b>' + ROOTS[r] + '</b>.', meta: { k: 'g5-root-meaning', root: r } });
  }
  function matchRoots() {
    var rs = R.some(Object.keys(ROOTS), 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r]]; }), hint: 'Think of a word with each root.', explain: 'A root carries the core meaning of a word.', meta: { k: 'g5-root-match' } };
  }
  function rootWord(lv) {
    var w = R.pick(RW), wrong = R.some(RW.filter(function (x) { return x[1].join() !== w[1].join() && x[2] !== w[2]; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; });
    return Q.tiles('Which word means <b>' + w[2] + '</b>?', w[0], wrong, { prompt: 'Which root fits the meaning?', hint: 'Look for a root that means ' + ROOTS[rootOf(w)] + '.',
      explain: '<b>' + rootOf(w) + '</b> means <b>' + ROOTS[rootOf(w)] + '</b>.', meta: { k: 'g5-root-word', mean: w[2] } });
  }
  function pickRoot() {
    var r = R.pick(['port', 'spect', 'aud', 'vis', 'dict', 'graph']), has = RW.filter(function (w) { return w[1].indexOf(r) >= 0; }), not = RW.filter(function (w) { return w[1].indexOf(r) < 0; });
    return Q.all('Pick every word with a root that means <b>' + ROOTS[r] + '</b>.', R.some(has, 2).map(function (w) { return w[0]; }), R.some(not, 2).map(function (w) { return w[0]; }), {
      hint: 'Which root means ' + ROOTS[r] + '? Look for it inside each word.', explain: '<b>' + r + '</b> means <b>' + ROOTS[r] + '</b>.', meta: { k: 'g5-root-pick', root: r } });
  }

  Atlas.register('word-parts', {
    lessons: [{
      id: 'prefixes', title: 'Prefixes: mis-, pre- and dis-', sub: 'The front of a word changes its meaning.',
      concepts: [
        { slug: 'mis', title: 'mis- means wrongly', exp: ['B2.1', 'B2.2'], skill: 'prefixes',
          model: [
            step(W.sum(parts('mis', 'spell')), 'Cover <b>mis</b>. Read <b>spell</b>.'),
            step(W.sent('<b>misspell</b> = spell it the wrong way'), 'Keep both s' + '’' + 's: mis + spell.'),
            step(W.sent('<b>misjudge</b> = judge the wrong way'))
          ],
          guided: [function () { return meaning(1, 'mis'); }, function () { return whichWord(1, 'mis'); }],
          check: [function () { return meaning(1, 'mis'); }, function () { return build(1, 'mis'); }],
          coach: '<p>Say the parts aloud: "mis... spell." Ask: "What happens when you misspell a word?"</p>',
          mistake: '<p>Writing "mispell". The prefix keeps all its letters and the base keeps all of its letters: mis + spell = misspell.</p>' },
        { slug: 'pre', title: 'pre- means before', exp: ['B2.1', 'B2.2'], skill: 'prefixes',
          model: [
            step(W.sum(parts('pre', 'heat')), 'Cover <b>pre</b>. Read <b>heat</b>.'),
            step(W.sent('<b>preheat</b> the oven = heat it first'), 'Then you bake.'),
            step(W.sent('<b>preview</b> = a look ahead of time'))
          ],
          guided: [function () { return meaning(1, 'pre'); }, function () { return whichWord(1, 'pre'); }],
          check: [function () { return meaning(2, 'pre'); }, function () { return build(1, 'pre'); }],
          coach: '<p>Link it to things the child knows: a movie preview, preschool, a pre-test.</p>',
          mistake: '<p>Seeing a prefix in words like <b>press</b> or <b>pretty</b>. Cover "pre": if no word is left, there is no prefix.</p>' },
        { slug: 'dis', title: 'dis- means not', exp: ['B2.1', 'B2.2'], skill: 'prefixes',
          model: [
            step(W.sum(parts('dis', 'agree')), 'Cover <b>dis</b>. Read <b>agree</b>.'),
            step(W.sent('<b>disagree</b> = not agree'), 'The opposite.'),
            step(W.sent('The twins <b>disagree</b> about the best team.'), 'In a sentence.')
          ],
          guided: [function () { return meaning(1, 'dis'); }, inSentence],
          check: [function () { return meaning(2, 'dis'); }, inSentence],
          coach: '<p>Play "opposites": you say a word (like, honest, obey) and the child adds dis- and uses it in a sentence.</p>',
          mistake: '<p>Mixing up dis- and mis-. Ask: "Is it the opposite, or done the wrong way?"</p>' }
      ]
    }, {
      id: 'spelling', title: 'Spelling with suffixes', sub: 'Small rules that work in many words.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the e before a vowel suffix', exp: ['B2.1'], skill: 'spelling',
          model: [
            step('<span class="wsum">' + W.tile('love', 'base') + '<span class="wop">+</span>' + W.tile('able', 'suffix') + '</span>', '<b>able</b> starts with a vowel.'),
            step(W.tile('lovable'), 'So the e goes.'),
            step('<span class="wsum">' + W.tile('excite', 'base') + '<span class="wop">+</span>' + W.tile('ment', 'suffix') + '</span>', '<b>ment</b> starts with a consonant.'),
            step(W.tile('excitement'), 'So the e stays.')
          ],
          guided: [function () { return eWord(1); }, dropOrKeep],
          check: [function () { return eWord(2); }, dropOrKeep],
          coach: '<p>Write the suffixes -able, -ing, -ment and -ful on cards. Sort them: vowel at the start, or consonant?</p>',
          mistake: '<p>Dropping the e every time (movment). Only drop it when the suffix starts with a vowel.</p>' },
        { slug: 'able-ible', title: '-able or -ible?', exp: ['B2.1'], skill: 'spelling',
          model: [
            step(W.tile('wash', 'base') + ' ' + W.tile('able', 'suffix'), '<b>wash</b> is a whole word: <b>-able</b>.'),
            step(W.tile('vis', 'syl') + ' ' + W.tile('ible', 'suffix'), '<b>vis</b> is not a word by itself: <b>-ible</b>.'),
            step(W.tile('washable') + ' ' + W.tile('visible'))
          ],
          guided: [ableIble, ableIble],
          check: [ableIble, pickSpelled],
          coach: '<p>Cover the ending. If a whole word is left (read, wash, enjoy), it is usually -able. This works for most words, not all.</p>',
          mistake: '<p>Spelling by sound. -able and -ible sound the same, so look at what is left when the ending is covered.</p>' }
      ]
    }, {
      id: 'roots', title: 'Greek and Latin roots', sub: 'The core of many long words.',
      concepts: [
        { slug: 'roots', title: 'A root carries the meaning', exp: ['B2.2'], skill: 'roots',
          model: [
            step(W.tile('tele') + ' ' + W.tile('phone'), '<b>tele</b> = far. <b>phon</b> = sound.'),
            step(W.tile('telephone'), 'Sound from far away.'),
            step(W.tile('bio') + ' ' + W.tile('graphy'), '<b>bio</b> = life. <b>graph</b> = write.'),
            step(W.tile('biography'), 'Writing about a life.')
          ],
          guided: [function () { return rootMeaning(1); }, matchRoots],
          check: [function () { return rootMeaning(2); }, matchRoots],
          coach: '<p>Make a root web: write "graph" in the middle and add every word you can find (photograph, paragraph, autograph).</p>',
          mistake: '<p>Expecting every word to split neatly. Roots are clues to meaning; check the sentence too.</p>' },
        { slug: 'roots-use', title: 'Roots unlock new words', exp: ['B2.2'], skill: 'roots',
          model: [
            step(W.tile('<b>spect</b>ator'), '<b>spect</b> = look.'),
            step(W.sent('A <b>spectator</b> looks on.'), 'A new word, worked out.'),
            step(W.tile('<b>port</b>able'), '<b>port</b> = carry. Able to be carried.')
          ],
          guided: [function () { return rootWord(1); }, pickRoot],
          check: [function () { return rootWord(2); }, pickRoot],
          coach: '<p>When you meet a long word in a science or social studies book, hunt for a root together before looking it up.</p>',
          mistake: '<p>Seeing a root in any matching letters (sport has "port" but is not about carrying). Check the meaning fits.</p>' }
      ]
    }],
    practice: [
      { id: 'prefixes', name: 'Prefixes mis-, pre- and dis-', code: 'B2.1, B2.2', gen: function (lv) { return meaning(lv); } },
      { id: 'spelling', name: 'Spelling with suffixes', code: 'B2.1', gen: eWord },
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.2', gen: rootMeaning }
    ]
  });

  Q.shapes('word-parts', {
    prefixes: [[1, 'which-word', whichWord], [1, 'build', function (lv) { return build(lv); }], [2, 'match', matchUp], [2, 'true-false', prefixTf], [2, 'in-sentence', inSentence]],
    spelling: [[1, 'drop-keep', dropOrKeep], [1, 'able-ible', ableIble], [2, 'pick', pickSpelled]],
    roots: [[1, 'match', matchRoots], [1, 'root-word', rootWord], [2, 'pick', pickRoot]]
  });
})();
