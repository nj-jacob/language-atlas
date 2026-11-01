/* Grade 5: reading fluently. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, B2.3 "read a variety of texts fluently, with accuracy and appropriate pacing to support comprehension,
   and when reading aloud, adjust expression and intonation according to the purpose of reading".
   The computer checks knowing what to do (which pace fits a text, where phrases break, which voice fits a purpose).
   Reading aloud itself is an activity with a grown-up, marked with a rubric.
   All passages and sentences are written for this site. Answer checks: tests/verify/grade5-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, T = Atlas.texts;

  var RQ = '’';
  /* texts to read slowly and carefully, and texts you can read at a quicker pace */
  var SLOW = ['the steps for a science experiment', 'a page of facts with many numbers', 'a math word problem', 'the rules of a new game', 'directions for a hike',
    'the steps of a recipe', 'a chart full of numbers', 'the directions on a medicine label', 'facts for a research project', 'the rules for a fire drill'];
  var FAST = ['a comic you have read before', 'a funny story, just for fun', 'a text message from a friend', 'a poem you know by heart', 'a list, to find one name',
    'a joke book', 'a menu, to find the pizza', 'a favourite picture book', 'a birthday card', 'a chapter you are rereading for fun'];
  var FIX = ['Slow down and reread the part.', 'Read faster to get to the end.', 'Skip the hard part.', 'Keep going and hope it makes sense.'];
  /* sentences split into good phrases: each part is read in one breath */
  var PHRASED = [['The tall girl', 'in the red coat', 'ran to the bus.'], ['After the storm,', 'the farmers', 'checked their fields.'], ['Before dinner,', 'Grandpa and I', 'walked along the river.'],
    ['When the bell rang,', 'everyone', 'hurried outside.'], ['The bus to the museum', 'leaves', 'at nine o' + RQ + 'clock.'], ['My cousin from Iqaluit', 'sent me', 'a photo of the bay.'],
    ['On a cold morning,', 'the canoe', 'slid across the lake.'], ['The girl with the drum', 'sang', 'a song for her elders.'], ['Under the old bridge,', 'two ducks', 'hid from the rain.'],
    ['At the end of the day,', 'the team', 'cleaned the arena.'], ['My little brother', 'lost his mitten', 'in the deep snow.'], ['If it stops raining,', 'we will go', 'to the beach.'],
    ['The students in Room 12', 'planted trees', 'behind the school.'], ['Every summer,', 'my family', 'visits our aunt in Halifax.']];
  /* [the voice that fits, a short name for it] */
  var VOICES = ['slow and quiet, to build suspense', 'fast and excited', 'soft and slow, to show sadness', 'clear and steady, so each step is easy to follow', 'loud and clear, for a big audience'];
  function short(v) { return v.split(',')[0]; }
  /* [a line, the voice that fits its purpose] */
  var LINES = [['Slowly, the door creaked open. Something moved in the dark.', 0], ['We won! We won the championship!', 1], ['The last leaf fell, and the garden was empty and still.', 2],
    ['Step 1: Measure 250 mL of water.', 3], ['Welcome, everyone, to the Grade 5 science fair!', 4], ['A shadow crept across the wall. Then, silence.', 0], ['The puck flew past the goalie. Goal!', 1],
    ['Step 2: Stir until the salt is gone.', 3], ['Footsteps. Closer. Closer still.', 0], ['Snow day! No school! Grab your sled!', 1], ['Old Max was gone, and his bowl sat empty by the door.', 2],
    ['First, fold the paper in half.', 3], ['Good morning, parents and students!', 4], ['She waved goodbye as the ferry pulled away for the last time.', 2], ['Please take your seats. The concert will now begin.', 4]];
  /* yes-or-no questions (the voice rises at the end) and statements (it falls) */
  var RISE = ['Is the library open today?', 'Did you bring your skates?', 'Can we leave at noon?', 'Are you coming to the powwow on Saturday?', 'Do you like maple syrup?',
    'Will it snow tonight?', 'Is your sister in Grade 3?', 'Can I borrow your ruler?', 'Did the ferry leave on time?', 'Are the berries ripe yet?'];
  var FALL = ['The library is open today.', 'I brought my skates.', 'We can leave at noon.', 'We are going to the powwow on Saturday.', 'I like maple syrup.',
    'It will snow tonight.', 'My sister is in Grade 3.', 'You can borrow my ruler.', 'The ferry left on time.', 'The berries are ripe now.'];

  function chunk(list) { return list.join(' / '); }
  /* the same words, split in the wrong places */
  function badChunk(list) {
    var words = list.join(' ').split(' '), out = [], i = 0, size = 2;
    while (i < words.length) { out.push(words.slice(i, i + size).join(' ')); i += size; size = size === 2 ? 3 : 2; }
    return out.join(' / ');
  }
  function robot(list) { return list.join(' ').split(' ').join(' / '); }

  /* ---------- pace ---------- */
  function pace(lv) {
    var slow = R.pick(SLOW), fast = R.some(FAST, lv > 1 ? 2 : 1);
    return Q.one('Which should you read <b>more slowly</b>?', slow, fast, { prompt: 'Which one has facts or steps you must not miss?',
      hint: 'Slow down for facts, numbers and steps.', explain: W.means('read', 'Facts, numbers and steps need a careful pace.'), meta: { k: 'g5-pace', slow: slow } });
  }
  function paceFast(lv) {
    var fast = R.pick(FAST), slow = R.some(SLOW, lv > 1 ? 2 : 1);
    return Q.one('Which can you read at a <b>quicker</b> pace?', fast, slow, { prompt: 'Which one is easy, familiar or just for fun?',
      hint: 'Easy, familiar or just for fun: a quicker pace is fine.', explain: W.means('star', 'Easy or familiar: a quicker pace is fine.'), meta: { k: 'g5-pace-fast', fast: fast } });
  }
  function paceSort(lv) {
    var s = R.some(SLOW, 2), f = R.some(FAST, lv > 1 ? 3 : 2);
    return Q.all('Pick every text you should read <b>slowly and carefully</b>.', s, f, { hint: 'Would missing one word cause a problem?', explain: W.means('read', 'Steps, facts and numbers: slow down.'), meta: { k: 'g5-pace-sort' } });
  }
  function paceTf(lv) {
    var slowOne = R.int(0, 1) === 1, t = R.pick(slowOne ? SLOW : FAST);
    return { q: Q.name() + ' says:', fig: W.sent('You should slow down when reading ' + t + '.'), type: 'tf', answer: slowOne,
      why: { options: ['It has facts or steps you must not miss.', 'It is easy or familiar, so a quicker pace is fine.'], answer: slowOne ? 0 : 1 },
      hint: 'Would missing a word cause a problem?', explain: slowOne ? 'Slow down: facts or steps.' : 'A quicker pace is fine.', meta: { k: 'g5-pace-tf', t: t } };
  }
  function paceFix(lv) {
    var t = R.pick(SLOW), n = Q.name();
    return Q.one(n + ' is reading ' + t + ' and loses track. What should ' + n + ' do?', FIX[0], FIX.slice(1, lv > 1 ? 4 : 3), { prompt: 'What do good readers do when it stops making sense?',
      hint: 'Speed only helps if you understand.', explain: W.means('again', FIX[0]), meta: { k: 'g5-pace-fix' } });
  }

  /* ---------- phrases ---------- */
  function phrases(lv) {
    var p = R.pick(PHRASED), wrong = [badChunk(p), robot(p)];
    return Q.one('Which shows the best way to read it in <b>phrases</b>?', chunk(p), wrong.slice(0, lv > 1 ? 2 : 1), { prompt: 'Which words belong together?',
      hint: 'Keep words that go together in one breath.', explain: W.sent(chunk(p)), meta: { k: 'g5-phrases', s: p.join(' ') } });
  }
  function onePhrase(lv) {
    var p = R.pick(PHRASED), good = R.pick(p.filter(function (x) { return x.split(' ').length > 1; })), bad = badChunk(p).split(' / ').filter(function (x) { return p.indexOf(x) < 0; });
    return Q.tiles('Which group of words is read in <b>one breath</b>?', good, R.some(bad, lv > 1 ? 2 : 1), { fig: W.sent(p.join(' ')), prompt: 'Which words belong together?',
      hint: 'Little words like "the" and "in" go with the words after them.', explain: W.sent(chunk(p)), meta: { k: 'g5-one-phrase', s: p.join(' ') } });
  }
  function phraseTf(lv) {
    var p = R.pick(PHRASED), right = R.int(0, 1) === 1, said = right ? chunk(p) : (R.int(0, 1) ? badChunk(p) : robot(p)), n = Q.name();
    return { q: n + ' pauses at each slash. Is this good phrasing?', fig: W.sent(said), type: 'tf', answer: right,
      why: { options: ['Words that belong together stay together.', 'It breaks up words that belong together.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud, pausing at each slash. Does it sound like talking?', explain: W.sent(chunk(p)), meta: { k: 'g5-phrase-tf', s: p.join(' '), said: said } };
  }
  function pauseAfter(lv) {
    var p = R.pick(PHRASED), words = p[0].replace(/,$/, '').split(' '), last = words[words.length - 1], seen = {};
    var wrong = words.slice(0, -1).concat([p[1].split(' ')[0]]).filter(function (w) { if (w === last || seen[w]) return false; seen[w] = 1; return true; });
    return Q.tiles('After which word should you take your <b>first</b> breath?', last, R.some(wrong, lv > 1 ? 3 : 2), { fig: W.sent(p.join(' ')),
      prompt: 'Which words belong together at the start?', hint: 'Little words like "the" and "in" go with the words after them.', explain: W.sent(chunk(p)), meta: { k: 'g5-pause-after', s: p.join(' ') } });
  }

  /* ---------- expression ---------- */
  function voice(lv) {
    var l = R.pick(LINES), wrong = VOICES.filter(function (v, i) { return i !== l[1]; });
    return Q.one('Which voice fits this line best?', VOICES[l[1]], R.some(wrong, lv > 1 ? 3 : 2), { fig: W.sent(l[0]), prompt: 'What is the line for: to scare, to celebrate, to teach?',
      hint: 'Think about why it was written.', explain: 'Read it <b>' + VOICES[l[1]] + '</b>.', meta: { k: 'g5-voice', line: l[0] } });
  }
  function whichLine(lv) {
    var v = R.int(0, VOICES.length - 1), right = R.pick(LINES.filter(function (l) { return l[1] === v; })), seen = {}, wrong = R.shuffle(LINES.filter(function (l) { return l[1] !== v; }))
      .filter(function (l) { if (seen[l[1]]) return false; seen[l[1]] = 1; return true; }).slice(0, lv > 1 ? 2 : 1);
    return Q.one('Which line would you read <b>' + VOICES[v] + '</b>?', right[0], wrong.map(function (l) { return l[0]; }), { prompt: 'Why was each line written?',
      hint: 'Think about the purpose of each line.', explain: W.sent(right[0]), meta: { k: 'g5-voice-line', v: short(VOICES[v]) } });
  }
  function voiceTf(lv) {
    var l = R.pick(LINES), right = R.int(0, 1) === 1, said = right ? VOICES[l[1]] : R.pick(VOICES.filter(function (v, i) { return i !== l[1]; }));
    return { q: Q.name() + ' plans to read this line <b>' + short(said) + '</b>.', fig: W.sent(l[0]), type: 'tf', answer: right,
      why: { options: ['That voice fits why the line was written.', 'That voice does not fit why the line was written.'], answer: right ? 0 : 1 },
      hint: 'Is the line meant to scare, celebrate, teach, show sadness or welcome a crowd?', explain: 'Read it <b>' + VOICES[l[1]] + '</b>.', meta: { k: 'g5-voice-tf', line: l[0], said: short(said) } };
  }
  function matchVoice(lv) {
    var vs = R.some([0, 1, 2, 3, 4], 3);
    return { q: 'Match each line to the voice that fits.', type: 'match', pairs: vs.map(function (v) { return [R.pick(LINES.filter(function (l) { return l[1] === v; }))[0], short(VOICES[v])]; }),
      hint: 'Why was each line written?', explain: 'The purpose of a line shapes your voice.', meta: { k: 'g5-voice-match' } };
  }

  /* ---------- up or down ---------- */
  function rise(lv) {
    var up = R.int(0, 1) === 1, s = R.pick(up ? RISE : FALL);
    return { q: 'What does your voice do at the end?', fig: W.sent(s), type: 'tap', tiles: ['It goes up.', 'It goes down.'], answer: up ? 0 : 1,
      prompt: 'Is it a yes-or-no question?', hint: 'A yes-or-no question goes up. A telling sentence goes down.', explain: up ? 'A yes-or-no question: up.' : 'A telling sentence: down.', meta: { k: 'g5-rise', s: s } };
  }
  function whichRises(lv) {
    var i = R.int(0, RISE.length - 1), wrong = [FALL[i]].concat(R.some(FALL.filter(function (s, j) { return j !== i; }), lv > 1 ? 2 : 1));
    return Q.one('In which sentence does your voice go <b>up</b> at the end?', RISE[i], wrong, { prompt: 'Find the yes-or-no question.',
      hint: 'Look at the first word and the end mark.', explain: W.sent(RISE[i]) + ' A yes-or-no question.', meta: { k: 'g5-rise-which' } });
  }
  function pickRise(lv) {
    var up = R.some(RISE, 2), down = R.some(FALL, lv > 1 ? 3 : 2);
    return Q.all('Pick every sentence where your voice goes <b>up</b> at the end.', up, down, { hint: 'Yes-or-no questions go up.', explain: 'The yes-or-no questions go up; telling sentences go down.', meta: { k: 'g5-rise-pick' } });
  }
  function riseTf(lv) {
    var up = R.int(0, 1) === 1, s = R.pick(up ? RISE : FALL), saysUp = R.int(0, 1) === 1;
    return { q: Q.name() + ' says: my voice goes <b>' + (saysUp ? 'up' : 'down') + '</b> at the end of this one.', fig: W.sent(s), type: 'tf', answer: saysUp === up,
      why: { options: ['It is a yes-or-no question.', 'It is a telling sentence.'], answer: up ? 0 : 1 },
      hint: 'Is it a yes-or-no question?', explain: up ? 'A yes-or-no question: up.' : 'A telling sentence: down.', meta: { k: 'g5-rise-tf', s: s, up: saysUp } };
  }

  Atlas.register('fluency', {
    full: true,
    lessons: [{
      id: 'pace-phrase', title: 'Pace and phrasing', sub: 'Read at the right speed, in groups of words.',
      concepts: [
        { slug: 'pace', title: 'Match your pace to the text', exp: ['B2.3'], skill: 'pace',
          model: [
            step(W.sent('Step 1: Measure 250 mL of water.'), 'Steps and numbers.'),
            step(W.means('read', 'slow and careful'), 'Missing one word would spoil the experiment.'),
            step(W.sent('Ha! Biscuit ate the pancakes again.'), 'A funny story you know well.'),
            step(W.means('star', 'a quicker pace is fine'), 'Missing a word does not matter much.'),
            step(W.means('again', 'lost? slow down and reread'))
          ],
          guided: [function () { return pace(1); }, function () { return paceFast(1); }, function () { return paceTf(1); }],
          check: [function () { return pace(2); }, function () { return paceFast(2); }, function () { return paceSort(2); }, function () { return paceFix(2); }, function () { return paceTf(2); }],
          coach: '<p>Show the child that good readers change speed. Read a recipe slowly aloud, then a comic quickly, and ask what changed.</p>',
          mistake: '<p>Thinking the fastest reader is the best reader. Speed only helps if you understand.</p>' },
        { slug: 'phrases', title: 'Read in phrases', exp: ['B2.3'], skill: 'phrases',
          model: [
            step(W.sent('The / tall / girl / in / the / red / coat'), 'Word by word sounds like a robot.'),
            step(W.sent('The tall girl / in the red coat / ran to the bus.'), 'Words that belong together, in one breath.'),
            step(W.sent('Under the / old bridge, two / ducks hid'), 'Second example. These breaks split the ducks from what they did.'),
            step(W.sent('Under the old bridge, / two ducks / hid from the rain.'), 'Where? Who? What did they do? One breath each.')
          ],
          guided: [function () { return phrases(1); }, function () { return onePhrase(1); }, function () { return phraseTf(1); }],
          check: [function () { return phrases(2); }, function () { return onePhrase(2); }, function () { return phraseTf(2); }, function () { return pauseAfter(2); }, function () { return phrases(3); }],
          coach: '<p>Copy a sentence and draw light slashes between the phrases together. Then read it, pausing only at the slashes.</p>',
          mistake: '<p>Pausing after little words like "the" or "in". They belong with the word after them.</p>' }
      ]
    }, {
      id: 'expression', title: 'Expression', sub: 'Your voice shows what the text means.',
      concepts: [
        { slug: 'purpose', title: 'Let the purpose shape your voice', exp: ['B2.3'], skill: 'voice',
          model: [
            step(W.sent('Slowly, the door creaked open.'), 'Written to scare.'),
            step(W.means('listen', 'slow and quiet'), 'The listener leans in.'),
            step(W.sent('We won the championship!'), 'Second example: written to celebrate.'),
            step(W.means('star', 'fast and excited'), 'The listener feels the joy.'),
            step(W.sent('Welcome, everyone, to the science fair!'), 'A big crowd: loud and clear.')
          ],
          guided: [function () { return voice(1); }, function () { return whichLine(1); }, function () { return voiceTf(1); }],
          check: [function () { return voice(2); }, function () { return whichLine(2); }, function () { return voiceTf(2); }, function () { return matchVoice(2); }, function () { return voice(3); }],
          coach: '<p>Read one line three ways (scary, excited, bored) and ask the child which fits the story.</p>',
          mistake: '<p>Reading everything in the same flat voice. Ask: "How would the character say it?"</p>' },
        { slug: 'intonation', title: 'Your voice rises and falls', exp: ['B2.3'], skill: 'intonation',
          model: [
            step(W.sent('Is the library open today?'), 'A yes-or-no question.'),
            step(W.sent('Is the library open <b>today? ↗</b>'), 'Up at the end.'),
            step(W.sent('The library is open today.'), 'Second example: the same words, now telling.'),
            step(W.sent('The library is open <b>today. ↘</b>'), 'Down at the end.')
          ],
          guided: [function () { return rise(1); }, function () { return whichRises(1); }, function () { return riseTf(1); }],
          check: [function () { return rise(2); }, function () { return whichRises(2); }, function () { return pickRise(2); }, function () { return riseTf(2); }, function () { return rise(3); }],
          coach: '<p>Hum the sentence without words. The child can hear the voice go up or down.</p>',
          mistake: '<p>Raising the voice at the end of every sentence. A telling sentence ends low.</p>' }
      ]
    }],
    practice: [
      { id: 'pace', name: 'Choosing a pace', code: 'B2.3', gen: pace },
      { id: 'phrases', name: 'Reading in phrases', code: 'B2.3', gen: phrases },
      { id: 'voice', name: 'A voice that fits the purpose', code: 'B2.3', gen: voice },
      { id: 'intonation', name: 'Up or down at the end', code: 'B2.3', gen: rise }
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
    pace: [[1, 'quicker', paceFast], [1, 'true-false', paceTf], [2, 'pick', paceSort], [2, 'lost', paceFix]],
    phrases: [[1, 'one-breath', onePhrase], [1, 'true-false', phraseTf], [2, 'first-pause', pauseAfter]],
    voice: [[1, 'which-line', whichLine], [1, 'true-false', voiceTf], [2, 'match', matchVoice]],
    intonation: [[1, 'which-rises', whichRises], [1, 'true-false', riseTf], [2, 'pick', pickRise]]
  });
})();
