/* Grade 3 Reading Smoothly: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets (reading
   aloud with a grown-up) are made from chapters/fluency.js; this file adds each idea's "I can" line and its Think questions.
   Ontario 2023 Language, Grade 3, B2.5 fluency: accuracy, pacing, phrasing and expression. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('fluency', { code: 'FL', ideas: {
    marks: { goal: 'I can let the marks tell my voice what to do.',
      think: [{ q: 'How does your voice change at a question mark?', lines: 2, key: 'It goes up at the end.' },
        { q: 'Write one sentence that should be read in an excited voice. Which mark shows it?', lines: 2, key: 'For example: We won the game! The exclamation mark shows it.' },
        { q: 'What does a comma tell you to do when you read aloud?', lines: 1, key: 'Take a short pause.' }] },
    phrases: { goal: 'I can read in phrases, not word by word.',
      think: [{ q: 'Draw a slash (/) between the phrases.', fig: W.sent('After school we walked to the park by the river.'), lines: 1, key: 'After school / we walked / to the park / by the river.' },
        { q: 'Why does reading in phrases help you understand?', lines: 2, key: 'Words that go together are read together, so the meaning comes through and it sounds like talking.' },
        { q: 'Draw a slash (/) between the phrases.', fig: W.sent('The loon dived under the water and came up far away.'), lines: 1, key: 'The loon / dived under the water / and came up / far away.' }] },
    feeling: { goal: 'I can read aloud with feeling.',
      think: [{ q: 'How would you read this? Why?', fig: W.sent('“Oh no, the canoe is drifting away!” shouted Liam.'), lines: 2, key: 'Fast and worried, a little loud, because Liam is scared the canoe will float away.' },
        { q: 'How would you read this? Why?', fig: W.sent('The baby was asleep, so we whispered.'), lines: 2, key: 'Softly and slowly, because the baby is asleep.' },
        { q: 'Write a sentence that should be read in a sad voice.', lines: 2, key: 'For example: My best friend moved away today.' }] }
  } });
})();
