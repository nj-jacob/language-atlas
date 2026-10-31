/* Grade 3 answer checks: writing and publishing (grade3/chapters/writing.js). Own rules and lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const isFirst = s => /\b(I|we|my|our|We|My|Our)\b/.test(s);
  const VOICED = /best day of my whole|silliest, sweetest|drummed on the roof|swish of my skates/;
  const BELONG = { 'My dog Biscuit': /Biscuit|He /, 'Winter fun': /snow forts|skate on the pond|hot cocoa/, 'Our garden': /plant beans|water the plants|pick the tomatoes/, Moose: /^(Moose|They eat|Male moose)/ };
  const MISSPELT = new Set(['sed', 'becuz', 'frend']), NAMES = new Set(['Zara', 'Omar', 'Leila', 'Sudbury']);
  const wrongWord = (w, i, all) => MISSPELT.has(w) || (i === 0 && /^[a-z]/.test(w)) || NAMES.has(w.charAt(0).toUpperCase() + w.slice(1)) && /^[a-z]/.test(w) || (w === 'is' && all[i - 1] === 'geese');
  const clean = s => { const ws = s.replace(/\.$/, '').split(' '); return !ws.some(wrongWord) && /\.$/.test(s); };

  V['g3-pov'] = (q, m) => q.answer === (isFirst(m.s) ? 0 : 1) && H.has(q.fig, m.s) ? '' : 'wrong person for "' + m.s + '"';
  V['g3-pov-switch'] = (q, m) => { const ok = q.options.map(text).filter(o => !isFirst(o) && o.split(' ').pop() === m.s.split(' ').pop()); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the third-person version'; };
  V['g3-pick-first'] = q => H.sameSet(q.options.map((o, i) => isFirst(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the first-person sentences are not the ones marked';
  V['g3-writer-voice'] = q => VOICED.test(mk(q)) && q.options.map(text).filter(o => VOICED.test(o)).length === 1 ? '' : 'expected the sentence with voice';
  V['g3-no-belong'] = (q, m) => { const off = q.options.map(text).filter(o => !BELONG[m.topic].test(o)); return off.length === 1 && mk(q) === off[0] ? '' : 'expected the sentence that is off topic'; };
  V['g3-add-detail'] = (q, m) => { const on = q.options.map(text).filter(o => BELONG[m.topic].test(o)); return on.length === 1 && mk(q) === on[0] ? '' : 'expected the sentence about ' + m.topic; };
  V['g3-find-error'] = q => { const ws = q.tiles.map(text), bad = ws.map((w, i) => wrongWord(w, i, ws) ? i : -1).filter(i => i >= 0); return bad.length === 1 && q.answer === bad[0] ? '' : 'the word with the mistake is not the one marked'; };
  V['g3-fixed'] = q => { const ok = q.options.map(text).filter(clean); return ok.length === 1 && mk(q) === ok[0] ? '' : 'sentences with no mistakes: ' + ok.join(' | '); };
})();
