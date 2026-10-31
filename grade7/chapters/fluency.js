/* Grade 7: reading fluently.
   Ontario 2023 Language, Grade 7, B2.3 "read a variety of complex texts fluently, with accuracy and appropriate pacing, to support comprehension,
   and when reading aloud, adjust expression and intonation according to the purpose of reading".
   The computer checks knowing what to do (where phrases break, what a mark asks of the voice, which pace suits a purpose, which word to stress).
   Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade7-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’';

  /* sentences split into meaningful phrases */
  var PHRASED = [['The canoe', 'drifted slowly', 'past the old dock.'], ['After the storm,', 'the whole town', 'came out to help.'], ['My cousin from Moncton', 'plays the fiddle', 'every Saturday night.'],
    ['Under the frozen lake,', 'the fish', 'move very slowly.'], ['When the bell rang,', 'the students', 'rushed to the doors.'], ['The scientists on the ship', 'measured the ice', 'each morning.']];
  /* a phrase never ends on one of these words: they belong with the word after them */
  var JOINS = ['the', 'a', 'my', 'from', 'past', 'to', 'on', 'under', 'every', 'each', 'whole', 'old', 'frozen'];
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED);
    return Q.one('Which way reads in <b>meaningful phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Read each one quietly. Which sounds like natural speech?', hint: 'Words that go together stay in one breath, like "the old dock".', explain: W.sent(p.join(' / ')), meta: { k: 'g7-phrases' } });
  }
  function phraseBreak() {
    var p = R.pick(PHRASED.filter(function (x) { var w = x.join(' ').split(' '); return w.every(function (a, i) { return w.indexOf(a) === i; }); }));
    var words = p.join(' ').split(' '), first = p[0].split(' ').length - 1;
    return { q: 'Tap the word at the end of the <b>first phrase</b>.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: first,
      hint: 'Who or what is it about? Where does that part end?', explain: W.sent(p.join(' / ')), meta: { k: 'g7-phrase-break', s: p.join(' ') } };
  }

  /* what each mark asks of your voice */
  var MARKS = [[',', 'a short pause'], ['?', 'your voice rises'], ['—', 'a sudden break'], ['…', 'trail off, or pause'], ['!', 'strong feeling'], [';', 'a pause, then a linked idea']];
  /* sentences that use one mark in the middle or at the end */
  var MARKED = [['I opened the door—and froze.', '—'], ['We waited… and waited… and waited.', '…'], ['Are you sure the ice is safe?', '?'], ['The power went out; we lit candles.', ';'], ['Look out for that branch!', '!'], ['After dinner, we walked to the lake.', ',']];
  function markVoice(lv) {
    var m = R.pick(MARKED), mean = MARKS.filter(function (x) { return x[0] === m[1]; })[0][1], i = m[0].indexOf(m[1]);
    return Q.one('What should your voice do at the marked spot?', mean, R.some(MARKS.filter(function (x) { return x[0] !== m[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(W.hl(m[0], i, i + m[1].length)), hint: 'Each mark is an instruction to your voice.', explain: '<b>' + m[1] + '</b>: ' + mean + '.', meta: { k: 'g7-mark-voice', mark: m[1] } });
  }
  function markMatch() {
    var ms = R.some(MARKS, 3);
    return { q: 'Match each mark to what your voice does.', type: 'match', pairs: ms.map(function (m) { return [m[0], m[1]]; }), hint: 'Read a sentence with each mark aloud.', explain: 'Marks tell your voice what to do.', meta: { k: 'g7-mark-match' } };
  }

  /* [what you are reading, the pace that suits it] */
  var PACES = ['slowly and carefully', 'faster, with energy', 'at a steady, clear pace'];
  var PACE = [['the steps of a science experiment', 0], ['a page of new facts and numbers', 0], ['a hard paragraph you need to study', 0], ['a tense chase scene in a novel', 1],
    ['a funny poem to make friends laugh', 1], ['the morning announcements to the school', 2], ['a speech to the school council', 2]];
  function pace(lv) {
    var p = R.pick(PACE);
    return Q.tiles('How should you read <b>' + p[0] + '</b>?', PACES[p[1]], PACES.filter(function (x, i) { return i !== p[1]; }).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Why are you reading it? Who is listening?', hint: 'New facts and steps: slow down. Action: speed up. An audience: steady and clear.', explain: PACES[p[1]] + '.', meta: { k: 'g7-pace', what: p[0] } });
  }
  function paceTf() {
    var right = R.int(0, 1) === 1, said = right ? 'Good readers slow down when the text gets hard.' : 'Good readers read everything at the same speed.';
    return { q: Q.name() + ' says:', fig: W.sent(said), type: 'tf', answer: right, why: { options: ['Pace changes with the text and the purpose.', 'Fast reading is always best.'], answer: 0 },
      hint: 'Do you read a recipe the same way as an action story?', explain: 'Fluent readers change their pace to understand.', meta: { k: 'g7-pace-tf', said: said } };
  }

  /* [the sentence's words, what you want to say, the word to stress] */
  var STRESS = [
    [['I', 'didn' + AP + 't', 'take', 'your', 'bike.'], [['Someone else took it.', 0], ['I only borrowed it.', 2], ['I took someone else' + AP + 's bike.', 3], ['I took your skateboard.', 4]]],
    [['She', 'said', 'the', 'test', 'is', 'today.'], [['Not him. She said it.', 0], ['Not tomorrow. Today.', 5], ['Not the quiz. The test.', 3]]],
    [['We', 'need', 'three', 'more', 'paddles.'], [['Not two. Three.', 2], ['We do not just want them. We need them.', 1], ['Not life jackets. Paddles.', 4]]]
  ];
  function stress(lv) {
    var s = R.pick(STRESS), c = R.pick(s[1]);
    return { q: 'You mean: <b>' + c[0] + '</b> Which word do you stress?', fig: W.sent(s[0].join(' ')), type: 'tap', tiles: s[0], answer: c[1], prompt: 'Say the sentence aloud, leaning on each word in turn.',
      hint: 'Stress the word that carries the difference.', explain: W.sent(s[0].map(function (w, i) { return i === c[1] ? '<b>' + w.toUpperCase() + '</b>' : w; }).join(' ')), meta: { k: 'g7-stress', mean: c[0] } };
  }
  function stressMeaning(lv) {
    var s = R.pick(STRESS), c = R.pick(s[1]), wrong = s[1].filter(function (x) { return x !== c; }).map(function (x) { return x[0]; });
    return Q.one('Someone reads it like this. What do they mean?', c[0], wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(s[0].map(function (w, i) { return i === c[1] ? '<b>' + w.toUpperCase() + '</b>' : w; }).join(' ')),
      hint: 'The loud word is the one that is different.', explain: c[0], meta: { k: 'g7-stress-meaning', word: s[0][c[1]], mean: c[0] } });
  }

  Atlas.register('fluency', {
    lessons: [{
      id: 'phrasing', title: 'Phrasing', sub: 'Group words the way you would say them.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful chunks', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent('The canoe drifted slowly past the old dock.')),
            step(W.sent('The canoe / drifted slowly / past the old dock.'), 'Who? What did it do? Where?'),
            step(W.sent('The canoe drifted slowly past the / old dock.'), 'A break after "the" sounds choppy.')
          ],
          guided: [function () { return phrases(1); }, phraseBreak],
          check: [function () { return phrases(2); }, phraseBreak],
          coach: '<p>Copy a paragraph and have the child draw light slashes between phrases before reading it aloud.</p>',
          mistake: '<p>Reading word by word, or racing without pauses. Both hide the meaning.</p>' },
        { slug: 'marks', title: 'Punctuation guides your voice', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent(W.hl('I opened the door—and froze.', 17, 18)), 'A dash: a sudden break.'),
            step(W.sent(W.hl('We waited… and waited.', 9, 10)), 'An ellipsis: trail off.'),
            step(W.sent(W.hl('The power went out; we lit candles.', 18, 19)), 'A semicolon: pause, then a linked idea.')
          ],
          guided: [function () { return markVoice(1); }, markMatch],
          check: [function () { return markVoice(2); }, markMatch],
          coach: '<p>Read a sentence twice, once ignoring the marks and once obeying them. Ask which one was easier to understand.</p>',
          mistake: '<p>Treating every mark as a full stop. A comma is a short pause; a dash is a sudden break.</p>' }
      ]
    }, {
      id: 'expression', title: 'Pace and expression', sub: 'Your voice carries the meaning.',
      concepts: [
        { slug: 'pace', title: 'Match your pace to the purpose', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.means('read', 'science steps'), 'Slow and careful.'),
            step(W.means('star', 'a chase scene'), 'Faster, with energy.'),
            step(W.means('people', 'announcements'), 'Steady and clear.')
          ],
          guided: [function () { return pace(1); }, paceTf],
          check: [function () { return pace(2); }, function () { return pace(2); }],
          coach: '<p>Time a minute of reading a novel and a minute of a textbook. Talk about why the second is slower, and why that is good.</p>',
          mistake: '<p>Thinking fast means good. Speed only helps if understanding keeps up.</p>' },
        { slug: 'stress', title: 'Stress a word to change the meaning', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent('<b>I</b> didn' + AP + 't take your bike.'), 'Someone else did.'),
            step(W.sent('I didn' + AP + 't take <b>your</b> bike.'), 'I took a different one.'),
            step(W.sent('I didn' + AP + 't take your <b>bike</b>.'), 'I took something else.')
          ],
          guided: [function () { return stress(1); }, function () { return stressMeaning(1); }],
          check: [function () { return stress(2); }, function () { return stressMeaning(2); }],
          coach: '<p>Say one sentence five ways, stressing a different word each time, and have the child explain each meaning.</p>',
          mistake: '<p>A flat voice when reading dialogue aloud. Ask: "How would this character really say it?"</p>' }
      ]
    }],
    practice: [
      { id: 'phrasing', name: 'Phrasing and punctuation', code: 'B2.3', gen: phrases },
      { id: 'expression', name: 'Pace and expression', code: 'B2.3', gen: pace }
    ],
    tasks: [
      { id: 'read-ice', title: 'Read aloud: Roads Made of Ice', code: 'B2.3', pic: W.icon('read'), text: T.show(T.iceRoad), say: 'Read it aloud, like a news reporter.',
        run: ['Let the child read it silently once first.', 'Then they read it aloud. Note any words they miss or change.', 'Ask: "Did your voice slow down for the facts? Where did you pause?"'],
        rubric: ['Word by word, with many errors.', 'Some phrasing; several errors or a rushed pace.', 'Mostly accurate, in phrases, at a steady pace.', 'Accurate and expressive, pace and pauses suit the facts.'],
        coach: '<p>For a fluency check, count the words read correctly in one minute. Record it and try again in a few weeks.</p>' },
      { id: 'read-tryout', title: 'Read it three times: The Tryout', code: 'B2.3', pic: W.icon('again'), text: T.show(T.tryout), say: 'Read it three times. Make the coach sound like a real coach.',
        run: ['The child reads the story aloud three times in a row.', 'After each read, give one short tip (a pause, a word to stress, the coach' + AP + 's voice).', 'On the last read, listen for expression that fits the feelings.'],
        rubric: ['Little change across the readings.', 'Smoother, but flat expression.', 'Smooth, with expression in the dialogue.', 'Expression clearly shows the narrator' + AP + 's feelings and the coach' + AP + 's voice.'] }
    ]
  });

  Q.shapes('fluency', {
    phrasing: [[1, 'phrase-break', phraseBreak], [1, 'mark-voice', markVoice], [2, 'match', markMatch]],
    expression: [[1, 'stress', stress], [1, 'stress-meaning', stressMeaning], [2, 'true-false', paceTf]]
  });
})();
