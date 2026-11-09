/* Grade 8 Drafting, Revising and Publishing: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made
   from chapters/writing.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: D2.2 to D2.6 voice, perspective, revising, editing and word processing. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('writing', { code: 'WR', ideas: {
    style: { goal: 'I can fit my style to the form and the reader.',
      think: [O('Rewrite as a formal report sentence: "The experiment was totally awesome and it worked lol."', 2, 'For example: The experiment was successful.'),
        O('How would your style change from a text to a friend to a cover letter for a job?', 2, 'More formal words, complete sentences, polite tone, no abbreviations.'),
        O('Write the opening line of a spooky story in a voice that suits it.', 2, 'A line with mood-building words and rhythm.')] },
    perspective: { goal: 'I can acknowledge another view in my writing.',
      think: [O('Write a sentence that acknowledges the other side of "Phones should be allowed in class."', 2, 'For example: Some teachers worry phones distract students, and that is a fair concern.'),
        O('Why does mocking the other side weaken your writing?', 2, 'Readers who disagree stop listening, and it makes you seem unfair.'),
        O('How might a younger student and a parent respond differently to your piece?', 2, 'Any two different reactions with reasons.')] },
    neutral: { goal: 'I can replace loaded words with neutral ones.',
      think: [O('Find the loaded words and rewrite: "The greedy developers want to destroy our precious park."', 2, 'Loaded: greedy, destroy, precious. Neutral: The developers plan to build on the park.'),
        O('When might loaded words be the right choice?', 2, 'In persuasive writing, used carefully, or in a story to show feeling.'),
        O('Why do strong insults not make an argument stronger?', 2, 'They show bias and replace evidence with feeling.')] },
    focus: { goal: 'I can cut sentences that are off topic.',
      think: [O('A paragraph about wind power ends with "My uncle has a red truck." What should you do? Why?', 2, 'Cut it: it is off topic.'),
        O('What question can you ask about every sentence to check focus?', 1, 'Does this sentence support my main idea?'),
        O('Why is it hard to cut a sentence you like?', 2, 'It took effort, but keeping it weakens the focus.')] },
    combine: { goal: 'I can combine choppy sentences into smooth ones.',
      think: [O('Combine: "The wolf was grey. It was hungry. It crept toward the camp."', 1, 'The hungry grey wolf crept toward the camp.'),
        O('Combine with a joining word: "The road was icy. We drove slowly."', 1, 'Because the road was icy, we drove slowly.'),
        O('When is combining sentences a bad idea?', 2, 'When one sentence ends up carrying too many ideas and becomes hard to follow.')] },
    order: { goal: 'I can reorganize sentences so the ideas flow.',
      think: [O('Where should the main idea of a paragraph usually go? Why?', 2, 'Near the start, so the reader knows what the paragraph is about.'),
        O('Put in order: "Then we added the eggs. First we melted the butter. Finally we baked it."', 1, 'First we melted the butter. Then we added the eggs. Finally we baked it.'),
        O('How can a reader’s feedback help you reorganize?', 2, 'They show where they got lost or confused.')] },
    homophones: { goal: 'I can catch errors a spell-checker misses.',
      think: [O('Fix it: "Their going to bring there own lunch over hear."', 1, 'They’re going to bring their own lunch over here.'),
        O('Why does a spell-checker miss these errors?', 2, 'They are real words, just the wrong ones.'),
        O('Write a sentence using to, too and two correctly.', 1, 'For example: Two of us went to the lake, and Kai came too.')] },
    errors: { goal: 'I can sort errors as spelling, punctuation or grammar and fix them.',
      think: [O('Find and name each error: "Me and Ana goes to the libary every saturday"', 2, 'Grammar: Ana and I go. Spelling: library. Capital: Saturday. Punctuation: full stop at the end.'),
        O('Why read your draft several times, looking for one kind of error each time?', 2, 'It is easier to catch errors when you focus on one thing.'),
        O('Name one editing tip that works for you.', 1, 'For example: read it aloud, read it backwards, print it.')] },
    tools: { goal: 'I can use word-processing tools to improve my writing.',
      think: [O('A grammar-checker suggests a change that alters your meaning. What should you do?', 2, 'Ignore it; the writer decides.'),
        O('Name three word-processing tools that help you revise or edit.', 2, 'Any three of: spell-checker, grammar-checker, track changes, comments, find and replace, word count, thesaurus.'),
        O('How does "track changes" help when someone else edits your work?', 2, 'You can see each change and accept or reject it.')] }
  } });
})();
