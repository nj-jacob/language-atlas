/* Grade 7 Writing and Publishing: the hand-written part of the printable worksheets (the rest is made from chapters/writing.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, D2.1 to D2.6, D3.1 and D3.2.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('writing', { code: 'WR', ideas: {
    paragraph: { goal: 'I can build a paragraph with a clear shape.', think: [
      T('Why is this a weak topic sentence?', 'Skaters use parking lots.', 'It is a detail. A topic sentence should cover the whole paragraph, e.g. "Our town needs a skatepark."'),
      T('Write a topic sentence for a paragraph about winter in your town.', '', 'One sentence that names the topic and the main point.'),
      T('What job does the last sentence of a paragraph do?', '', 'It wraps up the idea or links to the next paragraph.')] },
    voice: { goal: 'I can choose a tone and voice that fit the form.', think: [
      T('How would the tone of a lab report differ from a personal story?', '', 'A lab report is formal and factual. A personal story shows feelings and personality.'),
      T('Rewrite in a more personal voice.', 'The lake was cold.', 'For example: "The lake bit at my ankles like a hundred icy needles."'),
      T('What makes your own writing sound like you?', '', 'Your word choices, the way you build sentences, and the details and feelings you share.')] },
    'own-bias': { goal: 'I can check my own writing for bias.', think: [
      T('Is it possible to write with no point of view? Explain.', '', 'No. Everyone has a point of view. Good writers notice theirs and treat others fairly.'),
      T('How might a reader who disagrees with you take this sentence?', 'Only lazy people take the bus.', 'They could feel insulted. "Lazy" is loaded and unfair.'),
      T('Name two ways to check a draft for bias.', '', 'Look for loaded words, check that other views are included, ask someone who sees it differently.')] },
    'cut-add': { goal: 'I can delete, add and reorder sentences for clarity.', think: [
      T('Is fixing spelling the same as revising? Explain.', '', 'No. Revising changes ideas and order. Spelling is editing.'),
      T('Which sentence would you cut? Why?', 'Beavers build dams. Dams make ponds. My cousin likes pizza. Ponds keep beavers safe.', '"My cousin likes pizza": it is off topic.'),
      T('Why might moving a sentence make a paragraph clearer?', '', 'Ideas in a logical order are easier to follow.')] },
    edit: { goal: 'I can edit for errors, line by line.', think: [
      T('Should you accept every change a grammar checker suggests? Explain.', '', 'No. It can be wrong. The writer decides.'),
      T('Find and fix two errors.', 'Our class travelled to ottawa, we saw the parliament buildings.', '"Ottawa" needs a capital; the comma splice needs a full stop or semicolon.'),
      T('Why edit one line at a time?', '', 'You slow down and notice small errors you skip when reading fast.')] },
    publish: { goal: 'I can make design choices that serve my message.', think: [
      T('What is the difference between decorating and designing?', '', 'Designing helps the reader understand. Decorating adds effects that may make it harder to read.'),
      T('You are publishing a guide for new students. Name two design choices and why.', '', 'For example: clear headings so they find information, a map so they find rooms.'),
      T('After you share a final copy, how can you tell if your choices worked?', '', 'Ask readers what they understood or noticed first, and compare with what you meant.')] }
  } });
})();
