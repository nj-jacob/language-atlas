/* Grade 3 answer checks: word parts (grade3/chapters/word-parts.js). Each one works the answer out again from what the child sees, without the site's code.
   Return '' when the marked answer is right, or a short message saying what is wrong. Keys match meta.k in the chapter. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* the checker's own word list: base words that can take a prefix. A word only has a prefix if a real base word is left. */
  const BASE = new Set(('happy kind safe fair sure tidy well even true clear lucky healthy wise real usual finished broken afraid ' +
    'paint read fill build write tell play pack heat wash visit check count use open plant start name join load try set').split(' '));
  const MEANS = { un: 'not', re: 'again' };
  /* split a word into prefix and base, or null when there is no prefix */
  const split = w => { const p = w.slice(0, 2), b = w.slice(2); return MEANS[p] && BASE.has(b) ? { p, b } : null; };
  const meaningOf = w => { const s = split(w); return !s ? null : s.p === 'un' ? 'not ' + s.b : s.b + ' again'; };
  /* "not kind" -> unkind, "paint again" -> repaint */
  const wordFor = m => (/^not /.test(m) ? 'un' + m.slice(4) : / again$/.test(m) ? 're' + m.slice(0, -6) : null);
  const once = (list, want) => list.filter(x => x === want).length === 1;

  V['g3-meaning'] = (q, m) => {
    const want = meaningOf(m.word), opts = q.options.map(text);
    if (!want) return '"' + m.word + '" has no prefix the checker knows';
    if (!text(q.q).includes(m.word)) return 'the question does not show the word';
    return opts[q.answer] === want && once(opts, want) ? '' : 'expected "' + want + '"';
  };
  V['g3-which-word'] = (q, m) => {
    const want = wordFor(m.mean), tiles = q.tiles.map(text);
    if (!text(q.q).includes(m.mean)) return 'the question does not show the meaning';
    return tiles[q.answer] === want && once(tiles, want) && tiles.filter(t => meaningOf(t) === m.mean).length === 1 ? '' : 'expected ' + want;
  };
  V['g3-match'] = q => q.pairs.every(p => meaningOf(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g3-tf'] = (q, m) => {
    if (!text(q.fig).includes(m.word) || !text(q.fig).includes(m.said)) return 'the picture does not show the sentence';
    if ((meaningOf(m.word) === m.said) !== q.answer) return 'true/false is wrong for "' + m.word + ' means ' + m.said + '"';
    const why = text(q.why.options[q.why.answer]), p = split(m.word).p;
    return why.startsWith(p + '-') && why.includes(MEANS[p]) ? '' : 'the reason "' + why + '" does not fit';
  };
  V['g3-build'] = (q, m) => {
    const built = q.answer.map(i => text(q.parts[i])).join('');
    if (!text(q.q).includes(m.mean)) return 'the question does not show the meaning';
    return built === wordFor(m.mean) && meaningOf(built) === m.mean ? '' : 'built "' + built + '" for "' + m.mean + '"';
  };
  V['g3-add'] = (q, m) => {
    const want = wordFor(m.mean).slice(0, 2), tiles = q.tiles.map(text);
    return tiles[q.answer] === want && once(tiles, want) ? '' : 'expected the prefix ' + want;
  };
  V['g3-base'] = (q, m) => {
    const s = split(m.word), tiles = q.tiles.map(text);
    return s && tiles[q.answer] === s.b && once(tiles, s.b) ? '' : 'expected the base word of ' + m.word;
  };
  V['g3-prefix-gap'] = (q, m) => text(q.fig).includes(m.mean.replace(/ again$/, '')) && H.marked(q) === wordFor(m.mean) && q.tiles.map(text).filter(t => meaningOf(t) === m.mean).length === 1 ? '' : 'expected ' + wordFor(m.mean);
  V['g3-sort-prefix'] = (q, m) => { const want = q.options.map((o, i) => (meaningOf(text(o)) || '').split(' ').includes(m.mean) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the words that mean ' + m.mean + ' are not the ones marked'; };
  V['g3-real'] = (q, m) => {
    const good = q.options.map((o, i) => { const s = split(text(o)); return s && s.p === m.pre ? i : -1; }).filter(i => i >= 0);
    return H.sameSet(good, q.answer) ? '' : 'marked ' + q.answer + ' but words with the prefix are ' + good;
  };

  /* suffixes: the checker's own bases, and what each suffix means */
  const SBASE = new Set('help care hope use thank pain fear rest joy cheer home sleep harm colour power play peace wonder truth thought end spot wire cloud speech'.split(' '));
  const sufSplit = w => { const m = w.match(/^(\w+?)(ful|less)$/); return m && SBASE.has(m[1]) ? { b: m[1], s: m[2] } : null; };
  const sufMean = w => { const x = sufSplit(w); return !x ? null : (x.s === 'ful' ? 'full of ' : 'without ') + x.b; };
  const sufWord = m => { const x = m.match(/^(full of|without) (\w+)$/); return x ? x[2] + (x[1] === 'without' ? 'less' : 'ful') : null; };
  V['g3-suf-meaning'] = (q, m) => sufMean(m.word) && H.marked(q) === sufMean(m.word) && text(q.q).includes(m.word) ? '' : 'expected "' + sufMean(m.word) + '"';
  V['g3-suf-which'] = (q, m) => H.marked(q) === sufWord(m.mean) && q.tiles.map(text).filter(t => sufMean(t) === m.mean).length === 1 ? '' : 'expected ' + sufWord(m.mean);
  V['g3-suf-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return b === sufWord(m.mean) && sufMean(b) === m.mean ? '' : 'built ' + b; };
  V['g3-suf-match'] = q => q.pairs.every(p => sufMean(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g3-suf-gap'] = (q, m) => text(q.fig).includes(m.mean) && H.marked(q) === sufWord(m.mean) && q.tiles.map(text).filter(t => sufMean(t) === m.mean).length === 1 ? '' : 'expected ' + sufWord(m.mean);
  V['g3-suf-sort'] = (q, m) => { const want = q.options.map((o, i) => { const x = sufSplit(text(o)); return x && x.s === m.s ? i : -1; }).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the -' + m.s + ' words are not the ones marked'; };
  V['g3-suf-tf'] = (q, m) => {
    if ((sufMean(m.word) === m.said) !== q.answer) return 'true/false is wrong for ' + m.word;
    const why = text(q.why.options[q.why.answer]), s = sufSplit(m.word).s;
    return why.startsWith('-' + s) ? '' : 'the reason does not fit';
  };
})();
