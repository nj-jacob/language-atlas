/* Grade 1 Reading for Meaning: printable worksheets. Learn and Practise 1 to 3 are made from chapters/reading.js, and the
   passages print as Read sheets; this file adds each idea's "I can" goal and its Think questions, using the grade's passages
   (texts.js). Ontario 2023 Language, Grade 1, C1.1, C1.2, C1.6, C2.1 to C2.6 (C1.7 and C2.7 are activities).
   Think questions marked by a computer are checked in tests/verify/grade1-reading.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W, T = Atlas.texts;
  if (!S) return;

  S.register('reading', { code: 'RE', ideas: {
    find: { goal: 'I can find an answer in the text.', think: [
      Q.tf('Who clapped? Jay says Tala clapped. True or false?', false, 'The text says Tala clapped.', 'The text says Grandpa clapped and smiled.',
        { fig: T.show(T.kite), meta: { k: 'g1-fact-tf', t: 'Tala and the Kite', q: 'Who clapped?', said: 'Tala' } }),
      { q: 'Underline the sentence that tells what colours the kite was.', fig: T.show(T.kite), lines: 1, key: 'It was red and yellow.' },
      { q: 'Why is it smart to look back in the text before you answer?', lines: 2, key: 'The answer is in the words, so looking back makes sure you are right.' }] },
    main: { goal: 'I can tell what a text is mostly about.', think: [
      Q.tf('Is this what the text is mostly about?', true, 'Every part of the text is about this.', 'It is only one small part.',
        { fig: T.show(T.kite) + W.sent('Tala flies her new kite, and Grandpa watches.'), meta: { k: 'g1-main-tf', t: 'Tala and the Kite' } }),
      { q: '"The field is big." Is that the main idea or a detail? Why?', lines: 2, key: 'A detail: it is one small part. The main idea is that Tala flies her kite.' },
      { q: 'Tell a friend what your favourite book is mostly about, in one sentence.', lines: 2, key: 'One sentence that names the main idea of a book.' }] },
    kinds: { goal: 'I can tell what kind of text I am reading.', think: [
      Q.tf('Ben says you would read this to learn facts.', true, 'It has headings and facts.', 'It tells a story.',
        { fig: T.show(T.frogs), meta: { k: 'g1-purpose-tf' } }),
      { q: 'How can you tell a letter from a story?', lines: 2, key: 'A letter starts with Dear and the name of the person it is for, and ends with who wrote it.' },
      { q: 'What kind of text would you read to learn how to make a snack?', lines: 1, key: 'Instructions (a recipe), with numbered steps.' }] },
    before: { goal: 'I can think about what I know before I read.', think: [
      Q.tf('The title is "Canada Geese". Ana says, "Geese fly south for the winter." Does that help her read it?', true, 'It is about geese, so what she knows helps.', 'It is not about this text.',
        { fig: W.pic('goose'), meta: { k: 'g1-know-tf', t: 'Canada Geese', said: 'Geese fly south for the winter.' } }),
      { q: 'Look at the title "The Moose". Write one thing you already know about moose.', fig: W.pic('moose'), lines: 2, key: 'Any true fact, such as: moose are big and live in the forest.' },
      { q: 'Why do we read? Write two reasons.', lines: 2, key: 'To enjoy a story, to learn facts, to learn how to do something.' }] },
    predict: { goal: 'I can guess what comes next, using clues.', think: [
      Q.tf('Read this much. Ivy guesses: the kite will fly up into the sky. Is that a good guess?', true, 'She ran across the big field, so the kite can catch the wind.', 'There is no clue for it.',
        { fig: T.show(T.kite, 3), meta: { k: 'g1-predict-tf', t: 'Tala and the Kite' } }),
      { q: 'What clue in the text helped you guess?', lines: 2, key: 'She ran across the big field (a kite needs wind and space).' },
      { q: 'Why is it fine if a guess turns out wrong?', lines: 2, key: 'A guess helps you think as you read; you check it and change it.' }] },
    check: { goal: 'I can fix it when it does not make sense.', think: [
      Q.tf('You cannot picture what is happening. Is this a good fix?', true, 'Picturing it helps you see what happens.', 'It does not help.',
        { fig: W.sent('Make a picture in your head.'), meta: { k: 'g1-fixup-tf' } }),
      { q: 'You read "The dog barked at the cat." as "The dog baked a cat." What should you do?', lines: 2, key: 'Stop, notice it does not make sense, and read it again slowly.' },
      { q: 'What fix helps you most when you get stuck? Why?', lines: 2, key: 'Any fix (reread, picture it, look at the picture, ask a question) with a reason.' }] },
    connect: { goal: 'I can link a text to my life.', think: [
      Q.tf('After reading "Busy Bees", Leo says, "I put honey on my toast." Is that a connection?', true, 'Bees make honey, and Leo eats honey.', 'It is not about the text.',
        { fig: W.pic('bee'), meta: { k: 'g1-connect-tf', t: 'Busy Bees', said: 'I put honey on my toast.' } }),
      { q: 'Write a connection to "My Snowy Day". Start with "This reminds me of ...".', fig: W.pic('snow'), lines: 2, key: 'Any link to playing in snow, being cold or warming up.' },
      { q: 'How does a connection help you understand a text?', lines: 2, key: 'You use what you know from your life to picture and understand it.' }] },
    narrator: { goal: 'I can tell who is telling the story.', think: [
      { q: 'Someone in the story is telling it. True or false?', fig: T.show(T.snow), type: 'tf', answer: true,
        why: { options: ['It uses I and my.', 'It uses he, she or they.'], answer: 0 }, meta: { k: 'g1-pov-tf' } },
      { q: 'Find two words that show who is telling "My Snowy Day".', lines: 1, key: 'I, my, me' },
      { q: 'Write one sentence about your day, told by you.', lines: 2, key: 'A sentence that uses I or my.' }] },
    other: { goal: 'I can tell a story from someone else’s view.', think: [
      Q.tf('Could Dad tell "Paddling with Dad" too?', true, 'Dad was in the canoe, so he could tell it.', 'Dad was not there.',
        { fig: W.pic('canoe'), meta: { k: 'g1-other-tf', t: 'Paddling with Dad', who: 'Dad' } }),
      { q: 'If Grandpa told "Tala and the Kite", what might he say?', lines: 2, key: 'I watched Tala run. Up went the kite, and I clapped!' },
      { q: 'Why might a story sound different when someone else tells it?', lines: 2, key: 'Each person sees and feels different things.' }] }
  } });
})();
