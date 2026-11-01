/* Grade 2 answer checks: reading for meaning (grade2/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where events come in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: its kind; facts { question: [answer, words in the sentence that answers it] }; the main idea and a detail (words from each);
     a prediction and its clue; and the first line if a character told it */
  const KEY = {
    "Kai's Kite": { kind: 'story', facts: { 'Where did the kite land?': ['in a tall pine tree', 'landed in the top'], 'Who helped Kai?': ['his grandpa', 'grandpa got'], 'What did Grandpa use?': ['a long rake', 'long rake from'] },
      main: ['gets stuck in a tree', 'lifted the kite'], predict: ['help Kai get the kite down', 'tall pine tree'], first: 'I ran across the field with my new kite.' },
    'The Big Puddle': { kind: 'story', facts: { "What colour were Mei's boots?": ['yellow', 'put on her'], 'Where was the puddle?': ['at the end of the driveway', 'She saw'], 'Who got splashed?': ['her little brother', 'Water flew'] },
      main: ['jumps in a big puddle', 'put on yellow'], predict: ['land in the puddle', 'ran and jumped'], first: 'After the rain, I put on my yellow boots.' },
    'How to Plant a Seed': { kind: 'instructions', facts: { 'What do you push the seed in with?': ['your finger', 'Push the seed'], 'How often do you water it?': ['a little every day', 'Water it'], 'What do you fill the cup with?': ['soil', 'Fill the cup'] },
      main: ['how to plant a seed', 'Cover the seed'] },
    'Rain on the Roof': { kind: 'poem', facts: { 'What is the rain on the roof like?': ['tiny drums', 'Rain on the roof'], 'Where is the narrator?': ['in bed', 'I listen'] } },
    'A Bench for Our Yard': { kind: 'letter', facts: { 'Who is the letter to?': ['Principal Okafor', 'Dear'], 'What does Amara want?': ['a bench in the schoolyard', 'Please put'] } },
    'How to Get Ready for Bed': { kind: 'instructions', facts: { 'How long should you brush your teeth?': ['two minutes', 'Brush your'], 'What do you put on?': ['your pyjamas', 'Put on'], 'What do you turn off?': ['the big light', 'big light'] },
      main: ['get ready for bed', 'Pick a book'] },
    'How to Make a Fruit Salad': { kind: 'instructions', facts: { 'What do you do first?': ['wash your hands and the fruit', '1. Wash'], 'Who cuts the fruit?': ['a grown-up', 'Ask a'], 'What do you stir it with?': ['a spoon', 'Stir it'] },
      main: ['make a fruit salad', 'Stir it gently'] },
    'Snow Day': { kind: 'poem', facts: { 'What do they zoom down?': ['the hill', 'Sled, slide'], 'What warms the narrator up?': ['hot cocoa', 'warms me'] } },
    Loons: { kind: 'information', facts: { 'What do loons eat?': ['fish', 'catch fish'], "Where do baby loons ride?": ["on their parents' backs", 'ride on'], 'Where do loons go in the fall?': ['south to warmer water', 'fly south'],
      'How long can a loon stay under the water?': ['about a minute', 'about a minute'] }, main: ['lake birds', 'about a minute'] },
    'Sugar Bush Day': { kind: 'story', facts: { 'What dripped into the bucket?': ['sap', 'Clear sap'], 'Who showed the narrator the bucket?': ['an uncle', 'My uncle'], 'What did they do to the sap?': ['boiled it', 'boiled the sap'] },
      main: ['makes maple syrup together', 'tasted syrup on snow'], predict: ['make syrup', 'drip, drip'] },
    'My Bean Plant': { kind: 'journal entry', facts: { 'Where did the narrator put the cup?': ['by the window', 'by the window'], 'How tall was the plant on Saturday?': ['5 centimetres', 'centimetres tall'], 'What did the narrator plant?': ['a bean seed', 'planted a bean'] },
      main: ['watches it grow', 'two leaves on Saturday'], predict: ['keep growing', 'two leaves'] },
    "Owen's First Goal": { kind: 'story', facts: { "What is the name of Owen's team?": ['the Maple Hawks', 'losing by one'], 'Who passed Owen the puck?': ['Zara', 'Near the end'], 'Where did the puck go?': ['into the net', 'into the net'],
      'How did the team cheer?': ['They tapped their sticks on the ice.', 'His team cheered'] },
      main: ['scores a goal', 'laced up his skates'], predict: ['shoot the puck', 'pulled back his stick'], first: 'I laced up my skates at the rink.' },
    'The Library Cat': { kind: 'story', facts: { "What is the cat's name?": ['Pepper', 'grey cat'], 'Where did Pepper like to sleep?': ['on the sunny window ledge', 'liked to sleep'], 'Where did Ms. Ali find Pepper?': ['in a box of new books', 'tiny meow'],
      'What did Ms. Ali give Pepper?': ['a bowl of water', 'let her in'] },
      main: ['goes missing', 'read stories to Pepper'], predict: ['find Pepper', 'looked everywhere'], first: 'Every morning, I waited at the library door.' },
    'The Big Ferry': { kind: 'story', facts: { 'Who went on the ferry with the narrator?': ['Dad', 'Last summer'], 'Where did the car ride?': ['inside the boat', 'other cars'], 'What did the narrator see with the binoculars?': ['a lighthouse', 'rocky point'],
      'How long was the ferry ride?': ['one hour', 'bumped into'] },
      main: ['ride a big ferry', 'wind blew'], predict: ['drive off the ferry', 'bumped into the dock'] },
    'Bannock with Kokum': { kind: 'story', facts: { 'What does Kokum mean?': ['grandma', 'in Cree'], 'What did the narrator press flat?': ['the dough', 'pressed the'], 'What did the narrator eat the bannock with?': ['jam', 'warm piece'],
      'Where did they cook the bannock?': ['in a hot pan', 'golden brown'] },
      main: ['learns to make bannock', 'with jam'], predict: ['cook the dough', 'pressed the dough flat'] },
    'My Camping Journal': { kind: 'journal entry', facts: { 'Where did they set up the tent?': ['by the lake', 'Algonquin'], 'What did the narrator see dive?': ['a loon', 'little island'], 'What did they do when it rained?': ['played cards in the tent', 'rained all morning'],
      'Who showed the narrator how to pound in the pegs?': ['Mom', 'pegs'] }, main: ['camping trip, day by day', 'played cards'] },
    'Red Foxes': { kind: 'information', facts: { 'Where does a fox family live?': ['in a den under the ground', 'den under'], 'What can a fox hear under the snow?': ['a mouse moving', 'under the snow'],
      'How does a fox stay warm in winter?': ['It wraps its tail around its body.', 'warm blanket'], 'What do foxes eat?': ['mice, berries and bugs', 'berries'] }, main: ['live, find food and stay warm', 'big bushy tail'] },
    Honeybees: { kind: 'information', facts: { 'Who lays the eggs?': ['the queen bee', 'lays the eggs'], 'What is the sweet juice in flowers called?': ['nectar', 'sweet juice'], 'Where do honeybees live?': ['in a hive', 'live together'],
      'What do worker bees fly out to find?': ['flowers', 'Worker bees'] }, main: ['make honey and help plants grow', 'queen bee lays'] },
    'More Books, Please': { kind: 'letter', facts: { 'Who is the letter to?': ['Ms. Tremblay', 'Dear'], 'What does Arjun want?': ['more books about animals', 'I think'], 'How many times have they read the animal books?': ['two times', 'all the animal books'] },
      main: ['asks for more animal books', 'love animals'] }
  };
  const WHY = { story: 'for enjoyment', 'journal entry': 'for enjoyment', poem: 'for enjoyment', information: 'to find information', instructions: 'to learn how to do something', letter: 'to hear what someone thinks' };
  const CLUES = { letter: /Dear/, instructions: /numbered steps/, information: /headings and facts/, poem: /short lines/, story: /characters/, 'journal entry': /days/ };
  const DAYS = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Next )/;
  /* each problem while reading and the fix that solves it */
  const FIXES = { 'A sentence does not make sense.': 'Read it again, slowly.', 'You cannot picture what is happening.': 'Make a picture in your head.',
    'You wonder why something happened.': 'Ask a question, then read on.', 'You meet a word you do not know.': 'Look at the picture and the words around it.',
    'You forget what happened.': 'Go back to the start of the part.' };
  const GOOD = Object.values(FIXES);
  /* read the passage card back out of the question's picture: its title, headings and sentences */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const ps = p.querySelectorAll('.ps'), lines = ps.length ? [...ps].map(x => text(x.innerHTML)) : [...p.querySelectorAll('p')].map(x => text(x.innerHTML));
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: [...p.querySelectorAll('.psh')].map(h => text(h.innerHTML)), lines, all: lines.join(' ') }; };
  /* the kind of text, worked out from how it is laid out */
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads.length && c.heads.every(h => DAYS.test(h)) ? 'journal entry'
    : c.heads.length ? 'information' : (KEY[c.title] || {}).kind === 'poem' ? 'poem' : 'story';
  const povOf = c => /\b(I|my|me)\b/.test(c.all) ? 'first' : 'third';
  const key = (m, f) => (KEY[text(m.t)] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const quoted = s => (text(s).match(/“([^”]+)”/) || [, ''])[1];
  const unq = s => text(s).replace(/[“”]/g, '');
  const tfWhy = (q, yes) => q.why && q.why.answer === (yes ? 0 : 1);

  /* find it in the text */
  V['g2-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] ? '' : 'expected ' + (w && w[0]); };
  V['g2-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g2-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g2-fact-tf'] = (q, m) => { const w = want(m), said = text(q.q).match(/says: (.+)$/)[1], right = !!w && said === w[0]; return w && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* the main idea */
  V['g2-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[0]) ? '' : 'expected the option about "' + (k && k[0]) + '"'; };
  V['g2-detail'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[1]) ? '' : 'expected the detail "' + (k && k[1]) + '"'; };
  V['g2-best-title'] = q => { const c = card(q), fits = Object.keys(KEY).filter(t => KEY[t].facts && Object.values(KEY[t].facts).every(f => c.all.includes(f[1])));
    return fits.length === 1 && mk(q) === fits[0] ? '' : 'expected the title ' + fits.join(' or '); };
  V['g2-main-tf'] = (q, m) => { const k = key(m, 'main'), d = document.createElement('div'); d.innerHTML = q.fig; const said = text(d.querySelector('.sent').innerHTML), right = !!k && said.includes(k[0]);
    return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* in order: where each event comes in the passage */
  V['g2-order'] = q => { const c = card(q), at = q.items.map(i => c.all.indexOf(unq(i))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g2-first-last'] = q => { const c = card(q), pos = q.tiles.map(t => c.all.indexOf(unq(t))), first = /first/.test(text(q.q));
    const best = first ? Math.min(...pos) : Math.max(...pos); return pos.every(p => p >= 0) && pos[q.answer] === best ? '' : 'expected the ' + (first ? 'first' : 'last') + ' event'; };
  V['g2-after'] = q => { const c = card(q), p0 = c.all.indexOf(quoted(q.q)), pos = q.options.map(o => c.all.indexOf(unq(o)));
    const later = pos.filter(p => p > p0), next = later.length ? Math.min(...later) : -2; return p0 >= 0 && pos.every(p => p >= 0) && pos[q.answer] === next ? '' : 'expected the event that comes next'; };
  V['g2-map'] = q => { const c = card(q), d = document.createElement('div'); d.innerHTML = q.fig; const li = [...d.querySelectorAll('.wchain li')].map(x => unq(x.innerHTML));
    const a = c.all.indexOf(li[0]), b = c.all.indexOf(li[2]), fits = q.options.map(o => { const p = c.all.indexOf(unq(o)); return p > a && p < b; });
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the event between the two boxes'; };
  /* predict */
  V['g2-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.all.includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g2-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[1]) && c.all.includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g2-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g2-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(q.q).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g2-predict-title'] = (q, m) => { const c = card(q), k = KEY[c.title]; return k && k.main && mk(q).includes(k.main[0]) && c.lines.length === 0 ? '' : 'expected the option about "' + (k && k.main && k.main[0]) + '"'; };
  /* fix it when it does not make sense */
  V['g2-which-fix'] = q => { const p = text(q.q).replace(/^Problem: /, '').replace(/ What could you do\?$/, ''); return FIXES[p] && mk(q) === FIXES[p] ? '' : 'expected ' + FIXES[p]; };
  V['g2-fix-up'] = q => H.sameSet(q.options.map((o, i) => GOOD.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked';
  V['g2-match-fix'] = q => q.pairs.every(p => FIXES[text(p[0])] === text(p[1])) ? '' : 'a problem is matched to the wrong fix';
  V['g2-fix-tf'] = q => { const good = GOOD.includes(text(q.fig)); return q.answer === good && tfWhy(q, good) ? '' : 'expected ' + good; };
  /* why am I reading this? */
  V['g2-purpose'] = q => { const k = kindOf(card(q)); return mk(q) === WHY[k] ? '' : 'expected ' + WHY[k]; };
  V['g2-which-text'] = q => { const w = text(q.q).match(/You want (.+)\. Which/)[1], fits = q.tiles.map(t => WHY[(KEY[text(t)] || {}).kind] === w);
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text you read ' + w; };
  V['g2-match-why-read'] = q => q.pairs.every(p => WHY[(KEY[text(p[0])] || {}).kind] === text(p[1])) ? '' : 'a text is matched to the wrong reason';
  V['g2-purpose-tf'] = q => { const said = text(q.q).match(/read this (.+)\.$/)[1], right = said === WHY[kindOf(card(q))]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* kinds of texts */
  V['g2-form'] = q => { const c = card(q), k = kindOf(c); return mk(q) === k && KEY[c.title].kind === k ? '' : 'expected ' + k; };
  V['g2-form-clue'] = q => { const k = kindOf(card(q)); return CLUES[k].test(mk(q)) && q.options.filter(o => CLUES[k].test(text(o))).length === 1 ? '' : 'expected the clue for ' + k; };
  V['g2-real-made'] = q => { const k = kindOf(card(q)); return mk(q) === (k === 'information' ? 'It gives facts.' : 'It tells a story.') ? '' : 'expected the other answer for ' + k; };
  V['g2-match-text-kind'] = q => q.pairs.every(p => (KEY[text(p[0])] || {}).kind === text(p[1])) ? '' : 'a title is matched to the wrong kind';
  /* who is telling it? */
  V['g2-narrator'] = q => { const p = povOf(card(q)); return q.answer === (p === 'first' ? 0 : 1) && /first person/.test(text(q.tiles[0])) ? '' : 'expected ' + p + ' person'; };
  V['g2-narrator-word'] = q => { const c = card(q), p = povOf(c), w = mk(q); return (p === 'first' ? w === 'I' : /^(They|He|She)$/.test(w)) && new RegExp('\\b' + w + '\\b', 'i').test(c.all) ? '' : 'expected a ' + p + '-person word from the text'; };
  V['g2-other-view'] = (q, m) => { const k = key(m, 'first'); return k && mk(q) === k && /\b(I|my)\b/.test(k) && povOf(card(q)) === 'third' ? '' : 'expected the first-person start'; };
  V['g2-first-line'] = q => { const first = q.options.map(o => /\b(I|my)\b/.test(text(o))); return first.filter(Boolean).length === 1 && first[q.answer] ? '' : 'expected the one sentence with I or my'; };
})();
