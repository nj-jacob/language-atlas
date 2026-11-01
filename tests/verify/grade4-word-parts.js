/* Grade 4 answer checks: word parts (grade4/chapters/word-parts.js). Each one works the answer out again from what the child sees,
   with the checker's own word lists. Return '' when the marked answer is right, or a short message saying what is wrong. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  /* the checker's own bases: a word only has a prefix if a real base word is left */
  const BASE = new Set(('agree like honest obey trust loyal approve allow spell read judge behave count hear label use ' +
    'heat view pay test wash cook order set connect appear lead match pack mix').split(' '));
  const SAYS = { dis: b => 'not ' + b, mis: b => b + ' wrongly', pre: b => b + ' before' };
  const split = w => { const p = w.slice(0, 3), b = w.slice(3); return SAYS[p] && BASE.has(b) ? { p, b } : null; };
  const meaningOf = w => { const s = split(w); return s ? SAYS[s.p](s.b) : null; };
  const wordFor = m => { const x = m.match(/^not (\w+)$/) ? ['dis', m.slice(4)] : m.match(/ wrongly$/) ? ['mis', m.slice(0, -8)] : m.match(/ before$/) ? ['pre', m.slice(0, -7)] : null; return x ? x[0] + x[1] : null; };
  const once = (list, want) => list.filter(x => x === want).length === 1;

  V['g4-wp-meaning'] = (q, m) => { const want = meaningOf(m.word), opts = q.options.map(text);
    if (!want) return m.word + ' has no prefix the checker knows';
    return text(q.q).includes(m.word) && opts[q.answer] === want && once(opts, want) ? '' : 'expected "' + want + '"'; };
  V['g4-wp-which'] = (q, m) => { const want = wordFor(m.mean), tiles = q.tiles.map(text);
    return tiles[q.answer] === want && tiles.filter(t => meaningOf(t) === m.mean).length === 1 ? '' : 'expected ' + want; };
  V['g4-wp-match'] = q => q.pairs.every(p => meaningOf(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g4-wp-tf'] = (q, m) => {
    if (!H.has(q.fig, m.word) || !H.has(q.fig, m.said)) return 'the sentence is not shown';
    if ((meaningOf(m.word) === m.said) !== q.answer) return 'true/false is wrong for ' + m.word + ' = ' + m.said;
    const why = text(q.why.options[q.why.answer]); return why.startsWith(split(m.word).p + '-') ? '' : 'the reason does not fit';
  };
  V['g4-wp-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return b === wordFor(m.mean) && meaningOf(b) === m.mean ? '' : 'built ' + b + ' for ' + m.mean; };
  V['g4-wp-real'] = (q, m) => { const good = q.options.map((o, i) => { const s = split(text(o)); return s && s.p === m.pre ? i : -1; }).filter(i => i >= 0);
    return H.sameSet(good, q.answer) ? '' : 'the words with the prefix are not the ones marked'; };

  /* suffixes: the checker's own lists of describing words and action words, and how "can be" reads */
  const DESCRIBE = new Set('kind dark sad soft fair loud bright calm thick weak'.split(' '));
  const ACTION = new Set('move pay enjoy agree amaze place treat state pave ship'.split(' '));
  const CANBE = { wash: 'washed', break: 'broken', fix: 'fixed', fold: 'folded', bend: 'bent', read: 'read', print: 'printed', stack: 'stacked', wear: 'worn', eat: 'eaten', lift: 'lifted', drink: 'drunk' };
  const naming = b => DESCRIBE.has(b) ? b + 'ness' : ACTION.has(b) ? b + 'ment' : null;
  const baseOf = w => { const x = w.match(/^(\w+?)(able|ness|ment)$/); return x && (CANBE[x[1]] || DESCRIBE.has(x[1]) || ACTION.has(x[1])) ? x[1] : null; };
  V['g4-able'] = (q, m) => { const b = m.word.replace(/able$/, ''); return CANBE[b] && H.marked(q) === 'can be ' + CANBE[b] ? '' : 'expected can be ' + CANBE[b]; };
  V['g4-able-which'] = (q, m) => { const b = Object.keys(CANBE).find(k => 'can be ' + CANBE[k] === m.mean); return b && H.marked(q) === b + 'able' ? '' : 'expected ' + b + 'able'; };
  V['g4-ness-ment'] = (q, m) => text(q.tiles[q.answer]) === naming(m.base).slice(m.base.length) ? '' : 'expected ' + naming(m.base);
  V['g4-ness-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return b === naming(m.base) ? '' : 'built ' + b; };
  V['g4-able-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''), base = b.replace(/able$/, ''); return /able$/.test(b) && 'can be ' + CANBE[base] === m.mean ? '' : 'built ' + b; };
  V['g4-able-tf'] = (q, m) => { const b = m.word.replace(/able$/, ''); return q.answer === (m.said === 'can be ' + CANBE[b]) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.word; };
  V['g4-ness-tf'] = (q, m) => q.answer === (naming(baseOf(m.word) || m.word.replace(/(ness|ment)$/, '')) === m.word) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;
  V['g4-suf-match'] = q => q.pairs.every(p => baseOf(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong base';
  V['g4-suf-sort'] = q => H.sameSet(q.options.map((o, i) => DESCRIBE.has(baseOf(text(o))) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words made from describing words are not the ones marked';

  /* word parts in a sentence: the checker's own key */
  const CTX = { dislike: 'not like', misplaced: 'put in the wrong place', washable: 'can be washed', kindness: 'being kind', preview: 'a look before', dishonest: 'not honest',
    prepay: 'pay before', darkness: 'being dark', misbehave: 'behave wrongly', agreement: 'the act of agreeing',
    preheat: 'heat before', sadness: 'being sad', payment: 'the act of paying', misread: 'read wrongly', disobey: 'not obey', stackable: 'can be stacked' };
  const CBASE = { dislike: 'like', misplaced: 'placed', washable: 'wash', kindness: 'kind', preview: 'view', dishonest: 'honest', prepay: 'pay', darkness: 'dark', misbehave: 'behave', agreement: 'agree',
    preheat: 'heat', sadness: 'sad', payment: 'pay', misread: 'read', disobey: 'obey', stackable: 'stack' };
  V['g4-ctx'] = (q, m) => H.has(q.fig, m.word) && H.marked(q) === CTX[m.word] ? '' : 'expected ' + CTX[m.word];
  V['g4-ctx-base'] = (q, m) => H.marked(q) === CBASE[m.word] ? '' : 'expected the base ' + CBASE[m.word];
  V['g4-ctx-which'] = (q, m) => { const w = Object.keys(CTX).find(k => CTX[k] === m.mean); return H.marked(q) === w && q.tiles.map(text).filter(t => CTX[t] === m.mean).length === 1 ? '' : 'expected ' + w; };
  V['g4-ctx-tf'] = (q, m) => (CTX[m.word] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word;
})();
