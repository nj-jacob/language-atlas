/* Grade 7 answer checks: reading for meaning (grade7/chapters/reading.js). Comprehension answers come from a passage, so the checker keeps its own
   answer key (like a second marker) and checks that the evidence it expects is really in the passage shown. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/[’]/g, "'"), mk = q => text(H.marked(q) || '');
  const card = q => { const d = document.createElement('div'); d.innerHTML = q.fig || ''; const p = d.querySelector('.psg'); return p ? text(p.innerHTML) : ''; };
  /* question -> [answer, evidence words in the passage] */
  const FACT = { 'What do trucks bring in on the ice roads?': ['fuel, food and building supplies', 'fuel, food and building supplies'], 'How must goods come when there is no ice road?': ['by plane', 'come by plane'],
    'Why is the ice road season getting shorter?': ['Winters are warmer.', 'Warmer winters'], 'How many players would make the team?': ['twelve', 'Only twelve'], "What hit the narrator's ankle?": ['the loose lace', 'lace whipped against my ankle'],
    "Where did Arjun's grandfather move?": ['into a care home', 'into a care home'], 'What team did Arjun join?': ['the robotics team', 'robotics team'], 'What does the goalie watch?': ["the forward's eyes", 'watch her eyes'],
    'What would solve the worry about skipping class?': ['a sign-in sheet', 'sign-in sheet would solve'], 'What did the upper village build?': ['a wall across the river', 'built a wall'] };
  V['g7-fact'] = (q, m) => { const f = FACT[text(m.q)]; return f && mk(q) === f[0] && card(q).includes(f[1]) ? '' : 'expected ' + (f && f[0]); };
  V['g7-find-line'] = (q, m) => { const f = FACT[text(m.q)], ok = q.options.map(text).filter(o => o.includes(f[1])); return ok.length === 1 && mk(q) === ok[0] ? '' : 'the sentence with the evidence is not the one marked'; };
  V['g7-fact-tf'] = (q, m) => { const f = FACT[text(m.q)]; return (text(m.said) === f[0]) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong'; };
  /* tie word in its sentence -> what it refers to */
  const TIE = { 'They|They link many': 'the winter roads', 'them|Without them': 'the ice roads', 'As a result|As a result, in some': 'the ice forming later and melting sooner',
    'he|Each morning, he held': 'Arjun', 'it|no longer needed to hold it': 'the compass', 'that|would solve that': 'the worry that students will skip class' };
  V['g7-tie'] = (q, m) => { const k = Object.keys(TIE).find(x => { const [w, s] = x.split('|'); return w === m.w && text(m.s).includes(s); }); return k && mk(q) === TIE[k] && card(q).includes(text(m.s)) ? '' : 'expected ' + (k && TIE[k]); };
  const MAIN = { 'Roads Made of Ice': 'warmer winters are shortening', 'Our School Needs a Quiet Room': 'so the school should have one', 'The Tryout': 'stumbles at a tryout but keeps running' };
  V['g7-main'] = (q, m) => mk(q).includes(MAIN[m.t]) ? '' : 'expected the main idea about "' + MAIN[m.t] + '"';
  V['g7-main-tf'] = (q, m) => (text(m.said).includes(MAIN[m.t])) === q.answer && q.why.answer === (q.answer ? 0 : 1) ? '' : 'true/false is wrong';
  /* supporting details: the checker's own list, and each must be backed by words in the passage */
  const DETAIL = { 'Roads Made of Ice': [['Trucks bring in fuel, food and supplies.', 'bring in fuel'], ['The ice now forms later and melts sooner.', 'forms later and melts sooner']],
    'Our School Needs a Quiet Room': [['Noise makes it hard for some students to focus.', 'hard to focus'], ['A sign-in sheet would stop students from skipping class.', 'sign-in sheet']] };
  V['g7-details'] = (q, m) => { const d = DETAIL[m.t]; if (!d.every(x => card(q).includes(x[1]))) return 'a supporting detail is not in the passage';
    return H.sameSet(q.options.map((o, i) => d.some(x => x[0] === text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the supporting details are not the ones marked'; };
  const CONCLUDE = { 'Roads Made of Ice': 'pay more to get supplies', 'Our School Needs a Quiet Room': 'more welcoming' };
  V['g7-conclude'] = (q, m) => mk(q).includes(CONCLUDE[m.t]) ? '' : 'expected the supported conclusion';
  V['g7-predict'] = (q, m) => m.t === 'The Tryout' && mk(q) === 'The loose lace will cause trouble.' && card(q).includes('lace kept slipping loose') && !card(q).includes('whipped') ? '' : 'expected the prediction from the clue';
  V['g7-check-prediction'] = q => mk(q).includes('lace whipped against my ankle') ? '' : 'expected the sentence where the lace causes trouble';
  const FIX = { muskeg: 'Look it up', 'long description': 'Picture it', 'chapter is not over': 'Read ahead', 'main point': 'Ask yourself a question', 'know nothing about': 'Check another source' };
  const fixFor = s => Object.keys(FIX).find(k => s.includes(k));
  V['g7-monitor'] = (q, m) => mk(q).startsWith(FIX[fixFor(text(m.s))]) ? '' : 'expected ' + FIX[fixFor(text(m.s))];
  V['g7-monitor-match'] = q => q.pairs.every(p => text(p[1]).startsWith(FIX[fixFor(text(p[0]))])) ? '' : 'a problem is matched to the wrong strategy';
  const PURPOSE = { Iqaluit: 'memoir', 'bike tire': 'step-by-step', 'both sides': 'each side', 'funny story': 'humorous', 'Treaty 9': 'by First Nations creators' };
  V['g7-purpose'] = (q, m) => { const k = Object.keys(PURPOSE).find(x => m.p.includes(x)); return mk(q).includes(PURPOSE[k]) ? '' : 'expected the ' + PURPOSE[k] + ' text'; };
})();
