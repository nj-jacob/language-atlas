/* Grade 6 Reading Fluently: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/fluency.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B2.3. Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('fluency', { code: 'FL', ideas: {
    phrases: { goal: 'I can read in meaningful phrases.', think: [
      O('Draw a slash / between the phrases.', 'After the storm passed the children ran down to the beach.', 2, 'After the storm passed / the children ran / down to the beach.'),
      O('Why does reading word by word make a text harder to understand?', null, 3, 'The meaning comes in phrases. Word by word, you lose how the words go together.'),
      O('Mark the phrases, then read it aloud twice.', 'Under the old bridge near the market a heron stood very still.', 2, 'Under the old bridge / near the market / a heron stood / very still.')] },
    marks: { goal: 'I can let punctuation guide my voice.', think: [
      O('How should your voice change at each mark? (comma, question mark, exclamation mark)', 'Wait, is that a moose? It is!', 3, 'Short pause at the comma; voice goes up at the question; strong and excited at the exclamation.'),
      O('Read both aloud. How does the comma change the meaning?', 'Let\'s eat, Grandma! / Let\'s eat Grandma!', 3, 'With the comma, we are talking to Grandma. Without it, it sounds like we will eat her.'),
      O('Write a sentence with a comma, a dash and a question mark. Say how to read each.', null, 3, 'Any sentence; pause at the comma, longer pause at the dash, voice up at the question mark.')] },
    pace: { goal: 'I can change my pace to fit my purpose.', think: [
      O('Would you read faster or slower? Why? A recipe you are following.', null, 2, 'Slower: you need every step and amount.'),
      O('Would you read faster or slower? Why? A comic for fun.', null, 2, 'Faster: you read for enjoyment and the main events.'),
      O('Name a time you slowed down while reading. What made you slow down?', null, 3, 'Any honest example, such as a science page with new words.')] },
    expression: { goal: 'I can make my voice fit the words.', think: [
      O('How should you read this line? Why?', '"Please," whispered Ana, "don\'t wake the baby."', 2, 'Quietly and gently: she is whispering so the baby stays asleep.'),
      O('How should you read this line? Why?', '"We won!" shouted Jamal, jumping on the bench.', 2, 'Loud and excited: he is shouting and jumping.'),
      O('Write a line of dialogue. Under it, write how it should sound.', null, 3, 'Any line with a matching tone, such as nervous, proud or tired.')] },
    stress: { goal: 'I can stress a word to change the meaning.', think: [
      O('Read it two ways. What does each mean? <b>I</b> didn\'t take your pen. / I didn\'t take <b>your</b> pen.', null, 3, 'First: someone else took it. Second: I took someone else\'s pen.'),
      O('Which word would you stress to show surprise about the time?', 'You finished the book in one day?', 2, 'one (or day): stress the amount of time.'),
      O('Why does stress matter when you read a script aloud?', null, 2, 'It shows the character\'s meaning and feelings to the listener.')] }
  } });
})();
