/* Grade 2 Reading Smoothly: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/fluency.js.
   Ontario 2023 Language: B2.5 read fluently, with accuracy, pacing and expression. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('fluency', { code: 'FL', ideas: {
    marks: { goal: 'I can let the marks tell my voice what to do.', think: [
      O('Read “It is snowing.” and “It is snowing!” out loud. How did your voice change?', 'The ! one sounds excited or surprised.'),
      O('What does your voice do at a question mark?', 'It goes up at the end.'),
      O('Write a sentence that ends with ! and tell how to read it.', 'For example: Look out! Read it loud and quick.')] },
    phrases: { goal: 'I can read in phrases, not word by word.', think: [
      O('Draw a slash between the phrases: “After lunch / we walked / to the park.”', 'After lunch / we walked / to the park.', 2),
      O('Why does reading word by word make a story hard to understand?', 'The words do not join up, so the meaning gets lost.'),
      O('Read a sentence from your book in phrases. Write it with slashes.', 'Any sentence split into sensible phrases.')] },
    reread: { goal: 'I can sound out a hard word and then reread the sentence.', think: [
      O('Why do you reread the sentence after you sound out a hard word?', 'So it sounds smooth and you get the meaning back.'),
      O('Write the steps you use for a hard word.', '1. Sound it out. 2. Check it makes sense. 3. Reread the sentence.'),
      O('Tell about a word you worked out this week.', 'Any real example.')] },
    feeling: { goal: 'I can read with feeling.', think: [
      O('How would a scared character say “Who is there?” Tell what your voice would do.', 'Quiet, shaky and slow.'),
      O('Why do readers change their voice for different characters?', 'It shows how each one feels, so listeners understand.'),
      O('Write a line a happy character might say. How would you read it?', 'For example: “We won!” Read it loud and bright.')] }
  } });
})();
