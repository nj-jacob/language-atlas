/* Grade 6 Grammar: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from chapters/grammar.js;
   this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B3.2. Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('grammar', { code: 'GR', ideas: {
    jobs: { goal: 'I can name the job a word does in its sentence.', think: [
      O('Why can you not tell the job of <b>round</b> until you see the sentence?', null, 3, 'It can do different jobs: a round of games (noun), a round table (adjective), we round the corner (verb).'),
      O('Change one adjective to make this sentence more exact.', 'The nice dog ran across the big field.', 2, 'The friendly dog ran across the huge field.'),
      O('Write a sentence with a noun, a verb, an adjective and an adverb. Label each one.', null, 3, 'The hungry (adjective) bear (noun) ate (verb) greedily (adverb).')] },
    gerunds: { goal: 'I can tell when an -ing word is a noun.', think: [
      O('How does swapping in <b>It</b> help you find a gerund?', null, 3, 'If the sentence still works with It in place of the -ing word, the -ing word is a noun: a gerund.'),
      O('Write two sentences with <b>swimming</b>: one where it is a noun, one where it is a verb.', null, 3, 'Swimming is good exercise (noun). Kai is swimming across the pool (verb).'),
      O('Rewrite with a gerund at the start.', 'It is hard to learn a new language.', 2, 'Learning a new language is hard.')] },
    'active-passive': { goal: 'I can tell active voice from passive voice.', think: [
      O('Ravi says this is passive. Do you agree? Why?', 'The goalie was fast.', 3, 'No. Nothing is done to the goalie; was only links goalie to fast.'),
      O('This sentence is passive but names no doer. Who might the doer be?', 'The window was broken.', 2, 'A ball, a storm, or someone we do not know.'),
      O('Explain how you can tell a passive sentence.', null, 3, 'Ask who did the action. If the receiver comes first, often with was or were and by, it is passive.')] },
    convert: { goal: 'I can switch a sentence between active and passive voice.', think: [
      O('What is missing? Fix it.', 'The mural was painted Leila.', 2, 'The word by: The mural was painted by Leila.'),
      O('Change to active. No doer is named, so choose one.', 'The tickets were sold by noon.', 2, 'The box office sold the tickets by noon.'),
      O('Which is usually clearer, active or passive? Give your own example.', null, 3, 'Active: "Sam fixed the bike" says who did what, in fewer words.')] },
    'why-passive': { goal: 'I can explain when the passive voice helps.', think: [
      O('Why might a company write this instead of "We raised prices"?', 'Prices were raised.', 3, 'The passive hides who is responsible, so readers are less likely to blame the company.'),
      O('Is the passive a good choice here? Why?', 'The vaccine was tested on 30 000 people.', 3, 'Yes. The people tested matter most; who tested them matters less.'),
      O('Give one reason to use the active voice and one to use the passive.', null, 3, 'Active: the doer matters and it is clearer. Passive: the doer is unknown or not important.')] }
  } });
})();
