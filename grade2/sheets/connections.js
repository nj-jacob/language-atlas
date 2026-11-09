/* Grade 2 Skills and Connections: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/connections.js; its activities print as Activity sheets.
   Ontario 2023 Language: A1.1 transferable skills, A3.1 using reading and writing across subjects and everyday life. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('connections', { code: 'CO', ideas: {
    skills: { goal: 'I can name the skills I use when I learn.', think: [
      O('Name a skill you use in reading and in math.', 'For example: solving problems, asking questions.', 2),
      O('Tell about a time you kept trying when something was hard.', 'Any true example of not giving up.'),
      O('Which skill helps you work with a partner?', 'For example: listening, taking turns, sharing ideas.', 2)] },
    everywhere: { goal: 'I can use reading and writing everywhere.', think: [
      O('Name three things you read at home that are not books.', 'For example: a recipe, a cereal box, a map.', 2),
      O('How do you use writing in science?', 'For example: to label a plant, write what I saw, record a test.'),
      O('Why is reading useful at the grocery store?', 'To read signs, labels, prices and the list.')] }
  } });
})();
