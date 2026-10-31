/* Grade 8 answer checks: reading fluently (grade8/chapters/fluency.js). Own word lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* small words and describing words that always go with the word after them, so a phrase never ends on one */
  const GLUE = new Set('the a an my to in of who before whole back science'.split(' '));
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !GLUE.has(ph.split(' ').pop().toLowerCase()));
  const VOICE = [[/;/, 'medium pause'], [/—/, 'sudden break'], [/…/, 'trail off'], [/\(/, 'lower'], [/:/, 'leads into']];
  const voiceFor = s => VOICE.filter(v => v[0].test(s)).map(v => v[1]);
  const MARK = { ';': 'medium pause', '—': 'sudden break', '…': 'trail off', '( )': 'lower', ':': 'leads into' };
  /* which word carries each meaning: the checker's own key */
  const STRESS = { 'Someone else borrowed it.': 'Maya', "She borrowed someone else's bike.": 'my', 'She borrowed something else of mine.': 'bike',
    'Theo said it, not someone else.': 'Theo', 'The test is on Friday, not the project.': 'test', 'It is on Friday, not another day.': 'Friday',
    'We need two, not one or three.': 'two', 'We need volunteers, not paid staff.': 'volunteers', 'We need them on Saturday, not Sunday.': 'Saturday' };
  const dense = s => /\d|Photosynthesis|Mitochondria|terminal/.test(s);
  const VOICEOF = [[/council voted/, 'announcer'], [/must do better/, 'strong stress'], [/footsteps/, 'quieter'], [/ \/ /, 'line break'], [/^1\./, 'between steps']];
  const PURPOSE = { 'a news report': 'announcer', 'a persuasive speech': 'strong stress', 'a suspenseful story': 'quieter', 'a poem': 'line break', instructions: 'between steps' };

  V['g8-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g8-first-break'] = q => { const t = q.tiles.map(text), i = t.findIndex(w => w.endsWith(',')); return i >= 0 && q.answer === i ? '' : 'the first pause comes after "' + t[i] + '"'; };
  V['g8-mark'] = (q, m) => { const v = voiceFor(m.s); return v.length === 1 && mk(q).includes(v[0]) && H.has(q.fig, m.s) ? '' : 'expected ' + v; };
  V['g8-match-marks'] = q => q.pairs.every(p => text(p[1]).includes(MARK[text(p[0])])) ? '' : 'a mark is matched wrong';
  V['g8-stress'] = (q, m) => mk(q) === STRESS[text(m.mean)] && text(m.s).includes(mk(q)) ? '' : 'expected ' + STRESS[text(m.mean)];
  V['g8-stress-meaning'] = (q, m) => STRESS[mk(q)] === m.word ? '' : 'the meaning marked does not fit stress on ' + m.word;
  V['g8-slow'] = q => { const d = q.options.map(text).filter(dense); return d.length === 1 && mk(q) === d[0] ? '' : 'expected the dense sentence'; };
  V['g8-purpose-voice'] = (q, m) => { const v = VOICEOF.find(x => x[0].test(m.s)); return v && mk(q).includes(v[1]) ? '' : 'expected the voice with "' + (v && v[1]) + '"'; };
  V['g8-match-purpose'] = q => q.pairs.every(p => text(p[1]).includes(PURPOSE[text(p[0])])) ? '' : 'a text is matched to the wrong voice';
})();
