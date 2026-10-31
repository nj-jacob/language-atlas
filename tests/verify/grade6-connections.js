/* Grade 6 answer checks: skills and connections (grade6/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking whether a website is reliable': 'critical thinking', 'inventing a new form for a poem': 'creativity', 'setting a reading goal and tracking it': 'self-directed learning',
    'writing a script with a group': 'collaboration', 'adjusting a talk for a younger audience': 'communication', 'reading news about climate change around the world': 'global citizenship',
    "using a word processor's tools to edit": 'digital literacy' };
  const USE = { summarizing: 'writing up a science experiment', 'reading a chart': 'understanding data in math', 'using primary sources': 'learning history in social studies',
    'following steps in order': 'cooking a recipe at home', 'persuasive writing': 'asking the school council for a change', 'listening carefully': 'learning a dance in phys ed' };
  V['g6-skill-for'] = (q, m) => mk(q) === SKILL[text(m.ex)] ? '' : 'expected ' + SKILL[text(m.ex)];
  V['g6-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g6-use-in'] = (q, m) => mk(q) === USE[m.skill] ? '' : 'expected ' + USE[m.skill];
  V['g6-use-match'] = q => q.pairs.every(p => USE[text(p[0])] === text(p[1])) ? '' : 'a skill is matched wrong';
})();
