/* Grade 5 Reading Fluently: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/fluency.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Reading aloud itself is an activity sheet. Ontario 2023 Language: B2.3. All sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('fluency', { code: 'FL', ideas: {
    pace: { goal: 'I can choose a reading pace that fits the text.', think: [
      O('Would you read a recipe or a comic faster? Why?', 'A comic. A recipe has steps and amounts you must get right, so you read it slowly and carefully.', 2),
      O('When should you slow down while reading a science text?', 'At new words, numbers, diagrams, or when you lose the meaning.', 2),
      O('Read a page of a novel at a comfortable pace. What helped you keep the meaning?', 'Answers vary. For example: reading in phrases, pausing at full stops, picturing the scene.', 2)] },
    phrases: { goal: 'I can read in phrases, not word by word.', think: [
      O('Mark the phrases with a slash ( / ).', 'At the edge of the lake / a heron stood / perfectly still / in the morning fog.', 2, W.sent('At the edge of the lake a heron stood perfectly still in the morning fog.')),
      O('Why is reading in phrases easier to understand than word by word?', 'Words that go together carry one idea, so the meaning comes in chunks you can hold.', 2),
      O('Which punctuation marks tell you to pause? Name three.', 'For example: comma, full stop (period), colon, dash, question mark.', 2)] },
    purpose: { goal: 'I can change my voice to fit the purpose of the text.', think: [
      O('How would your voice sound reading a safety notice compared to a spooky story?', 'Safety notice: clear, steady, serious. Spooky story: slower, quieter, with pauses for suspense.'),
      O('Read the line two ways: as good news, then as bad news. Describe what changed.', 'The voice is bright and quick for good news; low and slow for bad news. The words stay the same.', 3, W.sent('The results are in.')),
      O('Why do news readers speak clearly and evenly?', 'Their purpose is to inform, so listeners must understand every word and trust the facts.', 2)] },
    intonation: { goal: 'I can make my voice rise and fall to show meaning.', think: [
      O('Draw an arrow at the end of each sentence: up ↗ or down ↘.', 'Are you coming? ↗  Close the door. ↘  What a storm! ↘ (strong, then down)', 3, W.sent('Are you coming? &nbsp; Close the door. &nbsp; What a storm!')),
      O('How does your voice change for a question that starts with "Why"?', 'It usually goes down at the end, because it asks for an explanation, not a yes or no.', 2),
      O('Which word would you stress to show surprise? Explain.', 'For example: "<b>You</b> baked this?" stresses who did it. Any word with a reason.', 2, W.sent('You baked this?'))] }
  } });
})();
