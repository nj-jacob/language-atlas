/* Grade 6 answer checks: word meanings (grade6/chapters/vocabulary.js). The checker keeps its own answer key (a second marker) and
   checks what it can from the sentence itself: the clue must be in the sentence, and the signal words decide the kind of clue. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const MEAN = { nocturnal: 'active at night', meteorologist: 'a scientist who studies weather', timid: 'shy and nervous', elated: 'very happy',
    amenities: 'useful things provided for people', crustaceans: 'sea animals with hard outer shells', bland: 'without much flavour', concise: 'short and clear' };
  const CLUE = { nocturnal: 'which means they are active at night', meteorologist: 'a scientist who studies weather', timid: 'Unlike', elated: 'but her friends were disappointed',
    amenities: 'such as washrooms, picnic tables and a splash pad', crustaceans: 'such as crabs, lobsters and shrimp', bland: 'or plain', concise: 'or short and clear' };
  /* the kind of clue, from its signal words */
  const kindOf = clue => /^which means|^a scientist who/.test(clue) ? 'It tells you what the word means.' : /^such as/.test(clue) ? 'It gives examples.' : /^(Unlike|but)\b/.test(clue) ? 'It shows the opposite.' : /^or /.test(clue) ? 'It gives a word that means the same.' : null;
  V['g6-ctx-mean'] = (q, m) => H.has(q.fig, m.word) && mk(q) === MEAN[m.word] ? '' : 'expected ' + MEAN[m.word];
  V['g6-clue-words'] = (q, m) => text(q.fig).includes(CLUE[m.word]) && mk(q) === CLUE[m.word] && q.options.map(text).filter(o => text(q.fig).includes(o)).length === 1 ? '' : 'expected the clue in the sentence';
  V['g6-clue-kind'] = (q, m) => mk(q) === kindOf(CLUE[m.word]) ? '' : 'expected ' + kindOf(CLUE[m.word]);
  const PARTS = { 'biodegradable': 'able to break down naturally', 'transcontinental': 'across the continent', 'inaudible': 'not able to be heard', 'misinterpreted': 'understood wrongly',
    'subarctic': 'just below the Arctic', 'visibility': 'how far you can see' };
  V['g6-parts-mean'] = q => { const w = Object.keys(PARTS).find(x => text(q.fig).includes(x)); return w && mk(q) === PARTS[w] ? '' : 'expected ' + (w && PARTS[w]); };

  /* shades: the checker's own strength scale, 1 (mild) to 3 (extreme) */
  const STRENGTH = { cool: 1, cold: 2, frigid: 3, warm: 1, hot: 2, scorching: 3, glad: 1, happy: 2, overjoyed: 3, tired: 1, weary: 2, exhausted: 3, small: 1, tiny: 2, microscopic: 3,
    damp: 1, wet: 2, soaked: 3, nibble: 1, eat: 2, devour: 3, whisper: 1, talk: 2, shout: 3, dislike: 1, hate: 2, loathe: 3 };
  const POS = new Set('thrifty curious confident determined relaxed unique youthful chatty'.split(' ')), NEG = new Set('cheap nosy arrogant stubborn lazy weird childish mouthy'.split(' '));
  V['g6-shade-order'] = q => q.items.map(text).every((w, i, a) => STRENGTH[w] && (i === 0 || STRENGTH[w] > STRENGTH[a[i - 1]])) ? '' : 'the words are not from weakest to strongest';
  V['g6-strongest'] = (q, m) => { const s = q.tiles.map(text).map(w => STRENGTH[w]), want = m.most === 'weakest' ? Math.min(...s) : Math.max(...s); return STRENGTH[mk(q)] === want && s.filter(x => x === want).length === 1 ? '' : 'expected the ' + m.most + ' word'; };
  V['g6-positive'] = (q, m) => (m.want === 'positive' ? POS : NEG).has(mk(q)) && q.tiles.map(text).filter(w => (m.want === 'positive' ? POS : NEG).has(w)).length === 1 ? '' : 'expected the ' + m.want + ' word';
  V['g6-pick-positive'] = q => H.sameSet(q.options.map((o, i) => (POS.has(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the compliments are not the ones marked';

  /* subject words: the checker's own glossary */
  const GLOSS = { habitat: ['the natural home of a plant or animal', 'Science'], erosion: ['the wearing away of land by wind or water', 'Science'], adaptation: ['a feature that helps a living thing survive', 'Science'],
    treaty: ['a formal agreement between nations', 'Social Studies'], democracy: ['a government chosen by the people', 'Social Studies'], perimeter: ['the distance around a shape', 'Math'],
    ratio: ['a comparison of two amounts', 'Math'], tempo: ['the speed of a piece of music', 'Arts'], sketch: ['a quick, rough drawing', 'Arts'] };
  const FITS = { habitat: 'frogs and herons', erosion: 'along the cliffs', adaptation: 'keeps polar bears warm', treaty: 'sharing the land', democracy: 'citizens vote',
    perimeter: 'enough fencing', ratio: '2 to 3', tempo: 'played the song', sketch: 'started the painting' };
  V['g6-subj-mean'] = (q, m) => mk(q) === GLOSS[m.word][0] ? '' : 'expected ' + GLOSS[m.word][0];
  V['g6-subj-match'] = q => q.pairs.every(p => (GLOSS[text(p[0])] || [])[0] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g6-subj-which'] = (q, m) => mk(q) === GLOSS[m.word][1] ? '' : 'expected ' + GLOSS[m.word][1];
  V['g6-subj-gap'] = q => { const s = text(q.fig), fit = q.options.map(text).filter(w => FITS[w] && s.includes(FITS[w])); return fit.length === 1 && mk(q) === fit[0] ? '' : 'the word that fits the sentence is not the one marked'; };
})();
