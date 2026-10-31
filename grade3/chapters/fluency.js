/* Grade 3: reading smoothly.
   Ontario 2023 Language, Grade 3, B2.5 Reading fluency: reading with accuracy, at a suitable rate, with expression and phrasing.
   The computer can check the parts that are about knowing what to do (what a mark asks of your voice, where phrases break,
   which feeling fits). Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade3-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var VOICE = { '.': 'Stop', '?': 'Voice goes up', '!': 'Strong voice' };
  var ENDS = {
    '.': ['We packed a lunch.', 'The bus is late today.', 'Liam has a new bike.', 'The leaves are falling.'],
    '?': ['Can I come too?', 'Where is my hat?', 'Is it time to go?', 'Did you see the moose?'],
    '!': ['Watch out!', 'We did it!', 'That is amazing!', 'Look at the snow!']
  };
  /* good phrases: read each part in one breath */
  var PHRASED = [
    ['The little fox', 'ran into the woods.'], ['After lunch,', 'we went to the park.'], ['My big brother', 'plays hockey', 'on Saturdays.'],
    ['The old canoe', 'floated', 'on the lake.'], ['Every morning,', 'Leila walks her dog.'], ['In spring,', 'the maple trees', 'drip with sap.']
  ];
  /* a phrase never ends on one of these words: they belong with the word after them */
  var JOINS = ['the', 'a', 'an', 'my', 'her', 'his', 'to', 'into', 'on', 'in', 'little', 'big', 'old', 'every', 'with'];
  var FEEL = {
    excited: ['We won the game!', 'It is my birthday today!', 'Look, a rainbow!'],
    sad: ['My ice cream fell on the ground.', 'I miss my best friend.', 'Our old dog is sick.'],
    scared: ['What was that noise in the dark?', 'Is someone there?', 'The thunder is so loud.']
  };
  var PASSAGES = {
    snow: ['The First Snow', ['Kai woke up and looked outside. Everything was white!', '\u201cSnow!\u201d he shouted. He ran to wake his sister, Tala.', 'They pulled on boots, mitts and warm hats. Outside, the air was cold and still.',
      '\u201cCan we build a fort?\u201d asked Tala.', '\u201cYes, a big one,\u201d said Kai. \u201cBig enough for both of us.\u201d']],
    loon: ['At the Lake', ['Noor and her grandmother sat on the dock at dawn. The lake was calm.', 'A loon called across the water. Its cry sounded like a song.',
      '\u201cListen,\u201d whispered Grandma. \u201cIt is calling to its family.\u201d', 'Noor held very still. Then, far away, another loon answered.']]
  };

  /* ---------- question makers ---------- */
  function voice(lv, m0) {
    var mark = m0 || R.pick(Object.keys(VOICE)), s = R.pick(ENDS[mark]), last = s.length - 1;
    return { q: 'How does your voice sound at the end?', fig: W.sent(W.hl(s, last, last + 1)), type: 'tap', tiles: ['Stop', 'Voice goes up', 'Strong voice'], answer: ['.', '?', '!'].indexOf(mark),
      prompt: 'Look at the mark at the end.', hint: '. means stop. ? means your voice goes up. ! means a strong voice.', explain: W.hl(s, last, last + 1) + ': ' + VOICE[mark] + '.', meta: { k: 'g3-voice', s: s } };
  }
  /* Where do you take a short pause? (the comma) */
  function pause() {
    var list = PHRASED.filter(function (p) { return /,$/.test(p[0]); }), p = R.pick(list), words = p.join(' ').split(' ');
    return { q: 'Where do you take a <b>short pause</b>? Tap the word just before it.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: words.findIndex(function (w) { return /,$/.test(w); }),
      hint: 'Look for a comma ( , ).', explain: 'A comma means a short pause.', meta: { k: 'g3-pause' } };
  }
  /* one bad way to break a sentence: after a word that belongs with the next one */
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED);
    return Q.one('Which way reads in <b>smooth phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Read each one aloud. Which sounds like talking?', hint: 'Keep words that go together in one breath, like "the little fox".', explain: W.sent(p.join(' / ')), meta: { k: 'g3-phrases' } });
  }
  function feeling() {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.tiles('How should this sound when you read it aloud?', f, Object.keys(FEEL).filter(function (x) { return x !== f; }), {
      fig: W.sent(s), hint: 'How would the person feel?', explain: 'Read it with a ' + f + ' voice.', meta: { k: 'g3-feeling', s: s } });
  }
  function matchFeel() {
    var fs = Object.keys(FEEL);
    return { q: 'Match each sentence to how it should sound.', type: 'match', pairs: R.shuffle(fs).map(function (f) { return [R.pick(FEEL[f]), f]; }),
      hint: 'How would the person feel?', explain: 'Your voice shows the feeling.', meta: { k: 'g3-match-feel' } };
  }

  Atlas.register('fluency', {
    lessons: [{
      id: 'smooth', title: 'Reading smoothly', sub: 'Marks, phrases and feelings guide your voice.',
      concepts: [
        { slug: 'marks', title: 'Marks tell your voice what to do', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent('We packed a lunch<mark class="hl">.</mark>'), '<b>.</b> Stop.'),
            step(W.sent('Can I come too<mark class="hl">?</mark>'), '<b>?</b> Your voice goes up.'),
            step(W.sent('We did it<mark class="hl">!</mark>'), '<b>!</b> A strong voice.'),
            step(W.sent('After lunch<mark class="hl">,</mark> we went to the park.'), '<b>,</b> A short pause.')
          ],
          key: '<p><b>.</b> stop &nbsp; <b>?</b> up &nbsp; <b>!</b> strong &nbsp; <b>,</b> short pause</p>',
          guided: [function () { return voice(1, '?'); }, function () { return voice(1, '!'); }],
          check: [function () { return voice(1); }, pause],
          coach: '<p>Read one sentence three ways (with ., ? and !) and let the child hear the difference. Then swap roles.</p>',
          mistake: '<p>Reading straight through the marks without changing the voice. Pause and point to each mark.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent('The / little / fox / ran'), 'Word by word sounds like a robot.'),
            step(W.sent('The little fox / ran into the woods.'), 'Read words that go together in one breath.'),
            step(W.sent('The little / fox ran into / the woods.'), 'Not like this: "the" goes with its word.')
          ],
          key: '<p>Scoop words that go together.</p>',
          guided: [function () { return phrases(1); }, function () { return phrases(1); }],
          check: [function () { return phrases(2); }, function () { return phrases(2); }],
          coach: '<p>Draw a scoop under each phrase with a finger as the child reads. Read a phrase, the child echoes it.</p>',
          mistake: '<p>Stopping after "the" or "a". These small words always go with the next word.</p>' },
        { slug: 'feeling', title: 'Read with feeling', exp: ['B2.5'], skill: 'fluency',
          model: [
            step(W.sent('We won the game!'), 'How do they feel? <b>Excited</b>.'),
            step(W.sent('I miss my best friend.'), 'How do they feel? <b>Sad</b>. A soft, slow voice.'),
            step(W.sent('Is someone there?'), 'How do they feel? <b>Scared</b>.')
          ],
          key: '<p>Think how the person feels. Let your voice show it.</p>',
          guided: [feeling, feeling],
          check: [feeling, matchFeel],
          coach: '<p>Take turns reading a line from a book "as a robot" and then "with feeling". Talk about which is easier to follow.</p>',
          mistake: '<p>Reading every sentence in the same voice. Ask "How do they feel?" before reading a line of speech.</p>' }
      ]
    }],
    practice: [
      { id: 'fluency', name: 'Reading smoothly', code: 'B2.5', gen: function (lv) { return voice(lv); } }
    ],
    tasks: [
      { id: 'read-snow', title: 'Read aloud: The First Snow', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.snow[0], PASSAGES.snow[1]), say: 'Read it aloud to your grown-up.',
        run: ['Let the child read the passage silently first.', 'Then the child reads it aloud. Do not correct mid-sentence; note the words that were tricky.', 'Talk about how Kai feels, then read it once more.'],
        rubric: ['Many words are tricky; reads word by word.', 'Most words right; some phrasing; little expression.', 'Reads accurately in phrases, with some expression.', 'Smooth, accurate and expressive, at a talking pace.'],
        coach: '<p>A good pace for Grade 3 sounds like careful talking. Accuracy and phrasing matter more than speed.</p>' },
      { id: 'read-loon', title: 'Read it three times: At the Lake', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.loon[0], PASSAGES.loon[1]), say: 'Read it three times. It gets smoother each time.',
        run: ['Read the passage to the child first, with expression.', 'The child reads it three times, a little smoother each time.', 'After the third reading, ask which time sounded best and why.'],
        rubric: ['Still word by word after three readings.', 'A little smoother by the third reading.', 'Clearly smoother and more expressive by the third reading.', 'Smooth and expressive; notices the whisper and changes voice.'] }
    ]
  });

  Q.shapes('fluency', {
    fluency: [[1, 'pause', pause], [1, 'phrases', phrases], [1, 'feeling', feeling], [2, 'match-feeling', matchFeel]]
  });
})();
