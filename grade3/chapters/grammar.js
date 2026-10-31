/* Grade 3: grammar.
   Ontario 2023 Language, Grade 3, B3.2 Grammar: possessive nouns, linking verbs (is, are, was, were), verbs that tell what is
   or was happening (is running, was running), question words, prepositions that tell where, and interjections.
   All sentences are written for this site. Answer checks: tests/verify/grade3-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [owner, thing] */
  var OWN = [['Kai', 'kite'], ['Grandma', 'garden'], ['Priya', 'scarf'], ['the cat', 'tail'], ['the moose', 'antlers'], ['Omar', 'drum'], ['the teacher', 'desk'], ['Mateo', 'jacket']];
  function poss(o) { return o + '’s'; }
  /* [who, one or more] */
  var WHO = [['The bear', 1], ['The bears', 2], ['My brother', 1], ['The kids', 2], ['Leila', 1], ['The geese', 2], ['Our dog', 1], ['The trees', 2]];
  var HOW = ['hungry', 'tired', 'happy', 'cold', 'busy', 'ready'];
  var DO = [['skate', 'skating', 'skated'], ['swim', 'swimming', 'swam'], ['read', 'reading', 'read a book'], ['paint', 'painting', 'painted'], ['run', 'running', 'ran'], ['bake', 'baking', 'baked']];
  var PLACES = ['on', 'under', 'in', 'beside'];
  /* [question with a gap, its answer, the question word] */
  var ASK = [['___ is your birthday?', 'In May.', 'When'], ['___ is the library?', 'Next to the school.', 'Where'], ['___ mitts are these?', 'They are Noor’s.', 'Whose'],
    ['___ did you get here?', 'By bus.', 'How'], ['___ colour do you like best?', 'Blue.', 'Which'], ['___ does the game start?', 'At three o’clock.', 'When'],
    ['___ did you put my book?', 'On the shelf.', 'Where'], ['___ boots are by the door?', 'They are Sam’s.', 'Whose'], ['___ do you make bannock?', 'With flour, water and baking powder.', 'How']];
  var WORDS = ['When', 'Where', 'Whose', 'How', 'Which'];
  var WOW = [['You drop your cup.', 'Oops!'], ['You bump your knee.', 'Ouch!'], ['Your team wins.', 'Hooray!'], ['You see a giant rainbow.', 'Wow!'], ['You want quiet.', 'Shh!']];

  /* a ball and a box: where is the ball? (drawn in the page's own colours) */
  function scene(where) {
    var ball = { on: [100, 34], under: [100, 132], 'in': [100, 82], beside: [168, 82] }[where];
    return '<svg viewBox="0 0 200 150" width="200" height="150" role="img" aria-label="a ball and a box">' +
      '<rect x="60" y="52" width="80" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="3"/>' +
      (where === 'under' ? '<path d="M50 112h100" stroke="currentColor" stroke-width="3"/>' : '') +
      '<circle cx="' + ball[0] + '" cy="' + ball[1] + '" r="16" fill="currentColor" opacity=".55"/></svg>';
  }

  /* ---------- question makers ---------- */
  function possessive(lv) {
    var o = R.pick(OWN), right = poss(o[0]) + ' ' + o[1], cap = function (s) { return s.charAt(0).toUpperCase() + s.slice(1); };
    return Q.one('Which shows that the <b>' + o[1] + '</b> belongs to <b>' + o[0] + '</b>?', right, [o[0] + 's ' + o[1], o[0] + ' ' + o[1] + '’s'].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Who owns it? Add <b>’s</b> to the owner.', hint: 'The ’s goes on the owner, not the thing.', explain: W.sent(cap(right)), meta: { k: 'g3-possessive', owner: o[0], thing: o[1] } });
  }
  function fixPossessive() {
    var o = R.pick(OWN.filter(function (x) { return !/^the /.test(x[0]); })), words = [o[0] + 's', o[1], 'is', 'new.'];
    return { q: 'One word needs <b>’s</b>. Tap it.', fig: W.sent(words.join(' ')), type: 'tap', tiles: words, answer: 0, hint: 'Who owns something?', explain: W.sent(poss(o[0]) + ' ' + o[1] + ' is new.'), meta: { k: 'g3-fix-possessive', owner: o[0] } };
  }
  function linking(lv) {
    var w = R.pick(WHO), past = lv > 1 && R.int(0, 1) === 1, right = past ? (w[1] > 1 ? 'were' : 'was') : (w[1] > 1 ? 'are' : 'is');
    var tiles = past ? ['was', 'were'] : ['is', 'are'];
    return { q: 'Which word fits?', fig: W.sent(w[0] + ' ' + W.gap() + ' ' + R.pick(HOW) + (past ? ' yesterday' : ' today') + '.'), type: 'tap', tiles: tiles, answer: tiles.indexOf(right),
      prompt: 'Is it <b>one</b>, or <b>more than one</b>?', hint: 'One: is, was. More than one: are, were.', explain: w[0] + ' <b>' + right + '</b>.',
      meta: { k: 'g3-linking', who: w[0], past: past } };
  }
  function progressive(lv) {
    var d = R.pick(DO), n = Q.name(), now = lv < 2 || R.int(0, 1) === 1;
    var right = n + (now ? ' is ' : ' was ') + d[1] + '.';
    return Q.one('Which tells what <b>' + (now ? 'is happening right now' : 'was happening for a while') + '</b>?', right,
      [n + ' ' + d[2] + '.', n + ' will ' + d[0] + '.'].concat(lv > 1 ? [n + (now ? ' was ' : ' is ') + d[1] + '.'] : []), {
        hint: (now ? 'is' : 'was') + ' + a word ending in -ing.', explain: W.sent(right), meta: { k: 'g3-progressive', now: now, who: n } });
  }
  function matchLinking() {
    var ones = WHO.filter(function (w) { return w[1] === 1; }), more = WHO.filter(function (w) { return w[1] === 2; });
    return { q: 'Match each start to the word that fits.', type: 'match', pairs: R.shuffle([[R.pick(ones)[0], 'is'], [R.pick(more)[0], 'are']]), hint: 'One: is. More than one: are.', explain: 'One bear <b>is</b>. Two bears <b>are</b>.', meta: { k: 'g3-match-linking' } };
  }

  function place(lv) {
    var p = R.pick(lv > 1 ? PLACES : ['on', 'under', 'in']);
    return { q: 'Where is the ball?', fig: scene(p), type: 'tap', tiles: PLACES.map(function (x) { return x + ' the box'; }), answer: PLACES.indexOf(p),
      hint: 'Look at the ball and the box.', explain: 'The ball is <b>' + p + '</b> the box.', meta: { k: 'g3-place' } };
  }
  function askWord(lv) {
    var a = R.pick(ASK);
    return Q.tiles('Which word starts this question?', a[2], WORDS.filter(function (w) { return w !== a[2]; }).slice(0, lv > 1 ? 3 : 2), {
      fig: W.sent(a[0].replace('___', W.gap())) + W.sent(a[1]), prompt: 'Look at the answer. Is it a time, a place, an owner, a way, or a choice?',
      hint: 'When = a time. Where = a place. Whose = an owner. How = a way. Which = a choice.', explain: W.sent(a[0].replace('___', a[2])), meta: { k: 'g3-ask-word', a: a[1] } });
  }
  function interjection() {
    var x = R.pick(WOW);
    return Q.tiles('What might you say?', x[1], WOW.filter(function (y) { return y !== x; }).map(function (y) { return y[1]; }).slice(0, 2), {
      fig: W.sent(x[0]), hint: 'How would you feel?', explain: 'Words like <b>' + x[1] + '</b> show a feeling. They are called interjections.', meta: { k: 'g3-wow', s: x[0] } });
  }
  function matchWow() {
    var xs = R.some(WOW, 3);
    return { q: 'Match each moment to what you might say.', type: 'match', pairs: xs.map(function (x) { return [x[0], x[1]]; }), hint: 'How would you feel?', explain: 'Interjections show a quick feeling.', meta: { k: 'g3-match-wow' } };
  }

  Atlas.register('grammar', {
    lessons: [{
      id: 'nouns-verbs', title: 'Owners and verbs', sub: 'Who owns it, and is, are, was, were.',
      concepts: [
        { slug: 'possessive', title: 'Show who owns it', exp: ['B3.2'], skill: 'nouns-verbs',
          model: [
            step(W.tile('Kai') + ' ' + W.tile('kite'), 'The kite belongs to Kai.'),
            step(W.tile('Kai’s') + ' ' + W.tile('kite'), 'Add <b>’s</b> to the owner.'),
            step(W.sent('Kai’s kite is red.'), 'Read it: Kai’s kite.')
          ],
          key: '<p>Owner + <b>’s</b> + thing: <b>Kai’s kite</b>.</p>',
          guided: [function () { return possessive(1); }, function () { return possessive(1); }],
          check: [function () { return possessive(2); }, fixPossessive],
          coach: '<p>Point to things around the room: "Whose cup is this?" "It is Dad’s cup." Write a few on sticky notes.</p>',
          mistake: '<p>Adding an apostrophe to every word that ends in s (two cat’s). Only add it when something belongs to someone.</p>' },
        { slug: 'is-are', title: 'is, are, was, were', exp: ['B3.2'], skill: 'nouns-verbs',
          model: [
            step(W.sent('The bear <b>is</b> hungry.'), 'One: <b>is</b>.'),
            step(W.sent('The bears <b>are</b> hungry.'), 'More than one: <b>are</b>.'),
            step(W.sent('The bear <b>was</b> hungry. The bears <b>were</b> hungry.'), 'In the past: <b>was</b>, <b>were</b>.')
          ],
          key: '<p>One: is, was. More than one: are, were.</p>',
          guided: [function () { return linking(1); }, matchLinking],
          check: [function () { return linking(2); }, function () { return linking(2); }],
          coach: '<p>Hold up one finger or a whole hand as the child chooses: one is "is", a hand is "are".</p>',
          mistake: '<p>"The geese is". Some words mean more than one without an s (geese, children, people).</p>' },
        { slug: 'ing', title: 'What is happening', exp: ['B3.2'], skill: 'nouns-verbs',
          model: [
            step(W.sent('Ava <b>skated</b>.'), 'Done. It is over.'),
            step(W.sent('Ava <b>is skating</b>.'), 'Happening <b>right now</b>.'),
            step(W.sent('Ava <b>was skating</b> when it snowed.'), 'Happening <b>for a while</b>, in the past.')
          ],
          key: '<p><b>is</b> or <b>was</b> + a word ending in <b>-ing</b>.</p>',
          guided: [function () { return progressive(1); }, function () { return progressive(1); }],
          check: [function () { return progressive(2); }, function () { return progressive(2); }],
          coach: '<p>Narrate what the child is doing: "You are drawing." Then later: "You were drawing when I came in."</p>',
          mistake: '<p>Leaving out is or was ("Ava skating"). The -ing word needs its helper.</p>' }
      ]
    }, {
      id: 'little-words', title: 'Little words, big jobs', sub: 'Where, question words, and feeling words.',
      concepts: [
        { slug: 'where', title: 'Words that tell where', exp: ['B3.2'], skill: 'little-words',
          model: [
            step(scene('on'), 'The ball is <b>on</b> the box.'),
            step(scene('in'), 'The ball is <b>in</b> the box.'),
            step(scene('under'), 'The ball is <b>under</b> the box.'),
            step(scene('beside'), 'The ball is <b>beside</b> the box.')
          ],
          key: '<p>on, in, under, beside tell <b>where</b>.</p>',
          guided: [function () { return place(1); }, function () { return place(1); }],
          check: [function () { return place(2); }, function () { return place(2); }],
          coach: '<p>Hide a toy around the room and ask the child to tell you where it is in a full sentence.</p>',
          mistake: '<p>Mixing up "in" and "on". Ask: can you see all of it?</p>' },
        { slug: 'question-words', title: 'Question words', exp: ['B3.2'], skill: 'little-words',
          model: [
            step(W.sent('<b>When</b> is your birthday?') + W.sent('In May.'), '<b>When</b> asks for a time.'),
            step(W.sent('<b>Where</b> is the library?') + W.sent('Next to the school.'), '<b>Where</b> asks for a place.'),
            step(W.sent('<b>Whose</b> mitts are these?') + W.sent('They are Noor’s.'), '<b>Whose</b> asks for the owner.'),
            step(W.sent('<b>How</b> did you get here?') + W.sent('By bus.'), '<b>How</b> asks for the way.')
          ],
          key: '<p>When: time. Where: place. Whose: owner. How: way. Which: choice.</p>',
          guided: [function () { return askWord(1); }, function () { return askWord(1); }],
          check: [function () { return askWord(2); }, function () { return askWord(2); }],
          coach: '<p>Give an answer ("At the rink") and let the child make up the question ("Where...?").</p>',
          mistake: '<p>Using "who’s" for "whose". "Whose" asks who owns something.</p>' },
        { slug: 'interjections', title: 'Feeling words', exp: ['B3.2'], skill: 'little-words',
          model: [
            step(W.sent('Oops!'), 'You drop your cup.'),
            step(W.sent('Ouch!'), 'You bump your knee.'),
            step(W.sent('Hooray! We won!'), 'A quick feeling word, then the sentence.')
          ],
          key: '<p>Feeling words like <b>Wow!</b> and <b>Oops!</b> are called <b>interjections</b>.</p>',
          guided: [interjection, interjection],
          check: [interjection, matchWow],
          coach: '<p>Look for interjections in comics and picture books. Read them with lots of feeling.</p>',
          mistake: '<p>Using lots of them in one piece of writing. One or two is plenty.</p>' }
      ]
    }],
    practice: [
      { id: 'nouns-verbs', name: 'Owners and verbs', code: 'B3.2', gen: possessive },
      { id: 'little-words', name: 'Little words, big jobs', code: 'B3.2', gen: place }
    ]
  });

  Q.shapes('grammar', {
    'nouns-verbs': [[1, 'is-are', linking], [1, 'ing', progressive], [2, 'fix-owner', fixPossessive], [2, 'match', matchLinking]],
    'little-words': [[1, 'question-word', askWord], [1, 'feeling-word', interjection], [2, 'match-feeling', matchWow]]
  });
})();
