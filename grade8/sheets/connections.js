/* Grade 8 Skills and Connections: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/connections.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: A1.1 transferable skills, A3.1 language across subjects, A3.2 identity. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('connections', { code: 'CN', ideas: {
    skills: { goal: 'I can explain how transferable skills help me communicate.',
      think: [O('Name the seven transferable skills.', 5, 'Critical thinking and problem solving; innovation, creativity and entrepreneurship; self-directed learning; collaboration; communication; global citizenship and sustainability; digital literacy.'),
        O('How would you use collaboration in a group presentation?', 4, 'Share tasks, listen to each other, combine ideas, give feedback.'),
        O('How might you change how you communicate with someone from another culture?', 4, 'Speak clearly, listen carefully, notice different customs, ask respectfully when unsure.')] },
    everywhere: { goal: 'I can use language skills in every subject.',
      think: [O('How does close reading help you in Math?', 4, 'You catch key words and details in word problems.'),
        O('Which language skill helps you most in Science? Why?', 4, 'Any skill with a reason, for example summarizing results in a lab report.'),
        O('Give an everyday example of using language skills outside school.', 4, 'For example: reading instructions, writing a message, comparing reviews.')] },
    belonging: { goal: 'I can explore identity and belonging in the texts I read.',
      think: [O('Choose a character from a book. How does their culture shape who they are?', 5, 'A character, a cultural element, and its effect on the character.'),
        O('What helps a character feel they belong somewhere?', 4, 'For example: family, language, community, being accepted.'),
        O('How does reading about different lives help you understand others?', 4, 'It shows other experiences and builds empathy.')] }
  } });
})();
