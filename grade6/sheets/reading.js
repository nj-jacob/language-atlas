/* Grade 6 Reading for Meaning: worksheets (assets/engine/sheets.js). Learn, Practise and Read sheets are made from
   chapters/reading.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, C1.1, C1.2, C1.6, C2.2, C2.3, C2.4, C2.6. Every text is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  var CANOE = 'Elan checked the sky twice before pushing the canoe off. Grey clouds were stacking up over the far shore, and the wind had turned cold. She paddled close to the shoreline instead of crossing the open water.';
  S.register('reading', { code: 'RE', ideas: {
    evidence: { goal: 'I can back up an answer with evidence from the text.', think: [
      O('Is Elan careful? Give two pieces of evidence.', CANOE, 3, 'Yes. She checked the sky twice, and she stayed close to shore instead of crossing open water.'),
      O('In the same text, what will the weather do? Which words tell you?', null, 2, 'A storm is coming: grey clouds stacking up, the wind turned cold.'),
      O('Why is "I just know" not good evidence?', null, 2, 'It does not point to the text, so nobody can check it.')] },
    summary: { goal: 'I can sum up the main idea and key details.', think: [
      O('Sum up this text in one sentence.', CANOE, 2, 'Elan sees a storm coming, so she paddles safely along the shore.'),
      O('Which detail from the same text would you leave out of a summary? Why?', null, 2, '"Checked the sky twice": the main point is that she stays safe from the storm.'),
      O('Sum up a book or show you know in two sentences.', null, 3, 'Any two-sentence summary with the main character, problem and outcome.')] },
    conclude: { goal: 'I can draw a conclusion from clues.', think: [
      O('What can you conclude about Elan\'s experience with canoes? Explain.', CANOE, 3, 'She has paddled before: she reads the weather and knows open water is dangerous.'),
      O('Draw a conclusion.', 'The bakery\'s shelves were empty by 9 a.m. every Saturday.', 2, 'The bakery is very popular, or it does not bake enough.'),
      O('How is a conclusion different from a guess?', null, 2, 'A conclusion is built on clues in the text; a guess may have no evidence.')] },
    predict: { goal: 'I can predict, then check and adjust.', think: [
      O('Predict what happens next. What clue did you use?', CANOE, 2, 'The storm hits and she pulls the canoe onto shore. Clue: the clouds and cold wind.'),
      O('Your prediction turns out wrong. What should you do?', null, 2, 'Reread to find what I missed and change my thinking.'),
      O('Write a question you could ask to check your prediction as you read on.', null, 2, 'Will Elan reach the shore before the storm?')] },
    monitor: { goal: 'I can notice when the text stops making sense and fix it.', think: [
      O('Name three fix-up strategies.', null, 2, 'Reread, read ahead, picture it, look up a word, ask a question.'),
      O('You read "the bay was choppy" and do not know choppy. What could you do?', null, 2, 'Use clues like wind and waves, or look it up.'),
      O('Which fix-up strategy works best for you? Why?', null, 3, 'Any strategy with a reason, such as rereading because I miss small words.')] },
    purpose: { goal: 'I can choose a text that fits my purpose.', think: [
      O('You want to learn how to build a quinzhee. What kind of text would you choose? Why?', null, 2, 'A how-to text or video with steps and pictures.'),
      O('You want a good laugh on a rainy day. What would you choose?', null, 2, 'A funny novel or comic.'),
      O('Name a text by a creator from a culture different from yours that you would like to read. Why?', null, 3, 'Any named text and a reason, such as learning about a community.')] },
    forms: { goal: 'I can tell how a form\'s features help me.', think: [
      O('Name two features of a news article. How does each help?', null, 3, 'Headline: tells the main point. Photo with caption: shows what happened.'),
      O('How is a recipe built differently from a story?', null, 3, 'A recipe has a list of ingredients and numbered steps; a story has characters and a plot.'),
      O('How does a legend or teaching story often help its listeners?', null, 3, 'It passes on lessons, values and history from one generation to the next.')] },
    pov: { goal: 'I can tell first, second and third person.', think: [
      O('Which point of view? How do you know?', 'I grabbed my skates and ran to the pond.', 2, 'First person: the narrator says I and my.'),
      O('Which point of view? How do you know?', 'She grabbed her skates and ran to the pond.', 2, 'Third person: the narrator says she and her.'),
      O('Why might a writer choose first person?', null, 2, 'So readers feel close to the narrator\'s thoughts and feelings.')] },
    'other-view': { goal: 'I can tell how another narrator would change a story.', think: [
      O('Retell it in first person, as Elan.', CANOE, 3, 'I checked the sky twice before pushing off. Grey clouds were stacking up, so I stayed close to shore.'),
      O('How would the story change if Elan\'s worried mother told it?', null, 3, 'It would show her fear and what she saw from shore; we would not know Elan\'s thoughts.'),
      O('What does a reader lose when a story is told in first person?', null, 2, 'We only know what the narrator knows and thinks.')] }
  } });
})();
