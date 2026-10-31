/* Grade 8: punctuation.
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
    ['Our team trained all winter', 'the hard work paid off', 'after school'], ['The power flickered twice', 'then the house went dark', 'during the storm']];
  /* [first clause, joining word, second clause] */
  var ADV = [['The trail was steep', 'however', 'we reached the top by noon'], ['It rained all week', 'as a result', 'the river flooded the road'],
    ['The bus broke down', 'therefore', 'we were late for the game'], ['The raccoon tipped over the bin', 'in addition', 'it scattered the recycling'],
    ['Kai set the table', 'meanwhile', 'Hana cooked the rice'], ['The tickets sold out quickly', 'however', 'more seats were added later']];
  var ADVJOB = { however: 'shows a contrast', therefore: 'shows a result', 'as a result': 'shows a result', 'in addition': 'adds another idea', meanwhile: 'shows things happening at the same time' };
  /* [a complete sentence, an incomplete start, the list] */
  var LIST = [['The recipe needs three spices', 'The recipe needs', 'cumin, turmeric and ginger'], ['Bring three things on the field trip', 'On the field trip, bring', 'a lunch, a water bottle and a hat'],
    ['Our class studied three provinces', 'The provinces we studied were', 'Manitoba, Quebec and Nova Scotia'], ['The flag of Canada has two colours', 'The colours of the flag are', 'red and white'],
    ['Three planets are visible tonight', 'Tonight you can see', 'Venus, Mars and Jupiter']];
  /* [what the colon does, an example] */
  var COLON = [['introduces a list', 'We need three things: flour, eggs and milk.'], ['names a speaker in a script', 'Narrator: The lights go down.'],
    ['ends a formal greeting', 'To the Hiring Committee:'], ['introduces a quotation', 'The coach repeated one line: ' + OQ + 'Play your game.' + CQ]];
  /* [a complete sentence about a passage, the words quoted from it] */
  var QUOTE = [['The article makes one point clear', 'Less can be delivered.'], ['The writer ends with a hopeful line', 'Some First Nations are working with governments to plan roads that can be used all year.'],
    ['The letter states the problem plainly', 'This is a mistake.'], ['One detail stands out', 'The classrooms below stay cooler in June.']];
  /* [what the mark should show, the sentence before the gap, the sentence after] */
  var BREAK = [['a sudden break', 'I opened the box', 'it was empty.'], ['a sudden break', 'We reached the dock', 'and the ferry was gone.'],
    ['hesitation', 'Well', 'I' + AP + 'm not sure.'], ['hesitation', 'I think', 'maybe tomorrow.']];
  var BMARK = { 'a sudden break': '—', hesitation: '…' };
  /* [sentence, the extra information set off by commas] */
  var EXTRA = [['Ms. Roy, our science teacher, runs the robotics club.', 'our science teacher'], ['Iqaluit, the capital of Nunavut, sits on Frobisher Bay.', 'the capital of Nunavut'],
    ['My cousin, who lives in Halifax, is visiting this week.', 'who lives in Halifax'], ['The Bluenose, a famous schooner, appears on the Canadian dime.', 'a famous schooner'],
    ['Our dog, a very old beagle, sleeps all afternoon.', 'a very old beagle']];
  var TRANS = [['First', 'rinse the rice twice.'], ['Finally', 'the team crossed the finish line.'], ['In conclusion', 'the evidence supports our plan.'],
    ['For example', 'frogs can breathe through their skin.'], ['Afterward', 'we cleaned up the gym.'], ['On the other hand', 'the cost is high.']];
  var PROPER = [['Japanese', 'garden'], ['Italian', 'restaurant'], ['Ukrainian', 'dance'], ['Jamaican', 'patties'], ['Inuit', 'carving'], ['French', 'bakery'], ['Mexican', 'artist']];

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* ---------- question makers: semicolons ---------- */
  function semicolon(lv) {
    var s = R.pick(SEMI);
    return Q.one('Which sentence uses the <b>semicolon</b> correctly?', s[0] + '; ' + s[1] + '.', [s[0] + ', ' + s[1] + '.', s[0] + '; ' + s[2] + '.'].slice(0, lv > 1 ? 2 : 1).concat(lv > 2 ? [s[0] + ' ' + s[1] + ';'] : []), {
      prompt: 'Could each side stand alone as a sentence?', hint: 'A semicolon joins two complete sentences that are closely related.', explain: W.sent(s[0] + '<mark class="hl">;</mark> ' + s[1] + '.'), meta: { k: 'g8-semicolon' } });
  }
  function semiTf() {
    var s = R.pick(SEMI), right = R.int(0, 1) === 1, shown = right ? s[0] + '; ' + s[1] + '.' : s[0] + '; ' + s[2] + '.';
    return { q: 'Is the semicolon used correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Both sides must be complete sentences.', 'A semicolon can go anywhere a pause is.'], answer: 0 }, hint: 'Check the words after the semicolon.', explain: W.sent(s[0] + '; ' + s[1] + '.'), meta: { k: 'g8-semi-tf', s: shown } };
  }
  function advForm(lv) {
    var a = R.pick(ADV), right = a[0] + '; ' + a[1] + ', ' + a[2] + '.';
    return Q.one('Which is punctuated correctly?', right, [a[0] + ', ' + a[1] + ' ' + a[2] + '.', a[0] + '; ' + a[1] + ' ' + a[2] + '.', a[0] + ' ' + a[1] + ', ' + a[2] + '.'].slice(0, lv > 1 ? 3 : 2), {
      prompt: 'Where do the semicolon and the comma go?', hint: 'Semicolon before <b>' + a[1] + '</b>, comma after it.', explain: W.sent(a[0] + '<mark class="hl">;</mark> ' + a[1] + '<mark class="hl">,</mark> ' + a[2] + '.'), meta: { k: 'g8-adv-form' } });
  }
  function advFit() {
    var a = R.pick(ADV), others = Object.keys(ADVJOB).filter(function (x) { return ADVJOB[x] !== ADVJOB[a[1]]; });
    return Q.tiles('Which joining word fits?', a[1], R.some(others, 2), { fig: W.sent(a[0] + '; ' + W.gap() + ', ' + a[2] + '.'), prompt: 'Contrast, result, addition, or at the same time?',
      hint: 'How does the second idea relate to the first?', explain: '<b>' + a[1] + '</b> ' + ADVJOB[a[1]] + '.', meta: { k: 'g8-adv-fit', a: a[0] } });
  }
  function pickSemi() {
    var s = R.some(SEMI, 2), a = R.pick(ADV);
    return Q.all('Pick every sentence that is punctuated correctly.', [s[0][0] + '; ' + s[0][1] + '.', a[0] + '; ' + a[1] + ', ' + a[2] + '.'], [s[1][0] + ', ' + s[1][1] + '.', s[1][0] + '; ' + s[1][2] + '.'], {
      hint: 'Semicolons join complete sentences; a comma alone cannot.', explain: 'A semicolon needs a complete sentence on each side.', meta: { k: 'g8-pick-semi' } });
  }

  /* ---------- colons, quotations, dashes and ellipses ---------- */
  function colonList(lv) {
    var l = R.pick(LIST);
    return Q.one('Which sentence uses the <b>colon</b> correctly?', l[0] + ': ' + l[2] + '.', [l[1] + ': ' + l[2] + '.', l[0] + ' ' + l[2] + '.'].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Is the part before the colon a complete sentence?', hint: 'A colon comes after a complete sentence, never right after a verb.', explain: W.sent(l[0] + '<mark class="hl">:</mark> ' + l[2] + '.'), meta: { k: 'g8-colon-list' } });
  }
  function colonUse() {
    var c = R.pick(COLON);
    return Q.tiles('What does the colon do here?', c[0], COLON.filter(function (x) { return x !== c; }).map(function (x) { return x[0]; }), { fig: W.sent(c[1]), hint: 'Look at what comes after the colon.', explain: 'Here the colon ' + c[0] + '.', meta: { k: 'g8-colon-use', s: c[1] } });
  }
  function matchColon() {
    var cs = R.some(COLON, 3);
    return { q: 'Match each example to what its colon does.', type: 'match', pairs: cs.map(function (c) { return [c[1], c[0]]; }), hint: 'What comes after each colon?', explain: 'One mark, several jobs.', meta: { k: 'g8-match-colon' } };
  }
  function quote(lv) {
    var x = R.pick(QUOTE), right = x[0] + ': ' + OQ + x[1] + CQ;
    return Q.one('Which quotes the text correctly?', right, [x[0] + ' ' + x[1], x[0] + ': ' + x[1], x[0] + ' ' + OQ + x[1] + CQ].slice(0, lv > 1 ? 3 : 2), {
      prompt: 'Look for a colon after the complete sentence, and quotation marks around the exact words.', hint: 'Exact words from a text go inside quotation marks.', explain: W.sent(right), meta: { k: 'g8-quote' } });
  }
  function breakMark() {
    var b = R.pick(BREAK);
    return Q.tiles('Which mark shows <b>' + b[0] + '</b>?', BMARK[b[0]], [BMARK[b[0]] === '—' ? '…' : '—', ';'], { fig: W.sent(b[1] + ' ' + W.gap() + ' ' + b[2]),
      hint: 'A dash is a sharp break. An ellipsis is a pause or trailing off.', explain: W.sent(b[1] + ' ' + BMARK[b[0]] + ' ' + b[2]), meta: { k: 'g8-break', want: b[0] } });
  }

  /* ---------- commas and capitals ---------- */
  function noCommas(s, x) { return s.replace(', ' + x + ',', ' ' + x); }
  function oneComma(s, x) { return s.replace(', ' + x + ',', ', ' + x); }
  function extra(lv) {
    var e = R.pick(EXTRA);
    return Q.one('Which sentence sets off the extra information correctly?', e[0], [noCommas(e[0], e[1]), oneComma(e[0], e[1])].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Which words could you take out and still have a sentence?', hint: 'Put a comma before and after the extra information.', explain: W.sent(e[0].replace(e[1], '<mark class="hl">' + e[1] + '</mark>')), meta: { k: 'g8-extra' } });
  }
  function tapExtra() {
    var e = R.pick(EXTRA), main = e[0].replace(', ' + e[1] + ',', '').replace(/\.$/, '').split(' ');
    return Q.one('Which words are the <b>extra information</b>?', e[1], [main.slice(0, 2).join(' '), main.slice(-3).join(' ')], { fig: W.sent(e[0]), hint: 'It sits between two commas.', explain: W.sent(e[0].replace(e[1], '<mark class="hl">' + e[1] + '</mark>')), meta: { k: 'g8-tap-extra', s: e[0] } });
  }
  function transition(lv) {
    var t = R.pick(TRANS), first = t[1].split(' ');
    return Q.one('Which is punctuated correctly?', t[0] + ', ' + t[1], [t[0] + ' ' + t[1], t[0] + ' ' + first[0] + ', ' + first.slice(1).join(' ')].slice(0, lv > 1 ? 2 : 1), {
      hint: 'Put a comma after a word or phrase that starts the sentence and links it to what came before.', explain: W.sent('<b>' + t[0] + '</b><mark class="hl">,</mark> ' + t[1]), meta: { k: 'g8-transition' } });
  }
  function proper(lv) {
    var p = R.pick(PROPER), art = /^[AEIOU]/.test(p[0]) ? 'an' : 'a', right = 'We visited ' + art + ' ' + p[0] + ' ' + p[1] + '.';
    return Q.one('Which sentence uses capitals correctly?', right, ['We visited ' + art + ' ' + p[0].toLowerCase() + ' ' + p[1] + '.', 'We visited ' + art + ' ' + p[0] + ' ' + cap(p[1]) + '.'].slice(0, lv > 1 ? 2 : 1), {
      hint: 'An adjective made from a proper noun gets a capital. The noun after it does not.', explain: W.sent(right), meta: { k: 'g8-proper' } });
  }
  function commaTf() {
    var e = R.pick(EXTRA), right = R.int(0, 1) === 1, shown = right ? e[0] : oneComma(e[0], e[1]);
    return { q: 'Is this punctuated correctly?', fig: W.sent(shown), type: 'tf', answer: right,
      why: { options: ['Extra information needs a comma on both sides.', 'One comma is always enough.'], answer: 0 }, hint: 'Find the extra information. Is there a comma on both sides?', explain: W.sent(e[0]), meta: { k: 'g8-comma-tf', s: shown } };
  }

  var S0 = SEMI[0], A0 = ADV[0], L0 = LIST[0];
  Atlas.register('punctuation', {
    lessons: [{
      id: 'joining', title: 'Joining sentences', sub: 'Semicolons, and words like however.',
      concepts: [
        { slug: 'semicolon', title: 'A semicolon joins two complete sentences', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.sent(S0[0] + '.') + W.sent(cap(S0[1]) + '.'), 'Two sentences, closely linked.'),
            step(W.sent(S0[0] + '<mark class="hl">;</mark> ' + S0[1] + '.'), 'No capital after it.'),
            step(W.sent(S0[0] + '; ' + S0[2] + '.'), 'Wrong: the second part cannot stand alone.')
          ],
          guided: [function () { return semicolon(1); }, semiTf],
          check: [function () { return semicolon(2); }, semiTf],
          coach: '<p>Test each side: cover one half, read the other. If both halves are sentences, the semicolon works.</p>',
          mistake: '<p>Using a semicolon like a comma, before a phrase or list.</p>' },
        { slug: 'however', title: 'Semicolon before however, comma after', exp: ['B3.3'], skill: 'semicolons',
          model: [
            step(W.sent(A0[0] + '<mark class="hl">;</mark> ' + A0[1] + '<mark class="hl">,</mark> ' + A0[2] + '.')),
            step(W.tile('however') + ' ' + W.tile('therefore') + ' ' + W.tile('meanwhile') + ' ' + W.tile('in addition'), 'Same pattern for these.'),
            step(W.tile('however'), 'Contrast. <b>therefore</b>: a result.')
          ],
          guided: [function () { return advForm(1); }, advFit],
          check: [function () { return advForm(2); }, pickSemi],
          coach: '<p>These words are called conjunctive adverbs. They add a precise link between ideas, which makes writing sound mature.</p>',
          mistake: '<p>Using a comma before however ("The trail was steep, however we..."). That is a run-on.</p>' }
      ]
    }, {
      id: 'introducing', title: 'Colons, quotations, dashes', sub: 'Marks that introduce, quote and interrupt.',
      concepts: [
        { slug: 'colon-list', title: 'A colon introduces a list after a complete sentence', exp: ['B3.3'], skill: 'colons-dashes',
          model: [
            step(W.sent(L0[0] + '<mark class="hl">:</mark> ' + L0[2] + '.'), 'A complete sentence before it.'),
            step(W.sent(L0[1] + ': ' + L0[2] + '.'), 'Wrong: no colon right after a verb.')
          ],
          guided: [function () { return colonList(1); }, colonUse],
          check: [function () { return colonList(2); }, matchColon],
          coach: '<p>Read the part before the colon aloud. If it sounds finished, the colon is allowed.</p>',
          mistake: '<p>Putting a colon after "are", "include" or "such as".</p>' },
        { slug: 'quote', title: 'Quote exact words in quotation marks', exp: ['B3.3'], skill: 'colons-dashes',
          model: [
            step(W.sent(QUOTE[0][0] + '.'), 'A complete sentence about the text.'),
            step(W.sent(QUOTE[0][0] + '<mark class="hl">: ' + OQ + '</mark>' + QUOTE[0][1] + '<mark class="hl">' + CQ + '</mark>'), 'A colon, then the exact words.')
          ],
          guided: [function () { return quote(1); }, function () { return quote(1); }],
          check: [function () { return quote(2); }, colonUse],
          coach: '<p>When writing about texts, quote short exact phrases as evidence, and always use quotation marks.</p>',
          mistake: '<p>Copying words from a text without quotation marks. That presents someone else' + AP + 's words as your own.</p>' },
        { slug: 'dash', title: 'A dash breaks; an ellipsis pauses', exp: ['B3.3'], skill: 'colons-dashes',
          model: [
            step(W.sent('I opened the box — it was empty.'), 'Dash: a sudden break or surprise.'),
            step(W.sent('Well… I' + AP + 'm not sure.'), 'Ellipsis: hesitation, or trailing off.')
          ],
          guided: [breakMark, breakMark],
          check: [breakMark, breakMark],
          coach: '<p>Both marks belong mostly in stories and dialogue. In reports, they should be rare.</p>',
          mistake: '<p>Using a dash or ellipsis in place of every comma.</p>' }
      ]
    }, {
      id: 'commas', title: 'Commas and capitals', sub: 'Extra details, transitions and proper adjectives.',
      concepts: [
        { slug: 'extra', title: 'Commas set off extra information', exp: ['B3.3'], skill: 'commas-capitals',
          model: [
            step(W.sent(EXTRA[0][0].replace(EXTRA[0][1], '<mark class="hl">' + EXTRA[0][1] + '</mark>')), 'Extra: who Ms. Roy is.'),
            step(W.sent('Ms. Roy runs the robotics club.'), 'Take it out: still a sentence.'),
            step(W.sent(oneComma(EXTRA[0][0], EXTRA[0][1])), 'Wrong: the second comma is missing.')
          ],
          guided: [function () { return extra(1); }, tapExtra],
          check: [function () { return extra(2); }, commaTf],
          coach: '<p>Commas around extra information work like brackets: they hug the extra words on both sides.</p>',
          mistake: '<p>Forgetting the closing comma.</p>' },
        { slug: 'transition', title: 'A comma after a transition', exp: ['B3.3'], skill: 'commas-capitals',
          model: [
            step(W.sent('<b>First</b><mark class="hl">,</mark> rinse the rice twice.')),
            step(W.tile('Finally') + ' ' + W.tile('For example') + ' ' + W.tile('In conclusion'), 'Words that link to the sentence before.')
          ],
          guided: [function () { return transition(1); }, function () { return transition(1); }],
          check: [function () { return transition(2); }, function () { return transition(2); }],
          coach: '<p>Transitions guide the reader through a piece. The comma gives a small pause before the main idea.</p>',
          mistake: '<p>Leaving out the comma after longer transitions like "On the other hand".</p>' },
        { slug: 'proper', title: 'Proper adjectives take a capital', exp: ['B3.3'], skill: 'commas-capitals',
          model: [
            step(W.tile('Japan') + ' &rarr; ' + W.tile('Japanese'), 'From a proper noun.'),
            step(W.sent('We visited a <b>J</b>apanese garden.'), 'Capital J. Small g.')
          ],
          guided: [function () { return proper(1); }, function () { return proper(1); }],
          check: [function () { return proper(2); }, function () { return proper(2); }],
          coach: '<p>Names of nations, peoples, languages and places keep their capital when they describe something: Inuit carving, French bakery.</p>',
          mistake: '<p>Capitalizing the noun after it as well ("Japanese Garden").</p>' }
      ]
    }],
    practice: [
      { id: 'semicolons', name: 'Semicolons and joining words', code: 'B3.3', gen: semicolon },
      { id: 'colons-dashes', name: 'Colons, quotations, dashes and ellipses', code: 'B3.3', gen: colonList },
      { id: 'commas-capitals', name: 'Commas and capitals', code: 'B3.3', gen: extra }
    ]
  });

  Q.shapes('punctuation', {
    semicolons: [[1, 'true-false', semiTf], [1, 'however', advForm], [1, 'which-word', advFit], [2, 'pick', pickSemi]],
    'colons-dashes': [[1, 'colon-use', colonUse], [1, 'quote', quote], [1, 'break', breakMark], [2, 'match', matchColon]],
    'commas-capitals': [[1, 'tap-extra', tapExtra], [1, 'transition', transition], [1, 'proper', proper], [2, 'true-false', commaTf]]
  });
})();
