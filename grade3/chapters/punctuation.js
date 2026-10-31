/* Grade 3: capitals and punctuation.
   Ontario 2023 Language, Grade 3, B3.3 Capitalization and punctuation: capital letters in dialogue and for words in titles,
   commas and quotation marks to mark direct speech, and apostrophes to show contractions.
   All sentences and titles are written for this site. Answer checks: tests/verify/grade3-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var OQ = '“', CQ = '”', AP = '’';

  /* [who, what they say, its end mark] */
  var SAY = [['Ava', 'Let' + AP + 's go to the rink', '.'], ['Noor', 'Can I help', '?'], ['Kai', 'Look at that moose', '!'], ['Theo', 'I finished my book', '.'],
    ['Priya', 'Where are my skates', '?'], ['Omar', 'We won', '!'], ['Grandpa', 'The bannock is ready', '.'], ['Hana', 'Is it snowing', '?']];
  var VERB = { '.': 'said', '?': 'asked', '!': 'shouted' };
  function speech(s) { return OQ + s[1] + (s[2] === '.' ? ',' : s[2]) + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function noQuotes(s) { return s[1] + (s[2] === '.' ? ',' : s[2]) + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function quotesTooFar(s) { return OQ + s[1] + (s[2] === '.' ? ',' : s[2]) + ' ' + VERB[s[2]] + ' ' + s[0] + '.' + CQ; }
  function lowStart(s) { return OQ + s[1].charAt(0).toLowerCase() + s[1].slice(1) + (s[2] === '.' ? ',' : s[2]) + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }
  function periodInside(s) { return OQ + s[1] + '.' + CQ + ' ' + VERB[s[2]] + ' ' + s[0] + '.'; }

  var CON = [['do not', 'don' + AP + 't'], ['cannot', 'can' + AP + 't'], ['is not', 'isn' + AP + 't'], ['I am', 'I' + AP + 'm'], ['it is', 'it' + AP + 's'], ['we are', 'we' + AP + 're'],
    ['they are', 'they' + AP + 're'], ['you will', 'you' + AP + 'll'], ['she is', 'she' + AP + 's'], ['did not', 'didn' + AP + 't'], ['I will', 'I' + AP + 'll'], ['let us', 'let' + AP + 's']];
  /* titles written the right way: a capital for the first word and every important word */
  var TITLES = ['The Loon and the Lake', 'A Day at the Beach', 'The Fox in the Snow', 'How to Build a Snow Fort', 'Kai and the Big Storm', 'Our Trip to the Farm', 'The Night of the Northern Lights'];
  var SMALL = ['a', 'an', 'the', 'and', 'of', 'in', 'at', 'to', 'on', 'for'];
  function allCaps(t) { return t.split(' ').map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' '); }
  function firstOnly(t) { return t.charAt(0) + t.slice(1).toLowerCase(); }
  function noFirst(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  /* ---------- question makers ---------- */
  function pickSpeech(lv) {
    var s = R.pick(SAY), wrong = [noQuotes(s), quotesTooFar(s), lowStart(s)];
    return Q.one('Which sentence is written the right way?', speech(s), R.some(wrong, lv > 1 ? 3 : 1), {
      prompt: 'Find the words ' + s[0] + ' says. Are they inside the speech marks?', hint: 'Speech marks go around only the words someone says.',
      explain: W.sent(speech(s)), steps: ['Find the words ' + s[0] + ' says: <b>' + s[1] + '</b>.', 'Put speech marks around them.', 'A comma or ? or ! goes inside the marks.'],
      meta: { k: 'g3-speech', who: s[0] } });
  }
  function speechMark() {
    var s = R.pick(SAY.filter(function (x) { return x[2] === '.'; }));
    return { q: 'Which mark goes in the gap?', fig: W.sent(OQ + s[1] + W.gap() + CQ + ' said ' + s[0] + '.'), type: 'tap', tiles: [',', '.'], answer: 0,
      hint: 'The sentence keeps going after the speech, so use a comma.', explain: W.sent(speech(s)), meta: { k: 'g3-speech-mark', who: s[0] } };
  }
  function speechTf() {
    var s = R.pick(SAY), right = R.int(0, 1) === 1, shown = right ? speech(s) : R.pick([noQuotes(s), lowStart(s), periodInside(s).replace(/[?!]/, '.')]);
    if (!right && shown === speech(s)) shown = noQuotes(s);
    return { q: 'Is this written the right way?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['The spoken words are inside speech marks, with a capital and the right mark.', 'Something is missing or in the wrong place.'], answer: right ? 0 : 1 },
      hint: 'Check the speech marks, the capital, and the mark before the closing speech mark.', explain: W.sent(speech(s)), meta: { k: 'g3-speech-tf', shown: shown } };
  }
  function capSpeech() {
    var s = R.pick(SAY), right = s[0] + ' ' + VERB[s[2]] + ', ' + OQ + s[1] + s[2] + CQ, wrong = s[0] + ' ' + VERB[s[2]] + ', ' + OQ + s[1].charAt(0).toLowerCase() + s[1].slice(1) + s[2] + CQ;
    return Q.one('Which one starts the speech with a <b>capital</b>?', right, [wrong], { hint: 'The first word someone says starts with a capital.', explain: W.sent(right), meta: { k: 'g3-cap-speech', who: s[0] } });
  }

  function contraction(lv) {
    var c = R.pick(CON), short = c[1], i = short.indexOf(AP), plain = short.replace(AP, '');
    var wrong = [plain, c[0].indexOf(' ') > 0 ? c[0].replace(' ', AP) : short.slice(0, i - 1) + AP + short.charAt(i - 1) + short.slice(i + 1)];
    return Q.one('What is the short way to write <b>' + c[0] + '</b>?', short, wrong.slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Which letters are left out? The apostrophe goes in their place.', hint: 'The apostrophe takes the place of the missing letters.', explain: W.tile(c[0]) + ' &rarr; ' + W.tile(short), meta: { k: 'g3-contraction', long: c[0] } });
  }
  function matchCon() {
    var cs = R.some(CON, 3);
    return { q: 'Match each pair of words to its short way.', type: 'match', pairs: cs.map(function (c) { return [c[0], c[1]]; }), hint: 'Say the short way out loud.', explain: 'An apostrophe shows where letters were left out.', meta: { k: 'g3-match-con' } };
  }
  function missing() {
    var c = R.pick(CON.filter(function (x) { return x[0] !== 'cannot'; })), short = c[1], i = short.indexOf(AP), a = short.slice(0, i), b = short.slice(i + 1), long = c[0].replace(' ', '');
    var gone = long.slice(a.length, long.length - b.length), others = ['o', 'a', 'i', 'wi', 'u'].filter(function (x) { return x !== gone; });
    return Q.tiles('In <b>' + short + '</b>, which letters did the apostrophe replace?', gone, R.some(others, 2), { fig: W.tile(c[0]) + ' &rarr; ' + W.tile(short),
      hint: 'Put the two words side by side. What is missing?', explain: '<b>' + gone + '</b> is left out of ' + c[0] + '.', meta: { k: 'g3-missing', long: c[0], short: short } });
  }
  function title(lv) {
    var t = R.pick(TITLES), wrong = [allCaps(t), firstOnly(t), noFirst(t)].filter(function (x) { return x !== t; });
    return Q.one('Which title is written the right way?', t, R.some(wrong, lv > 1 ? 3 : 2), {
      hint: 'Capitals for the first word and the important words. Small words like the, and, of stay small.', explain: W.sent(t), meta: { k: 'g3-title' } });
  }

  Atlas.register('punctuation', {
    lessons: [{
      id: 'speech', title: 'Writing what people say', sub: 'Speech marks, commas and capitals.',
      concepts: [
        { slug: 'speech-marks', title: 'Speech marks', exp: ['B3.3'], skill: 'speech',
          model: [
            step(W.sent('Let' + AP + 's go to the rink'), 'Ava says this.'),
            step(W.sent(OQ + 'Let' + AP + 's go to the rink' + CQ), 'Only around the words she says.'),
            step(W.sent(OQ + 'Let' + AP + 's go to the rink,' + CQ + ' said Ava.'), 'Then who said it.')
          ],
          key: '<p>Speech marks <b>' + OQ + ' ' + CQ + '</b> go around only the words someone says.</p>',
          guided: [function () { return pickSpeech(1); }, function () { return pickSpeech(1); }],
          check: [function () { return pickSpeech(2); }, speechTf],
          coach: '<p>Draw speech bubbles in a comic, then rewrite one bubble as a sentence with speech marks. The marks are the bubble.</p>',
          mistake: '<p>Putting the closing mark at the very end, around "said Ava" too. Only the spoken words go inside.</p>' },
        { slug: 'speech-comma', title: 'A comma before the closing mark', exp: ['B3.3'], skill: 'speech',
          model: [
            step(W.sent(OQ + 'I finished my book' + CQ + ' said Theo.'), 'Something is missing.'),
            step(W.sent(OQ + 'I finished my book<mark class="hl">,</mark>' + CQ + ' said Theo.'), 'A comma, inside the speech marks.'),
            step(W.sent(OQ + 'Can I help<mark class="hl">?</mark>' + CQ + ' asked Noor.'), 'A question keeps its ? instead.')
          ],
          key: '<p>Inside the closing mark: a <b>,</b> or <b>?</b> or <b>!</b></p>',
          guided: [speechMark, speechMark],
          check: [speechMark, function () { return pickSpeech(2); }],
          coach: '<p>Say it aloud: the comma is where you take a breath before "said Theo".</p>',
          mistake: '<p>Using a full stop inside the speech marks when the sentence goes on ("I finished my book." said Theo).</p>' },
        { slug: 'speech-capital', title: 'A capital to start the speech', exp: ['B3.3'], skill: 'speech',
          model: [
            step(W.sent('Mom said, ' + OQ + 'time for bed.' + CQ), 'Look at the first spoken word.'),
            step(W.sent('Mom said, ' + OQ + '<mark class="hl">T</mark>ime for bed.' + CQ), 'It needs a capital.')
          ],
          key: '<p>The first word someone says gets a <b>capital</b>.</p>',
          guided: [capSpeech, capSpeech],
          check: [capSpeech, speechTf],
          coach: '<p>Every new speaker is like a new sentence: it starts with a capital.</p>',
          mistake: '<p>Writing the spoken words in small letters because they come in the middle of the sentence.</p>' }
      ]
    }, {
      id: 'apostrophes-titles', title: 'Short forms and titles', sub: 'Apostrophes in contractions, capitals in titles.',
      concepts: [
        { slug: 'contractions', title: 'Contractions', exp: ['B3.3'], skill: 'short-and-titles',
          model: [
            step(W.tile('do n<mark class="hl">o</mark>t'), 'Squeeze two words. Leave out <b>o</b>.'),
            step(W.tile('don' + AP + 't'), 'The apostrophe takes its place.')
          ],
          key: '<p>The <b>' + AP + '</b> goes where letters were left out.</p>',
          guided: [function () { return contraction(1); }, missing],
          check: [function () { return contraction(2); }, matchCon],
          coach: '<p>Write the two words on a strip of paper, cut out the missing letters, and tape the apostrophe in the gap.</p>',
          mistake: '<p>Putting the apostrophe between the two words (do' + AP + 'nt). It goes where the letters were taken out.</p>' },
        { slug: 'titles', title: 'Capitals in titles', exp: ['B3.3'], skill: 'short-and-titles',
          model: [
            step(W.sent('the loon and the lake'), 'A title with no capitals.'),
            step(W.sent('<mark class="hl">T</mark>he <mark class="hl">L</mark>oon and the <mark class="hl">L</mark>ake'), 'Capitals: the first word and important words.'),
            step(W.sent('The Loon <b>and the</b> Lake'), 'Small words like <b>and</b>, <b>the</b> stay small.')
          ],
          key: '<p>Capital for the first word and every important word.</p>',
          guided: [function () { return title(1); }, function () { return title(1); }],
          check: [function () { return title(2); }, function () { return title(2); }],
          coach: '<p>Look at the covers of books on your shelf together. Which words have capitals?</p>',
          mistake: '<p>Giving every word a capital. Small words (a, an, the, and, of, in, at, to, on, for) stay small unless they come first.</p>' }
      ]
    }],
    practice: [
      { id: 'speech', name: 'Writing what people say', code: 'B3.3', gen: pickSpeech },
      { id: 'short-and-titles', name: 'Contractions and titles', code: 'B3.3', gen: contraction }
    ]
  });

  Q.shapes('punctuation', {
    speech: [[1, 'comma', speechMark], [1, 'capital', capSpeech], [2, 'true-false', speechTf]],
    'short-and-titles': [[1, 'missing', missing], [1, 'title', title], [2, 'match', matchCon]]
  });
})();
