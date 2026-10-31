/* Grade 4 answer checks: reading for meaning (grade4/chapters/reading.js). Comprehension answers come from a passage, so the
   checker keeps its own answer key (like a second marker), and works out what it can from the passage itself: where events come
   in the text, what kind of text it is, and who is telling it. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/[’]/g, "'"), mk = q => text(H.marked(q) || '');
  /* question -> [answer, words from the sentence that proves it] */
  const FACTS = {
    'Where was Amara when the snow started?': ['at the library', 'At the library, Amara'], 'Where was Jayden?': ['at hockey practice', 'finishing hockey practice'],
    'How did Amara get to the arena?': ['by bus', 'Amara rode it'], 'Where do monarchs fly in the fall?': ['to Mexico', 'mountains of Mexico'],
    'What do monarch caterpillars eat?': ['milkweed leaves', 'eat only milkweed'], 'How can people help monarchs?': ['plant milkweed', 'help by planting'],
    'What did the narrator pour?': ['vinegar', 'bottle of vinegar'], 'What colour was the foam?': ['red', 'Red foam'], 'What sound does the snow make?': ['it squeaks', 'snow squeaks'],
    'What grows beside the trail?': ['tall pines', 'through tall pines'], 'What did Squirrel bring?': ['an acorn', 'with an acorn'], 'Where was the shop?': ['by the river', 'shop by the river'],
    'Which three plants are the Three Sisters?': ['corn, beans and squash', 'grown corn, beans'], 'What do the beans climb?': ['the corn', 'pole to climb'],
    'Where do you stop cutting?': ['2 cm from the edge', 'stopping 2 cm'] };
  const MAIN = { 'Two Ways Home': 'finds her brother', 'Monarch Butterflies': 'travel far and need milkweed', 'My Volcano': 'nervous at the science fair', 'Crow Opens a Shop': 'cannot feed her', 'The Three Sisters': 'help each other grow' };
  const CONCLUDE = { 'Monarch Butterflies': 'help more monarchs survive', 'The Three Sisters': 'Plants can help each other' };
  const PREDICT = { 'My Volcano': ['pour the vinegar', 'picked up the bottle', 'Did the narrator pour the vinegar?'], 'Your First Ski Trail': ['ski down the hill', 'top of a small hill', 'Did you go down the hill?'],
    'Crow Opens a Shop': ['trading for food', 'nothing to eat', 'Did Crow start trading for food?'] };
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const all = q => card(q).lines.join(' ');
  /* the passage itself: is this sentence in it? */
  const inText = (q, s) => all(q).includes(s);
  V['g4-fact'] = (q, m) => { const k = FACTS[text(m.q)]; return k && mk(q) === k[0] && inText(q, k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g4-find-line'] = (q, m) => { const k = FACTS[text(m.q)], ok = q.options.map(text).filter(o => o.includes(k[1])); return ok.length === 1 && mk(q) === ok[0] && inText(q, ok[0]) ? '' : 'the sentence that answers it is not the one marked'; };
  V['g4-main'] = (q, m) => mk(q).includes(MAIN[m.t]) ? '' : 'expected the option about "' + MAIN[m.t] + '"';
  /* supporting details are sentences from the passage */
  V['g4-support'] = q => { const ok = q.options.map(text).filter(o => inText(q, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the detail that is in the text'; };
  V['g4-support-pick'] = q => H.sameSet(q.options.map((o, i) => inText(q, text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the details from the text are not the ones marked';
  V['g4-conclude'] = (q, m) => mk(q).includes(CONCLUDE[m.t]) ? '' : 'expected the conclusion about "' + CONCLUDE[m.t] + '"';
  V['g4-order'] = q => { const s = all(q), at = q.items.map(i => s.indexOf(text(i).replace(/[“”]/g, ''))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the events are not in the order of the text'; };
  V['g4-predict'] = (q, m) => { const k = PREDICT[m.t]; return k && mk(q).includes(k[0]) && inText(q, k[1]) ? '' : 'expected the prediction "' + (k && k[0]) + '"'; };
  V['g4-check-predict'] = (q, m) => { const k = PREDICT[m.t]; return k && mk(q) === k[2] ? '' : 'expected the question ' + (k && k[2]); };
  const FIX = { migrate: 'Look it up', 'new facts': 'Slow down and reread', 'cannot picture': 'Make a picture', 'next sentence': 'Read ahead', 'know more than': 'Check another', 'why a character': 'Ask a question' };
  const fixFor = s => FIX[Object.keys(FIX).find(k => text(s).includes(k))];
  V['g4-monitor'] = (q, m) => mk(q).startsWith(fixFor(m.s)) ? '' : 'expected ' + fixFor(m.s);
  const SHORT = { 'A new word': 'Look it up', 'Lots of new facts': 'Slow down, reread', 'Cannot picture it': 'Make a mind picture', 'Explained later?': 'Read ahead', 'Want to know more': 'Check another source', 'Confused about why': 'Ask a question' };
  V['g4-monitor-match'] = q => q.pairs.every(p => SHORT[text(p[0])] === text(p[1])) ? '' : 'a problem is matched to the wrong strategy';
  const KIND = { 'Two Ways Home': 'story', 'My Volcano': 'story', 'Your First Ski Trail': 'story', 'Crow Opens a Shop': 'fable', 'Monarch Butterflies': 'information', 'The Three Sisters': 'information',
    'The Old Maple': 'poem', 'How to Make a Paper Lantern': 'instructions', 'Keep Riverside Pool Open': 'letter' };
  /* worked out from the passage: "Dear" is a letter, numbered steps are instructions, headings are information */
  const kindOf = c => /^Dear /.test(c.lines[0]) ? 'letter' : c.lines.some(l => /^\d\. /.test(l)) ? 'instructions' : c.heads ? 'information' : KIND[c.title];
  const PURPOSE = { story: 'to enjoy a story', fable: 'to learn a lesson from a story', information: 'to learn facts', poem: 'to enjoy a poem', instructions: 'to learn how to do something', letter: 'to hear an opinion' };
  V['g4-form'] = q => { const c = card(q); return mk(q) === kindOf(c) && KIND[c.title] === kindOf(c) ? '' : 'expected ' + kindOf(c); };
  V['g4-purpose'] = q => mk(q) === PURPOSE[kindOf(card(q))] ? '' : 'expected ' + PURPOSE[kindOf(card(q))];
  const WANT = { 'learn how to make something': 'instructions', 'learn facts about butterflies': 'Monarch Butterflies', 'enjoy a story with a lesson': 'fable', "read someone's opinion": 'letter', 'enjoy a poem': 'poem' };
  V['g4-choose'] = (q, m) => { const w = WANT[text(m.want)], t = mk(q); return t === w || KIND[t] === w ? '' : 'the text marked does not fit "' + m.want + '"'; };
  const FEAT = { story: 'characters', fable: 'animals', information: 'headings', poem: 'short lines', instructions: 'numbered steps', letter: 'greeting' };
  V['g4-form-feature'] = q => q.pairs.every(p => text(p[1]).includes(FEAT[text(p[0])])) ? '' : 'a kind is matched to the wrong feature';
  /* who tells it: you or your outside speech marks is second, I or my is first, otherwise third */
  const povOf = c => { const s = c.lines.join(' ').replace(/“[^”]*”/g, ''); return /\b(You|you|your)\b/.test(s) ? 'second' : /\b(I|my|me)\b/.test(s) ? 'first' : 'third'; };
  V['g4-narrator'] = q => mk(q).startsWith(povOf(card(q))) ? '' : 'expected ' + povOf(card(q)) + ' person';
  V['g4-pov-good'] = (q, m) => { const want = { 'first person': 'thinks and feels', 'second person': 'puts you', 'third person': 'several characters' }[m.pov]; return mk(q).includes(want) ? '' : 'expected the advantage of ' + m.pov; };
  V['g4-pov-match'] = q => { const want = { 'first person': 'only know what the narrator knows', 'second person': 'strange', 'third person': 'what each character thinks' }; return q.pairs.every(p => text(p[1]).includes(want[text(p[0])])) ? '' : 'a point of view is matched to the wrong drawback'; };
})();
