/* Grade 2 answer checks: sentences (grade2/chapters/sentences.js).
   The checker keeps its own sets of commands and asking sentences, works kinds out from them and the end mark,
   and keeps its own list of the joining word that fits each pair and the ending that follows. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const ASKING = new Set(['Is the bus here?', 'Can I have a turn?', 'Where are my mittens?', 'Do you want to play?', 'Who is at the door?', 'What is for lunch?', 'Are you ready?', 'Does your dog bark?', 'Can we go outside?', 'Where is the library?']);
  const COMMANDS = new Set(['Shut the gate.', 'Hang up your coat.', 'Please feed the fish.', 'Sit down, please.', 'Brush your teeth.', 'Wash your hands.', 'Close the window.', 'Please pass the salt.', 'Put on your boots.', 'Wait for me.']);
  const kindOf = s => (ASKING.has(s) ? 'Asking' : COMMANDS.has(s) ? 'Command' : /!$/.test(s) ? 'Strong feeling' : /\.$/.test(s) ? 'Telling' : '?');
  /* asking words that would also make sense in each gap */
  const FITGAP = { 'Is the bus here?': ['Is'], 'Can I have a turn?': ['Can', 'Do', 'May'], 'Where are my mittens?': ['Where', 'What', 'Who'], 'Do you want to play?': ['Do', 'Can'],
    'Who is at the door?': ['Who', 'What', 'Is'], 'What is for lunch?': ['What', 'Who', 'Is'], 'Are you ready?': ['Are', 'Is', 'Who'], 'Does your dog bark?': ['Does', 'Can'],
    'Can we go outside?': ['Can', 'Do'], 'Where is the library?': ['Where', 'What', 'Who', 'Is'] };
  /* each first part: [the word that fits, the second part] */
  const FITS = { 'The sun came out': ['so', 'the snow melted'], 'Ava was thirsty': ['so', 'she drank some water'], 'Our dog was muddy': ['so', 'we gave him a bath'], 'It was cold': ['so', 'I wore my mittens'],
    'The bus was late': ['so', 'we were late for school'], 'I like soup': ['but', 'my brother likes salad'], 'The pond looked frozen': ['but', 'the ice was thin'], 'Theo ran fast': ['but', 'he did not win'],
    'The sky was grey': ['but', 'it did not rain'], 'Mei was tired': ['but', 'she kept playing'], 'We can walk': ['or', 'we can take the bus'], 'You can draw': ['or', 'you can paint'],
    'Do you want milk': ['or', 'do you want juice'], 'We can play tag': ['or', 'we can play catch'], 'Mei likes to paint': ['and', 'she likes to sing'], 'The wind howled': ['and', 'the rain poured down'],
    'Sam read a book': ['and', 'Priya played chess'], 'Grandpa baked bread': ['and', 'Grandma made soup'] };
  const DOES = { and: 'adds more', but: 'shows a surprise', or: 'gives a choice', so: 'tells what happened because of it' };
  const compound = s => /, (and|but|or|so) /.test(s);
  const end = a => (/^Do /.test(a) ? '?' : '.');
  const upper = x => x.charAt(0).toUpperCase() + x.slice(1);
  /* telling sentence: the asking sentence made by moving is, are or can to the front */
  const turn = t => { const w = t.replace('.', '').split(' '), i = w.findIndex(x => /^(is|are|can)$/.test(x)); return upper(w[i]) + ' ' + w.slice(0, i).map((x, n) => (n === 0 && x !== 'Kai' && x !== 'Ava' ? x.toLowerCase() : x)).concat(w.slice(i + 1)).join(' ') + '?'; };
  const tfOk = (q, yes, why) => q.answer === yes && q.why.answer === why;

  /* kinds */
  V['g2-kind'] = (q, m) => mk(q) === kindOf(m.s) ? '' : 'expected ' + kindOf(m.s);
  V['g2-end-mark'] = (q, m) => mk(q) === m.s.slice(-1) && kindOf(m.s) !== 'Command' ? '' : 'expected ' + m.s.slice(-1);
  V['g2-match-kind'] = q => q.pairs.every(p => kindOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g2-which-kind'] = (q, m) => { const ok = q.options.map(text).filter(o => kindOf(o) === m.want); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one ' + m.want + ' sentence'; };
  V['g2-kind-tf'] = (q, m) => { const yes = kindOf(m.s) === m.said; return tfOk(q, yes, yes ? 0 : 1) && text(q.fig) === m.s ? '' : 'expected ' + yes; };
  /* commands */
  V['g2-pick-command'] = q => H.sameSet(q.options.map((o, i) => (kindOf(text(o)) === 'Command' ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the commands are not the ones marked';
  V['g2-is-command'] = (q, m) => mk(q).startsWith(COMMANDS.has(m.s) ? 'Yes' : 'No') ? '' : 'expected ' + (COMMANDS.has(m.s) ? 'yes' : 'no');
  V['g2-command-word'] = (q, m) => COMMANDS.has(m.s) && mk(q) === m.s.split(' ')[0] ? '' : 'expected ' + m.s.split(' ')[0];
  V['g2-command-tf'] = (q, m) => { const is = COMMANDS.has(m.s); return tfOk(q, is === m.says, is ? 0 : 1) ? '' : 'true/false or the reason is wrong for ' + m.s; };
  /* asking */
  V['g2-order-ask'] = q => { const s = q.items.map(text).join(' '); return ASKING.has(s) ? '' : 'the order is not an asking sentence: ' + s; };
  V['g2-turn-ask'] = (q, m) => mk(q) === turn(m.s) ? '' : 'expected ' + turn(m.s);
  V['g2-ask-word'] = (q, m) => { const first = m.s.split(' ')[0], others = q.tiles.map(text).filter(t => t !== first);
    return ASKING.has(m.s) && mk(q) === first && others.every(t => !FITGAP[m.s].includes(t)) ? '' : 'expected ' + first + ', and no other tile that fits'; };
  V['g2-ask-tf'] = (q, m) => { const yes = /^(Is|Are|Can) /.test(m.shown); return tfOk(q, yes, yes ? 0 : 1) ? '' : 'expected ' + yes; };
  /* joining */
  V['g2-order-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s === m.a + ', ' + FITS[m.a][0] + ' ' + FITS[m.a][1] + end(m.a) ? '' : 'the parts are not in order: ' + s; };
  V['g2-pick-compound'] = q => { const ok = q.options.map(text).filter(compound); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one joined sentence'; };
  V['g2-comma-join'] = (q, m) => { const yes = m.shown.includes(', ' + m.w + ' '); return tfOk(q, yes, yes ? 0 : 1) ? '' : 'true/false or the reason is wrong'; };
  V['g2-split-two'] = (q, m) => { const want = m.a + end(m.a) + ' ' + upper(FITS[m.a][1]) + end(m.a); return mk(q) === want ? '' : 'expected ' + want; };
  /* and, but, or, so */
  V['g2-join'] = (q, m) => mk(q) === FITS[m.a][0] ? '' : 'expected ' + FITS[m.a][0];
  V['g2-join-means'] = (q, m) => mk(q) === DOES[m.w] && FITS[m.a][0] === m.w ? '' : 'expected what ' + m.w + ' does';
  V['g2-join-finish'] = (q, m) => mk(q) === FITS[m.a][1] + '.' ? '' : 'expected ' + FITS[m.a][1];
  V['g2-join-tf'] = (q, m) => { const yes = FITS[m.a][0] === m.w; return tfOk(q, yes, yes ? 0 : 1) ? '' : 'expected ' + yes; };
})();
