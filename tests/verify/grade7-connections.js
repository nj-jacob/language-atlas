/* Grade 7 answer checks: skills and connections (grade7/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const C = 'critical thinking and problem solving', I = 'innovation, creativity and entrepreneurship', S = 'self-directed learning', T = 'collaboration', M = 'communication',
    G = 'global citizenship and sustainability', D = 'digital literacy';
  const SKILL = { 'checking whether a viral claim is true before sharing it': C, 'comparing two news reports to find what each leaves out': C, 'working out why the class garden keeps flooding': C,
    'designing a new way to reduce lunchroom waste': I, 'starting a small dog-walking business': I, 'inventing a board game that teaches fractions': I,
    'setting a goal to read 20 minutes a day and tracking it': S, 'reviewing notes before a test without being asked': S, 'finding a tutorial to teach yourself to code': S,
    'editing a group report together in a shared document': T, 'splitting up jobs fairly in a group project': T, "building on a teammate's idea in a discussion": T,
    'adjusting a talk for younger students so they understand it': M, 'writing a clear, polite email to a coach': M, 'using pauses and eye contact in a speech': M,
    'writing to council about protecting a local wetland': G, 'organizing a clothing swap to cut waste': G, 'raising money for the local food bank': G,
    'using privacy settings and citing images in a slideshow': D, 'spotting a fake account before following it': D, 'choosing the right app to record a podcast': D };
  const USE = { 'writing the conclusion of a science lab report': 'summarizing the main idea', 'researching a history project on Confederation': 'checking sources for bias',
    'understanding a geography chart of rainfall': 'reading graphs and diagrams', 'applying for a summer job': 'persuasive writing', 'working out a new word in a math problem': 'using context clues',
    "following a coach's instructions at practice": 'active listening', 'learning from a guest speaker in social studies': 'taking notes while listening',
    'explaining the steps of a science experiment': 'writing a clear procedure', 'deciding whether to buy something you saw in an ad': 'spotting persuasive techniques',
    'emailing a teacher about a missed test': 'using a formal tone', "planning a report on Canada's regions": 'organizing notes under headings',
    'finding a hiking route in a provincial park': 'reading a map key', 'presenting a science fair project': 'giving a clear oral presentation', 'building a model from a kit': 'reading instructions slowly and carefully' };
  V['g7-skill-for'] = (q, m) => mk(q) === SKILL[text(m.ex)] ? '' : 'expected ' + SKILL[text(m.ex)];
  V['g7-skill-example'] = (q, m) => SKILL[mk(q)] === m.skill && q.tiles.map(text).filter(t => SKILL[t] === m.skill).length === 1 ? '' : 'expected the example of ' + m.skill;
  V['g7-skill-match'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g7-skill-tf'] = (q, m) => { const right = SKILL[text(m.ex)] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g7-use-for'] = (q, m) => mk(q) === USE[text(m.task)] ? '' : 'expected ' + USE[text(m.task)];
  V['g7-use-where'] = (q, m) => USE[mk(q)] === m.skill && q.tiles.map(text).filter(t => USE[t] === m.skill).length === 1 ? '' : 'expected where ' + m.skill + ' helps';
  V['g7-use-match'] = q => q.pairs.every(p => USE[text(p[1])] === text(p[0])) ? '' : 'a skill is matched to the wrong task';
  V['g7-use-tf'] = (q, m) => { const right = USE[text(m.task)] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
