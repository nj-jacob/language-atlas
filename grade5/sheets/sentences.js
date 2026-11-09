/* Grade 5 Sentences: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/sentences.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: B3.1. All sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('sentences', { code: 'SE', ideas: {
    compound: { goal: 'I can join two complete thoughts into a compound sentence.', think: [
      O('Join the two sentences with a comma and <b>but</b>, <b>so</b> or <b>and</b>.', 'The wind picked up, so we paddled back to shore.', 2, W.sent('The wind picked up. We paddled back to shore.')),
      O('Write your own compound sentence about your weekend.', 'Any sentence with two complete thoughts joined by a comma and a joining word. For example: I went skating, and my cousin came too.', 2),
      O('Is this a compound sentence? Explain.', 'No. "Ran to the bus" has no subject of its own, so there is only one complete thought (one subject, two verbs).', 2, W.sent('Leila grabbed her bag and ran to the bus.'))] },
    complex: { goal: 'I can build a complex sentence with a part that cannot stand alone.', think: [
      O('Add a part that cannot stand alone, starting with <b>because</b>, <b>when</b> or <b>although</b>.', 'For example: When the bell rang, the class lined up. / The class lined up because the bell rang.', 2, W.sent('The class lined up.')),
      O('Underline the part that cannot stand alone. Why can it not?', 'Although it was raining. It starts with "although" and leaves the reader waiting for the rest of the thought.', 2, W.sent('Although it was raining, the soccer game went ahead.')),
      O('Write a complex sentence about an animal.', 'Any sentence with one complete thought and one dependent part. For example: Because the bear was hungry, it searched the berry bushes.', 2)] },
    'compound-complex': { goal: 'I can build a compound-complex sentence.', think: [
      O('Name the parts of this sentence.', 'Two complete thoughts ("Dad made bannock", "we ate it warm") and one part that cannot stand alone ("when we got home").', 3, W.sent('When we got home, Dad made bannock, and we ate it warm.')),
      O('Write a compound-complex sentence about a storm.', 'Two complete thoughts plus one dependent part. For example: Because the storm was coming, we closed the windows, and Mom lit a candle.', 3),
      O('Why might a writer use a compound-complex sentence instead of three short ones?', 'It shows how the ideas connect (time, cause, contrast) and makes the writing flow.', 2)] },
    fragment: { goal: 'I can find and fix a sentence fragment.', think: [
      O('Fix the fragment. Write a complete sentence.', 'For example: After the long hike up the hill, we rested by the lake.', 2, W.sent('After the long hike up the hill.')),
      O('What is missing from this fragment? Fix it.', 'A verb. For example: The tall girl with the red backpack waved at us.', 2, W.sent('The tall girl with the red backpack.')),
      O('Explain how to test if a group of words is a complete sentence.', 'Check it has a subject and a verb, and that it makes sense on its own.', 2)] },
    'run-on': { goal: 'I can find and fix a run-on sentence.', think: [
      O('Fix the run-on in two different ways.', 'The power went out. We lit candles. / The power went out, so we lit candles.', 3, W.sent('The power went out we lit candles.')),
      O('Is this a run-on? Explain.', 'Yes. Two complete thoughts are joined by only a comma. Add "so" or use a full stop.', 2, W.sent('Sami missed the bus, he walked to school.')),
      O('Why are run-on sentences hard to read?', 'The reader cannot tell where one idea ends and the next begins.', 2)] }
  } });
})();
