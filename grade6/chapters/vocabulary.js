/* Grade 6: word meanings.
   Ontario 2023 Language, Grade 6:
   B2.2 "demonstrate an understanding of a variety of words, acquire and use explicitly taught vocabulary in various contexts, including
   other subject areas, and use generalized morphological knowledge to analyze and understand new words in context"
   Clues in the sentence (definition, example, contrast, synonym), word parts in context, shades of meaning and connotation, and
   subject words from science, social studies, math and the arts. All sentences are written for this site.
   Answer checks: tests/verify/grade6-vocabulary.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [sentence, word, meaning, two wrong meanings, the clue words, the kind of clue] */
  var CTX = [
    ['Owls are <b>nocturnal</b>, which means they are active at night.', 'nocturnal', 'active at night', ['very loud', 'able to swim'], 'which means they are active at night', 'definition'],
    ['A <b>meteorologist</b>, a scientist who studies weather, said a storm was coming.', 'meteorologist', 'a scientist who studies weather', ['a person who reads maps', 'a pilot'], 'a scientist who studies weather', 'definition'],
    ['Unlike her <b>timid</b> brother, Amara spoke up at the meeting.', 'timid', 'shy and nervous', ['loud and bold', 'very tall'], 'Unlike', 'contrast'],
    ['Mei was <b>elated</b> about the score, but her friends were disappointed.', 'elated', 'very happy', ['very bored', 'a little hungry'], 'but her friends were disappointed', 'contrast'],
    ['The park has many <b>amenities</b>, such as washrooms, picnic tables and a splash pad.', 'amenities', 'useful things provided for people', ['dangerous animals', 'rules to follow'], 'such as washrooms, picnic tables and a splash pad', 'example'],
    ['Many <b>crustaceans</b>, such as crabs, lobsters and shrimp, live in the Atlantic.', 'crustaceans', 'sea animals with hard outer shells', ['large sea birds', 'kinds of seaweed'], 'such as crabs, lobsters and shrimp', 'example'],
    ['The soup was <b>bland</b>, or plain, so Kai added pepper.', 'bland', 'without much flavour', ['very spicy', 'too hot to eat'], 'or plain', 'synonym'],
    ['Her speech was <b>concise</b>, or short and clear.', 'concise', 'short and clear', ['long and confusing', 'loud and angry'], 'or short and clear', 'synonym'],
    ['A <b>delta</b> is land made of mud and sand where a river meets the sea.', 'delta', 'land made of mud and sand where a river meets the sea', ['a deep lake', 'a type of boat'], 'is land made of mud and sand', 'definition'],
    ['The hikers felt <b>fatigued</b>; that is, they were worn out.', 'fatigued', 'worn out', ['excited', 'lost'], 'that is, they were worn out', 'definition'],
    ['The new neighbours were not <b>hostile</b>; instead, they were warm and welcoming.', 'hostile', 'unfriendly', ['curious', 'noisy'], 'instead, they were warm and welcoming', 'contrast'],
    ['The first trail was <b>arduous</b>, but the second one was easy.', 'arduous', 'very hard to do', ['very short', 'very pretty'], 'but the second one was easy', 'contrast'],
    ['Bring <b>provisions</b> for the trip, such as bannock, apples and water.', 'provisions', 'food and supplies', ['maps and compasses', 'warm clothes'], 'such as bannock, apples and water', 'example'],
    ['<b>Precipitation</b>, for example rain, snow and hail, fell all week.', 'precipitation', 'water that falls from the sky', ['strong wind', 'thick fog'], 'for example rain, snow and hail', 'example'],
    ['The puppy was <b>lethargic</b>, or sleepy and slow, after its long walk.', 'lethargic', 'sleepy and slow', ['playful and fast', 'hungry and loud'], 'or sleepy and slow', 'synonym'],
    ['The lake was <b>tranquil</b>, in other words calm and still.', 'tranquil', 'calm and still', ['rough and stormy', 'cold and deep'], 'in other words calm and still', 'synonym']
  ];
  /* signal words for each kind of clue */
  var SIGNALS = { definition: ['which means', 'that is', 'is'], example: ['such as', 'for example', 'including'], contrast: ['unlike', 'but', 'instead'], synonym: ['or', 'in other words', 'also called'] };
  var KINDS = { definition: 'It tells you what the word means.', example: 'It gives examples.', contrast: 'It shows the opposite.', synonym: 'It gives a word that means the same.' };
  /* a new word, its parts, and what it means in the sentence */
  var PARTS = [
    ['Plastic is not <b>biodegradable</b>, so it stays in landfills for years.', [['bio', 'base'], ['degrad', 'base'], ['able', 'suffix']], 'able to break down naturally', ['able to be recycled', 'made from oil']],
    ['The <b>transcontinental</b> railway linked Canada from coast to coast.', [['trans', 'prefix'], ['continent', 'base'], ['al', 'suffix']], 'across the continent', ['under the ground', 'very old']],
    ['The whisper was <b>inaudible</b> from the back of the gym.', [['in', 'prefix'], ['aud', 'base'], ['ible', 'suffix']], 'not able to be heard', ['very loud', 'easy to see']],
    ['Zara <b>misinterpreted</b> the map and turned the wrong way.', [['mis', 'prefix'], ['interpret', 'base'], ['ed', 'suffix']], 'understood wrongly', ['drew again', 'read aloud']],
    ['The <b>subarctic</b> forest has long winters and short summers.', [['sub', 'prefix'], ['arctic', 'base']], 'just below the Arctic', ['inside a city', 'near the equator']],
    ['The <b>visibility</b> on the highway was poor because of the fog.', [['vis', 'base'], ['ibility', 'suffix']], 'how far you can see', ['how fast you can drive', 'how loud it is']],
    ['The old bridge was <b>unpredictable</b> in strong winds.', [['un', 'prefix'], ['pre', 'prefix'], ['dict', 'base'], ['able', 'suffix']], 'not able to be known ahead of time', ['very strong', 'freshly painted']],
    ['The <b>interprovincial</b> games brought teams from every province.', [['inter', 'prefix'], ['provinc', 'base'], ['ial', 'suffix']], 'between provinces', ['inside one city', 'under the sea']],
    ['The <b>antibacterial</b> soap is used in the hospital.', [['anti', 'prefix'], ['bacteri', 'base'], ['al', 'suffix']], 'against bacteria', ['full of bacteria', 'with a nice smell']],
    ['A <b>portable</b> heater can move from room to room.', [['port', 'base'], ['able', 'suffix']], 'able to be carried', ['very hot', 'made of metal']],
    ['The new arena is a huge <b>construction</b> project.', [['con', 'prefix'], ['struct', 'base'], ['ion', 'suffix']], 'the act of building', ['the act of breaking', 'a kind of game']],
    ['The volcano' + '’' + 's <b>eruption</b> sent ash into the sky.', [['e', 'prefix'], ['rupt', 'base'], ['ion', 'suffix']], 'a bursting out', ['a slow cooling', 'a quiet rumble']]
  ];

  function ctxMean(lv) {
    var c = R.pick(CTX);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(CTX.filter(function (x) { return x !== c; }))[2]] : []), {
      fig: W.sent(c[0]), prompt: 'Look for words nearby that explain it.', hint: 'Read the whole sentence. What clue is there?',
      explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g6-ctx-mean', word: c[1] } });
  }
  function clueWords() {
    var c = R.pick(CTX);
    return Q.one('Which words are the clue to <b>' + c[1] + '</b>?', c[4], R.some(CTX.filter(function (x) { return x !== c; }), 2).map(function (x) { return x[4]; }), {
      fig: W.sent(c[0]), hint: 'Which words in the sentence explain the new word?', explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g6-clue-words', word: c[1] } });
  }
  function clueKind() {
    var c = R.pick(CTX);
    return Q.one('What kind of clue helps with <b>' + c[1] + '</b>?', KINDS[c[5]], Object.keys(KINDS).filter(function (k) { return k !== c[5]; }).map(function (k) { return KINDS[k]; }).slice(0, 2), {
      fig: W.sent(c[0]), hint: 'Look for: which means, such as, unlike, but, or.', explain: '<mark class="hl">' + c[4] + '</mark>: ' + KINDS[c[5]], meta: { k: 'g6-clue-kind', word: c[1] } });
  }
  function partsMean(lv) {
    var p = R.pick(PARTS);
    return Q.one('What does the word in bold mean here?', p[2], p[3].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(p[0]) + (lv > 1 ? '' : ' ' + W.sum(p[1])), prompt: 'Split it into parts. What does each part add?', hint: 'Use the parts and the rest of the sentence.',
      explain: W.sum(p[1]) + ' ' + p[2], meta: { k: 'g6-parts-mean', s: p[0] } });
  }

  /* ---------- shades of meaning: from weakest to strongest ---------- */
  var SHADES = [['cool', 'cold', 'frigid'], ['warm', 'hot', 'scorching'], ['glad', 'happy', 'overjoyed'], ['tired', 'weary', 'exhausted'],
    ['small', 'tiny', 'microscopic'], ['damp', 'wet', 'soaked'], ['nibble', 'eat', 'devour'], ['whisper', 'talk', 'shout'], ['dislike', 'hate', 'loathe'],
    ['dim', 'dark', 'pitch-black'], ['like', 'love', 'adore'], ['scared', 'frightened', 'terrified'], ['big', 'huge', 'enormous'], ['upset', 'angry', 'furious']];
  /* [sounds positive, sounds negative]: the same idea with a different feeling */
  var CONNOTE = [['thrifty', 'cheap'], ['curious', 'nosy'], ['confident', 'arrogant'], ['determined', 'stubborn'], ['relaxed', 'lazy'], ['unique', 'weird'], ['youthful', 'childish'], ['chatty', 'mouthy'],
    ['slender', 'skinny'], ['assertive', 'bossy'], ['proud', 'smug'], ['energetic', 'hyper']];

  function shadeOrder() {
    var s = R.pick(SHADES);
    return { q: 'Put the words in order, from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: s, first: 'Weakest', last: 'Strongest',
      prompt: 'Which is the mildest? Which is the most extreme?', hint: 'Picture each word. Which is the most?', explain: s.join(' &rarr; '), meta: { k: 'g6-shade-order' } };
  }
  function strongest(lv) {
    var s = R.pick(SHADES), most = lv > 1 && R.int(0, 1) === 1;
    return Q.tiles('Which word is the <b>' + (most ? 'weakest' : 'strongest') + '</b>?', most ? s[0] : s[2], most ? s.slice(1) : s.slice(0, 2), {
      hint: 'Picture each one.', explain: s.join(' &rarr; '), meta: { k: 'g6-strongest', most: most ? 'weakest' : 'strongest' } });
  }
  function positive(lv) {
    var c = R.pick(CONNOTE), neg = lv > 1 && R.int(0, 1) === 1;
    return Q.tiles('Which word sounds more <b>' + (neg ? 'negative' : 'positive') + '</b>?', neg ? c[1] : c[0], [neg ? c[0] : c[1]], {
      prompt: 'Would you like to be called this?', hint: 'Both mean nearly the same. Which one feels kinder?', explain: '<b>' + c[0] + '</b> sounds positive. <b>' + c[1] + '</b> sounds negative.',
      meta: { k: 'g6-positive', want: neg ? 'negative' : 'positive' } });
  }
  function pickPositive() {
    var cs = R.some(CONNOTE, 4), right = cs.slice(0, 2).map(function (c) { return c[0]; }), wrong = cs.slice(2).map(function (c) { return c[1]; });
    return Q.all('Pick every word that would be a <b>compliment</b>.', right, wrong, { hint: 'Would you be pleased to hear it about yourself?',
      explain: 'Compliments: ' + right.map(function (w) { return '<b>' + w + '</b>'; }).join(', '), meta: { k: 'g6-pick-positive' } });
  }

  /* ---------- subject words: [word, meaning, subject, a sentence that uses it] ---------- */
  var SUBJ = [
    ['habitat', 'the natural home of a plant or animal', 'Science', 'Wetlands are an important ___ for frogs and herons.'],
    ['erosion', 'the wearing away of land by wind or water', 'Science', 'Waves caused ___ along the cliffs of the Bay of Fundy.'],
    ['adaptation', 'a feature that helps a living thing survive', 'Science', 'Thick fur is an ___ that keeps polar bears warm.'],
    ['treaty', 'a formal agreement between nations', 'Social Studies', 'The First Nation and the Crown signed a ___ about sharing the land.'],
    ['democracy', 'a government chosen by the people', 'Social Studies', 'In a ___, citizens vote for their leaders.'],
    ['perimeter', 'the distance around a shape', 'Math', 'We measured the ___ of the garden to buy enough fencing.'],
    ['ratio', 'a comparison of two amounts', 'Math', 'The ___ of red beads to blue beads is 2 to 3.'],
    ['tempo', 'the speed of a piece of music', 'Arts', 'The band played the song at a slow ___.'],
    ['sketch', 'a quick, rough drawing', 'Arts', 'Leila made a ___ before she started the painting.'],
    ['condensation', 'water vapour turning into liquid', 'Science', 'Drops of ___ formed on the cold glass of lemonade.'],
    ['immigrant', 'a person who moves to a new country to live', 'Social Studies', 'Her grandmother came to Canada as an ___ from Jamaica.'],
    ['latitude', 'how far north or south a place is', 'Social Studies', 'Iqaluit is at a higher ___ than Toronto.'],
    ['integer', 'a positive or negative whole number', 'Math', 'The temperature was -5, a negative ___.'],
    ['probability', 'how likely something is to happen', 'Math', 'The ___ of rolling a 6 is 1 in 6.'],
    ['choreography', 'the planned steps of a dance', 'Arts', 'The dancers practised the ___ for weeks.']
  ];
  function subjMean(lv) {
    var s = R.pick(SUBJ);
    return Q.one('What does <b>' + s[0] + '</b> mean?', s[1], R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: lv > 1 ? '' : '<span class="pill">' + s[2] + '</span>', hint: 'Where have you heard it? In which subject?', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g6-subj-mean', word: s[0] } });
  }
  function subjMatch() {
    var s = R.some(SUBJ, 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: s.map(function (x) { return [x[0], x[1]]; }), hint: 'Start with the word you know best.', explain: 'Subject words have exact meanings.', meta: { k: 'g6-subj-match' } };
  }
  function subjWhich() {
    var s = R.pick(SUBJ), subs = ['Science', 'Social Studies', 'Math', 'Arts'];
    return Q.tiles('Which subject would use <b>' + s[0] + '</b> most?', s[2], subs.filter(function (x) { return x !== s[2]; }), {
      hint: 'What does it mean? Where would you learn that?', explain: '<b>' + s[0] + '</b> (' + s[1] + '): <b>' + s[2] + '</b>', meta: { k: 'g6-subj-which', word: s[0] } });
  }
  function subjGap(lv) {
    var s = R.pick(SUBJ), same = SUBJ.filter(function (x) { return x !== s && (lv > 1 ? x[2] === s[2] : x[2] !== s[2]); });
    return Q.one('Which word fits the gap?', s[0], R.some(same.length ? same : SUBJ.filter(function (x) { return x !== s; }), 2).map(function (x) { return x[0]; }), {
      fig: W.sent(s[3].replace('___', W.gap())), hint: 'Try each word in the sentence.', explain: W.sent(s[3].replace('___', '<b>' + s[0] + '</b>')), meta: { k: 'g6-subj-gap', word: s[0] } });
  }

  /* ---------- more ways to ask ---------- */
  function ctxTf() {
    var c = R.pick(CTX), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' says <b>' + c[1] + '</b> means <b>' + said + '</b>.', fig: W.sent(c[0]), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence fits.', 'The clue in the sentence says something else.'], answer: right ? 0 : 1 },
      hint: 'Find the clue first.', explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g6-ctx-tf', word: c[1], said: said } };
  }
  function wordMeaning(lv) {
    var c = R.pick(CTX);
    return Q.tiles('Which word means <b>' + c[2] + '</b>?', c[1], R.some(CTX.filter(function (x) { return x !== c; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      hint: 'Think back to the sentences.', explain: W.sent(c[0]), meta: { k: 'g6-word-meaning', mean: c[2] } });
  }
  function signalKind(lv) {
    var k = R.pick(Object.keys(KINDS));
    return Q.tiles('Which signal words point to this kind of clue? <b>' + KINDS[k] + '</b>', R.pick(SIGNALS[k]), R.some(Object.keys(KINDS).filter(function (x) { return x !== k; }), lv > 1 ? 3 : 2).map(function (x) { return R.pick(SIGNALS[x]); }), {
      hint: 'Which words would come before that kind of clue?', explain: SIGNALS[k].join(', ') + ': ' + KINDS[k], meta: { k: 'g6-signal-kind', kind: k } });
  }
  function matchKinds() {
    var ks = R.some(Object.keys(KINDS), 3);
    return { q: 'Match each signal word to the kind of clue.', type: 'match', pairs: ks.map(function (k) { return [R.pick(SIGNALS[k]), KINDS[k]]; }), hint: 'Which, such as, unlike, or.', explain: 'Signal words tell you what kind of clue is coming.', meta: { k: 'g6-match-kinds' } };
  }
  function kindTf() {
    var c = R.pick(CTX), right = R.int(0, 1) === 1, said = right ? c[5] : R.pick(Object.keys(KINDS).filter(function (k) { return k !== c[5]; }));
    return { q: Q.name() + ' says this is a <b>' + said + '</b> clue.', fig: W.sent(c[0].replace(c[4], '<mark class="hl">' + c[4] + '</mark>')), type: 'tf', answer: right,
      why: { options: ['The signal words fit that kind.', 'The signal words show another kind.'], answer: right ? 0 : 1 },
      hint: 'Look at the signal words.', explain: KINDS[c[5]], meta: { k: 'g6-kind-tf', word: c[1], said: said } };
  }
  function partsBuild(lv) {
    var p = R.pick(PARTS), extra = R.pick(PARTS.filter(function (x) { return x !== p; }))[1].filter(function (x) { return p[1].every(function (y) { return y[0] !== x[0]; }); }).slice(0, lv > 1 ? 2 : 1);
    var word = p[0].match(/<b>(\w+)<\/b>/)[1];
    return { q: 'Build the word <b>' + word + '</b> from its parts.', type: 'build', parts: p[1].concat(extra).map(function (t) { return W.tile(t[0], t[1]); }), answer: p[1].map(function (t, i) { return i; }),
      hint: 'Prefix, then base, then suffix.', explain: W.sum(p[1]) + ' ' + p[2], meta: { k: 'g6-parts-build', word: word } };
  }
  function partsTf() {
    var p = R.pick(PARTS), right = R.int(0, 1) === 1, said = right ? p[2] : R.pick(p[3]);
    return { q: 'In this sentence, ' + Q.name() + ' says the word in bold means <b>' + said + '</b>.', fig: W.sent(p[0]), type: 'tf', answer: right,
      why: { options: ['The parts and the sentence both fit.', 'The parts do not fit that meaning.'], answer: right ? 0 : 1 },
      hint: 'Split it, then reread the sentence.', explain: W.sum(p[1]) + ' ' + p[2], meta: { k: 'g6-parts-tf', s: p[0], said: said } };
  }
  function partsPick(lv) {
    var p = R.pick(PARTS);
    return Q.one('Which sentence uses the word correctly?', p[0], R.some(PARTS.filter(function (x) { return x !== p; }), 1).map(function (x) {
      return x[0].replace(/<b>\w+<\/b>/, '<b>' + p[0].match(/<b>(\w+)<\/b>/)[1] + '</b>'); }).concat(lv > 1 ? [R.pick(PARTS.filter(function (x) { return x !== p; }))[0].replace(/<b>\w+<\/b>/, '<b>' + p[0].match(/<b>(\w+)<\/b>/)[1] + '</b>')] : []), {
      hint: 'What does it mean? Does it make sense there?', explain: W.sum(p[1]) + ' ' + p[2], meta: { k: 'g6-parts-use', s: p[0] } });
  }
  function middle() {
    var s = R.pick(SHADES);
    return Q.tiles('Which word goes in the <b>middle</b>?', s[1], R.some(SHADES.filter(function (x) { return x !== s; }), 2).map(function (x) { return x[1]; }), { fig: W.tile(s[0]) + ' ' + W.gap() + ' ' + W.tile(s[2]),
      hint: 'Stronger than the first, weaker than the last.', explain: s.join(' &rarr; '), meta: { k: 'g6-shade-middle' } });
  }
  function shadeTf() {
    var s = R.pick(SHADES), i = R.int(0, 1), a = s[i], b = s[i + 1], right = R.int(0, 1) === 1;
    var x = right ? b : a, y = right ? a : b;
    return { q: Q.name() + ' says <b>' + x + '</b> is stronger than <b>' + y + '</b>.', type: 'tf', answer: right,
      why: { options: ['It is more extreme.', 'It is milder.'], answer: right ? 0 : 1 }, hint: 'Picture each word.', explain: s.join(' &rarr; '), meta: { k: 'g6-shade-tf', x: x, y: y } };
  }
  function connoteTf() {
    var c = R.pick(CONNOTE), nice = R.int(0, 1) === 1, w = nice ? c[0] : c[1], n = Q.two();
    return { q: n[0] + ' calls ' + n[1] + ' <b>' + w + '</b>. Is it a compliment?', type: 'tf', answer: nice,
      why: { options: ['The word sounds positive.', 'The word sounds negative.'], answer: nice ? 0 : 1 },
      hint: 'Would you like to be called this?', explain: '<b>' + c[0] + '</b> is kind. <b>' + c[1] + '</b> is not.', meta: { k: 'g6-connote-tf', w: w } };
  }
  function connoteMatch() {
    var cs = R.some(CONNOTE, 3);
    return { q: 'Match each kind word to the unkind word with nearly the same meaning.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[1]]; }),
      hint: 'Which pairs describe the same thing?', explain: 'Same idea, different feeling.', meta: { k: 'g6-connote-match' } };
  }
  function subjTf() {
    var s = R.pick(SUBJ), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(SUBJ.filter(function (x) { return x !== s; }))[1];
    return { q: Q.name() + ' says <b>' + s[0] + '</b> means <b>' + said + '</b>.', type: 'tf', answer: right,
      why: { options: ['That is its exact meaning.', 'That is another subject word.'], answer: right ? 0 : 1 },
      hint: 'Where would you use this word?', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g6-subj-tf', word: s[0], said: said } };
  }

  Atlas.register('vocabulary', {
    full: true,
    lessons: [{
      id: 'context', title: 'Clues in the sentence', sub: 'The words around a new word often explain it.',
      concepts: [
        { slug: 'context', title: 'Use the sentence to work out a word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(CTX[0][0]), 'A new word.'),
            step(W.sent('Owls are nocturnal, <mark class="hl">which means they are active at night</mark>.'), 'The clue is right there.'),
            step(W.means('think', 'nocturnal = active at night')),
            step(W.sent(CTX[3][0]), 'Another new word.'),
            step(W.sent('Mei was elated, <mark class="hl">but her friends were disappointed</mark>.'), 'The opposite of disappointed.'),
            step(W.means('star', 'elated = very happy'), 'Try it in the sentence. It fits.')
          ],
          guided: [function () { return ctxMean(1); }, clueWords, function () { return wordMeaning(1); }],
          check: [function () { return ctxMean(2); }, clueWords, ctxTf, function () { return wordMeaning(2); }, function () { return ctxMean(3); }],
          coach: '<p>When the child stops at a new word, ask: "What do the words around it tell you?" before giving the meaning.</p>',
          mistake: '<p>Skipping new words. Ask the child to point to the clue before they guess.</p>' },
        { slug: 'clue-kinds', title: 'Four kinds of clues', exp: ['B2.2'], skill: 'clue-kinds',
          model: [
            step(W.sent('nocturnal, <mark class="hl">which means</mark> active at night'), '<b>Definition</b>: it tells you.'),
            step(W.sent('crustaceans, <mark class="hl">such as</mark> crabs and lobsters'), '<b>Example</b>.'),
            step(W.sent('<mark class="hl">Unlike</mark> her timid brother...'), '<b>Contrast</b>: the opposite.'),
            step(W.sent('bland, <mark class="hl">or</mark> plain'), '<b>Synonym</b>: a word like it.'),
            step(W.chain(['which means', 'such as', 'unlike', 'or'], ['Definition', 'Example', 'Contrast', 'Synonym']), 'Spot the signal, know the clue.')
          ],
          guided: [clueKind, function () { return signalKind(1); }, matchKinds],
          check: [clueKind, kindTf, function () { return signalKind(2); }, matchKinds, clueKind],
          coach: '<p>Highlight the signal words together: which means, such as, unlike, but, or.</p>',
          mistake: '<p>Reading a contrast clue as a synonym. "Unlike" and "but" point to the opposite.</p>' },
        { slug: 'parts-in-context', title: 'Word parts and the sentence together', exp: ['B2.2'], skill: 'parts',
          model: [
            step(W.sent(PARTS[2][0])),
            step(W.sum(PARTS[2][1]), 'Not, hear, able.'),
            step(W.means('think', 'not able to be heard'), 'Check it: from the back of the gym. It fits.'),
            step(W.sent(PARTS[0][0])),
            step(W.sum(PARTS[0][1]), 'Life, break down, able.'),
            step(W.means('think', 'able to break down naturally'), 'It stays in landfills, so it fits.')
          ],
          guided: [function () { return partsMean(1); }, function () { return partsBuild(1); }, function () { return partsMean(1); }],
          check: [function () { return partsMean(2); }, partsTf, function () { return partsBuild(2); }, function () { return partsPick(2); }, function () { return partsMean(3); }],
          coach: '<p>Two tools at once: split the word, then reread the sentence to check the meaning fits.</p>',
          mistake: '<p>Trusting the parts alone. Always check the meaning in the sentence.</p>' }
      ]
    }, {
      id: 'shades', title: 'Shades of meaning', sub: 'Words that mean nearly the same are not the same.',
      concepts: [
        { slug: 'shades', title: 'Weaker and stronger words', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.tile('cool'), 'A little.'),
            step(W.tile('cool') + ' ' + W.tile('cold'), 'More.'),
            step(W.tile('cool') + ' ' + W.tile('cold') + ' ' + W.tile('frigid'), 'The most.'),
            step(W.tile('scared') + ' ' + W.gap() + ' ' + W.tile('terrified'), 'What fits between?'),
            step(W.tile('scared') + ' ' + W.tile('frightened') + ' ' + W.tile('terrified'), 'Stronger than scared, weaker than terrified.')
          ],
          guided: [shadeOrder, function () { return strongest(1); }, middle],
          check: [shadeOrder, function () { return strongest(2); }, middle, shadeTf, shadeOrder],
          coach: '<p>Line up paint chips from light to dark, and line up words the same way.</p>',
          mistake: '<p>Using the strongest word every time. "Scorching" for a warm day sounds false.</p>' },
        { slug: 'connotation', title: 'Words carry feelings', exp: ['B2.2'], skill: 'connotation',
          model: [
            step(W.tile('curious') + ' ' + W.tile('nosy'), 'Both want to know more.'),
            step(W.tile('curious'), 'Sounds positive.'),
            step(W.tile('nosy'), 'Sounds negative.'),
            step(W.tile('determined') + ' ' + W.tile('stubborn'), 'Both will not give up.'),
            step(W.means('star', 'determined'), 'A compliment. Stubborn is not.')
          ],
          guided: [function () { return positive(1); }, pickPositive, connoteMatch],
          check: [function () { return positive(2); }, connoteTf, pickPositive, connoteMatch, function () { return positive(3); }],
          coach: '<p>Ask: "Which would you rather be called?" The answer shows the feeling a word carries.</p>',
          mistake: '<p>Thinking words with the same meaning can always swap. Feelings change the message.</p>' }
      ]
    }, {
      id: 'subjects', title: 'Words for other subjects', sub: 'Science, social studies, math and the arts have their own words.',
      concepts: [
        { slug: 'subject-words', title: 'Subject words have exact meanings', exp: ['B2.2'], skill: 'subject-words',
          model: [
            step('<span class="pill">Science</span> ' + W.tile('erosion'), 'The wearing away of land by wind or water.'),
            step(W.sent('Waves caused <b>erosion</b> along the cliffs.'), 'Use it in a sentence.'),
            step('<span class="pill">Math</span> ' + W.tile('perimeter'), 'The distance around a shape.'),
            step(W.sent('We measured the <b>perimeter</b> of the garden.'), 'Exact: around, not inside.'),
            step('<span class="pill">Social Studies</span> ' + W.tile('treaty'), 'A formal agreement between nations.')
          ],
          guided: [function () { return subjMean(1); }, function () { return subjGap(1); }, subjWhich],
          check: [function () { return subjMean(2); }, subjTf, function () { return subjGap(2); }, subjMatch, function () { return subjMean(3); }],
          coach: '<p>Keep a short word list for each subject. Use each new word in a spoken sentence the same day.</p>',
          mistake: '<p>Using a subject word loosely, like "perimeter" for area. Check the exact meaning.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Clues in the sentence', code: 'B2.2', gen: ctxMean },
      { id: 'clue-kinds', name: 'Kinds of clues', code: 'B2.2', gen: clueKind },
      { id: 'parts', name: 'Word parts in a sentence', code: 'B2.2', gen: partsMean },
      { id: 'shades', name: 'Weaker and stronger words', code: 'B2.2', gen: shadeOrder },
      { id: 'connotation', name: 'Words carry feelings', code: 'B2.2', gen: positive },
      { id: 'subject-words', name: 'Subject words', code: 'B2.2', gen: subjMean }
    ]
  });

  Q.shapes('vocabulary', {
    context: [[1, 'clue-words', clueWords], [1, 'which-word', wordMeaning], [2, 'tf', ctxTf]],
    'clue-kinds': [[1, 'signal', signalKind], [1, 'match', matchKinds], [2, 'tf', kindTf]],
    parts: [[1, 'build', partsBuild], [2, 'use', partsPick], [2, 'tf', partsTf]],
    shades: [[1, 'strongest', strongest], [1, 'middle', middle], [2, 'tf', shadeTf]],
    connotation: [[1, 'pick', pickPositive], [1, 'match', connoteMatch], [2, 'tf', connoteTf]],
    'subject-words': [[1, 'gap', subjGap], [1, 'subject', subjWhich], [2, 'match', subjMatch], [2, 'tf', subjTf]]
  });
})();
