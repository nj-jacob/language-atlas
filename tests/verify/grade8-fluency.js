/* Grade 8 answer checks: reading fluently (grade8/chapters/fluency.js). Own word lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);
  const onlyOne = (list, ok) => list.filter(ok).length === 1;
  /* small words and describing words that always go with the word after them, so a phrase never ends on one */
  const GLUE = new Set('the a an my our to in of on with by who before whole back science new long short'.split(' '));
  const smooth = o => o.split(' / ').every((ph, i, all) => i === all.length - 1 || !GLUE.has(ph.split(' ').pop().toLowerCase()));
  /* how many breaths each sentence takes, by its first words: the checker's own key */
  const BREATHS = { 'When the storm': 3, 'My cousin, who': 4, 'Although the trail': 3, 'The students in': 3, 'After weeks of': 3, 'Because the ice': 3, 'On the first': 3, 'The canoe that': 4,
    'If the ferry': 3, 'Every spring, the': 4, 'My grandmother taught': 4, 'While the band': 4, 'The library on': 4, 'During the long': 4, 'The coach of': 4, 'As the sun': 3 };
  const breaths = s => BREATHS[Object.keys(BREATHS).find(k => s.startsWith(k))];
  const VOICE = [[/;/, 'medium pause'], [/—/, 'sudden break'], [/…/, 'trail off'], [/\(/, 'lower'], [/:/, 'leads into']];
  const voiceFor = s => VOICE.filter(v => v[0].test(s)).map(v => v[1]);
  const MARK = { ';': 'medium pause', '—': 'sudden break', '…': 'trail off', '( )': 'lower', ':': 'leads into' };
  /* which word carries each meaning: the checker's own key */
  const STRESS = { 'Someone else borrowed it.': 'Maya', "She borrowed someone else's bike.": 'my', 'She borrowed something else of mine.': 'bike',
    'Theo said it, not someone else.': 'Theo', 'The test is on Friday, not the project.': 'test', 'It is on Friday, not another day.': 'Friday',
    'We need two, not one or three.': 'two', 'We need volunteers, not paid staff.': 'volunteers', 'We need them on Saturday, not Sunday.': 'Saturday',
    'I did it, not someone else.': 'I', 'The blue one, not the red one.': 'blue', 'At the rink, not at school.': 'rink',
    'Amira wants it, not her brother.': 'Amira', 'A small one, not a large one.': 'small', 'Tonight, not tomorrow.': 'tonight',
    'The bus leaves then, not the train.': 'bus', 'It leaves at eight; it does not arrive then.': 'leaves', 'At eight, not at nine.': 'eight',
    'Someone said it, but not Kai.': 'Kai', 'He hinted at it, but never said it.': 'said', 'He said something, just not that he was sick.': 'sick',
    'My aunt bought it, not my uncle.': 'aunt', 'She bought it; she did not rent it.': 'bought', 'The red one, not the green one.': 'red',
    'In the gym, not the library.': 'gym', 'After lunch, not before.': 'after', 'After lunch, not after school.': 'lunch',
    'Leila finished, not her partner.': 'Leila', 'She finished it; she did not just start it.': 'finished', 'On time, not late.': 'time' };
  /* the stressed word is the one in capitals */
  const loud = h => ((h || '').match(/<b>([A-Z]+)<\/b>/) || [])[1] || '';
  const sameWord = (a, b) => a.toLowerCase() === b.toLowerCase();
  const kindOfDense = s => /^Step \d/.test(s) ? 'steps' : /\d/.test(s) ? 'numbers' : /Photosynthesis|Mitochondria|Igneous|Condensation|hypotenuse|Chlorophyll/.test(s) ? 'new term' : '';
  /* what kind of text an example is, from how it is written */
  const textKind = s => /^1\./.test(s) ? 'instructions' : / \/ /.test(s) ? 'a poem' : /!|if not us|deserves/.test(s) ? 'a persuasive speech'
    : /\d|this morning|officials|announced|resumed/.test(s) ? 'a news report' : 'a suspenseful story';
  const VOICEOF = { 'a news report': 'announcer', 'a persuasive speech': 'strong stress', 'a suspenseful story': 'quieter', 'a poem': 'line break', instructions: 'between steps' };

  V['g8-phrases'] = q => { const ok = q.options.map(text).filter(smooth); return ok.length === 1 && mk(q) === ok[0] ? '' : 'smooth options: ' + ok.join(' | '); };
  V['g8-first-break'] = q => { const t = q.tiles.map(text), i = t.findIndex(w => w.endsWith(',')); return i >= 0 && q.answer === i ? '' : 'the first pause comes after "' + t[i] + '"'; };
  V['g8-count-phrases'] = q => +mk(q) === breaths(text(q.fig)) ? '' : 'expected ' + breaths(text(q.fig));
  V['g8-phrase-tf'] = (q, m) => { const right = smooth(text(m.shown)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-mark'] = (q, m) => { const v = voiceFor(m.s); return v.length === 1 && mk(q).includes(v[0]) && H.has(q.fig, m.s) ? '' : 'expected ' + v; };
  V['g8-match-marks'] = q => q.pairs.every(p => text(p[1]).includes(MARK[text(p[0])])) ? '' : 'a mark is matched wrong';
  V['g8-mark-which'] = (q, m) => { const ok = o => voiceFor(o).length === 1 && text(m.want).includes(voiceFor(o)[0]); return ok(mk(q)) && onlyOne(q.options.map(text), ok) ? '' : 'the sentence marked does not ask for ' + m.want; };
  V['g8-mark-tf'] = (q, m) => q.answer === text(m.said).includes(voiceFor(m.s)[0]) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-stress'] = (q, m) => mk(q) === STRESS[text(m.mean)] && text(m.s).includes(mk(q)) ? '' : 'expected ' + STRESS[text(m.mean)];
  V['g8-stress-meaning'] = (q, m) => STRESS[mk(q)] === m.word ? '' : 'the meaning marked does not fit stress on ' + m.word;
  V['g8-stress-tf'] = (q, m) => { const w = loud(q.fig); return q.answer === sameWord(STRESS[text(m.said)] || '', w) && q.why.answer === 0 ? '' : 'true/false is wrong for stress on ' + w; };
  V['g8-stress-match'] = q => q.pairs.every(p => sameWord(STRESS[text(p[1])] || '', loud(p[0]))) ? '' : 'a stress is matched to the wrong meaning';
  V['g8-pace'] = (q, m) => mk(q) === (kindOfDense(text(m.s)) ? 'slow down' : 'an easy, natural pace') ? '' : 'wrong pace for ' + m.s;
  V['g8-slow'] = q => { const d = q.options.map(text).filter(kindOfDense); return d.length === 1 && mk(q) === d[0] ? '' : 'expected the dense sentence'; };
  V['g8-why-slow'] = (q, m) => { const k = kindOfDense(text(m.s)); return k && mk(q).includes(k) ? '' : 'expected ' + k; };
  V['g8-pace-tf'] = (q, m) => q.answer === (m.says === !!kindOfDense(text(m.s))) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
  V['g8-purpose-voice'] = (q, m) => mk(q).includes(VOICEOF[textKind(text(m.s))]) ? '' : 'expected the voice for ' + textKind(text(m.s));
  V['g8-match-purpose'] = q => q.pairs.every(p => text(p[1]).includes(VOICEOF[text(p[0])])) ? '' : 'a text is matched to the wrong voice';
  V['g8-text-kind'] = (q, m) => mk(q) === textKind(text(m.s)) ? '' : 'it is ' + textKind(text(m.s));
  V['g8-voice-purpose-tf'] = (q, m) => q.answer === text(m.said).includes(VOICEOF[textKind(text(m.s))]) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.s;
})();
