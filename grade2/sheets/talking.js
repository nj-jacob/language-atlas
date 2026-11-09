/* Grade 2 Listening and Speaking: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/talking.js. Speaking itself is a grown-up activity.
   Ontario 2023 Language: B1.1 listen and ask, B1.2 listening strategies, B1.3 turns and topic, B1.4 face, voice and body, B1.5 word choice. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('talking', { code: 'TA', ideas: {
    interest: { goal: 'I can show I am listening.', think: [
      O('Write two ways your body shows you are listening.', 'For example: I look at the speaker. I nod.'),
      O('Your friend tells you about a new puppy. Write a question you could ask.', 'For example: What is your puppy’s name?'),
      O('Why should your question be about what the person said?', 'It shows you listened and keeps the talk on topic.')] },
    'say-back': { goal: 'I can say back what I heard.', think: [
      O('Gran says, “Wash your hands, then set the table.” Say it back in your own words.', 'First I wash my hands, then I set the table.'),
      O('Why does saying it back help?', 'It helps you remember and shows if you understood.'),
      O('What can you do when you do not understand a message?', 'Ask the person to say it again, or ask a question.')] },
    'turns-topic': { goal: 'I can take turns and stay on topic.', think: [
      O('The class is talking about the farm trip. Write one thing you could say that stays on topic.', 'For example: I liked feeding the goats.'),
      O('How do you know it is your turn to talk?', 'The speaker stops, or looks at me, or asks me.'),
      O('Why do we take turns when we talk?', 'So everyone is heard and the talk makes sense.')] },
    body: { goal: 'I can use my face, voice and body to help me talk.', think: [
      O('How would your face and voice look when you tell exciting news?', 'Big smile, wide eyes, a fast, bright voice.'),
      O('Draw a face that shows surprise. Write one word for it.', 'A face with wide eyes and an open mouth: surprised.', 4),
      O('Why does a flat voice make a story less fun?', 'Listeners cannot hear how the story feels.')] },
    'clear-words': { goal: 'I can choose exact words when I talk.', think: [
      O('Make it clearer: “Put it over there.”', 'For example: Put the red book on the top shelf.', 2),
      O('Why are exact words better than “it” and “there”?', 'The listener knows just what and where you mean.'),
      O('Tell how to find your bedroom from the front door, with exact words.', 'Clear steps with named places, such as “up the stairs, first door on the left”.')] }
  } });
})();
