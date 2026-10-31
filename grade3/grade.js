/* Grade 3 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 3,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D.',
  chapters: [
    { id: 'sounds', title: 'Syllables and Spelling', sub: 'beats in long words, vowel teams and tricky words', strand: 'B', codes: 'B2.1, B2.2',
      desc: 'Split long words into beats to read them. Spell ai, ay, oa and ow in the right place.' },
    { id: 'word-parts', title: 'Word Parts', sub: 'prefixes and suffixes', strand: 'B', codes: 'B2.3, B2.4',
      desc: 'Build words from parts. Use un-, re-, -ful and -less to work out what a word means.' },
    { id: 'meanings', title: 'Word Meanings', sub: 'same, opposite and clues in the sentence', strand: 'B', codes: 'B2.4',
      desc: 'Find words that mean the same or the opposite, and use the sentence to work out a new word.' },
    { id: 'fluency', title: 'Reading Smoothly', sub: 'reading in phrases, with expression', strand: 'B', codes: 'B2.5',
      desc: 'Let punctuation guide your voice, read in phrases, and read aloud with a grown-up.' },
    { id: 'sentences', title: 'Sentences', sub: 'kinds of sentences, and joining ideas', strand: 'B', codes: 'B3.1',
      desc: 'Telling, asking, strong feeling and command sentences. Join ideas with and, but, so, because and when.' },
    { id: 'grammar', title: 'Grammar', sub: 'how words work in a sentence', strand: 'B', codes: 'B3.2',
      desc: 'Possessive nouns, linking verbs, -ing verbs, question words, place words and interjections.' },
    { id: 'punctuation', title: 'Capitals and Punctuation', sub: 'speech marks, apostrophes and titles', strand: 'B', codes: 'B3.3',
      desc: 'Quotation marks and commas for speech, apostrophes in contractions, and capitals in titles.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'listen well, speak clearly', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Ask questions to check, pick a voice for the audience, use your face and hands, and choose clear words.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'facts, main ideas, predictions and kinds of texts', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Find answers in the text, tell the main idea, predict with a clue, fix it when it does not make sense, and tell who is telling the story.' },
    { id: 'thinking', title: 'Thinking About Texts', sub: 'how texts are built, the writer\'s craft, and reading between the lines', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1 to C3.8',
      desc: 'Headings, pictures and cause and effect. Metaphors and sound patterns. Feelings, comparisons and points of view.' },
    { id: 'planning', title: 'Planning Writing', sub: 'purpose, audience, ideas and order', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Decide who you are writing for and why, gather ideas from three sources, and put them in order.' },
    { id: 'writing', title: 'Writing and Publishing', sub: 'draft, revise, edit and share', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Write drafts, choose strong words, spot first or third person, fix mistakes, and share your writing.' },
    { id: 'media', title: 'Media and Online Life', sub: 'staying safe online, and how media works', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Keep private things private, be kind online, check information, and see how ads try to persuade.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Name the skills you use when you learn, use reading and writing in other subjects, and explore stories of identity and community.' }
  ]
});
