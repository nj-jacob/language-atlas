/* Grade 1: word parts and meanings. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 1:
   B2.6 use developing knowledge of the meanings of words and common morphemes (bases, prefixes, and suffixes) to read and spell
        words (here: -s and -es for more than one, -ing and -ed, and compound words).
   B2.7 demonstrate an understanding of commonly used words, acquire and use explicitly taught vocabulary in various contexts,
        including other subject areas (here: words that mean the same or the opposite, word groups, words from math and science,
        and working out a new word from the sentence).
   All words and sentences are written for this site. Answer checks: tests/verify/grade1-word-parts.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var NOUNS = ['cat', 'dog', 'hat', 'cup', 'bed', 'pig', 'map', 'tent', 'drum', 'frog', 'box', 'fox', 'bus', 'dish', 'brush', 'lunch', 'glass', 'bench', 'dress', 'kiss'];
  var esWord = function (w) { return /(s|x|z|sh|ch)$/.test(w); };
  var plural = function (w) { return w + (esWord(w) ? 'es' : 's'); };
  var VERBS = ['jump', 'play', 'help', 'walk', 'kick', 'look', 'pick', 'rest', 'paint', 'call', 'melt', 'pull', 'push', 'fish', 'spell', 'mix'];
  /* when it happens, and the ending that fits */
  var WHEN = [['Right now, I am', 'ing'], ['Yesterday, I', 'ed'], ['Last night, we', 'ed'], ['Look! The kids are', 'ing'], ['Every day, she', 's']];
  var COMPOUND = [['sun', 'set'], ['rain', 'bow'], ['snow', 'man'], ['pop', 'corn'], ['cup', 'cake'], ['back', 'pack'], ['foot', 'ball'], ['bed', 'room'], ['star', 'fish'], ['tooth', 'brush'], ['play', 'ground'], ['pan', 'cake'],
    ['fire', 'fly'], ['bath', 'tub'], ['door', 'bell'], ['sea', 'shell'], ['moon', 'light'], ['bird', 'house']];
  var NOT_COMPOUND = ['rabbit', 'pencil', 'jacket', 'lemon', 'tiger', 'button', 'wagon', 'carrot'];

  var SAME = [['big', 'large'], ['small', 'little'], ['happy', 'glad'], ['fast', 'quick'], ['start', 'begin'], ['shout', 'yell'], ['shut', 'close'], ['sick', 'ill'], ['jump', 'leap'], ['look', 'see'],
    ['sleepy', 'tired'], ['speak', 'talk'], ['stone', 'rock'], ['gift', 'present']];
  var OPP = [['hot', 'cold'], ['up', 'down'], ['wet', 'dry'], ['full', 'empty'], ['day', 'night'], ['fast', 'slow'], ['happy', 'sad'], ['in', 'out'], ['loud', 'quiet'], ['open', 'shut'],
    ['early', 'late'], ['push', 'pull'], ['top', 'bottom'], ['old', 'new'], ['win', 'lose'], ['light', 'dark']];
  var GROUPS = { colours: ['red', 'blue', 'green', 'yellow', 'purple', 'pink'], animals: ['moose', 'beaver', 'goose', 'otter', 'bear', 'fox'], fruits: ['apple', 'pear', 'plum', 'grape', 'peach', 'cherry'],
    weather: ['rain', 'snow', 'wind', 'sleet', 'fog', 'hail'], shapes: ['circle', 'square', 'triangle', 'oval', 'rectangle', 'star'] };
  /* words from other subjects: [word, meaning, subject] */
  var SUBJECT = [['add', 'put numbers together', 'Math'], ['equal', 'the same amount', 'Math'], ['more', 'a bigger amount', 'Math'], ['seed', 'a plant grows from it', 'Science'],
    ['root', 'the part of a plant under the soil', 'Science'], ['melt', 'turn from solid to liquid, like ice in the sun', 'Science'], ['map', 'a drawing of a place from above', 'Social Studies'],
    ['community', 'people who live, work and play in one place', 'Social Studies'],
    ['subtract', 'take some away', 'Math'], ['graph', 'a picture that shows numbers', 'Math'], ['season', 'a part of the year, like winter', 'Science'], ['neighbour', 'someone who lives near you', 'Social Studies']];
  /* a new word, a sentence that explains it, its meaning, and wrong meanings */
  var CONTEXT = [['steaming', 'The soup was steaming, so I waited for it to cool.', 'very hot', ['very cold', 'very sweet'], 'waited for it to cool'], ['soaked', 'I fell in the puddle and my socks were soaked.', 'very wet', ['very clean', 'very small'], 'fell in the puddle'],
    ['enormous', 'The whale was enormous, as long as a bus.', 'very big', ['very fast', 'very quiet'], 'as long as a bus'], ['tiny', 'The ant was so tiny that I could hardly see it.', 'very small', ['very loud', 'very red'], 'could hardly see it'],
    ['exhausted', 'After the long hike, Omar was exhausted and fell asleep.', 'very tired', ['very hungry', 'very happy'], 'fell asleep'], ['delighted', 'Mei was delighted with her new puppy and smiled all day.', 'very happy', ['very angry', 'very sleepy'], 'smiled all day'],
    ['chilly', 'It was chilly, so we put on our coats and mittens.', 'cold', ['dark', 'sunny'], 'coats and mittens'], ['whisper', 'We whisper in the library so we do not bother anyone.', 'talk very quietly', ['shout loudly', 'sing a song'], 'do not bother anyone'],
    ['soggy', 'The cereal sat in the milk too long and got soggy.', 'wet and soft', ['crunchy', 'hot'], 'in the milk too long'],
    ['gigantic', 'The gigantic tree was taller than our house.', 'very big', ['very old', 'very green'], 'taller than our house'],
    ['furious', 'Kai was furious when his tower got knocked over, and he stomped away.', 'very angry', ['very calm', 'very cold'], 'stomped away'],
    ['swift', 'The swift fox ran so fast that we could not catch it.', 'fast', ['slow', 'sleepy'], 'ran so fast']];

  /* ---------- question makers: word parts ---------- */
  function pluralQ(lv) {
    var w = R.pick(lv > 1 ? NOUNS : NOUNS.filter(function (x) { return !esWord(x) || x.length < 4; })), right = plural(w), wrong = esWord(w) ? w + 's' : w + 'es';
    return Q.one('One <b>' + w + '</b>. Two ___?', right, [wrong].concat(lv > 1 ? [w] : []), { prompt: 'Does the word end in s, x, sh or ch?',
      hint: 'Add -es after s, x, sh or ch. Add -s to most words.', explain: W.sum([[w, 'base'], [esWord(w) ? 'es' : 's', 'suffix']]), meta: { k: 'g1-plural', w: w } });
  }
  function ingEd(lv) {
    var v = R.pick(VERBS), t = R.pick(lv > 1 ? WHEN : WHEN.slice(0, 2)), suf = t[1] === 's' ? (esWord(v) ? 'es' : 's') : t[1];
    var opts = ['ing', 'ed', 's'].map(function (s) { return v + (s === 's' && esWord(v) ? 'es' : s); });
    return Q.one('Which word fits?', v + suf, opts.filter(function (o) { return o !== v + suf; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(t[0] + ' ' + W.gap() + '.'),
      prompt: 'When does it happen: now, or before now?', hint: '-ing: it is happening now. -ed: it happened before now.',
      explain: W.sum([[v, 'base'], [suf, 'suffix']]), meta: { k: 'g1-ing-ed', when: t[0], v: v } });
  }
  function buildWord(lv) {
    var useVerb = R.int(0, 1) === 1, base = useVerb ? R.pick(VERBS) : R.pick(NOUNS), suf = useVerb ? R.pick(['ing', 'ed']) : (esWord(base) ? 'es' : 's');
    var others = ['ing', 'ed', 's', 'es'].filter(function (s) { return s !== suf; }).slice(0, lv > 1 ? 2 : 1);
    return { q: 'Build the word <b>' + base + suf + '</b>.', type: 'build', parts: [W.tile(base, 'base'), W.tile(suf, 'suffix')].concat(others.map(function (s) { return W.tile(s, 'suffix'); })), answer: [0, 1],
      hint: 'Find the base word first. Then the ending.', explain: W.sum([[base, 'base'], [suf, 'suffix']]), meta: { k: 'g1-build-word', word: base + suf } };
  }
  function compound(lv) {
    var c = R.pick(COMPOUND), real = COMPOUND.map(function (x) { return x[0] + x[1]; });
    var other = R.pick(COMPOUND.filter(function (x) { return x !== c && real.indexOf(c[0] + x[1]) < 0 && real.indexOf(x[0] + c[1]) < 0; }));
    return Q.one('Join the two words. What new word do you get?', c[0] + c[1], [c[0] + other[1], other[0] + c[1]].slice(0, lv > 1 ? 2 : 1), { fig: W.tile(c[0], 'base') + ' + ' + W.tile(c[1], 'base'),
      hint: 'Put the second word right after the first.', explain: W.sum([[c[0], 'base'], [c[1], 'base']]), meta: { k: 'g1-compound', a: c[0], b: c[1] } });
  }
  function splitCompound(lv) {
    var c = R.pick(COMPOUND), w = c[0] + c[1], bad = [w.slice(0, c[0].length - 1) + ' + ' + w.slice(c[0].length - 1), w.slice(0, c[0].length + 1) + ' + ' + w.slice(c[0].length + 1)];
    return Q.tiles('Which two words make <b>' + w + '</b>?', c[0] + ' + ' + c[1], bad.slice(0, lv > 1 ? 2 : 1), { hint: 'Find a whole word at the start.', explain: W.sum([[c[0], 'base'], [c[1], 'base']]), meta: { k: 'g1-split-compound', w: w } });
  }
  function pickCompound() {
    var right = R.some(COMPOUND, 2).map(function (c) { return c[0] + c[1]; });
    return Q.all('Pick every word made of <b>two words</b>.', right, R.some(NOT_COMPOUND, 2), { hint: 'Can you find two whole words inside it?', explain: right.join(', ') + ' are each made of two words.', meta: { k: 'g1-pick-compound' } });
  }

  /* ---------- question makers: word meanings ---------- */
  function sameMeaning(lv) {
    var p = R.pick(SAME), flip = R.int(0, 1), w = p[flip], right = p[1 - flip];
    return Q.one('Which word means the <b>same</b> as <b>' + w + '</b>?', right, R.some(OPP, lv > 1 ? 3 : 2).map(function (o) { return o[R.int(0, 1)]; }).filter(function (o) { return o !== w; }), {
      prompt: 'Try each word in a sentence: "The dog is ' + w + '."', hint: 'Which word could take its place?', explain: '<b>' + w + '</b> and <b>' + right + '</b> mean the same.', meta: { k: 'g1-same', w: w } });
  }
  function opposite(lv) {
    var p = R.pick(OPP), flip = R.int(0, 1), w = p[flip], right = p[1 - flip];
    var wrong = [w].concat(R.some(OPP.filter(function (o) { return o !== p; }), 2).map(function (o) { return o[0]; }));
    return Q.one('Which word means the <b>opposite</b> of <b>' + w + '</b>?', right, wrong.slice(lv > 1 ? 0 : 1, lv > 1 ? 3 : 2), { hint: 'Opposites are as different as can be.',
      explain: '<b>' + w + '</b> and <b>' + right + '</b> are opposites.', meta: { k: 'g1-opposite', w: w } });
  }
  function matchOpp() {
    var ps = R.some(OPP, 3);
    return { q: 'Match each word to its opposite.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Think: as different as can be.', explain: 'Opposites go together.', meta: { k: 'g1-match-opp' } };
  }
  function oddOne(lv) {
    var keys = Object.keys(GROUPS), g = R.pick(keys), other = R.pick(keys.filter(function (k) { return k !== g; }));
    var odd = R.pick(GROUPS[other]);
    return Q.one('Which word does <b>not</b> belong?', odd, R.some(GROUPS[g], lv > 1 ? 3 : 2), { prompt: 'What are most of the words? Find the one that is different.',
      hint: 'Most of the words are ' + g + '.', explain: '<b>' + odd + '</b> is not one of the ' + g + '.', meta: { k: 'g1-odd-one', odd: odd } });
  }
  function groupName() {
    var keys = Object.keys(GROUPS), g = R.pick(keys);
    return Q.tiles('What group are these words in?', g, R.some(keys.filter(function (k) { return k !== g; }), 2), { fig: R.some(GROUPS[g], 3).map(function (w) { return W.tile(w); }).join(''),
      hint: 'What is the same about all of them?', explain: 'They are all ' + g + '.', meta: { k: 'g1-group-name' } });
  }
  function context(lv) {
    var c = R.pick(CONTEXT);
    return Q.one('What does <b>' + c[0] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[1].replace(c[0], '<mark class="hl">' + c[0] + '</mark>')),
      prompt: 'Read the whole sentence. What clue helps?', hint: 'Look at the words after the new word.', explain: '<b>' + c[0] + '</b> means ' + c[2] + '.', meta: { k: 'g1-context', w: c[0] } });
  }
  function subjectWord(lv) {
    var s = R.pick(SUBJECT);
    return Q.one('In ' + s[2] + ', what does <b>' + s[0] + '</b> mean?', s[1], R.some(SUBJECT.filter(function (x) { return x !== s; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), {
      hint: 'Think about when you use this word in ' + s[2] + '.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g1-subject-word', w: s[0] } });
  }

  /* ---------- more question makers ---------- */
  function pluralBuild(lv) {
    var w = R.pick(NOUNS), suf = esWord(w) ? 'es' : 's';
    return { q: 'Build the word for more than one <b>' + w + '</b>.', type: 'build', parts: [W.tile(w, 'base'), W.tile(suf, 'suffix'), W.tile(suf === 's' ? 'es' : 's', 'suffix')].concat(lv > 1 ? [W.tile('ing', 'suffix')] : []), answer: [0, 1],
      hint: 'Does it end in s, x, sh or ch?', explain: W.sum([[w, 'base'], [suf, 'suffix']]), meta: { k: 'g1-plural-build', w: w } };
  }
  function pluralTf() {
    var w = R.pick(NOUNS), right = R.int(0, 1) === 1, said = right ? plural(w) : (esWord(w) ? w + 's' : w + 'es');
    return { q: 'One ' + w + ', two... ' + Q.name() + ' writes <b>' + said + '</b>.', type: 'tf', answer: right,
      why: { options: ['That is the right ending.', 'It needs the other ending.'], answer: right ? 0 : 1 },
      hint: 'After s, x, sh or ch, add -es.', explain: W.sum([[w, 'base'], [esWord(w) ? 'es' : 's', 'suffix']]), meta: { k: 'g1-plural-tf', w: w, said: said } };
  }
  function pickEs() {
    var right = R.some(NOUNS.filter(esWord), 2), wrong = R.some(NOUNS.filter(function (w) { return !esWord(w); }), 2);
    return Q.all('Pick every word that needs <b>-es</b> for more than one.', right, wrong, { hint: 'Look at the end: s, x, sh or ch?', explain: right.map(plural).join(', '), meta: { k: 'g1-pick-es' } });
  }
  function buildVerb(lv) {
    var v = R.pick(VERBS), suf = R.pick(['ing', 'ed']), when = suf === 'ing' ? 'Right now, I am' : 'Yesterday, I';
    return { q: 'Build the word that fits.', fig: W.sent(when + ' ' + W.gap() + '.'), type: 'build', parts: [W.tile(v, 'base'), W.tile('ing', 'suffix'), W.tile('ed', 'suffix')].concat(lv > 1 ? [W.tile('s', 'suffix')] : []),
      answer: [0, suf === 'ing' ? 1 : 2], hint: '-ing: now. -ed: before now.', explain: W.sum([[v, 'base'], [suf, 'suffix']]), meta: { k: 'g1-build-verb', when: when, v: v } };
  }
  function ingTf() {
    var v = R.pick(VERBS), t = R.pick(WHEN.slice(0, 4)), right = R.int(0, 1) === 1, suf = right ? t[1] : (t[1] === 'ing' ? 'ed' : 'ing');
    return { q: 'Does this sentence sound right?', fig: W.sent(t[0] + ' <b>' + v + suf + '</b>.'), type: 'tf', answer: right,
      why: { options: ['The ending fits the time.', 'The ending is for a different time.'], answer: right ? 0 : 1 },
      hint: 'Now or before now?', explain: W.sent(t[0] + ' <b>' + v + t[1] + '</b>.'), meta: { k: 'g1-ing-tf', when: t[0], said: v + suf, v: v } };
  }
  function whenIs(lv) {
    var v = R.pick(VERBS), suf = R.pick(['ing', 'ed']);
    return Q.tiles('<b>' + v + suf + '</b>: when does it happen?', suf === 'ing' ? 'right now' : 'before now', [suf === 'ing' ? 'before now' : 'right now'].concat(lv > 1 ? ['tomorrow'] : []), { fig: W.sum([[v, 'base'], [suf, 'suffix']]),
      hint: 'Look at the ending.', explain: suf === 'ing' ? '-ing: happening now.' : '-ed: it already happened.', meta: { k: 'g1-when-is', suf: suf } });
  }
  function compoundTf() {
    var right = R.int(0, 1) === 1, w = right ? R.pick(COMPOUND).join('') : R.pick(NOT_COMPOUND);
    return { q: Q.name() + ' says <b>' + w + '</b> is made of two words.', type: 'tf', answer: right,
      why: { options: ['I can find two whole words in it.', 'I cannot find two whole words in it.'], answer: right ? 0 : 1 },
      hint: 'Look for a whole word at the start, and one at the end.', explain: right ? 'Yes: two words.' : '<b>' + w + '</b> is one word.', meta: { k: 'g1-compound-tf', w: w } };
  }
  function sameTf() {
    var p = R.pick(SAME), right = R.int(0, 1) === 1, other = right ? p[1] : R.pick(OPP.filter(function (o) { return o.indexOf(p[0]) < 0; }))[0];
    return { q: Q.name() + ' says <b>' + p[0] + '</b> and <b>' + other + '</b> mean the same.', type: 'tf', answer: right,
      why: { options: ['One could take the place of the other.', 'They mean different things.'], answer: right ? 0 : 1 },
      hint: 'Put each word in the same sentence.', explain: '<b>' + p[0] + '</b> means the same as <b>' + p[1] + '</b>.', meta: { k: 'g1-same-mean-tf', a: p[0], b: other } };
  }
  function matchSame() {
    return { q: 'Match the words that mean the same.', type: 'match', pairs: R.some(SAME, 3).map(function (p) { return [p[0], p[1]]; }), hint: 'Which word could take its place?', explain: 'They mean the same.', meta: { k: 'g1-match-same' } };
  }
  function samePick(lv) {
    var p = R.pick(SAME), right = p[1], wrong = R.some(OPP, lv > 1 ? 2 : 1).map(function (o) { return o[1]; }).filter(function (o) { return o !== right && o !== p[0]; });
    return Q.tiles('Which word could take the place of <b>' + p[0] + '</b>?', right, wrong.length ? wrong : [R.pick(['red', 'cup'])], { fig: W.sent('I said it was <b>' + p[0] + '</b>.'),
      hint: 'It should mean the same thing.', explain: '<b>' + p[0] + '</b> = <b>' + right + '</b>', meta: { k: 'g1-same-pick', w: p[0] } });
  }
  function oppTf() {
    var p = R.pick(OPP), right = R.int(0, 1) === 1, other = right ? p[1] : R.pick(SAME)[0];
    return { q: Q.name() + ' says <b>' + p[0] + '</b> and <b>' + other + '</b> are opposites.', type: 'tf', answer: right,
      why: { options: ['They are as different as can be.', 'They are not opposites.'], answer: right ? 0 : 1 },
      hint: 'Are they at each end of the same line?', explain: 'The opposite of <b>' + p[0] + '</b> is <b>' + p[1] + '</b>.', meta: { k: 'g1-opp-tf', a: p[0], b: other } };
  }
  function oppPair(lv) {
    var p = R.pick(OPP), wrong = R.some(SAME, lv > 1 ? 2 : 1).map(function (x) { return x[0] + ' / ' + x[1]; });
    return Q.one('Which pair are <b>opposites</b>?', p[0] + ' / ' + p[1], wrong, { hint: 'Opposites are as different as can be.', explain: '<b>' + p[0] + '</b> and <b>' + p[1] + '</b>.', meta: { k: 'g1-opp-pair' } });
  }
  function groupTf() {
    var keys = Object.keys(GROUPS), g = R.pick(keys), right = R.int(0, 1) === 1, w = right ? R.pick(GROUPS[g]) : R.pick(GROUPS[R.pick(keys.filter(function (k) { return k !== g; }))]);
    return { q: Q.name() + ' puts <b>' + w + '</b> in the group <b>' + g + '</b>.', type: 'tf', answer: right,
      why: { options: ['It is one of the ' + g + '.', 'It belongs in a different group.'], answer: right ? 0 : 1 },
      hint: 'What kind of thing is it?', explain: R.some(GROUPS[g], 3).join(', ') + ' are ' + g + '.', meta: { k: 'g1-group-tf', w: w, g: g } };
  }
  function groupPick() {
    var keys = Object.keys(GROUPS), g = R.pick(keys), right = R.some(GROUPS[g], 2), wrong = R.some(keys.filter(function (k) { return k !== g; }).map(function (k) { return R.pick(GROUPS[k]); }), 2);
    return Q.all('Pick every word in the group <b>' + g + '</b>.', right, wrong, { hint: 'What kind of thing is each word?', explain: right.join(', ') + ' are ' + g + '.', meta: { k: 'g1-group-pick', g: g } });
  }
  function contextTf() {
    var c = R.pick(CONTEXT), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' says <b>' + c[0] + '</b> means <b>' + said + '</b>.', fig: W.sent(c[1].replace(c[0], '<mark class="hl">' + c[0] + '</mark>')), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence fits.', 'The clue says something else.'], answer: right ? 0 : 1 },
      hint: 'Look for a clue in the sentence.', explain: 'The clue: <b>' + c[4] + '</b>.', meta: { k: 'g1-context-tf', w: c[0], said: said } };
  }
  function contextClue(lv) {
    var c = R.pick(CONTEXT), other = R.some(CONTEXT.filter(function (x) { return x !== c; }), lv > 1 ? 2 : 1).map(function (x) { return x[4]; });
    return Q.one('<b>' + c[0] + '</b> means ' + c[2] + '. Which words in the sentence are the clue?', c[4], other, { fig: W.sent(c[1].replace(c[0], '<mark class="hl">' + c[0] + '</mark>')),
      hint: 'Which words are in the sentence?', explain: W.sent(c[1].replace(c[4], '<b>' + c[4] + '</b>')), meta: { k: 'g1-context-clue', w: c[0] } });
  }

  Atlas.register('word-parts', {
    full: true,
    lessons: [{
      id: 'endings', title: 'Word parts', sub: 'Endings change a word. Two words can make one.',
      concepts: [
        { slug: 'plural', title: 'More than one: -s or -es', exp: ['B2.6'], skill: 'plural',
          model: [
            step(W.pic('cat') + W.pic('cat'), 'One cat, two...'),
            step(W.sum([['cat', 'base'], ['s', 'suffix']]), 'Most words: add <b>-s</b>.'),
            step(W.pic('box') + W.pic('box'), 'One box, two...'),
            step(W.sum([['box', 'base'], ['es', 'suffix']]), 'After s, x, sh or ch: add <b>-es</b>.'),
            step(W.sum([['dish', 'base'], ['es', 'suffix']]), 'You can hear the extra beat: dish-es.')
          ],
          guided: [function () { return pluralQ(1); }, function () { return pluralBuild(1); }, pluralTf],
          check: [function () { return pluralQ(1); }, function () { return pluralBuild(2); }, pickEs, pluralTf, function () { return pluralQ(2); }],
          coach: '<p>Say the plural out loud. If you hear an extra beat (box-es, dish-es), it needs -es.</p>',
          mistake: '<p>Writing "boxs". Say it: you hear two beats, so add -es.</p>' },
        { slug: 'ing-ed', title: '-ing and -ed', exp: ['B2.6'], skill: 'ing-ed',
          model: [
            step(W.sum([['jump', 'base'], ['ing', 'suffix']]), 'Happening now.'),
            step(W.sum([['jump', 'base'], ['ed', 'suffix']]), 'Already happened.'),
            step(W.sent('Yesterday, I <b>jumped</b>.'), 'Yesterday is a clue.'),
            step(W.sent('Look! The kids are <b>painting</b>.'), '"Look!" means now.'),
            step(W.sum([['paint', 'base'], ['ing', 'suffix']]))
          ],
          guided: [function () { return ingEd(1); }, function () { return buildVerb(1); }, function () { return whenIs(1); }],
          check: [function () { return ingEd(1); }, function () { return buildVerb(2); }, ingTf, function () { return whenIs(2); }, function () { return ingEd(2); }],
          coach: '<p>Act it out. "I am jumping" while jumping; "I jumped" after stopping. Point out that -ed can sound like /t/ (jumped) or /d/ (played) but is spelled the same.</p>',
          mistake: '<p>Spelling -ed as it sounds ("jumpt"). It is always spelled -ed.</p>' },
        { slug: 'compound', title: 'Two words make one', exp: ['B2.6'], skill: 'compound',
          model: [
            step(W.tile('snow', 'base') + ' + ' + W.tile('man', 'base')),
            step(W.sum([['snow', 'base'], ['man', 'base']]), 'Read each small word, then the big word.'),
            step(W.tile('rain', 'base') + ' + ' + W.tile('bow', 'base')),
            step(W.sum([['rain', 'base'], ['bow', 'base']]))
          ],
          key: '<p>These are called <b>compound words</b>.</p>',
          guided: [function () { return compound(1); }, function () { return splitCompound(1); }, compoundTf],
          check: [function () { return compound(2); }, pickCompound, function () { return splitCompound(2); }, compoundTf, function () { return compound(3); }],
          coach: '<p>Write compound words on cards and cut them in two. Mix the halves and rebuild them. Some silly ones (snowcake) are fun to talk about.</p>',
          mistake: '<p>Splitting in the wrong place (sn + owman). Look for a whole word at the start.</p>' }
      ]
    }, {
      id: 'meanings', title: 'Word meanings', sub: 'Same, opposite, groups and new words.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.7'], skill: 'same',
          model: [
            step(W.tile('big') + ' = ' + W.tile('large')),
            step(W.sent('The moose is <b>big</b>. The moose is <b>large</b>.'), 'Either word works.'),
            step(W.tile('shout') + ' = ' + W.tile('yell')),
            step(W.sent('Do not <b>shout</b>. Do not <b>yell</b>.'), 'Swap one for the other.')
          ],
          guided: [function () { return sameMeaning(1); }, function () { return samePick(1); }, sameTf],
          check: [function () { return sameMeaning(1); }, matchSame, function () { return samePick(2); }, sameTf, function () { return sameMeaning(2); }],
          coach: '<p>When reading, stop at a word and ask: "What is another word for that?"</p>',
          mistake: '<p>Picking an opposite. Put the word into the sentence and check that it means the same thing.</p>' },
        { slug: 'opposite', title: 'Opposites', exp: ['B2.7'], skill: 'opposite',
          model: [
            step(W.tile('hot') + ' &harr; ' + W.tile('cold')),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'As different as can be.'),
            step(W.tile('push') + ' &harr; ' + W.tile('pull'), 'Actions can be opposites too.'),
            step(W.tile('early') + ' &harr; ' + W.tile('late'))
          ],
          guided: [function () { return opposite(1); }, oppTf, matchOpp],
          check: [function () { return opposite(2); }, matchOpp, function () { return oppPair(2); }, oppTf, function () { return opposite(3); }],
          coach: '<p>Play "say the opposite" in the car: you say up, the child says down.</p>',
          mistake: '<p>Choosing a word that is just different (hot and wet). Opposites are on the same line, at each end.</p>' },
        { slug: 'groups', title: 'Word groups', exp: ['B2.7'], skill: 'groups',
          model: [
            step(W.tile('red') + W.tile('blue') + W.tile('green'), 'All colours.'),
            step(W.tile('moose') + W.tile('plum') + W.tile('beaver'), 'Plum does not belong.'),
            step(W.tile('rain') + W.tile('snow') + W.tile('fog'), 'All weather.'),
            step(W.tile('rain') + W.tile('square') + W.tile('hail'), 'Square is a shape, not weather.')
          ],
          guided: [groupName, function () { return oddOne(1); }, groupTf],
          check: [function () { return oddOne(1); }, groupPick, groupName, groupTf, function () { return oddOne(2); }],
          coach: '<p>Sort groceries or toys into groups and name each group.</p>',
          mistake: '<p>Choosing by sound or length. Ask: "What kind of thing is each word?"</p>' },
        { slug: 'new-words', title: 'Work out a new word', exp: ['B2.7'], skill: 'new-words',
          model: [
            step(W.sent('The soup was <mark class="hl">steaming</mark>, so I waited for it to cool.'), 'Read the whole sentence.'),
            step(W.sent('so I waited for it to <b>cool</b>'), 'A clue.'),
            step(W.tile('steaming') + ' = very hot'),
            step(W.sent('In Math, we <mark class="hl">subtract</mark>.'), 'Other subjects have words too.'),
            step(W.tile('subtract') + ' = take some away')
          ],
          guided: [function () { return context(1); }, function () { return subjectWord(1); }, contextTf],
          check: [function () { return context(2); }, function () { return contextClue(2); }, function () { return subjectWord(2); }, contextTf, function () { return context(3); }],
          coach: '<p>Teach two or three new words a week from books, Math or Science. Use each one in a sentence of your own every day that week.</p>',
          mistake: '<p>Guessing from the first letter. Read the whole sentence and look for a clue.</p>' }
      ]
    }],
    practice: [
      { id: 'plural', name: 'More than one', code: 'B2.6', gen: pluralQ },
      { id: 'ing-ed', name: '-ing and -ed', code: 'B2.6', gen: ingEd },
      { id: 'compound', name: 'Two words make one', code: 'B2.6', gen: compound },
      { id: 'same', name: 'Words that mean the same', code: 'B2.7', gen: sameMeaning },
      { id: 'opposite', name: 'Opposites', code: 'B2.7', gen: opposite },
      { id: 'groups', name: 'Word groups', code: 'B2.7', gen: oddOne },
      { id: 'new-words', name: 'Work out a new word', code: 'B2.7', gen: context }
    ],
    tasks: [
      { id: 'word-wall', title: 'My new words', code: 'B2.7', pic: W.icon('star'), say: 'Learn one new word each day. Use it in a sentence.', write: true,
        run: ['Choose a new word from a book, Math or Science (for example: enormous, melt, equal).', 'Say what it means in simple words. The child uses it in a sentence out loud, then writes the word.', 'Keep a list. At the end of the week, ask the child to explain each word.'],
        rubric: ['Cannot explain the words yet.', 'Explains some words with help.', 'Explains most words and uses them in sentences.', 'Uses the new words on their own when talking or writing.'] }
    ]
  });

  Q.shapes('word-parts', {
    plural: [[1, 'build', pluralBuild], [1, 'tf', pluralTf], [2, 'pick-es', pickEs]],
    'ing-ed': [[1, 'build', buildVerb], [1, 'when', whenIs], [2, 'tf', ingTf], [2, 'build-word', buildWord]],
    compound: [[1, 'split', splitCompound], [1, 'tf', compoundTf], [2, 'pick', pickCompound]],
    same: [[1, 'pick', samePick], [1, 'tf', sameTf], [2, 'match', matchSame]],
    opposite: [[1, 'tf', oppTf], [1, 'pair', oppPair], [2, 'match', matchOpp]],
    groups: [[1, 'name', groupName], [1, 'tf', groupTf], [2, 'pick', groupPick]],
    'new-words': [[1, 'subject', subjectWord], [1, 'tf', contextTf], [2, 'clue', contextClue]]
  });
})();
