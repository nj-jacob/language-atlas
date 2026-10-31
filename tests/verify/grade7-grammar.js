/* Grade 7 answer checks: grammar (grade7/chapters/grammar.js). The checker has its own verb lists and works out the parts of each sentence itself. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GIVE = ['gave', 'sent', 'handed', 'baked', 'showed', 'told', 'bought'], FOR = ['baked', 'bought'];
  const PEOPLE = ['the class', 'her cousin', 'Kai', 'my family', 'the judges', 'my sister', 'my brother'];
  /* split "Ms. Chen gave the class a quiz." into subject, verb, receiver and thing given */
  function parts(s) {
    s = text(s).replace(/\.$/, '');
    const v = GIVE.find(x => s.includes(' ' + x + ' ')); if (!v) return null;
    const [sub, rest] = s.split(' ' + v + ' '), io = PEOPLE.find(p => rest.startsWith(p + ' ')); if (!io) return null;
    return { sub, v, io, dobj: rest.slice(io.length + 1) };
  }
  V['g7-tap-object'] = (q, m) => { const p = parts(q.tiles.join(' ')); return p && mk(q) === (m.io ? p.io : p.dobj) ? '' : 'expected the ' + (m.io ? 'indirect' : 'direct') + ' object'; };
  V['g7-receives'] = (q, m) => { const p = parts(m.s); return p && mk(q) === p.io ? '' : 'expected ' + (p && p.io); };
  V['g7-same-meaning'] = (q, m) => { const p = parts(m.s); const want = p && p.sub + ' ' + p.v + ' ' + p.dobj + (FOR.includes(p.v) ? ' for ' : ' to ') + p.io + '.'; return mk(q) === want ? '' : 'expected ' + want; };
  V['g7-obj-tf'] = (q, m) => { const p = parts(m.s); return p && (p.io === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong'; };
  const LINK = ['is', 'was', 'became', 'seems', 'looks', 'smells', 'felt'];
  /* after the linking verb: a, an or the starts a naming phrase (predicate noun); otherwise it describes (predicate adjective) */
  const after = s => { const w = text(s).replace(/\.$/, '').split(' '), i = w.findIndex(x => LINK.includes(x)); return i < 0 ? null : w.slice(i + 1).join(' '); };
  const nounish = p => /^(a|an|the) /.test(p);
  V['g7-pred-kind'] = (q, m) => { const a = after(q.fig); return a === m.p && q.answer === (nounish(a) ? 0 : 1) ? '' : 'expected predicate ' + (nounish(a) ? 'noun' : 'adjective'); };
  V['g7-tap-linking'] = q => LINK.includes(mk(q)) && q.tiles.map(text).filter(t => LINK.includes(t)).length === 1 ? '' : 'expected the linking verb';
  V['g7-pred-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => (nounish(after(o)) !== m.adj) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right sentences are not the ones marked';
  V['g7-pred-tf'] = (q, m) => (( nounish(m.p) ? 'noun' : 'adjective') === m.said) === q.answer && q.why.answer === (nounish(m.p) ? 0 : 1) ? '' : 'true/false is wrong';
  /* participles: the checker's own key of each sentence's participle and the noun it describes */
  const PART = { 'The frozen pond glittered in the sun.': ['frozen', 'pond'], 'We heard a barking dog behind the fence.': ['barking', 'dog'], 'The broken window let in the cold.': ['broken', 'window'],
    'The rising sun lit the lake.': ['rising', 'sun'], 'Shivering in the wind, Kai waited for the bus.': ['Shivering', 'Kai'], 'The canoe, filled with water, sank slowly.': ['filled', 'canoe'],
    'Tired from the hike, the campers fell asleep.': ['Tired', 'campers'], 'The girl holding the flag is my cousin.': ['holding', 'girl'] };
  V['g7-tap-participle'] = (q, m) => mk(q) === PART[m.s][0] && /(ing|ed|en)$/.test(mk(q)) ? '' : 'expected ' + PART[m.s][0];
  V['g7-describes'] = (q, m) => mk(q) === PART[m.s][1] ? '' : 'expected ' + PART[m.s][1];
  V['g7-part-tf'] = (q, m) => (PART[m.s][1] === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const CLEAR = ['Walking to school, I got soaked by the rain.', 'Hanging on the wall, the painting caught my eye.', 'Hearing the bell, the students lined up.'];
  V['g7-dangling'] = q => { const ok = q.options.map(text).filter(o => CLEAR.includes(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the clear sentence'; };
  /* what an adverbial phrase tells, from how it starts */
  const tells = p => /^to /.test(p) ? 'why' : /^(with|in a )/i.test(p) ? 'how' : /^(after|before|during)/i.test(p) ? 'when' : /^(across|in|on|under|behind)/i.test(p) ? 'where' : null;
  V['g7-adv-question'] = (q, m) => mk(q) === tells(m.phrase) ? '' : 'expected ' + tells(m.phrase);
  V['g7-adv-match'] = q => q.pairs.every(p => tells(text(p[0])) === text(p[1])) ? '' : 'a phrase is matched wrong';
  V['g7-adv-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => tells(text(o)) === m.ask ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.ask + ' phrases are not the ones marked';
  V['g7-adv-add'] = (q, m) => { const p = mk(q).replace(/^Leila finished the puzzle /, '').replace(/\.$/, ''); return tells(p) === m.ask && q.options.map(text).filter(o => tells(o.replace(/^Leila finished the puzzle /, '').replace(/\.$/, '')) === m.ask).length === 1 ? '' : 'expected a phrase telling ' + m.ask; };
})();
