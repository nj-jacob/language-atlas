/* Grade 6 Capitals and Punctuation: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/punctuation.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B3.3. Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('punctuation', { code: 'PU', ideas: {
    formal: { goal: 'I can use a colon after a formal greeting.', think: [
      O('Write the greeting for a formal letter to the mayor.', null, 1, 'Dear Mayor Thompson:'),
      O('Write the opening of a memo to all Grade 6 students.', null, 3, 'To: All Grade 6 students / From: Ms. Okafor / Re: Field trip'),
      O('Why does a letter to a friend use a comma, but a letter to a company uses a colon?', null, 3, 'The colon is formal; the comma is friendly and informal.')] },
    script: { goal: 'I can use a colon for each new speaker in a script.', think: [
      O('Rewrite as a script.', '"Is the canoe ready?" asked Maya. "Almost," said Leo.', 3, 'MAYA: Is the canoe ready? / LEO: Almost.'),
      O('What does a script leave out that a story uses?', null, 2, 'Quotation marks and words like said; the colon and name show who speaks.'),
      O('Write three lines of a script between two friends planning a trip.', null, 3, 'Any three lines, each with a name and a colon.')] },
    'transition-comma': { goal: 'I can put a comma after a transition.', think: [
      O('Add the missing commas.', 'First we packed. However the car would not start. In the end we took the bus.', 2, 'First, we packed. However, the car would not start. In the end, we took the bus.'),
      O('Why does a comma help after <b>However</b>?', null, 2, 'It tells the reader to pause so the transition is not mixed up with the rest.'),
      O('Write two sentences joined by <b>As a result</b>.', null, 2, 'The ice was thin. As a result, the skating was cancelled.')] },
    'transition-meaning': { goal: 'I can choose a transition that fits.', think: [
      O('Choose the best transition and explain: However, For example, Finally.', 'Many animals hibernate. ______, bears sleep through most of the winter.', 2, 'For example: bears are an example of animals that hibernate.'),
      O('Choose the best transition: However, Then, Therefore.', 'The forecast said sun. ______, it rained all day.', 2, 'However: what happened is the opposite of what was expected.'),
      O('Write three steps for planting a seed. Use a transition in each.', null, 3, 'First, fill a pot. Next, plant the seed. Finally, water it.')] },
    names: { goal: 'I can use capitals for names and titles.', think: [
      O('Fix the capitals.', 'last summer dr. patel visited the canadian museum of history in gatineau.', 2, 'Last summer Dr. Patel visited the Canadian Museum of History in Gatineau.'),
      O('Why is it "my uncle" but "Uncle Raj"?', null, 2, 'Uncle Raj is a name, so it gets a capital. "my uncle" is not a name.'),
      O('Write a book title with correct capitals. Which small words stay lower case?', null, 3, 'The Girl Who Saw the Lights: small words like the, of, and stay lower case unless first.')] }
  } });
})();
