/* Grade 2: word meanings.
   Ontario 2023 Language, Grade 2:
   B2.4 "demonstrate an understanding of a variety of words, acquire and use explicitly taught vocabulary in various contexts,
        including other subject areas, and use their developing morphological knowledge to analyze and understand new words in context"
   From the Language Foundations Continuum, Grade 2: synonyms and antonyms; words that vary slightly in meaning (eat and devour);
   words with more than one meaning; clues in the sentence; finding words in a dictionary.
   All word lists and sentences are written for this site. Answer checks: tests/verify/grade2-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  /* [word, a word that means the same, a sentence with the first word] */
  var SAME = [['big', 'large', 'We saw a big moose.'], ['small', 'little', 'A small bird sat on the fence.'], ['happy', 'glad', 'I am happy you came.'], ['fast', 'quick', 'The fox was fast.'],
    ['begin', 'start', 'The game will begin soon.'], ['shout', 'yell', 'Please do not shout inside.'], ['jump', 'leap', 'Frogs jump into the pond.'], ['close', 'shut', 'Please close the door.'],
    ['gift', 'present', 'Mei gave me a gift.'], ['rock', 'stone', 'I sat on a flat rock.'], ['sick', 'ill', 'Owen stayed home because he was sick.'], ['angry', 'mad', 'The angry goose honked at us.'],
    ['end', 'finish', 'We clapped at the end of the play.'], ['look', 'see', 'Look at the rainbow!'], ['talk', 'speak', 'We talk at lunch.'], ['under', 'below', 'The cat is under the bed.']];
  /* [word, its opposite, a sentence with the first word] */
  var OPP = [['hot', 'cold', 'The soup is hot.'], ['up', 'down', 'The ball went up.'], ['full', 'empty', 'The cup is full.'], ['early', 'late', 'We got to school early.'], ['loud', 'quiet', 'The music is loud.'],
    ['wet', 'dry', 'My boots are wet.'], ['first', 'last', 'Ava was first in line.'], ['heavy', 'light', 'The bag is heavy.'], ['win', 'lose', 'I hope we win.'], ['push', 'pull', 'Push the door.'],
    ['open', 'closed', 'The store is open.'], ['old', 'new', 'I have old shoes.'], ['day', 'night', 'Owls sleep in the day.'], ['in', 'out', 'The dog went in.'], ['happy', 'sad', 'Theo looks happy.'], ['fast', 'slow', 'The train is fast.']];
  /* families from weakest to strongest */
  var LADDER = [['cool', 'cold', 'freezing'], ['warm', 'hot', 'boiling'], ['good', 'great', 'amazing'], ['damp', 'wet', 'soaked'], ['nibble', 'eat', 'gobble'], ['small', 'tiny'], ['big', 'huge'],
    ['happy', 'thrilled'], ['like', 'love'], ['mad', 'furious'], ['tired', 'exhausted'], ['walk', 'stomp'], ['scared', 'terrified'], ['talk', 'shout']];
  /* [word, [meaning, sentence], [meaning, sentence]] */
  var TWO = [
    ['bat', ['an animal that flies at night', 'A bat hung upside down in the cave.'], ['a stick for hitting a ball', 'Omar swung the bat and hit the ball.']],
    ['bark', ['the sound a dog makes', 'The puppy gave a loud bark.'], ['the outside of a tree', 'The bark of the birch tree is white.']],
    ['fall', ['the season after summer', 'The leaves turn red in the fall.'], ['to drop down', 'Be careful not to fall on the ice.']],
    ['light', ['not heavy', 'The empty box is light.'], ['something that helps you see', 'Turn on the light, please.']],
    ['park', ['a place with grass to play', 'We had a picnic in the park.'], ['to stop a car and leave it', 'Dad will park the van here.']],
    ['ring', ['jewellery for your finger', 'Grandma wears a gold ring.'], ['the sound a bell makes', 'I heard the bell ring.']],
    ['wave', ['water that rises on a lake', 'A big wave splashed the dock.'], ['to move your hand to say hi', 'Wave to the bus driver.']],
    ['duck', ['a bird that swims', 'A duck swam across the pond.'], ['to bend down fast', 'Duck under the low branch!']],
    ['trunk', ['the nose of an elephant', 'The elephant sprayed water from its trunk.'], ['the main stem of a tree', 'Kai leaned on the trunk of the maple.']],
    ['nail', ['the hard part at the end of a finger', 'I painted my nail blue.'], ['a thin metal spike', 'Dad hit the nail with a hammer.']],
    ['seal', ['an animal that swims in the sea', 'A seal slid off the rock into the sea.'], ['to close tightly', 'Seal the envelope before you mail it.']],
    ['rock', ['a stone', 'We sat on a big rock.'], ['to move gently back and forth', 'Rock the baby to sleep.']]
  ];
  /* [sentence with the new word in bold, the word, what it means, two wrong meanings, the clue] */
  var CLUE = [
    ['The soup was <b>scalding</b>, so I waited for it to cool down.', 'scalding', 'very hot', ['very cold', 'very salty'], 'waited for it to cool down'],
    ['The puppy was <b>timid</b> and hid behind the couch.', 'timid', 'shy and a bit scared', ['brave', 'hungry'], 'hid behind the couch'],
    ['The kitten was <b>famished</b>, so it ate the whole bowl fast.', 'famished', 'very hungry', ['very sleepy', 'very wet'], 'ate the whole bowl fast'],
    ['After the long walk, my feet were <b>weary</b> and sore.', 'weary', 'tired', ['clean', 'cold'], 'After the long walk'],
    ['The garden was <b>vibrant</b> with red, yellow and purple flowers.', 'vibrant', 'bright and full of colour', ['dark and dull', 'empty'], 'red, yellow and purple flowers'],
    ['The trail was <b>steep</b>, so we climbed slowly up the hill.', 'steep', 'going up sharply', ['flat', 'muddy'], 'climbed slowly up the hill'],
    ['The baby was <b>drowsy</b> and soon fell asleep.', 'drowsy', 'sleepy', ['angry', 'thirsty'], 'soon fell asleep'],
    ['The old bridge was <b>fragile</b>, so only one person could cross at a time.', 'fragile', 'easy to break', ['very strong', 'brand new'], 'only one person could cross'],
    ['The pond was so <b>frigid</b> that ice covered the top.', 'frigid', 'very cold', ['very warm', 'very deep'], 'ice covered the top'],
    ['Liam was <b>delighted</b> and grinned when he opened the gift.', 'delighted', 'very pleased', ['very upset', 'very bored'], 'grinned when he opened the gift'],
    ['The hall was <b>silent</b>; no one made a sound.', 'silent', 'with no sound', ['very loud', 'very bright'], 'no one made a sound'],
    ['The giant tree was so <b>enormous</b> that five of us could not reach around it.', 'enormous', 'very big', ['very small', 'very old'], 'could not reach around it']
  ];
  var WORDS = ['apple', 'banana', 'cedar', 'drum', 'eagle', 'fox', 'garden', 'helmet', 'island', 'jacket', 'kettle', 'lake', 'maple', 'nest', 'otter', 'paddle', 'quilt', 'river', 'snow', 'tent', 'umbrella', 'violin', 'wagon', 'yarn', 'zebra'];
  var SAMESTART = [['bear', 'bike', 'boat'], ['cake', 'city', 'cup'], ['sand', 'shell', 'sun'], ['map', 'milk', 'moon'], ['tea', 'tiger', 'toy'], ['lake', 'leaf', 'lion'], ['pear', 'pine', 'pond']];
  function sorted(list) { return list.slice().sort(); }

  /* ---------- same ---------- */
  function same(lv) {
    var p = R.pick(SAME), o = R.pick(OPP);
    return Q.tiles('Which word means the <b>same</b> as <b>' + p[0] + '</b>?', p[1], [o[1]].concat(lv > 1 ? [R.pick(SAME.filter(function (x) { return x !== p && x[0] !== o[1]; }))[1]] : []), {
      prompt: 'Try it in a sentence. Does the meaning stay the same?', hint: 'Words that mean the same are called synonyms.', explain: W.tile(p[0]) + ' = ' + W.tile(p[1]),
      meta: { k: 'g2-same', word: p[0] } });
  }
  function sameSwap(lv) {
    var p = R.pick(SAME), wrong = R.some(SAME.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; });
    return Q.tiles('Which word can take the place of <b>' + p[0] + '</b>?', p[1], wrong, { fig: W.sent(p[2].replace(new RegExp('\\b' + p[0] + '\\b', 'i'), function (m) { return '<b>' + m + '</b>'; })),
      hint: 'Put each word in the sentence. Does it still mean the same?', explain: W.sent(p[2].replace(new RegExp('\\b' + p[0] + '\\b', 'i'), '<b>' + p[1] + '</b>')), meta: { k: 'g2-same-swap', word: p[0] } });
  }
  function matchSame() {
    var ps = R.some(SAME, 3);
    return { q: 'Match each word to a word that means the same.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Try each pair in a sentence.',
      explain: 'Synonyms can swap places in a sentence.', meta: { k: 'g2-match-same' } };
  }
  function sameTf() {
    var p = R.pick(SAME), right = R.int(0, 1) === 1, other = right ? p[1] : R.pick(SAME.filter(function (x) { return x !== p; }))[1];
    return { q: Q.name() + ' says these words mean the same.', fig: W.tile(p[0]) + ' ' + W.tile(other), type: 'tf', answer: right,
      why: { options: ['You can swap one for the other.', 'They mean different things.'], answer: right ? 0 : 1 },
      hint: 'Put both in the same sentence.', explain: W.tile(p[0]) + ' = ' + W.tile(p[1]), meta: { k: 'g2-same-tf', a: p[0], b: other } };
  }

  /* ---------- opposite ---------- */
  function opposite(lv) {
    var p = R.pick(OPP), s = R.pick(SAME.filter(function (x) { return x[0] !== p[0] && x[1] !== p[1]; }));
    return Q.tiles('Which word means the <b>opposite</b> of <b>' + p[0] + '</b>?', p[1], [s[1]].concat(lv > 1 ? [R.pick(OPP.filter(function (x) { return x !== p && x[1] !== s[1]; }))[1]] : []), {
      prompt: 'Think: what is the other end?', hint: 'Words that mean the opposite are called antonyms.', explain: W.tile(p[0]) + ' &harr; ' + W.tile(p[1]),
      meta: { k: 'g2-opposite', word: p[0] } });
  }
  function oppFlip(lv) {
    var p = R.pick(OPP), wrong = R.some(OPP.filter(function (x) { return x !== p; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }).concat([p[0]]);
    var re = new RegExp('\\b' + p[0] + '\\b', 'i');
    return Q.tiles('Change the sentence to mean the <b>opposite</b>.', p[1], wrong.filter(function (w, i, all) { return w !== p[1] && all.indexOf(w) === i; }).slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(p[2].replace(re, function (m) { return '<b>' + m + '</b>'; })) + W.sent(p[2].replace(re, W.gap())), hint: 'Which word is the other end of ' + p[0] + '?',
      explain: W.sent(p[2].replace(re, '<b>' + p[1] + '</b>')), meta: { k: 'g2-opp-flip', word: p[0] } });
  }
  function matchOpp() {
    var ps = R.some(OPP.filter(function (x) { return x[0] !== 'happy' && x[0] !== 'fast'; }), 3);
    return { q: 'Match each word to its opposite.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Think of the other end.', explain: 'Opposites are called antonyms.', meta: { k: 'g2-match-opp' } };
  }
  function sameOrOpp() {
    var isSame = R.int(0, 1) === 1, p = R.pick(isSame ? SAME : OPP);
    return { q: 'Do these words mean the same, or the opposite?', fig: W.tile(p[0]) + ' ' + W.tile(p[1]), type: 'tap', tiles: ['the same', 'the opposite'], answer: isSame ? 0 : 1,
      hint: 'Put each word in the same sentence.', explain: isSame ? 'They mean the same.' : 'They are opposites.', meta: { k: 'g2-same-or-opp', a: p[0], b: p[1] } };
  }

  /* ---------- stronger ---------- */
  function stronger(lv) {
    var p = R.pick(LADDER.filter(function (l) { return lv > 1 ? l.length === 3 : true; })), top = p[p.length - 1];
    return Q.tiles('Which word is <b>strongest</b>?', top, p.slice(0, -1), { hint: 'Which word paints the biggest picture?',
      explain: p.map(function (w) { return W.tile(w); }).join(' &rarr; '), meta: { k: 'g2-stronger' } });
  }
  function ladder() {
    var l = R.pick(LADDER.filter(function (x) { return x.length === 3; }));
    return { q: 'Put these words in order, from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: l.slice(), first: 'Weakest', last: 'Strongest',
      hint: 'Which word says the least? Start there.', explain: l.join(', '), meta: { k: 'g2-ladder' } };
  }
  function strongerTf() {
    var l = R.pick(LADDER), i = R.int(0, l.length - 2), right = R.int(0, 1) === 1, a = right ? l[i + 1] : l[i], b = right ? l[i] : l[i + 1];
    return { q: Q.name() + ' says <b>' + a + '</b> is stronger than <b>' + b + '</b>.', fig: W.tile(b) + ' ' + W.tile(a), type: 'tf', answer: right,
      why: { options: [a + ' says more.', a + ' says less.'], answer: right ? 0 : 1 }, hint: 'Which word paints the bigger picture?',
      explain: l.map(function (w) { return W.tile(w); }).join(' &rarr; '), meta: { k: 'g2-stronger-tf', a: a, b: b } };
  }
  function strongerWord(lv) {
    var l = R.pick(LADDER), i = R.int(0, l.length - 2), wrong = R.some(LADDER.filter(function (x) { return x !== l; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; });
    return Q.tiles('Which word is a stronger way to say <b>' + l[i] + '</b>?', l[i + 1], i > 0 ? wrong.slice(0, 1).concat([l[i - 1]]) : wrong, { fig: W.tile(l[i]),
      hint: 'It means the same thing, but more.', explain: W.tile(l[i]) + ' &rarr; ' + W.tile(l[i + 1]), meta: { k: 'g2-stronger-word', word: l[i] } });
  }

  /* ---------- one word, two meanings ---------- */
  function bold(s, w) { return s.replace(new RegExp('\\b' + w + '\\b', 'i'), function (m) { return '<b>' + m + '</b>'; }); }
  function twoMeanings(lv) {
    var t = R.pick(TWO), j = R.int(1, 2), right = t[j], wrong = t[3 - j];
    return Q.one('What does <b>' + t[0] + '</b> mean in this sentence?', right[0], [wrong[0]].concat(lv > 1 ? [R.pick(TWO.filter(function (x) { return x !== t; }))[1][0]] : []), {
      fig: W.sent(bold(right[1], t[0])), prompt: 'Read the whole sentence. Which meaning makes sense here?',
      hint: 'This word has two meanings. The other words in the sentence tell you which one.', explain: '<b>' + t[0] + '</b> means ' + right[0] + ' here.', meta: { k: 'g2-two', word: t[0], s: right[1] } });
  }
  function twoMatch() {
    var t = R.pick(TWO);
    return { q: 'Match each sentence to what <b>' + t[0] + '</b> means.', type: 'match', pairs: [[t[1][1], t[1][0]], [t[2][1], t[2][0]]], hint: 'Read each sentence. Picture it.',
      explain: 'The same word can mean two different things.', meta: { k: 'g2-two-match', word: t[0] } };
  }
  function twoWhich() {
    var t = R.pick(TWO), j = R.int(1, 2);
    return Q.one('Which sentence uses <b>' + t[0] + '</b> to mean <b>' + t[j][0] + '</b>?', t[j][1], [t[3 - j][1]], { hint: 'Picture each sentence.',
      explain: W.sent(bold(t[j][1], t[0])), meta: { k: 'g2-two-which', word: t[0], mean: t[j][0] } });
  }
  function twoTf() {
    var t = R.pick(TWO), j = R.int(1, 2), right = R.int(0, 1) === 1, said = right ? t[j][0] : t[3 - j][0];
    return { q: Q.name() + ' says <b>' + t[0] + '</b> here means <b>' + said + '</b>.', fig: W.sent(bold(t[j][1], t[0])), type: 'tf', answer: right,
      why: { options: ['The other words in the sentence show it.', 'The sentence shows the other meaning.'], answer: right ? 0 : 1 },
      hint: 'Picture the sentence.', explain: '<b>' + t[0] + '</b> means ' + t[j][0] + ' here.', meta: { k: 'g2-two-tf', s: t[j][1], said: said } };
  }

  /* ---------- the clue in the sentence ---------- */
  function clue(lv) {
    var c = R.pick(CLUE);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Look for a clue in the rest of the sentence.',
      hint: 'Read the words around it. What makes sense?', explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g2-clue', word: c[1] } });
  }
  function clueWords() {
    var c = R.pick(CLUE), rest = c[0].replace(/<b>.*<\/b>/, '').replace(c[4], '').split(/[ ,.;]+/).filter(function (x) { return x.length > 2; });
    return Q.one('Which words are the clue to what <b>' + c[1] + '</b> means?', c[4], [rest.slice(0, 2).join(' ')], { fig: W.sent(c[0]), hint: 'Which words help you picture it?',
      explain: W.sent(c[0].replace(c[4], '<mark class="hl">' + c[4] + '</mark>')), meta: { k: 'g2-clue-words', word: c[1] } });
  }
  function clueTf() {
    var c = R.pick(CLUE), right = R.int(0, 1) === 1, said = right ? c[2] : R.pick(c[3]);
    return { q: Q.name() + ' thinks <b>' + c[1] + '</b> means <b>' + said + '</b>.', fig: W.sent(c[0]), type: 'tf', answer: right,
      why: { options: ['The clue in the sentence fits.', 'The clue in the sentence does not fit.'], answer: right ? 0 : 1 },
      hint: 'Find the clue. Does that meaning fit?', explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g2-clue-tf', word: c[1], said: said } };
  }
  function clueWord(lv) {
    var c = R.pick(CLUE), wrong = R.some(CLUE.filter(function (x) { return x !== c; }), lv > 1 ? 2 : 1).map(function (x) { return x[1]; });
    return Q.tiles('Which new word means <b>' + c[2] + '</b>?', c[1], wrong, { fig: W.sent(c[0]), hint: 'Find the clue in the sentence.', explain: W.tile(c[1]) + ' = ' + W.tile(c[2]), meta: { k: 'g2-clue-word', mean: c[2] } });
  }

  /* ---------- ABC order ---------- */
  function abc(lv) {
    var list = lv > 1 && R.int(0, 1) ? R.pick(SAMESTART) : R.some(WORDS, 3), first = sorted(list)[0];
    return Q.tiles('Which word comes <b>first</b> in a dictionary?', first, list.filter(function (w) { return w !== first; }), { prompt: 'Look at the first letter of each word. Which comes first in the alphabet?',
      hint: 'Same first letter? Look at the second letter.', explain: sorted(list).join(', '), meta: { k: 'g2-abc' } });
  }
  function abcOrder(lv) {
    var list = lv > 2 ? R.pick(SAMESTART) : R.some(WORDS, 4);
    return { q: 'Put these words in ABC order, like a dictionary.', type: 'order', items: sorted(list), first: 'First', last: 'Last', hint: 'Look at the first letter of each word.',
      explain: 'A, B, C, D, E, F, G...', meta: { k: 'g2-abc-order' } };
  }
  function abcLast(lv) {
    var list = lv > 1 && R.int(0, 1) ? R.pick(SAMESTART) : R.some(WORDS, 3), last = sorted(list)[list.length - 1];
    return Q.tiles('Which word comes <b>last</b> in a dictionary?', last, list.filter(function (w) { return w !== last; }), { hint: 'Which first letter comes latest in the alphabet?',
      explain: sorted(list).join(', '), meta: { k: 'g2-abc-last' } });
  }
  function abcBetween() {
    var list = sorted(R.some(WORDS, 5)), mid = list[2];
    return Q.tiles('Which word goes between <b>' + list[1] + '</b> and <b>' + list[3] + '</b>?', mid, [list[0], list[4]], { fig: W.tile(list[1]) + W.gap() + W.tile(list[3]),
      hint: 'It must come after ' + list[1] + ' and before ' + list[3] + '.', explain: list.slice(1, 4).join(', '), meta: { k: 'g2-abc-between' } });
  }

  Atlas.register('meanings', {
    full: true,
    lessons: [{
      id: 'same-opposite', title: 'Same, opposite and stronger', sub: 'How words are linked by meaning.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.4'], skill: 'same',
          model: [
            step(W.tile('big') + ' = ' + W.tile('large'), 'Synonyms.'),
            step(W.sent('We saw a <b>big</b> moose.') + W.sent('We saw a <b>large</b> moose.'), 'Swap them. The sentence still works.'),
            step(W.tile('shout') + ' = ' + W.tile('yell'), 'Another pair.'),
            step(W.sent('Please do not <b>yell</b> inside.'), 'Swap it in. Same meaning.')
          ],
          guided: [function () { return same(1); }, function () { return sameSwap(1); }, matchSame],
          check: [function () { return same(2); }, function () { return sameSwap(2); }, sameTf, matchSame, function () { return same(3); }],
          coach: '<p>Play "Say it another way": you say a word, the child says one that means the same.</p>',
          mistake: '<p>Choosing a word that is only linked ("big" and "elephant"). Test it in a sentence: does the meaning stay the same?</p>' },
        { slug: 'opposite', title: 'Words that mean the opposite', exp: ['B2.4'], skill: 'opposite',
          model: [
            step(W.tile('hot') + ' &harr; ' + W.tile('cold'), 'Antonyms.'),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'The other end.'),
            step(W.sent('The cup is <b>full</b>.'), 'Now flip it.'),
            step(W.sent('The cup is <b>empty</b>.'), 'One word changes the whole meaning.')
          ],
          guided: [function () { return opposite(1); }, sameOrOpp, function () { return oppFlip(1); }],
          check: [function () { return opposite(2); }, function () { return oppFlip(2); }, matchOpp, sameOrOpp, function () { return opposite(3); }],
          coach: '<p>Act it out: push and pull a door, go up and down the stairs.</p>',
          mistake: '<p>Picking a word that is just different ("hot" and "wet"). An opposite is the other end of the same thing.</p>' },
        { slug: 'stronger', title: 'Some words are stronger', exp: ['B2.4'], skill: 'stronger',
          model: [
            step(W.tile('eat') + ' &rarr; ' + W.tile('gobble'), 'Gobble is eating fast, with big bites.'),
            step(W.tile('cool') + ' &rarr; ' + W.tile('cold') + ' &rarr; ' + W.tile('freezing'), 'Each one says more.'),
            step(W.sent('After the race, I was <b>tired</b>.'), 'Very, very tired?'),
            step(W.sent('After the race, I was <b>exhausted</b>.'), 'Now the reader feels it.')
          ],
          guided: [function () { return stronger(1); }, function () { return strongerWord(1); }, ladder],
          check: [function () { return stronger(2); }, ladder, strongerTf, function () { return strongerWord(2); }, function () { return stronger(3); }],
          coach: '<p>Use your voice and face: say "warm" calmly and "boiling" with wide eyes. Then ask which word fits a cup of cocoa, and which fits a stove.</p>',
          mistake: '<p>Thinking stronger words are always better. The best word is the one that fits exactly.</p>' }
      ]
    }, {
      id: 'in-context', title: 'Meaning in a sentence', sub: 'Use the sentence to choose the meaning, and find words in a dictionary.',
      concepts: [
        { slug: 'two-meanings', title: 'One word, two meanings', exp: ['B2.4'], skill: 'two-meanings',
          model: [
            step(W.sent('A <b>bat</b> hung upside down in the cave.'), 'An animal.'),
            step(W.sent('Omar swung the <b>bat</b>.'), 'A stick for a ball.'),
            step(W.icon('read'), 'The other words tell you which.'),
            step(W.sent('The <b>bark</b> of the birch tree is white.'), 'Tree: the outside of a tree.'),
            step(W.sent('The puppy gave a loud <b>bark</b>.'), 'Puppy, loud: the sound a dog makes.')
          ],
          guided: [function () { return twoMeanings(1); }, twoMatch, twoWhich],
          check: [function () { return twoMeanings(2); }, twoWhich, twoTf, twoMatch, function () { return twoMeanings(3); }],
          coach: '<p>Draw both meanings of a word side by side (a dog barking, tree bark). Then say a sentence and ask which picture fits.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Ask: "Does that make sense in this sentence?"</p>' },
        { slug: 'clue', title: 'Find the clue in the sentence', exp: ['B2.4'], skill: 'clue',
          model: [
            step(W.sent('The kitten was <b>famished</b>, so it ate the whole bowl fast.'), 'A new word.'),
            step(W.sent('The kitten was <b>famished</b>, so it <mark class="hl">ate the whole bowl fast</mark>.'), 'A clue.'),
            step(W.tile('famished') + ' = ' + W.tile('very hungry')),
            step(W.sent('The baby was <b>drowsy</b> and <mark class="hl">soon fell asleep</mark>.'), 'Another clue.'),
            step(W.tile('drowsy') + ' = ' + W.tile('sleepy'))
          ],
          guided: [function () { return clue(1); }, clueWords, function () { return clueWord(1); }],
          check: [function () { return clue(2); }, clueWords, clueTf, function () { return clueWord(2); }, function () { return clue(3); }],
          coach: '<p>When a new word comes up in a book, stop and ask: "What words around it help?" Then check the meaning together.</p>',
          mistake: '<p>Skipping the new word. Praise the child for stopping to work it out.</p>' },
        { slug: 'abc', title: 'Find a word in a dictionary', exp: ['B2.4'], skill: 'abc',
          model: [
            step(W.tile('apple') + W.tile('drum') + W.tile('lake'), 'Words go in ABC order.'),
            step(W.tile(W.hl('bear', 0, 2)) + W.tile(W.hl('bike', 0, 2)), 'Same first letter? Look at the second.'),
            step(W.icon('read'), 'Find it, then read what it means.'),
            step(W.tile('fox') + W.gap() + W.tile('lake'), 'Where does <b>helmet</b> go?'),
            step(W.tile('fox') + W.tile('helmet') + W.tile('lake'), 'f, h, l.')
          ],
          guided: [function () { return abc(1); }, function () { return abcOrder(1); }, function () { return abcLast(1); }],
          check: [function () { return abc(2); }, function () { return abcOrder(2); }, abcBetween, function () { return abcLast(2); }, function () { return abcOrder(3); }],
          coach: '<p>Use a children' + '’' + 's dictionary, on paper or online. Race to find a word: first the letter, then the page.</p>',
          mistake: '<p>Looking only at the first letter when two words share it. Move on to the second letter.</p>' }
      ]
    }],
    practice: [
      { id: 'same', name: 'Words that mean the same', code: 'B2.4', gen: same },
      { id: 'opposite', name: 'Opposites', code: 'B2.4', gen: opposite },
      { id: 'stronger', name: 'Stronger words', code: 'B2.4', gen: stronger },
      { id: 'two-meanings', name: 'One word, two meanings', code: 'B2.4', gen: twoMeanings },
      { id: 'clue', name: 'Find the clue', code: 'B2.4', gen: clue },
      { id: 'abc', name: 'ABC order', code: 'B2.4', gen: abc }
    ],
    tasks: [
      { id: 'subject-words', title: 'Words from other subjects', code: 'B2.4', pic: W.icon('read'), say: 'Learn 3 new words from science or social studies. Use each one in a sentence.', write: true,
        run: ['Pick three words from a science or social studies topic (for example: habitat, season, community).', 'Talk about what each word means, with a picture or an example.', 'The child says or writes a sentence for each word.'],
        rubric: ['Does not use the new words yet.', 'Uses one word with help.', 'Uses all three words correctly.', 'Uses all three, and uses them again later without a reminder.'] }
    ]
  });

  Q.shapes('meanings', {
    same: [[1, 'swap', sameSwap], [1, 'match', matchSame], [2, 'tf', sameTf]],
    opposite: [[1, 'flip', oppFlip], [1, 'same-or-opposite', sameOrOpp], [2, 'match', matchOpp]],
    stronger: [[1, 'stronger-word', strongerWord], [1, 'ladder', ladder], [2, 'tf', strongerTf]],
    'two-meanings': [[1, 'match', twoMatch], [1, 'which-sentence', twoWhich], [2, 'tf', twoTf]],
    clue: [[1, 'clue-words', clueWords], [1, 'which-word', clueWord], [2, 'tf', clueTf]],
    abc: [[1, 'order', abcOrder], [1, 'last', abcLast], [2, 'between', abcBetween]]
  });
})();
