/* Grade 8: reading fluently.
   Ontario 2023 Language, Grade 8:
   B2.3 "read a variety of complex texts fluently, with accuracy and appropriate pacing, to support comprehension, and when reading
   aloud, adjust expression and intonation according to the purpose of reading"
   The computer checks the knowing-what-to-do parts (where phrases break, what a mark asks of the voice, which word to stress,
   where to slow down, which voice fits the purpose). Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade8-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’';

  /* long sentences in good phrases: read each part in one breath */
  var PHRASED = [['When the storm finally passed,', 'the whole town', 'came out to help.'], ['My cousin,', 'who lives in Iqaluit,', 'sent us a photo', 'of the northern lights.'],
    ['Although the trail was steep,', 'we reached the lookout', 'before sunset.'], ['The students', 'in the back row', 'could not hear the speaker.'],
    ['After weeks of planning,', 'the science fair', 'opened on Monday.'], ['Because the ice was thin,', 'the rangers', 'closed the lake to skaters.']];
  /* a phrase never ends on one of these: they belong with the words after them */
  var JOINS = ['the', 'a', 'an', 'my', 'to', 'in', 'of', 'who', 'before', 'whole', 'back', 'science'];
  /* what each mark asks of your voice, with sentences that use it */
  var MARKS = {
    ';': ['a medium pause, then go on', ['The bus was late; we walked to school.', 'The river was high; the bridge was closed.']],
    '—': ['a sudden break', ['I opened the door — and froze.', 'We had one job — and we forgot it.']],
    '…': ['trail off', ['I thought I heard something…', 'Maybe next year…']],
    '(': ['a lower, quicker voice for the extra detail', ['The lake (the deepest in the park) is very cold.', 'Our coach (a former Olympian) watched closely.']],
    ':': ['a pause that leads into what comes next', ['She had one goal: to finish the race.', 'Bring three things: water, a hat and a map.']]
  };
  /* [sentence, [the word to stress, what you mean], ...] */
  var STRESS = [
    ['Maya didn' + AP + 't borrow my bike.', [['Maya', 'Someone else borrowed it.'], ['my', 'She borrowed someone else' + AP + 's bike.'], ['bike', 'She borrowed something else of mine.']]],
    ['Theo said the test is on Friday.', [['Theo', 'Theo said it, not someone else.'], ['test', 'The test is on Friday, not the project.'], ['Friday', 'It is on Friday, not another day.']]],
    ['We need two volunteers for Saturday.', [['two', 'We need two, not one or three.'], ['volunteers', 'We need volunteers, not paid staff.'], ['Saturday', 'We need them on Saturday, not Sunday.']]]];
  /* sentences to slow down for (numbers, new terms, steps) and sentences that read at an easy pace */
  var DENSE = ['The town grew from 14 500 people to 23 750 people in ten years.', 'Photosynthesis turns light energy into chemical energy.', 'Step 3: Connect the red wire to the negative terminal.',
    'The treaty was signed in 1850 by 14 leaders.', 'Mitochondria release energy stored in glucose.'];
  var EASY = ['Kai grabbed his skates and ran to the rink.', 'The dog barked at the mail carrier.', 'We ate lunch by the lake.', 'Priya laughed at the joke.', 'The bell rang, and everyone left.'];
  /* [what you are reading, a short example, how to read it] */
  var PURPOSE = [['a news report', 'City council voted 7 to 2 on Tuesday to add new bike lanes.', 'clear and steady, like an announcer'],
    ['a persuasive speech', 'We can do better. We must do better. Vote yes on Friday!', 'confident, with strong stress on key words'],
    ['a suspenseful story', 'The footsteps stopped. Someone was standing right outside the tent.', 'slower and quieter at the tense moments'],
    ['a poem', 'Lift the canoe. Carry the weight. / Step over roots. Step over stone.', 'with a pause at each line break and a steady rhythm'],
    ['instructions', '1. Preheat the oven. 2. Grease the pan. 3. Pour in the batter.', 'clear, with a pause between steps']];

  /* ---------- question makers ---------- */
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED);
    return Q.one('Which way reads in <b>meaningful phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Read each one aloud. Which one keeps ideas together?', hint: 'Never break between little words like "the" or "of" and the words they belong to.', explain: W.sent(p.join(' / ')), meta: { k: 'g8-phrases' } });
  }
  function firstBreak() {
    var p = R.pick(PHRASED.filter(function (x) { var w = x.join(' ').toLowerCase().split(' '); return /,$/.test(x[0]) && w.every(function (y, i) { return w.indexOf(y) === i; }); })), words = p.join(' ').split(' '), at = p[0].split(' ').length - 1;
    return { q: 'Where is the first natural pause? Tap the word just before it.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: at,
      hint: 'Look for the end of the first idea, often marked by a comma.', explain: W.sent(p.join(' / ')), meta: { k: 'g8-first-break' } };
  }
  function mark(lv, m0) {
    var m = m0 || R.pick(Object.keys(MARKS)), s = R.pick(MARKS[m][1]);
    return Q.tiles('What does your voice do at the <b>' + (m === '(' ? '( )' : m) + '</b>?', MARKS[m][0], R.some(Object.keys(MARKS).filter(function (x) { return x !== m; }), lv > 1 ? 3 : 2).map(function (x) { return MARKS[x][0]; }), {
      fig: W.sent(s), prompt: 'Read it aloud both ways. Which sounds right?', hint: '; medium pause. — sudden break. … trail off. ( ) lower voice. : leads in.', explain: MARKS[m][0], meta: { k: 'g8-mark', s: s } });
  }
  function matchMarks() {
    var ms = R.some(Object.keys(MARKS), 3);
    return { q: 'Match each mark to what your voice does.', type: 'match', pairs: ms.map(function (m) { return [m === '(' ? '( )' : m, MARKS[m][0]]; }), hint: 'Picture a sentence with each mark.', explain: 'Punctuation is a map for your voice.', meta: { k: 'g8-match-marks' } };
  }

  function stress(lv) {
    var s = R.pick(STRESS), x = R.pick(s[1]), words = s[0].replace(/[.]$/, '').split(' ');
    return { q: 'You mean: <b>' + x[1] + '</b> Which word do you stress?', fig: W.sent(s[0]), type: 'tap', tiles: words, answer: words.indexOf(x[0]),
      prompt: 'Which word is being compared with something else?', hint: 'Stress the word that the meaning is about.', explain: W.sent(s[0].replace(x[0], '<b>' + x[0].toUpperCase() + '</b>')), meta: { k: 'g8-stress', s: s[0], mean: x[1] } };
  }
  function stressMeaning() {
    var s = R.pick(STRESS), x = R.pick(s[1]);
    return Q.one('Which meaning does the stress give?', x[1], s[1].filter(function (y) { return y !== x; }).map(function (y) { return y[1]; }), {
      fig: W.sent(s[0].replace(x[0], '<b>' + x[0].toUpperCase() + '</b>')), hint: 'The stressed word is the one being contrasted.', explain: x[1], meta: { k: 'g8-stress-meaning', s: s[0], word: x[0] } });
  }
  function slowDown(lv) {
    return Q.one('Which sentence should you read <b>more slowly</b>?', R.pick(DENSE), R.some(EASY, lv > 1 ? 3 : 2), { prompt: 'Which one is packed with numbers, new terms or steps?',
      hint: 'Slow down where the information is dense.', explain: 'Numbers, new terms and steps need a slower pace so you understand them.', meta: { k: 'g8-slow' } });
  }
  function purpose(lv) {
    var p = R.pick(PURPOSE);
    return Q.one('How should you read this aloud?', p[2], R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      fig: W.sent(p[1]), prompt: 'What kind of text is it? Why would someone listen to it?', hint: 'This is ' + p[0] + '.', explain: p[0].charAt(0).toUpperCase() + p[0].slice(1) + ': ' + p[2] + '.', meta: { k: 'g8-purpose-voice', s: p[1] } });
  }
  function matchPurpose() {
    var ps = R.some(PURPOSE, 3);
    return { q: 'Match each kind of text to how you read it aloud.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[2]]; }), hint: 'Think about why someone is listening.', explain: 'Your voice should suit the purpose.', meta: { k: 'g8-match-purpose' } };
  }

  Atlas.register('fluency', {
    lessons: [{
      id: 'phrasing', title: 'Phrasing and punctuation', sub: 'Group words into ideas. Let marks guide your voice.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful phrases', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent(PHRASED[1].join(' ')), 'A long sentence.'),
            step(W.sent(PHRASED[1].join(' / ')), 'Each slash: one idea, one breath.'),
            step(W.sent('My cousin, who / lives in Iqaluit'), 'Never break after a small joining word.')
          ],
          guided: [function () { return phrases(1); }, firstBreak],
          check: [function () { return phrases(2); }, firstBreak],
          coach: '<p>Photocopy a page and let the child mark the phrase breaks with a pencil slash before reading aloud.</p>',
          mistake: '<p>Word-by-word reading of long sentences, which loses the meaning. Model one phrase at a time and have the child echo it.</p>' },
        { slug: 'marks', title: 'Each mark asks something of your voice', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent(MARKS[';'][1][0]), 'Semicolon: a medium pause.'),
            step(W.sent(MARKS['—'][1][0]), 'Dash: a sudden break.'),
            step(W.sent(MARKS['…'][1][0]), 'Ellipsis: let your voice trail off.'),
            step(W.sent(MARKS['('][1][0]), 'Brackets: a lower, quicker aside.')
          ],
          guided: [function () { return mark(1); }, function () { return mark(1); }],
          check: [function () { return mark(2); }, matchMarks],
          coach: '<p>Read the same sentence ignoring the marks, then obeying them. Ask which one made more sense.</p>',
          mistake: '<p>Treating every mark like a full stop. A semicolon pauses less; brackets are quicker, not slower.</p>' }
      ]
    }, {
      id: 'expression', title: 'Expression and pace', sub: 'Stress, speed and voice that fit the text.',
      concepts: [
        { slug: 'stress', title: 'Stress changes the meaning', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent('<b>MAYA</b> didn' + AP + 't borrow my bike.'), 'Someone else did.'),
            step(W.sent('Maya didn' + AP + 't borrow <b>MY</b> bike.'), 'She borrowed another person' + AP + 's.'),
            step(W.sent('Maya didn' + AP + 't borrow my <b>BIKE</b>.'), 'She borrowed something else.')
          ],
          guided: [function () { return stress(1); }, stressMeaning],
          check: [function () { return stress(2); }, stressMeaning],
          coach: '<p>Play with one sentence: the child says it with the stress on a different word each time, and you say what it means.</p>',
          mistake: '<p>Stressing every word, or none. Choose the one word the meaning depends on.</p>' },
        { slug: 'pace', title: 'Slow down for dense information', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent(EASY[0]), 'A story sentence: an easy pace.'),
            step(W.sent(DENSE[0]), 'Numbers: slow down.'),
            step(W.sent(DENSE[1]), 'A new term: slower again.')
          ],
          guided: [function () { return slowDown(1); }, function () { return slowDown(1); }],
          check: [function () { return slowDown(2); }, function () { return slowDown(2); }],
          coach: '<p>Fluent does not mean fast. Praise the child for slowing down in science and math texts.</p>',
          mistake: '<p>Racing through numbers and new terms to sound fluent, then not understanding them.</p>' },
        { slug: 'purpose', title: 'Match your voice to the purpose', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent(PURPOSE[0][1]), 'News: clear and steady.'),
            step(W.sent(PURPOSE[1][1]), 'A speech: confident, strong stress.'),
            step(W.sent(PURPOSE[2][1]), 'Suspense: slower and quieter.')
          ],
          guided: [function () { return purpose(1); }, matchPurpose],
          check: [function () { return purpose(2); }, matchPurpose],
          coach: '<p>Listen to a short news clip, a speech and an audiobook. Ask: "How is the voice different, and why?"</p>',
          mistake: '<p>One voice for everything. Before reading aloud, ask: "Who is listening, and why?"</p>' }
      ]
    }],
    practice: [
      { id: 'phrasing', name: 'Phrasing and punctuation', code: 'B2.3', gen: phrases },
      { id: 'expression', name: 'Stress, pace and purpose', code: 'B2.3', gen: stress }
    ],
    tasks: [
      { id: 'read-aloud', title: 'Read a passage aloud', code: 'B2.3', pic: W.icon('read'), say: 'Read this aloud to your grown-up. Read it once silently first.', text: T.show(T.ferry),
        run: ['Let the child read the passage silently first.', 'Then listen to them read it aloud. Note any words they miss or change, and whether the pace suits the story.', 'Ask one question about the passage to check it made sense.'],
        rubric: ['Many errors; word by word; meaning is lost.', 'Some errors and pauses; meaning mostly kept.', 'Accurate, in phrases, at a suitable pace.', 'Accurate and smooth, with expression that brings out the meaning.'] },
      { id: 'two-ways', title: 'One text, two purposes', code: 'B2.3', pic: W.icon('talk'), say: 'Read the same paragraph as a news reporter, then as a storyteller.', text: T.show(T.river),
        run: ['First, the child reads the passage as if reporting it on the news: clear and steady.', 'Then they read it as a storyteller building suspense: slower, quieter at the end.', 'Talk about what they changed: speed, volume, pauses, stress.'],
        rubric: ['Both readings sound the same.', 'Some change, with prompting.', 'Clear changes in pace and expression that suit each purpose.', 'Confident, deliberate changes, and can explain each choice.'] },
      { id: 'record', title: 'Record and reflect', code: 'B2.3', pic: W.icon('listen'), say: 'Record yourself reading a poem or a speech. Listen back. Set one goal.', write: true,
        run: ['Help the child choose a short poem or speech and record it on a phone.', 'Listen back together. Ask: "Where did your voice help the meaning? Where could it be clearer?"', 'The child writes one goal for next time.'],
        rubric: ['No reflection yet.', 'Notices one thing with help.', 'Names a strength and sets a clear goal.', 'Gives specific examples from the recording and a precise goal.'] }
    ]
  });

  Q.shapes('fluency', {
    phrasing: [[1, 'first-break', firstBreak], [1, 'mark', mark], [2, 'match', matchMarks]],
    expression: [[1, 'stress-meaning', stressMeaning], [1, 'slow-down', slowDown], [1, 'purpose', purpose], [2, 'match', matchPurpose]]
  });
})();
