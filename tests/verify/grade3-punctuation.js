/* Grade 3 answer checks: capitals and punctuation (grade3/chapters/punctuation.js). The checker has its own rules for speech,
   works out contractions letter by letter, and checks titles word by word. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const SPEECH = /^“([A-Z][^”]*?)([,?!])” (said|asked|shouted) [A-Z][a-z]+\.$/;
  const FITS = { ',': 'said', '?': 'asked', '!': 'shouted' };
  const speechOk = s => { const m = s.match(SPEECH); return !!m && FITS[m[2]] === m[3] && !/[.,?!]$/.test(m[1]); };
  /* contractions: the two words, the short form; the short form is the words with some letters swapped for one apostrophe */
  const LONG = { 'do not': 1, 'cannot': 1, 'is not': 1, 'I am': 1, 'it is': 1, 'we are': 1, 'they are': 1, 'you will': 1, 'she is': 1, 'did not': 1, 'I will': 1, 'let us': 1 };
  const SAY = { 'do not': "don't", cannot: "can't", 'is not': "isn't", 'I am': "I'm", 'it is': "it's", 'we are': "we're", 'they are': "they're", 'you will': "you'll", 'she is': "she's", 'did not': "didn't", 'I will': "I'll", 'let us': "let's" };
  const plain = s => s.replace(/’/g, "'");
  const gap = (long, short) => { const [a, b] = plain(short).split("'"), l = long.replace(' ', ''); return l.startsWith(a) && l.endsWith(b) ? l.slice(a.length, l.length - b.length) : null; };
  const SMALL = new Set('a an the and of in at to on for'.split(' '));
  const titleOk = t => t.split(' ').every((w, i) => i === 0 ? /^[A-Z]/.test(w) : SMALL.has(w.toLowerCase()) ? w === w.toLowerCase() : /^[A-Z]/.test(w));

  V['g3-speech'] = q => { const ok = q.options.map(text).filter(speechOk); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'speech written right: ' + ok.join(' | '); };
  V['g3-speech-mark'] = q => { const s = text(q.fig).replace(/\s*”/, H.marked(q) + '”'); return speechOk(s) ? '' : 'with that mark it reads "' + s + '"'; };
  V['g3-speech-tf'] = (q, m) => H.has(q.fig, m.shown) && speechOk(text(m.shown)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-cap-speech'] = q => { const ok = q.options.map(text).filter(s => /“[A-Z]/.test(s)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the one with a capital'; };
  V['g3-contraction'] = (q, m) => { const want = SAY[m.long]; return LONG[m.long] && plain(H.marked(q) || '') === want && gap(m.long, want) ? '' : 'expected ' + want; };
  V['g3-match-con'] = q => q.pairs.every(p => SAY[text(p[0])] === plain(text(p[1]))) ? '' : 'a pair is matched wrong';
  V['g3-missing'] = (q, m) => { const g = gap(m.long, m.short); return g && H.marked(q) === g ? '' : 'expected ' + g; };
  V['g3-title'] = q => { const ok = q.options.map(text).filter(titleOk); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'titles written right: ' + ok.join(' | '); };
})();
