/* Grade 3 answer checks: reading for meaning and thinking about texts (grade3/chapters/reading.js, thinking.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where events come in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/\u2019/g, "'"), mk = q => text(H.marked(q) || '');
  const KEY = {
    'The Lost Mitten': { facts: { 'Where did they find the mitten?': ['on top of the slide', 'sat a small'], 'Who lost a mitten?': ['Leila', 'is gone'], 'What colour was the mitten?': ['red', 'red mitten'] },
      main: 'Leila loses her mitten', predict: ['follow the footprints', 'footprints made a long trail'], feel: { 'at the end': 'happy', 'stops at the corner': 'upset' } },
    'Busy Beavers': { facts: { "What is a beaver's home called?": ['a lodge', 'homes called'], "What keeps a beaver's teeth short?": ['chewing wood', 'keeps them short'], 'Where do beavers store branches?': ['under the water', 'store branches'] }, main: 'special ways to build' },
    'My First Canoe Trip': { facts: { 'Who went on the trip with the narrator?': ['an aunt', 'trip with my aunt'], 'Where did the narrator sit?': ['at the front', 'I sat'] }, main: 'learns to paddle',
      predict: ['go canoeing again', 'wait to go again'], feel: { 'at the start': 'nervous', 'about canoeing now': 'excited to go again' } },
    'How to Make a Pine Cone Bird Feeder': { facts: { 'What do you roll the cone in?': ['birdseed', 'Roll the'] } },
    'Maple Syrup': { facts: { 'Who were the first to make maple syrup?': ['First Nations people', 'first to make'], 'What makes the sap flow?': ['warm days and cold nights', 'This makes sap'] }, main: 'boiling sap' }
  };
  const PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear an opinion', poem: 'to enjoy a poem' };
  const POEMS = ['Night at the Lake'];
  /* read the passage card back out of the question's picture */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'information' : POEMS.includes(c.title) ? 'poem' : 'story';
  /* first person when the narrator says I or my outside speech marks */
  const povOf = c => /\b(I|my|me)\b/.test(c.lines.join(' ').replace(/“[^”]*”/g, '')) ? 'first' : 'third';
  const key = (m, f) => (KEY[m.t] || {})[f];

  /* facts: question -> [answer, words from the sentence that answers it] */
  V['g3-fact'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)]; return want && mk(q) === want[0] ? '' : 'expected ' + (want && want[0]); };
  V['g3-find-line'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)], ok = want ? q.options.map(text).filter(o => o.includes(want[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g3-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k) ? '' : 'expected the option about "' + k + '"'; };
  V['g3-order'] = q => { const c = card(q), all = c.lines.join(' '), at = q.items.map(i => all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g3-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.lines.join(' ').includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g3-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[1]) && c.lines.join(' ').includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g3-fix-up'] = q => { const good = /^(Read it again|Picture it|Ask a question|Look at the pictures)/; return H.sameSet(q.options.map((o, i) => good.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked'; };
  V['g3-purpose'] = q => { const c = card(q); return mk(q) === PURPOSE[kindOf(c)] ? '' : 'expected ' + PURPOSE[kindOf(c)]; };
  V['g3-form'] = q => { const c = card(q); return mk(q) === kindOf(c) ? '' : 'expected ' + kindOf(c); };
  V['g3-match-form'] = q => { const kinds = { 'The Lost Mitten': 'story', 'My First Canoe Trip': 'story', 'Busy Beavers': 'information', 'Maple Syrup': 'information', 'Night at the Lake': 'poem', 'How to Make a Pine Cone Bird Feeder': 'instructions', 'A Letter to the Mayor': 'letter' };
    return q.pairs.every(p => kinds[text(p[0])] === text(p[1])) ? '' : 'a title is matched to the wrong kind'; };
  V['g3-narrator'] = q => { const c = card(q), want = povOf(c) === 'first' ? 0 : 1; return q.answer === want && /first person/.test(text(q.tiles[0])) ? '' : 'expected ' + povOf(c) + ' person'; };
  V['g3-narrator-word'] = q => { const c = card(q), p = povOf(c), w = mk(q), all = c.lines.join(' ').replace(/“[^”]*”/g, ''); return (p === 'first' ? w === 'I' : /^(They|He|She)$/.test(w)) && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected a ' + p + ' person word from the text'; };
})();
