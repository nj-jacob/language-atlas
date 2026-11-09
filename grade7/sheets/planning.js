/* Grade 7 Planning and Research: the hand-written part of the printable worksheets (the rest is made from chapters/planning.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, D1.1 to D1.4.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('planning', { code: 'PL', ideas: {
    'form-fit': { goal: 'I can choose a form that suits my purpose and audience.', think: [
      T('You want Grade 2 students to recycle more. Which form would you choose? Why?', '', 'For example: a short picture poster or a puppet skit, because young children read little and like visuals.'),
      T('Why should you decide on your audience before the form?', '', 'The form must reach the audience. A long report would not work for young children.'),
      T('The same topic, two audiences: how would a letter to the mayor differ from a post for friends?', '', 'The letter is formal, with facts and a clear request. The post is short and casual.')] },
    ideas: { goal: 'I can use a strategy to find many ideas.', think: [
      T('Why should you collect many ideas before you start a draft?', '', 'Then you can choose the strongest one instead of the first one.'),
      T('Name two strategies for finding ideas and say when each works best.', '', 'Brainstorming for any topic; a web to see how ideas connect; asking 5 W questions for a report.'),
      T('Make a quick list of five ideas for writing about inclusion at school.', '', 'Any five relevant ideas, e.g. ramps, quiet rooms, clubs for everyone, menus in many languages.')] },
    reliable: { goal: 'I can check who made a source, when and why.', think: [
      T('A website looks professional. Is that enough to trust it? Explain.', '', 'No. Check who made it, when it was updated, why it was made, and whether other sources agree.'),
      T('Why does the date of a source matter?', '', 'Facts can change. An old source may be out of date.'),
      T('A site about a snack food was made by the company that sells it. What should you think about?', '', 'It may be biased to sell its product. Check an independent source.')] },
    cite: { goal: 'I can record every source I use.', think: [
      T('Why put quotation marks around words you copy into your notes?', '', 'So you remember they are someone else\'s words and credit them.'),
      T('What should you record for each source?', '', 'The creator, the title, where it was published (or the website) and the date.'),
      T('Why is citing sources fair to creators and readers?', '', 'Creators get credit, and readers can check where facts came from.')] },
    classify: { goal: 'I can sort notes under headings.', think: [
      T('This note is interesting but off topic. What should you do with it?', '', 'Leave it out. Only relevant notes belong, even if they were hard to find.'),
      T('Choose three headings for a report on beavers.', '', 'For example: Body, Habitat and dams, Life cycle.'),
      T('How do headings help when you start to write?', '', 'Each heading becomes a section, so your writing is organized.')] },
    sequence: { goal: 'I can put sections in a logical order.', think: [
      T('Why not write sections in the order you found the notes?', '', 'Readers need a logical order, such as general to specific or first to last.'),
      T('Put these in a good order for a report and explain.', 'What is a wildfire · How to prevent wildfires · Causes of wildfires', 'What it is, causes, how to prevent. Each section builds on the one before.'),
      T('Which order fits a how-to text? Which fits a history report?', '', 'How-to: step order. History: time order.')] }
  } });
})();
