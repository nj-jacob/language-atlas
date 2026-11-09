/* Grade 3 Reading for Meaning: printable worksheets (assets/engine/sheets.js). Learn, Practise, Read (one per "Read and answer"
   passage) and the Activity sheets are made from chapters/reading.js and ../texts.js; this file adds each idea's "I can" line and
   its Think questions, written by hand. Think questions about a passage show it with Atlas.texts.show.
   Ontario 2023 Language, Grade 3, C1.1, C1.2, C1.6, C2.2, C2.3, C2.4, C2.6 (C1.7, C2.1, C2.5, C2.7 on the Activity sheets). */
(function () {
  var S = Atlas.sheets, T = Atlas.texts;
  if (!S) return;
  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find the answer in the text.',
      think: [{ q: 'Where did they find the mitten? Copy the words from the text that tell you.', fig: T.show(T.mitten), lines: 2, key: '“There, on top of the slide, sat a small red mitten.”' },
        { q: 'How do the words in a question help you find the answer?', lines: 2, key: 'Look for the same words in the text. The answer is near them.' },
        { q: 'Write a question about the story that someone could answer from the text.', lines: 2, key: 'For example: Who lost a mitten? (Leila)' }] },
    'main-idea': { goal: 'I can tell the main idea and the details that hold it up.',
      think: [{ q: 'What is this story mostly about? Write it in one sentence.', fig: T.show(T.kite), lines: 2, key: 'Tala loses her kite in the wind, and her brother Omar gets it back.' },
        { q: 'Write two details from the story that hold up the main idea.', lines: 2, key: 'For example: The string slipped out of her hand. Omar climbed the tree.' },
        { q: 'How is a main idea different from a detail?', lines: 2, key: 'The main idea is what the whole text is about. A detail is one small part.' }] },
    sequence: { goal: 'I can tell what happened first, next and last.',
      think: [{ q: 'Retell the story in three steps: first, next, last.', fig: T.show(T.mitten), lines: 3, key: 'First, Leila lost her mitten. Next, they followed their footprints back. Last, they found it on the slide.' },
        { q: 'Which words in a story tell you about order?', lines: 2, key: 'For example: first, then, next, after, finally, at last.' },
        { q: 'Why does the order matter when you retell a story?', lines: 2, key: 'If the order is mixed up, the story does not make sense.' }] },
    predict: { goal: 'I can predict using a clue from the text.',
      think: [{ q: 'Look at a book cover. What do you think will happen? What is your clue?', lines: 3, key: 'Any prediction with a clue from the title or picture.' },
        { q: 'What should you do after you make a prediction?', lines: 2, key: 'Read on and check. Change the prediction if new clues show something else.' },
        { q: 'Finish it: <i>I predict … because the text says …</i>', lines: 2, key: 'A prediction joined to a clue from the text.' }] },
    'fix-up': { goal: 'I can fix it when my reading does not make sense.',
      think: [{ q: 'Write two things you can do when a sentence does not make sense.', lines: 2, key: 'For example: reread it slowly; make a picture in my head; ask a question and read on.' },
        { q: 'Tell about a time you got stuck reading. What did you do?', lines: 3, key: 'Any true example that names a fix-up strategy.' },
        { q: 'How does making a picture in your head help you read?', lines: 2, key: 'It helps me see what is happening, so I notice when something does not fit.' }] },
    purpose: { goal: 'I can say why I am reading a text.',
      think: [{ q: 'Why might you read instructions? Why might you read a story?', lines: 2, key: 'Instructions: to learn how to do something. A story: to enjoy it.' },
        { q: 'Name something you read to learn facts.', lines: 1, key: 'For example: a book about bears, a weather report, a sign at a museum.' },
        { q: 'How does knowing why you are reading change how you read?', lines: 2, key: 'For facts I read slowly and look for answers; for fun I can enjoy the story.' }] },
    forms: { goal: 'I can tell what kind of text it is.',
      think: [{ q: 'Write one thing you see in a letter that you do not see in a story.', lines: 2, key: 'For example: it starts with "Dear" and ends with the writer’s name.' },
        { q: 'How can you tell a poem from an information text?', lines: 2, key: 'A poem has short lines that sound good together. An information text has headings and facts.' },
        { q: 'Write the first two steps of instructions for brushing your teeth.', lines: 2, key: 'For example: 1. Put toothpaste on your brush. 2. Brush every tooth.' }] },
    narrator: { goal: 'I can tell if a story is told in first person or third person.',
      think: [{ q: 'Who is telling this story? How do you know?', fig: T.show(T.canoe), lines: 2, key: 'The girl in the canoe tells it (first person). She says I and my.' },
        { q: 'Write one sentence of the story as if someone else were telling it (third person).', lines: 2, key: 'For example: Last summer, she went on her first canoe trip with her aunt.' },
        { q: 'Which words show a story is told in first person?', lines: 1, key: 'I, me, my, we.' }] }
  } });
})();
