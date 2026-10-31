/* Grade 3 answer checks: skills and connections (grade3/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a fact is true': 'critical thinking', 'making up a new ending for a story': 'creativity', 'setting a reading goal and checking it': 'self-directed learning',
    'planning a story with a partner': 'collaboration', 'explaining your idea clearly': 'communication', 'reading about how people care for the Earth': 'global citizenship', 'using a tablet safely to find facts': 'digital literacy' };
  const SUBJ = { 'reading the steps of an experiment': 'Science', 'reading a word problem': 'Math', 'reading a map of Ontario': 'Social Studies', 'writing a song': 'Music', 'reading the rules of a game': 'Phys Ed' };
  const WORDS = /reading|writing/;
  V['g3-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g3-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g3-subject'] = (q, m) => mk(q) === SUBJ[m.use] ? '' : 'expected ' + SUBJ[m.use];
  V['g3-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
})();
