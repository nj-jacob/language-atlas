/* Grade 1 Word Parts and Meanings: printable worksheets. Learn and Practise 1 to 3 are made from chapters/word-parts.js; this file
   adds each idea's "I can" goal and its Think questions. Ontario 2023 Language, Grade 1, B2.6 and B2.7.
   Think questions marked by a computer are checked in tests/verify/grade1-word-parts.js; open ones go to the grown-up. */
(function () {
  var S = Atlas.sheets, Q = Atlas.Q, W = Atlas.W;
  if (!S) return;

  S.register('word-parts', { code: 'WP', ideas: {
    plural: { goal: 'I can add -s or -es to mean more than one.', think: [
      Q.tf('Jack writes <b>foxs</b> for more than one fox. True or false?', false, 'Add -s: foxs.', 'Fox ends in x, so add -es: foxes.',
        { fig: W.pic('fox'), meta: { k: 'g1-plural-tf', w: 'fox', said: 'foxs' } }),
      { q: 'How do you know when to add <b>-es</b>? Say <b>dishes</b> and <b>cups</b>.', lines: 2, key: 'Add -es when the word ends in s, x, z, sh or ch. You can hear the extra beat: dish-es.' },
      { q: 'Write the word for more than one: <b>bus</b>, <b>hat</b>, <b>lunch</b>.', lines: 1, key: 'buses, hats, lunches' }] },
    'ing-ed': { goal: 'I can add -ing and -ed to a doing word.', think: [
      Q.tf('"Yesterday I <b>jumping</b> in the leaves." Mo says the ending is right. True or false?', false, 'jumping fits yesterday.', 'Yesterday is past, so add -ed: jumped.',
        { fig: W.pic('leaf'), meta: { k: 'g1-ing-tf', v: 'jump', when: 'Yesterday', said: 'jumping' } }),
      { q: 'What does <b>-ed</b> tell you about when something happened?', lines: 1, key: 'It already happened (in the past).' },
      { q: 'Finish: Right now I am <b>play___</b>. Yesterday I <b>play___</b>.', lines: 1, key: 'playing, played' }] },
    compound: { goal: 'I can join two words to make one word.', think: [
      Q.tf('Nia says <b>sunset</b> is two small words joined. True or false?', true, 'sun + set = sunset.', 'Sunset is just one small word.',
        { fig: W.pic('sun'), meta: { k: 'g1-compound-tf', w: 'sunset' } }),
      { q: 'What does <b>bedroom</b> mean? Use the two small words.', lines: 2, key: 'A room with a bed in it: bed + room.' },
      { q: 'Make your own compound word with <b>snow</b>, <b>rain</b> or <b>star</b>.', lines: 1, key: 'snowman, snowball, rainbow, raincoat, starfish, starlight' }] },
    same: { goal: 'I can find words that mean the same.', think: [
      Q.tf('Asha says <b>big</b> and <b>large</b> mean the same. True or false?', true, 'Both tell that something is not small.', 'They mean different things.',
        { meta: { k: 'g1-same-mean-tf', a: 'big', b: 'large' } }),
      { q: 'Why might a writer use <b>yell</b> instead of <b>shout</b>?', lines: 2, key: 'To use a different word, so the same word is not repeated, and to make the writing interesting.' },
      { q: 'Write a word that means the same as <b>happy</b>.', lines: 1, key: 'glad, cheerful, joyful' }] },
    opposite: { goal: 'I can find opposites.', think: [
      Q.tf('Finn says the opposite of <b>push</b> is <b>pull</b>. True or false?', true, 'Push moves it away; pull moves it closer.', 'The opposite is another word.',
        { meta: { k: 'g1-opp-tf', a: 'push', b: 'pull' } }),
      { q: 'Act out <b>up</b> and <b>down</b>. How are opposites different from words that mean the same?', lines: 2, key: 'Opposites mean very different things; words that mean the same match.' },
      { q: 'Write the opposites: <b>hot</b>, <b>wet</b>, <b>day</b>.', lines: 1, key: 'cold, dry, night' }] },
    groups: { goal: 'I can sort words into groups.', think: [
      Q.tf('Ella says <b>beaver</b> belongs in the animals group. True or false?', true, 'A beaver is an animal.', 'A beaver belongs in another group.',
        { meta: { k: 'g1-group-tf', w: 'beaver', g: 'animals' } }),
      { q: 'Which word does not belong: <b>rain</b>, <b>snow</b>, <b>plum</b>, <b>fog</b>? Why?', lines: 2, key: 'plum: it is a fruit; the others are weather.' },
      { q: 'Make your own group of three words. Give it a name.', lines: 1, key: 'For example: shapes: circle, square, oval.' }] },
    'new-words': { goal: 'I can use clues to work out a new word.', think: [
      Q.tf('"Our soup was <b>steaming</b>, so we waited for it to cool." Rae says steaming means very cold. True or false?', false, 'Steaming means very cold.', 'We waited for it to cool, so steaming means very hot.',
        { meta: { k: 'g1-context-tf', w: 'steaming', said: 'very cold' } }),
      { q: 'What clue words help you know <b>soaked</b> means very wet? "Jo fell in the puddle and got soaked."', lines: 2, key: 'fell in the puddle' },
      { q: 'Write a new word you learned this week. Draw or write what it means.', lines: 2, key: 'Any new word with a fitting meaning.' }] }
  } });
})();
