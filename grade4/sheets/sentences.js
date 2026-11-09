/* Grade 4 Sentences: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/sentences.js; this file adds each idea's goal and Think questions.
   Ontario 2023 Language, Grade 4: B3.1 simple and compound sentences, dependent clauses and phrases. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 4, key: key }; }

  S.register('sentences', { code: 'SE', ideas: {
    compound: { goal: 'I can join two sentences with a comma and a joining word.', think: [
      L('Join: "The wind was cold. We stayed on the dock."', 'The wind was cold, but we stayed on the dock.'),
      L('Why does a compound sentence need a comma before and, but or so?', 'The comma shows where one complete sentence ends and the next begins.'),
      L('Write a compound sentence about your weekend.', 'Two complete sentences joined with a comma and and, but, or or so.') ] },
    'join-word': { goal: 'I can choose the joining word that fits.', think: [
      L('Explain the difference: "It rained, so we stayed in." and "It rained, but we went out."', 'So shows a result. But shows something you would not expect.', 5),
      L('Finish it two ways: "The bus was late, ..." with so, then with but.', 'For example: so we walked; but we were still on time.'),
      L('When would you use or?', 'When there is a choice between two things.') ] },
    dependent: { goal: 'I can tell that a dependent clause cannot stand alone.', think: [
      L('Why is "When the bell rang" not a complete sentence?', 'It does not tell what happened. It needs a main clause.'),
      L('Finish it: "Because the river was high, ..."', 'Any main clause, for example: we did not cross.'),
      L('Write a sentence that starts with after or while.', 'A dependent clause, a comma, then a main clause.') ] },
    phrase: { goal: 'I can grow a sentence with a phrase that tells where or when.', think: [
      L('Add a phrase that tells where: "The moose stood."', 'For example: The moose stood beside the frozen pond.'),
      L('Add a phrase that tells when: "We skated."', 'For example: We skated after supper.'),
      L('How does a phrase make a sentence better for the reader?', 'It adds where or when, so the reader can picture it.') ] }
  } });
})();
