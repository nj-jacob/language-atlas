/* Grade 4 answer checks: connections (grade4/chapters/connections.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = { 'checking if a website is credible': 'critical thinking', 'inventing a new way to tell a story': 'creativity', 'tracking your own reading goal': 'self-directed learning',
    'sharing jobs on a group project': 'collaboration', 'explaining an idea clearly': 'communication', 'learning how communities care for water': 'global citizenship', 'editing a draft on a computer': 'digital literacy',
    'asking if an ad tells the whole truth': 'critical thinking', 'designing a cover for your story': 'creativity', 'choosing what to practise next on your own': 'self-directed learning',
    'taking turns in a group discussion': 'collaboration', 'giving a short talk to your class': 'communication', 'learning about kids in another country': 'global citizenship', 'saving your work in the right folder': 'digital literacy' };
  V['g4-skill-for'] = (q, m) => mk(q) === SKILL[m.ex] ? '' : 'expected ' + SKILL[m.ex];
  V['g4-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  V['g4-skill-tf'] = (q, m) => q.answer === (SKILL[m.ex] === m.said) ? '' : 'true/false is wrong for ' + m.ex;
  V['g4-skill-example'] = (q, m) => SKILL[mk(q)] === m.skill && q.options.filter(o => SKILL[text(o)] === m.skill).length === 1 ? '' : 'expected the example of ' + m.skill;
  const SUBJ = [[/habitats|plant/, 'Science'], [/solved a problem|word problem/, 'Math'], [/early Canada|regions/, 'Social Studies'], [/play|skit/, 'Drama'], [/game|running/, 'Phys Ed']];
  const subj = u => (SUBJ.find(([re]) => re.test(text(u))) || [])[1];
  V['g4-subject'] = (q, m) => mk(q) === subj(m.use) ? '' : 'the subject does not fit ' + m.use;
  V['g4-use-match'] = q => q.pairs.every(p => subj(p[0]) === text(p[1])) ? '' : 'a job is matched to the wrong subject';
  const WORDS = /reading|writing|form|texting/;
  V['g4-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing jobs are not the ones marked';
  V['g4-daily-tf'] = (q, m) => q.answer === WORDS.test(m.s) ? '' : 'true/false is wrong for ' + m.s;
  /* a goal you can check says how much (a number) and when (this week, by Friday) */
  const checkable = s => /\d|\b(one|two|three|five|ten|twice)\b/.test(s) && /this week|by Friday/.test(s);
  V['g4-goal'] = q => checkable(mk(q)) && q.options.filter(o => checkable(text(o))).length === 1 ? '' : mk(q) + ' cannot be checked';
  V['g4-goal-fix'] = q => checkable(mk(q)) && q.options.filter(o => checkable(text(o))).length === 1 ? '' : 'expected the clear goal';
  V['g4-goal-tf'] = (q, m) => q.answer === checkable(m.s) && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong for ' + m.s;
  V['g4-goal-pick'] = q => H.sameSet(q.options.map((o, i) => checkable(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the goals you can check are not the ones marked';
})();
