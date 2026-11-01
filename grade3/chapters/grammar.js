/* Grade 3: grammar. A full chapter: every idea has two worked examples, three questions together and five on your own,
   and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grade 3, B3.2 Grammar: possessive nouns, linking verbs (is, are, was, were), verbs that tell what is
   or was happening (is running, was running), question words, prepositions that tell where, and interjections.
   B3.2 lists "interrogative adjectives and adverbs": here which, whose (adjectives) and when, where, how, why (adverbs).
   All sentences are written for this site. Answer checks: tests/verify/grade3-grammar.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var AP = '’';
  /* [owner, thing] */
  var OWN = [['Kai', 'kite'], ['Grandma', 'garden'], ['Priya', 'scarf'], ['the cat', 'tail'], ['the moose', 'antlers'], ['Omar', 'drum'], ['the teacher', 'desk'], ['Mateo', 'jacket'],
    ['Leila', 'bike'], ['Dad', 'truck'], ['Hana', 'lunch'], ['the dog', 'bowl'], ['Arjun', 'skates'], ['Chloe', 'puzzle'], ['the bird', 'nest'], ['Uncle Ray', 'canoe'],
    ['Zara', 'drawing'], ['the baby', 'blanket'], ['Owen', 'hockey stick'], ['Noor', 'mitts']];
  var TAILS = ['is new.', 'is here.', 'is wet.', 'is on the table.', 'is by the door.'];
  function poss(o) { return o + AP + 's'; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* [who, 1 for one or 2 for more than one] */
  var WHO = [['The bear', 1], ['My brother', 1], ['Leila', 1], ['Our dog', 1], ['The teacher', 1], ['My grandma', 1], ['The baby', 1], ['Omar', 1], ['The goalie', 1], ['A fox', 1],
    ['The bears', 2], ['The kids', 2], ['The geese', 2], ['The trees', 2], ['The children', 2], ['The mice', 2], ['The people', 2], ['My cousins', 2], ['The puppies', 2], ['Our neighbours', 2]];
  var HOW = ['hungry', 'tired', 'happy', 'cold', 'busy', 'ready', 'sleepy', 'excited', 'quiet', 'hot'];
  /* [do, doing, did] */
  var DO = [['skate', 'skating', 'skated'], ['swim', 'swimming', 'swam'], ['read', 'reading', 'read a book'], ['paint', 'painting', 'painted'], ['run', 'running', 'ran'], ['bake', 'baking', 'baked'],
    ['dance', 'dancing', 'danced'], ['sing', 'singing', 'sang'], ['hop', 'hopping', 'hopped'], ['dig', 'digging', 'dug'], ['write', 'writing', 'wrote'], ['jump', 'jumping', 'jumped'],
    ['ride', 'riding', 'rode'], ['clap', 'clapping', 'clapped']];
  var PLACES = ['on', 'under', 'in', 'beside', 'above'];
  /* sentences with one word that tells where */
  var WHERE = [['The cat slept', 'under', 'the porch.'], ['We hung a star', 'above', 'the door.'], ['Kai hid', 'behind', 'the tree.'], ['The ducks swam', 'across', 'the pond.'],
    ['A path runs', 'through', 'the woods.'], ['Mei sat', 'between', 'her two cousins.'], ['The ferry waited', 'beside', 'the dock.'], ['The kite flew', 'over', 'the barn.'],
    ['My boots are', 'by', 'the door.'], ['The fish swam', 'below', 'the ice.'], ['The puppy ran', 'around', 'the yard.'], ['We camped', 'near', 'the river.'],
    ['The keys are', 'inside', 'my bag.'], ['A spider crawled', 'up', 'the wall.'], ['The snow fell', 'onto', 'the roof.'], ['The geese landed', 'on', 'the lake.'],
    ['Liam put the books', 'into', 'his pack.'], ['A robin built a nest', 'in', 'the maple tree.']];
  var WHEREWORDS = WHERE.map(function (w) { return w[1]; });
  /* [question with a gap, its answer, the question word] */
  var ASK = [
    ['___ is your birthday?', 'In May.', 'When'], ['___ does the game start?', 'At three o' + AP + 'clock.', 'When'], ['___ is the school concert?', 'On Thursday.', 'When'],
    ['___ can we go swimming?', 'After lunch.', 'When'], ['___ do the geese fly south?', 'In October.', 'When'],
    ['___ is the library?', 'Next to the school.', 'Where'], ['___ did you put my book?', 'On the shelf.', 'Where'], ['___ is the cat hiding?', 'Under the bed.', 'Where'],
    ['___ did you see the moose?', 'At the lake.', 'Where'], ['___ do you keep your skates?', 'In the closet.', 'Where'],
    ['___ mitts are these?', 'They are Noor' + AP + 's.', 'Whose'], ['___ boots are by the door?', 'They are Sam' + AP + 's.', 'Whose'], ['___ lunch is this?', 'It is Priya' + AP + 's.', 'Whose'],
    ['___ drawing is on the fridge?', 'It is Kai' + AP + 's.', 'Whose'], ['___ bike is in the yard?', 'It is Owen' + AP + 's.', 'Whose'],
    ['___ did you get here?', 'By bus.', 'How'], ['___ do you make bannock?', 'With flour, water and baking powder.', 'How'], ['___ did you fix the kite?', 'With tape and string.', 'How'],
    ['___ will we get to the island?', 'By ferry.', 'How'], ['___ do you send a letter?', 'By mail.', 'How'],
    ['___ colour do you like best?', 'Blue.', 'Which'], ['___ book do you want?', 'The green one.', 'Which'], ['___ season is your favourite?', 'Winter.', 'Which'],
    ['___ hat is yours?', 'The striped one.', 'Which'], ['___ fruit should we buy?', 'Apples.', 'Which'],
    ['___ are you wearing a coat?', 'Because it is cold.', 'Why'], ['___ is the baby crying?', 'Because she is hungry.', 'Why'], ['___ did the ice melt?', 'Because the sun came out.', 'Why'],
    ['___ are the leaves falling?', 'Because it is fall.', 'Why']];
  var WORDS = ['When', 'Where', 'Whose', 'How', 'Which', 'Why'];
  var ASKS = { When: 'a time', Where: 'a place', Whose: 'an owner', How: 'a way', Which: 'a choice', Why: 'a reason' };
  /* [a moment, what you might say] */
  var WOW = [['You drop your cup.', 'Oops!'], ['You spill your juice.', 'Oops!'], ['You bump your knee.', 'Ouch!'], ['You stub your toe.', 'Ouch!'], ['Your team wins.', 'Hooray!'],
    ['It is a snow day.', 'Hooray!'], ['You see a giant rainbow.', 'Wow!'], ['A whale jumps out of the water.', 'Wow!'], ['You want quiet.', 'Shh!'], ['The baby is sleeping.', 'Shh!'],
    ['You taste sour milk.', 'Yuck!'], ['You step in cold mud.', 'Yuck!'], ['You jump into an icy lake.', 'Brr!'], ['A freezing wind blows.', 'Brr!'],
    ['You just catch the bus.', 'Phew!'], ['You find your lost key.', 'Phew!']];
  var SAYWORDS = ['Oops!', 'Ouch!', 'Hooray!', 'Wow!', 'Shh!', 'Yuck!', 'Brr!', 'Phew!'];
  /* sentences that start with an interjection */
  var WOWLINES = ['Oops, I dropped the eggs!', 'Ouch, that pan is hot!', 'Hooray, the pool is open!', 'Wow, look at that moose!', 'Shh, the movie is starting!',
    'Yuck, this soup is cold!', 'Brr, the wind is icy!', 'Phew, we made it on time!', 'Wow, what a tall tree!', 'Oops, I forgot my hat!'];

  /* a ball and a box: where is the ball? (drawn in the page's own colours) */
  function scene(where) {
    var ball = { on: [100, 34], under: [100, 132], 'in': [100, 82], beside: [168, 82], above: [100, 16] }[where];
    return '<svg viewBox="0 0 200 150" width="200" height="150" role="img" aria-label="a ball and a box">' +
      '<rect x="60" y="52" width="80" height="60" rx="4" fill="none" stroke="currentColor" stroke-width="3"/>' +
      (where === 'under' ? '<path d="M50 112h100" stroke="currentColor" stroke-width="3"/>' : '') +
      '<circle cx="' + ball[0] + '" cy="' + ball[1] + '" r="' + (where === 'above' ? 10 : 16) + '" fill="currentColor" opacity=".55"/></svg>';
  }
  function many(w) { return w[1] > 1; }
  function linkWord(w, past) { return past ? (many(w) ? 'were' : 'was') : (many(w) ? 'are' : 'is'); }

  /* ---------- show who owns it ---------- */
  function possessive(lv) {
    var o = R.pick(OWN), right = poss(o[0]) + ' ' + o[1];
    return Q.one('Which shows that the <b>' + o[1] + '</b> belongs to <b>' + o[0] + '</b>?', right, [o[0] + 's ' + o[1], o[0] + ' ' + o[1] + AP + 's'].slice(0, lv > 1 ? 2 : 1), {
      prompt: 'Who owns it? Add <b>' + AP + 's</b> to the owner.', hint: 'The ' + AP + 's goes on the owner, not the thing.', explain: W.sent(cap(right)), meta: { k: 'g3-possessive', owner: o[0], thing: o[1] } });
  }
  function fixPossessive() {
    var o = R.pick(OWN.filter(function (x) { return !/^the |^Uncle/.test(x[0]) && x[1].indexOf(' ') < 0; })), words = [o[0] + 's', o[1]].concat(R.pick(TAILS).split(' '));
    return { q: 'One word needs <b>' + AP + 's</b>. Tap it.', fig: W.sent(words.join(' ')), type: 'tap', tiles: words, answer: 0, hint: 'Who owns something?',
      explain: W.sent(poss(o[0]) + ' ' + words.slice(1).join(' ')), meta: { k: 'g3-fix-possessive', owner: o[0] } };
  }
  function possGap(lv) {
    var o = R.pick(OWN.filter(function (x) { return !/^the /.test(x[0]); }));
    return Q.tiles('Which fits?', poss(o[0]), [o[0] + 's', o[0]].slice(0, lv > 1 ? 2 : 1), { fig: W.sent('This is ' + W.gap() + ' ' + o[1] + '.'),
      hint: 'The ' + o[1] + ' belongs to ' + o[0] + '.', explain: W.sent('This is ' + poss(o[0]) + ' ' + o[1] + '.'), meta: { k: 'g3-poss-gap', owner: o[0] } });
  }
  function possTf() {
    var o = R.pick(OWN), right = R.int(0, 1) === 1, said = right ? poss(o[0]) + ' ' + o[1] : R.pick([o[0] + 's ' + o[1], o[0] + ' ' + o[1] + AP + 's']);
    return { q: Q.name() + ' wrote this to show who owns it. Is it right?', fig: W.sent(cap(said)), type: 'tf', answer: right, hint: 'Is the ' + AP + 's on the owner?',
      explain: W.sent(cap(poss(o[0]) + ' ' + o[1])), meta: { k: 'g3-poss-tf', said: said, owner: o[0], thing: o[1] } };
  }
  function pickPoss(lv) {
    var os = R.some(OWN, 4), n = R.int(1, 3);
    var right = os.slice(0, n).map(function (o) { return poss(o[0]) + ' ' + o[1]; }), wrong = os.slice(n).map(function (o) { return o[0] + ' ' + o[1] + AP + 's'; });
    return Q.all('Pick every one that shows the owner the right way.', right, wrong, { hint: 'The ' + AP + 's goes on the owner.', explain: right.map(function (x) { return W.sent(x); }).join(''), meta: { k: 'g3-pick-poss' } });
  }

  /* ---------- is, are, was, were ---------- */
  function linking(lv) {
    var w = R.pick(WHO), past = lv > 1 && R.int(0, 1) === 1, right = linkWord(w, past), tiles = past ? ['was', 'were'] : ['is', 'are'];
    return { q: 'Which word fits?', fig: W.sent(w[0] + ' ' + W.gap() + ' ' + R.pick(HOW) + (past ? ' yesterday' : ' today') + '.'), type: 'tap', tiles: tiles, answer: tiles.indexOf(right),
      prompt: 'Is it <b>one</b>, or <b>more than one</b>?', hint: 'One: is, was. More than one: are, were.', explain: w[0] + ' <b>' + right + '</b>.', meta: { k: 'g3-linking', who: w[0], past: past } };
  }
  function matchLinking() {
    var ones = WHO.filter(function (w) { return !many(w); }), more = WHO.filter(many);
    return { q: 'Match each start to the word that fits.', type: 'match', pairs: R.shuffle([[R.pick(ones)[0], 'is'], [R.pick(more)[0], 'are']]), hint: 'One: is. More than one: are.', explain: 'One bear <b>is</b>. Two bears <b>are</b>.', meta: { k: 'g3-match-linking' } };
  }
  function linkPick(lv) {
    var w = R.pick(WHO), past = lv > 1, h = R.pick(HOW), right = w[0] + ' ' + linkWord(w, past) + ' ' + h + '.';
    var wrong = (past ? ['was', 'were'] : ['is', 'are']).filter(function (x) { return x !== linkWord(w, past); }).map(function (x) { return w[0] + ' ' + x + ' ' + h + '.'; });
    return Q.one('Which sentence is right?', right, wrong, { hint: 'Is it one, or more than one?', explain: W.sent(right), meta: { k: 'g3-link-pick', who: w[0] } });
  }
  function linkTf() {
    var w = R.pick(WHO), past = R.int(0, 1) === 1, right = R.int(0, 1) === 1, said = right ? linkWord(w, past) : linkWord([w[0], many(w) ? 1 : 2], past), h = R.pick(HOW);
    return { q: Q.name() + ' wrote this. Is it right?', fig: W.sent(w[0] + ' <b>' + said + '</b> ' + h + '.'), type: 'tf', answer: right,
      why: { options: ['It is about one.', 'It is about more than one.'], answer: many(w) ? 1 : 0 }, hint: 'Is it one, or more than one?',
      explain: W.sent(w[0] + ' <b>' + linkWord(w, past) + '</b> ' + h + '.'), meta: { k: 'g3-link-tf', who: w[0], said: said } };
  }

  /* ---------- what is happening (is/was + -ing) ---------- */
  function progressive(lv) {
    var d = R.pick(DO), n = Q.name(), now = lv < 2 || R.int(0, 1) === 1, right = n + (now ? ' is ' : ' was ') + d[1] + '.';
    return Q.one('Which tells what <b>' + (now ? 'is happening right now' : 'was happening for a while') + '</b>?', right,
      [n + ' ' + d[2] + '.', n + ' will ' + d[0] + '.'].concat(lv > 1 ? [n + (now ? ' was ' : ' is ') + d[1] + '.'] : []), {
        hint: (now ? 'is' : 'was') + ' + a word ending in -ing.', explain: W.sent(right), meta: { k: 'g3-progressive', now: now, who: n } });
  }
  function helper(lv) {
    var w = R.pick(lv > 1 ? WHO : WHO.filter(function (x) { return !many(x); })), d = R.pick(DO), now = R.int(0, 1) === 1, right = linkWord(w, !now);
    var tiles = lv > 1 ? ['is', 'are', 'was', 'were'] : ['is', 'was'];
    return { q: 'Which helper fits?', fig: W.sent((now ? 'Right now, ' + w[0].replace(/^(The|My|Our|A) /, function (x) { return x.toLowerCase(); }) : w[0]) + ' ' + W.gap() + ' ' + d[1] + (now ? '.' : ' when the bell rang.')),
      type: 'tap', tiles: tiles, answer: tiles.indexOf(right), hint: 'Right now: is or are. Before: was or were.', explain: W.sent(w[0] + ' <b>' + right + ' ' + d[1] + '</b>.'),
      meta: { k: 'g3-helper', who: w[0], now: now } };
  }
  function ingMissing() {
    var d = R.pick(DO), n = Q.name();
    return Q.tiles('A word is missing. Which one?', 'is', ['was', 'will'], { fig: W.sent(n + ' ' + W.gap() + ' ' + d[1] + ' right now.'),
      hint: 'An -ing word needs a helper. It is happening now.', explain: W.sent(n + ' <b>is</b> ' + d[1] + ' right now.'), meta: { k: 'g3-ing-missing', d: d[1] } });
  }
  function ingTf() {
    var d = R.pick(DO), n = Q.name(), right = R.int(0, 1) === 1, said = right ? n + ' is ' + d[1] + '.' : R.pick([n + ' ' + d[1] + '.', n + ' ' + d[2] + '.']);
    return { q: Q.name() + ' says this tells what <b>is happening right now</b>.', fig: W.sent(said), type: 'tf', answer: right, hint: 'Look for is + a word ending in -ing.',
      explain: W.sent(n + ' is ' + d[1] + '.'), meta: { k: 'g3-ing-tf', said: said, who: n } };
  }

  /* ---------- words that tell where ---------- */
  function place(lv) {
    var p = R.pick(lv > 1 ? PLACES : ['on', 'under', 'in']);
    return { q: 'Where is the ball?', fig: scene(p), type: 'tap', tiles: PLACES.map(function (x) { return x + ' the box'; }), answer: PLACES.indexOf(p),
      hint: 'Look at the ball and the box.', explain: 'The ball is <b>' + p + '</b> the box.', meta: { k: 'g3-place' } };
  }
  function placeTf() {
    var p = R.pick(PLACES), right = R.int(0, 1) === 1, said = right ? p : R.pick(PLACES.filter(function (x) { return x !== p; }));
    return { q: Q.name() + ' says: <b>The ball is ' + said + ' the box.</b>', fig: scene(p), type: 'tf', answer: right, hint: 'Look at the ball and the box.',
      explain: 'The ball is <b>' + p + '</b> the box.', meta: { k: 'g3-place-tf', said: said } };
  }
  function placeSentence(lv) {
    var p = R.pick(PLACES);
    return Q.one('Which sentence matches the picture?', 'The ball is ' + p + ' the box.', R.some(PLACES.filter(function (x) { return x !== p; }), lv > 1 ? 3 : 2).map(function (x) { return 'The ball is ' + x + ' the box.'; }), {
      fig: scene(p), hint: 'Look at the ball and the box.', explain: 'The ball is <b>' + p + '</b> the box.', meta: { k: 'g3-place-sentence' } });
  }
  function whereWord() {
    var w = R.pick(WHERE), words = (w[0] + ' ' + w[1] + ' ' + w[2]).split(' ');
    return { q: 'Tap the word that tells <b>where</b>.', fig: W.sent(words.join(' ')), type: 'tap', tiles: words, answer: words.indexOf(w[1]), hint: 'Which word tells where it is, or where it went?',
      explain: W.sent(w[0] + ' <mark class="hl">' + w[1] + '</mark> ' + w[2]), meta: { k: 'g3-where-word' } };
  }

  /* ---------- question words ---------- */
  function askWord(lv) {
    var a = R.pick(ASK);
    return Q.tiles('Which word starts this question?', a[2], R.some(WORDS.filter(function (w) { return w !== a[2]; }), lv > 1 ? 3 : 2), {
      fig: W.sent(a[0].replace('___', W.gap())) + W.sent(a[1]), prompt: 'Look at the answer. Is it a time, a place, an owner, a way, a choice or a reason?',
      hint: 'When = a time. Where = a place. Whose = an owner. How = a way. Which = a choice. Why = a reason.', explain: W.sent(a[0].replace('___', a[2])), meta: { k: 'g3-ask-word', a: a[1] } });
  }
  function matchAsk() {
    var ws = R.some(WORDS, 3);
    return { q: 'Match each question word to what it asks for.', type: 'match', pairs: ws.map(function (w) { return [w, ASKS[w]]; }), hint: 'Think of a question that starts with each word.',
      explain: 'When: a time. Where: a place. Whose: an owner. How: a way. Which: a choice. Why: a reason.', meta: { k: 'g3-match-ask' } };
  }
  function answerFor(lv) {
    var a = R.pick(ASK), others = R.some(WORDS.filter(function (w) { return w !== a[2]; }), lv > 1 ? 3 : 2).map(function (w) { return R.pick(ASK.filter(function (x) { return x[2] === w; }))[1]; });
    return Q.one('Which answer fits this question?', a[1], others, { fig: W.sent(a[0].replace('___', '<b>' + a[2] + '</b>')), hint: '<b>' + a[2] + '</b> asks for ' + ASKS[a[2]] + '.',
      explain: W.sent(a[1]), meta: { k: 'g3-answer-for', w: a[2] } });
  }
  function askTf() {
    var a = R.pick(ASK), right = R.int(0, 1) === 1, w = right ? a[2] : R.pick(WORDS.filter(function (x) { return x !== a[2]; }));
    return { q: Q.name() + ' asks this question. Does the answer fit?', fig: W.sent(a[0].replace('___', '<b>' + w + '</b>')) + W.sent(a[1]), type: 'tf', answer: right,
      hint: '<b>' + w + '</b> asks for ' + ASKS[w] + '.', explain: W.sent(a[0].replace('___', a[2])), meta: { k: 'g3-ask-tf', w: w, a: a[1] } };
  }

  /* ---------- feeling words (interjections) ---------- */
  function interjection(lv) {
    var x = R.pick(WOW);
    return Q.tiles('What might you say?', x[1], R.some(SAYWORDS.filter(function (y) { return y !== x[1]; }), lv > 1 ? 3 : 2), {
      fig: W.sent(x[0]), hint: 'How would you feel?', explain: 'Words like <b>' + x[1] + '</b> show a feeling. They are called interjections.', meta: { k: 'g3-wow', s: x[0] } });
  }
  function matchWow() {
    var xs = R.some(SAYWORDS, 3).map(function (w) { return R.pick(WOW.filter(function (x) { return x[1] === w; })); });
    return { q: 'Match each moment to what you might say.', type: 'match', pairs: xs.map(function (x) { return [x[0], x[1]]; }), hint: 'How would you feel?', explain: 'Interjections show a quick feeling.', meta: { k: 'g3-match-wow' } };
  }
  function tapWow() {
    var s = R.pick(WOWLINES), words = s.split(' ');
    return { q: 'Tap the <b>feeling word</b>.', fig: W.sent(s), type: 'tap', tiles: words, answer: 0, hint: 'Which word shows a quick feeling?',
      explain: 'A feeling word often comes first, with a comma after it.', meta: { k: 'g3-tap-wow' } };
  }
  function wowTf() {
    var x = R.pick(WOW), right = R.int(0, 1) === 1, said = right ? x[1] : R.pick(SAYWORDS.filter(function (y) { return y !== x[1]; }));
    return { q: x[0] + ' ' + Q.name() + ' says <b>' + said + '</b> Does it fit?', fig: W.sent(said), type: 'tf', answer: right, hint: 'How would you feel?',
      explain: 'You might say <b>' + x[1] + '</b>', meta: { k: 'g3-wow-tf', s: x[0], said: said } };
  }

  Atlas.register('grammar', {
    full: true,
    lessons: [{
      id: 'nouns-verbs', title: 'Owners and verbs', sub: 'Who owns it, and is, are, was, were.',
      concepts: [
        { slug: 'possessive', title: 'Show who owns it', exp: ['B3.2'], skill: 'possessive',
          model: [
            step(W.tile('Kai') + ' ' + W.tile('kite'), 'The kite belongs to Kai.'),
            step(W.tile('Kai' + AP + 's') + ' ' + W.tile('kite'), 'Add <b>' + AP + 's</b> to the owner.'),
            step(W.tile('the dog') + ' ' + W.tile('bowl'), 'Another one.'),
            step(W.tile('the dog' + AP + 's') + ' ' + W.tile('bowl')),
            step(W.sent('<s>Kais kite</s> &nbsp; <s>Kai kite' + AP + 's</s>'), 'Not on the thing. Not without the mark.')
          ],
          guided: [function () { return possessive(1); }, function () { return possGap(1); }, fixPossessive],
          check: [function () { return possessive(2); }, possTf, function () { return pickPoss(2); }, fixPossessive, function () { return possGap(3); }],
          coach: '<p>Point to things around the room: "Whose cup is this?" "It is Dad' + AP + 's cup." Write a few on sticky notes.</p>',
          mistake: '<p>Adding an apostrophe to every word that ends in s (two cat' + AP + 's). Only add it when something belongs to someone.</p>' },
        { slug: 'is-are', title: 'is, are, was, were', exp: ['B3.2'], skill: 'linking',
          model: [
            step(W.sent('The bear <b>is</b> hungry.'), 'One: <b>is</b>.'),
            step(W.sent('The bears <b>are</b> hungry.'), 'More than one: <b>are</b>.'),
            step(W.sent('The bear <b>was</b> hungry.'), 'In the past, one: <b>was</b>.'),
            step(W.sent('The bears <b>were</b> hungry.'), 'In the past, more than one: <b>were</b>.'),
            step(W.sent('The geese <b>are</b> noisy.'), 'No s, but more than one.')
          ],
          guided: [function () { return linking(1); }, matchLinking, function () { return linkPick(1); }],
          check: [function () { return linking(2); }, linkTf, function () { return linkPick(2); }, matchLinking, function () { return linking(3); }],
          coach: '<p>Hold up one finger or a whole hand as the child chooses: one is "is", a hand is "are".</p>',
          mistake: '<p>"The geese is". Some words mean more than one without an s (geese, children, people, mice).</p>' },
        { slug: 'ing', title: 'What is happening', exp: ['B3.2'], skill: 'progressive',
          model: [
            step(W.sent('Ava <b>skated</b>.'), 'Done. It is over.'),
            step(W.sent('Ava <b>is skating</b>.'), 'Happening <b>right now</b>.'),
            step(W.sent('Ava <b>was skating</b> when it snowed.'), 'Happening <b>for a while</b>, in the past.'),
            step(W.sent('The kids <b>are</b> sing<b>ing</b>.'), 'More than one: <b>are</b> + -ing.'),
            step(W.sent('The kids <b>were</b> sing<b>ing</b> when the bell rang.'), 'In the past: <b>were</b> + -ing.')
          ],
          guided: [function () { return progressive(1); }, function () { return helper(1); }, ingMissing],
          check: [function () { return progressive(2); }, ingTf, function () { return helper(2); }, ingMissing, function () { return progressive(3); }],
          coach: '<p>Narrate what the child is doing: "You are drawing." Then later: "You were drawing when I came in."</p>',
          mistake: '<p>Leaving out is or was ("Ava skating"). The -ing word needs its helper.</p>' }
      ]
    }, {
      id: 'little-words', title: 'Little words, big jobs', sub: 'Where, question words, and feeling words.',
      concepts: [
        { slug: 'where', title: 'Words that tell where', exp: ['B3.2'], skill: 'where',
          model: [
            step(scene('on'), 'The ball is <b>on</b> the box.'),
            step(scene('in'), 'The ball is <b>in</b> the box.'),
            step(scene('under'), 'The ball is <b>under</b> the box.'),
            step(scene('beside'), 'The ball is <b>beside</b> the box.'),
            step(W.sent('The ducks swam <mark class="hl">across</mark> the pond.'), 'In a sentence too.')
          ],
          guided: [function () { return place(1); }, whereWord, placeTf],
          check: [function () { return place(2); }, whereWord, function () { return placeSentence(2); }, placeTf, function () { return place(3); }],
          coach: '<p>Hide a toy around the room and ask the child to tell you where it is in a full sentence.</p>',
          mistake: '<p>Mixing up "on" and "above". On touches; above does not.</p>' },
        { slug: 'question-words', title: 'Question words', exp: ['B3.2'], skill: 'question-words',
          model: [
            step(W.sent('<b>When</b> is your birthday?') + W.sent('In May.'), '<b>When</b> asks for a time.'),
            step(W.sent('<b>Where</b> is the library?') + W.sent('Next to the school.'), '<b>Where</b> asks for a place.'),
            step(W.sent('<b>Whose</b> mitts are these?') + W.sent('They are Noor' + AP + 's.'), '<b>Whose</b> asks for the owner.'),
            step(W.sent('<b>How</b> did you get here?') + W.sent('By bus.'), '<b>How</b> asks for the way.'),
            step(W.sent('<b>Why</b> are you wearing a coat?') + W.sent('Because it is cold.'), '<b>Why</b> asks for a reason.')
          ],
          guided: [function () { return askWord(1); }, matchAsk, function () { return answerFor(1); }],
          check: [function () { return askWord(2); }, askTf, function () { return answerFor(2); }, matchAsk, function () { return askWord(3); }],
          coach: '<p>Give an answer ("At the rink") and let the child make up the question ("Where...?").</p>',
          mistake: '<p>Using "who' + AP + 's" for "whose". "Whose" asks who owns something.</p>' },
        { slug: 'interjections', title: 'Feeling words', exp: ['B3.2'], skill: 'interjections',
          model: [
            step(W.sent('Oops!'), 'You drop your cup.'),
            step(W.sent('Ouch!'), 'You bump your knee.'),
            step(W.sent('Brr!'), 'You jump into an icy lake.'),
            step(W.sent('<b>Hooray</b>, we won!'), 'In a sentence: the feeling word, then a comma.'),
            step(W.icon('star'), 'These are called <b>interjections</b>.')
          ],
          guided: [function () { return interjection(1); }, tapWow, matchWow],
          check: [function () { return interjection(2); }, wowTf, tapWow, matchWow, function () { return interjection(3); }],
          coach: '<p>Look for interjections in comics and picture books. Read them with lots of feeling.</p>',
          mistake: '<p>Using lots of them in one piece of writing. One or two is plenty.</p>' }
      ]
    }],
    practice: [
      { id: 'possessive', name: 'Show who owns it', code: 'B3.2', gen: possessive },
      { id: 'linking', name: 'is, are, was, were', code: 'B3.2', gen: linking },
      { id: 'progressive', name: 'What is happening', code: 'B3.2', gen: progressive },
      { id: 'where', name: 'Words that tell where', code: 'B3.2', gen: place },
      { id: 'question-words', name: 'Question words', code: 'B3.2', gen: askWord },
      { id: 'interjections', name: 'Feeling words', code: 'B3.2', gen: interjection }
    ]
  });

  Q.shapes('grammar', {
    possessive: [[1, 'gap', possGap], [1, 'fix', fixPossessive], [2, 'true-false', possTf], [2, 'pick', pickPoss]],
    linking: [[1, 'match', matchLinking], [1, 'pick', linkPick], [2, 'true-false', linkTf]],
    progressive: [[1, 'helper', helper], [1, 'missing', ingMissing], [2, 'true-false', ingTf]],
    where: [[1, 'tap-word', whereWord], [1, 'true-false', placeTf], [2, 'sentence', placeSentence]],
    'question-words': [[1, 'match', matchAsk], [1, 'answer', answerFor], [2, 'true-false', askTf]],
    interjections: [[1, 'tap-word', tapWow], [1, 'match', matchWow], [2, 'true-false', wowTf]]
  });
})();
