/* Grade 2 answer checks: reading for meaning and thinking about texts (grade2/chapters/reading.js, thinking.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where events come in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const KEY = {
    "Kai's Kite": { facts: { 'Where did the kite land?': ['in a tall pine tree', 'landed in the top'], 'Who helped Kai?': ['his grandpa', 'grandpa got'], 'What did Grandpa use?': ['a long rake', 'long rake from'] },
      main: 'gets stuck in a tree', predict: ['help Kai get the kite down', 'tall pine tree'], first: 'I ran across the field with my new kite.' },
    'My Bean Plant': { facts: { 'Where did the narrator put the cup?': ['by the window', 'by the window'], 'How tall was the plant on Saturday?': ['5 centimetres', 'centimetres tall'], 'What did the narrator plant?': ['a bean seed', 'planted a bean'] },
      main: 'watches it grow', predict: ['keep growing', 'two leaves'] },
    Loons: { facts: { 'What do loons eat?': ['fish', 'catch fish'], "Where do baby loons ride?": ["on their parents' backs", 'ride on'], 'Where do loons go in the fall?': ['south to warmer water', 'fly south'] }, main: 'lake birds' },
    'How to Plant a Seed': { facts: { 'What do you push the seed in with?': ['your finger', 'with your finger'] } },
    'Sugar Bush Day': { facts: { 'What dripped into the bucket?': ['sap', 'Clear sap'], 'Who showed the narrator the bucket?': ['an uncle', 'My uncle'], 'What did they do to the sap?': ['boiled it', 'boiled the sap'] },
      main: 'makes maple syrup together', predict: ['make syrup', 'drip, drip'] }
  };
  const DAYS = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Next )/;
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: [...p.querySelectorAll('.psh')].map(h => text(h.innerHTML)), lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads.length && c.heads.every(h => DAYS.test(h)) ? 'journal entry'
    : c.heads.length ? 'information' : c.title === 'Rain on the Roof' ? 'poem' : 'story';
  const povOf = c => /\b(I|my|me)\b/.test(c.lines.join(' ').replace(/“[^”]*”/g, '')) ? 'first' : 'third';
  const key = (m, f) => (KEY[text(m.t)] || {})[f];
  const KINDS = { "Kai's Kite": 'story', 'Sugar Bush Day': 'story', 'My Bean Plant': 'journal entry', Loons: 'information', 'How to Plant a Seed': 'instructions', 'Rain on the Roof': 'poem', 'A Bench for Our Yard': 'letter' };

  V['g2-fact'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)]; return want && mk(q) === want[0] ? '' : 'expected ' + (want && want[0]); };
  V['g2-find-line'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)], ok = want ? q.options.map(text).filter(o => o.includes(want[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g2-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k) ? '' : 'expected the option about "' + k + '"'; };
  V['g2-order'] = q => { const all = card(q).lines.join(' '), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g2-predict'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q).includes(k[0]) && card(q).lines.join(' ').includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g2-predict-title'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k) && text(q.q).includes(text(m.t)) ? '' : 'expected the option about "' + k + '"'; };
  V['g2-fix-up'] = q => { const good = /^(Read it again|Picture it|Ask a question)/; return H.sameSet(q.options.map((o, i) => (good.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked'; };
  V['g2-purpose'] = q => { const k = kindOf(card(q)); return mk(q) === (k === 'information' ? 'to find information' : 'for enjoyment') ? '' : 'the purpose does not fit a ' + k; };
  V['g2-form'] = q => { const k = kindOf(card(q)); return mk(q) === k && KINDS[card(q).title] === k ? '' : 'expected ' + k; };
  V['g2-real-made'] = q => { const k = kindOf(card(q)); return mk(q) === (k === 'information' ? 'It gives facts.' : 'It tells a story.') ? '' : 'expected the other answer for a ' + k; };
  V['g2-narrator'] = q => { const p = povOf(card(q)); return q.answer === (p === 'first' ? 0 : 1) && /first person/.test(text(q.tiles[0])) ? '' : 'expected ' + p + ' person'; };
  V['g2-other-view'] = (q, m) => { const k = key(m, 'first'); return k && mk(q) === k && /^I\b/.test(k) && /\bmy\b/.test(k) ? '' : 'expected the first-person start'; };
})();
