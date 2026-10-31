/* Grade 5 answer checks: reading fluently (grade5/chapters/fluency.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a text needs a slow pace when it holds steps, facts, numbers, problems, rules or directions */
  const SLOW = /\b(steps|facts|numbers|problem|rules|directions)\b/;
  V['g5-pace'] = q => { const ok = q.options.map(text).filter(o => SLOW.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the text with steps or facts'; };
  V['g5-pace-sort'] = q => H.sameSet(q.options.map((o, i) => SLOW.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the slow texts are not the ones marked';
  V['g5-pace-tf'] = (q, m) => SLOW.test(m.t) === q.answer && text(q.why.options[q.why.answer]).startsWith(q.answer ? 'It has facts' : 'It is easy') ? '' : 'true/false is wrong for ' + m.t;
  const GOOD = { 'The tall girl in the red coat ran to the bus.': 'The tall girl / in the red coat / ran to the bus.', 'After the storm, the farmers checked their fields.': 'After the storm, / the farmers / checked their fields.',
    'Before dinner, Grandpa and I walked along the river.': 'Before dinner, / Grandpa and I / walked along the river.', 'When the bell rang, everyone hurried outside.': 'When the bell rang, / everyone / hurried outside.',
    "The bus to the museum leaves at nine o'clock.": "The bus to the museum / leaves / at nine o'clock.", 'My cousin from Iqaluit sent me a photo of the bay.': 'My cousin from Iqaluit / sent me / a photo of the bay.' };
  V['g5-phrases'] = (q, m) => mk(q) === GOOD[text(m.s)] ? '' : 'expected ' + GOOD[text(m.s)];
  const VOICE = { 'Slowly, the door creaked open. Something moved in the dark.': 'slow and quiet', 'We won! We won the championship!': 'fast and excited',
    'The last leaf fell, and the garden was empty and still.': 'soft and slow', 'Step 1: Measure 250 mL of water.': 'clear and steady', 'Welcome, everyone, to the Grade 5 science fair!': 'loud and clear',
    'A shadow crept across the wall. Then, silence.': 'slow and quiet', 'The puck flew past the goalie. Goal!': 'fast and excited', 'Step 2: Stir until the salt is gone.': 'clear and steady' };
  V['g5-voice'] = (q, m) => mk(q).startsWith(VOICE[m.line]) ? '' : 'expected ' + VOICE[m.line];
  /* yes-or-no questions start with a helping verb and end with ? */
  V['g5-rise'] = (q, m) => { const up = /^(Is|Are|Did|Do|Can|Will)\b.*\?$/.test(m.s); return mk(q) === (up ? 'It goes up.' : 'It goes down.') ? '' : 'expected ' + (up ? 'up' : 'down'); };
})();
