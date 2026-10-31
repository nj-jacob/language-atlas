/* Grade 2 answer checks: word meanings (grade2/chapters/meanings.js). The checker keeps its own word lists and meanings. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const pairs = s => s.split(' ').map(p => p.split('/'));
  const SAME = pairs('big/large small/little happy/glad fast/quick begin/start shout/yell jump/leap close/shut gift/present rock/stone');
  const OPP = pairs('hot/cold up/down full/empty early/late loud/quiet wet/dry first/last heavy/light win/lose push/pull');
  const linked = (list, a, b) => list.some(p => (p[0] === a && p[1] === b) || (p[1] === a && p[0] === b));
  /* how strong each word is, within its family */
  const RANK = { warm: 1, hot: 2, boiling: 3, small: 1, tiny: 2, eat: 2, gobble: 3, nibble: 1, big: 1, huge: 2, happy: 1, thrilled: 2, cool: 1, cold: 2, freezing: 3, damp: 1, wet: 2, soaked: 3,
    like: 1, love: 2, good: 1, great: 2, amazing: 3, mad: 1, furious: 2 };
  const MEANS = { 'A bat hung upside down in the cave.': 'an animal that flies at night', 'Omar swung the bat and hit the ball.': 'a stick for hitting a ball',
    'The puppy gave a loud bark.': 'the sound a dog makes', 'The bark of the birch tree is white.': 'the outside of a tree', 'The leaves turn red in the fall.': 'the season after summer',
    'Be careful not to fall on the ice.': 'to drop down', 'The empty box is light.': 'not heavy', 'Turn on the light, please.': 'something that helps you see',
    'We had a picnic in the park.': 'a place with grass to play', 'Dad will park the van here.': 'to stop a car and leave it', 'Grandma wears a gold ring.': 'jewellery for your finger',
    'I heard the bell ring.': 'the sound a bell makes', 'A big wave splashed the dock.': 'water that rises on a lake', 'Wave to the bus driver.': 'to move your hand to say hi' };
  const CLUE = { scalding: ['very hot', 'waited for it to cool down'], timid: ['shy and a bit scared', 'hid behind the couch'], famished: ['very hungry', 'ate the whole bowl fast'],
    weary: ['tired', 'After the long walk'], vibrant: ['bright and full of colour', 'red, yellow and purple flowers'], steep: ['going up sharply', 'climbed slowly up the hill'] };
  const abcFirst = list => list.slice().sort((a, b) => (a < b ? -1 : 1))[0];

  V['g2-same'] = (q, m) => linked(SAME, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(SAME, m.word, t)).length === 1 ? '' : 'expected the synonym of ' + m.word;
  V['g2-opposite'] = (q, m) => linked(OPP, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(OPP, m.word, t)).length === 1 ? '' : 'expected the opposite of ' + m.word;
  V['g2-match-same'] = q => q.pairs.every(p => linked(SAME, text(p[0]), text(p[1]))) ? '' : 'a word is matched to one that does not mean the same';
  V['g2-same-or-opp'] = (q, m) => mk(q) === (linked(SAME, m.a, m.b) ? 'the same' : linked(OPP, m.a, m.b) ? 'the opposite' : '?') ? '' : 'the pair is marked the wrong way';
  V['g2-stronger'] = q => { const ts = q.tiles.map(text), top = Math.max(...ts.map(t => RANK[t] || 0)); return ts.every(t => RANK[t]) && RANK[mk(q)] === top && ts.filter(t => RANK[t] === top).length === 1 ? '' : 'expected the strongest word'; };
  V['g2-ladder'] = q => { const r = q.items.map(i => RANK[text(i)]); return r.every((x, i) => x && (i === 0 || x > r[i - 1])) ? '' : 'the words are not from weakest to strongest'; };
  V['g2-two'] = (q, m) => mk(q) === MEANS[m.s] && text(q.fig) === m.s ? '' : 'expected ' + MEANS[m.s];
  V['g2-two-match'] = q => q.pairs.every(p => MEANS[text(p[0])] === text(p[1])) ? '' : 'a sentence is matched to the wrong meaning';
  V['g2-clue'] = (q, m) => mk(q) === CLUE[m.word][0] && H.has(q.fig, m.word) ? '' : 'expected ' + CLUE[m.word][0];
  V['g2-clue-words'] = (q, m) => mk(q) === CLUE[m.word][1] && H.has(q.fig, CLUE[m.word][1]) ? '' : 'expected the clue words';
  V['g2-abc'] = q => mk(q) === abcFirst(q.tiles.map(text)) ? '' : 'expected ' + abcFirst(q.tiles.map(text));
  V['g2-abc-order'] = q => { const s = q.items.map(text); return s.every((w, i) => i === 0 || s[i - 1] < w) ? '' : 'the words are not in ABC order'; };
})();
