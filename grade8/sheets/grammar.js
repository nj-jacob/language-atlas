/* Grade 8 Grammar: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from chapters/grammar.js;
   this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up from the key).
   Ontario 2023 Language, Grade 8: B3.2 parts of speech and grammar to communicate clearly and precisely. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('grammar', { code: 'GR', ideas: {
    active: { goal: 'I can tell when the subject does the action.',
      think: [O('Is "The beaver built the dam" active or passive? How do you know?', 4, 'Active: the subject (the beaver) does the action (built).'),
        O('Write an active sentence about a team.', 3, 'For example: Our team won the final.'),
        O('Why do most writers choose active voice?', 4, 'It is shorter, clearer and shows who did the action.')] },
    passive: { goal: 'I can tell when the subject receives the action.',
      think: [O('Underline the subject and say what happens to it: "The bridge was closed by the city."', 4, 'The bridge: it receives the action (it was closed).'),
        O('When is passive voice a good choice?', 4, 'When the doer is unknown or less important, as in science reports: "The water was heated."'),
        O('Write a passive sentence where we do not know who did it.', 3, 'For example: The window was broken overnight.')] },
    change: { goal: 'I can switch a sentence between active and passive voice.',
      think: [O('Make it passive: "Hana painted the mural."', 3, 'The mural was painted by Hana.'),
        O('Make it active: "The game was cancelled by the league."', 3, 'The league cancelled the game.'),
        O('What must stay the same when you switch voice?', 4, 'The meaning: who did what to whom.')] },
    gerund: { goal: 'I can spot an -ing word used as a noun.',
      think: [O('Is "skating" a gerund here? "Skating on the canal is my favourite winter activity." Why?', 4, 'Yes. It is the subject of the sentence, so it works as a noun.'),
        O('Write a sentence with "reading" as a gerund.', 3, 'For example: Reading helps me relax.'),
        O('Why is "She is reading" not a gerund?', 4, 'There "reading" is part of the verb (is reading), not a noun.')] },
    participle: { goal: 'I can spot a verb form that describes a noun.',
      think: [O('Find the participle and the noun it describes: "The frozen lake glittered."', 3, 'frozen describes lake.'),
        O('Write a sentence with a participle that ends in -ing used to describe.', 3, 'For example: The barking dog woke the street.'),
        O('How do you tell a participle from part of a verb?', 4, 'Look for is, are, was or were before it; if there is one, it is part of the verb.')] },
    objects: { goal: 'I can find the direct and indirect objects.',
      think: [O('Find both objects: "Mei gave her brother a scarf."', 4, 'Direct object: a scarf (what she gave). Indirect object: her brother (who got it).'),
        O('Write a sentence with an indirect object.', 3, 'For example: Coach sent the team a message.'),
        O('What questions help you find each object?', 4, 'Direct: what? or whom? after the verb. Indirect: to whom? or for whom?')] },
    predicate: { goal: 'I can find the word after a linking verb that renames or describes the subject.',
      think: [O('In "The soup tastes salty", is salty a predicate noun or adjective? Why?', 4, 'Predicate adjective: it describes the soup after the linking verb tastes.'),
        O('Write a sentence with a predicate noun.', 3, 'For example: My aunt is a pilot.'),
        O('How can you test whether a verb is linking?', 4, 'Swap it for "is": if the sentence still makes sense, it links.')] },
    phrases: { goal: 'I can find phrases that tell where, when or how.',
      think: [O('Find the phrases: "After lunch we paddled along the shore with great care."', 4, 'When: after lunch. Where: along the shore. How: with great care.'),
        O('Add a "where" phrase: "The fox waited ___."', 3, 'For example: behind the woodpile.'),
        O('Why do phrases make writing clearer?', 4, 'They add exact details of place, time and manner.')] },
    self: { goal: 'I can use -self words correctly.',
      think: [O('Fix it: "Send the photos to Kai and myself."', 3, 'Send the photos to Kai and me.'),
        O('Is "myself" reflexive or intensive in "I fixed the bike myself"? Explain.', 4, 'Intensive: it adds emphasis and could be removed.'),
        O('Write a sentence with a reflexive pronoun.', 3, 'For example: Leo taught himself to juggle.')] }
  } });
})();
