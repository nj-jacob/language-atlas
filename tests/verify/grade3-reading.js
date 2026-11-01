/* Grade 3 answer checks: reading for meaning (grade3/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where events come in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: facts { question: [answer, words in the sentence that answers it] }, the main idea and a detail (words from each),
     a prediction and its clue, and its kind */
  const KEY = {
    'The Lost Mitten': { kind: 'story', facts: { 'Where did they find the mitten?': ['on top of the slide', 'sat a small'], 'Who lost a mitten?': ['Leila', 'is gone'], 'What colour was the mitten?': ['red', 'red mitten'] },
      main: ['Leila loses her mitten', 'footprints made a long trail'], predict: ['follow the footprints', 'footprints made a long trail'] },
    'Busy Beavers': { kind: 'information', facts: { "What is a beaver's home called?": ['a lodge', 'homes called'], "What keeps a beaver's teeth short?": ['chewing wood', 'keeps them short'], 'Where do beavers store branches?': ['under the water', 'store branches'] },
      main: ['special ways to build', 'never stop growing'] },
    'My First Canoe Trip': { kind: 'story', facts: { 'Who went on the trip with the narrator?': ['an aunt', 'trip with my aunt'], 'Where did the narrator sit?': ['at the front', 'I sat'] },
      main: ['learns to paddle', 'very still'], predict: ['go canoeing again', 'wait to go again'] },
    'Night at the Lake': { kind: 'poem' },
    'How to Make a Pine Cone Bird Feeder': { kind: 'instructions', facts: { 'What do you roll the cone in?': ['birdseed', 'Roll the'] } },
    'A Letter to the Mayor': { kind: 'letter' },
    'Maple Syrup': { kind: 'information', facts: { 'Who were the first to make maple syrup?': ['First Nations people', 'first to make'], 'What makes the sap flow?': ['warm days and cold nights', 'This makes sap'] },
      main: ['boiling sap', 'boiled for a long time'] },
    'The Runaway Kite': { kind: 'story', facts: { 'What did Tala paint on her kite?': ['a big orange sun', 'painted a big'], 'Where did the kite get stuck?': ['in a tree', 'got stuck'], 'Who got the kite down?': ['her brother Omar', 'passed it down'] },
      main: ['loses her new kite', 'painted a sun'], predict: ['chase after the kite', 'slipped out of her hand'] },
    'Snowshoe Hares': { kind: 'information', facts: { "What colour is the hare's coat in winter?": ['white', 'it grows a white'], 'What helps the hare hop on deep snow?': ['its large back feet', 'hop on top of deep snow'], "What colour is the hare's coat in summer?": ['brown', 'brown coat'] },
      main: ['change colour and have big feet', 'brown coat in summer'] },
    'How to Plant a Bean Seed': { kind: 'instructions', facts: { 'Where should you put the cup?': ['in a sunny window', 'Set the cup'], 'How many holes do you poke in the cup?': ['three', 'Poke three'], 'What do you fill the cup with?': ['soil', 'Fill the cup'] },
      main: ['how to plant a bean seed', 'three holes'] },
    'Rain on the Roof': { kind: 'poem', facts: { 'What sound does the rain make?': ['tap, tap, tap', 'on the roof at night'], 'What shines like glass in the morning?': ['puddles', 'By morning'] },
      main: ['listens to the rain at night', 'Worms wiggle'] },
    'Thank You, Coach Ana': { kind: 'letter', facts: { 'Who is the letter to?': ['Coach Ana', 'Dear'], 'What did Coach Ana teach Noor?': ['how to pass the ball', 'showed me how'], 'What does Noor think the team should do?': ['play one more game', 'I think'] },
      main: ['thanks Coach Ana', 'inside of the foot'] },
    'My Library Card': { kind: 'story', facts: { 'What colour is the library card?': ['blue', 'was blue'], 'How many books about space did the narrator pick?': ['three', 'I picked'], 'How did the narrator carry the books home?': ['in a backpack', 'I carried'] },
      main: ['first library card', 'white letters'], predict: ['start reading', 'could not wait to start reading'] },
    'How to Make a Snow Angel': { kind: 'instructions', facts: { 'How do you lie in the snow?': ['on your back', 'Lie down'], 'What do you need?': ['fresh snow and warm clothes', 'You need'], 'Where should you make it?': ['a flat place with deep snow', 'Find a flat'] },
      main: ['how to make a snow angel', 'Lie down on your back'] },
    'The Snow Fort': { kind: 'story', facts: { 'What did Theo use to make the door?': ['a shovel', 'used a shovel'], 'What did they use for a roof?': ['an old blue sled', 'found an old'], 'Why was the snow perfect for packing?': ['It was wet and sticky.', 'perfect for packing'], 'What did they drink inside the fort?': ['hot chocolate', 'crawled inside'] },
      main: ['build a snow fort', 'mittens were soaked'], predict: ['something to use as a roof', 'We need a roof'] },
    'Canada Geese': { kind: 'information', facts: { 'Why do many geese fly south in the fall?': ['to find food and open water', 'In the fall'], 'What shape do geese make when they fly?': ['a V', 'like the letter'], 'What are baby geese called?': ['goslings', 'Baby geese'], 'Where do geese build their nests?': ['on the ground near water', 'near ponds and lakes'] },
      main: ['come back in the spring to raise', 'swim the day after'] },
    'The Three Sisters': { kind: 'information', facts: { 'What do the beans climb?': ['the corn stalks', 'like a ladder'], 'What do the squash leaves do?': ['shade the soil', 'Its leaves shade'], 'Who planted the Three Sisters long ago?': ['Haudenosaunee farmers', 'Long ago'] },
      main: ['help each other', 'tall and straight'] },
    'The Ferry Ride': { kind: 'story', facts: { 'Who went on the ferry with the narrator?': ['Grandma', 'took the ferry'], 'What did the narrator do when the horn blew?': ['covered their ears', 'loud blast'], 'What did Grandma rent?': ['a bike with two seats', 'two seats'], 'What flew beside the ferry?': ['gulls', 'looking for crumbs'] },
      main: ['first ferry ride', 'look for crumbs'], predict: ['explore the island', 'In front of us, the island'] },
    'The Mighty Moose': { kind: 'information', facts: { 'Which moose grow antlers?': ['only the males', 'grow antlers'], 'What helps moose walk through deep snow?': ['their long legs', 'long legs'], 'Where do moose find plants in summer?': ['under the water in lakes', 'In summer'] },
      main: ['find food and stay warm', 'grow antlers'] },
    'The Big Save': { kind: 'story', facts: { 'What is the name of the team?': ['the Lakeside Loons', 'I was the goalie'], 'What was the score near the end?': ['2 to 2', 'last minute'], 'How did the narrator stop the puck?': ['with a glove', 'threw up my glove'] },
      main: ['makes a big save', 'banged their sticks'], predict: ['try to stop the puck', 'watched the puck'] },
    'The Northern Lights': { kind: 'information', facts: { 'What colour are the northern lights most often?': ['green', 'often green'], 'Where are the lights easiest to see?': ['in the far north', 'Yukon and Nunavut'], 'What is a tip for seeing them?': ['go far from city lights', 'clear night'] },
      main: ['colourful lights in the night sky', 'can be pink'] },
    'Keep the Splash Pad Open': { kind: 'letter', facts: { 'Who is the letter to?': ['Councillor Tremblay', 'Dear'], 'What does Jayden want?': ['to keep the splash pad open', 'Please keep it open.'], 'Where is the splash pad?': ['in Riverside Park', 'might close'] },
      main: ['keep the splash pad open', 'make new friends'] },
    'The Bounce Test': { kind: 'story', facts: { 'Which ball bounced the highest?': ['the rubber ball', 'highest every time'], 'How many times did they test the balls?': ['three times', 'to be sure'], 'What did Hana drop the balls from?': ['the top of a metre stick', 'Hana dropped'] },
      main: ['test which ball bounces highest', 'bounced the lowest'], predict: ['find out which ball bounces highest', 'which ball bounces highest'] }
  };
  const PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear an opinion', poem: 'to enjoy a poem' };
  const CLUES = { letter: /Dear/, instructions: /numbered steps/, information: /headings and facts/, poem: /short lines/, story: /characters/ };
  const KINDWORD = { 'a story': 'story', 'an information text': 'information', instructions: 'instructions', 'a letter': 'letter', 'a poem': 'poem' };
  /* each problem while reading and the fix that solves it */
  const FIXES = { 'A sentence does not make sense.': 'Go back and read it again, slowly.', 'You cannot picture what is happening.': 'Make a picture in your head.',
    'You meet a word you do not know.': 'Read the rest of the sentence for clues.', 'You do not know what a part is about.': 'Look at the heading and the pictures.',
    'You wonder why a character did something.': 'Ask a question, then read on to find out.' };
  const GOOD = Object.values(FIXES);
  /* read the passage card back out of the question's picture: its title, number of headings and sentences */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const ps = p.querySelectorAll('.ps'), lines = ps.length ? [...ps].map(x => text(x.innerHTML)) : [...p.querySelectorAll('p')].map(x => text(x.innerHTML));
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: p.querySelectorAll('.psh').length, lines, all: lines.join(' ') }; };
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'information' : (KEY[c.title] || {}).kind === 'poem' ? 'poem' : 'story';
  /* first person when the narrator says I or my outside speech marks */
  const povOf = c => /\b(I|my|me)\b/.test(c.all.replace(/“[^”]*”/g, '')) ? 'first' : 'third';
  const key = (m, f) => (KEY[m.t] || {})[f];
  const want = (m) => (key(m, 'facts') || {})[text(m.q)];
  /* the sentence the child tapped, and how many sentences hold some words */
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const quoted = s => (text(s).match(/“([^”]+)”/) || [, ''])[1];
  const tfWhy = (q, want0) => q.why && q.why.answer === (want0 ? 0 : 1);

  /* find it in the text */
  V['g3-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] ? '' : 'expected ' + (w && w[0]); };
  V['g3-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g3-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g3-fact-tf'] = (q, m) => { const w = want(m), said = text(q.q).match(/says: (.+)\.$/)[1], right = !!w && said === w[0]; return w && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* the main idea */
  V['g3-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[0]) ? '' : 'expected the option about "' + (k && k[0]) + '"'; };
  V['g3-detail'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[1]) ? '' : 'expected the detail "' + (k && k[1]) + '"'; };
  V['g3-best-title'] = q => { const c = card(q), fits = Object.keys(KEY).filter(t => KEY[t].facts && Object.values(KEY[t].facts).every(f => c.all.includes(f[1])));
    return fits.length === 1 && mk(q) === fits[0] ? '' : 'expected the title ' + fits.join(' or '); };
  V['g3-main-tf'] = (q, m) => { const k = key(m, 'main'), d = document.createElement('div'); d.innerHTML = q.fig; const said = text(d.querySelector('.sent').innerHTML), right = !!k && said.includes(k[0]);
    return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* in order: where each event comes in the passage */
  V['g3-order'] = q => { const c = card(q), at = q.items.map(i => c.all.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g3-first-last'] = q => { const c = card(q), pos = q.tiles.map(t => c.all.indexOf(text(t).replace(/[“”]/g, ''))), first = /first/.test(text(q.q));
    const best = first ? Math.min(...pos) : Math.max(...pos); return pos.every(p => p >= 0) && pos[q.answer] === best ? '' : 'expected the ' + (first ? 'first' : 'last') + ' event'; };
  V['g3-after'] = q => { const c = card(q), p0 = c.all.indexOf(quoted(q.q)), pos = q.options.map(o => c.all.indexOf(text(o).replace(/[“”]/g, '')));
    const later = pos.filter(p => p > p0), next = later.length ? Math.min(...later) : -2; return p0 >= 0 && pos.every(p => p >= 0) && pos[q.answer] === next ? '' : 'expected the event that comes next'; };
  V['g3-map'] = q => { const c = card(q), d = document.createElement('div'); d.innerHTML = q.fig; const li = [...d.querySelectorAll('.wchain li')].map(x => text(x.innerHTML).replace(/[“”]/g, ''));
    const a = c.all.indexOf(li[0]), b = c.all.indexOf(li[2]), fits = q.options.map(o => { const p = c.all.indexOf(text(o).replace(/[“”]/g, '')); return p > a && p < b; });
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the event between the two boxes'; };
  /* predict */
  V['g3-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.all.includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g3-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[1]) && c.all.includes(mk(q)) ? '' : 'expected the clue "' + (k && k[1]) + '"'; };
  V['g3-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(q.q).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g3-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  /* fix it when it does not make sense */
  V['g3-fix-up'] = q => H.sameSet(q.options.map((o, i) => GOOD.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked';
  V['g3-which-fix'] = q => { const p = text(q.q).replace(/^Problem: /, '').replace(/ What could you do\?$/, ''); return FIXES[p] && mk(q) === FIXES[p] ? '' : 'expected ' + FIXES[p]; };
  V['g3-match-fix'] = q => q.pairs.every(p => FIXES[text(p[0])] === text(p[1])) ? '' : 'a problem is matched to the wrong fix';
  V['g3-fix-tf'] = q => { const said = text(q.fig), good = GOOD.includes(said); return q.answer === good && tfWhy(q, good) ? '' : 'expected ' + good; };
  /* why am I reading this? */
  V['g3-purpose'] = q => { const c = card(q); return mk(q) === PURPOSE[kindOf(c)] ? '' : 'expected ' + PURPOSE[kindOf(c)]; };
  V['g3-which-text'] = q => { const w = text(q.q).match(/You want (.+)\. Which/)[1], fits = q.tiles.map(t => PURPOSE[(KEY[text(t)] || {}).kind] === w);
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text you read ' + w; };
  V['g3-match-why-read'] = q => q.pairs.every(p => PURPOSE[(KEY[text(p[0])] || {}).kind] === text(p[1])) ? '' : 'a text is matched to the wrong reason';
  V['g3-purpose-tf'] = q => { const said = text(q.q).match(/read this (.+)\.$/)[1], right = said === PURPOSE[kindOf(card(q))]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* kinds of texts */
  V['g3-form'] = q => { const c = card(q); return mk(q) === kindOf(c) ? '' : 'expected ' + kindOf(c); };
  V['g3-form-clue'] = q => { const k = kindOf(card(q)); return CLUES[k].test(mk(q)) && q.options.filter(o => CLUES[k].test(text(o))).length === 1 ? '' : 'expected the clue for ' + k; };
  V['g3-kind-tf'] = q => { const k = kindOf(card(q)), said = KINDWORD[text(q.q).match(/this is (.+)\.$/)[1]], right = said === k, why = text(q.why.options[q.why.answer]);
    return q.answer === right && CLUES[k].test(why) ? '' : 'expected ' + right + ' because of the clue for ' + k; };
  V['g3-match-form'] = q => q.pairs.every(p => (KEY[text(p[0])] || {}).kind === text(p[1])) ? '' : 'a title is matched to the wrong kind';
  /* who is telling the story? */
  V['g3-narrator'] = q => { const c = card(q), w = povOf(c) === 'first' ? 0 : 1; return q.answer === w && /first person/.test(text(q.tiles[0])) ? '' : 'expected ' + povOf(c) + ' person'; };
  V['g3-narrator-word'] = q => { const c = card(q), p = povOf(c), w = mk(q), all = c.all.replace(/“[^”]*”/g, ''); return (p === 'first' ? w === 'I' : /^(They|He|She)$/.test(w)) && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected a ' + p + '-person word from the story'; };
  V['g3-narrator-tf'] = q => { const p = povOf(card(q)), claimsIn = /someone in the story/.test(text(q.q)), right = claimsIn === (p === 'first');
    return q.answer === right && q.why.answer === (p === 'first' ? 0 : 1) ? '' : 'expected ' + right + ' (' + p + ' person)'; };
  V['g3-first-line'] = q => { const first = q.options.map(o => /\b(I|my)\b/.test(text(o).replace(/“[^”]*”/g, ''))); return first.filter(Boolean).length === 1 && first[q.answer] ? '' : 'expected the one sentence with I or my'; };
})();
