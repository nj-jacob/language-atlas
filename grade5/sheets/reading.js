/* Grade 5 Reading for Meaning: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/reading.js, and its Read and answer sets print as Read sheets; this file adds each idea's "I can" goal and its
   Think questions (open, marked by a grown-up). Ontario 2023 Language: C1.1, C1.2, C1.6, C2.2 to C2.6. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }
  var CANOE = W.sent('Every spring, Nokomis and her grandson Eli patch the old birchbark canoe. They peel fresh bark from fallen trees, ' +
    'stitch it with spruce root and seal the seams with warm pitch. By June the canoe is ready, and they paddle it across the lake to visit cousins.');

  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find information the text states.', think: [
      O('What three materials do they use to fix the canoe?', 'Birchbark, spruce root and pitch.', 2, CANOE),
      O('When is the canoe ready? Copy the words that tell you.', 'In June: "By June the canoe is ready".', 2, CANOE),
      O('How do you find a fact quickly in a long text?', 'Look for a key word from the question, then read the sentences around it.', 2)] },
    summary: { goal: 'I can sum up the main idea and key details in order.', think: [
      O('Sum up the paragraph in two sentences.', 'Nokomis and Eli fix their birchbark canoe each spring with bark, spruce root and pitch. When it is ready in June, they paddle to see family.', 3, CANOE),
      O('What did you leave out of your summary? Why?', 'Small details, like that the trees were fallen or the pitch was warm. A summary keeps only the most important ideas.', 2),
      O('Why should a summary keep the events in order?', 'So the reader can follow what happened first, next and last.', 2)] },
    conclude: { goal: 'I can draw a conclusion the text supports.', think: [
      O('What can you conclude about how Nokomis feels about the canoe? Give evidence.', 'She cares about it and wants to keep it. She fixes it every year with care and uses it to stay close to family.', 3, CANOE),
      O('A classmate concludes that the canoe is new. Is that supported? Explain.', 'No. The text calls it "the old birchbark canoe" and says they patch it every spring.', 2),
      O('What makes a conclusion well supported?', 'It uses clues from the text, not just guesses, and fits all the evidence.', 2)] },
    predict: { goal: 'I can predict and then check my prediction.', think: [
      O('Read the title. Predict what the story is about.', 'For example: someone gets lost in a snowstorm, or a dog leads a family home in the snow. Any prediction linked to the title.', 2, W.sent('<b>The Snowstorm That Stopped the Bus</b>')),
      O('What clues help you make a strong prediction?', 'The title, pictures, headings, what has happened so far, and what you already know.', 2),
      O('Your prediction was wrong. Is that bad? Explain.', 'No. Checking and changing a prediction shows you are thinking as you read.', 2)] },
    monitor: { goal: 'I can notice when I am lost and use a strategy to fix it.', think: [
      O('List three things you can do when a paragraph does not make sense.', 'For example: reread, slow down, read ahead, picture it, look up a word, ask a question.', 3),
      O('What tells you that you have lost the meaning?', 'You cannot say what you just read, the words do not make a picture, or you feel confused.', 2),
      O('Which strategy helps you most? Why?', 'Answers vary. For example: rereading slowly, because I catch the part I missed.', 2)] },
    choose: { goal: 'I can choose a text that fits my purpose.', think: [
      O('You want to learn how beavers build dams. Which text would you choose: a poem, an encyclopedia entry or a comic? Why?', 'An encyclopedia entry, because it gives facts and explanations.', 2),
      O('Name a text you would choose for fun and one you would choose to learn.', 'Answers vary. For example: a graphic novel for fun; a nonfiction book about volcanoes to learn.', 2),
      O('Why is it good to read texts by creators from many communities?', 'You learn different experiences and points of view, and you may see your own life in them.', 2)] },
    forms: { goal: 'I can name a text form and explain how it helps the meaning.', think: [
      O('How is a recipe set out? Why does that help?', 'A list of ingredients then numbered steps, so the reader can follow along in order.', 2),
      O('Name two features of a letter.', 'For example: a greeting (Dear ...), a closing (Sincerely), the date.', 2),
      O('How is a legend different from a news report?', 'A legend is a traditional story that teaches or explains; a news report gives facts about real recent events.', 2)] },
    narrator: { goal: 'I can tell if a story is in first, second or third person.', think: [
      O('Which person is this? How do you know?', 'First person. The narrator uses "I".', 2, W.sent('I held my breath as the moose stepped onto the road.')),
      O('Rewrite the sentence above in third person.', 'For example: Lina held her breath as the moose stepped onto the road.', 2),
      O('Give one advantage and one disadvantage of a first-person narrator.', 'Advantage: you feel the character\'s thoughts. Disadvantage: you only know what that one person knows.', 3)] }
  } });
})();
