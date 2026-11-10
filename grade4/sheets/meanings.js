/* Grade 4 Word Meanings: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/meanings.js; this file adds each idea's goal and Think questions.
   Ontario 2023 Language, Grade 4: B2.2 vocabulary, including context clues, shades of meaning and subject words. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 4, key: key }; }

  S.register('meanings', { code: 'WM', ideas: {
    context: { goal: 'I can use clues in the sentence to work out a new word.', think: [
      L('"The trail was so steep that we had to clamber up on our hands and feet." What does clamber mean? Which words told you?', 'Climb with hands and feet. Clues: steep, hands and feet.', 5),
      L('Write a sentence with a clue that shows what drowsy means.', 'For example: After the long drive I felt drowsy and my eyes kept closing.'),
      L('What can you do when the sentence has no clue?', 'Read the sentences around it, look at word parts, or look it up.') ] },
    shades: { goal: 'I can pick the exact word for what I mean.', think: [
      L('Put these in order from least to most: warm, hot, scorching. Explain.', 'warm, hot, scorching: each is hotter than the one before.'),
      L('Why might a writer choose whispered instead of said?', 'Whispered shows how the person spoke: quietly, maybe a secret.'),
      L('Write a sentence with a strong word for walked.', 'For example: She trudged through the deep snow.') ] },
    multiple: { goal: 'I can tell which meaning a word has in a sentence.', think: [
      L('Write two sentences that use bark with different meanings.', 'For example: The dog will bark. The birch bark is white.'),
      L('In "The bat flew out of the cave", how do you know which bat it is?', 'Flew and cave tell you it is the animal.'),
      L('Pick a word with two meanings. Draw or write both.', 'For example: fall (the season, or to drop).') ] },
    subject: { goal: 'I can learn and use words from science and social studies.', think: [
      L('Explain habitat in your own words. Give an example.', 'The place where a plant or animal lives and gets what it needs, such as a pond for a frog.'),
      L('Write a sentence using the word community.', 'For example: Our community built a new rink in the park.'),
      L('Why do science books use exact words such as erosion?', 'One exact word names the idea clearly, so readers know just what is meant.') ] }
  } });
})();
