/* Grade 3 Word Meanings: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made from
   chapters/meanings.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B2.4 vocabulary: words that mean the same and the opposite, context clues, subject words. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('meanings', { code: 'ME', ideas: {
    same: { goal: 'I can find words that mean the same.',
      think: [{ q: 'Write two words that mean the same as <b>big</b>.', lines: 1, key: 'For example: large, huge, giant.' },
        { q: 'Change one word to a word that means the same.', fig: W.sent('The puppy was very happy.'), lines: 1, key: 'For example: The puppy was very glad.' },
        { q: '<b>Huge</b> and <b>big</b> mean almost the same. How are they different?', lines: 2, key: 'Huge is stronger. It means very, very big.' }] },
    opposite: { goal: 'I can find words that mean the opposite.',
      think: [{ q: 'Write the opposite of each word: hot, early, full.', lines: 1, key: 'cold, late, empty' },
        { q: 'Write a sentence with a word and its opposite.', lines: 2, key: 'For example: The lake was calm in the morning but rough at night.' },
        { q: 'Can a word have more than one opposite? Give an example.', lines: 2, key: 'Yes. The opposite of hard can be soft (a pillow) or easy (a question).' }] },
    clue: { goal: 'I can use clues in the sentence to work out a new word.',
      think: [{ q: 'What does <b>drowsy</b> mean? Which words are the clues?', fig: W.sent('After the long hike, Kai felt drowsy and lay down for a nap.'), lines: 2, key: 'Sleepy. The clues are "long hike" and "lay down for a nap".' },
        { q: 'What does <b>soaked</b> mean? Which words are the clues?', fig: W.sent('Ava forgot her umbrella, so she was soaked by the rain.'), lines: 2, key: 'Very wet. The clues are "forgot her umbrella" and "rain".' },
        { q: 'Write your own sentence with a clue for the word <b>enormous</b>.', lines: 2, key: 'For example: The moose was enormous, taller than our car.' }] },
    subject: { goal: 'I can use words from science, math and social studies.',
      think: [{ q: 'Write a science word and what it means.', lines: 2, key: 'For example: habitat, the place where an animal lives.' },
        { q: 'Write a math word and what it means.', lines: 2, key: 'For example: estimate, a good guess about how many.' },
        { q: 'Use <b>community</b> in a sentence about where you live.', lines: 2, key: 'For example: Our community has a library, a rink and a park.' }] }
  } });
})();
