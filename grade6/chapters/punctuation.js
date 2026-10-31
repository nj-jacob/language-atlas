/* Grade 6: capitals and punctuation.
   Ontario 2023 Language, Grade 6:
   B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate meaning clearly and coherently,
   including the use of colons in formal letters and memo salutations and to indicate a new speaker in script dialogue, and commas after
   transitional words or phrases"
   All sentences are written for this site. Answer checks: tests/verify/grade6-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* ---------- colons ---------- */
  /* [who the letter is to, the formal greeting without its mark] */
  var FORMAL = [['the mayor', 'Dear Mayor Tremblay'], ['a principal', 'Dear Ms. Okafor'], ['a hiring committee', 'Dear Hiring Committee'], ['a doctor', 'Dear Dr. Chen'], ['a member of Parliament', 'Dear Mr. Nakamura']];
  var MEMO = [['To', 'All Grade 6 students'], ['From', 'Ms. Lee, Principal'], ['Date', 'May 4'], ['Re', 'Field trip to the science centre']];
  var SCRIPT = [['NOOR', 'Did you hear that?'], ['KAI', 'It is just the wind.'], ['ELDER', 'Sit with me, and I will tell you a story.'], ['COACH', 'Everyone on the ice!'], ['MEI', 'Wait for me!']];
  function cap1(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }

  function formal(lv) {
    var f = R.pick(FORMAL);
    return Q.one('Which greeting fits a <b>formal</b> letter to ' + f[0] + '?', f[1] + ':', [f[1] + ';', 'Hey ' + f[1].split(' ').slice(1).join(' ') + '!'].concat(lv > 1 ? [f[1] + '.'] : []), {
      prompt: 'Formal letters use a special mark after the greeting.', hint: 'A formal greeting ends with a colon.', explain: '<b>' + f[1] + ':</b>', meta: { k: 'g6-formal' } });
  }
  function memo(lv) {
    var m = R.pick(MEMO);
    return Q.one('Which memo line is punctuated correctly?', m[0] + ': ' + m[1], [m[0] + ', ' + m[1], m[0] + '; ' + m[1]].slice(0, lv > 1 ? 2 : 1), {
      fig: W.passage('MEMO', MEMO.filter(function (x) { return x !== m; }).map(function (x) { return x[0] + ': ' + x[1]; })), hint: 'Look at the other lines of the memo.',
      explain: 'Memo headings end with a colon: <b>' + m[0] + ':</b>', meta: { k: 'g6-memo' } });
  }
  function scriptLine(lv) {
    var s = R.pick(SCRIPT);
    return Q.one('Which line is written correctly for a <b>script</b>?', s[0] + ': ' + s[1], ['“' + s[1].replace(/[.!]$/, ',') + '” said ' + cap1(s[0]) + '.', s[0] + ', ' + s[1]].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [s[0] + '; ' + s[1]] : []), {
      prompt: 'In a script, who speaks comes first.', hint: 'Name, colon, then the words. No quotation marks.', explain: '<b>' + s[0] + ':</b> ' + s[1], meta: { k: 'g6-script' } });
  }
  function colonTf() {
    var kind = R.pick(['friendly', 'formal']), right = R.int(0, 1) === 1, g = kind === 'formal' ? R.pick(FORMAL)[1] : R.pick(['Dear Grandma', 'Hi Sam', 'Dear Aunt Leila']);
    var mark = right ? (kind === 'formal' ? ':' : ',') : (kind === 'formal' ? ',' : ':');
    return { q: 'Is this the best greeting for a <b>' + kind + '</b> letter?', fig: W.sent(g + mark), type: 'tf', answer: right,
      why: { options: ['Formal letters use a colon. Friendly letters use a comma.', 'Every letter uses a colon.'], answer: 0 },
      hint: 'Formal: colon. Friendly: comma.', explain: kind === 'formal' ? 'Formal: <b>' + g + ':</b>' : 'Friendly: <b>' + g + ',</b>', meta: { k: 'g6-colon-tf', kind: kind } };
  }

  /* ---------- commas after transitions: [transition, what it shows, the sentence before, the rest] ---------- */
  var TRANS = [['However', 'a contrast', 'The forecast called for sun.', 'it rained all afternoon.', ['For example', 'As a result']],
    ['As a result', 'a result', 'The road was icy.', 'the buses were late.', ['However', 'For example']],
    ['For example', 'an example', 'Many animals hibernate.', 'black bears sleep through most of the winter.', ['However', 'As a result']],
    ['In addition', 'an added idea', 'The club plants trees.', 'it cleans up the riverbank.', ['As a result', 'However']],
    ['Meanwhile', 'the same time', 'Omar set up the tent.', 'Hana gathered firewood.', ['As a result', 'For example']],
    ['Finally', 'the last step', 'We packed, loaded the car and checked the map.', 'we drove north.', ['However', 'For example']]];
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function rightComma(t) { return t[0] + ', ' + t[3]; }
  /* the comma moved one word or two words too far */
  function moved(t, n) { var w = (t[0] + ' ' + t[3]).split(' '), at = t[0].split(' ').length - 1 + n; w[at] = w[at] + ','; return w.join(' '); }
  function commaPlace(lv) {
    var t = R.pick(TRANS);
    return Q.one('Where does the comma go?', rightComma(t), [moved(t, 1)].concat(lv > 1 ? [t[0] + ' ' + t[3]] : []), { fig: W.sent(t[2]),
      prompt: 'Find the transition at the start. The comma comes right after it.', hint: 'Transition, comma, then the rest of the sentence.', explain: W.sent('<b>' + t[0] + ',</b> ' + t[3]), meta: { k: 'g6-comma-place', tr: t[0] } });
  }
  function whichTrans(lv) {
    var t = R.pick(TRANS);
    return Q.one('Which transition fits?', t[0], t[4].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(t[2] + ' ' + W.gap() + ', ' + t[3]), prompt: 'How does the second sentence connect to the first?', hint: 'Contrast? Result? Example? More? Same time? Last?',
      explain: '<b>' + t[0] + '</b> shows ' + t[1] + '.', meta: { k: 'g6-which-trans', first: t[2] } });
  }
  function commaTf() {
    var t = R.pick(TRANS), right = R.int(0, 1) === 1, s = right ? rightComma(t) : t[0] + ' ' + t[3];
    return { q: 'Is this punctuated correctly?', fig: W.sent(s), type: 'tf', answer: right, why: { options: ['A comma follows a transition at the start.', 'Transitions never need a comma.'], answer: 0 },
      hint: 'Look right after the first word or phrase.', explain: W.sent(rightComma(t)), meta: { k: 'g6-comma-tf', s: s } };
  }
  function transMatch() {
    var t = R.some(TRANS, 3);
    return { q: 'Match each transition to what it shows.', type: 'match', pairs: t.map(function (x) { return [x[0], x[1]]; }), hint: 'Think of a sentence for each one.', explain: 'Transitions show how ideas connect.', meta: { k: 'g6-trans-match' } };
  }

  /* ---------- capitals: sentences with every capital in place ---------- */
  var CAPS = ['We paddled down the Ottawa River.', 'My cousin lives in Rankin Inlet, Nunavut.', 'On National Indigenous Peoples Day, we went to a powwow.', 'Dr. Singh spoke to our class on Tuesday.',
    'We read The Ice Road in October.', 'Lake Superior is the largest of the Great Lakes.', 'Grandma flew from Halifax to Vancouver in June.'];
  /* the same sentence with one capital missing */
  function missing(s) {
    var w = s.split(' '), at = R.pick(w.map(function (x, i) { return i > 0 && /^[A-Z]/.test(x) ? i : -1; }).filter(function (i) { return i > 0; }));
    w[at] = w[at].toLowerCase();
    return { s: w.join(' '), word: w[at].replace(/[.,]$/, '') };
  }
  function capRight(lv) {
    var s = R.pick(CAPS), a = missing(s), b = missing(s);
    return Q.one('Which sentence uses capitals correctly?', s, [a.s, b.s, s.toLowerCase().replace(/^./, function (c) { return c.toUpperCase(); })].slice(lv > 1 ? 0 : 2), {
      prompt: 'Names of people, places, days, months, holidays and titles start with a capital.', hint: 'Check every name.', explain: W.sent(s), meta: { k: 'g6-cap-right' } });
  }
  function capTap() {
    var s = R.pick(CAPS), m = missing(s), words = m.s.replace(/[.,]/g, '').split(' ').filter(function (w, i, a) { return a.indexOf(w) === i; });
    return { q: 'Tap the word that needs a capital.', fig: W.sent(m.s), type: 'tap', tiles: words, answer: words.indexOf(m.word),
      hint: 'Which word is part of a name or a title?', explain: W.sent(s), meta: { k: 'g6-cap-tap', fixed: s } };
  }

  function capPick() {
    var s = R.pick(CAPS), words = s.replace(/[.,]/g, '').split(' ').slice(1), need = words.filter(function (w) { return /^[A-Z]/.test(w); }), rest = words.filter(function (w, i) { return /^[a-z]/.test(w) && words.indexOf(w) === i; });
    var low = function (w) { return w.toLowerCase(); }, right = need.slice(0, 3).map(low), wrong = R.some(rest.filter(function (w) { return right.indexOf(low(w)) < 0; }), 2).map(low);
    return Q.all('Pick every word that needs a capital.', right, wrong, { fig: W.sent(s.charAt(0) + s.slice(1).toLowerCase()), hint: 'Which words are part of a name, a place, a day or a title?',
      explain: W.sent(s), meta: { k: 'g6-cap-pick' } });
  }
  function capTf() {
    var s = R.pick(CAPS), right = R.int(0, 1) === 1, shown = right ? s : missing(s).s;
    return { q: 'Are all the capitals right?', fig: W.sent(shown), type: 'tf', answer: right, hint: 'Check every name, place, day, month and title.', explain: W.sent(s), meta: { k: 'g6-cap-tf', shown: shown } };
  }

  Atlas.register('punctuation', {
    lessons: [{
      id: 'colons', title: 'Colons', sub: 'Formal letters, memos and scripts.',
      concepts: [
        { slug: 'formal', title: 'A colon after a formal greeting', exp: ['B3.3'], skill: 'colons',
          model: [
            step(W.sent('Dear Mayor Tremblay<mark class="hl">:</mark>'), 'Formal letter.'),
            step(W.sent('Dear Grandma<mark class="hl">,</mark>'), 'Friendly letter: a comma.'),
            step(W.passage('MEMO', ['To<mark class="hl">:</mark> All Grade 6 students', 'From<mark class="hl">:</mark> Ms. Lee, Principal', 'Re<mark class="hl">:</mark> Field trip to the science centre']), 'A memo: a colon after each heading.')
          ],
          guided: [function () { return formal(1); }, function () { return memo(1); }],
          check: [function () { return formal(2); }, colonTf],
          coach: '<p>Write a short formal letter together, for example to a city councillor about a park. Point out the colon.</p>',
          mistake: '<p>Using a comma in a formal letter, or a semicolon instead of a colon.</p>' },
        { slug: 'script', title: 'A colon for each new speaker in a script', exp: ['B3.3'], skill: 'colons',
          model: [
            step(W.sent('<b>NOOR<mark class="hl">:</mark></b> Did you hear that?'), 'The speaker, then a colon.'),
            step(W.sent('<b>KAI<mark class="hl">:</mark></b> It is just the wind.'), 'New speaker, new line.'),
            step(W.sent('“It is just the wind,” said Kai.'), 'In a story, quotation marks instead.')
          ],
          guided: [function () { return scriptLine(1); }, function () { return scriptLine(1); }],
          check: [function () { return scriptLine(2); }, function () { return memo(2); }],
          coach: '<p>Turn a few lines of dialogue from a favourite book into a script, then read it as a play.</p>',
          mistake: '<p>Mixing story and script styles: "KAI: “It is just the wind.”" Scripts need no quotation marks.</p>' }
      ]
    }, {
      id: 'transitions', title: 'Commas after transitions', sub: 'Words that link one sentence to the next.',
      concepts: [
        { slug: 'transition-comma', title: 'A comma after a transition', exp: ['B3.3'], skill: 'transitions',
          model: [
            step(W.sent('The forecast called for sun.'), 'The first sentence.'),
            step(W.sent('<b>However<mark class="hl">,</mark></b> it rained all afternoon.'), 'Transition, then a comma.'),
            step(W.sent('<b>As a result<mark class="hl">,</mark></b> the buses were late.'), 'The comma comes after the whole phrase.')
          ],
          guided: [function () { return commaPlace(1); }, commaTf],
          check: [function () { return commaPlace(2); }, commaTf],
          coach: '<p>Read the sentence aloud. You pause naturally after the transition: that is where the comma goes.</p>',
          mistake: '<p>Putting the comma inside a phrase: "As a, result" or "For, example".</p>' },
        { slug: 'transition-meaning', title: 'Choose the transition that fits', exp: ['B3.3'], skill: 'transitions',
          model: [
            step(W.sent('<b>However</b>'), 'A contrast.'),
            step(W.sent('<b>As a result</b>'), 'What happened because of it.'),
            step(W.sent('<b>For example</b>'), 'An example.'),
            step(W.sent('<b>Meanwhile</b>'), 'At the same time.')
          ],
          guided: [function () { return whichTrans(1); }, transMatch],
          check: [function () { return whichTrans(2); }, transMatch],
          coach: '<p>Keep a list of transitions on a card beside the child while they write paragraphs.</p>',
          mistake: '<p>Using "However" to add an idea. However means the next idea goes against the first.</p>' }
      ]
    }, {
      id: 'capitals', title: 'Capitals', sub: 'Names, places, days, holidays and titles.',
      concepts: [
        { slug: 'names', title: 'Capitals for names and titles', exp: ['B3.3'], skill: 'capitals',
          model: [
            step(W.sent('We paddled down the <b>O</b>ttawa <b>R</b>iver.'), 'Every word of a place name.'),
            step(W.sent('On <b>N</b>ational <b>I</b>ndigenous <b>P</b>eoples <b>D</b>ay, we went to a powwow.'), 'Holidays and days.'),
            step(W.sent('We read <b>T</b>he <b>I</b>ce <b>R</b>oad in <b>O</b>ctober.'), 'Book titles and months.')
          ],
          guided: [function () { return capRight(1); }, capTap],
          check: [function () { return capRight(2); }, capTap],
          coach: '<p>Have the child check one thing at a time when editing: first names and places, then days and months, then titles.</p>',
          mistake: '<p>Capitalizing only the first word of a place name ("Ottawa river"). Every main word gets a capital.</p>' }
      ]
    }],
    practice: [
      { id: 'colons', name: 'Colons', code: 'B3.3', gen: formal },
      { id: 'transitions', name: 'Commas after transitions', code: 'B3.3', gen: commaPlace },
      { id: 'capitals', name: 'Capitals', code: 'B3.3', gen: capRight }
    ]
  });

  Q.shapes('punctuation', {
    colons: [[1, 'memo', memo], [1, 'script', scriptLine], [2, 'true-false', colonTf]],
    transitions: [[1, 'which', whichTrans], [1, 'true-false', commaTf], [2, 'match', transMatch]],
    capitals: [[1, 'tap', capTap], [1, 'true-false', capTf], [2, 'pick', capPick]]
  });
})();
