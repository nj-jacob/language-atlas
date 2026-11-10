/* Grade 8 Reading Strategies: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/reading.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: C1.1 comprehension, C2.2 to C2.6 reading strategies. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('reading', { code: 'RD', ideas: {
    details: { goal: 'I can find the answer in the text and point to where it is.',
      think: [O('Why should you check the text instead of answering from memory?', 4, 'Memory can be wrong; the text is the evidence.'),
        O('Explain how you find an answer fast in a long text.', 4, 'Pick a key word from the question, scan for it, then read the sentences around it.'),
        O('Write a question about a text you read this week, and the line that answers it.', 5, 'A question with a matching quotation or line reference.')] },
    ties: { goal: 'I can tell which word a small word like it, they or this points back to.',
      think: [O('"Ava handed Mei the map because she was lost." Who was lost? Why is it unclear?', 4, 'Probably Mei, but "she" could mean either girl. Rewrite: because Mei was lost.'),
        O('What does "this" point back to? "The river flooded twice in May. This forced the town to build a wall."', 3, 'The river flooding twice in May.'),
        O('Why do writers use words like it, they and this?', 4, 'To avoid repeating nouns and to tie sentences together.')] },
    predict: { goal: 'I can predict, then confirm or change my prediction.', steps: 3,
      think: [O('A story begins: "The ice creaked under Jonah’s boots." Predict what happens. What clue did you use?', 4, 'For example: the ice may crack; the clue is "creaked".'),
        O('What should you do when the text proves your prediction wrong?', 4, 'Drop it and make a new prediction that fits the evidence.'),
        O('Write a question that would help you check your prediction.', 3, 'For example: Will Jonah reach the shore before the ice breaks?')] },
    monitor: { goal: 'I can notice when I am lost and use a strategy to fix it.',
      think: [O('Name three things you can do when a paragraph makes no sense.', 4, 'Reread, check the glossary, look up a word, ask a question, read on a little, look at the pictures.'),
        O('What signs tell you that you have stopped understanding?', 4, 'You cannot say what you just read, or your mind wandered.'),
        O('Which fix-up strategy works best for you? Why?', 4, 'Any strategy with a reason.')] },
    purpose: { goal: 'I can choose a text that suits my purpose.',
      think: [O('You need facts about Arctic sea ice for a report. Which is better: a novel set in Nunavut or a government science page? Why?', 4, 'The science page: it gives facts and data; the novel tells a story.'),
        O('Name three purposes for reading.', 3, 'For example: to learn facts, to enjoy a story, to follow instructions, to hear other views.'),
        O('Why does it matter who created a text?', 4, 'The creator’s knowledge and point of view shape what the text says.')] },
    summary: { goal: 'I can sum up a whole text briefly in my own words.',
      think: [O('What three things belong in a good summary?', 4, 'The main idea, the key points from the whole text, in your own words.'),
        O('What should you leave out of a summary?', 4, 'Small details, every event, and your opinion.'),
        O('Summarize a book or film you know in two sentences.', 5, 'Two sentences covering the whole story or main idea, no opinion.')] },
    synthesize: { goal: 'I can combine ideas from two texts into one new idea.',
      think: [O('Text A says bike lanes reduce traffic. Text B says bike lanes cost a lot. Write one sentence that combines both.', 4, 'For example: Bike lanes can reduce traffic, but cities must weigh that against their cost.'),
        O('How is synthesizing different from summarizing two texts?', 4, 'Summarizing retells each text; synthesizing joins them into a new idea.'),
        O('Connect an idea from a text you read to your own life or the world.', 5, 'A clear link between the text and an experience or a current event.')] }
  } });
})();
