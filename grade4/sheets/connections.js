/* Grade 4 Skills and Connections: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/connections.js; its activities (A1.2, A3.2, A3.3) print as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: A1.1 transferable skills, A1.2 next steps, A3.1 language in every subject. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 4, key: key }; }

  S.register('connections', { code: 'CN', ideas: {
    skills: { goal: 'I can name the skills I use when I learn.', think: [
      L('Name a skill you used in a group project. How did it help?', 'For example: collaboration: we shared jobs and finished on time.'),
      L('How does asking good questions help in science and in reading?', 'It helps you find out more and understand.'),
      L('Which skill do you want to get better at? Why?', 'Any skill with a reason.') ] },
    goals: { goal: 'I can set a goal I can check.', think: [
      L('Make this goal checkable: "Read more."', 'For example: Read 20 minutes every night this week.'),
      L('How will you know you met your goal?', 'Name a way to check, such as a reading log.'),
      L('Write a writing goal for next week.', 'A goal that is clear and can be checked.') ] },
    everywhere: { goal: 'I can use reading and writing in every subject.', think: [
      L('How do you use reading in math?', 'For example: reading word problems and instructions.'),
      L('How might you use writing outside school?', 'For example: a shopping list, a card, a message.'),
      L('Why do exact words matter in science?', 'They tell exactly what you saw or measured.') ] }
  } });
})();
