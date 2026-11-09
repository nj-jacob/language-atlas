/* Grade 5 Thinking Critically: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/thinking.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: C3.2, C3.3, C3.5, C3.6. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('thinking', { code: 'TH', ideas: {
    local: { goal: 'I can make an inference from a clue in the text.', think: [
      O('How does Priya feel? Which clue tells you?', 'Nervous. She keeps checking the clock and tapping her foot.', 2, W.sent('Priya checked the clock again and tapped her foot as she waited for her name to be called.')),
      O('What time of year is it? Explain your inference.', 'Autumn (fall). The leaves are red and orange and falling.', 2, W.sent('Red and orange leaves drifted down as Mateo raked the yard.')),
      O('How is an inference different from a guess?', 'An inference uses clues from the text plus what you know. A guess has no evidence.', 2)] },
    global: { goal: 'I can make an inference from the whole text.', think: [
      O('Think of a story you read. What lesson does the whole story teach?', 'Answers vary, with a clear lesson and one detail from the story as evidence.', 3),
      O('Why do you need the whole text for a global inference?', 'The big idea comes from many clues together, not just one sentence.', 2),
      O('Write one detail from the start and one from the end of a story that support its theme.', 'Answers vary. Both details must link to the same theme.', 3)] },
    support: { goal: 'I can find the main idea and the details that support it.', think: [
      O('What is the main idea? Name two supporting details.', 'Main idea: beavers change the land. Details: dams make ponds; ponds give homes to fish and birds.', 3, W.sent('Beavers change the land around them. Their dams turn streams into ponds. These ponds give homes to fish, frogs and birds.')),
      O('Write a detail that would NOT support the main idea above.', 'For example: Beavers have orange teeth. (True, but not about changing the land.)', 2),
      O('Where is the main idea usually found in a paragraph?', 'Often in the first sentence, sometimes the last.', 2)] },
    plots: { goal: 'I can follow two plots in one story.', think: [
      O('A story follows a girl at a hockey tournament and her brother lost in the arena. How might the plots meet?', 'For example: the brother finds his way to the rink just as she scores. Any sensible meeting point.', 3),
      O('How can a writer show the reader that the story is switching plots?', 'A new chapter or section, a line break, a heading, or naming the other character first.', 2),
      O('Why might a writer use two plots?', 'To build suspense, show different points of view, or show how events affect each other.', 2)] },
    perspective: { goal: 'I can identify point of view, fact and opinion.', think: [
      O('Fact or opinion? Explain.', 'Opinion. "Best" is a judgment; people could disagree.', 2, W.sent('Toronto has the best parks in Canada.')),
      O('A store owner and a farmer read about a new highway. How might their points of view differ?', 'The store owner may like it for more customers; the farmer may dislike losing land.', 3),
      O('Rewrite the opinion above as a fact.', 'For example: Toronto has more than 1500 parks. (A statement that can be checked.)', 2)] },
    bias: { goal: 'I can spot bias and voices that are left out.', think: [
      O('Whose voice is missing from this text?', 'The people who use the park now, such as families and dog walkers.', 2, W.sent('The mall company says turning the park into a parking lot will help everyone.')),
      O('How could bias in an ad affect people who read it?', 'They might believe only one side and buy something without thinking.', 2),
      O('What questions can you ask to check for bias?', 'Who wrote it? What do they gain? Whose view is left out? Are both sides shown?', 3)] },
    message: { goal: 'I can explain what a text teaches about inclusion and accessibility.', think: [
      O('A story shows a new ramp so a classmate using a wheelchair can reach the stage. What message does it teach?', 'Everyone deserves to take part, and small changes can include everyone.', 2),
      O('Name a book or show that includes many kinds of people. What does it show?', 'Answers vary. For example: a show with characters of many cultures shows that differences make a community stronger.', 3),
      O('Why is it important for texts to include many kinds of people?', 'Readers see themselves, learn about others, and understand that everyone belongs.', 2)] }
  } });
})();
