/* Grade 5: sentences. Simple, compound, complex and compound-complex sentences; fixing fragments and run-on sentences.
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
    { a: 'the library closed early', b: 'we read at home', c: 'so', dep: 'because it was a holiday' }];
  var NOUNY = ['The tall pine by the lake.', 'Running down the hall.', 'My cousin from Winnipeg.', 'A box of old photos.', 'Under the kitchen table.'];
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

  /* ---------- question makers ---------- */
  function kindOf(lv, only) {
    var pool = only || (lv > 1 ? KINDS : ['simple', 'compound', 'complex']), k = R.pick(pool), s = scene(), shown = make(s, k);
    return Q.tiles('What kind of sentence is this?', k, pool.filter(function (x) { return x !== k; }), { fig: W.sent(shown),
      prompt: 'How many complete thoughts? Is there a part that cannot stand alone?', hint: 'Compound: two complete thoughts. Complex: a part that cannot stand alone. Both: compound-complex.',
      explain: 'It is <b>' + k + '</b>.', meta: { k: 'g5-kind', s: shown } });
  }
  function joinWord() {
    var s = scene(), wrong = ['and', 'but', 'so'].filter(function (c) { return c !== s.c; });
    return Q.tiles('Which joining word fits best?', s.c, wrong, { fig: W.sent(cap(s.a) + ', ' + W.gap() + ' ' + s.b + '.'), prompt: 'Is the second idea extra, a surprise, or a result?',
      hint: 'and: adds. but: a surprise. so: a result.', explain: W.sent(cap(s.a) + ', <b>' + s.c + '</b> ' + s.b + '.'), meta: { k: 'g5-join', a: s.a } });
  }
  function pickKind() {
    var k = R.pick(['compound', 'complex', 'compound-complex']), s = R.some(SCENES, 4), right = [make(s[0], k), make(s[1], k)];
    var wrong = KINDS.filter(function (x) { return x !== k; });
    return Q.all('Pick every <b>' + k + '</b> sentence.', right, [make(s[2], R.pick(wrong)), make(s[3], R.pick(wrong))], { hint: 'Count the complete thoughts. Look for because, when, while, after, since, before.',
      explain: 'Those are ' + k + '.', meta: { k: 'g5-pick-kind', kind: k } });
  }
  function buildCC() {
    var s = scene();
    return { q: 'Put the parts in order to make a <b>compound-complex</b> sentence.', type: 'order', items: [cap(s.dep) + ',', s.a + ',', s.c + ' ' + s.b + '.'],
      hint: 'Start with the part that cannot stand alone. End with the joining word and its thought.', explain: W.sent(make(s, 'compound-complex')), meta: { k: 'g5-build-cc', a: s.a } };
  }

  function fragOrNot(lv) {
    var r = R.int(0, lv > 1 ? 2 : 1), s = scene(), shown = r === 0 ? fragment() : r === 1 ? make(s, R.pick(KINDS)) : runOn(s);
    var tiles = ['Complete sentence', 'Fragment', 'Run-on'].slice(0, lv > 1 ? 3 : 2), right = ['Fragment', 'Complete sentence', 'Run-on'][r];
    return { q: 'What is this?', fig: W.sent(shown), type: 'tap', tiles: tiles, answer: tiles.indexOf(right),
      prompt: 'Does it have a complete thought? More than one, crammed together?', hint: 'A fragment is missing part. A run-on crams two sentences together with no joining word.',
      explain: 'It is <b>' + right.toLowerCase() + '</b>.', meta: { k: 'g5-frag', s: shown } };
  }
  function fixRunOn(lv) {
    var s = scene(), bad = cap(s.a) + ' ' + s.b + '.';
    return Q.one('Which one fixes the run-on?', cap(s.a) + ', ' + s.c + ' ' + s.b + '.', [cap(s.a) + ', ' + s.b + '.'].concat(lv > 1 ? [cap(s.a) + ' ' + s.c + ', ' + s.b + '.'] : []), {
      fig: W.sent(bad), prompt: 'Two complete thoughts need a comma and a joining word, or a period.', hint: 'A comma alone is not enough.',
      explain: 'Or make two sentences: ' + cap(s.a) + '. ' + cap(s.b) + '.', meta: { k: 'g5-fix-run-on', a: s.a } });
  }
  function fixFrag() {
    var s = scene(), frag = cap(s.dep) + '.';
    return Q.one('Which one fixes the fragment?', cap(s.dep) + ', ' + s.a + '.', [cap(s.dep) + ' and.', cap(s.dep) + ', and.'], { fig: W.sent(frag),
      hint: 'Add a complete thought.', explain: 'Now it has a complete thought: <b>' + s.a + '</b>.', meta: { k: 'g5-fix-frag', dep: s.dep } });
  }
  function pickComplete() {
    var s = R.some(SCENES, 2), right = [make(s[0], R.pick(KINDS)), make(s[1], R.pick(KINDS))];
    return Q.all('Pick every <b>complete</b> sentence.', right, [fragment(), runOn(R.pick(SCENES.filter(function (x) { return s.indexOf(x) < 0; })))], {
      hint: 'Each one must have a complete thought, joined the right way.', explain: 'Fragments and run-ons are not complete sentences.', meta: { k: 'g5-pick-complete' } });
  }

  var S0 = SCENES[2], S1 = SCENES[4];
  Atlas.register('sentences', {
    lessons: [{
      id: 'types', title: 'Kinds of sentences', sub: 'Build bigger sentences from complete thoughts.',
      concepts: [
        { slug: 'compound', title: 'Compound: two complete thoughts', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent(make(S0, 'simple')), 'One thought.'),
            step(W.sent(marked(S0, 'compound')), 'Comma + <b>and</b>, <b>but</b> or <b>so</b>.'),
            step(W.sent(marked(S1, 'compound')), 'Each part could stand alone.')
          ],
          guided: [function () { return kindOf(1, ['simple', 'compound']); }, joinWord],
          check: [function () { return kindOf(1, ['simple', 'compound']); }, joinWord],
          coach: '<p>Cover each half with your hand. If both halves make sense alone, it is compound.</p>',
          mistake: '<p>Forgetting the comma before the joining word in a compound sentence.</p>' },
        { slug: 'complex', title: 'Complex: a part that cannot stand alone', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent('because the roads were icy'), 'Alone, it leaves you waiting.'),
            step(W.sent(marked(S0, 'complex')), 'Join it to a complete thought.'),
            step(W.tile('because') + ' ' + W.tile('when') + ' ' + W.tile('while') + ' ' + W.tile('after') + ' ' + W.tile('since'), 'Words that start these parts.')
          ],
          guided: [function () { return kindOf(1, ['simple', 'compound', 'complex']); }, function () { return kindOf(1, ['compound', 'complex']); }],
          check: [function () { return kindOf(1, ['simple', 'compound', 'complex']); }, function () { return kindOf(1, ['compound', 'complex']); }],
          coach: '<p>Say the "because" part alone in a dramatic voice: "Because the roads were icy..." Wait. The child will want to finish it. That is why it cannot stand alone.</p>',
          mistake: '<p>Writing the "because" part as its own sentence. That makes a fragment.</p>' },
        { slug: 'compound-complex', title: 'Compound-complex: both at once', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent(marked(S0, 'compound-complex')), 'Two complete thoughts, plus a <b>because</b> part.'),
            step(W.sent(marked(S1, 'compound-complex')), 'Two complete thoughts, plus a <b>when</b> part.')
          ],
          guided: [function () { return kindOf(2); }, buildCC],
          check: [function () { return kindOf(2); }, pickKind],
          coach: '<p>Build one together from three strips of paper: a "when" part, a complete thought, and a joining word with a second thought.</p>',
          mistake: '<p>Calling any long sentence compound-complex. Count: two complete thoughts and one part that cannot stand alone.</p>' }
      ]
    }, {
      id: 'fix', title: 'Fixing sentences', sub: 'Fragments and run-ons.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is missing part of a thought', exp: ['B3.1'], skill: 'fix-sentences',
          model: [
            step(W.sent('Because the roads were icy.'), 'So what happened?'),
            step(W.sent('Because the roads were icy, <b>the bus was late</b>.'), 'Add a complete thought.'),
            step(W.sent('The tall pine by the lake.'), 'What did it do? <b>The tall pine by the lake fell over.</b>')
          ],
          guided: [function () { return fragOrNot(1); }, fixFrag],
          check: [function () { return fragOrNot(1); }, fixFrag],
          coach: '<p>Read the child' + '’' + 's writing aloud with a full stop at every period. Fragments sound unfinished.</p>',
          mistake: '<p>Thinking short means fragment. "We ran." is short but complete.</p>' },
        { slug: 'run-on', title: 'A run-on crams two sentences together', exp: ['B3.1'], skill: 'fix-sentences',
          model: [
            step(W.sent('The bus was late we missed the show.'), 'No break between thoughts.'),
            step(W.sent('The bus was late, <b>so</b> we missed the show.'), 'Fix 1: comma + joining word.'),
            step(W.sent('The bus was late. We missed the show.'), 'Fix 2: two sentences.')
          ],
          guided: [function () { return fixRunOn(1); }, function () { return fragOrNot(2); }],
          check: [function () { return fixRunOn(2); }, pickComplete],
          coach: '<p>Ask the child to read their sentence aloud in one breath. If they run out of air, look for a run-on.</p>',
          mistake: '<p>Fixing a run-on with only a comma. A comma alone cannot join two complete thoughts.</p>' }
      ]
    }],
    practice: [
      { id: 'sentence-types', name: 'Kinds of sentences', code: 'B3.1', gen: kindOf },
      { id: 'fix-sentences', name: 'Fragments and run-ons', code: 'B3.1', gen: fragOrNot }
    ]
  });

  Q.shapes('sentences', {
    'sentence-types': [[1, 'join', joinWord], [2, 'build', buildCC], [2, 'pick', pickKind]],
    'fix-sentences': [[1, 'fix-run-on', fixRunOn], [1, 'fix-fragment', fixFrag], [2, 'pick-complete', pickComplete]]
  });
})();
