/* Grade 4 Writing and Publishing: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/writing.js; its drafting and publishing activities (D2.1, D2.2, D3.1 to D3.3) print as Activity sheets with the
   grown-up rubric. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: D2.3 voice and tone, D2.4 point of view, D2.5 revising, D2.6 editing. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('writing', { code: 'WR', ideas: {
    tone: { goal: 'I can fit my tone to the form.', think: [
      L('Write one line for a thank-you note and one line for a lost-dog poster.', 'Warm and grateful; clear and urgent.', 3),
      L('Why should a letter to a mayor sound polite?', 'It is formal, and a respectful tone helps the reader listen.'),
      L('Change the tone to calm: "This is the WORST day EVER!!!"', 'For example: Today did not go the way I hoped.') ] },
    'pov-fair': { goal: 'I can choose a point of view and be fair.', think: [
      L('Should students have homework on weekends? Give your view and one reason.', 'Any view with a reason.'),
      L('Write one thing someone who disagrees might say.', 'A fair statement of the other side.'),
      L('Why is it fair to name the other side?', 'Readers trust you more when you show both sides.') ] },
    revise: { goal: 'I can revise: cut, add and choose exact words.', think: [
      L('Revise: "The dog was nice. It was a nice dog. It ran."', 'For example: The friendly husky raced across the yard.'),
      L('What is the difference between revising and editing?', 'Revising improves ideas and words; editing fixes spelling and punctuation.'),
      L('Why cut a sentence that is not about the topic?', 'It pulls the reader away from the main idea.') ] },
    edit: { goal: 'I can edit: check every word.', think: [
      L('Edit: "my freind and i went to the rink on saturday"', 'My friend and I went to the rink on Saturday.'),
      L('Write three things to check when you edit.', 'Capitals, end marks, spelling (also commas, word endings).'),
      L('Why read your work aloud when you edit?', 'You hear missing words and places that sound wrong.') ] }
  } });
})();
