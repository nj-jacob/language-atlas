/* Grade 6 answer checks: grammar (grade6/chapters/grammar.js). The checker has its own word list with each word's job in these sentences,
   finds gerunds by the absence of a helping verb, and reads active and passive voice from the word order. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { tired: 'adjective', hikers: 'noun', walked: 'verb', slowly: 'adverb', up: 'preposition', hill: 'noun', She: 'pronoun', quickly: 'adverb', packed: 'verb', warm: 'adjective',
    sweater: 'noun', and: 'conjunction', mittens: 'noun', team: 'noun', practised: 'verb', hard: 'adverb', because: 'conjunction', final: 'noun', was: 'verb', on: 'preposition', Saturday: 'noun',
    Amara: 'noun', carefully: 'adverb', placed: 'verb', fragile: 'adjective', vase: 'noun', shelf: 'noun', They: 'pronoun', waited: 'verb', patiently: 'adverb', under: 'preposition', old: 'adjective',
    bridge: 'noun', loud: 'adjective', thunder: 'noun', woke: 'verb', us: 'pronoun', but: 'conjunction', nobody: 'pronoun', afraid: 'adjective' };
  const DOES = { noun: 'names a person, place or thing', verb: 'shows an action or being', adjective: 'describes a noun', adverb: 'tells how, when or where', pronoun: 'takes the place of a noun',
    preposition: 'shows where or when', conjunction: 'joins words or ideas' };
  V['g6-tap-job'] = (q, m) => { const fit = q.tiles.map(text).filter(t => JOB[t] === m.job); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the ' + m.job; };
  V['g6-job-of'] = (q, m) => mk(q) === JOB[m.word] ? '' : 'expected ' + JOB[m.word];
  V['g6-match-jobs'] = q => q.pairs.every(p => DOES[text(p[0])] === text(p[1])) ? '' : 'a part of speech is matched wrong';
  V['g6-pick-nouns'] = q => H.sameSet(q.options.map((o, i) => (JOB[text(o)] === 'noun' ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the nouns are not the ones marked';

  /* gerunds: the -ing word is a verb only after a helping verb, with the sentence going on after it */
  const verbHere = s => /\b(is|are|was|were|am) \w+ing \w/.test(s);
  V['g6-gerund-is'] = q => { const v = verbHere(text(q.fig)); return text(q.tiles[q.answer]).startsWith(v ? 'a verb' : 'a noun') ? '' : 'expected ' + (v ? 'a verb' : 'a noun'); };
  V['g6-pick-gerunds'] = q => H.sameSet(q.options.map((o, i) => (!verbHere(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the gerunds are not the ones marked';
  V['g6-find-gerund'] = q => { const t = q.tiles.map(text), s = t.join(' '), ing = t.filter(w => /ing$/.test(w)); return ing.length === 1 && mk(q) === ing[0] && !verbHere(s) ? '' : 'expected the gerund'; };
  V['g6-gerund-tf'] = (q, m) => ((m.claim === 'verb') === verbHere(text(q.fig))) === q.answer ? '' : 'true/false is wrong';

  /* voice: passive when a form of be, an action word, then "by" the doer */
  const isPassive = s => /\b(was|were) [\w ]+ by \w/.test(s);
  const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
  V['g6-which-voice'] = q => mk(q) === (isPassive(text(q.fig)) ? 'passive' : 'active') ? '' : 'the voice is wrong';
  const NAMES = /^(Leila|Grandpa)$/;
  const same = (a, b) => (NAMES.test(a) ? a : lower(a)) === (NAMES.test(b) ? b : lower(b));
  V['g6-to-passive'] = (q, m) => { const s = mk(q), x = s.match(/^(.+?) (was|were) (.+) by (.+)\.$/); return x && same(x[1], m.got) && same(x[4], m.doer) ? '' : 'expected the receiver first and the doer after by'; };
  V['g6-to-active'] = (q, m) => { const s = mk(q); return !isPassive(s) && same(s.slice(0, m.doer.length), m.doer) && s.endsWith(' ' + m.got + '.') ? '' : 'expected the doer first'; };
  V['g6-doer'] = q => { const x = text(q.fig).match(/ by (.+)\.$/); return x && mk(q) === x[1] ? '' : 'expected the doer after by'; };
  V['g6-why-passive'] = (q, m) => { const want = /stolen/.test(m.s) ? 'We do not know who did it.' : /built in/.test(m.s) ? 'Who built it is not important here.' : 'The writer does not want to say who did it.';
    return mk(q) === want ? '' : 'expected ' + want; };
})();
