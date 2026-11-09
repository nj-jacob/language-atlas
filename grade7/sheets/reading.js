/* Grade 7 Reading for Meaning: the hand-written part of the printable worksheets (the rest is made from chapters/reading.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, C1.1, C2.2 to C2.6.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find the evidence in the text.', think: [
      T('Why should your answer come from the text, not only from what you already know?', '', 'The question is about this text. Your answer must match what the writer says.'),
      T('How can you find evidence fast in a long text?', '', 'Look for key words from the question, skim the headings and topic sentences, then read closely.'),
      T('A friend answers without looking back at the text. What would you tell them?', '', 'Go back and find the sentence that proves it. Point to it or quote it.')] },
    ties: { goal: 'I can follow the words that tie a text together.', think: [
      T('What does "it" mean? How do you know?', 'The dog chased the cat up a tree. It barked until we came out.', 'The dog. A tree and a cat do not bark. Put "the dog" in place of "it" and reread: it makes sense.'),
      T('What do words like "this", "these" and "however" do in a text?', '', 'They point back to earlier ideas or show how ideas connect, so the text holds together.'),
      T('Write two sentences where a pronoun ties the second back to the first.', '', 'For example: "The geese landed on the pond. They rested before flying south."')] },
    'main-idea': { goal: 'I can summarize the main idea and key details.', think: [
      T('How is a summary different from a retelling?', '', 'A summary is short: the main idea and key support. A retelling gives everything in order.'),
      T('Summarize a book or show you know in two sentences.', '', 'One sentence for the main idea, one for the key details. No small details.'),
      T('Why do people summarize texts they read for school?', '', 'It helps them remember the big idea and check they understood.')] },
    conclude: { goal: 'I can draw a conclusion the text supports.', think: [
      T('Why might this conclusion go too far?', 'The text says one fox was seen in town. Conclusion: foxes always live in towns.', '"Always" goes beyond the evidence. One fox only shows foxes can come into town.'),
      T('What makes a conclusion well supported?', '', 'Several clues from the text point to it, and nothing in the text contradicts it.'),
      T('Write a conclusion from these facts.', 'The rink was empty. The ice was cracked. A sign was on the gate.', 'For example: "The rink is closed because the ice is not safe."')] },
    predict: { goal: 'I can predict, then check and change my prediction.', think: [
      T('Your prediction was wrong. Is that bad reading? Explain.', '', 'No. Changing your mind when the text proves you wrong is good reading.'),
      T('What two things should a good prediction use?', '', 'What you already know and clues from the text.'),
      T('Write a question you could ask to check a prediction as you read.', '', 'For example: "Did the clue about the storm come true?"')] },
    monitor: { goal: 'I can fix confusion with the right strategy.', think: [
      T('Match a strategy to each problem.', 'a word you do not know · a confusing event · a hard diagram', 'Use context or a dictionary; reread or read ahead; visualize or ask a question.'),
      T('Why is rereading the same line again and again not always enough?', '', 'If the problem is a word or missing background, rereading will not fix it. Try another strategy.'),
      T('How do you know when you have stopped understanding?', '', 'You cannot retell what you read, the picture in your head goes blank, or the ideas do not connect.')] },
    purpose: { goal: 'I can choose a text that fits my purpose.', think: [
      T('Which text would you choose to learn how to build a canoe? Explain.', 'a poem about canoes · a step-by-step guide · a canoe race report', 'The step-by-step guide: it is written to teach a process.'),
      T('Why is the first search result not always the best choice?', '', 'It may not fit your purpose or be reliable. Check what the text is for and who made it.'),
      T('Name two purposes for reading and a text for each.', '', 'For example: to enjoy (a novel), to find out (an encyclopedia article).')] }
  } });
})();
