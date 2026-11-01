/* Grade 8 answer checks: reading strategies (grade8/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and checks
   against the passage on screen where it can: the answer's evidence must be in the passage that is shown. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: facts { question: [answer, words that prove it] }, ties { word: what it points to }, the prediction and its clue,
     predictions made part way and whether the text confirms them, words from the best summary and from the detail, kind, and tags */
  const KEY = {
    'The Last Ferry': { kind: 'story', tags: 'story third water',
      facts: { 'Who is waiting on the island?': ['her grandmother', 'grandmother waiting'], 'What was happening when Amira reached the bottom of the hill?': ['the ramp was rising', 'already rising'] },
      ties: { She: 'Amira', his: 'the deckhand' }, predict: ['meet her grandmother', 'grandmother waiting on the island'],
      check: { 'Amira will miss the ferry.': 'refuted', 'The deckhand will ignore Amira.': 'refuted' }, summary: ['races to catch', 'grey shawl'] },
    Breakup: { kind: 'story', tags: 'story third water',
      facts: { 'What is Mr. Tremblay worried about?': ['his barn', 'about his barn'], 'Where has the ice jammed?': ['under the old bridge', 'under the old bridge'] },
      ties: { them: 'Mr. Tremblay and Josée', his: 'Mr. Tremblay' }, predict: ['flood the land', 'rising quickly'],
      check: { 'Something will make a flood more likely.': 'confirmed' }, summary: ['hidden ice jam', 'like thunder'] },
    'The Calmest Player on the Team': { kind: 'story', tags: 'story first sport',
      facts: { 'What did the narrator kick?': ['a water bottle', 'water bottle'], 'Where did the narrator spend the second half?': ['on the bench', 'on the bench'] },
      ties: { he: 'the referee' }, check: { 'The narrator will stay calm all game.': 'refuted' }, summary: ['without seeing it', 'new glasses'] },
    'A Garden on the Roof': { kind: 'information', tags: 'info problem',
      facts: { 'How big is the garden?': ['about 400 square metres', '400 square metres'], 'Who gets the vegetables?': ['a local food bank', 'food bank'] },
      ties: { which: 'the vegetables' }, check: { 'The text will describe a solution to the problem.': 'confirmed' }, summary: ['solved the problem', 'hotter than the air'] },
    'Letter to the Editor: Keep the Library Open': { kind: 'opinion', tags: 'opinion problem',
      facts: { 'How many evening visits did the library have last year?': ['more than 12 000', '12 000 visits'] }, ties: { This: 'closing the library at 6 p.m.' } },
    'Introducing the SmartSpoon': { kind: 'satire' },
    Portage: { kind: 'poem' },
    'Winter Roads': { kind: 'information', tags: 'info cause winter water indigenous',
      facts: { 'What do trucks bring in on winter roads?': ['fuel, food and building supplies', 'fuel, food and building'], 'What happens when winters are warmer?': ['The ice forms later and melts sooner.', 'melts sooner'] },
      check: { 'Warmer winters will cause problems for the roads.': 'confirmed' }, summary: ['shortening the season', 'across frozen lakes'] },
    'Storm Hours': { kind: 'story', tags: 'story third winter indigenous',
      facts: { 'Why was the aunt not at the station?': ['She was stuck at home across town.', 'stuck at home'], 'What did the elder on the hill need?': ['someone to check her stove', 'check her stove'],
        'What did Jonah play between the messages?': ['a song', 'played a song'], "Who fixed the elder's stove?": ['a neighbour', 'neighbour had walked'] },
      ties: { she: 'their aunt', She: 'Elisapee', listeners: 'people listening to the station' }, predict: ['news about the elder', 'elder on the hill'],
      check: { 'Elisapee will stay nervous for the whole show.': 'refuted', 'Someone will help the elder on the hill.': 'confirmed' }, summary: ['run the community radio', 'open late'] },
    'The Return of the Lake Sturgeon': { kind: 'information', tags: 'info problem water indigenous',
      facts: { 'How long can a lake sturgeon live?': ['more than 100 years', 'more than 100 years'], "What covers a sturgeon's body instead of scales?": ['rows of hard, bony plates', 'bony plates'],
        'What did the dams block?': ['the rocky places where sturgeon lay their eggs', 'dams blocked'], 'How old may a sturgeon be before it spawns?': ['about 20 years old', '20 years old'] },
      ties: { it: 'the sturgeon', they: 'sturgeon', Others: 'other communities' }, predict: ['helping the sturgeon', 'recover quickly'],
      check: { 'The text will describe ways to help the sturgeon.': 'confirmed', 'The text will say sturgeon have vanished from every river.': 'refuted' }, summary: ['working together to bring them back', 'instead of scales'] },
    Tryout: { kind: 'story', tags: 'story first sport',
      facts: { 'How many spots were on the team?': ['twelve', 'twelve spots'], 'What went wrong in the passing drill?': ["The narrator's throws drifted to the left.", 'drifting to the left'],
        'Who broke away toward the net?': ['Marcus', 'named Marcus'], 'What kind of players does the coach want?': ['players who never quit on a play', 'never quit'] },
      ties: { her: 'Coach Dubois', him: 'Marcus', mine: "the narrator's name" }, predict: ['make the team', 'never quit on a play'],
      check: { 'The narrator will make every pass perfectly.': 'refuted', 'The narrator will make an important play in the scrimmage.': 'confirmed' }, summary: ['key defensive play', 'drifted to the left'] },
    'The Highest Tides on Earth': { kind: 'information', tags: 'info cause water',
      facts: { 'How much can the tide rise and fall?': ['as much as 16 metres', '16 metres'], 'What mainly causes tides?': ['the pull of the Moon', 'pull of the Moon'],
        'What shape is the Bay of Fundy?': ['like a funnel', 'like a funnel'], 'What can visitors do at low tide?': ['walk on the ocean floor', 'walk on the ocean floor'] },
      ties: { this: 'the pull of the Moon', them: 'the Hopewell Rocks', which: 'the water rocking back and forth' }, predict: ['why the tides are so high', 'No other tides'],
      check: { 'The text will explain what causes the high tides.': 'confirmed', 'The text will say the tides are caused by wind.': 'refuted' }, summary: ['funnel shape and rhythm', 'paddle kayaks'] },
    'Opinion: Lakeview Needs a Skate Park': { kind: 'opinion', tags: 'opinion problem sport',
      facts: { 'Where do the students skateboard now?': ['in the parking lot behind the arena', 'behind the arena'], 'How much did the Port Ellis skate park cost?': ['about $250 000', '$250 000'],
        'What happened after the Port Ellis park opened?': ['Calls about skateboarders went down.', 'went down'], 'When will council vote?': ['on March 14', 'March 14'] },
      ties: { their: "Port Ellis's", they: 'young people' }, predict: ['answer this worry', 'too expensive'],
      check: { 'The writer will ask readers to do something.': 'confirmed', 'The writer will decide the park is a bad idea.': 'refuted' }, summary: ['answers worries', 'nearly hit'] },
    'Frost Night': { kind: 'story', tags: 'story third',
      facts: { 'What were the cherry trees doing?': ['blooming', 'full bloom'], 'When did Desmond start the wind machines?': ['at midnight', 'at midnight'],
        'What did the thermometer read at three?': ['minus one', 'minus one'], 'What trapped the warmth?': ['the clouds', 'clouds trapped'] },
      ties: { He: 'Desmond', them: 'Claire and Desmond', it: 'the thermometer' }, predict: ['keep the orchard warm', 'clouding over'],
      check: { 'Every blossom will be killed by the frost.': 'refuted', 'Someone will try to protect the trees.': 'confirmed' }, summary: ['clouds help save', 'eleven years'] },
    "Fix It, Don't Toss It": { kind: 'information', tags: 'info',
      facts: { 'Where did the first repair café open?': ['in the Netherlands', 'the Netherlands'], 'What is the goal, besides fixing the item?': ['to teach the owner how to do it', 'teach the owner'],
        'How long do many repairs take?': ['less than half an hour', 'half an hour'], 'What can teens do at a repair café?': ['sort parts, greet visitors or fix phones and bikes', 'sort parts'] },
      ties: { them: 'each visitor', this: 'the electronics and clothing Canadians throw away', one: 'repair café' }, summary: ['for free', 'in 2009'] }
  };
  const WHY = { story: 'to enjoy a story', information: 'to learn facts', opinion: 'to be persuaded', satire: 'to laugh and to think', poem: 'to enjoy a poem' };
  const CHOOSE = { 'to learn how northern communities get supplies': 'Winter Roads', 'to enjoy a story about a spring flood': 'Breakup', 'to understand an argument about library hours': 'Letter to the Editor: Keep the Library Open',
    'to laugh at the way gadgets are sold': 'Introducing the SmartSpoon', 'to learn how one school cooled its classrooms': 'A Garden on the Roof', 'to learn how a rare fish is being brought back': 'The Return of the Lake Sturgeon',
    'to find out why some tides are so high': 'The Highest Tides on Earth', 'to enjoy a story about a sports tryout': 'Tryout', 'to understand an argument for a skate park': 'Opinion: Lakeview Needs a Skate Park',
    'to learn how to keep broken things out of the garbage': "Fix It, Don't Toss It", 'to enjoy a story about saving a crop from frost': 'Frost Night', 'to enjoy a story set in a northern blizzard': 'Storm Hours',
    'to enjoy a short poem about carrying a canoe': 'Portage', 'to enjoy a story about catching a ferry': 'The Last Ferry' };
  /* each reading problem, by a word in it, and words from the strategy that fixes it */
  const FIX = { asphalt: 'glossary', waded: 'clues in the sentence', 'who is speaking': 'last speaker', 'who "they" means': 'noun it stands for', 'know nothing about': 'reliable reference',
    'main point': 'Ask yourself', 'first section': 'sum up each section', 'long sentence': 'smaller parts', 'picture how': 'picture of it' };
  const fixFor = p => { const k = Object.keys(FIX).find(k => p.replace(/[“”]/g, '"').includes(k)); return k && FIX[k]; };
  const GOOD = s => Object.values(FIX).some(f => s.includes(f));
  const TAGS = { 'It is a story.': 'story', 'It gives facts about a topic.': 'info', 'It argues for an opinion.': 'opinion', 'It is told by a character, in the first person.': 'first',
    'It is a story told in the third person.': 'third', 'It takes place in winter.': 'winter', 'A river, lake or ocean matters in it.': 'water', 'It includes First Nations or Inuit communities.': 'indigenous',
    'It involves a sport.': 'sport', 'It is organized as a problem and a solution.': 'problem', 'It explains causes and effects.': 'cause' };
  /* the shared idea of each pair of texts, by the first text */
  const SYNTH = { 'A Garden on the Roof': 'heat and a changing climate', 'The Last Ferry': 'water to build tension', 'Letter to the Editor: Keep the Library Open': 'Young people can help',
    'The Return of the Lake Sturgeon': 'harm a way of life', 'Storm Hours': 'stay connected', Tryout: 'under pressure', 'Opinion: Lakeview Needs a Skate Park': 'use evidence to persuade',
    'Frost Night': 'Weather and nature', "Fix It, Don't Toss It": 'reduce harm' };

  const key = (m, f, t) => (KEY[text(t || m.t)] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];
  const tagsOf = t => ((KEY[text(t)] || {}).tags || '').split(' ');
  /* the passage cards in a question's picture: title and sentences */
  const cards = q => { const d = document.createElement('div'); d.innerHTML = (q.pic || '') + (q.fig || ''); return [...d.querySelectorAll('.psg')].map(p => {
    const lines = [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML)); return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', lines, all: lines.join(' ') }; }); };
  const card = q => cards(q)[0] || { title: '', lines: [], all: '' };
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const s = d.querySelector('.sent'); return s ? text(s.innerHTML) : ''; };
  const hl = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const s = d.querySelector('mark.hl'); return s ? text(s.innerHTML) : ''; };
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);

  /* find it in the text */
  V['g8-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] && card(q).all.includes(w[1]) ? '' : 'expected ' + (w && w[0]); };
  V['g8-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g8-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g8-fact-tf'] = (q, m) => { const w = want(m), right = !!w && text(m.said) === w[0]; return w && q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  /* small words point back */
  V['g8-tie'] = (q, m) => { const r = (key(m, 'ties') || {})[m.w]; return r && mk(q) === text(r) && hl(q) === m.w ? '' : 'expected ' + r; };
  V['g8-tie-word'] = (q, m) => { const ties = key(m, 'ties') || {}, w = Object.keys(ties).find(k => text(ties[k]) === text(m.to));
    return w && mk(q) === w && sent(q).split(/[^\w']+/).includes(w) ? '' : 'expected the word ' + w; };
  V['g8-tie-tf'] = (q, m) => { const r = (key(m, 'ties') || {})[m.w], right = !!r && text(m.said) === text(r); return r && q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-tie-match'] = (q, m) => { const ties = key(m, 'ties') || {};
    return q.pairs.every(p => { const w = (p[0].match(/<b>([^<]+)<\/b>/) || [])[1]; return ties[w] && text(ties[w]) === text(p[1]); }) ? '' : 'a word is matched to the wrong thing'; };
  /* predict, then confirm or refute */
  V['g8-predict'] = (q, m) => { const k = key(m, 'predict'); return k && mk(q).includes(k[0]) && card(q).all.includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g8-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  V['g8-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(m.said).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-confirm'] = (q, m) => { const c = (key(m, 'check') || {})[text(m.p)]; return c && mk(q) === c && card(q).title === text(m.t) ? '' : 'expected ' + c; };
  /* fix it when you are lost */
  V['g8-fix'] = (q, m) => { const f = fixFor(text(m.p)), ok = q.options.map(text).filter(o => o.includes(f)); return f && ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the strategy with "' + f + '"'; };
  V['g8-match-fix'] = q => q.pairs.every(p => { const f = fixFor(text(p[0])); return f && text(p[1]).includes(f); }) ? '' : 'a problem is matched to the wrong strategy';
  V['g8-fix-tf'] = (q, m) => { const f = fixFor(text(m.p)), right = !!f && text(m.said).includes(f); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-fix-all'] = q => H.sameSet(q.options.map((o, i) => GOOD(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful strategies are not the ones marked';
  /* choose a text for a purpose */
  V['g8-choose-text'] = (q, m) => mk(q) === CHOOSE[m.purpose] ? '' : 'expected ' + CHOOSE[m.purpose];
  V['g8-purpose'] = (q, m) => { const k = key(m, 'kind'); return k && mk(q) === WHY[k] && card(q).title === text(m.t) ? '' : 'expected ' + WHY[k]; };
  V['g8-match-why-read'] = q => q.pairs.every(p => WHY[(KEY[text(p[0])] || {}).kind] === text(p[1])) ? '' : 'a text is matched to the wrong reason';
  V['g8-purpose-tf'] = (q, m) => { const right = CHOOSE[m.purpose] === card(q).title; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  /* summarize */
  V['g8-summary'] = (q, m) => { const s = key(m, 'summary'); return s && mk(q).includes(s[0]) ? '' : 'expected the summary of the whole text'; };
  V['g8-summary-tf'] = (q, m) => { const s = key(m, 'summary'), good = !!s && text(m.s).includes(s[0]); return s && q.answer === (m.says === good) && why(q, good) ? '' : 'true/false is wrong'; };
  V['g8-roof'] = (q, m) => { const s = key(m, 'summary'); return s && mk(q).includes(s[0]) ? '' : 'expected the summary that covers every detail'; };
  V['g8-detail'] = (q, m) => { const s = key(m, 'summary'); return s && mk(q).includes(s[1]) ? '' : 'expected the detail "' + (s && s[1]) + '"'; };
  /* combine two texts */
  V['g8-synth'] = (q, m) => mk(q).includes(SYNTH[text(m.a)]) && cards(q).length === 2 ? '' : 'expected the shared idea';
  V['g8-synth-tf'] = (q, m) => { const right = text(m.said).includes(SYNTH[text(m.a)]); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-both'] = (q, m) => { const a = tagsOf(m.a), b = tagsOf(m.b), fits = q.options.map(o => { const g = TAGS[text(o)]; return a.includes(g) && b.includes(g); });
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the one thing true of both'; };
  V['g8-only-one'] = (q, m) => { const a = tagsOf(m.a), b = tagsOf(m.b), fits = q.options.map(o => { const g = TAGS[text(o)]; return a.includes(g) && !b.includes(g); });
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the one thing true of the first text only'; };
})();
