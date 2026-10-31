/* Grade 4 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 4,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D.',
  chapters: [
    { id: 'word-parts', title: 'Word Parts', sub: 'prefixes and suffixes', strand: 'B', codes: 'B2.1, B2.2',
      desc: 'Use dis-, mis- and pre-, and -able, -ness and -ment, to read, spell and work out new words.' },
    { id: 'spelling', title: 'Spelling Word Endings', sub: 'what happens when you add an ending', strand: 'B', codes: 'B2.1',
      desc: 'Drop the e, double the last letter, change y to i, and spell plurals with -s, -es and -ies.' },
    { id: 'meanings', title: 'Word Meanings', sub: 'clues, shades of meaning and subject words', strand: 'B', codes: 'B2.2',
      desc: 'Work out new words from clues, pick the exact word, and learn words from science and social studies.' },
    { id: 'fluency', title: 'Reading Smoothly', sub: 'pace, phrasing and expression', strand: 'B', codes: 'B2.3',
      desc: 'Set your pace for the text, read in phrases, and let the purpose guide your voice.' },
    { id: 'sentences', title: 'Sentences', sub: 'simple and compound sentences, clauses and phrases', strand: 'B', codes: 'B3.1',
      desc: 'Join ideas into compound sentences, add a dependent clause, and grow a sentence with a phrase.' },
    { id: 'grammar', title: 'Grammar', sub: 'how words work in a sentence', strand: 'B', codes: 'B3.2',
      desc: 'Who, which and that. Has walked and had walked. Commands and questions. My, her and their.' },
    { id: 'punctuation', title: 'Capitals and Punctuation', sub: 'proper adjectives, names and titles', strand: 'B', codes: 'B3.3',
      desc: 'Capitals for words like Canadian, commas around the name of the person you speak to, and quotation marks for short titles.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'discuss, listen, and speak clearly', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Ask questions that get more, build on what others say, retell in your own words, and choose words that paint a picture.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'main ideas, strategies and kinds of texts', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Main idea and details, conclusions, predictions you check, fix-up strategies, genres, and first, second and third person.' },
    { id: 'craft', title: 'How Texts Work', sub: 'features, pictures, style and devices', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1',
      desc: 'Bold type, captions and links. Diagrams and graphs. Voice and sentence style. Personification and talking animals.' },
    { id: 'thinking', title: 'Thinking About Texts', sub: 'inferences, plots, causes and points of view', strand: 'C', codes: 'C3.2 to C3.8',
      desc: 'Work out what is not said, follow two plots, explain cause and effect, and spot whose view is missing.' },
    { id: 'planning', title: 'Planning Writing', sub: 'purpose, audience, research and order', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose the right form, gather facts and note where they came from, sort them, and put them in order.' },
    { id: 'writing', title: 'Writing and Publishing', sub: 'draft, revise, edit and share', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Find your voice and tone, make your writing fair, revise for focus, edit for errors, and publish.' },
    { id: 'media', title: 'Media and Online Life', sub: 'your digital footprint, good sources and how media works', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Think before you post, protect your data, check sources, and see the techniques media uses to reach an audience.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Name the skills you use, set your next steps, use reading and writing in other subjects, and explore identity and belonging.' }
  ]
});
