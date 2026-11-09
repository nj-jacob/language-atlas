/* Grade 7 Word Parts: the hand-written part of the printable worksheets (the rest is made from chapters/word-parts.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B2.1 and B2.2.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('word-parts', { code: 'WP', ideas: {
    root: { goal: 'I can use a root to find the core meaning of a word.', think: [
      T('Port means carry. How does that help you with these three words?', 'transport · portable · import', 'Each one is about carrying: carry across, able to be carried, carry in.'),
      T('Why is the root only a start, not the whole meaning?', '', 'The root gives the core idea. The prefix, suffix and sentence give the rest.'),
      T('Rupt means break. Write a word with rupt and say how "break" is in its meaning.', '', 'For example "erupt": to break out, like lava from a volcano.')] },
    family: { goal: 'I can group words that share a root and a meaning.', think: [
      T('Is "sport" in the same family as "transport"? How can you check?', '', 'Check the meaning, not just the letters. A sport is a game, not about carrying, so it does not belong.'),
      T('Spect means look. Write three words in the spect family and the meaning of one.', '', 'For example inspect, spectator, respect. A spectator is a person who looks on.'),
      T('How does knowing one family help you read a new word in it?', '', 'You already know the core meaning, so you only need to work out the new prefix or suffix.')] },
    greek: { goal: 'I can use Greek roots to read science words.', think: [
      T('Make up a sensible meaning for this word from its parts.', 'hydrometer', 'hydro (water) + meter (a tool to measure): a tool that measures water.'),
      T('Micro means small and scope means a tool to look. Why is "microscope" a good name?', '', 'It is a tool for looking at very small things.'),
      T('Why do so many science words use Greek roots?', '', 'Scientists named things with Greek parts, so one set of parts unlocks many words in many subjects.')] },
    split: { goal: 'I can split a long word into meaning parts.', think: [
      T('Why is "in-ter-rupt" by beats not the best split for meaning?', '', 'Split by meaning parts: inter (between) + rupt (break). Beats do not show the meaning.'),
      T('Split this word into parts and give its meaning.', 'transportation', 'trans (across) + port (carry) + ation (the act of): the act of carrying across.'),
      T('Explain the steps you use when you meet a long word you do not know.', '', 'Find the base, then the prefix and suffix, put the meanings together, and check in the sentence.')] },
    suffix: { goal: 'I can use a suffix to change a word\'s meaning and job.', think: [
      T('How do the suffixes change the meaning?', 'fearless · dangerous', '-less means without, so fearless is without fear. -ous means full of, so dangerous is full of danger.'),
      T('Why is "audible means hear" not quite right?', '', 'The suffix -ible means able to be, so audible means able to be heard. It describes a sound.'),
      T('Add a suffix to "spect" to name a person. Then use the word in a sentence.', '', 'Spectator: "A spectator cheered from the stands."')] },
    context: { goal: 'I can check the meaning of the parts against the sentence.', think: [
      T('The parts suggest one meaning. What does the sentence tell you?', 'Her bright, transparent excuse fooled no one.', 'Transparent means see-through. Here it means easy to see through: obvious.'),
      T('Why is the sentence the final check, not the parts?', '', 'Some words have changed over time, so the parts only give a guess. The sentence shows the real meaning.'),
      T('Write a sentence that shows the meaning of "transmit".', '', 'For example: "The radio tower transmits the signal across the lake."')] },
    'drop-e': { goal: 'I can drop the silent e before a vowel suffix.', think: [
      T('Why do we keep the e in "management" but drop it in "hoping"?', '', '-ment starts with a consonant, so the e stays. -ing starts with a vowel, so the e goes.'),
      T('Find the mistake and explain it.', 'The bake sale was a hopless mess, but managment was helpful.', 'Hopeless and management: -less and -ment start with consonants, so the e stays.'),
      T('Write the rule in your own words, with one example.', '', 'Drop the silent e only when the suffix starts with a vowel: make + ing = making.')] },
    double: { goal: 'I can double the last consonant when the last beat is stressed.', think: [
      T('Why does "occur" become "occurred" but "visit" becomes "visited"?', '', 'In occur the stress is on the last beat, so double the r. In visit the stress is on the first beat, so no double.'),
      T('Clap and decide. Write each word with -ing.', 'begin · open · forget · limit', 'beginning, opening, forgetting, limiting.'),
      T('How can saying a word aloud help you spell it?', '', 'You hear which beat is strong. A strong last beat means you double before a vowel suffix.')] },
    'y-i': { goal: 'I can change y to i, but keep the y before -ing.', think: [
      T('Why is "carriing" wrong?', '', 'Before -ing the y stays, because two i\'s in a row look wrong: carrying.'),
      T('Why do we keep the y in "enjoyment" but change it in "happiness"?', '', 'Enjoy has a vowel before the y, so it stays. Happy has a consonant before the y, so it changes to i.'),
      T('Spell each word with -ed and -ing. Explain one.', 'study · play', 'studied, studying; played, playing. Play has a vowel before the y, so the y stays.')] }
  } });
})();
