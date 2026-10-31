/* Grade 6: reading fluently.
   Ontario 2023 Language, Grade 6:
   B2.3 "read a variety of texts fluently, with accuracy and appropriate pacing to support comprehension, and when reading aloud, adjust
   expression and intonation according to the purpose of reading"
   The computer checks knowing how to phrase, pace and express a text. Reading aloud itself is an activity with a grown-up.
   All sentences are written for this site. Answer checks: tests/verify/grade6-fluency.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* sentences split into meaningful phrases */
  var PHRASES = [['The old canoe', 'drifted slowly', 'across the lake.'], ['After the storm,', 'the whole town', 'helped clean up.'], ['My cousin from Iqaluit', 'sent us a photo', 'of the northern lights.'],
    ['When the bell rang,', 'the students', 'lined up quietly.'], ['Beside the river,', 'a great blue heron', 'stood perfectly still.'], ['If you finish early,', 'read a chapter', 'of your book.']];
  /* the same words, split in the wrong places: move every break one word later */
  function badSplit(p) {
    var words = p.join(' ').split(' '), cuts = [], n = 0;
    p.slice(0, -1).forEach(function (c) { n += c.split(' ').length; cuts.push(n + 1); });
    var out = [], from = 0;
    cuts.concat([words.length]).forEach(function (c) { if (c > from && c <= words.length) { out.push(words.slice(from, c).join(' ')); from = c; } });
    return out.join(' / ');
  }
  /* break after the first word of each phrase instead */
  function badSplit2(p) {
    var words = p.join(' ').split(' '), out = [], cur = [];
    words.forEach(function (w, i) { cur.push(w); if (i === 0 || i === words.length - 1 || (i % 2 === 1 && i < words.length - 2)) { out.push(cur.join(' ')); cur = []; } });
    return out.join(' / ');
  }
  /* [mark, an example, what your voice does] */
  var VOICE = [['?', 'Is the bus late?', 'rises at the end'], [',', 'First, wash your hands.', 'pauses briefly'], ['!', 'We won the final!', 'sounds strong and excited'],
    ['...', 'I opened the door and...', 'trails off, as if more is coming'], ['.', 'The lake was calm.', 'drops and stops']];
  /* [why you are reading, the pace that fits] */
  var PACE = [['the steps of a science experiment', 'slowly and carefully'], ['a favourite comic, just for fun', 'at a quick, easy pace'], ['a tense, scary part of a story aloud', 'slower, with pauses for effect'],
    ['a website, to find one fact', 'quickly, then slow down at the fact'], ['a poem to the class', 'steadily, with the rhythm of the lines']];
  /* [a line, how to say it] */
  var EXPRESS = [['“Watch out for the ice!” shouted Omar.', 'loud and urgent'], ['“I miss Grandma,” whispered Hana.', 'soft and sad'], ['“We did it!” cheered the team.', 'loud and joyful'],
    ['“Do I have to?” groaned Theo.', 'tired and unwilling'], ['“Who is there?” asked Noor nervously.', 'quiet and nervous'], ['“Welcome, everyone,” said the principal warmly.', 'calm and warm']];
  /* [sentence words, { stressed word: what it means }] */
  var STRESS = [[['I', 'did', 'not', 'eat', 'the', 'last', 'muffin.'], { I: 'Someone else ate it.', eat: 'I did something else with it.', last: 'I ate a different muffin.' }],
    [['Ava', 'said', 'the', 'test', 'is', 'on', 'Friday.'], { Ava: 'Ava said it, not someone else.', 'Friday.': 'Friday, not another day.', test: 'A test, not a quiz.' }],
    [['We', 'walked', 'to', 'the', 'park.'], { We: 'Us, not other people.', walked: 'We did not drive.', 'park.': 'The park, not somewhere else.' }]];

  function phrasing(lv) {
    var p = R.pick(PHRASES);
    return Q.one('Which way reads in <b>meaningful phrases</b>?', p.join(' / '), [badSplit(p)].concat(lv > 1 ? [badSplit2(p)] : []), {
      prompt: 'Read each one aloud. Which groups of words belong together?', hint: 'Each group should make sense on its own.',
      explain: W.sent(p.join(' / ')), meta: { k: 'g6-phrasing', s: p.join(' ') } });
  }
  function voice(lv) {
    var v = R.pick(VOICE);
    return Q.one('At the <b>' + v[0] + '</b>, your voice...', v[2], R.some(VOICE.filter(function (x) { return x !== v; }), lv > 1 ? 3 : 2).map(function (x) { return x[2]; }), {
      fig: W.sent(v[1]), hint: 'Read it aloud. What does your voice do at the end?', explain: v[0] + ' : your voice ' + v[2] + '.', meta: { k: 'g6-voice', mark: v[0] } });
  }
  function voiceMatch() {
    var v = R.some(VOICE, 3);
    return { q: 'Match each sentence to what your voice does.', type: 'match', pairs: v.map(function (x) { return [x[1], x[2]]; }), hint: 'Look at the last mark in each sentence.',
      explain: 'Punctuation tells your voice what to do.', meta: { k: 'g6-voice-match' } };
  }
  function pace(lv) {
    var p = R.pick(PACE);
    return Q.one('You are reading <b>' + p[0] + '</b>. Which pace fits?', p[1], R.some(PACE.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      prompt: 'Why are you reading it?', hint: 'Slow down when every detail matters.', explain: 'Your purpose sets your pace.', meta: { k: 'g6-pace', why: p[0] } });
  }
  function express(lv) {
    var e = R.pick(EXPRESS);
    return Q.one('How should this line sound?', e[1], R.some(EXPRESS.filter(function (x) { return x !== e; }), lv > 1 ? 3 : 2).map(function (x) { return x[1]; }), {
      fig: W.sent(e[0]), prompt: 'Look at the word that tells how it was said.', hint: 'Shouted, whispered, groaned: these words are clues.', explain: '<b>' + e[1] + '</b>', meta: { k: 'g6-express', line: e[0] } });
  }
  function expressMatch() {
    var e = R.some(EXPRESS, 3);
    return { q: 'Match each line to how it should sound.', type: 'match', pairs: e.map(function (x) { return [x[0], x[1]]; }), hint: 'Find the speaking word in each line.', explain: 'Speaking words like whispered and shouted tell you how.', meta: { k: 'g6-express-match' } };
  }
  function stress() {
    var s = R.pick(STRESS), keys = Object.keys(s[1]), w = R.pick(keys);
    return { q: 'Which word would you stress to mean: <b>' + s[1][w] + '</b>', type: 'tap', tiles: s[0], answer: s[0].indexOf(w),
      hint: 'Say the sentence, leaning on a different word each time.', explain: 'Stress <b>' + w.replace('.', '') + '</b>.', meta: { k: 'g6-stress', means: s[1][w] } };
  }
  function paceTf() {
    var p = R.pick(PACE), right = R.int(0, 1) === 1, said = right ? p[1] : R.pick(PACE.filter(function (x) { return x !== p; }))[1];
    return { q: Q.name() + ' says:', fig: W.sent('When I read ' + p[0] + ', I read ' + said + '.'), type: 'tf', answer: right,
      hint: 'Does that pace fit the purpose?', explain: 'For ' + p[0] + ': ' + p[1] + '.', meta: { k: 'g6-pace-tf', why: p[0], said: said } };
  }

  var READ = ['# The Ice Road', 'Every winter, when the lakes freeze solid, trucks drive north on roads made of ice.', 'The drivers go slowly. A fast truck can push a wave under the ice, and the wave can crack it.',
    'For a few weeks, the ice road brings fuel, food and building supplies to communities with no year-round road.', 'Then spring comes, the ice softens, and the road disappears until next year.'];
  var SCRIPT = ['NOOR: (whispering) Did you hear that?', 'KAI: Hear what? It is just the wind.', 'NOOR: No. Listen. Something is scratching at the door.', 'KAI: (slowly opening the door) It is... a very wet dog.', 'NOOR: (laughing) Well, let it in!'];

  Atlas.register('fluency', {
    lessons: [{
      id: 'phrasing', title: 'Phrasing and punctuation', sub: 'Read groups of words, and let the marks guide your voice.',
      concepts: [
        { slug: 'phrases', title: 'Read in meaningful phrases', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent('The / old / canoe / drifted / slowly...'), 'Word by word is hard to follow.'),
            step(W.sent('The old canoe / drifted slowly / across the lake.'), 'Words that belong together.'),
            step(W.sent('The old / canoe drifted / slowly across the / lake.'), 'Breaks in odd places blur the meaning.')
          ],
          guided: [function () { return phrasing(1); }, function () { return phrasing(1); }],
          check: [function () { return phrasing(2); }, function () { return phrasing(2); }],
          coach: '<p>Mark phrase breaks with light pencil slashes on a photocopy, then read it aloud together.</p>',
          mistake: '<p>Pausing at the end of every line of print instead of at the end of an idea.</p>' },
        { slug: 'marks', title: 'Punctuation guides your voice', exp: ['B2.3'], skill: 'phrasing',
          model: [
            step(W.sent('Is the bus late<mark class="hl">?</mark>'), 'Rise at the end.'),
            step(W.sent('First<mark class="hl">,</mark> wash your hands.'), 'A short pause.'),
            step(W.sent('I opened the door and<mark class="hl">...</mark>'), 'Trail off.')
          ],
          guided: [function () { return voice(1); }, voiceMatch],
          check: [function () { return voice(2); }, voiceMatch],
          coach: '<p>Read a sentence aloud wrongly on purpose (no pause, flat question). Ask the child to fix it.</p>',
          mistake: '<p>Racing through commas. A comma is a short breath.</p>' }
      ]
    }, {
      id: 'expression', title: 'Pace and expression', sub: 'Change how you read to fit the purpose.',
      concepts: [
        { slug: 'pace', title: 'Purpose sets the pace', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.means('read', 'science steps'), 'Slow. Every detail matters.'),
            step(W.means('star', 'a comic for fun'), 'Quick and easy.'),
            step(W.means('think', 'a tense scene, aloud'), 'Slower, with pauses.')
          ],
          guided: [function () { return pace(1); }, paceTf],
          check: [function () { return pace(2); }, paceTf],
          coach: '<p>Before reading, ask "Why am I reading this?" and agree on a pace together.</p>',
          mistake: '<p>Reading everything at one speed. Fast is not the same as fluent.</p>' },
        { slug: 'expression', title: 'Make the voice fit the words', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent('“Watch out for the ice!” <mark class="hl">shouted</mark> Omar.'), 'Loud and urgent.'),
            step(W.sent('“I miss Grandma,” <mark class="hl">whispered</mark> Hana.'), 'Soft and sad.')
          ],
          guided: [function () { return express(1); }, expressMatch],
          check: [function () { return express(2); }, expressMatch],
          coach: '<p>Take turns reading the same line in two ways. Ask: "Which one matches the word whispered?"</p>',
          mistake: '<p>Reading speech in a flat voice. Speaking words like groaned and cheered are stage directions.</p>' },
        { slug: 'stress', title: 'The stressed word changes the meaning', exp: ['B2.3'], skill: 'expression',
          model: [
            step(W.sent('<b>I</b> did not eat the last muffin.'), 'Someone else did.'),
            step(W.sent('I did not eat the <b>last</b> muffin.'), 'I ate a different one.')
          ],
          guided: [stress, stress],
          check: [stress, stress],
          coach: '<p>Play with one sentence. Say it five ways, leaning on a different word each time, and talk about how the meaning changes.</p>',
          mistake: '<p>Stressing every word the same, so the reader’s meaning is lost.</p>' }
      ]
    }],
    practice: [
      { id: 'phrasing', name: 'Phrasing and punctuation', code: 'B2.3', gen: phrasing },
      { id: 'expression', name: 'Pace and expression', code: 'B2.3', gen: express }
    ],
    tasks: [
      { id: 'read-aloud', title: 'Read aloud', code: 'B2.3', pic: W.icon('read'), say: 'Read this aloud. Make it sound like a news reporter.', text: W.passage('', READ),
        run: ['The child reads the passage silently first.', 'Then they read it aloud. Listen for phrasing, pace and expression, and whether they fix their own slips.', 'Reread once more, aiming to sound like a calm news reporter.'],
        rubric: ['Word by word, with many errors.', 'Mostly accurate, but choppy or rushed.', 'Accurate, in phrases, at a steady pace.', 'Accurate and smooth, with expression that fits a news report.'] },
      { id: 'script', title: 'Read a short script', code: 'B2.3', pic: W.icon('talk'), say: 'Read Noor or Kai. Follow the stage directions.', text: W.passage('Something at the Door', SCRIPT),
        run: ['Take one part each. Read the script twice, then swap parts.', 'Point out the stage directions in brackets: they tell you how to say the line.'],
        rubric: ['Reads the lines flatly.', 'Some expression, misses directions.', 'Follows the directions with clear expression.', 'Uses voice, pace and pauses to bring the character to life.'] },
      { id: 'one-minute', title: 'A one-minute read', code: 'B2.3', pic: W.icon('star'), say: 'Read a page of your own book for one minute.',
        run: ['Choose a page from a book the child is reading. Time one minute while they read aloud.', 'Count the words read correctly. Write it down with the date.', 'Do it again in a few weeks with a new page. Look for smoother reading, not just more words.'],
        rubric: ['Many stops and errors.', 'Some smooth parts, some stops.', 'Mostly smooth and accurate.', 'Smooth, accurate and expressive throughout.'],
        coach: '<p>Speed is a by-product of fluent reading, never the goal. Praise phrasing and self-correction.</p>' }
    ]
  });

  Q.shapes('fluency', {
    phrasing: [[1, 'voice', voice], [1, 'voice-match', voiceMatch], [2, 'stress', stress]],
    expression: [[1, 'pace', pace], [1, 'match', expressMatch], [2, 'pace-true-false', paceTf]]
  });
})();
