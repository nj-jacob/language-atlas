/* Grade 1 Letters and ABC Order: printable worksheets. Learn and Practise 1 to 3 are made from chapters/letters.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B2.2.
   Think questions marked by a computer are checked in tests/verify/grade1-letters.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;
  function tiles(list) { return list.map(function (t) { return W.tile(t, 'word'); }).join(' '); }

  S.register('letters', { code: 'LE', ideas: {
    pairs: { goal: 'I can match big and small letters.', think: [
      Q.tf('Noah says these two letters are a pair. True or false?', false, 'G and q are the same letter.', 'The small letter for G is g. The tail of q goes the other way.',
        { fig: tiles(['G', 'q']), meta: { k: 'g1-case-tf', big: 'G' } }),
      { q: 'Some big and small letters look almost the same, like <b>C c</b>. Write three more pairs like that.', lines: 1, key: 'O o, S s, V v, W w, X x, Z z, K k, P p, U u' },
      { q: 'Write your name. Which letter is big? Why?', lines: 2, key: 'The first letter is big (a capital), because a name starts with a capital letter.' }] },
    'b-d': { goal: 'I can tell b from d.', think: [
      Q.tf('Ella says this letter is <b>d</b>. True or false?', false, 'It is d: the circle comes first.', 'It is b: the line comes first, then the circle (bat, then ball).',
        { fig: tiles(['b']), meta: { k: 'g1-bd-tf', asked: 'd' } }),
      { q: 'Make a "bed" with your two hands. Which hand is the b? Which is the d?', fig: W.pic('bed'), lines: 1, key: 'Left hand is b, right hand is d: the word bed starts with b and ends with d.' },
      { q: 'Write a word that starts with <b>b</b> and a word that starts with <b>d</b>.', lines: 2, key: 'bus, bed, bat; dog, duck, dig' }] },
    next: { goal: 'I can say which letter comes next.', think: [
      Q.tf('Omar says the letter after <b>m</b> is <b>o</b>. True or false?', false, 'After m comes o.', 'After m comes n: l m n o p.',
        { fig: tiles(['m', '_']), meta: { k: 'g1-next-tf', l: 'm', said: 'o' } }),
      { q: 'How can singing the ABC song help you find the next letter?', lines: 2, key: 'Sing up to the letter; the next sound you sing is the next letter.' },
      { q: 'Write the letters that come between <b>r</b> and <b>v</b>.', lines: 1, key: 's t u' }] },
    order: { goal: 'I can put letters in ABC order.', think: [
      Q.tf('Are these letters in ABC order? True or false?', true, 'c comes before f, f before k, and k before p.', 'One letter is in the wrong place.',
        { fig: tiles(['c', 'f', 'k', 'p']), meta: { k: 'g1-letters-tf' } }),
      { q: 'Put the letters of your first name in ABC order.', lines: 1, key: 'Any name, letters sorted from a to z (for example Sam: a m s).' },
      { q: 'Which letter is first in ABC order: <b>t</b>, <b>e</b> or <b>w</b>? How do you know?', lines: 2, key: 'e, because e comes earliest in the alphabet.' }] },
    words: { goal: 'I can put words in ABC order.', think: [
      Q.tf('Are these words in ABC order? True or false?', false, 'They are in ABC order.', 'goose (g) comes first, then hen (h), then moose (m).',
        { fig: tiles(['moose', 'goose', 'hen']), meta: { k: 'g1-words-tf' } }),
      { q: 'Write three animals in ABC order.', lines: 1, key: 'For example: bear, cat, dog (look at the first letters).' },
      { q: 'Where would you find the word <b>zebra</b> in a picture dictionary: at the start or the end? Why?', lines: 2, key: 'At the end, because z is the last letter of the alphabet.' }] }
  } });
})();
