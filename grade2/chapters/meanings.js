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

  var SAME = [['big', 'large'], ['small', 'little'], ['happy', 'glad'], ['fast', 'quick'], ['begin', 'start'], ['shout', 'yell'], ['jump', 'leap'], ['close', 'shut'], ['gift', 'present'], ['rock', 'stone']];
  var OPP = [['hot', 'cold'], ['up', 'down'], ['full', 'empty'], ['early', 'late'], ['loud', 'quiet'], ['wet', 'dry'], ['first', 'last'], ['heavy', 'light'], ['win', 'lose'], ['push', 'pull']];
  /* [plain word, stronger word] */
  var STRONG = [['warm', 'hot'], ['small', 'tiny'], ['eat', 'gobble'], ['big', 'huge'], ['happy', 'thrilled'], ['cold', 'freezing'], ['wet', 'soaked'], ['like', 'love'], ['good', 'great'], ['mad', 'furious']];
  var LADDER = [['cool', 'cold', 'freezing'], ['warm', 'hot', 'boiling'], ['good', 'great', 'amazing'], ['damp', 'wet', 'soaked'], ['nibble', 'eat', 'gobble']];
  /* [word, [meaning, sentence], [meaning, sentence]] */
  var TWO = [
    ['bat', ['an animal that flies at night', 'A bat hung upside down in the cave.'], ['a stick for hitting a ball', 'Omar swung the bat and hit the ball.']],
    ['bark', ['the sound a dog makes', 'The puppy gave a loud bark.'], ['the outside of a tree', 'The bark of the birch tree is white.']],
    ['fall', ['the season after summer', 'The leaves turn red in the fall.'], ['to drop down', 'Be careful not to fall on the ice.']],
    ['light', ['not heavy', 'The empty box is light.'], ['something that helps you see', 'Turn on the light, please.']],
    ['park', ['a place with grass to play', 'We had a picnic in the park.'], ['to stop a car and leave it', 'Dad will park the van here.']],
    ['ring', ['jewellery for your finger', 'Grandma wears a gold ring.'], ['the sound a bell makes', 'I heard the bell ring.']],
    ['wave', ['water that rises on a lake', 'A big wave splashed the dock.'], ['to move your hand to say hi', 'Wave to the bus driver.']]
  ];
  /* [sentence with the new word in bold, the word, what it means, two wrong meanings, the clue] */
  var CLUE = [
    ['The soup was <b>scalding</b>, so I waited for it to cool down.', 'scalding', 'very hot', ['very cold', 'very salty'], 'waited for it to cool down'],
    ['The puppy was <b>timid</b> and hid behind the couch.', 'timid', 'shy and a bit scared', ['brave', 'hungry'], 'hid behind the couch'],
    ['The kitten was <b>famished</b>, so it ate the whole bowl fast.', 'famished', 'very hungry', ['very sleepy', 'very wet'], 'ate the whole bowl fast'],
    ['After the long walk, my feet were <b>weary</b> and sore.', 'weary', 'tired', ['clean', 'cold'], 'After the long walk'],
    ['The garden was <b>vibrant</b> with red, yellow and purple flowers.', 'vibrant', 'bright and full of colour', ['dark and dull', 'empty'], 'red, yellow and purple flowers'],
    ['The trail was <b>steep</b>, so we climbed slowly up the hill.', 'steep', 'going up sharply', ['flat', 'muddy'], 'climbed slowly up the hill']
  ];
  var WORDS = ['apple', 'banana', 'cedar', 'drum', 'eagle', 'fox', 'garden', 'helmet', 'island', 'jacket', 'kettle', 'lake', 'maple', 'nest', 'otter', 'paddle', 'quilt', 'river', 'snow', 'tent', 'umbrella', 'violin', 'wagon', 'yarn', 'zebra'];
  var SAMESTART = [['bear', 'bike', 'boat'], ['cake', 'city', 'cup'], ['sand', 'shell', 'sun'], ['map', 'milk', 'moon'], ['tea', 'tiger', 'toy']];

  function others(list, notThis, n) { return R.some(list.filter(function (p) { return p !== notThis; }), n).map(function (p) { return R.pick(p); }); }

  /* ---------- question makers ---------- */
  function same(lv) {
    var p = R.pick(SAME), i = R.int(0, 1), o = R.pick(OPP);
    return Q.tiles('Which word means the <b>same</b> as <b>' + p[i] + '</b>?', p[1 - i], [R.pick(o)].concat(lv > 1 ? others(SAME, p, 1) : []), {
      prompt: 'Try it in a sentence. Does the meaning stay the same?', hint: 'Words that mean the same are called synonyms.', explain: W.tile(p[i]) + ' = ' + W.tile(p[1 - i]),
      meta: { k: 'g2-same', word: p[i] } });
  }
  function opposite(lv) {
    var p = R.pick(OPP), i = R.int(0, 1), s = R.pick(SAME);
    return Q.tiles('Which word means the <b>opposite</b> of <b>' + p[i] + '</b>?', p[1 - i], [R.pick(s)].concat(lv > 1 ? others(OPP, p, 1) : []), {
      prompt: 'Think: what is the other end?', hint: 'Words that mean the opposite are called antonyms.', explain: W.tile(p[i]) + ' &harr; ' + W.tile(p[1 - i]),
      meta: { k: 'g2-opposite', word: p[i] } });
  }
  function matchSame() {
    var ps = R.some(SAME, 3);
    return { q: 'Match each word to a word that means the same.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Try each pair in a sentence.',
      explain: 'Synonyms can swap places in a sentence.', meta: { k: 'g2-match-same' } };
  }
  function sameOrOpp() {
    var isSame = R.int(0, 1) === 1, p = R.pick(isSame ? SAME : OPP);
    return { q: 'Do these words mean the same, or the opposite?', fig: W.tile(p[0]) + ' ' + W.tile(p[1]), type: 'tap', tiles: ['the same', 'the opposite'], answer: isSame ? 0 : 1,
      hint: 'Put each word in the same sentence.', explain: isSame ? 'They mean the same.' : 'They are opposites.', meta: { k: 'g2-same-or-opp', a: p[0], b: p[1] } };
  }
  function stronger(lv) {
    var p = lv > 1 ? R.pick(LADDER) : R.pick(STRONG), top = p[p.length - 1];
    return Q.tiles('Which word is <b>strongest</b>?', top, p.slice(0, -1), { hint: 'Which word paints the biggest picture?',
      explain: p.map(function (w) { return W.tile(w); }).join(' &rarr; '), meta: { k: 'g2-stronger' } });
  }
  function ladder() {
    var l = R.pick(LADDER);
    return { q: 'Put these words in order, from <b>weakest</b> to <b>strongest</b>.', type: 'order', items: l.slice(), first: 'Weakest', last: 'Strongest',
      hint: 'Which word says the least? Start there.', explain: l.join(', '), meta: { k: 'g2-ladder' } };
  }

  function twoMeanings(lv) {
    var t = R.pick(TWO), j = R.int(1, 2), right = t[j], wrong = t[3 - j];
    return Q.one('What does <b>' + t[0] + '</b> mean in this sentence?', right[0], [wrong[0]].concat(lv > 1 ? [R.pick(TWO.filter(function (x) { return x !== t; }))[1][0]] : []), {
      fig: W.sent(right[1].replace(new RegExp('\\b' + t[0] + '\\b', 'i'), function (m) { return '<b>' + m + '</b>'; })), prompt: 'Read the whole sentence. Which meaning makes sense here?',
      hint: 'This word has two meanings. The other words in the sentence tell you which one.', explain: '<b>' + t[0] + '</b> means ' + right[0] + ' here.', meta: { k: 'g2-two', word: t[0], s: right[1] } });
  }
  function twoMatch() {
    var t = R.pick(TWO);
    return { q: 'Match each sentence to what <b>' + t[0] + '</b> means.', type: 'match', pairs: [[t[1][1], t[1][0]], [t[2][1], t[2][0]]], hint: 'Read each sentence. Picture it.',
      explain: 'The same word can mean two different things.', meta: { k: 'g2-two-match', word: t[0] } };
  }
  function clue(lv) {
    var c = R.pick(CLUE);
    return Q.one('What does <b>' + c[1] + '</b> mean?', c[2], c[3].slice(0, lv > 1 ? 2 : 1), { fig: W.sent(c[0]), prompt: 'Look for a clue in the rest of the sentence.',
      hint: 'Read the words around it. What makes sense?', explain: 'The clue: <mark class="hl">' + c[4] + '</mark>.', meta: { k: 'g2-clue', word: c[1] } });
  }
  function clueWords() {
    var c = R.pick(CLUE), rest = c[0].replace(/<b>.*<\/b>/, '').replace(c[4], '').split(/[ ,.]+/).filter(function (x) { return x.length > 2; });
    return Q.one('Which words are the clue to what <b>' + c[1] + '</b> means?', c[4], [rest.slice(0, 2).join(' ')], { fig: W.sent(c[0]), hint: 'Which words help you picture it?',
      explain: W.sent(c[0].replace(c[4], '<mark class="hl">' + c[4] + '</mark>')), meta: { k: 'g2-clue-words', word: c[1] } });
  }
  function abc(lv) {
    var list = lv > 1 && R.int(0, 1) ? R.pick(SAMESTART) : R.some(WORDS, 3), first = list.slice().sort()[0];
    return Q.tiles('Which word comes <b>first</b> in a dictionary?', first, list.filter(function (w) { return w !== first; }), { prompt: 'Look at the first letter of each word. Which comes first in the alphabet?',
      hint: 'Same first letter? Look at the second letter.', explain: list.slice().sort().join(', '), meta: { k: 'g2-abc' } });
  }
  function abcOrder() {
    var list = R.some(WORDS, 4);
    return { q: 'Put these words in ABC order, like a dictionary.', type: 'order', items: list.slice().sort(), first: 'First', last: 'Last', hint: 'Look at the first letter of each word.',
      explain: 'A, B, C, D, E, F, G...', meta: { k: 'g2-abc-order' } };
  }

  Atlas.register('meanings', {
    lessons: [{
      id: 'same-opposite', title: 'Same, opposite and stronger', sub: 'How words are linked by meaning.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.4'], skill: 'word-links',
          model: [
            step(W.tile('big') + ' = ' + W.tile('large'), 'Synonyms.'),
            step(W.sent('We saw a <b>big</b> moose.') + W.sent('We saw a <b>large</b> moose.'), 'Swap them. The sentence still works.')
          ],
          guided: [function () { return same(1); }, sameOrOpp],
          check: [function () { return same(2); }, matchSame],
          coach: '<p>Play "Say it another way": you say a word, the child says one that means the same.</p>',
          mistake: '<p>Choosing a word that is only linked ("big" and "elephant"). Test it in a sentence: does the meaning stay the same?</p>' },
        { slug: 'opposite', title: 'Words that mean the opposite', exp: ['B2.4'], skill: 'word-links',
          model: [
            step(W.tile('hot') + ' &harr; ' + W.tile('cold'), 'Antonyms.'),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'The other end.')
          ],
          guided: [function () { return opposite(1); }, sameOrOpp],
          check: [function () { return opposite(2); }, sameOrOpp],
          coach: '<p>Act it out: push and pull a door, go up and down the stairs.</p>',
          mistake: '<p>Picking a word that is just different ("hot" and "wet"). An opposite is the other end of the same thing.</p>' },
        { slug: 'stronger', title: 'Some words are stronger', exp: ['B2.4'], skill: 'word-links',
          model: [
            step(W.tile('eat') + ' &rarr; ' + W.tile('gobble'), 'Gobble is eating fast, with big bites.'),
            step(W.tile('cool') + ' &rarr; ' + W.tile('cold') + ' &rarr; ' + W.tile('freezing'), 'Each one says more.')
          ],
          guided: [function () { return stronger(1); }, ladder],
          check: [function () { return stronger(2); }, ladder],
          coach: '<p>Use your voice and face: say "warm" calmly and "boiling" with wide eyes. Then ask which word fits a cup of cocoa, and which fits a stove.</p>',
          mistake: '<p>Thinking stronger words are always better. The best word is the one that fits exactly.</p>' }
      ]
    }, {
      id: 'in-context', title: 'Meaning in a sentence', sub: 'Use the sentence to choose the meaning, and find words in a dictionary.',
      concepts: [
        { slug: 'two-meanings', title: 'One word, two meanings', exp: ['B2.4'], skill: 'in-context',
          model: [
            step(W.sent('A <b>bat</b> hung upside down in the cave.'), 'An animal.'),
            step(W.sent('Omar swung the <b>bat</b>.'), 'A stick for a ball.'),
            step(W.icon('read'), 'The other words tell you which.')
          ],
          guided: [function () { return twoMeanings(1); }, twoMatch],
          check: [function () { return twoMeanings(2); }, twoMatch],
          coach: '<p>Draw both meanings of a word side by side (a dog barking, tree bark). Then say a sentence and ask which picture fits.</p>',
          mistake: '<p>Using the first meaning that comes to mind. Ask: "Does that make sense in this sentence?"</p>' },
        { slug: 'clue', title: 'Find the clue in the sentence', exp: ['B2.4'], skill: 'in-context',
          model: [
            step(W.sent('The kitten was <b>famished</b>, so it ate the whole bowl fast.'), 'A new word.'),
            step(W.sent('The kitten was <b>famished</b>, so it <mark class="hl">ate the whole bowl fast</mark>.'), 'A clue.'),
            step(W.tile('famished') + ' = ' + W.tile('very hungry'))
          ],
          guided: [function () { return clue(1); }, clueWords],
          check: [function () { return clue(2); }, clueWords],
          coach: '<p>When a new word comes up in a book, stop and ask: "What words around it help?" Then check the meaning together.</p>',
          mistake: '<p>Skipping the new word. Praise the child for stopping to work it out.</p>' },
        { slug: 'abc', title: 'Find a word in a dictionary', exp: ['B2.4'], skill: 'in-context',
          model: [
            step(W.tile('apple') + W.tile('drum') + W.tile('lake'), 'Words go in ABC order.'),
            step(W.tile(W.hl('bear', 0, 2)) + W.tile(W.hl('bike', 0, 2)), 'Same first letter? Look at the second.'),
            step(W.icon('read'), 'Find it, then read what it means.')
          ],
          guided: [function () { return abc(1); }, abcOrder],
          check: [function () { return abc(2); }, abcOrder],
          coach: '<p>Use a children\'s dictionary, on paper or online. Race to find a word: first the letter, then the page.</p>',
          mistake: '<p>Looking only at the first letter when two words share it. Move on to the second letter.</p>' }
      ]
    }],
    practice: [
      { id: 'word-links', name: 'Same, opposite and stronger', code: 'B2.4', gen: same },
      { id: 'in-context', name: 'Meaning in a sentence', code: 'B2.4', gen: twoMeanings }
    ],
    tasks: [
      { id: 'subject-words', title: 'Words from other subjects', code: 'B2.4', pic: W.icon('read'), say: 'Learn 3 new words from science or social studies. Use each one in a sentence.', write: true,
        run: ['Pick three words from a science or social studies topic (for example: habitat, season, community).', 'Talk about what each word means, with a picture or an example.', 'The child says or writes a sentence for each word.'],
        rubric: ['Does not use the new words yet.', 'Uses one word with help.', 'Uses all three words correctly.', 'Uses all three, and uses them again later without a reminder.'] }
    ]
  });

  Q.shapes('meanings', {
    'word-links': [[1, 'opposite', opposite], [1, 'same-or-opposite', sameOrOpp], [1, 'stronger', stronger], [2, 'match', matchSame], [2, 'ladder', ladder]],
    'in-context': [[1, 'clue', clue], [1, 'clue-words', clueWords], [1, 'abc', abc], [2, 'two-match', twoMatch], [2, 'abc-order', abcOrder]]
  });
})();
