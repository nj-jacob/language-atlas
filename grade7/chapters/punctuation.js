/* Grade 7: punctuation. Semicolons between independent clauses, commas with conjunctive adverbs, colons before a quotation, dashes and ellipses.
   Ontario 2023 Language, Grade 7, B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate meaning clearly and coherently,
   including the use of colons to introduce a quotation after a complete sentence, semicolons to separate two independent clauses, commas to set off conjunctive adverbs,
   and ellipses or dashes to indicate an omission, a pause, or a break".
   All sentences are written for this site. Answer checks: tests/verify/grade7-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, OQ = '“', CQ = '”', DASH = '—', DOTS = '…';
  function lowFirst(s) { return s.charAt(0).toLowerCase() + s.slice(1); }
  /* lower-case a sentence start when it moves later in a sentence; names keep their capital */
  function low(s) { return /^(The|Our|My|His|Her|A|We|It|Nobody) /.test(s) ? lowFirst(s) : s; }

  /* ---------- semicolons: two independent clauses ---------- */
  var SEMI = [['The rain stopped', 'the game went on'], ['Kai studied all weekend', 'his hard work paid off'], ['The museum was closed', 'we visited the park instead'],
    ['Mei loves to paint', 'her brother prefers music'], ['The ferry was late', 'nobody minded the wait'], ['The lake froze early', 'the rinks opened in November'],
    ['The power went out', 'we read by candlelight'], ['Amir trained every morning', 'he won the race'], ['The snow was deep', 'the plough could not get through'],
    ['Our class raised four hundred dollars', 'the shelter bought new blankets'], ['The moose stood still', 'nobody dared to move'], ['Zoe forgot her lunch', 'her friend shared a sandwich']];
  function semiRight(s) { return s[0] + '; ' + s[1] + '.'; }
  function semiWrong(s) { return [s[0] + '; and ' + s[1] + '.', 'Because ' + low(s[0]) + '; ' + s[1] + '.', s[0] + ', ' + s[1] + '.']; }
  function semicolon(lv) {
    var s = R.pick(SEMI);
    return Q.one('Which sentence uses the semicolon correctly?', semiRight(s), R.some(semiWrong(s), lv > 1 ? 3 : 2), { prompt: 'Could each side stand alone as a sentence?',
      hint: 'A semicolon needs a complete sentence on each side, with no and, but or so.', explain: W.sent(semiRight(s)), meta: { k: 'g7-semicolon', a: s[0] } });
  }
  function semiTf() {
    var s = R.pick(SEMI), right = R.int(0, 1) === 1, shown = right ? semiRight(s) : R.pick(semiWrong(s));
    return { q: 'Is the punctuation correct?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Both sides of the semicolon are complete sentences.', 'One side is not a complete sentence, or the join is wrong.'], answer: right ? 0 : 1 },
      hint: 'Cover each side. Is it a full sentence on its own?', explain: W.sent(semiRight(s)), meta: { k: 'g7-semi-tf', shown: shown } };
  }
  function semiPick() {
    var two = R.some(SEMI, 4), right = [semiRight(two[0]), semiRight(two[1])], wrong = [R.pick(semiWrong(two[2])), R.pick(semiWrong(two[3]))];
    return Q.all('Pick every sentence that uses the semicolon correctly.', right, wrong, { hint: 'Each side must be a complete sentence, with no joining word after the semicolon.',
      explain: right.join(' '), meta: { k: 'g7-semi-pick' } });
  }
  function semiMark() {
    var s = R.pick(SEMI);
    return Q.tiles('Which mark joins these two sentences?', ';', [',', ':'], { fig: W.sent(s[0] + W.gap() + ' ' + s[1] + '.'), hint: 'A comma alone cannot join two sentences.', explain: W.sent(semiRight(s)), meta: { k: 'g7-semi-mark', a: s[0] } });
  }

  /* ---------- conjunctive adverbs: [clause, clause, adverb] ---------- */
  var ADVS = { however: 'contrast', therefore: 'result', meanwhile: 'at the same time', furthermore: 'adding more', instead: 'a different choice' };
  var CONJ = [['The trail was closed', 'the lookout was open', 'however'], ['The test was hard', 'most of the class passed', 'however'], ['The bus broke down', 'we were late for school', 'therefore'],
    ['The river rose quickly', 'the town built sandbag walls', 'therefore'], ['Leila set up the tent', 'Omar started the fire', 'meanwhile'], ['The plan is cheap', 'it is easy to build', 'furthermore'],
    ['We could not find the map', 'we used the compass', 'instead'], ['The ice was thin', 'we stayed off the lake', 'therefore'], ['Ravi practised the piano', 'his sister did her homework', 'meanwhile'],
    ['The garden needs water', 'it needs more sun', 'furthermore'], ['We did not take the bus', 'we rode our bikes', 'instead'], ['The movie was long', 'nobody wanted it to end', 'however'],
    ['The bridge was icy', 'the town closed it', 'therefore'], ['The band set up the stage', 'the crowd lined up outside', 'meanwhile']];
  function conjWrong(c) { return [c[0] + ', ' + c[2] + ' ' + c[1] + '.', c[0] + '; ' + c[2] + ' ' + c[1] + '.', c[0] + ' ' + c[2] + ', ' + c[1] + '.']; }
  function conjRight(c) { return c[0] + '; ' + c[2] + ', ' + c[1] + '.'; }
  function conjPunct(lv) {
    var c = R.pick(CONJ), wrong = conjWrong(c);
    return Q.one('Which sentence is punctuated correctly?', conjRight(c), R.some(wrong, lv > 1 ? 3 : 2), { prompt: 'Look before and after <b>' + c[2] + '</b>.',
      hint: 'Semicolon before the linking adverb, comma after it.', explain: W.sent(conjRight(c)), meta: { k: 'g7-conj-punct', a: c[0] } });
  }
  function conjWord(lv) {
    var c = R.pick(CONJ);
    return Q.tiles('Which linking adverb fits?', c[2], R.some(Object.keys(ADVS).filter(function (a) { return ADVS[a] !== ADVS[c[2]]; }), lv > 1 ? 3 : 2), {
      fig: W.sent(c[0] + '; ' + W.gap() + ', ' + c[1] + '.'), prompt: 'Is the second idea a contrast, a result, at the same time, more, or a different choice?',
      hint: 'however: contrast. therefore: result. meanwhile: same time. furthermore: more. instead: a different choice.', explain: W.sent(conjRight(c)), meta: { k: 'g7-conj-word', a: c[0] } });
  }
  function conjTf() {
    var c = R.pick(CONJ), right = R.int(0, 1) === 1, shown = right ? conjRight(c) : R.pick(conjWrong(c));
    return { q: 'Is the punctuation correct?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Semicolon before the linking adverb, comma after it.', 'The semicolon or the comma is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Look on both sides of <b>' + c[2] + '</b>.', explain: W.sent(conjRight(c)), meta: { k: 'g7-conj-tf', shown: shown } };
  }
  function conjMatch(lv) {
    var as = R.some(Object.keys(ADVS), lv > 2 ? 4 : 3);
    return { q: 'Match each linking adverb to what it shows.', type: 'match', pairs: as.map(function (a) { return [a, ADVS[a]]; }), hint: 'Try each one between two sentences.', explain: 'Linking adverbs show how two ideas connect.', meta: { k: 'g7-conj-match' } };
  }

  /* ---------- colons before a quotation: [a complete sentence, the same start without a complete thought, the quotation] ---------- */
  var COLON = [['The coach gave us one rule', 'The coach said', 'Never quit on a play.'], ['My grandmother always says the same thing', 'My grandmother always says', 'Kindness costs nothing.'],
    ['The sign at the trailhead was clear', 'The sign at the trailhead read', 'Stay on the marked path.'], ['Our principal ended with a challenge', 'Our principal told us', 'Leave this school better than you found it.'],
    ['The poster had a simple message', 'The poster said', 'Every voice matters.'], ['The elder shared a teaching', 'The elder said', 'Take only what you need.'],
    ['The note on the fridge was short', 'The note on the fridge said', 'Back by six.'], ['My coach repeats one line', 'My coach always tells us', 'Practise like you play.'],
    ['The sign on the door was a warning', 'The sign on the door read', 'Wet paint.'], ['Dad gave me one piece of advice', 'Dad told me', 'Start early.']];
  function colonRight(c) { return c[0] + ': ' + OQ + c[2] + CQ; }
  function colonQuote(lv) {
    var c = R.pick(COLON), wrong = [c[1] + ': ' + OQ + c[2] + CQ, c[0] + ': ' + OQ + lowFirst(c[2]) + CQ, c[0] + '; ' + OQ + c[2] + CQ];
    return Q.one('Which sentence uses the colon correctly?', colonRight(c), R.some(wrong, lv > 1 ? 3 : 2), { prompt: 'Is there a complete sentence before the colon?',
      hint: 'Before the colon: a complete sentence. After it: the quotation, starting with a capital.', explain: W.sent(colonRight(c)), meta: { k: 'g7-colon-quote', q: c[2] } });
  }
  function colonWhen() {
    var c = R.pick(COLON), full = R.int(0, 1) === 1, start = full ? c[0] : c[1];
    return { q: 'Can a colon go after these words, before the quotation?', fig: W.sent(start + W.gap() + ' ' + OQ + c[2] + CQ), type: 'tap', tiles: ['Yes: it is a complete sentence.', 'No: use a comma, it is not complete.'], answer: full ? 0 : 1,
      hint: 'Read the words before the gap. Is it a full sentence?', explain: full ? W.sent(colonRight(c)) : W.sent(c[1] + ', ' + OQ + c[2] + CQ), meta: { k: 'g7-colon-when', start: start } };
  }

  function colonTf() {
    var c = R.pick(COLON), right = R.int(0, 1) === 1, shown = right ? colonRight(c) : c[1] + ': ' + OQ + c[2] + CQ;
    return { q: 'Is the colon used correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['A complete sentence comes before the colon.', 'The words before the colon are not a complete sentence.'], answer: right ? 0 : 1 },
      hint: 'Cover the quotation. Is the rest a full sentence?', explain: right ? W.sent(shown) : W.sent(c[1] + ', ' + OQ + c[2] + CQ), meta: { k: 'g7-colon-tf', shown: shown } };
  }
  function colonPick() {
    var cs = R.some(COLON, 4), right = cs.slice(0, 2).map(function (c) { return c[0]; }), wrong = cs.slice(2).map(function (c) { return c[1]; });
    return Q.all('Which openings could take a colon before a quotation? Pick every one.', right, wrong, { hint: 'Only complete sentences can come before the colon.',
      explain: 'Complete sentences: ' + right.join('; ') + '.', meta: { k: 'g7-colon-pick' } });
  }

  /* ---------- dashes and ellipses: [sentence, the mark, what it shows] ---------- */
  var JOBS = { omit: 'words left out of a quotation', pause: 'a pause or hesitation', brk: 'a sudden break in thought', aside: 'an added comment' };
  var MARKS = [['The report said the water ' + DOTS + ' is safe for swimming.', DOTS, 'omit'], ['The guide called the trail ' + OQ + 'steep ' + DOTS + ' but worth it.' + CQ, DOTS, 'omit'],
    ['Well' + DOTS + ' I am not sure.', DOTS, 'pause'], ['We could go now' + DOTS + ' or we could wait.', DOTS, 'pause'],
    ['I was going to tell you' + DASH + 'wait, is that our bus?', DASH, 'brk'], ['I opened the door and' + DASH + 'nothing.', DASH, 'brk'],
    ['My cousin' + DASH + 'the one from Iqaluit' + DASH + 'is visiting.', DASH, 'aside'], ['Three things' + DASH + 'a map, a whistle and water' + DASH + 'go in every pack.', DASH, 'aside'],
    ['The answer is' + DASH + 'no, let me check again.', DASH, 'brk'], ['We reached the top and' + DASH + 'what a view!', DASH, 'brk'],
    ['The ferry' + DASH + 'the last one of the day' + DASH + 'was full.', DASH, 'aside'], ['Ms. Patel' + DASH + 'our coach for six years' + DASH + 'is retiring.', DASH, 'aside'],
    ['The mayor said the new park ' + DOTS + ' will open in June.', DOTS, 'omit'], ['The sign read, ' + OQ + 'Visitors must ' + DOTS + ' stay on the boardwalk.' + CQ, DOTS, 'omit'],
    ['Um' + DOTS + ' can I go next?', DOTS, 'pause'], ['The lights flickered' + DOTS + ' then the hall went dark.', DOTS, 'pause']];
  var DASHES = MARKS.filter(function (m) { return m[1] === DASH; }), DOTTED = MARKS.filter(function (m) { return m[1] === DOTS; });
  function markJob(lv, list) {
    var m = R.pick(list || MARKS), i = m[0].indexOf(m[1]);
    return Q.one('What does the <b>' + (m[1] === DASH ? 'dash' : 'ellipsis') + '</b> show here?', JOBS[m[2]], R.some(Object.keys(JOBS).filter(function (j) { return j !== m[2]; }), lv > 1 ? 3 : 2).map(function (j) { return JOBS[j]; }), {
      fig: W.sent(W.hl(m[0], i, i + 1)), hint: 'A dash breaks in or adds a comment. An ellipsis pauses or leaves words out.', explain: '<b>' + m[1] + '</b>: ' + JOBS[m[2]] + '.', meta: { k: 'g7-mark-job', s: m[0] } });
  }
  function whichMark(lv, list) {
    var m = R.pick(list || MARKS), i = m[0].indexOf(m[1]), gap = m[0].slice(0, i) + W.gap() + m[0].slice(i + 1).replace(DASH, W.gap());
    return Q.tiles('Which mark fits? It shows <b>' + JOBS[m[2]] + '</b>.', m[1], [m[1] === DASH ? DOTS : DASH, ';'], { fig: W.sent(gap),
      hint: 'Dash: a break or an added comment. Ellipsis: a pause or missing words.', explain: W.sent(m[0]), meta: { k: 'g7-which-mark', s: m[0] } });
  }
  function jobMatch(lv) {
    var js = R.some(Object.keys(JOBS), lv > 2 ? 4 : 3), list = js.map(function (j) { return R.pick(MARKS.filter(function (m) { return m[2] === j; })); });
    return { q: 'Match each sentence to what its mark shows.', type: 'match', pairs: list.map(function (m) { return [m[0], JOBS[m[2]]]; }), hint: 'Look at the dash or the dots in each.', explain: 'Dashes break or add; ellipses pause or leave out.', meta: { k: 'g7-job-match' } };
  }

  function markTf(lv, list) {
    var m = R.pick(list || MARKS), right = R.int(0, 1) === 1, said = right ? m[2] : R.pick(Object.keys(JOBS).filter(function (j) { return j !== m[2]; }));
    return { q: Q.name() + ' says the ' + (m[1] === DASH ? 'dash' : 'ellipsis') + ' shows <b>' + JOBS[said] + '</b>.', fig: W.sent(m[0]), type: 'tf', answer: right,
      why: { options: ['That is what the ' + (m[1] === DASH ? 'dash' : 'ellipsis') + ' does here.', 'It does something else here.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud. What does the mark do to your voice or to the words?', explain: '<b>' + m[1] + '</b>: ' + JOBS[m[2]] + '.', meta: { k: 'g7-mark-tf', s: m[0], said: JOBS[said] } };
  }

  function dashes(f) { return function (lv) { return f(lv, DASHES); }; }
  function dotted(f) { return function (lv) { return f(lv, DOTTED); }; }

  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'semicolons', title: 'Semicolons and linking adverbs', sub: 'Joining two complete sentences.',
      concepts: [
        { slug: 'semicolon', title: 'A semicolon joins two complete sentences', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.sent('The rain stopped.') + W.sent('The game went on.'), 'Two sentences, closely linked.'),
            step(W.sent('The rain stopped<mark class="hl">;</mark> the game went on.'), 'No capital after it.'),
            step(W.sent('The rain stopped; <s>and</s> the game went on.'), 'No and, but or so after it.'),
            step(W.sent('<s>Because</s> the snow was deep; the plough could not get through.'), '"Because the snow was deep" cannot stand alone.'),
            step(W.sent('The snow was deep<mark class="hl">;</mark> the plough could not get through.'), 'Both sides complete.')
          ],
          guided: [function () { return semicolon(1); }, semiMark, semiTf],
          check: [function () { return semicolon(2); }, semiTf, semiPick, semiMark, function () { return semicolon(3); }],
          coach: '<p>Test each side: cover one half and read the other aloud. If both make sense alone, the semicolon fits.</p>',
          mistake: '<p>Using a semicolon where a comma belongs, for example after "Because...". The side before it must be complete.</p>' },
        { slug: 'linking', title: 'Linking adverbs show how ideas connect', exp: ['B3.3'], skill: 'linking',
          model: [
            step(W.tile('however'), 'Contrast.'),
            step(W.tile('therefore'), 'Result.'),
            step(W.tile('meanwhile'), 'At the same time.'),
            step(W.sent('The trail was closed<mark class="hl">;</mark> however<mark class="hl">,</mark> the lookout was open.'), 'Semicolon before, comma after.'),
            step(W.sent('The ice was thin<mark class="hl">;</mark> therefore<mark class="hl">,</mark> we stayed off the lake.'), 'Same marks, a result this time.')
          ],
          guided: [function () { return conjWord(1); }, function () { return conjPunct(1); }, conjTf],
          check: [function () { return conjPunct(2); }, function () { return conjWord(2); }, conjTf, function () { return conjMatch(2); }, function () { return conjPunct(3); }],
          coach: '<p>Say the sentence with a pause after the adverb ("however, ..."). That pause is the comma.</p>',
          mistake: '<p>Joining two sentences with only a comma before however. That makes a run-on; use a semicolon or a full stop.</p>' }
      ]
    }, {
      id: 'quotes-pauses', title: 'Colons, dashes and ellipses', sub: 'Introduce a quotation, break in, or pause.',
      concepts: [
        { slug: 'colon', title: 'A colon can introduce a quotation', exp: ['B3.3'], skill: 'colons',
          model: [
            step(W.sent('The coach gave us one rule<mark class="hl">:</mark> ' + OQ + 'Never quit on a play.' + CQ), 'A complete sentence comes first.'),
            step(W.sent('The coach said, ' + OQ + 'Never quit on a play.' + CQ), 'Not complete? Use a comma.'),
            step(W.sent('rule: ' + OQ + '<mark class="hl">N</mark>ever quit' + CQ), 'The quotation starts with a capital.'),
            step(W.sent('The elder shared a teaching<mark class="hl">:</mark> ' + OQ + 'Take only what you need.' + CQ), 'Complete sentence, colon, capital.')
          ],
          guided: [colonWhen, function () { return colonQuote(1); }, colonTf],
          check: [colonWhen, function () { return colonQuote(2); }, colonTf, colonPick, function () { return colonQuote(3); }],
          coach: '<p>Cover everything after the colon. If what is left is a full sentence, the colon works.</p>',
          mistake: '<p>A colon after "said" or "says". Those words do not finish a sentence, so use a comma.</p>' },
        { slug: 'dash', title: 'A dash shows a break', exp: ['B3.3'], skill: 'dashes',
          model: [
            step(W.sent('I was going to tell you<mark class="hl">' + DASH + '</mark>wait, is that our bus?'), 'A sudden change of thought.'),
            step(W.sent('We reached the top and<mark class="hl">' + DASH + '</mark>what a view!'), 'The thought breaks off.'),
            step(W.sent('My cousin<mark class="hl">' + DASH + '</mark>the one from Iqaluit<mark class="hl">' + DASH + '</mark>is visiting.'), 'An added comment, in a pair of dashes.'),
            step(W.sent('The ferry<mark class="hl">' + DASH + '</mark>the last one of the day<mark class="hl">' + DASH + '</mark>was full.'), 'Take the comment out: the sentence still works.')
          ],
          guided: [dashes(markJob), dashes(whichMark), dashes(markTf)],
          check: [function () { return markJob(2, DASHES); }, function () { return whichMark(2, DASHES); }, dashes(markTf), jobMatch, function () { return markJob(3, DASHES); }],
          coach: '<p>Use dashes for effect, not everywhere. One or two in a piece of writing is plenty.</p>',
          mistake: '<p>Using a short hyphen (-) for a dash. A dash is longer and joins thoughts, not words.</p>' },
        { slug: 'ellipsis', title: 'An ellipsis shows a pause or missing words', exp: ['B3.3'], skill: 'ellipses',
          model: [
            step(W.sent('Well<mark class="hl">' + DOTS + '</mark> I am not sure.'), 'A pause.'),
            step(W.sent('Um<mark class="hl">' + DOTS + '</mark> can I go next?'), 'Hesitation.'),
            step(W.sent('The report said the water is, in most places and at most times, safe.'), 'A long quotation.'),
            step(W.sent('The report said the water <mark class="hl">' + DOTS + '</mark> is safe.'), 'Some words left out.')
          ],
          guided: [dotted(markJob), dotted(whichMark), dotted(markTf)],
          check: [function () { return whichMark(2, DOTTED); }, function () { return markJob(2, DOTTED); }, dotted(markTf), jobMatch, function () { return markJob(3, DOTTED); }],
          coach: '<p>When leaving words out of a quotation, check that the meaning has not changed. That is a fairness rule, not just a punctuation rule.</p>',
          mistake: '<p>Using four, five or more dots. An ellipsis is three dots.</p>' }
      ]
    }],
    practice: [
      { id: 'semicolons', name: 'Semicolons', code: 'B3.3', gen: semicolon },
      { id: 'linking', name: 'Linking adverbs', code: 'B3.3', gen: conjPunct },
      { id: 'colons', name: 'Colons before a quotation', code: 'B3.3', gen: colonQuote },
      { id: 'dashes', name: 'Dashes', code: 'B3.3', gen: dashes(markJob) },
      { id: 'ellipses', name: 'Ellipses', code: 'B3.3', gen: dotted(markJob) }
    ]
  });

  Q.shapes('punctuation', {
    semicolons: [[1, 'mark', semiMark], [1, 'true-false', semiTf], [2, 'pick', semiPick]],
    linking: [[1, 'linking-word', conjWord], [1, 'true-false', conjTf], [2, 'match', conjMatch]],
    colons: [[1, 'when', colonWhen], [1, 'true-false', colonTf], [2, 'pick', colonPick]],
    dashes: [[1, 'which-mark', dashes(whichMark)], [1, 'true-false', dashes(markTf)], [2, 'match', jobMatch]],
    ellipses: [[1, 'which-mark', dotted(whichMark)], [1, 'true-false', dotted(markTf)], [2, 'match', jobMatch]]
  });
})();
