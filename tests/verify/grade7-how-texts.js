/* Grade 7 answer checks: how texts work (grade7/chapters/how-texts.js). The checker reads the passage card itself to find its form and
   narrator, finds text patterns from their signal words, and keeps its own lists of forms, features, graphics, design choices and style. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('.ps')].map(x => text(x.innerHTML)) }; };
  const sent = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; return text((d.querySelector('.sent') || d).textContent); };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* the form, from how the passage is built: headings, a signed last line, or the checker's own list of titles */
  const FABLES = ['The Wall on the River'], POEMS = ['Thaw'], NEWS = ['Students Bring a Creek Back to Life'];
  const formOf = c => c.heads ? 'information text' : /, Grade \d$/.test(c.lines[c.lines.length - 1]) ? 'opinion piece' : FABLES.includes(c.title) ? 'fable' : POEMS.includes(c.title) ? 'poem' : NEWS.includes(c.title) ? 'news report' : 'story';
  const CLUE = { 'information text': /headings/, story: /characters and events/, 'opinion piece': /argues/, fable: /lesson/, poem: /short lines/, 'news report': /recent event/ };
  const NAME = s => s.replace(/^an? /, '');
  V['g7-form'] = q => mk(q) === formOf(card(q)) ? '' : 'expected ' + formOf(card(q));
  V['g7-form-clue'] = q => { const f = formOf(card(q)); return text(q.q).includes(f) && CLUE[f].test(mk(q)) && q.options.filter(o => CLUE[f].test(text(o))).length === 1 ? '' : 'expected the clue for ' + f; };
  V['g7-form-tf'] = (q, m) => { const right = NAME(text(q.q).match(/this is (.+)\.$/)[1]) === formOf(card(q)); return q.answer === right && tfWhy(q, right) && text(m.said) === NAME(text(q.q).match(/this is (.+)\.$/)[1]) ? '' : 'expected ' + right; };
  const FORM = { fable: 'a short story with a lesson', memoir: "a true story from the writer's own life", 'opinion piece': 'argues for a position', 'news report': 'tells who, what, when',
    'oral story': 'passed down by telling', 'graphic novel': 'tells a story in panels', poem: 'uses lines, sound and images', biography: "another person's life", interview: "someone's questions", procedure: 'numbered steps' };
  V['g7-form-match'] = q => q.pairs.every(p => text(p[1]).includes(FORM[text(p[0])])) ? '' : 'a form is matched wrong';
  V['g7-form-which'] = q => text(q.q).includes(FORM[mk(q)]) && q.options.filter(o => text(q.q).includes(FORM[text(o)])).length === 1 ? '' : 'expected the form that fits';
  /* patterns, from the signal words */
  const patternOf = s => /\b(Because|As a result|Therefore|Consequently)\b/.test(s) ? 'cause and effect' : /\b(however|Both|Unlike|Similarly)\b/.test(s) ? 'compare and contrast'
    : /\b(First|Next|By noon|After|Later)\b/.test(s) ? 'time order' : /solution|fix this|solved|The answer was/.test(s) ? 'problem and solution' : '';
  const SIGNAL = /^(Because|As a result|Therefore|Consequently|however|Both|Unlike|Similarly|First|By noon|After|Later|solution|To fix this|solved|The answer was)$/;
  V['g7-pattern'] = (q, m) => mk(q) === patternOf(text(m.s)) ? '' : 'expected ' + patternOf(text(m.s));
  V['g7-pattern-tf'] = (q, m) => { const right = text(m.said) === patternOf(text(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-signal'] = (q, m) => SIGNAL.test(mk(q)) && text(m.s).includes(mk(q)) && text(q.q).includes(patternOf(text(m.s))) && q.tiles.filter(t => SIGNAL.test(text(t))).length === 1 ? '' : 'expected the signal word';
  const PATTERN_T = { 'Roads Made of Ice': 'cause and effect', 'Gardens on the Roof': 'problem and solution', 'Two Ways to Heat a Home': 'compare and contrast', 'Manoomin: Wild Rice': 'time order', 'Students Bring a Creek Back to Life': 'cause and effect' };
  V['g7-pattern-text'] = q => mk(q) === PATTERN_T[card(q).title] ? '' : 'expected ' + PATTERN_T[card(q).title];
  /* features */
  const FEAT = { bibliography: 'sources', glossary: 'key words', index: 'by page', sidebar: 'beside the main text', caption: 'explains a picture', 'accessible font': 'easy for everyone',
    'table of contents': 'chapters', heading: 'section', footnote: 'bottom of the page', 'alt text': 'cannot see' };
  const SAMPLE = { bibliography: /\(\d{4}\)/, glossary: /^muskeg:/, index: /canoes, 12/, sidebar: /^Did you know/, caption: /^Photo:/, 'table of contents': /^1\./, heading: /^A shorter season$/, footnote: /^1 Numbers/, 'alt text': /^Image description/ };
  V['g7-feature'] = q => text(q.q).includes(FEAT[mk(q)]) && q.options.filter(o => text(q.q).includes(FEAT[text(o)])).length === 1 ? '' : 'expected the feature with that job';
  V['g7-feature-sample'] = q => SAMPLE[mk(q)] && SAMPLE[mk(q)].test(sent(q)) ? '' : 'expected the feature shown';
  V['g7-feature-tf'] = (q, m) => { const right = text(m.said).includes(FEAT[m.f]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-feature-match'] = q => q.pairs.every(p => text(p[1]).includes(FEAT[text(p[0])])) ? '' : 'a feature is matched wrong';
  /* graphics, from what kind of information it is */
  const graphicFor = g => /changed/.test(g) ? 'a line graph' : /which of four|how many/.test(g) ? 'a bar graph' : /order of events|years each/.test(g) ? 'a timeline' : /where|route/.test(g) ? 'a map'
    : /parts of/.test(g) ? 'a labelled diagram' : /looked like|looks like/.test(g) ? 'a photograph' : /split|share/.test(g) ? 'a pie chart' : '';
  const GWHY = { 'a line graph': 'over time', 'a bar graph': 'compares amounts', 'a timeline': 'in order', 'a map': 'where', 'a labelled diagram': 'parts of something', 'a photograph': 'really looks like', 'a pie chart': 'parts of a whole' };
  V['g7-graphic'] = (q, m) => mk(q) === graphicFor(text(m.g)) ? '' : 'expected ' + graphicFor(text(m.g));
  V['g7-graphic-tf'] = (q, m) => { const right = graphicFor(text(m.g)) === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-graphic-why'] = (q, m) => mk(q).includes(GWHY[m.g]) ? '' : 'expected why ' + m.g + ' fits';
  V['g7-graphic-match'] = q => q.pairs.every(p => graphicFor(text(p[0])) === text(p[1])) ? '' : 'a kind of information is matched to the wrong graphic';
  /* design choices and their effects */
  const DESIGN = { 'large, bold type': 'what matters most', 'warning sign': 'signals danger', 'empty space': 'photo stand out', 'same colour for every heading': 'belong together', 'worried face': 'feel the emotion',
    'bullet points': 'quick to scan', 'arrow pointing': 'where to look', 'large, clear font': 'easier for everyone', 'smiling students': 'friendly and welcoming', 'small picture beside each step': 'fewer words' };
  const eff = d => DESIGN[Object.keys(DESIGN).find(k => text(d).includes(k))];
  V['g7-design'] = (q, m) => mk(q).includes(eff(m.d)) ? '' : 'expected ' + eff(m.d);
  V['g7-design-which'] = q => { const fits = q.options.map(o => text(q.q).includes(eff(o))); return fits.filter(Boolean).length === 1 && fits[q.answer] ? '' : 'expected the choice with that effect'; };
  V['g7-design-tf'] = (q, m) => { const right = text(m.said).includes(eff(m.d)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-design-match'] = q => q.pairs.every(p => text(p[1]).includes(eff(p[0]))) ? '' : 'a design choice is matched wrong';
  /* style: words from the snippet -> [element, words from its effect] */
  const STYLE = { 'I ran. I fell.': ['short sentences', 'tension'], 'Drip. Drip.': ['sound words', 'hear the scene'], 'We will not give up': ['repetition', 'message stick'], 'howled and clawed': ['vivid word choice', 'seem alive'],
    'Honestly?': ['a strong personal voice', 'feel real'], 'Have you ever': ['a question to the reader', 'pulls the reader'], 'past the reeds': ['a long, flowing sentence', 'slows the reader'],
    'will consider the proposal': ['formal word choice', 'serious and official'], 'like a green curtain': ['a simile', 'by comparing'], 'SO easy': ['casual, chatty words', 'friends talking'] };
  const sty = s => STYLE[Object.keys(STYLE).find(k => text(s).includes(k))];
  V['g7-style-element'] = (q, m) => mk(q) === sty(m.s)[0] ? '' : 'expected ' + sty(m.s)[0];
  V['g7-style-effect'] = (q, m) => mk(q).includes(sty(m.s)[1]) ? '' : 'expected the effect "' + sty(m.s)[1] + '"';
  V['g7-style-tf'] = (q, m) => { const right = text(m.said) === sty(m.s)[0]; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const FIT = { 'city council': 'formal word choice', 'text message': 'casual, chatty words', 'rally people': 'repetition', 'tense moment': 'short sentences' };
  V['g7-style-fit'] = (q, m) => mk(q) === FIT[Object.keys(FIT).find(k => m.f.includes(k))] ? '' : 'expected the style that suits it';
  /* point of view from the narrator's own words (speech in quotation marks does not count) */
  const povOf = s => { const all = s.replace(/“[^”]*”/g, ''); return /\b(I|my|me|We)\b/.test(all) ? 'first' : /\b(you|your)\b/i.test(all) ? 'second' : 'third'; };
  const cardText = q => card(q).lines.join(' ');
  V['g7-narrator'] = q => mk(q).startsWith(povOf(cardText(q)) + ' person') ? '' : 'expected ' + povOf(cardText(q)) + ' person';
  V['g7-evidence'] = q => { const p = povOf(cardText(q)), w = mk(q), all = cardText(q).replace(/“[^”]*”/g, '');
    return (p === 'third' ? /^(He|She|They)$/.test(w) : ({ first: 'I', second: 'You' })[p] === w) && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected the ' + p + ' person word'; };
  V['g7-pov-line'] = q => mk(q).startsWith(povOf(sent(q)) + ' person') ? '' : 'expected ' + povOf(sent(q)) + ' person';
  V['g7-pov-tf'] = (q, m) => { const right = m.said === povOf(sent(q)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* another narrator: words from what would change */
  const ALT = { 'The Tryout': 'what the coach looks for', "Grandfather's Compass": 'how the grandfather feels', 'The Night Before Diwali': "Priya's own worries", 'The Long Portage': 'how Kenji worries',
    'The Wall on the River': 'when the wells ran dry', 'Between the Posts': 'watch the goalie' };
  V['g7-alt-view'] = (q, m) => mk(q).includes(ALT[text(m.t)]) ? '' : 'expected the change in what we would learn';
})();
