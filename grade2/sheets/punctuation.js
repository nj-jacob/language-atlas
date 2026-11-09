/* Grade 2 Capitals and Punctuation: the hand-written part of the printable worksheets (goals and Think questions).
   Learn and Practise 1 to 3 are made by the worksheet engine from chapters/punctuation.js.
   Ontario 2023 Language: B3.3 capitals for proper nouns, commas in lists, apostrophes for owners, speech marks. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  /* an open Think question: lines to write on, and a good answer for the key (never auto-marked) */
  function O(q, key, n) { return { q: q, lines: n || 3, key: key }; }

  S.register('punctuation', { code: 'PU', ideas: {
    names: { goal: 'I can start the names of people and places with a capital.', think: [
      O('Write your name, your street and your town with capitals.', 'Each name starts with a capital letter.'),
      O('Fix it: “my Dog likes to swim in lake simcoe.”', 'My dog likes to swim in Lake Simcoe.', 2),
      O('Why does dog have no capital, but Biscuit does?', 'Biscuit is a name. dog is not a special name.')] },
    days: { goal: 'I can start days and months with a capital.', think: [
      O('Write the day today and the month of your birthday.', 'For example: Monday, June.', 2),
      O('Does winter need a capital? Tell why.', 'No. Seasons are not names, but days and months are.'),
      O('Fix it: “On friday in october we went to the Fair.”', 'On Friday in October we went to the fair.', 2)] },
    list: { goal: 'I can put commas between things in a list.', think: [
      O('Write a list of three things in your lunch with commas.', 'For example: I have an apple, a sandwich and a cookie.'),
      O('Fix it: “We saw, ducks geese and a heron.”', 'We saw ducks, geese and a heron.', 2),
      O('Why do we need commas in a list?', 'So the reader can tell where one thing ends and the next starts.')] },
    owner: { goal: 'I can use ’s to show who owns something.', think: [
      O('Write: the hat that belongs to Kai.', 'Kai’s hat', 2),
      O('What is the difference between “Kais” and “Kai’s”?', 'Kai’s means it belongs to Kai. Kais looks like more than one Kai.'),
      O('Write a sentence about something that belongs to a friend.', 'For example: Ava’s kite is red.')] },
    'speech-marks': { goal: 'I can put speech marks around the words someone says.', think: [
      O('Add speech marks: Let’s go skating, said Dad.', '“Let’s go skating,” said Dad.', 2),
      O('Which words go inside the speech marks?', 'Only the words the person says out loud.'),
      O('Write what a friend said to you today, with speech marks.', 'For example: “Can I play?” asked Noor.')] }
  } });
})();
