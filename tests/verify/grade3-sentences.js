/* Grade 3 answer checks: sentences (grade3/chapters/sentences.js). The checker sorts sentences by its own rules
   and keeps its own list of which joining word fits each pair of ideas. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const DOING = new Set('Please Put Wash Pass Bring Close Sit Stop'.split(' '));
  const kindOf = s => s.endsWith('?') ? 'Asking' : DOING.has(s.split(/[ ,]/)[0]) ? 'Command' : s.endsWith('!') ? 'Strong feeling' : 'Telling';
  const JOINER = { 'It was raining': 'so', 'Mei was hungry': 'so', 'The ice was thin': 'so', 'Omar missed the bus': 'so', 'I like apples': 'but', 'The hill was steep': 'but',
    'The sun was out': 'but', 'Liam looked everywhere': 'but', 'We swam in the lake': 'and', 'Hana fed the cat': 'and', 'The wind blew': 'and',
    'We wore our coats': 'because', 'The plant died': 'because', 'We stayed home': 'because', 'Owen laughed': 'because',
    'We will eat': 'when', 'Call me': 'when', 'Wave to me': 'when', 'Take off your boots': 'when' };
  const PARTS = new Set(['Ran to the lake.', 'The big brown dog.', 'Because it was cold.', 'After the game.', 'Under the bridge.']);
  const joinerIn = (s, a) => (s.slice(a.length).match(/^,? (and|but|so|because|when) /) || [])[1];

  V['g3-kind'] = (q, m) => H.has(q.fig, m.s) && H.marked(q) === kindOf(m.s) ? '' : 'expected ' + kindOf(m.s);
  V['g3-end-mark'] = (q, m) => H.marked(q) === m.s.slice(-1) && !H.has(q.fig, m.s) ? '' : 'expected ' + m.s.slice(-1);
  V['g3-match-kind'] = q => q.pairs.every(p => kindOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g3-pick-ask'] = q => H.sameSet(q.options.map((o, i) => kindOf(text(o)) === 'Asking' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the asking sentences are not the ones marked';
  V['g3-order-ask'] = q => { const s = q.items.map(text).join(' '); return /^[A-Z]/.test(s) && kindOf(s) === 'Asking' ? '' : '"' + s + '" is not an asking sentence'; };
  V['g3-join'] = (q, m) => H.marked(q) === JOINER[m.a] && H.has(q.fig, m.a) ? '' : 'expected ' + JOINER[m.a];
  V['g3-because-when'] = (q, m) => H.marked(q) === JOINER[m.a] ? '' : 'expected ' + JOINER[m.a];
  V['g3-order-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s.startsWith(m.a) && joinerIn(s, m.a) === JOINER[m.a] && H.sentenceOk(s) ? '' : 'built "' + s + '"'; };
  V['g3-pick-joined'] = (q, m) => { const ok = q.options.map(text).filter(s => joinerIn(s, m.a) === JOINER[m.a]); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with ' + JOINER[m.a]; };
  V['g3-complete'] = q => { const whole = q.options.map(text).filter(s => !PARTS.has(s)); return whole.length === 1 && H.marked(q) === whole[0] ? '' : 'the complete sentence is not the one marked'; };
})();
