/* Grade 1 answer checks: word parts and meanings (grade1/chapters/word-parts.js).
   Endings are worked out from the spelling rules; meanings come from the checker's own word lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const es = w => /(s|x|z|sh|ch)$/.test(w);
  const SAME = ['big large', 'small little', 'happy glad', 'fast quick', 'start begin', 'shout yell', 'shut close', 'sick ill', 'jump leap', 'look see', 'sleepy tired', 'speak talk', 'stone rock', 'gift present'].map(p => p.split(' '));
  const OPP = ['hot cold', 'up down', 'wet dry', 'full empty', 'day night', 'fast slow', 'happy sad', 'in out', 'loud quiet', 'open shut', 'early late', 'push pull', 'top bottom', 'old new', 'win lose', 'light dark'].map(p => p.split(' '));
  const partner = (list, w) => list.filter(p => p.includes(w)).map(p => p[0] === w ? p[1] : p[0]);
  const COMPOUND = new Set('sunset rainbow snowman popcorn cupcake backpack football bedroom starfish toothbrush playground pancake firefly bathtub doorbell seashell moonlight birdhouse'.split(' '));
  const GROUP = {}; [['colours', 'red blue green yellow purple pink'], ['animals', 'moose beaver goose otter bear fox'], ['fruits', 'apple pear plum grape peach cherry'],
    ['weather', 'rain snow wind sleet fog hail'], ['shapes', 'circle square triangle oval rectangle star']].forEach(([g, ws]) => ws.split(' ').forEach(w => { GROUP[w] = g; }));
  const MEANS = { steaming: 'very hot', soaked: 'very wet', enormous: 'very big', tiny: 'very small', exhausted: 'very tired', delighted: 'very happy', chilly: 'cold', whisper: 'talk very quietly',
    add: 'put numbers together', equal: 'the same amount', more: 'a bigger amount', seed: 'a plant grows from it', root: 'the part of a plant under the soil',
    melt: 'turn from solid to liquid, like ice in the sun', map: 'a drawing of a place from above', community: 'people who live, work and play in one place',
    subtract: 'take some away', graph: 'a picture that shows numbers', season: 'a part of the year, like winter', neighbour: 'someone who lives near you',
    soggy: 'wet and soft', gigantic: 'very big', furious: 'very angry', swift: 'fast' };
  const CLUE = { steaming: 'waited for it to cool', soaked: 'fell in the puddle', enormous: 'as long as a bus', tiny: 'could hardly see it', exhausted: 'fell asleep', delighted: 'smiled all day',
    chilly: 'coats and mittens', whisper: 'do not bother anyone', soggy: 'in the milk too long', gigantic: 'taller than our house', furious: 'stomped away', swift: 'ran so fast' };

  V['g1-plural'] = (q, m) => H.marked(q) === m.w + (es(m.w) ? 'es' : 's') ? '' : 'expected the plural of ' + m.w;
  V['g1-ing-ed'] = (q, m) => {
    const when = m.when, suf = /now|are/.test(when) ? 'ing' : /Yesterday|Last/.test(when) ? 'ed' : (es(m.v) ? 'es' : 's');
    return text(q.fig).startsWith(when) && H.marked(q) === m.v + suf ? '' : 'expected ' + m.v + suf + ' after "' + when + '"';
  };
  V['g1-build-word'] = (q, m) => q.answer.map(i => text(q.parts[i])).join('') === m.word && text(q.q).includes(m.word) ? '' : 'the parts do not build ' + m.word;
  V['g1-compound'] = (q, m) => H.marked(q) === m.a + m.b && COMPOUND.has(m.a + m.b) && q.options.map(text).filter(o => COMPOUND.has(o)).length === 1 ? '' : 'expected ' + m.a + m.b;
  const SMALL = new Set('sun set rain bow snow man pop corn cup cake back pack foot ball bed room star fish tooth brush play ground pan fire fly bath tub door bell sea shell moon light bird house'.split(' '));
  V['g1-split-compound'] = (q, m) => { const ok = q.tiles.map(text).filter(t => { const [a, b] = t.split(' + '); return a + b === m.w && SMALL.has(a) && SMALL.has(b); }); return COMPOUND.has(m.w) && ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the split into two whole words'; };
  V['g1-pick-compound'] = q => H.sameSet(q.options.map((o, i) => COMPOUND.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the compound words are not the ones marked';
  V['g1-same'] = (q, m) => { const ok = q.options.map(text).filter(o => partner(SAME, m.w).includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the word that means the same as ' + m.w; };
  V['g1-opposite'] = (q, m) => { const ok = q.options.map(text).filter(o => partner(OPP, m.w).includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the opposite of ' + m.w; };
  V['g1-match-opp'] = q => q.pairs.every(p => partner(OPP, text(p[0])).includes(text(p[1]))) ? '' : 'a word is matched to something that is not its opposite';
  V['g1-odd-one'] = (q, m) => { const gs = q.options.map(text).map(o => GROUP[o]); const odd = q.options.map(text).filter((o, i) => gs.filter(g => g === gs[i]).length === 1); return odd.length === 1 && H.marked(q) === odd[0] && odd[0] === m.odd ? '' : 'expected the one word from a different group'; };
  V['g1-group-name'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const gs = new Set([...d.querySelectorAll('.wt')].map(t => GROUP[text(t.innerHTML)])); return gs.size === 1 && H.marked(q) === [...gs][0] ? '' : 'expected ' + [...gs].join('/'); };
  V['g1-context'] = (q, m) => text(q.fig).includes(m.w) && text(H.marked(q) || '') === MEANS[m.w] ? '' : 'expected ' + MEANS[m.w];
  V['g1-subject-word'] = (q, m) => text(H.marked(q) || '') === MEANS[m.w] ? '' : 'expected ' + MEANS[m.w];
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const built = q => q.answer.map(i => text(q.parts[i])).join('');
  const sufFor = when => /now|are/.test(when) ? 'ing' : /Yesterday|Last/.test(when) ? 'ed' : 's';
  V['g1-plural-build'] = (q, m) => built(q) === m.w + (es(m.w) ? 'es' : 's') ? '' : 'expected the plural of ' + m.w;
  V['g1-plural-tf'] = (q, m) => { const right = m.said === m.w + (es(m.w) ? 'es' : 's'); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-pick-es'] = q => H.sameSet(q.options.map((o, i) => es(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words that take -es are not the ones marked';
  V['g1-build-verb'] = (q, m) => built(q) === m.v + sufFor(m.when) && text(q.fig).startsWith(m.when) ? '' : 'expected ' + m.v + sufFor(m.when);
  V['g1-ing-tf'] = (q, m) => { const right = m.said === m.v + sufFor(m.when); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-when-is'] = (q, m) => H.marked(q) === (m.suf === 'ing' ? 'right now' : 'before now') && text(q.q).includes(m.suf + ':') ? '' : 'expected the time for -' + m.suf;
  V['g1-compound-tf'] = (q, m) => { const right = COMPOUND.has(m.w); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-same-mean-tf'] = (q, m) => { const right = partner(SAME, m.a).includes(m.b); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-match-same'] = q => q.pairs.every(p => partner(SAME, text(p[0])).includes(text(p[1]))) ? '' : 'a word is matched to one that does not mean the same';
  V['g1-same-pick'] = (q, m) => { const ok = q.tiles.map(text).filter(t => partner(SAME, m.w).includes(t)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the word that means the same as ' + m.w; };
  V['g1-opp-tf'] = (q, m) => { const right = partner(OPP, m.a).includes(m.b); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-opp-pair'] = q => { const ok = q.options.map(text).filter(o => { const [a, b] = o.split(' / '); return partner(OPP, a).includes(b); }); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the pair of opposites'; };
  V['g1-group-tf'] = (q, m) => { const right = GROUP[m.w] === m.g; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-group-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => GROUP[text(o)] === m.g ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ' + m.g + ' are not the ones marked';
  V['g1-context-tf'] = (q, m) => { const right = MEANS[m.w] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-context-clue'] = (q, m) => { const ok = q.options.map(text).filter(o => text(q.fig).includes(o)); return ok.length === 1 && H.marked(q) === ok[0] && ok[0] === CLUE[m.w] ? '' : 'expected ' + CLUE[m.w]; };
})();
