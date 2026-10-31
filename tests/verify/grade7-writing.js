/* Grade 7 answer checks: writing and publishing (grade7/chapters/writing.js). Own keys: which sentence opens and closes each paragraph,
   the tone each form needs, fair and unfair generalizations, the checker's own error list, and which design choices help. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const TOPIC = ['Our town should build a skateboard park.', 'Winter ice roads are a lifeline for many northern communities.', 'Volunteering helps teens as much as it helps others.'];
  const CLOSE = ['A skateboard park would make our town safer for everyone.', 'Protecting these roads matters to thousands of people.', 'Giving time is one of the best ways to grow.'];
  V['g7-para-order'] = q => { const t = q.items.map(text); return TOPIC.includes(t[0]) && CLOSE.includes(t[t.length - 1]) && TOPIC.indexOf(t[0]) === CLOSE.indexOf(t[t.length - 1]) ? '' : 'topic sentence first and conclusion last'; };
  V['g7-topic-sentence'] = q => TOPIC.includes(mk(q)) && q.options.map(text).filter(o => TOPIC.includes(o)).length === 1 ? '' : 'expected the topic sentence';
  const TONE = { 'a science report': 'The water boiled after six minutes', 'a personal blog about a camping trip': 'Honestly, the first night', 'a thank-you letter to a coach': 'Thank you for believing', 'a persuasive speech': 'Imagine a school' };
  V['g7-tone'] = (q, m) => mk(q).startsWith(TONE[m.f]) ? '' : 'expected the sentence with the right tone';
  const VOICED = /terrified|comes alive|never forget/;
  V['g7-voice'] = q => VOICED.test(mk(q)) && q.options.map(text).filter(o => VOICED.test(o)).length === 1 ? '' : 'expected the sentence with a personal voice';
  /* unfair generalizations about a group use these words */
  const SWEEP = /\b(Everyone knows|Only|never|know nothing)\b/;
  V['g7-own-bias'] = q => { const ok = q.options.map(text).filter(o => !SWEEP.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the fairer sentence'; };
  V['g7-reader-feel'] = q => /unfairly judged/.test(mk(q)) ? '' : 'expected that the reader may feel judged';
  const ALL = [].concat(TOPIC, CLOSE, ['Right now, skaters use parking lots, which is unsafe.', 'A park would give them a safe place to practise.', 'Trucks use them to bring in fuel and food.',
    'Without them, supplies must be flown in at a high cost.', 'Teens learn skills like teamwork and planning.', 'They also meet people from different backgrounds.']);
  V['g7-cut'] = (q, m) => { const d = document.createElement('div'); d.innerHTML = q.fig; const lines = [...d.querySelectorAll('p')].map(p => text(p.innerHTML)), off = lines.filter(l => !ALL.includes(l));
    return off.length === 1 && mk(q) === off[0] ? '' : 'expected the off-topic sentence'; };
  const LINK = { 'Skaters use parking lots.': 'As a result,', 'Many teens volunteer.': 'For example,', 'Ice roads are useful.': 'However,', 'We collected the data and made a graph.': 'Finally,' };
  V['g7-transition'] = (q, m) => mk(q) === LINK[m.a] ? '' : 'expected ' + LINK[m.a];
  /* the checker's own error list: wrong sentence -> kind of error */
  const ERR = { 'There team won the final game.': 'spelling', 'The coach said “Great work, everyone.”': 'punctuation', 'Each of the players have a new jersey.': 'grammar', 'We travelled to ottawa in February.': 'capitalization',
    'The museum was to crowded to see much.': 'spelling', 'Leila and me finished the project.': 'grammar' };
  V['g7-no-error'] = q => { const ok = q.options.map(text).filter(o => !ERR[o]); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the sentence with no errors'; };
  V['g7-error-kind'] = (q, m) => mk(q) === ERR[text(m.s)] ? '' : 'expected ' + ERR[text(m.s)];
  V['g7-error-pick'] = q => H.sameSet(q.options.map((o, i) => ERR[text(o)] ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the sentences with errors are not the ones marked';
  V['g7-checker-tf'] = (q, m) => /can miss/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const HELP = { 'help readers find each section of a report': 'clear headings', 'explain what a photo shows': 'a caption under the photo', 'make slides easy to follow during a talk': 'a few words and one picture per slide', 'make a poster readable from across the room': 'large, high-contrast text' };
  const HELPS = Object.values(HELP);
  V['g7-technique'] = (q, m) => mk(q) === HELP[m.g] ? '' : 'expected ' + HELP[m.g];
  V['g7-tech-match'] = q => q.pairs.every(p => HELP[text(p[0])] === text(p[1])) ? '' : 'a goal is matched wrong';
  V['g7-pub-pick'] = q => H.sameSet(q.options.map((o, i) => HELPS.includes(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the helpful choices are not the ones marked';
  V['g7-pub-tf'] = (q, m) => /a few words/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
})();
