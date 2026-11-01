/* Grade 8: reading fluently. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
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
    ['After weeks of planning,', 'the science fair', 'opened on Monday.'], ['Because the ice was thin,', 'the rangers', 'closed the lake to skaters.'],
    ['On the first day of school,', 'the new teacher', 'learned every name.'], ['The canoe', 'that we borrowed', 'had a leak', 'in the bow.'],
    ['If the ferry is late,', 'we will miss', 'the start of the game.'], ['Every spring,', 'the geese return', 'to the marsh', 'behind our school.'],
    ['My grandmother', 'taught me', 'to make bannock', 'over a fire.'], ['While the band played,', 'the crowd', 'sang along', 'with every word.'],
    ['The library', 'on Main Street', 'is open late', 'on Thursdays.'], ['During the long winter,', 'our family', 'played cards', 'by the woodstove.'],
    ['The coach', 'of the hockey team', 'gave a short speech', 'after the game.'], ['As the sun set,', 'the sky over the lake', 'turned orange and pink.']];
  /* a phrase never ends on one of these: they belong with the words after them */
  var JOINS = ['the', 'a', 'an', 'my', 'our', 'to', 'in', 'of', 'on', 'with', 'by', 'who', 'before', 'whole', 'back', 'science', 'new', 'long', 'short'];
  /* what each mark asks of your voice, with sentences that use it */
  var MARKS = {
    ';': ['a medium pause, then go on', ['The bus was late; we walked to school.', 'The river was high; the bridge was closed.', 'Mei loves winter; her brother prefers summer.',
      'The game was cancelled; the field was flooded.', 'I finished my essay; then I went for a run.', 'The power came back; everyone cheered.']],
    '—': ['a sudden break', ['I opened the door — and froze.', 'We had one job — and we forgot it.', 'The answer was simple — too simple.',
      'He reached for the last cookie — and it was gone.', 'She turned around — no one was there.', 'The ice groaned — then split wide open.']],
    '…': ['trail off', ['I thought I heard something…', 'Maybe next year…', 'If only I had listened…', 'The lights flickered, and then…', 'Well, I suppose we could try…', 'And so the long winter began…']],
    '(': ['a lower, quicker voice for the extra detail', ['The lake (the deepest in the park) is very cold.', 'Our coach (a former Olympian) watched closely.', 'My sister (who never cooks) made dinner.',
      'The trail (about 6 km long) ends at a waterfall.', 'Ottawa (the capital of Canada) sits on a river.', 'The test (worth 20 marks) is on Friday.']],
    ':': ['a pause that leads into what comes next', ['She had one goal: to finish the race.', 'Bring three things: water, a hat and a map.', 'The sign said one word: CLOSED.',
      'There was only one way out: the window.', 'Kai knew the answer: Halifax.', 'Remember the rule: safety first.']]
  };
  var SHOWN = { ';': ';', '—': '—', '…': '…', '(': '( )', ':': ':' };
  /* [sentence, [the word to stress, what you mean], ...] */
  var STRESS = [
    ['Maya didn' + AP + 't borrow my bike.', [['Maya', 'Someone else borrowed it.'], ['my', 'She borrowed someone else' + AP + 's bike.'], ['bike', 'She borrowed something else of mine.']]],
    ['Theo said the test is on Friday.', [['Theo', 'Theo said it, not someone else.'], ['test', 'The test is on Friday, not the project.'], ['Friday', 'It is on Friday, not another day.']]],
    ['We need two volunteers for Saturday.', [['two', 'We need two, not one or three.'], ['volunteers', 'We need volunteers, not paid staff.'], ['Saturday', 'We need them on Saturday, not Sunday.']]],
    ['I left my blue jacket at the rink.', [['I', 'I did it, not someone else.'], ['blue', 'The blue one, not the red one.'], ['rink', 'At the rink, not at school.']]],
    ['Amira wants a small pizza tonight.', [['Amira', 'Amira wants it, not her brother.'], ['small', 'A small one, not a large one.'], ['tonight', 'Tonight, not tomorrow.']]],
    ['The bus leaves at eight.', [['bus', 'The bus leaves then, not the train.'], ['leaves', 'It leaves at eight; it does not arrive then.'], ['eight', 'At eight, not at nine.']]],
    ['Kai never said he was sick.', [['Kai', 'Someone said it, but not Kai.'], ['said', 'He hinted at it, but never said it.'], ['sick', 'He said something, just not that he was sick.']]],
    ['My aunt bought the red canoe.', [['aunt', 'My aunt bought it, not my uncle.'], ['bought', 'She bought it; she did not rent it.'], ['red', 'The red one, not the green one.']]],
    ['We are meeting in the gym after lunch.', [['gym', 'In the gym, not the library.'], ['after', 'After lunch, not before.'], ['lunch', 'After lunch, not after school.']]],
    ['Leila finished her project on time.', [['Leila', 'Leila finished, not her partner.'], ['finished', 'She finished it; she did not just start it.'], ['time', 'On time, not late.']]]];
  /* sentences to slow down for (numbers, new terms, steps) and sentences that read at an easy pace */
  var DENSE = ['The town grew from 14 500 people to 23 750 people in ten years.', 'Photosynthesis turns light energy into chemical energy.', 'Step 3: Connect the red wire to the negative terminal.',
    'The treaty was signed in 1850 by 14 leaders.', 'Mitochondria release energy stored in glucose.', 'Lake Superior holds about 12 100 cubic kilometres of water.',
    'Step 1: Measure 250 mL of water into the beaker.', 'Igneous rock forms when magma cools and hardens.', 'The trip is 1 240 km and takes about 14 hours.',
    'Step 2: Fold the paper in half, then fold the corners to the centre.', 'Condensation happens when water vapour cools into droplets.', 'In 2021, the city planted 3 600 trees in 42 parks.',
    'Step 4: Subtract the smaller number from the larger one.', 'The hypotenuse is the longest side of a right triangle.', 'Chlorophyll absorbs red and blue light.'];
  var EASY = ['Kai grabbed his skates and ran to the rink.', 'The dog barked at the mail carrier.', 'We ate lunch by the lake.', 'Priya laughed at the joke.', 'The bell rang, and everyone left.',
    'Mom made pancakes on Sunday.', 'The cat slept in the sun.', 'We walked home through the park.', 'Zara found her lost mitten.', 'The puppy chased a red ball.',
    'Grandpa told us a funny story.', 'Rain tapped on the window.', 'Omar waved and called my name.', 'The kids built a snow fort.', 'We sang songs around the fire.'];
  /* why a sentence is dense */
  function whyDense(s) { return /^Step \d/.test(s) ? 'steps to follow' : /\d/.test(s) ? 'numbers to take in' : 'a new term to understand'; }
  var WHY = ['steps to follow', 'numbers to take in', 'a new term to understand'];
  /* [what you are reading, how to read it, six short examples] */
  var PURPOSE = [
    ['a news report', 'clear and steady, like an announcer', ['City council voted 7 to 2 on Tuesday to add new bike lanes.', 'Heavy snow closed schools across Sudbury this morning.',
      'The Blue Jays won 5 to 3 last night in Toronto.', 'A new library will open in Moncton next spring, officials said.', 'Ferry service to the island resumed today after two days of high winds.',
      'Provincial parks will offer free entry on Canada Day, the province announced.']],
    ['a persuasive speech', 'confident, with strong stress on key words', ['We can do better. We must do better. Vote yes on Friday!', 'Every student deserves a safe walk to school. Every single one.',
      'This park belongs to all of us. Let us keep it clean!', 'Ask yourself: if not us, then who? If not now, then when?', 'Join the team. Make a difference. Sign up today!',
      'Our town can lead the way. Let us start right now!']],
    ['a suspenseful story', 'slower and quieter at the tense moments', ['The footsteps stopped. Someone was standing right outside the tent.', 'The door creaked open. Nobody was there.',
      'She held her breath. The ice cracked beneath her boots.', 'In the dark, something brushed against his arm.', 'The lights went out. Then came a slow knock at the door.',
      'He turned the key. The basement stairs groaned.']],
    ['a poem', 'with a pause at each line break and a steady rhythm', ['Lift the canoe. Carry the weight. / Step over roots. Step over stone.',
      'Snow on the spruce, / smoke on the hill, / the lake lies white / and the world is still.', 'Wind in the birches, / waves on the shore, / gulls overhead / and nothing more.',
      'Morning comes softly / over the bay, / grey turning golden, / night slips away.', 'Bannock and berries, / stories and song, / the fire burns low / and the night is long.',
      'The tide goes out, / the tide comes in, / the mudflats shine / like a silver skin.']],
    ['instructions', 'clear, with a pause between steps', ['1. Preheat the oven. 2. Grease the pan. 3. Pour in the batter.', '1. Turn off the tap. 2. Remove the filter. 3. Rinse it well.',
      '1. Open the app. 2. Tap Settings. 3. Choose a new password.', '1. Lace your skates tightly. 2. Step onto the ice. 3. Bend your knees.',
      '1. Fill the kettle. 2. Boil the water. 3. Pour it over the tea.', '1. Pitch the tent. 2. Stake each corner. 3. Add the rain fly.']]];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- phrases ---------- */
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  /* level 1 shows the sentence whole first; level 2 does not */
  function phrases(lv) {
    var p = R.pick(PHRASED);
    return Q.one('Which way reads in <b>meaningful phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), { fig: lv > 1 ? '' : W.sent(p.join(' ')),
      prompt: 'Read each one aloud. Which one keeps ideas together?', hint: 'Never break between little words like "the" or "of" and the words they belong to.', explain: W.sent(p.join(' / ')), meta: { k: 'g8-phrases' } });
  }
  function firstBreak() {
    var p = R.pick(PHRASED.filter(function (x) { var w = x.join(' ').toLowerCase().split(' '); return /,$/.test(x[0]) && w.every(function (y, i) { return w.indexOf(y) === i; }); })), words = p.join(' ').split(' '), at = p[0].split(' ').length - 1;
    return { q: 'Where is the first natural pause? Tap the word just before it.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: at,
      hint: 'Look for the end of the first idea, often marked by a comma.', explain: W.sent(p.join(' / ')), meta: { k: 'g8-first-break' } };
  }
  function countPhrases(lv) {
    var p = R.pick(PHRASED), n = p.length;
    return Q.tiles('How many breaths (phrases) does this sentence need?', String(n), [2, 3, 4, 5].filter(function (x) { return x !== n; }).slice(0, lv > 1 ? 3 : 2).map(String), {
      fig: W.sent(p.join(' ')), prompt: 'Find each group of words that belongs together.', hint: 'Commas and small joining words help you find the groups.', explain: W.sent(p.join(' / ')), meta: { k: 'g8-count-phrases', s: p.join(' / ') } });
  }
  function phraseTf() {
    var p = R.pick(PHRASED), right = R.int(0, 1) === 1, shown = right ? p.join(' / ') : R.pick(badBreaks(p));
    return { q: Q.name() + ' marked the breaths like this.', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Each part holds one idea.', 'A break comes right after a small joining word.'], answer: right ? 0 : 1 }, hint: 'Does any part end on a word like "the", "of" or "my"?',
      explain: W.sent(p.join(' / ')), meta: { k: 'g8-phrase-tf', shown: shown } };
  }

  /* ---------- marks ---------- */
  function mark(lv) {
    var m = R.pick(Object.keys(MARKS)), s = R.pick(MARKS[m][1]);
    return Q.tiles('What does your voice do at the <b>' + SHOWN[m] + '</b>?', MARKS[m][0], R.some(Object.keys(MARKS).filter(function (x) { return x !== m; }), lv > 1 ? 3 : 2).map(function (x) { return MARKS[x][0]; }), {
      fig: W.sent(s), prompt: 'Read it aloud both ways. Which sounds right?', hint: '; medium pause. — sudden break. … trail off. ( ) lower voice. : leads in.', explain: MARKS[m][0], meta: { k: 'g8-mark', s: s } });
  }
  function matchMarks() {
    var ms = R.some(Object.keys(MARKS), 3);
    return { q: 'Match each mark to what your voice does.', type: 'match', pairs: ms.map(function (m) { return [SHOWN[m], MARKS[m][0]]; }), hint: 'Picture a sentence with each mark.', explain: 'Punctuation is a map for your voice.', meta: { k: 'g8-match-marks' } };
  }
  function markWhich(lv) {
    var ms = R.some(Object.keys(MARKS), lv > 1 ? 4 : 3), m = ms[0];
    return Q.one('Which sentence asks your voice for <b>' + MARKS[m][0] + '</b>?', R.pick(MARKS[m][1]), ms.slice(1).map(function (x) { return R.pick(MARKS[x][1]); }), {
      prompt: 'Look at the marks in each sentence.', hint: '; medium pause. — sudden break. … trail off. ( ) lower voice. : leads in.', explain: 'The <b>' + SHOWN[m] + '</b> asks for ' + MARKS[m][0] + '.', meta: { k: 'g8-mark-which', want: MARKS[m][0] } });
  }
  function markTf() {
    var m = R.pick(Object.keys(MARKS)), s = R.pick(MARKS[m][1]), right = R.int(0, 1) === 1, said = right ? MARKS[m][0] : MARKS[R.pick(Object.keys(MARKS).filter(function (x) { return x !== m; }))][0];
    return { q: Q.name() + ' says your voice should make <b>' + said + '</b> here.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The <b>' + SHOWN[m] + '</b> asks for ' + MARKS[m][0] + '.', 'Every mark asks for the same pause.'], answer: 0 }, hint: 'Find the mark. What does it ask for?',
      explain: MARKS[m][0], meta: { k: 'g8-mark-tf', s: s, said: said } };
  }

  /* ---------- stress ---------- */
  function caps(s, w) { return s.replace(new RegExp('\\b' + w + '\\b'), '<b>' + w.toUpperCase() + '</b>'); }
  function stress() {
    var s = R.pick(STRESS), x = R.pick(s[1]), words = s[0].replace(/[.]$/, '').split(' ');
    return { q: 'You mean: <b>' + x[1] + '</b> Which word do you stress?', fig: W.sent(s[0]), type: 'tap', tiles: words, answer: words.indexOf(x[0]),
      prompt: 'Which word is being compared with something else?', hint: 'Stress the word that the meaning is about.', explain: W.sent(caps(s[0], x[0])), meta: { k: 'g8-stress', s: s[0], mean: x[1] } };
  }
  function stressMeaning() {
    var s = R.pick(STRESS), x = R.pick(s[1]);
    return Q.one('Which meaning does the stress give?', x[1], s[1].filter(function (y) { return y !== x; }).map(function (y) { return y[1]; }), {
      fig: W.sent(caps(s[0], x[0])), hint: 'The stressed word is the one being contrasted.', explain: x[1], meta: { k: 'g8-stress-meaning', s: s[0], word: x[0] } });
  }
  function stressTf() {
    var s = R.pick(STRESS), x = R.pick(s[1]), right = R.int(0, 1) === 1, said = right ? x[1] : R.pick(s[1].filter(function (y) { return y !== x; }))[1];
    return { q: Q.name() + ' says this stress means: <b>' + said + '</b>', fig: W.sent(caps(s[0], x[0])), type: 'tf', answer: right,
      why: { options: ['The stressed word is the one being contrasted.', 'Stress does not change the meaning.'], answer: 0 }, hint: 'What is the stressed word being compared with?',
      explain: x[1], meta: { k: 'g8-stress-tf', word: x[0], said: said } };
  }
  function stressMatch() {
    var s = R.pick(STRESS);
    return { q: 'Match each way of saying it to what it means.', type: 'match', pairs: s[1].map(function (x) { return [caps(s[0], x[0]), x[1]]; }), hint: 'Say each one aloud, leaning on the capital word.',
      explain: 'One sentence, three meanings.', meta: { k: 'g8-stress-match' } };
  }

  /* ---------- pace ---------- */
  var PACE = { slow: 'slow down', easy: 'an easy, natural pace', fast: 'as fast as you can' };
  function pace(lv) {
    var dense = R.int(0, 1) === 1, s = R.pick(dense ? DENSE : EASY), right = PACE[dense ? 'slow' : 'easy'];
    return Q.tiles('What pace fits this sentence?', right, [PACE[dense ? 'easy' : 'slow']].concat(lv > 1 ? [PACE.fast] : []), { fig: W.sent(s),
      prompt: 'Is it packed with numbers, new terms or steps?', hint: 'Slow down where the information is dense.', explain: dense ? 'It has ' + whyDense(s) + '.' : 'It is a simple story sentence.', meta: { k: 'g8-pace', s: s } });
  }
  function slowDown(lv) {
    return Q.one('Which sentence should you read <b>more slowly</b>?', R.pick(DENSE), R.some(EASY, lv > 1 ? 3 : 2), { prompt: 'Which one is packed with numbers, new terms or steps?',
      hint: 'Slow down where the information is dense.', explain: 'Numbers, new terms and steps need a slower pace so you understand them.', meta: { k: 'g8-slow' } });
  }
  function whySlow() {
    var s = R.pick(DENSE), w = whyDense(s);
    return Q.tiles('Why should you slow down here?', w, WHY.filter(function (x) { return x !== w; }), { fig: W.sent(s), prompt: 'What makes it hard to take in?',
      hint: 'Numbers, a new term, or steps to follow.', explain: 'It has ' + w + '.', meta: { k: 'g8-why-slow', s: s } });
  }
  function paceTf() {
    var dense = R.int(0, 1) === 1, s = R.pick(dense ? DENSE : EASY), right = R.int(0, 1) === 1, says = right === dense;
    return { q: Q.name() + ' says you should <b>' + (says ? 'slow down' : 'keep an easy pace') + '</b> for this sentence.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: [dense ? 'It has ' + whyDense(s) + '.' : 'It is a simple story sentence.', 'Fluent reading is always as fast as possible.'], answer: 0 },
      hint: 'Is it packed with numbers, new terms or steps?', explain: dense ? 'Slow down: ' + whyDense(s) + '.' : 'An easy pace is right.', meta: { k: 'g8-pace-tf', s: s, says: says } };
  }

  /* ---------- purpose ---------- */
  function purpose(lv) {
    var p = R.pick(PURPOSE), ex = R.pick(p[2]);
    return Q.one('How should you read this aloud?', p[1], R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(ex), prompt: 'What kind of text is it? Why would someone listen to it?', hint: 'This is ' + p[0] + '.', explain: cap(p[0]) + ': ' + p[1] + '.', meta: { k: 'g8-purpose-voice', s: ex } });
  }
  function matchPurpose() {
    var ps = R.some(PURPOSE, 3);
    return { q: 'Match each kind of text to how you read it aloud.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Think about why someone is listening.', explain: 'Your voice should suit the purpose.', meta: { k: 'g8-match-purpose' } };
  }
  function textKind(lv) {
    var p = R.pick(PURPOSE), ex = R.pick(p[2]);
    return Q.tiles('What kind of text is this?', p[0], R.some(PURPOSE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { fig: W.sent(ex),
      prompt: 'Look at how it is written.', hint: 'Numbers and places: news. Commands and big claims: a speech. Slashes: line breaks in a poem.', explain: cap(p[0]) + ': read it ' + p[1] + '.', meta: { k: 'g8-text-kind', s: ex } });
  }
  function purposeTf() {
    var p = R.pick(PURPOSE), ex = R.pick(p[2]), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick(PURPOSE.filter(function (x) { return x !== p; }))[1];
    return { q: Q.name() + ' says to read this <b>' + said + '</b>.', fig: W.sent(ex), type: 'tf', answer: right,
      why: { options: ['It is ' + p[0] + ', so read it ' + p[1] + '.', 'Every text is read the same way.'], answer: 0 }, hint: 'What kind of text is it?',
      explain: cap(p[0]) + ': ' + p[1] + '.', meta: { k: 'g8-voice-purpose-tf', s: ex, said: said } };
  }

  var PH = PHRASED[1], ST = STRESS[1];
  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'phrasing', title: 'Phrasing and punctuation', sub: 'Group words into ideas. Let marks guide your voice.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful phrases', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent(PH.join(' ')), 'A long sentence.'),
            step(W.sent(PH.join(' / ')), 'Each slash: one idea, one breath.'),
            step(W.sent('My cousin, who / lives in Iqaluit'), 'Never break after a small joining word.'),
            step(W.sent(PHRASED[7].join(' ')), 'Where are the ideas?'),
            step(W.sent(PHRASED[7].join(' / ')), 'Four ideas, four breaths.')
          ],
          guided: [function () { return phrases(1); }, firstBreak, phraseTf],
          check: [function () { return phrases(2); }, function () { return countPhrases(1); }, phraseTf, firstBreak, function () { return phrases(2); }],
          coach: '<p>Photocopy a page and let the child mark the phrase breaks with a pencil slash before reading aloud.</p>',
          mistake: '<p>Word-by-word reading of long sentences, which loses the meaning. Model one phrase at a time and have the child echo it.</p>' },
        { slug: 'marks', title: 'Each mark asks something of your voice', exp: ['B2.3'], skill: 'marks',
          model: [
            step(W.sent(MARKS[';'][1][0]), 'Semicolon: a medium pause.'),
            step(W.sent(MARKS['—'][1][0]), 'Dash: a sudden break.'),
            step(W.sent(MARKS['…'][1][0]), 'Ellipsis: let your voice trail off.'),
            step(W.sent(MARKS['('][1][0]), 'Brackets: a lower, quicker aside.'),
            step(W.sent(MARKS[':'][1][0]), 'Colon: pause, then deliver.')
          ],
          guided: [function () { return mark(1); }, function () { return markWhich(1); }, markTf],
          check: [function () { return mark(2); }, matchMarks, markTf, function () { return markWhich(2); }, function () { return mark(2); }],
          coach: '<p>Read the same sentence ignoring the marks, then obeying them. Ask which one made more sense.</p>',
          mistake: '<p>Treating every mark like a full stop. A semicolon pauses less; brackets are quicker, not slower.</p>' }
      ]
    }, {
      id: 'expression', title: 'Expression and pace', sub: 'Stress, speed and voice that fit the text.',
      concepts: [
        { slug: 'stress', title: 'Stress changes the meaning', exp: ['B2.3'], skill: 'stress',
          model: [
            step(W.sent('<b>MAYA</b> didn' + AP + 't borrow my bike.'), 'Someone else did.'),
            step(W.sent('Maya didn' + AP + 't borrow <b>MY</b> bike.'), 'She borrowed another person' + AP + 's.'),
            step(W.sent('Maya didn' + AP + 't borrow my <b>BIKE</b>.'), 'She borrowed something else.'),
            step(W.sent(caps(ST[0], 'Friday')), 'Not another day.'),
            step(W.sent(caps(ST[0], 'test')), 'Not the project.')
          ],
          guided: [stress, stressMeaning, stressTf],
          check: [stress, stressMeaning, stressTf, stressMatch, stress],
          coach: '<p>Play with one sentence: the child says it with the stress on a different word each time, and you say what it means.</p>',
          mistake: '<p>Stressing every word, or none. Choose the one word the meaning depends on.</p>' },
        { slug: 'pace', title: 'Slow down for dense information', exp: ['B2.3'], skill: 'pace',
          model: [
            step(W.sent(EASY[0]), 'A story sentence: an easy pace.'),
            step(W.sent(DENSE[0]), 'Numbers: slow down.'),
            step(W.sent(DENSE[1]), 'A new term: slower again.'),
            step(W.sent(DENSE[2]), 'Steps: one at a time, so you can follow them.')
          ],
          guided: [function () { return pace(1); }, function () { return slowDown(1); }, whySlow],
          check: [function () { return pace(2); }, function () { return slowDown(2); }, whySlow, paceTf, function () { return pace(2); }],
          coach: '<p>Fluent does not mean fast. Praise the child for slowing down in science and math texts.</p>',
          mistake: '<p>Racing through numbers and new terms to sound fluent, then not understanding them.</p>' },
        { slug: 'purpose', title: 'Match your voice to the purpose', exp: ['B2.3'], skill: 'purpose',
          model: [
            step(W.sent(PURPOSE[0][2][0]), 'News: clear and steady.'),
            step(W.sent(PURPOSE[1][2][0]), 'A speech: confident, strong stress.'),
            step(W.sent(PURPOSE[2][2][0]), 'Suspense: slower and quieter.'),
            step(W.sent(PURPOSE[3][2][1]), 'A poem: pause at each slash.')
          ],
          guided: [function () { return purpose(1); }, function () { return textKind(1); }, purposeTf],
          check: [function () { return purpose(2); }, matchPurpose, purposeTf, function () { return textKind(2); }, function () { return purpose(2); }],
          coach: '<p>Listen to a short news clip, a speech and an audiobook. Ask: "How is the voice different, and why?"</p>',
          mistake: '<p>One voice for everything. Before reading aloud, ask: "Who is listening, and why?"</p>' }
      ]
    }],
    practice: [
      { id: 'phrasing', name: 'Reading in phrases', code: 'B2.3', gen: phrases },
      { id: 'marks', name: 'Marks and your voice', code: 'B2.3', gen: mark },
      { id: 'stress', name: 'Stress and meaning', code: 'B2.3', gen: stress },
      { id: 'pace', name: 'Pace', code: 'B2.3', gen: pace },
      { id: 'purpose', name: 'Voice and purpose', code: 'B2.3', gen: purpose }
    ],
    tasks: [
      { id: 'read-aloud', title: 'Read a passage aloud', code: 'B2.3', pic: W.icon('read'), say: 'Read this aloud to your grown-up. Read it once silently first.', text: T.show(T.radio),
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
    phrasing: [[1, 'first-break', firstBreak], [1, 'true-false', phraseTf], [2, 'count', countPhrases]],
    marks: [[1, 'which-sentence', markWhich], [1, 'true-false', markTf], [2, 'match', matchMarks]],
    stress: [[1, 'meaning', stressMeaning], [1, 'true-false', stressTf], [2, 'match', stressMatch]],
    pace: [[1, 'which-sentence', slowDown], [1, 'why', whySlow], [1, 'true-false', paceTf]],
    purpose: [[1, 'kind', textKind], [1, 'true-false', purposeTf], [2, 'match', matchPurpose]]
  });
})();
