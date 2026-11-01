/* Grade 1 answer checks. Each one works the answer out again from what the child sees, without the site's code.
   Return an empty string when the marked answer is right, or a short message saying what is wrong. Keys match meta.k in grade1/chapters/sentences.js. */
(function () {
  const V = window.__verify, H = window.__H;
  const text = s => H.strip(s);

  /* exactly one option is a sentence written the right way, and it is the marked one */
  V['g1-right-way'] = q => {
    const good = q.options.map((o, i) => (H.sentenceOk(text(o)) ? i : -1)).filter(i => i >= 0);
    return good.length === 1 && good[0] === q.answer ? '' : 'right-way options: ' + good.length + ' are written right; marked ' + q.answer;
  };
  /* asking sentences (they start with an asking word) take a question mark; telling sentences take a period */
  V['g1-end-mark'] = (q, m) => {
    const first = m.words.split(' ')[0], want = H.askWords.includes(first) ? '?' : '.';
    if (text(q.fig).indexOf(m.words) < 0) return 'the picture does not show the sentence';
    return text(q.tiles[q.answer]) === want ? '' : 'expected ' + want + ' for "' + m.words + '"';
  };
  /* true when the shown sentence is right; the reason must name what is missing */
  V['g1-fix-tf'] = (q, m) => {
    const s = m.shown, cap = /^[A-Z]/.test(s), end = /[.?!]$/.test(s);
    if (text(q.fig) !== s) return 'the picture does not show the sentence';
    if (!cap && !end) return 'both mistakes at once: the reasons cannot cover it';
    if (q.answer !== (cap && end)) return 'true/false is wrong for "' + s + '"';
    const why = text(q.why.options[q.why.answer]);
    const want = cap && end ? /starts with a capital.*ends with a mark/ : !cap ? /needs a capital/ : /needs a mark/;
    if (!want.test(why)) return 'the reason "' + why + '" does not fit "' + s + '"';
    return q.why.options.filter(o => want.test(text(o))).length === 1 ? '' : 'more than one reason fits';
  };
  /* the cards in their right order make one sentence written the right way, with the capital first and the mark last */
  V['g1-build'] = q => {
    const words = q.items.map(text), s = words.join(' ');
    if (!H.sentenceOk(s)) return '"' + s + '" is not written the right way';
    if (words.slice(1).some(w => /^[A-Z]/.test(w) && w !== 'I')) return 'a capital letter in the middle gives two possible first words';
    if (words.slice(0, -1).some(w => /[.?!]$/.test(w))) return 'an end mark in the middle';
    return '';
  };
  /* the marked options are exactly the sentences written the right way */
  V['g1-pick'] = q => {
    const good = q.options.map((o, i) => (H.sentenceOk(text(o)) ? i : -1)).filter(i => i >= 0);
    return H.sameSet(good, q.answer) ? '' : 'marked ' + q.answer + ' but right ones are ' + good;
  };
})();
/* kinds of sentences, complete sentences and joining with and (B3.1) */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const COMMAND = ['Sit', 'Close', 'Put', 'Wash', 'Bring', 'Please', 'Feed', 'Turn', 'Hang', 'Stir', 'Zip', 'Pick'];
  const kind = s => /\?$/.test(s) ? 'asking' : /!$/.test(s) ? 'strong feeling' : COMMAND.includes(s.split(/[ ,]/)[0]) ? 'command' : 'telling';
  const FULL = ['The dog ran to the park.', 'My sister likes to swim.', 'Grandma baked a pie.', 'The loon dove under the water.', 'Omar kicked the ball.', 'The bus stopped at the corner.',
    'The baby fell asleep.', 'Our teacher read us a story.', 'A beaver built a dam.', 'Jun planted a seed.', 'The wind blew my hat away.', 'My cousin skated on the pond.', 'The frog jumped into the pond.', 'Nokomis told a story.'];
  const WHO = ['The dog', 'My sister', 'Grandma', 'The loon', 'Omar', 'The bus', 'The baby', 'Our teacher', 'A beaver', 'Jun', 'The wind', 'My cousin', 'The frog', 'Nokomis'];
  const TURN = { 'The soup is hot.': 'Is the soup hot?', 'You are cold.': 'Are you cold?', 'It is time for lunch.': 'Is it time for lunch?', 'The bus is big.': 'Is the bus big?',
    'You like snow.': 'Do you like snow?', 'We can go to the rink.': 'Can we go to the rink?', 'Mei can ride a bike.': 'Can Mei ride a bike?', 'The leaves are red.': 'Are the leaves red?',
    'Kai can swim.': 'Can Kai swim?', 'The pond is frozen.': 'Is the pond frozen?' };
  const asks = s => H.askWords.includes(s.split(' ')[0]);
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const joined = (a, b) => a.replace(/\.$/, '') + ' and ' + b;
  V['g1-kind-of'] = (q, m) => text(q.fig) === m.s && H.marked(q) === kind(m.s) ? '' : 'expected ' + kind(m.s) + ' for "' + m.s + '"';
  V['g1-match-kind'] = q => q.pairs.every(p => kind(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g1-pick-kind'] = (q, m) => H.sameSet(q.options.map((o, i) => kind(text(o)) === m.kind ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.kind + ' sentences are not the ones marked';
  V['g1-complete'] = q => { const ok = q.options.map(text).filter(o => FULL.includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the complete sentence'; };
  V['g1-join-and'] = (q, m) => { const want = joined(m.a, m.b); return H.sentenceOk(want) && H.marked(q) === want && q.options.map(text).filter(o => o === want).length === 1 ? '' : 'expected ' + want; };
  V['g1-build-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s === joined(m.a, m.b) && H.sentenceOk(s) ? '' : 'the words make "' + s + '"'; };
  V['g1-tell-ask'] = (q, m) => { const want = /\?$/.test(m.s) ? 'asking' : 'telling'; return asks(m.s) === (want === 'asking') && H.marked(q) === want && m.s.startsWith(text(q.fig)) ? '' : 'expected ' + want; };
  V['g1-turn-ask'] = (q, m) => { const ok = q.options.map(text).filter(o => o === TURN[m.t]); return ok.length === 1 && H.marked(q) === TURN[m.t] && kind(TURN[m.t]) === 'asking' ? '' : 'expected ' + TURN[m.t]; };
  V['g1-tell-ask-tf'] = (q, m) => { const right = (kind(m.s) === 'asking') === (m.said === 'asks'); return text(q.fig) === m.s && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-pick-ask'] = q => H.sameSet(q.options.map((o, i) => asks(text(o)) ? i : -1).filter(i => i >= 0), q.answer) && q.options.every(o => !/[.?!]$/.test(text(o))) ? '' : 'the asking sentences are not the ones marked';
  V['g1-sentence-kind-tf'] = (q, m) => { const right = kind(m.s) === m.kind; return text(q.fig) === m.s && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-complete-tf'] = (q, m) => { const s = m.shown, want = FULL.includes(s) ? 0 : WHO.includes(s.slice(0, -1)) ? 1 : FULL.some(f => f.toLowerCase().endsWith(' ' + s.toLowerCase())) ? 2 : -1;
    return want >= 0 && text(q.fig) === s && q.answer === (want === 0) && q.why.answer === want ? '' : 'the answer does not fit "' + s + '"'; };
  V['g1-who-part'] = (q, m) => { const who = WHO.find(w => m.s.startsWith(w + ' ')), want = m.part === 'who' ? who : m.s.slice(who.length + 1, -1);
    return FULL.includes(m.s) && text(q.tiles[q.answer]) === want && q.tiles.length === 2 ? '' : 'expected ' + want; };
  V['g1-finish-it'] = (q, m) => { const ok = q.options.map(text).filter(o => FULL.includes(m.who + ' ' + o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the words that finish it'; };
  V['g1-join-tf'] = (q, m) => { const want = joined(m.a, m.b), s = m.shown, why = s === want ? 0 : /\. and /.test(s) ? 1 : !/[.?!]$/.test(s) ? 2 : -1;
    return why >= 0 && q.answer === (why === 0) && q.why.answer === why && text(q.fig).endsWith(s) ? '' : 'the answer does not fit "' + s + '"'; };
  V['g1-join-word'] = (q, m) => { const f = text(q.fig); return text(q.tiles[q.answer]) === 'and' && f.startsWith(m.a.slice(0, -1)) && f.endsWith(m.b) ? '' : 'expected and'; };
  V['g1-pick-cap'] = q => H.sameSet(q.options.map((o, i) => /^[A-Z]/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences with a capital are not the ones marked';
  V['g1-cap-start'] = (q, m) => { const first = m.s.split(' ')[0]; return text(q.tiles[q.answer]) === first && /^[A-Z][a-z]+$/.test(first) && q.tiles.map(text).filter(t => t === first).length === 1 ? '' : 'expected ' + first; };
})();
