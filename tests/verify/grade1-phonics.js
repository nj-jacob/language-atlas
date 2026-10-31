/* Grade 1 answer checks: letters and sounds (grade1/chapters/phonics.js).
   Spelling patterns are worked out from the letters; clue questions use the checker's own answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const fill = (q, part) => { const d = document.createElement('div'); d.innerHTML = q.fig; const g = d.querySelector('.wgap'); if (!g) return null; g.textContent = part; return text(d.innerHTML); };
  const SENT = { pig: 'A pig rolls in the mud.', cat: 'The cat naps in the sun.', bed: 'I sleep in my bed.', dog: 'The dog digs a hole.', rug: 'Sit on the rug.', hat: 'My hat is red.',
    hen: 'A hen lays an egg.', cup: 'Fill the cup with milk.', lid: 'Put the lid on the pot.', map: 'The map shows the lake.', hop: 'I can hop on one foot.', sun: 'The sun is hot today.',
    bus: 'We ride the bus to school.', fox: 'A fox has a bushy tail.' };
  const CLUE = { 'a big boat': 'ship', 'it swims in a lake': 'fish', 'the part of your face under your mouth': 'chin', 'you wash in it': 'bath', 'a huge animal in the sea': 'whale',
    'a bird that quacks': 'duck', 'a meal in the middle of the day': 'lunch', 'it flies at night, like a butterfly': 'moth', 'a snail lives in it': 'shell', 'you wear it on your foot': 'sock',
    'it flies on a string': 'kite', 'a tree with needles': 'pine', 'a superhero wears it': 'cape', 'toothpaste comes in it': 'tube', 'it helps someone walk': 'cane', 'a short letter': 'note',
    'a box shape with six sides': 'cube', 'what you do in hide-and-seek': 'hide', 'I ___ a card for Mom.': 'made',
    'it floats on the lake': 'boat', 'it has leaves and a trunk': 'tree', 'it falls from the clouds': 'rain', 'you stand on them': 'feet', 'you wear it when it is cold': 'coat',
    'a dog wags it': 'tail', 'a plant grows from it': 'seed', 'cars drive on it': 'road', 'the opposite of night': 'day', 'you wash your hands with it': 'soap',
    'it drives on the road': 'car', 'it shines in the night sky': 'star', 'cows and pigs live there': 'farm', 'a yellow vegetable on a cob': 'corn', 'you eat with it': 'fork', 'an animal you can ride': 'horse' };
  const DIG = ['sh', 'ch', 'th', 'wh', 'ck'], TEAM = ['ee', 'ai', 'ay', 'oa'];
  const inWord = (list, w) => list.filter(d => w.includes(d));
  const mid = w => w.length === 3 ? w[1] : null;
  const clueOf = q => (text(q.q).match(/\? (.*)$/) || [])[1] || '';
  const clueWord = m => CLUE[m.clue] || CLUE[m.clue + '.'];

  V['g1-vowel-gap'] = (q, m) => fill(q, H.marked(q)) === SENT[m.word] ? '' : 'the vowel does not make "' + SENT[m.word] + '"';
  V['g1-same-vowel'] = (q, m) => { const ok = q.options.map(text).filter(o => mid(o) === mid(m.word)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the one word with the vowel of ' + m.word; };
  V['g1-which-vowel'] = (q, m) => H.marked(q) === mid(m.word) ? '' : 'expected ' + mid(m.word);
  V['g1-pick-vowel'] = (q, m) => H.sameSet(q.options.map((o, i) => mid(text(o)) === m.v ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words with ' + m.v + ' are not the ones marked';
  V['g1-which-digraph'] = (q, m) => { const d = inWord(DIG, m.word); return d.length === 1 && H.marked(q) === d[0] ? '' : 'expected ' + d.join('/'); };
  V['g1-fill-digraph'] = (q, m) => { const w = CLUE[m.clue]; return w && fill(q, H.marked(q)) === w && clueOf(q).toLowerCase().startsWith(m.clue.toLowerCase()) ? '' : 'the letters do not make ' + w; };
  V['g1-pick-digraph'] = (q, m) => H.sameSet(q.options.map((o, i) => text(o).includes(m.d) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words with ' + m.d + ' are not the ones marked';
  V['g1-match-digraph'] = q => q.pairs.every(p => inWord(DIG, text(p[0])).join() === text(p[1])) ? '' : 'a word is matched to the wrong letters';
  V['g1-silent-e'] = (q, m) => { const w = CLUE[clueOf(q).charAt(0).toLowerCase() + clueOf(q).slice(1).replace(/\.$/, '')] || CLUE[clueOf(q)]; return w === m.w && H.marked(q) === w ? '' : 'expected ' + w; };
  V['g1-add-e'] = (q, m) => H.marked(q) === m.base + 'e' ? '' : 'expected ' + m.base + 'e';
  V['g1-team-in'] = (q, m) => { const t = inWord(TEAM, m.word); return t.length === 1 && H.marked(q) === t[0] ? '' : 'expected ' + t.join('/'); };
  V['g1-fill-team'] = (q, m) => { const w = clueWord(m); return w && fill(q, H.marked(q)) === w ? '' : 'the letters do not make ' + w; };
})();
