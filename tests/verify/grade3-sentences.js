/* Grade 3 answer checks: sentences (grade3/chapters/sentences.js). The checker sorts sentences by its own rules
   and keeps its own list of which joining word fits each pair of ideas, and of which parts are not complete. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const DOING = new Set('Please Put Wash Pass Bring Close Sit Stop Hang Feed Turn'.split(' '));
  const kindOf = s => s.endsWith('?') ? 'Asking' : DOING.has(s.split(/[ ,]/)[0]) ? 'Command' : s.endsWith('!') ? 'Strong feeling' : 'Telling';
  const JOINER = {};
  const add = (w, list) => list.split('|').forEach(a => { JOINER[a] = w; });
  add('so', 'It was raining|Mei was hungry|The ice was thin|Omar missed the bus|The puppy was tired|Our tent leaked|The music was loud');
  add('but', 'I like apples|The hill was steep|The sun was out|Liam looked everywhere|Kai is small|We waited for the bus|The soup smelled odd');
  add('and', 'We swam in the lake|Hana fed the cat|The wind blew|Dad made pancakes|Zara plays piano|The leaves turned red|Noor read a book');
  add('because', 'We wore our coats|The plant died|We stayed home|Owen laughed|The road was closed|We took the bus|Priya felt proud|The ice cream melted|Kai could not sleep|We ate inside');
  add('when', 'We will eat|Call me|Wave to me|Take off your boots|Raise your hand|Turn off the tap|We line up|Bears wake up|Let the cookies cool|Put on a hat');
  /* parts that are not complete sentences: missing who (they start with a doing word), missing what they did, or only a when/why/where part */
  const NOWHO = new Set(['Ran to the lake.', 'Jumped over the log.', 'Plays the drums every day.', 'Swam across the pond.', 'Ate all the berries.', 'Climbed the tall tree.', 'Laughed at the joke.']);
  const NOWHAT = new Set(['The big brown dog.', 'My best friend Kai.', 'The old wooden canoe.', 'A flock of geese.', 'Our neighbour’s cat.', 'The tall pine tree.', 'Two red mittens.']);
  const OTHER = new Set(['Because it was cold.', 'After the game.', 'Under the bridge.', 'When the bell rang.']);
  const part = s => NOWHO.has(s) || NOWHAT.has(s) || OTHER.has(s);
  const whole = s => H.sentenceOk(s) && !part(s) && s.split(' ').length >= 3;
  const joinerIn = (s, a) => (s.slice(a.length).match(/^,? (and|but|so|because|when) /) || [])[1];
  const firstIdea = s => Object.keys(JOINER).filter(a => s.startsWith(a + ' ') || s.startsWith(a + ',')).sort((x, y) => y.length - x.length)[0];

  V['g3-kind'] = (q, m) => H.has(q.fig, m.s) && H.marked(q) === kindOf(m.s) ? '' : 'expected ' + kindOf(m.s);
  V['g3-end-mark'] = (q, m) => H.marked(q) === m.s.slice(-1) && !H.has(q.fig, m.s) ? '' : 'expected ' + m.s.slice(-1);
  V['g3-match-kind'] = q => q.pairs.every(p => kindOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g3-pick-ask'] = (q, m) => { const want = q.options.map((o, i) => kindOf(text(o)) === m.kind ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) && H.has(q.q, m.kind.toLowerCase()) ? '' : 'the ' + m.kind + ' sentences are not the ones marked'; };
  V['g3-kind-sent-tf'] = (q, m) => H.has(q.fig, m.s) && (kindOf(m.s) === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-complete'] = q => { const ok = q.options.map(text).filter(whole); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'the complete sentence is not the one marked'; };
  V['g3-pick-complete'] = q => { const want = q.options.map((o, i) => whole(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the complete sentences are not the ones marked'; };
  V['g3-complete-tf'] = (q, m) => text(q.fig) === m.s && whole(m.s) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-missing-part'] = (q, m) => text(q.fig) === m.s && H.marked(q) === (NOWHO.has(m.s) ? 'Who or what' : NOWHAT.has(m.s) ? 'What they did' : '?') ? '' : 'the missing part is wrong for ' + m.s;
  V['g3-order-whole'] = q => { const s = q.items.map(text).join(' '); return whole(s) && /^[A-Z]/.test(q.items.map(text)[0]) ? '' : '"' + s + '" is not a complete sentence'; };
  V['g3-join'] = (q, m) => H.marked(q) === JOINER[m.a] && H.has(q.fig, m.a) ? '' : 'expected ' + JOINER[m.a];
  V['g3-order-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s.startsWith(m.a + ',') && joinerIn(s, m.a) === JOINER[m.a] && H.sentenceOk(s) ? '' : 'built "' + s + '"'; };
  V['g3-pick-joined'] = (q, m) => { const ok = q.options.map(text).filter(s => joinerIn(s, m.a) === JOINER[m.a]); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with ' + JOINER[m.a]; };
  V['g3-join-tf'] = (q, m) => { const s = text(q.fig), a = firstIdea(s); return a === m.a && (joinerIn(s, a) === JOINER[a]) === q.answer ? '' : 'true/false is wrong for "' + s + '"'; };
  V['g3-because-when'] = (q, m) => H.marked(q) === JOINER[m.a] && H.has(q.fig, m.a) ? '' : 'expected ' + JOINER[m.a];
  V['g3-order-complex'] = (q, m) => { const s = q.items.map(text).join(' '); return s.startsWith(m.a + ' ') && joinerIn(s, m.a) === JOINER[m.a] && H.sentenceOk(s) ? '' : 'built "' + s + '"'; };
  V['g3-which-part'] = (q, m) => { const w = JOINER[m.a], t = H.marked(q); return t && t.startsWith(w + ' ') && H.has(q.q, w === 'because' ? 'why' : 'when') && H.has(q.fig, t) ? '' : 'expected the part starting with ' + w; };
  V['g3-complex-tf'] = (q, m) => { const s = text(q.fig), a = firstIdea(s); return a === m.a && (joinerIn(s, a) === JOINER[a]) === q.answer ? '' : 'true/false is wrong for "' + s + '"'; };
})();
