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
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const PIC = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('svg.wpic'); return s && s.getAttribute('aria-label'); };
  const tiles = h => { const d = document.createElement('div'); d.innerHTML = h; return [...d.querySelectorAll('.wt')].map(x => text(x.innerHTML)); };
  V['g1-case-tf'] = (q, m) => { const t = tiles(q.fig), right = t[0].toLowerCase() === t[1] && t[0] === m.big; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-bdp-fill'] = (q, m) => { const w = PIC(q.fig), t = tiles(q.fig)[0]; return w === m.w && t.replace('_', H.marked(q)) === w && t.indexOf('_') === m.at ? '' : 'expected the missing letter of ' + w; };
  V['g1-bd-tf'] = (q, m) => { const right = tiles(q.fig)[0] === m.asked; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-bd-count'] = (q, m) => { const t = tiles(q.fig), n = t.filter(c => c === m.l).length; return t.join('') === m.row && H.marked(q) === String(n) ? '' : 'expected ' + n; };
  V['g1-between'] = (q, m) => { const i = ABC.indexOf(m.a); return ABC[i + 2] === m.c && H.marked(q) === ABC[i + 1] ? '' : 'expected ' + ABC[i + 1]; };
  V['g1-next-tf'] = (q, m) => { const right = ABC[ABC.indexOf(m.l) + 1] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-first-letter'] = q => { const t = q.tiles.map(text); return H.marked(q) === sorted(t)[0] ? '' : 'expected ' + sorted(t)[0]; };
  V['g1-last-letter'] = q => { const t = sorted(q.tiles.map(text)); return H.marked(q) === t[t.length - 1] ? '' : 'expected ' + t[t.length - 1]; };
  V['g1-letters-tf'] = q => { const t = tiles(q.fig), right = t.join('') === sorted(t).join(''); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-last-word'] = q => { const t = q.options.map(text), l = sorted(t)[t.length - 1]; return new Set(t.map(w => w[0])).size === t.length && H.marked(q) === l ? '' : 'expected ' + l; };
  V['g1-words-tf'] = q => { const t = tiles(q.fig), right = t.join(' ') === sorted(t).join(' '); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
