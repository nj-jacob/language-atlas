/* Grade 1 Language Atlas: the grade's chapter list. The content of each chapter is in chapters/<id>.js.
   Together the chapters cover all 63 Grade 1 expectations of the 2023 Ontario Language curriculum (strands A, B, C and D). */
Atlas.setup({
  grade: 1,
  curriculum: 'Expectation codes and wording were checked against the Ministry\'s 2023 Language curriculum, strands A, B, C and D, and the Language Foundations Continuum.',
  chapters: [
    { id: 'sounds', title: 'Sounds in Words', sub: 'hear, blend and split the sounds in a word', strand: 'B', codes: 'B2.1',
      desc: 'Find the first, last and middle sound. Blend sounds into a word, and split a word into its sounds.' },
    { id: 'letters', title: 'Letters and ABC Order', sub: 'big and small letters, and the alphabet', strand: 'B', codes: 'B2.2',
      desc: 'Match big and small letters, tell b from d, and put letters and words in ABC order.' },
    { id: 'phonics', title: 'Letters and Sounds', sub: 'the sound each letter makes', strand: 'B', codes: 'B2.3',
      desc: 'Short vowels, two letters that make one sound (sh, ch, th), and long vowels with a silent e or a vowel team.' },
    { id: 'words', title: 'Reading and Spelling Words', sub: 'sound it out, and spelling patterns', strand: 'B', codes: 'B2.4, B2.5',
      desc: 'Blend sounds to read a word, spell a word sound by sound, and learn where ck, ll, ss and ay go.' },
    { id: 'word-parts', title: 'Word Parts and Meanings', sub: 'endings, compound words and new words', strand: 'B', codes: 'B2.6, B2.7',
      desc: 'Add -s, -es, -ing and -ed. Join two words into one. Learn words that mean the same or the opposite.' },
    { id: 'fluency', title: 'Reading Smoothly', sub: 'words to know fast, and reading with expression', strand: 'B', codes: 'B2.8',
      desc: 'Know common words at a glance, let the end mark guide your voice, and read in smooth phrases.' },
    { id: 'sentences', title: 'Sentences', sub: 'kinds of sentences, capitals and end marks', strand: 'B', codes: 'B3.1, B3.3',
      desc: 'Telling, asking, command and strong feeling sentences. Join two ideas with and. Start with a capital, end with a mark.' },
    { id: 'grammar', title: 'Grammar', sub: 'naming, doing and describing words', strand: 'B', codes: 'B3.2',
      desc: 'Nouns, one and more than one, the word I, verbs for yesterday, today and tomorrow, describing words, and joining words.' },
    { id: 'talking', title: 'Listening and Speaking', sub: 'listen well, take turns, speak clearly', strand: 'B', codes: 'B1.1 to B1.5',
      desc: 'Show you are listening, take turns, use your face and voice, and choose clear words.' },
    { id: 'reading', title: 'Reading for Meaning', sub: 'facts, the main idea, predictions and kinds of texts', strand: 'C', codes: 'C1.1, C1.2, C1.6, C1.7, C2.1 to C2.7',
      desc: 'Find answers in the text, tell what it is mostly about, guess what comes next, and fix it when it does not make sense.' },
    { id: 'thinking', title: 'Thinking About Texts', sub: 'pictures, sound words and feelings', strand: 'C', codes: 'C1.3, C1.4, C1.5, C3.1 to C3.8',
      desc: 'Titles and pictures, rhyme and sound words, how characters feel, what happened first and last, and what you think.' },
    { id: 'planning', title: 'Planning Writing', sub: 'topic, purpose, ideas and order', strand: 'D', codes: 'D1.1 to D1.5',
      desc: 'Choose what to write about and who it is for, gather ideas, and put them in order.' },
    { id: 'writing', title: 'Writing and Sharing', sub: 'print, write, fix and share', strand: 'D', codes: 'D2.1 to D2.5, D3.1 to D3.3',
      desc: 'Print neat letters with spaces, write a few sentences, fix capitals and end marks, and read your writing aloud.' },
    { id: 'media', title: 'Media and Online Life', sub: 'staying safe online, and how media works', strand: 'A', codes: 'A2.1 to A2.7',
      desc: 'Ask a grown-up first, keep private things private, be kind online, and see what ads and posters want.' },
    { id: 'connections', title: 'Skills and Connections', sub: 'skills for learning, and stories of who we are', strand: 'A', codes: 'A1.1, A1.2, A3.1 to A3.3',
      desc: 'Name the skills you use when you learn, use reading and writing everywhere, and share stories of family and community.' }
  ]
});
