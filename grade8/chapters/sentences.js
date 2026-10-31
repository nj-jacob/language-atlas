/* Grade 8: sentence structure.
   Ontario 2023 Language, Grade 8:
   B3.1 "use their knowledge of sentence types and forms to construct complex sentences that connect and communicate ideas accurately
   and effectively"
   From the Language Conventions Continuum (Appendix B), Grade 8: independent and dependent clauses, compound, complex and
   compound-complex sentences, adjective (relative) clauses, and sentence fragments and run-on sentences.
   Every sentence is built from the clauses below, written for this site. Answer checks: tests/verify/grade8-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* a: an independent clause; b: a second one that follows from it, joined by co; dep: a dependent clause that fits a */
  var SCENES = [
    { a: 'the power went out', b: 'we lit candles', co: 'so', dep: 'when the storm reached our street' },
    { a: 'Omar finished his essay', b: 'he forgot to save it', co: 'but', dep: 'after he stayed up late' },
    { a: 'the trail was closed', b: 'we took the long way around', co: 'so', dep: 'because the bridge had washed out' },
    { a: 'Leila practised her speech', b: 'her brother timed her', co: 'and', dep: 'before the assembly started' },
    { a: 'the team lost the final', b: 'the fans cheered anyway', co: 'but', dep: 'although they played their best' },
    { a: 'the lake froze early', b: 'the skating season began in December', co: 'and', dep: 'since the nights were bitterly cold' },
    { a: 'Mei planted tomatoes', b: 'her neighbour planted squash', co: 'and', dep: 'while the soil was still damp' },
    { a: 'the bus was late', b: 'we missed the first class', co: 'so', dep: 'because snow covered the roads' }];
  var TYPES = ['simple', 'compound', 'complex', 'compound-complex'];
  var TIP = { simple: 'one independent clause', compound: 'two independent clauses joined by and, but, or so', complex: 'an independent clause and a dependent clause',
    'compound-complex': 'two independent clauses and a dependent clause' };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function make(sc, type) {
    if (type === 'simple') return cap(sc.a) + '.';
    if (type === 'compound') return cap(sc.a) + ', ' + sc.co + ' ' + sc.b + '.';
    if (type === 'complex') return cap(sc.dep) + ', ' + sc.a + '.';
    return cap(sc.dep) + ', ' + sc.a + ', ' + sc.co + ' ' + sc.b + '.';
  }
  /* [sentence, the relative clause, the noun it describes, two other nouns] */
  var REL = [['My aunt, who lives in Moncton, visits every summer.', 'who lives in Moncton', 'aunt', ['Moncton', 'summer']],
    ['The canoe that we borrowed has a leak in the bow.', 'that we borrowed', 'canoe', ['leak', 'bow']],
    ['The novel, which won an award, is set in Winnipeg.', 'which won an award', 'novel', ['award', 'Winnipeg']],
    ['The student who found the wallet returned it to the office.', 'who found the wallet', 'student', ['wallet', 'office']],
    ['Our garden, which faces south, gets sun all day.', 'which faces south', 'garden', ['south', 'sun']]];
  /* groups of words that are not sentences: a dependent clause alone, no verb, or no subject */
  var FRAG = ['Because the bus was late.', 'The tall girl with the red backpack.', 'Running down the hall to class.', 'After the game ended.', 'Although we tried our best.', 'A long line of cars at the border.'];

  /* ---------- question makers: clauses ---------- */
  function tapDep(lv) {
    var sc = R.pick(SCENES), s = make(sc, 'complex');
    return Q.tiles('Tap the <b>dependent</b> clause.', cap(sc.dep) + ',', [sc.a + '.'], { fig: W.sent(s), prompt: 'Which part cannot stand alone?',
      hint: 'A dependent clause starts with a word like because, when, although or after.', explain: W.sent('<mark class="hl">' + cap(sc.dep) + '</mark>, ' + sc.a + '.'), meta: { k: 'g8-tap-dep' } });
  }
  function kindOfClause() {
    var sc = R.pick(SCENES), dep = R.int(0, 1) === 1, c = dep ? sc.dep : sc.a;
    return Q.tiles('What kind of clause is this?', dep ? 'dependent' : 'independent', [dep ? 'independent' : 'dependent'], { fig: W.sent(c),
      hint: 'Could it stand alone as a sentence?', explain: dep ? 'It starts with <b>' + c.split(' ')[0] + '</b>, so it needs more.' : 'It could stand alone as a sentence.', meta: { k: 'g8-clause-kind', c: c } });
  }
  function standAlone() {
    var sc = R.some(SCENES, 4);
    return Q.all('Pick every clause that could stand alone as a sentence.', [sc[0].a, sc[1].b], [sc[2].dep, sc[3].dep], { hint: 'Words like because, when and although make a clause depend on another.',
      explain: 'An independent clause has a subject and a verb, and no word that makes it depend on another clause.', meta: { k: 'g8-stand-alone' } });
  }
  function relNoun(lv) {
    var r = R.pick(REL);
    return Q.tiles('Which noun does the clause <b>' + r[1] + '</b> describe?', r[2], r[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(r[0]),
      hint: 'A relative clause sits right after the noun it describes.', explain: W.sent(r[0].replace(r[1], '<mark class="hl">' + r[1] + '</mark>')), meta: { k: 'g8-rel-noun', s: r[0] } });
  }
  function relClause() {
    var r = R.pick(REL), others = r[0].replace(/[.,]/g, '').replace(r[1] + ' ', '').split(' ');
    var wrong = [others.slice(0, 3).join(' '), others.slice(-3).join(' ')];
    return Q.one('Which words are the <b>relative clause</b>?', r[1], wrong, { fig: W.sent(r[0]), hint: 'It starts with who, which or that.',
      explain: W.sent(r[0].replace(r[1], '<mark class="hl">' + r[1] + '</mark>')), meta: { k: 'g8-rel-clause', s: r[0] } });
  }

  /* ---------- sentence types ---------- */
  function typeOf(lv) {
    var sc = R.pick(SCENES), t = R.pick(lv > 1 ? TYPES : TYPES.slice(0, 3));
    return Q.tiles('What type of sentence is this?', t, TYPES.filter(function (x) { return x !== t; }).slice(0, lv > 1 ? 3 : 2), { fig: W.sent(make(sc, t)),
      prompt: 'Count the independent clauses. Is there a dependent clause?', hint: 'Compound: two independent. Complex: one independent and one dependent. Compound-complex: both.',
      explain: '<b>' + t + '</b>: ' + TIP[t] + '.', meta: { k: 'g8-type', s: make(sc, t) } });
  }
  function whichType(lv) {
    var sc = R.pick(SCENES), t = R.pick(TYPES.slice(1)), wrong = TYPES.filter(function (x) { return x !== t; });
    return Q.one('Which is a <b>' + t + '</b> sentence?', make(sc, t), R.some(wrong, lv > 1 ? 3 : 2).map(function (x) { return make(sc, x); }), {
      hint: 'A ' + t + ' sentence has ' + TIP[t] + '.', explain: W.sent(make(sc, t)), meta: { k: 'g8-which-type', want: t } });
  }
  function matchTypes() {
    var sc = R.some(SCENES, 3), ts = R.some(TYPES, 3);
    return { q: 'Match each sentence to its type.', type: 'match', pairs: ts.map(function (t, i) { return [make(sc[i], t), t]; }), hint: 'Count the clauses in each.', explain: 'Simple, compound, complex, compound-complex.', meta: { k: 'g8-match-types' } };
  }
  function typeTf() {
    var sc = R.pick(SCENES), t = R.pick(TYPES), right = R.int(0, 1) === 1, said = right ? t : R.pick(TYPES.filter(function (x) { return x !== t; }));
    return { q: Q.name() + ' says this is a <b>' + said + '</b> sentence.', fig: W.sent(make(sc, t)), type: 'tf', answer: right,
      why: { options: ['It has ' + TIP[t] + '.', 'Long sentences are always compound.'], answer: 0 }, hint: 'Count the clauses.', explain: '<b>' + t + '</b>: ' + TIP[t] + '.', meta: { k: 'g8-type-tf', s: make(sc, t), said: said } };
  }
  function combine(lv) {
    var sc = R.pick(SCENES), w = sc.dep.split(' ')[0], rest = sc.dep.slice(w.length + 1), wrongs = ['unless', 'or'];
    return Q.one('Combine: <b>' + cap(sc.a) + '. ' + cap(rest) + '.</b> Which sentence shows how the ideas connect?', cap(sc.a) + ' ' + sc.dep + '.',
      R.some(wrongs, lv > 1 ? 2 : 1).map(function (x) { return cap(sc.a) + ' ' + x + ' ' + rest + '.'; }), { prompt: 'How are the two ideas related: cause, time, or contrast?',
        hint: 'Choose the joining word that makes the relationship true.', explain: W.sent(cap(sc.a) + ' <b>' + w + '</b> ' + rest + '.'), meta: { k: 'g8-combine', a: sc.a } });
  }

  /* ---------- fragments and run-ons ---------- */
  function fragment(lv) {
    var sc = R.some(SCENES, 2);
    return Q.all('Pick every <b>fragment</b>.', R.some(FRAG, lv > 1 ? 2 : 1), [make(sc[0], 'simple'), make(sc[1], R.pick(['compound', 'complex']))], {
      hint: 'A fragment is missing a subject, a verb, or the main clause it depends on.', explain: 'A sentence needs an independent clause.', meta: { k: 'g8-fragment' } });
  }
  function runOn(sc, how) { return cap(sc.a) + (how === 'splice' ? ', ' : ' ') + sc.b + '.'; }
  function fixRunOn(lv) {
    var sc = R.pick(SCENES), fixes = [cap(sc.a) + ', ' + sc.co + ' ' + sc.b + '.', cap(sc.a) + '; ' + sc.b + '.', cap(sc.a) + '. ' + cap(sc.b) + '.'];
    return Q.one('Which fixes this run-on?', R.pick(fixes), [runOn(sc, 'splice'), cap(sc.a) + ' ' + sc.co + ', ' + sc.b + '.'].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(runOn(sc, 'none')), prompt: 'Two sentences need a full stop, a semicolon, or a comma with and, but or so.', hint: 'A comma alone cannot join two sentences.',
      explain: fixes.map(W.sent).join(''), meta: { k: 'g8-fix-run-on', a: sc.a } });
  }
  function findRunOn() {
    var sc = R.some(SCENES, 3), bad = runOn(sc[0], R.pick(['splice', 'none']));
    return Q.one('Which one is a <b>run-on</b>?', bad, [make(sc[1], 'compound'), make(sc[2], 'complex')], { hint: 'Look for two sentences joined with nothing, or with only a comma.',
      explain: W.sent(bad) + ' joins two sentences without a proper join.', meta: { k: 'g8-find-run-on' } });
  }
  function fragTf() {
    var sc = R.pick(SCENES), isFrag = R.int(0, 1) === 1, s = isFrag ? R.pick(FRAG) : make(sc, R.pick(TYPES)), right = R.int(0, 1) === 1, said = right === isFrag ? 'a fragment' : 'a complete sentence';
    return { q: Q.name() + ' says this is <b>' + said + '</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: [isFrag ? 'It has no independent clause.' : 'It has an independent clause.', 'It starts with a capital and ends with a full stop.'], answer: 0 },
      hint: 'Does it have a subject and a verb that can stand alone?', explain: isFrag ? 'It is a fragment.' : 'It is a complete sentence.', meta: { k: 'g8-frag-tf', s: s, said: said } };
  }

  var S3 = SCENES[2], S7 = SCENES[7];
  Atlas.register('sentences', {
    lessons: [{
      id: 'clauses', title: 'Clauses', sub: 'The building blocks of sentences.',
      concepts: [
        { slug: 'independent', title: 'An independent clause can stand alone', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent(cap(S3.a) + '.'), 'A subject and a verb. A complete thought.'),
            step(W.sent('<b>the trail</b> <mark class="hl">was closed</mark>'), 'Subject: the trail. Verb: was closed.')
          ],
          guided: [kindOfClause, kindOfClause],
          check: [standAlone, kindOfClause],
          coach: '<p>Ask two questions: "Who or what?" (the subject) and "Did what?" (the verb). If both answers are there and the thought is complete, it can stand alone.</p>',
          mistake: '<p>Thinking long means complete. "Running down the hall to class" is long but has no subject.</p>' },
        { slug: 'dependent', title: 'A dependent clause needs a main clause', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent(cap(S3.dep) + '…'), 'Because what? It leaves you waiting.'),
            step(W.tile('because') + ' ' + W.tile('although') + ' ' + W.tile('when') + ' ' + W.tile('since'), 'Words that start one.'),
            step(W.sent('<mark class="hl">' + cap(S3.dep) + '</mark>, ' + S3.a + '.'), 'Joined to a main clause.')
          ],
          guided: [tapDep, kindOfClause],
          check: [tapDep, standAlone],
          coach: '<p>Read the dependent clause alone in a questioning voice: "Because the bridge had washed out…?" The child hears that it is unfinished.</p>',
          mistake: '<p>Writing a dependent clause on its own as a sentence. It is a fragment.</p>' },
        { slug: 'relative', title: 'A relative clause describes a noun', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent(REL[0][0]), 'Which aunt?'),
            step(W.sent(REL[0][0].replace(REL[0][1], '<mark class="hl">' + REL[0][1] + '</mark>')), 'The one who lives in Moncton.'),
            step(W.tile('who') + ' ' + W.tile('which') + ' ' + W.tile('that'), 'It starts with one of these.')
          ],
          guided: [function () { return relNoun(1); }, relClause],
          check: [function () { return relNoun(2); }, relClause],
          coach: '<p>Combine two short sentences aloud: "My aunt visits every summer. She lives in Moncton." becomes "My aunt, who lives in Moncton, visits every summer."</p>',
          mistake: '<p>Putting the clause far from its noun, so it seems to describe the wrong thing.</p>' }
      ]
    }, {
      id: 'types', title: 'Sentence types', sub: 'Simple, compound, complex and compound-complex.',
      concepts: [
        { slug: 'compound', title: 'Compound: two independent clauses', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent(cap(S7.a) + '.') + W.sent(cap(S7.b) + '.'), 'Two complete sentences.'),
            step(W.sent(cap(S7.a) + '<mark class="hl">, so</mark> ' + S7.b + '.'), 'A comma and <b>so</b> join them.'),
            step(W.tile('and') + ' ' + W.tile('but') + ' ' + W.tile('or') + ' ' + W.tile('so'), 'The joining words.')
          ],
          guided: [function () { return typeOf(1); }, function () { return whichType(1); }],
          check: [function () { return typeOf(1); }, typeTf],
          coach: '<p>Each joining word shows a relationship: and adds, but contrasts, so shows a result, or gives a choice.</p>',
          mistake: '<p>Forgetting the comma before the joining word in a compound sentence.</p>' },
        { slug: 'complex', title: 'Complex: a main clause and a dependent clause', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent('<mark class="hl">' + cap(S7.dep) + '</mark>, ' + S7.a + '.'), 'Dependent, then main.'),
            step(W.sent(cap(S7.a) + ' <mark class="hl">' + S7.dep + '</mark>.'), 'Main first: no comma needed.')
          ],
          guided: [function () { return typeOf(1); }, combine],
          check: [function () { return whichType(2); }, combine],
          coach: '<p>Complex sentences let a writer show cause, time and contrast in one smooth sentence.</p>',
          mistake: '<p>A comma after the dependent clause is easy to forget when it comes first.</p>' },
        { slug: 'compound-complex', title: 'Compound-complex: both at once', exp: ['B3.1'], skill: 'sentence-types',
          model: [
            step(W.sent(make(S7, 'compound-complex')), 'Three clauses.'),
            step(W.sent('<mark class="hl">' + cap(S7.dep) + '</mark>, ' + S7.a + ', so ' + S7.b + '.'), 'One dependent.'),
            step(W.sent(cap(S7.dep) + ', <b>' + S7.a + '</b>, so <b>' + S7.b + '</b>.'), 'Two independent.')
          ],
          guided: [function () { return whichType(2); }, function () { return typeOf(2); }],
          check: [function () { return typeOf(2); }, matchTypes],
          coach: '<p>Use these for ideas that really belong together. Too many in a row make writing hard to follow.</p>',
          mistake: '<p>Calling any long sentence compound-complex. Count: it needs two independent clauses and at least one dependent clause.</p>' }
      ]
    }, {
      id: 'fix', title: 'Fragments and run-ons', sub: 'Fix sentences that say too little or too much.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is not a sentence', exp: ['B3.1'], skill: 'fix',
          model: [
            step(W.sent(FRAG[0]), 'A dependent clause alone.'),
            step(W.sent(FRAG[1]), 'No verb.'),
            step(W.sent('Because the bus was late, <mark class="hl">we missed the first class</mark>.'), 'Fixed: add a main clause.')
          ],
          guided: [function () { return fragment(1); }, fragTf],
          check: [function () { return fragment(2); }, fragTf],
          coach: '<p>Fragments are common in speech and in ads. In formal writing, check each sentence for an independent clause.</p>',
          mistake: '<p>Thinking a capital and a full stop make a sentence.</p>' },
        { slug: 'run-on', title: 'A run-on needs a proper join', exp: ['B3.1'], skill: 'fix',
          model: [
            step(W.sent(runOn(S7, 'none')), 'Two sentences, no join.'),
            step(W.sent(runOn(S7, 'splice')), 'A comma alone is not enough either.'),
            step(W.sent(cap(S7.a) + '<mark class="hl">;</mark> ' + S7.b + '.') + W.sent(cap(S7.a) + '<mark class="hl">, so</mark> ' + S7.b + '.'), 'A semicolon, or a comma and a joining word.')
          ],
          guided: [function () { return fixRunOn(1); }, findRunOn],
          check: [function () { return fixRunOn(2); }, findRunOn],
          coach: '<p>Read the sentence aloud. Where the voice drops and stops, a sentence has ended.</p>',
          mistake: '<p>The comma splice: joining two sentences with only a comma.</p>' }
      ]
    }],
    practice: [
      { id: 'clauses', name: 'Independent, dependent and relative clauses', code: 'B3.1', gen: tapDep },
      { id: 'sentence-types', name: 'Sentence types', code: 'B3.1', gen: typeOf },
      { id: 'fix', name: 'Fragments, run-ons and combining', code: 'B3.1', gen: fixRunOn }
    ]
  });

  Q.shapes('sentences', {
    clauses: [[1, 'kind', kindOfClause], [1, 'stand-alone', standAlone], [1, 'relative-noun', relNoun], [2, 'relative-clause', relClause]],
    'sentence-types': [[1, 'which', whichType], [2, 'match', matchTypes], [2, 'true-false', typeTf], [2, 'combine', combine]],
    fix: [[1, 'fragment', fragment], [1, 'find-run-on', findRunOn], [2, 'true-false', fragTf]]
  });
})();
