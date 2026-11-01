/* Grade 5 answer checks: grammar (grade5/chapters/grammar.js). The checker keeps its own lists: action words, -self words that go with
   each doer, sentences where the -self word only adds emphasis, proper adjectives, and the partner of each pair of joining words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const ACTIONS = ['kicked', 'baked', 'dragged', 'painted', 'mailed', 'planted', 'read', 'fixed', 'caught', 'washed', 'chased', 'built', 'knitted', 'won', 'carried', 'opened'];
  /* the direct object is the words right after the action, up to the next part of the sentence */
  const objectOf = (s, tiles) => { const a = ACTIONS.find(v => s.includes(' ' + v + ' ')); if (!a) return null; const after = s.split(' ' + a + ' ')[1]; return tiles.find(t => after.startsWith(t + ' ')) || null; };
  V['g5-direct-object'] = (q, m) => { const want = objectOf(text(m.s), q.tiles.map(text)); return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g5-do-question'] = (q, m) => { const s = text(m.s), a = ACTIONS.find(v => s.includes(' ' + v + ' ')), after = s.split(' ' + a + ' ')[1];
    const ok = q.options.map(text).filter(o => after.startsWith(o + ' ')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the words right after the action'; };
  const SELF = { I: 'myself', We: 'ourselves', You: 'yourself', Omar: 'himself', Leila: 'herself', 'The kids': 'themselves', 'The cat': 'itself', Hana: 'herself', 'The boys': 'themselves',
    Jun: 'himself', 'The dog': 'itself', 'My aunts': 'themselves' };
  const doer = s => Object.keys(SELF).find(d => s.startsWith(d + ' '));
  V['g5-reflexive'] = (q, m) => { const want = SELF[doer(text(m.s))]; return want && mk(q) === want ? '' : 'expected ' + want; };
  const EMPHASIS = new Set(['The mayor herself cut the ribbon.', 'The chef himself served our soup.', 'We built the canoe ourselves.', 'I painted the fence myself.', 'The players themselves cleaned the rink.',
    'The author herself signed my book.', 'Our principal himself shovelled the walk.', 'You yourself said it was a good idea.', 'The Elders themselves led the drumming.',
    'I myself have never seen a moose.', 'We ourselves planted every tree.', 'The goalie himself scored the winning goal.']);
  V['g5-self-kind'] = (q, m) => mk(q).includes(EMPHASIS.has(text(m.s)) ? '(intensive)' : '(reflexive)') ? '' : 'expected ' + (EMPHASIS.has(text(m.s)) ? 'intensive' : 'reflexive');
  V['g5-self-tf'] = (q, m) => { const e = EMPHASIS.has(text(m.s)); return q.answer === e && text(q.why.options[q.why.answer]).includes(e ? '(intensive)' : '(reflexive)') && !/\bself|selves\b/.test(text(q.fig)) ? '' : 'expected ' + e; };
  const ADJ = { Canada: 'Canadian', Italy: 'Italian', Mexico: 'Mexican', Japan: 'Japanese', Jamaica: 'Jamaican', Ukraine: 'Ukrainian', France: 'French', Korea: 'Korean',
    China: 'Chinese', India: 'Indian', Greece: 'Greek', Brazil: 'Brazilian', Ireland: 'Irish', Germany: 'German', Egypt: 'Egyptian', Australia: 'Australian' };
  V['g5-proper-adj'] = (q, m) => { const ok = q.options.map(text).filter(o => o.includes(' ' + ADJ[m.place] + ' ')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the capital ' + ADJ[m.place]; };
  V['g5-adj-from'] = (q, m) => mk(q) === ADJ[m.place] ? '' : 'expected ' + ADJ[m.place];
  const PARTNER = { either: 'or', neither: 'nor', both: 'and', 'not only': 'but also' };
  const first = s => ['not only', 'neither', 'either', 'both'].find(p => new RegExp('\\b' + p + '\\b', 'i').test(s));
  V['g5-correlative'] = (q, m) => { const want = PARTNER[first(text(m.s))]; return mk(q) === want ? '' : 'expected ' + want; };
  V['g5-match-pairs'] = q => q.pairs.every(p => PARTNER[text(p[0])] === text(p[1])) ? '' : 'a pair is matched wrong';
  const after = s => { const a = ACTIONS.find(v => s.includes(' ' + v + ' ')); return a ? { a, rest: s.split(' ' + a + ' ')[1] } : null; };
  V['g5-do-tf'] = (q, m) => { const x = after(text(m.s)), obj = x.rest.startsWith(m.said + ' '); return obj === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said; };
  V['g5-do-ask'] = (q, m) => mk(q) === after(text(m.s)).a + ' what?' ? '' : 'expected "' + after(text(m.s)).a + ' what?"';
  /* reflexive: the doer's -self word, from the checker's own list */
  V['g5-reflexive-right'] = (q, m) => { const want = text(m.s).replace('___', SELF[doer(text(m.s))]); return mk(q) === want ? '' : 'expected ' + want; };
  V['g5-reflexive-tf'] = (q, m) => (SELF[doer(text(m.s))] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said;
  V['g5-self-match'] = q => q.pairs.every(p => SELF[text(p[0])] === text(p[1])) ? '' : 'a doer is matched to the wrong -self word';
  V['g5-which-intensive'] = q => { const ok = q.options.map(text).filter(o => EMPHASIS.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with emphasis'; };
  V['g5-pick-intensive'] = q => H.sameSet(q.options.map((o, i) => EMPHASIS.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the emphasis sentences are not the ones marked';
  /* proper adjectives */
  V['g5-cap-tap'] = (q, m) => mk(q) === ADJ[m.place].toLowerCase() ? '' : 'expected ' + ADJ[m.place].toLowerCase();
  V['g5-adj-match'] = q => q.pairs.every(p => ADJ[text(p[0])] === text(p[1])) ? '' : 'a place is matched wrong';
  V['g5-adj-tf'] = (q, m) => { const ok = text(m.s).includes(' ' + ADJ[m.place] + ' '); return ok === q.answer && q.why.answer === (ok ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s; };
  /* correlative: the first word of a pair, from its second */
  const FIRST = { or: 'either', nor: 'neither', and: 'both', 'but also': 'not only' };
  V['g5-corr-first'] = (q, m) => mk(q).toLowerCase() === FIRST[m.second] ? '' : 'expected ' + FIRST[m.second];
  V['g5-corr-tf'] = (q, m) => (PARTNER[first(text(m.s))] === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.said;
})();
