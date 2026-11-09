/* Grade 3 Sentences: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made from
   chapters/sentences.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B3.1 Syntax and sentence structure. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('sentences', { code: 'SE', ideas: {
    kinds: { goal: 'I can tell the four kinds of sentences apart.',
      think: [{ q: 'Write a telling sentence and an asking sentence about the same thing.', lines: 2, key: 'For example: The lake is cold. Is the lake cold?' },
        { q: 'Write a command you might hear at school.', lines: 1, key: 'For example: Line up at the door.' },
        { q: '“Stop!” ends with !. Is it a strong feeling sentence or a command? How do you know?', lines: 2, key: 'A command. It tells someone to do something.' }] },
    complete: { goal: 'I can write a complete sentence.',
      think: [{ q: 'Make this a complete sentence.', fig: W.sent('Jumped into the lake.'), lines: 1, key: 'For example: Kai jumped into the lake.' },
        { q: 'Make this a complete sentence.', fig: W.sent('The old wooden canoe.'), lines: 1, key: 'For example: The old wooden canoe floated by the dock.' },
        { q: 'Why is “Because it was cold.” not a complete sentence?', lines: 2, key: 'It does not tell who or what, or what happened. It needs a main part.' }] },
    'and-but-so': { goal: 'I can join two ideas with and, but or so.',
      think: [{ q: 'Join these with <b>so</b>.', fig: W.sent('The bus was late.') + W.sent('We walked to school.'), lines: 1, key: 'The bus was late, so we walked to school.' },
        { q: 'Join these with <b>but</b>.', fig: W.sent('The water was cold.') + W.sent('We swam anyway.'), lines: 1, key: 'The water was cold, but we swam anyway.' },
        { q: 'Finish it in two ways: <i>I wanted to play outside, …</i>', lines: 2, key: 'For example: …but it was raining. …so I put on my boots.' }] },
    'because-when': { goal: 'I can tell why or when with because and when.',
      think: [{ q: 'Finish it with <b>because</b>: <i>We stayed inside …</i>', lines: 1, key: 'For example: We stayed inside because it was snowing.' },
        { q: 'Finish it with <b>when</b>: <i>Wash your hands …</i>', lines: 1, key: 'For example: Wash your hands when you come in.' },
        { q: 'Write a sentence that starts with <b>When</b>. Remember the comma.', lines: 2, key: 'For example: When the bell rings, we line up.' }] }
  } });
})();
