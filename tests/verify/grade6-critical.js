/* Grade 6 answer checks: critical reading (grade6/chapters/critical.js). The checker decides "stated" by looking for the words in the passage,
   and keeps its own key for messages, supporting details, sources, perspective and positions. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* stated when the passage holds the statement's key words */
  const KEYWORDS = { 'The tryouts were for basketball.': 'basketball tryouts', 'The narrator made three shots in a row.': 'made the next three', 'The narrator was nervous.': 'nervous',
    'Coach Ahmed is kind.': 'kind', 'Uncle Ray carried the canoe.': 'lifted the canoe', 'The trail was muddy.': 'muddy trail', 'Tala was tired.': 'tired', 'Tala felt proud at the end.': 'proud' };
  const passage = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); return p ? text(p.innerHTML) : ''; };
  const isStated = (q, s) => passage(q).includes(KEYWORDS[s]);
  V['g6-stated'] = (q, m) => text(q.tiles[q.answer]).startsWith(isStated(q, m.s) ? 'The text says' : 'I work it out') ? '' : 'wrong for ' + m.s;
  V['g6-pick-inferred'] = q => H.sameSet(q.options.map((o, i) => (!isStated(q, text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the inferences are not the ones marked';
  const CLUE = { 'The narrator was nervous.': 'got cold feet', 'Coach Ahmed is kind.': 'Everyone starts somewhere', 'Tala was tired.': 'straps dug into her shoulders', 'Tala felt proud at the end.': 'dropped the packs and laughed' };
  V['g6-infer-clue'] = (q, m) => mk(q) === CLUE[m.s] && passage(q).includes(CLUE[m.s]) ? '' : 'expected ' + CLUE[m.s];
  const THEME = { Tryouts: 'Being brave means trying', 'The Long Portage': 'Hard things can be worth', 'A Ramp for Everyone': 'Everyone should be able to enter' };
  V['g6-theme'] = (q, m) => mk(q).startsWith(THEME[m.t]) ? '' : 'expected the message: ' + THEME[m.t];
  const SUP = { 'Beavers change the land around them.': 'flood streams', 'Walking to school is good for students.': 'exercise', 'The ramp made the school fairer.': 'everyone can use', 'Recycling saves resources.': 'again and again' };
  V['g6-supports'] = (q, m) => mk(q).includes(SUP[m.main]) && q.options.map(text).filter(o => o.includes(SUP[m.main])).length === 1 ? '' : 'expected the supporting detail';
  /* reliable: experts, recent, or with sources listed */
  const good = s => /scientists|government|hospital|historians/.test(s);
  V['g6-reliable'] = q => { const fit = q.options.map(text).filter(good); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the reliable source'; };
  V['g6-reliable-tf'] = (q, m) => good(m.src) === q.answer ? '' : 'true/false is wrong for ' + m.src;
  const REL = { 'a report on how beavers build dams': 'sticks', 'a poster about staying safe on lake ice': 'thick', 'a speech asking for a town skate park': 'parking lot' };
  V['g6-relevant'] = (q, m) => mk(q).includes(REL[m.purpose]) ? '' : 'expected the relevant fact';
  V['g6-whose-pov'] = q => /Posted by the Pine Ridge Ski Club/.test(passage(q)) && mk(q) === 'the ski club' ? '' : 'expected the ski club';
  V['g6-bias-clue'] = q => /^(Every skier we asked|loud, smelly machines)$/.test(mk(q)) && passage(q).includes(mk(q)) ? '' : 'expected a loaded or one-sided phrase';
  V['g6-missing'] = q => mk(q) === 'snowmobile riders' && !/snowmobile riders/i.test(passage(q)) ? '' : 'expected snowmobile riders';
  V['g6-avoid-bias'] = q => /^Include what snowmobile riders think/.test(mk(q)) ? '' : 'expected including the other side';
  const FOR = /should be able to join|worth the cost/;
  V['g6-position'] = (q, m) => mk(q) === (FOR.test(m.s) ? 'for' : 'against') ? '' : 'the position is wrong for ' + m.s;
})();
