/* Grade 8 answer checks: skills and connections (grade8/chapters/connections.js). Own key lists, and an answer key for the story. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const SKILL = [[/compar(ing|e) two news/, 'critical thinking'], [/podcast script/, 'creativity'], [/tracking your own/, 'self-directed learning'], [/co-writing/, 'collaboration'],
    [/Grade 2 audience/, 'communication'], [/other countries/, 'global citizenship'], [/who made a website/, 'digital literacy']];
  const skill = s => (SKILL.find(x => x[0].test(s)) || [])[1];
  V['g8-skill-for'] = (q, m) => mk(q) === skill(m.ex) ? '' : 'expected ' + skill(m.ex);
  V['g8-match-skill'] = q => q.pairs.every(p => skill(text(p[1])) === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  const CONTEXT = [[/cannot agree/, 'collaboration'], [/learning English/, 'communication'], [/claims/, 'critical thinking'], [/new way/, 'creativity']];
  V['g8-context-skill'] = (q, m) => { const c = CONTEXT.find(x => x[0].test(m.s)); return c && mk(q) === c[1] ? '' : 'expected ' + (c && c[1]); };
  V['g8-skill-tf'] = (q, m) => /^(Collaboration helps|Critical thinking helps)/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const SUBJ = [[/lab report/, 'Science'], [/ratio/, 'Math'], [/1837/, 'History'], [/artist/, 'Visual Arts'], [/map/, 'Geography'], [/fitness/, 'Health and Physical Education']];
  const subj = s => (SUBJ.find(x => x[0].test(s)) || [])[1];
  V['g8-subject-use'] = (q, m) => mk(q) === subj(m.use) ? '' : 'expected ' + subj(m.use);
  V['g8-match-subject'] = q => q.pairs.every(p => subj(text(p[0])) === text(p[1])) ? '' : 'a job is matched to the wrong subject';
  V['g8-everyday'] = q => H.sameSet(q.options.map((o, i) => /^(reading|writing|comparing)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g8-carry-tf'] = (q, m) => /helps/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  /* the story, by its own answer key */
  const KEY = { 'g8-belong-line': /felt like hers/, 'g8-theme': /family history/, 'g8-history': /moved to Canada/, 'g8-change': /real name/ };
  for (const k in KEY) V[k] = q => /Say It Right/.test(text(q.fig)) && KEY[k].test(mk(q)) ? '' : 'the answer does not match the key';
})();
