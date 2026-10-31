/* Grade 4 answer checks: listening and speaking (grade4/chapters/talking.js). Own rules and keys. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a question that invites more starts with what, how or why */
  const OPEN = /^(What|How|Why)\b/;
  V['g4-more'] = q => { const ok = q.options.map(text).filter(o => OPEN.test(o) && o.endsWith('?')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the what, how or why question'; };
  V['g4-more-tf'] = (q, m) => OPEN.test(m.ask) === q.answer && text(q.why.options[q.why.answer]).startsWith(OPEN.test(m.ask) ? 'What, how' : 'A yes-or-no') ? '' : 'true/false is wrong for ' + m.ask;
  /* building on: names the speaker and links with and, but, too or also */
  const speaker = s => text(s).split(':')[0];
  V['g4-build-on'] = (q, m) => { const n = speaker(m.said), ok = q.options.map(text).filter(o => o.includes(n) && /\b(and|but|too|also)\b/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reply that names ' + n + ' and adds to the idea'; };
  V['g4-clarify'] = q => { const ok = q.options.map(text).filter(o => o.endsWith('?')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the polite question'; };
  V['g4-listen-pick'] = q => H.sameSet(q.options.map((o, i) => /^(Look at the speaker|Nod|Wait for a pause|Think of a question)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the listening moves are not the ones marked';
  /* restating: the checker's own key of the facts that must stay */
  const FACTS = { 'The library will close early': ['Friday', 'early', 'meeting'], 'Bring water and a hat': ['outside', 'water', 'hat'], 'Practice is cancelled tonight': ['No practice tonight', 'Saturday game is still on'], 'Please walk in the halls': ['Walk', 'do not run'] };
  V['g4-restate'] = (q, m) => { const f = FACTS[Object.keys(FACTS).find(k => m.said.startsWith(k))], ok = q.options.map(text).filter(o => f.every(x => o.includes(x))); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the restatement that keeps every fact'; };
  const FORMAL = /principal|guest speaker|town council/;
  const formalLine = s => /^(Good morning|Thank you for|Excuse me)/.test(s);
  V['g4-audience'] = (q, m) => formalLine(mk(q)) === FORMAL.test(m.who) ? '' : 'the line does not fit ' + m.who;
  const BODY = { 'a thumbs up': 'Good job!', 'a shrug': 'I do not know.', 'a nod': 'Yes.', 'a hand up, palm out': 'Stop.', 'a wave': 'Hello!', 'a finger to the lips': 'Be quiet.' };
  V['g4-body-one'] = (q, m) => mk(q) === BODY[m.g] ? '' : 'expected ' + BODY[m.g];
  V['g4-body-match'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'a gesture is matched to the wrong meaning';
  V['g4-detail'] = q => { const n = o => text(o).split(' ').length, most = Math.max(...q.options.map(n)); return n(q.options[q.answer]) === most && most >= 6 ? '' : 'expected the sentence with describing words'; };
  V['g4-tap-how'] = (q, m) => { const w = mk(q); return /ly$/.test(w) && m.s.includes(w) && q.tiles.map(text).filter(t => /ly$/.test(t)).length === 1 ? '' : 'expected the -ly word that tells how'; };
})();
