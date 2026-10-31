/* Grade 1: reading and spelling words.
   Ontario 2023 Language, Grade 1:
   B2.4 use phonics knowledge and phonemic blending to read words, and phonemic segmentation to spell phonetically regular
        words, in isolation and various text contexts (here: CVC, CCVC, CVCC, CCVCC and CVCe words).
   B2.5 use developing orthographic knowledge, including position-based tendencies, to make a spelling choice
        (here: ck after a short vowel, ff ll ss zz, k or c, ai or ay, oi or oy, and no word ends in v).
   All words, clues and sentences are written for this site. Answer checks: tests/verify/grade1-words.js. */
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
    ['A ___ hops in the pond.', 'frog', ['from', 'fog']], ['I drink a cup of ___.', 'milk', ['mink', 'mill']], ['The ___ waves in the wind.', 'flag', ['flap', 'fly']]];

  /* spelling choices: [right, wrong, wrong, rule] */
  var SPELL = [['duck', 'duk', 'duc', 'ck'], ['back', 'bak', 'bac', 'ck'], ['sock', 'sok', 'soc', 'ck'], ['neck', 'nek', 'nec', 'ck'], ['truck', 'truk', 'truc', 'ck'], ['rock', 'rok', 'roc', 'ck'],
    ['bell', 'bel', 'beel', 'll'], ['hill', 'hil', 'hiel', 'll'], ['doll', 'dol', 'dool', 'll'], ['puff', 'puf', 'pugh', 'ff'], ['cliff', 'clif', 'clife', 'ff'], ['kiss', 'kis', 'kise', 'ss'],
    ['dress', 'dres', 'drese', 'ss'], ['buzz', 'buz', 'buze', 'zz'],
    ['kit', 'cit', 'qit', 'kc'], ['kid', 'cid', 'ckid', 'kc'], ['keg', 'ceg', 'ckeg', 'kc'], ['cat', 'kat', 'ckat', 'kc'], ['cup', 'kup', 'ckup', 'kc'], ['cot', 'kot', 'ckot', 'kc'],
    ['rain', 'rayn', 'rane', 'ai'], ['tail', 'tayl', 'tael', 'ai'], ['day', 'dai', 'dae', 'ai'], ['play', 'plai', 'plae', 'ai'], ['coin', 'coyn', 'coen', 'oi'], ['boil', 'boyl', 'boel', 'oi'],
    ['boy', 'boi', 'boye', 'oi'], ['toy', 'toi', 'toye', 'oi'], ['have', 'hav', 'haf', 've'], ['give', 'giv', 'givv', 've'], ['love', 'luv', 'lov', 've']];
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
  function fillEnd(lv) {
    var s = R.pick(lv > 1 ? rule('ck').concat(rule('double')) : rule('ck')), end = s[0].slice(-2), stem = s[0].slice(0, -2);
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

  Atlas.register('words', {
    lessons: [{
      id: 'read-spell', title: 'Sound it out', sub: 'Blend sounds to read a word. Split a word into sounds to spell it.',
      concepts: [
        { slug: 'blend-read', title: 'Read left to right', exp: ['B2.4'], skill: 'read-words',
          model: [
            step(W.tile('f', 'syl') + W.tile('r', 'syl') + W.tile('o', 'syl') + W.tile('g', 'syl'), '/f/ /r/ /o/ /g/'),
            step(W.tile('frog'), 'Blend them: <b>frog</b>.'),
            step(W.tile('plant'), 'Five sounds work the same way.')
          ],
          guided: [function () { return blendRead(1); }, function () { return readMeaning(1); }],
          check: [function () { return blendRead(2); }, function () { return readMeaning(1); }],
          coach: '<p>Run a finger under the word, left to right, as the child says each sound. Then sweep the finger fast to blend.</p>',
          mistake: '<p>Guessing from the first letter ("fog" for frog). Point to every letter, including the middle ones.</p>' },
        { slug: 'spell', title: 'Spell it sound by sound', exp: ['B2.4'], skill: 'read-words',
          model: [
            step(W.sent('<i>a bird' + '’' + 's home</i>'), 'Say it slowly: n-e-s-t.'),
            step(W.tile('n') + W.tile('e') + W.tile('s') + W.tile('t'), 'One letter for each sound.'),
            step(W.tile('nest'))
          ],
          guided: [function () { return spellClue(1); }, function () { return spellClue(1); }],
          check: [function () { return spellClue(1); }, function () { return spellClue(2); }],
          coach: '<p>Draw one box per sound. The child says the word slowly and writes one letter (or pair) in each box.</p>',
          mistake: '<p>Leaving out the second sound in a blend (fog for frog). Stretch the start: "fff-rrr-og".</p>' },
        { slug: 'in-sentences', title: 'Words in sentences', exp: ['B2.4'], skill: 'read-words',
          model: [
            step(W.sent('The ' + W.gap() + ' swims in the lake.')),
            step(W.tile('fish') + W.tile('dish'), 'They look alike. Sound out both.'),
            step(W.sent('The <b>fish</b> swims in the lake.'), 'It makes sense.')
          ],
          guided: [function () { return fitWord(1); }, function () { return fitWord(1); }],
          check: [function () { return fitWord(2); }, function () { return fitWord(2); }],
          coach: '<p>After the child sounds out a word in a book, ask: "Does that make sense in the sentence?" Both checks matter: the letters and the meaning.</p>',
          mistake: '<p>Choosing a word that makes sense but does not match the letters. Check every sound.</p>' }
      ]
    }, {
      id: 'patterns', title: 'Spelling patterns', sub: 'Where a spelling goes in a word.',
      concepts: [
        { slug: 'ck', title: 'ck at the end', exp: ['B2.5'], skill: 'spell-patterns',
          model: [
            step(W.tile(W.hl('duck', 1, 4)), 'A short vowel, then /k/.'),
            step(W.tile('duk'), 'Not k.'),
            step(W.tile(W.hl('duck', 2, 4)) + W.tile(W.hl('sock', 2, 4)) + W.tile(W.hl('back', 2, 4)))
          ],
          guided: [function () { return fillEnd(1); }, function () { return spellRight(1, 'ck'); }],
          check: [function () { return fillEnd(1); }, function () { return spellRight(1, 'ck'); }],
          coach: '<p>Say: "Short vowel, ck at the end." Sort cards: duck, sock, back go in the ck pile.</p>',
          mistake: '<p>Writing "duk". Ask: is the vowel short, and is /k/ right after it?</p>' },
        { slug: 'double', title: 'Double f, l, s and z', exp: ['B2.5'], skill: 'spell-patterns',
          model: [
            step(W.tile(W.hl('bell', 2, 4)), 'Short word, short vowel: <b>ll</b>.'),
            step(W.tile(W.hl('kiss', 2, 4)) + W.tile(W.hl('puff', 2, 4)) + W.tile(W.hl('buzz', 2, 4)))
          ],
          guided: [function () { return spellRight(1, 'double'); }, function () { return spellRight(1, 'double'); }],
          check: [function () { return spellRight(1, 'double'); }, function () { return fillEnd(2); }],
          coach: '<p>A rhyme helps: "f, l, s and z, double up at the end." Common exceptions (bus, gas, yes) come later.</p>',
          mistake: '<p>Writing one letter (bel). Say the rule, then check the end of the word.</p>' },
        { slug: 'k-c', title: 'k or c at the start', exp: ['B2.5'], skill: 'spell-patterns',
          model: [
            step(W.tile(W.hl('kit', 0, 2)), '<b>k</b> before e or i.'),
            step(W.tile(W.hl('cat', 0, 2)) + W.tile(W.hl('cup', 0, 2)), '<b>c</b> before a, o or u.')
          ],
          guided: [function () { return kOrC(1); }, function () { return kOrC(1); }],
          check: [function () { return kOrC(1); }, function () { return spellRight(1, 'kc'); }],
          coach: '<p>Make two columns: k (e, i) and c (a, o, u). Read words and sort them.</p>',
          mistake: '<p>Writing "kat". Look at the letter after the /k/ sound.</p>' },
        { slug: 'ai-ay', title: 'ai or ay? oi or oy?', exp: ['B2.5'], skill: 'spell-patterns',
          model: [
            step(W.tile(W.hl('rain', 1, 3)) + W.tile(W.hl('day', 1, 3)), '<b>ai</b> in the middle. <b>ay</b> at the end.'),
            step(W.tile(W.hl('coin', 1, 3)) + W.tile(W.hl('toy', 1, 3)), '<b>oi</b> in the middle. <b>oy</b> at the end.'),
            step(W.tile(W.hl('give', 3, 4)), 'No word ends in v. Add e.')
          ],
          guided: [function () { return aiAy(1); }, function () { return aiAy(1); }],
          check: [function () { return aiAy(2); }, function () { return spellRight(1, 've'); }],
          coach: '<p>Say: "y at the end, i in the middle." The same rule works for ai and ay, and for oi and oy.</p>',
          mistake: '<p>Writing "dai" or "boi". Ask: is the sound at the end of the word?</p>' }
      ]
    }],
    practice: [
      { id: 'read-words', name: 'Read and spell words', code: 'B2.4', gen: readMeaning },
      { id: 'spell-patterns', name: 'Spelling patterns', code: 'B2.5', gen: function (lv) { return spellRight(lv); } }
    ],
    tasks: [
      { id: 'word-list', title: 'Read a word list', code: 'B2.4', pic: W.icon('read'), say: 'Read each word to your grown-up.',
        text: W.passage('Read these words', ['sun &middot; map &middot; pig &middot; bed &middot; hop', 'ship &middot; chin &middot; duck &middot; thin &middot; when', 'frog &middot; drum &middot; stop &middot; flag &middot; snack', 'milk &middot; hand &middot; jump &middot; nest &middot; tent', 'kite &middot; cape &middot; tree &middot; rain &middot; boat']),
        run: ['The child reads each row aloud. Mark any word read wrong.', 'For a missed word, point to each letter and ask for the sounds, then blend together.', 'Then say three of the words for the child to spell on paper.'],
        rubric: ['Reads only a few words.', 'Reads the first rows; sounds out slowly.', 'Reads most words correctly and spells three short words.', 'Reads all rows smoothly and spells longer words.'] }
    ]
  });

  Q.shapes('words', {
    'read-words': [[1, 'blend-read', blendRead], [1, 'spell', spellClue], [2, 'fit', fitWord]],
    'spell-patterns': [[1, 'fill-end', fillEnd], [1, 'k-or-c', kOrC], [1, 'ai-ay', aiAy], [2, 'pick', pickRight]]
  });
})();
