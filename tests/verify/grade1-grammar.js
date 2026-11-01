/* Grade 1 answer checks: grammar (grade1/chapters/grammar.js). The checker keeps its own word lists and works out tense from the verb. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const NOUN = new Set('dog moose teacher kite apple canoe mitten garden school sister beaver boat tent lake carrot pencil cat frog bell baby goose'.split(' '));
  const VERB = new Set('run jump sing swim read eat throw dig climb laugh sit catch swims barks jumped reads clapped laughed dug sat throws climbs eats'.split(' '));
  const ADJ = new Set('red tall soft happy cold tiny loud shiny big wet sticky fluffy dark bumpy sleepy blue'.split(' '));
  const ADV = new Set('slowly quickly quietly loudly gently carefully softly patiently warmly'.split(' '));
  const CONJ = { 'I like apples ___ pears.': 'and', 'I wanted to play outside, ___ it was raining.': 'but', 'Do you want milk ___ juice?': 'or', 'I was hungry, ___ I ate a snack.': 'so',
    'We stayed in ___ it was too cold.': 'because', 'Ava has a sled, ___ she has no boots.': 'but',
    'We packed a tent ___ two sleeping bags.': 'and', 'Should we walk ___ take the bus?': 'or', 'It was dark, ___ we turned on the light.': 'so', 'Leo wore a hat ___ his ears were cold.': 'because',
    'The lake was cold, ___ we swam anyway.': 'but', 'You can have a pear ___ a plum.': 'or', 'The puppy was tired, ___ it took a nap.': 'so', 'Grandma sang ___ we danced.': 'and' };
  const JOB = { and: 'adds', but: 'a surprise', or: 'a choice', so: 'a reason', because: 'a reason' };
  const PLURAL = { dogs: 'dog', cats: 'cat', trees: 'tree', boxes: 'box', buses: 'bus', hats: 'hat', cups: 'cup', eggs: 'egg', keys: 'key', kites: 'kite', balls: 'ball', bees: 'bee', apples: 'apple',
    dishes: 'dish', birds: 'bird', foxes: 'fox', benches: 'bench' };
  const SINGLE = new Set(Object.values(PLURAL));
  const SETS = { naming: NOUN, doing: VERB, describing: ADJ };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const pics = h => { const d = document.createElement('div'); d.innerHTML = h; return [...d.querySelectorAll('svg.wpic')].map(n => n.getAttribute('aria-label')); };
  const one = (q, set) => { const t = (q.tiles || q.options).map(text), ok = t.filter(w => set.has(w)); return ok.length === 1 && H.marked(q) === ok[0]; };
  const tense = s => / will [a-z]+/.test(s) ? 'future' : /\b[a-z]+ed\b/.test(s.replace(/^\w+ /, '')) ? 'past' : 'present';
  const TL = { past: 'in the past', present: 'now', future: 'in the future' };
  V['g1-noun-pick'] = q => one(q, NOUN) ? '' : 'expected the one naming word';
  V['g1-tap-noun'] = q => one(q, NOUN) ? '' : 'expected the one naming word in the sentence';
  V['g1-one-more'] = (q, m) => H.marked(q) === (PLURAL[m.w] ? 'more than one' : SINGLE.has(m.w) ? 'one' : '?') ? '' : 'expected the right count for ' + m.w;
  V['g1-pic-more'] = (q, m) => { const p = pics(q.tiles[q.answer]), base = PLURAL[m.w] || m.w; return SINGLE.has(base) && p.every(n => n === base) && (PLURAL[m.w] ? p.length > 1 : p.length === 1) ? '' : 'expected the picture of ' + m.w; };
  V['g1-many-fit'] = (q, m) => { const want = m.num === 'one' ? m.w : Object.keys(PLURAL).find(k => PLURAL[k] === m.w); return text(q.fig).includes(m.num) && H.marked(q) === want ? '' : 'expected ' + want; };
  V['g1-pick-many'] = q => H.sameSet(q.options.map((o, i) => PLURAL[text(o)] ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words for more than one are not the ones marked';
  V['g1-word-kind-tf'] = (q, m) => { const right = SETS[m.kind].has(m.w); return text(q.q).includes(m.w) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right + ' for ' + m.w; };
  V['g1-pick-word-kind'] = (q, m) => H.sameSet(q.options.map((o, i) => SETS[m.kind].has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.kind + ' words are not the ones marked';
  V['g1-i-tf'] = (q, m) => { const right = /\bI\b/.test(m.shown) && !/\bi\b/.test(m.shown); return text(q.fig) === m.shown && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-i-fill'] = (q, m) => text(q.tiles[q.answer]) === 'I' && /\bI\b/.test(m.s) ? '' : 'expected I';
  V['g1-i-tap'] = (q, m) => text(q.tiles[q.answer]) === 'i' && q.tiles.map(text).join(' ') === m.s.replace(/[.?!]/g, '') ? '' : 'expected the small i';
  V['g1-tense-tf'] = (q, m) => { const t = /Yesterday|Last/.test(m.when) ? 'past' : /Tomorrow|Next/.test(m.when) ? 'future' : 'present', right = tense(m.s.slice(m.when.length + 2)) === t;
    return text(q.fig) === m.s && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-match-tense'] = q => q.pairs.every(p => TL[tense(text(p[0]))] === text(p[1])) ? '' : 'a sentence is matched to the wrong time';
  V['g1-adj-fit'] = q => one(q, ADJ) ? '' : 'expected the one describing word';
  V['g1-adv-fit'] = q => one(q, ADV) ? '' : 'expected the one word that tells how';
  V['g1-adv-tf'] = (q, m) => { const right = ADV.has(m.w); return text(q.fig) === m.s && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-pick-adv'] = q => H.sameSet(q.options.map((o, i) => ADV.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words that tell how are not the ones marked';
  V['g1-conj-why'] = (q, m) => H.marked(q) === JOB[CONJ[m.s]] ? '' : 'expected ' + JOB[CONJ[m.s]];
  V['g1-conj-tf'] = (q, m) => { const right = CONJ[m.s] === m.w; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-match-conj'] = q => q.pairs.every(p => JOB[text(p[0])] === text(p[1])) ? '' : 'a joining word is matched to the wrong job';
  V['g1-capital-i'] = q => { const ok = q.options.map(text).filter(o => !/\bi\b/.test(o) && /\bI\b/.test(o) && H.sentenceOk(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the sentence with a capital I'; };
  V['g1-tap-verb'] = q => one(q, VERB) ? '' : 'expected the one doing word';
  V['g1-verb-pick'] = q => one(q, VERB) ? '' : 'expected the one doing word';
  V['g1-tense-fit'] = (q, m) => { const t = /Yesterday|Last/.test(m.when) ? 'past' : /Tomorrow|Next/.test(m.when) ? 'future' : 'present', want = t === 'past' ? m.v + 'ed' : t === 'future' ? 'will ' + m.v : m.v + 's';
    return text(q.fig).startsWith(m.when) && H.marked(q) === want ? '' : 'expected ' + want; };
  V['g1-when-tap'] = (q, m) => H.marked(q) === TL[tense(m.s)] && text(q.fig) === m.s ? '' : 'expected ' + TL[tense(m.s)] + ' for "' + m.s + '"';
  V['g1-tap-adj'] = q => one(q, ADJ) ? '' : 'expected the one describing word';
  V['g1-tap-adv'] = q => one(q, ADV) ? '' : 'expected the one word that tells how';
  V['g1-conj-fit'] = (q, m) => CONJ[m.s] && H.marked(q) === CONJ[m.s] ? '' : 'expected ' + CONJ[m.s];
  V['g1-match-word-kind'] = q => q.pairs.every(p => { const w = text(p[0]), k = text(p[1]); return (k === 'naming word' && NOUN.has(w)) || (k === 'doing word' && VERB.has(w)) || (k === 'describing word' && ADJ.has(w)); }) ? '' : 'a word is matched to the wrong kind';
})();
