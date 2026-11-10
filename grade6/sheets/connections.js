/* Grade 6 Skills and Connections: worksheets (assets/engine/sheets.js). Learn, Practise and Activity sheets are made from
   chapters/connections.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, A1.1, A3.1. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('connections', { code: 'CO', ideas: {
    skills: { goal: 'I can explain how transferable skills help me.', think: [
      O('Which skill did you use when you worked with a group? How?', null, 3, 'Collaboration: we shared jobs and listened to each other.'),
      O('Which skill helps when a task feels too hard? How?', null, 2, 'Self-directed learning: I break it into steps and keep trying.'),
      O('Set a goal for one skill you want to grow.', null, 2, 'Communication: I will ask one question in every discussion.')] },
    everywhere: { goal: 'I can use language skills in other subjects.', think: [
      O('How does summarizing help in science?', null, 2, 'It helps me remember the main idea of an experiment.'),
      O('How do reading skills help you solve a math problem?', null, 2, 'I read carefully to find what is asked and which numbers matter.'),
      O('Name a time you used writing outside school.', null, 2, 'A card for a friend, a list, a message to family.')] }
  } });
})();
