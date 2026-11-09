/* Grade 8 Planning and Research: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/planning.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: D1.1 to D1.4 purpose, ideas, research and organizing. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('planning', { code: 'PL', ideas: {
    form: { goal: 'I can choose a form that suits my purpose and audience, and explain why.',
      think: [O('You want the town to fix a broken playground. Which form would you choose? Why?', 2, 'A letter to council or a petition: it is formal and goes to the people who can act.'),
        O('Who is the audience for a picture book about recycling? How does that change your writing?', 2, 'Young children: short sentences, simple words, pictures.'),
        O('Name the purpose of a recipe, a speech and a review.', 2, 'Recipe: to instruct. Speech: to persuade or inform. Review: to evaluate.')] },
    ideas: { goal: 'I can use a strategy to find ideas.',
      think: [O('Name three strategies for finding ideas.', 2, 'Any three of: brainstorm, web, freewrite, list questions, talk it over, read about it.'),
        O('Make a quick web of ideas for the topic "water".', 4, 'A centre word with at least four connected ideas.'),
        O('How can your own experiences help you write about a challenging topic?', 2, 'They give real examples, feelings and a personal connection.')] },
    reliable: { goal: 'I can check whether a source is reliable.',
      think: [O('Name four things to check about a website.', 2, 'Who made it, when it was updated, whether it cites sources, whether it is selling something.'),
        O('Why is the first search result not always the best?', 2, 'Results can be paid ads or popular, not accurate.'),
        O('Compare a government health site and a blog selling vitamins. Which is more reliable? Why?', 2, 'The government site: experts, no product to sell, regularly updated.')] },
    cite: { goal: 'I can cite every source I use.',
      think: [O('Why must you cite even when you change a few words?', 2, 'The ideas still belong to the author.'),
        O('What information do you need to cite a website?', 2, 'Author or organization, title, date, website name, address (URL).'),
        O('Is a photo from the internet free to use? Explain.', 2, 'No. Someone owns it; check the licence and credit the creator.')] },
    classify: { goal: 'I can group my notes under headings.',
      think: [O('Group these notes under two headings: tides, whale songs, salt water, krill, coral, currents.', 3, 'Ocean water: tides, salt water, currents. Ocean life: whale songs, krill, coral.'),
        O('Why group notes instead of keeping them in the order you found them?', 2, 'Groups become paragraphs and make the writing organized.'),
        O('What tool could you use to sort notes?', 1, 'Sticky notes, a chart, colour coding, a mind map or a document with headings.')] },
    outline: { goal: 'I can choose an organizer and an order for my ideas.',
      think: [O('Which organizer suits a compare and contrast essay? Why?', 2, 'A Venn diagram or T-chart: it shows likenesses and differences side by side.'),
        O('Why include the other side in an argument outline?', 2, 'Answering it makes your argument stronger and fairer.'),
        O('Outline a three-paragraph piece on "Why every school needs a library".', 4, 'Introduction with claim, two reasons with evidence, conclusion; maybe a counter-argument.')] }
  } });
})();
