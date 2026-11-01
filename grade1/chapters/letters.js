/* Grade 1: letters and ABC order. A full chapter: every idea has two worked examples, three questions together and
   five on your own, and its own practice skill asked in four or more ways.
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

  /* ---------- more question makers ---------- */
  function caseTf(lv) {
    var l = R.pick(lv > 1 ? 'bdpqgaeh'.split('') : ABC), right = R.int(0, 1) === 1, shown = right ? l : near(l, 1)[0];
    return { q: Q.name() + ' says these are the same letter, big and small.', fig: W.tile(up(l)) + W.tile(shown), type: 'tf', answer: right,
      why: { options: ['They have the same name.', 'They have different names.'], answer: right ? 0 : 1 },
      hint: 'Say the name of each one.', explain: W.tile(up(l)) + ' ' + W.tile(l), meta: { k: 'g1-case-tf', big: up(l), small: shown } };
  }
  /* a picture word with one of b, d or p missing */
  var BDP = [['dog', 0], ['bus', 0], ['box', 0], ['bee', 0], ['book', 0], ['pig', 0], ['bed', 0], ['bed', 2], ['cup', 2], ['map', 2], ['bus', 0], ['ball', 0], ['apple', 1]];
  function bdpFill(lv) {
    var b = R.pick(BDP), w = b[0], l = w.charAt(b[1]), gapped = w.slice(0, b[1]) + '_' + w.slice(b[1] + 1);
    return Q.tiles('Which letter is missing?', l, 'bdpq'.split('').filter(function (x) { return x !== l; }).slice(0, lv > 1 ? 3 : 2), { fig: W.pic(w) + W.tile(gapped),
      prompt: 'Say the word. Which way does the letter face?', hint: 'Think of the bed: <b>b</b> at the start, <b>d</b> at the end.', explain: W.tile(W.hl(w, b[1], b[1] + 1)), meta: { k: 'g1-bdp-fill', w: w, at: b[1] } });
  }
  function bdTf() {
    var l = R.pick('bdpq'.split('')), asked = R.int(0, 1) === 1 ? l : R.pick('bdpq'.split('').filter(function (x) { return x !== l; }));
    return { q: Q.name() + ' says this is the letter <b>' + asked + '</b>.', fig: W.tile(l), type: 'tf', answer: asked === l,
      why: { options: ['It faces that way.', 'It faces another way.'], answer: asked === l ? 0 : 1 },
      hint: 'Line first, then the circle? Circle first, then the line?', explain: 'It is <b>' + l + '</b>.', meta: { k: 'g1-bd-tf', asked: asked } };
  }
  function bdCount(lv) {
    var l = R.pick('bd'.split('')), row = [], n = 0;
    for (var i = 0; i < (lv > 1 ? 7 : 5); i++) { var c = R.pick('bdpq'.split('')); row.push(c); if (c === l) n++; }
    if (!n) { row[R.int(0, row.length - 1)] = l; n = row.filter(function (c) { return c === l; }).length; }
    return Q.tiles('How many <b>' + l + '</b> letters?', String(n), ['1', '2', '3', '4', '5'].filter(function (k) { return +k !== n; }).slice(0, 2), { fig: row.map(W.tile).join(''),
      hint: 'Touch each one. Does it face the same way as <b>' + l + '</b>?', explain: row.map(function (c) { return W.tile(c === l ? W.hl(c, 0, 1) : c); }).join(''), meta: { k: 'g1-bd-count', l: l, row: row.join('') } });
  }
  /* f _ h: which letter is in between? */
  function between(lv) {
    var i = R.int(1, 24), right = ABC[i];
    return Q.tiles('Which letter goes in the gap?', right, near(right, 1).concat([ABC[i + 1], ABC[i - 1]]).filter(function (x, k, a) { return x !== right && a.indexOf(x) === k; }).slice(0, lv > 1 ? 3 : 2), {
      fig: W.tile(ABC[i - 1]) + W.gap() + W.tile(ABC[i + 1]), hint: 'Say the alphabet from ' + ABC[i - 1] + '.', explain: ABC.slice(i - 1, i + 2).join(' '), meta: { k: 'g1-between', a: ABC[i - 1], c: ABC[i + 1] } });
  }
  function nextTf() {
    var i = R.int(0, 24), right = R.int(0, 1) === 1, said = right ? ABC[i + 1] : ABC[Math.min(i + 2, 25)];
    return { q: Q.name() + ' says <b>' + said + '</b> comes right after <b>' + ABC[i] + '</b>.', type: 'tf', answer: said === ABC[i + 1],
      why: { options: ['That is the next letter.', 'A different letter comes next.'], answer: said === ABC[i + 1] ? 0 : 1 },
      hint: 'Say the alphabet from ' + ABC[i] + '.', explain: ABC[i] + ' ' + ABC[i + 1], meta: { k: 'g1-next-tf', l: ABC[i], said: said } };
  }
  function firstLetter(lv) {
    var ls = R.some(ABC, lv > 1 ? 4 : 3), right = ls.slice().sort()[0];
    return Q.tiles('Which comes <b>first</b> in ABC order?', right, ls.filter(function (l) { return l !== right; }), { hint: 'Sing the alphabet. Which do you sing first?', explain: ls.slice().sort().join(' '), meta: { k: 'g1-first-letter' } });
  }
  function lastLetter(lv) {
    var ls = R.some(ABC, lv > 1 ? 4 : 3), right = ls.slice().sort()[ls.length - 1];
    return Q.tiles('Which comes <b>last</b> in ABC order?', right, ls.filter(function (l) { return l !== right; }), { hint: 'Sing the alphabet. Which do you sing last?', explain: ls.slice().sort().join(' '), meta: { k: 'g1-last-letter' } });
  }
  function lettersTf(lv) {
    var ls = R.some(ABC, lv > 1 ? 4 : 3).sort(), right = R.int(0, 1) === 1, shown = right ? ls : ls.slice(1).concat(ls[0]);
    return { q: 'Are these letters in ABC order?', fig: shown.map(W.tile).join(''), type: 'tf', answer: right,
      why: { options: ['Each one comes later in the alphabet.', 'One is out of place.'], answer: right ? 0 : 1 },
      hint: 'Sing the alphabet. Check each one.', explain: ls.join(' '), meta: { k: 'g1-letters-tf' } };
  }
  function lastWord(lv) {
    var ws = R.some(WORDS, lv > 1 ? 4 : 3), right = ws.slice().sort()[ws.length - 1];
    return Q.one('Which word comes <b>last</b> in ABC order?', right, ws.filter(function (w) { return w !== right; }), {
      hint: 'Look at the first letter of each word.', explain: ws.slice().sort().join(', '), meta: { k: 'g1-last-word' } });
  }
  function wordsTf(lv) {
    var ws = R.some(WORDS, lv > 1 ? 4 : 3).sort(), right = R.int(0, 1) === 1, shown = right ? ws : ws.slice(1).concat(ws[0]);
    return { q: 'Are these words in ABC order?', fig: shown.map(function (w) { return W.tile(W.hl(w, 0, 1)); }).join(''), type: 'tf', answer: right,
      why: { options: ['Their first letters are in ABC order.', 'One word is out of place.'], answer: right ? 0 : 1 },
      hint: 'Look at each first letter.', explain: ws.join(', '), meta: { k: 'g1-words-tf' } };
  }

  Atlas.register('letters', {
    full: true,
    lessons: [{
      id: 'big-small', title: 'Big and small letters', sub: 'Every letter has a big form and a small form.',
      concepts: [
        { slug: 'pairs', title: 'Big and small letters', exp: ['B2.2'], skill: 'case',
          model: [
            step(W.tile('S') + W.tile('s'), 'Same shape, one is bigger.'),
            step(W.tile('O') + W.tile('o') + W.tile('C') + W.tile('c'), 'Lots of letters work like this.'),
            step(W.tile('A') + W.tile('a'), 'Different shapes, same name: <b>a</b>.'),
            step(W.tile('G') + W.tile('g'), 'Different shapes, same name: <b>g</b>.'),
            step(W.tile('R') + W.tile('r') + W.tile('E') + W.tile('e'), 'Say the name to match them.')
          ],
          key: '<p>Big letters start a sentence and a name.</p>',
          guided: [function () { return smallFor(1); }, function () { return bigFor(1); }, function () { return caseTf(1); }],
          check: [function () { return smallFor(1); }, function () { return matchCase(1); }, function () { return bigFor(2); }, function () { return caseTf(2); }, function () { return smallFor(2); }],
          coach: '<p>Make two sets of letter cards, big and small. Turn them face down and play a matching game. Say each letter name as you turn it.</p>',
          mistake: '<p>Matching by shape only (G with q). Say the name of each letter aloud before matching.</p>' },
        { slug: 'b-d', title: 'b and d face different ways', exp: ['B2.2'], skill: 'bd',
          model: [
            step(W.tile(W.hl('b', 0, 1)), 'Line first, then the circle.'),
            step(W.tile(W.hl('d', 0, 1)), 'Circle first, then the line.'),
            step(W.pic('bed') + W.tile('b') + W.tile('e') + W.tile('d'), 'Like a <b>bed</b>: a post at each end.'),
            step(W.pic('dog') + W.tile('_og'), 'Which one starts <b>dog</b>?'),
            step(W.tile(W.hl('dog', 0, 1)), 'Circle first, then the line: <b>d</b>.')
          ],
          guided: [function () { return findLetter(1); }, function () { return bdpFill(1); }, bdTf],
          check: [function () { return findLetter(2); }, function () { return bdpFill(2); }, function () { return bdCount(2); }, bdTf, function () { return findLetter(3); }],
          coach: '<p>Make the "bed" with both hands: thumbs up, fists facing in. The left hand is b, the right hand is d. Use it whenever the child is unsure.</p>',
          mistake: '<p>Reversing b and d is very common in Grade 1 and is not a vision problem. Keep using one anchor (the bed) every time.</p>' }
      ]
    }, {
      id: 'abc', title: 'ABC order', sub: 'The alphabet in order, for letters and for words.',
      concepts: [
        { slug: 'next', title: 'What comes next?', exp: ['B2.2'], skill: 'next',
          model: [
            step(W.tile('a') + W.tile('b') + W.tile('c') + W.gap(), 'Sing it: a, b, c...'),
            step(W.tile('a') + W.tile('b') + W.tile('c') + W.tile(W.hl('d', 0, 1)), '<b>d</b> comes next.'),
            step(W.gap() + W.tile('n'), 'Just before n? Sing up to it.'),
            step(W.tile(W.hl('m', 0, 1)) + W.tile('n'), '<b>m</b>.'),
            step(W.tile('r') + W.gap() + W.tile('t'), 'In the middle: r, <b>s</b>, t.')
          ],
          guided: [function () { return next(1); }, function () { return before(1); }, function () { return between(1); }],
          check: [function () { return next(2); }, function () { return before(2); }, function () { return between(2); }, nextTf, function () { return next(3); }],
          coach: '<p>Lay out letter cards from a to z. Point and sing. Then take one away and ask which is missing.</p>',
          mistake: '<p>Running "l-m-n-o" together as one sound from the song. Point to each letter while singing slowly.</p>' },
        { slug: 'order', title: 'Put letters in ABC order', exp: ['B2.2'], skill: 'order-letters',
          model: [
            step(W.tile('t') + W.tile('c') + W.tile('m'), 'Which do you sing first?'),
            step(W.tile('c') + W.tile('m') + W.tile('t'), 'c, then m, then t.'),
            step(W.tile('p') + W.tile('b') + W.tile('y') + W.tile('h'), 'Four this time.'),
            step(W.tile('b') + W.tile('h') + W.tile('p') + W.tile('y'), 'Sing along and pick them up as you go.')
          ],
          guided: [function () { return orderLetters(1); }, function () { return firstLetter(1); }, function () { return lettersTf(1); }],
          check: [function () { return orderLetters(1); }, function () { return firstLetter(2); }, function () { return lastLetter(2); }, function () { return lettersTf(2); }, function () { return orderLetters(2); }],
          coach: '<p>Write the alphabet on a strip of paper. Let the child slide each card under its place on the strip, then read them in order.</p>',
          mistake: '<p>Putting letters in the order they were shown. Check each one against the alphabet strip.</p>' },
        { slug: 'words', title: 'Put words in ABC order', exp: ['B2.2'], skill: 'abc-words',
          model: [
            step(W.tile(W.hl('moose', 0, 1)) + W.tile(W.hl('duck', 0, 1)) + W.tile(W.hl('wolf', 0, 1)), 'Look at the first letter.'),
            step(W.tile('duck') + W.tile('moose') + W.tile('wolf'), 'd, m, w.'),
            step(W.tile(W.hl('van', 0, 1)) + W.tile(W.hl('apple', 0, 1)) + W.tile(W.hl('kite', 0, 1)), 'Another set.'),
            step(W.tile('apple') + W.tile('kite') + W.tile('van'), 'a, k, v.')
          ],
          key: '<p>Dictionaries and class lists use ABC order.</p>',
          guided: [function () { return orderWords(1); }, function () { return firstWord(1); }, function () { return wordsTf(1); }],
          check: [function () { return orderWords(1); }, function () { return firstWord(2); }, function () { return lastWord(2); }, function () { return wordsTf(2); }, function () { return orderWords(3); }],
          coach: '<p>Put the names of family members or classmates in ABC order. Show how a picture dictionary is in ABC order.</p>',
          mistake: '<p>Ordering by word length or by the picture. Point to the first letter of each word.</p>' }
      ]
    }],
    practice: [
      { id: 'case', name: 'Big and small letters', code: 'B2.2', gen: smallFor },
      { id: 'bd', name: 'b, d, p and q', code: 'B2.2', gen: findLetter },
      { id: 'next', name: 'What comes next?', code: 'B2.2', gen: next },
      { id: 'order-letters', name: 'Letters in ABC order', code: 'B2.2', gen: orderLetters },
      { id: 'abc-words', name: 'Words in ABC order', code: 'B2.2', gen: orderWords }
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
    case: [[1, 'big', bigFor], [1, 'match', matchCase], [2, 'tf', caseTf]],
    bd: [[1, 'fill', bdpFill], [1, 'tf', bdTf], [2, 'count', bdCount]],
    next: [[1, 'before', before], [1, 'between', between], [2, 'tf', nextTf]],
    'order-letters': [[1, 'first', firstLetter], [1, 'last', lastLetter], [2, 'tf', lettersTf]],
    'abc-words': [[1, 'first-word', firstWord], [1, 'last-word', lastWord], [2, 'tf', wordsTf]]
  });
})();
