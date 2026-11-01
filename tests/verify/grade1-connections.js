/* Grade 1 answer checks: skills and connections (grade1/chapters/connections.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a story could really happen': 'thinking carefully', 'making up a new ending for a story': 'being creative', 'picking a book and reading it by myself': 'learning on my own',
    'building a story with a partner': 'working together', 'telling my idea clearly': 'communicating', 'reading about how to help the Earth': 'caring for the world', 'using a tablet safely to find a fact': 'using technology well',
    'working out a tricky word': 'thinking carefully', 'drawing a picture for my poem': 'being creative', 'fixing my own spelling': 'learning on my own', 'taking turns reading with a friend': 'working together',
    'reading my writing to the class': 'communicating', 'making a sign to save water': 'caring for the world', 'typing a short note with a grown-up': 'using technology well' };
  const USE = { 'reading the steps of an experiment': 'Science', 'reading a number story': 'Math', 'reading a map of our town': 'Social Studies', 'singing the words of a song': 'Music', 'reading the rules of a game': 'Phys Ed',
    'writing what the plant looks like each day': 'Science', 'writing the numbers on a graph': 'Math', 'reading about how people lived long ago': 'Social Studies', 'reading the words of a chant': 'Music',
    'reading the steps of a new stretch': 'Phys Ed' };
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const WORDS = /reading|writing/, NOWORDS = /^(sleeping|brushing my teeth|jumping on one foot|hugging my dog|swinging on a swing|eating an apple)$/;
  V['g1-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g1-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  V['g1-subject'] = (q, m) => mk(q) === USE[m.use] ? '' : 'expected ' + USE[m.use];
  V['g1-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g1-skill-tf'] = (q, m) => { const right = SKILL[m.ex] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-pick-skill'] = (q, m) => H.sameSet(q.options.map((o, i) => SKILL[text(o)] === m.skill ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the examples of ' + m.skill + ' are not the ones marked';
  V['g1-everyday-tf'] = (q, m) => { const right = WORDS.test(m.w); return (right || NOWORDS.test(m.w)) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-match-subject'] = q => q.pairs.every(p => USE[text(p[0])] === text(p[1])) ? '' : 'a use is matched to the wrong subject';
})();
