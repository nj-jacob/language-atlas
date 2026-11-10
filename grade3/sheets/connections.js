/* Grade 3 Skills and Connections: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are
   made from chapters/connections.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, A1.1, A3.1 (A1.2, A3.2, A3.3 on the Activity sheets). */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  S.register('connections', { code: 'CO', ideas: {
    skills: { goal: 'I can name the skills that help me learn.',
      think: [{ q: 'Tell about a time you kept trying when something was hard.', lines: 3, key: 'Any true example of not giving up (resilience).' },
        { q: 'Which skill do you use when you work in a group? How?', lines: 2, key: 'For example: working together; I take turns and listen to ideas.' },
        { q: 'Which skill do you want to get better at? Why?', lines: 2, key: 'Any skill with a reason.' }] },
    everywhere: { goal: 'I can use reading and writing in other subjects and every day.',
      think: [{ q: 'How do you use reading in math?', lines: 2, key: 'For example: reading word problems and instructions.' },
        { q: 'Write two times a grown-up uses writing in everyday life.', lines: 2, key: 'For example: a shopping list, a birthday card, a text message.' },
        { q: 'How could writing help you in science?', lines: 2, key: 'For example: recording what I observe in an experiment.' }] }
  } });
})();
