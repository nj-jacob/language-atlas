/* Grade 2 Planning Writing: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/planning.js.
   Ontario 2023 Language: D1.1 topic, purpose and audience; D1.2 ideas; D1.3 three sources; D1.4 sort and order; D1.5 strategies. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('planning', { code: 'PL', ideas: {
    topic: { goal: 'I can choose a topic that is not too big.', think: [
      O('“Animals” is too big. Make it a smaller topic.', 'For example: how my dog Biscuit learned to sit.', 2),
      O('Write three topics you could write about.', 'Three small, clear topics.'),
      O('Why is a small topic easier to write about?', 'You can tell more about it and stay on topic.')] },
    purpose: { goal: 'I can tell why I am writing.', think: [
      O('Write a reason to write a letter, a list and a story.', 'For example: to say thank you; to remember; to entertain.'),
      O('You want your class to help clean the park. What is your purpose?', 'To persuade them to help.', 2),
      O('Why should you know your purpose before you start?', 'The purpose decides what the writing looks like.')] },
    audience: { goal: 'I can think about who will read my writing.', think: [
      O('How would a note to your teacher be different from a note to your best friend?', 'The teacher’s note is more polite and formal.'),
      O('Who could read a poster about a lost cat?', 'Neighbours, people walking by.', 2),
      O('Why does a writer think about the audience?', 'To choose words the reader will understand and like.')] },
    ideas: { goal: 'I can keep ideas that fit the topic.', think: [
      O('Topic: my trip to the lake. Cross out the idea that does not fit: swimming, canoe, my math test.', 'my math test', 2),
      O('Write three ideas for the topic “winter fun”.', 'For example: skating, a snow fort, hot cocoa.', 2),
      O('Which helps you most to get ideas: talking, drawing or reading? Why?', 'Any strategy with a reason (D1.5).')] },
    sources: { goal: 'I can find facts in three places.', think: [
      O('Name three places to find facts about beavers.', 'For example: a library book, a website a grown-up checks, an expert at a nature centre.'),
      O('Can a made-up story be a source of facts? Why?', 'No. A made-up story is not true.'),
      O('Why use more than one source?', 'To check the facts and learn more.')] },
    order: { goal: 'I can sort my ideas and put them in order.', think: [
      O('Number these in order for how to make toast: butter it, put bread in the toaster, take it out.', '1 put bread in, 2 take it out, 3 butter it', 2),
      O('Why do you sort ideas before you write?', 'So ideas that go together stay together and the order makes sense.'),
      O('Which strategy helped you plan your last piece of writing?', 'Any strategy, such as a list, a web or a drawing (D1.5).')] }
  } });
})();
