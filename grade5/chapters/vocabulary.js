/* Grade 5: word meanings. Context clues (a definition, examples, a contrast), shades of meaning, words with more than one meaning,
   and the words of other subjects.
   Ontario 2023 Language, Grade 5, B2.2 "demonstrate an understanding of a variety of words, acquire and use explicitly taught vocabulary
   in various contexts, including other subject areas, and use generalized morphological knowledge to analyze and understand new words in context".
   All sentences are written for this site. Answer checks: tests/verify/grade5-vocabulary.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var CLUES = ['a definition', 'examples', 'a contrast'];

  /* [sentence, the new word, its meaning, two wrong meanings, kind of clue, the clue words, other words from the sentence] */
  var CTX = [
    ['The <b>parka</b>, a warm coat with a hood, kept Ella dry in the storm.', 'parka', 'a warm coat with a hood', ['a kind of boot', 'a large tent'], 'a definition', 'a warm coat with a hood', 'kept Ella dry'],
    ['An <b>archipelago</b>, which is a group of islands, lies off the coast of British Columbia.', 'archipelago', 'a group of islands', ['a tall mountain', 'a deep lake'], 'a definition', 'a group of islands', 'off the coast'],
    ['The <b>summit</b>, or very top of the mountain, was covered in snow.', 'summit', 'the very top of a mountain', ['the bottom of a valley', 'a path up a hill'], 'a definition', 'very top of the mountain', 'covered in snow'],
    ['Wetlands are home to many <b>amphibians</b>, such as frogs and salamanders.', 'amphibians', 'animals like frogs that live on land and in water', ['large birds', 'kinds of fish'], 'examples', 'such as frogs and salamanders', 'Wetlands are home'],
    ['Some foods are <b>nutritious</b>, like apples, beans and whole grains.', 'nutritious', 'good for your body', ['very sweet', 'hard to find'], 'examples', 'like apples, beans and whole grains', 'Some foods'],
    ['We saw many <b>rodents</b>, including squirrels, chipmunks and beavers.', 'rodents', 'small animals with strong front teeth', ['birds that hunt', 'insects'], 'examples', 'including squirrels, chipmunks and beavers', 'We saw many'],
    ['Marcus was <b>exhausted</b> after the race, but his little sister was full of energy.', 'exhausted', 'very tired', ['very happy', 'very fast'], 'a contrast', 'but his little sister was full of energy', 'after the race'],
    ['Unlike her <b>timid</b> brother, Aisha spoke up loudly in class.', 'timid', 'shy', ['loud', 'tall'], 'a contrast', 'Aisha spoke up loudly', 'in class'],
    ['The old bridge was <b>fragile</b>, not strong like the new one.', 'fragile', 'easy to break', ['very old', 'very long'], 'a contrast', 'not strong like the new one', 'The old bridge']];
  /* words from weakest to strongest */
  var SHADES = [['warm', 'hot', 'scorching'], ['cool', 'cold', 'freezing'], ['glad', 'happy', 'thrilled'], ['whisper', 'talk', 'shout'], ['walk', 'jog', 'sprint'],
    ['nibble', 'eat', 'devour'], ['damp', 'wet', 'soaked'], ['dislike', 'hate', 'despise']];
  /* [word, sentence, meaning here, another meaning] */
  var MULTI = [['bank', 'We sat on the <b>bank</b> of the river to fish.', 'the land beside a river', 'a place that keeps money'],
    ['current', 'The <b>current</b> pulled the canoe downstream.', 'moving water', 'happening now'],
    ['scale', 'Put the flour on the <b>scale</b> to weigh it.', 'a tool for weighing', 'a thin plate on a fish' + '’' + 's skin'],
    ['pitch', 'Ravi will <b>pitch</b> the tent near the lake.', 'set up', 'throw a ball'],
    ['table', 'Look at the <b>table</b> of data in your science book.', 'facts set out in rows and columns', 'furniture you eat at'],
    ['bark', 'The birch tree' + '’' + 's white <b>bark</b> peels off in strips.', 'the outer covering of a tree', 'the sound a dog makes'],
    ['light', 'My backpack is <b>light</b> today.', 'not heavy', 'brightness from the sun'],
    ['ruler', 'The <b>ruler</b> of the kingdom gave a speech.', 'a leader', 'a tool for measuring']];
  /* [word, subject, meaning] */
  var SUBJ = [['perimeter', 'Math', 'the distance around a shape'], ['fraction', 'Math', 'a part of a whole'], ['habitat', 'Science', 'the place where an animal lives'],
    ['erosion', 'Science', 'land worn away by water or wind'], ['treaty', 'Social Studies', 'a formal agreement between nations'], ['government', 'Social Studies', 'the people who lead and make laws'],
    ['tempo', 'Music', 'how fast music is played'], ['canvas', 'Art', 'a cloth that artists paint on']];
  var SUBJECTS = ['Math', 'Science', 'Social Studies', 'Music', 'Art'];

  /* ---------- question makers ---------- */
  function ctxOf(type) { return R.pick(type ? CTX.filter(function (c) { return c[4] === type; }) : CTX); }
  function context(lv, type) {
    var c = ctxOf(type);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Find the words that help: <b>' + c[5] + '</b>.',
      hint: 'Look at the words around it.', explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', meta: { k: 'g5-context', word: c[1] } });
  }
  function clueWords(lv, type) {
    var c = ctxOf(type);
    return Q.tiles('Which words help you work out <b>' + c[1] + '</b>?', c[5], [c[6]], { fig: W.sent(c[0]), hint: 'Which words tell what it means, give examples, or show the opposite?',
      explain: '<mark class="hl">' + c[5] + '</mark> is the clue.', meta: { k: 'g5-clue-words', word: c[1] } });
  }
  function clueKind() {
    var c = ctxOf();
    return Q.tiles('What kind of clue helps with <b>' + c[1] + '</b>?', c[4], CLUES.filter(function (x) { return x !== c[4]; }), { fig: W.sent(c[0]),
      hint: '"Or" or "which is": a definition. "Such as" or "like": examples. "But" or "unlike": a contrast.', explain: 'It is <b>' + c[4] + '</b>.', meta: { k: 'g5-clue-kind', word: c[1] } });
  }
  function contextTf() {
    var c = ctxOf(), right = R.int(0, 1) === 1, said = right ? c[2] : c[3][0];
    return { q: 'True or false?', fig: W.sent(c[0]) + W.sent('Here, <b>' + c[1] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      hint: 'Use the clue in the sentence.', explain: '<b>' + c[1] + '</b> means <b>' + c[2] + '</b>.', meta: { k: 'g5-context-tf', word: c[1], said: said } };
  }

  function multi(lv) {
    var m = R.pick(MULTI);
    return Q.one('What does <b>' + m[0] + '</b> mean here?', m[2], [m[3]].concat(lv > 1 ? [R.pick(MULTI.filter(function (x) { return x !== m; }))[2]] : []), { fig: W.sent(m[1]),
      prompt: 'Try each meaning in the sentence. Which makes sense?', hint: 'The words around it decide the meaning.', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g5-multi', word: m[0] } });
  }
  function multiTf() {
    var m = R.pick(MULTI), right = R.int(0, 1) === 1, said = right ? m[2] : m[3];
    return { q: 'True or false?', fig: W.sent(m[1]) + W.sent('Here, <b>' + m[0] + '</b> means <b>' + said + '</b>.'), type: 'tf', answer: right,
      hint: 'Try the meaning in the sentence.', explain: 'Here, <b>' + m[0] + '</b> means <b>' + m[2] + '</b>.', meta: { k: 'g5-multi-tf', word: m[0], said: said } };
  }
  function shades() {
    var s = R.pick(SHADES);
    return { q: 'Put these words in order, from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: s.slice(), first: 'Weakest', last: 'Strongest',
      hint: 'Which one is a little? Which one is a lot?', explain: s.join(', ') + '.', meta: { k: 'g5-shades' } };
  }
  function strongest(lv) {
    var s = R.pick(SHADES), most = lv > 1 && R.int(0, 1) === 1;
    return Q.tiles('Which word is the <b>' + (most ? 'weakest' : 'strongest') + '</b>?', most ? s[0] : s[2], most ? s.slice(1) : s.slice(0, 2), {
      hint: 'Picture each word. Which is the most?', explain: s.join(' &lt; '), meta: { k: 'g5-strongest', set: s[1], weak: most } });
  }
  function subjectFor() {
    var s = R.pick(SUBJ);
    return Q.tiles('In which subject would you most likely read the word <b>' + s[0] + '</b>?', s[1], R.some(SUBJECTS.filter(function (x) { return x !== s[1]; }), 2), {
      hint: 'What does it mean? ' + s[2] + '.', explain: '<b>' + s[0] + '</b>: ' + s[2] + '.', meta: { k: 'g5-subject-word', word: s[0] } });
  }
  function matchSubject() {
    var list = R.some(SUBJ, 3);
    return { q: 'Match each word to its meaning.', type: 'match', pairs: list.map(function (s) { return [s[0], s[2]]; }), hint: 'Think of the subject each word comes from.', explain: 'Every subject has its own words.', meta: { k: 'g5-subject-match' } };
  }

  Atlas.register('vocabulary', {
    lessons: [{
      id: 'clues', title: 'Clues in the sentence', sub: 'The words around a new word help you understand it.',
      concepts: [
        { slug: 'definition', title: 'The sentence can explain the word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('The <b>parka</b>, <mark class="hl">a warm coat with a hood</mark>, kept Ella dry.'), 'The meaning sits right after it.'),
            step(W.sent('The <b>summit</b>, <mark class="hl">or very top</mark>, was snowy.'), 'Look for <b>or</b>, <b>which is</b>, or commas.')
          ],
          guided: [function () { return context(1, 'a definition'); }, function () { return clueWords(1, 'a definition'); }],
          check: [function () { return context(2, 'a definition'); }, function () { return clueWords(1, 'a definition'); }],
          coach: '<p>When reading together, stop at a new word and ask: "Does the sentence tell us what it means?" Point to the commas.</p>',
          mistake: '<p>Skipping the word or guessing from its first letters. Read the whole sentence first.</p>' },
        { slug: 'examples', title: 'Examples are clues', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('many <b>amphibians</b>, <mark class="hl">such as frogs and salamanders</mark>'), '<b>such as</b>: examples follow.'),
            step(W.sent('Frogs and salamanders live on land and in water.'), 'What do the examples share?'),
            step(W.tile('amphibians') + ' = animals like frogs')
          ],
          guided: [function () { return context(1, 'examples'); }, function () { return clueWords(1, 'examples'); }],
          check: [function () { return context(2, 'examples'); }, clueKind],
          coach: '<p>Ask: "What do all the examples have in common?" That shared thing is usually the meaning.</p>',
          mistake: '<p>Thinking the word means only one example (rodents means squirrels). It names the whole group.</p>' },
        { slug: 'contrast', title: 'A contrast shows the opposite', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('Marcus was <b>exhausted</b>, <mark class="hl">but</mark> his sister was full of energy.'), '<b>but</b> signals the opposite.'),
            step(W.sent('full of energy &harr; <b>exhausted</b>'), 'The opposite of full of energy: very tired.'),
            step(W.sent('<mark class="hl">Unlike</mark> her <b>timid</b> brother, Aisha spoke up.'), '<b>unlike</b> works the same way.')
          ],
          guided: [function () { return context(1, 'a contrast'); }, clueKind],
          check: [function () { return context(2, 'a contrast'); }, contextTf],
          coach: '<p>Collect contrast signal words on a card: but, unlike, however, instead, not.</p>',
          mistake: '<p>Taking the meaning from the other half of the sentence. With a contrast, the word means the opposite of the clue.</p>' }
      ]
    }, {
      id: 'choose', title: 'Choosing the right word', sub: 'Shades of meaning, more than one meaning, and subject words.',
      concepts: [
        { slug: 'shades', title: 'Shades of meaning', exp: ['B2.2'], skill: 'word-choice',
          model: [
            step(W.tile('warm'), 'A little heat.'),
            step(W.tile('warm') + ' ' + W.tile('hot'), 'More.'),
            step(W.tile('warm') + ' ' + W.tile('hot') + ' ' + W.tile('scorching'), 'The most. Pick the one that fits exactly.')
          ],
          guided: [shades, function () { return strongest(1); }],
          check: [shades, function () { return strongest(2); }],
          coach: '<p>Line up paint chips from light to dark and write a word on each: cool, cold, chilly, freezing. Talk about where each goes.</p>',
          mistake: '<p>Using the strongest word every time. "Scorching" for a sunny spring day is too much.</p>' },
        { slug: 'multi', title: 'One word, more than one meaning', exp: ['B2.2'], skill: 'word-choice',
          model: [
            step(W.sent('We sat on the <b>bank</b> of the river.'), 'Money? No.'),
            step(W.sent('<b>bank</b> = the land beside a river'), 'The river tells me.')
          ],
          guided: [function () { return multi(1); }, multiTf],
          check: [function () { return multi(2); }, multiTf],
          coach: '<p>Draw both meanings of a word side by side (a baseball pitch and a pitched tent). Then make up a sentence for each.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Try each meaning in the sentence.</p>' },
        { slug: 'subject', title: 'Every subject has its own words', exp: ['B2.2'], skill: 'word-choice',
          model: [
            step(W.tile('perimeter'), 'Math: the distance around a shape.'),
            step(W.tile('habitat'), 'Science: where an animal lives.'),
            step(W.tile('treaty'), 'Social Studies: a formal agreement between nations.')
          ],
          guided: [subjectFor, matchSubject],
          check: [subjectFor, matchSubject],
          coach: '<p>Keep a "word wall" for each subject at home: three new words a week, with a picture and a sentence.</p>',
          mistake: '<p>Learning a word only for a test. Use it in talk at home that week.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Clues in the sentence', code: 'B2.2', gen: function (lv) { return context(lv); } },
      { id: 'word-choice', name: 'Choosing the right word', code: 'B2.2', gen: multi }
    ]
  });

  Q.shapes('vocabulary', {
    context: [[1, 'clue-words', function (lv) { return clueWords(lv); }], [1, 'clue-kind', clueKind], [2, 'true-false', contextTf]],
    'word-choice': [[1, 'shades', shades], [1, 'strongest', strongest], [1, 'subject', subjectFor], [2, 'match', matchSubject], [2, 'true-false', multiTf]]
  });
})();
