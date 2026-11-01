/* Grade 1 answer checks: thinking about texts (grade1/chapters/thinking.js). The checker keeps its own answer key and word lists,
   and works out rhymes, matching first sounds and the order of events from the words themselves. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const TITLE = { 'Bears in Winter': 'how bears live in the cold months', 'My First Day of School': 'a child starting school', 'How to Build a Snowman': 'the steps to make a snowman', 'The Lost Puppy': 'a puppy that gets lost',
    'All About Owls': 'facts about owls', "Grandma's Garden": 'the plants Grandma grows', 'Fun at the Fall Fair': 'a day at a fair in the fall', 'How to Make a Paper Boat': 'the steps to fold a boat',
    'The Big Storm': 'a day with wind and rain', 'Life in a Pond': 'animals that live in a pond' };
  const SYMBOL = { '+': 'add', '→': 'go this way', '♥': 'love', '?': 'a question', '=': 'the same as', '✓': 'yes, done', '✗': 'no, or wrong' };
  const PIC = { 'The bee buzzed near the flowers.': 'bee', 'We ate an apple at snack time.': 'apple', 'The moon is bright tonight.': 'moon', 'I kicked the ball to Sam.': 'ball', 'The fox ran into the woods.': 'fox',
    'Dad opened the door with a key.': 'key', 'A bird sat on its nest.': 'nest', 'The bus stopped at the school.': 'bus', 'I put my hat on my head.': 'hat', 'A fish swam in the lake.': 'fish',
    'The cat slept on my bed.': 'cat', 'A pig rolled in the mud.': 'pig', 'Mom drank tea from a cup.': 'cup', 'A jet flew over the city.': 'jet', 'A red leaf fell on the path.': 'leaf',
    'We read a book at bedtime.': 'book', 'A goose swam on the pond.': 'goose', 'The sun came up over the hill.': 'sun' };
  /* sentences that paint a picture, and their picture words */
  const VIVID = { 'The fluffy white puppy rolled in the soft grass.': 'fluffy white rolled soft', 'It was a hot, sunny day at the beach.': 'hot sunny', 'The hungry orange cat gobbled its fish.': 'hungry orange gobbled',
    'We saw a tall pine tree covered in snow.': 'tall pine covered', 'She zoomed down the icy hill on her sled.': 'zoomed icy', 'The tiny yellow bird sang a happy song.': 'tiny yellow happy',
    'The shiny red car raced down the road.': 'shiny red raced', 'Soft, white snow drifted down all night.': 'Soft white drifted', 'The green frog leaped into the cold pond.': 'green leaped cold',
    'I slurped warm, salty soup from a big bowl.': 'slurped warm salty big' };
  const vivid = s => (VIVID[text(s)] || '').split(' ').filter(Boolean);
  const SOUND = new Set('buzz splash moo pop crash boom hiss quack honk woof drip drop plop scratch'.split(' '));
  const MAKES = { buzz: 'a bee', moo: 'a cow', quack: 'a duck', hiss: 'a snake', splash: 'a jump in a pool', boom: 'a big drum', honk: 'a car horn', woof: 'a dog', pop: 'a balloon', crash: 'falling blocks' };
  /* rhyme: the same letters from the last vowel to the end; poems keep their own pairs */
  const rime = w => (w.match(/[aeiou]+[^aeiou]*e?$/) || [''])[0];
  const POEM = { Rain: { drop: 'top', sun: 'done' }, 'The Moon': { bright: 'night', too: 'new' } };
  const words = s => text(s).replace(/[.!?,]/g, '').split(' ').filter(Boolean);
  const allSame = s => { const w = words(s); return w.length >= 3 && w.every(x => x[0].toLowerCase() === w[0][0].toLowerCase()); };
  const FEEL = { sad: 'fell on the ground', excited: 'jumped up and down', scared: 'hid under her blanket', proud: 'smiled and showed', tired: 'eyes kept closing', angry: 'stomped his feet', happy: 'hugged her new puppy', lonely: 'friends were gone' };
  const TEXT_FEEL = { 'How does Tala feel when the kite goes up?': ['excited', 'Look, Grandpa'], 'How did the narrator feel outside at the end?': ['cold', 'cheeks got cold'],
    'How does Pauloosie feel at the end?': ['proud', 'made it together'], 'How does Ava feel before the game?': ['nervous', 'butterflies'], 'How does Ava feel at the end?': ['happy', 'grinned'],
    'How does the child feel when Biscuit is gone?': ['worried', 'No Biscuit'], 'How does the narrator feel about the loon?': ['curious', 'Where did it go'] };
  const VIEW = { Omar: ['Winter is great.', 'Winter is the best'], Hana: ['Quiet places are best.', 'favourite spot'], Mateo: ['Dogs make great pets.', 'best pets'],
    Sofia: ['Rainy days are fun.', 'love rainy days'], Ethan: ['Broccoli is not good.', 'Broccoli is yucky'], Amara: ['Reading is great.', 'my favourite thing'] };
  const LETTER = { 'A Note to Grandma': ['He loves the scarf.', 'I wear it every day'], 'Dear Principal Diaz': ['A school garden is a good idea.', 'I think our school should'] };
  const picName = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('svg.wpic'); return s && s.getAttribute('aria-label'); };
  const sentOf = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('.sent'); return s ? text(s.innerHTML) : ''; };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return { all: '' };
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', all: [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML)).join(' ') }; };
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const pos = (c, s) => c.all.indexOf(text(s).replace(/[“”]/g, ''));
  const quoted = s => (text(s).match(/“([^”]+)”/) || [, ''])[1];

  /* titles and symbols */
  V['g1-title-tells'] = (q, m) => mk(q) === TITLE[text(m.t)] ? '' : 'expected ' + TITLE[text(m.t)];
  V['g1-title-for'] = (q, m) => { const ok = q.tiles.map(text).filter(t => TITLE[t] === m.about); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the title about ' + m.about; };
  V['g1-title-tf'] = (q, m) => { const right = TITLE[text(m.t)] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-symbol'] = q => mk(q) === SYMBOL[text(q.fig)] ? '' : 'expected ' + SYMBOL[text(q.fig)];
  V['g1-steps-why'] = q => /order of the steps/.test(mk(q)) && card(q).all.includes('1. ') ? '' : 'expected the order of the steps';
  /* pictures and words */
  V['g1-pic-match'] = (q, m) => { const names = q.tiles.map(picName), want = PIC[m.s]; return want && names[q.answer] === want && names.filter(n => n === want).length === 1 && text(q.fig) === m.s ? '' : 'expected the picture of ' + want; };
  V['g1-pic-sentence'] = (q, m) => { const ok = q.options.map(text).filter(o => PIC[o] === picName(q.fig)); return picName(q.fig) === m.pic && ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence about the ' + m.pic; };
  V['g1-pic-word'] = (q, m) => mk(q) === PIC[m.s] && picName(q.fig) === PIC[m.s] ? '' : 'expected ' + PIC[m.s];
  V['g1-pic-tf'] = (q, m) => { const right = picName(q.fig) === PIC[sentOf(q.fig)]; return sentOf(q.fig) === m.s && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* words that paint a picture */
  V['g1-word-choice'] = q => { const ok = q.options.map(text).filter(o => vivid(o).length); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with picture words'; };
  V['g1-vivid-word'] = q => { const v = vivid(q.fig), ok = q.tiles.map(text).filter(t => v.includes(t)); return ok.length === 1 && mk(q) === ok[0] && words(q.fig).includes(ok[0]) ? '' : 'expected the one picture word'; };
  V['g1-pick-vivid'] = q => { const v = vivid(q.fig); return v.length && H.sameSet(q.options.map((o, i) => v.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the picture words are not the ones marked'; };
  V['g1-vivid-tf'] = q => { const right = vivid(q.fig).length > 0; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* rhyme */
  V['g1-rhyme'] = (q, m) => { const ok = q.options.map(text).filter(o => o !== m.w && rime(o) === rime(m.w)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word that rhymes with ' + m.w; };
  V['g1-rhyme-poem'] = (q, m) => { const pair = (POEM[m.t] || {})[m.w], ok = q.options.map(text).filter(o => o === pair || (o !== m.w && rime(o) === rime(m.w)));
    return ok.length === 1 && mk(q) === ok[0] && card(q).all.includes(ok[0]) ? '' : 'expected the rhyme for ' + m.w; };
  V['g1-rhyme-odd'] = (q, m) => { const t = q.tiles.map(text), odd = t.filter(w => t.filter(x => rime(x) === rime(w)).length === 1); return odd.length === 1 && mk(q) === odd[0] && odd[0] === m.odd ? '' : 'expected the one word that does not rhyme'; };
  V['g1-match-rhyme'] = q => q.pairs.every(p => rime(text(p[0])) === rime(text(p[1]))) ? '' : 'a pair does not rhyme';
  /* sound words */
  V['g1-sound-word'] = q => { const ok = q.options.map(text).filter(o => SOUND.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sound word'; };
  V['g1-pick-sound'] = q => H.sameSet(q.options.map((o, i) => SOUND.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sound words are not the ones marked';
  V['g1-sound-in-text'] = q => { const ok = q.tiles.map(text).filter(t => SOUND.has(t.toLowerCase())); return ok.length === 1 && mk(q) === ok[0] && card(q).all.includes(ok[0]) ? '' : 'expected the sound word from the text'; };
  V['g1-match-sound'] = q => q.pairs.every(p => MAKES[text(p[0])] === text(p[1])) ? '' : 'a sound is matched to the wrong maker';
  /* words that start the same */
  V['g1-same-start'] = q => { const ok = q.options.filter(allSame).map(text); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence where every word starts the same'; };
  V['g1-same-fill'] = (q, m) => { const ok = q.tiles.map(text).filter(t => allSame(m.s + ' ' + t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the word that starts the same'; };
  V['g1-same-letter'] = (q, m) => { const w = words(m.s); return allSame(m.s) && mk(q) === w[0][0].toLowerCase() ? '' : 'expected ' + w[0][0]; };
  V['g1-same-tf'] = q => { const right = allSame(q.fig); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* feelings */
  V['g1-feeling'] = (q, m) => { const f = mk(q); return FEEL[f] && m.text.includes(FEEL[f]) && text(q.fig) === text(m.text) ? '' : 'the feeling does not fit the clue'; };
  V['g1-feel-clue'] = (q, m) => { const want = Object.values(FEEL).filter(c => text(m.text).includes(c)); return want.length === 1 && mk(q) === want[0] && /feels (\w+)/.exec(text(q.q))[1] === Object.keys(FEEL).find(k => FEEL[k] === want[0]) ? '' : 'expected the clue in the text'; };
  V['g1-feel-tf'] = (q, m) => { const right = FEEL[text(m.said)] && text(m.text).includes(FEEL[text(m.said)]); return q.answer === !!right && tfWhy(q, !!right) ? '' : 'expected ' + !!right; };
  V['g1-text-feel'] = (q, m) => { const k = TEXT_FEEL[text(m.q)]; return k && mk(q) === k[0] && card(q).all.includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g1-feel-tap'] = (q, m) => { const k = TEXT_FEEL[text(m.q)], t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not show the feeling'; };
  /* in order: where each event comes in the passage */
  V['g1-order'] = q => { const c = card(q), p = q.items.map(i => pos(c, i)); return p.every((x, i) => x >= 0 && (i === 0 || x > p[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g1-first-last'] = q => { const c = card(q), p = q.tiles.map(t => pos(c, t)), first = /first/.test(text(q.q)), best = first ? Math.min(...p) : Math.max(...p);
    return p.every(x => x >= 0) && p[q.answer] === best ? '' : 'expected the ' + (first ? 'first' : 'last') + ' event'; };
  V['g1-after'] = q => { const c = card(q), p0 = c.all.indexOf(quoted(q.q)), p = q.options.map(o => pos(c, o)), later = p.filter(x => x > p0), next = later.length ? Math.min(...later) : -2;
    return p0 >= 0 && p.every(x => x >= 0) && p[q.answer] === next ? '' : 'expected the event that comes next'; };
  V['g1-map'] = q => { const c = card(q), d = document.createElement('div'); d.innerHTML = q.fig; const li = [...d.querySelectorAll('.wchain li')].map(x => text(x.innerHTML).replace(/[“”]/g, ''));
    const a = c.all.indexOf(li[0]), b = c.all.indexOf(li[2]), fits = q.options.map(o => { const x = pos(c, o); return x > a && x < b; });
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the event between the two boxes'; };
  /* what someone thinks */
  V['g1-view'] = (q, m) => mk(q) === VIEW[m.who][0] ? '' : 'expected ' + VIEW[m.who][0];
  V['g1-view-clue'] = (q, m) => { const ok = q.options.map(text).filter(o => text(q.fig).includes(o)); return ok.length === 1 && mk(q) === ok[0] && ok[0] === VIEW[m.who][1] ? '' : 'expected ' + VIEW[m.who][1]; };
  V['g1-view-tf'] = (q, m) => { const right = text(m.said) === VIEW[m.who][0]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-letter-view'] = (q, m) => { const k = LETTER[text(m.t)]; return k && mk(q) === k[0] && card(q).all.includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
})();
