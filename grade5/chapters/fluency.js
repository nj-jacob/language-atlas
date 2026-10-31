/* Grade 5: reading fluently.
   Ontario 2023 Language, Grade 5, B2.3 "read a variety of texts fluently, with accuracy and appropriate pacing to support comprehension,
   and when reading aloud, adjust expression and intonation according to the purpose of reading".
   The computer checks knowing what to do (which pace fits a text, where phrases break, which voice fits a purpose).
   Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade5-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  /* texts to read slowly and carefully, and texts you can read at a quicker pace */
  var SLOW = ['the steps for a science experiment', 'a page of facts with many numbers', 'a math word problem', 'the rules of a new game', 'directions for a hike'];
  var FAST = ['a comic you have read before', 'a funny story, just for fun', 'a text message from a friend', 'a poem you know by heart', 'a list, to find one name'];
  /* sentences split into good phrases: each part is read in one breath */
  var PHRASED = [['The tall girl', 'in the red coat', 'ran to the bus.'], ['After the storm,', 'the farmers', 'checked their fields.'], ['Before dinner,', 'Grandpa and I', 'walked along the river.'],
    ['When the bell rang,', 'everyone', 'hurried outside.'], ['The bus to the museum', 'leaves', 'at nine o' + '’' + 'clock.'], ['My cousin from Iqaluit', 'sent me', 'a photo of the bay.']];
  /* [a line, the voice that fits its purpose] */
  var VOICES = ['slow and quiet, to build suspense', 'fast and excited', 'soft and slow, to show sadness', 'clear and steady, so each step is easy to follow', 'loud and clear, for a big audience'];
  var LINES = [['Slowly, the door creaked open. Something moved in the dark.', 0], ['We won! We won the championship!', 1], ['The last leaf fell, and the garden was empty and still.', 2],
    ['Step 1: Measure 250 mL of water.', 3], ['Welcome, everyone, to the Grade 5 science fair!', 4], ['A shadow crept across the wall. Then, silence.', 0], ['The puck flew past the goalie. Goal!', 1],
    ['Step 2: Stir until the salt is gone.', 3]];
  /* yes-or-no questions (the voice rises at the end) and statements (it falls) */
  var RISE = ['Is the library open today?', 'Did you bring your skates?', 'Can we leave at noon?', 'Are you coming to the powwow on Saturday?'];
  var FALL = ['The library is open today.', 'I brought my skates.', 'We can leave at noon.', 'We are going to the powwow on Saturday.'];

  function chunk(list) { return list.join(' / '); }
  /* the same words, split in the wrong places */
  function badChunk(list) {
    var words = list.join(' ').split(' '), out = [], i = 0, size = 2;
    while (i < words.length) { out.push(words.slice(i, i + size).join(' ')); i += size; size = size === 2 ? 3 : 2; }
    return out.join(' / ');
  }

  /* ---------- question makers ---------- */
  function pace(lv) {
    var slow = R.pick(SLOW), fast = R.some(FAST, lv > 1 ? 2 : 1);
    return Q.one('Which should you read <b>more slowly</b>?', slow, fast, { prompt: 'Which one has facts or steps you must not miss?',
      hint: 'Slow down for facts, numbers and steps.', explain: 'Facts, numbers and steps need a careful pace.', meta: { k: 'g5-pace', slow: slow } });
  }
  function paceSort() {
    var s = R.some(SLOW, 2), f = R.some(FAST, 2);
    return Q.all('Pick every text you should read <b>slowly and carefully</b>.', s, f, { hint: 'Would missing one word cause a problem?', explain: 'Steps, facts and numbers: slow down.', meta: { k: 'g5-pace-sort' } });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED), wrong = [badChunk(p), p.join(' ').split(' ').join(' / ')];
    return Q.one('Which shows the best way to read it in <b>phrases</b>?', chunk(p), wrong.slice(0, lv > 1 ? 2 : 1), { prompt: 'Which words belong together?',
      hint: 'Keep words that go together in one breath.', explain: W.sent(chunk(p)), meta: { k: 'g5-phrases', s: p.join(' ') } });
  }
  function voice(lv) {
    var l = R.pick(LINES), wrong = VOICES.filter(function (v, i) { return i !== l[1]; });
    return Q.one('Which voice fits this line best?', VOICES[l[1]], R.some(wrong, lv > 1 ? 3 : 2), { fig: W.sent(l[0]), prompt: 'What is the line for: to scare, to celebrate, to teach?',
      hint: 'Think about why it was written.', explain: 'Read it <b>' + VOICES[l[1]] + '</b>.', meta: { k: 'g5-voice', line: l[0] } });
  }
  function rise() {
    var up = R.int(0, 1) === 1, s = R.pick(up ? RISE : FALL);
    return { q: 'What does your voice do at the end?', fig: W.sent(s), type: 'tap', tiles: ['It goes up.', 'It goes down.'], answer: up ? 0 : 1,
      hint: 'A yes-or-no question goes up. A telling sentence goes down.', explain: up ? 'A yes-or-no question: up.' : 'A telling sentence: down.', meta: { k: 'g5-rise', s: s } };
  }
  function paceTf() {
    var slowOne = R.int(0, 1) === 1, t = R.pick(slowOne ? SLOW : FAST);
    return { q: 'True or false?', fig: W.sent('You should slow down when reading ' + t + '.'), type: 'tf', answer: slowOne,
      why: { options: ['It has facts or steps you must not miss.', 'It is easy or familiar, so a quicker pace is fine.'], answer: slowOne ? 0 : 1 },
      hint: 'Would missing a word cause a problem?', explain: slowOne ? 'Slow down: facts or steps.' : 'A quicker pace is fine.', meta: { k: 'g5-pace-tf', t: t } };
  }

  Atlas.register('fluency', {
    lessons: [{
      id: 'pace-phrase', title: 'Pace and phrasing', sub: 'Read at the right speed, in groups of words.',
      concepts: [
        { slug: 'pace', title: 'Match your pace to the text', exp: ['B2.3'], skill: 'fluency',
          model: [
            step(W.sent('Step 1: Measure 250 mL of water.'), 'Steps and numbers: slow down.'),
            step(W.sent('Ha! Biscuit ate the pancakes.'), 'A funny story you know: a quicker pace.'),
            step(W.icon('again'), 'Lost? Slow down and reread.')
          ],
          guided: [function () { return pace(1); }, paceTf],
          check: [function () { return pace(2); }, paceSort],
          coach: '<p>Show the child that good readers change speed. Read a recipe slowly aloud, then a comic quickly, and ask what changed.</p>',
          mistake: '<p>Thinking the fastest reader is the best reader. Speed only helps if you understand.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.3'], skill: 'fluency',
          model: [
            step(W.sent('The / tall / girl / in / the / red / coat'), 'Word by word sounds like a robot.'),
            step(W.sent('The tall girl / in the red coat / ran to the bus.'), 'Words that belong together, in one breath.')
          ],
          guided: [function () { return phrases(1); }, function () { return phrases(1); }],
          check: [function () { return phrases(2); }, function () { return phrases(2); }],
          coach: '<p>Copy a sentence and draw light slashes between the phrases together. Then read it, pausing only at the slashes.</p>',
          mistake: '<p>Pausing after little words like "the" or "in". They belong with the word after them.</p>' }
      ]
    }, {
      id: 'expression', title: 'Expression', sub: 'Your voice shows what the text means.',
      concepts: [
        { slug: 'purpose', title: 'Let the purpose shape your voice', exp: ['B2.3'], skill: 'fluency',
          model: [
            step(W.sent('Slowly, the door creaked open.'), 'Suspense: slow and quiet.'),
            step(W.sent('We won the championship!'), 'Joy: fast and excited.'),
            step(W.sent('Welcome, everyone, to the science fair!'), 'A big crowd: loud and clear.')
          ],
          guided: [function () { return voice(1); }, function () { return voice(1); }],
          check: [function () { return voice(2); }, function () { return voice(2); }],
          coach: '<p>Read one line three ways (scary, excited, bored) and ask the child which fits the story.</p>',
          mistake: '<p>Reading everything in the same flat voice. Ask: "How would the character say it?"</p>' },
        { slug: 'intonation', title: 'Your voice rises and falls', exp: ['B2.3'], skill: 'fluency',
          model: [
            step(W.sent('Is the library open today?'), 'Yes-or-no question: up at the end.'),
            step(W.sent('The library is open today.'), 'Telling sentence: down at the end.')
          ],
          guided: [rise, rise],
          check: [rise, rise],
          coach: '<p>Hum the sentence without words. The child can hear the voice go up or down.</p>',
          mistake: '<p>Raising the voice at the end of every sentence. A telling sentence ends low.</p>' }
      ]
    }],
    practice: [
      { id: 'fluency', name: 'Reading fluently', code: 'B2.3', gen: phrases }
    ],
    tasks: [
      { id: 'read-outage', title: 'Read aloud: When the Lights Went Out', code: 'B2.3', pic: W.icon('read'), text: T.show(T.outage), say: 'Read it aloud to your grown-up.',
        run: ['Let the child read the passage silently first.', 'Then the child reads it aloud. Note any tricky words, but do not stop the reading.', 'Talk about the two places in the story, then read it once more.'],
        rubric: ['Many words are tricky; reads word by word.', 'Most words right; some phrasing; little expression.', 'Reads accurately in phrases, at a steady pace, with some expression.', 'Smooth, accurate and expressive; changes voice for each part of the story.'],
        coach: '<p>A good pace for Grade 5 sounds like natural talking. If the child rushes, ask them to tell you what happened; understanding comes first.</p>' },
      { id: 'read-poem', title: 'Perform a poem: Storm Over the Lake', code: 'B2.3', pic: W.icon('talk'), text: T.show(T.storm), say: 'Practise the poem three times, then perform it.',
        run: ['Read the poem to the child first.', 'The child practises it three times, deciding where to be loud, soft, fast or slow.', 'The child performs it for the family.'],
        rubric: ['Still word by word after practice.', 'Reads it through with a little expression.', 'Changes pace and volume to fit the storm.', 'A real performance: the storm builds, then the silence lands.'] }
    ]
  });

  Q.shapes('fluency', {
    fluency: [[1, 'pace', pace], [1, 'voice', voice], [1, 'rise', rise], [2, 'pace-sort', paceSort], [2, 'true-false', paceTf]]
  });
})();
