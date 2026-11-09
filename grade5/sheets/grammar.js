/* Grade 5 Grammar: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/grammar.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: B3.2. All sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('grammar', { code: 'GR', ideas: {
    'direct-object': { goal: 'I can find the direct object that gets the action.', think: [
      O('Find the direct object. Explain how you found it.', 'the kite. Ask "Mei flew what?" The answer is the kite.', 2, W.sent('Mei flew the kite over the field.')),
      O('Write a sentence with a direct object. Underline it.', 'For example: Owen kicked <u>the ball</u>.', 2),
      O('Does this sentence have a direct object? Explain.', 'No. "Slept" does not act on anything. "Under the tree" tells where, not what.', 2, W.sent('The dog slept under the tree.'))] },
    reflexive: { goal: 'I can use reflexive pronouns that point back to the subject.', think: [
      O('Fill in the reflexive pronoun and explain why it fits.', 'themselves. It points back to "the twins", which is plural.', 2, W.sent('The twins taught _______ to juggle.')),
      O('Write a sentence with <b>myself</b> used correctly.', 'For example: I made myself a sandwich.', 2),
      O('What is wrong? Fix it.', '"Myself" needs a subject "I" to point back to. Correct: Jordan and I went to the store.', 2, W.sent('Jordan and myself went to the store.'))] },
    intensive: { goal: 'I can use intensive pronouns to add emphasis.', think: [
      O('How do you know <b>herself</b> is intensive here?', 'You can take it out and the sentence still makes sense. It only adds emphasis.', 2, W.sent('The mayor <b>herself</b> opened the new park.')),
      O('Write one sentence where <b>himself</b> is reflexive and one where it is intensive.', 'For example: He hurt himself. (reflexive) He built the shed himself. (intensive)'),
      O('Why might a writer add an intensive pronoun?', 'To stress that this person, and nobody else, did it.', 2)] },
    'proper-adjectives': { goal: 'I can make and capitalize proper adjectives.', think: [
      O('Turn each name into a proper adjective: <b>Canada</b>, <b>Japan</b>, <b>Mexico</b>.', 'Canadian, Japanese, Mexican.', 2),
      O('Write a sentence with a proper adjective about food.', 'For example: We ate Italian pasta for dinner. (Proper adjective has a capital.)', 2),
      O('Why does <b>French</b> get a capital in "French toast"?', 'It comes from the name of a place or people (France), so it is a proper adjective.', 2)] },
    correlative: { goal: 'I can use joining words that work in pairs.', think: [
      O('Finish the sentence with a pair of joining words.', 'For example: We can either take the bus or walk to the museum.', 2, W.sent('We can _______ take the bus _______ walk to the museum.')),
      O('Write a sentence with <b>both ... and</b>.', 'For example: Both my sister and my cousin play hockey.', 2),
      O('What is wrong? Fix it.', 'The pair is "neither ... nor". Correct: Neither the cat nor the dog came inside.', 2, W.sent('Neither the cat or the dog came inside.'))] }
  } });
})();
