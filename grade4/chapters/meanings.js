/* Grade 4: word meanings. Clues in the sentence, shades of meaning (picking the exact word), words with more than one
   meaning, and words taught in science and social studies.
   Ontario 2023 Language, Grade 4, B2.2 "demonstrate an understanding of a variety of words, acquire and use explicitly taught
   vocabulary in various contexts, including other subject areas, and use morphological knowledge to analyze and understand new
   words in context" (word parts are taught in the Word Parts chapter).
   All sentences are written for this site. Answer checks: tests/verify/grade4-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [sentence, the new word, what it means, wrong, wrong, the clue words] */
  var CLUE = [
    ['The trail was so <b>narrow</b> that we walked in single file.', 'narrow', 'not wide', 'very long', 'muddy', 'walked in single file'],
    ['Kai was <b>famished</b> after the hike, so he ate three sandwiches.', 'famished', 'very hungry', 'very tired', 'very cold', 'ate three sandwiches'],
    ['The <b>timid</b> deer ran away at the smallest sound.', 'timid', 'shy and easily scared', 'big and strong', 'loud', 'ran away at the smallest sound'],
    ['Our cabin is <b>remote</b>. The nearest store is 80 km away.', 'remote', 'far from other places', 'close to the city', 'very old', 'nearest store is 80 km away'],
    ['The pond was <b>murky</b>, not clear like the lake at home.', 'murky', 'cloudy and hard to see through', 'clean', 'warm', 'not clear like the lake'],
    ['Grandpa is <b>frugal</b>. He saves money and never wastes food.', 'frugal', 'careful with money', 'very rich', 'very funny', 'saves money and never wastes food'],
    ['The puppy was <b>drowsy</b> and kept closing its eyes.', 'drowsy', 'sleepy', 'hungry', 'playful', 'kept closing its eyes'],
    ['We need a <b>sturdy</b> table, not a wobbly one.', 'sturdy', 'strong and steady', 'small', 'colourful', 'not a wobbly one']
  ];
  function clueMeaning(lv) {
    var c = R.pick(CLUE);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c.slice(3, lv > 1 ? 5 : 4), { fig: W.sent(c[0]), prompt: 'Find the words that give a clue.',
      hint: 'Read the whole sentence. Which words help?', explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', meta: { k: 'g4-clue', word: c[1] } });
  }
  function clueWords() {
    var c = R.pick(CLUE), o = R.some(CLUE.filter(function (x) { return x !== c; }), 2);
    return Q.one('<b>' + c[1] + '</b> means <b>' + c[2] + '</b>. Which words in the sentence are the clue?', c[5], o.map(function (x) { return x[5]; }), { fig: W.sent(c[0]),
      hint: 'The clue is in the same sentence.', explain: W.sent(c[0].replace(c[5], '<mark class="hl">' + c[5] + '</mark>')), meta: { k: 'g4-clue-words', word: c[1] } });
  }
  function clueTf() {
    var c = R.pick(CLUE), right = R.int(0, 1) === 1, said = right ? c[2] : c[3];
    return { q: 'True or false?', fig: W.sent(c[0]) + W.sent('Here, <b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      hint: 'Put the meaning in place of the word. Does the sentence still make sense?', explain: '<b>' + c[1] + '</b> means <b>' + c[2] + '</b>.', meta: { k: 'g4-clue-tf', word: c[1], said: said } };
  }
  function clueMatch() {
    var cs = R.some(CLUE, 3);
    return { q: 'Match each word to what it means.', type: 'match', pairs: cs.map(function (c) { return [c[1], c[2]]; }), hint: 'Think of the sentences you read.', explain: 'Clues in a sentence help you work out a word.', meta: { k: 'g4-clue-match' } };
  }

  /* ---------- shades of meaning: weak to strong ---------- */
  var SCALE = [['cool', 'cold', 'freezing'], ['warm', 'hot', 'scorching'], ['glad', 'happy', 'overjoyed'], ['annoyed', 'angry', 'furious'],
    ['damp', 'wet', 'soaked'], ['whisper', 'talk', 'shout'], ['walk', 'jog', 'sprint'], ['like', 'love', 'adore']];
  /* [sentence with a gap, the exact word] */
  var EXACT = [['After the swim, my towel was ___ and dripping.', 'soaked'], ['The baby is asleep, so please ___.', 'whisper'], ['It was ___ outside: minus 30 degrees!', 'freezing'],
    ['The sand was so ___ that it burned our feet.', 'scorching'], ['When she saw her lost cat, Leila was ___.', 'overjoyed'], ['Sam had to ___ to catch the bus before it left.', 'sprint'],
    ['The grass was a little ___ from the morning dew.', 'damp'], ['Omar was ___ when his little brother hid his shoe again.', 'annoyed']];
  function scaleOf(w) { return SCALE.filter(function (s) { return s.indexOf(w) >= 0; })[0]; }
  function exactWord() {
    var e = R.pick(EXACT), s = scaleOf(e[1]);
    return Q.tiles('Which word fits <b>best</b>?', e[1], s.filter(function (x) { return x !== e[1]; }), { fig: W.sent(e[0].replace('___', W.gap())),
      prompt: 'Is it a little, or a lot?', hint: 'Look for a clue about how much.', explain: W.sent(e[0].replace('___', '<b>' + e[1] + '</b>')), meta: { k: 'g4-exact', s: e[0] } });
  }
  function shadeOrder() {
    var s = R.pick(SCALE);
    return { q: 'Put these from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: s, first: 'Weakest', last: 'Strongest',
      hint: 'Which one is a little? Which is a lot?', explain: W.sent(s.join(' &rarr; ')), meta: { k: 'g4-shade-order' } };
  }
  function strongest() {
    var s = R.pick(SCALE);
    return Q.tiles('Which word is the <b>strongest</b>?', s[2], [s[0], s[1]], { hint: 'Strongest means the most.', explain: W.sent(s.join(' &rarr; ')), meta: { k: 'g4-strongest' } });
  }

  /* ---------- one word, more than one meaning: [word, sentence, meaning here, other meaning] ---------- */
  var MULTI = [
    ['bark', 'The dog' + AP + 's <b>bark</b> woke the baby.', 'the sound a dog makes', 'the outside of a tree'],
    ['bark', 'The birch <b>bark</b> was white and smooth.', 'the outside of a tree', 'the sound a dog makes'],
    ['bat', 'A <b>bat</b> flew out of the cave at night.', 'a flying animal', 'a stick for hitting a ball'],
    ['bat', 'Owen swung the <b>bat</b> and hit the ball.', 'a stick for hitting a ball', 'a flying animal'],
    ['current', 'The <b>current</b> in the river was strong.', 'moving water', 'happening now'],
    ['current', 'What is the <b>current</b> score?', 'happening now', 'moving water'],
    ['fair', 'We rode the Ferris wheel at the fall <b>fair</b>.', 'a show with rides and games', 'treating everyone the same'],
    ['fair', 'It is <b>fair</b> to give everyone a turn.', 'treating everyone the same', 'a show with rides and games'],
    ['light', 'The box was <b>light</b> enough to carry.', 'not heavy', 'something that lets you see'],
    ['light', 'Turn on the <b>light</b>, please.', 'something that lets you see', 'not heavy']
  ];
  function multi() {
    var m = R.pick(MULTI);
    return Q.one('What does <b>' + m[0] + '</b> mean in this sentence?', m[2], [m[3]], { fig: W.sent(m[1]), prompt: 'Try each meaning in the sentence.',
      hint: 'Which meaning makes sense here?', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g4-multi', s: m[1] } });
  }
  function multiMatch() {
    var w = R.pick(['bark', 'bat', 'current', 'fair', 'light']), two = MULTI.filter(function (m) { return m[0] === w; });
    return { q: 'Match each sentence to what <b>' + w + '</b> means.', type: 'match', pairs: two.map(function (m) { return [m[1], m[2]]; }),
      hint: 'Try each meaning in each sentence.', explain: 'The same word can mean different things.', meta: { k: 'g4-multi-match' } };
  }

  /* ---------- subject words: [word, meaning, subject, a sentence that uses it well, one that does not] ---------- */
  var SUBJ = [
    ['habitat', 'the natural home of a plant or animal', 'science', 'A pond is a habitat for frogs.', 'My habitat is to brush my teeth every night.'],
    ['adaptation', 'a body part or behaviour that helps a living thing survive', 'science', 'Thick fur is an adaptation that keeps a polar bear warm.', 'An adaptation is a place where animals sleep.'],
    ['predator', 'an animal that hunts other animals', 'science', 'The owl is a predator that hunts mice.', 'The mouse is a predator that hides from owls.'],
    ['erosion', 'the wearing away of rock and soil by water or wind', 'science', 'Waves cause erosion of the cliff over many years.', 'Erosion made the cliff grow taller.'],
    ['community', 'a group of people who live or work together', 'social studies', 'Our community built a new park together.', 'A community is one person alone.'],
    ['natural resource', 'something from nature that people use', 'social studies', 'Water is a natural resource.', 'A plastic toy is a natural resource.'],
    ['region', 'an area with things in common', 'social studies', 'The Canadian Shield is a region with rocks, lakes and forests.', 'A region is a kind of weather.'],
    ['province', 'one of the ten main parts of Canada', 'social studies', 'Ontario is a province.', 'Toronto is a province.']
  ];
  function subjMeaning(lv) {
    var s = R.pick(SUBJ), o = R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2);
    return Q.one('What does <b>' + s[0] + '</b> mean?', s[1], o.map(function (x) { return x[1]; }), { fig: W.sent(s[3]), hint: 'Use the sentence as a clue.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g4-subj', word: s[0] } });
  }
  function subjMatch() {
    var ss = R.some(SUBJ, 3);
    return { q: 'Match each word to what it means.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[1]]; }), hint: 'Think of science and social studies.', explain: 'These words are used in other subjects too.', meta: { k: 'g4-subj-match' } };
  }
  function subjUse() {
    var s = R.pick(SUBJ);
    return Q.one('Which sentence uses <b>' + s[0] + '</b> correctly?', s[3], [s[4]], { hint: s[0] + ' means ' + s[1] + '.', explain: W.sent(s[3]), meta: { k: 'g4-subj-use', word: s[0] } });
  }
  function subjSort() {
    var sci = R.some(SUBJ.filter(function (s) { return s[2] === 'science'; }), 2), soc = R.some(SUBJ.filter(function (s) { return s[2] !== 'science'; }), 2);
    return Q.all('Pick every word you would use in <b>science</b>.', sci.map(function (s) { return s[0]; }), soc.map(function (s) { return s[0]; }), {
      hint: 'Science studies living things, rocks, water and weather.', explain: 'Science: habitat, adaptation, predator, erosion.', meta: { k: 'g4-subj-sort' } });
  }

  Atlas.register('meanings', {
    lessons: [{
      id: 'clues', title: 'Clues and exact words', sub: 'Work out a new word, and choose the best one.',
      concepts: [
        { slug: 'context', title: 'Use clues in the sentence', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('Kai was <b>famished</b> after the hike, so he ate three sandwiches.'), 'What does famished mean?'),
            step(W.sent('Kai was famished after the hike, so he <mark class="hl">ate three sandwiches</mark>.'), 'A clue.'),
            step(W.tile('very hungry'), 'Try it in the sentence. It makes sense.')
          ],
          guided: [function () { return clueMeaning(1); }, clueWords],
          check: [function () { return clueMeaning(2); }, clueWords],
          coach: '<p>When the child meets a new word, ask: "What else does the sentence tell us?" Clues are often just after the word, or after "so", "not" or "because".</p>',
          mistake: '<p>Skipping the word and reading on. Stop, look for the clue, then reread the sentence with the meaning in it.</p>' },
        { slug: 'shades', title: 'Pick the exact word', exp: ['B2.2'], skill: 'precise',
          model: [
            step(W.sent('cool &rarr; cold &rarr; freezing'), 'Each word is stronger.'),
            step(W.sent('It was <b>freezing</b> outside: minus 30 degrees!'), 'Minus 30? Use the strongest.'),
            step(W.sent('The grass was a little <b>damp</b>.'), '"A little" needs a weak word.')
          ],
          guided: [exactWord, shadeOrder],
          check: [exactWord, shadeOrder],
          coach: '<p>Line up three words on paper from weak to strong. Act them out: whisper, talk, shout.</p>',
          mistake: '<p>Always choosing the biggest word. The exact word fits how much, not the most.</p>' }
      ]
    }, {
      id: 'many', title: 'Words that do more', sub: 'Words with two meanings, and words from other subjects.',
      concepts: [
        { slug: 'multiple', title: 'One word, two meanings', exp: ['B2.2'], skill: 'precise',
          model: [
            step(W.sent('The dog' + AP + 's <b>bark</b> woke the baby.'), 'A sound.'),
            step(W.sent('The birch <b>bark</b> was white.'), 'The outside of a tree.'),
            step(W.icon('think'), 'The rest of the sentence tells you which.')
          ],
          guided: [multi, multiMatch],
          check: [multi, multiMatch],
          coach: '<p>Play "two sentences": say a word like <b>ring</b> or <b>light</b> and take turns making sentences with each meaning.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Try each meaning in the sentence.</p>' },
        { slug: 'subject', title: 'Words from science and social studies', exp: ['B2.2'], skill: 'subject',
          model: [
            step(W.sent('A pond is a <b>habitat</b> for frogs.'), 'Science: a natural home.'),
            step(W.sent('Ontario is a <b>province</b>.'), 'Social studies: one of the ten main parts of Canada.'),
            step(W.icon('write'), 'Say it, read it, use it in your own sentence.')
          ],
          guided: [function () { return subjMeaning(1); }, subjUse],
          check: [function () { return subjMeaning(2); }, subjMatch],
          coach: '<p>Keep a "word wall" on the fridge for words from school subjects. Use one at dinner each night.</p>',
          mistake: '<p>Mixing a new word with one that sounds like it (habitat and habit). Read the sentence to check.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Clues in the sentence', code: 'B2.2', gen: clueMeaning },
      { id: 'precise', name: 'Exact words and two meanings', code: 'B2.2', gen: exactWord },
      { id: 'subject', name: 'Subject words', code: 'B2.2', gen: subjMeaning }
    ]
  });

  Q.shapes('meanings', {
    context: [[1, 'clue-words', clueWords], [1, 'match', clueMatch], [2, 'true-false', clueTf]],
    precise: [[1, 'order', shadeOrder], [1, 'strongest', strongest], [1, 'two-meanings', multi], [2, 'match', multiMatch]],
    subject: [[1, 'use-it', subjUse], [1, 'match', subjMatch], [2, 'sort', subjSort]]
  });
})();
