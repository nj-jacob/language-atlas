/* Grade 3 Capitals and Punctuation: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are
   made from chapters/punctuation.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B3.3 capitals in dialogue and titles, commas and quotation marks, apostrophes. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('punctuation', { code: 'PU', ideas: {
    'speech-marks': { goal: 'I can put speech marks around the words someone says.',
      think: [{ q: 'Add the speech marks.', fig: W.sent('Can we go sledding? asked Hana.'), lines: 1, key: '“Can we go sledding?” asked Hana.' },
        { q: 'Write something your friend said today. Use speech marks.', lines: 2, key: 'For example: “Let’s play tag,” said Sam.' },
        { q: 'Which words go inside the speech marks?', lines: 1, key: 'Only the words the person said.' }] },
    'speech-comma': { goal: 'I can put a comma before the closing speech mark.',
      think: [{ q: 'Add the comma and speech marks.', fig: W.sent('I found my mitten said Leila.'), lines: 1, key: '“I found my mitten,” said Leila.' },
        { q: 'Why does a comma come before the closing mark, not a full stop?', lines: 2, key: 'The sentence is not over yet. "said Leila" still comes after it.' },
        { q: 'Write a sentence where someone says something, then “said Dad”.', lines: 1, key: 'For example: “Dinner is ready,” said Dad.' }] },
    'speech-capital': { goal: 'I can start the spoken words with a capital.',
      think: [{ q: 'Fix the capitals.', fig: W.sent('Owen said, “the bus is here.”'), lines: 1, key: 'Owen said, “The bus is here.”' },
        { q: 'Write a sentence that starts with who is talking, then what they said.', lines: 2, key: 'For example: Mom said, “Put on your boots.”' },
        { q: 'Why does <b>The</b> get a capital in <i>Owen said, “The bus is here.”</i>?', lines: 2, key: 'It is the first word of what Owen said.' }] },
    quotes: { goal: 'I can quote the exact words from a text.',
      think: [{ q: 'Copy one sentence from a book you are reading. Put it in quotation marks.', lines: 2, key: 'Any exact sentence, inside “ ” marks.' },
        { q: 'Why do we use quotation marks when we copy words from a text?', lines: 2, key: 'They show the words are exactly what the writer wrote, not our own words.' },
        { q: 'Finish it with a quote from a book: <i>The book says …</i>', lines: 2, key: 'For example: The book says “Loons dive for fish.”' }] },
    contractions: { goal: 'I can join two words into a contraction.',
      think: [{ q: 'Write the contraction for each: <i>do not, I am, we will</i>.', lines: 1, key: 'don’t, I’m, we’ll' },
        { q: 'What does the apostrophe show in <b>can’t</b>?', lines: 2, key: 'Where letters were taken out (cannot).' },
        { q: 'Write a sentence with two contractions.', lines: 2, key: 'For example: I’m sure it’s going to snow.' }] },
    titles: { goal: 'I can use capitals in a title.',
      think: [{ q: 'Write this title with capitals: <i>the day the river froze</i>', lines: 1, key: 'The Day the River Froze' },
        { q: 'Which small words do not get a capital in a title (unless they come first)?', lines: 2, key: 'Little words such as a, an, the, and, of, in, on.' },
        { q: 'Make up a title for a story about your weekend. Use capitals.', lines: 1, key: 'For example: My Trip to the Sugar Bush' }] }
  } });
})();
