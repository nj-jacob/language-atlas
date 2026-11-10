/* Grade 5 Planning Writing: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/planning.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: D1.1 to D1.4. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('planning', { code: 'PL', ideas: {
    purpose: { goal: 'I can choose a form that fits my purpose and audience.', think: [
      O('You want younger students to wash their hands. Choose a form and explain why.', 'For example: a bright poster with pictures, because young children read few words and notice pictures.', 3),
      O('Name the purpose and audience of a thank-you card to your coach.', 'Purpose: to thank. Audience: the coach.', 2),
      O('How would a report on wolves change if your audience were scientists instead of Grade 2 students?', 'More detail, special words and facts; less explaining of simple ideas, fewer pictures.', 3)] },
    ideas: { goal: 'I can gather ideas and details for a topic.', think: [
      O('Make a quick web of ideas for the topic "Making our school more welcoming".', 'Any web with 3 or more related ideas, such as a buddy program, signs in many languages, a quiet room, ramps.', 4),
      O('Name two ways to get ideas besides your own memory.', 'For example: talk to others, read books or websites, look at pictures, visit a place.', 2),
      O('Which of your own experiences could you write about for "a time I helped someone"?', 'Answers vary: one real event with a detail.', 2)] },
    reliable: { goal: 'I can check that a source is reliable and credit it.', think: [
      O('Which source is more reliable for facts about bats: a government wildlife website or an anonymous post? Why?', 'The government wildlife website. It has experts, a known author, and is checked; the post has no author.', 3),
      O('List three things to check before you trust a website.', 'Who made it, when it was updated, whether other sources agree, whether it is selling something.', 3),
      O('Why must you write down where you found your information?', 'To give credit to the creator and so readers can check it.', 2)] },
    organize: { goal: 'I can sort my notes and put them in order.', think: [
      O('Sort these notes into two groups and name each group.', 'Food: eat insects; eat berries. Home: live in caves; sleep in winter. (Any two sensible groups.)', 3, W.sent('eat insects &nbsp;·&nbsp; live in caves &nbsp;·&nbsp; eat berries &nbsp;·&nbsp; sleep in winter')),
      O('What order would you use for a how-to text? Why?', 'Step order (first to last), so the reader can follow along.', 2),
      O('Which tool helps you sort notes best: a web, a chart or sticky notes? Why?', 'Answers vary with a reason. For example: a chart, because I can see each group in its own column.', 2)] }
  } });
})();
