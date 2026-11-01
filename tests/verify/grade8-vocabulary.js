/* Grade 8 answer checks: words in context (grade8/chapters/vocabulary.js).
   Word meanings are authored, so the checker keeps its own answer key (a second marker). The kind of clue is worked out from the
   signal words in the sentence, and connotation from the checker's own list of positive words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const why = (q, good) => q.why && q.why.answer === (good ? 0 : 1);
  const onlyOne = (list, ok) => list.filter(ok).length === 1;
  /* word -> [a word its meaning must contain, the start of the clue, words from its sentence that no other sentence has] */
  const KEY = { precarious: ['fall', 'so unsafe', 'old bridge'], mitigate: ['less', 'or lessen', 'damage from the flood'], saturated: ['soaked', 'it could not hold', 'another drop'],
    nocturnal: ['night', 'which means', 'Owls'], famished: ['hungry', 'in other words', 'long climb'], levee: ['wall of earth', 'that is', 'river back'],
    viscous: ['thick', 'which means', 'Maple syrup'], lethargic: ['without energy', 'it lay on the porch', 'porch'], concise: ['short', 'or brief', 'your report'],
    compromise: ['each side', 'that is', 'two teams'], remote: ['far away', 'so far from town', 'cabin'], inconclusive: ['firm answer', 'which means', 'test results'],
    gregarious: ['company', 'Unlike', 'Hana'], verbose: ['more words', 'however', 'first speech'], reluctant: ['not willing', 'but', 'cold lake'], accurate: ['correct', 'Although', 'map looked'],
    bland: ['without much', 'Although', 'soup'], frugal: ['waste money', 'but', 'allowance'], turbulent: ['rough', 'Unlike', 'pond'], obsolete: ['out of date', 'however', 'old phone'],
    apprehensive: ['worried', 'but', 'race'], meticulous: ['careful and thorough', 'Unlike', 'notes'], treacherous: ['danger', 'Although', 'path looked'], dense: ['tightly packed', 'however', 'bread'],
    artifacts: ['made by people', 'such as', 'museum'], amphibians: ['water and on land', 'including', 'salamanders'], nonperishable: ['not spoil', 'for example', 'canned beans'],
    perennials: ['grow back', 'such as', 'tulips'], precipitation: ['falls from the sky', 'such as', 'sleet'], rodents: ['gnawing', 'including', 'beavers'],
    toiletries: ['washing', 'for example', 'toothbrush'], percussion: ['strike', 'such as', 'cymbals'], condiments: ['sauces', 'including', 'mustard'],
    crustaceans: ['hard shells', 'such as', 'lobsters'], deciduous: ['losing leaves', 'for example', 'birches'], utensils: ['cooking or eating', 'including', 'ladle'],
    impassable: ['not able to be passed'], constructive: ['build up'], disruption: ['a break'], legible: ['read'], interdependent: ['each other'], invisible: ['not able to be seen'],
    inaudible: ['not able to be heard'], transportation: ['carrying'], unpredictable: ['ahead of time'], irreplaceable: ['replaced'], misinterpret: ['wrongly'],
    retractable: ['pulled back'], nonrenewable: ['made new again'], malfunction: ['failure to work'], biodegradable: ['broken down'] };
  const signal = s => /\b(Unlike|however|but|Although)\b/.test(s) ? 'contrast' : /such as|including|for example/.test(s) ? 'example'
    : /\b(or|which means|that is|in other words)\b|:|,\s*so\b/.test(s) ? 'definition' : '';
  const means = (w, o) => !!KEY[w] && o.includes(KEY[w][0]);
  V['g8-clue-meaning'] = (q, m) => means(m.word, mk(q)) && onlyOne(q.options.map(text), o => means(m.word, o)) ? '' : 'expected the meaning of ' + m.word;
  /* the gap: each option is "word: meaning"; the right word is the one whose sentence this is */
  const wordOf = o => o.split(':')[0];
  V['g8-clue-gap'] = q => { const f = text(q.fig), mine = o => KEY[wordOf(o)] && f.includes(KEY[wordOf(o)][2]) && means(wordOf(o), o.slice(wordOf(o).length));
    return mine(mk(q)) && onlyOne(q.options.map(text), mine) ? '' : 'the word marked does not belong in this sentence'; };
  V['g8-clue-kind'] = q => mk(q) === signal(text(q.fig)) ? '' : 'the signal words show a ' + signal(text(q.fig)) + ' clue';
  V['g8-clue-words'] = (q, m) => mk(q).startsWith(KEY[m.word][1]) && text(q.fig).includes(mk(q)) && mk(q) !== m.word ? '' : 'expected the clue "' + KEY[m.word][1] + '"';
  V['g8-clue-tf'] = (q, m) => { const right = means(m.word, text(m.said)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-clue-match'] = q => q.pairs.every(p => means(text(p[0]), text(p[1]))) ? '' : 'a word is matched to the wrong meaning';

  /* word parts */
  const PART = { not: ['im', 'in', 'un', 'ir', 'non'], together: ['con'], apart: ['dis'], between: ['inter'], across: ['trans'], before: ['pre'], 'back or again': ['re'], wrongly: ['mis'],
    badly: ['mal'], build: ['struct'], break: ['rupt'], see: ['vis'], hear: ['aud'], carry: ['port'], say: ['dict'], 'put in position': ['place'], pull: ['tract'], life: ['bio'], 'break down': ['degrade'],
    new: ['new'], work: ['function'], explain: ['interpret'], pass: ['pass'], read: ['leg'], depend: ['depend'] };
  V['g8-parts-meaning'] = (q, m) => means(m.word, mk(q)) && text(q.fig).includes(m.word) ? '' : 'expected the meaning of ' + m.word;
  V['g8-parts-part'] = (q, m) => (PART[m.mean] || []).includes(mk(q)) && onlyOne(q.tiles.map(text), t => (PART[m.mean] || []).includes(t)) ? '' : 'the part marked does not mean ' + m.mean;
  V['g8-parts-tf'] = (q, m) => { const right = means(m.word, text(m.said)); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  V['g8-parts-match'] = q => q.pairs.every(p => means(text(p[0]), text(p[1]))) ? '' : 'a word is matched to the wrong meaning';

  /* thinking words */
  const THINK = { analyze: 'parts', evaluate: 'judge', infer: 'clues', synthesize: 'combine', justify: 'reasons', summarize: 'main points', compare: 'alike', classify: 'groups',
    predict: 'will happen', explain: 'how or why' };
  /* which thinking word a sentence needs: the task the rest of the sentence describes */
  const TASK = [[/each stanza|each bar|one by one/, 'analyze'], [/more reliable|meets each goal|worth seeing/, 'evaluate'], [/how the character feels|the reason|muddy boots/, 'infer'],
    [/into one report|one new answer|single plan/, 'synthesize'], [/two reasons|with evidence|with facts/, 'justify'], [/main points|short paragraph|five lines/, 'summarize'],
    [/alike and different|what is the same|side by side/, 'compare'], [/mammal|igneous|noun, verb/, 'classify'], [/happen next|weather|will be about/, 'predict'],
    [/becomes a law|water cycle|you solved/, 'explain']];
  V['g8-tier-fit'] = (q, m) => { const t = TASK.find(x => x[0].test(text(m.frame))); return t && mk(q) === t[1] ? '' : 'expected ' + (t && t[1]); };
  V['g8-tier-match'] = q => q.pairs.every(p => text(p[1]).includes(THINK[text(p[0])])) ? '' : 'a thinking word is matched wrong';
  V['g8-tier-meaning'] = (q, m) => mk(q).includes(THINK[m.word]) && onlyOne(q.options.map(text), o => o.includes(THINK[m.word])) ? '' : 'expected what ' + m.word + ' asks';
  V['g8-tier-tf'] = (q, m) => q.answer === text(m.mean).includes(THINK[m.said]) && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.said;

  /* subject words */
  const SUBJ = { photosynthesis: 'Science', ecosystem: 'Science', molecule: 'Science', condensation: 'Science', chlorophyll: 'Science', friction: 'Science',
    denominator: 'Math', hypotenuse: 'Math', perimeter: 'Math', integer: 'Math', quadrilateral: 'Math', exponent: 'Math',
    treaty: 'History', confederation: 'History', 'fur trade': 'History', voyageur: 'History', monarchy: 'History',
    latitude: 'Geography', longitude: 'Geography', urbanization: 'Geography', tundra: 'Geography', archipelago: 'Geography',
    tempo: 'Music', crescendo: 'Music', staccato: 'Music', melody: 'Music', palette: 'Visual Arts', sculpture: 'Visual Arts', collage: 'Visual Arts', brushstroke: 'Visual Arts' };
  V['g8-subject'] = (q, m) => mk(q) === SUBJ[m.word] ? '' : 'expected ' + SUBJ[m.word];
  V['g8-subject-odd'] = q => { const o = q.options.map(text), count = s => o.filter(x => SUBJ[x] === s).length; return count(SUBJ[mk(q)]) === 1 && o.filter(x => x !== mk(q)).every(x => count(SUBJ[x]) === 3) ? '' : 'the odd one out is not the one marked'; };
  V['g8-subject-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => SUBJ[text(o)] === m.subj ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.subj + ' words are not the ones marked';
  V['g8-subject-match'] = q => q.pairs.every(p => SUBJ[text(p[0])] === text(p[1])) ? '' : 'a word is matched to the wrong subject';

  /* two meanings: word -> [a word in the school meaning, a word in the everyday meaning, words only the everyday sentence has] */
  const TWO = { product: ['multiplication', 'sold', 'Quebec'], mean: ['average', 'unkind', 'laugh'], volume: ['space', 'loud', 'radio'], cell: ['unit of life', 'phone', 'rang'],
    current: ['flow', 'now', 'news'], revolution: ['government', 'turn', 'wheel'], scale: ['map distance', 'fish', 'trout'], matter: ['mass', 'trouble', 'upset'],
    degree: ['angles', 'award', 'nursing'], solution: ['dissolves', 'answer', 'parking'], bill: ['law', 'owe', 'dinner'], cabinet: ['ministers', 'cupboard', 'plates'],
    ruler: ['governs', 'measuring', 'straight line'], key: ['symbols', 'lock', 'front door'], medium: ['material', 'middle', 'hot chocolate'] };
  const meaningIn = (w, s) => TWO[w][s.includes(TWO[w][2]) ? 1 : 0];
  V['g8-multi'] = (q, m) => { const want = meaningIn(m.word, text(q.fig)); return mk(q).includes(want) && onlyOne(q.options.map(text), o => o.includes(want)) ? '' : 'expected the meaning with "' + want + '"'; };
  V['g8-multi-which'] = (q, m) => text(m.mean).includes(meaningIn(m.word, mk(q))) && onlyOne(q.options.map(text), o => text(m.mean).includes(meaningIn(m.word, o))) ? '' : 'the sentence marked uses the other meaning';
  V['g8-multi-tf'] = (q, m) => { const right = text(m.said).includes(meaningIn(m.word, text(q.fig))); return q.answer === right && why(q, right) ? '' : 'expected ' + right; };
  /* the bold word in each sentence, singular */
  const boldWord = h => { const b = (h.match(/<b>(\w+)<\/b>/) || [])[1] || ''; return TWO[b] ? b : b.replace(/s$/, ''); };
  V['g8-multi-match'] = q => q.pairs.every(p => { const w = boldWord(p[0]); return TWO[w] && text(p[1]).includes(meaningIn(w, text(p[0]))); }) ? '' : 'a sentence is matched to the wrong meaning';

  /* connotation */
  const TWIN = { thrifty: 'cheap', confident: 'arrogant', curious: 'nosy', determined: 'stubborn', relaxed: 'lazy', slender: 'scrawny', youthful: 'childish', unique: 'weird', assertive: 'pushy',
    cautious: 'cowardly', proud: 'conceited', bold: 'reckless', firm: 'harsh', casual: 'sloppy', generous: 'wasteful' };
  const POS = new Set(Object.keys(TWIN)), NEG = new Set(Object.values(TWIN));
  V['g8-tone'] = (q, m) => (m.want === 'pos' ? POS : NEG).has(mk(q)) ? '' : 'expected the ' + m.want + ' word';
  V['g8-tone-fit'] = (q, m) => (m.want === 'pos' ? POS : NEG).has(mk(q)) ? '' : 'expected the ' + m.want + ' word';
  V['g8-tone-match'] = q => q.pairs.every(p => TWIN[text(p[0])] === text(p[1])) ? '' : 'pairs are not positive to negative';
  V['g8-tone-tf'] = (q, m) => ((POS.has(m.word) ? 'a compliment' : 'an insult') === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.word;
})();
