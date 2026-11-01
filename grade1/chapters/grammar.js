/* Grade 1: grammar.
   Ontario 2023 Language, Grade 1, B3.2: "demonstrate an understanding of the functions of parts of speech in sentences,
   including common singular and plural nouns, using the pronoun "I", the past, present, and future verb tenses, common
   adjectives and adverbs, and common conjunctions, and use this knowledge to support comprehension and communicate meaning clearly".
   All sentences are written for this site. Answer checks: tests/verify/grade1-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var NOUNS = ['dog', 'moose', 'teacher', 'kite', 'apple', 'canoe', 'mitten', 'garden', 'school', 'sister', 'beaver', 'boat', 'tent', 'lake', 'carrot', 'pencil'];
  var VERBS = ['run', 'jump', 'sing', 'swim', 'read', 'eat', 'throw', 'dig', 'climb', 'laugh', 'sit', 'catch'];
  var ADJS = ['red', 'tall', 'soft', 'happy', 'cold', 'tiny', 'loud', 'shiny', 'big', 'wet', 'sticky', 'fluffy', 'dark', 'bumpy', 'sleepy'];
  var ADVS = ['slowly', 'quickly', 'quietly', 'loudly', 'gently', 'carefully', 'softly', 'patiently', 'warmly'];
  /* sentences with exactly one naming word, one doing word, one describing word or one word that tells how */
  var NOUN_IN = { 'The cat sleeps.': 'cat', 'A frog jumped.': 'frog', 'The bell rang.': 'bell', 'Our teacher smiled.': 'teacher', 'The baby laughed.': 'baby', 'A goose honked.': 'goose',
    'A beaver swam.': 'beaver', 'The kite flew.': 'kite', 'My sister sang.': 'sister', 'The boat sank.': 'boat', 'The apple fell.': 'apple', 'Our tent leaked.': 'tent' };
  var VERB_IN = { 'Amara swims.': 'swims', 'The dog barks.': 'barks', 'Kai jumped high.': 'jumped', 'Birds sing.': 'sing', 'Mei reads.': 'reads', 'We clapped.': 'clapped',
    'Lena laughed.': 'laughed', 'The kids dug.': 'dug', 'Jun sat down.': 'sat', 'Ava throws far.': 'throws', 'Grandpa climbs up.': 'climbs', 'Ella eats lunch.': 'eats' };
  var ADJ_IN = { 'The red kite flew.': 'red', 'A tiny ant crawled.': 'tiny', 'The cold wind blew.': 'cold', 'We saw a tall tree.': 'tall', 'The happy dog barked.': 'happy', 'Hana has a blue hat.': 'blue',
    'The wet dog shook.': 'wet', 'Theo hugged a fluffy cat.': 'fluffy', 'A big bus stopped.': 'big', 'The dark sky rumbled.': 'dark', 'Mia has sticky hands.': 'sticky', 'The sleepy baby yawned.': 'sleepy' };
  var ADV_IN = { 'The turtle walked slowly.': 'slowly', 'Leila ran quickly.': 'quickly', 'The baby slept quietly.': 'quietly', 'The band played loudly.': 'loudly', 'Pat the puppy gently.': 'gently',
    'Omar carried the eggs carefully.': 'carefully', 'Sofia sang softly.': 'softly', 'The kids waited patiently.': 'patiently', 'Grandma smiled warmly.': 'warmly', 'The rabbit hopped quickly.': 'quickly',
    'Ravi spoke quietly.': 'quietly', 'The drum beat loudly.': 'loudly' };
  var MANY = [['dog', 'dogs'], ['cat', 'cats'], ['tree', 'trees'], ['box', 'boxes'], ['bus', 'buses'], ['hat', 'hats'], ['cup', 'cups'], ['egg', 'eggs'], ['key', 'keys'], ['kite', 'kites'],
    ['ball', 'balls'], ['bee', 'bees'], ['apple', 'apples'], ['dish', 'dishes'], ['bird', 'birds'], ['fox', 'foxes'], ['bench', 'benches']];
  var PICS = ['dog', 'cat', 'tree', 'box', 'bus', 'hat', 'cup', 'egg', 'key', 'kite', 'ball', 'bee', 'apple', 'fox'];
  var I_S = [['Sam and I went home.', 'Sam and i went home.'], ['I like to paint.', 'i like to paint.'], ['Can I have a turn?', 'Can i have a turn?'], ['Mom and I made soup.', 'Mom and i made soup.'],
    ['Today I lost a tooth.', 'Today i lost a tooth.'], ['I can tie my shoes.', 'i can tie my shoes.'], ['Leila and I went skating.', 'Leila and i went skating.'], ['May I have some water?', 'May i have some water?'],
    ['I saw a beaver.', 'i saw a beaver.'], ['Yesterday I helped Dad.', 'Yesterday i helped Dad.']];
  var TENSE_V = ['jump', 'play', 'help', 'walk', 'paint', 'kick', 'look', 'pull', 'climb', 'clean'];
  var WHO = ['Kai', 'Noor', 'Theo', 'My cousin', 'Grandpa'];
  var WHEN = { past: ['Yesterday', 'Last week'], present: ['Every day', 'Today'], future: ['Tomorrow', 'Next week'] };
  var TLABEL = { past: 'in the past', present: 'now', future: 'in the future' }, TENSES = ['past', 'present', 'future'];
  /* joining words: [sentence with ___, the word that fits, other joining words] */
  var CONJ = [['I like apples ___ pears.', 'and', ['but', 'so']], ['I wanted to play outside, ___ it was raining.', 'but', ['and', 'so']], ['Do you want milk ___ juice?', 'or', ['but', 'so']],
    ['I was hungry, ___ I ate a snack.', 'so', ['or', 'but']], ['We stayed in ___ it was too cold.', 'because', ['or', 'and']], ['Ava has a sled, ___ she has no boots.', 'but', ['or', 'because']],
    ['We packed a tent ___ two sleeping bags.', 'and', ['or', 'because']], ['Should we walk ___ take the bus?', 'or', ['so', 'because']], ['It was dark, ___ we turned on the light.', 'so', ['or', 'and']],
    ['Leo wore a hat ___ his ears were cold.', 'because', ['or', 'and']], ['The lake was cold, ___ we swam anyway.', 'but', ['or', 'because']], ['You can have a pear ___ a plum.', 'or', ['so', 'because']],
    ['The puppy was tired, ___ it took a nap.', 'so', ['or', 'and']], ['Grandma sang ___ we danced.', 'and', ['or', 'because']]];
  var MEAN = { and: 'adds', but: 'a surprise', or: 'a choice', so: 'a reason', because: 'a reason' };
  var KIND = { naming: NOUNS, doing: VERBS, describing: ADJS };
  var KDESC = { naming: 'It names a person, animal, place or thing.', doing: 'It tells what someone does.', describing: 'It tells what something is like.' };

  function words(s) { return s.replace(/[.?!,]/g, '').split(' '); }
  function others(kind) { return Object.keys(KIND).filter(function (k) { return k !== kind; }).reduce(function (a, k) { return a.concat(KIND[k]); }, []); }
  function tapIn(map, q, prompt, hint, name, key) {
    var s = R.pick(Object.keys(map)), t = words(s), w = map[s];
    return { q: q, type: 'tap', tiles: t, answer: t.indexOf(w), fig: W.sent(s), prompt: prompt, hint: hint, explain: '<b>' + w + '</b> ' + name, meta: { k: key, s: s } };
  }
  /* is this a naming / doing / describing word? */
  function kindTf(kind) {
    var right = R.int(0, 1) === 1, w = R.pick(right ? KIND[kind] : others(kind));
    return { q: 'Is <b>' + w + '</b> a ' + kind + ' word?', type: 'tf', answer: right, why: { options: [KDESC[kind], 'It is a different kind of word.'], answer: right ? 0 : 1 },
      hint: KDESC[kind], explain: '<b>' + w + '</b> is a ' + Object.keys(KIND).filter(function (k) { return KIND[k].indexOf(w) >= 0; })[0] + ' word.', meta: { k: 'g1-word-kind-tf', w: w, kind: kind } };
  }
  function pickKind(kind) {
    var n = R.int(1, 3);
    return Q.all('Pick every <b>' + kind + ' word</b>.', R.some(KIND[kind], n), R.some(others(kind), 4 - n), { hint: KDESC[kind], explain: KDESC[kind], meta: { k: 'g1-pick-word-kind', kind: kind } });
  }

  /* ---------- question makers: nouns, one or more, and I ---------- */
  function nounPick(lv) {
    return Q.one('Which word is a <b>naming word</b>?', R.pick(NOUNS), R.some(VERBS, lv > 1 ? 2 : 1).concat(R.some(ADJS, 1)), { prompt: 'A naming word names a person, animal, place or thing.',
      hint: 'Can you put "a" or "the" in front of it?', explain: 'A naming word is called a <b>noun</b>.', meta: { k: 'g1-noun-pick' } });
  }
  function tapNoun() { return tapIn(NOUN_IN, 'Tap the <b>naming word</b>.', 'Which word names a person, animal or thing?', 'Which word could you draw?', 'is a naming word.', 'g1-tap-noun'); }
  function oneMore() {
    var m = R.pick(MANY), many = R.int(0, 1) === 1, w = m[many ? 1 : 0];
    return Q.tiles('Is <b>' + w + '</b> one, or more than one?', many ? 'more than one' : 'one', [many ? 'one' : 'more than one'], { prompt: 'Look at the end of the word.',
      hint: '-s or -es at the end means more than one.', explain: m[0] + ': one. ' + m[1] + ': more than one.', meta: { k: 'g1-one-more', w: w } });
  }
  function picMore() {
    var n = R.pick(PICS), m = MANY.filter(function (x) { return x[0] === n; })[0], many = R.int(0, 1) === 1, tiles = [W.pic(n), W.pic(n) + W.pic(n) + W.pic(n)];
    return { q: 'Tap the picture of <b>' + m[many ? 1 : 0] + '</b>.', type: 'tap', tiles: tiles, answer: many ? 1 : 0, answerText: many ? 'more than one' : 'one',
      hint: 'Look at the end of the word.', explain: m[0] + ': one. ' + m[1] + ': more than one.', meta: { k: 'g1-pic-more', w: m[many ? 1 : 0] } };
  }
  function manyFit(lv) {
    var m = R.pick(MANY), num = R.pick(['one', 'two', 'three', 'five']), right = m[num === 'one' ? 0 : 1];
    return Q.tiles('Which word fits?', right, [m[num === 'one' ? 1 : 0]], { fig: W.sent('I see ' + num + ' ' + W.gap() + '.'),
      hint: 'One, or more than one?', explain: W.sent('I see ' + num + ' <b>' + right + '</b>.'), meta: { k: 'g1-many-fit', num: num, w: m[0] } });
  }
  function pickMany() {
    var ms = R.some(MANY, 4), n = R.int(1, 3);
    return Q.all('Pick every word that means <b>more than one</b>.', ms.slice(0, n).map(function (m) { return m[1]; }), ms.slice(n).map(function (m) { return m[0]; }), {
      hint: 'Look for -s or -es at the end.', explain: 'More than one: ' + ms.slice(0, n).map(function (m) { return m[1]; }).join(', ') + '.', meta: { k: 'g1-pick-many' } });
  }
  function capitalI(lv) {
    var p = R.pick(I_S), other = R.pick(I_S.filter(function (x) { return x !== p; }));
    return Q.one('Which sentence is written the right way?', p[0], [p[1]].concat(lv > 1 ? [other[1]] : []), { prompt: 'Look at the word <b>I</b>.',
      hint: 'When you talk about yourself, I is always a capital.', explain: W.sent(p[0]), meta: { k: 'g1-capital-i' } });
  }
  function iTf() {
    var p = R.pick(I_S), right = R.int(0, 1) === 1;
    return { q: 'Is the word <b>I</b> written the right way?', fig: W.sent(p[right ? 0 : 1]), type: 'tf', answer: right,
      why: { options: ['I is a capital.', 'I should be a capital.'], answer: right ? 0 : 1 }, hint: 'I is always a capital.', explain: W.sent(p[0]), meta: { k: 'g1-i-tf', shown: p[right ? 0 : 1] } };
  }
  function iFill() {
    var p = R.pick(I_S.filter(function (x) { return x[0].indexOf('I ') > 0; }));
    return Q.tiles('Which fits?', 'I', ['i'], { fig: W.sent(p[0].replace(' I ', ' ' + W.gap() + ' ')), hint: 'When you mean yourself, it is a capital.', explain: W.sent(p[0]), meta: { k: 'g1-i-fill', s: p[0] } });
  }
  function iTap() {
    var p = R.pick(I_S), t = words(p[1]);
    return { q: 'Tap the word that should be a capital.', type: 'tap', tiles: t, answer: t.indexOf('i'), fig: W.sent(p[1]), hint: 'Which word means yourself?', explain: W.sent(p[0]), meta: { k: 'g1-i-tap', s: p[1] } };
  }

  /* ---------- question makers: verbs and when ---------- */
  function tapVerb() { return tapIn(VERB_IN, 'Tap the <b>doing word</b>.', 'Which word tells what someone does?', 'Can you act it out?', 'is a doing word, a <b>verb</b>.', 'g1-tap-verb'); }
  function verbPick(lv) {
    return Q.one('Which word is a <b>doing word</b>?', R.pick(VERBS), R.some(NOUNS, lv > 1 ? 2 : 1).concat(R.some(ADJS, 1)), { hint: 'Can you act it out?', explain: 'A doing word is called a <b>verb</b>.', meta: { k: 'g1-verb-pick' } });
  }
  function form(v, t) { return t === 'past' ? v + 'ed' : t === 'future' ? 'will ' + v : v + 's'; }
  function tenseFit(lv) {
    var t = R.pick(TENSES), v = R.pick(TENSE_V), who = R.pick(WHO), when = R.pick(WHEN[t]);
    return Q.one('Which fits?', form(v, t), TENSES.filter(function (x) { return x !== t; }).map(function (x) { return form(v, x); }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(when + ', ' + who + ' ' + W.gap() + '.'), prompt: 'Look at the first words. When is it?', hint: 'Past: -ed. Now: -s. Future: will.',
      explain: W.sent(when + ', ' + who + ' <b>' + form(v, t) + '</b>.'), meta: { k: 'g1-tense-fit', when: when, v: v } });
  }
  function whenTap() {
    var t = R.pick(TENSES), v = R.pick(TENSE_V), s = R.pick(WHO) + ' ' + form(v, t) + '.';
    return Q.tiles('When does it happen?', TLABEL[t], TENSES.filter(function (x) { return x !== t; }).map(function (x) { return TLABEL[x]; }), { fig: W.sent(s),
      prompt: 'Look at the doing word. Does it end in -ed? Is there a <b>will</b>?', hint: '-ed: in the past. will: in the future.', explain: W.sent(s) + ' happens ' + TLABEL[t] + '.', meta: { k: 'g1-when-tap', s: s } });
  }
  function tenseTf() {
    var t = R.pick(TENSES), shownT = R.pick([t, R.pick(TENSES)]), v = R.pick(TENSE_V), when = R.pick(WHEN[t]), who = R.pick(WHO), s = when + ', ' + who + ' ' + form(v, shownT) + '.';
    return { q: 'Does the doing word fit the time?', fig: W.sent(s), type: 'tf', answer: shownT === t,
      why: { options: ['The doing word matches when it happens.', 'The doing word shows a different time.'], answer: shownT === t ? 0 : 1 },
      hint: 'Past: -ed. Now: -s. Future: will.', explain: W.sent(when + ', ' + who + ' <b>' + form(v, t) + '</b>.'), meta: { k: 'g1-tense-tf', s: s, when: when } };
  }
  function matchTense() {
    var vs = R.some(TENSE_V, 3);
    return { q: 'Match each sentence to when it happens.', type: 'match', pairs: R.shuffle(TENSES).map(function (t, i) { return [R.pick(WHO) + ' ' + form(vs[i], t) + '.', TLABEL[t]]; }),
      hint: '-ed: in the past. will: in the future.', explain: 'jumped: past. jumps: now. will jump: future.', meta: { k: 'g1-match-tense' } };
  }

  /* ---------- question makers: describing, how, and joining ---------- */
  function tapAdj() { return tapIn(ADJ_IN, 'Tap the <b>describing word</b>.', 'Which word tells what something is like?', 'It tells colour, size or how something feels.', 'describes. It is an <b>adjective</b>.', 'g1-tap-adj'); }
  function adjFit(lv) {
    var s = R.pick(Object.keys(ADJ_IN)), a = ADJ_IN[s];
    return Q.one('Which word fits?', a, R.some(VERBS, 1).concat(lv > 1 ? R.some(ADVS, 1) : []), { fig: W.sent(s.replace(a, W.gap())),
      hint: 'Which word tells what it is like?', explain: W.sent(s.replace(a, '<b>' + a + '</b>')), meta: { k: 'g1-adj-fit', s: s } });
  }
  function matchKind() {
    var ks = Object.keys(KIND);
    return { q: 'Match each word to its kind.', type: 'match', pairs: R.shuffle(ks).map(function (k) { return [R.pick(KIND[k]), k + ' word']; }), hint: 'Naming: a thing. Doing: an action. Describing: what it is like.',
      explain: 'Naming, doing and describing words.', meta: { k: 'g1-match-word-kind' } };
  }
  function tapAdv() { return tapIn(ADV_IN, 'Tap the word that tells <b>how</b>.', 'How did they do it?', 'Many of these words end in -ly.', 'tells how. It is an <b>adverb</b>.', 'g1-tap-adv'); }
  function advFit(lv) {
    var s = R.pick(Object.keys(ADV_IN)), a = ADV_IN[s];
    return Q.one('Which word tells how?', a, R.some(ADJS, 1).concat(lv > 1 ? R.some(NOUNS, 1) : []), { fig: W.sent(s.replace(a, W.gap())),
      hint: 'How did they do it?', explain: W.sent(s.replace(a, '<b>' + a + '</b>')), meta: { k: 'g1-adv-fit', s: s } });
  }
  function advTf() {
    var s = R.pick(Object.keys(ADV_IN)), right = R.int(0, 1) === 1, w = right ? ADV_IN[s] : R.pick(words(s).filter(function (x) { return x !== ADV_IN[s]; }));
    return { q: 'True or false? <b>' + w + '</b> tells how.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['It tells how they did it.', 'It does not tell how.'], answer: right ? 0 : 1 }, hint: 'How did they do it?', explain: '<b>' + ADV_IN[s] + '</b> tells how.', meta: { k: 'g1-adv-tf', s: s, w: w } };
  }
  function pickAdv() {
    var n = R.int(1, 3);
    return Q.all('Pick every word that tells <b>how</b>.', R.some(ADVS, n), R.some(ADJS.concat(VERBS), 4 - n), { hint: 'Many of these words end in -ly.', explain: 'Words that tell how are called adverbs.', meta: { k: 'g1-pick-adv' } });
  }
  function conjFit(lv) {
    var c = R.pick(CONJ);
    return Q.one('Which joining word fits?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0].replace('___', W.gap())), prompt: 'Read it with each word. Which makes sense?',
      hint: '<b>and</b> adds. <b>but</b> is a surprise. <b>or</b> is a choice. <b>so</b> and <b>because</b> give a reason.', explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g1-conj-fit', s: c[0] } });
  }
  function conjWhy() {
    var c = R.pick(CONJ);
    return Q.tiles('Why does it use <b>' + c[1] + '</b>?', MEAN[c[1]], ['adds', 'a surprise', 'a choice', 'a reason'].filter(function (x) { return x !== MEAN[c[1]]; }), {
      fig: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), hint: 'Does it add, show a surprise, give a choice, or give a reason?', explain: '<b>' + c[1] + '</b>: ' + MEAN[c[1]] + '.', meta: { k: 'g1-conj-why', s: c[0] } });
  }
  function conjTf() {
    var c = R.pick(CONJ), w = R.pick([c[1], R.pick(c[2])]);
    return { q: 'Does the joining word fit?', fig: W.sent(c[0].replace('___', '<b>' + w + '</b>')), type: 'tf', answer: w === c[1],
      why: { options: ['It makes sense.', 'Another joining word fits better.'], answer: w === c[1] ? 0 : 1 }, hint: 'Read it out loud. Does it make sense?',
      explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g1-conj-tf', s: c[0], w: w } };
  }
  function matchConj() {
    return { q: 'Match each joining word to its job.', type: 'match', pairs: R.shuffle(['and', 'but', 'or', 'so']).map(function (c) { return [c, MEAN[c]]; }),
      hint: 'Think of a sentence with each one.', explain: 'and adds, but is a surprise, or is a choice, so gives a reason.', meta: { k: 'g1-match-conj' } };
  }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'nouns', title: 'Naming words', sub: 'Nouns, one or more than one, and the word I.',
      concepts: [
        { slug: 'nouns', title: 'A naming word names a person, animal, place or thing', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.tile('teacher') + W.tile('moose') + W.tile('school') + W.tile('kite')),
            step(W.pic('moose') + W.tile('moose'), 'You could draw it.'),
            step(W.sent('The <b>cat</b> sleeps.'), 'Which word could you draw? <b>cat</b>.'),
            step(W.sent('The <b>kite</b> flew.'), 'Put <i>the</i> in front: the kite.')
          ],
          key: '<p>Naming words are called <b>nouns</b>.</p>',
          guided: [function () { return nounPick(1); }, tapNoun, function () { return kindTf('naming'); }],
          check: [function () { return nounPick(2); }, tapNoun, function () { return pickKind('naming'); }, function () { return kindTf('naming'); }, tapNoun],
          coach: '<p>Walk around the house and name things: each one is a noun. Then find nouns in a picture book.</p>',
          mistake: '<p>Picking a doing word. Ask: "Can you put <i>the</i> in front of it?"</p>' },
        { slug: 'one-more', title: 'One or more than one', exp: ['B3.2'], skill: 'plurals',
          model: [
            step(W.pic('dog') + W.tile('dog'), 'One.'),
            step(W.pic('dog') + W.pic('dog') + W.pic('dog') + W.tile(W.hl('dogs', 3, 4)), 'Add -s.'),
            step(W.pic('box') + W.tile('box'), 'One box.'),
            step(W.pic('box') + W.pic('box') + W.tile(W.hl('boxes', 3, 5)), 'After x, add -es.')
          ],
          guided: [oneMore, picMore, function () { return manyFit(1); }],
          check: [oneMore, picMore, function () { return manyFit(2); }, pickMany, oneMore],
          coach: '<p>Line up toys: one car, two cars. Say and write each.</p>',
          mistake: '<p>Missing the -s when reading. Point to the end of the word.</p>' },
        { slug: 'capital-i', title: 'I is always a capital', exp: ['B3.2'], skill: 'capital-i',
          model: [
            step(W.sent('Sam and ' + W.hl('I', 0, 1) + ' went home.'), 'When you mean yourself.'),
            step(W.sent('Sam and i went home.'), 'Small i is not right.'),
            step(W.sent(W.hl('i', 0, 1) + ' saw a beaver.')),
            step(W.sent(W.hl('I', 0, 1) + ' saw a beaver.'), 'Fix it: <b>I</b>.')
          ],
          guided: [function () { return capitalI(1); }, iFill, iTf],
          check: [function () { return capitalI(2); }, iTap, iTf, iFill, function () { return capitalI(2); }],
          coach: '<p>Have the child write three sentences about themselves that start with I.</p>',
          mistake: '<p>Writing small i in the middle of a sentence. It is a capital everywhere.</p>' }
      ]
    }, {
      id: 'verbs', title: 'Doing words', sub: 'Verbs, and when it happens.',
      concepts: [
        { slug: 'verbs', title: 'A doing word tells what someone does', exp: ['B3.2'], skill: 'verbs',
          model: [
            step(W.tile('run') + W.tile('jump') + W.tile('sing'), 'You can act them out.'),
            step(W.sent('The dog <b>barks</b>.'), 'What does the dog do?'),
            step(W.sent('Lena laughed.'), 'Who? Lena. What did she do?'),
            step(W.sent('Lena <b>laughed</b>.'))
          ],
          key: '<p>Doing words are called <b>verbs</b>.</p>',
          guided: [tapVerb, function () { return verbPick(1); }, function () { return kindTf('doing'); }],
          check: [tapVerb, function () { return verbPick(2); }, function () { return pickKind('doing'); }, function () { return kindTf('doing'); }, tapVerb],
          coach: '<p>Play charades: act out a verb and the child names it.</p>',
          mistake: '<p>Choosing the name (dog) as the doing word. Ask: "What is the dog doing?"</p>' },
        { slug: 'when', title: 'Yesterday, today, tomorrow', exp: ['B3.2'], skill: 'tense',
          model: [
            step(W.sent('Yesterday, Kai <b>jumped</b>.'), 'In the past: -ed.'),
            step(W.sent('Every day, Kai <b>jumps</b>.'), 'Now.'),
            step(W.sent('Tomorrow, Kai <b>will jump</b>.'), 'In the future: will.'),
            step(W.sent('Last week, Noor ' + W.gap() + '.'), '"Last week" is in the past.'),
            step(W.sent('Last week, Noor <b>helped</b>.'), 'So: -ed.')
          ],
          guided: [function () { return tenseFit(1); }, whenTap, tenseTf],
          check: [function () { return tenseFit(2); }, whenTap, matchTense, tenseTf, function () { return tenseFit(2); }],
          coach: '<p>At dinner, ask: "What did you do today? What will you do tomorrow?" Listen for -ed and will.</p>',
          mistake: '<p>Saying "Yesterday I walk." Ask: "When was it?" and add -ed.</p>' }
      ]
    }, {
      id: 'describe', title: 'Describing and joining words', sub: 'Adjectives, words that tell how, and joining words.',
      concepts: [
        { slug: 'adjectives', title: 'A describing word tells what something is like', exp: ['B3.2'], skill: 'describe',
          model: [
            step(W.sent('The kite flew.'), 'What kind of kite?'),
            step(W.pic('kite') + W.sent('The <b>red</b> kite flew.'), 'Now we can picture it.'),
            step(W.sent('A cat.'), 'What is it like?'),
            step(W.pic('cat') + W.sent('A <b>fluffy</b> cat.'), 'Colour, size, or how it feels.')
          ],
          key: '<p>Describing words are called <b>adjectives</b>.</p>',
          guided: [tapAdj, function () { return adjFit(1); }, function () { return kindTf('describing'); }],
          check: [tapAdj, matchKind, function () { return adjFit(2); }, function () { return pickKind('describing'); }, function () { return kindTf('describing'); }],
          coach: '<p>Play "I spy" with describing words: "I spy something soft and blue."</p>',
          mistake: '<p>Tapping the naming word. Ask: "Which word tells us about the kite?"</p>' },
        { slug: 'adverbs', title: 'Words that tell how', exp: ['B3.2'], skill: 'adverbs',
          model: [
            step(W.sent('The turtle walked <b>slowly</b>.'), 'How did it walk?'),
            step(W.tile(W.hl('slowly', 4, 6)) + W.tile(W.hl('quickly', 5, 7)) + W.tile(W.hl('loudly', 4, 6)), 'Many end in -ly.'),
            step(W.sent('Sofia sang ' + W.gap() + '.'), 'How did she sing?'),
            step(W.sent('Sofia sang <b>softly</b>.'))
          ],
          key: '<p>Words that tell how are called <b>adverbs</b>.</p>',
          guided: [tapAdv, function () { return advFit(1); }, advTf],
          check: [tapAdv, function () { return advFit(2); }, pickAdv, advTf, tapAdv],
          coach: '<p>Give an action and an adverb to act out: "Walk slowly. Now walk quickly."</p>',
          mistake: '<p>Choosing the doing word. Ask: "How did they do it?"</p>' },
        { slug: 'joining', title: 'Joining words', exp: ['B3.2'], skill: 'joining',
          model: [
            step(W.sent('apples <b>and</b> pears'), '<b>and</b> adds.'),
            step(W.sent('I wanted to play, <b>but</b> it rained.'), '<b>but</b>: a surprise.'),
            step(W.sent('milk <b>or</b> juice?'), '<b>or</b>: a choice.'),
            step(W.sent('I was hungry, <b>so</b> I ate.'), '<b>so</b> and <b>because</b>: a reason.')
          ],
          guided: [function () { return conjFit(1); }, conjWhy, conjTf],
          check: [function () { return conjFit(2); }, matchConj, conjWhy, conjTf, function () { return conjFit(2); }],
          coach: '<p>Start a sentence and let the child finish it: "I like snow, but..." "I put on my coat because..."</p>',
          mistake: '<p>Using "and" for everything. Ask: "Is it a surprise? A choice? A reason?"</p>' }
      ]
    }],
    practice: [
      { id: 'nouns', name: 'Naming words', code: 'B3.2', gen: nounPick },
      { id: 'plurals', name: 'One or more than one', code: 'B3.2', gen: oneMore },
      { id: 'capital-i', name: 'The word I', code: 'B3.2', gen: capitalI },
      { id: 'verbs', name: 'Doing words', code: 'B3.2', gen: verbPick },
      { id: 'tense', name: 'Past, now and future', code: 'B3.2', gen: tenseFit },
      { id: 'describe', name: 'Describing words', code: 'B3.2', gen: function () { return tapAdj(); } },
      { id: 'adverbs', name: 'Words that tell how', code: 'B3.2', gen: function () { return tapAdv(); } },
      { id: 'joining', name: 'Joining words', code: 'B3.2', gen: conjFit }
    ]
  });

  Q.shapes('grammar', {
    nouns: [[1, 'tap', tapNoun], [1, 'true or false', function () { return kindTf('naming'); }], [1, 'pick', function () { return pickKind('naming'); }]],
    plurals: [[1, 'picture', picMore], [1, 'fill', manyFit], [1, 'pick', pickMany]],
    'capital-i': [[1, 'true or false', iTf], [1, 'fill', iFill], [1, 'tap', iTap]],
    verbs: [[1, 'tap', tapVerb], [1, 'true or false', function () { return kindTf('doing'); }], [1, 'pick', function () { return pickKind('doing'); }]],
    tense: [[1, 'when', whenTap], [1, 'true or false', tenseTf], [1, 'match', matchTense]],
    describe: [[1, 'fill', adjFit], [1, 'true or false', function () { return kindTf('describing'); }], [2, 'match', matchKind]],
    adverbs: [[1, 'fill', advFit], [1, 'true or false', advTf], [1, 'pick', pickAdv]],
    joining: [[1, 'why', conjWhy], [1, 'true or false', conjTf], [1, 'match', matchConj]]
  });
})();
