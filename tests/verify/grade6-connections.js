/* Grade 6 answer checks: skills and connections (grade6/chapters/connections.js). Own lists. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  const SKILL = { 'checking whether a website is reliable': 'critical thinking', 'comparing two news reports about the same event': 'critical thinking', 'asking whose voice is missing from a story': 'critical thinking',
    'inventing a new form for a poem': 'creativity', 'imagining a new ending for a story': 'creativity', 'turning a report into a comic': 'creativity',
    'setting a reading goal and tracking it': 'self-directed learning', 'choosing your next book on your own': 'self-directed learning', 'checking your writing against a list before handing it in': 'self-directed learning',
    'writing a script with a group': 'collaboration', 'sharing jobs fairly on a group poster': 'collaboration', "building on a partner's idea in a discussion": 'collaboration',
    'adjusting a talk for a younger audience': 'communication', 'using gestures to make a point clear': 'communication', 'writing clear steps for a recipe': 'communication',
    'reading news about climate change around the world': 'global citizenship', "learning greetings in a classmate's home language": 'global citizenship', 'writing a letter about protecting a local river': 'global citizenship',
    "using a word processor's tools to edit": 'digital literacy', 'checking the privacy settings on an app': 'digital literacy', 'making a slide show for a talk': 'digital literacy' };
  const USE = { summarizing: 'writing up a science experiment', 'reading a chart': 'understanding data in math', 'using primary sources': 'learning history in social studies',
    'following steps in order': 'cooking a recipe at home', 'persuasive writing': 'asking the school council for a change', 'listening carefully': 'learning a dance in phys ed',
    'taking notes': 'studying for a science test', 'reading word problems slowly': 'solving problems in math', 'speaking clearly': 'giving directions to a visitor',
    'writing a formal letter': 'applying to be a library volunteer', 'checking sources': 'finding facts for a geography project', 'using precise words': 'describing how you feel to a doctor',
    'reading a map legend': 'planning a hike', 'asking clarifying questions': "understanding a coach's new play" };
  V['g6-skill-for'] = (q, m) => mk(q) === SKILL[text(m.ex)] ? '' : 'expected ' + SKILL[text(m.ex)];
  V['g6-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g6-skill-tf'] = (q, m) => tf(q, SKILL[text(m.ex)] === m.said);
  V['g6-skill-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => SKILL[text(o)] === m.skill ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the examples marked are not ' + m.skill;
  V['g6-use-in'] = (q, m) => mk(q) === USE[m.skill] ? '' : 'expected ' + USE[m.skill];
  V['g6-use-match'] = q => q.pairs.every(p => USE[text(p[0])] === text(p[1])) ? '' : 'a skill is matched wrong';
  V['g6-use-tf'] = (q, m) => tf(q, USE[m.skill] === text(m.said));
  V['g6-skill-needed'] = (q, m) => { const fit = q.options.map(text).filter(o => USE[o] === text(m.use)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected the skill for ' + m.use; };
})();
