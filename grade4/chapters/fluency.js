/* Grade 4: reading smoothly.
   Ontario 2023 Language, Grade 4, B2.3 "read a variety of texts fluently, with accuracy and appropriate pacing to support
   comprehension, and when reading aloud, adjust expression and intonation according to the purpose of reading".
   The computer checks the parts that are about knowing what to do (the pace a text needs, where phrases break, the voice a
   purpose needs, which word to stress). Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade4-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, OQ = '“', CQ = '”';

  var SLOW = 'slowly and carefully', TALK = 'at a talking pace';
  /* short texts and the pace they need: [text, pace, why] */
  var PACE = [
    [W.passage('Set up the tent', ['1. Lay the tent flat.', '2. Push the poles through the sleeves.', '3. Peg each corner down.']), SLOW, 'steps'],
    [W.passage('Make a bird feeder', ['1. Spread seed butter on a pine cone.', '2. Roll it in birdseed.', '3. Hang it from a branch.']), SLOW, 'steps'],
    [W.passage('Fire drill', ['1. Stop what you are doing.', '2. Line up at the door.', '3. Walk to the field and wait.']), SLOW, 'steps'],
    [W.passage('Blue whales', ['A blue whale can be 30 m long. It can weigh 150 000 kg.']), SLOW, 'facts'],
    [W.passage('Photosynthesis', ['Plants use sunlight, water and air to make their own food.']), SLOW, 'facts'],
    [W.passage('Beavers', ['A beaver can stay under water for 15 minutes. Its front teeth never stop growing.']), SLOW, 'facts'],
    [W.passage('Canada', ['Canada has 10 provinces and 3 territories. Its capital is Ottawa.']), SLOW, 'facts'],
    [W.passage('', ['Liam grinned. ' + OQ + 'Race you to the dock!' + CQ]), TALK, 'story'],
    [W.passage('', ['The puppy chased its tail around and around until it flopped down.']), TALK, 'story'],
    [W.passage('', ['Grandma laughed so hard that her glasses slid down her nose.']), TALK, 'story'],
    [W.passage('', ['Ayaan tripped on the dock and landed in the lake with a splash.']), TALK, 'story'],
    [W.passage('', ['Kokum handed me the warm bannock and winked.']), TALK, 'story'],
    [W.passage('', [OQ + 'Look!' + CQ + ' shouted Priya. ' + OQ + 'A moose!' + CQ]), TALK, 'story'],
    [W.passage('', ['Our cat sat in the laundry basket and refused to move.']), TALK, 'story']
  ];
  var WHY = { steps: 'it has steps to follow', facts: 'it has new facts and numbers', story: 'it is a story moment' };
  /* good phrases in longer sentences */
  var PHRASED = [['When the bell rang,', 'we ran outside.'], ['After the storm,', 'branches covered', 'our trail.'], ['My cousin in Iqaluit', 'sent us a photo', 'of the northern lights.'],
    ['The tall corn', 'gives the beans', 'a pole to climb.'], ['If you finish early,', 'read a book', 'quietly.'], ['Before we paddled out,', 'Dad checked our life jackets.'],
    ['While the kettle boiled,', 'Nana set the table.'], ['On the first day of spring,', 'the geese', 'flew home.'], ['Under the old dock,', 'a family of ducks', 'made a nest.'],
    ['The moose', 'stepped slowly', 'into the cold lake.'], ['My friend Sofia', 'plays the violin', 'in the school band.'], ['As the sun went down,', 'the loons', 'began to call.']];
  /* a phrase never ends on one of these: they belong with the words after them */
  var JOINS = ['the', 'a', 'my', 'our', 'to', 'of', 'in', 'when', 'after', 'before', 'if', 'tall', 'we', 'you'];
  var HABITS = [['I slow down when I read new facts.', true], ['I read instructions as fast as I can.', false], ['I slow down at a hard word, then speed up again.', true],
    ['I read a story word by word, like a robot.', false], ['I go back and reread when I lose the meaning.', true], ['I keep going even when nothing makes sense.', false],
    ['I slow down for numbers, like 150 000.', true], ['I read every text at the same speed.', false], ['I reread a step before I do it.', true], ['I skip the hard words to finish first.', false]];
  /* [what you read aloud, the voice it needs] */
  var VOICES = [['a news report', 'clear and steady'], ['a scary story', 'slow and quiet'], ['a poem', 'gentle, following the rhythm'], ['a speech asking for a change', 'strong and sure'],
    ['steps for an experiment', 'calm, with a pause after each step'], ['a joke', 'light, with a pause before the funny part'], ['a letter from a friend', 'warm and friendly'],
    ['a sports announcement', 'loud and excited']];
  /* [a short text, the kind of text it is (as in VOICES)] */
  var VTEXT = [['Snow closed every school in Thunder Bay today.', 'a news report'], ['The library will open a new wing on Monday.', 'a news report'],
    ['The door creaked open. Nobody was there.', 'a scary story'], ['Something cold touched my neck in the dark.', 'a scary story'],
    ['Soft snow falls, / slow snow falls, / on the quiet pines.', 'a poem'], ['The river hums, / the river sings, / all the way to sea.', 'a poem'],
    ['We need a crosswalk by our school. Please help us get one!', 'a speech asking for a change'], ['Our park needs more trees. Let' + '’' + 's plant them together!', 'a speech asking for a change'],
    ['1. Fill a cup with water. 2. Add one drop of food colouring.', 'steps for an experiment'], ['1. Put the ice cube on a plate. 2. Time how long it takes to melt.', 'steps for an experiment'],
    ['Why did the student eat her homework? The teacher said it was a piece of cake!', 'a joke'], ['What has hands but cannot clap? A clock!', 'a joke'],
    ['Dear Mia, I miss you! Camp is great, and I learned to paddle.', 'a letter from a friend'], ['Hi Ravi, thank you for the book. I read it in two days!', 'a letter from a friend'],
    ['And he scores! The crowd is on its feet!', 'a sports announcement'], ['She crosses the line first! A new school record!', 'a sports announcement']];
  /* [sentence, what you mean, the word to stress] */
  var STRESS = [['Can you bring the blue mitts?', 'not the red ones', 'blue'], ['Can you bring the blue mitts?', 'not the hat', 'mitts'], ['Can you bring the blue mitts?', 'not your brother', 'you'],
    ['We leave at seven tonight.', 'not at eight', 'seven'], ['We leave at seven tonight.', 'not tomorrow', 'tonight'], ['Mei has two cats.', 'not three', 'two'], ['Mei has two cats.', 'not dogs', 'cats'], ['Mei has two cats.', 'not Omar', 'Mei'],
    ['Jun wants the big sled.', 'not the small one', 'big'], ['Jun wants the big sled.', 'not Ana', 'Jun'], ['Jun wants the big sled.', 'not the skates', 'sled']];
  var ENDS = [['Are you coming to the game?', 'up'], ['Is the lake frozen yet?', 'up'], ['Did you feed the dog?', 'up'], ['Can we go skating?', 'up'], ['Do you like maple syrup?', 'up'], ['Is it raining?', 'up'],
    ['The lake is frozen.', 'down'], ['I fed the dog.', 'down'], ['We are going to the game.', 'down'], ['We can go skating.', 'down'], ['I like maple syrup.', 'down'], ['It is raining.', 'down']];

  /* ---------- question makers ---------- */
  function pace() {
    var p = R.pick(PACE);
    return Q.tiles('How should you read this?', p[1], [p[1] === SLOW ? TALK : SLOW], { fig: p[0], prompt: 'Is it new facts or steps, or is it a story?',
      hint: 'New facts and steps: slow down. A story: a talking pace.', explain: 'Read it <b>' + p[1] + '</b>.', meta: { k: 'g4-pace' } });
  }
  function habit() {
    var h = R.pick(HABITS);
    return { q: Q.name() + ' says:', fig: W.sent(h[0]), type: 'tf', answer: h[1], why: { options: ['Good readers change their pace to keep the meaning.', 'Reading faster is always better.'], answer: 0 },
      hint: 'Does it help the reader understand?', explain: 'Change your pace to keep the meaning.', meta: { k: 'g4-pace-habit', s: h[0] } };
  }
  function badBreaks(p) {
    var words = p.join(' ').split(' '), spots = [];
    words.forEach(function (w, i) { if (i < words.length - 1 && JOINS.indexOf(w.toLowerCase()) >= 0) spots.push(i); });
    return R.shuffle(spots).slice(0, 2).map(function (i) { return words.slice(0, i + 1).join(' ') + ' / ' + words.slice(i + 1).join(' '); });
  }
  function phrases(lv) {
    var p = R.pick(PHRASED);
    return Q.one('Which way reads in <b>smooth phrases</b>?', p.join(' / '), badBreaks(p).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Read each one aloud. Which sounds like talking?', hint: 'Small words like "the" and "when" go with the words after them.', explain: W.sent(p.join(' / ')), meta: { k: 'g4-phrases' } });
  }
  function pause() {
    var p = R.pick(PHRASED.filter(function (x) { var w = x.join(' ').split(' '); return /,$/.test(x[0]) && w.every(function (y, i) { return w.indexOf(y) === i; }); })), words = p.join(' ').split(' ');
    return { q: 'Where do you pause? Tap the word just before the pause.', fig: W.sent(p.join(' ')), type: 'tap', tiles: words, answer: words.findIndex(function (w) { return /,$/.test(w); }),
      hint: 'Look for a comma.', explain: 'Pause at the comma, then read the rest in one breath.', meta: { k: 'g4-pause' } };
  }
  function voiceFor(lv) {
    var v = R.pick(VOICES);
    return Q.one('You are reading <b>' + v[0] + '</b> aloud. How should you sound?', v[1], R.some(VOICES.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'What is it for? Who is listening?', hint: 'Think about why it was written.', explain: v[0].charAt(0).toUpperCase() + v[0].slice(1) + ': <b>' + v[1] + '</b>.', meta: { k: 'g4-voice-for', p: v[0] } });
  }
  function matchVoice() {
    var vs = R.some(VOICES, 3);
    return { q: 'Match each text to the voice it needs.', type: 'match', pairs: vs.map(function (v) { return [v[0], v[1]]; }), hint: 'Why was each one written?', explain: 'The purpose decides the voice.', meta: { k: 'g4-match-voice' } };
  }
  function stress() {
    var s = R.pick(STRESS), words = s[0].replace(/[.?]$/, '').split(' ');
    return { q: 'You mean <b>' + s[1] + '</b>. Which word do you say a little louder?', fig: W.sent(s[0]), type: 'tap', tiles: words, answer: words.indexOf(s[2]),
      prompt: 'Which word are you comparing?', hint: 'Stress the word that is different.', explain: W.sent(s[0].replace(s[2], '<b>' + s[2].toUpperCase() + '</b>')), meta: { k: 'g4-stress', s: s[0], mean: s[1] } };
  }
  function rise() {
    var e = R.pick(ENDS);
    return Q.tiles('At the end, does your voice go <b>up</b> or <b>down</b>?', e[1], [e[1] === 'up' ? 'down' : 'up'], { fig: W.sent(e[0]),
      hint: 'A yes-or-no question goes up. A telling sentence goes down.', explain: 'Your voice goes <b>' + e[1] + '</b>.', meta: { k: 'g4-rise', s: e[0] } });
  }

  function paceTf() {
    var p = R.pick(PACE), said = R.pick([SLOW, TALK]);
    return { q: 'True or false? Read this <b>' + said + '</b>.', fig: p[0], type: 'tf', answer: said === p[1], why: { options: ['Steps and new facts need a slow pace.', 'Every text needs the same pace.'], answer: 0 },
      hint: 'Is it steps, new facts, or a story?', explain: 'Read it <b>' + p[1] + '</b>: ' + WHY[p[2]] + '.', meta: { k: 'g4-pace-tf', said: said } };
  }
  function paceWhy() {
    var p = R.pick(PACE.filter(function (x) { return x[1] === SLOW; }));
    return Q.tiles('Why read this <b>slowly</b>?', WHY[p[2]], [WHY.story, WHY[p[2] === 'steps' ? 'facts' : 'steps']], { fig: p[0],
      hint: 'Are there numbers, or a list of steps?', explain: 'Slow down: ' + WHY[p[2]] + '.', meta: { k: 'g4-pace-why' } });
  }
  function paceSort() {
    var slow = R.some(PACE.filter(function (x) { return x[1] === SLOW; }), 2), talk = R.some(PACE.filter(function (x) { return x[1] === TALK; }), 2);
    return Q.all('Pick every text you should read <b>slowly</b>.', slow.map(function (x) { return x[0]; }), talk.map(function (x) { return x[0]; }), {
      hint: 'Steps and new facts: slow down.', explain: 'Steps and new facts need a slow pace. A story moment can go at a talking pace.', meta: { k: 'g4-pace-sort' } });
  }
  function phraseTf() {
    var p = R.pick(PHRASED), right = R.int(0, 1) === 1, shown = right ? p.join(' / ') : badBreaks(p)[0];
    return { q: 'True or false? This reads in smooth phrases.', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['Small words like "the" go with the words after them.', 'You can pause after any word.'], answer: 0 },
      hint: 'Read it aloud. Does a phrase end on a small word like "the"?', explain: W.sent(p.join(' / ')), meta: { k: 'g4-phrase-tf', shown: shown } };
  }
  function phraseOrder() {
    var p = R.pick(PHRASED.filter(function (x) { return x.length === 3; }));
    return { q: 'Put the phrases in order to make the sentence.', type: 'order', items: p, hint: 'Which phrase starts with a capital letter?', explain: W.sent(p.join(' / ')), meta: { k: 'g4-phrase-order' } };
  }
  function voiceTf() {
    var v = R.pick(VOICES), right = R.int(0, 1) === 1, said = right ? v[1] : R.pick(VOICES.filter(function (x) { return x !== v; }))[1];
    return { q: 'True or false? Read <b>' + v[0] + '</b> in a voice that is <b>' + said + '</b>.', type: 'tf', answer: right, why: { options: ['The purpose of the text decides the voice.', 'Every text uses the same voice.'], answer: 0 },
      hint: 'What is it for?', explain: v[0].charAt(0).toUpperCase() + v[0].slice(1) + ': <b>' + v[1] + '</b>.', meta: { k: 'g4-voice-tf', p: v[0], said: said } };
  }
  function voiceOf(kind) { return VOICES.filter(function (v) { return v[0] === kind; })[0][1]; }
  function voiceText(lv) {
    var t = R.pick(VTEXT), o = R.some(VOICES.filter(function (v) { return v[0] !== t[1]; }), lv > 1 ? 3 : 2);
    return Q.one('Read this aloud. How should you sound?', voiceOf(t[1]), o.map(function (v) { return v[1]; }), { fig: W.sent(t[0]), prompt: 'What kind of text is it?',
      hint: 'Is it news, a story, a poem, a speech, steps, a joke, a letter or a game?', explain: 'It is ' + t[1] + ': <b>' + voiceOf(t[1]) + '</b>.', meta: { k: 'g4-voice-text', s: t[0] } });
  }
  function stressMean() {
    var s = R.pick(STRESS), others = STRESS.filter(function (x) { return x[0] === s[0] && x !== s; });
    return Q.one('You say the <b>bold</b> word a little louder. What do you mean?', s[1], others.map(function (x) { return x[1]; }), {
      fig: W.sent(s[0].replace(s[2], '<b>' + s[2].toUpperCase() + '</b>')), hint: 'The loud word is the one being compared.', explain: W.sent(s[0].replace(s[2], '<b>' + s[2].toUpperCase() + '</b>')) + ' means ' + s[1] + '.',
      meta: { k: 'g4-stress-mean', s: s[0], w: s[2] } });
  }
  function riseSort() {
    var up = R.some(ENDS.filter(function (e) { return e[1] === 'up'; }), 2), down = R.some(ENDS.filter(function (e) { return e[1] === 'down'; }), 2);
    return Q.all('Pick every sentence where your voice goes <b>up</b> at the end.', up.map(function (e) { return e[0]; }), down.map(function (e) { return e[0]; }), {
      hint: 'A yes-or-no question goes up.', explain: 'Yes-or-no questions go up. Telling sentences go down.', meta: { k: 'g4-rise-sort' } });
  }

  var PASSAGES = {
    trail: ['Town Opens New Trail', ['Riverbend opened a new walking trail on Saturday.', 'The trail is 5 km long and follows the river to the old mill.',
      'Mayor Diaz cut a green ribbon at the start. ' + OQ + 'This trail belongs to everyone,' + CQ + ' she said.', 'Benches and signs about local birds line the path.']],
    cabin: ['The Noise at the Cabin', ['The lights were out, and the cabin was silent.', 'Then Zara heard it: scratch, scratch, scratch.', OQ + 'Did you hear that?' + CQ + ' she whispered.',
      'Her brother sat up. ' + OQ + 'It' + '’' + 's just the wind,' + CQ + ' he said. But he did not sound sure.', 'Zara pointed her flashlight at the window. Two bright eyes looked back. A raccoon!']]
  };

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'pace', title: 'Pace and phrasing', sub: 'Read at the right speed, in phrases.',
      concepts: [
        { slug: 'pace', title: 'Set your pace for the text', exp: ['B2.3'], skill: 'pacing',
          model: [
            step(PACE[3][0], 'New facts and numbers.'),
            step(W.means('read', 'Slow down. Let each number sink in.')),
            step(PACE[0][0], 'Steps to follow.'),
            step(W.means('read', 'Slow down. Read a step, then do it.')),
            step(PACE[7][0], 'A story moment.'),
            step(W.means('talk', 'A talking pace, like you are telling it.'))
          ],
          guided: [pace, habit, paceWhy],
          check: [pace, paceTf, habit, paceSort, paceWhy],
          coach: '<p>Fluency is not speed. Praise the child for slowing down at a hard part and then picking up again.</p>',
          mistake: '<p>Racing through information texts. Ask "What did you just learn?" after each part.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent('When the bell rang, we ran outside.'), 'Find the comma.'),
            step(W.sent('When the bell rang, / we ran outside.'), 'Two phrases: pause at the comma.'),
            step(W.sent('When the / bell rang, we / ran outside.'), 'Choppy: "the" goes with "bell".'),
            step(W.sent('The moose stepped slowly into the cold lake.'), 'No comma here.'),
            step(W.sent('The moose / stepped slowly / into the cold lake.'), 'Group the words that go together.')
          ],
          guided: [function () { return phrases(1); }, pause, phraseTf],
          check: [function () { return phrases(2); }, pause, phraseTf, phraseOrder, function () { return phrases(2); }],
          coach: '<p>Draw a light pencil scoop under each phrase in a longer sentence. Read a phrase; the child echoes it.</p>',
          mistake: '<p>Pausing at the end of every line in a book. Pause at punctuation, not at the edge of the page.</p>' }
      ]
    }, {
      id: 'expression', title: 'Expression and intonation', sub: 'Let the purpose guide your voice.',
      concepts: [
        { slug: 'purpose', title: 'Fit your voice to the purpose', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.passage(PASSAGES.trail[0], PASSAGES.trail[1].slice(0, 2)), 'A news report.'),
            step(W.means('talk', 'Clear and steady, like a reporter.')),
            step(W.passage(PASSAGES.cabin[0], PASSAGES.cabin[1].slice(0, 2)), 'A scary story.'),
            step(W.means('talk', 'Slow and quiet. Build the suspense.')),
            step(W.icon('think'), 'First ask: what is it for?')
          ],
          guided: [function () { return voiceFor(1); }, function () { return voiceText(1); }, matchVoice],
          check: [function () { return voiceFor(2); }, function () { return voiceText(2); }, voiceTf, matchVoice, function () { return voiceText(2); }],
          coach: '<p>Read one paragraph "as a news reader" and then "as a storyteller". Ask which fits the text better, and why.</p>',
          mistake: '<p>Using one voice for every text. Before reading aloud, name the purpose first.</p>' },
        { slug: 'stress', title: 'Stress the word that matters', exp: ['B2.3'], skill: 'stress',
          model: [
            step(W.sent('Can you bring the <b>BLUE</b> mitts?'), 'Not the red ones.'),
            step(W.sent('Can you bring the blue <b>MITTS</b>?'), 'Not the hat.'),
            step(W.sent('Can <b>YOU</b> bring the blue mitts?'), 'Not your brother.'),
            step(W.sent('Is the lake frozen yet? &uarr;'), 'A yes-or-no question: your voice goes up.'),
            step(W.sent('The lake is frozen. &darr;'), 'A telling sentence: it goes down.')
          ],
          guided: [stress, stressMean, rise],
          check: [stress, stressMean, rise, riseSort, stress],
          coach: '<p>Say one sentence four ways, stressing a different word each time. Ask the child what each one means.</p>',
          mistake: '<p>Stressing every word, or none. One stressed word carries the meaning.</p>' }
      ]
    }],
    practice: [
      { id: 'pacing', name: 'Pace', code: 'B2.3', gen: pace },
      { id: 'phrasing', name: 'Phrasing', code: 'B2.3', gen: phrases },
      { id: 'expression', name: 'Voice for the purpose', code: 'B2.3', gen: voiceFor },
      { id: 'stress', name: 'Stress and intonation', code: 'B2.3', gen: stress }
    ],
    tasks: [
      { id: 'read-news', title: 'Read aloud: a news report', code: 'B2.3', pic: W.icon('read'), text: W.passage(PASSAGES.trail[0], PASSAGES.trail[1]), say: 'Read it aloud like a news reporter.',
        run: ['Let the child read the report silently first.', 'Then the child reads it aloud to you, clearly and steadily. Note any words that were tricky; do not correct mid-sentence.', 'Ask: "What happened? Who said what?"'],
        rubric: ['Many words are tricky; reads word by word.', 'Mostly accurate; some phrasing; voice does not fit a report yet.', 'Accurate, in phrases, with a clear, steady reporter' + '’' + 's voice.', 'Smooth and accurate; changes voice for the mayor' + '’' + 's words.'],
        coach: '<p>A good Grade 4 pace sounds like a calm person explaining something. Accuracy and phrasing matter more than speed.</p>' },
      { id: 'read-story', title: 'Read it three times: a scary story', code: 'B2.3', pic: W.icon('read'), text: W.passage(PASSAGES.cabin[0], PASSAGES.cabin[1]), say: 'Read it three times. Build the suspense.',
        run: ['Read the story to the child first, slowly and quietly, speeding up at the end.', 'The child reads it three times, a little smoother each time.', 'After the third reading, ask: "Where did you slow down? Where did your voice change?"'],
        rubric: ['Still word by word after three readings.', 'A little smoother by the third reading.', 'Clearly smoother; whispers and pauses to build suspense.', 'Smooth and expressive; changes voice for each character and the surprise.'] }
    ]
  });

  Q.shapes('fluency', {
    pacing: [[1, 'habit', habit], [1, 'why', paceWhy], [1, 'sort', paceSort], [2, 'true-false', paceTf]],
    phrasing: [[1, 'pause', pause], [1, 'true-false', phraseTf], [1, 'order', phraseOrder], [2, 'phrases', phrases]],
    expression: [[1, 'match', matchVoice], [1, 'text', voiceText], [2, 'true-false', voiceTf], [2, 'voice', voiceFor]],
    stress: [[1, 'meaning', stressMean], [1, 'rise', rise], [1, 'sort', riseSort], [2, 'stress', stress]]
  });
})();
