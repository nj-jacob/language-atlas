/* Grade 3 Planning Writing: printable worksheets (assets/engine/sheets.js). Learn, Practise and the Activity sheets are made from
   chapters/planning.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, D1.1 to D1.4 (D1.5 on the Activity sheets). */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  S.register('planning', { code: 'PL', ideas: {
    purpose: { goal: 'I can choose a form that fits my purpose.',
      think: [{ q: 'You want to teach someone to make a snow fort. What form will you write? Why?', lines: 2, key: 'Instructions, because they give steps in order.' },
        { q: 'You want the principal to add a reading corner. What form will you write?', lines: 2, key: 'A letter (persuasive), with reasons.' },
        { q: 'Write your topic, purpose and form for a piece you would like to write.', lines: 3, key: 'For example: Topic: my dog. Purpose: to make people laugh. Form: a story.' }] },
    audience: { goal: 'I can write for my reader.',
      think: [{ q: 'How would you write to a Grade 1 class differently from writing to a grown-up?', lines: 2, key: 'Shorter sentences, easier words and pictures for the Grade 1s.' },
        { q: 'Write a first sentence for a letter to your grandparent.', lines: 2, key: 'For example: Dear Grandma, I can’t wait to tell you about my trip.' },
        { q: 'Why should a writer think about who will read their work?', lines: 2, key: 'So the words, tone and details fit the reader and they understand.' }] },
    ideas: { goal: 'I can keep only the ideas that fit my topic.',
      think: [{ q: 'Topic: <i>How to care for a cat.</i> Write two ideas that fit.', lines: 2, key: 'For example: give fresh water every day; brush its fur.' },
        { q: 'Topic: <i>How to care for a cat.</i> Write one idea that does NOT fit, and why.', lines: 2, key: 'For example: My favourite food is pizza. It is not about caring for a cat.' },
        { q: 'Write three ideas for a story about a snow day.', lines: 3, key: 'Any three ideas about a snow day.' }] },
    sources: { goal: 'I can gather facts from three or more sources.',
      think: [{ q: 'You are writing about bees. Name three places to find facts.', lines: 2, key: 'For example: a library book, a website a grown-up checks, asking a beekeeper.' },
        { q: 'Why is it good to use more than one source?', lines: 2, key: 'To check the facts agree and to learn more than one book tells.' },
        { q: 'Write one fact you learned and where you found it.', lines: 2, key: 'Any fact with its source.' }] },
    order: { goal: 'I can group my ideas and put them in order.',
      think: [{ q: 'Put these in order for instructions: <i>eat it, toast the bread, spread the jam</i>.', lines: 1, key: 'Toast the bread, spread the jam, eat it.' },
        { q: 'Group these ideas: <i>fur, ponds, dams, sharp teeth, lodges</i> into "body" and "home".', lines: 2, key: 'Body: fur, sharp teeth. Home: ponds, dams, lodges.' },
        { q: 'What tool can you use to sort ideas before you write?', lines: 1, key: 'For example: a web, a list, a chart or a story map.' }] }
  } });
})();
