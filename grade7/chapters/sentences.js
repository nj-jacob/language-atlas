/* Grade 7: sentences. Independent and dependent clauses, the four sentence types, joining ideas to show how they relate, and fixing fragments and run-ons.
   Ontario 2023 Language, Grade 7, B3.1 "use their knowledge of sentence types and forms to construct sentences that communicate ideas effectively,
   including using and creating complex sentences that combine phrases and clauses to express relationships among ideas".
   All sentences are written for this site. Answer checks: tests/verify/grade7-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- sentence types ---------- */
  var TYPES = {
    simple: ['The canoe tipped over in the rapids.', 'Leila and Mateo built a snow fort.', 'The old bridge creaks in the wind.', 'My grandmother speaks Tagalog and English.'],
    compound: ['The canoe tipped over, but nobody got hurt.', 'The snow kept falling, so school closed early.', 'Kai plays the drums, and his sister sings.', 'We could take the bus, or we could walk.'],
    complex: ['Because the snow kept falling, school closed early.', 'The canoe tipped over when it hit a rock.', 'Although the trail was steep, we reached the top.', 'We will leave if the rain stops.'],
    'compound-complex': ['When the canoe tipped over, we swam to shore, and Kai grabbed the paddles.', 'Although the trail was steep, we reached the top, but our legs were sore.',
      'If the rain stops, we will leave, and we will be home by dinner.', 'The power went out because the wind was strong, so we played cards.']
  };
  var TNAMES = Object.keys(TYPES);
  var TWHAT = { simple: 'one independent clause', compound: 'two independent clauses joined by and, but, or or so', complex: 'an independent clause and a dependent clause', 'compound-complex': 'two independent clauses and a dependent clause' };
  function typeOf(lv) {
    var t = R.pick(TNAMES), s = R.pick(TYPES[t]);
    return Q.tiles('What type of sentence is this?', t, TNAMES.filter(function (x) { return x !== t; }).slice(0, lv > 1 ? 3 : 2), { fig: W.sent(s),
      prompt: 'Count the clauses. Is there a joining word like because or when?', hint: 'Look for , and / , but / , so (two independent clauses) and for because, when, if, although (a dependent clause).',
      explain: '<b>' + cap(t) + '</b>: ' + TWHAT[t] + '.', meta: { k: 'g7-type-of', s: s } });
  }
  function typePick() {
    var t = R.pick(TNAMES), right = R.some(TYPES[t], 2), wrong = R.some(TNAMES.filter(function (x) { return x !== t; }), 2).map(function (x) { return R.pick(TYPES[x]); });
    return Q.all('Pick every <b>' + t + '</b> sentence.', right, wrong, { hint: cap(t) + ': ' + TWHAT[t] + '.', explain: cap(t) + ': ' + TWHAT[t] + '.', meta: { k: 'g7-type-pick', t: t } });
  }
  function typeMatch() {
    var ts = R.some(TNAMES, 3);
    return { q: 'Match each sentence to its type.', type: 'match', pairs: ts.map(function (t) { return [R.pick(TYPES[t]), t]; }), hint: 'Count the clauses in each one.', explain: 'Count the independent and dependent clauses.', meta: { k: 'g7-type-match' } };
  }
  /* [independent clause, the same idea as a dependent clause] */
  var CLAUSES = [['the roads were icy', 'because the roads were icy'], ['the bell rang', 'when the bell rang'], ['the trail was steep', 'although the trail was steep'], ['you sign up by Friday', 'if you sign up by Friday'],
    ['the river flooded', 'after the river flooded'], ['the power came back', 'until the power came back']];
  function clauseKind() {
    var c = R.pick(CLAUSES), dep = R.int(0, 1) === 1, shown = dep ? c[1] : c[0];
    return { q: 'Can this clause stand alone as a sentence?', fig: W.sent(shown), type: 'tap', tiles: ['Yes: independent', 'No: dependent'], answer: dep ? 1 : 0,
      prompt: 'Read it on its own. Does it feel finished?', hint: 'A clause that starts with because, when, if or although needs more.', explain: dep ? 'It leaves you waiting: dependent.' : 'It is a complete thought: independent.', meta: { k: 'g7-clause-kind', s: shown } };
  }

  /* ---------- joining ideas: [main clause, other clause, how they relate, joining word] ---------- */
  var JOIN = [['the bus was late', 'the roads were icy', 'cause', 'because'], ['the river flooded', 'it rained for three days', 'cause', 'because'],
    ['we kept paddling', 'the wind was strong', 'contrast', 'although'], ['the library stayed open', 'the power was out', 'contrast', 'although'],
    ['the crowd cheered', 'the team scored', 'time', 'when'], ['Omar practised every day', 'he could play the song', 'time', 'until'],
    ['you can join the club', 'you sign up by Friday', 'condition', 'if'], ['the seedlings will die', 'someone waters them', 'condition', 'unless']];
  var BY = { cause: 'because', contrast: 'although', time: 'when', condition: 'if' };
  var RELATE = { because: 'cause', although: 'contrast', when: 'time', until: 'time', if: 'condition', unless: 'condition' };
  function joinWords(j) { return R.shuffle(['because', 'although', 'when', 'unless'].filter(function (w) { return RELATE[w] !== j[2]; }).slice(0, 2)); }
  function combine(lv) {
    var j = R.pick(JOIN), right = cap(j[0]) + ' ' + j[3] + ' ' + j[1] + '.', wrong = joinWords(j).map(function (w) { return cap(j[0]) + ' ' + w + ' ' + j[1] + '.'; });
    return Q.one('Join the ideas to show <b>' + j[2] + '</b>.', right, wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + '.') + W.sent(cap(j[1]) + '.'),
      prompt: 'Which joining word shows ' + j[2] + '?', hint: 'because: cause. although: contrast. when, until: time. if, unless: condition.', explain: W.sent(right), meta: { k: 'g7-combine', main: j[0], rel: j[2] } });
  }
  function joinWord(lv) {
    var j = R.pick(JOIN);
    return Q.tiles('Which word fits best?', j[3], joinWords(j).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + ' ' + W.gap() + ' ' + j[1] + '.'),
      hint: 'How are the two ideas connected: cause, contrast, time or condition?', explain: W.sent(cap(j[0]) + ' <b>' + j[3] + '</b> ' + j[1] + '.'), meta: { k: 'g7-join-word', main: j[0] } });
  }
  function relation() {
    var j = R.pick(JOIN), s = cap(j[0]) + ' ' + j[3] + ' ' + j[1] + '.';
    return Q.tiles('How are the ideas related?', j[2], R.some(['cause', 'contrast', 'time', 'condition'].filter(function (x) { return x !== j[2]; }), 2), { fig: W.sent(s.replace(j[3], '<b>' + j[3] + '</b>')),
      hint: 'The joining word tells you.', explain: '<b>' + j[3] + '</b> shows ' + j[2] + '.', meta: { k: 'g7-relation', s: s } });
  }
  /* the dependent clause first: a comma after it */
  function fronted(lv) {
    var j = R.pick(JOIN.filter(function (x) { return x[3] !== 'until'; })), a = j[0];
    var right = cap(j[3]) + ' ' + j[1] + ', ' + a + '.', wrong = [cap(j[3]) + ' ' + j[1] + ' ' + a + '.', cap(j[3]) + ', ' + j[1] + ' ' + a + '.'];
    return Q.one('Which sentence uses the comma correctly?', right, wrong.slice(0, lv > 1 ? 2 : 1), { prompt: 'Where does the dependent clause end?',
      hint: 'When the dependent clause comes first, put a comma after it.', explain: W.sent(right), meta: { k: 'g7-fronted', sub: j[3] + ' ' + j[1] } });
  }

  /* ---------- fragments and run-ons ---------- */
  var FRAG = ['Because the gym was closed.', 'After the storm passed over the lake.', 'Running down the hall with a stack of books.', 'The tall girl from my hockey team.', 'When we reach the campsite.'];
  var RUNON = ['The power went out, we lit candles.', 'The bus was late we missed the start.', 'Noor won the race she was thrilled.', 'The lake froze early, we went skating.'];
  var WHOLE = ['The power went out, so we lit candles.', 'Because the gym was closed, we played outside.', 'Noor won the race, and she was thrilled.', 'The tall girl from my hockey team scored twice.', 'We set up the tent when we reached the campsite.'];
  /* [run-on, good fixes, bad fixes] */
  var FIX = [['The power went out, we lit candles.', ['The power went out, so we lit candles.', 'The power went out; we lit candles.'], ['The power went out we lit candles.', 'The power, went out we lit candles.']],
    ['The lake froze early, we went skating.', ['The lake froze early, so we went skating.', 'The lake froze early. We went skating.'], ['The lake froze, early we went skating.', 'The lake froze early we went skating.']],
    ['Noor won the race she was thrilled.', ['Noor won the race, and she was thrilled.', 'Noor won the race. She was thrilled.'], ['Noor won, the race she was thrilled.', 'Noor won the race she, was thrilled.']]];
  function whole(lv) {
    return Q.one('Which is a <b>complete</b> sentence?', R.pick(WHOLE), [R.pick(FRAG), R.pick(RUNON)].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [R.pick(FRAG.concat(RUNON))] : []), {
      prompt: 'Does it have a complete thought? Are two sentences crammed together?', hint: 'A complete sentence has an independent clause and is not two sentences joined by only a comma.', explain: 'A complete thought, correctly joined.', meta: { k: 'g7-whole' } });
  }
  function whatsWrong() {
    var frag = R.int(0, 1) === 1, s = frag ? R.pick(FRAG) : R.pick(RUNON);
    return { q: 'What is wrong with this?', fig: W.sent(s), type: 'tap', tiles: ['It is a fragment: a part is missing.', 'It is a run-on: two sentences crammed together.'], answer: frag ? 0 : 1,
      hint: 'Is something missing, or is there too much?', explain: frag ? 'A fragment: it is not a complete thought.' : 'A run-on: two complete thoughts with no joining word.', meta: { k: 'g7-whats-wrong', s: s } };
  }
  function fixRunOn(lv) {
    var f = R.pick(FIX);
    return Q.one('Which fixes the run-on?', R.pick(f[1]), f[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(f[0]), hint: 'Add a joining word after the comma, use a semicolon, or make two sentences.',
      explain: f[1].join(' or '), meta: { k: 'g7-fix-runon', s: f[0] } });
  }
  function fixPick() {
    var f = R.pick(FIX);
    return Q.all('Pick every good way to fix the run-on.', f[1], f[2], { fig: W.sent(f[0]), hint: 'There is more than one good fix.', explain: f[1].join(' or '), meta: { k: 'g7-fix-pick', s: f[0] } });
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'clauses', title: 'Clauses and sentence types', sub: 'The building blocks of a sentence.',
      concepts: [
        { slug: 'clauses', title: 'Some clauses cannot stand alone', exp: ['B3.1'], skill: 'types',
          model: [
            step(W.sent('the roads were icy'), 'A complete thought: <b>independent</b>.'),
            step(W.sent('<b>because</b> the roads were icy'), 'Leaves you waiting: <b>dependent</b>.'),
            step(W.sent('The bus was late <b>because</b> the roads were icy.'), 'Joined to an independent clause, it works.')
          ],
          guided: [clauseKind, clauseKind],
          check: [clauseKind, clauseKind],
          coach: '<p>Read the clause aloud and ask, "Is that the whole thing?" A dependent clause makes you wait for more.</p>',
          mistake: '<p>Writing a dependent clause on its own with a full stop ("Because I was tired."). Join it to an independent clause.</p>' },
        { slug: 'types', title: 'Four sentence types', exp: ['B3.1'], skill: 'types',
          model: [
            step(W.sent('The canoe tipped over.'), '<b>Simple</b>: one independent clause.'),
            step(W.sent('The canoe tipped over, <b>but</b> nobody got hurt.'), '<b>Compound</b>: two, joined.'),
            step(W.sent('The canoe tipped over <b>when</b> it hit a rock.'), '<b>Complex</b>: plus a dependent clause.'),
            step(W.sent('<b>When</b> it tipped, we swam to shore, <b>and</b> Kai grabbed the paddles.'), '<b>Compound-complex</b>: both.')
          ],
          guided: [function () { return typeOf(1); }, function () { return typeOf(1); }],
          check: [function () { return typeOf(2); }, typeMatch],
          coach: '<p>Underline independent clauses in one colour and dependent clauses in another. The colours tell the type.</p>',
          mistake: '<p>Calling any long sentence "complex". Length does not decide the type; the clauses do.</p>' }
      ]
    }, {
      id: 'joining', title: 'Joining ideas', sub: 'Show how ideas connect.',
      concepts: [
        { slug: 'relate', title: 'The joining word shows how ideas relate', exp: ['B3.1'], skill: 'combine',
          model: [
            step(W.tile('because'), 'Cause.'),
            step(W.tile('although'), 'Contrast.'),
            step(W.tile('when') + ' ' + W.tile('until'), 'Time.'),
            step(W.tile('if') + ' ' + W.tile('unless'), 'Condition.')
          ],
          guided: [function () { return joinWord(1); }, function () { return combine(1); }],
          check: [function () { return combine(2); }, relation],
          coach: '<p>Give two short sentences and ask the child to join them three ways (because, although, when). Talk about how the meaning changes.</p>',
          mistake: '<p>Using "and" for everything. "And" adds; it does not show cause or contrast.</p>' },
        { slug: 'fronted', title: 'A dependent clause can go first', exp: ['B3.1'], skill: 'combine',
          model: [
            step(W.sent('The bus was late because the roads were icy.')),
            step(W.sent('Because the roads were icy<mark class="hl">,</mark> the bus was late.'), 'Moved to the front: add a comma.')
          ],
          guided: [function () { return fronted(1); }, function () { return fronted(1); }],
          check: [function () { return fronted(2); }, function () { return joinWord(2); }],
          coach: '<p>Starting with the dependent clause puts the reason or condition first. Ask: "Which do you want the reader to notice first?"</p>',
          mistake: '<p>Forgetting the comma after a front dependent clause, or putting it right after the joining word.</p>' }
      ]
    }, {
      id: 'fixing', title: 'Fixing sentences', sub: 'Fragments and run-ons.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is missing a part', exp: ['B3.1'], skill: 'fix',
          model: [
            step(W.sent('Because the gym was closed.'), 'Because... what?'),
            step(W.sent('Because the gym was closed, <b>we played outside</b>.'), 'Add an independent clause.')
          ],
          guided: [whatsWrong, function () { return whole(1); }],
          check: [whatsWrong, function () { return whole(2); }],
          coach: '<p>Fragments are fine in speech and in some stories. In school writing, ask: "Could this stand on its own?"</p>',
          mistake: '<p>Thinking a long group of words must be a sentence ("Running down the hall with a stack of books.").</p>' },
        { slug: 'run-on', title: 'A run-on needs a joining word or a full stop', exp: ['B3.1'], skill: 'fix',
          model: [
            step(W.sent('The power went out, we lit candles.'), 'Two sentences, just a comma.'),
            step(W.sent('The power went out, <b>so</b> we lit candles.'), 'Add a joining word.'),
            step(W.sent('The power went out<b>.</b> <b>W</b>e lit candles.'), 'Or make two sentences.')
          ],
          guided: [function () { return fixRunOn(1); }, whatsWrong],
          check: [function () { return fixRunOn(2); }, fixPick],
          coach: '<p>Read the sentence aloud. Where your voice naturally stops, check that there is a full stop, a semicolon or a joining word.</p>',
          mistake: '<p>Fixing a run-on by adding more commas. A comma alone cannot join two sentences.</p>' }
      ]
    }],
    practice: [
      { id: 'types', name: 'Clauses and sentence types', code: 'B3.1', gen: typeOf },
      { id: 'combine', name: 'Joining ideas', code: 'B3.1', gen: combine },
      { id: 'fix', name: 'Fragments and run-ons', code: 'B3.1', gen: whole }
    ],
    tasks: [
      { id: 'combine-write', title: 'Write it four ways', code: 'B3.1', pic: W.icon('write'), say: 'Write about your weekend in four sentences: simple, compound, complex and compound-complex.', write: true,
        run: ['The child writes four sentences about one topic, one of each type.', 'Together, underline the independent clauses and circle the joining words.', 'Ask which sentence shows the relationship between ideas most clearly.'],
        rubric: ['Sentences are all simple, or not complete.', 'Two types are correct.', 'All four types are correct.', 'All four are correct and the joining words show cause, contrast, time or condition precisely.'] }
    ]
  });

  Q.shapes('sentences', {
    types: [[1, 'clause', clauseKind], [2, 'pick', typePick], [2, 'match', typeMatch]],
    combine: [[1, 'join-word', joinWord], [1, 'relation', relation], [2, 'fronted', fronted]],
    fix: [[1, 'whats-wrong', whatsWrong], [1, 'fix', fixRunOn], [2, 'pick', fixPick]]
  });
})();
