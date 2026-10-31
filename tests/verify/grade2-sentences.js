/* Grade 2 answer checks: sentences (grade2/chapters/sentences.js).
   Kinds are worked out from the end mark and the first word; joining words from the checker's own list of what each pair means. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const ASK = /^(Is|Can|Where|Do|Who)\b/, DOING = /^(Shut|Hang|Please|Sit|Brush)\b/;
  const kindOf = s => (/\?$/.test(s) && ASK.test(s) ? 'Asking' : /!$/.test(s) ? 'Strong feeling' : DOING.test(s) ? 'Command' : /\.$/.test(s) ? 'Telling' : '?');
  /* the first part of each pair, and the word that fits between */
  const FITS = { 'The sun came out': 'so', 'Ava was thirsty': 'so', 'Our dog was muddy': 'so', 'I like soup': 'but', 'The pond looked frozen': 'but', 'Theo ran fast': 'but',
    'We can walk': 'or', 'You can draw': 'or', 'Do you want milk': 'or', 'Mei made a card': 'and', 'The wind howled': 'and', 'Sam read a book': 'and' };
  const DOES = { and: 'adds more', but: 'shows a surprise', or: 'gives a choice', so: 'tells what happened because of it' };
  const compound = s => / (and|but|or|so) /.test(s) && /, (and|but|or|so) /.test(s);

  V['g2-kind'] = (q, m) => mk(q) === kindOf(m.s) ? '' : 'expected ' + kindOf(m.s);
  V['g2-end-mark'] = (q, m) => mk(q) === m.s.slice(-1) && kindOf(m.s) !== 'Command' ? '' : 'expected ' + m.s.slice(-1);
  V['g2-match-kind'] = q => q.pairs.every(p => kindOf(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong kind';
  V['g2-pick-command'] = q => H.sameSet(q.options.map((o, i) => (kindOf(text(o)) === 'Command' ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the commands are not the ones marked';
  V['g2-order-ask'] = q => { const s = q.items.map(text).join(' '); return kindOf(s) === 'Asking' && /^[A-Z]/.test(s) ? '' : 'the order is not an asking sentence: ' + s; };
  V['g2-join'] = (q, m) => mk(q) === FITS[m.a] ? '' : 'expected ' + FITS[m.a];
  V['g2-join-means'] = (q, m) => mk(q) === DOES[m.w] && FITS[text(q.fig).split(',')[0]] === m.w ? '' : 'expected what ' + m.w + ' does';
  V['g2-order-join'] = (q, m) => { const s = q.items.map(text).join(' '); return s.startsWith(m.a + ', ' + FITS[m.a] + ' ') && compound(s) ? '' : 'the parts are not in order: ' + s; };
  V['g2-pick-compound'] = q => { const ok = q.options.map(text).filter(compound); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one joined sentence'; };
  V['g2-comma-join'] = (q, m) => (m.shown.includes(', ' + m.w + ' ') === q.answer) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false or the reason is wrong';
})();
