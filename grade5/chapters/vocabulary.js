/* Grade 5: word meanings. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Context clues (a definition, examples, a contrast), shades of meaning, words with more than one meaning, and the words of other subjects.
   Ontario 2023 Language, Grade 5, B2.2 "demonstrate an understanding of a variety of words, acquire and use explicitly taught vocabulary
   in various contexts, including other subject areas, and use generalized morphological knowledge to analyze and understand new words in context".
   All sentences are written for this site. Answer checks: tests/verify/grade5-vocabulary.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var RQ = '’';
  var CLUES = ['a definition', 'examples', 'a contrast'];
  var SIGNALS = { 'a definition': ['or', 'which is', 'which means', 'that is'], examples: ['such as', 'like', 'including', 'for example'], 'a contrast': ['but', 'unlike', 'however', 'instead of'] };
  var ICON = { 'a definition': 'read', examples: 'people', 'a contrast': 'not' };

  /* [sentence, the new word, its meaning, two wrong meanings, kind of clue, the clue words, other words from the sentence, the signal word] */
  var CTX = [
    ['The <b>summit</b>, or very top of the mountain, was covered in snow.', 'summit', 'the very top of a mountain', ['the bottom of a valley', 'a path up a hill'], 'a definition', 'or very top of the mountain', 'was covered in snow', 'or'],
    ['An <b>archipelago</b>, which is a group of islands, lies off the coast of British Columbia.', 'archipelago', 'a group of islands', ['a tall mountain', 'a deep lake'], 'a definition', 'which is a group of islands', 'lies off the coast', 'which is'],
    ['Ella wore her <b>parka</b>, which is a warm coat with a hood, all winter.', 'parka', 'a warm coat with a hood', ['a kind of boot', 'a large tent'], 'a definition', 'which is a warm coat with a hood', 'all winter', 'which is'],
    ['The <b>larva</b>, or young insect, hatched from a tiny egg.', 'larva', 'a young insect', ['a kind of flower', 'a grown-up insect'], 'a definition', 'or young insect', 'hatched from a tiny egg', 'or'],
    ['Bears <b>hibernate</b>, which means they sleep through the winter.', 'hibernate', 'sleep through the winter', ['hunt for fish', 'swim across lakes'], 'a definition', 'which means they sleep through the winter', 'Bears', 'which means'],
    ['Long ago, a <b>glacier</b>, that is, a huge river of ice, covered this valley.', 'glacier', 'a huge river of ice', ['a deep hole in the ground', 'a warm spring'], 'a definition', 'that is, a huge river of ice', 'covered this valley', 'that is'],
    ['The <b>cartographer</b>, or mapmaker, drew every river and lake.', 'cartographer', 'a person who makes maps', ['a person who builds boats', 'a person who sells cars'], 'a definition', 'or mapmaker', 'drew every river and lake', 'or'],
    ['Kai felt <b>anxious</b>, which means worried, before the test.', 'anxious', 'worried', ['sleepy', 'proud'], 'a definition', 'which means worried', 'before the test', 'which means'],
    ['The <b>migration</b>, that is, the long trip geese make each fall, starts in September.', 'migration', 'a long trip animals make each season', ['a nest high in a tree', 'a flock of birds'], 'a definition', 'that is, the long trip geese make each fall', 'starts in September', 'that is'],
    ['We ate <b>bannock</b>, which is a simple bread, at the powwow.', 'bannock', 'a simple bread', ['a kind of soup', 'a kind of drum'], 'a definition', 'which is a simple bread', 'at the powwow', 'which is'],
    ['Wetlands are home to many <b>amphibians</b>, such as frogs and salamanders.', 'amphibians', 'animals like frogs that live on land and in water', ['large birds', 'kinds of fish'], 'examples', 'such as frogs and salamanders', 'Wetlands are home', 'such as'],
    ['Some foods are <b>nutritious</b>, like apples, beans and whole grains.', 'nutritious', 'good for your body', ['very sweet', 'hard to find'], 'examples', 'like apples, beans and whole grains', 'Some foods', 'like'],
    ['We saw many <b>rodents</b>, including squirrels, chipmunks and beavers.', 'rodents', 'small animals with strong front teeth', ['birds that hunt', 'insects'], 'examples', 'including squirrels, chipmunks and beavers', 'We saw many', 'including'],
    ['The camp kitchen had many <b>utensils</b>, such as forks, spoons and ladles.', 'utensils', 'tools for eating or cooking', ['kinds of food', 'games to play'], 'examples', 'such as forks, spoons and ladles', 'The camp kitchen had many', 'such as'],
    ['Canada has ten <b>provinces</b>, including Ontario, Quebec and Manitoba.', 'provinces', 'large parts of a country with their own government', ['big cities', 'long rivers'], 'examples', 'including Ontario, Quebec and Manitoba', 'Canada has ten', 'including'],
    ['Some animals are <b>nocturnal</b>, for example owls, bats and raccoons.', 'nocturnal', 'awake at night', ['awake in the day', 'living in water'], 'examples', 'for example owls, bats and raccoons', 'Some animals are', 'for example'],
    ['We packed the <b>perishables</b>, like milk, fish and berries, in the cooler.', 'perishables', 'foods that spoil quickly', ['foods in cans', 'dry snacks'], 'examples', 'like milk, fish and berries', 'in the cooler', 'like'],
    ['The band played <b>percussion</b> instruments, such as drums and shakers.', 'percussion', 'instruments you hit or shake', ['instruments you blow into', 'instruments with strings'], 'examples', 'such as drums and shakers', 'The band played', 'such as'],
    ['The trail had many <b>obstacles</b>, including fallen logs and deep puddles.', 'obstacles', 'things that block your way', ['places to rest', 'signs that point the way'], 'examples', 'including fallen logs and deep puddles', 'The trail had many', 'including'],
    ['Pack your <b>toiletries</b>, for example a toothbrush, soap and a comb.', 'toiletries', 'things for washing and grooming', ['warm clothes', 'books to read'], 'examples', 'for example a toothbrush, soap and a comb', 'Pack your', 'for example'],
    ['Marcus was <b>exhausted</b> after the race, but his little sister was full of energy.', 'exhausted', 'very tired', ['very happy', 'very fast'], 'a contrast', 'but his little sister was full of energy', 'after the race', 'but'],
    ['Unlike her <b>timid</b> brother, Aisha spoke up loudly in class.', 'timid', 'shy', ['loud', 'tall'], 'a contrast', 'Aisha spoke up loudly', 'in class', 'unlike'],
    ['The glass bowl is <b>fragile</b>, but the metal pot is very strong.', 'fragile', 'easy to break', ['very old', 'very heavy'], 'a contrast', 'but the metal pot is very strong', 'The glass bowl', 'but'],
    ['Liam is <b>generous</b>, unlike his cousin, who never shares.', 'generous', 'happy to share', ['very quiet', 'always late'], 'a contrast', 'unlike his cousin, who never shares', 'Liam is', 'unlike'],
    ['The puppy was lively in the morning, but by night it was <b>drowsy</b>.', 'drowsy', 'sleepy', ['hungry', 'noisy'], 'a contrast', 'The puppy was lively in the morning', 'by night', 'but'],
    ['Instead of a <b>gradual</b> slope, the trail had a sudden, steep drop.', 'gradual', 'slow and gentle', ['very rocky', 'very wet'], 'a contrast', 'a sudden, steep drop', 'the trail had', 'instead of'],
    ['The lake was calm in the morning; however, by noon it was <b>turbulent</b>.', 'turbulent', 'rough and choppy', ['frozen', 'very clear'], 'a contrast', 'The lake was calm in the morning', 'by noon', 'however'],
    ['Mei is usually <b>punctual</b>, but today she arrived an hour late.', 'punctual', 'on time', ['cheerful', 'in a hurry'], 'a contrast', 'but today she arrived an hour late', 'Mei is usually', 'but'],
    ['Unlike the <b>arid</b> desert in the south, the northern forest gets rain all year.', 'arid', 'very dry', ['very hot', 'very large'], 'a contrast', 'the northern forest gets rain all year', 'in the south', 'unlike'],
    ['The old path was <b>hazardous</b>; however, the new one is perfectly safe.', 'hazardous', 'dangerous', ['very long', 'very pretty'], 'a contrast', 'the new one is perfectly safe', 'The old path was', 'however']];

  /* words from weakest to strongest */
  var SHADES = [['warm', 'hot', 'scorching'], ['cool', 'cold', 'freezing'], ['glad', 'happy', 'thrilled'], ['whisper', 'talk', 'shout'], ['walk', 'jog', 'sprint'],
    ['nibble', 'eat', 'devour'], ['damp', 'wet', 'soaked'], ['dislike', 'hate', 'despise'], ['sip', 'drink', 'gulp'], ['small', 'tiny', 'microscopic'],
    ['upset', 'angry', 'furious'], ['nervous', 'scared', 'terrified'], ['good', 'great', 'fantastic'], ['drizzle', 'rain', 'downpour'], ['breeze', 'wind', 'gale']];
  /* a sentence where one word of a set fits best: [the word, the sentence] */
  var FIT = [['scorching', 'It was 38 degrees in the shade. The sidewalk was _.'], ['warm', 'The sun came out, so the spring air felt _.'], ['freezing', 'It was minus 30, and the wind was _.'],
    ['cool', 'The fall evening was _, so I wore a light sweater.'], ['whisper', 'The baby is asleep, so please _.'], ['shout', 'The coach had to _ across the windy field.'],
    ['sprint', 'With ten seconds left, Owen had to _ to the finish line.'], ['nibble', 'The mouse began to _ a tiny corner of the cheese.'], ['devour', 'After the long hike, we could _ a whole pizza.'],
    ['damp', 'The towel was a little _ from the morning dew.'], ['soaked', 'We fell in the lake and were _ from head to toe.'], ['thrilled', 'Zara won first prize and was _.'],
    ['microscopic', 'You need a microscope to see these _ cells.'], ['gulp', 'Leila was so thirsty that she had to _ the whole bottle in seconds.'], ['furious', 'He was _ when someone broke his new bike on purpose.'],
    ['terrified', 'Hana was _ when the bear walked right past her tent.'], ['downpour', 'The sky opened, and the _ flooded the street in minutes.'], ['drizzle', 'There was only a light _, so we kept playing.'],
    ['gale', 'The _ blew the roof off the shed.'], ['breeze', 'A soft _ moved the curtains.']];
  function setOf(w) { return SHADES.filter(function (s) { return s.indexOf(w) >= 0; })[0]; }

  /* [word, a sentence for meaning 1, meaning 1, a sentence for meaning 2, meaning 2] */
  var MULTI = [['bank', 'We sat on the <b>bank</b> of the river to fish.', 'the land beside a river', 'Mom put her pay in the <b>bank</b>.', 'a place that keeps money'],
    ['current', 'The <b>current</b> pulled the canoe downstream.', 'moving water', 'Read the <b>current</b> news on the school website.', 'happening now'],
    ['scale', 'Put the flour on the <b>scale</b> to weigh it.', 'a tool for weighing', 'Each <b>scale</b> on the trout shone silver.', 'a thin plate on a fish' + RQ + 's skin'],
    ['pitch', 'Ravi will <b>pitch</b> the tent near the lake.', 'set up', 'Jun will <b>pitch</b> the ball to the batter.', 'throw a ball'],
    ['table', 'Look at the <b>table</b> of data in your science book.', 'facts set out in rows and columns', 'Set the plates on the <b>table</b> for dinner.', 'furniture you eat at'],
    ['bark', 'The birch tree' + RQ + 's white <b>bark</b> peels off in strips.', 'the outer covering of a tree', 'Our dog will <b>bark</b> at the mail carrier.', 'the sound a dog makes'],
    ['light', 'My backpack is <b>light</b> today.', 'not heavy', 'The <b>light</b> from the lamp filled the room.', 'brightness that helps you see'],
    ['ruler', 'The <b>ruler</b> of the kingdom gave a speech.', 'a leader', 'Draw a straight line with a <b>ruler</b>.', 'a tool for measuring'],
    ['bat', 'A <b>bat</b> flew out of the cave at dusk.', 'a flying animal', 'Tala swung the <b>bat</b> and hit the ball.', 'a stick for hitting a ball'],
    ['ring', 'Grandma wears a gold <b>ring</b> on her finger.', 'jewellery for a finger', 'I heard the phone <b>ring</b> twice.', 'make a bell sound'],
    ['press', 'The <b>press</b> asked the mayor about the new arena.', 'news reporters', '<b>Press</b> the button to start the game.', 'push down'],
    ['fair', 'The coach made a <b>fair</b> rule for everyone.', 'the same for everyone', 'We rode the Ferris wheel at the fall <b>fair</b>.', 'an outdoor show with rides and games'],
    ['wave', 'A huge <b>wave</b> crashed on the beach.', 'a moving ridge of water', 'Lucas gave a <b>wave</b> from the bus window.', 'a hello made with your hand'],
    ['trunk', 'The elephant lifted its <b>trunk</b> to drink.', 'an elephant' + RQ + 's long nose', 'We packed the bags in the car' + RQ + 's <b>trunk</b>.', 'the storage space in a car']];
  /* one use of a word: [word, sentence, meaning here, the other meaning] */
  var USES = [];
  MULTI.forEach(function (m) { USES.push([m[0], m[1], m[2], m[4]], [m[0], m[3], m[4], m[2]]); });

  /* [word, subject, meaning, a sentence with a gap for it] */
  var SUBJ = [['perimeter', 'Math', 'the distance around a shape', 'Add the four sides to find the _ of the square.'], ['fraction', 'Math', 'a part of a whole', 'One half is a _.'],
    ['angle', 'Math', 'the space between two lines that meet', 'A right _ looks like the corner of a page.'], ['area', 'Math', 'the space a flat shape covers', 'Count the squares to find the _ of the rug.'],
    ['habitat', 'Science', 'the place where an animal lives', 'A wetland is the perfect _ for a frog.'], ['erosion', 'Science', 'land worn away by water or wind', 'Waves cause _ of the cliffs.'],
    ['evaporation', 'Science', 'water turning into a gas', 'The puddle dried up because of _.'], ['force', 'Science', 'a push or a pull', 'A magnet uses a _ to pull the nail.'],
    ['treaty', 'Social Studies', 'a formal agreement between nations', 'The nations signed a _ to share the land.'], ['government', 'Social Studies', 'the people who lead and make laws', 'The _ voted on a new law.'],
    ['citizen', 'Social Studies', 'a member of a country', 'A Canadian _ can vote at 18.'], ['election', 'Social Studies', 'a time when people vote for leaders', 'In the _, people chose a new mayor.'],
    ['tempo', 'Music', 'how fast music is played', 'The song has a slow _.'], ['rhythm', 'Music', 'a pattern of beats', 'Clap the _ of the drum song.'],
    ['canvas', 'Art', 'a cloth that artists paint on', 'The artist stretched a new _ on the frame.'], ['sketch', 'Art', 'a quick, rough drawing', 'Do a pencil _ before you paint.']];
  var SUBJECTS = ['Math', 'Science', 'Social Studies', 'Music', 'Art'];

  /* ---------- clues in the sentence ---------- */
  function ctxOf(kind) { return R.pick(CTX.filter(function (c) { return c[4] === kind; })); }
  function clueMark(c) { return W.sent(c[0].replace(c[5], '<mark class="hl">' + c[5] + '</mark>')); }
  function context(lv, kind) {
    var c = ctxOf(kind);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Find the words that help: <b>' + c[5] + '</b>.',
      hint: 'Look at the words around it.', explain: clueMark(c), steps: ['The signal: <b>' + c[7] + '</b>.', 'The clue: ' + c[5] + '.', '<b>' + c[1] + '</b> means ' + c[2] + '.'], meta: { k: 'g5-context', word: c[1] } });
  }
  function clueWords(lv, kind) {
    var c = ctxOf(kind);
    return Q.tiles('Which words help you work out <b>' + c[1] + '</b>?', c[5], [c[6]], { fig: W.sent(c[0]), prompt: 'Find the signal word: <b>' + SIGNALS[kind].join('</b>, <b>') + '</b>.',
      hint: 'Which words tell what it means, give examples, or show the opposite?', explain: clueMark(c), meta: { k: 'g5-clue-words', word: c[1] } });
  }
  function signal(lv, kind) {
    var c = ctxOf(kind), plain = W.sent(c[0]).replace(/<[^>]*>/g, ' ').toLowerCase();
    var wrong = R.some(Object.keys(SIGNALS).filter(function (k) { return k !== kind; }).reduce(function (a, k) { return a.concat(SIGNALS[k]); }, [])
      .filter(function (s) { return !new RegExp('\\b' + s + '\\b').test(plain); }), lv > 1 ? 3 : 2);
    return Q.tiles('Which signal word points to the clue for <b>' + c[1] + '</b>?', c[7], wrong, { fig: W.sent(c[0]), prompt: 'Which of these words is in the sentence?',
      hint: 'Find it in the sentence. The clue comes right after it.', explain: W.means(ICON[kind], '<b>' + c[7] + '</b>: ' + kind), meta: { k: 'g5-clue-signal', word: c[1] } });
  }
  function clueKind(lv, kind) {
    var c = ctxOf(kind);
    return Q.tiles('What kind of clue helps with <b>' + c[1] + '</b>?', c[4], CLUES.filter(function (x) { return x !== c[4]; }), { fig: W.sent(c[0]),
      hint: '"Or" or "which is": a definition. "Such as" or "like": examples. "But" or "unlike": a contrast.', explain: W.means(ICON[kind], '<b>' + c[7] + '</b>: ' + kind), meta: { k: 'g5-clue-kind', word: c[1] } });
  }
  function contextTf(lv, kind) {
    var c = ctxOf(kind), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' says:', fig: W.sent(c[0]) + W.sent('Here, <b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence agrees.', 'The clue in the sentence says something else.'], answer: right ? 0 : 1 },
      hint: 'Use the clue in the sentence.', explain: clueMark(c), meta: { k: 'g5-context-tf', word: c[1], said: said } };
  }
  function clueSkill(kind) {
    return [[1, 'clue-words', function (lv) { return clueWords(lv, kind); }], [1, 'signal', function (lv) { return signal(lv, kind); }],
      [2, 'true-false', function (lv) { return contextTf(lv, kind); }], [2, 'clue-kind', function (lv) { return clueKind(lv, kind); }]];
  }
  function clueQs(kind) {
    return {
      guided: [function () { return context(1, kind); }, function () { return signal(1, kind); }, function () { return clueWords(1, kind); }],
      check: [function () { return context(2, kind); }, function () { return clueWords(2, kind); }, function () { return contextTf(2, kind); }, function () { return clueKind(2, kind); }, function () { return context(3, kind); }]
    };
  }

  /* ---------- shades of meaning ---------- */
  function shades(lv) {
    var s = R.pick(SHADES);
    return { q: 'Put these words in order, from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: s.slice(), first: 'Weakest', last: 'Strongest',
      hint: 'Which one is a little? Which one is a lot?', explain: W.chain(s), meta: { k: 'g5-shades' } };
  }
  function strongest(lv) {
    var s = R.pick(SHADES), weak = R.int(0, 1) === 1;
    return Q.tiles('Which word is the <b>' + (weak ? 'weakest' : 'strongest') + '</b>?', weak ? s[0] : s[2], weak ? s.slice(1) : s.slice(0, 2), {
      prompt: 'Picture each word. Which is ' + (weak ? 'the least' : 'the most') + '?', hint: 'Picture each word. Which is ' + (weak ? 'the least' : 'the most') + '?', explain: W.chain(s), meta: { k: 'g5-strongest', set: s[1], weak: weak } });
  }
  function fitWord(lv) {
    var f = R.pick(FIT), s = setOf(f[0]);
    return Q.tiles('Which word fits best?', f[0], s.filter(function (w) { return w !== f[0]; }), { fig: W.sent(f[1].replace('_', W.gap())), prompt: 'How strong does the word need to be?',
      hint: 'Read the clues in the sentence. A little, some, or a lot?', explain: W.sent(f[1].replace('_', '<b>' + f[0] + '</b>')), meta: { k: 'g5-shade-fit', s: f[1] } });
  }
  function shadeTf(lv) {
    var s = R.pick(SHADES), i = R.int(0, 1), right = R.int(0, 1) === 1, a = right ? s[i + 1] : s[i], b = right ? s[i] : s[i + 1];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + a + '</b> is stronger than <b>' + b + '</b>.'), type: 'tf', answer: right,
      hint: 'Picture both words. Which is more?', explain: W.chain(s), meta: { k: 'g5-shade-tf', a: a, b: b } };
  }

  /* ---------- one word, more than one meaning ---------- */
  function multi(lv) {
    var u = R.pick(USES);
    return Q.one('What does <b>' + u[0] + '</b> mean here?', u[2], [u[3]].concat(lv > 1 ? [R.pick(USES.filter(function (x) { return x[0] !== u[0]; }))[2]] : []), { fig: W.sent(u[1]),
      prompt: 'Try each meaning in the sentence. Which makes sense?', hint: 'The words around it decide the meaning.', explain: 'Here, <b>' + u[0] + '</b> means <b>' + u[2] + '</b>.', meta: { k: 'g5-multi', s: u[1] } });
  }
  function multiTf(lv) {
    var u = R.pick(USES), right = R.int(0, 1) === 1, said = right ? u[2] : u[3];
    return { q: Q.name() + ' says:', fig: W.sent(u[1]) + W.sent('Here, <b>' + u[0] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That meaning makes sense in the sentence.', 'The word has its other meaning here.'], answer: right ? 0 : 1 },
      hint: 'Try the meaning in the sentence.', explain: 'Here, <b>' + u[0] + '</b> means <b>' + u[2] + '</b>.', meta: { k: 'g5-multi-tf', s: u[1], said: said } };
  }
  function whichUse(lv) {
    var m = R.pick(MULTI), first = R.int(0, 1) === 1;
    return Q.one('In which sentence does <b>' + m[0] + '</b> mean <b>' + (first ? m[2] : m[4]) + '</b>?', first ? m[1] : m[3], [first ? m[3] : m[1]], {
      prompt: 'Put the meaning in place of the word. Does it make sense?', hint: 'Swap in the meaning. Does the sentence still make sense?', explain: W.sent(first ? m[1] : m[3]), meta: { k: 'g5-multi-which', word: m[0], mean: first ? m[2] : m[4] } });
  }
  function matchUses(lv) {
    var m = R.pick(MULTI);
    return { q: 'Match each sentence to what <b>' + m[0] + '</b> means in it.', type: 'match', pairs: [[m[1], m[2]], [m[3], m[4]]], hint: 'Try each meaning in each sentence.', explain: 'The same word, two meanings.', meta: { k: 'g5-multi-match' } };
  }

  /* ---------- subject words ---------- */
  function subjectFor(lv) {
    var s = R.pick(SUBJ);
    return Q.tiles('In which subject would you most likely read the word <b>' + s[0] + '</b>?', s[1], R.some(SUBJECTS.filter(function (x) { return x !== s[1]; }), lv > 1 ? 3 : 2), {
      prompt: 'What does it mean? ' + s[2] + '.', hint: 'What does it mean? ' + s[2] + '.', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g5-subject-word', word: s[0] } });
  }
  function matchSubject(lv) {
    var list = R.some(SUBJ, lv > 1 ? 4 : 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: list.map(function (s) { return [s[0], s[2]]; }), hint: 'Think of the subject each word comes from.', explain: 'Every subject has its own words.', meta: { k: 'g5-subject-match' } };
  }
  function subjectGap(lv) {
    var s = R.pick(SUBJ), wrong = R.some(SUBJ.filter(function (x) { return x !== s && (lv > 1 ? x[1] === s[1] : true); }), 2).map(function (x) { return x[0]; });
    return Q.tiles('Which word fits the gap?', s[0], wrong, { fig: W.sent(s[3].replace('_', W.gap())), prompt: 'Which subject is this sentence from?',
      hint: 'Which word means ' + s[2] + '?', explain: W.sent(s[3].replace('_', '<b>' + s[0] + '</b>')), meta: { k: 'g5-subject-gap', word: s[0] } });
  }
  function subjectMeaning(lv) {
    var s = R.pick(SUBJ);
    return Q.one('In ' + s[1] + ', what does <b>' + s[0] + '</b> mean?', s[2], R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      fig: W.sent(s[3].replace('_', '<b>' + s[0] + '</b>')), hint: 'Read the sentence. What would fit?', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g5-subject-mean', word: s[0] } });
  }

  Atlas.register('vocabulary', {
    full: true,
    lessons: [{
      id: 'clues', title: 'Clues in the sentence', sub: 'The words around a new word help you understand it.',
      concepts: [
        Object.assign({ slug: 'definition', title: 'The sentence can explain the word', exp: ['B2.2'], skill: 'definition',
          model: [
            step(W.sent('Ella wore her <b>parka</b>, which is a warm coat with a hood, all winter.'), 'A new word.'),
            step(W.sent('her <b>parka</b>, <mark class="hl">which is</mark> a warm coat'), '<b>which is</b>: the meaning comes next.'),
            step(W.means('read', '<b>parka</b> = a warm coat with a hood')),
            step(W.sent('The <b>larva</b>, <mark class="hl">or</mark> young insect, hatched.'), 'Second example. The signal: <b>or</b>.'),
            step(W.means('read', '<b>larva</b> = a young insect'), 'Look for <b>or</b>, <b>which is</b>, <b>which means</b>, <b>that is</b>.')
          ],
          coach: '<p>When reading together, stop at a new word and ask: "Does the sentence tell us what it means?" Point to the commas.</p>',
          mistake: '<p>Skipping the word or guessing from its first letters. Read the whole sentence first.</p>' }, clueQs('a definition')),
        Object.assign({ slug: 'examples', title: 'Examples are clues', exp: ['B2.2'], skill: 'examples',
          model: [
            step(W.sent('many <b>amphibians</b>, <mark class="hl">such as</mark> frogs and salamanders'), '<b>such as</b>: examples follow.'),
            step(W.web('<b>amphibians</b>', ['frogs', 'salamanders']), 'What do the examples share? They live on land and in water.'),
            step(W.sent('Some animals are <b>nocturnal</b>, <mark class="hl">for example</mark> owls, bats and raccoons.'), 'Second example.'),
            step(W.web('<b>nocturnal</b>', ['owls', 'bats', 'raccoons']), 'All awake at night.')
          ],
          coach: '<p>Ask: "What do all the examples have in common?" That shared thing is usually the meaning.</p>',
          mistake: '<p>Thinking the word means only one example (rodents means squirrels). It names the whole group.</p>' }, clueQs('examples')),
        Object.assign({ slug: 'contrast', title: 'A contrast shows the opposite', exp: ['B2.2'], skill: 'contrast',
          model: [
            step(W.sent('Marcus was <b>exhausted</b>, <mark class="hl">but</mark> his sister was full of energy.'), '<b>but</b> signals the opposite.'),
            step(W.sent('full of energy &harr; <b>exhausted</b>'), 'The other side of full of energy: very tired.'),
            step(W.sent('<mark class="hl">Unlike</mark> her <b>timid</b> brother, Aisha spoke up loudly.'), 'Second example: <b>unlike</b>.'),
            step(W.sent('spoke up loudly &harr; <b>timid</b>'), 'So timid means shy.')
          ],
          coach: '<p>Collect contrast signal words on a card: but, unlike, however, instead of.</p>',
          mistake: '<p>Taking the meaning from the other half of the sentence. With a contrast, the word means the opposite of the clue.</p>' }, clueQs('a contrast'))
      ]
    }, {
      id: 'choose', title: 'Choosing the right word', sub: 'Shades of meaning, more than one meaning, and subject words.',
      concepts: [
        { slug: 'shades', title: 'Shades of meaning', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.chain(['warm']), 'A little heat.'),
            step(W.chain(['warm', 'hot', 'scorching']), 'More, then the most.'),
            step(W.sent('It was 38 degrees. The sidewalk was <b>scorching</b>.'), 'Pick the one that fits exactly.'),
            step(W.chain(['drizzle', 'rain', 'downpour']), 'Second example: from a little rain to a lot.'),
            step(W.sent('There was only a light <b>drizzle</b>, so we kept playing.'), 'Only a light one: the weakest word.')
          ],
          guided: [function () { return shades(1); }, function () { return strongest(1); }, function () { return fitWord(1); }],
          check: [function () { return shades(2); }, function () { return strongest(2); }, function () { return fitWord(2); }, function () { return shadeTf(2); }, function () { return fitWord(3); }],
          coach: '<p>Line up paint chips from light to dark and write a word on each: cool, cold, chilly, freezing. Talk about where each goes.</p>',
          mistake: '<p>Using the strongest word every time. "Scorching" for a sunny spring day is too much.</p>' },
        { slug: 'multi', title: 'One word, more than one meaning', exp: ['B2.2'], skill: 'multi',
          model: [
            step(W.sent('We sat on the <b>bank</b> of the river.'), 'A place for money? No.'),
            step(W.means('think', '<b>bank</b> = the land beside a river'), 'The river tells me.'),
            step(W.sent('Our dog will <b>bark</b> at the mail carrier.'), 'Second example.'),
            step(W.means('talk', '<b>bark</b> = the sound a dog makes'), 'Not the covering of a tree: the dog tells me.')
          ],
          guided: [function () { return multi(1); }, function () { return whichUse(1); }, function () { return multiTf(1); }],
          check: [function () { return multi(2); }, function () { return whichUse(2); }, function () { return multiTf(2); }, function () { return matchUses(2); }, function () { return multi(3); }],
          coach: '<p>Draw both meanings of a word side by side (a baseball pitch and a pitched tent). Then make up a sentence for each.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Try each meaning in the sentence.</p>' },
        { slug: 'subject', title: 'Every subject has its own words', exp: ['B2.2'], skill: 'subject',
          model: [
            step(W.tile('perimeter'), 'Math: the distance around a shape.'),
            step(W.sent('Add the four sides to find the <b>perimeter</b>.'), 'Used in a math sentence.'),
            step(W.tile('habitat'), 'Science: the place where an animal lives.'),
            step(W.sent('A wetland is the perfect <b>habitat</b> for a frog.'), 'Used in a science sentence.')
          ],
          guided: [function () { return subjectFor(1); }, function () { return subjectGap(1); }, function () { return matchSubject(1); }],
          check: [function () { return subjectFor(2); }, function () { return subjectGap(2); }, function () { return subjectMeaning(2); }, function () { return matchSubject(2); }, function () { return subjectGap(3); }],
          coach: '<p>Keep a "word wall" for each subject at home: three new words a week, with a picture and a sentence.</p>',
          mistake: '<p>Learning a word only for a test. Use it in talk at home that week.</p>' }
      ]
    }],
    practice: [
      { id: 'definition', name: 'A definition in the sentence', code: 'B2.2', gen: function (lv) { return context(lv, 'a definition'); } },
      { id: 'examples', name: 'Examples as clues', code: 'B2.2', gen: function (lv) { return context(lv, 'examples'); } },
      { id: 'contrast', name: 'A contrast as a clue', code: 'B2.2', gen: function (lv) { return context(lv, 'a contrast'); } },
      { id: 'shades', name: 'Shades of meaning', code: 'B2.2', gen: shades },
      { id: 'multi', name: 'Words with more than one meaning', code: 'B2.2', gen: multi },
      { id: 'subject', name: 'Subject words', code: 'B2.2', gen: subjectFor }
    ]
  });

  Q.shapes('vocabulary', {
    definition: clueSkill('a definition'),
    examples: clueSkill('examples'),
    contrast: clueSkill('a contrast'),
    shades: [[1, 'strongest', strongest], [1, 'fit', fitWord], [2, 'true-false', shadeTf]],
    multi: [[1, 'which-sentence', whichUse], [2, 'true-false', multiTf], [2, 'match', matchUses]],
    subject: [[1, 'gap', subjectGap], [1, 'match', matchSubject], [2, 'meaning', subjectMeaning]]
  });
})();
