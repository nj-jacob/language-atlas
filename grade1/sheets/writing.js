/* Grade 1 Writing and Sharing: printable worksheets. Learn and Practise 1 to 3 are made from chapters/writing.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, D2.2 to D2.5. Drafting (D2.1), printing,
   publishing and presenting (D3.1 to D3.3) are the chapter's activities, printed as Activity sheets with the grown-up's rubric.
   Think questions marked by a computer are checked in tests/verify/grade1-writing.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('writing', { code: 'WT', ideas: {
    spaces: { goal: 'I can leave a space between words.', think: [
      Q.tf('Is this sentence easy to read?', false, 'It has spaces between words.', 'It needs a finger space between each word: I can run fast.',
        { fig: W.sent('Icanrunfast.'), meta: { k: 'g1-space-tf', shown: 'Icanrunfast.' } }),
      { q: 'Copy this with finger spaces: <b>We went to the park.</b>', lines: 1, key: 'We went to the park. (a space between each word)' },
      { q: 'Why do readers need spaces between words?', lines: 2, key: 'So they can see where one word ends and the next begins.' }] },
    voice: { goal: 'I can say what I think and feel when I write.', think: [
      Q.tf('Does this sentence show what the writer thinks or feels?', true, 'Love tells how the writer feels.', 'It only tells a fact.',
        { fig: W.sent('I love my new kite.'), meta: { k: 'g1-voice-tf', s: 'I love my new kite.' } }),
      { q: 'Add a feeling: <b>We went to the pool.</b>', lines: 2, key: 'For example: We went to the pool. I felt happy when I jumped in.' },
      { q: 'Write what you think about rainy days. Start with "I think".', fig: W.pic('rain'), lines: 2, key: 'Any opinion with I think, for example: I think rainy days are cozy.' }] },
    'about-me': { goal: 'I can write about me, using I and my.', think: [
      Q.tf('Is this sentence written about me (using I or my)?', false, 'It uses I or my.', 'It uses she and her. About me: I rode my bike.',
        { fig: W.sent('She rode her bike.'), meta: { k: 'g1-pov-me-tf', s: 'She rode her bike.' } }),
      { q: 'Change it to be about you: <b>He lost his mitten.</b>', lines: 1, key: 'I lost my mitten.' },
      { q: 'Write two sentences about something you did today. Use I.', lines: 3, key: 'Two sentences with I (or my), each with a capital and an end mark.' }] },
    check: { goal: 'I can check my writing and fix it.', think: [
      { q: 'Is this sentence written the right way?', fig: W.sent('the sun is hot.'), type: 'tf', answer: false,
        why: { options: ['It has a capital, an end mark and every word spelled right.', 'It needs a capital letter at the start.'], answer: 1 },
        meta: { k: 'g1-edit-tf', shown: 'the sun is hot.' } },
      { q: 'Fix all the mistakes: <b>my dog is big</b>', lines: 1, key: 'My dog is big.' },
      { q: 'What three things do you check in every sentence?', lines: 2, key: 'A capital at the start, a mark at the end, and words spelled right.' }] }
  } });
})();
