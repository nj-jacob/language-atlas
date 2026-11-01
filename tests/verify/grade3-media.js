/* Grade 3 answer checks: media and online life (grade3/chapters/media.js). Own lists, and a rule for strong passwords. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s).replace(/’/g, "'"), mk = q => text(H.marked(q) || '');
  const PRIVATE = /address|password|phone number|full name and school|front of my house|after school|bank card|lock code/;
  /* strong: 10 or more characters, with letters, a number and a symbol */
  const strong = s => s.length >= 10 && /[A-Za-z]/.test(s) && /\d/.test(s) && /[^A-Za-z\d]/.test(s);
  const BEST = { 'You want to post a photo of your friend.': 'Ask your friend first.', 'You want to use a song in your class video.': 'Ask your teacher if you may use it.',
    'You want to download a new game.': 'Ask a grown-up first.', 'You found a great photo online for your poster.': 'Check you may use it, and say where it came from.',
    'Your cousin wants you to share a video of your little brother.': 'Ask your brother and a grown-up first.', 'A website asks you to click "I agree".': 'Ask a grown-up to read it with you.',
    'A friend tells you a secret in a message.': 'Keep it to yourself.', 'Someone you do not know sends you a message.': 'Do not answer, and tell a grown-up.' };
  const TRUE_ONLINE = new Set(['Once something is posted, it can be hard to take back.', 'You should ask before posting a photo of someone.', 'People own the pictures and songs they make.',
    'You can say no if someone asks for your photo.', 'What you post shows others who you are.']);
  const FALSE_ONLINE = new Set(['If it is online, anyone can use it.', 'Deleting a post makes it gone forever.', "It is fine to post a friend's photo without asking.",
    'You must share your password if a friend asks.', 'What you post online does not matter.']);
  const ASK = /photo of a friend|song in your video|downloading|video of your brother|photo you found|new website/;
  const KIND = /^(Great job|I like how|Thanks for sharing|Your story made me smile|Cool fact|Welcome to the group|Nice try|I see it a different way)/;
  const KINDDO = { 'Someone posts a mean joke about a classmate.': 'Do not share it, and tell a grown-up.', 'A new student is not in the class group chat.': 'Ask the teacher if they can be added.',
    'A friend makes a mistake in a video call.': 'Tell them it is okay.', 'Someone writes a word in another language in the chat.': 'Be friendly and ask what it means.',
    "You disagree with a friend's idea online.": 'Say why, politely.', 'Someone is getting mean messages.': 'Tell a grown-up you trust.' };
  const KINDER = { 'Your drawing is ugly.': 'The trees look great! Maybe add a sun?', 'That story is boring.': 'I liked the beginning. What happens next?', 'You cannot sing.': 'Thanks for sharing your song!',
    'Your poster is too messy.': 'Cool poster! Bigger letters could help.', 'That was a dumb question.': 'Good question. Let us find out.', 'Your video is too long.': 'Fun video! The middle part could be shorter.' };
  const TRUSTED = /^(a museum website|a library book|a government weather|a nature centre page|an encyclopedia page|a hospital website|a science centre video|a park ranger's talk|a news report from a trusted|a zoo website)/;
  const MEDIA = { 'a poster': 'a big title and a picture', 'an ad': 'tries to get you to buy something', 'a news report': 'tells what happened', 'a video': 'moving pictures and sound',
    'a podcast': 'voices you listen to, with no pictures', 'a comic': 'pictures in boxes with speech bubbles', 'a website': 'pages you click to move between',
    'a road sign': 'a symbol you understand fast', 'a menu': 'a list of foods and prices' };
  const HAS = {}; Object.keys(MEDIA).forEach(k => { HAS[MEDIA[k]] = k; });
  const TRICK = { 'big, bold letters': 'catch your eye', 'music in a commercial': 'set a feeling', 'a close-up photo': 'small details', 'a famous athlete in an ad': 'trust the product',
    'a short, catchy slogan': 'remember it', 'arrows on a map': 'which way to go' };
  /* each ad (by its first line): who it is for, what it wants, and its big claim */
  const ADS = { 'NEW! Crunchy Maple Puffs!': ['kids', 'buy the cereal', 'Kids love them!'], 'Zoom Runners': ['runners', 'buy the shoes', 'Run faster than ever!'],
    'Sparkle Smile Toothpaste': ['families', 'buy the toothpaste', 'Nine out of ten dentists'], 'Lakeview Summer Camp': ['kids and their families', 'sign up for camp', 'Canoeing, crafts and campfires!'],
    'Cozy Paws Cat Food': ['cat owners', 'buy the cat food', 'purr for more'], 'Northern Sky Tours': ['travellers', 'book a trip', 'See the sky dance!'],
    'Sunny Valley Strawberries': ['shoppers', 'buy the strawberries', 'Picked fresh'], 'Rink Rocket Skates': ['hockey players', 'buy the skates', 'every hockey player wants'] };
  /* design steps: each step's name, and the order in its project */
  const STAGES = ['Plan', 'Make', 'Test', 'Improve'];
  const PROJ = [['Plan a sign that shows where boots go.', 'Draw the sign on paper.', 'Watch if your family uses it.', 'Make the boot picture bigger.'],
    ['Plan a reminder for the light switch.', 'Make a small sticker that says Lights off!', 'See if people turn off the lights.', 'Add a bright colour so it stands out.'],
    ['Plan a chart for who waters the plants.', 'Make the chart with names and days.', 'Try the chart for one week.', 'Add pictures for each day.'],
    ['Plan a lost-and-found box.', 'Build the box and add a label.', 'Ask classmates if they can find it.', 'Move the box closer to the door.'],
    ['Plan what the poster must say.', 'Make the poster on a tablet.', 'Ask a friend what they understood.', 'Fix the date so it is easier to read.'],
    ['Plan the shots for a how-to video.', 'Film each step.', 'Show the video to your cousin.', 'Slow down the hard part.'],
    ['Plan labels for the recycling bins.', 'Print the labels with pictures.', 'See if your family sorts it right.', 'Make the paper label blue like its bin.'],
    ['Plan a log to track your reading.', 'Make the log in a notebook.', 'Use the log for a week.', 'Add a space for favourite parts.']];
  const where = s => { for (const p of PROJ) { const i = p.indexOf(s); if (i >= 0) return [p, i]; } return [null, -1]; };
  const one = (q, ok) => { const good = q.options.map(text).filter(ok); return good.length === 1 && mk(q) === good[0]; };
  const picks = (q, ok) => H.sameSet(q.options.map((o, i) => ok(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  const adOf = m => ADS[text(m.ad)];

  V['g3-private'] = q => picks(q, o => PRIVATE.test(o)) ? '' : 'the private things are not the ones marked';
  V['g3-keep-private'] = q => one(q, o => PRIVATE.test(o)) ? '' : 'expected the private thing';
  V['g3-private-tf'] = (q, m) => !PRIVATE.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-strong-password'] = q => one(q, strong) ? '' : 'expected the strong password';
  V['g3-ask-first'] = (q, m) => one(q, o => o === BEST[text(m.s)]) ? '' : 'expected ' + BEST[text(m.s)];
  V['g3-match-permission'] = q => q.pairs.every(p => BEST[text(p[0])] === text(p[1])) ? '' : 'a moment is matched to the wrong thing to do';
  V['g3-online-tf'] = (q, m) => { const s = text(m.s); return (TRUE_ONLINE.has(s) || FALSE_ONLINE.has(s)) && TRUE_ONLINE.has(s) === q.answer ? '' : 'true/false is wrong for ' + s; };
  V['g3-pick-permission'] = q => picks(q, o => ASK.test(o)) ? '' : 'the times to ask first are not the ones marked';
  V['g3-kind-comment'] = q => one(q, o => KIND.test(o)) ? '' : 'expected the kind comment';
  V['g3-kind-do'] = (q, m) => one(q, o => o === KINDDO[text(m.s)]) ? '' : 'expected ' + KINDDO[text(m.s)];
  V['g3-kinder'] = q => { const k = KINDER[text(q.fig)]; return k && one(q, o => o === k) ? '' : 'expected the kinder way to say it'; };
  V['g3-kindness-tf'] = (q, m) => KIND.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-trust'] = q => one(q, o => TRUSTED.test(o)) ? '' : 'expected the trusted source';
  V['g3-not-trust'] = q => one(q, o => !TRUSTED.test(o)) ? '' : 'expected the source you cannot trust';
  V['g3-pick-trust'] = q => picks(q, o => TRUSTED.test(o)) ? '' : 'the trusted sources are not the ones marked';
  V['g3-trust-tf'] = (q, m) => TRUSTED.test(text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.s;
  V['g3-match-media'] = q => q.pairs.every(p => MEDIA[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched wrong';
  V['g3-which-media'] = (q, m) => mk(q) === HAS[text(m.has)] && q.tiles.map(text).filter(t => t === HAS[text(m.has)]).length === 1 ? '' : 'expected ' + HAS[text(m.has)];
  V['g3-media-tf'] = (q, m) => (MEDIA[m.form] === text(m.s)) === q.answer ? '' : 'true/false is wrong for ' + m.form;
  V['g3-media-trick'] = (q, m) => one(q, o => o.includes(TRICK[text(m.trick)])) ? '' : 'expected why media use ' + m.trick;
  V['g3-ad-wants'] = (q, m) => { const a = adOf(m); return a && H.has(q.fig, text(m.ad)) && one(q, o => o === a[1]) ? '' : 'expected ' + (a && a[1]); };
  V['g3-ad-for'] = (q, m) => { const a = adOf(m); return a && H.has(q.fig, text(m.ad)) && one(q, o => o === a[0]) ? '' : 'expected ' + (a && a[0]); };
  V['g3-ad-line'] = (q, m) => { const a = adOf(m), d = document.createElement('div'); d.innerHTML = q.pic; const hit = d.querySelector('[data-hit="' + q.answer + '"]');
    return a && hit && text(hit.innerHTML).includes(a[2]) ? '' : 'the tapped line is not the big claim'; };
  V['g3-ad-tf'] = (q, m) => { const a = adOf(m); return a && (a[1] === text(m.s)) === q.answer ? '' : 'true/false is wrong'; };
  V['g3-design'] = q => { const s = q.items.map(text), [p, i] = where(s[0]); return p && s.every((x, j) => p[i + j] === x) ? '' : 'the design steps are out of order'; };
  V['g3-design-stage'] = (q, m) => { const [, i] = where(text(m.s)); return i >= 0 && mk(q) === STAGES[i] ? '' : 'expected ' + STAGES[i]; };
  V['g3-design-next'] = (q, m) => { const [p, i] = where(text(m.s)); return p && i < 3 && one(q, o => o === p[i + 1]) ? '' : 'expected the step after ' + m.s; };
  V['g3-match-stage'] = q => q.pairs.every(p => { const [, i] = where(text(p[0])); return i >= 0 && STAGES[i] === text(p[1]); }) ? '' : 'a step is matched to the wrong name';
})();
