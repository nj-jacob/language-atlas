/* Grade 6 answer checks: media and online life (grade6/chapters/media.js). Own lists and rules. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tf = (q, right) => q.answer === right && q.why.answer === (right ? 0 : 1) ? '' : 'true/false is wrong';
  const set = (q, re) => H.sameSet(q.options.map((o, i) => (re.test(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);
  const only = (q, ok) => { const fit = q.options.map(text).filter(ok); return fit.length === 1 && mk(q) === fit[0]; };

  /* privacy: data that could find you or be used to pretend to be you */
  const PRIV = /address|password|exact location|birth date|phone number|name of your school|health card|house number/;
  V['g6-private'] = q => set(q, PRIV) ? '' : 'the private data is not what is marked';
  V['g6-priv-tf'] = (q, m) => tf(q, !PRIV.test(m.x));
  const BEST = { 'A free game asks to see your location and contacts.': /^Say no/, 'A message says you won a phone. Click the link to claim it!': /^Do not click/,
    'You need a new password.': /long passphrase/, 'A website asks for your full name and address to enter a contest.': /^Ask a grown-up/,
    'Someone you met in a game asks to meet in person.': /^Say no, and tell/, 'A pop-up says your device has a virus. Call this number now!': /^Close it/,
    'A friend asks for your password to help you level up.': /^Keep it private/, 'An app asks to use the microphone all the time.': /^Say no unless/ };
  V['g6-what-to-do'] = (q, m) => only(q, o => BEST[m.s].test(o)) ? '' : 'expected the safe choice';
  V['g6-safe-tf'] = (q, m) => tf(q, BEST[m.s].test(text(m.did)));

  /* identity: a post harms when it mocks, rants, exposes or shares someone without asking */
  const harms = p => /making fun|angry rant|without asking|loser|secret|unkind|rumour|private chat/.test(p);
  V['g6-footprint'] = (q, m) => mk(q) === (harms(text(m.p)) ? 'harms' : 'helps') ? '' : 'wrong for ' + m.p;
  V['g6-foot-pick'] = q => H.sameSet(q.options.map((o, i) => harms(text(o)) ? -1 : i).filter(i => i >= 0), q.answer) ? '' : 'the helpful posts are not the ones marked';
  const PERMIT = { "A classmate asks you to share a funny photo of another student.": /without that student's permission/, 'You want to post a photo of your hockey team.': /^Ask everyone/,
    'You find a great picture online for your project.': /credit the creator/, 'A friend posts a video of you that you do not like.': /^Ask them kindly/,
    'Your cousin wants to post your drawing on their page.': /It is your work/ };
  V['g6-permission'] = (q, m) => only(q, o => PERMIT[text(m.s)].test(o)) ? '' : 'expected the choice that respects permission';
  const IDTRUE = new Set(['Deleted posts can still be saved by others.', 'What you post now can be seen years later.', 'People have a right to say no to a photo of them being posted.',
    'Your digital identity is built from what you and others post about you.']);
  V['g6-id-tf'] = (q, m) => tf(q, IDTRUE.has(m.s));

  /* respect: the checker's own key for each situation, and its own list of respectful comments */
  const RESPECT = { 'In a class video call, someone shares a tradition from their culture.': /^Thank them/, 'Your group chat makes a plan but leaves out a new student.': /^Invite/,
    'Someone in the chat is still learning English.': /^Be patient/, 'A classmate posts art you do not like.': /specific you notice/, 'Someone posts in French, and you only read English.': /translator/,
    'A teammate makes a mistake in an online game.': /no worries/, 'People in a chat are teasing someone about their accent.': /^Stand up/, "You disagree with a friend's post about a movie.": /politely/ };
  V['g6-respectful'] = (q, m) => only(q, o => RESPECT[text(m.s)].test(o)) ? '' : 'expected the respectful choice';
  V['g6-respect-tf'] = (q, m) => tf(q, RESPECT[text(m.s)].test(text(m.did)));
  V['g6-respect-match'] = q => q.pairs.every(p => RESPECT[text(p[0])].test(text(p[1]))) ? '' : 'a situation is matched to the wrong response';
  const KIND = new Set(['Great colours in your painting!', 'Thanks for sharing your tradition.', 'I see it differently, but I like your point.', 'Want to join our group?', 'Nice try, you almost had it!', 'Congratulations on your win!']);
  V['g6-kind-pick'] = q => H.sameSet(q.options.map((o, i) => KIND.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the respectful comments are not the ones marked';

  /* checking information */
  V['g6-warn'] = q => set(q, /no author|pop-up|spelling mistakes|ALL CAPS|no way to reach|looks odd/) ? '' : 'the warning signs are not the ones marked';
  V['g6-trust'] = q => set(q, /expert|sources listed|updated recently|clear way to contact|known museum|match other/) ? '' : 'the good signs are not the ones marked';
  /* the best first check always looks at other trusted sources or the original */
  V['g6-check-claim'] = q => only(q, o => /trusted|first appeared|government site|encyclopedia/.test(o)) ? '' : 'expected checking other sources';
  const FACTTRUE = new Set(['A post can have a million likes and still be false.', 'Photos can be edited to show things that never happened.', 'Checking two or three trusted sources is a good habit.',
    'A website can look professional and still be wrong.']);
  V['g6-likes'] = (q, m) => FACTTRUE.has(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';

  /* techniques: the checker's own key of examples and effects */
  const TECH = { 'Everyone is getting one!': 'bandwagon', 'Join the millions of kids who love it!': 'bandwagon', 'A famous hockey player holds the drink.': 'a celebrity', 'A pop star smiles and wears the shoes.': 'a celebrity',
    'Only 2 days left!': 'a limited-time offer', 'Sale ends at midnight!': 'a limited-time offer', 'The camera zooms in on a crying face.': 'a close-up shot', 'The camera moves in close to a dripping ice cream cone.': 'a close-up shot',
    'Happy music plays over the ad.': 'upbeat music', 'A catchy, cheerful song plays the whole time.': 'upbeat music', 'Fresh! Fresh! Always fresh!': 'repetition', 'The brand name is said five times in the ad.': 'repetition',
    'Bright neon colours flash across the screen.': 'bright colours', 'The box is covered in rainbow colours.': 'bright colours', 'A messy room is spotless after one spray.': 'before and after',
    'Dull hair turns shiny in the next shot.': 'before and after' };
  const EFFECT = { bandwagon: 'makes you want to fit in', 'a celebrity': 'makes you trust it because you like the star', 'a limited-time offer': 'makes you hurry before you think', 'a close-up shot': 'makes you feel strong emotion',
    'upbeat music': 'makes the product feel fun', repetition: 'makes you remember the name', 'bright colours': 'grabs your attention', 'before and after': 'makes the product seem to work like magic' };
  V['g6-technique'] = q => mk(q) === TECH[text(q.fig)] ? '' : 'expected ' + TECH[text(q.fig)];
  V['g6-tech-match'] = q => q.pairs.every(p => EFFECT[text(p[0])] === text(p[1])) ? '' : 'a technique is matched wrong';
  V['g6-tech-tf'] = (q, m) => tf(q, TECH[text(q.fig)] === m.said);
  V['g6-tech-pick'] = (q, m) => H.sameSet(q.options.map((o, i) => TECH[text(o)] === m.tech ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the ads marked are not the ' + m.tech + ' ones';

  /* audience and purpose from what the text is */
  const AUD = t => /cartoon cereal/.test(t) ? 'children' : /seat belts/.test(t) ? 'drivers and passengers' : /seniors/.test(t) ? 'older adults' : /animated movie/.test(t) ? 'families with children'
    : /teen coding/.test(t) ? 'teenagers' : /diapers/.test(t) ? 'parents of babies' : /hiking trail/.test(t) ? 'hikers' : /university/.test(t) ? 'high school students'
    : /garden centre/.test(t) ? 'gardeners' : /bus route/.test(t) ? 'bus riders' : null;
  const AIM = t => /cereal/.test(t) ? 'to sell cereal' : /seat belts|bears/.test(t) ? 'to keep people safe' : /yoga|coding club/.test(t) ? 'to get people to join' : /movie/.test(t) ? 'to get people to see the movie'
    : /diapers/.test(t) ? 'to sell diapers' : /university/.test(t) ? 'to get people to apply' : /garden centre/.test(t) ? 'to sell plants' : /bus route/.test(t) ? 'to inform people of a change' : null;
  V['g6-audience'] = (q, m) => mk(q) === AUD(text(m.text)) ? '' : 'expected ' + AUD(text(m.text));
  V['g6-aud-tf'] = (q, m) => tf(q, AUD(text(m.text)) === m.said);
  V['g6-aud-match'] = q => q.pairs.every(p => AUD(text(p[0])) === text(p[1])) ? '' : 'a media text is matched to the wrong audience';
  V['g6-media-purpose'] = (q, m) => only(q, o => AIM(text(m.text)) === o) ? '' : 'expected ' + AIM(text(m.text));

  /* design: the checker's own order of steps and its own sort of design activities */
  const STEPS = ['Define', 'Brainstorm', 'Build', 'Test', 'Improve'];
  V['g6-design-order'] = q => q.items.map(text).map(t => t.split(' ')[0]).join(' ') === STEPS.join(' ') ? '' : 'the design steps are out of order';
  const stepOf = s => /^(Decide who|Write down the problem)/.test(s) ? 'Define' : /^(Sketch|List every way)/.test(s) ? 'Brainstorm' : /^(Make the first|Film the first)/.test(s) ? 'Build'
    : /^(Show the poster|Watch a friend)/.test(s) ? 'Test' : /^(Make the title bigger|Cut the slow)/.test(s) ? 'Improve' : null;
  V['g6-design-step'] = (q, m) => mk(q) === stepOf(text(m.s)) ? '' : 'expected ' + stepOf(text(m.s));
  V['g6-step-tf'] = (q, m) => tf(q, stepOf(text(m.s)) === m.said);
  const TOOL = { 'make slides for a talk': 'presentation software', 'record an interview': 'a voice recorder app', 'plan a video shot by shot': 'a storyboard', 'collect survey answers from classmates': 'an online form',
    'edit a photo for a poster': 'a photo editor', 'write a report with a partner at the same time': 'a shared document', 'show where places are in your neighbourhood': 'a mapping tool',
    'make a chart of survey results': 'a spreadsheet', 'draw a comic': 'a drawing app' };
  V['g6-tool-for'] = (q, m) => mk(q) === TOOL[m.task] ? '' : 'expected ' + TOOL[m.task];
})();
