/* Grade 5 answer checks: listening and speaking (grade5/chapters/talking.js). The checker keeps its own rules and lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* an open question starts with what, how or why */
  V['g5-elaborate'] = q => { const ok = q.options.map(text).filter(o => /^(What|How|Why)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the open question'; };
  const GOOD = /^(I agree with|Adding to what|I see it a bit differently|Can you say more)/;
  V['g5-build-on'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good responses are not the ones marked';
  V['g5-interest-tf'] = (q, m) => (/^Nodding/.test(m.said) === q.answer) && text(q.why.options[q.why.answer]).startsWith(q.answer ? 'It shows' : 'It stops') ? '' : 'true/false is wrong';
  const PURPOSE = { 'Turn left at the library, then walk two blocks.': 'to give directions', 'Stir the soup, then turn the heat down low.': 'to give directions',
    'You should all vote for a longer recess. It helps us learn!': 'to persuade', 'Please sign our petition to save the old oak tree.': 'to persuade',
    'Loons can dive deeper than a ten-storey building is tall.': 'to inform', 'The CN Tower opened in 1976.': 'to inform',
    'So there I was, stuck in a snowbank, with a pizza on my head!': 'to entertain', 'Want to hear about the day my hamster escaped into the piano?': 'to entertain' };
  V['g5-listen-purpose'] = (q, m) => mk(q) === PURPOSE[text(m.said)] ? '' : 'expected ' + PURPOSE[text(m.said)];
  const PARA = { 'The field trip is cancelled because of the storm warning.': 'We are not going on the trip, since a storm is coming.', 'Please hand in your permission forms by Friday.': 'Your forms are due at the end of the week.',
    'Wetlands soak up rain, so they help prevent floods.': 'Because wetlands hold water, there are fewer floods.', 'The library will be closed on Monday for repairs.': 'On Monday the library is shut while it is being fixed.',
    'Bring a water bottle, because the hike is long and hot.': 'The hike will be hot and long, so pack water.' };
  V['g5-paraphrase'] = (q, m) => mk(q) === PARA[text(m.said)] && mk(q) !== text(m.said) ? '' : 'expected the paraphrase';
  const FITS = { 'the school council': /^Good afternoon/, 'a museum guide': /^Excuse me/, 'your best friend at lunch': /^Want to trade/, 'an Elder visiting the class': /^Thank you for sharing/, 'your little cousin': /^Let's build/ };
  V['g5-audience'] = (q, m) => FITS[m.who].test(mk(q)) ? '' : 'expected the one that fits ' + m.who;
  const BODY = { 'leaning in': 'I am interested.', 'steady eye contact': 'I am listening to you.', 'crossed arms': 'I am closed off.', 'a slow nod': 'I understand.', 'looking at the floor': 'I am not confident.', 'an open palm': 'I welcome your idea.' };
  V['g5-body'] = (q, m) => mk(q) === BODY[m.move] ? '' : 'expected ' + BODY[m.move];
  V['g5-match-body'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  /* vivid: has an adverb ending in -ly */
  V['g5-vivid'] = q => { const ok = q.options.map(text).filter(o => /\b\w+ly\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with vivid adjectives and adverbs'; };
})();
