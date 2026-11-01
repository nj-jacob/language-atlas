/* Grade 7: sentences. Independent and dependent clauses, the four sentence types, joining ideas to show how they relate, and fixing fragments and run-ons.
   Ontario 2023 Language, Grade 7, B3.1 "use their knowledge of sentence types and forms to construct sentences that communicate ideas effectively,
   including using and creating complex sentences that combine phrases and clauses to express relationships among ideas".
   All sentences are written for this site. Answer checks: tests/verify/grade7-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- joining ideas: [main clause, other clause, how they relate, joining word] ----------
     Also the source of complex sentences for finding clauses. */
  var JOIN = [['the bus was late', 'the roads were icy', 'cause', 'because'], ['the river flooded', 'it rained for three days', 'cause', 'because'],
    ['the game was cancelled', 'the field was flooded', 'cause', 'because'], ['the plants grew tall', 'they got lots of sun', 'cause', 'because'], ['Maya wore her parka', 'it was minus twenty outside', 'cause', 'because'],
    ['we kept paddling', 'the wind was strong', 'contrast', 'although'], ['the library stayed open', 'the power was out', 'contrast', 'although'],
    ['we finished the hike', 'it started to rain', 'contrast', 'although'], ['Ravi stayed calm', 'the test was hard', 'contrast', 'although'], ['the store was busy', 'it was very late', 'contrast', 'although'],
    ['the crowd cheered', 'the team scored', 'time', 'when'], ['Omar practised every day', 'he could play the song', 'time', 'until'],
    ['the lights went down', 'the movie started', 'time', 'when'], ['we waited inside', 'the storm passed', 'time', 'until'], ['Nia read her book', 'the bus came', 'time', 'until'],
    ['you can join the club', 'you sign up by Friday', 'condition', 'if'], ['the seedlings will die', 'someone waters them', 'condition', 'unless'],
    ['we will paddle to the island', 'the lake is calm', 'condition', 'if'], ['the ice will melt', 'it stays cold', 'condition', 'unless'], ['you will get a seat', 'you arrive early', 'condition', 'if']];
  var RELS = ['cause', 'contrast', 'time', 'condition'];
  var RELATE = { because: 'cause', although: 'contrast', when: 'time', until: 'time', if: 'condition', unless: 'condition' };
  function joined(j) { return cap(j[0]) + ' ' + j[3] + ' ' + j[1] + '.'; }
  function joinWords(j) { return R.shuffle(['because', 'although', 'when', 'unless'].filter(function (w) { return RELATE[w] !== j[2]; }).slice(0, 2)); }
  function combine(lv) {
    var j = R.pick(JOIN), right = joined(j), wrong = joinWords(j).map(function (w) { return cap(j[0]) + ' ' + w + ' ' + j[1] + '.'; });
    return Q.one('Join the ideas to show <b>' + j[2] + '</b>.', right, wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + '.') + W.sent(cap(j[1]) + '.'),
      prompt: 'Which joining word shows ' + j[2] + '?', hint: 'because: cause. although: contrast. when, until: time. if, unless: condition.', explain: W.sent(right), meta: { k: 'g7-combine', main: j[0], rel: j[2] } });
  }
  function joinWord(lv) {
    var j = R.pick(JOIN);
    return Q.tiles('Which word fits best?', j[3], joinWords(j).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + ' ' + W.gap() + ' ' + j[1] + '.'),
      hint: 'How are the two ideas connected: cause, contrast, time or condition?', explain: W.sent(cap(j[0]) + ' <b>' + j[3] + '</b> ' + j[1] + '.'), meta: { k: 'g7-join-word', main: j[0] } });
  }
  function relation(lv) {
    var j = R.pick(JOIN), s = joined(j);
    return Q.tiles('How are the ideas related?', j[2], R.some(RELS.filter(function (x) { return x !== j[2]; }), lv > 1 ? 3 : 2), { fig: W.sent(s.replace(' ' + j[3] + ' ', ' <b>' + j[3] + '</b> ')),
      hint: 'The joining word tells you.', explain: '<b>' + j[3] + '</b> shows ' + j[2] + '.', meta: { k: 'g7-relation', s: s } });
  }
  function relateTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, said = right ? j[2] : R.pick(RELS.filter(function (x) { return x !== j[2]; })), s = joined(j);
    return { q: Q.name() + ' says <b>' + j[3] + '</b> shows <b>' + said + '</b> here.', fig: W.sent(s.replace(' ' + j[3] + ' ', ' <b>' + j[3] + '</b> ')), type: 'tf', answer: right,
      why: { options: ['That is what <b>' + j[3] + '</b> shows.', '<b>' + j[3] + '</b> shows something else.'], answer: right ? 0 : 1 },
      hint: 'because: cause. although: contrast. when, until: time. if, unless: condition.', explain: '<b>' + j[3] + '</b> shows ' + j[2] + '.', meta: { k: 'g7-relate-tf', s: s, said: said } };
  }

  /* ---------- clauses ---------- */
  /* [independent clause, the same idea as a dependent clause] */
  var CLAUSES = [['the roads were icy', 'because the roads were icy'], ['the bell rang', 'when the bell rang'], ['the trail was steep', 'although the trail was steep'], ['you sign up by Friday', 'if you sign up by Friday'],
    ['the river flooded', 'after the river flooded'], ['the power came back', 'until the power came back'], ['the gym was closed', 'since the gym was closed'], ['we waited for the ferry', 'while we waited for the ferry'],
    ['the snow melted', 'before the snow melted'], ['the fire was out', 'unless the fire was out'], ['the moose crossed the road', 'as the moose crossed the road'], ['Aiko finished her painting', 'after Aiko finished her painting'],
    ['the geese flew south', 'when the geese flew south'], ['the score was tied', 'although the score was tied'], ['the music started', 'once the music started'], ['the soup was hot', 'because the soup was hot']];
  function clauseKind() {
    var c = R.pick(CLAUSES), dep = R.int(0, 1) === 1, shown = dep ? c[1] : c[0];
    return { q: 'Can this clause stand alone as a sentence?', fig: W.sent(shown), type: 'tap', tiles: ['Yes: independent', 'No: dependent'], answer: dep ? 1 : 0,
      prompt: 'Read it on its own. Does it feel finished?', hint: 'A clause that starts with because, when, if or although needs more.', explain: dep ? 'It leaves you waiting: dependent.' : 'It is a complete thought: independent.', meta: { k: 'g7-clause-kind', s: shown } };
  }
  function clauseFind() {
    var j = R.pick(JOIN), first = R.int(0, 1) === 1, dep = j[3] + ' ' + j[1], s = first ? cap(dep) + ', ' + j[0] + '.' : joined(j);
    return Q.tiles('Tap the <b>dependent</b> clause.', first ? cap(dep) : dep, [first ? j[0] : cap(j[0])], { fig: W.sent(s),
      hint: 'Which part starts with a joining word and cannot stand alone?', explain: 'Dependent: <b>' + dep + '</b>.', meta: { k: 'g7-clause-find', s: s } });
  }
  function clauseStarter(lv) {
    var j = R.pick(JOIN), words = (j[0] + ' ' + j[1]).split(' ').filter(function (w, i, all) { return all.indexOf(w) === i && w !== j[3]; });
    return Q.tiles('Which word starts the dependent clause?', j[3], R.some(words, lv > 1 ? 3 : 2), { fig: W.sent(joined(j)),
      hint: 'Look for because, although, when, until, if or unless.', explain: '<b>' + j[3] + '</b> ' + j[1], meta: { k: 'g7-clause-starter', s: joined(j) } });
  }
  function clauseTf() {
    var c = R.pick(CLAUSES), dep = R.int(0, 1) === 1, shown = dep ? c[1] : c[0], right = R.int(0, 1) === 1, says = right !== dep;
    return { q: Q.name() + ' says this clause <b>' + (says ? 'can' : 'cannot') + '</b> stand alone.', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: [says ? 'It is a complete thought.' : 'It starts with a joining word, so it needs more.', says ? 'It starts with a joining word, so it needs more.' : 'It is a complete thought.'], answer: right ? 0 : 1 },
      hint: 'Does it start with a word like because, when or if?', explain: dep ? 'Dependent: it needs more.' : 'Independent: it can stand alone.', meta: { k: 'g7-clause-tf', s: shown, can: says } };
  }

  /* ---------- sentence types ---------- */
  var TYPES = {
    simple: ['The canoe tipped over in the rapids.', 'Leila and Mateo built a snow fort.', 'The old bridge creaks in the wind.', 'My grandmother speaks Tagalog and English.',
      'The wind howled all night.', 'Our class planted twelve trees beside the school.', 'Grandpa told stories about the trapline.'],
    compound: ['The canoe tipped over, but nobody got hurt.', 'The snow kept falling, so school closed early.', 'Kai plays the drums, and his sister sings.', 'We could take the bus, or we could walk.',
      'The ferry was full, so we waited for the next one.', 'Priya likes math, but her brother prefers art.', 'The geese flew south, and the lake froze over.'],
    complex: ['Because the snow kept falling, school closed early.', 'The canoe tipped over when it hit a rock.', 'Although the trail was steep, we reached the top.', 'We will leave if the rain stops.',
      'Since the gym was closed, we played outside.', 'The dog barked until the mail carrier left.', 'While we waited, the snow began to fall.'],
    'compound-complex': ['When the canoe tipped over, we swam to shore, and Kai grabbed the paddles.', 'Although the trail was steep, we reached the top, but our legs were sore.',
      'If the rain stops, we will leave, and we will be home by dinner.', 'The power went out because the wind was strong, so we played cards.',
      'After the game ended, the fans cheered, and the players shook hands.', 'We stayed inside while it stormed, but the dog wanted to go out.']
  };
  var TNAMES = Object.keys(TYPES);
  var TWHAT = { simple: 'one independent clause', compound: 'two independent clauses joined by and, but, or or so', complex: 'an independent clause and a dependent clause', 'compound-complex': 'two independent clauses and a dependent clause' };
  function typeOf(lv) {
    var t = R.pick(TNAMES), s = R.pick(TYPES[t]);
    return Q.tiles('What type of sentence is this?', t, R.some(TNAMES.filter(function (x) { return x !== t; }), lv > 1 ? 3 : 2), { fig: W.sent(s),
      prompt: 'Count the clauses. Is there a joining word like because or when?', hint: 'Look for , and / , but / , so (two independent clauses) and for because, when, if, although (a dependent clause).',
      explain: '<b>' + cap(t) + '</b>: ' + TWHAT[t] + '.', meta: { k: 'g7-type-of', s: s } });
  }
  function typePick() {
    var t = R.pick(TNAMES), right = R.some(TYPES[t], 2), wrong = R.some(TNAMES.filter(function (x) { return x !== t; }), 2).map(function (x) { return R.pick(TYPES[x]); });
    return Q.all('Pick every <b>' + t + '</b> sentence.', right, wrong, { hint: cap(t) + ': ' + TWHAT[t] + '.', explain: cap(t) + ': ' + TWHAT[t] + '.', meta: { k: 'g7-type-pick', t: t } });
  }
  function typeMatch(lv) {
    var ts = R.some(TNAMES, lv > 2 ? 4 : 3);
    return { q: 'Match each sentence to its type.', type: 'match', pairs: ts.map(function (t) { return [R.pick(TYPES[t]), t]; }), hint: 'Count the clauses in each one.', explain: 'Count the independent and dependent clauses.', meta: { k: 'g7-type-match' } };
  }
  function typeTf() {
    var t = R.pick(TNAMES), s = R.pick(TYPES[t]), right = R.int(0, 1) === 1, said = right ? t : R.pick(TNAMES.filter(function (x) { return x !== t; }));
    return { q: Q.name() + ' says this is a <b>' + said + '</b> sentence.', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The clauses match that type.', 'The clauses show a different type.'], answer: right ? 0 : 1 },
      hint: 'Count the independent clauses, then look for a dependent one.', explain: '<b>' + cap(t) + '</b>: ' + TWHAT[t] + '.', meta: { k: 'g7-type-tf', said: said } };
  }

  /* ---------- the dependent clause first: a comma after it ---------- */
  var FRONT = JOIN.filter(function (x) { return x[3] !== 'until'; });
  function frontedRight(j) { return cap(j[3]) + ' ' + j[1] + ', ' + j[0] + '.'; }
  function fronted(lv) {
    var j = R.pick(FRONT), right = frontedRight(j), wrong = [cap(j[3]) + ' ' + j[1] + ' ' + j[0] + '.', cap(j[3]) + ', ' + j[1] + ' ' + j[0] + '.'];
    return Q.one('Which sentence uses the comma correctly?', right, wrong.slice(0, lv > 1 ? 2 : 1), { prompt: 'Where does the dependent clause end?',
      hint: 'When the dependent clause comes first, put a comma after it.', explain: W.sent(right), meta: { k: 'g7-fronted', sub: j[3] + ' ' + j[1] } });
  }
  function frontedMove(lv) {
    var j = R.pick(FRONT), right = frontedRight(j), wrong = [cap(j[1]) + ' ' + j[3] + ' ' + j[0] + '.', cap(j[3]) + ' ' + j[0] + ', ' + j[1] + '.'];
    return Q.one('Move the dependent clause to the front. Which is right?', right, wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent(joined(j)),
      hint: 'Keep the joining word with its own clause. Add a comma after it.', explain: W.sent(right), meta: { k: 'g7-fronted-move', main: j[0], sub: j[3] + ' ' + j[1] } });
  }
  function frontedComma(lv) {
    var j = R.pick(FRONT), dep = (j[3] + ' ' + j[1]).split(' '), main = j[0].split(' '), last = dep[dep.length - 1],
      others = dep.slice(0, -1).concat(main).filter(function (w, i, all) { return w !== last && all.indexOf(w) === i && all.lastIndexOf(w) === i; }),
      tiles = [last].concat(R.some(others, lv > 1 ? 3 : 2)), order = cap(dep.join(' ')) + ' ' + j[0] + '.';
    return Q.tiles('The comma is missing. Which word does it go after?', last, tiles.slice(1), { fig: W.sent(order),
      hint: 'Find where the dependent clause ends.', explain: W.sent(frontedRight(j)), meta: { k: 'g7-fronted-comma', sub: j[3] + ' ' + j[1] } });
  }
  function frontedTf() {
    var j = R.pick(FRONT), right = R.int(0, 1) === 1, s = right ? frontedRight(j) : R.pick([cap(j[3]) + ' ' + j[1] + ' ' + j[0] + '.', cap(j[3]) + ', ' + j[1] + ' ' + j[0] + '.']);
    return { q: Q.name() + ' wrote this. Is the comma right?', fig: W.sent(s), type: 'tf', answer: right,
      why: { options: ['The comma comes right after the dependent clause.', 'The comma is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Where does the dependent clause end?', explain: W.sent(frontedRight(j)), meta: { k: 'g7-fronted-tf', sub: j[3] + ' ' + j[1], s: s } };
  }

  /* ---------- fragments: [fragment, a fixed sentence] ---------- */
  var FRAG = [['Because the gym was closed.', 'Because the gym was closed, we played outside.'], ['After the storm passed over the lake.', 'After the storm passed over the lake, we went fishing.'],
    ['Running down the hall with a stack of books.', 'Lucas was running down the hall with a stack of books.'], ['The tall girl from my hockey team.', 'The tall girl from my hockey team scored twice.'],
    ['When we reach the campsite.', 'When we reach the campsite, we will set up the tent.'], ['Although the water was cold.', 'Although the water was cold, we swam to the dock.'],
    ['The old cabin by the river.', 'The old cabin by the river has a red door.'], ['Hoping for a snow day.', 'Hoping for a snow day, Mei checked the news.'],
    ['If the bus is late again.', 'If the bus is late again, we will walk.'], ['A loud crash in the kitchen.', 'We heard a loud crash in the kitchen.'],
    ['Until the music stopped.', 'We danced until the music stopped.'], ['Since the library opened.', 'Since the library opened, Amir has visited every week.']];
  function whole(lv) {
    var f = R.some(FRAG, 3);
    return Q.one('Which is a <b>complete</b> sentence?', f[0][1], [f[1][0], f[2][0]].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Does it have a complete thought?', hint: 'A complete sentence has an independent clause: someone or something doing something.', explain: 'A complete thought: ' + f[0][1], meta: { k: 'g7-whole' } });
  }
  function fragOrNot() {
    var f = R.pick(FRAG), isFrag = R.int(0, 1) === 1, s = isFrag ? f[0] : f[1];
    return { q: 'Is this a complete sentence or a fragment?', fig: W.sent(s), type: 'tap', tiles: ['A complete sentence', 'A fragment'], answer: isFrag ? 1 : 0,
      hint: 'Could it stand on its own as a complete thought?', explain: isFrag ? 'A fragment: a part is missing.' : 'A complete sentence.', meta: { k: 'g7-frag-or-not', s: s } };
  }
  function fragFix(lv) {
    var f = R.pick(FRAG), other = R.pick(FRAG.filter(function (x) { return x !== f; }))[1];
    return Q.one('Which fixes the fragment?', f[1], [f[0].replace(/\.$/, '!')].concat(lv > 1 ? [other] : []), { fig: W.sent(f[0]),
      hint: 'Keep its words and add what is missing.', explain: W.sent(f[1]), meta: { k: 'g7-frag-fix', s: f[0] } });
  }
  function fragPick() {
    var f = R.some(FRAG, 4);
    return Q.all('Pick every <b>fragment</b>.', [f[0][0], f[1][0]], [f[2][1], f[3][1]], { hint: 'Which ones leave you waiting for more?', explain: 'Fragments are missing a part.', meta: { k: 'g7-frag-pick' } });
  }

  /* ---------- run-ons: [first clause, second clause, joining word that fits, joined by only a comma] ---------- */
  var RUN = [['The power went out', 'we lit candles', 'so', true], ['The lake froze early', 'we went skating', 'so', true], ['Noor won the race', 'she was thrilled', 'and', false],
    ['The bus was late', 'we missed the start', 'so', false], ['Jamal finished his homework', 'he went outside to play', 'and', true], ['The trail was muddy', 'we wore our boots', 'so', false],
    ['Ella wanted to swim', 'the pool was closed', 'but', true], ['The fire alarm rang', 'everyone walked outside', 'and', false], ['My brother loves hockey', 'I prefer basketball', 'but', true],
    ['The wind picked up', 'the waves grew taller', 'and', false]];
  function runOn(r) { return r[0] + (r[3] ? ', ' : ' ') + r[1] + '.'; }
  function goods(r) { return [r[0] + ', ' + r[2] + ' ' + r[1] + '.', r[0] + '; ' + r[1] + '.', r[0] + '. ' + cap(r[1]) + '.']; }
  function bads(r) { var w = r[0].split(' '); return [r[0] + (r[3] ? ' ' : ', ') + r[1] + '.', w.slice(0, 2).join(' ') + ', ' + w.slice(2).join(' ') + ' ' + r[1] + '.']; }
  function fixRunOn(lv) {
    var r = R.pick(RUN);
    return Q.one('Which fixes the run-on?', R.pick(goods(r)), bads(r).slice(0, lv > 1 ? 2 : 1), { fig: W.sent(runOn(r)), hint: 'Add a joining word after the comma, use a semicolon, or make two sentences.',
      explain: goods(r).join(' or '), meta: { k: 'g7-fix-runon', s: runOn(r) } });
  }
  function fixPick() {
    var r = R.pick(RUN);
    return Q.all('Pick every good way to fix the run-on.', R.some(goods(r), 2), bads(r), { fig: W.sent(runOn(r)), hint: 'There is more than one good fix.', explain: goods(r).join(' or '), meta: { k: 'g7-fix-pick', s: runOn(r) } });
  }
  function whatsWrong() {
    var frag = R.int(0, 1) === 1, s = frag ? R.pick(FRAG)[0] : runOn(R.pick(RUN));
    return { q: 'What is wrong with this?', fig: W.sent(s), type: 'tap', tiles: ['It is a fragment: a part is missing.', 'It is a run-on: two sentences crammed together.'], answer: frag ? 0 : 1,
      hint: 'Is something missing, or is there too much?', explain: frag ? 'A fragment: it is not a complete thought.' : 'A run-on: two complete thoughts with no joining word.', meta: { k: 'g7-whats-wrong', s: s } };
  }
  function runOnOrNot() {
    var r = R.pick(RUN), bad = R.int(0, 1) === 1, s = bad ? runOn(r) : R.pick(goods(r));
    return { q: 'Is this sentence correct, or is it a run-on?', fig: W.sent(s), type: 'tap', tiles: ['Correct', 'A run-on'], answer: bad ? 1 : 0,
      hint: 'Two complete thoughts need a joining word, a semicolon or a full stop.', explain: bad ? 'A run-on. Fix: ' + goods(r)[0] : 'Correct.', meta: { k: 'g7-runon-or-not', s: s } };
  }

  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'clauses', title: 'Clauses and sentence types', sub: 'The building blocks of a sentence.',
      concepts: [
        { slug: 'clauses', title: 'Some clauses cannot stand alone', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent('the roads were icy'), 'A complete thought: <b>independent</b>.'),
            step(W.sent('<b>because</b> the roads were icy'), 'Leaves you waiting: <b>dependent</b>.'),
            step(W.sent('The bus was late <b>because</b> the roads were icy.'), 'Joined to an independent clause, it works.'),
            step(W.sent('<b>although</b> the trail was steep'), 'Waiting again. What happened?'),
            step(W.sent('<b>Although</b> the trail was steep, we reached the top.'), 'Now it is finished.')
          ],
          guided: [clauseKind, clauseFind, clauseTf],
          check: [clauseKind, function () { return clauseStarter(2); }, clauseFind, clauseTf, clauseKind],
          coach: '<p>Read the clause aloud and ask, "Is that the whole thing?" A dependent clause makes you wait for more.</p>',
          mistake: '<p>Writing a dependent clause on its own with a full stop ("Because I was tired."). Join it to an independent clause.</p>' },
        { slug: 'types', title: 'Four sentence types', exp: ['B3.1'], skill: 'types',
          model: [
            step(W.sent('The canoe tipped over.'), '<b>Simple</b>: one independent clause.'),
            step(W.sent('The canoe tipped over, <b>but</b> nobody got hurt.'), '<b>Compound</b>: two, joined.'),
            step(W.sent('The canoe tipped over <b>when</b> it hit a rock.'), '<b>Complex</b>: plus a dependent clause.'),
            step(W.sent('<b>When</b> it tipped, we swam to shore, <b>and</b> Kai grabbed the paddles.'), '<b>Compound-complex</b>: both.'),
            step(W.sent('The geese flew south, <b>and</b> the lake froze over.'), 'Two complete thoughts: compound.')
          ],
          guided: [function () { return typeOf(1); }, typeTf, function () { return typeMatch(1); }],
          check: [function () { return typeOf(2); }, typePick, typeTf, function () { return typeMatch(2); }, function () { return typeOf(3); }],
          coach: '<p>Underline independent clauses in one colour and dependent clauses in another. The colours tell the type.</p>',
          mistake: '<p>Calling any long sentence "complex". Length does not decide the type; the clauses do.</p>' }
      ]
    }, {
      id: 'joining', title: 'Joining ideas', sub: 'Show how ideas connect.',
      concepts: [
        { slug: 'relate', title: 'The joining word shows how ideas relate', exp: ['B3.1'], skill: 'relate',
          model: [
            step(W.tile('because'), 'Cause.'),
            step(W.tile('although'), 'Contrast.'),
            step(W.tile('when') + ' ' + W.tile('until'), 'Time.'),
            step(W.tile('if') + ' ' + W.tile('unless'), 'Condition.'),
            step(W.sent('We kept paddling <b>although</b> the wind was strong.'), 'Strong wind, but we kept going.')
          ],
          guided: [function () { return joinWord(1); }, function () { return combine(1); }, relateTf],
          check: [function () { return combine(2); }, function () { return relation(2); }, relateTf, function () { return joinWord(2); }, function () { return combine(3); }],
          coach: '<p>Give two short sentences and ask the child to join them three ways (because, although, when). Talk about how the meaning changes.</p>',
          mistake: '<p>Using "and" for everything. "And" adds; it does not show cause or contrast.</p>' },
        { slug: 'fronted', title: 'A dependent clause can go first', exp: ['B3.1'], skill: 'fronted',
          model: [
            step(W.sent('The bus was late because the roads were icy.')),
            step(W.sent('Because the roads were icy<mark class="hl">,</mark> the bus was late.'), 'Moved to the front: add a comma.'),
            step(W.sent('You can join the club if you sign up by Friday.')),
            step(W.sent('If you sign up by Friday<mark class="hl">,</mark> you can join the club.'), 'The comma marks where the clause ends.')
          ],
          guided: [function () { return fronted(1); }, function () { return frontedMove(1); }, frontedTf],
          check: [function () { return fronted(2); }, function () { return frontedComma(2); }, frontedTf, function () { return frontedMove(2); }, function () { return fronted(3); }],
          coach: '<p>Starting with the dependent clause puts the reason or condition first. Ask: "Which do you want the reader to notice first?"</p>',
          mistake: '<p>Forgetting the comma after a front dependent clause, or putting it right after the joining word.</p>' }
      ]
    }, {
      id: 'fixing', title: 'Fixing sentences', sub: 'Fragments and run-ons.',
      concepts: [
        { slug: 'fragment', title: 'A fragment is missing a part', exp: ['B3.1'], skill: 'fragment',
          model: [
            step(W.sent('Because the gym was closed.'), 'Because... what?'),
            step(W.sent('Because the gym was closed, <b>we played outside</b>.'), 'Add an independent clause.'),
            step(W.sent('The old cabin by the river.'), 'The cabin... did what? Has what?'),
            step(W.sent('The old cabin by the river <b>has a red door</b>.'), 'Add what it does or has.')
          ],
          guided: [fragOrNot, function () { return whole(1); }, function () { return fragFix(1); }],
          check: [fragOrNot, function () { return whole(2); }, fragPick, function () { return fragFix(2); }, function () { return whole(3); }],
          coach: '<p>Fragments are fine in speech and in some stories. In school writing, ask: "Could this stand on its own?"</p>',
          mistake: '<p>Thinking a long group of words must be a sentence ("Running down the hall with a stack of books.").</p>' },
        { slug: 'run-on', title: 'A run-on needs a joining word or a full stop', exp: ['B3.1'], skill: 'run-on',
          model: [
            step(W.sent('The power went out, we lit candles.'), 'Two sentences, just a comma.'),
            step(W.sent('The power went out, <b>so</b> we lit candles.'), 'Add a joining word.'),
            step(W.sent('The power went out<b>.</b> <b>W</b>e lit candles.'), 'Or make two sentences.'),
            step(W.sent('Noor won the race she was thrilled.'), 'No mark at all between them.'),
            step(W.sent('Noor won the race<b>;</b> she was thrilled.'), 'A semicolon works too.')
          ],
          guided: [function () { return fixRunOn(1); }, runOnOrNot, whatsWrong],
          check: [function () { return fixRunOn(2); }, fixPick, runOnOrNot, whatsWrong, function () { return fixRunOn(3); }],
          coach: '<p>Read the sentence aloud. Where your voice naturally stops, check that there is a full stop, a semicolon or a joining word.</p>',
          mistake: '<p>Fixing a run-on by adding more commas. A comma alone cannot join two sentences.</p>' }
      ]
    }],
    practice: [
      { id: 'clauses', name: 'Independent and dependent clauses', code: 'B3.1', gen: clauseKind },
      { id: 'types', name: 'Sentence types', code: 'B3.1', gen: typeOf },
      { id: 'relate', name: 'Joining ideas', code: 'B3.1', gen: combine },
      { id: 'fronted', name: 'Dependent clause first', code: 'B3.1', gen: fronted },
      { id: 'fragment', name: 'Fragments', code: 'B3.1', gen: whole },
      { id: 'run-on', name: 'Run-ons', code: 'B3.1', gen: fixRunOn }
    ],
    tasks: [
      { id: 'combine-write', title: 'Write it four ways', code: 'B3.1', pic: W.icon('write'), say: 'Write about your weekend in four sentences: simple, compound, complex and compound-complex.', write: true,
        run: ['The child writes four sentences about one topic, one of each type.', 'Together, underline the independent clauses and circle the joining words.', 'Ask which sentence shows the relationship between ideas most clearly.'],
        rubric: ['Sentences are all simple, or not complete.', 'Two types are correct.', 'All four types are correct.', 'All four are correct and the joining words show cause, contrast, time or condition precisely.'] }
    ]
  });

  Q.shapes('sentences', {
    clauses: [[1, 'find', clauseFind], [1, 'starter', clauseStarter], [1, 'true-false', clauseTf]],
    types: [[1, 'true-false', typeTf], [2, 'pick', typePick], [2, 'match', typeMatch]],
    relate: [[1, 'join-word', joinWord], [1, 'relation', relation], [1, 'true-false', relateTf]],
    fronted: [[1, 'move', frontedMove], [1, 'where-comma', frontedComma], [1, 'true-false', frontedTf]],
    fragment: [[1, 'fragment-or-not', fragOrNot], [1, 'fix', fragFix], [2, 'pick', fragPick]],
    'run-on': [[1, 'run-on-or-not', runOnOrNot], [1, 'whats-wrong', whatsWrong], [2, 'pick', fixPick]]
  });
})();
