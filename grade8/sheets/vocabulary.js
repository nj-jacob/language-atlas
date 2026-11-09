/* Grade 8 Words in Context: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/vocabulary.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B2.2 vocabulary in context and in other subjects. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('vocabulary', { code: 'VO', ideas: {
    definition: { goal: 'I can find a clue in the sentence that explains a new word.',
      think: [O('"The trail was treacherous, meaning it was full of hidden dangers." What does treacherous mean? Which words told you?', 2, 'Dangerous in hidden ways. The clue is "meaning it was full of hidden dangers".'),
        O('Name three signal words that often come before a definition clue.', 2, 'Any three of: meaning, that is, which is, or, also called, in other words, a comma or dash.'),
        O('Write your own sentence that explains the word "nocturnal".', 2, 'For example: Owls are nocturnal, which means they are awake at night.')] },
    contrast: { goal: 'I can use a contrast clue to work out the opposite meaning.',
      think: [O('"Unlike his gregarious sister, Ravi spoke to no one at the party." What does gregarious mean? How do you know?', 2, 'Friendly and outgoing. "Unlike" shows she is the opposite of Ravi, who spoke to no one.'),
        O('List three words that signal a contrast clue.', 2, 'Any three of: unlike, but, however, although, instead, on the other hand, while.'),
        O('Write a sentence with a contrast clue for the word "frugal".', 2, 'For example: Ana spends freely, but her brother is frugal and saves every dollar.')] },
    example: { goal: 'I can use examples in a sentence to work out a word’s meaning.',
      think: [O('"The museum shows artifacts such as tools, beadwork and pottery." What are artifacts?', 2, 'Objects made by people long ago, kept for what they show about the past.'),
        O('Tomas says artifacts means "pottery". Why is that not quite right?', 2, 'Pottery is only one example; the word covers all the things in the group.'),
        O('Write a sentence with examples that explain the word "precipitation".', 2, 'For example: Precipitation, such as rain, snow and hail, fell all week.')] },
    parts: { goal: 'I can use word parts and the sentence together to work out a word.',
      think: [O('Use the parts of "irreversible" (ir + revers + ible) to say what it means. Check it in a sentence.', 3, 'Not able to be turned back. "The damage was irreversible, so the tree could not be saved."'),
        O('What should you do when the word parts point one way and the sentence points another?', 2, 'Trust the sentence, then check a dictionary or glossary.'),
        O('Pick a long word from a science or history text. Break it into parts and explain it.', 3, 'Any accurate breakdown, for example photosynthesis: photo (light) + synthesis (putting together).')] },
    'thinking-words': { goal: 'I can tell what a task wants from its thinking word.',
      think: [O('What is the difference between "summarize" and "evaluate"?', 2, 'Summarize: retell the main points briefly. Evaluate: judge how good, true or useful something is, with reasons.'),
        O('A question says "Compare the two maps." What must your answer include?', 2, 'How the maps are alike and how they are different.'),
        O('Write a question about a book you know that uses the word "analyze".', 2, 'For example: Analyze how the setting makes the main character feel trapped.')] },
    'subject-words': { goal: 'I can use the right words for each subject.',
      think: [O('Write two science words and two history words. Say what each means.', 4, 'For example: Science: hypothesis (a guess you can test), variable (a thing that changes). History: treaty (a formal agreement), primary source (a record made at the time).'),
        O('Where in a textbook can you check a subject word?', 2, 'The glossary, the index, or a definition box or margin note.'),
        O('Why should you use "evaporate" instead of "dry up" in a science report?', 2, 'It is the exact subject word, so the reader knows precisely what happened.')] },
    multiple: { goal: 'I can tell which meaning a word has in each subject.',
      think: [O('Write what "mean" means in Math and in everyday talk.', 2, 'Math: the average. Everyday: unkind.'),
        O('Use "current" in a science sentence and in a news sentence.', 2, 'Science: An electric current flows through the wire. News: Here are the current events.'),
        O('How do you decide which meaning a word has?', 2, 'Look at the subject and the sentence around it.')] },
    connotation: { goal: 'I can choose words for the feeling they give.',
      think: [O('"Thrifty" and "cheap" both mean careful with money. Which sounds kinder? Why?', 2, 'Thrifty; it sounds wise, while cheap sounds stingy.'),
        O('Rewrite "The crowd was loud" so it feels positive, then so it feels negative.', 2, 'Positive: The crowd was lively. Negative: The crowd was rowdy.'),
        O('Why does connotation matter in persuasive writing?', 2, 'The feeling of a word can win or lose the reader, even when the meaning is the same.')] }
  } });
})();
