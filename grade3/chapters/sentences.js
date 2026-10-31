/* Grade 3: sentences.
   Ontario 2023 Language, Grade 3, B3.1 Syntax and sentence structure: kinds of sentences, complete sentences, compound sentences
   (joined with and, but, so) and complex sentences with a clause that tells why or when (because, when).
   All sentences are written for this site. Answer checks: tests/verify/grade3-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var KINDS = ['Telling', 'Asking', 'Strong feeling', 'Command'];
  var S = {
    Telling: ['The canoe is red.', 'We live near a lake.', 'My cat sleeps all day.', 'The library opens at nine.', 'Snow covers the field.'],
    Asking: ['Where is the map?', 'Can we go skating?', 'Who took my mitts?', 'Is the soup hot?', 'When does the bus come?'],
    'Strong feeling': ['What a huge wave!', 'This is the best day ever!', 'Wow, that was fast!', 'I love this song!'],
    Command: ['Please close the door.', 'Put on your boots.', 'Wash your hands.', 'Pass me the ball, please.', 'Bring your library book.']
  };
  var MARK = { Telling: '.', Asking: '?', 'Strong feeling': '!' };
  /* [first idea, second idea, the joining word] */
  var JOIN = [
    ['It was raining', 'we stayed inside', 'so'], ['Mei was hungry', 'she made a sandwich', 'so'], ['The ice was thin', 'we did not skate on it', 'so'], ['Omar missed the bus', 'his mom drove him', 'so'],
    ['I like apples', 'Sam likes pears', 'but'], ['The hill was steep', 'we climbed it', 'but'], ['The sun was out', 'it was still cold', 'but'], ['Liam looked everywhere', 'he could not find his hat', 'but'],
    ['We swam in the lake', 'we roasted marshmallows', 'and'], ['Hana fed the cat', 'she watered the plants', 'and'], ['The wind blew', 'the snow fell', 'and']
  ];
  var WHY_WHEN = [
    ['We wore our coats', 'it was cold', 'because'], ['The plant died', 'nobody watered it', 'because'], ['We stayed home', 'Leila had a cold', 'because'], ['Owen laughed', 'the joke was funny', 'because'],
    ['We will eat', 'the clock says twelve', 'when'], ['Call me', 'you get home', 'when'], ['Wave to me', 'the train leaves', 'when'], ['Take off your boots', 'you come inside', 'when']
  ];
  var WHOLE = ['The fox ran to the lake.', 'My sister plays hockey.', 'We baked bannock with Grandma.', 'The geese flew south.'];
  var PARTS = ['Ran to the lake.', 'The big brown dog.', 'Because it was cold.', 'After the game.', 'Under the bridge.'];
  function sentence(j) { return j[0] + (j[2] === 'because' || j[2] === 'when' ? ' ' : ', ') + j[2] + ' ' + j[1] + '.'; }
  function gapped(j) { return j[0] + (j[2] === 'because' || j[2] === 'when' ? ' ' : ', ') + W.gap() + ' ' + j[1] + '.'; }

  /* ---------- question makers ---------- */
  function kind(lv) {
    var k = R.pick(lv > 1 ? KINDS : KINDS.slice(0, 3)), s = R.pick(S[k]);
    return { q: 'What kind of sentence is this?', fig: W.sent(s), type: 'tap', tiles: KINDS, answer: KINDS.indexOf(k),
      prompt: 'Look at the end mark, and the first word.', hint: 'A command tells someone to do something.', explain: s + ' is a <b>' + k.toLowerCase() + '</b> sentence.', meta: { k: 'g3-kind', s: s } };
  }
  function endMark() {
    var k = R.pick(Object.keys(MARK)), s = R.pick(S[k]);
    return { q: 'Which mark ends this sentence?', fig: W.sent(s.slice(0, -1) + W.gap()), type: 'tap', tiles: ['.', '?', '!'], answer: ['.', '?', '!'].indexOf(MARK[k]),
      hint: 'Is it telling, asking, or showing strong feeling?', explain: W.sent(s), meta: { k: 'g3-end-mark', s: s } };
  }
  function matchKind() {
    var ks = R.some(KINDS, 3);
    return { q: 'Match each sentence to its kind.', type: 'match', pairs: ks.map(function (k) { return [R.pick(S[k]), k]; }), hint: 'Look at the end mark and the first word.', explain: 'A command starts with a doing word.', meta: { k: 'g3-match-kind' } };
  }
  function pickAsk() {
    var right = R.some(S.Asking, 2), wrong = [R.pick(S.Telling), R.pick(S.Command)];
    return Q.all('Pick every <b>asking</b> sentence.', right, wrong, { hint: 'Asking sentences end with ?', explain: 'An asking sentence ends with a question mark.', meta: { k: 'g3-pick-ask' } });
  }
  function orderAsk() {
    var s = R.pick(S.Asking);
    return { q: 'Put the words in order to make an asking sentence.', type: 'order', items: s.split(' '), hint: 'An asking sentence often starts with a word like Can, Is or Where.', explain: W.sent(s), meta: { k: 'g3-order-ask' } };
  }

  function joinWord(lv) {
    var j = R.pick(lv > 1 ? JOIN : JOIN.filter(function (x) { return x[2] !== 'and'; }));
    return { q: 'Which word joins these ideas best?', fig: W.sent(gapped(j)), type: 'tap', tiles: ['and', 'but', 'so'], answer: ['and', 'but', 'so'].indexOf(j[2]),
      prompt: '<b>so</b> tells what happened next. <b>but</b> shows a surprise. <b>and</b> adds more.', hint: 'Does the second idea happen because of the first? Or is it a surprise?',
      explain: W.sent(sentence(j)), meta: { k: 'g3-join', a: j[0] } };
  }
  function becauseWhen() {
    var j = R.pick(WHY_WHEN);
    return { q: 'Which word fits?', fig: W.sent(gapped(j)), type: 'tap', tiles: ['because', 'when'], answer: j[2] === 'because' ? 0 : 1,
      prompt: '<b>because</b> tells why. <b>when</b> tells at what time.', hint: 'Does the end part tell why, or when?', explain: W.sent(sentence(j)), meta: { k: 'g3-because-when', a: j[0] } };
  }
  function orderJoin() {
    var j = R.pick(JOIN.concat(WHY_WHEN)), c = j[2] === 'because' || j[2] === 'when';
    return { q: 'Put the parts in order to make one sentence.', type: 'order', items: [j[0] + (c ? '' : ','), j[2], j[1] + '.'], hint: 'The joining word goes in the middle.', explain: W.sent(sentence(j)), meta: { k: 'g3-order-join', a: j[0] } };
  }
  function pickJoined() {
    var j = R.pick(JOIN), others = ['and', 'but', 'so'].filter(function (w) { return w !== j[2]; });
    return Q.one('Which sentence makes the most sense?', sentence(j), others.map(function (w) { return sentence([j[0], j[1], w]); }), {
      hint: 'Read each one aloud. Which joining word fits the meaning?', explain: '<b>' + j[2] + '</b> fits best.', meta: { k: 'g3-pick-joined', a: j[0] } });
  }
  function complete(lv) {
    var s = R.pick(WHOLE);
    return Q.one('Which is a <b>complete</b> sentence?', s, R.some(PARTS, lv > 1 ? 3 : 2), { hint: 'A complete sentence tells who or what, and what they did.', explain: W.sent(s), meta: { k: 'g3-complete' } });
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'kinds', title: 'Kinds of sentences', sub: 'Telling, asking, strong feeling, command.',
      concepts: [
        { slug: 'kinds', title: 'Four kinds of sentences', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('We live near a lake.'), '<b>Telling</b>. Ends with .'),
            step(W.sent('Can we go skating?'), '<b>Asking</b>. Ends with ?'),
            step(W.sent('What a huge wave!'), '<b>Strong feeling</b>. Ends with !'),
            step(W.sent('Put on your boots.'), '<b>Command</b>. Tells someone to do something.')
          ],
          key: '<p>Telling . &nbsp; Asking ? &nbsp; Strong feeling ! &nbsp; Command: do it.</p>',
          guided: [function () { return kind(1); }, endMark],
          check: [function () { return kind(2); }, matchKind],
          coach: '<p>Play a quick game: you say a sentence and the child holds up a card for the kind. Use real sentences from the day.</p>',
          mistake: '<p>Calling every sentence with ! "strong feeling". A command can end with ! too ("Stop!"). Ask: is someone being told to do something?</p>' },
        { slug: 'complete', title: 'A complete sentence', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('The big brown dog.'), 'Who? Yes. Did what? Missing.'),
            step(W.sent('Ran to the lake.'), 'Did what? Yes. Who? Missing.'),
            step(W.sent('The fox ran to the lake.'), 'Who and did what: complete.')
          ],
          key: '<p>A complete sentence tells <b>who</b> and <b>what they did</b>.</p>',
          guided: [function () { return complete(1); }, function () { return complete(1); }],
          check: [function () { return complete(2); }, orderAsk],
          coach: '<p>Ask two questions about any sentence: "Who?" and "Did what?" If one answer is missing, it is not complete yet.</p>',
          mistake: '<p>Writing a "because" part on its own ("Because it was cold."). It needs the rest of the sentence.</p>' }
      ]
    }, {
      id: 'joining', title: 'Joining ideas', sub: 'One longer sentence from two short ones.',
      concepts: [
        { slug: 'and-but-so', title: 'and, but, so', exp: ['B3.1'], skill: 'joining',
          model: [
            step(W.sent('It was raining.') + W.sent('We stayed inside.'), 'Two short sentences.'),
            step(W.sent('It was raining, <b>so</b> we stayed inside.'), '<b>so</b>: what happened next.'),
            step(W.sent('The hill was steep, <b>but</b> we climbed it.'), '<b>but</b>: a surprise.'),
            step(W.sent('Hana fed the cat, <b>and</b> she watered the plants.'), '<b>and</b>: one more thing.')
          ],
          key: '<p><b>and</b> adds. <b>but</b> surprises. <b>so</b> tells what happened next. Put a comma before the joining word.</p>',
          guided: [function () { return joinWord(1); }, function () { return joinWord(1); }],
          check: [function () { return joinWord(2); }, orderJoin],
          coach: '<p>Give two short sentences about the child\'s day and ask them to join them out loud. Then try another joining word and talk about how the meaning changes.</p>',
          mistake: '<p>Using "and" for everything. Ask: "Is it a surprise? Is it what happened next?"</p>' },
        { slug: 'because-when', title: 'because and when', exp: ['B3.1'], skill: 'joining',
          model: [
            step(W.sent('We wore our coats.'), 'What happened.'),
            step(W.sent('We wore our coats <b>because</b> it was cold.'), '<b>because</b> tells <b>why</b>.'),
            step(W.sent('Call me <b>when</b> you get home.'), '<b>when</b> tells <b>at what time</b>.')
          ],
          key: '<p><b>because</b> = why. <b>when</b> = at what time.</p>',
          guided: [becauseWhen, becauseWhen],
          check: [becauseWhen, orderJoin],
          coach: '<p>Ask "Why?" after a sentence, and let the child answer with "because...". Then ask "When?" and answer with "when...".</p>',
          mistake: '<p>Starting a sentence with "Because" and stopping there. The "because" part needs the main part with it.</p>' }
      ]
    }],
    practice: [
      { id: 'kinds', name: 'Kinds of sentences', code: 'B3.1', gen: kind },
      { id: 'joining', name: 'Joining ideas', code: 'B3.1', gen: joinWord }
    ]
  });

  Q.shapes('sentences', {
    kinds: [[1, 'end-mark', endMark], [1, 'complete', complete], [2, 'match', matchKind], [2, 'pick-asking', pickAsk], [2, 'order', orderAsk]],
    joining: [[1, 'because-when', becauseWhen], [2, 'order', orderJoin], [2, 'pick-sentence', pickJoined]]
  });
})();
