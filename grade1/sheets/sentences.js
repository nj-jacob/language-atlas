/* Grade 1 Sentences: printable worksheets. Learn and Practise 1 to 3 are made from chapters/sentences.js; this file adds each
   idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B3.1 and B3.3.
   Think questions marked by a computer are checked in tests/verify/grade1-sentences.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('sentences', { code: 'SE', ideas: {
    'tell-ask': { goal: 'I can tell a telling sentence from an asking sentence.', think: [
      Q.tf('Rosa says this sentence asks something. True or false?', true, 'It starts with Can and ends with a ?, so it asks.', 'It tells something.',
        { fig: W.sent('Can Kai swim?'), meta: { k: 'g1-tell-ask-tf', s: 'Can Kai swim?', said: 'asks' } }),
      { q: 'Turn this telling sentence into an asking sentence: <b>The pond is frozen.</b>', lines: 1, key: 'Is the pond frozen?' },
      { q: 'Write one question you would ask an Elder about long ago.', lines: 2, key: 'Any asking sentence with a capital and a ?, such as: What games did you play?' }] },
    'command-feeling': { goal: 'I can spot commands and strong feelings.', think: [
      Q.tf('Theo says this sentence is a command. True or false?', true, 'It tells someone what to do.', 'It shows a strong feeling.',
        { fig: W.sent('Feed the cat.'), meta: { k: 'g1-sentence-kind-tf', s: 'Feed the cat.', kind: 'command' } }),
      { q: 'How is <b>Shut the door.</b> different from <b>Wow, it snowed!</b>?', lines: 2, key: 'The first tells someone what to do (a command). The second shows a strong feeling, so it ends with !' },
      { q: 'Write a command for how to wash your hands.', lines: 1, key: 'For example: Wash your hands with soap.' }] },
    complete: { goal: 'I can tell if a sentence is complete.', think: [
      { q: 'Is this a complete sentence?', fig: W.sent('The baby.'), type: 'tf', answer: false,
        why: { options: ['It tells who and what they do.', 'It tells who, but not what they do.', 'It tells what happens, but not who.'], answer: 1 },
        meta: { k: 'g1-complete-tf', shown: 'The baby.' } },
      { q: 'Finish it so it is complete: <b>My cousin ___.</b>', lines: 1, key: 'Any doing part, for example: My cousin skated on the pond.' },
      { q: 'What two parts does every complete sentence need?', lines: 2, key: 'Who or what it is about, and what they do (or what happens).' }] },
    join: { goal: 'I can join two ideas with and.', think: [
      { q: 'Is this joined the right way?', fig: W.sent('Omar kicked the ball. and Jun planted a seed.'), type: 'tf', answer: false,
        why: { options: ['It is joined the right way.', 'There is a period before and.', 'It has no end mark.'], answer: 1 },
        meta: { k: 'g1-join-tf', a: 'Omar kicked the ball.', b: 'Jun planted a seed.', shown: 'Omar kicked the ball. and Jun planted a seed.' } },
      { q: 'Join with <b>and</b>: <b>I ate lunch.</b> <b>I went outside.</b>', lines: 2, key: 'I ate lunch and I went outside.' },
      { q: 'Why might a writer join two short sentences?', lines: 2, key: 'So the writing flows and does not sound choppy.' }] },
    capital: { goal: 'I can start a sentence with a capital letter.', think: [
      Q.tf('Is this sentence written the right way?', false, 'It starts with a capital and ends with a mark.', 'It needs a capital letter at the start.',
        { fig: W.sent('my cat sleeps.'), meta: { k: 'g1-fix-tf', shown: 'my cat sleeps.' } }),
      { q: 'Name two other words that always start with a capital letter.', lines: 1, key: 'I, and names of people and places (Maya, Toronto).' },
      { q: 'Fix it: <b>we went to the lake.</b>', lines: 1, key: 'We went to the lake.' }] },
    'end-mark': { goal: 'I can end a sentence with a mark.', think: [
      Q.tf('Is this sentence written the right way?', false, 'It starts with a capital and ends with a mark.', 'It needs a mark at the end.',
        { fig: W.sent('We went to the lake'), meta: { k: 'g1-fix-tf', shown: 'We went to the lake' } }),
      { q: 'Why does a reader need the mark at the end?', lines: 2, key: 'It shows where the sentence stops, and how to say it (stop, voice up or strong).' },
      { q: 'Write the mark: <b>Do you like snow_</b>  <b>That is amazing_</b>', lines: 1, key: '? and !' }] }
  } });
})();
