/* Grade 3 Syllables and Spelling: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made
   from chapters/sounds.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, B2.1 phonics (blending and segmenting long words), B2.2 spelling patterns by position. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  S.register('sounds', { code: 'SY', ideas: {
    beats: { goal: 'I can count the beats in a long word.',
      think: [{ q: 'Write a word with 3 beats. Draw a line between the beats.', lines: 1, key: 'For example: but / ter / fly.' },
        { q: 'Clap your name. How many beats does it have? Write it in beats.', lines: 1, key: 'For example: A / ma / ra has 3 beats.' },
        { q: 'How can your chin help you count beats?', lines: 2, key: 'Put a hand under your chin. Your chin drops once for each beat (each vowel sound).' }] },
    split: { goal: 'I can find where a word splits.',
      think: [{ q: 'Split these words into beats.', fig: W.sent('rabbit · tiger · napkin'), lines: 1, key: 'rab / bit, ti / ger, nap / kin' },
        { q: 'Why do we split <b>rabbit</b> between the two b’s?', lines: 2, key: 'Two consonants sit between the vowels, so we split between them. Each beat has one vowel sound.' },
        { q: 'Write a word that splits like <b>nap / kin</b>.', lines: 1, key: 'For example: bas / ket, pic / nic, mit / ten.' }] },
    'long-words': { goal: 'I can read a long word one part at a time.',
      think: [{ q: 'Read this word in parts. Write the parts.', fig: W.sent('snowmobile'), lines: 1, key: 'snow / mo / bile' },
        { q: 'What can you do when a long word looks too hard to read?', lines: 2, key: 'Cover part of it, read one beat at a time, then blend the beats together. Check that it makes sense.' },
        { q: 'Write a long word from science or social studies. Show its beats.', lines: 1, key: 'For example: hab / i / tat, com / mu / ni / ty.' }] },
    'ai-ay': { goal: 'I can choose ai or ay to spell the long a sound.',
      think: [{ q: 'Write two words with <b>ai</b> and two with <b>ay</b>.', lines: 2, key: 'For example: rain, paint; play, today.' },
        { q: 'Where in a word does <b>ay</b> usually go? Where does <b>ai</b> go?', lines: 2, key: 'ay usually goes at the end of a word. ai goes in the middle.' },
        { q: 'Mei wrote <b>plai</b>. Fix it and say why.', lines: 2, key: 'play. The long a sound is at the end, so it is spelled ay.' }] },
    'oa-ow': { goal: 'I can choose oa or ow to spell the long o sound.',
      think: [{ q: 'Write two words with <b>oa</b> and two with <b>ow</b>.', lines: 2, key: 'For example: boat, coat; snow, grow.' },
        { q: 'Where does <b>ow</b> usually go in a word? Where does <b>oa</b> go?', lines: 2, key: 'ow usually goes at the end. oa goes in the middle.' },
        { q: 'Omar wrote <b>snoa</b>. Fix it and say why.', lines: 2, key: 'snow. The long o sound is at the end, so it is spelled ow.' }] },
    tricky: { goal: 'I can spell words that do not follow the rules.',
      think: [{ q: 'Pick a tricky word. Which part do you just have to know?', lines: 2, key: 'For example: said. The ai says /e/, not long a.' },
        { q: 'Write a sentence with two tricky words in it.', lines: 2, key: 'For example: They said there was snow.' },
        { q: 'How can you practise a tricky word so you remember it?', lines: 2, key: 'Say it, spell it aloud, write it, cover it, write it again, and check.' }] }
  } });
})();
