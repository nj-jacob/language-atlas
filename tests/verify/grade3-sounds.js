/* Grade 3 answer checks: syllables and spelling patterns (grade3/chapters/sounds.js).
   The checker keeps its own list of how words split into beats and how tricky words are spelled, and works out vowel-team
   spellings from where the sound is in the word. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const SPLITS = ('sun-set rab-bit nap-kin bas-ket muf-fin pic-nic kit-ten hel-met pup-pet den-tist mit-ten blan-ket win-dow gar-den win-ter sis-ter ' +
    'hap-pen but-ton tun-nel lad-der pen-cil cac-tus trum-pet ten-nis plas-tic mag-net in-sect fos-sil ' +
    'ti-ger ro-bot pa-per mu-sic ze-ro ba-by ca-noe mo-ment pi-lot ba-con o-pen hu-man ra-ven so-fa spi-der si-lent fe-ver ' +
    'but-ter-fly ca-ri-bou hos-pi-tal to-bog-gan fan-tas-tic com-put-er bi-cy-cle an-i-mal kan-ga-roo um-brel-la oc-to-pus to-ma-to po-ta-to ' +
    'el-e-phant car-pen-ter hol-i-day buf-fa-lo cin-na-mon por-cu-pine ad-ven-ture wa-ter-mel-on cat-er-pil-lar al-li-ga-tor hel-i-cop-ter ' +
    'cat dog snow frog tree lake moose train bread sled fox park').split(' ');
  const BEATS = {};
  SPLITS.forEach(s => { BEATS[s.replace(/-/g, '')] = s.split('-'); });
  const n = w => (BEATS[w] || []).length;
  const vowel = c => 'aeiouy'.includes(c);
  /* a two-beat split is "between two consonants" when a consonant ends the first beat and starts the second */
  const twoCons = w => { const b = BEATS[w]; return b && b.length === 2 && !vowel(b[0].slice(-1)) && !vowel(b[1][0]); };
  /* long vowel teams: the one with y or w goes at the end of a word, the one with i or a in the middle */
  const PAIR = { ai: 'ay', ay: 'ai', oa: 'ow', ow: 'oa' };
  const lastTeam = w => { for (let i = w.length - 2; i >= 0; i--) if (PAIR[w.slice(i, i + 2)]) return { at: i, t: w.slice(i, i + 2) }; return null; };
  const rightTeam = w => { const t = lastTeam(w), end = t.at + 2 === w.length, a = t.t === 'ai' || t.t === 'ay'; return a ? (end ? 'ay' : 'ai') : (end ? 'ow' : 'oa'); };
  const teamOk = w => { const t = lastTeam(w); return !!t && t.t === rightTeam(w); };
  const TRICKY = new Set(('said because friend people again could would should their laugh answer beautiful where there does many any eight enough through ' +
    'busy school sure once love listen was half walk talk fruit').split(' '));

  V['g3-beats'] = (q, m) => n(m.word) && H.marked(q) === String(n(m.word)) ? '' : 'expected ' + n(m.word) + ' beats in ' + m.word;
  V['g3-match-beats'] = q => q.pairs.every(p => +text(p[1]).split(' ')[0] === n(text(p[0]))) ? '' : 'a word is matched to the wrong number of beats';
  V['g3-pick-long'] = (q, m) => { const want = q.options.map((o, i) => n(text(o)) === m.n ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) && text(q.q).includes(m.n + ' beats') ? '' : 'the ' + m.n + '-beat words are not the ones marked'; };
  V['g3-most-beats'] = q => { const c = q.tiles.map(t => n(text(t))), top = Math.max(...c); return c.filter(x => x === top).length === 1 && c[q.answer] === top ? '' : 'the word with the most beats is not marked'; };
  V['g3-beats-tf'] = (q, m) => n(m.word) && text(q.q).includes(m.word) && (n(m.word) === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word;
  V['g3-split'] = (q, m) => BEATS[m.word] && H.marked(q) === BEATS[m.word].join('-') ? '' : 'expected ' + (BEATS[m.word] || []).join('-');
  V['g3-first-beat'] = (q, m) => BEATS[m.word] && H.marked(q) === BEATS[m.word][0] ? '' : 'expected ' + (BEATS[m.word] || [])[0];
  V['g3-split-tf'] = (q, m) => {
    const b = BEATS[m.word];
    if (!b || !text(q.fig).includes(m.said)) return 'the split is not shown';
    if ((m.said === b.join('-')) !== q.answer) return 'true/false is wrong for ' + m.said;
    const why = text(q.why.options[q.why.answer]);
    return twoCons(m.word) === why.includes('two consonants') ? '' : 'the reason "' + why + '" does not fit ' + m.word;
  };
  V['g3-split-kind'] = q => { const want = q.options.map((o, i) => twoCons(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the two-consonant words are not the ones marked'; };
  V['g3-build-beats'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])); return BEATS[m.word] && b.join('-') === BEATS[m.word].join('-') && text(q.q).includes(m.word) ? '' : 'built ' + b.join('-'); };
  V['g3-order-beats'] = (q, m) => BEATS[m.word] && q.items.map(text).join('-') === BEATS[m.word].join('-') && text(q.q).includes(m.word) ? '' : 'the beats are not in the order of ' + m.word;
  V['g3-missing-beat'] = (q, m) => {
    const b = BEATS[m.word], shown = text(q.fig).split(/\s*·\s*/);
    if (!b || shown.length !== b.length || shown[m.at] !== '?' || shown.some((s, i) => i !== m.at && s !== b[i])) return 'the beats shown do not match ' + m.word;
    return H.marked(q) === b[m.at] ? '' : 'expected ' + b[m.at];
  };
  V['g3-blend'] = (q, m) => { const w = m.beats.replace(/-/g, ''); return BEATS[w] && BEATS[w].join('-') === m.beats && H.marked(q) === w ? '' : 'expected ' + w; };
  V['g3-fill-team'] = (q, m) => lastTeam(m.word) && text(q.tiles[q.answer]) === rightTeam(m.word) && teamOk(m.word) ? '' : 'expected ' + (lastTeam(m.word) && rightTeam(m.word));
  V['g3-spell-team'] = q => { const ok = q.options.map(text).filter(teamOk); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected ' + ok.join('/'); };
  V['g3-sort-team'] = (q, m) => { const want = q.options.map((o, i) => text(o).endsWith(m.team) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words ending in ' + m.team; };
  V['g3-tf-team'] = (q, m) => {
    const endTeam = m.team === 'ay' || m.team === 'ow';
    if (!text(q.fig).includes(m.team)) return 'the sentence does not show the team';
    if ((endTeam === m.end) !== q.answer) return 'true/false is wrong';
    const why = text(q.why.options[q.why.answer]);
    return why.includes(m.team + ' is ' + (endTeam ? 'at the end' : 'in the middle')) ? '' : 'the reason does not fit: ' + why;
  };
  V['g3-team-all'] = q => { const want = q.options.map((o, i) => teamOk(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the words spelled right are not the ones marked'; };
  V['g3-tricky'] = (q, m) => TRICKY.has(m.word) && H.marked(q) === m.word && q.options.map(text).filter(o => TRICKY.has(o)).length === 1 ? '' : 'expected ' + m.word;
  V['g3-tricky-fill'] = (q, m) => {
    const made = q.tiles.map(t => m.before + text(t) + m.after);
    return TRICKY.has(m.word) && made[q.answer] === m.word && made.filter(w => TRICKY.has(w)).length === 1 ? '' : 'the marked letters do not spell ' + m.word;
  };
  V['g3-tricky-tf'] = (q, m) => text(q.fig) === m.said && TRICKY.has(m.said) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-tricky-all'] = q => { const want = q.options.map((o, i) => TRICKY.has(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the words spelled right are not the ones marked'; };
})();
