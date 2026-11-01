/* Grade 7 answer checks: sentences (grade7/chapters/sentences.js). The checker finds clauses from the joining words itself:
   a comma then and/but/or/so joins two independent clauses; because, when, if, although (and similar) start a dependent clause. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const sentence = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return text(d.querySelector('.sent').innerHTML); };
  const SUB = /\b(because|when|although|if|unless|after|until|since|while|before|as|once)\b/i, COORD = /, (and|but|or|so)\b/;
  const typeOf = s => SUB.test(s) ? (COORD.test(s) ? 'compound-complex' : 'complex') : COORD.test(s) ? 'compound' : 'simple';
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  V['g7-type-of'] = (q, m) => mk(q) === typeOf(text(m.s)) && sentence(q) === text(m.s) ? '' : 'expected ' + typeOf(text(m.s));
  V['g7-type-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => typeOf(text(o)) === m.t ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.t + ' sentences are not the ones marked';
  V['g7-type-match'] = q => q.pairs.every(p => typeOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong type';
  V['g7-type-tf'] = (q, m) => { const right = typeOf(sentence(q)) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* a clause is dependent when it starts with a joining word */
  const dependent = s => SUB.test(s.split(' ')[0]);
  V['g7-clause-kind'] = (q, m) => q.answer === (dependent(m.s) ? 1 : 0) ? '' : 'expected ' + (dependent(m.s) ? 'dependent' : 'independent');
  V['g7-clause-tf'] = (q, m) => { const right = m.can === !dependent(sentence(q)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-clause-find'] = q => { const s = sentence(q), ok = q.tiles.map(text).filter(t => s.includes(t) && dependent(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the dependent clause'; };
  V['g7-clause-starter'] = q => { const ok = q.tiles.map(text).filter(t => /^(because|although|when|until|if|unless)$/.test(t)); return ok.length === 1 && mk(q) === ok[0] && sentence(q).includes(' ' + ok[0] + ' ') ? '' : 'expected the joining word'; };
  /* what each joining word shows */
  const REL = { because: 'cause', although: 'contrast', when: 'time', until: 'time', if: 'condition', unless: 'condition' };
  /* the checker's own sense of how each pair of ideas is related */
  const PAIR = { 'the bus was late': 'cause', 'the river flooded': 'cause', 'the game was cancelled': 'cause', 'the plants grew tall': 'cause', 'Maya wore her parka': 'cause',
    'we kept paddling': 'contrast', 'the library stayed open': 'contrast', 'we finished the hike': 'contrast', 'Ravi stayed calm': 'contrast', 'the store was busy': 'contrast',
    'the crowd cheered': 'time', 'Omar practised every day': 'time', 'the lights went down': 'time', 'we waited inside': 'time', 'Nia read her book': 'time',
    'you can join the club': 'condition', 'the seedlings will die': 'condition', 'we will paddle to the island': 'condition', 'the ice will melt': 'condition', 'you will get a seat': 'condition' };
  const joiner = s => (s.match(/\b(because|although|when|until|if|unless)\b/i) || [])[1];
  const mainOf = s => Object.keys(PAIR).find(k => s.toLowerCase().startsWith(k.toLowerCase()));
  V['g7-combine'] = (q, m) => { const w = joiner(mk(q)); return w && REL[w.toLowerCase()] === PAIR[m.main] && PAIR[m.main] === m.rel && q.options.map(text).filter(o => REL[(joiner(o) || '').toLowerCase()] === m.rel).length === 1 ? '' : 'expected a joining word showing ' + PAIR[m.main]; };
  V['g7-join-word'] = (q, m) => REL[mk(q)] === PAIR[m.main] && q.tiles.map(text).filter(t => REL[t] === PAIR[m.main]).length === 1 ? '' : 'expected a word showing ' + PAIR[m.main];
  V['g7-relation'] = (q, m) => mk(q) === REL[joiner(text(m.s))] && REL[joiner(text(m.s))] === PAIR[mainOf(text(m.s))] ? '' : 'expected ' + REL[joiner(text(m.s))];
  V['g7-relate-tf'] = (q, m) => { const right = PAIR[mainOf(text(m.s))] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* a front dependent clause is followed by a comma, and nothing else is */
  const frontOk = (a, sub) => a.startsWith(cap(sub) + ',') && (a.match(/,/g) || []).length === 1;
  V['g7-fronted'] = (q, m) => { const ok = q.options.map(text).filter(o => frontOk(o, m.sub)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the comma right after "' + m.sub + '"'; };
  V['g7-fronted-move'] = (q, m) => { const want = cap(m.sub) + ', ' + m.main + '.'; return mk(q) === want && q.options.map(text).filter(o => o === want).length === 1 ? '' : 'expected ' + want; };
  V['g7-fronted-comma'] = (q, m) => mk(q) === m.sub.split(' ').pop() && sentence(q).startsWith(cap(m.sub) + ' ') ? '' : 'expected the last word of "' + m.sub + '"';
  V['g7-fronted-tf'] = (q, m) => { const right = frontOk(text(m.s), m.sub); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* fragments and the complete sentences that fix them */
  const FRAG = ['Because the gym was closed.', 'After the storm passed over the lake.', 'Running down the hall with a stack of books.', 'The tall girl from my hockey team.', 'When we reach the campsite.',
    'Although the water was cold.', 'The old cabin by the river.', 'Hoping for a snow day.', 'If the bus is late again.', 'A loud crash in the kitchen.', 'Until the music stopped.', 'Since the library opened.'];
  const WHOLE = ['Because the gym was closed, we played outside.', 'After the storm passed over the lake, we went fishing.', 'Lucas was running down the hall with a stack of books.',
    'The tall girl from my hockey team scored twice.', 'When we reach the campsite, we will set up the tent.', 'Although the water was cold, we swam to the dock.', 'The old cabin by the river has a red door.',
    'Hoping for a snow day, Mei checked the news.', 'If the bus is late again, we will walk.', 'We heard a loud crash in the kitchen.', 'We danced until the music stopped.', 'Since the library opened, Amir has visited every week.'];
  V['g7-whole'] = q => { const o = q.options.map(text), ok = o.filter(x => WHOLE.includes(x)); return ok.length === 1 && mk(q) === ok[0] && o.every(x => WHOLE.includes(x) || FRAG.includes(x)) ? '' : 'expected the complete sentence'; };
  V['g7-frag-or-not'] = (q, m) => q.answer === (FRAG.includes(m.s) ? 1 : WHOLE.includes(m.s) ? 0 : -1) ? '' : 'expected ' + (FRAG.includes(m.s) ? 'fragment' : 'complete');
  V['g7-frag-fix'] = (q, m) => { const core = m.s.replace(/\.$/, '').toLowerCase(), ok = q.options.map(text).filter(o => WHOLE.includes(o) && o.toLowerCase().includes(core)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fixed sentence'; };
  V['g7-frag-pick'] = q => H.sameSet(q.options.map((o, i) => FRAG.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) && q.options.every(o => FRAG.includes(text(o)) || WHOLE.includes(text(o))) ? '' : 'the fragments are not the ones marked';
  /* run-ons: the checker's own two clauses for each, and the fixes that work */
  const RUN = { 'The power went out, we lit candles.': ['The power went out', 'we lit candles'], 'The lake froze early, we went skating.': ['The lake froze early', 'we went skating'],
    'Noor won the race she was thrilled.': ['Noor won the race', 'she was thrilled'], 'The bus was late we missed the start.': ['The bus was late', 'we missed the start'],
    'Jamal finished his homework, he went outside to play.': ['Jamal finished his homework', 'he went outside to play'], 'The trail was muddy we wore our boots.': ['The trail was muddy', 'we wore our boots'],
    'Ella wanted to swim, the pool was closed.': ['Ella wanted to swim', 'the pool was closed'], 'The fire alarm rang everyone walked outside.': ['The fire alarm rang', 'everyone walked outside'],
    'My brother loves hockey, I prefer basketball.': ['My brother loves hockey', 'I prefer basketball'], 'The wind picked up the waves grew taller.': ['The wind picked up', 'the waves grew taller'] };
  const fixed = (run, o) => { const [a, b] = RUN[run]; return [', and ', ', but ', ', so '].some(c => o === a + c + b + '.') || o === a + '; ' + b + '.' || o === a + '. ' + cap(b) + '.'; };
  V['g7-fix-runon'] = (q, m) => { const ok = q.options.map(text).filter(o => fixed(m.s, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one good fix'; };
  V['g7-fix-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => fixed(m.s, text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good fixes are not the ones marked';
  V['g7-whats-wrong'] = (q, m) => q.answer === (FRAG.includes(m.s) ? 0 : RUN[m.s] ? 1 : -1) ? '' : 'expected ' + (FRAG.includes(m.s) ? 'fragment' : 'run-on');
  V['g7-runon-or-not'] = (q, m) => { const run = !!RUN[m.s], fix = Object.keys(RUN).some(r => fixed(r, m.s)); return run !== fix && q.answer === (run ? 1 : 0) ? '' : 'expected ' + (run ? 'run-on' : 'correct'); };
})();
