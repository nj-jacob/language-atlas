/* Grade 1: sentences.
   Ontario 2023 Language, Grade 1:
   B3.1 identify and construct simple and compound sentences, including declarative, imperative, interrogative, and
        exclamatory sentences (here: telling, command, asking and strong feeling sentences, complete sentences, and joining
        two sentences with "and").
   B3.3 use their understanding of the meaning and function of capitalization and punctuation to communicate meaning clearly,
        including the use of a capital letter at the beginning of a sentence and the appropriate punctuation mark at the end.
   All sentences are written for this site. Answer checks: tests/verify/grade1-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q;

  /* sentences that tell (end with a period) and sentences that ask (end with a question mark) */
  var TELL = ['We went to the park.', 'Amara has a red hat.', 'The snow is cold.', 'Kai likes to read.', 'My dog can run fast.', 'I like to paint.',
    'Theo has a blue kite.', 'We had bannock and jam.', 'Noor fed the cat.', 'The bus is big.', 'Sam sat on the dock.', 'A moose is in the lake.',
    'Mei can ride a bike.', 'The leaves are red.', 'Dad made soup.', 'We saw a loon.'];
  var ASK = ['Can you see the moose?', 'Is it time for lunch?', 'Did you hear the loon?', 'Do you like snow?', 'Where is my hat?',
    'Can we go to the rink?', 'Is the soup hot?', 'Who has the ball?', 'What is in the box?', 'Are you cold?'];
  /* short sentences whose word cards fit together only one way */
  var BUILD = ['Noor fed the cat.', 'Dad made soup.', 'We saw a loon.', 'Kai likes to read.', 'The bus is big.', 'Mei can ride a bike.', 'Are you cold?', 'Who has the ball?'];

  function any() { return R.pick(TELL.concat(ASK)); }
  function noCap(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  function noEnd(s) { return s.slice(0, -1); }
  var W = Atlas.W, sent = W.sent, step = W.step;
  function hlFirst(s) { return Atlas.W.hl(s, 0, 1); }
  function hlEnd(s) { return Atlas.W.hl(s, s.length - 1, s.length); }

  /* ---------- question makers (each sets meta.k for its answer check) ---------- */
  /* Which sentence is written the right way? focus: 'cap', 'end' or 'both'; n: number of options */
  function rightWay(focus, n) {
    var s = focus === 'end' ? R.pick(TELL) : any(), wrong = focus === 'cap' ? [noCap(s)] : focus === 'end' ? [noEnd(s)] : R.shuffle([noCap(s), noEnd(s), noCap(noEnd(s))]);
    var o = R.mc(s, wrong.slice(0, n - 1));
    return { q: 'Which sentence is written the right way?', type: 'mc', options: o.options, answer: o.answer,
      prompt: focus === 'end' ? 'Look at the end of each sentence. Is there a mark?' : 'Look at the first letter of each sentence. Is it a capital?',
      hint: 'Check the first letter, then check the end.', explain: sent(hlEnd(hlFirst(s))) + ' starts with a capital letter and ends with a mark.',
      steps: ['Look at the first letter. A sentence starts with a capital letter.', 'Look at the end. A sentence ends with a period or a question mark.'],
      meta: { k: 'g1-right-way' } };
  }
  /* Which mark goes at the end? */
  function endMark() {
    var s = R.pick(R.pick([TELL, ASK])), mark = s.slice(-1), tiles = ['.', '?'];
    return { q: 'Which mark goes at the end of this sentence?', fig: sent(noEnd(s) + ' ___'), type: 'tap', tiles: tiles, answer: tiles.indexOf(mark),
      answerText: mark === '?' ? 'a question mark ( ? )' : 'a period ( . )',
      prompt: 'Does this sentence tell something, or ask something?',
      hint: 'Does it tell, or does it ask?', explain: mark === '?' ? 'It asks something, so it ends with a question mark.' : 'It tells something, so it ends with a period.',
      steps: ['Read the sentence.', 'A telling sentence ends with a period ( . ). An asking sentence ends with a question mark ( ? ).'],
      meta: { k: 'g1-end-mark', words: noEnd(s) } };
  }
  /* A child wrote a sentence: true or false, it is written the right way? Then why.
     kinds: which versions to show (0 right, 1 no capital, 2 no end mark); all three unless given. */
  var WHY = ['It starts with a capital letter and ends with a mark.', 'It needs a capital letter at the start.', 'It needs a mark at the end.'];
  function fixTf(lv, kinds) {
    var s = any(), kind = R.pick(kinds || [0, 1, 2]), shown = [s, noCap(s), noEnd(s)][kind];
    return { q: Q.name() + ' wrote this sentence. Is it written the right way?', fig: sent(shown), type: 'tf', answer: kind === 0,
      why: { options: WHY.slice(), answer: kind },
      hint: 'Look at the first letter and the last mark.', explain: 'The right way: ' + sent(hlEnd(hlFirst(s))),
      steps: ['Is the first letter a capital?', 'Is there a period or question mark at the end?'],
      meta: { k: 'g1-fix-tf', shown: shown } };
  }
  /* Put the word cards in order. The capital shows the first word; the mark shows the last word. */
  function build() {
    var s = R.pick(BUILD);
    return { q: 'Put the words in order to make a sentence.', type: 'order', items: s.split(' '),
      hint: 'The word with the capital letter goes first. The word with the mark goes last.', explain: sent(s),
      steps: ['Find the word with a capital letter. It goes first.', 'Find the word with the end mark. It goes last.', 'Put the other words in between so it makes sense.'],
      meta: { k: 'g1-build' } };
  }
  /* Pick every sentence written the right way */
  function pickAll() {
    var picks = R.some(TELL.concat(ASK), 4), nRight = R.int(1, 3);
    var options = picks.map(function (s, i) { return i < nRight ? s : R.pick([noCap, noEnd])(s); });
    var order = R.shuffle([0, 1, 2, 3]);
    return { q: 'Pick every sentence that is written the right way.', type: 'pick', options: order.map(function (i) { return options[i]; }),
      answer: order.map(function (i, j) { return i < nRight ? j : -1; }).filter(function (j) { return j >= 0; }),
      hint: 'Check each one: a capital at the start, a mark at the end.', explain: 'Each right one starts with a capital letter and ends with a mark.',
      meta: { k: 'g1-pick' } };
  }


  /* ---------- kinds of sentences (B3.1) ---------- */
  var KINDS = { telling: TELL.slice(0, 10), asking: ASK.slice(0, 8),
    command: ['Sit down, please.', 'Close the door.', 'Put on your boots.', 'Wash your hands.', 'Bring your library book.', 'Please pass the bannock.', 'Feed the cat.', 'Turn off the light.'],
    'strong feeling': ['We won!', 'I love this song!', 'That is a huge moose!', 'Wow, look at the snow!', 'Ouch, that hurts!', 'Hooray, it is my birthday!'] };
  var KNAMES = Object.keys(KINDS);
  var KWHAT = { telling: 'It tells something. It ends with a period.', asking: 'It asks something. It ends with a question mark.',
    command: 'It tells someone to do something.', 'strong feeling': 'It shows a strong feeling. It ends with an exclamation mark.' };
  /* complete sentences: [who or what, what they do] */
  var FULL = [['The dog', 'ran to the park.'], ['My sister', 'likes to swim.'], ['Grandma', 'baked a pie.'], ['The loon', 'dove under the water.'], ['Omar', 'kicked the ball.'], ['The bus', 'stopped at the corner.']];
  /* two sentences to join with and */
  var JOIN = [['I have a cat.', 'Kai has two dogs.'], ['Mom drove the car.', 'Dad sang songs.'], ['Hana picked red.', 'Sofia chose blue.'], ['We went skating.', 'Amara made hot cocoa.'],
    ['I read a book.', 'Liam drew pictures.'], ['The sun came out.', 'Ava went outside.']];

  function kindOf(lv) {
    var k = R.pick(KNAMES), s = R.pick(KINDS[k]);
    return Q.tiles('What kind of sentence is this?', k, R.some(KNAMES.filter(function (x) { return x !== k; }), lv > 1 ? 3 : 2), { fig: sent(s),
      prompt: 'Does it tell, ask, give an order, or show a strong feeling?', hint: 'Look at the end mark, and the first word.', explain: KWHAT[k], meta: { k: 'g1-kind-of', s: s } });
  }
  function matchKind() {
    var ks = R.some(KNAMES, 3);
    return { q: 'Match each sentence to its kind.', type: 'match', pairs: ks.map(function (k) { return [R.pick(KINDS[k]), k]; }), hint: 'Look at the end mark of each one.', explain: 'Telling, asking, command, strong feeling.', meta: { k: 'g1-match-kind' } };
  }
  function pickKind() {
    var k = R.pick(['asking', 'command', 'strong feeling']), right = R.some(KINDS[k], 2), wrong = R.some(KINDS[R.pick(KNAMES.filter(function (x) { return x !== k; }))], 2);
    return Q.all('Pick every <b>' + k + '</b> sentence.', right, wrong, { hint: KWHAT[k], explain: right.join(' '), meta: { k: 'g1-pick-kind', kind: k } });
  }
  function complete(lv) {
    var f = R.pick(FULL), pred = f[1].charAt(0).toUpperCase() + f[1].slice(1);
    return Q.one('Which is a <b>complete</b> sentence?', f[0] + ' ' + f[1], [f[0] + '.', pred].slice(0, lv > 1 ? 2 : 1), { prompt: 'Does it say who or what, and what they did?',
      hint: 'A sentence tells who or what, and what happens.', explain: sent(f[0] + ' ' + f[1]) + ' tells who and what they did.', meta: { k: 'g1-complete', who: f[0] } });
  }
  function joinAnd(lv) {
    var j = R.pick(JOIN), a = j[0].slice(0, -1), b = j[1];
    var right = a + ' and ' + b;
    return Q.one('Join the two sentences with <b>and</b>. Which is right?', right, [j[0] + ' and ' + b, a + ' and ' + b.charAt(0).toLowerCase() + b.slice(1, -1)].slice(0, lv > 1 ? 2 : 1), {
      fig: sent(j[0]) + sent(j[1]), prompt: 'Take away the first period. Put <b>and</b> in its place.', hint: 'One sentence now: one capital at the start, one mark at the end.',
      explain: sent(right), meta: { k: 'g1-join-and', a: j[0], b: j[1] } });
  }
  function buildJoin() {
    var j = R.pick(JOIN), words = (j[0].slice(0, -1) + ' and ' + j[1]).split(' ');
    return { q: 'Join them with <b>and</b>. Keep them in the same order.', type: 'order', items: words, fig: sent(j[0]) + sent(j[1]),
      hint: 'Start with the first sentence. Then <b>and</b>. Then the second.', explain: sent(words.join(' ')), meta: { k: 'g1-build-join', a: j[0], b: j[1] } };
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'kinds', title: 'Kinds of sentences', sub: 'Telling, asking, commands and strong feelings.',
      concepts: [
        { slug: 'tell-ask', title: 'Telling and asking', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(sent(hlEnd('We saw a loon.')), 'It tells something.'),
            step(sent(hlEnd('Did you see the loon?')), 'It asks something.')
          ],
          guided: [function () { return kindOf(1); }, function () { return kindOf(1); }],
          check: [function () { return kindOf(1); }, matchKind],
          coach: '<p>Take turns: one person tells something, the other turns it into a question. "The soup is hot." "Is the soup hot?"</p>',
          mistake: '<p>Calling every sentence with "you" in it an asking sentence. Check the end mark and whether it wants an answer.</p>' },
        { slug: 'command-feeling', title: 'Commands and strong feelings', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(sent(W.hl('Close the door.', 0, 5)), 'It tells someone to do something: a command.'),
            step(sent(hlEnd('We won!')), 'A strong feeling: <b>!</b>')
          ],
          guided: [function () { return kindOf(1); }, pickKind],
          check: [function () { return kindOf(2); }, pickKind],
          coach: '<p>Play "Simon says" with commands. Then say a sentence with a big feeling and ask which mark it needs.</p>',
          mistake: '<p>Putting ! on every sentence to make it exciting. Save it for strong feelings.</p>' },
        { slug: 'complete', title: 'A complete sentence', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(sent('The dog.'), 'What about the dog?'),
            step(sent('The dog <b>ran to the park</b>.'), 'Who, and what happened.')
          ],
          guided: [function () { return complete(1); }, function () { return complete(1); }],
          check: [function () { return complete(2); }, function () { return complete(2); }],
          coach: '<p>When the child writes "The dog.", ask: "What did the dog do?" Then add it together.</p>',
          mistake: '<p>Writing a list of words without an action. Ask: "What happens?"</p>' },
        { slug: 'join', title: 'Join two ideas with and', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(sent('I have a cat.') + sent('Kai has two dogs.'), 'Two sentences.'),
            step(sent('I have a cat <b>and</b> Kai has two dogs.'), 'One sentence: one capital, one mark.')
          ],
          guided: [function () { return joinAnd(1); }, buildJoin],
          check: [function () { return joinAnd(2); }, buildJoin],
          coach: '<p>Write two short sentences on strips. Cut off the first period and tape "and" in its place.</p>',
          mistake: '<p>Keeping the period before "and". Only one end mark: at the very end.</p>' }
      ]
    }, {
      id: 'start-end', title: 'Start and end a sentence', sub: 'A capital letter at the start. A mark at the end.',
      concepts: [
        { slug: 'capital', title: 'A sentence starts with a capital letter', exp: ['B3.3'], skill: 'cap-end',
          model: [
            step(sent(hlFirst('We went to the park.')), '<b>W</b> is a capital.'),
            step(sent(hlFirst('my dog can run fast.')), 'This one starts with a small <b>m</b>.'),
            step(sent(hlFirst('My dog can run fast.')), 'Fix it: capital <b>M</b>.')
          ],
          guided: [function () { return rightWay('cap', 2); }, function () { return rightWay('cap', 2); }],
          check: [function () { return rightWay('cap', 2); }, function () { return fixTf(1, [0, 1]); }],
          coach: '<p>Ask: "Point to the first word. Is its first letter big or small?" Let the child point before choosing. Praise careful looking.</p>',
          mistake: '<p>Putting a capital on every word (We Went To The Park). Only the first word needs one, and names, like Amara, and the word I.</p>' },
        { slug: 'end-mark', title: 'A sentence ends with a mark', exp: ['B3.3'], skill: 'cap-end',
          model: [
            step(sent(hlEnd('The snow is cold.')), 'It <b>tells</b>. It ends with a <b>period</b>.'),
            step(sent(hlEnd('Is it time for lunch?')), 'It <b>asks</b>. It ends with a <b>question mark</b>.'),
            step(W.tile('Is') + W.tile('Can') + W.tile('Do') + W.tile('Who') + W.tile('What'), 'Asking sentences often start with these.')
          ],
          key: '<p><b>.</b> tells &nbsp;&middot;&nbsp; <b>?</b> asks</p>',
          guided: [endMark, endMark],
          check: [endMark, function () { return rightWay('end', 2); }],
          coach: '<p>Read the sentence aloud with your voice going up for a question. Ask: "Is it telling me something, or asking me?" Exclamation marks are in the lesson on kinds of sentences.</p>',
          mistake: '<p>Choosing a question mark for any sentence with a question word inside it, like "We can go." Ask the child whether the sentence wants an answer.</p>' }
      ]
    }],
    practice: [
      { id: 'kinds', name: 'Kinds of sentences', code: 'B3.1', gen: kindOf },
      { id: 'cap-end', name: 'Capitals and end marks', code: 'B3.3', gen: function (lv) { return rightWay(lv === 1 ? 'cap' : 'both', lv + 1); } }
    ]
  });

  Q.shapes('sentences', {
    kinds: [[1, 'match', matchKind], [1, 'complete', complete], [2, 'pick', pickKind], [2, 'join', joinAnd], [3, 'build-join', buildJoin]],
    'cap-end': [[1, 'end-mark', endMark], [2, 'fix-tf', fixTf], [2, 'build', build], [3, 'pick', pickAll]]
  });
})();
