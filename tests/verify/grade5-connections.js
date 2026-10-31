/* Grade 5 answer checks: skills and connections (grade5/chapters/connections.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking whether a website is reliable': 'critical thinking', 'inventing a new ending for a story': 'creativity', 'setting a goal to read 20 minutes a day and tracking it': 'self-directed learning',
    'planning a group presentation and sharing the jobs': 'collaboration', 'paraphrasing directions for a younger student': 'communication', 'writing a letter about protecting wetlands': 'global citizenship',
    'checking the privacy settings on a class blog': 'digital literacy' };
  V['g5-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g5-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  const USE = { 'writing up a science experiment': ['Science', 'putting steps in order'], 'reading a word problem twice': ['Math', 'monitoring your understanding'], 'comparing two accounts of an event': ['Social Studies', 'spotting perspective and bias'],
    'writing the words for a song': ['Music', 'choosing vivid words'], "explaining a game's rules to a team": ['Phys Ed', 'speaking clearly'] };
  V['g5-subject'] = (q, m) => mk(q) === USE[text(m.use)][0] ? '' : 'expected ' + USE[text(m.use)][0];
  V['g5-lang-skill'] = (q, m) => mk(q) === USE[text(m.use)][1] ? '' : 'expected ' + USE[text(m.use)][1];
  V['g5-everyday'] = q => H.sameSet(q.options.map((o, i) => /^(reading|checking|writing|comparing)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
})();
