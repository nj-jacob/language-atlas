/* Grade 7 answer checks: thinking critically (grade7/chapters/thinking.js). Own answer key for each passage, checked against the words in the passage shown. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return text(d.textContent); };
  V['g7-foreshadow'] = q => mk(q) === 'the lace kept slipping loose' && card(q).includes('lace whipped') ? '' : 'expected the early detail about the lace';
  V['g7-symbol'] = q => /grandfather's support/.test(mk(q)) && card(q).includes('compass') ? '' : 'expected the grandfather\'s support';
  V['g7-allegory'] = q => /^Sharing resources helps everyone/.test(mk(q)) ? '' : 'expected the lesson about sharing';
  const DEV = { foreshadowing: /dark clouds|Nothing could ever go wrong/, symbolism: /wilting plant|broken watch/, allegory: /songbirds|Two villages/ };
  V['g7-device-name'] = (q, m) => DEV[mk(q)] && DEV[mk(q)].test(text(m.s)) ? '' : 'the device marked does not fit';
  const WHAT = { foreshadowing: 'an early hint', symbolism: 'an object or image', allegory: 'a whole story' };
  V['g7-device-match'] = q => q.pairs.every(p => text(p[1]).startsWith(WHAT[text(p[0])])) ? '' : 'a device is matched wrong';
  /* inference questions: question -> [answer, the clue words in the passage] */
  const INFER = { 'How does the narrator feel after stumbling?': ['embarrassed', 'my face burning'], 'What does Coach value most?': ['not giving up', 'who gets back up'],
    'How does Arjun feel when he starts at the new school?': ['nervous', 'held the compass'], 'How does Arjun feel by winter?': ['settled and confident', 'no longer needed'] };
  V['g7-local'] = (q, m) => { const f = INFER[m.q]; return f && mk(q) === f[0] && card(q).includes(f[1]) ? '' : 'expected ' + (f && f[0]); };
  V['g7-evidence-line'] = (q, m) => { const f = INFER[m.q], ok = q.options.map(text).filter(o => o.includes(f[1])); return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence with the clue is not the one marked'; };
  const THEME = { 'The Tryout': 'Getting back up', "Grandfather's Compass": 'help us find our way' };
  V['g7-global'] = (q, m) => mk(q).includes(THEME[text(m.t)]) ? '' : 'expected the theme about "' + THEME[text(m.t)] + '"';
  /* a synthesis that uses both sources */
  const SYN = { 'A school survey': 'A quiet space could help many students', 'Ice roads now stay open': 'raising the cost of supplies', 'Monarch butterflies lay': 'fewer monarchs' };
  V['g7-synthesize'] = (q, m) => { const k = Object.keys(SYN).find(x => m.a.startsWith(x)); return mk(q).includes(SYN[k]) ? '' : 'expected the conclusion that uses both sources'; };
  const REL = /temperatures|Thinner ice|melts weeks sooner/;
  V['g7-relevant-info'] = q => H.sameSet(q.options.map((o, i) => REL.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the relevant facts are not the ones marked';
  V['g7-position'] = q => mk(q) === 'The school should open a quiet room.' && card(q).includes('A quiet room') ? '' : 'expected the writer\'s position';
  V['g7-other-side'] = q => mk(q) === 'Students might skip class in the room.' && card(q).includes('skip class') ? '' : 'expected the other position';
  V['g7-message'] = q => /feel they belong/.test(mk(q)) && card(q).includes('they belong here') ? '' : 'expected the message about belonging';
  /* loaded words the checker looks for; a neutral sentence has none */
  const LOADED = /\b(greedy|destroy|Lazy|waste|brilliant|finally|terrible|fool)\b/i;
  V['g7-neutral'] = q => { const ok = q.options.map(text).filter(o => !LOADED.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with no loaded words'; };
  V['g7-loaded'] = (q, m) => { const words = mk(q).split(/, | /).filter(w => w.length > 3); return words.length && words.every(w => text(m.s).includes(w)) && words.some(w => LOADED.test(w)) ? '' : 'the words marked are not the loaded words in the sentence'; };
  const FAIR = /^(Present more than one side|Use neutral words|Include the voices)/;
  V['g7-avoid-bias'] = q => H.sameSet(q.options.map((o, i) => FAIR.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the fair ways are not the ones marked';
})();
