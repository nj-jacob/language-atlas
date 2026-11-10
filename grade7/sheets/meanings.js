/* Grade 7 Word Meanings: the hand-written part of the printable worksheets (the rest is made from chapters/meanings.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B2.2.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('meanings', { code: 'ME', ideas: {
    definition: { goal: 'I can find a meaning given in the sentence.', think: [
      T('Which words in the sentence tell you what "nocturnal" means?', 'Owls are nocturnal, which means they are active at night.', '"which means they are active at night". The sentence gives the definition.'),
      T('What should you do when you meet a hard word, instead of skipping it?', '', 'Stop, look at the words around it for a definition or clue, then decide on a meaning.'),
      T('Write a sentence that defines a word for the reader. Use "or" or "which means".', '', 'For example: "The canoe was buoyant, or able to float easily."')] },
    'example-contrast': { goal: 'I can use examples and opposites as clues.', think: [
      T('What does "gregarious" mean? How do you know?', 'Unlike her quiet brother, Tala is gregarious.', 'Sociable and outgoing. "Unlike her quiet brother" shows it is the opposite of quiet.'),
      T('What does "precipitation" mean? Which words help?', 'Precipitation, such as rain, snow and hail, fell all week.', 'Water that falls from the sky. The examples rain, snow and hail show it.'),
      T('Write a sentence with an opposite clue for "timid".', '', 'For example: "Unlike his bold sister, Max was timid around new people."')] },
    cause: { goal: 'I can use a reason in the sentence to work out a word.', think: [
      T('What does "parched" mean? What is the clue?', 'After the long hike with no water, we were parched.', 'Very thirsty. The cause, a long hike with no water, explains it.'),
      T('Why should you test your meaning back in the sentence?', '', 'If the meaning makes sense in the sentence, your guess is probably right. Sound alone can trick you.'),
      T('Write a sentence where a reason explains the word "exhausted".', '', 'For example: "After shovelling snow for three hours, Dad was exhausted."')] },
    feeling: { goal: 'I can choose a word with the right feeling.', think: [
      T('Both words mean "spent little money". How does each one make you feel about Sam?', 'Sam is thrifty. · Sam is stingy.', 'Thrifty sounds wise and careful (positive). Stingy sounds selfish (negative).'),
      T('Why might a writer choose "curious" instead of "nosy"?', '', 'Curious is positive and nosy is negative. The writer wants the reader to think well of the person.'),
      T('Write one sentence about a dog with a positive word and one with a negative word.', '', 'For example: "The dog is lively." and "The dog is hyper."')] },
    strength: { goal: 'I can choose a word with the right strength.', think: [
      T('Put these in order from weakest to strongest and explain.', 'furious · annoyed · angry', 'annoyed, angry, furious. Each one shows a bigger feeling.'),
      T('Why is "furious" a poor choice for losing a pencil?', '', 'The feeling is too big for a small problem. "Annoyed" matches the size.'),
      T('Write a sentence that needs a strong word and one that needs a mild word.', '', 'For example: "The flood was devastating." and "The rain was a nuisance."')] },
    'subject-words': { goal: 'I can understand and use words from other subjects.', think: [
      T('Use two of these science words in a sentence about a lake.', 'habitat · ecosystem · organism', 'For example: "The lake is a habitat for many organisms."'),
      T('Why do subjects like math and science use their own words?', '', 'Their words are exact, so everyone means the same thing.'),
      T('Choose a word you learned in another subject. Explain it in your own words.', '', 'Any subject word with a clear meaning, for example "perimeter: the distance around a shape".')] },
    multiple: { goal: 'I can tell which meaning a word has in a sentence.', think: [
      T('What does "table" mean in each sentence?', 'Put the plates on the table. · Record your results in a table.', 'Furniture in the first; a chart of rows and columns in the second.'),
      T('How can the subject you are reading help you pick the meaning of a word?', '', 'The topic tells you which meaning fits: in math, a "table" is a chart.'),
      T('Write two sentences that use "current" in two different ways.', '', 'For example: "The river current was strong." and "We read current news."')] }
  } });
})();
