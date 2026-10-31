/* Grade 2 answer checks: sounding out and spelling choices (grade2/chapters/sounds.js).
   The checker keeps its own lists of each word's sounds and real splits, and works soft c and g out from the next letter. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  /* sounds, written with dots: letter teams are one sound */
  const SOUNDS = {};
  'sh.o.p ch.i.p f.r.o.g c.l.a.p s.t.e.p b.e.n.ch s.p.l.i.t b.r.u.sh s.t.o.m.p th.i.n d.u.ck s.n.a.ck f.i.sh g.r.a.n.d'.split(' ').forEach(w => { SOUNDS[w.replace(/\./g, '')] = w.split('.'); });
  const n = w => (SOUNDS[w] || []).length;
  const SPLIT = new Set('rob-in cab-in lem-on wag-on sev-en riv-er plan-et vis-it cam-el lim-it ro-bot pa-per ti-ger mu-sic ba-by o-pen'.split(' '));
  /* soft c or g: the first c or g in the word is followed by e, i or y */
  const soft = (w, l) => /[eiy]/.test(w.charAt(w.indexOf(l) + 1));
  const RIGHT = new Set('bone home rope stone nose hole boat road coat soap goat toast chair hair fair stairs pair care share scare square bare bear pear wear'.split(' '));
  const MEANS = { 'something you sit on': 'chair', 'it grows on your head': 'hair', 'the same for everyone': 'fair', 'steps in a house': 'stairs', 'two of something': 'pair',
    'to look after': 'care', 'to give some away': 'share', 'to make someone afraid': 'scare', 'a shape with four equal sides': 'square', 'with nothing on it': 'bare',
    'a big furry animal': 'bear', 'a fruit': 'pear', 'to have clothes on': 'wear' };

  V['g2-blend'] = (q, m) => { const shown = [...new DOMParser().parseFromString(q.fig, 'text/html').querySelectorAll('.wt')].map(e => e.textContent).join(''); return shown === m.word && mk(q) === m.word ? '' : 'the sounds make ' + shown; };
  V['g2-count-sounds'] = (q, m) => n(m.word) && mk(q) === String(n(m.word)) ? '' : 'expected ' + n(m.word) + ' sounds in ' + m.word;
  V['g2-spell-sounds'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])); return b.join('.') === (SOUNDS[m.word] || []).join('.') && text(q.q).includes(m.word) ? '' : 'built ' + b.join('.'); };
  V['g2-match-sounds'] = q => q.pairs.every(p => +text(p[1]).split(' ')[0] === n(text(p[0]))) ? '' : 'a word is matched to the wrong number of sounds';
  V['g2-flex'] = q => { const ok = q.tiles.map(text).filter(t => SPLIT.has(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the real split'; };
  V['g2-flex-tf'] = (q, m) => (SPLIT.has(m.said) === q.answer) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false or the reason is wrong for ' + m.said;
  V['g2-soft'] = (q, m) => { const s = soft(m.word, m.letter), t = mk(q) || ''; return (s ? /^[sj] as/.test(t) : /^[kg] as/.test(t)) ? '' : 'expected the ' + (s ? 'soft' : 'hard') + ' sound in ' + m.word; };
  V['g2-soft-pick'] = (q, m) => { const want = q.options.map((o, i) => (soft(text(o), m.letter) ? i : -1)).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the soft words are not the ones marked'; };
  V['g2-soft-tf'] = (q, m) => { const s = soft(m.word, m.letter), saidSoft = /^[sj] as/.test(m.said); return (s === saidSoft) === q.answer && q.why.answer === (s ? 0 : 1) ? '' : 'true/false or the reason is wrong'; };
  V['g2-long-o'] = q => { const ok = q.options.map(text).filter(o => RIGHT.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the real spelling'; };
  V['g2-air'] = q => { const want = MEANS[text(q.q).replace(/^Which word means (.*)\?$/, '$1')]; return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g2-air-sort'] = (q, m) => { const want = q.options.map((o, i) => (text(o).includes(m.team) ? i : -1)).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words with ' + m.team; };
})();
