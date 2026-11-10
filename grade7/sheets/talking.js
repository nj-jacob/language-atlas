/* Grade 7 Listening and Speaking: the hand-written part of the printable worksheets (the rest is made from chapters/talking.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B1.1 to B1.5.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('talking', { code: 'TA', ideas: {
    relevant: { goal: 'I can ask questions that move a discussion forward.', think: [
      T('A classmate says this. Write a question that builds on it.', 'I think the town should build a skatepark by the arena.', 'For example: "Why by the arena? Would younger kids be able to get there safely?"'),
      T('Why does a good reply start with what the last speaker said?', '', 'It shows you listened, and it keeps the discussion on one idea instead of jumping around.'),
      T('Write one question that moves the talk forward and one that pulls it off topic.', '', 'Forward: "What would it cost?" Off topic: "Did anyone watch the game last night?"')] },
    strategies: { goal: 'I can use listening strategies before, during and after.', think: [
      T('You are about to hear a talk on wildfires. What could you do before it starts?', '', 'Think about what you know, guess what it will cover, and write questions you hope it answers.'),
      T('Why are key words better than writing every word down?', '', 'You can keep up and still listen. Key words are enough to remember the ideas.'),
      T('After a talk, how can you check you understood?', '', 'Retell the main idea, compare notes with someone, or ask the speaker a question to clarify.')] },
    audience: { goal: 'I can suit my speaking to the audience and purpose.', think: [
      T('Who would you say each one to? Explain.', 'Hey, wanna grab a snack? · Would you like to join us for lunch?', 'The first to a friend (informal); the second to an adult or a guest (formal).'),
      T('Why does slang not fit a speech to the school council?', '', 'It is a formal audience. Clear, polite words show respect and help them take you seriously.'),
      T('Rewrite this for a formal talk.', 'This plan is super cool and totally gonna work.', 'For example: "This plan is practical, and I believe it will succeed."')] },
    body: { goal: 'I can use and read body language and expression.', think: [
      T('A speaker crosses their arms and looks at the floor. What might it show? What else could it mean?', '', 'It might show nerves or that they are closed off. In some cultures, looking down shows respect.'),
      T('Why should you not judge everyone\'s body language by one set of rules?', '', 'Gestures and eye contact mean different things in different cultures and for different people.'),
      T('Describe two things you would do with your body to look confident in a talk.', '', 'For example: stand tall, face the audience, use open hand gestures, look up from notes.')] },
    active: { goal: 'I can choose active or passive voice on purpose.', think: [
      T('Which is active and which is passive? Which is clearer here?', 'Kai broke the window. · The window was broken.', 'The first is active, the second passive. The active one is clearer because it says who did it.'),
      T('When might a writer choose passive voice on purpose?', '', 'When the doer is unknown or not important, as in a science report: "The water was heated to 50 °C."'),
      T('Rewrite in active voice.', 'The bannock was made by Grandma.', 'Grandma made the bannock.')] },
    precise: { goal: 'I can choose precise and descriptive words.', think: [
      T('Make this sentence more precise.', 'The dog went across the yard.', 'For example: "The husky bounded across the snowy yard."'),
      T('Is the longest word always the most precise? Explain.', '', 'No. Precise means the most exact word, not the fanciest. "Sprinted" is more precise than "moved quickly".'),
      T('Choose a better verb for "said" in each case: a whisper, a shout, a question.', '', 'For example: murmured, yelled, asked.')] }
  } });
})();
