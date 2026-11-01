/* Grade 6: complex sentences.
   Ontario 2023 Language, Grade 6:
   B3.1 "use their knowledge of sentence types and forms to construct sentences that communicate ideas effectively, including using and
   creating complex sentences with adjective or relative clauses to express relationships among ideas"
   Main and dependent clauses, joining words that show how ideas connect, and relative (adjective) clauses with who, which, that and whose.
   All sentences are written for this site. Answer checks: tests/verify/grade6-sentences.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [main clause, dependent clause, joining word, what it shows, wrong joining words] */
  var JOIN = [['we played outside', 'it was drizzling', 'Although', 'contrast', ['because', 'unless']], ['the game was cancelled', 'the field was flooded', 'because', 'cause', ['although', 'unless']],
    ['you cannot go to the lake', 'you finish your chores', 'unless', 'condition', ['because', 'although']], ['we waited at the dock', 'the ferry arrived', 'until', 'time', ['unless', 'although']],
    ['the crowd cheered', 'the puck crossed the line', 'when', 'time', ['unless', 'although']], ['Priya kept practising', 'her fingers were sore', 'even though', 'contrast', ['because', 'unless']],
    ['the library closed early', 'the power went out', 'because', 'cause', ['although', 'unless']], ['we will plant the garden', 'the frost is over', 'if', 'condition', ['although', 'until']],
    ['we stayed inside', 'the wind was howling', 'because', 'cause', ['although', 'until']], ['Mila finished the puzzle', 'it had a thousand pieces', 'although', 'contrast', ['because', 'unless']],
    ['the bus will leave', 'everyone is on board', 'when', 'time', ['although', 'unless']], ['we can see the comet', 'the sky is clear', 'if', 'condition', ['although', 'because']],
    ['the river rose quickly', 'the snow melted', 'after', 'time', ['unless', 'although']], ['Jonah wore shorts', 'it was snowing', 'even though', 'contrast', ['because', 'if']],
    ['the puppy will not sleep', 'it hears the radio', 'unless', 'condition', ['although', 'because']], ['the class planted trees', 'the storm knocked so many down', 'because', 'cause', ['although', 'unless']]];
  var SHOWS = { contrast: 'a surprise or contrast', cause: 'a reason', condition: 'a condition (what must happen)', time: 'when it happens' };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function word(j) { return j[2].toLowerCase(); }
  function dep(j) { return cap(word(j)) + ' ' + j[1]; }
  /* the dependent clause first ("Although it was drizzling, we played outside.") or last */
  function whole(j, first) { return first ? dep(j) + ', ' + j[0] + '.' : cap(j[0]) + ' ' + word(j) + ' ' + j[1] + '.'; }
  function either(j) { return whole(j, R.int(0, 1) === 1); }

  /* main and dependent clauses */
  function standAlone(lv) {
    var j = R.pick(JOIN), s = either(j);
    return Q.tiles('Which part could stand alone as a sentence?', cap(j[0]) + '.', [dep(j) + '.'].concat(lv > 1 ? [cap(word(j)) + ' ' + j[0] + '.'] : []), {
      fig: W.sent(s), prompt: 'Read each part on its own. Does it sound finished?', hint: 'A part that starts with ' + word(j) + ' leaves you waiting.',
      explain: '<b>' + cap(j[0]) + '</b> is the main clause. It makes sense alone.', meta: { k: 'g6-stand-alone', s: s } });
  }
  function fragment() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, shown = right ? cap(j[0]) + '.' : dep(j) + '.';
    return { q: 'Is this a complete sentence?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['It makes sense on its own.', 'It leaves you waiting for more.'], answer: right ? 0 : 1 },
      hint: 'Does it start with a joining word like because or although?', explain: right ? 'It is a main clause.' : 'It is a dependent clause. It needs a main clause.', meta: { k: 'g6-fragment', shown: shown } };
  }
  function tapDep() {
    var j = R.pick(JOIN), first = R.int(0, 1) === 1;
    return { q: 'Tap the <b>dependent clause</b>.', fig: W.sent(whole(j, first)), type: 'tap', tiles: first ? [dep(j), j[0]] : [cap(j[0]), word(j) + ' ' + j[1]], answer: first ? 0 : 1,
      hint: 'It starts with the joining word.', explain: '<b>' + dep(j) + '</b> cannot stand alone.', meta: { k: 'g6-tap-dep' } };
  }
  function fixFragment(lv) {
    var j = R.pick(JOIN), o = R.pick(JOIN.filter(function (x) { return x !== j; }));
    return Q.one('This is not a sentence yet. Which one fixes it?', either(j), [dep(j) + '!'].concat(lv > 1 ? [dep(j) + ' and ' + o[1] + '.'] : []), {
      fig: W.sent(dep(j) + '.'), hint: 'It needs a main clause: a part that makes sense alone.', explain: 'Add a main clause: <b>' + j[0] + '</b>.', meta: { k: 'g6-fix-fragment', main: j[0] } });
  }

  /* joining words */
  function joinWord(lv) {
    var j = R.pick(JOIN);
    return Q.one('Which joining word fits best?', word(j), j[4].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(cap(j[0]) + ' ' + W.gap() + ' ' + j[1] + '.'),
      prompt: 'How are the two ideas connected?', hint: 'Is it a reason, a contrast, a condition, or a time?', explain: W.sent(whole(j, false)), meta: { k: 'g6-join-word', main: j[0] } });
  }
  function otherShows(j) { return Object.keys(SHOWS).filter(function (k) { return k !== j[3]; }).map(function (k) { return SHOWS[k]; }); }
  function shows(lv) {
    var j = R.pick(JOIN);
    return Q.one('What does <b>' + word(j) + '</b> show in this sentence?', SHOWS[j[3]], otherShows(j).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(either(j)), prompt: 'How do the two ideas connect?', hint: 'Ask: why? when? what if? or surprisingly?', explain: '<b>' + word(j) + '</b> shows ' + SHOWS[j[3]] + '.', meta: { k: 'g6-shows', word: word(j) } });
  }
  function joinTf() {
    var j = R.pick(JOIN), right = R.int(0, 1) === 1, said = right ? SHOWS[j[3]] : R.pick(otherShows(j));
    return { q: Q.name() + ' says <b>' + word(j) + '</b> shows <b>' + said + '</b> here.', fig: W.sent(either(j)), type: 'tf', answer: right,
      why: { options: ['That is how the two ideas connect.', 'The joining word shows something else.'], answer: right ? 0 : 1 },
      hint: 'Ask: why? when? what if? or surprisingly?', explain: '<b>' + word(j) + '</b> shows ' + SHOWS[j[3]] + '.', meta: { k: 'g6-join-tf', word: word(j), said: said } };
  }
  function pickComplex() {
    var js = R.some(JOIN, 4), right = js.slice(0, 2).map(either), wrong = [cap(js[2][0]) + '.', cap(js[3][0]) + ' and ' + js[3][1] + '.'];
    return Q.all('Pick every <b>complex</b> sentence (a main clause and a dependent clause).', right, wrong, {
      hint: 'Look for a joining word like because, although, unless or when.', explain: 'A complex sentence has a dependent clause that starts with a joining word.', meta: { k: 'g6-pick-complex' } });
  }

  /* ---------- relative clauses: [before, the relative word, the clause, after] ---------- */
  var REL = [['The girl', 'who', 'won the race', 'is my cousin.'], ['The canoe,', 'which', 'was made of birchbark,', 'floated well.'], ['The boy', 'whose', 'bike was stolen', 'called the police.'],
    ['My grandmother,', 'who', 'grew up in Winnipeg,', 'speaks Ukrainian and English.'], ['The trail', 'that', 'leads to the falls', 'is closed today.'], ['The author', 'whose', 'book we read', 'visited our school.'],
    ['The lake,', 'which', 'freezes every December,', 'is perfect for skating.'], ['The students', 'who', 'built the robot', 'won first prize.'], ['The coach', 'who', 'trains our team', 'drives a red truck.'],
    ['The tent', 'that', 'we borrowed', 'has a broken zipper.'], ['The neighbour', 'whose', 'dog barks all night', 'is moving away.'], ['Our school,', 'which', 'opened in 1952,', 'needs a new roof.'],
    ['The pilot', 'who', 'flew us to Whitehorse', 'waved goodbye.'], ['The bridge', 'that', 'crosses the river', 'was built last year.'], ['The artist', 'whose', 'mural covers the wall', 'is from Haida Gwaii.'],
    ['The bannock,', 'which', 'Kokum made this morning,', 'is still warm.']];
  var RELWRONG = { who: ['which', 'whose'], which: ['who', 'whose'], that: ['who', 'whose'], whose: ['who', 'which'] };
  function relSent(r, w) { return r[0] + ' ' + (w || r[1]) + ' ' + r[2] + ' ' + r[3]; }
  function bare(s) { return s.replace(',', ''); }

  function relWord(lv) {
    var r = R.pick(REL);
    return Q.one('Which word fits the gap?', r[1], RELWRONG[r[1]].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(r[0] + ' ' + W.gap() + ' ' + r[2] + ' ' + r[3]),
      prompt: 'A person, a thing, or something that belongs to someone?', hint: 'who: people. which or that: things. whose: belonging to.', explain: W.sent(relSent(r)), meta: { k: 'g6-rel-word', s: relSent(r) } });
  }
  function findClause() {
    var r = R.pick(REL);
    return { q: 'Tap the <b>relative clause</b>. It tells more about a noun.', fig: W.sent(relSent(r)), type: 'tap', tiles: [bare(r[0]), r[1] + ' ' + bare(r[2]), r[3]], answer: 1,
      hint: 'It starts with who, which, that or whose.', explain: '<b>' + r[1] + ' ' + bare(r[2]) + '</b> tells more about ' + bare(r[0]).toLowerCase() + '.', meta: { k: 'g6-find-clause' } };
  }
  function relMatch() {
    var rs = R.shuffle(REL.filter(function (r) { return r[1] !== 'that'; })).filter(function (r, i, a) { return a.findIndex(function (x) { return x[1] === r[1]; }) === i; }).slice(0, 3);
    return { q: 'Match each sentence to the word that fills its gap.', type: 'match', pairs: rs.map(function (r) { return [r[0] + ' ___ ' + r[2] + ' ' + r[3], r[1]]; }),
      hint: 'People: who. Things: which or that. Belonging: whose.', explain: 'The relative word depends on the noun before it.', meta: { k: 'g6-rel-match' } };
  }
  function relTf() {
    var r = R.pick(REL), right = R.int(0, 1) === 1, w = right ? r[1] : R.pick(RELWRONG[r[1]]);
    return { q: 'Is the right word used?', fig: W.sent(r[0] + ' <b>' + w + '</b> ' + r[2] + ' ' + r[3]), type: 'tf', answer: right,
      why: { options: ['It fits the noun before it.', 'The noun before it needs another word.'], answer: right ? 0 : 1 },
      hint: 'Person, thing, or belonging?', explain: W.sent(relSent(r)), meta: { k: 'g6-rel-tf' } };
  }

  /* ---------- combining: [two sentences, the noun, who or which, the extra idea, the rest] ---------- */
  var COMBINE = [['My grandmother grew up in Winnipeg. She speaks Ukrainian and English.', 'My grandmother', 'who', 'grew up in Winnipeg', 'speaks Ukrainian and English'],
    ['The lake freezes every December. It is perfect for skating.', 'The lake', 'which', 'freezes every December', 'is perfect for skating'],
    ['Mr. Okafor coaches our team. He used to play in the NHL.', 'Mr. Okafor', 'who', 'used to play in the NHL', 'coaches our team'],
    ['The museum is in Ottawa. It has a huge canoe collection.', 'The museum', 'which', 'has a huge canoe collection', 'is in Ottawa'],
    ['Ms. Lavoie teaches music. She plays the fiddle.', 'Ms. Lavoie', 'who', 'plays the fiddle', 'teaches music'],
    ['The ferry crosses to Toronto Island. It leaves every hour.', 'The ferry', 'which', 'leaves every hour', 'crosses to Toronto Island'],
    ['Our neighbour shovels our driveway. He is eighty years old.', 'Our neighbour', 'who', 'is eighty years old', 'shovels our driveway'],
    ['The trail is steep. It leads to a lookout.', 'The trail', 'which', 'leads to a lookout', 'is steep'],
    ['Elder Joseph told us a story. He grew up on Manitoulin Island.', 'Elder Joseph', 'who', 'grew up on Manitoulin Island', 'told us a story'],
    ['The library opens at nine. It has a 3D printer.', 'The library', 'which', 'has a 3D printer', 'opens at nine']];
  function joined(c, w) { return c[1] + ', ' + (w || c[2]) + ' ' + c[3] + ', ' + c[4] + '.'; }
  function swapped(c) { return joined(c, c[2] === 'who' ? 'which' : 'who'); }
  function splice(c) { return c[0].replace(/\. (\w)/, function (x, a) { return ', ' + a.toLowerCase(); }); }
  function misplaced(c) { return c[1] + ' ' + c[4] + ', ' + c[2] + ' ' + c[3] + '.'; }

  function combine(lv) {
    var c = R.pick(COMBINE);
    return Q.one('Which joins the two sentences correctly?', joined(c), [swapped(c)].concat(lv > 1 ? [splice(c)] : []).concat(lv > 2 ? [misplaced(c)] : []), { fig: W.sent(c[0]),
      prompt: 'Is the noun a person or a thing? Are the commas in the right place?', hint: 'Put the extra idea inside commas, right after the noun.', explain: W.sent(joined(c)), meta: { k: 'g6-combine', s: c[0] } });
  }
  function combineTf() {
    var c = R.pick(COMBINE), right = R.int(0, 1) === 1, shown = right ? joined(c) : R.pick([swapped(c), splice(c), misplaced(c)]);
    return { q: Q.name() + ' joined two sentences. Is it correct?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Right word, and the extra idea sits inside commas after the noun.', 'The word, the commas or the place is wrong.'], answer: right ? 0 : 1 },
      hint: 'Check the word, the commas and the place.', explain: W.sent(joined(c)), meta: { k: 'g6-combine-tf' } };
  }
  function combineOrder() {
    var c = R.pick(COMBINE);
    return { q: 'Build one sentence from the two.', fig: W.sent(c[0]), type: 'order', items: [c[1], c[2] + ' ' + c[3], c[4] + '.'], first: 'First', last: 'Last',
      hint: 'The extra idea goes right after the noun.', explain: W.sent(joined(c)), meta: { k: 'g6-combine-order' } };
  }
  function fixSplice(lv) {
    var c = R.pick(COMBINE);
    return Q.one('This is a comma splice. Which one fixes it?', joined(c), [swapped(c)].concat(lv > 1 ? [misplaced(c)] : []), { fig: W.sent(splice(c)),
      hint: 'Turn the second idea into a who or which clause.', explain: W.sent(joined(c)), meta: { k: 'g6-fix-splice' } });
  }

  Atlas.register('sentences', {
    full: true,
    lessons: [{
      id: 'clauses', title: 'Main and dependent clauses', sub: 'A complex sentence joins two ideas and shows how they connect.',
      concepts: [
        { slug: 'main', title: 'A main clause can stand alone', exp: ['B3.1'], skill: 'clauses',
          model: [
            step(W.sent('Although it was drizzling, we played outside.')),
            step(W.sent('<mark class="hl">we played outside</mark>'), 'Makes sense alone: the <b>main clause</b>.'),
            step(W.sent('<mark class="hl">Although it was drizzling</mark>'), 'Leaves you waiting: a <b>dependent clause</b>.'),
            step(W.sent('The river rose quickly after the snow melted.')),
            step(W.sent('<mark class="hl">The river rose quickly</mark> after the snow melted.'), 'Main clause first this time.'),
            step(W.sent('After the snow melted.'), 'On its own, it is not a sentence.')
          ],
          guided: [function () { return standAlone(1); }, fragment, tapDep],
          check: [function () { return standAlone(2); }, fragment, function () { return fixFragment(2); }, tapDep, function () { return standAlone(2); }],
          coach: '<p>Cover one part with a hand and read the other aloud. Ask: "Is that finished, or am I waiting for more?"</p>',
          mistake: '<p>Writing a dependent clause on its own as a sentence: "Because the field was flooded." It needs a main clause.</p>' },
        { slug: 'joining', title: 'Joining words show the connection', exp: ['B3.1'], skill: 'joining',
          model: [
            step(W.sent('The game was cancelled <b>because</b> the field was flooded.'), 'A reason.'),
            step(W.sent('<b>Although</b> it was drizzling, we played outside.'), 'A surprise.'),
            step(W.sent('You cannot go <b>unless</b> you finish your chores.'), 'A condition.'),
            step(W.sent('We waited <b>until</b> the ferry arrived.'), 'A time.'),
            step(W.chain(['why?', 'surprisingly', 'what if?', 'when?'], ['because', 'although', 'unless', 'until']), 'Ask the question the word answers.')
          ],
          guided: [function () { return joinWord(1); }, function () { return shows(1); }, joinTf],
          check: [function () { return joinWord(2); }, pickComplex, function () { return shows(2); }, joinTf, function () { return joinWord(2); }],
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
            step(W.sent('The trail <b>that</b> leads to the falls is closed today.'), 'A thing, no commas.'),
            step(W.sent('The boy <b>whose</b> bike was stolen called the police.'), 'Belonging to someone.')
          ],
          guided: [function () { return relWord(1); }, findClause, relTf],
          check: [function () { return relWord(2); }, findClause, relTf, relMatch, function () { return relWord(2); }],
          coach: '<p>Point at the noun before the gap and ask: "Person, thing, or belonging?"</p>',
          mistake: '<p>Using "which" for people ("the coach which"). People take "who".</p>' },
        { slug: 'combine', title: 'Combine two sentences into one', exp: ['B3.1'], skill: 'combine',
          model: [
            step(W.sent('My grandmother grew up in Winnipeg. She speaks Ukrainian and English.'), 'Two short sentences.'),
            step(W.sent('My grandmother<mark class="hl">, who grew up in Winnipeg,</mark> speaks Ukrainian and English.'), 'The extra idea goes inside commas, after the noun.'),
            step(W.sent('The lake freezes every December. It is perfect for skating.'), 'A thing this time.'),
            step(W.sent('The lake<mark class="hl">, which freezes every December,</mark> is perfect for skating.'), 'Things take which.')
          ],
          guided: [function () { return combine(1); }, combineOrder, combineTf],
          check: [function () { return combine(2); }, function () { return fixSplice(2); }, combineTf, combineOrder, function () { return combine(3); }],
          coach: '<p>Take two sentences from the child’s own writing and combine them with who or which.</p>',
          mistake: '<p>Joining two sentences with only a comma ("She grew up in Winnipeg, she speaks..."). That is a comma splice.</p>' }
      ]
    }],
    practice: [
      { id: 'clauses', name: 'Main and dependent clauses', code: 'B3.1', gen: standAlone },
      { id: 'joining', name: 'Joining words', code: 'B3.1', gen: joinWord },
      { id: 'relative', name: 'Who, which, that and whose', code: 'B3.1', gen: relWord },
      { id: 'combine', name: 'Combining sentences', code: 'B3.1', gen: combine }
    ]
  });

  Q.shapes('sentences', {
    clauses: [[1, 'fragment', fragment], [1, 'tap-dependent', tapDep], [2, 'fix-fragment', fixFragment]],
    joining: [[1, 'shows', shows], [1, 'true-false', joinTf], [2, 'pick', pickComplex]],
    relative: [[1, 'find-clause', findClause], [1, 'true-false', relTf], [2, 'match', relMatch]],
    combine: [[1, 'true-false', combineTf], [1, 'order', combineOrder], [2, 'fix-splice', fixSplice]]
  });
})();
