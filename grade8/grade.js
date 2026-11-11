/* Grade 8 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 8,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D, and the Language Conventions Continuum (Appendix B).',
  chapters: [
    { id: 'roots', title: 'Roots and Word Parts', sub: 'Greek and Latin roots, suffixes and spelling changes', strand: 'B', codes: 'B2.1', spell: true,
      desc: 'Use roots like port, spect and graph to read long words. See how suffixes change a word' + '’' + 's job and its spelling.' },
    { id: 'vocabulary', title: 'Words in Context', sub: 'clues in the sentence, academic words and shades of meaning', strand: 'B', codes: 'B2.2',
      desc: 'Work out new words from clues and word parts. Use the words of other subjects, and choose words for their feeling.' },
    { id: 'fluency', title: 'Reading Fluently', sub: 'phrasing, pacing and expression', strand: 'B', codes: 'B2.3',
      desc: 'Let punctuation set your pauses, stress the word that matters, and match your voice to the purpose.' },
    { id: 'sentences', title: 'Sentence Structure', sub: 'clauses, sentence types, fragments and run-ons', strand: 'B', codes: 'B3.1',
      desc: 'Independent and dependent clauses. Simple, compound, complex and compound-complex sentences. Fix fragments and run-ons.' },
    { id: 'grammar', title: 'Grammar', sub: 'active and passive voice, verbals and phrases', strand: 'B', codes: 'B3.2',
      desc: 'Active and passive voice, gerunds and participles, objects, predicate nouns and adjectives, and phrases.' },
    { id: 'punctuation', title: 'Punctuation', sub: 'semicolons, colons, dashes and quotations', strand: 'B', codes: 'B3.3',
      desc: 'Join ideas with a semicolon, introduce with a colon, set off extra details, and quote a text correctly.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'paraphrasing, open questions and speaking for an audience', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Paraphrase and ask open questions, find evidence as you listen, and adapt your speaking to the audience.' },
    { id: 'reading', title: 'Reading Strategies', sub: 'predict, monitor, summarize and synthesize', strand: 'C', codes: 'C1.1, C2.1 to C2.7',
      desc: 'Read complex texts closely, check predictions, fix confusion, summarize, and combine ideas from two texts.' },
    { id: 'forms', title: 'Forms, Features and Style', sub: 'text patterns, visuals, style and narrators', strand: 'C', codes: 'C1.2 to C1.7',
      desc: 'Genres and text patterns, glossaries and graphs, voice and sentence style, and limited, omniscient and unreliable narrators.' },
    { id: 'thinking', title: 'Critical Reading', sub: 'irony, satire, inference, bias and perspective', strand: 'C', codes: 'C3.1 to C3.8',
      desc: 'Spot irony, satire and allusion. Infer with evidence, draw conclusions, analyze culture in texts, and evaluate bias.' },
    { id: 'planning', title: 'Planning and Research', sub: 'purpose, audience, reliable sources and organizing', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose a form for your purpose and audience, check sources for bias and accuracy, cite them, and organize your ideas.' },
    { id: 'writing', title: 'Drafting, Revising and Publishing', sub: 'voice, revision, editing and sharing', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Draft with a clear voice, revise for clarity and flow, edit for accuracy, and publish and reflect.' },
    { id: 'media', title: 'Media and Digital Literacy', sub: 'privacy, misinformation and how media persuades', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Protect your data, spot misinformation and disinformation, and analyze how media is built for its audience.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'transferable skills, other subjects and diverse voices', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Use the seven transferable skills, apply language in other subjects, and explore identity and First Nations, Métis and Inuit perspectives.' }
  ]
});
