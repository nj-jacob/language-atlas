/* Grade 7 Grammar: the hand-written part of the printable worksheets (the rest is made from chapters/grammar.js).
   For each idea: its "I can" goal and the Think questions (open, marked by a grown-up from the key). Ontario 2023 Language, Grade 7, B3.2.
   Every sentence is written for this site. */
(function () {
  var S = Atlas.sheets, W = Atlas.W;
  if (!S) return;
  function T(q, s, key, n) { return { q: q, fig: s ? W.sent(s) : '', lines: n || 3, key: key }; }

  S.register('grammar', { code: 'GR', ideas: {
    indirect: { goal: 'I can find the direct and indirect objects.', think: [
      T('Name the direct and the indirect object. How did you find each?', 'The elder taught the children a song.', 'Direct: a song (taught what?). Indirect: the children (taught to whom?).'),
      T('Rewrite with "to" or "for". Does the meaning change?', 'Dad made the team bannock.', '"Dad made bannock for the team." The meaning stays the same.'),
      T('Write a sentence with both a direct and an indirect object.', '', 'For example: "Grandma sent me a postcard." Direct: a postcard. Indirect: me.')] },
    predicate: { goal: 'I can tell a predicate noun from a predicate adjective.', think: [
      T('Is "thin" a predicate noun or a predicate adjective? How do you know?', 'The ice looks thin.', 'A predicate adjective: it describes the ice. "Looks" is the linking verb.'),
      T('How does the equals test help with "Her aunt is a pilot"?', '', 'aunt = pilot works, so pilot renames the subject: a predicate noun.'),
      T('Write one sentence with a predicate noun and one with a predicate adjective. Use "became".', '', 'For example: "The puppy became a guide dog." and "The sky became dark."')] },
    participle: { goal: 'I can find a participle that acts as an adjective.', think: [
      T('Is "shivering" a participle in both sentences? Explain.', 'The shivering boy waited. · Kai is shivering.', 'Only in the first: it describes the boy. In the second it is part of the verb "is shivering".'),
      T('Turn the verb into a participle that describes a noun.', 'The window broke.', '"the broken window".'),
      T('How do participles help a writer paint a picture?', '', 'They pack an action into a describing word: "the howling wind" instead of "the wind that howled".')] },
    opening: { goal: 'I can make an opening phrase describe the right noun.', think: [
      T('What is funny about this sentence? Fix it.', 'Looking out the window, a moose appeared.', 'It says the moose was looking out the window. Fix: "Looking out the window, Kai saw a moose."'),
      T('How do you check an opening phrase?', '', 'Read the phrase, then the noun after the comma, and ask: can that noun do that?'),
      T('Write a sentence that starts with a participle phrase and describes the right person.', '', 'For example: "Tired from the hike, the campers fell asleep."')] },
    adverbial: { goal: 'I can use adverbial phrases to tell when, where, how or why.', think: [
      T('Add a phrase that tells where and one that tells why.', 'The fox ran.', 'For example: "The fox ran across the frozen lake to escape the dogs."'),
      T('Is "in the gym" the same kind of phrase as "in a calm voice"? Explain.', '', 'No. "In the gym" tells where. "In a calm voice" tells how.'),
      T('How do adverbial phrases help a reader?', '', 'They add when, where, how and why, so the reader can picture the event clearly.')] }
  } });
})();
