/* Grade 7: reading fluently.
   Ontario 2023 Language, Grade 7, B2.3 "read a variety of complex texts fluently, with accuracy and appropriate pacing, to support comprehension,
   and when reading aloud, adjust expression and intonation according to the purpose of reading".
   The computer checks knowing what to do (where phrases break, what a mark asks of the voice, which pace suits a purpose, which word to stress).
   Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All sentences are written for this site. Answer checks: tests/verify/grade7-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts, AP = '’';

  /* ---------- phrasing: sentences split into meaningful phrases ---------- */
  var PHRASED = [['The canoe', 'drifted slowly', 'past the old dock.'], ['After the storm,', 'the whole town', 'came out to help.'], ['My cousin from Moncton', 'plays the fiddle', 'every Saturday night.'],
    ['Under the frozen lake,', 'the fish', 'move very slowly.'], ['When the bell rang,', 'the students', 'rushed to the doors.'], ['The scientists on the ship', 'measured the ice', 'each morning.'],
    ['Every spring,', 'the geese', 'fly north over Lake Ontario.'], ['The girl in the red jacket', 'scored the winning goal', 'in overtime.'], ['Before the race,', 'Arjun', 'stretched his legs.'],
    ['A family of beavers', 'built a dam', 'across the creek.'], ['On a cold January morning,', 'the school bus', 'would not start.'], ['The elder', 'told a story', 'about the first snowfall.'],
    ['Behind the cabin,', 'a narrow trail', 'led to the lake.'], ['My grandmother', 'makes bannock', 'on Sunday mornings.'], ['During the blackout,', 'our neighbours', 'shared their candles.'],
    ['The fastest runner', 'on our team', 'is my friend Kai.']];
  /* a phrase never ends on one of these words: they belong with the word after them */
  var JOINS = ['the', 'a', 'my', 'our', 'his', 'their', 'from', 'past', 'to', 'on', 'in', 'of', 'over', 'under', 'about', 'across', 'before', 'behind', 'during', 'after', 'when',
    'every', 'each', 'whole', 'old', 'frozen', 'red', 'winning', 'cold', 'first', 'narrow', 'fastest', 'school', 'would'];
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
  function phraseEnd(which) {
    return function () {
      var p = R.pick(PHRASED), words = p.join(' ').split(' '), end = words[p.slice(0, which).join(' ').split(' ').length - 1],
        once = words.filter(function (w) { return w !== end && words.indexOf(w) === words.lastIndexOf(w); }),
        tiles = [end].concat(R.some(once, 3)).sort(function (a, b) { return words.indexOf(a) - words.indexOf(b); });
      return { q: 'Which word ends the <b>' + (which === 1 ? 'first' : 'second') + ' phrase</b>?', fig: W.sent(p.join(' ')), type: 'tap', tiles: tiles, answer: tiles.indexOf(end),
        hint: which === 1 ? 'Who or what is it about? Or when, or where? Where does that part end?' : 'Find the first phrase. Where does the next group of words end?',
        explain: W.sent(p.join(' / ')), meta: { k: 'g7-phrase-break', s: p.join(' '), which: which } };
    };
  }
  function phraseTf() {
    var p = R.pick(PHRASED), right = R.int(0, 1) === 1, said = right ? p.join(' / ') : R.pick(badBreaks(p));
    return { q: Q.name() + ' marks the phrases like this. Does it read naturally?', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Words that belong together stay together.', 'A break splits words that belong together.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud, pausing at each slash.', explain: W.sent(p.join(' / ')), meta: { k: 'g7-phrase-tf' } };
  }

  /* ---------- what each mark asks of your voice ---------- */
  var MARKS = [[',', 'a short pause'], ['?', 'your voice rises'], ['—', 'a sudden break'], ['…', 'trail off, or pause'], ['!', 'strong feeling'], [';', 'a pause, then a linked idea'],
    [':', 'a pause before a list or an explanation'], ['“', 'switch to the speaker' + AP + 's voice']];
  /* sentences that use one mark that the reader must notice */
  var MARKED = [['I opened the door—and froze.', '—'], ['The ice cracked—we ran for shore.', '—'], ['It was there—then it was gone.', '—'],
    ['We waited… and waited… and waited.', '…'], ['Well… I guess so.', '…'], ['The lights flickered… then went dark.', '…'],
    ['Are you sure the ice is safe?', '?'], ['Did anyone see my mitts?', '?'], ['Who left the gate open?', '?'],
    ['The power went out; we lit candles.', ';'], ['Sara loves soccer; her brother prefers chess.', ';'],
    ['Look out for that branch!', '!'], ['We won the final!', '!'],
    ['After dinner, we walked to the lake.', ','], ['In the morning, the field was white with frost.', ','],
    ['Pack three things: a map, a flashlight and water.', ':'], ['Here is the plan: we leave at dawn.', ':'],
    ['Dad called, “Supper is ready.”', '“'], ['The coach said, “Keep your stick on the ice.”', '“']];
  function meaning(mark) { return MARKS.filter(function (x) { return x[0] === mark; })[0][1]; }
  function hlMark(s, mark) { var i = s.indexOf(mark); return W.hl(s, i, i + mark.length); }
  function markVoice(lv) {
    var m = R.pick(MARKED), mean = meaning(m[1]);
    return Q.one('What should your voice do at the marked spot?', mean, R.some(MARKS.filter(function (x) { return x[0] !== m[1]; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(hlMark(m[0], m[1])), hint: 'Each mark is an instruction to your voice.', explain: '<b>' + m[1] + '</b>: ' + mean + '.', meta: { k: 'g7-mark-voice', mark: m[1] } });
  }
  function markMatch(lv) {
    var ms = R.some(MARKS, lv > 2 ? 4 : 3);
    return { q: 'Match each mark to what your voice does.', type: 'match', pairs: ms.map(function (m) { return [m[0], m[1]]; }), hint: 'Read a sentence with each mark aloud.', explain: 'Marks tell your voice what to do.', meta: { k: 'g7-mark-match' } };
  }
  function markWhich(lv) {
    var m = R.pick(MARKS);
    return Q.tiles('Which mark tells your voice: <b>' + m[1] + '</b>?', m[0], R.some(MARKS.filter(function (x) { return x !== m; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), {
      hint: 'Picture a sentence with each mark.', explain: '<b>' + m[0] + '</b>: ' + m[1] + '.', meta: { k: 'g7-mark-which', mean: m[1] } });
  }
  function markTf() {
    var m = R.pick(MARKED), right = R.int(0, 1) === 1, said = right ? meaning(m[1]) : R.pick(MARKS.filter(function (x) { return x[0] !== m[1]; }))[1];
    return { q: Q.name() + ' says: at the marked spot, <b>' + said + '</b>.', fig: W.sent(hlMark(m[0], m[1])), type: 'tf', answer: right,
      why: { options: ['That is what this mark asks.', 'That belongs to a different mark.'], answer: right ? 0 : 1 },
      hint: 'What does this mark ask of your voice?', explain: '<b>' + m[1] + '</b>: ' + meaning(m[1]) + '.', meta: { k: 'g7-voice-tf', mark: m[1], said: said } };
  }

  /* ---------- pace: [what you are reading, the pace that suits it] ---------- */
  var PACES = ['slowly and carefully', 'faster, with energy', 'at a steady, clear pace'];
  var PACE = [['the steps of a science experiment', 0], ['a page of new facts and numbers', 0], ['a hard paragraph you need to study', 0], ['a recipe you are following', 0],
    ['the rules of a new board game', 0], ['a math word problem', 0], ['a tense chase scene in a novel', 1], ['a funny poem to make friends laugh', 1],
    ['the last seconds of a hockey game in a story', 1], ['a silly tongue twister', 1], ['the morning announcements to the school', 2], ['a speech to the school council', 2],
    ['a report to your class', 2], ['a picture book to a younger child', 2]];
  function pace(lv) {
    var p = R.pick(PACE);
    return Q.tiles('How should you read <b>' + p[0] + '</b>?', PACES[p[1]], PACES.filter(function (x, i) { return i !== p[1]; }).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Why are you reading it? Who is listening?', hint: 'New facts and steps: slow down. Action: speed up. An audience: steady and clear.', explain: PACES[p[1]] + '.', meta: { k: 'g7-pace', what: p[0] } });
  }
  function paceWhich() {
    var want = R.int(0, 2), right = R.pick(PACE.filter(function (x) { return x[1] === want; })),
      wrong = [0, 1, 2].filter(function (i) { return i !== want; }).map(function (i) { return R.pick(PACE.filter(function (x) { return x[1] === i; }))[0]; });
    return Q.tiles('Which one would you read <b>' + PACES[want] + '</b>?', right[0], wrong, { hint: 'Think about why each one is read.', explain: right[0] + ': ' + PACES[want] + '.', meta: { k: 'g7-pace-which', want: want } });
  }
  function paceMatch() {
    var ps = [0, 1, 2].map(function (i) { return R.pick(PACE.filter(function (x) { return x[1] === i; })); });
    return { q: 'Match each reading to its pace.', type: 'match', pairs: ps.map(function (p) { return [p[0], PACES[p[1]]]; }), hint: 'Steps and facts, action, or an audience?', explain: 'The purpose sets the pace.', meta: { k: 'g7-pace-match' } };
  }
  var PACE_SAYS = [['Good readers slow down when the text gets hard.', true], ['You can reread a sentence that did not make sense.', true], ['An audience needs a steady, clear voice.', true],
    ['Fast reading only helps if you still understand.', true], ['Good readers read everything at the same speed.', false], ['The fastest reader is always the best reader.', false],
    ['You should never slow down or reread.', false], ['Science steps are best read as fast as you can.', false]];
  function paceTf() {
    var s = R.pick(PACE_SAYS);
    return { q: Q.name() + ' says:', fig: W.sent(s[0]), type: 'tf', answer: s[1], why: { options: ['Pace changes with the text and the purpose.', 'One speed fits every text.'], answer: s[1] ? 0 : 1 },
      hint: 'Do you read a recipe the same way as an action story?', explain: 'Fluent readers change their pace to understand.', meta: { k: 'g7-pace-tf', said: s[0] } };
  }

  /* ---------- stress: [the sentence's words, [what you want to say, the word to stress]] ---------- */
  var STRESS = [
    [['I', 'didn' + AP + 't', 'take', 'your', 'bike.'], [['Someone else took it.', 0], ['I only borrowed it.', 2], ['I took someone else' + AP + 's bike.', 3], ['I took your skateboard.', 4]]],
    [['She', 'said', 'the', 'test', 'is', 'today.'], [['Not him. She said it.', 0], ['Not tomorrow. Today.', 5], ['Not the quiz. The test.', 3]]],
    [['We', 'need', 'three', 'more', 'paddles.'], [['Not two. Three.', 2], ['We do not just want them. We need them.', 1], ['Not life jackets. Paddles.', 4]]],
    [['Kai', 'ate', 'my', 'last', 'cookie.'], [['Not Ana. Kai did.', 0], ['Not yours. Mine.', 2], ['Not the first one. The last one.', 3], ['Not my muffin. My cookie.', 4]]],
    [['The', 'bus', 'leaves', 'at', 'seven.'], [['Not the train. The bus.', 1], ['Not eight. Seven.', 4], ['It leaves then. It does not arrive then.', 2]]],
    [['You', 'can', 'borrow', 'my', 'canoe.'], [['Not them. You.', 0], ['You may borrow it, not keep it.', 2], ['Not my kayak. My canoe.', 4]]]
  ];
  function loud(words, at) { return W.sent(words.map(function (w, i) { return i === at ? '<b>' + w.toUpperCase() + '</b>' : w; }).join(' ')); }
  function stress() {
    var s = R.pick(STRESS), c = R.pick(s[1]);
    return { q: 'You mean: <b>' + c[0] + '</b> Which word do you stress?', fig: W.sent(s[0].join(' ')), type: 'tap', tiles: s[0], answer: c[1], prompt: 'Say the sentence aloud, leaning on each word in turn.',
      hint: 'Stress the word that carries the difference.', explain: loud(s[0], c[1]), meta: { k: 'g7-stress', mean: c[0] } };
  }
  function stressMeaning(lv) {
    var s = R.pick(STRESS), c = R.pick(s[1]), wrong = s[1].filter(function (x) { return x !== c; }).map(function (x) { return x[0]; });
    return Q.one('Someone reads it like this. What do they mean?', c[0], wrong.slice(0, lv > 1 ? 2 : 1), { fig: loud(s[0], c[1]),
      hint: 'The loud word is the one that is different.', explain: c[0], meta: { k: 'g7-stress-meaning', word: s[0][c[1]], mean: c[0] } });
  }
  function stressWhich(lv) {
    var s = R.pick(STRESS), c = R.pick(s[1]), wrong = s[1].filter(function (x) { return x !== c; }).map(function (x) { return loud(s[0], x[1]); });
    return Q.one('You mean: <b>' + c[0] + '</b> Which reading says it?', loud(s[0], c[1]), R.shuffle(wrong).slice(0, lv > 1 ? 2 : 1), {
      hint: 'Which word must be loud to show the difference?', explain: loud(s[0], c[1]), meta: { k: 'g7-stress-which', mean: c[0] } });
  }
  function stressTf() {
    var s = R.pick(STRESS), c = R.pick(s[1]), right = R.int(0, 1) === 1, said = right ? c[0] : R.pick(s[1].filter(function (x) { return x !== c; }))[0];
    return { q: Q.name() + ' says this reading means: <b>' + said + '</b>', fig: loud(s[0], c[1]), type: 'tf', answer: right,
      why: { options: ['The loud word carries that meaning.', 'That meaning needs a different loud word.'], answer: right ? 0 : 1 },
      hint: 'Which word is loud? What does that change?', explain: c[0], meta: { k: 'g7-stress-tf', mean: said } };
  }

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'phrasing', title: 'Phrasing', sub: 'Group words the way you would say them.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful chunks', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent('The canoe drifted slowly past the old dock.')),
            step(W.sent('The canoe / drifted slowly / past the old dock.'), 'Who? What did it do? Where?'),
            step(W.sent('The canoe drifted slowly past the / old dock.'), 'A break after "the" sounds choppy.'),
            step(W.sent('After the storm, / the whole town / came out to help.'), 'A comma often ends a phrase.')
          ],
          guided: [function () { return phrases(1); }, phraseEnd(1), phraseTf],
          check: [function () { return phrases(2); }, phraseEnd(1), phraseTf, phraseEnd(2), function () { return phrases(3); }],
          coach: '<p>Copy a paragraph and have the child draw light slashes between phrases before reading it aloud.</p>',
          mistake: '<p>Reading word by word, or racing without pauses. Both hide the meaning.</p>' },
        { slug: 'marks', title: 'Punctuation guides your voice', exp: ['B2.3'], skill: 'marks',
          model: [
            step(W.sent(hlMark('I opened the door—and froze.', '—')), 'A dash: a sudden break.'),
            step(W.sent(hlMark('We waited… and waited.', '…')), 'An ellipsis: trail off.'),
            step(W.sent(hlMark('The power went out; we lit candles.', ';')), 'A semicolon: pause, then a linked idea.'),
            step(W.sent(hlMark('Pack three things: a map, a flashlight and water.', ':')), 'A colon: pause before the list.')
          ],
          guided: [function () { return markVoice(1); }, function () { return markWhich(1); }, markTf],
          check: [function () { return markVoice(2); }, markMatch, markTf, function () { return markWhich(2); }, function () { return markVoice(3); }],
          coach: '<p>Read a sentence twice, once ignoring the marks and once obeying them. Ask which one was easier to understand.</p>',
          mistake: '<p>Treating every mark as a full stop. A comma is a short pause; a dash is a sudden break.</p>' }
      ]
    }, {
      id: 'expression', title: 'Pace and expression', sub: 'Your voice carries the meaning.',
      concepts: [
        { slug: 'pace', title: 'Match your pace to the purpose', exp: ['B2.3'], skill: 'pace',
          model: [
            step(W.means('read', 'science steps'), 'Slow and careful.'),
            step(W.means('star', 'a chase scene'), 'Faster, with energy.'),
            step(W.means('people', 'announcements'), 'Steady and clear.'),
            step(W.means('think', 'a hard paragraph'), 'Slow down, or reread.')
          ],
          guided: [function () { return pace(1); }, paceWhich, paceTf],
          check: [function () { return pace(2); }, paceMatch, paceTf, paceWhich, function () { return pace(3); }],
          coach: '<p>Time a minute of reading a novel and a minute of a textbook. Talk about why the second is slower, and why that is good.</p>',
          mistake: '<p>Thinking fast means good. Speed only helps if understanding keeps up.</p>' },
        { slug: 'stress', title: 'Stress a word to change the meaning', exp: ['B2.3'], skill: 'stress',
          model: [
            step(W.sent('<b>I</b> didn' + AP + 't take your bike.'), 'Someone else did.'),
            step(W.sent('I didn' + AP + 't take <b>your</b> bike.'), 'I took a different one.'),
            step(W.sent('I didn' + AP + 't take your <b>bike</b>.'), 'I took something else.'),
            step(W.sent('We need <b>three</b> more paddles.'), 'Not two.')
          ],
          guided: [stress, function () { return stressMeaning(1); }, stressTf],
          check: [stress, function () { return stressMeaning(2); }, function () { return stressWhich(2); }, stressTf, function () { return stressMeaning(3); }],
          coach: '<p>Say one sentence five ways, stressing a different word each time, and have the child explain each meaning.</p>',
          mistake: '<p>A flat voice when reading dialogue aloud. Ask: "How would this character really say it?"</p>' }
      ]
    }],
    practice: [
      { id: 'phrasing', name: 'Phrasing', code: 'B2.3', gen: phrases },
      { id: 'marks', name: 'Punctuation and voice', code: 'B2.3', gen: markVoice },
      { id: 'pace', name: 'Pace', code: 'B2.3', gen: pace },
      { id: 'stress', name: 'Stressing a word', code: 'B2.3', gen: stress }
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
    phrasing: [[1, 'first-phrase', phraseEnd(1)], [1, 'true-false', phraseTf], [2, 'second-phrase', phraseEnd(2)]],
    marks: [[1, 'which-mark', markWhich], [1, 'true-false', markTf], [2, 'match', markMatch]],
    pace: [[1, 'which', paceWhich], [1, 'true-false', paceTf], [2, 'match', paceMatch]],
    stress: [[1, 'meaning', stressMeaning], [1, 'which-reading', stressWhich], [2, 'true-false', stressTf]]
  });
})();
