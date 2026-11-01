/* Grade 4 answer checks: sentences (grade4/chapters/sentences.js). Worked out from the sentence the child sees, with the checker's
   own lists of joining words, clause starters and prepositions. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* compound: two complete sentences joined by a comma and a joining word. In these sentences, a comma before and, but, so or or
     only ever joins two sentences. */
  const isCompound = s => /, (and|but|so|or) \w+ \w+/.test(s);
  V['g4-simple-compound'] = (q, m) => text(q.tiles[q.answer]) === (isCompound(m.s) ? 'compound' : 'simple') && H.has(q.fig, m.s) ? '' : 'expected ' + (isCompound(m.s) ? 'compound' : 'simple');
  /* the checker's own key: which idea each first sentence leads to */
  const JOIN = { 'The snow was deep': 'so', 'Kai wanted to skate': 'but', 'Noor plays the drums': 'and', 'We can walk to the park': 'or', 'The wind was strong': 'so', 'Mateo likes soup': 'but',
    'Grandma baked bannock': 'and', 'You can read a book': 'or', 'It started to rain': 'so', 'The trail was long': 'but',
    'The lake froze': 'so', 'Ella likes cats': 'but', 'Sam packed apples': 'and', 'We can paint': 'or' };
  const JOB = { and: 'adds another idea', but: 'shows a difference', so: 'shows what happened because of it', or: 'gives a choice' };
  V['g4-pick-compound'] = q => H.sameSet(q.options.map((o, i) => isCompound(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the compound sentences are not the ones marked';
  V['g4-word-job'] = (q, m) => H.marked(q) === JOB[JOIN[m.s]] && H.has(q.fig, JOIN[m.s]) ? '' : 'expected ' + JOB[JOIN[m.s]];
  V['g4-join-tf'] = (q, m) => (JOIN[m.s] === m.w) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.w;
  V['g4-join-match'] = q => q.pairs.every(p => JOB[text(p[0])] === text(p[1])) ? '' : 'a word is matched to the wrong job';
  V['g4-join-word'] = (q, m) => H.marked(q) === JOIN[m.s] ? '' : 'expected ' + JOIN[m.s];
  const good = s => { const x = s.match(/^([A-Z][^,.]+), (and|but|so|or) ([A-Za-z][^,.]+)\.$/); return !!x && JOIN[x[1]] === x[2]; };
  V['g4-combine'] = q => { const ok = q.options.map(text).filter(good); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with a comma before the joining word'; };
  V['g4-order-compound'] = q => good(q.items.map(text).join(' ')) ? '' : 'the parts in order do not make a compound sentence';
  V['g4-tf-compound'] = (q, m) => good(m.s) === q.answer && /comma goes before/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for ' + m.s;
  const SUB = /^(When|Because|Although|If|After|Before|While|Since|because|when|although|if|after|before|while|since)\b/;
  const PREP = /^(in|on|under|over|after|before|beside|at|during|across|behind|near)\b/i;
  /* complete: a clause starter, a comma, then a clause that does not start with a starter or a preposition */
  const completeS = s => { const x = s.match(/^([^,]+), (.+)\.$/); return !!x && SUB.test(x[1]) && !SUB.test(x[2]) && !PREP.test(x[2]); };
  V['g4-complete'] = q => { const ok = q.options.map(text).filter(completeS); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the complete sentence'; };
  V['g4-tap-dependent'] = q => { const ok = q.tiles.map(text).filter(t => SUB.test(t)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the part that starts with a clause word'; };
  V['g4-finish'] = (q, m) => { const ok = q.options.map(text).filter(o => !SUB.test(o) && !PREP.test(o)); return ok.length === 1 && H.marked(q) === ok[0] && completeS(m.s + ', ' + ok[0]) ? '' : 'expected the ending that can stand alone'; };
  V['g4-tf-fragment'] = (q, m) => completeS(m.s) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g4-order-clause'] = q => completeS(q.items.map(text).join(' ')) ? '' : 'the parts in order do not make a complete sentence';
  /* prepositional phrases: a preposition starts them; time words make a "when" phrase */
  const TIME = /school|lunch|October|six|storm|morning|night/;
  V['g4-tap-phrase'] = q => { const ok = q.tiles.map(text).filter(t => PREP.test(t)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the part that starts with a preposition'; };
  V['g4-where-when'] = (q, m) => H.marked(q) === (TIME.test(m.phrase) ? 'when' : 'where') ? '' : 'expected ' + (TIME.test(m.phrase) ? 'when' : 'where');
  V['g4-add-phrase'] = (q, m) => { const ok = q.options.map(text).filter(o => PREP.test(o) && (TIME.test(o) ? 'when' : 'where') === m.kind); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected a phrase that tells ' + m.kind; };
  V['g4-pick-phrases'] = q => H.sameSet(q.options.map((o, i) => PREP.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the phrases marked are not the prepositional phrases';
})();
