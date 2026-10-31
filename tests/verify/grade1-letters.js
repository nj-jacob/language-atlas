/* Grade 1 answer checks: letters and ABC order (grade1/chapters/letters.js). Works each answer out from the alphabet. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const ABC = 'abcdefghijklmnopqrstuvwxyz';
  const sorted = a => a.slice().sort((x, y) => ABC.indexOf(x[0]) - ABC.indexOf(y[0]));
  V['g1-small-for'] = (q, m) => H.marked(q) === m.l && text(q.fig) === m.l.toUpperCase() ? '' : 'expected ' + m.l;
  V['g1-big-for'] = (q, m) => H.marked(q) === m.l.toUpperCase() && text(q.fig) === m.l ? '' : 'expected ' + m.l.toUpperCase();
  V['g1-match-case'] = q => q.pairs.every(p => text(p[0]).toLowerCase() === text(p[1]) && text(p[0]) !== text(p[1])) ? '' : 'a big letter is matched to the wrong small letter';
  V['g1-find-letter'] = (q, m) => H.marked(q) === m.l && text(q.q).endsWith('letter ' + m.l + '.') ? '' : 'expected ' + m.l;
  V['g1-next'] = (q, m) => { const i = ABC.indexOf(m.shown); return i >= 0 && text(q.fig) === m.shown && H.marked(q) === ABC[i + 2] ? '' : 'expected the letter after ' + m.shown; };
  V['g1-before'] = (q, m) => H.marked(q) === ABC[ABC.indexOf(m.l) - 1] ? '' : 'expected the letter before ' + m.l;
  V['g1-order-letters'] = q => { const t = q.items.map(text); return t.join('') === sorted(t).join('') ? '' : 'the letters are not in ABC order'; };
  V['g1-order-words'] = q => { const t = q.items.map(text); return new Set(t.map(w => w[0])).size === t.length && t.join(' ') === sorted(t).join(' ') ? '' : 'the words are not in ABC order'; };
  V['g1-first-word'] = q => { const t = q.options.map(text), f = sorted(t)[0]; return new Set(t.map(w => w[0])).size === t.length && H.marked(q) === f ? '' : 'expected ' + f; };
})();
