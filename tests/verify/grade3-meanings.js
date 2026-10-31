/* Grade 3 answer checks: word meanings (grade3/chapters/meanings.js). The checker has its own word pairs and its own clue list. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const pairs = s => s.split(' ').map(p => p.split('/'));
  const SAME = pairs('big/large small/tiny happy/glad fast/quick shut/close begin/start smart/clever cold/chilly shout/yell scared/afraid leap/jump rock/stone gift/present tired/sleepy');
  const OPP = pairs('hot/cold full/empty early/late wet/dry loud/quiet light/heavy push/pull win/lose first/last top/bottom float/sink asleep/awake');
  const other = (list, w) => list.filter(p => p.includes(w)).map(p => p[0] === w ? p[1] : p[0]);
  /* new word: [meaning, the clue] */
  const CLUE = { drowsy: ['sleepy', 'fell asleep'], famished: ['starving', 'ate two bowls'], narrow: ['thin', 'one at a time'], furious: ['angry', 'tipped the bin over again'],
    calm: ['still', 'looked like glass'], gather: ['collect', 'from all over the yard'], timid: ['shy', 'stayed close to his dad'], scalding: ['boiling', 'waited for it to cool'],
    sturdy: ['strong', 'did not tip'], brief: ['short', 'only one minute'], anxious: ['worried', 'hands shook'], soggy: ['wet', 'in the milk'] };
  const onlyOne = (q, fits) => (q.options || q.tiles).map(text).filter(fits).length === 1;

  V['g3-same'] = (q, m) => { const want = other(SAME, m.word); return want.includes(H.marked(q)) && onlyOne(q, t => want.includes(t)) ? '' : 'expected ' + want; };
  V['g3-opposite'] = (q, m) => { const want = other(OPP, m.word); return want.includes(H.marked(q)) && onlyOne(q, t => want.includes(t)) ? '' : 'expected ' + want; };
  V['g3-same-or-opp'] = (q, m) => { const s = other(SAME, m.a).includes(m.b), o = other(OPP, m.a).includes(m.b); return s !== o && H.marked(q) === (s ? 'Same' : 'Opposite') && H.has(q.fig, m.b) ? '' : 'wrong for ' + m.a + ' and ' + m.b; };
  V['g3-match-same'] = q => q.pairs.every(p => other(SAME, text(p[0])).includes(text(p[1]))) ? '' : 'a pair does not mean the same';
  V['g3-match-opp'] = q => q.pairs.every(p => other(OPP, text(p[0])).includes(text(p[1]))) ? '' : 'a pair is not opposite';
  const clue = (q, m, i) => { const c = CLUE[m.word]; if (!c) return 'unknown word ' + m.word; if (!H.has(q.fig, m.word) || !H.has(q.fig, c[1])) return 'the sentence does not show the word and its clue'; return H.marked(q) === c[i] ? '' : 'expected ' + c[i]; };
  V['g3-clue-meaning'] = (q, m) => clue(q, m, 0);
  V['g3-clue-swap'] = (q, m) => clue(q, m, 0);
  V['g3-clue-find'] = (q, m) => clue(q, m, 1);
  V['g3-clue-tf'] = (q, m) => {
    const c = CLUE[m.word];
    if ((m.said === c[0]) !== q.answer) return 'true/false is wrong';
    return text(q.why.options[q.why.answer]).includes(c[1]) ? '' : 'the reason is not the clue';
  };
})();
