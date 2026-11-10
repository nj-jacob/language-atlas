/* Grade 6 Roots and Spelling: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/word-study.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B2.1. Every word list is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('word-study', { code: 'WS', ideas: {
    root: { goal: 'I can use a root to work out what a word means.', think: [
      O('<b>port</b> means carry. Explain what each word means: transport, portable, export.', null, 3, 'transport: carry across; portable: able to be carried; export: carry out of a country.'),
      O('Write three words with the root <b>spect</b> (look).', null, 2, 'inspect, spectator, respect, spectacles'),
      O('How does knowing a root help you read a long word you have never seen?', null, 3, 'You find the root and its meaning, then add the meaning of the prefix and suffix.')] },
    latin: { goal: 'I can use Latin roots to read and spell words.', think: [
      O('<b>dict</b> means say. What might a <b>dictator</b> do? Why is that a fitting name?', null, 3, 'A dictator tells everyone what to do; dict means say, so a dictator says what must happen.'),
      O('Split into parts and give the meaning.', 'interruption', 2, 'inter (between) + rupt (break) + ion: a break between, a stop in the middle.'),
      O('Make a new word with <b>struct</b> (build). Use it in a sentence.', null, 2, 'construction: The construction of the arena took two years.')] },
    greek: { goal: 'I can use Greek roots to read and spell words.', think: [
      O('<b>tele</b> means far and <b>scope</b> means look. Make up a word for a tool that lets you hear far away.', null, 2, 'telephone (phon = sound).'),
      O('Split into parts and give the meaning.', 'biography', 2, 'bio (life) + graph (write): writing about someone\'s life.'),
      O('Why do so many science words come from Greek roots?', null, 3, 'Early scientists wrote in Greek and Latin, so new words were built from those parts.')] },
    'prefix-meanings': { goal: 'I can use a prefix to change the meaning of a word.', think: [
      O('Add a prefix to make each word mean the opposite: agree, legal, possible.', null, 2, 'disagree, illegal, impossible'),
      O('What does <b>pre</b> add to these words: preview, preheat, prepay?', null, 2, 'It adds "before": view before, heat before, pay before.'),
      O('Write a sentence with a word that starts with <b>mis</b>. Explain what mis adds.', null, 3, 'I misread the map. Mis means wrongly, so I read it wrongly.')] },
    'real-prefix': { goal: 'I can tell a real prefix from letters that only look like one.', think: [
      O('Is <b>re</b> a prefix in <b>reason</b>? How do you know?', null, 3, 'No. Take away re and "ason" is not a word.'),
      O('Is <b>un</b> a prefix in <b>uncle</b> and in <b>unclear</b>? Explain.', null, 3, 'Only in unclear: un + clear means not clear. In uncle, "cle" is not a word.'),
      O('Write a test you can use to check for a real prefix.', null, 2, 'Cover the prefix. If a real word is left and the meaning fits, it is a prefix.')] },
    'drop-e': { goal: 'I can drop the silent e before a suffix that starts with a vowel.', think: [
      O('Why do you keep the e in <b>hopeful</b> but drop it in <b>hoping</b>?', null, 3, '-ful starts with a consonant, so keep the e. -ing starts with a vowel, so drop it.'),
      O('Add the suffix and explain: care + less, care + ing.', null, 2, 'careless (keep e, -less starts with a consonant); caring (drop e, -ing starts with a vowel).'),
      O('Fix the spelling and say the rule.', 'We are makeing bannock.', 2, 'making: drop the silent e before -ing.')] },
    'y-to-i': { goal: 'I can change y to i before a suffix.', think: [
      O('Why is it <b>happiness</b> but <b>playful</b>?', null, 3, 'happy has a consonant before y, so y changes to i. play has a vowel before y, so y stays.'),
      O('Why do you keep the y in <b>crying</b>?', null, 2, 'Never change y to i before -ing, or you would get two i\'s.'),
      O('Add -ed to each: carry, enjoy, study.', null, 2, 'carried, enjoyed, studied')] },
    double: { goal: 'I can double the last letter before a suffix.', think: [
      O('Why is it <b>planning</b> but <b>planting</b>?', null, 3, 'plan ends in one vowel then one consonant, so double the n. plant ends in two consonants, so no doubling.'),
      O('Add -ing to each and say which doubled: stop, rain, swim, jump.', null, 2, 'stopping (doubled), raining, swimming (doubled), jumping'),
      O('Fix the spelling and say the rule.', 'Lina was runing late.', 2, 'running: one vowel and one consonant at the end, so double the n.')] },
    'able-ible': { goal: 'I can choose -able or -ible.', think: [
      O('Explain the clue that helps you choose: <b>readable</b> but <b>visible</b>.', null, 3, 'read is a whole word, so -able. vis is not a whole word, so -ible.'),
      O('Add -able or -ible: comfort, terr, wash, poss.', null, 2, 'comfortable, terrible, washable, possible'),
      O('Write a sentence with an -able word and one with an -ible word.', null, 3, 'The bench is comfortable. The northern lights were visible tonight.')] }
  } });
})();
