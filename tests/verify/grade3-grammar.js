/* Grade 3 answer checks: grammar (grade3/chapters/grammar.js). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'");
  /* words that mean more than one, even without an s */
  const MANY = w => /s$/.test(w) || ['geese', 'children', 'people', 'mice'].includes(w);
  const ASKFOR = [[/^(In|At) [A-Z0-9]|o'clock|^In [A-Z]/, 'When'], [/^(Next to|On|Under|In) the/, 'Where'], [/'s\.$/, 'Whose'], [/^(By|With) /, 'How'], [/^[A-Z][a-z]+\.$/, 'Which']];
  const wordFor = a => (ASKFOR.find(([re]) => re.test(a)) || [])[1];
  const SAY = { 'You drop your cup.': 'Oops!', 'You bump your knee.': 'Ouch!', 'Your team wins.': 'Hooray!', 'You see a giant rainbow.': 'Wow!', 'You want quiet.': 'Shh!' };
  const mk = q => text((q.options || q.tiles)[q.answer]);

  V['g3-possessive'] = (q, m) => { const want = m.owner + "'s " + m.thing; return H.marked(q) && mk(q) === want ? '' : 'expected ' + want; };
  V['g3-fix-possessive'] = (q, m) => mk(q) === m.owner + 's' ? '' : 'expected the word ' + m.owner + 's';
  V['g3-linking'] = (q, m) => { const last = m.who.split(' ').pop(), want = m.past ? (MANY(last) ? 'were' : 'was') : (MANY(last) ? 'are' : 'is'); return mk(q) === want ? '' : 'expected ' + want; };
  V['g3-match-linking'] = q => q.pairs.every(p => (MANY(text(p[0]).split(' ').pop()) ? 'are' : 'is') === text(p[1])) ? '' : 'a start is matched to the wrong word';
  V['g3-progressive'] = (q, m) => { const re = new RegExp('^' + m.who + (m.now ? ' is ' : ' was ') + '\\w+ing\\.$'), ok = q.options.map(text).filter(o => re.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected "' + m.who + (m.now ? ' is' : ' was') + ' ...ing"'; };
  V['g3-place'] = q => {
    const d = document.createElement('div'); d.innerHTML = q.fig;
    const c = d.querySelector('circle'), r = d.querySelector('rect'), n = (e, a) => +e.getAttribute(a);
    const cx = n(c, 'cx'), cy = n(c, 'cy'), cr = n(c, 'r'), x = n(r, 'x'), y = n(r, 'y'), w = n(r, 'width'), h = n(r, 'height');
    const where = cx - cr >= x + w ? 'beside' : cy + cr <= y ? 'on' : cy - cr >= y + h ? 'under' : cx > x && cx < x + w && cy > y && cy < y + h ? 'in' : '?';
    return mk(q) === where + ' the box' ? '' : 'the picture shows the ball ' + where + ' the box';
  };
  V['g3-ask-word'] = (q, m) => { const want = wordFor(text(m.a)); return want && mk(q) === want ? '' : 'expected ' + want + ' for the answer "' + m.a + '"'; };
  V['g3-wow'] = (q, m) => mk(q) === SAY[m.s] ? '' : 'expected ' + SAY[m.s];
  V['g3-match-wow'] = q => q.pairs.every(p => SAY[text(p[0])] === text(p[1])) ? '' : 'a moment is matched to the wrong word';
})();
