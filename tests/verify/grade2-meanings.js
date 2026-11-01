/* Grade 2 answer checks: word meanings (grade2/chapters/meanings.js). The checker keeps its own word lists and meanings. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => H.marked(q);
  const pairs = s => s.split(' ').map(p => p.split('/'));
  const SAME = pairs('big/large small/little happy/glad fast/quick begin/start shout/yell jump/leap close/shut gift/present rock/stone sick/ill angry/mad end/finish look/see talk/speak under/below');
  const OPP = pairs('hot/cold up/down full/empty early/late loud/quiet wet/dry first/last heavy/light win/lose push/pull open/closed old/new day/night in/out happy/sad fast/slow');
  const linked = (list, a, b) => list.some(p => (p[0] === a && p[1] === b) || (p[1] === a && p[0] === b));
  /* how strong each word is, within its family */
  const FAMILY = 'cool<cold<freezing warm<hot<boiling good<great<amazing damp<wet<soaked nibble<eat<gobble small<tiny big<huge happy<thrilled like<love mad<furious tired<exhausted walk<stomp scared<terrified talk<shout'.split(' ').map(f => f.split('<'));
  const fam = w => FAMILY.find(f => f.includes(w)), RANK = w => { const f = fam(w); return f ? f.indexOf(w) + 1 : 0; };
  const MEANS = { 'A bat hung upside down in the cave.': 'an animal that flies at night', 'Omar swung the bat and hit the ball.': 'a stick for hitting a ball',
    'The puppy gave a loud bark.': 'the sound a dog makes', 'The bark of the birch tree is white.': 'the outside of a tree', 'The leaves turn red in the fall.': 'the season after summer',
    'Be careful not to fall on the ice.': 'to drop down', 'The empty box is light.': 'not heavy', 'Turn on the light, please.': 'something that helps you see',
    'We had a picnic in the park.': 'a place with grass to play', 'Dad will park the van here.': 'to stop a car and leave it', 'Grandma wears a gold ring.': 'jewellery for your finger',
    'I heard the bell ring.': 'the sound a bell makes', 'A big wave splashed the dock.': 'water that rises on a lake', 'Wave to the bus driver.': 'to move your hand to say hi',
    'A duck swam across the pond.': 'a bird that swims', 'Duck under the low branch!': 'to bend down fast', 'The elephant sprayed water from its trunk.': 'the nose of an elephant',
    'Kai leaned on the trunk of the maple.': 'the main stem of a tree', 'I painted my nail blue.': 'the hard part at the end of a finger', 'Dad hit the nail with a hammer.': 'a thin metal spike',
    'A seal slid off the rock into the sea.': 'an animal that swims in the sea', 'Seal the envelope before you mail it.': 'to close tightly', 'We sat on a big rock.': 'a stone', 'Rock the baby to sleep.': 'to move gently back and forth' };
  const CLUE = { scalding: ['very hot', 'waited for it to cool down'], timid: ['shy and a bit scared', 'hid behind the couch'], famished: ['very hungry', 'ate the whole bowl fast'],
    weary: ['tired', 'After the long walk'], vibrant: ['bright and full of colour', 'red, yellow and purple flowers'], steep: ['going up sharply', 'climbed slowly up the hill'],
    drowsy: ['sleepy', 'soon fell asleep'], fragile: ['easy to break', 'only one person could cross'], frigid: ['very cold', 'ice covered the top'], delighted: ['very pleased', 'grinned when he opened the gift'],
    silent: ['with no sound', 'no one made a sound'], enormous: ['very big', 'could not reach around it'] };
  const abcFirst = list => list.slice().sort((a, b) => (a < b ? -1 : 1))[0];

  V['g2-same'] = (q, m) => linked(SAME, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(SAME, m.word, t)).length === 1 ? '' : 'expected the synonym of ' + m.word;
  V['g2-opposite'] = (q, m) => linked(OPP, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(OPP, m.word, t)).length === 1 ? '' : 'expected the opposite of ' + m.word;
  V['g2-match-same'] = q => q.pairs.every(p => linked(SAME, text(p[0]), text(p[1]))) ? '' : 'a word is matched to one that does not mean the same';
  V['g2-same-or-opp'] = (q, m) => mk(q) === (linked(SAME, m.a, m.b) ? 'the same' : linked(OPP, m.a, m.b) ? 'the opposite' : '?') ? '' : 'the pair is marked the wrong way';
  V['g2-stronger'] = q => { const ts = q.tiles.map(text), f = fam(ts[0]), top = Math.max(...ts.map(RANK)); return ts.every(t => fam(t) === f) && RANK(mk(q)) === top ? '' : 'expected the strongest word'; };
  V['g2-ladder'] = q => { const ts = q.items.map(text), r = ts.map(RANK); return ts.every(t => fam(t) === fam(ts[0])) && r.every((x, i) => i === 0 || x > r[i - 1]) ? '' : 'the words are not from weakest to strongest'; };
  V['g2-stronger-tf'] = (q, m) => { const yes = fam(m.a) === fam(m.b) && RANK(m.a) > RANK(m.b); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-stronger-word'] = (q, m) => fam(mk(q)) === fam(m.word) && RANK(mk(q)) === RANK(m.word) + 1 ? '' : 'expected the next stronger word after ' + m.word;
  V['g2-two'] = (q, m) => mk(q) === MEANS[m.s] && text(q.fig) === m.s ? '' : 'expected ' + MEANS[m.s];
  V['g2-two-match'] = q => q.pairs.every(p => MEANS[text(p[0])] === text(p[1])) ? '' : 'a sentence is matched to the wrong meaning';
  V['g2-clue'] = (q, m) => mk(q) === CLUE[m.word][0] && H.has(q.fig, m.word) ? '' : 'expected ' + CLUE[m.word][0];
  V['g2-clue-words'] = (q, m) => mk(q) === CLUE[m.word][1] && H.has(q.fig, CLUE[m.word][1]) ? '' : 'expected the clue words';
  V['g2-abc'] = q => mk(q) === abcFirst(q.tiles.map(text)) ? '' : 'expected ' + abcFirst(q.tiles.map(text));
  V['g2-abc-order'] = q => { const s = q.items.map(text); return s.every((w, i) => i === 0 || s[i - 1] < w) ? '' : 'the words are not in ABC order'; };
  V['g2-same-swap'] = (q, m) => linked(SAME, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(SAME, m.word, t)).length === 1 ? '' : 'expected the word that means the same as ' + m.word;
  V['g2-same-tf'] = (q, m) => { const yes = linked(SAME, m.a, m.b); return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-opp-flip'] = (q, m) => linked(OPP, m.word, mk(q)) && q.tiles.map(text).filter(t => linked(OPP, m.word, t)).length === 1 ? '' : 'expected the opposite of ' + m.word;
  V['g2-match-opp'] = q => q.pairs.every(p => linked(OPP, text(p[0]), text(p[1]))) ? '' : 'a word is matched to one that is not its opposite';
  V['g2-two-which'] = (q, m) => MEANS[mk(q)] === m.mean && q.options.map(text).filter(o => MEANS[o] === m.mean).length === 1 ? '' : 'expected the sentence where ' + m.word + ' means ' + m.mean;
  V['g2-two-tf'] = (q, m) => { const yes = MEANS[m.s] === m.said; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-clue-tf'] = (q, m) => { const yes = CLUE[m.word][0] === m.said; return q.answer === yes && q.why.answer === (yes ? 0 : 1) ? '' : 'expected ' + yes; };
  V['g2-clue-word'] = (q, m) => { const w = mk(q); return CLUE[w] && CLUE[w][0] === m.mean && H.has(q.fig, w) ? '' : 'expected the word that means ' + m.mean; };
  V['g2-abc-last'] = q => { const ts = q.tiles.map(text), last = ts.slice().sort().pop(); return mk(q) === last ? '' : 'expected ' + last; };
  V['g2-abc-between'] = q => { const [a, b] = [...text(q.q).matchAll(/between (\w+) and (\w+)\?/g)][0].slice(1), w = mk(q), ok = q.tiles.map(text).filter(t => t > a && t < b); return ok.length === 1 && w === ok[0] ? '' : 'expected the word between ' + a + ' and ' + b; };
})();
