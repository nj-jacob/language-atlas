/* Grade 1 Grammar: printable worksheets. Learn and Practise 1 to 3 are made from chapters/grammar.js; this file adds each idea's
   "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B3.2.
   Think questions marked by a computer are checked in tests/verify/grade1-grammar.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('grammar', { code: 'GR', ideas: {
    nouns: { goal: 'I can find naming words.', think: [
      TF('Is <b>beaver</b> a naming word?', W.pic('moose'), true, 'It names an animal.', 'It is a different kind of word.',
        { k: 'g1-word-kind-tf', w: 'beaver', kind: 'naming' }),
      { q: 'Look around the room. Write three naming words for things you see.', lines: 1, key: 'Any three things, such as chair, book, window.' },
      { q: 'Is <b>park</b> a naming word? How do you know?', lines: 2, key: 'Yes. It names a place.' }] },
    'one-more': { goal: 'I can tell one from more than one.', think: [
      { q: 'Is <b>boxes</b> one or more than one?', fig: W.pic('box'), type: 'mc', options: ['one', 'more than one'], answer: 1, meta: { k: 'g1-one-more', w: 'boxes' } },
      { q: 'How does the end of a word show more than one?', lines: 2, key: 'It often ends in -s or -es (cats, boxes).' },
      { q: 'Draw one bee. Then draw three bees. Write the word under each.', lines: 1, key: 'bee; bees' }] },
    'capital-i': { goal: 'I can write I as a capital.', think: [
      TF('Is the word I written the right way?', W.sent('Mom and i went skating.'), false, 'I is a capital.', 'I should be a capital.',
        { k: 'g1-i-tf', shown: 'Mom and i went skating.' }),
      { q: 'Write a sentence about yourself that uses <b>I</b> two times.', lines: 2, key: 'For example: I like snow and I like hot cocoa. (Both I are capitals.)' },
      { q: 'Find the mistake: <b>Can i come too?</b>', lines: 1, key: 'i should be I: Can I come too?' }] },
    verbs: { goal: 'I can find doing words.', think: [
      TF('Is <b>apple</b> a doing word?', W.pic('apple'), false, 'It tells what someone does.', 'It names a thing. It is a naming word.',
        { k: 'g1-word-kind-tf', w: 'apple', kind: 'doing' }),
      { q: 'Act out a doing word. Can your grown-up guess it? Write it.', lines: 1, key: 'Any action, such as jump, swim, clap.' },
      { q: 'Write a sentence with the doing word <b>climb</b>.', lines: 2, key: 'For example: We climb the hill.' }] },
    when: { goal: 'I can use doing words for yesterday, today and tomorrow.', think: [
      TF('Does the doing word fit the time?', W.sent('Yesterday, Ana jumps in the pool.'), false, 'It fits.', 'Yesterday is in the past, so it should be jumped.',
        { k: 'g1-tense-tf', s: 'Yesterday, Ana jumps in the pool.', when: 'Yesterday' }),
      { q: 'What little word helps you talk about tomorrow?', lines: 1, key: 'will (Tomorrow I will skate.)' },
      { q: 'Finish: Yesterday I ___. Tomorrow I ___.', lines: 2, key: 'A past form, then will + a doing word: Yesterday I played. Tomorrow I will read.' }] },
    adjectives: { goal: 'I can find describing words.', think: [
      TF('Is <b>fluffy</b> a describing word?', W.pic('cat'), true, 'It tells what something is like.', 'It is a different kind of word.',
        { k: 'g1-word-kind-tf', w: 'fluffy', kind: 'describing' }),
      { q: 'Describe a snowball with two describing words.', fig: W.pic('snow'), lines: 1, key: 'cold, white, round, wet, soft' },
      { q: 'Which is more fun to read: <b>a dog</b> or <b>a big, muddy dog</b>? Why?', lines: 2, key: 'A big, muddy dog: the describing words help you picture it.' }] },
    adverbs: { goal: 'I can find words that tell how.', think: [
      TF('In this sentence, <b>slowly</b> tells how. True or false?', W.sent('The turtle walked slowly.'), true, 'It tells how the turtle walked.', 'It does not tell how.',
        { k: 'g1-adv-tf', s: 'The turtle walked slowly.', w: 'slowly' }),
      { q: 'Walk quickly, then walk slowly. What changed?', lines: 1, key: 'How you walked: fast, then slow.' },
      { q: 'Finish: The baby is asleep, so we talk ___.', lines: 1, key: 'quietly, softly' }] },
    joining: { goal: 'I can use joining words.', think: [
      TF('"I was hungry, <b>but</b> I ate a snack." Is but the best joining word?', W.sent('I was hungry, ___ I ate a snack.'), false, 'But fits.', 'Eating is the result of being hungry, so the word is so.',
        { k: 'g1-conj-tf', s: 'I was hungry, ___ I ate a snack.', w: 'but' }),
      { q: 'What is the job of <b>or</b> in "Do you want milk or juice?"', lines: 1, key: 'It gives a choice.' },
      { q: 'Write a sentence with <b>because</b>.', lines: 2, key: 'For example: I wore boots because it was raining.' }] }
  } });
})();
