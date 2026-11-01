/* Grade 3 answer checks: capitals and punctuation (grade3/chapters/punctuation.js). The checker has its own rules for speech and
   quotations, works out contractions letter by letter, and checks titles word by word. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const FITS = { ',': 'said', '?': 'asked', '!': 'shouted' }, ENDS = { '.': 'said', '?': 'asked', '!': 'shouted' };
  /* speech first: "Can I help?" asked Noor. */
  const SPEECH = /^“([A-Z][^”]*?)([,?!])” (said|asked|shouted) [A-Z][a-z]+\.$/;
  const speechOk = s => { const m = s.match(SPEECH); return !!m && FITS[m[2]] === m[3] && !/[.,?!]$/.test(m[1]); };
  /* speaker first: Noor asked, "Can I help?" */
  const SAID = /^[A-Z][a-z]+ (said|asked|shouted), “([A-Z][^”]*?)([.?!])”$/;
  const saidOk = s => { const m = s.match(SAID); return !!m && ENDS[m[3]] === m[1] && !/[.,?!]$/.test(m[2]); };
  /* quoting a text: The sign says, "Please stay on the trail." */
  const quoteOk = s => /^The [a-z ]+ says, “[A-Z][^”]*[.!?]”$/.test(s);
  const SAY = { 'do not': "don't", cannot: "can't", 'is not': "isn't", 'I am': "I'm", 'it is': "it's", 'we are': "we're", 'they are': "they're", 'you will': "you'll", 'she is': "she's",
    'did not': "didn't", 'I will': "I'll", 'let us': "let's", 'are not': "aren't", 'was not': "wasn't", 'were not': "weren't", 'has not': "hasn't", 'have not': "haven't",
    'could not': "couldn't", 'he is': "he's", 'we will': "we'll", 'they will': "they'll", 'I have': "I've", 'you are': "you're", 'that is': "that's" };
  const plain = s => s.replace(/’/g, "'");
  const shortOf = long => { const s = SAY[long] || SAY[long.toLowerCase()]; return s && /^[A-Z]/.test(long) && long !== 'I am' && !/^I /.test(long) ? s[0].toUpperCase() + s.slice(1) : s; };
  const gap = (long, short) => { const [a, b] = plain(short).split("'"), l = long.replace(' ', ''); return l.startsWith(a) && l.endsWith(b) ? l.slice(a.length, l.length - b.length) : null; };
  const SMALL = new Set('a an the and of in at to on for'.split(' '));
  const titleOk = t => t.split(' ').every((w, i) => i === 0 ? /^[A-Z]/.test(w) : SMALL.has(w.toLowerCase()) ? w === w.toLowerCase() : /^[A-Z]/.test(w));
  const badWord = (w, i) => i === 0 ? !/^[A-Z]/.test(w) : SMALL.has(w.toLowerCase()) ? w !== w.toLowerCase() : !/^[A-Z]/.test(w);
  const one = (q, ok) => { const list = q.options.map(text).filter(ok); return list.length === 1 && H.marked(q) === list[0]; };
  /* the sentence with the marked tile put in the gap (the gap shows as nothing in the text) */
  const filled = (q, before) => { const f = text(q.fig), t = text(q.tiles[q.answer]), i = f.indexOf(before) + before.length; return f.slice(0, i) + t + f.slice(i); };

  V['g3-speech'] = q => one(q, speechOk) ? '' : 'expected the one sentence with speech written right';
  V['g3-speech-tf'] = (q, m) => H.has(q.fig, m.shown) && speechOk(text(m.shown)) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-inside-marks'] = (q, m) => { const f = text(q.fig), spoken = f.replace(/[,?!] (said|asked|shouted) [A-Z][a-z]+\.$/, ''); return H.marked(q) === spoken && f.endsWith(m.who + '.') ? '' : 'expected "' + spoken + '"'; };
  V['g3-pick-speech'] = q => { const want = q.options.map((o, i) => speechOk(text(o)) ? i : -1).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the sentences written right are not the ones marked'; };
  V['g3-speech-mark'] = q => { const s = text(q.fig).replace(/\s*”/, H.marked(q) + '”'); return speechOk(s) ? '' : 'with that mark it reads "' + s + '"'; };
  V['g3-any-mark'] = q => { const s = text(q.fig).replace(/\s*”/, H.marked(q) + '”'); return speechOk(s) && q.tiles.map(text).filter(t => speechOk(text(q.fig).replace(/\s*”/, t + '”'))).length === 1 ? '' : 'with that mark it reads "' + s + '"'; };
  V['g3-said-comma'] = q => { const s = text(q.fig).replace(/ (said|asked|shouted) “/, (x, v) => ' ' + v + H.marked(q) + ' “'); return saidOk(s) ? '' : 'with that mark it reads "' + s + '"'; };
  V['g3-comma-tf'] = (q, m) => text(q.fig) === text(m.shown) && speechOk(text(m.shown)) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-cap-speech'] = q => one(q, saidOk) ? '' : 'expected the one with a capital';
  V['g3-cap-tap'] = q => { const t = q.tiles.map(text), i = t.findIndex(w => w.startsWith('“')); return i >= 0 && q.answer === i && /^“[a-z]/.test(t[i]) ? '' : 'expected the first spoken word'; };
  V['g3-cap-tf'] = (q, m) => text(q.fig) === text(m.shown) && saidOk(text(m.shown)) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-cap-both'] = q => one(q, saidOk) ? '' : 'expected the one with a comma and a capital';
  V['g3-quote'] = q => one(q, quoteOk) ? '' : 'expected the one quotation written right';
  V['g3-quote-tf'] = (q, m) => text(q.fig) === text(m.shown) && quoteOk(text(m.shown)) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-quote-words'] = q => { const f = text(q.fig), words = f.replace(/^The [a-z ]+ says, /, ''); return H.marked(q) === words ? '' : 'expected "' + words + '"'; };
  V['g3-quote-comma'] = q => quoteOk(filled(q, 'says')) ? '' : 'with that mark it reads "' + filled(q, 'says') + '"';
  V['g3-contraction'] = (q, m) => { const want = SAY[m.long]; return want && plain(H.marked(q) || '') === want && gap(m.long, want) ? '' : 'expected ' + want; };
  V['g3-match-con'] = q => q.pairs.every(p => SAY[text(p[0])] === plain(text(p[1]))) ? '' : 'a pair is matched wrong';
  V['g3-missing'] = (q, m) => { const g = gap(m.long, m.short); return g && H.marked(q) === g ? '' : 'expected ' + g; };
  V['g3-con-gap'] = (q, m) => { const want = shortOf(m.long); return want && plain(H.marked(q) || '') === want && H.has(q.fig, m.long) ? '' : 'expected ' + want; };
  V['g3-con-tf'] = (q, m) => (plain(m.said) === SAY[m.long]) === q.answer ? '' : 'true/false is wrong for ' + m.said;
  V['g3-title'] = q => one(q, titleOk) ? '' : 'expected the one title written right';
  V['g3-title-tf'] = (q, m) => text(q.fig) === m.shown && titleOk(m.shown) === q.answer ? '' : 'true/false is wrong for ' + m.shown;
  V['g3-title-cap'] = q => { const t = q.tiles.map(text), bad = t.map((w, i) => badWord(w, i) ? i : -1).filter(i => i >= 0); return bad.length === 1 && bad[0] === q.answer && !/^[A-Z]/.test(t[q.answer]) ? '' : 'the word that needs a capital is not marked'; };
  V['g3-title-small'] = q => { const t = q.tiles.map(text), bad = t.map((w, i) => badWord(w, i) ? i : -1).filter(i => i >= 0); return bad.length === 1 && bad[0] === q.answer && SMALL.has(t[q.answer].toLowerCase()) ? '' : 'the small word with a capital is not marked'; };
})();
