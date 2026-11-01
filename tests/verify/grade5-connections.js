/* Grade 5 answer checks: skills and connections (grade5/chapters/connections.js). The checker keeps its own key, like a second marker. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const SKILL = { 'checking whether a website is reliable': 'critical thinking', 'asking whose voice is missing from a story': 'critical thinking', 'inventing a new ending for a story': 'creativity',
    'drawing a comic to explain the water cycle': 'creativity', 'setting a goal to read 20 minutes a day and tracking it': 'self-directed learning', 'choosing a strategy when you get stuck reading': 'self-directed learning',
    'planning a group presentation and sharing the jobs': 'collaboration', "building on a classmate's idea in a group talk": 'collaboration', 'paraphrasing directions for a younger student': 'communication',
    'speaking clearly so the back row can hear': 'communication', 'writing a letter about protecting wetlands': 'global citizenship', "learning a greeting in a classmate's language": 'global citizenship',
    'checking the privacy settings on a class blog': 'digital literacy', 'naming the website where you found a photo': 'digital literacy' };
  V['g5-skill-for'] = (q, m) => mk(q) === SKILL[text(m.ex)] ? '' : 'expected ' + SKILL[text(m.ex)];
  V['g5-match-skill'] = q => q.pairs.every(p => SKILL[text(p[1])] === text(p[0])) ? '' : 'a skill is matched wrong';
  V['g5-skill-example'] = (q, m) => { const ok = q.options.map(text).filter(o => SKILL[o] === m.s); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the example of ' + m.s; };
  V['g5-skill-tf'] = (q, m) => { const right = SKILL[text(m.ex)] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  const USE = { 'writing up a science experiment': ['Science', 'putting steps in order'], 'reading a word problem twice': ['Math', 'monitoring your understanding'], 'comparing two accounts of an event': ['Social Studies', 'spotting perspective and bias'],
    'writing the words for a song': ['Music', 'choosing vivid words'], "explaining a game's rules to a team": ['Phys Ed', 'speaking clearly'], 'labelling a diagram of a plant': ['Science', 'using the right subject words'],
    'reading a map legend': ['Social Studies', 'using text features'], 'writing about the choices in your painting': ['Visual Arts', 'explaining your choices'], 'learning the steps of a dance': ['Dance', 'listening for directions'],
    'explaining how you solved a math problem': ['Math', 'giving reasons for each step'], 'researching an animal for a report': ['Science', 'checking that sources are reliable'], 'performing a scene in a play': ['Drama', 'reading with expression'] };
  V['g5-subject'] = (q, m) => mk(q) === USE[text(m.use)][0] ? '' : 'expected ' + USE[text(m.use)][0];
  V['g5-lang-skill'] = (q, m) => mk(q) === USE[text(m.use)][1] ? '' : 'expected ' + USE[text(m.use)][1];
  /* reading or writing happens when there are words: labels, schedules, messages, recipes, signs, forms */
  const WORDS = /^(reading|checking|writing|comparing|following a recipe|texting|filling in)/;
  V['g5-everyday'] = q => H.sameSet(q.options.map((o, i) => WORDS.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the reading and writing times are not the ones marked';
  V['g5-daily-tf'] = (q, m) => { const right = WORDS.test(text(m.act)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
