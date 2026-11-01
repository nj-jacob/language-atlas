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
  var FORMAL = [['the mayor', 'Dear Mayor Tremblay'], ['a principal', 'Dear Ms. Okafor'], ['a hiring committee', 'Dear Hiring Committee'], ['a doctor', 'Dear Dr. Chen'], ['a member of Parliament', 'Dear Mr. Nakamura'],
    ['a park ranger', 'Dear Ranger Morin'], ['a city councillor', 'Dear Councillor Ahmed'], ['a museum director', 'Dear Director Lavallee'], ['a newspaper editor', 'Dear Editor'], ['a chief of a First Nation', 'Dear Chief Whitecloud']];
  var FRIENDLY = ['Dear Grandma', 'Hi Sam', 'Dear Aunt Leila', 'Hello Jonah', 'Dear Kokum'];
  /* three memos, each a list of [heading, what follows] */
  var MEMOS = [[['To', 'All Grade 6 students'], ['From', 'Ms. Lee, Principal'], ['Date', 'May 4'], ['Re', 'Field trip to the science centre']],
    [['To', 'Hockey team families'], ['From', 'Coach Bouchard'], ['Date', 'January 12'], ['Re', 'New practice times']],
    [['To', 'Library helpers'], ['From', 'Mr. Daniels, Librarian'], ['Date', 'October 3'], ['Re', 'Book fair set-up']]];
  function cap1(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }
  function hey(f) { return 'Hey ' + f[1].split(' ').slice(1).join(' ') + '!'; }

  function formal(lv) {
    var f = R.pick(FORMAL);
    return Q.one('Which greeting fits a <b>formal</b> letter to ' + f[0] + '?', f[1] + ':', [f[1] + ';', hey(f)].concat(lv > 1 ? [f[1] + '.'] : []), {
      prompt: 'Formal letters use a special mark after the greeting.', hint: 'A formal greeting ends with a colon.', explain: '<b>' + f[1] + ':</b>', meta: { k: 'g6-formal' } });
  }
  function memo(lv) {
    var mm = R.pick(MEMOS), m = R.pick(mm);
    return Q.one('Which memo line is punctuated correctly?', m[0] + ': ' + m[1], [m[0] + ', ' + m[1], m[0] + '; ' + m[1]].slice(0, lv > 1 ? 2 : 1), {
      fig: W.passage('MEMO', mm.filter(function (x) { return x !== m; }).map(function (x) { return x[0] + ': ' + x[1]; })), prompt: 'Look at the other lines of the memo.', hint: 'Look at the other lines of the memo.',
      explain: 'Memo headings end with a colon: <b>' + m[0] + ':</b>', meta: { k: 'g6-memo' } });
  }
  function colonTf() {
    var kind = R.pick(['friendly', 'formal']), right = R.int(0, 1) === 1, g = kind === 'formal' ? R.pick(FORMAL)[1] : R.pick(FRIENDLY);
    var mark = right ? (kind === 'formal' ? ':' : ',') : (kind === 'formal' ? ',' : ':');
    return { q: 'Is this the best greeting for a <b>' + kind + '</b> letter?', fig: W.sent(g + mark), type: 'tf', answer: right,
      why: { options: ['Formal letters use a colon. Friendly letters use a comma.', 'Every letter uses a colon.'], answer: 0 },
      hint: 'Formal: colon. Friendly: comma.', explain: kind === 'formal' ? 'Formal: <b>' + g + ':</b>' : 'Friendly: <b>' + g + ',</b>', meta: { k: 'g6-colon-tf', kind: kind } };
  }
  function greetPick() {
    var fs = R.some(FORMAL, 4);
    return Q.all('Pick every greeting written correctly for a <b>formal</b> letter.', fs.slice(0, 2).map(function (f) { return f[1] + ':'; }), [fs[2][1] + ',', hey(fs[3])], {
      hint: 'Dear, the name, then a colon.', explain: 'A formal greeting ends with a colon.', meta: { k: 'g6-greet-pick' } });
  }

  /* scripts: [speaker, the line] */
  var SCRIPT = [['NOOR', 'Did you hear that?'], ['KAI', 'It is just the wind.'], ['ELDER', 'Sit with me, and I will tell you a story.'], ['COACH', 'Everyone on the ice!'], ['MEI', 'Wait for me!'],
    ['RAVI', 'I think the map is upside down.'], ['AMARA', 'Where did the trail go?'], ['GRANDPA', 'Pack an extra pair of socks.'], ['JONAH', 'Look, the northern lights!'],
    ['TEACHER', 'Please take out your notebooks.'], ['LEILA', 'Can we stay one more hour?'], ['OMAR', 'The canoe is drifting away!']];
  function story(s) { return '“' + s[1].replace(/\.$/, ',') + '” said ' + cap1(s[0]) + '.'; }
  function scriptOf(s) { return s[0] + ': ' + s[1]; }
  function scriptLine(lv) {
    var s = R.pick(SCRIPT);
    return Q.one('Which line is written correctly for a <b>script</b>?', scriptOf(s), [story(s), s[0] + ', ' + s[1]].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [s[0] + '; ' + s[1]] : []), {
      prompt: 'In a script, who speaks comes first.', hint: 'Name, colon, then the words. No quotation marks.', explain: '<b>' + s[0] + ':</b> ' + s[1], meta: { k: 'g6-script' } });
  }
  function scriptTf() {
    var s = R.pick(SCRIPT), right = R.int(0, 1) === 1, shown = right ? scriptOf(s) : R.pick([story(s), s[0] + ', ' + s[1], s[0] + ': “' + s[1] + '”']);
    return { q: 'Is this line written correctly for a script?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Name, colon, then the words.', 'A script line needs the name, a colon, and no quotation marks.'], answer: right ? 0 : 1 },
      hint: 'Name, colon, then the words.', explain: '<b>' + s[0] + ':</b> ' + s[1], meta: { k: 'g6-script-tf', shown: shown } };
  }
  function scriptFix(lv) {
    var s = R.pick(SCRIPT);
    return Q.one('Turn this story line into a <b>script</b> line.', scriptOf(s), [s[0] + ': “' + s[1] + '”'].concat(lv > 1 ? [s[0] + ', ' + s[1]] : []), {
      fig: W.sent(story(s)), hint: 'Take away the quotation marks and "said". Put the name first.', explain: '<b>' + s[0] + ':</b> ' + s[1], meta: { k: 'g6-script-fix', who: s[0] } });
  }
  function scriptPick() {
    var ss = R.some(SCRIPT, 4);
    return Q.all('Pick every line written correctly for a <b>script</b>.', ss.slice(0, 2).map(scriptOf), [story(ss[2]), ss[3][0] + ', ' + ss[3][1]], {
      hint: 'Name, colon, then the words.', explain: 'Scripts use NAME: and no quotation marks.', meta: { k: 'g6-script-pick' } });
  }

  /* ---------- commas after transitions: [transition, what it shows, the sentence before, the rest, wrong transitions] ---------- */
  var TRANS = [['However', 'a contrast', 'The forecast called for sun.', 'it rained all afternoon.', ['For example', 'As a result']],
    ['As a result', 'a result', 'The road was icy.', 'the buses were late.', ['However', 'For example']],
    ['For example', 'an example', 'Many animals hibernate.', 'black bears sleep through most of the winter.', ['However', 'As a result']],
    ['In addition', 'an added idea', 'The club plants trees.', 'it cleans up the riverbank.', ['As a result', 'However']],
    ['Meanwhile', 'the same time', 'Omar set up the tent.', 'Hana gathered firewood.', ['As a result', 'For example']],
    ['Finally', 'the last step', 'We packed, loaded the car and checked the map.', 'we drove north.', ['However', 'For example']],
    ['On the other hand', 'a contrast', 'Summer in Iqaluit is cool.', 'summer in Windsor is hot and humid.', ['For instance', 'Therefore']],
    ['Therefore', 'a result', 'The ice was too thin.', 'the skating party was cancelled.', ['For instance', 'Furthermore']],
    ['For instance', 'an example', 'Some birds travel very far.', 'Arctic terns fly from pole to pole.', ['Therefore', 'Lastly']],
    ['Furthermore', 'an added idea', 'Walking to school is good exercise.', 'it saves gas.', ['Therefore', 'At the same time']],
    ['At the same time', 'the same time', 'The band started to play.', 'the dancers walked onto the stage.', ['Therefore', 'For instance']],
    ['Lastly', 'the last step', 'First, mix the flour and water. Next, knead the dough.', 'bake it for twenty minutes.', ['On the other hand', 'For instance']]];
  var KINDS = ['a contrast', 'a result', 'an example', 'an added idea', 'the same time', 'the last step'];
  function rightComma(t) { return t[0] + ', ' + t[3]; }
  /* the comma moved one word too far */
  function moved(t, n) { var w = (t[0] + ' ' + t[3]).split(' '), at = t[0].split(' ').length - 1 + n; w[at] = w[at] + ','; return w.join(' '); }
  function commaPlace(lv) {
    var t = R.pick(TRANS);
    return Q.one('Where does the comma go?', rightComma(t), [moved(t, 1)].concat(lv > 1 ? [t[0] + ' ' + t[3]] : []), { fig: W.sent(t[2]),
      prompt: 'Find the transition at the start. The comma comes right after it.', hint: 'Transition, comma, then the rest of the sentence.', explain: W.sent('<b>' + t[0] + ',</b> ' + t[3]), meta: { k: 'g6-comma-place', tr: t[0] } });
  }
  function commaTf() {
    var t = R.pick(TRANS), right = R.int(0, 1) === 1, s = right ? rightComma(t) : R.pick([t[0] + ' ' + t[3], moved(t, 1)]);
    return { q: 'Is this punctuated correctly?', fig: W.sent(s), type: 'tf', answer: right, why: { options: ['The comma comes right after the transition.', 'The comma is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Look right after the first word or phrase.', explain: W.sent(rightComma(t)), meta: { k: 'g6-comma-tf', s: s } };
  }
  function commaTap() {
    var t = R.pick(TRANS.filter(function (x) { var w = (x[0] + ' ' + x[3]).replace(/\.$/, '').split(' '); return w.every(function (y, i) { return w.indexOf(y) === i; }); }));
    var words = (t[0] + ' ' + t[3]).replace(/\.$/, '').split(' ');
    return { q: 'Tap the word the comma goes <b>after</b>.', fig: W.sent(t[0] + ' ' + t[3]), type: 'tap', tiles: words, answer: t[0].split(' ').length - 1,
      prompt: 'Where does the transition end?', hint: 'The comma comes after the whole transition.', explain: W.sent(rightComma(t)), meta: { k: 'g6-comma-tap' } };
  }
  function commaPick() {
    var ts = R.some(TRANS, 4);
    return Q.all('Pick every sentence with the comma in the right place.', ts.slice(0, 2).map(rightComma), [ts[2][0] + ' ' + ts[2][3], moved(ts[3], 1)], {
      hint: 'Transition, comma, then the rest.', explain: 'A comma comes right after a transition at the start.', meta: { k: 'g6-comma-pick' } });
  }

  /* choosing a transition */
  function whichTrans(lv) {
    var t = R.pick(TRANS);
    return Q.one('Which transition fits?', t[0], t[4].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(t[2] + ' ' + W.gap() + ', ' + t[3]), prompt: 'How does the second sentence connect to the first?', hint: 'Contrast? Result? Example? More? Same time? Last?',
      explain: '<b>' + t[0] + '</b> shows ' + t[1] + '.', meta: { k: 'g6-which-trans', first: t[2] } });
  }
  function oneEachKind(n) { return R.some(KINDS, n).map(function (k) { return R.pick(TRANS.filter(function (t) { return t[1] === k; })); }); }
  function transMatch() {
    return { q: 'Match each transition to what it shows.', type: 'match', pairs: oneEachKind(3).map(function (x) { return [x[0], x[1]]; }), hint: 'Think of a sentence for each one.', explain: 'Transitions show how ideas connect.', meta: { k: 'g6-trans-match' } };
  }
  function transTf() {
    var t = R.pick(TRANS), right = R.int(0, 1) === 1, said = right ? t[1] : R.pick(KINDS.filter(function (k) { return k !== t[1]; }));
    return { q: Q.name() + ' says <b>' + t[0] + '</b> shows <b>' + said + '</b>.', type: 'tf', answer: right,
      why: { options: ['That is how it links the ideas.', 'It links the ideas in a different way.'], answer: right ? 0 : 1 },
      hint: 'Try it between two sentences.', explain: '<b>' + t[0] + '</b> shows ' + t[1] + '.', meta: { k: 'g6-trans-tf', tr: t[0], said: said } };
  }
  function transFor(lv) {
    var set = oneEachKind(lv > 1 ? 4 : 3), t = set[0];
    return Q.tiles('Which transition shows <b>' + t[1] + '</b>?', t[0], set.slice(1).map(function (x) { return x[0]; }), {
      hint: 'Try each one between two sentences.', explain: '<b>' + t[0] + '</b> shows ' + t[1] + '.', meta: { k: 'g6-trans-for', shows: t[1] } });
  }

  /* ---------- capitals: sentences with every capital in place ---------- */
  var CAPS = ['We paddled down the Ottawa River.', 'My cousin lives in Rankin Inlet, Nunavut.', 'On National Indigenous Peoples Day, we went to a powwow.', 'Dr. Singh spoke to our class on Tuesday.',
    'We read The Ice Road in October.', 'Lake Superior is the largest of the Great Lakes.', 'Grandma flew from Halifax to Vancouver in June.', 'Our class visited Parliament Hill in Ottawa.',
    'Every July, we camp near Lake Louise in Alberta.', 'Mr. Kowalski coaches hockey on Saturday mornings.', 'We celebrated Diwali with our neighbours in November.',
    'My aunt works at the Royal Ontario Museum in Toronto.', 'On Canada Day, we watched fireworks over the St. Lawrence River.', 'Ms. Cardinal read us a chapter of Winter Count on Friday.'];
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
      prompt: 'Which word is part of a name?', hint: 'Which word is part of a name or a title?', explain: W.sent(s), meta: { k: 'g6-cap-tap', fixed: s } };
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
    full: true,
    lessons: [{
      id: 'colons', title: 'Colons', sub: 'Formal letters, memos and scripts.',
      concepts: [
        { slug: 'formal', title: 'A colon after a formal greeting', exp: ['B3.3'], skill: 'letters',
          model: [
            step(W.sent('Dear Mayor Tremblay<mark class="hl">:</mark>'), 'Formal letter.'),
            step(W.sent('Dear Grandma<mark class="hl">,</mark>'), 'Friendly letter: a comma.'),
            step(W.sent('Dear Councillor Ahmed<mark class="hl">:</mark>'), 'A councillor: formal again.'),
            step(W.passage('MEMO', ['To<mark class="hl">:</mark> All Grade 6 students', 'From<mark class="hl">:</mark> Ms. Lee, Principal', 'Re<mark class="hl">:</mark> Field trip to the science centre']), 'A memo: a colon after each heading.')
          ],
          guided: [function () { return formal(1); }, function () { return memo(1); }, colonTf],
          check: [function () { return formal(2); }, greetPick, colonTf, function () { return memo(2); }, function () { return formal(2); }],
          coach: '<p>Write a short formal letter together, for example to a city councillor about a park. Point out the colon.</p>',
          mistake: '<p>Using a comma in a formal letter, or a semicolon instead of a colon.</p>' },
        { slug: 'script', title: 'A colon for each new speaker in a script', exp: ['B3.3'], skill: 'script',
          model: [
            step(W.sent('<b>NOOR<mark class="hl">:</mark></b> Did you hear that?'), 'The speaker, then a colon.'),
            step(W.sent('<b>KAI<mark class="hl">:</mark></b> It is just the wind.'), 'New speaker, new line.'),
            step(W.sent('“It is just the wind,” said Kai.'), 'In a story, quotation marks instead.'),
            step(W.sent('“Wait for me!” said Mei.'), 'Turn it into a script line.'),
            step(W.sent('<b>MEI<mark class="hl">:</mark></b> Wait for me!'), 'Name first. No quotation marks, no said.')
          ],
          guided: [function () { return scriptLine(1); }, function () { return scriptFix(1); }, scriptTf],
          check: [function () { return scriptLine(2); }, scriptPick, scriptTf, function () { return scriptFix(2); }, function () { return scriptLine(3); }],
          coach: '<p>Turn a few lines of dialogue from a favourite book into a script, then read it as a play.</p>',
          mistake: '<p>Mixing story and script styles: "KAI: “It is just the wind.”" Scripts need no quotation marks.</p>' }
      ]
    }, {
      id: 'transitions', title: 'Commas after transitions', sub: 'Words that link one sentence to the next.',
      concepts: [
        { slug: 'transition-comma', title: 'A comma after a transition', exp: ['B3.3'], skill: 'comma',
          model: [
            step(W.sent('The forecast called for sun.'), 'The first sentence.'),
            step(W.sent('<b>However<mark class="hl">,</mark></b> it rained all afternoon.'), 'Transition, then a comma.'),
            step(W.sent('The road was icy.'), 'A new pair.'),
            step(W.sent('<b>As a result<mark class="hl">,</mark></b> the buses were late.'), 'The comma comes after the whole phrase.'),
            step(W.sent('As a<mark class="hl">,</mark> result the buses were late.'), 'Not inside the phrase.')
          ],
          guided: [function () { return commaPlace(1); }, commaTap, commaTf],
          check: [function () { return commaPlace(2); }, commaPick, commaTf, commaTap, function () { return commaPlace(2); }],
          coach: '<p>Read the sentence aloud. You pause naturally after the transition: that is where the comma goes.</p>',
          mistake: '<p>Putting the comma inside a phrase: "As a, result" or "For, example".</p>' },
        { slug: 'transition-meaning', title: 'Choose the transition that fits', exp: ['B3.3'], skill: 'transitions',
          model: [
            step(W.sent('<b>However</b>'), 'A contrast.'),
            step(W.sent('<b>As a result</b>'), 'What happened because of it.'),
            step(W.sent('<b>For example</b>'), 'An example.'),
            step(W.sent('<b>Meanwhile</b>'), 'At the same time.'),
            step(W.chain(['a contrast', 'a result', 'an example', 'the last step'], ['On the other hand', 'Therefore', 'For instance', 'Lastly']), 'Other words do the same jobs.')
          ],
          guided: [function () { return whichTrans(1); }, transMatch, function () { return transFor(1); }],
          check: [function () { return whichTrans(2); }, transTf, transMatch, function () { return transFor(2); }, function () { return whichTrans(2); }],
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
            step(W.sent('We read <b>T</b>he <b>I</b>ce <b>R</b>oad in <b>O</b>ctober.'), 'Book titles and months.'),
            step(W.sent('<b>M</b>r. <b>K</b>owalski coaches hockey on <b>S</b>aturday mornings.'), 'A title and a name. Hockey and mornings stay small.')
          ],
          guided: [function () { return capRight(1); }, capTap, capTf],
          check: [function () { return capRight(2); }, capPick, capTap, capTf, function () { return capRight(2); }],
          coach: '<p>Have the child check one thing at a time when editing: first names and places, then days and months, then titles.</p>',
          mistake: '<p>Capitalizing only the first word of a place name ("Ottawa river"). Every main word gets a capital.</p>' }
      ]
    }],
    practice: [
      { id: 'letters', name: 'Colons in letters and memos', code: 'B3.3', gen: formal },
      { id: 'script', name: 'Colons in scripts', code: 'B3.3', gen: scriptLine },
      { id: 'comma', name: 'Commas after transitions', code: 'B3.3', gen: commaPlace },
      { id: 'transitions', name: 'Choosing transitions', code: 'B3.3', gen: whichTrans },
      { id: 'capitals', name: 'Capitals', code: 'B3.3', gen: capRight }
    ]
  });

  Q.shapes('punctuation', {
    letters: [[1, 'memo', memo], [1, 'true-false', colonTf], [2, 'pick', greetPick]],
    script: [[1, 'fix', scriptFix], [1, 'true-false', scriptTf], [2, 'pick', scriptPick]],
    comma: [[1, 'tap', commaTap], [1, 'true-false', commaTf], [2, 'pick', commaPick]],
    transitions: [[1, 'for', transFor], [1, 'true-false', transTf], [2, 'match', transMatch]],
    capitals: [[1, 'tap', capTap], [1, 'true-false', capTf], [2, 'pick', capPick]]
  });
})();
