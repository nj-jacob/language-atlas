/* Grade 8 Punctuation: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/punctuation.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B3.3 capitalization and punctuation to communicate meaning. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('punctuation', { code: 'PU', ideas: {
    semicolon: { goal: 'I can join two complete sentences with a semicolon.',
      think: [O('Join with a semicolon: "The rink opened early. The ice was perfect."', 1, 'The rink opened early; the ice was perfect.'),
        O('Why is this wrong? "We packed; snacks, maps and water."', 2, 'What follows the semicolon is a list, not a complete sentence. Use a colon.'),
        O('When would you choose a semicolon instead of a full stop?', 2, 'When the two sentences are closely linked.')] },
    however: { goal: 'I can punctuate however, therefore and other linking words between two sentences.',
      think: [O('Punctuate: "The trail was steep however we reached the top."', 1, 'The trail was steep; however, we reached the top.'),
        O('Write a sentence with "therefore" between two clauses.', 1, 'For example: The roads were icy; therefore, school was closed.'),
        O('Why is a comma before however not enough?', 2, 'It joins two complete sentences, which makes a run-on (a comma splice).')] },
    'colon-list': { goal: 'I can use a colon after a complete sentence to introduce a list.',
      think: [O('Fix it: "We need: a tent, a stove and a map."', 1, 'We need a tent, a stove and a map. (Or: We need three things: a tent, a stove and a map.)'),
        O('Write a sentence that uses a colon to introduce a list.', 1, 'A complete sentence, a colon, then the list.'),
        O('What must come before a colon?', 1, 'A complete sentence.')] },
    quote: { goal: 'I can quote a text’s exact words and punctuate the quotation.',
      think: [O('Write a sentence that quotes the line "The river remembers everything." Use a colon after a complete sentence.', 2, 'For example: The narrator ends with a warning: "The river remembers everything."'),
        O('Why must you put copied words in quotation marks?', 2, 'Otherwise you present someone else’s words as your own.'),
        O('Where does the full stop go when a quotation ends a sentence?', 1, 'Inside the closing quotation mark.')] },
    dash: { goal: 'I can use a dash for a break and an ellipsis for a pause or a missing part.',
      think: [O('Add a dash: "There was only one thing left to do run."', 1, 'There was only one thing left to do — run.'),
        O('Shorten with an ellipsis: "The storm, which had been building all afternoon, finally broke."', 1, 'The storm ... finally broke.'),
        O('How is the effect of a dash different from an ellipsis?', 2, 'A dash is a sudden break; an ellipsis trails off or shows words left out.')] },
    extra: { goal: 'I can set off extra information with commas.',
      think: [O('Add commas: "Our coach a former Olympian runs every morning."', 1, 'Our coach, a former Olympian, runs every morning.'),
        O('How can you check that information is extra?', 2, 'Take it out: if the sentence still makes sense, it is extra.'),
        O('Write a sentence with extra information in the middle.', 1, 'Two commas around the extra part.')] },
    transition: { goal: 'I can put a comma after a transition word or phrase.',
      think: [O('Add the comma: "On the other hand the bus is cheaper."', 1, 'On the other hand, the bus is cheaper.'),
        O('List four transitions that are followed by a comma.', 1, 'Any four of: however, first, finally, for example, in addition, as a result, meanwhile.'),
        O('Write two sentences linked by a transition.', 2, 'For example: The road was flooded. As a result, we took the train.')] },
    proper: { goal: 'I can capitalize proper adjectives but not the nouns after them.',
      think: [O('Fix it: "We visited the japanese Garden and ate french Toast."', 1, 'We visited the Japanese garden and ate French toast.'),
        O('What is a proper adjective? Give two examples.', 2, 'An adjective made from a proper noun, such as Canadian or Cree.'),
        O('Write a sentence with a proper adjective from a place in Canada.', 1, 'For example: We tried Acadian music at the festival.')] }
  } });
})();
