/* Grade 5 answer checks: thinking critically (grade5/chapters/thinking.js). The checker keeps its own answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const INFER = { 'Why did the coach tell the team to hold hands?': ['no one would get lost', 'walk slowly to the exit'], 'How does Daniel help his grandmother?': ['finds a light', 'helped his grandmother'],
    'How does Jun feel at the start?': ['nervous', 'My hands were shaking'], 'How does Jun feel at the end?': ['proud', 'grinned all the way home'],
    'How do you feel when you first step on the ice?': ['nervous', 'your heart thumps'], 'Was making pancakes easy?': ['No, it went badly', 'In the end, we had cereal'] };
  const passage = q => text(q.fig);
  V['g5-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[0]) && passage(q).includes(k[1]) ? '' : 'expected "' + (k && k[0]) + '"'; };
  V['g5-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[1] && passage(q).includes(k[1]) ? '' : 'expected the words "' + (k && k[1]) + '"'; };
  const GLOBAL = { 'The Tryout': ['does not give up', 'I kept going'], 'When the Lights Went Out': ['look after each other', 'helped his grandmother'] };
  V['g5-global'] = (q, m) => mk(q).includes(GLOBAL[m.t][0]) ? '' : 'expected ' + GLOBAL[m.t][0];
  V['g5-global-clue'] = (q, m) => mk(q) === GLOBAL[m.t][1] && passage(q).includes(mk(q)) ? '' : 'expected ' + GLOBAL[m.t][1];
  const PLOT = { 'found a flashlight': 'At home', 'played cards by candlelight': 'At home', 'the arena went black': 'At the arena', 'walk slowly to the exit': 'At the arena' };
  V['g5-plot'] = (q, m) => mk(q) === PLOT[m.e] ? '' : 'expected ' + PLOT[m.e];
  V['g5-match-plots'] = q => q.pairs.every(p => PLOT[text(p[1])] === text(p[0])) ? '' : 'an event is matched to the wrong place';
  V['g5-plot-order'] = (q, m) => { const all = passage(q), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, '')));
    return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) && q.items.slice(0, -1).every(i => PLOT[text(i).replace(/[“”]/g, '')] === m.place) ? '' : 'the events are not in order for that plot'; };
  const SUPPORT = { 'Wetlands are important.': 'stop floods', 'Jun worked hard for the tryout.': 'practised every day', 'The new playground welcomes everyone.': 'ramps', 'Manoomin is harvested with care.': 'gently' };
  V['g5-support'] = (q, m) => mk(q).includes(SUPPORT[m.main]) ? '' : 'expected the detail with "' + SUPPORT[m.main] + '"';
  V['g5-view'] = q => mk(q) === 'The school board should keep the late bus.' && passage(q).includes('Please keep the late bus running') ? '' : 'expected her view';
  /* bias: a sweeping claim (everyone, always, never) given with no proof */
  V['g5-bias'] = q => { const ok = q.options.map(text).filter(o => /\b(Everyone|always|never)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sweeping claim'; };
  /* a fact holds a number that could be checked */
  V['g5-fact-opinion'] = q => { const ok = q.options.map(text).filter(o => /\d/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with a checkable number'; };
  V['g5-missing'] = q => /costs the board/.test(mk(q)) && !passage(q).includes('cost') ? '' : 'expected what the letter leaves out';
  V['g5-message'] = q => mk(q) === 'Everyone should be able to play together.' ? '' : 'expected the message about playing together';
  const HELPS = /^(smooth ramps|pictures and braille|a quiet corner)/;
  V['g5-access'] = q => H.sameSet(q.options.map((o, i) => HELPS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the accessible features are not the ones marked';
})();
