/* Grade 8 Sentence Structure: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/sentences.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B3.1 complex sentences that connect ideas. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('sentences', { code: 'SE', ideas: {
    independent: { goal: 'I can tell whether a clause can stand alone as a sentence.',
      think: [O('"Running down the hall to class" is long. Why is it not a sentence?', 4, 'It has no subject: we do not know who is running.'),
        O('Write an independent clause about the weather.', 3, 'Any subject and verb that is a complete thought, for example: The fog lifted.'),
        O('What two parts does every independent clause need?', 3, 'A subject and a verb (and a complete thought).')] },
    dependent: { goal: 'I can join a dependent clause to a main clause.',
      think: [O('Finish the sentence: "Because the ferry was cancelled, ..."', 4, 'Any main clause, for example: we stayed another night in Tobermory.'),
        O('List four words that start a dependent clause.', 3, 'Any four of: because, when, although, if, since, after, before, while, unless.'),
        O('Why is "When the lights went out." not a sentence?', 4, 'It leaves us waiting: it needs a main clause to say what happened.')] },
    relative: { goal: 'I can add a relative clause that describes a noun.',
      think: [O('Add a who clause: "My cousin ___ is coming to visit."', 4, 'For example: My cousin, who lives in Iqaluit, is coming to visit.'),
        O('What is confusing about: "We bought a canoe from a neighbour that leaks"?', 4, 'The clause sits next to neighbour, so it sounds like the neighbour leaks. Move it: a canoe that leaks.'),
        O('When do you use who, and when do you use which?', 4, 'Who for people; which (or that) for things and animals.')] },
    compound: { goal: 'I can join two independent clauses with a comma and a joining word.',
      think: [O('Join with a comma and a joining word: "The snow stopped. The roads stayed closed."', 3, 'The snow stopped, but the roads stayed closed.'),
        O('Why does "so" make a different sentence than "but"?', 4, 'So shows a result; but shows a contrast.'),
        O('Write a compound sentence about your weekend.', 4, 'Two independent clauses joined by a comma and and, but, or or so.')] },
    complex: { goal: 'I can build a complex sentence and put the comma in the right place.',
      think: [O('Write the same complex sentence two ways: dependent clause first, then last.', 5, 'For example: Although it rained, we hiked. / We hiked although it rained. (Comma only when the dependent clause comes first.)'),
        O('Why does a complex sentence show how ideas are related better than two short ones?', 4, 'The joining word (because, although, when) shows the link: cause, contrast or time.'),
        O('Turn into a complex sentence: "The bell rang. Everyone stood up."', 3, 'When the bell rang, everyone stood up.')] },
    'compound-complex': { goal: 'I can build a sentence with two main clauses and a dependent clause.',
      think: [O('Write a compound-complex sentence about a storm.', 4, 'For example: When the storm hit, the power went out, so we lit candles.'),
        O('Mark the clauses in: "After the game ended, Zara went home, but Kai stayed to help."', 4, 'Dependent: After the game ended. Independent: Zara went home; Kai stayed to help.'),
        O('Is every long sentence compound-complex? Explain.', 4, 'No. It needs at least two independent clauses and at least one dependent clause.')] },
    fragment: { goal: 'I can find a fragment and fix it.',
      think: [O('Fix the fragment: "The old canoe in the shed."', 3, 'For example: The old canoe in the shed needs new paint.'),
        O('Why do a capital letter and a full stop not make a sentence?', 4, 'A sentence also needs a subject, a verb and a complete thought.'),
        O('Name two ways to fix a fragment.', 4, 'Add the missing subject or verb, or join it to the sentence next to it.')] },
    'run-on': { goal: 'I can fix a run-on sentence with a proper join.',
      think: [O('Fix the comma splice in three ways: "The bus was late, we missed class."', 5, 'The bus was late. We missed class. / The bus was late, so we missed class. / The bus was late; we missed class.'),
        O('What is a comma splice?', 3, 'Two sentences joined with only a comma.'),
        O('Which fix do you like best for the bus sentence? Why?', 4, 'Any fix with a reason, for example "so" because it shows the cause.')] }
  } });
})();
