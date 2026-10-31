/* Grade 5 answer checks: sentences (grade5/chapters/sentences.js). The checker works out each sentence's kind from its own rules:
   it counts the complete thoughts joined by a comma and a joining word, and looks for a word that starts a part that cannot stand alone. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SUB = /\b(because|when|while|after|since|before|although)\b/i;
  /* the checker's own complete thoughts: a run-on puts two of them side by side with no joining word */
  const THOUGHTS = ['Kiran grabbed his skates', 'Mia found the puck', 'the trail was muddy', 'we kept hiking', 'the bus was late', 'we missed the start of the show', 'Grandma made bannock',
    'I set the table', 'the power went out', 'we lit candles', 'Leo wanted to swim', 'the lake was too cold', 'Priya practised her speech', 'her dad timed her', 'the library closed early', 'we read at home'];
  const has = (s, t) => s.toLowerCase().includes(t.toLowerCase());
  const thoughts = s => THOUGHTS.filter(t => has(s, t)).length;
  const joined = s => /, (and|but|so) /.test(s);
  const kind = s => {
    if (!thoughts(s)) return 'fragment';
    if (thoughts(s) === 2 && !joined(s)) return 'run-on';
    if (thoughts(s) === 2) return SUB.test(s) ? 'compound-complex' : 'compound';
    return SUB.test(s) ? 'complex' : 'simple';
  };
  V['g5-kind'] = (q, m) => mk(q) === kind(text(m.s)) ? '' : 'expected ' + kind(text(m.s));
  V['g5-pick-kind'] = (q, m) => H.sameSet(q.options.map((o, i) => kind(text(o)) === m.kind ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.kind + ' sentences are not the ones marked';
  /* the joining word: and adds, but turns, so gives a result. The checker keeps its own key. */
  const JOIN = { 'Kiran grabbed his skates': 'and', 'the trail was muddy': 'but', 'the bus was late': 'so', 'Grandma made bannock': 'and', 'the power went out': 'so', 'Leo wanted to swim': 'but',
    'Priya practised her speech': 'and', 'the library closed early': 'so' };
  V['g5-join'] = (q, m) => mk(q) === JOIN[m.a] ? '' : 'expected ' + JOIN[m.a];
  V['g5-build-cc'] = q => { const s = q.items.map(text).join(' '); return kind(s) === 'compound-complex' && SUB.test(text(q.items[0])) && /^(and|but|so) /.test(text(q.items[2])) ? '' : 'the parts do not make a compound-complex sentence'; };
  const label = { fragment: 'Fragment', 'run-on': 'Run-on' };
  V['g5-frag'] = (q, m) => mk(q) === (label[kind(text(m.s))] || 'Complete sentence') ? '' : 'expected ' + kind(text(m.s));
  V['g5-fix-run-on'] = q => { const ok = q.options.map(text).filter(o => kind(o) === 'compound'); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the compound sentence'; };
  V['g5-fix-frag'] = (q, m) => { const ok = q.options.map(text).filter(o => kind(o) === 'complex'); return ok.length === 1 && mk(q) === ok[0] && has(ok[0], m.dep) ? '' : 'expected the complete sentence'; };
  V['g5-pick-complete'] = q => H.sameSet(q.options.map((o, i) => ['simple', 'compound', 'complex', 'compound-complex'].includes(kind(text(o))) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the complete sentences are not the ones marked';
})();
