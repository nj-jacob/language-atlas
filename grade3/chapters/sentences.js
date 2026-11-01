/* Grade 3: sentences. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B3.1 Syntax and sentence structure: kinds of sentences, complete sentences, compound sentences
   (joined with and, but, so) and complex sentences with a clause that tells why or when (because, when).
   All sentences are written for this site. Answer checks: tests/verify/grade3-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var KINDS = ['Telling', 'Asking', 'Strong feeling', 'Command'];
  var S = {
    Telling: ['The canoe is red.', 'We live near a lake.', 'My cat sleeps all day.', 'The library opens at nine.', 'Snow covers the field.',
      'Grandma lives in Sudbury.', 'The puck slid across the ice.', 'Our class has a turtle.', 'The ferry leaves at noon.', 'Arjun plays the drums.'],
    Asking: ['Where is the map?', 'Can we go skating?', 'Who took my mitts?', 'Is the soup hot?', 'When does the bus come?',
      'How old is your sister?', 'Did you feed the dog?', 'What time is it?', 'Are we there yet?', 'Why is the sky blue?'],
    'Strong feeling': ['What a huge wave!', 'This is the best day ever!', 'Wow, that was fast!', 'I love this song!', 'What a beautiful sunset!',
      'That was so much fun!', 'Hooray, we won!', 'How tall that tree is!', 'Oh no, I dropped my lunch!', 'Yay, it is snowing!'],
    Command: ['Please close the door.', 'Put on your boots.', 'Wash your hands.', 'Pass me the ball, please.', 'Bring your library book.',
      'Hang up your coat.', 'Feed the fish, please.', 'Turn off the light.', 'Sit next to me.', 'Stop at the corner.']
  };
  var MARK = { Telling: '.', Asking: '?', 'Strong feeling': '!' };
  /* complete sentences, and parts that are missing who (or what) or what they did */
  var WHOLE = ['The fox ran to the lake.', 'My sister plays hockey.', 'We baked bannock with Grandma.', 'The geese flew south.', 'A frog jumped off the log.',
    'Our neighbour fixed the fence.', 'The bus stopped at the corner.', 'Mei painted a picture.', 'The wind shook the window.', 'Two deer crossed the road.',
    'Kai found a smooth stone.', 'The baby giggled.', 'My uncle drives a truck.', 'Snow fell all night.', 'Leila read a book about whales.'];
  var NOWHO = ['Ran to the lake.', 'Jumped over the log.', 'Plays the drums every day.', 'Swam across the pond.', 'Ate all the berries.', 'Climbed the tall tree.', 'Laughed at the joke.'];
  var NOWHAT = ['The big brown dog.', 'My best friend Kai.', 'The old wooden canoe.', 'A flock of geese.', 'Our neighbour' + '’' + 's cat.', 'The tall pine tree.', 'Two red mittens.'];
  var OTHER = ['Because it was cold.', 'After the game.', 'Under the bridge.', 'When the bell rang.'];
  var PARTS = NOWHO.concat(NOWHAT, OTHER);
  /* [first idea, second idea, the joining word] */
  var JOIN = [
    ['It was raining', 'we stayed inside', 'so'], ['Mei was hungry', 'she made a sandwich', 'so'], ['The ice was thin', 'we did not skate on it', 'so'], ['Omar missed the bus', 'his mom drove him', 'so'],
    ['The puppy was tired', 'it took a nap', 'so'], ['Our tent leaked', 'we slept in the van', 'so'], ['The music was loud', 'Ava covered her ears', 'so'],
    ['I like apples', 'Sam likes pears', 'but'], ['The hill was steep', 'we climbed it', 'but'], ['The sun was out', 'it was still cold', 'but'], ['Liam looked everywhere', 'he could not find his hat', 'but'],
    ['Kai is small', 'he is very strong', 'but'], ['We waited for the bus', 'it never came', 'but'], ['The soup smelled odd', 'it tasted great', 'but'],
    ['We swam in the lake', 'we roasted marshmallows', 'and'], ['Hana fed the cat', 'she watered the plants', 'and'], ['The wind blew', 'the snow fell', 'and'],
    ['Dad made pancakes', 'Mom made tea', 'and'], ['Zara plays piano', 'her brother plays guitar', 'and'], ['The leaves turned red', 'the geese flew south', 'and'], ['Noor read a book', 'Sam drew a map', 'and']
  ];
  var WHY_WHEN = [
    ['We wore our coats', 'it was cold', 'because'], ['The plant died', 'nobody watered it', 'because'], ['We stayed home', 'Leila was sick', 'because'], ['Owen laughed', 'the joke was funny', 'because'],
    ['The road was closed', 'a tree had fallen on it', 'because'], ['We took the bus', 'our car was broken', 'because'], ['Priya felt proud', 'she worked so hard', 'because'],
    ['The ice cream melted', 'the day was so hot', 'because'], ['Kai could not sleep', 'he was too excited', 'because'], ['We ate inside', 'the bugs were biting', 'because'],
    ['We will eat', 'the clock says twelve', 'when'], ['Call me', 'you get home', 'when'], ['Wave to me', 'the train leaves', 'when'], ['Take off your boots', 'you come inside', 'when'],
    ['Raise your hand', 'you know the answer', 'when'], ['Turn off the tap', 'the tub is full', 'when'], ['We line up', 'the bell rings', 'when'], ['Bears wake up', 'spring comes', 'when'],
    ['Let the cookies cool', 'they come out of the oven', 'when'], ['Put on a hat', 'you go out in the sun', 'when']
  ];
  var SAYS = { and: 'one more thing', but: 'a surprise', so: 'what happened next' };
  function inner(j) { return j[2] === 'because' || j[2] === 'when'; }
  function sentence(j) { return j[0] + (inner(j) ? ' ' : ', ') + j[2] + ' ' + j[1] + '.'; }
  function gapped(j) { return j[0] + (inner(j) ? ' ' : ', ') + W.gap() + ' ' + j[1] + '.'; }
  function kindsFor(lv) { return lv > 1 ? KINDS : KINDS.slice(0, 3); }

  /* ---------- four kinds of sentences ---------- */
  function kind(lv) {
    var k = R.pick(kindsFor(lv)), s = R.pick(S[k]);
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
  function pickKind(lv) {
    var k = R.pick(kindsFor(lv)), right = R.some(S[k], R.int(1, 2)), wrong = R.some(KINDS.filter(function (x) { return x !== k; }), 4 - right.length).map(function (x) { return R.pick(S[x]); });
    return Q.all('Pick every <b>' + k.toLowerCase() + '</b> sentence.', right, wrong, { hint: k === 'Command' ? 'A command tells someone to do something.' : 'Look at the end mark.',
      explain: right.map(function (x) { return W.sent(x); }).join(''), meta: { k: 'g3-pick-ask', kind: k } });
  }
  function kindTf() {
    var k = R.pick(KINDS), s = R.pick(S[k]), right = R.int(0, 1) === 1, said = right ? k : R.pick(KINDS.filter(function (x) { return x !== k; }));
    return { q: Q.name() + ' says this is a <b>' + said.toLowerCase() + '</b> sentence.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Look at the end mark, and the first word.', explain: 'It is a <b>' + k.toLowerCase() + '</b> sentence.', meta: { k: 'g3-kind-sent-tf', s: s, said: said } };
  }

  /* ---------- a complete sentence ---------- */
  function complete(lv) {
    var s = R.pick(WHOLE);
    return Q.one('Which is a <b>complete</b> sentence?', s, R.some(PARTS, lv > 1 ? 3 : 2), { hint: 'A complete sentence tells who or what, and what they did.', explain: W.sent(s), meta: { k: 'g3-complete' } });
  }
  function pickComplete(lv) {
    var right = R.some(WHOLE, R.int(1, 2)), wrong = R.some(PARTS, (lv > 1 ? 5 : 4) - right.length);
    return Q.all('Pick every <b>complete</b> sentence.', right, wrong, { hint: 'Ask: who? and did what?', explain: right.map(function (x) { return W.sent(x); }).join(''), meta: { k: 'g3-pick-complete' } });
  }
  function completeTf() {
    var right = R.int(0, 1) === 1, s = right ? R.pick(WHOLE) : R.pick(PARTS);
    return { q: Q.name() + ' wrote this. Is it a complete sentence?', fig: W.sent(s), type: 'tf', answer: right, hint: 'Does it tell who, and what they did?',
      explain: right ? 'It tells who and what they did.' : 'Something is missing.', meta: { k: 'g3-complete-tf', s: s } };
  }
  function missing() {
    var who = R.int(0, 1) === 1, s = R.pick(who ? NOWHO : NOWHAT);
    return { q: 'What is missing?', fig: W.sent(s), type: 'tap', tiles: ['Who or what', 'What they did'], answer: who ? 0 : 1,
      hint: 'Ask: who? Then ask: did what?', explain: who ? 'It does not say who did it.' : 'It does not say what they did.', meta: { k: 'g3-missing-part', s: s } };
  }
  function orderWhole(lv) {
    var s = R.pick(WHOLE.filter(function (x) { return x.split(' ').length <= (lv > 1 ? 7 : 5); }));
    return { q: 'Put the words in order to make a complete sentence.', type: 'order', items: s.split(' '), hint: 'Start with who, then what they did.', explain: W.sent(s), meta: { k: 'g3-order-whole' } };
  }

  /* ---------- and, but, so ---------- */
  function joinWord(lv) {
    var j = R.pick(lv > 1 ? JOIN : JOIN.filter(function (x) { return x[2] !== 'and'; }));
    return { q: 'Which word joins these ideas best?', fig: W.sent(gapped(j)), type: 'tap', tiles: ['and', 'but', 'so'], answer: ['and', 'but', 'so'].indexOf(j[2]),
      prompt: '<b>so</b> tells what happened next. <b>but</b> shows a surprise. <b>and</b> adds more.', hint: 'Does the second idea happen because of the first? Or is it a surprise?',
      explain: W.sent(sentence(j)), meta: { k: 'g3-join', a: j[0] } };
  }
  function orderJoin() {
    var j = R.pick(JOIN);
    return { q: 'Put the parts in order to make one sentence.', type: 'order', items: [j[0] + ',', j[2], j[1] + '.'], hint: 'The joining word goes in the middle.', explain: W.sent(sentence(j)), meta: { k: 'g3-order-join', a: j[0] } };
  }
  function pickJoined() {
    var j = R.pick(JOIN), others = ['and', 'but', 'so'].filter(function (w) { return w !== j[2]; });
    return Q.one('Which sentence makes the most sense?', sentence(j), others.map(function (w) { return sentence([j[0], j[1], w]); }), {
      hint: 'Read each one. Which joining word fits the meaning?', explain: '<b>' + j[2] + '</b> fits best.', meta: { k: 'g3-pick-joined', a: j[0] } });
  }
  function joinTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, w = right ? j[2] : R.pick(['and', 'but', 'so'].filter(function (x) { return x !== j[2]; }));
    return { q: Q.name() + ' joined two ideas. Does it make sense?', fig: W.sent(sentence([j[0], j[1], w])), type: 'tf', answer: right,
      hint: 'Is it one more thing, a surprise, or what happened next?', explain: '<b>' + j[2] + '</b>: ' + SAYS[j[2]] + '.' + W.sent(sentence(j)), meta: { k: 'g3-join-tf', a: j[0], w: w } };
  }

  /* ---------- because and when ---------- */
  function becauseWhen(lv) {
    var j = R.pick(WHY_WHEN);
    return { q: 'Which word fits?', fig: W.sent(gapped(j)), type: 'tap', tiles: ['because', 'when'], answer: j[2] === 'because' ? 0 : 1,
      prompt: '<b>because</b> tells why. <b>when</b> tells at what time.', hint: 'Does the end part tell why, or when?', explain: W.sent(sentence(j)), meta: { k: 'g3-because-when', a: j[0] } };
  }
  function orderComplex() {
    var j = R.pick(WHY_WHEN);
    return { q: 'Put the parts in order to make one sentence.', type: 'order', items: [j[0], j[2], j[1] + '.'], hint: 'What happened comes first. Then why, or when.', explain: W.sent(sentence(j)), meta: { k: 'g3-order-complex', a: j[0] } };
  }
  function whichPart() {
    var j = R.pick(WHY_WHEN), asks = j[2] === 'because' ? 'why' : 'when';
    return Q.tiles('Which part tells <b>' + asks + '</b>?', j[2] + ' ' + j[1], [j[0]], { fig: W.sent(sentence(j)), hint: 'Find the joining word. The part that starts with it tells ' + asks + '.',
      explain: W.sent(j[0] + ' <mark class="hl">' + j[2] + ' ' + j[1] + '</mark>.'), meta: { k: 'g3-which-part', a: j[0] } });
  }
  function complexTf() {
    var j = R.pick(WHY_WHEN), right = R.int(0, 1) === 1, w = right ? j[2] : (j[2] === 'because' ? 'when' : 'because');
    return { q: Q.name() + ' wrote this. Does the joining word fit?', fig: W.sent(sentence([j[0], j[1], w])), type: 'tf', answer: right,
      hint: 'Does the end part tell why, or when?', explain: W.sent(sentence(j)), meta: { k: 'g3-complex-tf', a: j[0], w: w } };
  }

  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'kinds', title: 'Kinds of sentences', sub: 'Telling, asking, strong feeling, command.',
      concepts: [
        { slug: 'kinds', title: 'Four kinds of sentences', exp: ['B3.1'], skill: 'kinds',
          model: [
            step(W.sent('We live near a lake.'), '<b>Telling</b>. Ends with .'),
            step(W.sent('Can we go skating?'), '<b>Asking</b>. Ends with ?'),
            step(W.sent('What a huge wave!'), '<b>Strong feeling</b>. Ends with !'),
            step(W.sent('Put on your boots.'), '<b>Command</b>. Tells someone to do something.'),
            step(W.sent('Stop at the corner.'), 'It starts with a doing word: a command.')
          ],
          guided: [function () { return kind(1); }, endMark, matchKind],
          check: [function () { return kind(2); }, kindTf, function () { return pickKind(2); }, endMark, function () { return kind(3); }],
          coach: '<p>Play a quick game: you say a sentence and the child holds up a card for the kind. Use real sentences from the day.</p>',
          mistake: '<p>Calling every sentence with ! "strong feeling". A command can end with ! too ("Stop!"). Ask: is someone being told to do something?</p>' },
        { slug: 'complete', title: 'A complete sentence', exp: ['B3.1'], skill: 'complete',
          model: [
            step(W.sent('The big brown dog.'), 'Who? Yes. Did what? Missing.'),
            step(W.sent('Ran to the lake.'), 'Did what? Yes. Who? Missing.'),
            step(W.sent('The fox ran to the lake.'), 'Who and did what: complete.'),
            step(W.sent('Climbed the tall tree.'), 'Another one. Who?'),
            step(W.sent('<mark class="hl">Kai</mark> climbed the tall tree.'), 'Add who. Now it is complete.')
          ],
          guided: [function () { return complete(1); }, missing, completeTf],
          check: [function () { return complete(2); }, function () { return pickComplete(2); }, missing, function () { return orderWhole(2); }, function () { return complete(3); }],
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
            step(W.sent('The hill was steep.') + W.sent('We climbed it.'), 'Two more.'),
            step(W.sent('The hill was steep, <b>but</b> we climbed it.'), '<b>but</b>: a surprise.'),
            step(W.sent('Hana fed the cat<mark class="hl">,</mark> <b>and</b> she watered the plants.'), '<b>and</b>: one more thing. A comma comes first.')
          ],
          guided: [function () { return joinWord(1); }, orderJoin, pickJoined],
          check: [function () { return joinWord(2); }, joinTf, pickJoined, orderJoin, function () { return joinWord(3); }],
          coach: '<p>Give two short sentences about the child\'s day and ask them to join them out loud. Then try another joining word and talk about how the meaning changes.</p>',
          mistake: '<p>Using "and" for everything. Ask: "Is it a surprise? Is it what happened next?"</p>' },
        { slug: 'because-when', title: 'because and when', exp: ['B3.1'], skill: 'why-when',
          model: [
            step(W.sent('We wore our coats.'), 'What happened.'),
            step(W.sent('We wore our coats <b>because</b> it was cold.'), '<b>because</b> tells <b>why</b>.'),
            step(W.sent('Call me.'), 'What to do.'),
            step(W.sent('Call me <b>when</b> you get home.'), '<b>when</b> tells <b>at what time</b>.'),
            step(W.sent('<b>When</b> the bell rings, we line up.'), 'The <b>when</b> part can come first. Then add a comma.')
          ],
          guided: [function () { return becauseWhen(1); }, whichPart, orderComplex],
          check: [function () { return becauseWhen(2); }, complexTf, whichPart, orderComplex, function () { return becauseWhen(3); }],
          coach: '<p>Ask "Why?" after a sentence, and let the child answer with "because...". Then ask "When?" and answer with "when...".</p>',
          mistake: '<p>Starting a sentence with "Because" and stopping there. The "because" part needs the main part with it.</p>' }
      ]
    }],
    practice: [
      { id: 'kinds', name: 'Four kinds of sentences', code: 'B3.1', gen: kind },
      { id: 'complete', name: 'A complete sentence', code: 'B3.1', gen: complete },
      { id: 'joining', name: 'and, but, so', code: 'B3.1', gen: joinWord },
      { id: 'why-when', name: 'because and when', code: 'B3.1', gen: becauseWhen }
    ]
  });

  Q.shapes('sentences', {
    kinds: [[1, 'end-mark', endMark], [1, 'match', matchKind], [2, 'pick', pickKind], [2, 'true-false', kindTf]],
    complete: [[1, 'missing', missing], [1, 'true-false', completeTf], [2, 'pick', pickComplete], [2, 'order', orderWhole]],
    joining: [[1, 'pick-sentence', pickJoined], [1, 'order', orderJoin], [2, 'true-false', joinTf]],
    'why-when': [[1, 'which-part', whichPart], [1, 'order', orderComplex], [2, 'true-false', complexTf]]
  });
})();
