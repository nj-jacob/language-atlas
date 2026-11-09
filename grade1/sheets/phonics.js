/* Grade 1 Letters and Sounds: printable worksheets. Learn and Practise 1 to 3 are made from chapters/phonics.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B2.3.
   Think questions marked by a computer are checked in tests/verify/grade1-phonics.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('phonics', { code: 'PH', ideas: {
    vowels: { goal: 'I can say the short sound of each vowel.', think: [
      { q: 'Max wrote <b>bod</b> under this picture. Which vowel should he use?', fig: W.pic('bed'), type: 'mc', options: ['a', 'e', 'i', 'o', 'u'], answer: 1, meta: { k: 'g1-which-vowel', word: 'bed' } },
      { q: 'Every word needs a vowel. Find a word on this page. Circle its vowel. Write the word.', lines: 1, key: 'Any word with its vowel circled, such as b(e)d.' },
      { q: 'Say <b>a e i o u</b>. Is your mouth wide or round for /o/?', lines: 1, key: 'Round, like a circle.' }] },
    'vowel-fit': { goal: 'I can choose the vowel that makes sense.', think: [
      Q.tf('Does this sentence make sense? True or false?', true, 'Cat and sun make sense here.', 'One vowel makes a different word.',
        { fig: W.sent('The cat naps in the sun.'), meta: { k: 'g1-vowel-fit-tf', word: 'cat' } }),
      { q: 'Change one vowel: <b>The dug digs a hole.</b> Fix it.', lines: 1, key: 'The dog digs a hole. (u becomes o)' },
      { q: 'Write two words that change when you change the vowel, like <b>hat</b> and <b>hot</b>.', lines: 1, key: 'pin, pan; bed, bad; cup, cap; big, bag' }] },
    'sh-ch-th': { goal: 'I can read sh, ch and th.', think: [
      Q.tf('Pia says <b>fish</b> has the letters <b>ch</b> in it. True or false?', false, 'Fish has ch.', 'Fish ends in sh: f-i-sh.',
        { fig: W.pic('fish'), meta: { k: 'g1-digraph-tf', word: 'fish', said: 'ch' } }),
      { q: 'Why is <b>sh</b> one sound and not two?', lines: 2, key: 'The two letters work as a team and make one new sound, /sh/.' },
      { q: 'Write a word that starts with <b>ch</b> and a word that ends with <b>th</b>.', lines: 1, key: 'chin, chip, chat; bath, math, moth' }] },
    clue: { goal: 'I can use a clue to read a word.', think: [
      Q.tf('The clue is "a big boat". Liam says the word is <b>chip</b>. True or false?', false, 'Chip is a big boat.', 'A big boat is a ship: sh, not ch.',
        { fig: W.pic('ship'), meta: { k: 'g1-clue-tf', clue: 'a big boat', said: 'chip' } }),
      { q: 'Write a clue for the word <b>moth</b>.', lines: 1, key: 'For example: it flies at night, like a butterfly.' },
      { q: 'How does a clue help you check a word you read?', lines: 2, key: 'If the word matches the clue, it makes sense, so you read it right.' }] },
    'silent-e': { goal: 'I can read words with a silent e.', think: [
      Q.tf('Add a silent e to <b>kit</b>. Jun says it makes <b>kite</b>. True or false?', true, 'kit + e = kite, and the i says its name.', 'Kit with an e makes another word.',
        { fig: W.pic('kite'), meta: { k: 'g1-silent-tf', base: 'kit', said: 'kite' } }),
      { q: 'What does the silent e do to the vowel in <b>cap</b> and <b>cape</b>?', lines: 2, key: 'It makes the vowel say its name: /a/ in cap becomes the long a in cape.' },
      { q: 'Add an e to make new words: <b>hop</b>, <b>tub</b>, <b>pin</b>.', lines: 1, key: 'hope, tube, pine' }] },
    teams: { goal: 'I can read vowel teams ee, ai, ay and oa.', think: [
      Q.tf('Ari says the vowel team in <b>boat</b> is <b>oa</b>. True or false?', true, 'b-oa-t: oa is the team.', 'Boat has a different team.',
        { fig: W.pic('boat'), meta: { k: 'g1-team-tf', word: 'boat', said: 'oa' } }),
      { q: '"When two vowels go walking, the first one does the talking." Show it with <b>rain</b>.', fig: W.pic('rain'), lines: 1, key: 'In rain, a says its name and the i is quiet.' },
      { q: 'Write a word with <b>ee</b> and a word with <b>ay</b>.', lines: 1, key: 'tree, feet, seed; day, play, say' }] },
    'ar-or': { goal: 'I can read ar and or.', think: [
      Q.tf('The clue is "you eat with it". Eli says the word is <b>fork</b>. True or false?', true, 'You eat with a fork: f-or-k.', 'You eat with something else.',
        { fig: W.pic('fork'), meta: { k: 'g1-r-tf', clue: 'you eat with it', said: 'fork' } }),
      { q: 'Say <b>cat</b> and <b>car</b>. How does the r change the a?', fig: W.pic('car'), lines: 2, key: 'The r takes over: a-r says /ar/ as in car, not /a/ as in cat.' },
      { q: 'Write two <b>ar</b> words and two <b>or</b> words.', lines: 2, key: 'car, star, farm, park; fork, corn, horse, storm' }] }
  } });
})();
