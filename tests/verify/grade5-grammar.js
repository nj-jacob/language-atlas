/* Grade 5 answer checks: grammar (grade5/chapters/grammar.js). The checker keeps its own lists: action words, -self words that go with
   each doer, sentences where the -self word only adds emphasis, proper adjectives, and the partner of each pair of joining words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const ACTIONS = ['kicked', 'baked', 'dragged', 'painted', 'mailed', 'planted', 'read', 'fixed'];
  /* the direct object is the words right after the action, up to the next part of the sentence */
  const objectOf = (s, tiles) => { const a = ACTIONS.find(v => s.includes(' ' + v + ' ')); if (!a) return null; const after = s.split(' ' + a + ' ')[1]; return tiles.find(t => after.startsWith(t + ' ')) || null; };
  V['g5-direct-object'] = (q, m) => { const want = objectOf(text(m.s), q.tiles.map(text)); return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g5-do-question'] = (q, m) => { const s = text(m.s), a = ACTIONS.find(v => s.includes(' ' + v + ' ')), after = s.split(' ' + a + ' ')[1];
    const ok = q.options.map(text).filter(o => after.startsWith(o + ' ')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the words right after the action'; };
  const SELF = { I: 'myself', We: 'ourselves', You: 'yourself', Omar: 'himself', Leila: 'herself', 'The kids': 'themselves', 'The cat': 'itself' };
  const doer = s => Object.keys(SELF).find(d => s.startsWith(d + ' '));
  V['g5-reflexive'] = (q, m) => { const want = SELF[doer(text(m.s))]; return want && mk(q) === want ? '' : 'expected ' + want; };
  const EMPHASIS = new Set(['The mayor herself cut the ribbon.', 'The chef himself served our soup.', 'We built the canoe ourselves.', 'I painted the fence myself.', 'The players themselves cleaned the rink.']);
  V['g5-self-kind'] = (q, m) => mk(q).includes(EMPHASIS.has(text(m.s)) ? '(intensive)' : '(reflexive)') ? '' : 'expected ' + (EMPHASIS.has(text(m.s)) ? 'intensive' : 'reflexive');
  V['g5-self-tf'] = (q, m) => { const e = EMPHASIS.has(text(m.s)); return q.answer === e && text(q.why.options[q.why.answer]).includes(e ? '(intensive)' : '(reflexive)') && !/\bself|selves\b/.test(text(q.fig)) ? '' : 'expected ' + e; };
  const ADJ = { Canada: 'Canadian', Italy: 'Italian', Mexico: 'Mexican', Japan: 'Japanese', Jamaica: 'Jamaican', Ukraine: 'Ukrainian', France: 'French', Korea: 'Korean' };
  V['g5-proper-adj'] = (q, m) => { const ok = q.options.map(text).filter(o => o.includes(' ' + ADJ[m.place] + ' ')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the capital ' + ADJ[m.place]; };
  V['g5-adj-from'] = (q, m) => mk(q) === ADJ[m.place] ? '' : 'expected ' + ADJ[m.place];
  const PARTNER = { either: 'or', neither: 'nor', both: 'and', 'not only': 'but also' };
  const first = s => ['not only', 'neither', 'either', 'both'].find(p => new RegExp('\\b' + p + '\\b', 'i').test(s));
  V['g5-correlative'] = (q, m) => { const want = PARTNER[first(text(m.s))]; return mk(q) === want ? '' : 'expected ' + want; };
  V['g5-match-pairs'] = q => q.pairs.every(p => PARTNER[text(p[0])] === text(p[1])) ? '' : 'a pair is matched wrong';
})();
