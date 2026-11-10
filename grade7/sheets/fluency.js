/* Grade 7 Reading Fluently: the hand-written part of the printable worksheets (the rest is made from chapters/fluency.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B2.3.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('fluency', { code: 'FL', ideas: {
    phrases: { goal: 'I can read in meaningful chunks.', think: [
      T('Mark the chunks with a slash ( / ). Explain one choice.', 'After the long storm the children ran outside to build a snow fort.', 'After the long storm / the children ran outside / to build a snow fort. Each chunk is one idea.'),
      T('Why does reading word by word make a text harder to understand?', '', 'You lose how the words go together, so the meaning gets lost.'),
      T('What happens to meaning if you race without pausing?', '', 'Ideas run together, so you and your listener miss the meaning.')] },
    marks: { goal: 'I can let punctuation guide my voice.', think: [
      T('How should your voice change at each mark?', 'Wait—did you hear that? The wind… or something else.', 'Stop suddenly at the dash, rise at the question mark, trail off at the ellipsis.'),
      T('How is a comma pause different from a full stop?', '', 'A comma is a short pause in the middle of an idea. A full stop is a longer stop at the end.'),
      T('Write a sentence that should be read with a sudden break. Say how to read it.', '', 'For example: "I opened the box and—nothing." Pause sharply at the dash.')] },
    pace: { goal: 'I can match my pace to my purpose.', think: [
      T('Would you read these at the same pace? Explain.', 'a science procedure · a funny comic', 'No. Read the procedure slowly to follow each step; read the comic at a natural pace.'),
      T('Why is fast reading not always good reading?', '', 'Speed only helps if understanding keeps up. Too fast and you miss the meaning.'),
      T('Name a time you should slow down when reading, and say why.', '', 'For example: a test question or instructions, because every detail matters.')] },
    stress: { goal: 'I can stress a word to change the meaning.', think: [
      T('Read it two ways. How does the meaning change?', 'I did not take your pen. · I did not take your PEN.', 'Stressing "I" means someone else took it. Stressing "PEN" means I took something else.'),
      T('How would a nervous character say this line? Describe your voice.', '"I… I think I left the gate open."', 'Quiet, slow and shaky, with a pause at the ellipsis.'),
      T('Why does reading dialogue with expression help the listener?', '', 'It shows how the character feels, so the listener understands the scene.')] }
  } });
})();
