/* Grade 2: sounding out and spelling choices. A full chapter: every idea has two worked examples, three questions together
   and five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 2:
   B2.1 "use phonics knowledge, including phonemic blending to read words and set for variability to correct approximations,
        and phonemic segmentation to spell phonetically regular monosyllabic and multisyllabic words, in isolation and various text contexts"
   B2.2 "use orthographic knowledge, including position-based tendencies, to make a spelling choice or accurately pronounce a word when reading"
   From the Language Foundations Continuum, Grade 2: soft c and g before e, i and y; long o spelled o-e (most common in the middle), then oa;
   the /air/ sound spelled air, are or ear.
   All word lists are written for this site. Answer checks: tests/verify/grade2-sounds.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* words as their sounds (one tile for each sound), and words that sound close, so a wrong blend is a real trap */
  var SOUNDS = [['sh', 'o', 'p'], ['ch', 'i', 'p'], ['f', 'r', 'o', 'g'], ['c', 'l', 'a', 'p'], ['s', 't', 'e', 'p'], ['b', 'e', 'n', 'ch'], ['s', 'p', 'l', 'i', 't'],
    ['b', 'r', 'u', 'sh'], ['s', 't', 'o', 'm', 'p'], ['th', 'i', 'n'], ['d', 'u', 'ck'], ['s', 'n', 'a', 'ck'], ['f', 'i', 'sh'], ['g', 'r', 'a', 'n', 'd'],
    ['c', 'r', 'a', 'b'], ['s', 'w', 'i', 'm'], ['t', 'r', 'u', 'ck'], ['sh', 'e', 'l', 'f'], ['p', 'l', 'a', 'n', 't'], ['ch', 'e', 's', 't'], ['s', 'k', 'u', 'n', 'k'],
    ['f', 'l', 'a', 'sh'], ['b', 'l', 'o', 'ck'], ['w', 'i', 'sh'], ['m', 'u', 'd'], ['l', 'u', 'n', 'ch']];
  var NEAR = { shop: ['ship', 'chop'], chip: ['ship', 'chop'], frog: ['fog', 'from'], clap: ['cap', 'clip'], step: ['stop', 'set'], bench: ['bunch', 'bend'], split: ['spit', 'slit'],
    brush: ['bush', 'blush'], stomp: ['stop', 'stamp'], thin: ['tin', 'than'], duck: ['dock', 'luck'], snack: ['sack', 'snake'], fish: ['dish', 'fist'], grand: ['gran', 'band'],
    crab: ['crib', 'cab'], swim: ['swam', 'slim'], truck: ['trick', 'tuck'], shelf: ['self', 'shell'], plant: ['plan', 'pant'], chest: ['chess', 'test'], skunk: ['sunk', 'stunk'],
    flash: ['flush', 'lash'], block: ['black', 'lock'], wish: ['wash', 'with'], mud: ['mad', 'mug'], lunch: ['bunch', 'lump'] };
  /* sentences for words, to read them in a text */
  var USE = { frog: 'The green ___ sat on a log.', duck: 'A ___ swam on the pond.', fish: 'We saw a ___ in the lake.', truck: 'A big ___ drove down the road.',
    crab: 'The ___ ran along the sand.', plant: 'I water my ___ every day.', lunch: 'We eat ___ at noon.', bench: 'Grandpa sat on the ___ in the park.', shelf: 'Put the book on the ___.', skunk: 'A black and white ___ waddled by.' };
  /* two-beat words to blend: each beat, and the word */
  var BEATS = [['sun', 'set'], ['pic', 'nic'], ['bath', 'tub'], ['nap', 'kin'], ['muf', 'fin'], ['rab', 'bit'], ['kit', 'ten'], ['bas', 'ket'], ['in', 'sect'], ['pump', 'kin'], ['hel', 'met'], ['chip', 'munk']];
  var word = function (s) { return s.join(''); };
  function by(len) { return SOUNDS.filter(function (s) { return len(s.length); }); }

  /* two-beat words: the split that makes a real word. Some keep the vowel short (rob-in), some long (ro-bot). */
  var FLEX = [['rob', 'in'], ['cab', 'in'], ['lem', 'on'], ['wag', 'on'], ['sev', 'en'], ['riv', 'er'], ['plan', 'et'], ['vis', 'it'], ['cam', 'el'], ['lim', 'it'], ['lev', 'el'], ['sal', 'ad'], ['med', 'al'],
    ['ro', 'bot'], ['pa', 'per'], ['ti', 'ger'], ['mu', 'sic'], ['ba', 'by'], ['o', 'pen'], ['ba', 'con'], ['spi', 'der'], ['si', 'lent'], ['mo', 'ment']];
  var SHORT = FLEX.filter(function (f) { return /[^aeiou]$/.test(f[0]); });
  var FLEXUSE = { robin: 'A ___ sang in the tree.', cabin: 'We stayed in a ___ by the lake.', lemon: 'The ___ was sour.', wagon: 'I pulled my sister in the ___.', seven: 'I am ___ years old.',
    river: 'The canoe went down the ___.', planet: 'Earth is a ___.', camel: 'A ___ has a hump.', salad: 'We ate a fruit ___.', robot: 'The ___ beeped and rolled.', paper: 'Draw on the ___.',
    tiger: 'The ___ has stripes.', music: 'We danced to the ___.', baby: 'The ___ is asleep.', spider: 'The ___ spun a web.', bacon: 'Dad cooked ___ for breakfast.' };
  function otherSplit(f) { var s = word(f), at = f[0].length, k = SHORT.indexOf(f) >= 0 ? at - 1 : at + 1; return s.slice(0, k) + '-' + s.slice(k); }
  function firstVowel(f) { return f.join('').match(/[aeiou]/)[0]; }

  /* c and g: soft before e, i or y. Every g word here follows the pattern. */
  var C = { soft: ['city', 'cent', 'face', 'rice', 'cycle', 'fancy', 'pencil', 'dance', 'circle', 'ice', 'mice', 'place', 'space', 'juice'], hard: ['cat', 'cup', 'cave', 'clap', 'coat', 'cub', 'music', 'cold', 'cake', 'corn', 'camp', 'cut'] };
  var G = { soft: ['gem', 'giant', 'gym', 'page', 'cage', 'huge', 'magic', 'stage', 'large', 'giraffe', 'gentle', 'orange'], hard: ['go', 'gum', 'gate', 'flag', 'bag', 'gold', 'wagon', 'frog', 'goat', 'game', 'dig', 'glad'] };
  var KS = { c: [C, 's as in sun', 'k as in kite'], g: [G, 'j as in jam', 'g as in goat'] };
  function after(w, l) { var i = w.indexOf(l); return { at: i, next: w.charAt(i + 1) }; }
  function shown(w, l) { var a = after(w, l); return W.tile(W.hl(w, a.at, a.at + 2)); }

  /* long o: o-e is the most common spelling in the middle of a word, then oa. [right, wrong, sentence] */
  var LONGO = [['bone', 'boan', 'The dog chewed a ___.'], ['home', 'hoam', 'We walked ___ after school.'], ['rope', 'roap', 'Hold on to the ___.'], ['stone', 'stoan', 'I skipped a ___ on the lake.'],
    ['nose', 'noas', 'My ___ is cold.'], ['hole', 'hoal', 'The fox dug a ___.'], ['joke', 'joak', 'Dad told a funny ___.'], ['rode', 'road', 'I ___ my bike to the park.'], ['note', 'noat', 'I wrote a ___ to Gran.'],
    ['boat', 'bote', 'We sailed in a ___.'], ['road', 'rode', 'The bus drove down the ___.'], ['coat', 'cote', 'Zip up your ___.'], ['soap', 'sope', 'Wash your hands with ___.'], ['goat', 'gote', 'The ___ ate the grass.'],
    ['toast', 'tost', 'I had ___ for breakfast.'], ['float', 'flote', 'The leaf will ___ on the water.']];
  /* rode and road are both words, so they are asked only in a sentence */
  var PLAIN_O = LONGO.filter(function (p) { return p[0] !== 'rode' && p[0] !== 'road'; });
  var OE = LONGO.filter(function (p) { return /o.e$/.test(p[0]); }), OA = LONGO.filter(function (p) { return /oa/.test(p[0]); });
  function oTeam(w) { return /oa/.test(w) ? 'oa' : 'o-e'; }
  function oShown(w) { var i = w.indexOf('oa'); return i >= 0 ? W.tile(W.hl(w, i, i + 2)) : W.tile(W.hl(w, w.search(/o.e$/), w.length)); }

  /* the /air/ sound */
  var AIR = { air: ['chair', 'hair', 'fair', 'stairs', 'pair'], are: ['care', 'share', 'scare', 'square', 'bare'], ear: ['bear', 'pear', 'wear'] };
  var AIRWRONG = { chair: ['chare', 'chear'], hair: ['hare', 'hear'], fair: ['fare', 'fear'], stairs: ['stares', 'stears'], pair: ['pare', 'pear'],
    care: ['cair', 'cear'], share: ['shair', 'shear'], scare: ['scair', 'scear'], square: ['squair', 'squear'], bare: ['bair', 'bear'], bear: ['bair', 'bare'], pear: ['pair', 'pare'], wear: ['wair', 'ware'] };
  /* hare, hear, fare, fear, pare, bare, bear... are real words with another meaning, so spelling questions give the meaning */
  var AIRMEAN = { chair: 'something you sit on', hair: 'it grows on your head', fair: 'the same for everyone', stairs: 'steps in a house', pair: 'two of something',
    care: 'to look after', share: 'to give some away', scare: 'to make someone afraid', square: 'a shape with four equal sides', bare: 'with nothing on it',
    bear: 'a big furry animal', pear: 'a fruit', wear: 'to have clothes on' };
  var AIRUSE = { chair: 'Sit on the ___.', hair: 'Brush your ___.', stairs: 'Walk up the ___.', pair: 'I have a new ___ of socks.', share: 'Please ___ your crayons.', square: 'A ___ has four sides.',
    bear: 'The ___ ate berries.', pear: 'I ate a juicy ___.', wear: 'I ___ a hat in winter.', care: 'We take ___ of our dog.', scare: 'The loud noise gave me a ___.' };
  function airTeam(w) { return Object.keys(AIR).filter(function (t) { return AIR[t].indexOf(w) >= 0; })[0]; }
  function airShown(w) { var t = airTeam(w), i = w.indexOf(t); return W.tile(W.hl(w, i, i + 3)); }
  function allAir() { return Object.keys(AIR).reduce(function (a, t) { return a.concat(AIR[t]); }, []); }

  /* ---------- blend the sounds (B2.1) ---------- */
  function blend(lv) {
    var s = R.pick(lv > 1 ? by(function (n) { return n > 3; }) : by(function (n) { return n <= 4; })), w = word(s);
    return Q.tiles('Blend the sounds. Which word is it?', w, NEAR[w].slice(0, lv > 1 ? 2 : 1), { fig: W.soundRow(s), prompt: 'Tap each sound. Then say them fast.',
      hint: 'Touch each tile and say its sound.', explain: W.syl(s) + ' ' + W.tile(w), steps: ['Say the sounds: ' + s.join(', ') + '.', 'Say them fast: <b>' + w + '</b>.'], meta: { k: 'g2-blend', word: w } });
  }
  function blendTf() {
    var s = R.pick(SOUNDS), w = word(s), right = R.int(0, 1) === 1, said = right ? w : R.pick(NEAR[w]);
    return { q: Q.name() + ' blends these sounds and reads <b>' + said + '</b>.', fig: W.soundRow(s), type: 'tf', answer: right,
      why: { options: ['Every sound is there, in order.', 'A sound is wrong or missing.'], answer: right ? 0 : 1 },
      hint: 'Say each sound. Then say them fast.', explain: W.syl(s) + ' ' + W.tile(w), meta: { k: 'g2-blend-tf', word: w, said: said } };
  }
  function missingSound(lv) {
    var s = R.pick(by(function (n) { return n > 3; })), w = word(s), i = R.int(0, s.length - 1), gap = s.map(function (p, j) { return j === i ? W.gap() : W.tile(p, 'syl'); }).join('');
    var wrong = R.some(['m', 'z', 'v', 'j', 'w', 'n', 't', 'b', 'sh', 'ch'].filter(function (x) { return s.indexOf(x) < 0; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which sound is missing to make <b>' + w + '</b>?', s[i], wrong, { fig: '<span class="wsyl">' + gap + '</span>', hint: 'Say ' + w + ' slowly. Which sound goes in the gap?',
      explain: W.syl(s), meta: { k: 'g2-missing-sound', word: w, at: i } });
  }
  function blendBeats(lv) {
    var b = R.pick(BEATS), w = word(b), wrong = R.some(BEATS.filter(function (x) { return x !== b; }).map(function (x) { return x[0] + b[1]; }).concat([b[1] + b[0]]), lv > 1 ? 2 : 1);
    return Q.tiles('Blend the two beats. Which word is it?', w, wrong, { fig: W.syl(b), hint: 'Read each beat. Then say them together.', explain: W.syl(b) + ' ' + W.tile(w), meta: { k: 'g2-blend-beats', word: w } });
  }
  function blendRead(lv) {
    var w = R.pick(Object.keys(USE)), s = SOUNDS.filter(function (x) { return word(x) === w; })[0];
    return Q.tiles('Blend the sounds. Which word finishes the sentence?', w, NEAR[w].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(USE[w].replace('___', W.gap())) + W.soundRow(s),
      hint: 'Blend the sounds, then read the sentence with it.', explain: W.sent(USE[w].replace('___', '<b>' + w + '</b>')), meta: { k: 'g2-blend-read', word: w } });
  }

  /* ---------- split a word into sounds (B2.1) ---------- */
  function countSounds(lv) {
    var s = R.pick(SOUNDS), w = word(s), n = s.length;
    return Q.one('How many <b>sounds</b> are in this word?', String(n), ['2', '3', '4', '5', '6'].filter(function (x) { return +x !== n; }).slice(0, lv > 1 ? 3 : 2),
      { fig: lv > 1 ? W.tile(w) : W.syl(s), prompt: 'Say it slowly. Hold up a finger for each sound.', hint: 'Letters like sh, ch, th and ck make one sound.',
        explain: W.syl(s), meta: { k: 'g2-count-sounds', word: w } });
  }
  function spellSounds(lv) {
    var s = R.pick((lv > 1 ? by(function (n) { return n > 3; }) : SOUNDS).filter(function (x) { return x.every(function (p, i) { return x.indexOf(p) === i; }); })), w = word(s), extra = R.pick(['m', 'z', 'v', 'j', 'w'].filter(function (x) { return s.indexOf(x) < 0; }));
    var tiles = s.map(function (p) { return W.tile(p, 'syl'); }).concat([W.tile(extra, 'syl')]);
    return { q: 'Spell <b>' + w + '</b>. Tap the sounds in order.', type: 'build', parts: tiles, answer: s.map(function (p, i) { return i; }),
      hint: 'Say the word slowly. What is the first sound?', explain: W.syl(s), meta: { k: 'g2-spell-sounds', word: w } };
  }
  function matchSounds() {
    var pick = {};
    R.shuffle(SOUNDS).forEach(function (s) { if (!pick[s.length]) pick[s.length] = s; });
    var three = Object.keys(pick).slice(0, 3).map(function (n) { return pick[n]; });
    return { q: 'Match each word to its number of sounds.', type: 'match', pairs: three.map(function (s) { return [word(s), s.length + ' sounds']; }),
      hint: 'Say each word slowly. Count the sounds, not the letters.', explain: 'sh, ch, th and ck are one sound each.', meta: { k: 'g2-match-sounds' } };
  }
  function edgeSound(lv) {
    var s = R.pick(SOUNDS), w = word(s), last = R.int(0, 1) === 1, right = last ? s[s.length - 1] : s[0];
    var near = right.length === 2 ? [right.charAt(0)] : [], wrong = R.some(near.concat(s).filter(function (p, i, all) { return p !== right && all.indexOf(p) === i; }), lv > 1 ? 3 : 2);
    return Q.tiles('What is the <b>' + (last ? 'last' : 'first') + '</b> sound in <b>' + w + '</b>?', right, wrong, { fig: W.tile(w), prompt: 'Say it slowly. Listen to the ' + (last ? 'end' : 'start') + '.',
      hint: 'sh, ch, th and ck are one sound.', explain: W.syl(s), meta: { k: 'g2-edge-sound', word: w, last: last } });
  }
  function countTf() {
    var s = R.pick(SOUNDS), w = word(s), letters = w.length, right = R.int(0, 1) === 1, said = right ? s.length : (letters !== s.length ? letters : s.length + 1);
    return { q: Q.name() + ' says <b>' + w + '</b> has <b>' + said + '</b> sounds.', fig: W.tile(w), type: 'tf', answer: said === s.length,
      why: { options: ['That is one for each sound.', 'Count sounds, not letters.'], answer: said === s.length ? 0 : 1 },
      hint: 'Say it slowly with a finger for each sound.', explain: W.syl(s), meta: { k: 'g2-count-tf', word: w, said: said } };
  }

  /* ---------- not a word? try the other vowel sound (B2.1) ---------- */
  function flex(lv) {
    var f = R.pick(lv > 1 ? FLEX : SHORT), right = f.join('-');
    return Q.tiles('Which way makes a real word?', right, [otherSplit(f)], { fig: W.tile(word(f)), prompt: 'Read it one way. Is it a word? If not, try the other vowel sound.',
      hint: 'Try a short vowel sound, then a long one. Which one is a word you know?', explain: W.syl(f), meta: { k: 'g2-flex', word: word(f) } });
  }
  function flexTf() {
    var f = R.pick(FLEX), right = R.int(0, 1) === 1, said = right ? f.join('-') : otherSplit(f);
    return { q: Q.name() + ' reads <b>' + word(f) + '</b> like this:', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['That makes a word I know.', 'That is not a word. Try the other vowel sound.'], answer: right ? 0 : 1 },
      hint: 'Say it aloud. Is it a word you know?', explain: W.syl(f), meta: { k: 'g2-flex-tf', word: word(f), said: said } };
  }
  function flexRead() {
    var w = R.pick(Object.keys(FLEXUSE)), f = FLEX.filter(function (x) { return word(x) === w; })[0];
    return Q.tiles('Read the word in the sentence. Which way is right?', f.join('-'), [otherSplit(f)], { fig: W.sent(FLEXUSE[w].replace('___', '<b>' + w + '</b>')),
      hint: 'Which way makes the sentence make sense?', explain: W.syl(f), meta: { k: 'g2-flex-read', word: w } });
  }
  function flexVowel() {
    var f = R.pick(FLEX), v = firstVowel(f), shortV = SHORT.indexOf(f) >= 0;
    return { q: 'In <b>' + word(f) + '</b>, is the first <b>' + v + '</b> short or long?', fig: W.syl(f), type: 'tap', tiles: ['short ' + v, 'long ' + v], answer: shortV ? 0 : 1,
      hint: 'Say the word. Does the ' + v + ' say its name?', explain: shortV ? 'Short: ' + f.join('-') + '.' : 'Long, it says its name: ' + f.join('-') + '.', meta: { k: 'g2-flex-vowel', word: word(f) } };
  }

  /* ---------- soft c and soft g (B2.2) ---------- */
  function softSound(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], soft = R.int(0, 1) === 1, w = R.pick(soft ? k[0].soft : k[0].hard), a = after(w, l);
    return { q: 'What sound does <b>' + l + '</b> make in this word?', fig: W.tile(W.hl(w, a.at, a.at + 1)), type: 'tap', tiles: [k[1], k[2]], answer: soft ? 0 : 1,
      prompt: 'Look at the letter after <b>' + l + '</b>. Is it e, i or y?', hint: l + ' before e, i or y makes its soft sound.',
      explain: shown(w, l) + ' ' + (soft ? a.next + ' comes next: soft ' + l + '.' : 'No e, i or y next: hard ' + l + '.'),
      meta: { k: 'g2-soft', word: w, letter: l } };
  }
  function softPick(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], right = R.some(k[0].soft, R.int(1, 2)), wrong = R.some(k[0].hard, 4 - right.length);
    return Q.all('Pick every word where <b>' + l + '</b> sounds like <b>' + k[1] + '</b>.', right, wrong, { hint: 'Look for e, i or y right after the ' + l + '.',
      explain: right.map(function (w) { return shown(w, l); }).join(' '), meta: { k: 'g2-soft-pick', letter: l } });
  }
  function softTf(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], soft = R.int(0, 1) === 1, w = R.pick(soft ? k[0].soft : k[0].hard), sayS = R.int(0, 1) === 1, said = sayS ? k[1] : k[2];
    return { q: Q.name() + ' says:', fig: W.sent('In <b>' + w + '</b>, ' + l + ' sounds like <b>' + said + '</b>.'), type: 'tf', answer: sayS === soft,
      why: { options: ['e, i or y comes after the ' + l + '.', 'No e, i or y comes after the ' + l + '.'], answer: soft ? 0 : 1 },
      hint: 'Look at the letter after the ' + l + '.', explain: shown(w, l), meta: { k: 'g2-soft-tf', word: w, letter: l, said: said } };
  }
  function softOne(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), k = KS[l], w = R.pick(k[0].soft);
    return Q.tiles('Which word has <b>' + l + '</b> that sounds like <b>' + k[1] + '</b>?', w, R.some(k[0].hard, lv > 1 ? 3 : 2), { hint: 'Find e, i or y after the ' + l + '.',
      explain: shown(w, l), meta: { k: 'g2-soft-one', letter: l } });
  }
  function softNext(lv, l0) {
    var l = l0 || R.pick(['c', 'g']), w = R.pick(KS[l][0].soft), a = after(w, l), wrong = R.some('aoubdtr'.split(''), lv > 1 ? 2 : 1).map(function (x) { return x; });
    return Q.tiles('<b>' + l + '</b> is soft in <b>' + w + '</b>. Which letter after it shows that?', a.next, wrong, { fig: W.tile(W.hl(w, a.at, a.at + 1)),
      hint: 'Look right after the ' + l + '.', explain: shown(w, l), meta: { k: 'g2-soft-next', word: w, letter: l } });
  }

  /* ---------- long o: o-e or oa (B2.2) ---------- */
  function longO(lv) {
    var p = R.pick(lv > 1 ? PLAIN_O : PLAIN_O.slice(0, 10));
    return Q.one('Which is spelled right?', p[0], [p[1]], { prompt: 'In the middle of a word, try <b>o-e</b> first. Does it look right?', hint: 'Picture the word. Which one have you seen in books?',
      explain: oShown(p[0]), meta: { k: 'g2-long-o', word: p[0] } });
  }
  function longOFill() {
    var p = R.pick(LONGO);
    return Q.tiles('Which spelling finishes the sentence?', p[0], [p[1]], { fig: W.sent(p[2].replace('___', W.gap())), hint: 'Which one have you seen in books? Does it fit the sentence?',
      explain: W.sent(p[2].replace('___', '<b>' + p[0] + '</b>')), meta: { k: 'g2-long-o-fill', s: p[2] } });
  }
  function longOSort(lv) {
    var t = R.pick(['o-e', 'oa']), right = R.some(t === 'oa' ? OA : OE, 2), wrong = R.some(t === 'oa' ? OE : OA, lv > 1 ? 3 : 2);
    return Q.all('Pick every word that spells long o with <b>' + t + '</b>.', right.map(function (p) { return p[0]; }), wrong.map(function (p) { return p[0]; }), {
      hint: t === 'oa' ? 'Look for o and a side by side.' : 'Look for o, one letter, then e at the end.', explain: right.map(function (p) { return oShown(p[0]); }).join(' '), meta: { k: 'g2-long-o-sort', team: t } });
  }
  function longOTf() {
    var p = R.pick(LONGO), right = R.int(0, 1) === 1, said = right ? p[0] : p[1];
    return { q: Q.name() + ' wrote this sentence. Is the long o word spelled right?', fig: W.sent(p[2].replace('___', '<b>' + said + '</b>')), type: 'tf', answer: right,
      why: { options: ['It is the spelling I see in books.', 'It uses the other long o spelling.'], answer: right ? 0 : 1 },
      hint: 'Picture the word in a book.', explain: W.sent(p[2].replace('___', '<b>' + p[0] + '</b>')), meta: { k: 'g2-long-o-tf', s: p[2], said: said } };
  }

  /* ---------- the air sound (B2.2) ---------- */
  function airSpell(lv) {
    var w = R.pick(allAir());
    return Q.one('Which word means <b>' + AIRMEAN[w] + '</b>?', w, AIRWRONG[w].slice(0, lv > 1 ? 2 : 1), { prompt: 'Which spelling of the /air/ sound does this word use?',
      hint: 'air as in chair, are as in care, ear as in bear.', explain: airShown(w), meta: { k: 'g2-air', word: w } });
  }
  function airSort() {
    var t = R.pick(['air', 'are']), other = t === 'air' ? 'are' : 'air', right = R.some(AIR[t], 2), wrong = R.some(AIR[other], 2);
    return Q.all('Pick every word that spells the /air/ sound <b>' + t + '</b>.', right, wrong, { hint: 'Look at the letters after the first sound.', explain: right.map(airShown).join(' '), meta: { k: 'g2-air-sort', team: t } });
  }
  function airFill(lv) {
    var w = R.pick(Object.keys(AIRUSE));
    return Q.tiles('Which word finishes the sentence?', w, AIRWRONG[w].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(AIRUSE[w].replace('___', W.gap())), hint: 'They sound the same. Which one has the right meaning?',
      explain: W.sent(AIRUSE[w].replace('___', '<b>' + w + '</b>')), meta: { k: 'g2-air-fill', s: AIRUSE[w] } });
  }
  function airTeamOf(lv) {
    var w = R.pick(allAir()), t = airTeam(w);
    return Q.tiles('Which letters spell the /air/ sound in <b>' + w + '</b>?', t, Object.keys(AIR).filter(function (x) { return x !== t; }).slice(0, lv > 1 ? 2 : 1), { fig: W.tile(w),
      hint: 'Find the letters after the first sound.', explain: airShown(w), meta: { k: 'g2-air-team', word: w } });
  }

  /* ---------- the chapter ---------- */
  Atlas.register('sounds', {
    full: true,
    lessons: [{
      id: 'sound-out', title: 'Sound it out', sub: 'Blend sounds to read. Split sounds to spell.',
      concepts: [
        { slug: 'blend', title: 'Blend the sounds', exp: ['B2.1'], skill: 'blend',
          model: [
            step(W.soundRow(['f', 'r', 'o', 'g']), 'One tile for each sound.'),
            step(W.soundRow(['f', 'r', 'o', 'g']), 'Tap each one. Say them slowly.'),
            step(W.tile('frog'), 'Say them fast.'),
            step(W.soundRow(['f', 'i', 'sh']) + W.pic('fish'), '<b>sh</b> is one sound.'),
            step(W.syl(['pic', 'nic']), 'Long words: blend the beats.'),
            step(W.tile('picnic'))
          ],
          guided: [function () { return blend(1); }, blendTf, function () { return blendBeats(1); }],
          check: [function () { return blend(2); }, function () { return missingSound(2); }, function () { return blendRead(2); }, function () { return blendBeats(2); }, function () { return blend(3); }],
          coach: '<p>Say the sounds, not letter names: "fff, rrr, o, g". Stretch the sounds that can be stretched, then say the word fast.</p>',
          mistake: '<p>Adding "uh" to sounds ("fuh-ruh-o-guh"), which makes blending hard. Keep stop sounds short and crisp.</p>' },
        { slug: 'segment', title: 'Split a word into sounds to spell it', exp: ['B2.1'], skill: 'segment',
          model: [
            step(W.tile('stomp'), 'Say it slowly.'),
            step(W.soundRow(['s', 't', 'o', 'm', 'p']), 'Five sounds. Five fingers.'),
            step(W.tile('duck'), 'Another word.'),
            step(W.soundRow(['d', 'u', 'ck']), '<b>ck</b> is one sound: three fingers.')
          ],
          guided: [function () { return countSounds(1); }, function () { return spellSounds(1); }, function () { return edgeSound(1); }],
          check: [function () { return countSounds(2); }, function () { return spellSounds(2); }, matchSounds, countTf, function () { return edgeSound(2); }],
          coach: '<p>Hold up a finger for each sound, then write one spelling for each finger. Letter teams like sh and ck share one finger.</p>',
          mistake: '<p>Counting letters instead of sounds. <b>duck</b> has four letters but three sounds.</p>' },
        { slug: 'flex', title: 'Not a word? Try the other vowel sound', exp: ['B2.1'], skill: 'flex',
          model: [
            step(W.tile('robin'), 'A new word.'),
            step(W.syl(['ro', 'bin']), 'Long o: ro-bin? Not a word.'),
            step(W.syl(['rob', 'in']), 'Short o: rob-in. A bird!'),
            step(W.tile('tiger'), 'Another new word.'),
            step(W.syl(['tig', 'er']), 'Short i: tig-er? Not a word.'),
            step(W.syl(['ti', 'ger']), 'Long i: ti-ger. The striped cat.')
          ],
          guided: [function () { return flex(1); }, flexTf, flexRead],
          check: [function () { return flex(2); }, flexTf, flexVowel, flexRead, function () { return flex(3); }],
          coach: '<p>When a word comes out wrong, ask: "Is that a word you know? Try the vowel the other way." This is called <b>flexing</b> the vowel.</p>',
          mistake: '<p>Keeping a made-up word and reading on. Praise every time the child stops and tries again.</p>' }
      ]
    }, {
      id: 'choices', title: 'Spelling choices', sub: 'One sound, more than one spelling. Where it is helps you choose.',
      concepts: [
        { slug: 'soft-c', title: 'c before e, i or y says s', exp: ['B2.2'], skill: 'soft-c',
          model: [
            step(W.tile(W.hl('cat', 0, 1)), 'Hard c: like ' + W.sound('k') + '.'),
            step(W.tile(W.hl('city', 0, 2)), '<b>i</b> comes next: like ' + W.sound('s') + '.'),
            step(W.tile(W.hl('face', 2, 4)), '<b>e</b> next: ' + W.sound('s') + ' again.'),
            step(W.tile('cycle'), 'Two c' + '’' + 's. Check each one.'),
            step(W.tile(W.hl('cycle', 0, 2)), 'y next: s.'),
            step(W.tile(W.hl('cycle', 2, 4)), 'l next: k. Cy-cle.')
          ],
          guided: [function () { return softSound(1, 'c'); }, function () { return softOne(1, 'c'); }, function () { return softNext(1, 'c'); }],
          check: [function () { return softSound(2, 'c'); }, function () { return softPick(2, 'c'); }, function () { return softTf(2, 'c'); }, function () { return softOne(2, 'c'); }, function () { return softSound(3, 'c'); }],
          coach: '<p>Have the child put a finger on the letter after the c. "Is it e, i or y? Then c says s."</p>',
          mistake: '<p>Reading <b>city</b> as "kitty". Look at the letter after c.</p>' },
        { slug: 'soft-g', title: 'g before e, i or y often says j', exp: ['B2.2'], skill: 'soft-g',
          model: [
            step(W.tile(W.hl('gate', 0, 1)), 'Hard g: ' + W.sound('g') + ', like in goat.'),
            step(W.tile(W.hl('giant', 0, 2)), '<b>i</b> next: ' + W.sound('j') + ', like in jam.'),
            step(W.tile(W.hl('page', 2, 4)), '<b>e</b> next: ' + W.sound('j') + ' again.'),
            step(W.tile('orange'), 'Find the g.'),
            step(W.tile(W.hl('orange', 4, 6)), 'e next: soft g. Or-ange.')
          ],
          guided: [function () { return softSound(1, 'g'); }, function () { return softOne(1, 'g'); }, function () { return softNext(1, 'g'); }],
          check: [function () { return softSound(2, 'g'); }, function () { return softPick(2, 'g'); }, function () { return softTf(2, 'g'); }, function () { return softOne(2, 'g'); }, function () { return softSound(3, 'g'); }],
          coach: '<p>Say "often" on purpose: some common words break this pattern (get, give, girl). Teach those as words to just know.</p>',
          mistake: '<p>Using the pattern on <b>get</b> or <b>girl</b>. Tell the child: "Try soft g first. If it is not a word, try hard g."</p>' },
        { slug: 'long-o', title: 'Long o in the middle: try o-e first', exp: ['B2.2'], skill: 'long-o',
          model: [
            step(W.tile(W.hl('bone', 1, 4)), 'o, a consonant, then e.'),
            step(W.tile(W.hl('boat', 1, 3)), 'Sometimes <b>oa</b>. Both say ' + W.sound('oa', '/ō/') + '.'),
            step(W.sent('I skipped a ' + W.gap() + ' on the lake.'), 'Which spelling?'),
            step(W.tile('stone') + W.tile('stoan'), 'Write it both ways.'),
            step(W.tile(W.hl('stone', 2, 5)), 'This one looks right. I see it in books.')
          ],
          guided: [function () { return longO(1); }, longOFill, function () { return longOSort(1); }],
          check: [function () { return longO(2); }, longOFill, function () { return longOSort(2); }, longOTf, function () { return longO(3); }],
          coach: '<p>Write the word both ways on scrap paper and ask: "Which one have you seen in books?" Seeing words often is what builds this.</p>',
          mistake: '<p>Writing <b>oa</b> everywhere ("hoam"). o-e is the more common spelling in the middle of a word.</p>' },
        { slug: 'air', title: 'The air sound: air, are or ear', exp: ['B2.2'], skill: 'air',
          model: [
            step(W.tile(W.hl('chair', 2, 5)), W.sound('air', '<b>air</b>') + ', as in hair.'),
            step(W.tile(W.hl('care', 1, 4)), '<b>are</b>, as in share.'),
            step(W.tile(W.hl('bear', 1, 4)), '<b>ear</b>, in only a few words.'),
            step(W.sent('I ate a juicy ' + W.gap() + '.'), 'Same sound, two words: pair or pear?'),
            step(W.tile(W.hl('pear', 1, 4)), 'A fruit: <b>pear</b>.')
          ],
          guided: [function () { return airSpell(1); }, airSort, function () { return airTeamOf(1); }],
          check: [function () { return airSpell(2); }, airSort, function () { return airFill(2); }, function () { return airTeamOf(2); }, function () { return airSpell(3); }],
          coach: '<p>Make three columns, air, are and ear, and sort words from books into them.</p>',
          mistake: '<p>Mixing up words that sound the same, like <b>pair</b> and <b>pear</b>. Ask: "Which one do you mean?"</p>' }
      ]
    }],
    practice: [
      { id: 'blend', name: 'Blend the sounds', code: 'B2.1', gen: blend },
      { id: 'segment', name: 'Split a word into sounds', code: 'B2.1', gen: countSounds },
      { id: 'flex', name: 'Try the other vowel sound', code: 'B2.1', gen: flex },
      { id: 'soft-c', name: 'Soft c', code: 'B2.2', gen: function (lv) { return softSound(lv, 'c'); } },
      { id: 'soft-g', name: 'Soft g', code: 'B2.2', gen: function (lv) { return softSound(lv, 'g'); } },
      { id: 'long-o', name: 'Long o: o-e or oa', code: 'B2.2', gen: longO },
      { id: 'air', name: 'The air sound', code: 'B2.2', gen: airSpell }
    ],
    tasks: [
      { id: 'dictation', title: 'Spell by sounds', code: 'B2.1', pic: W.icon('write'), say: 'Listen to each word. Say its sounds. Write it.', write: true,
        run: ['Say five words, one at a time: frog, shop, stomp, brush, planet.', 'The child says the sounds aloud, holding up a finger for each, then writes the word.', 'Check together, sound by sound.'],
        rubric: ['Writes few of the sounds yet.', 'Writes the first and last sounds.', 'Writes every sound in most words.', 'Spells all five, including the two-beat word.'] }
    ]
  });

  function forLetter(f, l) { return function (lv) { return f(lv, l); }; }
  Q.shapes('sounds', {
    blend: [[1, 'tf', blendTf], [1, 'beats', blendBeats], [2, 'missing', missingSound], [2, 'in-a-sentence', blendRead]],
    segment: [[1, 'spell', spellSounds], [1, 'first-last', edgeSound], [2, 'match', matchSounds], [2, 'tf', countTf]],
    flex: [[1, 'tf', flexTf], [1, 'in-a-sentence', flexRead], [2, 'short-long', flexVowel]],
    'soft-c': [[1, 'which-word', forLetter(softOne, 'c')], [1, 'next-letter', forLetter(softNext, 'c')], [2, 'pick', forLetter(softPick, 'c')], [2, 'tf', forLetter(softTf, 'c')]],
    'soft-g': [[1, 'which-word', forLetter(softOne, 'g')], [1, 'next-letter', forLetter(softNext, 'g')], [2, 'pick', forLetter(softPick, 'g')], [2, 'tf', forLetter(softTf, 'g')]],
    'long-o': [[1, 'in-a-sentence', longOFill], [1, 'sort', longOSort], [2, 'tf', longOTf]],
    air: [[1, 'sort', airSort], [1, 'which-letters', airTeamOf], [2, 'in-a-sentence', airFill]]
  });
})();
