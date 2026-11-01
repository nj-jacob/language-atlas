/* Grade 7: word meanings. Context clues, shades of meaning (connotation and strength), and vocabulary from other subjects.
   Ontario 2023 Language, Grade 7:
   B2.2 "demonstrate an understanding of a wide variety of words, acquire and use explicitly taught vocabulary flexibly in various contexts,
   including other subject areas, and use generalized morphological knowledge to analyze and understand new words in context"
   All sentences and word lists are written for this site. Answer checks: tests/verify/grade7-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* ---------- context clues ----------
     [sentence, word, meaning, wrong meanings, kind of clue, the clue words, other words from the sentence] */
  var CLUES = [
    ['The bear was <b>dormant</b>, or resting deeply, all winter.', 'dormant', 'resting deeply', ['very hungry', 'wide awake'], 'definition', 'or resting deeply', 'The bear was'],
    ['The scientist made a <b>hypothesis</b>, or a careful guess, before the experiment.', 'hypothesis', 'a careful guess to test', ['a final result', 'a lab coat'], 'definition', 'or a careful guess', 'before the experiment'],
    ['Many birds <b>migrate</b>, which means they fly to warmer places for the winter.', 'migrate', 'move to another place for the season', ['build nests', 'sing loudly'], 'definition', 'which means they fly to warmer places', 'Many birds'],
    ['A <b>portage</b>, which means carrying a canoe over land, joined the two lakes.', 'portage', 'carrying a canoe over land', ['a fast river', 'a wooden paddle'], 'definition', 'which means carrying a canoe over land', 'joined the two lakes'],
    ['Her scrape was <b>superficial</b>, that is, only on the surface of the skin.', 'superficial', 'only on the surface', ['very deep', 'badly swollen'], 'definition', 'that is, only on the surface', 'Her scrape was'],
    ['Owls are <b>nocturnal</b>, meaning they are active at night.', 'nocturnal', 'active at night', ['active in the day', 'unable to fly'], 'definition', 'meaning they are active at night', 'Owls are'],
    ['An <b>archipelago</b>, or a group of islands, lies off the coast of British Columbia.', 'archipelago', 'a group of islands', ['a deep ocean trench', 'a tall mountain'], 'definition', 'or a group of islands', 'off the coast'],
    ['The judge was <b>impartial</b>, which means she was fair to both sides.', 'impartial', 'fair to both sides', ['angry with everyone', 'very strict'], 'definition', 'which means she was fair to both sides', 'The judge was'],
    ['<b>Precipitation</b>, such as rain, snow and hail, fell all week.', 'Precipitation', 'water that falls from the sky', ['strong wind', 'bright sunshine'], 'example', 'such as rain, snow and hail', 'fell all week'],
    ['Omar is <b>meticulous</b>. For example, he checks every line of his code three times.', 'meticulous', 'very careful about details', ['careless', 'quick'], 'example', 'For example, he checks every line of his code three times', 'Omar is'],
    ['<b>Renewable</b> energy, including wind and solar power, can be used again and again.', 'Renewable', 'able to be replaced by nature', ['very costly', 'made in a factory'], 'example', 'including wind and solar power', 'can be used again'],
    ['<b>Amphibians</b>, such as frogs and salamanders, live both in water and on land.', 'Amphibians', 'animals that live in water and on land', ['animals with feathers', 'fish of the deep sea'], 'example', 'such as frogs and salamanders', 'live both in water'],
    ['<b>Percussion</b> instruments, including drums and xylophones, are played by striking them.', 'Percussion', 'instruments you hit to play', ['instruments you blow into', 'instruments with strings'], 'example', 'including drums and xylophones', 'are played by striking'],
    ['Lena is <b>punctual</b>. For example, she arrives at practice five minutes early every day.', 'punctual', 'on time', ['often late', 'very tired'], 'example', 'For example, she arrives at practice five minutes early', 'Lena is'],
    ['<b>Legumes</b>, such as beans, peas and lentils, are full of protein.', 'Legumes', 'plants with seeds in pods', ['root vegetables', 'kinds of grain'], 'example', 'such as beans, peas and lentils', 'are full of protein'],
    ['Unlike her <b>gregarious</b> brother, Mei was quiet at parties.', 'gregarious', 'outgoing and sociable', ['shy and quiet', 'tall'], 'contrast', 'Unlike her', 'at parties'],
    ['Her speech was <b>concise</b>, not long and rambling like the last one.', 'concise', 'short and clear', ['long and confusing', 'loud'], 'contrast', 'not long and rambling', 'Her speech was'],
    ['Ana is <b>frugal</b>, but her brother spends his whole allowance in one day.', 'frugal', 'careful with money', ['generous', 'lucky'], 'contrast', 'but her brother spends his whole allowance in one day', 'Ana is'],
    ['The desert is <b>arid</b>, not wet like the rainforest.', 'arid', 'very dry', ['very wet', 'very cold'], 'contrast', 'not wet like the rainforest', 'The desert is'],
    ['Sam was <b>reluctant</b> to jump in the cold lake, but his sister dove in right away.', 'reluctant', 'not willing', ['eager', 'proud'], 'contrast', 'but his sister dove in right away', 'to jump in the cold lake'],
    ['The first book was dull, but the sequel was <b>riveting</b>.', 'riveting', 'so interesting you cannot stop', ['boring', 'too long'], 'contrast', 'The first book was dull, but', 'the sequel was'],
    ['Unlike the <b>docile</b> horse, the pony kicked and bucked.', 'docile', 'calm and easy to handle', ['wild and hard to control', 'very fast'], 'contrast', 'Unlike the', 'the pony kicked'],
    ['The trail was <b>treacherous</b> because ice covered the steep rocks.', 'treacherous', 'dangerous', ['beautiful', 'short'], 'cause and effect', 'because ice covered the steep rocks', 'The trail was'],
    ['The village was <b>isolated</b> because no roads reached it.', 'isolated', 'far away from others', ['crowded', 'modern'], 'cause and effect', 'because no roads reached it', 'The village was'],
    ['The old ferry became <b>obsolete</b> because a new bridge replaced it.', 'obsolete', 'no longer used', ['brand new', 'very fast'], 'cause and effect', 'because a new bridge replaced it', 'The old ferry'],
    ['The pond water was <b>stagnant</b> because nothing flowed in or out.', 'stagnant', 'still and not moving', ['fresh and clean', 'fast-flowing'], 'cause and effect', 'because nothing flowed in or out', 'The pond water was'],
    ['After weeks without rain, the fields were <b>parched</b>.', 'parched', 'very dry', ['flooded', 'frozen'], 'cause and effect', 'After weeks without rain', 'the fields were'],
    ['Bears were near the campsite, so the campers stayed <b>vigilant</b> all night.', 'vigilant', 'watchful and alert', ['fast asleep', 'very hungry'], 'cause and effect', 'Bears were near the campsite, so', 'all night'],
    ['The team was <b>elated</b> because they won the championship.', 'elated', 'very happy', ['very upset', 'very tired'], 'cause and effect', 'because they won the championship', 'The team was']
  ];
  var KINDS = ['definition', 'example', 'contrast', 'cause and effect'];
  var SIGNAL = { definition: 'or, which means, that is, meaning', example: 'such as, for example, including', contrast: 'unlike, not, but', 'cause and effect': 'because, so, after' };
  function clue(kinds) { return R.pick(kinds ? CLUES.filter(function (c) { return kinds.indexOf(c[4]) >= 0; }) : CLUES); }
  function clueMeaning(lv, kinds) {
    var c = clue(kinds);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Look for a clue: ' + SIGNAL[c[4]] + '.',
      hint: 'Find the words in the sentence that help.', explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', meta: { k: 'g7-clue-meaning', word: c[1] } });
  }
  function clueWords(lv, kinds) {
    var c = clue(kinds);
    return Q.tiles('Which words are the clue to <b>' + c[1] + '</b>?', c[5], [c[6]], { fig: W.sent(c[0]), hint: 'Look for the signal words: ' + SIGNAL[c[4]] + '.',
      explain: '<mark class="hl">' + c[5] + '</mark>', meta: { k: 'g7-clue-words', word: c[1] } });
  }
  function clueKind(lv) {
    var c = clue();
    return Q.tiles('What kind of clue does this sentence give?', c[4], R.some(KINDS.filter(function (k) { return k !== c[4]; }), lv > 1 ? 3 : 2), { fig: W.sent(c[0]),
      hint: 'Look for the signal words.', explain: 'A <b>' + c[4] + '</b> clue: ' + c[5] + '.', meta: { k: 'g7-clue-kind', word: c[1] } });
  }
  function clueTf(lv, kinds) {
    var c = clue(kinds), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' says:', fig: W.sent(c[0]) + W.sent('<b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence fits that meaning.', 'The clue in the sentence points to a different meaning.'], answer: right ? 0 : 1 },
      hint: 'Put the meaning in place of the word. Does the sentence still make sense?', explain: '<b>' + c[1] + '</b> means <b>' + c[2] + '</b>.', meta: { k: 'g7-clue-tf', word: c[1], said: said } };
  }
  var DEF = ['definition'], EXC = ['example', 'contrast'], CAUSE = ['cause and effect'];
  function clueShapes(kinds) {
    return [[1, 'clue-words', function (lv) { return clueWords(lv, kinds); }], [1, 'clue-kind', clueKind], [1, 'true-false', function (lv) { return clueTf(lv, kinds); }]];
  }

  /* ---------- shades of meaning ---------- */
  /* [positive word, negative word] with about the same meaning */
  var CONN = [['thrifty', 'cheap'], ['confident', 'arrogant'], ['curious', 'nosy'], ['determined', 'stubborn'], ['slender', 'scrawny'], ['aroma', 'stench'],
    ['relaxed', 'lazy'], ['youthful', 'childish'], ['unique', 'weird'], ['cautious', 'timid'], ['assertive', 'pushy'], ['economical', 'stingy'],
    ['bold', 'reckless'], ['firm', 'harsh'], ['fragrance', 'odour']];
  var NOUNS = ['aroma', 'fragrance'];
  function connotation(lv) {
    var c = R.pick(CONN), pos = R.int(0, 1) === 1;
    return Q.tiles('Which word gives a more <b>' + (pos ? 'positive' : 'negative') + '</b> feeling?', pos ? c[0] : c[1], [pos ? c[1] : c[0]], {
      prompt: 'Would you like to be called this?', hint: 'Both mean about the same. Which one sounds ' + (pos ? 'kind' : 'unkind') + '?',
      explain: '<b>' + c[0] + '</b> is positive. <b>' + c[1] + '</b> is negative.', meta: { k: 'g7-connotation', pos: pos, words: c.join(' ') } });
  }
  function connSentence(lv) {
    var people = CONN.filter(function (x) { return NOUNS.indexOf(x[0]) < 0; }), c = R.pick(people), kind = R.int(0, 1) === 1,
      other = lv > 1 ? [R.pick(people.filter(function (x) { return x !== c; }))[kind ? 1 : 0]] : [];
    return Q.one('You are writing a <b>' + (kind ? 'kind' : 'critical') + '</b> review of a character. Which word fits best?', kind ? c[0] : c[1], [kind ? c[1] : c[0]].concat(other), {
      fig: W.sent('The main character is very ' + W.gap() + '.'), hint: 'Pick the word with a ' + (kind ? 'positive' : 'negative') + ' feeling.',
      explain: '<b>' + c[0] + '</b> says it kindly. <b>' + c[1] + '</b> says it harshly.', meta: { k: 'g7-conn-sentence', pos: kind } });
  }
  function connMatch(lv) {
    var cs = R.some(CONN, lv > 2 ? 4 : 3);
    return { q: 'Match each positive word to its negative partner.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[1]]; }), hint: 'The partners mean about the same thing.',
      explain: 'Same meaning, different feeling.', meta: { k: 'g7-conn-match' } };
  }
  function connTf() {
    var c = R.pick(CONN), right = R.int(0, 1) === 1, a = right ? c[0] : c[1], b = right ? c[1] : c[0];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + a + '</b> sounds more positive than <b>' + b + '</b>.'), type: 'tf', answer: right,
      why: { options: ['<b>' + a + '</b> sounds kinder.', '<b>' + b + '</b> sounds kinder.'], answer: right ? 0 : 1 },
      hint: 'Would you rather be called ' + a + ' or ' + b + '?', explain: '<b>' + c[0] + '</b> is positive. <b>' + c[1] + '</b> is negative.', meta: { k: 'g7-conn-tf', a: a, b: b } };
  }

  /* weakest to strongest */
  var SCALE = [['annoyed', 'angry', 'furious'], ['like', 'love', 'adore'], ['tired', 'weary', 'exhausted'], ['cool', 'cold', 'frigid'], ['big', 'huge', 'enormous'],
    ['murmur', 'speak', 'shout'], ['glad', 'happy', 'thrilled'], ['warm', 'hot', 'scorching'], ['small', 'tiny', 'microscopic'], ['nervous', 'scared', 'terrified'],
    ['walk', 'jog', 'sprint'], ['good', 'great', 'outstanding']];
  function scaleOrder() {
    var s = R.pick(SCALE);
    return { q: 'Put these words in order, from weakest to strongest.', type: 'order', items: s.slice(), first: 'Weakest', last: 'Strongest', hint: 'Which one is the mildest?',
      explain: s.join(' &rarr; '), meta: { k: 'g7-scale-order' } };
  }
  function scaleStrong() {
    var s = R.pick(SCALE);
    return Q.tiles('Which word is the <b>strongest</b>?', s[2], s.slice(0, 2), { hint: 'Picture each one. Which is the most extreme?', explain: s.join(' &rarr; '), meta: { k: 'g7-scale-strong' } });
  }
  function scaleWeak() {
    var s = R.pick(SCALE);
    return Q.tiles('Which word is the <b>mildest</b>?', s[0], s.slice(1), { hint: 'Which one is only a little?', explain: s.join(' &rarr; '), meta: { k: 'g7-scale-weak' } });
  }
  function scaleTf() {
    var s = R.pick(SCALE), two = R.some([0, 1, 2], 2), a = s[two[0]], b = s[two[1]], right = two[0] > two[1];
    return { q: Q.name() + ' says:', fig: W.sent('<b>' + a + '</b> is stronger than <b>' + b + '</b>.'), type: 'tf', answer: right,
      why: { options: ['<b>' + a + '</b> is further along the scale.', '<b>' + b + '</b> is further along the scale.'], answer: right ? 0 : 1 },
      hint: 'Put all three in order first.', explain: s.join(' &rarr; '), meta: { k: 'g7-scale-tf', a: a, b: b } };
  }

  /* ---------- words from other subjects: [word, subject, meaning] ---------- */
  var SUBJ = [['photosynthesis', 'Science', 'how plants make food from sunlight'], ['erosion', 'Science', 'land being worn away by water or wind'], ['habitat', 'Science', 'the natural home of a plant or animal'],
    ['ecosystem', 'Science', 'all the living and non-living things in an area'], ['ratio', 'Math', 'a comparison of two amounts'], ['variable', 'Math', 'a letter that stands for an unknown number'],
    ['integer', 'Math', 'a whole number or its opposite'], ['perimeter', 'Math', 'the distance around a shape'], ['equation', 'Math', 'a math sentence with an equal sign'],
    ['treaty', 'History', 'a formal agreement between nations'], ['Confederation', 'History', 'the joining of colonies to form Canada in 1867'], ['monarchy', 'History', 'a country ruled by a king or queen'],
    ['latitude', 'Geography', 'distance north or south of the equator'], ['tundra', 'Geography', 'a cold, treeless region in the far north'], ['watershed', 'Geography', 'the land that drains into one river or lake'],
    ['tempo', 'Music', 'the speed of the music'], ['rhythm', 'Music', 'the pattern of long and short sounds'], ['dynamics', 'Music', 'how loud or soft the music is']];
  var SUBJECTS = ['Science', 'Math', 'History', 'Geography', 'Music'];
  function subjectMeaning(lv) {
    var s = R.pick(SUBJ);
    return Q.one('In ' + s[1] + ', what does <b>' + s[0] + '</b> mean?', s[2], R.some(SUBJ.filter(function (x) { return x !== s; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      hint: 'Think about what you learned in ' + s[1] + '.', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g7-subject-meaning', word: s[0] } });
  }
  function whichSubject(lv) {
    var s = R.pick(SUBJ);
    return Q.tiles('In which subject would you most likely meet the word <b>' + s[0] + '</b>?', s[1], R.some(SUBJECTS.filter(function (x) { return x !== s[1]; }), lv > 1 ? 3 : 2), {
      hint: 'What is the word about?', explain: '<b>' + s[0] + '</b> (' + s[1] + '): ' + s[2] + '.', meta: { k: 'g7-which-subject', word: s[0] } });
  }
  function subjectMatch(lv) {
    var ss = R.some(SUBJ, lv > 2 ? 4 : 3);
    return { q: 'Match each subject word to its meaning.', type: 'match', pairs: ss.map(function (s) { return [s[0], s[2]]; }), hint: 'Start with the word you know best.', explain: 'Each subject has its own words.', meta: { k: 'g7-subject-match' } };
  }
  function subjectTf() {
    var s = R.pick(SUBJ), right = R.int(0, 1) === 1, said = right ? s[2] : R.pick(SUBJ.filter(function (x) { return x !== s; }))[2];
    return { q: Q.name() + ' says:', fig: W.sent('In ' + s[1] + ', <b>' + s[0] + '</b> means ' + said + '.'), type: 'tf', answer: right,
      why: { options: ['That is what the word means in ' + s[1] + '.', 'That meaning belongs to a different word.'], answer: right ? 0 : 1 },
      hint: 'Picture the word in a ' + s[1] + ' lesson.', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g7-subject-tf', word: s[0], said: said } };
  }

  /* [word, subject sentence, subject meaning, everyday meaning, everyday sentence, subject] */
  var MULTI = [
    ['current', 'The <b>current</b> flows through the copper wire.', 'a flow of electricity', 'happening now', 'Read the <b>current</b> news on the website.', 'Science'],
    ['table', 'The <b>table</b> shows the rainfall for each month.', 'a chart of rows and columns', 'a piece of furniture', 'We ate supper at the kitchen <b>table</b>.', 'Math'],
    ['cell', 'Every living thing is made of <b>cells</b>.', 'the smallest unit of life', 'a mobile phone', 'Call me on my <b>cell</b> after practice.', 'Science'],
    ['product', 'The <b>product</b> of 6 and 7 is 42.', 'the answer when you multiply', 'something made to be sold', 'The store sells a new cleaning <b>product</b>.', 'Math'],
    ['mass', 'The rock has a <b>mass</b> of 2 kg.', 'how much matter something has', 'a large crowd', 'A <b>mass</b> of people filled the square.', 'Science'],
    ['range', 'The <b>range</b> of the data is 15.', 'the difference between the highest and lowest values', 'a line of mountains', 'We hiked in a mountain <b>range</b> in Alberta.', 'Math'],
    ['bill', 'Parliament voted on the new <b>bill</b>.', 'a proposed law', 'a paper that shows what you owe', 'The server brought the <b>bill</b> after lunch.', 'History'],
    ['volume', 'Find the <b>volume</b> of the box in cubic centimetres.', 'the space something takes up', 'how loud a sound is', 'Please turn down the <b>volume</b> on the radio.', 'Math'],
    ['plot', 'The <b>plot</b> of the novel has a surprising twist.', 'the events of a story', 'a small piece of land', 'We grow beans in our garden <b>plot</b>.', 'Language'],
    ['key', 'Check the <b>key</b> to see what each colour on the map means.', 'a list that explains map symbols', 'a tool that opens a lock', 'I lost the <b>key</b> to the front door.', 'Geography'],
    ['scale', 'The map' + AP + 's <b>scale</b> shows that 1 cm equals 10 km.', 'how map distance compares to real distance', 'a machine for weighing', 'Put the apples on the <b>scale</b> to weigh them.', 'Geography'],
    ['solution', 'Salt water is a <b>solution</b>.', 'a mixture where one thing dissolves in another', 'the answer to a problem', 'We found a <b>solution</b> to the noisy hallway.', 'Science']
  ];
  function multiMeaning(lv) {
    var m = R.pick(MULTI), extra = R.pick(MULTI.filter(function (x) { return x !== m; }))[2];
    return Q.one('What does <b>' + m[0] + '</b> mean in this sentence?', m[2], [m[3]].concat(lv > 1 ? [extra] : []), { fig: W.sent(m[1]), prompt: 'Which subject is this sentence from?',
      hint: 'The word has more than one meaning. Which one fits here?', explain: 'In ' + m[5] + ', <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g7-multi', s: m[1] } });
  }
  function multiEveryday(lv) {
    var m = R.pick(MULTI), extra = R.pick(MULTI.filter(function (x) { return x !== m; }))[3];
    return Q.one('What does <b>' + m[0] + '</b> mean in this sentence?', m[3], [m[2]].concat(lv > 1 ? [extra] : []), { fig: W.sent(m[4]),
      hint: 'Is this a school subject or everyday life?', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[3] + '</b>.', meta: { k: 'g7-multi-everyday', s: m[4] } });
  }
  function multiSubject() {
    var m = R.pick(MULTI);
    return Q.one('In which sentence does <b>' + m[0] + '</b> mean <b>' + m[2] + '</b>?', m[1], [m[4]], {
      hint: 'Try the meaning in each sentence.', explain: 'In ' + m[5] + ': ' + m[1], meta: { k: 'g7-multi-subject', word: m[0] } });
  }
  function multiTf() {
    var m = R.pick(MULTI), school = R.int(0, 1) === 1, right = R.int(0, 1) === 1, s = school ? m[1] : m[4], said = right === school ? m[2] : m[3];
    return { q: Q.name() + ' says:', fig: W.sent(s) + W.sent('Here, <b>' + m[0] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      why: { options: ['That meaning fits this sentence.', 'That is the word' + AP + 's other meaning.'], answer: right ? 0 : 1 },
      hint: 'Put the meaning in place of the word.', explain: 'Here, <b>' + m[0] + '</b> means <b>' + (school ? m[2] : m[3]) + '</b>.', meta: { k: 'g7-multi-tf', said: said } };
  }

  Atlas.register('meanings', {
    full: true,
    lessons: [{
      id: 'context', title: 'Context clues', sub: 'The sentence helps you work out a new word.',
      concepts: [
        { slug: 'definition', title: 'The sentence may define the word', exp: ['B2.2'], skill: 'definition',
          model: [
            step(W.sent('The bear was <b>dormant</b>, <mark class="hl">or resting deeply</mark>, all winter.'), 'Signal words: <b>or</b>, <b>which means</b>.'),
            step(W.tile('dormant') + ' = ' + W.tile('resting deeply')),
            step(W.sent('Owls are <b>nocturnal</b>, <mark class="hl">meaning they are active at night</mark>.'), 'Another signal: <b>meaning</b>.'),
            step(W.tile('nocturnal') + ' = ' + W.tile('active at night'), 'Test it: put the meaning in place of the word.')
          ],
          guided: [function () { return clueMeaning(1, DEF); }, function () { return clueWords(1, DEF); }, function () { return clueTf(1, DEF); }],
          check: [function () { return clueMeaning(2, DEF); }, function () { return clueWords(2, DEF); }, function () { return clueTf(2, DEF); }, function () { return clueMeaning(3, DEF); }, clueKind],
          coach: '<p>Ask the child to put a finger on the clue before answering. Naming the clue is the skill.</p>',
          mistake: '<p>Skipping a hard word and reading on. Teach the habit: stop, look around the word, then decide.</p>' },
        { slug: 'example-contrast', title: 'Examples and opposites are clues', exp: ['B2.2'], skill: 'example-contrast',
          model: [
            step(W.sent('<b>Precipitation</b>, <mark class="hl">such as rain, snow and hail</mark>, fell all week.'), 'All three fall from the sky.'),
            step(W.sent('<b>Percussion</b> instruments, <mark class="hl">including drums and xylophones</mark>, are played by striking them.'), 'You hit both to play them.'),
            step(W.sent('<mark class="hl">Unlike</mark> her <b>gregarious</b> brother, Mei was <mark class="hl">quiet</mark>.'), 'Opposite of quiet: outgoing.'),
            step(W.sent('The desert is <b>arid</b>, <mark class="hl">not wet</mark> like the rainforest.'), 'Not wet: very dry.')
          ],
          guided: [function () { return clueMeaning(1, ['example']); }, function () { return clueMeaning(1, ['contrast']); }, function () { return clueWords(1, EXC); }],
          check: [function () { return clueMeaning(2, EXC); }, function () { return clueWords(2, EXC); }, clueKind, function () { return clueTf(2, EXC); }, function () { return clueMeaning(3, ['contrast']); }],
          coach: '<p>Make a small chart of signal words: such as, including, for example (examples); unlike, not, but (opposites).</p>',
          mistake: '<p>With an opposite clue, choosing the meaning of the clue itself (gregarious = quiet). Flip it.</p>' },
        { slug: 'cause', title: 'A reason can explain the word', exp: ['B2.2'], skill: 'cause',
          model: [
            step(W.sent('The trail was <b>treacherous</b> <mark class="hl">because ice covered the steep rocks</mark>.'), 'Ice on steep rocks?'),
            step(W.tile('treacherous') + ' = ' + W.tile('dangerous')),
            step(W.sent('<mark class="hl">After weeks without rain</mark>, the fields were <b>parched</b>.'), 'No rain for weeks?'),
            step(W.tile('parched') + ' = ' + W.tile('very dry'))
          ],
          guided: [function () { return clueMeaning(1, CAUSE); }, function () { return clueWords(1, CAUSE); }, function () { return clueTf(1, CAUSE); }],
          check: [function () { return clueMeaning(2, CAUSE); }, function () { return clueWords(2, CAUSE); }, function () { return clueTf(2, CAUSE); }, clueKind, function () { return clueMeaning(3, CAUSE); }],
          coach: '<p>Ask "Why?" about the sentence. The answer often explains the word.</p>',
          mistake: '<p>Guessing from how the word sounds. Always test the meaning back in the sentence.</p>' }
      ]
    }, {
      id: 'shades', title: 'Shades of meaning', sub: 'Words that mean almost the same thing.',
      concepts: [
        { slug: 'feeling', title: 'Words carry feelings', exp: ['B2.2'], skill: 'feeling',
          model: [
            step(W.tile('thrifty') + ' ' + W.tile('cheap'), 'Both mean careful with money.'),
            step(W.means('star', '<b>thrifty</b>: sounds wise') + W.means('not', '<b>cheap</b>: sounds mean')),
            step(W.tile('aroma') + ' ' + W.tile('stench'), 'Both are smells.'),
            step(W.means('star', '<b>aroma</b>: pleasant') + W.means('not', '<b>stench</b>: awful'))
          ],
          guided: [function () { return connotation(1); }, function () { return connSentence(1); }, connTf],
          check: [function () { return connotation(2); }, function () { return connSentence(2); }, connMatch, connTf, function () { return connotation(3); }],
          coach: '<p>Play "kind or unkind": say one word and have the child give the partner word with the opposite feeling.</p>',
          mistake: '<p>Thinking words with the same meaning are always interchangeable. The feeling changes the message.</p>' },
        { slug: 'strength', title: 'Some words are stronger', exp: ['B2.2'], skill: 'strength',
          model: [
            step(W.tile('annoyed'), 'A little.'),
            step(W.tile('annoyed') + ' &rarr; ' + W.tile('angry'), 'More.'),
            step(W.tile('annoyed') + ' &rarr; ' + W.tile('angry') + ' &rarr; ' + W.tile('furious'), 'The most.'),
            step(W.tile('walk') + ' &rarr; ' + W.tile('jog') + ' &rarr; ' + W.tile('sprint'), 'Speed works the same way.')
          ],
          guided: [scaleOrder, scaleStrong, scaleWeak],
          check: [scaleOrder, scaleTf, scaleStrong, scaleWeak, scaleTf],
          coach: '<p>Draw a line on paper from "a little" to "a lot", and place word cards along it.</p>',
          mistake: '<p>Using the strongest word for everything ("furious" about a small thing). Match the word to the size of the feeling.</p>' }
      ]
    }, {
      id: 'subjects', title: 'Words in other subjects', sub: 'Science, math, history and more.',
      concepts: [
        { slug: 'subject-words', title: 'Each subject has its own words', exp: ['B2.2'], skill: 'subject-words',
          model: [
            step(W.tile('erosion') + ' ' + W.tile('habitat'), 'Science.'),
            step(W.tile('ratio') + ' ' + W.tile('variable'), 'Math.'),
            step(W.tile('treaty') + ' ' + W.tile('Confederation'), 'History.'),
            step(W.tile('latitude') + ' ' + W.tile('tundra'), 'Geography.')
          ],
          guided: [function () { return subjectMeaning(1); }, function () { return whichSubject(1); }, subjectTf],
          check: [function () { return subjectMeaning(2); }, function () { return whichSubject(2); }, subjectMatch, subjectTf, function () { return subjectMeaning(3); }],
          coach: '<p>Keep a word log for each subject: the word, a short meaning, and a quick sketch.</p>',
          mistake: '<p>Learning the word but not using it. Ask the child to use each new word in a sentence about the subject.</p>' },
        { slug: 'multiple', title: 'One word can mean different things', exp: ['B2.2'], skill: 'multiple',
          model: [
            step(W.sent('We swam against the <b>current</b>.'), 'A flow of water.'),
            step(W.sent('The <b>current</b> flows through the wire.'), 'In science: a flow of electricity.'),
            step(W.sent('Read the <b>current</b> news.'), 'Happening now.'),
            step(W.sent('Check the <b>key</b> on the map.'), 'In geography: what the symbols mean.')
          ],
          guided: [function () { return multiMeaning(1); }, function () { return multiEveryday(1); }, multiSubject],
          check: [function () { return multiMeaning(2); }, function () { return multiEveryday(2); }, multiTf, multiSubject, function () { return multiMeaning(3); }],
          coach: '<p>When a familiar word looks odd in a textbook, ask: "Does this word mean something special in this subject?"</p>',
          mistake: '<p>Using the everyday meaning in a subject (a "table" in math is a chart, not furniture).</p>' }
      ]
    }],
    practice: [
      { id: 'definition', name: 'Definition clues', code: 'B2.2', gen: function (lv) { return clueMeaning(lv, DEF); } },
      { id: 'example-contrast', name: 'Example and opposite clues', code: 'B2.2', gen: function (lv) { return clueMeaning(lv, EXC); } },
      { id: 'cause', name: 'Reason clues', code: 'B2.2', gen: function (lv) { return clueMeaning(lv, CAUSE); } },
      { id: 'feeling', name: 'Positive and negative words', code: 'B2.2', gen: connotation },
      { id: 'strength', name: 'Stronger and weaker words', code: 'B2.2', gen: scaleOrder },
      { id: 'subject-words', name: 'Words in other subjects', code: 'B2.2', gen: subjectMeaning },
      { id: 'multiple', name: 'Words with more than one meaning', code: 'B2.2', gen: multiMeaning }
    ],
    tasks: [
      { id: 'word-log', title: 'My word log', code: 'B2.2', pic: W.icon('write'), say: 'Add five new words from your reading this week. Use each one in a sentence.', write: true,
        run: ['Each week, help the child pick five new words from any subject: a textbook, a novel, the news.', 'For each word, the child writes a short meaning in their own words and a new sentence.', 'Later in the week, ask the child to use two of the words when talking to you.'],
        rubric: ['Copies words but no meaning yet.', 'Meanings with help; sentences are unclear.', 'Clear meanings and correct sentences.', 'Uses the new words naturally when speaking and writing.'] }
    ]
  });

  Q.shapes('meanings', {
    definition: clueShapes(DEF),
    'example-contrast': clueShapes(EXC),
    cause: clueShapes(CAUSE),
    feeling: [[1, 'sentence', connSentence], [1, 'true-false', connTf], [2, 'match', connMatch]],
    strength: [[1, 'strongest', scaleStrong], [1, 'mildest', scaleWeak], [2, 'true-false', scaleTf]],
    'subject-words': [[1, 'which-subject', whichSubject], [1, 'true-false', subjectTf], [2, 'match', subjectMatch]],
    multiple: [[1, 'everyday', multiEveryday], [1, 'which-sentence', multiSubject], [2, 'true-false', multiTf]]
  });
})();
