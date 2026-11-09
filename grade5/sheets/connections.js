/* Grade 5 Skills and Connections: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/connections.js, and its activities print as Activity sheets; this file adds each idea's "I can" goal and its
   Think questions (open, marked by a grown-up). Ontario 2023 Language: A1.1, A3.1. Written for this site. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('connections', { code: 'CO', ideas: {
    seven: { goal: 'I can explain how the transferable skills help me.', think: [
      O('Choose one skill (for example, collaboration or critical thinking). Describe a time you used it.', 'Answers vary: names a skill and a real example.', 3),
      O('Which transferable skill helps you most when you write? Why?', 'For example: creativity, to think of new ideas; or self-directed learning, to keep going.', 2),
      O('Which skill do you want to grow? What is one step you could take?', 'Answers vary: a skill and a clear next step.', 2)] },
    everywhere: { goal: 'I can use Language skills in other subjects.', think: [
      O('How does summarizing help in science?', 'You can sum up an experiment or a chapter to remember the key ideas.', 2),
      O('Name a math problem where reading carefully matters. Why?', 'A word problem. You must find the numbers and what the question asks.', 2),
      O('How could you use persuasive writing in social studies?', 'For example: write a letter to a council member about a community issue.', 2)] }
  } });
})();
