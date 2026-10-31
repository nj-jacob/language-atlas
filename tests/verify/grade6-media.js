/* Grade 6 answer checks: media and online life (grade6/chapters/media.js). Own lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const set = (q, re) => H.sameSet(q.options.map((o, i) => (re.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);
  V['g6-private'] = q => set(q, /address|password|exact location|birth date/) ? '' : 'the private data is not what is marked';
  const BEST = { 'A free game asks to see your location and contacts.': /^Say no/, 'A message says you won a phone. Click the link to claim it!': /^Do not click/,
    'A classmate asks you to share a funny photo of another student.': /without that student's permission/, 'Someone in a game chat keeps sending you mean messages.': /^Block them/, 'You need a new password.': /long passphrase/ };
  V['g6-what-to-do'] = (q, m) => BEST[m.s].test(mk(q)) ? '' : 'expected the safe choice';
  /* a post harms when it mocks, rants, or shares someone without asking */
  const harms = p => /making fun|angry rant|without asking/.test(p);
  V['g6-footprint'] = (q, m) => mk(q) === (harms(text(m.p)) ? 'harms' : 'helps') ? '' : 'wrong for ' + m.p;
  const RESPECT = { 'In a class video call, someone shares a tradition from their culture.': /^Thank them/, 'Your group chat makes a plan but leaves out a new student.': /^Invite/, 'Someone in the chat is still learning English.': /^Be patient/ };
  V['g6-respectful'] = (q, m) => RESPECT[m.s].test(mk(q)) ? '' : 'expected the respectful choice';
  V['g6-warn'] = q => set(q, /no author|pop-up|spelling mistakes|ALL CAPS/) ? '' : 'the warning signs are not the ones marked';
  V['g6-trust'] = q => set(q, /expert|sources listed|updated recently/) ? '' : 'the good signs are not the ones marked';
  /* the best first check always looks at other trusted sources or the original */
  V['g6-check-claim'] = q => { const fit = q.options.map(text).filter(o => /trusted|first appeared|government site/.test(o)); return fit.length === 1 && mk(q) === fit[0] ? '' : 'expected checking other sources'; };
  V['g6-likes'] = (q, m) => /still be false/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  const TECH = { 'Everyone is getting one!': 'bandwagon', 'A famous hockey player holds the drink.': 'a celebrity', 'Only 2 days left!': 'a limited-time offer', 'The camera zooms in on a crying face.': 'a close-up shot', 'Happy music plays over the ad.': 'upbeat music' };
  const EFFECT = { bandwagon: 'makes you want to fit in', 'a celebrity': 'makes you trust it because you like the star', 'a limited-time offer': 'makes you hurry before you think', 'a close-up shot': 'makes you feel strong emotion', 'upbeat music': 'makes the product feel fun' };
  V['g6-technique'] = (q, m) => mk(q) === TECH[m.ex] ? '' : 'expected ' + TECH[m.ex];
  V['g6-tech-match'] = q => q.pairs.every(p => EFFECT[text(p[0])] === text(p[1])) ? '' : 'a technique is matched wrong';
  const AUD = t => /cartoon cereal/.test(t) ? 'children' : /seat belts/.test(t) ? 'drivers and passengers' : /seniors/.test(t) ? 'older adults' : /animated movie/.test(t) ? 'families with children' : null;
  V['g6-audience'] = (q, m) => mk(q) === AUD(text(m.text)) ? '' : 'expected ' + AUD(text(m.text));
  V['g6-design-order'] = q => q.items.map(text).map(t => t.split(' ')[0]).join(' ') === 'Define Brainstorm Build Test Improve' ? '' : 'the design steps are out of order';
  const TOOL = { 'make slides for a talk': 'presentation software', 'record an interview': 'a voice recorder app', 'plan a video shot by shot': 'a storyboard', 'collect survey answers from classmates': 'an online form' };
  V['g6-tool-for'] = (q, m) => mk(q) === TOOL[m.task] ? '' : 'expected ' + TOOL[m.task];
})();
