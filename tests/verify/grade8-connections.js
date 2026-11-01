/* Grade 8 answer checks: skills and connections (grade8/chapters/connections.js). Own key lists, and an answer key for each story. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const tfOk = (q, right) => q.answer === right && q.why.answer === 0;

  /* transferable skills: the examples and situations that call for each */
  const SKILL = [[/compar(ing|e) two news|statistic is fair/, 'critical thinking'], [/podcast script|new way to show data/, 'creativity'], [/tracking your own|choosing what to study/, 'self-directed learning'],
    [/co-writing|sharing tasks fairly/, 'collaboration'], [/Grade 2 audience|clearly in a debate/, 'communication'], [/other countries|far away/, 'global citizenship'],
    [/who made a website|passwords online/, 'digital literacy']];
  const skill = s => (SKILL.find(x => x[0].test(s)) || [])[1];
  V['g8-skill-for'] = (q, m) => mk(q) === skill(text(m.ex)) ? '' : 'expected ' + skill(text(m.ex));
  V['g8-match-skill'] = q => q.pairs.every(p => skill(text(p[1])) === text(p[0])) ? '' : 'a skill is matched to the wrong example';
  const CONTEXT = [[/cannot agree|one slideshow/, 'collaboration'], [/learning English|little cousin/, 'communication'], [/claims|different dates/, 'critical thinking'],
    [/new way|fresh idea/, 'creativity'], [/no one is checking|over the summer/, 'self-directed learning'], [/other countries|by whom/, 'global citizenship'], [/home address|was edited/, 'digital literacy']];
  V['g8-context-skill'] = (q, m) => { const c = CONTEXT.find(x => x[0].test(text(m.s))); return c && mk(q) === c[1] ? '' : 'expected ' + (c && c[1]); };
  V['g8-skill-tf'] = (q, m) => tfOk(q, /^(Collaboration helps|Critical thinking helps|Communication changes|Creativity helps|Self-directed learners|Digital literacy helps)/.test(text(m.said))) ? '' : 'true/false is wrong';

  /* language in every subject */
  const SUBJ = [[/lab report|safety steps/, 'Science'], [/ratio|word problem/, 'Math'], [/1837|War of 1812/, 'History'], [/artist|painting/, 'Visual Arts'], [/trade routes|climate graph/, 'Geography'],
    [/fitness|food label/, 'Health and Physical Education'], [/lyrics|concert/, 'Music']];
  const subj = s => (SUBJ.find(x => x[0].test(s)) || [])[1];
  V['g8-subject-use'] = (q, m) => mk(q) === subj(text(m.use)) ? '' : 'expected ' + subj(text(m.use));
  V['g8-match-subject'] = q => q.pairs.every(p => subj(text(p[0])) === text(p[1])) ? '' : 'a job is matched to the wrong subject';
  V['g8-everyday'] = q => H.sameSet(q.options.map((o, i) => /^(reading|writing|comparing|filling)/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g8-carry-tf'] = (q, m) => tfOk(q, /helps|uses reading skills/.test(text(m.said))) ? '' : 'true/false is wrong';

  /* the stories, by their own answer key */
  const KEY = { 'Say It Right': { belong: /felt like hers/, theme: /family history/, past: /moved to Canada/, turn: /real name/ },
    'The Goal Call': { belong: /whole bench yelled/, theme: /team closer/, past: /too different/, turn: /goal call in the stands/ },
    'Finger Weaving': { belong: /stood a little taller/, theme: /strengthen your identity/, past: /passed down/, turn: /feeling proud/ },
    'Bread for the Hallway': { belong: /starting to feel like home/, theme: /into a community/, past: /did not know anyone/, turn: /shares his mother's bread/ },
    'Two Languages at Dinner': { belong: /signed along/, theme: /part of who you are/, past: /think her family was strange/, turn: /learn a sign/ } };
  const check = part => (q, m) => KEY[m.t] && text(q.fig).startsWith(m.t) && KEY[m.t][part].test(mk(q)) ? '' : 'the answer does not match the key for ' + m.t;
  V['g8-belong-line'] = check('belong');
  V['g8-theme'] = check('theme');
  V['g8-history'] = check('past');
  V['g8-change'] = check('turn');
})();
