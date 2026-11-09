/* Grade 6 Planning and Research: worksheets (assets/engine/sheets.js). Learn, Practise and Activity sheets are made
   from chapters/planning.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, D1.1 to D1.4. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('planning', { code: 'PL', ideas: {
    purpose: { goal: 'I can name my topic, purpose and audience.', think: [
      O('You want Grade 3 students to stop littering. What is your purpose and audience?', null, 2, 'Purpose: persuade. Audience: Grade 3 students.'),
      O('How would your words change if the audience were the town council?', null, 2, 'More formal words, facts and a polite request.'),
      O('Plan a text: write your topic, purpose and audience.', null, 3, 'Topic: our creek. Purpose: inform. Audience: families in the neighbourhood.')] },
    form: { goal: 'I can choose a form that suits my purpose and audience.', think: [
      O('Which form would you choose to invite families to a school feast? Why?', null, 2, 'A poster or invitation: short, clear and easy to share.'),
      O('Which form would you choose to explain how a bill becomes a law? Why?', null, 2, 'A flow chart or report: it shows steps in order.'),
      O('Why might a podcast suit some topics better than a written report?', null, 3, 'Listeners hear voices and feelings, and can listen anywhere.')] },
    ideas: { goal: 'I can use strategies to get ideas.', think: [
      O('Make a quick web of ideas about "a place that matters to me".', null, 4, 'Any web with a centre and at least four connected ideas.'),
      O('Name two strategies for getting ideas.', null, 2, 'Brainstorm, web, talk with a partner, freewrite, look at photos.'),
      O('Which strategy works best for you? Why?', null, 2, 'Any strategy with a reason.')] },
    notes: { goal: 'I can make notes in my own words.', think: [
      O('Write a note in your own words, in five words or fewer.', 'The monarch butterfly travels up to 4500 kilometres each fall to reach Mexico.', 1, 'monarchs fly 4500 km to Mexico'),
      O('Why should notes be in your own words?', null, 2, 'So you understand them and do not copy someone else\'s writing.'),
      O('Turn your note into a full sentence for a report.', null, 2, 'Each fall, monarchs fly about 4500 km south to Mexico.')] },
    credit: { goal: 'I can record the source of what I use.', think: [
      O('Write what you need to record about a website you used.', null, 3, 'Who made it, the title of the page, the address, and the date I looked at it.'),
      O('Why must you credit the people whose work you use?', null, 2, 'It is fair to them, and readers can check where facts came from.'),
      O('Write a source line for a book you know.', null, 2, 'Author, title, publisher and year.')] },
    sort: { goal: 'I can sort notes into groups.', think: [
      O('Sort into two groups and name them: fur, eats fish, thick fat, eats seals, big paws.', null, 3, 'Body: fur, thick fat, big paws. Food: eats fish, eats seals.'),
      O('Why sort notes before you write?', null, 2, 'Each group becomes a paragraph, so the writing is organized.'),
      O('A note does not fit any group. What can you do?', null, 2, 'Leave it out, or make a new group if it is important.')] },
    outline: { goal: 'I can order my ideas to fit the form.', think: [
      O('Put the parts of a report in order: conclusion, body paragraphs, introduction.', null, 1, 'introduction, body paragraphs, conclusion'),
      O('Write an outline for a how-to text on making tea.', null, 4, '1. Boil water. 2. Put a tea bag in a cup. 3. Pour the water. 4. Wait three minutes.'),
      O('How is ordering ideas for a story different from a report?', null, 3, 'A story goes in time order with a problem; a report groups facts by topic.')] }
  } });
})();
