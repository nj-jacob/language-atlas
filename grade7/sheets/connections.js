/* Grade 7 Skills and Connections: the hand-written part of the printable worksheets (the rest is made from chapters/connections.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, A1.1 and A3.1.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('connections', { code: 'CO', ideas: {
    transferable: { goal: 'I can use transferable skills in many places.', think: [
      T('Choose one skill (for example collaboration) and describe two places you use it.', '', 'For example: collaboration in a group project and on a sports team.'),
      T('How do these skills help you express your own voice?', '', 'Communication and critical thinking help you share your ideas clearly and stand behind them.'),
      T('Choose a skill you want to grow. Write one step you will take this month.', '', 'A named skill with a specific, doable step.')] },
    subjects: { goal: 'I can use language skills in other subjects.', think: [
      T('How does summarizing help you in science?', '', 'It helps you remember the main idea of an experiment or chapter.'),
      T('Give an example of reading and writing in a history class.', '', 'For example: reading a primary source and writing a paragraph about what it shows.'),
      T('How do language skills help you in everyday life?', '', 'Reading instructions, writing messages, listening to others, and judging what you see online.')] }
  } });
})();
