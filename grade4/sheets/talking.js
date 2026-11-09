/* Grade 4 Listening and Speaking: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/talking.js; the speaking activities print as Activity sheets with their rubric. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: B1.1 to B1.5 listening and speaking. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 4, key: key }; }

  S.register('talking', { code: 'TA', ideas: {
    'ask-more': { goal: 'I can ask a question that gets more.', think: [
      L('Your friend says, "I went to Tofino." Write a question that gets more than yes or no.', 'For example: What did you see on the beach there?'),
      L('Why is "Did you like it?" a weak question?', 'It can be answered with yes or no, so you learn little.'),
      L('Write two question starters that get more.', 'For example: How did ...? Why do you think ...? Tell me about ...') ] },
    'build-on': { goal: 'I can build on what others say.', think: [
      L('Someone says, "Recess should be longer." Write a reply that builds on it.', 'For example: I agree, and longer recess would also give us time to eat.'),
      L('Write a polite way to disagree.', 'For example: I see your point, but I think ...'),
      L('Why should you name the idea you are building on?', 'So others know which idea you mean and the talk stays connected.') ] },
    clarify: { goal: 'I can show I am listening and ask to check.', think: [
      L('Write a question that checks you understood.', 'For example: Do you mean that ...?'),
      L('Name two ways your body shows you are listening.', 'For example: face the speaker, nod, keep still.'),
      L('Why ask a question instead of guessing what someone meant?', 'You get the right meaning and the speaker feels heard.') ] },
    audience: { goal: 'I can fit my words to my listener.', think: [
      L('How would you tell a five-year-old about recycling? How would you tell your teacher?', 'Simple words and short sentences for the child; more detail and exact words for the teacher.', 5),
      L('Why do you speak differently to a friend and to a principal?', 'The listener and the purpose are different, so the words change.'),
      L('Write one sentence inviting an Elder to your class.', 'A polite, respectful invitation.') ] },
    restate: { goal: 'I can say it again in my own words.', think: [
      L('Retell in your own words: "Beavers build dams so the water rises and keeps their lodge safe."', 'For example: Beavers make the water deeper to protect their home.'),
      L('Why is restating better than copying the words?', 'It shows you understood the meaning.'),
      L('What is one thing to leave out when you restate?', 'Small details that are not the main point.') ] },
    body: { goal: 'I can use my face and hands to help me speak.', think: [
      L('How could your face show surprise when you tell a story?', 'Eyes wide, mouth open, eyebrows up.'),
      L('Why might you hold up fingers when you say "three reasons"?', 'It helps listeners follow and count.'),
      L('What should your body do when you present?', 'Stand tall, face the audience, look at people.') ] },
    detail: { goal: 'I can add describing words so the listener can picture it.', think: [
      L('Make it a picture: "I saw a bird."', 'For example: I saw a small red bird with a black mask on its face.'),
      L('Which senses can you use to describe a campfire?', 'Sight, sound, smell, touch (heat).'),
      L('Describe your favourite place in one sentence with three details.', 'Any sentence with three clear details.') ] }
  } });
})();
