/* Grade 4: media and online life.
   Ontario 2023 Language, Grades 4 to 6, A2 Digital Media Literacy:
   A2.1 rights, responsibilities and digital identity, with permission           A2.2 safety, privacy, personal data and well-being
   A2.3 gathering and evaluating information: validity, credibility, accuracy    A2.4 forms, conventions and techniques of media texts
   A2.5 form, message, context, audience and purpose                            A2.6 digital and media tools in the design process
   A2.7 communicating and collaborating online safely, respectfully and inclusively
   Every ad, post and source below is made up for this site. Answer checks: tests/verify/grade4-media.js. */
(function () {
  'use strict';
  var R = Atlas.R, Q = Atlas.Q, W = Atlas.W, step = W.step;

  var AP = '’';
  function tfq(q, fig, right, why, meta, hint, explain) {
    return { q: q, fig: fig, type: 'tf', answer: right, why: { options: why, answer: right ? 0 : 1 }, hint: hint, explain: explain, meta: meta };
  }

  /* ---------- digital identity: what you post, and permission ---------- */
  var PROUD = ['a photo of the birdhouse I built', 'a kind comment on a friend' + AP + 's story', 'my poem on the class blog', 'a video of my science project',
    'a thank-you message to my coach', 'a drawing I made of a loon'];
  var REGRET = ['a mean joke about a classmate', 'a photo of a friend, without asking', 'an angry post when I was upset', 'a rumour about someone',
    'a photo that shows my house number', 'a rude reply to a stranger'];
  /* [something you might do, does it need permission?] */
  var PERM = [['posting a photo of your friend', true], ['using a song someone else made in your video', true], ['tagging your cousin in a post', true],
    ['sharing your teacher' + AP + 's video outside the class', true], ['using a photo you took yourself in your slide show', false],
    ['reading a story on a public library website', false], ['watching a video your teacher shared with the class', false], ['drawing your own picture of a moose', false]];
  /* [a statement about posts, true or false] */
  var POSTS = [['Others can save or share what you post.', true], ['A deleted post is gone forever.', false], ['What you post helps build your digital identity.', true],
    ['Only your friends will ever see your posts.', false], ['Posts can be found years later.', true], ['A photo of someone else is yours to share.', false]];
  function footprint() {
    return Q.all('Pick every post you would be <b>proud of</b> later.', R.some(PROUD, 2), R.some(REGRET, 2), { prompt: 'Would you be happy if your teacher saw it in five years?',
      hint: 'Posts are hard to take back. Is it kind? Did everyone in it agree?', explain: 'What you post builds your digital identity.', meta: { k: 'g4-footprint' } });
  }
  function proudTf() {
    var good = R.int(0, 1) === 1, s = R.pick(good ? PROUD : REGRET);
    return tfq('True or false? You would be proud of this post later.', W.means('screen', s), good, ['It is kind, and everyone in it agreed.', 'It could hurt someone or share too much.'],
      { k: 'g4-proud-tf', s: s }, 'Is it kind? Is it safe? Did everyone agree?', good ? 'A post to be proud of.' : 'A post you might regret.');
  }
  function permission() {
    var p = R.pick(PERM);
    return tfq('Do you need permission first?', W.means('people', p[0]), p[1], ['It uses someone else' + AP + 's face, name or work.', 'It is your own work, or it is already shared with you.'],
      { k: 'g4-permission', s: p[0] }, 'Is it someone else' + AP + 's face, name or work?', p[1] ? 'Yes: ask first.' : 'No permission needed.');
  }
  function postFact() {
    var f = R.pick(POSTS);
    return { q: 'True or false?', fig: W.sent(f[0]), type: 'tf', answer: f[1], hint: 'Think about who else can see a post, and for how long.', explain: f[1] ? 'True.' : 'False.', meta: { k: 'g4-post-fact', s: f[0] } };
  }

  /* ---------- privacy and well-being: [what happens, the best thing to do, other choices] ---------- */
  var SAFE = [['A website asks you to make an account.', 'Ask a grown-up before you sign up.', ['Sign up with your full name and address.', 'Use a friend' + AP + 's account.']],
    ['A pop-up says you won a free tablet.', 'Close it. It is a trick.', ['Click it to claim the prize.', 'Type in your address.']],
    ['You have been on a screen for two hours.', 'Take a break and move your body.', ['Keep going until bedtime.', 'Switch to a different screen.']],
    ['A stranger in a game asks where you live.', 'Do not answer, and tell a grown-up.', ['Tell them your street.', 'Give them your school instead.']],
    ['An app asks to see your location.', 'Ask a grown-up before you say yes.', ['Say yes to make it go away.', 'Share your location with everyone.']],
    ['A message says your account is locked and asks for your password.', 'Do not reply. Show a grown-up.', ['Send your password to fix it.', 'Make a new password and send it.']],
    ['Your eyes feel tired after a long game.', 'Look away and rest your eyes.', ['Turn the screen brighter.', 'Play one more hour.']]];
  /* [something you could share online, is it safe to share?] */
  var PRIV = [['your favourite colour', true], ['a book you liked', true], ['a drawing of a moose', true], ['your favourite sport', true],
    ['your home address', false], ['your full name and school', false], ['your password', false], ['your phone number', false]];
  var STRONG = ['Maple!Trail-42', 'Blue#Canoe-19', 'Lake7Moose!Run', 'River&Fox-73', 'Snow9Owl#Hill', 'Pine-Cone!58'], WEAK = ['password', 'ava2015', 'qwerty', '123456', 'abcdef', 'myname'];
  function whatToDo(lv) {
    var s = R.pick(SAFE);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('screen', s[0]), prompt: 'Is it safe? Does a grown-up need to know?',
      hint: 'When you are not sure, stop and ask a grown-up.', explain: s[1], meta: { k: 'g4-what-to-do', s: s[0] } });
  }
  function password(lv) {
    return Q.one('Which password is the <b>strongest</b>?', R.pick(STRONG), R.some(WEAK, lv > 1 ? 3 : 2), { hint: 'Strong passwords are long and mix letters, numbers and symbols.',
      explain: 'Long, with numbers and symbols, and not your name.', meta: { k: 'g4-password' } });
  }
  function passwordTf() {
    var good = R.int(0, 1) === 1, pw = R.pick(good ? STRONG : WEAK);
    return tfq('True or false? This is a strong password.', W.icon('lock') + W.sent(pw), good, ['It is long, with numbers and symbols.', 'It is short or easy to guess.'],
      { k: 'g4-password-tf', pw: pw }, 'Is it long? Does it mix letters, numbers and symbols?', good ? 'Strong.' : 'Weak: easy to guess.');
  }
  function privateTf() {
    var p = R.pick(PRIV);
    return tfq('Is it safe to share this online?', W.means('lock', p[0]), p[1], ['It does not tell anyone how to find you.', 'It could help a stranger find you or get into your account.'],
      { k: 'g4-private-tf', s: p[0] }, 'Could a stranger use it to find you?', p[1] ? 'Safe to share.' : 'Keep it private.');
  }

  /* ---------- respect online ---------- */
  var KIND = ['I like the colours. How did you make the sky?', 'Great idea! Could you add a title?', 'Thanks for sharing. The ending surprised me.',
    'Wow, the moose looks real! What did you use?', 'Nice work. I like the bright sun.', 'Cool idea! Can you show us how?'];
  var RUDE = ['THIS IS WRONG!!!', 'lol that is weird', 'Nobody asked.', 'ur drawing is bad', 'Ugh. Boring.', 'Who even likes this?'];
  var RESPECT = [['Typing in ALL CAPS can read like shouting.', true], ['It is fine to share a screenshot of a private chat.', false],
    ['If someone writes in another language, you can kindly ask what it means.', true], ['Online, it is fine to say things you would not say in person.', false],
    ['A video call with a classmate needs a grown-up' + AP + 's okay first.', true], ['It is kind to include everyone in a group chat.', true],
    ['Sharing someone' + AP + 's password as a joke is okay.', false], ['Check before you forward a message about someone.', true]];
  var KINDDO = [['A classmate is being teased in a group chat.', 'Do not join in, and tell a trusted adult.', ['Add a laughing emoji.', 'Forward it to others.']],
    ['Someone writes a comment in a language you do not know.', 'Kindly ask what it means.', ['Make fun of it.', 'Tell them to write in English.']],
    ['A friend sends you a private chat about someone else.', 'Do not pass it on.', ['Share it with the class.', 'Post it with a joke.']],
    ['Someone in your online group has not had a turn.', 'Invite them to share an idea.', ['Keep going without them.', 'Tell them to log off.']],
    ['A comment makes you angry.', 'Wait, calm down, then reply kindly or not at all.', ['Reply in ALL CAPS right away.', 'Post something mean back.']]];
  function reply(lv) {
    return Q.one(Q.name() + ' posts a drawing in the class space. Which reply is <b>respectful</b>?', R.pick(KIND), R.some(RUDE, lv > 1 ? 2 : 1), {
      hint: 'Would you say it face to face?', explain: 'Kind, specific, and maybe a question.', meta: { k: 'g4-reply' } });
  }
  function replyTf() {
    var good = R.int(0, 1) === 1, r = R.pick(good ? KIND : RUDE);
    return tfq('True or false? This reply is respectful.', W.sent(r), good, ['It is kind and specific.', 'It could hurt or embarrass someone.'], { k: 'g4-reply-tf', r: r }, 'Would you say it face to face?', good ? 'Respectful.' : 'Not respectful.');
  }
  function respectTf() {
    var r = R.pick(RESPECT);
    return { q: 'True or false?', fig: W.sent(r[0]), type: 'tf', answer: r[1], hint: 'Treat people online the way you would in person.', explain: r[1] ? 'True.' : 'False.', meta: { k: 'g4-respect-tf', s: r[0] } };
  }
  function kindDo(lv) {
    var s = R.pick(KINDDO);
    return Q.one('What should you do?', s[1], s[2].slice(0, lv > 1 ? 2 : 1), { fig: W.means('people', s[0]), hint: 'Be kind, include others, and get help if someone is hurt.', explain: s[1], meta: { k: 'g4-respect-do', s: s[0] } });
  }

  /* ---------- sources: [what you want to know, a credible source, a weaker one] ---------- */
  var TRUST = [['the weather this weekend', 'Environment Canada', 'a guess on a fan page'], ['the population of Ontario', 'Statistics Canada', 'a post from someone you do not know'],
    ['the history of the Métis Nation', 'the Métis Nation' + AP + 's own website', 'a quiz app with no author'], ['how black bears hibernate', 'a provincial park website', 'an old blog with no author'],
    ['how to care for a turtle', 'a guide from a vet clinic', 'an ad from a pet toy company'], ['how to stay safe on ice', 'the Canadian Red Cross', 'a video from someone you do not know'],
    ['when the library opens', 'the library' + AP + 's own website', 'a comment on a forum'], ['how maple syrup is made', 'a maple producers association', 'a cartoon with no author']];
  var GOODCHECK = ['Do other trusted sources say the same?', 'Who made it, and do they know the topic?', 'When was it written?', 'Can you find the author' + AP + 's name?', 'Does it give sources for its facts?'];
  var BADCHECK = ['Does it have bright colours?', 'Does it have lots of likes?', 'Was it the first result?', 'Is the font fancy?', 'Does it have a funny video?'];
  var FACTS = ['Lake Superior is the largest of the Great Lakes.', 'Monarch butterflies fly to Mexico for the winter.', 'Ottawa is the capital of Canada.', 'Canada has ten provinces.', 'Water freezes at 0 °C.', 'Loons are birds.'];
  var OPINIONS = ['Hockey is the most exciting sport.', 'Winter is the best season.', 'Blue is the nicest colour.', 'Pizza tastes better than soup.', 'Cats are cuter than dogs.', 'Reading is more fun than drawing.'];
  function trust(lv) {
    var t = R.pick(TRUST);
    return Q.one('You want facts about <b>' + t[0] + '</b>. Which source is more <b>credible</b>?', t[1], [t[2]].concat(lv > 1 ? [R.pick(TRUST.filter(function (x) { return x !== t; }))[2]] : []), {
      prompt: 'Who made it? Do they know the topic?', hint: 'Credible sources are made by people who study or live the topic.', explain: W.sent(t[1]), meta: { k: 'g4-trust', about: t[0] } });
  }
  function checks() {
    return Q.all('Pick every question that helps you check if information is <b>accurate</b>.', R.some(GOODCHECK, 2), R.some(BADCHECK, 2), {
      hint: 'Looks and likes do not make something true.', explain: 'Who made it, when, and do others agree?', meta: { k: 'g4-checks' } });
  }
  function checkTf() {
    var good = R.int(0, 1) === 1, c = R.pick(good ? GOODCHECK : BADCHECK);
    return tfq('True or false? This question helps you check if information is accurate.', W.sent(c), good, ['It is about who made it, when, or proof.', 'Looks and likes do not make something true.'],
      { k: 'g4-check-tf', c: c }, 'Does it help you know if it is true?', good ? 'A useful check.' : 'Not a useful check.');
  }
  function factTf() {
    var fact = R.int(0, 1) === 1, s = fact ? R.pick(FACTS) : R.pick(OPINIONS);
    return tfq('Is this a <b>fact</b> you could check?', W.sent(s), fact, ['You can look it up and prove it.', 'It is what someone thinks or feels.'], { k: 'g4-fact-tf', s: s }, 'Could you prove it?', fact ? 'A fact.' : 'An opinion.');
  }

  /* ---------- ad tricks: [the trick, in plain words; a line that uses it] ---------- */
  var TRICK = [['everyone has it', 'Everyone has one!'], ['an expert says so', 'Dentists choose it.'], ['saying it again', 'Crunch! Crunch! Crunch!'],
    ['hurry, it ends soon', 'Only today!'], ['a free gift', 'A free toy inside!'], ['a famous person uses it', 'Hockey star Jay Lee loves it!'],
    ['it makes you cool', 'Be the coolest kid on the block!'], ['a giant promise', 'The best snack in the whole universe!'], ['a cute animal', 'Puppy-approved and super cute!']];
  /* [something ads use, what it is meant to do] */
  var TECH = [['bright colours', 'catch your eye'], ['loud, fast music', 'make it feel exciting'], ['a close-up of the food', 'make it look tasty'],
    ['a catchy jingle', 'help you remember it'], ['happy kids playing', 'make you feel it is fun'], ['a famous athlete', 'make you trust it']];
  function technique(lv) {
    var t = R.pick(TRICK);
    return Q.one('Which trick is this ad using?', t[0], R.some(TRICK.filter(function (x) { return x !== t; }), lv > 1 ? 2 : 1).map(function (x) { return x[0]; }), { fig: W.sent(t[1]),
      hint: 'How is it trying to get you to buy?', explain: W.sent(t[1]) + ' <b>' + t[0] + '</b>', meta: { k: 'g4-technique', line: t[1] } });
  }
  function trickMatch() {
    var t = R.some(TRICK, 3);
    return { q: 'Match each ad line to its trick.', type: 'match', pairs: t.map(function (x) { return [x[1], x[0]]; }), hint: 'Read each line like a buyer.', explain: 'Ads use tricks to make you want things.', meta: { k: 'g4-trick-match' } };
  }
  function trickTf() {
    var t = R.pick(TRICK), right = R.int(0, 1) === 1, said = right ? t[0] : R.pick(TRICK.filter(function (x) { return x !== t; }))[0];
    return { q: 'True or false? This line uses the trick <b>' + said + '</b>.', fig: W.sent(t[1]), type: 'tf', answer: right, hint: 'How is it trying to get you to buy?', explain: 'The trick: <b>' + t[0] + '</b>.', meta: { k: 'g4-trick-tf', line: t[1], said: said } };
  }
  function techWhy() {
    var t = R.pick(TECH);
    return Q.tiles('Why do ads use <b>' + t[0] + '</b>?', 'to ' + t[1], R.some(TECH.filter(function (x) { return x !== t; }), 2).map(function (x) { return 'to ' + x[1]; }), {
      hint: 'What does it make you feel or notice?', explain: 'To ' + t[1] + '.', meta: { k: 'g4-tech-why', t: t[0] } });
  }

  /* ---------- message: made-up texts [lines, who it is for, what it is for, the form] ---------- */
  var TEXTS = [[['ZOOM SCOOTER', 'The fastest ride to the park!', 'Ages 8 to 12'], 'kids who like to ride', 'to sell something', 'an ad'],
    [['Slow down near schools', 'Children walk here.', 'Town of Riverside'], 'drivers', 'to keep people safe', 'a road sign'],
    [['Book swap!', 'Bring a book, take a book.', 'Library, Saturday at 10 a.m.'], 'families in town', 'to invite people to an event', 'a poster'],
    [['Did you know?', 'A beaver can stay underwater for 15 minutes.', 'Ontario Nature Club'], 'people curious about nature', 'to teach a fact', 'a fact card'],
    [['Lost cat', 'Grey with white paws. Answers to Mo.', 'Please call 555-0142.'], 'neighbours', 'to ask for help', 'a poster'],
    [['Junior Lacrosse', 'Sign up by May 1!', 'Ages 7 to 10'], 'parents of young players', 'to get people to join', 'a poster'],
    [['SPARKLE TOOTHPASTE', 'Whiter teeth in 7 days!', 'Only $3.99'], 'adults who buy toothpaste', 'to sell something', 'an ad'],
    [['Wash your hands', 'Sing the alphabet song while you scrub.', 'Riverside Public School'], 'students at Riverside', 'to keep people safe', 'a sign']];
  function uniq(col, not) { return TEXTS.map(function (x) { return x[col]; }).filter(function (x, i, a) { return x !== not && a.indexOf(x) === i; }); }
  function audienceOf(lv) {
    var t = R.pick(TEXTS);
    return Q.one('Who is this for?', t[1], R.some(uniq(1, t[1]), lv > 1 ? 2 : 1), { fig: W.passage('', t[0]), hint: 'Who would stop and read it?', explain: 'For <b>' + t[1] + '</b>.', meta: { k: 'g4-ad-audience', first: t[0][0] } });
  }
  function purposeOf() {
    var t = R.pick(TEXTS);
    return Q.one('What is it for?', t[2], R.some(uniq(2, t[2]), 2), { fig: W.passage('', t[0]), hint: 'What does the maker want you to do or know?', explain: '<b>' + t[2] + '</b>', meta: { k: 'g4-ad-purpose', first: t[0][0] } });
  }
  function formOf() {
    var t = R.pick(TEXTS);
    return Q.tiles('What form is this?', t[3], R.some(uniq(3, t[3]), 2), { fig: W.passage('', t[0]), hint: 'Where would you see it?', explain: 'It is <b>' + t[3] + '</b>.', meta: { k: 'g4-ad-form', first: t[0][0] } });
  }
  function audTf() {
    var t = R.pick(TEXTS), right = R.int(0, 1) === 1, said = right ? t[1] : R.pick(uniq(1, t[1]));
    return { q: 'True or false? This is made for <b>' + said + '</b>.', fig: W.passage('', t[0]), type: 'tf', answer: right, hint: 'Look for clues: ages, places, words.', explain: 'For <b>' + t[1] + '</b>.', meta: { k: 'g4-ad-aud-tf', first: t[0][0], said: said } };
  }

  /* ---------- design ---------- */
  var DESIGN = ['Find the problem.', 'Brainstorm ideas.', 'Make a first version.', 'Test it with people.', 'Make it better.'];
  /* [what you did, the design step] */
  var DID = [['You notice shoes pile up by the door.', 0], ['You list five ways to keep shoes tidy.', 1], ['You make a quick shoe chart on a poster app.', 2], ['Your brother tries the chart for a week.', 3],
    ['You make the chart bigger because it was hard to see.', 4], ['Little kids keep forgetting the bus rules.', 0], ['You sketch ideas: a song, a video, a comic.', 1], ['You film a short video on a tablet.', 2],
    ['You show the video to two younger kids.', 3], ['You add captions because they could not hear it well.', 4], ['Your family forgets recycling day.', 0], ['You think of an alarm, a sign or a calendar.', 1],
    ['You set up a reminder on the family calendar.', 2], ['Everyone tries the reminder for two weeks.', 3], ['You move the reminder to the night before.', 4]];
  /* [the job, a digital tool that fits] */
  var TOOLS = [['show steps with moving pictures', 'a video'], ['share facts in order with pictures', 'a slide show'], ['make a sign to print', 'a poster app'], ['count your family' + AP + 's votes', 'a chart or spreadsheet']];
  function design() {
    return { q: 'Put the design steps in order.', type: 'order', items: DESIGN.slice(), first: 'First', last: 'Last', hint: 'You cannot test what you have not made.', explain: 'Find, brainstorm, make, test, improve.', meta: { k: 'g4-design-steps' } };
  }
  function nextStep() {
    var i = R.int(0, DESIGN.length - 2);
    return Q.one('You just did this. What comes next?', DESIGN[i + 1], R.some(DESIGN.filter(function (x, j) { return j !== i + 1 && j !== i; }), 2), { fig: W.sent(DESIGN[i]),
      hint: 'Find, brainstorm, make, test, improve.', explain: W.sent(DESIGN[i + 1]), meta: { k: 'g4-next-step', done: DESIGN[i] } });
  }
  function whichStep(lv) {
    var d = R.pick(DID);
    return Q.one('Which design step is this?', DESIGN[d[1]], R.some(DESIGN.filter(function (x, j) { return j !== d[1]; }), lv > 1 ? 3 : 2), { fig: W.means('think', d[0]),
      hint: 'Find, brainstorm, make, test, improve.', explain: '<b>' + DESIGN[d[1]] + '</b>', meta: { k: 'g4-which-step', did: d[0] } });
  }
  function stepTf() {
    var d = R.pick(DID), right = R.int(0, 1) === 1, said = right ? DESIGN[d[1]] : R.pick(DESIGN.filter(function (x, j) { return j !== d[1]; }));
    return { q: 'True or false? This is the step <b>' + said + '</b>', fig: W.means('think', d[0]), type: 'tf', answer: right, hint: 'Find, brainstorm, make, test, improve.', explain: '<b>' + DESIGN[d[1]] + '</b>', meta: { k: 'g4-step-tf', did: d[0], said: said } };
  }
  function toolMatch() {
    var ts = R.some(TOOLS, 3);
    return { q: 'Match each job to a digital tool that fits.', type: 'match', pairs: ts.map(function (t) { return [t[0], t[1]]; }), hint: 'Which tool shows it best?', explain: 'Choose the tool that fits the job.', meta: { k: 'g4-tool-match' } };
  }

  Atlas.register('media', {
    full: true,
    lessons: [{
      id: 'online', title: 'Your online self', sub: 'Identity, privacy and respect.',
      concepts: [
        { slug: 'footprint', title: 'Post what you will be proud of', exp: ['A2.1'], skill: 'footprint',
          model: [
            step(W.icon('screen'), 'Every post leaves a trail.'),
            step(W.means('screen', 'a photo of the birdhouse I built'), 'Something to be proud of.'),
            step(W.means('screen', 'a mean joke about a classmate'), 'Hard to take back.'),
            step(W.means('people', 'posting a photo of your friend'), 'Someone else in it?'),
            step(W.icon('people'), 'Ask them first. It is their face.')
          ],
          guided: [footprint, proudTf, permission],
          check: [footprint, permission, postFact, proudTf, permission],
          coach: '<p>Search your own name together (with care) and talk about what a stranger could learn. Model asking before you post a photo of the child.</p>',
          mistake: '<p>Thinking a deleted post is gone. Others may have saved or shared it.</p>' },
        { slug: 'privacy', title: 'Guard your privacy and well-being', exp: ['A2.2'], skill: 'privacy',
          model: [
            step(W.icon('lock') + W.sent('ava2015'), 'Short and easy to guess.'),
            step(W.icon('lock') + W.sent('Maple!Trail-42'), 'Long, with numbers and symbols.'),
            step(W.means('screen', 'You won a free tablet!'), 'A trick to get your details.'),
            step(W.sent('Close it.'), 'Never type in your address.'),
            step(W.icon('screen'), 'Two hours? Take a break.')
          ],
          guided: [function () { return password(1); }, privateTf, function () { return whatToDo(1); }],
          check: [function () { return password(2); }, privateTf, passwordTf, function () { return whatToDo(2); }, privateTf],
          coach: '<p>Set up privacy settings on one app together. Agree on family screen-time breaks.</p>',
          mistake: '<p>Using the same easy password everywhere, or sharing it with a friend.</p>' },
        { slug: 'respect', title: 'Be respectful in every online space', exp: ['A2.7'], skill: 'respect',
          model: [
            step(W.sent('THIS IS WRONG!!!'), 'All caps reads like shouting.'),
            step(W.sent('I like the colours. How did you make the sky?'), 'Kind, with a question.'),
            step(W.means('people', 'A classmate is teased in a group chat.')),
            step(W.sent('Do not join in. Tell a trusted adult.'), 'Stand up for others.'),
            step(W.means('people', 'A comment in another language?'), 'Kindly ask what it means.')
          ],
          guided: [function () { return reply(1); }, respectTf, function () { return kindDo(1); }],
          check: [function () { return reply(2); }, respectTf, replyTf, function () { return kindDo(2); }, respectTf],
          coach: '<p>Talk about how people from different cultures and languages share one online space. Curiosity and kindness come first.</p>',
          mistake: '<p>Forgetting there is a real person reading the message.</p>' }
      ]
    }, {
      id: 'media-smart', title: 'Media smart', sub: 'Sources, ad tricks, message and design.',
      concepts: [
        { slug: 'sources', title: 'Check before you trust', exp: ['A2.3'], skill: 'sources',
          model: [
            step(W.means('think', 'How to stay safe on ice?'), 'You need facts.'),
            step(W.sent('the Canadian Red Cross'), 'Experts who teach safety.'),
            step(W.sent('a video from someone you do not know'), 'Who made it? We cannot tell.'),
            step(W.sent('Hockey is the most exciting sport.'), 'An opinion: you cannot prove it.'),
            step(W.icon('again'), 'Do other trusted sources agree?')
          ],
          guided: [function () { return trust(1); }, checks, factTf],
          check: [function () { return trust(2); }, factTf, checkTf, checks, function () { return trust(2); }],
          coach: '<p>When you look something up together, find the same fact in two trusted places before using it.</p>',
          mistake: '<p>Trusting a page because it looks nice or has lots of likes.</p>' },
        { slug: 'tricks', title: 'Spot the tricks in ads', exp: ['A2.4'], skill: 'tricks',
          model: [
            step(W.sent('Everyone has one!'), 'Join the crowd.'),
            step(W.sent('Only today!'), 'Hurry.'),
            step(W.sent('A free toy inside!'), 'A gift to pull you in.'),
            step(W.means('screen', 'a close-up of the food'), 'Pictures and music are tricks too.'),
            step(W.icon('think'), 'Ask: what do they want me to do?')
          ],
          guided: [function () { return technique(1); }, techWhy, trickTf],
          check: [function () { return technique(2); }, trickMatch, trickTf, techWhy, function () { return technique(2); }],
          coach: '<p>During a show, pause on an ad and name the trick together. Also notice the music, colours and close-ups.</p>',
          mistake: '<p>Believing "Everyone has one!" is a fact.</p>' },
        { slug: 'message', title: 'Who is it for, and why?', exp: ['A2.5'], skill: 'message',
          model: [
            step(W.passage('', TEXTS[0][0])),
            step(W.sent('Ages 8 to 12'), 'For kids.'),
            step(W.sent('The fastest ride to the park!'), 'To sell a scooter.'),
            step(W.passage('', TEXTS[1][0]), 'Another one.'),
            step(W.sent('Slow down near schools'), 'For drivers: to keep children safe.')
          ],
          guided: [function () { return audienceOf(1); }, purposeOf, formOf],
          check: [function () { return audienceOf(2); }, purposeOf, audTf, formOf, purposeOf],
          coach: '<p>Compare a cereal box and a road sign: different audience, purpose and place, so a different form.</p>',
          mistake: '<p>Missing the audience clues: ages, places, pictures and words chosen for a group.</p>' },
        { slug: 'design', title: 'Design to solve a real problem', exp: ['A2.6'], skill: 'design',
          model: [
            step(W.means('think', 'Shoes pile up by the door.'), 'Find the problem.'),
            step(W.chain(['Find', 'Brainstorm', 'Make', 'Test', 'Improve']), 'Five steps.'),
            step(W.means('screen', 'A shoe chart, made on a poster app.'), 'Make a first version.'),
            step(W.means('people', 'My brother tries it for a week.'), 'Test it with people.'),
            step(W.means('again', 'Make the chart bigger.'), 'Make it better.')
          ],
          guided: [design, function () { return whichStep(1); }, nextStep],
          check: [function () { return whichStep(2); }, nextStep, stepTf, toolMatch, design],
          coach: '<p>Try the design challenge in this chapter. Let the child choose the digital tool, and ask why it fits.</p>',
          mistake: '<p>Skipping the test. Real users always find something to improve.</p>' }
      ]
    }],
    practice: [
      { id: 'footprint', name: 'What you post', code: 'A2.1', gen: footprint },
      { id: 'privacy', name: 'Privacy and well-being', code: 'A2.2', gen: password },
      { id: 'respect', name: 'Respect online', code: 'A2.7', gen: reply },
      { id: 'sources', name: 'Checking sources', code: 'A2.3', gen: trust },
      { id: 'tricks', name: 'Ad tricks', code: 'A2.4', gen: technique },
      { id: 'message', name: 'Audience and purpose', code: 'A2.5', gen: audienceOf },
      { id: 'design', name: 'Design steps', code: 'A2.6', gen: whichStep }
    ],
    tasks: [
      { id: 'design-challenge', title: 'Design challenge', code: 'A2.6', pic: W.icon('screen'), say: 'Use a digital tool to solve a real problem at home or school.',
        run: ['Pick a real problem: a messy shoe area, forgetting the recycling, younger kids not knowing the bus rules.', 'The child chooses a tool (slides, a video, a poster app), makes a first version, tests it with a family member, and improves it.'],
        rubric: ['No plan; unfinished.', 'Makes something; skips testing.', 'Follows the design steps and improves it after testing.', 'A clear, well-tested solution, and explains why the tool fit.'] },
      { id: 'make-an-ad', title: 'Make an ad, then explain it', code: 'A2.5', pic: W.icon('screen'), say: 'Make an ad for something you love. Use one trick. Then explain who it is for.',
        run: ['The child picks a product or event (real or made up) and an audience.', 'They make a short ad on paper or a device using one trick, then explain the form, audience and purpose.'],
        rubric: ['No audience or trick yet.', 'An ad with an audience; cannot name the trick.', 'An ad that uses a trick on purpose and fits its audience.', 'A convincing ad, and explains how form, message and audience fit together.'] },
      { id: 'online-together', title: 'Work together online', code: 'A2.7', pic: W.icon('people'), say: 'With a grown-up’s okay, work on something with someone far away.',
        run: ['Choose a safe tool and a trusted partner: a cousin, grandparent or pen pal class.', 'Make something together (a shared story or a slide show). Talk about kind comments and respecting each other’s culture and language.'],
        rubric: ['Needs reminders to be safe or kind.', 'Takes part with help.', 'Shares ideas safely and respectfully.', 'Collaborates well, respects differences, and helps the other person join in.'] }
    ]
  });

  Q.shapes('media', {
    footprint: [[1, 'proud', proudTf], [1, 'permission', permission], [1, 'true-false', postFact], [2, 'pick', footprint]],
    privacy: [[1, 'private', privateTf], [1, 'password-tf', passwordTf], [1, 'what-to-do', whatToDo], [2, 'password', password]],
    respect: [[1, 'true-false', respectTf], [1, 'reply-tf', replyTf], [1, 'what-to-do', kindDo], [2, 'reply', reply]],
    sources: [[1, 'checks', checks], [1, 'fact', factTf], [1, 'check-tf', checkTf], [2, 'trust', trust]],
    tricks: [[1, 'match', trickMatch], [1, 'true-false', trickTf], [1, 'why', techWhy], [2, 'trick', technique]],
    message: [[1, 'purpose', purposeOf], [1, 'form', formOf], [1, 'true-false', audTf], [2, 'audience', audienceOf]],
    design: [[1, 'order', design], [1, 'next-step', nextStep], [1, 'true-false', stepTf], [2, 'tools', toolMatch]]
  });
})();
