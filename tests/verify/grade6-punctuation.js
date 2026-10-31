/* Grade 6 answer checks: capitals and punctuation (grade6/chapters/punctuation.js). The checker applies its own rules: a colon after a formal
   greeting and a memo heading, NAME: line for scripts, a comma straight after a transition, and its own list of words that need capitals. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const only = (q, ok) => { const fit = q.options.map(text).filter(ok); return fit.length === 1 && mk(q) === fit[0]; };
  V['g6-formal'] = q => only(q, o => /^Dear [A-Z][\w. ]+:$/.test(o)) ? '' : 'expected the greeting with a colon';
  V['g6-memo'] = q => only(q, o => /^(To|From|Date|Re): \S/.test(o)) ? '' : 'expected the heading with a colon';
  V['g6-script'] = q => only(q, o => /^[A-Z]+: [^“”"]+$/.test(o)) ? '' : 'expected NAME: and the words';
  V['g6-colon-tf'] = (q, m) => { const g = text(q.fig), good = m.kind === 'formal' ? /:$/.test(g) : /,$/.test(g); return good === q.answer ? '' : 'true/false is wrong for ' + g; };
  const TR = ['However', 'As a result', 'For example', 'In addition', 'Meanwhile', 'Finally'];
  /* right when the only comma is straight after the transition */
  const commaOk = s => { const t = TR.find(x => s.startsWith(x)); return !!t && s.slice(t.length, t.length + 2) === ', ' && !s.slice(t.length + 1).includes(','); };
  V['g6-comma-place'] = q => only(q, commaOk) ? '' : 'expected the comma right after the transition';
  V['g6-comma-tf'] = (q, m) => commaOk(m.s) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  const SHOWS = { However: 'a contrast', 'As a result': 'a result', 'For example': 'an example', 'In addition': 'an added idea', Meanwhile: 'the same time', Finally: 'the last step' };
  const FITS = { 'The forecast called for sun.': 'However', 'The road was icy.': 'As a result', 'Many animals hibernate.': 'For example', 'The club plants trees.': 'In addition',
    'Omar set up the tent.': 'Meanwhile', 'We packed, loaded the car and checked the map.': 'Finally' };
  V['g6-which-trans'] = (q, m) => mk(q) === FITS[m.first] && text(q.fig).startsWith(m.first) ? '' : 'expected ' + FITS[m.first];
  V['g6-trans-match'] = q => q.pairs.every(p => SHOWS[text(p[0])] === text(p[1])) ? '' : 'a transition is matched wrong';
  /* capitals: the checker's own list of words that are names, places, days, months, holidays or titles */
  const PROPER = new Set('Ottawa River Rankin Inlet Nunavut National Indigenous Peoples Day Dr. Singh Tuesday Ice Road October Lake Superior Great Lakes Halifax Vancouver June'.split(' '));
  const needsCap = (w, next) => PROPER.has(w.charAt(0).toUpperCase() + w.slice(1)) || (/^the$/i.test(w) && next === 'Ice');
  const capsOk = s => { const w = s.replace(/[.,]/g, '').split(' '); return /^[A-Z]/.test(w[0]) && w.slice(1).every((x, i) => /^[A-Z]/.test(x) === needsCap(x, w[i + 2])); };
  V['g6-cap-right'] = q => only(q, capsOk) ? '' : 'expected the sentence with every capital right';
  V['g6-cap-tap'] = (q, m) => { const t = q.tiles.map(text), w = text(q.fig).replace(/[.,]/g, '').split(' '), bad = w.filter((x, i) => i > 0 && /^[a-z]/.test(x) && needsCap(x, w[i + 1]));
    return bad.length === 1 && mk(q) === bad[0] && t.includes(bad[0]) ? '' : 'expected the word that needs a capital'; };
  V['g6-cap-pick'] = q => { const w = text(q.fig).replace(/[.,]/g, '').split(' '), nextOf = x => w[w.indexOf(x) + 1];
    return H.sameSet(q.options.map((o, i) => (needsCap(text(o), (nextOf(text(o)) || '').replace(/^ice$/, 'Ice')) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the words that need capitals are not the ones marked'; };
  V['g6-cap-tf'] = (q, m) => capsOk(m.shown) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
})();
