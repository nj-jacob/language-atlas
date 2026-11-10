/* Grade 3 Writing and Publishing: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets
   (drafting, cursive, publishing and sharing, marked with a rubric) are made from chapters/writing.js; this file adds each idea's
   "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, D2.3 to D2.6 (D2.1, D2.2, D3.1 to D3.3 on the Activity sheets). */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('writing', { code: 'WR', ideas: {
    voice: { goal: 'I can show my feelings with strong words.',
      think: [{ q: 'Make it show a feeling: <i>I went to the fair.</i>', lines: 2, key: 'For example: I could hardly wait to ride the giant Ferris wheel at the fair!' },
        { q: 'Write a sentence that shows you love winter.', lines: 2, key: 'For example: Nothing beats the crunch of fresh snow under my boots!' },
        { q: 'What makes writing sound like you?', lines: 2, key: 'Your own feelings, opinions and favourite words.' }] },
    pov: { goal: 'I can tell if my writing is in first or third person.',
      think: [{ q: 'Change it to first person.', fig: W.sent('Kai fed his dog after school.'), lines: 1, key: 'I fed my dog after school.' },
        { q: 'Change it to third person.', fig: W.sent('I scored a goal at hockey.'), lines: 1, key: 'For example: Priya scored a goal at hockey.' },
        { q: 'Write one sentence about yesterday in first person.', lines: 2, key: 'Any sentence using I, me or my.' }] },
    revise: { goal: 'I can revise: take out, add, replace.',
      think: [{ q: 'Add a detail to make it better.', fig: W.sent('We went skating.'), lines: 1, key: 'For example: We went skating on the frozen canal after supper.' },
        { q: 'Replace the weak word <b>nice</b>.', fig: W.sent('We had a nice time at the beach.'), lines: 1, key: 'For example: We had a wonderful time at the beach.' },
        { q: 'Why do writers take out a sentence?', lines: 2, key: 'It does not fit the topic or it repeats something.' }] },
    edit: { goal: 'I can edit to fix mistakes.',
      think: [{ q: 'Fix the three mistakes.', fig: W.sent('my sister and me went to toronto'), lines: 1, key: 'My sister and I went to Toronto.' },
        { q: 'Fix the mistakes.', fig: W.sent('we seen a bear it was big'), lines: 1, key: 'We saw a bear. It was big.' },
        { q: 'What do you check when you edit? Write three things.', lines: 2, key: 'Capitals, end marks, spelling (also commas and speech marks).' }] }
  } });
})();
