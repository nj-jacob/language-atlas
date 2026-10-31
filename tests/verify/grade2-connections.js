/* Grade 2 answer checks: skills and connections (grade2/chapters/connections.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const SKILL = { 'asking "Is this true?"': 'critical thinking', 'drawing a new cover for a book': 'creativity', 'choosing a book to read on my own': 'self-directed learning',
    'writing a list with a partner': 'collaboration', 'telling my idea clearly': 'communication', 'reading about caring for the Earth': 'global citizenship', 'using a tablet safely': 'digital literacy' };
  const SUBJ = { 'reading a thermometer chart': 'Science', 'reading a math story problem': 'Math', 'reading a map of our town': 'Social Studies', 'singing the words of a song': 'Music', 'reading the rules of a game': 'Phys Ed' };
  const WORDS = /reading|writing/;

  V['g2-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g2-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  V['g2-subject'] = (q, m) => mk(q) === SUBJ[m.use] ? '' : 'expected ' + SUBJ[m.use];
  V['g2-everyday'] = q => H.sameSet(q.options.map((o, i) => (WORDS.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
})();
