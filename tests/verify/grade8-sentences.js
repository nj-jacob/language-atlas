/* Grade 8 answer checks: sentence structure (grade8/chapters/sentences.js).
   Sentence types are worked out by counting clauses: a comma before and, but, or or so joins two independent clauses; a word like
   because or although starts a dependent clause. Run-ons and fragments are found with the checker's own clause and verb lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);
  const SUB = /^(because|although|when|after|before|since|while|if|unless|until)\b/i;
  const coords = s => (s.match(/, (and|but|or|so) /g) || []).length;
  const deps = s => s.split(/, /).filter(p => SUB.test(p.trim())).length + (/ (because|although|when|after|before|since|while|if) /.test(s.replace(/^\w+/, '')) && !/, /.test(s) ? 1 : 0);
  const typeOf = s => { const c = coords(s), d = deps(s); return c && d ? 'compound-complex' : c ? 'compound' : d ? 'complex' : 'simple'; };
  /* the checker's own independent clauses */
  const IND = ['the power went out', 'we lit candles', 'omar finished his essay', 'he forgot to save it', 'the trail was closed', 'we took the long way around', 'leila practised her speech',
    'her brother timed her', 'the team lost the final', 'the fans cheered anyway', 'the lake froze early', 'the skating season began in december', 'mei planted tomatoes',
    'her neighbour planted squash', 'the bus was late', 'we missed the first class', 'the ferry left early', 'amira had to wait an hour', 'kai studied for the test', 'he still felt nervous',
    'the snow melted', 'the river rose quickly', 'priya joined the choir', 'her cousin joined the band', 'the library opened late', 'students waited on the steps', 'theo forgot his skates',
    'he borrowed a pair from the coach', 'the garden flooded', 'the tomatoes survived', 'we could take the train', 'we could drive to ottawa'];
  const runOn = s => { const l = s.toLowerCase(); return IND.some(x => IND.some(y => x !== y && (l.includes(x + ' ' + y) || l.includes(x + ', ' + y)))); };
  const joined = s => { const l = s.toLowerCase(); return IND.some(x => IND.some(y => x !== y && [', and ', ', but ', ', so ', ', or ', '; ', '. '].some(j => l.includes(x + j + y)))); };
  const VERB = /\b(went|lit|finished|forgot|was|took|practised|timed|lost|cheered|froze|began|planted|missed|stayed|reached|played|covered|left|had|studied|felt|melted|rose|joined|opened|waited|borrowed|flooded|survived|could|gasped|needs|stopped|stood|is|won)\b/;
  const fragment = s => (SUB.test(s) && !/, /.test(s)) || /^\w+ing\b/.test(s) || !VERB.test(s);
  /* the joining word that makes each pair true: the checker's own key */
  const LINK = { 'the power went out': 'when', 'omar finished his essay': 'after', 'the trail was closed': 'because', 'leila practised her speech': 'before', 'the team lost the final': 'although',
    'the lake froze early': 'since', 'mei planted tomatoes': 'while', 'the bus was late': 'because', 'the ferry left early': 'because', 'kai studied for the test': 'although', 'the snow melted': 'when',
    'priya joined the choir': 'after', 'the library opened late': 'because', 'theo forgot his skates': 'before', 'the garden flooded': 'when' };
  const only = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;

  /* clauses */
  V['g8-clause-kind'] = (q, m) => mk(q) === (SUB.test(m.c) ? 'dependent' : 'independent') ? '' : 'wrong kind for "' + m.c + '"';
  V['g8-stand-alone'] = q => H.sameSet(q.options.map((o, i) => SUB.test(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the independent clauses are not the ones marked';
  V['g8-which-ind'] = q => only(q, o => !SUB.test(o)) ? '' : 'the marked clause cannot stand alone';
  V['g8-ind-tf'] = (q, m) => q.answer === (m.says === !SUB.test(m.c)) && why(q, true) ? '' : 'true/false is wrong for "' + m.c + '"';
  V['g8-tap-dep'] = q => SUB.test(mk(q)) && q.tiles.map(text).filter(t => SUB.test(t)).length === 1 ? '' : 'the dependent clause is not the one marked';
  V['g8-sub-word'] = q => { const w = text(q.fig).split(' ')[0]; return SUB.test(w) && mk(q) === w ? '' : 'expected ' + w; };
  V['g8-dep-find'] = q => only(q, o => SUB.test(o)) ? '' : 'the marked part is not the dependent clause';
  V['g8-dep-tf'] = (q, m) => { const right = SUB.test(m.said); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  /* a relative clause comes right after the noun it describes */
  const relOf = s => text(s).match(/(\w+),? (who|which|that) /);
  V['g8-rel-noun'] = (q, m) => { const r = relOf(m.s); return r && mk(q) === r[1] ? '' : 'expected ' + (r && r[1]); };
  V['g8-rel-clause'] = (q, m) => /^(who|which|that) /.test(mk(q)) && text(m.s).includes(mk(q)) && q.options.map(text).filter(o => /^(who|which|that) /.test(o)).length === 1 ? '' : 'expected the clause starting with who, which or that';
  V['g8-rel-word'] = (q, m) => { const r = relOf(m.s); return r && mk(q) === r[2] ? '' : 'expected ' + (r && r[2]); };
  V['g8-rel-tf'] = (q, m) => { const r = relOf(m.s), right = !!r && r[1] === m.said; return q.answer === right && why(q, right) ? '' : 'expected ' + right; };

  /* sentence types */
  V['g8-type'] = (q, m) => mk(q) === typeOf(text(m.s)) ? '' : 'it is ' + typeOf(text(m.s));
  V['g8-which-type'] = (q, m) => only(q, o => typeOf(o) === m.want) ? '' : 'the marked sentence is ' + typeOf(mk(q));
  V['g8-match-types'] = q => q.pairs.every(p => typeOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong type';
  V['g8-type-tf'] = (q, m) => q.answer === (m.says === (typeOf(text(m.s)) === m.said)) && why(q, true) ? '' : 'true/false is wrong: it is ' + typeOf(text(m.s));
  V['g8-compound-comma'] = q => only(q, o => /, (and|but|or|so) /.test(o)) ? '' : 'the comma goes before the joining word';
  V['g8-join-tap'] = q => ['and', 'but', 'or', 'so'].includes(mk(q)) && text(q.fig).includes(', ' + mk(q) + ' ') ? '' : 'the joining word is not the one marked';
  V['g8-combine'] = (q, m) => { const a = m.a.toLowerCase(); return mk(q).toLowerCase().startsWith(a + ' ' + LINK[a] + ' ') ? '' : 'expected the sentence with "' + LINK[a] + '"'; };
  /* dependent clause first: a comma after it; main clause first: no comma */
  V['g8-complex-comma'] = q => only(q, o => SUB.test(o) ? /, /.test(o) : !/, /.test(o)) ? '' : 'the comma rule is broken in the marked sentence';

  /* fragments and run-ons */
  V['g8-fragment'] = q => H.sameSet(q.options.map((o, i) => fragment(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the fragments are not the ones marked';
  V['g8-frag-which'] = q => only(q, fragment) ? '' : 'the marked one is not a fragment';
  /* the fix keeps every word of the fragment and adds what was missing */
  V['g8-fix-frag'] = (q, m) => { const words = s => s.toLowerCase().replace(/[.,]/g, '').split(' '), f = words(text(m.s)), w = words(mk(q));
    return !fragment(mk(q)) && f.every(x => w.includes(x)) && q.options.map(text).filter(o => !fragment(o)).length === 1 ? '' : 'the fix marked is not a complete sentence built on the fragment'; };
  V['g8-frag-tf'] = (q, m) => ((fragment(text(m.s)) ? 'a fragment' : 'a complete sentence') === m.said) === q.answer && why(q, true) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-fix-run-on'] = q => only(q, o => joined(o) && !runOn(o)) && runOn(text(q.fig)) ? '' : 'the fix marked is not right';
  V['g8-find-run-on'] = q => only(q, runOn) ? '' : 'the run-on is not the one marked';
  const runKind = s => joined(s) ? 'joined correctly' : runOn(s) ? (/, /.test(s) ? 'a comma splice' : 'two sentences with no join') : '';
  V['g8-run-on-kind'] = (q, m) => mk(q) === runKind(text(m.s)) ? '' : 'expected ' + runKind(text(m.s));
  V['g8-run-on-tf'] = (q, m) => q.answer === (m.says === runOn(text(m.s))) && why(q, true) ? '' : 'true/false is wrong for ' + m.s;
})();
