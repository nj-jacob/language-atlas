/* Grade 3 Listening and Speaking: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets (talks
   and listening with a grown-up) are made from chapters/talking.js; this file adds each idea's "I can" line and Think questions.
   Ontario 2023 Language, Grade 3, B1.1 to B1.5 listening and speaking. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  S.register('talking', { code: 'TA', ideas: {
    'listen-well': { goal: 'I can listen well and ask a question to check.',
      think: [{ q: 'Write two things a good listener does.', lines: 2, key: 'For example: looks at the speaker, waits for a turn, asks a question to check.' },
        { q: 'A friend says, “Meet me by the big tree.” Write a question to check what they mean.', lines: 2, key: 'For example: Do you mean the big pine beside the slide?' },
        { q: 'Why is it good to ask a question when you are not sure?', lines: 2, key: 'So you understand the message and do not guess wrong.' }] },
    'listen-check': { goal: 'I can use a strategy before, during and after listening.',
      think: [{ q: 'What can you do <b>before</b> you listen to a story?', lines: 2, key: 'For example: think about the title and what I already know.' },
        { q: 'What can you do <b>after</b> you listen?', lines: 2, key: 'For example: retell the main parts, or ask a question about what I missed.' },
        { q: 'What can you do if a message is hard to understand?', lines: 2, key: 'Ask the speaker to say it again or explain, or ask a question.' }] },
    audience: { goal: 'I can choose how to speak for who is listening.',
      think: [{ q: 'How would you talk to your principal? How would you talk to your best friend?', lines: 3, key: 'To the principal: politely, with full sentences. To a friend: more relaxed, but still kind.' },
        { q: 'You are telling a little child a story. What will you do so they understand?', lines: 2, key: 'Use simple words, speak slowly, show pictures.' },
        { q: 'Why do we speak differently to different people?', lines: 2, key: 'Each audience needs a different voice so they understand and feel respected.' }] },
    body: { goal: 'I can use my face and hands to help my message.',
      think: [{ q: 'Draw or describe your face when you tell a scary part of a story.', lines: 2, key: 'For example: wide eyes, a quiet voice, leaning in.' },
        { q: 'How can your hands help you tell someone how big a fish was?', lines: 2, key: 'Hold your hands apart to show the size.' },
        { q: 'Why should you look at your listeners when you speak?', lines: 2, key: 'It helps them listen and shows you are talking to them.' }] },
    'clear-words': { goal: 'I can choose exact words when I speak.',
      think: [{ q: 'Make it more exact: <i>I saw a thing at the lake.</i>', lines: 2, key: 'For example: I saw a loon diving at the lake.' },
        { q: 'Make it more exact: <i>We did stuff after school.</i>', lines: 2, key: 'For example: We built a snow fort after school.' },
        { q: 'Why do exact words help your listener?', lines: 2, key: 'They can picture exactly what you mean.' }] }
  } });
})();
