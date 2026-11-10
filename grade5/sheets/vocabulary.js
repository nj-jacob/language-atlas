/* Grade 5 Word Meanings: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/vocabulary.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: B2.2. All sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('vocabulary', { code: 'VO', ideas: {
    definition: { goal: 'I can find a definition hidden in the sentence.', think: [
      O('What does <b>portage</b> mean? Which words told you?', 'Carrying the canoe over land between two lakes. The words after the comma ("carrying the canoe over land") explain it.', 3, W.sent('We made a <b>portage</b>, carrying the canoe over land to the next lake.')),
      O('Write a sentence that explains the word <b>migrate</b> inside it.', 'For example: Geese migrate, or move south, when the weather turns cold.', 2),
      O('Name two signal words or marks that often come before a definition.', 'For example: "or", "which means", "that is", a comma or dashes.', 2)] },
    examples: { goal: 'I can use examples in a sentence to understand a new word.', think: [
      O('What are <b>legumes</b>? How do the examples help?', 'Plants with seeds in pods, like beans and peas. The examples are all foods that grow in pods.', 3, W.sent('<b>Legumes</b> such as lentils, chickpeas and green peas are full of protein.')),
      O('Write a sentence that teaches the word <b>instruments</b> with examples.', 'For example: The band had many instruments, such as drums, fiddles and a flute.', 2),
      O('Why might examples alone not give the whole meaning of a word?', 'Examples show what belongs, but not the exact meaning. Check with other clues or a dictionary.', 2)] },
    contrast: { goal: 'I can use a contrast to work out a word.', think: [
      O('What does <b>timid</b> mean? Which word is the clue?', 'Shy or easily scared. "but" shows it is the opposite of bold and brave.', 3, W.sent('The older puppy is bold, <b>but</b> the little one is <b>timid</b>.')),
      O('Write a sentence that uses <b>unlike</b> or <b>however</b> to explain <b>ancient</b>.', 'For example: Unlike the new library, the ancient church is hundreds of years old.', 2),
      O('Explain how a contrast clue is different from an example clue.', 'A contrast shows the opposite of the word; an example shows things that belong to it.', 2)] },
    shades: { goal: 'I can choose the word with the right shade of meaning.', think: [
      O('Put these in order from least to most: <b>warm, scorching, hot</b>. Use one in a sentence.', 'warm, hot, scorching. For example: The sand was scorching by noon.'),
      O('Why might a writer choose <b>whispered</b> instead of <b>said</b>?', 'Whispered shows how the person spoke: quietly, maybe secretly. It gives the reader more information.', 2),
      O('Write three words for "walk" from slowest to fastest.', 'For example: stroll, march, dash (any reasonable order of three).', 2)] },
    multi: { goal: 'I can tell which meaning of a word fits the sentence.', think: [
      O('Write two sentences that use <b>bark</b> in two different ways.', 'For example: The dog barked at the mail carrier. The birch bark peeled off the tree.'),
      O('Which meaning of <b>current</b> fits? How do you know?', 'The flow of water. The sentence is about a river and swimming, not electricity or "now".', 3, W.sent('The river <b>current</b> was too strong for swimming.')),
      O('Why is a dictionary not enough for a word with many meanings?', 'It gives all the meanings. You still need the sentence to choose the right one.', 2)] },
    subject: { goal: 'I can learn and use the special words of other subjects.', think: [
      O('Write the meaning of <b>habitat</b> (science) and use it in a sentence.', 'The natural home of a plant or animal. For example: The wetland is the habitat of the great blue heron.'),
      O('Name a word that means one thing in math and another in everyday talk. Explain.', 'For example: "table" (a grid of numbers in math; furniture at home), or "product" (the answer to a multiplication; something you buy).'),
      O('Pick a subject. List three words you need to know for it.', 'Answers vary. For example, social studies: government, citizen, treaty.', 2)] }
  } });
})();
