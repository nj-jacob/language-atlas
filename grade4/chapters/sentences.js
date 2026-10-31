/* Grade 4: sentences. Simple and compound sentences, joining words, dependent clauses, and prepositional phrases.
   Ontario 2023 Language, Grade 4, B3.1 "identify and construct various sentence types and forms, including simple and compound
   sentences formed with prepositional phrases and/or independent and dependent clauses".
   All sentences are written for this site. Answer checks: tests/verify/grade4-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- compound sentences: [first sentence, second sentence, the joining word] ---------- */
  var JOIN = [['The snow was deep', 'we wore our snowshoes', 'so'], ['Kai wanted to skate', 'the rink was closed', 'but'], ['Noor plays the drums', 'her sister plays the fiddle', 'and'],
    ['We can walk to the park', 'we can take the bus', 'or'], ['The wind was strong', 'the canoe drifted to shore', 'so'], ['Mateo likes soup', 'he does not like salad', 'but'],
    ['Grandma baked bannock', 'Grandpa made tea', 'and'], ['You can read a book', 'you can draw a picture', 'or'], ['It started to rain', 'we went inside', 'so'], ['The trail was long', 'nobody wanted to stop', 'but']];
  var SIMPLE = ['Kai and Mei went skating after school.', 'The big brown moose crossed the road.', 'My cousin plays hockey on Saturdays.', 'We ate lunch beside the lake.',
    'The library opens at nine.', 'Owen and his dog ran along the beach.'];
  var WORDJOB = { and: 'adds another idea', but: 'shows a difference', so: 'shows what happened because of it', or: 'gives a choice' };
  function compound(j) { return j[0] + ', ' + j[2] + ' ' + j[1] + '.'; }
  function simpleOrCompound() {
    var isC = R.int(0, 1) === 1, s = isC ? compound(R.pick(JOIN)) : R.pick(SIMPLE);
    return { q: 'Is this a simple or a compound sentence?', fig: W.sent(s), type: 'tap', tiles: ['simple', 'compound'], answer: isC ? 1 : 0,
      prompt: 'Could you split it into two sentences?', hint: 'Compound: two sentences joined with a comma and and, but, so or or.', explain: isC ? 'Two sentences joined: <b>compound</b>.' : 'One idea: <b>simple</b>.', meta: { k: 'g4-simple-compound', s: s } };
  }
  function joinWord(lv) {
    var j = R.pick(JOIN), words = ['and', 'but', 'so', 'or'];
    return Q.tiles('Which joining word fits best?', j[2], words.filter(function (w) { return w !== j[2]; }).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(j[0] + ', ' + W.gap() + ' ' + j[1] + '.'), prompt: 'Is it more, a difference, a result, or a choice?',
      hint: 'and: more. but: a difference. so: a result. or: a choice.', explain: '<b>' + j[2] + '</b> ' + WORDJOB[j[2]] + '.', meta: { k: 'g4-join-word', s: j[0] } });
  }
  function combine(lv) {
    var j = R.pick(JOIN), right = compound(j);
    var wrong = [j[0] + ' ' + j[2] + ' ' + j[1] + '.', j[0] + ', ' + j[1] + '.', j[0] + '. ' + cap(j[2]) + ', ' + j[1] + '.'];
    return Q.one('Which joins the two sentences correctly?', right, wrong.slice(0, lv > 1 ? 3 : 2), { fig: W.sent(j[0] + '.') + W.sent(cap(j[1]) + '.'),
      hint: 'A comma, then the joining word.', explain: W.sent(right), meta: { k: 'g4-combine', s: j[0] } });
  }
  function orderCompound() {
    var j = R.pick(JOIN);
    return { q: 'Put the parts in order to make a compound sentence.', type: 'order', items: [j[0] + ',', j[2], j[1] + '.'],
      hint: 'First sentence, then the joining word, then the second sentence.', explain: W.sent(compound(j)), meta: { k: 'g4-order-compound' } };
  }
  function tfCompound() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, s = right ? compound(j) : j[0] + ' ' + j[2] + ' ' + j[1] + '.';
    return { q: 'Is this compound sentence punctuated correctly?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['A comma goes before the joining word.', 'Compound sentences never have a comma.'], answer: 0 },
      hint: 'Look just before the joining word.', explain: W.sent(compound(j)), meta: { k: 'g4-tf-compound', s: s } };
  }

  /* ---------- dependent clauses: [dependent clause, independent clause] ---------- */
  var CLAUSE = [['When the bell rang', 'we lined up at the door'], ['Because it was raining', 'the game was cancelled'], ['Although the water was cold', 'Hana jumped in'],
    ['If you finish early', 'you can help me'], ['After we ate dinner', 'we played cards'], ['Before the sun came up', 'the birds started singing'],
    ['While Dad cooked', 'Liam set the table'], ['Since the bus was late', 'we walked to school']];
  var NOTEND = ['because we were late.', 'under the old bridge.', 'when the snow melted.', 'after the long day.'];
  function full(c) { return c[0] + ', ' + c[1] + '.'; }
  function complete(lv) {
    var c = R.pick(CLAUSE), o = R.pick(CLAUSE.filter(function (x) { return x !== c; }));
    return Q.one('Which is a <b>complete</b> sentence?', full(c), [c[0] + '.'].concat(lv > 1 ? [o[0] + '.'] : []), {
      prompt: 'Does it finish the idea?', hint: 'A dependent clause needs another part to finish the idea.', explain: W.sent(full(c)), meta: { k: 'g4-complete', s: c[0] } });
  }
  function tapDependent() {
    var c = R.pick(CLAUSE), tiles = [c[0], c[1]];
    return { q: 'Tap the <b>dependent clause</b>: the part that cannot stand alone.', fig: W.sent(full(c)), type: 'tap', tiles: tiles, answer: 0,
      hint: 'It starts with a word like because, when or if.', explain: '<b>' + c[0] + '</b> cannot stand alone.', meta: { k: 'g4-tap-dependent' } };
  }
  function finish(lv) {
    var c = R.pick(CLAUSE);
    return Q.one('Which ending makes a complete sentence?', c[1] + '.', R.some(NOTEND, lv > 1 ? 2 : 1), { fig: W.sent(c[0] + ', ' + W.gap()),
      hint: 'The ending must be able to stand alone.', explain: W.sent(full(c)), meta: { k: 'g4-finish', s: c[0] } });
  }
  function tfFragment() {
    var c = R.pick(CLAUSE), right = R.int(0, 1) === 1, s = right ? full(c) : c[0] + '.';
    return { q: 'Is this a complete sentence?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['It needs an independent clause to finish the idea.', 'It has a capital letter and a period, so it is always complete.'], answer: 0 },
      hint: 'Does it finish the idea?', explain: W.sent(full(c)), meta: { k: 'g4-tf-fragment', s: s } };
  }
  function orderClause() {
    var c = R.pick(CLAUSE);
    return { q: 'Put the parts in order. Start with the dependent clause.', type: 'order', items: [c[0] + ',', c[1] + '.'], first: 'First', last: 'Last',
      hint: 'The dependent clause comes first, then a comma.', explain: W.sent(full(c)), meta: { k: 'g4-order-clause' } };
  }

  /* ---------- prepositional phrases: [who, what they did, the phrase, where or when] ---------- */
  var PHRASE = [['The fox', 'hid', 'under the old log', 'where'], ['Tala', 'skated', 'after school', 'when'], ['The kite', 'flew', 'over the trees', 'where'],
    ['We', 'will leave', 'before lunch', 'when'], ['My cat', 'sleeps', 'on the windowsill', 'where'], ['The geese', 'flew south', 'in October', 'when'],
    ['Omar', 'waited', 'beside the door', 'where'], ['The store', 'closes', 'at six', 'when'], ['A heron', 'stood', 'in the shallow water', 'where'], ['We', 'played games', 'during the storm', 'when']];
  var NOTPHRASE = ['the old log', 'ran quickly', 'my little brother', 'very happy'];
  function sentOf(p) { return p[0] + ' ' + p[1] + ' ' + p[2] + '.'; }
  function tapPhrase() {
    var p = R.pick(PHRASE);
    return { q: 'Tap the <b>prepositional phrase</b>.', fig: W.sent(sentOf(p)), type: 'tap', tiles: [p[0], p[1], p[2]], answer: 2,
      prompt: 'Which part tells where or when?', hint: 'It starts with a word like in, on, under, after or before.', explain: '<b>' + p[2] + '</b> tells ' + p[3] + '.', meta: { k: 'g4-tap-phrase' } };
  }
  function whereWhen() {
    var p = R.pick(PHRASE);
    return Q.tiles('What does <b>' + p[2] + '</b> tell?', p[3], [p[3] === 'where' ? 'when' : 'where'], { fig: W.sent(sentOf(p)),
      hint: 'A place: where. A time: when.', explain: '<b>' + p[2] + '</b> tells ' + p[3] + '.', meta: { k: 'g4-where-when', phrase: p[2] } });
  }
  function addPhrase() {
    var kind = R.pick(['where', 'when']), p = R.pick(PHRASE.filter(function (x) { return x[3] === kind; })), o = R.pick(PHRASE.filter(function (x) { return x[3] !== kind; }));
    return Q.one('Add a phrase that tells <b>' + kind + '</b>.', p[2], [o[2]], { fig: W.sent(p[0] + ' ' + p[1] + ' ' + W.gap() + '.'),
      hint: 'Where: a place. When: a time.', explain: W.sent(sentOf(p)), meta: { k: 'g4-add-phrase', kind: kind } });
  }
  function pickPhrases() {
    return Q.all('Pick every <b>prepositional phrase</b>.', R.some(PHRASE, 2).map(function (p) { return p[2]; }), R.some(NOTPHRASE, 2), {
      hint: 'A prepositional phrase starts with a word like in, on, under, at or during.', explain: 'Prepositional phrases tell where or when.', meta: { k: 'g4-pick-phrases' } });
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'compound', title: 'Simple and compound sentences', sub: 'Join two sentences into one.',
      concepts: [
        { slug: 'compound', title: 'Join two sentences with a comma and a joining word', exp: ['B3.1'], skill: 'compound',
          model: [
            step(W.sent('The snow was deep.') + W.sent('We wore our snowshoes.'), 'Two simple sentences.'),
            step(W.sent('The snow was deep<mark class="hl">, so</mark> we wore our snowshoes.'), 'One <b>compound</b> sentence.'),
            step(W.sent('Kai and Mei went skating.'), 'Two names, but one idea: still simple.')
          ],
          guided: [simpleOrCompound, combine.bind(null, 1)],
          check: [simpleOrCompound, orderCompound],
          coach: '<p>Test it: cover the joining word. If both halves are complete sentences, it is compound and needs the comma.</p>',
          mistake: '<p>Putting a comma before every "and", even in a list of two names. Only two complete sentences need it.</p>' },
        { slug: 'join-word', title: 'Choose the joining word', exp: ['B3.1'], skill: 'compound',
          model: [
            step(W.sent('Noor plays the drums, <b>and</b> her sister plays the fiddle.'), '<b>and</b>: more.'),
            step(W.sent('Kai wanted to skate, <b>but</b> the rink was closed.'), '<b>but</b>: a difference.'),
            step(W.sent('It started to rain, <b>so</b> we went inside.'), '<b>so</b>: a result.'),
            step(W.sent('We can walk, <b>or</b> we can take the bus.'), '<b>or</b>: a choice.')
          ],
          guided: [function () { return joinWord(1); }, function () { return joinWord(1); }],
          check: [function () { return joinWord(2); }, tfCompound],
          coach: '<p>Make a hand sign for each word (and: add, but: turn, so: arrow, or: two hands up) and use them when talking.</p>',
          mistake: '<p>Using "and" for everything. Ask: is the second idea more, different, a result, or a choice?</p>' }
      ]
    }, {
      id: 'clauses', title: 'Clauses and phrases', sub: 'Add detail to a sentence.',
      concepts: [
        { slug: 'dependent', title: 'A dependent clause cannot stand alone', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent('When the bell rang.'), 'When the bell rang... what happened?'),
            step(W.sent('<b>When the bell rang</b>, we lined up at the door.'), 'Now it is complete.'),
            step(W.sent('because &middot; when &middot; if &middot; after &middot; although'), 'These words often start one.')
          ],
          guided: [function () { return complete(1); }, tapDependent],
          check: [function () { return complete(2); }, function () { return finish(1); }],
          coach: '<p>Say a dependent clause in a hanging voice ("Because it was raining...") and let the child finish it. Then write it with the comma.</p>',
          mistake: '<p>Writing "Because it was late." on its own. Ask: "Because it was late... what happened?"</p>' },
        { slug: 'phrase', title: 'A prepositional phrase tells where or when', exp: ['B3.1'], skill: 'phrases',
          model: [
            step(W.sent('The fox hid.'), 'Where?'),
            step(W.sent('The fox hid <mark class="hl">under the old log</mark>.'), 'A place.'),
            step(W.sent('Tala skated <mark class="hl">after school</mark>.'), 'A time.')
          ],
          key: '<p>Phrases start with words like in, on, under, after, before and during.</p>',
          guided: [tapPhrase, whereWhen],
          check: [tapPhrase, addPhrase],
          coach: '<p>Play "stretch it": say a short sentence and ask "Where?" or "When?" to make it longer with a phrase.</p>',
          mistake: '<p>Thinking any group of words is a phrase. It must start with a word like in, on or after.</p>' }
      ]
    }],
    practice: [
      { id: 'compound', name: 'Compound sentences', code: 'B3.1', gen: simpleOrCompound },
      { id: 'clauses', name: 'Dependent clauses', code: 'B3.1', gen: complete },
      { id: 'phrases', name: 'Prepositional phrases', code: 'B3.1', gen: tapPhrase }
    ]
  });

  Q.shapes('sentences', {
    compound: [[1, 'join-word', joinWord], [1, 'combine', combine], [1, 'order', orderCompound], [2, 'true-false', tfCompound]],
    clauses: [[1, 'tap-clause', tapDependent], [1, 'finish', finish], [2, 'true-false', tfFragment], [1, 'order', orderClause]],
    phrases: [[1, 'where-when', whereWhen], [1, 'add-phrase', addPhrase], [2, 'pick', pickPhrases]]
  });
})();
