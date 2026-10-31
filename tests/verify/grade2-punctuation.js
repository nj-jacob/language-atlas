/* Grade 2 answer checks: capitals and punctuation (grade2/chapters/punctuation.js).
   The checker keeps its own list of names, and works out commas, apostrophes and speech marks from the words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q) || '';
  const NAMES = new Set('Ottawa Friday Leila Halifax July Lake Huron Royal Ontario Museum Monday Omar March Grandma Winnipeg Iqaluit Theo Mei Saturday Canada Toronto April Kai Superior Thunder Bay Sunday October Priya'.split(' '));
  /* capitals are right when the first word and every name has one, and nothing else does */
  const capsOk = s => s.replace(/[.,]/g, '').split(' ').every((w, i) => (i === 0 || NAMES.has(w) || (w === 'Grandma' && i === 0)) === /^[A-Z]/.test(w) || (i > 0 && !NAMES.has(w) && !/^[A-Z]/.test(w)));
  const capsRight = s => s.replace(/[.,]/g, '').split(' ').every((w, i) => (i === 0 ? /^[A-Z]/.test(w) : NAMES.has(w[0].toUpperCase() + w.slice(1)) === /^[A-Z]/.test(w)));
  /* the checker's own copy of each list, written out the right way */
  const LISTS = { 'We packed': 'apples crackers cheese', 'I saw': 'a_fox a_deer a_hawk', 'Mei needs': 'glue paper scissors', 'The flag is': 'red white blue', 'We planted': 'beans peas carrots squash', 'Kai likes': 'hockey swimming chess' };
  const RIGHT = new Set(Object.entries(LISTS).map(([start, l]) => { const it = l.split(' ').map(x => x.replace('_', ' ')); return start + ' ' + it.slice(0, -1).join(', ') + ' and ' + it[it.length - 1] + '.'; }));
  const listRight = s => RIGHT.has(s);
  const OQ = '“', CQ = '”';
  const speechRight = (s, who) => new RegExp('^' + who + ' said, ' + OQ + '[A-Z][^' + OQ + CQ + ']*[.?!]' + CQ + '$').test(s);

  V['g2-need-cap'] = q => H.sameSet(q.options.map((o, i) => (NAMES.has(text(o)[0].toUpperCase() + text(o).slice(1)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the names are not the ones marked';
  V['g2-right-cap'] = q => { const ok = q.options.map(text).filter(capsRight); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one sentence with the right capitals'; };
  V['g2-proper-pick'] = q => H.sameSet(q.options.map((o, i) => (text(o).split(' ').every(w => NAMES.has(w)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the names are not the ones marked';
  V['g2-cap-tf'] = (q, m) => capsRight(m.shown) === q.answer && q.why.answer === (q.answer ? 0 : 1) && capsOk(m.s) ? '' : 'true/false or the reason is wrong';
  V['g2-list'] = q => { const ok = q.options.map(text).filter(listRight); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one list with the right commas'; };
  V['g2-comma-after'] = q => { const w = q.tiles.map(text), i = w.indexOf('and'); return mk(q) === w[i - 2] ? '' : 'expected the comma after ' + w[i - 2]; };
  V['g2-owner'] = (q, m) => mk(q) === m.o + '’s ' + m.t ? '' : 'expected ' + m.o + '’s ' + m.t;
  V['g2-owner-means'] = (q, m) => { const [o, t] = m.w.split('’s '); return mk(q) === 'the ' + t + ' that belongs to ' + o ? '' : 'expected the ' + t + ' of ' + o; };
  V['g2-speech'] = (q, m) => { const ok = q.options.map(text).filter(o => speechRight(o, m.who)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one right sentence'; };
  V['g2-says-what'] = (q, m) => { const inside = text(q.fig).split(OQ)[1].replace(CQ, ''); return mk(q) === inside ? '' : 'expected ' + inside; };
  V['g2-mark-place'] = (q, m) => { const w = q.tiles.map(text), i = w.indexOf('said,'); return w[i - 1] === m.who && mk(q) === w[i + 1] ? '' : 'expected the word after "said,"'; };
  V['g2-speech-tf'] = (q, m) => speechRight(m.shown, m.who) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false or the reason is wrong';
})();
