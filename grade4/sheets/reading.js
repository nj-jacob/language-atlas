/* Grade 4 Reading for Meaning: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/reading.js; its passages print as Read sheets and its activities as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: C1.1, C1.2, C1.6, C2.2, C2.3, C2.4 and C2.6 (and C1.7, C2.1, C2.5, C2.7 through the activities). */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 4, key: key }; }

  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find an answer in the text.', think: [
      L('How do key words in a question help you find the answer?', 'Look for the same or similar words in the text, then read around them.'),
      L('Why should you go back to the text instead of guessing?', 'The answer is there, so you can prove it.'),
      L('Write a question about a book you read, and where the answer is.', 'Any question with the page or part named.') ] },
    'main-details': { goal: 'I can find the main idea and the details that support it.', think: [
      L('Main idea: "Snowshoe hares are built for winter." Write two supporting details.', 'For example: their fur turns white; their big back feet keep them on top of the snow.', 5),
      L('How is the main idea different from a detail?', 'The main idea is what the whole part is about; details tell more about it.'),
      L('Where do you often find the main idea in a paragraph?', 'Often in the first or last sentence.') ] },
    sequence: { goal: 'I can retell events in order.', think: [
      L('Write three order words you can use when you retell.', 'For example: first, next, then, after that, finally.'),
      L('Why does order matter when you retell a story?', 'Events cause other events, so the story only makes sense in order.'),
      L('Retell your morning in three steps.', 'Three steps in order with order words.') ] },
    conclude: { goal: 'I can draw a conclusion from clues.', think: [
      L('"Jun wiped his forehead and gulped his water." What can you conclude? What clues tell you?', 'He is hot or tired. Clues: wiping his forehead, gulping water.', 5),
      L('How is a conclusion different from a guess?', 'A conclusion uses clues from the text plus what you know.'),
      L('Write two clues that show a character is nervous.', 'For example: her hands shook; she bit her lip.') ] },
    predict: { goal: 'I can predict, then check.', think: [
      L('What do you use to make a prediction?', 'The title, pictures, clues in the text and what you know.'),
      L('Your prediction was wrong. Is that bad? Explain.', 'No. You change it with the new clues. That is how good readers think.'),
      L('A story is called "The Ice Gives Way." Predict what happens and tell why.', 'Any prediction tied to the title.') ] },
    monitor: { goal: 'I can fix it when I am lost.', think: [
      L('Name three things you can do when a part makes no sense.', 'Reread, slow down, read on, look at the pictures, ask a question.'),
      L('How do you know you are lost while reading?', 'You cannot say what just happened, or a word or idea does not make sense.'),
      L('Which fix-up strategy helps you most? Why?', 'Any strategy with a reason.') ] },
    choose: { goal: 'I can choose a text for my purpose.', think: [
      L('You want to learn how to build a birdhouse. What kind of text do you choose? Why?', 'A how-to (procedure) text: it gives the steps.'),
      L('How can the cover and contents page help you choose?', 'They show the topic and what is inside.'),
      L('Why might you choose a different book for fun than for a project?', 'The purpose is different: enjoyment or facts.') ] },
    forms: { goal: 'I can tell the features of different kinds of texts.', think: [
      L('Name two features of a news report.', 'For example: a headline, who, what, when, where and why, facts.'),
      L('How is a poem different from a recipe?', 'A poem has lines and sounds for feeling; a recipe has ingredients and steps.'),
      L('Which kind of text has a problem and a solution? Explain.', 'A story (narrative): the characters face a problem and solve it.') ] },
    narrator: { goal: 'I can tell first, second and third person.', think: [
      L('Write the same sentence in first person and in third person.', 'For example: I paddled across. / She paddled across.'),
      L('Which words tell you a text is in first person?', 'I, me, my, we, us.'),
      L('Why might an author tell a story in first person?', 'So the reader sees the thoughts and feelings of the person telling it.') ] }
  } });
})();
