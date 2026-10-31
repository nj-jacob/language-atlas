/* Grade 1 answer checks: skills and connections (grade1/chapters/connections.js). The checker keeps its own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a story could really happen': 'thinking carefully', 'making up a new ending for a story': 'being creative', 'picking a book and reading it by myself': 'learning on my own',
    'building a story with a partner': 'working together', 'telling my idea clearly': 'communicating', 'reading about how to help the Earth': 'caring for the world', 'using a tablet safely to find a fact': 'using technology well' };
  const USE = { 'reading the steps of an experiment': 'Science', 'reading a number story': 'Math', 'reading a map of our town': 'Social Studies', 'singing the words of a song': 'Music', 'reading the rules of a game': 'Phys Ed' };
  const WORDS = /reading|writing/;
  V['g1-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g1-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  V['g1-subject'] = (q, m) => mk(q) === USE[m.use] ? '' : 'expected ' + USE[m.use];
  V['g1-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
})();
