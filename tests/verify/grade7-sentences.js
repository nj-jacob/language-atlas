/* Grade 7 answer checks: sentences (grade7/chapters/sentences.js). The checker finds clauses from the joining words itself:
   a comma then and/but/or/so joins two independent clauses; because, when, if, although (and similar) start a dependent clause. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SUB = /\b(because|when|although|if|unless|after|until|since|while)\b/i, COORD = /, (and|but|or|so)\b/;
  const typeOf = s => SUB.test(s) ? (COORD.test(s) ? 'compound-complex' : 'complex') : COORD.test(s) ? 'compound' : 'simple';
  V['g7-type-of'] = (q, m) => mk(q) === typeOf(text(m.s)) && text(q.fig) === text(m.s) ? '' : 'expected ' + typeOf(text(m.s));
  V['g7-type-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => typeOf(text(o)) === m.t ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.t + ' sentences are not the ones marked';
  V['g7-type-match'] = q => q.pairs.every(p => typeOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong type';
  V['g7-clause-kind'] = (q, m) => q.answer === (SUB.test(m.s.split(' ')[0]) ? 1 : 0) ? '' : 'expected ' + (SUB.test(m.s.split(' ')[0]) ? 'dependent' : 'independent');
  /* what each joining word shows */
  const REL = { because: 'cause', although: 'contrast', when: 'time', until: 'time', if: 'condition', unless: 'condition' };
  /* the checker's own sense of how each pair of ideas is related */
  const PAIR = { 'the bus was late': 'cause', 'the river flooded': 'cause', 'we kept paddling': 'contrast', 'the library stayed open': 'contrast', 'the crowd cheered': 'time',
    'Omar practised every day': 'time', 'you can join the club': 'condition', 'the seedlings will die': 'condition' };
  const joiner = s => (s.match(/\b(because|although|when|until|if|unless)\b/i) || [])[1];
  V['g7-combine'] = (q, m) => { const w = joiner(mk(q)); return w && REL[w.toLowerCase()] === PAIR[m.main] && PAIR[m.main] === m.rel && q.options.map(text).filter(o => REL[(joiner(o) || '').toLowerCase()] === m.rel).length === 1 ? '' : 'expected a joining word showing ' + PAIR[m.main]; };
  V['g7-join-word'] = (q, m) => REL[mk(q)] === PAIR[m.main] && q.tiles.map(text).filter(t => REL[t] === PAIR[m.main]).length === 1 ? '' : 'expected a word showing ' + PAIR[m.main];
  V['g7-relation'] = (q, m) => mk(q) === REL[joiner(text(m.s))] ? '' : 'expected ' + REL[joiner(text(m.s))];
  /* a front dependent clause is followed by a comma, and nothing else is */
  V['g7-fronted'] = (q, m) => { const a = mk(q), want = m.sub.charAt(0).toUpperCase() + m.sub.slice(1) + ','; return a.startsWith(want) && (a.match(/,/g) || []).length === 1 ? '' : 'expected the comma right after "' + m.sub + '"'; };
  const FRAG = ['Because the gym was closed.', 'After the storm passed over the lake.', 'Running down the hall with a stack of books.', 'The tall girl from my hockey team.', 'When we reach the campsite.'];
  const RUNON = ['The power went out, we lit candles.', 'The bus was late we missed the start.', 'Noor won the race she was thrilled.', 'The lake froze early, we went skating.'];
  const WHOLE = ['The power went out, so we lit candles.', 'Because the gym was closed, we played outside.', 'Noor won the race, and she was thrilled.', 'The tall girl from my hockey team scored twice.', 'We set up the tent when we reached the campsite.'];
  V['g7-whole'] = q => { const ok = q.options.map(text).filter(o => WHOLE.includes(o)); return ok.length === 1 && mk(q) === ok[0] && q.options.map(text).every(o => WHOLE.includes(o) || FRAG.includes(o) || RUNON.includes(o)) ? '' : 'expected the complete sentence'; };
  V['g7-whats-wrong'] = (q, m) => q.answer === (FRAG.includes(m.s) ? 0 : RUNON.includes(m.s) ? 1 : -1) ? '' : 'expected ' + (FRAG.includes(m.s) ? 'fragment' : 'run-on');
  /* a good fix keeps the words in order and joins the two clauses with ", so", ", and", ";" or a full stop */
  const fixed = (run, o) => { const parts = run.replace(/\.$/, '').split(/, | (?=(?:we|she)\b)/); if (parts.length !== 2) return false;
    const [a, b] = parts, B = b.charAt(0).toUpperCase() + b.slice(1); return [a + ', so ' + b + '.', a + ', and ' + b + '.', a + '; ' + b + '.', a + '. ' + B + '.'].includes(o); };
  V['g7-fix-runon'] = (q, m) => { const ok = q.options.map(text).filter(o => fixed(m.s, o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one good fix'; };
  V['g7-fix-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => fixed(m.s, text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good fixes are not the ones marked';
})();
