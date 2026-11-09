/* Grade 1 Thinking About Texts: printable worksheets. Learn and Practise 1 to 3 are made from chapters/thinking.js; this file adds
   each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, C1.3 to C1.5, C3.1 to C3.3 and C3.5
   (C3.4 and C3.6 to C3.8 are activities, printed as Activity sheets).
   Think questions marked by a computer are checked in tests/verify/grade1-thinking.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W, T = Atlas.texts;
  if (!S) return;

  S.register('thinking', { code: 'TH', ideas: {
    titles: { goal: 'I can use a title to guess what a text is about.', think: [
      Q.tf('The title is "All About Owls". Kim says it is about a puppy that gets lost. True or false?', false, 'The title is about a lost puppy.', 'The title tells us it gives facts about owls.',
        { fig: W.icon('read'), meta: { k: 'g1-title-tf', t: 'All About Owls', said: 'a puppy that gets lost' } }),
      { q: 'Make up a title for a story about your best day.', lines: 1, key: 'Any title that fits, with capital letters for the main words.' },
      { q: 'Why do instructions have numbers like 1, 2, 3?', lines: 2, key: 'To show the order of the steps.' }] },
    pictures: { goal: 'I can match pictures and words.', think: [
      Q.tf('Does the picture match the sentence?', true, 'The sentence is about a fox, and the picture shows a fox.', 'The picture shows something else.',
        { fig: W.pic('fox') + W.sent('The fox ran into the woods.'), meta: { k: 'g1-pic-tf', s: 'The fox ran into the woods.' } }),
      { q: 'Draw a picture for this sentence: <b>A red leaf fell on the path.</b>', lines: 1, key: 'A drawing of a red leaf on a path.' },
      { q: 'How can a picture help you read a word you do not know?', lines: 2, key: 'The picture shows what the word might be, so you can check the letters.' }] },
    'word-choice': { goal: 'I can find words that paint a picture.', think: [
      Q.tf('Does this sentence have picture words?', true, 'Tiny, yellow and happy help me picture it.', 'It has no picture words.',
        { fig: W.sent('The tiny yellow bird sang a happy song.'), meta: { k: 'g1-vivid-tf' } }),
      { q: 'Make it paint a picture: <b>The dog ran.</b>', lines: 2, key: 'Add describing and strong words, for example: The fluffy dog raced across the wet grass.' },
      { q: 'Which word paints a better picture, <b>ate</b> or <b>gobbled</b>? Why?', lines: 2, key: 'gobbled: it shows eating fast and hungrily.' }] },
    rhyme: { goal: 'I can hear words that rhyme.', think: [
      { q: 'Which word rhymes with <b>cat</b>?', fig: W.pic('cat'), type: 'mc', options: ['cap', 'hat', 'cot'], answer: 1, meta: { k: 'g1-rhyme', w: 'cat' } },
      { q: 'Why do poems often use rhyme?', lines: 2, key: 'Rhyme makes a poem fun to say and easy to remember.' },
      { q: 'Write three words that rhyme with <b>sun</b>.', fig: W.pic('sun'), lines: 1, key: 'fun, run, bun, done, one' }] },
    'sound-words': { goal: 'I can find sound words.', think: [
      { q: 'Which word is a sound word?', fig: W.pic('bee'), type: 'mc', options: ['bee', 'buzz', 'fly'], answer: 1, meta: { k: 'g1-sound-word' } },
      { q: 'Why would a writer use <b>splash</b> instead of "the water made a sound"?', lines: 2, key: 'Splash lets you hear the sound in your head; it is shorter and more fun.' },
      { q: 'Write a sound word for rain on a window.', fig: W.pic('rain'), lines: 1, key: 'drip, drop, plop, tap, pitter-patter' }] },
    'same-start': { goal: 'I can find words that start with the same sound.', think: [
      Q.tf('Do all the words start with the same sound?', true, 'Every word starts with /s/.', 'One word starts with another sound.',
        { fig: W.sent('Silly Sam sings songs.'), meta: { k: 'g1-same-tf' } }),
      { q: 'Make your own: three or more words that start with the same sound as your name.', lines: 2, key: 'For example: Lily likes lemons.' },
      { q: 'Why might a writer put words that start the same together?', lines: 2, key: 'It sounds fun and makes the words stick in your mind.' }] },
    feelings: { goal: 'I can use clues to tell how someone feels.', think: [
      Q.tf('"Ben stomped his feet." Maya says Ben feels angry. True or false?', true, 'Stomping feet is a clue for angry.', 'There is no clue for angry.',
        { fig: W.sent('Ben stomped his feet.'), meta: { k: 'g1-feel-tf', text: 'Ben stomped his feet.', said: 'angry' } }),
      { q: 'Write a clue that shows someone feels tired, without the word "tired".', lines: 2, key: 'For example: Her eyes kept closing.' },
      { q: 'How does Tala feel when the kite goes up? What words tell you?', fig: T.show(T.kite), lines: 2, key: 'Excited: she calls "Look, Grandpa!"' }] },
    order: { goal: 'I can tell what happened in order.', think: [
      { q: 'Put these in the order they happen in the story.', fig: T.show(T.kite), type: 'order',
        items: ['had a new kite', 'ran across the big field', 'lifted the kite up high', 'clapped and smiled'], meta: { k: 'g1-order' } },
      { q: 'Why does the order of events matter in a story?', lines: 2, key: 'If the order changes, the story would not make sense.' },
      { q: 'Tell how you get ready for bed: first, next, last.', lines: 3, key: 'Three steps in a sensible order.' }] },
    view: { goal: 'I can tell what someone thinks.', think: [
      Q.tf('Mateo says, "Dogs are the best pets." Rob says Mateo thinks dogs make great pets. True or false?', true, 'His words "the best pets" show what he thinks.', 'He thinks something else.',
        { fig: W.pic('dog'), meta: { k: 'g1-view-tf', who: 'Mateo', said: 'Dogs make great pets.' } }),
      { q: 'Write what you think about winter. Use "I think".', fig: W.pic('snow'), lines: 2, key: 'Any opinion, for example: I think winter is fun because I can skate.' },
      { q: 'Could someone else think something different about winter? What might they say?', lines: 2, key: 'Yes, for example: I think winter is too cold.' }] }
  } });
})();
