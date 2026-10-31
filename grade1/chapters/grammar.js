/* Grade 1: grammar.
   Ontario 2023 Language, Grade 1, B3.2: "demonstrate an understanding of the functions of parts of speech in sentences,
   including common singular and plural nouns, using the pronoun "I", the past, present, and future verb tenses, common
   adjectives and adverbs, and common conjunctions, and use this knowledge to support comprehension and communicate meaning clearly".
   All sentences are written for this site. Answer checks: tests/verify/grade1-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var NOUNS = ['dog', 'moose', 'teacher', 'kite', 'apple', 'park', 'canoe', 'mitten', 'drum', 'garden'];
  var VERBS = ['run', 'jump', 'sing', 'swim', 'read', 'paint', 'climb', 'eat'];
  var ADJS = ['red', 'tall', 'soft', 'happy', 'cold', 'tiny', 'loud', 'shiny'];
  /* sentences with exactly one naming word, one doing word, one describing word or one word that tells how */
  var NOUN_S = ['The cat sleeps.', 'A frog jumped.', 'The bell rang.', 'Our teacher smiled.', 'The baby laughed.', 'A goose honked.'];
  var VERB_S = ['Amara swims.', 'The dog barks.', 'Kai jumped high.', 'Birds sing.', 'Mei reads.', 'We clapped.'];
  var ADJ_S = ['The red kite flew.', 'A tiny ant crawled.', 'The cold wind blew.', 'We saw a tall tree.', 'The happy dog barked.', 'Hana has a blue hat.'];
  var ADV_S = ['The turtle walked slowly.', 'Leila ran quickly.', 'The baby slept quietly.', 'The band played loudly.', 'Pat the puppy gently.', 'Omar carried the eggs carefully.'];
  var MANY = [['dog', 'dogs'], ['cat', 'cats'], ['tree', 'trees'], ['box', 'boxes'], ['bus', 'buses'], ['hat', 'hats'], ['dish', 'dishes'], ['bird', 'birds']];
  var I_S = [['Sam and I went home.', 'Sam and i went home.'], ['I like to paint.', 'i like to paint.'], ['Can I have a turn?', 'Can i have a turn?'], ['Mom and I made soup.', 'Mom and i made soup.'], ['Today I lost a tooth.', 'Today i lost a tooth.']];
  var TENSE_V = ['jump', 'play', 'help', 'walk', 'paint', 'kick', 'look', 'pull', 'climb', 'clean'];
  var WHO = ['Kai', 'Noor', 'Theo', 'My cousin', 'Grandpa'];
  var WHEN = { past: ['Yesterday', 'Last week'], present: ['Every day', 'Today'], future: ['Tomorrow', 'Next week'] };
  var TLABEL = { past: 'in the past', present: 'now', future: 'in the future' };
  /* joining words: [sentence with ___, the word that fits, other joining words] */
  var CONJ = [['I like apples ___ pears.', 'and', ['but', 'so']], ['I wanted to play outside, ___ it was raining.', 'but', ['and', 'so']], ['Do you want milk ___ juice?', 'or', ['but', 'so']],
    ['I was hungry, ___ I ate a snack.', 'so', ['or', 'but']], ['We stayed in ___ it was too cold.', 'because', ['or', 'and']], ['Ava has a sled, ___ she has no boots.', 'but', ['or', 'because']]];
  var KIND = { naming: NOUNS, doing: VERBS, describing: ADJS };

  function words(s) { return s.replace(/[.?!,]/g, '').split(' '); }
  /* ---------- question makers: nouns and I ---------- */
  var NOUN_IN = { 'The cat sleeps.': 'cat', 'A frog jumped.': 'frog', 'The bell rang.': 'bell', 'Our teacher smiled.': 'teacher', 'The baby laughed.': 'baby', 'A goose honked.': 'goose' };
  function nounPick(lv) {
    return Q.one('Which word is a <b>naming word</b>?', R.pick(NOUNS), R.some(VERBS, lv > 1 ? 2 : 1).concat(R.some(ADJS, 1)), { prompt: 'A naming word names a person, animal, place or thing.',
      hint: 'Can you put "a" or "the" in front of it?', explain: 'A naming word is called a <b>noun</b>.', meta: { k: 'g1-noun-pick' } });
  }
  function tapNoun() {
    var s = R.pick(NOUN_S), t = words(s), n = NOUN_IN[s];
    return { q: 'Tap the <b>naming word</b>.', type: 'tap', tiles: t, answer: t.indexOf(n), fig: W.sent(s), prompt: 'Which word names a person, animal or thing?',
      hint: 'Which word could you draw?', explain: '<b>' + n + '</b> is a naming word.', meta: { k: 'g1-tap-noun', s: s } };
  }
  function oneMore(lv) {
    var m = R.pick(MANY), many = R.int(0, 1) === 1, w = m[many ? 1 : 0];
    return Q.tiles('Is <b>' + w + '</b> one, or more than one?', many ? 'more than one' : 'one', [many ? 'one' : 'more than one'], { prompt: 'Look at the end of the word.',
      hint: '-s or -es at the end means more than one.', explain: m[0] + ': one. ' + m[1] + ': more than one.', meta: { k: 'g1-one-more', w: w } });
  }
  function capitalI(lv) {
    var p = R.pick(I_S), other = R.pick(I_S.filter(function (x) { return x !== p; }));
    return Q.one('Which sentence is written the right way?', p[0], [p[1]].concat(lv > 1 ? [other[1]] : []), { prompt: 'Look at the word <b>I</b>.',
      hint: 'When you talk about yourself, I is always a capital.', explain: W.sent(p[0]), meta: { k: 'g1-capital-i' } });
  }

  /* ---------- question makers: verbs and when ---------- */
  var VERB_IN = { 'Amara swims.': 'swims', 'The dog barks.': 'barks', 'Kai jumped high.': 'jumped', 'Birds sing.': 'sing', 'Mei reads.': 'reads', 'We clapped.': 'clapped' };
  function tapVerb() {
    var s = R.pick(VERB_S), t = words(s), v = VERB_IN[s];
    return { q: 'Tap the <b>doing word</b>.', type: 'tap', tiles: t, answer: t.indexOf(v), fig: W.sent(s), prompt: 'Which word tells what someone does?',
      hint: 'Can you act it out?', explain: '<b>' + v + '</b> is a doing word, a <b>verb</b>.', meta: { k: 'g1-tap-verb', s: s } };
  }
  function verbPick(lv) {
    return Q.one('Which word is a <b>doing word</b>?', R.pick(VERBS), R.some(NOUNS, lv > 1 ? 2 : 1).concat(R.some(ADJS, 1)), { hint: 'Can you act it out?', explain: 'A doing word is called a <b>verb</b>.', meta: { k: 'g1-verb-pick' } });
  }
  function form(v, t) { return t === 'past' ? v + 'ed' : t === 'future' ? 'will ' + v : v + 's'; }
  function tenseFit(lv) {
    var t = R.pick(['past', 'present', 'future']), v = R.pick(TENSE_V), who = R.pick(WHO), when = R.pick(WHEN[t]);
    return Q.one('Which fits?', form(v, t), ['past', 'present', 'future'].filter(function (x) { return x !== t; }).map(function (x) { return form(v, x); }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(when + ', ' + who + ' ' + W.gap() + '.'), prompt: 'Look at the first words. When is it?', hint: 'Past: -ed. Now: -s. Future: will.',
      explain: W.sent(when + ', ' + who + ' <b>' + form(v, t) + '</b>.'), meta: { k: 'g1-tense-fit', when: when, v: v } });
  }
  function whenTap() {
    var t = R.pick(['past', 'present', 'future']), v = R.pick(TENSE_V), s = R.pick(WHO) + ' ' + form(v, t) + '.';
    return Q.tiles('When does it happen?', TLABEL[t], ['past', 'present', 'future'].filter(function (x) { return x !== t; }).map(function (x) { return TLABEL[x]; }), { fig: W.sent(s),
      prompt: 'Look at the doing word. Does it end in -ed? Is there a <b>will</b>?', hint: '-ed: in the past. will: in the future.', explain: W.sent(s) + ' happens ' + TLABEL[t] + '.', meta: { k: 'g1-when-tap', s: s } });
  }

  /* ---------- question makers: describing, how, and joining ---------- */
  var ADJ_IN = { 'The red kite flew.': 'red', 'A tiny ant crawled.': 'tiny', 'The cold wind blew.': 'cold', 'We saw a tall tree.': 'tall', 'The happy dog barked.': 'happy', 'Hana has a blue hat.': 'blue' };
  var ADV_IN = { 'The turtle walked slowly.': 'slowly', 'Leila ran quickly.': 'quickly', 'The baby slept quietly.': 'quietly', 'The band played loudly.': 'loudly', 'Pat the puppy gently.': 'gently', 'Omar carried the eggs carefully.': 'carefully' };
  function tapAdj() {
    var s = R.pick(ADJ_S), t = words(s), a = ADJ_IN[s];
    return { q: 'Tap the <b>describing word</b>.', type: 'tap', tiles: t, answer: t.indexOf(a), fig: W.sent(s), prompt: 'Which word tells what something is like?',
      hint: 'It tells colour, size or how something feels.', explain: '<b>' + a + '</b> describes. It is an <b>adjective</b>.', meta: { k: 'g1-tap-adj', s: s } };
  }
  function tapAdv() {
    var s = R.pick(ADV_S), t = words(s), a = ADV_IN[s];
    return { q: 'Tap the word that tells <b>how</b>.', type: 'tap', tiles: t, answer: t.indexOf(a), fig: W.sent(s), prompt: 'How did they do it?',
      hint: 'Many of these words end in -ly.', explain: '<b>' + a + '</b> tells how. It is an <b>adverb</b>.', meta: { k: 'g1-tap-adv', s: s } };
  }
  function conjFit(lv) {
    var c = R.pick(CONJ);
    return Q.one('Which joining word fits?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0].replace('___', W.gap())), prompt: 'Read it with each word. Which makes sense?',
      hint: '<b>and</b> adds. <b>but</b> is a surprise. <b>or</b> is a choice. <b>so</b> and <b>because</b> give a reason.', explain: W.sent(c[0].replace('___', '<b>' + c[1] + '</b>')), meta: { k: 'g1-conj-fit', s: c[0] } });
  }
  function matchKind() {
    var ks = Object.keys(KIND);
    return { q: 'Match each word to its kind.', type: 'match', pairs: R.shuffle(ks).map(function (k) { return [R.pick(KIND[k]), k + ' word']; }), hint: 'Naming: a thing. Doing: an action. Describing: what it is like.',
      explain: 'Naming, doing and describing words.', meta: { k: 'g1-match-word-kind' } };
  }

  Atlas.register('grammar', {
    lessons: [{
      id: 'nouns', title: 'Naming words', sub: 'Nouns, one or more than one, and the word I.',
      concepts: [
        { slug: 'nouns', title: 'A naming word names a person, animal, place or thing', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.tile('teacher') + W.tile('moose') + W.tile('park') + W.tile('kite')),
            step(W.sent('The <b>cat</b> sleeps.'), 'You could draw it.')
          ],
          key: '<p>Naming words are called <b>nouns</b>.</p>',
          guided: [function () { return nounPick(1); }, tapNoun],
          check: [function () { return nounPick(2); }, tapNoun],
          coach: '<p>Walk around the house and name things: each one is a noun. Then find nouns in a picture book.</p>',
          mistake: '<p>Picking a doing word. Ask: "Can you put <i>the</i> in front of it?"</p>' },
        { slug: 'one-more', title: 'One or more than one', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.tile('dog'), 'One.'),
            step(W.tile(W.hl('dogs', 3, 4)) + W.tile(W.hl('boxes', 3, 5)), '-s or -es: more than one.')
          ],
          guided: [function () { return oneMore(1); }, function () { return oneMore(1); }],
          check: [function () { return oneMore(1); }, function () { return oneMore(2); }],
          coach: '<p>Line up toys: one car, two cars. Say and write each.</p>',
          mistake: '<p>Missing the -s when reading. Point to the end of the word.</p>' },
        { slug: 'capital-i', title: 'I is always a capital', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.sent('Sam and ' + W.hl('I', 0, 1) + ' went home.'), 'When you mean yourself.'),
            step(W.sent('Sam and i went home.'), 'Small i is not right.')
          ],
          guided: [function () { return capitalI(1); }, function () { return capitalI(1); }],
          check: [function () { return capitalI(1); }, function () { return capitalI(2); }],
          coach: '<p>Have the child write three sentences about themselves that start with I.</p>',
          mistake: '<p>Writing small i in the middle of a sentence. It is a capital everywhere.</p>' }
      ]
    }, {
      id: 'verbs', title: 'Doing words', sub: 'Verbs, and when it happens.',
      concepts: [
        { slug: 'verbs', title: 'A doing word tells what someone does', exp: ['B3.2'], skill: 'verbs',
          model: [
            step(W.tile('run') + W.tile('jump') + W.tile('sing'), 'You can act them out.'),
            step(W.sent('The dog <b>barks</b>.'))
          ],
          key: '<p>Doing words are called <b>verbs</b>.</p>',
          guided: [tapVerb, function () { return verbPick(1); }],
          check: [tapVerb, function () { return verbPick(2); }],
          coach: '<p>Play charades: act out a verb and the child names it.</p>',
          mistake: '<p>Choosing the name (dog) as the doing word. Ask: "What is the dog doing?"</p>' },
        { slug: 'when', title: 'Yesterday, today, tomorrow', exp: ['B3.2'], skill: 'verbs',
          model: [
            step(W.sent('Yesterday, Kai <b>jumped</b>.'), 'In the past: -ed.'),
            step(W.sent('Every day, Kai <b>jumps</b>.'), 'Now.'),
            step(W.sent('Tomorrow, Kai <b>will jump</b>.'), 'In the future: will.')
          ],
          guided: [function () { return tenseFit(1); }, whenTap],
          check: [function () { return tenseFit(2); }, whenTap],
          coach: '<p>At dinner, ask: "What did you do today? What will you do tomorrow?" Listen for -ed and will.</p>',
          mistake: '<p>Saying "Yesterday I walk." Ask: "When was it?" and add -ed.</p>' }
      ]
    }, {
      id: 'describe', title: 'Describing and joining words', sub: 'Adjectives, words that tell how, and joining words.',
      concepts: [
        { slug: 'adjectives', title: 'A describing word tells what something is like', exp: ['B3.2'], skill: 'describe',
          model: [
            step(W.sent('The kite flew.'), 'What kind of kite?'),
            step(W.sent('The <b>red</b> kite flew.'), 'Now we can picture it.')
          ],
          key: '<p>Describing words are called <b>adjectives</b>.</p>',
          guided: [tapAdj, tapAdj],
          check: [tapAdj, matchKind],
          coach: '<p>Play "I spy" with describing words: "I spy something soft and blue."</p>',
          mistake: '<p>Tapping the naming word. Ask: "Which word tells us about the kite?"</p>' },
        { slug: 'adverbs', title: 'Words that tell how', exp: ['B3.2'], skill: 'describe',
          model: [
            step(W.sent('The turtle walked <b>slowly</b>.'), 'How did it walk?'),
            step(W.tile(W.hl('slowly', 4, 6)) + W.tile(W.hl('quickly', 5, 7)) + W.tile(W.hl('loudly', 4, 6)), 'Many end in -ly.')
          ],
          key: '<p>Words that tell how are called <b>adverbs</b>.</p>',
          guided: [tapAdv, tapAdv],
          check: [tapAdv, tapAdv],
          coach: '<p>Give an action and an adverb to act out: "Walk slowly. Now walk quickly."</p>',
          mistake: '<p>Choosing the doing word. Ask: "How did they do it?"</p>' },
        { slug: 'joining', title: 'Joining words', exp: ['B3.2'], skill: 'describe',
          model: [
            step(W.sent('apples <b>and</b> pears'), '<b>and</b> adds.'),
            step(W.sent('I wanted to play, <b>but</b> it rained.'), '<b>but</b>: a surprise.'),
            step(W.sent('milk <b>or</b> juice?'), '<b>or</b>: a choice.'),
            step(W.sent('I was hungry, <b>so</b> I ate.'), '<b>so</b> and <b>because</b>: a reason.')
          ],
          guided: [function () { return conjFit(1); }, function () { return conjFit(1); }],
          check: [function () { return conjFit(2); }, function () { return conjFit(2); }],
          coach: '<p>Start a sentence and let the child finish it: "I like snow, but..." "I put on my coat because..."</p>',
          mistake: '<p>Using "and" for everything. Ask: "Is it a surprise? A choice? A reason?"</p>' }
      ]
    }],
    practice: [
      { id: 'nouns', name: 'Naming words and I', code: 'B3.2', gen: nounPick },
      { id: 'verbs', name: 'Doing words and when', code: 'B3.2', gen: tenseFit },
      { id: 'describe', name: 'Describing and joining words', code: 'B3.2', gen: function () { return tapAdj(); } }
    ]
  });

  Q.shapes('grammar', {
    nouns: [[1, 'tap-noun', tapNoun], [1, 'one-more', oneMore], [1, 'capital-i', capitalI]],
    verbs: [[1, 'tap-verb', tapVerb], [1, 'verb-pick', verbPick], [1, 'when', whenTap]],
    describe: [[1, 'tap-adv', tapAdv], [1, 'conj', conjFit], [2, 'match', matchKind]]
  });
})();
