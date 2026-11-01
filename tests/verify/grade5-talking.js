/* Grade 5 answer checks: listening and speaking (grade5/chapters/talking.js). The checker keeps its own rules and lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* an open question starts with what, how or why */
  const open = s => /^(What|How|Why)\b/.test(s);
  V['g5-elaborate'] = q => { const ok = q.options.map(text).filter(open); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the open question'; };
  V['g5-open-or-not'] = (q, m) => mk(q).startsWith(open(text(m.qn)) ? 'Yes' : 'No') ? '' : 'expected ' + (open(text(m.qn)) ? 'yes' : 'no');
  V['g5-pick-open'] = q => H.sameSet(q.options.map((o, i) => open(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the open questions are not the ones marked';
  /* interest: moves that let the speaker keep going */
  const SHOWS = /^(Nodding|Smiling|Looking at the speaker|Saying "Wow!" when|Asking a question when they finish|Leaning in|Turning to face|Saying "Tell me more" at the end)/;
  V['g5-interest-tf'] = (q, m) => SHOWS.test(text(m.said)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said;
  /* building on: the checker's own sentence starters for each move */
  const MOVE = [[/^(I agree with|Like \w+ said|I agree,)/, 'agree'], [/^(Adding to|To build on|Another reason)/, 'add on'], [/^(I see it a bit differently|I respect that idea, but|That is a good point, but)/, 'disagree politely'],
    [/^(Can you say more|What made you think|Could you give an example|Could you say more)/, 'ask for more']];
  const moveOf = s => (MOVE.find(x => x[0].test(s)) || [])[1];
  V['g5-build-on'] = q => H.sameSet(q.options.map((o, i) => moveOf(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good responses are not the ones marked';
  V['g5-which-move'] = (q, m) => mk(q) === moveOf(text(m.said)) ? '' : 'expected ' + moveOf(text(m.said));
  V['g5-best-reply'] = q => { const ok = q.options.map(text).filter(moveOf); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reply that builds on the idea'; };
  V['g5-build-tf'] = (q, m) => !!moveOf(text(m.said)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said;
  /* purpose: the checker's own key */
  const PURPOSE = { 'Turn left at the library, then walk two blocks.': 'to give directions', 'Stir the soup, then turn the heat down low.': 'to give directions',
    'You should all vote for a longer recess. It helps us learn!': 'to persuade', 'Please sign our petition to save the old oak tree.': 'to persuade',
    'Loons can dive deeper than a ten-storey building is tall.': 'to inform', 'The CN Tower opened in 1976.': 'to inform',
    'So there I was, stuck in a snowbank, with a pizza on my head!': 'to entertain', 'Want to hear about the day my hamster escaped into the piano?': 'to entertain',
    'First, plug in the tablet. Next, hold the button for three seconds.': 'to give directions', 'Line up at the door, then walk quietly to the gym.': 'to give directions',
    'Everyone should bring a reusable bottle. It is better for the planet!': 'to persuade', 'Choose me for class rep, and I will listen to every idea.': 'to persuade',
    'Beavers can hold their breath for about 15 minutes.': 'to inform', 'Nunavut became a territory in 1999.': 'to inform',
    'My little brother tried to feed his cereal to the goldfish!': 'to entertain', 'You will not believe what my cat did with my sock.': 'to entertain' };
  V['g5-listen-purpose'] = (q, m) => mk(q) === PURPOSE[text(m.said)] ? '' : 'expected ' + PURPOSE[text(m.said)];
  V['g5-which-said'] = (q, m) => { const ok = q.options.map(text).filter(o => PURPOSE[o] === m.p); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one ' + m.p; };
  V['g5-purpose-said-tf'] = (q, m) => (PURPOSE[text(m.said)] === m.p) === q.answer ? '' : 'true/false is wrong';
  V['g5-match-listen-purpose'] = q => q.pairs.every(p => PURPOSE[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong purpose';
  /* paraphrase: the checker's own key */
  const PARA = { 'The field trip is cancelled because of the storm warning.': 'We are not going on the trip, since a storm is coming.', 'Please hand in your permission forms by Friday.': 'Your forms are due at the end of the week.',
    'Wetlands soak up rain, so they help prevent floods.': 'Because wetlands hold water, there are fewer floods.', 'The library will be closed on Monday for repairs.': 'On Monday the library is shut while it is being fixed.',
    'Bring a water bottle, because the hike is long and hot.': 'The hike will be hot and long, so pack water.', 'The concert starts at seven, so arrive by a quarter to.': 'Get there 15 minutes early, because the show begins at seven.',
    'Wash your hands before you help with the cooking.': 'Clean hands first, then you can help cook.', 'Bears are most active at dawn and dusk.': 'You are most likely to see bears early and late in the day.',
    'The new rink opens next month, and skating will be free.': 'Next month you can skate at the new rink for no cost.', 'Only two people may use the computers at a time.': 'No more than two can be at the computers at once.' };
  V['g5-paraphrase'] = (q, m) => mk(q) === PARA[text(m.said)] && mk(q) !== text(m.said) ? '' : 'expected the paraphrase';
  const verdict = (said, para) => para === PARA[said] ? 0 : para === said ? 2 : 1;
  V['g5-para-tf'] = (q, m) => { const v = verdict(text(m.said), text(m.para)); return q.answer === (v === 0) && q.why.answer === v ? '' : 'true/false is wrong'; };
  V['g5-why-not-para'] = (q, m) => mk(q) === (verdict(text(m.said), text(m.para)) === 2 ? 'It copies the exact words.' : 'It changes the meaning.') ? '' : 'expected the reason';
  const FITS = { 'the school council': /^Good afternoon/, 'a museum guide': /^Excuse me/, 'your best friend at lunch': /^Want to trade/, 'an Elder visiting the class': /^Thank you for sharing/,
    'your little cousin': /^Let's build/, 'the principal': /^Good morning\. May I/, 'your teammate during a game': /^Pass!/ };
  V['g5-audience'] = (q, m) => FITS[m.who].test(mk(q)) ? '' : 'expected the one that fits ' + m.who;
  /* body language: what each move tells, and whether it helps a speaker */
  const BODY = { 'leaning in': 'I am interested.', 'steady eye contact': 'I am listening to you.', 'crossed arms': 'I am closed off.', 'a slow nod': 'I understand.', 'looking at the floor': 'I am not confident.',
    'an open palm': 'I welcome your idea.', 'a warm smile': 'I am friendly.', 'shrugging your shoulders': 'I am not sure.', 'tapping your foot': 'I am impatient.', 'a thumbs up': 'Good job.',
    'turning away': 'I am not interested.', 'hands on hips': 'I am annoyed.' };
  const HELPS = new Set(['leaning in', 'steady eye contact', 'a slow nod', 'an open palm', 'a warm smile', 'a thumbs up']);
  V['g5-body'] = (q, m) => mk(q) === BODY[m.move] ? '' : 'expected ' + BODY[m.move];
  V['g5-match-body'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  V['g5-which-body'] = (q, m) => BODY[mk(q)] === text(m.means) ? '' : 'expected the move that means ' + m.means;
  V['g5-body-help'] = (q, m) => mk(q) === (HELPS.has(m.move) ? 'It helps.' : 'It gets in the way.') ? '' : 'expected ' + (HELPS.has(m.move) ? 'helps' : 'gets in the way');
  /* vivid: an adverb that ends in -ly; the checker's own adjectives */
  const ADJ = new Set('muddy nervous icy spicy rusty tiny shiny wide tired crackling curious loud'.split(' '));
  V['g5-vivid'] = q => { const ok = q.options.map(text).filter(o => /\b\w+ly\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with vivid adjectives and adverbs'; };
  V['g5-tap-adverb'] = q => { const ok = q.tiles.map(text).filter(t => /ly$/.test(t) && text(q.fig).includes(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the -ly word'; };
  V['g5-tap-adj'] = q => { const ok = q.tiles.map(text).filter(t => ADJ.has(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the adjective'; };
  V['g5-vivid-tf'] = (q, m) => /\b\w+ly\b/.test(text(m.s)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
})();
