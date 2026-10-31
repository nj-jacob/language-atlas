/* Grade 1 answer checks: reading smoothly (grade1/chapters/fluency.js). The checker keeps its own word lists and answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const SIGHT = new Set('said was they the you are of come one have what where some there do'.split(' '));
  const FIT = { 'The cat ___ asleep on the mat.': 'was', 'Where ___ my boots?': 'are', 'I ___ a red bike.': 'have', 'Mom ___, "Time for bed."': 'said', '___ you want to play?': 'Do',
    'A cup ___ milk is on the table.': 'of', 'Can you ___ to my house?': 'come', 'Leila and Sam said ___ would help.': 'they' };
  const VOICE = { '.': /^Stop/, '?': /go up/, '!': /strong, excited/ };
  const GLUE = new Set('the a my big little red small two to in on after our likes'.split(' '));
  const smooth = o => { const chunks = text(o).split(' / '); return chunks.length === 2 && chunks.slice(0, -1).every(c => !GLUE.has(c.split(' ').pop().toLowerCase())); };
  const GOOD = { 'Read like you are talking.': true, 'Stop for a moment at a period.': true, 'Read as fast as you can.': false, 'Skip words you do not know.': false,
    'Go back and fix a word that does not make sense.': true, 'Read in one flat voice.': false };
  V['g1-sight-fit'] = (q, m) => FIT[m.s] && H.marked(q) === FIT[m.s] ? '' : 'expected ' + FIT[m.s];
  V['g1-sight-spell'] = (q, m) => { const ok = q.options.map(text).filter(o => SIGHT.has(o)); return ok.length === 1 && H.marked(q) === ok[0] && ok[0] === m.w ? '' : 'expected ' + m.w; };
  V['g1-sight-pick'] = q => H.sameSet(q.options.map((o, i) => SIGHT.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words spelled right are not the ones marked';
  V['g1-sight-build'] = (q, m) => SIGHT.has(m.w) && q.answer.map(i => text(q.parts[i])).join('') === m.w ? '' : 'the letters do not build ' + m.w;
  V['g1-voice-for'] = (q, m) => { const mark = text(q.fig).slice(-1); return text(q.fig) === m.s && VOICE[mark] && VOICE[mark].test(text(H.marked(q) || '')) ? '' : 'the voice does not fit the mark ' + mark; };
  V['g1-match-mark'] = q => q.pairs.every(p => VOICE[text(p[0])] && VOICE[text(p[0])].test(text(p[1]))) ? '' : 'a mark is matched to the wrong voice';
  V['g1-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the one read in smooth phrases'; };
  V['g1-tip-tf'] = (q, m) => GOOD[m.tip] === q.answer && text(q.fig) === m.tip && /sounds like talking/.test(text(q.why.options[q.why.answer])) ? '' : 'true/false is wrong for "' + m.tip + '"';
})();
