/* Grade 4 Capitals and Punctuation: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 come from
   chapters/punctuation.js; this file adds each idea's goal and Think questions.
   Ontario 2023 Language, Grade 4: B3.3 capitals for proper adjectives, commas in direct address, quotation marks for short titles. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function L(q, key, n) { return { q: q, lines: n || 2, key: key }; }

  S.register('punctuation', { code: 'PU', ideas: {
    'proper-adjectives': { goal: 'I can capitalize describing words made from names.', think: [
      L('Fix it: "We ate french toast and drank canadian maple milk."', 'French toast, Canadian maple milk.'),
      L('Why does Ontarian get a capital letter?', 'It is made from a name, Ontario.'),
      L('Write a sentence with a describing word made from a place name.', 'For example: We read a Haudenosaunee story.') ] },
    'direct-address': { goal: 'I can use commas around the name of the person I speak to.', think: [
      L('Add commas: "Ana please pass the map."', 'Ana, please pass the map.'),
      L('Explain the difference: "Let\'s eat, Grandpa." and "Let\'s eat Grandpa."', 'The comma shows you are talking to Grandpa, not eating him.', 3),
      L('Write a sentence where you talk to a friend by name in the middle.', 'For example: I think, Omar, that we should go.') ] },
    titles: { goal: 'I can put quotation marks around a short title.', think: [
      L('Fix it: My poem is called The Loon at Dusk.', 'My poem is called "The Loon at Dusk."'),
      L('Which titles get quotation marks: a poem, a song, a whole book?', 'A poem and a song. A whole book is underlined or in italics.'),
      L('Write the title of a song or poem you like, with the marks.', 'Any short title inside quotation marks.') ] }
  } });
})();
