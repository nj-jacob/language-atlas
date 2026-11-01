/* Grade 1 answer checks: media and online life (grade1/chapters/media.js). The checker keeps its own lists and answer key. */
(function () {
  const V = window.__verify, H = window.__H, text = s => H.strip(s), mk = q => text(H.marked(q) || '');
  const tfWhy = (q, right) => q.why && q.why.answer === (right ? 0 : 1);
  const PRIVATE = new Set(['where I live', 'my password', 'my phone number', 'the name of my school', 'my last name', 'a photo of my house']);
  const SHAREABLE = new Set(['my favourite colour', 'a drawing of a cat', 'my favourite animal', 'a joke about a moose', 'my favourite food', 'a picture of a snowflake']);
  const SAFE = { 'A game asks for your address.': 'Ask a grown-up first.', 'Someone you do not know sends you a message.': 'Do not answer. Tell a grown-up.', 'You want to take a photo of your friend.': 'Ask your friend first.',
    'Something on the screen makes you feel scared.': 'Stop and tell a grown-up.', 'You want to use the tablet.': 'Ask a grown-up first.', 'A pop-up says you won a prize. Click here!': 'Do not click. Tell a grown-up.',
    'A website asks for your password.': 'Do not type it. Ask a grown-up.', 'You want to post a picture of your sister.': 'Ask your sister and a grown-up first.',
    'A video starts playing that is not for kids.': 'Stop it and tell a grown-up.', 'Someone online asks to meet you.': 'Say no and tell a grown-up.' };
  const SAFE_HABIT = { 'I ask a grown-up before I go online.': true, 'I tell a grown-up if something online upsets me.': true, 'I keep my password to myself.': true,
    'I can go online without asking.': false, 'I can share where I live with anyone.': false, 'I keep scary things online a secret.': false };
  const KIND = new Set(['Great drawing!', 'Thanks for sharing.', 'I like your story.', 'Your snowman is so tall!', 'Nice job on the song.', 'I learned something new from you.', 'That made me smile.', 'Well done!']);
  const UNKIND = new Set(['That is bad.', 'Nobody likes it.', 'Stop posting.', 'That is so boring.', 'You cannot draw.', 'Ugh, not again.', 'Everyone thinks you are silly.', 'That is the worst.']);
  const MEAN = { 'Someone posts a mean comment about your friend.': 'Tell a grown-up and do not join in.', 'Your friend shares a drawing in the class app.': 'Write something kind about it.',
    'You feel angry at a message.': 'Take a break. Talk to a grown-up.', 'A classmate is left out of the group chat.': 'Ask a grown-up if they can join.', 'You made a mistake and hurt someone online.': 'Say sorry.' };
  const TRUSTED = new Set(['a library book about bears', 'a museum website about dinosaurs', 'your teacher', 'a nature centre page about birds', 'a park ranger', 'a doctor', 'an Elder who knows the land',
    'a book about the weather', 'a farmer who grows apples', 'a zoo website about lions']);
  const UNTRUSTED = new Set(['a joke video about bears', 'a comment from a stranger', 'an ad for toys', 'a cartoon about birds', 'a funny meme', 'a cereal box', 'a pop-up game', 'a made-up story about a storm',
    'an ad for apple juice', 'a cartoon lion']);
  const FORM = { 'a poster': 'a big title and a picture', 'an ad': 'wants you to buy something', 'a video': 'moving pictures and sound', 'a sign': 'a few words to tell you something fast',
    'a book cover': 'a title, a picture and who wrote it', 'a song': 'music and words you sing' };
  const AD = { 'NEW! Berry Blast Juice!': ['get the juice', 'kids'], 'Zoom Sneakers!': ['buy the sneakers', 'kids'], 'Comfy Chairs for Grandparents': ['buy a chair', 'grandparents'], 'Crunchy Pup Treats!': ['buy dog treats', 'dog owners'] };
  const POSTER = { 'Book Fair': { 'Who made this poster?': 'Room 4', 'What is the poster about?': 'a book fair', 'When is it?': 'Friday' },
    'Bake Sale': { 'Who made this poster?': 'the Grade 1 class', 'What is the poster about?': 'a bake sale', 'When is it?': 'Tuesday' },
    'Lost Cat': { 'Who made this poster?': 'Asha', 'What is the poster about?': 'a lost cat', 'What colour is the cat?': 'grey' } };
  const STEP = ['Plan', 'Make', 'Show', 'Fix'];
  const MOMENT = { 'Kai draws a quick plan for his poster.': 'plan', 'Ava thinks about what her card will say.': 'plan', 'Omar lists the slides he wants.': 'plan', 'Mei colours in her sign.': 'make',
    'Theo types the words on his slides.': 'make', 'Noor glues pictures on her card.': 'make', 'Liam shows his map to Dad.': 'show', 'Sofia asks her class what they think.': 'show',
    'Hana reads her card to Grandma.': 'show', 'Ravi makes his title bigger so it is easy to read.': 'fix', 'Ella adds a picture her friend asked for.': 'fix', 'Jun fixes a spelling on his sign.': 'fix' };
  const NEXT = { planned: /^Make/, made: /^Show/, 'showed someone': /^Fix/ };
  const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
  const marked = (q, set) => H.sameSet(q.options.map((o, i) => set.has(text(o)) ? i : -1).filter(i => i >= 0), q.answer);
  V['g1-private'] = q => marked(q, PRIVATE) && q.options.every(o => PRIVATE.has(text(o)) || SHAREABLE.has(text(o))) ? '' : 'the private things are not the ones marked';
  V['g1-what-do'] = (q, m) => mk(q) === SAFE[m.s] ? '' : 'expected ' + SAFE[m.s];
  V['g1-ask-tf'] = (q, m) => { const right = SAFE_HABIT[m.said]; return right !== undefined && q.answer === right && tfWhy(q, right) ? '' : 'true/false is wrong'; };
  V['g1-private-tf'] = (q, m) => { const right = SHAREABLE.has(m.w); return (right || PRIVATE.has(m.w)) && text(q.fig).toLowerCase().includes(lc(m.w).toLowerCase()) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-kind'] = q => { const ok = q.options.map(text).filter(o => KIND.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the kind comment'; };
  V['g1-kind-comment-tf'] = (q, m) => { const right = KIND.has(m.c); return (right || UNKIND.has(m.c)) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-pick-kind-comment'] = q => marked(q, KIND) ? '' : 'the kind comments are not the ones marked';
  V['g1-mean-do'] = (q, m) => mk(q) === MEAN[m.s] ? '' : 'expected ' + MEAN[m.s];
  V['g1-trust'] = q => { const ok = q.options.map(text).filter(o => TRUSTED.has(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the place you can trust'; };
  V['g1-trust-tf'] = (q, m) => { const right = TRUSTED.has(m.w); return (right || UNTRUSTED.has(m.w)) && q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
  V['g1-trust-why'] = (q, m) => TRUSTED.has(m.w) && /^People who know/.test(mk(q)) ? '' : 'expected: people who know about it made it';
  V['g1-pick-trust'] = q => marked(q, TRUSTED) ? '' : 'the places you can trust are not the ones marked';
  V['g1-form-of'] = (q, m) => FORM[mk(q)] === m.what ? '' : 'expected the kind of media with ' + m.what;
  V['g1-match-media'] = q => q.pairs.every(p => FORM[text(p[0])] === text(p[1])) ? '' : 'a kind of media is matched wrong';
  V['g1-ad-wants'] = (q, m) => text(q.fig).includes(m.ad) && mk(q) === AD[m.ad][0] ? '' : 'expected ' + AD[m.ad][0];
  V['g1-ad-for'] = (q, m) => text(q.fig).includes(m.ad) && mk(q) === AD[m.ad][1] ? '' : 'expected ' + AD[m.ad][1];
  V['g1-poster'] = (q, m) => { const p = POSTER[m.title.replace(/^# /, '')], want = p && p[m.q];
    return want && mk(q) === want && text(q.fig).toLowerCase().includes(want.toLowerCase().replace(/^(a|the) /, '')) ? '' : 'expected ' + want; };
  V['g1-design'] = q => q.items.map(text).every((t, i) => t.startsWith(STEP[i])) ? '' : 'the steps are not plan, make, show, fix';
  V['g1-design-step'] = (q, m) => mk(q) === MOMENT[m.s] ? '' : 'expected ' + MOMENT[m.s];
  V['g1-design-next'] = (q, m) => { const ok = q.options.map(text).filter(o => NEXT[m.done].test(o)); return ok.length === 1 && mk(q) === ok[0] ? '' : 'expected the step after ' + m.done; };
  V['g1-design-tf'] = (q, m) => { const right = MOMENT[m.s] === m.said; return q.answer === right && tfWhy(q, right) ? '' : 'expected ' + right; };
})();
