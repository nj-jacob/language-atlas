/* Grade 5 answer checks: media and online life (grade5/chapters/media.js). The checker keeps its own key, like a second marker. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  /* the responsible choice asks permission, uses what you may use, or credits the creator */
  const RESPONSIBLE = /\b(Ask|permission|free to use|quotation marks)\b/;
  V['g5-permission'] = q => { const ok = q.options.map(text).filter(o => RESPONSIBLE.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the choice that asks permission'; };
  V['g5-permission-tf'] = (q, m) => { const right = RESPONSIBLE.test(text(m.choice)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* posts last, can be copied, and shape how others see you */
  const LASTS = /(stay there|screenshot|future coach|positive digital identity)/;
  V['g5-footprint'] = (q, m) => LASTS.test(m.said) === q.answer && text(q.why.options[q.why.answer]).startsWith('Posts can be copied') ? '' : 'true/false is wrong for ' + m.said;
  V['g5-identity'] = q => { const ok = q.options.map(text).filter(o => /(mural|kind comment|paper crane|thanking)/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the positive post'; };
  /* private data could help a stranger find you or get into your account */
  const PRIVATE = /(address|password|birthday|phone number|school's name|location|front of your house)/;
  V['g5-private'] = q => H.sameSet(q.options.map((o, i) => PRIVATE.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the private data are not the ones marked';
  V['g5-private-tf'] = (q, m) => { const right = !PRIVATE.test(text(m.item)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  /* strong: at least 12 characters, with a number and a symbol */
  const strong = p => p.length >= 12 && /\d/.test(p) && /[^A-Za-z0-9]/.test(p);
  V['g5-password'] = q => { const ok = q.tiles.map(text).filter(strong); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the strong password'; };
  const SAFE = { 'A stranger in a game asks where you live.': 'Do not answer', 'A website asks for your birthday before you can play.': 'Ask a grown-up', 'Your best friend asks for your password.': 'Keep it private',
    'An app wants to know your location all the time.': 'Turn location off', 'A message says you won a prize and must click a link.': 'Do not click' };
  V['g5-privacy-act'] = (q, m) => mk(q).startsWith(SAFE[text(m.s)]) ? '' : 'expected "' + SAFE[text(m.s)] + '"';
  /* respect: the kind, curious reply to each post */
  const KIND = { 'I made bannock for the first time!': 'How did you make it', 'Here is my science fair project.': 'hardest part', 'I am learning to speak Tagalog.': 'teach me a word', 'Our team lost the final.': 'played hard',
    "I drew my family's dog.": "dog's name", 'We celebrate Diwali this week!': 'Happy Diwali', 'I wrote my first poem.': 'Thanks for sharing', 'I use a wheelchair, and I just tried sledge hockey!': 'How did it feel',
    'My grandpa taught me some Cree words.': 'What does one of them mean', 'I finished my first 5 km run!': 'Way to go' };
  V['g5-reply'] = (q, m) => mk(q).includes(KIND[text(m.post)]) ? '' : 'expected the respectful reply';
  V['g5-reply-tf'] = (q, m) => { const right = text(m.said).includes(KIND[text(m.post)]); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-face-test'] = (q, m) => mk(q).startsWith(text(m.said).includes(KIND[text(m.post)]) ? 'Yes' : 'No') ? '' : 'expected the face test answer for ' + m.said;
  const GROUP = { 'A classmate in your online group has not said anything yet.': 'Ask what they think', 'Someone posts a mean comment about a classmate.': 'Do not join in', 'Your group disagrees about the topic.': 'Listen to each idea',
    'A new student joins your class chat.': 'Welcome them', 'A friend shares a rumour about someone.': 'Do not pass it on' };
  V['g5-group'] = (q, m) => mk(q).startsWith(GROUP[text(m.s)]) ? '' : 'expected "' + GROUP[text(m.s)] + '"';
  /* checking: good checks test the source, the date or other sources */
  const GOODCHECK = /^(See if trusted|Check who wrote|Look for facts|Look for the date|Ask a librarian|Check if an expert)/;
  V['g5-check'] = q => H.sameSet(q.options.map((o, i) => GOODCHECK.test(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the good checks are not the ones marked';
  V['g5-check-tf'] = (q, m) => { const right = GOODCHECK.test(text(m.s)); return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-credible'] = q => { const ok = q.options.map(text).filter(o => /(Government|museum|names its writers|university)/.test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the credible source'; };
  const CAREFUL = { 'A website says candy is good for your teeth. A candy company made it.': 'wants to sell candy', 'A video says one brand of sneakers makes you faster. That brand paid for the video.': 'paid for it',
    'A review says a hotel is perfect. The hotel owner wrote it.': 'wants guests', 'A gamer says a new game is the best ever. The game company pays her to play it.': 'paid to say so',
    'A science museum website says monarchs fly to Mexico.': 'experts made it' };
  V['g5-slant'] = (q, m) => mk(q).includes(CAREFUL[text(m.s)]) ? '' : 'expected "' + CAREFUL[text(m.s)] + '"';
  /* ad techniques */
  const TECH = { 'Everyone at school has one. Do not be left out!': 'everyone is doing it', 'Join the thousands of kids who already play Galaxy Quest!': 'everyone is doing it', 'All your friends are wearing Snap Bands. Are you?': 'everyone is doing it',
    'Hockey star Jada Moore drinks Zoom Juice!': 'a famous person', 'Olympic swimmer Mei Tanaka loves Splash Shampoo!': 'a famous person', 'Pop star Leo Grant never leaves home without Beat Buds.': 'a famous person',
    'Only $9.99, but only for today!': 'hurry, it will run out', 'Last chance! The sale ends tonight!': 'hurry, it will run out', 'Only 50 left. Get yours now!': 'hurry, it will run out',
    'Crunchy, munchy, Choco-Bunchy!': 'a catchy rhyme', 'Snack attack? Grab a Zap Snack!': 'a catchy rhyme', 'Feeling slow? Have a Go-Go!': 'a catchy rhyme',
    '9 out of 10 kids love it!': 'a number that sounds impressive', 'Dentists say it cleans 3 times better!': 'a number that sounds impressive', '100% more fun than before!': 'a number that sounds impressive' };
  const WHY = { 'everyone is doing it': 'left out', 'a famous person': 'be like them', 'hurry, it will run out': 'before you think', 'a catchy rhyme': 'remember the name', 'a number that sounds impressive': 'sounds proven' };
  V['g5-technique'] = (q, m) => mk(q) === TECH[m.ad] ? '' : 'expected ' + TECH[m.ad];
  V['g5-tech-tf'] = (q, m) => { const right = TECH[m.ad] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g5-match-tech'] = q => q.pairs.every(p => TECH[text(p[0])] === text(p[1])) ? '' : 'an ad is matched to the wrong technique';
  V['g5-tech-why'] = (q, m) => mk(q).includes(WHY[m.t]) ? '' : 'expected the reason with "' + WHY[m.t] + '"';
  /* audience and purpose */
  const AUD = { 'a cereal ad during a cartoon': ['young children', 'to sell cereal'], 'a poster about a flu shot clinic': ['families', 'to inform about health'], 'a trailer for a new movie': ['people who like movies', 'to get people to see the movie'],
    'a town sign about a park clean-up': ['neighbours', 'to get people to help'], 'a video game commercial': ['video game players', 'to sell a game'], 'a bus schedule at the stop': ['bus riders', 'to give the times'],
    'a museum website about dinosaurs': ['people curious about dinosaurs', 'to teach about dinosaurs'], 'a poster for a school bake sale': ['students and parents', 'to raise money'],
    'a news report about a snowstorm': ["people in the storm's path", 'to warn about the weather'], 'a library flyer for a reading club': ['kids who like to read', 'to get kids to join'] };
  V['g5-media-audience'] = (q, m) => mk(q) === AUD[m.m][0] ? '' : 'expected ' + AUD[m.m][0];
  V['g5-media-purpose'] = (q, m) => mk(q) === AUD[m.m][1] ? '' : 'expected ' + AUD[m.m][1];
  V['g5-match-media'] = q => q.pairs.every(p => AUD[text(p[0])][1] === text(p[1])) ? '' : 'a media text is matched to the wrong purpose';
  const FORM = { 'remind bus riders of new times': 'bus stop', 'get teens to try a new game': 'online video', 'tell families about a flu clinic': 'poster at the school', 'warn drivers about ice on the road': 'road sign',
    'share a class trip with grandparents': 'slideshow', 'get neighbours to a clean-up on Saturday': 'mailbox' };
  V['g5-form-for'] = (q, m) => mk(q).includes(FORM[m.want]) ? '' : 'expected the form with "' + FORM[m.want] + '"';
})();
