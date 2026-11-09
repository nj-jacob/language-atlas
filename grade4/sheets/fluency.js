/* Grade 4 Reading Smoothly: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/fluency.js; the read-aloud activities print as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: B2.3 reading fluency (pace, phrasing, expression). */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('fluency', { code: 'FL', ideas: {
    pace: { goal: 'I can set my pace to fit the text.', think: [
      L('Would you read a recipe or a joke more slowly? Why?', 'A recipe: you need every step and amount. Any reason about the purpose.'),
      L('When should you slow down while reading?', 'At hard words, new facts or numbers, or when you lose the meaning.'),
      L('Why is reading as fast as you can not the best way?', 'You can miss the meaning. Good reading sounds like talking.') ] },
    phrases: { goal: 'I can read in phrases, not word by word.', think: [
      L('Mark the phrases with a slash: "After the storm / the children / ran down to the lake."', 'After the storm / the children / ran down to the lake.'),
      L('Why does a comma tell you to pause?', 'It ends a phrase, so the words before it go together.'),
      L('Why does reading in phrases help you understand?', 'Words that go together carry one idea, so you hear the meaning.') ] },
    purpose: { goal: 'I can let the purpose of the text guide my voice.', think: [
      L('How should a news report sound? How should a scary story sound?', 'News: clear and steady. Scary story: slower, quieter, with pauses.', 3),
      L('Write one line from a story and tell how you would read it.', 'Any line with a fitting voice, for example excited, sad or calm.'),
      L('Why do you read a poem differently from a science page?', 'A poem is for feeling and sound; a science page is for facts.') ] },
    stress: { goal: 'I can stress the word that matters.', think: [
      L('Say "I did not take the canoe" two ways, stressing a different word. How does the meaning change?', 'Stress I: someone else did. Stress canoe: I took something else.', 3),
      L('Which word would you stress in "Stop! The ice is thin"? Why?', 'Stop, or thin: they carry the warning.'),
      L('How do bold or italic words tell you what to stress?', 'The writer marks the word to say it louder or stronger.') ] }
  } });
})();
