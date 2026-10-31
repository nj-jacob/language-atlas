/* Grade 8 answer checks: words in context (grade8/chapters/vocabulary.js).
   Word meanings are authored, so the checker keeps its own answer key (a second marker). The kind of clue is worked out from the
   signal words in the sentence, and connotation from the checker's own list of positive words. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* word -> [a word its meaning must contain, the clue words] */
  const KEY = { precarious: ['fall', 'so unsafe'], mitigate: ['less', 'or lessen'], saturated: ['soaked', 'it could not hold'], nocturnal: ['night', 'which means'],
    gregarious: ['company', 'Unlike'], verbose: ['more words', 'however'], reluctant: ['not willing', 'but'], accurate: ['correct', 'Although'],
    artifacts: ['made by people', 'such as'], amphibians: ['water and on land', 'including'], nonperishable: ['not spoil', 'for example'],
    impassable: ['not able to be passed'], constructive: ['build up'], disruption: ['a break'], legible: ['read'], interdependent: ['each other'], invisible: ['not able to be seen'] };
  const signal = s => /\b(Unlike|however|but|Although)\b/.test(s) ? 'contrast' : /such as|including|for example/.test(s) ? 'example' : /\b(or|which means)\b|:|,\s*so\b/.test(s) ? 'definition' : '';
  const means = (w, o) => o.includes(KEY[w][0]);
  V['g8-clue-meaning'] = (q, m) => KEY[m.word] && means(m.word, mk(q)) && q.options.map(text).filter(o => means(m.word, o)).length === 1 ? '' : 'expected the meaning of ' + m.word;
  V['g8-clue-kind'] = q => mk(q) === signal(text(q.fig)) ? '' : 'the signal words show a ' + signal(text(q.fig)) + ' clue';
  V['g8-clue-words'] = (q, m) => mk(q).startsWith(KEY[m.word][1]) && text(q.fig).includes(mk(q)) && mk(q) !== m.word ? '' : 'expected the clue "' + KEY[m.word][1] + '"';
  V['g8-parts-meaning'] = (q, m) => KEY[m.word] && means(m.word, mk(q)) && text(q.fig).includes(m.word) ? '' : 'expected the meaning of ' + m.word;

  const THINK = { analyze: 'parts', evaluate: 'judge', infer: 'clues', synthesize: 'combine', justify: 'reasons', summarize: 'main points' };
  /* which thinking word a sentence needs: the task the rest of the sentence describes */
  const TASK = [[/each stanza/, 'analyze'], [/more reliable/, 'evaluate'], [/how the character feels/, 'infer'], [/into one report/, 'synthesize'], [/with two reasons/, 'justify'], [/main points/, 'summarize']];
  V['g8-tier-fit'] = (q, m) => { const t = TASK.find(x => x[0].test(m.frame)); return t && mk(q) === t[1] ? '' : 'expected ' + (t && t[1]); };
  V['g8-tier-match'] = q => q.pairs.every(p => text(p[1]).includes(THINK[text(p[0])])) ? '' : 'a thinking word is matched wrong';
  const SUBJ = { photosynthesis: 'Science', ecosystem: 'Science', denominator: 'Math', hypotenuse: 'Math', treaty: 'History', confederation: 'History', latitude: 'Geography', urbanization: 'Geography', tempo: 'Music', palette: 'Visual Arts' };
  V['g8-subject'] = (q, m) => mk(q) === SUBJ[m.word] ? '' : 'expected ' + SUBJ[m.word];
  const SUBJECT_MEANING = { product: 'multiplication', mean: 'average', volume: 'space', cell: 'unit of life', current: 'flow', revolution: 'government', scale: 'map distance' };
  V['g8-multi'] = (q, m) => mk(q).includes(SUBJECT_MEANING[m.word]) ? '' : 'expected the subject meaning of ' + m.word;

  const TWIN = { thrifty: 'cheap', confident: 'arrogant', curious: 'nosy', determined: 'stubborn', relaxed: 'lazy', slender: 'scrawny', youthful: 'childish', unique: 'weird', assertive: 'pushy', cautious: 'cowardly' };
  const POS = new Set(Object.keys(TWIN)), NEG = new Set(Object.values(TWIN));
  V['g8-tone'] = (q, m) => (m.want === 'pos' ? POS : NEG).has(mk(q)) ? '' : 'expected the ' + m.want + ' word';
  V['g8-tone-fit'] = (q, m) => (m.want === 'pos' ? POS : NEG).has(mk(q)) ? '' : 'expected the ' + m.want + ' word';
  V['g8-tone-match'] = q => q.pairs.every(p => TWIN[text(p[0])] === text(p[1])) ? '' : 'pairs are not positive to negative';
  V['g8-tone-tf'] = (q, m) => ((POS.has(m.word) ? 'a compliment' : 'an insult') === m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong for ' + m.word;
})();
