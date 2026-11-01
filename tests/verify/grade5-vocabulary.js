/* Grade 5 answer checks: word meanings (grade5/chapters/vocabulary.js). The checker keeps its own answer key for each word,
   and finds the signal word in the sentence itself. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* word: [meaning, kind of clue, the clue words] */
  const KEY = {
    summit: ['the very top of a mountain', 'a definition', 'or very top of the mountain'], archipelago: ['a group of islands', 'a definition', 'which is a group of islands'],
    parka: ['a warm coat with a hood', 'a definition', 'which is a warm coat with a hood'], larva: ['a young insect', 'a definition', 'or young insect'],
    hibernate: ['sleep through the winter', 'a definition', 'which means they sleep through the winter'], glacier: ['a huge river of ice', 'a definition', 'that is, a huge river of ice'],
    cartographer: ['a person who makes maps', 'a definition', 'or mapmaker'], anxious: ['worried', 'a definition', 'which means worried'],
    migration: ['a long trip animals make each season', 'a definition', 'that is, the long trip geese make each fall'], bannock: ['a simple bread', 'a definition', 'which is a simple bread'],
    amphibians: ['animals like frogs that live on land and in water', 'examples', 'such as frogs and salamanders'], nutritious: ['good for your body', 'examples', 'like apples, beans and whole grains'],
    rodents: ['small animals with strong front teeth', 'examples', 'including squirrels, chipmunks and beavers'], utensils: ['tools for eating or cooking', 'examples', 'such as forks, spoons and ladles'],
    provinces: ['large parts of a country with their own government', 'examples', 'including Ontario, Quebec and Manitoba'], nocturnal: ['awake at night', 'examples', 'for example owls, bats and raccoons'],
    perishables: ['foods that spoil quickly', 'examples', 'like milk, fish and berries'], percussion: ['instruments you hit or shake', 'examples', 'such as drums and shakers'],
    obstacles: ['things that block your way', 'examples', 'including fallen logs and deep puddles'], toiletries: ['things for washing and grooming', 'examples', 'for example a toothbrush, soap and a comb'],
    exhausted: ['very tired', 'a contrast', 'but his little sister was full of energy'], timid: ['shy', 'a contrast', 'Aisha spoke up loudly'], fragile: ['easy to break', 'a contrast', 'but the metal pot is very strong'],
    generous: ['happy to share', 'a contrast', 'unlike his cousin, who never shares'], drowsy: ['sleepy', 'a contrast', 'The puppy was lively in the morning'], gradual: ['slow and gentle', 'a contrast', 'a sudden, steep drop'],
    turbulent: ['rough and choppy', 'a contrast', 'The lake was calm in the morning'], punctual: ['on time', 'a contrast', 'but today she arrived an hour late'],
    arid: ['very dry', 'a contrast', 'the northern forest gets rain all year'], hazardous: ['dangerous', 'a contrast', 'the new one is perfectly safe'] };
  const SIGNAL = { 'a definition': ['or', 'which is', 'which means', 'that is'], examples: ['such as', 'like', 'including', 'for example'], 'a contrast': ['but', 'unlike', 'however', 'instead of'] };
  const inSent = (s, w) => new RegExp('\\b' + w + '\\b', 'i').test(s);
  V['g5-context'] = (q, m) => mk(q) === KEY[m.word][0] && text(q.fig).includes(m.word) ? '' : 'expected ' + KEY[m.word][0];
  V['g5-clue-words'] = (q, m) => mk(q) === KEY[m.word][2] && text(q.fig).includes(KEY[m.word][2]) ? '' : 'expected the clue words';
  V['g5-clue-kind'] = (q, m) => mk(q) === KEY[m.word][1] ? '' : 'expected ' + KEY[m.word][1];
  V['g5-clue-signal'] = (q, m) => { const s = text(q.fig), there = q.tiles.map(text).filter(t => inSent(s, t));
    return there.length === 1 && mk(q) === there[0] && SIGNAL[KEY[m.word][1]].includes(there[0]) ? '' : 'expected the one signal word in the sentence'; };
  V['g5-context-tf'] = (q, m) => (m.said === KEY[m.word][0]) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;
  /* how strong each word is, 1 to 3 */
  const STRENGTH = {}; ['warm hot scorching', 'cool cold freezing', 'glad happy thrilled', 'whisper talk shout', 'walk jog sprint', 'nibble eat devour', 'damp wet soaked', 'dislike hate despise',
    'sip drink gulp', 'small tiny microscopic', 'upset angry furious', 'nervous scared terrified', 'good great fantastic', 'drizzle rain downpour', 'breeze wind gale']
    .forEach(s => s.split(' ').forEach((w, i) => { STRENGTH[w] = i + 1; }));
  V['g5-shades'] = q => q.items.map(text).every((w, i, a) => STRENGTH[w] && (i === 0 || STRENGTH[w] > STRENGTH[a[i - 1]])) ? '' : 'the words are not weakest to strongest';
  V['g5-strongest'] = (q, m) => { const s = q.tiles.map(text).map(w => STRENGTH[w]), want = m.weak ? Math.min(...s) : Math.max(...s); return STRENGTH[mk(q)] === want && text(q.q).includes(m.weak ? 'weakest' : 'strongest') ? '' : 'expected the ' + (m.weak ? 'weakest' : 'strongest'); };
  V['g5-shade-tf'] = (q, m) => (STRENGTH[m.a] > STRENGTH[m.b]) === q.answer ? '' : 'true/false is wrong for ' + m.a + ' and ' + m.b;
  /* the word that fits each gap sentence, keyed by words of the sentence */
  const FIT = { '38 degrees': 'scorching', 'spring air': 'warm', 'minus 30': 'freezing', 'light sweater': 'cool', 'asleep': 'whisper', 'windy field': 'shout', 'ten seconds': 'sprint',
    'tiny corner': 'nibble', 'whole pizza': 'devour', 'morning dew': 'damp', 'head to toe': 'soaked', 'first prize': 'thrilled', 'microscope': 'microscopic', 'in seconds': 'gulp',
    'on purpose': 'furious', 'right past her tent': 'terrified', 'flooded the street': 'downpour', 'kept playing': 'drizzle', 'roof off': 'gale', 'curtains': 'breeze' };
  V['g5-shade-fit'] = q => { const s = text(q.fig), k = Object.keys(FIT).find(x => s.includes(x)); return k && mk(q) === FIT[k] ? '' : 'expected the word that fits ' + s; };
  /* more than one meaning: the meaning that fits, keyed by words of the sentence */
  const HERE = { 'of the river': 'the land beside a river', 'her pay': 'a place that keeps money', 'downstream': 'moving water', 'news on': 'happening now', 'weigh it': 'a tool for weighing',
    'on the trout': "a thin plate on a fish's skin", 'the tent': 'set up', 'to the batter': 'throw a ball', 'of data': 'facts set out in rows and columns', 'for dinner': 'furniture you eat at',
    'peels off': 'the outer covering of a tree', 'mail carrier': 'the sound a dog makes', 'backpack': 'not heavy', 'from the lamp': 'brightness that helps you see', 'of the kingdom': 'a leader',
    'straight line': 'a tool for measuring', 'out of the cave': 'a flying animal', 'hit the ball': 'a stick for hitting a ball', 'on her finger': 'jewellery for a finger', 'phone': 'make a bell sound',
    'the mayor': 'news reporters', 'the button': 'push down', 'for everyone': 'the same for everyone', 'Ferris wheel': 'an outdoor show with rides and games', 'on the beach': 'a moving ridge of water',
    'bus window': 'a hello made with your hand', 'to drink': "an elephant's long nose", 'the bags': 'the storage space in a car' };
  const hereOf = s => { const k = Object.keys(HERE).find(x => s.includes(x)); return k ? HERE[k] : null; };
  V['g5-multi'] = q => { const w = hereOf(text(q.fig)); return w && mk(q) === w ? '' : 'expected ' + w; };
  V['g5-multi-tf'] = (q, m) => (hereOf(text(m.s)) === text(m.said)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g5-multi-which'] = (q, m) => { const ok = q.options.map(text).filter(o => hereOf(o) === text(m.mean)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence where ' + m.word + ' means ' + m.mean; };
  V['g5-multi-match'] = q => q.pairs.every(p => hereOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong meaning';
  /* subject words */
  const SUB = { perimeter: ['Math', 'the distance around a shape'], fraction: ['Math', 'a part of a whole'], angle: ['Math', 'the space between two lines that meet'], area: ['Math', 'the space a flat shape covers'],
    habitat: ['Science', 'the place where an animal lives'], erosion: ['Science', 'land worn away by water or wind'], evaporation: ['Science', 'water turning into a gas'], force: ['Science', 'a push or a pull'],
    treaty: ['Social Studies', 'a formal agreement between nations'], government: ['Social Studies', 'the people who lead and make laws'], citizen: ['Social Studies', 'a member of a country'],
    election: ['Social Studies', 'a time when people vote for leaders'], tempo: ['Music', 'how fast music is played'], rhythm: ['Music', 'a pattern of beats'],
    canvas: ['Art', 'a cloth that artists paint on'], sketch: ['Art', 'a quick, rough drawing'] };
  const GAP = { 'four sides': 'perimeter', 'One half': 'fraction', 'corner of a page': 'angle', 'of the rug': 'area', 'for a frog': 'habitat', 'of the cliffs': 'erosion', 'dried up': 'evaporation',
    'pull the nail': 'force', 'share the land': 'treaty', 'new law': 'government', 'vote at 18': 'citizen', 'new mayor': 'election', 'slow': 'tempo', 'drum song': 'rhythm', 'on the frame': 'canvas', 'before you paint': 'sketch' };
  V['g5-subject-word'] = (q, m) => mk(q) === SUB[m.word][0] ? '' : 'expected ' + SUB[m.word][0];
  V['g5-subject-match'] = q => q.pairs.every(p => SUB[text(p[0])][1] === text(p[1])) ? '' : 'a word is matched wrong';
  V['g5-subject-gap'] = q => { const s = text(q.fig), k = Object.keys(GAP).find(x => s.includes(x)); return k && mk(q) === GAP[k] ? '' : 'expected the word for ' + s; };
  V['g5-subject-mean'] = (q, m) => mk(q) === SUB[m.word][1] && text(q.q).includes(SUB[m.word][0]) ? '' : 'expected ' + SUB[m.word][1];
})();
