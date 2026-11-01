/* Grade 6 answer checks: drafting, revising and publishing (grade6/chapters/writing.js). The checker keeps its own key for tone, one-sided
   sentences, off-topic sentences and edits, and works out what a spell-checker would flag from its own list of real words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  const only = (q, ok) => { const fit = q.options.map(text).filter(ok); return fit.length === 1 && mk(q) === fit[0]; };

  const TONE = { 'a thank-you note to your hockey coach': /^Thank you for believing/, 'a news report about a flood': /^Heavy rain flooded/, 'a card to a neighbour whose pet died': /^We are thinking of you/,
    'a speech asking for a longer recess': /^A longer recess would help/, 'an invitation to a class party': /^Please join us/, 'a science lab report': /^The ice melted in 12 minutes/,
    'an apology to a friend': /^I am sorry I forgot/, 'a complaint letter to a store': /^The jacket I bought/, 'a welcome sign for new students': /^Welcome! We are so glad/,
    'a review of a favourite book': /^This book kept me reading/ };
  V['g6-tone'] = (q, m) => only(q, o => TONE[m.form].test(o)) ? '' : 'expected the sentence with the right tone';
  V['g6-tone-tf'] = (q, m) => tf(q, TONE[m.form].test(text(m.s)));
  const MOOD = { 'Heavy rain flooded three streets on Tuesday.': 'calm and factual', "I can't believe they cut down the old oak. It was ours.": 'upset', 'Best. Day. Ever!': 'excited',
    'We are thinking of you, and we are so sorry.': 'caring', 'Thank you so much for driving us to the tournament.': 'grateful', 'This is the third time my bike has been stolen!': 'angry',
    'What if the ice is too thin to cross?': 'worried', 'I finally finished the whole 5 km run.': 'proud', 'Another rainy day. Nothing to do. Again.': 'bored',
    'Maybe next year our team will make the finals.': 'hopeful' };
  V['g6-mood-match'] = q => q.pairs.every(p => MOOD[text(p[0])] === text(p[1])) ? '' : 'a sentence is matched to the wrong tone';
  V['g6-mood-of'] = (q, m) => mk(q) === MOOD[text(m.s)] ? '' : 'expected ' + MOOD[text(m.s)];

  /* one-sided: sweeping words that judge a whole group */
  const oneSided = s => /\b(everyone knows|Only lazy|rot your|worst season, period|never read|know nothing|cannot use|only real|terrible taste|total waste)\b/.test(s);
  V['g6-fairer'] = q => only(q, o => !oneSided(o)) ? '' : 'expected the fair sentence';
  V['g6-pick-biased'] = q => H.sameSet(q.options.map((o, i) => (oneSided(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the one-sided sentences are not the ones marked';
  V['g6-other-reader'] = q => oneSided(text(q.q)) && /judged/.test(mk(q)) ? '' : 'expected that the reader may feel judged';
  V['g6-write-fair-tf'] = (q, m) => tf(q, !oneSided(text(m.s)));

  /* off-topic sentences, and the detail that belongs with each topic */
  const OFF = new Set(['My cousin has a red bike.', 'Pizza is my favourite food.', 'Snow fell early this year.', 'My sister likes to paint.', 'The mall closes at nine.', 'I watched a movie last night.',
    'My shoes are too small.', 'Our car needs new tires.', 'The cafeteria sells muffins.', 'Basketball is played with a ball.']);
  const ADD = { 'Our town needs a public library.': 'Seniors could join book clubs there.', 'Canoeing is a great summer activity.': 'You can explore lakes and rivers.',
    'Recycling helps our community.': 'It saves materials that can be used again.', 'Bikes are good for the environment.': 'They take up less space on the road.',
    'Beavers are skilled builders.': 'Their dams can block whole streams.', 'Our school garden is growing well.': 'We picked our first tomatoes on Monday.',
    'Learning a second language has benefits.': 'It can make travel easier.', 'The northern lights are amazing to see.': 'They are easiest to see far from city lights.',
    'Sleep is important for students.': 'It gives you energy for the next day.', 'Volunteering helps our community.': 'They also clean up local parks.' };
  V['g6-cut-one'] = q => only(q, o => OFF.has(o)) ? '' : 'expected the off-topic sentence';
  V['g6-add-one'] = (q, m) => only(q, o => ADD[m.topic] === o) && !H.has(q.fig, mk(q)) ? '' : 'expected the on-topic sentence';
  V['g6-revise-tf'] = (q, m) => tf(q, OFF.has(text(m.cut)));
  V['g6-para-order'] = q => { const t = q.items.map(text); return !/^(For example|That is why)/.test(t[0]) && /^For example/.test(t[1]) && /^That is why/.test(t[2]) ? '' : 'the paragraph is out of order'; };

  /* edits: the checker's own key of the wrong word, the fix and the kind of mistake */
  const EDIT = { 'Their going to the arena after school.': ['Their', "They're going to the arena after school.", 'spelling'], "The dog wagged it's tail.": ["it's", 'The dog wagged its tail.', 'spelling'],
    'There dog barked all night.': ['There', 'Their dog barked all night.', 'spelling'], 'Each of the students have a locker.': ['have', 'Each of the students has a locker.', 'grammar'],
    'Yesterday we walk to the park.': ['walk', 'Yesterday we walked to the park.', 'grammar'], 'I could of finished sooner.': ['of', 'I could have finished sooner.', 'grammar'],
    'Me and Kai built a fort.': ['Me', 'Kai and I built a fort.', 'grammar'], 'She has went to Halifax twice.': ['went', 'She has gone to Halifax twice.', 'grammar'],
    'The team played good today.': ['good', 'The team played well today.', 'grammar'], 'We visited ottawa last summer.': ['ottawa', 'We visited Ottawa last summer.', 'capitals'],
    'My birthday is in june.': ['june', 'My birthday is in June.', 'capitals'], 'We met dr. Ahmed at the clinic.': ['dr.', 'We met Dr. Ahmed at the clinic.', 'capitals'] };
  V['g6-find-error'] = (q, m) => mk(q) === EDIT[text(m.s)][0] ? '' : 'expected ' + EDIT[text(m.s)][0];
  V['g6-fix-it'] = (q, m) => mk(q) === EDIT[text(m.s)][1] ? '' : 'expected ' + EDIT[text(m.s)][1];
  V['g6-edit-kind'] = (q, m) => mk(q) === EDIT[text(m.s)][2] ? '' : 'expected ' + EDIT[text(m.s)][2];
  /* a spell-checker flags words that are not real words */
  const REAL = new Set(('we went to the i was late of snow my lives in moncton will come see you their going arena would like by a new book whether is cold today one game can here music').split(' '));
  V['g6-spell-check'] = (q, m) => { const flagged = text(m.s).toLowerCase().replace(/[.?]/g, '').split(' ').some(w => !REAL.has(w)); return flagged === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong'; };
})();
