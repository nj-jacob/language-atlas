/* Grade 5 Capitals and Punctuation: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/punctuation.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: B3.3. All sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('punctuation', { code: 'PU', ideas: {
    appositive: { goal: 'I can use commas around words that rename a noun.', think: [
      O('Add the commas. Explain why they go there.', 'Ms. Okafor, our music teacher, plays the cello. The commas set off the words that rename Ms. Okafor.', 3, W.sent('Ms. Okafor our music teacher plays the cello.')),
      O('Add an appositive about a person you know. Use commas.', 'For example: Raj, my best friend, lives next door.', 2),
      O('Read the sentence without the part between the commas. What do you notice?', 'It still makes sense. The appositive is extra information.', 2, W.sent('Iqaluit, the capital of Nunavut, is on Baffin Island.'))] },
    participle: { goal: 'I can use a comma after an -ing phrase at the start of a sentence.', think: [
      O('Add the comma and say who is doing the action.', 'Running for the bus, Aiden dropped his mitt. Aiden is the one running.', 2, W.sent('Running for the bus Aiden dropped his mitt.')),
      O('Start a sentence with an -ing phrase about cooking.', 'For example: Stirring the soup, Grandma hummed a song.', 2),
      O('What is funny about this sentence? Fix it.', 'It says the house was walking. Fix: Walking home, I saw the house was dark.', 2, W.sent('Walking home, the house was dark.'))] },
    colon: { goal: 'I can use a colon after a complete sentence to start a list.', think: [
      O('Is the colon used correctly? Explain.', 'No. "We need" is not a complete sentence. Remove the colon: We need tents, food and water.', 2, W.sent('We need: tents, food and water.')),
      O('Write a complete sentence that ends with a colon and a list of three things.', 'For example: Pack these for the trip: a raincoat, boots and a flashlight.', 2),
      O('Why must a complete sentence come before the colon?', 'The colon announces the list. The words before it must make sense on their own.', 2)] },
    capitals: { goal: 'I can use capitals for names of places, languages and months.', think: [
      O('Fix the capitals.', 'In July we visited Halifax and heard people speaking French and Mi\'kmaq.', 2, W.sent('in july we visited halifax and heard people speaking french and mi\'kmaq.')),
      O('Why does <b>winter</b> not get a capital but <b>January</b> does?', 'Months are names, so they are proper nouns. Seasons are common nouns.', 2),
      O('Write a sentence with a place, a language and a month.', 'For example: In March my aunt flew to Winnipeg and practised her Cree. (All three capitalized.)', 2)] }
  } });
})();
