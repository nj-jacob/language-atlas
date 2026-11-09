/* Grade 2 Word Meanings: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/meanings.js.
   Ontario 2023 Language: B2.4 understand and use words, and work out new words in context. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('meanings', { code: 'ME', ideas: {
    same: { goal: 'I can find words that mean the same.', think: [
      O('Write two words that mean the same as happy. Use one in a sentence.', 'For example: glad, cheerful. I was glad to see Gran.'),
      O('Are big and elephant words that mean the same? Why?', 'No. An elephant is big, but the words do not mean the same thing.'),
      O('Why might a writer use a word that means the same instead of saying the word again?', 'So the writing does not sound the same over and over.')] },
    opposite: { goal: 'I can find words that mean the opposite.', think: [
      O('Write the opposite of each word: early, full, quiet.', 'late, empty, loud', 2),
      O('Is wet the opposite of hot? Why?', 'No. The opposite of hot is cold. Wet is about something else.'),
      O('Write a sentence that uses a word and its opposite.', 'For example: The box was heavy, but the bag was light.')] },
    stronger: { goal: 'I can choose a stronger word that fits.', think: [
      O('Put these in order from weakest to strongest: hot, warm, boiling.', 'warm, hot, boiling', 2),
      O('Is a stronger word always better? Tell why.', 'No. The best word is the one that fits exactly.'),
      O('Make this sentence stronger: “The dog was big.”', 'For example: The dog was huge.', 2)] },
    'two-meanings': { goal: 'I can use the sentence to pick the right meaning.', think: [
      O('Write two sentences that use bat with two different meanings.', 'For example: A bat flew out of the cave. I hit the ball with a bat.'),
      O('In “The bark was rough”, what does bark mean? How do you know?', 'The outside of a tree. Rough tells about something you touch.'),
      O('Name another word with two meanings. Draw or tell both.', 'For example: ring (a sound; a band for a finger).')] },
    clue: { goal: 'I can use clues in the sentence to work out a new word.', think: [
      O('“The soup was so scalding that I waited for it to cool.” What does scalding mean? Which words helped?', 'Very hot. “waited for it to cool” is the clue.'),
      O('What can you do when you meet a word you do not know?', 'Reread, look for clues around it, try a word that fits, then check.'),
      O('Write a sentence with a clue that shows what “gigantic” means.', 'For example: The gigantic whale was longer than our boat.')] },
    abc: { goal: 'I can find a word in a dictionary.', think: [
      O('Put in ABC order: ship, shell, shop.', 'shell, ship, shop', 2),
      O('cat and cup both start with c. How do you know which comes first?', 'Look at the second letter: a comes before u, so cat is first.'),
      O('Why are words in a dictionary in ABC order?', 'So you can find a word quickly.')] }
  } });
})();
