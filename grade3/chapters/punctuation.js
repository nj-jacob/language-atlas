/* Grade 3: capitals and punctuation. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B3.3 Capitalization and punctuation: capital letters in dialogue and for words in titles,
   commas and quotation marks to mark direct speech and direct quotations from texts, and apostrophes to show contractions.
   All sentences and titles are written for this site. Answer checks: tests/verify/grade3-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var OQ = '“', CQ = '”', AP = '’';

  /* [who, what they say, its end mark] */
  var SAY = [['Ava', 'Let' + AP + 's go to the rink', '.'], ['Noor', 'Can I help', '?'], ['Kai', 'Look at that moose', '!'], ['Theo', 'I finished my book', '.'],
    ['Priya', 'Where are my skates', '?'], ['Omar', 'We won', '!'], ['Grandpa', 'The bannock is ready', '.'], ['Hana', 'Is it snowing', '?'], ['Mom', 'Time for bed', '.'],
    ['Leila', 'Watch out', '!'], ['Mateo', 'The bus is here', '.'], ['Zara', 'May I have a turn', '?'], ['Dad', 'Dinner is ready', '.'], ['Owen', 'What a catch', '!'],
    ['Chloe', 'Who wants to play tag', '?'], ['Arjun', 'My tooth fell out', '!'], ['Mei', 'I like your drawing', '.'], ['Liam', 'Did you hear that', '?'], ['Amara', 'The ice is thin', '!'],
    ['Sam', 'I will feed the cat', '.']];
  var VERB = { '.': 'said', '?': 'asked', '!': 'shouted' };
  function inMark(s) { return s[2] === '.' ? ',' : s[2]; }
  function low(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
  /* the speech first: "Can I help?" asked Noor. */
  function speech(s) { return OQ + s[1] + inMark(s) + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function noQuotes(s) { return s[1] + inMark(s) + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function quotesTooFar(s) { return OQ + s[1] + inMark(s) + ' ' + VERB[s[2]] + ' ' + s[0] + '.' + CQ; }
  function lowStart(s) { return OQ + low(s[1]) + inMark(s) + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function markOutside(s) { return OQ + s[1] + CQ + inMark(s) + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function wrongSpeech(s) { return [noQuotes(s), quotesTooFar(s), lowStart(s), markOutside(s)]; }
  /* the speaker first: Noor asked, "Can I help?" */
  function said(s) { return s[0] + ' ' + VERB[s[2]] + ', ' + OQ + s[1] + s[2] + CQ; }
  function saidLow(s) { return s[0] + ' ' + VERB[s[2]] + ', ' + OQ + low(s[1]) + s[2] + CQ; }

  /* things to quote from a text: [the text, its exact words] */
  var QUOTE = [['The sign', 'Please stay on the trail.'], ['The book', 'Beavers build homes called lodges.'], ['The poster', 'The library is open on Saturdays.'],
    ['The recipe', 'Mix the flour and water.'], ['The label', 'Keep in a cool, dry place.'], ['The map', 'You are here.'], ['The note', 'Back in five minutes.'],
    ['The letter', 'We miss you very much.'], ['The card', 'Happy birthday, Leila!'], ['The poem', 'The snow falls soft and slow.'], ['The guide', 'Loons dive to catch fish.'],
    ['The menu', 'Today' + AP + 's soup is corn chowder.'], ['The rule', 'Walk in the halls.'], ['The fact sheet', 'A snowshoe hare turns white in winter.'], ['The sign', 'Do not feed the ducks.'],
    ['The card', 'Thank you for the mittens!']];
  function quoted(x) { return x[0] + ' says, ' + OQ + x[1] + CQ; }
  function quoteWrongs(x) { return [x[0] + ' says, ' + x[1], OQ + x[0] + ' says, ' + x[1] + CQ, x[0] + ' says ' + OQ + x[1] + CQ, x[0] + ' says, ' + OQ + low(x[1]) + CQ]; }

  var CON = [['do not', 'don' + AP + 't'], ['cannot', 'can' + AP + 't'], ['is not', 'isn' + AP + 't'], ['I am', 'I' + AP + 'm'], ['it is', 'it' + AP + 's'], ['we are', 'we' + AP + 're'],
    ['they are', 'they' + AP + 're'], ['you will', 'you' + AP + 'll'], ['she is', 'she' + AP + 's'], ['did not', 'didn' + AP + 't'], ['I will', 'I' + AP + 'll'], ['let us', 'let' + AP + 's'],
    ['are not', 'aren' + AP + 't'], ['was not', 'wasn' + AP + 't'], ['were not', 'weren' + AP + 't'], ['has not', 'hasn' + AP + 't'], ['have not', 'haven' + AP + 't'], ['could not', 'couldn' + AP + 't'],
    ['he is', 'he' + AP + 's'], ['we will', 'we' + AP + 'll'], ['they will', 'they' + AP + 'll'], ['I have', 'I' + AP + 've'], ['you are', 'you' + AP + 're'], ['that is', 'that' + AP + 's']];
  /* sentences that use a contraction: [before, the two words, after] */
  var CONSENT = [['I', 'do not', 'like cold soup.'], ['We', 'cannot', 'find the cat.'], ['', 'It is', 'time to go.'], ['', 'They are', 'at the rink.'], ['She', 'did not', 'see the moose.'],
    ['', 'I am', 'ready for school.'], ['', 'We will', 'meet you there.'], ['The bus', 'is not', 'here yet.'], ['', 'You are', 'my best friend.'], ['', 'That is', 'my hat.'],
    ['The kids', 'were not', 'cold.'], ['', 'I have', 'two cousins.'], ['He', 'could not', 'reach the shelf.'], ['', 'Let us', 'play outside.']];
  function conFor(long) { return CON.filter(function (c) { return c[0].toLowerCase() === long.toLowerCase(); })[0]; }
  function conCap(long) { var c = conFor(long)[1]; return /^[A-Z]/.test(long) ? c.charAt(0).toUpperCase() + c.slice(1) : c; }
  function badCon(c) { var short = c[1], i = short.indexOf(AP); return [short.replace(AP, ''), c[0].indexOf(' ') > 0 ? c[0].replace(' ', AP) : short.slice(0, i - 1) + AP + short.charAt(i - 1) + short.slice(i + 1)]; }

  /* titles written the right way: a capital for the first word and every important word */
  var TITLES = ['The Loon and the Lake', 'A Day at the Beach', 'The Fox in the Snow', 'How to Build a Snow Fort', 'Kai and the Big Storm', 'Our Trip to the Farm',
    'The Night of the Northern Lights', 'A Canoe for Grandpa', 'The Secret of the Old Maple', 'Snow Day on Elm Street', 'My Dog and the Big Puddle', 'The Bear Who Loved Berries',
    'Skating on the Pond', 'The Lost Mitten', 'Ten Facts About Beavers', 'A Visit to the Market', 'The Moose in the Garden', 'Tala and the Red Kite', 'Life in a Tide Pool',
    'The Story of the Sugar Bush'];
  var SMALL = ['a', 'an', 'the', 'and', 'of', 'in', 'at', 'to', 'on', 'for'];
  function allCaps(t) { return t.split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); }
  function firstOnly(t) { return t.charAt(0) + t.slice(1).toLowerCase(); }
  function noFirst(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
  function isSmall(w, i) { return i > 0 && SMALL.indexOf(w.toLowerCase()) >= 0; }

  /* ---------- speech marks ---------- */
  function pickSpeech(lv) {
    var s = R.pick(SAY);
    return Q.one('Which sentence is written the right way?', speech(s), R.some(wrongSpeech(s).slice(0, 3), lv > 1 ? 3 : 1), {
      prompt: 'Find the words ' + s[0] + ' says. Are they inside the speech marks?', hint: 'Speech marks go around only the words someone says.',
      explain: W.sent(speech(s)), steps: ['Find the words ' + s[0] + ' says: <b>' + s[1] + '</b>.', 'Put speech marks around them.', 'A comma or ? or ! goes inside the marks.'],
      meta: { k: 'g3-speech', who: s[0] } });
  }
  function speechTf(lv) {
    var s = R.pick(SAY), right = R.int(0, 1) === 1, shown = right ? speech(s) : R.pick(wrongSpeech(s));
    return { q: 'Is this written the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['The spoken words are inside speech marks, with a capital and the right mark.', 'Something is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Check the speech marks, the capital, and the mark before the closing speech mark.', explain: W.sent(speech(s)), meta: { k: 'g3-speech-tf', shown: shown } };
  }
  function insideMarks() {
    var s = R.pick(SAY);
    return Q.tiles('Which words go <b>inside</b> the speech marks?', s[1], [VERB[s[2]] + ' ' + s[0], s[1] + ' ' + VERB[s[2]] + ' ' + s[0]], { fig: W.sent(noQuotes(s)),
      hint: 'Which words does ' + s[0] + ' say out loud?', explain: W.sent(speech(s)), meta: { k: 'g3-inside-marks', who: s[0] } });
  }
  function pickAllSpeech(lv) {
    var ss = R.some(SAY, 4), n = R.int(1, 2), right = ss.slice(0, n).map(speech), wrong = ss.slice(n).map(function (s) { return R.pick(wrongSpeech(s).slice(0, 2)); });
    return Q.all('Pick every sentence with the speech marks in the right place.', right, wrong, { hint: 'Only the spoken words go inside.', explain: right.map(function (x) { return W.sent(x); }).join(''), meta: { k: 'g3-pick-speech' } });
  }

  /* ---------- the mark inside the closing speech mark ---------- */
  function speechMark() {
    var s = R.pick(SAY.filter(function (x) { return x[2] === '.'; }));
    return { q: 'Which mark goes in the gap?', fig: W.sent(OQ + s[1] + W.gap() + CQ + ' said ' + s[0] + '.'), type: 'tap', tiles: [',', '.'], answer: 0,
      hint: 'The sentence keeps going after the speech, so use a comma.', explain: W.sent(speech(s)), meta: { k: 'g3-speech-mark', who: s[0] } };
  }
  function anyMark(lv) {
    var s = R.pick(SAY), tiles = lv > 1 ? [',', '.', '?', '!'] : [',', '?', '!'];
    return { q: 'Which mark goes in the gap?', fig: W.sent(OQ + s[1] + W.gap() + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'), type: 'tap', tiles: tiles, answer: tiles.indexOf(inMark(s)),
      hint: 'Asked: ?  Shouted: !  Said: a comma.', explain: W.sent(speech(s)), meta: { k: 'g3-any-mark', who: s[0] } };
  }
  function saidComma() {
    var s = R.pick(SAY);
    return { q: 'Which mark goes in the gap?', fig: W.sent(s[0] + ' ' + VERB[s[2]] + W.gap() + ' ' + OQ + s[1] + s[2] + CQ), type: 'tap', tiles: [',', '.'], answer: 0,
      hint: 'The speech has not started yet. Use a comma.', explain: W.sent(said(s)), meta: { k: 'g3-said-comma', who: s[0] } };
  }
  function commaTf() {
    var s = R.pick(SAY.filter(function (x) { return x[2] === '.'; })), right = R.int(0, 1) === 1, shown = right ? speech(s) : OQ + s[1] + '.' + CQ + ' said ' + s[0] + '.';
    return { q: Q.name() + ' wrote this. Is the mark inside the speech marks right?', fig: W.sent(shown), type: 'tf', answer: right,
      hint: 'Does the sentence keep going after the speech?', explain: W.sent(speech(s)), meta: { k: 'g3-comma-tf', shown: shown } };
  }

  /* ---------- a capital to start the speech ---------- */
  function capSpeech() {
    var s = R.pick(SAY);
    return Q.one('Which one starts the speech with a <b>capital</b>?', said(s), [saidLow(s)], { hint: 'The first word someone says starts with a capital.', explain: W.sent(said(s)), meta: { k: 'g3-cap-speech', who: s[0] } });
  }
  function capTap() {
    var s = R.pick(SAY), words = saidLow(s).split(' ');
    return { q: 'Tap the word that needs a <b>capital</b>.', fig: W.sent(saidLow(s)), type: 'tap', tiles: words, answer: 2, hint: 'Find the first word someone says.',
      explain: W.sent(said(s)), meta: { k: 'g3-cap-tap', who: s[0] } };
  }
  function capTf() {
    var s = R.pick(SAY), right = R.int(0, 1) === 1, shown = right ? said(s) : saidLow(s);
    return { q: 'Is this written the right way?', fig: W.sent(shown), type: 'tf', answer: right, hint: 'Look at the first word inside the speech marks.',
      explain: W.sent(said(s)), meta: { k: 'g3-cap-tf', shown: shown } };
  }
  function capBoth() {
    var s = R.pick(SAY);
    return Q.one('Which is written the right way?', said(s), [saidLow(s), s[0] + ' ' + VERB[s[2]] + ' ' + OQ + low(s[1]) + s[2] + CQ], { hint: 'A comma before the speech, and a capital to start it.',
      explain: W.sent(said(s)), meta: { k: 'g3-cap-both', who: s[0] } });
  }

  /* ---------- quoting a text ---------- */
  function pickQuote(lv) {
    var x = R.pick(QUOTE);
    return Q.one('Which shows the words from the text the right way?', quoted(x), R.some(quoteWrongs(x), lv > 1 ? 3 : 2), {
      hint: 'Quotation marks go around the exact words from the text.', explain: W.sent(quoted(x)), meta: { k: 'g3-quote', from: x[0] } });
  }
  function quoteTf() {
    var x = R.pick(QUOTE), right = R.int(0, 1) === 1, shown = right ? quoted(x) : R.pick(quoteWrongs(x));
    return { q: Q.name() + ' copied words from a text. Is it written the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      hint: 'Check the comma, the quotation marks and the capital.', explain: W.sent(quoted(x)), meta: { k: 'g3-quote-tf', shown: shown } };
  }
  function quoteWords() {
    var x = R.pick(QUOTE);
    return Q.tiles('Which words go inside the quotation marks?', x[1], [x[0] + ' says', x[0] + ' says, ' + x[1]], { fig: W.sent(x[0] + ' says, ' + x[1]),
      hint: 'Which words are copied exactly from the text?', explain: W.sent(quoted(x)), meta: { k: 'g3-quote-words', from: x[0] } });
  }
  function quoteComma() {
    var x = R.pick(QUOTE);
    return { q: 'Which mark goes in the gap?', fig: W.sent(x[0] + ' says' + W.gap() + ' ' + OQ + x[1] + CQ), type: 'tap', tiles: [',', '.', '?'], answer: 0,
      hint: 'A comma comes before the quoted words.', explain: W.sent(quoted(x)), meta: { k: 'g3-quote-comma', from: x[0] } };
  }

  /* ---------- contractions ---------- */
  function contraction(lv) {
    var c = R.pick(CON);
    return Q.one('What is the short way to write <b>' + c[0] + '</b>?', c[1], badCon(c).slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Which letters are left out? The apostrophe goes in their place.', hint: 'The apostrophe takes the place of the missing letters.', explain: W.tile(c[0]) + ' &rarr; ' + W.tile(c[1]), meta: { k: 'g3-contraction', long: c[0] } });
  }
  function matchCon() {
    var cs = R.some(CON, 3);
    return { q: 'Match each pair of words to its short way.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[1]]; }), hint: 'Say the short way out loud.', explain: 'An apostrophe shows where letters were left out.', meta: { k: 'g3-match-con' } };
  }
  function missing() {
    var c = R.pick(CON.filter(function (x) { return x[0] !== 'cannot'; })), short = c[1], i = short.indexOf(AP), a = short.slice(0, i), b = short.slice(i + 1), long = c[0].replace(' ', '');
    var gone = long.slice(a.length, long.length - b.length), others = ['o', 'a', 'i', 'wi', 'u', 'ha'].filter(function (x) { return x !== gone; });
    return Q.tiles('In <b>' + short + '</b>, which letters did the apostrophe replace?', gone, R.some(others, 2), { fig: W.tile(c[0]) + ' &rarr; ' + W.tile(short),
      hint: 'Put the two words side by side. What is missing?', explain: '<b>' + gone + '</b> is left out of ' + c[0] + '.', meta: { k: 'g3-missing', long: c[0], short: short } });
  }
  function conGap(lv) {
    var x = R.pick(CONSENT), right = conCap(x[1]), c = conFor(x[1]);
    var wrong = badCon(c).map(function (w) { return /^[A-Z]/.test(x[1]) ? w.charAt(0).toUpperCase() + w.slice(1) : w; });
    return Q.tiles('Which short way fits?', right, wrong.slice(0, lv > 1 ? 2 : 1), { fig: W.sent((x[0] ? x[0] + ' ' : '') + '<s>' + x[1] + '</s> ' + W.gap() + ' ' + x[2]),
      hint: 'Squeeze the two crossed-out words into one.', explain: W.sent((x[0] ? x[0] + ' ' : '') + '<b>' + right + '</b> ' + x[2]), meta: { k: 'g3-con-gap', long: x[1] } });
  }
  function conTf() {
    var c = R.pick(CON), right = R.int(0, 1) === 1, said = right ? c[1] : R.pick(badCon(c));
    return { q: Q.name() + ' writes <b>' + said + '</b> as the short way of <b>' + c[0] + '</b>. Is it right?', fig: W.tile(c[0]) + ' &rarr; ' + W.tile(said), type: 'tf', answer: right,
      hint: 'Is the apostrophe where the letters were left out?', explain: W.tile(c[0]) + ' &rarr; ' + W.tile(c[1]), meta: { k: 'g3-con-tf', long: c[0], said: said } };
  }

  /* ---------- capitals in titles ---------- */
  function title(lv) {
    var t = R.pick(TITLES), wrong = [allCaps(t), firstOnly(t), noFirst(t)].filter(function (x) { return x !== t; });
    return Q.one('Which title is written the right way?', t, R.some(wrong, lv > 1 ? 3 : 2), {
      hint: 'Capitals for the first word and the important words. Small words like the, and, of stay small.', explain: W.sent(t), meta: { k: 'g3-title' } });
  }
  function titleTf() {
    var t = R.pick(TITLES), right = R.int(0, 1) === 1, wrong = [allCaps(t), firstOnly(t), noFirst(t)].filter(function (x) { return x !== t; }), shown = right ? t : R.pick(wrong);
    return { q: Q.name() + ' wrote this title. Is it right?', fig: W.sent(shown), type: 'tf', answer: right, hint: 'Check the first word, the important words and the small words.',
      explain: W.sent(t), meta: { k: 'g3-title-tf', shown: shown } };
  }
  /* one important word has lost its capital: tap it */
  function titleCap() {
    var t = R.pick(TITLES), words = t.split(' '), big = words.map(function (w, i) { return i > 0 && !isSmall(w, i) ? i : -1; }).filter(function (i) { return i >= 0; }), at = R.pick(big);
    var shown = words.map(function (w, i) { return i === at ? w.toLowerCase() : w; });
    return { q: 'Tap the word that needs a <b>capital</b>.', fig: W.sent(shown.join(' ')), type: 'tap', tiles: shown, answer: at, hint: 'Is it an important word?',
      explain: W.sent(t), meta: { k: 'g3-title-cap' } };
  }
  /* one small word has a capital it does not need: tap it */
  function titleSmall() {
    function up(w) { return w.charAt(0).toUpperCase() + w.slice(1); }
    function spots(ws) { return ws.map(function (w, i) { return isSmall(w, i) && ws.indexOf(up(w)) < 0 ? i : -1; }).filter(function (i) { return i >= 0; }); }
    var t = R.pick(TITLES.filter(function (x) { return spots(x.split(' ')).length; })), words = t.split(' '), at = R.pick(spots(words));
    var shown = words.map(function (w, i) { return i === at ? up(w) : w; });
    return { q: 'Tap the word that should <b>not</b> have a capital.', fig: W.sent(shown.join(' ')), type: 'tap', tiles: shown, answer: at, hint: 'Small words like the, and, of stay small.',
      explain: W.sent(t), meta: { k: 'g3-title-small' } };
  }

  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'speech', title: 'Writing what people say', sub: 'Speech marks, commas and capitals.',
      concepts: [
        { slug: 'speech-marks', title: 'Speech marks', exp: ['B3.3'], skill: 'speech',
          model: [
            step(W.sent('Let' + AP + 's go to the rink'), 'Ava says this.'),
            step(W.sent(OQ + 'Let' + AP + 's go to the rink' + CQ), 'Only around the words she says.'),
            step(W.sent(OQ + 'Let' + AP + 's go to the rink,' + CQ + ' said Ava.'), 'Then who said it.'),
            step(W.sent('Can I help? asked Noor.'), 'Another one. Which words does Noor say?'),
            step(W.sent(OQ + 'Can I help?' + CQ + ' asked Noor.'))
          ],
          guided: [function () { return pickSpeech(1); }, insideMarks, function () { return speechTf(1); }],
          check: [function () { return pickSpeech(2); }, function () { return pickAllSpeech(2); }, insideMarks, function () { return speechTf(2); }, function () { return pickSpeech(3); }],
          coach: '<p>Draw speech bubbles in a comic, then rewrite one bubble as a sentence with speech marks. The marks are the bubble.</p>',
          mistake: '<p>Putting the closing mark at the very end, around "said Ava" too. Only the spoken words go inside.</p>' },
        { slug: 'speech-comma', title: 'A comma before the closing mark', exp: ['B3.3'], skill: 'speech-comma',
          model: [
            step(W.sent(OQ + 'I finished my book' + CQ + ' said Theo.'), 'Something is missing.'),
            step(W.sent(OQ + 'I finished my book<mark class="hl">,</mark>' + CQ + ' said Theo.'), 'Inside the speech marks.'),
            step(W.sent(OQ + 'Can I help<mark class="hl">?</mark>' + CQ + ' asked Noor.'), 'A question keeps its <b>?</b>'),
            step(W.sent(OQ + 'Watch out<mark class="hl">!</mark>' + CQ + ' shouted Leila.'), 'A shout keeps its <b>!</b>'),
            step(W.sent('Mom said<mark class="hl">,</mark> ' + OQ + 'Time for bed.' + CQ), 'Speaker first? The comma comes before the speech.')
          ],
          guided: [speechMark, function () { return anyMark(1); }, saidComma],
          check: [function () { return anyMark(2); }, commaTf, saidComma, speechMark, function () { return anyMark(3); }],
          coach: '<p>Say it aloud: the comma is where you take a breath before "said Theo".</p>',
          mistake: '<p>Using a full stop inside the speech marks when the sentence goes on ("I finished my book." said Theo).</p>' },
        { slug: 'speech-capital', title: 'A capital to start the speech', exp: ['B3.3'], skill: 'speech-capital',
          model: [
            step(W.sent('Mom said, ' + OQ + 'time for bed.' + CQ), 'Look at the first spoken word.'),
            step(W.sent('Mom said, ' + OQ + '<mark class="hl">T</mark>ime for bed.' + CQ), 'It needs one.'),
            step(W.sent('Kai shouted, ' + OQ + 'look at that moose!' + CQ), 'Another one.'),
            step(W.sent('Kai shouted, ' + OQ + '<mark class="hl">L</mark>ook at that moose!' + CQ), 'Even in the middle of the sentence.')
          ],
          guided: [capSpeech, capTap, capTf],
          check: [capSpeech, capTf, capBoth, capTap, capBoth],
          coach: '<p>Every new speaker is like a new sentence: it starts with a capital.</p>',
          mistake: '<p>Writing the spoken words in small letters because they come in the middle of the sentence.</p>' },
        { slug: 'quotes', title: 'Quoting words from a text', exp: ['B3.3'], skill: 'quotes',
          model: [
            step(W.passage('', ['Please stay on the trail.']), 'A sign says this.'),
            step(W.sent('The sign says, ' + OQ + 'Please stay on the trail.' + CQ), 'Copy the exact words. Put marks around them.'),
            step(W.passage('', ['Beavers build homes called lodges.']), 'Now from a book.'),
            step(W.sent('The book says<mark class="hl">,</mark> ' + OQ + '<mark class="hl">B</mark>eavers build homes called lodges.' + CQ), 'A comma first. A capital to start.')
          ],
          guided: [function () { return pickQuote(1); }, quoteWords, quoteComma],
          check: [function () { return pickQuote(2); }, quoteTf, quoteWords, quoteComma, function () { return pickQuote(3); }],
          coach: '<p>When the child answers a question about a book, ask them to show you the exact words. Then write them together with quotation marks.</p>',
          mistake: '<p>Changing the words while copying them. Inside the marks, every word must match the text.</p>' }
      ]
    }, {
      id: 'apostrophes-titles', title: 'Short forms and titles', sub: 'Apostrophes in contractions, capitals in titles.',
      concepts: [
        { slug: 'contractions', title: 'Contractions', exp: ['B3.3'], skill: 'contractions',
          model: [
            step(W.tile('do n<mark class="hl">o</mark>t'), 'Squeeze two words. Leave out <b>o</b>.'),
            step(W.tile('don' + AP + 't'), 'The apostrophe takes its place.'),
            step(W.tile('I <mark class="hl">a</mark>m'), 'Another one. Leave out <b>a</b>.'),
            step(W.tile('I' + AP + 'm')),
            step(W.sent('<b>I' + AP + 'm</b> sure we <b>don' + AP + 't</b> have school today.'), 'They make writing sound like talking.')
          ],
          guided: [function () { return contraction(1); }, missing, function () { return conGap(1); }],
          check: [function () { return contraction(2); }, conTf, function () { return conGap(2); }, matchCon, function () { return contraction(3); }],
          coach: '<p>Write the two words on a strip of paper, cut out the missing letters, and tape the apostrophe in the gap.</p>',
          mistake: '<p>Putting the apostrophe between the two words (do' + AP + 'nt). It goes where the letters were taken out.</p>' },
        { slug: 'titles', title: 'Capitals in titles', exp: ['B3.3'], skill: 'titles',
          model: [
            step(W.sent('the loon and the lake'), 'No capitals at all.'),
            step(W.sent('<mark class="hl">T</mark>he <mark class="hl">L</mark>oon and the <mark class="hl">L</mark>ake'), 'The first word and the important words.'),
            step(W.sent('The Loon <b>and the</b> Lake'), 'Small words like <b>and</b>, <b>the</b> stay small.'),
            step(W.sent('<mark class="hl">A</mark> <mark class="hl">C</mark>anoe for <mark class="hl">G</mark>randpa'), 'Another one. <b>A</b> is small, but it comes first.')
          ],
          guided: [function () { return title(1); }, titleCap, titleSmall],
          check: [function () { return title(2); }, titleTf, titleCap, titleSmall, function () { return title(3); }],
          coach: '<p>Look at the covers of books on your shelf together. Which words have capitals?</p>',
          mistake: '<p>Giving every word a capital. Small words (a, an, the, and, of, in, at, to, on, for) stay small unless they come first.</p>' }
      ]
    }],
    practice: [
      { id: 'speech', name: 'Speech marks', code: 'B3.3', gen: pickSpeech },
      { id: 'speech-comma', name: 'The mark inside the speech marks', code: 'B3.3', gen: anyMark },
      { id: 'speech-capital', name: 'A capital to start the speech', code: 'B3.3', gen: capSpeech },
      { id: 'quotes', name: 'Quoting words from a text', code: 'B3.3', gen: pickQuote },
      { id: 'contractions', name: 'Contractions', code: 'B3.3', gen: contraction },
      { id: 'titles', name: 'Capitals in titles', code: 'B3.3', gen: title }
    ]
  });

  Q.shapes('punctuation', {
    speech: [[1, 'inside', insideMarks], [1, 'true-false', speechTf], [2, 'pick-all', pickAllSpeech]],
    'speech-comma': [[1, 'comma', speechMark], [1, 'speaker-first', saidComma], [2, 'true-false', commaTf]],
    'speech-capital': [[1, 'tap', capTap], [1, 'true-false', capTf], [2, 'comma-and-capital', capBoth]],
    quotes: [[1, 'words', quoteWords], [1, 'comma', quoteComma], [2, 'true-false', quoteTf]],
    contractions: [[1, 'missing', missing], [1, 'sentence', conGap], [2, 'match', matchCon], [2, 'true-false', conTf]],
    titles: [[1, 'needs-capital', titleCap], [1, 'too-many', titleSmall], [2, 'true-false', titleTf]]
  });
})();
