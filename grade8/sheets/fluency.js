/* Grade 8 Reading Fluently: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/fluency.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B2.3 fluent reading, pacing and expression. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('fluency', { code: 'FL', ideas: {
    phrases: { goal: 'I can read long sentences in phrases that make sense.',
      think: [O('Mark the phrases with a slash (/): "After the long winter the geese returned to the marsh behind our school."', 4, 'After the long winter / the geese returned / to the marsh / behind our school.'),
        O('Why is reading word by word hard to understand?', 4, 'The words never join into ideas, so the meaning gets lost.'),
        O('Where should you never break a phrase? Give an example.', 4, 'Not after a little word such as the, a or of: "the / geese" is wrong.')] },
    marks: { goal: 'I can let each punctuation mark guide my voice.',
      think: [O('How should your voice change at a comma, a semicolon and a full stop?', 5, 'Comma: a short pause. Semicolon: a slightly longer pause, voice stays up. Full stop: a full stop, voice drops.'),
        O('How do you read words inside brackets?', 4, 'A little quicker and quieter, as an aside.'),
        O('Write a sentence with a question mark and an exclamation mark. Say how each sounds.', 4, 'Question: voice rises at the end. Exclamation: stronger, with feeling.')] },
    stress: { goal: 'I can stress the word that carries the meaning.',
      think: [O('Read "I didn’t say she took it" stressing a different word each time. How does the meaning change for "I" and "took"?', 5, 'I: someone else said it. Took: she did something else with it, like borrowed it.'),
        O('How do you choose which word to stress?', 4, 'Ask which word the meaning depends on, often the new or contrasting idea.'),
        O('Underline the word to stress: "We wanted the red canoe, not the green one."', 3, 'red (the contrast with green).')] },
    pace: { goal: 'I can slow down for numbers, new terms and dense ideas.',
      think: [O('Name three things in a text that tell you to slow down.', 4, 'Numbers and dates, new or technical terms, long sentences full of facts.'),
        O('Why is reading fast not the same as reading fluently?', 4, 'Fluency means reading accurately at a pace that keeps meaning; racing loses the meaning.'),
        O('Where would you slow down in: "In 1914, about 5800 km of track linked Halifax to Vancouver"?', 4, 'At the date, the number and the place names.')] },
    purpose: { goal: 'I can match my voice to the purpose and the listener.',
      think: [O('How would you read a safety notice differently from a funny story?', 4, 'Notice: clear, steady, serious. Story: lively, with expression and character voices.'),
        O('You read a poem at a memorial. What would your voice sound like?', 4, 'Slow, calm, quiet, with pauses.'),
        O('Before reading aloud, what two questions should you ask yourself?', 4, 'Who is listening? Why am I reading it to them?')] }
  } });
})();
