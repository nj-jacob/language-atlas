/* Grade 2 Reading for Meaning: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/reading.js; its passages print as Read sheets.
   Ontario 2023 Language: C1.1 read and understand, C1.2 text forms, C1.6 narrator, C2.2 purpose, C2.3 predict,
   C2.4 monitor, C2.6 main idea and sequence. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find the answer in the text.', think: [
      O('Why should you point to the words in the text when you answer?', 'To prove the answer is in the text and not a guess.'),
      O('Read a page of your book. Write a question and the sentence that answers it.', 'A question and the exact sentence from the book.', 4),
      O('What do you do if you cannot find the answer?', 'Reread, look at the pictures and headings, and look for key words.')] },
    'main-idea': { goal: 'I can tell the main idea.', think: [
      O('What is the difference between the main idea and a detail?', 'The main idea is what the whole text is about. A detail is one small part.'),
      O('Tell the main idea of a book you read this week in one sentence.', 'One sentence about the whole book.'),
      O('Why is “The kite was red” not the main idea of a story about a lost kite?', 'It is only a detail. The story is about losing and finding the kite.')] },
    sequence: { goal: 'I can tell what happened first, next and last.', think: [
      O('Write three steps for brushing your teeth, in order.', 'For example: Put on toothpaste. Brush. Rinse.', 4),
      O('Which words help show order? Write three.', 'For example: first, next, then, last.', 2),
      O('Why does order matter in a story?', 'If the events are mixed up, the story does not make sense.')] },
    predict: { goal: 'I can predict with a clue from the text.', think: [
      O('A boy packs a bucket, a towel and sunscreen. Predict where he is going. What are the clues?', 'The beach. The clues are the bucket, towel and sunscreen.'),
      O('What makes a prediction good?', 'It uses a clue from the text or pictures.'),
      O('Look at the cover of a new book. Write a prediction and your clue.', 'A prediction and the clue that supports it.')] },
    'fix-up': { goal: 'I can fix it when my reading does not make sense.', think: [
      O('Write two things you can do when a sentence does not make sense.', 'For example: reread it; picture it in my head; ask a question.'),
      O('Why should you stop when the meaning is lost?', 'If you keep going, you will not understand the rest.'),
      O('Which fix-up strategy helps you the most? Tell why.', 'Any strategy with a reason.')] },
    purpose: { goal: 'I can tell why I am reading.', think: [
      O('Name a text you read for fun and one you read to find facts.', 'For example: a comic for fun; a map for facts.'),
      O('How do you read a recipe differently from a story?', 'A recipe is read slowly, step by step; a story is read to enjoy.'),
      O('Why do you read a bus schedule?', 'To find out when the bus comes.')] },
    forms: { goal: 'I can tell what kind of text I am reading.', think: [
      O('How can you tell a story from an information text?', 'A story has characters and events. Information has facts.'),
      O('Name three kinds of texts you saw this week.', 'For example: a poem, a sign, a letter.', 2),
      O('Why do instructions have numbers?', 'So you do the steps in order.')] },
    narrator: { goal: 'I can tell who is telling the story.', think: [
      O('“I ran to the door.” Who is telling it? How do you know?', 'A character in the story. The word “I” shows it.'),
      O('Rewrite as if Kai tells it: “Kai ran across the field.”', 'I ran across the field.', 2),
      O('How would the story change if the dog told it?', 'We would hear what the dog sees and feels.')] }
  } });
})();
