/* Grade 1 Planning Writing: printable worksheets. Learn and Practise 1 to 3 are made from chapters/planning.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, D1.1 to D1.4 (D1.5 is an activity).
   Think questions marked by a computer are checked in tests/verify/grade1-planning.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('planning', { code: 'PL', ideas: {
    'who-why': { goal: 'I can say who my writing is for and why I write it.', think: [
      TF('Nora writes a grocery list. She says it is to share a story. True or false?', W.icon('write'), false, 'A grocery list shares a story.', 'A grocery list helps you remember what to buy.',
        { k: 'g1-write-why-tf', job: 'a grocery list', said: 'to share a story' }),
      { q: 'You write a thank-you card. Who is it for? Why are you writing it?', lines: 2, key: 'For the person who helped or gave a gift; to say thank you.' },
      { q: 'Would you write a party invitation the same way as a sign for a lemonade stand? Why?', lines: 2, key: 'No: an invitation is for friends and tells when and where; a sign is for people walking by and gets them to buy.' }] },
    ideas: { goal: 'I can gather ideas that fit my topic.', think: [
      TF('The topic is Winter. Does this idea fit?', W.sent('Snow covers the yard.'), true, 'Snow is part of winter.', 'It is about something else.',
        { k: 'g1-idea-tf', topic: 'Winter', idea: 'Snow covers the yard.' }),
      { q: 'Your topic is "My family". Draw or write three ideas that fit.', lines: 3, key: 'Three ideas about the child’s family (who is in it, what they do together).' },
      { q: 'Where could you find facts about beavers?', fig: W.icon('read'), lines: 1, key: 'A book about Canadian animals (or a nature video, or an expert).' }] },
    order: { goal: 'I can put my ideas in order.', think: [
      TF('Are these steps for washing your hands in order?', W.sent('Put soap on your hands. Wet your hands. Rinse your hands.'), false, 'They are in order.', 'Wet your hands first, then soap, then rinse.',
        { k: 'g1-order-tf', h: 'Washing your hands', shown: 'Put soap on your hands.|Wet your hands.|Rinse your hands.' }),
      { q: 'Write three steps for making a sandwich. Use first, next, last.', lines: 3, key: 'First lay out the bread. Next add the filling. Last put the top on.' },
      { q: 'Why do order words like first and next help a reader?', lines: 2, key: 'They show which step comes when, so the reader can follow along.' }] }
  } });
})();
