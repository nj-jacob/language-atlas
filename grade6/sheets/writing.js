/* Grade 6 Drafting, Revising and Publishing: worksheets (assets/engine/sheets.js). Learn, Practise and Activity sheets
   are made from chapters/writing.js; this file adds each idea's "I can" goal and its Think questions, open answers the
   grown-up marks. Ontario 2023 Language, D2.3 to D2.6. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('writing', { code: 'WR', ideas: {
    tone: { goal: 'I can match my tone to the form.', think: [
      O('Rewrite in a formal tone for a letter to a newspaper.', 'The park is gross and someone needs to fix it already.', 2, 'The park needs cleaning, and I hope the city will act soon.'),
      O('What tone suits a thank-you note to an Elder who visited your class?', null, 2, 'Warm, respectful and sincere.'),
      O('Write one sentence about snow in your own voice.', null, 2, 'Any sentence that sounds like the writer.')] },
    fair: { goal: 'I can check my writing for bias.', think: [
      O('Rewrite to be fair.', 'Everyone knows skateboarders are troublemakers.', 2, 'Some people worry about noise at the skate park.'),
      O('How might a reader who loves hunting read a text that calls all hunters cruel?', null, 2, 'They would feel unfairly judged and may stop reading.'),
      O('Name two words that often show bias.', null, 2, 'all, everyone, never, always, only')] },
    revise: { goal: 'I can add and delete sentences for focus.', think: [
      O('Which sentence should you cut? Why?', 'Our garden grows beans and squash. We water it every morning. My cousin has a red bike. The squash are now huge.', 2, 'My cousin has a red bike: it is not about the garden.'),
      O('Add a sentence that gives a detail.', 'The storm knocked out the power.', 2, 'We lit candles and played cards until midnight.'),
      O('How can feedback from a partner help you revise?', null, 2, 'They notice parts that are unclear or missing.')] },
    edit: { goal: 'I can edit one thing at a time.', think: [
      O('Edit for spelling and capitals.', 'on saturday we went to toronto to see my nieghbour\'s new baby.', 2, 'On Saturday we went to Toronto to see my neighbour\'s new baby.'),
      O('Why edit for one thing at a time?', null, 2, 'You notice more mistakes when you look for one kind at once.'),
      O('A spell-checker missed "their" instead of "there". Why?', null, 2, 'Both are real words, so the checker does not see a mistake.')] }
  } });
})();
