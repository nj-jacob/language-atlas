/* Grade 5 answer checks: reading fluently (grade5/chapters/fluency.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a text needs a slow pace when it holds steps, facts, numbers, problems, rules or directions */
  const SLOW = /\b(steps|facts|numbers|problem|rules|directions)\b/;
  V['g5-pace'] = q => { const ok = q.options.map(text).filter(o => SLOW.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the text with steps or facts'; };
  V['g5-pace-fast'] = q => { const ok = q.options.map(text).filter(o => !SLOW.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the easy or familiar text'; };
  V['g5-pace-sort'] = q => H.sameSet(q.options.map((o, i) => SLOW.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the slow texts are not the ones marked';
  V['g5-pace-tf'] = (q, m) => SLOW.test(m.t) === q.answer && text(q.why.options[q.why.answer]).startsWith(q.answer ? 'It has facts' : 'It is easy') ? '' : 'true/false is wrong for ' + m.t;
  V['g5-pace-fix'] = q => /slow down/i.test(mk(q)) && /reread/.test(mk(q)) ? '' : 'expected slow down and reread';
  /* the checker's own phrasing of each sentence */
  const GOOD = {};
  ['The tall girl / in the red coat / ran to the bus.', 'After the storm, / the farmers / checked their fields.', 'Before dinner, / Grandpa and I / walked along the river.',
    'When the bell rang, / everyone / hurried outside.', "The bus to the museum / leaves / at nine o'clock.", 'My cousin from Iqaluit / sent me / a photo of the bay.',
    'On a cold morning, / the canoe / slid across the lake.', 'The girl with the drum / sang / a song for her elders.', 'Under the old bridge, / two ducks / hid from the rain.',
    'At the end of the day, / the team / cleaned the arena.', 'My little brother / lost his mitten / in the deep snow.', 'If it stops raining, / we will go / to the beach.',
    'The students in Room 12 / planted trees / behind the school.', 'Every summer, / my family / visits our aunt in Halifax.'].forEach(g => { GOOD[g.split(' / ').join(' ')] = g; });
  V['g5-phrases'] = (q, m) => mk(q) === GOOD[text(m.s)] ? '' : 'expected ' + GOOD[text(m.s)];
  V['g5-one-phrase'] = (q, m) => { const ph = GOOD[text(m.s)].split(' / '), ok = q.tiles.map(text).filter(t => ph.includes(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected a phrase of ' + GOOD[text(m.s)]; };
  V['g5-phrase-tf'] = (q, m) => (text(m.said) === GOOD[text(m.s)]) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said;
  V['g5-pause-after'] = (q, m) => { const first = GOOD[text(m.s)].split(' / ')[0].replace(/,$/, '').split(' ').pop(); return mk(q) === first ? '' : 'expected ' + first; };
  const VOICE = { 'Slowly, the door creaked open. Something moved in the dark.': 'slow and quiet', 'We won! We won the championship!': 'fast and excited',
    'The last leaf fell, and the garden was empty and still.': 'soft and slow', 'Step 1: Measure 250 mL of water.': 'clear and steady', 'Welcome, everyone, to the Grade 5 science fair!': 'loud and clear',
    'A shadow crept across the wall. Then, silence.': 'slow and quiet', 'The puck flew past the goalie. Goal!': 'fast and excited', 'Step 2: Stir until the salt is gone.': 'clear and steady',
    'Footsteps. Closer. Closer still.': 'slow and quiet', 'Snow day! No school! Grab your sled!': 'fast and excited', 'Old Max was gone, and his bowl sat empty by the door.': 'soft and slow',
    'First, fold the paper in half.': 'clear and steady', 'Good morning, parents and students!': 'loud and clear', 'She waved goodbye as the ferry pulled away for the last time.': 'soft and slow',
    'Please take your seats. The concert will now begin.': 'loud and clear' };
  V['g5-voice'] = (q, m) => mk(q).startsWith(VOICE[m.line]) ? '' : 'expected ' + VOICE[m.line];
  V['g5-voice-line'] = (q, m) => { const ok = q.options.map(text).filter(o => VOICE[o] === m.v); return ok.length === 1 && mk(q) === ok[0] && text(q.q).includes(m.v) ? '' : 'expected the line read ' + m.v; };
  V['g5-voice-tf'] = (q, m) => (VOICE[m.line] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.line;
  V['g5-voice-match'] = q => q.pairs.every(p => VOICE[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong voice';
  /* yes-or-no questions start with a helping verb and end with ? */
  const up = s => /^(Is|Are|Did|Do|Can|Will)\b.*\?$/.test(s);
  V['g5-rise'] = (q, m) => mk(q) === (up(m.s) ? 'It goes up.' : 'It goes down.') ? '' : 'expected ' + (up(m.s) ? 'up' : 'down');
  V['g5-rise-which'] = q => { const ok = q.options.map(text).filter(up); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the yes-or-no question'; };
  V['g5-rise-pick'] = q => H.sameSet(q.options.map((o, i) => up(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the questions are not the ones marked';
  V['g5-rise-tf'] = (q, m) => (up(m.s) === m.up) === q.answer && q.why.answer === (up(m.s) ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
})();
