/* Grade 8: punctuation. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 8:
   B3.3 "use and refine their understanding of the meaning and function of capitalization and punctuation to communicate meaning clearly
   and coherently, when reading and writing"
   From the Language Conventions Continuum (Appendix B), Grade 8: semicolons between independent clauses, commas to set off conjunctive
   adverbs, colons (a list or a quotation after a complete sentence, a script speaker, a formal greeting), ellipses and dashes, commas
   to set off appositives and transitions, and capitals for proper adjectives.
   All sentences are written for this site. Answer checks: tests/verify/grade8-punctuation.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, OQ = '“', CQ = '”', AP = '’';

  /* [an independent clause, a second one, a phrase that is not a clause] */
  var SEMI = [['The museum was closed', 'we visited the park instead', 'during the long weekend'], ['Maya loves chemistry', 'her brother prefers history', 'with a passion'],
    ['The forecast called for rain', 'we packed our umbrellas', 'for the whole week'], ['The ferry was cancelled', 'the islanders waited another day', 'because of high winds'],
    ['Our team trained all winter', 'the hard work paid off', 'after school'], ['The power flickered twice', 'then the house went dark', 'during the storm'],
    ['The snow kept falling', 'school was cancelled by noon', 'for the third day'], ['Amir finished his chores', 'his sister was still sleeping', 'after breakfast'],
    ['The hikers reached the summit', 'the view was worth the climb', 'with sore legs'], ['Grandma speaks Ojibwe', 'she is teaching me a few words', 'with great patience'],
    ['The library is quiet in the morning', 'it gets busy after school', 'during the exam season'], ['The tide went out', 'the boats rested on the mud', 'for six hours'],
    ['Our garden grew too many zucchini', 'we gave some to the neighbours', 'during August'], ['The concert started late', 'nobody seemed to mind', 'because of the rain'],
    ['Toronto is Canada' + AP + 's largest city', 'Montreal is second', 'with millions of people']];
  /* [first clause, joining word, second clause] */
  var ADV = [['The trail was steep', 'however', 'we reached the top by noon'], ['It rained all week', 'as a result', 'the river flooded the road'],
    ['The bus broke down', 'therefore', 'we were late for the game'], ['The raccoon tipped over the bin', 'in addition', 'it scattered the recycling'],
    ['Kai set the table', 'meanwhile', 'Hana cooked the rice'], ['The tickets sold out quickly', 'however', 'more seats were added later'],
    ['The test was hard', 'however', 'most of us passed'], ['Zara practised every day', 'as a result', 'she made the team'], ['The road was icy', 'therefore', 'the buses ran slowly'],
    ['We cleaned the beach', 'in addition', 'we counted the birds'], ['Dad grilled the fish', 'meanwhile', 'I made the salad'], ['The movie was long', 'however', 'nobody left early'],
    ['The pipe burst', 'as a result', 'the basement flooded'], ['Omar lost his ticket', 'therefore', 'he could not board the ferry'], ['The museum offers tours', 'in addition', 'it runs workshops for kids']];
  var ADVJOB = { however: 'shows a contrast', therefore: 'shows a result', 'as a result': 'shows a result', 'in addition': 'adds another idea', meanwhile: 'shows things happening at the same time' };
  var JOBS = ['shows a contrast', 'shows a result', 'adds another idea', 'shows things happening at the same time'];
  /* [a complete sentence, an incomplete start, the list] */
  var LIST = [['The recipe needs three spices', 'The recipe needs', 'cumin, turmeric and ginger'], ['Bring three things on the field trip', 'On the field trip, bring', 'a lunch, a water bottle and a hat'],
    ['Our class studied three provinces', 'The provinces we studied were', 'Manitoba, Quebec and Nova Scotia'], ['The flag of Canada has two colours', 'The colours of the flag are', 'red and white'],
    ['Three planets are visible tonight', 'Tonight you can see', 'Venus, Mars and Jupiter'], ['Pack three things for the canoe trip', 'For the canoe trip, pack', 'a paddle, a life jacket and a map'],
    ['The team has three new players', 'The new players are', 'Ava, Liam and Noor'], ['We visited three cities last summer', 'Last summer we visited', 'Regina, Calgary and Victoria'],
    ['The garden grows three herbs', 'The herbs in the garden include', 'basil, mint and sage'], ['You will need two tools', 'The tools you need are', 'a hammer and a level'],
    ['The menu offers three soups', 'The soups on the menu are', 'lentil, tomato and corn chowder'], ['Our school has three clubs', 'The clubs at our school include', 'chess, robotics and drama'],
    ['The first aid kit holds four items', 'The first aid kit holds', 'a bandage, gloves, tape and scissors'], ['Mei plays three instruments', 'Mei plays', 'the violin, the drums and the flute'],
    ['The trail passes three lakes', 'The trail passes', 'Clear Lake, Long Lake and Loon Lake']];
  /* [what the colon does, an example] */
  var COLON = [['introduces a list', 'We need three things: flour, eggs and milk.'], ['names a speaker in a script', 'Narrator: The lights go down.'],
    ['ends a formal greeting', 'To the Hiring Committee:'], ['introduces a quotation', 'The coach repeated one line: ' + OQ + 'Play your game.' + CQ],
    ['introduces a list', 'The kit includes three items: a whistle, a light and a rope.'], ['names a speaker in a script', 'Coach: Everyone on the ice!'],
    ['ends a formal greeting', 'Dear Members of Council:'], ['introduces a quotation', 'The sign gave a warning: ' + OQ + 'Thin ice.' + CQ]];
  var CJOBS = ['introduces a list', 'names a speaker in a script', 'ends a formal greeting', 'introduces a quotation'];
  /* [a complete sentence about a text, the words quoted from it] */
  var QUOTE = [['The article makes one point clear', 'Less can be delivered.'], ['The writer ends with a hopeful line', 'Some First Nations are working with governments to plan roads that can be used all year.'],
    ['The letter states the problem plainly', 'This is a mistake.'], ['One detail stands out', 'The classrooms below stay cooler in June.'],
    ['The narrator admits her fear', 'My hands would not stop shaking.'], ['The scientist gives a warning', 'The lake is warming faster than expected.'],
    ['The poem closes on a quiet image', 'the canoe slides into the mist.'], ['The coach sums up the season', 'We never gave up on each other.'],
    ['The ad makes a bold promise', 'You will never be bored again.'], ['The elder offers simple advice', 'Listen to the land before you speak.'],
    ['The report gives one key number', 'Nine out of ten students walk to school.'], ['The character reveals his plan', 'Tonight, we cross the river.'],
    ['The editorial ends with a challenge', 'What will you do to help?'], ['The review praises the acting', 'Every performance feels true.'],
    ['The guide adds a safety tip', 'Always tell someone where you are going.']];
  /* [what the mark should show, the words before it, the words after] */
  var BREAK = [['a sudden break', 'I opened the box', 'it was empty.'], ['a sudden break', 'We reached the dock', 'and the ferry was gone.'],
    ['a sudden break', 'She turned the corner', 'and there was the bear.'], ['a sudden break', 'The phone rang once', 'then silence.'],
    ['a sudden break', 'He had one job', 'and he forgot it.'], ['a sudden break', 'The lights came on', 'everyone was staring at me.'],
    ['a sudden break', 'I reached for my wallet', 'it was not there.'], ['a sudden break', 'The crowd went quiet', 'then it roared.'],
    ['hesitation', 'Well', 'I' + AP + 'm not sure.'], ['hesitation', 'I think', 'maybe tomorrow.'], ['hesitation', 'Um', 'can I ask a question?'],
    ['hesitation', 'I was going to tell you', 'but I forgot.'], ['hesitation', 'So', 'what happens now?'], ['hesitation', 'Maybe we could', 'try again?'],
    ['hesitation', 'If only', 'never mind.']];
  var BMARK = { 'a sudden break': '—', hesitation: '…' };
  function withMark(b) { return b[0] === 'hesitation' ? b[1] + '… ' + b[2] : b[1] + ' — ' + b[2]; }
  /* [sentence, the extra information set off by commas] */
  var EXTRA = [['Ms. Roy, our science teacher, runs the robotics club.', 'our science teacher'], ['Iqaluit, the capital of Nunavut, sits on Frobisher Bay.', 'the capital of Nunavut'],
    ['My cousin, who lives in Halifax, is visiting this week.', 'who lives in Halifax'], ['The Bluenose, a famous schooner, appears on the Canadian dime.', 'a famous schooner'],
    ['Our dog, a very old beagle, sleeps all afternoon.', 'a very old beagle'], ['Mr. Haddad, the bus driver, waves every morning.', 'the bus driver'],
    ['Lake Louise, a glacier lake in Alberta, is bright turquoise.', 'a glacier lake in Alberta'], ['My grandfather, a retired fisher, still mends nets.', 'a retired fisher'],
    ['The CN Tower, which opened in 1976, is in Toronto.', 'which opened in 1976'], ['Our principal, Ms. Tremblay, speaks three languages.', 'Ms. Tremblay'],
    ['The Peace Tower, part of Parliament, has a carillon.', 'part of Parliament'], ['Hana, my best friend, moved to Saskatoon.', 'my best friend'],
    ['The puffin, a seabird with a bright beak, nests on cliffs.', 'a seabird with a bright beak'], ['Our canoe, an old cedar strip, still floats well.', 'an old cedar strip'],
    ['The Rideau Canal, the world' + AP + 's longest skating rink, freezes in January.', 'the world' + AP + 's longest skating rink']];
  /* [transition, the rest of the sentence] */
  var TRANS = [['First', 'rinse the rice twice.'], ['Finally', 'the team crossed the finish line.'], ['In conclusion', 'the evidence supports our plan.'],
    ['For example', 'frogs can breathe through their skin.'], ['Afterward', 'we cleaned up the gym.'], ['On the other hand', 'the cost is high.'],
    ['However', 'the plan has one weakness.'], ['Next', 'add the flour slowly.'], ['As a result', 'the river rose two metres.'], ['In the meantime', 'keep the dough warm.'],
    ['Surprisingly', 'the smallest team won.'], ['Later that night', 'the wind picked up.'], ['In addition', 'the park needs more lights.'], ['Meanwhile', 'the others set up camp.'],
    ['Overall', 'the trip was a success.']];
  /* [proper adjective, the noun it describes, a sentence with a gap for both] */
  var PROPER = [['Japanese', 'garden', 'We walked through a ___.'], ['Italian', 'restaurant', 'We ate at an ___.'], ['Ukrainian', 'dance', 'My cousin performs a ___.'],
    ['Jamaican', 'patties', 'The café sells ___.'], ['Inuit', 'carving', 'The museum shows an ___.'], ['French', 'bakery', 'We bought bread at a ___.'],
    ['Mexican', 'artist', 'The mural was painted by a ___.'], ['Korean', 'drama', 'My sister watches a ___ every night.'], ['Greek', 'salad', 'I ordered a ___.'],
    ['Cree', 'syllabics', 'The sign is written in ___.'], ['Canadian', 'flag', 'A ___ flew over the school.'], ['Haitian', 'music', 'The festival played ___.'],
    ['Filipino', 'adobo', 'Dad cooks ___ on Sundays.'], ['Ojibwe', 'words', 'Our teacher taught us three ___.'], ['Portuguese', 'tarts', 'The bakery sells ___.']];

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function hl(s, w) { return s.replace(w, '<mark class="hl">' + w + '</mark>'); }
  function words(s) { return s.replace(/[.,]/g, '').split(' '); }

  /* ---------- semicolons ---------- */
  function semiRight(s) { return s[0] + '; ' + s[1] + '.'; }
  /* level 1 shows the two sentences to join; higher levels do not */
  function semicolon(lv) {
    var s = R.pick(SEMI);
    return Q.one(lv > 1 ? 'Which sentence uses the <b>semicolon</b> correctly?' : 'Join these with a semicolon. Which is right?', semiRight(s), [s[0] + ', ' + s[1] + '.', s[0] + '; ' + s[2] + '.'].slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? '' : W.sent(s[0] + '.') + W.sent(cap(s[1]) + '.'), prompt: 'Could each side stand alone as a sentence?', hint: 'A semicolon joins two complete sentences that are closely related.',
      explain: W.sent(hl(semiRight(s), ';')), meta: { k: 'g8-semicolon' } });
  }
  function semiTf() {
    var s = R.pick(SEMI), right = R.int(0, 1) === 1, shown = right ? semiRight(s) : s[0] + '; ' + s[2] + '.';
    return { q: 'Is the semicolon used correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Both sides must be complete sentences.', 'A semicolon can go anywhere a pause is.'], answer: 0 }, hint: 'Check the words after the semicolon.', explain: W.sent(semiRight(s)), meta: { k: 'g8-semi-tf', s: shown } };
  }
  function pickSemi(lv) {
    var s = R.some(SEMI, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every sentence that uses the semicolon correctly.', [semiRight(s[0]), semiRight(s[1])], [s[2][0] + '; ' + s[2][2] + '.', s[3][0] + '; ' + s[3][2] + '.'].slice(0, n), {
      hint: 'Semicolons join complete sentences.', explain: 'A semicolon needs a complete sentence on each side.', meta: { k: 'g8-pick-semi' } });
  }
  function semiFix() {
    var s = R.pick(SEMI);
    return Q.tiles('This joins two sentences with only a comma. Which mark fixes it?', ';', [':', '…'], { fig: W.sent(s[0] + '<mark class="hl">,</mark> ' + s[1] + '.'),
      prompt: 'Both sides are complete sentences.', hint: 'Which mark joins two complete sentences?', explain: W.sent(hl(semiRight(s), ';')), meta: { k: 'g8-semi-fix', s: s[0] + ', ' + s[1] + '.' } });
  }

  /* ---------- however, therefore ---------- */
  function advRight(a) { return a[0] + '; ' + a[1] + ', ' + a[2] + '.'; }
  function advWrong(a) { return [a[0] + ', ' + a[1] + ' ' + a[2] + '.', a[0] + '; ' + a[1] + ' ' + a[2] + '.', a[0] + ' ' + a[1] + ', ' + a[2] + '.']; }
  /* level 1 shows the parts to join; higher levels do not */
  function advForm(lv) {
    var a = R.pick(ADV);
    return Q.one(lv > 1 ? 'Which is punctuated correctly?' : 'Join these with <b>' + a[1] + '</b>. Which is right?', advRight(a), advWrong(a).slice(0, lv > 1 ? 3 : 2), {
      fig: lv > 1 ? '' : W.sent(a[0] + '.') + W.tile(a[1]) + W.sent(cap(a[2]) + '.'), prompt: 'Where do the semicolon and the comma go?', hint: 'Semicolon before <b>' + a[1] + '</b>, comma after it.',
      explain: W.sent(a[0] + '<mark class="hl">;</mark> ' + a[1] + '<mark class="hl">,</mark> ' + a[2] + '.'), meta: { k: 'g8-adv-form' } });
  }
  function advFit() {
    var a = R.pick(ADV), others = Object.keys(ADVJOB).filter(function (x) { return ADVJOB[x] !== ADVJOB[a[1]]; });
    return Q.tiles('Which joining word fits?', a[1], R.some(others, 2), { fig: W.sent(a[0] + '; ' + W.gap() + ', ' + a[2] + '.'), prompt: 'Contrast, result, addition, or at the same time?',
      hint: 'How does the second idea relate to the first?', explain: '<b>' + a[1] + '</b> ' + ADVJOB[a[1]] + '.', meta: { k: 'g8-adv-fit', a: a[0] } });
  }
  function advTf() {
    var a = R.pick(ADV), right = R.int(0, 1) === 1, shown = right ? advRight(a) : R.pick(advWrong(a));
    return { q: 'Is this punctuated correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Semicolon before ' + a[1] + ', comma after it.', 'A comma before ' + a[1] + ' is enough.'], answer: 0 }, hint: 'Check both sides of <b>' + a[1] + '</b>.',
      explain: W.sent(advRight(a)), meta: { k: 'g8-adv-tf', s: shown } };
  }
  function advJob() {
    var a = R.pick(ADV), j = ADVJOB[a[1]];
    return Q.tiles('What does <b>' + a[1] + '</b> do here?', j, R.some(JOBS.filter(function (x) { return x !== j; }), 2), { fig: W.sent(advRight(a)), prompt: 'How are the two ideas linked?',
      hint: 'However: contrast. Therefore: result. In addition: more. Meanwhile: same time.', explain: '<b>' + a[1] + '</b> ' + j + '.', meta: { k: 'g8-adv-job', w: a[1] } });
  }

  /* ---------- colons ---------- */
  /* level 1 shows the list items first; higher levels do not */
  function colonList(lv) {
    var l = R.pick(LIST);
    return Q.one(lv > 1 ? 'Which sentence uses the <b>colon</b> correctly?' : 'Introduce this list with a colon. Which is right?', l[0] + ': ' + l[2] + '.', [l[1] + ': ' + l[2] + '.', l[0] + ' ' + l[2] + '.'].slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? '' : W.sent(l[2]), prompt: 'Is the part before the colon a complete sentence?', hint: 'A colon comes after a complete sentence, never right after a verb.',
      explain: W.sent(l[0] + '<mark class="hl">:</mark> ' + l[2] + '.'), meta: { k: 'g8-colon-list' } });
  }
  function colonTf() {
    var l = R.pick(LIST), right = R.int(0, 1) === 1, shown = (right ? l[0] : l[1]) + ': ' + l[2] + '.';
    return { q: 'Is the colon used correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['A complete sentence comes before it.', 'A colon can go right after a verb.'], answer: right ? 0 : 1 }, hint: 'Read the part before the colon. Is it a complete sentence?',
      explain: W.sent(l[0] + ': ' + l[2] + '.'), meta: { k: 'g8-colon-tf', s: shown } };
  }
  function colonUse() {
    var c = R.pick(COLON);
    return Q.tiles('What does the colon do here?', c[0], CJOBS.filter(function (x) { return x !== c[0]; }), { fig: W.sent(c[1]), hint: 'Look at what comes after the colon.', explain: 'Here the colon ' + c[0] + '.', meta: { k: 'g8-colon-use', s: c[1] } });
  }
  function matchColon() {
    var jobs = R.some(CJOBS, 3), cs = jobs.map(function (j) { return R.pick(COLON.filter(function (c) { return c[0] === j; })); });
    return { q: 'Match each example to what its colon does.', type: 'match', pairs: cs.map(function (c) { return [c[1], c[0]]; }), hint: 'What comes after each colon?', explain: 'One mark, several jobs.', meta: { k: 'g8-match-colon' } };
  }

  /* ---------- quotations ---------- */
  function qRight(x) { return x[0] + ': ' + OQ + x[1] + CQ; }
  function qWrong(x) { return [x[0] + ' ' + x[1], x[0] + ': ' + x[1], x[0] + ' ' + OQ + x[1] + CQ]; }
  /* level 1 shows the exact words first; higher levels do not */
  function quote(lv) {
    var x = R.pick(QUOTE);
    return Q.one(lv > 1 ? 'Which quotes the text correctly?' : 'Quote these exact words. Which is right?', qRight(x), qWrong(x).slice(0, lv > 1 ? 3 : 2), { fig: lv > 1 ? '' : W.sent(x[1]),
      prompt: 'Look for a colon after the complete sentence, and quotation marks around the exact words.', hint: 'Exact words from a text go inside quotation marks.', explain: W.sent(qRight(x)), meta: { k: 'g8-quote' } });
  }
  function quoteTf() {
    var x = R.pick(QUOTE), right = R.int(0, 1) === 1, shown = right ? qRight(x) : R.pick(qWrong(x));
    return { q: 'Is the quotation punctuated correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['A colon after the sentence, and quotation marks around the exact words.', 'Quotation marks are optional.'], answer: 0 }, hint: 'Check for the colon and both quotation marks.',
      explain: W.sent(qRight(x)), meta: { k: 'g8-quote-tf', s: shown } };
  }
  var MISSING = ['a colon', 'quotation marks', 'nothing'];
  function quoteMissing() {
    var x = R.pick(QUOTE), k = R.int(0, 2), shown = [x[0] + ' ' + OQ + x[1] + CQ, x[0] + ': ' + x[1], qRight(x)][k];
    return Q.tiles('What is missing?', MISSING[k], MISSING.filter(function (m) { return m !== MISSING[k]; }), { fig: W.sent(shown), prompt: 'Check for the colon and the quotation marks.',
      hint: 'A complete sentence, a colon, then the exact words in quotation marks.', explain: W.sent(qRight(x)), meta: { k: 'g8-quote-missing', s: shown } });
  }
  function pickQuote(lv) {
    var xs = R.some(QUOTE, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every quotation that is punctuated correctly.', [qRight(xs[0]), qRight(xs[1])], xs.slice(2, 2 + n).map(function (x) { return R.pick(qWrong(x)); }), {
      hint: 'Look for the colon and both quotation marks.', explain: 'A complete sentence, a colon, then the exact words in quotation marks.', meta: { k: 'g8-pick-quote' } });
  }

  /* ---------- dashes and ellipses ---------- */
  var SHOWS = ['a sudden break', 'hesitation', 'a list is coming'];
  /* level 1 asks which mark fits the gap; higher levels ask what a mark shows */
  function breakMark(lv) {
    var b = R.pick(BREAK);
    if (lv > 1) return Q.tiles('What does the <b>' + BMARK[b[0]] + '</b> show here?', b[0], SHOWS.filter(function (x) { return x !== b[0]; }), { fig: W.sent(withMark(b)),
      prompt: 'Read it aloud.', hint: 'A dash is a sharp break. An ellipsis is a pause or trailing off.', explain: 'The ' + BMARK[b[0]] + ' shows ' + b[0] + '.', meta: { k: 'g8-break-shows', s: withMark(b) } });
    return Q.tiles('Which mark shows <b>' + b[0] + '</b>?', BMARK[b[0]], [BMARK[b[0]] === '—' ? '…' : '—', ';'], { fig: W.sent(b[1] + ' ' + W.gap() + ' ' + b[2]),
      prompt: 'Read it aloud.', hint: 'A dash is a sharp break. An ellipsis is a pause or trailing off.', explain: W.sent(withMark(b)), meta: { k: 'g8-break', want: b[0] } });
  }
  function breakTf() {
    var b = R.pick(BREAK), right = R.int(0, 1) === 1, said = right ? b[0] : (b[0] === 'hesitation' ? 'a sudden break' : 'hesitation');
    return { q: Q.name() + ' says the <b>' + BMARK[b[0]] + '</b> shows <b>' + said + '</b>.', fig: W.sent(withMark(b)), type: 'tf', answer: right,
      why: { options: ['A dash breaks sharply; an ellipsis hesitates or trails off.', 'Dashes and ellipses mean the same thing.'], answer: 0 }, hint: 'Which mark is it?',
      explain: 'The ' + BMARK[b[0]] + ' shows ' + b[0] + '.', meta: { k: 'g8-break-tf', s: withMark(b), said: said } };
  }
  function breakWhich(lv) {
    var want = R.pick(['a sudden break', 'hesitation']), right = R.pick(BREAK.filter(function (b) { return b[0] === want; })), wrong = R.some(BREAK.filter(function (b) { return b[0] !== want; }), lv > 1 ? 2 : 1);
    return Q.one('Which sentence shows <b>' + want + '</b>?', withMark(right), wrong.map(withMark), { prompt: 'Look at the mark in each one.', hint: 'Dash: a sudden break. Ellipsis: hesitation.',
      explain: W.sent(withMark(right)), meta: { k: 'g8-break-which', want: want } });
  }
  function breakMatch() {
    var d = R.pick(BREAK.filter(function (b) { return b[0] === 'a sudden break'; })), e = R.pick(BREAK.filter(function (b) { return b[0] === 'hesitation'; })), c = R.pick(LIST);
    return { q: 'Match each sentence to what its mark shows.', type: 'match', pairs: [[withMark(d), 'a sudden break'], [withMark(e), 'hesitation'], [c[0] + ': ' + c[2] + '.', 'a list is coming']],
      hint: 'Dash, ellipsis, colon.', explain: 'Each mark asks the reader to pause in its own way.', meta: { k: 'g8-break-match' } };
  }

  /* ---------- commas around extra information ---------- */
  function noCommas(s, x) { return s.replace(', ' + x + ',', ' ' + x); }
  function oneComma(s, x) { return s.replace(', ' + x + ',', ', ' + x); }
  /* level 1 shows the sentence without commas first; higher levels do not */
  function extra(lv) {
    var e = R.pick(EXTRA);
    return Q.one(lv > 1 ? 'Which sentence sets off the extra information correctly?' : 'Add commas around the extra information. Which is right?', e[0], [noCommas(e[0], e[1]), oneComma(e[0], e[1])].slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? '' : W.sent(hl(noCommas(e[0], e[1]), e[1])), prompt: 'Which words could you take out and still have a sentence?', hint: 'Put a comma before and after the extra information.',
      explain: W.sent(hl(e[0], e[1])), meta: { k: 'g8-extra' } });
  }
  function tapExtra() {
    var e = R.pick(EXTRA), main = e[0].replace(', ' + e[1] + ',', '').replace(/\.$/, '').split(' ');
    return Q.one('Which words are the <b>extra information</b>?', e[1], [main.slice(0, 2).join(' '), main.slice(-3).join(' ')], { fig: W.sent(e[0]), hint: 'It sits between two commas.', explain: W.sent(hl(e[0], e[1])), meta: { k: 'g8-tap-extra', s: e[0] } });
  }
  function commaTf() {
    var e = R.pick(EXTRA), right = R.int(0, 1) === 1, shown = right ? e[0] : R.pick([oneComma(e[0], e[1]), noCommas(e[0], e[1])]);
    return { q: 'Is this punctuated correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Extra information needs a comma on both sides.', 'One comma is always enough.'], answer: 0 }, hint: 'Find the extra information. Is there a comma on both sides?', explain: W.sent(e[0]), meta: { k: 'g8-comma-tf', s: shown } };
  }
  function pickExtra(lv) {
    var es = R.some(EXTRA, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every sentence that is punctuated correctly.', [es[0][0], es[1][0]], es.slice(2, 2 + n).map(function (e) { return oneComma(e[0], e[1]); }), {
      hint: 'A comma on both sides of the extra information.', explain: 'Commas hug the extra words on both sides.', meta: { k: 'g8-pick-extra' } });
  }

  /* ---------- a comma after a transition ---------- */
  function tRight(t) { return t[0] + ', ' + t[1]; }
  function tWrong(t) { var f = t[1].split(' '); return [t[0] + ' ' + t[1], t[0] + ' ' + f[0] + ', ' + f.slice(1).join(' ')]; }
  /* level 1 shows the transition on its own first; higher levels do not */
  function transition(lv) {
    var t = R.pick(TRANS);
    return Q.one(lv > 1 ? 'Which is punctuated correctly?' : 'Start with <b>' + t[0] + '</b>. Which is right?', tRight(t), tWrong(t).slice(0, lv > 1 ? 2 : 1), { fig: lv > 1 ? '' : W.tile(t[0]),
      prompt: 'Where does the transition end?', hint: 'Put a comma after a word or phrase that starts the sentence and links it to what came before.', explain: W.sent('<b>' + t[0] + '</b><mark class="hl">,</mark> ' + t[1]), meta: { k: 'g8-transition' } });
  }
  function transitionTf() {
    var t = R.pick(TRANS), right = R.int(0, 1) === 1, shown = right ? tRight(t) : R.pick(tWrong(t));
    return { q: 'Is this punctuated correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['The comma comes right after the whole transition.', 'Transitions never need a comma.'], answer: 0 }, hint: 'Where does the transition end?',
      explain: W.sent(tRight(t)), meta: { k: 'g8-transition-tf', s: shown } };
  }
  function tapTransition() {
    var t = R.pick(TRANS), rest = words(t[1]);
    return Q.one('Which words are the <b>transition</b>?', t[0], [rest.slice(0, 2).join(' '), rest.slice(-2).join(' ')], { fig: W.sent(tRight(t)), prompt: 'Which words link this sentence to the one before?',
      hint: 'It comes first, before the comma.', explain: W.sent('<b>' + t[0] + '</b>, ' + t[1]), meta: { k: 'g8-tap-transition', s: tRight(t) } });
  }
  function pickTransition(lv) {
    var ts = R.some(TRANS, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every sentence that is punctuated correctly.', [tRight(ts[0]), tRight(ts[1])], ts.slice(2, 2 + n).map(function (t) { return tWrong(t)[0]; }), {
      hint: 'A comma right after the transition.', explain: 'The comma marks where the link ends and the main idea begins.', meta: { k: 'g8-pick-transition' } });
  }

  /* ---------- proper adjectives ---------- */
  function fill(p, a, n) { return p[2].replace('___', a + ' ' + n); }
  function pRight(p) { return fill(p, p[0], p[1]); }
  function pWrong(p) { return [fill(p, p[0].toLowerCase(), p[1]), fill(p, p[0], cap(p[1]))]; }
  /* level 1 shows the sentence with a gap; higher levels do not */
  function proper(lv) {
    var p = R.pick(PROPER);
    return Q.one(lv > 1 ? 'Which sentence uses capitals correctly?' : 'Fill the gap with <b>' + p[0].toLowerCase() + ' ' + p[1] + '</b>. Which is right?', pRight(p), pWrong(p).slice(0, lv > 1 ? 2 : 1), {
      fig: lv > 1 ? '' : W.sent(p[2].replace('___', W.gap())), prompt: 'Which word comes from a proper noun?', hint: 'An adjective made from a proper noun gets a capital. The noun after it does not.',
      explain: W.sent(pRight(p)), meta: { k: 'g8-proper' } });
  }
  function properTf() {
    var p = R.pick(PROPER), right = R.int(0, 1) === 1, shown = right ? pRight(p) : R.pick(pWrong(p));
    return { q: 'Are the capitals right?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Only the proper adjective takes a capital.', 'Describing words never take capitals.'], answer: 0 }, hint: 'Which word comes from the name of a nation, people or language?',
      explain: W.sent(pRight(p)), meta: { k: 'g8-proper-tf', s: shown } };
  }
  function properTap() {
    var p = R.pick(PROPER), ws = words(pWrong(p)[0]), w = p[0].toLowerCase();
    return { q: 'Tap the word that needs a <b>capital</b>.', fig: W.sent(pWrong(p)[0]), type: 'tap', tiles: ws, answer: ws.indexOf(w), prompt: 'Which word comes from a proper noun?',
      hint: 'Look for the name of a nation, people or language.', explain: W.sent(pRight(p)), meta: { k: 'g8-proper-tap' } };
  }
  function pickProper(lv) {
    var ps = R.some(PROPER, 4), n = lv > 1 ? 2 : 1;
    return Q.all('Pick every sentence with the capitals right.', [pRight(ps[0]), pRight(ps[1])], ps.slice(2, 2 + n).map(function (p) { return R.pick(pWrong(p)); }), {
      hint: 'Capital for the proper adjective; small letter for the noun.', explain: 'Japanese garden, Inuit carving, French bakery.', meta: { k: 'g8-pick-proper' } });
  }

  var S0 = SEMI[0], S9 = SEMI[9], A0 = ADV[0], A1 = ADV[1], L0 = LIST[0], L1 = LIST[1];
  Atlas.register('punctuation', {
    full: true,
    lessons: [{
      id: 'joining', title: 'Joining sentences', sub: 'Semicolons, and words like however.',
      concepts: [
        { slug: 'semicolon', title: 'A semicolon joins two complete sentences', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.sent(S0[0] + '.') + W.sent(cap(S0[1]) + '.'), 'Two sentences, closely linked.'),
            step(W.sent(hl(semiRight(S0), ';')), 'No capital after it.'),
            step(W.sent(S0[0] + '; ' + S0[2] + '.'), 'Wrong: the second part cannot stand alone.'),
            step(W.sent(S9[0] + '.') + W.sent(cap(S9[1]) + '.'), 'Two more.'),
            step(W.sent(hl(semiRight(S9), ';')), 'Joined.')
          ],
          guided: [function () { return semicolon(1); }, semiTf, semiFix],
          check: [function () { return semicolon(2); }, semiTf, function () { return pickSemi(2); }, semiFix, function () { return semicolon(2); }],
          coach: '<p>Test each side: cover one half, read the other. If both halves are sentences, the semicolon works.</p>',
          mistake: '<p>Using a semicolon like a comma, before a phrase or list.</p>' },
        { slug: 'however', title: 'Semicolon before however, comma after', exp: ['B3.3'], skill: 'joining-words',
          model: [
            step(W.sent(A0[0] + '<mark class="hl">;</mark> ' + A0[1] + '<mark class="hl">,</mark> ' + A0[2] + '.'), 'Contrast.'),
            step(W.tile('however') + ' ' + W.tile('therefore') + ' ' + W.tile('meanwhile') + ' ' + W.tile('in addition'), 'Same pattern for these.'),
            step(W.sent(A1[0] + '<mark class="hl">;</mark> ' + A1[1] + '<mark class="hl">,</mark> ' + A1[2] + '.'), 'A result.'),
            step(W.sent(A0[0] + ', ' + A0[1] + ' ' + A0[2] + '.'), 'Wrong: a comma alone makes a run-on.')
          ],
          guided: [function () { return advForm(1); }, advFit, advJob],
          check: [function () { return advForm(2); }, advFit, advTf, advJob, function () { return advForm(2); }],
          coach: '<p>These words are called conjunctive adverbs. They add a precise link between ideas, which makes writing sound mature.</p>',
          mistake: '<p>Using a comma before however ("The trail was steep, however we..."). That is a run-on.</p>' }
      ]
    }, {
      id: 'introducing', title: 'Colons, quotations, dashes', sub: 'Marks that introduce, quote and interrupt.',
      concepts: [
        { slug: 'colon-list', title: 'A colon introduces a list after a complete sentence', exp: ['B3.3'], skill: 'colons',
          model: [
            step(W.sent(L0[0] + '<mark class="hl">:</mark> ' + L0[2] + '.'), 'A complete sentence before it.'),
            step(W.sent(L0[1] + ': ' + L0[2] + '.'), 'Wrong: no colon right after a verb.'),
            step(W.sent(L1[0] + '<mark class="hl">:</mark> ' + L1[2] + '.'), 'It could end at the colon.'),
            step(W.sent(COLON[1][1]) + W.sent(COLON[2][1]), 'Colons also name a speaker and end a formal greeting.')
          ],
          guided: [function () { return colonList(1); }, colonTf, colonUse],
          check: [function () { return colonList(2); }, colonTf, colonUse, matchColon, function () { return colonList(2); }],
          coach: '<p>Read the part before the colon aloud. If it sounds finished, the colon is allowed.</p>',
          mistake: '<p>Putting a colon after "are", "include" or "such as".</p>' },
        { slug: 'quote', title: 'Quote exact words in quotation marks', exp: ['B3.3'], skill: 'quotations',
          model: [
            step(W.sent(QUOTE[0][0] + '.'), 'A complete sentence about the text.'),
            step(W.sent(QUOTE[0][0] + '<mark class="hl">: ' + OQ + '</mark>' + QUOTE[0][1] + '<mark class="hl">' + CQ + '</mark>'), 'A colon, then the exact words.'),
            step(W.sent(QUOTE[9][0] + '.'), 'Another one.'),
            step(W.sent(qRight(QUOTE[9])), 'The elder' + AP + 's exact words, inside the marks.')
          ],
          guided: [function () { return quote(1); }, quoteMissing, quoteTf],
          check: [function () { return quote(2); }, quoteMissing, quoteTf, function () { return pickQuote(2); }, function () { return quote(2); }],
          coach: '<p>When writing about texts, quote short exact phrases as evidence, and always use quotation marks.</p>',
          mistake: '<p>Copying words from a text without quotation marks. That presents someone else' + AP + 's words as your own.</p>' },
        { slug: 'dash', title: 'A dash breaks; an ellipsis pauses', exp: ['B3.3'], skill: 'dashes',
          model: [
            step(W.sent('I opened the box — it was empty.'), 'Dash: a sudden break or surprise.'),
            step(W.sent('Well… I' + AP + 'm not sure.'), 'Ellipsis: hesitation, or trailing off.'),
            step(W.sent('She turned the corner — and there was the bear.'), 'A surprise.'),
            step(W.sent('Um… can I ask a question?'), 'Unsure.')
          ],
          guided: [function () { return breakMark(1); }, function () { return breakWhich(1); }, breakTf],
          check: [function () { return breakMark(2); }, function () { return breakWhich(2); }, breakTf, breakMatch, function () { return breakMark(1); }],
          coach: '<p>Both marks belong mostly in stories and dialogue. In reports, they should be rare.</p>',
          mistake: '<p>Using a dash or ellipsis in place of every comma.</p>' }
      ]
    }, {
      id: 'commas', title: 'Commas and capitals', sub: 'Extra details, transitions and proper adjectives.',
      concepts: [
        { slug: 'extra', title: 'Commas set off extra information', exp: ['B3.3'], skill: 'extra-information',
          model: [
            step(W.sent(hl(EXTRA[0][0], EXTRA[0][1])), 'Extra: who Ms. Roy is.'),
            step(W.sent('Ms. Roy runs the robotics club.'), 'Take it out: still a sentence.'),
            step(W.sent(oneComma(EXTRA[0][0], EXTRA[0][1])), 'Wrong: the second comma is missing.'),
            step(W.sent(hl(EXTRA[1][0], EXTRA[1][1])), 'Extra: what Iqaluit is.')
          ],
          guided: [function () { return extra(1); }, tapExtra, commaTf],
          check: [function () { return extra(2); }, tapExtra, commaTf, function () { return pickExtra(2); }, function () { return extra(2); }],
          coach: '<p>Commas around extra information work like brackets: they hug the extra words on both sides.</p>',
          mistake: '<p>Forgetting the closing comma.</p>' },
        { slug: 'transition', title: 'A comma after a transition', exp: ['B3.3'], skill: 'transitions',
          model: [
            step(W.sent('<b>First</b><mark class="hl">,</mark> rinse the rice twice.'), 'A one-word transition.'),
            step(W.tile('Finally') + ' ' + W.tile('For example') + ' ' + W.tile('In conclusion'), 'Words that link to the sentence before.'),
            step(W.sent('<b>On the other hand</b><mark class="hl">,</mark> the cost is high.'), 'A longer one: the comma comes after the whole phrase.'),
            step(W.sent('On the other, hand the cost is high.'), 'Wrong: the comma splits the transition.')
          ],
          guided: [function () { return transition(1); }, tapTransition, transitionTf],
          check: [function () { return transition(2); }, tapTransition, transitionTf, function () { return pickTransition(2); }, function () { return transition(2); }],
          coach: '<p>Transitions guide the reader through a piece. The comma gives a small pause before the main idea.</p>',
          mistake: '<p>Leaving out the comma after longer transitions like "On the other hand".</p>' },
        { slug: 'proper', title: 'Proper adjectives take a capital', exp: ['B3.3'], skill: 'proper-adjectives',
          model: [
            step(W.tile('Japan') + ' &rarr; ' + W.tile('Japanese'), 'From a proper noun.'),
            step(W.sent('We walked through a <b>J</b>apanese garden.'), 'Capital J. Small g.'),
            step(W.tile('Inuit'), 'The name of a people.'),
            step(W.sent('The museum shows an <b>I</b>nuit carving.'), 'Capital I. Small c.')
          ],
          guided: [function () { return proper(1); }, properTap, properTf],
          check: [function () { return proper(2); }, properTap, properTf, function () { return pickProper(2); }, function () { return proper(2); }],
          coach: '<p>Names of nations, peoples, languages and places keep their capital when they describe something: Inuit carving, French bakery.</p>',
          mistake: '<p>Capitalizing the noun after it as well ("Japanese Garden").</p>' }
      ]
    }],
    practice: [
      { id: 'semicolons', name: 'Semicolons', code: 'B3.3', gen: semicolon },
      { id: 'joining-words', name: 'However, therefore and other joining words', code: 'B3.3', gen: advForm },
      { id: 'colons', name: 'Colons', code: 'B3.3', gen: colonList },
      { id: 'quotations', name: 'Quoting a text', code: 'B3.3', gen: quote },
      { id: 'dashes', name: 'Dashes and ellipses', code: 'B3.3', gen: breakMark },
      { id: 'extra-information', name: 'Commas around extra information', code: 'B3.3', gen: extra },
      { id: 'transitions', name: 'Commas after transitions', code: 'B3.3', gen: transition },
      { id: 'proper-adjectives', name: 'Proper adjectives', code: 'B3.3', gen: proper }
    ]
  });

  Q.shapes('punctuation', {
    semicolons: [[1, 'true-false', semiTf], [1, 'fix', semiFix], [2, 'pick', pickSemi]],
    'joining-words': [[1, 'which-word', advFit], [1, 'job', advJob], [2, 'true-false', advTf]],
    colons: [[1, 'true-false', colonTf], [1, 'colon-use', colonUse], [2, 'match', matchColon]],
    quotations: [[1, 'missing', quoteMissing], [1, 'true-false', quoteTf], [2, 'pick', pickQuote]],
    dashes: [[1, 'which-sentence', breakWhich], [1, 'true-false', breakTf], [2, 'match', breakMatch]],
    'extra-information': [[1, 'find', tapExtra], [1, 'true-false', commaTf], [2, 'pick', pickExtra]],
    transitions: [[1, 'find', tapTransition], [1, 'true-false', transitionTf], [2, 'pick', pickTransition]],
    'proper-adjectives': [[1, 'tap', properTap], [1, 'true-false', properTf], [2, 'pick', pickProper]]
  });
})();
