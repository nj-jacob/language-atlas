/* Grade 2 Word Parts: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/word-parts.js.
   Ontario 2023 Language: B2.3 morphemes to read and spell; B2.4 morphology to understand new words in context. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('word-parts', { code: 'WP', ideas: {
    'uni-bi-tri': { goal: 'I can use uni-, bi- and tri- to tell how many.', think: [
      O('Sam says a bicycle has three wheels. Is Sam right? Why?', 'No. bi- means two, so a bicycle has two wheels.'),
      O('A bird walks on two legs. Make up a word for it with bi-.', 'For example: a biped, because bi- means two.'),
      O('Name two things that have three parts. Use tri- in one.', 'For example: a triangle has 3 sides; a tricycle has 3 wheels.')] },
    mis: { goal: 'I can read and spell words with mis-.', think: [
      O('Mia says misty has the prefix mis-. Is she right? How do you know?', 'No. Cover mis: “ty” is not a word.'),
      O('Why does misspell have two s letters?', 'mis ends in s and spell starts with s. Keep both.'),
      O('Write a sentence with the word misplace.', 'For example: I often misplace my mittens.')] },
    pre: { goal: 'I can read and spell words with pre-.', think: [
      O('Leo says press has the prefix pre-. Is he right? How do you know?', 'No. Cover pre: “ss” is not a word.'),
      O('Why do we preheat an oven before we bake?', 'So it is hot before the food goes in.'),
      O('Write a sentence with the word preview.', 'For example: We preview the pictures before we read.')] },
    which: { goal: 'I can choose mis- or pre- to make the meaning I want.', think: [
      O('Write one sentence with a mis- word and one with a pre- word.', 'For example: I misread the sign. We prewash the apples.'),
      O('What is the same about mis- and pre-? What is different?', 'Both go at the start. mis- means wrongly; pre- means before.'),
      O('Ali wrote “spellmis”. What would you tell Ali?', 'The prefix goes first: misspell.')] },
    'er-or': { goal: 'I can use -er and -or to name a person who does something.', think: [
      O('Name three people at your school. Use -er or -or words.', 'For example: teacher, helper, visitor.'),
      O('Most words use -er. Why is it smart to learn the -or words by heart?', 'They are the few that break the usual pattern.'),
      O('What would you call a person who bakes? A person who invents?', 'a baker; an inventor')] },
    ness: { goal: 'I can add -ness to make a word that means being.', think: [
      O('Tell about an act of kindness you saw this week.', 'Any true story that uses kindness correctly.'),
      O('Make two new -ness words. What does each one mean?', 'For example: wetness (being wet), quietness (being quiet).'),
      O('Someone wrote “kindnis”. Fix it and tell why.', 'kindness. The ending is always n-e-s-s.')] },
    y: { goal: 'I can add -y to make a word that means with lots of.', think: [
      O('Look outside. Tell about the weather with two -y words.', 'For example: It is sunny and windy.'),
      O('What is the same about -er, -ness and -y? What is different?', 'All go at the end. -er is a person who, -ness is being, -y is with lots of.'),
      O('Make two new -y words and use each in a sentence.', 'For example: My boots are muddy. The soup is salty.')] }
  } });
})();
