/* Grade 3 answer checks: reading smoothly (grade3/chapters/fluency.js). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const VOICE = { '.': 'Stop', '?': 'Voice goes up', '!': 'Strong voice' };
  /* small words that always go with the word after them, so a phrase never ends on one */
  const GLUE = new Set('the a an my her his to into on in little big old every with'.split(' '));
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !GLUE.has(ph.split(' ').pop().toLowerCase()));
  const FEEL = { excited: /won the game|birthday|rainbow/, sad: /ice cream fell|miss my|is sick/, scared: /noise in the dark|someone there|thunder/ };
  const feelOf = s => Object.keys(FEEL).filter(f => FEEL[f].test(s));

  V['g3-voice'] = (q, m) => H.has(q.fig, m.s) && H.marked(q) === VOICE[m.s.slice(-1)] ? '' : 'expected ' + VOICE[m.s.slice(-1)];
  V['g3-pause'] = q => { const t = q.tiles.map(text), c = t.filter(w => w.endsWith(',')); return c.length === 1 && t[q.answer] === c[0] ? '' : 'the word before the comma is not the one marked'; };
  V['g3-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g3-feeling'] = (q, m) => { const f = feelOf(m.s); return f.length === 1 && H.marked(q) === f[0] && H.has(q.fig, m.s) ? '' : 'expected ' + f; };
  V['g3-match-feel'] = q => q.pairs.every(p => feelOf(text(p[0]))[0] === text(p[1]) && feelOf(text(p[0])).length === 1) ? '' : 'a sentence is matched to the wrong feeling';
})();
