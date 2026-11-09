/* Grade 4 Thinking About Texts: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/thinking.js; its activities (C3.4, C3.6, C3.7, C3.8) print as Activity sheets. This file adds goals and Think questions.
   Ontario 2023 Language, Grade 4: C3.2 inferences, C3.3 plots and cause and effect, C3.5 perspectives and bias. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('thinking', { code: 'TH', ideas: {
    local: { goal: 'I can use clues to work out what is not said.', think: [
      L('"Priya hid the drawing behind her back and her cheeks turned red." What is not said? What tells you?', 'She is embarrassed or does not want it seen. Clues: hiding it, red cheeks.', 3),
      L('Write two clues that show it is very cold outside, without saying cold.', 'For example: breath made clouds; the snow squeaked.'),
      L('How do you check an inference?', 'Find clues in the text that prove it.') ] },
    global: { goal: 'I can find the big message of a text.', think: [
      L('What is the big message of a story where a girl keeps practising until she can skate?', 'Keep trying and you can learn hard things.'),
      L('How is the big message different from what happens?', 'What happens is the plot; the message is the lesson for all readers.'),
      L('Write the big message of a story you know.', 'Any lesson written as a whole sentence.') ] },
    plots: { goal: 'I can follow two plots in one story.', think: [
      L('Why might an author tell two plots at once?', 'To show two characters, or to build suspense until they meet.'),
      L('How can you keep track of two plots?', 'Make a chart with one column for each plot.'),
      L('Plan two plots that meet at the end, in one line each.', 'Any two lines that join.') ] },
    cause: { goal: 'I can explain cause and effect.', think: [
      L('"The river flooded, so the road closed." Name the cause and the effect.', 'Cause: the river flooded. Effect: the road closed.'),
      L('Write two words that signal cause and effect.', 'For example: because, so, since, as a result.'),
      L('Write one effect of a big snowstorm.', 'For example: school closes, so we shovel the driveway.') ] },
    perspective: { goal: 'I can tell whose view a text gives, and whose is missing.', think: [
      L('A text about a new highway gives only the drivers\' view. Whose view is missing?', 'For example: people who live nearby, or the animals whose land is used.'),
      L('Why is it important to hear more than one view?', 'You get the whole picture and can be fair.'),
      L('Retell a story event from another character\'s view.', 'Any retelling in that character\'s voice.', 3) ] },
    bias: { goal: 'I can spot bias.', think: [
      L('"Cats are the only good pets." Is this fair? Explain.', 'No. It shows only one side and calls it the only answer.'),
      L('What words can be a sign of bias?', 'For example: always, never, only, best, worst.'),
      L('Rewrite it to be fair: "Hockey is the only sport worth playing."', 'For example: Many people love hockey, and others enjoy other sports.') ] }
  } });
})();
