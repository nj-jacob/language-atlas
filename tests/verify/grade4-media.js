/* Grade 4 answer checks: media (grade4/chapters/media.js). The checker keeps its own key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && (!q.why || q.why.answer === (right ? 0 : 1)) ? '' : 'true or false is wrong';
  /* ---------- what you post, and permission ---------- */
  const regret = o => /mean|without asking|angry|rumour|house number|rude/.test(text(o));
  V['g4-footprint'] = q => H.sameSet(q.options.map((o, i) => regret(o) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'a post to regret is marked, or a proud one is missed';
  V['g4-proud-tf'] = (q, m) => tf(q, !regret(m.s));
  /* someone else's face, name or work needs permission */
  const needsOk = s => /friend|song someone else|tagging|teacher's video outside/.test(text(s));
  V['g4-permission'] = (q, m) => tf(q, needsOk(m.s));
  const POSTTRUE = /save or share|digital identity|years later/;
  V['g4-post-fact'] = (q, m) => q.answer === POSTTRUE.test(m.s) ? '' : 'true/false is wrong for ' + m.s;
  /* ---------- privacy ---------- */
  const SAFE = [[/make an account/, /^Ask a grown-up/], [/free tablet/, /^Close it/], [/two hours/, /^Take a break/], [/where you live/, /^Do not answer/], [/location/, /^Ask a grown-up/],
    [/account is locked/, /^Do not reply/], [/eyes feel tired/, /^Look away/]];
  V['g4-what-to-do'] = (q, m) => { const s = SAFE.find(([re]) => re.test(m.s)); return s && s[1].test(mk(q)) ? '' : 'not the safe choice for ' + m.s; };
  const strong = p => p.length >= 10 && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
  V['g4-password'] = q => strong(mk(q)) && q.options.filter(o => strong(text(o))).length === 1 ? '' : mk(q) + ' is not the one strong password';
  V['g4-password-tf'] = (q, m) => tf(q, strong(m.pw));
  const PRIVATE = /address|full name|password|phone/;
  V['g4-private-tf'] = (q, m) => tf(q, !PRIVATE.test(m.s));
  /* ---------- respect ---------- */
  const rude = s => /^[^a-z]*[A-Z]{4}[^a-z]*$|lol|Nobody|^ur |Ugh|Who even/.test(s);
  V['g4-reply'] = q => !rude(mk(q)) && q.options.filter(o => !rude(text(o))).length === 1 ? '' : 'the respectful reply is not the one marked';
  V['g4-reply-tf'] = (q, m) => tf(q, !rude(text(m.r)));
  const TRUE = /ALL CAPS|another language|video call|include everyone|Check before you forward/, FALSE = /screenshot of a private|would not say in person|password as a joke/;
  V['g4-respect-tf'] = (q, m) => (TRUE.test(m.s) ? true : FALSE.test(m.s) ? false : null) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  const KINDDO = [[/teased/, /^Do not join in/], [/another language|language you do not know/, /^Kindly ask/], [/private chat/, /^Do not pass it on/], [/not had a turn/, /^Invite them/], [/makes you angry/, /^Wait, calm down/]];
  V['g4-respect-do'] = (q, m) => { const s = KINDDO.find(([re]) => re.test(m.s)); return s && s[1].test(mk(q)) ? '' : 'not the kind choice for ' + m.s; };
  /* ---------- sources ---------- */
  const CRED = /^(Environment Canada|Statistics Canada|the Métis Nation's own website|a provincial park website|a guide from a vet clinic|the Canadian Red Cross|the library's own website|a maple producers association)$/;
  V['g4-trust'] = q => CRED.test(mk(q)) && q.options.filter(o => CRED.test(text(o))).length === 1 ? '' : mk(q) + ' is not the credible source';
  const GOODCHECK = /trusted sources|know the topic|When was|author's name|give sources/;
  V['g4-checks'] = q => H.sameSet(q.options.map((o, i) => GOODCHECK.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the useful checks are not the ones marked';
  V['g4-check-tf'] = (q, m) => tf(q, GOODCHECK.test(text(m.c)));
  const opinion = s => /most|best|nicest|better|cuter|more fun/.test(s);
  V['g4-fact-tf'] = (q, m) => tf(q, !opinion(m.s));
  /* ---------- ad tricks ---------- */
  const TRICK = { 'Everyone has one!': 'everyone has it', 'Dentists choose it.': 'an expert says so', 'Crunch! Crunch! Crunch!': 'saying it again', 'Only today!': 'hurry, it ends soon', 'A free toy inside!': 'a free gift',
    'Hockey star Jay Lee loves it!': 'a famous person uses it', 'Be the coolest kid on the block!': 'it makes you cool', 'The best snack in the whole universe!': 'a giant promise', 'Puppy-approved and super cute!': 'a cute animal' };
  V['g4-technique'] = (q, m) => mk(q) === TRICK[m.line] ? '' : 'expected ' + TRICK[m.line];
  V['g4-trick-match'] = q => q.pairs.every(p => TRICK[text(p[0])] === text(p[1])) ? '' : 'a line is matched to the wrong trick';
  V['g4-trick-tf'] = (q, m) => q.answer === (TRICK[m.line] === m.said) ? '' : 'true/false is wrong for ' + m.line;
  const TECH = { 'bright colours': 'catch your eye', 'loud, fast music': 'make it feel exciting', 'a close-up of the food': 'make it look tasty', 'a catchy jingle': 'help you remember it',
    'happy kids playing': 'make you feel it is fun', 'a famous athlete': 'make you trust it' };
  V['g4-tech-why'] = (q, m) => mk(q) === 'to ' + TECH[m.t] ? '' : 'expected to ' + TECH[m.t];
  /* ---------- message: [audience, purpose, form] by the first line ---------- */
  const FOR = { 'ZOOM SCOOTER': ['kids who like to ride', 'to sell something', 'an ad'], 'Slow down near schools': ['drivers', 'to keep people safe', 'a road sign'],
    'Book swap!': ['families in town', 'to invite people to an event', 'a poster'], 'Did you know?': ['people curious about nature', 'to teach a fact', 'a fact card'],
    'Lost cat': ['neighbours', 'to ask for help', 'a poster'], 'Junior Lacrosse': ['parents of young players', 'to get people to join', 'a poster'],
    'SPARKLE TOOTHPASTE': ['adults who buy toothpaste', 'to sell something', 'an ad'], 'Wash your hands': ['students at Riverside', 'to keep people safe', 'a sign'] };
  V['g4-ad-audience'] = (q, m) => mk(q) === FOR[m.first][0] ? '' : 'expected ' + FOR[m.first][0];
  V['g4-ad-purpose'] = (q, m) => mk(q) === FOR[m.first][1] ? '' : 'expected ' + FOR[m.first][1];
  V['g4-ad-form'] = (q, m) => mk(q) === FOR[m.first][2] ? '' : 'expected ' + FOR[m.first][2];
  V['g4-ad-aud-tf'] = (q, m) => q.answer === (FOR[m.first][0] === m.said) ? '' : 'true/false is wrong for ' + m.said;
  /* ---------- design ---------- */
  const STEPS = ['Find the problem.', 'Brainstorm ideas.', 'Make a first version.', 'Test it with people.', 'Make it better.'];
  V['g4-design-steps'] = q => q.items.every((it, i) => text(it) === STEPS[i]) ? '' : 'the design steps are not in order';
  V['g4-next-step'] = (q, m) => mk(q) === STEPS[STEPS.indexOf(m.done) + 1] ? '' : 'that is not the next step';
  /* the step, from what was done: noticing is finding; listing or sketching is brainstorming; making or setting up is the first version;
     someone trying it is testing; changing it after is making it better */
  const stepOf = d => /^You (add|move)|bigger/.test(d) ? 4 : /tries|show the video|Everyone tries/.test(d) ? 3 : /^You (make|film|set up)/.test(d) ? 2 : /^You (list|sketch|think)/.test(d) ? 1 : 0;
  V['g4-which-step'] = (q, m) => mk(q) === STEPS[stepOf(m.did)] ? '' : 'expected ' + STEPS[stepOf(m.did)];
  V['g4-step-tf'] = (q, m) => q.answer === (STEPS[stepOf(m.did)] === m.said) ? '' : 'true/false is wrong for ' + m.did;
  const TOOL = { 'show steps with moving pictures': 'a video', 'share facts in order with pictures': 'a slide show', 'make a sign to print': 'a poster app', "count your family's votes": 'a chart or spreadsheet' };
  V['g4-tool-match'] = q => q.pairs.every(p => TOOL[text(p[0])] === text(p[1])) ? '' : 'a job is matched to the wrong tool';
})();
