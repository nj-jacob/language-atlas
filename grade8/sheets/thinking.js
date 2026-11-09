/* Grade 8 Critical Reading: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/thinking.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: C3.1 to C3.6 literary devices, inference, conclusions, culture, bias, inclusion. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('thinking', { code: 'TH', ideas: {
    irony: { goal: 'I can explain irony: the opposite of what is expected.',
      think: [O('Why is this ironic? "The fire station burned down."', 4, 'A fire station is where fires are put out, so we expect it to be safe from fire.'),
        O('Is rain on a picnic day ironic? Explain.', 4, 'No, just bad luck; there is no twist against what we expect.'),
        O('Write your own example of irony.', 4, 'Any situation where the result is the opposite of what is expected.')] },
    satire: { goal: 'I can explain what a satire exaggerates and what it criticizes.',
      think: [O('A fake ad sells "Phone Glue: never look up again!" What is it criticizing?', 4, 'People spending too much time looking at their phones.'),
        O('Why do writers use satire instead of saying it directly?', 4, 'Humour and exaggeration make people notice and think.'),
        O('Name one habit or problem you could satirize, and how.', 4, 'Any topic with an exaggeration that makes the point.')] },
    allusion: { goal: 'I can explain what an allusion borrows and why.',
      think: [O('"Our goalie was a real Goliath." What does this allude to? What does it mean?', 4, 'The story of David and Goliath; the goalie was huge.'),
        O('What should you do when a name seems out of place in a text?', 4, 'Check whether it is an allusion: look it up.'),
        O('Why might an allusion not work for every audience?', 4, 'Readers who do not know the story will miss the meaning.')] },
    infer: { goal: 'I can make an inference and prove it with evidence.',
      think: [O('"Mila checked the clock again and tapped her foot." What can you infer? What is your evidence?', 4, 'She is impatient or waiting for someone; she keeps checking the time and tapping.'),
        O('What is the difference between an inference and a guess?', 4, 'An inference is backed by clues in the text; a guess is not.'),
        O('Make an inference about the main character of a book you know. Give two clues.', 5, 'An inference plus two pieces of evidence.')] },
    conclude: { goal: 'I can draw a conclusion that stays within the evidence.',
      think: [O('Two students in a class got sick after lunch. Can you conclude the cafeteria food is unsafe? Why?', 4, 'No. Two cases are not enough evidence; there could be other causes.'),
        O('What would you need to make the conclusion stronger?', 4, 'More cases, a pattern, test results.'),
        O('Write a conclusion that fits: "Bird counts at the marsh fell each year for five years."', 4, 'For example: Fewer birds are using the marsh; more study is needed to find out why.')] },
    culture: { goal: 'I can explain a cultural element in a text and what it means to the people in it.',
      think: [O('Name three kinds of cultural elements that can appear in a text.', 4, 'Any three of: norms, values, social hierarchy, language, food, ceremonies, taboos, past times.'),
        O('Why should you ask what a custom means to the people in the text before judging it?', 4, 'It shows respect and helps you understand the story from inside that culture.'),
        O('Describe a custom from your own life. How might a reader from elsewhere see it?', 5, 'A custom plus an outside view.')] },
    bias: { goal: 'I can spot bias and suggest a fairer way to say it.',
      think: [O('"Only lazy people take the bus." What is biased about this? Rewrite it fairly.', 4, 'It insults a group with no evidence. Fair: Many people take the bus to save money or reduce pollution.'),
        O('Can a text with real facts still be biased? Explain.', 4, 'Yes. It can choose only the facts that support one side.'),
        O('Name two ways a writer can avoid bias.', 4, 'Use neutral words, give more than one side, cite reliable sources.')] },
    inclusion: { goal: 'I can identify each position in a discussion about inclusion or accessibility.',
      think: [O('A school debates adding a ramp or keeping the stairs only. Name two positions and one middle position.', 5, 'Build a ramp for access; keep costs low; build a ramp and fund it over two years.'),
        O('Why is it useful to look for more than two positions?', 4, 'A third position may combine the best of both.'),
        O('How does a text about accessibility change how you see your own school?', 5, 'A personal response with a specific example.')] }
  } });
})();
