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
    ['Her speech was <b>concise</b>, or short and clear.', 'concise', 'short and clear', ['long and confusing', 'loud and angry'], 'or short and clear', 'synonym']
  ];
  var KINDS = { definition: 'It tells you what the word means.', example: 'It gives examples.', contrast: 'It shows the opposite.', synonym: 'It gives a word that means the same.' };
  /* a new word, its parts, and what it means in the sentence */
  var PARTS = [
    ['Plastic is not <b>biodegradable</b>, so it stays in landfills for years.', [['bio', 'base'], ['degrad', 'base'], ['able', 'suffix']], 'able to break down naturally', ['able to be recycled', 'made from oil']],
    ['The <b>transcontinental</b> railway linked Canada from coast to coast.', [['trans', 'prefix'], ['continent', 'base'], ['al', 'suffix']], 'across the continent', ['under the ground', 'very old']],
    ['The whisper was <b>inaudible</b> from the back of the gym.', [['in', 'prefix'], ['aud', 'base'], ['ible', 'suffix']], 'not able to be heard', ['very loud', 'easy to see']],
    ['Zara <b>misinterpreted</b> the map and turned the wrong way.', [['mis', 'prefix'], ['interpret', 'base'], ['ed', 'suffix']], 'understood wrongly', ['drew again', 'read aloud']],
    ['The <b>subarctic</b> forest has long winters and short summers.', [['sub', 'prefix'], ['arctic', 'base']], 'just below the Arctic', ['inside a city', 'near the equator']],
    ['The <b>visibility</b> on the highway was poor because of the fog.', [['vis', 'base'], ['ibility', 'suffix']], 'how far you can see', ['how fast you can drive', 'how loud it is']]
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
    ['small', 'tiny', 'microscopic'], ['damp', 'wet', 'soaked'], ['nibble', 'eat', 'devour'], ['whisper', 'talk', 'shout'], ['dislike', 'hate', 'loathe']];
  /* [sounds positive, sounds negative]: the same idea with a different feeling */
  var CONNOTE = [['thrifty', 'cheap'], ['curious', 'nosy'], ['confident', 'arrogant'], ['determined', 'stubborn'], ['relaxed', 'lazy'], ['unique', 'weird'], ['youthful', 'childish'], ['chatty', 'mouthy']];

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
    ['sketch', 'a quick, rough drawing', 'Arts', 'Leila made a ___ before she started the painting.']
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

  Atlas.register('vocabulary', {
    lessons: [{
      id: 'context', title: 'Clues in the sentence', sub: 'The words around a new word often explain it.',
      concepts: [
        { slug: 'context', title: 'Use the sentence to work out a word', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(CTX[0][0]), 'A new word.'),
            step(W.sent('Owls are nocturnal, <mark class="hl">which means they are active at night</mark>.'), 'The clue is right there.'),
            step(W.tile('nocturnal = active at night'))
          ],
          guided: [function () { return ctxMean(1); }, clueWords],
          check: [function () { return ctxMean(2); }, clueWords],
          coach: '<p>When the child stops at a new word, ask: "What do the words around it tell you?" before giving the meaning.</p>',
          mistake: '<p>Skipping new words. Ask the child to point to the clue before they guess.</p>' },
        { slug: 'clue-kinds', title: 'Four kinds of clues', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent('<mark class="hl">which means</mark>, <mark class="hl">a scientist who</mark>'), '<b>Definition</b>: it tells you.'),
            step(W.sent('<mark class="hl">such as</mark> crabs, lobsters'), '<b>Example</b>.'),
            step(W.sent('<mark class="hl">Unlike</mark>, <mark class="hl">but</mark>'), '<b>Contrast</b>: the opposite.'),
            step(W.sent('bland, <mark class="hl">or plain</mark>'), '<b>Synonym</b>: a word like it.')
          ],
          guided: [clueKind, clueKind],
          check: [clueKind, function () { return ctxMean(2); }],
          coach: '<p>Highlight the signal words together: which means, such as, unlike, but, or.</p>',
          mistake: '<p>Reading a contrast clue as a synonym. "Unlike" and "but" point to the opposite.</p>' },
        { slug: 'parts-in-context', title: 'Word parts and the sentence together', exp: ['B2.2'], skill: 'context',
          model: [
            step(W.sent(PARTS[2][0])),
            step(W.sum(PARTS[2][1]), 'Not, hear, able.'),
            step(W.tile('inaudible = not able to be heard'), 'Check it in the sentence: from the back of the gym. It fits.')
          ],
          guided: [function () { return partsMean(1); }, function () { return partsMean(1); }],
          check: [function () { return partsMean(2); }, function () { return partsMean(2); }],
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
            step(W.tile('cool') + ' ' + W.tile('cold') + ' ' + W.tile('frigid'), 'The most.')
          ],
          guided: [shadeOrder, function () { return strongest(1); }],
          check: [shadeOrder, function () { return strongest(2); }],
          coach: '<p>Line up paint chips from light to dark, and line up words the same way.</p>',
          mistake: '<p>Using the strongest word every time. "Scorching" for a warm day sounds false.</p>' },
        { slug: 'connotation', title: 'Words carry feelings', exp: ['B2.2'], skill: 'shades',
          model: [
            step(W.tile('curious') + ' ' + W.tile('nosy'), 'Both want to know more.'),
            step(W.tile('curious'), 'Sounds positive.'),
            step(W.tile('nosy'), 'Sounds negative.')
          ],
          guided: [function () { return positive(1); }, pickPositive],
          check: [function () { return positive(2); }, pickPositive],
          coach: '<p>Ask: "Which would you rather be called?" The answer shows the feeling a word carries.</p>',
          mistake: '<p>Thinking words with the same meaning can always swap. Feelings change the message.</p>' }
      ]
    }, {
      id: 'subjects', title: 'Words for other subjects', sub: 'Science, social studies, math and the arts have their own words.',
      concepts: [
        { slug: 'subject-words', title: 'Subject words have exact meanings', exp: ['B2.2'], skill: 'subject-words',
          model: [
            step('<span class="pill">Science</span> ' + W.tile('erosion'), 'The wearing away of land by wind or water.'),
            step('<span class="pill">Math</span> ' + W.tile('perimeter'), 'The distance around a shape.'),
            step(W.sent('We measured the <b>perimeter</b> of the garden.'), 'Use it in a sentence.')
          ],
          guided: [function () { return subjMean(1); }, function () { return subjGap(1); }],
          check: [function () { return subjMean(2); }, subjWhich],
          coach: '<p>Keep a short word list for each subject. Use each new word in a spoken sentence the same day.</p>',
          mistake: '<p>Using a subject word loosely, like "perimeter" for area. Check the exact meaning.</p>' }
      ]
    }],
    practice: [
      { id: 'context', name: 'Clues in the sentence', code: 'B2.2', gen: ctxMean },
      { id: 'shades', name: 'Shades of meaning', code: 'B2.2', gen: shadeOrder },
      { id: 'subject-words', name: 'Subject words', code: 'B2.2', gen: subjMean }
    ]
  });

  Q.shapes('vocabulary', {
    context: [[1, 'clue-words', clueWords], [1, 'parts', partsMean], [2, 'clue-kind', clueKind]],
    shades: [[1, 'strongest', strongest], [1, 'positive', positive], [2, 'pick', pickPositive]],
    'subject-words': [[1, 'gap', subjGap], [1, 'subject', subjWhich], [2, 'match', subjMatch]]
  });
})();
