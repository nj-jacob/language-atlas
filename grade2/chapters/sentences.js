/* Grade 2: sentences.
   Ontario 2023 Language, Grade 2:
   B3.1 "identify and construct declarative, imperative, interrogative, and exclamatory sentences, including compound sentences"
   B3.2 (in part) "... the functions of parts of speech in sentences, including ... conjunctions ..." (and, but, or, so join two sentences)
   For the child: telling, asking, command and strong feeling sentences.
   All sentences are written for this site. Answer checks: tests/verify/grade2-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var KINDS = ['Telling', 'Asking', 'Command', 'Strong feeling'];
  var S = {
    Telling: ['The frog sat on a log.', 'We have a new puppy.', 'My aunt lives in Moncton.', 'The milk is cold.', 'Rain fell all night.'],
    Asking: ['Is the bus here?', 'Can I have a turn?', 'Where are my mittens?', 'Do you want to play?', 'Who is at the door?'],
    Command: ['Shut the gate.', 'Hang up your coat.', 'Please feed the fish.', 'Sit down, please.', 'Brush your teeth.'],
    'Strong feeling': ['That was amazing!', 'Wow, a shooting star!', 'I am so excited!', 'We won!']
  };
  var MARK = { Telling: '.', Asking: '?', 'Strong feeling': '!' };
  /* [first sentence, second sentence, the joining word] */
  var JOIN = [
    ['The sun came out', 'the snow melted', 'so'], ['Ava was thirsty', 'she drank some water', 'so'], ['Our dog was muddy', 'we gave him a bath', 'so'],
    ['I like soup', 'my brother likes salad', 'but'], ['The pond looked frozen', 'the ice was thin', 'but'], ['Theo ran fast', 'he did not win', 'but'],
    ['We can walk', 'we can take the bus', 'or'], ['You can draw', 'you can paint', 'or'], ['Do you want milk', 'do you want juice', 'or'],
    ['Mei made a card', 'she gave it to her teacher', 'and'], ['The wind howled', 'the windows rattled', 'and'], ['Sam read a book', 'Priya played chess', 'and']
  ];
  var MEANING = { and: 'adds more', but: 'shows a surprise', or: 'gives a choice', so: 'tells what happened because of it' };
  var SIMPLE = ['The cat slept.', 'We ate lunch.', 'Kai has a red hat.', 'The bus is late.'];
  function joined(j) { return j[0] + ', ' + j[2] + ' ' + j[1] + (/^Do /.test(j[0]) ? '?' : '.'); }
  function gapped(j) { return j[0] + ', ' + W.gap() + ' ' + j[1] + (/^Do /.test(j[0]) ? '?' : '.'); }
  function two(j) { var end = /^Do /.test(j[0]) ? '?' : '.'; return W.sent(j[0] + end) + W.sent(j[1].charAt(0).toUpperCase() + j[1].slice(1) + end); }

  /* ---------- question makers ---------- */
  function kind(lv) {
    var k = R.pick(lv > 1 ? KINDS : KINDS.slice(0, 2).concat(['Strong feeling'])), s = R.pick(S[k]);
    return { q: 'What kind of sentence is this?', fig: W.sent(s), type: 'tap', tiles: KINDS, answer: KINDS.indexOf(k), prompt: 'Look at the end mark and the first word.',
      hint: 'A command tells someone to do something.', explain: 'It is a <b>' + k.toLowerCase() + '</b> sentence.', meta: { k: 'g2-kind', s: s } };
  }
  function endMark() {
    var k = R.pick(Object.keys(MARK)), s = R.pick(S[k]);
    return { q: 'Which mark ends this sentence?', fig: W.sent(s.slice(0, -1) + W.gap()), type: 'tap', tiles: ['.', '?', '!'], answer: ['.', '?', '!'].indexOf(MARK[k]),
      hint: 'Is it telling, asking, or showing strong feeling?', explain: W.sent(s), meta: { k: 'g2-end-mark', s: s } };
  }
  function matchKind() {
    var ks = R.some(KINDS, 3);
    return { q: 'Match each sentence to its kind.', type: 'match', pairs: ks.map(function (k) { return [R.pick(S[k]), k]; }), hint: 'Look at the end mark and the first word.',
      explain: 'A command starts with a doing word, or with please.', meta: { k: 'g2-match-kind' } };
  }
  function pickCommand() {
    var right = R.some(S.Command, 2), wrong = [R.pick(S.Telling), R.pick(S.Asking)];
    return Q.all('Pick every <b>command</b>.', right, wrong, { hint: 'A command tells someone to do something.', explain: 'Commands start with a doing word: shut, hang, sit.', meta: { k: 'g2-pick-command' } });
  }
  function orderAsk() {
    var s = R.pick(S.Asking);
    return { q: 'Put the words in order to make an asking sentence.', type: 'order', items: s.split(' '), hint: 'An asking sentence often starts with Is, Can, Where, Do or Who.', explain: W.sent(s), meta: { k: 'g2-order-ask' } };
  }

  function joinWord(lv) {
    var j = R.pick(lv > 1 ? JOIN : JOIN.filter(function (x) { return x[2] !== 'or'; })), tiles = lv > 1 ? ['and', 'but', 'or', 'so'] : ['and', 'but', 'so'];
    return { q: 'Which word joins these best?', fig: W.sent(gapped(j)), type: 'tap', tiles: tiles, answer: tiles.indexOf(j[2]), prompt: 'Does it add more, show a surprise, give a choice, or tell what happened because of it?',
      hint: 'and adds more. but: a surprise. or: a choice. so: because of it.', explain: W.sent(joined(j)), meta: { k: 'g2-join', a: j[0] } };
  }
  function joinMeans() {
    var w = R.pick(Object.keys(MEANING));
    return Q.tiles('What does <b>' + w + '</b> do in a sentence?', MEANING[w], Object.keys(MEANING).filter(function (x) { return x !== w; }).map(function (x) { return MEANING[x]; }).slice(0, 2), {
      fig: W.sent(joined(R.pick(JOIN.filter(function (j) { return j[2] === w; })))), hint: 'Read the sentence. How are the two parts linked?', explain: '<b>' + w + '</b> ' + MEANING[w] + '.', meta: { k: 'g2-join-means', w: w } });
  }
  /* two short sentences become one */
  function orderJoin() {
    var j = R.pick(JOIN);
    return { q: 'Make one sentence. Put the parts in order.', fig: two(j), type: 'order', items: [j[0] + ',', j[2], j[1] + (/^Do /.test(j[0]) ? '?' : '.')], hint: 'Comma, then the joining word, in the middle.',
      explain: W.sent(joined(j)), meta: { k: 'g2-order-join', a: j[0] } };
  }
  function pickCompound(lv) {
    var j = R.pick(JOIN);
    return Q.one('Which sentence joins <b>two</b> ideas?', joined(j), R.some(SIMPLE, lv > 1 ? 2 : 1), { hint: 'Look for two parts that could each be a sentence, and a joining word.',
      explain: W.sent(joined(j).replace(', ' + j[2] + ' ', ', <b>' + j[2] + '</b> ')), meta: { k: 'g2-pick-compound', a: j[0] } });
  }
  function commaTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, shown = right ? joined(j) : joined(j).replace(', ', ' ');
    return { q: 'Is this joined sentence written the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['It has a comma before the joining word.', 'It is missing a comma before the joining word.'], answer: right ? 0 : 1 },
      hint: 'Look just before the joining word.', explain: W.sent(joined(j)), meta: { k: 'g2-comma-join', shown: shown, w: j[2] } };
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'kinds', title: 'Kinds of sentences', sub: 'Telling, asking, command, strong feeling.',
      concepts: [
        { slug: 'kinds', title: 'Four kinds of sentences', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('The frog sat on a log.'), '<b>Telling</b>. It ends with a period.'),
            step(W.sent('Is the bus here?'), '<b>Asking</b>. A question mark.'),
            step(W.sent('Wow, a shooting star!'), '<b>Strong feeling</b>. An exclamation mark.')
          ],
          guided: [function () { return kind(1); }, endMark],
          check: [function () { return kind(1); }, endMark],
          coach: '<p>Say a sentence aloud and have the child show a finger for its kind: one for telling, two for asking, three for strong feeling.</p>',
          mistake: '<p>Calling any sentence with "!" a command. Look at what it does: a command tells someone to do something.</p>' },
        { slug: 'command', title: 'A command tells someone what to do', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('<b>Hang</b> up your coat.'), 'It starts with a doing word.'),
            step(W.sent('<b>Please</b> feed the fish.'), 'Or with please.')
          ],
          guided: [pickCommand, function () { return kind(2); }],
          check: [pickCommand, matchKind],
          coach: '<p>Play "Grown-up says": give commands (touch your nose, hop twice). Then let the child give you some.</p>',
          mistake: '<p>Mixing up commands and telling sentences. Ask: "Is someone being told to do something?"</p>' },
        { slug: 'ask-order', title: 'Build an asking sentence', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.tile('Can') + W.tile('I') + W.tile('have') + W.tile('a') + W.tile('turn?'), 'The asking word goes first.'),
            step(W.sent('Can I have a turn?'))
          ],
          guided: [orderAsk, orderAsk],
          check: [orderAsk, matchKind],
          coach: '<p>Turn a telling sentence into a question together: "The bus is here." becomes "Is the bus here?"</p>',
          mistake: '<p>Leaving the asking word in the middle ("The bus is here?"). Start with Is, Can, Where, Do or Who.</p>' }
      ]
    }, {
      id: 'joining', title: 'Joining sentences', sub: 'Two short sentences become one longer one.',
      concepts: [
        { slug: 'compound', title: 'Join two sentences into one', exp: ['B3.1'], skill: 'joining',
          model: [
            step(W.sent('The sun came out.') + W.sent('The snow melted.')),
            step(W.sent('The sun came out<b>,</b> <b>so</b> the snow melted.'), 'A comma and a joining word.')
          ],
          guided: [orderJoin, function () { return pickCompound(1); }],
          check: [orderJoin, function () { return pickCompound(2); }],
          coach: '<p>Write two short sentences on strips of paper. Cut off the period of the first, add a comma card and a joining word card, and slide them together.</p>',
          mistake: '<p>Joining with "and" every time ("and then and then"). Ask which joining word fits the meaning best.</p>' },
        { slug: 'join-words', title: 'and, but, or, so', exp: ['B3.1', 'B3.2'], skill: 'joining',
          model: [
            step(W.sent('Sam read a book, <b>and</b> Priya played chess.'), '<b>and</b> adds more.'),
            step(W.sent('Theo ran fast, <b>but</b> he did not win.'), '<b>but</b>: a surprise.'),
            step(W.sent('We can walk, <b>or</b> we can take the bus.'), '<b>or</b>: a choice.'),
            step(W.sent('Ava was thirsty, <b>so</b> she drank some water.'), '<b>so</b>: because of it.')
          ],
          guided: [function () { return joinWord(1); }, joinMeans],
          check: [function () { return joinWord(2); }, commaTf],
          coach: '<p>Say the first half of a sentence and a joining word, and let the child finish it: "I was cold, so..."</p>',
          mistake: '<p>Using "but" when nothing is a surprise. Ask: "Is the second part what you expected?"</p>' }
      ]
    }],
    practice: [
      { id: 'kinds', name: 'Kinds of sentences', code: 'B3.1', gen: kind },
      { id: 'joining', name: 'Joining sentences', code: 'B3.1, B3.2', gen: joinWord }
    ]
  });

  Q.shapes('sentences', {
    kinds: [[1, 'end-mark', endMark], [1, 'pick-command', pickCommand], [1, 'order-ask', orderAsk], [2, 'match', matchKind]],
    joining: [[1, 'means', joinMeans], [1, 'order', orderJoin], [1, 'pick', pickCompound], [2, 'comma', commaTf]]
  });
})();
