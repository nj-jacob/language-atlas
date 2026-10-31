/* Grade 1 answer checks: word parts and meanings (grade1/chapters/word-parts.js).
   Endings are worked out from the spelling rules; meanings come from the checker's own word lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const es = w => /(s|x|z|sh|ch)$/.test(w);
  const SAME = ['big large', 'small little', 'happy glad', 'fast quick', 'start begin', 'shout yell', 'shut close', 'sick ill', 'jump leap', 'look see'].map(p => p.split(' '));
  const OPP = ['hot cold', 'up down', 'wet dry', 'full empty', 'day night', 'fast slow', 'happy sad', 'in out', 'loud quiet', 'open shut'].map(p => p.split(' '));
  const partner = (list, w) => list.filter(p => p.includes(w)).map(p => p[0] === w ? p[1] : p[0]);
  const COMPOUND = new Set('sunset rainbow snowman popcorn cupcake backpack football bedroom starfish toothbrush playground pancake'.split(' '));
  const GROUP = {}; [['colours', 'red blue green yellow purple pink'], ['animals', 'moose beaver goose otter bear fox'], ['fruits', 'apple pear plum grape peach cherry'],
    ['weather', 'rain snow wind sleet fog hail'], ['shapes', 'circle square triangle oval rectangle star']].forEach(([g, ws]) => ws.split(' ').forEach(w => { GROUP[w] = g; }));
  const MEANS = { steaming: 'very hot', soaked: 'very wet', enormous: 'very big', tiny: 'very small', exhausted: 'very tired', delighted: 'very happy', chilly: 'cold', whisper: 'talk very quietly',
    add: 'put numbers together', equal: 'the same amount', more: 'a bigger amount', seed: 'a plant grows from it', root: 'the part of a plant under the soil',
    melt: 'turn from solid to liquid, like ice in the sun', map: 'a drawing of a place from above', community: 'people who live, work and play in one place' };

  V['g1-plural'] = (q, m) => H.marked(q) === m.w + (es(m.w) ? 'es' : 's') ? '' : 'expected the plural of ' + m.w;
  V['g1-ing-ed'] = (q, m) => {
    const when = m.when, suf = /now|are/.test(when) ? 'ing' : /Yesterday|Last/.test(when) ? 'ed' : (es(m.v) ? 'es' : 's');
    return text(q.fig).startsWith(when) && H.marked(q) === m.v + suf ? '' : 'expected ' + m.v + suf + ' after "' + when + '"';
  };
  V['g1-build-word'] = (q, m) => q.answer.map(i => text(q.parts[i])).join('') === m.word && text(q.q).includes(m.word) ? '' : 'the parts do not build ' + m.word;
  V['g1-compound'] = (q, m) => H.marked(q) === m.a + m.b && COMPOUND.has(m.a + m.b) && q.options.map(text).filter(o => COMPOUND.has(o)).length === 1 ? '' : 'expected ' + m.a + m.b;
  V['g1-split-compound'] = (q, m) => { const t = H.marked(q) || ''; const [a, b] = t.split(' + '); return COMPOUND.has(m.w) && a + b === m.w && !/^(s|n)$/.test(b[0] + '') && [a, b].every(x => x.length >= 2) && q.tiles.map(text).filter(x => x.replace(' + ', '') === m.w).length === q.tiles.length ? '' : 'expected the split into two whole words'; };
  V['g1-pick-compound'] = q => H.sameSet(q.options.map((o, i) => COMPOUND.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the compound words are not the ones marked';
  V['g1-same'] = (q, m) => { const ok = q.options.map(text).filter(o => partner(SAME, m.w).includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the word that means the same as ' + m.w; };
  V['g1-opposite'] = (q, m) => { const ok = q.options.map(text).filter(o => partner(OPP, m.w).includes(o)); return ok.length === 1 && H.marked(q) === ok[0] ? '' : 'expected the opposite of ' + m.w; };
  V['g1-match-opp'] = q => q.pairs.every(p => partner(OPP, text(p[0])).includes(text(p[1]))) ? '' : 'a word is matched to something that is not its opposite';
  V['g1-odd-one'] = (q, m) => { const gs = q.options.map(text).map(o => GROUP[o]); const odd = q.options.map(text).filter((o, i) => gs.filter(g => g === gs[i]).length === 1); return odd.length === 1 && H.marked(q) === odd[0] && odd[0] === m.odd ? '' : 'expected the one word from a different group'; };
  V['g1-group-name'] = q => { const d = document.createElement('div'); d.innerHTML = q.fig; const gs = new Set([...d.querySelectorAll('.wt')].map(t => GROUP[text(t.innerHTML)])); return gs.size === 1 && H.marked(q) === [...gs][0] ? '' : 'expected ' + [...gs].join('/'); };
  V['g1-context'] = (q, m) => text(q.fig).includes(m.w) && text(H.marked(q) || '') === MEANS[m.w] ? '' : 'expected ' + MEANS[m.w];
  V['g1-subject-word'] = (q, m) => text(H.marked(q) || '') === MEANS[m.w] ? '' : 'expected ' + MEANS[m.w];
})();
