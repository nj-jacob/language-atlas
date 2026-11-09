/* Grade 6 Word Meanings: worksheets (assets/engine/sheets.js). Learn and Practise sheets are made from
   chapters/vocabulary.js; this file adds each idea's "I can" goal and its Think questions, open answers the grown-up marks.
   Ontario 2023 Language, B2.2. Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, s, n, key) { var o = { q: q, lines: n, key: key }; if (s) o.fig = W.sent(s); return o; }

  S.register('vocabulary', { code: 'VO', ideas: {
    context: { goal: 'I can use the sentence to work out a new word.', think: [
      O('What does <b>parched</b> mean? Which words helped you?', 'After the long hike with no water, my throat was parched.', 3, 'Very dry. Clues: long hike, no water, throat.'),
      O('What does <b>reluctant</b> mean? Which words helped you?', 'Omar was reluctant to jump in; he stood on the dock for ten minutes.', 3, 'Not wanting to do something. Clue: he stood on the dock a long time.'),
      O('Write a sentence that gives a clue to the meaning of <b>exhausted</b>.', null, 2, 'After shovelling all morning, Dad was exhausted and fell asleep on the couch.')] },
    'clue-kinds': { goal: 'I can use four kinds of clues to work out a word.', think: [
      O('What kind of clue is it: definition, example, opposite or synonym?', 'Unlike his timid sister, Theo was bold.', 2, 'Opposite: timid is the opposite of bold.'),
      O('What kind of clue is it? What does <b>marine</b> mean?', 'Marine animals, such as whales and seals, live in the sea.', 2, 'Example (and definition): marine means living in the sea.'),
      O('Write a sentence with a definition clue for <b>migrate</b>.', null, 2, 'Geese migrate, which means they fly south for the winter.')] },
    'parts-in-context': { goal: 'I can use word parts and the sentence together.', think: [
      O('Use the parts and the sentence: what does <b>unbreakable</b> mean?', 'The new phone case is unbreakable, so it survived the fall.', 2, 'Not able to be broken: un (not) + break + able.'),
      O('What does <b>misinformed</b> mean? How did the parts help?', 'Mila was misinformed about the bus time and missed it.', 3, 'Given wrong information. mis means wrongly; informed means told.'),
      O('Why should you check a word-part guess against the sentence?', null, 2, 'Some letters only look like parts, so the sentence shows if the meaning fits.')] },
    shades: { goal: 'I can choose a weaker or stronger word for what I mean.', think: [
      O('Put in order from weakest to strongest: furious, annoyed, angry.', null, 1, 'annoyed, angry, furious'),
      O('Which word fits best? Why? (cool, chilly, freezing)', 'At −30 °C in Iqaluit, the wind was ______.', 2, 'freezing: −30 °C is very cold, so the strongest word fits.'),
      O('Write two sentences: one with <b>glad</b> and one with <b>thrilled</b>. Show the difference.', null, 3, 'I was glad the rain stopped. I was thrilled when we won the final.')] },
    connotation: { goal: 'I can tell the feeling a word carries.', think: [
      O('Which sounds kinder: <b>thrifty</b> or <b>cheap</b>? Why?', null, 2, 'Thrifty: it means careful with money in a good way. Cheap sounds negative.'),
      O('Rewrite to make the dog sound good.', 'The dog was nosy and pushy.', 2, 'The dog was curious and confident.'),
      O('Why would an ad say a car is "compact" instead of "small"?', null, 3, 'Compact sounds positive and smart; small can sound like not enough.')] },
    'subject-words': { goal: 'I can use exact subject words.', think: [
      O('In science, <b>matter</b> means anything that takes up space. What does it mean here?', 'What is the matter with you today?', 2, 'What is wrong or what is the problem.'),
      O('Choose a word from science, math or social studies. Write what it means in that subject.', null, 3, 'Habitat (science): the natural home of a plant or animal.'),
      O('Why do subjects need exact words?', null, 2, 'Each word means one exact thing in that subject, so everyone understands the same idea.')] }
  } });
})();
