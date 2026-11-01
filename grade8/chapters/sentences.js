/* Grade 8: sentence structure. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
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
    { a: 'the bus was late', b: 'we missed the first class', co: 'so', dep: 'because snow covered the roads' },
    { a: 'the ferry left early', b: 'Amira had to wait an hour', co: 'so', dep: 'because the wind was rising' },
    { a: 'Kai studied for the test', b: 'he still felt nervous', co: 'but', dep: 'although he knew the material' },
    { a: 'the snow melted', b: 'the river rose quickly', co: 'and', dep: 'when the warm rain arrived' },
    { a: 'Priya joined the choir', b: 'her cousin joined the band', co: 'and', dep: 'after she moved to Halifax' },
    { a: 'the library opened late', b: 'students waited on the steps', co: 'so', dep: 'because the alarm had gone off' },
    { a: 'Theo forgot his skates', b: 'he borrowed a pair from the coach', co: 'so', dep: 'before the game started' },
    { a: 'the garden flooded', b: 'the tomatoes survived', co: 'but', dep: 'when the creek overflowed' },
    { a: 'we could take the train', b: 'we could drive to Ottawa', co: 'or', dep: 'if the roads were clear' }];
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
    ['Our garden, which faces south, gets sun all day.', 'which faces south', 'garden', ['south', 'sun']],
    ['The ferry, which carries 200 people, crosses the lake twice a day.', 'which carries 200 people', 'ferry', ['lake', 'people']],
    ['The coach who trained our team moved to Calgary.', 'who trained our team', 'coach', ['team', 'Calgary']],
    ['The trail that leads to the lookout is closed for repairs.', 'that leads to the lookout', 'trail', ['lookout', 'repairs']],
    ['My cousin, who speaks three languages, works at the airport.', 'who speaks three languages', 'cousin', ['languages', 'airport']],
    ['The poem that Hana wrote won first prize.', 'that Hana wrote', 'poem', ['Hana', 'prize']],
    ['The old bridge, which crosses the river, needs new paint.', 'which crosses the river', 'bridge', ['river', 'paint']],
    ['The students who planted the garden shared the food.', 'who planted the garden', 'students', ['garden', 'food']]];
  /* groups of words that are not sentences (a dependent clause alone, no verb, or no subject), and one way to fix each */
  var FRAG = [['Because the bus was late.', 'Because the bus was late, we missed the first class.'], ['The tall girl with the red backpack.', 'The tall girl with the red backpack won the race.'],
    ['Running down the hall to class.', 'Omar was running down the hall to class.'], ['After the game ended.', 'After the game ended, we went for pizza.'],
    ['Although we tried our best.', 'Although we tried our best, we lost the final.'], ['A long line of cars at the border.', 'A long line of cars waited at the border.'],
    ['When the lights went out.', 'When the lights went out, everyone gasped.'], ['Hoping for a snow day.', 'Mei went to bed hoping for a snow day.'],
    ['The old canoe in the shed.', 'The old canoe in the shed needs new paint.'], ['Since the river was so high.', 'Since the river was so high, the ferry stopped.'],
    ['Waiting at the bus stop in the rain.', 'Kai stood waiting at the bus stop in the rain.'], ['The best player on our team.', 'The best player on our team is Zara.']];
  var JOIN = ['and', 'but', 'or', 'so'];
  function sub(sc) { return sc.dep.split(' ')[0]; }
  function hl(s, w) { return s.replace(w, '<mark class="hl">' + w + '</mark>'); }

  /* ---------- independent clauses ---------- */
  function kindOfClause() {
    var sc = R.pick(SCENES), dep = R.int(0, 1) === 1, c = dep ? sc.dep : sc[R.pick(['a', 'b'])];
    return Q.tiles('What kind of clause is this?', dep ? 'dependent' : 'independent', [dep ? 'independent' : 'dependent'], { fig: W.sent(c), prompt: 'Could it stand alone as a sentence?',
      hint: 'Could it stand alone as a sentence?', explain: dep ? 'It starts with <b>' + c.split(' ')[0] + '</b>, so it needs more.' : 'It could stand alone as a sentence.', meta: { k: 'g8-clause-kind', c: c } });
  }
  function standAlone(lv) {
    var sc = R.some(SCENES, 4);
    return Q.all('Pick every clause that could stand alone as a sentence.', [sc[0].a, sc[1].b], [sc[2].dep, sc[3].dep].slice(0, lv > 1 ? 2 : 1), { prompt: 'Read each one alone. Is the thought complete?',
      hint: 'Words like because, when and although make a clause depend on another.', explain: 'An independent clause has a subject and a verb, and no word that makes it depend on another clause.', meta: { k: 'g8-stand-alone' } });
  }
  function whichInd(lv) {
    var sc = R.some(SCENES, 3), right = sc[0][R.pick(['a', 'b'])];
    return Q.one('Which one could stand alone as a sentence?', cap(right) + '.', sc.slice(1, lv > 1 ? 3 : 2).map(function (x) { return cap(x.dep) + '.'; }), { prompt: 'Which one is a complete thought?',
      hint: 'A clause that starts with because, when or although leaves you waiting.', explain: W.sent(cap(right) + '.'), meta: { k: 'g8-which-ind' } });
  }
  function indTf() {
    var sc = R.pick(SCENES), ind = R.int(0, 1) === 1, c = ind ? sc.a : sc.dep, right = R.int(0, 1) === 1, says = right === ind;
    return { q: Q.name() + ' says this clause <b>' + (says ? 'can' : 'cannot') + '</b> stand alone.', fig: W.sent(c), type: 'tf', answer: right,
      why: { options: [ind ? 'It is a complete thought with a subject and a verb.' : 'It starts with a word that makes it depend on more.', 'Every group of words with a verb is a sentence.'], answer: 0 },
      hint: 'Read it alone. Does it leave you waiting?', explain: ind ? 'Independent: it can stand alone.' : 'Dependent: it needs a main clause.', meta: { k: 'g8-ind-tf', c: c, says: says } };
  }

  /* ---------- dependent clauses ---------- */
  function tapDep() {
    var sc = R.pick(SCENES), s = make(sc, 'complex');
    return Q.tiles('Tap the <b>dependent</b> clause.', cap(sc.dep) + ',', [sc.a + '.'], { fig: W.sent(s), prompt: 'Which part cannot stand alone?',
      hint: 'A dependent clause starts with a word like because, when, although or after.', explain: W.sent(hl(s, cap(sc.dep))), meta: { k: 'g8-tap-dep' } });
  }
  function subWord(lv) {
    var sc = R.pick(SCENES), words = (sc.a + ' ' + sc.dep).split(' ').filter(function (w) { return w !== sub(sc) && w.length > 2; });
    return Q.tiles('Which word makes the first clause <b>depend</b> on the rest?', sub(sc).charAt(0).toUpperCase() + sub(sc).slice(1), R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(make(sc, 'complex')),
      prompt: 'Look at the very first word.', hint: 'Because, when, although, after, before, since, while, if.', explain: W.sent(hl(make(sc, 'complex'), cap(sub(sc)))), meta: { k: 'g8-sub-word', a: sc.a } });
  }
  function depFind(lv) {
    var sc = R.pick(SCENES), s = make(sc, 'compound-complex');
    return Q.one('Which part of this sentence is the <b>dependent</b> clause?', sc.dep, [sc.a, sc.b].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(s), prompt: 'Which part could not stand alone?',
      hint: 'It starts with a word like because, when or although.', explain: W.sent(hl(s, cap(sc.dep))), meta: { k: 'g8-dep-find' } });
  }
  function depTf() {
    var sc = R.pick(SCENES), right = R.int(0, 1) === 1, said = right ? sc.dep : sc.a;
    return { q: Q.name() + ' says the dependent clause is <b>' + said + '</b>.', fig: W.sent(make(sc, 'complex')), type: 'tf', answer: right,
      why: { options: ['It starts with ' + sub(sc) + ' and cannot stand alone.', 'It is the part that could stand alone.'], answer: right ? 0 : 1 },
      hint: 'Which part starts with a word like because or when?', explain: W.sent(hl(make(sc, 'complex'), cap(sc.dep))), meta: { k: 'g8-dep-tf', said: said } };
  }

  /* ---------- relative clauses ---------- */
  function relNoun(lv) {
    var r = R.pick(REL);
    return Q.tiles('Which noun does the clause <b>' + r[1] + '</b> describe?', r[2], r[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(r[0]), prompt: 'Look just before the clause.',
      hint: 'A relative clause sits right after the noun it describes.', explain: W.sent(hl(r[0], r[1])), meta: { k: 'g8-rel-noun', s: r[0] } });
  }
  function relClause() {
    var r = R.pick(REL), others = r[0].replace(/[.,]/g, '').replace(r[1] + ' ', '').split(' ');
    return Q.one('Which words are the <b>relative clause</b>?', r[1], [others.slice(0, 3).join(' '), others.slice(-3).join(' ')], { fig: W.sent(r[0]), prompt: 'Find who, which or that.',
      hint: 'It starts with who, which or that.', explain: W.sent(hl(r[0], r[1])), meta: { k: 'g8-rel-clause', s: r[0] } });
  }
  function relWord() {
    var r = R.pick(REL), w = r[1].split(' ')[0];
    return Q.tiles('Which word starts the relative clause?', w, ['who', 'which', 'that'].filter(function (x) { return x !== w; }), { fig: W.sent(r[0]), prompt: 'Which noun is being described?',
      hint: 'Who for people; which or that for things.', explain: W.sent(hl(r[0], r[1])), meta: { k: 'g8-rel-word', s: r[0] } });
  }
  function relTf() {
    var r = R.pick(REL), right = R.int(0, 1) === 1, said = right ? r[2] : R.pick(r[3]);
    return { q: Q.name() + ' says <b>' + r[1] + '</b> describes the <b>' + said + '</b>.', fig: W.sent(r[0]), type: 'tf', answer: right,
      why: { options: ['The clause comes right after that noun.', 'The clause describes another noun.'], answer: right ? 0 : 1 }, hint: 'Look just before the clause.',
      explain: W.sent(hl(r[0], r[1])), meta: { k: 'g8-rel-tf', s: r[0], said: said } };
  }

  /* ---------- compound ---------- */
  function compoundWhich(lv) {
    var sc = R.pick(SCENES);
    return Q.one('Which is a <b>compound</b> sentence?', make(sc, 'compound'), ['simple', 'complex', 'compound-complex'].slice(0, lv > 1 ? 3 : 2).map(function (t) { return make(sc, t); }), {
      prompt: 'Find two clauses that could each stand alone.', hint: 'Two independent clauses, joined by a comma and and, but, or or so.', explain: W.sent(make(sc, 'compound')), meta: { k: 'g8-which-type', want: 'compound' } });
  }
  function compoundComma(lv) {
    var sc = R.pick(SCENES);
    return Q.one('Which compound sentence is punctuated correctly?', make(sc, 'compound'), [cap(sc.a) + ' ' + sc.co + ', ' + sc.b + '.', cap(sc.a) + ', ' + sc.b + '.'].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Where does the comma go?', hint: 'The comma comes before the joining word.', explain: W.sent(hl(make(sc, 'compound'), ', ' + sc.co)), meta: { k: 'g8-compound-comma', a: sc.a } });
  }
  function joinTap(lv) {
    var sc = R.pick(SCENES), words = (sc.a + ' ' + sc.b).split(' ').filter(function (w) { return w.length > 2 && JOIN.indexOf(w) < 0; });
    return Q.tiles('Tap the word that joins the two clauses.', sc.co, R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(make(sc, 'compound')), prompt: 'Look right after the comma.',
      hint: 'And, but, or, so.', explain: W.sent(hl(make(sc, 'compound'), ', ' + sc.co)), meta: { k: 'g8-join-tap', a: sc.a } });
  }
  function typeTf(want) {
    return function () {
      var sc = R.pick(SCENES), t = R.int(0, 1) === 1 ? want : R.pick(TYPES.filter(function (x) { return x !== want; })), says = R.int(0, 1) === 1;
      return { q: Q.name() + ' says this <b>' + (says ? 'is' : 'is not') + '</b> a ' + want + ' sentence.', fig: W.sent(make(sc, t)), type: 'tf', answer: says === (t === want),
        why: { options: ['It has ' + TIP[t] + '.', 'Long sentences are always ' + want + '.'], answer: 0 }, hint: 'Count the clauses.', explain: '<b>' + t + '</b>: ' + TIP[t] + '.',
        meta: { k: 'g8-type-tf', s: make(sc, t), said: want, says: says } };
    };
  }

  /* ---------- complex ---------- */
  function complexWhich(lv) {
    var sc = R.pick(SCENES);
    return Q.one('Which is a <b>complex</b> sentence?', make(sc, 'complex'), ['simple', 'compound', 'compound-complex'].slice(0, lv > 1 ? 3 : 2).map(function (t) { return make(sc, t); }), {
      prompt: 'Find one main clause and one dependent clause.', hint: 'A main clause and a clause that starts with a word like because or when.', explain: W.sent(make(sc, 'complex')), meta: { k: 'g8-which-type', want: 'complex' } });
  }
  function combine(lv) {
    var sc = R.pick(SCENES.filter(function (x) { return sub(x) !== 'if'; })), w = sub(sc), rest = sc.dep.slice(w.length + 1);
    return Q.one('Combine: <b>' + cap(sc.a) + '. ' + cap(rest) + '.</b> Which sentence shows how the ideas connect?', cap(sc.a) + ' ' + sc.dep + '.',
      R.some(['unless', 'or'], lv > 1 ? 2 : 1).map(function (x) { return cap(sc.a) + ' ' + x + ' ' + rest + '.'; }), { prompt: 'How are the two ideas related: cause, time, or contrast?',
        hint: 'Choose the joining word that makes the relationship true.', explain: W.sent(cap(sc.a) + ' <b>' + w + '</b> ' + rest + '.'), meta: { k: 'g8-combine', a: sc.a } });
  }
  function complexComma(lv) {
    /* after the main clause, although and while can take a comma, so those clauses always come first here */
    var sc = R.pick(SCENES), first = ['although', 'while'].indexOf(sub(sc)) >= 0 || R.int(0, 1) === 1;
    var right = first ? cap(sc.dep) + ', ' + sc.a + '.' : cap(sc.a) + ' ' + sc.dep + '.';
    var wrong = [cap(sc.dep) + ' ' + sc.a + '.', cap(sc.a) + ', ' + sc.dep + '.'].filter(function (x) { return x !== right; });
    return Q.one('Which complex sentence is punctuated correctly?', right, wrong.slice(0, lv > 1 ? 2 : 1), { prompt: 'Which clause comes first?',
      hint: 'Dependent clause first: put a comma after it. Main clause first: no comma.', explain: W.sent(right), meta: { k: 'g8-complex-comma', a: sc.a } });
  }

  /* ---------- all four types ---------- */
  function typeOf(lv) {
    var sc = R.pick(SCENES), t = R.pick(lv > 1 ? TYPES : TYPES.slice(0, 3));
    return Q.tiles('What type of sentence is this?', t, TYPES.filter(function (x) { return x !== t; }).slice(0, lv > 1 ? 3 : 2), { fig: W.sent(make(sc, t)),
      prompt: 'Count the independent clauses. Is there a dependent clause?', hint: 'Compound: two independent. Complex: one independent and one dependent. Compound-complex: both.',
      explain: '<b>' + t + '</b>: ' + TIP[t] + '.', meta: { k: 'g8-type', s: make(sc, t) } });
  }
  function ccWhich(lv) {
    var sc = R.pick(SCENES);
    return Q.one('Which is a <b>compound-complex</b> sentence?', make(sc, 'compound-complex'), ['simple', 'compound', 'complex'].slice(lv > 1 ? 0 : 1).map(function (t) { return make(sc, t); }), {
      prompt: 'Count: two independent clauses and a dependent one.', hint: 'It needs two independent clauses and at least one dependent clause.', explain: W.sent(make(sc, 'compound-complex')), meta: { k: 'g8-which-type', want: 'compound-complex' } });
  }
  function matchTypes() {
    var sc = R.some(SCENES, 3), ts = R.some(TYPES, 3);
    return { q: 'Match each sentence to its type.', type: 'match', pairs: ts.map(function (t, i) { return [make(sc[i], t), t]; }), hint: 'Count the clauses in each.', explain: 'Simple, compound, complex, compound-complex.', meta: { k: 'g8-match-types' } };
  }

  /* ---------- fragments ---------- */
  function fragment(lv) {
    var sc = R.some(SCENES, 2);
    return Q.all('Pick every <b>fragment</b>.', R.some(FRAG, lv > 1 ? 2 : 1).map(function (f) { return f[0]; }), [make(sc[0], 'simple'), make(sc[1], R.pick(['compound', 'complex']))], {
      prompt: 'Does each one have a clause that could stand alone?', hint: 'A fragment is missing a subject, a verb, or the main clause it depends on.', explain: 'A sentence needs an independent clause.', meta: { k: 'g8-fragment' } });
  }
  function fragWhich(lv) {
    var f = R.pick(FRAG), sc = R.some(SCENES, 2);
    return Q.one('Which one is a <b>fragment</b>?', f[0], [make(sc[0], 'simple'), make(sc[1], 'complex')].slice(0, lv > 1 ? 2 : 1), { prompt: 'Which one leaves you waiting?',
      hint: 'A fragment is missing a subject, a verb, or a main clause.', explain: W.sent(f[0]) + ' is not a complete thought.', meta: { k: 'g8-frag-which' } });
  }
  function fixFrag(lv) {
    var f = R.pick(FRAG), others = R.some(FRAG.filter(function (x) { return x !== f; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; });
    return Q.one('Which fixes this fragment?', f[1], others, { fig: W.sent(f[0]), prompt: 'What is missing: a subject, a verb, or a main clause?',
      hint: 'Add what is missing so the thought is complete.', explain: W.sent(f[1]), meta: { k: 'g8-fix-frag', s: f[0] } });
  }
  function fragTf() {
    var sc = R.pick(SCENES), isFrag = R.int(0, 1) === 1, s = isFrag ? R.pick(FRAG)[0] : make(sc, R.pick(TYPES)), right = R.int(0, 1) === 1, said = right === isFrag ? 'a fragment' : 'a complete sentence';
    return { q: Q.name() + ' says this is <b>' + said + '</b>.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: [isFrag ? 'It has no independent clause.' : 'It has an independent clause.', 'It starts with a capital and ends with a full stop.'], answer: 0 },
      hint: 'Does it have a subject and a verb that can stand alone?', explain: isFrag ? 'It is a fragment.' : 'It is a complete sentence.', meta: { k: 'g8-frag-tf', s: s, said: said } };
  }

  /* ---------- run-ons ---------- */
  function runOn(sc, how) { return cap(sc.a) + (how === 'splice' ? ', ' : ' ') + sc.b + '.'; }
  function fixRunOn(lv) {
    var sc = R.pick(SCENES), fixes = [cap(sc.a) + ', ' + sc.co + ' ' + sc.b + '.', cap(sc.a) + '; ' + sc.b + '.', cap(sc.a) + '. ' + cap(sc.b) + '.'];
    return Q.one('Which fixes this run-on?', R.pick(fixes), [runOn(sc, 'splice'), cap(sc.a) + ' ' + sc.co + ', ' + sc.b + '.'].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(runOn(sc, 'none')), prompt: 'Use a full stop, a semicolon, or a comma with and, but or so.', hint: 'A comma alone cannot join two sentences.',
      explain: fixes.map(W.sent).join(''), meta: { k: 'g8-fix-run-on', a: sc.a } });
  }
  function findRunOn() {
    var sc = R.some(SCENES, 3), bad = runOn(sc[0], R.pick(['splice', 'none']));
    return Q.one('Which one is a <b>run-on</b>?', bad, [make(sc[1], 'compound'), make(sc[2], 'complex')], { prompt: 'Look where one sentence ends and the next begins.',
      hint: 'Look for two sentences joined with nothing, or with only a comma.', explain: W.sent(bad) + ' joins two sentences without a proper join.', meta: { k: 'g8-find-run-on' } });
  }
  var RUNKIND = { splice: 'a comma splice', none: 'two sentences with no join', ok: 'joined correctly' };
  function runOnKind() {
    var sc = R.pick(SCENES), k = R.pick(Object.keys(RUNKIND)), s = k === 'ok' ? make(sc, 'compound') : runOn(sc, k);
    return Q.tiles('What is this?', RUNKIND[k], Object.keys(RUNKIND).filter(function (x) { return x !== k; }).map(function (x) { return RUNKIND[x]; }), { fig: W.sent(s),
      prompt: 'Find where the first clause ends.', hint: 'A comma alone is a splice. Nothing at all is a run-on too.', explain: W.sent(make(sc, 'compound')) + ' is joined correctly.', meta: { k: 'g8-run-on-kind', s: s } });
  }
  function runOnTf() {
    var sc = R.pick(SCENES), bad = R.int(0, 1) === 1, s = bad ? runOn(sc, R.pick(['splice', 'none'])) : make(sc, R.pick(['compound', 'complex'])), right = R.int(0, 1) === 1, says = right === bad;
    return { q: Q.name() + ' says this <b>' + (says ? 'is' : 'is not') + '</b> a run-on.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: [bad ? 'Two sentences are joined without a proper join.' : 'Its clauses are joined properly.', 'Any long sentence is a run-on.'], answer: 0 },
      hint: 'Find where the first clause ends. How is the next one joined?', explain: W.sent(make(sc, 'compound')), meta: { k: 'g8-run-on-tf', s: s, says: says } };
  }

  var S3 = SCENES[2], S7 = SCENES[7], S9 = SCENES[9], S13 = SCENES[13];
  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'clauses', title: 'Clauses', sub: 'The building blocks of sentences.',
      concepts: [
        { slug: 'independent', title: 'An independent clause can stand alone', exp: ['B3.1'], skill: 'independent',
          model: [
            step(W.sent(cap(S3.a) + '.'), 'A complete thought.'),
            step(W.chain(['the trail', 'was closed'], ['Who or what?', 'Did what?']), 'A subject and a verb.'),
            step(W.sent(cap(S3.dep) + '.'), 'A subject and a verb too…'),
            step(W.means('not', 'Because what? It leaves you waiting.'), 'So it cannot stand alone.'),
            step(W.chain(['Kai', 'studied for the test'], ['Who or what?', 'Did what?']), 'Another one that stands alone.')
          ],
          guided: [kindOfClause, function () { return whichInd(1); }, indTf],
          check: [function () { return standAlone(2); }, kindOfClause, function () { return whichInd(2); }, indTf, function () { return standAlone(3); }],
          coach: '<p>Ask two questions: "Who or what?" (the subject) and "Did what?" (the verb). If both answers are there and the thought is complete, it can stand alone.</p>',
          mistake: '<p>Thinking long means complete. "Running down the hall to class" is long but has no subject.</p>' },
        { slug: 'dependent', title: 'A dependent clause needs a main clause', exp: ['B3.1'], skill: 'dependent',
          model: [
            step(W.sent(cap(S3.dep) + '…'), 'Because what? It leaves you waiting.'),
            step(W.tile('because') + ' ' + W.tile('although') + ' ' + W.tile('when') + ' ' + W.tile('since'), 'Words that start one.'),
            step(W.sent(hl(make(S3, 'complex'), cap(S3.dep))), 'Joined to a main clause.'),
            step(W.sent(cap(S9.dep) + '…'), 'Although what?'),
            step(W.sent(hl(make(S9, 'complex'), cap(S9.dep))), 'Now the thought is complete.')
          ],
          guided: [tapDep, function () { return subWord(1); }, depTf],
          check: [tapDep, function () { return subWord(2); }, function () { return depFind(2); }, depTf, function () { return depFind(3); }],
          coach: '<p>Read the dependent clause alone in a questioning voice: "Because the bridge had washed out…?" The child hears that it is unfinished.</p>',
          mistake: '<p>Writing a dependent clause on its own as a sentence. It is a fragment.</p>' },
        { slug: 'relative', title: 'A relative clause describes a noun', exp: ['B3.1'], skill: 'relative',
          model: [
            step(W.sent(REL[0][0]), 'Which aunt?'),
            step(W.sent(hl(REL[0][0], REL[0][1])), 'The one who lives in Moncton.'),
            step(W.tile('who') + ' ' + W.tile('which') + ' ' + W.tile('that'), 'It starts with one of these.'),
            step(W.sent(REL[7][0]), 'Which trail?'),
            step(W.chain(['trail', REL[7][1]], ['Noun', 'Describes it']), 'Right after the noun.')
          ],
          guided: [function () { return relNoun(1); }, relWord, relClause],
          check: [function () { return relNoun(2); }, relClause, relWord, relTf, function () { return relNoun(3); }],
          coach: '<p>Combine two short sentences aloud: "My aunt visits every summer. She lives in Moncton." becomes "My aunt, who lives in Moncton, visits every summer."</p>',
          mistake: '<p>Putting the clause far from its noun, so it seems to describe the wrong thing.</p>' }
      ]
    }, {
      id: 'types', title: 'Sentence types', sub: 'Simple, compound, complex and compound-complex.',
      concepts: [
        { slug: 'compound', title: 'Compound: two independent clauses', exp: ['B3.1'], skill: 'compound',
          model: [
            step(W.sent(cap(S7.a) + '.') + W.sent(cap(S7.b) + '.'), 'Two complete sentences.'),
            step(W.sent(hl(make(S7, 'compound'), ', so')), 'A comma and <b>so</b> join them.'),
            step(W.tile('and') + ' ' + W.tile('but') + ' ' + W.tile('or') + ' ' + W.tile('so'), 'The joining words.'),
            step(W.sent(cap(S9.a) + '.') + W.sent(cap(S9.b) + '.'), 'Two more.'),
            step(W.sent(hl(make(S9, 'compound'), ', but')), '<b>But</b> shows a contrast.')
          ],
          guided: [function () { return compoundWhich(1); }, function () { return joinTap(1); }, typeTf('compound')],
          check: [function () { return compoundWhich(2); }, function () { return compoundComma(2); }, function () { return joinTap(2); }, typeTf('compound'), function () { return compoundComma(3); }],
          coach: '<p>Each joining word shows a relationship: and adds, but contrasts, so shows a result, or gives a choice.</p>',
          mistake: '<p>Forgetting the comma before the joining word in a compound sentence.</p>' },
        { slug: 'complex', title: 'Complex: a main clause and a dependent clause', exp: ['B3.1'], skill: 'complex',
          model: [
            step(W.sent(hl(make(S7, 'complex'), cap(S7.dep))), 'Dependent, then main.'),
            step(W.sent(cap(S7.a) + ' ' + hl(S7.dep, S7.dep) + '.'), 'Main first: no comma needed.'),
            step(W.sent(cap(S13.a) + '.') + W.sent(cap(S13.dep.replace(/^before /, '')) + '.'), 'Two ideas. How are they linked in time?'),
            step(W.sent(cap(S13.a) + ' <b>before</b> ' + S13.dep.replace(/^before /, '') + '.'), 'One sentence that shows the link.')
          ],
          guided: [function () { return complexWhich(1); }, function () { return combine(1); }, function () { return complexComma(1); }],
          check: [function () { return complexWhich(2); }, function () { return combine(2); }, function () { return complexComma(2); }, typeTf('complex'), function () { return combine(3); }],
          coach: '<p>Complex sentences let a writer show cause, time and contrast in one smooth sentence.</p>',
          mistake: '<p>A comma after the dependent clause is easy to forget when it comes first.</p>' },
        { slug: 'compound-complex', title: 'Compound-complex: both at once', exp: ['B3.1'], skill: 'types',
          model: [
            step(W.sent(make(S7, 'compound-complex')), 'Three clauses.'),
            step(W.sent(hl(make(S7, 'compound-complex'), cap(S7.dep))), 'One dependent.'),
            step(W.sent(cap(S7.dep) + ', <b>' + S7.a + '</b>, ' + S7.co + ' <b>' + S7.b + '</b>.'), 'Two independent.'),
            step(W.sent(make(S9, 'compound-complex')), 'Count again.'),
            step(W.chain([S9.dep, S9.a, S9.b], ['Dependent', 'Independent', 'Independent']))
          ],
          guided: [function () { return typeOf(1); }, function () { return ccWhich(1); }, typeTf('compound-complex')],
          check: [function () { return typeOf(2); }, function () { return ccWhich(2); }, matchTypes, typeTf('compound-complex'), function () { return typeOf(3); }],
          coach: '<p>Use these for ideas that really belong together. Too many in a row make writing hard to follow.</p>',
          mistake: '<p>Calling any long sentence compound-complex. Count: it needs two independent clauses and at least one dependent clause.</p>' }
      ]
    }, {
      id: 'fix', title: 'Fragments and run-ons', sub: 'Fix sentences that say too little or too much.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is not a sentence', exp: ['B3.1'], skill: 'fragment',
          model: [
            step(W.sent(FRAG[0][0]), 'A dependent clause alone.'),
            step(W.sent(hl(FRAG[0][1], 'we missed the first class')), 'Fixed: add a main clause.'),
            step(W.sent(FRAG[1][0]), 'Who did what? No verb.'),
            step(W.sent(hl(FRAG[1][1], 'won the race')), 'Fixed: add a verb.'),
            step(W.sent(FRAG[2][0]), 'Who was running? No subject.'),
            step(W.sent(hl(FRAG[2][1], 'Omar was')), 'Fixed: add a subject.')
          ],
          guided: [function () { return fragWhich(1); }, function () { return fixFrag(1); }, fragTf],
          check: [function () { return fragment(2); }, function () { return fixFrag(2); }, fragTf, function () { return fragWhich(2); }, function () { return fragment(3); }],
          coach: '<p>Fragments are common in speech and in ads. In formal writing, check each sentence for an independent clause.</p>',
          mistake: '<p>Thinking a capital and a full stop make a sentence.</p>' },
        { slug: 'run-on', title: 'A run-on needs a proper join', exp: ['B3.1'], skill: 'run-on',
          model: [
            step(W.sent(runOn(S7, 'none')), 'Two sentences, no join.'),
            step(W.sent(runOn(S7, 'splice')), 'A comma alone is not enough either.'),
            step(W.sent(cap(S7.a) + '<mark class="hl">;</mark> ' + S7.b + '.') + W.sent(cap(S7.a) + '<mark class="hl">, so</mark> ' + S7.b + '.'), 'A semicolon, or a comma and a joining word.'),
            step(W.sent(runOn(S9, 'splice')), 'Spot the splice.'),
            step(W.sent(cap(S9.a) + '<mark class="hl">.</mark> ' + cap(S9.b) + '.'), 'Or end the first sentence.')
          ],
          guided: [function () { return fixRunOn(1); }, findRunOn, runOnKind],
          check: [function () { return fixRunOn(2); }, findRunOn, runOnKind, runOnTf, function () { return fixRunOn(3); }],
          coach: '<p>Read the sentence aloud. Where the voice drops and stops, a sentence has ended.</p>',
          mistake: '<p>The comma splice: joining two sentences with only a comma.</p>' }
      ]
    }],
    practice: [
      { id: 'independent', name: 'Independent clauses', code: 'B3.1', gen: kindOfClause },
      { id: 'dependent', name: 'Dependent clauses', code: 'B3.1', gen: tapDep },
      { id: 'relative', name: 'Relative clauses', code: 'B3.1', gen: relNoun },
      { id: 'compound', name: 'Compound sentences', code: 'B3.1', gen: compoundWhich },
      { id: 'complex', name: 'Complex sentences', code: 'B3.1', gen: complexWhich },
      { id: 'types', name: 'All four sentence types', code: 'B3.1', gen: typeOf },
      { id: 'fragment', name: 'Fragments', code: 'B3.1', gen: fragWhich },
      { id: 'run-on', name: 'Run-ons', code: 'B3.1', gen: fixRunOn }
    ]
  });

  Q.shapes('sentences', {
    independent: [[1, 'stand-alone', standAlone], [1, 'which', whichInd], [1, 'true-false', indTf]],
    dependent: [[1, 'joining-word', subWord], [1, 'find', depFind], [1, 'true-false', depTf]],
    relative: [[1, 'clause', relClause], [1, 'word', relWord], [1, 'true-false', relTf]],
    compound: [[1, 'comma', compoundComma], [1, 'joining-word', joinTap], [1, 'true-false', typeTf('compound')]],
    complex: [[1, 'combine', combine], [1, 'comma', complexComma], [1, 'true-false', typeTf('complex')]],
    types: [[1, 'compound-complex', ccWhich], [2, 'match', matchTypes], [2, 'true-false', typeTf('compound-complex')]],
    fragment: [[1, 'pick-all', fragment], [1, 'fix', fixFrag], [1, 'true-false', fragTf]],
    'run-on': [[1, 'find', findRunOn], [1, 'kind', runOnKind], [1, 'true-false', runOnTf]]
  });
})();
