/* Grade 5 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 5,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D.',
  chapters: [
    { id: 'word-parts', title: 'Word Parts and Spelling', sub: 'prefixes, suffixes and roots', strand: 'B', codes: 'B2.1, B2.2', spell: true,
      desc: 'Use mis-, pre-, dis- and non-, the suffixes -able, -ible, -tion and -ous, and Greek and Latin roots to read, spell and understand long words.' },
    { id: 'vocabulary', title: 'Word Meanings', sub: 'clues in the text, shades of meaning, subject words', strand: 'B', codes: 'B2.2',
      desc: 'Work out new words from clues in the sentence, choose the word with the right shade of meaning, and learn the words of other subjects.' },
    { id: 'fluency', title: 'Reading Fluently', sub: 'pace, phrasing and expression', strand: 'B', codes: 'B2.3',
      desc: 'Choose a reading pace that fits the text, read in phrases, and change your voice to fit the purpose.' },
    { id: 'sentences', title: 'Sentences', sub: 'compound-complex sentences, fragments and run-ons', strand: 'B', codes: 'B3.1',
      desc: 'Build simple, compound, complex and compound-complex sentences. Fix fragments and run-on sentences.' },
    { id: 'grammar', title: 'Grammar', sub: 'direct objects, pronouns, adjectives and conjunctions', strand: 'B', codes: 'B3.2',
      desc: 'Direct objects, reflexive and intensive pronouns (myself, themselves), proper adjectives, and pairs like either... or.' },
    { id: 'punctuation', title: 'Capitals and Punctuation', sub: 'commas for extra information, and colons', strand: 'B', codes: 'B3.3',
      desc: 'Commas around appositives and -ing phrases, a colon before a list, and capitals for proper adjectives.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'group talk, paraphrasing and clear speech', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Show interest, ask a speaker to say more, build on others\' ideas, paraphrase, and choose vivid words and sentence types.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'forms, narrators, strategies and summaries', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Find what the text says, name its form, tell first, second or third person, predict, monitor, summarize and conclude.' },
    { id: 'features', title: 'How Texts Work', sub: 'patterns, features, visuals and style', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1',
      desc: 'Cause and effect in persuasive texts, a preface and a glossary, how images help, voice and word choice, imagery and humour.' },
    { id: 'thinking', title: 'Thinking Critically', sub: 'inferences, analysis, perspectives and bias', strand: 'C', codes: 'C3.2 to C3.8',
      desc: 'Read between the lines, follow two plots, spot bias and missing voices, and find the message about inclusion and accessibility.' },
    { id: 'planning', title: 'Planning Writing', sub: 'purpose, form, research and order', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose a form for your purpose and audience, gather ideas, check that sources are reliable, credit them, and sort your notes.' },
    { id: 'writing', title: 'Writing and Publishing', sub: 'draft, voice, revise, edit and publish', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Draft narrative, persuasive and information texts, find your voice and tone, revise for focus, edit, and publish.' },
    { id: 'media', title: 'Media and Online Life', sub: 'privacy, credible information and how media persuades', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Protect your personal data, judge whether information is credible, and see how form, audience and purpose shape media.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Explain how the transferable skills help you, plan next steps, use language in other subjects, and explore identity and First Nations, Métis and Inuit themes.' }
  ]
});
