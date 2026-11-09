/* Grade 5 How Texts Work: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/features.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: C1.3, C1.4, C1.5, C3.1. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('features', { code: 'FE', ideas: {
    'cause-effect': { goal: 'I can find cause and effect in a persuasive text.', think: [
      O('Name the cause and the effect.', 'Cause: more bike lanes. Effect: fewer cars and cleaner air.', 2, W.sent('If our town builds more bike lanes, fewer people will drive, and the air will be cleaner.')),
      O('Why do persuasive writers use cause and effect?', 'To show what good things will happen if you agree, so their idea seems sensible.', 2),
      O('Write a cause-and-effect sentence to persuade your family to recycle.', 'For example: If we recycle, less garbage goes to the landfill, so our town stays cleaner.', 2)] },
    features: { goal: 'I can explain how a preface and a glossary help readers.', think: [
      O('Where is a glossary, and what does it do?', 'At the back of a book. It explains important or difficult words.', 2),
      O('What might an author write in a preface?', 'Why they wrote the book, how to use it, or who helped them. It comes before the main text.', 2),
      O('Name another text feature and explain how it helps.', 'For example: an index helps you find a topic by page; headings tell you what each part is about.', 2)] },
    visuals: { goal: 'I can explain how images and graphics add to meaning.', think: [
      O('Why might an article about a hurricane include a map?', 'To show where the storm is and where it is going, which is hard to explain in words.', 2),
      O('What can a photograph show that words cannot?', 'Exactly what something looks like, and feelings on people\'s faces.', 2),
      O('Look at a poster or book cover. How do its colours and pictures make you feel?', 'Answers vary. For example: dark blues and a lone figure make it feel lonely and mysterious.', 2)] },
    style: { goal: 'I can explain why a writer makes a style choice.', think: [
      O('Why might the writer use short sentences here?', 'Short sentences speed up the reading and build tension.', 2, W.sent('The ice cracked. Jonah froze. Nobody moved.')),
      O('Rewrite the sentence in a formal voice for a report.', 'For example: The weather was extremely cold, with very strong winds.', 2, W.sent('It was sooo cold and the wind was crazy!')),
      O('How is the voice of a diary different from the voice of a textbook?', 'A diary is personal and casual (I, feelings); a textbook is formal and gives facts.', 2)] },
    imagery: { goal: 'I can find imagery and say which senses it uses.', think: [
      O('Which senses does this sentence use?', 'Hearing (crackled), smell (smoky), touch (warmth).', 2, W.sent('The fire crackled, and the smoky warmth wrapped around us.')),
      O('Write a sentence about a market using two senses.', 'For example: Sweet peaches glowed in the baskets while vendors called out prices.', 2),
      O('Why do writers use imagery?', 'So readers can picture and feel the scene as if they were there.', 2)] },
    humour: { goal: 'I can explain how writers make readers laugh.', think: [
      O('What makes this funny?', 'Exaggeration: no one can eat a whole moose. It also plays on the size of the dog.', 2, W.sent('Our tiny dog acted like he could eat a whole moose for breakfast.')),
      O('Name two ways writers create humour.', 'For example: exaggeration, word play or puns, a surprise ending, silly situations.', 2),
      O('Write a funny sentence using exaggeration.', 'For example: My backpack weighs more than a school bus.', 2)] }
  } });
})();
