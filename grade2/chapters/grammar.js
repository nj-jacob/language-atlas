/* Grade 2: grammar.
   Ontario 2023 Language, Grade 2:
   B3.2 "demonstrate an understanding of the functions of parts of speech in sentences, including abstract and collective nouns, personal pronouns,
        forms of the verb "to be", comparative and superlative adjectives, conjunctions, and recognition of the words that adverbs modify,
        and use this knowledge to support comprehension and communicate meaning clearly"
   Conjunctions are taught in the Sentences chapter (and, but, or, so). For the child: group nouns, idea nouns, words that tell how.
   All sentences are written for this site. Answer checks: tests/verify/grade2-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* collective nouns: [group word, what is in the group] */
  var GROUP = [['flock', 'geese'], ['pod', 'whales'], ['herd', 'caribou'], ['pack', 'wolves'], ['school', 'fish'], ['team', 'players'], ['bunch', 'grapes'], ['swarm', 'bees']];
  /* abstract nouns, and nouns you can touch */
  var IDEA = ['joy', 'kindness', 'fear', 'courage', 'hope', 'friendship', 'love', 'sadness'];
  var THING = ['rock', 'apple', 'chair', 'boot', 'kite', 'drum', 'spoon', 'tent'];
  /* [the noun, the rest of its sentence, the next sentence after the pronoun, the pronoun] */
  var PRO = [['My aunt', 'baked bread.', 'shared it with us.', 'She'], ['Grandpa', 'fixed the fence.', 'used a hammer.', 'He'], ['The kites', 'flew high.', 'danced in the wind.', 'They'],
    ['The kettle', 'whistled.', 'was ready for tea.', 'It'], ['My brother', 'lost a tooth.', 'put it under his pillow.', 'He'], ['Mom and I', 'went fishing.', 'caught three fish.', 'We'],
    ['The girls', 'built a snow fort.', 'played in it all day.', 'They'], ['My sister', 'found a shell.', 'kept it in a box.', 'She']];
  var PRONOUNS = ['He', 'She', 'It', 'They', 'We'];
  /* "to be": [sentence with a gap, the right form] */
  var BE = [['I ' + '_' + ' seven years old.', 'am'], ['The soup ' + '_' + ' hot.', 'is'], ['We ' + '_' + ' ready to go.', 'are'], ['My boots ' + '_' + ' by the door.', 'are'],
    ['Yesterday, it ' + '_' + ' sunny.', 'was'], ['Last week, the twins ' + '_' + ' sick.', 'were'], ['Hana ' + '_' + ' my best friend.', 'is'], ['Last night, we ' + '_' + ' tired.', 'were']];
  var BEFORMS = ['am', 'is', 'are', 'was', 'were'];
  /* [plain, -er, -est] and sentences: -er compares two (than), -est compares three or more (the ...) */
  var ADJ = [['tall', 'taller', 'tallest'], ['fast', 'faster', 'fastest'], ['small', 'smaller', 'smallest'], ['cold', 'colder', 'coldest'], ['long', 'longer', 'longest'], ['loud', 'louder', 'loudest']];
  var COMPARE = { tall: ['A moose is _ than a deer.', 'The CN Tower is the _ tower in Canada.'], fast: ['A cheetah is _ than a cat.', 'Omar is the _ runner in our class.'],
    small: ['A mouse is _ than a rabbit.', 'The baby kitten is the _ of all.'], cold: ['January is _ than May.', 'It was the _ day of the year.'],
    long: ['A train is _ than a car.', 'This is the _ river in Ontario.'], loud: ['A drum is _ than a bell.', 'Kai has the _ voice in the choir.'] };
  /* adverbs and the action word they tell about: [sentence, adverb, verb] */
  var ADV = [['The turtle walked slowly.', 'slowly', 'walked'], ['Mei sang softly.', 'softly', 'sang'], ['The dog barked loudly.', 'loudly', 'barked'], ['Owen ran quickly to the bus.', 'quickly', 'ran'],
    ['Tala carefully carried the eggs.', 'carefully', 'carried'], ['The baby slept quietly.', 'quietly', 'slept']];
  function gapIn(s) { return s.replace(/_/, W.gap()); }

  /* ---------- question makers: nouns ---------- */
  function group(lv) {
    var g = R.pick(GROUP);
    return Q.tiles('Which word fits?', g[0], R.some(GROUP.filter(function (x) { return x !== g; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.sent('a ' + W.gap() + ' of ' + g[1]), prompt: 'Which group word goes with ' + g[1] + '?', hint: 'Each kind of group has its own word.', explain: W.sent('a <b>' + g[0] + '</b> of ' + g[1]),
      meta: { k: 'g2-group', of: g[1] } });
  }
  function groupMatch() {
    var gs = R.some(GROUP, 3);
    return { q: 'Match each group word to what is in the group.', type: 'match', pairs: gs.map(function (g) { return [g[0], g[1]]; }), hint: 'a flock of..., a pod of...',
      explain: 'A group noun names a whole group.', meta: { k: 'g2-group-match' } };
  }
  function ideaPick() {
    var right = R.some(IDEA, 2), wrong = R.some(THING, 2);
    return Q.all('Pick every noun you <b>cannot touch</b>.', right, wrong, { prompt: 'Can you hold it in your hand?', hint: 'Some nouns name feelings and ideas.',
      explain: 'You can feel <b>' + right[0] + '</b>, but you cannot touch it.', meta: { k: 'g2-idea' } });
  }
  function ideaTf() {
    var isIdea = R.int(0, 1) === 1, w = R.pick(isIdea ? IDEA : THING);
    return { q: 'Can you touch this?', fig: W.tile(w), type: 'tap', tiles: ['Yes, I can touch it.', 'No, it is a feeling or idea.'], answer: isIdea ? 1 : 0,
      hint: 'Could you pick it up?', explain: isIdea ? '<b>' + w + '</b> is a feeling or idea.' : 'You can touch a <b>' + w + '</b>.', meta: { k: 'g2-idea-tap', word: w } };
  }
  function pronoun(lv) {
    var p = R.pick(PRO), first = p[0] + ' ' + p[1], wrong = PRONOUNS.filter(function (x) { return x !== p[3]; });
    return Q.tiles('Which word takes the place of the noun?', p[3], R.some(wrong, lv > 1 ? 3 : 2), { fig: W.sent(first) + W.sent(W.gap() + ' ' + p[2]),
      prompt: 'Who or what is the first sentence about? One or more than one?', hint: 'he, she, it, they or we.', explain: W.sent(first) + W.sent('<b>' + p[3] + '</b> ' + p[2]),
      meta: { k: 'g2-pronoun', noun: p[0] } });
  }
  function pronounMatch() {
    var ps = R.shuffle(PRO).filter(function (p, i, all) { return all.findIndex(function (x) { return x[3] === p[3]; }) === i; }).slice(0, 3);
    return { q: 'Match each one to the pronoun that can take its place.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[3]]; }),
      hint: 'One person or thing, or more than one?', explain: 'he, she, it: one. they, we: more than one.', meta: { k: 'g2-pronoun-match' } };
  }

  /* ---------- question makers: verbs, describing words, adverbs ---------- */
  function be(lv) {
    var b = R.pick(lv > 1 ? BE : BE.filter(function (x) { return !/^(Yesterday|Last)/.test(x[0]); }));
    return Q.tiles('Which word fits?', b[1], R.some(BEFORMS.filter(function (x) { return x !== b[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(gapIn(b[0])),
      prompt: 'Who is it about? Is it now, or in the past?', hint: 'I am. One: is. More than one: are. In the past: was or were.', explain: W.sent(b[0].replace('_', '<b>' + b[1] + '</b>')),
      meta: { k: 'g2-be', s: b[0] } });
  }
  function bePast() {
    var now = R.pick(['is', 'are']), past = now === 'is' ? 'was' : 'were';
    return Q.tiles('Which word is the <b>past</b> of <b>' + now + '</b>?', past, BEFORMS.filter(function (x) { return x !== past && x !== now; }).slice(0, 2), {
      hint: 'is becomes was. are becomes were.', explain: W.tile(now) + ' &rarr; ' + W.tile(past), meta: { k: 'g2-be-past', now: now } });
  }
  function compare(lv) {
    var a = R.pick(ADJ), two = R.int(0, 1) === 0, s = COMPARE[a[0]][two ? 0 : 1], right = two ? a[1] : a[2];
    return Q.tiles('Which word fits?', right, a.filter(function (x) { return x !== right; }).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(gapIn(s)),
      prompt: 'Is it comparing two things, or three or more?', hint: '-er compares two (than). -est compares three or more (the).', explain: W.sent(s.replace('_', '<b>' + right + '</b>')),
      meta: { k: 'g2-compare', s: s } });
  }
  function compareOrder() {
    var a = R.pick(ADJ);
    return { q: 'Put these in order, from <b>' + a[0] + '</b> to <b>' + a[2] + '</b>.', type: 'order', items: a.slice(), first: 'Plain', last: 'Most', hint: 'The word, then -er, then -est.',
      explain: a.join(', '), meta: { k: 'g2-compare-order' } };
  }
  function adverb(lv) {
    var a = R.pick(ADV), words = a[0].replace(/\.$/, '').split(' ');
    return { q: 'Which word does <b>' + a[1] + '</b> tell about?', fig: W.sent(a[0]), type: 'tap', tiles: words.filter(function (w) { return w !== a[1]; }), answer: words.filter(function (w) { return w !== a[1]; }).indexOf(a[2]),
      prompt: 'Ask: ' + a[1] + ', how did they do what?', hint: 'A word that tells how tells about an action word.', explain: W.sent(a[0].replace(a[2], '<b>' + a[2] + '</b>').replace(a[1], '<mark class="hl">' + a[1] + '</mark>')),
      meta: { k: 'g2-adverb', s: a[0] } };
  }
  function adverbFind() {
    var a = R.pick(ADV), words = a[0].replace(/\.$/, '').split(' ');
    return { q: 'Which word tells <b>how</b>?', fig: W.sent(a[0]), type: 'tap', tiles: words, answer: words.indexOf(a[1]), hint: 'Many words that tell how end in -ly.',
      explain: '<b>' + a[1] + '</b> tells how they ' + a[2] + '.', meta: { k: 'g2-adverb-find', s: a[0] } };
  }

  Atlas.register('grammar', {
    lessons: [{
      id: 'nouns', title: 'Nouns and pronouns', sub: 'Group words, idea words, and words that take a noun\'s place.',
      concepts: [
        { slug: 'group', title: 'A group noun names a whole group', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.sent('a <b>flock</b> of geese'), 'Many geese. One flock.'),
            step(W.sent('a <b>pod</b> of whales')),
            step(W.sent('a <b>team</b> of players'))
          ],
          guided: [function () { return group(1); }, function () { return group(1); }],
          check: [function () { return group(2); }, groupMatch],
          coach: '<p>Look out for groups on walks or in books: a flock of birds, a bunch of bananas. Name the group together.</p>',
          mistake: '<p>Using "group" or "lot" for everything. Each kind of group has its own word.</p>' },
        { slug: 'idea', title: 'Some nouns name feelings and ideas', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.tile('rock'), 'You can touch a rock.'),
            step(W.tile('joy'), 'You can feel joy, but not touch it.'),
            step(W.tile('kindness') + W.tile('courage') + W.tile('hope'))
          ],
          guided: [ideaTf, ideaTf],
          check: [ideaPick, ideaTf],
          coach: '<p>Ask: "Can you put it in a box?" A rock, yes. Kindness, no, but you can show it.</p>',
          mistake: '<p>Thinking only things you can touch are nouns. Feelings and ideas are nouns too.</p>' },
        { slug: 'pronouns', title: 'A pronoun takes the place of a noun', exp: ['B3.2'], skill: 'nouns',
          model: [
            step(W.sent('<b>My aunt</b> baked bread.'), 'A noun.'),
            step(W.sent('<b>She</b> shared it with us.'), '<b>She</b> means my aunt.'),
            step(W.sent('<b>The kites</b> flew high. <b>They</b> danced.'), 'More than one: <b>they</b>.')
          ],
          guided: [function () { return pronoun(1); }, function () { return pronoun(1); }],
          check: [function () { return pronoun(2); }, pronounMatch],
          coach: '<p>Retell a story using names every time ("Grandpa got up. Grandpa ate. Grandpa left."). Laugh about it, then fix it together with pronouns.</p>',
          mistake: '<p>Using "it" for a person, or "they" for one thing. Ask: "Is it a person? One, or more than one?"</p>' }
      ]
    }, {
      id: 'verbs-describing', title: 'Verbs and describing words', sub: 'am, is, are, was, were; -er and -est; and words that tell how.',
      concepts: [
        { slug: 'to-be', title: 'am, is, are, was, were', exp: ['B3.2'], skill: 'verbs-describing',
          model: [
            step(W.sent('I <b>am</b> here.') + W.sent('She <b>is</b> here.') + W.sent('They <b>are</b> here.'), 'Now.'),
            step(W.sent('It <b>was</b> sunny.') + W.sent('We <b>were</b> cold.'), 'In the past.')
          ],
          guided: [function () { return be(1); }, bePast],
          check: [function () { return be(2); }, function () { return be(2); }],
          coach: '<p>Make three cards: "I am", "he is", "we are". Say a sentence; the child holds up the card that fits.</p>',
          mistake: '<p>Saying "we was". With we and they, use were.</p>' },
        { slug: 'er-est', title: '-er compares two, -est compares more', exp: ['B3.2'], skill: 'verbs-describing',
          model: [
            step(W.tile('tall') + W.tile('taller') + W.tile('tallest')),
            step(W.sent('A moose is <b>taller</b> than a deer.'), 'Two things: <b>-er</b> and <b>than</b>.'),
            step(W.sent('The CN Tower is the <b>tallest</b> tower in Canada.'), 'Out of all of them: <b>-est</b>.')
          ],
          guided: [function () { return compare(1); }, compareOrder],
          check: [function () { return compare(2); }, compareOrder],
          coach: '<p>Line up three stuffed animals or books. Compare two (bigger), then all three (biggest).</p>',
          mistake: '<p>Using -est for only two things ("the tallest of the two"). Count the things being compared.</p>' },
        { slug: 'adverbs', title: 'A word that tells how tells about an action', exp: ['B3.2'], skill: 'verbs-describing',
          model: [
            step(W.sent('The turtle walked <mark class="hl">slowly</mark>.'), '<b>slowly</b> tells how.'),
            step(W.sent('The turtle <b>walked</b> <mark class="hl">slowly</mark>.'), 'How did it walk? Slowly.')
          ],
          guided: [adverbFind, function () { return adverb(1); }],
          check: [adverbFind, function () { return adverb(2); }],
          coach: '<p>Play "Walk the way I say": slowly, quickly, quietly. Then ask what word told the child how to walk.</p>',
          mistake: '<p>Linking the -ly word to the person ("slowly tells about the turtle"). Ask: "Slowly what? Walked slowly."</p>' }
      ]
    }],
    practice: [
      { id: 'nouns', name: 'Nouns and pronouns', code: 'B3.2', gen: group },
      { id: 'verbs-describing', name: 'Verbs and describing words', code: 'B3.2', gen: be }
    ]
  });

  Q.shapes('grammar', {
    nouns: [[1, 'idea', ideaTf], [1, 'pronoun', pronoun], [2, 'idea-pick', ideaPick], [2, 'group-match', groupMatch], [2, 'pronoun-match', pronounMatch]],
    'verbs-describing': [[1, 'past', bePast], [1, 'compare', compare], [1, 'adverb-find', adverbFind], [2, 'adverb', adverb], [2, 'order', compareOrder]]
  });
})();
