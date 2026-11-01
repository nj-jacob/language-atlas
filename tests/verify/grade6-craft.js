/* Grade 6 answer checks: text structure and style (grade6/chapters/craft.js). The checker reads the pattern from a passage's own signal words,
   works out styles and hyperbole from the sentence itself, and keeps its own key for causes, features, visuals, design and idioms. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && (!q.why || q.why.answer === (right ? 0 : 1)) ? '' : 'expected ' + right;
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig; return text(d.querySelector('.sent').innerHTML); };
  const passage = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); return p ? [...p.querySelectorAll('.pt, .psh, .ps')].map(x => text(x.innerHTML)).join(' ') : ''; };
  /* the pattern from the passage's words */
  const patternIn = s => /The problem.*The solution/.test(s) ? 'problem and solution' : /\bBoth\b.*\bHowever\b/.test(s) ? 'compare and contrast' : /\bso\b|\bWhen\b|As a result/.test(s) && /Why/.test(s) ? 'cause and effect' : /\b1\. /.test(s) ? 'sequence' : null;
  V['g6-pattern'] = q => mk(q) === patternIn(passage(q)) ? '' : 'expected ' + patternIn(passage(q));
  V['g6-pattern-tf'] = q => { const said = text(q.q).match(/uses (.+)\.$/)[1]; return tf(q, said === patternIn(passage(q))); };
  const SIG = { both: 'compare and contrast', however: 'compare and contrast', unlike: 'compare and contrast', similarly: 'compare and contrast', because: 'cause and effect', 'as a result': 'cause and effect',
    therefore: 'cause and effect', so: 'cause and effect', 'the problem': 'problem and solution', 'the solution': 'problem and solution', 'to fix this': 'problem and solution', solved: 'problem and solution',
    first: 'sequence', next: 'sequence', then: 'sequence', finally: 'sequence' };
  V['g6-signals'] = q => q.pairs.every(p => SIG[text(p[0])] === text(p[1])) ? '' : 'signal words are matched wrong';
  V['g6-which-signal'] = (q, m) => { const ok = q.tiles.map(t => SIG[text(t)] === m.p); return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected a signal word for ' + m.p; };
  const EFFECT = { 'Lake ice shrinks on cold nights.': 'The ice cracks.', 'Cracks send sound waves through the ice.': 'The ice booms and pings.', 'Old chimneys are capped or torn down.': 'Swifts lose places to roost.',
    'A swift tower is built.': 'Hundreds of swifts have a place to roost.', 'Fields of milkweed are mowed, sprayed or paved over.': 'Fewer monarch caterpillars survive.', 'People plant more milkweed.': 'More caterpillars grow into butterflies.' };
  V['g6-effect'] = (q, m) => mk(q) === EFFECT[m.cause] && H.has(q.fig, m.cause) ? '' : 'expected ' + EFFECT[m.cause];
  /* features */
  const FEAT = { 'find what a hard word means': 'a glossary', 'find the page where a chapter starts': 'a table of contents', 'know what a photo shows': 'a caption', 'jump to the part about polar bears': 'a subheading',
    'choose your province on a website': 'a pull-down menu', 'read more on another web page': 'a link', 'find every page that mentions caribou': 'an index', 'spot the key words on a page': 'bold words',
    'know what the colours on a map mean': 'a legend' };
  /* what each feature looks like */
  const looks = s => /\.{4,} \d+$/.test(s) ? 'a table of contents' : /^Photo: /.test(s) ? 'a caption' : /▾/.test(s) ? 'a pull-down menu' : /^Read more/.test(s) ? 'a link' : /^\w+, \d+(, \d+)+$/.test(s) ? 'an index'
    : /■/.test(s) ? 'a legend' : /^\w+: /.test(s) ? 'a glossary' : /hibernate/.test(s) ? 'bold words' : /^Polar bears$/.test(s) ? 'a subheading' : null;
  V['g6-feature'] = (q, m) => mk(q) === FEAT[m.need] ? '' : 'expected ' + FEAT[m.need];
  V['g6-feature-name'] = (q, m) => mk(q) === looks(sent(q)) && looks(sent(q)) === FEAT[m.need] ? '' : 'expected ' + looks(sent(q));
  V['g6-feature-match'] = q => q.pairs.every(p => FEAT[text(p[1])] === text(p[0])) ? '' : 'a feature is matched wrong';
  V['g6-feature-tf'] = (q, m) => tf(q, FEAT[m.need] === m.f);
  /* visuals: places need maps, parts need diagrams, change over time a line graph, order a timeline, amounts a bar graph, looks a photo, cycles a life-cycle diagram, parts of a whole a pie chart */
  const visFor = w => /^where/.test(w) ? 'a map' : /the parts of/.test(w) ? 'a labelled diagram' : /changed over/.test(w) ? 'a line graph' : /order of events/.test(w) ? 'a timeline' : /^how many/.test(w) ? 'a bar graph'
    : /looks like/.test(w) ? 'a photo with a caption' : /becomes/.test(w) ? 'a life-cycle diagram' : /which part of/.test(w) ? 'a pie chart' : null;
  V['g6-visual'] = (q, m) => mk(q) === visFor(text(m.what)) ? '' : 'expected ' + visFor(text(m.what));
  V['g6-visual-match'] = q => q.pairs.every(p => visFor(text(p[1])) === text(p[0])) ? '' : 'a visual is matched wrong';
  V['g6-visual-for'] = (q, m) => { const ok = q.options.map(o => visFor(text(o)) === m.v); return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected what ' + m.v + ' shows'; };
  V['g6-visual-tf'] = (q, m) => tf(q, visFor(text(m.what)) === m.pick);
  /* design */
  const DES = { 'a huge, bold title': 'grabs your attention first', 'lots of white space': 'makes the page calm and easy to read', 'a red box around a warning': 'signals danger',
    'the same colour for every heading': 'shows the parts belong together', 'an arrow pointing to a button': 'shows where to look next', 'a large photo across the top': 'sets the mood and the topic',
    'a small picture beside each step': 'helps readers follow with fewer words', 'the price in large print': 'makes the most important number stand out' };
  V['g6-design'] = (q, m) => mk(q) === DES[m.d] ? '' : 'expected ' + DES[m.d];
  V['g6-design-for'] = (q, m) => DES[mk(q)] === m.does ? '' : 'expected the choice that ' + m.does;
  V['g6-design-match'] = q => q.pairs.every(p => DES[text(p[0])] === text(p[1])) ? '' : 'a design choice is matched wrong';
  V['g6-design-tf'] = (q, m) => tf(q, DES[m.d] === m.said);
  /* style, worked out from the example: fragments, repeats, repeated first letters, a comparison, casual or formal voice, an exact word, one long sentence */
  const styleOf = s => { const w = s.toLowerCase().match(/[a-z']+/g), first = w.map(x => x[0]);
    if (s.split('.').filter(x => x.trim()).length >= 3 && w.length < 8) return ['builds tension', 'sentence structure'];
    if (/(\b\w+ \w+\.) \1/.test(s + ' ')) return ['stresses how long it felt', 'word pattern'];
    if (first.filter(x => x === first[0]).length >= 4) return ['makes a pleasing sound pattern', 'word pattern'];
    if (/\blike a\b/.test(s)) return ['creates a bright picture', 'word choice'];
    if (/^Okay\b/.test(s)) return ['sounds like a friend talking', 'voice'];
    if (/are reminded/.test(s)) return ['sounds official and serious', 'voice'];
    if (/, not just \w+\./.test(s)) return ['gives an exact, strong meaning', 'word choice'];
    if (/^Although\b.*,.*,/.test(s)) return ['packs the challenges into one sentence', 'sentence structure'];
    return [null, null]; };
  V['g6-style'] = q => mk(q) === styleOf(sent(q))[0] ? '' : 'expected ' + styleOf(sent(q))[0];
  V['g6-style-element'] = q => mk(q) === styleOf(sent(q))[1] ? '' : 'expected ' + styleOf(sent(q))[1];
  V['g6-style-match'] = q => q.pairs.every(p => styleOf(text(p[0]))[0] === text(p[1])) ? '' : 'an example is matched wrong';
  V['g6-style-tf'] = (q, m) => tf(q, styleOf(text(m.s))[0] === text(m.said));
  const FIT = { 'a science report': /km away/, 'a friendly text to a cousin': /wait to see you/, 'a scary story': /creaked/, instructions: /^Stir/, 'a news report': /^On Tuesday/, 'a poem': /soft as a whisper/ };
  V['g6-style-fits'] = (q, m) => FIT[m.form].test(mk(q)) && q.options.map(text).filter(o => FIT[m.form].test(o)).length === 1 ? '' : 'expected the sentence that fits ' + m.form;
  /* hyperbole: the checker's own list of impossible amounts, and what each really means */
  const hyper = s => /\b(a ton|a million|like a year|for a week|more than a moose|a mile long|eat a horse|whole city)\b/.test(s);
  const MEANS = { 'My backpack weighed a ton.': 'heavy', 'I have told you a million times.': 'many times', 'Ten minutes feels like a year.': 'feels long', 'I could sleep for a week.': 'tired',
    'This bag weighs more than a moose.': 'hard to lift', 'The line was a mile long.': 'Many people', 'I am so hungry I could eat a horse.': 'hungry', 'Her smile lit up the whole city.': 'happy' };
  V['g6-pick-hyper'] = q => H.sameSet(q.options.map((o, i) => (hyper(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the hyperboles are not the ones marked';
  V['g6-hyper-tf'] = (q, m) => tf(q, hyper(m.s));
  V['g6-hyper-means'] = (q, m) => { const w = MEANS[text(m.s)], ok = q.options.map(o => !!w && text(o).includes(w)); return ok.filter(Boolean).length === 1 && ok[q.answer] ? '' : 'expected the plain meaning'; };
  V['g6-hyper-why'] = q => /strong feeling/.test(mk(q)) && hyper(passage(q).replace(/weighed a ton/, 'a ton').replace(/feels like a year/, 'like a year')) ? '' : 'expected: to show a feeling';
  const IDIOM = { 'got cold feet': 'got nervous and nearly gave up', 'over the moon': 'very happy', 'a piece of cake': 'very easy', 'break the ice': 'start a friendly conversation', 'under the weather': 'feeling sick',
    'spill the beans': 'tell a secret', 'hit the books': 'study hard', 'in hot water': 'in trouble', 'on cloud nine': 'extremely happy', 'cost an arm and a leg': 'cost a lot of money' };
  V['g6-idiom'] = (q, m) => mk(q) === IDIOM[m.idiom] ? '' : 'expected ' + IDIOM[m.idiom];
  V['g6-idiom-match'] = q => q.pairs.every(p => IDIOM[text(p[0])] === text(p[1])) ? '' : 'an idiom is matched wrong';
  V['g6-idiom-find'] = q => IDIOM[mk(q)] && sent(q).includes(mk(q)) && q.options.filter(o => IDIOM[text(o)]).length === 1 ? '' : 'expected the idiom in the sentence';
  V['g6-idiom-tf'] = (q, m) => tf(q, IDIOM[m.idiom] === text(m.said));
})();
