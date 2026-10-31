/* Grade 6: complex sentences.
   Ontario 2023 Language, Grade 6:
   B3.1 "use their knowledge of sentence types and forms to construct sentences that communicate ideas effectively, including using and
   creating complex sentences with adjective or relative clauses to express relationships among ideas"
   Main and dependent clauses, joining words that show how ideas connect, and relative (adjective) clauses with who, which, that and whose.
   All sentences are written for this site. Answer checks: tests/verify/grade6-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [main clause, dependent clause, joining word, what it shows] */
  var JOIN = [['we played outside', 'it was drizzling', 'Although', 'contrast', ['because', 'unless']], ['the game was cancelled', 'the field was flooded', 'because', 'cause', ['although', 'unless']],
    ['you cannot go to the lake', 'you finish your chores', 'unless', 'condition', ['because', 'although']], ['we waited at the dock', 'the ferry arrived', 'until', 'time', ['unless', 'although']],
    ['the crowd cheered', 'the puck crossed the line', 'when', 'time', ['unless', 'although']], ['Priya kept practising', 'her fingers were sore', 'even though', 'contrast', ['because', 'unless']],
    ['the library closed early', 'the power went out', 'because', 'cause', ['although', 'unless']], ['we will plant the garden', 'the frost is over', 'if', 'condition', ['although', 'until']]];
  var SHOWS = { contrast: 'a surprise or contrast', cause: 'a reason', condition: 'a condition (what must happen)', time: 'when it happens' };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* the dependent clause first ("Although it was drizzling, we played outside.") or last */
  function whole(j, first) { var w = j[2].toLowerCase(); return first ? cap(w) + ' ' + j[1] + ', ' + j[0] + '.' : cap(j[0]) + ' ' + w + ' ' + j[1] + '.'; }

  function standAlone(lv) {
    var j = R.pick(JOIN), first = R.int(0, 1) === 1, w = j[2].toLowerCase();
    return Q.tiles('Which part could stand alone as a sentence?', cap(j[0]) + '.', [cap(w) + ' ' + j[1] + '.'].concat(lv > 1 ? [cap(j[1].split(' ').slice(-2).join(' ')) + '.'] : []), {
      fig: W.sent(whole(j, first)), prompt: 'Read each part on its own. Does it sound finished?', hint: 'A part that starts with ' + w + ' leaves you waiting.',
      explain: '<b>' + cap(j[0]) + '</b> is the main clause. It makes sense alone.', meta: { k: 'g6-stand-alone', s: whole(j, first) } });
  }
  function joinWord(lv) {
    var j = R.pick(JOIN), w = j[2].toLowerCase();
    return Q.one('Which joining word fits best?', w, j[4].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + ' ' + W.gap() + ' ' + j[1] + '.'),
      prompt: 'How are the two ideas connected?', hint: 'Is it a reason, a contrast, a condition, or a time?', explain: W.sent(whole(j, false)), meta: { k: 'g6-join-word', main: j[0] } });
  }
  function shows(lv) {
    var j = R.pick(JOIN), w = j[2].toLowerCase();
    return Q.one('What does <b>' + w + '</b> show in this sentence?', SHOWS[j[3]], Object.keys(SHOWS).filter(function (k) { return k !== j[3]; }).map(function (k) { return SHOWS[k]; }).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(whole(j, R.int(0, 1) === 1)), hint: 'Ask: why? when? what if? or surprisingly?', explain: '<b>' + w + '</b> shows ' + SHOWS[j[3]] + '.', meta: { k: 'g6-shows', word: w } });
  }
  function fragment() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, shown = right ? cap(j[0]) + '.' : cap(j[2].toLowerCase()) + ' ' + j[1] + '.';
    return { q: 'Is this a complete sentence?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['It makes sense on its own.', 'It leaves you waiting for more.'], answer: right ? 0 : 1 },
      hint: 'Does it start with a joining word like because or although?', explain: right ? 'It is a main clause.' : 'It is a dependent clause. It needs a main clause.', meta: { k: 'g6-fragment', shown: shown } };
  }
  function pickComplex() {
    var js = R.some(JOIN, 4), right = js.slice(0, 2).map(function (j) { return whole(j, R.int(0, 1) === 1); }), wrong = js.slice(2).map(function (j) { return cap(j[0]) + '.'; });
    wrong[1] = cap(js[3][0]) + ' and ' + js[3][1] + '.';
    return Q.all('Pick every <b>complex</b> sentence (a main clause and a dependent clause).', right, wrong, {
      hint: 'Look for a joining word like because, although, unless or when.', explain: 'A complex sentence has a dependent clause that starts with a joining word.', meta: { k: 'g6-pick-complex' } });
  }

  /* ---------- relative clauses: [before, the relative word, the clause, after] ---------- */
  var REL = [['The girl', 'who', 'won the race', 'is my cousin.'], ['The canoe,', 'which', 'was made of birchbark,', 'floated well.'], ['The boy', 'whose', 'bike was stolen', 'called the police.'],
    ['My grandmother,', 'who', 'grew up in Winnipeg,', 'speaks Ukrainian and English.'], ['The trail', 'that', 'leads to the falls', 'is closed today.'], ['The author', 'whose', 'book we read', 'visited our school.'],
    ['The lake,', 'which', 'freezes every December,', 'is perfect for skating.'], ['The students', 'who', 'built the robot', 'won first prize.']];
  var RELWRONG = { who: ['which', 'whose'], which: ['who', 'whose'], that: ['who', 'whose'], whose: ['who', 'which'] };
  /* [two sentences, the joined sentence, wrong joins] */
  var COMBINE = [['My grandmother grew up in Winnipeg. She speaks Ukrainian and English.', 'My grandmother, who grew up in Winnipeg, speaks Ukrainian and English.',
    ['My grandmother, which grew up in Winnipeg, speaks Ukrainian and English.', 'My grandmother grew up in Winnipeg, she speaks Ukrainian and English.']],
    ['The lake freezes every December. It is perfect for skating.', 'The lake, which freezes every December, is perfect for skating.',
      ['The lake, who freezes every December, is perfect for skating.', 'The lake freezes every December, it is perfect for skating.']],
    ['Mr. Okafor coaches our team. He used to play in the NHL.', 'Mr. Okafor, who used to play in the NHL, coaches our team.',
      ['Mr. Okafor, which used to play in the NHL, coaches our team.', 'Mr. Okafor coaches our team, he used to play in the NHL.']],
    ['The museum is in Ottawa. It has a huge canoe collection.', 'The museum, which has a huge canoe collection, is in Ottawa.',
      ['The museum, who has a huge canoe collection, is in Ottawa.', 'The museum is in Ottawa, it has a huge canoe collection.']]];
  function relSent(r) { return r[0] + ' ' + r[1] + ' ' + r[2] + ' ' + r[3]; }

  function relWord(lv) {
    var r = R.pick(REL);
    return Q.one('Which word fits the gap?', r[1], RELWRONG[r[1]].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(r[0] + ' ' + W.gap() + ' ' + r[2] + ' ' + r[3]),
      prompt: 'A person, a thing, or something that belongs to someone?', hint: 'who: people. which or that: things. whose: belonging to.', explain: W.sent(relSent(r)), meta: { k: 'g6-rel-word', s: relSent(r) } });
  }
  function findClause() {
    var r = R.pick(REL);
    return { q: 'Tap the <b>relative clause</b>. It tells more about a noun.', fig: W.sent(relSent(r)), type: 'tap', tiles: [r[0].replace(',', ''), r[1] + ' ' + r[2].replace(',', ''), r[3]], answer: 1,
      hint: 'It starts with who, which, that or whose.', explain: '<b>' + r[1] + ' ' + r[2].replace(',', '') + '</b> tells more about ' + r[0].replace(',', '').toLowerCase() + '.', meta: { k: 'g6-find-clause' } };
  }
  function combine(lv) {
    var c = R.pick(COMBINE);
    return Q.one('Which joins the two sentences correctly?', c[1], c[2].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]),
      prompt: 'Is the noun a person or a thing? Are the commas in the right place?', hint: 'Put the extra idea inside commas, right after the noun.', explain: W.sent(c[1]), meta: { k: 'g6-combine', s: c[0] } });
  }
  function relMatch() {
    var rs = R.shuffle(REL.filter(function (r) { return r[1] !== 'that'; })).filter(function (r, i, a) { return a.findIndex(function (x) { return x[1] === r[1]; }) === i; }).slice(0, 3);
    return { q: 'Match each sentence to the word that fills its gap.', type: 'match', pairs: rs.map(function (r) { return [r[0] + ' ___ ' + r[2] + ' ' + r[3], r[1]]; }),
      hint: 'People: who. Things: which or that. Belonging: whose.', explain: 'The relative word depends on the noun before it.', meta: { k: 'g6-rel-match' } };
  }

  Atlas.register('sentences', {
    lessons: [{
      id: 'clauses', title: 'Main and dependent clauses', sub: 'A complex sentence joins two ideas and shows how they connect.',
      concepts: [
        { slug: 'main', title: 'A main clause can stand alone', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent('Although it was drizzling, we played outside.')),
            step(W.sent('<mark class="hl">we played outside</mark>'), 'Makes sense alone: the <b>main clause</b>.'),
            step(W.sent('<mark class="hl">Although it was drizzling</mark>'), 'Leaves you waiting: a <b>dependent clause</b>.')
          ],
          guided: [function () { return standAlone(1); }, fragment],
          check: [function () { return standAlone(2); }, fragment],
          coach: '<p>Cover one part with a hand and read the other aloud. Ask: "Is that finished, or am I waiting for more?"</p>',
          mistake: '<p>Writing a dependent clause on its own as a sentence: "Because the field was flooded." It needs a main clause.</p>' },
        { slug: 'joining', title: 'Joining words show the connection', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent('The game was cancelled <b>because</b> the field was flooded.'), 'A reason.'),
            step(W.sent('<b>Although</b> it was drizzling, we played outside.'), 'A surprise.'),
            step(W.sent('You cannot go <b>unless</b> you finish your chores.'), 'A condition.'),
            step(W.sent('We waited <b>until</b> the ferry arrived.'), 'A time.')
          ],
          guided: [function () { return joinWord(1); }, function () { return shows(1); }],
          check: [function () { return joinWord(2); }, pickComplex],
          coach: '<p>Give two short sentences and ask the child to join them three ways (because, although, when). Talk about how the meaning shifts.</p>',
          mistake: '<p>Joining everything with "and". It links ideas but does not show how they connect.</p>' }
      ]
    }, {
      id: 'relative', title: 'Relative clauses', sub: 'Add detail about a noun with who, which, that or whose.',
      concepts: [
        { slug: 'who-which', title: 'Who, which, that and whose', exp: ['B3.1'], skill: 'relative',
          model: [
            step(W.sent('The girl <b>who</b> won the race is my cousin.'), 'A person.'),
            step(W.sent('The canoe, <b>which</b> was made of birchbark, floated well.'), 'A thing.'),
            step(W.sent('The boy <b>whose</b> bike was stolen called the police.'), 'Belonging to someone.')
          ],
          guided: [function () { return relWord(1); }, findClause],
          check: [function () { return relWord(2); }, findClause],
          coach: '<p>Point at the noun before the gap and ask: "Person, thing, or belonging?"</p>',
          mistake: '<p>Using "which" for people ("the coach which"). People take "who".</p>' },
        { slug: 'combine', title: 'Combine two sentences into one', exp: ['B3.1'], skill: 'relative',
          model: [
            step(W.sent('My grandmother grew up in Winnipeg. She speaks Ukrainian and English.'), 'Two short sentences.'),
            step(W.sent('My grandmother<mark class="hl">, who grew up in Winnipeg,</mark> speaks Ukrainian and English.'), 'The extra idea goes inside commas, after the noun.')
          ],
          guided: [function () { return combine(1); }, function () { return combine(1); }],
          check: [function () { return combine(2); }, relMatch],
          coach: '<p>Take two sentences from the child’s own writing and combine them with who or which.</p>',
          mistake: '<p>Joining two sentences with only a comma ("She grew up in Winnipeg, she speaks..."). That is a comma splice.</p>' }
      ]
    }],
    practice: [
      { id: 'clauses', name: 'Main and dependent clauses', code: 'B3.1', gen: standAlone },
      { id: 'relative', name: 'Relative clauses', code: 'B3.1', gen: relWord }
    ]
  });

  Q.shapes('sentences', {
    clauses: [[1, 'join-word', joinWord], [1, 'shows', shows], [1, 'fragment', fragment], [2, 'pick', pickComplex]],
    relative: [[1, 'find-clause', findClause], [1, 'combine', combine], [2, 'match', relMatch]]
  });
})();
