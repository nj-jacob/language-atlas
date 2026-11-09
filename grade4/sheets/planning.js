/* Grade 4 Planning Writing: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/planning.js; its activities (D1.2, D1.3, D1.5) print as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: D1.1 purpose, audience and form; D1.2 ideas; D1.3 research; D1.4 organizing. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('planning', { code: 'PL', ideas: {
    'purpose-audience': { goal: 'I can name why I am writing and who will read it.', think: [
      L('You want the town to fix the park swings. What is your purpose? Who is your audience?', 'To persuade; the town council.'),
      L('How would your words change if you wrote to a friend instead?', 'More casual and friendly; less formal.'),
      L('Write a purpose and an audience for a poster about a bake sale.', 'For example: to inform and invite; families at school.') ] },
    'form-medium': { goal: 'I can choose the form and the medium.', think: [
      L('Which form fits: telling how to make bannock?', 'A procedure (recipe), with materials and steps.'),
      L('When might a video be better than a written page?', 'When people need to see how something moves or sounds.'),
      L('Choose a form to thank a volunteer. Explain why.', 'For example: a letter or card: it is personal.') ] },
    'find-ideas': { goal: 'I can find ideas for writing.', think: [
      L('Name three ways to find ideas.', 'For example: an idea web, a list, talking with someone, a photo, a memory.'),
      L('Make a quick web for "winter".', 'Three or more linked ideas.', 4),
      L('Why talk about ideas before writing?', 'Talking helps you find and sort ideas and words.') ] },
    sources: { goal: 'I can gather facts and record where they came from.', think: [
      L('Why do you write down where a fact came from?', 'So you and others can check it, and to give credit.'),
      L('Write the three things to record about a book you used.', 'Title, author, and year (or page).'),
      L('How can you tell if a website is a good source?', 'Who made it, is it up to date, do other sources agree.') ] },
    'sort-order': { goal: 'I can sort facts and put ideas in order.', think: [
      L('Facts about loons: they dive for fish; they nest by the shore; they call at night; chicks ride on backs. Sort them into two groups.', 'Food and calls / nests and chicks (any sensible two groups).', 3),
      L('Why sort facts into groups before writing?', 'Each group can become one paragraph.'),
      L('What order fits a story? What order fits instructions?', 'Time order for both: what happens first, next and last.') ] }
  } });
})();
