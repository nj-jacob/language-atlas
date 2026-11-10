/* Grade 1 Skills and Connections: printable worksheets. Learn and Practise 1 to 3 are made from chapters/connections.js; this file
   adds each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, A1.1 and A3.1 (A1.2, A3.2 and A3.3 are
   activities, printed as Activity sheets).
   Think questions marked by a computer are checked in tests/verify/grade1-connections.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('connections', { code: 'CO', ideas: {
    skills: { goal: 'I can name the skills I use when I learn.', think: [
      Q.tf('"Taking turns reading with a friend." Zack says this is working together. True or false?', true, 'Taking turns with a friend is working together.', 'It is a different skill.',
        { fig: W.icon('people'), meta: { k: 'g1-skill-tf', ex: 'taking turns reading with a friend', said: 'working together' } }),
      { q: 'Which skill do you use most when you read? Tell a time you used it.', lines: 2, key: 'Any skill (thinking carefully, being creative ...) with a real example.' },
      { q: 'What skill will you work on next? How?', fig: W.icon('star'), lines: 2, key: 'A skill and one plan, for example: working together, by taking turns.' }] },
    everywhere: { goal: 'I can use reading and writing everywhere.', think: [
      Q.tf('Do you use reading or writing when you are hugging your dog?', false, 'Yes, I read or write.', 'No. Hugging my dog does not use reading or writing.',
        { fig: W.pic('dog'), meta: { k: 'g1-everyday-tf', w: 'hugging my dog' } }),
      { q: 'Write two times today when you read something outside of a book.', lines: 2, key: 'For example: a cereal box, a street sign, a menu, a game.' },
      { q: 'How does reading help you in math or science?', lines: 2, key: 'You read number stories, steps of an experiment, labels and charts.' }] }
  } });
})();
