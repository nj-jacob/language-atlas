/* Grade 3: word meanings.
   Ontario 2023 Language, Grade 3, B2.4 Vocabulary: understanding new words, including words that mean the same (synonyms)
   and the opposite (antonyms), and using clues in the sentence to work out a new word.
   All words and sentences are written for this site. Answer checks: tests/verify/grade3-meanings.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var SAME = [['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['fast', 'quick'], ['shut', 'close'], ['begin', 'start'], ['smart', 'clever'],
    ['cold', 'chilly'], ['shout', 'yell'], ['scared', 'afraid'], ['leap', 'jump'], ['rock', 'stone'], ['gift', 'present'], ['tired', 'sleepy']];
  var OPP = [['hot', 'cold'], ['full', 'empty'], ['early', 'late'], ['wet', 'dry'], ['loud', 'quiet'], ['light', 'heavy'], ['push', 'pull'],
    ['win', 'lose'], ['first', 'last'], ['top', 'bottom'], ['float', 'sink'], ['asleep', 'awake']];
  /* [new word, what it means, two wrong meanings, the sentence, the clue in the sentence] */
  var CLUE = [
    ['drowsy', 'sleepy', 'angry', 'hungry', 'The puppy was so drowsy that it fell asleep in my lap.', 'fell asleep'],
    ['famished', 'starving', 'freezing', 'cheerful', 'Mei was famished after skating, so she ate two bowls of soup.', 'ate two bowls'],
    ['narrow', 'thin', 'long', 'muddy', 'The trail was narrow, so we walked one at a time.', 'one at a time'],
    ['furious', 'angry', 'sleepy', 'proud', 'Grandpa was furious when the raccoons tipped the bin over again.', 'tipped the bin over again'],
    ['calm', 'still', 'wavy', 'deep', 'The lake was so calm that it looked like glass.', 'looked like glass'],
    ['gather', 'collect', 'paint', 'hide', 'We had to gather sticks from all over the yard to build a fire.', 'from all over the yard'],
    ['timid', 'shy', 'loud', 'tall', 'Arjun was timid on the first day, so he stayed close to his dad.', 'stayed close to his dad'],
    ['scalding', 'boiling', 'salty', 'frozen', 'The soup was scalding, so Tala waited for it to cool.', 'waited for it to cool'],
    ['sturdy', 'strong', 'tiny', 'broken', 'The canoe was sturdy, so it did not tip in the waves.', 'did not tip'],
    ['brief', 'short', 'noisy', 'funny', 'Hana gave a brief talk that took only one minute.', 'only one minute'],
    ['anxious', 'worried', 'bored', 'sleepy', 'Zara felt anxious before the test, and her hands shook a little.', 'hands shook'],
    ['soggy', 'wet', 'crunchy', 'warm', 'Owen left his cereal too long, and it went soggy in the milk.', 'in the milk']
  ];
  function partner(list, w) { var p = list.filter(function (x) { return x.indexOf(w) >= 0; })[0]; return p[0] === w ? p[1] : p[0]; }
  function othersOf(list, pair) { return R.some(list.filter(function (x) { return x !== pair; }), 3).map(function (x) { return x[R.int(0, 1)]; }); }
  function bold(c) { return c[4].replace(c[0], '<b>' + c[0] + '</b>'); }

  /* ---------- question makers ---------- */
  function same(lv) {
    var p = R.pick(SAME), w = p[0], wrong = othersOf(SAME, p).slice(0, 2), opp = OPP.filter(function (x) { return x.indexOf(w) >= 0; })[0];
    if (lv > 1 && opp) wrong[1] = partner(OPP, w); /* a harder choice: the opposite is offered too */
    return Q.tiles('Which word means the <b>same</b> as <b>' + w + '</b>?', p[1], wrong, {
      fig: W.tile(w), prompt: 'Swap it into a sentence. Does it still make sense?', hint: 'Which word could take its place?', explain: W.tile(w) + ' = ' + W.tile(p[1]),
      meta: { k: 'g3-same', word: w } });
  }
  function opposite(lv) {
    var p = R.pick(OPP), w = p[R.int(0, 1)], ans = partner(OPP, w), wrong = othersOf(OPP, p).slice(0, lv > 1 ? 2 : 1);
    var near = SAME.filter(function (x) { return x.indexOf(w) >= 0; })[0];
    if (near && lv > 1) wrong.push(partner(SAME, w));
    return Q.tiles('Which word means the <b>opposite</b> of <b>' + w + '</b>?', ans, wrong, {
      fig: W.tile(w), prompt: 'Opposite means as different as can be.', hint: 'What is the other end?', explain: W.tile(w) + ' &harr; ' + W.tile(ans),
      meta: { k: 'g3-opposite', word: w } });
  }
  /* Same or opposite? */
  function sameOrOpp() {
    var isSame = R.int(0, 1) === 1, p = R.pick(isSame ? SAME : OPP);
    return { q: 'Do these words mean the <b>same</b> or the <b>opposite</b>?', fig: '<span class="wsum">' + W.tile(p[0]) + W.tile(p[1]) + '</span>', type: 'tap', tiles: ['Same', 'Opposite'], answer: isSame ? 0 : 1,
      hint: 'Put each word in a sentence.', explain: p[0] + ' and ' + p[1] + ' mean the ' + (isSame ? 'same' : 'opposite') + '.', meta: { k: 'g3-same-or-opp', a: p[0], b: p[1] } };
  }
  function matchSame() {
    var ps = R.some(SAME, 3);
    return { q: 'Match the words that mean the <b>same</b>.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Try each pair in a sentence.', explain: 'Words that mean the same are called synonyms.', meta: { k: 'g3-match-same' } };
  }
  function matchOpp() {
    var ps = R.some(OPP, 3);
    return { q: 'Match each word to its <b>opposite</b>.', type: 'match', pairs: ps.map(function (p) { return [p[0], p[1]]; }), hint: 'Think of the other end.', explain: 'Words with opposite meanings are called antonyms.', meta: { k: 'g3-match-opp' } };
  }

  /* clues in the sentence */
  function clueMeaning(lv) {
    var c = R.pick(CLUE);
    return Q.one('What does <b>' + c[0] + '</b> mean?', c[1], [c[2], c[3]].slice(0, lv > 1 ? 2 : 1), {
      fig: W.sent(bold(c)), prompt: 'Find the words that give a clue: <b>' + c[5] + '</b>.', hint: 'Read the whole sentence. Which words give a clue?',
      explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', steps: ['Read the whole sentence.', 'Find the clue: <b>' + c[5] + '</b>.', 'So <b>' + c[0] + '</b> means <b>' + c[1] + '</b>.'],
      meta: { k: 'g3-clue-meaning', word: c[0] } });
  }
  function clueFind() {
    var c = R.pick(CLUE), other = R.pick(CLUE.filter(function (x) { return x !== c; }));
    var start = c[4].split(' ').slice(0, 2).join(' ');
    return Q.tiles('Which words are the <b>clue</b> to what <b>' + c[0] + '</b> means?', c[5], [start, other[5]].filter(function (x) { return x !== c[5] && x.indexOf(c[0]) < 0; }), {
      fig: W.sent(bold(c)), hint: 'Which words help you picture it?', explain: 'The clue: <mark class="hl">' + c[5] + '</mark>.', meta: { k: 'g3-clue-find', word: c[0] } });
  }
  function clueSwap() {
    var c = R.pick(CLUE), wrongs = [c[2], c[3]];
    return Q.tiles('Which word could take the place of <b>' + c[0] + '</b>?', c[1], wrongs, {
      fig: W.sent(bold(c)), hint: 'Read the sentence with each word. Which still makes sense?', explain: W.sent(c[4].replace(c[0], '<b>' + c[1] + '</b>')), meta: { k: 'g3-clue-swap', word: c[0] } });
  }
  function clueTf() {
    var c = R.pick(CLUE), right = R.int(0, 1) === 1, said = right ? c[1] : c[2], first = R.int(0, 1);
    var reasons = ['The clue is "' + c[5] + '".', 'The clue is "' + c[4].split(' ').slice(0, 2).join(' ') + '".'];
    return { q: Q.name() + ' says <b>' + c[0] + '</b> means <b>' + said + '</b>.', fig: W.sent(bold(c)), type: 'tf', answer: right,
      why: { options: first ? reasons : reasons.slice().reverse(), answer: first ? 0 : 1 },
      hint: 'Find the clue in the sentence.', explain: '<b>' + c[0] + '</b> means <b>' + c[1] + '</b>.', meta: { k: 'g3-clue-tf', word: c[0], said: said } };
  }

  Atlas.register('meanings', {
    lessons: [{
      id: 'same-opposite', title: 'Same and opposite', sub: 'Words that mean the same, and words that mean the opposite.',
      concepts: [
        { slug: 'same', title: 'Words that mean the same', exp: ['B2.4'], skill: 'same-opposite',
          model: [
            step(W.tile('big'), 'A word.'),
            step(W.tile('big') + ' = ' + W.tile('large'), 'Another word that means the <b>same</b>.'),
            step(W.sent('The bear is <b>large</b>.'), 'Swap it in. It still makes sense.')
          ],
          key: '<p>Same meaning: <b>big</b> = <b>large</b>. These are <b>synonyms</b>.</p>',
          guided: [function () { return same(1); }, function () { return same(1); }],
          check: [function () { return same(2); }, matchSame],
          coach: '<p>Play "say it another way": you say a word, the child gives a word that means the same.</p>',
          mistake: '<p>Picking a word that goes with it (big and bear) rather than one that means the same. Test it in a sentence.</p>' },
        { slug: 'opposite', title: 'Words that mean the opposite', exp: ['B2.4'], skill: 'same-opposite',
          model: [
            step(W.tile('hot'), 'A word.'),
            step(W.tile('hot') + ' &harr; ' + W.tile('cold'), 'The <b>opposite</b>: the other end.'),
            step(W.tile('full') + ' &harr; ' + W.tile('empty'), 'Another pair.')
          ],
          key: '<p>Opposite meaning: <b>hot</b> &harr; <b>cold</b>. These are <b>antonyms</b>.</p>',
          guided: [function () { return opposite(1); }, sameOrOpp],
          check: [function () { return opposite(2); }, matchOpp],
          coach: '<p>Use your hands: one high, one low. Say a word with the high hand, and the child says its opposite with the low hand.</p>',
          mistake: '<p>Choosing a word that means the same (cold and chilly) when the opposite is asked.</p>' }
      ]
    }, {
      id: 'clues', title: 'Clues in the sentence', sub: 'Work out a new word from the words around it.',
      concepts: [
        { slug: 'clue', title: 'Find the clue', exp: ['B2.4'], skill: 'clues',
          model: [
            step(W.sent('The puppy was so <b>drowsy</b> that it fell asleep in my lap.'), 'A new word: <b>drowsy</b>.'),
            step(W.sent('The puppy was so <b>drowsy</b> that it <mark class="hl">fell asleep</mark> in my lap.'), 'Find the clue.'),
            step(W.tile('drowsy') + ' = ' + W.tile('sleepy'), 'So <b>drowsy</b> means <b>sleepy</b>.')
          ],
          key: '<p>Read the whole sentence. Find the clue. Guess. Check it makes sense.</p>',
          guided: [function () { return clueMeaning(1); }, clueFind],
          check: [function () { return clueMeaning(2); }, clueSwap],
          coach: '<p>When you meet a new word in a book, stop and ask: "What words around it help?" Then try a simpler word in its place.</p>',
          mistake: '<p>Guessing from how the word looks. Point to the clue words first.</p>' }
      ]
    }],
    practice: [
      { id: 'same-opposite', name: 'Same and opposite', code: 'B2.4', gen: same },
      { id: 'clues', name: 'Clues in the sentence', code: 'B2.4', gen: clueMeaning }
    ],
    tasks: [
      { id: 'word-hunt', title: 'New word hunt', code: 'B2.4', pic: W.icon('read'), say: 'Find a new word in a book. Find the clue. Say what it means.',
        run: ['While reading together, stop at a word the child does not know.', 'Ask: "Which words around it help?"', 'The child says what the word might mean, then checks it makes sense in the sentence.'],
        rubric: ['Cannot find a clue yet, even with help.', 'Finds a clue with help.', 'Finds a clue and makes a sensible guess.', 'Does it alone, and uses the new word later.'] }
    ]
  });

  Q.shapes('meanings', {
    'same-opposite': [[1, 'opposite', opposite], [1, 'same-or-opposite', sameOrOpp], [2, 'match-same', matchSame], [2, 'match-opposite', matchOpp]],
    clues: [[1, 'find-clue', clueFind], [1, 'swap', clueSwap], [2, 'true-false', clueTf]]
  });
})();
