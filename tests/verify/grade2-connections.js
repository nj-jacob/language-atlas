/* Grade 2 answer checks: skills and connections (grade2/chapters/connections.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const SKILL = { 'asking "Is this true?"': 'critical thinking', 'checking if a fact makes sense': 'critical thinking', 'drawing a new cover for a book': 'creativity', 'making up a new ending': 'creativity',
    'choosing a book to read on my own': 'self-directed learning', 'setting a reading goal': 'self-directed learning', 'writing a list with a partner': 'collaboration', 'sharing jobs in a group': 'collaboration',
    'telling my idea clearly': 'communication', 'listening and then answering': 'communication', 'reading about caring for the Earth': 'global citizenship', 'learning about kids in other countries': 'global citizenship',
    'using a tablet safely': 'digital literacy', 'searching for facts with a grown-up': 'digital literacy' };
  const SUBJ = { 'reading a thermometer chart': 'Science', 'reading a math story problem': 'Math', 'reading a map of our town': 'Social Studies', 'singing the words of a song': 'Music', 'reading the rules of a game': 'Phys Ed',
    'labelling the parts of a plant': 'Science', 'writing a number sentence': 'Math', 'writing about a community helper': 'Social Studies', 'reading the lines in a class play': 'Drama', 'writing the title of my painting': 'Art' };
  const WORDS = /reading|writing/;
  const one = (q, fits) => { const ok = q.options.map(text).filter(fits); return ok.length === 1 && mk(q) === ok[0]; };
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);

  V['g2-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g2-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  V['g2-skill-shows'] = (q, m) => one(q, o => SKILL[o] === m.skill) ? '' : 'expected the example of ' + m.skill;
  V['g2-skill-tf'] = (q, m) => tfOk(q, SKILL[m.ex] === m.said) ? '' : 'expected ' + (SKILL[m.ex] === m.said);
  V['g2-subject'] = (q, m) => mk(q) === SUBJ[m.use] ? '' : 'expected ' + SUBJ[m.use];
  V['g2-everyday'] = q => H.sameSet(q.options.map((o, i) => (WORDS.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g2-use-match'] = q => q.pairs.every(p => SUBJ[text(p[0])] === text(p[1])) ? '' : 'a job is matched to the wrong subject';
  V['g2-daily-one'] = q => one(q, o => WORDS.test(o)) ? '' : 'expected the one that uses reading or writing';
  V['g2-daily-tf'] = (q, m) => tfOk(q, WORDS.test(m.x)) ? '' : 'expected ' + WORDS.test(m.x);
})();
