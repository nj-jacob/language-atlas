/* Grade 5 Listening and Speaking: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/talking.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Talks and discussions themselves are activity sheets. Ontario 2023 Language: B1.1 to B1.5. Written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('talking', { code: 'TA', ideas: {
    'say-more': { goal: 'I can ask a question that invites a speaker to say more.', think: [
      O('Your friend says, "I went to the powwow on the weekend." Write a question that invites more.', 'For example: What was your favourite part? / What did you see there? (Open questions, not yes or no.)', 2),
      O('Why is "Did you like it?" not the best question to invite more?', 'It can be answered with one word. An open question (what, how, why) gets a longer answer.', 2),
      O('Write two more "tell me more" questions you could use in a group.', 'For example: Can you give an example? What made you think that?', 2)] },
    'build-on': { goal: 'I can build on what others say in a discussion.', think: [
      O('Someone says, "We should plant a garden at school." Build on the idea.', 'For example: Yes, and we could grow the Three Sisters: corn, beans and squash.', 2),
      O('Write a polite way to disagree.', 'For example: I see it differently because ... / That is a good point, but what about ...?', 2),
      O('Why is building on ideas better than just giving a new one?', 'It shows you listened, connects ideas, and helps the group move forward together.', 2)] },
    purpose: { goal: 'I can listen for the purpose of what I hear.', think: [
      O('What is the purpose of this message? How do you know?', 'To persuade. It tells you to come and gives a reason (it is the best).', 2, W.sent('"Come to the best bake sale in town this Friday!"')),
      O('Name a message you heard this week. Was it meant to inform, persuade or entertain?', 'Answers vary. For example: the weather report informs.', 2),
      O('How does knowing the purpose help you listen?', 'You know what to listen for, and whether to believe or question it.', 2)] },
    paraphrase: { goal: 'I can paraphrase: say the same meaning in new words.', think: [
      O('Paraphrase this announcement.', 'For example: Bring a lunch and outdoor clothes on Thursday, because we are going to the conservation area.', 3, W.sent('"Thursday\'s trip to the conservation area requires a packed lunch and clothing suitable for the weather."')),
      O('What is the difference between paraphrasing and copying?', 'Paraphrasing keeps the meaning but uses your own words. Copying uses the same words.', 2),
      O('When would paraphrasing help in a group discussion?', 'To check you understood someone, or to explain an idea to someone who missed it.', 2)] },
    body: { goal: 'I can use and read body language to help a message.', think: [
      O('What might crossed arms and a frown tell you?', 'The person might be upset, unsure or disagreeing.', 2),
      O('List two things you can do with your body to show you are listening.', 'For example: face the speaker, nod, keep calm eye contact, lean in. (Respect that some cultures show listening differently.)', 2),
      O('Why should your face match your words when you give a talk?', 'If they do not match, listeners get mixed messages and may not trust your words.', 2)] },
    vivid: { goal: 'I can choose vivid words to help listeners picture my ideas.', think: [
      O('Make the sentence vivid. Change the plain words.', 'For example: The huge grey wave crashed onto the rocks.', 2, W.sent('The big wave hit the rocks.')),
      O('Write two vivid adverbs to describe how someone ran.', 'For example: swiftly, clumsily, wildly.', 2),
      O('Describe your kitchen in one vivid sentence.', 'Any sentence with precise adjectives, verbs or senses. For example: The kitchen smelled of warm cinnamon and buzzed with chatter.', 2)] }
  } });
})();
