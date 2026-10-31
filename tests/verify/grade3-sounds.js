/* Grade 3 answer checks: syllables and spelling patterns (grade3/chapters/sounds.js).
   The checker keeps its own list of how words split into beats, and works out vowel-team spellings from where the sound is. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const SPLITS = ('sun-set rab-bit nap-kin bas-ket muf-fin pic-nic kit-ten hel-met pup-pet den-tist ti-ger ro-bot pa-per mu-sic ze-ro ba-by ca-noe mo-ment ' +
    'but-ter-fly ca-ri-bou hos-pi-tal to-bog-gan fan-tas-tic com-put-er bi-cy-cle an-i-mal cat dog snow frog tree lake').split(' ');
  const BEATS = {};
  SPLITS.forEach(s => { BEATS[s.replace(/-/g, '')] = s.split('-'); });
  const n = w => (BEATS[w] || []).length;
  /* long vowel teams: the one with y or w goes at the end of a word, the one with i or a in the middle */
  const TEAMS = { ai: 'ay', ay: 'ai', oa: 'ow', ow: 'oa' };
  const teamIn = w => { for (let i = 0; i < w.length - 1; i++) if (TEAMS[w.slice(i, i + 2)]) return { at: i, t: w.slice(i, i + 2) }; return null; };
  const rightTeam = (w, at) => { const t = teamIn(w); const atEnd = at + 2 === w.length; return /a/.test(t.t) && !/o/.test(t.t) ? (atEnd ? 'ay' : 'ai') : (atEnd ? 'ow' : 'oa'); };
  const TRICKY = new Set('said because friend people again could their laugh answer beautiful'.split(' '));

  V['g3-beats'] = (q, m) => n(m.word) && H.marked(q) === String(n(m.word)) ? '' : 'expected ' + n(m.word) + ' beats in ' + m.word;
  V['g3-split'] = (q, m) => BEATS[m.word] && H.marked(q) === BEATS[m.word].join('-') ? '' : 'expected ' + (BEATS[m.word] || []).join('-');
  V['g3-build-beats'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])); return BEATS[m.word] && b.join('-') === BEATS[m.word].join('-') && text(q.q).includes(m.word) ? '' : 'built ' + b.join('-'); };
  V['g3-match-beats'] = q => q.pairs.every(p => +text(p[1]).split(' ')[0] === n(text(p[0]))) ? '' : 'a word is matched to the wrong number of beats';
  V['g3-pick-long'] = q => { const want = q.options.map((o, i) => n(text(o)) === 3 ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the 3-beat words are not the ones marked'; };
  V['g3-fill-team'] = (q, m) => { const t = teamIn(m.word); return t && text(q.tiles[q.answer]) === rightTeam(m.word, t.at) && t.t === rightTeam(m.word, t.at) ? '' : 'expected ' + (t && rightTeam(m.word, t.at)); };
  V['g3-spell-team'] = q => {
    const ok = q.options.map(text).filter(w => { const t = teamIn(w); return t && t.t === rightTeam(w, t.at); });
    return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected ' + ok.join('/');
  };
  V['g3-sort-team'] = (q, m) => { const want = q.options.map((o, i) => text(o).endsWith(m.team) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words ending in ' + m.team; };
  V['g3-tf-team'] = (q, m) => {
    const endTeam = m.team === 'ay' || m.team === 'ow';
    if (!text(q.fig).includes(m.team)) return 'the sentence does not show the team';
    if ((endTeam === m.end) !== q.answer) return 'true/false is wrong';
    const why = text(q.why.options[q.why.answer]);
    return why.includes(m.team + ' is ' + (endTeam ? 'at the end' : 'in the middle')) ? '' : 'the reason does not fit: ' + why;
  };
  V['g3-tricky'] = (q, m) => TRICKY.has(m.word) && H.marked(q) === m.word && q.options.map(text).filter(o => TRICKY.has(o)).length === 1 ? '' : 'expected ' + m.word;
})();
