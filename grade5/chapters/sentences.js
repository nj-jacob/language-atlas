/* Grade 5: sentences. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Simple, compound, complex and compound-complex sentences; fixing fragments and run-on sentences.
   Ontario 2023 Language, Grade 5, B3.1 "identify and construct various sentence types and forms, including compound-complex sentences,
   and correct sentence fragments and run-on sentences" (see also the Language Conventions Continuum, Appendix B).
   All sentences are written for this site. Answer checks: tests/verify/grade5-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var KINDS = ['simple', 'compound', 'complex', 'compound-complex'];

  /* scenes: two complete thoughts (a, b), the joining word that fits them, and a part that cannot stand alone (dep) */
  var SCENES = [
    { a: 'Kiran grabbed his skates', b: 'Mia found the puck', c: 'and', dep: 'when the rink opened' },
    { a: 'the trail was muddy', b: 'we kept hiking', c: 'but', dep: 'after it rained all night' },
    { a: 'the bus was late', b: 'we missed the start of the show', c: 'so', dep: 'because the roads were icy' },
    { a: 'Grandma made bannock', b: 'I set the table', c: 'and', dep: 'while the soup cooked' },
    { a: 'the power went out', b: 'we lit candles', c: 'so', dep: 'when the storm hit' },
    { a: 'Leo wanted to swim', b: 'the lake was too cold', c: 'but', dep: 'since it was a hot day' },
    { a: 'Priya practised her speech', b: 'her dad timed her', c: 'and', dep: 'before the assembly began' },
    { a: 'the library closed early', b: 'we read at home', c: 'so', dep: 'because it was a holiday' },
    { a: 'the snow kept falling', b: 'school closed early', c: 'so', dep: 'after the wind picked up' },
    { a: 'Aiyana painted the mural', b: 'Ben added the border', c: 'and', dep: 'while the class watched' },
    { a: 'the ferry was full', b: 'we waited for the next one', c: 'so', dep: 'because it was a long weekend' },
    { a: 'the puppy chewed my shoe', b: 'Dad laughed', c: 'and', dep: 'while we ate breakfast' },
    { a: 'the canoe tipped over', b: 'everyone swam to shore', c: 'so', dep: 'when a big wave hit' },
    { a: 'Hana has played hockey', b: 'her brother has never tried it', c: 'but', dep: 'since she was four' },
    { a: 'the bread smelled delicious', b: 'it was too hot to eat', c: 'but', dep: 'when it came out of the oven' },
    { a: 'we planted tomatoes', b: 'Nana watered them', c: 'and', dep: 'after the last frost' },
    { a: 'the movie was sold out', b: 'we went bowling instead', c: 'so', dep: 'because it had just come out' }];
  var NOUNY = ['The tall pine by the lake.', 'Running down the hall.', 'My cousin from Winnipeg.', 'A box of old photos.', 'Under the kitchen table.', 'After the long, cold winter.', 'The girl with the purple backpack.', 'Jumping over the puddles.', 'Before the game on Saturday.'];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function scene() { return R.pick(SCENES); }
  function make(s, kind) {
    switch (kind) {
      case 'simple': return cap(s.a) + '.';
      case 'compound': return cap(s.a) + ', ' + s.c + ' ' + s.b + '.';
      case 'complex': return R.int(0, 1) ? cap(s.dep) + ', ' + s.a + '.' : cap(s.a) + ' ' + s.dep + '.';
      default: return cap(s.dep) + ', ' + s.a + ', ' + s.c + ' ' + s.b + '.';
    }
  }
  function runOn(s) { return cap(s.a) + (R.int(0, 1) ? ' ' : ', ') + s.b + '.'; }
  function fragment() { return R.int(0, 1) ? cap(scene().dep) + '.' : R.pick(NOUNY); }
  /* show the parts of a sentence: complete thoughts in one colour, the part that cannot stand alone in another */
  function marked(s, kind) {
    var i = '<span class="wt wt-base">', d = '<span class="wt wt-prefix">', e = '</span>';
    if (kind === 'compound') return i + cap(s.a) + e + ', <b>' + s.c + '</b> ' + i + s.b + e + '.';
    if (kind === 'complex') return d + cap(s.dep) + e + ', ' + i + s.a + e + '.';
    return d + cap(s.dep) + e + ', ' + i + s.a + e + ', <b>' + s.c + '</b> ' + i + s.b + e + '.';
  }

  /* ---------- kinds of sentences ---------- */
  function kindOf(lv, only) {
    var pool = only || (lv > 1 ? KINDS : ['simple', 'compound', 'complex']), k = R.pick(pool), s = scene(), shown = make(s, k);
    return Q.tiles('What kind of sentence is this?', k, pool.filter(function (x) { return x !== k; }), { fig: W.sent(shown),
      prompt: 'How many complete thoughts? Is there a part that cannot stand alone?', hint: 'Compound: two complete thoughts. Complex: a part that cannot stand alone. Both: compound-complex.',
      explain: k === 'simple' ? W.sent(shown) : W.sent(marked(s, k)), meta: { k: 'g5-kind', s: shown } });
  }
  function kindTf(lv, kind) {
    var others = KINDS.filter(function (x) { return x !== kind; }), right = R.int(0, 1) === 1, s = scene(), shown = make(s, right ? kind : R.pick(others));
    return { q: Q.name() + ' says this is a <b>' + kind + '</b> sentence.', fig: W.sent(shown), type: 'tf', answer: right,
      hint: 'Count the complete thoughts. Look for a part that cannot stand alone.', explain: right ? W.sent(marked(s, kind)) : 'It is not ' + kind + '.', meta: { k: 'g5-kind-tf', s: shown, kind: kind } };
  }
  function pickKind(lv, k0) {
    var k = k0 || R.pick(['compound', 'complex', 'compound-complex']), s = R.some(SCENES, 4), right = [make(s[0], k), make(s[1], k)];
    var wrong = KINDS.filter(function (x) { return x !== k; });
    return Q.all('Pick every <b>' + k + '</b> sentence.', right, [make(s[2], R.pick(wrong)), make(s[3], R.pick(wrong))], { hint: 'Count the complete thoughts. Look for because, when, while, after, since, before.',
      explain: W.sent(marked(s[0], k)), meta: { k: 'g5-pick-kind', kind: k } });
  }
  /* compound */
  function joinWord(lv) {
    var s = scene(), wrong = ['and', 'but', 'so'].filter(function (c) { return c !== s.c; });
    return Q.tiles('Which joining word fits best?', s.c, wrong, { fig: W.sent(cap(s.a) + ', ' + W.gap() + ' ' + s.b + '.'), prompt: 'Is the second idea extra, a surprise, or a result?',
      hint: 'and: adds. but: a surprise. so: a result.', explain: W.sent(marked(s, 'compound')), meta: { k: 'g5-join', a: s.a } });
  }
  function combine(lv) {
    var s = scene();
    return Q.one('Join the two sentences into one <b>compound</b> sentence.', make(s, 'compound'), [cap(s.a) + ', ' + s.b + '.', cap(s.a) + ' ' + s.c + ' ' + s.b].concat(lv > 1 ? [cap(s.a) + ' ' + s.b + '.'] : []), {
      fig: W.sent(cap(s.a) + '. ' + cap(s.b) + '.'), prompt: 'You need a comma and a joining word.', hint: 'Comma, then and, but or so.', explain: W.sent(marked(s, 'compound')), meta: { k: 'g5-combine', a: s.a } });
  }
  function buildCompound(lv) {
    var s = scene();
    return { q: 'Put the parts in order to make a <b>compound</b> sentence.', type: 'order', items: [cap(s.a) + ',', s.c, s.b + '.'],
      hint: 'Thought, comma, joining word, thought.', explain: W.sent(marked(s, 'compound')), meta: { k: 'g5-build-compound', a: s.a } };
  }
  /* complex */
  var SUBS = ['because', 'when', 'while', 'after', 'since', 'before'];
  function subOf(s) { return s.dep.split(' ')[0]; }
  function alonePart(lv) {
    var s = scene(), shown = make(s, 'complex');
    return Q.tiles('Which part <b>cannot</b> stand alone?', s.dep, [s.a], { fig: W.sent(shown), prompt: 'Say each part by itself. Which leaves you waiting?',
      hint: 'It starts with a word like because, when or after.', explain: W.sent(marked(s, 'complex')), meta: { k: 'g5-alone-part', s: shown } });
  }
  function subWord(lv) {
    var s = scene(), shown = make(s, 'complex'), w = subOf(s), words = shown.replace(/[.,]/g, '').toLowerCase().split(' ');
    var wrong = R.some(words.filter(function (x) { return x !== w && SUBS.indexOf(x) < 0 && x.length > 2; }), lv > 1 ? 3 : 2);
    return Q.tiles('Which word starts the part that cannot stand alone?', w, wrong, { fig: W.sent(shown), prompt: 'Look for because, when, while, after, since or before.',
      hint: 'Look for because, when, while, after, since or before.', explain: W.sent(marked(s, 'complex')), meta: { k: 'g5-sub-word', s: shown } });
  }
  function buildComplex(lv) {
    var s = scene();
    return { q: 'Put the parts in order to make a <b>complex</b> sentence.', type: 'order', items: [cap(s.dep) + ',', s.a + '.'],
      hint: 'Start with the part that cannot stand alone, then a comma.', explain: W.sent(marked(s, 'complex')), meta: { k: 'g5-build-complex', a: s.a } };
  }
  /* compound-complex */
  function buildCC(lv) {
    var s = scene();
    return { q: 'Put the parts in order to make a <b>compound-complex</b> sentence.', type: 'order', items: [cap(s.dep) + ',', s.a + ',', s.c + ' ' + s.b + '.'],
      hint: 'Start with the part that cannot stand alone. End with the joining word and its thought.', explain: W.sent(marked(s, 'compound-complex')), meta: { k: 'g5-build-cc', a: s.a } };
  }
  function addPart(lv) {
    var s = scene(), other = R.pick(SCENES.filter(function (x) { return x !== s; }));
    return Q.one('Add a part to make this <b>compound-complex</b>. Which fits?', cap(s.dep) + ',', [cap(other.a) + ',', cap(s.c) + ','], { fig: W.sent(W.gap() + ' ' + s.a + ', ' + s.c + ' ' + s.b + '.'),
      prompt: 'It already has two complete thoughts. What is missing?', hint: 'Add a part that cannot stand alone.', explain: W.sent(marked(s, 'compound-complex')), meta: { k: 'g5-add-part', a: s.a } });
  }

  /* ---------- fixing sentences ---------- */
  function fragOrNot(lv) {
    var frag = R.int(0, 1) === 1, s = scene(), shown = frag ? fragment() : make(s, R.pick(KINDS));
    return { q: 'Is this a complete sentence or a fragment?', fig: W.sent(shown), type: 'tap', tiles: ['Complete sentence', 'Fragment'], answer: frag ? 1 : 0,
      prompt: 'Does it have a complete thought?', hint: 'A fragment is missing part of a thought.', explain: 'It is <b>' + (frag ? 'a fragment' : 'a complete sentence') + '</b>.', meta: { k: 'g5-frag', s: shown } };
  }
  function whatIsIt(lv) {
    var r = R.int(0, 2), s = scene(), shown = r === 0 ? fragment() : r === 1 ? make(s, R.pick(KINDS)) : runOn(s);
    var tiles = ['Complete sentence', 'Fragment', 'Run-on'], right = ['Fragment', 'Complete sentence', 'Run-on'][r];
    return { q: 'What is this?', fig: W.sent(shown), type: 'tap', tiles: tiles, answer: tiles.indexOf(right),
      prompt: 'Does it have a complete thought? More than one, crammed together?', hint: 'A fragment is missing part. A run-on crams two sentences together with no joining word.',
      explain: 'It is <b>' + right.toLowerCase() + '</b>.', meta: { k: 'g5-frag', s: shown } };
  }
  function fixFrag(lv) {
    var s = scene(), frag = cap(s.dep) + '.';
    return Q.one('Which one fixes the fragment?', cap(s.dep) + ', ' + s.a + '.', [cap(s.dep) + ' and.', cap(s.dep) + ', and.'].concat(lv > 1 ? [cap(s.dep) + ', ' + s.c + '.'] : []), { fig: W.sent(frag),
      prompt: 'What is missing? A complete thought.', hint: 'Add a complete thought.', explain: W.sent(marked(s, 'complex')), meta: { k: 'g5-fix-frag', dep: s.dep } });
  }
  function pickFrag(lv) {
    var frags = R.some(NOUNY.concat(SCENES.map(function (x) { return cap(x.dep) + '.'; })), 2), s = R.some(SCENES, lv > 1 ? 3 : 2);
    return Q.all('Pick every <b>fragment</b>.', frags, s.map(function (x) { return make(x, R.pick(KINDS)); }), { hint: 'Which ones leave you waiting, or say who but not what they did?',
      explain: 'A fragment is missing part of a thought.', meta: { k: 'g5-pick-frag' } });
  }
  function fragTf(lv) {
    var frag = R.int(0, 1) === 1, shown = frag ? fragment() : make(scene(), R.pick(KINDS));
    return { q: Q.name() + ' says this is a complete sentence.', fig: W.sent(shown), type: 'tf', answer: !frag,
      why: { options: ['It has a complete thought.', 'It is missing part of a thought.'], answer: frag ? 1 : 0 },
      hint: 'Say it alone. Does it leave you waiting?', explain: 'It is <b>' + (frag ? 'a fragment' : 'a complete sentence') + '</b>.', meta: { k: 'g5-frag-tf', s: shown } };
  }
  function runOnOrNot(lv) {
    var bad = R.int(0, 1) === 1, s = scene(), shown = bad ? runOn(s) : make(s, R.pick(['compound', 'compound-complex']));
    return { q: 'Is this a run-on?', fig: W.sent(shown), type: 'tap', tiles: ['Yes, it is a run-on', 'No, it is joined the right way'], answer: bad ? 0 : 1,
      prompt: 'Is there a comma and a joining word between the two thoughts?', hint: 'Two thoughts need a comma and and, but or so.', explain: bad ? 'Two thoughts crammed together.' : W.sent(marked(s, shown.indexOf(s.dep) >= 0 ? 'compound-complex' : 'compound')), meta: { k: 'g5-run-on', s: shown } };
  }
  function fixRunOn(lv) {
    var s = scene(), bad = cap(s.a) + ' ' + s.b + '.';
    return Q.one('Which one fixes the run-on?', cap(s.a) + ', ' + s.c + ' ' + s.b + '.', [cap(s.a) + ', ' + s.b + '.'].concat(lv > 1 ? [cap(s.a) + ' ' + s.c + ', ' + s.b + '.'] : []), {
      fig: W.sent(bad), prompt: 'Two complete thoughts need a comma and a joining word, or a period.', hint: 'A comma alone is not enough.',
      explain: W.sent(marked(s, 'compound')), meta: { k: 'g5-fix-run-on', a: s.a } });
  }
  function fixTwo(lv) {
    var s = scene(), bad = cap(s.a) + ' ' + s.b + '.';
    return Q.one('Fix the run-on by making <b>two sentences</b>.', cap(s.a) + '. ' + cap(s.b) + '.', [cap(s.a) + ', ' + s.b + '.', cap(s.a) + ' ' + s.b + '.'].concat(lv > 1 ? [cap(s.a) + '. ' + s.b + '.'] : []), {
      fig: W.sent(bad), prompt: 'Where does the first thought end?', hint: 'Period at the end of the first thought. Capital to start the next.', explain: W.sent(cap(s.a) + '<b>.</b> <b>' + cap(s.b).charAt(0) + '</b>' + cap(s.b).slice(1) + '.'),
      meta: { k: 'g5-fix-two', a: s.a } });
  }
  function pickComplete(lv) {
    var s = R.some(SCENES, 2), right = [make(s[0], R.pick(KINDS)), make(s[1], R.pick(KINDS))];
    return Q.all('Pick every <b>complete</b> sentence.', right, [fragment(), runOn(R.pick(SCENES.filter(function (x) { return s.indexOf(x) < 0; })))], {
      hint: 'Each one must have a complete thought, joined the right way.', explain: 'Fragments and run-ons are not complete sentences.', meta: { k: 'g5-pick-complete' } });
  }

  var S0 = SCENES[2], S1 = SCENES[4], S2 = SCENES[1], S3 = SCENES[12];
  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'types', title: 'Kinds of sentences', sub: 'Build bigger sentences from complete thoughts.',
      concepts: [
        { slug: 'compound', title: 'Compound: two complete thoughts', exp: ['B3.1'], skill: 'compound',
          model: [
            step(W.sent(make(S0, 'simple')), 'One thought.'),
            step(W.sent(cap(S0.b) + '.'), 'Another thought. Each could stand alone.'),
            step(W.sent(marked(S0, 'compound')), 'Comma + <b>so</b>: the second is a result.'),
            step(W.sent(marked(S2, 'compound')), 'Second example: <b>but</b> for a surprise.'),
            step(W.tile('and') + ' ' + W.tile('but') + ' ' + W.tile('so'), 'Adds, turns, or gives a result.')
          ],
          guided: [function () { return kindOf(1, ['simple', 'compound']); }, function () { return joinWord(1); }, function () { return combine(1); }],
          check: [function () { return kindOf(1, ['simple', 'compound']); }, function () { return joinWord(2); }, function () { return combine(2); }, function () { return buildCompound(2); }, function () { return kindTf(2, 'compound'); }],
          coach: '<p>Cover each half with your hand. If both halves make sense alone, it is compound.</p>',
          mistake: '<p>Forgetting the comma before the joining word in a compound sentence.</p>' },
        { slug: 'complex', title: 'Complex: a part that cannot stand alone', exp: ['B3.1'], skill: 'complex',
          model: [
            step(W.sent('because the roads were icy'), 'Alone, it leaves you waiting.'),
            step(W.sent(marked(S0, 'complex')), 'Join it to a complete thought.'),
            step(W.sent('when a big wave hit'), 'Second example. Waiting again.'),
            step(W.sent(marked(S3, 'complex')), 'Now it is finished.'),
            step(W.tile('because') + ' ' + W.tile('when') + ' ' + W.tile('while') + ' ' + W.tile('after') + ' ' + W.tile('since'), 'Words that start these parts.')
          ],
          guided: [function () { return kindOf(1, ['simple', 'complex']); }, function () { return alonePart(1); }, function () { return subWord(1); }],
          check: [function () { return kindOf(1, ['simple', 'compound', 'complex']); }, function () { return alonePart(2); }, function () { return subWord(2); }, function () { return buildComplex(2); }, function () { return kindTf(2, 'complex'); }],
          coach: '<p>Say the "because" part alone in a dramatic voice: "Because the roads were icy..." Wait. The child will want to finish it. That is why it cannot stand alone.</p>',
          mistake: '<p>Writing the "because" part as its own sentence. That makes a fragment.</p>' },
        { slug: 'compound-complex', title: 'Compound-complex: both at once', exp: ['B3.1'], skill: 'compound-complex',
          model: [
            step(W.sent(marked(S0, 'compound')), 'Start with a compound sentence.'),
            step(W.sent(marked(S0, 'compound-complex')), 'Add a <b>because</b> part at the front.'),
            step(W.sent(marked(S1, 'compound')), 'Second example.'),
            step(W.sent(marked(S1, 'compound-complex')), 'Add a <b>when</b> part. Two thoughts plus one that cannot stand alone.')
          ],
          guided: [function () { return kindOf(2); }, function () { return buildCC(1); }, function () { return addPart(1); }],
          check: [function () { return kindOf(2); }, function () { return buildCC(2); }, function () { return pickKind(2, 'compound-complex'); }, function () { return addPart(2); }, function () { return kindTf(2, 'compound-complex'); }],
          coach: '<p>Build one together from three strips of paper: a "when" part, a complete thought, and a joining word with a second thought.</p>',
          mistake: '<p>Calling any long sentence compound-complex. Count: two complete thoughts and one part that cannot stand alone.</p>' }
      ]
    }, {
      id: 'fix', title: 'Fixing sentences', sub: 'Fragments and run-ons.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is missing part of a thought', exp: ['B3.1'], skill: 'fragments',
          model: [
            step(W.sent('Because the roads were icy.'), 'So what happened?'),
            step(W.sent('Because the roads were icy, <b>the bus was late</b>.'), 'Add a complete thought.'),
            step(W.sent('The tall pine by the lake.'), 'Second example. What did it do?'),
            step(W.sent('The tall pine by the lake <b>fell over in the storm</b>.'), 'Add what it did.')
          ],
          guided: [function () { return fragOrNot(1); }, function () { return fixFrag(1); }, function () { return fragTf(1); }],
          check: [function () { return fragOrNot(2); }, function () { return fixFrag(2); }, function () { return pickFrag(2); }, function () { return fragTf(2); }, function () { return whatIsIt(2); }],
          coach: '<p>Read the child' + '’' + 's writing aloud with a full stop at every period. Fragments sound unfinished.</p>',
          mistake: '<p>Thinking short means fragment. "We ran." is short but complete.</p>' },
        { slug: 'run-on', title: 'A run-on crams two sentences together', exp: ['B3.1'], skill: 'run-ons',
          model: [
            step(W.sent('The bus was late we missed the show.'), 'No break between thoughts.'),
            step(W.sent('The bus was late, <b>so</b> we missed the show.'), 'Fix 1: comma + joining word.'),
            step(W.sent('The bus was late<b>.</b> <b>W</b>e missed the show.'), 'Fix 2: two sentences.'),
            step(W.sent('The canoe tipped over, everyone swam to shore.'), 'Second example. A comma alone is not enough.'),
            step(W.sent('The canoe tipped over, <b>so</b> everyone swam to shore.'), 'Add the joining word.')
          ],
          guided: [function () { return runOnOrNot(1); }, function () { return fixRunOn(1); }, function () { return fixTwo(1); }],
          check: [function () { return runOnOrNot(2); }, function () { return fixRunOn(2); }, function () { return fixTwo(2); }, function () { return pickComplete(2); }, function () { return whatIsIt(2); }],
          coach: '<p>Ask the child to read their sentence aloud in one breath. If they run out of air, look for a run-on.</p>',
          mistake: '<p>Fixing a run-on with only a comma. A comma alone cannot join two complete thoughts.</p>' }
      ]
    }],
    practice: [
      { id: 'compound', name: 'Compound sentences', code: 'B3.1', gen: function (lv) { return kindOf(lv, ['simple', 'compound']); } },
      { id: 'complex', name: 'Complex sentences', code: 'B3.1', gen: function (lv) { return kindOf(lv, lv > 1 ? ['simple', 'compound', 'complex'] : ['simple', 'complex']); } },
      { id: 'compound-complex', name: 'Compound-complex sentences', code: 'B3.1', gen: function (lv) { return kindOf(2); } },
      { id: 'fragments', name: 'Fixing fragments', code: 'B3.1', gen: fragOrNot },
      { id: 'run-ons', name: 'Fixing run-ons', code: 'B3.1', gen: runOnOrNot }
    ]
  });

  Q.shapes('sentences', {
    compound: [[1, 'join', joinWord], [1, 'combine', combine], [2, 'build', buildCompound], [2, 'true-false', function (lv) { return kindTf(lv, 'compound'); }]],
    complex: [[1, 'alone-part', alonePart], [1, 'start-word', subWord], [2, 'build', buildComplex], [2, 'true-false', function (lv) { return kindTf(lv, 'complex'); }]],
    'compound-complex': [[1, 'build', buildCC], [1, 'add-part', addPart], [2, 'pick', function (lv) { return pickKind(lv, 'compound-complex'); }], [2, 'true-false', function (lv) { return kindTf(lv, 'compound-complex'); }]],
    fragments: [[1, 'fix', fixFrag], [1, 'true-false', fragTf], [2, 'pick', pickFrag], [2, 'what-is-it', whatIsIt]],
    'run-ons': [[1, 'fix-join', fixRunOn], [1, 'fix-two', fixTwo], [2, 'pick-complete', pickComplete], [2, 'what-is-it', whatIsIt]]
  });
})();
