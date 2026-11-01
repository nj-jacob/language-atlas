/* Grade 4 answer checks: word meanings (grade4/chapters/meanings.js). The checker keeps its own answer key, like a second marker,
   and checks what it can from the sentence the child sees (the clue words must be in it). */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'");
  const CLUE = { narrow: ['not wide', 'single file'], famished: ['very hungry', 'three sandwiches'], timid: ['shy and easily scared', 'smallest sound'], remote: ['far from other places', '80 km away'],
    murky: ['cloudy and hard to see through', 'not clear'], frugal: ['careful with money', 'saves money'], drowsy: ['sleepy', 'closing its eyes'], sturdy: ['strong and steady', 'not a wobbly'],
    enormous: ['very big', 'taller than our car'], exhausted: ['very tired', 'bed early'], fragile: ['easy to break', 'cracked'], anxious: ['worried', 'hands shook'],
    scalding: ['very hot', 'Steam rose'], brief: ['short', 'one minute'] };
  V['g4-clue'] = (q, m) => { const k = CLUE[m.word]; return k && H.marked(q) === k[0] && H.has(q.fig, k[1]) ? '' : 'expected ' + (k && k[0]); };
  V['g4-clue-words'] = (q, m) => { const k = CLUE[m.word], mk = H.marked(q) || ''; return k && mk.includes(k[1]) && H.has(q.fig, mk) ? '' : 'expected the clue with "' + (k && k[1]) + '"'; };
  V['g4-clue-tf'] = (q, m) => (CLUE[m.word][0] === m.said) === q.answer ? '' : 'true/false is wrong for ' + m.word;
  V['g4-clue-fit'] = (q, m) => { const k = CLUE[m.word], tiles = q.tiles.map(text); return k && H.marked(q) === m.word && H.has(q.fig, k[1]) && !H.has(q.fig, m.word) && tiles.filter(t => CLUE[t]).length === tiles.length ? '' : 'expected ' + m.word; };
  V['g4-clue-match'] = q => q.pairs.every(p => (CLUE[text(p[0])] || [])[0] === text(p[1])) ? '' : 'a word is matched to the wrong meaning';
  /* weakest to strongest, the checker's own lists */
  const SCALES = ['cool cold freezing', 'warm hot scorching', 'glad happy overjoyed', 'annoyed angry furious', 'damp wet soaked', 'whisper talk shout', 'walk jog sprint', 'like love adore', 'nibble eat gobble', 'sip drink gulp', 'nervous scared terrified', 'good great amazing'].map(s => s.split(' '));
  const EXACT = { 'towel was': 'soaked', 'baby is asleep': 'whisper', 'minus 30': 'freezing', 'burned our feet': 'scorching', 'lost cat': 'overjoyed', 'catch the bus': 'sprint', 'morning dew': 'damp', 'hid his shoe': 'annoyed',
    'tea is very hot': 'sip', 'one tiny bite': 'nibble', 'first swim lesson': 'nervous', 'whole bottle': 'gulp', 'best I have ever': 'amazing', 'could not move': 'terrified' };
  const exactOf = s => EXACT[Object.keys(EXACT).find(c => s.includes(c))];
  V['g4-exact'] = (q, m) => { const k = Object.keys(EXACT).find(c => m.s.includes(c)); return k && H.marked(q) === EXACT[k] && H.has(q.fig, k) ? '' : 'expected ' + (k && EXACT[k]); };
  V['g4-exact-tf'] = (q, m) => H.has(q.fig, m.w) && (exactOf(m.s) === m.w) === q.answer ? '' : 'true/false is wrong for ' + m.w;
  V['g4-shade-order'] = q => { const items = q.items.map(text); return SCALES.some(s => s.join() === items.join()) ? '' : 'not in order from weakest to strongest'; };
  V['g4-strongest'] = q => { const s = SCALES.find(x => q.tiles.every(t => x.includes(text(t)))); return s && H.marked(q) === s[2] ? '' : 'expected the strongest word'; };
  V['g4-weakest'] = q => { const s = SCALES.find(x => q.tiles.every(t => x.includes(text(t)))); return s && H.marked(q) === s[0] ? '' : 'expected the weakest word'; };
  const MULTI = { "dog's bark": 'the sound a dog makes', 'birch bark': 'the outside of a tree', 'bat flew': 'a flying animal', 'swung the bat': 'a stick for hitting a ball', 'current in the river': 'moving water',
    'current score': 'happening now', 'fall fair': 'a show with rides and games', 'fair to give': 'treating everyone the same', 'light enough': 'not heavy', 'on the light': 'something that lets you see',
    'silver ring': 'a circle you wear', 'bell ring': 'the sound a bell makes', 'at the park': 'a place with grass to play', 'park the van': 'to stop a car and leave it',
    'wave splashed': 'water that rises and moves', 'wave to her friends': 'to move your hand to say hello' };
  const multiOf = s => MULTI[Object.keys(MULTI).find(k => text(s).includes(k))];
  V['g4-multi'] = q => H.marked(q) === multiOf(q.fig) ? '' : 'expected ' + multiOf(q.fig);
  V['g4-multi-tf'] = (q, m) => (multiOf(m.s) === m.said) === q.answer && H.has(q.fig, H.strip(m.s).slice(0, 12)) ? '' : 'true/false is wrong';
  V['g4-multi-which'] = (q, m) => multiOf(H.marked(q)) === m.mean && q.options.filter(o => multiOf(o) === m.mean).length === 1 ? '' : 'expected the sentence where it means ' + m.mean;
  V['g4-multi-match'] = q => q.pairs.every(p => multiOf(p[0]) === text(p[1])) ? '' : 'a sentence is matched to the wrong meaning';
  const SUBJ = { habitat: ['natural home', 'science', 'pond is a habitat'], adaptation: ['helps a living thing survive', 'science', 'Thick fur'], predator: ['hunts other animals', 'science', 'owl is a predator'],
    erosion: ['wearing away', 'science', 'Waves cause erosion'], community: ['people who live or work together', 'social studies', 'built a new park'], 'natural resource': ['from nature that people use', 'social studies', 'Water is a natural'],
    region: ['things in common', 'social studies', 'Canadian Shield'], province: ['ten main parts of Canada', 'social studies', 'Ontario is a province'],
    force: ['push or a pull', 'science', 'magnet uses a force'], mineral: ['forms in nature', 'science', 'Quartz is a mineral'], pulley: ['rope that helps lift', 'science', 'lift the bucket'],
    capital: ['government meets', 'social studies', 'capital of Ontario'], landform: ['shape of the land', 'social studies', 'mountain is a landform'], trade: ['one thing to get another', 'social studies', 'furs for metal pots'] };
  V['g4-subj'] = (q, m) => { const mk = H.marked(q) || ''; return mk.includes(SUBJ[m.word][0]) && q.options.filter(o => text(o).includes(SUBJ[m.word][0])).length === 1 ? '' : 'expected the meaning of ' + m.word; };
  V['g4-subj-match'] = q => q.pairs.every(p => text(p[1]).includes(SUBJ[text(p[0])][0])) ? '' : 'a word is matched to the wrong meaning';
  V['g4-subj-use'] = (q, m) => (H.marked(q) || '').includes(SUBJ[m.word][2]) ? '' : 'expected the sentence that uses ' + m.word + ' well';
  V['g4-subj-tf'] = (q, m) => text(m.said).includes(SUBJ[m.word][0]) === q.answer ? '' : 'true/false is wrong for ' + m.word;
  V['g4-subj-sort'] = q => H.sameSet(q.options.map((o, i) => SUBJ[text(o)][1] === 'science' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the science words are not the ones marked';
})();
