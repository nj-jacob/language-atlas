/* Grade 6 answer checks: roots and spelling (grade6/chapters/word-study.js). Each one works the answer out again from what the child sees,
   with the checker's own word lists and its own spelling rules, without the site's code. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  /* the checker's own roots and their meanings */
  const ROOT = { port: 'carry', spect: 'look', dict: 'say', struct: 'build', rupt: 'break', aud: 'hear', vis: 'see', graph: 'write', bio: 'life',
    therm: 'heat', phon: 'sound', aqua: 'water', tract: 'pull', ject: 'throw' };
  const rootsIn = w => Object.keys(ROOT).filter(r => w.includes(r));
  const meanOf = w => { const r = rootsIn(w); return r.length === 1 ? ROOT[r[0]] : null; };
  V['g6-root-mean'] = (q, m) => { const want = meanOf(m.word); return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g6-tap-root'] = (q, m) => { const t = q.tiles.map(text), inWord = t.filter(x => m.word.includes(x) && ROOT[x]); return inWord.length === 1 && mk(q) === inWord[0] ? '' : 'expected the root of ' + m.word; };
  V['g6-pick-root'] = (q, m) => H.sameSet(q.options.map((o, i) => (rootsIn(text(o)).includes(m.root) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the words with ' + m.root + ' are not the ones marked';
  V['g6-match-roots'] = q => q.pairs.every(p => ROOT[text(p[0])] === text(p[1])) ? '' : 'a root is matched to the wrong meaning';
  V['g6-word-for'] = (q, m) => { const t = q.tiles.map(text), fit = t.filter(x => meanOf(x) === m.mean); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the word whose root means ' + m.mean; };

  /* prefixes: the checker's own list of prefixes and the bases or roots that may follow them */
  const PRE = { inter: 'between', sub: 'under or below', pre: 'before', mis: 'wrongly', anti: 'against', trans: 'across' };
  const AFTER = new Set('act city provincial connect zero heading way marine heat view pay school read spell judge count freeze bacterial war virus atlantic continental pacific plant order wash use'.split(' '));
  const split = w => { const p = Object.keys(PRE).find(x => w.startsWith(x)); return p && AFTER.has(w.slice(p.length)) ? { p, b: w.slice(p.length) } : null; };
  V['g6-pre-mean'] = (q, m) => { const s = split(m.word); return s && mk(q) === PRE[s.p] ? '' : 'expected the meaning of the prefix in ' + m.word; };
  V['g6-pre-match'] = q => q.pairs.every(p => { const s = split(text(p[0])); return s && PRE[s.p] === text(p[1]); }) ? '' : 'a word is matched to the wrong meaning';
  V['g6-pre-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => { const s = split(text(o)); return s && s.p === m.pre ? i : -1; }).filter(i => i >= 0), q.answer) ? '' : 'the words with the prefix are not the ones marked';
  V['g6-pre-build'] = (q, m) => { const w = q.answer.map(i => text(q.parts[i])).join(''), s = split(w); return s && s.b + ' ' + PRE[s.p] === m.mean ? '' : 'built ' + w + ' for ' + m.mean; };
  V['g6-pre-tf'] = (q, m) => { const s = split(m.word); return s && (PRE[s.p] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word; };

  /* spelling: the checker's own rules for adding a suffix */
  const STRESS_LAST = new Set(['begin', 'admit', 'forget', 'refer', 'occur', 'permit', 'prefer', 'regret', 'commit']);
  const beats = w => (w.match(/[aeiouy]+/g) || []).length;
  const rule = (b, f) => {
    if (/e$/.test(b) && /^[aeiou]/.test(f)) return 'drop';
    if (/[^aeiou]y$/.test(b) && f[0] !== 'i') return 'y';
    if (/[^aeiou][aeiou][^aeiouwxy]$/.test(b) && /^[aeiou]/.test(f) && (beats(b) === 1 || STRESS_LAST.has(b))) return 'dbl';
    return 'add';
  };
  const spell = (b, f) => ({ drop: b.slice(0, -1) + f, y: b.slice(0, -1) + 'i' + f, dbl: b + b.slice(-1) + f, add: b + f })[rule(b, f)];
  const RULE = { drop: 'Drop the silent e.', y: 'Change y to i.', dbl: 'Double the last letter.', add: 'Just add it.' };
  const PAIRS = [['hope', 'ing'], ['write', 'ing'], ['value', 'able'], ['adore', 'able'], ['create', 'ion'], ['fame', 'ous'], ['arrive', 'al'], ['believe', 'able'], ['happy', 'ness'],
    ['carry', 'ed'], ['beauty', 'ful'], ['busy', 'ly'], ['rely', 'able'], ['heavy', 'est'], ['study', 'ed'], ['plan', 'ed'], ['swim', 'er'], ['big', 'est'], ['begin', 'ing'],
    ['admit', 'ed'], ['forget', 'able'], ['refer', 'ed'], ['hope', 'ful'], ['move', 'ment'], ['safe', 'ty'], ['carry', 'ing'], ['study', 'ing'], ['open', 'ing'], ['visit', 'ed'], ['happen', 'ed']];
  const RIGHT = new Set(PAIRS.map(p => spell(p[0], p[1])));
  V['g6-add-suffix'] = (q, m) => { const want = spell(m.base, m.suf); return mk(q) === want ? '' : 'expected ' + want; };
  V['g6-which-rule'] = (q, m) => mk(q) === RULE[rule(m.base, m.suf)] ? '' : 'expected ' + RULE[rule(m.base, m.suf)];
  V['g6-pick-spelled'] = q => H.sameSet(q.options.map((o, i) => (RIGHT.has(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the words spelled right are not the ones marked';
  V['g6-spell-tf'] = (q, m) => (spell(m.base, m.suf) === m.shown) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
  /* -able after a whole word, -ible after a part that is not a word */
  const WORDS = new Set('read comfort depend break wash agree enjoy afford'.split(' '));
  V['g6-able-ible'] = (q, m) => text(q.tiles[q.answer]) === (WORDS.has(m.stem) ? 'able' : 'ible') ? '' : 'expected ' + (WORDS.has(m.stem) ? '-able' : '-ible') + ' after ' + m.stem;
})();
