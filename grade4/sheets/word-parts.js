/* Grade 4 Word Parts: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from the
   ideas and practice skills in chapters/word-parts.js; this file adds each idea's goal and its Think questions.
   Ontario 2023 Language, Grade 4: B2.1 morphemes to read and spell words; B2.2 word parts to work out new words in context.
   Think questions ask for reasons in the child's own words, so they are marked by a grown-up from the key. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('word-parts', { code: 'WP', ideas: {
    dis: { goal: 'I can read and spell words with dis-, which means not.', think: [
      L('Maya says dish has the prefix dis-. Is she right? How do you know?', 'No. Cover dis and only h is left, not a word. Dish has no prefix.'),
      L('Write two words with dis-. Tell what each one means.', 'For example: dislike means not like; disagree means not agree.'),
      L('Write a sentence about a lake trip that uses disappear.', 'For example: The canoe seemed to disappear into the fog on the lake.') ] },
    mis: { goal: 'I can read and spell words with mis-, which means wrongly.', think: [
      L('Why does misspell have two s letters?', 'The prefix mis- ends in s and the base spell starts with s. Keep both parts whole.'),
      L('Liam misread the bus time. What happened? Tell it in your own words.', 'He read the time wrongly, so he got the wrong time.'),
      L('Is mist a word with the prefix mis-? Explain.', 'No. Cover mis and only t is left. Mist has no prefix.') ] },
    pre: { goal: 'I can read and spell words with pre-, which means before.', think: [
      L('Why do you preheat an oven? Use the word before.', 'You heat it before you put the food in, so it cooks right.'),
      L('Make a new word with pre- and a base word. What does it mean?', 'For example: prewash means wash before.'),
      L('Pretty starts with pre. Does it have the prefix pre-? How can you tell?', 'No. Cover pre and tty is left, not a word.') ] },
    able: { goal: 'I can read and spell words with -able, which means can be.', think: [
      L('Is a paper cup washable or breakable? Explain your choice.', 'It is not really washable; it can be crushed or torn. Any reason that uses can be.'),
      L('Write a word with -able that tells about a canoe paddle.', 'For example: liftable, fixable or breakable, with can be.'),
      L('What does unbreakable mean? Use all three parts.', 'un- means not, break, -able means can be: it cannot be broken.') ] },
    'ness-ment': { goal: 'I can add -ness and -ment to make naming words.', think: [
      L('Kind is a describing word. What kind of word is kindness? How do you know?', 'A naming word (noun). -ness turns a describing word into a naming word.'),
      L('Write a sentence with the word payment.', 'For example: Dad made a payment of $20 for the hockey camp.'),
      L('Why do we write -ment on move but -ness on calm?', 'Move is an action word, so it takes -ment. Calm is a describing word, so it takes -ness.') ] },
    context: { goal: 'I can split a new word into parts to work out what it means.', think: [
      L('Read: "The trail was unmarkable in the snow." Split the long word. What does it mean?', 'un + mark + able: it could not be marked.'),
      L('How do word parts help you read a long word you have never seen?', 'Find the prefix and suffix, read the base, then put the meanings together and check the sentence.'),
      L('Make up a word with a prefix, base and suffix. Tell what it means.', 'For example: reusable means can be used again.') ] }
  } });
})();
