/* Grade 2 answer checks: sounding out and spelling choices (grade2/chapters/sounds.js).
   The checker keeps its own lists of each word's sounds and real splits, and works soft c and g out from the next letter. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  /* sounds, written with dots: letter teams are one sound */
  const SOUNDS = {};
  ('sh.o.p ch.i.p f.r.o.g c.l.a.p s.t.e.p b.e.n.ch s.p.l.i.t b.r.u.sh s.t.o.m.p th.i.n d.u.ck s.n.a.ck f.i.sh g.r.a.n.d ' +
    'c.r.a.b s.w.i.m t.r.u.ck sh.e.l.f p.l.a.n.t ch.e.s.t s.k.u.n.k f.l.a.sh b.l.o.ck w.i.sh m.u.d l.u.n.ch').split(' ').forEach(w => { SOUNDS[w.replace(/\./g, '')] = w.split('.'); });
  const n = w => (SOUNDS[w] || []).length;
  const BEATS = new Set('sunset picnic bathtub napkin muffin rabbit kitten basket insect pumpkin helmet chipmunk'.split(' '));
  /* real splits; the vowel is short when the first beat ends in a consonant */
  const SPLIT = new Set('rob-in cab-in lem-on wag-on sev-en riv-er plan-et vis-it cam-el lim-it lev-el sal-ad med-al ro-bot pa-per ti-ger mu-sic ba-by o-pen ba-con spi-der si-lent mo-ment'.split(' '));
  const split = w => [...SPLIT].find(s => s.replace('-', '') === w);
  const soft = (w, l) => /[eiy]/.test(w.charAt(w.indexOf(l) + 1));
  const RIGHT = new Set('bone home rope stone nose hole joke rode note boat road coat soap goat toast float chair hair fair stairs pair care share scare square bare bear pear wear'.split(' '));
  /* sentences: the word that belongs in each */
  const FILL = { 'The dog chewed a ___.': 'bone', 'We walked ___ after school.': 'home', 'Hold on to the ___.': 'rope', 'I skipped a ___ on the lake.': 'stone', 'My ___ is cold.': 'nose',
    'The fox dug a ___.': 'hole', 'Dad told a funny ___.': 'joke', 'I ___ my bike to the park.': 'rode', 'I wrote a ___ to Gran.': 'note', 'We sailed in a ___.': 'boat', 'The bus drove down the ___.': 'road',
    'Zip up your ___.': 'coat', 'Wash your hands with ___.': 'soap', 'The ___ ate the grass.': 'goat', 'I had ___ for breakfast.': 'toast', 'The leaf will ___ on the water.': 'float',
    'Sit on the ___.': 'chair', 'Brush your ___.': 'hair', 'Walk up the ___.': 'stairs', 'I have a new ___ of socks.': 'pair', 'Please ___ your crayons.': 'share', 'A ___ has four sides.': 'square',
    'The ___ ate berries.': 'bear', 'I ate a juicy ___.': 'pear', 'I ___ a hat in winter.': 'wear', 'We take ___ of our dog.': 'care', 'The loud noise gave me a ___.': 'scare',
    'The green ___ sat on a log.': 'frog', 'A ___ swam on the pond.': 'duck', 'We saw a ___ in the lake.': 'fish', 'A big ___ drove down the road.': 'truck', 'The ___ ran along the sand.': 'crab',
    'I water my ___ every day.': 'plant', 'We eat ___ at noon.': 'lunch', 'Grandpa sat on the ___ in the park.': 'bench', 'Put the book on the ___.': 'shelf', 'A black and white ___ waddled by.': 'skunk' };
  const MEANS = { 'something you sit on': 'chair', 'it grows on your head': 'hair', 'the same for everyone': 'fair', 'steps in a house': 'stairs', 'two of something': 'pair',
    'to look after': 'care', 'to give some away': 'share', 'to make someone afraid': 'scare', 'a shape with four equal sides': 'square', 'with nothing on it': 'bare',
    'a big furry animal': 'bear', 'a fruit': 'pear', 'to have clothes on': 'wear' };
  const team = w => ['air', 'are', 'ear'].find(t => w.includes(t));
  const tiles = html => [...new DOMParser().parseFromString(html || '', 'text/html').querySelectorAll('.wt')].map(e => e.textContent);
  const sentOf = q => text(q.fig).replace(/\s+/g, ' ').trim();

  /* blend */
  V['g2-blend'] = (q, m) => { const shown = tiles(q.fig).join(''); return shown === m.word && mk(q) === m.word ? '' : 'the sounds make ' + shown; };
  V['g2-blend-tf'] = (q, m) => { const yes = tiles(q.fig).join('') === text(q.q).match(/reads (\w+)\./)[1]; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-missing-sound'] = (q, m) => { const s = SOUNDS[m.word]; return s && mk(q) === s[m.at] ? '' : 'expected ' + (s && s[m.at]); };
  V['g2-blend-beats'] = q => { const w = tiles(q.fig).join(''); return BEATS.has(w) && mk(q) === w ? '' : 'the beats make ' + w; };
  V['g2-blend-read'] = q => { const w = tiles(q.fig).join(''), f = text(q.fig), s = Object.keys(FILL).find(k => { const [a, b] = k.split('___').map(x => x.trim()); return f.startsWith(a) && f.indexOf(b, a.length) >= 0; });
    return mk(q) === w && FILL[s] === w ? '' : 'expected ' + w; };
  /* split into sounds */
  V['g2-count-sounds'] = (q, m) => n(m.word) && mk(q) === String(n(m.word)) ? '' : 'expected ' + n(m.word) + ' sounds in ' + m.word;
  V['g2-spell-sounds'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])); return b.join('.') === (SOUNDS[m.word] || []).join('.') && text(q.q).includes(m.word) ? '' : 'built ' + b.join('.'); };
  V['g2-match-sounds'] = q => q.pairs.every(p => +text(p[1]).split(' ')[0] === n(text(p[0]))) ? '' : 'a word is matched to the wrong number of sounds';
  V['g2-edge-sound'] = (q, m) => { const s = SOUNDS[m.word] || [], want = m.last ? s[s.length - 1] : s[0]; return mk(q) === want ? '' : 'expected ' + want; };
  V['g2-count-tf'] = (q, m) => { const yes = m.said === n(m.word); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  /* flex the vowel */
  V['g2-flex'] = q => { const ok = q.tiles.map(text).filter(t => SPLIT.has(t)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the real split'; };
  V['g2-flex-tf'] = (q, m) => (SPLIT.has(m.said) === q.answer) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false or the reason is wrong for ' + m.said;
  V['g2-flex-read'] = (q, m) => mk(q) === split(m.word) ? '' : 'expected ' + split(m.word);
  V['g2-flex-vowel'] = (q, m) => { const s = split(m.word), shortV = /[^aeiou]$/.test(s.split('-')[0]); return mk(q).startsWith(shortV ? 'short' : 'long') ? '' : 'expected ' + (shortV ? 'short' : 'long'); };
  /* soft c and g */
  V['g2-soft'] = (q, m) => { const s = soft(m.word, m.letter), t = mk(q); return (s ? /^[sj] as/.test(t) : /^[kg] as/.test(t)) ? '' : 'expected the ' + (s ? 'soft' : 'hard') + ' sound in ' + m.word; };
  V['g2-soft-pick'] = (q, m) => { const want = q.options.map((o, i) => (soft(text(o), m.letter) ? i : -1)).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'the soft words are not the ones marked'; };
  V['g2-soft-tf'] = (q, m) => { const s = soft(m.word, m.letter), saidSoft = /^[sj] as/.test(m.said); return (s === saidSoft) === q.answer && q.why.answer === (s ? 0 : 1) ? '' : 'true/false or the reason is wrong'; };
  V['g2-soft-one'] = (q, m) => { const ok = q.tiles.map(text).filter(t => soft(t, m.letter)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the one soft ' + m.letter + ' word'; };
  V['g2-soft-next'] = (q, m) => mk(q) === m.word.charAt(m.word.indexOf(m.letter) + 1) && /[eiy]/.test(mk(q)) ? '' : 'expected the letter after ' + m.letter;
  /* long o */
  V['g2-long-o'] = q => { const ok = q.options.map(text).filter(o => RIGHT.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the real spelling'; };
  V['g2-long-o-fill'] = (q, m) => mk(q) === FILL[m.s] ? '' : 'expected ' + FILL[m.s];
  V['g2-long-o-sort'] = (q, m) => { const has = w => m.team === 'oa' ? w.includes('oa') : /o.e$/.test(w), want = q.options.map((o, i) => (has(text(o)) ? i : -1)).filter(i => i >= 0);
    return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words with ' + m.team; };
  V['g2-long-o-tf'] = (q, m) => { const yes = m.said === FILL[m.s]; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  /* the air sound */
  V['g2-air'] = q => { const want = MEANS[text(q.q).replace(/^Which word means (.*)\?$/, '$1')]; return want && mk(q) === want ? '' : 'expected ' + want; };
  V['g2-air-sort'] = (q, m) => { const want = q.options.map((o, i) => (text(o).includes(m.team) ? i : -1)).filter(i => i >= 0); return want.length && H.sameSet(want, q.answer) ? '' : 'expected the words with ' + m.team; };
  V['g2-air-fill'] = (q, m) => mk(q) === FILL[m.s] && sentOf(q).length > 0 ? '' : 'expected ' + FILL[m.s];
  V['g2-air-team'] = (q, m) => mk(q) === team(m.word) ? '' : 'expected ' + team(m.word);
})();
