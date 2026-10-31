/* Grade 6 answer checks: reading for meaning (grade6/chapters/reading.js). Comprehension answers come from a passage, so the checker keeps its
   own answer key (like a second marker) and works out what it can from the passage itself: where events come, the form, and who tells it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const KEY = {
    'The Long Portage': { facts: { 'Who carried the canoe?': ['Uncle Ray', 'lifted the canoe'], 'How far away was the next lake?': ['two kilometres', 'two-kilometre'], 'What did Tala carry?': ['both packs', 'carried both'] },
      main: 'keeps going on a hard portage', infer: { 'halfway along': 'tired and sore', 'at the end': 'relieved and proud' }, predict: ['reach the next lake', 'she kept walking'] },
    Tryouts: { facts: { 'What were the tryouts for?': ['basketball', 'basketball tryouts'], 'How many shots in a row did the narrator make?': ['three', 'next three'] },
      main: 'pushes through tryouts', infer: { 'at the gym door': 'nervous', 'Coach Ahmed': 'encouraging' }, predict: ['make the team', 'I made the next three'] },
    'Your First Night in the Tent': { facts: { 'What calls across the lake?': ['a loon', 'loon calls'] }, infer: { 'rustle': 'scared' } },
    'A Ramp for Everyone': { facts: { 'How many signatures did the council collect?': ['300', '300 signatures'], 'Where was the ramp built?': ['at the front doors', 'was built at the front'] },
      main: 'ramp built so everyone', infer: { 'signatures': 'to show that many people wanted a ramp' } },
    'Why Lake Ice Sings': { facts: { 'When does lake ice shrink?': ['on very cold nights', 'shrinks and cracks'] }, main: 'Changes in temperature' },
    'Two Canadian Bears': { facts: { 'What do polar bears mostly eat?': ['seals', 'mostly seals'], 'Where do black bears live?': ['in forests', 'live in forests'] }, main: 'alike in some ways' }
  };
  const key = (m, f) => (KEY[m.t] || {})[f];
  /* read the passage card back out of the question's picture */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  /* the form, from how the text is set out */
  const kindOf = c => c.lines.some(l => /^[A-Z]+: /.test(l)) ? 'script' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'report' : /^Posted by/.test(c.lines[0]) ? 'opinion' : c.lines.every(l => l.split(' ').length < 9) ? 'poem' : 'story';
  const PURPOSE = { story: 'to enjoy a story', report: 'to learn facts', instructions: 'to learn how to do something', opinion: 'to hear an opinion', poem: 'to enjoy a poem', script: 'to enjoy a play' };
  const CLUE = { report: 'Headings that split the facts', script: 'Speaker names and stage directions', instructions: 'A list of things you need and numbered steps', poem: 'Short lines with a rhythm' };
  /* the point of view, from the pronouns outside quotation marks */
  const povOf = c => { const s = c.lines.join(' ').replace(/“[^”]*”/g, ''); return /\b(I|my|me)\b/.test(s) ? 'first' : /\b(You|you|your)\b/.test(s) ? 'second' : 'third'; };

  V['g6-fact'] = (q, m) => { const w = (key(m, 'facts') || {})[text(m.q)]; return w && mk(q) === w[0] && card(q).lines.join(' ').includes(w[1]) ? '' : 'expected ' + (w && w[0]); };
  V['g6-evidence'] = (q, m) => { const w = (key(m, 'facts') || {})[text(m.q)], ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'the evidence sentence is not the one marked'; };
  V['g6-summary'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k) ? '' : 'expected the summary about "' + k + '"'; };
  V['g6-order'] = q => { const all = card(q).lines.join(' '), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g6-conclude'] = (q, m) => { const inf = key(m, 'infer') || {}, k = Object.keys(inf).find(x => text(m.q).includes(x)); return k && mk(q) === inf[k] ? '' : 'expected ' + (k && inf[k]); };
  V['g6-predict'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q).includes(k[0]) && card(q).lines.join(' ').includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g6-predict-clue'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q) === k[1] && card(q).lines.join(' ').includes(k[1]) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g6-adjust'] = q => /^Change my prediction/.test(mk(q)) ? '' : 'expected to change the prediction';
  const FIX = { 'You meet a word you do not know.': /glossary or dictionary/, 'You cannot picture what is happening.': /picture of it in your mind/, 'A paragraph is confusing.': /Read ahead/, 'You are not sure a fact is right.': /another source/ };
  V['g6-monitor'] = (q, m) => FIX[m.s].test(mk(q)) && q.options.map(text).filter(o => FIX[m.s].test(o)).length === 1 ? '' : 'expected the strategy for: ' + m.s;
  V['g6-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  V['g6-form'] = q => mk(q) === kindOf(card(q)) ? '' : 'expected ' + kindOf(card(q));
  V['g6-form-clue'] = q => mk(q) === CLUE[kindOf(card(q))] ? '' : 'expected ' + CLUE[kindOf(card(q))];
  V['g6-narrator'] = q => text(q.tiles[q.answer]).startsWith(povOf(card(q))) ? '' : 'expected ' + povOf(card(q)) + ' person';
  V['g6-narrator-word'] = q => { const p = povOf(card(q)), w = mk(q), s = card(q).lines.join(' ').replace(/“[^”]*”/g, '');
    return ({ first: 'I', second: 'You', third: 'She' })[p] === w && new RegExp('\\b' + w + '\\b').test(s) ? '' : 'expected a ' + p + ' person word from the text'; };
  V['g6-alt-pov'] = q => /how nervous the narrator felt inside/.test(mk(q)) ? '' : 'expected: we would lose the narrator’s inside feelings';
})();
