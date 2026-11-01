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
  var GROUP = [['flock', 'geese'], ['pod', 'whales'], ['herd', 'caribou'], ['pack', 'wolves'], ['school', 'fish'], ['team', 'players'], ['bunch', 'grapes'], ['swarm', 'bees'],
    ['litter', 'puppies'], ['pride', 'lions'], ['deck', 'cards'], ['choir', 'singers']];
  /* abstract nouns, nouns you can touch, and sentences with one idea noun in each */
  var IDEA = ['joy', 'kindness', 'fear', 'courage', 'hope', 'friendship', 'love', 'sadness', 'anger', 'pride', 'patience', 'honesty'];
  var THING = ['rock', 'apple', 'chair', 'boot', 'kite', 'drum', 'spoon', 'tent', 'mitten', 'canoe', 'pencil', 'shell'];
  var IDEASENT = ['Tala felt joy at the lake.', 'The firefighter showed courage.', 'Kindness makes a friend smile.', 'Sam felt fear in the dark.', 'Their friendship is strong.',
    'Mia felt sadness when her fish died.', 'Grandpa has patience with me.', 'We spoke with honesty.'];
  /* [the noun, the rest of its sentence, the next sentence after the pronoun, the pronoun] */
  var PRO = [['My aunt', 'baked bread.', 'shared it with us.', 'She'], ['Grandpa', 'fixed the fence.', 'used a hammer.', 'He'], ['The kites', 'flew high.', 'danced in the wind.', 'They'],
    ['The kettle', 'whistled.', 'was ready for tea.', 'It'], ['My brother', 'lost a tooth.', 'put it under his pillow.', 'He'], ['Mom and I', 'went fishing.', 'caught three fish.', 'We'],
    ['The girls', 'built a snow fort.', 'played in it all day.', 'They'], ['My sister', 'found a shell.', 'kept it in a box.', 'She'], ['The puppy', 'chased its tail.', 'fell over.', 'It'],
    ['Grandma', 'planted tulips.', 'watered them every day.', 'She'], ['Dad and I', 'made pancakes.', 'ate them with syrup.', 'We'], ['My uncle', 'drives a snowplough.', 'clears the roads at night.', 'He'],
    ['The boys', 'raked the leaves.', 'jumped in the pile.', 'They'], ['The canoe', 'tipped over.', 'floated to shore.', 'It']];
  var PRONOUNS = ['He', 'She', 'It', 'They', 'We'];
  /* "to be": [sentence with a gap, the right form] */
  var BE = [['I _ seven years old.', 'am'], ['The soup _ hot.', 'is'], ['We _ ready to go.', 'are'], ['My boots _ by the door.', 'are'], ['Hana _ my best friend.', 'is'], ['The puppies _ asleep.', 'are'],
    ['Dad _ at work.', 'is'], ['I _ in Grade 2.', 'am'], ['They _ on the swings.', 'are'],
    ['Yesterday, it _ sunny.', 'was'], ['Last week, the twins _ sick.', 'were'], ['Last night, we _ tired.', 'were'], ['Yesterday, the roads _ icy.', 'were'], ['Last night, the moon _ bright.', 'was'], ['Yesterday, Kai _ at the dentist.', 'was']];
  var BEFORMS = ['am', 'is', 'are', 'was', 'were'];
  var NOW = BE.filter(function (b) { return /^(am|is|are)$/.test(b[1]); });
  var PAST = { am: 'was', is: 'was', are: 'were' };
  /* [plain, -er, -est] and sentences: -er compares two (than), -est compares three or more (the ...) */
  var ADJ = [['tall', 'taller', 'tallest'], ['fast', 'faster', 'fastest'], ['small', 'smaller', 'smallest'], ['cold', 'colder', 'coldest'], ['long', 'longer', 'longest'], ['loud', 'louder', 'loudest'],
    ['warm', 'warmer', 'warmest'], ['short', 'shorter', 'shortest'], ['old', 'older', 'oldest']];
  var COMPARE = { tall: ['A moose is _ than a deer.', 'The CN Tower is the _ tower in Canada.'], fast: ['A cheetah is _ than a cat.', 'Omar is the _ runner in our class.'],
    small: ['A mouse is _ than a rabbit.', 'The baby kitten is the _ of all.'], cold: ['January is _ than May.', 'It was the _ day of the year.'],
    long: ['A train is _ than a car.', 'This is the _ river in Ontario.'], loud: ['A drum is _ than a bell.', 'Kai has the _ voice in the choir.'],
    warm: ['July is _ than March.', 'This was the _ day of the summer.'], short: ['A pencil is _ than a ruler.', 'Mia is the _ child in her family.'],
    old: ['Grandpa is _ than Dad.', 'This is the _ tree in the park.'] };
  var COMPS = [];
  ADJ.forEach(function (a) { COMPS.push([COMPARE[a[0]][0], a, a[1]], [COMPARE[a[0]][1], a, a[2]]); });
  /* words that tell how: [sentence, the how word, the action word it tells about, the word it is made from] */
  var ADV = [['The turtle walked slowly.', 'slowly', 'walked', 'slow'], ['Mei sang softly.', 'softly', 'sang', 'soft'], ['The dog barked loudly.', 'loudly', 'barked', 'loud'],
    ['Owen ran quickly to the bus.', 'quickly', 'ran', 'quick'], ['Tala carefully carried the eggs.', 'carefully', 'carried', 'careful'], ['The baby slept quietly.', 'quietly', 'slept', 'quiet'],
    ['The snow fell gently.', 'gently', 'fell', 'gentle'], ['Grandma smiled warmly at us.', 'warmly', 'smiled', 'warm'], ['Ben quietly opened the gift.', 'quietly', 'opened', 'quiet'],
    ['The wind blew wildly.', 'wildly', 'blew', 'wild'], ['Ava neatly folded her shirt.', 'neatly', 'folded', 'neat'], ['The bus slowly climbed the hill.', 'slowly', 'climbed', 'slow']];
  function gapIn(x) { return x.replace(/_/, W.gap()); }
  function fill(x, w) { return x.replace('_', w); }
  function words(x) { return x.replace(/\.$/, '').split(' '); }
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }

  /* ---------- group nouns ---------- */
  function group(lv) {
    var g = R.pick(GROUP);
    return Q.tiles('Which word fits?', g[0], R.some(others(GROUP, g), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      fig: W.sent('a ' + W.gap() + ' of ' + g[1]), prompt: 'Which group word goes with ' + g[1] + '?', hint: 'Each kind of group has its own word.', explain: W.sent('a <b>' + g[0] + '</b> of ' + g[1]),
      meta: { k: 'g2-group', of: g[1] } });
  }
  function groupMatch(lv) {
    var gs = R.some(GROUP, lv > 1 ? 4 : 3);
    return { q: 'Match each group word to what is in the group.', type: 'match', pairs: gs.map(function (g) { return [g[0], g[1]]; }), hint: 'a flock of..., a pod of...',
      explain: 'A group noun names a whole group.', meta: { k: 'g2-group-match' } };
  }
  function groupWhat(lv) {
    var g = R.pick(GROUP);
    return Q.tiles('A <b>' + g[0] + '</b> is a group of...', g[1], R.some(others(GROUP, g), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Say it: a ' + g[0] + ' of...', explain: W.sent('a <b>' + g[0] + '</b> of ' + g[1]), meta: { k: 'g2-group-what', g: g[0] } });
  }
  function groupTf() {
    var g = R.pick(GROUP), right = R.int(0, 1) === 1, w = right ? g[0] : R.pick(others(GROUP, g))[0];
    return { q: Q.name() + ' wrote this. Is the group word right?', fig: W.sent('a <b>' + w + '</b> of ' + g[1]), type: 'tf', answer: right,
      why: { options: ['That is the word for this group.', 'That word is for a different group.'], answer: right ? 0 : 1 },
      hint: 'Each kind of group has its own word.', explain: W.sent('a <b>' + g[0] + '</b> of ' + g[1]), meta: { k: 'g2-group-tf', w: w, of: g[1] } };
  }

  /* ---------- nouns for feelings and ideas ---------- */
  function ideaTap() {
    var isIdea = R.int(0, 1) === 1, w = R.pick(isIdea ? IDEA : THING);
    return { q: 'Can you touch this?', fig: W.tile(w), type: 'tap', tiles: ['Yes, I can touch it.', 'No, it is a feeling or idea.'], answer: isIdea ? 1 : 0,
      hint: 'Could you pick it up?', explain: isIdea ? '<b>' + w + '</b> is a feeling or idea.' : 'You can touch a <b>' + w + '</b>.', meta: { k: 'g2-idea-tap', word: w } };
  }
  function ideaPick(lv) {
    var right = R.some(IDEA, 2), wrong = R.some(THING, lv > 1 ? 3 : 2);
    return Q.all('Pick every noun you <b>cannot touch</b>.', right, wrong, { prompt: 'Can you hold it in your hand?', hint: 'Some nouns name feelings and ideas.',
      explain: 'You can feel <b>' + right[0] + '</b>, but you cannot touch it.', meta: { k: 'g2-idea' } });
  }
  function ideaTouch(lv) {
    var right = R.pick(THING);
    return Q.one('Which one <b>can</b> you touch?', right, R.some(IDEA, lv > 1 ? 3 : 2), { hint: 'Could you put it in a box?', explain: 'You can hold a <b>' + right + '</b>.', meta: { k: 'g2-idea-touch' } });
  }
  function ideaFind() {
    var x = R.pick(IDEASENT), ws = words(x), w = ws.filter(function (y) { return IDEA.indexOf(y.toLowerCase()) >= 0; })[0];
    return Q.tiles('Which word names a feeling or idea?', w, R.some(ws.filter(function (y) { return y !== w && y.length > 3; }), 2), { fig: W.sent(x),
      hint: 'You can feel it or think it, but not touch it.', explain: W.sent(x.replace(w, '<b>' + w + '</b>')), meta: { k: 'g2-idea-find', s: x } });
  }

  /* ---------- pronouns ---------- */
  function two(p, pr) { return W.sent(p[0] + ' ' + p[1]) + W.sent(pr + ' ' + p[2]); }
  function pronoun(lv) {
    var p = R.pick(PRO);
    return Q.tiles('Which word takes the place of the noun?', p[3], R.some(others(PRONOUNS, p[3]), lv > 1 ? 3 : 2), { fig: two(p, W.gap()),
      prompt: 'Who or what is the first sentence about? One or more than one?', hint: 'he, she, it, they or we.', explain: two(p, '<b>' + p[3] + '</b>'),
      meta: { k: 'g2-pronoun', noun: p[0] } });
  }
  function pronounMatch() {
    var ps = R.shuffle(PRO).filter(function (p, i, all) { return all.findIndex(function (x) { return x[3] === p[3]; }) === i; }).slice(0, 3);
    return { q: 'Match each one to the pronoun that can take its place.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[3]]; }),
      hint: 'One person or thing, or more than one?', explain: 'he, she, it: one. they, we: more than one.', meta: { k: 'g2-pronoun-match' } };
  }
  function pronounWho(lv) {
    var p = R.pick(PRO), wrong = R.some(PRO.filter(function (x) { return x[3] !== p[3]; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; });
    return Q.one('Who or what is <b>' + p[3] + '</b>?', p[0], wrong, { fig: two(p, '<b>' + p[3] + '</b>'), hint: 'Look back at the first sentence.',
      explain: '<b>' + p[3] + '</b> means <b>' + p[0] + '</b>.', meta: { k: 'g2-pronoun-who', noun: p[0], pr: p[3] } });
  }
  function pronounTf() {
    var p = R.pick(PRO), right = R.int(0, 1) === 1, pr = right ? p[3] : R.pick(others(PRONOUNS, p[3]));
    return { q: Q.name() + ' wrote this. Is the pronoun right?', fig: two(p, '<b>' + pr + '</b>'), type: 'tf', answer: right,
      why: { options: ['It fits who or what the first sentence is about.', 'It does not fit who or what the first sentence is about.'], answer: right ? 0 : 1 },
      hint: 'One person or thing, or more than one?', explain: two(p, '<b>' + p[3] + '</b>'), meta: { k: 'g2-pronoun-tf', noun: p[0], pr: pr } };
  }

  /* ---------- am, is, are, was, were ---------- */
  function be(lv) {
    var b = R.pick(lv > 1 ? BE : NOW);
    return Q.tiles('Which word fits?', b[1], R.some(others(BEFORMS, b[1]), lv > 1 ? 3 : 2), { fig: W.sent(gapIn(b[0])),
      prompt: 'Who is it about? Is it now, or in the past?', hint: 'I am. One: is. More than one: are. In the past: was or were.', explain: W.sent(fill(b[0], '<b>' + b[1] + '</b>')),
      meta: { k: 'g2-be', s: b[0] } });
  }
  function bePast(lv) {
    var b = R.pick(NOW), past = PAST[b[1]], wrong = [fill(b[0], b[1])].concat(lv > 1 ? [fill(b[0], past === 'was' ? 'were' : 'was')] : []);
    return Q.one('Which one tells about the <b>past</b>?', fill(b[0], past), wrong, { fig: W.sent(fill(b[0], b[1])), hint: 'is and am become was. are becomes were.',
      explain: W.sent(fill(b[0], '<b>' + past + '</b>')), meta: { k: 'g2-be-past', s: b[0] } });
  }
  function beTf() {
    var b = R.pick(BE), right = R.int(0, 1) === 1, w = right ? b[1] : R.pick(others(BEFORMS, b[1]));
    return { q: Q.name() + ' wrote this. Is it right?', fig: W.sent(fill(b[0], '<b>' + w + '</b>')), type: 'tf', answer: right,
      why: { options: ['It fits who it is about and when.', 'Another form fits who it is about and when.'], answer: right ? 0 : 1 },
      hint: 'Who is it about? Now, or in the past?', explain: W.sent(fill(b[0], '<b>' + b[1] + '</b>')), meta: { k: 'g2-be-tf', s: b[0], w: w } };
  }
  function beMatch() {
    var bs = ['am', 'is', 'are'].map(function (f) { return R.pick(NOW.filter(function (b) { return b[1] === f; })); });
    return { q: 'Match each one to the word that comes next.', type: 'match', pairs: bs.map(function (b) { return [b[0].split(' _')[0], b[1]]; }),
      hint: 'I am. One: is. More than one: are.', explain: 'I <b>am</b>. One: <b>is</b>. More than one: <b>are</b>.', meta: { k: 'g2-be-match' } };
  }

  /* ---------- -er and -est ---------- */
  function compare(lv) {
    var c = R.pick(COMPS);
    return Q.tiles('Which word fits?', c[2], others(c[1], c[2]).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(gapIn(c[0])),
      prompt: 'Is it comparing two things, or three or more?', hint: '-er compares two (than). -est compares three or more (the).', explain: W.sent(fill(c[0], '<b>' + c[2] + '</b>')),
      meta: { k: 'g2-compare', s: c[0] } });
  }
  function compareOrder() {
    var a = R.pick(ADJ);
    return { q: 'Put these in order, from <b>' + a[0] + '</b> to <b>' + a[2] + '</b>.', type: 'order', items: a.slice(), first: 'Plain', last: 'Most', hint: 'The word, then -er, then -est.',
      explain: a.join(', '), meta: { k: 'g2-compare-order' } };
  }
  function compareCount() {
    var c = R.pick(COMPS), tiles = ['Two things', 'Three or more'];
    return { q: 'How many things does this compare?', fig: W.sent(fill(c[0], '<b>' + c[2] + '</b>')), type: 'tap', tiles: tiles, answer: c[2] === c[1][1] ? 0 : 1,
      hint: '-er and than: two. the and -est: three or more.', explain: '<b>' + c[2] + '</b>: ' + (c[2] === c[1][1] ? 'two things.' : 'out of all of them.'), meta: { k: 'g2-compare-count', s: c[0], w: c[2] } };
  }
  function compareTf() {
    var c = R.pick(COMPS), right = R.int(0, 1) === 1, w = right ? c[2] : (c[2] === c[1][1] ? c[1][2] : c[1][1]);
    return { q: Q.name() + ' wrote this. Is it right?', fig: W.sent(fill(c[0], '<b>' + w + '</b>')), type: 'tf', answer: right,
      why: { options: ['It matches how many things are compared.', 'It does not match how many things are compared.'], answer: right ? 0 : 1 },
      hint: 'Two things, or three or more?', explain: W.sent(fill(c[0], '<b>' + c[2] + '</b>')), meta: { k: 'g2-compare-tf', s: c[0], w: w } };
  }

  /* ---------- words that tell how ---------- */
  function adverb(lv) {
    var a = R.pick(ADV), ws = others(words(a[0]), a[1]);
    if (lv < 2) ws = ws.filter(function (w) { return w.length > 2; });
    return { q: 'Which word does <b>' + a[1] + '</b> tell about?', fig: W.sent(a[0].replace(a[1], '<mark class="hl">' + a[1] + '</mark>')), type: 'tap', tiles: ws, answer: ws.indexOf(a[2]),
      prompt: 'Ask: ' + a[1] + ', how did they do what?', hint: 'It tells about an action word.', explain: W.sent(a[0].replace(a[2], '<b>' + a[2] + '</b>').replace(a[1], '<mark class="hl">' + a[1] + '</mark>')),
      meta: { k: 'g2-adverb', s: a[0] } };
  }
  function adverbFind() {
    var a = R.pick(ADV), ws = words(a[0]);
    return { q: 'Which word tells <b>how</b>?', fig: W.sent(a[0]), type: 'tap', tiles: ws, answer: ws.indexOf(a[1]), hint: 'Many words that tell how end in -ly.',
      explain: '<b>' + a[1] + '</b> tells how.', meta: { k: 'g2-adverb-find', s: a[0] } };
  }
  function adverbMake(lv) {
    var a = R.pick(ADV), wrong = [a[3]].concat(lv > 1 ? [a[3] + 'ness'] : []);
    return Q.tiles('Which word tells <b>how</b>?', a[1], wrong, { fig: W.sent(a[0].replace(a[1], W.gap())), hint: 'Add -ly to make a word that tells how.',
      explain: W.sent(a[0].replace(a[1], '<b>' + a[1] + '</b>')), meta: { k: 'g2-adverb-make', s: a[0] } });
  }
  function adverbTf() {
    var a = R.pick(ADV), right = R.int(0, 1) === 1, said = right ? a[2] : R.pick(words(a[0]).filter(function (w) { return w !== a[1] && w !== a[2] && !/^(the|to|at|us|her)$/i.test(w); }));
    return { q: Q.name() + ' says <b>' + a[1] + '</b> tells about <b>' + said + '</b>.', fig: W.sent(a[0]), type: 'tf', answer: right,
      why: { options: [cap(said) + ' is the action.', cap(said) + ' is not the action.'], answer: right ? 0 : 1 },
      hint: 'Ask: ' + a[1] + ', how did they do what?', explain: '<b>' + a[1] + '</b> tells how they <b>' + a[2] + '</b>.', meta: { k: 'g2-adverb-tf', s: a[0], said: said } };
  }
  function cap(x) { return x.charAt(0).toUpperCase() + x.slice(1); }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'nouns', title: 'Nouns and pronouns', sub: 'Group words, idea words, and words that take a noun\'s place.',
      concepts: [
        { slug: 'group', title: 'A group noun names a whole group', exp: ['B3.2'], skill: 'group',
          model: [
            step(W.sent('a <b>flock</b> of geese'), 'Many geese. One flock.'),
            step(W.sent('a <b>pod</b> of whales'), 'Many whales. One pod.'),
            step(W.sent('a <b>herd</b> of caribou')),
            step(W.sent('A <b>team</b> of players won the game.'), 'In a sentence.')
          ],
          guided: [function () { return group(1); }, function () { return groupWhat(1); }, groupTf],
          check: [function () { return group(2); }, function () { return groupMatch(1); }, groupTf, function () { return groupWhat(2); }, function () { return groupMatch(2); }],
          coach: '<p>Look out for groups on walks or in books: a flock of birds, a bunch of bananas. Name the group together.</p>',
          mistake: '<p>Using "group" or "lot" for everything. Each kind of group has its own word.</p>' },
        { slug: 'idea', title: 'Some nouns name feelings and ideas', exp: ['B3.2'], skill: 'idea-nouns',
          model: [
            step(W.tile('rock'), 'You can touch a rock.'),
            step(W.tile('joy'), 'You can feel joy, but not touch it.'),
            step(W.sent('Tala felt <b>joy</b> at the lake.'), 'It names a feeling.'),
            step(W.tile('kindness') + W.tile('courage') + W.tile('hope'), 'Can you hold them? No.')
          ],
          guided: [ideaTap, function () { return ideaTouch(1); }, ideaFind],
          check: [function () { return ideaPick(1); }, ideaTap, ideaFind, function () { return ideaTouch(2); }, function () { return ideaPick(2); }],
          coach: '<p>Ask: "Can you put it in a box?" A rock, yes. Kindness, no, but you can show it.</p>',
          mistake: '<p>Thinking only things you can touch are nouns. Feelings and ideas are nouns too.</p>' },
        { slug: 'pronouns', title: 'A pronoun takes the place of a noun', exp: ['B3.2'], skill: 'pronouns',
          model: [
            step(W.sent('<b>My aunt</b> baked bread.'), 'A noun.'),
            step(W.sent('<b>She</b> shared it with us.'), '<b>She</b> means my aunt.'),
            step(W.sent('<b>The kites</b> flew high. <b>They</b> danced.'), 'More than one: <b>they</b>.'),
            step(W.sent('<b>Mom and I</b> went fishing. <b>We</b> caught three fish.'), 'Me and others: <b>we</b>.')
          ],
          guided: [function () { return pronoun(1); }, function () { return pronounWho(1); }, pronounTf],
          check: [function () { return pronoun(2); }, pronounMatch, pronounTf, function () { return pronounWho(2); }, function () { return pronoun(2); }],
          coach: '<p>Retell a story using names every time ("Grandpa got up. Grandpa ate. Grandpa left."). Laugh about it, then fix it together with pronouns.</p>',
          mistake: '<p>Using "it" for a person, or "they" for one thing. Ask: "Is it a person? One, or more than one?"</p>' }
      ]
    }, {
      id: 'verbs-describing', title: 'Verbs and describing words', sub: 'am, is, are, was, were; -er and -est; and words that tell how.',
      concepts: [
        { slug: 'to-be', title: 'am, is, are, was, were', exp: ['B3.2'], skill: 'to-be',
          model: [
            step(W.sent('I <b>am</b> here.') + W.sent('She <b>is</b> here.') + W.sent('They <b>are</b> here.'), 'Now.'),
            step(W.sent('It <b>was</b> sunny.') + W.sent('We <b>were</b> cold.'), 'In the past.'),
            step(W.sent('The soup <b>is</b> hot.'), 'One thing, now: <b>is</b>.'),
            step(W.sent('Last week, the twins <b>were</b> sick.'), 'More than one, in the past: <b>were</b>.')
          ],
          guided: [function () { return be(1); }, beMatch, function () { return bePast(1); }],
          check: [function () { return be(2); }, beTf, function () { return bePast(2); }, beMatch, function () { return be(2); }],
          coach: '<p>Make three cards: "I am", "he is", "we are". Say a sentence; the child holds up the card that fits.</p>',
          mistake: '<p>Saying "we was". With we and they, use were.</p>' },
        { slug: 'er-est', title: '-er compares two, -est compares more', exp: ['B3.2'], skill: 'er-est',
          model: [
            step(W.tile('tall') + W.tile('taller') + W.tile('tallest')),
            step(W.sent('A moose is <b>taller</b> than a deer.'), 'Two things: <b>-er</b> and <b>than</b>.'),
            step(W.sent('The CN Tower is the <b>tallest</b> tower in Canada.'), 'Out of all of them.'),
            step(W.sent('January is <b>colder</b> than May.'), 'Two months.'),
            step(W.sent('It was the <b>coldest</b> day of the year.'), 'One day out of many.')
          ],
          guided: [function () { return compare(1); }, compareCount, compareOrder],
          check: [function () { return compare(2); }, compareTf, compareCount, compareOrder, function () { return compare(2); }],
          coach: '<p>Line up three stuffed animals or books. Compare two (bigger), then all three (biggest).</p>',
          mistake: '<p>Using -est for only two things ("the tallest of the two"). Count the things being compared.</p>' },
        { slug: 'adverbs', title: 'A word that tells how tells about an action', exp: ['B3.2'], skill: 'adverbs',
          model: [
            step(W.sent('The turtle walked <mark class="hl">slowly</mark>.'), '<b>slowly</b> tells how.'),
            step(W.sent('The turtle <b>walked</b> <mark class="hl">slowly</mark>.'), 'How did it walk? Slowly.'),
            step(W.sent('Mei sang <mark class="hl">softly</mark>.'), 'How did she sing?'),
            step(W.sent('Mei <b>sang</b> <mark class="hl">softly</mark>.'), '<b>softly</b> goes with <b>sang</b>.')
          ],
          guided: [adverbFind, function () { return adverb(1); }, function () { return adverbMake(1); }],
          check: [function () { return adverb(2); }, adverbFind, adverbTf, function () { return adverbMake(2); }, function () { return adverb(2); }],
          coach: '<p>Play "Walk the way I say": slowly, quickly, quietly. Then ask what word told the child how to walk.</p>',
          mistake: '<p>Linking the -ly word to the person ("slowly tells about the turtle"). Ask: "Slowly what? Walked slowly."</p>' }
      ]
    }],
    practice: [
      { id: 'group', name: 'Group nouns', code: 'B3.2', gen: group },
      { id: 'idea-nouns', name: 'Feeling and idea nouns', code: 'B3.2', gen: ideaPick },
      { id: 'pronouns', name: 'Pronouns', code: 'B3.2', gen: pronoun },
      { id: 'to-be', name: 'am, is, are, was, were', code: 'B3.2', gen: be },
      { id: 'er-est', name: '-er and -est', code: 'B3.2', gen: compare },
      { id: 'adverbs', name: 'Words that tell how', code: 'B3.2', gen: adverb }
    ]
  });

  Q.shapes('grammar', {
    group: [[1, 'what', groupWhat], [1, 'tf', groupTf], [1, 'match', groupMatch]],
    'idea-nouns': [[1, 'touch', ideaTap], [1, 'can-touch', ideaTouch], [2, 'find', ideaFind]],
    pronouns: [[1, 'who', pronounWho], [1, 'tf', pronounTf], [2, 'match', pronounMatch]],
    'to-be': [[1, 'past', bePast], [1, 'match', beMatch], [2, 'tf', beTf]],
    'er-est': [[1, 'count', compareCount], [1, 'order', compareOrder], [2, 'tf', compareTf]],
    adverbs: [[1, 'find', adverbFind], [1, 'make', adverbMake], [2, 'tf', adverbTf]]
  });
})();
