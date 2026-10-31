/* Grade 7 answer checks: skills and connections (grade7/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking whether a viral claim is true before sharing it': 'critical thinking and problem solving', 'designing a new way to reduce lunchroom waste': 'innovation, creativity and entrepreneurship',
    'setting a goal to read 20 minutes a day and tracking it': 'self-directed learning', 'editing a group report together in a shared document': 'collaboration',
    'adjusting a talk for younger students so they understand it': 'communication', 'writing to council about protecting a local wetland': 'global citizenship and sustainability',
    'using privacy settings and citing images in a slideshow': 'digital literacy' };
  const USE = { 'writing the conclusion of a science lab report': 'summarizing the main idea', 'researching a history project on Confederation': 'checking sources for bias',
    'understanding a geography chart of rainfall': 'reading graphs and diagrams', 'applying for a summer job': 'persuasive writing', 'reading a new word in a math problem': 'using context clues',
    "following a coach's instructions at practice": 'active listening' };
  V['g7-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g7-skill-match'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g7-use-for'] = (q, m) => mk(q) === USE[text(m.task)] ? '' : 'expected ' + USE[text(m.task)];
  V['g7-use-match'] = q => q.pairs.every(p => USE[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong task';
})();
