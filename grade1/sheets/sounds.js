/* Grade 1 Sounds in Words: printable worksheets. Learn and Practise 1 to 3 are made from chapters/sounds.js; this file adds each
   idea's "I can" goal and its Think questions (reasoning about sounds). Ontario 2023 Language, Grade 1, B2.1.
   A sound is written /s/; the grown-up says it. Think questions marked by a computer are checked in tests/verify/grade1-sounds.js;
   open ones ("lines") go to the grown-up, with a good answer on the key. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  /* a claim to judge: true or false, then why (whyTrue is the reason it is true, whyFalse the reason it is not) */
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('sounds', { code: 'SO', ideas: {
    first: { goal: 'I can say the first sound in a word.', think: [
      TF('Mia says <b>fish</b> starts with /sh/. True or false?', W.pic('fish'), false, 'Fish starts with /sh/.', 'Fish starts with /f/. The /sh/ is at the end.',
        { k: 'g1-sound-tf', word: 'fish', where: 'first', s: 'sh' }),
      { q: 'Say two words that start like <b>moon</b>. Write or draw them.', fig: W.pic('moon'), lines: 2, key: 'map, mop, milk, mitt: any word that starts with /m/' },
      { q: 'Why does saying a word slowly help you find its first sound?', lines: 2, key: 'Slow speech stretches the sounds apart, so the first one is easy to hear.' }] },
    last: { goal: 'I can say the last sound in a word.', think: [
      TF('Ben says the last sound in <b>duck</b> is /k/. True or false?', W.pic('duck'), true, 'Duck ends with /k/. The letters ck make one sound.', 'Duck ends with another sound.',
        { k: 'g1-sound-tf', word: 'duck', where: 'last', s: 'k' }),
      { q: 'Say <b>bus</b>, then <b>bun</b>. Which sound is different: first, middle or last?', fig: W.pic('bus'), lines: 1, key: 'The last sound: /s/ in bus, /n/ in bun.' },
      { q: 'Find two things at home that end with /t/, like <b>hat</b>. Write or draw them.', fig: W.pic('hat'), lines: 2, key: 'pot, mat, coat, plate: any word that ends with /t/' }] },
    middle: { goal: 'I can say the middle sound in a word.', think: [
      TF('Ava says the middle sound in <b>pig</b> is /i/. True or false?', W.pic('pig'), true, 'Pig is /p/ /i/ /g/. The /i/ is in the middle.', 'The middle sound of pig is another sound.',
        { k: 'g1-sound-tf', word: 'pig', where: 'middle', s: 'i' }),
      { q: 'Say <b>hat</b>, then <b>hot</b>. Which sound changed?', lines: 1, key: 'The middle sound: /a/ became /o/.' },
      { q: 'Say a word with /u/ in the middle, like <b>sun</b>.', fig: W.pic('sun'), lines: 1, key: 'cup, bus, rug, nut, hug, mud' }] },
    blend: { goal: 'I can blend sounds into a word.', think: [
      TF('Kai blends these sounds and says <b>chip</b>. True or false?', '/sh/ /i/ /p/', false, 'The sounds make chip.', 'The sounds make ship. /sh/ is not /ch/.',
        { k: 'g1-blend-tf', said: 'chip' }),
      { q: 'Make up a word with three sounds. Say its sounds one at a time. Can your grown-up blend them?', lines: 1, key: 'Any three-sound word said sound by sound, such as /m/ /a/ /p/ for map.' },
      { q: 'Why do we say the sounds faster and faster at the end?', lines: 2, key: 'Saying the sounds close together joins them into one word we know.' }] },
    count: { goal: 'I can count the sounds in a word.', think: [
      TF('Leo says <b>ship</b> has 4 sounds, because it has 4 letters. True or false?', W.pic('ship'), false, 'Each letter makes one sound.', 'The letters sh make one sound. /sh/ /i/ /p/ is 3 sounds.',
        { k: 'g1-count-tf', word: 'ship', n: 4 }),
      { q: 'Which has more sounds, <b>sun</b> or <b>stamp</b>? How do you know?', lines: 2, key: 'stamp: 5 sounds (/s/ /t/ /a/ /m/ /p/). sun has 3. Tap one finger for each sound.' },
      { q: 'Draw one box for each sound in <b>frog</b>. Put a dot in each box as you say it.', lines: 1, key: '4 boxes: /f/ /r/ /o/ /g/' }] },
    change: { goal: 'I can swap one sound to make a new word.', think: [
      TF('Zoe changes /k/ in <b>cat</b> to /h/. She says the new word is <b>hat</b>. True or false?', '/h/ /a/ /t/', true, '/h/ /a/ /t/ makes hat.', 'These sounds make another word.',
        { k: 'g1-blend-tf', said: 'hat' }),
      { q: 'Change the first sound of <b>net</b>. Make two new words.', fig: W.pic('net'), lines: 2, key: 'jet, wet, pet, set, bet, get, let, met' },
      { q: 'Change the middle sound of <b>pin</b>. What words can you make?', lines: 2, key: 'pan, pen, pun' }] }
  } });
})();
