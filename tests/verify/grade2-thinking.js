/* Grade 2 answer checks: thinking about texts (grade2/chapters/thinking.js). Own key lists, and checks worked out from the text itself. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { 'table of contents': 'on which page', chart: 'rows and columns', icon: 'stands for something', heading: 'one part', caption: 'about a picture', label: 'names a part' };
  /* contents pages: what each topic question is looking for */
  const PART = { 'where frogs lay their eggs': 'Eggs', 'how tadpoles swim': 'Tadpoles', 'how frogs hop': 'Frogs on land', 'what frogs eat': 'Food', 'how frogs sleep in the cold': 'Winter',
    'the bee that lays the eggs': 'The queen', 'the bees that do the jobs': 'Worker bees', 'how nectar turns into honey': 'Making honey', 'why bees visit flowers': 'Flowers',
    'the star at the centre': 'The sun', 'the planet we live on': 'Earth', 'what goes around Earth': 'The moon', 'lights in the night sky': 'Stars' };
  const ICON = { listen: /^Listen/, write: /^Write/, talk: /^Talk/, read: /^Read/, think: /think/, lock: /private/ };
  const FITS = { goose: /goose/, canoe: /paddled/, bee: /bee/, fox: /fox/, ferry: /ferry/, moose: /moose/, book: /book/, hockey: /hockey/ };
  const PATTERN = { 'journal entry': 'day by day', instructions: 'step by step', information: 'topic by topic' };
  const KIND = { 'My Bean Plant': 'journal entry', 'My Camping Journal': 'journal entry', 'How to Plant a Seed': 'instructions', 'How to Get Ready for Bed': 'instructions',
    'How to Make a Fruit Salad': 'instructions', Loons: 'information', 'Red Foxes': 'information', Honeybees: 'information' };
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const VIVID = /hungry puppy gobbled|icy wind nipped|tiny robin|zoomed down|fluffy cat curled|Heavy rain drummed|Liam raced|thick and spicy|Red and orange leaves|wailed loudly/;
  const EXACT = new Set(['gobbled', 'tiptoed', 'shouted', 'dashed', 'peeked', 'zoomed', 'sipped', 'chopped']);
  /* each simile ending, and what it shares with the thing described */
  const LIKE = { 'tiny drums': 'loud', 'silver plates': 'shiny', 'a pillow': 'soft', 'the wind': 'fast', 'a mitten': 'small', apples: 'red', glass: 'shiny', feathers: 'soft', 'a mouse': 'quiet', 'a freezer': 'cold' };
  const SIMILE = /\b(like|as \w+ as)\b/;
  /* lines where a consonant sound comes back, and the sound */
  const SOUND = { 'Tap, tip, tap, it taps and drips.': 't', 'Tick, tock, the clock ticks.': 'k', 'Six snakes slid past.': 's', 'Pat the pup on the top.': 'p', 'Lily will fill a little pail.': 'l',
    'Sled, slide, slip, we zoom down the hill.': 's', 'Mmm, my mom makes muffins.': 'm', 'Bob the bear bumps a big bin.': 'b', 'Fuzzy fox, fluffy fur.': 'f', 'Dad dug deep in the dirt.': 'd' };
  /* feelings in the passages: the answer and the words that show it */
  const INFER = { 'How does Kai feel at the end?': ['happy', 'hugged it'], 'How does Kai feel when the string slips?': ['worried', 'slipped out of his hand'],
    'How does Mei feel about the puddle?': ['excited', 'ran and jumped'], 'How does her brother feel at the end?': ['happy', 'He laughed'],
    'How does the narrator feel on Thursday?': ['excited', 'poked out of the soil'], 'How does the narrator feel about the plant at the end?': ['proud and curious', 'wait to see a bean'],
    'How does the narrator feel about the treat?': ['delighted', 'best treat ever'], 'How does the uncle feel about making syrup?': ['proud of the family way', 'for a long time'],
    'How does Owen feel at the end?': ['proud and happy', 'grinned'], 'How does the team feel when Owen scores?': ['excited', 'cheered'],
    'How does Ms. Ali feel when Pepper is not at the door?': ['worried', 'looked everywhere'], 'How does Pepper feel when children read to her?': ['calm and happy', 'purred'],
    'How does the narrator feel on the top deck?': ['happy', 'I laughed'], 'How does the narrator feel about cars on a boat?': ['surprised', 'other cars'],
    'How does the narrator feel about making bannock together?': ['happy and close to Kokum', 'made it together'], 'How does Kokum feel about teaching the narrator?': ['proud to pass it on', 'same way'],
    'How does the narrator feel when the loon dives?': ['amazed', 'loon dive'] };
  const SHOW = { 'lip shook': 'sad', 'jumped up and down': 'excited', 'stomped': 'angry', 'hid behind': 'shy', 'yawned': 'tired', 'ear to ear': 'happy', 'hands shook': 'scared', 'stood tall': 'proud' };
  /* same and different: each card's own facts */
  const PAIRS = { 'Canada goose': ['It eats grass.', 'It honks loudly.'], Loon: ['It dives for fish.', 'It has red eyes in summer.'], Bee: ['It makes honey.', 'It can sting.'],
    Butterfly: ['It starts as a caterpillar.', 'It has big, bright wings.'], Cat: ['It purrs.', 'It climbs trees.'], Dog: ['It barks.', 'It fetches a ball.'] };
  const BOTH = new Set(['It swims on lakes.', 'It flies south in the fall.', 'It has six legs.', 'It visits flowers.', 'It has four legs.', 'It can be a pet.']);
  const owner = s => BOTH.has(s) ? 'both' : Object.keys(PAIRS).find(k => PAIRS[k].includes(s));
  /* letters and opinions: what each writer thinks, and their reasons */
  const VIEW = { 'A Bench for Our Yard': ['The schoolyard needs a bench.', /tired at recess|Grandpa Joe|sit and talk/], 'More Books, Please': ['The class needs more books about animals.', /love animals|more facts|science projects|take turns/] };
  const THINKS = { Noor: 'Winter is the best season.', Lucas: 'The town needs a dog park.', Hana: 'Recess should be longer.', Ethan: 'Kids should bike to school.', Sofia: 'The class should plant a garden.', Jayden: 'Libraries are great.' };

  const cards = q => { const d = document.createElement('div'); d.innerHTML = q.fig || q.pic || ''; return [...d.querySelectorAll('.psg')].map(p => ({
    title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: [...p.querySelectorAll('.psh')].map(h => text(h.innerHTML)),
    lines: [...p.querySelectorAll('.ps')].map(n => text(n.innerHTML)), paras: [...p.querySelectorAll('p')].map(n => text(n.innerHTML)) })); };
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const s = d.querySelector('.sent'); return s ? text(s.innerHTML) : ''; };
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const n = [...d.querySelectorAll('[data-hit]')].find(x => x.getAttribute('data-hit') === String(q.answer)); return n ? text(n.innerHTML) : ''; };
  const tfWhy = (q, yes) => q.why && q.why.answer === (yes ? 0 : 1);

  /* text features */
  V['g2-feature'] = (q, m) => mk(q).includes(JOB[m.f]) && q.options.map(text).filter(o => o.includes(JOB[m.f])).length === 1 ? '' : 'expected the job of a ' + m.f;
  V['g2-match-features'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  V['g2-page'] = (q, m) => { const row = cards(q)[0].lines.find(l => l.startsWith(PART[m.topic] + ' .')); return row && row.endsWith(mk(q)) ? '' : 'expected the page for ' + PART[m.topic]; };
  V['g2-chart'] = (q, m) => { const rows = cards(q)[0].lines.map(l => l.split('|').map(x => x.trim())), col = rows[0].indexOf(m.col), row = rows.find(r => r[0] === m.row);
    return col > 0 && row && mk(q) === row[col] && text(q.q).includes(m.row) ? '' : 'expected what the chart says under ' + m.col + ' for ' + m.row; };
  V['g2-icon'] = (q, m) => { const ok = q.options.map(text).filter(o => ICON[m.icon].test(o)); return ok.length === 1 && mk(q) === ok[0] && (q.fig || '').includes('wicon') ? '' : 'expected what the ' + m.icon + ' icon means'; };
  V['g2-picture-fits'] = q => { const d = document.createElement('div'); d.innerHTML = q.tiles[q.answer]; const pic = (d.querySelector('svg') || { getAttribute: () => '' }).getAttribute('aria-label');
    return FITS[pic] && FITS[pic].test(sent(q)) ? '' : 'the picture does not fit the sentence'; };
  /* text patterns */
  V['g2-text-pattern'] = q => { const c = cards(q)[0], k = KIND[c.title]; return k && mk(q) === PATTERN[k] ? '' : 'expected ' + PATTERN[k]; };
  V['g2-which-day'] = q => { const said = text(q.q).replace(/^On which day did this happen\? /, ''), d = document.createElement('div'); d.innerHTML = q.fig; let day = '', found = '';
    [...d.querySelector('.psg').children].forEach(n => { if (n.matches('.psh')) day = text(n.innerHTML); else if (n.matches('p') && text(n.innerHTML).includes(said)) found = day; });
    return found && mk(q) === found ? '' : 'the sentence is under ' + found; };
  V['g2-day-order'] = q => { const n = d => DAYS.indexOf(text(d).replace(/^Next /, '')) + (/^Next /.test(text(d)) ? 7 : 0); return q.items.every((d, i) => i === 0 || n(d) > n(q.items[i - 1])) ? '' : 'the days are not in order'; };
  V['g2-match-pattern'] = q => q.pairs.every(p => PATTERN[KIND[text(p[0])]] === text(p[1])) ? '' : 'a text is matched to the wrong order';
  /* words that paint a picture */
  V['g2-picture'] = q => VIVID.test(mk(q)) && q.options.map(text).filter(o => VIVID.test(o)).length === 1 ? '' : 'expected the sentence with strong words';
  V['g2-exact-word'] = q => EXACT.has(mk(q)) && q.tiles.map(text).filter(t => EXACT.has(t)).length === 1 ? '' : 'expected the exact word';
  V['g2-pattern'] = q => { const all = cards(q)[0].paras.join(' ').toLowerCase().replace(/[,.!]/g, '').split(' '), n = w => all.filter(x => x === w).length, w = mk(q).toLowerCase(), most = Math.max(...q.tiles.map(t => n(text(t).toLowerCase())));
    return n(w) >= 3 && n(w) === most && q.tiles.map(text).filter(t => n(t.toLowerCase()) === most).length === 1 ? '' : 'the word that repeats most is not the one marked'; };
  V['g2-picture-tf'] = q => { const vivid = VIVID.test(sent(q)); return q.answer === vivid && tfWhy(q, vivid) ? '' : 'expected ' + vivid; };
  /* similes */
  V['g2-simile'] = q => { const ok = q.options.map(text).filter(o => SIMILE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the simile'; };
  V['g2-simile-what'] = (q, m) => { const after = m.s.replace(/\.$/, '').split(/ like | as \w+ as /)[1]; return mk(q) === after ? '' : 'expected ' + after; };
  V['g2-simile-end'] = (q, m) => { const after = m.s.replace(/\.$/, '').split(/ like | as \w+ as /)[1], fit = q.tiles.map(text).filter(t => LIKE[t] === LIKE[after]);
    return mk(q) === after && fit.length === 1 ? '' : 'expected ' + after + ', and only one ending that fits'; };
  V['g2-simile-tf'] = q => { const yes = SIMILE.test(sent(q)); return q.answer === yes && tfWhy(q, yes) ? '' : 'expected ' + yes; };
  /* sounds that come back */
  V['g2-consonance'] = q => { const ok = q.options.map(text).filter(o => SOUND[o]); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line with consonance'; };
  V['g2-which-sound'] = (q, m) => { const line = m.s.toLowerCase(), n = l => line.split(l).length - 1; return mk(q) === SOUND[m.s] && n(mk(q)) >= 3 && q.tiles.map(text).filter(t => n(t) > 1).length === 1 ? '' : 'expected ' + SOUND[m.s]; };
  V['g2-sound-tf'] = q => { const yes = !!SOUND[sent(q)]; return q.answer === yes && tfWhy(q, yes) ? '' : 'expected ' + yes; };
  V['g2-sound-tap'] = q => SOUND[tapped(q)] ? '' : 'the tapped line has no sound that comes back';
  /* reading between the lines */
  V['g2-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[0] && text(q.fig).includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g2-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[1]) ? '' : 'expected the words "' + (k && k[1]) + '"'; };
  V['g2-infer-tap'] = (q, m) => { const k = INFER[text(m.q)]; return k && tapped(q).includes(k[1]) && text(q.q).includes(k[0]) ? '' : 'the tapped sentence does not show the feeling'; };
  V['g2-show-feeling'] = q => { const s = sent(q), k = Object.keys(SHOW).find(x => s.includes(x)); return k && mk(q) === SHOW[k] ? '' : 'expected ' + (k && SHOW[k]); };
  /* same and different */
  V['g2-compare-both'] = q => { const c = cards(q), ok = q.options.map(text).filter(o => c.length === 2 && c.every(x => x.paras.includes(o)) && BOTH.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence in both cards'; };
  V['g2-contrast'] = (q, m) => mk(q) === owner(m.s) ? '' : 'the sentence belongs to another card';
  V['g2-different'] = q => H.sameSet(q.options.map((o, i) => owner(text(o)) !== 'both' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the differences are not the ones marked';
  V['g2-sort-same'] = q => q.pairs.every(p => owner(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong card';
  /* what does the writer think? */
  V['g2-perspective'] = (q, m) => { const v = VIEW[text(m.t)]; return v && mk(q) === v[0] ? '' : 'expected what the writer thinks'; };
  V['g2-reason'] = (q, m) => { const v = VIEW[text(m.t)], ok = v ? q.options.map(text).filter(o => v[1].test(o)) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence that gives a reason'; };
  V['g2-opinion'] = (q, m) => mk(q) === THINKS[m.who] && sent(q).startsWith(m.who) ? '' : 'expected ' + THINKS[m.who];
  V['g2-opinion-tf'] = (q, m) => { const yes = text(m.said) === THINKS[m.who]; return q.answer === yes && tfWhy(q, yes) ? '' : 'expected ' + yes; };
})();
