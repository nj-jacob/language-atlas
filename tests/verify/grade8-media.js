/* Grade 8 answer checks: media and digital literacy (grade8/chapters/media.js). Own key lists, and rules for passwords and the order of steps. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, re) => { const ok = q.options.map(text).filter(o => re.test(o)); return ok.length === 1 && re.test(mk(q)) ? '' : 'expected the one answer that fits'; };
  const pickAll = (q, re) => H.sameSet(q.options.map((o, i) => re.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the right choices are not the ones marked';
  const inOrder = (q, starts) => { const at = q.items.map(i => starts.findIndex(s => text(i).startsWith(s))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the steps are out of order'; };

  V['g8-identity'] = q => one(q, /band|mural|thank-you|science fair/);
  V['g8-rights-tf'] = (q, m) => /ask everyone|right to ask/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g8-phishing'] = q => /enter your password/.test(text(q.fig)) ? pickAll(q, /rushes|password|link does not match|threatens/) : 'the scam message is missing';
  /* strong: at least 16 characters, with a capital, a digit and a symbol */
  const strong = s => s.length >= 16 && /[A-Z]/.test(s) && /\d/.test(s) && /[^A-Za-z0-9]/.test(s);
  V['g8-password'] = q => q.options.map(text).filter(strong).length === 1 && strong(mk(q)) ? '' : 'expected the long passphrase';

  const INFO = [[/not knowing|believing/, 'misinformation'], [/fake|on purpose/, 'disinformation'], [/shows you|shows only/, 'curated information']];
  const kind = s => (INFO.find(x => x[0].test(s)) || [])[1];
  V['g8-info-kind'] = (q, m) => mk(q) === kind(m.s) ? '' : 'expected ' + kind(m.s);
  V['g8-match-info'] = q => q.pairs.every(p => kind(text(p[0])) === text(p[1])) ? '' : 'an example is matched to the wrong kind';
  V['g8-check-order'] = q => inOrder(q, ['Stop', 'Find out who', 'Look for', 'Decide']);
  V['g8-ethics'] = q => one(q, /credit|cite the source/);
  V['g8-feed-tf'] = (q, m) => /algorithm chooses|different results/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';

  const TECH = [[/left out|everyone/i, 'bandwagon'], [/says:/, 'testimonial'], [/only \d+ left|ends tonight/i, 'scarcity'], [/lonely|waiting for you/, 'emotional appeal'], [/out of 10/, 'expert statistic']];
  const tech = s => (TECH.find(x => x[0].test(s)) || [])[1];
  V['g8-technique'] = (q, m) => mk(q) === tech(m.s) ? '' : 'expected ' + tech(m.s);
  V['g8-match-technique'] = q => q.pairs.every(p => tech(text(p[0])) === text(p[1])) ? '' : 'an ad line is matched to the wrong technique';
  /* the unintended audience is someone who sees it after it travels beyond its makers' plan */
  const AUD = { 'a joke about a teacher in a private group chat': [/friends in the chat/, /teacher, after/], 'a dance video posted for your friends': [/^your friends$/, /employer/],
    'a student council campaign poster in the hallway': [/vote/, /parents visiting/], 'a cereal ad during a Saturday cartoon': [/young children/, /parents who/] };
  V['g8-audience'] = (q, m) => AUD[m.s] && AUD[m.s][m.un ? 1 : 0].test(mk(q)) ? '' : 'the audience is wrong';
  const PURPOSE = [[/helmet/, 'to persuade'], [/weather/, 'to inform'], [/comedy/, 'to entertain'], [/store sale/, 'to sell']];
  V['g8-media-purpose'] = (q, m) => { const p = PURPOSE.find(x => x[0].test(m.s)); return p && mk(q) === p[1] ? '' : 'expected ' + (p && p[1]); };

  V['g8-design'] = q => inOrder(q, ['Understand', 'Brainstorm', 'Build', 'Test', 'Improve']);
  const TOOL = [[/ridership/, 'chart'], [/voices/, 'podcast'], [/layout/, 'wireframe'], [/talk/, 'slide']];
  V['g8-match-tool'] = q => q.pairs.every(p => { const t = TOOL.find(x => x[0].test(text(p[0]))); return t && text(p[1]).includes(t[1]); }) ? '' : 'a job is matched to the wrong tool';
  V['g8-respect'] = q => one(q, /^(Say what you like|Invite them|Respond to their idea|Do not share it)/);
  V['g8-aware'] = q => pickAll(q, /^(Learn how to say|Ask before using|Include people)/);
})();
