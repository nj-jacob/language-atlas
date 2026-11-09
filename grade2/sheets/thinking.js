/* Grade 2 Thinking About Texts: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/thinking.js.
   Ontario 2023 Language: C1.3 text patterns and features, C1.4 images and design, C1.5 style, C3.1 consonance and simile,
   C3.2 inferences, C3.3 compare, C3.5 perspectives. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('thinking', { code: 'TH', ideas: {
    features: { goal: 'I can use the parts of a text to find facts.', think: [
      O('How does a contents page help you?', 'It tells which page has the part you need, so you can jump there.'),
      O('Why might a book about birds use a chart?', 'To show many facts at once, so you can compare them.'),
      O('Draw an icon for a fire exit. Tell what it means.', 'A simple picture, such as a person running to a door.', 4)] },
    journal: { goal: 'I can read a journal day by day.', think: [
      O('How is a journal set out?', 'One entry for each day, with the date at the top, in order.'),
      O('Write a short journal entry for today.', 'The date, then what happened and how I felt.', 4),
      O('Why does a journal use the word I?', 'The writer tells about their own days.')] },
    'word-choice': { goal: 'I can find words that paint a picture.', think: [
      O('Make it paint a picture: “The cat sat.”', 'For example: The fluffy grey cat curled up on the warm rug.', 2),
      O('Why is “crunchy” better than “nice” for an apple?', 'You can hear and feel crunchy. “Nice” could mean anything.'),
      O('Write three words that tell how snow feels.', 'For example: cold, soft, crunchy.', 2)] },
    simile: { goal: 'I can find and write a simile.', think: [
      O('Finish the simile: “The moon was as round as a ___.”', 'For example: plate, coin.', 2),
      O('What does a simile do?', 'It compares two things with like or as, to help you picture something.'),
      O('Write a simile about the wind.', 'For example: The wind howled like a wolf.')] },
    consonance: { goal: 'I can hear sounds that come back.', think: [
      O('Which sound comes back in “Tap, tip, tap, it taps and drips”?', 'The /t/ sound (and /p/).'),
      O('Why do poets repeat sounds?', 'It makes the words fun to say and helps you hear the picture.'),
      O('Write a line where the /s/ sound comes back.', 'For example: The snake slides past the sand.')] },
    infer: { goal: 'I can work out what is not said.', think: [
      O('Mei stamped her foot and crossed her arms. How does she feel? How do you know?', 'Angry or upset. Stamping and crossed arms show it.'),
      O('Write a sentence that shows a character is cold without saying “cold”.', 'For example: Ben shivered and pulled his hat over his ears.'),
      O('What two things do you use to work out what is not said?', 'Clues in the text and what I already know.')] },
    compare: { goal: 'I can tell how two things are the same and different.', think: [
      O('Write one way a story and a poem are the same and one way they are different.', 'Both tell ideas with words. A poem has lines and often rhythm; a story has events.'),
      O('Compare two characters from books you know.', 'One thing that is the same and one that is different.', 4),
      O('Which words show something is the same? Different?', 'Same: both, also, too. Different: but, however.', 2)] },
    perspective: { goal: 'I can tell what the writer thinks.', think: [
      O('Amara writes that the yard needs a bench. What does she think? Give one reason she gives.', 'She thinks a bench would help. For example: students get tired at recess.'),
      O('How can the writer’s view change what a reader thinks?', 'Good reasons can make the reader agree.'),
      O('Write what you think about longer recess and one reason.', 'An opinion and one reason.')] }
  } });
})();
