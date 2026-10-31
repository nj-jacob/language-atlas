/* Grade 3 answer checks: listening and speaking (grade3/chapters/talking.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GOOD = /^(Look at the speaker|Keep my body still|Think about what they say|Wait for my turn|Ask a question if)/;
  const CHECKS = { 'We meet at the front doors at nine.': 'Did you say the front doors?', 'Bring two things for the bake sale.': 'Two things each, or two for the whole family?',
    'The library is closed on Monday.': 'Is it open again on Tuesday?', 'Draw a map of your street.': 'Should I label the houses?' };
  const POLITE = /^(Good morning, Ms\.|Hello, everyone\.|Excuse me, could you|Thank you for coming)/;
  const MEANS = { 'a nod': 'yes', 'a thumbs up': 'good job', 'a shrug': 'I do not know', 'a wave': 'hello', 'a finger on your lips': 'please be quiet' };
  const VOICE = { 'reading to a partner': 'a talking voice', 'in the library': 'a quiet voice', 'giving a talk to the class': 'a loud, clear voice' };
  const VAGUE = /\b(thing|stuff|that|good)\b/;
  V['g3-listen-good'] = q => H.sameSet(q.options.map((o, i) => GOOD.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good listening moves are not the ones marked';
  V['g3-clarify'] = (q, m) => mk(q) === CHECKS[m.said] ? '' : 'expected ' + CHECKS[m.said];
  V['g3-not-sure'] = (q, m) => (/ask a question/.test(m.said) === q.answer) && text(q.why.options[q.why.answer]).startsWith('Asking') ? '' : 'true/false is wrong';
  V['g3-listen-order'] = q => q.items.map(text).every((t, i) => t.startsWith(['Before', 'During', 'After'][i])) ? '' : 'the steps are not before, during, after';
  V['g3-formal'] = q => { const ok = q.options.map(text).filter(o => POLITE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the polite, formal way'; };
  V['g3-match-body'] = q => q.pairs.every(p => MEANS[text(p[0])] === text(p[1])) ? '' : 'a move is matched wrong';
  V['g3-body'] = (q, m) => mk(q) === MEANS[m.move] ? '' : 'expected ' + MEANS[m.move];
  V['g3-voice-level'] = (q, m) => mk(q) === VOICE[m.where] ? '' : 'expected ' + VOICE[m.where];
  V['g3-clearer'] = q => { const ok = q.options.map(text).filter(o => !VAGUE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the exact one'; };
})();
