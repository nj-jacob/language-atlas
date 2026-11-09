/* Grade 6 Complex Sentences: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/sentences.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B3.1. Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('sentences', { code: 'SE', ideas: {
    main: { goal: 'I can find the main clause, the part that can stand alone.', think: [
      O('Underline the main clause. Explain how you know.', 'When the bell rang, everyone ran outside.', 3, 'everyone ran outside: it makes sense on its own. "When the bell rang" needs more.'),
      O('Add a main clause to make a complete sentence.', 'Because the road was icy, ______.', 2, 'Because the road was icy, the bus was late.'),
      O('Is this a complete sentence? Fix it if not.', 'Although Mila practised every day.', 2, 'Not complete. Although Mila practised every day, she was still nervous.')] },
    joining: { goal: 'I can choose a joining word that shows how ideas connect.', think: [
      O('Join with a word that shows cause.', 'The lake froze. We went skating.', 2, 'Because the lake froze, we went skating.'),
      O('Join with a word that shows contrast.', 'It was sunny. It was very cold.', 2, 'Although it was sunny, it was very cold.'),
      O('Explain how <b>although</b> and <b>because</b> show different connections.', null, 3, 'Because shows a reason; although shows a surprise or contrast.')] },
    'who-which': { goal: 'I can use who, which, that and whose to add information.', think: [
      O('Fill in who, which or whose. Explain your choice.', 'The artist ______ painted the mural lives in Moncton.', 2, 'who: it is about a person.'),
      O('Fill in who, which or whose.', 'Theo, ______ bike was stolen, called the police.', 2, 'whose: it shows the bike belongs to Theo.'),
      O('Write a sentence about a place, using <b>which</b>.', null, 2, 'Lake Superior, which is the largest of the Great Lakes, is very cold.')] },
    combine: { goal: 'I can combine two sentences with a relative clause.', think: [
      O('Combine using who.', 'My aunt is a pilot. She flies to Yellowknife.', 2, 'My aunt, who is a pilot, flies to Yellowknife.'),
      O('Combine using which.', 'The canoe is red. It belonged to my grandfather.', 2, 'The canoe, which belonged to my grandfather, is red.'),
      O('Why is the combined sentence often better than two short ones?', null, 2, 'It shows how the ideas connect and reads more smoothly.')] }
  } });
})();
