/* Grade 3: reading smoothly. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B2.5 Reading fluency: reading with accuracy, at a suitable rate, with expression and phrasing.
   The computer can check the parts that are about knowing what to do (what a mark asks of your voice, where phrases break,
   which feeling fits). Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade3-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var VOICE = { '.': 'Stop', '?': 'Voice goes up', '!': 'Strong voice' };
  var ENDS = {
    '.': ['We packed a lunch.', 'The bus is late today.', 'Liam has a new bike.', 'The leaves are falling.', 'My aunt lives in Thunder Bay.', 'The kettle is on the stove.',
      'We planted beans in the garden.', 'The library opens at ten.', 'Grandpa made bannock for supper.', 'The ferry crossed the bay.'],
    '?': ['Can I come too?', 'Where is my hat?', 'Is it time to go?', 'Did you see the moose?', 'Who left the door open?', 'What is in the box?',
      'May I have a turn?', 'Why is the sky so dark?', 'How far is the lake?', 'Are the cookies ready?'],
    '!': ['Watch out!', 'We did it!', 'That is amazing!', 'Look at the snow!', 'The puck is in the net!', 'Stop, the ice is thin!',
      'I found my lost tooth!', 'Hurry, the bus is here!', 'What a huge fish!', 'Hooray, a snow day!']
  };
  /* sentences with a comma: a short pause after the word with the comma */
  var COMMA = ['After lunch, we went to the park.', 'Every morning, Leila walks her dog.', 'In spring, the maple trees drip with sap.', 'At the lake, we saw a loon.',
    'When it rained, we stayed inside.', 'Before bed, Omar reads a book.', 'On Saturday, my brother plays hockey.', 'Yes, you may come with us.',
    'Later that day, the snow stopped.', 'At recess, Chloe found a feather.', 'This morning, the grass was wet.', 'After the game, we had orange slices.'];
  /* good phrases: read each part in one breath */
  var PHRASED = [
    ['The little fox', 'ran into the woods.'], ['After lunch,', 'we went to the park.'], ['My big brother', 'plays hockey', 'on Saturdays.'],
    ['The old canoe', 'floated', 'on the lake.'], ['Every morning,', 'Leila walks her dog.'], ['In spring,', 'the maple trees', 'drip with sap.'],
    ['Our class', 'went to the museum', 'by bus.'], ['The brown bear', 'looked for berries', 'in the bushes.'], ['My grandmother', 'told us a story', 'about the stars.'],
    ['A tiny snail', 'climbed up', 'the garden wall.'], ['The wind', 'blew the leaves', 'into a pile.'], ['At the market,', 'we bought apples', 'and fresh corn.'],
    ['The children', 'skated on the rink', 'after school.'], ['A red fox', 'ran across', 'the snowy field.'], ['My cousin', 'sent me a letter', 'from Iqaluit.'],
    ['The loud thunder', 'woke the baby', 'in the night.'], ['The geese', 'flew south', 'in a long line.'], ['We sat', 'by the campfire', 'with our friends.']
  ];
  /* a phrase never ends on one of these words: they belong with the word after them */
  var JOINS = ['the', 'a', 'an', 'my', 'her', 'his', 'our', 'to', 'into', 'on', 'in', 'by', 'at', 'with', 'from', 'about', 'and', 'little', 'big', 'old', 'every', 'tiny', 'red', 'brown', 'loud', 'fresh', 'snowy', 'long', 'garden'];
  var FEEL = {
    excited: ['We won the game!', 'It is my birthday today!', 'Look, a rainbow!', 'We are going camping tomorrow!', 'I got a puppy!', 'Hooray, the pool is open!'],
    sad: ['My ice cream fell on the ground.', 'I miss my best friend.', 'Our old dog is sick.', 'The rain ruined our picnic.', 'My kite broke in the wind.', 'Nobody came to play with me.'],
    scared: ['What was that noise in the dark?', 'Is someone there?', 'The thunder is so loud.', 'I think I am lost.', 'Something moved under the bed.', 'The lights just went out.'],
    angry: ['Who broke my sandcastle?', 'That is not fair!', 'Stop taking my pencils!', 'You ate the last cookie again!', 'Give that back right now!', 'You stepped on my drawing!']
  };
  var HOW = { excited: 'bright and fast', sad: 'soft and slow', scared: 'quiet and shaky', angry: 'loud and sharp' };
  var PASSAGES = {
    snow: ['The First Snow', ['Kai woke up and looked outside. Everything was white!', '“Snow!” he shouted. He ran to wake his sister, Tala.', 'They pulled on boots, mitts and warm hats. Outside, the air was cold and still.',
      '“Can we build a fort?” asked Tala.', '“Yes, a big one,” said Kai. “Big enough for both of us.”']],
    loon: ['At the Lake', ['Noor and her grandmother sat on the dock at dawn. The lake was calm.', 'A loon called across the water. Its cry sounded like a song.',
      '“Listen,” whispered Grandma. “It is calling to its family.”', 'Noor held very still. Then, far away, another loon answered.']],
    sap: ['The Sugar Bush', ['In March, Amara and her uncle walked to the sugar bush. The snow was soft and wet.', 'Her uncle tapped a small spout into a maple tree. Clear sap began to drip into the pail.',
      '“Is that syrup already?” asked Amara.', '“Not yet,” said her uncle. “We boil it for hours. It takes forty pails of sap to make one pail of syrup.”',
      'Amara tasted a drop of sap. It was cold, like water, and only a little sweet.', 'That night, the whole cabin smelled of warm syrup. Amara could not wait for pancakes!']],
    canal: ['Skating on the Canal', ['On Saturday, Mateo and his dad drove to Ottawa. The canal had frozen into a long, smooth road of ice.',
      'People skated in every direction. Some pushed babies in sleds. Some held hands.', 'Mateo wobbled at first. Then he found his rhythm: push, glide, push, glide.',
      '“Look, Dad!” he called. “I am going fast!”', 'They stopped at a little hut and bought hot chocolate. Steam rose from the cups into the cold air.',
      'On the drive home, Mateo fell asleep. He dreamed he was still gliding.']]
  };

  /* ---------- marks tell your voice what to do ---------- */
  function endMark(s) { var last = s.length - 1; return W.sent(W.hl(s, last, last + 1)); }
  function voice(lv, m0) {
    var mark = m0 || R.pick(Object.keys(VOICE)), s = R.pick(ENDS[mark]);
    return { q: 'How does your voice sound at the end?', fig: endMark(s), type: 'tap', tiles: ['Stop', 'Voice goes up', 'Strong voice'], answer: ['.', '?', '!'].indexOf(mark),
      prompt: 'Look at the mark at the end.', hint: '. means stop. ? means your voice goes up. ! means a strong voice.', explain: VOICE[mark] + '.', meta: { k: 'g3-voice', s: s } };
  }
  /* Where do you take a short pause? (the comma) */
  function pause(lv) {
    var s = R.pick(COMMA), words = s.split(' ');
    return { q: 'Where do you take a <b>short pause</b>? Tap the word just before it.', fig: W.sent(s), type: 'tap', tiles: words, answer: words.findIndex(function (w) { return /,$/.test(w); }),
      hint: 'Look for a comma ( , ).', explain: 'A comma means a short pause.', meta: { k: 'g3-pause' } };
  }
  function matchMarks() {
    return { q: 'Match each sentence to how your voice sounds at the end.', type: 'match', pairs: R.shuffle(['.', '?', '!']).map(function (m) { return [R.pick(ENDS[m]), VOICE[m]]; }),
      hint: 'Look at the mark at the end of each one.', explain: '. stop, ? up, ! strong.', meta: { k: 'g3-match-marks' } };
  }
  function markTf() {
    var mark = R.pick(Object.keys(VOICE)), s = R.pick(ENDS[mark]), right = R.int(0, 1) === 1, said = right ? VOICE[mark] : VOICE[R.pick(Object.keys(VOICE).filter(function (x) { return x !== mark; }))];
    return { q: Q.name() + ' reads it like this at the end: <b>' + said.toLowerCase() + '</b>.', fig: endMark(s), type: 'tf', answer: right,
      hint: 'Look at the mark at the end.', explain: VOICE[mark] + '.', meta: { k: 'g3-mark-tf', s: s, said: said } };
  }

  /* ---------- read in phrases ---------- */
  /* bad ways to break a sentence: the same number of breaths, but one comes after a word that belongs with the next one */
  function badBreaks(p) {
    var words = p.join(' ').split(' '), good = [], glue = [], n = 0, out = [];
    p.slice(0, -1).forEach(function (ph) { n += ph.split(' ').length; good.push(n - 1); });
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) glue.push(i); });
    R.shuffle(glue).forEach(function (g) {
      var cuts = good.slice(); cuts[R.int(0, cuts.length - 1)] = g; cuts = cuts.filter(function (c, i) { return cuts.indexOf(c) === i; }).sort(function (a, b) { return a - b; });
      var line = words.map(function (w, i) { return w + (cuts.indexOf(i) >= 0 ? ' /' : ''); }).join(' ');
      if (out.indexOf(line) < 0) out.push(line);
    });
    return out.slice(0, 2);
  }
  function canBreak(p) { return badBreaks(p).length >= 2; }
  function phrases(lv) {
    var p = R.pick(PHRASED.filter(canBreak));
    return Q.one('Which way reads in <b>smooth phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Read each one. Which sounds like talking?', hint: 'Keep words that go together in one breath, like "the little fox".', explain: W.sent(p.join(' / ')), meta: { k: 'g3-phrases' } });
  }
  function phraseTf() {
    var p = R.pick(PHRASED.filter(canBreak)), right = R.int(0, 1) === 1, said = right ? p.join(' / ') : badBreaks(p)[0];
    return { q: Q.name() + ' takes a breath at each line. Is it smooth?', fig: W.sent(said), type: 'tf', answer: right,
      hint: 'Does a breath come right after a small word like "the" or "to"?', explain: W.sent(p.join(' / ')), meta: { k: 'g3-phrase-tf', said: said } };
  }
  /* which is NOT smooth: two good ways and one bad */
  function notSmooth() {
    var p = R.pick(PHRASED.filter(function (x) { return x.length === 3 && canBreak(x); })), merged = [p[0], p[1] + ' ' + p[2]].join(' / ');
    return Q.one('Which way is <b>not</b> smooth?', badBreaks(p)[0], [p.join(' / '), merged], { hint: 'Find the breath that cuts words apart that go together.',
      explain: 'Smooth: ' + W.sent(p.join(' / ')), meta: { k: 'g3-not-smooth' } });
  }
  /* which words go together in one breath? */
  function scoop() {
    var p = R.pick(PHRASED.filter(function (x) { return x.length === 3; })), words = p.join(' ').split(' '), bad = [];
    words.forEach(function (w, i) { if (i > 0 && JOINS.indexOf(w.toLowerCase()) >= 0 && i < words.length - 1) bad.push(words.slice(i - 1, i + 1).join(' ')); });
    function others(g) { return bad.filter(function (b) { return g.indexOf(b) < 0; }); }
    var good = R.pick(p.filter(function (g) { return others(g).length > 0; }));
    return Q.tiles('Which words go together in <b>one breath</b>?', good.replace(/[.,]$/, ''), R.some(others(good), 2), {
      fig: W.sent(p.join(' ')), hint: 'A small word like "the" goes with the word after it.', explain: W.sent(p.join(' / ')), meta: { k: 'g3-scoop' } });
  }

  /* ---------- read with feeling ---------- */
  function feelings(n, f) { return R.some(Object.keys(FEEL).filter(function (x) { return x !== f; }), n); }
  function feeling(lv) {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.tiles('How should this sound when you read it aloud?', f, feelings(lv > 1 ? 3 : 2, f), {
      fig: W.sent(s), hint: 'How would the person feel?', explain: 'Read it with a ' + f + ' voice: ' + HOW[f] + '.', meta: { k: 'g3-feeling', s: s } });
  }
  function matchFeel() {
    var fs = R.some(Object.keys(FEEL), 3);
    return { q: 'Match each sentence to how it should sound.', type: 'match', pairs: fs.map(function (f) { return [R.pick(FEEL[f]), f]; }),
      hint: 'How would the person feel?', explain: 'Your voice shows the feeling.', meta: { k: 'g3-match-feel' } };
  }
  function voiceFor(lv) {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]);
    return Q.one('Which voice fits?', HOW[f], feelings(lv > 1 ? 2 : 1, f).map(function (x) { return HOW[x]; }), { fig: W.sent(s), hint: 'First think: how does the person feel?',
      explain: 'They feel ' + f + ': a ' + HOW[f] + ' voice.', meta: { k: 'g3-voice-for', s: s } });
  }
  function feelTf() {
    var f = R.pick(Object.keys(FEEL)), s = R.pick(FEEL[f]), right = R.int(0, 1) === 1, said = right ? f : feelings(1, f)[0];
    return { q: Q.name() + ' reads this in a <b>' + said + '</b> voice.', fig: W.sent(s), type: 'tf', answer: right, hint: 'How would the person feel?',
      explain: 'It needs a ' + f + ' voice: ' + HOW[f] + '.', meta: { k: 'g3-feel-tf', s: s, said: said } };
  }

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'smooth', title: 'Reading smoothly', sub: 'Marks, phrases and feelings guide your voice.',
      concepts: [
        { slug: 'marks', title: 'Marks tell your voice what to do', exp: ['B2.5'], skill: 'marks',
          model: [
            step(W.sent('We packed a lunch<mark class="hl">.</mark>'), '<b>.</b> Stop.'),
            step(W.sent('Can I come too<mark class="hl">?</mark>'), '<b>?</b> Your voice goes up.'),
            step(W.sent('We did it<mark class="hl">!</mark>'), '<b>!</b> A strong voice.'),
            step(W.sent('After lunch<mark class="hl">,</mark> we went to the park.'), '<b>,</b> A short pause.'),
            step(W.sent('Where is my hat<mark class="hl">?</mark> Oh<mark class="hl">,</mark> here it is<mark class="hl">!</mark>'), 'Three in a row: up, pause, strong.')
          ],
          guided: [function () { return voice(1, '?'); }, function () { return pause(1); }, matchMarks],
          check: [function () { return voice(2); }, markTf, function () { return pause(2); }, matchMarks, function () { return voice(3, '!'); }],
          coach: '<p>Read one sentence three ways (with ., ? and !) and let the child hear the difference. Then swap roles.</p>',
          mistake: '<p>Reading straight through the marks without changing the voice. Pause and point to each mark.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.5'], skill: 'phrases',
          model: [
            step(W.sent('The / little / fox / ran'), 'Word by word sounds like a robot.'),
            step(W.sent('The little fox / ran into the woods.'), 'Words that go together: one breath.'),
            step(W.sent('The little / fox ran into / the woods.'), 'Not like this: <b>the</b> goes with its word.'),
            step(W.sent('In spring, the maple trees drip with sap.'), 'Another one.'),
            step(W.sent('In spring, / the maple trees / drip with sap.'), 'The comma is a good place to breathe.')
          ],
          guided: [function () { return phrases(1); }, scoop, phraseTf],
          check: [function () { return phrases(2); }, notSmooth, phraseTf, scoop, function () { return phrases(3); }],
          coach: '<p>Draw a scoop under each phrase with a finger as the child reads. Read a phrase, the child echoes it.</p>',
          mistake: '<p>Stopping after "the" or "a". These small words always go with the next word.</p>' },
        { slug: 'feeling', title: 'Read with feeling', exp: ['B2.5'], skill: 'feeling',
          model: [
            step(W.sent('We won the game!'), '<b>Excited</b>: a bright, fast voice.'),
            step(W.sent('I miss my best friend.'), '<b>Sad</b>: a soft, slow voice.'),
            step(W.sent('Is someone there?'), '<b>Scared</b>: a quiet, shaky voice.'),
            step(W.sent('That is not fair!'), '<b>Angry</b>: a loud, sharp voice.'),
            step(W.icon('think'), 'First ask: how does the person feel?')
          ],
          guided: [function () { return feeling(1); }, function () { return voiceFor(1); }, matchFeel],
          check: [function () { return feeling(2); }, feelTf, function () { return voiceFor(2); }, matchFeel, function () { return feeling(3); }],
          coach: '<p>Take turns reading a line from a book "as a robot" and then "with feeling". Talk about which is easier to follow.</p>',
          mistake: '<p>Reading every sentence in the same voice. Ask "How do they feel?" before reading a line of speech.</p>' }
      ]
    }],
    practice: [
      { id: 'marks', name: 'Marks tell your voice what to do', code: 'B2.5', gen: function (lv) { return voice(lv); } },
      { id: 'phrases', name: 'Read in phrases', code: 'B2.5', gen: phrases },
      { id: 'feeling', name: 'Read with feeling', code: 'B2.5', gen: feeling }
    ],
    tasks: [
      { id: 'read-snow', title: 'Read aloud: The First Snow', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.snow[0], PASSAGES.snow[1]), say: 'Read it aloud to your grown-up.',
        run: ['Let the child read the passage silently first.', 'Then the child reads it aloud. Do not correct mid-sentence; note the words that were tricky.', 'Talk about how Kai feels, then read it once more.'],
        rubric: ['Many words are tricky; reads word by word.', 'Most words right; some phrasing; little expression.', 'Reads accurately in phrases, with some expression.', 'Smooth, accurate and expressive, at a talking pace.'],
        coach: '<p>A good pace for Grade 3 sounds like careful talking. Accuracy and phrasing matter more than speed.</p>' },
      { id: 'read-loon', title: 'Read it three times: At the Lake', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.loon[0], PASSAGES.loon[1]), say: 'Read it three times. It gets smoother each time.',
        run: ['Read the passage to the child first, with expression.', 'The child reads it three times, a little smoother each time.', 'After the third reading, ask which time sounded best and why.'],
        rubric: ['Still word by word after three readings.', 'A little smoother by the third reading.', 'Clearly smoother and more expressive by the third reading.', 'Smooth and expressive; notices the whisper and changes voice.'] },
      { id: 'read-sap', title: 'Read aloud: The Sugar Bush', code: 'B2.5', pic: W.icon('read'), text: W.passage(PASSAGES.sap[0], PASSAGES.sap[1], { pics: ['tree'] }), say: 'Read it aloud. Make Amara and her uncle sound different.',
        run: ['The child reads the passage silently, then aloud.', 'Ask: "How does Amara sound when she asks a question? How does her uncle sound?"', 'Read it again, giving each person their own voice.'],
        rubric: ['Reads word by word; voices sound the same.', 'Reads most words; changes voice a little with help.', 'Reads in phrases; the question and the speakers sound different.', 'Smooth and expressive; uses the marks and the feelings without prompting.'] },
      { id: 'read-canal', title: 'Partner reading: Skating on the Canal', code: 'B2.5', pic: W.icon('people'), text: W.passage(PASSAGES.canal[0], PASSAGES.canal[1], { pics: ['snow'] }), say: 'Take turns: you read one part, then your grown-up reads the next.',
        run: ['Take turns reading one paragraph each, with the grown-up going first.', 'Then swap, so the child reads the parts the grown-up read.', 'Ask: "Which part did you read with the most feeling?"'],
        rubric: ['Struggles to keep the place or read the words.', 'Reads the words; little phrasing.', 'Reads in phrases and copies the grown-up’s expression.', 'Reads smoothly and adds expression of their own, like the excited call to Dad.'] }
    ]
  });

  Q.shapes('fluency', {
    marks: [[1, 'pause', pause], [1, 'match', matchMarks], [2, 'true-false', markTf]],
    phrases: [[1, 'scoop', scoop], [1, 'true-false', phraseTf], [2, 'not-smooth', notSmooth]],
    feeling: [[1, 'voice', voiceFor], [1, 'match', matchFeel], [2, 'true-false', feelTf]]
  });
})();
