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
    ['We need a <b>sturdy</b> table, not a wobbly one.', 'sturdy', 'strong and steady', 'small', 'colourful', 'not a wobbly one'],
    ['The <b>enormous</b> moose was taller than our car.', 'enormous', 'very big', 'very fast', 'very quiet', 'taller than our car'],
    ['Mia was <b>exhausted</b>, so she went to bed early.', 'exhausted', 'very tired', 'very excited', 'very angry', 'went to bed early'],
    ['The ice was <b>fragile</b> and cracked when I stepped on it.', 'fragile', 'easy to break', 'very thick', 'very bright', 'cracked when I stepped on it'],
    ['Nia felt <b>anxious</b> before the test. Her hands shook.', 'anxious', 'worried', 'proud', 'bored', 'Her hands shook'],
    ['The soup was <b>scalding</b>. Steam rose from the bowl, so I waited.', 'scalding', 'very hot', 'very salty', 'very thin', 'Steam rose from the bowl'],
    ['Ravi gave a <b>brief</b> talk. It was over in one minute.', 'brief', 'short', 'loud', 'boring', 'over in one minute']
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
  function clueFit() {
    var c = R.pick(CLUE), o = R.some(CLUE.filter(function (x) { return x !== c; }), 2);
    return Q.tiles('Which word fits the gap?', c[1], o.map(function (x) { return x[1]; }), { fig: W.sent(c[0].replace('<b>' + c[1] + '</b>', W.gap())),
      prompt: 'Use the clue: ' + c[5] + '.', hint: 'Which word means ' + c[2] + '?', explain: W.sent(c[0]), meta: { k: 'g4-clue-fit', word: c[1] } });
  }

  /* ---------- shades of meaning: weak to strong ---------- */
  var SCALE = [['cool', 'cold', 'freezing'], ['warm', 'hot', 'scorching'], ['glad', 'happy', 'overjoyed'], ['annoyed', 'angry', 'furious'],
    ['damp', 'wet', 'soaked'], ['whisper', 'talk', 'shout'], ['walk', 'jog', 'sprint'], ['like', 'love', 'adore'],
    ['nibble', 'eat', 'gobble'], ['sip', 'drink', 'gulp'], ['nervous', 'scared', 'terrified'], ['good', 'great', 'amazing']];
  /* [sentence with a gap, the exact word] */
  var EXACT = [['After the swim, my towel was ___ and dripping.', 'soaked'], ['The baby is asleep, so please ___.', 'whisper'], ['It was ___ outside: minus 30 degrees!', 'freezing'],
    ['The sand was so ___ that it burned our feet.', 'scorching'], ['When she saw her lost cat, Leila was ___.', 'overjoyed'], ['Sam had to ___ to catch the bus before it left.', 'sprint'],
    ['The grass was a little ___ from the morning dew.', 'damp'], ['Omar was ___ when his little brother hid his shoe again.', 'annoyed'],
    ['The tea is very hot, so just ___ it slowly.', 'sip'], ['The hamster likes to ___ on a carrot, one tiny bite at a time.', 'nibble'],
    ['Max was a little ___ before his first swim lesson.', 'nervous'], ['After the long race, Jo had to ___ the whole bottle of water.', 'gulp'],
    ['The bannock was ___: the best I have ever tasted!', 'amazing'], ['A grizzly bear stood up, and Eli was ___. He could not move.', 'terrified']];
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
    return Q.tiles('Which word is the <b>strongest</b>?', s[2], [s[0], s[1]], { hint: 'Strongest means the most.', explain: W.chain(s), meta: { k: 'g4-strongest' } });
  }
  function weakest() {
    var s = R.pick(SCALE);
    return Q.tiles('Which word is the <b>weakest</b>?', s[0], [s[1], s[2]], { hint: 'Weakest means just a little.', explain: W.chain(s), meta: { k: 'g4-weakest' } });
  }
  function exactTf() {
    var e = R.pick(EXACT), s = scaleOf(e[1]), right = R.int(0, 1) === 1, w = right ? e[1] : R.pick(s.filter(function (x) { return x !== e[1]; }));
    return { q: 'True or false? <b>' + w + '</b> is the best word here.', fig: W.sent(e[0].replace('___', '<b>' + w + '</b>')), type: 'tf', answer: right,
      hint: 'Is it a little, or a lot?', explain: W.sent(e[0].replace('___', '<b>' + e[1] + '</b>')), meta: { k: 'g4-exact-tf', s: e[0], w: w } };
  }

  /* ---------- one word, more than one meaning: [word, sentence, meaning here, other meaning, a short cue for matching] ---------- */
  var MULTI = [
    ['bark', 'The dog' + AP + 's <b>bark</b> woke the baby.', 'the sound a dog makes', 'the outside of a tree', 'the dog' + AP + 's bark'],
    ['bark', 'The birch <b>bark</b> was white and smooth.', 'the outside of a tree', 'the sound a dog makes', 'birch bark'],
    ['bat', 'A <b>bat</b> flew out of the cave at night.', 'a flying animal', 'a stick for hitting a ball', 'a bat flew'],
    ['bat', 'Owen swung the <b>bat</b> and hit the ball.', 'a stick for hitting a ball', 'a flying animal', 'swung the bat'],
    ['current', 'The <b>current</b> in the river was strong.', 'moving water', 'happening now', 'current in the river'],
    ['current', 'What is the <b>current</b> score?', 'happening now', 'moving water', 'the current score'],
    ['fair', 'We rode the Ferris wheel at the fall <b>fair</b>.', 'a show with rides and games', 'treating everyone the same', 'the fall fair'],
    ['fair', 'It is <b>fair</b> to give everyone a turn.', 'treating everyone the same', 'a show with rides and games', 'fair to give a turn'],
    ['light', 'The box was <b>light</b> enough to carry.', 'not heavy', 'something that lets you see', 'light enough to carry'],
    ['light', 'Turn on the <b>light</b>, please.', 'something that lets you see', 'not heavy', 'turn on the light'],
    ['ring', 'Auntie gave me a silver <b>ring</b> for my finger.', 'a circle you wear', 'the sound a bell makes', 'a silver ring'],
    ['ring', 'I heard the school bell <b>ring</b> at nine.', 'the sound a bell makes', 'a circle you wear', 'the bell ring'],
    ['park', 'We played soccer at the <b>park</b>.', 'a place with grass to play', 'to stop a car and leave it', 'soccer at the park'],
    ['park', 'Dad had to <b>park</b> the van near the arena.', 'to stop a car and leave it', 'a place with grass to play', 'park the van'],
    ['wave', 'A big <b>wave</b> splashed over the canoe.', 'water that rises and moves', 'to move your hand to say hello', 'a big wave splashed'],
    ['wave', 'Ana turned to <b>wave</b> to her friends on the dock.', 'to move your hand to say hello', 'water that rises and moves', 'wave to her friends']
  ];
  var MWORDS = MULTI.map(function (m) { return m[0]; }).filter(function (w, i, a) { return a.indexOf(w) === i; });
  function multi() {
    var m = R.pick(MULTI);
    return Q.one('What does <b>' + m[0] + '</b> mean in this sentence?', m[2], [m[3]], { fig: W.sent(m[1]), prompt: 'Try each meaning in the sentence.',
      hint: 'Which meaning makes sense here?', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g4-multi', s: m[1] } });
  }
  function multiMatch() {
    var w = R.pick(MWORDS), two = MULTI.filter(function (m) { return m[0] === w; });
    return { q: 'Match each use of <b>' + w + '</b> to what it means.', type: 'match', pairs: two.map(function (m) { return [m[4], m[2]]; }),
      hint: 'Try each meaning in each sentence.', explain: 'The same word can mean different things.', meta: { k: 'g4-multi-match' } };
  }
  function multiTf() {
    var m = R.pick(MULTI), right = R.int(0, 1) === 1, said = right ? m[2] : m[3];
    return { q: 'True or false?', fig: W.sent(m[1]) + W.sent('Here, <b>' + m[0] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      hint: 'Put the meaning in place of the word. Does it make sense?', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g4-multi-tf', s: m[1], said: said } };
  }
  function multiWhich() {
    var m = R.pick(MULTI), other = MULTI.filter(function (x) { return x[0] === m[0] && x !== m; })[0];
    return Q.one('In which sentence does <b>' + m[0] + '</b> mean <b>' + m[2] + '</b>?', m[1], [other[1]], { hint: 'Try the meaning in each sentence.',
      explain: W.sent(m[1]), meta: { k: 'g4-multi-which', mean: m[2] } });
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
    ['province', 'one of the ten main parts of Canada', 'social studies', 'Ontario is a province.', 'Toronto is a province.'],
    ['force', 'a push or a pull', 'science', 'A magnet uses a force to pull the nail.', 'A force is a kind of rock.'],
    ['mineral', 'a solid that forms in nature, like quartz', 'science', 'Quartz is a mineral found in rock.', 'A mineral is a kind of bird.'],
    ['pulley', 'a wheel with a rope that helps lift things', 'science', 'The pulley helped us lift the bucket.', 'A pulley is a kind of tree.'],
    ['capital', 'the city where a government meets', 'social studies', 'Toronto is the capital of Ontario.', 'A capital is a small lake.'],
    ['landform', 'a natural shape of the land, like a hill', 'social studies', 'A mountain is a landform.', 'A landform is a type of boat.'],
    ['trade', 'giving one thing to get another', 'social studies', 'Long ago, people would trade furs for metal pots.', 'Trade means sleeping outside.']
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
      hint: 'Science studies living things, rocks, forces and machines.', explain: 'Science: ' + sci.map(function (s) { return s[0]; }).join(', ') + '.', meta: { k: 'g4-subj-sort' } });
  }
  function subjTf() {
    var s = R.pick(SUBJ), right = R.int(0, 1) === 1, said = right ? s[1] : R.pick(SUBJ.filter(function (x) { return x !== s; }))[1];
    return { q: 'True or false? <b>' + s[0] + '</b> means <b>' + said + '</b>.', fig: W.sent(s[3]), type: 'tf', answer: right,
      hint: 'Use the sentence as a clue.', explain: '<b>' + s[0] + '</b>: ' + s[1] + '.', meta: { k: 'g4-subj-tf', word: s[0], said: said } };
  }

  Atlas.register('meanings', {
    full: true,
    lessons: [{
      id: 'clues', title: 'Clues and exact words', sub: 'Work out a new word, and choose the best one.',
      concepts: [
        { slug: 'context', title: 'Use clues in the sentence', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('Kai was <b>famished</b> after the hike, so he ate three sandwiches.'), 'A new word.'),
            step(W.sent('Kai was famished after the hike, so he <mark class="hl">ate three sandwiches</mark>.'), 'Find the clue.'),
            step(W.means('think', 'Three sandwiches? He was <b>very hungry</b>.')),
            step(W.sent('The ice was <b>fragile</b> and cracked when I stepped on it.'), 'Another one.'),
            step(W.sent('The ice was fragile and <mark class="hl">cracked when I stepped on it</mark>.'), 'The clue comes after.'),
            step(W.sent('The ice was <b>easy to break</b> and cracked.'), 'Put the meaning in. It makes sense.')
          ],
          guided: [function () { return clueMeaning(1); }, clueWords, clueFit],
          check: [function () { return clueMeaning(2); }, clueWords, clueFit, clueTf, clueMatch],
          coach: '<p>When the child meets a new word, ask: "What else does the sentence tell us?" Clues are often just after the word, or after "so", "not" or "because".</p>',
          mistake: '<p>Skipping the word and reading on. Stop, look for the clue, then reread the sentence with the meaning in it.</p>' },
        { slug: 'shades', title: 'Pick the exact word', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.chain(['cool', 'cold', 'freezing'], ['a little', '', 'a lot']), 'Each word is stronger.'),
            step(W.sent('It was ' + W.gap() + ' outside: minus 30 degrees!'), 'Minus 30 is a lot.'),
            step(W.sent('It was <b>freezing</b> outside: minus 30 degrees!'), 'The strongest fits.'),
            step(W.chain(['damp', 'wet', 'soaked'], ['a little', '', 'a lot'])),
            step(W.sent('The grass was <mark class="hl">a little</mark> ' + W.gap() + ' from the dew.'), 'A clue: a little.'),
            step(W.sent('The grass was a little <b>damp</b> from the dew.'), 'The weakest fits.')
          ],
          guided: [exactWord, shadeOrder, strongest],
          check: [exactWord, shadeOrder, exactTf, weakest, exactWord],
          coach: '<p>Line up three words on paper from weak to strong. Act them out: whisper, talk, shout.</p>',
          mistake: '<p>Always choosing the biggest word. The exact word fits how much, not the most.</p>' }
      ]
    }, {
      id: 'many', title: 'Words that do more', sub: 'Words with two meanings, and words from other subjects.',
      concepts: [
        { slug: 'multiple', title: 'One word, two meanings', exp: ['B2.2'], skill: 'multiple',
          model: [
            step(W.pic('dog') + W.sent('The dog' + AP + 's <b>bark</b> woke the baby.'), 'A sound.'),
            step(W.pic('tree') + W.sent('The birch <b>bark</b> was white.'), 'The outside of a tree.'),
            step(W.means('think', 'Dog? Then bark is a sound.'), 'The other words tell you which.'),
            step(W.pic('canoe') + W.sent('A big <b>wave</b> splashed over the canoe.'), 'Another one.'),
            step(W.sent('Ana turned to <b>wave</b> to her friends.'), 'Same word, new meaning.'),
            step(W.means('think', 'Splashed: water. To her friends: a hand saying hello.'))
          ],
          guided: [multi, multiWhich, multiMatch],
          check: [multi, multiTf, multiWhich, multiMatch, multi],
          coach: '<p>Play "two sentences": say a word like <b>ring</b> or <b>light</b> and take turns making sentences with each meaning.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Try each meaning in the sentence.</p>' },
        { slug: 'subject', title: 'Words from science and social studies', exp: ['B2.2'], skill: 'subject',
          model: [
            step(W.pic('fish') + W.sent('A pond is a <b>habitat</b> for frogs.'), 'Science: a natural home.'),
            step(W.sent('An owl lives in a forest <b>habitat</b>.'), 'Use it again in a new sentence.'),
            step(W.sent('My <s>habitat</s> habit is to brush my teeth.'), 'Habit is a different word.'),
            step(W.pic('map') + W.sent('Ontario is a <b>province</b>.'), 'Social studies: one of the ten main parts of Canada.'),
            step(W.sent('Toronto is a city in that <b>province</b>.'), 'A city is inside a province.'),
            step(W.icon('write'), 'Say it, read it, use it in your own sentence.')
          ],
          guided: [function () { return subjMeaning(1); }, subjUse, subjTf],
          check: [function () { return subjMeaning(2); }, subjMatch, subjUse, subjTf, subjSort],
          coach: '<p>Keep a "word wall" on the fridge for words from school subjects. Use one at dinner each night.</p>',
          mistake: '<p>Mixing a new word with one that sounds like it (habitat and habit). Read the sentence to check.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Clues in the sentence', code: 'B2.2', gen: clueMeaning },
      { id: 'shades', name: 'The exact word', code: 'B2.2', gen: exactWord },
      { id: 'multiple', name: 'Words with two meanings', code: 'B2.2', gen: multi },
      { id: 'subject', name: 'Subject words', code: 'B2.2', gen: subjMeaning }
    ]
  });

  Q.shapes('meanings', {
    context: [[1, 'clue-words', clueWords], [1, 'fit', clueFit], [1, 'match', clueMatch], [2, 'true-false', clueTf]],
    shades: [[1, 'order', shadeOrder], [1, 'strongest', strongest], [1, 'weakest', weakest], [2, 'true-false', exactTf]],
    multiple: [[1, 'which-sentence', multiWhich], [1, 'match', multiMatch], [2, 'true-false', multiTf], [2, 'pick', multi]],
    subject: [[1, 'use-it', subjUse], [1, 'match', subjMatch], [2, 'sort', subjSort], [2, 'true-false', subjTf]]
  });
})();
