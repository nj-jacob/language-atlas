/* Grade 7 answer checks: word parts (grade7/chapters/word-parts.js). Each one works the answer out again from what the child sees, without the site's code.
   The checker has its own root dictionary and its own spelling rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const ROOT = { port: 'carry', dict: 'say', rupt: 'break', struct: 'build', spect: 'look', aud: 'hear', vis: 'see', ject: 'throw', geo: 'earth', chron: 'time', graph: 'write', bio: 'life' };
  /* the checker's own list of words and the roots in them */
  const WORDS = ('transport portable export import predict dictate contradict verdict erupt interrupt disrupt rupture construct structure instruct destruction ' +
    'inspect spectator respect spectacle audience audible audio auditorium visible vision visual invisible project reject eject inject geology geometry geothermal ' +
    'chronological chronicle chronic autograph paragraph graphic photograph biology biome biosphere').split(' ');
  const rootsIn = w => WORDS.includes(w) ? Object.keys(ROOT).filter(r => w.includes(r)) : null;
  const meansIn = w => (rootsIn(w) || []).map(r => ROOT[r]);
  V['g7-root-meaning'] = (q, m) => mk(q) === ROOT[m.root] && text(q.q).includes(m.root) && text(q.fig).split(' ').every(w => rootsIn(w).includes(m.root)) ? '' : 'expected ' + ROOT[m.root];
  V['g7-root-which'] = (q, m) => { const ok = q.tiles.map(text).filter(t => meansIn(t).includes(m.mean)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one word with a root meaning ' + m.mean; };
  V['g7-root-match'] = q => q.pairs.every(p => ROOT[text(p[0])] === text(p[1])) ? '' : 'a root is matched to the wrong meaning';
  V['g7-root-tf'] = (q, m) => {
    const w = text(q.fig).split(' ')[0];
    if (!rootsIn(w) || !rootsIn(w).includes(m.root)) return 'the word does not have the root';
    return (ROOT[m.root] === m.said) === q.answer && text(q.why.options[q.why.answer]) === m.root + ' means ' + ROOT[m.root] + '.' ? '' : 'true/false is wrong';
  };
  V['g7-root-family'] = (q, m) => H.sameSet(q.options.map((o, i) => (rootsIn(text(o)) || []).includes(m.root) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the family words are not the ones marked';

  /* prefixes and suffixes the checker knows, and its own list of what each analyzed word means */
  const MEANING = { transport: 'carry across', export: 'carry out of a country', interrupt: 'break in between', erupt: 'break out', predict: 'say before it happens',
    contradict: 'say the opposite', inspect: 'look into closely', reject: 'throw back, or turn down', construct: 'build by putting parts together', audible: 'able to be heard',
    visible: 'able to be seen', portable: 'able to be carried', spectator: 'a person who watches', geology: 'the study of the earth', biology: 'the study of life' };
  const PRE = { trans: 'across', ex: 'out', inter: 'between', e: 'out', pre: 'before', contra: 'against', in: 'into', re: 'back', con: 'together' };
  const wordFor = mean => Object.keys(MEANING).find(w => MEANING[w] === mean);
  V['g7-word-meaning'] = (q, m) => mk(q) === MEANING[m.word] && text(q.q).includes(m.word) ? '' : 'expected ' + MEANING[m.word];
  V['g7-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return b === wordFor(m.mean) ? '' : 'built ' + b + ' for ' + m.mean; };
  V['g7-which-part'] = (q, m) => {
    const t = mk(q), byRoot = ROOT[t] === m.mean, byPre = PRE[t] === m.mean && m.word.startsWith(t);
    return (byRoot && m.word.includes(t)) || byPre ? '' : 'the part marked does not mean ' + m.mean;
  };
  const CTX = { audible: 'able to be heard', visible: 'able to be seen', portable: 'able to be carried', interrupt: 'break in while someone is talking', inspect: 'look at closely',
    reject: 'turn down', spectators: 'people who watch', chronological: 'in time order', geothermal: 'heat from the earth', predict: 'say before it happens' };
  V['g7-in-context'] = (q, m) => mk(q) === CTX[m.word] && text(q.fig).includes(m.word) ? '' : 'expected ' + CTX[m.word];

  /* spelling: the checker's own rules. Stress on the last beat (so the consonant doubles) is its own list. */
  const STRESS_LAST = ['occur', 'begin', 'admit', 'regret', 'permit'];
  const vowel = c => 'aeiou'.includes(c);
  function spell(b, s) {
    const last = b.slice(-1), before = b.slice(-2, -1);
    if (last === 'e' && vowel(s[0])) return b.slice(0, -1) + s;
    if (last === 'y' && !vowel(before) && s[0] !== 'i') return b.slice(0, -1) + 'i' + s;
    if (vowel(s[0]) && !vowel(last) && vowel(before) && !vowel(b.slice(-3, -2)) && STRESS_LAST.includes(b)) return b + last + s;
    return b + s;
  }
  const ruleOf = (b, s) => { const w = spell(b, s); return w === b + s ? (b.endsWith('e') ? 'Keep the e.' : b.endsWith('y') ? 'Keep the y.' : 'Just add the suffix.') : w.length > b.length + s.length ? 'Double the last consonant.' : b.endsWith('e') ? 'Drop the silent e.' : 'Change y to i.'; };
  V['g7-add-suffix'] = (q, m) => mk(q) === spell(m.base, m.suf) ? '' : 'expected ' + spell(m.base, m.suf);
  V['g7-spell-choose'] = (q, m) => mk(q) === spell(m.base, m.suf) ? '' : 'expected ' + spell(m.base, m.suf);
  V['g7-which-rule'] = (q, m) => mk(q) === ruleOf(m.base, m.suf) ? '' : 'expected "' + ruleOf(m.base, m.suf) + '"';
  /* every right spelling the chapter uses, worked out by the rules above */
  const PAIRS = [['create', 'ion'], ['value', 'able'], ['hope', 'ing'], ['amaze', 'ing'], ['believe', 'able'], ['manage', 'ment'], ['excite', 'ment'], ['complete', 'ly'], ['occur', 'ed'], ['begin', 'ing'],
    ['admit', 'ed'], ['regret', 'able'], ['permit', 'ed'], ['visit', 'ed'], ['open', 'ing'], ['limit', 'ed'], ['happen', 'ing'], ['happy', 'ness'], ['rely', 'able'], ['carry', 'ed'], ['beauty', 'ful'],
    ['carry', 'ing'], ['study', 'ing'], ['enjoy', 'ment']];
  const GOOD = new Set(PAIRS.map(p => spell(p[0], p[1])));
  V['g7-spell-pick'] = q => H.sameSet(q.options.map((o, i) => GOOD.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
})();
