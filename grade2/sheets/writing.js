/* Grade 2 Writing and Publishing: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/writing.js; its activities print as Activity sheets.
   Ontario 2023 Language: D2.3 voice and describing words, D2.4 point of view, D2.5 revise, D2.6 edit. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('writing', { code: 'WR', ideas: {
    voice: { goal: 'I can show my voice with describing words.', think: [
      O('Write how you feel about rainy days, with two describing words.', 'For example: Rainy days feel cozy and calm.'),
      O('Make it sound like you: “The game was good.”', 'For example: The game was so exciting that I jumped up and cheered!', 2),
      O('Why do readers like writing with voice?', 'They can hear the writer’s feelings, so it is more interesting.')] },
    pov: { goal: 'I can write in the first person with I and we.', think: [
      O('Change to first person: “Omar went to the market with his dad.”', 'I went to the market with my dad.', 2),
      O('Which words tell you a text is in the first person?', 'I, me, my, we, our.', 2),
      O('Write two sentences about your morning in the first person.', 'Two sentences with I or we.')] },
    revise: { goal: 'I can revise by adding or taking out a sentence.', think: [
      O('Cross out the sentence that does not belong: “We went to the lake. We swam. My pencil is blue.”', 'My pencil is blue.', 2),
      O('Add a sentence to make it clearer: “We made a snow fort.”', 'For example: It had a tunnel and a tall wall.', 2),
      O('Why do writers ask others for feedback?', 'Others can see what is missing or confusing.')] },
    edit: { goal: 'I can edit for capitals, marks and spelling.', think: [
      O('Fix three mistakes: “on monday we went to the park”', 'On Monday we went to the park.', 2),
      O('Write the checklist you use when you edit.', 'Capitals, end marks, spelling.'),
      O('What is the difference between revising and editing?', 'Revising changes the ideas. Editing fixes capitals, marks and spelling.')] }
  } });
})();
