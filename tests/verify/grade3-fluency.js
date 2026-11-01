/* Grade 3 answer checks: reading smoothly (grade3/chapters/fluency.js). The checker reads the end mark itself, keeps its own
   list of small words that always go with the next word, and its own feeling words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const VOICE = { '.': 'Stop', '?': 'Voice goes up', '!': 'Strong voice' };
  /* small words that always go with the word after them, so a phrase never ends on one */
  const GLUE = new Set('the a an my her his our to into on in by at with from about and little big old every tiny red brown loud fresh snowy long garden'.split(' '));
  const endsOnGlue = ph => GLUE.has(ph.trim().split(' ').pop().replace(/[.,]$/, '').toLowerCase());
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !endsOnGlue(ph));
  const FEEL = {
    excited: /won the game|birthday|rainbow|going camping|got a puppy|pool is open/,
    sad: /ice cream fell|miss my|is sick|ruined our picnic|kite broke|Nobody came/,
    scared: /noise in the dark|someone there|thunder is so loud|I am lost|moved under the bed|lights just went out/,
    angry: /broke my sandcastle|not fair|taking my pencils|last cookie|right now|stepped on my drawing/ };
  const HOW = { excited: 'bright and fast', sad: 'soft and slow', scared: 'quiet and shaky', angry: 'loud and sharp' };
  const feelOf = s => Object.keys(FEEL).filter(f => FEEL[f].test(s));
  const one = s => { const f = feelOf(s); return f.length === 1 ? f[0] : null; };

  V['g3-voice'] = (q, m) => H.has(q.fig, m.s) && H.marked(q) === VOICE[m.s.slice(-1)] ? '' : 'expected ' + VOICE[m.s.slice(-1)];
  V['g3-pause'] = q => { const t = q.tiles.map(text), c = t.filter(w => w.endsWith(',')); return c.length === 1 && t[q.answer] === c[0] ? '' : 'the word before the comma is not the one marked'; };
  V['g3-match-marks'] = q => q.pairs.every(p => VOICE[text(p[0]).slice(-1)] === text(p[1])) ? '' : 'a sentence is matched to the wrong voice';
  V['g3-mark-tf'] = (q, m) => H.has(q.fig, m.s) && (VOICE[m.s.slice(-1)] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g3-phrase-tf'] = (q, m) => text(q.fig) === m.said && smooth(m.said) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-not-smooth'] = q => { const bad = q.options.map(text).filter(o => !smooth(o)); return bad.length === 1 && H.marked(q) === bad[0] ? '' : 'the one that is not smooth is not marked'; };
  V['g3-scoop'] = q => { const t = q.tiles.map(text), good = t.filter(x => !endsOnGlue(x)); return good.length === 1 && t[q.answer] === good[0] && t.every(x => H.has(q.fig, x)) ? '' : 'the phrase that goes together is not marked'; };
  V['g3-feeling'] = (q, m) => { const f = one(m.s); return f && H.marked(q) === f && H.has(q.fig, m.s) ? '' : 'expected ' + f; };
  V['g3-match-feel'] = q => q.pairs.every(p => one(text(p[0])) === text(p[1])) ? '' : 'a sentence is matched to the wrong feeling';
  V['g3-voice-for'] = (q, m) => { const f = one(m.s); return f && H.marked(q) === HOW[f] && H.has(q.fig, m.s) ? '' : 'expected ' + (f && HOW[f]); };
  V['g3-feel-tf'] = (q, m) => { const f = one(m.s); return f && H.has(q.fig, m.s) && (f === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.s; };
})();
