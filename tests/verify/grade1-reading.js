/* Grade 1 answer checks: reading for meaning and thinking about texts (grade1/chapters/reading.js, thinking.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where events come in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const KEY = {
    'Tala and the Kite': { facts: { 'What colours was the kite?': ['red and yellow', 'It was red'], 'Who clapped?': ['Grandpa', 'clapped and smiled'], 'Where did Tala run?': ['across the big field', 'She ran'] },
      main: 'Tala flies her new kite', predict: 'fly up into the sky', other: 'Grandpa', know: 'Wind can lift', connect: 'I flew a kite', feel: { 'when the kite goes up': 'excited' } },
    'From Egg to Frog': { facts: { 'Where does a frog egg start?': ['in a pond', 'starts as a tiny'], 'What does a tadpole have?': ['a tail', 'has a tail'] }, main: 'grows from an egg', know: 'Frogs live near ponds', connect: 'I saw tadpoles' },
    'My Snowy Day': { facts: { 'What did the narrator make?': ['a snow angel', 'I made'], 'What did the narrator eat?': ['hot soup', 'went inside'] }, main: 'plays in the snow',
      predict: 'go inside to get warm', other: 'A friend who came to play', know: 'warm clothes in winter', connect: 'I made a snow angel', feel: { 'outside at the end': 'cold' } },
    'How to Plant a Seed': { facts: { 'What do you put in the pot first?': ['soil', '1. Fill'] }, know: 'Plants need water' },
    'A Note to Grandma': { facts: { 'What colour is the scarf?': ['green', 'Thank you for'] }, view: 'He loves the scarf.' }
  };
  const PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear what someone thinks', poem: 'to enjoy a poem' };
  const KINDS = { 'Tala and the Kite': 'story', 'My Snowy Day': 'story', 'From Egg to Frog': 'information', 'How to Plant a Seed': 'instructions', 'Rain': 'poem', 'A Note to Grandma': 'letter' };
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const t = p.querySelector('.pt'); return { title: t ? text(t.innerHTML) : '', heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'information' : c.title === 'Rain' ? 'poem' : 'story';
  const povOf = c => /\b(I|my|me)\b/.test(c.lines.join(' ').replace(/“[^”]*”/g, '')) ? 'first' : 'third';
  const key = (m, f) => (KEY[m.t] || {})[f];

  V['g1-fact'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)]; return want && mk(q) === want[0] ? '' : 'expected ' + (want && want[0]); };
  V['g1-find-line'] = (q, m) => { const want = (key(m, 'facts') || {})[text(m.q)], ok = want ? q.options.map(text).filter(o => o.includes(want[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g1-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k) ? '' : 'expected the option about "' + k + '"'; };
  V['g1-form'] = q => mk(q) === kindOf(card(q)) ? '' : 'expected ' + kindOf(card(q));
  V['g1-match-form'] = q => q.pairs.every(p => KINDS[text(p[0])] === text(p[1])) ? '' : 'a title is matched to the wrong kind';
  V['g1-predict'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q).includes(k) ? '' : 'expected the prediction "' + k + '"'; };
  V['g1-know'] = (q, m) => { const k = key(m, 'know'); return k && mk(q).includes(k) && text(q.q).includes(m.t) ? '' : 'expected "' + k + '"'; };
  V['g1-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  V['g1-fix-up'] = q => { const good = /^(Read it again|Picture it|Ask a question|Look at the pictures)/; return H.sameSet(q.options.map((o, i) => good.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked'; };
  V['g1-connect'] = (q, m) => { const k = key(m, 'connect'); return k && mk(q).startsWith(k) ? '' : 'expected the connection "' + k + '"'; };
  V['g1-narrator'] = q => { const want = povOf(card(q)) === 'first' ? 0 : 1; return q.answer === want && /in the story/.test(text(q.tiles[0])) ? '' : 'expected ' + povOf(card(q)) + ' person'; };
  V['g1-narrator-word'] = q => { const c = card(q), p = povOf(c), w = mk(q), all = c.lines.join(' ').replace(/“[^”]*”/g, ''); return (p === 'first' ? w === 'I' : /^(They|He|She)$/.test(w)) && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected a word from the text that shows the teller'; };
  V['g1-other-teller'] = (q, m) => { const k = key(m, 'other'); return k && mk(q) === k ? '' : 'expected ' + k; };
  V['g1-pov-tf'] = q => q.answer === (povOf(card(q)) === 'first') ? '' : 'true/false is wrong for who tells it';
})();
