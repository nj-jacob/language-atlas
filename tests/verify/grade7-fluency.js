/* Grade 7 answer checks: reading fluently (grade7/chapters/fluency.js). Own lists: words that never end a phrase, what each mark asks, pace by purpose, and which word carries a meaning. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a phrase that ends on a little joining word is choppy */
  const JOIN = /\b(the|a|my|from|past|to|on|under|every|each|whole|old|frozen)$/i;
  const smooth = o => o.split(' / ').every((p, i, all) => i === all.length - 1 || !JOIN.test(p.trim()));
  V['g7-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one smooth phrasing'; };
  /* the first phrase is the subject: it ends before the verb or after the opening comma */
  const FIRST = { 'The canoe drifted slowly past the old dock.': 'canoe', 'My cousin from Moncton plays the fiddle every Saturday night.': 'Moncton' };
  V['g7-phrase-break'] = (q, m) => mk(q) === FIRST[m.s] ? '' : 'expected ' + FIRST[m.s];
  const MARK = { ',': 'a short pause', '?': 'your voice rises', '—': 'a sudden break', '…': 'trail off, or pause', '!': 'strong feeling', ';': 'a pause, then a linked idea' };
  V['g7-mark-voice'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const hl = d.querySelector('mark').textContent;
    return hl === m.mark && mk(q) === MARK[hl] ? '' : 'expected ' + MARK[hl]; };
  V['g7-mark-match'] = q => q.pairs.every(p => MARK[text(p[0])] === text(p[1])) ? '' : 'a mark is matched wrong';
  const SLOW = /science experiment|new facts|study/, FAST = /chase|funny poem/, STEADY = /announcements|speech/;
  V['g7-pace'] = (q, m) => { const want = SLOW.test(m.what) ? 'slowly and carefully' : FAST.test(m.what) ? 'faster, with energy' : STEADY.test(m.what) ? 'at a steady, clear pace' : null; return mk(q) === want ? '' : 'expected ' + want; };
  V['g7-pace-tf'] = (q, m) => /slow down when the text gets hard/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* what you mean -> the word that carries it */
  const STRESS = { 'Someone else took it.': 'I', 'I only borrowed it.': 'take', "I took someone else's bike.": 'your', 'I took your skateboard.': 'bike.', 'Not him. She said it.': 'She',
    'Not tomorrow. Today.': 'today.', 'Not the quiz. The test.': 'test', 'Not two. Three.': 'three', 'We do not just want them. We need them.': 'need', 'Not life jackets. Paddles.': 'paddles.' };
  V['g7-stress'] = (q, m) => mk(q) === STRESS[text(m.mean)] ? '' : 'expected ' + STRESS[text(m.mean)];
  V['g7-stress-meaning'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const loud = text(d.querySelector('b').textContent).toLowerCase();
    return STRESS[mk(q)] && STRESS[mk(q)].toLowerCase() === loud ? '' : 'the meaning marked does not match the stressed word'; };
})();
