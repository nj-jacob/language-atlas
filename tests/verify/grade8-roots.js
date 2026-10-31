/* Grade 8 answer checks: roots and word parts (grade8/chapters/roots.js). Each one works the answer out again from what the child sees,
   with the checker's own root list and its own spelling rules. Return '' when the marked answer is right, or a short message. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* the checker's own roots: the letters, and a word its meaning must contain */
  const KEY = { port: 'carr', spect: 'look', scope: 'look', dict: 'say', struct: 'build', rupt: 'break', aud: 'hear', vis: 'see', ject: 'throw', script: 'writ', graph: 'writ',
    tele: 'far', phone: 'sound', bio: 'life', geo: 'earth', thermo: 'heat', meter: 'measure', micro: 'small', photo: 'light', manu: 'hand' };
  const rootsIn = w => Object.keys(KEY).filter(r => w.includes(r));
  /* a meaning fits a word when it has the meaning of every root in the word */
  const fits = (word, meaning) => { const rs = rootsIn(word); return rs.length > 0 && rs.every(r => meaning.includes(KEY[r])); };
  const onlyOne = (list, ok) => list.filter(ok).length === 1;

  V['g8-root-meaning'] = (q, m) => { const o = q.options.map(text); return fits(m.word, mk(q)) && onlyOne(o, x => fits(m.word, x)) ? '' : 'the meaning marked does not fit the roots of ' + m.word; };
  V['g8-root-part'] = (q, m) => { const r = mk(q); return KEY[r] && m.mean.includes(KEY[r]) && m.word.includes(r) ? '' : 'the part marked does not mean ' + m.mean; };
  V['g8-root-word'] = (q, m) => { const t = q.tiles.map(text); return fits(mk(q), m.mean) && onlyOne(t, x => fits(x, m.mean)) ? '' : 'the word marked does not fit "' + m.mean + '"'; };
  V['g8-root-match'] = q => q.pairs.every(p => { const r = text(p[0]); return KEY[r] && text(p[1]).startsWith(KEY[r]); }) ? '' : 'a root is matched to the wrong meaning';
  V['g8-root-family'] = (q, m) => { const t = q.tiles.map(text); return mk(q).includes(m.root) && onlyOne(t, x => rootsIn(x).some(r => KEY[r] === KEY[m.root])) ? '' : 'the word marked is not in the ' + m.root + ' family'; };
  V['g8-root-build'] = (q, m) => { const w = q.answer.map(i => text(q.parts[i])).join(''); return fits(w, m.mean) && rootsIn(w).length >= 2 ? '' : 'built "' + w + '" for "' + m.mean + '"'; };
  V['g8-root-tf'] = (q, m) => (text(m.said).includes(KEY[m.root]) === q.answer) ? '' : 'true/false is wrong for ' + m.root + ' = ' + m.said;

  /* word jobs, from the suffix */
  const jobOf = w => /ly$/.test(w) ? 'adverb' : /ive$/.test(w) ? 'adjective' : /ion$/.test(w) ? 'noun' : 'verb';
  /* what a gap needs, from the words around it: a word right after it means it describes that word; after a determiner, a noun; else an adverb */
  const PREP = new Set('at from to for over by of when during about in on with'.split(' '));
  const DET = new Set('the their a an your of some main newest his her our its my'.split(' '));
  const needs = frame => { const [a, b] = frame.split('___'), next = (b.trim().split(/\s+/)[0] || '').replace(/[.,]/g, ''), prev = a.trim().split(/\s+/).pop().toLowerCase();
    if (next && /^[a-z]+$/.test(next) && !PREP.has(next)) return 'adjective'; return DET.has(prev) || /'s$/.test(prev) ? 'noun' : 'adverb'; };
  V['g8-suffix-fit'] = (q, m) => { const want = needs(text(m.frame)), o = q.options.map(text); return jobOf(mk(q)) === want && onlyOne(o, x => jobOf(x) === want) ? '' : 'the gap needs a ' + want; };
  V['g8-suffix-job'] = (q, m) => mk(q) === jobOf(m.word) ? '' : m.word + ' is a ' + jobOf(m.word);
  V['g8-suffix-match'] = q => q.pairs.every(p => jobOf(text(p[0])) === text(p[1])) ? '' : 'a word is matched to the wrong job';
  V['g8-suffix-nouns'] = q => H.sameSet(q.options.map((o, i) => jobOf(text(o)) === 'noun' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the nouns are not the ones marked';
  V['g8-suffix-build'] = (q, m) => { const w = q.answer.map(i => text(q.parts[i])).join(''); return jobOf(w) === m.want ? '' : 'built ' + w + ', not a ' + m.want; };

  /* spelling: the checker's own rules */
  const VOW = /^[aeiou]/, STRESS_END = new Set(['begin', 'admit', 'regret', 'refer', 'commit', 'forget', 'occur', 'permit']);
  const add = (b, s) => {
    if (/e$/.test(b) && VOW.test(s)) return b.slice(0, -1) + s;
    if (/[^aeiou]y$/.test(b) && !/^i/.test(s)) return b.slice(0, -1) + 'i' + s;
    if (STRESS_END.has(b) && VOW.test(s) && /[^aeiou][aeiou][^aeiouwxy]$/.test(b)) return b + b.slice(-1) + s;
    return b + s;
  };
  const inFor = b => /^[bmp]/.test(b) ? 'im' : /^l/.test(b) ? 'il' : /^r/.test(b) ? 'ir' : 'in';
  const GOOD = new Set();
  [['create', 'ion'], ['hope', 'ing'], ['value', 'able'], ['amaze', 'ing'], ['excite', 'ment'], ['use', 'ful'], ['care', 'less'], ['manage', 'ment'], ['happy', 'ness'], ['beauty', 'ful'], ['carry', 'ed'],
    ['busy', 'ly'], ['play', 'ful'], ['enjoy', 'ment'], ['study', 'ing'], ['begin', 'ing'], ['admit', 'ed'], ['regret', 'able'], ['refer', 'al'], ['visit', 'ed'], ['open', 'ing']].forEach(x => GOOD.add(add(x[0], x[1])));
  V['g8-spell'] = (q, m) => mk(q) === add(m.base, m.suf) ? '' : 'expected ' + add(m.base, m.suf);
  V['g8-spell-tf'] = (q, m) => (m.shown === add(m.base, m.suf)) === q.answer && /vowel|consonant|stress/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for ' + m.shown;
  V['g8-spell-pick'] = q => H.sameSet(q.options.map((o, i) => GOOD.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right spellings are not the ones marked';
  V['g8-in-prefix'] = (q, m) => mk(q) === inFor(m.base) ? '' : 'expected ' + inFor(m.base) + '-';
})();
