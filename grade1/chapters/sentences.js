/* Grade 1 demo chapter: a sentence starts with a capital letter and ends with a period or a question mark.
   Ontario 2023 Language, B3.3: "use their understanding of the meaning and function of capitalization and punctuation to
   communicate meaning clearly, including the use of a capital letter at the beginning of a sentence and the appropriate
   punctuation mark at the end". All sentences are written for this site. Answer checks: tests/verify/grade1.js. */
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
  function sent(s) { return '<span class="sent">' + s + '</span>'; }
  function hlFirst(s) { return '<mark class="hl">' + s.charAt(0) + '</mark>' + s.slice(1); }
  function hlEnd(s) { return s.slice(0, -1) + '<mark class="hl">' + s.slice(-1) + '</mark>'; }

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

  Atlas.register('sentences', {
    lessons: [{
      id: 'start-end', title: 'Start and end a sentence', sub: 'A capital letter at the start. A mark at the end.',
      concepts: [
        { slug: 'capital', title: 'A sentence starts with a capital letter', exp: ['B3.3'], skill: 'cap-end',
          intro: '<p>A <b>sentence</b> tells a whole idea. The first word of a sentence starts with a <b>capital letter</b>.</p><p>A capital letter is the big form of a letter: <b>W</b> is the capital of <b>w</b>.</p>',
          model: [
            'Look at this sentence. ' + sent('We went to the park.'),
            'I look at the first word. It is <b>We</b>.',
            'I look at its first letter: ' + sent(hlFirst('We went to the park.')) + ' It is a capital letter. That is right.',
            'Now look at this one: ' + sent('my dog can run fast.') + ' The first letter is a small <b>m</b>. I fix it: ' + sent(hlFirst('My dog can run fast.'))
          ],
          key: '<p>The first word of a sentence starts with a capital letter.</p>',
          guided: [function () { return rightWay('cap', 2); }, function () { return rightWay('cap', 2); }],
          check: [function () { return rightWay('cap', 2); }, function () { return fixTf(1, [0, 1]); }],
          coach: '<p>Ask: "Point to the first word. Is its first letter big or small?" Let the child point before choosing. Praise careful looking.</p>',
          mistake: '<p>Putting a capital on every word (We Went To The Park). Only the first word needs one here. Names, like Amara, have a capital too: that comes in a later lesson.</p>' },
        { slug: 'end-mark', title: 'A sentence ends with a mark', exp: ['B3.3'], skill: 'cap-end',
          intro: '<p>A sentence ends with a <b>mark</b>.</p><p>A sentence that <b>tells</b> ends with a <b>period</b> ( . ). A sentence that <b>asks</b> ends with a <b>question mark</b> ( ? ).</p>',
          model: [
            'Look: ' + sent('The snow is cold') + ' It tells us something.',
            'So I put a period at the end: ' + sent(hlEnd('The snow is cold.')),
            'Now look: ' + sent('Is it time for lunch') + ' It asks something.',
            'So I put a question mark at the end: ' + sent(hlEnd('Is it time for lunch?')),
            'Asking sentences often start with words like <b>Is</b>, <b>Can</b>, <b>Do</b>, <b>Who</b> or <b>What</b>.'
          ],
          key: '<p>A telling sentence ends with a period ( . ). An asking sentence ends with a question mark ( ? ).</p>',
          guided: [endMark, endMark],
          check: [endMark, function () { return rightWay('end', 2); }],
          coach: '<p>Read the sentence aloud with your voice going up for a question. Ask: "Is it telling me something, or asking me?" This demo covers periods and question marks; exclamation marks come later.</p>',
          mistake: '<p>Choosing a question mark for any sentence with a question word inside it, like "We can go." Ask the child whether the sentence wants an answer.</p>' }
      ]
    }],
    practice: [
      { id: 'cap-end', name: 'Capitals and end marks', code: 'B3.3', gen: function (lv) { return rightWay(lv === 1 ? 'cap' : 'both', lv + 1); } }
    ]
  });

  Q.shapes('sentences', {
    'cap-end': [[1, 'end-mark', endMark], [2, 'fix-tf', fixTf], [2, 'build', build], [3, 'pick', pickAll]]
  });
})();
