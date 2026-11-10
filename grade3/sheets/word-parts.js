/* Grade 3 Word Parts: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made from
   chapters/word-parts.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B2.3 prefixes, bases and suffixes, B2.4 using word parts to work out meaning. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('word-parts', { code: 'WP', ideas: {
    un: { goal: 'I can use un- to make a word mean not.',
      think: [{ q: 'Write three words that start with <b>un-</b> and say what each means.', lines: 3, key: 'For example: unhappy, not happy; unlock, not locked; unkind, not kind.' },
        { q: 'Is <b>uncle</b> made of un- and a base word? How do you know?', lines: 2, key: 'No. "cle" is not a word, so un is not a prefix here.' },
        { q: 'Use <b>unsafe</b> in a sentence.', lines: 1, key: 'For example: The thin ice was unsafe to skate on.' }] },
    re: { goal: 'I can use re- to make a word mean again.',
      think: [{ q: 'Write three words that start with <b>re-</b> and say what each means.', lines: 3, key: 'For example: redo, do again; reread, read again; refill, fill again.' },
        { q: 'Is <b>read</b> made of re- and a base word? How do you know?', lines: 2, key: 'No. "ad" is not a base word with a meaning here, so re is not a prefix.' },
        { q: 'Use <b>rebuild</b> in a sentence.', lines: 1, key: 'For example: We had to rebuild the snow fort after the wind.' }] },
    which: { goal: 'I can choose un- or re- to fit the meaning.',
      think: [{ q: 'Write a sentence with an <b>un-</b> word and one with a <b>re-</b> word.', lines: 2, key: 'For example: The box was unopened. Please repack your bag.' },
        { q: 'What is the difference between <b>unpack</b> and <b>repack</b>?', lines: 2, key: 'Unpack means take things out. Repack means pack again.' },
        { q: 'Make a new word from <b>tie</b> with each prefix. What does each mean?', lines: 2, key: 'untie: undo the knot. retie: tie again.' }] },
    ful: { goal: 'I can use -ful to make a word mean full of.',
      think: [{ q: 'Write three words that end with <b>-ful</b> and say what each means.', lines: 3, key: 'For example: helpful, full of help; joyful, full of joy; careful, full of care.' },
        { q: 'How many l’s does <b>-ful</b> have at the end of a word?', lines: 1, key: 'One l: -ful (helpful, not helpfull).' },
        { q: 'Use <b>colourful</b> in a sentence.', lines: 1, key: 'For example: Mei painted a colourful kite.' }] },
    less: { goal: 'I can use -less to make a word mean without.',
      think: [{ q: 'Write three words that end with <b>-less</b> and say what each means.', lines: 3, key: 'For example: homeless, without a home; fearless, without fear; sleepless, without sleep.' },
        { q: 'How are <b>careful</b> and <b>careless</b> different?', lines: 2, key: 'Careful means full of care. Careless means without care. They are opposites.' },
        { q: 'Use <b>endless</b> in a sentence.', lines: 1, key: 'For example: The road to the cottage felt endless.' }] }
  } });
})();
