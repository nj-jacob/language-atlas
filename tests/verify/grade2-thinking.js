/* Grade 2 answer checks: thinking about texts (grade2/chapters/thinking.js). Own key lists, and checks worked out from the text. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { 'table of contents': 'on which page', chart: 'rows and columns', icon: 'stands for something', heading: 'one part', caption: 'about a picture', label: 'names a part' };
  const TOPIC = { 'where frogs lay their eggs': 'Eggs', 'how tadpoles swim': 'Tadpoles', 'how frogs hop': 'Frogs on land', 'what frogs eat': 'Food', 'how frogs sleep in the cold': 'Winter' };
  const SIMILES = /\b(like|as \w+ as)\b/;
  const CONSONANCE = new Set(['Tap, tip, tap, it taps and drips.', 'Tick, tock, the clock ticks.', 'Six snakes slid past.', 'Pat the pup on the top.', 'Lily will fill a little pail.']);
  const VIVID = /hungry puppy gobbled|icy wind nipped|tiny robin|zoomed down/;
  const INFER = { 'How does Kai feel at the end?': ['happy', 'hugged it'], 'How does Kai feel when the string slips?': ['worried', 'slipped out of his hand'],
    'How does the narrator feel on Thursday?': ['excited', 'poked out of the soil'], 'How does the narrator feel about the plant at the end?': ['proud and curious', 'wait to see a bean'],
    'How does the narrator feel about the treat?': ['delighted', 'best treat ever'], 'How does the uncle feel about making syrup?': ['proud of the family way', 'for a long time'] };
  const BOTH = new Set(['It swims on lakes.', 'It flies south in the fall.']), GOOSE = new Set(['It eats grass.', 'It honks loudly.']), LOON = new Set(['It dives for fish.', 'It has red eyes.']);
  const cards = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return [...d.querySelectorAll('.psg')].map(p => [...p.querySelectorAll('p')].map(n => text(n.innerHTML))); };

  V['g2-feature'] = (q, m) => mk(q).includes(JOB[m.f]) && q.options.map(text).filter(o => o.includes(JOB[m.f])).length === 1 ? '' : 'expected the job of a ' + m.f;
  V['g2-match-features'] = q => q.pairs.every(p => text(p[1]).includes(JOB[text(p[0])])) ? '' : 'a feature is matched to the wrong job';
  V['g2-page'] = (q, m) => { const row = cards(q)[0].find(l => l.startsWith(TOPIC[m.topic] + ' .')); return row && row.endsWith(mk(q)) ? '' : 'expected the page for ' + TOPIC[m.topic]; };
  V['g2-chart'] = (q, m) => { const row = cards(q)[0].map(l => l.split('|').map(x => x.trim())).find(r => r[0] === m.pet); return row && mk(q) === row[1] ? '' : 'expected the legs for ' + m.pet; };
  V['g2-journal'] = q => /^by days/.test(mk(q)) ? '' : 'a journal goes by days';
  V['g2-simile'] = q => { const ok = q.options.map(text).filter(o => SIMILES.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the simile'; };
  V['g2-simile-what'] = (q, m) => { const after = m.s.replace(/\.$/, '').split(/ like | as \w+ as /)[1]; return mk(q) === after ? '' : 'expected ' + after; };
  V['g2-consonance'] = q => { const ok = q.options.map(text).filter(o => CONSONANCE.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the line with consonance'; };
  V['g2-picture'] = q => VIVID.test(mk(q)) && q.options.map(text).filter(o => VIVID.test(o)).length === 1 ? '' : 'expected the sentence with strong words';
  V['g2-pattern'] = q => { const all = cards(q)[0].join(' ').toLowerCase().replace(/[,.!]/g, '').split(' '), n = w => all.filter(x => x === w).length, w = mk(q).toLowerCase(), most = Math.max(...q.tiles.map(t => n(text(t).toLowerCase())));
    return n(w) >= 3 && n(w) === most && q.tiles.map(text).filter(t => n(t.toLowerCase()) === most).length === 1 ? '' : 'the word that repeats most is not the one marked'; };
  V['g2-infer'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q) === k[0] && text(q.fig).includes(k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g2-evidence'] = (q, m) => { const k = INFER[text(m.q)]; return k && mk(q).includes(k[1]) ? '' : 'expected the words "' + (k && k[1]) + '"'; };
  V['g2-compare-both'] = q => { const c = cards(q), ok = q.options.map(text).filter(o => c.length === 2 && c.every(x => x.includes(o)) && BOTH.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence in both cards'; };
  V['g2-contrast'] = (q, m) => mk(q) === (GOOSE.has(m.s) ? 'Canada goose' : LOON.has(m.s) ? 'Loon' : 'both') ? '' : 'the sentence belongs to another card';
  V['g2-perspective'] = q => mk(q) === 'The schoolyard needs a bench.' && H.has(q.fig, 'Please put a bench') ? '' : 'expected what Amara asks for';
  V['g2-reason'] = q => /tired at recess/.test(mk(q)) ? '' : 'expected the sentence that gives a reason';
})();
