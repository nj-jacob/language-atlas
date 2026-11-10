/* Grade 7 Punctuation: the hand-written part of the printable worksheets (the rest is made from chapters/punctuation.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B3.3. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('punctuation', { code: 'PU', ideas: {
    semicolon: { goal: 'I can join two complete sentences with a semicolon.', think: [
      T('Why is this wrong?', 'Because the snow was deep; the plough stopped.', '"Because the snow was deep" cannot stand alone. Use a comma instead of the semicolon.'),
      T('A semicolon or a full stop: which shows that two ideas are closely linked? Explain.', '', 'The semicolon. It keeps both ideas in one sentence, so the reader sees they belong together.'),
      T('Write two sentences that should not be joined with a semicolon. Say why.', '', 'Two unrelated ideas, for example "I like soup. The bus is red." They are not closely linked.')] },
    linking: { goal: 'I can link two sentences with however, therefore or meanwhile.', think: [
      T('Why does "however" need a semicolon before it here, not just a comma?', 'The test was hard; however, most of us passed.', 'It joins two complete sentences. A comma alone would make a run-on.'),
      T('What is wrong with the meaning? Fix it.', 'The ice was thin; however, we stayed off the lake.', 'Staying off thin ice is a result, not a contrast: "The ice was thin; therefore, we stayed off the lake."'),
      T('When is "therefore" clearer than "and"? Give an example.', '', 'When one idea causes the other: "therefore" names the link. "It rained; therefore, the game was cancelled."')] },
    colon: { goal: 'I can use a colon to introduce a quotation after a complete sentence.', think: [
      T('How do you know a colon can go before a quotation?', '', 'Cover the quotation. If the words before it make a complete sentence, a colon can go there.'),
      T('Why is this wrong? Fix it.', 'The coach said: “Never quit.”', '"The coach said" is not a complete sentence. Use a comma: The coach said, “Never quit.”'),
      T('Write the same quotation twice: once after a comma, once after a colon.', '', 'For example: Mom said, “Be home by six.” Mom had one rule: “Be home by six.”')] },
    dash: { goal: 'I can use a dash to show a break or an added comment.', think: [
      T('Commas or dashes around a comment: how do they feel different to a reader?', 'My cousin—the one from Iqaluit—is visiting.', 'Dashes feel stronger and more sudden. Commas feel quieter.'),
      T('Why should a writer use only one or two dashes in a piece?', '', 'Too many dashes break the flow and lose their effect.'),
      T('How is a dash different from a hyphen? Give an example of each.', '', 'A dash (—) breaks a sentence: "I was—wait!" A hyphen (-) joins a word: "well-known".')] },
    ellipsis: { goal: 'I can use an ellipsis to show a pause or words left out.', think: [
      T('Is this a fair way to shorten the quotation? Explain.', '“The lake is not safe for swimming.” → “The lake is … safe for swimming.”', 'No. Leaving out "not" turns the meaning around. Words left out must keep the speaker\'s meaning.'),
      T('How does an ellipsis change the way you read a sentence aloud?', 'Well… I am not sure.', 'You slow down and pause, so it sounds unsure or suspenseful.'),
      T('A news story quotes the mayor with an ellipsis. What should a careful reader check?', '', 'Find the full quotation and make sure the missing words do not change the meaning.')] }
  } });
})();
