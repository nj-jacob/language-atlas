/* Grade 7 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 7,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D.',
  chapters: [
    { id: 'word-parts', title: 'Word Parts', sub: 'roots, prefixes, suffixes and spelling', strand: 'B', codes: 'B2.1, B2.2',
      desc: 'Use Greek and Latin roots to read long words, build words from parts, and spell them when a suffix is added.' },
    { id: 'meanings', title: 'Word Meanings', sub: 'context clues, shades of meaning and subject words', strand: 'B', codes: 'B2.2',
      desc: 'Work out a new word from the sentence, choose the word with the right feeling, and use words from other subjects.' },
    { id: 'fluency', title: 'Reading Fluently', sub: 'phrasing, pace and expression', strand: 'B', codes: 'B2.3',
      desc: 'Read in meaningful phrases, set your pace to the purpose, and use your voice to show meaning.' },
    { id: 'sentences', title: 'Sentences', sub: 'clauses, complex sentences and sentence fixes', strand: 'B', codes: 'B3.1',
      desc: 'Independent and dependent clauses, the four sentence types, joining ideas to show how they relate, and fixing fragments and run-ons.' },
    { id: 'grammar', title: 'Grammar', sub: 'how words work in a sentence', strand: 'B', codes: 'B3.2',
      desc: 'Indirect objects, predicate nouns and adjectives, participles, and adverbial phrases.' },
    { id: 'punctuation', title: 'Punctuation', sub: 'colons, semicolons, dashes and ellipses', strand: 'B', codes: 'B3.3',
      desc: 'A colon before a quotation, a semicolon between two sentences, commas around however, and dashes and ellipses for pauses.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'discussions, audiences and active voice', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Ask relevant questions, build on what others say, suit your talk to the audience, read body language, and choose active or passive voice.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'cohesive ties, summaries, conclusions and strategies', strand: 'C', codes: 'C1.1, C2.1 to C2.7',
      desc: 'Follow the words that tie a text together, summarize the main idea and details, draw conclusions, predict, and fix confusion.' },
    { id: 'how-texts', title: 'How Texts Work', sub: 'forms, patterns, features, visuals, style and narrators', strand: 'C', codes: 'C1.2 to C1.7',
      desc: 'Genres and text patterns, features like a bibliography, how images and design carry meaning, style, and first, second or third person.' },
    { id: 'thinking', title: 'Thinking Critically', sub: 'literary devices, inferences, perspectives and bias', strand: 'C', codes: 'C3.1 to C3.8',
      desc: 'Foreshadowing, symbolism and allegory. Inferences from small clues and whole texts. Synthesizing sources, and spotting bias.' },
    { id: 'planning', title: 'Planning and Research', sub: 'purpose, audience, sources and organizing', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose a form for your purpose and audience, generate ideas, check sources and record them, and organize your notes.' },
    { id: 'writing', title: 'Writing and Publishing', sub: 'draft, revise, edit and present', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Build a strong paragraph, find your voice, check your own bias, revise and edit, and design a final copy.' },
    { id: 'media', title: 'Media and Online Life', sub: 'digital identity, security, misinformation and media techniques', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Protect your accounts, think before you post, tell misinformation from disinformation, and see how media works on its audience.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Use your language skills in every subject, plan your own growth, and explore identity and First Nations, Métis and Inuit themes.' }
  ]
});
