/* Grade 1: reading smoothly (fluency).
   Ontario 2023 Language, Grade 1, B2.8: "read simple words, short sentences, and paragraphs in a variety of texts fluently,
   with accuracy and appropriate pacing to support comprehension, and read aloud with expression".
   The computer checks the parts a child can show by tapping: common words known at a glance, what the end mark tells your
   voice, and reading in phrases. Reading aloud itself is an activity with a grown-up.
   All sentences and passages are written for this site. Answer checks: tests/verify/grade1-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* common words, with spellings children often try */
  var SIGHT = [['said', 'sed', 'siad'], ['was', 'wuz', 'waz'], ['they', 'thay', 'thea'], ['the', 'teh', 'thu'], ['you', 'yoo', 'yuo'], ['are', 'ar', 'aer'], ['of', 'uv', 'ov'],
    ['come', 'cum', 'kom'], ['one', 'wun', 'wan'], ['have', 'hav', 'haev'], ['what', 'wut', 'wat'], ['where', 'wer', 'whare'], ['some', 'som', 'sume'], ['there', 'thare', 'ther'], ['do', 'doo', 'du'],
    ['to', 'tu', 'tuu'], ['who', 'hoo', 'hu'], ['were', 'wer', 'wure'], ['your', 'yor', 'yur'], ['does', 'duz', 'duss']];
  /* a sentence that one common word fits: [sentence, word, other common words] */
  var FIT = [['The cat ___ asleep on the mat.', 'was', ['are', 'you']], ['Where ___ my boots?', 'are', ['was', 'of']], ['I ___ a red bike.', 'have', ['are', 'of']],
    ['Mom ___, "Time for bed."', 'said', ['have', 'are']], ['___ you want to play?', 'Do', ['Of', 'Was']], ['A cup ___ milk is on the table.', 'of', ['are', 'they']],
    ['Can you ___ to my house?', 'come', ['said', 'of']], ['Leila and Sam said ___ would help.', 'they', ['was', 'of']], ['I have ___ big brother.', 'one', ['said', 'are']],
    ['___ is my mitt?', 'Where', ['Of', 'Come']], ['___ is in the box?', 'What', ['Of', 'Some']], ['We walk ___ school.', 'to', ['of', 'they']],
    ['___ is at the door?', 'Who', ['Of', 'Some']], ['Is this ___ hat?', 'your', ['of', 'said']], ['The kids ___ happy at the lake.', 'were', ['was', 'of']],
    ['May I have ___ juice?', 'some', ['said', 'was']]];
  var MARKS = { '.': 'Stop for a moment at the end.', '?': 'Let your voice go up at the end, like asking.', '!': 'Read it with a strong, excited voice.' };
  var SHORT = { '.': 'stop', '?': 'voice goes up', '!': 'strong voice' };
  var SAY = { '.': ['The snow is soft.', 'We went to the rink.', 'Grandpa made tea.', 'The loon swam away.', 'My dog sleeps by the door.', 'Amir has a blue bike.'],
    '?': ['Can you see the moon?', 'Is it time to go?', 'Where is my hat?', 'Do you like soup?', 'Who made this card?', 'Can we go skating?'],
    '!': ['Look out!', 'We won the game!', 'That is a huge moose!', 'Hooray, it is snowing!', 'Stop, the bus is here!', 'What a big wave!'] };
  /* sentences in two smooth phrases */
  var PHRASES = [['The big moose', 'walked to the lake.'], ['My little sister', 'likes to paint.'], ['After school', 'we play outside.'], ['The red canoe', 'floated on the water.'],
    ['In the morning', 'Kai eats bannock.'], ['Two small ducks', 'swam in the pond.'], ['Our class', 'planted a garden.'], ['The little fox', 'ran into the woods.'],
    ['On the weekend', 'we go to the farm.'], ['My big brother', 'plays hockey.'], ['In the winter', 'the pond turns to ice.'], ['The small bird', 'sang in the tree.']];
  /* words that do not end a phrase: a phrase ending in one sounds choppy */
  var GLUE = ['The', 'the', 'a', 'My', 'my', 'big', 'little', 'red', 'small', 'Two', 'to', 'in', 'on', 'In', 'On', 'After', 'Our', 'likes', 'into', 'go'];
  var TIPS = [['Read like you are talking.', true], ['Stop for a moment at a period.', true], ['Read as fast as you can.', false], ['Skip words you do not know.', false],
    ['Go back and fix a word that does not make sense.', true], ['Read in one flat voice.', false], ['Keep words that go together in a group.', true], ['Stop after every word.', false]];

  /* ---------- question makers: words to know fast ---------- */
  function sightFit(lv) {
    var f = R.pick(FIT);
    return Q.one('Which word fits?', f[1], f[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(f[0].replace('___', W.gap())), prompt: 'Read the sentence with each word.',
      hint: 'Which word makes the sentence sound right?', explain: W.sent(f[0].replace('___', '<b>' + f[1] + '</b>')), meta: { k: 'g1-sight-fit', s: f[0] } });
  }
  function sightSpell(lv) {
    var s = R.pick(SIGHT);
    return Q.one('Which word is spelled right?', s[0], s.slice(1, lv > 1 ? 3 : 2), { prompt: 'Picture the word in a book. Which one looks right?',
      hint: 'This word does not sound the way it looks. You have to know it.', explain: W.tile(s[0]), meta: { k: 'g1-sight-spell', w: s[0] } });
  }
  function sightPick() {
    var ss = R.some(SIGHT, 4), n = R.int(1, 3);
    return Q.all('Pick every word that is spelled right.', ss.slice(0, n).map(function (s) { return s[0]; }), ss.slice(n).map(function (s) { return s[1]; }), {
      hint: 'Picture each word in a book.', explain: 'Right: ' + ss.slice(0, n).map(function (s) { return s[0]; }).join(', ') + '.', meta: { k: 'g1-sight-pick' } });
  }
  function sightBuild(lv) {
    var s = R.pick(SIGHT.filter(function (x) { return x[0].length > 2 && new Set(x[0].split('')).size === x[0].length; })), letters = s[0].split('');
    var extra = R.some('bkmprtz'.split('').filter(function (l) { return letters.indexOf(l) < 0; }), lv > 1 ? 2 : 1);
    return { q: 'Build the word <b>' + s[0] + '</b>.', type: 'build', parts: letters.concat(extra), answer: letters.map(function (l, i) { return i; }),
      hint: 'Say the letters as you build: ' + letters.join('-') + '.', explain: W.tile(s[0]), meta: { k: 'g1-sight-build', w: s[0] } };
  }
  function sightTf(lv) {
    var s = R.pick(SIGHT), right = R.int(0, 1) === 1, shown = right ? s[0] : s[lv > 1 ? 2 : 1];
    return { q: 'Is this word spelled right?', fig: W.tile(shown), type: 'tf', answer: right,
      why: { options: ['It looks the way it does in books.', 'It is spelled the way it sounds.'], answer: right ? 0 : 1 },
      hint: 'Picture the word in a book.', explain: W.tile(s[0]), meta: { k: 'g1-sight-tf', w: s[0], shown: shown } };
  }

  /* ---------- question makers: end marks ---------- */
  function voiceFor(lv) {
    var mark = R.pick(['.', '?', '!']), s = R.pick(SAY[mark]);
    return Q.one('How should your voice sound?', MARKS[mark], Object.keys(MARKS).filter(function (m) { return m !== mark; }).map(function (m) { return MARKS[m]; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(W.hl(s, s.length - 1, s.length)), prompt: 'Look at the mark at the end.', hint: '. stop &nbsp;&middot;&nbsp; ? voice up &nbsp;&middot;&nbsp; ! strong voice',
      explain: 'The <b>' + mark + '</b> tells you: ' + MARKS[mark].charAt(0).toLowerCase() + MARKS[mark].slice(1), meta: { k: 'g1-voice-for', s: s } });
  }
  function matchMark() {
    return { q: 'Match each mark to how your voice sounds.', type: 'match', pairs: R.shuffle(Object.keys(MARKS)).map(function (m) { return [m, SHORT[m]]; }),
      hint: 'Read a sentence with each mark out loud.', explain: '. stop, ? up, ! strong.', meta: { k: 'g1-match-mark' } };
  }
  function markFor(lv) {
    var mark = R.pick(['.', '?', '!']), s = R.pick(SAY[mark]), others = ['.', '?', '!'].filter(function (m) { return m !== mark; });
    return Q.tiles('Which mark ends it?', mark, lv > 1 ? others : [R.pick(others)], { fig: W.sent(s.slice(0, -1) + ' ' + W.gap()),
      hint: 'Is it telling, asking, or excited?', explain: W.sent(s), meta: { k: 'g1-mark-for', s: s } });
  }
  function questionTap(lv) {
    var mark = R.pick(['?', '!']), right = R.pick(SAY[mark]), wrong = R.some(SAY['.'], lv > 1 ? 2 : 1);
    if (lv > 1) wrong.push(R.pick(SAY[mark === '?' ? '!' : '?']));
    return Q.tiles('Tap the sentence your voice reads with ' + (mark === '?' ? 'a voice that goes <b>up</b>.' : 'a <b>strong, excited</b> voice.'), right, wrong, {
      hint: 'Look at the mark at the end of each one.', explain: W.sent(right), meta: { k: 'g1-mark-tap', mark: mark } });
  }
  function markTf() {
    var mark = R.pick(['.', '?', '!']), s = R.pick(SAY[mark]), said = R.pick(['.', '?', '!']), right = said === mark;
    return { q: 'True or false?', fig: W.sent(W.hl(s, s.length - 1, s.length)) + '<p>Read it: <b>' + SHORT[said] + '</b>.</p>', type: 'tf', answer: right,
      why: { options: ['The end mark tells your voice what to do.', 'The end mark tells your voice something else.'], answer: right ? 0 : 1 },
      hint: '. stop &nbsp;&middot;&nbsp; ? voice up &nbsp;&middot;&nbsp; ! strong voice', explain: 'The <b>' + mark + '</b> means: ' + SHORT[mark] + '.', meta: { k: 'g1-mark-tf', s: s, said: said } };
  }

  /* ---------- question makers: phrases ---------- */
  function choppy(p) {
    var words = (p[0] + ' ' + p[1]).split(' '), cuts = [];
    words.forEach(function (w, i) { if (GLUE.indexOf(w) >= 0 && i < words.length - 1) cuts.push(i); });
    var at = R.some(cuts, Math.min(2, cuts.length));
    return words.map(function (w, i) { return w + (at.indexOf(i) >= 0 ? ' /' : ''); }).join(' ');
  }
  function phrases(lv) {
    var p = R.pick(PHRASES), right = p[0] + ' / ' + p[1], wrong = [choppy(p)];
    if (lv > 1) { var w2 = choppy(p); if (w2 !== wrong[0]) wrong.push(w2); }
    return Q.one('Which way reads in <b>smooth</b> phrases? ( / means a short pause.)', right, wrong, { prompt: 'Read each one out loud. Which sounds like talking?',
      hint: 'Pause after a group of words that goes together, not after "the" or "my".', explain: W.sent(right), meta: { k: 'g1-phrases' } });
  }
  function pauseTap(lv) {
    var p = R.pick(PHRASES.filter(function (x) { var ws = (x[0] + ' ' + x[1]).toLowerCase().split(' '); return new Set(ws).size === ws.length && (lv > 1 || ws.length < 7); })), words = (p[0] + ' ' + p[1]).split(' '), n = p[0].split(' ').length;
    return { q: 'Tap the word to pause after.', type: 'tap', tiles: words, answer: n - 1, answerText: words[n - 1],
      hint: 'Which words go together as a group?', explain: W.sent(p[0] + ' / ' + p[1]), meta: { k: 'g1-pause-tap', s: p[0] + ' ' + p[1] } };
  }
  function phraseTf(lv) {
    var p = R.pick(PHRASES), smooth = R.int(0, 1) === 1, shown = smooth ? p[0] + ' / ' + p[1] : choppy(p);
    return { q: 'Does this read in smooth phrases? ( / means a short pause.)', fig: W.sent(shown), type: 'tf', answer: smooth,
      why: { options: ['Each group of words goes together.', 'It pauses after a word like "the" or "my".'], answer: smooth ? 0 : 1 },
      hint: 'Read it out loud, pausing at each /.', explain: W.sent(p[0] + ' / ' + p[1]), meta: { k: 'g1-phrase-tf', shown: shown } };
  }
  function phraseGroup(lv) {
    var p = R.pick(PHRASES), a = p[0].split(' '), b = p[1].split(' ');
    var wrong = [a.slice(-1).concat(b.slice(0, 1)).join(' '), a.slice(-2).concat(b.slice(0, 1)).join(' ')].filter(function (w, i, all) { return all.indexOf(w) === i && w !== p[0]; });
    return Q.one('Which words go together as one group?', p[0], wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(p[0] + ' ' + p[1]),
      hint: 'Which group could you say on its own and still make sense?', explain: W.sent(p[0] + ' / ' + p[1]), meta: { k: 'g1-phrase-group', s: p[0] + ' ' + p[1] } });
  }
  function tipTf() {
    var t = R.pick(TIPS);
    return { q: 'Is this a good reading tip?', fig: W.sent(t[0]), type: 'tf', answer: t[1],
      why: { options: ['Good reading sounds like talking, and makes sense.', 'Good reading is as fast as possible.'], answer: 0 },
      hint: 'Good readers sound like they are talking, and they check that it makes sense.', explain: t[1] ? 'Yes, a good tip.' : 'No: good reading sounds like talking, and makes sense.', meta: { k: 'g1-tip-tf', tip: t[0] } };
  }

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'fast-words', title: 'Words to know fast', sub: 'Common words you see on every page.',
      concepts: [
        { slug: 'sight', title: 'Know these words at a glance', exp: ['B2.8'], skill: 'sight-words',
          model: [
            step(W.tile('the') + W.tile('was') + W.tile('said') + W.tile('of'), 'You see them on every page.'),
            step(W.tile(W.hl('said', 1, 3)), 'Here, ai sounds like /e/. Just know it.'),
            step(W.tile('sed') + W.tile('said'), 'It sounds like "sed", but looks like this.'),
            step(W.tile(W.hl('one', 0, 3)), 'Sounds like "wun". Know the whole word.'),
            step(W.sent('Mom <b>said</b> it <b>was</b> time to go.'), 'Know them fast, and reading gets smooth.')
          ],
          guided: [function () { return sightFit(1); }, function () { return sightSpell(1); }, function () { return sightTf(1); }],
          check: [function () { return sightFit(2); }, function () { return sightSpell(2); }, sightPick, function () { return sightBuild(2); }, function () { return sightTf(2); }],
          coach: '<p>Pick three common words a week. Write each on a card. Read the cards every day, and spot the words in books. Sound out the parts that are regular (the s and d in said) and learn the tricky part.</p>',
          mistake: '<p>Sounding out "said" as /s/ /ā/ /d/. Point to the tricky part and say: "Here, ai says /e/."</p>' }
      ]
    }, {
      id: 'expression', title: 'Reading with expression', sub: 'Let marks and phrases guide your voice.',
      concepts: [
        { slug: 'marks', title: 'The end mark guides your voice', exp: ['B2.8'], skill: 'expression',
          model: [
            step(W.sent('The snow is soft' + W.hl('.', 0, 1)), 'Stop for a moment.'),
            step(W.sent('Can you see the moon' + W.hl('?', 0, 1)), 'Voice goes up.'),
            step(W.sent('Look out' + W.hl('!', 0, 1)), 'Strong, excited voice.'),
            step(W.sent('Who made this card' + W.gap()), 'Asking? Then it ends with <b>?</b>'),
            step(W.sent('Who made this card' + W.hl('?', 0, 1)), 'So your voice goes up.')
          ],
          guided: [function () { return voiceFor(1); }, function () { return markFor(1); }, markTf],
          check: [function () { return voiceFor(2); }, matchMark, function () { return markFor(2); }, function () { return questionTap(2); }, markTf],
          coach: '<p>Read the same sentence three ways (with ., ? and !) and let the child copy your voice.</p>',
          mistake: '<p>Reading every sentence in the same voice. Point to the end mark before reading each sentence.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.8'], skill: 'phrases',
          model: [
            step(W.sent('The / big / moose / walked / to / the / lake.'), 'Word by word sounds like a robot.'),
            step(W.sent('The big moose / walked to the lake.'), 'Groups of words sound like talking.'),
            step(W.sent('My little / sister likes / to paint.'), 'A pause after "little" breaks a group.'),
            step(W.sent('My little sister / likes to paint.'), 'Who? Then what they do.'),
            step(W.sent('In the winter / the pond turns to ice.'), 'When? Then what happens.')
          ],
          guided: [function () { return phrases(1); }, function () { return pauseTap(1); }, function () { return phraseTf(1); }],
          check: [function () { return phrases(2); }, function () { return phraseGroup(2); }, function () { return pauseTap(2); }, tipTf, function () { return phraseTf(2); }],
          coach: '<p>Draw light pencil lines between phrases in a short text. Read it together, pausing only at the lines. Then read it again without lines.</p>',
          mistake: '<p>Pausing after "the" or "my". These words lean on the next word; keep them together.</p>' }
      ]
    }],
    practice: [
      { id: 'sight-words', name: 'Words to know fast', code: 'B2.8', gen: sightFit },
      { id: 'expression', name: 'End marks and your voice', code: 'B2.8', gen: voiceFor },
      { id: 'phrases', name: 'Reading in phrases', code: 'B2.8', gen: phrases }
    ],
    tasks: [
      { id: 'read-aloud', title: 'Read aloud with expression', code: 'B2.8', pic: W.icon('read'), say: 'Read this to your grown-up. Read it three times this week.',
        text: W.passage('The Snow Fort', ['Ava and Theo made a snow fort.', 'They packed the snow and made thick walls.', '"Look out!" said Theo. "Here comes the wind!"', 'Snow blew over the top of the walls.', 'Ava laughed. "Our fort is strong!"', 'Then they went in for hot cocoa.']),
        run: ['The child reads the passage aloud. Help with any word they get stuck on for more than three seconds.', 'Talk about where the voice should change: the "!" and the speech.', 'Read it again on two more days. Notice if it gets smoother.'],
        rubric: ['Reads word by word with many stops.', 'Reads most words; some phrases; little expression.', 'Reads smoothly at a talking pace, with some expression.', 'Reads smoothly and with expression that matches the marks and the speech.'] },
      { id: 'echo', title: 'Echo reading', code: 'B2.8', pic: W.icon('listen'), say: 'Your grown-up reads a line. You read it back the same way.',
        run: ['Choose a short book. Read one sentence aloud with good expression.', 'The child reads the same sentence back, copying your phrasing and voice.', 'Swap after a few pages: the child reads first and you echo.'],
        rubric: ['Cannot copy the sentence yet.', 'Copies the words but not the voice.', 'Copies the words and the expression.', 'Reads new sentences with good expression without a model.'] }
    ]
  });

  Q.shapes('fluency', {
    'sight-words': [[1, 'spell', sightSpell], [1, 'build', sightBuild], [2, 'pick', sightPick], [1, 'true or false', sightTf]],
    expression: [[1, 'match', matchMark], [1, 'which mark', markFor], [1, 'tap', questionTap], [1, 'true or false', markTf]],
    phrases: [[1, 'pause', pauseTap], [1, 'group', phraseGroup], [1, 'true or false', phraseTf], [1, 'tip', tipTf]]
  });
})();
