/* Grade 8 answer checks: sentence structure (grade8/chapters/sentences.js).
   Sentence types are worked out by counting clauses: a comma before and, but, or or so joins two independent clauses; a word like
   because or although starts a dependent clause. Run-ons and fragments are found with the checker's own clause and verb lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SUB = /^(because|although|when|after|before|since|while|if|unless|until)\b/i;
  const coords = s => (s.match(/, (and|but|or|so) /g) || []).length;
  const deps = s => s.split(/, /).filter(p => SUB.test(p.trim())).length + (/ (because|although|when|after|before|since|while) /.test(s.replace(/^\w+/, '')) && !/, /.test(s) ? 1 : 0);
  const typeOf = s => { const c = coords(s), d = deps(s); return c && d ? 'compound-complex' : c ? 'compound' : d ? 'complex' : 'simple'; };
  /* the checker's own independent clauses */
  const IND = ['the power went out', 'we lit candles', 'omar finished his essay', 'he forgot to save it', 'the trail was closed', 'we took the long way around', 'leila practised her speech',
    'her brother timed her', 'the team lost the final', 'the fans cheered anyway', 'the lake froze early', 'the skating season began in december', 'mei planted tomatoes',
    'her neighbour planted squash', 'the bus was late', 'we missed the first class'];
  const runOn = s => { const l = s.toLowerCase(); return IND.some(x => IND.some(y => x !== y && (l.includes(x + ' ' + y) || l.includes(x + ', ' + y)))); };
  const joined = s => { const l = s.toLowerCase(); return IND.some(x => IND.some(y => x !== y && [', and ', ', but ', ', so ', ', or ', '; ', '. '].some(j => l.includes(x + j + y)))); };
  const VERB = /\b(went|lit|finished|forgot|was|took|practised|timed|lost|cheered|froze|began|planted|missed|stayed|reached|played|covered)\b/;
  const fragment = s => (SUB.test(s) && !/, /.test(s)) || /^\w+ing\b/.test(s) || !VERB.test(s);
  /* the joining word that makes each pair true: the checker's own key */
  const LINK = { 'the power went out': 'when', 'omar finished his essay': 'after', 'the trail was closed': 'because', 'leila practised her speech': 'before', 'the team lost the final': 'although',
    'the lake froze early': 'since', 'mei planted tomatoes': 'while', 'the bus was late': 'because' };

  V['g8-tap-dep'] = q => SUB.test(mk(q)) && q.tiles.map(text).filter(t => SUB.test(t)).length === 1 ? '' : 'the dependent clause is not the one marked';
  V['g8-clause-kind'] = (q, m) => mk(q) === (SUB.test(m.c) ? 'dependent' : 'independent') ? '' : 'wrong kind for "' + m.c + '"';
  V['g8-stand-alone'] = q => H.sameSet(q.options.map((o, i) => SUB.test(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the independent clauses are not the ones marked';
  /* a relative clause comes right after the noun it describes */
  V['g8-rel-noun'] = (q, m) => { const s = text(m.s), r = s.match(/(\w+),? (who|which|that) /); return r && mk(q) === r[1] ? '' : 'expected ' + (r && r[1]); };
  V['g8-rel-clause'] = (q, m) => /^(who|which|that) /.test(mk(q)) && text(m.s).includes(mk(q)) && q.options.map(text).filter(o => /^(who|which|that) /.test(o)).length === 1 ? '' : 'expected the clause starting with who, which or that';
  V['g8-type'] = (q, m) => mk(q) === typeOf(text(m.s)) ? '' : 'it is ' + typeOf(text(m.s));
  V['g8-which-type'] = (q, m) => typeOf(mk(q)) === m.want && q.options.map(text).filter(o => typeOf(o) === m.want).length === 1 ? '' : 'the marked sentence is ' + typeOf(mk(q));
  V['g8-match-types'] = q => q.pairs.every(p => typeOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong type';
  V['g8-type-tf'] = (q, m) => (typeOf(text(m.s)) === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong: it is ' + typeOf(text(m.s));
  V['g8-combine'] = (q, m) => { const a = m.a.toLowerCase(); return mk(q).toLowerCase().startsWith(a + ' ' + LINK[a] + ' ') ? '' : 'expected the sentence with "' + LINK[a] + '"'; };
  V['g8-fragment'] = q => H.sameSet(q.options.map((o, i) => fragment(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the fragments are not the ones marked';
  V['g8-fix-run-on'] = q => joined(mk(q)) && !runOn(mk(q)) && q.options.map(text).filter(o => joined(o) && !runOn(o)).length === 1 && runOn(text(q.fig)) ? '' : 'the fix marked is not right';
  V['g8-find-run-on'] = q => runOn(mk(q)) && q.options.map(text).filter(runOn).length === 1 ? '' : 'the run-on is not the one marked';
  V['g8-frag-tf'] = (q, m) => ((fragment(text(m.s)) ? 'a fragment' : 'a complete sentence') === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
})();
