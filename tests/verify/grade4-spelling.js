/* Grade 4 answer checks: spelling word endings (grade4/chapters/spelling.js). The checker keeps its own dictionary of right
   spellings, like a second marker, rather than working them out with the site's rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s);
  const RIGHT = {
    'hope+ing': 'hoping', 'make+ing': 'making', 'bake+ed': 'baked', 'smile+ing': 'smiling', 'ride+ing': 'riding', 'save+ed': 'saved', 'share+ing': 'sharing', 'skate+er': 'skater', 'dance+er': 'dancer', 'write+ing': 'writing', 'bike+ed': 'biked', 'wave+ing': 'waving',
    'hope+ful': 'hopeful', 'care+ful': 'careful', 'move+ment': 'movement', 'safe+ly': 'safely', 'use+ful': 'useful', 'excite+ment': 'excitement', 'lone+ly': 'lonely', 'late+ly': 'lately',
    'hop+ing': 'hopping', 'run+ing': 'running', 'plan+ed': 'planned', 'swim+er': 'swimmer', 'stop+ed': 'stopped', 'drop+ing': 'dropping', 'skip+ed': 'skipped', 'shop+ing': 'shopping',
    'grab+ed': 'grabbed', 'big+er': 'bigger', 'sad+est': 'saddest', 'chat+ing': 'chatting', 'clap+ed': 'clapped', 'wet+est': 'wettest',
    'jump+ing': 'jumping', 'rain+ed': 'rained', 'help+er': 'helper', 'look+ing': 'looking', 'camp+ed': 'camped', 'read+er': 'reader', 'sing+ing': 'singing', 'cool+er': 'cooler',
    'cry+ed': 'cried', 'happy+ness': 'happiness', 'carry+ed': 'carried', 'try+es': 'tries', 'busy+ly': 'busily', 'study+ed': 'studied', 'funny+er': 'funnier', 'hurry+ed': 'hurried', 'easy+ly': 'easily', 'copy+ed': 'copied', 'lucky+est': 'luckiest',
    'cry+ing': 'crying', 'play+ed': 'played', 'enjoy+ed': 'enjoyed', 'carry+ing': 'carrying', 'stay+ed': 'stayed', 'study+ing': 'studying', 'spray+ed': 'sprayed', 'hurry+ing': 'hurrying'
  };
  const PLURAL = { book: 'books', lake: 'lakes', canoe: 'canoes', map: 'maps', kite: 'kites', tree: 'trees', day: 'days', key: 'keys', toy: 'toys', tray: 'trays', monkey: 'monkeys', boy: 'boys', hat: 'hats', cup: 'cups', bike: 'bikes', song: 'songs', valley: 'valleys', turkey: 'turkeys',
    box: 'boxes', bus: 'buses', dish: 'dishes', lunch: 'lunches', fox: 'foxes', glass: 'glasses', bench: 'benches', brush: 'brushes', peach: 'peaches', wish: 'wishes', dress: 'dresses', watch: 'watches', beach: 'beaches', class: 'classes',
    city: 'cities', berry: 'berries', story: 'stories', puppy: 'puppies', family: 'families', pony: 'ponies', lily: 'lilies', party: 'parties', baby: 'babies', penny: 'pennies', cherry: 'cherries', library: 'libraries' };
  const right = m => RIGHT[m.base + '+' + m.end];
  const RULE = { 'Drop the e': ['hoping', 'making', 'baked', 'smiling', 'riding', 'saved', 'sharing', 'skater', 'dancer', 'writing', 'biked', 'waving'],
    'Double the last letter': ['hopping', 'running', 'planned', 'swimmer', 'stopped', 'dropping', 'skipped', 'shopping', 'grabbed', 'bigger', 'saddest', 'chatting', 'clapped', 'wettest'],
    'Change y to i': ['cried', 'happiness', 'carried', 'tries', 'busily', 'studied', 'funnier', 'hurried', 'easily', 'copied', 'luckiest'] };
  /* "hope + ing" is the plain join: the rule applies when the right spelling is not just base + ending */
  const ruleFor = m => right(m) === m.base + m.end ? '' : right(m) === m.base + m.base.slice(-1) + m.end ? 'Double' : /y$/.test(m.base) ? 'y' : 'e';

  V['g4-sp-add'] = (q, m) => right(m) && H.marked(q) === right(m) ? '' : 'expected ' + right(m);
  V['g4-sp-build'] = (q, m) => { const b = q.answer.map(i => text(q.parts[i])).join(''); return b === right(m) ? '' : 'built ' + b + ', expected ' + right(m); };
  V['g4-sp-which'] = (q, m) => H.marked(q) === right(m) && H.has(q.fig, m.base + ' + ' + m.end) ? '' : 'expected ' + right(m);
  V['g4-sp-tf'] = (q, m) => {
    if (!H.has(q.fig, m.shown)) return 'the word is not shown';
    if ((m.shown === right(m)) !== q.answer) return 'true/false is wrong for ' + m.shown;
    const why = text(q.why.options[q.why.answer]), r = ruleFor(m);
    return (r === 'e' && /the e goes/.test(why)) || (r === 'Double' && /double it/.test(why)) || (r === 'y' && /y changes to i/.test(why)) ? '' : 'the reason "' + why + '" does not fit';
  };
  /* the base changes when the right spelling is not the plain join; the rule decides which change */
  const changes = (b, e, rule) => { const r = RIGHT[b + '+' + e]; return r !== b + e && (rule === 'e' ? r === b.slice(0, -1) + e : rule === 'dbl' ? r === b + b.slice(-1) + e : r === b.slice(0, -1) + 'i' + e); };
  V['g4-sp-sort'] = (q, m) => H.sameSet(q.options.map((o, i) => { const [b, e] = text(o).split(' + '); return changes(b, e, m.rule) ? i : -1; }).filter(i => i >= 0), q.answer) ? '' : 'the ones that change are not the ones marked';
  V['g4-sp-match'] = q => q.pairs.every(p => (RULE[text(p[1])] || []).includes(text(p[0]))) ? '' : 'a word is matched to the wrong rule';
  const base = q => (text(q.q).match(/(?:One|plural of) (\w+)/) || [])[1];
  V['g4-pl-one'] = (q, m) => base(q) === m.w && H.marked(q) === PLURAL[m.w] ? '' : 'expected ' + PLURAL[m.w];
  V['g4-pl-tiles'] = (q, m) => base(q) === m.w && H.marked(q) === PLURAL[m.w] ? '' : 'expected ' + PLURAL[m.w];
  V['g4-pl-pick'] = q => H.sameSet(q.options.map((o, i) => PLURAL[text(o)] === text(o) + 'es' ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words that add -es are not the ones marked';
  V['g4-pl-build'] = (q, m) => q.answer.map(i => text(q.parts[i])).join('') === PLURAL[m.w] ? '' : 'expected ' + PLURAL[m.w];
  V['g4-pl-build-es'] = (q, m) => q.answer.map(i => text(q.parts[i])).join('') === PLURAL[m.w] ? '' : 'expected ' + PLURAL[m.w];
  V['g4-pl-tf'] = (q, m) => { const ok = m.shown === PLURAL[m.w], w = text(q.why.options[q.why.answer]), want = /(s|x|ch|sh)$/.test(m.w) ? 'After s, x' : /[^aeiou]y$/.test(m.w) ? 'A consonant before' : /y$/.test(m.w) ? 'A vowel before' : 'Most words';
    return ok === q.answer && w.startsWith(want) ? '' : 'wrong for ' + m.shown; };
  V['g4-pl-ysort'] = q => H.sameSet(q.options.map((o, i) => PLURAL[text(o)] && PLURAL[text(o)].endsWith('ies') ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the words that change y to i are not the ones marked';
  V['g4-pl-match'] = q => q.pairs.every(p => PLURAL[text(p[0])] === text(p[1])) ? '' : 'a word is matched to the wrong plural';
})();
