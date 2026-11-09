/* Grade 5 Writing and Publishing: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/writing.js, and its drafting and publishing activities print as Activity sheets with a rubric; this file adds
   each idea's "I can" goal and its Think questions (open, marked by a grown-up). Ontario 2023 Language: D2.3 to D2.6. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('writing', { code: 'WR', ideas: {
    'voice-tone': { goal: 'I can write in my own voice with a tone that fits.', think: [
      O('Write one sentence about rain in a happy tone and one in a gloomy tone.', 'For example: Rain danced on the roof like tiny drums. / Rain dripped endlessly from the grey sky.', 3),
      O('What tone fits a letter to the principal? Why?', 'A polite, formal tone, because the principal is an adult in charge and you want to be taken seriously.', 2),
      O('What makes your writing sound like you?', 'Answers vary. For example: words I really use, my humour, my opinions, how I describe things.', 2)] },
    view: { goal: 'I can know my point of view and be fair to readers.', think: [
      O('Write your opinion on longer recess. Then write one thing someone might say against it.', 'Any clear opinion plus a fair opposing view. For example: For: more time to be active. Against: less time for learning.', 4),
      O('Why should a persuasive writer mention the other side?', 'It shows they are fair, and they can answer it, which makes their argument stronger.', 2),
      O('How might a reader from a farm read a story that says "the city is the best place to live"?', 'They may feel left out or disagree, because their life is different.', 2)] },
    revise: { goal: 'I can revise by adding, deleting and choosing better words.', think: [
      O('Revise: cross out the sentence that does not belong and change one plain word.', 'Delete "My cousin likes cats." Change "nice" to "peaceful" (or similar).', 3, W.sent('The lake was nice in the morning. Mist rose off the water. My cousin likes cats. A loon called.')),
      O('What is the difference between revising and editing?', 'Revising improves the ideas, order and words. Editing fixes spelling, punctuation and grammar.', 2),
      O('Ask someone for feedback on a paragraph. What did they suggest, and what did you change?', 'Answers vary: one suggestion and one change made.', 3)] },
    edit: { goal: 'I can edit for spelling, punctuation and grammar.', think: [
      O('Edit the sentence. Fix every mistake.', 'My neighbour and I travelled to Ottawa in May. (I instead of me, the spellings neighbour and travelled, capitals for My, Ottawa and May)', 2, W.sent('me and my nieghbour travled to ottawa in may.')),
      O('Name two things a spell checker can miss.', 'Real words used wrongly (their / there) and names or Canadian spellings it does not know.', 2),
      O('Make an editing checklist with four items.', 'For example: capitals, end punctuation, spelling, complete sentences.', 3)] }
  } });
})();
