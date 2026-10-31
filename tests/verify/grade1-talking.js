/* Grade 1 answer checks: listening and speaking (grade1/chapters/talking.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GOOD = /^(Look at the person talking|Keep my hands still|Think about the words|Wait until they finish)/;
  const ASK = { 'I got a new puppy.': 'What is its name?', 'We went camping on the weekend.': 'Where did you camp?', 'My grandma is visiting from Winnipeg.': 'How long is she staying?',
    'I made a card for my teacher.': 'What did you draw on it?', 'I lost my first tooth.': 'Did it hurt?' };
  const SIZE = { 'What colour is your coat?': 'It is blue.', 'What did you have for lunch?': 'I had a sandwich and an apple.', 'What is your favourite animal?': 'I like owls best.' };
  const TURN = /^when (the speaker stops|it is my turn|I put up my hand)/;
  const FEEL = { 'a big smile and arms up high': 'excited', 'a frown and crossed arms': 'angry', 'head down and tears': 'sad', 'wide eyes and hands over the mouth': 'surprised', 'a yawn and droopy eyes': 'tired' };
  const MOVE = { 'a nod': 'yes', 'shaking your head': 'no', 'a wave': 'hello', 'a shrug': 'I do not know', 'a thumbs up': 'good' };
  const VOICE = { 'in the library': 'a quiet voice', 'on the playground': 'a loud voice', 'talking to a friend at the table': 'a talking voice' };
  const VAGUE = /\b(that|thing|there|fun)\b/;
  V['g1-good-listen'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good listening moves are not the ones marked';
  V['g1-ask-about'] = (q, m) => mk(q) === ASK[m.said] ? '' : 'expected ' + ASK[m.said];
  V['g1-listen-order'] = q => q.items.map(text).every((t, i) => t.startsWith(['Before', 'During', 'After'][i])) ? '' : 'the steps are not before, during, after';
  V['g1-lost-tf'] = (q, m) => /ask a question/.test(m.said) === q.answer && text(q.why.options[q.why.answer]).startsWith('Asking') ? '' : 'true/false is wrong';
  V['g1-when-talk'] = q => { const ok = q.options.map(text).filter(o => TURN.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the time that takes turns'; };
  V['g1-how-much'] = (q, m) => mk(q) === SIZE[m.ask] ? '' : 'expected ' + SIZE[m.ask];
  V['g1-feels-from'] = (q, m) => mk(q) === FEEL[m.body] ? '' : 'expected ' + FEEL[m.body];
  V['g1-move-means'] = (q, m) => mk(q) === MOVE[m.move] ? '' : 'expected ' + MOVE[m.move];
  V['g1-match-move'] = q => q.pairs.every(p => MOVE[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  V['g1-voice-fits'] = (q, m) => mk(q) === VOICE[m.where] ? '' : 'expected ' + VOICE[m.where];
  V['g1-clearer'] = q => { const ok = q.options.map(text).filter(o => !VAGUE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the exact one'; };
})();
