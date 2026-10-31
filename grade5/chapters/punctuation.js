/* Grade 5: capitals and punctuation.
   Ontario 2023 Language, Grade 5, B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate
   meaning clearly and coherently, including the use of commas to set off advanced phrases or clauses such as appositives and participles,
   and colons for introducing a list after a complete sentence". All sentences are written for this site.
   Answer checks: tests/verify/grade5-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* appositives: [who or what, the words that rename it, the rest of the sentence] */
  var APPOS = [['My aunt', 'a pilot', 'flew to Iqaluit'], ['Mr. Singh', 'our coach', 'blew the whistle'], ['Lake Superior', 'the largest of the Great Lakes', 'is very cold'],
    ['Biscuit', 'our old dog', 'sleeps all day'], ['Dr. Lee', 'the town vet', 'checked the kitten'], ['Halifax', 'a city by the ocean', 'has a busy harbour'], ['Rosa', 'my older sister', 'plays hockey']];
  /* -ing phrases at the start: [the phrase, the rest] */
  var PART = [['Smiling', 'Jun walked onto the court'], ['Laughing at the joke', 'the class could not stop'], ['Holding the map', 'Tala led the way'],
    ['Shivering in the wind', 'we waited for the bus'], ['Carrying a heavy box', 'Dad climbed the stairs'], ['Paddling hard', 'the girls reached the island']];
  /* lists after a colon: [a complete sentence, a start that is not complete, the list] */
  var COLON = [['Pack three things for the hike', 'For the hike, pack', 'a hat, water and sunscreen'], ['We saw four animals at the pond', 'At the pond we saw', 'a heron, two frogs, a turtle and a muskrat'],
    ['Our team needs these players', 'Our team needs', 'a goalie, two defenders and a forward'], ['Grandma grows three herbs', 'Grandma grows', 'mint, sage and basil'], ['The flag has two colours', 'The colours of the flag are', 'red and white']];
  /* names that need capitals: [the sentence with the capital missing, the word, how it should look] */
  var CAPS = [['We paddled across lake Nipissing.', 'lake', 'Lake'], ['My friend speaks ojibwe and English.', 'ojibwe', 'Ojibwe'], ['The ottawa River flows past the city.', 'ottawa', 'Ottawa'],
    ['Our school is on maple Street.', 'maple', 'Maple'], ['My cousin moved to nova Scotia.', 'nova', 'Nova'], ['We visited the canadian Museum of History.', 'canadian', 'Canadian'], ['The trip is in july.', 'july', 'July']];

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function appRight(a) { return a[0] + ', ' + a[1] + ', ' + a[2] + '.'; }
  function appWrong(a) { return [a[0] + ' ' + a[1] + ', ' + a[2] + '.', a[0] + ', ' + a[1] + ' ' + a[2] + '.', a[0] + ' ' + a[1] + ' ' + a[2] + '.']; }
  function partRight(p) { return p[0] + ', ' + p[1] + '.'; }
  function partWrong(p) { var w = p[0].split(' '); return [p[0] + ' ' + p[1] + '.', w.length > 1 ? w[0] + ', ' + w.slice(1).join(' ') + ' ' + p[1] + '.' : p[0] + ' ' + p[1] + ',.' ]; }
  function colRight(c) { return c[0] + ': ' + c[2] + '.'; }

  /* ---------- question makers ---------- */
  function appositive(lv) {
    var a = R.pick(APPOS);
    return Q.one('Which is punctuated the right way?', appRight(a), R.some(appWrong(a), lv > 1 ? 3 : 1), { prompt: 'Which words rename <b>' + a[0] + '</b>? They need a comma on each side.',
      hint: 'Extra information that renames someone gets a comma before and after.', explain: W.sent(a[0] + '<b>,</b> ' + a[1] + '<b>,</b> ' + a[2] + '.'), meta: { k: 'g5-appositive', who: a[0] } });
  }
  function findAppositive() {
    var a = R.pick(APPOS);
    return Q.tiles('Which words are the <b>extra information</b> that renames <b>' + a[0] + '</b>?', a[1], [a[2]], { fig: W.sent(appRight(a)),
      hint: 'It sits between the commas.', explain: '<b>' + a[1] + '</b> renames ' + a[0] + '.', meta: { k: 'g5-find-app', who: a[0] } });
  }
  function participle(lv) {
    var p = R.pick(PART);
    return Q.one('Which is punctuated the right way?', partRight(p), partWrong(p).slice(0, lv > 1 ? 2 : 1), { prompt: 'Where does the <b>-ing</b> phrase end?',
      hint: 'Put a comma after the -ing phrase at the start.', explain: W.sent(p[0] + '<b>,</b> ' + p[1] + '.'), meta: { k: 'g5-participle', p: p[0] } });
  }
  function commaTf() {
    var useApp = R.int(0, 1) === 1, right = R.int(0, 1) === 1, shown;
    if (useApp) { var a = R.pick(APPOS); shown = right ? appRight(a) : R.pick(appWrong(a)); } else { var p = R.pick(PART); shown = right ? partRight(p) : partWrong(p)[0]; }
    return { q: 'Are the commas right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['The extra words are set off by commas.', 'A comma is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Find the extra words. Are they set off?', explain: 'Extra words get commas around them, or after them at the start.', meta: { k: 'g5-comma-tf', s: shown } };
  }
  function pickCommas() {
    var as = R.some(APPOS, 2), ps = R.some(PART, 2);
    return Q.all('Pick every sentence with the commas in the right places.', [appRight(as[0]), partRight(ps[0])], [R.pick(appWrong(as[1])), partWrong(ps[1])[0]], {
      hint: 'Look for words that rename someone, and -ing phrases at the start.', explain: 'Commas set off the extra words.', meta: { k: 'g5-pick-commas' } });
  }

  function colon(lv) {
    var c = R.pick(COLON), wrong = [c[1] + ': ' + c[2] + '.'].concat(lv > 1 ? [c[0] + ', ' + c[2] + '.'] : []);
    return Q.one('Which uses a colon the right way?', colRight(c), wrong, { prompt: 'Is the part before the colon a complete sentence?', hint: 'A colon comes after a complete sentence, before the list.',
      explain: W.sent(c[0] + '<b>:</b> ' + c[2] + '.'), meta: { k: 'g5-colon', list: c[2] } });
  }
  function colonTf() {
    var c = R.pick(COLON), right = R.int(0, 1) === 1, shown = right ? colRight(c) : c[1] + ': ' + c[2] + '.';
    return { q: 'Is the colon used the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['A complete sentence comes before the colon.', 'The words before the colon are not a complete sentence.'], answer: right ? 0 : 1 },
      hint: 'Cover the list. Is what is left a complete sentence?', explain: W.sent(colRight(c)), meta: { k: 'g5-colon-tf', s: shown } };
  }
  function capWord(lv) {
    var c = R.pick(CAPS), words = c[0].replace(/\.$/, '').split(' '), tiles = lv > 1 ? words : words.slice(Math.max(0, words.indexOf(c[1]) - 2));
    return Q.tiles('One word needs a capital. Tap it.', c[1], tiles.filter(function (w) { return w !== c[1]; }), { fig: W.sent(c[0]),
      hint: 'Names of places, languages, months and groups need capitals.', explain: W.sent(c[0].replace(c[1], '<b>' + c[2] + '</b>')), meta: { k: 'g5-cap-word', s: c[0] } });
  }
  function capFixed() {
    var c = R.pick(CAPS), right = c[0].replace(c[1], c[2]);
    return Q.one('Which is written the right way?', right, [c[0]], { hint: 'Check the names.', explain: W.sent(right), meta: { k: 'g5-cap-fixed', s: c[0] } });
  }

  var A0 = APPOS[0], P0 = PART[2], C0 = COLON[0];
  Atlas.register('punctuation', {
    lessons: [{
      id: 'commas', title: 'Commas for extra information', sub: 'Set off words that add to a sentence.',
      concepts: [
        { slug: 'appositive', title: 'Commas around words that rename', exp: ['B3.3'], skill: 'commas',
          model: [
            step(W.sent('My aunt flew to Iqaluit.'), 'Who is she?'),
            step(W.sent('My aunt<b>,</b> <mark class="hl">a pilot</mark><b>,</b> flew to Iqaluit.'), 'A comma before and after.'),
            step(W.sent('My aunt flew to Iqaluit.'), 'Take it out: the sentence still works.')
          ],
          guided: [function () { return appositive(1); }, findAppositive],
          check: [function () { return appositive(2); }, findAppositive],
          coach: '<p>These words are called an <b>appositive</b>. Think of the commas as a pair of hands that lift the extra words out.</p>',
          mistake: '<p>Putting only the first comma. Extra words in the middle of a sentence need a comma on both sides.</p>' },
        { slug: 'participle', title: 'A comma after an -ing phrase at the start', exp: ['B3.3'], skill: 'commas',
          model: [
            step(W.sent('<mark class="hl">Holding the map</mark>'), 'It tells what someone was doing.'),
            step(W.sent(P0[0] + '<b>,</b> ' + P0[1] + '.'), 'Comma, then who did it.'),
            step(W.sent('Shivering in the wind<b>,</b> we waited.'), 'Same pattern.')
          ],
          guided: [function () { return participle(1); }, commaTf],
          check: [function () { return participle(2); }, pickCommas],
          coach: '<p>This is called a <b>participial phrase</b>. Read the sentence aloud: the comma is where you naturally pause.</p>',
          mistake: '<p>Putting the comma inside the phrase (Holding, the map). Keep the whole phrase together, then the comma.</p>' }
      ]
    }, {
      id: 'colons-caps', title: 'Colons and capitals', sub: 'Introduce a list, and capitalize names.',
      concepts: [
        { slug: 'colon', title: 'A colon after a complete sentence, before a list', exp: ['B3.3'], skill: 'colons-caps',
          model: [
            step(W.sent(C0[0] + '.'), 'This could end with a period.'),
            step(W.sent(C0[0] + '<b>:</b> ' + C0[2] + '.'), 'Then the list.'),
            step(W.sent(C0[1] + ': ...'), 'Not complete: no colon here.')
          ],
          guided: [function () { return colon(1); }, colonTf],
          check: [function () { return colon(2); }, colonTf],
          coach: '<p>Cover the list with your hand. If what is left could end with a period, a colon can go there.</p>',
          mistake: '<p>Putting a colon straight after a verb (We need: ...). The words before the colon must make a complete sentence.</p>' },
        { slug: 'capitals', title: 'Capitals for names of places, languages and months', exp: ['B3.3'], skill: 'colons-caps',
          model: [
            step(W.sent('a lake &middot; <b>L</b>ake <b>N</b>ipissing'), 'Any lake: small. Its name: capitals.'),
            step(W.sent('<b>O</b>jibwe &middot; <b>F</b>rench &middot; <b>J</b>uly'), 'Languages and months too.')
          ],
          guided: [function () { return capWord(1); }, capFixed],
          check: [function () { return capWord(2); }, capFixed],
          coach: '<p>Ask: "Is it the name of one special place, language, month or group?" If yes, every important word gets a capital.</p>',
          mistake: '<p>Capitalizing every word that seems important (the Lake). Only names get capitals.</p>' }
      ]
    }],
    practice: [
      { id: 'commas', name: 'Commas for extra information', code: 'B3.3', gen: appositive },
      { id: 'colons-caps', name: 'Colons and capitals', code: 'B3.3', gen: colon }
    ]
  });

  Q.shapes('punctuation', {
    commas: [[1, 'find', findAppositive], [1, 'participle', participle], [2, 'true-false', commaTf], [2, 'pick', pickCommas]],
    'colons-caps': [[1, 'cap-word', capWord], [1, 'cap-fixed', capFixed], [2, 'true-false', colonTf]]
  });
})();
