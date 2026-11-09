/* Grade 4 Grammar: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/grammar.js; this file adds each idea's goal and Think questions.
   Ontario 2023 Language, Grade 4: B3.2 relative pronouns, possessive pronouns, perfect tenses, commands and questions. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('grammar', { code: 'GR', ideas: {
    relative: { goal: 'I can use who for people and which for things.', think: [
      L('Fix it: "My aunt, which lives in Iqaluit, sent a card."', 'My aunt, who lives in Iqaluit, sent a card. An aunt is a person.'),
      L('Write a sentence about a book using which.', 'For example: The book, which has a red cover, is on my desk.'),
      L('When can you use that?', 'For people or things, when the clause tells which one you mean.') ] },
    whose: { goal: 'I can use words that tell whose.', think: [
      L('Fix it: "Them bikes are by the door. Is this you helmet?"', 'Their bikes are by the door. Is this your helmet?'),
      L('Why is it its, not it\'s, in "The dog wagged its tail"?', 'Its tells whose. It\'s means it is.'),
      L('Write two sentences with my and their.', 'Any two correct sentences.') ] },
    perfect: { goal: 'I can use has, have and had with the helper form.', think: [
      L('Explain: "She has walked" and "She had walked before lunch."', 'Has walked: done, up to now. Had walked: done before another past time.', 3),
      L('Fix it: "We have went to the market."', 'We have gone to the market.'),
      L('Write a sentence with had and a time word.', 'For example: I had finished my snack before the game began.') ] },
    commands: { goal: 'I can write commands and questions.', think: [
      L('Change it to a command: "You should close the gate."', 'Close the gate.'),
      L('Change it to a question: "The library is open on Sunday."', 'Is the library open on Sunday?'),
      L('Why does a recipe use commands?', 'It tells the reader what to do, step by step.') ] }
  } });
})();
