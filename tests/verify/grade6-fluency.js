/* Grade 6 answer checks: reading fluently (grade6/chapters/fluency.js). The checker keeps its own key of phrase breaks and readings,
   and works out the voice for a mark from the last mark in the sentence. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const GOOD = ['The old canoe / drifted slowly / across the lake.', 'After the storm, / the whole town / helped clean up.', 'My cousin from Iqaluit / sent us a photo / of the northern lights.',
    'When the bell rang, / the students / lined up quietly.', 'Beside the river, / a great blue heron / stood perfectly still.', 'If you finish early, / read a chapter / of your book.'];
  V['g6-phrasing'] = q => { const fit = q.options.map(text).filter(o => GOOD.includes(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the split into meaningful phrases'; };
  const lastMark = s => /\.\.\.$/.test(s) ? '...' : /\?$/.test(s) ? '?' : /!$/.test(s) ? '!' : /,/.test(s) ? ',' : '.';
  const VOICE = { '?': 'rises at the end', ',': 'pauses briefly', '!': 'sounds strong and excited', '...': 'trails off, as if more is coming', '.': 'drops and stops' };
  V['g6-voice'] = (q, m) => { const s = text(q.fig), mark = lastMark(s) === '.' && s.includes(',') ? ',' : lastMark(s); return mark === m.mark && mk(q) === VOICE[mark] ? '' : 'expected ' + VOICE[mark]; };
  V['g6-voice-match'] = q => q.pairs.every(p => { const s = text(p[0]), mark = lastMark(s) === '.' && s.includes(',') ? ',' : lastMark(s); return VOICE[mark] === text(p[1]); }) ? '' : 'a sentence is matched to the wrong voice';
  const PACE = { 'the steps of a science experiment': 'slowly and carefully', 'a favourite comic, just for fun': 'at a quick, easy pace', 'a tense, scary part of a story aloud': 'slower, with pauses for effect',
    'a website, to find one fact': 'quickly, then slow down at the fact', 'a poem to the class': 'steadily, with the rhythm of the lines' };
  V['g6-pace'] = (q, m) => mk(q) === PACE[m.why] && text(q.q).includes(m.why) ? '' : 'expected ' + PACE[m.why];
  V['g6-pace-tf'] = (q, m) => (PACE[m.why] === m.said) === q.answer ? '' : 'true/false is wrong';
  /* how to say a line, from its speaking word */
  const HOW = { shouted: 'loud and urgent', whispered: 'soft and sad', cheered: 'loud and joyful', groaned: 'tired and unwilling', nervously: 'quiet and nervous', warmly: 'calm and warm' };
  const howOf = s => HOW[Object.keys(HOW).find(w => new RegExp('\\b' + w + '\\b').test(s))];
  V['g6-express'] = q => mk(q) === howOf(text(q.fig)) ? '' : 'expected ' + howOf(text(q.fig));
  V['g6-express-match'] = q => q.pairs.every(p => howOf(text(p[0])) === text(p[1])) ? '' : 'a line is matched to the wrong way of saying it';
  const STRESS = { 'Someone else ate it.': 'I', 'I did something else with it.': 'eat', 'I ate a different muffin.': 'last', 'Ava said it, not someone else.': 'Ava', 'Friday, not another day.': 'Friday.',
    'A test, not a quiz.': 'test', 'Us, not other people.': 'We', 'We did not drive.': 'walked', 'The park, not somewhere else.': 'park.' };
  V['g6-stress'] = (q, m) => text(q.tiles[q.answer]) === STRESS[m.means] ? '' : 'expected to stress ' + STRESS[m.means];
})();
