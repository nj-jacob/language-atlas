/* Grade 5: word parts and spelling. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   The prefixes mis- (wrongly), pre- (before) and dis- (not); spelling with suffixes (drop the final e before a vowel suffix;
   -able after a whole word, -ible after a root); Greek and Latin roots.
   Ontario 2023 Language, Grade 5:
   B2.1 "use generalized knowledge of the meanings of words and morphemes (i.e., bases, prefixes, and suffixes) to read and spell
        words with accuracy and automaticity"
   B2.2 "... use generalized morphological knowledge to analyze and understand new words in context"
   All word lists are written for this site. Answer checks: tests/verify/grade5-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var RQ = '’';

  /* ---------- prefixes ---------- */
  var P = {
    mis: { says: 'wrongly', icon: 'wrong', bases: ['spell', 'read', 'count', 'hear', 'judge', 'print', 'place', 'behave', 'lead', 'use', 'match', 'step'], mean: function (b) { return b + ' wrongly'; } },
    pre: { says: 'before', icon: 'before', bases: ['heat', 'view', 'pay', 'cook', 'wash', 'set', 'order', 'test', 'plan', 'mix', 'soak', 'record'], mean: function (b) { return b + ' before'; } },
    dis: { says: 'not', icon: 'not', bases: ['agree', 'like', 'honest', 'obey', 'trust', 'loyal', 'connect', 'approve', 'please', 'comfort'], mean: function (b) { return 'not ' + b; } }
  };
  var PRE = Object.keys(P);
  /* words that start with the same letters but have no prefix: cover the letters and no word is left */
  var FAKE = { mis: ['mist', 'mister', 'mischief', 'missile'], pre: ['press', 'pretty', 'precious', 'pretzel'], dis: ['dish', 'disc', 'distance', 'disco'] };
  /* a prefix inside a sentence: use the prefix to work out the word */
  var IN_SENT = {
    mis: ['I <b>misread</b> the sign and took the wrong bus.', 'He <b>miscounted</b> the chairs, so two people had to stand.', 'The puppy will <b>misbehave</b> if it gets bored.',
      'Did you <b>mishear</b> the time? The game starts at four, not five.', 'Grandpa <b>misplaced</b> his glasses again.'],
    pre: ['Please <b>preheat</b> the oven before you bake the bannock.', 'We <b>prepaid</b> for the ferry tickets online.', 'Mom <b>presoaked</b> the muddy hockey socks.',
      'The class saw a <b>preview</b> of the film about Haida Gwaii.', 'Arjun <b>pretested</b> the canoe in the shallow water.'],
    dis: ['The twins <b>disagree</b> about which team is best.', 'Our cat will <b>disobey</b> every rule we make.', 'Noor <b>dislikes</b> loud music in the car.',
      'It was <b>dishonest</b> to copy the answers.', 'Please <b>disconnect</b> the charger when the tablet is full.']
  };
  function others(p) { return PRE.filter(function (x) { return x !== p; }); }
  function parts(p, b) { return [[p, 'prefix'], [b, 'base']]; }
  /* the same base with the other prefixes' meanings: the wrong answers */
  function wrongMeanings(p, b) { return others(p).map(function (o) { return P[o].mean(b); }); }

  function meaning(lv, p) {
    var b = R.pick(P[p].bases), word = p + b;
    return Q.one('What does <b>' + word + '</b> mean?', P[p].mean(b), wrongMeanings(p, b).slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [b] : []), {
      fig: lv > 1 ? W.tile(word) : W.sum(parts(p, b)), prompt: 'Cover <b>' + p + '</b>. What word is left?', hint: 'Cover the prefix. Read the base. Add the prefix' + RQ + 's meaning.',
      explain: W.means(P[p].icon, '<b>' + p + '-</b> = ' + P[p].says), steps: ['Cover <b>' + p + '</b>. The base is <b>' + b + '</b>.', '<b>' + p + '-</b> means <b>' + P[p].says + '</b>.', 'So <b>' + word + '</b> means <b>' + P[p].mean(b) + '</b>.'],
      meta: { k: 'g5-pre-meaning', word: word } });
  }
  function whichWord(lv, p) {
    var b = R.pick(P[p].bases), o = others(p), wrong = [o[0] + R.pick(P[o[0]].bases), b].concat(lv > 1 ? [o[1] + R.pick(P[o[1]].bases)] : []);
    return Q.tiles('Which word means <b>' + P[p].mean(b) + '</b>?', p + b, wrong, { prompt: 'Which prefix means ' + P[p].says + '?', hint: 'Which prefix means ' + P[p].says + '?', explain: W.sum(parts(p, b)), meta: { k: 'g5-pre-which', mean: P[p].mean(b) } });
  }
  function build(lv, p) {
    var b = R.pick(P[p].bases), o = others(p), extra = R.pick(P[p].bases.filter(function (x) { return x !== b; }));
    var list = [W.tile(p, 'prefix'), W.tile(o[0], 'prefix'), W.tile(b, 'base')].concat(lv > 1 ? [W.tile(o[1], 'prefix'), W.tile(extra, 'base')] : []);
    return { q: 'Build the word that means <b>' + P[p].mean(b) + '</b>.', type: 'build', parts: list, answer: [0, 2], hint: 'Prefix first, then the base.', explain: W.sum(parts(p, b)),
      meta: { k: 'g5-pre-build', mean: P[p].mean(b) } };
  }
  function matchUp(lv, p) {
    var order = R.shuffle(PRE), used = {};
    return { q: 'Match each word to what it means.', type: 'match', pairs: order.map(function (x) { var b = R.pick(P[x].bases.filter(function (y) { return !used[y]; })); used[b] = 1; return [x + b, P[x].mean(b)]; }),
      hint: 'mis- wrongly, pre- before, dis- not.', explain: W.means(P[p].icon, '<b>' + p + '-</b> = ' + P[p].says), meta: { k: 'g5-pre-match' } };
  }
  function prefixTf(lv, p) {
    var b = R.pick(P[p].bases), right = R.int(0, 1) === 1, said = right ? P[p].mean(b) : R.pick(wrongMeanings(p, b));
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + p + b + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: PRE.map(function (x) { return x + '- means ' + P[x].says + '.'; }), answer: PRE.indexOf(p) },
      hint: 'Look at the prefix. What does it mean?', explain: '<b>' + p + b + '</b> means <b>' + P[p].mean(b) + '</b>.', meta: { k: 'g5-pre-tf', word: p + b, said: said } };
  }
  function inSentence(lv, p) {
    var s = R.pick(IN_SENT[p]);
    return Q.tiles('What does the prefix in the bold word mean?', P[p].says, others(p).map(function (o) { return P[o].says; }), { fig: W.sent(s), prompt: 'Find the prefix at the front.',
      hint: 'mis- wrongly, pre- before, dis- not.', explain: W.means(P[p].icon, '<b>' + p + '-</b> = ' + P[p].says), meta: { k: 'g5-pre-in-sent', s: s } });
  }
  function realPrefix(lv, p) {
    var b = R.pick(P[p].bases);
    return Q.tiles('Which word has the prefix <b>' + p + '-</b>?', p + b, R.some(FAKE[p], lv > 1 ? 2 : 1), { prompt: 'Cover <b>' + p + '</b>. Is a real word left?',
      hint: 'Cover the first letters. A prefix leaves a whole word behind.', explain: W.sum(parts(p, b)), meta: { k: 'g5-pre-real', p: p } });
  }
  function prefixSkill(p) {
    return [[1, 'which-word', function (lv) { return whichWord(lv, p); }], [1, 'build', function (lv) { return build(lv, p); }], [1, 'real-prefix', function (lv) { return realPrefix(lv, p); }],
      [2, 'in-sentence', function (lv) { return inSentence(lv, p); }], [2, 'true-false', function (lv) { return prefixTf(lv, p); }], [2, 'match', function (lv) { return matchUp(lv, p); }]];
  }
  function prefixQs(p) {
    return {
      guided: [function () { return meaning(1, p); }, function () { return whichWord(1, p); }, function () { return realPrefix(1, p); }],
      check: [function () { return meaning(2, p); }, function () { return build(1, p); }, function () { return inSentence(2, p); }, function () { return prefixTf(2, p); }, function () { return build(2, p); }]
    };
  }

  /* ---------- suffixes and spelling ---------- */
  /* [base, suffix, the right spelling, the wrong spelling] */
  var DROP = [['adore', 'able', 'adorable', 'adoreable'], ['value', 'able', 'valuable', 'valueable'], ['note', 'able', 'notable', 'noteable'], ['excite', 'able', 'excitable', 'exciteable'],
    ['hope', 'ing', 'hoping', 'hopeing'], ['ride', 'ing', 'riding', 'rideing'], ['smile', 'ing', 'smiling', 'smileing'], ['bake', 'ing', 'baking', 'bakeing'], ['write', 'ing', 'writing', 'writeing'],
    ['share', 'ing', 'sharing', 'shareing'], ['skate', 'ing', 'skating', 'skateing'], ['paddle', 'ing', 'paddling', 'paddleing'], ['create', 'ion', 'creation', 'createion'], ['decorate', 'ion', 'decoration', 'decorateion'],
    ['nerve', 'ous', 'nervous', 'nerveous'], ['fame', 'ous', 'famous', 'fameous'], ['brave', 'est', 'bravest', 'braveest'], ['wide', 'er', 'wider', 'wideer']];
  var KEEP = [['excite', 'ment', 'excitement', 'excitment'], ['move', 'ment', 'movement', 'movment'], ['amaze', 'ment', 'amazement', 'amazment'], ['hope', 'ful', 'hopeful', 'hopful'],
    ['care', 'ful', 'careful', 'carful'], ['grace', 'ful', 'graceful', 'gracful'], ['safe', 'ty', 'safety', 'safty'], ['use', 'ful', 'useful', 'usful'], ['lone', 'ly', 'lonely', 'lonly'],
    ['nice', 'ly', 'nicely', 'nicly'], ['state', 'ment', 'statement', 'statment'], ['place', 'ment', 'placement', 'placment'], ['hope', 'less', 'hopeless', 'hopless'], ['home', 'less', 'homeless', 'homless'],
    ['time', 'less', 'timeless', 'timless'], ['brave', 'ly', 'bravely', 'bravly']];
  var BOTH = DROP.concat(KEEP);
  function vowelStart(s) { return /^[aeiou]/.test(s); }
  function plus(w) { return '<span class="wsum">' + W.tile(w[0], 'base') + '<span class="wop">+</span>' + W.tile(w[1], 'suffix') + '</span>'; }
  function eSteps(w) { return [vowelStart(w[1]) ? '<b>' + w[1] + '</b> starts with a vowel: drop the e.' : '<b>' + w[1] + '</b> starts with a consonant: keep the e.', w[0] + ' + ' + w[1] + ' = <b>' + w[2] + '</b>']; }
  function eWord(lv) {
    var w = R.pick(lv > 1 ? BOTH : DROP);
    return Q.one('Which is spelled right?', w[2], [w[3]], { fig: plus(w), prompt: 'Does <b>' + w[1] + '</b> start with a vowel?',
      hint: 'Vowel at the start of the suffix: drop the e. Consonant: keep it.', explain: W.tile(w[2]), steps: eSteps(w), meta: { k: 'g5-e-word', base: w[0], suf: w[1] } });
  }
  function dropOrKeep(lv) {
    var w = R.pick(R.int(0, 1) ? DROP : KEEP);
    return { q: 'Add <b>-' + w[1] + '</b> to <b>' + w[0] + '</b>. What happens to the e?', type: 'tap', tiles: ['Drop the e', 'Keep the e'], answer: vowelStart(w[1]) ? 0 : 1,
      prompt: 'Look at the first letter of <b>' + w[1] + '</b>.', hint: 'Vowel at the start of the suffix: drop it. Consonant: keep it.', explain: W.tile(w[0]) + ' &rarr; ' + W.tile(w[2]), meta: { k: 'g5-drop-keep', base: w[0], suf: w[1] } };
  }
  function pickSpelled(lv) {
    var n = lv > 2 ? 3 : 2, right = R.some(BOTH, n), wrong = R.some(BOTH.filter(function (w) { return right.indexOf(w) < 0; }), n);
    return Q.all('Pick every word that is spelled right.', right.map(function (w) { return w[2]; }), wrong.map(function (w) { return w[3]; }), {
      hint: 'Vowel suffix: drop the e. Consonant suffix: keep it.', explain: right.map(function (w) { return '<b>' + w[2] + '</b>'; }).join(', ') + ' are right.', meta: { k: 'g5-pick-spelled' } });
  }
  /* a sentence with a gap: which spelling fits? */
  var E_SENT = { riding: 'Kai is _ his bike to the rink.', baking: 'We are _ bannock for the feast.', hoping: 'Mei is _ for snow on Saturday.', writing: 'Ava is _ a letter to her aunt in Iqaluit.',
    skating: 'The whole class went _ on the canal.', paddling: 'They kept _ until they reached the island.', careful: 'Be _ on the icy steps.', useful: 'A map is _ on a long hike.',
    excitement: 'The crowd roared with _.', safety: 'Wear a helmet for _.', valuable: 'This old coin is very _.', famous: 'The singer is _ across Canada.', nervous: 'Zara felt _ before her speech.',
    homeless: 'The shelter helps people who are _.', lonely: 'The new puppy was _ at night.', movement: 'The cat watched every _ of the mouse.' };
  function eSentence(lv) {
    var w = R.pick(BOTH.filter(function (x) { return E_SENT[x[2]]; })), s = E_SENT[w[2]];
    return Q.tiles('Which word fits the gap?', w[2], [w[3]], { fig: W.sent(s.replace('_', W.gap())) + plus(w), prompt: 'Does <b>' + w[1] + '</b> start with a vowel?',
      hint: 'Vowel suffix: drop the e. Consonant suffix: keep it.', explain: W.sent(s.replace('_', '<b>' + w[2] + '</b>')), meta: { k: 'g5-e-sent', base: w[0], suf: w[1] } });
  }
  function eTf(lv) {
    var w = R.pick(BOTH), right = R.int(0, 1) === 1, said = right ? w[2] : w[3], n = Q.name();
    return { q: n + ' adds <b>-' + w[1] + '</b> to <b>' + w[0] + '</b> and writes:', fig: W.tile(said), type: 'tf', answer: right,
      why: { options: ['A vowel suffix drops the e; a consonant suffix keeps it.', 'Every suffix drops the e.'], answer: 0 },
      hint: 'Does the suffix start with a vowel or a consonant?', explain: W.tile(w[2]), meta: { k: 'g5-e-tf', base: w[0], suf: w[1], said: said } };
  }

  /* -able after a whole word, -ible after a root that is not a word by itself */
  var ABLE = [['read', 'readable'], ['wash', 'washable'], ['break', 'breakable'], ['comfort', 'comfortable'], ['enjoy', 'enjoyable'], ['depend', 'dependable'], ['fix', 'fixable'],
    ['drink', 'drinkable'], ['afford', 'affordable'], ['predict', 'predictable'], ['accept', 'acceptable'], ['laugh', 'laughable'], ['agree', 'agreeable'], ['fold', 'foldable'], ['remark', 'remarkable']];
  var IBLE = [['vis', 'visible'], ['poss', 'possible'], ['terr', 'terrible'], ['horr', 'horrible'], ['ed', 'edible'], ['incred', 'incredible'], ['aud', 'audible'], ['leg', 'legible'],
    ['sens', 'sensible'], ['respons', 'responsible'], ['invis', 'invisible'], ['tang', 'tangible']];
  function ibleWrong(w) { return w[1].replace(/ible$/, 'able'); }
  function ableWrong(w) { return w[0] + 'ible'; }
  function ableIble(lv) {
    var able = R.int(0, 1) === 1, w = R.pick(able ? ABLE : IBLE), start = w[0];
    return { q: 'Which ending fits?', fig: '<span class="wsum">' + W.tile(start, able ? 'base' : 'syl') + '<span class="wop">+</span>' + W.tile('?', 'suffix') + '</span>', type: 'tap', tiles: ['able', 'ible'], answer: able ? 0 : 1,
      prompt: 'Is <b>' + start + '</b> a whole word?', hint: 'A whole word takes -able. A part that is not a word takes -ible.', explain: W.tile(w[1]),
      meta: { k: 'g5-able-ible', start: start } };
  }
  function ableSpelled(lv) {
    var able = R.int(0, 1) === 1, w = R.pick(able ? ABLE : IBLE);
    return Q.one('Which is spelled right?', w[1], [able ? ableWrong(w) : ibleWrong(w)], { prompt: 'Cover the ending. Is a whole word left?',
      hint: 'A whole word takes -able. A part that is not a word takes -ible.', explain: W.tile(w[1]), meta: { k: 'g5-able-spelled', start: w[0] } });
  }
  function wholeWord(lv) {
    var able = R.int(0, 1) === 1, w = R.pick(able ? ABLE : IBLE);
    return { q: 'Cover the ending of <b>' + w[1] + '</b>. Is <b>' + w[0] + '</b> a whole word?', type: 'tap', tiles: ['Yes, so it ends in -able', 'No, so it ends in -ible'], answer: able ? 0 : 1,
      hint: 'Can you use <b>' + w[0] + '</b> by itself in a sentence?', explain: W.tile(w[0], able ? 'base' : 'syl') + ' ' + W.tile(able ? 'able' : 'ible', 'suffix'), meta: { k: 'g5-whole-word', word: w[1] } };
  }
  function pickAble(lv) {
    var right = R.some(ABLE.concat(IBLE), lv > 1 ? 3 : 2), wrongFrom = R.some(ABLE.concat(IBLE).filter(function (w) { return right.indexOf(w) < 0; }), 2);
    return Q.all('Pick every word that is spelled right.', right.map(function (w) { return w[1]; }), wrongFrom.map(function (w) { return ABLE.indexOf(w) >= 0 ? ableWrong(w) : ibleWrong(w); }), {
      hint: 'Whole word: -able. Not a word by itself: -ible.', explain: right.map(function (w) { return '<b>' + w[1] + '</b>'; }).join(', ') + ' are right.', meta: { k: 'g5-pick-able' } });
  }
  var ABLE_SENT = { washable: 'Good news: this jacket is _.', breakable: 'Pack the _ dishes in towels.', comfortable: 'This old couch is very _.', enjoyable: 'The trip to the museum was _.',
    drinkable: 'Is the lake water _?', affordable: 'The bus is an _ way to travel.', predictable: 'The ending of the film was _.', visible: 'The Northern Lights were _ last night.',
    possible: 'Is it _ to see a moose here?', terrible: 'The storm made a _ mess.', edible: 'Some berries are not _.', legible: 'Write so your notes are _.', responsible: 'Liam is _ for feeding the fish.',
    audible: 'Her voice was barely _ in the wind.', sensible: 'Boots are a _ choice in the snow.' };
  function ableSentence(lv) {
    var w = R.pick(ABLE.concat(IBLE).filter(function (x) { return ABLE_SENT[x[1]]; })), able = ABLE.indexOf(w) >= 0, s = ABLE_SENT[w[1]];
    return Q.tiles('Which spelling fits the gap?', w[1], [able ? ableWrong(w) : ibleWrong(w)], { fig: W.sent(s.replace('_', W.gap())), prompt: 'Cover the ending. Is a whole word left?',
      hint: 'Whole word: -able. Not a word by itself: -ible.', explain: W.sent(s.replace('_', '<b>' + w[1] + '</b>')), meta: { k: 'g5-able-sent', start: w[0] } });
  }

  /* ---------- Greek and Latin roots ---------- */
  var ROOTS = { tele: 'far', phon: 'sound', graph: 'write', port: 'carry', spect: 'look', aud: 'hear', vis: 'see', bio: 'life', geo: 'earth', dict: 'say',
    scope: 'see', micro: 'small', therm: 'heat', meter: 'measure', photo: 'light', struct: 'build', rupt: 'break', tract: 'pull' };
  /* [word, its roots, what it means] */
  var RW = [['telephone', ['tele', 'phon'], 'a tool that sends sound far away'], ['autograph', ['graph'], 'a name you write yourself'], ['portable', ['port'], 'able to be carried'],
    ['spectator', ['spect'], 'a person who looks on'], ['audience', ['aud'], 'the people who hear a show'], ['visible', ['vis'], 'able to be seen'], ['biography', ['bio', 'graph'], 'writing about a person' + RQ + 's life'],
    ['geography', ['geo', 'graph'], 'the study of the earth and its places'], ['predict', ['dict'], 'to say what will happen before it does'], ['transport', ['port'], 'to carry from one place to another'],
    ['inspect', ['spect'], 'to look at closely'], ['audio', ['aud'], 'sound you can hear'], ['dictionary', ['dict'], 'a book of words and what they say'], ['vision', ['vis'], 'the power to see'],
    ['microscope', ['micro', 'scope'], 'a tool for seeing very small things'], ['telescope', ['tele', 'scope'], 'a tool for seeing things far away'], ['thermometer', ['therm', 'meter'], 'a tool that measures heat'],
    ['photograph', ['photo', 'graph'], 'a picture made with light'], ['construct', ['struct'], 'to build something'], ['structure', ['struct'], 'something that has been built'],
    ['interrupt', ['rupt'], 'to break in while someone is talking'], ['erupt', ['rupt'], 'to break out, like a volcano'], ['tractor', ['tract'], 'a machine that pulls heavy loads'],
    ['attract', ['tract'], 'to pull toward you'], ['export', ['port'], 'to carry goods out of a country'], ['dictate', ['dict'], 'to say words for someone to write down']];
  function rootOf(w) { return w[1][w[1].length - 1]; }
  function rootTile(w, r) { return W.tile(w[0].replace(r, '<b>' + r + '</b>')); }
  function rootMeaning(lv) {
    var w = R.pick(RW), r = rootOf(w), avoid = w[1].map(function (x) { return ROOTS[x]; });
    var wrong = R.some(Object.keys(ROOTS).map(function (x) { return ROOTS[x]; }).filter(function (m, i, a) { return avoid.indexOf(m) < 0 && a.indexOf(m) === i; }), lv > 1 ? 3 : 2);
    return Q.one('The root <b>' + r + '</b> is in <b>' + w[0] + '</b>. What does it mean?', ROOTS[r], wrong, { fig: rootTile(w, r),
      prompt: 'What does <b>' + w[0] + '</b> mean? ' + w[2] + '.', hint: w[0] + ': ' + w[2] + '.', explain: W.means('think', '<b>' + r + '</b> = ' + ROOTS[r]), meta: { k: 'g5-root-meaning', root: r } });
  }
  function matchRoots(lv) {
    var seen = {}, rs = R.shuffle(Object.keys(ROOTS)).filter(function (r) { if (seen[ROOTS[r]]) return false; seen[ROOTS[r]] = 1; return true; }).slice(0, lv > 1 ? 4 : 3);
    return { q: 'Match each root to its meaning.', type: 'match', pairs: rs.map(function (r) { return [r, ROOTS[r]]; }), hint: 'Think of a word with each root.', explain: 'A root carries the core meaning of a word.', meta: { k: 'g5-root-match' } };
  }
  function pickRoot(lv) {
    var r = R.pick(['port', 'spect', 'aud', 'vis', 'dict', 'graph', 'struct', 'rupt', 'tract', 'scope']), has = RW.filter(function (w) { return w[1].indexOf(r) >= 0; }),
      not = RW.filter(function (w) { return w[1].indexOf(r) < 0 && w[1].every(function (x) { return ROOTS[x] !== ROOTS[r]; }); });
    return Q.all('Pick every word with a root that means <b>' + ROOTS[r] + '</b>.', R.some(has, 2).map(function (w) { return w[0]; }), R.some(not, lv > 1 ? 3 : 2).map(function (w) { return w[0]; }), {
      hint: 'Which root means ' + ROOTS[r] + '? Look for it inside each word.', explain: W.means('think', '<b>' + r + '</b> = ' + ROOTS[r]), meta: { k: 'g5-root-pick', root: r } });
  }
  function rootTf(lv) {
    var w = R.pick(RW), r = rootOf(w), right = R.int(0, 1) === 1, said = right ? ROOTS[r] : R.pick(Object.keys(ROOTS).map(function (x) { return ROOTS[x]; }).filter(function (m) { return w[1].every(function (x) { return ROOTS[x] !== m; }); }));
    return { q: Q.name() + ' says:', fig: rootTile(w, r) + W.sent('<b>' + r + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['It fits what ' + w[0] + ' means.', 'It does not fit what ' + w[0] + ' means.'], answer: right ? 0 : 1 },
      hint: w[0] + ': ' + w[2] + '.', explain: W.means('think', '<b>' + r + '</b> = ' + ROOTS[r]), meta: { k: 'g5-root-tf', root: r, said: said } };
  }
  function tapRoot(lv) {
    var w = R.pick(RW.filter(function (x) { return x[1].length === 1 && x[0].indexOf(x[1][0]) >= 0; })), r = w[1][0], i = w[0].indexOf(r);
    var pieces = [w[0].slice(0, i), r, w[0].slice(i + r.length)].filter(Boolean);
    return { q: 'Tap the root that means <b>' + ROOTS[r] + '</b>.', type: 'tap', tiles: pieces, answer: pieces.indexOf(r), fig: W.tile(w[0]),
      hint: w[0] + ': ' + w[2] + '.', explain: rootTile(w, r), meta: { k: 'g5-root-tap', word: w[0] } };
  }

  /* using roots to unlock a word */
  var ROOT_SENT = [['The <b>spectators</b> cheered from the stands.', 'spectator'], ['Turn up the <b>audio</b> so we can hear the video.', 'audio'], ['The fog made the island barely <b>visible</b>.', 'visible'],
    ['Please do not <b>interrupt</b> while Priya is speaking.', 'interrupt'], ['The volcano could <b>erupt</b> at any time.', 'erupt'], ['Canada <b>exports</b> wheat to many countries.', 'export'],
    ['Look at the drop of pond water under the <b>microscope</b>.', 'microscope'], ['The <b>thermometer</b> on the porch read minus 20.', 'thermometer'], ['Workers will <b>construct</b> a new bridge.', 'construct'],
    ['A magnet will <b>attract</b> the paper clips.', 'attract'], ['We <b>transport</b> the canoes on the roof of the van.', 'transport'], ['Theo read a <b>biography</b> of Terry Fox.', 'biography'],
    ['The coach will <b>inspect</b> every helmet.', 'inspect'], ['The weather team tries to <b>predict</b> the storm.', 'predict']];
  function wordOf(name) { return RW.filter(function (w) { return w[0] === name; })[0]; }
  function rootWord(lv) {
    var w = R.pick(RW), wrong = R.some(RW.filter(function (x) { return x[2] !== w[2] && x[1].every(function (r) { return ROOTS[r] !== ROOTS[rootOf(w)]; }); }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; });
    return Q.tiles('Which word means <b>' + w[2] + '</b>?', w[0], wrong, { prompt: 'Which root fits the meaning?', hint: 'Look for a root that means ' + ROOTS[rootOf(w)] + '.',
      explain: rootTile(w, rootOf(w)), meta: { k: 'g5-root-word', mean: w[2] } });
  }
  function rootSentence(lv) {
    var s = R.pick(ROOT_SENT), w = wordOf(s[1]), r = rootOf(w);
    var wrong = R.some(RW.filter(function (x) { return x[2] !== w[2] && x[1].every(function (y) { return ROOTS[y] !== ROOTS[r]; }); }), lv > 1 ? 2 : 1).map(function (x) { return x[2]; });
    return Q.one('Use the root. What does the bold word mean?', w[2], wrong, { fig: W.sent(s[0]), prompt: '<b>' + r + '</b> means <b>' + ROOTS[r] + '</b>.',
      hint: 'Find the root. What does it mean? Does the sentence agree?', explain: rootTile(w, r) + ' ' + W.means('think', '<b>' + r + '</b> = ' + ROOTS[r]), meta: { k: 'g5-root-sent', word: w[0] } });
  }
  function rootWordTf(lv) {
    var w = R.pick(RW), right = R.int(0, 1) === 1, other = R.pick(RW.filter(function (x) { return x[1].every(function (y) { return w[1].every(function (z) { return ROOTS[y] !== ROOTS[z]; }); }); })), said = right ? w[2] : other[2];
    return { q: Q.name() + ' says <b>' + w[0] + '</b> means:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['The root fits that meaning.', 'The root does not fit that meaning.'], answer: right ? 0 : 1 },
      hint: 'Find the root in ' + w[0] + '. What does it mean?', explain: rootTile(w, rootOf(w)) + ' ' + w[2] + '.', meta: { k: 'g5-root-word-tf', word: w[0], said: said } };
  }
  function matchRootWords(lv) {
    var seen = {}, ws = R.shuffle(RW).filter(function (w) { var m = ROOTS[rootOf(w)]; if (seen[m]) return false; seen[m] = 1; return true; }).slice(0, 3);
    return { q: 'Match each word to what it means.', type: 'match', pairs: ws.map(function (w) { return [w[0], w[2]]; }), hint: 'Find the root in each word first.', explain: 'The root is the clue to each meaning.', meta: { k: 'g5-root-word-match' } };
  }

  Atlas.register('word-parts', {
    full: true,
    lessons: [{
      id: 'prefixes', title: 'Prefixes: mis-, pre- and dis-', sub: 'The front of a word changes its meaning.',
      concepts: [
        Object.assign({ slug: 'mis', title: 'mis- means wrongly', exp: ['B2.1', 'B2.2'], skill: 'mis',
          model: [
            step(W.sum(parts('mis', 'spell')), 'Cover <b>mis</b>. Read <b>spell</b>.'),
            step(W.means('wrong', 'spell it the wrong way')),
            step(W.tile('mi<b>ss</b>pell'), 'Keep both s' + RQ + 's: mis + spell.'),
            step(W.sent('He <b>miscounted</b> the chairs, so two people had to stand.'), 'Another one, in a sentence.'),
            step(W.sum(parts('mis', 'counted')), 'Counted the wrong way. Now the sentence makes sense.')
          ],
          coach: '<p>Say the parts aloud: "mis... spell." Ask: "What happens when you misspell a word?"</p>',
          mistake: '<p>Writing "mispell". The prefix keeps all its letters and the base keeps all of its letters: mis + spell = misspell.</p>' }, prefixQs('mis')),
        Object.assign({ slug: 'pre', title: 'pre- means before', exp: ['B2.1', 'B2.2'], skill: 'pre',
          model: [
            step(W.sum(parts('pre', 'heat')), 'Cover <b>pre</b>. Read <b>heat</b>.'),
            step(W.means('before', 'heat the oven first, then bake')),
            step(W.sent('We <b>prepaid</b> for the ferry tickets online.'), 'A second word, in a sentence.'),
            step(W.sum(parts('pre', 'paid')), 'Paid ahead of time, before the trip.'),
            step(W.tile('press') + ' ' + W.tile('pretty'), 'Careful: cover "pre" here and no word is left. No prefix.')
          ],
          coach: '<p>Link it to things the child knows: a movie preview, preschool, a pre-test.</p>',
          mistake: '<p>Seeing a prefix in words like <b>press</b> or <b>pretty</b>. Cover "pre": if no word is left, there is no prefix.</p>' }, prefixQs('pre')),
        Object.assign({ slug: 'dis', title: 'dis- means not', exp: ['B2.1', 'B2.2'], skill: 'dis',
          model: [
            step(W.sum(parts('dis', 'agree')), 'Cover <b>dis</b>. Read <b>agree</b>.'),
            step(W.means('not', 'the opposite of agree')),
            step(W.sent('The twins <b>disagree</b> about the best team.'), 'One says yes, one says no.'),
            step(W.sum(parts('dis', 'honest')), 'Second example. Cover, read, add.'),
            step(W.sent('It was <b>dishonest</b> to copy the answers.'), 'Not honest.')
          ],
          coach: '<p>Play "opposites": you say a word (like, honest, obey) and the child adds dis- and uses it in a sentence.</p>',
          mistake: '<p>Mixing up dis- and mis-. Ask: "Is it the opposite, or done the wrong way?"</p>' }, prefixQs('dis'))
      ]
    }, {
      id: 'spelling', title: 'Spelling with suffixes', sub: 'Small rules that work in many words.',
      concepts: [
        { slug: 'drop-e', title: 'Drop the e before a vowel suffix', exp: ['B2.1'], skill: 'drop-e',
          model: [
            step(plus(['adore', 'able']), '<b>able</b> starts with a vowel.'),
            step(W.tile('adorable'), 'So the e goes.'),
            step(plus(['excite', 'ment']), '<b>ment</b> starts with a consonant.'),
            step(W.tile('excitement'), 'So the e stays.'),
            step(plus(['skate', 'ing']) + ' ' + plus(['safe', 'ty']), 'Two more: look at the first letter of each suffix.'),
            step(W.tile('skating') + ' ' + W.tile('safety'))
          ],
          guided: [function () { return eWord(1); }, function () { return dropOrKeep(1); }, function () { return eSentence(1); }],
          check: [function () { return eWord(2); }, function () { return dropOrKeep(2); }, function () { return eSentence(2); }, function () { return eTf(2); }, function () { return pickSpelled(2); }],
          coach: '<p>Write the suffixes -able, -ing, -ion, -ous, -ment, -ful and -ly on cards. Sort them: vowel at the start, or consonant?</p>',
          mistake: '<p>Dropping the e every time (movment). Only drop it when the suffix starts with a vowel.</p>' },
        { slug: 'able-ible', title: '-able or -ible?', exp: ['B2.1'], skill: 'able-ible',
          model: [
            step(W.tile('wash', 'base') + ' ' + W.tile('able', 'suffix'), '<b>wash</b> is a whole word: <b>-able</b>.'),
            step(W.tile('washable'), 'You can wash it.'),
            step(W.tile('vis', 'syl') + ' ' + W.tile('ible', 'suffix'), '<b>vis</b> is not a word by itself: <b>-ible</b>.'),
            step(W.tile('visible'), 'You can see it.'),
            step(W.tile('afford', 'base') + ' ' + W.tile('poss', 'syl'), 'Two more. Cover the ending first.'),
            step(W.tile('affordable') + ' ' + W.tile('possible'))
          ],
          guided: [function () { return ableIble(1); }, function () { return wholeWord(1); }, function () { return ableSpelled(1); }],
          check: [function () { return ableIble(2); }, function () { return ableSpelled(2); }, function () { return ableSentence(2); }, function () { return pickAble(2); }, function () { return wholeWord(2); }],
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
            step(W.tile('tele') + ' ' + W.tile('scope'), 'Same <b>tele</b>, new root: <b>scope</b> = see.'),
            step(W.tile('telescope'), 'See far away.'),
            step(W.tile('bio') + ' ' + W.tile('graphy'), '<b>bio</b> = life. <b>graph</b> = write.'),
            step(W.tile('biography'), 'Writing about a life.')
          ],
          guided: [function () { return rootMeaning(1); }, function () { return matchRoots(1); }, function () { return tapRoot(1); }],
          check: [function () { return rootMeaning(2); }, function () { return tapRoot(2); }, function () { return rootTf(2); }, function () { return pickRoot(2); }, function () { return matchRoots(2); }],
          coach: '<p>Make a root web: write "graph" in the middle and add every word you can find (photograph, paragraph, autograph).</p>',
          mistake: '<p>Expecting every word to split neatly. Roots are clues to meaning; check the sentence too.</p>' },
        { slug: 'roots-use', title: 'Roots unlock new words', exp: ['B2.2'], skill: 'root-words',
          model: [
            step(W.sent('The <b>spectators</b> cheered from the stands.'), 'A long word.'),
            step(W.tile('<b>spect</b>ator'), '<b>spect</b> = look.'),
            step(W.means('people', 'people who look on')),
            step(W.sent('The volcano could <b>erupt</b> at any time.'), 'Another one.'),
            step(W.tile('e<b>rupt</b>'), '<b>rupt</b> = break. To break out.')
          ],
          guided: [function () { return rootWord(1); }, function () { return rootSentence(1); }, function () { return matchRootWords(1); }],
          check: [function () { return rootWord(2); }, function () { return rootSentence(2); }, function () { return rootWordTf(2); }, function () { return matchRootWords(2); }, function () { return rootSentence(3); }],
          coach: '<p>When you meet a long word in a science or social studies book, hunt for a root together before looking it up.</p>',
          mistake: '<p>Seeing a root in any matching letters (sport has "port" but is not about carrying). Check the meaning fits.</p>' }
      ]
    }],
    practice: [
      { id: 'mis', name: 'The prefix mis-', code: 'B2.1, B2.2', gen: function (lv) { return meaning(lv, 'mis'); } },
      { id: 'pre', name: 'The prefix pre-', code: 'B2.1, B2.2', gen: function (lv) { return meaning(lv, 'pre'); } },
      { id: 'dis', name: 'The prefix dis-', code: 'B2.1, B2.2', gen: function (lv) { return meaning(lv, 'dis'); } },
      { id: 'drop-e', name: 'Drop the e or keep it', code: 'B2.1', gen: eWord },
      { id: 'able-ible', name: '-able or -ible', code: 'B2.1', gen: ableIble },
      { id: 'roots', name: 'Greek and Latin roots', code: 'B2.2', gen: rootMeaning },
      { id: 'root-words', name: 'Use a root to read a word', code: 'B2.2', gen: rootWord }
    ]
  });

  Q.shapes('word-parts', {
    mis: prefixSkill('mis'),
    pre: prefixSkill('pre'),
    dis: prefixSkill('dis'),
    'drop-e': [[1, 'drop-keep', dropOrKeep], [1, 'in-sentence', eSentence], [2, 'true-false', eTf], [2, 'pick', pickSpelled]],
    'able-ible': [[1, 'whole-word', wholeWord], [1, 'spelled', ableSpelled], [2, 'in-sentence', ableSentence], [2, 'pick', pickAble]],
    roots: [[1, 'match', matchRoots], [1, 'tap-root', tapRoot], [2, 'true-false', rootTf], [2, 'pick', pickRoot]],
    'root-words': [[1, 'in-sentence', rootSentence], [1, 'match', matchRootWords], [2, 'true-false', rootWordTf]]
  });
})();
