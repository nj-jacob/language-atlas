/* Grade 6 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 6,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D (Grade 6 column).',
  chapters: [
    { id: 'word-study', title: 'Roots and Spelling', sub: 'Latin and Greek roots, prefixes, and spelling rules for suffixes', strand: 'B', codes: 'B2.1', spell: true,
      desc: 'Use roots like port and graph to read long words. Spell words when you add -ing, -ed, -ness and -able.' },
    { id: 'vocabulary', title: 'Word Meanings', sub: 'clues in the sentence, shades of meaning, and subject words', strand: 'B', codes: 'B2.2',
      desc: 'Work out new words from clues and word parts. Choose the word with the right shade of meaning.' },
    { id: 'fluency', title: 'Reading Fluently', sub: 'phrasing, pace and expression', strand: 'B', codes: 'B2.3',
      desc: 'Read in meaningful phrases, change your pace for the purpose, and read aloud with expression.' },
    { id: 'sentences', title: 'Complex Sentences', sub: 'clauses, and joining ideas', strand: 'B', codes: 'B3.1',
      desc: 'Main and dependent clauses. Relative clauses with who, which, that and whose. Join ideas to show how they connect.' },
    { id: 'grammar', title: 'Grammar', sub: 'gerunds, and active and passive voice', strand: 'B', codes: 'B3.2',
      desc: 'Parts of speech and the jobs they do, -ing words used as nouns, and switching between active and passive voice.' },
    { id: 'punctuation', title: 'Capitals and Punctuation', sub: 'colons, commas after transitions, and scripts', strand: 'B', codes: 'B3.3',
      desc: 'Colons in formal letters, memos and scripts. Commas after words like However. Capitals for names and titles.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'discussions, purpose, audience and precise words', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Respond to others in a discussion, listen with a plan, choose formal or informal speech, and speak with precise words.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'evidence, summaries, predictions and point of view', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Find evidence, summarize, predict and check, monitor your understanding, and tell first, second and third person apart.' },
    { id: 'craft', title: 'Text Structure and Style', sub: 'text patterns, features, visuals and the writer\'s craft', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1',
      desc: 'Problem and solution, cause and effect, compare and contrast. Subheadings and visuals. Voice, word choice, hyperbole and idioms.' },
    { id: 'critical', title: 'Critical Reading', sub: 'inferences, quality of information, perspective and bias', strand: 'C', codes: 'C3.2 to C3.8',
      desc: 'Read between the lines, judge if information is good enough for a purpose, and spot perspective and bias.' },
    { id: 'planning', title: 'Planning and Research', sub: 'purpose, audience, sources and organizing', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose a form for your purpose and audience, check sources and credit them, summarize notes, and sort ideas.' },
    { id: 'writing', title: 'Drafting, Revising and Publishing', sub: 'voice, tone, revising, editing and sharing', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Write drafts, find your voice and tone, add and cut sentences for focus, edit carefully, and publish.' },
    { id: 'media', title: 'Media and Online Life', sub: 'digital citizenship, privacy, research and media messages', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Protect your personal data, judge online information, and see how media form, audience and purpose fit together.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Explain how the seven transferable skills help you, use language in other subjects, and explore identity and Indigenous perspectives.' }
  ]
});
