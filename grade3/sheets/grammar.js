/* Grade 3 Grammar: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made from
   chapters/grammar.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B3.2 parts of speech: possessive nouns, linking verbs, the progressive tense,
   question words, prepositions and interjections. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('grammar', { code: 'GR', ideas: {
    possessive: { goal: 'I can show who owns something with ’s.',
      think: [{ q: 'Write it a shorter way: <i>the mitts that belong to Noor</i>.', lines: 1, key: 'Noor’s mitts' },
        { q: 'Write a sentence about something that belongs to a pet.', lines: 2, key: 'For example: The dog’s bowl is empty.' },
        { q: 'Why is there no ’s in <b>The cats sleep</b>?', lines: 2, key: 'Cats just means more than one cat. Nothing belongs to them, so there is no apostrophe.' }] },
    'is-are': { goal: 'I can choose is, are, was or were.',
      think: [{ q: 'Write one sentence with <b>was</b> and one with <b>were</b>.', lines: 2, key: 'For example: The lake was cold. The kids were cold too.' },
        { q: 'When do you use <b>are</b> instead of <b>is</b>?', lines: 2, key: 'Use are for more than one (and with you or we). Use is for one.' },
        { q: 'Fix it: <i>The geese is flying south.</i>', lines: 1, key: 'The geese are flying south.' }] },
    ing: { goal: 'I can tell what is happening with an -ing word.',
      think: [{ q: 'Write what is happening right now, with an -ing word.', lines: 1, key: 'For example: I am writing on my worksheet.' },
        { q: 'Write what was happening yesterday, with an -ing word.', lines: 1, key: 'For example: We were skating at the rink.' },
        { q: 'Fix it: <i>Mei is run to the bus.</i>', lines: 1, key: 'Mei is running to the bus.' }] },
    where: { goal: 'I can use words that tell where.',
      think: [{ q: 'Write a sentence about your bag. Use a word that tells where.', lines: 1, key: 'For example: My bag is under my desk.' },
        { q: 'Write where your shoes are right now.', lines: 1, key: 'For example: My shoes are beside the door.' },
        { q: 'Write three words that tell where.', lines: 1, key: 'For example: under, beside, behind (also on, in, across, between).' }] },
    'question-words': { goal: 'I can use question words to ask what I want to know.',
      think: [{ q: 'Write a question that starts with <b>Why</b>.', lines: 1, key: 'For example: Why do geese fly south?' },
        { q: 'Write a question that starts with <b>Which</b>.', lines: 1, key: 'For example: Which book do you want?' },
        { q: 'Which question word asks about a time? Which asks about a place?', lines: 1, key: 'When asks about a time. Where asks about a place.' }] },
    interjections: { goal: 'I can use a feeling word to show a strong feeling.',
      think: [{ q: 'Write a sentence that starts with <b>Wow</b>.', lines: 1, key: 'For example: Wow, look at that rainbow!' },
        { q: 'Write a sentence that starts with <b>Oops</b>.', lines: 1, key: 'For example: Oops, I spilled my juice.' },
        { q: 'What mark often comes after a feeling word?', lines: 1, key: 'An exclamation mark (!) or a comma.' }] }
  } });
})();
