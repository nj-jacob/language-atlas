/* Grade 4 answer checks: media (grade4/chapters/media.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const regret = o => /mean|without asking|angry/.test(text(o));
  V['g4-footprint'] = q => H.sameSet(q.options.map((o, i) => regret(o) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'a post to regret is marked, or a proud one is missed';
  const SAFE = [[/make an account/, /^Ask a grown-up/], [/free tablet/, /^Close it/], [/two hours/, /^Take a break/], [/teased/, /^Do not join in/], [/photo you found/, /permission/]];
  V['g4-what-to-do'] = (q, m) => { const s = SAFE.find(([re]) => re.test(m.s)); return s && s[1].test(mk(q)) ? '' : 'not the safe choice for ' + m.s; };
  const strong = p => p.length >= 10 && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
  V['g4-password'] = q => strong(mk(q)) && q.options.filter(o => strong(text(o))).length === 1 ? '' : mk(q) + ' is not the one strong password';
  const rude = s => /^[^a-z]*[A-Z]{4}[^a-z]*$|lol|Nobody/.test(s);
  V['g4-reply'] = q => !rude(mk(q)) && q.options.filter(o => !rude(text(o))).length === 1 ? '' : 'the respectful reply is not the one marked';
  const TRUE = /ALL CAPS|another language|video call/, FALSE = /screenshot of a private|would not say in person/;
  V['g4-respect-tf'] = (q, m) => (TRUE.test(m.s) ? true : FALSE.test(m.s) ? false : null) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  const CRED = /^(Environment Canada|Statistics Canada|the Métis Nation's own website|a provincial park website|a guide from a vet clinic)$/;
  V['g4-trust'] = q => CRED.test(mk(q)) && q.options.filter(o => CRED.test(text(o))).length === 1 ? '' : mk(q) + ' is not the credible source';
  V['g4-checks'] = q => H.sameSet(q.options.map((o, i) => /trusted sources|know the topic|When was/.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the useful checks are not the ones marked';
  const opinion = s => /most|best|nicest/.test(s);
  V['g4-fact-tf'] = (q, m) => !opinion(m.s) === q.answer && (q.why.answer === 0) === !opinion(m.s) ? '' : 'fact or opinion is wrong for ' + m.s;
  const TRICK = { 'Everyone has one!': 'everyone has it', 'Dentists choose it.': 'an expert says so', 'Crunch! Crunch! Crunch!': 'saying it again', 'Only today!': 'hurry, it ends soon', 'A free toy inside!': 'a free gift' };
  V['g4-technique'] = (q, m) => mk(q) === TRICK[m.line] ? '' : 'expected ' + TRICK[m.line];
  V['g4-trick-match'] = q => q.pairs.every(p => TRICK[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong trick';
  const FOR = { 'ZOOM SCOOTER': ['kids', 'to sell something'], 'Slow down near schools': ['drivers', 'to keep people safe'], 'Book swap!': ['families in town', 'to invite people to an event'], 'Did you know?': ['people curious about nature', 'to teach a fact'] };
  V['g4-ad-audience'] = (q, m) => mk(q) === FOR[m.first][0] ? '' : 'expected ' + FOR[m.first][0];
  V['g4-ad-purpose'] = (q, m) => mk(q) === FOR[m.first][1] ? '' : 'expected ' + FOR[m.first][1];
  const STEPS = ['Find the problem.', 'Brainstorm ideas.', 'Make a first version.', 'Test it with people.', 'Make it better.'];
  V['g4-design-steps'] = q => q.items.every((it, i) => text(it) === STEPS[i]) ? '' : 'the design steps are not in order';
  V['g4-next-step'] = (q, m) => mk(q) === STEPS[STEPS.indexOf(m.done) + 1] ? '' : 'that is not the next step';
})();
