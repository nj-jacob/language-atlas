/* Grade 2 Sentences: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/sentences.js.
   Ontario 2023 Language: B3.1 telling, command, asking and strong feeling sentences, and compound sentences; B3.2 joining words. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('sentences', { code: 'SE', ideas: {
    kinds: { goal: 'I can name the four kinds of sentences.', think: [
      O('Write one of each: telling, asking, command, strong feeling.', 'For example: It is cold. Is it cold? Put on your hat. It is so cold!', 4),
      O('“Stop!” ends with !. Is it a strong feeling sentence or a command? Tell why.', 'A command: it tells someone what to do.'),
      O('Why does a writer use different kinds of sentences?', 'To ask, tell, give steps or show feeling, and to keep it interesting.')] },
    command: { goal: 'I can write a command that tells someone what to do.', think: [
      O('Write three commands to help a friend plant a seed.', 'For example: Fill the cup with soil. Push in the seed. Water it.'),
      O('Where do you see commands in real life?', 'For example: recipes, signs, game rules.'),
      O('Change “You can close the door.” into a command.', 'Close the door, please.', 2)] },
    'ask-order': { goal: 'I can build an asking sentence.', think: [
      O('Turn this into an asking sentence: “The bus is here.”', 'Is the bus here?', 2),
      O('Write two questions you would ask a new classmate.', 'For example: What is your name? Do you like soccer?'),
      O('Which words can start a question? Write four.', 'For example: Who, What, Where, Can, Is, Do.', 2)] },
    compound: { goal: 'I can join two sentences into one.', think: [
      O('Join: “I was hungry.” “I ate an apple.”', 'I was hungry, so I ate an apple.', 2),
      O('Why might a writer join two short sentences?', 'So the writing flows and is not choppy.'),
      O('Write your own joined sentence about the weekend.', 'Any two ideas joined with and, but, or or so.')] },
    'join-words': { goal: 'I can choose and, but, or, or so to join ideas.', think: [
      O('Finish three ways: “I wanted to play outside, …” with but, so and and.', 'For example: but it rained; so I put on my boots; and my sister came too.', 4),
      O('When do you use but?', 'When the second part is a surprise or goes against the first.'),
      O('Write a sentence that gives a choice with or.', 'For example: We can read a book or go for a walk.')] }
  } });
})();
