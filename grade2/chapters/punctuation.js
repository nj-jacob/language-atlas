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

  /* sentences with their names (the words that need a capital, other than the first word) */
  var NAMES = [['My cousin Leila lives in Halifax.', ['Leila', 'Halifax']], ['Grandma flew from Winnipeg to Iqaluit.', ['Winnipeg', 'Iqaluit']],
    ['Our class visited the Royal Ontario Museum.', ['Royal', 'Ontario', 'Museum']], ['Theo and Mei play soccer.', ['Mei']], ['We went canoeing on Lake Huron.', ['Lake', 'Huron']],
    ['Jonah moved to Vancouver.', ['Vancouver']], ['My friend Aiyana lives near Thunder Bay.', ['Aiyana', 'Thunder', 'Bay']], ['After school, Noor walked to Montreal Street.', ['Noor', 'Montreal', 'Street']],
    ['The ferry took Ben to Victoria.', ['Ben', 'Victoria']], ['We met Zara at the park.', ['Zara']]];
  var DAYS = [['We drove to the cabin on Friday.', ['Friday']], ['My birthday is in March.', ['March']], ['On Monday, we went to the dentist.', ['Monday']], ['In July, we swam every day.', ['July']],
    ['Soccer starts on Saturday.', ['Saturday']], ['Snow often falls in December.', ['December']], ['School starts again in September.', ['September']],
    ['We have music on Tuesday and Thursday.', ['Tuesday', 'Thursday']], ['The leaves turn red in October.', ['October']], ['The library is closed on Sunday.', ['Sunday']], ['It rained all of April.', ['April']]];
  var PLACES = ['Canada', 'Toronto', 'Kai', 'Lake Superior', 'Thunder Bay', 'Priya', 'Halifax', 'Omar', 'Yukon', 'Hana'];
  var COMMON = ['dog', 'city', 'lake', 'teacher', 'school', 'park', 'river', 'friend', 'street', 'country'];
  var DAYWORDS = ['Monday', 'Friday', 'Sunday', 'April', 'October', 'June', 'Wednesday', 'January'];
  var TIMEWORDS = ['summer', 'winter', 'spring', 'week', 'month', 'morning', 'today', 'night'];
  /* lists: [start, items] */
  var LIST = [['We packed', ['apples', 'crackers', 'cheese']], ['I saw', ['a fox', 'a deer', 'a hawk']], ['Mei needs', ['glue', 'paper', 'scissors']], ['Our kite is', ['red', 'yellow', 'green']],
    ['We planted', ['beans', 'peas', 'carrots', 'squash']], ['Kai likes', ['hockey', 'swimming', 'chess']], ['Dad bought', ['milk', 'eggs', 'bread']], ['I wore', ['mittens', 'a toque', 'a scarf']],
    ['We saw', ['loons', 'ducks', 'geese', 'herons']], ['Ava can play', ['soccer', 'tag', 'checkers']], ['The soup has', ['carrots', 'onions', 'beans', 'corn', 'peas']], ['My bag holds', ['books', 'pencils', 'a lunch', 'a water bottle']]];
  function listOk(l) { var it = l[1]; return l[0] + ' ' + it.slice(0, -1).join(', ') + ' and ' + it[it.length - 1] + '.'; }
  function listNone(l) { var it = l[1]; return l[0] + ' ' + it.slice(0, -1).join(' ') + ' and ' + it[it.length - 1] + '.'; }
  function listWrong(l) { var it = l[1]; return l[0] + ', ' + it.slice(0, -1).join(' ') + ' and ' + it[it.length - 1] + '.'; }
  /* owners: [owner, thing, a sentence with the owner's thing] */
  var OWN = [['Kai', 'hat', 'Kai’s hat is on the hook.'], ['Ava', 'bike', 'Ava’s bike is blue.'], ['the dog', 'bowl', 'I filled the dog’s bowl.'], ['Grandpa', 'canoe', 'We rode in Grandpa’s canoe.'],
    ['Noor', 'book', 'Noor’s book fell on the floor.'], ['my sister', 'scarf', 'I wore my sister’s scarf.'], ['the cat', 'tail', 'The cat’s tail is fluffy.'], ['Omar', 'lunch', 'Omar’s lunch was in his bag.'],
    ['Mom', 'phone', 'Mom’s phone rang.'], ['the bird', 'nest', 'We saw the bird’s nest.'], ['Leila', 'drum', 'Leila’s drum is loud.'], ['Ben', 'sled', 'Ben’s sled went fast.']];
  function owns(o) { return o[0] + AP + 's ' + o[1]; }
  /* [who, what they say, end mark] */
  var SAY = [['Ava', 'I like this song', '.'], ['Kai', 'Can I come too', '?'], ['Mom', 'Watch out', '!'], ['Theo', 'It is snowing', '.'], ['Priya', 'Where is my hat', '?'], ['Grandma', 'Supper is ready', '.'],
    ['Noor', 'My tooth fell out', '!'], ['Dad', 'Put on your boots', '.'], ['Omar', 'Is it time for lunch', '?'], ['Leila', 'The geese are back', '!'], ['Ben', 'I found a feather', '.'], ['Zara', 'Who wants to play', '?']];
  function speech(x) { return x[0] + ' said, ' + OQ + x[1] + x[2] + CQ; }
  function noMarks(x) { return x[0] + ' said, ' + x[1] + x[2]; }
  function wrongPlace(x) { return OQ + x[0] + ' said, ' + x[1] + x[2] + CQ; }
  function halfMarks(x) { return x[0] + ' said, ' + OQ + x[1] + x[2]; }
  function low(x) { return x.split(' ').map(function (w, i) { return i ? w.toLowerCase() : w; }).join(' '); }
  function hlCaps(p) { var out = p[0]; p[1].forEach(function (w) { out = out.replace(w, '<mark class="hl">' + w.charAt(0) + '</mark>' + w.slice(1)); }); return out; }

  /* ---------- capitals (names, or days and months) ---------- */
  function needCap(list) {
    var p = R.pick(list), words = p[0].replace(/[.,]/g, '').split(' '), rest = words.slice(1).map(function (w) { return w.toLowerCase(); });
    var right = p[1].map(function (w) { return w.toLowerCase(); }), wrong = rest.filter(function (w, i) { return right.indexOf(w) < 0 && rest.indexOf(w) === i && w.length > 2; }).slice(0, 3);
    return Q.all('Pick every word that needs a <b>capital letter</b>.', right, wrong, { fig: W.sent(low(p[0])), prompt: 'Is it a name, a day or a month?',
      hint: 'Names, days and months start with a capital.', explain: W.sent(hlCaps(p)), meta: { k: 'g2-need-cap', s: p[0] } });
  }
  function rightCap(list, lv) {
    var p = R.pick(list), wrong = p[0].replace(p[1][0], p[1][0].toLowerCase()), wrong2 = p[0].charAt(0).toLowerCase() + p[0].slice(1);
    return Q.one('Which sentence uses capitals the right way?', p[0], lv > 1 ? [wrong, wrong2] : [wrong], { hint: 'Look at the first word, and at each name.', explain: W.sent(hlCaps(p)), meta: { k: 'g2-right-cap', s: p[0] } });
  }
  function capTf(list) {
    var p = R.pick(list), w = R.pick(p[1]), right = R.int(0, 1) === 1, shown = right ? p[0] : p[0].replace(w, w.toLowerCase());
    return { q: 'Are the capitals right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['Every name starts with a capital.', 'A name is missing its capital.'], answer: right ? 0 : 1 },
      hint: 'Check each name, day and month.', explain: W.sent(hlCaps(p)), meta: { k: 'g2-cap-tf', shown: shown, s: p[0] } };
  }
  function properPick(lv) {
    var right = R.some(PLACES, 2), wrong = R.some(COMMON, lv > 1 ? 3 : 2);
    return Q.all('Which ones need a <b>capital</b>?', right.map(function (x) { return x.toLowerCase(); }), wrong, { hint: 'The name of a person or a place.', explain: right.join(', ') + ': names.', meta: { k: 'g2-proper-pick' } });
  }
  function dayPick(lv) {
    var right = R.some(DAYWORDS, 2), wrong = R.some(TIMEWORDS, lv > 1 ? 3 : 2);
    return Q.all('Which ones need a <b>capital</b>?', right.map(function (x) { return x.toLowerCase(); }), wrong, { hint: 'Days and months do. Seasons do not.', explain: right.join(', ') + ': a day or a month.', meta: { k: 'g2-day-pick' } });
  }

  /* ---------- commas in lists ---------- */
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
  function listTf() {
    var l = R.pick(LIST), right = R.int(0, 1) === 1, shown = right ? listOk(l) : R.pick([listNone(l), listWrong(l)]);
    return { q: 'Are the commas right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['Each comma is between two things in the list.', 'A comma is missing, or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Find the things in the list first.', explain: W.sent(listOk(l)), meta: { k: 'g2-list-tf', shown: shown } };
  }
  function listCount() {
    var l = R.pick(LIST), n = l[1].length - 2;
    return { q: 'How many commas does this list need?', fig: W.sent(listNone(l)), type: 'tap', tiles: ['1', '2', '3'], answer: n - 1, prompt: 'Count the things in the list.',
      hint: 'No comma before and.', explain: W.sent(listOk(l)), meta: { k: 'g2-list-count', start: l[0] } };
  }

  /* ---------- 's shows who owns it ---------- */
  function owner(lv) {
    var o = R.pick(OWN), wrong = [o[0] + 's ' + o[1], o[0] + ' ' + o[1], o[0] + 's' + AP + ' ' + o[1]];
    return Q.tiles('Which one means <b>the ' + o[1] + ' that belongs to ' + o[0] + '</b>?', owns(o), wrong.slice(0, lv > 1 ? 3 : 2), { prompt: 'Look for the apostrophe and s.',
      hint: 'Add ’s to the owner.', explain: W.sent(owns(o)), meta: { k: 'g2-owner', o: o[0], t: o[1] } });
  }
  function ownerMeans() {
    var o = R.pick(OWN), other = R.pick(OWN.filter(function (x) { return x[1] !== o[1] && x[0] !== o[0]; }));
    return Q.one('What does <b>' + owns(o) + '</b> mean?', 'the ' + o[1] + ' that belongs to ' + o[0], ['the ' + o[1] + ' that belongs to ' + other[0], 'more than one ' + o[0].replace(/^(the|my) /, '')], {
      hint: 'The word with ’s is the owner.', explain: '<b>' + o[0] + '</b> owns the ' + o[1] + '.', meta: { k: 'g2-owner-means', w: owns(o) } });
  }
  function ownerWho(lv) {
    var o = R.pick(OWN), wrong = R.some(OWN.filter(function (x) { return x !== o; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; });
    return Q.tiles('Whose ' + o[1] + ' is it?', o[0], wrong, { fig: W.sent(o[2]), hint: 'Find the word with ’s.', explain: W.sent(o[2].replace(AP + 's', '<b>' + AP + 's</b>')), meta: { k: 'g2-owner-who', s: o[2] } });
  }
  function ownerTf() {
    var o = R.pick(OWN), right = R.int(0, 1) === 1, shown = right ? o[2] : o[2].replace(AP + 's', 's');
    return { q: Q.name() + ' wrote this. Is it right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['The owner has ’s.', 'The owner needs ’s.'], answer: right ? 0 : 1 },
      hint: 'Who owns something? Does that word have ’s?', explain: W.sent(o[2]), meta: { k: 'g2-owner-tf', shown: shown } };
  }

  /* ---------- speech marks ---------- */
  function pickSpeech(lv) {
    var x = R.pick(SAY);
    return Q.one('Which sentence is written the right way?', speech(x), lv > 1 ? [noMarks(x), wrongPlace(x), halfMarks(x)] : [noMarks(x)], {
      prompt: 'Find the words ' + x[0] + ' says. Are they inside the speech marks?', hint: 'Speech marks go around only the words someone says.', explain: W.sent(speech(x)),
      steps: ['Find the words ' + x[0] + ' says: <b>' + x[1] + '</b>.', 'Put speech marks around them.', 'The end mark goes inside the speech marks.'], meta: { k: 'g2-speech', who: x[0] } });
  }
  function saysWhat() {
    var x = R.pick(SAY);
    return Q.one('What does <b>' + x[0] + '</b> say?', x[1] + x[2], [x[0] + ' said', x[0] + ' said, ' + x[1]], { fig: W.sent(speech(x)), hint: 'Look inside the speech marks.',
      explain: 'The words inside the speech marks: <b>' + x[1] + x[2] + '</b>', meta: { k: 'g2-says-what', who: x[0] } });
  }
  function markPlace() {
    var x = R.pick(SAY), words = noMarks(x).split(' ');
    return { q: 'The first speech mark goes just before which word?', fig: W.sent(noMarks(x)), type: 'tap', tiles: words, answer: words.indexOf(x[1].split(' ')[0]),
      hint: 'Find the first word ' + x[0] + ' says.', explain: W.sent(speech(x)), meta: { k: 'g2-mark-place', who: x[0] } };
  }
  function speechTf() {
    var x = R.pick(SAY), right = R.int(0, 1) === 1, shown = right ? speech(x) : R.pick([noMarks(x), wrongPlace(x), halfMarks(x)]);
    return { q: 'Are the speech marks right?', fig: W.sent(shown), type: 'tf', answer: right, why: { options: ['They go around only the words said.', 'They are missing, or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Find the words someone says.', explain: W.sent(speech(x)), meta: { k: 'g2-speech-tf', shown: shown, who: x[0] } };
  }

  function names(lv) { return rightCap(NAMES, lv); }
  function days(lv) { return rightCap(DAYS, lv); }
  function T(f, a, b) { return function () { return f(a, b); }; }

  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'capitals', title: 'Capital letters for names', sub: 'People, places, days and months.',
      concepts: [
        { slug: 'names', title: 'Names of people and places start with a capital', exp: ['B3.3'], skill: 'names',
          model: [
            step(W.sent('My cousin <mark class="hl">L</mark>eila lives in <mark class="hl">H</mark>alifax.'), 'A person. A place.'),
            step(W.tile('city') + ' &rarr; ' + W.tile('Toronto'), 'Any city: small letter. A city' + AP + 's name: capital.'),
            step(W.sent('My friend <mark class="hl">A</mark>iyana lives near <mark class="hl">T</mark>hunder <mark class="hl">B</mark>ay.'), 'Each word of the name.'),
            step(W.tile('friend') + ' &rarr; ' + W.tile('Aiyana'), 'Any friend: small letter.')
          ],
          guided: [T(rightCap, NAMES, 1), T(properPick, 1), T(capTf, NAMES)],
          check: [T(needCap, NAMES), T(properPick, 2), T(capTf, NAMES), T(rightCap, NAMES, 2), T(needCap, NAMES)],
          coach: '<p>Write the names of family members and your town together. Point to each capital letter.</p>',
          mistake: '<p>Using a capital for every noun ("my Dog"). Only special names get a capital.</p>' },
        { slug: 'days', title: 'Days and months start with a capital', exp: ['B3.3'], skill: 'days',
          model: [
            step(W.sent('On <mark class="hl">M</mark>onday, we went to the dentist.'), 'A day.'),
            step(W.sent('My birthday is in <mark class="hl">M</mark>arch.'), 'A month.'),
            step(W.tile('summer') + W.tile('winter'), 'Seasons get a small letter.'),
            step(W.sent('In <mark class="hl">J</mark>uly, we swam every day.'), 'July: capital. day: small letter.')
          ],
          guided: [T(capTf, DAYS), T(dayPick, 1), T(rightCap, DAYS, 1)],
          check: [T(needCap, DAYS), T(dayPick, 2), T(capTf, DAYS), T(rightCap, DAYS, 2), T(needCap, DAYS)],
          coach: '<p>Write the date at the top of each page of writing: "Monday, March 3". It builds the habit.</p>',
          mistake: '<p>Forgetting the capital on months, or adding one to seasons. Months are names; seasons are not.</p>' }
      ]
    }, {
      id: 'commas-owners', title: 'Commas and apostrophes', sub: 'Lists, and showing who owns something.',
      concepts: [
        { slug: 'list', title: 'Commas go between things in a list', exp: ['B3.3'], skill: 'lists',
          model: [
            step(W.sent('We packed apples<b>,</b> crackers and cheese.'), 'A comma after apples.'),
            step(W.sent('We planted beans<b>,</b> peas<b>,</b> carrots and squash.'), 'Before the last one: <b>and</b>.'),
            step(W.sent('I saw a fox<b>,</b> a deer and a hawk.'), 'One thing can be two words.'),
            step(W.sent('The soup has carrots<b>,</b> onions<b>,</b> beans<b>,</b> corn and peas.'), 'Five things. Three commas.')
          ],
          guided: [T(listComma, 1), commaAfter, listCount],
          check: [T(listComma, 2), listTf, commaAfter, listCount, T(listComma, 2)],
          coach: '<p>Make a shopping list together, then turn it into a sentence. Each comma is a short pause.</p>',
          mistake: '<p>Putting a comma after the first word of the sentence. Commas go between the things in the list.</p>' },
        { slug: 'owner', title: '’s shows who owns it', exp: ['B3.3'], skill: 'owners',
          model: [
            step(W.sent('Kai has a hat.')),
            step(W.sent('Kai<b>’s</b> hat'), 'The hat belongs to Kai.'),
            step(W.sent('the dog<b>’s</b> bowl'), 'The bowl belongs to the dog.'),
            step(W.sent('We rode in Grandpa<b>’s</b> canoe.'), 'Whose canoe? Grandpa' + AP + 's.')
          ],
          guided: [T(owner, 1), ownerMeans, T(ownerWho, 1)],
          check: [T(owner, 2), ownerTf, ownerMeans, T(ownerWho, 2), T(owner, 2)],
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
            step(W.sent('Kai said, ' + OQ + 'Can I come too?' + CQ), 'The ? goes inside.'),
            step(W.sent('Mom said, ' + OQ + 'Watch out!' + CQ), 'The ! goes inside too.')
          ],
          guided: [saysWhat, T(pickSpeech, 1), markPlace],
          check: [T(pickSpeech, 2), speechTf, markPlace, saysWhat, T(pickSpeech, 2)],
          coach: '<p>Draw a speech bubble around what someone says in a comic, then show how speech marks do the same job in a sentence.</p>',
          mistake: '<p>Putting the marks around the whole sentence, including "Ava said". Only the spoken words go inside.</p>' }
      ]
    }],
    practice: [
      { id: 'names', name: 'Capitals for names', code: 'B3.3', gen: names },
      { id: 'days', name: 'Capitals for days and months', code: 'B3.3', gen: days },
      { id: 'lists', name: 'Commas in lists', code: 'B3.3', gen: listComma },
      { id: 'owners', name: '’s for owners', code: 'B3.3', gen: owner },
      { id: 'speech', name: 'Speech marks', code: 'B3.3', gen: pickSpeech }
    ]
  });

  Q.shapes('punctuation', {
    names: [[1, 'proper', properPick], [1, 'true-false', function () { return capTf(NAMES); }], [1, 'need-cap', function () { return needCap(NAMES); }]],
    days: [[1, 'day-pick', dayPick], [1, 'true-false', function () { return capTf(DAYS); }], [1, 'need-cap', function () { return needCap(DAYS); }]],
    lists: [[1, 'comma-after', commaAfter], [1, 'count', listCount], [1, 'true-false', listTf]],
    owners: [[1, 'means', ownerMeans], [1, 'whose', ownerWho], [2, 'true-false', ownerTf]],
    speech: [[1, 'says-what', saysWhat], [1, 'true-false', speechTf], [1, 'mark-place', markPlace]]
  });
})();
