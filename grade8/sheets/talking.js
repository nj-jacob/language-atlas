/* Grade 8 Listening and Speaking: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/talking.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B1.1 to B1.5 listening and speaking. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('talking', { code: 'TK', ideas: {
    paraphrase: { goal: 'I can paraphrase what someone said to show I understood.',
      think: [O('Paraphrase: "I think the town should build a skate park, because kids have nowhere safe to go after school."', 2, 'So you are saying the town needs a skate park because young people need a safe place after school.'),
        O('How is a paraphrase different from repeating?', 2, 'It keeps the meaning but uses your own words, and adds no opinion.'),
        O('Write a sentence starter you could use to begin a paraphrase.', 1, 'For example: "So what you mean is ..." or "In other words ..."')] },
    open: { goal: 'I can ask open questions that keep a discussion going.',
      think: [O('Turn into an open question: "Did you like the book?"', 1, 'For example: What did you think of the ending, and why?'),
        O('Why do open questions help a group discussion?', 2, 'They invite longer answers, reasons and new ideas instead of yes or no.'),
        O('Write two open questions for a talk about screen time.', 2, 'For example: How does screen time affect your sleep? What would a fair family rule look like?')] },
    clarify: { goal: 'I can ask to clarify and listen for evidence.',
      think: [O('A speaker says "Most people agree." What clarifying question could you ask?', 1, 'For example: Who agrees, and how do you know?'),
        O('Why is a clarifying question a strength?', 2, 'It shows you are listening closely and want to understand before you respond.'),
        O('While listening to a podcast, what would you note as evidence?', 2, 'Facts, numbers, examples and who said them.')] },
    audience: { goal: 'I can fit my speaking to a formal or informal audience.',
      think: [O('Rewrite for a principal: "Hey, so basically we want, like, a longer lunch."', 2, 'For example: Good morning. Our class would like to ask for a longer lunch break.'),
        O('Name two differences between a formal talk and a chat with friends.', 2, 'Formal: complete sentences, no slang, planned order. Informal: relaxed words, shorter turns.'),
        O('Who is the audience for a speech at a Remembrance Day assembly? How should you speak?', 2, 'The whole school, families and veterans; slowly, respectfully and clearly.')] },
    body: { goal: 'I can use body language that supports what I say.',
      think: [O('Name three things your body can do to show you are listening.', 2, 'Face the speaker, nod, keep a calm posture, stay still.'),
        O('Why might eye contact mean different things in different cultures?', 2, 'In some cultures direct eye contact shows respect; in others, looking down does.'),
        O('What could you do with your hands and voice to stress a key point in a talk?', 2, 'Pause before it, slow down, use one open gesture.')] },
    precise: { goal: 'I can use precise words and smooth links when I explain.',
      think: [O('Make it precise: "The thing in the plant makes food from the stuff in the sun."', 2, 'Chlorophyll in the leaves uses energy from sunlight to make food.'),
        O('Replace "and then" with better links: "We mixed it and then heated it and then it changed colour."', 2, 'First we mixed it. Next we heated it. As a result, it changed colour.'),
        O('List four linking words that help listeners follow an explanation.', 1, 'Any four of: first, next, because, as a result, however, finally, for example.')] }
  } });
})();
