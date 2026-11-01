/* Grade 2 answer checks: media and online life (grade2/chapters/media.js). The checker keeps its own lists of what is safe, kind and trusted. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PRIVATE = new Set(['where I live', 'my password', 'my phone number', 'a photo of my house', 'the name of my school', 'my full name', 'when my family is away', 'my street name']);
  const SAFE = /tell a grown-up|^Ask a grown-up first/i;
  const WHO = { 'You want to post a photo of your friend.': 'your friend', "You want to use your sister's tablet.": 'your sister', 'You want to copy a drawing you found online for your poster.': 'a grown-up',
    'You want to download a new game.': 'a grown-up', 'You want to share a video your cousin made.': 'your cousin', 'You want to use music from a website in your slideshow.': 'a grown-up',
    "You want to read your brother's messages.": 'your brother', 'You want to put your class photo online.': 'your teacher' };
  const ASKS = /^(Ask |Is it okay if I|May I|Can I|Could I)/;
  const KIND = new Set(['Nice work on your volcano!', 'I like your idea.', 'Can I help you with that part?', 'You can play with us!', 'Great job on your drawing.', 'Thanks for sharing.',
    'That was a funny joke!', "Let's take turns.", 'Your story made me smile.', 'Want to work together?',
    'Maybe try a darker colour?', 'I have a different idea. Can I share it?', 'Can I have a turn to talk?', 'Take your time. I can wait.', 'I need a little space right now.', 'Mistakes are okay. Try again!']);
  const TRUSTED = new Set(['a science centre website about bats', 'a library book about the moon', 'your teacher', 'a zoo website about polar bears', 'a museum website about dinosaurs', 'a doctor',
    'a park ranger', 'an atlas of Canada', 'a weather website from the government', 'a book by a bee scientist']);
  const CHECK = new Set(['Who made it?', 'How do they know?', 'Is it trying to sell me something?']);
  const HAS = { 'a poster': 'a big title and a picture', 'an ad': 'wants you to buy something', 'a video': 'moving pictures and sound', 'a menu': 'lists food and prices', 'a map': 'shows where places are',
    'a podcast': 'voices and sound, no pictures', 'a comic': 'pictures in boxes and speech bubbles', 'a sign': 'a few words to read quickly' };
  /* what a sample is from, by its clues */
  const from = x => (/\$\d/.test(x) && /Pancakes/.test(x) ? 'a menu' : /^Buy /.test(x) ? 'an ad' : /^Press play/.test(x) ? 'a video' : /You are here/.test(x) ? 'a map' : /^Welcome to .* Talk/.test(x) ? 'a podcast' :
    /^\w+: ".*" \w+: "/.test(x) ? 'a comic' : /^[A-Z]+$/.test(x) ? 'a sign' : /^[A-Z ]+!/.test(x) ? 'a poster' : '');
  /* each ad, by its first line: what it sells and its big promise */
  const ADS = { 'NEW! Sparkle Sneakers!': ['the sneakers', 'They make you run SO fast!'], 'Choco Crunch Cereal!': ['the cereal', 'Every bowl makes you a superstar!'], 'Zoom Bike 3000': ['the bike', 'It will never get a flat tire!'],
    'Fizzy Pop!': ['the drink', 'Drink it and you will never feel tired!'], 'Robo Pup Toy': ['the toy', 'The only friend you will ever need!'], 'Comfy Mitts': ['the mittens', 'Your hands will NEVER get cold!'] };
  const PROMISES = new Set(Object.values(ADS).map(a => a[1]));
  const STAGES = ['Plan', 'Make', 'Test', 'Improve'];
  const STEP = { 'Mei asks: what do people need to know?': 'Plan', 'Kai sketches ideas for his poster.': 'Plan', 'Ava draws the sign.': 'Make', 'Omar types the words on a tablet.': 'Make',
    'Noor shows her sign to her dad.': 'Test', 'Ben asks a friend to try his map.': 'Test', 'Leila makes the letters bigger so people can read them.': 'Improve', 'Theo fixes the arrow that pointed the wrong way.': 'Improve' };
  const DESIGN = 'Plan: what is the problem?|Make it.|Test it with someone.|Make it better.';
  const picks = (q, fits) => H.sameSet(q.options.map((o, i) => (fits(text(o)) ? i : -1)).filter(i => i >= 0), q.answer);
  const one = (q, fits) => { const ok = q.options.map(text).filter(fits); return ok.length === 1 && mk(q) === ok[0]; };
  const tfOk = (q, yes) => q.answer === yes && q.why.answer === (yes ? 0 : 1);

  /* private */
  V['g2-private'] = q => picks(q, o => PRIVATE.has(o)) ? '' : 'the private things are not the ones marked';
  V['g2-what-to-do'] = q => one(q, o => SAFE.test(o)) ? '' : 'expected the safe choice';
  V['g2-private-one'] = q => one(q, o => !PRIVATE.has(o)) ? '' : 'expected the one thing safe to share';
  V['g2-private-tf'] = (q, m) => tfOk(q, !PRIVATE.has(m.x)) ? '' : 'expected ' + !PRIVATE.has(m.x);
  /* ask first */
  V['g2-ask-first'] = q => one(q, o => ASKS.test(o)) ? '' : 'expected asking first';
  V['g2-ask-who'] = (q, m) => mk(q) === WHO[text(m.s)] ? '' : 'expected ' + WHO[text(m.s)];
  V['g2-ask-words'] = q => one(q, o => ASKS.test(o)) ? '' : 'expected the words that ask';
  V['g2-media-ask-tf'] = (q, m) => tfOk(q, ASKS.test(text(m.did))) ? '' : 'expected ' + ASKS.test(text(m.did));
  /* kind */
  V['g2-kind-comment'] = q => one(q, o => KIND.has(o)) ? '' : 'expected the kind comment';
  V['g2-kind-pick'] = q => picks(q, o => KIND.has(o)) ? '' : 'the kind choices are not the ones marked';
  V['g2-media-kind-tf'] = (q, m) => tfOk(q, KIND.has(text(m.x))) ? '' : 'expected ' + KIND.has(text(m.x));
  V['g2-kind-fix'] = q => one(q, o => KIND.has(o)) ? '' : 'expected the kinder way';
  /* trust */
  V['g2-trust'] = q => one(q, o => TRUSTED.has(o)) ? '' : 'expected the trusted source';
  V['g2-trust-tf'] = (q, m) => tfOk(q, TRUSTED.has(m.x)) ? '' : 'expected ' + TRUSTED.has(m.x);
  V['g2-trust-pick'] = q => picks(q, o => TRUSTED.has(o)) ? '' : 'the trusted sources are not the ones marked';
  V['g2-trust-ask'] = q => one(q, o => CHECK.has(o)) ? '' : 'expected the question that checks who made it';
  /* kinds of media */
  V['g2-match-media'] = q => q.pairs.every(p => HAS[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched to the wrong thing';
  V['g2-form-what'] = (q, m) => HAS[mk(q)] === m.has ? '' : 'that kind of media does not have ' + m.has;
  V['g2-form-name'] = (q, m) => mk(q) === from(text(m.s)) ? '' : 'expected ' + from(text(m.s));
  V['g2-media-form-tf'] = (q, m) => tfOk(q, HAS[m.f] === m.has) ? '' : 'expected ' + (HAS[m.f] === m.has);
  /* ads */
  V['g2-ad-wants'] = (q, m) => mk(q) === 'buy ' + ADS[m.top][0] ? '' : 'expected buying ' + ADS[m.top][0];
  V['g2-ad-trick'] = (q, m) => mk(q) === ADS[m.top][1] ? '' : 'expected the big promise';
  V['g2-ad-who'] = q => /^the company that sells/.test(mk(q)) ? '' : 'expected the company that sells it';
  V['g2-ad-tf'] = (q, m) => tfOk(q, PROMISES.has(m.line)) ? '' : 'expected ' + PROMISES.has(m.line);
  /* design */
  V['g2-design'] = q => q.items.map(text).join('|') === DESIGN ? '' : 'the design steps are out of order';
  V['g2-design-step'] = (q, m) => mk(q) === STEP[m.s] ? '' : 'expected ' + STEP[m.s];
  V['g2-design-next'] = (q, m) => mk(q) === STAGES[STAGES.indexOf(m.done) + 1] ? '' : 'expected the step after ' + m.done;
  V['g2-design-tf'] = (q, m) => tfOk(q, /showed it to a friend, and fixed/.test(text(q.q))) && m.tested === q.answer ? '' : 'true/false or the reason is wrong';
})();
