/* Grade 1 answer checks: reading for meaning (grade1/chapters/reading.js).
   Comprehension answers come from a passage, so the checker keeps its own answer key (like a second marker), and works out
   what it can from the passage itself: where things are in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* per passage: its kind; facts { question: [answer, words in the sentence that answers it] }; the main idea and a detail
     (words from each); a prediction and its clue; what you might know; a connection and words from the part it is like;
     who else could tell it and words from what they would say */
  const KEY = {
    'Tala and the Kite': { kind: 'story', facts: { 'What colours was the kite?': ['red and yellow', 'It was red'], 'Who clapped?': ['Grandpa', 'and smiled'], 'Where did Tala run?': ['across the big field', 'She ran'] },
      main: ['Tala flies her new kite', 'field is big'], predict: ['fly up into the sky', 'big field'], know: 'Wind can lift', connect: ['I flew a kite', 'wind lifted'], other: ['Grandpa', 'watched Tala run'] },
    'From Egg to Frog': { kind: 'information', facts: { 'Where does a frog egg start?': ['in a pond', 'starts as a tiny'], 'What does a tadpole have?': ['a tail', 'swims like'] },
      main: ['grows from an egg', 'swims like a fish'], know: 'Frogs live near ponds', connect: ['I saw tadpoles', 'has a tail'] },
    'My Snowy Day': { kind: 'story', facts: { 'What did the narrator make?': ['a snow angel', 'I made'], 'What did the narrator eat?': ['hot soup', 'went inside'] },
      main: ['plays in the snow', 'soup was hot'], predict: ['go inside to get warm', 'cold and pink'], know: 'warm clothes in winter', connect: ['I made a snow angel', 'I made a snow'], other: ['A friend who came to play', 'We played in the snow'] },
    'How to Plant a Seed': { kind: 'instructions', facts: { 'What do you put in the pot first?': ['soil', '1. Fill'], 'Where do you put the pot?': ['in the sun', '4. Put'] }, main: ['how to plant a seed', 'little water'], know: 'Plants need water' },
    'Rain': { kind: 'poem' },
    'A Note to Grandma': { kind: 'letter', facts: { 'What colour is the scarf?': ['green', 'Thank you for'], 'How often does Arjun wear the scarf?': ['every day', 'I wear it'] } },
    'Paddling with Dad': { kind: 'story', facts: { 'Where did the narrator sit?': ['at the front', 'small paddle'], 'What bird did the narrator see?': ['a loon', 'Then I saw'], 'Who steered the canoe?': ['Dad', 'sat at the back'] },
      main: ['go out in a canoe', 'water was calm'], predict: ['paddle back to the dock', 'behind the trees'], know: 'small boat you paddle', connect: ['out in a boat', 'down to the lake'], other: ['Dad', 'I steered'] },
    'Canada Geese': { kind: 'information', facts: { 'What colour is the neck of a Canada goose?': ['black', 'white patch'], 'What shape do geese make when they fly?': ['a V', 'They fly in'], 'What are baby geese called?': ['goslings', 'Baby geese'], 'When do geese fly south?': ['in the fall', 'where it is warm'] },
      main: ['fly south in the fall and come back', 'white patch'], know: 'fly south for the winter', connect: ['geese flying over', 'shape of'] },
    'A Snow House': { kind: 'story', facts: { 'Where does Pauloosie live?': ['in Nunavut', 'Pauloosie lives'], 'What did Grandfather cut the blocks with?': ['a long knife', 'hard snow'], 'How did Pauloosie stack the blocks?': ['in a circle', 'helped stack'] },
      main: ['build an iglu together', 'walls got higher'], predict: ['finish the iglu', 'higher and higher'], know: 'packed hard', connect: ['built something with my grandpa', 'made it together'], other: ['His grandfather', 'snow blocks'] },
    "Ava's First Game": { kind: 'story', facts: { 'What did Ava put on?': ['her skates and her helmet', 'Ava put on'], 'Where did the puck go?': ['into the net', 'The puck went'], 'What did her team do?': ['cheered', 'banged their sticks'] },
      main: ['first hockey game and scores', 'wore a helmet'], predict: ['go into the net', 'Ava skated'], know: 'played on ice', connect: ['butterflies before my swim', 'tummy felt'], other: ['Someone on her team', 'saw Ava score'] },
    'The Island Ferry': { kind: 'story', facts: { 'Who went on the ferry with the narrator?': ['Mom', 'Toronto Island'], 'What flew next to the boat?': ['gulls', 'next to the boat'], 'What did they ride on the island?': ['bikes', 'on a path'] },
      main: ['ride a ferry to an island', 'boat was white'], predict: ['get to the island', 'took the ferry'], know: 'boat that carries people', connect: ['picnic at the beach', 'by the water'], other: ['Mom', 'took my child'] },
    'The Moose': { kind: 'information', facts: { 'What does a moose eat?': ['leaves and twigs', 'A moose eats'], 'Which moose has antlers?': ['only the male', 'has antlers'], 'When do the antlers fall off?': ['every winter', 'The antlers fall'] },
      main: ['big animals that eat plants and grow antlers', 'big nose'], know: 'live in the forest', connect: ['moose by the road', 'very big'] },
    'Busy Bees': { kind: 'information', facts: { 'What do bees drink?': ['nectar', 'sweet juice'], 'What do bees make?': ['honey', 'They make it'], 'Where do bees take the nectar?': ['to the hive', 'take the nectar'] },
      main: ['make honey and help plants grow', 'Nectar is sweet'], know: 'Bees like flowers', connect: ['honey on my toast', 'They make it'] },
    'How to Make Fruit Salad': { kind: 'instructions', facts: { 'What do you do first?': ['wash your hands', '1. Wash'], 'Who cuts the fruit?': ['a grown-up', 'to cut the apple'], 'What do you stir it with?': ['a big spoon', '5. Stir'] },
      main: ['how to make fruit salad', 'Grapes are small'], know: 'cut into pieces', connect: ['make lunch at home', 'in the bowl'] },
    'Dear Principal Diaz': { kind: 'letter', facts: { 'Who is the letter to?': ['Principal Diaz', 'Dear Principal'], 'What does Mia want?': ['a garden at school', 'I think our school'], 'What could they grow?': ['beans, peas and sunflowers', 'peas and'] },
      main: ['asks for a garden', 'bees would like'], know: 'Gardens need sun', connect: ['grow beans at home', 'peas and sunflowers'] },
    'The Moon': { kind: 'poem', facts: { 'When does the moon shine?': ['all through the night', 'It shines on me'], 'Where does the moon peek in?': ['at my window', 'It peeks'] } },
    'Where Is Biscuit?': { kind: 'story', facts: { 'What is the dog called?': ['Biscuit', 'not in his bed'], 'Where did the sound come from?': ['the closet', 'It came from'], 'What was Biscuit sitting on?': ['an old blanket', 'There was Biscuit'] },
      main: ['finds him in the closet', 'wagged his tail'], predict: ['find Biscuit in the closet', 'It came from'], know: 'soft places to sleep', connect: ['lost shoe', 'under the table'], other: ['Biscuit', 'napping in the closet'] }
  };
  const PURPOSE = { story: 'to enjoy a story', information: 'to learn facts', instructions: 'to learn how to do something', letter: 'to hear what someone thinks', poem: 'to enjoy a poem' };
  const CLUES = { letter: /Dear/, instructions: /numbered steps/, information: /headings and facts/, poem: /short lines/, story: /characters/ };
  const KINDWORD = { 'a story': 'story', 'an information text': 'information', instructions: 'instructions', 'a letter': 'letter', 'a poem': 'poem' };
  /* each problem while reading and the fix that solves it */
  const FIXES = { 'A sentence does not make sense.': 'Read it again, slowly.', 'You cannot see it in your head.': 'Make a picture in your head.',
    'You do not know a word.': 'Look at the picture for a clue.', 'You wonder why something happened.': 'Ask a question, then read on.', 'You forgot what happened.': 'Go back and look.' };
  const GOOD = Object.values(FIXES);
  /* read the passage card back out of the question's picture: its title, number of headings and sentences */
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.pic || q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    const ps = p.querySelectorAll('.ps'), lines = ps.length ? [...ps].map(x => text(x.innerHTML)) : [...p.querySelectorAll('p')].map(x => text(x.innerHTML));
    return { title: p.querySelector('.pt') ? text(p.querySelector('.pt').innerHTML) : '', heads: p.querySelectorAll('.psh').length, lines, all: lines.join(' ') }; };
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'information' : (KEY[c.title] || {}).kind === 'poem' ? 'poem' : 'story';
  /* someone in the story is telling it when the teller says I or my outside speech marks */
  const povOf = c => /\b(I|my|me)\b/.test(c.all.replace(/“[^”]*”/g, '')) ? 'first' : 'third';
  const key = (m, f) => (KEY[text(m.t || '')] || {})[f];
  const want = m => (key(m, 'facts') || {})[text(m.q)];
  /* the sentence the child tapped, and how many sentences hold some words */
  const tapped = q => { const d = document.createElement('div'); d.innerHTML = q.pic; const all = [...d.querySelectorAll('[data-hit]')].map(n => [n.getAttribute('data-hit'), text(n.innerHTML)]);
    return { hit: (all.find(a => a[0] === String(q.answer)) || [, ''])[1], count: s => all.filter(a => a[1].includes(s)).length }; };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sentOf = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const s = d.querySelector('.sent, .wmeans span'); return s ? text(s.innerHTML) : ''; };

  /* find it in the text */
  V['g1-fact'] = (q, m) => { const w = want(m); return w && mk(q) === w[0] ? '' : 'expected ' + (w && w[0]); };
  V['g1-tap-fact'] = (q, m) => { const w = want(m), t = tapped(q); return w && t.count(w[1]) === 1 && t.hit.includes(w[1]) ? '' : 'the tapped sentence does not answer it'; };
  V['g1-find-line'] = (q, m) => { const w = want(m), ok = w ? q.options.map(text).filter(o => o.includes(w[1])) : [];
    return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence that answers it is not the one marked'; };
  V['g1-fact-tf'] = (q, m) => { const w = want(m), right = !!w && text(m.said) === w[0]; return w && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* what it is mostly about */
  V['g1-main'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[0]) ? '' : 'expected the option about "' + (k && k[0]) + '"'; };
  V['g1-detail'] = (q, m) => { const k = key(m, 'main'); return k && mk(q).includes(k[1]) ? '' : 'expected the detail "' + (k && k[1]) + '"'; };
  V['g1-best-title'] = q => { const c = card(q), fits = Object.keys(KEY).filter(t => KEY[t].facts && Object.values(KEY[t].facts).every(f => c.all.includes(f[1])));
    return fits.length === 1 && mk(q) === fits[0] ? '' : 'expected the title ' + fits.join(' or '); };
  V['g1-main-tf'] = (q, m) => { const k = key(m, 'main'), right = !!k && sentOf(q).includes(k[0]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* kinds of texts */
  V['g1-form'] = q => mk(q) === kindOf(card(q)) ? '' : 'expected ' + kindOf(card(q));
  V['g1-form-clue'] = q => { const k = kindOf(card(q)); return CLUES[k].test(mk(q)) && q.options.filter(o => CLUES[k].test(text(o))).length === 1 ? '' : 'expected the clue for ' + k; };
  V['g1-kind-tf'] = q => { const k = kindOf(card(q)), said = KINDWORD[text(q.q).match(/this is (.+)\.$/)[1]], right = said === k, why = text(q.why.options[q.why.answer]);
    return q.answer === right && CLUES[k].test(why) ? '' : 'expected ' + right + ' because of the clue for ' + k; };
  V['g1-match-form'] = q => q.pairs.every(p => (KEY[text(p[0])] || {}).kind === text(p[1])) ? '' : 'a title is matched to the wrong kind';
  /* think before you read */
  V['g1-know'] = (q, m) => { const k = key(m, 'know'); return k && mk(q).includes(k) && text(q.q).includes(m.t) ? '' : 'expected "' + k + '"'; };
  V['g1-know-tf'] = (q, m) => { const k = key(m, 'know'), right = !!k && text(m.said).includes(k); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  V['g1-which-text'] = q => { const w = text(q.q).match(/You want (.+)\. Which/)[1], fits = q.tiles.map(t => PURPOSE[(KEY[text(t)] || {}).kind] === w);
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text you read ' + w; };
  V['g1-purpose-tf'] = q => { const said = text(q.q).match(/read this (.+)\.$/)[1], right = said === PURPOSE[kindOf(card(q))]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* guess what comes next */
  V['g1-predict'] = (q, m) => { const k = key(m, 'predict'), c = card(q); return k && mk(q).includes(k[0]) && c.all.includes(k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g1-predict-clue'] = (q, m) => { const k = key(m, 'predict'), c = card(q), line = c.lines.find(l => l.includes(k[1])) || '';
    return k && line.includes(mk(q)) && q.options.filter(o => line.includes(text(o))).length === 1 ? '' : 'expected the clue near "' + (k && k[1]) + '"'; };
  V['g1-predict-tf'] = (q, m) => { const k = key(m, 'predict'), right = !!k && text(q.q).includes(k[0]); return k && card(q).all.includes(k[1]) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-clue-tap'] = (q, m) => { const k = key(m, 'predict'), t = tapped(q); return k && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence does not hold the clue'; };
  /* fix it when it does not make sense */
  V['g1-fix-up'] = q => H.sameSet(q.options.map((o, i) => GOOD.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful ideas are not the ones marked';
  V['g1-which-fix'] = (q, m) => FIXES[m.p] && mk(q) === FIXES[m.p] && text(q.q).includes(m.p) ? '' : 'expected ' + FIXES[m.p];
  V['g1-match-fix'] = q => q.pairs.every(p => FIXES[text(p[0])] === text(p[1])) ? '' : 'a problem is matched to the wrong fix';
  V['g1-fixup-tf'] = q => { const good = GOOD.includes(text(q.fig)); return q.answer === good && tfWhy(q, good) ? '' : 'expected ' + good; };
  /* make a connection */
  V['g1-connect'] = (q, m) => { const k = key(m, 'connect'); return k && mk(q).includes(k[0]) ? '' : 'expected the connection "' + (k && k[0]) + '"'; };
  V['g1-connect-tf'] = (q, m) => { const k = key(m, 'connect'), right = !!k && text(m.said).includes(k[0]); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-connect-tap'] = (q, m) => { const k = key(m, 'connect'), t = tapped(q); return k && text(q.q).includes(k[0]) && t.count(k[1]) === 1 && t.hit.includes(k[1]) ? '' : 'the tapped sentence is not the part it is like'; };
  V['g1-connect-which'] = (q, m) => { const fits = q.tiles.map(t => ((KEY[text(t)] || {}).connect || [])[0]).map(c => !!c && text(m.said).includes(c));
    return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the text the connection is about'; };
  /* who is telling the story */
  V['g1-narrator'] = q => { const w = povOf(card(q)) === 'first' ? 0 : 1; return q.answer === w && /in the story/.test(text(q.tiles[0])) ? '' : 'expected ' + povOf(card(q)) + ' person'; };
  V['g1-narrator-word'] = q => { const c = card(q), p = povOf(c), w = mk(q), all = c.all.replace(/“[^”]*”/g, ''); return (p === 'first' ? w === 'I' : /^(They|He|She)$/.test(w)) && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected a word from the text that shows the teller'; };
  V['g1-pov-tf'] = q => { const p = povOf(card(q)), claimsIn = /Someone in the story/.test(text(q.q)), right = claimsIn === (p === 'first');
    return q.answer === right && q.why.answer === (p === 'first' ? 0 : 1) ? '' : 'expected ' + right + ' (' + p + ' person)'; };
  V['g1-first-line'] = q => { const first = q.options.map(o => /\b(I|my)\b/.test(text(o).replace(/“[^”]*”/g, ''))); return first.filter(Boolean).length === 1 && first[q.answer] ? '' : 'expected the one sentence with I or my'; };
  /* tell it another way */
  V['g1-other-teller'] = (q, m) => { const k = key(m, 'other'); return k && mk(q) === k[0] ? '' : 'expected ' + (k && k[0]); };
  V['g1-other-tf'] = (q, m) => { const k = key(m, 'other'), right = !!k && text(m.who).toLowerCase() === k[0].toLowerCase(); return k && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-other-says'] = (q, m) => { const k = key(m, 'other'), ok = k ? q.options.map(text).filter(o => o.includes(k[1])) : []; return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected what ' + (k && k[0]) + ' would say'; };
  V['g1-match-other'] = q => q.pairs.every(p => ((KEY[text(p[0])] || {}).other || [])[0] === text(p[1])) ? '' : 'a story is matched to the wrong teller';
})();
