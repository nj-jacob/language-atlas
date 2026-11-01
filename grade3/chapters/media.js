/* Grade 3: media and online life.
   Ontario 2023 Language, Grades 1 to 3, A2 Digital Media Literacy:
   A2.1 digital citizenship: rights and responsibilities online, with permission     A2.2 online safety, privacy and well-being
   A2.3 gathering and evaluating information                                         A2.4 forms, conventions and techniques of media texts
   A2.5 form, message, audience and creator                                          A2.6 using digital and media tools in the design process
   A2.7 communicating and collaborating online in a safe, respectful, inclusive way
   All examples (including the ads and products) are made up for this site. Answer checks: tests/verify/grade3-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step, AP = '’';
  function others(list, x) { return list.filter(function (y) { return y !== x; }); }
  function scene(s) { return W.means('screen', s); }

  /* ---------- privacy and well-being (A2.2) ---------- */
  var PRIVATE = ['my home address', 'my password', 'my phone number', 'my full name and school', 'a photo of the front of my house', 'where I go after school',
    'a grown-up' + AP + 's bank card number', 'my bike lock code'];
  var SHAREOK = ['my favourite animal', 'a drawing of a tree', 'the name of my favourite book', 'my favourite colour', 'a joke about penguins', 'a fact about moose',
    'my favourite season', 'a riddle I made up'];
  var GOODPW = ['Moose!Jump7Lake', 'blue#Canoe42Pond', 'Snowy8Owl$Hill', 'Maple-Leaf-93!Sky'];
  var BADPW = ['1234', 'password', 'abc', 'myname', '1111', 'qwerty', 'cat'];

  function privateInfo(lv) {
    return Q.all('Pick everything you should keep <b>private</b> online.', R.some(PRIVATE, 2), R.some(SHAREOK, lv > 1 ? 3 : 2), {
      hint: 'Could a stranger use it to find you, or get into your account?', explain: 'Keep private anything that shows where you are or opens your accounts.', meta: { k: 'g3-private' } });
  }
  function keepPrivate(lv) {
    return Q.one('Which one must you keep <b>private</b>?', R.pick(PRIVATE), R.some(SHAREOK, lv > 1 ? 3 : 2), { hint: 'Which one could help a stranger find you?', explain: 'Keep it private.', meta: { k: 'g3-keep-private' } });
  }
  function privateTf() {
    var right = R.int(0, 1) === 1, s = R.pick(right ? SHAREOK : PRIVATE);
    return { q: Q.name() + ' says it is fine to share this online.', fig: W.sent(s), type: 'tf', answer: right,
      hint: 'Could a stranger use it to find you?', explain: right ? 'It is safe to share.' : 'Keep it private.', meta: { k: 'g3-private-tf', s: s } };
  }
  function strongPassword(lv) {
    return Q.one('Which is the <b>strongest</b> password?', R.pick(GOODPW), R.some(BADPW, lv > 1 ? 3 : 2), { prompt: 'Long, with letters, numbers and symbols, and hard to guess.',
      hint: 'Which one would be hardest to guess?', explain: 'Long and mixed is strong. Keep it secret, even from friends.', meta: { k: 'g3-strong-password' } });
  }

  /* ---------- permission and digital footprint (A2.1): [what happens, the best thing to do, other choices] ---------- */
  var PERMIT = [['You want to post a photo of your friend.', 'Ask your friend first.', ['Post it right away.', 'Post it and tell them later.']],
    ['You want to use a song in your class video.', 'Ask your teacher if you may use it.', ['Use it, since it is online.', 'Say you made it.']],
    ['You want to download a new game.', 'Ask a grown-up first.', ['Download it quickly.', 'Ask a friend to do it.']],
    ['You found a great photo online for your poster.', 'Check you may use it, and say where it came from.', ['Say you took it.', 'Copy it and say nothing.']],
    ['Your cousin wants you to share a video of your little brother.', 'Ask your brother and a grown-up first.', ['Share it, it is funny.', 'Share it without the sound.']],
    ['A website asks you to click "I agree".', 'Ask a grown-up to read it with you.', ['Click it to keep going.', 'Click it many times.']],
    ['A friend tells you a secret in a message.', 'Keep it to yourself.', ['Send it to the class chat.', 'Post it as a joke.']],
    ['Someone you do not know sends you a message.', 'Do not answer, and tell a grown-up.', ['Answer them politely.', 'Send them a photo.']]];
  var ONLINE = [['Once something is posted, it can be hard to take back.', true], ['You should ask before posting a photo of someone.', true],
    ['People own the pictures and songs they make.', true], ['You can say no if someone asks for your photo.', true], ['What you post shows others who you are.', true],
    ['If it is online, anyone can use it.', false], ['Deleting a post makes it gone forever.', false], ['It is fine to post a friend' + AP + 's photo without asking.', false],
    ['You must share your password if a friend asks.', false], ['What you post online does not matter.', false]];
  var ASK = ['posting a photo of a friend', 'using a song in your video', 'downloading a game', 'sharing a video of your brother', 'using a photo you found online', 'joining a new website'];
  var NOASK = ['reading your own library book', 'drawing a picture for yourself', 'saying hello to your teacher', 'playing a board game you own', 'writing in your journal'];

  function askFirst(lv) {
    var s = R.pick(PERMIT);
    return Q.one('What should you do?', s[1], lv > 1 ? s[2] : [R.pick(s[2])], { fig: scene(s[0]), prompt: 'Is it yours? Do you need to ask?',
      hint: 'When you are not sure, ask first.', explain: s[1], meta: { k: 'g3-ask-first', s: s[0] } });
  }
  function matchPermit(lv) {
    return { q: 'Match each moment to the right thing to do.', type: 'match', pairs: R.some(PERMIT, lv > 1 ? 4 : 3).map(function (s) { return [s[0], s[1]]; }),
      hint: 'Ask first. Tell a grown-up.', explain: 'Asking first keeps you and others safe.', meta: { k: 'g3-match-permission' } };
  }
  function onlineTf() {
    var o = R.pick(ONLINE);
    return { q: 'True or false?', fig: W.sent(o[0]), type: 'tf', answer: o[1], hint: 'Think about what happens after you post.', explain: o[1] ? 'True.' : 'False.', meta: { k: 'g3-online-tf', s: o[0] } };
  }
  function pickAsk(lv) {
    return Q.all('Pick every time you should <b>ask first</b>.', R.some(ASK, 2), R.some(NOASK, lv > 1 ? 3 : 2), { hint: 'Does it belong to someone else, or go online?', explain: 'Ask before you use, share or download.', meta: { k: 'g3-pick-permission' } });
  }

  /* ---------- kind and inclusive online (A2.7) ---------- */
  var KIND = ['Great job on your drawing!', 'I like how you used colour.', 'Thanks for sharing your idea.', 'Your story made me smile.', 'Cool fact! I did not know that.',
    'Welcome to the group!', 'Nice try! You are getting better.', 'I see it a different way, but I like your idea.'];
  var UNKIND = ['That is so bad.', 'Nobody likes this.', 'You should stop posting.', 'This is the worst.', 'Ha ha, you messed up.', 'Your idea is dumb.'];
  var KINDDO = [['Someone posts a mean joke about a classmate.', 'Do not share it, and tell a grown-up.', ['Laugh and share it.', 'Add a mean joke too.']],
    ['A new student is not in the class group chat.', 'Ask the teacher if they can be added.', ['Leave them out.', 'Make a new chat without them.']],
    ['A friend makes a mistake in a video call.', 'Tell them it is okay.', ['Laugh at them.', 'Record it and share it.']],
    ['Someone writes a word in another language in the chat.', 'Be friendly and ask what it means.', ['Tell them to stop.', 'Make fun of the word.']],
    ['You disagree with a friend' + AP + 's idea online.', 'Say why, politely.', ['Write in all capitals.', 'Call the idea dumb.']],
    ['Someone is getting mean messages.', 'Tell a grown-up you trust.', ['Say nothing.', 'Send more mean messages.']]];
  /* [an unkind comment, a kind and honest way to say it] */
  var KINDER = [['Your drawing is ugly.', 'The trees look great! Maybe add a sun?'], ['That story is boring.', 'I liked the beginning. What happens next?'],
    ['You cannot sing.', 'Thanks for sharing your song!'], ['Your poster is too messy.', 'Cool poster! Bigger letters could help.'], ['That was a dumb question.', 'Good question. Let us find out.'],
    ['Your video is too long.', 'Fun video! The middle part could be shorter.']];

  function kindComment(lv) {
    return Q.one('Which comment is <b>kind</b> and <b>respectful</b>?', R.pick(KIND), R.some(UNKIND, lv > 1 ? 2 : 1), { hint: 'Would you like someone to say it to you?', explain: 'Be as kind online as you are in person.', meta: { k: 'g3-kind-comment' } });
  }
  function kindDo(lv) {
    var s = R.pick(KINDDO);
    return Q.one('What is the kind thing to do?', s[1], lv > 1 ? s[2] : [R.pick(s[2])], { fig: scene(s[0]), hint: 'Is it safe, kind and fair to everyone?', explain: s[1], meta: { k: 'g3-kind-do', s: s[0] } });
  }
  function kinder(lv) {
    var k = R.pick(KINDER), wrong = [k[0]];
    if (lv > 1) wrong.push(R.pick(UNKIND));
    return Q.one('Which is a kinder way to say it?', k[1], wrong, { fig: W.sent(k[0]), hint: 'Say something you like, then a helpful idea.', explain: 'Kind and still honest.', meta: { k: 'g3-kinder' } });
  }
  function kindTf() {
    var right = R.int(0, 1) === 1, s = R.pick(right ? KIND : UNKIND);
    return { q: Q.name() + ' says this comment is kind.', fig: W.sent(s), type: 'tf', answer: right, hint: 'How would you feel if someone wrote it to you?', explain: right ? 'It is kind.' : 'It would hurt. Do not post it.', meta: { k: 'g3-kindness-tf', s: s } };
  }

  /* ---------- can I trust it? (A2.3): [a source you can trust, one you cannot] ---------- */
  var TRUST = [['a museum website about dinosaurs', 'a comment from someone you do not know'], ['a library book about planets', 'a joke video about planets'],
    ['a government weather website', 'a guess from a friend'], ['a nature centre page about owls', 'an ad for owl toys'], ['an encyclopedia page on volcanoes', 'a cartoon about a talking volcano'],
    ['a hospital website about healthy eating', 'an ad for candy'], ['a science centre video about magnets', 'a prank video about magnets'],
    ['a park ranger' + AP + 's talk about bears', 'a rumour from a classmate'], ['a news report from a trusted newspaper', 'a post that says "Share this now!"'],
    ['a zoo website about polar bears', 'a made-up story about a polar bear']];
  var TRUSTED = TRUST.map(function (t) { return t[0]; }), UNTRUSTED = TRUST.map(function (t) { return t[1]; });

  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('Which would you <b>trust</b> more for facts?', t[0], [t[1]].concat(lv > 1 ? [R.pick(others(UNTRUSTED, t[1]))] : []), {
      prompt: 'Who made it? Do they know the facts?', hint: 'Trust places that study the topic.', explain: t[0] + ' comes from people who know.', meta: { k: 'g3-trust' } });
  }
  function notTrust(lv) {
    return Q.one('Which would you <b>not</b> trust for facts?', R.pick(UNTRUSTED), R.some(TRUSTED, lv > 1 ? 3 : 2), { hint: 'Which one might be a joke, a guess or an ad?', explain: 'Check facts in a place that knows.', meta: { k: 'g3-not-trust' } });
  }
  function pickTrust(lv) {
    return Q.all('Pick every source you could <b>trust</b> for facts.', R.some(TRUSTED, 2), R.some(UNTRUSTED, lv > 1 ? 3 : 2), { hint: 'Who made it? Do they know?', explain: 'Use sources made by people who study the topic.', meta: { k: 'g3-pick-trust' } });
  }
  function trustTf() {
    var right = R.int(0, 1) === 1, s = R.pick(right ? TRUSTED : UNTRUSTED);
    return { q: Q.name() + ' says you can trust this for facts.', fig: W.sent(s), type: 'tf', answer: right, hint: 'Who made it? Do they know the facts?', explain: right ? 'It comes from people who know.' : 'It might be a joke, a guess or an ad.', meta: { k: 'g3-trust-tf', s: s } };
  }

  /* ---------- kinds of media and their tricks (A2.4) ---------- */
  var FORMS = [['a poster', 'a big title and a picture'], ['an ad', 'tries to get you to buy something'], ['a news report', 'tells what happened'], ['a video', 'moving pictures and sound'],
    ['a podcast', 'voices you listen to, with no pictures'], ['a comic', 'pictures in boxes with speech bubbles'], ['a website', 'pages you click to move between'],
    ['a road sign', 'a symbol you understand fast'], ['a menu', 'a list of foods and prices']];
  /* [a technique, why it is used] */
  var TRICK = [['big, bold letters', 'to catch your eye'], ['music in a commercial', 'to set a feeling'], ['a close-up photo', 'to show small details'],
    ['a famous athlete in an ad', 'to make you trust the product'], ['a short, catchy slogan', 'to help you remember it'], ['arrows on a map', 'to show which way to go']];

  function matchMedia(lv) {
    return { q: 'Match each kind of media to what it does or has.', type: 'match', pairs: R.some(FORMS, lv > 1 ? 4 : 3).map(function (x) { return [x[0], x[1]]; }),
      hint: 'Think of one you have seen.', explain: 'Each kind of media has its own look and job.', meta: { k: 'g3-match-media' } };
  }
  function whichMedia(lv) {
    var f = R.pick(FORMS);
    return Q.tiles('Which kind of media has <b>' + f[1] + '</b>?', f[0], R.some(others(FORMS, f), lv > 1 ? 3 : 2).map(function (x) { return x[0]; }), { hint: 'Picture each one.', explain: f[0] + ': ' + f[1] + '.', meta: { k: 'g3-which-media', has: f[1] } });
  }
  function mediaTf() {
    var f = R.pick(FORMS), right = R.int(0, 1) === 1, s = right ? f[1] : R.pick(others(FORMS, f))[1];
    return { q: Q.name() + ' says ' + f[0] + ' has <b>' + s + '</b>.', type: 'tf', answer: right, hint: 'Picture ' + f[0] + '.', explain: f[0] + ': ' + f[1] + '.', meta: { k: 'g3-media-tf', form: f[0], s: s } };
  }
  function mediaTrick(lv) {
    var t = R.pick(TRICK);
    return Q.one('Why do media makers use <b>' + t[0] + '</b>?', t[1], R.some(others(TRICK, t), lv > 1 ? 2 : 1).map(function (x) { return x[1]; }), { hint: 'What does it do to you?', explain: t[0] + ': ' + t[1] + '.', meta: { k: 'g3-media-trick', trick: t[0] } });
  }

  /* ---------- ads: message, audience and creator (A2.5) ---------- */
  var ADS = [{ lines: ['NEW! Crunchy Maple Puffs!', 'Kids love them!', 'Get yours today!'], who: 'kids', wants: 'buy the cereal' },
    { lines: ['Zoom Runners', 'Run faster than ever!', 'Only $49.99 at Sport Stop.'], who: 'runners', wants: 'buy the shoes' },
    { lines: ['Sparkle Smile Toothpaste', 'Nine out of ten dentists like the taste!', 'Ask your grown-up to buy some.'], who: 'families', wants: 'buy the toothpaste' },
    { lines: ['Lakeview Summer Camp', 'Canoeing, crafts and campfires!', 'Sign up by May 1.'], who: 'kids and their families', wants: 'sign up for camp' },
    { lines: ['Cozy Paws Cat Food', 'Your cat will purr for more!', 'Now in a bigger bag.'], who: 'cat owners', wants: 'buy the cat food' },
    { lines: ['Northern Sky Tours', 'See the sky dance!', 'Book your trip to Yukon today.'], who: 'travellers', wants: 'book a trip' },
    { lines: ['Sunny Valley Strawberries', 'Picked fresh this morning!', 'Find us at the farmers' + AP + ' market.'], who: 'shoppers', wants: 'buy the strawberries' },
    { lines: ['Rink Rocket Skates', 'The skates every hockey player wants!', 'On sale this weekend.'], who: 'hockey players', wants: 'buy the skates' }];
  function ad(a) { return W.passage('', a.lines); }

  function adWants(lv) {
    var a = R.pick(ADS);
    return Q.one('What does this ad want you to do?', a.wants, R.some(others(ADS, a), lv > 1 ? 2 : 1).map(function (x) { return x.wants; }), { fig: ad(a),
      hint: 'Look at the last line.', explain: 'It wants you to ' + a.wants + '.', meta: { k: 'g3-ad-wants', ad: a.lines[0] } });
  }
  function adFor(lv) {
    var a = R.pick(ADS), whos = ADS.map(function (x) { return x.who; }).filter(function (w, i, all) { return w !== a.who && all.indexOf(w) === i && w.indexOf(a.who) < 0 && a.who.indexOf(w) < 0; });
    return Q.one('Who is this ad trying to reach?', a.who, R.some(whos, lv > 1 ? 2 : 1), { fig: ad(a), hint: 'Who would want this?', explain: 'It is aimed at ' + a.who + '.', meta: { k: 'g3-ad-for', ad: a.lines[0] } });
  }
  function adLine(lv) {
    var a = R.pick(ADS);
    return { q: 'Tap the line that tries hardest to <b>convince</b> you.', type: 'tap', pic: W.passage('', a.lines, { tap: true }), answer: '1', answerText: a.lines[1],
      prompt: 'Which line makes it sound amazing?', hint: 'Look for a big claim.', explain: a.lines[1] + ' A big claim to make you want it.', meta: { k: 'g3-ad-line', ad: a.lines[0] } };
  }
  function adTf() {
    var a = R.pick(ADS), right = R.int(0, 1) === 1, s = right ? a.wants : R.pick(others(ADS, a)).wants;
    return { q: Q.name() + ' says this ad wants you to <b>' + s + '</b>.', fig: ad(a), type: 'tf', answer: right, hint: 'What does the last line ask you to do?', explain: 'It wants you to ' + a.wants + '.', meta: { k: 'g3-ad-tf', ad: a.lines[0], s: s } };
  }

  /* ---------- the design process (A2.6): [problem, plan, make, test, improve] ---------- */
  var STAGE = ['Plan', 'Make', 'Test', 'Improve'];
  var PROJECTS = [['Boots are messy by the door.', 'Plan a sign that shows where boots go.', 'Draw the sign on paper.', 'Watch if your family uses it.', 'Make the boot picture bigger.'],
    ['Lights get left on.', 'Plan a reminder for the light switch.', 'Make a small sticker that says Lights off!', 'See if people turn off the lights.', 'Add a bright colour so it stands out.'],
    ['The class plants get dry.', 'Plan a chart for who waters the plants.', 'Make the chart with names and days.', 'Try the chart for one week.', 'Add pictures for each day.'],
    ['Mittens get lost at school.', 'Plan a lost-and-found box.', 'Build the box and add a label.', 'Ask classmates if they can find it.', 'Move the box closer to the door.'],
    ['Few people know about the bake sale.', 'Plan what the poster must say.', 'Make the poster on a tablet.', 'Ask a friend what they understood.', 'Fix the date so it is easier to read.'],
    ['Your cousin wants to make a bird feeder.', 'Plan the shots for a how-to video.', 'Film each step.', 'Show the video to your cousin.', 'Slow down the hard part.'],
    ['Recycling goes in the wrong bin.', 'Plan labels for the recycling bins.', 'Print the labels with pictures.', 'See if your family sorts it right.', 'Make the paper label blue like its bin.'],
    ['You forget what you read.', 'Plan a log to track your reading.', 'Make the log in a notebook.', 'Use the log for a week.', 'Add a space for favourite parts.']];

  function design(lv) {
    var p = R.pick(PROJECTS), n = lv > 1 ? 4 : 3, from = R.int(1, 5 - n), items = p.slice(from, from + n);
    return { q: 'Put the design steps in order.', fig: scene(p[0]), type: 'order', items: items, first: 'First', last: 'Last', hint: 'Plan, make, test, improve.', explain: 'Plan, make, test, then make it better.', meta: { k: 'g3-design' } };
  }
  function whichStage(lv) {
    var p = R.pick(PROJECTS), i = R.int(1, 4);
    return Q.tiles('Which design step is this?', STAGE[i - 1], R.some(others(STAGE, STAGE[i - 1]), lv > 1 ? 3 : 2), { fig: W.sent(p[i]), hint: 'Plan, make, test, improve.', explain: '<b>' + STAGE[i - 1] + '</b>.', meta: { k: 'g3-design-stage', s: p[i] } });
  }
  function nextStage(lv) {
    var p = R.pick(PROJECTS), i = R.int(1, 3);
    return Q.one('You just did this. What comes next?', p[i + 1], R.some(p.slice(1).filter(function (x, j) { return j + 1 !== i && j + 1 !== i + 1; }), lv > 1 ? 2 : 1), { fig: W.sent(p[i]),
      hint: 'Plan, make, test, improve.', explain: 'After ' + STAGE[i - 1].toLowerCase() + ' comes ' + STAGE[i].toLowerCase() + '.', meta: { k: 'g3-design-next', s: p[i] } });
  }
  function matchStage(lv) {
    var p = R.pick(PROJECTS), is = R.some([1, 2, 3, 4], lv > 1 ? 4 : 3);
    return { q: 'Match each step to its name.', fig: scene(p[0]), type: 'match', pairs: is.map(function (i) { return [p[i], STAGE[i - 1]]; }), hint: 'Plan, make, test, improve.', explain: 'Plan, make, test, then make it better.', meta: { k: 'g3-match-stage' } };
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'online', title: 'Safe and kind online', sub: 'Privacy, permission and respect.',
      concepts: [
        { slug: 'private', title: 'Keep private things private', exp: ['A2.2'], skill: 'private',
          model: [
            step(W.icon('lock'), 'Some things stay locked away.'),
            step(W.sent('my home address') + W.sent('my password'), 'Never share these online.'),
            step(W.sent('my favourite animal'), 'Fine to share. It cannot help anyone find you.'),
            step(W.sent('Moose!Jump7Lake'), 'A strong password: long, mixed, hard to guess.'),
            step(scene('Your eyes feel tired.'), 'Take a break. How you feel matters too.')
          ],
          guided: [function () { return privateInfo(1); }, function () { return keepPrivate(1); }, function () { return strongPassword(1); }],
          check: [function () { return privateInfo(2); }, function () { return keepPrivate(2); }, privateTf, function () { return strongPassword(2); }, function () { return privateInfo(3); }],
          coach: '<p>Make a family list together of what is private and what is fine to share. Put it near the computer.</p>',
          mistake: '<p>Thinking a friendly game or website is always safe. Any request for personal details is an "ask a grown-up" moment.</p>' },
        { slug: 'permission', title: 'Ask before you share', exp: ['A2.1'], skill: 'permission',
          model: [
            step(scene('You want to post a photo of a friend.'), 'It shows someone else.'),
            step(W.icon('talk'), 'Ask: "Is it okay if I share this?"'),
            step(W.means('again', 'Once it is posted, it is hard to take back.')),
            step(scene('You found a great photo online.'), 'Someone made it. It is theirs.'),
            step(W.icon('people'), 'Check you may use it, and say where it came from.')
          ],
          guided: [function () { return askFirst(1); }, function () { return pickAsk(1); }, function () { return matchPermit(1); }],
          check: [function () { return askFirst(2); }, function () { return pickAsk(2); }, onlineTf, function () { return matchPermit(2); }, function () { return askFirst(3); }],
          coach: '<p>Model it: ask the child before you share a photo of them. Explain that once something is online, it is hard to take back.</p>',
          mistake: '<p>Posting first and asking later.</p>' },
        { slug: 'kind', title: 'Be kind online', exp: ['A2.7'], skill: 'kind',
          model: [
            step(W.sent('That is so bad.'), 'Hurtful. It would hurt in person too.'),
            step(W.sent('I like how you used colour.'), 'Kind and helpful.'),
            step(W.sent('Your drawing is ugly.'), 'Unkind.'),
            step(W.sent('The trees look great! Maybe add a sun?'), 'Kind, and still honest.'),
            step(scene('A new student is not in the group chat.'), 'Include everyone.')
          ],
          guided: [function () { return kindComment(1); }, function () { return kindDo(1); }, function () { return kinder(1); }],
          check: [function () { return kindComment(2); }, function () { return kindDo(2); }, kindTf, function () { return kinder(2); }, function () { return kindDo(3); }],
          coach: '<p>Practise writing a kind comment on a family member' + AP + 's drawing or story: one thing you like, then one helpful idea.</p>',
          mistake: '<p>Writing something you would not say to someone' + AP + 's face.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Trust, kinds of media, ads and design.',
      concepts: [
        { slug: 'trust', title: 'Can I trust it?', exp: ['A2.3'], skill: 'trust',
          model: [
            step(W.icon('screen'), 'Two places with facts about dinosaurs.'),
            step(W.sent('a museum website'), 'Made by people who study dinosaurs.'),
            step(W.sent('a comment from a stranger'), 'Who knows? Check it somewhere else.'),
            step(W.sent('an ad for owl toys'), 'It wants to sell, not to teach.'),
            step(W.sent('a nature centre page about owls'), 'This one knows owls.')
          ],
          guided: [function () { return trust(1); }, function () { return notTrust(1); }, function () { return pickTrust(1); }],
          check: [function () { return trust(2); }, function () { return notTrust(2); }, trustTf, function () { return pickTrust(2); }, function () { return trust(3); }],
          coach: '<p>When you look something up together, say aloud: "Who made this page? Can we trust it?"</p>',
          mistake: '<p>Believing the first result. Check a second trusted source.</p>' },
        { slug: 'forms', title: 'Kinds of media', exp: ['A2.4'], skill: 'forms',
          model: [
            step(W.icon('screen'), 'A video: moving pictures and sound.'),
            step(W.passage('', ['BAKE SALE', 'Friday at noon']), 'A poster: a big title, short words.'),
            step(ad(ADS[0]), 'An ad: it wants you to buy.'),
            step(W.icon('listen'), 'A podcast: voices, no pictures.'),
            step(W.sent('<b>BIG, BOLD LETTERS</b>'), 'A trick to catch your eye.')
          ],
          guided: [function () { return matchMedia(1); }, function () { return whichMedia(1); }, function () { return mediaTrick(1); }],
          check: [function () { return matchMedia(2); }, function () { return whichMedia(2); }, mediaTf, function () { return mediaTrick(2); }, function () { return whichMedia(3); }],
          coach: '<p>Count the kinds of media you see on a walk or a car ride: signs, posters, ads, screens. Ask: "What trick is it using?"</p>',
          mistake: '<p>Thinking ads are just information. Ads are made to sell.</p>' },
        { slug: 'ads', title: 'Who made it, and for whom?', exp: ['A2.5'], skill: 'ads',
          model: [
            step(ad(ADS[0]), 'An ad.'),
            step(W.sent('Kids love them!'), 'It is aimed at <b>kids</b>.'),
            step(W.sent('Get yours today!'), 'It wants you to <b>buy</b>.'),
            step(ad(ADS[4]), 'Another ad.'),
            step(W.sent('Your cat will purr for more!'), 'For cat owners. A big claim to sell cat food.')
          ],
          guided: [function () { return adWants(1); }, function () { return adFor(1); }, function () { return adLine(1); }],
          check: [function () { return adWants(2); }, function () { return adFor(2); }, adTf, function () { return adLine(2); }, function () { return adFor(3); }],
          coach: '<p>Pause on an ad during a show and ask: who made it, who is it for, and what does it want?</p>',
          mistake: '<p>Believing "Kids love them!" is a fact. It is a selling trick.</p>' },
        { slug: 'design', title: 'Design it: plan, make, test, improve', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.icon('think'), 'Plan: what problem am I solving?'),
            step(W.icon('write'), 'Make a first try.'),
            step(W.icon('people'), 'Test it with someone.'),
            step(W.icon('again'), 'Make it better.'),
            step(scene('Boots are messy by the door.'), 'A real problem at home.'),
            step(W.chain(['Plan a sign.', 'Draw it.', 'Watch who uses it.', 'Make the picture bigger.'], STAGE))
          ],
          guided: [function () { return design(1); }, function () { return whichStage(1); }, function () { return nextStage(1); }],
          check: [function () { return design(2); }, function () { return whichStage(2); }, function () { return nextStage(2); }, function () { return matchStage(2); }, function () { return design(3); }],
          coach: '<p>Try the "Design a poster" activity in this chapter. The test step matters: ask a family member what they understood.</p>',
          mistake: '<p>Stopping after the first try. Testing and improving is where it gets good.</p>' }
      ]
    }],
    practice: [
      { id: 'private', name: 'Privacy and passwords', code: 'A2.2', gen: privateInfo },
      { id: 'permission', name: 'Asking first', code: 'A2.1', gen: askFirst },
      { id: 'kind', name: 'Kind online', code: 'A2.7', gen: kindComment },
      { id: 'trust', name: 'Can I trust it?', code: 'A2.3', gen: trust },
      { id: 'forms', name: 'Kinds of media', code: 'A2.4', gen: matchMedia },
      { id: 'ads', name: 'Reading ads', code: 'A2.5', gen: adWants },
      { id: 'design', name: 'The design process', code: 'A2.6', gen: design }
    ],
    tasks: [
      { id: 'poster', title: 'Design a poster', code: 'A2.6', pic: W.icon('screen'), say: 'Make a poster that solves a problem at home.',
        run: ['Pick a real problem: lights left on, boots by the door, saving water.', 'The child plans, makes a poster (on paper or a device), tests it with a family member, and improves it.'],
        rubric: ['No plan; unfinished.', 'Makes a poster; skips testing.', 'Plans, makes, tests and improves it.', 'A clear, eye-catching poster that really changes what people do.'] },
      { id: 'ad-detective', title: 'Ad detective', code: 'A2.5', pic: W.icon('screen'), say: 'Find an ad. Who made it? Who is it for? What does it want?',
        run: ['Look at a real ad together (a flyer, a box, a commercial).', 'Ask: who made it, who is it for, what does it want you to do, and which words or pictures try to convince you?'],
        rubric: ['Cannot say what the ad wants yet.', 'Says what it wants with help.', 'Says who it is for and what it wants.', 'Also points out the tricks it uses (words, colours, music).'] }
    ]
  });

  Q.shapes('media', {
    private: [[1, 'keep', keepPrivate], [1, 'true-false', privateTf], [1, 'password', strongPassword]],
    permission: [[1, 'match', matchPermit], [1, 'true-false', onlineTf], [1, 'pick', pickAsk]],
    kind: [[1, 'what-to-do', kindDo], [1, 'kinder', kinder], [1, 'true-false', kindTf]],
    trust: [[1, 'not-trust', notTrust], [1, 'pick', pickTrust], [1, 'true-false', trustTf]],
    forms: [[1, 'which', whichMedia], [1, 'true-false', mediaTf], [1, 'trick', mediaTrick]],
    ads: [[1, 'for-whom', adFor], [1, 'tap-claim', adLine], [1, 'true-false', adTf]],
    design: [[1, 'which-step', whichStage], [1, 'next', nextStage], [1, 'match', matchStage]]
  });
})();
