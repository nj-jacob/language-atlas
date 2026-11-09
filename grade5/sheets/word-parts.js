/* Grade 5 Word Parts and Spelling: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/word-parts.js; this file adds each idea's "I can" goal and its Think questions (open, marked by a grown-up).
   Ontario 2023 Language: B2.1, B2.2. All words and sentences are written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function O(q, key, n, fig) { return { q: q, fig: fig, lines: n || 3, key: key }; }

  S.register('word-parts', { code: 'WP', ideas: {
    mis: { goal: 'I can use mis- to read and spell words that mean "wrongly".', think: [
      O('Why does <b>misspell</b> have two s\'s?', 'The prefix is mis- and the base is spell. Each part keeps all its letters: mis + spell.', 2),
      O('Write a sentence with <b>misjudge</b>. Show what it means.', 'For example: I misjudged the puddle and stepped right in it. (I judged it wrongly.)'),
      O('Is <b>mist</b> a mis- word? Explain.', 'No. Cover "mis" and only "t" is left. That is not a word, so there is no prefix.', 2)] },
    pre: { goal: 'I can use pre- to read and spell words that mean "before".', think: [
      O('A <b>preview</b> comes before a film. Explain why the name fits.', 'pre- means before and view means see. You see part of the film before it comes out.', 2),
      O('Make two new pre- words and use one in a sentence.', 'For example: precook, preorder. We preordered the book so it came on the first day.'),
      O('Is <b>pretty</b> a pre- word? How do you know?', 'No. Cover "pre" and "tty" is not a word, so there is no prefix.', 2)] },
    dis: { goal: 'I can use dis- to read words that mean "not" or the opposite.', think: [
      O('How are <b>dislike</b> and <b>mislike</b> different? Which is a real word?', 'dislike means not like (the opposite). mis- means wrongly, and "liking wrongly" makes no sense, so dislike is the real word.'),
      O('Write the opposite of each with dis-: <b>obey</b>, <b>trust</b>, <b>connect</b>.', 'disobey, distrust, disconnect.', 2),
      O('Write a sentence where someone <b>disagrees</b> politely.', 'For example: Amara disagreed with her brother, but she listened to his reasons first.')] },
    'drop-e': { goal: 'I can decide whether to drop the final e before a suffix.', think: [
      O('Explain why <b>hope</b> + <b>ing</b> = hoping, but <b>hope</b> + <b>ful</b> = hopeful.', '-ing starts with a vowel, so the e goes. -ful starts with a consonant, so the e stays.'),
      O('A classmate wrote <b>movment</b>. What rule did they use wrongly?', 'They dropped the e before -ment. -ment starts with a consonant, so the e stays: movement.', 2),
      O('Add a suffix to <b>care</b> two ways: one that drops the e, one that keeps it.', 'caring (drops the e before -ing) and careful (keeps the e before -ful).', 2)] },
    'able-ible': { goal: 'I can choose -able or -ible.', think: [
      O('How can covering the ending help you choose -able or -ible?', 'If a whole word is left (wash, read), use -able. If not (vis, poss), it is usually -ible.', 2),
      O('Spell each word: you can <b>enjoy</b> it, you can <b>see</b> it (vis-).', 'enjoyable, visible.', 2),
      O('Write a sentence using one -able word and one -ible word.', 'For example: The trail was enjoyable, and the lake was visible from the top.')] },
    roots: { goal: 'I can use Greek and Latin roots to work out meanings.', think: [
      O('<b>graph</b> means write. List three words with graph and say what each means.', 'For example: autograph (your own name written), photograph (a picture made with light), paragraph (a block of writing).'),
      O('<b>tele</b> means far. Make up a word for a machine that smells things far away. Explain it.', 'For example: telesmell, a machine that lets you smell something from far away. Any made-up word built from tele + a smell word, with a clear explanation.'),
      O('Why should you still check the sentence after you find a root?', 'Some words only look like they have the root (sport is not about carrying). The sentence shows whether the meaning fits.', 2)] },
    'roots-use': { goal: 'I can use a root to understand a new word in a sentence.', think: [
      O('Use the root <b>rupt</b> (break) to explain the bold word.', 'The road was closed and traffic was interrupted: traffic was broken off in the middle, so it stopped for a while.', 2, W.sent('Traffic was <b>interrupted</b> when the road closed.')),
      O('<b>spect</b> means look. Write two spect words and their meanings.', 'For example: inspect (look at closely), spectator (a person who looks on).', 2),
      O('Find a long word in a science or social studies book. What root helped you?', 'Answers vary. For example: transport, port = carry, so moving goods across a place.')] }
  } });
})();
