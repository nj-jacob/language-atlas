/* Grade 3 answer checks: thinking about texts (grade3/chapters/thinking.js).
   The checker keeps its own answer key (like a second marker): jobs of text features, causes and effects, strong words,
   metaphors, vowel sounds, the clues for each inference and what each letter writer thinks. Comparisons and headings are
   worked out from the cards and the passage the question shows. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || ''), lc = s => s.toLowerCase();
  const JOB = { title: 'whole text', heading: 'one part', 'table of contents': 'chapters at the front', index: 'pages at the back', glossary: 'hard words', caption: 'about a picture',
    label: 'names a part', diagram: 'parts fit', map: 'where places', 'bold print': 'stand out', chart: 'rows and columns' };
  const USE = { 'whole book': 'title', 'one part of the page': 'heading', 'what chapters': 'table of contents', 'page about lodges': 'index', 'hard word means': 'glossary',
    'photo shows': 'caption', 'one part of a drawing': 'label', 'fit together': 'diagram', 'where the geese': 'map', 'important words': 'bold print', 'how tall': 'chart' };
  /* words that must be in the part under the heading for each topic */
  const TOPIC = { lodges: 'lodges', 'chewing wood': 'Chewing wood', 'swimming under the ice': 'under the ice', 'who made syrup first': 'first to make', 'how sap starts to flow': 'sap flow',
    'turning sap into syrup': 'boiled', 'changing colour': 'white coat', 'hopping on deep snow': 'without sinking', 'the white patch under the chin': 'white patch', 'the V shape': 'letter V',
    goslings: 'goslings', 'honking to keep in touch': 'honk', 'who planted them long ago': 'Long ago', 'how beans climb the corn': 'climb up', 'saving corn for winter': 'saved for winter',
    antlers: 'antlers', 'eating plants under the water': 'under the water', 'hollow hairs': 'hollow hairs', 'baby moose': 'calf', 'the colours of the lights': 'green',
    'the best places to look': 'Yukon', 'Indigenous names for the lights': 'Indigenous', 'staying away from city lights': 'far from city lights' };
  const CAUSE = {};
  [['A beaver chews wood.', 'Its teeth stay short.'], ['Beavers store branches in the fall.', 'They have food in winter.'], ['Days are warm and nights are cold.', 'Sap flows inside maple trees.'],
    ['Sap is boiled for a long time.', 'Sweet syrup is left.'], ['First Nations people taught others.', 'Others learned to make syrup.'], ['Leila lost her mitten.', 'They went back to look for it.'],
    ['Leila found her mitten.', 'Her fingers were warm again.'], ['The water was very still.', 'The narrator could see clouds in it.'], ['The narrator paddled all day.', "The narrator's arms were tired."],
    ['The wind grabbed the kite.', 'The kite went up high.'], ["The string slipped out of Tala's hand.", 'The kite flew away.'], ['The kite got stuck in a tree.', 'Omar climbed up to get it.'],
    ['The hare grows a white coat.', 'It is hard to see in the snow.'], ['The hare has big back feet.', 'It does not sink in deep snow.'], ['The snow was wet and sticky.', 'It was perfect for packing.'],
    ['Snow started to fall again.', 'They needed a roof.'], ['They put a sled on top.', 'The snow stayed out.'], ['Food and open water are hard to find in the fall.', 'Geese fly south.'],
    ['Flying at the front is hardest.', 'The geese take turns at the front.'], ['A goose is hurt and has to land.', 'Other geese stay with it.'], ['The corn grows tall and straight.', 'The beans have something to climb.'],
    ['Squash leaves shade the soil.', 'The soil stays damp.'], ['Corn is dried.', 'It can be saved for winter.'], ['Hollow hairs trap warm air.', 'Moose stay cozy in winter.'],
    ['Moose have long legs.', 'They can walk through deep snow.'], ['Plants grow under the water.', 'Moose wade into lakes in summer.'], ['Fall and winter nights are long.', 'It is a good time to look for the lights.'],
    ['City lights make the sky bright.', 'It is hard to see the lights in a city.'], ['The splash pad might close.', 'Jayden wrote a letter.'], ['It is a hot day.', 'Kids go to the splash pad to cool down.']
  ].forEach(p => { CAUSE[p[0]] = p[1]; });
  const LCAUSE = {}; Object.keys(CAUSE).forEach(c => { LCAUSE[lc(c.replace(/\.$/, ''))] = lc(CAUSE[c].replace(/\.$/, '')); });
  const EFFECT = {}; Object.keys(CAUSE).forEach(c => { EFFECT[CAUSE[c]] = c; });
  const VIVID = new Set(['The hungry dog gobbled its dinner.', 'An icy wind nipped at my cheeks.', 'A tiny robin sang a bright, cheerful song.', 'We zoomed down the snowy hill on our toboggan.',
    'The lake sparkled like glass in the morning sun.', 'The campfire crackled and popped in the dark.', 'Rain drummed on the tin roof all night.', 'The kitten pounced on a ball of red yarn.',
    'The huge moose trudged through the deep snow.', 'Golden leaves twirled down to the ground.', 'Thunder rumbled over the dark hills.', 'The goalie snatched the puck out of the air.',
    'The baby giggled and kicked her feet.', 'The hot corn soup smelled sweet and smoky.', 'The puppy scampered across the muddy yard.', 'The heavy door slammed shut with a bang.']);
  const STRONG = new Set('gobbled zoomed drummed sparkled rumbled snatched twirled crackled scampered giggled trudged slammed pounced nipped'.split(' '));
  /* metaphor: [the thing, what it is called, how they are alike]; plain sentences are not metaphors */
  const META = {
    'The moon is a lamp above the lake.': ['the moon', 'a lamp', 'give light'], 'The wind is a whisper in the pines.': ['the wind', 'a whisper', 'soft and quiet'],
    'My brother is a rocket on his bike.': ['my brother', 'a rocket', 'very fast'], 'The snow is a white blanket on the field.': ['the snow', 'a blanket', 'cover things'],
    'Her laugh is music.': ['her laugh', 'music', 'nice to hear'], 'The lake is a mirror.': ['the lake', 'a mirror', 'see yourself'], 'The classroom was a zoo.': ['the classroom', 'a zoo', 'loud and busy'],
    'Dad is a bear in the morning.': ['Dad', 'a bear', 'grumpy'], 'The stars are diamonds in the sky.': ['the stars', 'diamonds', 'sparkle'],
    'The rink is a sheet of glass.': ['the rink', 'a sheet of glass', 'smooth and shiny'], 'My cat is a heater on my lap.': ['my cat', 'a heater', 'are warm'],
    'The road was a ribbon over the hills.': ['the road', 'a ribbon', 'long and thin'], 'The puppy is a ball of fluff.': ['the puppy', 'a ball of fluff', 'soft and round'],
    'The fog was a grey wall.': ['the fog', 'a wall', 'cannot see through'] };
  /* vowel sounds: the example word in each label, the words that have each sound, and the lines with assonance */
  const EX = { o: 'snow', ee: 'tree', a: 'cat', i: 'kite', ay: 'rain', u: 'sun', oo: 'moon', ih: 'fish' };
  const HAS = { o: 'go home old goat cold road glow slow over snow', ee: 'sleep deep dream three green trees sea', a: 'cat sat at back van max packs black hat', i: 'light kite night i like ride my bike',
    ay: 'rain came late day play lake', u: 'pup dug mud just bug rug', oo: 'moon cool blue goose flew pool', ih: 'six fish swim' };
  Object.keys(HAS).forEach(k => { HAS[k] = new Set(HAS[k].split(' ')); });
  const LINES = { 'The stars glow slow over the snow.': 'o', 'Go home, old goat, down the cold road.': 'o', 'I sleep deep and dream.': 'ee', 'Three green trees by the sea.': 'ee',
    'The cat sat at the back of the van.': 'a', 'Max packs a black hat for the trip.': 'a', 'Light the kite at night.': 'i', 'I like to ride my bike.': 'i', 'The rain came late that day.': 'ay',
    'We play in the lake all day.': 'ay', 'The pup dug in the mud.': 'u', 'Just a bug on the rug.': 'u', 'The moon is cool and blue.': 'oo', 'A goose flew by the pool.': 'oo', 'Six fish swim near the dock.': 'ih' };
  /* inferences: passage -> question -> [answer, the clue words] */
  const INFER = {
    'The Lost Mitten': { 'How does Leila feel at the end?': ['happy', 'grinned'], 'How does Leila feel when she stops at the corner?': ['upset', 'she cried'] },
    'My First Canoe Trip': { 'How does the narrator feel at the start?': ['nervous', 'paddle tight'], 'How does the narrator feel about canoeing now?': ['excited to go again', 'wait to go again'], 'What was the lake like that day?': ['calm, with no waves', 'so still'] },
    'Busy Beavers': { 'Why does a beaver need to keep chewing?': ['so its teeth do not get too long', 'never stop growing'] },
    'The Runaway Kite': { 'How does Tala feel when the string slips?': ['worried', 'out of her hand'], 'What did Tala learn?': ['to hold on to the string', 'her wrist'] },
    'Thank You, Coach Ana': { 'How does Noor feel about passing now?': ['proud', 'almost every time'] },
    'My Library Card': { 'Which book does the narrator most want to read?': ['the shark book', 'shark book first'] },
    'The Snow Fort': { 'How do Amara and Theo feel about their fort?': ['proud', 'best fort'], 'How do Amara and Theo feel when they stop to rest?': ['cold and wet', 'mittens were soaked'] },
    'The Ferry Ride': { 'How does the narrator feel when the horn blows?': ['startled by the noise', 'covered my ears'], 'How does the narrator feel on the way home?': ['tired', 'fell asleep'], 'How does Grandma feel about the trip?': ['she enjoyed it', 'can go back'] },
    'The Big Save': { 'How does the goalie feel as the player comes close?': ['nervous', 'pounding'], 'How do the teammates feel about the save?': ['happy and proud', 'banged their sticks'], 'How does the goalie feel when the game ends?': ['proud', 'we had won'] },
    'Keep the Splash Pad Open': { 'How does Jayden feel about the splash pad closing?': ['worried', 'might close'] },
    'The Bounce Test': { 'How does Hana feel about testing?': ['she wants to test more', 'instead of the floor'] } };
  const THINKS = { Priya: 'The park needs a skating rink.', Jayden: 'The splash pad should stay open.', Noor: 'The team should play one more game.' };
  const REASONS = { Priya: ['safe place to skate', 'keeps us healthy', 'use it every day'], Jayden: ['best place to cool down', 'do not have a pool', 'make new friends'] };
  /* who might say what, about each topic */
  const SAYS = {
    'A new skating rink in the park': { 'a child who loves to skate': 'skate there', 'a neighbour beside the park': 'awake', 'a city worker': 'ice smooth', 'a parent': 'close to home' },
    'Keeping the splash pad open': { 'a child': 'cool down', 'a parent': 'every family', 'a city worker': 'pipes', 'an older neighbour': 'shade' },
    'A longer recess': { 'a student': 'more games', 'a teacher': 'reading', 'a yard helper': 'watch the yard', 'a parent': 'Fresh air' },
    'A class pet': { 'a student who loves animals': 'feed it', 'a student with allergies': 'sneeze', 'the teacher': 'weekends', 'the caretaker': 'cage' },
    'A new bike path by the river': { 'a child who bikes': "friend's house", 'a person walking a dog': 'my dog', 'a bird watcher': 'nests', 'a bus driver': 'Fewer cars' } };

  const el = h => { const d = document.createElement('div'); d.innerHTML = h || ''; return d; };
  /* the cards in a question's picture: each card's title and sentences */
  const cards = q => [...el(q.fig).querySelectorAll('.psg')].map(p => ({ title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', lines: [...p.querySelectorAll('.ps')].map(s => text(s.innerHTML)) }));
  const inCard = (c, s) => c.lines.includes(s);
  const tapped = q => { const all = [...el(q.pic).querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const inf = m => (INFER[m.t] || {})[text(m.q)];
  const one = (q, ok) => { const good = q.options.map(text).filter(ok); return good.length === 1 && mk(q) === good[0]; };

  /* text features */
  V['g3-feature'] = (q, m) => one(q, o => o.includes(JOB[m.f])) ? '' : 'expected the job of the ' + m.f;
  V['g3-feature-use'] = (q, m) => { const need = Object.keys(USE).find(k => text(q.q).includes(k)); return need && USE[need] === m.f && mk(q) === m.f && q.options.map(text).filter(o => o === USE[need]).length === 1 ? '' : 'expected the ' + (need && USE[need]); };
  V['g3-match-features'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  V['g3-feature-tf'] = (q, m) => (text(m.said).includes(JOB[m.f])) === q.answer ? '' : 'true/false is wrong for the ' + m.f;
  V['g3-heading'] = (q, m) => {
    const p = el(q.fig).querySelector('.psg'), h = [...p.querySelectorAll('.psh')].find(x => text(x.innerHTML) === mk(q)), part = h && h.nextElementSibling;
    return part && text(part.innerHTML).includes(TOPIC[m.topic]) ? '' : 'the part under "' + mk(q) + '" is not about ' + m.topic;
  };
  /* cause and effect */
  V['g3-cause'] = q => q.pairs.every(p => CAUSE[text(p[0])] === text(p[1])) ? '' : 'a cause is matched to the wrong effect';
  V['g3-effect'] = (q, m) => CAUSE[text(m.c)] && one(q, o => o === CAUSE[text(m.c)]) ? '' : 'expected ' + CAUSE[text(m.c)];
  V['g3-which-cause'] = (q, m) => EFFECT[text(m.e)] && one(q, o => o === EFFECT[text(m.e)]) ? '' : 'expected ' + EFFECT[text(m.e)];
  V['g3-cause-tf'] = (q, m) => CAUSE[text(m.c)] && (CAUSE[text(m.c)] === text(m.e)) === q.answer ? '' : 'true/false is wrong for ' + m.c;
  V['g3-because'] = q => { const fits = o => { const [e, c] = lc(o).replace(/\.$/, '').split(' because '); return !!c && LCAUSE[c] === e; }; return one(q, fits) ? '' : 'expected the sentence with the cause after because'; };
  /* word choice */
  V['g3-picture'] = q => one(q, o => VIVID.has(o)) ? '' : 'expected the sentence with strong words';
  V['g3-better-word'] = q => one(q, o => STRONG.has(o)) ? '' : 'expected the strong word';
  V['g3-strong-tap'] = q => { const t = q.tiles.map(text).filter(x => STRONG.has(x)); return t.length === 1 && text(q.tiles[q.answer]) === t[0] ? '' : 'expected the strong action word'; };
  V['g3-pattern'] = q => { const all = [...el(q.fig).querySelectorAll('.ps')].map(s => text(s.innerHTML)).join(' ').toLowerCase().replace(/[,.!]/g, '').split(' '), n = w => all.filter(x => x === w).length;
    const most = Math.max(...q.tiles.map(t => n(lc(text(t))))), w = lc(mk(q));
    return n(w) >= 3 && n(w) === most && q.tiles.map(text).filter(t => n(lc(t)) === most).length === 1 ? '' : 'the word that repeats most is not the one marked'; };
  /* metaphors */
  V['g3-metaphor'] = q => one(q, o => !!META[o]) ? '' : 'expected the metaphor';
  V['g3-compared'] = (q, m) => { const k = META[text(m.s)]; return k && text(q.fig) === text(m.s) && one(q, o => o === k[0] + ' and ' + k[1]) ? '' : 'expected ' + (k && k[0] + ' and ' + k[1]); };
  V['g3-alike'] = (q, m) => { const k = META[text(m.s)]; return k && one(q, o => o.includes(k[2])) ? '' : 'expected how ' + (k && k[0]) + ' and ' + (k && k[1]) + ' are alike'; };
  V['g3-metaphor-tf'] = (q, m) => text(q.fig) === text(m.s) && !!META[text(m.s)] === q.answer ? '' : 'true/false is wrong for ' + m.s;
  /* assonance */
  V['g3-assonance'] = q => one(q, o => !!LINES[o]) ? '' : 'expected the line with assonance';
  V['g3-which-vowel'] = (q, m) => { const v = LINES[text(m.s)]; return v && one(q, o => o.endsWith(' ' + EX[v])) ? '' : 'expected the sound in ' + (v && EX[v]); };
  V['g3-pick-vowel'] = (q, m) => { const want = q.options.map((o, i) => HAS[m.v].has(lc(text(o))) ? i : -1).filter(i => i >= 0); return want.length >= 3 && H.sameSet(want, q.answer) && text(q.q).includes(EX[m.v]) ? '' : 'the words with the sound are not the ones marked'; };
  V['g3-assonance-tf'] = (q, m) => text(q.fig) === text(m.s) && !!LINES[text(m.s)] === q.answer ? '' : 'true/false is wrong for ' + m.s;
  /* inferences */
  V['g3-infer'] = (q, m) => { const k = inf(m); return k && mk(q) === k[0] && H.has(q.fig, k[1].replace(/'/g, '’')) ? '' : 'expected ' + (k && k[0]); };
  V['g3-evidence'] = (q, m) => { const k = inf(m); return k && text(q.q).includes(k[0]) && one(q, o => o.includes(k[1])) ? '' : 'expected the sentence with "' + (k && k[1]) + '"'; };
  V['g3-infer-tap'] = (q, m) => { const k = inf(m), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence is not the clue'; };
  V['g3-infer-tf'] = (q, m) => { const k = inf(m), right = !!k && text(m.said) === k[0]; return k && q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'expected ' + right; };
  /* compare */
  V['g3-compare'] = q => { const c = cards(q); return c.length === 2 && one(q, o => c.every(x => inCard(x, o))) ? '' : 'expected the sentence in both cards'; };
  V['g3-only-one'] = (q, m) => { const c = cards(q), me = c[m.side], other = c[1 - m.side]; return c.length === 2 && text(q.q).includes(me.title) && one(q, o => inCard(me, o) && !inCard(other, o)) ? '' : 'expected the sentence only in the ' + (me && me.title) + ' card'; };
  V['g3-sort-compare'] = q => { const c = cards(q); return c.length === 2 && q.pairs.every(p => { const s = text(p[0]), a = inCard(c[0], s), b = inCard(c[1], s), where = text(p[1]);
    return where === 'In both' ? a && b : where === 'Only ' + c[0].title ? a && !b : where === 'Only ' + c[1].title ? b && !a : false; }) ? '' : 'a sentence is matched to the wrong place'; };
  V['g3-compare-tf'] = (q, m) => { const c = cards(q); return c.length === 2 && c.every(x => inCard(x, text(m.s))) === q.answer ? '' : 'true/false is wrong for ' + m.s; };
  /* perspective */
  V['g3-perspective'] = (q, m) => THINKS[m.who] && mk(q) === THINKS[m.who] && H.has(q.fig, 'From, ' + m.who) ? '' : 'expected what ' + m.who + ' thinks';
  V['g3-reason'] = (q, m) => { const r = REASONS[m.who] || []; return H.has(q.fig, 'From, ' + m.who) && one(q, o => r.some(x => o.includes(x)) && H.has(q.fig, o.replace(/'/g, '’'))) ? '' : 'expected one of ' + m.who + "'s reasons"; };
  V['g3-who-says'] = (q, m) => { const s = SAYS[m.topic] || {}, line = text(q.fig), who = Object.keys(s).filter(w => line.includes(s[w])); return who.length === 1 && mk(q) === who[0] ? '' : 'expected ' + who.join('/'); };
  V['g3-match-sides'] = (q, m) => { const s = SAYS[m.topic] || {}; return q.pairs.every(p => s[text(p[0])] && text(p[1]).includes(s[text(p[0])])) ? '' : 'a person is matched to the wrong words'; };
  V['g3-view-tf'] = (q, m) => THINKS[m.who] && (text(m.s) === THINKS[m.who]) === q.answer ? '' : 'true/false is wrong for ' + m.who;
})();
