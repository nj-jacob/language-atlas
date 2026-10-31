/* Grade 1: letters and ABC order.
   Ontario 2023 Language, Grade 1, B2.2: "name and form the upper- and lowercase letters both in and out of order and
   demonstrate knowledge of alphabetic order, with automaticity". Forming letters (printing) is practised with a grown-up
   in the Writing chapter (D2.2). All word lists are written for this site. Answer checks: tests/verify/grade1-letters.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;
  var ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');
  /* letters that are easy to mix up */
  var NEAR = { b: 'dpq', d: 'bpq', p: 'qbd', q: 'pgd', m: 'nw', n: 'mhu', h: 'nb', u: 'nv', i: 'lj', l: 'it', g: 'qj', f: 't', t: 'f', w: 'mv', a: 'oe', e: 'ac' };
  var WORDS = ['apple', 'bear', 'canoe', 'duck', 'eagle', 'fox', 'goose', 'hat', 'igloo', 'jam', 'kite', 'loon', 'moose', 'nest', 'otter', 'pine', 'quilt', 'rink', 'snow', 'tent', 'umbrella', 'van', 'wolf', 'yarn', 'zebra'];
  var up = function (l) { return l.toUpperCase(); };

  function near(l, n) {
    var w = (NEAR[l] || '').split('').filter(Boolean).concat(R.shuffle(ABC));
    return w.filter(function (x, i) { return x !== l && w.indexOf(x) === i; }).slice(0, n);
  }

  /* ---------- question makers ---------- */
  function smallFor(lv) {
    var l = R.pick(lv > 1 ? 'bdpqmnhugaet'.split('') : ABC);
    return Q.tiles('Which is the small letter for <b>' + up(l) + '</b>?', l, near(l, lv > 1 ? 3 : 2), { fig: W.tile(up(l)),
      prompt: 'Some small letters look like their big letter. Some do not.', hint: 'Say the letter name. Which small letter has that name?',
      explain: W.tile(up(l)) + ' ' + W.tile(l), meta: { k: 'g1-small-for', l: l } });
  }
  function bigFor(lv) {
    var l = R.pick(ABC);
    return Q.tiles('Which is the big letter for <b>' + l + '</b>?', up(l), near(l, lv > 1 ? 3 : 2).map(up), { fig: W.tile(l),
      hint: 'Say the letter name. Which big letter has that name?', explain: W.tile(l) + ' ' + W.tile(up(l)), meta: { k: 'g1-big-for', l: l } });
  }
  function matchCase(lv) {
    var ls = R.some(lv > 1 ? 'bdpqgaeh'.split('') : ABC, lv > 2 ? 4 : 3);
    return { q: 'Match each big letter to its small letter.', type: 'match', pairs: ls.map(function (l) { return [up(l), l]; }),
      hint: 'Say each letter name.', explain: 'Big and small letters have the same name.', meta: { k: 'g1-match-case' } };
  }
  /* Tap b. (b, d, p and q look alike) */
  function findLetter(lv) {
    var l = R.pick('bdpqmnu'.split(''));
    return Q.tiles('Tap the letter <b>' + l + '</b>.', l, near(l, lv > 1 ? 3 : 2), { prompt: 'Look at which way it faces.',
      hint: '<b>b</b>: line first, then the circle. <b>d</b>: circle first, then the line.', explain: W.tile(l), meta: { k: 'g1-find-letter', l: l } });
  }

  /* d e __ : what comes next? */
  function next(lv) {
    var i = R.int(0, 23), shown = ABC.slice(i, i + 2), right = ABC[i + 2];
    return Q.tiles('Which letter comes next?', right, near(right, 1).concat([ABC[i], ABC[Math.min(i + 3, 25)]]).slice(0, lv > 1 ? 3 : 2), {
      fig: shown.map(function (l) { return W.tile(l); }).join('') + W.gap(), prompt: 'Sing the ABC song up to <b>' + shown[1] + '</b>.',
      hint: 'Say the alphabet from ' + shown[0] + '.', explain: shown.concat(right).join(' '), meta: { k: 'g1-next', shown: shown.join('') } });
  }
  function before(lv) {
    var i = R.int(1, 25), l = ABC[i], right = ABC[i - 1];
    return Q.tiles('Which letter comes just <b>before</b> ' + l + '?', right, [ABC[Math.min(i + 1, 25)], ABC[Math.max(i - 2, 0)]].concat(lv > 1 ? near(right, 1) : []), {
      fig: W.gap() + W.tile(l), hint: 'Say the alphabet up to ' + l + '. What did you say just before it?', explain: right + ' ' + l, meta: { k: 'g1-before', l: l } });
  }
  function orderLetters(lv) {
    var ls = R.some(ABC, lv > 1 ? 4 : 3).sort();
    return { q: 'Put the letters in ABC order.', type: 'order', items: ls, first: 'First', last: 'Last',
      hint: 'Sing the alphabet. Which of these letters do you sing first?', explain: ls.join(' '), meta: { k: 'g1-order-letters' } };
  }
  /* words in ABC order, by their first letter */
  function orderWords(lv) {
    var ws = R.some(WORDS, lv > 2 ? 4 : 3).sort();
    return { q: 'Put the words in ABC order.', type: 'order', items: ws, first: 'First', last: 'Last', prompt: 'Look at the first letter of each word.',
      hint: 'Look only at the first letter. Which comes first in the alphabet?', explain: ws.join(', '), meta: { k: 'g1-order-words' } };
  }
  function firstWord(lv) {
    var ws = R.some(WORDS, lv > 1 ? 4 : 3), right = ws.slice().sort()[0];
    return Q.one('Which word comes <b>first</b> in ABC order?', right, ws.filter(function (w) { return w !== right; }), {
      hint: 'Look at the first letter of each word.', explain: '<b>' + right + '</b> starts with ' + right.charAt(0) + ', the first of these letters in the alphabet.', meta: { k: 'g1-first-word' } });
  }

  Atlas.register('letters', {
    lessons: [{
      id: 'big-small', title: 'Big and small letters', sub: 'Every letter has a big form and a small form.',
      concepts: [
        { slug: 'pairs', title: 'Big and small letters', exp: ['B2.2'], skill: 'case',
          model: [
            step(W.tile('S') + W.tile('s'), 'Same shape, one is bigger.'),
            step(W.tile('A') + W.tile('a'), 'Different shapes, same name: <b>a</b>.'),
            step(W.tile('G') + W.tile('g'), 'Different shapes, same name: <b>g</b>.')
          ],
          key: '<p>Big letters start a sentence and a name.</p>',
          guided: [function () { return smallFor(1); }, function () { return bigFor(1); }],
          check: [function () { return smallFor(1); }, function () { return matchCase(1); }],
          coach: '<p>Make two sets of letter cards, big and small. Turn them face down and play a matching game. Say each letter name as you turn it.</p>',
          mistake: '<p>Matching by shape only (G with q). Say the name of each letter aloud before matching.</p>' },
        { slug: 'b-d', title: 'b and d face different ways', exp: ['B2.2'], skill: 'case',
          model: [
            step(W.tile(W.hl('b', 0, 1)), 'Line first, then the circle.'),
            step(W.tile(W.hl('d', 0, 1)), 'Circle first, then the line.'),
            step(W.tile('b') + W.tile('e') + W.tile('d'), 'Like a <b>bed</b>: a post at each end.')
          ],
          guided: [function () { return findLetter(1); }, function () { return findLetter(1); }],
          check: [function () { return findLetter(2); }, function () { return smallFor(2); }],
          coach: '<p>Make the "bed" with both hands: thumbs up, fists facing in. The left hand is b, the right hand is d. Use it whenever the child is unsure.</p>',
          mistake: '<p>Reversing b and d is very common in Grade 1 and is not a vision problem. Keep using one anchor (the bed) every time.</p>' }
      ]
    }, {
      id: 'abc', title: 'ABC order', sub: 'The alphabet in order, for letters and for words.',
      concepts: [
        { slug: 'next', title: 'What comes next?', exp: ['B2.2'], skill: 'abc',
          model: [
            step(W.tile('a') + W.tile('b') + W.tile('c') + W.gap(), 'Sing it: a, b, c...'),
            step(W.tile('a') + W.tile('b') + W.tile('c') + W.tile(W.hl('d', 0, 1)), '<b>d</b> comes next.'),
            step(W.gap() + W.tile('n'), 'Just before n? Sing up to it: <b>m</b>.')
          ],
          guided: [function () { return next(1); }, function () { return before(1); }],
          check: [function () { return next(2); }, function () { return before(2); }],
          coach: '<p>Lay out letter cards from a to z. Point and sing. Then take one away and ask which is missing.</p>',
          mistake: '<p>Running "l-m-n-o" together as one sound from the song. Point to each letter while singing slowly.</p>' },
        { slug: 'order', title: 'Put letters in ABC order', exp: ['B2.2'], skill: 'abc',
          model: [
            step(W.tile('t') + W.tile('c') + W.tile('m'), 'Which do you sing first?'),
            step(W.tile('c') + W.tile('m') + W.tile('t'), 'c, then m, then t.')
          ],
          guided: [function () { return orderLetters(1); }, function () { return orderLetters(1); }],
          check: [function () { return orderLetters(1); }, function () { return orderLetters(2); }],
          coach: '<p>Write the alphabet on a strip of paper. Let the child slide each card under its place on the strip, then read them in order.</p>',
          mistake: '<p>Putting letters in the order they were shown. Check each one against the alphabet strip.</p>' },
        { slug: 'words', title: 'Put words in ABC order', exp: ['B2.2'], skill: 'abc',
          model: [
            step(W.tile(W.hl('moose', 0, 1)) + W.tile(W.hl('duck', 0, 1)) + W.tile(W.hl('wolf', 0, 1)), 'Look at the first letter.'),
            step(W.tile('duck') + W.tile('moose') + W.tile('wolf'), 'd, m, w.')
          ],
          key: '<p>Dictionaries and class lists use ABC order.</p>',
          guided: [function () { return orderWords(1); }, function () { return firstWord(1); }],
          check: [function () { return orderWords(1); }, function () { return firstWord(2); }],
          coach: '<p>Put the names of family members or classmates in ABC order. Show how a picture dictionary is in ABC order.</p>',
          mistake: '<p>Ordering by word length or by the picture. Point to the first letter of each word.</p>' }
      ]
    }],
    practice: [
      { id: 'case', name: 'Big and small letters', code: 'B2.2', gen: smallFor },
      { id: 'abc', name: 'ABC order', code: 'B2.2', gen: next }
    ],
    tasks: [
      { id: 'flash', title: 'Name the letters fast', code: 'B2.2', pic: W.icon('read'), say: 'Name each letter your grown-up shows you.',
        run: ['Make 52 cards: big and small letters. Mix them up.', 'Show one card at a time. The child says its name. Put the ones they know quickly in one pile, and the slow ones in another.', 'Practise the slow pile for a few minutes each day.'],
        rubric: ['Names fewer than half the letters.', 'Names most letters, some slowly.', 'Names all letters, big and small, out of order.', 'Names all 52 quickly, with no pauses.'] },
      { id: 'say-abc', title: 'Say the alphabet', code: 'B2.2', pic: W.icon('talk'), say: 'Say the alphabet. Then start from a letter in the middle.',
        run: ['The child says the alphabet from a to z without singing.', 'Then ask them to start from a letter in the middle, like k, and keep going.', 'Ask: "What comes after r? What comes before g?"'],
        rubric: ['Needs the song to get through the alphabet.', 'Says it from a; struggles to start in the middle.', 'Says it in order and can start from any letter.', 'Answers "before" and "after" questions quickly.'] }
    ]
  });

  Q.shapes('letters', {
    case: [[1, 'big', bigFor], [1, 'match', matchCase], [1, 'find', findLetter]],
    abc: [[1, 'before', before], [1, 'order-letters', orderLetters], [2, 'order-words', orderWords], [2, 'first-word', firstWord]]
  });
})();
