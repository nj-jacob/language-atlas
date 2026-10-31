/* Grade 6 answer checks: drafting, revising and publishing (grade6/chapters/writing.js). The checker spots one-sided words for itself,
   finds the off-topic sentence from its own topic words, and keeps its own key for tone and edits. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const TONE = { 'a thank-you note to your hockey coach': /^Thank you for believing/, 'a news report about a flood': /^Heavy rain flooded/, 'a card to a neighbour whose pet died': /^We are thinking of you/,
    'a speech asking for a longer recess': /^A longer recess would help/ };
  V['g6-tone'] = (q, m) => TONE[m.form].test(mk(q)) ? '' : 'expected the sentence with the right tone';
  const moodOf = s => /flooded/.test(s) ? 'calm and factual' : /can't believe/.test(s) ? 'upset' : /Ever!/.test(s) ? 'excited' : /thinking of you/.test(s) ? 'caring' : null;
  V['g6-mood-match'] = q => q.pairs.every(p => moodOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong tone';
  /* one-sided: sweeping or insulting words */
  const oneSided = s => /\b(everyone knows|Only lazy|rot your|the worst season, period)\b/.test(s);
  V['g6-fairer'] = q => { const fit = q.options.map(text).filter(o => !oneSided(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the fair sentence'; };
  V['g6-pick-biased'] = q => H.sameSet(q.options.map((o, i) => (oneSided(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the one-sided sentences are not the ones marked';
  V['g6-other-reader'] = q => /insulted/.test(mk(q)) ? '' : 'expected that the reader may feel insulted';
  /* topic words for each paragraph: a sentence belongs when it is about the topic */
  const TOPIC = { 'Our town needs a public library.': /library|study|book/, 'Canoeing is a great summer activity.': /Canoeing|arms|lakes/, 'Recycling helps our community.': /Recycling|waste|used again/ };
  V['g6-cut-one'] = (q, m) => { const t = TOPIC[m.topic], off = q.options.map(text).filter(o => !t.test(o)); return off.length === 1 && mk(q) === off[0] ? '' : 'expected the off-topic sentence'; };
  V['g6-add-one'] = (q, m) => { const t = TOPIC[m.topic], on = q.options.map(text).filter(o => t.test(o) && !H.has(q.fig, o)); return on.length === 1 && mk(q) === on[0] ? '' : 'expected the on-topic sentence'; };
  V['g6-para-order'] = q => { const t = q.items.map(text); return !/^(For example|That is why)/.test(t[0]) && /^For example/.test(t[1]) && /^That is why/.test(t[2]) ? '' : 'the paragraph is out of order'; };
  const WRONG = { 'Their going to the arena after school.': 'Their', "The dog wagged it's tail.": "it's", 'Each of the students have a locker.': 'have', 'Yesterday we walk to the park.': 'walk', 'We visited ottawa last summer.': 'ottawa' };
  const FIX = { 'Their going to the arena after school.': "They're going to the arena after school.", "The dog wagged it's tail.": 'The dog wagged its tail.', 'Each of the students have a locker.': 'Each of the students has a locker.',
    'Yesterday we walk to the park.': 'Yesterday we walked to the park.', 'We visited ottawa last summer.': 'We visited Ottawa last summer.' };
  V['g6-find-error'] = (q, m) => mk(q) === WRONG[text(m.s)] ? '' : 'expected ' + WRONG[text(m.s)];
  V['g6-fix-it'] = (q, m) => mk(q) === FIX[text(m.s)] ? '' : 'expected ' + FIX[text(m.s)];
  /* a spell-checker flags words that are not real words */
  const REAL = new Set('we went to the their going arena'.split(' '));
  V['g6-spell-check'] = (q, m) => { const flagged = text(m.s).toLowerCase().replace(/[.]/g, '').split(' ').some(w => !REAL.has(w)); return flagged === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong'; };
})();
