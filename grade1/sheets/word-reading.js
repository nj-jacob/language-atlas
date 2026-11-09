/* Grade 1 Reading and Spelling Words: printable worksheets. Learn and Practise 1 to 3 are made from chapters/word-reading.js; this
   file adds each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B2.4 and B2.5.
   Think questions marked by a computer are checked in tests/verify/grade1-word-reading.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('word-reading', { code: 'WR', ideas: {
    'blend-read': { goal: 'I can sound out a word from left to right.', think: [
      Q.tf('Read the word. Tia says it means "it walks sideways on the beach". True or false?', true, 'c-r-a-b says crab, and a crab walks sideways.', 'The word means something else.',
        { fig: W.tile('crab'), meta: { k: 'g1-read-tf', word: 'crab', said: 'it walks sideways on the beach' } }),
      { q: 'Dev read <b>stop</b> as "pots". What did he do wrong?', lines: 2, key: 'He read from right to left. Start at the left: s-t-o-p, stop.' },
      { q: 'Read <b>flag</b>, <b>flap</b> and <b>flat</b>. Which letter changes each time? Where is it?', lines: 1, key: 'The last letter: g, p, t.' }] },
    spell: { goal: 'I can spell a word sound by sound.', think: [
      { q: 'Which spelling is right for "a green animal that hops"?', type: 'mc', options: ['forg', 'frog', 'frg'], answer: 1, meta: { k: 'g1-spell-choose', clue: 'a green animal that hops' } },
      { q: 'Sam wrote <b>nst</b> for nest. Which sound did he miss?', fig: W.pic('nest'), lines: 1, key: 'The vowel /e/ in the middle: n-e-s-t.' },
      { q: 'Say <b>lamp</b> slowly. Write one letter for each sound.', lines: 1, key: 'l a m p (4 sounds, 4 letters)' }] },
    'in-sentences': { goal: 'I can read a word in a sentence and check it makes sense.', think: [
      Q.tf('Does this sentence say the right word? True or false?', true, 'Frog fits: frogs hop in ponds.', 'Another word fits better.',
        { fig: W.sent('A frog hops in the pond.'), meta: { k: 'g1-fit-tf', s: 'A ___ hops in the pond.' } }),
      { q: 'Lee read "The fish swims in the lane." What can Lee do to fix it?', lines: 2, key: 'Ask "Does that make sense?", then look at the letters again: lake, not lane.' },
      { q: 'Write a sentence with the word <b>drum</b>.', lines: 2, key: 'Any sentence that uses drum and makes sense, for example: I hit the drum.' }] },
    ck: { goal: 'I can spell ck at the end of a short word.', think: [
      Q.tf('Ivy spells this word <b>duk</b>. True or false?', false, 'duk is right.', 'After a short vowel, /k/ at the end is spelled ck: duck.',
        { fig: W.tile('duk'), meta: { k: 'g1-rule-tf', said: 'duk' } }),
      { q: 'Why is it <b>sock</b> but <b>milk</b>?', lines: 2, key: 'ck comes right after a short vowel. In milk, the l comes between the vowel and the k.' },
      { q: 'Write three words that end with <b>ck</b>.', lines: 1, key: 'back, neck, rock, kick, truck, clock' }] },
    double: { goal: 'I can double f, l, s and z after a short vowel.', think: [
      Q.tf('Ben spells this word <b>bell</b>. True or false?', true, 'Short vowel, then l at the end: double it, bell.', 'It should have one l.',
        { fig: W.tile('bell'), meta: { k: 'g1-rule-tf', said: 'bell' } }),
      { q: 'Say the rule in your own words: when do we double f, l, s or z?', lines: 2, key: 'At the end of a short word, right after a short vowel (hill, puff, kiss, buzz).' },
      { q: 'Fix these: <b>dres</b>, <b>hil</b>, <b>buz</b>.', lines: 1, key: 'dress, hill, buzz' }] },
    'k-c': { goal: 'I can choose k or c at the start.', think: [
      Q.tf('Zara spells this word <b>kup</b>. True or false?', false, 'kup is right.', 'Before u we use c: cup.',
        { fig: W.tile('kup'), meta: { k: 'g1-rule-tf', said: 'kup' } }),
      { q: 'Which letter goes before <b>i</b> and <b>e</b>: k or c? Give a word.', lines: 1, key: 'k: kit, kid, keg, king' },
      { q: 'Sort these: <b>_at</b>, <b>_ing</b>, <b>_ot</b>. Write k or c.', lines: 1, key: 'cat, king, cot' }] },
    'ai-ay': { goal: 'I can choose ai or ay, and oi or oy.', think: [
      Q.tf('Owen spells this word <b>play</b>. True or false?', true, 'At the end of a word we use ay: play.', 'It should be ai.',
        { fig: W.tile('play'), meta: { k: 'g1-rule-tf', said: 'play' } }),
      { q: 'Why is it <b>rain</b> but <b>day</b>?', lines: 2, key: 'ai goes in the middle of a word; ay goes at the end.' },
      { q: 'Write one word with <b>oi</b> and one with <b>oy</b>.', lines: 1, key: 'coin, boil, soil; boy, toy, joy' }] }
  } });
})();
