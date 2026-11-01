/* Grade 6 answer checks: grammar (grade6/chapters/grammar.js). The checker has its own word list with each word's job in these sentences,
   finds gerunds by the absence of a helping verb, and reads active and passive voice from the word order. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const JOB = { tired: 'adjective', hikers: 'noun', walked: 'verb', slowly: 'adverb', up: 'preposition', hill: 'noun', She: 'pronoun', quickly: 'adverb', packed: 'verb', warm: 'adjective',
    sweater: 'noun', and: 'conjunction', mittens: 'noun', team: 'noun', practised: 'verb', hard: 'adverb', because: 'conjunction', final: 'noun', was: 'verb', on: 'preposition', Saturday: 'noun',
    Amara: 'noun', carefully: 'adverb', placed: 'verb', fragile: 'adjective', vase: 'noun', shelf: 'noun', They: 'pronoun', waited: 'verb', patiently: 'adverb', under: 'preposition', old: 'adjective',
    bridge: 'noun', loud: 'adjective', thunder: 'noun', woke: 'verb', us: 'pronoun', but: 'conjunction', nobody: 'pronoun', afraid: 'adjective',
    Ravi: 'noun', gently: 'adverb', lifted: 'verb', injured: 'adjective', bird: 'noun', from: 'preposition', road: 'noun', We: 'pronoun', paddled: 'verb', across: 'preposition', calm: 'adjective',
    lake: 'noun', at: 'preposition', sunrise: 'noun', curious: 'adjective', fox: 'noun', crept: 'verb', silently: 'adverb', toward: 'preposition', tent: 'noun', He: 'pronoun', shovelled: 'verb',
    heavy: 'adjective', snow: 'noun', salted: 'verb', steps: 'noun', Noor: 'noun', sang: 'verb', beautifully: 'adverb', spring: 'adjective', concert: 'noun', Mateo: 'noun', Ella: 'noun',
    cheerfully: 'adverb', cleaned: 'verb', messy: 'adjective', garage: 'noun' };
  const DOES = { noun: 'names a person, place or thing', verb: 'shows an action or being', adjective: 'describes a noun', adverb: 'tells how, when or where', pronoun: 'takes the place of a noun',
    preposition: 'shows where or when', conjunction: 'joins words or ideas' };
  V['g6-tap-job'] = (q, m) => { const fit = q.tiles.map(text).filter(t => JOB[t] === m.job); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the ' + m.job; };
  V['g6-job-of'] = (q, m) => mk(q) === JOB[m.word] ? '' : 'expected ' + JOB[m.word];
  V['g6-match-jobs'] = q => q.pairs.every(p => DOES[text(p[0])] === text(p[1])) ? '' : 'a part of speech is matched wrong';
  V['g6-job-tf'] = (q, m) => q.answer === (JOB[m.word] === m.claim) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.word;
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
  const NAMES = /^(Leila|Grandpa|Mr\. Singh|Aunt Rosa)$/;
  const same = (a, b) => (NAMES.test(a) ? a : lower(a)) === (NAMES.test(b) ? b : lower(b));
  V['g6-to-passive'] = (q, m) => { const s = mk(q), x = s.match(/^(.+?) (was|were) (.+) by (.+)\.$/); return x && same(x[1], m.got) && same(x[4], m.doer) ? '' : 'expected the receiver first and the doer after by'; };
  V['g6-to-active'] = (q, m) => { const s = mk(q); return !isPassive(s) && same(s.slice(0, m.doer.length), m.doer) && s.endsWith(' ' + m.got + '.') ? '' : 'expected the doer first'; };
  V['g6-doer'] = q => { const x = text(q.fig).match(/ by (.+)\.$/); return x && mk(q) === x[1] ? '' : 'expected the doer after by'; };
  V['g6-active-tf'] = (q, m) => q.answer === ((m.claim === 'passive') === isPassive(text(q.fig))) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g6-pick-passive'] = q => H.sameSet(q.options.map((o, i) => isPassive(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the passive sentences are not the ones marked';
  /* a right passive: the receiver first, then was or were, and the doer after by */
  const rightPassive = (s, m) => { const x = s.match(/^(.+?) (was|were) (.+) by (.+)\.$/); return !!x && same(x[1], m.got) && same(x[4], m.doer); };
  V['g6-convert-tf'] = (q, m) => q.answer === rightPassive(m.shown, m) && text(q.fig).includes(m.shown) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g6-build-passive'] = (q, m) => rightPassive(q.items.map(text).join(' '), m) ? '' : 'the cards do not build the passive sentence';
  /* why the passive: the checker's own reasons for each sentence */
  const LOST = 'We do not know who did it.', IDLE = 'Who did it is not important here.', HIDE = 'The writer does not want to say who did it.';
  const WHY = { 'My bike was stolen last night.': LOST, 'The window was broken during the night.': LOST, 'A wallet was found on the bus.': LOST, 'Strange tracks were seen near the cabin.': LOST,
    'The school was built in 1952.': IDLE, 'The roads were plowed early this morning.': IDLE, 'Rice is grown in many countries.': IDLE, 'The mail is delivered every weekday.': IDLE,
    'Mistakes were made.': HIDE, 'The rules were not followed.': HIDE, 'The last cookie was eaten.': HIDE, 'The trophy was dropped, but it is fine.': HIDE };
  V['g6-why-passive'] = (q, m) => mk(q) === WHY[m.s] && text(q.fig) === m.s ? '' : 'expected ' + WHY[m.s];
  V['g6-why-tf'] = (q, m) => q.answer === (WHY[m.s] === m.said) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  V['g6-why-match'] = q => q.pairs.every(p => WHY[text(p[0])] === text(p[1])) ? '' : 'a sentence is matched to the wrong reason';
  V['g6-no-doer'] = q => { const fit = q.options.map(text).filter(o => !/ by /.test(o) && WHY[o]); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the sentence with no doer'; };
})();
