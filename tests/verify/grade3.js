/* Grade 3 answer checks. Each one works the answer out again from what the child sees, without the site's code.
   Return '' when the marked answer is right, or a short message saying what is wrong. Keys match meta.k in grade3/chapters/. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* the checker's own word list: base words that can take a prefix. A word only has a prefix if a real base word is left. */
  const BASE = new Set(('happy kind safe fair sure tidy well even true clear ' +
    'paint read fill build write tell play pack heat wash visit check').split(' '));
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
  V['g3-real'] = (q, m) => {
    const good = q.options.map((o, i) => { const s = split(text(o)); return s && s.p === m.pre ? i : -1; }).filter(i => i >= 0);
    return H.sameSet(good, q.answer) ? '' : 'marked ' + q.answer + ' but words with the prefix are ' + good;
  };
})();
