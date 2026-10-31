/* Grade 7: punctuation. Semicolons between independent clauses, commas with conjunctive adverbs, colons before a quotation, dashes and ellipses.
   Ontario 2023 Language, Grade 7, B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate meaning clearly and coherently,
   including the use of colons to introduce a quotation after a complete sentence, semicolons to separate two independent clauses, commas to set off conjunctive adverbs,
   and ellipses or dashes to indicate an omission, a pause, or a break".
   All sentences are written for this site. Answer checks: tests/verify/grade7-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, OQ = '“', CQ = '”', DASH = '—', DOTS = '…';
  function low(s) { return s.charAt(0).toLowerCase() + s.slice(1); }

  /* ---------- semicolons: two independent clauses ---------- */
  var SEMI = [['The rain stopped', 'the game went on'], ['Kai studied all weekend', 'his hard work paid off'], ['The museum was closed', 'we visited the park instead'],
    ['Mei loves to paint', 'her brother prefers music'], ['The ferry was late', 'nobody minded the wait'], ['The lake froze early', 'the rinks opened in November']];
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
  function semiMark() {
    var s = R.pick(SEMI);
    return Q.tiles('Which mark joins these two sentences?', ';', [',', ':'], { fig: W.sent(s[0] + W.gap() + ' ' + s[1] + '.'), hint: 'A comma alone cannot join two sentences.', explain: W.sent(semiRight(s)), meta: { k: 'g7-semi-mark', a: s[0] } });
  }

  /* ---------- conjunctive adverbs: [clause, clause, adverb] ---------- */
  var ADVS = { however: 'contrast', therefore: 'result', meanwhile: 'at the same time', furthermore: 'adding more', instead: 'a different choice' };
  var CONJ = [['The trail was closed', 'the lookout was open', 'however'], ['The test was hard', 'most of the class passed', 'however'], ['The bus broke down', 'we were late for school', 'therefore'],
    ['The river rose quickly', 'the town built sandbag walls', 'therefore'], ['Leila set up the tent', 'Omar started the fire', 'meanwhile'], ['The plan is cheap', 'it is easy to build', 'furthermore'],
    ['We could not find the map', 'we used the compass', 'instead']];
  function conjRight(c) { return c[0] + '; ' + c[2] + ', ' + c[1] + '.'; }
  function conjPunct(lv) {
    var c = R.pick(CONJ), wrong = [c[0] + ', ' + c[2] + ' ' + c[1] + '.', c[0] + '; ' + c[2] + ' ' + c[1] + '.', c[0] + ' ' + c[2] + ', ' + c[1] + '.'];
    return Q.one('Which sentence is punctuated correctly?', conjRight(c), R.some(wrong, lv > 1 ? 3 : 2), { prompt: 'Look before and after <b>' + c[2] + '</b>.',
      hint: 'Semicolon before the linking adverb, comma after it.', explain: W.sent(conjRight(c)), meta: { k: 'g7-conj-punct', a: c[0] } });
  }
  function conjWord(lv) {
    var c = R.pick(CONJ);
    return Q.tiles('Which linking adverb fits?', c[2], R.some(Object.keys(ADVS).filter(function (a) { return ADVS[a] !== ADVS[c[2]]; }), lv > 1 ? 3 : 2), {
      fig: W.sent(c[0] + '; ' + W.gap() + ', ' + c[1] + '.'), prompt: 'Is the second idea a contrast, a result, at the same time, more, or a different choice?',
      hint: 'however: contrast. therefore: result. meanwhile: same time. furthermore: more. instead: a different choice.', explain: W.sent(conjRight(c)), meta: { k: 'g7-conj-word', a: c[0] } });
  }
  function conjMatch() {
    var as = R.some(Object.keys(ADVS), 3);
    return { q: 'Match each linking adverb to what it shows.', type: 'match', pairs: as.map(function (a) { return [a, ADVS[a]]; }), hint: 'Try each one between two sentences.', explain: 'Linking adverbs show how two ideas connect.', meta: { k: 'g7-conj-match' } };
  }

  /* ---------- colons before a quotation: [a complete sentence, the same start without a complete thought, the quotation] ---------- */
  var COLON = [['The coach gave us one rule', 'The coach said', 'Never quit on a play.'], ['My grandmother always says the same thing', 'My grandmother always says', 'Kindness costs nothing.'],
    ['The sign at the trailhead was clear', 'The sign at the trailhead read', 'Stay on the marked path.'], ['Our principal ended with a challenge', 'Our principal told us', 'Leave this school better than you found it.'],
    ['The poster had a simple message', 'The poster said', 'Every voice matters.']];
  function colonRight(c) { return c[0] + ': ' + OQ + c[2] + CQ; }
  function colonQuote(lv) {
    var c = R.pick(COLON), wrong = [c[1] + ': ' + OQ + c[2] + CQ, c[0] + ': ' + OQ + low(c[2]) + CQ, c[0] + '; ' + OQ + c[2] + CQ];
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
    ['My cousin' + DASH + 'the one from Iqaluit' + DASH + 'is visiting.', DASH, 'aside'], ['Three things' + DASH + 'a map, a whistle and water' + DASH + 'go in every pack.', DASH, 'aside']];
  function markJob(lv) {
    var m = R.pick(MARKS), i = m[0].indexOf(m[1]);
    return Q.one('What does the <b>' + (m[1] === DASH ? 'dash' : 'ellipsis') + '</b> show here?', JOBS[m[2]], R.some(Object.keys(JOBS).filter(function (j) { return j !== m[2]; }), lv > 1 ? 3 : 2).map(function (j) { return JOBS[j]; }), {
      fig: W.sent(W.hl(m[0], i, i + 1)), hint: 'A dash breaks in or adds a comment. An ellipsis pauses or leaves words out.', explain: '<b>' + m[1] + '</b>: ' + JOBS[m[2]] + '.', meta: { k: 'g7-mark-job', s: m[0] } });
  }
  function whichMark(lv) {
    var m = R.pick(MARKS), i = m[0].indexOf(m[1]), gap = m[0].slice(0, i) + W.gap() + m[0].slice(i + 1).replace(DASH, W.gap());
    return Q.tiles('Which mark fits? It shows <b>' + JOBS[m[2]] + '</b>.', m[1], [m[1] === DASH ? DOTS : DASH, ';'], { fig: W.sent(gap),
      hint: 'Dash: a break or an added comment. Ellipsis: a pause or missing words.', explain: W.sent(m[0]), meta: { k: 'g7-which-mark', s: m[0] } });
  }
  function jobMatch() {
    var js = R.some(Object.keys(JOBS), 3), list = js.map(function (j) { return R.pick(MARKS.filter(function (m) { return m[2] === j; })); });
    return { q: 'Match each sentence to what its mark shows.', type: 'match', pairs: list.map(function (m) { return [m[0], JOBS[m[2]]]; }), hint: 'Look at the dash or the dots in each.', explain: 'Dashes break or add; ellipses pause or leave out.', meta: { k: 'g7-job-match' } };
  }

  function markTf() {
    var m = R.pick(MARKS), right = R.int(0, 1) === 1, said = right ? m[2] : R.pick(Object.keys(JOBS).filter(function (j) { return j !== m[2]; }));
    return { q: Q.name() + ' says the ' + (m[1] === DASH ? 'dash' : 'ellipsis') + ' shows <b>' + JOBS[said] + '</b>.', fig: W.sent(m[0]), type: 'tf', answer: right,
      why: { options: ['That is what the ' + (m[1] === DASH ? 'dash' : 'ellipsis') + ' does here.', 'It does something else here.'], answer: right ? 0 : 1 },
      hint: 'Read it aloud. What does the mark do to your voice or to the words?', explain: '<b>' + m[1] + '</b>: ' + JOBS[m[2]] + '.', meta: { k: 'g7-mark-tf', s: m[0], said: JOBS[said] } };
  }

  Atlas.register('punctuation', {
    lessons: [{
      id: 'semicolons', title: 'Semicolons and linking adverbs', sub: 'Joining two complete sentences.',
      concepts: [
        { slug: 'semicolon', title: 'A semicolon joins two complete sentences', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.sent('The rain stopped.') + W.sent('The game went on.'), 'Two sentences, closely linked.'),
            step(W.sent('The rain stopped<mark class="hl">;</mark> the game went on.'), 'No capital after it.'),
            step(W.sent('The rain stopped; <s>and</s> the game went on.'), 'No and, but or so after it.')
          ],
          guided: [function () { return semicolon(1); }, semiMark],
          check: [function () { return semicolon(2); }, semiTf],
          coach: '<p>Test each side: cover one half and read the other aloud. If both make sense alone, the semicolon fits.</p>',
          mistake: '<p>Using a semicolon where a comma belongs, for example after "Because...". The side before it must be complete.</p>' },
        { slug: 'linking', title: 'Linking adverbs show how ideas connect', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.tile('however'), 'Contrast.'),
            step(W.tile('therefore'), 'Result.'),
            step(W.tile('meanwhile'), 'At the same time.'),
            step(W.sent('The trail was closed<mark class="hl">;</mark> however<mark class="hl">,</mark> the lookout was open.'), 'Semicolon before, comma after.')
          ],
          guided: [function () { return conjWord(1); }, function () { return conjPunct(1); }],
          check: [function () { return conjPunct(2); }, conjMatch],
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
            step(W.sent('rule: ' + OQ + '<mark class="hl">N</mark>ever quit' + CQ), 'The quotation starts with a capital.')
          ],
          guided: [colonWhen, function () { return colonQuote(1); }],
          check: [colonWhen, function () { return colonQuote(2); }],
          coach: '<p>Cover everything after the colon. If what is left is a full sentence, the colon works.</p>',
          mistake: '<p>A colon after "said" or "says". Those words do not finish a sentence, so use a comma.</p>' },
        { slug: 'dash', title: 'A dash shows a break', exp: ['B3.3'], skill: 'pauses',
          model: [
            step(W.sent('I was going to tell you<mark class="hl">' + DASH + '</mark>wait, is that our bus?'), 'A sudden change of thought.'),
            step(W.sent('My cousin<mark class="hl">' + DASH + '</mark>the one from Iqaluit<mark class="hl">' + DASH + '</mark>is visiting.'), 'An added comment, in a pair of dashes.')
          ],
          guided: [function () { return markJob(1); }, function () { return whichMark(1); }],
          check: [function () { return markJob(2); }, jobMatch],
          coach: '<p>Use dashes for effect, not everywhere. One or two in a piece of writing is plenty.</p>',
          mistake: '<p>Using a short hyphen (-) for a dash. A dash is longer and joins thoughts, not words.</p>' },
        { slug: 'ellipsis', title: 'An ellipsis shows a pause or missing words', exp: ['B3.3'], skill: 'pauses',
          model: [
            step(W.sent('Well<mark class="hl">' + DOTS + '</mark> I am not sure.'), 'A pause.'),
            step(W.sent('The report said the water is, in most places and at most times, safe.'), 'A long quotation.'),
            step(W.sent('The report said the water <mark class="hl">' + DOTS + '</mark> is safe.'), 'Some words left out.')
          ],
          guided: [function () { return markJob(1); }, function () { return whichMark(1); }],
          check: [function () { return whichMark(2); }, function () { return markJob(2); }],
          coach: '<p>When leaving words out of a quotation, check that the meaning has not changed. That is a fairness rule, not just a punctuation rule.</p>',
          mistake: '<p>Using four, five or more dots. An ellipsis is three dots.</p>' }
      ]
    }],
    practice: [
      { id: 'semicolons', name: 'Semicolons and linking adverbs', code: 'B3.3', gen: semicolon },
      { id: 'colons', name: 'Colons before a quotation', code: 'B3.3', gen: colonQuote },
      { id: 'pauses', name: 'Dashes and ellipses', code: 'B3.3', gen: markJob }
    ]
  });

  Q.shapes('punctuation', {
    semicolons: [[1, 'mark', semiMark], [1, 'linking-word', conjWord], [2, 'linking-punct', conjPunct], [2, 'true-false', semiTf], [2, 'match', conjMatch]],
    colons: [[1, 'when', colonWhen], [2, 'true-false', colonTf], [2, 'pick', colonPick]],
    pauses: [[1, 'which-mark', whichMark], [2, 'match', jobMatch], [2, 'true-false', markTf]]
  });
})();
