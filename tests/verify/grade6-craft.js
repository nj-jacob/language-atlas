/* Grade 6 answer checks: text structure and style (grade6/chapters/craft.js). The checker reads the pattern from a passage's own signal words
   and keeps its own key for features, visuals, design, style and devices. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  /* the pattern from the passage's words */
  const patternIn = s => /The problem.*The solution/.test(s) ? 'problem and solution' : /Both\b.*\bHowever\b/.test(s) ? 'compare and contrast' : /\bso\b|\bWhen\b/.test(s) && /Why/.test(s) ? 'cause and effect' : /\b1\. /.test(s) ? 'sequence' : null;
  V['g6-pattern'] = q => mk(q) === patternIn(text(q.fig)) ? '' : 'expected ' + patternIn(text(q.fig));
  const SIG = { 'both, however, unlike': 'compare and contrast', 'because, so, as a result': 'cause and effect', 'the problem, the solution, fixed': 'problem and solution', 'first, next, then, finally': 'sequence' };
  V['g6-signals'] = q => q.pairs.every(p => SIG[text(p[0])] === text(p[1])) ? '' : 'signal words are matched wrong';
  const EFFECT = { 'Lake ice shrinks on cold nights.': 'The ice cracks.', 'Cracks send sound waves through the ice.': 'The ice booms and pings.' };
  V['g6-effect'] = (q, m) => mk(q) === EFFECT[m.cause] && H.has(q.fig, m.cause) ? '' : 'expected ' + EFFECT[m.cause];
  const FEAT = { 'find what a hard word means': 'a glossary', 'find the page where a chapter starts': 'a table of contents', 'know what a photo shows': 'a caption',
    'jump to the part about polar bears': 'subheadings', 'choose your province on a website': 'a pull-down menu', 'read more on another web page': 'a link' };
  V['g6-feature'] = (q, m) => mk(q) === FEAT[m.need] ? '' : 'expected ' + FEAT[m.need];
  /* visuals: places need maps, parts need diagrams, change over time needs a line graph, order needs a timeline, amounts need a bar graph, looks need a photo */
  const visFor = w => /where/.test(w) ? 'a map' : /parts/.test(w) ? 'a labelled diagram' : /changed over/.test(w) ? 'a line graph' : /order of events/.test(w) ? 'a timeline' : /how many/.test(w) ? 'a bar graph' : /looks like/.test(w) ? 'a photo with a caption' : null;
  V['g6-visual'] = (q, m) => mk(q) === visFor(text(m.what)) ? '' : 'expected ' + visFor(text(m.what));
  V['g6-visual-match'] = q => q.pairs.every(p => visFor(text(p[1])) === text(p[0])) ? '' : 'a visual is matched wrong';
  const DES = { 'a huge, bold title': 'grabs your attention first', 'lots of white space': 'makes the page calm and easy to read', 'a red box around a warning': 'signals danger or importance', 'the same colour for every heading': 'shows the parts belong together' };
  V['g6-design'] = (q, m) => mk(q) === DES[m.d] ? '' : 'expected ' + DES[m.d];
  V['g6-design-tf'] = (q, m) => (DES[m.d] === m.said) === q.answer ? '' : 'true/false is wrong';
  /* style, worked out from the example: short fragments, repeated words, repeated first letters, a comparison, casual or formal voice */
  const styleOf = s => { const w = s.toLowerCase().match(/[a-z']+/g), first = w.map(x => x[0]);
    if (s.split('.').filter(x => x.trim()).length >= 3 && w.length < 8) return 'builds tension';
    if (/(\b\w+ \w+\.) \1/.test(s + ' ') || /We waited\. We waited/.test(s)) return 'stresses how long it felt';
    if (first.filter(x => x === first[0]).length >= 4) return 'makes a pleasing sound pattern';
    if (/\blike a\b/.test(s)) return 'creates a bright picture';
    if (/^Okay\b/.test(s)) return 'sounds like a friend talking';
    if (/are reminded/.test(s)) return 'sounds official and serious';
    return null; };
  V['g6-style'] = q => mk(q) === styleOf(text(q.fig)) ? '' : 'expected ' + styleOf(text(q.fig));
  V['g6-style-match'] = q => q.pairs.every(p => styleOf(text(p[0])) === text(p[1])) ? '' : 'an example is matched wrong';
  V['g6-style-tf'] = (q, m) => (styleOf(text(m.s)) === m.said) === q.answer ? '' : 'true/false is wrong';
  const FIT = { 'a science report': /km away/, 'a friendly text to a cousin': /wait to see you/, 'a scary story': /creaked/ };
  V['g6-style-fits'] = (q, m) => FIT[m.form].test(mk(q)) && q.options.map(text).filter(o => FIT[m.form].test(o)).length === 1 ? '' : 'expected the sentence that fits ' + m.form;
  /* hyperbole: the checker's own list of impossible amounts */
  const hyper = s => /\b(a ton|a million|like a year|for a week|more than a moose)\b/.test(s);
  V['g6-pick-hyper'] = q => H.sameSet(q.options.map((o, i) => (hyper(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the hyperboles are not the ones marked';
  V['g6-hyper-tf'] = (q, m) => hyper(m.s) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g6-hyper-why'] = q => /^to show how/.test(mk(q)) ? '' : 'expected: to show a feeling';
  const IDIOM = { 'got cold feet': 'got nervous and nearly gave up', 'over the moon': 'very happy', 'a piece of cake': 'very easy', 'break the ice': 'start a friendly conversation', 'under the weather': 'feeling sick', 'spill the beans': 'tell a secret' };
  V['g6-idiom'] = (q, m) => mk(q) === IDIOM[m.idiom] ? '' : 'expected ' + IDIOM[m.idiom];
  V['g6-idiom-match'] = q => q.pairs.every(p => IDIOM[text(p[0])] === text(p[1])) ? '' : 'an idiom is matched wrong';
})();
