/* Grade 8 answer checks: media and digital literacy (grade8/chapters/media.js). Own key lists, and rules for passwords and the order of steps. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const one = (q, ok) => ok(mk(q)) && q.options.map(text).filter(ok).length === 1;
  const picks = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const tfOk = (q, right) => q.answer === right && q.why.answer === 0;
  const inOrder = (q, starts) => { const at = q.items.map(i => starts.findIndex(s => text(i).startsWith(s))); return at.every((p, i) => p >= 0 && (i === 0 || p > at[i - 1])) ? '' : 'the steps are out of order'; };

  /* digital identity and rights */
  const PROUD = /band's|mural|thank-you post|science fair|community garden|congratulating|short film|drawing you finished|food bank|with permission|book you loved|poetry reading/;
  V['g8-identity'] = q => one(q, o => PROUD.test(o)) ? '' : 'expected the post to be proud of';
  V['g8-post-tf'] = (q, m) => tfOk(q, PROUD.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-pick-proud'] = q => picks(q, o => PROUD.test(o)) ? '' : 'the posts to be proud of are not the ones marked';
  const RIGHT = /ask everyone|right to ask|screenshot can keep|can report|with their permission|privacy settings|may search|responsible for what you share/;
  V['g8-rights-tf'] = (q, m) => tfOk(q, RIGHT.test(text(m.said))) ? '' : 'true/false is wrong for ' + m.said;

  /* privacy and security. Strong: at least 16 characters, with a capital, a digit and a symbol */
  const strong = s => s.length >= 16 && /[A-Z]/.test(s) && /\d/.test(s) && /[^A-Za-z0-9]/.test(s);
  V['g8-password'] = q => one(q, strong) ? '' : 'expected the long passphrase';
  V['g8-strong-tf'] = q => tfOk(q, strong(text(q.fig))) ? '' : 'true/false is wrong for ' + text(q.fig);
  V['g8-phishing'] = q => /password/.test(text(q.fig)) && picks(q, o => /rushes|password|link does not match|threatens/.test(o)) ? '' : 'the warning signs are not the ones marked';
  const SAFE = /only while you use|^Skip it|Keep your password private|^Log out|Say no unless|Say no and tell|Take a break|Leave your security on|Do not share the code|Check that nothing shows/;
  V['g8-privacy-safe'] = q => one(q, o => SAFE.test(o)) ? '' : 'expected the safe choice';

  /* kinds of information */
  const INFO = [[/not knowing|believing/, 'misinformation'], [/fake|on purpose/, 'disinformation'], [/shows you|shows only/, 'curated information']];
  const kind = s => (INFO.find(x => x[0].test(s)) || [])[1];
  V['g8-info-kind'] = (q, m) => mk(q) === kind(text(m.s)) ? '' : 'expected ' + kind(text(m.s));
  V['g8-match-info'] = q => q.pairs.every(p => kind(text(p[0])) === text(p[1])) ? '' : 'an example is matched to the wrong kind';
  V['g8-info-tf'] = (q, m) => tfOk(q, kind(text(m.s)) === m.said) ? '' : 'true/false is wrong for ' + m.said;
  const FEEDTRUE = /algorithm chooses|different results|can change what you see|keeps you scrolling|beyond your feed|based on what you searched/;
  V['g8-feed-tf'] = (q, m) => tfOk(q, FEEDTRUE.test(text(m.said))) ? '' : 'true/false is wrong for ' + m.said;

  /* checking and fair use: the fair choice asks, credits or cites */
  const fair = s => /credit|cite|citation|permission/i.test(s);
  V['g8-ethics'] = q => one(q, fair) ? '' : 'expected the fair choice';
  V['g8-ethics-tf'] = (q, m) => tfOk(q, fair(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  V['g8-pick-ethical'] = q => picks(q, fair) ? '' : 'the fair choices are not the ones marked';
  V['g8-check-order'] = q => inOrder(q, ['Stop', 'Find out who', 'Look for', 'Decide']);

  /* persuasive techniques */
  const TECH = [[/left out|millions who|All your friends/, 'bandwagon'], [/says:/, 'testimonial'], [/^Only \d+|ends tonight|ends at midnight/, 'scarcity'],
    [/lonely|waiting for|Imagine your family/, 'emotional appeal'], [/out of 10/, 'expert statistic']];
  const tech = s => (TECH.find(x => x[0].test(s)) || [])[1];
  V['g8-technique'] = (q, m) => mk(q) === tech(text(m.s)) ? '' : 'expected ' + tech(text(m.s));
  V['g8-match-technique'] = q => q.pairs.every(p => tech(text(p[0])) === text(p[1])) ? '' : 'an ad line is matched to the wrong technique';
  V['g8-technique-tf'] = (q, m) => tfOk(q, tech(text(m.s)) === m.said) ? '' : 'true/false is wrong for ' + m.said;
  V['g8-technique-which'] = (q, m) => one(q, o => tech(o) === m.want) ? '' : 'the line marked does not use ' + m.want;

  /* audience and purpose: who each text was made for, and who else may see it */
  const AUD = { 'a joke about a teacher in a private group chat': ['the friends in the chat', 'the teacher, after someone shares a screenshot'],
    'a dance video posted for your friends': ['your friends', 'a future employer who searches your name'], 'a student council campaign poster in the hallway': ['students who will vote', 'parents visiting for a concert'],
    'a cereal ad during a Saturday cartoon': ['young children', 'parents who will be asked to buy it'], 'a complaint about the coach in a team chat': ['your teammates', 'the coach, after someone forwards it'],
    'a birthday photo posted for your cousins': ['your cousins', 'strangers, if the account is public'], "a toy commercial on a kids' channel": ['kids who watch the channel', 'grandparents shopping for gifts'],
    'a lost-cat poster on a lamppost': ['neighbours who might see the cat', 'a reporter writing about lost pets'], 'a restaurant review on a public website': ['people choosing where to eat', 'the restaurant owner'],
    'a school newsletter about the science fair': ['families at the school', 'a local newspaper editor'] };
  V['g8-audience'] = (q, m) => { const a = AUD[text(m.s)]; return a && one(q, o => o === a[m.un ? 1 : 0]) ? '' : 'the audience is wrong'; };
  V['g8-audience-match'] = q => q.pairs.every(p => AUD[text(p[0])] && AUD[text(p[0])][0] === text(p[1])) ? '' : 'a text is matched to the wrong audience';
  const PURPOSE = [[/helmet|vote|adopt/, 'to persuade'], [/weather|audio guide|new bridge/, 'to inform'], [/comedy|animated|funny podcast/, 'to entertain'], [/shoe store|pizza deal|new phone/, 'to sell']];
  const purposeOf = s => (PURPOSE.find(x => x[0].test(s)) || [])[1];
  V['g8-media-purpose'] = (q, m) => mk(q) === purposeOf(text(m.s)) ? '' : 'expected ' + purposeOf(text(m.s));
  V['g8-media-purpose-tf'] = (q, m) => tfOk(q, purposeOf(text(m.s)) === m.said) ? '' : 'true/false is wrong for ' + m.said;

  /* design */
  V['g8-design'] = q => inOrder(q, ['Understand', 'Brainstorm', 'Build', 'Test', 'Improve']);
  const TOOL = [[/ridership|rainfall/, 'chart'], [/voices|interviews/, 'podcast'], [/layout|screens of/, 'wireframe'], [/talk with pictures|results to judges/, 'slide'],
    [/how-to video|clips/, 'video editor'], [/bake sale|sign for/, 'poster']];
  const toolFor = s => (TOOL.find(x => x[0].test(s)) || [])[1];
  V['g8-design-tool'] = (q, m) => one(q, o => o.includes(toolFor(text(m.job)))) ? '' : 'expected ' + toolFor(text(m.job));
  V['g8-match-tool'] = q => q.pairs.every(p => toolFor(text(p[0])) && text(p[1]).includes(toolFor(text(p[0])))) ? '' : 'a job is matched to the wrong tool';
  const STEP = [[/what bothers them|watch how people/, 'understand'], [/list ten ideas|as many app ideas/, 'brainstorm'], [/rough first version|paper model/, 'build'],
    [/try your app|find the bus times/, 'test'], [/change the buttons|text bigger/, 'improve']];
  V['g8-design-step'] = (q, m) => { const s = STEP.find(x => x[0].test(text(m.s))); return s && mk(q).startsWith(s[1]) ? '' : 'expected ' + (s && s[1]); };

  /* respect */
  const KIND = /^(Say what you like|Invite them|Respond to their idea|Do not share it|Fix it kindly|Ask a respectful question|Hear each idea|Stand up for your teammate|Credit their work|Wait, then reply|Add text descriptions|Include people of many)/;
  V['g8-respect'] = q => one(q, o => KIND.test(o)) ? '' : 'expected the respectful choice';
  V['g8-respect-tf'] = (q, m) => tfOk(q, KIND.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
  const AWARE = /^(Learn how to say|Ask before using|Include people|Learn the greetings|Check that your images|Learn about a holiday|Ask an Elder|Use the names people choose)/;
  V['g8-aware'] = q => picks(q, o => AWARE.test(o)) ? '' : 'the right choices are not the ones marked';
  V['g8-aware-tf'] = (q, m) => tfOk(q, AWARE.test(text(m.s))) ? '' : 'true/false is wrong for ' + m.s;
})();
