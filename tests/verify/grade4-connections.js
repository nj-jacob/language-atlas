/* Grade 4 answer checks: connections (grade4/chapters/connections.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a website is credible': 'critical thinking', 'inventing a new way to tell a story': 'creativity', 'tracking your own reading goal': 'self-directed learning',
    'sharing jobs on a group project': 'collaboration', 'explaining an idea clearly': 'communication', 'learning how communities care for water': 'global citizenship', 'editing a draft on a computer': 'digital literacy' };
  V['g4-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g4-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  const SUBJ = [[/habitats/, 'Science'], [/solved a problem/, 'Math'], [/early Canada/, 'Social Studies'], [/play/, 'Drama'], [/game/, 'Phys Ed']];
  V['g4-subject'] = (q, m) => mk(q) === (SUBJ.find(([re]) => re.test(m.use)) || [])[1] ? '' : 'the subject does not fit ' + m.use;
  V['g4-everyday'] = q => H.sameSet(q.options.map((o, i) => /reading|writing|form/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing jobs are not the ones marked';
  const checkable = s => /\d|five|every (night|paragraph)/.test(s) && /week|Friday/.test(s);
  V['g4-goal'] = q => checkable(mk(q)) && q.options.filter(o => checkable(text(o))).length === 1 ? '' : mk(q) + ' cannot be checked';
})();
