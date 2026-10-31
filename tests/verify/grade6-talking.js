/* Grade 6 answer checks: listening and speaking (grade6/chapters/talking.js). The checker keeps its own key, and checks what it can from the
   words themselves: a response that builds on an idea names the speaker or their idea, and a clarifying question uses the speaker's words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  V['g6-build-on'] = (q, m) => { const who = m.said.split(':')[0], fit = q.options.map(text).filter(o => o.includes(who) || /^Building on/.test(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the response that builds on ' + who; };
  /* a clarifying question shares an important word with what was said */
  const KEYW = { 'The project is due in two weeks, and you can work in pairs.': 'partners', 'Bring your permission form and a water bottle on Friday.': 'form',
    'The bus leaves at 8:15 sharp from the east doors.': 'east doors', 'For the debate, each team gets three minutes to speak.': 'three minutes' };
  V['g6-clarify'] = (q, m) => { const fit = q.options.map(text).filter(o => o.includes(KEYW[m.said])); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the question about ' + KEYW[m.said]; };
  V['g6-listen-order'] = q => q.items.map(text).map(t => t.split(':')[0]).join(' ') === 'Before During After' ? '' : 'the steps are out of order';
  const GOOD = /^(Build on|Ask a question|Let others finish|Invite a quiet)/;
  V['g6-good-moves'] = q => H.sameSet(q.options.map((o, i) => (GOOD.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the good moves are not the ones marked';
  /* formal speech: no slang, contractions or casual openers */
  const informal = s => /\b(Hey|totally|stuff|cool|Want to|Where's|Thanks)\b/.test(s) || /^So\b|\blike,/.test(s);
  const FORMAL_AUD = /council|museum guide|Elder|judge/;
  V['g6-register'] = (q, m) => { const want = FORMAL_AUD.test(m.aud), fit = q.options.map(text).filter(o => informal(o) !== want); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the ' + (want ? 'formal' : 'informal') + ' line'; };
  V['g6-formal-or-not'] = (q, m) => mk(q) === (informal(text(m.line)) ? 'informal' : 'formal') ? '' : 'the register is wrong for ' + m.line;
  const BODY = { 'leaning forward and nodding': 'I am interested.', 'arms crossed, eyes rolling': 'I do not care.', 'standing tall, open hands': 'I am confident.',
    'looking at a phone while someone speaks': 'I am not listening.', 'a pause before a big point': 'Get ready: this matters.' };
  V['g6-body'] = (q, m) => mk(q) === BODY[m.b] ? '' : 'expected ' + BODY[m.b];
  /* statements that say a gesture means the same everywhere are false */
  V['g6-culture'] = (q, m) => (!/same thing (in every|all over)/.test(m.s)) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* the precise sentence has more exact detail: longer, with no vague words */
  const vague = s => /\b(went|good|big|thing|it loudly|fast)\b/.test(s);
  V['g6-precise'] = q => { const fit = q.options.map(text).filter(o => !vague(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the precise sentence'; };
})();
