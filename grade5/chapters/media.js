/* Grade 5: media and online life. A full chapter: every idea has two worked examples, three questions together and five on
   your own, and its own practice skill asked in four or more ways.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights and responsibilities online with permission, and a positive digital identity     A2.2 navigating safely, managing privacy and personal data
   A2.3 gathering and evaluating information for validity, credibility, accuracy and perspective   A2.4 forms, conventions and techniques of media texts, and their impact on the audience
   A2.5 how form, message, audience and purpose fit together       A2.7 communicating and collaborating online safely, respectfully and inclusively
   With a grown-up: A2.6 using digital tools in a design process to solve a real problem.
   All examples are written for this site. Answer checks: tests/verify/grade5-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';

  /* [what is happening online, the responsible choice, choices that are not] */
  var PERMIT = [['You took a funny photo of your friend.', 'Ask your friend before you post it.', ['Post it right away.', 'Post it, and tag everyone.']],
    ['You want to use a song in your class video.', 'Use music you have permission to use.', ['Use any song you find.', 'Copy a song and say you made it.']],
    ['A game asks you to make an account.', 'Ask a grown-up first.', ['Sign up with your full name.', 'Use your friend' + AP + 's account.']],
    ['You want to share a classmate' + AP + 's drawing online.', 'Ask them, and name them as the artist.', ['Share it as your own.', 'Share it without asking.']],
    ['You found a great photo of a moose for your report.', 'Use it only if it is free to use, and say where it came from.', ['Copy it and say you took it.', 'Use it and never say where it came from.']],
    ['Your cousin sent you a video of a family party.', 'Ask the family before you share it.', ['Post it for everyone to see.', 'Send it to the whole class.']],
    ['You want to use a sentence from a book in your blog.', 'Use quotation marks and name the author.', ['Copy it as if you wrote it.', 'Change one word and call it yours.']],
    ['You recorded your teacher singing at the concert.', 'Ask your teacher before you share it.', ['Post it, since it is funny.', 'Share it in a group chat.']],
    ['A website wants to use your camera.', 'Ask a grown-up first.', ['Click yes to everything.', 'Let it, since it said please.']],
    ['Your friend wrote a great story for the class website.', 'Ask your friend, and put their name on it.', ['Post it with your name on it.', 'Post it without telling them.']]];
  /* what is true about posting online, and what is not */
  var FOOT = [['What I post online can stay there for a long time.', true], ['Other people can take a screenshot of my post.', true], ['A future coach or teacher might see what I post.', true],
    ['Kind posts help build a positive digital identity.', true], ['Anything I post disappears forever when I delete it.', false], ['Only my friends can ever see my posts.', false],
    ['What I post online does not affect how people see me.', false], ['A private message can never be shared.', false]];
  var GOODPOST = ['a photo of the mural your class painted', 'a kind comment on a friend' + AP + 's project', 'a video of you folding a paper crane', 'a post thanking the food bank volunteers'];
  var BADPOST = ['a mean joke about a classmate', 'a rude comment on a stranger' + AP + 's video', 'a photo of a friend, posted without asking', 'an angry post in all capital letters'];
  var PRIVATE = ['your home address', 'your password', 'your birthday', 'your phone number', 'your school' + AP + 's name', 'your location right now', 'a photo of the front of your house'];
  var OKSHARE = ['your favourite book', 'what you think of a movie', 'a drawing of a dragon', 'your favourite sport', 'a joke you made up'];
  var STRONG = ['Maple!Canoe7Jump', 'Purple+Moose42Sky', 'Snow*Fort9Pickle', 'Loon&Lake83Paddle', 'River$Toast5Kite'], WEAK = ['password', '12345', 'mydog', 'abc123', 'hockey', 'qwerty'];
  /* [a privacy problem, the safe choice, choices that are not] */
  var PRIV = [['A stranger in a game asks where you live.', 'Do not answer, and tell a grown-up.', ['Tell them your street.', 'Give them your school' + AP + 's name instead.']],
    ['A website asks for your birthday before you can play.', 'Ask a grown-up first.', ['Type it in.', 'Make up a fake one for every site.']],
    ['Your best friend asks for your password.', 'Keep it private, even from friends.', ['Share it, since they are your friend.', 'Text it to them.']],
    ['An app wants to know your location all the time.', 'Turn location off unless the app needs it.', ['Leave it on always.', 'Share your location with everyone.']],
    ['A message says you won a prize and must click a link.', 'Do not click. Show a grown-up.', ['Click to claim it.', 'Send your address to get it.']]];
  /* [what someone posted, a respectful reply, replies that are not] */
  var REPLY = [['I made bannock for the first time!', 'That looks delicious. How did you make it?', ['Ew, gross.', 'Mine is way better.']],
    ['Here is my science fair project.', 'Cool idea! What was the hardest part?', ['Boring.', 'Who cares?']],
    ['I am learning to speak Tagalog.', 'That is great. Can you teach me a word?', ['Why would you learn that?', 'That language is weird.']],
    ['Our team lost the final.', 'You played hard. Next time!', ['You are all terrible.', 'Ha ha, losers.']],
    ['I drew my family' + AP + 's dog.', 'I love the colours! What is the dog' + AP + 's name?', ['That does not look like a dog.', 'My drawing is better.']],
    ['We celebrate Diwali this week!', 'Happy Diwali! What is your favourite part?', ['That is a strange holiday.', 'Nobody cares.']],
    ['I wrote my first poem.', 'Thanks for sharing. Which line is your favourite?', ['Poems are dumb.', 'Too long. Did not read.']],
    ['I use a wheelchair, and I just tried sledge hockey!', 'That sounds amazing. How did it feel on the ice?', ['How can you even play?', 'That is not real hockey.']],
    ['My grandpa taught me some Cree words.', 'That is so special. What does one of them mean?', ['Just speak English.', 'Why bother?']],
    ['I finished my first 5 km run!', 'Way to go! How long did you train?', ['That is not very far.', 'I could do it faster.']]];
  /* working together online: [the situation, the respectful choice, choices that are not] */
  var GROUP = [['A classmate in your online group has not said anything yet.', 'Ask what they think.', ['Leave them out.', 'Finish the work without them.']],
    ['Someone posts a mean comment about a classmate.', 'Do not join in, and tell a grown-up.', ['Add a laughing face.', 'Share it with friends.']],
    ['Your group disagrees about the topic.', 'Listen to each idea, then decide together.', ['Do whatever you want.', 'Stop talking to the group.']],
    ['A new student joins your class chat.', 'Welcome them and include them.', ['Ignore them.', 'Make jokes about them.']],
    ['A friend shares a rumour about someone.', 'Do not pass it on.', ['Send it to everyone.', 'Add more to the rumour.']]];
  /* [an ad line, the technique it uses] */
  var TECH = [['Everyone at school has one. Do not be left out!', 'everyone is doing it'], ['Join the thousands of kids who already play Galaxy Quest!', 'everyone is doing it'],
    ['All your friends are wearing Snap Bands. Are you?', 'everyone is doing it'], ['Hockey star Jada Moore drinks Zoom Juice!', 'a famous person'],
    ['Olympic swimmer Mei Tanaka loves Splash Shampoo!', 'a famous person'], ['Pop star Leo Grant never leaves home without Beat Buds.', 'a famous person'],
    ['Only $9.99, but only for today!', 'hurry, it will run out'], ['Last chance! The sale ends tonight!', 'hurry, it will run out'], ['Only 50 left. Get yours now!', 'hurry, it will run out'],
    ['Crunchy, munchy, Choco-Bunchy!', 'a catchy rhyme'], ['Snack attack? Grab a Zap Snack!', 'a catchy rhyme'], ['Feeling slow? Have a Go-Go!', 'a catchy rhyme'],
    ['9 out of 10 kids love it!', 'a number that sounds impressive'], ['Dentists say it cleans 3 times better!', 'a number that sounds impressive'], ['100% more fun than before!', 'a number that sounds impressive']];
  var TECHS = ['everyone is doing it', 'a famous person', 'hurry, it will run out', 'a catchy rhyme', 'a number that sounds impressive'];
  var TECHWHY = { 'everyone is doing it': 'so you feel left out without it', 'a famous person': 'so you want to be like them', 'hurry, it will run out': 'so you buy before you think',
    'a catchy rhyme': 'so you remember the name', 'a number that sounds impressive': 'so it sounds proven' };
  /* [a media text, who it is made for, why it was made] */
  var MEDIA = [['a cereal ad during a cartoon', 'young children', 'to sell cereal'], ['a poster about a flu shot clinic', 'families', 'to inform about health'],
    ['a trailer for a new movie', 'people who like movies', 'to get people to see the movie'], ['a town sign about a park clean-up', 'neighbours', 'to get people to help'],
    ['a video game commercial', 'video game players', 'to sell a game'], ['a bus schedule at the stop', 'bus riders', 'to give the times'],
    ['a museum website about dinosaurs', 'people curious about dinosaurs', 'to teach about dinosaurs'], ['a poster for a school bake sale', 'students and parents', 'to raise money'],
    ['a news report about a snowstorm', 'people in the storm' + AP + 's path', 'to warn about the weather'], ['a library flyer for a reading club', 'kids who like to read', 'to get kids to join']];
  /* [what you want to do, the form that does it best] */
  var FORMFOR = [['remind bus riders of new times', 'a sign at the bus stop'], ['get teens to try a new game', 'a short online video'], ['tell families about a flu clinic', 'a poster at the school'],
    ['warn drivers about ice on the road', 'a flashing road sign'], ['share a class trip with grandparents', 'a photo slideshow with captions'], ['get neighbours to a clean-up on Saturday', 'a flyer in every mailbox']];
  /* checking online information */
  var CHECK = ['See if trusted sources say the same thing.', 'Check who wrote it and when.', 'Look for facts, not just opinions.', 'Look for the date it was posted.', 'Ask a librarian or a teacher.', 'Check if an expert group made the website.'];
  var NOCHECK = ['Believe it because it has many likes.', 'Share it right away.', 'Trust it because the picture looks real.', 'Trust it because a friend shared it.', 'Believe it because it is in capital letters.', 'Trust it because it was the first search result.'];
  /* [a source, credible or not] */
  var CRED = [['a health website from the Government of Canada', 1], ['a science museum' + AP + 's website', 1], ['a news site that names its writers and dates its stories', 1], ['a university' + AP + 's page about weather', 1],
    ['a post with 10 000 likes and no author', 0], ['a video by someone selling the product', 0], ['a meme with a made-up quote', 0], ['a website with no date and no author', 0]];
  /* [who made it and what it says, what a careful reader thinks, what a careless reader thinks] */
  var SLANT = [['A website says candy is good for your teeth. A candy company made it.', 'It may be biased: the company wants to sell candy.', ['It must be true: it is on a website.', 'Candy companies know the most about teeth.']],
    ['A video says one brand of sneakers makes you faster. That brand paid for the video.', 'It may be biased: the brand paid for it.', ['It must be true: it is a video.', 'All videos are honest.']],
    ['A review says a hotel is perfect. The hotel owner wrote it.', 'It may be biased: the owner wants guests.', ['It must be true: reviews are always fair.', 'Owners never praise their own hotels.']],
    ['A gamer says a new game is the best ever. The game company pays her to play it.', 'It may be biased: she is paid to say so.', ['It must be true: she plays a lot.', 'Paid players are always honest.']],
    ['A science museum website says monarchs fly to Mexico.', 'It is likely accurate: experts made it.', ['It must be false: museums are old.', 'It is biased: museums sell butterflies.']]];

  function why(right, yes, no) { return { options: [yes, no], answer: right ? 0 : 1 }; }
  function others(list, x, n, f) { return R.some(list.filter(function (y) { return y !== x; }), n).map(f); }

  /* ---------- ask before you share (A2.1) ---------- */
  function permission(lv) {
    var p = R.pick(PERMIT);
    return Q.one('What is the responsible choice?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', p[0]), prompt: 'Whose permission do you need?',
      hint: 'Ask before you share what belongs to someone else.', explain: p[1], meta: { k: 'g5-permission', s: p[0] } });
  }
  function permissionTf() {
    var p = R.pick(PERMIT), right = R.int(0, 1) === 1, choice = right ? p[1] : R.pick(p[2]);
    return { q: Q.name() + ' decides: <b>' + choice + '</b> Responsible?', fig: W.means('screen', p[0]), type: 'tf', answer: right, why: why(right, 'It respects the owner' + AP + 's rights.', 'It takes something without permission.'),
      hint: 'Whose is it? Did they say yes?', explain: p[1], meta: { k: 'g5-permission-tf', s: p[0], choice: choice } };
  }
  function footprint() {
    var f = R.pick(FOOT);
    return { q: 'True or false?', fig: W.sent(f[0]), type: 'tf', answer: f[1], why: { options: ['Posts can be copied, saved and shared.', 'Deleting always removes every copy.'], answer: 0 },
      hint: 'Can someone take a screenshot?', explain: 'Your posts build your digital identity. Think before you post.', meta: { k: 'g5-footprint', said: f[0] } };
  }
  function identity(lv) {
    var good = R.pick(GOODPOST);
    return Q.one('Which post builds a <b>positive digital identity</b>?', good, R.some(BADPOST, lv > 1 ? 2 : 1), { hint: 'Would you be proud if a future coach saw it?',
      explain: 'Kind, creative posts show who you really are.', meta: { k: 'g5-identity' } });
  }

  /* ---------- keep personal data private (A2.2) ---------- */
  function privateData() {
    return Q.all('Pick every piece of <b>personal data</b> to keep private online.', R.some(PRIVATE, 2), R.some(OKSHARE, 2), { hint: 'Could a stranger use it to find you or get into your account?',
      explain: 'Keep addresses, passwords, birthdays, phone numbers, locations and school names private.', meta: { k: 'g5-private' } });
  }
  function privateTf() {
    var right = R.int(0, 1) === 1, item = R.pick(right ? OKSHARE : PRIVATE);
    return { q: Q.name() + ' shares <b>' + item + '</b> in a game chat. Is that safe?', type: 'tf', answer: right, why: why(right, 'It cannot be used to find or trick you.', 'A stranger could use it.'),
      hint: 'Could a stranger use it to find you?', explain: right ? 'That is fine to share.' : 'Keep that private.', meta: { k: 'g5-private-tf', item: item } };
  }
  function password(lv) {
    return Q.tiles('Which password is the <b>strongest</b>?', R.pick(STRONG), R.some(WEAK, lv > 1 ? 3 : 2), { hint: 'Long, with letters, numbers and symbols, and hard to guess.',
      explain: 'Long and mixed is strong. Never share it.', meta: { k: 'g5-password' } });
  }
  function privacyAct(lv) {
    var p = R.pick(PRIV);
    return Q.one('What should you do?', p[1], p[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('lock', p[0]), hint: 'Keep your data safe, and ask a grown-up when unsure.', explain: p[1], meta: { k: 'g5-privacy-act', s: p[0] } });
  }

  /* ---------- be respectful online (A2.7) ---------- */
  function reply(lv) {
    var r = R.pick(REPLY);
    return Q.one('Which reply is respectful?', r[1], r[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', r[0]), prompt: 'Would you say it to their face?',
      hint: 'Respectful replies are kind and curious, even when you disagree.', explain: r[1], meta: { k: 'g5-reply', post: r[0] } });
  }
  function replyTf() {
    var r = R.pick(REPLY), right = R.int(0, 1) === 1, said = right ? r[1] : R.pick(r[2]);
    return { q: 'Someone posts this. ' + Q.name() + ' replies: <b>' + said + '</b> Respectful?', fig: W.means('screen', r[0]), type: 'tf', answer: right,
      why: why(right, 'It is kind and curious.', 'It could hurt or shame them.'), hint: 'Would you say it to their face?', explain: r[1], meta: { k: 'g5-reply-tf', post: r[0], said: said } };
  }
  function group(lv) {
    var g = R.pick(GROUP);
    return Q.one('What is the respectful thing to do?', g[1], g[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', g[0]), hint: 'Include people, and do not spread hurt.', explain: g[1], meta: { k: 'g5-group', s: g[0] } });
  }
  function faceTest() {
    var r = R.pick(REPLY), kind = R.int(0, 1) === 1, said = kind ? r[1] : R.pick(r[2]);
    return { q: 'The face test: would you say this to the person' + AP + 's face?', fig: W.means('screen', r[0]) + W.sent(said), type: 'tap', tiles: ['Yes: it is kind.', 'No: it could hurt.'], answer: kind ? 0 : 1,
      hint: 'Picture them reading it.', explain: 'A kind reply: ' + r[1], meta: { k: 'g5-face-test', post: r[0], said: said } };
  }

  /* ---------- check before you believe (A2.3) ---------- */
  function checkClaim() {
    return Q.all('You read something surprising online. Pick every good way to <b>check</b> it.', R.some(CHECK, 2), R.some(NOCHECK, 2), { hint: 'Likes and shares do not make something true.',
      explain: 'Check the source, the date and other trusted sources.', meta: { k: 'g5-check' } });
  }
  function checkTf() {
    var right = R.int(0, 1) === 1, s = R.pick(right ? CHECK : NOCHECK);
    return { q: Q.name() + ' checks a surprising post this way. Good check?', fig: W.sent(s), type: 'tf', answer: right, why: why(right, 'It tests whether the post is true.', 'It does not test whether it is true.'),
      hint: 'Does it test the facts or the source?', explain: right ? 'A good check.' : 'Better: see if trusted sources say the same thing.', meta: { k: 'g5-check-tf', s: s } };
  }
  function credible(lv) {
    var good = R.pick(CRED.filter(function (c) { return c[1]; }));
    return Q.one('Which source is most <b>credible</b>?', good[0], R.some(CRED.filter(function (c) { return !c[1]; }), lv > 1 ? 3 : 2).map(function (c) { return c[0]; }), {
      hint: 'Who made it? Do they know the topic? Do they want to sell you something?', explain: good[0] + ': experts, with names and dates.', meta: { k: 'g5-credible' } });
  }
  function slant(lv) {
    var x = R.pick(SLANT);
    return Q.one('What would a careful reader think?', x[1], x[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', x[0]), hint: 'Who made it, and what might they want?', explain: x[1], meta: { k: 'g5-slant', s: x[0] } });
  }

  /* ---------- ads use tricks to persuade (A2.4) ---------- */
  function technique(lv) {
    var t = R.pick(TECH);
    return Q.tiles('What technique does this ad use?', t[1], R.some(TECHS.filter(function (x) { return x !== t[1]; }), lv > 1 ? 3 : 2), { fig: W.sent(t[0]), hint: 'How is it trying to get you to buy?',
      explain: 'It uses <b>' + t[1] + '</b>, ' + TECHWHY[t[1]] + '.', meta: { k: 'g5-technique', ad: t[0] } });
  }
  function techTf() {
    var t = R.pick(TECH), right = R.int(0, 1) === 1, said = right ? t[1] : R.pick(TECHS.filter(function (x) { return x !== t[1]; }));
    return { q: Q.name() + ' says this ad uses <b>' + said + '</b>.', fig: W.sent(t[0]), type: 'tf', answer: right, why: why(right, 'That is the trick.', 'It uses a different trick.'),
      hint: 'How is it trying to get you to buy?', explain: 'It uses <b>' + t[1] + '</b>.', meta: { k: 'g5-tech-tf', ad: t[0], said: said } };
  }
  function matchTech() {
    var ts = R.some(TECHS, 3).map(function (k) { return R.pick(TECH.filter(function (t) { return t[1] === k; })); });
    return { q: 'Match each ad to its technique.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'How is each one trying to get you to buy?', explain: 'Spot the trick, then decide for yourself.', meta: { k: 'g5-match-tech' } };
  }
  function techWhy(lv) {
    var k = R.pick(TECHS);
    return Q.one('Why do ads use <b>' + k + '</b>?', TECHWHY[k], others(TECHS, k, lv > 1 ? 2 : 1, function (x) { return TECHWHY[x]; }), { hint: 'How does it make the audience feel or act?',
      explain: 'Ads use ' + k + ' ' + TECHWHY[k] + '.', meta: { k: 'g5-tech-why', t: k } });
  }

  /* ---------- audience and purpose (A2.5) ---------- */
  function audience(lv) {
    var m = R.pick(MEDIA);
    return Q.tiles('Who is <b>' + m[0] + '</b> made for?', m[1], others(MEDIA, m, lv > 1 ? 2 : 1, function (x) { return x[1]; }), {
      hint: 'Who would see it? Who is it trying to reach?', explain: 'It is made for <b>' + m[1] + '</b>.', meta: { k: 'g5-media-audience', m: m[0] } });
  }
  function purpose(lv) {
    var m = R.pick(MEDIA);
    return Q.one('Why was <b>' + m[0] + '</b> made?', m[2], others(MEDIA, m, lv > 1 ? 2 : 1, function (x) { return x[2]; }), {
      hint: 'What does the maker want you to do?', explain: m[2], meta: { k: 'g5-media-purpose', m: m[0] } });
  }
  function matchMedia() {
    var ms = R.some(MEDIA, 3);
    return { q: 'Match each media text to why it was made.', type: 'match', pairs: ms.map(function (m) { return [m[0], m[2]]; }), hint: 'What does each maker want?', explain: 'Every media text has a purpose.', meta: { k: 'g5-match-media' } };
  }
  function formFor(lv) {
    var f = R.pick(FORMFOR);
    return Q.one('You want to <b>' + f[0] + '</b>. Which form fits best?', f[1], others(FORMFOR, f, lv > 1 ? 2 : 1, function (x) { return x[1]; }), {
      hint: 'Where will the audience see it?', explain: '<b>' + f[1] + '</b> reaches them.', meta: { k: 'g5-form-for', want: f[0] } });
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'online', title: 'Being safe and responsible online', sub: 'Permission, privacy and respect.',
      concepts: [
        { slug: 'permission', title: 'Ask before you share', exp: ['A2.1'], skill: 'permission',
          model: [
            step(W.means('screen', 'A funny photo of a friend'), 'It is about them.'),
            step(W.means('people', 'Can I post this?'), 'So ask first.'),
            step(W.means('screen', 'A great photo of a moose, found online'), 'Someone else made it.'),
            step(W.sent('Photo: Parks Canada'), 'Use it only if allowed, and say where it came from.'),
            step(W.icon('star'), 'Each post adds to your <b>digital identity</b>.')
          ],
          guided: [function () { return permission(1); }, footprint, function () { return identity(1); }],
          check: [function () { return permission(2); }, permissionTf, footprint, function () { return identity(2); }, function () { return permission(3); }],
          coach: '<p>Make a family rule: we ask before we post a photo of anyone, including each other.</p>',
          mistake: '<p>Thinking a photo is yours to share because you took it. If someone is in it, ask them.</p>' },
        { slug: 'privacy', title: 'Keep personal data private', exp: ['A2.2'], skill: 'privacy',
          model: [
            step(W.icon('lock'), 'Address, password, birthday, phone number.'),
            step(W.means('screen', 'A stranger asks where you live.'), 'Do not answer. Tell a grown-up.'),
            step(W.sent('your favourite book'), 'Fine to share.'),
            step(W.sent('Maple!Canoe7Jump'), 'A strong password: long, with numbers and symbols.')
          ],
          guided: [privateData, function () { return privacyAct(1); }, function () { return password(1); }],
          check: [privateData, privateTf, function () { return privacyAct(2); }, function () { return password(2); }, privateData],
          coach: '<p>Go through the privacy settings on a family device together. Turn off location for apps that do not need it.</p>',
          mistake: '<p>Using the same easy password everywhere. Use a long one, and never share it with friends.</p>' },
        { slug: 'respect', title: 'Be respectful online', exp: ['A2.7'], skill: 'respect',
          model: [
            step(W.means('screen', 'I am learning to speak Tagalog.'), 'Someone shares.'),
            step(W.sent('That language is weird.'), 'Hurtful. It shames their culture.'),
            step(W.sent('That is great. Can you teach me a word?'), 'Kind and curious.'),
            step(W.means('people', 'A classmate has not spoken in the group chat.'), 'Working together online.'),
            step(W.sent('What do you think, Sam?'), 'Invite them in.')
          ],
          guided: [function () { return reply(1); }, faceTest, function () { return group(1); }],
          check: [function () { return reply(2); }, replyTf, function () { return group(2); }, faceTest, function () { return reply(3); }],
          coach: '<p>Use the "face test": would you say it to the person' + AP + 's face, with their grandparent beside them?</p>',
          mistake: '<p>Joining in when others pile on. Stay out, or say something kind.</p>' }
      ]
    }, {
      id: 'media-sense', title: 'Thinking about media', sub: 'Checking information, and how media tries to persuade.',
      concepts: [
        { slug: 'check', title: 'Check before you believe', exp: ['A2.3'], skill: 'check',
          model: [
            step(W.means('screen', 'Moose can fly! 10 000 likes!'), 'Likes do not make it true.'),
            step(W.icon('think'), 'Who wrote it? When?'),
            step(W.icon('read'), 'Do trusted sources say the same?'),
            step(W.means('screen', 'Candy is good for your teeth! (made by a candy company)'), 'Who made it, and what do they want?')
          ],
          guided: [checkClaim, function () { return credible(1); }, checkTf],
          check: [checkClaim, function () { return slant(2); }, checkTf, function () { return credible(2); }, function () { return slant(3); }],
          coach: '<p>When a surprising "fact" comes up, look it up together on two trusted sites, such as a museum or a government site.</p>',
          mistake: '<p>Trusting a photo because it looks real. Pictures can be edited or made by computers.</p>' },
        { slug: 'techniques', title: 'Ads use tricks to persuade', exp: ['A2.4'], skill: 'techniques',
          model: [
            step(W.sent('Everyone has one. Do not be left out!'), 'Everyone is doing it.'),
            step(W.sent('Hockey star Jada Moore drinks Zoom Juice!'), 'A famous person.'),
            step(W.sent('Only for today!'), 'Hurry, it will run out.'),
            step(W.sent('Crunchy, munchy, Choco-Bunchy!'), 'A catchy rhyme you remember.'),
            step(W.sent('9 out of 10 kids love it!'), 'A number that sounds proven.')
          ],
          guided: [function () { return technique(1); }, function () { return techWhy(1); }, techTf],
          check: [function () { return technique(2); }, matchTech, techTf, function () { return techWhy(2); }, function () { return technique(3); }],
          coach: '<p>During a commercial break, play "spot the trick". Name the technique, then ask: "Does it make you want it?"</p>',
          mistake: '<p>Believing a famous person really uses the product. They are often paid to say so.</p>' },
        { slug: 'audience', title: 'Every media text has an audience and a purpose', exp: ['A2.5'], skill: 'audience',
          model: [
            step(W.sent('a cereal ad during a cartoon'), 'Made for young children.'),
            step(W.sent('to sell cereal'), 'Made to sell.'),
            step(W.icon('think'), 'The form fits them: bright, fast, fun.'),
            step(W.sent('a sign at the bus stop'), 'For bus riders, to give the times.')
          ],
          guided: [function () { return audience(1); }, function () { return purpose(1); }, function () { return formFor(1); }],
          check: [function () { return audience(2); }, matchMedia, function () { return purpose(2); }, function () { return formFor(2); }, function () { return audience(3); }],
          coach: '<p>Pick any ad, sign or video and ask three questions: Who made it? Who is it for? What do they want?</p>',
          mistake: '<p>Thinking media is just there for fun. Almost every media text wants something from its audience.</p>' }
      ]
    }],
    practice: [
      { id: 'permission', name: 'Permission and digital identity', code: 'A2.1', gen: permission },
      { id: 'privacy', name: 'Privacy and personal data', code: 'A2.2', gen: privateData },
      { id: 'respect', name: 'Respect online', code: 'A2.7', gen: reply },
      { id: 'check', name: 'Check before you believe', code: 'A2.3', gen: checkClaim },
      { id: 'techniques', name: 'Ad techniques', code: 'A2.4', gen: technique },
      { id: 'audience', name: 'Audience and purpose', code: 'A2.5', gen: audience }
    ],
    tasks: [
      { id: 'design', title: 'Design a solution', code: 'A2.6', pic: W.icon('screen'), say: 'Use a digital tool to solve a real problem at home or school.',
        run: ['Choose a real problem together: a messy shoe area, a busy crosswalk, too much food waste at lunch.',
          'The child plans a solution, then uses a digital tool (slides, a drawing app, a video, a poster maker) to design and share it.', 'Ask for feedback, improve the design once, and share it again.'],
        rubric: ['No plan yet.', 'A plan with help; the tool is not used well yet.', 'A clear solution, designed and shared with a fitting digital tool.', 'A creative solution, improved after feedback, with a tool chosen for a reason.'] }
    ]
  });

  Q.shapes('media', {
    permission: [[1, 'tf', permissionTf], [1, 'footprint', footprint], [2, 'identity', identity]],
    privacy: [[1, 'tf', privateTf], [1, 'password', password], [2, 'what-to-do', privacyAct]],
    respect: [[1, 'tf', replyTf], [1, 'face-test', faceTest], [2, 'group', group]],
    check: [[1, 'tf', checkTf], [1, 'credible', credible], [2, 'slant', slant]],
    techniques: [[1, 'tf', techTf], [2, 'match', matchTech], [2, 'why', techWhy]],
    audience: [[1, 'purpose', purpose], [2, 'match', matchMedia], [2, 'form', formFor]]
  });
})();
