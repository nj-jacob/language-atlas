/* Grade 5: capitals and punctuation. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 5, B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate
   meaning clearly and coherently, including the use of commas to set off advanced phrases or clauses such as appositives and participles,
   and colons for introducing a list after a complete sentence". All sentences are written for this site.
   Answer checks: tests/verify/grade5-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* appositives: [who or what, the words that rename it, the rest of the sentence] */
  var APPOS = [['My aunt', 'a pilot', 'flew to Iqaluit'], ['Mr. Singh', 'our coach', 'blew the whistle'], ['Lake Superior', 'the largest of the Great Lakes', 'is very cold'],
    ['Biscuit', 'our old dog', 'sleeps all day'], ['Dr. Lee', 'the town vet', 'checked the kitten'], ['Halifax', 'a city by the ocean', 'has a busy harbour'], ['Rosa', 'my older sister', 'plays hockey'],
    ['Ms. Chen', 'our music teacher', 'plays the cello'], ['The CN Tower', 'a famous landmark', 'stands in Toronto'], ['Zara', 'the team captain', 'gave a speech'],
    ['Iqaluit', 'the capital of Nunavut', 'sits on Frobisher Bay'], ['My grandfather', 'a retired farmer', 'still grows potatoes'], ['Luna', 'our grey cat', 'hid under the bed'],
    ['The Rideau Canal', 'a skating rink in winter', 'runs through Ottawa'], ['Kenji', 'my best friend', 'moved to Calgary']];
  /* -ing phrases at the start: [the phrase, the rest] */
  var PART = [['Smiling', 'Jun walked onto the court'], ['Laughing at the joke', 'the class could not stop'], ['Holding the map', 'Tala led the way'],
    ['Shivering in the wind', 'we waited for the bus'], ['Carrying a heavy box', 'Dad climbed the stairs'], ['Paddling hard', 'the girls reached the island'],
    ['Waving goodbye', 'Grandma drove away'], ['Humming a song', 'Owen washed the dishes'], ['Racing down the hill', 'the sled hit a bump'], ['Looking out the window', 'Priya saw the first snow'],
    ['Clutching her ticket', 'Ava boarded the ferry'], ['Yawning loudly', 'the puppy curled up'], ['Hiding behind the tree', 'the fox watched the hens'], ['Stirring the soup', 'Dad tasted it again']];
  /* lists after a colon: [a complete sentence, a start that is not complete, the list] */
  var COLON = [['Pack three things for the hike', 'For the hike, pack', 'a hat, water and sunscreen'], ['We saw four animals at the pond', 'At the pond we saw', 'a heron, two frogs, a turtle and a muskrat'],
    ['Our team needs these players', 'Our team needs', 'a goalie, two defenders and a forward'], ['Grandma grows three herbs', 'Grandma grows', 'mint, sage and basil'], ['The flag has two colours', 'The colours of the flag are', 'red and white'],
    ['I need three colours for the poster', 'For the poster I need', 'blue, green and gold'], ['Our garden has four vegetables', 'Our garden has', 'carrots, beans, peas and squash'],
    ['The recipe needs three things', 'The recipe needs', 'flour, salt and water'], ['Mei plays two instruments', 'Mei plays', 'the violin and the drums'],
    ['We visited three provinces', 'We visited', 'Manitoba, Saskatchewan and Alberta'], ['These animals hibernate', 'Animals that hibernate are', 'bears, bats and groundhogs'],
    ['Bring these to the game', 'To the game, bring', 'a blanket, a snack and some water']];
  /* names that need capitals: [the sentence with the capital missing, the word, how it should look, what it names] */
  var CAPS = [['We paddled across lake Nipissing.', 'lake', 'Lake', 'a place'], ['My friend speaks ojibwe and English.', 'ojibwe', 'Ojibwe', 'a language'], ['The ottawa River flows past the city.', 'ottawa', 'Ottawa', 'a place'],
    ['Our school is on maple Street.', 'maple', 'Maple', 'a place'], ['My cousin moved to nova Scotia.', 'nova', 'Nova', 'a place'], ['The trip is in july.', 'july', 'July', 'a month'],
    ['We swam in the pacific Ocean.', 'pacific', 'Pacific', 'a place'], ['My birthday is in october.', 'october', 'October', 'a month'], ['Grandpa speaks mandarin at home.', 'mandarin', 'Mandarin', 'a language'],
    ['We drove through the rocky Mountains.', 'rocky', 'Rocky', 'a place'], ['The parade is on canada Day.', 'canada', 'Canada', 'a special day'], ['Mom grew up in prince Edward Island.', 'prince', 'Prince', 'a place'],
    ['Our class reads in cree on Fridays.', 'cree', 'Cree', 'a language'], ['School starts again in september.', 'september', 'September', 'a month'], ['We watched fireworks on new Year' + '’' + 's Eve.', 'new', 'New', 'a special day']];
  var NAMES_KIND = ['a place', 'a language', 'a month', 'a special day'];

  function appRight(a) { return a[0] + ', ' + a[1] + ', ' + a[2] + '.'; }
  function appWrong(a) { return [a[0] + ' ' + a[1] + ', ' + a[2] + '.', a[0] + ', ' + a[1] + ' ' + a[2] + '.', a[0] + ' ' + a[1] + ' ' + a[2] + '.']; }
  function appMark(a) { return W.sent(a[0] + '<b>,</b> <mark class="hl">' + a[1] + '</mark><b>,</b> ' + a[2] + '.'); }
  function partRight(p) { return p[0] + ', ' + p[1] + '.'; }
  function partWrong(p) { var w = p[0].split(' '); return [p[0] + ' ' + p[1] + '.', w.length > 1 ? w[0] + ', ' + w.slice(1).join(' ') + ' ' + p[1] + '.' : p[0] + ' ' + p[1] + ',.' ]; }
  function partMark(p) { return W.sent('<mark class="hl">' + p[0] + '</mark><b>,</b> ' + p[1] + '.'); }
  function colRight(c) { return c[0] + ': ' + c[2] + '.'; }
  function colMark(c) { return W.sent(c[0] + '<b>:</b> ' + c[2] + '.'); }

  /* ---------- commas around words that rename ---------- */
  function appositive(lv) {
    var a = R.pick(APPOS);
    return Q.one('Which is punctuated the right way?', appRight(a), R.some(appWrong(a), lv > 1 ? 3 : 1), { prompt: 'Which words rename <b>' + a[0] + '</b>? They need a comma on each side.',
      hint: 'Extra information that renames someone gets a comma before and after.', explain: appMark(a), meta: { k: 'g5-appositive', who: a[0] } });
  }
  function findAppositive(lv) {
    var a = R.pick(APPOS);
    return Q.tiles('Which words are the <b>extra information</b> that renames <b>' + a[0] + '</b>?', a[1], [a[2]], { fig: W.sent(appRight(a)), prompt: 'Look between the commas.',
      hint: 'It sits between the commas.', explain: appMark(a), meta: { k: 'g5-find-app', who: a[0] } });
  }
  function appTf(lv) {
    var a = R.pick(APPOS), right = R.int(0, 1) === 1, shown = right ? appRight(a) : R.pick(appWrong(a));
    return { q: Q.name() + ' wrote this. Are the commas right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['The renaming words have a comma on each side.', 'A comma is missing.'], answer: right ? 0 : 1 },
      hint: 'Find the words that rename. Is there a comma on each side?', explain: appMark(a), meta: { k: 'g5-comma-tf', s: shown } };
  }
  function pickApp(lv) {
    var as = R.some(APPOS, lv > 1 ? 4 : 3);
    return Q.all('Pick every sentence with the commas in the right places.', as.slice(0, 2).map(appRight), as.slice(2).map(function (a) { return R.pick(appWrong(a)); }), {
      hint: 'Words that rename someone need a comma on each side.', explain: appMark(as[0]), meta: { k: 'g5-pick-commas' } });
  }
  function takeOut(lv) {
    var a = R.pick(APPOS), other = R.pick(APPOS.filter(function (x) { return x !== a; }));
    return Q.one('Lift out the extra words. What sentence is left?', a[0] + ' ' + a[2] + '.', [a[1] + ' ' + a[2] + '.'].concat(lv > 1 ? [a[0] + ' ' + other[2] + '.'] : []), { fig: W.sent(appRight(a)),
      prompt: 'The commas hold the extra words. Lift them out.', hint: 'Take out what sits between the commas.', explain: W.sent(a[0] + ' ' + a[2] + '.'), meta: { k: 'g5-take-out', s: appRight(a) } });
  }

  /* ---------- a comma after an -ing phrase ---------- */
  function participle(lv) {
    var p = R.pick(PART);
    return Q.one('Which is punctuated the right way?', partRight(p), partWrong(p).slice(0, lv > 1 ? 2 : 1), { prompt: 'Where does the <b>-ing</b> phrase end?',
      hint: 'Put a comma after the -ing phrase at the start.', explain: partMark(p), meta: { k: 'g5-participle', p: p[0] } });
  }
  function partTf(lv) {
    var p = R.pick(PART), right = R.int(0, 1) === 1, shown = right ? partRight(p) : R.pick(partWrong(p));
    return { q: Q.name() + ' wrote this. Is the comma right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['The comma comes right after the -ing phrase.', 'The comma is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Find the end of the -ing phrase.', explain: partMark(p), meta: { k: 'g5-part-tf', s: shown } };
  }
  function findPart(lv) {
    var p = R.pick(PART);
    return Q.tiles('Which words are the <b>-ing phrase</b>?', p[0], [p[1]], { fig: W.sent(partRight(p)), prompt: 'It tells what someone was doing.',
      hint: 'It starts with an -ing word and ends at the comma.', explain: partMark(p), meta: { k: 'g5-find-part', p: p[0] } });
  }
  function commaAfter(lv) {
    var p = R.pick(PART.filter(function (x) { return x[0].split(' ').length > 1; })), words = (p[0] + ' ' + p[1]).split(' '), last = p[0].split(' ').pop(), seen = {};
    var wrong = words.slice(0, p[0].split(' ').length + 2).filter(function (w) { if (w === last || seen[w]) return false; seen[w] = 1; return true; });
    return Q.tiles('After which word does the comma go?', last, R.some(wrong, lv > 1 ? 3 : 2), { fig: W.sent(p[0] + ' ' + p[1] + '.'), prompt: 'Where does the -ing phrase end?',
      hint: 'Keep the whole -ing phrase together, then the comma.', explain: partMark(p), meta: { k: 'g5-comma-after', p: p[0] } });
  }
  function pickPart(lv) {
    var ps = R.some(PART, lv > 1 ? 4 : 3);
    return Q.all('Pick every sentence with the comma in the right place.', ps.slice(0, 2).map(partRight), ps.slice(2).map(function (p) { return partWrong(p)[0]; }), {
      hint: 'The comma comes right after the -ing phrase.', explain: partMark(ps[0]), meta: { k: 'g5-pick-part' } });
  }

  /* ---------- colons ---------- */
  function colon(lv) {
    var c = R.pick(COLON), wrong = [c[1] + ': ' + c[2] + '.'].concat(lv > 1 ? [c[0] + ', ' + c[2] + '.'] : []);
    return Q.one('Which uses a colon the right way?', colRight(c), wrong, { prompt: 'Is the part before the colon a complete sentence?', hint: 'A colon comes after a complete sentence, before the list.',
      explain: colMark(c), meta: { k: 'g5-colon', list: c[2] } });
  }
  function colonTf(lv) {
    var c = R.pick(COLON), right = R.int(0, 1) === 1, shown = right ? colRight(c) : c[1] + ': ' + c[2] + '.';
    return { q: 'Is the colon used the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['A complete sentence comes before the colon.', 'The words before the colon are not a complete sentence.'], answer: right ? 0 : 1 },
      hint: 'Cover the list. Is what is left a complete sentence?', explain: colMark(c), meta: { k: 'g5-colon-tf', s: shown } };
  }
  function colonOk(lv) {
    var c = R.pick(COLON), whole = R.int(0, 1) === 1, start = whole ? c[0] : c[1];
    return { q: 'Can a colon go right after these words?', fig: W.sent(start + W.gap()), type: 'tap', tiles: ['Yes: it is a complete sentence.', 'No: it is not complete.'], answer: whole ? 0 : 1,
      prompt: 'Could it end with a period?', hint: 'Could it end with a period?', explain: colMark(c), meta: { k: 'g5-colon-ok', start: start } };
  }
  function pickColon(lv) {
    var cs = R.some(COLON, lv > 1 ? 4 : 3);
    return Q.all('Pick every sentence that uses a colon the right way.', cs.slice(0, 2).map(colRight), cs.slice(2).map(function (c) { return c[1] + ': ' + c[2] + '.'; }), {
      hint: 'Cover the list. Is what is left a complete sentence?', explain: colMark(cs[0]), meta: { k: 'g5-pick-colon' } });
  }

  /* ---------- capitals ---------- */
  function capWord(lv) {
    var c = R.pick(CAPS), words = c[0].replace(/\.$/, '').split(' '), tiles = lv > 1 ? words : words.slice(Math.max(0, words.indexOf(c[1]) - 2));
    return Q.tiles('One word needs a capital. Tap it.', c[1], tiles.filter(function (w) { return w !== c[1]; }), { fig: W.sent(c[0]), prompt: 'Look for the name of a place, language, month or special day.',
      hint: 'Names of places, languages, months and special days need capitals.', explain: W.sent(c[0].replace(c[1], '<b>' + c[2] + '</b>')), meta: { k: 'g5-cap-word', s: c[0] } });
  }
  function capFixed(lv) {
    var c = R.pick(CAPS), right = c[0].replace(c[1], c[2]), other = c[0].replace(/^(\w)/, function (x) { return x.toLowerCase(); });
    return Q.one('Which is written the right way?', right, [c[0]].concat(lv > 1 ? [other] : []), { prompt: 'Check every name.', hint: 'Check the names.', explain: W.sent(right), meta: { k: 'g5-cap-fixed', s: c[0] } });
  }
  function capTf(lv) {
    var c = R.pick(CAPS), right = R.int(0, 1) === 1, shown = right ? c[0].replace(c[1], c[2]) : c[0];
    return { q: Q.name() + ' wrote this. Are the capitals right?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Every name has its capitals.', 'A name is missing a capital.'], answer: right ? 0 : 1 },
      hint: 'Find the name. Does every word of it have a capital?', explain: W.sent(c[0].replace(c[1], '<b>' + c[2] + '</b>')), meta: { k: 'g5-cap-tf', s: shown } };
  }
  function capWhy(lv) {
    var c = R.pick(CAPS);
    return Q.tiles('Why does <b>' + c[2] + '</b> need a capital?', 'It names ' + c[3] + '.', NAMES_KIND.filter(function (k) { return k !== c[3]; }).slice(0, lv > 1 ? 3 : 2).map(function (k) { return 'It names ' + k + '.'; }), {
      fig: W.sent(c[0].replace(c[1], '<b>' + c[2] + '</b>')), hint: 'Is it a place, a language, a month or a special day?', explain: '<b>' + c[2] + '</b> names ' + c[3] + '.', meta: { k: 'g5-cap-why', word: c[2] } });
  }

  var A0 = APPOS[0], A1 = APPOS[10], P0 = PART[2], P1 = PART[9], C0 = COLON[0], C1 = COLON[9];
  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'commas', title: 'Commas for extra information', sub: 'Set off words that add to a sentence.',
      concepts: [
        { slug: 'appositive', title: 'Commas around words that rename', exp: ['B3.3'], skill: 'appositives',
          model: [
            step(W.sent(A0[0] + ' ' + A0[2] + '.'), 'Who is she?'),
            step(appMark(A0), 'A comma before and after.'),
            step(W.sent(A0[0] + ' ' + A0[2] + '.'), 'Lift them out: the sentence still works.'),
            step(W.sent(A1[0] + ' ' + A1[2] + '.'), 'Second example. Which place is it?'),
            step(appMark(A1), 'The extra words sit between two commas.')
          ],
          guided: [function () { return appositive(1); }, function () { return findAppositive(1); }, function () { return takeOut(1); }],
          check: [function () { return appositive(2); }, function () { return findAppositive(2); }, function () { return appTf(2); }, function () { return pickApp(2); }, function () { return appositive(3); }],
          coach: '<p>These words are called an <b>appositive</b>. Think of the commas as a pair of hands that lift the extra words out.</p>',
          mistake: '<p>Putting only the first comma. Extra words in the middle of a sentence need a comma on both sides.</p>' },
        { slug: 'participle', title: 'A comma after an -ing phrase at the start', exp: ['B3.3'], skill: 'participles',
          model: [
            step(W.sent('<mark class="hl">' + P0[0] + '</mark>'), 'It tells what someone was doing.'),
            step(partMark(P0), 'Comma, then who did it.'),
            step(W.sent('<mark class="hl">' + P1[0] + '</mark>'), 'Second example.'),
            step(partMark(P1), 'Keep the whole phrase together, then the comma.')
          ],
          guided: [function () { return participle(1); }, function () { return findPart(1); }, function () { return partTf(1); }],
          check: [function () { return participle(2); }, function () { return commaAfter(2); }, function () { return partTf(2); }, function () { return pickPart(2); }, function () { return participle(3); }],
          coach: '<p>This is called a <b>participial phrase</b>. Read the sentence aloud: the comma is where you naturally pause.</p>',
          mistake: '<p>Putting the comma inside the phrase (Holding, the map). Keep the whole phrase together, then the comma.</p>' }
      ]
    }, {
      id: 'colons-caps', title: 'Colons and capitals', sub: 'Introduce a list, and capitalize names.',
      concepts: [
        { slug: 'colon', title: 'A colon after a complete sentence, before a list', exp: ['B3.3'], skill: 'colons',
          model: [
            step(W.sent(C0[0] + '.'), 'This could end with a period.'),
            step(colMark(C0), 'Then the list.'),
            step(W.sent(C1[1] + ' ...'), 'Second example. Could this end with a period? No.'),
            step(colMark(C1), 'Add the missing words first. Now the colon fits.')
          ],
          guided: [function () { return colon(1); }, function () { return colonOk(1); }, function () { return colonTf(1); }],
          check: [function () { return colon(2); }, function () { return colonOk(2); }, function () { return colonTf(2); }, function () { return pickColon(2); }, function () { return colon(3); }],
          coach: '<p>Cover the list with your hand. If what is left could end with a period, a colon can go there.</p>',
          mistake: '<p>Putting a colon straight after a verb (We need: ...). The words before the colon must make a complete sentence.</p>' },
        { slug: 'capitals', title: 'Capitals for names of places, languages and months', exp: ['B3.3'], skill: 'capitals',
          model: [
            step(W.sent('a lake &middot; <b>L</b>ake <b>N</b>ipissing'), 'Any lake: small. Its name: capitals.'),
            step(W.sent('We paddled across <b>L</b>ake Nipissing.'), 'Every word of the name.'),
            step(W.sent('a language &middot; <b>O</b>jibwe'), 'Second example.'),
            step(W.sent('<b>O</b>jibwe &middot; <b>F</b>rench &middot; <b>J</b>uly &middot; <b>C</b>anada <b>D</b>ay'), 'Languages, months and special days too.')
          ],
          guided: [function () { return capWord(1); }, function () { return capFixed(1); }, function () { return capWhy(1); }],
          check: [function () { return capWord(2); }, function () { return capFixed(2); }, function () { return capTf(2); }, function () { return capWhy(2); }, function () { return capWord(3); }],
          coach: '<p>Ask: "Is it the name of one special place, language, month or day?" If yes, every important word gets a capital.</p>',
          mistake: '<p>Capitalizing every word that seems important (the Lake). Only names get capitals.</p>' }
      ]
    }],
    practice: [
      { id: 'appositives', name: 'Commas around words that rename', code: 'B3.3', gen: appositive },
      { id: 'participles', name: 'A comma after an -ing phrase', code: 'B3.3', gen: participle },
      { id: 'colons', name: 'Colons before a list', code: 'B3.3', gen: colon },
      { id: 'capitals', name: 'Capitals for names', code: 'B3.3', gen: capWord }
    ]
  });

  Q.shapes('punctuation', {
    appositives: [[1, 'find', findAppositive], [1, 'lift-out', takeOut], [2, 'true-false', appTf], [2, 'pick', pickApp]],
    participles: [[1, 'find', findPart], [1, 'comma-after', commaAfter], [2, 'true-false', partTf], [2, 'pick', pickPart]],
    colons: [[1, 'colon-ok', colonOk], [1, 'true-false', colonTf], [2, 'pick', pickColon]],
    capitals: [[1, 'fixed', capFixed], [1, 'why', capWhy], [2, 'true-false', capTf]]
  });
})();
