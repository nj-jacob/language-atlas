/* Grade 4 Spelling Word Endings: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/spelling.js; this file adds each idea's goal and Think questions. Each rule is said once, in the words the
   lessons use (explicit, systematic spelling rules). Ontario 2023 Language, Grade 4: B2.1 morphemes to read and spell words. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('spelling', { code: 'SP', ideas: {
    'drop-e': { goal: 'I can drop the e before an ending that starts with a vowel.', think: [
      L('Why is it skating, not skateing?', 'The ending -ing starts with a vowel, so the e is dropped.'),
      L('Why does hopeful keep its e?', 'The ending -ful starts with a consonant, so the e stays.'),
      L('Write make + -ing and make + -s. Tell what changed.', 'making drops the e; makes keeps it.') ] },
    double: { goal: 'I can double the last letter of a short word before a vowel ending.', think: [
      L('Why does hop + -ing double the p?', 'One short vowel and one last consonant: double it before a vowel ending.'),
      L('Why does jump + -ing not double?', 'Jump ends in two consonants, so there is nothing to double.'),
      L('What would hoping mean if you meant hopping? Why does the rule matter?', 'Hoping is wishing; hopping is jumping. Doubling keeps the short vowel sound.', 3) ] },
    'y-to-i': { goal: 'I can change y to i before an ending.', think: [
      L('Why is it happier, not happyer?', 'Consonant + y: change y to i before the ending.'),
      L('Why does play + -ed stay played?', 'A vowel comes before the y, so the y stays.'),
      L('Why does cry + -ing keep the y in crying?', 'Changing it would make two i letters together, so before -ing the y stays.') ] },
    es: { goal: 'I can add -es after s, x, ch and sh.', think: [
      L('Why is it boxes, not boxs?', 'After x we add -es, which adds a beat you can hear.'),
      L('Say benches. Clap the beats. What does -es add?', 'An extra beat: ben-ches.'),
      L('Write the plural of three things in a kitchen that need -es.', 'For example: dishes, glasses, peaches.') ] },
    ies: { goal: 'I can change consonant + y to -ies.', think: [
      L('Why is it berries but keys?', 'Berry has a consonant before y, so it becomes -ies. Key has a vowel before y, so just add -s.'),
      L('Write the plural of city and of day.', 'cities, days'),
      L('Ravi wrote "two puppys". Explain how to fix it.', 'Consonant p + y: change y to i and add -es: puppies.') ] }
  } });
})();
