/* Grade 2: capitals and punctuation.
   Ontario 2023 Language, Grade 2:
   B3.3 "use their understanding of the meaning and function of capitalization and punctuation to communicate clearly, including capital letters
        for proper nouns, commas to separate items in lists, apostrophes for possessives, and quotation marks for direct speech"
   For the child: names, places, days and months; commas in lists; 's to show who owns it; speech marks.
   All sentences are written for this site. Answer checks: tests/verify/grade2-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var OQ = '“', CQ = '”', AP = '’';

  /* sentences with their proper nouns (the words that need a capital, other than the first word) */
  var PROPER = [['We drove to Ottawa on Friday.', ['Ottawa', 'Friday']], ['My cousin Leila lives in Halifax.', ['Leila', 'Halifax']], ['In July we swam in Lake Huron.', ['July', 'Lake', 'Huron']],
    ['Our class visited the Royal Ontario Museum.', ['Royal', 'Ontario', 'Museum']], ['On Monday, Omar went to the dentist.', ['Monday', 'Omar']], ['My birthday is in March.', ['March']],
    ['Grandma flew from Winnipeg to Iqaluit.', ['Winnipeg', 'Iqaluit']], ['Theo and Mei play soccer on Saturday.', ['Theo', 'Mei', 'Saturday']]];
  var PROPERS = ['Canada', 'Toronto', 'Monday', 'April', 'Kai', 'Lake Superior', 'Thunder Bay', 'Sunday', 'October', 'Priya'];
  var COMMON = ['dog', 'city', 'lake', 'month', 'teacher', 'school', 'park', 'river'];
  /* lists: [start, items] */
  var LIST = [['We packed', ['apples', 'crackers', 'cheese']], ['I saw', ['a fox', 'a deer', 'a hawk']], ['Mei needs', ['glue', 'paper', 'scissors']],
    ['The flag is', ['red', 'white', 'blue']], ['We planted', ['beans', 'peas', 'carrots', 'squash']], ['Kai likes', ['hockey', 'swimming', 'chess']]];
  function listOk(l) { var it = l[1]; return l[0] + ' ' + it.slice(0, -1).join(', ') + ' and ' + it[it.length - 1] + '.'; }
  function listNone(l) { var it = l[1]; return l[0] + ' ' + it.slice(0, -1).join(' ') + ' and ' + it[it.length - 1] + '.'; }
  function listWrong(l) { var it = l[1]; return l[0] + ', ' + it.slice(0, -1).join(' ') + ' and ' + it[it.length - 1] + '.'; }
  /* owners: [owner, thing] */
  var OWN = [['Kai', 'hat'], ['Ava', 'bike'], ['the dog', 'bowl'], ['Grandpa', 'canoe'], ['Noor', 'book'], ['my sister', 'scarf'], ['the cat', 'tail'], ['Omar', 'lunch']];
  function owns(o) { return o[0] + AP + 's ' + o[1]; }
  /* [who, what they say, end mark] */
  var SAY = [['Ava', 'I like this song', '.'], ['Kai', 'Can I come too', '?'], ['Mom', 'Watch out', '!'], ['Theo', 'It is snowing', '.'], ['Priya', 'Where is my hat', '?'], ['Grandma', 'Supper is ready', '.']];
  function speech(s) { return s[0] + ' said, ' + OQ + s[1] + s[2] + CQ; }
  function noMarks(s) { return s[0] + ' said, ' + s[1] + s[2]; }
  function wrongPlace(s) { return OQ + s[0] + ' said, ' + s[1] + s[2] + CQ; }
  function halfMarks(s) { return s[0] + ' said, ' + OQ + s[1] + s[2]; }

  /* ---------- question makers: capitals ---------- */
  function needCap() {
    var p = R.pick(PROPER), words = p[0].replace(/[.,]/g, '').split(' '), rest = words.slice(1).map(function (w) { return w.toLowerCase(); });
    var right = p[1].map(function (w) { return w.toLowerCase(); }), wrong = rest.filter(function (w, i) { return right.indexOf(w) < 0 && rest.indexOf(w) === i; }).slice(0, 3);
    var shown = p[0].split(' ').map(function (w, i) { return i ? w.toLowerCase() : w; }).join(' ');
    return Q.all('Pick every word that needs a <b>capital letter</b>.', right, wrong, { fig: W.sent(shown), prompt: 'Is it the name of a person, a place, a day or a month?',
      hint: 'Names of people, places, days and months start with a capital.', explain: W.sent(p[0]), meta: { k: 'g2-need-cap', s: p[0] } });
  }
  function rightCap(lv) {
    var p = R.pick(PROPER), wrong = p[0].replace(p[1][0], p[1][0].toLowerCase()), wrong2 = p[0].charAt(0).toLowerCase() + p[0].slice(1);
    return Q.one('Which sentence uses capitals the right way?', p[0], lv > 1 ? [wrong, wrong2] : [wrong], { hint: 'Look at the first word, and at each name.', explain: W.sent(p[0]), meta: { k: 'g2-right-cap', s: p[0] } });
  }
  function properPick() {
    var right = R.some(PROPERS, 2), wrong = R.some(COMMON, 2);
    return Q.all('Pick every word that always starts with a <b>capital</b>.', right, wrong, { hint: 'A special name: a person, a place, a day or a month.', explain: right.join(', ') + ' are names.', meta: { k: 'g2-proper-pick' } });
  }
  function capTf() {
    var p = R.pick(PROPER), w = R.pick(p[1]), right = R.int(0, 1) === 1, shown = right ? p[0] : p[0].replace(w, w.toLowerCase());
    return { q: 'Are the capitals right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['Every name starts with a capital.', 'A name is missing its capital.'], answer: right ? 0 : 1 },
      hint: 'Check each name of a person, place, day or month.', explain: W.sent(p[0]), meta: { k: 'g2-cap-tf', shown: shown, s: p[0] } };
  }

  /* ---------- question makers: commas in lists, and owners ---------- */
  function listComma(lv) {
    var l = R.pick(LIST);
    return Q.one('Which sentence has its <b>commas</b> in the right place?', listOk(l), lv > 1 ? [listNone(l), listWrong(l)] : [listNone(l)], { prompt: 'Find the things in the list.',
      hint: 'A comma goes between things in a list. Before the last one, use and.', explain: W.sent(listOk(l)), meta: { k: 'g2-list', start: l[0] } });
  }
  function commaAfter() {
    var l = R.pick(LIST.filter(function (x) { return x[1].length === 3 && x[1].every(function (i) { return i.indexOf(' ') < 0; }); })), words = listNone(l).replace(/\.$/, '').split(' ');
    return { q: 'Where does the comma go? Tap the word just before it.', fig: W.sent(listNone(l)), type: 'tap', tiles: words, answer: words.indexOf(l[1][0]),
      hint: 'A comma goes between the first two things in the list.', explain: W.sent(listOk(l)), meta: { k: 'g2-comma-after', start: l[0] } };
  }
  function owner(lv) {
    var o = R.pick(OWN), wrong = [o[0] + 's ' + o[1], o[0] + ' ' + o[1], o[0] + 's' + AP + ' ' + o[1]];
    return Q.tiles('Which one means <b>the ' + o[1] + ' that belongs to ' + o[0] + '</b>?', owns(o), wrong.slice(0, lv > 1 ? 3 : 2), { prompt: 'Look for the apostrophe and s.',
      hint: 'Add ’s to the owner.', explain: W.sent(owns(o)), meta: { k: 'g2-owner', o: o[0], t: o[1] } });
  }
  function ownerMeans() {
    var o = R.pick(OWN), other = R.pick(OWN.filter(function (x) { return x[1] !== o[1] && x[0] !== o[0]; }));
    return Q.one('What does <b>' + owns(o) + '</b> mean?', 'the ' + o[1] + ' that belongs to ' + o[0], ['the ' + o[1] + ' that belongs to ' + other[0], 'more than one ' + o[0]], {
      hint: 'The word with ’s is the owner.', explain: '<b>' + o[0] + '</b> owns the ' + o[1] + '.', meta: { k: 'g2-owner-means', w: owns(o) } });
  }

  /* ---------- question makers: speech marks ---------- */
  function pickSpeech(lv) {
    var s = R.pick(SAY);
    return Q.one('Which sentence is written the right way?', speech(s), lv > 1 ? [noMarks(s), wrongPlace(s), halfMarks(s)] : [noMarks(s)], {
      prompt: 'Find the words ' + s[0] + ' says. Are they inside the speech marks?', hint: 'Speech marks go around only the words someone says.', explain: W.sent(speech(s)),
      steps: ['Find the words ' + s[0] + ' says: <b>' + s[1] + '</b>.', 'Put speech marks around them.', 'The end mark goes inside the speech marks.'], meta: { k: 'g2-speech', who: s[0] } });
  }
  function saysWhat() {
    var s = R.pick(SAY);
    return Q.one('What does <b>' + s[0] + '</b> say?', s[1] + s[2], [s[0] + ' said', s[0] + ' said, ' + s[1]], { fig: W.sent(speech(s)), hint: 'Look inside the speech marks.',
      explain: 'The words inside the speech marks: <b>' + s[1] + s[2] + '</b>', meta: { k: 'g2-says-what', who: s[0] } });
  }
  /* tap the word where the opening speech mark goes */
  function markPlace() {
    var s = R.pick(SAY), words = noMarks(s).split(' ');
    return { q: 'The first speech mark goes just before which word?', fig: W.sent(noMarks(s)), type: 'tap', tiles: words, answer: words.indexOf(s[1].split(' ')[0]),
      hint: 'Find the first word ' + s[0] + ' says.', explain: W.sent(speech(s)), meta: { k: 'g2-mark-place', who: s[0] } };
  }
  function speechTf() {
    var s = R.pick(SAY), right = R.int(0, 1) === 1, shown = right ? speech(s) : R.pick([noMarks(s), wrongPlace(s)]);
    return { q: 'Are the speech marks right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['They go around only the words said.', 'They are missing, or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Find the words someone says.', explain: W.sent(speech(s)), meta: { k: 'g2-speech-tf', shown: shown, who: s[0] } };
  }

  Atlas.register('punctuation', {
    lessons: [{
      id: 'capitals', title: 'Capital letters for names', sub: 'People, places, days and months.',
      concepts: [
        { slug: 'names', title: 'Names of people and places start with a capital', exp: ['B3.3'], skill: 'capitals',
          model: [
            step(W.sent('My cousin <mark class="hl">L</mark>eila lives in <mark class="hl">H</mark>alifax.'), 'A person. A place.'),
            step(W.tile('city') + ' &rarr; ' + W.tile('Toronto'), 'Any city: small letter. A city' + AP + 's name: capital.')
          ],
          guided: [rightCap, properPick],
          check: [needCap, properPick],
          coach: '<p>Write the names of family members and your town together. Point to each capital letter.</p>',
          mistake: '<p>Using a capital for every noun ("my Dog"). Only special names get a capital.</p>' },
        { slug: 'days', title: 'Days and months start with a capital', exp: ['B3.3'], skill: 'capitals',
          model: [
            step(W.sent('On <mark class="hl">M</mark>onday, Omar went to the dentist.')),
            step(W.sent('My birthday is in <mark class="hl">M</mark>arch.'))
          ],
          guided: [capTf, rightCap],
          check: [needCap, capTf],
          coach: '<p>Write the date at the top of each page of writing: "Monday, March 3". It builds the habit.</p>',
          mistake: '<p>Forgetting the capital on months. Months are names too.</p>' }
      ]
    }, {
      id: 'commas-owners', title: 'Commas and apostrophes', sub: 'Lists, and showing who owns something.',
      concepts: [
        { slug: 'list', title: 'Commas go between things in a list', exp: ['B3.3'], skill: 'commas-owners',
          model: [
            step(W.sent('We packed apples<b>,</b> crackers and cheese.'), 'A comma after apples.'),
            step(W.sent('We planted beans<b>,</b> peas<b>,</b> carrots and squash.'), 'Before the last one: <b>and</b>.')
          ],
          guided: [function () { return listComma(1); }, commaAfter],
          check: [function () { return listComma(2); }, commaAfter],
          coach: '<p>Make a shopping list together, then turn it into a sentence. Each comma is a short pause.</p>',
          mistake: '<p>Putting a comma after the first word of the sentence. Commas go between the things in the list.</p>' },
        { slug: 'owner', title: '’s shows who owns it', exp: ['B3.3'], skill: 'commas-owners',
          model: [
            step(W.sent('Kai has a hat.')),
            step(W.sent('Kai<b>’s</b> hat'), 'The hat belongs to Kai.'),
            step(W.sent('the dog<b>’s</b> bowl'), 'The bowl belongs to the dog.')
          ],
          guided: [function () { return owner(1); }, ownerMeans],
          check: [function () { return owner(2); }, ownerMeans],
          coach: '<p>Label things around the house with sticky notes: "Dad’s mug", "Noor’s shoes".</p>',
          mistake: '<p>Writing "Kais hat" with no apostrophe. Without it, it looks like more than one Kai.</p>' }
      ]
    }, {
      id: 'speech', title: 'Speech marks', sub: 'Show the words someone says.',
      concepts: [
        { slug: 'speech-marks', title: 'Speech marks go around the words someone says', exp: ['B3.3'], skill: 'speech',
          model: [
            step(W.means('talk', 'I like this song.'), 'Ava says this.'),
            step(W.sent('Ava said, <b>' + OQ + '</b>I like this song.<b>' + CQ + '</b>'), 'Marks at the start and the end.'),
            step(W.sent('Kai said, ' + OQ + 'Can I come too?' + CQ), 'The ? goes inside.')
          ],
          guided: [saysWhat, function () { return pickSpeech(1); }],
          check: [function () { return pickSpeech(2); }, speechTf],
          coach: '<p>Draw a speech bubble around what someone says in a comic, then show how speech marks do the same job in a sentence.</p>',
          mistake: '<p>Putting the marks around the whole sentence, including "Ava said". Only the spoken words go inside.</p>' }
      ]
    }],
    practice: [
      { id: 'capitals', name: 'Capitals for names', code: 'B3.3', gen: rightCap },
      { id: 'commas-owners', name: 'Commas and apostrophes', code: 'B3.3', gen: listComma },
      { id: 'speech', name: 'Speech marks', code: 'B3.3', gen: pickSpeech }
    ]
  });

  Q.shapes('punctuation', {
    capitals: [[1, 'proper', properPick], [1, 'true-false', capTf], [1, 'need-cap', needCap]],
    'commas-owners': [[1, 'comma-after', commaAfter], [1, 'owner', owner], [1, 'owner-means', ownerMeans]],
    speech: [[1, 'says-what', saysWhat], [1, 'true-false', speechTf], [1, 'mark-place', markPlace]]
  });
})();
