/* Grade 3 answer checks: skills and connections (grade3/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a fact is true': 'critical thinking', 'asking if an ad tells the whole story': 'critical thinking', "finding a clue that explains a character's choice": 'critical thinking',
    'making up a new ending for a story': 'creativity', 'inventing a word for a poem': 'creativity', 'drawing a new cover for a book': 'creativity',
    'setting a reading goal and checking it': 'self-directed learning', 'choosing a book to read on your own': 'self-directed learning', 'checking your own writing before you hand it in': 'self-directed learning',
    'planning a story with a partner': 'collaboration', 'sharing the jobs in a group project': 'collaboration', 'taking turns in a book club': 'collaboration',
    'explaining your idea clearly': 'communication', 'giving a short talk to the class': 'communication', 'writing a clear note to a friend': 'communication',
    'reading about how people care for the Earth': 'global citizenship', 'learning how kids in another country go to school': 'global citizenship', 'writing a letter about keeping a lake clean': 'global citizenship',
    'using a tablet safely to find facts': 'digital literacy', 'making a slideshow for a project': 'digital literacy', 'keeping your password private': 'digital literacy' };
  const SUBJ = { 'reading the steps of an experiment': 'Science', 'labelling the parts of a plant': 'Science', 'writing what you saw in a science journal': 'Science',
    'reading a word problem': 'Math', 'explaining how you solved a problem': 'Math', 'reading the title of a graph': 'Math', 'reading a map of Ontario': 'Social Studies',
    'reading about life long ago': 'Social Studies', 'writing about your community': 'Social Studies', 'writing a song': 'Music', 'reading the words of a song': 'Music',
    'reading the rules of a game': 'Phys Ed', 'reading a fitness chart': 'Phys Ed', 'reading a food label': 'Health', 'writing a title for your painting': 'Art' };
  const WORDS = /reading|writing|filling in/;
  V['g3-skill-for'] = (q, m) => mk(q) === SKILL[text(m.ex)] && q.options.map(text).filter(o => o === SKILL[text(m.ex)]).length === 1 ? '' : 'expected ' + SKILL[text(m.ex)];
  V['g3-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g3-pick-skill'] = (q, m) => H.sameSet(q.options.map((o, i) => SKILL[text(o)] === m.skill ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the examples of ' + m.skill + ' are not the ones marked';
  V['g3-skill-tf'] = (q, m) => (SKILL[text(m.ex)] === m.skill) === q.answer ? '' : 'true/false is wrong for ' + m.ex;
  V['g3-subject'] = (q, m) => mk(q) === SUBJ[m.use] ? '' : 'expected ' + SUBJ[m.use];
  V['g3-match-subject'] = q => q.pairs.every(p => SUBJ[text(p[0])] === text(p[1])) ? '' : 'a job is matched to the wrong subject';
  V['g3-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g3-everyday-tf'] = (q, m) => WORDS.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
})();
