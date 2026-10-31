/* Grade 7 answer checks: how texts work (grade7/chapters/how-texts.js). The checker reads the passage card itself to find its form and narrator,
   finds text patterns from signal words, and keeps its own lists of features, graphics, design choices and style elements. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); if (!p) return null;
    return { title: text(p.querySelector('.pt').innerHTML), heads: p.querySelectorAll('.psh').length, lines: [...p.querySelectorAll('p')].map(x => text(x.innerHTML)) }; };
  const FABLES = ['The Wall on the River'], POEMS = ['Thaw'];
  const formOf = c => c.heads ? 'information text' : /^by /.test(c.lines[c.lines.length - 1]) ? 'opinion piece' : FABLES.includes(c.title) ? 'fable' : POEMS.includes(c.title) ? 'poem' : 'story';
  V['g7-form'] = q => mk(q) === formOf(card(q)) ? '' : 'expected ' + formOf(card(q));
  const FORM = { fable: 'a short story with a lesson', memoir: "a true story from the writer's own life", 'opinion piece': 'argues for a position', 'news report': 'tells who, what, when',
    'oral story': 'passed down by telling', 'graphic novel': 'tells a story in panels', poem: 'uses lines, sound and images' };
  V['g7-form-match'] = q => q.pairs.every(p => text(p[1]).startsWith(FORM[text(p[0])])) ? '' : 'a form is matched wrong';
  V['g7-form-which'] = (q, m) => text(q.q).includes(FORM[mk(q)]) ? '' : 'expected the form that ' + FORM[m.f];
  const patternOf = s => /problem|solution/i.test(s) ? 'problem and solution' : /however|Both|but /.test(s) ? 'compare and contrast' : /First,|Next,|Finally,|In the morning|By noon/.test(s) ? 'time order' : /Because|As a result/.test(s) ? 'cause and effect' : null;
  V['g7-pattern'] = (q, m) => mk(q) === patternOf(text(m.s)) ? '' : 'expected ' + patternOf(text(m.s));
  const FEAT = { bibliography: 'lists the sources the writer used', glossary: 'explains key words', index: 'helps you find a topic by page', sidebar: 'adds extra information beside the main text', caption: 'explains a picture', 'accessible font': 'is clear and easy for everyone to read' };
  V['g7-feature'] = (q, m) => text(q.q).includes(FEAT[mk(q)]) ? '' : 'expected ' + m.f;
  V['g7-feature-match'] = q => q.pairs.every(p => FEAT[text(p[0])] === text(p[1])) ? '' : 'a feature is matched wrong';
  /* which graphic, from what kind of information it is */
  const graphicFor = g => /changed over/.test(g) ? 'a line graph' : /which of four/.test(g) ? 'a bar graph' : /order of events/.test(g) ? 'a timeline' : /where/.test(g) ? 'a map' : /parts of/.test(g) ? 'a labelled diagram' : /looked like/.test(g) ? 'a photograph' : null;
  V['g7-graphic'] = (q, m) => mk(q) === graphicFor(m.g) ? '' : 'expected ' + graphicFor(m.g);
  V['g7-graphic-tf'] = (q, m) => (graphicFor(m.g) === m.said) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  const DESIGN = { 'a heading in large, bold type': 'shows what matters most', 'a red box with a warning sign': 'grabs attention and signals danger', 'lots of empty space around one photo': 'makes the photo stand out',
    'the same colour for every heading': 'shows which parts belong together', 'a close-up photo of a worried face': 'makes the reader feel the emotion' };
  V['g7-design'] = (q, m) => mk(q) === DESIGN[m.d] ? '' : 'expected ' + DESIGN[m.d];
  V['g7-design-match'] = q => q.pairs.every(p => DESIGN[text(p[0])] === text(p[1])) ? '' : 'a design choice is matched wrong';
  const STYLE = { 'I ran. I fell. I got up.': ['short sentences', 'builds tension'], 'Drip. Drip. The icicles tick like clocks.': ['sound words', 'hear the scene'],
    'We will not give up. We will not back down. We will not be silent.': ['repetition', 'message stick'], 'The wind howled and clawed at the cabin.': ['vivid word choice', 'seem alive'],
    'Honestly? I was terrified, and I am not ashamed to say it.': ['a strong personal voice', 'feel real'] };
  V['g7-style-element'] = (q, m) => mk(q) === STYLE[m.s][0] ? '' : 'expected ' + STYLE[m.s][0];
  V['g7-style-effect'] = (q, m) => mk(q).includes(STYLE[m.s][1]) ? '' : 'expected the effect "' + STYLE[m.s][1] + '"';
  /* point of view from the narrator's own words (speech in quotation marks does not count) */
  const povOf = c => { const all = c.lines.join(' ').replace(/“[^”]*”/g, ''); return /\b(I|my|me)\b/.test(all) ? 'first' : /\b(you|your)\b/i.test(all) ? 'second' : 'third'; };
  V['g7-narrator'] = q => mk(q).startsWith(povOf(card(q)) + ' person') ? '' : 'expected ' + povOf(card(q)) + ' person';
  V['g7-evidence'] = q => { const p = povOf(card(q)), w = mk(q), all = card(q).lines.join(' ').replace(/“[^”]*”/g, '');
    return ({ first: 'I', second: 'You', third: 'He' })[p] === w && new RegExp('\\b' + w + '\\b', 'i').test(all) ? '' : 'expected the ' + p + ' person word'; };
  V['g7-alt-view'] = q => /grandfather feels/.test(mk(q)) ? '' : 'expected the change in what we would learn';
})();
