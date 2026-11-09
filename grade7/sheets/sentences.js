/* Grade 7 Sentences: the hand-written part of the printable worksheets (the rest is made from chapters/sentences.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B3.1.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('sentences', { code: 'SE', ideas: {
    clauses: { goal: 'I can tell a clause that stands alone from one that cannot.', think: [
      T('Is this a sentence? Explain and fix it.', 'Because I was tired.', 'No. It is a dependent clause. Fix: "Because I was tired, I went to bed early."'),
      T('How can you test if a clause can stand alone?', '', 'Read it on its own. If it feels finished, it is independent. If it leaves you waiting, it is dependent.'),
      T('Write a dependent clause, then join it to an independent clause.', '', 'For example: "when the bell rang" → "When the bell rang, we went outside."')] },
    types: { goal: 'I can name the four sentence types.', think: [
      T('Kai says this sentence is complex because it is long. Is he right?', 'The geese flew south, and the lake froze over.', 'No. It is compound: two independent clauses joined with "and". Length does not decide the type.'),
      T('Write a compound-complex sentence about the weather.', '', 'For example: "When the storm came, the power went out, and we lit candles."'),
      T('Why might a writer mix simple and complex sentences?', '', 'Variety keeps the reader interested. A short simple sentence can add punch after a long one.')] },
    relate: { goal: 'I can choose a joining word that shows how ideas relate.', think: [
      T('What does "and" fail to show here? Rewrite it.', 'It rained all day, and the game went on.', '"And" does not show the contrast. "Although it rained all day, the game went on."'),
      T('How are "because" and "although" different?', '', '"Because" shows a cause. "Although" shows a contrast: something happens anyway.'),
      T('Join these ideas with "although", then with "until". How does the meaning change?', 'Ravi stayed calm. The test was hard.', '"Ravi stayed calm although the test was hard": calm anyway (contrast). "Ravi stayed calm until the test was hard": calm only up to that point (time).')] },
    fronted: { goal: 'I can put a dependent clause first, with a comma.', think: [
      T('Where does the comma go? Why?', 'When the music started the crowd cheered.', 'After "started". The comma marks where the front clause ends.'),
      T('Why might a writer put the dependent clause first?', '', 'To set the scene or build suspense before the main idea.'),
      T('Rewrite with the dependent clause first.', 'We stayed inside because it was minus thirty.', 'Because it was minus thirty, we stayed inside.')] },
    fragment: { goal: 'I can find and fix a fragment.', think: [
      T('This is long. Why is it still a fragment? Fix it.', 'Running down the hall with a stack of books.', 'It has no subject doing the action and no main verb. "Ana was running down the hall with a stack of books."'),
      T('What two parts does every sentence need?', '', 'A subject (who or what) and a verb (what they do or are), and it must be a complete thought.'),
      T('Writers sometimes use a fragment on purpose. Give an example and say why.', '', 'For example: "Silence. Then a howl." It builds drama. In formal writing, avoid it.')] },
    'run-on': { goal: 'I can fix a run-on sentence.', think: [
      T('Why does adding a comma not fix this run-on?', 'The bus was late, we missed the start.', 'A comma alone cannot join two sentences. Use a full stop, a semicolon or a joining word.'),
      T('Fix this run-on in two different ways.', 'The snow was deep we stayed home.', '"The snow was deep. We stayed home." and "Because the snow was deep, we stayed home."'),
      T('How does fixing run-ons help your reader?', '', 'Each idea is clear, and the reader knows where one thought ends and the next begins.')] }
  } });
})();
