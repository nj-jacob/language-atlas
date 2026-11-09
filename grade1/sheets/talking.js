/* Grade 1 Listening and Speaking: printable worksheets. Learn and Practise 1 to 3 are made from chapters/talking.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B1.1 to B1.5. Speaking itself is done with a
   grown-up (the chapter's activities, printed as Activity sheets).
   Think questions marked by a computer are checked in tests/verify/grade1-talking.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function TF(q, fig, right, whyTrue, whyFalse, meta) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: [whyTrue, whyFalse], answer: right ? 0 : 1 }, meta: meta };
  }

  S.register('talking', { code: 'TA', ideas: {
    listen: { goal: 'I can show I am listening.', think: [
      TF('"Look out the window." Is that good listening?', W.icon('listen'), false, 'It helps me listen.', 'My eyes should be on the person talking.',
        { k: 'g1-listen-tf', w: 'Look out the window.' }),
      { q: 'Why does looking at the speaker help you listen?', lines: 2, key: 'You can see their face and hands, and they know you are listening.' },
      { q: 'Write one question you could ask after a friend tells you about their weekend.', lines: 2, key: 'Any fitting question, for example: Where did you go?' }] },
    steps: { goal: 'I can listen before, during and after.', think: [
      TF('Ty does not understand, so he asks the speaker to say that again. Does that help?', W.icon('listen'), true, 'Asking helps him understand.', 'It does not help.',
        { k: 'g1-lost-tf', said: 'ask them to say that again' }),
      { q: 'What can you do <b>before</b> you listen to a story?', lines: 2, key: 'Think about what I know, look at the title and pictures, guess what it will be about.' },
      { q: 'After listening, tell back the story in three parts: first, next, last.', lines: 3, key: 'Three events in order from the story heard.' }] },
    turns: { goal: 'I can take turns when I talk.', think: [
      TF('"Talk over someone to be heard." Is that fair?', W.icon('talk'), false, 'It is fair.', 'Wait until the speaker stops, then it is my turn.',
        { k: 'g1-turn-tf', t: 'Talk over someone to be heard.' }),
      { q: 'How do you know when it is your turn to talk?', lines: 2, key: 'When the speaker stops, when I put up my hand and am chosen, or when the talking stick comes to me.' },
      { q: 'Your friend asks "What colour is your coat?" Is a long story a good answer? Why?', lines: 2, key: 'No. A short answer fits a short question: "It is blue."' }] },
    body: { goal: 'I can read faces and hands.', think: [
      TF('A frown and crossed arms: Lin says this person feels happy. True or false?', W.icon('people'), false, 'They look happy.', 'A frown and crossed arms show angry.',
        { k: 'g1-body-tf', body: 'a frown and crossed arms', said: 'happy' }),
      { q: 'Draw a face that shows surprised. What do the eyes do?', lines: 1, key: 'Wide eyes (and maybe hands over the mouth).' },
      { q: 'Show "stop" with your hand, and "yes" with your head. Write what you did.', lines: 1, key: 'A hand held up flat; a nod.' }] },
    words: { goal: 'I can choose clear words.', think: [
      TF('"Put that thing over there." Are these clear words?', W.icon('talk'), false, 'The words are clear.', 'That, thing and there do not say what or where.',
        { k: 'g1-clear-tf', said: 'Put that thing over there.' }),
      { q: 'Make it clear: <b>Give me that stuff.</b>', lines: 1, key: 'Name the thing, for example: Give me the red crayons.' },
      { q: 'Write a new word you learned. Use it in a sentence to a friend.', lines: 2, key: 'Any new word used correctly.' }] }
  } });
})();
