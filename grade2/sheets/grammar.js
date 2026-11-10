/* Grade 2 Grammar: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/grammar.js.
   Ontario 2023 Language: B3.2 group and idea nouns, pronouns, the verb “to be”, -er and -est, and words that tell how. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('grammar', { code: 'GR', ideas: {
    group: { goal: 'I can use a group noun for a whole group.', think: [
      O('Write the group noun: a ___ of geese, a ___ of fish, a ___ of cows.', 'a flock of geese, a school of fish, a herd of cows', 2),
      O('Why is “a herd of cows” better than “a lot of cows”?', 'It is the exact word, so the reader sees the group.'),
      O('Write a sentence with a group noun.', 'For example: A flock of geese flew south.')] },
    idea: { goal: 'I can find nouns that name feelings and ideas.', think: [
      O('You cannot touch joy. Is it a noun? Tell why.', 'Yes. It names a feeling, and feelings are nouns too.'),
      O('Write three nouns for feelings or ideas.', 'For example: fear, hope, friendship.', 2),
      O('Write a sentence with an idea noun.', 'For example: Friendship makes school fun.')] },
    pronouns: { goal: 'I can use a pronoun in place of a noun.', think: [
      O('Rewrite with pronouns: “Maya fed Maya’s cat. Maya likes the cat.”', 'Maya fed her cat. She likes it.'),
      O('Why do writers use pronouns?', 'So the same name is not said again and again.'),
      O('When do you use they instead of it?', 'For more than one thing or person.')] },
    'to-be': { goal: 'I can use am, is, are, was and were.', think: [
      O('Fix it: “We was late for the bus.”', 'We were late for the bus.', 2),
      O('When do you use was, and when were?', 'was for one (I, he, she, it); were for we, you and they.'),
      O('Write one sentence about now with is and one about yesterday with was.', 'For example: It is sunny. It was rainy.')] },
    'er-est': { goal: 'I can use -er to compare two and -est to compare more.', think: [
      O('Write about three of your friends with tall, taller and tallest.', 'For example: Lin is tall, Omar is taller, Ben is the tallest.'),
      O('Fix it: “Of the two boxes, this one is the biggest.”', 'Of the two boxes, this one is bigger.', 2),
      O('How do you know whether to use -er or -est?', 'Count the things: two takes -er, three or more takes -est.')] },
    adverbs: { goal: 'I can find a word that tells how something is done.', think: [
      O('In “The turtle walked slowly”, which word does slowly tell about?', 'walked: it tells how the turtle walked.'),
      O('Write a sentence with a word that tells how. Circle it.', 'For example: She sang loudly.'),
      O('Change the -ly word to change the picture: “The dog ran ___.”', 'For example: quickly, slowly, happily.', 2)] }
  } });
})();
