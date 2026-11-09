/* Grade 8 Forms, Features and Style: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/forms.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: C1.2 to C1.6 forms, patterns, features, visuals, style and narrators. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('forms', { code: 'FO', ideas: {
    genre: { goal: 'I can name a text’s form from the features that prove it.',
      think: [O('Name three features of a letter to the editor.', 2, 'A greeting to the editor, an opinion on a current issue, reasons, a request or call to action, the writer’s name.'),
        O('How is a news report different from a personal essay?', 2, 'A news report gives facts in third person; a personal essay gives the writer’s own experience and views.'),
        O('Why can a story about soccer still be a poem?', 2, 'The form depends on the features (lines, stanzas, imagery), not the topic.')] },
    patterns: { goal: 'I can use signal words to find a text’s pattern.',
      think: [O('Which pattern uses the words "the problem is" and "one solution"?', 1, 'Problem and solution.'),
        O('List two signal words each for cause and effect, and compare and contrast.', 2, 'Cause and effect: because, as a result. Compare and contrast: however, similarly.'),
        O('Why does knowing the pattern help you take notes?', 2, 'You can choose an organizer that matches it, such as a T-chart for compare and contrast.')] },
    features: { goal: 'I can use text features to find and understand information.',
      think: [O('What does a glossary do? Where do you find it?', 2, 'It explains key words; usually at the back of a book.'),
        O('Why should you read captions and sidebars?', 2, 'They often hold key facts and explain the pictures.'),
        O('Name two features of an infographic and what each one does.', 2, 'For example: icons show topics quickly; charts show numbers visually.')] },
    graphs: { goal: 'I can check a graph’s scale before I trust it.',
      think: [O('A bar graph starts at 90, not 0. How can that mislead a reader?', 2, 'Small differences look huge.'),
        O('Name three things to check on any graph.', 2, 'The title, the scale, the labels and units, the source.'),
        O('How do images and design choices (colour, size) shape what a reader feels?', 2, 'Bright or large parts draw attention and can make one side seem more important.')] },
    voice: { goal: 'I can describe the voice in a piece of writing.',
      think: [O('Describe the voice: "Honestly? The so-called shortcut added an hour. Thanks a lot, map app."', 2, 'Sarcastic, casual and annoyed.'),
        O('Name two things a writer uses to create voice.', 2, 'Word choice, sentence length, punctuation, humour.'),
        O('Rewrite the shortcut sentence in a calm, formal voice.', 2, 'For example: The suggested route took an hour longer than expected.')] },
    'sentence-style': { goal: 'I can explain how sentence shape and repetition create an effect.',
      think: [O('What effect do short sentences have here? "He ran. He fell. Silence."', 2, 'They build tension and speed.'),
        O('Why might a speech repeat "We will" at the start of several sentences?', 2, 'Repetition builds rhythm and makes the message memorable and strong.'),
        O('Write two sentences: one long and flowing, one short and sharp, about a storm.', 3, 'One long sentence with detail, one short punchy sentence.')] },
    narrator: { goal: 'I can tell if a narrator is limited, omniscient or unreliable.',
      think: [O('What can an omniscient narrator do that a limited one cannot?', 2, 'Know every character’s thoughts and feelings.'),
        O('What clues suggest a narrator is unreliable?', 2, 'They contradict themselves, other characters disagree, or they hide or twist facts.'),
        O('Retell a moment from a story from another character’s point of view. How does it change?', 3, 'A short retelling plus how the reader’s view changes.')] }
  } });
})();
