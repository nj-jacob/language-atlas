/* Grade 8 Roots and Word Parts: printable worksheets (assets/engine/sheets.js). Learn and Practise 1 to 3 are made from
   chapters/roots.js; this file adds each idea's "I can" goal and its Think questions (open answers, marked by a grown-up
   from the key). Ontario 2023 Language, Grade 8: B2.1 morphemes to read and spell complex words. */
(function () {
  var S = Atlas.sheets;
  if (!S) return;
  function O(q, lines, key) { return { q: q, lines: lines, key: key }; }

  S.register('roots', { code: 'RT', ideas: {
    root: { goal: 'I can find the root in a long word and use it to work out the meaning.',
      think: [O('The root dict means "say". What might a dictator do? Use the root in your answer.', 2, 'A dictator says what must happen: gives orders that others must follow.'),
        O('Write two words with the root port ("carry"). Say what each one carries.', 2, 'For example: transport carries people or goods across; portable can be carried.'),
        O('Nadia says "spectacular" has nothing to do with seeing. Is she right? Explain.', 2, 'No. Spect means "look", so something spectacular is amazing to look at.')] },
    'two-roots': { goal: 'I can read a word made of two roots and put their meanings together.',
      think: [O('Tele means "far" and phon means "sound". Explain why "telephone" is a good name.', 2, 'A telephone carries sound from far away.'),
        O('Bio means "life" and graph means "write". What is a biography? What would an autobiography be?', 2, 'A written story of someone’s life; an autobiography is a life story the person writes about themself.'),
        O('Make up a word from two roots you know. Say what it would mean.', 2, 'Any two real roots with a fitting meaning, for example "aquaphone": a device that carries sound under water.')] },
    family: { goal: 'I can build a word family from one root and spot words that only look alike.',
      think: [O('Write four words in the vis / vid family ("see").', 2, 'Any four of: visible, vision, visit, video, evident, provide, revise, invisible, television.'),
        O('Is "sport" in the port ("carry") family? How can you check?', 2, 'No. Check whether the meaning of carry fits; sport is about games, so port here is not the root.'),
        O('How does knowing one word family help you spell its other words?', 2, 'The root keeps its spelling in every word, so if you can spell it in one word you can spell it in the others.')] },
    jobs: { goal: 'I can use a suffix to change a word’s job in a sentence.',
      think: [O('Write create as a thing (noun), a describing word (adjective) and a how word (adverb).', 2, 'creation (or creator, creativity), creative, creatively.'),
        O('What is wrong with "Omar gave a creatively answer"? Fix it.', 2, 'The gap needs a describing word, not a how word: Omar gave a creative answer.'),
        O('Name two suffixes that make nouns and two that make adjectives.', 2, 'Nouns: -tion, -ment, -ness, -ity, -er. Adjectives: -ful, -ous, -ive, -able, -al.')] },
    fit: { goal: 'I can pick the form of a word that does the job the sentence needs.',
      think: [O('Write one sentence each for decide and decision.', 3, 'For example: We will decide tonight. The decision was hard.'),
        O('"The ___ of the bridge took two years." Which fits: construct, construction or constructive? Why?', 2, 'Construction. The gap needs a thing (a noun) after "the".'),
        O('How can you tell which job a gap needs before you read the choices?', 2, 'Look at the words around it: after "the" or "a" a noun, before a noun an adjective, after a verb often an adverb.')] },
    'e-drop': { goal: 'I can drop the silent e before a suffix that starts with a vowel.',
      think: [O('Add -ing and -ment to "excite". Explain why only one drops the e.', 2, 'exciting drops the e (suffix starts with a vowel); excitement keeps it (suffix starts with a consonant).'),
        O('Liam wrote "usful". What rule did he break? Fix it.', 2, 'The e stays before a consonant suffix: useful.'),
        O('Write two more words that keep the e and two that drop it.', 2, 'Keep: hopeful, careless, movement. Drop: hoping, writing, lovable, closure.')] },
    'y-i': { goal: 'I can change y to i when a consonant comes before it.',
      think: [O('Why is it "happiness" but "playful"?', 2, 'In happy a consonant (p) comes before the y, so y changes to i; in play a vowel (a) comes before the y, so it stays.'),
        O('Add -ing to "carry". Does the y change? Why not?', 2, 'carrying. The y stays before -ing, or you would get two i’s.'),
        O('Write a rule for y in your own words, with one example.', 2, 'After a consonant, change y to i before a suffix (beauty, beautiful), except before -ing.')] },
    double: { goal: 'I can double the last consonant when the stress is on the last beat.',
      think: [O('Why does "begin" become "beginning" but "open" become "opening"?', 2, 'Begin is stressed on the last beat (be-GIN), so the n doubles; open is stressed on the first beat (O-pen), so it does not.'),
        O('Say "prefer" and "preference". What happens to the stress and the r?', 2, 'Preferred keeps the stress at the end and doubles the r; in preference the stress moves to the front, so the r does not double.'),
        O('Write two words that double and two that do not.', 2, 'Double: forgetting, admitted, occurred. Not: visiting, opening, happened, limited.')] },
    'in-prefix': { goal: 'I can choose in-, im-, il- or ir- and keep both letters when they meet.',
      think: [O('Why does "illegal" have two l’s?', 2, 'The prefix il- (not) joins legal, which starts with l, so both l’s stay: il + legal.'),
        O('Make each word mean "not": mature, regular, logical, active.', 2, 'immature, irregular, illogical, inactive.'),
        O('Explain how the first letter of the base word tells you which prefix to use.', 2, 'Before m, p or b use im-; before l use il-; before r use ir-; otherwise in-.')] }
  } });
})();
