/* Grade 2 Sounds and Spelling: the hand-written part of the printable worksheets. Learn and Practise 1 to 3 are made by
   the worksheet engine from chapters/sounds.js; this file adds each idea's "I can" goal and its Think questions.
   Ontario 2023 Language: B2.1 blending, flexing and segmenting; B2.2 spelling choices by position. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('sounds', { code: 'SO', ideas: {
    blend: { goal: 'I can blend sounds to read a word.', think: [
      O('Touch a finger for each sound in s-p-l-i-t. Blend them. Write the word.', 'split (5 sounds, 5 fingers)', 2),
      O('Why do we say stop sounds short, like /p/ and not “puh”?', 'An extra “uh” adds a sound, so the blend sounds wrong.'),
      O('Blend sun + set. Write the word, then use it in a sentence.', 'sunset. For example: We watched the sunset at the lake.')] },
    segment: { goal: 'I can split a word into its sounds to spell it.', think: [
      O('duck has 4 letters. How many sounds does it have? Tell why.', '3 sounds: /d/ /u/ /k/. ck makes one sound.'),
      O('Say “shelf” slowly. Draw a box for each sound and write the letters.', 'sh | e | l | f (4 sounds)', 2),
      O('Your friend spelled frog as “fog”. Which sound is missing? How can you check?', 'The /r/. Tap each sound: f-r-o-g.')] },
    flex: { goal: 'I can try the other vowel sound when a word does not sound right.', think: [
      O('You read robot as “rob-ot”. What do you try next?', 'Try the long o: ro-bot. That is a real word.'),
      O('Why should you stop when a word does not make sense?', 'A made-up word changes the meaning. Fix it, then read on.'),
      O('Split these two ways and circle the real word: camel, tiger.', 'cam-el (short a), ti-ger (long i)', 2)] },
    'soft-c': { goal: 'I can tell when c says /s/.', think: [
      O('Why does c say /s/ in city but /k/ in cat?', 'In city, c comes before i. In cat, c comes before a.'),
      O('Write two words where c says /s/ and two where it says /k/.', 'For example: /s/ face, rice; /k/ cup, corn.'),
      O('Circle the c that says /s/ in “The mice ran in a circle.” Tell how you knew.', 'mice, the first c in circle: each is before e or i.')] },
    'soft-g': { goal: 'I can tell when g says /j/.', think: [
      O('Why does g say /j/ in giant but /g/ in goat?', 'In giant, g comes before i. In goat, g comes before o.'),
      O('get and girl break the pattern. What do you do if soft g does not make a word?', 'Try hard g: /g/ get, /g/ girl.'),
      O('Write a sentence with a soft g word and a hard g word.', 'For example: The huge goat ate the grass.')] },
    'long-o': { goal: 'I can choose o-e or oa to spell long o.', think: [
      O('Which spelling of long o should you try first in the middle of a word? Why?', 'o-e, because it is the most common in the middle.'),
      O('rode and road sound the same. Write a sentence for each.', 'For example: I rode my bike. The road was wet.'),
      O('Someone wrote “hoam”. Fix it and tell why.', 'home. Try o-e first in the middle of a word.')] },
    air: { goal: 'I can spell the air sound with air, are or ear.', think: [
      O('pair and pear sound the same. How do you know which to write?', 'Think about the meaning: a pair of socks, a pear to eat.'),
      O('Write one word for each spelling: air, are, ear.', 'For example: chair, share, bear.'),
      O('Write a sentence that uses chair and bear.', 'For example: The bear sat on a chair.')] }
  } });
})();
