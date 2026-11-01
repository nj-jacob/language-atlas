/* Grade 4 answer checks: listening and speaking (grade4/chapters/talking.js). Own rules and keys. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* a question that invites more starts with what, how or why */
  const OPEN = /^(What|How|Why)\b/;
  V['g4-more'] = q => { const ok = q.options.map(text).filter(o => OPEN.test(o) && o.endsWith('?')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the what, how or why question'; };
  V['g4-more-tf'] = (q, m) => OPEN.test(m.ask) === q.answer && text(q.why.options[q.why.answer]).startsWith(OPEN.test(m.ask) ? 'What, how' : 'A yes-or-no') ? '' : 'true/false is wrong for ' + m.ask;
  const OFF = new Set(['I have a dog.', 'I like pizza.', 'My shoes are new.', 'I went swimming.', 'It is sunny today.', 'I have a new pencil.', 'My sister is six.', 'I like hockey.', 'The bus is late.', 'I went skating.']);
  V['g4-more-pick'] = q => H.sameSet(q.options.map((o, i) => OPEN.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the what, how or why questions are not the ones marked';
  V['g4-talk-off-topic'] = q => OFF.has(mk(q)) && q.options.filter(o => OFF.has(text(o))).length === 1 ? '' : 'expected the off-topic reply';
  /* building on: names the speaker and links with and, but, too or also */
  const speaker = s => text(s).split(':')[0];
  const builds = (o, n) => o.includes(n) && /\b(and|but|too|also)\b|^Building on/.test(o);
  V['g4-build-on'] = (q, m) => { const n = speaker(m.said), ok = q.options.map(text).filter(o => builds(o, n)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the reply that names ' + n + ' and adds to the idea'; };
  V['g4-build-tf'] = (q, m) => builds(text(m.reply), speaker(m.said)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.reply;
  V['g4-build-kind'] = (q, m) => mk(q) === (/ but /.test(m.reply) ? 'disagrees kindly' : 'agrees and adds') ? '' : 'the kind of reply is wrong';
  V['g4-build-match'] = q => q.pairs.every(p => builds(text(p[1]), speaker(p[0]))) ? '' : 'an idea is matched to the wrong reply';
  V['g4-clarify'] = q => { const ok = q.options.map(text).filter(o => o.endsWith('?')); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the polite question'; };
  const GOODL = /^(Look at the speaker|Nod|Wait for a pause|Think of a question|Keep your hands still|Ask to check)/;
  V['g4-listen-pick'] = q => H.sameSet(q.options.map((o, i) => GOODL.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the listening moves are not the ones marked';
  V['g4-listen-tf'] = (q, m) => GOODL.test(m.s) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  V['g4-clarify-tf'] = (q, m) => text(m.say).endsWith('?') === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.say;
  /* restating: the checker's own key of the facts that must stay */
  const FACTS = { 'The library will close early': ['Friday', 'early', 'meeting'], 'Bring water and a hat': ['outside', 'water', 'hat'], 'Practice is cancelled tonight': ['No practice tonight', 'Saturday game is still on'], 'Please walk in the halls': ['Walk', 'do not run'],
    'The pool opens at noon': ['Sunday', 'noon'], 'Wear boots tomorrow': ['muddy', 'boots', 'tomorrow'], 'The bake sale money': ['bake sale', 'library books'], 'Hand in your permission form': ['form', 'Thursday', 'to go'] };
  const factsOf = s => FACTS[Object.keys(FACTS).find(k => text(s).startsWith(k))];
  const keeps = (said, o) => factsOf(said).every(x => text(o).includes(x));
  V['g4-restate'] = (q, m) => { const f = FACTS[Object.keys(FACTS).find(k => m.said.startsWith(k))], ok = q.options.map(text).filter(o => f.every(x => o.includes(x))); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the restatement that keeps every fact'; };
  V['g4-restate-tf'] = (q, m) => keeps(m.said, m.shown) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.shown;
  V['g4-restate-bad'] = (q, m) => { const ok = q.options.filter(o => !keeps(m.said, o)); return ok.length === 1 && !keeps(m.said, H.marked(q)) ? '' : 'expected the one that changes a fact'; };
  V['g4-restate-match'] = q => q.pairs.every(p => keeps(p[0], p[1])) ? '' : 'a message is matched to the wrong restatement';
  const FORMAL = /principal|guest speaker|town council|librarian|police officer/;
  const formalLine = s => /^(Good morning|Thank you for|Excuse me|Could you please)/.test(s);
  V['g4-aud-kind'] = (q, m) => mk(q) === (FORMAL.test(m.who) ? 'formal' : 'friendly') ? '' : 'the kind of talk is wrong for ' + m.who;
  V['g4-aud-tf'] = (q, m) => (formalLine(text(m.line)) === FORMAL.test(m.who)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g4-aud-sort'] = q => H.sameSet(q.options.map((o, i) => formalLine(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the formal lines are not the ones marked';
  V['g4-audience'] = (q, m) => formalLine(mk(q)) === FORMAL.test(m.who) ? '' : 'the line does not fit ' + m.who;
  const BODY = { 'a thumbs up': 'Good job!', 'a shrug': 'I do not know.', 'a nod': 'Yes.', 'a hand up, palm out': 'Stop.', 'a wave': 'Hello!', 'a finger to the lips': 'Be quiet.',
    'a high five': 'We did it!', 'a big smile': 'I am glad.', 'pointing at the door': 'Go that way.', 'a hand cupped to the ear': 'I cannot hear you.' };
  V['g4-body-which'] = (q, m) => BODY[mk(q)] === m.mean ? '' : 'expected the gesture that says ' + m.mean;
  V['g4-body-tf'] = (q, m) => (BODY[m.g] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.g;
  const MOOD = { 'a sad part': 'soft and slow', 'an exciting part': 'fast and loud', 'a scary part': 'quiet, with pauses', 'a funny part': 'light and bright', 'an important fact': 'clear and steady' };
  V['g4-voice-mood'] = (q, m) => mk(q) === MOOD[m.part] ? '' : 'expected ' + MOOD[m.part];
  V['g4-body-one'] = (q, m) => mk(q) === BODY[m.g] ? '' : 'expected ' + BODY[m.g];
  V['g4-body-match'] = q => q.pairs.every(p => BODY[text(p[0])] === text(p[1])) ? '' : 'a gesture is matched to the wrong meaning';
  V['g4-detail'] = q => { const n = o => text(o).split(' ').length, most = Math.max(...q.options.map(n)); return n(q.options[q.answer]) === most && most >= 6 ? '' : 'expected the sentence with describing words'; };
  V['g4-detail-tf'] = (q, m) => (text(m.s).split(' ').length >= 6) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  V['g4-how-pick'] = q => H.sameSet(q.options.map((o, i) => /ly$/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words that tell how are not the ones marked';
  V['g4-tap-how'] = (q, m) => { const w = mk(q); return /ly$/.test(w) && m.s.includes(w) && q.tiles.map(text).filter(t => /ly$/.test(t)).length === 1 ? '' : 'expected the -ly word that tells how'; };
})();
