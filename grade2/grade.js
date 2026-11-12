/* Grade 2 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   A chapter listed here without a file shows as "Coming soon". */
Atlas.setup({
  grade: 2,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D, and the Language Foundations Continuum.',
  chapters: [
    { id: 'sounds', title: 'Sounds and Spelling', sub: 'blend sounds, split sounds, and spelling choices', strand: 'B', codes: 'B2.1, B2.2', spell: true,
      desc: 'Blend sounds to read and split them to spell. Soft c and g, long o, and the air sound.' },
    { id: 'word-parts', title: 'Word Parts', sub: 'prefixes and suffixes', strand: 'B', codes: 'B2.3, B2.4', spell: true,
      desc: 'Build words from parts. Use uni-, bi-, tri-, mis-, pre-, -er, -or, -ness and -y to work out what a word means.' },
    { id: 'meanings', title: 'Word Meanings', sub: 'same, opposite, stronger, and words with two meanings', strand: 'B', codes: 'B2.4',
      desc: 'Find words that mean the same or the opposite, pick the stronger word, and use the sentence to choose the right meaning.' },
    { id: 'fluency', title: 'Reading Smoothly', sub: 'marks, phrases and expression', strand: 'B', codes: 'B2.5',
      desc: 'Let punctuation guide your voice, read in phrases, reread new words, and read aloud with a grown-up.' },
    { id: 'sentences', title: 'Sentences', sub: 'four kinds of sentences, and joining two', strand: 'B', codes: 'B3.1, B3.2',
      desc: 'Telling, asking, command and strong feeling sentences. Join two sentences with and, but, or, so.' },
    { id: 'grammar', title: 'Grammar', sub: 'how words work in a sentence', strand: 'B', codes: 'B3.2',
      desc: 'Group nouns, idea nouns, pronouns, am, is, are, was and were, -er and -est, and words that tell how.' },
    { id: 'punctuation', title: 'Capitals and Punctuation', sub: 'names, lists, owners and speech', strand: 'B', codes: 'B3.3',
      desc: 'Capitals for names, places, days and months. Commas in lists, apostrophes to show who owns it, and speech marks.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'listen well, take turns, speak clearly', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Ask questions and say back what you heard, take turns and stay on topic, use your face and voice, and choose clear words.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'facts, main ideas, predictions and kinds of texts', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Find answers in the text, tell the main idea and the order of events, predict with a clue, and tell who is telling the story.' },
    { id: 'thinking', title: 'Thinking About Texts', sub: 'how texts are built, the writer\'s craft, and reading between the lines', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1 to C3.8',
      desc: 'Contents pages, charts, icons and journals. Similes and sounds that repeat. Feelings, comparisons and points of view.' },
    { id: 'planning', title: 'Planning Writing', sub: 'topic, purpose, audience, ideas and order', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Decide what you are writing about, who for and why, gather ideas from three sources, and put them in order.' },
    { id: 'writing', title: 'Writing and Publishing', sub: 'draft, revise, edit and share', strand: 'D', codes: 'D2.1 to D2.6, D3.1 to D3.3',
      desc: 'Write a true story, an opinion and how-to steps. Use describing words, add or cut sentences, fix mistakes, and share.' },
    { id: 'media', title: 'Media and Online Life', sub: 'staying safe online, and how media works', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Keep private things private, ask first, be kind online, check information, and see what ads want.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and voices from many communities', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Name the skills you use when you learn, use reading and writing in other subjects, and explore stories of identity and community.' }
  ]
});
