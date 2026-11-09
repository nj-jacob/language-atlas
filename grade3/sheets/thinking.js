/* Grade 3 Thinking About Texts: printable worksheets (assets/engine/sheets.js). Learn, Practise, Read and the Activity sheets are
   made from chapters/thinking.js and ../texts.js; this file adds each idea's "I can" line and its Think questions, written by hand.
   Ontario 2023 Language, Grade 3, C1.3, C1.4, C1.5, C3.1, C3.2, C3.3, C3.5 (C3.4, C3.6, C3.7, C3.8 on the Activity sheets). */
(function () {
  var S = Atlas.sheets, T = Atlas.texts, W = Atlas.W;
  if (!S) return;
  S.register('thinking', { code: 'TH', ideas: {
    features: { goal: 'I can use headings and pictures to find facts.',
      think: [{ q: 'You want to know what moose eat. How could a heading help you?', lines: 2, key: 'A heading such as "Food" shows which part to read.' },
        { q: 'Why does an information text have pictures with captions?', lines: 2, key: 'They show what the words describe and teach a fact quickly.' },
        { q: 'Write two headings for a short text about your school.', lines: 2, key: 'For example: Our Classrooms; Recess and Sports.' }] },
    'cause-effect': { goal: 'I can tell a cause and the effect it makes.',
      think: [{ q: 'Finish it with an effect: <i>The wind blew hard, so …</i>', lines: 1, key: 'For example: …the kite flew away.' },
        { q: 'Finish it with a cause: <i>The ice cream melted because …</i>', lines: 1, key: 'For example: …it was a hot day.' },
        { q: 'Which words often show cause and effect?', lines: 1, key: 'because, so, since, as a result.' }] },
    'word-choice': { goal: 'I can explain how strong words paint a picture.',
      think: [{ q: 'Make it stronger: <i>The dog ate the food.</i>', lines: 1, key: 'For example: The hungry dog gobbled its dinner.' },
        { q: 'Which word paints a clearer picture, <b>walked</b> or <b>tiptoed</b>? Why?', lines: 2, key: 'Tiptoed. It shows how the person walked: quietly, on their toes.' },
        { q: 'Write a sentence about snow with two strong words.', lines: 2, key: 'For example: Soft snow sparkled on the frozen pond.' }] },
    metaphor: { goal: 'I can explain what a metaphor means.',
      think: [{ q: 'What does it mean?', fig: W.sent('The lake was a mirror.'), lines: 2, key: 'The lake was so still and shiny that it showed reflections like a mirror.' },
        { q: 'Write your own metaphor about the moon.', lines: 1, key: 'For example: The moon is a night light in the sky.' },
        { q: 'How is a metaphor different from saying something is <i>like</i> something?', lines: 2, key: 'A metaphor says one thing IS another; it does not use like or as.' }] },
    assonance: { goal: 'I can hear a vowel sound that comes back.',
      think: [{ q: 'Which vowel sound comes back?', fig: W.sent('The green tree leans in the breeze.'), lines: 1, key: 'The long e sound (green, tree, leans, breeze).' },
        { q: 'Write a short line where the long o sound comes back.', lines: 1, key: 'For example: Slow snow floats over the road.' },
        { q: 'Why might a poet repeat a vowel sound?', lines: 2, key: 'It makes the words sound good together and helps us notice them.' }] },
    infer: { goal: 'I can use clues to work out what is not said.',
      think: [{ q: 'How does Ava feel? What are your clues?', fig: W.sent('Ava stamped her feet and slammed the door.'), lines: 2, key: 'Angry. She stamped her feet and slammed the door.' },
        { q: 'What season is it? What are your clues?', fig: W.sent('Kai zipped his parka and grabbed his skates.'), lines: 2, key: 'Winter. A parka and skates are for cold weather and ice.' },
        { q: 'Finish it: <i>The text does not say it, but I think … because …</i>', lines: 2, key: 'An inference joined to a clue from the text.' }] },
    compare: { goal: 'I can compare two texts: same and different.',
      think: [{ q: 'How are these two texts the same? How are they different?', fig: W.sent('Busy Beavers') + W.sent('Snowshoe Hares'), lines: 3, key: 'Same: both are information texts about Canadian animals. Different: one is about beavers building, one is about hares in snow.' },
        { q: 'Write two words that show you are comparing.', lines: 1, key: 'For example: both, same, but, different, instead.' },
        { q: 'Compare a story and a poem you know. Write one way they are different.', lines: 2, key: 'For example: a story has characters and events; a poem has short lines that sound good together.' }] },
    perspective: { goal: 'I can tell what a writer thinks, and how I know.',
      think: [{ q: 'What does the writer want? Which words show it?', fig: T.show(T.splash), lines: 2, key: 'The writer wants the splash pad to stay open: "Please keep it open."' },
        { q: 'Who might think differently from this writer? Why?', lines: 2, key: 'For example: someone who wants the money spent on something else.' },
        { q: 'Write one sentence that shows what you think about recess.', lines: 2, key: 'Any opinion with a reason, for example: Recess should be longer because we need to move.' }] }
  } });
})();
