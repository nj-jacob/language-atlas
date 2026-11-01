/* Grade 6 answer checks: word meanings (grade6/chapters/vocabulary.js). The checker keeps its own answer key (a second marker) and
   checks what it can from the sentence itself: the clue must be in the sentence, and the signal words decide the kind of clue. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const MEAN = { nocturnal: 'active at night', meteorologist: 'a scientist who studies weather', timid: 'shy and nervous', elated: 'very happy',
    amenities: 'useful things provided for people', crustaceans: 'sea animals with hard outer shells', bland: 'without much flavour', concise: 'short and clear',
    delta: 'land made of mud and sand where a river meets the sea', fatigued: 'worn out', hostile: 'unfriendly', arduous: 'very hard to do', provisions: 'food and supplies',
    precipitation: 'water that falls from the sky', lethargic: 'sleepy and slow', tranquil: 'calm and still' };
  const CLUE = { nocturnal: 'which means they are active at night', meteorologist: 'a scientist who studies weather', timid: 'Unlike', elated: 'but her friends were disappointed',
    amenities: 'such as washrooms, picnic tables and a splash pad', crustaceans: 'such as crabs, lobsters and shrimp', bland: 'or plain', concise: 'or short and clear',
    delta: 'is land made of mud and sand', fatigued: 'that is, they were worn out', hostile: 'instead, they were warm and welcoming', arduous: 'but the second one was easy',
    provisions: 'such as bannock, apples and water', precipitation: 'for example rain, snow and hail', lethargic: 'or sleepy and slow', tranquil: 'in other words calm and still' };
  /* the kind of clue, from its signal words */
  const KIND = { definition: 'It tells you what the word means.', example: 'It gives examples.', contrast: 'It shows the opposite.', synonym: 'It gives a word that means the same.' };
  const kindName = s => /^(which means|a scientist who|is\b|that is)/i.test(s) ? 'definition' : /^(such as|for example|including)/i.test(s) ? 'example' : /^(Unlike|but|instead)\b/i.test(s) ? 'contrast' : /^(or|in other words|also called)\b/i.test(s) ? 'synonym' : null;
  const kindOf = clue => KIND[kindName(clue)] || null;
  V['g6-ctx-mean'] = (q, m) => text(q.fig).toLowerCase().includes(m.word) && mk(q) === MEAN[m.word] ? '' : 'expected ' + MEAN[m.word];
  V['g6-clue-words'] = (q, m) => text(q.fig).includes(CLUE[m.word]) && mk(q) === CLUE[m.word] && q.options.map(text).filter(o => text(q.fig).includes(o)).length === 1 ? '' : 'expected the clue in the sentence';
  V['g6-clue-kind'] = (q, m) => mk(q) === kindOf(CLUE[m.word]) ? '' : 'expected ' + kindOf(CLUE[m.word]);
  const tf = (q, right) => q.answer === right && q.why && q.why.answer === (right ? 0 : 1) ? '' : 'expected ' + right;
  V['g6-ctx-tf'] = (q, m) => tf(q, MEAN[m.word] === text(m.said));
  V['g6-word-meaning'] = (q, m) => MEAN[mk(q)] === text(m.mean) ? '' : 'expected the word that means ' + m.mean;
  V['g6-signal-kind'] = (q, m) => { const ok = q.tiles.map(t => kindName(text(t)) === m.kind); return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected a signal for a ' + m.kind + ' clue'; };
  V['g6-match-kinds'] = q => q.pairs.every(p => kindOf(text(p[0])) === text(p[1])) ? '' : 'a signal is matched to the wrong kind';
  V['g6-kind-tf'] = (q, m) => tf(q, kindName(CLUE[m.word]) === m.said);
  const PARTS = { 'biodegradable': 'able to break down naturally', 'transcontinental': 'across the continent', 'inaudible': 'not able to be heard', 'misinterpreted': 'understood wrongly',
    'subarctic': 'just below the Arctic', 'visibility': 'how far you can see', unpredictable: 'not able to be known ahead of time', interprovincial: 'between provinces',
    antibacterial: 'against bacteria', portable: 'able to be carried', construction: 'the act of building', eruption: 'a bursting out' };
  /* words from each word's own sentence, so the checker knows where it belongs */
  const HOME = { biodegradable: 'landfills', transcontinental: 'coast to coast', inaudible: 'back of the gym', misinterpreted: 'wrong way', subarctic: 'long winters', visibility: 'fog',
    unpredictable: 'strong winds', interprovincial: 'every province', antibacterial: 'hospital', portable: 'room to room', construction: 'arena', eruption: 'ash' };
  const boldWord = s => { const d = document.createElement('div'); d.innerHTML = s; const b = d.querySelector('b'); return b ? text(b.innerHTML) : ''; };
  V['g6-parts-mean'] = q => { const w = boldWord(q.fig); return PARTS[w] && mk(q) === PARTS[w] ? '' : 'expected ' + PARTS[w]; };
  V['g6-parts-build'] = (q, m) => q.answer.map(i => text(q.parts[i])).join('') === m.word && PARTS[m.word] ? '' : 'the parts do not build ' + m.word;
  V['g6-parts-tf'] = (q, m) => tf(q, PARTS[boldWord(q.fig)] === text(m.said));
  V['g6-parts-use'] = q => { const ok = q.options.map(o => { const w = boldWord(o); return !!HOME[w] && text(o).includes(HOME[w]); }); return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected the sentence where the word belongs'; };

  /* shades: the checker's own strength scale, 1 (mild) to 3 (extreme) */
  const STRENGTH = { cool: 1, cold: 2, frigid: 3, warm: 1, hot: 2, scorching: 3, glad: 1, happy: 2, overjoyed: 3, tired: 1, weary: 2, exhausted: 3, small: 1, tiny: 2, microscopic: 3,
    damp: 1, wet: 2, soaked: 3, nibble: 1, eat: 2, devour: 3, whisper: 1, talk: 2, shout: 3, dislike: 1, hate: 2, loathe: 3,
    dim: 1, dark: 2, 'pitch-black': 3, like: 1, love: 2, adore: 3, scared: 1, frightened: 2, terrified: 3, big: 1, huge: 2, enormous: 3, upset: 1, angry: 2, furious: 3 };
  /* each word's family of near-synonyms */
  const FAMILY = {}; ['cool cold frigid', 'warm hot scorching', 'glad happy overjoyed', 'tired weary exhausted', 'small tiny microscopic', 'damp wet soaked', 'nibble eat devour', 'whisper talk shout',
    'dislike hate loathe', 'dim dark pitch-black', 'like love adore', 'scared frightened terrified', 'big huge enormous', 'upset angry furious'].forEach((f, i) => f.split(' ').forEach(w => { FAMILY[w] = i; }));
  const POS = new Set('thrifty curious confident determined relaxed unique youthful chatty slender assertive proud energetic'.split(' ')), NEG = new Set('cheap nosy arrogant stubborn lazy weird childish mouthy skinny bossy smug hyper'.split(' '));
  const PARTNER = { thrifty: 'cheap', curious: 'nosy', confident: 'arrogant', determined: 'stubborn', relaxed: 'lazy', unique: 'weird', youthful: 'childish', chatty: 'mouthy', slender: 'skinny', assertive: 'bossy', proud: 'smug', energetic: 'hyper' };
  V['g6-shade-order'] = q => q.items.map(text).every((w, i, a) => STRENGTH[w] && (i === 0 || STRENGTH[w] > STRENGTH[a[i - 1]])) ? '' : 'the words are not from weakest to strongest';
  V['g6-strongest'] = (q, m) => { const s = q.tiles.map(text).map(w => STRENGTH[w]), want = m.most === 'weakest' ? Math.min(...s) : Math.max(...s); return STRENGTH[mk(q)] === want && s.filter(x => x === want).length === 1 ? '' : 'expected the ' + m.most + ' word'; };
  V['g6-positive'] = (q, m) => (m.want === 'positive' ? POS : NEG).has(mk(q)) && q.tiles.map(text).filter(w => (m.want === 'positive' ? POS : NEG).has(w)).length === 1 ? '' : 'expected the ' + m.want + ' word';
  V['g6-pick-positive'] = q => H.sameSet(q.options.map((o, i) => (POS.has(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the compliments are not the ones marked';

  V['g6-shade-middle'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const ends = [...d.querySelectorAll('.wt')].map(x => text(x.innerHTML)), w = mk(q);
    return FAMILY[w] === FAMILY[ends[0]] && STRENGTH[w] > STRENGTH[ends[0]] && STRENGTH[w] < STRENGTH[ends[1]] && q.tiles.filter(t => FAMILY[text(t)] === FAMILY[ends[0]]).length === 1 ? '' : 'expected the word between them'; };
  V['g6-shade-tf'] = (q, m) => tf(q, FAMILY[m.x] === FAMILY[m.y] && STRENGTH[m.x] > STRENGTH[m.y]);
  V['g6-connote-tf'] = (q, m) => tf(q, POS.has(m.w));
  V['g6-connote-match'] = q => q.pairs.every(p => PARTNER[text(p[0])] === text(p[1])) ? '' : 'a pair is matched wrong';

  /* subject words: the checker's own glossary */
  const GLOSS = { habitat: ['the natural home of a plant or animal', 'Science'], erosion: ['the wearing away of land by wind or water', 'Science'], adaptation: ['a feature that helps a living thing survive', 'Science'],
    treaty: ['a formal agreement between nations', 'Social Studies'], democracy: ['a government chosen by the people', 'Social Studies'], perimeter: ['the distance around a shape', 'Math'],
    ratio: ['a comparison of two amounts', 'Math'], tempo: ['the speed of a piece of music', 'Arts'], sketch: ['a quick, rough drawing', 'Arts'],
    condensation: ['water vapour turning into liquid', 'Science'], immigrant: ['a person who moves to a new country to live', 'Social Studies'], latitude: ['how far north or south a place is', 'Social Studies'],
    integer: ['a positive or negative whole number', 'Math'], probability: ['how likely something is to happen', 'Math'], choreography: ['the planned steps of a dance', 'Arts'] };
  const FITS = { habitat: 'frogs and herons', erosion: 'along the cliffs', adaptation: 'keeps polar bears warm', treaty: 'sharing the land', democracy: 'citizens vote',
    perimeter: 'enough fencing', ratio: '2 to 3', tempo: 'played the song', sketch: 'started the painting',
    condensation: 'cold glass', immigrant: 'from Jamaica', latitude: 'Iqaluit', integer: 'negative', probability: 'rolling a 6', choreography: 'dancers' };
  V['g6-subj-mean'] = (q, m) => mk(q) === GLOSS[m.word][0] ? '' : 'expected ' + GLOSS[m.word][0];
  V['g6-subj-match'] = q => q.pairs.every(p => (GLOSS[text(p[0])] || [])[0] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  V['g6-subj-which'] = (q, m) => mk(q) === GLOSS[m.word][1] ? '' : 'expected ' + GLOSS[m.word][1];
  V['g6-subj-tf'] = (q, m) => tf(q, GLOSS[m.word][0] === text(m.said));
  V['g6-subj-gap'] = q => { const s = text(q.fig), fit = q.options.map(text).filter(w => FITS[w] && s.includes(FITS[w])); return fit.length === 1 && mk(q) === fit[0] ? '' : 'the word that fits the sentence is not the one marked'; };
})();
