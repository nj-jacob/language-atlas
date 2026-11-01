/* Grade 1 answer checks: reading and spelling words (grade1/chapters/word-reading.js).
   Spelling choices are worked out from the spelling rules themselves; clue and sentence questions use the checker's own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'");
  const CLUE = { 'a green animal that hops': 'frog', 'you bang it to make music': 'drum', "a bird's home": 'nest', 'it walks sideways on the beach': 'crab', 'a white drink': 'milk',
    'you slide down a snowy hill on it': 'sled', 'it gives light': 'lamp', 'it grows in soil': 'plant', 'you stick it on a letter': 'stamp', 'go up in the air': 'jump', 'it has five fingers': 'hand',
    'a present': 'gift', 'what fish do': 'swim', 'it waves on a pole': 'flag', 'a small bite between meals': 'snack', 'it flies on a string': 'kite', 'a baby bear': 'cub', 'a spider makes it': 'web',
    'wet, sticky dirt': 'mud', 'an animal with a bushy tail': 'fox' };
  const FIT = { 'The ___ swims in the lake.': 'fish', 'I hit the ___ with a stick.': 'drum', 'We camp in a ___.': 'tent', 'The bird sits on its ___.': 'nest', 'Mom lit the ___.': 'lamp',
    'Can you ___ over the log?': 'jump', 'A ___ hops in the pond.': 'frog', 'I drink a cup of ___.': 'milk', 'The ___ waves in the wind.': 'flag',
    'I put on my ___ in the cold.': 'hat', 'The ___ ate the cheese.': 'rat', 'Please ___ the door.': 'shut', 'The ___ barks at the cat.': 'dog', 'We ride on the ___ to school.': 'bus' };
  const fill = (q, part) => { const d = document.createElement('div'); d.innerHTML = q.fig; const g = d.querySelector('.wgap'); if (!g) return null; g.textContent = part; return text(d.innerHTML); };
  /* the spelling rules, written out again */
  const RULES = {
    ck: w => /[aeiou]ck$/.test(w), ll: w => /[aeiou](ll|ff|ss|zz)$/.test(w), kc: w => /^(k[eiy]|c[aou])/.test(w), double: w => /[aeiou](ll|ff|ss|zz)$/.test(w),
    ai: w => (/ai/.test(w) && !/ai$/.test(w) && !/ay/.test(w)) || (/ay$/.test(w) && !/ai/.test(w)),
    oi: w => (/oi/.test(w) && !/oi$/.test(w) && !/oy/.test(w)) || (/oy$/.test(w) && !/oi/.test(w)), ve: w => /ve$/.test(w)
  };
  RULES.ff = RULES.ss = RULES.zz = RULES.ll;
  const REAL = new Set(('duck back sock neck truck rock pack lock kick stick black clock bell hill doll puff cliff kiss dress buzz well fill grass miss off fuzz ' +
    'kit kid keg cat cup cot king kept camp cub can cut rain tail day play paint stay coin boil boy toy soil joy have give love live five').split(' '));
  const ok = w => REAL.has(w) && Object.values(RULES).some(r => r(w));

  V['g1-read-meaning'] = (q, m) => { const want = Object.keys(CLUE).find(c => CLUE[c] === m.word); return text(q.fig) === m.word && text(H.marked(q) || '') === want ? '' : 'expected the meaning of ' + m.word; };
  V['g1-spell-clue'] = (q, m) => { const w = CLUE[text(m.clue)], built = q.answer.map(i => text(q.parts[i])).join(''); return w && built === w ? '' : 'built ' + built + ' for "' + m.clue + '"'; };
  V['g1-fit-word'] = (q, m) => { const w = FIT[m.s]; return w && fill(q, H.marked(q)) === m.s.replace('___', w) ? '' : 'expected ' + w; };
  V['g1-blend-read'] = (q, m) => text(q.fig).replace(/\s/g, '') === m.word && H.marked(q) === m.word ? '' : 'the letters spell ' + text(q.fig);
  V['g1-spell-right'] = (q, m) => { const r = RULES[m.rule], good = q.options.map(text).filter(o => r(o) && REAL.has(o)); return good.length === 1 && H.marked(q) === good[0] ? '' : 'by the ' + m.rule + ' rule the right spelling is ' + good.join('/'); };
  V['g1-fill-end'] = (q, m) => { const good = q.tiles.map(text).filter(t => ok(m.stem + t)); return good.length === 1 && H.marked(q) === good[0] ? '' : 'expected the ending that makes a real word with the rule'; };
  V['g1-k-or-c'] = (q, m) => { const good = q.tiles.map(text).filter(t => RULES.kc(t + m.rest) && t.length === 1); return good.length === 1 && H.marked(q) === good[0] ? '' : 'k before e or i, c before a, o or u'; };
  V['g1-ai-ay'] = (q, m) => { const good = q.tiles.map(text).filter(t => fill(q, t) === m.word && (RULES.ai(m.word) || RULES.oi(m.word))); return good.length === 1 && H.marked(q) === good[0] ? '' : 'expected the letters that make ' + m.word; };
  V['g1-pick-right'] = q => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words spelled right are not the ones marked';
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const picName = h => { const d = document.createElement('div'); d.innerHTML = h; const s = d.querySelector('svg.wpic'); return s && s.getAttribute('aria-label'); };
  const built = q => q.answer.map(i => text(q.parts[i])).join('');
  const meaning = w => Object.keys(CLUE).find(c => CLUE[c] === w);
  V['g1-read-pic'] = (q, m) => text(q.fig) === m.w && picName(q.tiles[q.answer]) === m.w && q.tiles.filter(t => picName(t) === m.w).length === 1 ? '' : 'expected the picture of ' + text(q.fig);
  V['g1-read-tf'] = (q, m) => { const right = meaning(text(q.fig)) === text(m.said); return text(q.fig) === m.word && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-spell-pic'] = (q, m) => built(q) === picName(q.fig) && m.w === built(q) ? '' : 'the parts do not spell ' + picName(q.fig);
  V['g1-spell-missing'] = (q, m) => { const w = CLUE[text(m.clue)]; return w && fill(q, H.marked(q)) === w ? '' : 'expected the missing letter of ' + w; };
  V['g1-spell-choose'] = (q, m) => H.marked(q) === CLUE[text(m.clue)] ? '' : 'expected ' + CLUE[text(m.clue)];
  V['g1-fit-tf'] = (q, m) => { const right = text(q.fig) === m.s.replace('___', FIT[m.s]); return FIT[m.s] && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-fit-wrong'] = (q, m) => { const want = m.s.split(' '), got = q.tiles.map(text), diff = got.map((w, i) => w !== want[i] ? i : -1).filter(i => i >= 0);
    return FIT[m.s] && diff.length === 1 && q.answer === diff[0] ? '' : 'expected the word that is not ' + FIT[m.s]; };
  V['g1-fit-sentence'] = (q, m) => H.marked(q) === m.s.replace('___', FIT[m.s]) ? '' : 'expected the sentence with ' + FIT[m.s];
  V['g1-rule-tf'] = (q, m) => { const right = ok(text(q.fig)); return text(q.fig) === m.said && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
