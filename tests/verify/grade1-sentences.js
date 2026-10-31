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
  const COMMAND = ['Sit', 'Close', 'Put', 'Wash', 'Bring', 'Please', 'Feed', 'Turn'];
  const kind = s => /\?$/.test(s) ? 'asking' : /!$/.test(s) ? 'strong feeling' : COMMAND.includes(s.split(/[ ,]/)[0]) ? 'command' : 'telling';
  const FULL = ['The dog ran to the park.', 'My sister likes to swim.', 'Grandma baked a pie.', 'The loon dove under the water.', 'Omar kicked the ball.', 'The bus stopped at the corner.'];
  const joined = (a, b) => a.replace(/\.$/, '') + ' and ' + b;
  V['g1-kind-of'] = (q, m) => text(q.fig) === m.s && H.marked(q) === kind(m.s) ? '' : 'expected ' + kind(m.s) + ' for "' + m.s + '"';
  V['g1-match-kind'] = q => q.pairs.every(p => kind(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g1-pick-kind'] = (q, m) => H.sameSet(q.options.map((o, i) => kind(text(o)) === m.kind ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.kind + ' sentences are not the ones marked';
  V['g1-complete'] = q => { const ok = q.options.map(text).filter(o => FULL.includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the complete sentence'; };
  V['g1-join-and'] = (q, m) => { const want = joined(m.a, m.b); return H.sentenceOk(want) && H.marked(q) === want && q.options.map(text).filter(o => o === want).length === 1 ? '' : 'expected ' + want; };
  V['g1-build-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s === joined(m.a, m.b) && H.sentenceOk(s) ? '' : 'the words make "' + s + '"'; };
})();
