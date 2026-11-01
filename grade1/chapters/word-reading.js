/* Grade 1: reading and spelling words. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 1:
   B2.4 use phonics knowledge and phonemic blending to read words, and phonemic segmentation to spell phonetically regular
        words, in isolation and various text contexts (here: CVC, CCVC, CVCC, CCVCC and CVCe words).
   B2.5 use developing orthographic knowledge, including position-based tendencies, to make a spelling choice
        (here: ck after a short vowel, ff ll ss zz, k or c, ai or ay, oi or oy, and no word ends in v).
   All words, clues and sentences are written for this site. Answer checks: tests/verify/grade1-word-reading.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words to read and spell, each with a clue (no letter is used twice in a word, so the letter tiles never repeat) */
  var WORDS = [['frog', 'a green animal that hops'], ['drum', 'you bang it to make music'], ['nest', 'a bird' + '’' + 's home'], ['crab', 'it walks sideways on the beach'],
    ['milk', 'a white drink'], ['sled', 'you slide down a snowy hill on it'], ['lamp', 'it gives light'], ['plant', 'it grows in soil'], ['stamp', 'you stick it on a letter'],
    ['jump', 'go up in the air'], ['hand', 'it has five fingers'], ['gift', 'a present'], ['swim', 'what fish do'], ['flag', 'it waves on a pole'], ['snack', 'a small bite between meals'],
    ['kite', 'it flies on a string'], ['cub', 'a baby bear'], ['web', 'a spider makes it'], ['mud', 'wet, sticky dirt'], ['fox', 'an animal with a bushy tail']];
  /* a sentence and the word that fits it, with words that look alike */
  var FIT = [['The ___ swims in the lake.', 'fish', ['dish', 'fist']], ['I hit the ___ with a stick.', 'drum', ['drip', 'dump']], ['We camp in a ___.', 'tent', ['ten', 'test']],
    ['The bird sits on its ___.', 'nest', ['net', 'next']], ['Mom lit the ___.', 'lamp', ['lump', 'limp']], ['Can you ___ over the log?', 'jump', ['jam', 'pump']],
    ['A ___ hops in the pond.', 'frog', ['from', 'fog']], ['I drink a cup of ___.', 'milk', ['mink', 'mill']], ['The ___ waves in the wind.', 'flag', ['flap', 'fly']],
    ['I put on my ___ in the cold.', 'hat', ['hit', 'hut']], ['The ___ ate the cheese.', 'rat', ['ran', 'rot']], ['Please ___ the door.', 'shut', ['shot', 'shed']],
    ['The ___ barks at the cat.', 'dog', ['dig', 'dot']], ['We ride on the ___ to school.', 'bus', ['bun', 'bug']]];

  /* spelling choices: [right, wrong, wrong, rule] */
  var SPELL = [['duck', 'duk', 'duc', 'ck'], ['back', 'bak', 'bac', 'ck'], ['sock', 'sok', 'soc', 'ck'], ['neck', 'nek', 'nec', 'ck'], ['truck', 'truk', 'truc', 'ck'], ['rock', 'rok', 'roc', 'ck'],
    ['pack', 'pak', 'pac', 'ck'], ['lock', 'lok', 'loc', 'ck'], ['kick', 'kik', 'kic', 'ck'], ['stick', 'stik', 'stic', 'ck'], ['black', 'blak', 'blac', 'ck'], ['clock', 'clok', 'cloc', 'ck'],
    ['bell', 'bel', 'beel', 'll'], ['hill', 'hil', 'hiel', 'll'], ['doll', 'dol', 'dool', 'll'], ['puff', 'puf', 'pugh', 'ff'], ['cliff', 'clif', 'clife', 'ff'], ['kiss', 'kis', 'kise', 'ss'],
    ['dress', 'dres', 'drese', 'ss'], ['buzz', 'buz', 'buze', 'zz'],
    ['well', 'wel', 'weel', 'll'], ['fill', 'fil', 'fiel', 'll'], ['grass', 'gras', 'grase', 'ss'], ['miss', 'mis', 'mise', 'ss'], ['off', 'of', 'ofe', 'ff'], ['fuzz', 'fuz', 'fuze', 'zz'],
    ['kit', 'cit', 'qit', 'kc'], ['kid', 'cid', 'ckid', 'kc'], ['keg', 'ceg', 'ckeg', 'kc'], ['cat', 'kat', 'ckat', 'kc'], ['cup', 'kup', 'ckup', 'kc'], ['cot', 'kot', 'ckot', 'kc'],
    ['king', 'cing', 'cking', 'kc'], ['kept', 'cept', 'ckept', 'kc'], ['camp', 'kamp', 'ckamp', 'kc'], ['cub', 'kub', 'ckub', 'kc'], ['can', 'kan', 'ckan', 'kc'], ['cut', 'kut', 'ckut', 'kc'],
    ['rain', 'rayn', 'rane', 'ai'], ['tail', 'tayl', 'tael', 'ai'], ['day', 'dai', 'dae', 'ai'], ['play', 'plai', 'plae', 'ai'], ['coin', 'coyn', 'coen', 'oi'], ['boil', 'boyl', 'boel', 'oi'],
    ['boy', 'boi', 'boye', 'oi'], ['toy', 'toi', 'toye', 'oi'],
    ['paint', 'paynt', 'pante', 'ai'], ['stay', 'stai', 'stae', 'ai'], ['soil', 'soyl', 'soel', 'oi'], ['joy', 'joi', 'joye', 'oi'], ['have', 'hav', 'haf', 've'], ['give', 'giv', 'givv', 've'], ['love', 'luv', 'lov', 've'], ['live', 'liv', 'lyv', 've'], ['five', 'fiv', 'fyv', 've']];
  var rule = function (r) { return SPELL.filter(function (s) { return s[3] === r || (r === 'double' && /^(ll|ff|ss|zz)$/.test(s[3])); }); };
  var EXTRA = 'bdghkmprtw'.split('');

  /* ---------- question makers: reading and spelling ---------- */
  /* read the word, pick what it means */
  function readMeaning(lv) {
    var w = R.pick(WORDS);
    return Q.one('Read the word. What is it?', w[1], R.some(WORDS.filter(function (x) { return x !== w; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), { fig: W.tile(w[0]),
      prompt: 'Say each sound, left to right. Then blend them.', hint: 'Point to each letter and say its sound. Then say them fast.',
      explain: W.tile(w[0]) + ': ' + w[1] + '.', steps: ['Say each sound: ' + w[0].split('').join(' - ') + '.', 'Blend them: <b>' + w[0] + '</b>.'], meta: { k: 'g1-read-meaning', word: w[0] } });
  }
  /* spell the word for a clue from letter tiles */
  function spellClue(lv) {
    var w = R.pick(WORDS.filter(function (x) { return lv > 1 || x[0].length <= 4; })), letters = w[0].split('');
    var extra = R.some(EXTRA.filter(function (l) { return letters.indexOf(l) < 0; }), lv > 1 ? 2 : 1);
    return { q: 'Spell the word for: <i>' + w[1] + '</i>.', type: 'build', parts: letters.concat(extra), answer: letters.map(function (l, i) { return i; }),
      prompt: 'Say the word slowly. Write one letter for each sound.', hint: 'Say the first sound. Which letter makes it? Then the next sound.',
      explain: W.tile(w[0]), meta: { k: 'g1-spell-clue', clue: w[1] } };
  }
  function fitWord(lv) {
    var f = R.pick(FIT);
    return Q.one('Which word fits?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(f[0].replace('___', W.gap())),
      prompt: 'Read each word carefully. Then read the sentence with it.', hint: 'The words look alike. Sound out each one.',
      explain: W.sent(f[0].replace('___', '<b>' + f[1] + '</b>')), meta: { k: 'g1-fit-word', s: f[0] } });
  }
  /* sound it out: which word is it? (letters shown spaced out) */
  function blendRead(lv) {
    var w = R.pick(WORDS), look = WORDS.filter(function (x) { return x !== w && x[0].charAt(0) === w[0].charAt(0); }).map(function (x) { return x[0]; });
    var wrong = look.concat(R.some(WORDS.filter(function (x) { return x !== w; }), 3).map(function (x) { return x[0]; }));
    return Q.one('Sound it out. What word is it?', w[0], wrong.slice(0, lv > 1 ? 3 : 2), { fig: w[0].split('').map(function (l) { return W.tile(l, 'syl'); }).join(''),
      hint: 'Say each sound, then blend.', explain: W.tile(w[0]), meta: { k: 'g1-blend-read', word: w[0] } });
  }

  /* ---------- question makers: spelling patterns ---------- */
  function spellRight(lv, r) {
    var s = R.pick(r ? rule(r) : SPELL);
    return Q.one('Which word is spelled right?', s[0], s.slice(1, lv > 1 ? 3 : 2), { prompt: 'Think about where the sound is in the word.',
      hint: s[3] === 'ck' ? 'After a short vowel, /k/ at the end is ck.' : s[3] === 'kc' ? 'k before e or i. c before a, o or u.' : s[3] === 'ai' ? 'ai in the middle. ay at the end.' : s[3] === 'oi' ? 'oi in the middle. oy at the end.' : s[3] === 've' ? 'No English word ends in v. Add an e.' : 'One short word, a short vowel: double the f, l, s or z at the end.',
      explain: W.tile(s[0]), meta: { k: 'g1-spell-right', rule: s[3], word: s[0] } });
  }
  function fillEnd(lv, r) {
    var s = R.pick(rule(r)), end = s[0].slice(-2), stem = s[0].slice(0, -2);
    var tiles = end === 'ck' ? ['k', 'c'] : [end.charAt(0)];
    return Q.tiles('Which ending fits?', end, tiles.concat(lv > 2 ? ['ke'] : []), { fig: '<span class="sent">' + stem + W.gap() + '</span>',
      prompt: 'Is the vowel short? Is the word short?', hint: 'Short vowel, then /k/: ck. Short vowel, then f, l, s or z: double it.',
      explain: W.tile(s[0]), meta: { k: 'g1-fill-end', stem: stem } });
  }
  function kOrC(lv) {
    var s = R.pick(rule('kc')), first = s[0].charAt(0);
    return Q.tiles('Which letter starts the word?', first, [first === 'k' ? 'c' : 'k'].concat(lv > 1 ? ['ck'] : []), { fig: '<span class="sent">' + W.gap() + s[0].slice(1) + '</span>',
      prompt: 'Look at the letter after the gap.', hint: 'k goes before e or i. c goes before a, o or u.', explain: W.tile(s[0]), meta: { k: 'g1-k-or-c', rest: s[0].slice(1) } });
  }
  function aiAy(lv) {
    var s = R.pick(rule('ai').concat(lv > 1 ? rule('oi') : [])), team = /ay|oy/.test(s[0]) ? s[0].slice(-2) : /ai/.test(s[0]) ? 'ai' : 'oi', at = s[0].indexOf(team);
    var pair = { ai: 'ay', ay: 'ai', oi: 'oy', oy: 'oi' };
    return Q.tiles('Which letters fill the gap?', team, [pair[team]], { fig: '<span class="sent">' + s[0].slice(0, at) + W.gap() + s[0].slice(at + 2) + '</span>',
      prompt: 'Is the gap at the end of the word?', hint: team.charAt(0) + 'y at the end. ' + team.charAt(0) + 'i in the middle.', explain: W.tile(s[0]), meta: { k: 'g1-ai-ay', word: s[0] } });
  }
  function pickRight() {
    var ss = R.some(SPELL, 4), nRight = R.int(1, 3);
    return Q.all('Pick every word that is spelled right.', ss.slice(0, nRight).map(function (s) { return s[0]; }), ss.slice(nRight).map(function (s) { return s[1]; }), {
      hint: 'Check the end of each word.', explain: 'Right: ' + ss.slice(0, nRight).map(function (s) { return s[0]; }).join(', ') + '.', meta: { k: 'g1-pick-right' } });
  }

  /* ---------- more question makers ---------- */
  var PICWORDS = ['cat', 'dog', 'pig', 'fox', 'bus', 'cup', 'sun', 'map', 'jet', 'van', 'hat', 'box', 'bed', 'nest', 'kite', 'fish'];
  function readPic(lv) {
    var w = R.pick(PICWORDS), wrong = R.some(PICWORDS.filter(function (x) { return x !== w; }), lv > 1 ? 3 : 2), all = R.shuffle([w].concat(wrong));
    return { q: 'Read the word. Tap its picture.', fig: W.tile(w), type: 'tap', tiles: all.map(function (x) { return W.pic(x); }), answer: all.indexOf(w), answerText: w,
      prompt: 'Say each sound, then blend.', hint: 'Sound it out, left to right.', explain: W.pic(w) + W.tile(w), meta: { k: 'g1-read-pic', w: w } };
  }
  function readTf() {
    var w = R.pick(WORDS), right = R.int(0, 1) === 1, said = right ? w[1] : R.pick(WORDS.filter(function (x) { return x !== w; }))[1];
    return { q: Q.name() + ' reads this word. ' + Q.name() + ' says it means: <i>' + said + '</i>.', fig: W.tile(w[0]), type: 'tf', answer: right,
      why: { options: ['That is what the word means.', 'The word says something else.'], answer: right ? 0 : 1 },
      hint: 'Sound it out first.', explain: W.tile(w[0]) + ': ' + w[1] + '.', meta: { k: 'g1-read-tf', word: w[0], said: said } };
  }
  function spellPic(lv) {
    var w = R.pick(PICWORDS.filter(function (x) { return lv > 1 || x.length === 3; })), letters = w.split(''), extra = R.some(EXTRA.filter(function (l) { return letters.indexOf(l) < 0; }), lv > 1 ? 2 : 1);
    return { q: 'Spell the word.', fig: W.pic(w), type: 'build', parts: letters.concat(extra), answer: letters.map(function (l, i) { return i; }),
      hint: 'Say it slowly. One letter for each sound.', explain: W.tile(w), meta: { k: 'g1-spell-pic', w: w } };
  }
  function spellMissing(lv) {
    var w = R.pick(WORDS.filter(function (x) { return x[0].length >= 4 && !/e$/.test(x[0]); })), i = R.int(1, w[0].length - 2), l = w[0].charAt(i);
    return Q.tiles('Which letter is missing? <i>' + w[1] + '</i>', l, R.some(EXTRA.concat(['a', 'e', 'i', 'o', 'u']).filter(function (x) { return w[0].indexOf(x) < 0; }), lv > 1 ? 3 : 2), {
      fig: '<span class="sent">' + w[0].slice(0, i) + W.gap() + w[0].slice(i + 1) + '</span>', hint: 'Say the word slowly. Which sound is missing?', explain: W.tile(W.hl(w[0], i, i + 1)), meta: { k: 'g1-spell-missing', clue: w[1], at: i } });
  }
  function spellChoose(lv) {
    var w = R.pick(WORDS.filter(function (x) { return x[0].length >= 4; })), mixed = w[0].charAt(0) + w[0].charAt(2) + w[0].charAt(1) + w[0].slice(3), short = w[0].slice(0, 1) + w[0].slice(2);
    return Q.one('Which is the right spelling? <i>' + w[1] + '</i>', w[0], [mixed, short].filter(function (x) { return x !== w[0]; }).slice(0, lv > 1 ? 2 : 1), {
      hint: 'Say each sound in order.', explain: W.tile(w[0]), meta: { k: 'g1-spell-choose', clue: w[1] } });
  }
  function fitTf(lv) {
    var f = R.pick(FIT), right = R.int(0, 1) === 1, said = right ? f[1] : R.pick(f[2]);
    return { q: 'Does this sentence make sense?', fig: W.sent(f[0].replace('___', '<b>' + said + '</b>')), type: 'tf', answer: right,
      why: { options: ['The word fits.', 'A word that looks like it would fit.'], answer: right ? 0 : 1 },
      hint: 'Sound out the word in bold. Does it make sense?', explain: W.sent(f[0].replace('___', '<b>' + f[1] + '</b>')), meta: { k: 'g1-fit-tf', s: f[0], said: said } };
  }
  function fitWrong() {
    var f = R.pick(FIT), bad = R.pick(f[2]), words = f[0].replace('___', bad).split(' ');
    return { q: 'One word does not make sense. Tap it.', type: 'tap', tiles: words, answer: words.map(function (w) { return w.replace(/[.,?!]/g, ''); }).indexOf(bad), answerText: bad, hint: 'Read each word carefully.',
      explain: W.sent(f[0].replace('___', '<b>' + f[1] + '</b>')), meta: { k: 'g1-fit-wrong', s: f[0] } };
  }
  function fitSentence(lv) {
    var f = R.pick(FIT);
    return Q.one('Which sentence makes sense?', f[0].replace('___', f[1]), f[2].slice(0, lv > 1 ? 2 : 1).map(function (w) { return f[0].replace('___', w); }), {
      hint: 'Sound out each word that is different.', explain: W.sent(f[0].replace('___', '<b>' + f[1] + '</b>')), meta: { k: 'g1-fit-sentence', s: f[0] } });
  }
  function ruleTf(r) {
    var s = R.pick(rule(r)), right = R.int(0, 1) === 1, said = right ? s[0] : s[1];
    return { q: 'Is this word spelled right?', fig: W.tile(said), type: 'tf', answer: right,
      why: { options: ['It follows the spelling rule.', 'It breaks the spelling rule.'], answer: right ? 0 : 1 },
      hint: 'Check where the sound is in the word.', explain: W.tile(s[0]), meta: { k: 'g1-rule-tf', said: said } };
  }
  function rulePick(r) {
    var ss = R.some(rule(r), 4), nRight = R.int(1, 3);
    return Q.all('Pick every word that is spelled right.', ss.slice(0, nRight).map(function (s) { return s[0]; }), ss.slice(nRight).map(function (s) { return s[1]; }), {
      hint: 'Check the spelling rule.', explain: 'Right: ' + ss.slice(0, nRight).map(function (s) { return s[0]; }).join(', ') + '.', meta: { k: 'g1-pick-right' } });
  }
  var MIXED = ['ai', 'oi', 've'];
  function endTf() { return ruleTf(R.pick(MIXED)); }
  function endPick() {
    var ss = R.some(rule('ai').concat(rule('oi'), rule('ve')), 4), nRight = R.int(1, 3);
    return Q.all('Pick every word that is spelled right.', ss.slice(0, nRight).map(function (s) { return s[0]; }), ss.slice(nRight).map(function (s) { return s[1]; }), {
      hint: 'y at the end. i in the middle. No word ends in v.', explain: 'Right: ' + ss.slice(0, nRight).map(function (s) { return s[0]; }).join(', ') + '.', meta: { k: 'g1-pick-right' } });
  }

  Atlas.register('word-reading', {
    full: true,
    lessons: [{
      id: 'read-spell', title: 'Sound it out', sub: 'Blend sounds to read a word. Split a word into sounds to spell it.',
      concepts: [
        { slug: 'blend-read', title: 'Read left to right', exp: ['B2.4'], skill: 'read-words',
          model: [
            step(W.tile('f', 'syl') + W.tile('r', 'syl') + W.tile('o', 'syl') + W.tile('g', 'syl'), '/f/ /r/ /o/ /g/'),
            step(W.tile('frog'), 'Blend them: <b>frog</b>.'),
            step(W.tile('p', 'syl') + W.tile('l', 'syl') + W.tile('a', 'syl') + W.tile('n', 'syl') + W.tile('t', 'syl'), 'Five sounds.'),
            step(W.tile('plant'), 'Same way: <b>plant</b>.')
          ],
          guided: [function () { return blendRead(1); }, function () { return readPic(1); }, function () { return readMeaning(1); }],
          check: [function () { return blendRead(2); }, function () { return readPic(2); }, function () { return readMeaning(2); }, readTf, function () { return blendRead(3); }],
          coach: '<p>Run a finger under the word, left to right, as the child says each sound. Then sweep the finger fast to blend.</p>',
          mistake: '<p>Guessing from the first letter ("fog" for frog). Point to every letter, including the middle ones.</p>' },
        { slug: 'spell', title: 'Spell it sound by sound', exp: ['B2.4'], skill: 'spell-words',
          model: [
            step(W.sent('<i>a bird' + '’' + 's home</i>'), 'Say it slowly: n-e-s-t.'),
            step(W.tile('n') + W.tile('e') + W.tile('s') + W.tile('t'), 'One letter for each sound.'),
            step(W.pic('fox'), 'f-o-x.'),
            step(W.tile('f') + W.tile('o') + W.tile('x'), 'x says two sounds at once.')
          ],
          guided: [function () { return spellClue(1); }, function () { return spellPic(1); }, function () { return spellMissing(1); }],
          check: [function () { return spellClue(1); }, function () { return spellPic(2); }, function () { return spellChoose(2); }, function () { return spellMissing(2); }, function () { return spellClue(2); }],
          coach: '<p>Draw one box per sound. The child says the word slowly and writes one letter (or pair) in each box.</p>',
          mistake: '<p>Leaving out the second sound in a blend (fog for frog). Stretch the start: "fff-rrr-og".</p>' },
        { slug: 'in-sentences', title: 'Words in sentences', exp: ['B2.4'], skill: 'word-fit',
          model: [
            step(W.sent('The ' + W.gap() + ' swims in the lake.')),
            step(W.tile('fish') + W.tile('dish'), 'They look alike. Sound out both.'),
            step(W.sent('The <b>fish</b> swims in the lake.'), 'It makes sense.'),
            step(W.sent('The <b>rot</b> ate the cheese.'), 'Something is wrong.'),
            step(W.sent('The <b>rat</b> ate the cheese.'), 'Check every letter.')
          ],
          guided: [function () { return fitWord(1); }, function () { return fitTf(1); }, function () { return fitSentence(1); }],
          check: [function () { return fitWord(2); }, fitWrong, function () { return fitSentence(2); }, function () { return fitTf(2); }, function () { return fitWord(3); }],
          coach: '<p>After the child sounds out a word in a book, ask: "Does that make sense in the sentence?" Both checks matter: the letters and the meaning.</p>',
          mistake: '<p>Choosing a word that makes sense but does not match the letters. Check every sound.</p>' }
      ]
    }, {
      id: 'patterns', title: 'Spelling patterns', sub: 'Where a spelling goes in a word.',
      concepts: [
        { slug: 'ck', title: 'ck at the end', exp: ['B2.5'], skill: 'ck',
          model: [
            step(W.tile(W.hl('duck', 1, 4)), 'A short vowel, then /k/.'),
            step(W.tile('duk'), 'Not k.'),
            step(W.tile(W.hl('duck', 2, 4)) + W.tile(W.hl('sock', 2, 4)) + W.tile(W.hl('back', 2, 4))),
            step(W.tile(W.hl('clock', 2, 5)), 'Again: short o, then /k/.'),
            step(W.tile(W.hl('clock', 3, 5)), '<b>ck</b>.')
          ],
          guided: [function () { return fillEnd(1, 'ck'); }, function () { return spellRight(1, 'ck'); }, function () { return ruleTf('ck'); }],
          check: [function () { return fillEnd(1, 'ck'); }, function () { return spellRight(2, 'ck'); }, function () { return rulePick('ck'); }, function () { return ruleTf('ck'); }, function () { return fillEnd(3, 'ck'); }],
          coach: '<p>Say: "Short vowel, ck at the end." Sort cards: duck, sock, back go in the ck pile.</p>',
          mistake: '<p>Writing "duk". Ask: is the vowel short, and is /k/ right after it?</p>' },
        { slug: 'double', title: 'Double f, l, s and z', exp: ['B2.5'], skill: 'double',
          model: [
            step(W.tile(W.hl('bell', 2, 4)), 'Short word, short vowel: <b>ll</b>.'),
            step(W.tile(W.hl('kiss', 2, 4)) + W.tile(W.hl('puff', 2, 4)) + W.tile(W.hl('buzz', 2, 4))),
            step(W.tile('gras') + ' ?', 'One s?'),
            step(W.tile(W.hl('grass', 3, 5)), 'Short a, then /s/: <b>ss</b>.')
          ],
          guided: [function () { return spellRight(1, 'double'); }, function () { return fillEnd(1, 'double'); }, function () { return ruleTf('double'); }],
          check: [function () { return spellRight(1, 'double'); }, function () { return fillEnd(2, 'double'); }, function () { return rulePick('double'); }, function () { return ruleTf('double'); }, function () { return spellRight(2, 'double'); }],
          coach: '<p>A rhyme helps: "f, l, s and z, double up at the end." Common exceptions (bus, gas, yes) come later.</p>',
          mistake: '<p>Writing one letter (bel). Say the rule, then check the end of the word.</p>' },
        { slug: 'k-c', title: 'k or c at the start', exp: ['B2.5'], skill: 'k-c',
          model: [
            step(W.tile(W.hl('kit', 0, 2)), '<b>k</b> before e or i.'),
            step(W.tile(W.hl('king', 0, 2)) + W.tile(W.hl('kept', 0, 2))),
            step(W.tile(W.hl('cat', 0, 2)) + W.tile(W.hl('cup', 0, 2)), '<b>c</b> before a, o or u.'),
            step(W.tile(W.hl('camp', 0, 2)) + W.tile(W.hl('cot', 0, 2)))
          ],
          guided: [function () { return kOrC(1); }, function () { return spellRight(1, 'kc'); }, function () { return ruleTf('kc'); }],
          check: [function () { return kOrC(1); }, function () { return spellRight(2, 'kc'); }, function () { return rulePick('kc'); }, function () { return ruleTf('kc'); }, function () { return kOrC(2); }],
          coach: '<p>Make two columns: k (e, i) and c (a, o, u). Read words and sort them.</p>',
          mistake: '<p>Writing "kat". Look at the letter after the /k/ sound.</p>' },
        { slug: 'ai-ay', title: 'ai or ay? oi or oy?', exp: ['B2.5'], skill: 'ai-ay',
          model: [
            step(W.tile(W.hl('rain', 1, 3)) + W.tile(W.hl('day', 1, 3)), '<b>ai</b> in the middle. <b>ay</b> at the end.'),
            step(W.tile(W.hl('coin', 1, 3)) + W.tile(W.hl('toy', 1, 3)), '<b>oi</b> in the middle. <b>oy</b> at the end.'),
            step(W.tile('giv') + ' ?', 'No word ends in v.'),
            step(W.tile(W.hl('give', 3, 4)), 'Add e.')
          ],
          guided: [function () { return aiAy(1); }, function () { return spellRight(1, 'ai'); }, endTf],
          check: [function () { return aiAy(2); }, function () { return spellRight(1, 've'); }, endPick, endTf, function () { return spellRight(2, 'oi'); }],
          coach: '<p>Say: "y at the end, i in the middle." The same rule works for ai and ay, and for oi and oy.</p>',
          mistake: '<p>Writing "dai" or "boi". Ask: is the sound at the end of the word?</p>' }
      ]
    }],
    practice: [
      { id: 'read-words', name: 'Read words', code: 'B2.4', gen: blendRead },
      { id: 'spell-words', name: 'Spell words', code: 'B2.4', gen: spellClue },
      { id: 'word-fit', name: 'Words in sentences', code: 'B2.4', gen: fitWord },
      { id: 'ck', name: 'ck at the end', code: 'B2.5', gen: function (lv) { return fillEnd(lv, 'ck'); } },
      { id: 'double', name: 'Double f, l, s and z', code: 'B2.5', gen: function (lv) { return spellRight(lv, 'double'); } },
      { id: 'k-c', name: 'k or c at the start', code: 'B2.5', gen: kOrC },
      { id: 'ai-ay', name: 'ai or ay, oi or oy, and ve', code: 'B2.5', gen: aiAy }
    ],
    tasks: [
      { id: 'word-list', title: 'Read a word list', code: 'B2.4', pic: W.icon('read'), say: 'Read each word to your grown-up.',
        text: W.passage('Read these words', ['sun &middot; map &middot; pig &middot; bed &middot; hop', 'ship &middot; chin &middot; duck &middot; thin &middot; when', 'frog &middot; drum &middot; stop &middot; flag &middot; snack', 'milk &middot; hand &middot; jump &middot; nest &middot; tent', 'kite &middot; cape &middot; tree &middot; rain &middot; boat']),
        run: ['The child reads each row aloud. Mark any word read wrong.', 'For a missed word, point to each letter and ask for the sounds, then blend together.', 'Then say three of the words for the child to spell on paper.'],
        rubric: ['Reads only a few words.', 'Reads the first rows; sounds out slowly.', 'Reads most words correctly and spells three short words.', 'Reads all rows smoothly and spells longer words.'] }
    ]
  });

  Q.shapes('word-reading', {
    'read-words': [[1, 'meaning', readMeaning], [1, 'picture', readPic], [2, 'tf', readTf]],
    'spell-words': [[1, 'picture', spellPic], [1, 'missing', spellMissing], [2, 'choose', spellChoose]],
    'word-fit': [[1, 'tf', fitTf], [1, 'sentence', fitSentence], [2, 'tap-wrong', fitWrong]],
    ck: [[1, 'spell-right', function (lv) { return spellRight(lv, 'ck'); }], [2, 'pick', function () { return rulePick('ck'); }], [1, 'tf', function () { return ruleTf('ck'); }]],
    double: [[1, 'fill-end', function (lv) { return fillEnd(lv, 'double'); }], [2, 'pick', function () { return rulePick('double'); }], [1, 'tf', function () { return ruleTf('double'); }]],
    'k-c': [[1, 'spell-right', function (lv) { return spellRight(lv, 'kc'); }], [2, 'pick', function () { return rulePick('kc'); }], [1, 'tf', function () { return ruleTf('kc'); }]],
    'ai-ay': [[1, 'spell-right', function (lv) { return spellRight(lv, R.pick(MIXED)); }], [2, 'pick', endPick], [1, 'tf', endTf]]
  });
})();
