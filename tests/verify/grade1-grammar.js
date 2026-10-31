/* Grade 1 answer checks: grammar (grade1/chapters/grammar.js). The checker keeps its own word lists and works out tense from the verb. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const NOUN = new Set('dog moose teacher kite apple park canoe mitten drum garden cat frog bell baby goose'.split(' '));
  const VERB = new Set('run jump sing swim read paint climb eat swims barks jumped reads clapped'.split(' '));
  const ADJ = new Set('red tall soft happy cold tiny loud shiny blue'.split(' '));
  const ADV = new Set('slowly quickly quietly loudly gently carefully'.split(' '));
  const CONJ = { 'I like apples ___ pears.': 'and', 'I wanted to play outside, ___ it was raining.': 'but', 'Do you want milk ___ juice?': 'or', 'I was hungry, ___ I ate a snack.': 'so',
    'We stayed in ___ it was too cold.': 'because', 'Ava has a sled, ___ she has no boots.': 'but' };
  const one = (q, set) => { const t = (q.tiles || q.options).map(text), ok = t.filter(w => set.has(w)); return ok.length === 1 && H.marked(q) === ok[0]; };
  const tense = s => / will [a-z]+/.test(s) ? 'future' : /\b[a-z]+ed\b/.test(s.replace(/^\w+ /, '')) ? 'past' : 'present';
  const TL = { past: 'in the past', present: 'now', future: 'in the future' };
  V['g1-noun-pick'] = q => one(q, NOUN) ? '' : 'expected the one naming word';
  V['g1-tap-noun'] = q => one(q, NOUN) ? '' : 'expected the one naming word in the sentence';
  V['g1-one-more'] = (q, m) => H.marked(q) === (/s$/.test(m.w) && m.w !== 'bus' ? 'more than one' : 'one') ? '' : 'expected the right count for ' + m.w;
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
