/* Grade 1 answer checks: media and online life (grade1/chapters/media.js). The checker keeps its own lists and answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const PRIVATE = new Set(['where I live', 'my password', 'my phone number', 'the name of my school']);
  const SAFE = { 'A game asks for your address.': 'Ask a grown-up first.', 'Someone you do not know sends you a message.': 'Do not answer. Tell a grown-up.', 'You want to take a photo of your friend.': 'Ask your friend first.',
    'Something on the screen makes you feel scared.': 'Stop and tell a grown-up.', 'You want to use the tablet.': 'Ask a grown-up first.' };
  const KIND = new Set(['Great drawing!', 'Thanks for sharing.', 'I like your story.']);
  const TRUSTED = new Set(['a library book about bears', 'a museum website about dinosaurs', 'your teacher', 'a nature centre page about birds']);
  const FORM = { 'a poster': 'a big title and a picture', 'an ad': 'wants you to buy something', 'a video': 'moving pictures and sound', 'a sign': 'a few words to tell you something fast' };
  const POSTER = { 'Who made this poster?': 'Room 4', 'What is the poster about?': 'a book fair', 'When is it?': 'Friday' };
  const STEP = ['Plan', 'Make', 'Show', 'Fix'];
  V['g1-private'] = q => H.sameSet(q.options.map((o, i) => PRIVATE.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer) ? '' : 'the private things are not the ones marked';
  V['g1-what-do'] = (q, m) => mk(q) === SAFE[m.s] ? '' : 'expected ' + SAFE[m.s];
  V['g1-kind'] = q => { const ok = q.options.map(text).filter(o => KIND.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the kind comment'; };
  V['g1-ask-tf'] = (q, m) => /^I ask a grown-up/.test(m.said) === q.answer && q.why.answer === 0 ? '' : 'true/false is wrong';
  V['g1-trust'] = q => { const ok = q.options.map(text).filter(o => TRUSTED.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the place you can trust'; };
  V['g1-match-media'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched wrong';
  V['g1-ad-wants'] = q => /Ask for it/.test(text(q.fig)) && mk(q) === 'get the juice' ? '' : 'expected: get the juice';
  V['g1-ad-for'] = q => /Kids love it/.test(text(q.fig)) && mk(q) === 'kids' ? '' : 'expected: kids';
  V['g1-poster'] = (q, m) => mk(q) === POSTER[m.q] && text(q.fig).toLowerCase().includes(POSTER[m.q].toLowerCase().replace(/^a /, '')) ? '' : 'expected ' + POSTER[m.q];
  V['g1-design'] = q => q.items.map(text).every((t, i) => t.startsWith(STEP[i])) ? '' : 'the steps are not plan, make, show, fix';
})();
