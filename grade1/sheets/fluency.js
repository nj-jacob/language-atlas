/* Grade 1 Reading Smoothly: printable worksheets. Learn and Practise 1 to 3 are made from chapters/fluency.js; this file adds each
   idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B2.8.
   Think questions marked by a computer are checked in tests/verify/grade1-fluency.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('fluency', { code: 'FL', ideas: {
    sight: { goal: 'I can read common words at a glance.', think: [
      TF('Kiri wrote this word for <b>said</b>. Is it spelled right?', W.tile('sed'), false, 'sed is how we spell said.', 'It sounds like sed, but we spell it s-a-i-d. Learn it by heart.',
        { k: 'g1-sight-tf', w: 'said' }),
      { q: 'Why is it good to know <b>the</b>, <b>was</b> and <b>said</b> without sounding them out?', lines: 2, key: 'They are in almost every book, so knowing them fast makes reading smooth.' },
      { q: 'Write a sentence with <b>they</b> and <b>were</b>.', lines: 2, key: 'For example: They were at the park.' }] },
    marks: { goal: 'I can let the end mark guide my voice.', think: [
      TF('"Where is my hat?" Ali reads it in a flat voice that stops. Is that the voice for its mark?', W.sent('Where is my hat?'), false, 'A ? means stop.', 'A ? means your voice goes up at the end.',
        { k: 'g1-mark-tf', s: 'Where is my hat?', said: '.' }),
      { q: 'Read "We won!" two ways: flat, then strong. Which is better? Why?', lines: 2, key: 'Strong, because the ! shows a strong, excited feeling.' },
      { q: 'Write one sentence that ends with <b>?</b> and one that ends with <b>!</b>.', lines: 2, key: 'Any asking sentence with ? and any strong-feeling sentence with !' }] },
    phrases: { goal: 'I can read in smooth phrases.', think: [
      TF('Does this read in smooth phrases? ( / is a short pause.)', W.sent('The big moose / swims in the lake.'), true, 'The words that go together stay together.', 'The pause breaks up words that go together.',
        { k: 'g1-phrase-tf', shown: 'The big moose / swims in the lake.' }),
      { q: 'Why does reading word by word sound like a robot?', lines: 2, key: 'Each word is cut off, so it does not sound like talking and is hard to understand.' },
      { q: 'Put a / where you would pause: <b>After school we go to the park.</b>', lines: 1, key: 'After school / we go to the park.' }] }
  } });
})();
